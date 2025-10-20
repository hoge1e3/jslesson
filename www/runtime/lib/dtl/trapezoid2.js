(function () {
  this["タートル"]["図形になる"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var tmp;
    tmp = this["図形を作る"]();
    this["消える"]();
    return tmp;
  });
  this["点集合"] = this["配列"]["作る"]();
  this["図形クリック動作"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _点;
    _点 = this["点"]["作る"]();
    _点["位置"](
      this["x配列"]["読む"](this["x"]),
      this["y配列"]["読む"](this["y"]),
    );
    _点["x"] = this["x"];
    _点["y"] = this["y"];
    return this["xy平面"]["渡す"](_点);
  });
  this["x軸マス数"] = 10;
  this["画面幅"] = this["画面"]["幅?"]();
  this["x幅"] = this["画面幅"] / this["x軸マス数"];
  this["x基準"] = (-1 * this["画面幅"]) / 2;
  this["x配列"] = this["配列"]["作る"]();
  dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    return this["x配列"]["書く"](this["x基準"] + this["x幅"] * (n - 0.5));
  })["繰り返す"](this["x軸マス数"]);
  this["画面高"] = this["画面"]["高さ?"]();
  this["y軸マス数"] = (this["画面高"] / this["x幅"]).floor();
  this["y幅"] = this["x幅"];
  this["y基準"] = this["画面高"] / 2;
  this["y配列"] = this["配列"]["作る"]();
  dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    return this["y配列"]["書く"](this["y基準"] - this["y幅"] * (n - 0.5));
  })["繰り返す"](this["y軸マス数"]);
  this["x始点"] = this["x配列"]["読む"](1);
  this["x終点"] = this["x配列"]["読む"](this["x配列"]["要素数?"]());
  this["ペン色"] = this["黒"]["半透明にする"]();
  this["y配列"]["それぞれ実行"](
    dtlbind(this, function (y) {
      var self = this;
      var 自分 = self;
      return this["タートル"]
        ["作る"]()
        ["ペンなし"]()
        ["位置"](this["x始点"], y)
        ["ペンあり"]()
        ["線の色"](this["ペン色"])
        ["位置"](this["x終点"], y)
        ["図形になる"]();
    }),
  );
  this["y始点"] = this["y配列"]["読む"](1);
  this["y終点"] = this["y配列"]["読む"](this["y配列"]["要素数?"]());
  this["x配列"]["それぞれ実行"](
    dtlbind(this, function (x) {
      var self = this;
      var 自分 = self;
      return this["タートル"]
        ["作る"]()
        ["ペンなし"]()
        ["位置"](x, this["y始点"])
        ["ペンあり"]()
        ["線の色"](this["ペン色"])
        ["位置"](x, this["y終点"])
        ["図形になる"]();
    }),
  );
  this["四角ボタン"] = this["タートル"]
    ["作る"]()
    ["歩く"](this["x幅"])
    ["右回り"](90)
    ["歩く"](this["x幅"])
    ["右回り"](90)
    ["歩く"](this["x幅"])
    ["右回り"](90)
    ["歩く"](this["x幅"])
    ["右回り"](90)
    ["図形になる"]()
    ["塗る"](this["白"]["半透明にする"]())
    ["消える"]();
  this["点"] = this["タートル"]
    ["作る"]()
    ["移動する"](0, 5)
    ["移動する"](0, -10)
    ["移動する"](0, 5)
    ["移動する"](5, 0)
    ["移動する"](-10, 0)
    ["移動する"](5, 0)
    ["図形になる"]()
    ["消える"]();
  this["x配列"]["それぞれ実行"](
    dtlbind(this, function (x, x番号) {
      var self = this;
      var 自分 = self;
      return this["y配列"]["それぞれ実行"](
        dtlbind(this, function (y, y番号) {
          var self = this;
          var 自分 = self;
          var b;
          b = this["四角ボタン"]
            ["作る"]()
            ["位置"](x - this["x幅"] / 2, y + this["x幅"] / 2);
          b["x"] = x番号 + 1;
          b["y"] = y番号 + 1;
          return b["element"]["click"](this["図形クリック動作"]["bind"](b));
        }),
      );
    }),
  );
  this["xy平面"] = this["作る"]();
  this["xy平面"]["点キュー"] = this["配列"]["作る"]();
  this["xy平面"]["objキュー"] = this["配列"]["作る"]();
  this["xy平面"]["渡す"] = dtlbind(this, function (点) {
    var self = this;
    var 自分 = self;
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return this["objキュー"]["要素数?"]() > 0;
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          this["objキュー"]["読む"](1)["val"] = 点;
          return this["objキュー"]["shift"]();
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return this["点キュー"]["書く"](点);
        }),
      );
    return this;
  });
  this["xy平面"]["登録"] = dtlbind(this, function (obj) {
    var self = this;
    var 自分 = self;
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return this["点キュー"]["要素数?"]() > 0;
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (obj["val"] = this["点キュー"]["shift"]());
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return this["objキュー"]["書く"](obj);
        }),
      );
    return this;
  });
  this["xy平面"]["図形を描画"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var かめた;
    var timerId;
    this["args"] =
      root["window"]["Array"]["prototype"]["slice"]["call"](arguments);
    timerId = root["window"]["setInterval"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var f;
        f = this["真"];
        this["args"]["それぞれ実行"](
          dtlbind(this, function (obj) {
            var self = this;
            var 自分 = self;
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              return obj["val"] === this["undef"];
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  return (f = this["偽"]);
                }),
              );
          }),
        );
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return f;
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var かめた;
              root["window"]["clearInterval"](timerId);
              かめた = this["タートル"]["作る"]()["ペンなし"]();
              this["args"]["それぞれ実行"](
                dtlbind(this, function (点) {
                  var self = this;
                  var 自分 = self;
                  かめた["位置"](
                    this["x配列"]["読む"](点["val"]["x"]),
                    this["y配列"]["読む"](点["val"]["y"]),
                  )["ペンあり"]();
                  return 点["val"]["消える"]();
                }),
              );
              return かめた["閉じる"]()["図形になる"]();
            }),
          );
      })["bind"](this),
      10,
    );
    return this;
  });
  return (this["xy平面"]["点を打つ"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var obj;
    obj = this["system"]["new"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return;
      }),
    );
    this["xy平面"]["登録"](obj);
    return obj;
  }));
})
  .checkerror()
  .apply(root, []);
