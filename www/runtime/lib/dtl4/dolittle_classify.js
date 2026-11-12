// dolittle_classify.js — 構文エラーのカテゴリ別分類（djs組み込み版）
//
// ⚠ これは別プロジェクト d_error の参考実装
//   /Users/kanemune/Dropbox/claudeCode/www/research/ba_db2605/d_error/web/js/dolittle_classify.js
//   （ES Module版）を、djsのクラシック<script>環境で使えるよう
//   「export を除去し IIFE で window.DolittleClassify に公開」した変換コピー。
//   変換元コミット: 2026-06-27 時点
//
//   ★djsローカル修正（本家 d_error にも反映が望ましい。再変換時はマージし直すこと）:
//   - 2026-06-30: EXTRA_PERIOD 判定で「…」ブロック内部の「。」を誤検出しないよう
//     maskBlocksForExtraPeriod() でマスク。併せて PERIOD_MISSING(prev_line) の行番号を
//     実際の欠落行（前の行）に補正。`★djsローカル修正` で印を付けてある。
//
//   注: 「数字始まり変数名」(例 `1ばん＝5。`)はdjsでは構文エラーにならず（パーサが寛容）、
//   実行時にJS SyntaxErrorとして現れるため、構文分類器ではなく実行時エラー層
//   （runtime/js/dtl/dolittle_runtime_error.js）で親切化している。本ファイルでは扱わない。
//
// 使用例（djs js/index.js から）:
//   var result = window.DolittleClassify.classify(
//     { srcText: src, pos: null, checkerOk: false,
//       checkerLine: extractLine(e.message), checkerMessage: e.message },
//     METHOD_NAMES);
//   // result = { category, subdetail, userMessage, lineNo }

(function (global) {
  "use strict";

  // ============================================================
  // 字句素性抽出
  // ============================================================

  // 文字列デリミタ: 直線 "（U+0022）＋ カーリー “ ”（U+201C/U+201D）。
  // ★djsローカル修正（2026-06-30）: examples は `"左"` `"tulip.png"` のようにカーリー引用符を多用する。
  // 開きはいずれかの引用符、閉じは次の引用符（同種でなくてもよい。例 `“…”`／`”…”`）。
  // 直線引用符のみのプログラムでは従来と同一挙動（" は集合に含まれるため）。
  const QUOTE_CHARS = '"“”';
  function isQuoteChar(ch) { return ch !== undefined && QUOTE_CHARS.indexOf(ch) !== -1; }

  /** 文字列リテラル（" / “ / ” で囲む）とコメント（// ／／ の行コメント、スラッシュ＋アスタリスクの囲みコメント（半角・全角）。2026-10-17）を空白に置換し、コードのみ抽出。
   *  置換は同じ長さの空白なので、オフセット・改行は保持される（囲みコメントの中の改行も残す）。 */
  const isSlash = (ch) => ch === "/" || ch === "／", isStar = (ch) => ch === "*" || ch === "＊";
  function stripStringsAndComments(text) {
    const out = [];
    let i = 0, n = text.length;
    let stringUnclosed = false;
    while (i < n) {
      const c = text[i];
      // HTML タグ（<p>…</p> 等。HtmlDom.js）は文字列と同じく中身を見ない（判定は minimal.js の scanHtmlTag。2026-10-25）
      if (c === "<" && typeof MinimalParser !== "undefined" && MinimalParser.scanHtmlTag) {
        const tg = MinimalParser.scanHtmlTag(text, i);
        if (tg) {
          let blank = text.slice(i, i + tg.len).replace(/[^\n]/g, " ");
          // タグで行が終わる文は「。」を省略できる（minimal.js の tag_period。2026-10-31）。パーサが文を終えた位置なら、空白の末尾に「。」を置いて文の切れ目を残す
          const tp = MinimalParser.lastTagPeriods;
          if (tp && tp.src === text && tp.at[i + tg.len]) blank = blank.slice(0, -1) + "。";
          out.push(blank); i += tg.len; continue;
        }
      }
      // 行コメント
      if (isSlash(c) && i + 1 < n && isSlash(text[i + 1])) {
        let j = i;
        while (j < n && text[j] !== "\n") j++;
        out.push(" ".repeat(j - i));
        i = j;
        continue;
      }
      // 囲みコメント（閉じが無ければ末尾まで）
      if (isSlash(c) && i + 1 < n && isStar(text[i + 1])) {
        let j = i + 2;
        while (j < n && !(isStar(text[j]) && j + 1 < n && isSlash(text[j + 1]))) j++;
        j = j < n ? j + 2 : n;
        out.push(text.slice(i, j).replace(/[^\n]/g, " "));
        i = j;
        continue;
      }
      // 文字列リテラル（引用符いずれか）
      if (isQuoteChar(c)) {
        let j = i + 1;
        while (j < n && !isQuoteChar(text[j]) && text[j] !== "\n") j++;
        if (j < n && isQuoteChar(text[j])) {
          out.push(" ".repeat(j - i + 1));
          i = j + 1;
        } else {
          stringUnclosed = true;
          out.push(" ".repeat(j - i));
          i = j;
        }
        continue;
      }
      out.push(c);
      i++;
    }
    return { codeOnly: out.join(""), stringUnclosed };
  }

  /** 「」（）()のカウント */
  function countBrackets(code) {
    return {
      blockOpen: (code.match(/「/g) || []).length,
      blockClose: (code.match(/」/g) || []).length,
      fparOpen: (code.match(/（/g) || []).length,
      fparClose: (code.match(/）/g) || []).length,
      hparOpen: (code.match(/\(/g) || []).length,
      hparClose: (code.match(/\)/g) || []).length,
    };
  }

  const HALFWIDTH_PUNCT_RE = /[;,{}]/;
  function findHalfwidthPunct(code) {
    const m = code.match(HALFWIDTH_PUNCT_RE);
    return m ? m[0] : null;
  }

  function hasHalfwidthParen(code) {
    return code.includes("(") || code.includes(")");
  }

  const UNSUPPORTED_OP_RE = /&&|\|\||(?<!\*)\*\*(?!\*)|<>|=<|=>/;
  function findUnsupportedOp(code) {
    const m = code.match(UNSUPPORTED_OP_RE);
    return m ? m[0] : null;
  }

  /** 行末以外に「。」が出現するか */
  function hasExtraPeriodInLine(line) {
    const s = line.replace(/\s+$/, "");
    if (s.length <= 1) return false;
    const lastChar = s[s.length - 1];
    const body = "。.．｡".includes(lastChar) ? s.slice(0, -1) : s;
    return /[。．｡]/.test(body);
  }

  // ★djsローカル修正（2026-06-30。本家 d_error にも同様の修正が望ましい）:
  // EXTRA_PERIOD 判定用に、文字列/コメント除去後さらに「…」ブロック内部を空白化する。
  // ブロック内の「。」は文（ステートメント）の区切りとして正当なので、行中の「余分な。」と
  // 誤検出してはならない（例: `入力:動作 = 「数=(自分!読む)。自分!(数*2) 書く」。`）。
  // 改行は保持し行番号がずれないようにする。「」自体は残す（括弧数カウントには使わない）。
  function maskBlocksForExtraPeriod(text) {
    const code = stripStringsAndComments(text).codeOnly;
    let depth = 0, out = "";
    for (let i = 0; i < code.length; i++) {
      const c = code[i];
      if (c === "「") { depth++; out += "「"; }
      else if (c === "」") { if (depth > 0) depth--; out += "」"; }
      else if (c === "\n") { out += "\n"; }
      else out += depth > 0 ? " " : c;
    }
    return out;
  }

  function hasDoubleBang(code) {
    return code.includes("！！") || code.includes("!!");
  }

  // 「。」「.」「．」「｡」のいずれかが 2 個以上連続（混在も検出）
  const DOUBLE_PERIOD_RE = /[。．.｡]{2,}/;
  function hasDoublePeriod(code) {
    return DOUBLE_PERIOD_RE.test(code);
  }

  function hasStrayJpComma(code) {
    return code.includes("、") || code.includes("､");
  }

  const TERMINATORS_TRAIL_RE = /[。．.｡]\s*$/;
  const IDENT_RE = /^[　-鿿_A-Za-z][　-鿿_A-Za-z0-9]*$/;

  /** ! 欠落（識別子連続、!/:/数字 なしの右辺） */
  function looksLikeMissingBang(line) {
    let s = line.trim();
    if (!s) return false;
    s = s.replace(TERMINATORS_TRAIL_RE, "");
    let rhs;
    if (s.includes("=") || s.includes("＝")) {
      rhs = s.split(/[=＝]/, 2)[1] || "";
      rhs = rhs.trim();
    } else {
      rhs = s;
    }
    if (!rhs) return false;
    if (/[！!:：]/.test(rhs)) return false;
    const tokens = rhs.split(/\s+/).filter(t => t);
    if (tokens.length < 2) return false;
    const identCount = tokens.filter(t => IDENT_RE.test(t)).length;
    return identCount >= 2;
  }

  // ★djsローカル追加（2026-06-30）: `自分(...)` / `自分（...）`（self の後の「！」抜け）を検出。
  // `自分`(self) は常にレシーバ＝オブジェクトなので、！/: を挟まず直接丸括弧が続くのは
  // メッセージ送信「！」抜けの**確実な**誤り（例: `自分(数 * 2) 書く` → `自分！(数 * 2) 書く`）。
  // 一方 `識別子（引数）`（例 `乱数（100）`, `作る（…）`, ネスト `位置（乱数（100） 乱数（200））`）は
  // 正当な頻出形なので一般化はしない（誤検出になる）。`自分` のみに限定した安全な判定。
  // 正当な `自分！(...)` や `(自分！読む)` は ！ があるので対象外。
  function isDolittleIdentChar(ch) {
    if (!ch) return false;
    if (/[A-Za-z0-9_]/.test(ch)) return true;
    const c = ch.codePointAt(0);
    // ひらがな/カタカナ/CJK統合漢字/長音/々（CJK記号・句読点 U+3000–303F は識別子扱いしない）
    return (c >= 0x3040 && c <= 0x30ff) || (c >= 0x4e00 && c <= 0x9fff) || ch === "ー" || ch === "々";
  }
  const SELF_BEFORE_PAREN_RE = /自分\s*[（(]/g;
  function selfMissingBangLine(src) {
    const code = stripStringsAndComments(src).codeOnly;
    SELF_BEFORE_PAREN_RE.lastIndex = 0;
    let m;
    while ((m = SELF_BEFORE_PAREN_RE.exec(code)) !== null) {
      const before = m.index > 0 ? code[m.index - 1] : "";
      // 直前が識別子文字なら「○○自分」という別語の末尾なので除外（例: 何か自分（…）= 正当なメソッド名）
      if (isDolittleIdentChar(before)) continue;
      return offsetToLine(src, m.index);
    }
    return null;
  }

  // ★djsローカル追加（2026-06-30）: `)自分` / `）自分`（閉じ括弧の直後に self）を検出。
  // `自分`(self) は文の先頭（レシーバ）にしか来ないので、`)` の直後に「。」を挟まず `自分` が続くのは
  // **直前の文の終わりに「。」が抜けている**確実な誤り（例: `(自分！読む)自分！(数*2) 書く`）。
  // 正当な `(引数)メソッド`（例 `(赤)塗る`, `）線の色`）はメソッド名であって self ではないので対象外。
  const CLOSEPAREN_SELF_RE = /[）)]\s*自分/g;
  function selfAfterCloseParenLine(src) {
    const code = stripStringsAndComments(src).codeOnly;
    CLOSEPAREN_SELF_RE.lastIndex = 0;
    let m;
    while ((m = CLOSEPAREN_SELF_RE.exec(code)) !== null) {
      const selfPos = m.index + m[0].indexOf("自分");
      const after = code[selfPos + 2] || "";
      // 「自分○○」という別語の先頭なら除外（self トークンに限定）
      if (isDolittleIdentChar(after)) continue;
      return offsetToLine(src, selfPos);
    }
    return null;
  }

  const UNIT_AFTER_NUMBER_RE = /[０-９0-9]+(?:歩|度|回|秒|個|メートル|ピクセル|cm|mm|km|kg|g|m)/;
  function findUnitAfterNumber(code) {
    const m = code.match(UNIT_AFTER_NUMBER_RE);
    return m ? m[0] : null;
  }

  const FULLWIDTH_QUOTE_RE = /[“”゛＂]/;
  function findFullwidthQuote(text) {
    const m = text.match(FULLWIDTH_QUOTE_RE);
    return m ? m[0] : null;
  }

  const ESC_SEQ_RE = /\\[ntr]/;
  function hasEscapeSeqInStrings(text) {
    let i = 0, n = text.length;
    while (i < n) {
      const c = text[i];
      if (c === "/" && i + 1 < n && text[i + 1] === "/") {
        while (i < n && text[i] !== "\n") i++;
        continue;
      }
      if (c === '"') {
        let j = i + 1;
        while (j < n && text[j] !== '"' && text[j] !== "\n") j++;
        const literal = text.slice(i + 1, j);
        if (ESC_SEQ_RE.test(literal)) return true;
        i = j < n && text[j] === '"' ? j + 1 : j;
        continue;
      }
      i++;
    }
    return false;
  }

  const METHOD_CALL_RE = /[！!]\s*([　-鿿_A-Za-z][　-鿿_A-Za-z0-9]*)/g;
  // ★djsローカル修正（2026-06-30）: 識別子クラス `[　-鿿…]`(U+3000–U+9FFF) には
  // 句読点「。」(U+3002)「、」(U+3001) 等が含まれるため、`作る。` のように文末句点まで
  // メソッド名として拾ってしまい、正規メソッド `作る` を「未登録（もしかして作る？）」と
  // 誤検出する。トークン末尾の句読点を除去してから辞書照合する。
  const TRAILING_PUNCT_RE = /[。．｡、，]+$/;
  function extractMethodCalls(code) {
    const calls = [];
    let m;
    METHOD_CALL_RE.lastIndex = 0;
    while ((m = METHOD_CALL_RE.exec(code)) !== null) {
      const name = m[1].replace(TRAILING_PUNCT_RE, "");
      if (name) calls.push(name);
    }
    return calls;
  }

  const RESERVED_LHS = new Set([
    "赤", "青", "緑", "黄", "白", "黒", "紫", "桃", "橙", "茶", "灰",
    "タートル", "ボタン", "ラベル", "テキスト", "図形", "選択メニュー",
    "スライダー", "イメージ", "リスナー", "タイマー", "ストップウォッチ",
    "配列", "色", "音", "サウンド", "テーブル", "通信", "音声合成", "画面",
  ]);

  const RESERVED_ASSIGN_RE = /^\s*([　-鿿_A-Za-z][　-鿿_A-Za-z0-9]*)\s*[=＝]/;
  function firstReservedAssign(line) {
    const m = line.match(RESERVED_ASSIGN_RE);
    if (!m) return null;
    return RESERVED_LHS.has(m[1]) ? m[1] : null;
  }

  /** 1始まり行番号で1行を取り出す */
  function lineAt(text, lineNo) {
    if (lineNo <= 0) return "";
    const lines = text.split("\n");
    return lineNo - 1 < lines.length ? lines[lineNo - 1] : "";
  }

  function offsetToLine(text, offset) {
    if (offset == null || offset < 0 || offset >= text.length) return 1;
    let count = 1;
    for (let i = 0; i < offset; i++) {
      if (text[i] === "\n") count++;
    }
    return count;
  }

  const TERMINATORS = "。.．｡";

  function lineLacksTerminator(line) {
    const s = line.replace(/\s+$/, "");
    if (!s) return false;
    return !TERMINATORS.includes(s[s.length - 1]);
  }

  // ============================================================
  // 簡易 typo 検出（Levenshtein 距離 ≤ 2）
  // ============================================================

  function levenshtein(a, b) {
    if (a === b) return 0;
    const al = a.length, bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;
    const dp = Array(bl + 1).fill(0).map((_, i) => i);
    for (let i = 1; i <= al; i++) {
      let prev = dp[0];
      dp[0] = i;
      for (let j = 1; j <= bl; j++) {
        const tmp = dp[j];
        dp[j] = a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, dp[j], dp[j - 1]);
        prev = tmp;
      }
    }
    return dp[bl];
  }

  /** methodNames Set から token に距離 ≤ 2 で最も近いものを返す（無ければ null）。
   * 効率のため長さ差 > 2 のものは枝刈り。 */
  function closestMethod(token, methodNames) {
    if (!token) return null;
    // ★djsローカル修正（2026-06-30）: 1文字トークンには typo サジェストを出さない。
    // 1文字は変数名・値（例 代入「＝」抜けの `数 (…)` で命令扱いされた変数 `数`）であることが多く、
    // 距離1で別語に化けやすい（`数`→`乱数` 等）。1文字メソッド(値/色/円…)の typo は推定の信頼度が低いため出さない。
    if ([...token].length <= 1) return null;
    let best = null, bestD = 3;
    for (const name of methodNames) {
      if (Math.abs(name.length - token.length) > 2) continue;
      const d = levenshtein(token, name);
      if (d < bestD) { best = name; bestD = d; }
      if (bestD === 0) break;
    }
    return best;
  }

  // ============================================================
  // classify 本体
  // ============================================================

  // NOTE: ドリトルは英字/数字/記号の全角/半角を区別しない。「100歩」のような
  // 数値+単位語直結も構文上 OK。よって UNIT_AFTER_NUMBER / FULLWIDTH_QUOTE /
  // HALFWIDTH_PAREN / HALFWIDTH_PUNCT / STRAY_COMMA はカテゴリから除外。

  /** カテゴリと学習者向けメッセージ */
  const CATEGORY_MESSAGES = {
    EMPTY_PROGRAM:       "プログラムが空、またはコメントのみです。命令を書いてみましょう。",
    UNCLOSED_STRING:     '文字列 " が閉じていません。"...." の形で閉じてください。',
    UNCLOSED_BLOCK:      "ブロック「 」のかっこの数が合っていません。",
    UNCLOSED_PAREN:      "丸括弧 ( ) （ ） の数が合っていません。",
    PERIOD_MISSING:      "行の終わりに「。」が必要です。",
    EXTRA_PERIOD:        "文の途中に「。」が紛れ込んでいます。",
    DOUBLE_PERIOD:       "「。」または「.」が連続しています。1つだけにしてください。",
    DOUBLE_BANG:         "「！」または「!」が連続しています。1つだけにしてください。",
    MISSING_BANG:        "オブジェクトに命令する記号「！」が抜けているようです。",
    UNKNOWN_METHOD:      "登録されていないメソッド名です。",
    INVALID_ASSIGNMENT:  "システムが用意した名前（赤・タートル等）を別の値で上書きできません。",
    UNSUPPORTED_OP:      "この演算子はドリトルでは使えません。",
    ESCAPE_SEQ:          "文字列内の \\n や \\t は使えません。",
    // ★djsローカル追加（2026-06-30）: 詰まり位置(maxPos)ベースの具体メッセージ（文言はV4流用）
    NO_VALUE:            "代入の右辺（値）がありません。「＝」の後に値を書きます。",
    NO_OPERAND:          "演算子の後に値がありません。例「10 ＋ 20」のように両側に値を書きます。",
    NO_LEFT_OPERAND:     "演算子の前に値がありません。例「10 ＋ 20」のように両側に値を書きます。",
    NO_METHOD:           "「！」の後に命令（メソッド）がありません。例「かめた！歩く」のように命令を書きます。",
    NO_LHS:              "代入の「＝」の前に変数名がありません。「変数 ＝ 値。」の形にします。",
    NO_OPERATOR:         "値が続いています。間に演算子（＊＋−／など）が抜けていないか確認してください。例「数 ＊ 2」。",
    // ★djsローカル追加（2026-07-04）: ブロック直後に値／数字＋命令のくっつき
    VALUE_AFTER_BLOCK:   "ブロック「…」の直後に値が続いています。ブロックを繰り返すときは「！」と回数をこの順で書きます" +
                         "（例「…」！4 繰り返す）。「！」の抜けや「4！」のような順序の誤りを確認してください。",
    NUMBER_GLUED_METHOD: "数字と命令がくっついています。間にスペースを空けて分けて書いてください（例「90 左回り」）。",
    BAD_PROPERTY:        "プロパティの「:」の後に名前がありません。「オブジェクト:なまえ＝値」の形にします。「:」が続いていないか、名前が抜けていないか確認してください。",
    DANGLING_VALUE:      "値が命令や式につながっていません。命令には「！」、計算には演算子、文の区切りには「。」が必要です（命令の引数は命令の前、例「100 歩く」）。",
    PARSE_OK_BUT_LOGGED: "構文は正しいです。実行時エラーの可能性があります。",
    OTHER:               "原因を特定できませんでした。マニュアルを確認してください。",
  };

  // ★djsローカル追加（2026-06-30）: パーサが詰まった位置(maxPos)から具体カテゴリを推定。
  // V4 `error-message-mapping.md` のトークンベース判別を、djsの maxPos（最も進んだ位置＝詰まった所）で再現する。
  const STUCK_OPERATOR_CHARS = "＋+－-ー＊*×／/÷％%";
  const STUCK_ASSIGN_CHARS = "＝=";
  const STUCK_VALUE_END = "。．｡」)）."; // 値が来るべき位置がこれら/EOFなら「値なし」とみなす（. は半角ピリオド終端）
  function isOperandChar(ch) {
    if (!ch) return false;
    if (/[0-9０-９A-Za-z_]/.test(ch)) return true;
    const c = ch.codePointAt(0);
    // ひらがな/カタカナ/CJK/長音/々（記号・括弧・句読点は含めない）
    return (c >= 0x3040 && c <= 0x30ff) || (c >= 0x4e00 && c <= 0x9fff) || ch === "ー" || ch === "々";
  }
  /** 詰まり位置の文字と直前の非空白文字から具体カテゴリ名を返す（該当なし→null）。
   *  src と同じ長さの stripped code 上で判定する（文字列内を避ける）。 */
  function analyzeStuckPoint(src, pos) {
    if (typeof pos !== "number" || pos < 0 || pos > src.length) return null;
    const code = stripStringsAndComments(src).codeOnly;
    const atChar = pos < code.length ? code[pos] : ""; // EOF は ""
    let q = pos - 1;
    while (q >= 0 && /\s/.test(code[q])) q--;
    const prev = q >= 0 ? code[q] : "";
    const valueEmpty = atChar === "" || STUCK_VALUE_END.indexOf(atChar) !== -1;
    // プロパティ `:` の直後に名前が無い（`obj::` `obj:＝` `obj:1名`）＝プロパティ名の誤り（djsローカル追加 2026-07-04）
    // 正しくは `オブジェクト:なまえ＝値`。コロン直後が別のコロン/代入記号/数字/文末なら名前抜け。
    if (prev === ":" || prev === "：") {
      if (atChar === ":" || atChar === "：" || STUCK_ASSIGN_CHARS.indexOf(atChar) !== -1 ||
          /[0-9０-９]/.test(atChar) || valueEmpty) return "BAD_PROPERTY";
    }
    // 詰まり位置が演算子で、その前に値（左オペランド）が無い（例 `( ＊ 2)` `＝ ＊ 2`）
    var NO_LEFT_PREV = "(（＝=！!。．｡「、:：";
    if (STUCK_OPERATOR_CHARS.indexOf(atChar) !== -1) {
      if (prev === "" || NO_LEFT_PREV.indexOf(prev) !== -1) return "NO_LEFT_OPERAND";
    }
    // 詰まり位置が ＝ で、その前に変数（左辺）が無い（文頭/文末直後/！/ブロック・括弧の開き直後）
    if (STUCK_ASSIGN_CHARS.indexOf(atChar) !== -1) {
      if (prev === "" || STUCK_VALUE_END.indexOf(prev) !== -1 || prev === "！" || prev === "!" ||
          prev === "「" || prev === "(" || prev === "（") return "NO_LHS";
    }
    // 演算子の直後に ！（値でなく命令記号）が来る（`りんご-！100`）＝演算子の後に値がない（djsローカル追加 2026-07-04）
    if ((atChar === "！" || atChar === "!") && STUCK_OPERATOR_CHARS.indexOf(prev) !== -1) return "NO_OPERAND";
    if (valueEmpty) {
      if (STUCK_ASSIGN_CHARS.indexOf(prev) !== -1) return "NO_VALUE";
      if (STUCK_OPERATOR_CHARS.indexOf(prev) !== -1) return "NO_OPERAND";
      if (prev === "！" || prev === "!") return "NO_METHOD";
      // 値(オペランド)の直後が文末/閉じ＝宙に浮いた値（命令や式につながらない）（djsローカル追加 2026-07-04）
      if (isOperandChar(prev)) return "DANGLING_VALUE";
    }
    // 詰まり位置が値(オペランド)で、直前が 」（ブロック閉じ）＝ ブロック直後に値が続く
    // （！の抜け／`」4！` のような順序誤り。djsローカル追加 2026-07-04）
    if (isOperandChar(atChar) && prev === "」") return "VALUE_AFTER_BLOCK";
    // 値が2つ連続（間に演算子なし）＝ 演算子抜け（例 `数 2`）
    if (isOperandChar(atChar) && isOperandChar(prev)) return "NO_OPERATOR";
    return null;
  }

  // ★djsローカル追加（2026-07-04）: `90左回り` のような「数字＋命令のくっつき」検出。
  // reg_num（minimal.js）が「数字＋末尾識別子」を1トークンとして食うため、`かめた！90左回り` は
  // 命令が無い状態になり失敗する（詰まり位置は末尾の 」等にズレ、原因が伝わらない）。
  // 末尾語が登録メソッドのときだけ拾い、スペース挿入を促す。methodNames が無ければ null（＝従来OTHERへ退避）。
  // classify（パース失敗時のみ呼ばれる）内で使うため、成功する正常プログラムには一切干渉しない。
  function detectNumberGluedToMethod(src, methodNames) {
    if (!methodNames || methodNames.size === 0) return null;
    const code = stripStringsAndComments(src).codeOnly;
    const re = /[0-9０-９]+([ぁ-んァ-ヶ一-龥ー々a-zA-Z_]+)/g;
    let m;
    while ((m = re.exec(code)) !== null) {
      const word = m[1];
      if (methodNames.has(word)) {
        return { num: m[0].slice(0, m[0].length - word.length), word: word, offset: m.index };
      }
    }
    return null;
  }
  // ★djsローカル追加（2026-07-04）: `！＝＝` `！＊` のように「！の直後が（単項でない）演算子」＝命令名が無い。
  // 正号/負号 ＋－ は負数リテラルになり得るため除外（`！-100` は正当）。！の位置(offset)を返す。
  function detectBangThenOperator(src) {
    const code = stripStringsAndComments(src).codeOnly;
    const m = /[!！][\s　]*[=＝＊*×／/÷％%＞＜<>]/.exec(code);
    return m ? m.index : -1;
  }
  /** OTHER 用: 詰まり位置のトークンと該当行を示す実用的メッセージ。 */
  function buildOtherMessage(src, pos) {
    const tips = "よくある原因: 演算子（＊＋−／）の抜け・「！」の付け方・かっこ「」（）の対応・全角/半角の混在を確認してください。";
    if (typeof pos !== "number" || pos < 0) return "プログラムの書き方を読み取れませんでした。" + tips;
    const code = stripStringsAndComments(src).codeOnly;
    const tok = (pos < code.length ? code[pos] || "" : "").trim();
    const lineNo = offsetToLine(src, Math.min(pos, Math.max(0, src.length - 1)));
    let line = lineAt(src, lineNo).trim();
    if (line.length > 60) line = line.slice(0, 60) + "…";
    const where = tok ? `「${tok}」のあたりで` : "この付近で";
    return `${where}書き方を読み取れませんでした。${tips}` + (line ? `\n（${lineNo}行目: ${line}）` : "");
  }

  /**
   * 1 ソースを分類
   * @param {Object} rec - { srcText, pos?, checkerOk?, checkerLine?, checkerMessage? }
   * @param {Set<string>} methodNames - 既知メソッド名集合
   * @returns {Object} { category, subdetail, userMessage, lineNo }
   */
  function classify(rec, methodNames) {
    const src = rec.srcText || "";
    const pos = rec.pos;
    const chkOk = rec.checkerOk;
    const chkLine = rec.checkerLine;

    const result = (category, subdetail = "") => {
      const lineNo = (typeof chkLine === "number" && chkLine > 0)
        ? chkLine
        : offsetToLine(src, typeof pos === "number" ? pos : 0);
      let userMessage = CATEGORY_MESSAGES[category] || category;
      if (category === "UNKNOWN_METHOD" && subdetail) {
        const [token, target] = subdetail.split("->");
        if (target && target !== "NONE") {
          userMessage += ` もしかして「${target}」のことですか？`;
        } else if (token) {
          userMessage = `メソッド「${token}」は登録されていません。`;
        }
      }
      if (category === "UNCLOSED_BLOCK" && subdetail) {
        const diff = parseInt(subdetail);
        if (diff > 0) userMessage = `ブロック「が ${diff} 個多く、「」が足りません。`;
        else if (diff < 0) userMessage = `ブロック」が ${-diff} 個多く、「が足りません。`;
      }
      if (category === "UNSUPPORTED_OP" && subdetail) {
        userMessage = `この演算子「${subdetail}」はドリトルでは使えません。「かつ」「または」など別の書き方をします。`;
      }
      return { category, subdetail, userMessage, lineNo };
    };

    // 1. 再判定で OK
    if (chkOk) return result("PARSE_OK_BUT_LOGGED");

    // 2. 空プログラム
    const stripped = src.trim();
    const regions = stripStringsAndComments(src);
    const codeOnlyStripped = regions.codeOnly.trim();
    if (!stripped || !codeOnlyStripped) return result("EMPTY_PROGRAM");

    // 3. 文字列の閉じ忘れ
    if (regions.stringUnclosed) return result("UNCLOSED_STRING");

    const code = regions.codeOnly;
    const br = countBrackets(code);

    // 4. ブロック「 」の不一致
    const blockDiff = br.blockOpen - br.blockClose;
    if (blockDiff !== 0) {
      return result("UNCLOSED_BLOCK", (blockDiff > 0 ? "+" : "") + blockDiff);
    }

    // 5. 丸括弧の不一致（全角・半角を区別せず合算）
    const parenDiff = (br.fparOpen + br.hparOpen) - (br.fparClose + br.hparClose);
    if (parenDiff !== 0) {
      return result("UNCLOSED_PAREN", (parenDiff > 0 ? "+" : "") + parenDiff);
    }

    // 6. !! 二重
    if (hasDoubleBang(code)) return result("DOUBLE_BANG");

    // 7. 「。。」「..」
    if (hasDoublePeriod(code)) return result("DOUBLE_PERIOD");

    // 8. 未対応演算子
    const op = findUnsupportedOp(code);
    if (op) return result("UNSUPPORTED_OP", op);

    // 9. エスケープシーケンス
    if (hasEscapeSeqInStrings(src)) return result("ESCAPE_SEQ");

    const errLineNo = (typeof chkLine === "number" && chkLine > 0)
      ? chkLine
      : offsetToLine(src, typeof pos === "number" ? pos : 0);
    const targetLine = lineAt(src, errLineNo);
    const prevLine = errLineNo > 1 ? lineAt(src, errLineNo - 1) : "";

    // 10. EXTRA_PERIOD（全行スキャン）
    // 「…」ブロック内部の「。」は文の区切りで正当なため、マスクしてから判定する（誤検出防止）。
    const srcLines = src.split("\n");
    const maskedLines = maskBlocksForExtraPeriod(src).split("\n");
    for (let ln = 0; ln < maskedLines.length; ln++) {
      if (hasExtraPeriodInLine(maskedLines[ln])) {
        return result("EXTRA_PERIOD", `line${ln + 1}`);
      }
    }

    // 11. ! 欠落（全行スキャン）
    // 11a. `自分(...)`（self の後の「！」抜け）= 確実な誤り。ブロック内でも拾える（行ベース判定の死角を補う）。
    const selfLine = selfMissingBangLine(src);
    if (selfLine != null) {
      const r = result("MISSING_BANG", `self_paren`);
      r.lineNo = selfLine;
      return r;
    }
    // 11b. 行ベースの一般判定（識別子連続・!/:/数字なし）
    for (let ln = 0; ln < srcLines.length; ln++) {
      if (looksLikeMissingBang(srcLines[ln])) {
        return result("MISSING_BANG", `line${ln + 1}`);
      }
    }

    // 11d. `)自分`（閉じ括弧の直後に self）= 文の区切り「。」抜けの確実な誤り（ブロック内でも検出）。
    const selfPeriodLine = selfAfterCloseParenLine(src);
    if (selfPeriodLine != null) {
      const r = result("PERIOD_MISSING", "self_after_paren");
      r.lineNo = selfPeriodLine;
      r.userMessage = "文の区切りに「。」が抜けています。前の文の終わりに「。」を付けてください。";
      return r;
    }

    // 12. 文末「。」抜け（エラー行付近のみ。全行スキャンは false positive が多い）
    if (lineLacksTerminator(prevLine) && prevLine.trim()) {
      const r = result("PERIOD_MISSING", "prev_line");
      if (r.lineNo > 1) r.lineNo -= 1;   // 欠落は前の行（djsローカル修正 2026-06-30）
      return r;
    }
    if (lineLacksTerminator(targetLine) && targetLine.trim()) {
      return result("PERIOD_MISSING", "this_line");
    }

    // 12. システム変数代入
    let resAssign = firstReservedAssign(targetLine) || firstReservedAssign(prevLine);
    if (resAssign) return result("INVALID_ASSIGNMENT", resAssign);

    // 13. 未知メソッド名
    if (methodNames && methodNames.size > 0) {
      const calls = extractMethodCalls(code);
      for (const name of calls) {
        if (!methodNames.has(name)) {
          const near = closestMethod(name, methodNames);
          return result("UNKNOWN_METHOD", `${name}->${near || "NONE"}`);
        }
      }
    }

    // 13.4 数字＋命令のくっつき（例 `90左回り`）＝ 間にスペースが必要（djsローカル追加 2026-07-04）
    //      非常に限定的（数字＋登録メソッド）で確度が高いため、汎用的な maxPos 判定より先に見る。
    const glued = detectNumberGluedToMethod(src, methodNames);
    if (glued) {
      return {
        category: "NUMBER_GLUED_METHOD",
        subdetail: glued.num + glued.word,
        userMessage: `数字「${glued.num}」と命令「${glued.word}」がくっついています。` +
          `間にスペースを空けて「${glued.num} ${glued.word}」のように分けて書いてください。`,
        lineNo: offsetToLine(src, glued.offset),
      };
    }

    // 13.5 詰まり位置(maxPos)ベースの具体判定（NO_VALUE/NO_OPERAND/NO_METHOD/NO_LHS/NO_OPERATOR/DANGLING_VALUE 等）
    //      既存カテゴリで拾えなかったものを、パーサが詰まった位置から具体化する（djsローカル追加 2026-06-30）。
    const stuckCat = analyzeStuckPoint(src, typeof pos === "number" ? pos : null);
    if (stuckCat) {
      const r = result(stuckCat);
      r.lineNo = offsetToLine(src, Math.min(pos, Math.max(0, src.length - 1)));
      return r;
    }

    // 14. 文構造ベース: 「＝も！も無い (3)値文（関数末尾以外）」= ＝/！抜けの可能性（djsローカル追加 2026-06-30）
    const vs = precheckStatementStructure(src);
    if (vs) return vs;

    // 14.6 ！の直後が演算子（`！＝＝` 等）＝ 命令名が無い（djsローカル追加 2026-07-04）
    const botOff = detectBangThenOperator(src);
    if (botOff >= 0) {
      const r = result("NO_METHOD");
      r.lineNo = offsetToLine(src, botOff);
      return r;
    }

    // 15. OTHER（詰まり位置＋実用的チェックリスト。AI相談に依存しない自立メッセージ）
    const other = result("OTHER");
    other.userMessage = buildOtherMessage(src, typeof pos === "number" ? pos : null);
    return other;
  }

  // ★djsローカル追加（2026-06-30）: パースが throw しない「寛容な握り潰し」対策。
  // 手書きパーサは「」/"/() の不一致時に例外を出さず、途中までしか生成しないことがある
  // （例: ブロック「閉じ忘れ → 以降の行が黙って捨てられ、ハンドラが設定されず動かない）。
  // そこで実行前に **この3種の構造不一致だけ** をチェックして構文エラーとして表示する。
  // 正常プログラムは必ず「」/"/() がバランスするので **誤検出ゼロ**（句点抜け等の曖昧な判定は一切しない）。
  // 戻り値: 不一致あり → { category, subdetail:"precheck", userMessage, lineNo } / 無し → null
  function lastUnmatchedBlockLine(src) {
    const code = stripStringsAndComments(src).codeOnly;
    let depth = 0, openIdx = -1;
    for (let i = 0; i < code.length; i++) {
      if (code[i] === "「") { if (depth === 0) openIdx = i; depth++; }
      else if (code[i] === "」") { if (depth > 0) depth--; }
    }
    return (depth > 0 && openIdx >= 0) ? offsetToLine(src, openIdx) : null;
  }

  function precheckUnbalanced(src) {
    const text = src || "";
    const make = (category, lineNo, userMessage) => ({
      category, subdetail: "precheck",
      userMessage: userMessage || CATEGORY_MESSAGES[category] || category,
      lineNo: lineNo || 1,
    });

    const regions = stripStringsAndComments(text);
    // 1. 文字列の閉じ忘れ（直線/カーリーいずれの引用符でも）
    if (regions.stringUnclosed) {
      const idx = Math.max(text.lastIndexOf('"'), text.lastIndexOf("“"), text.lastIndexOf("”"));
      return make("UNCLOSED_STRING", idx >= 0 ? offsetToLine(text, idx) : 1);
    }
    const br = countBrackets(regions.codeOnly);
    // 2. ブロック「」の不一致
    const blockDiff = br.blockOpen - br.blockClose;
    if (blockDiff !== 0) {
      const msg = blockDiff > 0
        ? `ブロック「が ${blockDiff} 個多く、」が足りません。`
        : `ブロック」が ${-blockDiff} 個多く、「が足りません。`;
      const lineNo = (blockDiff > 0 ? lastUnmatchedBlockLine(text) : null) || offsetToLine(text, text.length - 1);
      return make("UNCLOSED_BLOCK", lineNo, msg);
    }
    // 3. 丸括弧の不一致（全角・半角を区別せず合算）
    const parenDiff = (br.fparOpen + br.hparOpen) - (br.fparClose + br.hparClose);
    if (parenDiff !== 0) {
      return make("UNCLOSED_PAREN", offsetToLine(text, text.length - 1));
    }
    return null;
  }

  // ============================================================
  // ★djsローカル追加（2026-06-30）: 文構造ベースの判定
  // ドリトルの文は (1)代入 `a=b` / (2)送信 `a！…b` / (3)値 `a`・`a(b)` の3種。
  // (3)は関数定義ブロックの末尾で値を返すときしか使われず、初心者コードでは
  // それ以外の位置に (3) が現れたら「＝(代入)か！(命令)が抜けている」可能性が高い。
  // 文全体の構造を見て、ブロック末尾でない複合 (3)（またはトップレベルの複合 (3)）を検出する。
  // 局所パターンより堅牢で、誤検出は examples 全件で 0（出荷条件）。
  // ============================================================
  function isDigitChar(ch) {
    return ch !== undefined && ((ch >= "0" && ch <= "9") || (ch >= "０" && ch <= "９"));
  }
  // 。｡ は常に文区切り。. ． は数字に挟まれていなければ文区切り（数字内は小数点なので区切らない）。
  function isStatementTerminatorAt(code, i) {
    const c = code[i];
    if (c === "。" || c === "｡") return true;
    if (c === "." || c === "．") return !(isDigitChar(code[i - 1]) && isDigitChar(code[i + 1]));
    return false;
  }
  // 入れ子の (…)（…） と 「…」 を空白でマスク（トップレベルの = / ！ だけを見るため）
  function maskNestedGroups(text) {
    let out = "", pd = 0, bd = 0;
    for (let k = 0; k < text.length; k++) {
      const ch = text[k];
      if (ch === "(" || ch === "（") { pd++; out += " "; }
      else if (ch === ")" || ch === "）") { if (pd > 0) pd--; out += " "; }
      else if (ch === "「") { bd++; out += " "; }
      else if (ch === "」") { if (bd > 0) bd--; out += " "; }
      else out += (pd > 0 || bd > 0) ? " " : ch;
    }
    return out;
  }
  // 比較演算子（＝/！を含む ＝＝ ！＝ ＞＝ ＜＝）を除去。これらの中の ＝/！ を
  // 代入・送信と誤認しないため、単独の ＝(代入)・！(送信) 判定の前に潰す。
  // （かめた！＝タートル作る のような「！が＝の前」型のタイプミスを (3)値文として拾えるようにする）
  function stripComparisonOps(m) {
    return m
      .replace(/[>＞<＜][=＝]/g, "  ")   // >= <=
      .replace(/[!！][=＝]/g, "  ")      // !=
      .replace(/[=＝][=＝]/g, "  ");     // ==
  }
  function statementType(text) {           // 1=代入, 2=送信, 3=値
    const m = stripComparisonOps(maskNestedGroups(text));
    if (/[=＝]/.test(m)) return 1;
    if (/[！!]/.test(m)) return 2;
    return 3;
  }
  // 「名前（…）」だけの文か（名前と括弧の間に空白なし・括弧は末尾で閉じる）
  const PROCEDURE_FUNCS = new Set(["乱数初期化", "乱数初期化する", "らんすうしょきか", "らんすうしょきかする", "setseed"]);
  function isSingleParenCall(t, names) {
    const mm = /^[^\s　（(）)「」=＝！!]+[（(]/.exec(t);
    if (!mm) return false;
    if (names && !names.has(mm[0].slice(0, -1).toLowerCase())) return false;
    let depth = 0;
    for (let k = mm[0].length - 1; k < t.length; k++) {
      const ch = t[k];
      if (ch === "(" || ch === "（") depth++;
      else if (ch === ")" || ch === "）") { depth--; if (depth === 0) return k === t.length - 1; }
    }
    return false;
  }
  // (3) のうち「怪しい」= 複合（空白区切りで複数トークン or ( を含む）。単一トークンの値返却は除外。
  function isCompoundValue(text) {
    // 比較演算子は二項演算（a ＝＝ b 等）＝複合値。演算子を境界(空白)化してから判定する。
    const m = stripComparisonOps(maskNestedGroups(text)).trim();
    // 値を返すためでなく実行のために書く関数形の文 `乱数初期化（5）。`（V4 の文法 term = ident paren）は正当＝除外。
    // `乱数（100）。` のように値を捨てる関数形は従来どおり怪しい (3) とする（名前で区別する）
    if (isSingleParenCall(text.trim(), PROCEDURE_FUNCS)) return false;
    return /\S[\s　]/.test(m) || /[（(]/.test(text);
  }

  /**
   * 文構造ベースの「怪しい (3) 値文」検出。「…」ブロックを再帰し、各文を type 判定。
   * ブロック末尾でない複合 (3)、またはトップレベルの複合 (3) を最初に1件返す。無ければ null。
   * パース成功/失敗いずれの src でも使える（字句スキャンのみ）。
   * @returns {null | {category:"VALUE_STMT", subdetail, userMessage, lineNo}}
   */
  function precheckStatementStructure(src) {
    const text = src || "";
    const code = stripStringsAndComments(text).codeOnly; // 長さ・改行保持＝オフセット不変
    let suspectOffset = -1, suspectWord = null;
    let i = 0;

    // 何もしない文（ブロックの外で名前・数・文字列だけ。`x。5。`）。V4 の NO_EFFECT_STATEMENT と同じ条件（2026-10-17）
    function noEffectWord(s) {
      if (/「/.test(s.text)) return null;
      const t = s.text.trim(), orig = text.slice(s.start, s.start + s.text.length).trim();
      if (/^[0-9０-９.．]+$/.test(t)) return orig;
      if (/^["“”『][^"“”』]*["“”』]$/.test(orig)) return orig;
      if (/^[\p{L}_][\p{L}\p{N}_?？]*$/u.test(t) && t !== "実行") return orig;
      return null;
    }
    function finalize(stmts, depth) {
      for (let k = 0; k < stmts.length && suspectOffset < 0; k++) {
        const s = stmts[k];
        if (statementType(s.text) !== 3) continue;
        if (depth === 0) { const w = noEffectWord(s); if (w) { suspectOffset = s.start; suspectWord = w; return; } }
        if (!isCompoundValue(s.text)) continue;
        // 関数末尾の値返却（ブロック内の最後の文）は正当なので除外
        if (depth > 0 && k === stmts.length - 1) continue;
        suspectOffset = s.start;
        return;
      }
    }
    function walkLevel(depth) {
      let start = i;
      const stmts = [];
      const flush = (end) => {
        const t = code.slice(start, end);
        if (t.trim() || text.slice(start, end).trim()) stmts.push({ start, text: t });   // 文字列だけの文（マスクで空白になる）も見る
        start = end + 1;
      };
      while (i < code.length) {
        const c = code[i];
        if (c === "「") { i++; walkLevel(depth + 1); continue; } // ブロックは現在文の一部（マスク対象）
        if (c === "」") { flush(i); i++; finalize(stmts, depth); return; }
        if (isStatementTerminatorAt(code, i)) { flush(i); i++; continue; }
        i++;
      }
      flush(code.length);
      finalize(stmts, depth);
    }
    walkLevel(0);

    if (suspectOffset < 0) return null;
    if (suspectWord !== null) {
      return {
        category: "VALUE_STMT",
        subdetail: "no_effect",
        userMessage: "【" + suspectWord + "】は何もしない文です。【＝】や【！】が抜けていたり、【。】になっていたりしないか見てください。",
        lineNo: offsetToLine(text, suspectOffset),
      };
    }
    return {
      category: "VALUE_STMT",
      subdetail: "value_stmt",
      userMessage:
        "この文には代入「＝」も命令送信「！」も見当たりません。" +
        "「＝」(代入)か「！」(命令)が抜けていないか確認してください。",
      lineNo: offsetToLine(text, suspectOffset),
    };
  }

  // ============================================================
  // 公開（djs はクラシック<script>のため window に載せる）
  // ============================================================
  global.DolittleClassify = {
    classify: classify,
    closestMethod: closestMethod,
    precheckUnbalanced: precheckUnbalanced,           // ★djsローカル追加（実行前の構造チェック）
    precheckStatementStructure: precheckStatementStructure, // ★djsローカル追加（文構造ベース判定）
    CATEGORY_MESSAGES: CATEGORY_MESSAGES,
    // 以下はテスト/デバッグ用に公開
    stripStringsAndComments: stripStringsAndComments,
    offsetToLine: offsetToLine,
  };
})(typeof window !== "undefined" ? window : this);
