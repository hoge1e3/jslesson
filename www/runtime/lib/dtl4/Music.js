// Music.js — 音楽演奏オブジェクト（メロディ/楽器/ドラム/バンド/コード）
//
// dolittleV4（デスクトップ版, javax.sound.midi）の音楽APIを、オンライン版で Web Audio により再現する。
// dolittle 記法（例）:
//   きらきら＝メロディ！"ドドソソララソ～" 作る 演奏。
//   バンド1＝バンド！作る。ピアノ＝楽器！"ピアノ" 作る（主旋律）設定。バンド1！（ピアノ）追加（60）テンポ 演奏。
//
// 構成:
//   1) 純粋な記譜パーサ root.DolittleMusic（root非依存・テスト可能。V4 OxMelody 等の移植）
//   2) Actor 派生オブジェクト（Melody/Instrument/DrumSet/Percussion/Band/Code）… 音源(WebAudioTinySynth)と連携
// ※ 音を鳴らす部分（synth）は runtime のみ。パーサは Vitest で検証（音は鳴らさない）。
//
// ロード順注意: Japanese2.js より前に読み込むこと（root登録＋別名対象化）。
// ライセンス: 音源 WebAudioTinySynth は MIT（g200kg）。詳細は docs/music-online.md。

(function () {
  var root = this; // this === root（apply(root) による）

  // ============================================================
  // 純粋ヘルパ（root非依存・テスト可能）— root.DolittleMusic に公開
  // ※ Actor 未定義（テスト時）でもここまでは実行され公開される
  // ============================================================
  var QUOT = 384;              // 4分音符あたりの tick（V4 Synth.quot）
  var DEFAULT_VELOCITY = 95;   // V4 OxMelodyCommon.velocity

  // 楽器名 → General MIDI プログラム番号(1..128)。V4 OxMelodyInstrument より移植（先勝ち）。
  var INSTRUMENTS = {
    "グランドピアノ": 1, "ブライトピアノ": 2, "エレクトリックグランドピアノ": 3, "ホンキートンクピアノ": 4,
    "エレクトリックピアノ１": 5, "エレクトリックピアノ1": 5, "エレクトリックピアノ２": 6, "エレクトリックピアノ2": 6,
    "ハープシコード": 7, "クラビネット": 8, "チェレスタ": 9, "グロッケンシュピール": 10, "ミュージックボックス": 11,
    "ビブラフォン": 12, "マリンバ": 13, "シロフォン": 14, "チューブラーベル": 15, "ダルシマー": 16,
    "ドローバーオルガン": 17, "パーカッシブオルガン": 18, "ロックオルガン": 19, "チヤーチオルガン": 20, "リードオルガン": 21,
    "アコーディオン": 22, "ハーモニカ": 23, "タンゴアコーディオン": 24, "ナイロンギター": 25, "スティールギター": 26,
    "ジャズギター": 27, "クリーンギター": 28, "ミュートギター": 29, "オーバードライブギター": 30, "ディストーションギター": 31,
    "ギターハーモニクス": 32, "アコースティクベース": 33, "フィンガーベース": 34, "ピックベース": 35, "フレットレスベース": 36,
    "スラップベース１": 37, "スラップベース1": 37, "スラップベース２": 38, "スラップベース2": 38,
    "シンセベース１": 39, "シンセベース1": 39, "シンセベース２": 40, "シンセベース2": 40,
    "バイオリン": 41, "ビオラ": 42, "チェロ": 43, "コントラバス": 44, "トレモロストリングス": 45, "ピチカートストリングス": 46,
    "オーケストラハープ": 47, "ティンパニ": 48, "ストリングス": 49, "スローストリングス": 50,
    "シンセストリングス１": 51, "シンセストリングス1": 51, "シンセストリングス２": 52, "シンセストリングス2": 52,
    "コーラス": 53, "ボイス": 54, "シンセボイス": 55, "オーケストラヒット": 56, "トランペット": 57, "トロンボーン": 58,
    "チューバ": 59, "ミュートトランペット": 60, "フレンチホルン": 61, "ブラスセクション": 62,
    "シンセブラス１": 63, "シンセブラス1": 63, "シンセブラス２": 64, "シンセブラス2": 64,
    "ソプラノサックス": 65, "アルトサックス": 66, "テナーサックス": 67, "バリトンサックス": 68, "オーボエ": 69,
    "イングリッシュホルン": 70, "バスーン": 71, "クラリネット": 72, "ピッコロ": 73, "フルート": 74, "リコーダー": 75,
    "パンフルート": 76, "ブロウボトル": 77, "尺八": 78, "ホイッスル": 79, "オカリナ": 80, "スクウェアリード": 81,
    "ソートゥースリード": 82, "カリオペ": 83, "チフリード": 84, "チャランゴ": 85, "ボイスリード": 86, "フィフスリード": 87,
    "ベースアンドリード": 88, "ニューエイジパッド": 89, "ワームパッド": 90, "ポリシンセパッド": 91, "クワイアパッド": 92,
    "ボウドパッド": 93, "メタリックパッド": 94, "ハロパッド": 95, "スウィープパッド": 96, "アイスレイン": 97,
    "サウンドトラック": 98, "クリスタル": 99, "アトモスフィア": 100, "ブライトネス": 101, "ゴブリン": 102, "エコードロップ": 103,
    "エスエフ": 104, "シタール": 105, "バンジョー": 106, "三味線": 107, "琴": 108, "カリンバ": 109, "バグパイプ": 110,
    "フィドル": 111, "シャナイ": 112, "ティンクルベル": 113, "アゴゴ": 114, "スティールドラム": 115, "ウッドブロック": 116,
    "太鼓": 117, "メロディックタム": 118, "シンセドラム": 119, "リバースシンバル": 120, "ギターフレットノイズ": 121,
    "ブレスノイズ": 122, "シーショア": 123, "バード": 124, "テレフォン": 125, "ヘリコプター": 126, "アプローズ": 127, "ガンショット": 128,
    // 別名・簡易名（先勝ちで上の正式名を優先）
    "ピアノ": 1, "ぴあの": 1, "piano": 1, "피아노": 1,
    "クリスマスベル": 14, "くりすますべる": 14, "christmasbell": 14,
    "オルガン": 19, "おるがん": 19, "organ": 19,
    "あこーでぃおん": 21, "accordion": 21,
    "ギター": 25, "ぎたー": 25, "guitar": 25,
    "ベース": 32, "べーす": 32, "base": 32,
    "とらんぺっと": 56, "trumpet": 56,
    "くらりねっと": 71, "clarinet": 71,
    "ベル": 112, "べる": 112, "bell": 112,
    "鳴き声": 123, "なきごえ": 123, "bird": 123
  };

  // 楽器名 or 番号 → GM プログラム番号(1..128)。不明名はピアノ(1)。
  function instrumentToProgram(arg) {
    if (typeof arg === "number" && isFinite(arg)) {
      var p = Math.round(arg);
      if (p < 1) p = 1; if (p > 128) p = 128;
      return p;
    }
    var name = ("" + arg).trim();
    return INSTRUMENTS.hasOwnProperty(name) ? INSTRUMENTS[name] : 1;
  }

  function isDigit(c) { return (c >= "0" && c <= "9") || (c >= "０" && c <= "９"); }

  // 数値トークン（"16" "３２" 等）→ 整数（全角→半角）。V4 str2num 相当（既定 4）。
  function str2num(mstr) {
    var s = "";
    for (var k = 0; k < mstr.length; k++) {
      var ch = mstr[k];
      if (ch >= "０" && ch <= "９") s += String.fromCharCode(ch.charCodeAt(0) - 0xFF10 + 0x30);
      else if (ch >= "0" && ch <= "9") s += ch;
    }
    var v = parseInt(s, 10);
    return (isNaN(v) || v <= 0) ? 4 : v;
  }

  // 音名（1文字）→ MIDIノート番号の基準値。該当なしは null。
  // ド=60 レ=62 ミ=64 ファ=65 ソ=67 ラ=69 シ=71（日本語/ひらがな/ハングル/英字/全角英字）。
  function noteBaseOf(c) {
    switch (c) {
      case "ド": case "ど": case "도": case "C": case "c": case "Ｃ": case "ｃ": return 60;
      case "レ": case "れ": case "레": case "D": case "d": case "Ｄ": case "ｄ": return 62;
      case "ミ": case "み": case "미": case "E": case "e": case "Ｅ": case "ｅ": return 64;
      case "フ": case "ふ": case "파": case "F": case "f": case "Ｆ": case "ｆ": return 65;
      case "ソ": case "そ": case "솔": case "G": case "g": case "Ｇ": case "ｇ": return 67;
      case "ラ": case "ら": case "라": case "A": case "a": case "Ａ": case "ａ": return 69;
      case "シ": case "し": case "시": case "B": case "b": case "Ｂ": case "ｂ": return 71;
      default: return null;
    }
  }

  function upnote(nt, up) { for (var i = 0; i < nt.note.length; i++) nt.note[i] += up; }

  // 記譜文字列 → Note[]（各 Note = {note:number[], length:tick, velocity}）。note=[] は休符。
  // V4 OxMelody.str2note() の忠実移植。整数除算は Math.floor で一致させる。
  // mode: "melody"（単音）/"chord"（A–G等を三和音[root,root+4,root+7]に、m/7 を修飾に）
  function parseNotation(str, velocity, mode) {
    velocity = (typeof velocity === "number") ? velocity : DEFAULT_VELOCITY;
    var melody = [];
    var lastNote = null, octave = 0, contCnt = 0, ampersand = false, cont = false, contAry = [];
    var i = 0, s = "" + (str == null ? "" : str), n = s.length;
    // 長さ指定の先頭になれる数字（V4 の switch は 1,2,3,4,8 のみ。6/7 等は無視）
    // V4 の notePattern は 3 を含まない（"ド3" の 3 は無視される）
    function isLenStart(ch) { return "1248１２４８".indexOf(ch) !== -1; }
    while (i < n) {
      var c = s[i];
      var note = null;   // 新しい音符/休符を生む時だけ非null
      var mstr = c;
      // 数字トークン化: V4 notePattern に合わせ「16」「32」だけ2文字、他は1文字
      if (isDigit(c)) {
        var two = s.slice(i, i + 2);  // substr は lib.js がドリトル用に上書きしているので使わない
        if (two === "16" || two === "32" || two === "１６" || two === "３２") { mstr = two; i += 2; }
        else { i += 1; }
      } else { i += 1; }

      var base = noteBaseOf(c);
      if (base !== null) {
        note = (mode === "chord") ? [base, base + 4, base + 7] : [base];
        ampersand = false;
      } else if (mode === "chord" && (c === "m" || c === "ｍ" || c === "M" || c === "Ｍ")) {
        if (lastNote && lastNote.note.length === 3) lastNote.note[1] -= 1;   // マイナー
      } else if (mode === "chord" && (c === "7" || c === "７")) {
        if (lastNote && lastNote.note.length === 3) lastNote.note.push(lastNote.note[0] + 10); // セブンス
      } else if (c === "・" || c === "," || c === "､" || c === "、" || c === "，") {
        note = []; ampersand = false;                         // 休符
      } else if (c === "↑" || c === "＾" || c === "^") {
        octave += 12; ampersand = false;
      } else if (c === "↓" || c === "＿" || c === "_") {
        octave -= 12; ampersand = false;
      } else if (c === "＃" || c === "♯" || c === "#") {
        if (lastNote) upnote(lastNote, 1); ampersand = false;
      } else if (c === "♭" || c === "％" || c === "%") {
        if (lastNote) upnote(lastNote, -1); ampersand = false;
      } else if (c === "〜" || c === "～" || c === "ー" || c === "−" || c === "－" || c === "~" || c === "-") {
        if (lastNote) lastNote.length += QUOT; ampersand = false;   // 延長
      } else if (c === "{" || c === "｛") {
        cont = true; contCnt = 0; contAry = []; ampersand = false;
      } else if (c === "}" || c === "｝") {
        cont = false; ampersand = false;
        if (contCnt >= 2) {
          var len0 = Math.floor(QUOT * (contCnt - 1) / contCnt);
          for (var a = 0; a < contAry.length; a++) contAry[a].length = len0;
        }
      } else if (c === "&" || c === "＆") {
        ampersand = true;
      } else if (c === "．" || c === "。" || c === ".") {
        if (lastNote) lastNote.length += Math.floor(lastNote.length / 2);  // 付点
      } else if (isLenStart(c)) {                                // 音長（1/2/4/8/16/32）
        var num = str2num(mstr);
        if (contCnt >= 2) {
          var len1 = Math.floor(Math.floor(QUOT * 4 / num) * (contCnt - 1) / contCnt);
          for (var b = 0; b < contAry.length; b++) contAry[b].length = len1;
        } else if (lastNote) {
          if (ampersand) lastNote.length += Math.floor(QUOT * 4 / num);
          else lastNote.length = Math.floor(QUOT * 4 / num);
        }
      } else {
        ampersand = false;  // 空白・その他（0/5/6/7/9・M 等）は無視
      }

      if (note !== null) {
        lastNote = { note: note.slice(), length: QUOT, velocity: velocity };
        if (octave !== 0) upnote(lastNote, octave);
        melody.push(lastNote);
        if (cont) { contAry.push(lastNote); contCnt++; }
        else if (contCnt > 0) { contCnt = 0; }
      }
    }
    return melody;
  }

  function parseMelody(str, velocity) { return parseNotation(str, velocity, "melody"); }
  function parseChord(str, velocity) { return parseNotation(str, velocity, "chord"); }

  // ドラムのデフォルト音（GM パーカッション, ch9）。V4 OxDrumMelody: ド=36 タ=38 ツ=42 ク=44 チ=46 パ=49
  var DRUM = { "ド": 36, "ど": 36, "D": 36, "d": 36, "Ｄ": 36, "ｄ": 36,
               "タ": 38, "た": 38, "T": 38, "t": 38, "Ｔ": 38, "ｔ": 38,
               "ツ": 42, "つ": 42, "S": 42, "s": 42, "Ｓ": 42, "ｓ": 42,
               "ク": 44, "く": 44, "K": 44, "k": 44, "Ｋ": 44, "ｋ": 44,
               "チ": 46, "ち": 46, "C": 46, "c": 46, "Ｃ": 46, "ｃ": 46,
               "パ": 49, "ぱ": 49, "P": 49, "p": 49, "Ｐ": 49, "ｐ": 49 };

  // ドラムパターン文字列 → Note[]（各音は ch9 のパーカッションノート）。V4 OxDrumMelody.str2note 移植。
  // 既定長は16分（QUOT/2）。ン=直前を延長、・=休符、1/2/4/8=長さ、.付点、&加算、{}グループ。
  // map: 楽器設定で変えた打楽器の割り当て（省略時は DRUM）
  function parseDrum(str, velocity, map) {
    velocity = (typeof velocity === "number") ? velocity : DEFAULT_VELOCITY;
    map = map || DRUM;
    var HALF = Math.floor(QUOT / 2);
    var melody = [];
    var lastBeat = null, contCnt = 0, ampersand = false, cont = false, contAry = [];
    var i = 0, s = "" + (str == null ? "" : str), n = s.length;
    function isLenStart(ch) { return "1248１２４８".indexOf(ch) !== -1; }
    while (i < n) {
      var c = s[i];
      var note = null, len = HALF, mstr = c, restTail = false;
      if (isDigit(c)) {
        var two = s.slice(i, i + 2);  // substr は lib.js がドリトル用に上書きしているので使わない
        if (two === "16" || two === "32" || two === "１６" || two === "３２") { mstr = two; i += 2; }
        else { i += 1; }
      } else { i += 1; }

      if (DRUM.hasOwnProperty(c)) {
        note = [map[c]]; ampersand = false;
      } else if (c === "ン" || c === "ん" || c === "N" || c === "n" || c === "Ｎ" || c === "ｎ") {
        if (lastBeat) lastBeat.length += HALF; ampersand = false;         // 延長
      } else if (c === "・" || c === "," || c === "､" || c === "、" || c === "，") {
        // 休符は1拍: V4 は半拍の空打ち（note=[]）と半拍の休み（note=null, 音を出さない）の2つを足す
        note = []; ampersand = false; restTail = true;
      } else if (c === "&" || c === "＆") {
        ampersand = true;
      } else if (c === "．" || c === "。" || c === ".") {
        if (lastBeat) lastBeat.length += Math.floor(lastBeat.length / 2); // 付点
      } else if (c === "{" || c === "｛") {
        cont = true; contCnt = 0; contAry = []; ampersand = false;
      } else if (c === "}" || c === "｝") {
        cont = false; ampersand = false;
        if (contCnt >= 2) {
          var l0 = Math.floor(QUOT * (contCnt - 1) / contCnt);
          for (var a = 0; a < contAry.length; a++) contAry[a].length = l0;
        }
      } else if (isLenStart(c)) {
        var num = str2num(mstr);
        if (contCnt >= 2) {
          var l1 = Math.floor(Math.floor(QUOT * 4 / num) * (contCnt - 1) / contCnt);
          for (var b = 0; b < contAry.length; b++) contAry[b].length = l1;
        } else if (lastBeat) {
          if (ampersand) lastBeat.length += Math.floor(QUOT * 4 / num);
          else lastBeat.length = Math.floor(QUOT * 4 / num);
        }
      } else {
        ampersand = false;
      }

      if (note !== null) {
        lastBeat = { note: note.slice(), length: len, velocity: velocity };
        melody.push(lastBeat);
        if (cont) { contAry.push(lastBeat); contCnt++; }
        else if (contCnt > 0) { contCnt = 0; }
      }
      if (restTail) {
        lastBeat = { note: null, length: len, velocity: velocity };
        melody.push(lastBeat);
        if (cont) { contAry.push(lastBeat); contCnt++; }
        else if (contCnt > 0) { contCnt = 0; }
      }
    }
    return melody;
  }

  // リズム（打楽器1つ）の記譜 → Note[]。V4 OxDrumMelody（drum=false）の移植。
  // 打音（ド/ト/タ/チ/ツ/ク/パ とひらがな）は半拍の note=[]（打楽器の音で鳴る）、
  // 休符（・・空白）は1拍の note=null（音を出さない）。ン=半拍延長、数字=長さ、.付点、&加算、{}グループ。
  var RHYTHM_BEAT = "ドどトとタたチちツつクくパぱ";
  function parseRhythm(str, velocity) {
    velocity = (typeof velocity === "number") ? velocity : DEFAULT_VELOCITY;
    var HALF = Math.floor(QUOT / 2);
    var melody = [];
    var lastBeat = null, contCnt = 0, ampersand = false, cont = false, contAry = [];
    var i = 0, s = "" + (str == null ? "" : str), n = s.length;
    function isLenStart(ch) { return "1248１２４８".indexOf(ch) !== -1; }
    while (i < n) {
      var c = s[i], mstr = c, add = null;
      if (isDigit(c)) {
        var two = s.slice(i, i + 2);  // substr は lib.js がドリトル用に上書きしているので使わない
        if (two === "16" || two === "32" || two === "１６" || two === "３２") { mstr = two; i += 2; }
        else { i += 1; }
      } else { i += 1; }
      if (RHYTHM_BEAT.indexOf(c) !== -1) {
        add = { note: [], length: HALF, velocity: velocity }; ampersand = false;
      } else if (c === "ン" || c === "ん") {
        if (lastBeat) lastBeat.length += HALF; ampersand = false;
      } else if (c === "・" || c === " " || c === "　") {
        add = { note: null, length: QUOT, velocity: velocity }; ampersand = false;
      } else if (c === "{" || c === "｛") {
        cont = true; contCnt = 0; contAry = []; ampersand = false;
      } else if (c === "}" || c === "｝") {
        cont = false; ampersand = false;
        if (contCnt >= 2) {
          var l0 = Math.floor(QUOT * (contCnt - 1) / contCnt);
          for (var a = 0; a < contAry.length; a++) contAry[a].length = l0;
        }
      } else if (c === "&" || c === "＆") {
        ampersand = true;
      } else if (c === "．" || c === "。" || c === ".") {
        if (lastBeat) lastBeat.length += Math.floor(lastBeat.length / 2);
      } else if (isLenStart(c)) {
        var num = str2num(mstr);
        if (contCnt >= 2) {
          var l1 = Math.floor(Math.floor(QUOT * 4 / num) * (contCnt - 1) / contCnt);
          for (var b = 0; b < contAry.length; b++) contAry[b].length = l1;
        } else if (lastBeat) {
          if (ampersand) lastBeat.length += Math.floor(QUOT * 4 / num);
          else lastBeat.length = Math.floor(QUOT * 4 / num);
        }
      } else {
        ampersand = false;
      }
      if (add) {
        lastBeat = add;
        melody.push(add);
        if (cont) { contAry.push(add); contCnt++; }
        else if (contCnt > 0) { contCnt = 0; }
      }
    }
    return melody;
  }

  // 演奏の終わり（tick）。V4 の MIDI シーケンスは最後のイベントで終わる:
  //  - メロディ/コード: 音のある音符の NOTE_OFF（開始+長さ-1）。休符（note=[]）はイベントを出さない
  //  - ドラム/リズム（打楽器）: note!==null の NOTE_OFF（開始+長さ-半拍）
  function endTick(notes, percussion) {
    var t = 0, end = 0;
    for (var i = 0; i < notes.length; i++) {
      var nt = notes[i];
      if (percussion) {
        if (nt.note !== null && nt.note !== undefined) end = Math.max(end, t + nt.length - Math.floor(QUOT / 2), t);
      } else if (nt.note && nt.note.length > 0) {
        end = Math.max(end, t + nt.length - 1);
      }
      t += nt.length;
    }
    return end;
  }

  // 総 tick 数（＝演奏長。待つ の待機時間算出に使用）
  function totalTicks(notes) {
    var t = 0;
    for (var i = 0; i < notes.length; i++) t += notes[i].length;
    return t;
  }

  root.DolittleMusic = {
    QUOT: QUOT,
    DEFAULT_VELOCITY: DEFAULT_VELOCITY,
    INSTRUMENTS: INSTRUMENTS,
    instrumentToProgram: instrumentToProgram,
    str2num: str2num,
    noteBaseOf: noteBaseOf,
    parseMelody: parseMelody,
    parseChord: parseChord,
    parseDrum: parseDrum,
    parseRhythm: parseRhythm,
    endTick: endTick,
    DRUM: DRUM,
    totalTicks: totalTicks
  };

  // ここから下は runtime（Actor/synth）依存。テスト環境（Actor未定義）では実行しない。
  if (!root.Actor) return;

  // ============================================================
  // ここから runtime 部（V4.02 の OxMelody/OxCodeMelody/OxDrumMelody/OxMelodyInstrument/
  // OxDrumInstrument/OxMusicBand/Synth に合わせて 2026-09-27 に作り直し）
  //
  // - 演奏は1つのシーケンサー（V4 Synth.seqr）で行う。新しい演奏は前の演奏を止めて置き換える。
  // - 標準テンポは 176拍/分（V4 Synth.defaultBPM）。バンドの テンポ x は 2x 拍/分（V4 OxMusicBand.setTempo）。
  // - 待つ はシーケンサーが止まる（最後のイベント＝endTick）まで待つ。演奏していなければすぐ返る。
  // - 作る は受け手の音符を引き継ぐ（V4 make_sub の copyStatus）。音上げる は別のメロディを返す。
  // ============================================================
  var G = (root && root.window) ? root.window : (typeof window !== "undefined" ? window : this);
  var DM = root.DolittleMusic;
  var DEFAULT_BPM = 176;
  var HALF = Math.floor(QUOT / 2);
  var MEL_CH = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]; // 9はドラム専用

  function rtError(msg) {
    var R = G.DolittleRuntimeError;
    return (R && R.RtError) ? R.RtError("RT_MUSIC", msg) : new Error(msg);
  }
  function showVal(v) {
    if (v === undefined || v === null) return "（値なし）";
    if (typeof v === "string") return "『" + v + "』";
    return "『" + String(v) + "』";
  }
  function isNum(v) {
    return !(typeof v === "boolean" || v === null || v === undefined || v === "" ||
      (typeof v === "object") || typeof v === "function" || isNaN(Number(v)));
  }
  // V4 reqInt（数でなければエラー）
  function needInt(v, method) {
    if (!isNum(v)) throw rtError("『" + method + "』には数を指定してください。数でないもの" + showVal(v) + "が渡されました。");
    return Math.trunc(Number(v));
  }
  function copyNotes(notes) {
    return (notes || []).map(function (n) {
      return { note: n.note ? n.note.slice() : n.note, length: n.length, velocity: n.velocity, silent: n.silent };
    });
  }
  function defm(obj, names, fn) { for (var i = 0; i < names.length; i++) obj[names[i]] = fn; }
  var N = {
    copy: ["copy", "複製", "ふくせい"],
    set: ["set", "設定", "設定する", "せってい", "せっていする"],
    add: ["add", "put", "追加", "追加する", "ついか", "ついかする"],
    silent: ["silent", "無音", "無音にする", "むおん", "むおんにする"],
    repeat: ["repeat", "繰り返す", "繰返す", "くり返す", "くりかえす"],
    upnote: ["upnote", "音上げる", "音を上げる", "おとあげる", "おとをあげる"],
    play: ["play", "演奏", "演奏する", "えんそう", "えんそうする"],
    wait: ["wait", "待つ", "まつ"],
    velocity: ["velocity", "音量", "大きさ", "おんりょう", "おおきさ"],
    clear: ["clear", "クリア", "クリアする", "くりあ", "くりあする"],
    instrument: ["instrument", "楽器設定", "楽器設定する", "楽器を設定する", "がっきせってい", "がっきせっていする", "がっきをせっていする"],
    tempo: ["tempo", "speed", "テンポ", "速さ", "てんぽ", "はやさ"]
  };

  // ---- 共有シンセ（WebAudioTinySynth, 遅延生成・ユーザー操作時に resume）----
  var _synth = null;
  function getSynth() {
    if (_synth) return _synth;
    var C = G.WebAudioTinySynth;
    if (!C) { if (G.console) G.console.warn("Music: 音源 WebAudioTinySynth が読み込まれていません"); return null; }
    try { _synth = new C({ voices: 64, useReverb: 1 }); } catch (e) { _synth = null; }
    return _synth;
  }
  function resumeAudio() {
    var s = getSynth(); if (!s || !s.getAudioContext) return;
    var c = s.getAudioContext();
    if (c && c.state === "suspended" && c.resume) { try { c.resume(); } catch (e) {} }
  }
  // E2E/デバッグ用の観測フック（実挙動に影響しない）
  var DBG = DM._dbg = { plays: 0, notes: 0 };
  DM.getSynth = getSynth;

  // ---- シーケンサー（1つだけ。V4 Synth.seqr）----
  var seq = { endAt: 0, timer: null };
  function stopSequence() {
    if (seq.timer !== null) { G.clearInterval(seq.timer); seq.timer = null; }
    var s = _synth;
    if (s && s.allSoundOff) { for (var ch = 0; ch < 16; ch++) { try { s.allSoundOff(ch); } catch (e) {} } }
  }
  // tracks: [{notes, mode:"melody"|"drum"|"rhythm", program(1..128, melody), prog(打楽器の音番号)}]
  function playTracks(tracks, bpm) {
    stopSequence();
    bpm = bpm > 0 ? bpm : DEFAULT_BPM;
    var spt = 60 / (bpm * QUOT);  // 秒/tick
    var end = 0, evs = [], melIdx = 0, progs = [];
    for (var ti = 0; ti < tracks.length; ti++) {
      var tr = tracks[ti];
      if (!tr || !tr.notes) continue;
      var perc = tr.mode !== "melody";
      end = Math.max(end, DM.endTick(tr.notes, perc));
      var ch = perc ? 9 : MEL_CH[melIdx++ % MEL_CH.length];
      if (!perc) progs.push([ch, ((tr.program || 1) - 1) & 127]);
      var t = 0;
      for (var i = 0; i < tr.notes.length; i++) {
        var nt = tr.notes[i];
        var keys = [];
        if (nt.note && !nt.silent) {
          if (nt.note.length > 0) keys = nt.note;
          else if (tr.mode === "rhythm") keys = [tr.prog];   // リズムの打音は打楽器の音で鳴る
        }
        for (var k = 0; k < keys.length; k++) {
          evs.push({ t: t, ch: ch, n: keys[k], v: nt.velocity, d: perc ? Math.max(HALF, nt.length - HALF) : nt.length - 1 });
        }
        t += nt.length;
      }
    }
    DBG.plays++;
    DBG.notes += evs.length;
    var endMs = end * spt * 1000;
    // 音符が無くても音源は作る（`（メロディ！作る）！演奏 待つ` を最初に置いて音源を温める書き方が V4 と同じに効くように。
    // 作らないと次の本当の演奏で音源を作る時間（100〜200ms）が演奏時間に乗る。2026-10-17 V4 の機能テスト music.melody.play.chain で発見）
    var s = getSynth();
    // 終わりの時刻は音源の準備（最初の演奏で音源を作る時間）の後から数える
    if (!s || evs.length === 0) { seq.endAt = Date.now() + endMs; return; }
    resumeAudio();
    var ctx = s.getAudioContext ? s.getAudioContext() : null;
    for (var p = 0; p < progs.length; p++) { try { s.setProgram(progs[p][0], progs[p][1]); } catch (e) {} }
    evs.sort(function (a, b) { return a.t - b.t; });
    seq.endAt = Date.now() + endMs;
    var base = (ctx ? ctx.currentTime : 0) + 0.03, idx = 0, stopAt = seq.endAt + 3000;
    // 先読みで少しずつ予約する（一度に全部予約すると同時発音数の上限で音が消える）
    var pump = function () {
      var now = ctx ? ctx.currentTime : 0;
      while (idx < evs.length && base + evs[idx].t * spt < now + 1.0) {
        var e = evs[idx++], st = base + e.t * spt;
        try {
          s.noteOn(e.ch, e.n, e.v, st);
          s.noteOff(e.ch, e.n, st + Math.max(0.03, e.d * spt));
        } catch (err) {}
      }
      if (idx >= evs.length || Date.now() > stopAt) { G.clearInterval(seq.timer); seq.timer = null; }
    };
    seq.timer = G.setInterval(pump, 100);
    pump();
  }
  // 待つ: シーケンサーが止まるまで（20ms ごとに確かめる。V4 Synth.playWait と同じ）
  function waitPlay(self) {
    if (Date.now() >= seq.endAt) return self;
    var P = G.Promise;
    if (!P) return self;
    return new P(function (resolve) {
      (function poll() {
        var rest = seq.endAt - Date.now();
        if (rest <= 0) resolve(self);
        else G.setTimeout(poll, Math.max(1, Math.min(20, rest)));
      })();
    });
  }

  // ---- 楽器（メロディ用）と打楽器の全体リスト（V4 Synth.instList）----
  var instList = [];
  var base = function () { return root.create(); };

  // ---- メロディ・コード・ドラム・リズム（V4 OxMelodyCommon）----
  function trackOfMelodyLike(m) {
    if (!m || !m.notes) return null;
    if (m.kind === "drum") return { notes: m.notes, mode: "drum", prog: 0 };
    if (m.kind === "rhythm") return { notes: m.notes, mode: "rhythm", prog: 39 };  // 打楽器が無ければ手拍子（V4）
    return { notes: m.notes, mode: "melody", program: m._inst ? m._inst._prog : 1 };
  }
  function parseFor(obj, str) {
    var v = obj._vel;
    if (obj.kind === "melody") return DM.parseMelody(str, v);
    if (obj.kind === "code") return DM.parseChord(str, v);
    if (obj.kind === "drum") return DM.parseDrum(str, v, obj.drumMap);
    return DM.parseRhythm(str, v);
  }
  // 追加に渡せる相手（V4: メロディにはメロディ、コードにはコード、ドラム/リズムにはドラム/リズム）
  function sameFamily(a, b) {
    if (!b || !b.kind || !b.notes) return false;
    if (a.kind === "drum" || a.kind === "rhythm") return b.kind === "drum" || b.kind === "rhythm";
    return a.kind === b.kind;
  }
  function copyStatus(dst, src) {
    dst.notes = copyNotes(src.notes);
    dst._inst = src._inst;
    dst._vel = src._vel;
    if (src.drumMap) dst.drumMap = src.drumMap;
    return dst;
  }
  function setVelocityAll(obj, v) {
    obj._vel = v;
    for (var i = 0; i < obj.notes.length; i++) obj.notes[i].velocity = v;
  }

  function defineMelodyLike(kind) {
    var C = base();
    C.kind = kind;
    C.__music__ = kind;
    C.notes = [];
    C._vel = DM.DEFAULT_VELOCITY;
    C._inst = null;
    // 作る: 受け手（見本）の音符・楽器を引き継ぎ、文字列1つを渡されたらその音符を足す
    C.initialize = function (src) {
      copyStatus(this, this);
      if (arguments.length === 1 && (typeof src === "string" || (kind === "code" && src !== undefined && src !== null))) {
        var ns = parseFor(this, String(src));
        for (var j = 0; j < ns.length; j++) this.notes.push(ns[j]);
      }
      return this;
    };
    // 複製: 見本と同じ親から作る（引数の文字列は作ると同じ）
    defm(C, N.copy, function (src) {
      var n = copyStatus(Object.create(Object.getPrototypeOf(this)), this);
      if (arguments.length === 1 && (typeof src === "string" || (kind === "code" && src !== undefined && src !== null))) {
        var ns = parseFor(n, String(src));
        for (var j = 0; j < ns.length; j++) n.notes.push(ns[j]);
      }
      return n;
    });
    defm(C, N.add, function () {
      for (var i = 0; i < arguments.length; i++) {
        var x = arguments[i];
        if (typeof x === "string") {
          var ns = parseFor(this, x);
          for (var j = 0; j < ns.length; j++) this.notes.push(ns[j]);
        } else if (sameFamily(this, x)) {
          var cs = copyNotes(x.notes);
          for (var k = 0; k < cs.length; k++) this.notes.push(cs[k]);
        }
      }
      return this;
    });
    defm(C, N.silent, function (n) {
      var len = needInt(n, "無音") * QUOT;
      this.notes.push({ note: [], length: len, velocity: this._vel, silent: true });
      return this;
    });
    defm(C, N.repeat, function (n) {
      var times = needInt(n, "繰り返す");
      var b = this.notes.slice();
      for (var i = 1; i < times; i++) {
        var cs = copyNotes(b);
        for (var j = 0; j < cs.length; j++) this.notes.push(cs[j]);
      }
      return this;
    });
    // 音上げる: 音を上げた別のメロディを返す（元は変えない）
    defm(C, N.upnote, function (n) {
      var up = needInt(n, "音上げる");
      var m = copyStatus(Object.create(C), this);
      for (var i = 0; i < m.notes.length; i++) {
        var nt = m.notes[i];
        if (nt.note) for (var k = 0; k < nt.note.length; k++) nt.note[k] += up;
      }
      return m;
    });
    defm(C, N.clear, function () { this.notes = []; return this; });
    defm(C, N.play, function () { playTracks([trackOfMelodyLike(this)], DEFAULT_BPM); return this; });
    defm(C, N.wait, function () { return waitPlay(this); });
    if (kind === "melody" || kind === "code") {
      // 設定: 楽器を割り当てる（楽器の音量も引き継ぐ）
      defm(C, N.set, function (inst) {
        if (inst && inst.kind === "instrument") {
          this._inst = inst;
          setVelocityAll(this, inst._vel);
        }
        return this;
      });
    }
    if (kind === "drum" || kind === "rhythm") {
      defm(C, N.velocity, function (v) {
        if (isNum(v)) {
          v = Math.trunc(Number(v));
          if (v >= 0 && v <= 127) setVelocityAll(this, v);
        }
        return this;
      });
    }
    if (kind === "drum") {
      // 楽器設定: "ドタ" 36 38 のように、記号ごとに打楽器（番号・名前）を割り当てる（以後に書いた音符に効く）
      defm(C, N.instrument, function (str) {
        if (arguments.length <= 1) return this;
        str = String(str);
        var map = {};
        for (var key in DRUM) map[key] = (this.drumMap || DRUM)[key];
        for (var i = 0; i < arguments.length - 1 && i < str.length; i++) {
          var arg = arguments[i + 1], inst = -1;
          if (typeof arg === "number") inst = Math.trunc(arg);
          else if (typeof arg === "string") inst = DRUM_NAMES.hasOwnProperty(arg) ? DRUM_NAMES[arg] : -1;
          if (inst < 35 || inst > 81) continue;
          var c = str.charAt(i);
          if (!DRUM.hasOwnProperty(c)) continue;
          var target = DRUM[c];
          for (var k2 in DRUM) if (DRUM[k2] === target) map[k2] = inst;
        }
        this.drumMap = map;
        return this;
      });
    }
    return C;
  }
  var DRUM_NAMES = {"バスドラム２": 35, "バスドラム2": 35, "バスドラム１": 36, "バスドラム1": 36, "サイドスティック": 37,
    "スネアドラム１": 38, "スネアドラム1": 38, "手拍子": 39, "スネアドラム２": 40, "スネアドラム2": 40, "ロートム２": 41,
    "ロートム2": 41, "クローズハイハット": 42, "ロートム１": 43, "ロートム1": 43, "ペダルハイハット": 44, "ミドルトム２": 45,
    "ミドルトム2": 45, "オープンハイハット": 46, "ミドルトム１": 47, "ミドルトム1": 47, "ハイトム２": 48, "ハイトム2": 48,
    "クラッシュシンバル１": 49, "クラッシュシンバル1": 49, "ハイトム１": 50, "ハイトム1": 50, "ライドシンバル１": 51,
    "ライドシンバル1": 51, "チャイニーズシンバル": 52, "ライドベル": 53, "タンバリン": 54, "スプラッシュシンバル": 55,
    "カウベル": 56, "クラッシュシンバル２": 57, "クラッシュシンバル2": 57, "ヴィブラスラップ": 58, "ライドシンバル２": 59,
    "ライドシンバル2": 59, "ハイボンゴ": 60, "ローボンゴ": 61, "ミュートハイコンガ": 62, "オープンハイコンガ": 63,
    "ローコンガ": 64, "ハイタンバール": 65, "ロータンバール": 66, "ハイアゴゴ": 67, "ローアゴゴ": 68, "カバサ": 69,
    "マラカス": 70, "ショートホイッスル": 71, "ロングホイッスル": 72, "ショートギロ": 73, "ロングギロ": 74, "クラヴェス": 75,
    "ハイウッドブロック": 76, "ローウッドブロック": 77, "ミュートクイーカ": 78, "オープンクイーカ": 79,
    "ミュートトライアングル": 80, "オープントライアングル": 81};

  var Melody = root.Melody = defineMelodyLike("melody");
  var Code = root.Code = defineMelodyLike("code");
  var DrumSet = root.DrumSet = defineMelodyLike("drum");
  var Rythm = root.Rythm = root.Rhythm = defineMelodyLike("rhythm");

  // ---- 楽器（V4 OxMelodyInstrument）----
  // 楽器名 → GM番号(1..128)。番号の文字列も受け付ける。見つからなければ null。
  function programOf(arg) {
    if (typeof arg === "number") return Math.trunc(arg);
    var name = String(arg).trim();
    if (DM.INSTRUMENTS.hasOwnProperty(name)) return DM.INSTRUMENTS[name];
    if (/^[0-9]+$/.test(name)) return Number(name) + 1;   // V4: Integer.valueOf の値は0始まり
    return null;
  }
  var Instrument = root.Instrument = base();
  Instrument.kind = "instrument";
  Instrument.__music__ = "instrument";
  Instrument._prog = 1;
  Instrument._vel = DM.DEFAULT_VELOCITY;
  Instrument._melody = null;
  Instrument.initialize = function (arg) {
    var p;
    if (typeof arg === "string") {
      p = programOf(arg);
      if (p === null) throw rtError("楽器『" + arg + "』は見つかりません。楽器の名前か番号を確認してください。");
    } else if (arguments.length === 1 && isNum(arg)) {
      p = Math.trunc(Number(arg));
    } else {
      p = 2;   // V4: 引数なしは 1（0始まり）＝2番
    }
    this._prog = p;
    this._melody = null;
    this._vel = DM.DEFAULT_VELOCITY;
    instList.push(this);
    return this;
  };
  // 複製: 音色・メロディ・音量を引き継ぐ。引数で音色を変えられる
  defm(Instrument, N.copy, function (arg) {
    var n = Object.create(Object.getPrototypeOf(this));
    if (typeof arg === "string") {
      var p = programOf(arg);
      if (p === null) throw rtError("楽器『" + arg + "』は見つかりません。楽器の名前か番号を確認してください。");
      n._prog = p;
    } else if (arguments.length === 1 && isNum(arg)) {
      n._prog = Math.trunc(Number(arg));
    } else {
      n._prog = this._prog;
    }
    n._melody = this._melody;
    n._vel = this._vel;
    instList.push(n);
    return n;
  });
  // 設定: メロディ（またはコード）を割り当てる。文字列は音符として新しいメロディにする
  defm(Instrument, N.set, function (m) {
    if (m && (m.kind === "melody" || m.kind === "code")) {
      this._melody = m;
      setVelocityAll(m, this._vel);
    } else if (typeof m === "string") {
      var mel = Melody.create();
      mel.add(m);
      setVelocityAll(mel, this._vel);
      this._melody = mel;
    }
    return this;
  });
  defm(Instrument, N.velocity, function (v) {
    if (isNum(v)) {
      v = Math.trunc(Number(v));
      if (v >= 0 && v <= 127) {
        this._vel = v;
        if (this._melody) setVelocityAll(this._melody, v);
      }
    }
    return this;
  });
  // クリア: 作った楽器（打楽器も）の一覧を空にする（V4 delAllMelodyInst）
  defm(Instrument, N.clear, function () { instList = []; return this; });
  Instrument._track = function () {
    return this._melody ? { notes: this._melody.notes, mode: "melody", program: this._prog } : null;
  };
  // 演奏: 見本の「楽器」は作った楽器すべてを、作った楽器はそのメロディを演奏する
  defm(Instrument, N.play, function () {
    if (this === Instrument || this === Percussion) {
      playTracks(instList.map(function (i) { return i._track(); }), DEFAULT_BPM);
    } else {
      playTracks([this._track()], DEFAULT_BPM);
    }
    return this;
  });
  defm(Instrument, N.wait, function () { return waitPlay(this); });

  // ---- 打楽器（V4 OxDrumInstrument）----
  var PERC_NAMES = { "バス": 35, "ばす": 35, "bass": 35, "拍手": 39, "はくしゅ": 39, "clapping": 39,
    "スネア": 40, "すねあ": 40, "snare": 40, "ハイハット": 46, "はいはっと": 46, "hi-hat": 46,
    "チャイニーズ": 52, "ちゃいにーず": 52, "chinese": 52, "ライド": 53, "らいど": 53, "ride": 53,
    "タム": 50, "たむ": 50, "tom": 50, "タンバリン": 54, "たんばりん": 54, "tambourine": 54,
    "ボンゴ": 60, "ぼんご": 60, "bongo": 60, "コンガ": 63, "こんが": 63, "conga": 63,
    "ホイッスル": 72, "ほいっする": 72, "whistle": 72, "トライアングル": 81, "とらいあんぐる": 81, "triangle": 81 };
  function percOf(arg) {
    if (typeof arg === "number") return Math.trunc(arg);
    var name = String(arg).trim();
    if (PERC_NAMES.hasOwnProperty(name)) return PERC_NAMES[name];
    if (/^[0-9]+$/.test(name)) return Number(name);
    throw rtError("打楽器『" + arg + "』は見つかりません。打楽器の名前か番号を確認してください。");
  }
  var Percussion = root.Percussion = base();
  Percussion.kind = "percussion";
  Percussion.__music__ = "percussion";
  Percussion._prog = 0;
  Percussion._vel = DM.DEFAULT_VELOCITY;
  Percussion._melody = null;
  Percussion.initialize = function (arg) {
    this._prog = (arguments.length === 1 && arg !== undefined && arg !== null) ? percOf(arg) : 40;
    this._melody = null;
    this._vel = DM.DEFAULT_VELOCITY;
    instList.push(this);
    return this;
  };
  // 複製: V4 と同じく音色だけ（引数なしはスネア）。メロディは引き継がない
  defm(Percussion, N.copy, function (arg) {
    var n = Object.create(Object.getPrototypeOf(this));
    n._prog = (arguments.length === 1 && arg !== undefined && arg !== null) ? percOf(arg) : 40;
    n._melody = null;
    n._vel = DM.DEFAULT_VELOCITY;
    instList.push(n);
    return n;
  });
  // 設定: ドラム/リズムを割り当てる。文字列はリズムとして読む
  defm(Percussion, N.set, function (m) {
    if (m && (m.kind === "drum" || m.kind === "rhythm")) {
      this._melody = m;
      setVelocityAll(m, this._vel);
    } else if (typeof m === "string") {
      var r = Rythm.create();
      r.add(m);
      setVelocityAll(r, this._vel);
      this._melody = r;
    }
    return this;
  });
  defm(Percussion, N.velocity, Instrument.velocity);
  defm(Percussion, N.clear, function () { instList = []; return this; });
  Percussion._track = function () {
    if (!this._melody) return null;
    return { notes: this._melody.notes, mode: this._melody.kind === "drum" ? "drum" : "rhythm", prog: this._prog };
  };
  defm(Percussion, N.play, Instrument.play);
  defm(Percussion, N.wait, function () { return waitPlay(this); });

  // ---- バンド（V4 OxMusicBand）----
  var Band = root.Band = base();
  Band.kind = "band";
  Band.__music__ = "band";
  Band.insts = [];
  Band.melodies = [];
  Band._tempo = DEFAULT_BPM;
  function addMembers(b, args) {
    for (var i = 0; i < args.length; i++) {
      var x = args[i];
      if (!x || !x.kind) continue;
      if (x.kind === "melody" || x.kind === "code" || x.kind === "drum" || x.kind === "rhythm") b.melodies.push(x);
      else if (x.kind === "instrument") b.insts.push(x);
    }
  }
  // 作る: 見本のメンバーを引き継ぎ、引数のメロディ・楽器を加える（見本は変えない）。テンポは標準に戻る
  Band.initialize = function () {
    this.insts = this.insts.slice();
    this.melodies = this.melodies.slice();
    this._tempo = DEFAULT_BPM;
    addMembers(this, arguments);
    return this;
  };
  defm(Band, N.copy, function () {
    var n = Object.create(Object.getPrototypeOf(this));
    n.insts = this.insts.slice();
    n.melodies = this.melodies.slice();
    n._tempo = DEFAULT_BPM;
    addMembers(n, arguments);
    return n;
  });
  defm(Band, N.add, function () { addMembers(this, arguments); return this; });
  defm(Band, N.clear, function () { this.insts = []; this.melodies = []; return this; });
  defm(Band, N.tempo, function (t) {
    if (arguments.length === 1 && isNum(t)) this._tempo = Number(t) * 2;
    return this;
  });
  defm(Band, N.play, function () {
    var tracks = this.insts.map(function (i) { return i._track(); })
      .concat(this.melodies.map(trackOfMelodyLike));
    playTracks(tracks, this._tempo);
    return this;
  });
  defm(Band, N.wait, function () { return waitPlay(this); });

}).checkerror().apply(root, []);
