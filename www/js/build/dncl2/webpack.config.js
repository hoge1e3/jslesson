// webpack.config.js
module.exports = {
    target: "node",
    entry: "./js/minimal.js",
    mode: "development",
    
    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: `${__dirname}/dist`,
        // 出力ファイル名
        filename: "minimal.js"
     }
  };
  
  