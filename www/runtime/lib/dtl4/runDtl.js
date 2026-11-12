/* ドリトルV4（オンライン版ドリトル djs V4.06 (2026/10/31)）を Bit Arrow の実行画面で起動する。
   Bit Arrow の runtime/lib/dtl/runDtl.js と同じ役割・同じ約束で動く:
     - Dtl4Builder が作った HTML が window.BitArrow（runtimePath・main）を置き、require.js とこのファイルを読む
     - このファイルが実行時ライブラリを順に読み、最後に requirejs([BitArrow.main]) で変換済みの .js を実行する
   このファイルは djs の tools/bitarrow_kit/build.mjs が runtime/run.html の <script> の並びから作る。直接は編集しない。 */
/* global requirejs */
(function () {
  var BitArrow = window.BitArrow;
  var R = BitArrow.runtimePath;          // Bit Arrow の runtime/ の URL（末尾は /）
  var BASE = R + "lib/dtl4/";            // このキットの置き場
  // djs の実行時ライブラリは window.runtimePath + "images/" から画像を読む。
  // Bit Arrow の runtime/images と 3 枚（apple・car・neko）が違うので、キットに入れた images を使う。
  window.runtimePath = BASE;
  var urlArgs = "202611112051";          // キットを入れ替えたときにブラウザの古い写しを使わせない
  function u(n) { return BASE + n + ".js?" + urlArgs; }
  // run.html の <script> と同じ順（require.js と、localStorage から読む起動部 index.js は除く）
  var libs = [ "jquery-1.12.1", "mt", "AsyncByGenerator", "promise", "lib", "polyk", "calibration", "devicemotion", "Dict", "Vec2", "Actor", "Group", "UI", "Color", "Timer", "Util", "Turtle", "Figure", "Image", "webaudio-tinysynth", "Music", "DOM", "Japanese2", "HtmlDom", "dolittle_classify", "dolittle_runtime_error", "MoveSlow", "db", "WebClient", "TextFile", "eval", "server", "webapi", "WebClientFetch", "grid", "startup" ];

  function css(href) {
    var l = document.createElement("link");
    l.rel = "stylesheet"; l.type = "text/css"; l.href = BASE + href + "?" + urlArgs;
    document.head.appendChild(l);
  }
  ["css/bootstrap.css","css/style.css"].forEach(css);

  function load(i) {
    if (i >= libs.length) return done();
    requirejs([u(libs[i])], function () { load(i + 1); });
  }
  load(0);

  // 文字列！実行 が使うトランスパイラ（IDE と同じもの）。公開した URL を直接開いたときも動くよう実行画面の側に置く。
  // 実行時ライブラリを読んだ画面の中で直接動かすと構文解析が壊れる（djs が親の編集画面のものを使うのと同じ理由）ので、
  // 見えないフレームの中に読み込み、そこで動かす。読めなくても実行は始める（文字列！実行 だけがエラーになる）。
  function done() {
    var started = false;
    function go() { if (!started) { started = true; start(); } }
    try {
      var fr = document.createElement("iframe");
      fr.id = "dtl4_parser";
      fr.style.display = "none";
      document.documentElement.appendChild(fr);
      var fd = fr.contentWindow.document;
      var sc = fd.createElement("script");
      sc.charset = "utf-8";
      sc.onload = function () { window.MinimalParser = fr.contentWindow.MinimalParserV4; go(); };
      sc.onerror = go;
      sc.src = u("minimal");
      (fd.head || fd.documentElement).appendChild(sc);
      setTimeout(go, 5000);
    } catch (e) { go(); }
  }

  function start() {
    if (typeof window.startup === "function") window.startup([]);

    // 実行時エラーを分かりやすい文に直すための命令名の表
    try {
      if (window.DolittleRuntimeError && window.fetch) {
        window.fetch(BASE + "method-dictionary-extended.json?" + urlArgs)
          .then(function (r) { return r.json(); })
          .then(function (d) {
            var s = new Set();
            (d.extended_method_names || []).forEach(function (n) { if (typeof n === "string") s.add(n); });
            window.DolittleRuntimeError.setMethodNames(s);
          })["catch"](function () {});
      }
    } catch (e) {}

    // 実行したことを Bit Arrow のログへ（runtime/lib/dtl/runDtl.js と同じ。エラーのときは送らない）
    var hsend = setTimeout(function () {
      try {
        if (window.parent && window.parent.sendResult) {
          window.parent.sendResult("実行されました" + window.$("body").text(), "dtl");
        }
      } catch (e) {}
    }, 1000);

    // 実行時エラー: djs の文（toFriendly）に直してから、Bit Arrow が実行画面に入れた window.onerror へ渡す。
    // 入っていなければ（公開した URL を直接開いたとき）alert で出す。
    var prev = window.onerror;
    window.onerror = function (msg, src, line, col, error) {
      clearTimeout(hsend);
      var text = (typeof msg === "string") ? msg : String(msg);
      try {
        if (window.DolittleRuntimeError) {
          var f = window.DolittleRuntimeError.toFriendly(error || msg);
          if (f) text = f;
        }
      } catch (e) {}
      if (error && typeof error === "object") {
        try { error.message = text; } catch (e) {}
      }
      if (typeof prev === "function") return prev.call(window, text, src, line, col, error);
      window.alert(text);
      return true;
    };

    requirejs([BitArrow.main], function () {});
  }
})();
