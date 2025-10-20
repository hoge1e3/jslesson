(function () {
  this["テーブル"]["max"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var f1;
    var f1_arr;
    var max;
    var args;
    var arg_num;
    args = this["getarg"](_rest);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return args === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (args = this["_引数設定"]());
        }),
      );
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          ret = this["テーブル"]["作る"]();
          return args["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              ret["フィールド名"]["書く"](n + "_max");
              f1_arr = this["射影"](n);
              f1_arr["データ"]["消す"]("");
              max = f1_arr["データ"]["最大"]();
              ret["書く"](max);
              max = f1_arr["データ"]["最大"]();
              return ret;
            }),
          );
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["min"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var f1_arr;
    var min;
    var args;
    var arg_num;
    args = this["getarg"](_rest);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return args === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (args = this["_引数設定"]());
        }),
      );
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          ret = this["テーブル"]["作る"]();
          return args["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              ret["フィールド名"]["書く"](n + "_min");
              f1_arr = this["射影"](n);
              f1_arr["データ"]["消す"]("");
              min = f1_arr["データ"]["最小"]();
              ret["書く"](min);
              return ret;
            }),
          );
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["mean"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var freq_arr;
    var max_rec;
    var args;
    var arg_num;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common1");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          this["f1"] = args["読む"](1);
          freq_arr = this["度数"](this["f1"]);
          this["max"] = freq_arr["最大値"]("度数")["数にする"]();
          max_rec = freq_arr["レコード取り出し"](this["max"], 2);
          this["ret"] = this["テーブル"]["作る"](this["f1"] + "_mean", "度数");
          max_rec["データ"]["それぞれ実行"](
            dtlbind(this, function (val, cnt) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return this["ret"]["書く"](val);
            }),
          );
          return this["ret"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["sum"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var f1;
    var ret;
    var sum;
    args = this["getarg"](_rest);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return args === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (args = this["_引数設定"]());
        }),
      );
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          ret = this["テーブル"]["作る"]();
          return args["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              this["フィールド番号"] = this["フィールド番号取得"](n);
              ret["フィールド名"]["書く"](n + "_sum");
              sum = 0;
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["フィールド番号"] !== this["undef"];
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    dtlbind(this, function (i) {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 1);
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (
                          this["データ"]["読む"](
                            this["フィールド番号"] +
                              (i - 1) * this["フィールド名"]["要素数?"](),
                          ) !== "NA"
                        );
                      })
                        ["なら"]()
                        ["実行"](
                          dtlbind(this, function () {
                            var self = this;
                            var 自分 = self;
                            var _rest = Array.prototype.slice.call(
                              arguments,
                              0,
                            );
                            return (sum =
                              sum +
                              this["データ"]["読む"](
                                this["フィールド番号"] +
                                  (i - 1) * this["フィールド名"]["要素数?"](),
                              ));
                          }),
                        );
                    })["繰り返す"](
                      this["データ"]["要素数?"]() / this["要素数"],
                    );
                    return ret["書く"](sum);
                  }),
                );
            }),
          );
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
    return ret;
  });
  this["テーブル"]["average"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var f1;
    var ret;
    var sum;
    var レコード数;
    var フィールド番号;
    args = this["getarg"](_rest);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return args === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (args = this["_引数設定"]());
        }),
      );
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          ret = this["テーブル"]["作る"]();
          return args["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              フィールド番号 = this["フィールド番号取得"](n);
              ret["フィールド名"]["書く"](n + "_average");
              レコード数 =
                this["データ"]["要素数?"]() / this["フィールド名"]["要素数?"]();
              sum = 0;
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return フィールド番号 !== this["undef"];
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    dtlbind(this, function (i) {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 1);
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (
                          this["データ"]["読む"](
                            フィールド番号 +
                              (i - 1) * this["フィールド名"]["要素数?"](),
                          ) === ""
                        );
                      })
                        ["なら"]()
                        ["そうでなければ"](
                          dtlbind(this, function () {
                            var self = this;
                            var 自分 = self;
                            var _rest = Array.prototype.slice.call(
                              arguments,
                              0,
                            );
                            return (レコード数 = レコード数 - 1);
                          }),
                        )
                        ["実行"](
                          dtlbind(this, function () {
                            var self = this;
                            var 自分 = self;
                            var _rest = Array.prototype.slice.call(
                              arguments,
                              0,
                            );
                            return (sum =
                              sum +
                              root["window"]["parseFloat"](
                                this["データ"]["読む"](
                                  フィールド番号 +
                                    (i - 1) * this["フィールド名"]["要素数?"](),
                                ),
                              ));
                          }),
                        );
                    })["繰り返す"](
                      this["データ"]["要素数?"]() / this["要素数"],
                    );
                    return ret["書く"](sum / レコード数);
                  }),
                );
            }),
          );
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
    return ret;
  });
  this["テーブル"]["deviation"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var f1;
    var f1_arr;
    var dev_arr;
    var ret;
    var ave;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "qn1");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = args["読む"](1);
          f1_arr = this["射影"](f1);
          f1_arr["データ"] = f1_arr["データ"]["消す"]("");
          ave = f1_arr["平均値"](f1)["値読み出し"]();
          dev_arr = this["配列"]["作る"]();
          f1_arr["データ"]["それぞれ実行"](
            dtlbind(this, function (n) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return n !== "NA";
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return dev_arr["書く"](n - ave);
                  }),
                );
            }),
          );
          ret = this["テーブル"]["作る"](f1 + "_deviation");
          dev_arr["それぞれ実行"](
            dtlbind(this, function (val) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return ret["書く"](val);
            }),
          );
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["dispersion"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var sum;
    var data_array;
    var ave;
    var dev;
    var disp;
    var args;
    var f1;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "qn1");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = args["読む"](1);
          data_array = this["射影"](f1);
          data_array["データ"] = data_array["データ"]["消す"]("");
          sum = data_array["合計値"](f1)["値読み出し"]();
          ave = sum / data_array["データ"]["要素数?"]();
          dev = 0;
          data_array["データ"]["それぞれ実行"](
            dtlbind(this, function (n) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return (dev = dev + (n - ave) * (n - ave));
            }),
          );
          disp = 0;
          disp = dev / data_array["データ"]["要素数?"]();
          ret = this["テーブル"]["作る"](f1 + "_dispersion");
          ret["書く"](disp);
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["unbiased_dispersion"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var data_array;
    var sum;
    var 要素数;
    var ave;
    var dev;
    var disp;
    var args;
    var f1;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "qn1");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = args["読む"](1);
          data_array = this["射影"](f1);
          data_array["データ"] = data_array["データ"]["消す"]("");
          sum = data_array["合計値"](f1)["値読み出し"]();
          要素数 = data_array["データ"]["要素数?"]();
          ave = sum / 要素数;
          dev = 0;
          data_array["データ"]["それぞれ実行"](
            dtlbind(this, function (n) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return (dev = dev + (n - ave) * (n - ave));
            }),
          );
          disp = 0;
          disp = ((要素数 / (要素数 - 1)) * dev) / 要素数;
          this["ret"] = this["テーブル"]["作る"](f1 + "_unbiased_dispersion");
          this["ret"]["書く"](disp);
          return this["ret"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["covariance"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var f1;
    var f2;
    var f1_dev_arr;
    var f2_dev_arr;
    var total;
    var ret;
    var cav;
    var args;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "qn2");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = args["読む"](1);
          f2 = args["読む"](2);
          f1_dev_arr = this["偏差"](f1);
          f2_dev_arr = this["偏差"](f2);
          total = 0;
          f1_dev_arr["データ"]["それぞれ実行"](
            dtlbind(this, function (val, cnt) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return (total = total + val * f2_dev_arr["データ"]["読む"](cnt));
            }),
          );
          cav = total / f1_dev_arr["データ"]["要素数?"]();
          ret = this["テーブル"]["作る"](f1 + "&" + f2 + "_covariance");
          ret["書く"](cav);
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["unbiased_covariance"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var f1;
    var f2;
    var f1_dev_arr;
    var f2_dev_arr;
    var 要素数;
    var total;
    var cav;
    var ret;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "qn2");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = args["読む"](1);
          f2 = args["読む"](2);
          f1_dev_arr = this["偏差"](f1);
          f2_dev_arr = this["偏差"](f2);
          要素数 = f1_dev_arr["データ"]["要素数?"]();
          total = 0;
          f1_dev_arr["データ"]["それぞれ実行"](
            dtlbind(this, function (val, cnt) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return (total = total + val * f2_dev_arr["データ"]["読む"](cnt));
            }),
          );
          cav = (要素数 / (要素数 - 1)) * (total / 要素数);
          ret = this["テーブル"]["作る"](
            f1 + "&" + f2 + "_unbiased_covariance",
          );
          ret["書く"](cav);
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["correlation"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var f1;
    var f2;
    var tmp1;
    var tmp2;
    var cav;
    var st_dev1;
    var st_dev2;
    var cor;
    var ret;
    this["args"] = this["getarg"](_rest);
    this["args2"] = this["args"]["concat"]();
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](this["args"], "qn");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = this["args"]["読む"](1);
          f2 = this["args"]["読む"](2);
          tmp1 = this["配列"]["作る"]();
          this["args"]["それぞれ実行"](
            dtlbind(this, function (f1) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              tmp2 = this["配列"]["作る"]();
              this["args"]["それぞれ実行"](
                dtlbind(this, function (f2) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 1);
                  cav = this["共分散"](f1, f2)["値読み出し"]();
                  st_dev1 = this["標準偏差"](f1)["値読み出し"]();
                  st_dev2 = this["標準偏差"](f2)["値読み出し"]();
                  cor = cav / (st_dev1 * st_dev2);
                  return tmp2["書く"](cor);
                }),
              );
              return tmp1["書く"](tmp2);
            }),
          );
          ret = this["テーブル"]["作る"](this["args"]["挿入"](1, ""));
          tmp1["それぞれ実行"](
            dtlbind(this, function (f, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return ret["追加"](f["挿入"](1, this["args"]["読む"](i + 1)));
            }),
          );
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["unbiased_covariance"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var f1;
    var f2;
    var f1_dev_arr;
    var f2_dev_arr;
    var 要素数;
    var total;
    var cav;
    var ret;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "qn2");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = args["読む"](1);
          f2 = args["読む"](2);
          f1_dev_arr = this["偏差"](f1);
          f2_dev_arr = this["偏差"](f2);
          要素数 = f1_dev_arr["データ"]["要素数?"]();
          total = 0;
          f1_dev_arr["データ"]["それぞれ実行"](
            dtlbind(this, function (val, cnt) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return (total = total + val * f2_dev_arr["データ"]["読む"](cnt));
            }),
          );
          cav = (要素数 / (要素数 - 1)) * (total / 要素数);
          ret = this["テーブル"]["作る"](
            f1 + "&" + f2 + "_unbiased_covariance",
          );
          ret["書く"](cav);
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["_相関係数"] = dtlbind(this, function (f1, f2) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    var tmp1;
    var tmp2;
    var cav;
    var st_dev1;
    var st_dev2;
    var cor;
    var ret;
    cav = this["共分散"](f1, f2)["値読み出し"]();
    st_dev1 = this["標準偏差"](f1)["値読み出し"]();
    st_dev2 = this["標準偏差"](f2)["値読み出し"]();
    cor = cav / (st_dev1 * st_dev2);
    return cor;
  });
  this["テーブル"]["partial_correltion"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var f1;
    var f2;
    var tmp1;
    var tmp2;
    var cav;
    var st_dev1;
    var st_dev2;
    var cor;
    var ret;
    this["args"] = this["getarg"](_rest);
    this["args2"] = this["args"]["concat"]();
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](this["args"], "qn3");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = this["args"]["読む"](1);
          f2 = this["args"]["読む"](2);
          this["f3"] = this["args"]["読む"](3);
          this["cor1"] = this["_相関係数"](f2, this["f3"]);
          this["cor2"] = this["_相関係数"](f1, f2);
          this["cor3"] = this["_相関係数"](f1, this["f3"]);
          this["cor2"] = 0.706;
          this["cor3"] = 0.87;
          this["cor1"] = 0.302;
          this["r"] =
            (this["cor2"] - this["cor1"] * this["cor3"]) /
            ((1 - this["cor1"]["pow"](2)).sqrt() *
              (1 - this["cor3"]["pow"](2)).sqrt());
          ret = this["テーブル"]["作る"](
            f1 + "&" + f2 + "&" + this["f3"] + "_partial_correltion",
          );
          ret["書く"](this["r"]);
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["standard_deviation"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var f1;
    var disp;
    var sdev;
    var ret;
    var args;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "qn1");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = args["読む"](1);
          disp = this["分散"](f1)["値読み出し"]();
          sdev = disp.sqrt();
          ret = this["テーブル"]["作る"](f1 + "_standard_deviation");
          return ret["書く"](sdev);
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["unbiased_standard_deviation"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var f1;
    var disp;
    var sdev;
    var ret;
    var args;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "qn1");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = args["読む"](1);
          disp = this["不偏分散"](f1)["値読み出し"]();
          sdev = disp.sqrt();
          ret = this["テーブル"]["作る"](f1 + "_unbiased_standard_deviation");
          return ret["書く"](sdev);
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["median"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var f1;
    var data_arr;
    var 要素数;
    var 中心;
    var median;
    var disp;
    var sdev;
    var ret;
    var args;
    args = this["getarg"](_rest);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return args === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (args = this["_引数設定"]());
        }),
      );
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          ret = this["テーブル"]["作る"]();
          args["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              data_arr = this["小さい順"](n)["射影"](n);
              data_arr["データ"] = data_arr["データ"]["消す"]("");
              要素数 = data_arr["データ"]["要素数?"]();
              ret["フィールド名"]["書く"](n + "_median");
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return 要素数 !== 0;
              })
                ["なら"]()
                ["そうでなければ"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    中心 = (要素数 / 2).ceil();
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return 要素数 % 2 === 0;
                    })
                      ["なら"]()
                      ["そうでなければ"](
                        dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return (median =
                            (data_arr["データ"]["読む"](中心) +
                              data_arr["読む"](中心 + 1)) /
                            2);
                        }),
                      )
                      ["実行"](
                        dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return (median = data_arr["データ"]["読む"](中心));
                        }),
                      );
                    return ret["書く"](median);
                  }),
                )
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return ret["書く"](this["undef"]);
                  }),
                );
            }),
          );
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["quantile1"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var f1;
    var data_arr;
    var 要素数;
    var 中心;
    var data;
    var qua1;
    var ret;
    args = this["getarg"](_rest);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return args === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (args = this["_引数設定"]());
        }),
      );
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          ret = this["テーブル"]["作る"]();
          return args["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              data_arr = this["小さい順"](n)["射影"](n);
              data_arr["データ"] = data_arr["データ"]["消す"]("");
              要素数 = data_arr["データ"]["要素数?"]();
              中心 = (要素数 / 2).floor();
              data = this["テーブル"]["作る"](n);
              dtlbind(this, function (i) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return data["書く"](data_arr["データ"]["読む"](i));
              })["繰り返す"](中心);
              qua1 = data["中央値"](n)["値読み出し"]();
              ret["フィールド名"]["書く"](n + "_quantile1");
              return ret["書く"](qua1);
            }),
          );
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["quantile3"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var f1;
    var data_arr;
    var 要素数;
    var 中心;
    var data;
    var qua3;
    var ret;
    args = this["getarg"](_rest);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return args === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (args = this["_引数設定"]());
        }),
      );
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          ret = this["テーブル"]["作る"]();
          return args["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              data_arr = this["大きい順"](n)["射影"](n);
              data_arr["データ"] = data_arr["データ"]["消す"]("");
              要素数 = data_arr["データ"]["要素数?"]();
              中心 = (要素数 / 2).floor();
              data = this["テーブル"]["作る"](n);
              dtlbind(this, function (i) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return data["書く"](data_arr["データ"]["読む"](i));
              })["繰り返す"](中心);
              qua3 = data["中央値"](n)["値読み出し"]();
              ret["フィールド名"]["書く"](n + "_quantile3");
              return ret["書く"](qua3);
            }),
          );
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["frequancy"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var arg_num;
    var キー達;
    var 値達;
    var ret;
    var f1_arr;
    var 件数;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common1");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          arg_num = args["要素数?"]();
          this["f1"] = args["読む"](1);
          キー達 = this["配列"]["作る"]();
          値達 = this["配列"]["作る"]();
          this["f1の番号"] = 0;
          f1_arr = this["射影"](this["f1"]);
          f1_arr["データ"] = f1_arr["データ"]["消す"]("");
          件数 = f1_arr["データ"]["要素数?"]();
          this["階級"] = this["配列"]["作る"]();
          this["カウント"] = this["配列"]["作る"]();
          this["フィールド名要素数"] = this["フィールド名"]["要素数?"]();
          this["文字コード配列にする"] = dtlbind(this, function (str) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            var ret;
            ret = this["配列"]["作る"]();
            (str + "")["分割"]("")["それぞれ実行"](
              dtlbind(this, function (要素) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return ret["書く"](要素["文字コード"]());
              }),
            );
            return ret;
          });
          this["文字列にする"] = dtlbind(this, function (文字コード配列) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            var ret;
            ret = "";
            文字コード配列["それぞれ実行"](
              dtlbind(this, function (要素) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return (ret = ret["連結"](要素["コード文字"]()));
              }),
            );
            return ret;
          });
          キー達["探す"] = dtlbind(this, function (キー) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            var 結果;
            結果 = 0;
            this["文字コード配列の比較"] = dtlbind(this, function (左, 右) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return "" + 左 === "" + 右;
            });
            dtlbind(this, function (番号) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["文字コード配列の比較"](this["読む"](番号), キー);
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return (結果 = 番号);
                  }),
                );
            })["繰り返す"](this["要素数?"]());
            return 結果;
          });
          dtlbind(this, function (番号) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["フィールド名"]["読む"](番号) === this["f1"];
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (this["f1の番号"] = 番号);
                }),
              );
          })["繰り返す"](this["フィールド名要素数"]);
          dtlbind(this, function (番号) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            var 値;
            var キー番号;
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (
                this["データ"]["読む"](
                  this["フィールド名要素数"] * (番号 - 1) + this["f1の番号"],
                ) !== ""
              );
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  値 = this["文字コード配列にする"](
                    this["データ"]["読む"](
                      this["フィールド名要素数"] * (番号 - 1) +
                        this["f1の番号"],
                    ),
                  );
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return キー達["探す"](値) === 0;
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        キー達["書く"](値);
                        return 値達["書く"](0);
                      }),
                    );
                  キー番号 = キー達["探す"](値);
                  return 値達["上書き"](キー番号, 値達["読む"](キー番号) + 1);
                }),
              );
          })["繰り返す"](
            this["データ"]["要素数?"]() / this["フィールド名要素数"],
          );
          ret = this["テーブル"]["作る"](this["f1"], "frequancy");
          dtlbind(this, function (番号) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            ret["書く"](this["文字列にする"](キー達["読む"](番号)));
            return ret["書く"](値達["読む"](番号));
          })["繰り返す"](キー達["要素数?"]());
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["frequancy_distribution"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var args;
    var arg_num;
    var 件数;
    var f1_arr;
    var min;
    var max;
    var 階級幅;
    var f1;
    var flag;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "freq");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          arg_num = args["要素数?"]();
          f1 = args["読む"](1);
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return arg_num >= 2;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (階級幅 = args["読む"](2));
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return arg_num >= 3;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (min = args["読む"](3));
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return arg_num >= 4;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (max = args["読む"](4));
              }),
            );
          this["f1の番号"] = 0;
          f1_arr = this["射影"](f1);
          f1_arr["データ"] = f1_arr["データ"]["消す"]("");
          件数 = f1_arr["データ"]["要素数?"]();
          this["階級"] = this["配列"]["作る"]();
          this["カウント"] = this["配列"]["作る"]();
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return min === this["undef"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (min = root["window"]["parseFloat"](
                  f1_arr["データ"]["最小"](),
                ));
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return max === this["undef"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (max = root["window"]["parseFloat"](
                  f1_arr["データ"]["最大"](),
                ));
              }),
            );
          this["sum"] = max - min;
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return 階級幅 === this["undef"];
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["階級数"] = (件数.log() / (2).log() + 1).ceil();
                return (階級幅 = root["window"]["parseFloat"](
                  (this["sum"] / this["階級数"]).ceil(),
                ));
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["階級数"] = (this["sum"] / 階級幅).round());
              }),
            );
          ret = this["テーブル"]["作る"]("class", "frequancy");
          dtlbind(this, function (n) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            this["階級"]["書く"](
              this["配列"]["作る"](
                (min + 階級幅 * (n - 1) + "")["連結"]("~" + (min + 階級幅 * n)),
              ),
            );
            this["階級"]["読む"](n)["書く"](0);
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return n === 1;
            })
              ["なら"]()
              ["そうでなければ"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["カウント"]["書く"](min + 階級幅 * (n - 1));
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["カウント"]["書く"](min + 階級幅 * (n - 1));
                }),
              );
          })["繰り返す"](this["階級数"]);
          f1_arr["データ"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return this["カウント"]["それぞれ実行"](
                dtlbind(this, function (m, j) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 2);
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return j === this["階級数"];
                  })
                    ["なら"]()
                    ["そうでなければ"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return this["全部"]["本当"](m <= n, m + 階級幅 >= n);
                        })
                          ["なら"]()
                          ["実行"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return this["階級"]
                                ["読む"](j)
                                [
                                  "上書き"
                                ](2, this["階級"]["読む"](j)["読む"](2) + 1);
                            }),
                          );
                      }),
                    )
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return this["全部"]["本当"](m <= n, m + 階級幅 > n);
                        })
                          ["なら"]()
                          ["実行"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return this["階級"]
                                ["読む"](j)
                                [
                                  "上書き"
                                ](2, this["階級"]["読む"](j)["読む"](2) + 1);
                            }),
                          );
                      }),
                    );
                }),
              );
            }),
          );
          this["階級"]["それぞれ実行"](
            dtlbind(this, function (n) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return n["それぞれ実行"](
                dtlbind(this, function (val) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 1);
                  return ret["書く"](val);
                }),
              );
            }),
          );
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["frequancy_tabele"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var arg_num;
    var f1;
    var freq;
    var frec_sum;
    var frecdist_sum;
    var ret;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "freq");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          arg_num = args["要素数?"]();
          f1 = args["読む"](1);
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return arg_num >= 2;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["階級幅"] = args["読む"](2));
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return arg_num >= 3;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["min"] = args["読む"](3));
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return arg_num >= 4;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["max"] = args["読む"](4));
              }),
            );
          freq = this["度数分布"](f1, this["階級数"], this["min"], this["max"]);
          frec_sum = freq["合計値"]("度数")["数にする"]();
          frecdist_sum = 0;
          ret = this["テーブル"]["作る"]("class", "frequancy", "proportion");
          freq["データ"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              ret["書く"](n);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return i % 2 === 0;
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    ret["書く"](n / frec_sum);
                    return (frecdist_sum = frecdist_sum + n / frec_sum);
                  }),
                );
            }),
          );
          ret["書く"]("計");
          ret["書く"](frec_sum);
          ret["書く"](frecdist_sum);
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          f1 = args["読む"](1);
          ret = this["テーブル"]["作る"](f1, "frequancy", "proportion");
          this["f_arr"] = this["度数"](f1)["射影"](f1);
          freq = this["度数"](f1)["射影"]("度数");
          this["sum"] = 0;
          freq["データ"]["それぞれ実行"](
            dtlbind(this, function (n) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return (this["sum"] = this["sum"] + n);
            }),
          );
          freq["データ"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              ret["書く"](this["f_arr"]["データ"]["読む"](i));
              ret["書く"](n);
              return ret["書く"](n / this["sum"]);
            }),
          );
          return ret;
        }),
      );
  });
  this["テーブル"]["crosstab"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var val;
    var cp;
    var tmp;
    var sum;
    var sum_array;
    var args;
    var arg_num;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common2");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          arg_num = args["要素数?"]();
          tmp = this["配列"]["作る"]();
          args["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return i <= 2;
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return tmp["書く"](this["射影"](n)["重複なし"]());
                  }),
                );
            }),
          );
          this["カウント"] = this["配列"]["作る"]();
          tmp["読む"](1)["データ"]["それぞれ実行"](
            dtlbind(this, function (n, j) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              sum = 0;
              this["カウント"]["書く"](n);
              return tmp["読む"](2)["データ"]["それぞれ実行"](
                dtlbind(this, function (m) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 1);
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["全部"]["本当"](n !== "", m !== "");
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        val = this["集計2"](
                          args["読む"](1),
                          n,
                          args["読む"](2),
                          m,
                        )["数にする"]();
                        this["カウント"]["書く"](val);
                        return (sum = sum + val);
                      }),
                    );
                }),
              );
            }),
          );
          ret = this["テーブル"]["作る"]("");
          tmp["読む"](2)["データ"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return n !== "";
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return ret["フィールド名"]["書く"](n);
                  }),
                );
            }),
          );
          this["カウント"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return ret["書く"](n);
            }),
          );
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["crosstab_table"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var val;
    var cp;
    var tmp;
    var sum;
    var sum_array;
    var args;
    var arg_num;
    args = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_arg"](args, "common2");
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          arg_num = args["要素数?"]();
          tmp = this["配列"]["作る"]();
          args["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return i <= 2;
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return tmp["書く"](this["射影"](n)["重複なし"]());
                  }),
                );
            }),
          );
          this["カウント"] = this["配列"]["作る"]();
          tmp["読む"](1)["それぞれ実行"](
            dtlbind(this, function (n, j) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              sum = 0;
              this["カウント"]["書く"](n);
              tmp["読む"](2)["それぞれ実行"](
                dtlbind(this, function (m) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 1);
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["全部"]["本当"](n !== "", m !== "");
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        val = this["集計2"](
                          args["読む"](1),
                          n,
                          args["読む"](2),
                          m,
                        )["数にする"]();
                        this["カウント"]["書く"](val);
                        return (sum = sum + val);
                      }),
                    );
                }),
              );
              return this["カウント"]["書く"](sum);
            }),
          );
          ret = this["テーブル"]["作る"]("");
          tmp["読む"](2)["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return n !== "";
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return ret["フィールド名"]["書く"](n);
                  }),
                );
            }),
          );
          ret["フィールド名"]["書く"]("sum");
          this["カウント"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return ret["書く"](n);
            }),
          );
          sum_array = this["配列"]["作る"]("sum");
          sum = 0;
          tmp["読む"](2)["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return n !== "";
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    val = this["集計"](args["読む"](2), n)["数にする"]();
                    sum_array["書く"](val);
                    return (sum = sum + val);
                  }),
                );
            }),
          );
          sum_array["書く"](sum);
          ret["追加"](sum_array);
          return ret;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      );
  });
  this["テーブル"]["bar_graph"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["_棒グラフ"] = this["グラフ"]["作る"]();
    this["_棒グラフ"]["種類"] = "棒グラフ";
    this["_棒グラフ"]["描画済みグラフ"] = this["配列"]["作る"]();
    this["_棒グラフ"]["_DATA"] = this;
    this["_棒グラフ"]["f1"] = this["フィールド名"]["読む"](1);
    this["_棒グラフ"]["f2"] = this["getarg"](_rest);
    this["_棒グラフ"]["描画"] = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      this["位置確定"]();
      this["型配列"] = this["型判定"](this["_DATA"]);
      this["data_x"] = this["_DATA"]["射影"](this["f1"]);
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["f2"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["f2"] = this["配列"]["作る"]();
            this["_DATA"]["フィールド名"]["それぞれ実行"](
              dtlbind(this, function (n) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return this["f2"]["書く"](n);
              }),
            );
            this["型配列"]["それぞれ実行"](
              dtlbind(this, function (n) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return this["f2"]["消す"](n);
              }),
            );
            return this["f2"]["位置で消す"](1);
          }),
        );
      this["最大長"] = 0;
      this["data_x"]["データ"]["それぞれ実行"](
        dtlbind(this, function (n, i) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 2);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (n + "")["長さ?"]() > this["最大長"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["最大長"] = (n + "")["長さ?"]());
              }),
            );
        }),
      );
      this["data_y"] = this["_DATA"]["射影"](this["f2"]);
      this["要素数"] = this["data_x"]["データ"]["要素数?"]();
      this["ラベル数"] = (this["要素数"] / 35).ceil();
      this["横幅設定"](this["要素数"]);
      this["縦幅設定"](this["data_y"]);
      this["メモリ線描画"](this["要素数"]);
      this["ペン"] = this["タートル"]["作る"]()["線の太さ"](1);
      this["系列数"] = this["f2"]["要素数?"]();
      this["もとのプロット幅"] = this["_プロット幅"];
      this["_プロット幅"] = this["_プロット幅"] / this["系列数"];
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["_方向"] === "縦";
      })
        ["なら"]()
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["ペン"]
              ["ぺんなし"]()
              ["位置"](this["_原点x"] + this["_間隔"], this["_原点y"])
              ["左回り"](90)
              ["ぺんあり"]();
            this["ラベルx"] =
              this["_原点x"] + this["_間隔"] + this["もとのプロット幅"] / 2;
            this["ラベルy"] = this["_原点y"] - 10;
            dtlbind(this, function (j) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              this["data_y"] = this["_DATA"]["射影"](this["f2"]["読む"](j));
              this["ラベルサイズ"] = dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["_プロット幅"] > 10;
              })
                ["なら"]()
                ["そうでなければ"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return 10;
                  }),
                )
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["_プロット幅"];
                  }),
                );
              this["data_y"]["データ"]["それぞれ実行"](
                dtlbind(this, function (n, i) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 2);
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["_範囲指定"];
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return n >= this["_最大メモリ"];
                        })
                          ["なら"]()
                          ["そうでなければ"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return (n = this["_最大メモリ"]);
                            }),
                          )
                          ["なら"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return n <= this["_最小メモリ"];
                            }),
                          )
                          ["実行"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return (n = this["_最小メモリ"]);
                            }),
                          );
                      }),
                    );
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return n >= this["_最小メモリ"];
                  })
                    ["なら"]()
                    ["そうでなければ"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        n = (n - this["_起点メモリ"]) * this["_DACOL"];
                        return this["ペン"]
                          ["ペンあり"]()
                          ["歩く"](n)
                          ["右回り"](90)
                          ["歩く"](this["_プロット幅"])
                          ["右回り"](90)
                          ["歩く"](n)
                          ["右回り"](180)
                          ["図形にする"](this["着色"](j));
                      }),
                    )
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["ペン"]["移動する"](this["_プロット幅"], 0);
                      }),
                    );
                  this["ペン"]
                    ["ペンなし"]()
                    [
                      "移動する"
                    ](this["_間隔"] + (this["系列数"] - 1) * this["_プロット幅"], 0);
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return j === 1;
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return (i - 1) % this["ラベル数"] === 0;
                        })
                          ["なら"]()
                          ["実行"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              this["横軸ラベル"] =
                                this["data_x"]["読む"](i) + "";
                              this["横軸ラベル長"] = (this["横軸ラベル"] + "")[
                                "長さ?"
                              ]();
                              dtlbind(this, function () {
                                var self = this;
                                var 自分 = self;
                                var _rest = Array.prototype.slice.call(
                                  arguments,
                                  0,
                                );
                                return this["最大長"] * 5 > this["_プロット幅"];
                              })
                                ["なら"]()
                                ["そうでなければ"](
                                  dtlbind(this, function () {
                                    var self = this;
                                    var 自分 = self;
                                    var _rest = Array.prototype.slice.call(
                                      arguments,
                                      0,
                                    );
                                    return this["縦表示"](
                                      this["横軸ラベル"],
                                      this["ラベルx"],
                                      this["ラベルy"],
                                      "",
                                      this["最大長"],
                                    );
                                  }),
                                )
                                ["実行"](
                                  dtlbind(this, function () {
                                    var self = this;
                                    var 自分 = self;
                                    var _rest = Array.prototype.slice.call(
                                      arguments,
                                      0,
                                    );
                                    return this["ラベル"]
                                      ["作る"](this["横軸ラベル"])
                                      ["文字サイズ"](this["_軸ラベルサイズ"])
                                      ["位置"](
                                        this["ラベルx"] -
                                          (this["横軸ラベル長"] * 5) / 2,
                                        this["ラベルy"],
                                      );
                                  }),
                                );
                              return (this["ラベルx"] =
                                this["ラベルx"] +
                                this["_間隔"] * this["ラベル数"] +
                                this["系列数"] *
                                  this["もとのプロット幅"] *
                                  this["ラベル数"]);
                            }),
                          );
                      }),
                    );
                }),
              );
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["_底"] >= this["ラベルy"];
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return (this["_底"] = this["ラベルy"] - 30);
                  }),
                );
              return this["ペン"]
                ["ぺんなし"]()
                [
                  "位置"
                ](this["_原点x"] + this["_間隔"] + this["_プロット幅"] * j, this["_原点y"]);
            })["繰り返す"](this["系列数"]);
            return (this["_底"] = this["_底"] - 15 * this["最大長"]);
          }),
        )
        ["なら"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["_方向"] === "横";
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["ペン"]
              ["ぺんなし"]()
              ["位置"](this["_原点x"], this["_原点y"] + this["_間隔"])
              ["ぺんあり"]();
            this["ラベルx"] = this["_原点x"] - 10;
            this["ラベルy"] =
              this["_原点y"] +
              (this["_間隔"] + this["もとのプロット幅"]) -
              this["もとのプロット幅"] / 2 +
              6;
            return dtlbind(this, function (j) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              this["data_y"] = this["_DATA"]["射影"](this["f2"]["読む"](j));
              this["data_y"]["データ"]["それぞれ実行"](
                dtlbind(this, function (n, i) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 2);
                  this["val"] = this["data_x"]["読む"](i);
                  this["メモリ調整"] = (this["val"] + "")["長さ?"]() * 10;
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["_範囲指定"];
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return n >= this["_最大メモリ"];
                        })
                          ["なら"]()
                          ["そうでなければ"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return (n = this["_最大メモリ"]);
                            }),
                          )
                          ["なら"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return n <= this["_最小メモリ"];
                            }),
                          )
                          ["実行"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return (n = this["_最小メモリ"]);
                            }),
                          );
                      }),
                    );
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return n >= this["_最小メモリ"];
                  })
                    ["なら"]()
                    ["そうでなければ"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        n = (n - this["_起点メモリ"]) * this["_DACOL"];
                        return this["ペン"]
                          ["ペンあり"]()
                          ["歩く"](n)
                          ["左回り"](90)
                          ["歩く"](this["_プロット幅"])
                          ["左回り"](90)
                          ["歩く"](n)
                          ["左回り"](180)
                          ["図形にする"](this["着色"](j));
                      }),
                    )
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["ペン"]["移動する"](0, this["_プロット幅"]);
                      }),
                    );
                  this["ペン"]
                    ["ペンなし"]()
                    [
                      "移動する"
                    ](0, this["_間隔"] + (this["系列数"] - 1) * this["_プロット幅"]);
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return j === 1;
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return (i - 1) % this["ラベル数"] === 0;
                        })
                          ["なら"]()
                          ["実行"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              this["ラベル"]
                                ["作る"](this["val"])
                                ["文字サイズ"](this["_軸ラベルサイズ"] - 2)
                                ["位置"](
                                  this["ラベルx"] - this["メモリ調整"],
                                  this["ラベルy"],
                                );
                              this["ラベルy"] =
                                this["ラベルy"] +
                                (this["_間隔"] + this["もとのプロット幅"]) *
                                  this["ラベル数"];
                              return dtlbind(this, function () {
                                var self = this;
                                var 自分 = self;
                                var _rest = Array.prototype.slice.call(
                                  arguments,
                                  0,
                                );
                                return (
                                  this["_左端"] >=
                                  this["ラベルx"] - this["メモリ調整"] - 30
                                );
                              })
                                ["なら"]()
                                ["実行"](
                                  dtlbind(this, function () {
                                    var self = this;
                                    var 自分 = self;
                                    var _rest = Array.prototype.slice.call(
                                      arguments,
                                      0,
                                    );
                                    return (this["_左端"] =
                                      this["ラベルx"] -
                                      this["メモリ調整"] -
                                      30);
                                  }),
                                );
                            }),
                          );
                      }),
                    );
                }),
              );
              return this["ペン"]
                ["ぺんなし"]()
                [
                  "位置"
                ](this["_原点x"], this["_原点y"] + this["_間隔"] + this["_プロット幅"] * j);
            })["繰り返す"](this["系列数"]);
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["系列数"] > 1;
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_方向"] === "横";
            })
              ["なら"]()
              ["そうでなければ"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["ペン"]
                    ["ペンなし"]()
                    ["位置"](this["_原点x"], this["_底"] - 5);
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["ペン"]
                    ["ペンなし"]()
                    ["位置"](this["_原点x"], this["_底"] - 10);
                }),
              );
            this["系列ラベルx"] = this["_原点x"] + 10;
            this["系列ラベルy"] = this["_底"];
            dtlbind(this, function (i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              this["系列名"] = this["f2"]["読む"](i);
              this["系列名長"] = (this["系列名"] + "")["長さ?"]();
              this["ペン"]
                ["ペンあり"]()
                ["角形"](6, 4)
                ["図形を作る"](this["着色"](i));
              this["a"] = this["ラベル"]
                ["作る"](this["系列名"])
                ["位置"](this["系列ラベルx"], this["系列ラベルy"])
                ["文字サイズ"](this["_軸ラベルサイズ"] - 2);
              this["ペン"]
                ["ペンなし"]()
                ["移動する"](this["系列名長"] * 10 + 16, 0);
              return (this["系列ラベルx"] =
                this["系列ラベルx"] + (this["系列名長"] * 10 + 16));
            })["繰り返す"](this["系列数"]);
            return (this["_底"] = this["_底"] - 20);
          }),
        );
      this["ペン"]["消える"]();
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["_横軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["横軸タイトル"](this["f1"]);
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["_縦軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["縦軸タイトル"]("value");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["ラベル"]["作る"]("　")["位置"](this["_右端"], 0);
      this["テーブル"]["x"] = this["_右端"];
      return this;
    });
    this["グラフ"]["個体番号"] = this["グラフ"]["個体番号"] + 1;
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["_棒グラフ"]["f2"] === this["undef"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_棒グラフ"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["check_fn"](this["_棒グラフ"]["f2"]);
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_棒グラフ"]["_DATA"]
                    ["射影"](this["_棒グラフ"]["f2"]["読む"](1))
                    ["check_dt"]();
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_棒グラフ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["undef"];
                    }),
                  );
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["undef"];
              }),
            );
        }),
      );
  });
  this["テーブル"]["histgram"] = dtlbind(this, function (f2) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    var tmp;
    this["_ヒストグラム"] = this["グラフ"]["作る"]();
    this["_ヒストグラム"]["種類"] = "ヒストグラム";
    this["_ヒストグラム"]["f1"] = this["フィールド名"]["読む"](1);
    this["_ヒストグラム"]["f2"] = f2;
    this["_ヒストグラム"]["_DATA"] = this;
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["_ヒストグラム"]["f1"] !== "階級";
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          this["_ヒストグラム"]["_DATA"] = this["度数分布"](
            this["_ヒストグラム"]["f2"],
          );
          this["_ヒストグラム"]["f1"] = "階級";
          return (this["_ヒストグラム"]["f2"] = "度数");
        }),
      );
    this["_ヒストグラム"]["描画"] = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      this["位置確定"]();
      this["data_x"] = this["_DATA"]["射影"](this["f1"]);
      this["data_y"] = this["_DATA"]["射影"](this["f2"]);
      this["要素数"] = this["data_y"]["データ"]["要素数?"]();
      this["横幅設定"](this["要素数"]);
      this["縦幅設定"](this["data_y"]);
      this["メモリ線描画"](this["要素数"]);
      this["ペン"] = this["タートル"]["作る"]()["線の太さ"](1);
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["_方向"] === "縦";
      })
        ["なら"]()
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["ペン"]
              ["ぺんなし"]()
              ["位置"](this["_原点x"] + this["_間隔"], this["_原点y"])
              ["左回り"](90)
              ["ぺんあり"]();
            this["ラベルx"] = this["_原点x"] + this["_間隔"];
            this["ラベルy"] = this["_原点y"] - 20;
            this["ラベルサイズ"] = dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_プロット幅"] > 10;
            })
              ["なら"]()
              ["そうでなければ"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return 10;
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_プロット幅"];
                }),
              );
            this["data_y"]["データ"]["それぞれ実行"](
              dtlbind(this, function (n, i) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 2);
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return n >= this["_最大メモリ"];
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (n = this["_最大メモリ"]);
                    }),
                  )
                  ["なら"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return n <= this["_最小メモリ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (n = this["_最小メモリ"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return n >= this["_最小メモリ"];
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      n = (n - this["_起点メモリ"]) * this["_DACOL"];
                      this["ペン"]
                        ["ペンあり"]()
                        ["歩く"](n)
                        ["右回り"](90)
                        ["歩く"](
                          this["_プロット幅"] +
                            (this["_間隔"] * this["要素数"] - this["_間隔"]) /
                              this["要素数"],
                        )
                        ["右回り"](90)
                        ["歩く"](n)
                        ["右回り"](180)
                        ["図形にする"](this["色"]["作る"](14737656));
                      this["ペン"]
                        ["ぺんなし"]()
                        [
                          "移動する"
                        ](-1 * (this["_プロット幅"] + (this["_間隔"] * this["要素数"] - this["_間隔"]) / this["要素数"]), 0);
                      return this["ペン"]
                        ["線の色"](this["色"]["作る"](5592405))
                        ["ペンあり"]()
                        ["歩く"](n)
                        ["右回り"](90)
                        ["歩く"](
                          this["_プロット幅"] +
                            (this["_間隔"] * this["要素数"] - this["_間隔"]) /
                              this["要素数"],
                        )
                        ["右回り"](90)
                        ["歩く"](n)
                        ["右回り"](180)
                        ["図形を作る"]();
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["ペン"]["移動する"](
                        this["_プロット幅"] +
                          (this["_間隔"] * this["要素数"] - this["_間隔"]) /
                            this["要素数"],
                        0,
                      );
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return i === 1;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["ラベルペン"] = this["タートル"]
                        ["作る"]()
                        ["線の太さ"](1)
                        ["ペンなし"]()
                        ["位置"](this["ラベルx"], this["ラベルy"])
                        ["ペンあり"]()
                        ["歩く"](this["_横幅"] - this["_間隔"] * 2)
                        ["右回り"](90));
                    }),
                  );
                this["ニョロ位置"] = (this["data_x"]["読む"](i) + "")[
                  "何文字目?"
                ]("~");
                this["横軸ラベル"] = (this["data_x"]["読む"](i) + "")["部分"](
                  1,
                  this["ニョロ位置"] - 1,
                );
                this["ラベルペン"]
                  ["ペンなし"]()
                  ["位置"](this["ラベルx"], this["ラベルy"])
                  ["ペンあり"]()
                  ["歩く"](10);
                this["横軸ラベル長"] = (this["横軸ラベル"] + "")["長さ?"]();
                this["調整"] = 0;
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["横軸ラベル長"] < 3;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["調整"] = (3 - this["横軸ラベル長"]) * 5);
                    }),
                  )
                  ["なら"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["横軸ラベル長"] > 3;
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["調整"] =
                        -1 * (this["横軸ラベル長"] - 3) * 2);
                    }),
                  );
                this["ラベル"]
                  ["作る"](this["横軸ラベル"])
                  ["文字サイズ"](this["_軸ラベルサイズ"])
                  ["位置"](
                    this["ラベルx"] + this["調整"] - 10,
                    this["ラベルy"] - 10,
                  );
                return (this["ラベルx"] =
                  this["ラベルx"] +
                  this["_プロット幅"] +
                  (this["_間隔"] * this["要素数"] - this["_間隔"]) /
                    this["要素数"]);
              }),
            );
            this["横軸ラベル"] = this["data_x"]
              ["読む"](this["要素数"])
              [
                "部分"
              ](this["ニョロ位置"] + 1, (this["data_x"]["読む"](this["要素数"]) + "")["長さ?"]());
            this["ラベルペン"]
              ["ペンなし"]()
              ["位置"](this["ラベルx"], this["ラベルy"])
              ["ペンあり"]()
              ["歩く"](10);
            this["ラベル"]
              ["作る"](this["横軸ラベル"])
              ["文字サイズ"](this["_軸ラベルサイズ"])
              ["位置"](
                this["ラベルx"] + this["調整"] - 10,
                this["ラベルy"] - 10,
              );
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_底"] >= this["ラベルy"];
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (this["_底"] = this["ラベルy"] - 30);
                }),
              );
          }),
        )
        ["なら"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["_方向"] === "横";
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["ペン"]
              ["ぺんなし"]()
              ["位置"](this["_原点x"], this["_原点y"] + this["_間隔"])
              ["ぺんあり"]();
            this["ラベルx"] = this["_原点x"] - 15;
            this["ラベルy"] = this["_原点y"] + this["_間隔"];
            this["ラベルサイズ"] = dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_プロット幅"] > 10;
            })
              ["なら"]()
              ["そうでなければ"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return 8;
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_プロット幅"];
                }),
              );
            this["data_y"]["データ"]["それぞれ実行"](
              dtlbind(this, function (n, i) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 2);
                this["val"] = this["data_x"]["読む"](i);
                this["メモリ調整"] = (this["val"] + "")["長さ?"]() * 12;
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return n >= this["_最大メモリ"];
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (n = this["_最大メモリ"]);
                    }),
                  )
                  ["なら"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return n <= this["_最小メモリ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (n = this["_最小メモリ"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return n >= this["_最小メモリ"];
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      n = (n - this["_起点メモリ"]) * this["_DACOL"];
                      this["ペン"]
                        ["ペンあり"]()
                        ["歩く"](n)
                        ["左回り"](90)
                        ["歩く"](
                          this["_プロット幅"] +
                            (this["_間隔"] * this["要素数"] - this["_間隔"]) /
                              this["要素数"],
                        )
                        ["左回り"](90)
                        ["歩く"](n)
                        ["左回り"](180)
                        ["図形にする"](this["色"]["作る"](14737656));
                      this["ペン"]
                        ["ぺんなし"]()
                        [
                          "移動する"
                        ](0, -1 * (this["_プロット幅"] + (this["_間隔"] * this["要素数"] - this["_間隔"]) / this["要素数"]));
                      return this["ペン"]
                        ["線の色"](this["色"]["作る"](5592405))
                        ["ペンあり"]()
                        ["歩く"](n)
                        ["左回り"](90)
                        ["歩く"](
                          this["_プロット幅"] +
                            (this["_間隔"] * this["要素数"] - this["_間隔"]) /
                              this["要素数"],
                        )
                        ["左回り"](90)
                        ["歩く"](n)
                        ["左回り"](180)
                        ["図形を作る"]();
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["ペン"]["移動する"](
                        0,
                        this["_プロット幅"] +
                          (this["_間隔"] * this["要素数"] - this["_間隔"]) /
                            this["要素数"],
                      );
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return i === 1;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["ラベルペン"] = this["タートル"]
                        ["作る"]()
                        ["左回り"](90)
                        ["線の太さ"](1)
                        ["ペンなし"]()
                        ["位置"](this["ラベルx"], this["ラベルy"])
                        ["ペンあり"]()
                        ["歩く"](this["_縦幅"] - this["_間隔"] * 2)
                        ["左回り"](90));
                    }),
                  );
                this["ニョロ位置"] = (this["data_x"]["読む"](i) + "")[
                  "何文字目?"
                ]("~");
                this["横軸ラベル"] = (this["data_x"]["読む"](i) + "")["部分"](
                  1,
                  this["ニョロ位置"] - 1,
                );
                this["ラベルペン"]
                  ["ペンなし"]()
                  ["位置"](this["ラベルx"], this["ラベルy"])
                  ["ペンあり"]()
                  ["歩く"](10);
                this["横軸ラベル長"] = (this["横軸ラベル"] + "")["長さ?"]();
                this["ラベル"]
                  ["作る"](this["横軸ラベル"])
                  ["文字サイズ"](this["_軸ラベルサイズ"])
                  ["位置"](
                    this["ラベルx"] - this["横軸ラベル長"] * 7 - 10,
                    this["ラベルy"] + 10,
                  );
                this["ラベルy"] =
                  this["ラベルy"] +
                  this["_プロット幅"] +
                  (this["_間隔"] * this["要素数"] - this["_間隔"]) /
                    this["要素数"];
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (
                    this["_左端"] >= this["ラベルx"] - this["メモリ調整"] - 30
                  );
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["_左端"] =
                        this["ラベルx"] - this["メモリ調整"] - 30);
                    }),
                  );
              }),
            );
            this["横軸ラベル"] = this["data_x"]
              ["読む"](this["要素数"])
              [
                "部分"
              ](this["ニョロ位置"] + 1, (this["data_x"]["読む"](this["要素数"]) + "")["長さ?"]());
            this["ラベルペン"]
              ["ペンなし"]()
              ["位置"](this["ラベルx"], this["ラベルy"])
              ["ペンあり"]()
              ["歩く"](10);
            return this["ラベル"]
              ["作る"](this["横軸ラベル"])
              ["文字サイズ"](this["_軸ラベルサイズ"])
              ["位置"](
                this["ラベルx"] - this["横軸ラベル長"] * 7 - 10,
                this["ラベルy"] + 10,
              );
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["系列数"] > 1;
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_方向"] === "横";
            })
              ["なら"]()
              ["そうでなければ"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["ペン"]
                    ["ペンなし"]()
                    ["位置"](this["_原点x"], this["_底"] - 5);
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["ペン"]
                    ["ペンなし"]()
                    ["位置"](this["_原点x"], this["_底"] - 10);
                }),
              );
            this["系列ラベルx"] = this["_原点x"] + 10;
            this["系列ラベルy"] = this["_底"];
            dtlbind(this, function (i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              this["系列名"] = f2["読む"](i);
              this["系列名長"] = (this["系列名"] + "")["長さ?"]();
              this["ペン"]
                ["ペンあり"]()
                ["角形"](6, 4)
                ["図形を作る"](this["着色"](i));
              this["a"] = this["ラベル"]
                ["作る"](this["系列名"])
                ["位置"](this["系列ラベルx"], this["系列ラベルy"])
                ["文字サイズ"](this["_軸ラベルサイズ"] - 2);
              this["ペン"]
                ["ペンなし"]()
                ["移動する"](this["系列名長"] * 10 + 16, 0);
              return (this["系列ラベルx"] =
                this["系列ラベルx"] + (this["系列名長"] * 10 + 16));
            })["繰り返す"](this["系列数"]);
            return (this["_底"] = this["_底"] - 20);
          }),
        );
      this["ペン"]["消える"]();
      this["ラベルペン"]["消える"]();
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["横軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["横軸タイトル"]("class");
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["縦軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["縦軸タイトル"]("frequancy");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["ラベル"]["作る"]("　")["位置"](this["_右端"], 0);
      this["テーブル"]["x"] = this["_右端"];
      return this;
    });
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["どれか"]["本当"](
        f2 === this["undef"],
        this["_ヒストグラム"]["_DATA"] === this["undef"],
      );
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["_ヒストグラム"]["_DATA"]["check_fn"](
              this["_ヒストグラム"]["f2"],
            );
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_ヒストグラム"]["_DATA"]
                    ["射影"](this["_ヒストグラム"]["f2"])
                    ["check_dt"]();
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      this["グラフ"]["個体番号"] =
                        this["グラフ"]["個体番号"] + 1;
                      return this["_ヒストグラム"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["undef"];
                    }),
                  );
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["undef"];
              }),
            );
        }),
      );
  });
  this["テーブル"]["stacked_bar_graph"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["_積み上げ棒グラフ"] = this["グラフ"]["作る"]();
    this["_積み上げ棒グラフ"]["種類"] = "積み上げ棒グラフ";
    this["_積み上げ棒グラフ"]["_DATA"] = this;
    this["_積み上げ棒グラフ"]["f1"] = this["フィールド名"]["読む"](1);
    this["_積み上げ棒グラフ"]["f2"] = this["getarg"](_rest);
    this["_積み上げ棒グラフ"]["描画"] = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      this["位置確定"]();
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["f2"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["tmp"] = this["_DATA"]["フィールド名"]["concat"]();
            return (this["f2"] = this["tmp"]["位置で消す"](1));
          }),
        );
      this["tmp_data"] = this["_DATA"]["射影"](this["f2"]);
      this["data_x"] = this["_DATA"]["射影"](this["f1"]);
      this["フィールド数"] = this["f2"]["要素数?"]();
      this["系列数"] = this["data_x"]["データ"]["要素数?"]();
      this["正合計配列"] = this["配列"]["作る"]();
      this["負合計配列"] = this["配列"]["作る"]();
      this["データ補正用配列"] = this["配列"]["作る"]();
      this["データ補正用配列"]["データ"] = this["配列"]["作る"]();
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        this["正合計配列"]["書く"](0);
        return this["負合計配列"]["書く"](0);
      })["繰り返す"](this["フィールド数"]);
      dtlbind(this, function (i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return dtlbind(this, function (j) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 1);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (
              this["tmp_data"]["読む"]((i - 1) * this["フィールド数"] + j) > 0
            );
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["正合計配列"]["上書き"](
                  j,
                  this["正合計配列"]["読む"](j) +
                    this["tmp_data"]["読む"](
                      (i - 1) * this["フィールド数"] + j,
                    ),
                );
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["負合計配列"]["上書き"](
                  j,
                  this["負合計配列"]["読む"](j) +
                    this["tmp_data"]["読む"](
                      (i - 1) * this["フィールド数"] + j,
                    ),
                );
              }),
            );
        })["繰り返す"](this["フィールド数"]);
      })["繰り返す"](this["系列数"]);
      this["データ補正用配列"]["データ"] = this["正合計配列"]["連結"](
        this["負合計配列"],
      );
      this["描画用データ"] = this["_DATA"]["行列入れ替え"](
        this["f2"]["挿入"](1, this["f1"]),
      );
      this["f2"]["位置で消す"](1);
      this["正高さ配列"] = this["配列"]["作る"]();
      this["負高さ配列"] = this["配列"]["作る"]();
      this["横幅設定"](this["フィールド数"]);
      this["縦幅設定"](this["データ補正用配列"]);
      this["メモリ線描画"](this["フィールド数"]);
      this["ペン"] = this["タートル"]["作る"]()["線の太さ"](1);
      this["ペン"]
        ["ぺんなし"]()
        ["位置"](this["_原点x"] + this["_間隔"], this["_原点y"])
        ["左回り"](90);
      this["ラベルx"] =
        this["_原点x"] + this["_間隔"] + this["_プロット幅"] / 2;
      this["ラベルy"] = this["_原点y"] - 10;
      dtlbind(this, function (j) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        this["data_y"] = this["描画用データ"]["射影"](
          this["data_x"]["データ"]["読む"](j) + "",
        );
        this["ラベルサイズ"] = dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_プロット幅"] > 10;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return 10;
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_プロット幅"];
            }),
          );
        dtlbind(this, function (i) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 1);
          var n;
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return j === 1;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["正高さ配列"]["書く"](this["_原点y"]);
                return this["負高さ配列"]["書く"](this["_原点y"]);
              }),
            );
          n = this["data_y"]["データ"]["読む"](i);
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return n >= this["_最大メモリ"];
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (n = this["_最大メモリ"]);
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return n <= this["_最小メモリ"];
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (n = this["_最小メモリ"]);
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return n >= this["_最小メモリ"];
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return n > 0;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["移動値"] = this["正高さ配列"]["読む"](i));
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["移動値"] = this["負高さ配列"]["読む"](i));
                    }),
                  );
                n = (n - this["_起点メモリ"]) * this["_DACOL"];
                this["ペン"]["ぺんなし"]()["移動する"](0, this["移動値"]);
                return this["ペン"]
                  ["ペンあり"]()
                  ["歩く"](n)
                  ["右回り"](90)
                  ["歩く"](this["_プロット幅"])
                  ["右回り"](90)
                  ["歩く"](n)
                  ["右回り"](180)
                  ["図形にする"](this["着色"](j));
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["ペン"]["移動する"](this["_プロット幅"], 0);
              }),
            );
          this["ペン"]
            ["ペンなし"]()
            ["移動する"](this["_間隔"], -1 * this["移動値"]);
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return n > 0;
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["正高さ配列"]["上書き"](
                  i,
                  this["正高さ配列"]["読む"](i) + n,
                );
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["負高さ配列"]["上書き"](
                  i,
                  this["負高さ配列"]["読む"](i) + n,
                );
              }),
            );
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return j === 1;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["横軸ラベル"] = this["f2"]["読む"](i);
                this["横軸ラベル長"] = (this["横軸ラベル"] + "")["長さ?"]();
                this["調整"] = 0;
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["横軸ラベル長"] < 3;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["調整"] = (3 - this["横軸ラベル長"]) * 5);
                    }),
                  )
                  ["なら"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["横軸ラベル長"] > 3;
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["調整"] =
                        -1 * (this["横軸ラベル長"] - 3) * 3);
                    }),
                  );
                this["ラベル"]
                  ["作る"](this["横軸ラベル"])
                  ["文字サイズ"](this["_軸ラベルサイズ"])
                  ["位置"](
                    this["ラベルx"] + this["調整"] - this["横軸ラベル長"] * 3,
                    this["ラベルy"],
                  );
                return (this["ラベルx"] =
                  this["ラベルx"] + this["_間隔"] + this["_プロット幅"]);
              }),
            );
        })["繰り返す"](this["フィールド数"]);
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_底"] >= this["ラベルy"];
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["_底"] = this["ラベルy"] - 30);
            }),
          );
        return this["ペン"]
          ["ぺんなし"]()
          ["位置"](this["_原点x"] + this["_間隔"], this["_原点y"]);
      })["繰り返す"](this["系列数"]);
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["系列数"] > 1;
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["ペン"]
              ["ペンなし"]()
              ["位置"](this["_原点x"], this["_底"] - 10);
            this["系列ラベルx"] = this["_原点x"] + 10;
            this["系列ラベルy"] = this["_底"];
            dtlbind(this, function (i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              this["系列名"] = this["data_x"]["読む"](i);
              this["系列名長"] = (this["系列名"] + "")["長さ?"]();
              this["ペン"]
                ["ペンあり"]()
                ["角形"](6, 4)
                ["図形を作る"](this["着色"](i));
              this["a"] = this["ラベル"]
                ["作る"](this["系列名"])
                ["位置"](this["系列ラベルx"], this["系列ラベルy"])
                ["文字サイズ"](this["_軸ラベルサイズ"] - 2);
              this["ペン"]
                ["ペンなし"]()
                ["移動する"](this["系列名長"] * 10 + 16, 0);
              return (this["系列ラベルx"] =
                this["系列ラベルx"] + (this["系列名長"] * 10 + 16));
            })["繰り返す"](this["系列数"]);
            return (this["_底"] = this["_底"] - 20);
          }),
        );
      this["ペン"]["消える"]();
      this["_YLOWERLIM"] = this["_YORIGIN"] + this["y_pos"];
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["横軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["横軸タイトル"]("item");
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["縦軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["縦軸タイトル"]("value");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["ラベル"]["作る"]("　")["位置"](this["_右端"], 0);
      this["テーブル"]["x"] = this["_右端"];
      return this;
    });
    this["グラフ"]["個体番号"] = this["グラフ"]["個体番号"] + 1;
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["_積み上げ棒グラフ"]["f2"] === this["undef"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_積み上げ棒グラフ"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["check_fn"](this["_積み上げ棒グラフ"]["f2"]);
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_積み上げ棒グラフ"]["_DATA"]
                    ["射影"](this["_積み上げ棒グラフ"]["f2"]["読む"](1))
                    ["check_dt"]();
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_積み上げ棒グラフ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["undef"];
                    }),
                  );
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["undef"];
              }),
            );
        }),
      );
  });
  this["テーブル"]["line_graph"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var max;
    var maxf;
    this["_折れ線グラフ"] = this["グラフ"]["作る"]();
    this["_折れ線グラフ"]["種類"] = "折れ線グラフ";
    this["_折れ線グラフ"]["_DATA"] = this;
    this["_折れ線グラフ"]["f1"] = this["フィールド名"]["読む"](1);
    this["_折れ線グラフ"]["f2"] = this["getarg"](_rest);
    this["_折れ線グラフ"]["描画"] = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      this["_向き"] = "縦";
      this["位置確定"]();
      this["data_x"] = this["_DATA"]["射影"](this["f1"]);
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["f2"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["f2"] = this["配列"]["作る"]();
            this["フィールド名"]["それぞれ実行"](
              dtlbind(this, function (n) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return this["f2"]["書く"](n);
              }),
            );
            return (this["f2"] = this["tmp"]["位置で消す"](1));
          }),
        );
      this["data_y"] = this["_DATA"]["射影"](this["f2"]);
      this["要素数"] = this["data_x"]["データ"]["要素数?"]();
      this["系列数"] = this["f2"]["要素数?"]();
      this["最大長"] = 0;
      this["data_x"]["データ"]["それぞれ実行"](
        dtlbind(this, function (n, i) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 2);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (n + "")["長さ?"]() > this["最大長"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["最大長"] = (n + "")["長さ?"]());
              }),
            );
        }),
      );
      this["ラベル数"] = (this["要素数"] / 35).ceil();
      this["横幅設定"](this["要素数"]);
      this["縦幅設定"](this["data_y"]);
      this["メモリ線描画"](this["要素数"]);
      this["ペン"] = this["タートル"]["作る"]()["線の太さ"](2);
      this["ラベルx"] = this["_原点x"] + this["_間隔"];
      this["ラベルy"] = this["_原点y"] - 10;
      dtlbind(this, function (j) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        this["data_y"] = this["_DATA"]["射影"](this["f2"]["読む"](j));
        this["ラベルサイズ"] = dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_プロット幅"] > 10;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return 10;
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_プロット幅"];
            }),
          );
        this["data_y"]["データ"]["それぞれ実行"](
          dtlbind(this, function (n, i) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 2);
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_メモリ範囲"];
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return n >= this["_最大メモリ"];
                  })
                    ["なら"]()
                    ["そうでなければ"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (n = this["_最大メモリ"]);
                      }),
                    )
                    ["なら"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return n <= this["_最小メモリ"];
                      }),
                    )
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return;
                      }),
                    );
                }),
              );
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return i === 1;
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  this["plot_flag"] = this["false"];
                  this["y1"] = (n - this["_起点メモリ"]) * this["_DACOL"];
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["y1"] >= this["_最小メモリ"];
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (this["plot_flag"] = this["true"]);
                      }),
                    );
                  this["プロットx"] =
                    this["_原点x"] + this["_間隔"] + this["_プロット幅"] / 2;
                  this["ペン"]
                    ["ペンなし"]()
                    ["位置"](this["プロットx"], this["y1"]);
                  return (this["x1"] = this["プロットx"]);
                }),
              );
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return n >= this["_最小メモリ"];
            })
              ["なら"]()
              ["そうでなければ"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  n = (n - this["_起点メモリ"]) * this["_DACOL"];
                  this["x2"] =
                    this["x1"] + (this["_間隔"] + this["_プロット幅"]);
                  this["y2"] = n;
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["plot_flag"];
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["ペン"]
                          ["ペンあり"]()
                          ["角形"](4, 8)
                          ["図形にする"](this["着色"](j))
                          ["移動する"](-2, 5);
                      }),
                    );
                  this["ペン"]
                    ["ぺんあり"]()
                    ["位置"](this["プロットx"], n)
                    ["図形を作る"](this["着色"](j));
                  this["プロットx"] =
                    this["プロットx"] + (this["_間隔"] + this["_プロット幅"]);
                  this["x1"] = this["x2"];
                  this["y1"] = this["y2"];
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return i === this["要素数"];
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["ペン"]
                          ["ペンあり"]()
                          ["角形"](4, 8)
                          ["図形にする"](this["着色"](j))
                          ["移動する"](-2, 5);
                      }),
                    );
                  return (this["plot_flag"] = this["true"]);
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  n = (n - this["_起点メモリ"]) * this["_DACOL"];
                  this["x2"] =
                    this["x1"] + (this["_間隔"] + this["_プロット幅"]);
                  this["y2"] = n;
                  this["x軸交点"] =
                    -this["y1"] /
                      (this["y2"] - this["y1"]) /
                      (this["x2"] - this["x1"]) +
                    this["x1"];
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["plot_flag"];
                  })
                    ["なら"]()
                    ["そうでなければ"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        this["ペン"]
                          ["ペンあり"]()
                          ["角形"](4, 8)
                          ["図形にする"](this["着色"](j))
                          ["移動する"](-2, 5);
                        return this["ペン"]
                          ["ぺんあり"]()
                          ["位置"](this["x軸交点"], this["_原点y"])
                          ["図形を作る"](this["着色"](j));
                      }),
                    )
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["ペン"]
                          ["ぺんなし"]()
                          ["位置"](this["x軸交点"], this["_原点y"]);
                      }),
                    );
                  this["プロットx"] =
                    this["プロットx"] + (this["_間隔"] + this["_プロット幅"]);
                  this["x1"] = this["x2"];
                  this["y1"] = this["y2"];
                  return (this["plot_flag"] = this["false"]);
                }),
              );
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return j === 1;
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return (i - 1) % this["ラベル数"] === 0;
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        this["横軸ラベル"] = this["data_x"]["読む"](i);
                        this["横軸ラベル長"] = (this["横軸ラベル"] + "")[
                          "長さ?"
                        ]();
                        dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return this["最大長"] * 5 > this["_プロット幅"];
                        })
                          ["なら"]()
                          ["そうでなければ"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return this["縦表示"](
                                this["横軸ラベル"],
                                this["ラベルx"],
                                this["ラベルy"],
                                "",
                                this["最大長"],
                              );
                            }),
                          )
                          ["実行"](
                            dtlbind(this, function () {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return this["ラベル"]
                                ["作る"](this["横軸ラベル"])
                                ["文字サイズ"](this["_軸ラベルサイズ"])
                                ["位置"](
                                  this["ラベルx"] -
                                    (this["横軸ラベル長"] * 5) / 2,
                                  this["ラベルy"],
                                );
                            }),
                          );
                        return (this["ラベルx"] =
                          this["ラベルx"] +
                          (this["_間隔"] + this["_プロット幅"]) *
                            this["ラベル数"]);
                      }),
                    );
                }),
              );
          }),
        );
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_底"] >= this["ラベルy"];
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["_底"] = this["ラベルy"] - 30);
            }),
          );
      })["繰り返す"](this["系列数"]);
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["系列数"] > 1;
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["ペン"]["ペンなし"]()["位置"](this["_原点x"], this["_底"] - 5);
            this["系列ラベルx"] = this["_原点x"] + 10;
            this["系列ラベルy"] = this["_底"];
            dtlbind(this, function (i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              this["系列名"] = this["f2"]["読む"](i);
              this["系列名長"] = (this["系列名"] + "")["長さ?"]();
              this["ペン"]
                ["ペンあり"]()
                ["角形"](6, 4)
                ["図形を作る"](this["着色"](i));
              this["a"] = this["ラベル"]
                ["作る"](this["系列名"])
                ["位置"](this["系列ラベルx"], this["系列ラベルy"])
                ["文字サイズ"](this["_軸ラベルサイズ"]);
              this["ペン"]
                ["ペンなし"]()
                ["移動する"](this["系列名長"] * 10 + 16, 0);
              return (this["系列ラベルx"] =
                this["系列ラベルx"] + (this["系列名長"] * 10 + 16));
            })["繰り返す"](this["系列数"]);
            return (this["_底"] = this["_底"] - 20);
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["横軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["横軸タイトル"](this["f1"]);
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["縦軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["縦軸タイトル"]("value");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["ラベル"]["作る"]("　")["位置"](this["_右端"], 0);
      this["テーブル"]["x"] = this["_右端"];
      this["ペン"]["消える"]();
      return this;
    });
    this["グラフ"]["個体番号"] = this["グラフ"]["個体番号"] + 1;
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["_折れ線グラフ"]["f2"] === this["undef"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_折れ線グラフ"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["check_fn"](this["_折れ線グラフ"]["f2"]);
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_折れ線グラフ"]["_DATA"]
                    ["射影"](this["_折れ線グラフ"]["f2"]["読む"](1))
                    ["check_dt"]();
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_折れ線グラフ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["undef"];
                    }),
                  );
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["undef"];
              }),
            );
        }),
      );
  });
  this["テーブル"]["pie_chart"] = dtlbind(this, function (f2) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["どれか"]["本当"](f2 === "", f2 === this["undef"]);
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (f2 = this["フィールド名"]["読む"](2));
        }),
      );
    this["_円グラフ"] = this["グラフ"]["作る"]();
    this["_円グラフ"]["_DATA"] = this;
    this["_円グラフ"]["f1"] = this["フィールド名"]["読む"](1);
    this["_円グラフ"]["f2"] = f2;
    this["_円グラフ"]["描画"] = dtlbind(this, function (i) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      this["位置確定"]();
      this["移動する"](20, 0);
      this["ペン"] = this["タートル"]["作る"]();
      this["D_f1"] = this["_DATA"]["小さい順"](f2)["射影"](this["f1"]);
      this["r"] = 120;
      this["x"] = 90;
      this["x_pos"] = this["r"] + 20;
      this["y_pos"] = -1 * this["r"];
      this["d_arr"] = this["_DATA"]["小さい順"](f2)["射影"](f2);
      this["sum"] = this["d_arr"]["合計値"](f2)["値読み出し"]();
      this["add"] = 0;
      this["_左端"] = this["_原点x"] - this["r"] - 20;
      this["_天井"] = this["_原点y"] + this["r"] + 30;
      this["_底"] = this["_原点y"] + this["y_pos"] - 20;
      this["要素数"] = this["d_arr"]["データ"]["要素数?"]();
      this["max_length"] = 1;
      this["角度合計"] = 0;
      this["割合合計"] = 0;
      this["d_arr"]["データ"]["それぞれ実行"](
        dtlbind(this, function (val, j) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 2);
          this["prop"] = ((val / this["sum"]) * 1000).round();
          this["prop"] = this["prop"] / 10;
          this["チーズ角度"] = (this["prop"] * 3.6).round();
          this["col"] = this["グラフ"]["着色"](j);
          this["long"] = 0;
          this["割合合計"] = this["割合合計"] + this["prop"];
          this["角度合計"] = this["角度合計"] + this["チーズ角度"];
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return j === this["要素数"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["角度合計"] > 360;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["チーズ角度"] =
                        this["チーズ角度"] - (this["角度合計"] - 360));
                    }),
                  )
                  ["なら"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["角度合計"] < 360;
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["チーズ角度"] =
                        this["チーズ角度"] + (360 - this["角度合計"]));
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["割合合計"] > 100;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["prop"] =
                        this["prop"] - (this["割合合計"] - 100));
                    }),
                  )
                  ["なら"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["割合合計"] < 100;
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["prop"] =
                        this["prop"] + (100 - this["割合合計"]));
                    }),
                  );
                return (this["prop"] = (this["prop"] * 10).round() / 10);
              }),
            );
          this["ペン"]["ペンなし"]()["位置"](0, 0);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["チーズ角度"] !== 0;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["チーズ"] = dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  this["ペン"]
                    ["ペンあり"]()
                    ["線の太さ"](1)
                    ["位置"](
                      this["r"] * this["x"].cos(),
                      this["r"] * this["x"].sin(),
                    );
                  this["x"] = this["x"] + 1;
                  this["long"] = this["long"] + 1;
                  return this["ペン"];
                })
                  ["繰り返す"](this["チーズ角度"])
                  ["位置"](0, 0)
                  ["図形を作る"](this["col"]);
                this["チーズ"]["位置"](this["_原点x"], this["_原点y"]);
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["long"] >= 20;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["ラベル"]
                        ["作る"](this["prop"] + "%")
                        ["位置"](
                          this["_原点x"] +
                            (this["r"] / 3) *
                              2 *
                              (this["x"] - this["long"] / 2).cos() -
                            5,
                          this["_原点y"] +
                            (this["r"] / 3) *
                              2 *
                              (this["x"] - this["long"] / 2).sin(),
                        )
                        ["文字サイズ"](this["_軸ラベルサイズ"] - 4);
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      this["ラベル"]
                        ["作る"](this["prop"] + "%")
                        ["位置"](
                          this["_原点x"] +
                            (this["r"] / 4) *
                              5 *
                              (this["x"] - this["long"] / 2).cos() -
                            5,
                          this["_原点y"] +
                            (this["r"] / 4) *
                              5 *
                              (this["x"] - this["long"] / 2).sin(),
                        )
                        ["文字サイズ"](this["_軸ラベルサイズ"] - 5);
                      return this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["r"] / 4) *
                              5 *
                              (this["x"] - this["long"] / 2).cos() +
                            5,
                          this["_原点y"] +
                            (this["r"] / 4) *
                              5 *
                              (this["x"] - this["long"] / 2).sin() -
                            25,
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["_原点x"] +
                            this["r"] * (this["x"] - this["long"] / 2).cos(),
                          this["_原点y"] +
                            this["r"] * (this["x"] - this["long"] / 2).sin(),
                        )
                        ["図形を作る"](this["黒"]);
                    }),
                  );
                this["ペン"]
                  ["ペンなし"]()
                  ["位置"](
                    this["_原点x"] + this["x_pos"],
                    this["_原点y"] + this["y_pos"],
                  )
                  ["ペンあり"]()
                  ["角形"](10, 4)
                  ["図形を作る"](this["col"]);
                this["A"] = this["ラベル"]
                  ["作る"](this["D_f1"]["データ"]["読む"](j))
                  ["位置"](
                    this["_原点x"] + this["x_pos"] + 15,
                    this["_原点y"] + this["y_pos"] + 3,
                  )
                  ["文字サイズ"](this["_軸ラベルサイズ"]);
                this["ラベル"]
                  ["作る"]("　　" + this["d_arr"]["読む"](j) + "件")
                  ["位置"](
                    this["_原点x"] + this["x_pos"] + 15 + this["A"]["幅?"](),
                    this["_原点y"] + this["y_pos"] + 3,
                  )
                  ["文字サイズ"](this["_軸ラベルサイズ"]);
                this["y_pos"] = this["y_pos"] + 20;
                this["sum_length"] =
                  (this["D_f1"]["データ"]["読む"](j) + "")["長さ?"]() +
                  ("  " + this["d_arr"]["読む"](j) + "件")["長さ?"]();
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["max_length"] < this["sum_length"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["max_length"] = this["sum_length"]);
                    }),
                  );
              }),
            );
        }),
      );
      this["_右端"] = this["_原点x"] + this["x_pos"] + 15 * this["max_length"];
      this["テーブル"]["x"] = this["_右端"];
      this["ラベル"]["作る"]("　")["位置"](this["_右端"], 0);
      this["ペン"]["消える"]();
      return this;
    });
    this["グラフ"]["個体番号"] = this["グラフ"]["個体番号"] + 1;
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["どれか"]["本当"](
        f2 === this["undef"],
        this["_円グラフ"]["_DATA"] === this["undef"],
      );
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["check_fn"](this["_円グラフ"]["f2"]);
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["射影"](this["_円グラフ"]["f2"])["check_dt"]();
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      this["グラフ"]["個体番号"] =
                        this["グラフ"]["個体番号"] + 1;
                      return this["_円グラフ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["undef"];
                    }),
                  );
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["undef"];
              }),
            );
        }),
      );
  });
  this["テーブル"]["horizonal_bar_graph"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var 補正;
    this["_帯グラフ"] = this["グラフ"]["作る"]();
    this["_帯グラフ"]["_DATA"] = this;
    this["_帯グラフ"]["f1"] = this["フィールド名"]["読む"](1);
    this["_帯グラフ"]["joint_pos"] = this["配列"]["作る"]();
    this["_帯グラフ"]["f2"] = this["getarg"](_rest);
    this["_帯グラフ"]["_方向"] = "帯";
    this["_帯グラフ"]["描画"] = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      var 系列長;
      var kxpos;
      this["位置確定"]();
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["f2"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["tmp"] = this["_DATA"]["フィールド名"]["concat"]();
            return (this["f2"] = this["tmp"]["位置で消す"](1));
          }),
        );
      this["型配列"] = this["型判定"](this["_DATA"]);
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["型配列"]["要素数?"]() > 0;
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["型配列"]["それぞれ実行"](
              dtlbind(this, function (n) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return (this["f2"] = this["f2"]["消す"](n));
              }),
            );
          }),
        );
      this["data_x"] = this["_DATA"]["射影"](this["f1"]);
      this["フィールド数"] = this["f2"]["要素数?"]();
      this["系列数"] = this["data_x"]["データ"]["要素数?"]();
      this["ペン"] = this["タートル"]["作る"]()["線の太さ"](1);
      this["横の位置配列"] = this["配列"]["作る"]();
      this["注釈フラグ"] = this["false"];
      this["描画用データ"] = this["_DATA"]["行列入れ替え"](
        this["f2"]["挿入"](1, this["f1"]),
      );
      this["f2"]["位置で消す"](1);
      this["横幅設定"](this["フィールド数"]);
      this["メモリ線描画"](this["フィールド数"]);
      this["_プロット幅"] = this["_プロット幅"];
      this["ペン"]
        ["ぺんなし"]()
        ["位置"](this["_原点x"], this["_原点y"] + this["_間隔"]);
      this["ラベルx"] = this["_原点x"] - 10;
      this["ラベルy"] =
        this["_原点y"] + (this["_間隔"] + this["_プロット幅"] / 2 + 5);
      dtlbind(this, function (j) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        this["data_y"] = this["描画用データ"]["射影"](
          this["data_x"]["読む"](j) + "",
        );
        this["割合合計"] = 0;
        dtlbind(this, function (i) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 1);
          var n;
          this["合計"] = this["_DATA"]
            ["合計値"](this["f2"]["読む"](i))
            ["数にする"]();
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return j === 1;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["横の位置配列"]["書く"](this["_原点y"]);
              }),
            );
          n = this["data_y"]["データ"]["読む"](i);
          this["val"] = this["f2"]["読む"](i);
          this["メモリ調整"] = (this["val"] + "")["長さ?"]() * 12;
          this["割合"] = ((n / this["合計"]) * 1000).round() / 10;
          this["割合合計"] = this["割合合計"] + this["割合"];
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return j === this["系列数"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["割合合計"] !== 100;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["注釈フラグ"] = this["true"]);
                    }),
                  );
              }),
            );
          this["ペン"]
            ["ペンなし"]()
            ["移動する"](this["横の位置配列"]["読む"](i), 0);
          this["ペン"]
            ["ペンあり"]()
            ["歩く"](5 * this["割合"])
            ["左回り"](90)
            ["歩く"](this["_プロット幅"])
            ["左回り"](90)
            ["歩く"](5 * this["割合"])
            ["左回り"](180)
            ["図形にする"](this["着色"](j));
          this["ペン"]["ペンなし"]()["移動する"](0, this["_間隔"]);
          this["ペン"]
            ["ペンなし"]()
            ["移動する"](-1 * this["横の位置配列"]["読む"](i), 0);
          this["ラベル"]
            ["作る"](this["割合"] + "%")
            ["位置"](
              this["_原点x"] +
                this["横の位置配列"]["読む"](i) +
                (this["割合"] * 5) / 2 -
                10,
              this["_原点y"] +
                (this["_間隔"] + this["_プロット幅"]) * i -
                this["_プロット幅"] / 2 +
                5,
            )
            ["文字サイズ"](this["_軸ラベルサイズ"] - 3);
          this["横の位置配列"]["上書き"](
            i,
            this["横の位置配列"]["読む"](i) + this["割合"] * 5,
          );
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return j === 1;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["ラベル"]
                  ["作る"](this["val"])
                  ["文字サイズ"](this["_軸ラベルサイズ"])
                  ["位置"](
                    this["ラベルx"] - this["メモリ調整"],
                    this["ラベルy"],
                  );
                this["ラベルy"] =
                  this["ラベルy"] + (this["_間隔"] + this["_プロット幅"]);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (
                    this["_左端"] >= this["ラベルx"] - this["メモリ調整"] - 30
                  );
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["_左端"] =
                        this["ラベルx"] - this["メモリ調整"] - 30);
                    }),
                  );
              }),
            );
        })["繰り返す"](this["フィールド数"]);
        this["横の位置配列"]["それぞれ実行"](
          dtlbind(this, function (n, i) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 2);
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return i === 1;
            })
              ["なら"]()
              ["そうでなければ"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["ペン"]
                    ["ペンなし"]()
                    [
                      "位置"
                    ](this["_原点x"] + n, this["_原点y"] + this["_間隔"] + this["_プロット幅"]);
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  this["ペン"]
                    ["ペンあり"]()
                    [
                      "位置"
                    ](this["_原点x"] + n, this["_原点y"] + (this["_間隔"] + this["_プロット幅"]) * i - this["_プロット幅"]);
                  return this["ペン"]
                    ["ペンなし"]()
                    ["移動する"](0, this["_プロット幅"]);
                }),
              );
          }),
        );
        return this["ペン"]
          ["ぺんなし"]()
          ["位置"](this["_原点x"], this["_原点y"] + this["_間隔"]);
      })["繰り返す"](this["系列数"]);
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["系列数"] > 1;
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["ペン"]["ペンなし"]()["位置"](this["_原点x"], this["_底"] - 5);
            this["系列ラベルx"] = this["_原点x"] + 10;
            this["系列ラベルy"] = this["_底"];
            dtlbind(this, function (i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              this["系列名"] = this["data_x"]["読む"](i);
              this["系列名長"] = (this["系列名"] + "")["長さ?"]();
              this["ペン"]
                ["ペンあり"]()
                ["角形"](6, 4)
                ["図形を作る"](this["着色"](i));
              this["a"] = this["ラベル"]
                ["作る"](this["系列名"])
                ["位置"](this["系列ラベルx"], this["系列ラベルy"])
                ["文字サイズ"](this["_軸ラベルサイズ"] - 2);
              this["ペン"]
                ["ペンなし"]()
                ["移動する"](this["系列名長"] * 10 + 16, 0);
              return (this["系列ラベルx"] =
                this["系列ラベルx"] + (this["系列名長"] * 10 + 16));
            })["繰り返す"](this["系列数"]);
            return (this["_底"] = this["_底"] - 20);
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["注釈フラグ"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["ラベル"]
              ["作る"](
                "※計算の都合上割合の合計が100%になっていないものがあります。",
              )
              ["文字サイズ"](this["_軸ラベルサイズ"] - 2)
              ["位置"](this["_原点x"], this["_底"]);
            return (this["_底"] = this["_底"] - 20);
          }),
        );
      this["ペン"]["消える"]();
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["_横軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["横軸タイトル"](this["f1"]);
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["_縦軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["縦軸タイトル"]("value");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["ラベル"]["作る"]("　")["位置"](this["_右端"], 0);
      this["テーブル"]["x"] = this["_右端"];
      return this;
    });
    this["グラフ"]["個体番号"] = this["グラフ"]["個体番号"] + 1;
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["_帯グラフ"]["f2"] === this["undef"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_帯グラフ"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["全部"]["本当"](
              this["check_fn"](this["_帯グラフ"]["f2"]),
              this["_帯グラフ"]["_DATA"] !== this["undef"],
            );
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_帯グラフ"]["_DATA"]
                    ["射影"](this["_帯グラフ"]["f2"]["読む"](1))
                    ["check_dt"]();
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_帯グラフ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["undef"];
                    }),
                  );
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["undef"];
              }),
            );
        }),
      );
  });
  this["テーブル"]["scatter_plot"] = dtlbind(this, function (f1, f2, flag) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 3);
    this["_散布図"] = this["グラフ"]["作る"]();
    this["_散布図"]["_DATA"] = this;
    this["_散布図"]["f1"] = f1;
    this["_散布図"]["f2"] = f2;
    this["_散布図"]["_方向"] = "散布図";
    this["_散布図"]["_グリッド線なし"] = this["false"];
    this["_散布図"]["_横幅"] = 300;
    this["_散布図"]["_縦幅"] = 300;
    this["_散布図"]["_天井"] = this["_散布図"]["_原点y"] + 330;
    this["_散布図"]["_右端"] = this["_散布図"]["_原点x"] + 330;
    this["_散布図"]["描画"] = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["グラフ"]["_原点x"] === this["_原点x"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["位置確定"]();
          }),
        );
      this["ペン"] = this["タートル"]["作る"]();
      this["data_x"] = this["_DATA"]["射影"](f1);
      this["data_y"] = this["_DATA"]["射影"](f2);
      this["_DACOLX"] = this["データ補正値計算"](
        this["data_x"]["データ"],
        this["_横幅"],
      );
      this["_scalex"] = this["_scale"];
      this["_段数x"] = this["_段数"];
      this["_桁x"] = this["_digit"];
      this["_最大メモリ"] = this["undef"];
      this["_最小メモリ"] = this["undef"];
      this["_DACOLY"] = this["データ補正値計算"](
        this["data_y"]["データ"],
        this["_縦幅"],
      );
      this["_scaley"] = this["_scale"];
      this["_段数y"] = this["_段数"];
      this["_桁y"] = this["_digit"];
      this["メモリ線描画"]();
      this["data_x"]["データ"]["それぞれ実行"](
        dtlbind(this, function (val, cnt) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 2);
          return this["ペン"]
            ["ペンなし"]()
            ["位置"](
              this["_原点x"] + val * this["_DACOLX"],
              this["data_y"]["データ"]["読む"](cnt) * this["_DACOLY"] +
                this["_原点y"] +
                3,
            )
            ["ペンあり"]()
            ["角形"](4, 6)
            ["図形を作る"](this["赤"]);
        }),
      );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["横軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["横軸タイトル"](f1);
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["縦軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["縦軸タイトル"](f2);
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["ペン"]["消える"]();
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["_近似"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["最小二乗法"]();
            return (this["_近似"] = this["false"]);
          }),
        );
      this["ラベル"]["作る"]("　")["位置"](this["_右端"], 0);
      this["テーブル"]["x"] = this["_右端"];
      return this;
    });
    this["グラフ"]["個体番号"] = this["グラフ"]["個体番号"] + 1;
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["どれか"]["本当"](
        this["_散布図"]["f1"] === this["undef"],
        this["_散布図"]["f2"] === this["undef"],
      );
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["全部"]["本当"](
              this["check_fn"](this["_散布図"]["f1"]),
              this["check_fn"](this["_散布図"]["f2"]),
            );
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["全部"]["本当"](
                    this["_散布図"]["_DATA"]
                      ["射影"](this["_散布図"]["f1"])
                      ["check_dt"](),
                    this["_散布図"]["_DATA"]
                      ["射影"](this["_散布図"]["f2"])
                      ["check_dt"](),
                  );
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_散布図"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["undef"];
                    }),
                  );
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["undef"];
              }),
            );
        }),
      );
  });
  return (this["テーブル"]["box_plot"] = dtlbind(this, function (f1, f2) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    this["_箱ひげ図"] = this["グラフ"]["作る"]();
    this["_箱ひげ図"]["_DATA"] = this;
    this["_箱ひげ図"]["f1"] = f1;
    this["_箱ひげ図"]["f2"] = f2;
    this["_箱ひげ図"]["描画"] = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      this["位置確定"]();
      this["data_x"] = this["_DATA"]["内部_重複なし"](f1);
      this["f1_num"] = 0;
      this["f2_num"] = 0;
      this["data_y"] = this["_DATA"]["射影"](f2);
      this["要素数"] = this["data_x"]["データ"]["要素数?"]();
      this["プロット数"] = this["data_y"]["データ"]["要素数?"]();
      this["横幅設定"](this["要素数"]);
      this["縦幅設定"](this["data_y"]);
      this["メモリ線描画"](this["要素数"]);
      dtlbind(this, function (番号) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_DATA"]["フィールド名"]["読む"](番号) === f1;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["f1_num"] = 番号);
            }),
          )
          ["なら"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_DATA"]["フィールド名"]["読む"](番号) === f2;
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["f2_num"] = 番号);
            }),
          );
      })["繰り返す"](this["_DATA"]["フィールド名"]["要素数?"]());
      this["ペン"] = this["タートル"]["作る"]()["線の太さ"](1);
      this["data_x"]["データ"]["それぞれ実行"](
        dtlbind(this, function (f, cnt) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 2);
          this["tmp"] = this["_DATA"]["レコード取り出し"](f, this["f1_num"]);
          this["tmp2"] = this["tmp"]["射影"](f2);
          this["tmp3"] = this["tmp"]["射影"](f2);
          this["qua3"] = this["tmp"]["第3四分位数"](f2)["値読み出し"]();
          this["qua2"] = this["tmp"]["中央値"](f2)["値読み出し"]();
          this["qua1"] = this["tmp"]["第1四分位数"](f2)["値読み出し"]();
          this["ave"] = this["tmp"]["平均値"](f2)["値読み出し"]();
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["qua1"] !== this["undef"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["IRQ"] = this["qua3"] - this["qua1"];
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_方向"] === "縦";
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      this["tmp2"]["データ"]["それぞれ実行"](
                        dtlbind(this, function (n, i) {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 2);
                          return dtlbind(this, function () {
                            var self = this;
                            var 自分 = self;
                            var _rest = Array.prototype.slice.call(
                              arguments,
                              0,
                            );
                            return this["どれか"]["本当"](
                              n > this["qua3"] + this["IRQ"] * 1.5,
                              n < this["qua1"] - this["IRQ"] * 1.5,
                            );
                          })
                            ["なら"]()
                            ["実行"](
                              dtlbind(this, function () {
                                var self = this;
                                var 自分 = self;
                                var _rest = Array.prototype.slice.call(
                                  arguments,
                                  0,
                                );
                                dtlbind(this, function () {
                                  var self = this;
                                  var 自分 = self;
                                  var _rest = Array.prototype.slice.call(
                                    arguments,
                                    0,
                                  );
                                  return this["_範囲指定"];
                                })
                                  ["なら"]()
                                  ["そうでなければ"](
                                    dtlbind(this, function () {
                                      var self = this;
                                      var 自分 = self;
                                      var _rest = Array.prototype.slice.call(
                                        arguments,
                                        0,
                                      );
                                      return this["ペン"]
                                        ["ペンなし"]()
                                        ["位置"](
                                          this["_原点x"] +
                                            (this["_間隔"] +
                                              this["_プロット幅"]) *
                                              cnt -
                                            this["_プロット幅"] +
                                            this["_プロット幅"] / 2,
                                          this["_原点y"] +
                                            (n - this["_最小メモリ"]) *
                                              this["_DACOL"],
                                        )
                                        ["ぺんあり"]()
                                        ["円"](3);
                                    }),
                                  )
                                  ["実行"](
                                    dtlbind(this, function () {
                                      var self = this;
                                      var 自分 = self;
                                      var _rest = Array.prototype.slice.call(
                                        arguments,
                                        0,
                                      );
                                      return this["ペン"]
                                        ["ペンなし"]()
                                        ["位置"](
                                          this["_原点x"] +
                                            (this["_間隔"] +
                                              this["_プロット幅"]) *
                                              cnt -
                                            this["_プロット幅"] +
                                            this["_プロット幅"] / 2,
                                          this["_原点y"] + n * this["_DACOL"],
                                        )
                                        ["ぺんあり"]()
                                        ["円"](3);
                                    }),
                                  );
                                return this["tmp3"]["データ"]["消す"](n);
                              }),
                            );
                        }),
                      );
                      this["max"] = this["tmp3"]["最大値"](f2)["値読み出し"]();
                      this["min"] = this["tmp3"]["最小値"](f2)["値読み出し"]();
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["_範囲指定"];
                      })
                        ["なら"]()
                        ["実行"](
                          dtlbind(this, function () {
                            var self = this;
                            var 自分 = self;
                            var _rest = Array.prototype.slice.call(
                              arguments,
                              0,
                            );
                            this["qua3"] = this["qua3"] - this["_最小メモリ"];
                            this["qua2"] = this["qua2"] - this["_最小メモリ"];
                            this["qua1"] = this["qua1"] - this["_最小メモリ"];
                            this["ave"] = this["ave"] - this["_最小メモリ"];
                            this["min"] = this["min"] - this["_最小メモリ"];
                            return (this["max"] =
                              this["max"] - this["_最小メモリ"]);
                          }),
                        );
                      this["ペン"]
                        ["ぺんなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2 -
                            20 / (2).sqrt() / 2,
                          this["_原点y"] +
                            this["ave"] * this["_DACOL"] +
                            20 / (2).sqrt() / 2,
                        )
                        ["右回り"](45)
                        ["ぺんあり"]()
                        ["歩く"](20)
                        ["ペンなし"]()
                        ["位置"]()
                        ["左回り"](45);
                      this["ペン"]
                        ["ぺんなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2 -
                            20 / (2).sqrt() / 2,
                          this["_原点y"] +
                            this["ave"] * this["_DACOL"] -
                            20 / (2).sqrt() / 2,
                        )
                        ["左回り"](45)
                        ["ぺんあり"]()
                        ["歩く"](20)
                        ["ペンなし"]()
                        ["位置"]()
                        ["右回り"](45);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                          this["_原点y"] + this["max"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                          this["_原点y"] + this["qua3"] * this["_DACOL"],
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                          this["_原点y"] + this["qua1"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                          this["_原点y"] + this["min"] * this["_DACOL"],
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["_原点y"] + this["qua3"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["_原点y"] + this["qua1"] * this["_DACOL"],
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt,
                          this["_原点y"] + this["qua3"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt,
                          this["_原点y"] + this["qua1"] * this["_DACOL"],
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["_原点y"] + this["qua3"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["_原点y"] + this["qua2"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["_原点y"] + this["qua1"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["_原点y"] + this["max"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["_原点y"] + this["min"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"])
                        ["ペンなし"]();
                      this["プロット"] = this["ペン"]["図形にする"]();
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return cnt === 1;
                      })
                        ["なら"]()
                        ["実行"](
                          dtlbind(this, function () {
                            var self = this;
                            var 自分 = self;
                            var _rest = Array.prototype.slice.call(
                              arguments,
                              0,
                            );
                            this["data_x"]["データ"]["それぞれ実行"](
                              dtlbind(this, function (n, i) {
                                var self = this;
                                var 自分 = self;
                                var _rest = Array.prototype.slice.call(
                                  arguments,
                                  2,
                                );
                                this["長"] = (n + "")["長さ?"]();
                                this["調整"] = 0;
                                dtlbind(this, function () {
                                  var self = this;
                                  var 自分 = self;
                                  var _rest = Array.prototype.slice.call(
                                    arguments,
                                    0,
                                  );
                                  return this["長"] < 3;
                                })
                                  ["なら"]()
                                  ["そうでなければ"](
                                    dtlbind(this, function () {
                                      var self = this;
                                      var 自分 = self;
                                      var _rest = Array.prototype.slice.call(
                                        arguments,
                                        0,
                                      );
                                      return (this["調整"] =
                                        (3 - this["長"]) * 5);
                                    }),
                                  )
                                  ["なら"](
                                    dtlbind(this, function () {
                                      var self = this;
                                      var 自分 = self;
                                      var _rest = Array.prototype.slice.call(
                                        arguments,
                                        0,
                                      );
                                      return this["長"] > 3;
                                    }),
                                  )
                                  ["実行"](
                                    dtlbind(this, function () {
                                      var self = this;
                                      var 自分 = self;
                                      var _rest = Array.prototype.slice.call(
                                        arguments,
                                        0,
                                      );
                                      return (this["調整"] =
                                        -(this["長"] - 3) * 2);
                                    }),
                                  );
                                return this["ラベル"]
                                  ["作る"](n)
                                  ["文字サイズ"](this["_軸ラベルサイズ"])
                                  ["位置"](
                                    this["_原点x"] +
                                      (this["_間隔"] + this["_プロット幅"]) *
                                        i -
                                      this["_プロット幅"] / 2 -
                                      this["長"] * 5,
                                    this["_原点y"] - 10,
                                  );
                              }),
                            );
                            return (this["_底"] = this["_底"] - 30);
                          }),
                        );
                    }),
                  )
                  ["なら"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_方向"] === "横";
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return cnt === 1;
                      })
                        ["なら"]()
                        ["実行"](
                          dtlbind(this, function () {
                            var self = this;
                            var 自分 = self;
                            var _rest = Array.prototype.slice.call(
                              arguments,
                              0,
                            );
                            return this["ペン"]["左回り"](90);
                          }),
                        );
                      this["tmp2"]["データ"]["それぞれ実行"](
                        dtlbind(this, function (n, i) {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 2);
                          return dtlbind(this, function () {
                            var self = this;
                            var 自分 = self;
                            var _rest = Array.prototype.slice.call(
                              arguments,
                              0,
                            );
                            return this["どれか"]["本当"](
                              n > this["qua3"] + this["IRQ"] * 1.5,
                              n < this["qua1"] - this["IRQ"] * 1.5,
                            );
                          })
                            ["なら"]()
                            ["実行"](
                              dtlbind(this, function () {
                                var self = this;
                                var 自分 = self;
                                var _rest = Array.prototype.slice.call(
                                  arguments,
                                  0,
                                );
                                this["ペン"]
                                  ["ペンなし"]()
                                  ["位置"](
                                    this["_原点x"] + n * this["_DACOL"],
                                    this["_原点y"] +
                                      (this["_間隔"] + this["_プロット幅"]) *
                                        cnt -
                                      this["_プロット幅"] +
                                      this["_プロット幅"] / 2,
                                  )
                                  ["ぺんあり"]()
                                  ["円"](3);
                                return this["tmp3"]["データ"]["消す"](n);
                              }),
                            );
                        }),
                      );
                      this["max"] = this["tmp3"]["最大値"](f2)["値読み出し"]();
                      this["min"] = this["tmp3"]["最小値"](f2)["値読み出し"]();
                      this["ペン"]
                        ["ぺんなし"]()
                        ["位置"](
                          this["_原点x"] +
                            this["ave"] * this["_DACOL"] -
                            20 / (2).sqrt() / 2,
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2 -
                            20 / (2).sqrt() / 2,
                        )
                        ["右回り"](45)
                        ["ぺんあり"]()
                        ["歩く"](20)
                        ["ペンなし"]()
                        ["位置"]()
                        ["左回り"](45);
                      this["ペン"]
                        ["ぺんなし"]()
                        ["位置"](
                          this["_原点x"] +
                            this["ave"] * this["_DACOL"] +
                            20 / (2).sqrt() / 2,
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2 -
                            20 / (2).sqrt() / 2,
                        )
                        ["左回り"](45)
                        ["ぺんあり"]()
                        ["歩く"](20)
                        ["ペンなし"]()
                        ["位置"]()
                        ["右回り"](45);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] + this["max"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["_原点x"] + this["qua3"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] + this["qua1"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["_原点x"] + this["min"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] + this["qua3"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["_原点x"] + this["qua1"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] + this["qua3"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt,
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["_原点x"] + this["qua1"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt,
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] + this["qua3"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] + this["qua2"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] + this["qua1"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] + this["max"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_原点x"] + this["min"] * this["_DACOL"],
                          this["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"])
                        ["ペンなし"]();
                      this["プロット"] = this["ペン"]["図形にする"]();
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return cnt === 1;
                      })
                        ["なら"]()
                        ["実行"](
                          dtlbind(this, function () {
                            var self = this;
                            var 自分 = self;
                            var _rest = Array.prototype.slice.call(
                              arguments,
                              0,
                            );
                            this["最長"] = 0;
                            this["data_x"]["データ"]["それぞれ実行"](
                              dtlbind(this, function (n, i) {
                                var self = this;
                                var 自分 = self;
                                var _rest = Array.prototype.slice.call(
                                  arguments,
                                  2,
                                );
                                this["長"] = (n + "")["長さ?"]();
                                dtlbind(this, function () {
                                  var self = this;
                                  var 自分 = self;
                                  var _rest = Array.prototype.slice.call(
                                    arguments,
                                    0,
                                  );
                                  return this["長"] > this["最長"];
                                })
                                  ["なら"]()
                                  ["実行"](
                                    dtlbind(this, function () {
                                      var self = this;
                                      var 自分 = self;
                                      var _rest = Array.prototype.slice.call(
                                        arguments,
                                        0,
                                      );
                                      return (this["最長"] = this["長"]);
                                    }),
                                  );
                                this["調整"] = 0;
                                dtlbind(this, function () {
                                  var self = this;
                                  var 自分 = self;
                                  var _rest = Array.prototype.slice.call(
                                    arguments,
                                    0,
                                  );
                                  return this["長"] < 3;
                                })
                                  ["なら"]()
                                  ["そうでなければ"](
                                    dtlbind(this, function () {
                                      var self = this;
                                      var 自分 = self;
                                      var _rest = Array.prototype.slice.call(
                                        arguments,
                                        0,
                                      );
                                      return (this["調整"] =
                                        (3 - this["長"]) * 5);
                                    }),
                                  )
                                  ["なら"](
                                    dtlbind(this, function () {
                                      var self = this;
                                      var 自分 = self;
                                      var _rest = Array.prototype.slice.call(
                                        arguments,
                                        0,
                                      );
                                      return this["長"] > 3;
                                    }),
                                  )
                                  ["実行"](
                                    dtlbind(this, function () {
                                      var self = this;
                                      var 自分 = self;
                                      var _rest = Array.prototype.slice.call(
                                        arguments,
                                        0,
                                      );
                                      return (this["調整"] =
                                        -(this["長"] - 3) * 2);
                                    }),
                                  );
                                return this["ラベル"]
                                  ["作る"](n)
                                  ["文字サイズ"](this["_軸ラベルサイズ"])
                                  ["位置"](
                                    this["_原点x"] -
                                      20 +
                                      this["長"] -
                                      this["長"] * 10,
                                    this["_原点y"] +
                                      (this["_間隔"] + this["_プロット幅"]) *
                                        i -
                                      this["_プロット幅"] / 2 +
                                      10,
                                  );
                              }),
                            );
                            return (this["_左端"] =
                              this["_左端"] - this["最長"] * 15);
                          }),
                        );
                    }),
                  );
              }),
            );
        }),
      );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["横軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["横軸タイトル"]("item");
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["縦軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["縦軸タイトル"]("value");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["ラベル"]["作る"]("　")["位置"](this["_右端"], 0);
      this["ペン"]["図形にする"]();
      this["ペン"]["消える"]();
      return this;
    });
    this["グラフ"]["個体番号"] = this["グラフ"]["個体番号"] + 1;
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["どれか"]["本当"](
        this["_箱ひげ図"]["f1"] === this["undef"],
        this["_箱ひげ図"]["f2"] === this["undef"],
      );
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["undef"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["全部"]["本当"](
              this["check_fn"](this["_箱ひげ図"]["f1"]),
              this["check_fn"](this["_箱ひげ図"]["f2"]),
            );
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_箱ひげ図"]["_DATA"]
                    ["射影"](this["_箱ひげ図"]["f2"])
                    ["check_dt"]();
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_箱ひげ図"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["undef"];
                    }),
                  );
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["undef"];
              }),
            );
        }),
      );
  }));
})
  .checkerror()
  .apply(root, []);

/*
// Dolittle_english
//データ分析機能の定義
//統計関数
テーブル：max＝「|;ret f１  f1_arr max args arg_num|
    args=自分!(_rest) getarg。
	「args==undef」!なら「
		args=自分!_引数設定。
	」実行。
	
    「自分!(args) "common" check_arg」!なら「
	　　　　　ret=テーブル!作る。
	　　　　　args!「| n i|
           ret:フィールド名!(n+"_max") 書く。
           f1_arr=自分!(n) 射影。
           f1_arr：データ!"" 消す。
           max=f1_arr：データ!最大。
           ret!(max) 書く。
           max=f1_arr：データ!最大。
           ret。
		 」それぞれ実行。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：min＝「|;ret f1_arr min args arg_num|
    args=自分!(_rest) getarg。
	「args==undef」!なら「
		args=自分!_引数設定。
	」実行。
	
    「自分!(args) "common" check_arg」!なら「
	　　　　　ret=テーブル!作る。
	　　　　　args!「| n i|
           ret:フィールド名!(n+"_min") 書く。
           f1_arr=自分!(n) 射影。
           f1_arr：データ!"" 消す。
           min=f1_arr：データ!最小。
           ret!(min) 書く。
           ret。
		」それぞれ実行。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：mean＝「| ;freq_arr max_rec args arg_num|
    args=自分!(_rest) getarg。
    「自分!(args) "common1" check_arg」!なら「
        f1=args!1  読む。
        freq_arr=自分！(f1) 度数。
        max=freq_arr!"度数" 最大値 数にする。
        
        max_rec=freq_arr！(max) 2 レコード取り出し。
        ret=テーブル！((f1)+"_mean") "度数" 作る。
        max_rec：データ！「| val cnt |
            ret!(val) 書く。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：sum＝「|;args f1 ret sum  |
    args=自分!(_rest) getarg。
	「args==undef」!なら「
		args=自分!_引数設定。
	」実行。
	
    「自分!(args) "common" check_arg」!なら「
	　　　　　ret=テーブル!作る。
	　　　　　args!「| n i |
        フィールド番号=自分！(ｎ) フィールド番号取得。
        ret:フィールド名！(n+"_sum") 書く。
        sum=0。
        「フィールド番号！=undef」！なら「
            「|i|
                「(自分：データ！(フィールド番号+(i-1)*(フィールド名!要素数?)) 読む)!="NA"」!なら「
                    sum=sum+(自分：データ！(フィールド番号+(i-1)*(フィールド名!要素数?)) 読む) 。
                」実行。
            」！((自分：データ！要素数?)/要素数) 繰り返す。
            ret!(sum) 書く。
        」実行。
		」それぞれ実行。
    」そうでなければ「
        undef。
    」実行。
    ret。
」。

テーブル：average＝「| ; args f1 ret sum レコード数 フィールド番号|
    args=自分!(_rest) getarg。
	「args==undef」!なら「
		args=自分!_引数設定。
	」実行。
	
    「自分!(args) "common" check_arg」!なら「
	　　　　　ret=テーブル!作る。
	　　　　　args!「| n i |
        フィールド番号=自分！(n) フィールド番号取得。
        ret:フィールド名！(n+"_average") 書く。
        レコード数=(自分：データ！要素数?)/(フィールド名!要素数?)。
        sum=0。
        「フィールド番号！=undef」！なら「
            「|i|
                「(自分:データ！(フィールド番号+(i-1)*(フィールド名!要素数?)) 読む)==""」！なら「
                    レコード数=レコード数-1。
                」そうでなければ「
                    //sum=sum+(自分:データ！(フィールド番号+(i-1)*(フィールド名!要素数?)) 読む) 。
                    sum=sum+(:window!(自分:データ！(フィールド番号+(i-1)*(フィールド名!要素数?)) 読む) parseFloat)。
                」実行。
            」！((自分：データ！要素数?)/要素数) 繰り返す。
            ret!(sum/(レコード数)) 書く。
        」実行。
		」それぞれ実行。
    」そうでなければ「
        undef。
    」実行。
    ret。
」。

テーブル：deviation＝「| ;args f1  f1_arr dev_arr ret ave|
    args=自分!(_rest) getarg。
    「自分!(args) "qn1" check_arg」!なら「
        f1=args!1  読む。
        f1_arr=自分！(f1) 射影。
        f1_arr:データ=f1_arr:データ!""  消す。
        ave=f1_arr！(f1) 平均値 値読み出し。
        dev_arr=配列！作る。
        f1_arr:データ！「｜n｜
            「n!="NA"」!なら「
                dev_arr!(n-ave) 書く。
            」実行。
        」それぞれ実行。
        ret=テーブル！((f1)+"_deviation") 作る。
        dev_arr！「| val |
            ret!(val) 書く。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：dispersion＝「|;ret sum data_array ave dev disp args f1 |
    args=自分!(_rest) getarg。
    「自分!(args) "qn1" check_arg」!なら「
        f1=args!1  読む。
        data_array＝自分！(f1) 射影。
        data_array:データ=data_array:データ!"" 消す。
        sum=data_array！(f1) 合計値  値読み出し。
        ave=sum/(data_array:データ!要素数?)。
        dev=0.
        data_array:データ！「｜n｜
            dev = dev + (((n)-(ave))*((n)-(ave)))。
        」それぞれ実行。
        disp=0.
        disp = dev/(data_array：データ！要素数?)。
        ret=テーブル！((f1)+"_dispersion") 作る。
        ret!(disp) 書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：unbiased_dispersion＝「|;data_array sum 要素数 ave dev disp args f1|
    args=自分!(_rest) getarg。
    「自分!(args) "qn1" check_arg」!なら「
        f1=args!1  読む。
        data_array＝自分！(f1) 射影。
        data_array:データ=data_array:データ!"" 消す。
        sum=data_array！(f1) 合計値  値読み出し。
        要素数＝data_array：データ！要素数?。
        ave=sum/要素数。
        dev=0.
        data_array:データ！「｜n｜
            dev = dev + (((n)-(ave))*((n)-(ave)))。
        」それぞれ実行。
        disp=0.
        disp = (要素数/(要素数-1))*dev/要素数。
        ret=テーブル！((f1)+"_unbiased_dispersion") 作る。
        ret!(disp) 書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：covariance＝「|;args f1 f2 f1_dev_arr f2_dev_arr total ret cav args |
    args=自分!(_rest) getarg。
    「自分!(args) "qn2" check_arg」!なら「
        f1=args!1  読む。
        f2=args!2  読む。
        f1_dev_arr=自分！(f1) 偏差。  
        f2_dev_arr=自分！(f2) 偏差。
        total＝0。
        f1_dev_arr:データ！「| val cnt |
            total=total+(val*(f2_dev_arr：データ! (cnt) 読む))。
        」それぞれ実行。
        
        cav=total/(f1_dev_arr:データ!要素数?)。
        ret=テーブル！((f1)+"&"+(f2)+"_covariance") 作る。
        ret!(cav)  書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：unbiased_covariance＝「|;args f1 f2 f1_dev_arr f2_dev_arr 要素数 total cav ret|
    args=自分!(_rest) getarg。
    「自分!(args) "qn2" check_arg」!なら「
        f1=args!1  読む。
        f2=args!2  読む。
        f1_dev_arr=自分！(f1) 偏差。  
        f2_dev_arr=自分！(f2) 偏差。
        要素数＝f1_dev_arr：データ!要素数?。
        total＝0。
        f1_dev_arr:データ！「| val cnt |
            total=total+(val*(f2_dev_arr：データ! (cnt) 読む))。
        」それぞれ実行。
        
        cav=(要素数/(要素数-1))*(total/要素数)。
        ret=テーブル！((f1)+"&"+(f2)+"_unbiased_covariance") 作る。
        ret!(cav)  書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：correlation＝「|; f1 f2 tmp1 tmp2 cav st_dev1 st_dev2 cor ret |
    args=自分!(_rest) getarg。
    args2=args!concat。
    //args2=args!作る。
    「自分!(args) "qn" check_arg」!なら「
        f1=args!1  読む。
        f2=args!2  読む。
        tmp1 = 配列！作る。
        args!「| f1 |
            tmp2 = 配列！作る。
            args！「| f2 |
                cav=自分！(f1) (f2) 共分散 値読み出し。
                st_dev1=自分！(f1) 標準偏差 値読み出し。
                st_dev2=自分！(f2) 標準偏差 値読み出し。
                cor=cav/(st_dev1*st_dev2)。
                tmp2!(cor)  書く。
            」それぞれ実行。
            tmp1!(tmp2)  書く。
        」それぞれ実行。
        
        ret=テーブル！(args!1 "" 挿入) 作る。
        tmp1！「| f i |
            ret!(f!1 (args!(i+1)  読む) 挿入) 追加。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：unbiased_covariance＝「|;args f1 f2 f1_dev_arr f2_dev_arr 要素数 total cav ret|
    args=自分!(_rest) getarg。
    「自分!(args) "qn2" check_arg」!なら「
        f1=args!1  読む。
        f2=args!2  読む。
        f1_dev_arr=自分！(f1) 偏差。  
        f2_dev_arr=自分！(f2) 偏差。
        要素数＝f1_dev_arr：データ!要素数?。
        total＝0。
        f1_dev_arr:データ！「| val cnt |
            total=total+(val*(f2_dev_arr：データ! (cnt) 読む))。
        」それぞれ実行。
        
        cav=(要素数/(要素数-1))*(total/要素数)。
        ret=テーブル！((f1)+"&"+(f2)+"_unbiased_covariance") 作る。
        ret!(cav)  書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：_相関係数＝「|f1 f2; tmp1 tmp2 cav st_dev1 st_dev2 cor ret |
    cav=自分！(f1) (f2) 共分散 値読み出し。
    st_dev1=自分！(f1) 標準偏差 値読み出し。
    st_dev2=自分！(f2) 標準偏差 値読み出し。
    cor=cav/(st_dev1*st_dev2)。       
    cor。
」。

テーブル：partial_correltion＝「|; f1 f2 tmp1 tmp2 cav st_dev1 st_dev2 cor ret |
    args=自分!(_rest) getarg。
    args2=args!concat。
    //args2=args!作る。
    「自分!(args) "qn3" check_arg」!なら「
        f1=args!1  読む。
        f2=args!2  読む。
        f3=args!3  読む。
        cor1=自分!(f2) (f3)  _相関係数。
        cor2=自分!(f1) (f2)  _相関係数。
        cor3=自分!(f1) (f3)  _相関係数。
        
        cor2=0.706。
        cor3=0.870。
        cor1=0.302。
        
        r=(cor2-(cor1*cor3))/(sqrt(1-((cor1)! 2 pow))*sqrt(1-((cor3)! 2 pow)))。
        ret=テーブル！(ｆ１＋”&”+f2+"&"+f3+"_partial_correltion") 作る。
        ret!(r) 書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：standard_deviation＝「|;f1 disp sdev ret args|
    args=自分!(_rest) getarg。
    「自分!(args) "qn1" check_arg」!なら「
        f1=args!1  読む。
        disp=自分！(f1) 分散  値読み出し。
        sdev=sqrt(disp)。
        ret=テーブル！((f1)+"_standard_deviation") 作る。
        ret!(sdev) 書く。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：unbiased_standard_deviation＝「|;f1 disp sdev ret args|
    args=自分!(_rest) getarg。
    「自分!(args) "qn1" check_arg」!なら「
        f1=args!1  読む。
        disp=自分！(f1) 不偏分散  値読み出し。
        sdev=sqrt(disp)。
        ret=テーブル！((f1)+"_unbiased_standard_deviation") 作る。
        ret!(sdev) 書く。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：median＝「|;f1 data_arr 要素数 中心 median disp sdev ret args|
    args=自分!(_rest) getarg。
	「args==undef」!なら「
		args=自分!_引数設定。
	」実行。
	
    「自分!(args) "common" check_arg」!なら「
	　　　　　ret=テーブル!作る。
	　　　　　args!「| n i |
        data_arr＝自分！(n)  小さい順 (n) 射影。
        data_arr:データ=data_arr:データ!"" 消す。
        要素数=data_arr:データ!要素数?。
        ret:フィールド名！(n+"_median") 書く。
        「要素数!=0」!なら「
            中心=ceil(要素数/2)。
            「(要素数%2)==0」!なら「
                median=((data_arr:データ！(中心)  読む)+(data_arr！(中心+1) 読む))/2。
            」そうでなければ「
                median=data_arr:データ！(中心) 読む。
            」実行。
            ret!(median) 書く。
        」そうでなければ「
            ret!(undef) 書く。
        」実行。
		」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル:quantile1＝「|;args f1 data_arr 要素数  中心 data qua1 ret |
    args=自分!(_rest) getarg。
	「args==undef」!なら「
		args=自分!_引数設定。
	」実行。
	
    「自分!(args) "common" check_arg」!なら「
	　　　　　ret=テーブル!作る。
	　　　　　args!「| n i |
        data_arr＝自分！(n)  小さい順 (n) 射影。
        data_arr:データ=data_arr:データ!"" 消す。
        要素数=data_arr：データ!要素数?。
        中心=floor(要素数/2)。
        data=テーブル!(n) 作る。
        「|i|  data!(data_arr:データ!(i) 読む) 書く」!(中心)  繰り返す。
        qua1 = data! (n) 中央値  値読み出し。
        ret:フィールド名！((n)+"_quantile1") 書く。
        ret!(qua1)  書く。
		」それぞれ実行。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル:quantile3＝「|;args f1 data_arr 要素数  中心 data qua3 ret |
    args=自分!(_rest) getarg。
	「args==undef」!なら「
		args=自分!_引数設定。
	」実行。
	
    「自分!(args) "common" check_arg」!なら「
	　　　　　ret=テーブル!作る。
	　　　　　args!「| n i |
        data_arr＝自分！(n)  大きい順 (n) 射影。
        data_arr:データ=data_arr:データ!"" 消す。
        要素数=data_arr:データ!要素数?。
        中心=floor(要素数/2)。
        data=テーブル!(n) 作る。
        「|i|  data!(data_arr:データ!(i) 読む) 書く」!(中心)  繰り返す。
        qua3 = data! (n) 中央値  値読み出し。
        ret:フィールド名！(n+"_quantile3") 書く。
        ret!(qua3)  書く。
		」それぞれ実行。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：frequancy＝「|; args arg_num   キー達  値達  ret f1_arr 件数  |
    args=自分!(_rest) getarg。
    「自分!(args) "common1" check_arg」!なら「
        arg_num=args!要素数?。
        f1=args!1 読む。
        キー達＝配列！作る。
        値達=配列！作る。
        f1の番号＝0。
        f1_arr=自分!(f1) 射影。
        f1_arr：データ=f1_arr：データ!"" 消す。
        件数=f1_arr：データ!要素数?。
        階級=配列！作る。
        カウント=配列！作る。
        フィールド名要素数＝自分：フィールド名！要素数？。
        
        文字コード配列にする＝「｜str;ret｜
            ret=配列！作る。
            (str+"")!""分割「｜要素｜
                ret!(要素！文字コード)書く。
            」それぞれ実行。
            ret。
        」。
        文字列にする＝「｜文字コード配列;ret｜
            ret=""。
            文字コード配列！「｜要素｜
                ret＝（ret！（（要素）！コード文字）連結）。
            」それぞれ実行。
            ret。
        」。
        
        キー達：探す＝「｜キー；結果  ｜
            結果＝０。
            文字コード配列の比較＝「｜左  右｜
                (""+左)==(""+右)
            」。
            「｜番号｜
                「！（自分！（番号）読む）（キー）文字コード配列の比較」！なら「結果＝番号」実行。
            」！（自分！要素数？）繰り返す。
            結果。
        」。
        
        「｜番号｜
            「（フィールド名！（番号）読む）＝＝f1」！なら「
                f1の番号＝番号。
            」実行。
        」！（フィールド名要素数）繰り返す。
        
        「｜番号；値  キー番号｜
            「(自分：データ！（フィールド名要素数*(番号-1)+f1の番号）読む)!=""」！なら「
                値＝!(自分：データ！（フィールド名要素数*(番号-1)+f1の番号）読む)文字コード配列にする。  
                「（キー達！（値）探す）＝＝０」！なら「キー達！（値）書く。値達！０  書く。」実行。
                キー番号＝キー達！（値）探す。
                値達！（キー番号）（（値達！（キー番号）読む）＋１）上書き。
            」実行。
        」！（（自分：データ！要素数？）/（フィールド名要素数））繰り返す。
        
        ret=テーブル！(f1) "frequancy"  作る。
        「｜番号｜
            ret!(！(キー達！（番号）読む)文字列にする）書く。
            ret!（値達！（番号）読む）書く。
        」！（キー達！要素数？）繰り返す。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：frequancy_distribution＝「｜；ret args arg_num 件数 f1_arr min max 階級幅 f1 flag｜
    args=自分!(_rest) getarg。
    「自分!(args) "freq" check_arg」!なら「
        arg_num=args!要素数?。
        f1=args!1 読む。
        「(arg_num)>=2」!なら「階級幅=args!2  読む」実行。
        「(arg_num)>=3」!なら「min=args!3  読む」実行。
        「(arg_num)>=4」!なら「max=args!4  読む」実行。
        f1の番号=0。
        f1_arr=自分!(f1) 射影  。
        f1_arr:データ=f1_arr:データ!"" 消す。
        件数=f1_arr:データ!要素数?。
        階級=配列！作る。
        カウント=配列！作る。
        //「min==undef」！なら「min=f1_arr：データ!最小。」実行。
        //「max==undef」！なら「max=f1_arr：データ!最大。」実行。
        「min==undef」！なら「min=:window!(f1_arr：データ!最小) parseFloat。」実行。
        「max==undef」！なら「max=:window!(f1_arr：データ!最大) parseFloat。」実行。
        sum=max-min.
        「階級幅 == undef」!なら「
            階級数=ceil(log(件数)/log(2)+1)。
            //階級幅=ceil(sum/階級数)。
            階級幅=:window!(ceil(sum/階級数))parseFloat。
        」そうでなければ「
            階級数＝round(sum/階級幅)。
        」実行。
        ret=テーブル！"class" "frequancy"作る。
        「| n |
            階級!(配列! ((min+階級幅*(n-1)+"")!("~"+(min+階級幅*n)) 連結) 作る) 書く。
            (階級!(n) 読む)! 0 書く。
            「n==1」！なら「カウント!(min+階級幅*(n-1)) 書く。」そうでなければ「カウント!(min+階級幅*(n-1)) 書く。」実行。
        」！(階級数) 繰り返す。
        
        f1_arr：データ!「| n i |
            カウント！「| m j |
                「j==階級数」！なら「
                    「全部！((m <= n)) ((m+階級幅) >= n) 本当」!なら「
                        (階級！(j) 読む)! 2  (((階級！(j) 読む)! 2 読む)+1) 上書き。
                    」実行。  
                」そうでなければ「
                    「全部！((m <= n)) ((m+階級幅) > n) 本当」!なら「
                        (階級！(j) 読む)! 2  (((階級！(j) 読む)! 2 読む)+1) 上書き。
                    」実行。
                」実行。
            」それぞれ実行。
        」それぞれ実行。
        階級!「| n |
            n!「|val| ret!(val) 書く。」それぞれ実行。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：frequancy_tabele＝「| ; args arg_num f1 freq frec_sum frecdist_sum ret ｜
    args=自分!(_rest) getarg。
    「自分!(args) "freq" check_arg」!なら「
        arg_num=args!要素数?。
        f1=args!1 読む。
        「(arg_num)>=2」!なら「階級幅=args!2  読む」実行。
        「(arg_num)>=3」!なら「min=args!3  読む」実行。
        「(arg_num)>=4」!なら「max=args!4  読む」実行。
        freq=自分!(f1) (階級数) (min) (max) 度数分布。
        frec_sum=freq!"度数" 合計値  数にする。
        frecdist_sum=0。
        ret =  テーブル!"class" "frequancy" "proportion" 作る。
        freq:データ!「| n i |
            ret! (n) 書く。
            「i%2==0」!なら「
                ret!(n/frec_sum) 書く。
                frecdist_sum=frecdist_sum+(n/frec_sum)。
            」実行。
        」それぞれ実行。
        ret!"計"  書く。
        ret!(frec_sum) 書く。
        ret!(frecdist_sum)  書く。
        ret。
    」そうでなければ「
        f1= args!1 読む。
        ret=テーブル！(f1) "frequancy" "proportion" 作る。
        f_arr=自分!(f1) 度数 (f1)  射影。
        freq=自分!(f1) 度数 "度数"  射影。
        sum=0。
        freq：データ!「|n|
            sum=sum+n。
        」それぞれ実行。	  
        
        freq:データ！「|n i|
            ret!(f_arr：データ!(i) 読む) 書く。
            ret!(n)  書く。
            ret!(n/sum) 書く。
        」それぞれ実行。
        ret。
    」実行。
」。

テーブル：crosstab=「|;ret val cp tmp sum sum_array args arg_num |
    args=自分!(_rest) getarg。
    「自分!(args) "common2" check_arg」!なら「
        arg_num=args!要素数?。
        tmp = 配列！作る。
        args!「|n i|
            「i<=2」！なら「
                tmp!(自分！(n) 射影  重複なし) 書く。
            」実行。
        」それぞれ実行。
        カウント＝配列！作る。
        ((tmp!1 読む):データ)!「|n j|
            sum=0。
            カウント！(n) 書く。
            ((tmp!2 読む):データ)！「|m|
                「全部!(n!="") (m!="") 本当」!なら「
                    val=自分！(args!1 読む) (n) (args!2  読む) (m) 集計2 数にする。
                    カウント！(val) 書く。
                    sum=sum+val。
                」実行。
            」それぞれ実行。
        」それぞれ実行。
        ret=テーブル！"" 作る。
        ((tmp!2 読む):データ)!「|n i|
            「n!=""」!なら「
                ret:フィールド名!(n) 書く。
            」実行。
        」それぞれ実行。
        
        カウント！「|n i|
            ret!(n) 書く。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。


テーブル：crosstab_table=「|;ret  val cp tmp sum sum_array args arg_num|
    args=自分!(_rest) getarg。
    「自分!(args) "common2" check_arg」!なら「
        arg_num=args!要素数?。
        tmp = 配列！作る。
        args!「|n i|
            「i<=2」！なら「
                tmp!(自分！(n) 射影  重複なし) 書く。
            」実行。
        」それぞれ実行。
        カウント＝配列！作る。
        
        (tmp!1 読む)!「|n j|
            sum=0。
            カウント！(n) 書く。
            (tmp!2 読む)！「|m|
                「全部!(n!="") (m!="") 本当」!なら「
                    val=自分！(args!1 読む) (n) (args!2  読む) (m) 集計2 数にする。
                    カウント！(val) 書く。
                    sum=sum+val。
                」実行。
            」それぞれ実行。
            カウント！(sum) 書く。
        」それぞれ実行。
        
        ret=テーブル！"" 作る。
        (tmp!2 読む)!「|n i|
            「n!=""」!なら「
                ret:フィールド名!(n) 書く。
            」実行。
        」それぞれ実行。
        ret:フィールド名!"sum" 書く。
        
        カウント！「|n i|
            ret!(n) 書く。
        」それぞれ実行。
        
        sum_array=配列！"sum" 作る。
        sum=0。
        (tmp!2 読む)!「|n i|
            「n!=""」!なら「
                val = 自分！(args!2 読む) (n) 集計  数にする。
                sum_array!(val)  書く。
                sum=sum+val。
            」実行。
        」それぞれ実行。
        sum_array!(sum) 書く。
        ret!(sum_array) 追加。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

//graph
テーブル：bar_graph=「| |  
    _棒グラフ=グラフ！作る。
    _棒グラフ：種類="棒グラフ"。
    _棒グラフ:描画済みグラフ=配列!作る。
    _棒グラフ:_DATA=自分。
    _棒グラフ:f1 = 自分:フィールド名！1 読む。
    _棒グラフ:f2 = 自分!(_rest) getarg。
    _棒グラフ:描画=「
        自分！位置確定。
        型配列=自分!（_DATA）型判定。
        data_x = _DATA！（f1）射影。
        「f2==undef」!なら「
				f2=配列！作る。
				_DATA:フィールド名!「| n |
					f2!(n) 書く。
				」それぞれ実行。
				型配列!「|n|
					f2!(n) 消す。
				」それぞれ実行。
            f2!1 位置で消す。
        」実行。
		
		　　最大長=0。
		  data_x:データ!「| n i |
		  　　　　「((n+"")!長さ？) > 最大長」！なら「最大長=(n+"")!長さ？」実行。
		  」それぞれ実行。

        data_y=_DATA！（f2）射影。
        要素数=data_x:データ!要素数?。
		　　ラベル数=ceil(要素数/35)。
        自分! (要素数)横幅設定。 
        自分! (data_y) 縦幅設定。
        自分! (要素数) メモリ線描画。
        
        ペン＝タートル!作る 1 線の太さ  。
        系列数=f2!要素数?。
        もとのプロット幅 = 自分:_プロット幅。
        自分:_プロット幅 = 自分:_プロット幅/系列数。
        
        「自分：_方向=="縦"」!なら「
            
            ペン！  ぺんなし  (自分:_原点x+自分:_間隔) (自分:_原点y) 位置    ９０  左回り  ぺんあり。
            ラベルx=自分:_原点x+自分:_間隔+自分:もとのプロット幅/2。
            ラベルy=自分:_原点y-10。
            
            
            「| j |
                data_y=自分:_DATA!(f2!(j) 読む) 射影。 
                ラベルサイズ=「自分:_プロット幅 > 10」 !なら「10」そうでなければ「自分:_プロット幅」実行。
                data_y:データ!「|n i|
                    「自分:_範囲指定」！なら「				                  
                        「n >= 自分:_最大メモリ」！なら「
                            n=自分:_最大メモリ。
                        」そうでなければ「n <= 自分:_最小メモリ」なら「
                            n=自分:_最小メモリ。
                        」実行。
                    」実行。
                    「n >= 自分:_最小メモリ」!なら「
                        n=(n-自分:_起点メモリ)*(自分:_DACOL)。
                        ペン！ペンあり  (n) 歩く  90 右回り  (自分:_プロット幅) 歩く  90 右回り  (n) 歩く  180 右回り (自分!(j)  着色)  図形にする。  
                    」そうでなければ「
                        ペン！ (自分:_プロット幅) 0 移動する。
                    」実行。
                    ペン!ペンなし  (自分:_間隔+(系列数-1)*自分:_プロット幅) 0 移動する。
                    「j==1」！なら「
					　　　　　　　　　　「((i-1)%ラベル数)==0」！なら「
                        横軸ラベル=(data_x!(i) 読む)+""。
                        横軸ラベル長=(横軸ラベル+"")!長さ?。
						　　　　　　　　「(最大長*5) > 自分:_プロット幅」！なら「
								 　自分! (横軸ラベル) (ラベルx) (ラベルy) "" (最大長) 縦表示。
								」そうでなければ「
                        ラベル! (横軸ラベル) 作る  (自分：_軸ラベルサイズ)  文字サイズ  (ラベルx-横軸ラベル長*5/2) (ラベルy) 位置。
						　　　　　　　」実行。
                        ラベルx=ラベルx+自分:_間隔＊ラベル数+(系列数)*もとのプロット幅*ラベル数。
						　　　　　　」実行。
                    」実行。
                」それぞれ実行。
                「自分:_底 >= ラベルy」!なら「自分:_底=ラベルy-30」実行。
                ペン！  ぺんなし  (自分:_原点x+自分:_間隔+自分:_プロット幅*j) (自分:_原点y) 位置。
            」! (系列数) 繰り返す。
            自分:_底=自分:_底-15*最大長。
            
            
        」そうでなければ「自分：_方向=="横"」なら「
            
            ペン！  ぺんなし  (自分:_原点x) (自分:_原点y+自分:_間隔) 位置    ぺんあり。
            ラベルx=自分:_原点x-10。
			   //6はラベルの幅の半分
            ラベルy=自分:_原点y+(自分:_間隔+もとのプロット幅)-もとのプロット幅/2+6。
            
            「| j |
                data_y=自分:_DATA!(f2!(j) 読む) 射影。 
                
                data_y:データ!「|n i|
                    val=data_x!(i) 読む。
                    メモリ調整＝((val+"")!長さ?)*10。
                    「自分:_範囲指定」！なら「	
                        「n >= 自分:_最大メモリ」！なら「
                            n=自分:_最大メモリ。
                        」そうでなければ「n <= 自分:_最小メモリ」なら「
                            n=自分:_最小メモリ。
                        」実行。
                    」実行。
                    「n >= 自分:_最小メモリ」!なら「
                        n=(n-自分:_起点メモリ)*(自分:_DACOL)。
                        ペン！ペンあり  (n) 歩く  90 左回り  (自分:_プロット幅) 歩く  90 左回り  (n) 歩く  180 左回り (自分!(j)  着色)  図形にする。  
                    」そうでなければ「
                        ペン！ 0 (自分:_プロット幅) 移動する。
                    」実行。
                    ペン!ペンなし  0 (自分:_間隔+(系列数-1)*自分:_プロット幅) 移動する。
                    
                    「j==1」！なら「
					　　　　　　　　　　「((i-1)%ラベル数)==0」！なら「
                        ラベル! (val) 作る  (自分：_軸ラベルサイズ-2)  文字サイズ  (ラベルx-メモリ調整) (ラベルy) 位置。
                        ラベルy=ラベルy+(自分:_間隔+もとのプロット幅)*ラベル数。
                        「自分:_左端 >= (ラベルx-メモリ調整-30)」!なら「
                            自分:_左端=ラベルx-メモリ調整  -30。
                        」実行。
						　　　　　　」実行。
                    」実行。
                」それぞれ実行。
                ペン！  ぺんなし  (自分:_原点x) (自分:_原点y+自分:_間隔+自分:_プロット幅*j)  位置。
            」! (系列数) 繰り返す。
            
        」実行。
        
        「系列数 > 1」！なら「
            「自分:_方向=="横"」！なら「
                ペン!ペンなし (自分:_原点x) (自分:_底-5) 位置。
            」そうでなければ「
                ペン!ペンなし (自分:_原点x) (自分:_底-10) 位置。
            」実行。
            系列ラベルx =  自分:_原点x+10。 
            系列ラベルy = 自分:_底。
            「|i|
                系列名=f2!(i)  読む。
                系列名長=(系列名+"")!長さ？。
                ペン！ペンあり 6 4 角形  (自分!(i)  着色)  図形を作る。
                a=ラベル!  (系列名)  作る  （系列ラベルx） (系列ラベルy)  位置 (自分：_軸ラベルサイズ-2) 文字サイズ。
                ペン!ペンなし  (系列名長*１0+16)  0 移動する。
                系列ラベルx = 系列ラベルx+(系列名長*１0+16)。
            」!(系列数)  繰り返す。
            自分:_底＝自分:_底-20。
        」実行。
        
        ペン！消える。
        「自分:_横軸タイトル文==undef」！なら「
            自分！(f1) 横軸タイトル。
        」実行。
        「自分:_縦軸タイトル文==undef」！なら「
            自分！("value") 縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        ラベル!"　" 作る  (自分:_右端)  0 位置。
        テーブル:x=自分:_右端。
        自分。
    」。
    グラフ：個体番号＝グラフ：個体番号+1。
    「_棒グラフ:f2==undef」!なら「
        _棒グラフ。
    」そうでなければ「
        「自分!(_棒グラフ:f2) check_fn」!なら「
            「_棒グラフ:_DATA!(_棒グラフ:f2!1 読む)  射影 check_dt」!なら「
                _棒グラフ。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。


テーブル：histgram=「 |f2 ;tmp |  
    _ヒストグラム=グラフ！作る。
    _ヒストグラム：種類="ヒストグラム"。
    _ヒストグラム:f1 = 自分:フィールド名！1 読む。
    _ヒストグラム:f2 = f2。
    _ヒストグラム:_DATA=自分。
    「(_ヒストグラム:f1)!="階級"」!なら「
        _ヒストグラム:_DATA=自分！(_ヒストグラム:f2) 度数分布。
        _ヒストグラム:f1="階級"。
        _ヒストグラム:f2="度数"。
    」実行。
    _ヒストグラム:描画=「
        自分！  位置確定。
        data_x = _DATA！（自分:f1）射影。
        data_y = _DATA！（自分:f2）射影  。
        
        要素数=data_y:データ!要素数?。
        自分! (要素数)横幅設定。 
        自分! (data_y) 縦幅設定。
        自分! (要素数) メモリ線描画。
        ペン＝タートル!作る  1  線の太さ。
        
        「自分：_方向=="縦"」!なら「
            
            ペン！  ぺんなし  (自分:_原点x+自分:_間隔) (自分:_原点y) 位置    ９０  左回り  ぺんあり。
            ラベルx=自分:_原点x+(自分:_間隔)。
            ラベルy=自分:_原点y-20。
            
            ラベルサイズ=「自分:_プロット幅 > 10」 !なら「10」そうでなければ「自分:_プロット幅」実行。
            data_y:データ!「|n i|
                「n >= 自分:_最大メモリ」！なら「
                    n=自分:_最大メモリ。
                」そうでなければ「n <= 自分:_最小メモリ」なら「
                    n=自分:_最小メモリ。
                」実行。
                「n >= 自分:_最小メモリ」!なら「
                    n=(n-自分：_起点メモリ)*(自分:_DACOL)。
                    ペン！ペンあり  (n) 歩く  90 右回り  (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)) 歩く  90 右回り  (n) 歩く  180 右回り (色！ 0xE0E0F8 作る)  図形にする。  
                    ペン!ぺんなし  (-1*(自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数))) 0 移動する。
                    ペン！(色！ 0x555555 作る)  線の色  ペンあり  (n) 歩く  90 右回り  (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)) 歩く  90 右回り  (n) 歩く  180 右回り  図形を作る。  
                」そうでなければ「
                    ペン！ (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)) 0 移動する。
                」実行。
                「i==1」！なら「
                    ラベルペン=タートル!  作る 1  線の太さ  ペンなし(ラベルx) (ラベルy) 位置    ペンあり (自分:_横幅-自分：_間隔*2)  歩く  90 右回り。
                」実行。
                ニョロ位置=((data_x!(i) 読む)+"")! "~" 何文字目?。
                横軸ラベル=((data_x!(i) 読む)+"")! 1 (ニョロ位置-1)  部分。
                ラベルペン!ペンなし (ラベルx) (ラベルy) 位置 ペンあり 10 歩く。
                横軸ラベル長=(横軸ラベル+"")!長さ?。
                調整=0。
                「横軸ラベル長 < 3」!なら「
                    調整=(3-横軸ラベル長)*5。
                」そうでなければ「横軸ラベル長 > 3」なら「
                    調整=-1*(横軸ラベル長-3)*2。
                」実行。
                ラベル! (横軸ラベル) 作る  (自分：_軸ラベルサイズ)  文字サイズ  (ラベルx+調整-10) (ラベルy-10) 位置。
                ラベルx=ラベルx+自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)。
            」それぞれ実行。
            横軸ラベル=(data_x!(要素数) 読む)! (ニョロ位置+1) (((data_x!(要素数) 読む)+"")!  長さ？)  部分。
            ラベルペン!ペンなし (ラベルx) (ラベルy) 位置 ペンあり 10 歩く。
            ラベル! (横軸ラベル) 作る  (自分：_軸ラベルサイズ)  文字サイズ  (ラベルx+調整-10) (ラベルy-10) 位置。
            「自分:_底 >= ラベルy」!なら「自分:_底=ラベルy-30」実行。
            
        」そうでなければ「自分：_方向=="横"」なら「
            
            ペン！  ぺんなし  (自分:_原点x) (自分:_原点y+自分:_間隔) 位置    ぺんあり。
            ラベルx=自分:_原点x-15。
            ラベルy=自分:_原点y+(自分:_間隔)。
            
            ラベルサイズ=「自分:_プロット幅 > 10」 !なら「8」そうでなければ「自分:_プロット幅」実行。
            data_y:データ!「|n i|
                
                val=data_x!(i) 読む。
                メモリ調整＝((val+"")!長さ?)*12。
                「n >= 自分:_最大メモリ」！なら「
                    n=自分:_最大メモリ。
                」そうでなければ「n <= 自分:_最小メモリ」なら「
                    n=自分:_最小メモリ。
                」実行。
                
                「n >= 自分:_最小メモリ」!なら「
                    n=(n-自分:_起点メモリ)*(自分:_DACOL)。
                    ペン！ペンあり  (n) 歩く  90 左回り  (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)) 歩く  90 左回り  (n) 歩く  180 左回り (色！ 0xE0E0F8 作る)  図形にする。  
                    ペン!ぺんなし  0 (-1*(自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数))) 移動する。
                    ペン！(色！ 0x555555 作る)  線の色  ペンあり  (n) 歩く  90 左回り  (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)) 歩く  90 左回り  (n) 歩く  180 左回り  図形を作る。  
                」そうでなければ「
                    ペン！ 0 (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)) 移動する。
                」実行。
                
                「i==1」！なら「
                    ラベルペン=タートル!  作る 90  左回り 1  線の太さ  ペンなし(ラベルx) (ラベルy) 位置    ペンあり (自分:_縦幅-自分：_間隔*2)  歩く  90 左回り。
                」実行。
                ニョロ位置=((data_x!(i) 読む)+"")! "~" 何文字目?。
                横軸ラベル=((data_x!(i) 読む)+"")! 1 (ニョロ位置-1)  部分。
                ラベルペン!ペンなし (ラベルx) (ラベルy) 位置 ペンあり 10 歩く。
                横軸ラベル長=(横軸ラベル+"")!長さ?。
                ラベル! (横軸ラベル) 作る  (自分：_軸ラベルサイズ)  文字サイズ  (ラベルx-(横軸ラベル長*7)-10) (ラベルy+10) 位置。
                ラベルy=ラベルy+自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)。
                「自分:_左端 >= (ラベルx-メモリ調整-30)」!なら「
                    自分:_左端=ラベルx-メモリ調整  -30。
                」実行。
            」それぞれ実行。
            横軸ラベル=(data_x!(要素数) 読む)! (ニョロ位置+1) (((data_x!(要素数) 読む)+"")!  長さ？)  部分。
            ラベルペン!ペンなし (ラベルx) (ラベルy) 位置 ペンあり 10 歩く。
            ラベル! (横軸ラベル) 作る  (自分：_軸ラベルサイズ)  文字サイズ  (ラベルx-(横軸ラベル長*7)-10) (ラベルy+10) 位置。
        」実行。
        
        「系列数 > 1」！なら「
            「自分:_方向=="横"」！なら「
                ペン!ペンなし (自分:_原点x) (自分:_底-5) 位置。
            」そうでなければ「
                ペン!ペンなし (自分:_原点x) (自分:_底-10) 位置。
            」実行。
            系列ラベルx =  自分:_原点x+10。 
            系列ラベルy = 自分:_底。
            「|i|
                系列名=f2!(i)  読む。
                系列名長=(系列名+"")!長さ？。
                ペン！ペンあり 6 4 角形  (自分!(i)  着色)  図形を作る。
                a=ラベル!  (系列名)  作る  （系列ラベルx） (系列ラベルy)  位置 (自分：_軸ラベルサイズ-2) 文字サイズ。
                ペン!ペンなし  (系列名長*１0+16)  0 移動する。
                系列ラベルx = 系列ラベルx+(系列名長*１0+16)。
            」!(系列数)  繰り返す。
            自分:_底＝自分:_底-20。
        」実行。
        ペン！消える。
        ラベルペン！消える。
        
        「横軸タイトル文==undef」！なら「
            自分！("class") 横軸タイトル。
        」実行。
        「縦軸タイトル文==undef」！なら「
            自分！("frequancy") 縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        ラベル!"　" 作る  (自分:_右端)  0 位置。
        テーブル:x=自分:_右端。
        自分。
    」。
    
    「どれか!(f2==undef) (_ヒストグラム:_DATA==undef) 本当」！なら「
        undef。
    」そうでなければ「
        「_ヒストグラム:_DATA！(_ヒストグラム:f2)  check_fn」!なら「
            「_ヒストグラム:_DATA！(_ヒストグラム:f2) 射影 check_dt」！なら「
                グラフ：個体番号＝グラフ：個体番号+1。
                _ヒストグラム。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。

テーブル：stacked_bar_graph=「| |
    _積み上げ棒グラフ＝グラフ！作る。
    _積み上げ棒グラフ：種類="積み上げ棒グラフ"。
    _積み上げ棒グラフ:_DATA=自分。
    _積み上げ棒グラフ:f1 = 自分:フィールド名！1 読む。
    _積み上げ棒グラフ:f2 = 自分!(_rest) getarg。
    _積み上げ棒グラフ:描画=「| |
        自分！位置確定。
        「f2==undef」！なら「
            //tmp = 自分:_DATA:フィールド名 !作る。
            tmp = 自分:_DATA:フィールド名 ! concat。
            f2=(tmp )! 1 位置で消す。  
        」実行。
        
        tmp_data = 自分:_DATA! (f2) 射影。
        data_x=自分:_DATA! (f1) 射影。
        フィールド数=f2!要素数?。
        系列数=data_x:データ!要素数?。
        正合計配列=配列!作る。
        負合計配列=配列!作る。
		　　データ補正用配列=配列! 作る。
		  データ補正用配列:データ=配列! 作る。
        「
		      正合計配列!  0  書く。
			   負合計配列!  0  書く。
		  」！(フィールド数) 繰り返す。 
       
        「| i |
            「| j |
			　　　　　　　　　「(tmp_data!((i-1)*フィールド数+j) 読む) > 0」！なら「
                    正合計配列! (j) ((正合計配列!(j) 読む)+(tmp_data!((i-1)*フィールド数+j) 読む))  上書き。
					　」そうでなければ「
				　　　　　　　　　負合計配列! (j) ((負合計配列!(j) 読む)+(tmp_data!((i-1)*フィールド数+j) 読む))  上書き。
					　」実行。
            」!(フィールド数)  繰り返す。
        」!(系列数)  繰り返す。
        データ補正用配列:データ=正合計配列！(負合計配列)　連結。
        描画用データ=自分:_DATA! (f2! 1 (f1) 挿入) 行列入れ替え。
        f2!1  位置で消す。
        正高さ配列=配列！作る。
        負高さ配列=配列！作る。
        自分! (フィールド数)横幅設定。
        自分! (データ補正用配列) 縦幅設定。
        自分! (フィールド数) メモリ線描画。
        
        ペン＝タートル!作る 1 線の太さ。
        ペン！  ぺんなし  (自分:_原点x+自分:_間隔) (自分:_原点y) 位置    ９０  左回り。
        ラベルx=自分:_原点x+自分:_間隔+自分:_プロット幅/2。
        ラベルy=自分:_原点y-10。
        
        「| j |
            data_y=描画用データ!　((data_x:データ!(j) 読む)+"") 射影。 
            ラベルサイズ=「自分:_プロット幅 > 10」 !なら「10」そうでなければ「自分:_プロット幅」実行。
            「|  i; n  |
                「j==1」！なら「
                    正高さ配列!(自分:_原点y) 書く。
                    負高さ配列!(自分:_原点y) 書く。
                」実行。
                n=data_y:データ!(i) 読む。
                「n >= 自分:_最大メモリ」！なら「
                    n=自分:_最大メモリ。
                」そうでなければ「n <= 自分:_最小メモリ」なら「
                    n=自分:_最小メモリ。
                」実行。
                「n >= 自分:_最小メモリ」!なら「
				        「n > 0」!なら「
						　　　　　　移動値=正高さ配列!(i) 読む。
						　　」そうでなければ「
						　　　　　　移動値=負高さ配列!(i) 読む。						  
						  」実行。
				
                    n=(n-自分:_起点メモリ)*(自分:_DACOL)。
                    ペン！ぺんなし  0 (移動値) 移動する。
                    ペン！ペンあり  (n) 歩く  90 右回り  (自分:_プロット幅) 歩く  90 右回り  (n) 歩く  180 右回り (自分!(j)  着色)  図形にする。  
                」そうでなければ「
                    ペン！ (自分:_プロット幅) 0 移動する。
                」実行。
                ペン!ペンなし  (自分:_間隔)  (-1*移動値) 移動する。
                
               　「 n > 0 」!なら「
                    正高さ配列!(i)  ((正高さ配列!(i)読む)+n)  上書き。
               　」そうでなければ「
                    負高さ配列!(i)  ((負高さ配列!(i)読む)+n)  上書き。
                」実行。
				
                「j==1」！なら「
                    横軸ラベル=f2!(i) 読む。
                    横軸ラベル長=(横軸ラベル+"")!長さ?。
                    調整=0。
                    「横軸ラベル長 < 3」!なら「
                        調整=(3-横軸ラベル長)*5。
                    」そうでなければ「横軸ラベル長 > 3」なら「
                        調整=-1*(横軸ラベル長-3)*3。
                    」実行。
                    ラベル! (横軸ラベル) 作る  (自分：_軸ラベルサイズ)  文字サイズ  (ラベルx+調整-横軸ラベル長*3) (ラベルy) 位置。
                    ラベルx=ラベルx+自分:_間隔+自分:_プロット幅。
                」実行。
                
            」!(フィールド数)  繰り返す。
            
            「自分:_底 >= ラベルy」!なら「自分:_底=ラベルy-30」実行。
            ペン！  ぺんなし  (自分:_原点x+自分:_間隔) (自分:_原点y) 位置。
            
        」! (系列数) 繰り返す。
        「系列数 > 1」！なら「
            ペン!ペンなし (自分:_原点x) (自分:_底-10) 位置。
            系列ラベルx =  自分:_原点x+10。 
            系列ラベルy = 自分:_底。
            「|i|
                系列名=data_x!(i)  読む。
                
                系列名長=(系列名+"")!長さ？。
                ペン！ペンあり 6 4 角形  (自分!(i)  着色)  図形を作る。
                a=ラベル!  (系列名)  作る  （系列ラベルx） (系列ラベルy)  位置 (自分：_軸ラベルサイズ-2) 文字サイズ。
                ペン!ペンなし  (系列名長*１0+16)  0 移動する。
                系列ラベルx = 系列ラベルx+(系列名長*１0+16)。
            」!(系列数)  繰り返す。
            自分:_底＝自分:_底-20。
        」実行。
        
        ペン！消える。
        自分:_YLOWERLIM=_YORIGIN+y_pos。
        「横軸タイトル文==undef」！なら「
            自分！("item") 横軸タイトル。
        」実行。
        「縦軸タイトル文==undef」！なら「
            自分！("value") 縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        ラベル!"　" 作る  (自分:_右端)  0 位置。
        テーブル:x=自分:_右端。
        自分。
    」。
    グラフ：個体番号＝グラフ：個体番号+1。
    「_積み上げ棒グラフ:f2==undef」!なら「
        _積み上げ棒グラフ。
    」そうでなければ「
        「自分!(_積み上げ棒グラフ:f2) check_fn」!なら「
            「_積み上げ棒グラフ:_DATA!(_積み上げ棒グラフ:f2!1 読む)  射影 check_dt」!なら「
                _積み上げ棒グラフ。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。

テーブル：line_graph=「| ;max maxf |
    _折れ線グラフ＝グラフ！作る．
    _折れ線グラフ：種類="折れ線グラフ"。
    _折れ線グラフ:_DATA=自分．
    _折れ線グラフ:f1 = 自分:フィールド名！1 読む。
    _折れ線グラフ:f2 = 自分!(_rest) getarg。
    _折れ線グラフ:描画=「|  |
		　　自分:_向き="縦"。
        自分！位置確定。
        data_x=_DATA!(f1) 射影。
        
        「f2==undef」！なら「
            f2=配列！作る。
				自分:フィールド名!「| n |
					f2!(n) 書く。
				」それぞれ実行。
            f2=tmp!1 位置で消す。
        」実行。
        
        data_y=_DATA！（f2）射影。
        要素数=data_x:データ!要素数?。
        系列数=f2!要素数?。
		　　最大長=0。
		  
		  data_x:データ!「| n i |
		  　　　　「((n+"")!長さ？) > 最大長」！なら「最大長=(n+"")!長さ？」実行。
		  」それぞれ実行。
        ラベル数=ceil(要素数/35)。 
	   
        自分! (要素数)横幅設定。 
        自分! (data_y) 縦幅設定。
        自分! (要素数) メモリ線描画。
        
        ペン＝タートル!作る 2 線の太さ。
        ラベルx=自分:_原点x+(自分:_間隔)。
        ラベルy=自分:_原点y-10。
        
        「| j |
            
            data_y=自分:_DATA!(f2!(j) 読む) 射影。 
            ラベルサイズ=「自分:_プロット幅 > 10」 !なら「10」そうでなければ「自分:_プロット幅」実行。
            data_y:データ!「|n i|
                「自分:_メモリ範囲」！なら「                
                    「n >= 自分:_最大メモリ」！なら「
                        n=自分:_最大メモリ。
                    」そうでなければ「n <= 自分:_最小メモリ」なら「
                        //n=自分:_最小メモリ。
                    」実行。
				    」実行。
					 「i==1」！なら「
					 　　　　　　　　　　　plot_flag=false。
					          y1=(n-自分:_起点メモリ)*(自分:_DACOL)。
							  　　　「y1 >= 自分:_最小メモリ」!なら「plot_flag=true」実行。
                        プロットx=自分:_原点x+自分:_間隔+自分:_プロット幅/2。
                        ペン!ペンなし (プロットx)  (y1)  位置。
						　　　　　　　　x1=プロットx。
                」実行。
                「n >= 自分:_最小メモリ」!なら「
                    n=(n-自分:_起点メモリ)*(自分:_DACOL)。	
					　　　　　　　x2=x1+(自分:_間隔+自分:_プロット幅)。
						   y2=n。
						   「plot_flag」！なら「
                    　　　　ペン!ペンあり 4 8 角形 (自分!(j)  着色)  図形にする -2 5 移動する。
						　　　」実行。
                    ペン!ぺんあり  (プロットx) (n)   位置 (自分!(j)  着色)  図形を作る。
                    プロットx=プロットx+(自分:_間隔+自分:_プロット幅)。
	　　　　　　　　　　　　　　　　　　　　　 ｘ１＝ｘ２。　
						   y1=y2。
                    「i==要素数」！なら「
                         ペン!ペンあり 4 8 角形 (自分!(j)  着色)  図形にする -2 5 移動する。
                    」実行。
					　　　　　　　plot_flag=true。
                」そうでなければ「
				       　n=(n-自分:_起点メモリ)*(自分:_DACOL)。	
					 //x=(y-y1)/(y2-y1)/(x2-x1)+x1
					 　　　　　 x2=x1+(自分:_間隔+自分:_プロット幅)。
						   y2=n。
						   x軸交点=-y1/(y2-y1)/(x2-x1)+x1。
						   「plot_flag」！なら「
                    　　　　ペン!ペンあり 4 8 角形 (自分!(j)  着色)  図形にする -2 5 移動する。
						      ペン!ぺんあり  (x軸交点) (自分:_原点y)  位置 (自分!(j)  着色)  図形を作る。
						　　　」そうでなければ「
						   　　　ペン!ぺんなし  (x軸交点) (自分:_原点y)  位置
						   」実行。
                    プロットx=プロットx+(自分:_間隔+自分:_プロット幅)。
	　　　　　　　　　　　　　　　　　　　　　 ｘ１＝ｘ２。　
						   y1=y2。
						   plot_flag=false。
                」実行。
                
                「j==1」！なら「
					　　　　　　　　　　「((i-1)%ラベル数)==0」！なら「
                        横軸ラベル=data_x!(i) 読む。
                        横軸ラベル長=(横軸ラベル+"")!長さ?。
						　　　　　　　　「(最大長*5) > 自分:_プロット幅」！なら「
								 　自分! (横軸ラベル) (ラベルx) (ラベルy) "" (最大長) 縦表示。
								」そうでなければ「
                        ラベル! (横軸ラベル) 作る  (自分：_軸ラベルサイズ)  文字サイズ  (ラベルx-横軸ラベル長*5/2) (ラベルy) 位置。
						　　　　　　　」実行。
                        ラベルx=ラベルx+(自分:_間隔+自分:_プロット幅)*ラベル数。
						　　　」実行。
                」実行。
                
            」それぞれ実行。    
            「自分:_底 >= ラベルy」!なら「自分:_底=ラベルy-30」実行。
            
        」! (系列数) 繰り返す。
        
        「系列数 > 1」！なら「
            ペン!ペンなし (自分:_原点x) (自分:_底-5) 位置。
            系列ラベルx =  自分:_原点x+10。 
            系列ラベルy = 自分:_底。
            「|i|
                系列名=f2!(i)  読む。
                系列名長=(系列名+"")!長さ？。
                ペン！ペンあり 6 4 角形  (自分!(i)  着色)  図形を作る。
                a=ラベル!  (系列名)  作る  （系列ラベルx） (系列ラベルy)  位置 (自分：_軸ラベルサイズ) 文字サイズ。
                ペン!ペンなし  (系列名長*１0+16)  0 移動する。
                系列ラベルx = 系列ラベルx+(系列名長*１0+16)。
            」!(系列数)  繰り返す。
            自分:_底＝自分:_底-20。
        」実行。
        
        「横軸タイトル文==undef」！なら「
            自分！(f1) 横軸タイトル。
        」実行。
        「縦軸タイトル文==undef」！なら「
            自分！("value") 縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        ラベル!"　" 作る  (自分:_右端)  0 位置。
        テーブル:x=自分:_右端。
        ペン！ 消える。
        自分。
    」。
    
    グラフ：個体番号＝グラフ：個体番号+1。
    「_折れ線グラフ:f2==undef」!なら「
        _折れ線グラフ。
    」そうでなければ「
        「自分!(_折れ線グラフ:f2) check_fn」!なら「
            「_折れ線グラフ:_DATA!(_折れ線グラフ:f2!1 読む)  射影 check_dt」!なら「
                _折れ線グラフ。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。


テーブル：pie_chart=「 |f2|
    「どれか！(f2=="") (f2==undef) 本当」!なら「f2=(自分:フィールド名)!2 読む」実行。
    _円グラフ=グラフ！作る．
    _円グラフ:_DATA=自分．
    _円グラフ:f1 = 自分:フィールド名！1 読む。
    _円グラフ:f2 = f2。
    _円グラフ:描画=「| i |
        自分!位置確定。
        自分! 20 0 移動する。		
        ペン＝タートル！作る。
        D_f1=_DATA!  (f2)  小さい順 (f1) 射影。
        r=120.  x=90.  x_pos= r+20.  y_pos= -1*r.
        d_arr=_DATA！(f2) 小さい順 (f2) 射影。
        sum=d_arr!(f2) 合計値  値読み出し。
        add=0。
        自分:_左端=(自分:_原点x)-(r)-20。
        自分:_天井=(自分:_原点y)+(r)+30。
        自分:_底=(自分:_原点y)+y_pos-20。
        
        要素数=d_arr:データ!要素数?。
        max_length=1。
        角度合計 = ０。
        割合合計 = 0。
        d_arr：データ!「| val j|
            prop=round((val/sum)*1000)。
            prop=prop/10.
            チーズ角度 = round(prop*3.6)。
            col= グラフ！(j) 着色。
            long=0。
            割合合計=割合合計+prop。
            角度合計=角度合計+  チーズ角度。
            「j == 要素数」！なら「
                「角度合計 > 360」 !なら  「
                    チーズ角度=チーズ角度-(角度合計-360)。
                」そうでなければ「  角度合計 < 360」 なら  「
                    チーズ角度=チーズ角度+(360-角度合計)。				
                」実行。
                「割合合計 > 100」!なら「
                    prop=prop-(割合合計-100)。		
                」そうでなければ「割合合計 < 100」なら「
                    prop=prop+(100-割合合計)。
                」実行。
                prop=(round(prop*10))/10。
            」実行。
            ペン！ペンなし 0 0 位置。
            「チーズ角度!=0」!なら「
            チーズ＝「
                ペン！ペンあり 1 線の太さ ((r)*cos(x)) ((r)*sin(x)) 位置．
                x=x+1．
                long=long+1.
                ペン．
            」! (チーズ角度) 繰り返す 0 0 位置 (col) 図形を作る．
            
            チーズ！(自分:_原点x) (自分:_原点y) 位置。
            
            「(long) >= 20」！なら「
                
                ラベル！(prop+"%") 作る (自分:_原点x+(r/3*2)*cos(x-(long/2))-5) (自分:_原点y+(r/3*2)*sin(x-(long/2))) 位置 (自分：_軸ラベルサイズ-4) 文字サイズ。
            」そうでなければ「
                
                ラベル！(prop+"%") 作る (自分:_原点x+(r/4*5)*cos(x-(long/2))-5) (自分:_原点y+(r/4*5)*sin(x-(long/2))) 位置 (自分：_軸ラベルサイズ-5) 文字サイズ。
                
                ペン!ペンなし (自分:_原点x+(r/4*5)*cos(x-(long/2))+5) (自分:_原点y+(r/4*5)*sin(x-(long/2))-25)   位置 ペンあり (自分:_原点x+(r)*cos(x-(long/2))) (自分:_原点y+(r)*sin(x-(long/2)))   位置 (黒)   図形を作る。
            」実行。
            
            ペン！ペンなし (自分:_原点x+x_pos) (自分:_原点y+y_pos) 位置 ペンあり 10 4 角形 (col) 図形を作る。
            A=ラベル! (D_f1:データ！ (j) 読む) 作る (自分:_原点x+x_pos+15) (自分:_原点y+y_pos+3) 位置 (自分：_軸ラベルサイズ)  文字サイズ。
            
            ラベル! ("　　"+(d_arr！ (j) 読む)+"件") 作る (自分:_原点x+x_pos+15+(A!幅？)) (自分:_原点y+y_pos+3) 位置  (自分：_軸ラベルサイズ) 文字サイズ。
            y_pos = y_pos + 20。
            sum_length=(((D_f1:データ！ (j) 読む)+"")!  長さ？) + (("  "+(d_arr！ (j) 読む)+"件") !長さ?)。
            「max_length<sum_length」!なら「max_length=sum_length」実行。
            」実行。
        」それぞれ実行。
        自分:_右端=自分:_原点x+x_pos+15*(max_length)。
        テーブル：x=自分:_右端。
         ラベル!"　" 作る  (自分:_右端)  0 位置。
        ペン！消える．
        自分。
    」.
    グラフ：個体番号＝グラフ：個体番号+1。
    「どれか!(f2==undef) (_円グラフ:_DATA==undef) 本当」！なら「
        undef。
    」そうでなければ「
        「自分！(_円グラフ:f2)  check_fn」!なら「
            「自分!(_円グラフ:f2) 射影 check_dt」！なら「
                グラフ：個体番号＝グラフ：個体番号+1。
                _円グラフ。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。

テーブル：horizonal_bar_graph=「|;補正 |
    _帯グラフ=グラフ！作る。
    _帯グラフ:_DATA=自分。
    _帯グラフ:f1 = 自分:フィールド名！1 読む。
    _帯グラフ:joint_pos=配列！作る。
    _帯グラフ:f2 = 自分!(_rest) getarg。
    _帯グラフ:_方向="帯"。
    _帯グラフ:描画=「|;系列長  kxpos |
        自分!位置確定。
        「f2==undef」！なら「
            //tmp=(_DATA：フィールド名)！作る。
            tmp=(_DATA：フィールド名)！concat。
            f2=tmp!1 位置で消す。
        」実行。
        
        型配列=自分!(_DATA) 型判定。
        「(型配列!要素数?)>0」!なら「
            型配列!「|n|
                f2=f2!(n) 消す。
            」それぞれ実行。
        」実行。
        
        data_x=_DATA！(f1) 射影。
        フィールド数=f2!要素数?。
        系列数=data_x:データ!要素数?。
        ペン=タートル! 作る  1 線の太さ  。
        横の位置配列=配列！作る。
        注釈フラグ=false。
        描画用データ=自分:_DATA! (f2! 1 (f1) 挿入) 行列入れ替え。
        f2!1  位置で消す。
        自分! (フィールド数)横幅設定。 
        自分! (フィールド数) メモリ線描画。
        自分:_プロット幅 = 自分:_プロット幅。
        
        ペン！  ぺんなし  (自分:_原点x) (自分:_原点y+自分:_間隔) 位置。
        ラベルx=自分:_原点x-10。
        ラベルy=自分:_原点y+(自分:_間隔+自分:_プロット幅/2+5)。
        
        「| j |
            data_y=描画用データ!((data_x!(j) 読む)+"") 射影。 
            割合合計 =  0。
         
            「| i ;n|
                合計=自分:_DATA!(f2!(i) 読む) 合計値 数にする。
                「j==1」！なら「
                    横の位置配列!(自分:_原点y) 書く。
                」実行。
                n=data_y:データ!(i) 読む。
                val=f2!(i) 読む。
                メモリ調整＝((val+"")!長さ?)*12。		
                割合=round((n/合計)*1000)/10。
                割合合計=割合合計+割合。
                「j==系列数」！なら「
                    「割合合計 != １００」！なら「
                        注釈フラグ=true。
                    」実行。
                」実行。
                ペン!ペンなし  (横の位置配列!(i) 読む) 0  移動する。
                ペン！ペンあり  (5*割合) 歩く  90 左回り  (自分:_プロット幅) 歩く  90 左回り  (5*割合) 歩く  180 左回り (自分!(j)  着色)  図形にする。  
                ペン!ペンなし  0 (自分:_間隔) 移動する。
                ペン!ペンなし  (-1*(横の位置配列!(i) 読む)) 0  移動する。				 
                ラベル!(割合+"%") 作る (自分:_原点x+(横の位置配列!(i)読む)+(割合*5)/2-10) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*i-自分:_プロット幅/2+5)  位置  (自分：_軸ラベルサイズ-3) 文字サイズ。
                横の位置配列!(i)  ((横の位置配列!(i)読む)+割合*5)  上書き。	
                「j==1」！なら「
                    ラベル! (val) 作る  (自分：_軸ラベルサイズ)  文字サイズ  (ラベルx-メモリ調整) (ラベルy) 位置。
                    ラベルy=ラベルy+(自分:_間隔+自分:_プロット幅)。
                    「自分:_左端 >= (ラベルx-メモリ調整-30)」!なら「
                        自分:_左端=ラベルx-メモリ調整  -30。
                    」実行。
                」実行。
            」!(フィールド数) 繰り返す。
            
            横の位置配列!「| n i |
                「i==１」！なら「
                    ペン!  ペンなし (自分:_原点x+n) (自分:_原点y+自分:_間隔+自分:_プロット幅)  位置。
                」そうでなければ「
                    ペン!  ペンあり (自分:_原点x+n) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*i-自分:_プロット幅)  位置。
                    ペン！ペンなし 0 (自分:_プロット幅)  移動する。  
                」実行。
            」それぞれ実行。
            ペン！  ぺんなし  (自分:_原点x) (自分:_原点y+自分:_間隔) 位置。
            
        」! (系列数) 繰り返す。
        
        
        「系列数 > 1」！なら「
            ペン!ペンなし (自分:_原点x) (自分:_底-5) 位置。
            系列ラベルx =  自分:_原点x+10。 
            系列ラベルy = 自分:_底。
            「|i|
                系列名=data_x!(i)  読む。
                系列名長=(系列名+"")!長さ？。
                ペン！ペンあり 6 4 角形  (自分!(i)  着色)  図形を作る。
                a=ラベル!  (系列名)  作る  （系列ラベルx） (系列ラベルy)  位置 (自分：_軸ラベルサイズ-2) 文字サイズ。
                ペン!ペンなし  (系列名長*１0+16)  0 移動する。
                系列ラベルx = 系列ラベルx+(系列名長*１0+16)。
            」!(系列数)  繰り返す。
            自分:_底＝自分:_底-20。
        」実行。
        
        「注釈フラグ」!なら「
            ラベル!"※計算の都合上割合の合計が100%になっていないものがあります。"  作る (自分：_軸ラベルサイズ-2) 文字サイズ  (自分:_原点x) (自分:_底) 位置。
            自分:_底＝自分:_底-20。
        」実行。
        
        ペン！消える。
        「自分:_横軸タイトル文==undef」！なら「
            自分！(自分:f1) 横軸タイトル。
        」実行。
        「自分:_縦軸タイトル文==undef」！なら「
            自分！("value") 縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        ラベル!"　" 作る  (自分:_右端)  0 位置。
        テーブル:x=自分:_右端。
        自分。
    」。
    グラフ：個体番号＝グラフ：個体番号+1。
    「_帯グラフ:f2==undef」!なら「
        _帯グラフ。
    」そうでなければ「
        「全部! (自分!(_帯グラフ:f2) check_fn) (_帯グラフ:_DATA!=undef)  本当」!なら「
            「_帯グラフ:_DATA!(_帯グラフ:f2!1 読む)  射影 check_dt」!なら「
                _帯グラフ。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。

テーブル:scatter_plot＝「|f1 f2 flag|
    _散布図＝グラフ！作る。
    _散布図:_DATA=自分。
    _散布図:f1 = f1。
    _散布図:f2 = f2。
    _散布図:_方向="散布図"。
    _散布図:_グリッド線なし=false。
    _散布図:_横幅=300。
    _散布図:_縦幅=300。
    _散布図:_天井=_散布図:_原点y+330。
    _散布図：_右端=_散布図:_原点x+330。
    _散布図：描画=「||
        「(グラフ:_原点x)==(自分:_原点x)」!なら「自分!位置確定。」実行。
        ペン=タートル!作る。
        data_x=_DATA!(f1) 射影。
        data_y=_DATA!(f2) 射影。
        
        自分:  _DACOLX=自分!(data_x:データ) (自分:_横幅) データ補正値計算。
        自分:_scalex=自分:_scale。
        自分:_段数x=自分:_段数。
        自分:_桁x=自分:_digit。
        自分:_最大メモリ=undef。
        自分:_最小メモリ=undef。
        自分:_DACOLY=自分!(data_y:データ) (自分:_縦幅) データ補正値計算。
        自分:_scaley=自分:_scale。	
        自分:_段数y=自分:_段数。
        自分:_桁y=自分:_digit。
        自分!メモリ線描画。
        
        data_x:データ!「|val cnt|
            ペン！ペンなし (自分:_原点x+val*自分:_DACOLX) ((data_y:データ!(cnt) 読む)*自分:_DACOLY+自分:_原点y+3) 位置 ペンあり 4 6 角形 (赤)  図形を作る。
        」それぞれ実行。
        
        「横軸タイトル文==undef」！なら「
            自分！(f1) 横軸タイトル。
        」実行。
        「縦軸タイトル文==undef」！なら「
            自分！(f2) 縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        ペン!消える。
        
        「自分:_近似」！なら「
            自分!最小二乗法。
            自分:_近似=false。
        」実行。
        
        ラベル!"　" 作る  (自分:_右端)  0 位置。
        テーブル:x=自分:_右端。
        自分。
    」。
    グラフ：個体番号＝グラフ：個体番号+1。
    「どれか！(_散布図:f1==undef) (_散布図:f2==undef) 本当」!なら「
        undef。
    」そうでなければ「
        「全部! (自分!(_散布図:f1) check_fn) (自分!(_散布図:f2) check_fn) 本当」!なら「
            「全部!(_散布図:_DATA!(_散布図:f1)  射影 check_dt) (_散布図:_DATA!(_散布図:f2)  射影 check_dt) 本当」!なら「
                _散布図。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。



テーブル：box_plot=「 |f1 f2|
    _箱ひげ図＝グラフ！作る。
    _箱ひげ図:_DATA=自分．
    _箱ひげ図:f1 = f1。
    _箱ひげ図:f2 = f2。
    
    _箱ひげ図：描画=「||
        自分!位置確定。
        //一つ目の引数(x軸の要素)を取得し値の重複を除く。
        data_x=_DATA！(f1) 内部_重複なし。
        f1_num＝0．
        f2_num＝0．
        data_y = _DATA！(f2）射影．
        
        要素数=data_x:データ!要素数?。
        プロット数=data_y:データ!要素数?。
        自分! (要素数)横幅設定。 
        自分! (data_y) 縦幅設定。
        自分! (要素数) メモリ線描画。
        
        //引数に取られたフィールドがそれぞれ何番目の要素であるかを調べる
        「｜番号｜
            「（_DATA:フィールド名！（番号）読む）＝＝ (f1)」！なら
            「f1_num＝番号。」そうでなければ
            「（_DATA:フィールド名！（番号）読む）＝＝ (f2)」なら
            「f2_num＝番号。」実行。
        」！（_DATA:フィールド名！要素数？）繰り返す。
        ペン＝タートル！作る 1 線の太さ。
        data_x:データ!「|f cnt|
            tmp=_DATA!(f) (f1_num) レコード取り出し。//選択に相当
            tmp2=tmp!(f2) 射影。
            tmp3=tmp!(f2) 射影。
            qua3=tmp!(f2) 第3四分位数 値読み出し。
            qua2=tmp!(f2) 中央値 値読み出し。
            qua1=tmp!(f2) 第1四分位数 値読み出し。
            ave=tmp!(f2) 平均値 値読み出し。
            
            「qua1!=undef」!なら「
                IRQ=qua3-qua1。
                「自分:_方向=="縦"」！なら「
                    
                    tmp2:データ!「|n i|
                        「どれか!(n > (qua3+IRQ*1.5)) (n < (qua1-IRQ*1.5)) 本当」！なら「
									「自分:_範囲指定」！なら「
										 ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)) (自分:_原点y+(n-自分:_最小メモリ)*_DACOL) 位置 ぺんあり 3 円。
									
									」そうでなければ「
                            ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)) (自分:_原点y+n*_DACOL) 位置 ぺんあり 3 円。
									」実行。
                            tmp3:データ!(n) 消す。
                        」実行。
                    」それぞれ実行。
                    max=tmp3!(f2) 最大値  値読み出し。  
                    min=tmp3!(f2) 最小値  値読み出し。
					
				「自分:_範囲指定」!なら「
					qua3=qua3-(自分:_最小メモリ)。
					qua2=qua2-(自分:_最小メモリ)。
					qua1=qua1-(自分:_最小メモリ)。
					ave=ave-(自分:_最小メモリ)。
					min=min-(自分:_最小メモリ)。
					max=max-(自分:_最小メモリ)。		
				」実行。
					
                    //平均のバッテン
                    ペン！ぺんなし  (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)-((20/sqrt(2))/2)) (自分:_原点y+ave*(_DACOL)+((20/sqrt(2))/2)) 位置 45 右回り ぺんあり 20 歩く  ペンなし 位置 45 左回り  ．
                    ペン！ぺんなし  (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)-((20/sqrt(2))/2)) (自分:_原点y+ave*(_DACOL)-((20/sqrt(2))/2)) 位置 45 左回り ぺんあり 20 歩く ペンなし  位置 45 右回り．
                    //縦棒
                    ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)) (自分:_原点y+max*_DACOL)
                    位置 ペンあり (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)) (自分:_原点y+qua3*_DACOL) 位置．
                    ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)) (自分:_原点y+qua1*_DACOL)
                    位置 ペンあり (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)) (自分:_原点y+min*_DACOL) 位置．
                    ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) (自分:_原点y+qua3*_DACOL)
                    位置 ペンあり (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) (自分:_原点y+qua1*_DACOL) 位置．
                    ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt) (自分:_原点y+qua3*_DACOL)
                    位置 ペンあり (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt) (自分:_原点y+qua1*_DACOL) 位置。  
                    //横棒
                    ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) (自分:_原点y+qua3*_DACOL) 位置  ペンあり (自分:_プロット幅) 歩く。
                    ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) (自分:_原点y+qua2*_DACOL) 位置  ペンあり (自分:_プロット幅) 歩く。
                    ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) (自分:_原点y+qua1*_DACOL) 位置  ペンあり (自分:_プロット幅) 歩く。
                    ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) (自分:_原点y+max*_DACOL) 位置  ペンあり (自分:_プロット幅) 歩く。
                    ペン！ペンなし (自分:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) (自分:_原点y+min*_DACOL) 位置  ペンあり (自分:_プロット幅) 歩く  ペンなし。
                    プロット＝ペン！図形にする。
                    
                    「cnt == 1」！なら「
                        data_x:データ!「| n i |
                            長=(n+"")!長さ?。
                            調整=0。
                            「長 < 3」!なら「
                                調整=(3-長)*5。
                            」そうでなければ「長 > 3」なら「
                                調整=-(長-3)*2。
                            」実行。
                            ラベル! (n) 作る  (自分：_軸ラベルサイズ)  文字サイズ  (自分:_原点x+(自分:_間隔+自分:_プロット幅)*i-自分:_プロット幅/2-長*5) (自分:_原点y-10) 位置。
                        」それぞれ実行。
                        自分:_底=自分:_底-30。
                        
                    」実行。
                    
                」そうでなければ「自分:_方向=="横"」なら「
                    「cnt==1」！なら「
                        ペン!90 左回り。
                    」実行。
                    tmp2:データ!「|n i|
                        「どれか!(n > (qua3+IRQ*1.5)) (n < (qua1-IRQ*1.5)) 本当」！なら「
                            ペン！ペンなし (自分:_原点x+n*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))  位置 ぺんあり 3 円。
                            tmp3:データ!(n) 消す。
                        」実行。
                    」それぞれ実行。
                    
                    max=tmp3!(f2) 最大値  値読み出し。  
                    min=tmp3!(f2) 最小値  値読み出し。
                    //平均のバッテン
                    ペン！ぺんなし (自分:_原点x+ave*(_DACOL)-((20/sqrt(2))/2)) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)-((20/sqrt(2))/2))位置 45 右回り ぺんあり 20 歩く  ペンなし 位置 45 左回り  ．
                    ペン！ぺんなし (自分:_原点x+ave*(_DACOL)+((20/sqrt(2))/2)) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)-((20/sqrt(2))/2)) 位置 45 左回り ぺんあり 20 歩く ペンなし  位置 45 右回り。
                    //縦棒
                    ペン！ペンなし (自分:_原点x+max*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))
                    位置 ペンあり (自分:_原点x+qua3*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)) 位置．
                    
                    ペン！ペンなし (自分:_原点x+qua1*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))
                    位置 ペンあり  (自分:_原点x+min*_DACOL)   (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))位置．
                    
                    ペン！ペンなし (自分:_原点x+qua3*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) 位置 ペンあり  (自分:_原点x+qua1*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) 位置．
                    ペン！ペンなし (自分:_原点x+qua3*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt) 位置 ペンあり (自分:_原点x+qua1*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt) 位置。  
                    //横棒
                    ペン！ペンなし (自分:_原点x+qua3*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) 位置  ペンあり (自分:_プロット幅) 歩く。
                    ペン！ペンなし (自分:_原点x+qua2*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) 位置  ペンあり (自分:_プロット幅) 歩く。
                    ペン！ペンなし (自分:_原点x+qua1*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)位置  ペンあり (自分:_プロット幅) 歩く。
                    ペン！ペンなし (自分:_原点x+max*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) 位置  ペンあり (自分:_プロット幅) 歩く。
                    ペン！ペンなし (自分:_原点x+min*_DACOL) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅) 位置  ペンあり (自分:_プロット幅) 歩く  ペンなし。
                    プロット＝ペン！図形にする。
                    
                    「cnt == 1」！なら「
                        最長=0。
                        data_x:データ!「| n i |
                            長=(n+"")!長さ?。
                            「長 > 最長」!なら「最長=長」実行。
                            調整=0。
                            「長 < 3」!なら「
                                調整=(3-長)*5。
                            」そうでなければ「長 > 3」なら「
                                調整=-(長-3)*2。
                            」実行。
                            ラベル! (n) 作る  (自分：_軸ラベルサイズ)  文字サイズ  (自分:_原点x-20+長-長*10) (自分:_原点y+(自分:_間隔+自分:_プロット幅)*i-自分:_プロット幅/2+10) 位置。
                        」それぞれ実行。
                        自分:_左端=自分:_左端-最長*15。
                        
                    」実行。
                」実行。
            」実行。
            
        」それぞれ実行。
        
        「横軸タイトル文==undef」！なら「
            自分！("item") 横軸タイトル。
        」実行。
        「縦軸タイトル文==undef」！なら「
            自分！("value") 縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
		  ラベル!"　" 作る  (自分:_右端)  0 位置。
        ペン！図形にする。
        ペン！消える。
        自分。
    」．
    グラフ：個体番号＝グラフ：個体番号+1。
    「どれか！(_箱ひげ図:f1==undef) (_箱ひげ図:f2==undef) 本当」!なら「
        undef。
    」そうでなければ「
        「全部! (自分!(_箱ひげ図:f1) check_fn) (自分!(_箱ひげ図:f2) check_fn) 本当」!なら「
            「 _箱ひげ図:_DATA!(_箱ひげ図:f2)  射影 check_dt」!なら「
                _箱ひげ図。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」．


*/
