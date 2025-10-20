(function () {
  this["かめた"] = this["タートル"]["作る"]();
  this["かめた"]["時計"] = this["タイマー"]["作る"]();
  this["かめた"]["キュー"] = this["配列"]["作る"]();
  this["かめた"]["まえ"] = dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    this["現れる"]();
    this["時計"]["回数"](20)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["歩く"](n / 20);
      }),
    );
    return this;
  });
  this["かめた"]["うしろ"] = dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    this["現れる"]();
    this["時計"]["回数"](20)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["歩く"]((-1 * n) / 20);
      }),
    );
    return this;
  });
  this["かめた"]["ひだり"] = dtlbind(this, function (n) {
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
  this["かめた"]["みぎ"] = dtlbind(this, function (n) {
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
  this["かめた"]["いろ"] = dtlbind(this, function (c) {
    var self = this;
    var 自分 = self;
    var f;
    f = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      this["現れる"]();
      return this["時計"]["回数"](1)["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          this["図形を作る"]();
          return this["線の色"](c);
        }),
      );
    });
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return root["基準方向"] === this["undef"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return this["キュー"]["書く"](f);
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return f["実行"]();
        }),
      );
    return this;
  });
  this["かめた"]["せんをひく"] = dtlbind(this, function (r) {
    var self = this;
    var 自分 = self;
    var tmp;
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return root["基準方向"] === this["undef"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          this["キュー"]["書く"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              return this["時計"]["回数"](1)["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    return root["_基準方向"] !== this["undef"];
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        this["向き"](root["_基準方向"]);
                        return (root["_基準方向"] = this["undef"]);
                      }),
                    );
                }),
              );
            }),
          );
          this["キュー"]["書く"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              return this["まえ"](r)["うしろ"](r);
            }),
          );
          tmp = this["ルート"]["作る"]();
          tmp["みぎ"] = dtlbind(this, function (d) {
            var self = this;
            var 自分 = self;
            return this["かめた"]["キュー"]["書く"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                return this["かめた"]["みぎ"](d);
              }),
            );
          });
          tmp["ひだり"] = dtlbind(this, function (d) {
            var self = this;
            var 自分 = self;
            return this["かめた"]["キュー"]["書く"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                return this["かめた"]["ひだり"](d);
              }),
            );
          });
          return tmp;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return this["まえ"](r)["うしろ"](r);
        }),
      );
  });
  this["かめた"]["半径をかく"] = this["かめた"]["せんをひく"];
  this["かめた"]["正多角形"] = dtlbind(this, function (n, r, c) {
    var self = this;
    var 自分 = self;
    n = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return n;
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return n;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return 3;
        }),
      );
    r = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return r;
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return r;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return 200;
        }),
      );
    c = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return c;
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return c;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return this["青"];
        }),
      );
    root["辺の数"] = n;
    root["半径"] = r;
    root["色"] = c;
    root["辺の長さ"] = 2 * this["半径"] * (180 / this["辺の数"]).sin();
    root["内接半径"] = this["半径"] * (180 / this["辺の数"]).cos();
    root["基準点x"] = this["辺の長さ"] / -2;
    root["基準点y"] = -1 * this["内接半径"];
    root["基準方向"] = -90 - 180 / this["辺の数"];
    root["_基準方向"] = root["基準方向"];
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      this["キュー"]["読む"](1)["実行"]();
      return this["キュー"]["位置で消す"](1);
    })["繰り返す"](this["キュー"]["要素数?"]());
    this["時計"]
      ["回数"](1)
      ["間隔"](1)
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          this["かめた"]
            ["ペンなし"]()
            ["移動する"](this["辺の長さ"] / -2, -1 * this["内接半径"])
            ["向き"](0)
            ["ペンあり"]();
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return c === this["undef"];
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                return this["かめた"]["線の色"](this["青"]);
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                return this["かめた"]["線の色"](c);
              }),
            );
        }),
      );
    this["時計"]["回数"](this["辺の数"])["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["かめた"]
          ["歩く"](this["辺の長さ"])
          ["左回り"](360 / this["辺の数"]);
      }),
    );
    this["時計"]["回数"](1)["実行"](
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return this["かめた"]
          ["ぺんなし"]()
          ["中心に戻る"]()
          ["ペンあり"]()
          ["向き"](this["基準方向"])
          ["図形を作る"]();
      }),
    );
    return this["時計"]["間隔"](0.1);
  });
  this["かめた"]["外接円"] = dtlbind(this, function (c, r) {
    var self = this;
    var 自分 = self;
    var f;
    var d;
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return r === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (r = root["半径"]);
        }),
      );
    d = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return root["基準方向"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return root["基準方向"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return 0;
        }),
      );
    f = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return r === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return (r = root["半径"]);
          }),
        );
      d = dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return root["基準方向"];
      })
        ["なら"]()
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return root["基準方向"];
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return 0;
          }),
        );
      this["時計"]["回数"](1)["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          this["かめた"]["図形を作る"]();
          this["かめた"]
            ["ペンなし"]()
            ["向き"](d)
            ["歩く"](r)
            ["左回り"](91)
            ["ペンあり"]()
            ["図形を作る"]();
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return c === this["undef"];
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                return this["かめた"]["線の色"](this["赤"]);
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                return this["かめた"]["線の色"](c);
              }),
            );
        }),
      );
      this["時計"]
        ["回数"](360)
        ["間隔"](0.05)
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return this["かめた"]["歩く"](r * (1).sin())["左回り"](1);
          }),
        );
      return this["時計"]["回数"](1)["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          this["かめた"]["図形を作る"]();
          return this["かめた"]["ペンなし"]()["中心に戻る"]()["ペンあり"]();
        }),
      );
    });
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return r === this["undef"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return this["キュー"]["書く"](f);
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return f["実行"]();
        }),
      );
  });
  return (this["かめた"]["内接円"] = dtlbind(this, function (c, r) {
    var self = this;
    var 自分 = self;
    var f;
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return r === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return (r = root["内接半径"]);
        }),
      );
    this["d"] = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return root["基準方向"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return root["基準方向"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return 0;
        }),
      );
    f = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return r === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return (r = root["内接半径"]);
          }),
        );
      this["d"] = dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        return root["基準方向"];
      })
        ["なら"]()
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return root["基準方向"];
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return 0;
          }),
        );
      this["時計"]["回数"](1)["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          this["かめた"]["図形を作る"]();
          this["かめた"]
            ["ペンなし"]()
            ["向き"](0)
            ["位置"](0, -1 * r)
            ["ペンあり"]()
            ["図形を作る"]();
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return c === this["undef"];
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                return this["かめた"]["線の色"](this["黄色"]);
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                return this["かめた"]["線の色"](c);
              }),
            );
        }),
      );
      this["時計"]
        ["回数"](360)
        ["間隔"](0.05)
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            return this["かめた"]["歩く"](r * (1).sin())["左回り"](1);
          }),
        );
      return this["時計"]["回数"](1)["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return this["かめた"]["ペンなし"]()["中心に戻る"]()["ペンあり"]();
        }),
      );
    });
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      return r === this["undef"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return this["キュー"]["書く"](f);
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          return f["実行"]();
        }),
      );
  }));
})
  .checkerror()
  .apply(root, []);
//# sourceMappingURL=Test.js.map
