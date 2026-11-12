// dolittle_runtime_error.js — 実行時エラーの親切化（djs runtime 用）
//
// dolittleV4 引き継ぎ §4(a)。ドリトルの実行時に出る JS 例外（TypeError 等）を、
// 学習者向けの日本語メッセージに変換する。改善できない例外は null を返し、
// 呼び出し側（lib.js の root.system.handleError）は元の e.message を使う。
//
// スタンドアロン（jQuery/SVG 非依存）。typo サジェストは window.DolittleClassify
// （js/lib/dolittle_classify.js）の closestMethod を再利用する。無ければサジェストなし。
//
// 使用例（runtime/js/dtl/lib.js handleError 内）:
//   var f = window.DolittleRuntimeError.toFriendly(e);
//   if (f) msg = f;

(function (global) {
  "use strict";

  // typo サジェスト用のメソッド名 Set（startup 時に辞書 fetch で注入。失敗時は空のまま）
  var METHOD_NAMES = new Set();

  // ===== Tier2: 実行時「黙り失敗」の検証ヘルパ（2026-07-05） =====
  // JS はゼロ除算で Infinity、配列範囲外で undefined を返し例外を出さないため、
  // これらは中央funnel(handleError) に届かず「無言で変な結果」になる。各メソッドが
  // 下記ヘルパを呼び、問題があれば "isDolittleRt" マーカー付きの Error を投げることで、
  // 既存の handleError→toFriendly→共通モーダル（AI相談ボタン付き）経路にそのまま流す。
  // 戻り値・コアース結果は一切変えず「throw を足すだけ」＝正常プログラムに非干渉。

  // 分かりやすい日本語メッセージ付きの実行時エラーを生成する。
  function RtError(code, message) {
    var e = new Error(message);
    e.isDolittleRt = true; // toFriendly が素通しする目印（二重処理防止）
    e.dtlCode = code; // RT_ARITH / RT_RANGE / RT_NEED_NUMBER
    e.name = "DolittleRtError";
    return e;
  }

  // 値を学習者向けに短く表示（『あ』/（値なし） など）
  function showValue(v) {
    if (v === undefined || v === null) return "（値なし）";
    if (typeof v === "string") return "『" + v + "』";
    if (typeof v === "boolean") return v ? "『はい』" : "『いいえ』";
    return "『" + String(v) + "』";
  }

  // 数として扱えなければ RT_NEED_NUMBER を投げる。数（や数字の文字列）ならそのまま通す。
  // ※ "3" のような数字文字列は既存挙動（JS が数へ変換）を壊さないよう通す＝結果が
  //   NaN になる本当の非数値（"あ" 等）・真偽値・値なし のときだけ投げる。
  // 「数でないものが渡された」エラーを作る（投げるのは呼び出し側。演算子の実行時ヘルパ lib.js DtlValue も使う）
  function needNumberError(v, opts) {
    var method = (opts && opts.method) || "";
    return RtError(
      "RT_NEED_NUMBER",
      (method ? "『" + method + "』は数を計算する命令です。" : "数を計算しようとしました。") +
        "数でないもの" + showValue(v) + "が渡されました。数で指定してください。"
    );
  }

  function requireNumber(v, opts) {
    if (typeof v === "boolean" || v === null || v === undefined || isNaN(Number(v))) {
      throw needNumberError(v, opts);
    }
    return v;
  }

  // 0（や "0"）で割る／余りを求めるのを RT_ARITH として弾く。
  function requireNonZero(divisor, opts) {
    var method = (opts && opts.method) || "割る";
    if (Number(divisor) === 0) {
      throw RtError(
        "RT_ARITH",
        "0で" + (method === "余り" ? "余りを求める" : "割る") +
          "ことはできません。『" + method + "』には0以外の数を指定してください。"
      );
    }
  }

  // リスト（配列）の添字を検証。非数値→RT_NEED_NUMBER、範囲外/非整数→RT_RANGE。
  function requireIndexInRange(arr, index1, opts) {
    var method = (opts && opts.method) || "読む";
    var n = Number(index1);
    if (typeof index1 === "boolean" || index1 === null || index1 === undefined || isNaN(n)) {
      throw RtError(
        "RT_NEED_NUMBER",
        "『" + method + "』でリストの何番目かは数で指定してください（" +
          showValue(index1) + "は数ではありません）。"
      );
    }
    var len = arr && arr.length ? arr.length : 0;
    // opts.extra: 上限を len+extra にする（挿入は末尾の次＝len+1 まで可）。
    // opts.noMax: 上限なし（上書きは末尾より後ろへの拡張が正当）。
    var max = opts && opts.noMax ? Infinity : len + ((opts && opts.extra) || 0);
    if (max === 0) {
      throw RtError(
        "RT_RANGE",
        "リスト（配列）が空なので、" + n + "番目を" +
          (method === "読む" ? "取り出せません。" : "『" + method + "』で指定できません。")
      );
    }
    if (n !== Math.floor(n) || n < 1 || n > max) {
      throw RtError(
        "RT_RANGE",
        "リスト（配列）の" + index1 + "番目" + (method === "読む" ? "はありません。" : "は『" + method + "』で指定できません。") +
          (max === Infinity ? "1以上の番号で指定してください。" : "1〜" + max + "番の範囲で指定してください。")
      );
    }
  }

  function setMethodNames(set) {
    if (set && typeof set.has === "function") METHOD_NAMES = set;
  }

  // "(intermediate value).赤 is not a function" / "x.歩く is not a function"
  // / "obj['赤'] is not a function" などから命令名を抽出
  function extractNotAFunctionName(msg) {
    // ドット形: .赤 is not a function
    var m = msg.match(/\.\s*([^\s.()\[\]'"]+)\s+is not a function/);
    if (m) return m[1];
    // ブラケット形: ['赤'] is not a function
    m = msg.match(/\[\s*['"]([^'"]+)['"]\s*\]\s+is not a function/);
    if (m) return m[1];
    // 素の識別子形: 歩く is not a function（ドット/ブラケット無し・空白か行頭の直後）
    m = msg.match(/(?:^|\s)([^\s.()\[\]'"]+)\s+is not a function/);
    if (m && m[1] && m[1] !== "undefined" && m[1] !== "null") return m[1];
    return null;
  }

  // 近いメソッド名を返す（DolittleClassify があれば再利用）
  function closest(name) {
    if (
      global.DolittleClassify &&
      typeof global.DolittleClassify.closestMethod === "function" &&
      METHOD_NAMES.size > 0
    ) {
      return global.DolittleClassify.closestMethod(name, METHOD_NAMES);
    }
    return null;
  }

  /**
   * JS 例外を学習者向け日本語メッセージに変換。改善できなければ null。
   * @param {Error|any} e
   * @returns {string|null}
   */
  function toFriendly(e) {
    var msg = e && e.message ? String(e.message) : String(e);
    if (!msg) return null;

    // 0-a. Tier2 の検証ヘルパが投げた実行時エラーは既に親切文＝そのまま採用（二重処理防止）。
    if (e && e.isDolittleRt) return e.message;

    // 0-b. 「！返す」が漏れた場合はエラーではない＝素通し（handleError が既に静かに終了させるが、
    //      onerror 経由の保険として二重防止。V4 handover §13.B）。
    if (e && e.isReturn) return null;

    // 0. ループ中断「！中断」がループの外まで伝播した（ループ内なら repeat/_while/Timer が
    //    捕捉するのでここへは届かない）。onerror 経由の文字列形にも message で対応。
    if ((e && e.isBreakLoop) || /BreakLoopException|Loop break/.test(msg)) {
      return "「！中断」（繰り返し中断）は繰り返しの中でだけ使えます。" +
             "タイマーを止めるときは「時計！中断」のようにタイマーを指定します。";
    }

    // 1. メソッド未検出 / 値を命令として送った（例: かめた！赤 → 赤 is not a function）
    if (/is not a function/.test(msg)) {
      var name = extractNotAFunctionName(msg);
      if (name) {
        if (METHOD_NAMES.size > 0 && METHOD_NAMES.has(name)) {
          // 辞書にある正規語だが、この使い方では命令にならない（色や値など）
          return (
            "『" + name + "』は値（色や数値など）か、この相手には使えない命令です。" +
            "命令の送り先や書き方を確認してください。"
          );
        }
        var near = closest(name);
        if (near) {
          return "『" + name + "』という命令は見つかりません。もしかして「" + near + "」のことですか？";
        }
        return "『" + name + "』という命令は見つかりません。命令名を確認してください。";
      }
      return "命令の送り先（オブジェクト）が空、または命令が見つかりませんでした。" +
             "送り先の変数に値が入っているか、命令名のつづりや「！」の付け方を確認してください。";
    }

    // 1b. 送信の受け手が空（root.system.send が isEmptyReceiver 付きで投げる。2026-09-03）。
    //     受け手が単純な変数ならトランスパイラが名前を渡している（receiverName）ので、
    //     「どの変数が空で、どの命令を送ろうとしたか」を示す。名前が取れない受け手
    //     （括弧・送信結果のチェーン等）は命令名だけ示す。
    if (e && e.isEmptyReceiver) {
      var rn = e.receiverName, mn = e.methodName;
      if (rn) {
        return "『" + rn + "』が空（未設定）のまま『" + mn + "』を送っています。" +
               "『" + rn + "』をこの命令より前に作ってある（値を入れてある）か確認してください。";
      }
      return "空（未設定）の相手に『" + mn + "』を送っています。命令の送り先に値が入っているか確認してください。";
    }

    // 2. 未定義 / null のプロパティ参照
    //    新形: "Cannot read properties of undefined (reading 'x')"
    //    旧形: "Cannot read property 'x' of null"
    if (/Cannot read propert(?:y|ies).* of (?:undefined|null)/.test(msg) ||
        /Cannot read propert(?:y|ies) of (?:undefined|null)/.test(msg)) {
      return "値が空（未設定）のまま使われました。変数に値が入っているか確認してください。";
    }

    // 2b. 未定義 / null への プロパティ代入（例: `入力a:動作 = …` で `入力a` が未定義）
    //    新形: "Cannot set properties of undefined (setting '動作')"
    //    旧形: "Cannot set property '動作' of undefined"
    if (/Cannot set propert(?:y|ies).* of (?:undefined|null)/.test(msg)) {
      var pm = msg.match(/setting ['"]([^'"]+)['"]/) || msg.match(/set property ['"]([^'"]+)['"]/);
      var prop = pm ? pm[1] : null;
      if (prop) {
        return "作られていない変数に「" + prop + "」を設定しています。" +
               "変数名のつづりが正しいか、その変数を先に作ってあるかを確認してください。";
      }
      return "作られていない変数に値を設定しようとしました。変数名が正しいか、その変数を先に作ってあるかを確認してください。";
    }

    // 3. 代入できない左辺（数字で始まる変数名など）
    //    例: `1ばん＝5。` は djs で構文エラーにならず、不正JS `(1)=(5)` を生成し
    //    実行時に JS SyntaxError "Invalid left-hand side in assignment" になる。
    if (/Invalid left-hand side in assignment/.test(msg)) {
      return "代入の左側がおかしいようです。変数名を数字で始めることはできません（先頭は文字にしてください）。" +
             "また「＝」の左側には変数だけを書いてください。";
    }

    // 4. 無限再帰／無限の繰り返し（RangeError）
    //    例: 自分自身を呼び続ける／止まらない繰り返し → "Maximum call stack size exceeded"
    if (/Maximum call stack size exceeded/i.test(msg) || /call stack/i.test(msg)) {
      return "プログラムが終わらなくなりました（同じ処理を限りなく繰り返している可能性があります）。" +
             "繰り返しや命令の呼び出しが、いつか止まる（終わる）ようになっているか確認してください。";
    }

    // 5. 未定義の名前を値として使った（ReferenceError "X is not defined"）
    if (/is not defined/.test(msg)) {
      var dm = msg.match(/(?:^|\s)([^\s.()\[\]'"]+)\s+is not defined/);
      var nm = dm ? dm[1] : null;
      if (nm) {
        return "『" + nm + "』が見つかりません（未定義）。変数名や命令名のつづりが正しいか、" +
               "先に作った（値を入れた）か確認してください。";
      }
      return "まだ定義されていない名前が使われました。変数名や命令名を確認してください。";
    }

    // 6. それ以外は改善せず元メッセージを尊重（中断「実行が中断されました」/STOP 等も素通り）
    return null;
  }

  global.DolittleRuntimeError = {
    toFriendly: toFriendly,
    setMethodNames: setMethodNames,
    // Tier2 検証ヘルパ（各メソッドが実行前に呼ぶ）
    RtError: RtError,
    requireNumber: requireNumber,
    needNumberError: needNumberError,
    requireNonZero: requireNonZero,
    requireIndexInRange: requireIndexInRange,
    // テスト/デバッグ用
    extractNotAFunctionName: extractNotAFunctionName,
  };
})(typeof window !== "undefined" ? window : this);
