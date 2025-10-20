(function () {
  this["テーブル"]["addAlias"]("ファイルから作る", "read");
  this["テーブル"]["addAlias"]("作る", "make");
  this["テーブル"]["addAlias"]("追加", "insert");
  this["テーブル"]["addAlias"]("数にする", "get_number");
  this["テーブル"]["addAlias"]("配列にする", "get_array");
  this["テーブル"]["addAlias"]("表示", "show");
  this["テーブル"]["addAlias"]("選択", "select");
  this["テーブル"]["addAlias"]("射影", "projection");
  this["テーブル"]["addAlias"]("結合", "join");
  this["テーブル"]["addAlias"]("大きい順", "descending");
  this["テーブル"]["addAlias"]("小さい順", "ascending");
  this["テーブル"]["addAlias"]("行列入れ替え", "transpose");
  this["テーブル"]["addAlias"]("フィールド名変更", "colnum_name");
  this["テーブル"]["addAlias"]("重複なし", "unique");
  this["テーブル"]["addAlias"]("合計値", "sum");
  this["テーブル"]["addAlias"]("平均値", "average");
  this["テーブル"]["addAlias"]("中央値", "median");
  this["テーブル"]["addAlias"]("最頻値", "mean");
  this["テーブル"]["addAlias"]("最大値", "max");
  this["テーブル"]["addAlias"]("最小値", "min");
  this["テーブル"]["addAlias"]("第1四分位数", "quantile1");
  this["テーブル"]["addAlias"]("第3四分位数", "quantile3");
  this["テーブル"]["addAlias"]("分散", "dispersion");
  this["テーブル"]["addAlias"]("不偏分散", "unbiased_dispertion");
  this["テーブル"]["addAlias"]("共分散", "covariance");
  this["テーブル"]["addAlias"]("不偏共分散", "unbiased_covariance");
  this["テーブル"]["addAlias"]("偏差", "deviation");
  this["テーブル"]["addAlias"]("標準偏差", "standard_deviation");
  this["テーブル"]["addAlias"]("不偏標準偏差 ", "unbiased_standard_deviation");
  this["テーブル"]["addAlias"]("相関係数", "correlation");
  this["テーブル"]["addAlias"]("偏相関係数", "partial_correltion");
  this["テーブル"]["addAlias"]("度数", "frequancy");
  this["テーブル"]["addAlias"]("度数分布", "frequancy_distribution");
  this["テーブル"]["addAlias"]("度数分布表", "frequancy_tabele");
  this["テーブル"]["addAlias"]("クロス集計", "crosstab");
  this["テーブル"]["addAlias"]("クロス集計表", "crosstab_table");
  this["テーブル"]["addAlias"]("棒グラフ", "bar_graph");
  this["テーブル"]["addAlias"]("積み上げ棒グラフ", "stacked_bar_graph");
  this["テーブル"]["addAlias"]("ヒストグラム", "histgram");
  this["テーブル"]["addAlias"]("折れ線グラフ", "line_graph");
  this["テーブル"]["addAlias"]("円グラフ", "pie_chart");
  this["テーブル"]["addAlias"]("帯グラフ", "horizonal_bar_graph");
  this["テーブル"]["addAlias"]("散布図", "scatter_plot");
  this["テーブル"]["addAlias"]("箱ひげ図", "box_plot");
  this["グラフ"]["addAlias"]("描画", "draw");
  this["グラフ"]["addAlias"]("画像にする", "get_image");
  this["グラフ"]["addAlias"]("移動する", "move");
  this["グラフ"]["addAlias"]("メモリ範囲", "scale");
  this["グラフ"]["addAlias"]("横軸タイトル", "horizontal_axis_title");
  return this["グラフ"]["addAlias"]("縦軸タイトル", "vertical_axis_title");
})
  .checkerror()
  .apply(root, []);

/*
テーブル!"ファイルから作る""read"addAlias.
テーブル!"作る""make"addAlias.
テーブル!"追加""insert"addAlias.
テーブル!"数にする""get_number"addAlias.
テーブル!"配列にする""get_array"addAlias.
テーブル!"表示""show"addAlias.
テーブル!"選択""select"addAlias.
テーブル!"射影""projection"addAlias.
テーブル!"結合""join"addAlias.
テーブル!"大きい順""descending"addAlias.
テーブル!"小さい順""ascending"addAlias.
テーブル!"行列入れ替え""transpose"addAlias.
テーブル!"フィールド名変更""colnum_name"addAlias.
テーブル!"重複なし""unique"addAlias.
テーブル!"合計値""sum"addAlias.
テーブル!"平均値""average"addAlias.
テーブル!"中央値""median"addAlias.
テーブル!"最頻値""mean"addAlias.
テーブル!"最大値""max"addAlias.
テーブル!"最小値""min"addAlias.
テーブル!"第1四分位数""quantile1"addAlias.
テーブル!"第3四分位数""quantile3"addAlias.
テーブル!"分散""dispersion"addAlias.
テーブル!"不偏分散""unbiased_dispertion"addAlias.
テーブル!"共分散""covariance"addAlias.
テーブル!"不偏共分散""unbiased_covariance"addAlias.
テーブル!"偏差""deviation"addAlias.
テーブル!"標準偏差""standard_deviation"addAlias.
テーブル!"不偏標準偏差 ""unbiased_standard_deviation"addAlias.
テーブル!"相関係数""correlation"addAlias.
テーブル!"偏相関係数""partial_correltion"addAlias.
テーブル!"度数""frequancy"addAlias.
テーブル!"度数分布""frequancy_distribution"addAlias.
テーブル!"度数分布表""frequancy_tabele"addAlias.
テーブル!"クロス集計""crosstab"addAlias.
テーブル!"クロス集計表""crosstab_table"addAlias.
テーブル!"棒グラフ""bar_graph"addAlias.
テーブル!"積み上げ棒グラフ""stacked_bar_graph"addAlias.
テーブル!"ヒストグラム""histgram"addAlias.
テーブル!"折れ線グラフ""line_graph"addAlias.
テーブル!"円グラフ""pie_chart"addAlias.
テーブル!"帯グラフ""horizonal_bar_graph"addAlias.
テーブル!"散布図""scatter_plot"addAlias.
テーブル!"箱ひげ図""box_plot"addAlias.
グラフ!"描画""draw"addAlias.
グラフ!"画像にする""get_image"addAlias.
グラフ!"移動する""move"addAlias.
グラフ!"メモリ範囲""scale"addAlias.
グラフ!"横軸タイトル""horizontal_axis_title"addAlias.
グラフ!"縦軸タイトル""vertical_axis_title"addAlias.

*/
