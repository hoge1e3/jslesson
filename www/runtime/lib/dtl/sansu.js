(function () {
  this["ゆっくりタートル"]["いろ"] = dtlbind(this, function (c) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments);
    var _d;
    _d = this["createDeferred"]();
    this["seq"]["then"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments);
        this["タートル"]["線の色"]["call"](this, c);
        return _d["resolve"]();
      })["bind"](this),
    );
    this["seq"] = _d["promise"]();
    return this;
  });
  this["ゆっくりタートル"]["せんをひく"] = dtlbind(this, function (d) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments);
    var _d;
    _d = this["createDeferred"]();
    this["seq"]["then"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments);
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          return root["基準方向"];
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return this["タートル"]["向き"]["call"](this, root["基準方向"]);
            }),
          );
        root["基準方向"] = root["undef"];
        return this["タイマー"]
          ["作る"]()
          ["回数"](20)
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return this["タートル"]["歩く"]["call"](this, d / 20);
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return this["タートル"]["歩く"]["call"](this, (-1 * d) / 20);
            }),
          )
          ["最後に実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return _d["resolve"]();
            }),
          );
      })["bind"](this),
    );
    this["seq"] = _d["promise"]();
    return this;
  });
  this["ゆっくりタートル"]["半径をかく"] =
    this["ゆっくりタートル"]["せんをひく"];
  this["ゆっくりタートル"]["正多角形"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments);
    var n;
    var r;
    var c;
    var _d;
    var args;
    c;
    r;
    n;
    args = _rest;
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments);
      return args["要素数?"]() === 0;
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          n = root["辺の数"];
          r = root["外接円の半径"];
          return (c = this["青"]);
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          return args["要素数?"]() === 1;
        }),
      )
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          n = root["辺の数"];
          r = root["外接円の半径"];
          return (c = args["読む"](1));
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          return args["要素数?"]() === 3;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          n = args["読む"](1);
          r = args["読む"](2);
          return (c = args["読む"](3));
        }),
      );
    root["辺の数"] = n;
    root["外接円の半径"] = r;
    root["色"] = c;
    root["辺の長さ"] = 2 * this["外接円の半径"] * (180 / this["辺の数"]).sin();
    root["内接円の半径"] = this["外接円の半径"] * (180 / this["辺の数"]).cos();
    root["基準点x"] = this["辺の長さ"] / -2;
    root["基準点y"] = -1 * this["内接円の半径"];
    root["基準方向"] = -90 - 180 / this["辺の数"];
    _d = this["createDeferred"]();
    this["seq"]["then"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments);
        this["タートル"]["ペンなし"]["call"](this);
        this["タートル"]["移動する"]["call"](
          this,
          this["辺の長さ"] / -2,
          -1 * this["内接円の半径"],
        );
        this["タートル"]["向き"]["call"](this, 0);
        this["タートル"]["ペンあり"]["call"](this);
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          return c === this["undef"];
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return this["タートル"]["線の色"]["call"](this, this["青"]);
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return this["タートル"]["線の色"]["call"](this, c);
            }),
          );
        return this["タイマー"]
          ["作る"]()
          ["間隔"](1)
          ["回数"](this["辺の数"])
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              this["タートル"]["歩く"]["call"](this, this["辺の長さ"]);
              return this["タートル"]["左回り"]["call"](
                this,
                360 / this["辺の数"],
              );
            }),
          )
          ["間隔"](1)
          ["回数"](1)
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              this["タートル"]["ペンなし"]["call"](this);
              this["タートル"]["中心に戻る"]["call"](this);
              this["タートル"]["ペンあり"]["call"](this);
              this["タートル"]["向き"]["call"](this, this["基準方向"]);
              return this["タートル"]["図形を作る"]["call"](this);
            }),
          )
          ["最後に実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return _d["resolve"]();
            }),
          );
      })["bind"](this),
    );
    this["seq"] = _d["promise"]();
    return this;
  });
  this["ゆっくりタートル"]["外接円"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments);
    var r;
    var c;
    var f;
    var d;
    var _d;
    var args;
    args = _rest;
    _d = this["createDeferred"]();
    this["seq"]["then"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments);
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          return args["要素数?"]() === 0;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              r = root["外接円の半径"];
              return (c = this["赤"]);
            }),
          )
          ["なら"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return args["要素数?"]() === 1;
            }),
          )
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              r = root["外接円の半径"];
              return (c = args["読む"](1));
            }),
          )
          ["なら"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return args["要素数?"]() === 2;
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              r = args["読む"](1);
              return (c = args["読む"](2));
            }),
          );
        d = dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          return root["基準方向"];
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return root["基準方向"];
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return 0;
            }),
          );
        this["タートル"]["図形を作る"]["call"](this);
        this["タートル"]["ペンなし"]["call"](this);
        this["タートル"]["向き"]["call"](this, d);
        this["タートル"]["歩く"]["call"](this, r);
        this["タートル"]["左回り"]["call"](this, 91);
        this["タートル"]["ペンあり"]["call"](this);
        this["タートル"]["図形を作る"]["call"](this);
        this["タートル"]["線の色"]["call"](this, c);
        return this["タイマー"]
          ["作る"]()
          ["回数"](360)
          ["間隔"](0.05)
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              this["タートル"]["歩く"]["call"](this, r * (1).sin());
              return this["タートル"]["左回り"]["call"](this, 1);
            }),
          )
          ["間隔"](1)
          ["回数"](1)
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              this["タートル"]["図形を作る"]["call"](this);
              this["タートル"]["ペンなし"]["call"](this);
              this["タートル"]["中心に戻る"]["call"](this);
              return this["タートル"]["ペンあり"]["call"](this);
            }),
          )
          ["最後に実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return _d["resolve"]();
            }),
          );
      })["bind"](this),
    );
    this["seq"] = _d["promise"]();
    return this;
  });
  this["ゆっくりタートル"]["内接円"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments);
    var r;
    var n;
    var c;
    var f;
    var d;
    var _d;
    var args;
    args = _rest;
    _d = this["createDeferred"]();
    this["seq"]["then"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments);
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          return args["要素数?"]() === 0;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              r = root["内接円の半径"];
              return (c = this["黄色"]);
            }),
          )
          ["なら"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return args["要素数?"]() === 1;
            }),
          )
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              r = root["内接円の半径"];
              return (c = args["読む"](1));
            }),
          )
          ["なら"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return args["要素数?"]() === 3;
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              n = args["読む"](1);
              r = args["読む"](2);
              c = args["読む"](3);
              return (r = r * (180 / n).cos());
            }),
          );
        d = dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments);
          return root["基準方向"];
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return root["基準方向"];
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return 0;
            }),
          );
        this["タートル"]["図形を作る"]["call"](this);
        this["タートル"]["ペンなし"]["call"](this);
        this["タートル"]["向き"]["call"](this, 0);
        this["タートル"]["位置"]["call"](this, 0, -1 * r);
        this["タートル"]["ペンあり"]["call"](this);
        this["タートル"]["図形を作る"]["call"](this);
        this["タートル"]["線の色"]["call"](this, c);
        return this["タイマー"]
          ["作る"]()
          ["回数"](360)
          ["間隔"](0.05)
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              this["タートル"]["歩く"]["call"](this, r * (1).sin());
              return this["タートル"]["左回り"]["call"](this, 1);
            }),
          )
          ["間隔"](1)
          ["回数"](1)
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              this["タートル"]["図形を作る"]["call"](this);
              this["タートル"]["ペンなし"]["call"](this);
              this["タートル"]["中心に戻る"]["call"](this);
              return this["タートル"]["ペンあり"]["call"](this);
            }),
          )
          ["最後に実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return _d["resolve"]();
            }),
          );
      })["bind"](this),
    );
    this["seq"] = _d["promise"]();
    return this;
  });
  this["ゆっくりタートル"]["ずけいをひだり"] = dtlbind(this, function (d) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments);
    var f;
    var _d;
    var args;
    args = _rest;
    _d = this["createDeferred"]();
    this["seq"]["then"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments);
        f = this["タートル"]["図形を作る"]["call"](this);
        return this["タイマー"]
          ["作る"]()
          ["回数"](20)
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return f["移動する"]((-1 * d) / 20, 0);
            }),
          )
          ["最後に実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return _d["resolve"]();
            }),
          );
      })["bind"](this),
    );
    this["seq"] = _d["promise"]();
    return this;
  });
  this["ゆっくりタートル"]["ずけいをみぎ"] = dtlbind(this, function (d) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments);
    var f;
    var _d;
    var args;
    args = _rest;
    _d = this["createDeferred"]();
    this["seq"]["then"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments);
        f = this["_図形を作る"]();
        return this["タイマー"]
          ["作る"]()
          ["回数"](20)
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return f["移動する"](d / 20, 0);
            }),
          )
          ["最後に実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments);
              return _d["resolve"]();
            }),
          );
      })["bind"](this),
    );
    this["seq"] = _d["promise"]();
    return this;
  });
  this["ゆっくりタートル"]["げんてん"] = dtlbind(this, function (x, y) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments);
    var _d;
    _d = this["createDeferred"]();
    this["seq"]["then"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments);
        this["タートル"]["ペンなし"]["call"](this);
        this["タートル"]["位置"]["call"](this, x, y);
        this["タートル"]["ペンあり"]["call"](this);
        return _d["resolve"]();
      })["bind"](this),
    );
    this["seq"] = _d["promise"]();
    return this;
  });
  this["DummyFigure"]["みぎ"] = dtlbind(this, function (by) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments);
    return this["移動する"](by, 0);
  });
  this["DummyFigure"]["ひだり"] = dtlbind(this, function (by) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments);
    return this["移動する"](-1 * by, 0);
  });
  this["ゆっくりタートル"]["くじびき"] = this["ゆっくりタートル"]["くじ引き"];
  this["ゆっくりタートル"]["図形を左"] =
    this["ゆっくりタートル"]["ずけいをひだり"];
  this["ゆっくりタートル"]["図形をひだり"] =
    this["ゆっくりタートル"]["図形を左"];
  this["ゆっくりタートル"]["ずけいを左"] = this["ゆっくりタートル"]["図形を左"];
  this["ゆっくりタートル"]["図形を右"] =
    this["ゆっくりタートル"]["ずけいをみぎ"];
  this["ゆっくりタートル"]["図形をみぎ"] = this["ゆっくりタートル"]["図形を右"];
  this["ゆっくりタートル"]["ずけいを右"] = this["ゆっくりタートル"]["図形を右"];
  this["ゆっくりタートル"]["ないせつえん"] = this["ゆっくりタートル"]["内接円"];
  this["ゆっくりタートル"]["がいせつえん"] = this["ゆっくりタートル"]["外接円"];
  this["ゆっくりタートル"]["線を引く"] = this["ゆっくりタートル"]["せんをひく"];
  this["ゆっくりタートル"]["せんを引く"] = this["ゆっくりタートル"]["線を引く"];
  this["ゆっくりタートル"]["線をひく"] = this["ゆっくりタートル"]["線を引く"];
  this["ゆっくりタートル"]["はんけいをかく"] =
    this["ゆっくりタートル"]["半径をかく"];
  this["ゆっくりタートル"]["半径を書く"] =
    this["ゆっくりタートル"]["半径をかく"];
  this["ゆっくりタートル"]["はんけいを書く"] =
    this["ゆっくりタートル"]["半径を書く"];
  this["ゆっくりタートル"]["色"] = this["ゆっくりタートル"]["いろ"];
  this["ゆっくりタートル"]["原点"] = this["ゆっくりタートル"]["げんてん"];
  this["ゆっくりタートル"]["いち"] = this["ゆっくりタートル"]["位置"];
  this["図形"]["右"] = this["図形"]["みぎ"];
  return (this["図形"]["左"] = this["図形"]["ひだり"]);
})
  .checkerror()
  .apply(root, []);

/*
ゆっくりタートル：いろ＝「｜c;_d｜
    _d=!createDeferred.
    自分：seq!([
        タートル：線の色！（自分）（c）call.
        _d!resolve.
    ]!(this)bind)then.
    自分：seq=_d!promise.
    自分。
」。
ゆっくりタートル：せんをひく＝「｜d;_d｜
    _d=!createDeferred.
    自分：seq!（[
        「：基準方向」！なら「タートル：向き！（自分）（：基準方向）call.」実行。
        ：基準方向＝:undef.
        タイマー！作る　　２０　回数「
            タートル：歩く！（自分）（d/20）call.
        」実行「
            タートル：歩く！（自分）（-1*d/20）call.
        」実行「
            _d!resolve.
        」最後に実行。
    ]！（self）bind）then.
    自分：seq=_d!promise.
    自分。
」。
ゆっくりタートル：半径をかく＝ゆっくりタートル：せんをひく。
ゆっくりタートル：正多角形＝「|;n r c _d args｜
    
    c．r．n。
    args=_rest.
    
    「（args!要素数？）＝＝０」！なら「n=:辺の数。r=:外接円の半径。c=青」
    そうでなければ「（args！要素数？）＝＝１」なら「n=:辺の数。r=:外接円の半径。c=args!1 読む」
    そうでなければ「（args！要素数？）＝＝３」なら「n=args!1 読む。r=args!2 読む。c=args!3 読む」実行。
    ：辺の数＝n。
    ：外接円の半径＝r。
    ：色＝c。
    ：辺の長さ＝2＊外接円の半径＊（sin（180/辺の数））。
    ：内接円の半径＝外接円の半径＊（cos（180/辺の数））。
    ：基準点x＝（辺の長さ/-2）。
    ：基準点y＝（-1*内接円の半径）。
    ：基準方向＝（-90-180/辺の数）。
    
    _d=!createDeferred.
    自分：seq!([
        タートル：ペンなし！（自分）call.
        タートル：移動する！（自分）（辺の長さ/-2）（-1*内接円の半径）call.
        タートル：向き！（自分）（0）call.
        タートル：ペンあり！（自分）call.
        「c==undef」！なら「
            タートル：線の色！（自分）（青）call.
        」そうでなければ「
            タートル：線の色！（自分）（c）call.
        」実行。
        タイマー！作る 1 間隔（辺の数）回数「
            タートル：歩く！（自分）（辺の長さ）call.
            タートル：左回り！（自分）（360/辺の数）call.
        」実行  １  間隔 １  回数「
            タートル：ペンなし！（自分）call.
            タートル：中心に戻る！（自分）call.
            タートル：ペンあり！（自分）call.
            タートル：向き！（自分）（基準方向）call.
            タートル：図形を作る！（自分）call.
        」実行「_d!resolve.」最後に実行。
    ]!(this)bind)then.
    自分：seq=_d!promise.
    自分。
」。
ゆっくりタートル：外接円＝「｜；r c f d _d args｜
    args=_rest.
    _d=!createDeferred.
    自分：seq!([
        「（args!要素数？）＝＝０」！なら「r=:外接円の半径。c=赤。」
        そうでなければ「（args!要素数？）＝＝１」なら「r=:外接円の半径。c=args!1 読む」
        そうでなければ「（args!要素数？）＝＝２」なら「r=args!1 読む。c=args!2 読む」実行。
        
        d=「：基準方向」！なら「：基準方向」そうでなければ「０」実行。
        
        タートル：図形を作る！（自分）call.
        タートル：ペンなし！（自分）call.
        タートル：向き！（自分）（d）call.
        タートル：歩く！（自分）（r）call.
        タートル：左回り！（自分）91 call.
        タートル：ペンあり！（自分）call.
        タートル：図形を作る！（自分）call.
        タートル：線の色！（自分）（c）call.
        タイマー！作る 360 回数 0.05 間隔「
            タートル：歩く！（自分）（r*sin（1）)call.
            タートル：左回り！（自分）1 call.
        」実行  １  間隔  １  回数「
            タートル：図形を作る！（自分）call.
            タートル：ペンなし！（自分）call.
            タートル：中心に戻る！（自分）call.
            タートル：ペンあり！（自分）call.
        」実行「_d!resolve.」最後に実行。
    ]!(this)bind)then.
    自分：seq=_d!promise.
    自分
」。
ゆっくりタートル：内接円＝「|;r n c f d _d args｜
    args=_rest.
    _d=!createDeferred.
    自分：seq!([
        「（args!要素数？）＝＝０」！なら「r=:内接円の半径。c=黄色。」
        そうでなければ「（args!要素数？）＝＝１」なら「r=:内接円の半径。c=args!1 読む」
        そうでなければ「（args!要素数？）＝＝3」なら「
            n=args!1 読む。
            r=args!２　読む。
            c=args!３ 読む。
            r＝r＊（cos（180/n））。
        」実行。
        
        d=「：基準方向」！なら「：基準方向」そうでなければ「０」実行。
        
        タートル：図形を作る！（自分）call.
        タートル：ペンなし！（自分）call.
        タートル：向き！（自分）０  call.
        タートル：位置！（自分）０  （-1*r）call.
        タートル：ペンあり！（自分）call.
        タートル：図形を作る！（自分）call.
        タートル：線の色！（自分）（c）call.
        タイマー！作る 360  回数  0.05  間隔「
            タートル：歩く！（自分）（r*sin(1))call.
            タートル：左回り！（自分）1 call.
        」実行  １  間隔  １  回数「
            タートル：図形を作る！（自分）call.
            タートル：ペンなし！（自分）call.
            タートル：中心に戻る！（自分）call.
            タートル：ペンあり！（自分）call.
        」実行「_d!resolve.」最後に実行。
    ]!(this)bind)then.
    自分：seq=_d!promise.
    自分。
」。
ゆっくりタートル：ずけいをひだり＝「｜d；f _d args｜
    args=_rest.
    _d=!createDeferred.
    自分：seq!([
        f＝タートル：図形を作る！（自分）call。
        タイマー！作る 20 回数「f！(-1*d/20) 0 移動する」実行「_d!resolve.」最後に実行。
    ]!(this)bind)then.
    自分：seq=_d!promise.
    自分。
」。
ゆっくりタートル：ずけいをみぎ＝「｜d；f _d args｜
    args=_rest.
    _d=!createDeferred.
    自分：seq!([
        f＝自分！＿図形を作る。
        タイマー！作る 20 回数「f！(d/20) 0 移動する」実行「_d!resolve.」最後に実行。
    ]!(this)bind)then.
    自分：seq=_d!promise.
    自分。
」。
ゆっくりタートル：げんてん＝「｜x  y;_d｜
    _d=!createDeferred.
    自分：seq!([
        タートル：ペンなし！（自分）call.
        タートル：位置！（自分）（x）（y）call.
        タートル：ペンあり！（自分）call.
        _d!resolve.
    ]!(this)bind)then.
    自分：seq=_d!promise.
    自分。
」。
DummyFigure：みぎ＝「｜by｜
    自分！（by）　　０　移動する。
」。
DummyFigure：ひだり＝「｜by｜
    自分！（-1*by）　　０　移動する。
」。

ゆっくりタートル：くじびき＝ゆっくりタートル：くじ引き。
ゆっくりタートル：図形を左＝ゆっくりタートル：ずけいをひだり。
ゆっくりタートル：図形をひだり＝ゆっくりタートル：図形を左。ゆっくりタートル：ずけいを左＝ゆっくりタートル：図形を左。
ゆっくりタートル：図形を右＝ゆっくりタートル：ずけいをみぎ。
ゆっくりタートル：図形をみぎ＝ゆっくりタートル：図形を右。ゆっくりタートル：ずけいを右＝ゆっくりタートル：図形を右。
ゆっくりタートル：ないせつえん＝ゆっくりタートル：内接円。ゆっくりタートル：がいせつえん＝ゆっくりタートル：外接円。
ゆっくりタートル：線を引く＝ゆっくりタートル：せんをひく。
ゆっくりタートル：せんを引く＝ゆっくりタートル：線を引く。ゆっくりタートル：線をひく＝ゆっくりタートル：線を引く。
ゆっくりタートル：はんけいをかく＝ゆっくりタートル：半径をかく。
ゆっくりタートル：半径を書く＝ゆっくりタートル：半径をかく。ゆっくりタートル：はんけいを書く＝ゆっくりタートル：半径を書く。
ゆっくりタートル：色＝ゆっくりタートル：いろ。
ゆっくりタートル：原点＝ゆっくりタートル：げんてん。
ゆっくりタートル：いち＝ゆっくりタートル：位置。
図形：右＝図形：みぎ。図形：左＝図形：ひだり。



*/
