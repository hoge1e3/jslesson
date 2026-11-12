// Image.js — タートル非依存の汎用「画像」オブジェクト（引き継ぎ §10）
//
// dolittleV4(docs/image.md) のドリトル記法をオンライン版で動かす。
//   え＝画像！(ソース) 作る。  ソース＝ファイル名/URL/data URI/base64:.../§9 bytes(応答:bytes)/別の画像
//   え！(x)(y) 位置。 / (dx)(dy) 移動。 / (s) 大きさ。 / (度) 右回り。/左回り。
//   え！現れる。/消える。/手前に表示。/ (ソース) 差し替え。/ バイト。/ base64。
// Actor を継承し、移動/回転/拡大/Z順序を流用。SVG <image> で描画（Y反転で正立表示）。
// 衝突は非対応: group.members に登録せず svg_g へ直接 append するため、タートル衝突の
// 対象にならない（誤検出ゼロ）。
//
// ロード順注意: Japanese2.js より前に読み込むこと（root登録＋case-insensitive別名対象化）。
// WebClientFetch.js(§9) は実行時に遅延参照（後ロードでも可）。

(function () {
  var root = this; // this === root（apply(root) による）
  var G = (root && root.window) ? root.window : (typeof window !== "undefined" ? window : globalThis);

  // ============================================================
  // 純粋ヘルパ（root非依存・テスト可能）— root.DolittleImage に公開
  // ※ Actor 未定義（テスト時）でもここまでは実行され公開される
  // ============================================================
  function isU8(v) {
    return !!v && (typeof v === "object") &&
      ((typeof G.Uint8Array === "function" && v instanceof G.Uint8Array) ||
       (typeof v.length === "number" && v.BYTES_PER_ELEMENT === 1 && v.buffer));
  }
  function b64encode(u8) {
    var CHUNK = 0x8000, idx = 0, len = u8.length, parts = [];
    while (idx < len) {
      parts.push(String.fromCharCode.apply(null, u8.subarray(idx, Math.min(idx + CHUNK, len))));
      idx += CHUNK;
    }
    return G.btoa(parts.join(""));
  }
  function b64decode(b64) {
    var bin = G.atob(b64), u8 = new G.Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return u8;
  }
  function sniffMime(u8) {
    if (!u8 || u8.length < 4) return "image/png";
    var b = u8;
    if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47) return "image/png";
    if (b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return "image/jpeg";
    if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return "image/gif";
    if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46) return "image/webp";
    return "image/png";
  }
  function u8ToDataURI(u8, mime) {
    return "data:" + (mime || sniffMime(u8)) + ";base64," + b64encode(u8);
  }
  // ソース → { kind, href(表示用URL/dataURI), bytes(Uint8Array|null) }
  function classifySource(src) {
    if (src && src.__isDolittleImage__) {
      return { kind: "image", href: src._href || "", bytes: src._bytes || null };
    }
    var u8 = null;
    if (src && src.__data__ && isU8(src.__data__)) u8 = src.__data__; // §9 bytesラッパ
    else if (isU8(src)) u8 = src;
    if (u8) return { kind: "bytes", href: u8ToDataURI(u8), bytes: u8 };
    if (typeof src === "string") {
      if (src.indexOf("data:") === 0) {
        var m = src.match(/;base64,(.*)$/);
        return { kind: "datauri", href: src, bytes: m ? b64decode(m[1]) : null };
      }
      if (src.indexOf("base64:") === 0) {
        var b = b64decode(src.slice(7));
        return { kind: "base64", href: u8ToDataURI(b), bytes: b };
      }
      // パス区切り "/" を含むものは（相対/絶対）URLとしてそのまま使う。
      // 区切りの無い素のファイル名のみ baseURL(runtime/images/) を付与する。
      if (src.indexOf("/") >= 0) {
        return { kind: "url", href: src, bytes: null };
      }
      return { kind: "filename", href: src, bytes: null };
    }
    return { kind: "unknown", href: "", bytes: null };
  }
  // 塗る/背景画像 の実行時判定: 画像ソースなら true、色名/#hex/Colorオブジェクトなら false
  function isImageSource(src) {
    if (src && src.__isDolittleImage__) return true;
    if (src && src.__data__ && isU8(src.__data__)) return true;
    if (isU8(src)) return true;
    if (typeof src === "string") {
      if (src.indexOf("data:") === 0 || src.indexOf("base64:") === 0) return true;
      if (/^https?:\/\//.test(src)) return true;
      if (/\.(png|jpe?g|gif|webp|bmp|svg)(\?|#|$)/i.test(src)) return true;
      return false;
    }
    return false;
  }
  function makeBytesFallback(u8) {
    return {
      __data__: u8,
      "長さ?": function () { return this.__data__.length; },
      "size?": function () { return this.__data__.length; },
      "size": function () { return this.__data__.length; },
      "base64": function () { return b64encode(this.__data__); }
    };
  }

  // ---- 画像ソースの読み込み（V4 FXImage.loadFrom 相当・2026-09-27） ----
  // V4 は「まずバイト列を得る → 画像として解読できるか確かめる」。読めなければエラー。
  // ブラウザでは fetch でバイト列を取り、<img> で解読できるかを確かめる（非同期＝G.Promise）。
  function rtError(code, msg) {
    var R = G.DolittleRuntimeError;
    if (R && R.RtError) return R.RtError(code, msg);
    var e = new Error(msg); e.isDolittleRt = true; e.dtlCode = code; return e;
  }
  function showSrc(src) {
    if (src === undefined || src === null) return "（値なし）";
    var s = String(src);
    if (s.length > 40) s = s.slice(0, 40) + "…";
    return "『" + s + "』";
  }
  // 画像のもととして受け付ける型か（同期で判定。数・真偽値・ふつうのオブジェクトは不可）
  function checkSourceType(src, method) {
    method = method || "作る";
    if (src === undefined || src === null) {
      throw rtError("RT_NEED_ARG", "『" + method + "』には画像のもと（画像ファイル名・URL・バイト列・画像）を指定してください。");
    }
    if (src.__isDolittleImage__) return;
    if (src.__data__ && isU8(src.__data__)) return;
    if (isU8(src)) return;
    if (typeof src === "string" || src instanceof G.String) return;
    throw rtError("RT_TYPE", "『" + method + "』の画像のもとには、画像ファイル名・URL・バイト列・base64 の文字列・画像を指定してください（" +
      showSrc(src) + "は使えません）。");
  }
  // バイト列が画像として解読できるか（<img> に読ませて確かめる）。解読できたら resolve(true)
  function decodable(u8) {
    return new G.Promise(function (resolve) {
      if (!u8 || !u8.length) { resolve(false); return; }
      var img = new G.Image();
      img.onload = function () { resolve(true); };
      img.onerror = function () { resolve(false); };
      img.src = u8ToDataURI(u8);
    });
  }
  // URL を <img> で読めるか（CORS でバイト列を取れない外部画像の確認用）
  function urlLoadable(url) {
    return new G.Promise(function (resolve) {
      var img = new G.Image();
      img.onload = function () { resolve(true); };
      img.onerror = function () { resolve(false); };
      img.src = url;
    });
  }
  // ソース → G.Promise({href, bytes})。読めない・画像でないときは RtError で reject。
  // baseURL: 素のファイル名に付ける場所（runtime/images/）
  function loadSource(src, baseURL, method) {
    try { checkSourceType(src, method); }
    catch (e) { return G.Promise.reject(e); }
    if (src instanceof G.String) src = String(src);
    var r = classifySource(src);
    var notImage = function () {
      return rtError("RT_IMAGE", "画像として読めないデータです（" + showSrc(typeof src === "string" ? src : "バイト列") +
        "は画像のデータではありません）。");
    };
    if (r.kind === "image") {
      return G.Promise.resolve({ href: r.href, bytes: r.bytes });
    }
    if (r.kind === "bytes" || r.kind === "datauri" || r.kind === "base64") {
      var u8;
      if (r.kind === "bytes") u8 = r.bytes;
      else {
        try { u8 = (r.kind === "base64") ? b64decode(src.slice(7)) : (r.bytes || b64decode(src.slice(src.indexOf(",") + 1))); }
        catch (e) { return G.Promise.reject(notImage()); }
      }
      return decodable(u8).then(function (ok) {
        if (!ok) throw notImage();
        return { href: (r.kind === "datauri") ? src : u8ToDataURI(u8), bytes: u8 };
      });
    }
    // ファイル名 / URL: fetch でバイト列を取る
    var url = (r.kind === "filename") ? (baseURL || "") + src : src;
    var missing = function () {
      return rtError("RT_IMAGE", "画像ファイル" + showSrc(src) + "を読み込めません。ファイル名（または URL）を確認してください。");
    };
    return new G.Promise(function (resolve, reject) {
      G.fetch(url).then(function (resp) {
        if (!resp.ok) { reject(missing()); return; }
        return resp.arrayBuffer().then(function (buf) {
          var u8 = new G.Uint8Array(buf);
          return decodable(u8).then(function (ok) {
            if (!ok) reject(notImage());
            else resolve({ href: url, bytes: u8 });
          });
        });
      }).catch(function () {
        // 取得できない（CORS を許可していない外部の画像など）: 表示だけできるかを <img> で確かめる。
        // 表示できればバイト列なしで使う（従来どおり）。表示もできなければエラー。
        urlLoadable(url).then(function (ok) {
          if (ok) resolve({ href: url, bytes: null });
          else reject(missing());
        });
      });
    });
  }

  root.DolittleImage = {
    isU8: isU8, b64encode: b64encode, b64decode: b64decode, sniffMime: sniffMime,
    u8ToDataURI: u8ToDataURI, classifySource: classifySource, isImageSource: isImageSource,
    makeBytesFallback: makeBytesFallback, checkSourceType: checkSourceType, loadSource: loadSource
  };

  // テスト環境（Actor未ロード）ではここで終了（純粋ヘルパは公開済み）
  if (!root.Actor) return;

  // ============================================================
  // 画像オブジェクト（Actor 継承）
  // ============================================================
  this.Image = this.Actor.create();
  this.Image.__isDolittleImage__ = true;
  this.Image.baseURL = this.window.runtimePath + "images/";
  this.Image.width = 32;
  this.Image.height = 32;

  // 中心揃え（Turtle.adjustImage と同等）
  this.Image.adjustImage = dtlbind(this, function () {
    return this.element
      .attr("width", this.width + "px")
      .attr("height", this.height + "px")
      .attr("x", -this.width / 2)
      .attr("y", -this.height / 2);
  });

  // 自然寸法を隠し<img>で取得（Turtle.getImageSize と同等）
  this.Image.getImageSize = dtlbind(this, function (url) {
    var t = this;
    return this.$
      .create("<img>")
      .css("display", "none")
      .load(dtlbind(this, function () {
        var j = t.$.create(this);
        t.width = j.width();
        t.height = j.height();
        t.adjustImage();
        return j.remove();
      }))
      .attr("src", url)
      .appendTo("body");
  });

  // ソースを解決して href を設定（_bytes/_href を保持）。表示はすぐに切り替え、
  // バイト列と「画像として読めるか」の確認は _loadSource（非同期）で行う。
  this.Image._applySource = dtlbind(this, function (source) {
    var r = root.DolittleImage.classifySource(source);
    var href = r.href;
    if (r.kind === "filename") href = this.baseURL + source;
    this._bytes = r.bytes || null;
    this._href = href;
    this.element.get(0).setAttributeNS("http://www.w3.org/1999/xlink", "href", href);
    this.getImageSize(href);
    return this;
  });
  // 読み込みの結果（{href, bytes}）を反映する
  this.Image._setLoaded = dtlbind(this, function (res) {
    this._bytes = res.bytes || null;
    if (res.href && res.href !== this._href) {
      this._href = res.href;
      this.element.get(0).setAttributeNS("http://www.w3.org/1999/xlink", "href", res.href);
      this.getImageSize(res.href);
    }
    return this;
  });
  // ソースを読み込み、成功したら自分を返す Promise。読めなければ RtError で reject
  this.Image._loadSource = dtlbind(this, function (source, method) {
    var t = this;
    return root.DolittleImage.loadSource(source, this.baseURL, method).then(function (res) {
      t._setLoaded(res);
      return t;
    });
  });

  this.Image.initialize = dtlbind(this, function (source) {
    this.pos = this.Vec2.O;
    this.dir = 0;
    this._scalex = 1;
    this._scaley = 1;
    this.isShowing = this.false;
    this.element = this.createSVGElem("image");
    this.element.attr("transform", "scale(1,-1)");
    this._applySource(source);
    this.appear();
    return this;
  });

  // 作る（V4 FXImage.make 準拠）: 引数なし・画像でないもの・読めないファイルはエラー。
  // 画像はすぐ表示し、バイト列の読み込みを待ってから作った画像を返す（G.Promise＝実行は待つ）。
  this.Image.create = dtlbind(this, function (source) {
    root.DolittleImage.checkSourceType(source, "作る");
    var img = Object.create(this);
    img.initialize(source);
    return img._loadSource(source, "作る").then(null, function (e) {
      img.hide();
      throw e;
    });
  });

  // 独自 setTrans: Y反転(scale sx,-sy)で正立。checkCrash は呼ばない（衝突非対応）
  this.Image.setTrans = dtlbind(this, function () {
    var str = "translate(" + this.pos.x + " " + this.pos.y + ") " +
      "rotate(" + this.dir + ") " +
      "scale(" + this._scalex + " " + (0 - this._scaley) + ") ";
    this.element.attr("transform", str)
      .attr("data-trans", this.pos.x + "," + this.pos.y + "," + this.dir);
    return this;
  });

  // 独自 show/hide: group.members に登録せず svg_g へ直接 append（誤衝突防止）
  this.Image.show = dtlbind(this, function () {
    this.svg_g.append(this.element);
    this.isShowing = this.true;
    this.setTrans();
    return this;
  });
  this.Image.hide = dtlbind(this, function () {
    if (this.element) this.element.detach();
    this.isShowing = this.false;
    return this;
  });
  // 表示されているか（V4 FXImage.showp）
  this.Image["show?"] = dtlbind(this, function () {
    return this.isShowing ? this.true : this.false;
  });
  // toFront / getCrashShape は Actor 継承（getCrashShape は group.add 互換の保険）

  // ---- 引数の検査（V4 FXImage: 引数不足・数でない値はエラー） ----
  function needNumbers(method, args, count) {
    var R = root.window.DolittleRuntimeError;
    for (var i = 0; i < count; i++) {
      var v = args[i];
      if (v === undefined) {
        throw R.RtError("RT_NEED_ARG", "『" + method + "』には数を" + count + "つ指定してください。");
      }
      if (typeof v === "boolean" || v === null || v === "" || isNaN(Number(v))) {
        throw R.RtError("RT_NEED_NUMBER", "『" + method + "』には数を指定してください。数でないもの『" + String(v) + "』が渡されました。");
      }
    }
  }
  this.Image.moveTo = dtlbind(this, function (x, y) {
    needNumbers("位置", arguments, 2);
    this.pos = this.Vec2.create(Number(x), Number(y));
    return this.setTrans();
  });
  this.Image.moveBy = dtlbind(this, function (dx, dy) {
    needNumbers("移動", arguments, 2);
    this.pos = this.Vec2.create(this.pos.x + Number(dx), this.pos.y + Number(dy));
    return this.setTrans();
  });
  this.Image.scale = dtlbind(this, function (sx, sy) {
    needNumbers("大きさ", arguments, (arguments.length >= 2 ? 2 : 1));
    if (arguments.length < 2) sy = sx;
    this._scalex = this._scalex * Number(sx);
    this._scaley = this._scaley * Number(sy);
    this._scale = Math.max(this._scalex, this._scaley);
    return this.setTrans();
  });
  // 右回り・左回り: 角度を省略すると 90 度（V4 FXImage.turnRight/turnLeft）
  this.Image.turnLeft = dtlbind(this, function (by) {
    if (arguments.length > 0) needNumbers("左回り", arguments, 1); else by = 90;
    this.dir = this.dir + Number(by);
    return this.setTrans();
  });
  this.Image.turnRight = dtlbind(this, function (by) {
    if (arguments.length > 0) needNumbers("右回り", arguments, 1); else by = 90;
    this.dir = this.dir - Number(by);
    return this.setTrans();
  });
  this.Image.leftTurn = this.Image.turnLeft;
  this.Image.rightTurn = this.Image.turnRight;

  // 差し替え: 画像だけ置換（位置・回転・拡大・表示状態は保持）。読めなければエラー
  this.Image.setImage = dtlbind(this, function (source) {
    root.DolittleImage.checkSourceType(source, "差し替え");
    return this._loadSource(source, "差し替え");
  });

  // バイト（§9 OxBytesラッパを返す）/ base64（文字列）
  this.Image.toBytes = dtlbind(this, function () {
    var u8 = this._bytes;
    if (!u8) {
      var m = ("" + this._href).match(/;base64,(.*)$/);
      u8 = m ? root.DolittleImage.b64decode(m[1]) : new G.Uint8Array(0);
    }
    return (root.WebClientFetchDriver && root.WebClientFetchDriver.makeBytes)
      ? root.WebClientFetchDriver.makeBytes(u8)
      : root.DolittleImage.makeBytesFallback(u8);
  });
  this.Image.toBase64 = dtlbind(this, function () {
    if (this._bytes) return root.DolittleImage.b64encode(this._bytes);
    var m = ("" + this._href).match(/;base64,(.*)$/);
    return m ? m[1] : "";
  });

  // 英語名（V4 docs/image.md: create・setImage・move・scale・turnRight・turnLeft・show・hide・
  // moveToFront・bytes・base64）。日本語名は Japanese2.js で付与。
  this.Image.addAlias("setImage", "setimage");
  this.Image.addAlias("toBytes", "tobytes", "bytes");
  this.Image.addAlias("toBase64", "tobase64");
  this.Image.addAlias("moveBy", "move");
  this.Image.addAlias("toFront", "moveToFront", "movetofront");
  this.Image.addAlias("turnRight", "turnright");
  this.Image.addAlias("turnLeft", "turnleft");
}).checkerror().apply(root, []);
