// WebClientFetch.js — Webクライアントの POST/ヘッダ/JSON/応答オブジェクト/バイナリ受信
//
// dolittleV4 引き継ぎ §9。デスクトップ版と同じドリトル記法を動かして .dtl を共通化する。
// 既存の変換生成 WebClient.js（同期GET・解析済みJSON直返し）は直接編集せず、その後に読み込んで
// root['Webクライアント'] にメソッドを追加/上書きする。自動解析GETの `webapi`(webapi.js) は不変。
//
// ドリトルAPI（V4 docs/webapi.md 準拠）:
//   c＝webクライアント！作る。
//   応答＝c！(url) 読む。                     // GET, 応答オブジェクト
//   応答＝c！(url)(body) 送る。               // POST（body: 文字列はそのまま / obj・arrayはJSON化）
//   応答＝c！(method)(url)(body) 要求。       // 任意メソッド
//   c！(キー)(値) ヘッダ。                     // リクエストヘッダ設定（インスタンスに保持・チェーン可）
//   木＝webクライアント！(jsonstr) json解析。 // JSON文字列→ツリー
//   s ＝webクライアント！(obj) jsonにする。   // オブジェクト→JSON文字列
// 応答プロパティ: 応答:body / 応答:retcode("200") / 応答:retmsg / 応答:header(「キー=値」配列) / 応答:bytes
// バイナリ: (応答:bytes)！長さ?  /  (応答:bytes)！base64

(function () {
  // this === root（.checkerror().apply(root,[]) による）
  var root = this;
  // ブラウザ実行時は root.window、テスト(loader)時は globalThis をグローバルとして使う
  var G = (root && root.window) ? root.window : (typeof window !== "undefined" ? window : globalThis);

  // ---- 補助 ----
  function shallowCopy(o) { var r = {}; if (o) for (var k in o) r[k] = o[k]; return r; }
  function hasHeaderCI(h, name) {
    name = String(name).toLowerCase();
    for (var k in h) if (k.toLowerCase() === name) return true;
    return false;
  }

  // ---- 純粋ロジック（root非依存・テスト可能） ----
  function toJsonString(obj) {
    if (obj === undefined || obj === null) return "";
    if (typeof obj === "string") return obj;
    return G.JSON.stringify(toPlain(obj, []));
  }
  // ドリトルのオブジェクト → JSON にできる素の値（V4 OxJson.write 準拠）。
  // 別名つきの名前（リスト 等）は "_KEY_名前" に保存されるので元の名前に戻す。
  // メソッド（関数）・自己参照・内部用（"__" で始まる名前）は出力しない。
  function toPlain(v, seen) {
    if (v === undefined || v === null) return null;
    var t = typeof v;
    if (t === "string" || t === "number" || t === "boolean") return v;
    if (t === "function") return undefined;
    if (v instanceof G.String || v instanceof G.Number || v instanceof G.Boolean) return v.valueOf();
    if (seen.indexOf(v) >= 0) return null;
    seen.push(v);
    var out;
    if (Array.isArray(v)) {
      out = [];
      for (var i = 0; i < v.length; i++) {
        var e = toPlain(v[i], seen);
        out.push(e === undefined ? null : e);
      }
    } else {
      out = {};
      var keys = Object.keys(v);
      for (var j = 0; j < keys.length; j++) {
        var k = keys[j], val = v[k];
        if (val === v || typeof val === "function") continue;
        var name = (k.indexOf("_KEY_") === 0) ? k.slice(5) : k;
        if (name.indexOf("__") === 0) continue;
        var pv = toPlain(val, seen);
        if (pv !== undefined) out[name] = pv;
      }
    }
    seen.pop();
    return out;
  }
  function parseJson(str) {
    if (str === undefined || str === null || str === "") return "";
    try { return wrapTree(G.JSON.parse(str)); }
    catch (e) { if (G.console) G.console.log(e); return ""; }
  }
  // ドリトルの json解析 用（V4 OxWebClient.parseJson 準拠）: 引数なし・JSON でない文字列はエラー。
  // JSON の null は未定義（V4 OxUndef）。
  function parseJsonStrict(str) {
    if (str === undefined || str === null) {
      throw rtError("RT_NEED_ARG", "『json解析』には JSON の文字列を指定してください。");
    }
    var v;
    try { v = G.JSON.parse(String(str)); }
    catch (e) {
      var s = String(str);
      if (s.length > 30) s = s.slice(0, 30) + "…";
      throw rtError("RT_JSON", "『json解析』で JSON として読めない文字列が渡されました（『" + s + "』）。");
    }
    return (v === null) ? undefined : wrapTree(v);
  }
  function rtError(code, msg) {
    var R = G.DolittleRuntimeError;
    if (R && R.RtError) return R.RtError(code, msg);
    var e = new Error(msg); e.isDolittleRt = true; e.dtlCode = code; return e;
  }
  // V4 StringUnescapeUtil.unescapeJava 相当（\uXXXX と \n 等を元の文字に戻す）
  function unescapeJava(s) {
    return s.replace(/\\(u[0-9a-fA-F]{4}|[btnfr"'\\])/g, function (m, c) {
      if (c.charAt(0) === "u") return String.fromCharCode(parseInt(c.slice(1), 16));
      switch (c) {
        case "b": return "\b"; case "t": return "\t"; case "n": return "\n";
        case "f": return "\f"; case "r": return "\r"; default: return c;
      }
    });
  }

  // ---- JSONツリーの `_N`（1始まり配列）アクセス対応 ----
  // V4 OxJson.getProp 準拠。`木:results_1` を `木.results[0]` に解決する。
  // トランスパイラは `obj:name` を直接 `obj['name']` にコンパイルし system.read を経由しないため、
  // JSON.parse 出力を Proxy でラップして get トラップで `名前_N`→`配列[N-1]` を解決する。
  // 読み取り専用の純粋JSONデータ限定なので代入・他アクセス・非JSONデータには影響しない（ゼロ回帰）。
  function isPlainContainer(v) {
    if (v === null || typeof v !== "object") return false;
    if (Array.isArray(v)) return true;
    // JSON.parse 由来の素のオブジェクト（constructor が Object）のみ対象
    return v.constructor === Object || Object.getPrototypeOf(v) === null;
  }
  var NIDX_HANDLER = {
    get: function (target, prop) {
      if (prop === "__isNIDXProxy__") return true;
      if (typeof prop === "string" && !(prop in target)) {
        var m = prop.match(/^(.+)_(\d+)$/);
        if (m) {
          var base = m[1], idx = parseInt(m[2], 10);
          var arr = target[base];
          if (Array.isArray(arr) && idx >= 1 && idx <= arr.length) {
            var el = arr[idx - 1];
            return (el === null) ? undefined : wrapTree(el);
          }
        }
      }
      var val = target[prop];
      if (val === null) return undefined;          // JSON の null は未定義（V4 OxUndef）
      if (typeof val === "function") return val; // Array.prototype の長さ?/それぞれ実行 等
      return isPlainContainer(val) ? wrapTree(val) : val;
    }
  };
  function wrapTree(v) {
    if (!isPlainContainer(v)) return v;       // プリミティブ/null/非plainは素通し
    if (v.__isNIDXProxy__) return v;          // 二重ラップ防止
    return new G.Proxy(v, NIDX_HANDLER);
  }
  // 大データでスタックを溢れさせない base64（32KBチャンク）
  function u8ToBase64(u8) {
    var CHUNK = 0x8000, idx = 0, len = u8.length, parts = [];
    while (idx < len) {
      var slice = u8.subarray(idx, Math.min(idx + CHUNK, len));
      parts.push(String.fromCharCode.apply(null, slice));
      idx += CHUNK;
    }
    return G.btoa(parts.join(""));
  }
  // bytes ラッパー: (応答:bytes)！長さ? / base64
  function makeBytes(u8) {
    var w = {
      __data__: u8,
      "長さ?": function () { return this.__data__.length; },
      "size?": function () { return this.__data__.length; },
      "size": function () { return this.__data__.length; },
      "base64": function () { return u8ToBase64(this.__data__); }
    };
    return w;
  }
  // 応答オブジェクト（plain object: 応答:キー が効く / header は配列で 応答:header_N）
  // V4 OxWebClient.doRequest: 戻り値は本文の文字列（\uXXXX を戻したもの）に
  // header/retcode/retmsg/body(生の本文)/bytes のプロパティを付けたもの。
  // → String オブジェクトにプロパティを付けて返す（文字列としても 応答:キー としても使える）。
  function makeResponse(body, retcode, retmsg, headerArr, u8) {
    var text = (body.indexOf("\\u") >= 0) ? unescapeJava(body) : body;
    var r = new G.String(text);
    r.body = body;
    r.retcode = retcode;
    r.retmsg = retmsg;
    r.header = headerArr;
    r.bytes = makeBytes(u8);
    return r;
  }
  // V4 OxWebClient.httpReason（fetch の statusText は HTTP/2 等で空になるため自前で持つ）
  function httpReason(code, fallback) {
    switch (code) {
      case 200: return "OK"; case 201: return "Created"; case 204: return "No Content";
      case 301: return "Moved Permanently"; case 302: return "Found";
      case 400: return "Bad Request"; case 401: return "Unauthorized"; case 403: return "Forbidden";
      case 404: return "Not Found"; case 500: return "Internal Server Error";
      default: return fallback || ("HTTP " + code);
    }
  }
  // URL に使えない文字（空白・日本語 等）だけを UTF-8 で百分率エンコード（V4 safeUri）
  function safeUri(u) {
    var bytes = new G.TextEncoder().encode(String(u)), out = "";
    for (var i = 0; i < bytes.length; i++) {
      var c = bytes[i];
      if (c > 0x20 && c < 0x7f && "\"<>\\^`{|}".indexOf(String.fromCharCode(c)) < 0) out += String.fromCharCode(c);
      else out += "%" + (c < 16 ? "0" : "") + c.toString(16).toUpperCase();
    }
    return out;
  }
  // http(s) の URL にポートが無ければ差し込む（V4 withPort）
  function withPort(u, port) {
    var m = String(u).match(/^(https?:\/\/)([^\/?#]*)(.*)$/);
    if (!m || /:\d+$/.test(m[2])) return u;
    return m[1] + m[2] + ":" + port + m[3];
  }

  // ---- fetch 共通ドライバ（Promise(応答obj) を返す） ----
  // ※ run.html は Promise ポリフィル(promise.js)を読み込んでおり、ランタイムの
  //   AsyncByGenerator.isPromise は `instanceof Promise`(=ポリフィル) で判定する。
  //   ネイティブ fetch().then() はネイティブ Promise を返し instanceof に通らず await されない。
  //   → 必ず `new G.Promise`（グローバル＝ポリフィル）でラップして返す。
  function dtlFetch(method, url, headers, body, timeoutSec, encoding) {
    return new G.Promise(function (resolve, reject) {
      var timedOut = false;
      var timeoutMs = (timeoutSec && timeoutSec > 0 ? timeoutSec : 30) * 1000;
      var controller = (typeof G.AbortController === "function") ? new G.AbortController() : null;
      var timer = G.setTimeout(function () { timedOut = true; if (controller) controller.abort(); }, timeoutMs);

      var init = { method: method };
      if (controller) init.signal = controller.signal;
      if (headers && Object.keys(headers).length) init.headers = headers;
      if (body !== undefined && body !== null && method !== "GET" && method !== "HEAD") {
        init.body = body;
      }

      G.fetch(safeUri(url), init).then(function (resp) {
        var retcode = String(resp.status);
        var retmsg = httpReason(resp.status, resp.statusText);
        var headerArr = [];
        // V4: header は「キー=値」の配列
        resp.headers.forEach(function (v, k) { headerArr.push(k + "=" + v); });
        return resp.arrayBuffer().then(function (buf) {
          var u8 = new G.Uint8Array(buf);
          var text = "";
          var dec;
          try { dec = new G.TextDecoder(encoding || "utf-8"); } catch (e) { dec = new G.TextDecoder("utf-8"); }
          try { text = dec.decode(u8); } catch (e) { text = ""; }
          G.clearTimeout(timer);
          resolve(makeResponse(text, retcode, retmsg, headerArr, u8));
        });
      }).catch(function (e) {
        // V4: 接続できない・時間切れは実行時エラー。ブラウザでは CORS で拒まれた場合も区別できずここに来る。
        G.clearTimeout(timer);
        if (timedOut) {
          reject(rtError("RT_WEB", "Web クライアント: " + timeoutSec + "秒待っても応答がありませんでした（" + url + "）。"));
        } else {
          reject(rtError("RT_WEB", "Web クライアント: " + url + " に接続できませんでした。URL を確認してください。" +
            "（ブラウザでは、相手のサーバーが他のサイトからの利用（CORS）を許可していない場合も接続できません。）"));
        }
      });
    });
  }

  // テスト用に純粋ロジックを公開
  root.WebClientFetchDriver = {
    toJsonString: toJsonString, parseJson: parseJson, u8ToBase64: u8ToBase64,
    makeBytes: makeBytes, makeResponse: makeResponse, dtlFetch: dtlFetch,
    wrapTree: wrapTree, parseJsonStrict: parseJsonStrict, unescapeJava: unescapeJava,
    safeUri: safeUri, withPort: withPort
  };

  // ---- ドリトルメソッドを Webクライアント（親）に定義 ----
  var WC = root["Webクライアント"];
  if (!WC) return; // WebClient.js 未ロード時は何もしない（防御）

  // 送信時に使うヘッダを組み立て（_langcode 未設定なら Accept-Language: ja）
  function effectiveHeaders(self, extra) {
    var h = shallowCopy(self.__reqHeaders);
    if (extra) for (var k in extra) h[k] = extra[k];
    if (!hasHeaderCI(h, "accept-language")) {
      h["Accept-Language"] = (self._langcode ? String(self._langcode) : "ja");
    }
    return h;
  }
  function timeoutOf(self) {
    // V4: readTimeout（秒）既定30。connectTimeout は fetch では一本化。
    return (self.readTimeout && self.readTimeout > 0) ? self.readTimeout : 30;
  }

  // initialize: 旧実装は (url)(ポート) 必須で、無引数だと alert を出した。
  // V4の新モデルは `webクライアント！作る`（無引数）で、url は 読む/送る に渡す。
  // 無引数を許容し、url 指定時のみ this.url を設定（ポート指定時はホスト直後に挿入）。
  WC["initialize"] = dtlbind(root, function (url, port) {
    try { this.param = root["辞書"]["作る"](); } catch (e) { this.param = null; }
    this.__reqHeaders = {};
    if (url != null && url !== "") {
      if (port != null && port !== "") {
        this.url = String(url).replace(/^(https?:\/\/[^\/:]+)/, "$1:" + port);
      } else {
        this.url = url;
      }
    }
    return this;
  });

  function isNum(v) { return typeof v === "number" || (v instanceof G.Number); }
  function isBytes(v) { return !!(v && v.__data__ && typeof v.__data__.length === "number" && v.__data__.buffer); }
  function needArg(method) {
    return rtError("RT_NEED_ARG", "『" + method + "』に必要な引数が足りません。");
  }
  // 引数を省略した GET: url プロパティ＋文字列・数のプロパティからクエリを組み立てる（V4 buildGetUrl）
  var SKIP_PROPS = { "url": 1, "自分": 1, "じぶん": 1, "self": 1, "자신": 1, "connecttimeout": 1,
    "readtimeout": 1, "body": 1, "ヘッダ": 1, "param": 1 };
  function buildGetUrl(self) {
    var u = self.url;
    if (u === undefined || u === null || u === "") return null;
    u = String(u);
    var has = u.indexOf("?") >= 0;
    for (var k in self) {
      if (!Object.prototype.hasOwnProperty.call(self, k)) continue;
      if (SKIP_PROPS[k.toLowerCase()] || k.charAt(0) === "_") continue;
      var v = self[k];
      if (typeof v !== "string" && typeof v !== "number") continue;
      v = String(v);
      if (v === "") continue;
      u += (has ? "&" : "?") + k + "=" + G.encodeURIComponent(v);
      has = true;
    }
    return u;
  }

  // ヘッダ: インスタンスに保持（setHeader 的・チェーン可）。キーと値の2つが必要
  WC["ヘッダ"] = dtlbind(root, function (key, val) {
    if (arguments.length < 2 || key === undefined || val === undefined) throw needArg("ヘッダ");
    if (!this.__reqHeaders || !Object.prototype.hasOwnProperty.call(this, "__reqHeaders")) {
      this.__reqHeaders = shallowCopy(this.__reqHeaders);
    }
    this.__reqHeaders[String(key)] = String(val);
    return this;
  });

  // 読む: GET（V4 OxWebClient.get）。
  //   (url) 読む / (url)(ポート) 読む / (url)(エンコーディング) 読む / 引数なし＝url プロパティ＋クエリ
  WC["読む"] = dtlbind(root, function () {
    var args = arguments, url;
    if (args.length >= 1 && args[0] != null && !isNum(args[0])) url = String(args[0]);
    else url = buildGetUrl(this);
    if (url == null) throw needArg("読む");
    var encoding = "utf-8", i;
    for (i = 1; i < args.length; i++) {
      if (isNum(args[i])) { url = withPort(url, Number(args[i])); break; }
    }
    for (i = 1; i < args.length; i++) {
      if (!isNum(args[i]) && args[i] != null) {
        var s = String(args[i]);
        if (!/^[A-Za-z]+$/.test(s)) encoding = s;   // メソッド名でない文字列はエンコーディング
      }
    }
    return dtlFetch("GET", url, effectiveHeaders(this, null), null, timeoutOf(this), encoding);
  });

  // 本文つきの要求（POST/PUT/…）の共通処理（V4 sendWithBody）。args = [url?, body?]、無ければ url/body プロパティ
  function sendWithBody(self, method, args, name) {
    var url = null, body;
    if (args.length >= 1 && args[0] != null && !isNum(args[0])) url = String(args[0]);
    if (args.length >= 2) body = args[1];
    if (url == null) {
      if (self.url === undefined || self.url === null || self.url === "") throw needArg(name);
      url = String(self.url);
    }
    if (body === undefined) body = self.body;
    var extra = null, payload;
    var userCT = hasHeaderCI(self.__reqHeaders || {}, "content-type");
    if (body === undefined || body === null) {
      payload = "";
    } else if (isBytes(body)) {
      payload = body.__data__;                        // 画像などのバイナリはそのまま送る
      if (!userCT) extra = { "Content-Type": "application/octet-stream" };
    } else if (typeof body === "string" || body instanceof G.String) {
      payload = String(body);
    } else {
      payload = toJsonString(body);                   // オブジェクト/配列は JSON にして送る
      if (!userCT) extra = { "Content-Type": "application/json; charset=UTF-8" };
    }
    return dtlFetch(method, url, effectiveHeaders(self, extra), payload, timeoutOf(self), "utf-8");
  }

  // 送る: POST
  WC["送る"] = dtlbind(root, function () {
    return sendWithBody(this, "POST", Array.prototype.slice.call(arguments), "送る");
  });

  // 要求: 任意メソッド ("PUT")(url)(body) 要求。
  WC["要求"] = dtlbind(root, function () {
    if (arguments.length < 1 || arguments[0] == null) throw needArg("要求");
    var method = String(arguments[0]).toUpperCase();
    return sendWithBody(this, method, Array.prototype.slice.call(arguments, 1), "要求");
  });

  // json解析 / jsonにする（親に定義 → インスタンスからもクラス側からも呼べる）
  WC["json解析"] = dtlbind(root, function (str) {
    if (arguments.length < 1) throw rtError("RT_NEED_ARG", "『json解析』には JSON の文字列を指定してください。");
    return parseJsonStrict(str);
  });
  WC["jsonにする"] = dtlbind(root, function (obj) { return toJsonString(obj); });

  // 英語/日本語エイリアス（webapi.js と同じインライン方式。Japanese2.js 編集不要）
  root.addAlias.call(WC, "読む", "read", "get");
  root.addAlias.call(WC, "送る", "post", "送信");
  root.addAlias.call(WC, "要求", "request");
  root.addAlias.call(WC, "ヘッダ", "setheader", "setHeader");
  root.addAlias.call(WC, "json解析", "parsejson", "parseJson");
  root.addAlias.call(WC, "jsonにする", "tojson", "toJson");

  // オブジェクト名の別名: V4/handover は小文字 `webクライアント` を使う（既存は `Webクライアント`）。
  root.addAlias.call(root, "Webクライアント", "webクライアント");
}).checkerror().apply(root, []);
