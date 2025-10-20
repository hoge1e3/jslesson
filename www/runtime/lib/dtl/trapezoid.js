(function () {
  this["時計"] = this["タイマー"]["作る"]();
  this["タートル"]["_図形を作る"] = this["タートル"]["図形を作る"];
  this["タートル"]["_位置"] = this["タートル"]["位置"];
  this["図形ライク"] = this["作る"]();
  this["図形ライク"]["図形化"] = dtlbind(this, function (図形) {
    var self = this;
    var 自分 = self;
    return (this["図形"] = 図形);
  });
  this["タートル"]["まえ"] = dtlbind(this, function (d) {
    var self = this;
    var 自分 = self;
    this["時計"]["回数"](10)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["歩く"](d / 10);
      }),
    );
    return this;
  });
  this["タートル"]["ひだり"] = dtlbind(this, function (d) {
    var self = this;
    var 自分 = self;
    var _d;
    _d = 180 - d;
    this["時計"]["回数"](20)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["左回り"](_d / 20);
      }),
    );
    return this;
  });
  this["タートル"]["みぎ"] = dtlbind(this, function (d) {
    var self = this;
    var 自分 = self;
    var _d;
    _d = 180 - d;
    this["時計"]["回数"](20)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["右回り"](_d / 20);
      }),
    );
    return this;
  });
  this["タートル"]["ずけいをひだり"] = dtlbind(this, function (d) {
    var self = this;
    var 自分 = self;
    var _図形;
    this["時計"]["回数"](1)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return (_図形 = this["_図形を作る"]());
      }),
    );
    this["時計"]["回数"](20)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return _図形["移動する"](-d / 20, 0);
      }),
    );
    return this;
  });
  this["タートル"]["ずけいをみぎ"] = dtlbind(this, function (d) {
    var self = this;
    var 自分 = self;
    var _図形;
    this["時計"]["回数"](1)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return (_図形 = this["_図形を作る"]());
      }),
    );
    this["時計"]["回数"](20)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return _図形["移動する"](d / 20, 0);
      }),
    );
    return this;
  });
  this["タートル"]["ずけいをつくる"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    this["図形like"] = this["図形ライク"]["作る"]();
    this["時計"]["回数"](1)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["図形ライク"]["図形化"](this["_図形を作る"]());
      }),
    );
    return this["図形like"];
  });
  this["タートル"]["げんてん"] = dtlbind(this, function (x, y) {
    var self = this;
    var 自分 = self;
    this["時計"]["回数"](1)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["ペンなし"]()["_位置"](x, y)["ペンあり"]();
      }),
    );
    return this;
  });
  this["タートル"]["いち"] = dtlbind(this, function (x, y) {
    var self = this;
    var 自分 = self;
    this["時計"]["回数"](1)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["ペンなし"]()["_位置"](x, y)["ペンあり"]();
      }),
    );
    return this;
  });
  this["タートル"]["図形ライク"]["みぎ"] = dtlbind(this, function (d) {
    var self = this;
    var 自分 = self;
    return this["時計"]["回数"](20)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["図形"]["移動する"](d / 20, 0);
      }),
    );
  });
  this["図形ライク"]["ひだり"] = dtlbind(this, function (d) {
    var self = this;
    var 自分 = self;
    return this["時計"]["回数"](20)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["図形"]["移動する"](-d / 20, 0);
      }),
    );
  });
  this["タートル"]["前"] = this["タートル"]["まえ"];
  this["タートル"]["左"] = this["タートル"]["ひだり"];
  this["タートル"]["右"] = this["タートル"]["みぎ"];
  this["タートル"]["図形を作る"] = this["タートル"]["ずけいをつくる"];
  this["タートル"]["図形を左"] = this["タートル"]["ずけいをひだり"];
  this["タートル"]["図形を右"] = this["タートル"]["ずけいをみぎ"];
  this["タートル"]["原点"] = this["タートル"]["げんてん"];
  this["タートル"]["位置"] = this["タートル"]["いち"];
  this["図形"]["右"] = this["図形"]["みぎ"];
  this["図形"]["左"] = this["図形"]["ひだり"];
  return this;
})
  .checkerror()
  .apply(root, []);
