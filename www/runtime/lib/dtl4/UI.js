(function () {
  this.Screen = this.create();
  this.Screen["width?"] = dtlbind(this, function () {
    return this.$.create(this.window).width();
  });
  this.Screen["height?"] = dtlbind(this, function () {
    return this.$.create(this.window).height();
  });
  // 背景画像（画面！(ソース) 背景画像）: キャンバス全面にストレッチ。
  // 描画SVGは position:absolute で body が高さ0のため、ビューポート高を持つ html に背景を設定する。
  this.Screen.setpanelimage = dtlbind(this, function (source) {
    var href = source;
    if (root.DolittleImage) {
      var r = root.DolittleImage.classifySource(source);
      href = (r.kind === "filename")
        ? (this.window.runtimePath + "images/" + source)
        : r.href;
    }
    this.$.create("#turtle_svg").css({
      "background-image": "url('" + href + "')",
      "background-size": "100% 100%",
      "background-repeat": "no-repeat",
      "background-position": "center"
    });
    // 読めない画像（存在しないファイル・画像でないデータ）はエラー（V4: 画像の 作る と同じ扱い）
    if (root.DolittleImage && root.DolittleImage.loadSource) {
      var t = this;
      return root.DolittleImage.loadSource(source, this.window.runtimePath + "images/", "背景画像")
        .then(function () { return t; }, function (e) {
          t.$.create("#turtle_svg").css("background-image", "none");
          throw e;
        });
    }
    return this;
  });
  // 塗る: 引数が画像ソースなら背景画像、色なら背景色（画像指定済みなら解除）
  // 描画SVG(#turtle_svg)の背景に設定すると描画内容の背後に表示される（body伝播の影響を受けない）。
  this.Screen.paint = dtlbind(this, function (c) {
    if (root.DolittleImage && root.DolittleImage.isImageSource(c)) {
      return this.setpanelimage(c);
    }
    return this.$.create("#turtle_svg")
      .css("background-image", "none")
      .css("background-color", c + "");
  });
  this.addAlias("Screen", "Panel");
  // ===== GUI部品の共通ヘルパ（V4.02 機能テスト対応, 2026-09-27） =====
  // 数として読めれば数値、読めなければ null（V4 OxObject.isToNumber 相当: 全角数字・全角記号・前後の空白も可）。
  var guiToNum = function (v) {
    if (typeof v === "number") return isNaN(v) ? null : v;
    if (typeof v !== "string") return null;
    var s = v
      .replace(/[０-９．]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 65248); })
      .replace(/[－−ー]/g, "-")
      .replace(/＋/g, "+")
      .replace(/^[\s　]+|[\s　]+$/g, "");
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
    return Number(s);
  };
  var guiShowValue = function (v) {
    if (v === undefined || v === null) return "（値なし）";
    if (typeof v === "boolean") return v ? "『はい』" : "『いいえ』";
    return "『" + String(v) + "』";
  };
  // 数でない引数は学習者向けの実行時エラーにする（V4 の引数検査 reqDouble 相当）。数値を返す。
  var guiNeedNum = function (v, method) {
    var n = guiToNum(v);
    if (n === null) {
      var msg = "『" + method + "』には数を指定してください。数でないもの" + guiShowValue(v) + "が渡されました。";
      var R = root.window.DolittleRuntimeError;
      throw R && R.RtError ? R.RtError("RT_NEED_NUMBER", msg) : new Error(msg);
    }
    return n;
  };
  this.UI = this.create();
  this.UI.valueOf = dtlbind(this, function () {
    var ret;
    var halfval;
    ret = undefined;
    if (this.element.text) {
      ret = this.element.text();
    }
    if (!ret && this.element.val) {
      ret = this.element.val();
    }
    if (!ret && this.element.innerHTML) {
      ret = this.element.innerHTML();
    }
    halfval = ("" + ret).replace(
      root.window.RegExp("[０-９．]", "g"),
      dtlbind(this, function (tmpStr) {
        return root.window.String.fromCharCode(tmpStr.charCodeAt(0) - 65248);
      }),
    );
    if (root.window.parseFloat(halfval)) {
      return root.window.parseFloat(halfval);
    } else {
      return ret;
    }
  });
  this.UI.setTrans = dtlbind(this, function () {
    var str;
    str = "postion:absolute;left:" + this.pos.x + ";top:" + this.pos.y + ";";
    this.element
      .attr("transform", str)
      .attr("data-trans", this.pos.x + "," + this.pos.y);
    return this;
  });
  this.UI.hide = dtlbind(this, function () {
    if (this.element) {
      this.element.css("visibility", "hidden");
    }
    return this;
  });
  this.UI.show = dtlbind(this, function () {
    if (this.element) {
      this.element.css("visibility", "visible");
    }
    return this;
  });
  this.UI.addAlias("hide", "die");
  this.UI.addAlias("show", "appear");
  this.UI.top = this.Screen["height?"]() / 2 - 20;
  // HTML モード（本文にタグがある、または「HTML！使う」。root.system.htmlMode）: 部品を #UI_div の座標の層でなく本文の流れ（#HTML_div）に置く。
  // 命令は同じ。「次の行」は <br>、「位置」を指定したときだけ従来どおり #UI_div の層へ移す。タグも宣言も無い従来のプログラムはこの経路を通らない（2026-10-26）
  this.UI.inHtmlFlow = dtlbind(this, function () {
    return !!(root.system.htmlMode && root.htmldom && typeof root.htmldom.container === "function");
  });
  this.UI.autoLayout = dtlbind(this, function () {
    // 生成した部品の登録（画面上の部品の一覧 getguis 等が使う最小限のフック）。
    // root.UI.parts は ListBox の見本を作った後に用意するので、見本は登録されない。
    if (root.UI.parts && root.UI.parts.indexOf(this) < 0) root.UI.parts.push(this);
    if (this.UI.inHtmlFlow()) {
      this.UILayout.addFlow(this);
      return (this.UI.last = this);
    }
    this.UILayout.add(this);
    if (this.last) {
      this.moveTo(this.last["right?"]() + 10, this.last["top?"]());
    } else {
      this.moveTo(-this.Screen["width?"]() / 2 + 20, this.top);
    }
    return (this.UI.last = this);
  });
  this.UI.moveTo = dtlbind(this, function (left, top) {
    left = guiNeedNum(left, "位置");
    top = guiNeedNum(top, "位置");
    this.UILayout.remove(this, left, top);
    return this;
  });
  this.UI.moveBy = dtlbind(this, function (dx, dy) {
    dx = guiNeedNum(dx, "移動する");
    dy = guiNeedNum(dy, "移動する");
    return this.moveTo(this["left?"]() + dx, this["top?"]() + dy);
  });
  // 表示されているか（消える/現れる の状態）。
  this.UI["show?"] = dtlbind(this, function () {
    return !!this.element && this.element.css("visibility") !== "hidden";
  });
  this.UI["left?"] = dtlbind(this, function () {
    if (this.element) {
      return this.element.offset().left - this.UI.container.offset().left;
    } else {
      return 0;
    }
  });
  this.UI.addAlias("left?", "xpos?");
  this.UI["right?"] = dtlbind(this, function () {
    return this["left?"]() + this["width?"]();
  });
  this.UI["top?"] = dtlbind(this, function () {
    if (this.element) {
      return -(this.element.offset().top - this.UI.container.offset().top);
    } else {
      return 0;
    }
  });
  this.UI.addAlias("top?", "ypos?");
  this.UI["bottom?"] = dtlbind(this, function () {
    return this["top?"]() - this["height?"]();
  });
  this.UI["width?"] = dtlbind(this, function () {
    if (this.element) {
      return this.element.outerWidth();
    } else {
      return 0;
    }
  });
  this.UI["height?"] = dtlbind(this, function () {
    if (this.element) {
      return this.element.outerHeight();
    } else {
      return 0;
    }
  });
  this.UI.width = dtlbind(this, function (w) {
    if (this.element) {
      this.element.width(w);
    }
    return this;
  });
  this.UI.height = dtlbind(this, function (w) {
    if (this.element) {
      this.element.height(w);
    }
    return this;
  });
  this.UI.nextLine = dtlbind(this, function () {
    var top;
    var left;
    if (this.inHtmlFlowLayout && this.inUILayout) {   // HTML モードで本文の流れにある部品: 前に <br>
      this.UILayout.br(this);
      return this;
    }
    if (this.last) {
      this.console.log("NL", this.Screen["width?"](), this.last["bottom?"]());
      left = -this.Screen["width?"]() / 2 + 20;
      top = this.last["bottom?"]();
      this.moveTo(left, top);
    }
    return this;
  });
  this.UI.write = dtlbind(this, function (m) {
    if (this.element) {
      this.element.get(0).innerHTML = this.num2str(m);
    }
    return this;
  });
  this.UI.addAlias("write", "set");
  this.UI.add = dtlbind(this, function (m) {
    if (this.element) {
      this.write(this.element.get(0).innerHTML + m);
    }
    return this;
  });
  this.UI.newLine = dtlbind(this, function () {
    this.add("<br>");
    return this;
  });
  this.UI.clear = dtlbind(this, function () {
    return this.write("");
  });
  this.UI.num2strDigits = 1000000;
  this.UI.num2str = dtlbind(this, function (v) {
    if (v === this.null) {
      v = "";
    }
    if (v === this.undef) {
      v = "";
    }
    if (this["typeof"](v) === "number") {
      v = this.window.Math.round(v * this.num2strDigits) / this.num2strDigits;
    }
    return v + "";
  });
  this.UI.int2str = this.UI.num2str;
  this.UI.str2num = dtlbind(this, function (s) {
    var r;
    r = this.window.parseFloat(s);
    if (r === r) {
      return r;
    } else {
      return s;
    }
  });
  this.UI.str2int = this.UI.str2num;
  this.UI.readString = dtlbind(this, function () {
    if (this.element) {
      return this.element.text();
    } else {
      return "";
    }
  });
  this.UI.read = dtlbind(this, function () {
    return this.str2num(this.readString());
  });
  this.UI.addAlias("read", "get");
  // 増やす／減らす（V4 FXTextPart.increment 準拠）: 表示が数（全角可・空欄は0）なら引数（省略時1）を足し引きして書く。
  // 表示が数でなければ何もしない（エラーにもしない）。引数が数でなければエラー。
  this.UI.stepNumber = dtlbind(this, function (by, sign, method) {
    var step = by === undefined ? 1 : guiNeedNum(by, method);
    var cur = this.readString();
    var v = 0;
    if (cur !== undefined && cur !== null && cur !== "") {
      v = guiToNum(String(cur));
      if (v === null) return this;
    }
    return this.write(v + sign * step);
  });
  this.UI.inc = dtlbind(this, function (by) {
    return this.stepNumber(by, 1, "増やす");
  });
  this.UI.addAlias("inc", "increment");
  this.UI.dec = dtlbind(this, function (by) {
    return this.stepNumber(by, -1, "減らす");
  });
  this.UI.addAlias("dec", "decrement");
  this.UI.paint = dtlbind(this, function (r, g, b) {
    var args;
    var c;
    args = root.window.Array.prototype.slice.call(arguments);
    if (args.length === 1) {
      c = r;
    } else {
      c = this.Color.create(r, g, b);
    }
    this.element.css("background-color", c);
    return this;
  });
  this.UI.fontColor = dtlbind(this, function (r, g, b) {
    var args;
    var c;
    args = root.window.Array.prototype.slice.call(arguments);
    if (args.length === 1) {
      c = r;
    } else {
      c = this.Color.create(r, g, b);
    }
    this.element.css("color", c);
    return this;
  });
  this.UI.fontSize = dtlbind(this, function (s) {
    s = guiNeedNum(s, "文字サイズ");
    this.element.css("font-size", s + "px");   // N px（V3 の Font(N)・V4 の N px と同じ。以前は s*0.6/10 em＝0.96N px で、40 が 38.4px だった。2026-10-17）
    return this;
  });
  this.UI.size = dtlbind(this, function (w, h) {
    w = guiNeedNum(w, "大きさ");
    h = guiNeedNum(h, "大きさ");
    this.element.css("width", w + "px").css("height", h + "px");
    return this;
  });
  // フォント（名前 [大きさ]）: V4 FXGuiPart.setFont。大きさは 文字サイズ と同じ換算。
  this.UI.setFont = dtlbind(this, function (name, s) {
    if (name !== undefined && name !== null && name !== "") {
      this.element.css("font-family", String(name));
    }
    if (s !== undefined) this.fontSize(s);
    return this;
  });
  this.UI.setfocus = dtlbind(this, function () {
    if (this.element && this.element.get(0) && this.element.get(0).focus) {
      this.element.get(0).focus();
    }
    return this;
  });
  this.UI.attachEvent = dtlbind(this, function () {
    return;
  });
  // 「動作」を実行する（V4 FXGuiPart.fireAction 相当）。動作の中の「自分」はこの部品
  // （ブロックをこの部品をレシーバとして呼ぶ＝メソッド呼び出しと同じ。root.system.send と同じ関数境界で「！返す」を受け止める）。
  this.UI.callAction = function () {
    var f = this.action;
    var args = root.window.Array.prototype.slice.call(arguments);
    if (typeof f !== "function") {
      if (f && typeof f.execute === "function") return f.execute.apply(f, args);
      return;
    }
    var res;
    try {
      res = root.system.run2(f.apply(this, args));
    } catch (e) {
      if (e && e.isReturn) return e.value;
      throw e;
    }
    if (root.DtlPromise && root.DtlPromise.isPromise(res)) {
      return res.then(function (r) {
        return r;
      }, function (e) {
        if (e && e.isReturn) return e.value;
        root.system.handleError(e);
      });
    }
    return res;
  };
  this.UI.container = this.$
    .create("<div>")
    .appendTo("body")
    .attr("id", "UI_div")
    .css("position", "absolute")
    .css("left", this.Actor.originX(this.Screen["width?"]()))
    .css("top", this.Actor.originY(this.Screen["height?"]()));
  this.$.create(this.window).resize(
    dtlbind(this, function () {
      return this.UI.container
        .css("left", this.Actor.originX(this.Screen["width?"]()))
        .css("top", this.Actor.originY(this.Screen["height?"]()));
    }).bind(this),
  );
  this.UILayout = this.create();
  this.UILayout.space = 20;
  this.UILayout.initElem = dtlbind(this, function () {
    this.element = this.$.create("<div>").appendTo(this.UI.container);
    this.element
      .css("white-space", "nowrap")
      .css("position", "absolute")
      .css("left", -this.Actor.originX(this.Screen["width?"]()) + this.space)
      .css("top", -this.Actor.originY(this.Screen["height?"]()) + this.space);
    return this.$.create(this.window).resize(
      dtlbind(this, function () {
        return this.element
          .css("left", -this.Actor.originX(this.Screen["width?"]()) + this.space)
          .css("top", -this.Actor.originY(this.Screen["height?"]()) + this.space);
      }).bind(this),
    );
  });
  this.UILayout.initElem();
  this.UILayout.add = dtlbind(this, function (ui) {
    ui.element.remove();
    ui.inUILayout = this;
    this.element.append(ui.element);
    ui.attachEvent();
    return ui.element.css("position", "static");
  });
  this.UILayout.remove = dtlbind(this, function (ui, left, top) {
    if (ui.inUILayout) {
      ui.element.remove();
      ui.inUILayout = this.false;
      this.UI.container.append(ui.element);
      ui.attachEvent();
    }
    return ui.element.css("position", "absolute").css("left", left).css("top", -top);
  });
  // HTML モード: 本文の流れ（#HTML_div）の末尾に置く。inUILayout を立てておくと「位置」（remove）で従来どおり #UI_div の層へ移る
  this.UILayout.addFlow = dtlbind(this, function (ui) {
    ui.element.remove();
    ui.inUILayout = this;
    ui.inHtmlFlowLayout = root.true;   // 部品ごとの印（UI.inHtmlFlow は関数なので別名）
    ui.element.appendTo(root.htmldom.container());
    ui.attachEvent();
    return ui.element.css("position", "static");
  });
  this.UILayout.br = dtlbind(this, function (ui) {
    return this.$.create("<br>").insertBefore(ui.element);
  });
  this.Label = this.UI.create();
  this.Label.left = 0;
  this.Label.initialize = dtlbind(this, function (label) {
    if (label === this.undef) {
      label = this.read();
    }
    this.element = this.$
.create("<span>")
      .text(this.num2str(label))
      .css("font-size", "1.0em")
      .css("vertical-align", "top")
      .css("white-space", "nowrap");
    return this.autoLayout();
  });
  this.Label.fontColor = dtlbind(this, function (r, g, b) {
    var args;
    var c;
    args = root.window.Array.prototype.slice.call(arguments);
    if (args.length === 1) {
      c = r;
    } else {
      c = this.Color.create(r, g, b);
    }
    this.element.css("color", c);
    return this;
  });
  this.Label.fontSize = dtlbind(this, function (s) {
    s = guiNeedNum(s, "文字サイズ");
    this.element.css("font-size", s + "px");   // N px（UI.fontSize と同じ。以前は 0.96N px、下限 8px）
    return this;
  });
  this.Button = this.UI.create();
  this.Button.action = dtlbind(this, function () {
    return;
  });
  this.Button.left = 0;
  this.Button.attachEvent = dtlbind(this, function () {
    var t;
    t = this;
    return this.element.click(function () {
      return t.callAction();
    });
  });
  this.Button.initialize = dtlbind(this, function (label, key) {
    var t;
    t = this;
    if (label === this.undef) {
      label = this.read();
    }
    this.element = this.$
.create("<button>")
      .text(this.num2str(label))
      .css("vertical-align", "top")
      .css("white-space", "nowrap");
    this.autoLayout();
    if (key) {
      root.window.$(
        dtlbind(this, function () {
          root.window.document.addEventListener(
            "keydown",
            dtlbind(this, function (k) {
              if (
                k.keyCode ===
                root.Button.keyCodeDict.read((key + "").toUpperCase())
              ) {
                t.callAction();
              }
            }),
            root.true,
          );
        }),
      );
    }
    return;
  });
  this.Button.setAction = dtlbind(this, function (a) {
    this.action = a;
    return this;
  });
  this.Button.keyCodeDict = this.Dict.create();
  dtlbind(this, function () {
    var arr;
    arr = this.Array.create("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    dtlbind(this, function (n) {
      return this.Button.keyCodeDict.write(arr.get(n), n + 47);
    }).repeat(arr["length?"]());
    arr = this.Array.create(
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    );
    dtlbind(this, function (n) {
      return this.Button.keyCodeDict.write(arr.get(n), n + 64);
    }).repeat(arr["length?"]());
    arr = this.Array.create(
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
    );
    dtlbind(this, function (n) {
      return this.Button.keyCodeDict.write(arr.get(n), n + 111);
    }).repeat(arr["length?"]());
    return this.Button.keyCodeDict
.write("ESCAPE", 27)
.write("MINUS", 189)
.write("BACK_SLASH", 220)
.write("OPEN_BRACKET", 219)
.write("CLOSE_BRACKET", 221)
.write("SEMICOLON", 186)
.write("COMMA", 188)
.write("PERIOD", 190)
.write("SLASH", 191)
.write("ENTER", 13)
.write("PAGE_UP", 33)
.write("PAGE_DOWN", 34)
.write("END", 35)
.write("HOME", 36)
.write("LEFT", 37)
.write("UP", 38)
.write("RIGHT", 39)
.write("DOWN", 40)
.write("SPACE", 32)
.write("SHIFT", 16)
.write("CTRL", 17);
  }).execute();
  // 増やす/減らす は UI.inc/dec（表示が数なら小数・引数も扱う）を使う。以前の整数だけの Button.inc は廃止。
  this.Field = this.UI.create();
  this.Field.action = dtlbind(this, function () {
    return;
  });
  this.Field.attachEvent = dtlbind(this, function () {
    var t;
    t = this;
    return this.element.keypress(
      dtlbind(this, function (key) {
        if (key.which === 13) {
          t.callAction(t.readString());
        }
        return;
      }),
    );
  });
  this.Field.setAction = dtlbind(this, function (f) {
    this.action = f;
    return this;
  });
  this.Field.initialize = dtlbind(this, function (label) {
    if (label === this.undef) {
      label = this.read();
    }
    this.element = this.$
.create("<input>")
      .val(this.num2str(label))
      .css("vertical-align", "top")
      .css("white-space", "nowrap");
    return this.autoLayout();
  });
  this.Field.write = dtlbind(this, function (m) {
    if (this.element) {
      this.element.val(this.num2str(m));
    }
    return this;
  });
  this.Field.readString = dtlbind(this, function () {
    if (this.element) {
      return this.element.val();
    } else {
      return "";
    }
  });
  this.TextArea = this.UI.create();
  this.ListBox = this.TextArea.create();
  this.UI.parts = []; // 生成した部品の一覧（autoLayout で登録。見本の ListBox は含めない）
  // 作る（V4 FXTextArea.initFrom 準拠）: 引数を1行ずつ（配列は要素ごと）。引数なしなら見本の内容を引き継ぐ。
  // 初期サイズは 180x135（マニュアル）。行数/桁数 を指定するとその方向は行数・桁数に従う。
  this.TextArea.initialize = dtlbind(this, function () {
    var label;
    label = arguments.length === 0 ? this.readString() : "";
    this.manualRow = this.false;
    this.manualCol = this.false;
    this.element = this.$
.create("<textarea>")
      .val(label)
      .css("vertical-align", "top")
      .css("box-sizing", "border-box")
      .css("width", "180px")
      .css("height", "135px")
      // 長い行は折り返す（V4 の FXTextArea は setWrapText(true)。2026-09-27 に V4 に合わせた）
      .attr("wrap", "soft");
    this.element.attr("readonly", this.isReadOnly);
    this.autoResize();
    this.autoLayout();
    return this.writeLn.apply(this, arguments);
  });
  this.TextArea.autoNewLine = dtlbind(this, function (f) {
    var _rest = Array.prototype.slice.call(arguments, 1);
    if (f === this.undef) {
      f = this.true;
    }
    this.isAutoBR = f;
    return this;
  });
  this.TextArea.addAlias("autoNewLine", "autoBR");
  this.TextArea.setReadOnly = dtlbind(this, function (f) {
    this.isReadOnly = f;
    if (this.element) {
      this.element.attr("readonly", f);
    }
    return this;
  });
  this.TextArea.readOnly = dtlbind(this, function () {
    return this.setReadOnly(this.true);
  });
  this.TextArea.writable = dtlbind(this, function () {
    return this.setReadOnly(this.false);
  });
  this.TextArea.addAlias("writable", "readWrite");
  this.ListBox.readOnly().autoBR();
  this.TextArea.mblen = dtlbind(this, function (s) {
    var i;
    var c;
    var r;
    i = 0;
    r = 0;
    while (i < s.length) {
      c = s.charCodeAt(i);
      r = r + (c >= 128 ? 2 : 1);
      i = i + 1;
    }
    return r;
  });
  this.TextArea.autoResize = dtlbind(this, function () {
    var r;
    var c;
    r = 1;
    c = 1;
    this.readString()
      .split("\n")
      .each(
        dtlbind(this, function (s) {
          var l;
          l = this.mblen(s);
          if (l > c) {
            c = l;
          }
          return (r = r + 1);
        }),
      );
    if (!this.manualRow) {
      this.element.attr("rows", r);
    }
    if (!this.manualCol) {
      this.element.attr("cols", c);
    }
    return this;
  });
  this.TextArea.setRow = dtlbind(this, function (r) {
    this.element.css("height", "").attr("rows", r);
    this.manualRow = this.true;
    return this;
  });
  this.TextArea.setCol = dtlbind(this, function (c) {
    this.element.css("width", "").attr("cols", c);
    this.manualCol = this.true;
    return this;
  });
  this.TextArea.overwrite = dtlbind(this, function () {
    this.clear();
    return this.writeLn.apply(this, arguments);
  });
  this.TextArea.readString = dtlbind(this, function () {
    if (this.element) {
      return this.element.val();
    } else {
      return "";
    }
  });
  // 読む: 行番号を渡すとその行（1始まり）、それ以外（番号なし・範囲外）は全体（V4 FXTextArea.getText）。
  this.TextArea.read = dtlbind(this, function (n) {
    var t = this.readString();
    var i = guiToNum(n);
    if (i !== null) {
      var lines = t.split("\n");
      while (lines.length && lines[lines.length - 1] === "") lines.pop();
      i = Math.floor(i);
      if (i > 0 && i <= lines.length) return lines[i - 1];
    }
    return t;
  });
  this.TextArea.write = dtlbind(this, function () {
    this.Array.prototype.slice.call(arguments).each(
      dtlbind(this, function (cont) {
        return this._write1(cont, this.isAutoBR);
      }),
    );
    return this.autoResize();
  });
  this.TextArea.add = this.TextArea.write; // 追加＝書く（V4 FXTextArea の「追加」）
  this.TextArea.rawOverwrite = dtlbind(this, function (c) {
    if (this.element) {
      this.element.val(c);
    }
    return this;
  });
  this.TextArea.rawAppend = dtlbind(this, function (cont) {
    return this.rawOverwrite(this.readString() + this.num2str(cont));
  });
  this.TextArea.writeLn = dtlbind(this, function () {
    this.Array.prototype.slice.call(arguments).each(
      dtlbind(this, function (cont) {
        return this._write1(cont, this.true);
      }),
    );
    return this.autoResize();
  });
  this.TextArea._write1 = dtlbind(this, function (cont, br) {
    if (this["instanceof"](cont, this.Array)) {
      cont.each(
        dtlbind(this, function (e) {
          return this._write1(e, br);
        }),
      );
    } else {
      this.rawAppend(cont);
      if (br) {
        this.rawAppend("\n");
      }
    }
    return this;
  });
  this.TextArea.newLine = dtlbind(this, function () {
    return this.rawAppend("\n");
  });
  this.TextArea.clear = dtlbind(this, function () {
    this.rawOverwrite("");
    return this.autoResize();
  });
  this.TextArea.readAsArray = dtlbind(this, function () {
    return this.read()
      .split("\n")
      .select(
        dtlbind(this, function (e) {
          return e !== "";
        }),
      )
      .map(
        dtlbind(this, function (e) {
          return this.str2num(e);
        }).bind(this),
      );
  });
  this.TextArea.changeLine = dtlbind(this, function (no, line) {
    return this.overwrite(this.readAsArray().set(no, line));
  });
  // ===== リスト（V4 FXList 準拠, 2026-09-27） =====
  // 以前は読むだけのテキストエリアだったが、V4 と同じく行を選べる一覧（<select size>）にした。
  // 項目は this.items（文字列の配列）に持つ。書く＝1行ずつ追加（配列は要素ごと）、読む（行番号）＝その行、
  // 読む（なし）・参照＝全体を各行の後ろに改行を付けてつないだ文字列。選ぶと「動作」に（選んだ文字 番号）を渡す。
  // テキストエリア由来の命令（上書き・改行・配列で読む・行修正 等）は items に対して同じ意味で動くよう上書きする。
  var listFlatten = function (args, out) {
    for (var i = 0; i < args.length; i++) {
      var a = args[i];
      if (a === undefined || a === null) continue;
      if (root.window.Array.isArray(a)) listFlatten(a, out);
      else out.push(root.UI.num2str(a));
    }
    return out;
  };
  this.ListBox.initialize = dtlbind(this, function () {
    var args = root.window.Array.prototype.slice.call(arguments);
    // 引数なしなら見本（this の親）の項目を引き継ぐ。引数ありなら引数だけ（V4 FXList.initFrom）。
    var base = args.length === 0 && this.items ? this.items.slice() : [];
    this.items = listFlatten(args, base);
    this.element = this.$
.create("<select>")
      .attr("size", 5)
      .css("min-width", "150px")
      .css("vertical-align", "top");
    this.renderItems();
    this.autoLayout();
    return this;
  });
  this.ListBox.renderItems = dtlbind(this, function () {
    if (!this.element) return this;
    var el = this.element;
    el.empty();
    for (var i = 0; i < this.items.length; i++) {
      el.append(this.$.create("<option>").attr("value", i).text(this.items[i]));
    }
    return this;
  });
  this.ListBox.attachEvent = dtlbind(this, function () {
    var t = this;
    this.element.on("change", function () {
      var i = t.element.get(0).selectedIndex;
      if (i < 0 || i >= t.items.length) return;
      return t.callAction(t.items[i], i + 1);
    });
    return this;
  });
  this.ListBox.write = dtlbind(this, function () {
    if (!this.hasOwnProperty("items")) this.items = (this.items || []).slice();
    listFlatten(root.window.Array.prototype.slice.call(arguments), this.items);
    return this.renderItems();
  });
  this.ListBox.writeLn = this.ListBox.write;
  this.ListBox.add = this.ListBox.write;
  this.ListBox._write1 = dtlbind(this, function (cont) {
    return this.write(cont);
  });
  this.ListBox.overwrite = dtlbind(this, function () {
    this.items = [];
    return this.write.apply(this, arguments);
  });
  this.ListBox.clear = dtlbind(this, function () {
    this.items = [];
    return this.renderItems();
  });
  this.ListBox.newLine = dtlbind(this, function () {
    return this.write("");
  });
  this.ListBox.readString = dtlbind(this, function () {
    var items = this.items || [];
    var b = "";
    for (var i = 0; i < items.length; i++) b += items[i] + "\n";
    return b;
  });
  this.ListBox.valueOf = this.ListBox.readString;
  this.ListBox.toString = this.ListBox.readString;
  // 読む: 行番号（1始まり）ならその行、番号なし・範囲外は全体（V4 FXList.getText）。
  this.ListBox.read = dtlbind(this, function (n) {
    var i = guiToNum(n);
    var items = this.items || [];
    if (i !== null) {
      i = Math.floor(i);
      if (i > 0 && i <= items.length) return items[i - 1];
    }
    return this.readString();
  });
  this.ListBox.rawOverwrite = dtlbind(this, function (c) {
    var lines = this.num2str(c).split("\n");
    while (lines.length && lines[lines.length - 1] === "") lines.pop();
    this.items = lines;
    return this.renderItems();
  });
  this.ListBox.rawAppend = dtlbind(this, function (cont) {
    return this.rawOverwrite(this.readString() + this.num2str(cont));
  });
  this.ListBox.autoResize = dtlbind(this, function () {
    return this;
  });
  this.ListBox.setRow = dtlbind(this, function (r) {
    if (this.element) this.element.attr("size", guiNeedNum(r, "行数"));
    return this;
  });
  this.ListBox.setCol = dtlbind(this, function (c) {
    if (this.element) this.element.css("width", guiNeedNum(c, "桁数") + "em");
    return this;
  });
  // スライダー（V4 OxSlider/FXSlider 準拠, 2026-07-05）: <input type="range">。範囲は既定 0..100・初期値 50。
  // メソッドの英語名は Japanese2.js の guiSlider 別名行（値?,読む→value? / 値,書く→value / から→setminimum /
  // まで→setmaximum / 横向き→horizontal / 縦向き→vertical / 文字出す→showlabel / 文字消す→hidelabel）に一致させる。
  // 「読む」「書く」は基底(UI.read/write)の別名に先に解決されるため、read/write も Slider 上で直接 override する
  // （選択メニューの「読む」と同じ罠への対策）。「動作」は root のパススルー別名（→action）で全UI共通に効く。
  this.Slider = this.UI.create();
  this.Slider.action = dtlbind(this, function () {
    return;
  });
  // 値・範囲はモデル（_v/_min/_max, 整数）に持ち、画面へ反映する（V4 FXSlider 準拠, 2026-09-27）。
  // 値が変わると（つまみ操作・キー・プログラムからの 値/から/まで/最小値/最大値/範囲）「動作」に値を渡す。
  this.Slider._v = 50;
  this.Slider._min = 0;
  this.Slider._max = 100;
  this.Slider.attachEvent = dtlbind(this, function () {
    var t;
    t = this;
    // レバー操作で値を更新し action を発火（引数=現在値）。input はドラッグ中も、change は確定時に発火する。
    // 値が変わらないとき（input の後の change 等）は発火しない。
    return this.element.on("input change", function () {
      var v = root.window.Math.round(t.element.val() - 0);
      if (isNaN(v) || v === t._v) return;
      t._v = v;
      return t.callAction(v);
    });
  });
  // 作る の引数（V4 FXSlider.make 準拠）:
  //   スライダー！作る                       … 見本の値・範囲を引き継ぐ（スライダー自身からなら 初期値50・0〜100）
  //   スライダー！30 作る                    … 第1引数が数値なら初期値（範囲内に収める）
  //   スライダー！"減少キー" "増加キー" [増分] 作る … 第1・2引数が文字列ならショートカットキー割当
  //                                              （第1=減少・第2=増加、第3の数値=増分・既定1）
  this.Slider.initialize = dtlbind(this, function () {
    var args = root.window.Array.prototype.slice.call(arguments);
    var keyDown = null, keyUp = null, delta = 1;
    // 見本の値・範囲を引き継ぐ（own プロパティにしてから変更する）
    this._v = this._v;
    this._min = this._min;
    this._max = this._max;
    this._vertical = this._vertical;
    this._ticks = this._ticks;
    if (args.length > 0 && typeof args[0] === "number") {
      this._v = this.clampValue(args[0]);
    }
    if (args.length >= 2 && typeof args[0] === "string" && typeof args[1] === "string") {
      keyDown = args[0];
      keyUp = args[1];
      if (args.length >= 3 && typeof args[2] === "number") delta = args[2];
    }
    this.element = this.$
.create("<input>")
      .attr("type", "range")
      .attr("step", "1")
      .css("width", "200px")
      .css("vertical-align", "top");
    this.render();
    if (this._vertical) this.vertical();
    this.autoLayout();
    if (keyDown != null) this.setupKeys(keyDown, keyUp, delta);
    return this;
  });
  this.Slider.clampValue = dtlbind(this, function (v) {
    v = root.window.Math.trunc(v);
    if (v < this._min) v = this._min;
    if (v > this._max) v = this._max;
    return v;
  });
  // モデルを画面へ反映する（min/max を先に設定してから値）。
  this.Slider.render = dtlbind(this, function () {
    if (!this.element) return this;
    this.element.attr("min", String(this._min)).attr("max", String(this._max));
    this.element.val(String(this._v));
    return this;
  });
  // 値を変え、変わったら「動作」を実行する（V3 はプログラムからの変更でも動作した）。
  this.Slider.changeValue = dtlbind(this, function (v) {
    v = this.clampValue(v);
    if (v === this._v) {
      this.render();
      return this;
    }
    this._v = v;
    this.render();
    this.callAction(v);
    return this;
  });
  // キー入力で値を増減し、つまみ操作と同じく action を発火する（範囲内に収める）。
  this.Slider.adjust = dtlbind(this, function (d) {
    if (!this.element) return this;
    return this.changeValue(this._v + d);
  });
  // ショートカットキー割当。キー名は Button.keyCodeDict（A-Z/0-9/LEFT/RIGHT/UP/DOWN 等）に一致。
  // イベント登録は Button の key と同方式（document keydown・実行ごとに iframe 再生成でリセット）。
  this.Slider.setupKeys = dtlbind(this, function (kDown, kUp, delta) {
    var t = this;
    var codeDown = root.Button.keyCodeDict.read((kDown + "").toUpperCase());
    var codeUp = root.Button.keyCodeDict.read((kUp + "").toUpperCase());
    root.window.document.addEventListener(
      "keydown",
      function (k) {
        if (k.keyCode === codeDown) { k.preventDefault(); t.adjust(-delta); }
        else if (k.keyCode === codeUp) { k.preventDefault(); t.adjust(delta); }
      },
      true,
    );
    return this;
  });
  this.Slider["value?"] = dtlbind(this, function () {
    return this._v;
  });
  this.Slider.read = this.Slider["value?"]; // 読む
  this.Slider.readString = dtlbind(this, function () {
    return String(this._v);
  });
  this.Slider.valueOf = this.Slider["value?"]; // 参照は値
  // 値: 整数にして（小数は切り捨て）範囲に収める。数でなければエラー。
  this.Slider.value = dtlbind(this, function (n) {
    return this.changeValue(guiNeedNum(n, "値"));
  });
  this.Slider.write = this.Slider.value; // 書く
  // から／まで: 最小値／最大値を変え、値は範囲の中央にする（V3・V4 と同じ）。
  this.Slider.setminimum = dtlbind(this, function (n) {
    this._min = root.window.Math.trunc(guiNeedNum(n, "から"));
    if (this._max < this._min) this._max = this._min;
    return this.changeValue(root.window.Math.trunc((this._min + this._max) / 2));
  });
  this.Slider.setmaximum = dtlbind(this, function (n) {
    this._max = root.window.Math.trunc(guiNeedNum(n, "まで"));
    if (this._min > this._max) this._min = this._max;
    return this.changeValue(root.window.Math.trunc((this._min + this._max) / 2));
  });
  // 最小値・最大値・範囲（V4 で追加）: 値は範囲内に収める（から・まで と違い中央にしない）。
  this.Slider.setmin = dtlbind(this, function (n) {
    this._min = root.window.Math.trunc(guiNeedNum(n, "最小値"));
    if (this._max < this._min) this._max = this._min;
    return this.changeValue(this._v);
  });
  this.Slider.setmax = dtlbind(this, function (n) {
    this._max = root.window.Math.trunc(guiNeedNum(n, "最大値"));
    if (this._min > this._max) this._min = this._max;
    return this.changeValue(this._v);
  });
  this.Slider.setrange = dtlbind(this, function (a, b) {
    var lo = root.window.Math.trunc(guiNeedNum(a, "範囲"));
    var hi = root.window.Math.trunc(guiNeedNum(b, "範囲"));
    this._min = lo;
    this._max = hi < lo ? lo : hi;
    return this.changeValue(this._v);
  });
  // 有効（はい/いいえ）: いいえ で操作できなくする。プログラムからの値の設定・読み出しはできる。
  this.Slider.setenabled = dtlbind(this, function (f) {
    if (this.element) this.element.prop("disabled", f === false);
    return this;
  });
  this.Slider.horizontal = dtlbind(this, function () {
    this._vertical = false;
    this.element
      .css("writing-mode", "")
      .css("width", "200px")
      .css("height", "");
    return this;
  });
  this.Slider.vertical = dtlbind(this, function () {
    // 縦向き: モダンブラウザは writing-mode で <input type="range"> を縦描画できる。
    // 上が大きい値になるよう direction:rtl を併用する。
    this._vertical = true;
    this.element
      .css("writing-mode", "vertical-lr")
      .css("direction", "rtl")
      .css("width", "auto")
      .css("height", "150px");
    return this;
  });
  // 方向: "縦"/"vertical" 等なら縦、それ以外は横（V4 FXSlider.setOrientation）。
  this.Slider.setorientation = dtlbind(this, function (d) {
    var s = d === undefined || d === null ? "" : String(d).toLowerCase();
    if (s.indexOf("縦") >= 0 || s.charAt(0) === "v") return this.vertical();
    return this.horizontal();
  });
  // 目盛り（はい/いいえ）: HTML の range は目盛りを描かないため、設定だけ保持する（エラーにしない）。
  this.Slider.setshowtickmarks = dtlbind(this, function (f) {
    this._ticks = f !== false;
    return this;
  });
  this.Slider.showlabel = dtlbind(this, function () {
    return this; // HTML range に目盛り表示は無いため no-op（エラーにしない）
  });
  this.Slider.hidelabel = dtlbind(this, function () {
    return this;
  });
  this.SelectMenu = this.UI.create();
  this.SelectMenu.action = dtlbind(this, function () {
    return;
  });
  // 動作を発火する共通処理（現在の選択項目のテキストと番号を渡す）。
  // change と option-click は同一操作で両方来ることがあるため、直近発火からごく短時間(50ms)は
  // 重複とみなして1回だけにする（V4 FXComboBox の二重発火抑止と同趣旨・タイミング非依存で堅牢）。
  this.SelectMenu.fireAction = dtlbind(this, function () {
    var now = (root.window.Date && root.window.Date.now) ? root.window.Date.now() : (+new Date());
    if (this._lastFire && now - this._lastFire < 50) return;
    this._lastFire = now;
    var txt = this.element.find("option:selected").text();
    // 番号は1始まり（V4 FXComboBox・V3 CmbExec。何番目？と同じ）。動作の中の自分は選択メニュー。
    var num = this.element.get(0).selectedIndex + 1;
    return this.callAction(txt, num);
  });
  this.SelectMenu.attachEvent = dtlbind(this, function () {
    var t = this;
    // 同一項目の選び直しでも動作を発火させる（V3挙動）。
    // ネイティブ<select>の実挙動（実機ログ・タイムスタンプで確定, 2026-07-05, macOS Chrome）:
    //   ドロップダウンを【開く】クリック … mousedown→mouseup→click（click は mousedown を伴う）
    //   【同じ項目を選んで閉じる】       … click 単独（mousedown を伴わない）・input/change 無し
    //   【別項目を選んで閉じる】         … input,change（＋click 単独）
    // ＝「確定の click は mousedown を伴わない単独 click」。開く click（mousedown 付き）は発火させない。
    // 方式: mousedown を見たら「開く操作」として直後の click を1回だけ無視。それ以外の click（＝確定）で
    //   fireAction。別項目時の input/change 経由との二重発火は fireAction の時間デデュープ(50ms)で防ぐ。
    this.element.on("change input", dtlbind(this, function () { return t.fireAction(); }));
    this.element.on("mousedown", function () { t._openingClick = true; });
    this.element.on("click", function () {
      if (t._openingClick) { t._openingClick = false; return; } // 開くクリックは無視
      t.fireAction(); // 単独 click＝項目確定
    });
    // キーボード操作（フォーカス中の Enter/Space での確定）も拾う保険。
    this.element.on("keydown", function (k) {
      var c = k.keyCode || k.which;
      if (c === 13 || c === 32) t.fireAction();
    });
    return this;
  });
  this.SelectMenu.initialize = dtlbind(this, function () {
    var args;
    args = root.window.Array.prototype.slice.call(arguments);
    // 見本（this の親）の選択肢と選択位置を引き継ぎ、引数を後ろに追加する（V4 FXComboBox.initFrom・V3 OxCmbBox.make）。
    var inherited = [];
    var inheritedIndex = -1;
    if (this.element && this.element.get(0)) {
      this.element.find("option").each(function () {
        inherited.push(root.window.jQuery(this).text());
      });
      inheritedIndex = this.element.get(0).selectedIndex;
    }
    args = inherited.concat(args);
    this.optNum = 0;
    // 選択メニューはテキストラベルを持たない。Field.initialize からのコピペで残っていた
    // .val(this.num2str(this.label)) は不要かつ有害（this.label は element を持たない UI系
    // オブジェクトに解決され、valueOf が this.element.text を読んで生成前に落ちる）。除去。
    this.element = this.$
.create("<select>")
      .css("min-width", "100px")
      .css("font-size", "1.3em")
      .css("vertical-align", "top")
      .css("white-space", "nowrap");
    this.autoLayout();
    args.each(
      dtlbind(this, function (e) {
        return this.add(e);
      }),
    );
    if (inheritedIndex >= 0) this.element.get(0).selectedIndex = inheritedIndex;
    return this;
  });
  // 選択インデックス（0始まり）。別名 何番目?/選択番号 → index? は Japanese2.js（guiMenu群）に既存。
  // 何番目？は1始まり（選択なし・空なら0）。V4 FXComboBox.getIndex・V3 OxCmbBox.getIndex。
  this.SelectMenu["index?"] = dtlbind(this, function () {
    if (this.element && this.element.get(0)) {
      var i = this.element.get(0).selectedIndex;
      return i < 0 ? 0 : i + 1;
    }
    return 0;
  });
  // 参照は選んでいる選択肢の文字列（V4 FXComboBox.valueString）。
  this.SelectMenu.readString = dtlbind(this, function () {
    if (!this.element) return "";
    return this.element.find("option:selected").text();
  });
  this.SelectMenu.valueOf = this.SelectMenu.readString;
  this.SelectMenu.toString = this.SelectMenu.readString;
  // クリアは選択メニューの命令ではない（V4 の選択メニューの命令一覧に無い）。以前は UI.clear から
  // 「空の選択肢を追加」になっていた。無い命令としてエラーにする。
  this.SelectMenu.clear = undefined;
  // 読み取り: 引数の番号の項目テキスト（無引数=選択中の項目）。
  // Field/TextArea が readString/read を override するのと同じ流儀で、選択メニュー用に read を override する。
  //   ・読む→read（Japanese2.js:53）, get→read（UI.js:216）は動的別名なので read を上書きすれば追随する。
  //   ・既定の UI.read（= str2num(element.text())）は <select> だと全option連結を返し、番号も無視するため
  //     `楽器名！(何番目?) 読む` が全連結→楽器名不一致でピアノに化ける不具合になっていた。
  //   ・own な get を足すと addAlias2 が「読む(read) と get(別物)が矛盾」と判断し別名処理を放棄するため、
  //     get は足さず read だけを override する（別名解決に委ねる＝i18nはJapanese2.jsに集約のまま）。
  this.SelectMenu.read = dtlbind(this, function (n) {
    if (!this.element) return "";
    if (n === this.undef || n === undefined || n === null || (typeof n === "number" && isNaN(n))) {
      return this.element.find("option:selected").text();
    }
    // 番号は1始まり。範囲外は空文字（V4 FXComboBox.getText・V3 OxCmbBox.getText）。
    var i = guiToNum(n);
    if (i === null) return "";
    i = this.window.Math.floor(i);
    var opts = this.element.find("option");
    if (i < 1 || i > opts.length) return "";
    return opts.eq(i - 1).text();
  });
  this.SelectMenu.add = dtlbind(this, function () {
    var opt;
    this.args = root.window.Array.prototype.slice.call(arguments);
    this.args.each(
      dtlbind(this, function (e) {
        if (root.window.Array.isArray(e)) {
          e.each(
            dtlbind(this, function (e_e) {
              return this.add(e_e);
            }),
          );
        } else {
          opt = this.$.create("<option>");
          opt.attr("value", this.optNum);
          opt.text(e);
          this.optNum = this.optNum + 1;
          this.element.append(opt);
          // ※ <option> への click 付与は不要（ネイティブ<select>のドロップダウンでは option に
          //   click が飛ばず、選択確定は<select>本体の click。発火は attachEvent 側で処理）。
        }
        return;
      }),
    );
    return this;
  });
  // 書く＝選択肢を追加（V3 OxCmbBox.setText 準拠, インストール版からの依頼 2026-07-05）。
  // 追加（add）と同じ挙動（可変長・配列受理・末尾へ順に追加）。
  // ※ 書く/かく/set/settext は基底 UI.write（＝str2num を書く・別物）に先に解決されるため、
  //   別名を add に指すだけでは効かない（選択メニューの「読む」と同じ罠・実測確認済）。
  //   動的別名 書く→write / set→write / settext→write が繋がっているので、write を add に
  //   直接 override すれば全て追随する（own な settext/set は足さない＝addAlias2 の矛盾判定回避）。
  return (this.SelectMenu.write = this.SelectMenu.add);
})
  .checkerror()
  .apply(root, []);

/*
// Dolittle
Screen=! create.
Screen:width?=[
    $ ! (window) create width.
].
Screen:height?=[
    $ ! (window) create height.
].
Screen:paint=[|c|
    $ ! "body" create "background-color" (c+"") css.
].
! "Screen" "Panel" addAlias.

UI=! create.
UI:valueOf=[|;ret halfval|
    ret=[[element:text]!then[element!text]execute.]
        ![[element:val]!then[element!val]execute]
        [[element:innerHTML]!then[element!innerHTML]execute]or.
    halfval=(""+ret)!(:window!"[０-９．]""g"RegExp)[|tmpStr|
        :window:String!((tmpStr!0 charCodeAt)-65248)fromCharCode
    ]replace.
    [:window!(halfval)parseFloat]!then[
        :window!(halfval)parseFloat
    ]else[ret]execute.
].
UI:setTrans=[|;str|
    str="postion:absolute;left:"+(pos:x)+";top:"+(pos:y)+";".
    element ! "transform" (str) attr
    "data-trans" ((pos:x)+","+(pos:y)) attr.
    this.
].
UI:hide=[
    [element] ! then [ element ! hide] execute.
    this.
].
UI:show=[
    [element] ! then [ element ! show] execute.
    this.
].
UI!"hide" "die" addAlias.
UI!"show" "appear" addAlias.

UI:top=((Screen! height?)/2) - 20.
UI:autoLayout=[
    UILayout! (this) add.
    [last] ! then [
        ! ((last ! right?)+10) (last ! top?) moveTo
    ] else [
        !  (-(Screen ! width?) / 2+20) (top) moveTo.
    ] execute.
    UI:last=this.
].
UI:moveTo=[|left top|
    UILayout! (this) (left) (top) remove.
    this.
].
UI:moveBy=[|dx dy|
    ! ((!left?)+dx) ((!top?)+dy) moveTo
].
UI:left?=[
    [element] ! then [
        (element ! offset):left-((UI:container ! offset):left)
    ] else [0] execute.
].
UI ! "left?" "xpos?" addAlias.
UI:right?=[
    (! left?) + (! width?)
].
UI:top?=[
    [element] ! then [
        -((element ! offset):top-((UI:container ! offset):top))
    ] else [0] execute.
].
UI ! "top?" "ypos?" addAlias.
UI:bottom?=[
    (! top?) - (! height?)
].
UI:width?=[//offsetWidth??
    [element] ! then [ element ! outerWidth] else [0] execute.
].
UI:height?=[
    [element] ! then [ element ! outerHeight] else [0] execute.
].
UI:width=[|w|
    [element] ! then [ element ! (w) width ] execute. this.
].
UI:height=[|w|
    [element] ! then [ element ! (w) height ] execute. this.
].
UI:nextLine=[|;top left|
    [last] ! then [
        console ! "NL" (Screen! width?) (last!bottom?) log.
        left=-(Screen! width?) /2 + 20.
        //top=(UI:top)-((UI:last) ! outerHeight).
        top=last ! bottom?.
        !(left) (top) moveTo.
    ] execute.
    //UILayout! (this) br.
    this.
].
UI:write=[|m|
    [element] ! then [ (element ! 0 get):innerHTML=! (m) num2str] execute.
    self
].
UI ! "write" "set" addAlias.
UI:add=[|m|
    [element]!then[!(((element!0 get):innerHTML)+m)write]execute.
    self
].
UI:newLine=[
    !"<br>"add.
    self
].
UI:clear=[!"" write].
UI:num2strDigits=1000000.
UI:num2str=[|v;r|
    [v==null]!then [v=""] execute.
    [v==undef]!then [v=""] execute.
    [(! (v) typeof)=="number"] ! then [
        v=((window:Math) ! (v*num2strDigits) round) /num2strDigits.
    ] execute.
    v+""
    //    [ (! (r-v) abs) <0.00000001 ] ! then [ r+"" ] else [v+""] execute.
].
UI:int2str=UI:num2str.
UI:str2num=[|s;r|
    r=window ! (s) parseFloat.
    [r==r] ! then [r] else [s] execute.
].
UI:str2int=UI:str2num.
UI:readString=[
    [element] ! then [element ! text] else [""] execute.
].
UI:read=[
    ! (! readString) str2num.
].
UI ! "read" "get" addAlias.
UI:inc=[|by|
    by=[by] ! [1] or.
    ! ( (! read)-0+by) write.
].
UI! "inc" "increment" addAlias.
UI:dec=[|by|
    by=[by] ! [1] or.
    ! ( (! read)-by) write.
].
UI! "dec" "decrement" addAlias.
//本多追加分
UI:paint=[|r g b;args c|
    args=:window:Array:prototype:slice!(arguments)call.
    [args:length==1]!then[
        c=r.
    ]else[
        c=Color!(r)(g)(b)create.
    ]execute.
    self:element!"background-color" (c)css .
    self
].
UI:fontColor=[|r g b;args c|
    args=:window:Array:prototype:slice!(arguments)call.
    [args:length==1]!then[
        c=r.
    ]else[
        c=Color!(r)(g)(b)create.
    ]execute.
    self:element!"color" (c)css.
    self
].
UI:fontSize=[|s|
    self:element!"font-size" (s/10+"em")css.
    self
].

UI:size=[|w h|
    self:element!"width" (w+"px") css
    "height" (h+"px") css.
    self
].
//以上

UI:attachEvent=[].
UI:container=$ ! "<div>" create "body" appendTo
"id" "UI_div" attr
"position" "absolute" css
"left" ( (Screen!width?) / 2) css
"top" ( (Screen!height?) / 2) css.
$ ! (window) create ([
    UI:container !
    "left" ( (Screen!width?) / 2) css
    "top" ( (Screen!height?) / 2) css.
] ! (this) bind) resize.
UILayout=!create.
UILayout:space=20.
UILayout:initElem=[
    element=$!"<div>" create (UI:container) appendTo.
    element !
    "white-space" "nowrap" css
    "position" "absolute" css
    "left" (-(Screen ! width?)/2 +space) css
    "top" (-(Screen! height?)/2+space) css.
    $ ! (window) create ([
        element !
        "left" (-(Screen ! width?)/2 +space) css
        "top" (-(Screen! height?)/2+space) css.
    ] ! (this) bind ) resize.
].
UILayout ! initElem.
UILayout:add=[|ui|
    ui:element ! remove.
    ui:inUILayout=this.
    element ! (ui:element) append.
    ui ! attachEvent.
    ui:element ! "position" "static" css.
].
UILayout:remove=[|ui left top|
    [ui:inUILayout] ! then [
        ui:element ! remove.
        ui:inUILayout=false.
        UI:container ! (ui:element) append.
        ui ! attachEvent.
    ] execute.
    ui:element ! "position" "absolute" css "left" (left) css "top" (-top) css.
].
UILayout:br=[|ui|
    $ ! "<br>" create (ui:element) insertBefore.
].

Label=UI!create.
Label:left=0.
Label:initialize=[|label;t|
    t=this.
    [label==undef]!then [label=! read] execute.
    element=$!"<span>"create
    (!(label) num2str) text
    //"position" "absolute" css
    "font-size" "1.0em" css
    "vertical-align" "top" css
    "white-space" "nowrap" css.
    //(container) appendTo.
    !autoLayout
].
Label:fontColor=[|r g b;args c|
    args=:window:Array:prototype:slice!(arguments)call.
    [args:length==1]!then[
        c=r.
    ]else[
        c=Color!(r)(g)(b)create.
    ]execute.
    self:element!"color" (c)css.
    self
].
Label:fontSize=[|s;size|
    size=s/10.
    [size<0.5]!then[size=0.5]execute.
    self:element!"font-size" (size+"em")css.
    self
].

Button=UI ! create.
Button:action=[].
//Button ! "action" addEventType.
Button:left=0.
Button:attachEvent=[|;t| t=this. element ! [t:action!execute] click].
Button:initialize=[|label key;t|
    t=this.
    [label==undef]!then [label=! read] execute.
    element=$!"<button>" create
    (! (label) num2str) text
    "vertical-align" "top" css
    "white-space" "nowrap" css.
    //"position" "absolute" css.
    //(container) appendTo.
    //! attachEvent.
    ! autoLayout.
    [key]!then[
        :window![:window:document!"keydown"[|k|
                [k:keyCode==(:Button:keyCodeDict!
                ((key+"")!toUpperCase)read)]!then[t:action!execute]execute.
        ](:true)addEventListener.]$.
    ]execute.
    // 以上
].
Button:setAction=[|a|
    action=a.this.
].

Button:keyCodeDict=Dict!create.
[|;arr|
    arr=Array!"0" "1" "2" "3" "4" "5" "6" "7" "8" "9"create.
    [|n|
        Button:keyCodeDict!(arr!(n)get)(n+47)write
    ]!(arr!length?)repeat.
    arr=Array!"A" "B" "C" "D" "E" "F" "G" "H" "I" "J"
    "K" "L" "M" "N" "O" "P" "Q" "R" "S" "T" "U"
    "V" "W" "X" "Y" "Z" create.
    [|n|
        Button:keyCodeDict!(arr!(n)get)(n+64)write
    ]!(arr!length?)repeat.
    arr=Array!"F1" "F2" "F3" "F4" "F5" "F6" "F7" "F8"
    "F9" "F10" "F11" "F12"create.
    [|n|
        Button:keyCodeDict!(arr!(n)get)(n+111)write
    ]!(arr!length?)repeat.
    Button:keyCodeDict!
    "ESCAPE" 27 write
    "MINUS" 189 write
    "BACK_SLASH" 220 write
    "OPEN_BRACKET" 219 write
    "CLOSE_BRACKET" 221 write
    "SEMICOLON" 186 write
    "COMMA" 188 write
    "PERIOD" 190 write
    "SLASH" 191 write
    "ENTER" 13 write
    "PAGE_UP" 33 write
    "PAGE_DOWN" 34 write
    "END" 35 write
    "HOME" 36 write
    "LEFT" 37 write
    "UP" 38 write
    "RIGHT" 39 write
    "DOWN" 40 write
    "SPACE" 32 write
    "SHIFT" 16 write
    "CTRL" 17 write.
]!execute.
// Button:keyCodeDict![|k|
    //     k=(k+"") ! toUpperCase.
    //     [k=="LEFT"]!then[37]
    //     else[k=="UP"]then[38]
    //     else[k=="RIGHT"]then[39]
    //     else[k=="DOWN"]then[40]
    //     else[k=="SPACE"]then[32]execute.
// ].
Button:inc=[|;label|
    label=(self:element!0 get):innerHTML.
    [label!(:window!"^([0-9０-９]+)$"RegExp)match]!then[
        self:element!((:window!(label)parseInt)+1)text.
    ]execute.
    self
].
// Button:write=[|m|
    //     [element] ! then [element ! (m) val] execute.
    //     self
// ].
// Button:read=[
    //     [element] ! then [element ! val] else [""] execute.
// ].

Field=UI! create.
Field:action=[].
Field:attachEvent=[|;t|
    t=this.
    element![|key|
        [key:which==13]!then[
            t!(t!readString)action
        ]execute.
    ]keypress.
].
Field:setAction=[|f|
    self:action=f.
    self.
].
Field:initialize=[|label|
    [label==undef]!then [label=! read] execute.
    element=$!"<input>" create
    (!(label) num2str) val
    "vertical-align" "top" css
    "white-space" "nowrap" css.
    //"position" "absolute" css.
    //(container) appendTo.
    ! autoLayout.
].
Field:write=[|m|
    [element] ! then [element ! (! (m) num2str) val] execute.
    self
].
Field:readString=[
    [element] ! then [element ! val] else [""] execute.
].

TextArea=UI! create.
ListBox=TextArea ! create.
TextArea:initialize=[|;label|
    label=! read.
    manualRow=false.
    manualCol=false.
    element=$!"<textarea>" create
    (label) val
    "vertical-align" "top" css
    "wrap" "soft" attr.
    //"white-space" "nowrap" css.
    //"position" "absolute" css.
    //(container) appendTo.
    element ! "readonly" (isReadOnly) attr.
    ! autoResize.
    ! autoLayout.
    writeLn ! (self) (arguments) apply.
].
TextArea:autoNewLine=[|f|
    [f==undef] ! then [f=true] execute.
    isAutoBR=f.
    this.
].
TextArea ! "autoNewLine" "autoBR" addAlias.
TextArea:setReadOnly=[|f|
    isReadOnly=f.
    [element]!then[element ! "readonly" (f) attr]execute.
    this.
].
TextArea:readOnly=[!(true) setReadOnly].
TextArea:writable=[!(false) setReadOnly].
TextArea ! "writable" "readWrite" addAlias.
ListBox ! readOnly autoBR.
TextArea:mblen=[|s;i c r|
    i=0.r=0.
    [i<(s:length)] ! while [
        c=s ! (i) charCodeAt.
        r=r+([c>=128] ! then [2] else[1] execute).
        i=i+1.
    ] execute.
    r.
].
TextArea:autoResize=[|;r c|
    r=1.c=1.
    ! readString "\n" split [|s;l|
        l=! (s) mblen.
        [l>c] ! then [c=l] execute.
        r=r+1.
    ] each.
    [manualRow] ! then [] else [element ! "rows"(r) attr] execute.
    [manualCol] ! then [] else [element ! "cols"(c) attr] execute.
    this.
].
TextArea:setRow=[|r| element ! "rows"(r) attr. manualRow=true. self].
TextArea:setCol=[|c| element ! "cols"(c) attr. manualCol=true. self].
TextArea:overwrite=[|;a buf|
    ! clear.
    writeLn ! (self) (arguments) apply.
].
TextArea:readString=[
    [element] ! then [element ! val] else [""] execute.
].
TextArea:read=TextArea:readString.
TextArea:write=[
    (Array:prototype:slice) ! (arguments) call [|cont|
        // [cont==null]!then [cont=""] execute.
        // [cont==undef]!then [cont=""] execute.
        // [cont:each] ! then [
            //     cont ! [|e| ! (e) writeLn ] each.
        // ] else [
            //     ! ((!readString)+(!(cont) num2str)) rawOverwrite
        // ] execute.
        ! (cont) (isAutoBR) _write1
    ] each.
    ! autoResize.
].
TextArea:rawOverwrite=[|c|
    [element] ! then [element ! (c) val] execute.
    self.
].
TextArea:rawAppend=[|cont|
    ! ((!readString)+(!(cont) num2str)) rawOverwrite.
].
TextArea:writeLn=[
    (Array:prototype:slice) ! (arguments) call [|cont|
        // [cont==null]!then [cont=""] execute.
        // [cont==undef]!then [cont=""] execute.
        // [cont:each] ! then [
            //     cont ! [|e| ! (e) writeLn ] each.
        // ] else [
            //     ! (cont) write newLine.
        // ] execute.
        ! (cont) (true) _write1
    ] each.
    ! autoResize
].
TextArea:_write1=[|cont br|
    [!(cont) (Array) instanceof] ! then [
        cont ! [|e| ! (e) (br) _write1 ] each.
    ] else [
        ! (cont) rawAppend.
        [br]!then [! "\n" rawAppend] execute.
    ] execute.
    this.
].

TextArea:newLine=[
    ! ("\n") rawAppend.
].
TextArea:clear=[! "" rawOverwrite.  ! autoResize].

TextArea:readAsArray=[
    !read  "\n"  split [|e|e!=""] select ([|e|
        ! (e) str2num
    ]!(self) bind)  map
].
TextArea:changeLine=[|no line|
    !(! readAsArray(no) (line) set) overwrite
].

SelectMenu=UI!create.
SelectMenu:action=[].
SelectMenu:attachEvent=[|;t|
    t=this.
    element ! [|;num txt|
        txt=t:element!"option:selected" find text.
        num=t:element!val.
        t ! (txt)(num) action
    ] change.
    element!([
        element!"0"val.
    ]!(self)bind)click.
].
SelectMenu:initialize=[|;args|
    args=:window:Array:prototype:slice!(arguments)call.
    optNum=0.
    element=$!"<select>" create
    (!(label) num2str) val
    "min-width" "100px" css
    "font-size" "1.3em" css
    "vertical-align" "top" css
    "white-space" "nowrap" css.
    //"position" "absolute" css.
    //(container) appendTo.
    ! autoLayout.
    args![|e|self!(e)add]each.
].
SelectMenu:add=[|;opt|
    args=:window:Array:prototype:slice!(arguments)call.
    args![|e|
        [:window:Array!(e)isArray]!then[
            e![|e_e|self!(e_e)add]each.
        ]else[
            opt=$!"<option>"create.
            opt!"value"(self:optNum)attr.
            opt!(e)text.
            self:optNum=self:optNum+1.
            self:element!(opt)append.
        ]execute.
    ]each.
    self.
].

// !"SelectMenu" "選択メニュー"addAlias.
// SelectMenu!"add" "書く"addAlias.

// Field:inc=[|by|
    //     by=[by] ! [1] or.
    //     element ! ((element ! val)-0+by)  val.
    
// ].
*/
