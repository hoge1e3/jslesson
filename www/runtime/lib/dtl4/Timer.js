// タイマー（V4.02 の機能テスト timer.* に合わせて作り直し, 2026-09-27）
//
// 設計:
// - 状態（待ち行列 _q・実行中の仕事 _cur・setInterval の id）は**タイマーごと**に持つ（_state で遅延生成）。
//   クラス「タイマー」自身に実行を送ったとき（タイマー！「…」実行）も、作ったタイマーとは別の待ち行列になる。
// - 待ち行列の仕事は3種類: 繰り返し（実行/次に実行）、1回だけ（最後に実行）、待つの合図（waiter）。
//   同じタイマーの仕事は順に1つずつ動き、別のタイマーは並行に動く。
// - 実行の回数: 「実行」「次に実行」に数を渡すとその回数（省略時はタイマーの回数設定）。
//   ブロックには何回目か（1から）を渡す。最初の実行は間隔の後（非同期）。
// - 停止（stop/abort）: 実行中の仕事を止め、待ち行列を空にする。待つの合図は解決する（待つが止まらない）。
//   止まっているタイマーへの停止は何もしない（2026-09-26 V4 決定）。
// - 中断（skip）: 実行中の仕事だけを終え、待ち行列の次へ進む。止まっているタイマーへの中断は何もしない。
// - ブロック内の「！中断」（BreakLoopException）は中断（skip）と同じ。
// - ブロック内の実行時エラー: 全タイマーを止めてからエラー表示（V3 と同じ, 2026-09-26 V4 決定）。
// - 時間: 時間÷間隔 を回数にする。時間の後に間隔を変えても 時間÷間隔 を保つ。回数を後から指定するとそちらが有効。
(function () {
  var root = this;
  var RtErr = function () { return root.window.DolittleRuntimeError; };
  var needNumber = function (v, method) {
    var R = RtErr();
    if (R && R.requireNumber) R.requireNumber(v, { method: method });
    return Number(v);
  };

  this.alltimer = this.create();
  this.alltimer.list = this.Array.create();
  this.alltimer.stop = function () {
    // IDE の中断・再実行と、タイマー内の実行時エラーから呼ばれる。
    // 待つの合図は解決しない（トップレベルの「待つ」から先へ進ませない＝プログラムはそこで止まる）。
    var l = this.list.slice();
    for (var k = 0; k < l.length; k++) abortTimer(l[k], false);
    return this;
  };

  this.Timer = this.create();
  this.Timer.i = 100;   // 間隔（ミリ秒）
  this.Timer.t = 100;   // 回数

  // タイマーごとの状態。継承した親の状態を使わないよう hasOwnProperty で判定する。
  var state = function (s) {
    if (!Object.prototype.hasOwnProperty.call(s, "_st")) {
      s._st = { q: [], cur: null, id: null };
    }
    return s._st;
  };
  var register = function (s) {
    var l = root.alltimer.list;
    if (l.indexOf(s) < 0) l.push(s);
  };

  this.Timer.initialize = function () {
    state(this);
  };

  this.Timer.interval = function (i) {
    i = needNumber(i, "間隔");
    if (i < 0.001) {
      i = 0.001;
    }
    this.i = i * 1000;
    if (this.useSpan) this.t = Math.floor((this.span * 1000) / this.i);
    return this;
  };
  this.Timer.times = function (t) {
    this.t = needNumber(t, "回数");
    this.useSpan = false;
    return this;
  };
  this.Timer.duration = function (t) {
    this.span = needNumber(t, "時間");
    this.useSpan = true;
    this.t = Math.floor((this.span * 1000) / this.i);
    return this;
  };

  // 次の仕事を始める。仕事が無ければ何もしない（止まった状態）。
  var runNext = function (s) {
    var st = state(s);
    st.cur = null;
    while (st.q.length > 0) {
      var job = st.q.shift();
      if (job.waiter) {
        job.resolve(s);
        continue;
      }
      st.cur = job;
      if (job.once) {
        // 最後に実行: 1回だけ（非同期に実行してから次へ）
        st.id = root.window.setTimeout(function () {
          st.id = null;
          if (st.cur !== job) return;
          if (runBlock(s, job, undefined) === false) return;
          if (st.cur === job) runNext(s);
        }, 0);
      } else {
        startRepeat(s, job);
      }
      return;
    }
  };

  // ブロックを1回実行する。エラーなら全タイマーを止めてエラー表示し false を返す。
  var onError = function (e) {
    root.alltimer.stop();
    return root.window.onerror("", "", "", "", e);
  };
  var runBlock = function (s, job, c) {
    var r;
    try {
      r = job.f.execute(c);
    } catch (e) {
      if (e && e.isBreakLoop) {
        s.skip();
        return false;
      }
      onError(e);
      return false;
    }
    if (root.DtlPromise.isPromise(r)) {
      r.then(undefined, function (e) {
        if (e && e.isBreakLoop) {
          if (state(s).cur === job) s.skip();
          return;
        }
        onError(e);
      });
    }
    return true;
  };

  var startRepeat = function (s, job) {
    var st = state(s);
    var c = 1;
    if (!(job.n >= 1)) {
      // 回数が0以下: 何もせず次へ（非同期に）
      st.id = root.window.setTimeout(function () {
        st.id = null;
        if (st.cur === job) runNext(s);
      }, 0);
      return;
    }
    st.id = root.window.setInterval(function () {
      if (st.cur !== job) return;
      if (runBlock(s, job, c) === false) return;
      // ブロック内で停止・中断されたら、この仕事はもう終わっている
      if (st.cur !== job) return;
      c = c + 1;
      if (c > job.n) {
        root.window.clearInterval(st.id);
        st.id = null;
        runNext(s);
      }
    }, job.i);
  };

  var abortTimer = function (s, resolveWaiters) {
    var st = state(s);
    clearTimerId(st);
    st.cur = null;
    var q = st.q;
    st.q = [];
    if (resolveWaiters) {
      for (var k = 0; k < q.length; k++) {
        if (q[k].waiter) q[k].resolve(s);
      }
    }
    return s;
  };

  var clearTimerId = function (st) {
    if (st.id !== null) {
      root.window.clearInterval(st.id);
      root.window.clearTimeout(st.id);
      st.id = null;
    }
  };

  // 仕事を待ち行列に入れる。止まっていればすぐ始める。
  var enqueue = function (s, job) {
    var st = state(s);
    register(s);
    st.q.push(job);
    if (!st.cur) runNext(s);
  };

  // 実行・次に実行: 引数からブロックと回数を取り出す（順序は問わない）
  var parseExecArgs = function (s, args, method) {
    var f, n;
    for (var k = 0; k < args.length; k++) {
      var a = args[k];
      if (typeof a === "function") {
        if (!f) f = a;
      } else if (a !== undefined && n === undefined) {
        n = needNumber(a, method);
      }
    }
    if (!f) {
      var R = RtErr();
      var msg = "タイマーの『" + method + "』には、実行するブロック「…」を渡してください。";
      throw R && R.RtError ? R.RtError("RT_NEED_ARG", msg) : new Error(msg);
    }
    return { f: f, n: n === undefined ? s.t : n, i: s.i };
  };

  this.Timer.execute = function () {
    enqueue(this, parseExecArgs(this, arguments, "実行"));
    return this;
  };
  this.Timer.next_execute = function () {
    enqueue(this, parseExecArgs(this, arguments, "次に実行"));
    return this;
  };
  this.Timer.after_execute = function (f) {
    if (typeof f !== "function") {
      var R = RtErr();
      var msg = "タイマーの『最後に実行』には、実行するブロック「…」を渡してください。";
      throw R && R.RtError ? R.RtError("RT_NEED_ARG", msg) : new Error(msg);
    }
    enqueue(this, { f: f, once: true });
    return this;
  };

  // 中断: 実行中の仕事を終えて次へ進む
  this.Timer.skip = function () {
    var st = state(this);
    if (!st.cur) return this;
    clearTimerId(st);
    runNext(this);
    return this;
  };
  // 停止: 実行中の仕事を止め、待ち行列を空にする（待つの合図だけは解決する）
  // プログラムからの停止では、待つの合図を解決する（V4: 停止でスレッドが終わり 待つ が返る）。
  this.Timer.abort = function () {
    return abortTimer(this, true);
  };
  this.Timer.addAlias("abort", "stop");

  // 待つ: いま待ち行列にある仕事が終わるまで待つ（止まっていればすぐ）
  this.Timer.wait = function () {
    var s = this;
    return root.DtlPromise.new(function (succ) {
      var st = state(s);
      if (!st.cur && st.q.length === 0) {
        succ(s);
        return;
      }
      st.q.push({ waiter: true, resolve: succ });
    });
  };
  this.Timer.addAlias("after_execute", "execute_once");
  return this.addAlias("Timer", "timer");
})
  .checkerror()
  .apply(root, []);
