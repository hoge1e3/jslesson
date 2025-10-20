(function () {
  if (this.window.localStorage.noLocalize !== "1") {
        var aa;
        this.makeCaseInsensitiveAll();
        aa = this.root.addAlias;
        this.addAlias("Button", "guiButton", "ボタン");
        this.addAlias("Field", "guiField", "TextField", "フィールド");
        this.addAlias("Label", "guiLabel", "ラベル");
        this.addAlias("ListBox", "guiList", "リスト");
        this.addAlias("TextArea", "guiArea", "テキストエリア");
        this.addAlias("Screen", "screen");
        this.addAlias("Ink", "palette", "pigment", "絵の具", "絵具");
        this.System.addAlias("time?", "時刻");
        this.System.addAlias("month?", "月");
        this.System.addAlias("day?", "日");
        this.System.addAlias("hour?", "時");
        aa.call(this.window.Number.prototype, "fromCharCode", "codechar");
        aa.call(this.window.String.prototype, "charCodeAt", "charcode");
        aa.call(this.window.String.prototype, "position?", "indexof", "indexof?");
        aa.call(this.window.String.prototype, "allReplace", "substall");
        aa.call(this.window.String.prototype, "oneReplace", "subst");
        this.addAlias("and", "全部", "ぜんぶ");
        this.addAlias("or", "どれか");
        aa.call(this.or, "true", "本当", "ほんとう");
        aa.call(this.and, "true", "本当", "ほんとう");
        this.addAliasFromTable("system", "日時", "datetime?");
        this.addAliasFromTable("system", "曜日", "dayofweek?");
        this.addAliasFromTable("system", "日付", "date?");
        this.addAliasFromTable("system", "年", "year?");
        this.addAliasFromTable("system", "月", "month?");
        this.addAliasFromTable("system", "日", "day?");
        this.addAliasFromTable("system", "時刻,時間", "time?");
        this.addAliasFromTable("system", "時", "hour?");
        this.addAliasFromTable("system", "分", "minute?");
        this.addAliasFromTable("system", "秒", "second?");
        this.addAliasFromTable("system", "システム時間?,システム時間", "systemtime?");
        this.addAlias("action", "click");
        this.addAlias("create", "作る", "つくる");
        aa.call(this.window.Array, "create", "作る", "つくる");
        this.UI.addAlias("paint", "色");
        this["あゆみ赤"] = "ayumiRed.png";
        this["あゆみ青"] = "ayumiBlue.png";
        this["あゆみ黄"] = "ayumiYellow.png";
        this["あゆみ緑"] = "ayumi.png";
        this.addAliasFromTable("turtle", "塗る", "ぬる", "fill,paint");
        this.UI
          .addAlias("nextLine", "次の行")
          .addAlias("inc", "増やす")
          .addAlias("dec", "減らす")
          .addAlias("read", "読む")
          .addAlias("moveTo", "位置")
          .addAlias("moveTo", "position")
          .addAlias("moveBy", "移動する")
          .addAlias("width?", "幅?")
          .addAlias("height?", "高さ?")
          .addAlias("width", "幅")
          .addAlias("height", "高さ")
          .addAlias("clear", "クリア")
          .addAlias("write", "書く")
          .addAlias("add", "追加")
          .addAlias("newLine", "改行");
        this.TextArea
          .addAlias("write", "書く")
          .addAlias("overwrite", "上書き")
          .addAlias("writeLn", "書いて改行")
          .addAlias("readOnly", "読むだけ")
          .addAlias("writable", "読み書き")
          .addAlias("autoBR", "自動改行")
          .addAlias("newLine", "改行")
          .addAlias("setRow", "行数")
          .addAlias("setCol", "桁数")
          .addAlias("setCol", "文字数")
          .addAlias("setCol", "列数")
          .addAlias("readAsArray", "配列で読む")
          .addAlias("changeLine", "行修正");
        this.Figure.addAlias("makeGroup", "結合する", "結合");
        this.Color.addAlias("toFullOpacity", "不透明にする");
        this.addAlias("Dict", "辞書");
        this.Dict
          .addAlias("write", "書く")
          .addAlias("read", "読む")
          .addAlias("has?", "含む?")
          .addAlias("each", "それぞれ実行")
          .addAlias("delete", "削除");
        this.addAlias("setAction", "動作設定");
        this._true
          .addAlias("else", "そうでなければ")
          .addAlias("execute", "実行")
          .addAlias("then", "なら");
        this._false
          .addAlias("else", "そうでなければ")
          .addAlias("execute", "実行")
          .addAlias("then", "なら");
        this._done
          .addAlias("else", "そうでなければ")
          .addAlias("execute", "実行")
          .addAlias("then", "なら");
        this._while.addAlias("execute", "実行");
        this.addAlias("Light", "光");
        this.Light.addAlias("mix", "混ぜる");
        this.Timer.addAlias("next_execute", "次に実行");
        this.addAlias("accelerationSensor", "加速度センサ", "加速度センサー");
        this.accelerationSensor
          .addAlias("setAction", "動作設定")
          .addAlias("use", "使う")
          .addAlias("calibrate", "調整")
          .addAlias("action", "動作")
          .addAlias("getA", "値A")
          .addAlias("getB", "値B")
          .addAlias("getC", "値C")
          .addAlias("getXAcceleration", "左右の加速度?")
          .addAlias("getYAcceleration", "前後の加速度?")
          .addAlias("getZAcceleration", "上下の加速度?");
        this.addAlias("compass", "コンパス", "磁気センサ", "磁気センサー");
        this.compass
          .addAlias("use", "使う")
          .addAlias("setAction", "動作設定")
          .addAlias("action", "動作")
          .addAlias("getDirection", "方向?", "向き?");
        this.addAlias("touchSensor", "タッチセンサ", "タッチセンサー");
        this.touchSensor
          .addAlias("setAction", "動作設定")
          .addAlias("action", "動作")
          .addAlias("use", "使う")
          .addAlias("getTouched", "タッチした?", "触れた?")
          .addAlias("getTouching", "タッチしている?", "タッチしてる?", "触れている?", "触れてる?")
          .addAlias("getX", "横の位置?")
          .addAlias("getY", "縦の位置?");
        this.addAlias("gyroSensor", "ジャイロセンサ", "ジャイロセンサー");
        this.gyroSensor
          .addAlias("setAction", "動作設定")
          .addAlias("action", "動作")
          .addAlias("use", "使う")
          .addAlias("getYaw", "ヨー?", "水平方向の傾き?", "水平の傾き?")
          .addAlias("getRoll", "ロール?", "左右方向の傾き?", "左右の傾き?")
          .addAlias("getPitch", "ピッチ?", "前後方向の傾き?", "前後の傾き?")
          .addAlias("getA", "値A")
          .addAlias("getB", "値B")
          .addAlias("getC", "値C")
          .addAlias("calibrate", "調整")
          .addAlias("use", "使う");
        this.HTML["読む"] = dtlbind(this, function (x) {
          return this.get(x);
        });
        this.HTML["位置"] = dtlbind(this, function (x, y) {
          return this.move(x, y);
        });
        this.addAliasFromTable("root", "待つ,wait");
        this.addAliasFromTable("root", "オブジェクト", "Object");
        this.addAliasFromTable("root", "ブロック", "Block");
        this.addAliasFromTable("root", "論理値", "Boolean");
        this.addAliasFromTable("root", "ルート", "Root");
        this.addAliasFromTable("root", "タートル", "Turtle");
        this.addAliasFromTable("root", "タイマー", "Timer");
        this.addAliasFromTable("root", "ラベル", "Label");
        this.addAliasFromTable("root", "ボタン", "Button");
        this.addAliasFromTable("root", "フィールド", "TextField");
        this.addAliasFromTable("root", "選択メニュー", "SelectMenu");
        this.addAliasFromTable("root", "リスト", "List");
        this.addAliasFromTable("root", "スライダー", "Slider");
        this.addAliasFromTable("root", "テキストエリア", "TextArea");
        this.addAliasFromTable("root", "配列", "Array");
        this.addAliasFromTable("root", "色", "Color");
        this.addAliasFromTable("root", "真", "true");
        this.addAliasFromTable("root", "偽", "false");
        this.addAliasFromTable("root", "サーバー", "Server");
        this.addAliasFromTable("root", "シリアルポート", "SerialPort");
        this.addAliasFromTable("root", "図形", "Figure");
        this.addAliasFromTable("root", "システム", "System");
        this.addAliasFromTable("root", "コンソール", "Console");
        this.addAliasFromTable("root", "文字列", "String");
        this.addAliasFromTable("root", "数値", "Number");
        this.addAliasFromTable("root", "大きい整数", "BigInteger");
        this.addAliasFromTable("root", "メロディ", "Melody");
        this.addAliasFromTable("root", "コード", "Code");
        this.addAliasFromTable("root", "リズム", "Rythm");
        this.addAliasFromTable("root", "ドラム", "DrumSet");
        this.addAliasFromTable("root", "楽器", "Instrument");
        this.addAliasFromTable("root", "打楽器", "Percussion");
        this.addAliasFromTable("root", "バンド", "Band");
        this.addAliasFromTable("root", "未定義", "Undefined");
        this.addAliasFromTable("root", "オブジェクトファイル", "ObjectFile");
        this.addAliasFromTable("root", "テキストファイル", "TextFile");
        this.addAliasFromTable("root", "画面", "Panel");
        this.addAliasFromTable("root", "衝突", "collision");
        this.addAliasFromTable("root", "動作", "click");
        this.addAliasFromTable("root", "回転", "circle");
        this.addAliasFromTable("root", "スワイプ", "swipe");
        this.addAliasFromTable("root", "タップ", "tap");
        this.addAliasFromTable("root", "キータップ", "keytap");
        this.addAliasFromTable("root", "自分", "self");
        this.addAliasFromTable("root", "黒", "Black");
        this.addAliasFromTable("root", "赤", "Red");
        this.addAliasFromTable("root", "緑", "Green");
        this.addAliasFromTable("root", "青", "Blue");
        this.addAliasFromTable("root", "黄", "Yellow");
        this.addAliasFromTable("root", "紫", "Magenta");
        this.addAliasFromTable("root", "水", "Cyan");
        this.addAliasFromTable("root", "白", "White");
        this.addAliasFromTable("root", "光", "light");
        this.addAliasFromTable("root", "絵具", "pigment");
        this.addAliasFromTable("root", "Webクライアント", "WebClient");
        this.addAlias("pink", "ピンク");
        this.addAlias("cyan", "水色");
        this.addAlias("yellow", "黄色");
        this["はい"] = root.true;
        this["いいえ"] = root.false;
        this["真偽値"] = this.window.Boolean;
        this.addAlias("initialize", "初期化");
        this.addAlias("pi", "円周率");
        this.addAlias("dq", "ダブルクォート", "ダブルクォーテーション");
        this.addAlias("dq", "ダブルクオート", "ダブルクオーテーション");
        this.addAlias("ldq", "左ダブルクォート", "左ダブルクォーテーション");
        this.addAlias("ldq", "左ダブルクオート", "左ダブルクオーテーション");
        this.addAlias("rdq", "右ダブルクォート", "右ダブルクォーテーション");
        this.addAlias("rdq", "右ダブルクオート", "右ダブルクオーテーション");
        this.addAlias("ldb", "左二重鉤括弧", "左二重かぎ括弧");
        this.addAlias("rdb", "右二重鉤括弧", "右二重かぎ括弧");
        this.addAlias("accelerationSensor", "加速度センサ", "加速度センサー");
        this.addAlias("compass", "コンパス", "磁気センサ", "磁気センサー");
        this.addAlias("touchSensor", "タッチセンサ", "タッチセンサー");
        this.addAlias("gyroSensor", "ジャイロセンサ", "ジャイロセンサー");
        this.Timer.addAlias("after_execute", "完了時実行");
        this.Timer.addAlias("after_execute", "終了時実行");
        this.Timer.addAlias("after_execute", "最後に実行");
        this.Timer.addAlias("after_execute", "単発実行");
        this.addAliasFromTable(
          "actor",
          "右回り,右回転,右に回る",
          "みぎまわり,みぎかいてん,みぎにまわる",
          "rightturn",
        );
        this.addAliasFromTable(
          "actor",
          "左回り,左回転,左に回る",
          "ひだりまわり,ひだりかいてん,ひだりにまわる",
          "leftturn",
        );
        this.addAliasFromTable("actor", "移動する,移動", "いどうする,いどう", "moveby");
        this.addAliasFromTable("actor", "位置", "いち", "position,moveto");
        this.addAliasFromTable("actor", "向き,方向", "むき,ほうこう", "direction");
        this.addAliasFromTable(
          "actor",
          "拡大する,拡大",
          "かくだいする,かくだい",
          "scale,enlarge",
        );
        this.addAliasFromTable("actor", "消える,消す", "きえる,けす", "hide");
        this.addAliasFromTable("actor", "現れる", "あらわれる", "show");
        this.addAliasFromTable(
          "actor",
          "手前に表示,手前に表示する",
          "てまえにひょうじ,てまえにひょうじする",
          "toFront,bringToFront",
        );
        this.addAliasFromTable("actor", "向き?", "むき?", "direction?");
        this.addAliasFromTable("actor", "横の位置?", "よこのいち?", "xpos?,xposition?");
        this.addAliasFromTable("actor", "縦の位置?", "たてのいち?", "ypos?,yposition?");
        this.addAliasFromTable("actor", "歩く", "あるく", "forward");
        this.addAliasFromTable("actor", "戻る", "もどる", "back,backward");
        this.addAliasFromTable("actor", "跳ね返る,はね返る", "はねかえる", "bounce,bound");
        this.addAliasFromTable("actor", "moveCenter", "中心に戻る");
        this.addAliasFromTable("Actor", "hitTarget", "相手");
        this.addAliasFromTable("turtle", "歩く", "あるく", "forward");
        this.addAliasFromTable("turtle", "戻る", "もどる", "back,backward");
        this.addAliasFromTable(
          "turtle,figure",
          "右回り,右回転,右に回る",
          "みぎまわり,みぎかいてん,みぎにまわる",
          "rightturn",
        );
        this.addAliasFromTable(
          "turtle,figure",
          "左回り,左回転,左に回る",
          "ひだりまわり,ひだりかいてん,ひだりにまわる",
          "leftturn",
        );
        this.addAliasFromTable("turtle,figure", "移動する,移動", "いどうする,いどう", "moveby");
        this.addAliasFromTable("turtle,figure", "位置", "いち", "position,moveto");
        this.addAliasFromTable("turtle,figure", "向き,方向", "むき,ほうこう", "direction");
        this.addAliasFromTable("turtle", "ペンなし", "ぺんなし", "penup");
        this.addAliasFromTable("turtle", "ペンあり", "ぺんあり", "pendown");
        this.addAliasFromTable("turtle", "中心に戻る", "ちゅうしんにもどる", "movetocenter");
        this.addAliasFromTable("turtle", "閉じる", "とじる", "closepath");
        this.addAliasFromTable(
          "turtle",
          "図形を作る,図形にする",
          "ずけいをつくる,ずけいにする",
          "makefigure",
        );
        this.addAliasFromTable("turtle", "変身する,変身", "へんしんする,へんしん", "setshape");
        this.addAliasFromTable(
          "turtle,figure",
          "拡大する,拡大",
          "かくだいする,かくだい",
          "scale,enlarge",
        );
        this.addAliasFromTable("turtle", "線の色", "せんのいろ", "linecolor");
        this.addAliasFromTable(
          "turtle",
          "線の太さ",
          "せんのふとさ",
          "linethick,linethickness,linewidth",
        );
        this.addAliasFromTable("turtle,figure", "消える,消す", "きえる,けす", "hide");
        this.addAliasFromTable("turtle,figure", "現れる", "あらわれる", "show");
        this.addAliasFromTable(
          "turtle,figure",
          "手前に表示,手前に表示する",
          "てまえにひょうじ,てまえにひょうじする",
          "toFront,bringToFront",
        );
        this.addAliasFromTable("turtle", "円", "えん", "circle");
        this.addAliasFromTable("turtle", "角形", "かくけい,かっけい", "polygon");
        this.addAliasFromTable("turtle,figure", "向き?", "むき?", "direction?");
        this.addAliasFromTable("turtle", "横の位置?", "よこのいち?", "xpos?,xposition?");
        this.addAliasFromTable("turtle", "縦の位置?", "たてのいち?", "ypos?,yposition?");
        this.addAliasFromTable("turtle", "跳ね返る,はね返る", "はねかえる", "bounce,bound");
        this.addAliasFromTable("figure,screen", "塗る", "ぬる", "fill,paint");
        this.addAliasFromTable("screen", "背景画像", "はいけいがぞう", "setpanelimage");
        this.addAliasFromTable("screen", "方眼紙", "ほうがんし", "showgrid");
        this.addAliasFromTable("screen", "幅?", "はば?", "width?");
        this.addAliasFromTable("screen", "高さ?", "たかさ?", "height?");
        this.addAliasFromTable("screen", "横の位置?", "よこのいち?", "xpos?,xposition?");
        this.addAliasFromTable("screen", "縦の位置?", "たてのいち?", "ypos?,yposition?");
        this.addAliasFromTable(
          "screen",
          "音楽効果",
          "おんがくこうか",
          "showanime,showanimation",
        );
        this.addAliasFromTable("Color", "暗くする", "くらくする", "darker");
        this.addAliasFromTable("Color", "明るくする", "あかるくする", "brighter");
        this.addAliasFromTable(
          "Color",
          "半透明にする",
          "はんとうめいにする",
          "settransparency,maketranslucent",
        );
        this.addAliasFromTable(
          "Color",
          "ランダムに作る,くじ引き",
          "らんだむにつくる,くじびき",
          "random,randomInt24Create",
        );
        this.addAliasFromTable("palette", "混ぜる", "まぜる", "mix");
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "次の行",
          "つぎのぎょう",
          "nextline",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "位置",
          "いち",
          "position,moveto",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "移動する,移動",
          "いどうする,いどう",
          "moveby",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "大きさ",
          "おおきさ",
          "size",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "幅?",
          "はば?",
          "width?",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "高さ?",
          "たかさ?",
          "height?",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "文字サイズ",
          "もじさいず",
          "fontsize",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "塗る,色設定,色",
          "ぬる,いろせってい,いろ",
          "fill,paint",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "文字色,文字の色",
          "もじしょく,もじいろ,もじのいろ",
          "fontcolor",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "消える,消す",
          "きえる,けす",
          "hide",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea",
          "現れる",
          "あらわれる",
          "show",
        );
        this.addAliasFromTable(
          "guiButton,guiField,guiList,guiMenu,guiArea",
          "読む",
          "よむ",
          "get,gettext",
        );
        this.addAliasFromTable(
          "guiButton,guiLabel,guiField,guiArea",
          "書く",
          "かく",
          "settext,set",
        );
        this.addAliasFromTable("guiList,guiMenu", "書く", "かく", "settext,set");
        this.addAliasFromTable(
          "guiArea",
          "改行,改行する",
          "かいぎょう,かいぎょうする",
          "newline",
        );
        this.addAliasFromTable(
          "guiArea",
          "上書きする,上書き",
          "うわがきする,うわがき",
          "overwrite",
        );
        this.addAliasFromTable("guiArea", "読むだけ", "よむだけ", "readonly");
        this.addAliasFromTable("guiArea", "読み書き", "よみかき", "readwrite");
        this.addAliasFromTable("guiArea", "自動改行", "じどうかいぎょう", "autonewline,autonl");
        this.addAliasFromTable("guiButton,guiField,guiLabel", "増やす", "ふやす", "increment");
        this.addAliasFromTable("guiButton,guiField,guiLabel", "減らす", "へらす", "decrement");
        this.addAliasFromTable("guiField,guiArea", "フォーカス", "ふぉーかす", "setfocus");
        this.addAliasFromTable("guiMenu", "何番目?", "なんばんめ?", "index?");
        this.addAliasFromTable("guiSlider", "から", "から", "setminimum");
        this.addAliasFromTable("guiSlider", "まで", "まで", "setmaximum");
        this.addAliasFromTable("guiSlider", "値?,読む", "あたい?,よむ", "value?");
        this.addAliasFromTable("guiSlider", "値,書く", "あたい,かく", "value");
        this.addAliasFromTable(
          "guiSlider",
          "横向き,横向きにする",
          "よこむき,よこむきにする",
          "horizontal",
        );
        this.addAliasFromTable(
          "guiSlider",
          "縦向き,縦向きにする",
          "たてむき,たてむきにする",
          "vertical",
        );
        this.addAliasFromTable(
          "guiSlider",
          "文字出す,文字を出す",
          "もじだす,もじをだす",
          "showlabel",
        );
        this.addAliasFromTable(
          "guiSlider",
          "文字消す,文字を消す",
          "もじけす,もじをけす",
          "hidelabel",
        );
        this.addAliasFromTable(
          "musicMelody,musicCode",
          "設定,設定する",
          "せってい,せっていする",
          "set",
        );
        this.addAliasFromTable(
          "musicInstrument",
          "設定,設定する",
          "せってい,せっていする",
          "set",
        );
        this.addAliasFromTable(
          "musicMelody,musicCode,musicDrum,musicBand",
          "追加,追加する",
          "ついか,ついかする",
          "add",
        );
        this.addAliasFromTable(
          "musicMelody,musicCode,musicDrum",
          "無音,無音にする",
          "むおん,むおんにする",
          "silent",
        );
        this.addAliasFromTable(
          "musicMelody,musicCode,musicDrum",
          "繰り返す,繰返す,くり返す",
          "くりかえす",
          "repeat",
        );
        this.addAliasFromTable(
          "musicMelody,musicCode,musicDrum",
          "音上げる,音を上げる",
          "おとあげる,おとをあげる",
          "upnote",
        );
        this.addAliasFromTable(
          "musicMelody,musicCode,musicDrum,musicInstrument,musicBand",
          "演奏,演奏する",
          "えんそう,えんそうする",
          "play",
        );
        this.addAliasFromTable(
          "musicMelody,musicCode,musicDrum,musicInstrument,musicBand",
          "待つ",
          "まつ",
          "wait",
        );
        this.addAliasFromTable(
          "musicInstrument,musicDrum",
          "音量,大きさ",
          "おんりょう,おおきさ",
          "velocity",
        );
        this.addAliasFromTable(
          "musicDrum",
          "楽器設定,楽器設定する,楽器を設定する",
          "がっきせってい,がっきせっていする,がっきをせっていする",
          "instrument",
        );
        this.addAliasFromTable("musicBand", "テンポ,速さ", "てんぽ,はやさ", "tempo,speed");
        this.addAliasFromTable("number,string,bigInteger", "足す", "たす", "add");
        this.addAliasFromTable("number,string,bigInteger", "引く", "ひく", "sub,subtract");
        this.addAliasFromTable("number,string,bigInteger", "掛ける", "かける", "mul,multiply");
        this.addAliasFromTable("number,string,bigInteger", "割る", "わる", "div,divide");
        this.addAliasFromTable(
          "number,string,bigInteger",
          "余り",
          "あまり",
          "mod,modulo,remainder",
        );
        this.addAliasFromTable("number,string", "乱数", "らんすう", "random");
        this.addAliasFromTable(
          "number,string",
          "乱数初期化,乱数初期化する",
          "らんすうしょきか,らんすうしょきかする",
          "setseed",
        );
        this.addAliasFromTable("number,string", "進数", "しんすう", "base");
        this.addAliasFromTable(
          "number,string",
          "大きい整数にする,大きな整数にする,大きい整数を作る,大きな整数を作る",
          "おおきいせいすうにする,おおきなせいすうにする,おおきいせいすうをつくる,おおきなせいすうを作る",
          "bigint,biginteger",
        );
        this.addAliasFromTable(
          "number,string,bigInteger",
          "コード文字",
          "こーどもじ,コードもじ",
          "codechar,codecharacter",
        );
        this.addAliasFromTable(
          "string",
          "実行,実行する",
          "じっこう,じっこうする",
          "execute,eval",
        );
        this.addAliasFromTable(
          "string,array",
          "連結,連結する",
          "れんけつ,れんけつする",
          "concatenate,concat",
        );
        this.addAliasFromTable("string", "部分", "ぶぶん", "substr");
        this.addAliasFromTable("string", "長さ?", "ながさ?", "length?");
        this.addAliasFromTable("string", "何文字目?,探す", "なんもじめ?,さがす", "indexof");
        this.addAliasFromTable("string", "含む?", "ふくむ?", "contain?");
        this.addAliasFromTable("string", "分割,分割する", "ぶんかつ,ぶんかつする", "split");
        this.addAliasFromTable("string", "置き換える", "おきかえる", "substitute,subst");
        this.addAliasFromTable(
          "string",
          "全部置き換える",
          "ぜんぶおきかえる",
          "substituteall,substall",
        );
        this.addAliasFromTable("string", "文字コード", "もじこーど,もじコード", "charcode");
        this.addAliasFromTable("boolean", "全部本当", "ぜんぶほんとう", "alltrue,forall");
        this.addAliasFromTable("boolean", "どれか本当", "どれかほんとう", "sometrue,forsome");
        this.addAliasFromTable("boolean", "本当", "ほんとう", "istrue");
        this.addAliasFromTable("boolean", "反対", "はんたい", "not");
        this.addAliasFromTable("block", "繰り返す,繰返す,くり返す", "くりかえす", "repeat");
        this.addAliasFromTable("boolean,block,false,true,done", "なら", "ならば", "then");
        this.addAliasFromTable(
          "boolean,block,false,true,done",
          "そうでなければ",
          "そうでないなら,そうでなく",
          "else",
        );
        this.addAliasFromTable("block", "の間", "のあいだ", "whilerepeat,while");
        this.addAliasFromTable(
          "block,timer,false,true,done,while,upto",
          "実行,実行する",
          "じっこう,じっこうする",
          "execute",
        );
        this.addAliasFromTable("timer", "間隔", "かんかく", "period,interval");
        this.addAliasFromTable("timer", "回数", "かいすう", "times");
        this.addAliasFromTable("timer", "時間", "じかん", "duration,span");
        this.addAliasFromTable("timer,serial", "待つ", "まつ", "wait");
        this.addAliasFromTable(
          "timer",
          "中断,中断する",
          "ちゅうだん,ちゅうだんする",
          "skip,break",
        );
        this.addAliasFromTable("timer", "停止,停止する", "ていし,ていしする", "stop");
        this.addAliasFromTable("array", "書く,入れる", "かく,いれる", "add,put");
        this.addAliasFromTable("array", "挿入,挿入する", "そうにゅう,そうにゅうする", "insert");
        this.addAliasFromTable(
          "array",
          "上書き,上書きする,位置に書く",
          "うわがき,うわがきする,いちにかく",
          "set,overwrite",
        );
        this.addAliasFromTable("array", "読む,見る", "よむ,みる", "get");
        this.addAliasFromTable(
          "array",
          "ランダムに選ぶ,くじ引き",
          "らんだむにえらぶ,くじびき",
          "random",
        );
        this.addAliasFromTable(
          "array",
          "要素数?,要素数,サイズ,サイズ?,大きさ,大きさ?",
          "ようそすう?,ようそすう,さいず,さいず?,おおきさ,おおきさ?",
          "size?",
        );
        this.addAliasFromTable(
          "array",
          "消す,削除,削除する",
          "けす,さくじょ,さくじょする",
          "remove",
        );
        this.addAliasFromTable("array", "位置で消す", "いちでけす", "removepos,removeposition");
        this.addAliasFromTable(
          "array",
          "それぞれ実行,それぞれ実行する",
          "それぞれじっこう,それぞれじっこうする",
          "foreach",
        );
        this.addAliasFromTable("array", "選ぶ", "えらぶ", "match,grep");
        this.addAliasFromTable("array", "加工,加工する", "かこう,かこうする", "replace");
        this.addAliasFromTable(
          "array",
          "最大,最大を選ぶ",
          "さいだい,さいだいをえらぶ",
          "max, getmax",
        );
        this.addAliasFromTable(
          "array",
          "最小,最小を選ぶ",
          "さいしょう,さいしょうをえらぶ",
          "min,getmin",
        );
        this.addAliasFromTable("array", "結合,結合する", "けつごう,けつごうする", "join");
        this.addAliasFromTable(
          "array,guiField,guiList,guiArea,musicMelody,musicCode,musicDrum,musicBand",
          "クリア,クリアする",
          "くりあ,くりあする",
          "clear",
        );
        this.addAliasFromTable("objectfile", "書く", "かく", "put");
        this.addAliasFromTable("objectfile", "消す", "けす", "remove");
        this.addAliasFromTable("objectfile,webClient,leapmotion", "読む", "よむ", "get");
        this.addAliasFromTable("textfile", "書く", "かく", "write,add");
        this.addAliasFromTable("textfile", "読む", "よむ", "get,readall");
        this.addAliasFromTable("textfile", "全部書く", "ぜんぶかく", "writeall");
        this.addAliasFromTable("system", "サーバーポート", "さーばーぽーと", "setserverport");
        this.addAliasFromTable("system", "日時?", "にちじ?", "datetime?");
        this.addAliasFromTable("system", "曜日?", "ようび?", "dayofweek?");
        this.addAliasFromTable("system", "日付?", "ひづけ?", "date?");
        this.addAliasFromTable("system", "年?", "ねん?,とし?", "year?");
        this.addAliasFromTable("system", "月?", "つき?", "month?");
        this.addAliasFromTable("system", "日?", "ひ?,にち?", "day?");
        this.addAliasFromTable("system", "時刻?,時間?", "じこく?,じかん?", "time?");
        this.addAliasFromTable("system", "時?", "じ?", "hour?");
        this.addAliasFromTable("system", "分?", "ふん?", "minute?");
        this.addAliasFromTable("system", "秒?", "びょう?", "second?");
        this.addAliasFromTable(
          "system",
          "システム秒?",
          "しすてむびょう?,システムびょう?",
          "systemtime?",
        );
        this.addAliasFromTable("system", "実行,実行する", "じっこう,じっこうする", "execute");
        this.addAliasFromTable(
          "system",
          "終了する,終了",
          "しゅうりょうする,しゅうりょう",
          "exit",
        );
        this.addAliasFromTable("system", "proxy", "proxy", "proxy,setproxy");
        this.addAliasFromTable("system", "使う", "つかう", "use");
        this.addAliasFromTable(
          "system",
          "表示ダイアログ",
          "ひょうじだいあろぐ",
          "messagedialog",
        );
        this.addAliasFromTable(
          "system",
          "確認ダイアログ",
          "かくにんだいあろぐ",
          "confirmdialog",
        );
        this.addAliasFromTable(
          "system",
          "入力ダイアログ",
          "にゅうりょくだいあろぐ",
          "inputdialog",
        );
        this.addAliasFromTable("system", "選択ダイアログ", "せんたくだいあろぐ", "selectdialog");
        this.addAliasFromTable(
          "serial",
          "出力,出力する,書く",
          "しゅつりょく,しゅつりょくする,かく",
          "put",
        );
        this.addAliasFromTable("serial", "値?,読む", "あたい?,よむ", "get");
        this.addAliasFromTable("serial", "クリア,クリアする", "くりあ,くりあする", "clear");
        this.addAliasFromTable("serial", "データ数?", "でーたすう?,データすう?", "datacount?");
        this.addAliasFromTable("serial", "開く", "ひらく", "open");
        this.addAliasFromTable("serial", "閉じる", "とじる", "close");
        this.addAliasFromTable("serial", "存在?,データある?", "そんざい?,でーたある?", "exist?");
        this.addAliasFromTable("server", "共有,共有する", "きょうゆう,きょうゆうする", "share");
        this.addAliasFromTable(
          "server",
          "書く,登録,登録する",
          "かく,とうろく,とうろくする",
          "put",
        );
        this.addAliasFromTable(
          "server",
          "読む,複製,複製する",
          "よむ,ふくせい,ふくせいする",
          "get",
        );
        this.addAliasFromTable("server", "接続,接続する", "せつぞく,せつぞくする", "connect");
        this.addAliasFromTable(
          "leapmotion",
          "接続,接続する",
          "せつぞく,せつぞくする",
          "connect",
        );
        this.addAliasFromTable("leapmotion", "横の位置?", "よこのいち?", "xpos?,xposition?");
        this.addAliasFromTable(
          "leapmotion",
          "高さ?,縦の位置?",
          "たかさ?,たてのいち?",
          "ypos?,yposition?",
        );
        this.addAliasFromTable(
          "leapmotion",
          "奥行き?,前後の位置?",
          "おくゆき?,ぜんごのいち?",
          "zpos?,zposition?",
        );
        this.addAliasFromTable("leapmotion", "指の数?", "ゆびのかず?", "fingers?");
        this.addAliasFromTable("leapmotion", "回転?", "かいてん?", "circle?");
        this.addAliasFromTable("leapmotion", "左回転?", "ひだりかいてん?", "circleleft?");
        this.addAliasFromTable("leapmotion", "右回転?", "みぎかいてん?", "circleright?");
        this.addAliasFromTable("leapmotion", "スワイプ?", "すわいぷ?", "swipe?");
        this.addAliasFromTable("leapmotion", "左スワイプ?", "ひだりすわいぷ?", "swipeleft?");
        this.addAliasFromTable("leapmotion", "右スワイプ?", "みぎすわいぷ?", "swiperight?");
        this.addAliasFromTable("leapmotion", "タップ?", "たっぷ?", "tap?");
        this.addAliasFromTable("leapmotion", "キータップ?", "きーたっぷ?", "keytap?");
        this.addAliasFromTable("leapmotion", "グー?", "ぐー?", "rock?");
        this.addAliasFromTable("leapmotion", "チョキ?", "ちょき?", "scissors?");
        return this.addAliasFromTable("leapmotion", "パー?", "ぱー?", "paper?");
  }
})
  .checkerror()
  .apply(root, []);

/*
//NOGENERATOR
// Dolittle
[(window:localStorage:noLocalize)!="1"] ! then [|;aa|
    ! makeCaseInsensitiveAll.
    aa=root:addAlias.
    //---- adjust naming between js/java
    ! "Button" "guiButton" "ボタン" addAlias.
    ! "Field" "guiField" "TextField" "フィールド" addAlias.
    ! "Label" "guiLabel" "ラベル" addAlias.
    ! "ListBox" "guiList" "リスト" addAlias.
    ! "TextArea" "guiArea" "テキストエリア" addAlias.
    ! "Screen" "screen" addAlias.
    ! "Ink" "palette" "pigment" "絵の具" "絵具" addAlias.
    // some method omits "?"
    System ! "time?" "時刻" addAlias.
    System ! "month?" "月" addAlias.
    System ! "day?" "日" addAlias.
    System ! "hour?" "時" addAlias.
    aa! (window:Number:prototype) "fromCharCode" "codechar" call.
    aa! (window:String:prototype) "charCodeAt" "charcode" call.
    aa! (window:String:prototype) "position?" "indexof" "indexof?" call.
    aa! (window:String:prototype) "allReplace" "substall"  call. 
    aa! (window:String:prototype) "oneReplace" "subst"  call. 
    // in Java ver, and==true,  or==false
    !"and" "全部" "ぜんぶ" addAlias.
    !"or" "どれか" addAlias.
    aa!(or) "true" "本当" "ほんとう" call.
    aa!(and) "true" "本当" "ほんとう" call.
    ! "system" "日時" "datetime?" addAliasFromTable.
    ! "system" "曜日" "dayofweek?" addAliasFromTable.
    ! "system" "日付" "date?" addAliasFromTable.
    ! "system" "年" "year?" addAliasFromTable.
    ! "system" "月" "month?" addAliasFromTable.
    ! "system" "日" "day?" addAliasFromTable.
    ! "system" "時刻,時間" "time?" addAliasFromTable.
    ! "system" "時" "hour?" addAliasFromTable.
    ! "system" "分" "minute?" addAliasFromTable.
    ! "system" "秒" "second?" addAliasFromTable.
    ! "system" "システム時間?,システム時間" "systemtime?" addAliasFromTable.
    
    ! "action" "click" addAlias.
    ! "create" "作る" "つくる" addAlias.
    aa!(window:Array) "create" "作る" "つくる" call.
    //---- special: 色, 塗る, paint,fill ... but 色 is root.Color!! different!
    UI ! "paint" "色" addAlias.
    
    
    //---- not in DolittleAlias/Mesg
    あゆみ赤="ayumiRed.png".
    あゆみ青="ayumiBlue.png".
    あゆみ黄="ayumiYellow.png".
    あゆみ緑="ayumi.png".
    // shortcut for makeFigure
    ! "turtle" "塗る" "ぬる" "fill,paint" addAliasFromTable.
    // (mendouninattekitanode, zenbutuika)
    UI ! "nextLine" "次の行" addAlias
    "inc" "増やす" addAlias
    "dec" "減らす" addAlias
    "read" "読む" addAlias
    "moveTo" "位置" addAlias
    "moveTo" "position" addAlias
    "moveBy" "移動する" addAlias
    "width?" "幅?" addAlias
    "height?" "高さ?" addAlias
    "width" "幅" addAlias// (setter. Java ver has only getter)
    "height" "高さ" addAlias// (setter. Java ver has only getter)
    "clear" "クリア" addAlias
    "write" "書く" addAlias
    "add" "追加" addAlias
    "newLine" "改行" addAlias.
    TextArea ! 
    "write" "書く" addAlias 
    "overwrite" "上書き" addAlias
    "writeLn" "書いて改行" addAlias
    "readOnly" "読むだけ" addAlias
    "writable" "読み書き" addAlias
    "autoBR" "自動改行" addAlias
    "newLine" "改行" addAlias
    "setRow" "行数" addAlias
    "setCol" "桁数" addAlias
    "setCol" "文字数" addAlias
    "setCol" "列数" addAlias
    "readAsArray" "配列で読む" addAlias
    "changeLine" "行修正" addAlias
    .
    
    Figure ! "makeGroup" "結合する" "結合" addAlias.
    Color ! "toFullOpacity" "不透明にする" addAlias.
    !"Dict" "辞書" addAlias.
    Dict!"write" "書く" addAlias
    "read" "読む" addAlias
    "has?" "含む?" addAlias
    "each" "それぞれ実行" addAlias
    "delete" "削除" addAlias.
    ! "setAction" "動作設定" addAlias.
    _true!"else" "そうでなければ" addAlias
    "execute" "実行" addAlias
    "then" "なら" addAlias.
    _false!"else" "そうでなければ" addAlias
    "execute" "実行" addAlias
    "then" "なら" addAlias.
    _done!"else" "そうでなければ" addAlias
    "execute" "実行" addAlias
    "then" "なら" addAlias.
    _while!"execute" "実行" addAlias.
    !"Light" "光" addAlias.
    Light ! "mix" "混ぜる" addAlias.
    Timer! "next_execute" "次に実行" addAlias.
    
    //センサ類
    !"accelerationSensor" "加速度センサ" "加速度センサー" addAlias.
    accelerationSensor!"setAction" "動作設定" addAlias
    "use" "使う" addAlias
    "calibrate" "調整" addAlias
    "action" "動作" addAlias
    "getA" "値A" addAlias
    "getB" "値B" addAlias
    "getC" "値C" addAlias
    "getXAcceleration" "左右の加速度?" addAlias
    "getYAcceleration" "前後の加速度?" addAlias
    "getZAcceleration" "上下の加速度?" addAlias.
    
    !"compass" "コンパス" "磁気センサ" "磁気センサー" addAlias.
    compass!
    "use" "使う" addAlias
    "setAction" "動作設定" addAlias 
    "action" "動作" addAlias
    "getDirection" "方向?" "向き?" addAlias.
    
    /*GPS!"use" "使う" addAlias
    "getLatitude" "緯度?" addAlias
    "getLongitude" "経度?" addAlias.* /
    
    !"touchSensor" "タッチセンサ" "タッチセンサー" addAlias.
    touchSensor!"setAction" "動作設定" addAlias
    "action" "動作" addAlias
    "use" "使う" addAlias
    "getTouched" "タッチした?" "触れた?" addAlias
    "getTouching" "タッチしている?" "タッチしてる?" "触れている?" "触れてる?" addAlias
    "getX" "横の位置?" addAlias
    "getY" "縦の位置?" addAlias.
    
    !"gyroSensor" "ジャイロセンサ" "ジャイロセンサー" addAlias.
    gyroSensor!"setAction" "動作設定" addAlias
    "action" "動作" addAlias
    "use" "使う" addAlias
    "getYaw" "ヨー?" "水平方向の傾き?" "水平の傾き?" addAlias
    "getRoll" "ロール?" "左右方向の傾き?" "左右の傾き?" addAlias
    "getPitch" "ピッチ?" "前後方向の傾き?" "前後の傾き?" addAlias
    "getA" "値A" addAlias
    "getB" "値B" addAlias
    "getC" "値C" addAlias
    "calibrate" "調整" addAlias
    "use" "使う" addAlias.
    
    HTML：読む＝[|x| !(x)get].
    HTML：位置＝[|x y| !(x)(y)move].
    
    //----autogen from DolittleMessage
    ! "root" "待つ,wait" addAliasFromTable.
    ! "root" "オブジェクト" "Object" addAliasFromTable.
    ! "root" "ブロック" "Block" addAliasFromTable.
    ! "root" "論理値" "Boolean" addAliasFromTable.
    ! "root" "ルート" "Root" addAliasFromTable.
    ! "root" "タートル" "Turtle" addAliasFromTable.
    ! "root" "タイマー" "Timer" addAliasFromTable.
    ! "root" "ラベル" "Label" addAliasFromTable.
    ! "root" "ボタン" "Button" addAliasFromTable.
    ! "root" "フィールド" "TextField" addAliasFromTable.
    ! "root" "選択メニュー" "SelectMenu" addAliasFromTable.
    ! "root" "リスト" "List" addAliasFromTable.
    ! "root" "スライダー" "Slider" addAliasFromTable.
    ! "root" "テキストエリア" "TextArea" addAliasFromTable.
    ! "root" "配列" "Array" addAliasFromTable.
    ! "root" "色" "Color" addAliasFromTable.
    ! "root" "真" "true" addAliasFromTable.
    ! "root" "偽" "false" addAliasFromTable.
    ! "root" "サーバー" "Server" addAliasFromTable.
    ! "root" "シリアルポート" "SerialPort" addAliasFromTable.
    ! "root" "図形" "Figure" addAliasFromTable.
    ! "root" "システム" "System" addAliasFromTable.
    ! "root" "コンソール" "Console" addAliasFromTable.
    ! "root" "文字列" "String" addAliasFromTable.
    ! "root" "数値" "Number" addAliasFromTable.
    ! "root" "大きい整数" "BigInteger" addAliasFromTable.
    ! "root" "メロディ" "Melody" addAliasFromTable.
    ! "root" "コード" "Code" addAliasFromTable.
    ! "root" "リズム" "Rythm" addAliasFromTable.
    ! "root" "ドラム" "DrumSet" addAliasFromTable.
    ! "root" "楽器" "Instrument" addAliasFromTable.
    ! "root" "打楽器" "Percussion" addAliasFromTable.
    ! "root" "バンド" "Band" addAliasFromTable.
    ! "root" "未定義" "Undefined" addAliasFromTable.
    ! "root" "オブジェクトファイル" "ObjectFile" addAliasFromTable.
    ! "root" "テキストファイル" "TextFile" addAliasFromTable.
    ! "root" "画面" "Panel" addAliasFromTable.
    ! "root" "衝突" "collision" addAliasFromTable.
    ! "root" "動作" "click" addAliasFromTable.
    ! "root" "回転" "circle" addAliasFromTable.
    ! "root" "スワイプ" "swipe" addAliasFromTable.
    ! "root" "タップ" "tap" addAliasFromTable.
    ! "root" "キータップ" "keytap" addAliasFromTable.
    ! "root" "自分" "self" addAliasFromTable.
    ! "root" "黒" "Black" addAliasFromTable.
    ! "root" "赤" "Red" addAliasFromTable.
    ! "root" "緑" "Green" addAliasFromTable.
    ! "root" "青" "Blue" addAliasFromTable.
    ! "root" "黄" "Yellow" addAliasFromTable.
    ! "root" "紫" "Magenta" addAliasFromTable.
    ! "root" "水" "Cyan" addAliasFromTable.
    ! "root" "白" "White" addAliasFromTable.
    ! "root" "光" "light" addAliasFromTable.
    ! "root" "絵具" "pigment" addAliasFromTable.
    ! "root" "Webクライアント" "WebClient" addAliasFromTable.
    //----
    
    
    //--- Not in DolittleAlias/Meth (again)
    !"pink" "ピンク" addAlias.
    !"cyan" "水色" addAlias.
    !"yellow" "黄色" addAlias.
    はい＝:true。
    いいえ＝:false。
    真偽値=window:Boolean.
    !"initialize" "初期化" addAlias.
    !"pi" "円周率" addAlias.
    !"dq" "ダブルクォート" "ダブルクォーテーション" addAlias.
    !"dq" "ダブルクオート" "ダブルクオーテーション" addAlias.
    !"ldq" "左ダブルクォート" "左ダブルクォーテーション" addAlias.
    !"ldq" "左ダブルクオート" "左ダブルクオーテーション" addAlias.
    !"rdq" "右ダブルクォート" "右ダブルクォーテーション" addAlias.
    !"rdq" "右ダブルクオート" "右ダブルクオーテーション" addAlias.
    !"ldb" "左二重鉤括弧" "左二重かぎ括弧" addAlias.
    !"rdb" "右二重鉤括弧" "右二重かぎ括弧" addAlias.
    
    !"accelerationSensor" "加速度センサ" "加速度センサー" addAlias.
    !"compass" "コンパス" "磁気センサ" "磁気センサー" addAlias.
    !"touchSensor" "タッチセンサ" "タッチセンサー" addAlias.
    !"gyroSensor" "ジャイロセンサ" "ジャイロセンサー" addAlias.
    Timer! "after_execute" "完了時実行" addAlias.
    Timer! "after_execute" "終了時実行" addAlias.
    Timer! "after_execute" "最後に実行" addAlias.
    Timer! "after_execute" "単発実行" addAlias.
    
    
    // for group
    ! "actor" "右回り,右回転,右に回る" "みぎまわり,みぎかいてん,みぎにまわる" "rightturn" addAliasFromTable.
    ! "actor" "左回り,左回転,左に回る" "ひだりまわり,ひだりかいてん,ひだりにまわる" "leftturn" addAliasFromTable.
    ! "actor" "移動する,移動" "いどうする,いどう" "moveby" addAliasFromTable.
    ! "actor" "位置" "いち" "position,moveto" addAliasFromTable.
    ! "actor" "向き,方向" "むき,ほうこう" "direction" addAliasFromTable.
    ! "actor" "拡大する,拡大" "かくだいする,かくだい" "scale,enlarge" addAliasFromTable.
    ! "actor" "消える,消す" "きえる,けす" "hide" addAliasFromTable.
    ! "actor" "現れる" "あらわれる" "show" addAliasFromTable.
    ! "actor" "手前に表示,手前に表示する" "てまえにひょうじ,てまえにひょうじする" "toFront,bringToFront" addAliasFromTable.
    ! "actor" "向き?" "むき?" "direction?" addAliasFromTable.
    // for figure(newly added for js)
    ! "actor" "横の位置?" "よこのいち?" "xpos?,xposition?" addAliasFromTable.
    ! "actor" "縦の位置?" "たてのいち?" "ypos?,yposition?" addAliasFromTable.
    ! "actor" "歩く" "あるく" "forward" addAliasFromTable.
    ! "actor" "戻る" "もどる" "back,backward" addAliasFromTable.
    ! "actor" "跳ね返る,はね返る" "はねかえる" "bounce,bound" addAliasFromTable.
    ! "actor" "moveCenter" "中心に戻る" addAliasFromTable.
    ! "Actor" "hitTarget" "相手" addAliasFromTable.
    
    //----autogen from DolittleAliases(EXCEPT substr)
    ! "turtle" "歩く" "あるく" "forward" addAliasFromTable.
    ! "turtle" "戻る" "もどる" "back,backward" addAliasFromTable.
    ! "turtle,figure" "右回り,右回転,右に回る" "みぎまわり,みぎかいてん,みぎにまわる" "rightturn" addAliasFromTable.
    ! "turtle,figure" "左回り,左回転,左に回る" "ひだりまわり,ひだりかいてん,ひだりにまわる" "leftturn" addAliasFromTable.
    ! "turtle,figure" "移動する,移動" "いどうする,いどう" "moveby" addAliasFromTable.
    ! "turtle,figure" "位置" "いち" "position,moveto" addAliasFromTable.
    ! "turtle,figure" "向き,方向" "むき,ほうこう" "direction" addAliasFromTable.
    ! "turtle" "ペンなし" "ぺんなし" "penup" addAliasFromTable.
    ! "turtle" "ペンあり" "ぺんあり" "pendown" addAliasFromTable.
    ! "turtle" "中心に戻る" "ちゅうしんにもどる" "movetocenter" addAliasFromTable.
    ! "turtle" "閉じる" "とじる" "closepath" addAliasFromTable.
    ! "turtle" "図形を作る,図形にする" "ずけいをつくる,ずけいにする" "makefigure" addAliasFromTable.
    ! "turtle" "変身する,変身" "へんしんする,へんしん" "setshape" addAliasFromTable.
    ! "turtle,figure" "拡大する,拡大" "かくだいする,かくだい" "scale,enlarge" addAliasFromTable.
    ! "turtle" "線の色" "せんのいろ" "linecolor" addAliasFromTable.
    ! "turtle" "線の太さ" "せんのふとさ" "linethick,linethickness,linewidth" addAliasFromTable.
    ! "turtle,figure" "消える,消す" "きえる,けす" "hide" addAliasFromTable.
    ! "turtle,figure" "現れる" "あらわれる" "show" addAliasFromTable.
    ! "turtle,figure" "手前に表示,手前に表示する" "てまえにひょうじ,てまえにひょうじする" "toFront,bringToFront" addAliasFromTable.
    ! "turtle" "円" "えん" "circle" addAliasFromTable.
    ! "turtle" "角形" "かくけい,かっけい" "polygon" addAliasFromTable.
    ! "turtle,figure" "向き?" "むき?" "direction?" addAliasFromTable.
    ! "turtle" "横の位置?" "よこのいち?" "xpos?,xposition?" addAliasFromTable.
    ! "turtle" "縦の位置?" "たてのいち?" "ypos?,yposition?" addAliasFromTable.
    ! "turtle" "跳ね返る,はね返る" "はねかえる" "bounce,bound" addAliasFromTable.
    ! "turtle,figure" "衝突" "しょうとつ" "collision" addAliasFromTable.
    ! "figure,screen" "塗る" "ぬる" "fill,paint" addAliasFromTable.
    ! "screen" "背景画像" "はいけいがぞう" "setpanelimage" addAliasFromTable.
    ! "screen" "方眼紙" "ほうがんし" "showgrid" addAliasFromTable.
    ! "screen" "幅?" "はば?" "width?" addAliasFromTable.
    ! "screen" "高さ?" "たかさ?" "height?" addAliasFromTable.
    ! "screen" "横の位置?" "よこのいち?" "xpos?,xposition?" addAliasFromTable.
    ! "screen" "縦の位置?" "たてのいち?" "ypos?,yposition?" addAliasFromTable.
    ! "screen" "音楽効果" "おんがくこうか" "showanime,showanimation" addAliasFromTable.
    ! "color" "暗くする" "くらくする" "darker" addAliasFromTable.
    ! "color" "明るくする" "あかるくする" "brighter" addAliasFromTable.
    ! "color" "半透明にする" "はんとうめいにする" "settransparency,maketranslucent" addAliasFromTable.
    ! "color" "ランダムに作る,くじ引き" "らんだむにつくる,くじびき" "random" addAliasFromTable.
    ! "palette" "混ぜる" "まぜる" "mix" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "次の行" "つぎのぎょう" "nextline" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "位置" "いち" "position,moveto" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "移動する,移動" "いどうする,いどう" "moveby" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "大きさ" "おおきさ" "size" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "幅?" "はば?" "width?" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "高さ?" "たかさ?" "height?" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "文字サイズ" "もじさいず" "fontsize" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "塗る,色設定,色" "ぬる,いろせってい,いろ" "fill,paint" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "文字色,文字の色" "もじしょく,もじいろ,もじのいろ" "fontcolor" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "消える,消す" "きえる,けす" "hide" addAliasFromTable.
    ! "guiButton,guiField,guiLabel,guiList,guiMenu,guiSlider,guiArea" "現れる" "あらわれる" "show" addAliasFromTable.
    ! "guiButton,guiField,guiList,guiMenu,guiArea" "読む" "よむ" "get,gettext" addAliasFromTable.
    ! "guiButton,guiLabel,guiField,guiArea" "書く" "かく" "settext,set" addAliasFromTable.
    ! "guiList,guiMenu" "書く" "かく" "settext,set" addAliasFromTable.
    ! "guiArea" "改行,改行する" "かいぎょう,かいぎょうする" "newline" addAliasFromTable.
    ! "guiArea" "上書きする,上書き" "うわがきする,うわがき" "overwrite" addAliasFromTable.
    ! "guiArea" "読むだけ" "よむだけ" "readonly" addAliasFromTable.
    ! "guiArea" "読み書き" "よみかき" "readwrite" addAliasFromTable.
    ! "guiArea" "自動改行" "じどうかいぎょう" "autonewline,autonl" addAliasFromTable.
    ! "guiButton,guiField,guiLabel" "増やす" "ふやす" "increment" addAliasFromTable.
    ! "guiButton,guiField,guiLabel" "減らす" "へらす" "decrement" addAliasFromTable.
    ! "guiField,guiArea" "フォーカス" "ふぉーかす" "setfocus" addAliasFromTable.
    ! "guiMenu" "何番目?" "なんばんめ?" "index?" addAliasFromTable.
    ! "guiSlider" "から" "から" "setminimum" addAliasFromTable.
    ! "guiSlider" "まで" "まで" "setmaximum" addAliasFromTable.
    ! "guiSlider" "値?,読む" "あたい?,よむ" "value?" addAliasFromTable.
    ! "guiSlider" "値,書く" "あたい,かく" "value" addAliasFromTable.
    ! "guiSlider" "横向き,横向きにする" "よこむき,よこむきにする" "horizontal" addAliasFromTable.
    ! "guiSlider" "縦向き,縦向きにする" "たてむき,たてむきにする" "vertical" addAliasFromTable.
    ! "guiSlider" "文字出す,文字を出す" "もじだす,もじをだす" "showlabel" addAliasFromTable.
    ! "guiSlider" "文字消す,文字を消す" "もじけす,もじをけす" "hidelabel" addAliasFromTable.
    ! "musicMelody,musicCode" "設定,設定する" "せってい,せっていする" "set" addAliasFromTable.
    ! "musicInstrument" "設定,設定する" "せってい,せっていする" "set" addAliasFromTable.
    ! "musicMelody,musicCode,musicDrum,musicBand" "追加,追加する" "ついか,ついかする" "add" addAliasFromTable.
    ! "musicMelody,musicCode,musicDrum" "無音,無音にする" "むおん,むおんにする" "silent" addAliasFromTable.
    ! "musicMelody,musicCode,musicDrum" "繰り返す,繰返す,くり返す" "くりかえす" "repeat" addAliasFromTable.
    ! "musicMelody,musicCode,musicDrum" "音上げる,音を上げる" "おとあげる,おとをあげる" "upnote" addAliasFromTable.
    ! "musicMelody,musicCode,musicDrum,musicInstrument,musicBand" "演奏,演奏する" "えんそう,えんそうする" "play" addAliasFromTable.
    ! "musicMelody,musicCode,musicDrum,musicInstrument,musicBand" "待つ" "まつ" "wait" addAliasFromTable.
    ! "musicInstrument,musicDrum" "音量,大きさ" "おんりょう,おおきさ" "velocity" addAliasFromTable.
    ! "musicDrum" "楽器設定,楽器設定する,楽器を設定する" "がっきせってい,がっきせっていする,がっきをせっていする" "instrument" addAliasFromTable.
    ! "musicBand" "テンポ,速さ" "てんぽ,はやさ" "tempo,speed" addAliasFromTable.
    ! "number,string,bigInteger" "足す" "たす" "add" addAliasFromTable.
    ! "number,string,bigInteger" "引く" "ひく" "sub,subtract" addAliasFromTable.
    ! "number,string,bigInteger" "掛ける" "かける" "mul,multiply" addAliasFromTable.
    ! "number,string,bigInteger" "割る" "わる" "div,divide" addAliasFromTable.
    ! "number,string,bigInteger" "余り" "あまり" "mod,modulo,remainder" addAliasFromTable.
    ! "number,string" "乱数" "らんすう" "random" addAliasFromTable.
    ! "number,string" "乱数初期化,乱数初期化する" "らんすうしょきか,らんすうしょきかする" "setseed" addAliasFromTable.
    ! "number,string" "進数" "しんすう" "base" addAliasFromTable.
    ! "number,string" "大きい整数にする,大きな整数にする,大きい整数を作る,大きな整数を作る" "おおきいせいすうにする,おおきなせいすうにする,おおきいせいすうをつくる,おおきなせいすうを作る" "bigint,biginteger" addAliasFromTable.
    ! "number,string,bigInteger" "コード文字" "こーどもじ,コードもじ" "codechar,codecharacter" addAliasFromTable.
    ! "string" "実行,実行する" "じっこう,じっこうする" "execute,eval" addAliasFromTable.
    ! "string,array" "連結,連結する" "れんけつ,れんけつする" "concatenate,concat" addAliasFromTable.
    // It is kowareru!  substring is native 0-origin function
    //! "string" "部分" "ぶぶん" "substring,substr" addAliasFromTable.
    // Fixed as:
    ! "string" "部分" "ぶぶん" "substr" addAliasFromTable.
    ! "string" "長さ?" "ながさ?" "length?" addAliasFromTable.
    ! "string" "何文字目?,探す" "なんもじめ?,さがす" "indexof" addAliasFromTable.
    ! "string" "含む?" "ふくむ?" "contain?" addAliasFromTable.
    ! "string" "分割,分割する" "ぶんかつ,ぶんかつする" "split" addAliasFromTable.
    ! "string" "置き換える" "おきかえる" "substitute,subst" addAliasFromTable.
    ! "string" "全部置き換える" "ぜんぶおきかえる" "substituteall,substall" addAliasFromTable.
    ! "string" "文字コード" "もじこーど,もじコード" "charcode" addAliasFromTable.
    ! "boolean" "全部本当" "ぜんぶほんとう" "alltrue,forall" addAliasFromTable.
    ! "boolean" "どれか本当" "どれかほんとう" "sometrue,forsome" addAliasFromTable.
    ! "boolean" "本当" "ほんとう" "istrue" addAliasFromTable.
    ! "boolean" "反対" "はんたい" "not" addAliasFromTable.
    ! "block" "繰り返す,繰返す,くり返す" "くりかえす" "repeat" addAliasFromTable.
    ! "boolean,block,false,true,done" "なら" "ならば" "then" addAliasFromTable.
    ! "boolean,block,false,true,done" "そうでなければ" "そうでないなら,そうでなく" "else" addAliasFromTable.
    ! "block" "の間" "のあいだ" "whilerepeat,while" addAliasFromTable.
    ! "block,timer,false,true,done,while,upto" "実行,実行する" "じっこう,じっこうする" "execute" addAliasFromTable.
    ! "timer" "間隔" "かんかく" "period,interval" addAliasFromTable.
    ! "timer" "回数" "かいすう" "times" addAliasFromTable.
    ! "timer" "時間" "じかん" "duration,span" addAliasFromTable.
    ! "timer,serial" "待つ" "まつ" "wait" addAliasFromTable.
    ! "timer" "中断,中断する" "ちゅうだん,ちゅうだんする" "skip,break" addAliasFromTable.
    ! "timer" "停止,停止する" "ていし,ていしする" "stop" addAliasFromTable.
    ! "array" "書く,入れる" "かく,いれる" "add,put" addAliasFromTable.
    ! "array" "挿入,挿入する" "そうにゅう,そうにゅうする" "insert" addAliasFromTable.
    ! "array" "上書き,上書きする,位置に書く" "うわがき,うわがきする,いちにかく" "set,overwrite" addAliasFromTable.
    ! "array" "読む,見る" "よむ,みる" "get" addAliasFromTable.
    ! "array" "ランダムに選ぶ,くじ引き" "らんだむにえらぶ,くじびき" "random" addAliasFromTable.
    ! "array" "要素数?,要素数,サイズ,サイズ?,大きさ,大きさ?" "ようそすう?,ようそすう,さいず,さいず?,おおきさ,おおきさ?" "size?" addAliasFromTable.
    ! "array" "消す,削除,削除する" "けす,さくじょ,さくじょする" "remove" addAliasFromTable.
    ! "array" "位置で消す" "いちでけす" "removepos,removeposition" addAliasFromTable.
    ! "array" "それぞれ実行,それぞれ実行する" "それぞれじっこう,それぞれじっこうする" "foreach" addAliasFromTable.
    ! "array" "選ぶ" "えらぶ" "match,grep" addAliasFromTable.
    ! "array" "加工,加工する" "かこう,かこうする" "replace" addAliasFromTable.
    ! "array" "最大,最大を選ぶ" "さいだい,さいだいをえらぶ" "max, getmax" addAliasFromTable.
    ! "array" "最小,最小を選ぶ" "さいしょう,さいしょうをえらぶ" "min,getmin" addAliasFromTable.
    ! "array" "結合,結合する" "けつごう,けつごうする" "join" addAliasFromTable.
    ! "array,guiField,guiList,guiArea,musicMelody,musicCode,musicDrum,musicBand" "クリア,クリアする" "くりあ,くりあする" "clear" addAliasFromTable.
    ! "objectfile" "書く" "かく" "put" addAliasFromTable.
    ! "objectfile" "消す" "けす" "remove" addAliasFromTable.
    ! "objectfile,webClient,leapmotion" "読む" "よむ" "get" addAliasFromTable.
    ! "textfile" "書く" "かく" "write,add" addAliasFromTable.
    ! "textfile" "読む" "よむ" "get,readall" addAliasFromTable.
    ! "textfile" "全部書く" "ぜんぶかく" "writeall" addAliasFromTable.
    ! "system" "サーバーポート" "さーばーぽーと" "setserverport" addAliasFromTable.
    ! "system" "日時?" "にちじ?" "datetime?" addAliasFromTable.
    ! "system" "曜日?" "ようび?" "dayofweek?" addAliasFromTable.
    ! "system" "日付?" "ひづけ?" "date?" addAliasFromTable.
    ! "system" "年?" "ねん?,とし?" "year?" addAliasFromTable.
    ! "system" "月?" "つき?" "month?" addAliasFromTable.
    ! "system" "日?" "ひ?,にち?" "day?" addAliasFromTable.
    ! "system" "時刻?,時間?" "じこく?,じかん?" "time?" addAliasFromTable.
    ! "system" "時?" "じ?" "hour?" addAliasFromTable.
    ! "system" "分?" "ふん?" "minute?" addAliasFromTable.
    ! "system" "秒?" "びょう?" "second?" addAliasFromTable.
    ! "system" "システム秒?" "しすてむびょう?,システムびょう?" "systemtime?" addAliasFromTable.
    ! "system" "実行,実行する" "じっこう,じっこうする" "execute" addAliasFromTable.
    ! "system" "終了する,終了" "しゅうりょうする,しゅうりょう" "exit" addAliasFromTable.
    ! "system" "proxy" "proxy" "proxy,setproxy" addAliasFromTable.
    ! "system" "使う" "つかう" "use" addAliasFromTable.
    ! "system" "表示ダイアログ" "ひょうじだいあろぐ" "messagedialog" addAliasFromTable.
    ! "system" "確認ダイアログ" "かくにんだいあろぐ" "confirmdialog" addAliasFromTable.
    ! "system" "入力ダイアログ" "にゅうりょくだいあろぐ" "inputdialog" addAliasFromTable.
    ! "system" "選択ダイアログ" "せんたくだいあろぐ" "selectdialog" addAliasFromTable.
    ! "serial" "出力,出力する,書く" "しゅつりょく,しゅつりょくする,かく" "put" addAliasFromTable.
    ! "serial" "値?,読む" "あたい?,よむ" "get" addAliasFromTable.
    ! "serial" "クリア,クリアする" "くりあ,くりあする" "clear" addAliasFromTable.
    ! "serial" "データ数?" "でーたすう?,データすう?" "datacount?" addAliasFromTable.
    ! "serial" "開く" "ひらく" "open" addAliasFromTable.
    ! "serial" "閉じる" "とじる" "close" addAliasFromTable.
    ! "serial" "存在?,データある?" "そんざい?,でーたある?" "exist?" addAliasFromTable.
    ! "server" "共有,共有する" "きょうゆう,きょうゆうする" "share" addAliasFromTable.
    ! "server" "書く,登録,登録する" "かく,とうろく,とうろくする" "put" addAliasFromTable.
    ! "server" "読む,複製,複製する" "よむ,ふくせい,ふくせいする" "get" addAliasFromTable.
    ! "server" "接続,接続する" "せつぞく,せつぞくする" "connect" addAliasFromTable.
    ! "leapmotion" "接続,接続する" "せつぞく,せつぞくする" "connect" addAliasFromTable.
    ! "leapmotion" "横の位置?" "よこのいち?" "xpos?,xposition?" addAliasFromTable.
    ! "leapmotion" "高さ?,縦の位置?" "たかさ?,たてのいち?" "ypos?,yposition?" addAliasFromTable.
    ! "leapmotion" "奥行き?,前後の位置?" "おくゆき?,ぜんごのいち?" "zpos?,zposition?" addAliasFromTable.
    ! "leapmotion" "指の数?" "ゆびのかず?" "fingers?" addAliasFromTable.
    ! "leapmotion" "回転?" "かいてん?" "circle?" addAliasFromTable.
    ! "leapmotion" "左回転?" "ひだりかいてん?" "circleleft?" addAliasFromTable.
    ! "leapmotion" "右回転?" "みぎかいてん?" "circleright?" addAliasFromTable.
    ! "leapmotion" "スワイプ?" "すわいぷ?" "swipe?" addAliasFromTable.
    ! "leapmotion" "左スワイプ?" "ひだりすわいぷ?" "swipeleft?" addAliasFromTable.
    ! "leapmotion" "右スワイプ?" "みぎすわいぷ?" "swiperight?" addAliasFromTable.
    ! "leapmotion" "タップ?" "たっぷ?" "tap?" addAliasFromTable.
    ! "leapmotion" "キータップ?" "きーたっぷ?" "keytap?" addAliasFromTable.
    ! "leapmotion" "グー?" "ぐー?" "rock?" addAliasFromTable.
    ! "leapmotion" "チョキ?" "ちょき?" "scissors?" addAliasFromTable.
    ! "leapmotion" "パー?" "ぱー?" "paper?" addAliasFromTable.
    //---------
] execute.
//! showAliasState.
*/
