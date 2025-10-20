(function () {
  this["テーブル"] = this["作る"]();
  this["テーブル"]["データ"] = this["配列"]["作る"]();
  this["テーブル"]["_画面幅"] = this["画面"]["幅?"]();
  this["テーブル"]["_画面高さ"] = this["画面"]["高さ?"]();
  this["テーブル"]["x"] = 20 + this["テーブル"]["_画面幅"] / -2;
  this["テーブル"]["y"] = this["テーブル"]["_画面高さ"] / 2;
  this["テーブル"]["リスト高さ"] = (this["テーブル"]["_画面高さ"] * 3) / 10;
  this["テーブル"]["getarg"] = dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["全部"]["本当"](
        this["配列?"](n),
        this["配列?"](n["読む"](1)),
      );
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return n["読む"](1);
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return n;
        }),
      );
  });
  this["テーブル"]["作る"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["ret"] = this["テーブル"]["create"]();
    this["ret"]["データ"] = this["配列"]["作る"]();
    this["args"] = this["getarg"](_rest);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["args"] !== this["undef"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["ret"]["フィールド名"] = this["args"]);
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["ret"]["フィールド名"] = this["配列"]["作る"]());
        }),
      );
    return this["ret"];
  });
  this["テーブル"]["配列?"] = dtlbind(this, function (n) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["どれか"]["本当"](
        ("" + n)["含む?"]("]"),
        n === this["undef"],
      );
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["true"];
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["false"];
        }),
      );
  });
  this["テーブル"]["書く"] = dtlbind(this, function (v) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["配列?"](v);
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return v["それぞれ実行"](
            dtlbind(this, function (n) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return (this["データ"] = this["データ"]["書く"](n));
            }),
          );
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["データ"] = this["データ"]["書く"](v));
        }),
      );
    return this;
  });
  this["テーブル"]["読む"] = dtlbind(this, function (i) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    return this["データ"]["読む"](i);
  });
  this["テーブル"]["連結"] = dtlbind(this, function (v) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    var ret;
    this["データ"] = this["データ"]["連結"](v);
    return this;
  });
  this["テーブル"]["区切り文字"] = dtlbind(this, function (deli) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    this["deli"] = deli;
    return this;
  });
  this["テーブル"]["文字コード"] = dtlbind(this, function (encode) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    this["encode"] = encode;
    return this;
  });
  this["テーブル"]["ファイルから作る"] = dtlbind(this, function (fn) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    var fld_tmp;
    var fld;
    var _tmp;
    var deli;
    this["tf"] = this["テキストファイル"]["作る"](fn);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["encode"] === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["encode"] = "Shift-JIS");
        }),
      );
    this["dt"] = this["tf"]["読む"](this["encode"]);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["dt"] !== this["undef"];
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
            return deli === this["undef"];
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
                  return this["dt"]["読む"](1)["含む?"]("\t");
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (deli = "\t");
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (deli = ",");
                    }),
                  );
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["フィールド名"] === this["undef"];
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                fld_tmp = this["dt"]["読む"](1)["分割"](deli);
                fld = this["配列"]["作る"]();
                fld_tmp["それぞれ実行"](
                  dtlbind(this, function (n) {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 1);
                    n = "" + n;
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return n["含む?"]("[(]");
                    })
                      ["なら"]()
                      ["実行"](
                        dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          _tmp = n["分割"]("[(]");
                          return (n = _tmp["読む"](1));
                        }),
                      );
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return n["含む?"]("[(]");
                    })
                      ["なら"]()
                      ["実行"](
                        dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          _tmp = n["分割"]("[(]");
                          return (n = _tmp["読む"](1));
                        }),
                      );
                    return dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return n["含む?"]("[^0-9０-９\-\.]");
                    })
                      ["なら"]()
                      ["そうでなければ"](
                        dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return fld["書く"](n);
                        }),
                      )
                      ["実行"](
                        dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return fld["書く"]("F" + n);
                        }),
                      );
                  }),
                );
                return (this["ret"] = this["テーブル"]["作る"](fld));
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["dt"]
                  ["読む"](1)
                  ["分割"](deli)
                  ["それぞれ実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["dt"]["挿入"](1, "");
                    }),
                  );
              }),
            );
          this["dt"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return i > 1;
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    n = n + " ";
                    this["tmp"] = n["分割"](deli);
                    return this["tmp"]["それぞれ実行"](
                      dtlbind(this, function (m) {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 1);
                        m = m["置き換える"](" $", "");
                        m = m["置き換える"]("^ ", "");
                        m = m["置き換える"]("^\-$", "");
                        m = m["置き換える"]("^\−$", "");
                        m = m["置き換える"]("^\ー$", "");
                        return dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return m["含む?"]("[^0-9０-９\.\-]");
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
                              return this["ret"]["書く"](m);
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
                              return this["ret"]["書く"](
                                root["window"]["parseFloat"](m),
                              );
                            }),
                          );
                      }),
                    );
                  }),
                );
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
  this["テーブル"]["ファイルから追加"] = dtlbind(this, function (fn) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    this["tf"] = this["テキストファイル"]["作る"](fn);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["encode"] === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["encode"] = "Shift-JIS");
        }),
      );
    this["dt"] = this["tf"]["読む"](this["encode"]);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["deli"] === this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["deli"] = "\t");
        }),
      );
    this["fld"] = this["dt"]["読む"](1)["分割"](this["deli"]);
    this["ret"] = this;
    this["dt"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        this["tmp"] = n["分割"](this["deli"]);
        return this["tmp"]["それぞれ実行"](
          dtlbind(this, function (m) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            return this["ret"]["書く"](m);
          }),
        );
      }),
    );
    return this["ret"];
  });
  this["テーブル"]["値読み出し"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["val"] = this["データ"]["読む"](1);
    return this["val"];
  });
  this["テーブル"]["フィールド番号取得"] = dtlbind(this, function (f) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    this["fs"] = this["undef"];
    this["要素数"] = this["フィールド名"]["要素数?"]();
    dtlbind(this, function (n) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      return dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["フィールド名"]["読む"](n) === f;
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (this["fs"] = n);
          }),
        );
    })["繰り返す"](this["フィールド名"]["要素数?"]());
    return this["fs"];
  });
  this["テーブル"]["文字数カウント"] = dtlbind(this, function (Str) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    Str = Str + "";
    this["length"] = Str["長さ?"]();
    this["sum"] = 0;
    dtlbind(this, function (n) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      return dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["全部"]["本当"](
          Str["部分"](n, 1)["文字コード"]()["進数"](10) > 31,
          Str["部分"](n, 1)["文字コード"]()["進数"](10) < 127,
        );
      })
        ["なら"]()
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (this["sum"] = this["sum"] + 1);
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (this["sum"] = this["sum"] + 2);
          }),
        );
    })["繰り返す"](this["length"]);
    return this["sum"];
  });
  this["テーブル"]["表示"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var 要素数;
    var 文字列;
    var レコード;
    var カラム名;
    var tmp;
    var space;
    var s;
    var 幅;
    var 文字数;
    var lst;
    var 件数;
    要素数 = this["フィールド名"]["要素数?"]();
    文字数 = this["配列"]["作る"]();
    レコード = "";
    カラム名 = "";
    this["フィールド名"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        return 文字数["書く"](this["文字数カウント"](n));
      }),
    );
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return n === "";
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (n = "NA");
            }),
          );
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["全部"]["本当"](
            (n + "")["含む?"]("[^0-9０-９\-\.]") === this["false"],
            (n + "")["長さ?"]() > 5,
          );
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              n = (n * 10000).round();
              return (n = n / 10000);
            }),
          );
        tmp = this["文字数カウント"](n + "");
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return 文字数["読む"](((i - 1) % 要素数) + 1) < tmp;
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return 文字数["上書き"](((i - 1) % 要素数) + 1, tmp);
            }),
          );
      }),
    );
    space = "";
    this["フィールド名"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        n = n + "";
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (space = space + " ");
        })["繰り返す"](
          文字数["読む"](((i - 1) % 要素数) + 1) -
            this["文字数カウント"](n + ""),
        );
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i === 要素数;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (カラム名 = カラム名["連結"](space + n));
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (カラム名 = カラム名["連結"](space + n + "|"));
            }),
          );
        return (space = "");
      }),
    );
    幅 = 0;
    文字数["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return (幅 = 幅 + n);
      }),
    );
    s = "";
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return (s = s + "-");
    })["繰り返す"](幅 + 要素数 - 1);
    件数 = this["データ"]["要素数?"]() / this["フィールド名"]["要素数?"]();
    this["リスト幅"] = this["テーブル"]["_画面幅"] / 2.5;
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return 要素数 === 1;
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          this["横幅"] = s["長さ?"]();
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["横幅"] <= 1;
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["補正値"] = 15 * this["横幅"]);
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["横幅"] <= 2;
              }),
            )
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["補正値"] = 4 * this["横幅"]);
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["横幅"] <= 3;
              }),
            )
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["補正値"] = 3 * this["横幅"]);
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["横幅"] < 7;
              }),
            )
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["補正値"] = 2 * this["横幅"]);
              }),
            )
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["補正値"] = this["横幅"]);
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return 23 + (幅 + 要素数) * 7 + this["補正値"] <= this["リスト幅"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["リスト幅"] =
                  23 + (幅 + 要素数) * 7 + this["補正値"]);
              }),
            );
          lst = this["テキストエリア"]
            ["作る"](カラム名)
            ["大きさ"](this["リスト幅"], this["リスト高さ"])
            ["位置"](this["テーブル"]["x"], this["テーブル"]["y"]);
          return (this["テーブル"]["x"] =
            this["テーブル"]["x"] + (40 + this["リスト幅"]));
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
            return 23 + (幅 + 要素数) * 7 <= this["リスト幅"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["リスト幅"] = 23 + (幅 + 要素数) * 7);
              }),
            );
          lst = this["テキストエリア"]
            ["作る"](カラム名)
            ["大きさ"](this["リスト幅"], this["リスト高さ"])
            ["位置"](this["テーブル"]["x"], this["テーブル"]["y"]);
          return (this["テーブル"]["x"] =
            this["テーブル"]["x"] + (40 + this["リスト幅"]));
        }),
      );
    lst["書く"](s)["改行"]();
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return n === "";
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (n = "NA");
            }),
          );
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["全部"]["本当"](
            (n + "")["含む?"]("[^0-9０-９\-\.]") === this["false"],
            (n + "")["長さ?"]() > 5,
          );
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              n = (n * 10000).round();
              return (n = n / 10000);
            }),
          );
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (space = space + " ");
        })["繰り返す"](
          文字数["読む"](((i - 1) % 要素数) + 1) -
            this["文字数カウント"](n + ""),
        );
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % 要素数 === 0;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (レコード = レコード["連結"](space + n));
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (レコード = レコード["連結"](space + n + "|"));
            }),
          );
        space = "";
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (i - 1) % 要素数 === 要素数 - 1;
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              lst["書く"](レコード)["改行"]();
              return (レコード = "");
            }),
          );
      }),
    );
    this["テーブル"]["フラグ"] = 1;
    return this;
  });
  this["テーブル"]["TSV表示"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var 要素数;
    var 文字列;
    var レコード;
    var カラム名;
    var tmp;
    var space;
    var s;
    var 幅;
    var 文字数;
    var lst;
    var 件数;
    要素数 = this["フィールド名"]["要素数?"]();
    文字数 = this["配列"]["作る"]();
    レコード = "";
    カラム名 = "";
    this["フィールド名"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        return 文字数["書く"](this["文字数カウント"](n));
      }),
    );
    this["フィールド名"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i === 要素数;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (カラム名 = カラム名["連結"](n));
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (カラム名 = カラム名["連結"](n + "\t"));
            }),
          );
      }),
    );
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        tmp = this["文字数カウント"](n + "");
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return 文字数["読む"](((i - 1) % 要素数) + 1) < tmp;
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return 文字数["上書き"](((i - 1) % 要素数) + 1, tmp);
            }),
          );
      }),
    );
    幅 = 0;
    文字数["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return (幅 = 幅 + n);
      }),
    );
    件数 = this["データ"]["要素数?"]() / this["フィールド名"]["要素数?"]();
    this["リスト幅"] = this["テーブル"]["_画面幅"] / 2.5;
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return 23 + (幅 + 要素数) * 7 <= this["リスト幅"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["リスト幅"] = 23 + (幅 + 要素数) * 7);
        }),
      );
    lst = this["テキストエリア"]
      ["作る"](カラム名)
      ["大きさ"](this["リスト幅"], this["リスト高さ"])
      ["位置"](this["テーブル"]["x"], this["テーブル"]["y"]);
    this["テーブル"]["x"] = this["テーブル"]["x"] + (40 + this["リスト幅"]);
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % 要素数 === 0;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (レコード = レコード["連結"](n));
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (レコード = レコード["連結"](n + "\t"));
            }),
          );
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (i - 1) % 要素数 === 要素数 - 1;
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              lst["書く"](レコード)["改行"]();
              return (レコード = "");
            }),
          );
      }),
    );
    return this;
  });
  this["テーブル"]["CSV表示"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var 要素数;
    var 文字列;
    var レコード;
    var カラム名;
    var tmp;
    var space;
    var s;
    var 幅;
    var 文字数;
    var lst;
    var 件数;
    要素数 = this["フィールド名"]["要素数?"]();
    文字数 = this["配列"]["作る"]();
    レコード = "";
    カラム名 = "";
    this["フィールド名"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        return 文字数["書く"](this["文字数カウント"](n));
      }),
    );
    this["フィールド名"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i === 要素数;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (カラム名 = カラム名["連結"](n));
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (カラム名 = カラム名["連結"](n + ","));
            }),
          );
      }),
    );
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        tmp = this["文字数カウント"](n + "");
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return 文字数["読む"](((i - 1) % 要素数) + 1) < tmp;
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return 文字数["上書き"](((i - 1) % 要素数) + 1, tmp);
            }),
          );
      }),
    );
    幅 = 0;
    文字数["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return (幅 = 幅 + n);
      }),
    );
    件数 = this["データ"]["要素数?"]() / this["フィールド名"]["要素数?"]();
    this["リスト幅"] = this["テーブル"]["_画面幅"] / 2.5;
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return 23 + (幅 + 要素数) * 7 <= this["リスト幅"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["リスト幅"] = 23 + (幅 + 要素数) * 7);
        }),
      );
    lst = this["テキストエリア"]
      ["作る"](カラム名)
      ["大きさ"](this["リスト幅"], this["リスト高さ"])
      ["位置"](this["テーブル"]["x"], this["テーブル"]["y"]);
    this["テーブル"]["x"] = this["テーブル"]["x"] + (40 + this["リスト幅"]);
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % 要素数 === 0;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (レコード = レコード["連結"](n));
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (レコード = レコード["連結"](n + ","));
            }),
          );
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (i - 1) % 要素数 === 要素数 - 1;
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              lst["書く"](レコード)["改行"]();
              return (レコード = "");
            }),
          );
      }),
    );
    return this;
  });
  this["テーブル"]["配列から作る"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["arg"] = _rest["作る"]();
    this["field_arr"] = this["配列"]["作る"]();
    this["arg"]["それぞれ実行"](
      dtlbind(this, function (i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return this["field_arr"]["書く"](i["読む"](1));
      }),
    );
    this["要素数"] = this["arg"]["読む"](1)["要素数?"]();
    this["ret"] = this["テーブル"]["作る"](this["field_arr"]);
    dtlbind(this, function (j) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      return dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return j > 1;
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["arg"]["それぞれ実行"](
              dtlbind(this, function (n, i) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 2);
                return this["ret"]["書く"](n["読む"](j));
              }),
            );
          }),
        );
    })["繰り返す"](this["要素数"]);
    return this["ret"];
  });
  this["テーブル"]["フィールド名変更"] = dtlbind(
    this,
    function (before, after) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 2);
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["全部"]["本当"](
          after !== this["undef"],
          before !== this["undef"],
        );
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["フィールド名"]["それぞれ実行"](
              dtlbind(this, function (n, i) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 2);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return n === before;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["num"] = i);
                    }),
                  );
              }),
            );
            this["フィールド名"]["上書き"](this["num"], after);
            return (this["フィールド名"] = this["フィールド名"]);
          }),
        );
      return this;
    },
  );
  this["テーブル"]["件数"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    ret = this["テーブル"]["作る"]("件数");
    ret["書く"](
      this["データ"]["要素数?"]() / this["フィールド名"]["要素数?"](),
    );
    return ret;
  });
  this["テーブル"]["数にする"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["num"] = root["window"]["parseFloat"](this["データ"]["読む"](1));
    return this["num"];
  });
  this["テーブル"]["配列にする"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["arr"] = this["配列"]["作る"]();
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return this["arr"]["書く"](n);
      }),
    );
    return this["arr"];
  });
  this["テーブル"]["欠損値の置換"] = dtlbind(this, function (option) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return option === "0置換";
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["データ"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return n === "";
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["データ"]["上書き"](i, 0);
                  }),
                );
            }),
          );
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return option === "平均値置換";
        }),
      )
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["データ"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return n === "";
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    this["tmp"] = this["作る"]();
                    this["フィールド"] = this["フィールド名"]["読む"](
                      i % this["フィールド名"]["要素数?"](),
                    );
                    return this["データ"]["上書き"](
                      i,
                      this["平均値"](this["フィールド"])["値読み出し"](),
                    );
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
          return this["データ"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return n === "";
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    this["tmp"] = this["作る"]();
                    this["フィールド"] = this["フィールド名"]["読む"](
                      i % this["フィールド名"]["要素数?"](),
                    );
                    return this["データ"]["上書き"](
                      i,
                      this["中央値"](this["フィールド"])["値読み出し"](),
                    );
                  }),
                );
            }),
          );
        }),
      );
    return this;
  });
  this["テーブル"]["check_fn"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var args;
    var flag;
    var res;
    args = this["getarg"](_rest);
    flag = 0;
    res = this["false"];
    args["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return this["フィールド名"]["それぞれ実行"](
          dtlbind(this, function (m) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return n === m;
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (flag = flag + 1);
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
      return flag === args["要素数?"]();
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (res = this["true"]);
        }),
      );
    return res;
  });
  this["テーブル"]["check_dt"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var res;
    res = this["true"];
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (n + "")["含む?"]("[^0-9０-９\-\.]");
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (res = this["false"]);
            }),
          );
      }),
    );
    return res;
  });
  this["テーブル"]["check_arg"] = dtlbind(this, function (args, option) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    var _max;
    var flag;
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return args !== this["undef"];
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          this["arg_num"] = args["要素数?"]();
          flag = this["true"];
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return option === "freq";
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
                  return this["arg_num"] < 1;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["arg_num"] >= 2;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (_max = args["読む"](2));
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["arg_num"] >= 3;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["_min"] = args["読む"](3));
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["arg_num"] >= 4;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["階級幅"] = args["読む"](4));
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["階級幅"] !== this["undef"];
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
                        return (this["階級幅"] + "")["含む?"]("[^0-9０-９\.-]");
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
                            return (flag = this["false"]);
                          }),
                        );
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_min"] !== this["undef"];
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
                        return (this["_min"] + "")["含む?"]("[^0-9０-９\.-]");
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
                            return (flag = this["false"]);
                          }),
                        );
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return _max !== this["undef"];
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
                        return (_max + "")["含む?"]("[^0-9０-９\.-]");
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
                            return (flag = this["false"]);
                          }),
                        );
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args["読む"](1)) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return flag === this["true"];
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
                        return (
                          this["射影"](args["読む"](1))["check_dt"](
                            args["読む"](1),
                          ) === this["false"]
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
                            return (flag = this["false"]);
                          }),
                        );
                    }),
                  );
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return option === "common";
              }),
            )
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["arg_num"] < 1;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return flag === this["true"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      this["tmp"] = this["射影"](args);
                      this["str_arr"] = this["tmp"]["データ"]["選ぶ"](
                        dtlbind(this, function (n) {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 1);
                          return (n + "")["含む?"]("[^0-9０-９\.-]");
                        }),
                      );
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["str_arr"]["要素数?"]() > 0;
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
                            return flag === this["false"];
                          }),
                        );
                    }),
                  );
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return option === "common1";
              }),
            )
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["arg_num"] < 1;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args["読む"](1)) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return option === "common2";
              }),
            )
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["arg_num"] < 2;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args["読む"](1)) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args["読む"](2)) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return option === "qn1";
              }),
            )
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["arg_num"] < 1;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args["読む"](1)) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return flag === this["true"];
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
                        return (
                          this["射影"](args["読む"](1))["check_dt"](
                            args["読む"](1),
                          ) === this["false"]
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
                            return (flag = this["false"]);
                          }),
                        );
                    }),
                  );
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return option === "qn2";
              }),
            )
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["arg_num"] < 2;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args["読む"](1)) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args["読む"](2)) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return flag === this["true"];
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
                        return (
                          this["射影"](args["読む"](1))["check_dt"](
                            args["読む"](1),
                          ) === this["false"]
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
                            return (flag = this["false"]);
                          }),
                        );
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (
                          this["射影"](args["読む"](2))["check_dt"](
                            args["読む"](2),
                          ) === this["false"]
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
                            return (flag = this["false"]);
                          }),
                        );
                    }),
                  );
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return option === "qn3";
              }),
            )
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["arg_num"] < 2;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args["読む"](1)) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args["読む"](2)) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args["読む"](3)) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return flag === this["true"];
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
                        return (
                          this["射影"](args["読む"](1))["check_dt"](
                            args["読む"](1),
                          ) === this["false"]
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
                            return (flag = this["false"]);
                          }),
                        );
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (
                          this["射影"](args["読む"](2))["check_dt"](
                            args["読む"](2),
                          ) === this["false"]
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
                            return (flag = this["false"]);
                          }),
                        );
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (
                          this["射影"](args["読む"](3))["check_dt"](
                            args["読む"](2),
                          ) === this["false"]
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
                            return (flag = this["false"]);
                          }),
                        );
                    }),
                  );
              }),
            )
            ["なら"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return option === "qn";
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
                  return this["arg_num"] < 1;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["check_fn"](args) === this["false"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (flag = this["false"]);
                    }),
                  );
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return flag === this["true"];
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
                        return (
                          this["射影"](args["読む"](1))["check_dt"](
                            args["読む"](1),
                          ) === this["false"]
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
                            return (flag = this["false"]);
                          }),
                        );
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (
                          this["射影"](args["読む"](2))["check_dt"](
                            args["読む"](2),
                          ) === this["false"]
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
                            return (flag = this["false"]);
                          }),
                        );
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
          return (flag = this["false"]);
        }),
      );
    return flag;
  });
  this["テーブル"]["射影"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var fs;
    var fn;
    var ret;
    var 全数;
    fs = this["配列"]["作る"]();
    fn = this["配列"]["作る"]();
    this["要素数"] = this["フィールド名"]["要素数?"]();
    this["引数"] = this["getarg"](_rest);
    return dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["check_fn"](this["引数"]);
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          this["引数"]["それぞれ実行"](
            dtlbind(this, function (f, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return dtlbind(this, function (n) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["フィールド名"]["読む"](n) === f;
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      fs["書く"](n);
                      return fn["書く"](f);
                    }),
                  );
              })["繰り返す"](this["フィールド名"]["要素数?"]());
            }),
          );
          ret = this["テーブル"]["作る"](fn);
          this["tmp"] = this["配列"]["作る"]();
          fs["それぞれ実行"](
            dtlbind(this, function (m, j) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return this["データ"]["それぞれ実行"](
                dtlbind(this, function (n, i) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 2);
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return (i - 1) % this["要素数"] === m - 1;
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["tmp"]["書く"](n);
                      }),
                    );
                }),
              );
            }),
          );
          全数 = this["件数"]()["数にする"]();
          dtlbind(this, function (i) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            return dtlbind(this, function (j) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return ret["書く"](this["tmp"]["読む"](i + (j - 1) * 全数));
            })["繰り返す"](fs["要素数?"]());
          })["繰り返す"](全数);
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
  this["テーブル"]["選択"] = dtlbind(this, function (条件) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    var ret;
    ret = this["テーブル"]["作る"](this["フィールド名"]);
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (r, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        this["番号"] = (i - 1) % this["フィールド名"]["要素数?"]();
        this["f"] = this["フィールド名"]["読む"](this["番号"] + 1);
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (r + "")["含む?"]("[^0-9０-９\-\.]");
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["s"] =
                "" +
                this["f"] +
                "＝" +
                (34).コード文字() +
                r +
                (34).コード文字() +
                "。");
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["s"] = "" + this["f"] + "＝" + r + "。");
            }),
          );
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["s"]["含む?"]("<") === this["false"];
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["s"]["実行"]();
            }),
          );
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["全部"]["本当"](
            条件["実行"](),
            i % this["フィールド名"]["要素数?"]() === 0,
          );
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return dtlbind(this, function (n) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return ret["書く"](
                  this["データ"]["読む"](i - this["番号"] + (n - 1)),
                );
              })["繰り返す"](this["フィールド名"]["要素数?"]());
            }),
          );
      }),
    );
    return ret;
  });
  this["テーブル"]["結合"] = dtlbind(this, function (t) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    var ret;
    this["keyf"] = this["配列"]["作る"]();
    this["keyn"] = this["配列"]["作る"]();
    this["keye"] = this["配列"]["作る"]();
    this["要素数m"] = this["フィールド名"]["要素数?"]();
    this["要素数t"] = t["フィールド名"]["要素数?"]();
    dtlbind(this, function (n) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      this["f"] = this["フィールド名"]["読む"](n);
      return dtlbind(this, function (i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        this["f2"] = t["フィールド名"]["読む"](i);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["f"] === this["f2"];
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              this["kf"] = this["f"];
              this["kn"] = n;
              this["ki"] = i;
              this["keyf"]["書く"](this["f"]);
              this["keyn"]["書く"](n);
              return this["keye"]["書く"](i);
            }),
          );
      })["繰り返す"](this["要素数t"]);
    })["繰り返す"](this["要素数m"]);
    this["途中データm"] = this["射影"](this["keyf"]);
    this["途中データt"] = t["射影"](this["keyf"]);
    this["行数m"] = this["途中データm"]["件数"]()["数にする"]();
    this["行数t"] = this["途中データt"]["件数"]()["数にする"]();
    this["列数"] = this["keyf"]["要素数?"]();
    this["連結m"] = this["途中データm"]["_レコード連結"](
      this["行数m"],
      this["列数"],
    );
    this["連結t"] = this["途中データt"]["_レコード連結"](
      this["行数t"],
      this["列数"],
    );
    this["一致レコード行番号配列"] = this["配列"]["作る"]();
    this["追加予定レコード行番号配列"] = this["配列"]["作る"]();
    this["連結m"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        return this["連結t"]["それぞれ実行"](
          dtlbind(this, function (m, j) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 2);
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return "@@" + n === "@@" + m;
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  this["一致レコード行番号配列"]["書く"](i);
                  return this["追加予定レコード行番号配列"]["書く"](j);
                }),
              );
          }),
        );
      }),
    );
    this["tmp_arr"] = this["配列"]["作る"]();
    this["tmp"] = this["配列"]["作る"]();
    t["フィールド名"]["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return this["tmp"]["書く"](n);
      }),
    );
    t["フィールド名"]["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return this["keyf"]["それぞれ実行"](
          dtlbind(this, function (m) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return n === m;
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["tmp"]["消す"](n);
                }),
              );
          }),
        );
      }),
    );
    this["追加データ"] = t["射影"](this["tmp"]);
    this["fn"] = this["フィールド名"]["連結"](this["tmp"]);
    ret = this["テーブル"]["作る"](this["fn"]);
    this["一致レコード行番号配列"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        dtlbind(this, function (j) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 1);
          return ret["書く"](
            this["データ"]["読む"](
              n * this["要素数m"] + (j - 1) - (this["要素数"] - 1),
            ),
          );
        })["繰り返す"](this["要素数m"]);
        return dtlbind(this, function (j) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 1);
          this["番号"] = this["追加予定レコード行番号配列"]["読む"](i);
          return ret["書く"](
            this["追加データ"]["読む"](
              (this["番号"] - 1) *
                this["追加データ"]["フィールド名"]["要素数?"]() +
                j,
            ),
          );
        })["繰り返す"](this["追加データ"]["フィールド名"]["要素数?"]());
      }),
    );
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["全部"]["本当"](
        ret["データ"]["要素数?"]() === 0,
        this["一致レコード行番号配列"]["要素数"]() !== 0,
      );
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          this["mn"] = this["要素数?"]() / this["要素数m"];
          this["tn"] = t["要素数?"]() / this["要素数t"];
          this["time"] = 0;
          this["time2"] = 0;
          return dtlbind(this, function (cnt) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            dtlbind(this, function (i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return ret["書く"](this["データ"]["読む"](i + this["time"]));
            })["繰り返す"](this["要素数m"]);
            dtlbind(this, function (i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return ret["書く"](t["読む"](i + this["time2"]));
            })["繰り返す"](this["要素数t"]);
            this["time2"] = this["time2"] + this["要素数t"];
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["time2"] === t["要素数?"]();
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (this["time2"] = 0);
                }),
              );
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return cnt % this["tn"] === 0;
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (this["time"] = this["time"] + this["要素数m"]);
                }),
              );
          })["繰り返す"](this["mn"] * this["tn"]);
        }),
      );
    return ret;
  });
  this["テーブル"]["_レコード連結"] = dtlbind(this, function (行数, 列数) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    this["ret"] = this["配列"]["作る"]();
    dtlbind(this, function (i) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      this["tmp"] = "";
      dtlbind(this, function (j) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return j !== 列数;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["tmp"] = (this["tmp"] + "")["連結"](
                this["データ"]["読む"]((i - 1) * 列数 + j) + "＠＠",
              ));
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["tmp"] = (this["tmp"] + "")["連結"](
                this["データ"]["読む"]((i - 1) * 列数 + j) + "",
              ));
            }),
          );
      })["繰り返す"](列数);
      return this["ret"]["書く"](this["tmp"]);
    })["繰り返す"](行数);
    return this["ret"];
  });
  this["テーブル"]["行列入れ替え"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var tmp;
    var f;
    tmp = this["配列"]["作る"]();
    f = this["フィールド名"];
    this["フィールド数"] = f["要素数?"]();
    dtlbind(this, function (i) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      return tmp["書く"](this["配列"]["作る"](f["読む"](i)));
    })["繰り返す"](this["フィールド数"]);
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        this["index"] = dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % this["フィールド数"] === 0;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["フィールド数"];
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return i % this["フィールド数"];
            }),
          );
        return tmp["読む"](this["index"])["書く"](n);
      }),
    );
    tmp["それぞれ実行"](
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
              n["加工"](
                dtlbind(this, function (m) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 1);
                  return m + "";
                }),
              );
              return (this["ret"] = this["テーブル"]["作る"](n));
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["ret"]["データ"] = this["ret"]["データ"]["連結"](n));
            }),
          );
      }),
    );
    return this["ret"];
  });
  this["テーブル"]["小さい順"] = dtlbind(
    this,
    function (並び替えたいフィールド名) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      var ret;
      var res;
      return dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return 並び替えたいフィールド名 === this["undef"];
      })
        ["なら"]()
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this;
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["並び替えたいフィールド名の番号"] = 0;
            dtlbind(this, function (番号) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (
                  this["フィールド名"]["読む"](番号) ===
                  並び替えたいフィールド名
                );
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return (this["並び替えたいフィールド名の番号"] = 番号);
                  }),
                );
            })["繰り返す"](this["フィールド名"]["要素数?"]());
            this["quick"] = dtlbind(this, function (arr, num, num_f) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 3);
              var ret;
              var n;
              var p;
              var left;
              var right;
              var v;
              var p番号;
              var v番号;
              ret = arr;
              n = arr["要素数?"]();
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return n / num_f > 1;
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    p番号 = n - num_f;
                    left = this["配列"]["作る"]();
                    right = this["配列"]["作る"]();
                    dtlbind(this, function (i) {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 1);
                      var v番号;
                      v番号 = (i - 1) * num_f;
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (
                          arr["読む"](v番号 + num) < arr["読む"](p番号 + num)
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
                            return dtlbind(this, function (i) {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                1,
                              );
                              return left["書く"](arr["読む"](v番号 + i));
                            })["繰り返す"](num_f);
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
                            return dtlbind(this, function (i) {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                1,
                              );
                              return right["書く"](arr["読む"](v番号 + i));
                            })["繰り返す"](num_f);
                          }),
                        );
                    })["繰り返す"](n / num_f - 1);
                    p = this["配列"]["作る"]();
                    dtlbind(this, function (i) {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 1);
                      return p["書く"](arr["読む"](p番号 + i));
                    })["繰り返す"](num_f);
                    return (ret = this["配列"]
                      ["作る"]()
                      [
                        "連結"
                      ](this["quick"](left, num, num_f), p, this["quick"](right, num, num_f)));
                  }),
                );
              return ret;
            });
            res = this["quick"](
              this["データ"],
              this["並び替えたいフィールド名の番号"],
              this["フィールド名"]["要素数?"](),
            );
            ret = this["テーブル"]["作る"](this["フィールド名"]);
            dtlbind(this, function (n) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return ret["書く"](res["読む"](n));
            })["繰り返す"](res["要素数?"]());
            return ret;
          }),
        );
    },
  );
  this["テーブル"]["大きい順"] = dtlbind(
    this,
    function (並び替えたいフィールド名) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      var ret;
      var res;
      return dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return 並び替えたいフィールド名 === this["undef"];
      })
        ["なら"]()
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this;
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["並び替えたいフィールド名の番号"] = 0;
            dtlbind(this, function (番号) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (
                  this["フィールド名"]["読む"](番号) ===
                  並び替えたいフィールド名
                );
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return (this["並び替えたいフィールド名の番号"] = 番号);
                  }),
                );
            })["繰り返す"](this["フィールド名"]["要素数?"]());
            this["quick"] = dtlbind(this, function (arr, num, num_f) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 3);
              var ret;
              var n;
              var p;
              var left;
              var right;
              var v;
              var p番号;
              var v番号;
              ret = arr;
              n = arr["要素数?"]();
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return n / num_f > 1;
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    p番号 = n - num_f;
                    left = this["配列"]["作る"]();
                    right = this["配列"]["作る"]();
                    dtlbind(this, function (i) {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 1);
                      var v番号;
                      v番号 = (i - 1) * num_f;
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (
                          arr["読む"](v番号 + num) > arr["読む"](p番号 + num)
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
                            return dtlbind(this, function (i) {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                1,
                              );
                              return left["書く"](arr["読む"](v番号 + i));
                            })["繰り返す"](num_f);
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
                            return dtlbind(this, function (i) {
                              var self = this;
                              var 自分 = self;
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                1,
                              );
                              return right["書く"](arr["読む"](v番号 + i));
                            })["繰り返す"](num_f);
                          }),
                        );
                    })["繰り返す"](n / num_f - 1);
                    p = this["配列"]["作る"]();
                    dtlbind(this, function (i) {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 1);
                      return p["書く"](arr["読む"](p番号 + i));
                    })["繰り返す"](num_f);
                    return (ret = this["配列"]
                      ["作る"]()
                      [
                        "連結"
                      ](this["quick"](left, num, num_f), p, this["quick"](right, num, num_f)));
                  }),
                );
              return ret;
            });
            res = this["quick"](
              this["データ"],
              this["並び替えたいフィールド名の番号"],
              this["フィールド名"]["要素数?"](),
            );
            ret = this["テーブル"]["作る"](this["フィールド名"]);
            dtlbind(this, function (n) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 1);
              return ret["書く"](res["読む"](n));
            })["繰り返す"](res["要素数?"]());
            return ret;
          }),
        );
    },
  );
  this["テーブル"]["内部_重複なし"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var flag;
    this["f"] = _rest["読む"](1);
    this["arr"] = this["射影"](this["f"])["データ"]["消す"]("");
    ret = this["テーブル"]["作る"](this["f"]);
    flag = 0;
    this["arr"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        ret["データ"]["それぞれ実行"](
          dtlbind(this, function (m, j) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 2);
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return n === m;
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (flag = 1);
                }),
              );
          }),
        );
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return flag === 0;
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return ret["書く"](n);
            }),
          );
        return (flag = 0);
      }),
    );
    return ret;
  });
  this["テーブル"]["重複なし"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var flag;
    this["列数"] = this["フィールド名"]["要素数?"]();
    this["行数"] = this["データ"]["要素数?"]() / this["列数"];
    this["res"] = this["テーブル"]["作る"](this["フィールド名"]);
    this["連結データ配列"] = this["配列"]["作る"]();
    this["重複削除配列"] = this["配列"]["作る"]();
    dtlbind(this, function (i) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      this["tmp"] = "";
      dtlbind(this, function (j) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return j !== this["列数"];
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["tmp"] = (this["tmp"] + "")["連結"](
                this["読む"]((i - 1) * this["列数"] + j) + "＠＠",
              ));
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (this["tmp"] = (this["tmp"] + "")["連結"](
                this["読む"]((i - 1) * this["列数"] + j) + "",
              ));
            }),
          );
      })["繰り返す"](this["列数"]);
      return this["連結データ配列"]["書く"](this["tmp"]);
    })["繰り返す"](this["行数"]);
    this["連結データ配列"]["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["i"] === 1;
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["重複削除配列"]["書く"](n);
            }),
          )
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              flag = 0;
              this["重複削除配列"]["それぞれ実行"](
                dtlbind(this, function (m) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 1);
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return m === n;
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (flag = 1);
                      }),
                    );
                }),
              );
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return flag === 0;
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["重複削除配列"]["書く"](n);
                  }),
                );
              return (flag = 0);
            }),
          );
      }),
    );
    this["res"] = this["テーブル"]["作る"](this["フィールド名"]);
    this["重複削除配列"]["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        this["tmp"] = n["分割"]("＠＠");
        return this["tmp"]["それぞれ実行"](
          dtlbind(this, function (m) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (m + "")["含む?"]("[^0-9０-９\-\.]");
            })
              ["なら"]()
              ["そうでなければ"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["res"]["書く"](m);
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["res"]["書く"](root["window"]["parseFloat"](m));
                }),
              );
          }),
        );
      }),
    );
    return this["res"];
  });
  this["テーブル"]["追加"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["フィールド数"] = this["フィールド名"]["要素数?"]();
    this["追加数"] = _rest["要素数?"]();
    _rest["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["配列?"](n);
        })
          ["なら"]()
          ["そうでなければ"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              this["追加数"] = n["要素数?"]();
              return n["それぞれ実行"](
                dtlbind(this, function (m) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 1);
                  return this["書く"](m);
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
                return i <= this["フィールド数"];
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["書く"](n);
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
      return this["全部"]["本当"](
        this["フィールド数"] - this["追加数"] > 0,
        this["追加数"] !== 0,
      );
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
            return this["書く"]("");
          })["繰り返す"](this["フィールド数"] - this["追加数"]);
        }),
      );
    return this;
  });
  this["テーブル"]["レコード取り出し"] = dtlbind(this, function (key, num) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    var ret;
    ret = this["テーブル"]["作る"](this["フィールド名"]);
    this["要素数"] = this["フィールド名"]["要素数?"]();
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (r, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["全部"]["本当"](
            key === r,
            (i - num) % this["要素数"] === 0,
          );
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return dtlbind(this, function (j) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return ret["書く"](this["読む"](i - num + j));
              })["繰り返す"](this["要素数"]);
            }),
          );
      }),
    );
    return ret;
  });
  this["テーブル"]["集計"] = dtlbind(this, function (f, con) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    var cnt;
    this["ret"] = this["テーブル"]["作る"](f + "_集計");
    cnt = 0;
    this["arr"] = this["射影"](f);
    this["arr"]["データ"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return n === con;
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (cnt = cnt + 1);
            }),
          );
      }),
    );
    this["ret"]["書く"](cnt);
    return this["ret"];
  });
  this["テーブル"]["集計2"] = dtlbind(this, function (f1, con1, f2, con2) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 4);
    var cnt;
    this["ret"] = this["テーブル"]["作る"](f1 + "_集計");
    cnt = 0;
    this["f1_arr"] = this["射影"](f1);
    this["f2_arr"] = this["射影"](f2);
    this["要素数"] = this["f1_arr"]["フィールド名"]["要素数?"]();
    dtlbind(this, function (i) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      var v1;
      var v2;
      v1 = this["f1_arr"]["データ"]["読む"](i);
      v2 = this["f2_arr"]["データ"]["読む"](i);
      return dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["全部"]["本当"](
          v1 + "" === con1 + "",
          v2 + "" === con2 + "",
        );
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (cnt = cnt + 1);
          }),
        );
    })["繰り返す"](this["f1_arr"]["件数"]()["数にする"]());
    this["ret"]["書く"](cnt);
    return this["ret"];
  });
  this["テーブル"]["_引数設定"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["args"] = this["配列"]["作る"]();
    this["フィールド名"]["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return this["args"]["書く"](n);
      }),
    );
    this["型配列"] = this["グラフ"]["型判定"](this);
    this["型配列"]["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return this["args"]["消す"](n);
      }),
    );
    return this["args"];
  });
  this["テーブル"]["最大値"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var f1_arr;
    var args;
    var arg_num;
    var max;
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
              ret["フィールド名"]["書く"](n + "_最大値");
              f1_arr = this["射影"](n);
              f1_arr["データ"]["消す"]("");
              f1_arr["データ"]["それぞれ実行"](
                dtlbind(this, function (m, j) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 2);
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
                        return (max = m);
                      }),
                    );
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return max < m;
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (max = m);
                      }),
                    );
                }),
              );
              return ret["書く"](max);
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
  this["テーブル"]["最小値"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var f1_arr;
    var args;
    var arg_num;
    var min;
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
              ret["フィールド名"]["書く"](n + "_最大値");
              f1_arr = this["射影"](n);
              f1_arr["データ"]["消す"]("");
              f1_arr["データ"]["それぞれ実行"](
                dtlbind(this, function (m, j) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 2);
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
                        return (min = m);
                      }),
                    );
                  return dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return min > m;
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (min = m);
                      }),
                    );
                }),
              );
              return ret["書く"](min);
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
  this["テーブル"]["最頻値"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var freq_arr;
    var _max_rec;
    var args;
    var arg_num;
    var _max;
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
          _max = freq_arr["最大値"]("度数")["数にする"]();
          _max_rec = freq_arr["レコード取り出し"](_max, 2);
          this["ret"] = this["テーブル"]["作る"](
            this["f1"] + "_最頻値",
            "度数",
          );
          _max_rec["データ"]["それぞれ実行"](
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
  this["テーブル"]["合計値"] = dtlbind(this, function () {
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
              ret["フィールド名"]["書く"](n + "_合計値");
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
  this["テーブル"]["平均値"] = dtlbind(this, function () {
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
              ret["フィールド名"]["書く"](n + "_平均値");
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
  this["テーブル"]["偏差"] = dtlbind(this, function () {
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
          ret = this["テーブル"]["作る"](f1 + "_偏差");
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
  this["テーブル"]["分散"] = dtlbind(this, function () {
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
          ret = this["テーブル"]["作る"](f1 + "_分散");
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
  this["テーブル"]["不偏分散"] = dtlbind(this, function () {
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
          this["ret"] = this["テーブル"]["作る"](f1 + "_不偏分散");
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
  this["テーブル"]["共分散"] = dtlbind(this, function () {
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
          ret = this["テーブル"]["作る"](f1 + "&" + f2 + "_共分散");
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
  this["テーブル"]["不偏共分散"] = dtlbind(this, function () {
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
          ret = this["テーブル"]["作る"](f1 + "&" + f2 + "_不偏共分散");
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
  this["テーブル"]["相関係数"] = dtlbind(this, function () {
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
  this["テーブル"]["不偏共分散"] = dtlbind(this, function () {
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
          ret = this["テーブル"]["作る"](f1 + "&" + f2 + "_不偏共分散");
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
  this["テーブル"]["偏相関係数"] = dtlbind(this, function () {
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
            f1 + "&" + f2 + "&" + this["f3"] + "_偏相関係数",
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
  this["テーブル"]["標準偏差"] = dtlbind(this, function () {
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
          ret = this["テーブル"]["作る"](f1 + "_標準偏差");
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
  this["テーブル"]["不偏標準偏差"] = dtlbind(this, function () {
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
          ret = this["テーブル"]["作る"](f1 + "_不偏標準偏差");
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
  this["テーブル"]["中央値"] = dtlbind(this, function () {
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
              ret["フィールド名"]["書く"](n + "_中央値");
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
  this["テーブル"]["第1四分位数"] = dtlbind(this, function () {
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
              ret["フィールド名"]["書く"](n + "_第1四分位数");
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
  this["テーブル"]["第3四分位数"] = dtlbind(this, function () {
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
              ret["フィールド名"]["書く"](n + "_第3四分位数");
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
  this["テーブル"]["度数"] = dtlbind(this, function () {
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
          ret = this["テーブル"]["作る"](this["f1"], "度数");
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
  this["テーブル"]["度数分布"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var args;
    var arg_num;
    var 件数;
    var f1_arr;
    var _min;
    var _max;
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
                return (_max = args["読む"](2));
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
                return (_min = args["読む"](3));
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
                return (階級幅 = args["読む"](4));
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
            return _min === this["undef"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (_min = f1_arr["最小値"](f1)["数にする"]());
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return _max === this["undef"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (_max = f1_arr["最大値"](f1)["数にする"]());
              }),
            );
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return _max > _min;
          })
            ["なら"]()
            ["そうでなければ"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["min桁数"] = (_min.log() + 1).floor();
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["min桁数"] > 0;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (_min =
                        (_min / (10)["pow"](this["min桁数"] - 1)).floor() *
                        (10)["pow"](this["min桁数"] - 1));
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (_min = 0);
                    }),
                  );
                this["max桁数"] = (_max.log() + 1).floor();
                _min =
                  (_min / (10)["pow"](this["min桁数"] - 1)).floor() *
                  (10)["pow"](this["min桁数"] - 1);
                _max =
                  (_max / (10)["pow"](this["max桁数"] - 1)).ceil() *
                  (10)["pow"](this["max桁数"] - 1);
                this["sum"] = _max - _min;
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
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["sum"] > 1;
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
                            return (this["階級数"] =
                              this["sum"] /
                              (10)["pow"](this["sum"].log().floor()));
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
                            return (this["階級数"] = 10);
                          }),
                        );
                      this["桁数"] = (
                        (this["sum"] / this["階級数"]).log() + 1
                      ).floor();
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["桁数"] <= 0;
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
                            return (this["桁数"] = this["桁数"] - 1);
                          }),
                        );
                      return dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return _max >= 10;
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
                            return (階級幅 =
                              (
                                (this["sum"] / this["階級数"]) *
                                this["桁数"]
                              ).ceil() / this["桁数"]);
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
                            return (階級幅 =
                              (
                                (this["sum"] / this["階級数"]) *
                                10 *
                                this["桁数"]
                              ).ceil() /
                              (10 * this["桁数"]));
                          }),
                        );
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
                ret = this["テーブル"]["作る"]("階級", "度数");
                dtlbind(this, function (n) {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 1);
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return n !== this["階級数"];
                  })
                    ["なら"]()
                    ["そうでなければ"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["階級"]["書く"](
                          this["配列"]["作る"](
                            (((_min + 階級幅 * (n - 1)) * 100).round() / 100 +
                              "")["連結"](
                              "~" + ((_min + 階級幅 * n) * 10).round() / 10,
                            ),
                          ),
                        );
                      }),
                    )
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["階級"]["書く"](
                          this["配列"]["作る"](
                            (((_min + 階級幅 * (n - 1)) * 100).round() / 100 +
                              "")["連結"]("~" + _max),
                          ),
                        );
                      }),
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
                        return this["カウント"]["書く"](
                          _min + 階級幅 * (n - 1),
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
                          return _min + 階級幅 * (n - 1) < _max;
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
                              return this["カウント"]["書く"](
                                _min + 階級幅 * (n - 1),
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
                              return this["カウント"]["書く"](_max);
                            }),
                          );
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
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return dtlbind(this, function () {
                                var self = this;
                                var 自分 = self;
                                var _rest = Array.prototype.slice.call(
                                  arguments,
                                  0,
                                );
                                return this["全部"]["本当"](
                                  m <= n,
                                  m + 階級幅 >= n,
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
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                0,
                              );
                              return dtlbind(this, function () {
                                var self = this;
                                var 自分 = self;
                                var _rest = Array.prototype.slice.call(
                                  arguments,
                                  0,
                                );
                                return this["全部"]["本当"](
                                  m <= n,
                                  m + 階級幅 > n,
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
  this["テーブル"]["度数分布表"] = dtlbind(this, function () {
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
                return (this["_max"] = args["読む"](2));
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
                return (this["_min"] = args["読む"](3));
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
                return (this["階級幅"] = args["読む"](4));
              }),
            );
          freq = this["度数分布"](
            f1,
            this["_max"],
            this["_min"],
            this["階級幅"],
          );
          frec_sum = freq["合計値"]("度数")["数にする"]();
          frecdist_sum = 0;
          ret = this["テーブル"]["作る"]("階級", "度数", "相対度数");
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
          ret = this["テーブル"]["作る"](f1, "度数", "相対度数");
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
  this["テーブル"]["クロス集計"] = dtlbind(this, function () {
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
  this["テーブル"]["クロス集計表"] = dtlbind(this, function () {
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
          ret["フィールド名"]["書く"]("合計");
          this["カウント"]["それぞれ実行"](
            dtlbind(this, function (n, i) {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 2);
              return ret["書く"](n);
            }),
          );
          sum_array = this["配列"]["作る"]("合計");
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
  this["テーブル"]["数える"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var ret;
    var f1;
    var f1_arr;
    var _max;
    var args;
    var arg_num;
    args = this["getarg"](_rest);
    ret = this["テーブル"]["作る"]("");
    this["フィールド名"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        ret["データ"]["書く"](n);
        return args["それぞれ実行"](
          dtlbind(this, function (m, j) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 2);
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
                  return ret["フィールド名"]["書く"](m);
                }),
              );
            this["num"] = this["集計"](n, m)["数にする"]();
            return dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["num"] !== 0;
            })
              ["なら"]()
              ["そうでなければ"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return ret["データ"]["書く"](this["num"]);
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return ret["データ"]["書く"](0);
                }),
              );
          }),
        );
      }),
    );
    return ret;
  });
  this["テーブル"]["フィールド名取得"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["res"] = this["フィールド名"]["作る"]();
    return this["res"];
  });
  this["テーブル"]["抜き出す"] = dtlbind(this, function (start, end) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    var 要素数;
    var res;
    要素数 = this["フィールド名"]["要素数?"]();
    this["データ"]["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        this["行番号"] = ((i - 1) / 要素数).floor();
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
              return (res = this["テーブル"]["作る"](this["フィールド名"]));
            }),
          );
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return end === this["undef"];
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
                return this["行番号"] === start;
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return res["書く"](n);
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
                return this["全部"]["本当"](
                  this["行番号"] >= start,
                  this["行番号"] <= end,
                );
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return res["書く"](n);
                  }),
                );
            }),
          );
      }),
    );
    return res;
  });
  this["グラフ"] = this["タートル"]["作る"]()["消える"]()["図形を作る"]();
  this["グラフ"]["_間隔"] = 30;
  this["グラフ"]["_プロット幅"] = 20;
  this["グラフ"]["_原点x"] = this["テーブル"]["_画面幅"] / -2.2;
  this["グラフ"]["_原点y"] = (-1 * this["テーブル"]["_画面高さ"] * 2.8) / 10;
  this["グラフ"]["_縦幅"] = (this["テーブル"]["_画面高さ"] * 4.5) / 10;
  this["グラフ"]["_横幅"] = this["グラフ"]["_縦幅"] * 1.5;
  this["グラフ"]["_方向"] = "縦";
  this["グラフ"]["_天井"] = this["グラフ"]["_原点y"] + 30;
  this["グラフ"]["_底"] = this["グラフ"]["_原点y"] - 10;
  this["グラフ"]["_左端"] = this["グラフ"]["_原点x"] - 20;
  this["グラフ"]["_右端"] =
    this["グラフ"]["_原点x"] + this["グラフ"]["_横幅"] + 10;
  this["グラフ"]["_マーカフラグ"] = this["true"];
  this["グラフ"]["_最小メモリ"] = this["undef"];
  this["グラフ"]["_最大メモリ"] = this["undef"];
  this["グラフ"]["_横軸タイトル文"] = this["undef"];
  this["グラフ"]["_縦軸タイトル文"] = this["undef"];
  this["グラフ"]["_起点メモリ"] = 0;
  this["グラフ"]["_軸ラベルサイズ"] = 8;
  this["グラフ"]["_軸タイトルサイズ"] = 10;
  this["グラフ"]["_含む?"] = dtlbind(this, function (arr, key) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    var res;
    res = this["false"];
    arr["それぞれ実行"](
      dtlbind(this, function (n) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        return dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return n === key;
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return (res = this["true"]);
            }),
          );
      }),
    );
    return res;
  });
  this["グラフ"]["位置確定"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["グラフ"]["_原点x"] = 60 + this["グラフ"]["_原点x"];
    this["_左端"] = this["グラフ"]["_原点x"] - 30;
    return (this["_右端"] = this["グラフ"]["_原点x"] + this["_横幅"] + 10);
  });
  this["グラフ"]["型判定"] = dtlbind(this, function (data) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    this["arr"] = this["配列"]["作る"]();
    dtlbind(this, function (i) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 1);
      return dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return (data["データ"]["読む"](i) + "")["含む?"]("[^0-9.-]");
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["arr"]["書く"](data["フィールド名"]["読む"](i));
          }),
        );
    })["繰り返す"](data["フィールド名"]["要素数?"]());
    return this["arr"];
  });
  this["グラフ"]["横軸タイトル描画"] = dtlbind(this, function (option) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    var 画面パーツ;
    var 付箋;
    var 文字数;
    文字数 = this["_横軸タイトル文"]["長さ?"]();
    this["ラベル"]
      ["作る"](this["_横軸タイトル文"])
      ["文字サイズ"](this["_軸タイトルサイズ"])
      ["位置"](
        this["_左端"] + (this["_右端"] - this["_左端"]) / 2 - 文字数 * 5,
        this["_底"] - 10,
      );
    this["_底"] = this["_底"] - 3 * this["_軸タイトルサイズ"];
    return this;
  });
  this["グラフ"]["横軸タイトル"] = dtlbind(this, function (title) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return title !== this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["_横軸タイトル文"] = title);
        }),
      );
    return this;
  });
  this["グラフ"]["縦軸タイトル描画"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var 画面パーツ;
    var 付箋;
    var 文字数;
    文字数 = this["_縦軸タイトル文"]["長さ?"]();
    this["縦表示"](
      this["_縦軸タイトル文"],
      this["_左端"] - 10,
      this["_底"] + (this["_天井"] - this["_底"]) / 2 + 文字数 * 5,
      "title",
    );
    this["_左端"] = this["_左端"] - 25;
    return this;
  });
  this["グラフ"]["縦軸タイトル"] = dtlbind(this, function (title) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return title !== this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["_縦軸タイトル文"] = title);
        }),
      );
    return this;
  });
  this["グラフ"]["移動する"] = dtlbind(this, function (x, y) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    this["グラフ"]["_原点x"] = this["グラフ"]["_原点x"] + x;
    this["グラフ"]["_原点y"] = this["グラフ"]["_原点y"] + y;
    this["_左端"] = this["_左端"] + x;
    this["_右端"] = this["_右端"] + x;
    this["_天井"] = this["_天井"] + y;
    this["_底"] = this["_底"] + y;
    return this;
  });
  this["グラフ"]["位置"] = dtlbind(this, function (x, y) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    var 移動距離x;
    var 移動距離y;
    移動距離x = x - this["グラフ"]["_原点x"];
    移動距離y = y - this["グラフ"]["_原点y"];
    this["グラフ"]["_原点x"] = x;
    this["グラフ"]["_原点y"] = y;
    this["_左端"] = this["_左端"] + 移動距離x;
    this["_右端"] = this["_右端"] + 移動距離x;
    this["_天井"] = this["_天井"] + 移動距離y;
    this["_底"] = this["_底"] + 移動距離y;
    return this;
  });
  this["グラフ"]["x軸データ_multi"] = dtlbind(
    this,
    function (data_arr, option) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 2);
      var num;
      var cnt;
      var _max;
      var 付箋;
      data_arr["データ"]["それぞれ実行"](
        dtlbind(this, function (data, cnt) {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 2);
          num = (data + "")["長さ?"]();
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
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (_max = num);
              }),
            );
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return _max < num;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (_max = num);
              }),
            );
        }),
      );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return option !== "ラベルなし";
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return data_arr["データ"]["それぞれ実行"](
              dtlbind(this, function (data, cnt) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 2);
                data = data + "";
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return _max < 4;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      付箋 = this["ラベル"]
                        ["作る"](data)
                        ["文字サイズ"](this["_軸ラベルサイズ"])
                        ["位置"](
                          this["_XORIGIN"] + this["_XINTERVAL"] * cnt,
                          this["_YLOWERLIM"] - 20,
                        );
                      return (付箋["タイプ"] = "横軸ラベル");
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
                        return this["種類"] !== "ヒストグラム";
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
                            return this["etc表示"](
                              data,
                              this["_XORIGIN"] +
                                this["_XINTERVAL"] * cnt +
                                this["_XINTERVAL"] * 0.6,
                              this["_YLOWERLIM"] - 20,
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
                            return this["縦表示"](
                              data,
                              this["_XORIGIN"] +
                                this["_XINTERVAL"] * cnt +
                                this["_XINTERVAL"] * 0.6,
                              this["_YLOWERLIM"] - 20,
                              "横軸ラベル",
                            );
                          }),
                        );
                    }),
                  );
              }),
            );
          }),
        );
      this["_YLOWERLIM"] = this["_YLOWERLIM"] - 20;
      return this;
    },
  );
  this["グラフ"]["データ補正値計算"] = dtlbind(
    this,
    function (data_arr, range) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 2);
      var scale;
      var 段数;
      var up_lim;
      data_arr["それぞれ実行"](
        dtlbind(this, function (data, cnt) {
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
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_最大メモリ"] !== this["undef"];
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
                        return data > this["_最大メモリ"];
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
                            return (data = this["_最大メモリ"]);
                          }),
                        );
                    }),
                  );
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_最小メモリ"] !== this["undef"];
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
                        return data < this["_最小メモリ"];
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
                            return (data = this["_最小メモリ"]);
                          }),
                        );
                    }),
                  );
              }),
            );
          this["ab"] = data.abs();
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
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["ab__max"] = this["ab"];
                this["_min"] = data;
                return (this["_max"] = data);
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["ab__max"] < this["ab"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["ab__max"] = this["ab"]);
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["_min"] > data;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["_min"] = data);
              }),
            );
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["_max"] < data;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["_max"] = data);
              }),
            );
        }),
      );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["全部"]["本当"](
          this["_最小メモリ"] === this["undef"],
          this["_min"] >= 0,
        );
      })
        ["なら"]()
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (this["_最小メモリ"] = 0);
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (this["_最小メモリ"] = this["_min"]);
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["_最大メモリ"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (this["_最大メモリ"] = this["_max"]);
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["ab__max"] > 0;
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["digit"] = this["ab__max"].abs().log().ceil();
            this["base"] = this["ab__max"] * 1.05;
            this["place"] = (10)["pow"](this["base"].log().floor());
            this["up1_digit"] = (this["base"] / this["place"]).floor();
            scale = dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["up1_digit"] < 2;
            })
              ["なら"]()
              ["そうでなければ"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["place"] * 0.2;
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
                    return this["up1_digit"] < 5;
                  })
                    ["なら"]()
                    ["そうでなければ"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["place"] * 0.5;
                      }),
                    )
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["place"];
                      }),
                    );
                }),
              );
            段数 = (this["base"] / scale + 1).floor();
            return (this["roof"] = 段数 * scale);
          }),
        );
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["_最小メモリ"] < 0;
      })
        ["なら"]()
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["_縦幅"] = this["_縦幅"] / 1.5;
            this["_DACOL"] = range / this["roof"];
            this["_段数"] = 段数 * 2;
            this["__min"] = this["_min"];
            this["__max"] = this["_max"];
            this["_digit"] = this["digit"];
            this["_scale"] = scale / 2;
            this["_roof"] = this["roof"] / 2;
            this["グラフ"]["_原点y"] = this["グラフ"]["_原点y"] / 3;
            return (this["_DACOL"] = this["_DACOL"] / 1.5);
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["_DACOL"] = range / this["roof"];
            this["_段数"] = 段数;
            this["__min"] = this["_min"];
            this["__max"] = this["_max"];
            this["_digit"] = this["digit"];
            this["_scale"] = scale;
            return (this["_roof"] = this["roof"]);
          }),
        );
      return this["_DACOL"];
    },
  );
  this["グラフ"]["メモリ線描画"] = dtlbind(this, function (要素数) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    var ペン;
    var col;
    var 軸線;
    var i;
    this["横軸描画"] = dtlbind(this, function (i, 起点メモリ) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 2);
      this["ラベル"]
        ["作る"](this["_scale"] * i + 起点メモリ)
        ["位置"](
          this["グラフ"]["_原点x"] - this["調整"],
          this["グラフ"]["_原点y"] + (this["_縦幅"] / this["_段数"]) * i + 10,
        )
        ["文字サイズ"](this["_軸ラベルサイズ"]);
      return ペン["線の太さ"](1)
        ["線の色"](col)
        ["ペンなし"]()
        ["位置"](
          this["グラフ"]["_原点x"],
          this["グラフ"]["_原点y"] + (this["_縦幅"] / this["_段数"]) * i,
        )
        ["ペンあり"]()
        ["歩く"](this["_横幅"]);
    });
    this["縦軸描画"] = dtlbind(this, function (i, 起点メモリ) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 2);
      this["幅"] = ((this["_scale"] * i).floor() + "")["長さ?"]();
      this["ラベル"]
        ["作る"](this["_scale"] * i + 起点メモリ)
        ["位置"](
          this["グラフ"]["_原点x"] +
            (this["_横幅"] / this["_段数"]) * i -
            this["幅"] * 5,
          this["グラフ"]["_原点y"] - 10,
        )
        ["文字サイズ"](this["_軸ラベルサイズ"]);
      return ペン["線の太さ"](1)
        ["線の色"](col)
        ["ペンなし"]()
        ["位置"](
          this["グラフ"]["_原点x"] + (this["_横幅"] / this["_段数"]) * i,
          this["グラフ"]["_原点y"],
        )
        ["ペンあり"]()
        ["歩く"](this["_縦幅"]);
    });
    col = this["色"]["作る"](12434877);
    this["調整"] = this["_digit"] * 10;
    i = 0;
    this["起点メモリ"] = 0;
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
          ペン = this["タートル"]["作る"]();
          this["_左端"] = this["グラフ"]["_原点x"] - this["調整"] - 30;
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["__max"] > 0;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["起点メモリ"] = dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_最小メモリ"] > 0;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_最小メモリ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return 0;
                    }),
                  );
                i = 0;
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (
                    this["_最大メモリ"] >=
                    this["_scale"] * i + this["起点メモリ"]
                  );
                })
                  ["の間"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      this["横軸描画"]["実行"](i, this["起点メモリ"]);
                      return (i = i + 1);
                    }),
                  );
                this["横軸描画"]["実行"](i, this["起点メモリ"]);
                return (this["_天井"] =
                  this["グラフ"]["_原点y"] +
                  (this["_縦幅"] / this["_段数"]) * i);
              }),
            );
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["_最小メモリ"] < 0;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["起点メモリ"] = dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_最大メモリ"] < 0;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_最大メモリ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return 0;
                    }),
                  );
                i = 0;
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_最小メモリ"] <= this["_scale"] * i;
                })
                  ["の間"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      this["横軸描画"]["実行"](i, this["起点メモリ"]);
                      return (i = i - 1);
                    }),
                  );
                this["横軸描画"]["実行"](i, this["起点メモリ"]);
                return (this["_底"] =
                  this["グラフ"]["_原点y"] +
                  (this["_縦幅"] / this["_段数"]) * i -
                  10);
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
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          ペン = this["タートル"]["作る"]()["左回り"](90);
          this["_底"] = this["グラフ"]["_原点y"] - 40;
          this["縦軸描画"]["実行"](i, this["起点メモリ"]);
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["__max"] > 0;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["起点メモリ"] = dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_最小メモリ"] > 0;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_最小メモリ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return 0;
                    }),
                  );
                i = 1;
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_最大メモリ"] >= this["_scale"] * i;
                })
                  ["の間"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      this["縦軸描画"]["実行"](i, this["起点メモリ"]);
                      return (i = i + 1);
                    }),
                  );
                this["縦軸描画"]["実行"](i, this["起点メモリ"]);
                return (this["_右端"] =
                  this["グラフ"]["_原点x"] +
                  (this["_横幅"] / this["_段数"]) * i +
                  20);
              }),
            );
          return dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["_最小メモリ"] < 0;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["起点メモリ"] = dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_最大メモリ"] < 0;
                })
                  ["なら"]()
                  ["そうでなければ"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return this["_最大メモリ"];
                    }),
                  )
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return 0;
                    }),
                  );
                i = -1;
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_最小メモリ"] <= this["_scale"] * i;
                })
                  ["の間"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      this["縦軸描画"]["実行"](i, this["起点メモリ"]);
                      return (i = i - 1);
                    }),
                  );
                this["縦軸描画"]["実行"](i, this["起点メモリ"]);
                return (this["_左端"] =
                  this["グラフ"]["_原点x"] +
                  (this["_横幅"] / this["_段数"]) * i -
                  40);
              }),
            );
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_方向"] === "帯";
        }),
      )
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          ペン = this["タートル"]
            ["作る"]()
            ["線の太さ"](1)
            ["線の色"](col)
            ["左回り"](90);
          ペン["ペンなし"]()["位置"](
            this["グラフ"]["_原点x"],
            this["グラフ"]["_原点y"],
          );
          this["_底"] = this["グラフ"]["_原点y"] - 40;
          this["_天井"] = this["グラフ"]["_原点y"] + this["_縦幅"];
          this["メモリ"] = 0;
          this["_帯メモリ間隔"] = this["_横幅"] / 5;
          dtlbind(this, function (i) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            this["幅"] = (this["メモリ"] + "")["長さ?"]();
            this["ラベル"]
              ["作る"](this["メモリ"])
              ["文字サイズ"](this["_軸ラベルサイズ"])
              ["位置"](
                this["グラフ"]["_原点x"] +
                  this["_帯メモリ間隔"] * (i - 1) -
                  this["幅"] * 5,
                this["グラフ"]["_原点y"] - 10,
              );
            ペン["ペンあり"]()["歩く"](this["_縦幅"]);
            ペン["ペンなし"]()["位置"](
              this["グラフ"]["_原点x"] + this["_帯メモリ間隔"] * i,
              this["グラフ"]["_原点y"],
            );
            return (this["メモリ"] = this["メモリ"] + 20);
          })["繰り返す"](6);
          return (this["_右端"] =
            this["グラフ"]["_原点x"] + this["_横幅"] + 20);
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_方向"] === "散布図";
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          this["調整"] = this["_桁y"] * 10;
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["調整"] === 0;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (this["調整"] = 20);
              }),
            );
          ペン = this["タートル"]["作る"]()["線の太さ"](1)["線の色"](col);
          ペン["ペンなし"]()["位置"](
            this["グラフ"]["_原点x"],
            this["グラフ"]["_原点y"],
          );
          this["_左端"] = this["_左端"] - 20;
          this["_底"] = this["_底"] - 20;
          dtlbind(this, function (i) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["どれか"]["本当"](
                this["どれか"]["本当"](
                  this["全部"]["本当"](
                    i === 1,
                    this["_グリッド線なし"] === this["true"],
                  ),
                  this["全部"]["本当"](
                    i === this["_段数y"] + 1,
                    this["_グリッド線なし"] === this["true"],
                  ),
                ),
                this["_グリッド線なし"] === this["false"],
              );
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return ペン["ペンあり"]()["歩く"](this["_横幅"]);
                }),
              );
            ペン["ペンなし"]()["位置"](
              this["グラフ"]["_原点x"],
              this["グラフ"]["_原点y"] + (this["_横幅"] / this["_段数y"]) * i,
            );
            return this["ラベル"]
              ["作る"](this["_scaley"] * (i - 1))
              ["文字サイズ"](this["_軸ラベルサイズ"])
              ["位置"](
                this["グラフ"]["_原点x"] - this["調整"] - 10,
                this["グラフ"]["_原点y"] +
                  (this["_縦幅"] / this["_段数y"]) * (i - 1) +
                  10,
              );
          })["繰り返す"](this["_段数y"] + 1);
          ペン["ペンなし"]()
            ["位置"](this["グラフ"]["_原点x"], this["グラフ"]["_原点y"])
            ["左回り"](90);
          return dtlbind(this, function (i) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 1);
            this["幅"] = (this["_scalex"] * i + "")["長さ?"]();
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_桁x"] === 0;
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (this["幅"] = 3);
                }),
              );
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["どれか"]["本当"](
                this["どれか"]["本当"](
                  this["全部"]["本当"](
                    i === 1,
                    this["_グリッド線なし"] === this["true"],
                  ),
                  this["全部"]["本当"](
                    i === this["_段数x"] + 1,
                    this["_グリッド線なし"] === this["true"],
                  ),
                ),
                this["_グリッド線なし"] === this["false"],
              );
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return ペン["ペンあり"]()["歩く"](this["_縦幅"]);
                }),
              );
            ペン["ペンなし"]()["位置"](
              this["グラフ"]["_原点x"] + (this["_縦幅"] / this["_段数x"]) * i,
              this["グラフ"]["_原点y"],
            );
            return this["ラベル"]
              ["作る"](this["_scalex"] * (i - 1))
              ["文字サイズ"](this["_軸ラベルサイズ"])
              ["位置"](
                this["グラフ"]["_原点x"] +
                  (this["_横幅"] / this["_段数x"]) * (i - 1) -
                  this["幅"] * 5,
                this["グラフ"]["_原点y"] - 10,
              );
          })["繰り返す"](this["_段数x"] + 1);
        }),
      );
    ペン["図形を作る"]();
    ペン["消える"]();
    return this;
  });
  this["グラフ"]["縦幅設定"] = dtlbind(this, function (data_arr) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    var tmp_arr;
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
          return this["データ補正値計算"](data_arr["データ"], this["_縦幅"]);
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
          return this["データ補正値計算"](data_arr["データ"], this["_横幅"]);
        }),
      );
  });
  this["グラフ"]["横幅設定"] = dtlbind(this, function (要素数) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
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
          this["_右端"] = this["グラフ"]["_原点x"] + this["_横幅"] + 30;
          this["_プロット幅"] = (this["_横幅"] * 2) / 5 / 要素数;
          return (this["_間隔"] = (this["_横幅"] * 3) / 5 / (要素数 + 1));
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
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          this["_横幅"] = 250;
          this["_右端"] = this["グラフ"]["_原点x"] + this["_横幅"] + 30;
          this["_プロット幅"] = (this["_縦幅"] * 2) / 5 / 要素数;
          return (this["_間隔"] = (this["_縦幅"] * 3) / 5 / (要素数 + 1));
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return this["_方向"] === "帯";
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          this["_右端"] = this["グラフ"]["_原点x"] + this["_横幅"] + 30;
          this["_プロット幅"] = (this["_縦幅"] * 2) / 5 / 要素数;
          this["_間隔"] = (this["_縦幅"] * 3) / 5 / (要素数 + 1);
          return (this["_digit"] = 0);
        }),
      );
  });
  this["グラフ"]["横向き"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var tmp;
    this["_方向"] = "横";
    this["グラフ"]["_原点x"] = this["グラフ"]["_原点x"] + 250;
    this["_天井"] = this["_縦幅"] + 30;
    return this;
  });
  this["グラフ"]["メモリ範囲"] = dtlbind(this, function (最小, 最大) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 2);
    this["_範囲指定"] = this["true"];
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return 最小 !== this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["_最小メモリ"] = 最小);
        }),
      );
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return 最大 !== this["undef"];
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["_最大メモリ"] = 最大);
        }),
      );
    return this;
  });
  this["グラフ"]["補正フィールド決定"] = dtlbind(this, function (f_arr) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    var tmp;
    var _max;
    f_arr["それぞれ実行"](
      dtlbind(this, function (n, i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 2);
        tmp = this["_DATA"]["最大値"](n)["値読み出し"]();
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
              _max = tmp;
              return (this["F"] = n);
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
                return _max < tmp;
              })
                ["なら"]()
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    _max = tmp;
                    return (this["F"] = n);
                  }),
                );
            }),
          );
      }),
    );
    return this["F"];
  });
  this["グラフ"]["線形近似"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["_近似"] = this["true"];
    return this;
  });
  this["グラフ"]["マーカなし"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["_マーカフラグ"] = this["false"];
    return this;
  });
  this["グラフ"]["最小二乗法"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["_方向"] === "散布図";
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          this["標準偏差"] = this["_DATA"]
            ["標準偏差"](this["f1"])
            ["値読み出し"]();
          this["共分散"] = this["_DATA"]
            ["共分散"](this["f1"], this["f2"])
            ["値読み出し"]();
          this["x平均"] = this["_DATA"]["平均値"](this["f1"])["値読み出し"]();
          this["y平均"] = this["_DATA"]["平均値"](this["f2"])["値読み出し"]();
          this["傾き"] = this["共分散"] / this["標準偏差"]["pow"](2);
          this["切片"] = this["y平均"] - this["傾き"] * this["x平均"];
          this["x2"] = this["_横幅"] / this["_DACOLX"];
          this["y2"] = this["x2"] * this["傾き"] + this["切片"];
          this["ペン"] = this["タートル"]
            ["作る"]()
            ["ぺんなし"]()
            ["線の太さ"](1);
          this["始点x"] = this["グラフ"]["_原点x"];
          this["始点y"] =
            this["グラフ"]["_原点y"] + this["切片"] * this["_DACOLY"];
          this["終点x"] =
            this["グラフ"]["_原点x"] + this["x2"] * this["_DACOLX"];
          this["終点y"] =
            this["グラフ"]["_原点y"] + this["y2"] * this["_DACOLY"];
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["始点y"] < this["グラフ"]["_原点y"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["始点x"] =
                  (this["切片"] / (-1 * this["傾き"])) * this["_DACOLX"] +
                  this["グラフ"]["_原点x"];
                return (this["始点y"] = this["グラフ"]["_原点y"]);
              }),
            );
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["終点y"] > this["_縦幅"];
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                this["終点x"] =
                  ((this["_scaley"] * this["_段数y"] - this["切片"]) /
                    this["傾き"]) *
                    this["_DACOLX"] +
                  this["グラフ"]["_原点x"];
                return (this["終点_y"] =
                  this["_scaley"] * this["_段数y"] * this["_DACOLX"] +
                  this["グラフ"]["_原点y"]);
              }),
            );
          this["ペン"]
            ["位置"](this["始点x"], this["始点y"])
            ["ぺんあり"]()
            ["位置"](this["終点x"], this["終点y"])
            ["図形を作る"](this["青"]);
          this["傾き"] =
            ((this["共分散"] / this["標準偏差"]["pow"](2)) * 10000).round() /
            10000;
          this["切片"] =
            ((this["y平均"] - this["傾き"] * this["x平均"]) * 10000).round() /
            10000;
          this["ラベル"]
            ["作る"]("y=" + this["傾き"] + "x+" + this["切片"])
            ["文字サイズ"](this["_軸ラベルサイズ"] - 4)
            ["位置"](
              this["グラフ"]["_原点x"] + this["x2"] * this["_DACOLX"] + 10,
              this["グラフ"]["_原点y"] + this["y2"] * this["_DACOLY"] + 5,
            );
          this["ペン"]["消える"]();
          this["式の長さ"] = ("y=" + this["傾き"] + "x+" + this["切片"])[
            "長さ?"
          ]();
          this["_右端"] =
            this["グラフ"]["_原点x"] +
            this["_横幅"] +
            40 +
            this["式の長さ"] * 10;
          this["テーブル"]["x"] = this["_右端"];
          return this["ラベル"]["作る"]("    ")["位置"](this["_右端"], 0);
        }),
      );
    return this;
  });
  this["グラフ"]["グリッド線なし"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    this["_グリッド線なし"] = this["true"];
    return this;
  });
  this["グラフ"]["縦軸間隔"] = dtlbind(this, function (val) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    this["グラフ"]["_YSCALE"] = val;
    return this;
  });
  this["グラフ"]["画像にする"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["_底"] < (-1 * this["テーブル"]["_画面高さ"]) / 2;
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["_底"] = (-1 * this["テーブル"]["_画面高さ"]) / 2);
        }),
      );
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["_天井"] > this["テーブル"]["_画面高さ"] / 2;
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["_天井"] = this["テーブル"]["_画面高さ"] / 2);
        }),
      );
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["_右端"] > this["テーブル"]["_画面幅"] / 2;
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["_右端"] = this["テーブル"]["_画面幅"] / 2);
        }),
      );
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return this["_左端"] < (-1 * this["テーブル"]["_画面幅"]) / 2;
    })
      ["なら"]()
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["_左端"] = (-1 * this["テーブル"]["_画面幅"]) / 2);
        }),
      );
    this["システム"]["capture"](
      this["_左端"],
      this["_天井"],
      this["_右端"] - this["_左端"],
      (this["_天井"] - this["_底"]).abs(),
    );
    return this;
  });
  this["グラフ"]["縦表示"] = dtlbind(
    this,
    function (文字列, x, y, option, long) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 5);
      var 文字数;
      var _SIZE;
      var 調整;
      文字列 = 文字列 + "";
      文字数 = 文字列["長さ?"]();
      調整 = 12;
      _SIZE = 0;
      dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return option === "title";
      })
        ["なら"]()
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            _SIZE = this["_軸タイトルサイズ"];
            return (調整 = 18);
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (_SIZE = this["_軸ラベルサイズ"] - 4);
          }),
        );
      dtlbind(this, function (i) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        this["tmp"] = this["配列"]["作る"](文字列["部分"](i, 1));
        return this["tmp"]["それぞれ実行"](
          dtlbind(this, function (n, j) {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 2);
            this["付箋"] = this["ラベル"]
              ["作る"](n)
              ["位置"](x, y - 調整 * i)
              ["文字サイズ"](_SIZE);
            return (this["付箋"]["タイプ"] = "縦軸タイトル");
          }),
        );
      })["繰り返す"](文字数);
      return dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return long !== this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (this["_底"] = y - long);
          }),
        );
    },
  );
  this["グラフ"]["着色"] = dtlbind(this, function (i) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 1);
    dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      return i % 8 === 1;
    })
      ["なら"]()
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["col"] = this["色"]["作る"](5789946));
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % 8 === 2;
        }),
      )
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["col"] = this["色"]["作る"](11119093));
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % 8 === 3;
        }),
      )
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["col"] = this["色"]["作る"](11138546));
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % 8 === 4;
        }),
      )
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["col"] = this["色"]["作る"](11138473));
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % 8 === 5;
        }),
      )
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["col"] = this["色"]["作る"](15922601));
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % 8 === 6;
        }),
      )
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["col"] = this["色"]["作る"](16109737));
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % 8 === 7;
        }),
      )
      ["そうでなければ"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["col"] = this["色"]["作る"](16099753));
        }),
      )
      ["なら"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return i % 8 === 0;
        }),
      )
      ["実行"](
        dtlbind(this, function () {
          var self = this;
          var 自分 = self;
          var _rest = Array.prototype.slice.call(arguments, 0);
          return (this["col"] = this["色"]["作る"](16406616));
        }),
      );
    return this["col"];
  });
  this["グラフ"]["初期化"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    return (this["_底"] = this["グラフ"]["_原点y"]);
  });
  this["テーブル"]["棒グラフ"] = dtlbind(this, function () {
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
      this["初期化"]();
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
              dtlbind(this, function (n, i) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 2);
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_含む?"](this["f2"], n) === this["true"];
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
                        return n !== this["_DATA"]["フィールド名"]["読む"](1);
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
                            return this["x軸データ_multi"](
                              this["_DATA"]["射影"](n),
                            );
                          }),
                        );
                      return (this["f2"] = this["f2"]["消す"](n));
                    }),
                  );
              }),
            );
          }),
        );
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
              ["位置"](
                this["グラフ"]["_原点x"] + this["_間隔"],
                this["グラフ"]["_原点y"],
              )
              ["左回り"](90)
              ["ぺんあり"]();
            this["ラベルx"] =
              this["グラフ"]["_原点x"] +
              this["_間隔"] +
              this["もとのプロット幅"] / 2 -
              this["_軸ラベルサイズ"] / 2;
            this["ラベルy"] = this["グラフ"]["_原点y"];
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
                    return n === "";
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (n = 0);
                      }),
                    );
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
                              this["横軸ラベル"] = this["data_x"]["読む"](i);
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
                                this["もとのプロット幅"] * this["ラベル数"]);
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
                ](this["グラフ"]["_原点x"] + this["_間隔"] + this["_プロット幅"] * j, this["グラフ"]["_原点y"]);
            })["繰り返す"](this["系列数"]);
            return (this["_底"] = this["_底"] - 13 * this["最大長"]);
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
              ["位置"](
                this["グラフ"]["_原点x"],
                this["グラフ"]["_原点y"] + this["_間隔"],
              )
              ["ぺんあり"]();
            this["ラベルx"] = this["グラフ"]["_原点x"] - 10;
            this["ラベルy"] =
              this["グラフ"]["_原点y"] +
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
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return n === "";
                  })
                    ["なら"]()
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return (n = 0);
                      }),
                    );
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
                ](this["グラフ"]["_原点x"], this["グラフ"]["_原点y"] + this["_間隔"] + this["_プロット幅"] * j);
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
                    ["位置"](this["グラフ"]["_原点x"], this["_底"] - 5);
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["ペン"]
                    ["ペンなし"]()
                    ["位置"](this["グラフ"]["_原点x"], this["_底"] - 10);
                }),
              );
            this["系列ラベルx"] = this["グラフ"]["_原点x"] + 10;
            this["系列ラベルy"] = this["_底"] + 7;
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
                ["移動する"](this["系列名長"] * 12 + 16, 0);
              return (this["系列ラベルx"] =
                this["系列ラベルx"] + (this["系列名長"] * 12 + 16));
            })["繰り返す"](this["系列数"]);
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["_右端"] < this["系列ラベルx"];
            })
              ["なら"]()
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return (this["_右端"] = this["系列ラベルx"]);
                }),
              );
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
            return this["縦軸タイトル"]("");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["グラフ"]["_原点x"] = this["_右端"] + 60;
      this["_最小メモリ"] = this["undef"];
      return this;
    });
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
  this["テーブル"]["ヒストグラム"] = dtlbind(
    this,
    function (f2, _max, _min, 階級幅) {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 4);
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
        ["そうでなければ"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            this["_ヒストグラム"]["_DATA"] = this["度数分布"](
              this["_ヒストグラム"]["f2"],
              _max,
              _min,
              階級幅,
            );
            this["_ヒストグラム"]["f1"] = "階級";
            return (this["_ヒストグラム"]["f2"] = "度数");
          }),
        )
        ["なら"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["_ヒストグラム"]["f2"] === this["undef"];
          }),
        )
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return (this["_ヒストグラム"]["f2"] = "度数");
          }),
        );
      this["_ヒストグラム"]["描画"] = dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        this["位置確定"]();
        this["初期化"]();
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
                ["位置"](
                  this["グラフ"]["_原点x"] + this["_間隔"],
                  this["グラフ"]["_原点y"],
                )
                ["左回り"](90)
                ["ぺんあり"]();
              this["ラベルx"] = this["グラフ"]["_原点x"] + this["_間隔"];
              this["ラベルy"] = this["グラフ"]["_原点y"] - 20;
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
                ["位置"](
                  this["グラフ"]["_原点x"],
                  this["グラフ"]["_原点y"] + this["_間隔"],
                )
                ["ぺんあり"]();
              this["ラベルx"] = this["グラフ"]["_原点x"] - 15;
              this["ラベルy"] = this["グラフ"]["_原点y"] + this["_間隔"];
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
                      ["位置"](this["グラフ"]["_原点x"], this["_底"] - 5);
                  }),
                )
                ["実行"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return this["ペン"]
                      ["ペンなし"]()
                      ["位置"](this["グラフ"]["_原点x"], this["_底"] - 10);
                  }),
                );
              this["系列ラベルx"] = this["グラフ"]["_原点x"] + 10;
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
          return this["_横軸タイトル文"] === this["undef"];
        })
          ["なら"]()
          ["実行"](
            dtlbind(this, function () {
              var self = this;
              var 自分 = self;
              var _rest = Array.prototype.slice.call(arguments, 0);
              return this["横軸タイトル"]("階級");
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
              return this["縦軸タイトル"]("度数");
            }),
          );
        this["縦軸タイトル描画"]();
        this["横軸タイトル描画"]();
        this["グラフ"]["_原点x"] = this["_右端"] + 60;
        this["_最小メモリ"] = this["undef"];
        return this;
      });
      return dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 0);
        return this["どれか"]["本当"](
          this["_ヒストグラム"]["f2"] === this["undef"],
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
    },
  );
  this["テーブル"]["積み上げ棒グラフ"] = dtlbind(this, function () {
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
      this["初期化"]();
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
      this["描画用データ"] = this["_DATA"]
        ["射影"](this["f2"]["挿入"](1, this["f1"]))
        ["行列入れ替え"]();
      this["f2"]["位置で消す"](1);
      this["正高さ配列"] = this["配列"]["作る"]();
      this["負高さ配列"] = this["配列"]["作る"]();
      this["横幅設定"](this["フィールド数"]);
      this["縦幅設定"](this["データ補正用配列"]);
      this["メモリ線描画"](this["フィールド数"]);
      this["ペン"] = this["タートル"]["作る"]()["線の太さ"](1);
      this["ペン"]
        ["ぺんなし"]()
        ["位置"](
          this["グラフ"]["_原点x"] + this["_間隔"],
          this["グラフ"]["_原点y"],
        )
        ["左回り"](90);
      this["ラベルx"] =
        this["グラフ"]["_原点x"] + this["_間隔"] + this["_プロット幅"] / 2;
      this["ラベルy"] = this["グラフ"]["_原点y"] - 10;
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
                this["正高さ配列"]["書く"](0);
                return this["負高さ配列"]["書く"](0);
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
          [
            "位置"
          ](this["グラフ"]["_原点x"] + this["_間隔"], this["グラフ"]["_原点y"]);
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
              ["位置"](this["グラフ"]["_原点x"], this["_底"] - 10);
            this["系列ラベルx"] = this["グラフ"]["_原点x"] + 10;
            this["系列ラベルy"] = this["_底"] + 10;
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
            return this["横軸タイトル"]("項目");
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
            return this["縦軸タイトル"]("");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["グラフ"]["_原点x"] = this["_右端"] + 60;
      this["_最小メモリ"] = this["undef"];
      return this;
    });
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
  this["テーブル"]["折れ線グラフ"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var _max;
    var _maxf;
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
            this["_DATA"]["フィールド名"]["それぞれ実行"](
              dtlbind(this, function (n) {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 1);
                return this["f2"]["書く"](n);
              }),
            );
            return this["f2"]["位置で消す"](1);
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
      this["ラベル数"] = (this["要素数"] / 32).ceil();
      this["横幅設定"](this["要素数"]);
      this["縦幅設定"](this["data_y"]);
      this["メモリ線描画"](this["要素数"]);
      this["ペン"] = this["タートル"]["作る"]()["線の太さ"](2);
      this["ラベルx"] = this["グラフ"]["_原点x"] + this["_間隔"];
      this["ラベルy"] = this["グラフ"]["_原点y"] - 10;
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
                  this["y1"] =
                    (n - this["_起点メモリ"]) * this["_DACOL"] +
                    this["グラフ"]["_原点y"];
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
                    this["グラフ"]["_原点x"] +
                    this["_間隔"] +
                    this["_プロット幅"] / 2;
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
                  n =
                    (n - this["_起点メモリ"]) * this["_DACOL"] +
                    this["グラフ"]["_原点y"];
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
                        return dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return this["_マーカフラグ"];
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
                              return this["ペン"]
                                ["ペンあり"]()
                                ["角形"](4, 8)
                                ["図形にする"](this["着色"](j))
                                ["移動する"](-2, 5);
                            }),
                          );
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
                        return dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return this["_マーカフラグ"];
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
                              return this["ペン"]
                                ["ペンあり"]()
                                ["角形"](4, 8)
                                ["図形にする"](this["着色"](j))
                                ["移動する"](-2, 5);
                            }),
                          );
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
                    (-1 * this["y1"]) /
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
                        return dtlbind(this, function () {
                          var self = this;
                          var 自分 = self;
                          var _rest = Array.prototype.slice.call(arguments, 0);
                          return this["_マーカフラグ"];
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
                                ["ペンあり"]()
                                ["角形"](4, 8)
                                ["図形にする"](this["着色"](j))
                                ["移動する"](-2, 5);
                              return this["ペン"]
                                ["ぺんあり"]()
                                [
                                  "位置"
                                ](this["x軸交点"], this["グラフ"]["_原点y"])
                                ["図形を作る"](this["着色"](j));
                            }),
                          );
                      }),
                    )
                    ["実行"](
                      dtlbind(this, function () {
                        var self = this;
                        var 自分 = self;
                        var _rest = Array.prototype.slice.call(arguments, 0);
                        return this["ペン"]
                          ["ぺんなし"]()
                          ["位置"](this["x軸交点"], this["グラフ"]["_原点y"]);
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
            this["ペン"]
              ["ペンなし"]()
              ["位置"](this["グラフ"]["_原点x"], this["_底"] - 12);
            this["系列ラベルx"] = this["グラフ"]["_原点x"] + 10;
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
                ["移動する"](this["系列名長"] * 16 + 16, 0);
              return (this["系列ラベルx"] =
                this["系列ラベルx"] + (this["系列名長"] * 16 + 16));
            })["繰り返す"](this["系列数"]);
            return (this["_底"] = this["_底"] - 20);
          }),
        );
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
            return this["縦軸タイトル"]("");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["グラフ"]["_原点x"] = this["_右端"] + 60;
      this["ペン"]["消える"]();
      this["_最小メモリ"] = this["undef"];
      return this;
    });
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
  this["テーブル"]["円グラフ"] = dtlbind(this, function (f2) {
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
      this["r"] = this["グラフ"]["_縦幅"] / 2;
      this["x"] = 90;
      this["x_pos"] = this["r"] + 20;
      this["y_pos"] = -1 * this["r"];
      this["_円原点x"] = this["グラフ"]["_原点x"] + this["r"];
      this["_円原点y"] = this["グラフ"]["_原点y"] + this["r"] / 2;
      this["d_arr"] = this["_DATA"]["小さい順"](f2)["射影"](f2);
      this["sum"] = this["d_arr"]["合計値"](f2)["値読み出し"]();
      this["add"] = 0;
      this["_左端"] = this["_円原点x"] - this["r"] - 20;
      this["_天井"] = this["_円原点y"] + this["r"] + 30;
      this["_底"] = this["_円原点y"] + this["y_pos"] - 20;
      this["要素数"] = this["d_arr"]["データ"]["要素数?"]();
      this["_max_length"] = 1;
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
                this["チーズ"]["位置"](this["_円原点x"], this["_円原点y"]);
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
                          this["_円原点x"] +
                            (this["r"] / 3) *
                              2 *
                              (this["x"] - this["long"] / 2).cos() -
                            5,
                          this["_円原点y"] +
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
                          this["_円原点x"] +
                            (this["r"] / 4) *
                              5 *
                              (this["x"] - this["long"] / 2).cos() -
                            5,
                          this["_円原点y"] +
                            (this["r"] / 4) *
                              5 *
                              (this["x"] - this["long"] / 2).sin(),
                        )
                        ["文字サイズ"](this["_軸ラベルサイズ"] - 5);
                      return this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["_円原点x"] +
                            (this["r"] / 4) *
                              5 *
                              (this["x"] - this["long"] / 2).cos() +
                            5,
                          this["_円原点y"] +
                            (this["r"] / 4) *
                              5 *
                              (this["x"] - this["long"] / 2).sin() -
                            25,
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["_円原点x"] +
                            this["r"] * (this["x"] - this["long"] / 2).cos(),
                          this["_円原点y"] +
                            this["r"] * (this["x"] - this["long"] / 2).sin(),
                        )
                        ["図形を作る"](this["黒"]);
                    }),
                  );
                this["ペン"]
                  ["ペンなし"]()
                  ["位置"](
                    this["_円原点x"] + this["x_pos"],
                    this["_円原点y"] + this["y_pos"],
                  )
                  ["ペンあり"]()
                  ["角形"](10, 4)
                  ["図形を作る"](this["col"]);
                this["A"] = this["ラベル"]
                  ["作る"](this["D_f1"]["データ"]["読む"](j))
                  ["位置"](
                    this["_円原点x"] + this["x_pos"] + 15,
                    this["_円原点y"] + this["y_pos"] + 10,
                  )
                  ["文字サイズ"](this["_軸ラベルサイズ"]);
                this["ラベル"]
                  ["作る"]("　" + this["d_arr"]["読む"](j) + "件")
                  ["位置"](
                    this["_円原点x"] + this["x_pos"] + 15 + this["A"]["幅?"](),
                    this["_円原点y"] + this["y_pos"] + 10,
                  )
                  ["文字サイズ"](this["_軸ラベルサイズ"]);
                this["y_pos"] = this["y_pos"] + 20;
                this["sum_length"] =
                  (this["D_f1"]["データ"]["読む"](j) + "")["長さ?"]() +
                  ("    " + this["d_arr"]["読む"](j) + "件")["長さ?"]();
                return dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return this["_max_length"] < this["sum_length"];
                })
                  ["なら"]()
                  ["実行"](
                    dtlbind(this, function () {
                      var self = this;
                      var 自分 = self;
                      var _rest = Array.prototype.slice.call(arguments, 0);
                      return (this["_max_length"] = this["sum_length"]);
                    }),
                  );
              }),
            );
        }),
      );
      this["_右端"] =
        this["_円原点x"] + this["x_pos"] + 15 * this["_max_length"];
      this["グラフ"]["_原点x"] = this["_右端"] + 60;
      this["ペン"]["消える"]();
      this["_最小メモリ"] = this["undef"];
      return this;
    });
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
  this["テーブル"]["帯グラフ"] = dtlbind(this, function () {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 0);
    var 補正;
    this["_帯グラフ"] = this["グラフ"]["作る"]();
    this["_帯グラフ"]["_DATA"] = this;
    this["_帯グラフ"]["f1"] = this["フィールド名"]["読む"](1);
    this["_帯グラフ"]["joint_pos"] = this["配列"]["作る"]();
    this["_帯グラフ"]["f2"] = this["getarg"](_rest);
    this["_帯グラフ"]["_帯長さ"] = this["_帯グラフ"]["_横幅"] / 100;
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
      this["描画用データ"] = this["_DATA"]
        ["射影"](this["f2"]["挿入"](1, this["f1"]))
        ["行列入れ替え"]();
      this["f2"]["位置で消す"](1);
      this["横幅設定"](this["フィールド数"]);
      this["メモリ線描画"](this["フィールド数"]);
      this["_プロット幅"] = this["_プロット幅"];
      this["ペン"]
        ["ぺんなし"]()
        [
          "位置"
        ](this["グラフ"]["_原点x"], this["グラフ"]["_原点y"] + this["_間隔"]);
      this["ラベルx"] = this["グラフ"]["_原点x"] - 10;
      this["ラベルy"] =
        this["グラフ"]["_原点y"] +
        (this["_間隔"] + this["_プロット幅"] / 2 + this["_軸ラベルサイズ"]);
      this["割合ラベルy"] =
        this["グラフ"]["_原点y"] +
        (this["_間隔"] + this["_プロット幅"] / 2 + this["_軸ラベルサイズ"]);
      dtlbind(this, function (j) {
        var self = this;
        var 自分 = self;
        var _rest = Array.prototype.slice.call(arguments, 1);
        this["data_y"] = this["描画用データ"]["射影"](
          this["data_x"]["読む"](j) + "",
        );
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
                return this["横の位置配列"]["書く"](0);
              }),
            );
          n = this["data_y"]["データ"]["読む"](i);
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return n === "";
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return (n = 0);
              }),
            );
          this["val"] = this["f2"]["読む"](i);
          this["メモリ調整"] = (this["val"] + "")["長さ?"]() * 12;
          this["割合"] = ((n / this["合計"]) * 1000).round() / 10;
          this["ペン"]
            ["ペンなし"]()
            ["移動する"](this["横の位置配列"]["読む"](i), 0);
          this["ペン"]
            ["ペンあり"]()
            ["歩く"](this["_帯長さ"] * this["割合"])
            ["左回り"](90)
            ["歩く"](this["_プロット幅"])
            ["左回り"](90)
            ["歩く"](this["_帯長さ"] * this["割合"])
            ["左回り"](180)
            ["図形にする"](this["着色"](j));
          this["ペン"]["ペンなし"]()["移動する"](0, this["_間隔"]);
          this["ペン"]
            ["ペンなし"]()
            ["移動する"](-1 * this["横の位置配列"]["読む"](i), 0);
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["割合"] !== 0;
          })
            ["なら"]()
            ["実行"](
              dtlbind(this, function () {
                var self = this;
                var 自分 = self;
                var _rest = Array.prototype.slice.call(arguments, 0);
                return this["ラベル"]
                  ["作る"](this["割合"] + "%")
                  ["位置"](
                    this["グラフ"]["_原点x"] +
                      this["横の位置配列"]["読む"](i) +
                      (this["_帯長さ"] * this["割合"]) / 2 -
                      10,
                    this["割合ラベルy"],
                  )
                  ["文字サイズ"](this["_軸ラベルサイズ"] - 3);
              }),
            );
          this["横の位置配列"]["上書き"](
            i,
            this["横の位置配列"]["読む"](i) + this["_帯長さ"] * this["割合"],
          );
          this["割合ラベルy"] =
            this["割合ラベルy"] + (this["_間隔"] + this["_プロット幅"]);
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
        this["割合ラベルy"] =
          this["グラフ"]["_原点y"] +
          (this["_間隔"] + this["_プロット幅"] / 2 + this["_軸ラベルサイズ"]);
        this["ペン"]
          ["ぺんなし"]()
          [
            "位置"
          ](this["グラフ"]["_原点x"], this["グラフ"]["_原点y"] + this["_間隔"]);
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
                  this["ペン2"] = this["タートル"]
                    ["作る"]()
                    ["線の色"](this["色"]["作る"](12434877));
                  return this["ペン2"]
                    ["線の色"](this["赤"])
                    ["ペンなし"]()
                    ["位置"](
                      this["グラフ"]["_原点x"] + n,
                      this["グラフ"]["_原点y"] +
                        this["_間隔"] +
                        this["_プロット幅"],
                    );
                }),
              )
              ["実行"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  this["ペン2"]
                    ["線の色"](this["色"]["作る"](12434877))
                    ["ペンあり"]()
                    ["位置"](
                      this["グラフ"]["_原点x"] + n,
                      this["グラフ"]["_原点y"] +
                        (this["_間隔"] + this["_プロット幅"]) * i -
                        this["_プロット幅"],
                    )
                    ["図形を作る"]();
                  return this["ペン2"]
                    ["ペンなし"]()
                    ["移動する"](0, this["_プロット幅"])
                    ["消える"]();
                }),
              );
          }),
        );
        return this["ペン"]
          ["ぺんなし"]()
          [
            "位置"
          ](this["グラフ"]["_原点x"], this["グラフ"]["_原点y"] + this["_間隔"]);
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
              ["位置"](this["グラフ"]["_原点x"], this["_底"] - 5);
            this["系列ラベルx"] = this["グラフ"]["_原点x"] + 10;
            this["系列ラベルy"] = this["_底"] + 7;
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
              this["ラベル"]
                ["作る"](this["系列名"])
                ["位置"](this["系列ラベルx"], this["系列ラベルy"])
                ["文字サイズ"](this["_軸ラベルサイズ"] - 2);
              this["ペン"]
                ["ペンなし"]()
                ["移動する"](this["系列名長"] * 12 + 16, 0);
              return (this["系列ラベルx"] =
                this["系列ラベルx"] + (this["系列名長"] * 12 + 16));
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
            return this["縦軸タイトル"]("");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["グラフ"]["_原点x"] = this["_右端"] + 60;
      this["_最小メモリ"] = this["undef"];
      return this;
    });
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
  this["テーブル"]["散布図"] = dtlbind(this, function (f1, f2, flag) {
    var self = this;
    var 自分 = self;
    var _rest = Array.prototype.slice.call(arguments, 3);
    this["_散布図"] = this["グラフ"]["作る"]();
    this["_散布図"]["_DATA"] = this;
    this["_散布図"]["f1"] = f1;
    this["_散布図"]["f2"] = f2;
    this["_散布図"]["_方向"] = "散布図";
    this["_散布図"]["_グリッド線なし"] = this["false"];
    this["_散布図"]["_横幅"] = this["グラフ"]["_縦幅"];
    this["_散布図"]["_縦幅"] = this["グラフ"]["_縦幅"];
    this["_散布図"]["_天井"] =
      this["_散布図"]["_原点y"] + this["_散布図"]["_横幅"];
    this["_散布図"]["_原点y"] = this["_散布図"]["_原点y"] - 10;
    this["_散布図"]["描画"] = dtlbind(this, function () {
      var self = this;
      var 自分 = self;
      var _rest = Array.prototype.slice.call(arguments, 0);
      this["位置確定"]();
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
              this["グラフ"]["_原点x"] + val * this["_DACOLX"],
              this["data_y"]["データ"]["読む"](cnt) * this["_DACOLY"] +
                this["グラフ"]["_原点y"] +
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
        return this["_横軸タイトル文"] === this["undef"];
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
        return this["_縦軸タイトル文"] === this["undef"];
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
      this["グラフ"]["_原点x"] = this["_右端"] + 60;
      this["_最小メモリ"] = this["undef"];
      return this;
    });
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
  return (this["テーブル"]["箱ひげ図"] = dtlbind(this, function (f1, f2) {
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
                                this["ペン"]
                                  ["ペンなし"]()
                                  ["位置"](
                                    this["グラフ"]["_原点x"] +
                                      (this["_間隔"] + this["_プロット幅"]) *
                                        cnt -
                                      this["_プロット幅"] +
                                      this["_プロット幅"] / 2,
                                    this["グラフ"]["_原点y"] +
                                      n * this["_DACOL"],
                                  )
                                  ["ぺんあり"]()
                                  ["円"](3);
                                return this["tmp3"]["データ"]["消す"](n);
                              }),
                            );
                        }),
                      );
                      this["_max"] = this["tmp3"]["最大値"](f2)["値読み出し"]();
                      this["_min"] = this["tmp3"]["最小値"](f2)["値読み出し"]();
                      this["ペン"]
                        ["ぺんなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2 -
                            20 / (2).sqrt() / 2,
                          this["グラフ"]["_原点y"] +
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
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2 -
                            20 / (2).sqrt() / 2,
                          this["グラフ"]["_原点y"] +
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
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                          this["グラフ"]["_原点y"] +
                            this["_max"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                          this["グラフ"]["_原点y"] +
                            this["qua3"] * this["_DACOL"],
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                          this["グラフ"]["_原点y"] +
                            this["qua1"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                          this["グラフ"]["_原点y"] +
                            this["_min"] * this["_DACOL"],
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["グラフ"]["_原点y"] +
                            this["qua3"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["グラフ"]["_原点y"] +
                            this["qua1"] * this["_DACOL"],
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt,
                          this["グラフ"]["_原点y"] +
                            this["qua3"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt,
                          this["グラフ"]["_原点y"] +
                            this["qua1"] * this["_DACOL"],
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["グラフ"]["_原点y"] +
                            this["qua3"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["グラフ"]["_原点y"] +
                            this["qua2"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["グラフ"]["_原点y"] +
                            this["qua1"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["グラフ"]["_原点y"] +
                            this["_max"] * this["_DACOL"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                          this["グラフ"]["_原点y"] +
                            this["_min"] * this["_DACOL"],
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
                                        -1 * (this["長"] - 3) * 2);
                                    }),
                                  );
                                return this["ラベル"]
                                  ["作る"](n)
                                  ["文字サイズ"](this["_軸ラベルサイズ"])
                                  ["位置"](
                                    this["グラフ"]["_原点x"] +
                                      (this["_間隔"] + this["_プロット幅"]) *
                                        i -
                                      this["_プロット幅"] / 2 -
                                      this["長"] * 5,
                                    this["グラフ"]["_原点y"] - 10,
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
                                    this["グラフ"]["_原点x"] +
                                      n * this["_DACOL"],
                                    this["グラフ"]["_原点y"] +
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
                      this["_max"] = this["tmp3"]["最大値"](f2)["値読み出し"]();
                      this["_min"] = this["tmp3"]["最小値"](f2)["値読み出し"]();
                      this["ペン"]
                        ["ぺんなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["ave"] * this["_DACOL"] -
                            20 / (2).sqrt() / 2,
                          this["グラフ"]["_原点y"] +
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
                          this["グラフ"]["_原点x"] +
                            this["ave"] * this["_DACOL"] +
                            20 / (2).sqrt() / 2,
                          this["グラフ"]["_原点y"] +
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
                          this["グラフ"]["_原点x"] +
                            this["_max"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["qua3"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["qua1"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["_min"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"] +
                            this["_プロット幅"] / 2,
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["qua3"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["qua1"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["qua3"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt,
                        )
                        ["ペンあり"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["qua1"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt,
                        );
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["qua3"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["qua2"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["qua1"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["_max"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
                            (this["_間隔"] + this["_プロット幅"]) * cnt -
                            this["_プロット幅"],
                        )
                        ["ペンあり"]()
                        ["歩く"](this["_プロット幅"]);
                      this["ペン"]
                        ["ペンなし"]()
                        ["位置"](
                          this["グラフ"]["_原点x"] +
                            this["_min"] * this["_DACOL"],
                          this["グラフ"]["_原点y"] +
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
                                        -1 * (this["長"] - 3) * 2);
                                    }),
                                  );
                                return this["ラベル"]
                                  ["作る"](n)
                                  ["文字サイズ"](this["_軸ラベルサイズ"])
                                  ["位置"](
                                    this["グラフ"]["_原点x"] -
                                      20 +
                                      this["長"] -
                                      this["長"] * 10,
                                    this["グラフ"]["_原点y"] +
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
        return this["_横軸タイトル文"] === this["undef"];
      })
        ["なら"]()
        ["実行"](
          dtlbind(this, function () {
            var self = this;
            var 自分 = self;
            var _rest = Array.prototype.slice.call(arguments, 0);
            return this["横軸タイトル"]("項目");
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
            return this["縦軸タイトル"]("");
          }),
        );
      this["縦軸タイトル描画"]();
      this["横軸タイトル描画"]();
      this["グラフ"]["_原点x"] = this["_右端"] + 60;
      this["ペン"]["図形にする"]();
      this["ペン"]["消える"]();
      this["_最小メモリ"] = this["undef"];
      return this;
    });
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
//テーブルオブジェクトの定義
テーブル=!作る。
//テーブル="テーブルオブジェクト"。
テーブル:データ＝配列！作る。
テーブル：_画面幅=画面！幅？．
テーブル：_画面高さ=画面！高さ？．
テーブル：x=20+(テーブル：_画面幅)/-2。
テーブル：y=(テーブル：_画面高さ)/2。
テーブル：リスト高さ=(テーブル:_画面高さ)*3/10.

テーブル：getarg＝「|n|
    「全部！（自分!(n)  配列？）（自分!（n！1  読む）配列？）本当」！なら「n！1  読む」そうでなければ「n」実行
」。
テーブル：作る＝「||
    ret＝テーブル！create。
    ret:データ＝配列！作る。
    args=自分!(_rest)  getarg。
    「args!=undef」！なら「
        ret：フィールド名＝args。
    」そうでなければ「
        ret:フィールド名=配列!作る。
    」実行。
    ret。
」。      
テーブル：配列？＝「|n|  
    「どれか！(（""+n）！"]"  含む？)    （n==undef）    本当」!なら「true」そうでなければ「false」実行。
」。
テーブル：書く＝「|v|
　「自分!(v)配列?」!なら「
　　v!「|n|
　　　自分：データ＝自分：データ！（n）書く。
　　」それぞれ実行。
　」そうでなければ「
　　自分：データ＝自分：データ！（v）書く。
　」実行。
　自分。
」。
テーブル：読む＝「｜i｜自分：データ！（i）読む」。
テーブル：連結＝「｜v;ret｜
    自分：データ＝自分：データ！（v）連結。
    自分。
」。

テーブル：区切り文字=「|deli|
    自分：deli=deli。
    自分。
」。

テーブル：文字コード=「|encode|
    自分：encode=encode。
    自分。
」。

テーブル：ファイルから作る＝「｜fn;  fld_tmp  fld _tmp deli｜
    tf＝テキストファイル！（fn）作る。
    「encode==(undef)」!なら「encode="Shift-JIS"」実行。
    dt＝tf！(encode)  読む。
    //dt＝tf！  読む  ""  消す。
    「dt!=undef」!なら「
        「deli==undef」!なら「
            「(dt!1  読む)!  "\t"  含む?」!なら「
                deli="\t"。
            」そうでなければ「
                deli=","。
            」実行。
        」実行。
        「自分:フィールド名==undef」！なら「
            fld_tmp＝（dt！1  読む）！(deli)  分割。
            fld=配列!作る。
            fld_tmp!「|n|
            　n=""+n。
            　「n!"[(]"　含む？」!なら「_tmp=n!"[(]"　分割。n=_tmp! 1 読む。」実行。
            　「n!"[(]"　含む？」!なら「_tmp=n!"[(]"　分割。 n=_tmp! 1 読む。」実行。
                「n!"[^0-9０-９\-\.]"    含む?」!なら「
                    fld!(n)  書く
                」そうでなければ「
                    fld!("F"+n)  書く
                」実行。
            」それぞれ実行。
            ret＝テーブル！（fld）作る。
        」そうでなければ「
            （（dt！1  読む）！(deli)  分割）！「
                dt!1  ""  挿入。
            」それぞれ実行。
        」実行。
        dt!「|n  i|
            「i>1」!なら「
            　n=n+" "。
                tmp=n!(deli)  分割。
                tmp!「|m|
                    m=m!" $"  ""  置き換える。
                    m=m!"^ "  ""  置き換える。
                    m=m!"^\-$" ""　置き換える。
                    m=m!"^\−$" ""　置き換える。
                    m=m!"^\ー$" ""　置き換える。
                    「ｍ!"[^0-9０-９\.\-]" 含む?」!なら「
                        ret!(m)  書く。
                    」そうでなければ「
                        ret!(:window!(m)  parseFloat)    書く。
                        //ret!(m)  書く。
                    」実行。
                」それぞれ実行。
            」実行。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：ファイルから追加=「|  fn  |
    tf＝テキストファイル！（fn）作る。
    「encode==(undef)」!なら「encode="Shift-JIS"」実行。
    dt＝tf！(encode)  読む。
    「deli==(undef)」！なら「deli="\t"」実行。
    fld＝（dt！1  読む）！(deli)  分割。
    ret=自分。
    dt!「|n  i|
        tmp=n!(deli)  分割。
        tmp!「|m|
            ret!(m)  書く。
        」それぞれ実行。
    」それぞれ実行。
    ret。
」。

テーブル：値読み出し＝「
    val=(自分:データ!1  読む)。
    val。
」。

テーブル：フィールド番号取得＝「|  f  |
    fs=undef。
    要素数=フィールド名!要素数?。
    「｜n｜
        「(フィールド名！（n）読む）＝＝f」！なら「fs=n。」実行。
    」！（フィールド名！要素数？）繰り返す。
    fs。
」。

テーブル：文字数カウント=「|  Str  |
    Str=Str+""。
    length=Str！長さ？。
    sum=0。
    「|  n  |
        「全部！(((Str！(  n  )  1  部分)！文字コード  10  進数)  >31)  (((Str！(  n  )  1  部分)！文字コード  10  進数)  <127)  本当」！なら
        「sum=sum+1」そうでなければ
        「sum=sum+2」実行。
    」！  (length)    繰り返す。
    sum。
」。


テーブル：表示＝「|  ;要素数  文字列  レコード  カラム名  tmp  space  s  幅  文字数  lst  件数  |
    要素数=自分：フィールド名！要素数？。
    文字数＝配列！作る。
    レコード=""。
    カラム名＝""。
    フィールド名！「|n  i|
        文字数！(自分！(n)  文字数カウント)    書く。
    」それぞれ実行。
    
    自分:データ！「|n  i|
        「n==""」!なら「n="NA"」実行。
        「全部!(((n+"")!"[^0-9０-９\-\.]"  含む?)==false)  (((n+"")!長さ?)  >5)  本当」!なら「
            n=round(n*10000)。
            n=n/10000。
        」実行。
        tmp=自分！(n+"")  文字数カウント。
        「(文字数！((i-1)%要素数+1)  読む)  <  tmp」!なら「
            文字数！((i-1)%要素数+1)    (tmp)  上書き。
        」実行。
    」それぞれ実行。
    
    space=""。
    フィールド名！「|n  i|
        n=n+""。
        「space=space+" "。」！((文字数！((i-1)%要素数+1)  読む)-(自分！(n+"")  文字数カウント))  繰り返す。
        「i==要素数」!なら「
            カラム名=カラム名！(space+n)    連結。
        」そうでなければ「
            カラム名=カラム名!(space+n+"|")  連結。
        」実行。
        space=""。
    」それぞれ実行。
    
    幅=0。
    文字数！「|n|  幅＝幅+n。」それぞれ実行。
    s=""。
    「s=s+"-"」！(幅+要素数-1)  繰り返す。
    件数=(自分:データ！要素数？)/(フィールド名!要素数?)。
    リスト幅=テーブル:_画面幅/2.5。
    「要素数==1」!なら「
        横幅=s!長さ?。
        「横幅<=1」!なら「補正値=15*横幅」そうでなければ
        「横幅<=2」なら「補正値=4*横幅」そうでなければ
        「横幅<=3」なら「補正値=3*横幅」そうでなければ
        「横幅<7」なら「補正値=2*横幅」そうでなければ
        「補正値=横幅」実行。
        「(23+(幅+要素数)*7+補正値) <= (リスト幅)」!なら「リスト幅=(23+(幅+要素数)*7+補正値)」実行。
        lst=テキストエリア！(カラム名)    作る  (リスト幅)  (リスト高さ)  大きさ  (テーブル：x)  (テーブル：y)  位置。
        テーブル：x=(テーブル：x)+(40+リスト幅)。
    」そうでなければ「
    　「(23+(幅+要素数)*7) <= (リスト幅)」!なら「リスト幅=(23+(幅+要素数)*7)」実行。
        lst=テキストエリア！(カラム名)    作る  (リスト幅)  (リスト高さ)  大きさ  (テーブル：x)  (テーブル：y)  位置。
        テーブル：x=(テーブル：x)+(40+リスト幅)。
    」実行。
    lst!(s)  書く    改行。
    
    自分:データ！「|n  i|
        「n==""」!なら「n="NA"」実行。
        「全部!(((n+"")!"[^0-9０-９\-\.]"  含む?)==false)  (((n+"")!長さ?)  >5)  本当」!なら「
            n=round(n*10000)。
            n=n/10000。
        」実行。
        「space=space+" "。」！((文字数！((i-1)%要素数+1)  読む)-(自分！(n+"")  文字数カウント))  繰り返す。
        「i%要素数==0」!なら「
            レコード＝レコード！(space+n)    連結。            
        」そうでなければ「
            レコード＝レコード！(space+n+"|")    連結。
        」実行。
        space=""。
        「((i-1)%要素数==要素数-1)」!なら「
            lst!(レコード)  書く    改行。
            レコード=""。
        」実行。
    」それぞれ実行。
    テーブル：フラグ=1。
    自分。
」。

// テーブル：ファイル出力＝「｜fn  deli  encode｜
//     tf＝テキストファイル！（fn）  作る。
//     「encode==(undef)」!なら「encode="Shift-JIS"」実行。
//     tmp=""。
//     「deli==(undef)」！なら「deli="\t"」実行。
//     tf！（配列！作る）(encode)  全部書く。
//     フィールド名!「|n  i|
//         tmp=(tmp)!(n+deli)    連結。
//     」それぞれ実行。
//     tf!(tmp)  (encode)    書く。
//     tmp=""。
//     自分:データ！「|n  i|
//         tmp=(tmp)!(n+deli)    連結。
//         「i%(フィールド名!要素数?)==0」!なら「  tf!(tmp)  (encode)  書く。tmp=""。」実行。
//     」それぞれ実行。
//     ラベル！"書き出し完了"  作る。
//     自分。
// 」。

テーブル：TSV表示＝「|  ;要素数  文字列  レコード  カラム名  tmp  space  s  幅  文字数  lst  件数  |
    要素数=自分：フィールド名！要素数？。
    文字数＝配列！作る。
    レコード=""。
    カラム名＝""。
    フィールド名！「|n  i|
        文字数！(自分！(n)  文字数カウント)    書く。
    」それぞれ実行。
    
    フィールド名！「|n  i|
        「i==要素数」!なら「
            カラム名=カラム名！(n)    連結。
        」そうでなければ「
            カラム名=カラム名!(n+"\t")  連結。
        」実行。
    」それぞれ実行。
    

    自分:データ！「|n  i|
        tmp=自分！(n+"")  文字数カウント。
        「(文字数！((i-1)%要素数+1)  読む)  <  tmp」!なら「
            文字数！((i-1)%要素数+1)    (tmp)  上書き。
        」実行。
    」それぞれ実行。

    幅=0。
    文字数！「|n|  幅＝幅+n。」それぞれ実行。
    件数=(自分:データ！要素数？)/(フィールド名!要素数?)。
    リスト幅=テーブル:_画面幅/2.5。
    「(23+(幅+要素数)*7) <= (リスト幅)」!なら「リスト幅=(23+(幅+要素数)*7)」実行。
    lst=テキストエリア！(カラム名)    作る  (リスト幅)  (リスト高さ)  大きさ  (テーブル：x)  (テーブル：y)  位置。
    テーブル：x=(テーブル：x)+(40+リスト幅)。
    自分:データ！「|n  i|
        「i%要素数==0」!なら「
            レコード＝レコード！(n)    連結。            
        」そうでなければ「
            レコード＝レコード！(n+"\t")    連結。
        」実行。
        「((i-1)%要素数==要素数-1)」!なら「
            lst!(レコード)  書く    改行。
            レコード=""。
        」実行。
    」それぞれ実行。
    自分。
」。

テーブル：CSV表示＝「|  ;要素数  文字列  レコード  カラム名  tmp  space  s  幅  文字数  lst  件数  |
    要素数=自分：フィールド名！要素数？。
    文字数＝配列！作る。
    レコード=""。
    カラム名＝""。
    フィールド名！「|n  i|
        文字数！(自分！(n)  文字数カウント)    書く。
    」それぞれ実行。
    
    フィールド名！「|n  i|
        「i==要素数」!なら「
            カラム名=カラム名！(n)    連結。
        」そうでなければ「
            カラム名=カラム名!(n+",")  連結。
        」実行。
    」それぞれ実行。
    

    自分:データ！「|n  i|
        tmp=自分！(n+"")  文字数カウント。
        「(文字数！((i-1)%要素数+1)  読む)  <  tmp」!なら「
            文字数！((i-1)%要素数+1)    (tmp)  上書き。
        」実行。
    」それぞれ実行。

    幅=0。
    文字数！「|n|  幅＝幅+n。」それぞれ実行。
    件数=(自分:データ！要素数？)/(フィールド名!要素数?)。
    リスト幅=テーブル:_画面幅/2.5。
    「(23+(幅+要素数)*7) <= (リスト幅)」!なら「リスト幅=(23+(幅+要素数)*7)」実行。
    lst=テキストエリア！(カラム名)    作る  (リスト幅)  (リスト高さ)  大きさ  (テーブル：x)  (テーブル：y)  位置。
    テーブル：x=(テーブル：x)+(40+リスト幅)。
    自分:データ！「|n  i|
        「i%要素数==0」!なら「
            レコード＝レコード！(n)    連結。            
        」そうでなければ「
            レコード＝レコード！(n+",")    連結。
        」実行。
        「((i-1)%要素数==要素数-1)」!なら「
            lst!(レコード)  書く    改行。
            レコード=""。
        」実行。
    」それぞれ実行。
    自分。
」。

テーブル：配列から作る＝「|  |
    arg=_rest！作る。
    field_arr=配列！作る。
    arg!「|i|
        field_arr!  (i!1  読む)    書く。
    」それぞれ実行。
    要素数=(arg!1  読む)!要素数?。
    
    ret=テーブル！(field_arr)  作る。
    「|j|
        「j>1」!なら「
            arg!「|n  i|
                ret!(n!(j)  読む)  書く。
            」それぞれ実行。
        」実行。
    」！(要素数)    繰り返す。
    ret。
」。

テーブル：フィールド名変更＝「|before  after|
    「全部!(after!=undef)  (before!=undef)  本当」!なら「
        フィールド名！「|n  i|
            「n==before」!なら「num=i」実行。
        」それぞれ実行。
        フィールド名！(num)  (after)  上書き。
        自分：フィールド名＝フィールド名。
    」実行。
    自分。
」。

テーブル：件数＝「|;ret|
    ret=テーブル!"件数"  作る。
    ret!((自分：データ！要素数？)/(フィールド名!要素数?))  書く。
    ret。
」。

テーブル：数にする＝「
    //num=(自分:データ！1  読む)＋0。
    num=:window!(自分:データ！1  読む)  parseFloat.
    num。
」。

テーブル：配列にする＝「
    arr=配列!作る。
    自分:データ!「|  n  |
        arr!(n)  書く。
    」それぞれ実行。
    arr。
」。

テーブル：欠損値の置換＝「  |option|
    「option=="0置換"」！なら「
        自分:データ!「|n  i|
            「n==""」!なら「自分:データ！(i)  0  上書き。」実行。
        」それぞれ実行。
    」そうでなければ「option=="平均値置換"」なら「
        自分:データ！「|n  i|
            「n==""」!なら「
                tmp=自分！作る。
                フィールド=フィールド名！(i%(フィールド名！要素数?))  読む。
                自分:データ！(i)  (自分！(フィールド)    平均値    値読み出し)  上書き。
            」実行。
        」それぞれ実行。
    」そうでなければ「
        自分:データ！「|n  i|
            「n==""」!なら「
                tmp=自分！作る。
                フィールド=フィールド名！(i%(フィールド名！要素数?))  読む。
                自分:データ！(i)  (自分！(フィールド)    中央値    値読み出し)  上書き。
            」実行。
        」それぞれ実行。
    」実行。
    自分。
」。

テーブル:check_fn＝「|;args  flag  res|
    args=自分!(_rest)  getarg。
    flag=0。
    res=false。
    args!「|n|
        フィールド名!「|m|
            「n==m」!なら「flag=flag+1」実行。
        」それぞれ実行。
    」それぞれ実行。
    「flag==(args!要素数?)」!なら「res=true」実行。
    res。
」。

テーブル:check_dt＝「|;res  |
    res=true。
    自分:データ!「|n  i|
        「(n+"")!"[^0-9０-９\-\.]"    含む?」!なら「
            res=false。
        」実行。
    」それぞれ実行。
    res。
」。

テーブル:check_arg=「|  args  option  ;_max  flag|
    「args!=undef」!なら「
        arg_num=args!要素数?。
        flag=true。
        「option=="freq"」!なら「
            「  (arg_num)<1」!なら「flag=false」実行。
            「(arg_num)>=2」!なら「_max=args!2    読む」実行。
            「(arg_num)>=3」!なら「_min=args!3    読む」実行。
            「(arg_num)>=4」!なら「階級幅=args!4    読む」実行。
            「階級幅!=undef」!なら「
                「(階級幅+"")!"[^0-9０-９\.-]"    含む?」!なら「flag=false」実行。
            」実行。
            「_min!=undef」!なら「
                「(_min+"")!"[^0-9０-９\.-]"    含む?」!なら「flag=false」実行。
            」実行。
            「_max!=undef」!なら「
                「(_max+"")!"[^0-9０-９\.-]"    含む?」!なら「flag=false」実行。
            」実行。
            「(自分!(args!1  読む)  check_fn)==false」!なら「flag=false」実行。
            「flag==true」!なら「
                「(自分!(args!1  読む)    射影  (args!1  読む)  check_dt)==false」!なら「flag=false」実行。
            」実行。
            
        」そうでなければ「option=="common"」なら「
            
            「arg_num<1」!なら「flag=false」実行。
            「(自分!(args)  check_fn)==false」!なら「flag=false」実行。  
            
            「flag==true」!なら「
                tmp=自分!(args)  射影。
                str_arr=tmp:データ!「|  n  |    (n+"")!"[^0-9０-９\.-]"  含む?」  選ぶ。
                「(str_arr!要素数?)  >0  」！なら「flag==false」実行。
            」実行。
            
        」そうでなければ「option=="common1"」なら「
            
            「arg_num<1」!なら「flag=false」実行。
            
            「(自分!(args!1    読む)  check_fn)==false」!なら「flag=false」実行。
            
        」そうでなければ「option=="common2"」なら「
            
            「arg_num<2」!なら「flag=false」実行。
            「(自分!(args!1  読む)  check_fn)==false」!なら「flag=false」実行。
            「(自分!(args!2  読む)  check_fn)==false」!なら「flag=false」実行。
            
        」そうでなければ「option=="qn1"」なら「
            
            「arg_num<1」!なら「flag=false」実行。
            「(自分!(args!1  読む)  check_fn)==false」!なら「flag=false」実行。
            「flag==true」!なら「
                「(自分!(args!1  読む)    射影  (args!1  読む)  check_dt)==false」!なら「flag=false」実行。
            」実行。
        」そうでなければ「option=="qn2"」なら「
            
            「arg_num<2」!なら「flag=false」実行。
            「(自分!(args!1  読む)  check_fn)==false」!なら「flag=false」実行。
            「(自分!(args!2  読む)  check_fn)==false」!なら「flag=false」実行。
            「flag==true」!なら「
                「(自分!(args!1  読む)    射影  (args!1  読む)  check_dt)==false」!なら「flag=false」実行。
                「(自分!(args!2  読む)    射影  (args!2  読む)  check_dt)==false」!なら「flag=false」実行。
            」実行。
            
        」そうでなければ「option=="qn3"」なら「
            
            「arg_num<2」!なら「flag=false」実行。
            「(自分!(args!1  読む)  check_fn)==false」!なら「flag=false」実行。
            「(自分!(args!2  読む)  check_fn)==false」!なら「flag=false」実行。
            「(自分!(args!3  読む)  check_fn)==false」!なら「flag=false」実行。
            「flag==true」!なら「
                「(自分!(args!1  読む)    射影  (args!1  読む)  check_dt)==false」!なら「flag=false」実行。
                「(自分!(args!2  読む)    射影  (args!2  読む)  check_dt)==false」!なら「flag=false」実行。
                「(自分!(args!3  読む)    射影  (args!2  読む)  check_dt)==false」!なら「flag=false」実行。
            」実行。
        」そうでなければ「option=="qn"」なら「
            
            「arg_num<1」!なら「flag=false」実行。
            「(自分!(args)  check_fn)==false」!なら「flag=false」実行。
            「flag==true」!なら「
                「(自分!(args!1  読む)    射影  (args!1  読む)  check_dt)==false」!なら「flag=false」実行。
                「(自分!(args!2  読む)    射影  (args!2  読む)  check_dt)==false」!なら「flag=false」実行。
            」実行。
            
        」実行。
    」そうでなければ「
        flag=false。
    」実行。
    flag。
」。

//RDB演算の定義
テーブル：射影＝「｜;fs  fn  ret    全数｜
    fs=配列！作る。
    fn=配列！作る。
    要素数=フィールド名!要素数?。
    引数=自分!(_rest)  getarg。
    「自分!(引数)    check_fn」!なら「
        引数！「｜f  i｜
            「｜n｜
                「(自分：フィールド名！（n）読む）＝＝f」！なら「fs！（n）書く。fn!  (f)  書く」実行。
            」！（自分：フィールド名！要素数？）繰り返す。
        」それぞれ実行。
        ret＝テーブル！（fn）作る。
        tmp=配列!作る。
        fs!「|m  j|
            自分:データ！「|n  i|
                「((i-1)%要素数)==(m-1)」!なら「tmp!(n)  書く。」実行。
            」それぞれ実行。
        」それぞれ実行。
        全数=自分!件数    数にする。
        「|i|
            「|j|
                ret!(tmp!(i+((j-1)*全数))    読む)    書く。
            」!(fs!要素数?)  繰り返す
        」!(全数)    繰り返す。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：選択＝「｜条件  ;ret｜
    ret＝テーブル！（フィールド名）作る。
    自分:データ！「｜r  i｜
        番号=(i-1)%(フィールド名！要素数？)。
        f＝フィールド名！（番号+1）読む。
        「(r+"")!"[^0-9０-９\-\.]"    含む?」!なら「
            s＝""+f+"＝"+コード文字(0x22)+r+コード文字(0x22)+"。"。
        」そうでなければ「
            s＝""+f+"＝"+r+"。"。
        」実行。
        
        「(s!"<"　含む?)==false」！なら「
        　（s）！実行。
        」実行。
        //条件が正しければ戻り値にrを設定
        「全部!（条件！実行）(i%(自分:フィールド名!要素数?)==0)  本当」！なら「
            「|  n  |
                ret!(自分:データ！(i-番号+(n-1))  読む)    書く。
            」!(自分:フィールド名!要素数?)  繰り返す。
        」実行。
    」それぞれ実行。
    ret。
」。

テーブル：結合=「|t  ;ret|
    keyf=配列!作る。
    keyn=配列!作る。
    keye=配列!作る。
    要素数m=自分：フィールド名！要素数？。
    要素数t=t：フィールド名！要素数？。
    「｜n｜f=自分：フィールド名！（n）読む。//  結合キーkの判別
        「｜i｜f2＝t:フィールド名！（i）読む。
            「f==f2」！なら「kf=f。kn=n。ki=i。keyf!(f)  書く。keyn!(n)  書く。keye!(i)    書く」実行。
        」！（要素数t）繰り返す。
    」！（要素数m）繰り返す。
    途中データm=自分!(keyf)  射影。
    途中データt=t!(keyf)  射影。
    行数m=途中データm!件数    数にする。
    行数t=途中データt!件数    数にする。
    列数=keyf!要素数?。
    
    連結m=途中データm!(行数m)  (列数)  _レコード連結。
    連結t=途中データt!(行数t)  (列数)  _レコード連結。
    
    一致レコード行番号配列=配列!  作る。
    追加予定レコード行番号配列=配列!作る。
    連結m!「|n  i|
        連結t!「|m  j|
            「("@@"+n)==("@@"+m)」!なら「
                一致レコード行番号配列!(i)    書く。
                追加予定レコード行番号配列!(j)  書く。
            」実行。
        」それぞれ実行。
    」それぞれ実行。
    
    tmp_arr=配列！作る。
    //tmp=t:フィールド名！作る。
    //tmp=t:フィールド名！concat。
    tmp=配列!作る。
    t:フィールド名!「|n|
        ｔｍｐ！（ｎ）    書く。
    」それぞれ実行。
    t:フィールド名!「|n|
        keyf!「|m|
            「n==m」!なら「tmp!(n)    消す」実行。
        」それぞれ実行。
    」それぞれ実行。
    追加データ＝t!(tmp)    射影。
    fn=(自分:フィールド名)!(tmp)  連結。
    ret=テーブル!(fn)  作る。
    一致レコード行番号配列!「|  n  i|
        
        「|j|
            ret!(自分:データ!((n*要素数m)+(j-1)-(要素数-1))    読む)    書く。
        」!(要素数m)  繰り返す。
        
        「|j|
            番号=追加予定レコード行番号配列!(i)  読む。
            ret!(追加データ!(((番号-1)*(追加データ:フィールド名!要素数?))+(j))  読む)  書く。
        」!(追加データ:フィールド名!要素数?)  繰り返す。
        
    」それぞれ実行。
    
    
    「全部！((ret:データ!要素数?)==0)  ((一致レコード行番号配列!要素数)!=0)    本当」！なら「
        mn=(自分！要素数？)/要素数m。
        tn=(t！要素数？)/要素数t。
        time=0。
        time2=0。
        「|  cnt  |
            「|i|  ret!(自分:データ!(i+time)  読む)  書く。」！(要素数m)  繰り返す。
            「|i|  ret!(t!(i+time2)  読む)  書く。」！(要素数t)  繰り返す。
            time2=time2+要素数t。
            「time2==(t!要素数?)」!なら「time2=0」実行。
            「(cnt%tn)==0」！なら「
                time=time+要素数m。
            」実行。
        」!(mn*tn)    繰り返す。
    」実行。
    
    ret。
」。

テーブル:_レコード連結=「|  行数    列数  |
    ret=配列!作る。
    「|i|
        tmp=""。
        「|j|
            「j!=(列数)」！なら    「
                tmp=(tmp+"")!  ((自分:データ!(((i-1)*(列数))+j)  読む)+"＠＠")  連結。
            」そうでなければ「
                tmp=(tmp+"")!  ((自分:データ!(((i-1)*(列数))+j)  読む)+"")  連結。
            」実行。
        」!(列数)    繰り返す。
        ret!(tmp)  書く。
    」!(行数)  繰り返す。
    ret
」。

テーブル:行列入れ替え＝「|;tmp  f|
    tmp=配列！作る。
    f=自分:フィールド名。
    フィールド数=f！要素数？。
    「|i|  tmp！(配列！  (f!(i)  読む)  作る)  書く」!(フィールド数)    繰り返す。
    (自分:データ)!「|  n  i  |
        index＝「(i%フィールド数)==0」!なら「フィールド数」そうでなければ「(i%フィールド数)」実行。    
        (tmp!(index)  読む)!  (n)  書く。
    」それぞれ実行。
    tmp!「|n  i|
        「i==1」!なら「
            n!「|m|  m+""」    加工。
            ret  =  テーブル!(n)  作る。
        」そうでなければ「
            ret:データ=(ret:データ)!(n)  連結。
        」実行。
    」それぞれ実行。
    ret。
」。


テーブル：小さい順＝「|並び替えたいフィールド名;  ret  res|
    「並び替えたいフィールド名==undef」!なら「
        自分。
    」そうでなければ「
        並び替えたいフィールド名の番号＝０．
        「｜番号｜
            「（フィールド名！（番号）読む）＝＝並び替えたいフィールド名」！なら「
                並び替えたいフィールド名の番号＝番号。
            」実行。
        」！（フィールド名！要素数？）繰り返す。
        quick=「｜arr  num  num_f;  ret  n  p  left  right  v  p番号  v番号｜
            ret=arr。
            n＝arr！要素数？。
            「(n/num_f)＞1」！なら「
                p番号＝n-num_f。
                left=配列！作る。
                right=配列！作る。
                「｜i;v番号｜
                    v番号＝(i-1)*num_f。
                    「(arr!(v番号+num)読む)<(arr!(p番号+num)読む)」！なら「
                        「｜i｜
                            left！（arr!(v番号+i)読む）書く
                        」！（num_f）繰り返す。
                    」そうでなければ「
                        「｜i｜
                            right！（arr!(v番号+i)読む）書く。
                        」！（num_f）繰り返す。
                    」実行。
                」！（n/num_f-1）繰り返す。
                p＝配列！作る。
                「|i|p!(arr!(p番号+i)読む)書く」！（num_f）繰り返す。
                ret＝配列！作る（！（left）(num)(num_f)quick）（p）（！（right）(num)(num_f)quick）連結。
            」実行。
            ret。
        」。
        res=!(自分:データ)  (並び替えたいフィールド名の番号)(自分：フィールド名！要素数？)quick。
        
        ret=テーブル！(フィールド名)作る。
        「|n|ret!(res!(n)読む)書く」！（res!要素数？）繰り返す。
        ret。
    」実行。
」。

テーブル：大きい順＝「|並び替えたいフィールド名;  ret  res|
    「並び替えたいフィールド名==undef」!なら「
        自分。
    」そうでなければ「
        並び替えたいフィールド名の番号＝０．
        「｜番号｜
            「（フィールド名！（番号）読む）＝＝並び替えたいフィールド名」！なら「
                並び替えたいフィールド名の番号＝番号。
            」実行。
        」！（フィールド名！要素数？）繰り返す。
        quick=「｜arr  num  num_f;  ret  n  p  left  right  v  p番号  v番号｜
            ret=arr。
            n＝arr！要素数？。
            「(n/num_f)＞1」！なら「
                p番号＝n-num_f。
                left=配列！作る。
                right=配列！作る。
                「｜i;v番号｜
                    v番号＝(i-1)*num_f。
                    「(arr!(v番号+num)読む)>(arr!(p番号+num)読む)」！なら「
                        「｜i｜
                            left！（arr!(v番号+i)読む）書く
                        」！（num_f）繰り返す。
                    」そうでなければ「
                        「｜i｜
                            right！（arr!(v番号+i)読む）書く
                        」！（num_f）繰り返す。
                    」実行。
                」！（n/num_f-1）繰り返す。
                p＝配列！作る。
                「|i|p!(arr!(p番号+i)読む)書く」！（num_f）繰り返す。
                ret＝配列！作る（！（left）(num)(num_f)quick）（p）（！（right）(num)(num_f)quick）連結。
            」実行。
            ret。
        」。
        res=!(自分:データ)  (並び替えたいフィールド名の番号)(自分：フィールド名！要素数？)quick.
        ret=テーブル！(フィールド名)作る。
        「|n|ret!(res!(n)読む)書く」！（res!要素数？）繰り返す。
        ret。
    」実行。
」。

テーブル：内部_重複なし＝「|;ret  flag|
    f=_rest!1  読む。
    arr=((自分！(f)    射影):データ)!  ""  消す。
    ret＝テーブル！(f)    作る。
    flag=0。
    arr!「|n  i|
        ret:データ!「|m  j|
            「n==m」!なら「flag=1」実行。
        」それぞれ実行。
        「flag==0」!なら「ret!(n)  書く。」実行。
        flag=0。
    」それぞれ実行。
    ret。
」。

テーブル：重複なし＝「|;ret  flag|
    列数=自分:フィールド名！要素数？。
    行数=(自分:データ!要素数?)/列数。
    res=テーブル!(自分:フィールド名)    作る。
    連結データ配列=配列!作る。
    重複削除配列=配列!作る。
    「|i|
        tmp=""。
        「|j|
            「j!=(列数)」！なら    「
                tmp=(tmp+"")!  ((自分!(((i-1)*(列数))+j)  読む)+"＠＠")  連結。
            」そうでなければ「
                tmp=(tmp+"")!  ((自分!(((i-1)*(列数))+j)  読む)+"")  連結。
            」実行。
        」!(列数)    繰り返す。
        連結データ配列!(tmp)  書く。
    」!(行数)  繰り返す。
    連結データ配列!「|n|
        「i==1」!なら「
            重複削除配列!(n)  書く。
        」そうでなければ「
            flag=0。
            重複削除配列!「|m|
                「m==n」!なら「flag=1」実行。
            」それぞれ実行。
            「flag==0」!なら「重複削除配列!(n)  書く」実行。
            flag=0。
        」実行。
    」それぞれ実行。
    res=テーブル!(自分:フィールド名)  作る。
    重複削除配列!「|n|
        tmp=n!"＠＠"    分割。
        tmp!「|m|
            //res!(m)  書く。
            「(m+"")!"[^0-9０-９\-\.]"    含む?」!なら「
                res!(m)  書く。
            」そうでなければ「
                //res!(m)  書く。
                res!(:window！(m)parseFloat)  書く。
            」実行。
        」それぞれ実行。
    」それぞれ実行。
    res。
」。

テーブル：追加＝「|  |
    フィールド数=自分:フィールド名!要素数?。
    追加数=_rest!要素数?。
    _rest！「|n  i|
        「自分!(n)配列?」！なら「
            追加数=n!要素数？。
            n!「|m|
                自分！(m)  書く。
            」それぞれ実行。
        」そうでなければ「
            「i<=フィールド数」!なら「
                自分！(n)  書く。
            」実行。
        」実行。
    」それぞれ実行。
    「全部!((フィールド数-追加数)>0)  (追加数!=0)  本当」！なら「
        「
            自分!""    書く。
        」!(フィールド数-追加数)    繰り返す。
    」実行。
    自分。
」。

テーブル：レコード取り出し＝「｜key  num  ;ret｜
    ret＝テーブル！（フィールド名）作る。
    要素数＝フィールド名!要素数？。
    自分：データ！「｜r  i｜
        「全部!(key==ｒ)  ((i-num)%要素数==0)  本当」!なら「
            「|j|
                ret!(自分！(i-num+(j))  読む)    書く。
            」！(要素数)    繰り返す。
        」実行。
    」それぞれ実行。
    ret。
」。

テーブル：集計＝「|  f    con  ;cnt|
    ret=テーブル！(f+"_集計")  作る。
    cnt=0。
    arr=自分！(f)  射影。
    arr：データ!「|n  i|
        「n==con」!なら「cnt=cnt+1」実行。
    」それぞれ実行。
    ret!(cnt)    書く。
    ret。
」。

テーブル：集計2＝「|  f1  con1  f2  con2  ;cnt|
    ret=テーブル！(f1+"_集計")  作る。
    cnt=0。
    f1_arr=自分！(f1)  射影。
    f2_arr=自分！(f2)  射影。
    要素数=(f1_arr:フィールド名)!要素数?。
    「|i;  v1  v2|
        v1=f1_arr：データ!(i)    読む。
        v2=f2_arr：データ!(i)  読む。
        「  全部!((v1+"")==(con1+""))  ((v2+"")==(con2+""))    本当」！なら「
            cnt=cnt+1。
        」実行。
    」!(f1_arr!件数    数にする)    繰り返す。
    ret!(cnt)    書く。
    ret。
」。

テーブル:_引数設定＝「
    args=配列!作る。
    自分:フィールド名!「|  n  |
        args!(n)  書く。
    」それぞれ実行。
    型配列=グラフ!(自分)  型判定。
    型配列!「|  n  |
        args!(n)  消す。
    」それぞれ実行。
    args。
」。

//データ分析機能の定義
テーブル：最大値＝「|;ret  f1_arr  args  arg_num max|
    args=自分!(_rest)  getarg。
    「args==undef」!なら「
        args=自分!_引数設定。
    」実行。
    
    「自分!(args)  "common"  check_arg」!なら「
        ret=テーブル!作る。
        args!「|  n  i |
            ret:フィールド名!(n+"_最大値")  書く。
            f1_arr=自分!(n)  射影。
            f1_arr：データ!""  消す。
            f1_arr：データ!「| m j |
            　「j==1」!なら「max=m」実行。
            　「max < m」!なら「 max=m」実行。
            」それぞれ実行。
            ret!(max)  書く。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：最小値＝「|;ret  f1_arr  args  arg_num min|
    args=自分!(_rest)  getarg。
    「args==undef」!なら「
        args=自分!_引数設定。
    」実行。
    
    「自分!(args)  "common"  check_arg」!なら「
        ret=テーブル!作る。
        args!「|  n  i |
            ret:フィールド名!(n+"_最大値")  書く。
            f1_arr=自分!(n)  射影。
            f1_arr：データ!""  消す。
            f1_arr：データ!「| m j |
            　「j==1」!なら「min=m」実行。
            　「min > m」!なら「 min=m」実行。
            」それぞれ実行。
            ret!(min)  書く。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：最頻値＝「|  ;freq_arr  _max_rec  args  arg_num _max|
    args=自分!(_rest)  getarg。
    「自分!(args)  "common1"  check_arg」!なら「
        f1=args!1　読む。
        freq_arr=自分！(f1)  度数。
        _max=freq_arr!"度数"  最大値  数にする。
        _max_rec=freq_arr！(_max)  2  レコード取り出し。
        ret=テーブル！((f1)+"_最頻値")  "度数"  作る。
        _max_rec：データ！「|  val  cnt  |
            ret!(val)  書く。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：合計値＝「|;args  f1  ret  sum    |
    args=自分!(_rest)  getarg。
    「args==undef」!なら「
        args=自分!_引数設定。
    」実行。
    
    「自分!(args)  "common"  check_arg」!なら「
        ret=テーブル!作る。
        args!「|  n  i  |
            フィールド番号=自分！(ｎ)  フィールド番号取得。
            ret:フィールド名！(n+"_合計値")  書く。
            sum=0。
            「フィールド番号！=undef」！なら「
                「|i|
                    「(自分：データ！(フィールド番号+(i-1)*(フィールド名!要素数?))  読む)!="NA"」!なら「
                        sum=sum+(自分：データ！(フィールド番号+(i-1)*(フィールド名!要素数?))  読む)  。
                    」実行。
                」！((自分：データ！要素数?)/要素数)  繰り返す。
                ret!(sum)  書く。
            」実行。
        」それぞれ実行。
    」そうでなければ「
        undef。
    」実行。
    ret。
」。

テーブル：平均値＝「|  ;  args  f1  ret  sum  レコード数  フィールド番号|
    args=自分!(_rest)  getarg。
    「args==undef」!なら「
        args=自分!_引数設定。
    」実行。
    
    「自分!(args)  "common"  check_arg」!なら「
        ret=テーブル!作る。
        args!「|  n  i  |
            フィールド番号=自分！(n)  フィールド番号取得。
            ret:フィールド名！(n+"_平均値")  書く。
            レコード数=(自分：データ！要素数?)/(フィールド名!要素数?)。
            sum=0。
            「フィールド番号！=undef」！なら「
                「|i|
                    「(自分:データ！(フィールド番号+(i-1)*(フィールド名!要素数?))  読む)==""」！なら「
                        レコード数=レコード数-1。
                    」そうでなければ「
                        //sum=sum+(自分:データ！(フィールド番号+(i-1)*(フィールド名!要素数?))  読む)  。
                        sum=sum+(:window!(自分:データ！(フィールド番号+(i-1)*(フィールド名!要素数?))  読む)  parseFloat)。
                    」実行。
                」！((自分：データ！要素数?)/要素数)  繰り返す。
                ret!(sum/(レコード数))  書く。
            」実行。
        」それぞれ実行。
    」そうでなければ「
        undef。
    」実行。
    ret。
」。

テーブル：偏差＝「|  ;args  f1    f1_arr  dev_arr  ret  ave|
    args=自分!(_rest)  getarg。
    「自分!(args)  "qn1"  check_arg」!なら「
        f1=args!1    読む。
        f1_arr=自分！(f1)  射影。
        f1_arr:データ=f1_arr:データ!""    消す。
        ave=f1_arr！(f1)  平均値  値読み出し。
        dev_arr=配列！作る。
        f1_arr:データ！「｜n｜
            「n!="NA"」!なら「
                dev_arr!(n-ave)  書く。
            」実行。
        」それぞれ実行。
        ret=テーブル！((f1)+"_偏差")  作る。
        dev_arr！「|  val  |
            ret!(val)  書く。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：分散＝「|;ret  sum  data_array  ave  dev  disp  args  f1  |
    args=自分!(_rest)  getarg。
    「自分!(args)  "qn1"  check_arg」!なら「
        f1=args!1    読む。
        data_array＝自分！(f1)  射影。
        data_array:データ=data_array:データ!""  消す。
        sum=data_array！(f1)  合計値    値読み出し。
        ave=sum/(data_array:データ!要素数?)。
        dev=0.
        data_array:データ！「｜n｜
            dev  =  dev  +  (((n)-(ave))*((n)-(ave)))。
        」それぞれ実行。
        disp=0.
        disp  =  dev/(data_array：データ！要素数?)。
        ret=テーブル！((f1)+"_分散")  作る。
        ret!(disp)  書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：不偏分散＝「|;data_array  sum  要素数  ave  dev  disp  args  f1|
    args=自分!(_rest)  getarg。
    「自分!(args)  "qn1"  check_arg」!なら「
        f1=args!1    読む。
        data_array＝自分！(f1)  射影。
        data_array:データ=data_array:データ!""  消す。
        sum=data_array！(f1)  合計値    値読み出し。
        要素数＝data_array：データ！要素数?。
        ave=sum/要素数。
        dev=0.
        data_array:データ！「｜n｜
            dev  =  dev  +  (((n)-(ave))*((n)-(ave)))。
        」それぞれ実行。
        disp=0.
        disp  =  (要素数/(要素数-1))*dev/要素数。
        ret=テーブル！((f1)+"_不偏分散")  作る。
        ret!(disp)  書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：共分散＝「|;args  f1  f2  f1_dev_arr  f2_dev_arr  total  ret  cav  args  |
    args=自分!(_rest)  getarg。
    「自分!(args)  "qn2"  check_arg」!なら「
        f1=args!1    読む。
        f2=args!2    読む。
        f1_dev_arr=自分！(f1)  偏差。    
        f2_dev_arr=自分！(f2)  偏差。
        total＝0。
        f1_dev_arr:データ！「|  val  cnt  |
            total=total+(val*(f2_dev_arr：データ!  (cnt)  読む))。
        」それぞれ実行。
        
        cav=total/(f1_dev_arr:データ!要素数?)。
        ret=テーブル！((f1)+"&"+(f2)+"_共分散")  作る。
        ret!(cav)    書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：不偏共分散＝「|;args  f1  f2  f1_dev_arr  f2_dev_arr  要素数  total  cav  ret|
    args=自分!(_rest)  getarg。
    「自分!(args)  "qn2"  check_arg」!なら「
        f1=args!1    読む。
        f2=args!2    読む。
        f1_dev_arr=自分！(f1)  偏差。    
        f2_dev_arr=自分！(f2)  偏差。
        要素数＝f1_dev_arr：データ!要素数?。
        total＝0。
        f1_dev_arr:データ！「|  val  cnt  |
            total=total+(val*(f2_dev_arr：データ!  (cnt)  読む))。
        」それぞれ実行。
        
        cav=(要素数/(要素数-1))*(total/要素数)。
        ret=テーブル！((f1)+"&"+(f2)+"_不偏共分散")  作る。
        ret!(cav)    書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：相関係数＝「|;  f1  f2  tmp1  tmp2  cav  st_dev1  st_dev2  cor  ret  |
    args=自分!(_rest)  getarg。
    args2=args!concat。
    //args2=args!作る。
    「自分!(args)  "qn"  check_arg」!なら「
        f1=args!1    読む。
        f2=args!2    読む。
        tmp1  =  配列！作る。
        args!「|  f1  |
            tmp2  =  配列！作る。
            args！「|  f2  |
                cav=自分！(f1)  (f2)  共分散  値読み出し。
                st_dev1=自分！(f1)  標準偏差  値読み出し。
                st_dev2=自分！(f2)  標準偏差  値読み出し。
                cor=cav/(st_dev1*st_dev2)。
                tmp2!(cor)    書く。
            」それぞれ実行。
            tmp1!(tmp2)    書く。
        」それぞれ実行。
        
        ret=テーブル！(args!1  ""  挿入)  作る。
        tmp1！「|  f  i  |
            ret!(f!1  (args!(i+1)    読む)  挿入)  追加。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：不偏共分散＝「|;args  f1  f2  f1_dev_arr  f2_dev_arr  要素数  total  cav  ret|
    args=自分!(_rest)  getarg。
    「自分!(args)  "qn2"  check_arg」!なら「
        f1=args!1    読む。
        f2=args!2    読む。
        f1_dev_arr=自分！(f1)  偏差。    
        f2_dev_arr=自分！(f2)  偏差。
        要素数＝f1_dev_arr：データ!要素数?。
        total＝0。
        f1_dev_arr:データ！「|  val  cnt  |
            total=total+(val*(f2_dev_arr：データ!  (cnt)  読む))。
        」それぞれ実行。
        
        cav=(要素数/(要素数-1))*(total/要素数)。
        ret=テーブル！((f1)+"&"+(f2)+"_不偏共分散")  作る。
        ret!(cav)    書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：_相関係数＝「|f1  f2;  tmp1  tmp2  cav  st_dev1  st_dev2  cor  ret  |
    cav=自分！(f1)  (f2)  共分散  値読み出し。
    st_dev1=自分！(f1)  標準偏差  値読み出し。
    st_dev2=自分！(f2)  標準偏差  値読み出し。
    cor=cav/(st_dev1*st_dev2)。              
    cor。
」。

テーブル：偏相関係数＝「|;  f1  f2  tmp1  tmp2  cav  st_dev1  st_dev2  cor  ret  |
    args=自分!(_rest)  getarg。
    args2=args!concat。
    //args2=args!作る。
    「自分!(args)  "qn3"  check_arg」!なら「
        f1=args!1    読む。
        f2=args!2    読む。
        f3=args!3    読む。
        cor1=自分!(f2)  (f3)    _相関係数。
        cor2=自分!(f1)  (f2)    _相関係数。
        cor3=自分!(f1)  (f3)    _相関係数。
        
        cor2=0.706。
        cor3=0.870。
        cor1=0.302。
        
        r=(cor2-(cor1*cor3))/(sqrt(1-((cor1)!  2  pow))*sqrt(1-((cor3)!  2  pow)))。
        ret=テーブル！(ｆ１＋”&”+f2+"&"+f3+"_偏相関係数")  作る。
        ret!(r)  書く。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：標準偏差＝「|;f1  disp  sdev  ret  args|
    args=自分!(_rest)  getarg。
    「自分!(args)  "qn1"  check_arg」!なら「
        f1=args!1    読む。
        disp=自分！(f1)  分散    値読み出し。
        sdev=sqrt(disp)。
        ret=テーブル！((f1)+"_標準偏差")  作る。
        ret!(sdev)  書く。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：不偏標準偏差＝「|;f1  disp  sdev  ret  args|
    args=自分!(_rest)  getarg。
    「自分!(args)  "qn1"  check_arg」!なら「
        f1=args!1    読む。
        disp=自分！(f1)  不偏分散    値読み出し。
        sdev=sqrt(disp)。
        ret=テーブル！((f1)+"_不偏標準偏差")  作る。
        ret!(sdev)  書く。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：中央値＝「|;f1  data_arr  要素数  中心  median  disp  sdev  ret  args|
    args=自分!(_rest)  getarg。
    「args==undef」!なら「
        args=自分!_引数設定。
    」実行。
    
    「自分!(args)  "common"  check_arg」!なら「
        ret=テーブル!作る。
        args!「|  n  i  |
            data_arr＝自分！(n)    小さい順  (n)  射影。
            data_arr:データ=data_arr:データ!""  消す。
            要素数=data_arr:データ!要素数?。
            ret:フィールド名！(n+"_中央値")  書く。
            「要素数!=0」!なら「
                中心=ceil(要素数/2)。
                「(要素数%2)==0」!なら「
                    median=((data_arr:データ！(中心)    読む)+(data_arr！(中心+1)  読む))/2。
                」そうでなければ「
                    median=data_arr:データ！(中心)  読む。
                」実行。
                ret!(median)  書く。
            」そうでなければ「
                ret!(undef)  書く。
            」実行。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル:第１四分位数＝「|;args  f1  data_arr  要素数    中心  data  qua1  ret  |
    args=自分!(_rest)  getarg。
    「args==undef」!なら「
        args=自分!_引数設定。
    」実行。
    
    「自分!(args)  "common"  check_arg」!なら「
        ret=テーブル!作る。
        args!「|  n  i  |
            data_arr＝自分！(n)    小さい順  (n)  射影。
            data_arr:データ=data_arr:データ!""  消す。
            要素数=data_arr：データ!要素数?。
            中心=floor(要素数/2)。
            data=テーブル!(n)  作る。
            「|i|    data!(data_arr:データ!(i)  読む)  書く」!(中心)    繰り返す。
            qua1  =  data!  (n)  中央値    値読み出し。
            ret:フィールド名！((n)+"_第1四分位数")  書く。
            ret!(qua1)    書く。
        」それぞれ実行。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル:第3四分位数＝「|;args  f1  data_arr  要素数    中心  data  qua3  ret  |
    args=自分!(_rest)  getarg。
    「args==undef」!なら「
        args=自分!_引数設定。
    」実行。
    
    「自分!(args)  "common"  check_arg」!なら「
        ret=テーブル!作る。
        args!「|  n  i  |
            data_arr＝自分！(n)    大きい順  (n)  射影。
            data_arr:データ=data_arr:データ!""  消す。
            要素数=data_arr:データ!要素数?。
            中心=floor(要素数/2)。
            data=テーブル!(n)  作る。
            「|i|    data!(data_arr:データ!(i)  読む)  書く」!(中心)    繰り返す。
            qua3  =  data!  (n)  中央値    値読み出し。
            ret:フィールド名！(n+"_第3四分位数")  書く。
            ret!(qua3)    書く。
        」それぞれ実行。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：度数＝「|;  args  arg_num      キー達    値達    ret  f1_arr  件数    |
    args=自分!(_rest)  getarg。
    「自分!(args)  "common1"  check_arg」!なら「
        arg_num=args!要素数?。
        f1=args!1  読む。
        キー達＝配列！作る。
        値達=配列！作る。
        f1の番号＝0。
        f1_arr=自分!(f1)  射影。
        f1_arr：データ=f1_arr：データ!""  消す。
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
        
        キー達：探す＝「｜キー；結果    ｜
            結果＝０。
            文字コード配列の比較＝「｜左    右｜
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
        
        「｜番号；値    キー番号｜
            「(自分：データ！（フィールド名要素数*(番号-1)+f1の番号）読む)!=""」！なら「
                値＝!(自分：データ！（フィールド名要素数*(番号-1)+f1の番号）読む)文字コード配列にする。    
                「（キー達！（値）探す）＝＝０」！なら「キー達！（値）書く。値達！０    書く。」実行。
                キー番号＝キー達！（値）探す。
                値達！（キー番号）（（値達！（キー番号）読む）＋１）上書き。
            」実行。
        」！（（自分：データ！要素数？）/（フィールド名要素数））繰り返す。
        
        ret=テーブル！(f1)  "度数"    作る。
        「｜番号｜
            ret!(！(キー達！（番号）読む)文字列にする）書く。
            ret!（値達！（番号）読む）書く。
        」！（キー達！要素数？）繰り返す。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：度数分布＝「｜；ret  args  arg_num  件数  f1_arr  _min  _max  階級幅  f1  flag｜
    args=自分!(_rest)  getarg。
    「自分!(args)  "freq"  check_arg」!なら「
        arg_num=args!要素数?。
        f1=args!1  読む。
        「(arg_num)>=2」!なら「_max=args!2    読む」実行。
        「(arg_num)>=3」!なら「_min=args!3    読む」実行。
        「(arg_num)>=4」!なら「階級幅=args!4    読む」実行。
        f1の番号=0。
        f1_arr=自分!(f1)  射影。
        f1_arr:データ=f1_arr:データ!""  消す。
        件数=f1_arr:データ!要素数?。
        階級=配列！作る。
        カウント=配列！作る。
        「_min==undef」！なら「_min=f1_arr!(f1) 最小値 数にする。」実行。
        「_max==undef」！なら「_max=f1_arr!(f1) 最大値 数にする。」実行。
        　//「_min==undef」！なら「_min=:window!(f1_arr：データ!最小)  parseFloat。」実行。
        　//「_max==undef」！なら「_max=:window!(f1_arr：データ!最大)  parseFloat。」実行。
        「_max > _min」!なら「
            min桁数=floor(log(_min)+1)。
            「min桁数 > 0」!なら「
                _min= floor(_min/(10!(min桁数-1) pow))*(10!(min桁数-1) pow)。
            」そうでなければ「
                _min=0。
            」実行。
            max桁数=floor(log(_max)+1)。
            _min= floor(_min/(10!(min桁数-1) pow))*(10!(min桁数-1) pow)。
            _max= ceil(_max/(10!(max桁数-1) pow))*(10!(max桁数-1) pow)。
            sum=_max-_min.
        　「階級幅  ==  undef」!なら「
               「sum > 1 」！なら「
           　     階級数=sum/(10!(floor(log(sum))) pow)。
               」そうでなければ「
                   階級数=10。
               」実行。
            　桁数=floor(log(sum/階級数)+1)．
            　「桁数  <=  0」!なら「桁数=桁数-1」実行。
            　「_max >= 10 」!なら「
            　　階級幅=ceil((sum/階級数)*桁数)/(桁数)．
            　」そうでなければ「
            　　階級幅=ceil((sum/階級数)*10*桁数)/(10*桁数)．
            　」実行。
        　」そうでなければ「
           　 階級数＝round(sum/階級幅)。
        　」実行。
        　ret=テーブル！"階級"  "度数"作る。
        　「|  n  |
            　「n!=階級数」!なら「
           　　 階級!(配列!  ((round((_min+階級幅*(n-1))*100)/100+"")!("~"+(round((_min+階級幅*n)*10)/10))  連結)  作る)  書く。
           　」そうでなければ「
           　　階級!(配列!  ((round((_min+階級幅*(n-1))*100)/100+"")!("~"+(_max))  連結)  作る)  書く。
           　」実行。
           　 (階級!(n)  読む)!  0  書く。
            　「n==1」！なら「
            　　カウント!(_min+階級幅*(n-1))  書く。
            　」そうでなければ「
            　　「(_min+階級幅*(n-1)) < _max」!なら「
            　　　カウント!(_min+階級幅*(n-1))  書く。
            　　」そうでなければ「
            　　　カウント!(_max) 書く。
            　　」実行。
           　」実行。
       　 」！(階級数)  繰り返す。
        
        　f1_arr：データ!「|  n  i  |
            　カウント！「|  m  j  |
                　「j==階級数」！なら「
                    　「全部！((m  <=  n))  ((m+階級幅)  >=  n)  本当」!なら「
                       　 (階級！(j)  読む)!  2    (((階級！(j)  読む)!  2  読む)+1)  上書き。
                    　」実行。    
               　 」そうでなければ「
                   　 「全部！((m  <=  n))  ((m+階級幅)  >  n)  本当」!なら「
                       　 (階級！(j)  読む)!  2    (((階級！(j)  読む)!  2  読む)+1)  上書き。
                    　」実行。
                　」実行。
            　」それぞれ実行。
        　」それぞれ実行。
        　階級!「|  n  |
            　n!「|val|  ret!(val)  書く。」それぞれ実行。
        　」それぞれ実行。
        　ret。
        」そうでなければ「
        　undef。
        」実行。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：度数分布表＝「|  ;  args  arg_num  f1  freq  frec_sum  frecdist_sum  ret  ｜
    args=自分!(_rest)  getarg。
    「自分!(args)  "freq"  check_arg」!なら「
        arg_num=args!要素数?。
        f1=args!1  読む。
        「(arg_num)>=2」!なら「_max=args!2    読む」実行。
        「(arg_num)>=3」!なら「_min=args!3    読む」実行。
        「(arg_num)>=4」!なら「階級幅=args!4    読む」実行。
        freq=自分!(f1) (_max) (_min) (階級幅) 度数分布。
        frec_sum=freq!"度数"  合計値    数にする。
        frecdist_sum=0。
        ret  =    テーブル!"階級"  "度数"  "相対度数"  作る。
        freq:データ!「|  n  i  |
            ret!  (n)  書く。
            「i%2==0」!なら「
                ret!(n/frec_sum)  書く。
                frecdist_sum=frecdist_sum+(n/frec_sum)。
            」実行。
        」それぞれ実行。
        ret!"計"    書く。
        ret!(frec_sum)  書く。
        ret!(frecdist_sum)    書く。
        ret。
    」そうでなければ「
        f1=  args!1  読む。
        ret=テーブル！(f1)  "度数"  "相対度数"  作る。
        f_arr=自分!(f1)  度数  (f1)    射影。
        freq=自分!(f1)  度数  "度数"    射影。
        sum=0。
        freq：データ!「|n|
            sum=sum+n。
        」それぞれ実行。      
        
        freq:データ！「|n  i|
            ret!(f_arr：データ!(i)  読む)  書く。
            ret!(n)    書く。
            ret!(n/sum)  書く。
        」それぞれ実行。
        ret。
    」実行。
」。

テーブル：クロス集計=「|;ret  val  cp  tmp  sum  sum_array  args  arg_num  |
    args=自分!(_rest)  getarg。
    「自分!(args)  "common2"  check_arg」!なら「
        arg_num=args!要素数?。
        tmp  =  配列！作る。
        args!「|n  i|
            「i<=2」！なら「
                tmp!(自分！(n)  射影    重複なし)  書く。
            」実行。
        」それぞれ実行。
        カウント＝配列！作る。
        ((tmp!1  読む):データ)!「|n  j|
            sum=0。
            カウント！(n)  書く。
            ((tmp!2  読む):データ)！「|m|
                「全部!(n!="")  (m!="")  本当」!なら「
                    val=自分！(args!1  読む)  (n)  (args!2    読む)  (m)  集計2  数にする。
                    カウント！(val)  書く。
                    sum=sum+val。
                」実行。
            」それぞれ実行。
        」それぞれ実行。
        ret=テーブル！""  作る。
        ((tmp!2  読む):データ)!「|n  i|
            「n!=""」!なら「
                ret:フィールド名!(n)  書く。
            」実行。
        」それぞれ実行。
        
        カウント！「|n  i|
            ret!(n)  書く。
        」それぞれ実行。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。


テーブル：クロス集計表=「|;ret    val  cp  tmp  sum  sum_array  args  arg_num|
    args=自分!(_rest)  getarg。
    「自分!(args)  "common2"  check_arg」!なら「
        arg_num=args!要素数?。
        tmp  =  配列！作る。
        args!「|n  i|
            「i<=2」！なら「
                tmp!(自分！(n)  射影    重複なし)  書く。
            」実行。
        」それぞれ実行。
        カウント＝配列！作る。
        
        (tmp!1  読む)!「|n  j|
            sum=0。
            カウント！(n)  書く。
            (tmp!2  読む)！「|m|
                「全部!(n!="")  (m!="")  本当」!なら「
                    val=自分！(args!1  読む)  (n)  (args!2    読む)  (m)  集計2  数にする。
                    カウント！(val)  書く。
                    sum=sum+val。
                」実行。
            」それぞれ実行。
            カウント！(sum)  書く。
        」それぞれ実行。
        
        ret=テーブル！""  作る。
        (tmp!2  読む)!「|n  i|
            「n!=""」!なら「
                ret:フィールド名!(n)  書く。
            」実行。
        」それぞれ実行。
        ret:フィールド名!"合計"  書く。
        
        カウント！「|n  i|
            ret!(n)  書く。
        」それぞれ実行。
        
        sum_array=配列！"合計"  作る。
        sum=0。
        (tmp!2  読む)!「|n  i|
            「n!=""」!なら「
                val  =  自分！(args!2  読む)  (n)  集計    数にする。
                sum_array!(val)    書く。
                sum=sum+val。
            」実行。
        」それぞれ実行。
        sum_array!(sum)  書く。
        ret!(sum_array)  追加。
        ret。
    」そうでなければ「
        undef。
    」実行。
」。

テーブル：数える＝「|;ret  f１    f1_arr  _max  args  arg_num|
    args=自分!(_rest)  getarg。
    ret=テーブル！""  作る。
    
    自分:フィールド名!「|n  i|
        ret:データ!(n)  書く。
        args!「|m  j|
            「i==1」！なら「ret:フィールド名!(m)  書く。  」実行。
            num=自分!(n)  (m)  集計  数にする。
            「num!=0」!なら「ret:データ!(num)  書く。」そうでなければ「ret:データ!(0)  書く。」実行。
        」それぞれ実行。
        
    」それぞれ実行。
    
    ret。
」。

テーブル:フィールド名取得＝「|　|
　res=自分：フィールド名!作る．
　res．
」．

テーブル：抜き出す＝「｜start end ;要素数 res｜
　要素数＝(自分:フィールド名)!要素数？。
　自分：データ!「｜n i｜
　　行番号＝floor（(i-1)/要素数）。
　　「i==1」！なら「res＝テーブル!（自分：フィールド名）　作る。」実行。
　　「end==undef」！なら「
　　　「（行番号）==start」！なら「res!（n）　書く」実行。
　　」そうでなければ「
　　　「全部!（（行番号）>= start）（（行番号）<= end）　本当」！なら「res!（n）　書く」実行。
　　」実行。
　」それぞれ実行。
　res。
」。

//グラフオブジェクト
グラフ＝タートル！作る  消える  図形を作る。

グラフ:_間隔  =  30.
グラフ:_プロット幅  =  20.
グラフ:_原点x=(テーブル：_画面幅)/-2.2.
//JAVA2.5JS2.8
グラフ:_原点y=  -1*(テーブル：_画面高さ)*2.8/10.
グラフ:_縦幅=(テーブル：_画面高さ)*4.5/10.
グラフ:_横幅=(グラフ:_縦幅)*1.5.
グラフ:_方向="縦"。
グラフ:_天井=グラフ:_原点y+30.
グラフ:_底=グラフ:_原点y-10.
グラフ:_左端=グラフ:_原点x-20。
グラフ:_右端=グラフ:_原点x+グラフ:_横幅+10。
グラフ:_マーカフラグ=true。
グラフ:_最小メモリ=undef。
グラフ:_最大メモリ=undef。
グラフ：_横軸タイトル文=undef。
グラフ：_縦軸タイトル文=undef。
グラフ:_起点メモリ=0。
//JAVA_14  JS_8
グラフ:_軸ラベルサイズ=8。
//JAVA_20  JS_10
グラフ:_軸タイトルサイズ=10。


グラフ:_含む？＝「|arr  key;  res|
    res=false。
    arr!「|  n  |
        「n==key」!なら「res=true」実行。
    」それぞれ実行。
    res。
」。

グラフ：位置確定=「
    グラフ:_原点x=60+(グラフ:_原点x)。
    自分：_左端=(グラフ:_原点x-30)。
    自分：_右端=(グラフ:_原点x+自分:_横幅+10)。
」。

グラフ：型判定＝「  |  data  |
    arr=配列!作る。
    「|  i  |
        「((data：データ!(i)    読む)+"")!  "[^0-9.-]"    含む?」!なら「arr!(data:フィールド名!(i)  読む)  書く」実行。
    」!(data:フィールド名!要素数?)    繰り返す。
    arr。
」。

グラフ：横軸タイトル描画＝「|option  ;画面パーツ  付箋    文字数|
    文字数＝自分:_横軸タイトル文！長さ?。
    ラベル！(自分:_横軸タイトル文)  作る  (自分:_軸タイトルサイズ)  文字サイズ  (自分:_左端+(自分:_右端-自分:_左端)/2-文字数*5)  (自分:_底-10)  位置。
    自分:_底=(自分:_底)-(3*自分:_軸タイトルサイズ)。
    自分。
」。

グラフ：横軸タイトル＝「|title|
    「title!=undef」!なら「
        自分：_横軸タイトル文=title。
    」実行。
    自分。
」。

グラフ：縦軸タイトル描画＝「  |;画面パーツ  付箋    文字数|
    文字数＝自分:_縦軸タイトル文！長さ?。
    自分！(自分:_縦軸タイトル文)  (自分:_左端-10)  (自分:_底+(自分:_天井-自分:_底)/2+文字数*5)  "title"  縦表示。
    自分:_左端=自分:_左端-25。
    自分。
」。

グラフ：縦軸タイトル＝「|title|
    「title!=undef」!なら「
        自分：_縦軸タイトル文=title。
    」実行。
    自分。
」。

グラフ：移動する＝「|  x    y|
    グラフ:_原点x=グラフ:_原点x+x。
    グラフ:_原点y=グラフ:_原点y+y。
    自分：_左端=自分：_左端+x。
    自分：_右端=自分：_右端+x。
    自分：_天井=自分：_天井+y。
    自分：_底=自分：_底+y。
    自分。
」。

グラフ：位置＝「|  x    y;移動距離x  移動距離y|
    移動距離x=x-グラフ:_原点x。
    移動距離y=y-グラフ:_原点y。
    グラフ:_原点x=x。
    グラフ:_原点y=y。
    自分：_左端=自分：_左端+移動距離x。
    自分：_右端=自分：_右端+移動距離x。
    自分：_天井=自分：_天井+移動距離y。
    自分：_底=自分：_底+移動距離y。
    自分。
」。

グラフ：ｘ軸データ_multi＝「｜data_arr  option    ;num  cnt  _max  付箋｜
    data_arr:データ!「|data  cnt|
        num=(data+"")!長さ?。
        「cnt==1」!なら「_max=num」実行。
        「_max  <  num」!なら「_max=num」実行。
    」それぞれ実行。
    「option!="ラベルなし"」！なら「
        data_arr:データ!「  |data  cnt|
            data=data+""。
            「(_max)<4」！なら「
                付箋=ラベル！(data)  作る  (自分：_軸ラベルサイズ)  文字サイズ  ((_XORIGIN)+(_XINTERVAL)*(cnt))  ((_YLOWERLIM)-20)    位置。
                付箋：タイプ＝"横軸ラベル"。
                //付箋：個体番号＝個体番号。
                //描画済みグラフ!(付箋)  書く。
            」そうでなければ「
                「(自分：種類)!="ヒストグラム"」!なら「
                    自分！(data)  ((_XORIGIN)+(_XINTERVAL)*(cnt)+_XINTERVAL*0.6)  ((_YLOWERLIM)-20)  etc表示。
                」そうでなければ「
                    自分！(data)  ((_XORIGIN)+(_XINTERVAL)*(cnt)+_XINTERVAL*0.6)  ((_YLOWERLIM)-20)  "横軸ラベル"  縦表示。
                」実行。
            」実行。
        」それぞれ実行。
    」実行。
    自分:_YLOWERLIM=_YLOWERLIM-20。
    自分。
」．

グラフ:データ補正値計算＝「|  data_arr  range;    scale  段数  up_lim|
    data_arr!「  |data  cnt|
        「自分:_範囲指定」！なら「  
            「自分:_最大メモリ!=undef」！なら「
                「data    >  自分:_最大メモリ」！なら「
                    data=自分:_最大メモリ。
                」実行。
            」実行。
            「自分:_最小メモリ!=undef」！なら「
                「data    <  自分:_最小メモリ」!なら「
                    data=自分:_最小メモリ。
                」実行。
            」実行。
        」実行。
        ab=abs(data)。
        「cnt  ==  1」！なら「ab__max  =  ab.  _min=data.  _max=data  」実行．
        「ab__max  <  ab  」！なら「ab__max  =  ab  」実行。
        「_min  >  data  」！なら「  _min  =  data  」実行。
        「_max  <  data  」！なら「  _max  =  data  」実行。
    」それぞれ実行。
    「全部!    (自分:_最小メモリ==undef)    (_min  >=  0)  本当」！なら「
        自分:_最小メモリ=0。
    」そうでなければ「
    　自分:_最小メモリ=_min。
    」実行。
    「自分:_最大メモリ==undef」!なら「自分:_最大メモリ=_max」実行。
    「ab__max  >  0  」！なら「
        digit=ceil(log(abs(ab__max)))。
        base=ab__max*1.05。
        place=10!(floor(log(base)))  pow。
        up1_digit=floor(base/place)。
        
        scale=「up1_digit  <  2」!なら「place*0.2」
        そうでなければ「
            「up1_digit  <  5」!なら「  place  *  0.5」
            そうでなければ「place」実行。
        」実行。
        段数=floor(base/scale+1)。
        roof=段数*scale.
    」実行。
    「自分:_最小メモリ < 0」!なら「
    　自分:_縦幅=自分:_縦幅/1.5。
        自分:_DACOL=range/roof。
    　自分:_段数＝段数*2。
    　自分:__min  =  _min。
    　自分:__max  =  _max。
    　自分:_digit=digit。
    　自分:_scale=scale/2。
    　自分:_roof=roof/2。
    　グラフ:_原点y=グラフ:_原点y/3。
        _DACOL=_DACOL/1.5。
    」そうでなければ「
    　自分:_DACOL=range/roof。
    　自分:_段数＝段数。
    　自分:__min  =  _min。
    　自分:__max  =  _max。
    　自分:_digit=digit。
    　自分:_scale=scale。
    　自分:_roof=roof。
    」実行。
    _DACOL。
」。

グラフ:メモリ線描画＝「｜要素数  ;ペン  col    軸線  i｜
    
    横軸描画＝「|  i  起点メモリ  |
        ラベル!(自分:_scale*i+起点メモリ)  作る    (グラフ:_原点x-調整)  ((グラフ:_原点y+(自分:_縦幅/自分:_段数)*i)+10)    位置      (自分：_軸ラベルサイズ)    文字サイズ    。
        ペン！1  線の太さ    (col)    線の色  ペンなし  (グラフ:_原点x)  (グラフ:_原点y+(自分:_縦幅/自分:_段数)*i)  位置  ペンあり  (自分:_横幅)  歩く。
    」。
    
    縦軸描画=「  |  i    起点メモリ  |
        幅=((floor(自分:_scale*i))+"")!長さ?。
        ラベル!(自分:_scale*i+起点メモリ)  作る    (グラフ:_原点x+(自分:_横幅/自分:_段数*i)-幅*5)  (グラフ:_原点y-10)    位置    (自分：_軸ラベルサイズ)    文字サイズ    。
        ペン!1  線の太さ    (col)  線の色    ペンなし    (グラフ:_原点x+(自分:_横幅/自分:_段数)*i)  (グラフ:_原点y)    位置  ペンあり    (自分:_縦幅)    歩く。    
    」。
    
    col=色!0xBDBDBD  作る。
    調整=(自分:_digit)*10。
    i=0。
    起点メモリ=0。
    
    「自分:_方向=="縦"」!なら「
        ペン＝タートル！    作る。
        自分:_左端=グラフ:_原点x-調整-30。
        //横軸描画!(i)  (起点メモリ)    実行。
        「自分:__max  >  ０」!なら「
            起点メモリ＝「自分:_最小メモリ  >  0」!なら「自分:_最小メモリ」そうでなければ「0」実行。
            i=0。
            「  (自分:_最大メモリ)  >=  (自分:_scale*i+起点メモリ)」!の間「
                横軸描画!(i)  (起点メモリ)実行。
                i=i+1。
            」実行。
            横軸描画!(i)  (起点メモリ)実行。
            自分:_天井=グラフ:_原点y+(自分:_縦幅/自分:_段数)*i。
        」実行。
        
        「自分:_最小メモリ  <  ０」!なら「
            起点メモリ＝「自分:_最大メモリ  <  0」!なら「自分:_最大メモリ」そうでなければ「0」実行。
            i=0。
            「(自分:_最小メモリ)  <=  (自分:_scale*i)」!の間「
                横軸描画!(i)  (起点メモリ)  実行。
                i=i-1。
            」実行。
            横軸描画!(i)  (起点メモリ)実行。
            自分:_底=グラフ:_原点y+(自分:_縦幅/自分:_段数)*i-10。
        」実行。
        
    」そうでなければ「自分:_方向=="横"」なら「
        ペン＝タートル！    作る    90  左回り。
        自分:_底=グラフ:_原点y-40。
        縦軸描画!(i)  (起点メモリ)    実行。
        
        「自分:__max  >  ０」!なら「
            起点メモリ＝「自分:_最小メモリ  >  0」!なら「自分:_最小メモリ」そうでなければ「0」実行。
            i=1。
            「  (自分:_最大メモリ)  >=  (自分:_scale*i)」!の間「
                縦軸描画!(i)  (起点メモリ)  実行。
                i=i+1。
            」実行。
            縦軸描画!(i)  (起点メモリ)  実行。
            自分:_右端=グラフ:_原点x+(自分:_横幅/自分:_段数)*i+20。
        」実行。
        
        「自分:_最小メモリ  <  ０」!なら「
            起点メモリ＝「自分:_最大メモリ  <  0」!なら「自分:_最大メモリ」そうでなければ「0」実行。
            i=-1。
            「(自分:_最小メモリ)  <=  (自分:_scale*i)」!の間「
                縦軸描画!(i)  (起点メモリ)  実行。
                i=i-1。
            」実行。
            縦軸描画!(i)  (起点メモリ)  実行。
            自分:_左端=グラフ:_原点x+(自分:_横幅/自分:_段数)*i-40。
        」実行。
        
    」そうでなければ「自分:_方向=="帯"」なら「
        ペン＝タートル！    作る  1  線の太さ    (col)  線の色  90  左回り。
        ペン!ペンなし    (グラフ:_原点x)  (グラフ:_原点y)  位置。
        自分:_底=グラフ:_原点y-40。
        自分:_天井=グラフ:_原点y+自分:_縦幅。
        メモリ=0。
        自分：_帯メモリ間隔＝(自分：_横幅)/5．
        「|  i  |  
            幅=(メモリ+"")!長さ？。
            ラベル!(メモリ)    作る        (自分：_軸ラベルサイズ)    文字サイズ  (グラフ:_原点x+(自分：_帯メモリ間隔)*(i-1
            )-幅*5)  (グラフ:_原点y-10)  位置。
            ペン!ペンあり    (自分:_縦幅)    歩く    。
            ペン!ペンなし    (グラフ:_原点x+(自分：_帯メモリ間隔)*i)  (グラフ:_原点y)  位置。
            メモリ＝メモリ+20。
        」!  6  繰り返す。
        自分:_右端=グラフ:_原点x+((自分：_横幅))+20。
        
    」そうでなければ「自分:_方向=="散布図"」なら「
        調整=自分:_桁y*10。
        「調整==0」!なら「調整=20」実行。
        ペン＝タートル！    作る  1  線の太さ    (col)  線の色。
        ペン!ペンなし    (グラフ:_原点x)  (グラフ:_原点y)  位置。
        自分：_左端=自分：_左端-20。
        自分：_底=自分：_底-20。
        「|  i  |
            //グリッド線なしがfalse    or  trueで1のとき  or  trueで段数+1のとき
            「どれか!(どれか！(全部!(i==1)  (自分:_グリッド線なし==true)  本当)  (全部!(i==(自分:_段数y+1))  (自分:_グリッド線なし==true)本当  )本当)  (自分:_グリッド線なし==false)    本当」！なら「
                ペン！ペンあり  (自分:_横幅)    歩く。
            」実行。
            ペン!ペンなし  (グラフ:_原点x)  (グラフ:_原点y+自分:_横幅/自分:_段数y*i)    位置。
            ラベル!(自分:_scaley*(i-1))  作る  (自分：_軸ラベルサイズ)    文字サイズ      (グラフ:_原点x-調整-10)  ((グラフ:_原点y+(自分:_縦幅/自分:_段数y)*(i-1))+10)    位置。
        」!  (自分:_段数y+1)    繰り返す。  
        
        ペン!ペンなし    (グラフ:_原点x)  (グラフ:_原点y)  位置    90    左回り。
        「|  i  |
            幅=((自分:_scalex*i)+"")!長さ?。
            「自分:_桁x==0」!なら「幅=3」実行。
            「どれか!(どれか！(全部!(i==1)  (自分:_グリッド線なし==true)  本当)  (全部!(i==(自分:_段数x+1))  (自分:_グリッド線なし==true)本当  )本当)  (自分:_グリッド線なし==false)    本当」！なら「
                ペン！ペンあり  (自分:_縦幅)    歩く。
            」実行。
            ペン!ペンなし  (グラフ:_原点x+自分:_縦幅/自分:_段数x*i)  (グラフ:_原点y)    位置。
            ラベル!(自分:_scalex*(i-1))  作る  (自分：_軸ラベルサイズ)    文字サイズ  (グラフ:_原点x+(自分:_横幅/自分:_段数x*(i-1))-幅*5)  (グラフ:_原点y-10)  位置。
        」!  (自分:_段数x+1)    繰り返す。  
    」実行。
    
    //自分:_起点メモリ=起点メモリ。
    ペン！図形を作る。
    ペン！消える。
    自分。
」。

グラフ:縦幅設定＝「｜data_arr    ;tmp_arr    ｜
    「自分：_方向=="縦"」！なら「
        自分！(data_arr:データ)  (自分:_縦幅)  データ補正値計算。
    」そうでなければ「自分：_方向=="横"」なら「
        自分！(data_arr:データ)  (自分:_横幅)  データ補正値計算。
    」実行。
」。

グラフ:横幅設定＝「|  要素数  |
    「自分：_方向=="縦"」！なら「
        //自分:_横幅=300。
        自分:_右端  =  グラフ:_原点x+自分:_横幅+30。
        自分:_プロット幅  =  (自分:_横幅)*2/5/(要素数)。
        自分:_間隔  =  (自分:_横幅)*3/5/(要素数+1)。
    」そうでなければ「自分:_方向=="横"」なら「
        自分:_横幅  =  250。
        自分:_右端  =  グラフ:_原点x+自分:_横幅+30。
        自分:_プロット幅  =  (自分:_縦幅)*2/5/(要素数)。
        自分:_間隔  =  (自分:_縦幅)*3/5/(要素数+1)。
    」そうでなければ「自分:_方向=="帯"」なら「
        //自分:_横幅  =  500。
        自分:_右端  =  グラフ:_原点x+自分:_横幅+30。
        自分:_プロット幅  =  (自分:_縦幅)*2/5/(要素数)。
        自分:_間隔  =  (自分:_縦幅)*3/5/(要素数+1)。
        自分:_digit=0。
    」実行。
」。

グラフ:横向き=「|    ;tmp|
    自分:_方向＝"横"。
    グラフ:_原点x=グラフ:_原点x+250。
    自分:_天井=自分:_縦幅+30。
    自分。
」。

グラフ:メモリ範囲=「|最小    最大|
    自分:_範囲指定=true。
    「最小!=undef」!なら「
        自分:_最小メモリ＝最小。
    」実行。
    「最大!=undef」！なら「
        自分:_最大メモリ＝最大。
    」実行。
    自分。
」。

グラフ:補正フィールド決定=「|  f_arr  ;tmp  _max  |
    f_arr!「|  n  i|
        tmp=_DATA！(n)    最大値    値読み出し。
        「i==1」!なら「
            _max=tmp。
            F=n。
        」そうでなければ「
            「_max  <  tmp」!なら「
                _max=tmp。
                F=ｎ。
            」実行。
        」実行。
    」それぞれ実行。
    F。
」。

グラフ:線形近似=「
    自分:_近似=true。
    自分。
」。

グラフ:マーカなし=「
　自分:_マーカフラグ=false。
　自分。
」。

//近似曲線：最小二乗法
グラフ：最小二乗法＝「
    「自分:_方向=="散布図"」！なら「
        
        標準偏差＝自分:_DATA!(自分:f1)  標準偏差  値読み出し。
        共分散＝自分:_DATA！(自分:f1)  (自分:f2)  共分散  値読み出し。
        x平均＝自分:_DATA！(自分:f1)  平均値  値読み出し。
        y平均＝自分:_DATA！(自分:f2)  平均値  値読み出し。
        傾き＝共分散/(標準偏差!  2  pow)。
        切片＝y平均-（傾き*x平均）。
        x2=自分:_横幅/自分:_DACOLX。
        y2=x2*傾き+切片。
        ペン＝タートル！作る    ぺんなし    1  線の太さ。
        始点ｘ＝グラフ:_原点x。
        始点y=グラフ:_原点y+切片*自分:_DACOLY。
        終点x=グラフ:_原点x+x2*自分:_DACOLX。
        終点y=グラフ:_原点y+y2*自分:_DACOLY。
        「始点y  <  グラフ:_原点y」！なら「始点x=(切片/(-1*傾き))*自分:_DACOLX+グラフ:_原点x。始点y=グラフ:_原点y」実行。
        「終点y  >  自分：_縦幅」！なら「終点x=((_scaley*_段数y)-切片)/傾き*自分:_DACOLX+グラフ:_原点x。終点_y=(_scaley*_段数y)*自分:_DACOLX＋グラフ:_原点y」実行。
        
        ペン！(始点x)  (始点y)  位置    ぺんあり  (終点x)  (終点y)    位置    (青)  図形を作る。
        傾き＝round(共分散/(標準偏差!  2  pow)*10000)/10000。
        切片＝round((y平均-（傾き*x平均)）*10000)/10000。
        ラベル！("y="+(傾き)+"x+"+(切片))  作る  (自分：_軸ラベルサイズ-4)  文字サイズ    (グラフ:_原点x+x2*自分:_DACOLX+10)  (グラフ:_原点y+y2*自分:_DACOLY+5)  位置。
        ペン！消える。
        式の長さ=("y="+(傾き)+"x+"+(切片))!長さ？。
        自分:_右端=グラフ:_原点x+(自分:_横幅)+40+(式の長さ*10)。
        テーブル：x=自分:_右端。
        ラベル!"    "  作る    (自分:_右端)  0    位置。
    」実行。
    自分。
」。

グラフ：グリッド線なし＝「|    |
    自分:_グリッド線なし=true。
    自分。
」。

グラフ：縦軸間隔＝「｜val｜
    グラフ：_YSCALE  =  val.
    自分。
」．

グラフ:画像にする=「
　「自分:_底 < (-1*テーブル：_画面高さ/2)」！なら「自分:_底=-1*テーブル：_画面高さ/2」実行。
　「自分:_天井 > (テーブル：_画面高さ/2)」！なら「自分:_天井=テーブル：_画面高さ/2」実行。
　「自分:_右端 > (テーブル：_画面幅/2)」！なら「自分:_右端=テーブル：_画面幅/2」実行。
　「自分:_左端 < (-1*テーブル：_画面幅/2)」！なら「自分:_左端=-1*テーブル：_画面幅/2」実行。
　  //JAVA
    システム!(自分:_左端)  (自分:_天井)  (自分:_右端-自分:_左端)    (abs(自分:_天井-自分:_底))  capture。
    //!(自分:_左端)  (自分:_天井)  (自分:_右端-自分:_左端)    (abs(自分:_天井-自分:_底))  capture。
    自分。
」。

グラフ:縦表示＝「|  文字列  x  y  option  long  ;文字数    _SIZE  調整|
    文字列=文字列+""。
    文字数＝(文字列)！長さ?。
    調整=12．
    _SIZE=0。
    //jsなら18JAVA22
    「option=="title"」!なら「_SIZE＝自分：_軸タイトルサイズ。調整=18．」そうでなければ「_SIZE=自分：_軸ラベルサイズ-4」実行。
    「|i|
        tmp=配列！(文字列！(i)  1  部分)  作る。
        tmp!「|n  j|
            付箋＝ラベル！(n)  作る  (x)  (y-調整*i)  位置  (_SIZE)  文字サイズ。
            付箋：タイプ="縦軸タイトル"。
            //付箋：個体番号＝個体番号。
            //自分:縦の位置=(y-(調整-100)*i)。
        」それぞれ実行。
    」！(文字数)    繰り返す。
    「long!=undef」!なら「自分:_底=y-long」実行。
」。

グラフ:着色=「|  i  |
    「i%8  ==  1」！なら「col  =  色！  0x5858FA  作る」そうでなければ
    「i%8  ==  2」なら「col  =  色！  0xA9A9F5  作る」そうでなければ
    「i%8  ==  3」なら「col  =  色！  0xA9F5F2  作る」そうでなければ
    「i%8  ==  4」なら「col  =  色！  0xA9F5A9  作る」そうでなければ
    「i%8  ==  5」なら「col  =  色！  0xF2F5A9  作る」そうでなければ
    「i%8  ==  6」なら「col  =  色！  0xF5D0A9  作る」そうでなければ
    「i%8  ==  7」なら「col  =  色！  0xF5A9A9  作る」そうでなければ
    「i%8  ==  0」なら「col  =  色！  0xFA5858  作る」実行．
    col。
」。

グラフ：初期化＝「
　自分：_底＝グラフ:_原点y。
」。

テーブル：棒グラフ=「|  |    
    _棒グラフ=グラフ！作る。
    _棒グラフ：種類="棒グラフ"。
    _棒グラフ:描画済みグラフ=配列!作る。
    _棒グラフ:_DATA=自分。
    _棒グラフ:f1  =  自分:フィールド名！1  読む。
    _棒グラフ:f2  =  自分!(_rest)  getarg。
    _棒グラフ:描画=「
        自分！初期化。
        自分！位置確定。
        型配列=自分!（_DATA）型判定。
        data_x  =  _DATA！（f1）射影。
        「f2==undef」!なら「
            f2=配列！作る。
            _DATA:フィールド名!「|  n  |
                f2!(n)  書く。
            」それぞれ実行。
            f2!1  位置で消す。
        」実行。
        
        最大長=0。
        data_x:データ!「|  n  i  |
            「((n+"")!長さ？)  >  最大長」！なら「最大長=(n+"")!長さ？」実行。
        」それぞれ実行。
        
        data_y=_DATA！（f2）射影。
        要素数=data_x:データ!要素数?。
        ラベル数=ceil(要素数/35)。
        自分!  (要素数)横幅設定。  
        自分!  (data_y)  縦幅設定。
        自分!  (要素数)  メモリ線描画。
        
        「(型配列!要素数?)>  0」!なら「
            型配列!「|n  i|
                「(自分!(f2)  (n)  _含む？)==true」！なら「
                    「n!=(_DATA:フィールド名!1    読む)」!なら「
                        自分!(_DATA!(n)  射影)    x軸データ_multi。
                    」実行。
                    f2=f2!(n)  消す。
                」実行。
            」それぞれ実行。
        」実行。
        
        ペン＝タートル!作る  1  線の太さ    。
        系列数=f2!要素数?。
        もとのプロット幅  =  自分:_プロット幅。
        自分:_プロット幅  =  自分:_プロット幅/系列数。
        
        「自分：_方向=="縦"」!なら「
            
            ペン！    ぺんなし    (グラフ:_原点x+自分:_間隔)  (グラフ:_原点y)  位置        ９０    左回り    ぺんあり。
            ラベルx=グラフ:_原点x+自分:_間隔+自分:もとのプロット幅/2-(自分:_軸ラベルサイズ/2)。
            ラベルy=グラフ:_原点y。
            
            
            「|  j  |
                data_y=自分:_DATA!(f2!(j)  読む)  射影。  
                ラベルサイズ=「自分:_プロット幅  >  10」  !なら「10」そうでなければ「自分:_プロット幅」実行。
                data_y:データ!「|n  i|
                　「n==""」!なら「n=0」実行。
                    「自分:_範囲指定」！なら「                                            
                        「n  >=  自分:_最大メモリ」！なら「
                            n=自分:_最大メモリ。
                        」そうでなければ「n  <=  自分:_最小メモリ」なら「
                            n=自分:_最小メモリ。
                        」実行。
                    」実行。
                    「n  >=  自分:_最小メモリ」!なら「
                        n=(n-自分:_起点メモリ)*(自分:_DACOL)。
                        ペン！ペンあり    (n)  歩く    90  右回り    (自分:_プロット幅)  歩く    90  右回り    (n)  歩く    180  右回り  (自分!(j)    着色)    図形にする。    
                    」そうでなければ「
                        ペン！  (自分:_プロット幅)  0  移動する。
                    」実行。
                    ペン!ペンなし    (自分:_間隔+(系列数-1)*自分:_プロット幅)  0  移動する。
                    「j==1」！なら「
                        「((i-1)%ラベル数)==0」！なら「
                            横軸ラベル=data_x!(i)  読む。
                            横軸ラベル長=(横軸ラベル+"")!長さ?。
                            「(最大長*5)  >  自分:_プロット幅」！なら「
                                自分!  (横軸ラベル)  (ラベルx)  (ラベルy)  ""  (最大長)  縦表示。
                            」そうでなければ「
                                ラベル!  (横軸ラベル)  作る    (自分：_軸ラベルサイズ)    文字サイズ    (ラベルx-横軸ラベル長*5/2)  (ラベルy)  位置。
                            」実行。
                            ラベルx=ラベルx+自分:_間隔＊ラベル数+もとのプロット幅*ラベル数。
                        」実行。
                    」実行。
                」それぞれ実行。
                「自分:_底  >=  ラベルy」!なら「自分:_底=ラベルy-30」実行。
                ペン！    ぺんなし    (グラフ:_原点x+自分:_間隔+自分:_プロット幅*j)  (グラフ:_原点y)  位置。
            」!  (系列数)  繰り返す。
            自分:_底=自分:_底-13*最大長。
            
            
        」そうでなければ「自分：_方向=="横"」なら「
            
            ペン！    ぺんなし    (グラフ:_原点x)  (グラフ:_原点y+自分:_間隔)  位置        ぺんあり。
            ラベルx=グラフ:_原点x-10。
            //6はラベルの幅の半分
            ラベルy=グラフ:_原点y+(自分:_間隔+もとのプロット幅)-もとのプロット幅/2+6。
            
            「|  j  |
                data_y=自分:_DATA!(f2!(j)  読む)  射影。  
                
                data_y:データ!「|n  i|
                　「n==""」!なら「n=0」実行。
                    val=data_x!(i)  読む。
                    メモリ調整＝((val+"")!長さ?)*10。
                    「自分:_範囲指定」！なら「  
                        「n  >=  自分:_最大メモリ」！なら「
                            n=自分:_最大メモリ。
                        」そうでなければ「n  <=  自分:_最小メモリ」なら「
                            n=自分:_最小メモリ。
                        」実行。
                    」実行。
                    「n  >=  自分:_最小メモリ」!なら「
                        n=(n-自分:_起点メモリ)*(自分:_DACOL)。
                        ペン！ペンあり    (n)  歩く    90  左回り    (自分:_プロット幅)  歩く    90  左回り    (n)  歩く    180  左回り  (自分!(j)    着色)    図形にする。    
                    」そうでなければ「
                        ペン！  0  (自分:_プロット幅)  移動する。
                    」実行。
                    ペン!ペンなし    0  (自分:_間隔+(系列数-1)*自分:_プロット幅)  移動する。
                    
                    「j==1」！なら「
                        「((i-1)%ラベル数)==0」！なら「
                            ラベル!  (val)  作る    (自分：_軸ラベルサイズ-2)    文字サイズ    (ラベルx-メモリ調整)  (ラベルy)  位置。
                            ラベルy=ラベルy+(自分:_間隔+もとのプロット幅)*ラベル数。
                            「自分:_左端  >=  (ラベルx-メモリ調整-30)」!なら「
                                自分:_左端=ラベルx-メモリ調整    -30。
                            」実行。
                        」実行。
                    」実行。
                」それぞれ実行。
                ペン！    ぺんなし    (グラフ:_原点x)  (グラフ:_原点y+自分:_間隔+自分:_プロット幅*j)    位置。
            」!  (系列数)  繰り返す。
            
        」実行。
        
        「系列数  >  1」！なら「
            「自分:_方向=="横"」！なら「
                ペン!ペンなし  (グラフ:_原点x)  (自分:_底-5)  位置。
            」そうでなければ「
                ペン!ペンなし  (グラフ:_原点x)  (自分:_底-10)  位置。
            」実行。
            系列ラベルx  =    グラフ:_原点x+10。  
            系列ラベルy  =  自分:_底+7。
            「|i|
                系列名=f2!(i)    読む。
                系列名長=(系列名+"")!長さ？。
                ペン！ペンあり  6  4  角形    (自分!(i)    着色)    図形を作る。
                a=ラベル!    (系列名)    作る    （系列ラベルx）  (系列ラベルy)    位置  (自分：_軸ラベルサイズ-2)  文字サイズ。
                ペン!ペンなし    (系列名長*12+16)    0  移動する。
                系列ラベルx  =  系列ラベルx+(系列名長*12+16)。
            」!(系列数)    繰り返す。
            「自分:_右端 < 系列ラベルx」！なら「自分:_右端=系列ラベルx」実行。
            自分:_底＝自分:_底-20。
        」実行。
        
        ペン！消える。
        「自分:_横軸タイトル文==undef」！なら「
            自分！(f1)  横軸タイトル。
        」実行。
        「自分:_縦軸タイトル文==undef」！なら「
            自分！("")  縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        グラフ:_原点x=自分:_右端+60．
        //テーブル:x=自分:_右端。
        自分:_最小メモリ=undef。
        自分。
    」。
    //グラフ：個体番号＝グラフ：個体番号+1。
    「_棒グラフ:f2==undef」!なら「
        _棒グラフ。
    」そうでなければ「
        「自分!(_棒グラフ:f2)  check_fn」!なら「
            「_棒グラフ:_DATA!(_棒グラフ:f2!1  読む)    射影  check_dt」!なら「
                _棒グラフ。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。


テーブル：ヒストグラム=「  |f2 _max _min  階級幅  ;tmp  |    
    _ヒストグラム=グラフ！作る。
    _ヒストグラム：種類="ヒストグラム"。
    _ヒストグラム:f1  =  自分:フィールド名！1  読む。
    _ヒストグラム:f2  =  f2。
    _ヒストグラム:_DATA=自分。
    「(_ヒストグラム:f1)!="階級"」!なら「
        _ヒストグラム:_DATA=自分！(_ヒストグラム:f2) (_max) (_min) (階級幅)  度数分布。
        _ヒストグラム:f1="階級"。
        _ヒストグラム:f2="度数"。
    」そうでなければ「_ヒストグラム:f2==undef」なら「
        _ヒストグラム:f2="度数"。
    」実行。
    _ヒストグラム:描画=「
        自分！位置確定。
        自分！初期化。
        data_x  =  _DATA！（自分:f1）射影。
        data_y  =  _DATA！（自分:f2）射影。
        
        要素数=data_y:データ!要素数?。
        自分!  (要素数)  横幅設定。  
        自分!  (data_y)  縦幅設定。
        自分!  (要素数)  メモリ線描画。
        ペン＝タートル!作る    1    線の太さ。
        
        「自分：_方向=="縦"」!なら「
            
            ペン！    ぺんなし    (グラフ:_原点x+自分:_間隔)  (グラフ:_原点y)  位置        ９０    左回り    ぺんあり。
            ラベルx=グラフ:_原点x+(自分:_間隔)。
            ラベルy=グラフ:_原点y-20。
            
            ラベルサイズ=「自分:_プロット幅  >  10」  !なら「10」そうでなければ「自分:_プロット幅」実行。
            data_y:データ!「|n  i|
                「n  >=  自分:_最大メモリ」！なら「
                    n=自分:_最大メモリ。
                」そうでなければ「n  <=  自分:_最小メモリ」なら「
                    n=自分:_最小メモリ。
                」実行。
                「n  >=  自分:_最小メモリ」!なら「
                    n=(n-自分：_起点メモリ)*(自分:_DACOL)。
                    ペン！ペンあり    (n)  歩く    90  右回り    (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数))  歩く    90  右回り    (n)  歩く    180  右回り  (色！  0xE0E0F8  作る)    図形にする。    
                    ペン!ぺんなし    (-1*(自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)))  0  移動する。
                    ペン！(色！  0x555555  作る)    線の色    ペンあり    (n)  歩く    90  右回り    (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数))  歩く    90  右回り    (n)  歩く    180  右回り    図形を作る。    
                」そうでなければ「
                    ペン！  (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数))  0  移動する。
                」実行。
                「i==1」！なら「
                    ラベルペン=タートル!    作る  1    線の太さ    ペンなし(ラベルx)  (ラベルy)  位置        ペンあり  (自分:_横幅-自分：_間隔*2)    歩く    90  右回り。
                」実行。
                ニョロ位置=((data_x!(i)  読む)+"")!  "~"  何文字目?。
                横軸ラベル=((data_x!(i)  読む)+"")!  1  (ニョロ位置-1)    部分。
                ラベルペン!ペンなし  (ラベルx)  (ラベルy)  位置  ペンあり  10  歩く。
                横軸ラベル長=(横軸ラベル+"")!長さ?。
                調整=0。
                「横軸ラベル長  <  3」!なら「
                    調整=(3-横軸ラベル長)*5。
                」そうでなければ「横軸ラベル長  >  3」なら「
                    調整=-1*(横軸ラベル長-3)*2。
                」実行。
                ラベル!  (横軸ラベル)  作る    (自分：_軸ラベルサイズ)    文字サイズ    (ラベルx+調整-10)  (ラベルy-10)  位置。
                ラベルx=ラベルx+自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)。
            」それぞれ実行。
            横軸ラベル=(data_x!(要素数)  読む)!  (ニョロ位置+1)  (((data_x!(要素数)  読む)+"")!    長さ？)    部分。
            ラベルペン!ペンなし  (ラベルx)  (ラベルy)  位置  ペンあり  10  歩く。
            ラベル!  (横軸ラベル)  作る    (自分：_軸ラベルサイズ)    文字サイズ    (ラベルx+調整-10)  (ラベルy-10)  位置。
            「自分:_底  >=  ラベルy」!なら「自分:_底=ラベルy-30」実行。
            
        」そうでなければ「自分：_方向=="横"」なら「
            
            ペン！    ぺんなし    (グラフ:_原点x)  (グラフ:_原点y+自分:_間隔)  位置        ぺんあり。
            ラベルx=グラフ:_原点x-15。
            ラベルy=グラフ:_原点y+(自分:_間隔)。
            
            ラベルサイズ=「自分:_プロット幅  >  10」  !なら「8」そうでなければ「自分:_プロット幅」実行。
            data_y:データ!「|n  i|
                
                val=data_x!(i)  読む。
                メモリ調整＝((val+"")!長さ?)*12。
                「n  >=  自分:_最大メモリ」！なら「
                    n=自分:_最大メモリ。
                」そうでなければ「n  <=  自分:_最小メモリ」なら「
                    n=自分:_最小メモリ。
                」実行。
                
                「n  >=  自分:_最小メモリ」!なら「
                    n=(n-自分:_起点メモリ)*(自分:_DACOL)。
                    ペン！ペンあり    (n)  歩く    90  左回り    (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数))  歩く    90  左回り    (n)  歩く    180  左回り  (色！  0xE0E0F8  作る)    図形にする。    
                    ペン!ぺんなし    0  (-1*(自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)))  移動する。
                    ペン！(色！  0x555555  作る)    線の色    ペンあり    (n)  歩く    90  左回り    (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数))  歩く    90  左回り    (n)  歩く    180  左回り    図形を作る。    
                」そうでなければ「
                    ペン！  0  (自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数))  移動する。
                」実行。
                
                「i==1」！なら「
                    ラベルペン=タートル!    作る  90    左回り  1    線の太さ    ペンなし(ラベルx)  (ラベルy)  位置        ペンあり  (自分:_縦幅-自分：_間隔*2)    歩く    90  左回り。
                」実行。
                ニョロ位置=((data_x!(i)  読む)+"")!  "~"  何文字目?。
                横軸ラベル=((data_x!(i)  読む)+"")!  1  (ニョロ位置-1)    部分。
                ラベルペン!ペンなし  (ラベルx)  (ラベルy)  位置  ペンあり  10  歩く。
                横軸ラベル長=(横軸ラベル+"")!長さ?。
                ラベル!  (横軸ラベル)  作る    (自分：_軸ラベルサイズ)    文字サイズ    (ラベルx-(横軸ラベル長*7)-10)  (ラベルy+10)  位置。
                ラベルy=ラベルy+自分:_プロット幅+((自分:_間隔*要素数-自分:_間隔)/要素数)。
                「自分:_左端  >=  (ラベルx-メモリ調整-30)」!なら「
                    自分:_左端=ラベルx-メモリ調整    -30。
                」実行。
            」それぞれ実行。
            横軸ラベル=(data_x!(要素数)  読む)!  (ニョロ位置+1)  (((data_x!(要素数)  読む)+"")!    長さ？)    部分。
            ラベルペン!ペンなし  (ラベルx)  (ラベルy)  位置  ペンあり  10  歩く。
            ラベル!  (横軸ラベル)  作る    (自分：_軸ラベルサイズ)    文字サイズ    (ラベルx-(横軸ラベル長*7)-10)  (ラベルy+10)  位置。
        」実行。
        
        「系列数  >  1」！なら「
            「自分:_方向=="横"」！なら「
                ペン!ペンなし  (グラフ:_原点x)  (自分:_底-5)  位置。
            」そうでなければ「
                ペン!ペンなし  (グラフ:_原点x)  (自分:_底-10)  位置。
            」実行。
            系列ラベルx  =    グラフ:_原点x+10。  
            系列ラベルy  =  自分:_底。
            「|i|
                系列名=f2!(i)    読む。
                系列名長=(系列名+"")!長さ？。
                ペン！ペンあり  6  4  角形    (自分!(i)    着色)    図形を作る。
                a=ラベル!    (系列名)    作る    （系列ラベルx）  (系列ラベルy)    位置  (自分：_軸ラベルサイズ-2)  文字サイズ。
                ペン!ペンなし    (系列名長*１0+16)    0  移動する。
                系列ラベルx  =  系列ラベルx+(系列名長*１0+16)。
            」!(系列数)    繰り返す。
            自分:_底＝自分:_底-20。
        」実行。
        ペン！消える。
        ラベルペン！消える。
        
        「_横軸タイトル文==undef」！なら「
            自分！("階級")  横軸タイトル。
        」実行。
        「_縦軸タイトル文==undef」！なら「
            自分！("度数")  縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        グラフ:_原点x=自分:_右端+60．
        //テーブル:x=自分:_右端。
                自分:_最小メモリ=undef。
        自分。
    」。
    
    「どれか!(_ヒストグラム:f2==undef)  (_ヒストグラム:_DATA==undef)  本当」！なら「
        undef。
    」そうでなければ「
        「_ヒストグラム:_DATA！(_ヒストグラム:f2)    check_fn」!なら「
            「_ヒストグラム:_DATA！(_ヒストグラム:f2)  射影  check_dt」！なら「
                //グラフ：個体番号＝グラフ：個体番号+1。
                _ヒストグラム。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。

テーブル：積み上げ棒グラフ=「|  |
    _積み上げ棒グラフ＝グラフ！作る。
    _積み上げ棒グラフ：種類="積み上げ棒グラフ"。
    _積み上げ棒グラフ:_DATA=自分。
    _積み上げ棒グラフ:f1  =  自分:フィールド名！1  読む。
    _積み上げ棒グラフ:f2  =  自分!(_rest)  getarg。
    _積み上げ棒グラフ:描画=「|  |
        自分！位置確定。
        自分！初期化。
        「f2==undef」！なら「
            //tmp  =  自分:_DATA:フィールド名  !作る。
            tmp  =  自分:_DATA:フィールド名  !  concat。
            f2=(tmp)!  1  位置で消す。    
        」実行。
        
        tmp_data  =  自分:_DATA!  (f2)  射影。
        data_x=自分:_DATA!  (f1)  射影。
        フィールド数=f2!要素数?。
        系列数=data_x:データ!要素数?。
        正合計配列=配列!作る。
        負合計配列=配列!作る。
        データ補正用配列=配列!  作る。
        データ補正用配列:データ=配列!  作る。
        「
            正合計配列! 0 書く。
            負合計配列! 0 書く。
        」！(フィールド数)  繰り返す。  
        
        「|  i  |
            「|  j  |
                「(tmp_data!((i-1)*フィールド数+j)  読む)  >  0」！なら「
                    正合計配列!  (j)  ((正合計配列!(j)  読む)+(tmp_data!((i-1)*フィールド数+j)  読む))    上書き。
                」そうでなければ「
                    負合計配列!  (j)  ((負合計配列!(j)  読む)+(tmp_data!((i-1)*フィールド数+j)  読む))    上書き。
                」実行。
            」!(フィールド数)    繰り返す。
        」!(系列数)    繰り返す。
        データ補正用配列:データ=正合計配列！(負合計配列)  連結。
        描画用データ=自分:_DATA!  (f2!  1  (f1)  挿入)  射影  行列入れ替え。
        f2!1 位置で消す。
        正高さ配列=配列！作る。
        負高さ配列=配列！作る。
        自分!  (フィールド数)横幅設定。
        自分!  (データ補正用配列)  縦幅設定。
        自分!  (フィールド数)  メモリ線描画。
        ペン＝タートル!作る  1  線の太さ。
        ペン！ぺんなし    (グラフ:_原点x+自分:_間隔)  (グラフ:_原点y)  位置 ９０ 左回り。
        ラベルx=グラフ:_原点x+自分:_間隔+自分:_プロット幅/2。
        ラベルy=グラフ:_原点y-10。
        
        「|  j  |
            data_y=描画用データ!  ((data_x:データ!(j)  読む)+"")  射影。  
            ラベルサイズ=「自分:_プロット幅  >  10」!なら「10」そうでなければ「自分:_プロット幅」実行。
            「| i;  n    |
                「j==1」！なら「
                    正高さ配列! 0  書く。
                    負高さ配列!0  書く。
                」実行。
                n=data_y:データ!(i)  読む。
                 「n  >=  自分:_最大メモリ」！なら「
                     n=自分:_最大メモリ。
                 」そうでなければ「n  <=  自分:_最小メモリ」なら「
                     n=自分:_最小メモリ。
                 」実行。
                「n  >=  自分:_最小メモリ」!なら「
                    「n  >  0」!なら「
                        移動値=正高さ配列!(i)  読む。
                    」そうでなければ「
                        移動値=負高さ配列!(i)  読む。                
                    」実行。
                    n=(n-自分:_起点メモリ)*(自分:_DACOL)。  
                    ペン！ぺんなし 0  (移動値)  移動する。
                    ペン！ペンあり (n)  歩く 90  右回り (自分:_プロット幅)  歩く    90  右回り    (n)  歩く    180  右回り  (自分!(j)    着色)    図形にする。    
                」そうでなければ「
                    ペン！  (自分:_プロット幅)  0  移動する。
                」実行。
                ペン!ペンなし (自分:_間隔)  (-1*移動値)  移動する。
                
                「  n  >  0  」!なら「
                    正高さ配列!(i)    ((正高さ配列!(i)読む)+n)  上書き。
                」そうでなければ「
                    負高さ配列!(i)    ((負高さ配列!(i)読む)+n)  上書き。
                」実行。
                
                「j==1」！なら「
                    横軸ラベル=f2!(i)  読む。
                    横軸ラベル長=(横軸ラベル+"")!長さ?。
                    調整=0。
                    「横軸ラベル長  <  3」!なら「
                        調整=(3-横軸ラベル長)*5。
                    」そうでなければ「横軸ラベル長  >  3」なら「
                        調整=-1*(横軸ラベル長-3)*3。
                    」実行。
                    ラベル!  (横軸ラベル)  作る    (自分：_軸ラベルサイズ)    文字サイズ    (ラベルx+調整-横軸ラベル長*3)  (ラベルy)  位置。
                    ラベルx=ラベルx+自分:_間隔+自分:_プロット幅。
                」実行。
            
            」!(フィールド数)    繰り返す。
            
            「自分:_底  >=  ラベルy」!なら「自分:_底=ラベルy-30」実行。
            ペン！ぺんなし (グラフ:_原点x+自分:_間隔)  (グラフ:_原点y)  位置。
            
        」!  (系列数)  繰り返す。
        「系列数  >  1」！なら「
            ペン!ペンなし  (グラフ:_原点x)  (自分:_底-10)  位置。
            系列ラベルx  =    グラフ:_原点x+10。  
            系列ラベルy  =  自分:_底+10。
            「|i|
                系列名=data_x!(i)    読む。
                
                系列名長=(系列名+"")!長さ？。
                ペン！ペンあり  6  4  角形  (自分!(i)  着色)    図形を作る。
                a=ラベル!    (系列名)    作る    （系列ラベルx）  (系列ラベルy)    位置  (自分：_軸ラベルサイズ-2)  文字サイズ。
                ペン!ペンなし    (系列名長*１0+16)    0  移動する。
                系列ラベルx  =  系列ラベルx+(系列名長*１0+16)。
            」!(系列数)    繰り返す。
            自分:_底＝自分:_底-20。
        」実行。

        ペン！消える。
        「_横軸タイトル文==undef」！なら「
            自分！("項目")  横軸タイトル。
        」実行。
        「_縦軸タイトル文==undef」！なら「
            自分！("")  縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        グラフ:_原点x=自分:_右端+60．
        //テーブル:x=自分:_右端。
        自分:_最小メモリ=undef。
        自分。
    」。
    //グラフ：個体番号＝グラフ：個体番号+1。
    「_積み上げ棒グラフ:f2==undef」!なら「
        _積み上げ棒グラフ。
    」そうでなければ「
        「自分!(_積み上げ棒グラフ:f2)  check_fn」!なら「
            「_積み上げ棒グラフ:_DATA!(_積み上げ棒グラフ:f2!1  読む)    射影  check_dt」!なら「
                _積み上げ棒グラフ。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。

テーブル：折れ線グラフ=「|  ;_max  _maxf  |
    _折れ線グラフ＝グラフ！作る．
    _折れ線グラフ：種類="折れ線グラフ"。
    _折れ線グラフ:_DATA=自分．
    _折れ線グラフ:f1  =  自分:フィールド名！1  読む。
    _折れ線グラフ:f2  =  自分!(_rest)  getarg。
    _折れ線グラフ:描画=「|    |
        自分:_向き="縦"。
        自分！位置確定。
        data_x=_DATA!(f1)  射影。
        「f2==undef」！なら「
            f2=配列！作る。
            _DATA:フィールド名!「|  n  |
                f2!(n)  書く。
            」それぞれ実行。
            f2!1  位置で消す。
        」実行。
        
        data_y=_DATA！（f2）射影。
        要素数=data_x:データ!要素数?。
        系列数=f2!要素数?。
        最大長=0。
        
        data_x:データ!「|  n  i  |
            「((n+"")!長さ？)  >  最大長」！なら「最大長=(n+"")!長さ？」実行。
        」それぞれ実行。
        ラベル数=ceil(要素数/32)。  
        
        自分!  (要素数) 横幅設定。  
        自分!  (data_y) 縦幅設定。
        自分!  (要素数) メモリ線描画。
        
        ペン＝タートル!作る  2  線の太さ。
        ラベルx=グラフ:_原点x+(自分:_間隔)。
        ラベルy=グラフ:_原点y-10。
        
        「|  j  |
            
            data_y=自分:_DATA!(f2!(j)  読む)  射影。  
            ラベルサイズ=「自分:_プロット幅  >  10」  !なら「10」そうでなければ「自分:_プロット幅」実行。
            data_y:データ!「|n  i|
                「自分:_メモリ範囲」！なら「                                
                    「n  >=  自分:_最大メモリ」！なら「
                        n=自分:_最大メモリ。
                    」そうでなければ「n  <=  自分:_最小メモリ」なら「
                        //n=自分:_最小メモリ。
                    」実行。
                」実行。
                「i==1」！なら「
                    plot_flag=false。
                    y1=(n-自分:_起点メモリ)*(自分:_DACOL)+グラフ:_原点y。
                    「y1  >=  自分:_最小メモリ」!なら「plot_flag=true」実行。
                    プロットx=グラフ:_原点x+自分:_間隔+自分:_プロット幅/2。
                    ペン!ペンなし  (プロットx)    (y1)    位置。
                    x1=プロットx。
                」実行。
                「n  >=  自分:_最小メモリ」!なら「
                    n=(n-自分:_起点メモリ)*(自分:_DACOL)+グラフ:_原点y。  
                    x2=x1+(自分:_間隔+自分:_プロット幅)。
                    y2=n。
                    「plot_flag」！なら「
                    　「自分:_マーカフラグ」！なら「
                        　ペン!ペンあり  4  8  角形  (自分!(j)    着色)    図形にする  -2  5  移動する。
                        」実行。
                    」実行。
                    ペン!ぺんあり    (プロットx)  (n)      位置  (自分!(j)    着色)    図形を作る。
                    プロットx=プロットx+(自分:_間隔+自分:_プロット幅)。
                    ｘ１＝ｘ２。  
                    y1=y2。
                    「i==要素数」！なら「
                    　「自分:_マーカフラグ」！なら「
                        　ペン!ペンあり  4  8  角形  (自分!(j)    着色)    図形にする  -2  5  移動する。
                        」実行。
                    」実行。
                    plot_flag=true。
                」そうでなければ「
                    n=(n-自分:_起点メモリ)*(自分:_DACOL)。  
                    //x=(y-y1)/(y2-y1)/(x2-x1)+x1
                    x2=x1+(自分:_間隔+自分:_プロット幅)。
                    y2=n。
                    x軸交点=-1*y1/(y2-y1)/(x2-x1)+x1。
                    「plot_flag」！なら「
                        「自分:_マーカフラグ」！なら「
                        　ペン!ペンあり  4  8  角形  (自分!(j)    着色)    図形にする  -2  5  移動する。
                       　 ペン!ぺんあり    (x軸交点)  (グラフ:_原点y)    位置  (自分!(j)    着色)    図形を作る。
                       」実行。
                    」そうでなければ「
                        ペン!ぺんなし    (x軸交点)  (グラフ:_原点y)    位置
                    」実行。
                    プロットx=プロットx+(自分:_間隔+自分:_プロット幅)。
                    ｘ１＝ｘ２。  
                    y1=y2。
                    plot_flag=false。
                」実行。
                
                「j==1」！なら「
                    「((i-1)%(ラベル数))==0」！なら「
                        横軸ラベル=data_x!(i)  読む。
                        横軸ラベル長=(横軸ラベル+"")!長さ?。
                        「(最大長*5)  >  自分:_プロット幅」！なら「
                            自分!  (横軸ラベル)  (ラベルx)  (ラベルy)  ""  (最大長)  縦表示。
                        」そうでなければ「
                            ラベル!  (横軸ラベル)  作る    (自分：_軸ラベルサイズ)    文字サイズ    (ラベルx-横軸ラベル長*5/2)  (ラベルy)  位置。
                        」実行。
                        ラベルx=ラベルx+(自分:_間隔+自分:_プロット幅)*ラベル数。
                    」実行。
                」実行。
                
            」それぞれ実行。        
            「自分:_底  >=  ラベルy」!なら「自分:_底=ラベルy-30」実行。
            
        」!  (系列数)  繰り返す。
        
        「系列数  >  1」！なら「
            ペン!ペンなし  (グラフ:_原点x)  (自分:_底-12)  位置。
            系列ラベルx  =  グラフ:_原点x+10。  
            系列ラベルy  =  自分:_底。
            「|i|
                系列名=f2!(i)    読む。
                系列名長=(系列名+"")!長さ？。
                ペン！ペンあり  6  4  角形    (自分!(i)    着色)    図形を作る。
                a=ラベル!    (系列名)    作る    （系列ラベルx）  (系列ラベルy)    位置  (自分：_軸ラベルサイズ)  文字サイズ。
                ペン!ペンなし    (系列名長*16+16)    0  移動する。
                系列ラベルx  =  系列ラベルx+(系列名長*16+16)。
            」!(系列数)    繰り返す。
            自分:_底＝自分:_底-20。
        」実行。
        
        「_横軸タイトル文==undef」！なら「
            自分！(f1)  横軸タイトル。
        」実行。
        「_縦軸タイトル文==undef」！なら「
            自分！("")  縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        グラフ:_原点x=自分:_右端+60．
        //テーブル:x=自分:_右端。
        ペン！  消える。
        自分:_最小メモリ=undef。
        自分。
    」。
    
    //グラフ：個体番号＝グラフ：個体番号+1。
    「_折れ線グラフ:f2==undef」!なら「
        _折れ線グラフ。
    」そうでなければ「
        「自分!(_折れ線グラフ:f2)  check_fn」!なら「
            「_折れ線グラフ:_DATA!(_折れ線グラフ:f2!1  読む)    射影　 check_dt」!なら「
                _折れ線グラフ。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。


テーブル：円グラフ=「  |f2|
    「どれか！(f2=="")  (f2==undef)  本当」!なら「f2=(自分:フィールド名)!2  読む」実行。
    _円グラフ=グラフ！作る．
    _円グラフ:_DATA=自分．
    _円グラフ:f1  =  自分:フィールド名！1  読む。
    _円グラフ:f2  =  f2。
    _円グラフ:描画=「|  i  |
        自分!位置確定。
        自分!  20  0  移動する。    
        ペン＝タートル！作る。
        D_f1=_DATA!    (f2)    小さい順  (f1)  射影。
        r=グラフ:_縦幅/2.    x=90.    x_pos=  r+20.    y_pos=  -1*r.
        自分:_円原点x=グラフ:_原点x+r。
        自分:_円原点y=グラフ:_原点y+r/2。
        d_arr=_DATA！(f2)  小さい順  (f2)  射影。
        sum=d_arr!(f2)  合計値    値読み出し。
        add=0。
        自分:_左端=(自分:_円原点x)-(r)-20。
        自分:_天井=(自分:_円原点y)+(r)+30。
        自分:_底=(自分:_円原点y)+y_pos-20。
        
        要素数=d_arr:データ!要素数?。
        _max_length=1。
        角度合計  =  ０。
        割合合計  =  0。
        d_arr：データ!「|  val  j|
            prop=round((val/sum)*1000)。
            prop=prop/10.
            チーズ角度  =  round(prop*3.6)。
            col=  グラフ！(j)  着色。
            long=0。
            割合合計=割合合計+prop。
            角度合計=角度合計+    チーズ角度。
            「j  ==  要素数」！なら「
                「角度合計  >  360」  !なら    「
                    チーズ角度=チーズ角度-(角度合計-360)。
                」そうでなければ「    角度合計  <  360」  なら    「
                    チーズ角度=チーズ角度+(360-角度合計)。        
                」実行。
                「割合合計  >  100」!なら「
                    prop=prop-(割合合計-100)。    
                」そうでなければ「割合合計  <  100」なら「
                    prop=prop+(100-割合合計)。
                」実行。
                prop=(round(prop*10))/10。
            」実行。
            ペン！ペンなし  0  0  位置．
            「チーズ角度!=0」!なら「
                チーズ＝「
                    ペン！ペンあり  1  線の太さ  ((r)*cos(x))  ((r)*sin(x))  位置．
                    x=x+1．
                    long=long+1.
                    ペン．
                」!  (チーズ角度)  繰り返す  0  0  位置  (col)  図形を作る．
                チーズ！(自分:_円原点x)  (自分:_円原点y)  位置。
                
                「(long)  >=  20」！なら「
                    
                    ラベル！(prop+"%")  作る  (自分:_円原点x+(r/3*2)*cos(x-(long/2))-5)  (自分:_円原点y+(r/3*2)*sin(x-(long/2)))  位置  (自分：_軸ラベルサイズ-4)  文字サイズ。
                」そうでなければ「
                    
                    ラベル！(prop+"%")  作る  (自分:_円原点x+(r/4*5)*cos(x-(long/2))-5)  (自分:_円原点y+(r/4*5)*sin(x-(long/2)))  位置  (自分：_軸ラベルサイズ-5)  文字サイズ。
                    
                    ペン!ペンなし  (自分:_円原点x+(r/4*5)*cos(x-(long/2))+5)  (自分:_円原点y+(r/4*5)*sin(x-(long/2))-25)      位置  ペンあり  (自分:_円原点x+(r)*cos(x-(long/2)))  (自分:_円原点y+(r)*sin(x-(long/2)))      位置  (黒)      図形を作る。
                」実行。
                
                ペン！ペンなし  (自分:_円原点x+x_pos)  (自分:_円原点y+y_pos)  位置  ペンあり  10  4  角形  (col)  図形を作る。
                A=ラベル!  (D_f1:データ！  (j)  読む)  作る  (自分:_円原点x+x_pos+15)  (自分:_円原点y+y_pos+10)  位置  (自分：_軸ラベルサイズ)    文字サイズ。
                
                ラベル!  ("　"+(d_arr！  (j)  読む)+"件")  作る  (自分:_円原点x+x_pos+15+(A!幅？))  (自分:_円原点y+y_pos+10)  位置    (自分：_軸ラベルサイズ)  文字サイズ。
                y_pos  =  y_pos  +  20。
                sum_length=(((D_f1:データ！  (j)  読む)+"")!    長さ？)  +  (("    "+(d_arr！  (j)  読む)+"件")  !長さ?)。
                「_max_length<sum_length」!なら「_max_length=sum_length」実行。
            」実行。
        」それぞれ実行。
        
        自分:_右端=自分:_円原点x+x_pos+15*(_max_length)。
        グラフ:_原点x=自分:_右端+60．
        ペン！消える．
        自分:_最小メモリ=undef。
        自分。
    」.
    //グラフ：個体番号＝グラフ：個体番号+1。
    「どれか!(f2==undef)  (_円グラフ:_DATA==undef)  本当」！なら「
        undef。
    」そうでなければ「
        「自分！(_円グラフ:f2)    check_fn」!なら「
            「自分!(_円グラフ:f2)  射影  check_dt」！なら「
                //グラフ：個体番号＝グラフ：個体番号+1。
                _円グラフ。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。

テーブル：帯グラフ=「|;補正  |
    _帯グラフ=グラフ！作る。
    _帯グラフ:_DATA=自分。
    _帯グラフ:f1  =  自分:フィールド名！1  読む。
    _帯グラフ:joint_pos=配列！作る。
    _帯グラフ:f2  =  自分!(_rest)  getarg。
    _帯グラフ:_帯長さ=(_帯グラフ:_横幅)/100．
    _帯グラフ:_方向="帯"。
    _帯グラフ:描画=「|;系列長    kxpos  |
        自分!位置確定。
        
        「f2==undef」！なら「
            //tmp=(_DATA：フィールド名)！作る。
            tmp=(_DATA：フィールド名)！concat。
            f2=tmp!1  位置で消す。
        」実行。
        
        型配列=自分!(_DATA)  型判定。
        「(型配列!要素数?)>0」!なら「
            型配列!「|n|
                f2=f2!(n)  消す。
            」それぞれ実行。
        」実行。
        
        data_x=_DATA！(f1)  射影。
        フィールド数=f2!要素数?。
        系列数=data_x:データ!要素数?。
        ペン=タートル!  作る    1  線の太さ    。
        横の位置配列=配列！作る。
        注釈フラグ=false。
        描画用データ=自分:_DATA!  (f2!  1  (f1)  挿入)  射影  行列入れ替え。
        f2!1    位置で消す。
        自分!  (フィールド数)  横幅設定。  
        自分!  (フィールド数)  メモリ線描画。
        自分:_プロット幅  =  自分:_プロット幅。
        
        ペン！    ぺんなし    (グラフ:_原点x)  (グラフ:_原点y+自分:_間隔)  位置。
        ラベルx=グラフ:_原点x-10。
        ラベルy=グラフ:_原点y+(自分:_間隔+自分:_プロット幅/2+(自分：_軸ラベルサイズ))。
        割合ラベルy=グラフ:_原点y+(自分:_間隔+自分:_プロット幅/2+(自分：_軸ラベルサイズ))。
        
        「|  j  |
            data_y=描画用データ!((data_x!(j)  読む)+"")  射影。  
            
            「|  i  ;n|
                合計=自分:_DATA!(f2!(i)  読む)  合計値  数にする。
                「j==1」！なら「
                    横の位置配列!0  書く。
                」実行。
                n=data_y:データ!(i)  読む。
                「n==""」!なら「n=0」実行。
                val=f2!(i)  読む。
                メモリ調整＝((val+"")!長さ?)*12。    
                割合=round((n/合計)*1000)/10。
                ペン!ペンなし    (横の位置配列!(i)  読む)  0    移動する。
                ペン！ペンあり    ((自分:_帯長さ)*割合)  歩く    90  左回り    (自分:_プロット幅)  歩く    90  左回り    ((自分:_帯長さ)*割合)  歩く    180  左回り  (自分!(j)    着色)    図形にする。    
                ペン!ペンなし    0  (自分:_間隔)  移動する。
                ペン!ペンなし    (-1*(横の位置配列!(i)  読む))  0    移動する。  
                「割合!=0」！なら「
                    ラベル!(割合+"%")  作る  (グラフ:_原点x+(横の位置配列!(i)読む)+((自分:_帯長さ)*割合)/2-10)  (割合ラベルy)    位置    (自分：_軸ラベルサイズ-3)  文字サイズ。
                」実行。
                横の位置配列!(i)    ((横の位置配列!(i)読む)+(自分:_帯長さ)*割合)    上書き。
                割合ラベルy=割合ラベルy+(自分:_間隔+自分:_プロット幅)。  
                「j==1」！なら「
                    ラベル!  (val)  作る    (自分：_軸ラベルサイズ)    文字サイズ    (ラベルx-メモリ調整)  (ラベルy)  位置。
                    ラベルy=ラベルy+(自分:_間隔+自分:_プロット幅)。
                    「自分:_左端  >=  (ラベルx-メモリ調整-30)」!なら「
                        自分:_左端=ラベルx-メモリ調整  -30。
                    」実行。
                」実行。
            」!(フィールド数)  繰り返す。
            割合ラベルy=グラフ:_原点y+(自分:_間隔+自分:_プロット幅/2+(自分：_軸ラベルサイズ))。
            ペン！    ぺんなし    (グラフ:_原点x)  (グラフ:_原点y+自分:_間隔)  位置。
            
            横の位置配列!「|  n  i  |
                「i==１」！なら「
                    ペン2=タートル!作る  (色!0xBDBDBD  作る)  線の色．
                    ペン2!  (赤)  線の色  ペンなし  (グラフ:_原点x+n)  (グラフ:_原点y+自分:_間隔+自分:_プロット幅)    位置。
                」そうでなければ「
                    ペン2!(色!0xBDBDBD  作る)  線の色  ペンあり  (グラフ:_原点x+n)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*i-自分:_プロット幅)    位置  図形を作る。
                    ペン2!  ペンなし  0  (自分:_プロット幅)    移動する  消える。    
                」実行。
            」それぞれ実行。
            ペン！    ぺんなし    (グラフ:_原点x)  (グラフ:_原点y+自分:_間隔)  位置。
            
        」!  (系列数)  繰り返す。
        
        
        「系列数  >  1」！なら「
            ペン!ペンなし  (グラフ:_原点x)  (自分:_底-5)  位置。
            系列ラベルx  =    グラフ:_原点x+10。  
            系列ラベルy  =  自分:_底+7。
            「|i|
                系列名=data_x!(i)    読む。
                系列名長=(系列名+"")!長さ？。
                ペン！ペンあり  6  4  角形    (自分!(i)    着色)    図形を作る。
                ラベル!    (系列名)    作る    （系列ラベルx）  (系列ラベルy)    位置  (自分：_軸ラベルサイズ-2)  文字サイズ。
                ペン!ペンなし    (系列名長*12+16)    0  移動する。
                系列ラベルx  =  系列ラベルx+(系列名長*12+16)。
            」!(系列数)    繰り返す。
            自分:_底＝自分:_底-20。
        」実行。
        
        ペン！消える。
        「自分:_横軸タイトル文==undef」！なら「
            自分！(自分:f1)  横軸タイトル。
        」実行。
        「自分:_縦軸タイトル文==undef」！なら「
            自分！("")  縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        グラフ:_原点x=自分:_右端+60．
        //テーブル:x=自分:_右端。
        自分:_最小メモリ=undef。
        自分。
    」。
    //グラフ：個体番号＝グラフ：個体番号+1。
    「_帯グラフ:f2==undef」!なら「
        _帯グラフ。
    」そうでなければ「
        「全部!  (自分!(_帯グラフ:f2)  check_fn)  (_帯グラフ:_DATA!=undef)    本当」!なら「
            「_帯グラフ:_DATA!(_帯グラフ:f2!1  読む)    射影  check_dt」!なら「
                _帯グラフ。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。

テーブル:散布図＝「|f1  f2  flag|
    _散布図＝グラフ！作る。
    _散布図:_DATA=自分。
    _散布図:f1  =  f1。
    _散布図:f2  =  f2。
    _散布図:_方向="散布図"。
    _散布図:_グリッド線なし=false。
    _散布図:_横幅=グラフ:_縦幅。
    _散布図:_縦幅=グラフ:_縦幅。
    _散布図:_天井=_散布図:_原点y+_散布図:_横幅。
    //_散布図:_右端=_散布図:_原点x+_散布図:_横幅。
    _散布図:_原点y=_散布図:_原点y-10。
    _散布図：描画=「||
        自分!位置確定。
        //「(グラフ:_原点x)==(グラフ:_原点x)」!なら「自分!位置確定。」実行。
        ペン=タートル!作る。
        data_x=_DATA!(f1)  射影。
        data_y=_DATA!(f2)  射影。
        
        自分:    _DACOLX=自分!(data_x:データ)  (自分:_横幅)  データ補正値計算。
        自分:_scalex=自分:_scale。
        自分:_段数x=自分:_段数。
        自分:_桁x=自分:_digit。
        自分:_最大メモリ=undef。
        自分:_最小メモリ=undef。
        自分:_DACOLY=自分!(data_y:データ)  (自分:_縦幅)  データ補正値計算。
        自分:_scaley=自分:_scale。  
        自分:_段数y=自分:_段数。
        自分:_桁y=自分:_digit。
        自分!メモリ線描画。
        
        data_x:データ!「|val  cnt|
            ペン！ペンなし  (グラフ:_原点x+val*自分:_DACOLX)  ((data_y:データ!(cnt)  読む)*自分:_DACOLY+グラフ:_原点y+3)  位置  ペンあり  4  6  角形  (赤)    図形を作る。
        」それぞれ実行。
        
        「_横軸タイトル文==undef」！なら「
            自分！(f1)  横軸タイトル。
        」実行。
        「_縦軸タイトル文==undef」！なら「
            自分！(f2)  縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        ペン!消える。
        
        「自分:_近似」！なら「
            自分!最小二乗法。
            自分:_近似=false。
        」実行。
        
        グラフ:_原点x=自分:_右端+60．
        自分:_最小メモリ=undef。
        自分。
    」。
    //グラフ：個体番号＝グラフ：個体番号+1。
    「どれか！(_散布図:f1==undef)  (_散布図:f2==undef)  本当」!なら「
        undef。
    」そうでなければ「
        「全部!  (自分!(_散布図:f1)  check_fn)  (自分!(_散布図:f2)  check_fn)  本当」!なら「
            「全部!(_散布図:_DATA!(_散布図:f1)    射影  check_dt)  (_散布図:_DATA!(_散布図:f2)    射影  check_dt)  本当」!なら「
                _散布図。
            」そうでなければ「
                undef。
            」実行。
        」そうでなければ「
            undef。
        」実行。
    」実行。
」。



テーブル：箱ひげ図=「  |f1  f2|
    _箱ひげ図＝グラフ！作る。
    _箱ひげ図:_DATA=自分．
    _箱ひげ図:f1  =  f1。
    _箱ひげ図:f2  =  f2。
    
    _箱ひげ図：描画=「||
        自分!位置確定。
        //一つ目の引数(x軸の要素)を取得し値の重複を除く。
        data_x=_DATA！(f1)  内部_重複なし。
        f1_num＝0．
        f2_num＝0．
        data_y  =  _DATA！(f2）射影．
        
        要素数=data_x:データ!要素数?。
        プロット数=data_y:データ!要素数?。
        自分!  (要素数)横幅設定。  
        自分!  (data_y)  縦幅設定。
        自分!  (要素数)  メモリ線描画。
        
        //引数に取られたフィールドがそれぞれ何番目の要素であるかを調べる
        「｜番号｜
            「（_DATA:フィールド名！（番号）読む）＝＝  (f1)」！なら
            「f1_num＝番号。」そうでなければ
            「（_DATA:フィールド名！（番号）読む）＝＝  (f2)」なら
            「f2_num＝番号。」実行。
        」！（_DATA:フィールド名！要素数？）繰り返す。
        ペン＝タートル！作る  1  線の太さ。
        data_x:データ!「|f  cnt|
            tmp=_DATA!(f)  (f1_num)  レコード取り出し。//選択に相当
            tmp2=tmp!(f2)  射影。
            tmp3=tmp!(f2)  射影。
            qua3=tmp!(f2)  第3四分位数  値読み出し。
            qua2=tmp!(f2)  中央値  値読み出し。
            qua1=tmp!(f2)  第1四分位数  値読み出し。
            ave=tmp!(f2)  平均値  値読み出し。
            
            「qua1!=undef」!なら「
                IRQ=qua3-qua1。
                「自分:_方向=="縦"」！なら「
                    
                    tmp2:データ!「|n  i|
                        「どれか!(n  >  (qua3+IRQ*1.5))  (n  <  (qua1-IRQ*1.5))  本当」！なら「
                            ペン！ペンなし  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))  (グラフ:_原点y+n*_DACOL)  位置  ぺんあり  3  円。
                            tmp3:データ!(n)  消す。
                        」実行。
                    」それぞれ実行。
                    _max=tmp3!(f2)  最大値    値読み出し。    
                    _min=tmp3!(f2)  最小値    値読み出し。
                    //平均のバッテン
                    ペン！ぺんなし    (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)-((20/sqrt(2))/2))  (グラフ:_原点y+ave*(_DACOL)+((20/sqrt(2))/2))  位置  45  右回り  ぺんあり  20  歩く    ペンなし  位置  45  左回り    ．
                    ペン！ぺんなし    (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)-((20/sqrt(2))/2))  (グラフ:_原点y+ave*(_DACOL)-((20/sqrt(2))/2))  位置  45  左回り  ぺんあり  20  歩く  ペンなし    位置  45  右回り．
                    //縦棒
                    ペン！ペンなし  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))  (グラフ:_原点y+_max*_DACOL)
                    位置  ペンあり  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))  (グラフ:_原点y+qua3*_DACOL)  位置．
                    ペン！ペンなし  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))  (グラフ:_原点y+qua1*_DACOL)
                    位置  ペンあり  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))  (グラフ:_原点y+_min*_DACOL)  位置．
                    ペン！ペンなし  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  (グラフ:_原点y+qua3*_DACOL)
                    位置  ペンあり  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  (グラフ:_原点y+qua1*_DACOL)  位置．
                    ペン！ペンなし  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt)  (グラフ:_原点y+qua3*_DACOL)
                    位置  ペンあり  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt)  (グラフ:_原点y+qua1*_DACOL)  位置。    
                    //横棒
                    ペン！ペンなし  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  (グラフ:_原点y+qua3*_DACOL)  位置    ペンあり  (自分:_プロット幅)  歩く。
                    ペン！ペンなし  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  (グラフ:_原点y+qua2*_DACOL)  位置    ペンあり  (自分:_プロット幅)  歩く。
                    ペン！ペンなし  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  (グラフ:_原点y+qua1*_DACOL)  位置    ペンあり  (自分:_プロット幅)  歩く。
                    ペン！ペンなし  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  (グラフ:_原点y+_max*_DACOL)  位置    ペンあり  (自分:_プロット幅)  歩く。
                    ペン！ペンなし  (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  (グラフ:_原点y+_min*_DACOL)  位置    ペンあり  (自分:_プロット幅)  歩く    ペンなし。
                    プロット＝ペン！図形にする。
                    
                    「cnt  ==  1」！なら「
                        data_x:データ!「|  n  i  |
                            長=(n+"")!長さ?。
                            調整=0。
                            「長  <  3」!なら「
                                調整=(3-長)*5。
                            」そうでなければ「長  >  3」なら「
                                調整=-1*(長-3)*2。
                            」実行。
                            ラベル!  (n)  作る    (自分：_軸ラベルサイズ)    文字サイズ    (グラフ:_原点x+(自分:_間隔+自分:_プロット幅)*i-自分:_プロット幅/2-長*5)  (グラフ:_原点y-10)  位置。
                        」それぞれ実行。
                        自分:_底=自分:_底-30。
                        
                    」実行。
                    
                」そうでなければ「自分:_方向=="横"」なら「
                    「cnt==1」！なら「
                        ペン!90  左回り。
                    」実行。
                    tmp2:データ!「|n  i|
                        「どれか!(n  >  (qua3+IRQ*1.5))  (n  <  (qua1-IRQ*1.5))  本当」！なら「
                            ペン！ペンなし  (グラフ:_原点x+n*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))    位置  ぺんあり  3  円。
                            tmp3:データ!(n)  消す。
                        」実行。
                    」それぞれ実行。
                    
                    _max=tmp3!(f2)  最大値    値読み出し。    
                    _min=tmp3!(f2)  最小値    値読み出し。
                    //平均のバッテン
                    ペン！ぺんなし  (グラフ:_原点x+ave*(_DACOL)-((20/sqrt(2))/2))  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)-((20/sqrt(2))/2))位置  45  右回り  ぺんあり  20  歩く    ペンなし  位置  45  左回り    ．
                    ペン！ぺんなし  (グラフ:_原点x+ave*(_DACOL)+((20/sqrt(2))/2))  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2)-((20/sqrt(2))/2))  位置  45  左回り  ぺんあり  20  歩く  ペンなし    位置  45  右回り。
                    //縦棒
                    ペン！ペンなし  (グラフ:_原点x+_max*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))
                    位置  ペンあり  (グラフ:_原点x+qua3*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))  位置．
                    
                    ペン！ペンなし  (グラフ:_原点x+qua1*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))
                    位置  ペンあり    (グラフ:_原点x+_min*_DACOL)      (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅+(自分:_プロット幅/2))位置．
                    
                    ペン！ペンなし  (グラフ:_原点x+qua3*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  位置  ペンあり    (グラフ:_原点x+qua1*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  位置．
                    ペン！ペンなし  (グラフ:_原点x+qua3*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt)  位置  ペンあり  (グラフ:_原点x+qua1*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt)  位置。    
                    //横棒
                    ペン！ペンなし  (グラフ:_原点x+qua3*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  位置    ペンあり  (自分:_プロット幅)  歩く。
                    ペン！ペンなし  (グラフ:_原点x+qua2*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  位置    ペンあり  (自分:_プロット幅)  歩く。
                    ペン！ペンなし  (グラフ:_原点x+qua1*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)位置    ペンあり  (自分:_プロット幅)  歩く。
                    ペン！ペンなし  (グラフ:_原点x+_max*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  位置    ペンあり  (自分:_プロット幅)  歩く。
                    ペン！ペンなし  (グラフ:_原点x+_min*_DACOL)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*cnt-自分:_プロット幅)  位置    ペンあり  (自分:_プロット幅)  歩く    ペンなし。
                    プロット＝ペン！図形にする。
                    
                    「cnt  ==  1」！なら「
                        最長=0。
                        data_x:データ!「|  n  i  |
                            長=(n+"")!長さ?。
                            「長  >  最長」!なら「最長=長」実行。
                            調整=0。
                            「長  <  3」!なら「
                                調整=(3-長)*5。
                            」そうでなければ「長  >  3」なら「
                                調整=-1*(長-3)*2。
                            」実行。
                            ラベル!  (n)  作る    (自分：_軸ラベルサイズ)    文字サイズ    (グラフ:_原点x-20+長-長*10)  (グラフ:_原点y+(自分:_間隔+自分:_プロット幅)*i-自分:_プロット幅/2+10)  位置。
                        」それぞれ実行。
                        自分:_左端=自分:_左端-最長*15。
                        
                    」実行。
                」実行。
            」実行。
            
        」それぞれ実行。
        
        「_横軸タイトル文==undef」！なら「
            自分！("項目")  横軸タイトル。
        」実行。
        「_縦軸タイトル文==undef」！なら「
            自分！("")  縦軸タイトル。
        」実行。
        自分！縦軸タイトル描画。
        自分！横軸タイトル描画。
        グラフ:_原点x=自分:_右端+60．
        ペン！図形にする。
        ペン！消える。
        自分:_最小メモリ=undef。
        自分。
    」．
    //グラフ：個体番号＝グラフ：個体番号+1。
    「どれか！(_箱ひげ図:f1==undef)  (_箱ひげ図:f2==undef)  本当」!なら「
        undef。
    」そうでなければ「
        「全部!  (自分!(_箱ひげ図:f1)  check_fn)  (自分!(_箱ひげ図:f2)  check_fn)  本当」!なら「
            「  _箱ひげ図:_DATA!(_箱ひげ図:f2)    射影  check_dt」!なら「
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
