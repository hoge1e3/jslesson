(function () {
  this["かめ"] = this["タートル"]["作る"]()["消える"]()["線の色"](this["青"]);
  this["かめ"]["時計"] = this["タイマー"]["作る"]();
  this["かめ"]["まえ"] = dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    this["現れる"]();
    this["時計"]["回数"](n / 10)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["歩く"](n / 10);
      }),
    );
    return this;
  });
  this["かめ"]["ひだり"] = dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    this["現れる"]();
    this["時計"]["回数"](20)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["左回り"](n / 20);
      }),
    );
    return this;
  });
  this["かめ"]["みぎ"] = dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    this["現れる"]();
    this["時計"]["回数"](20)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["右回り"](n / 20);
      }),
    );
    return this;
  });
  this["かめ"]["ぬる"] = dtlbind(this, function (C) {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](C));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["あか"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](this["赤"]));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["あお"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](this["青"]));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["みどり"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](this["緑"]));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["むらさき"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](this["紫"]));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["ぴんく"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](this["紫"]));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["みずいろ"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](this["水色"]));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["みず"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](this["水色"]));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["きいろ"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](this["黄色"]));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["き"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](this["黄色"]));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["しろ"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["時計"]
      ["回数"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (this["ret"] = this["図形を作る"](this["白"]));
        }),
      )
      ["待つ"]();
    return this["ret"];
  });
  this["かめ"]["あいてがきえる"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    return (this["衝突"] = dtlbind(this, function (相手) {
      var self = this;
      var 自分 = self;
      return 相手["消える"]();
    }));
  });
  this["かめ"]["じぶんがきえる"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    return (this["衝突"] = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return this["消える"]();
    }));
  });
  this["図形"]["みぎ"] = dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    return this["移動する"](n, 0);
  });
  return (this["図形"]["ひだり"] = dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    return this["移動する"](-1 * n, 0);
  }));
})
  .checkerror()
  .apply(root, []);
//# sourceMappingURL=Test.js.map
