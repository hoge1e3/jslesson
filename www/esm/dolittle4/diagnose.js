/* ドリトルV4 の文法の誤りの説明（オンライン版ドリトル djs V4.06 (2026/10/31)、211dbfb 2026-11-12）。tools/bitarrow_kit/build.mjs が djs の診断の部品を 1 つにまとめたもの。直接は編集しない */
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// js/lib/diagnose/dolittle_classify.js
var QUOTE_OPEN = '"”“『';
var QUOTE_CLOSE = '"”“』';
var LINE_COMMENT_RE = /^((?:[^"”“『/\n]|\/(?!\/)|["”“『][^"”“』\n]*(?:["”“』]|$))*)\/\/.*$/;
var HTML_VOID = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, source: 1, track: 1, wbr: 1 };
var HTML_RAW = { style: 1, script: 1, textarea: 1, title: 1 };
var HTML_OPEN = /^<([a-zA-Z][a-zA-Z0-9-]*)(?:\s+[^\s"'>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*\s*(\/?)>/;
var HTML_CLOSE = /^<\/([a-zA-Z][a-zA-Z0-9-]*)\s*>/;
function scanHtmlTag(str, pos) {
  let i = pos;
  const stack = [];
  let m, name;
  if (str.charAt(i) !== "<" || str.substr(i, 2) === "</" || str.substr(i, 4) === "<!--") return null;
  for (; ; ) {
    if (str.charAt(i) === "<") {
      if (str.substr(i, 2) === "</") {
        m = HTML_CLOSE.exec(str.substring(i));
        if (!m || !stack.length || m[1].toLowerCase() !== stack[stack.length - 1]) return null;
        stack.pop();
        i += m[0].length;
      } else if (str.substr(i, 4) === "<!--") {
        const ce = str.indexOf("-->", i + 4);
        if (ce < 0) return null;
        i = ce + 3;
      } else {
        m = HTML_OPEN.exec(str.substring(i));
        if (!m) return null;
        name = m[1].toLowerCase();
        i += m[0].length;
        if (m[2] !== "/" && !HTML_VOID[name]) {
          if (HTML_RAW[name]) {
            const ci = str.toLowerCase().indexOf("</" + name, i);
            if (ci < 0) return null;
            const gt = str.indexOf(">", ci);
            if (gt < 0) return null;
            i = gt + 1;
          } else stack.push(name);
        }
      }
      if (!stack.length) return { len: i - pos };
    } else {
      const lt = str.indexOf("<", i);
      if (lt < 0) return null;
      i = lt;
    }
  }
}
function stripStringsAndComments(text) {
  const out = [];
  let i = 0, n = text.length;
  let stringUnclosed = false;
  while (i < n) {
    const c = text[i];
    if (c === "<") {
      const tg = scanHtmlTag(text, i);
      if (tg) {
        out.push(text.slice(i, i + tg.len).replace(/[^\n]/g, " "));
        i += tg.len;
        continue;
      }
    }
    if (c === "/" && i + 1 < n && text[i + 1] === "/") {
      let j = i;
      while (j < n && text[j] !== "\n") j++;
      out.push(" ".repeat(j - i));
      i = j;
      continue;
    }
    if (QUOTE_OPEN.includes(c)) {
      let j = i + 1;
      while (j < n && !QUOTE_CLOSE.includes(text[j]) && text[j] !== "\n") j++;
      if (j < n && QUOTE_CLOSE.includes(text[j])) {
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
function countBrackets(code) {
  return {
    blockOpen: (code.match(/「/g) || []).length,
    blockClose: (code.match(/」/g) || []).length,
    fparOpen: (code.match(/（/g) || []).length,
    fparClose: (code.match(/）/g) || []).length,
    hparOpen: (code.match(/\(/g) || []).length,
    hparClose: (code.match(/\)/g) || []).length
  };
}
var UNSUPPORTED_OP_RE = /&&|\|\||(?<!\*)\*\*(?!\*)|<>|=<|=>/;
function findUnsupportedOp(code) {
  const m = code.match(UNSUPPORTED_OP_RE);
  return m ? m[0] : null;
}
function hasExtraPeriodInLine(line) {
  const s = line.replace(/\s+$/, "");
  if (s.length <= 1) return false;
  const lastChar = s[s.length - 1];
  const body = "。.．｡".includes(lastChar) ? s.slice(0, -1) : s;
  let depth = 0;
  for (const ch of body) {
    if (ch === "「") depth++;
    else if (ch === "」") depth = Math.max(0, depth - 1);
    else if (depth === 0 && "。．｡".includes(ch)) return true;
  }
  return false;
}
function hasDoubleBang(code) {
  return code.includes("！！") || code.includes("!!");
}
var DOUBLE_PERIOD_RE = /[。．.｡]{2,}/;
function hasDoublePeriod(code) {
  return DOUBLE_PERIOD_RE.test(code);
}
var TERMINATORS_TRAIL_RE = /[。．.｡]\s*$/;
var IDENT_RE = /^[぀-ヿ一-鿿_A-Za-z][぀-ヿ一-鿿_A-Za-z0-9]*$/;
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
  const tokens = rhs.split(/\s+/).filter((t) => t);
  if (tokens.length < 2) return false;
  const identCount = tokens.filter((t) => IDENT_RE.test(t)).length;
  return identCount >= 2;
}
var ESC_SEQ_RE = /\\[ntr]/;
function hasEscapeSeqInStrings(text) {
  let i = 0, n = text.length;
  while (i < n) {
    const c = text[i];
    if (c === "/" && i + 1 < n && text[i + 1] === "/") {
      while (i < n && text[i] !== "\n") i++;
      continue;
    }
    if (QUOTE_OPEN.includes(c)) {
      let j = i + 1;
      while (j < n && !QUOTE_CLOSE.includes(text[j]) && text[j] !== "\n") j++;
      const literal = text.slice(i + 1, j);
      if (ESC_SEQ_RE.test(literal)) return true;
      i = j < n && QUOTE_CLOSE.includes(text[j]) ? j + 1 : j;
      continue;
    }
    i++;
  }
  return false;
}
var METHOD_CALL_RE = /[！!]\s*([぀-ヿ一-鿿_A-Za-z][぀-ヿ一-鿿_A-Za-z0-9]*)/g;
function extractMethodCalls(code) {
  const calls = [];
  let m;
  METHOD_CALL_RE.lastIndex = 0;
  while ((m = METHOD_CALL_RE.exec(code)) !== null) {
    calls.push(m[1]);
  }
  return calls;
}
function findBangWithoutMethod(code) {
  let start = 0;
  for (let i = 0; i < code.length; i++) {
    if ("。.．｡".includes(code[i])) {
      const body = code.slice(start, i).replace(/[ \t　\r\n]+$/, "");
      if (body.endsWith("！") || body.endsWith("!")) {
        return code.slice(0, i).split("\n").length;
      }
      start = i + 1;
    }
  }
  return 0;
}
var REPEAT_AFTER_BLOCK_RE = /^\s*[！!]\s*[0-9０-９]+\s*繰り返す/;
function findObjectOutsideRepeatBlock(code) {
  const n = code.length;
  for (let i = 0; i < n; i++) {
    if (code[i] !== "「") continue;
    let j = i - 1;
    while (j >= 0 && /[ \t　]/.test(code[j])) j--;
    if (j < 0 || code[j] !== "！" && code[j] !== "!") continue;
    let depth = 0, k = i;
    for (; k < n; k++) {
      if (code[k] === "「") depth++;
      else if (code[k] === "」") {
        depth--;
        if (depth === 0) break;
      }
    }
    if (k >= n) continue;
    if (REPEAT_AFTER_BLOCK_RE.test(code.slice(k + 1))) {
      return code.slice(0, i).split("\n").length;
    }
  }
  return 0;
}
var RESERVED_LHS = /* @__PURE__ */ new Set([
  "赤",
  "青",
  "緑",
  "黄",
  "白",
  "黒",
  "紫",
  "桃",
  "橙",
  "茶",
  "灰",
  "タートル",
  "ボタン",
  "ラベル",
  "テキスト",
  "図形",
  "選択メニュー",
  "スライダー",
  "イメージ",
  "リスナー",
  "タイマー",
  "ストップウォッチ",
  "配列",
  "色",
  "音",
  "サウンド",
  "テーブル",
  "通信",
  "音声合成",
  "画面"
]);
var RESERVED_ASSIGN_RE = /^\s*([぀-ヿ一-鿿_A-Za-z][぀-ヿ一-鿿_A-Za-z0-9]*)\s*[=＝]/;
function firstReservedAssign(line) {
  const m = line.match(RESERVED_ASSIGN_RE);
  if (!m) return null;
  return RESERVED_LHS.has(m[1]) ? m[1] : null;
}
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
var TERMINATORS = "。.．｡";
function lineLacksTerminator(line) {
  const s = line.replace(/\s+$/, "");
  if (!s) return false;
  if (/[「|｜]$/.test(s)) return false;
  return !TERMINATORS.includes(s[s.length - 1]);
}
function looksLikeUnterminatedStatement(seg, names2) {
  let depth = 0, sawBang = false, i = 0;
  const isIdent = (ch) => /[぀-ヿ一-鿿A-Za-z_0-9０-９？]/.test(ch);
  while (i < seg.length) {
    const ch = seg[i];
    if ("「(（".includes(ch)) {
      depth++;
      i++;
      continue;
    }
    if ("」)）".includes(ch)) {
      depth = Math.max(0, depth - 1);
      i++;
      continue;
    }
    if (depth === 0 && (ch === "！" || ch === "!")) {
      sawBang = true;
      i++;
      continue;
    }
    if (depth === 0 && sawBang && /\s/.test(ch)) {
      let j = i;
      while (j < seg.length && /\s/.test(seg[j])) j++;
      let k = j;
      while (k < seg.length && isIdent(seg[k])) k++;
      if (k > j && names2) {
        let b = i;
        while (b > 0 && isIdent(seg[b - 1])) b--;
        const last = seg.slice(b, i);
        if (!last || !names2.has(last)) {
          i = k;
          continue;
        }
      }
      if (k > j) {
        let m = k;
        while (m < seg.length && /[ \t　]/.test(seg[m])) m++;
        const nx = seg[m] || "", nx2 = seg[m + 1] || "";
        if ((nx === "＝" || nx === "=") && !(nx2 === "＝" || nx2 === "=")) return true;
        if (nx === "！" || nx === "!") return true;
      }
      i = Math.max(j, i + 1);
      continue;
    }
    i++;
  }
  return false;
}
function statementsOf(codeOnlyLine) {
  const out = [];
  let cur = "", depth = 0;
  for (const ch of codeOnlyLine) {
    if (ch === "「") depth++;
    else if (ch === "」") depth = Math.max(0, depth - 1);
    if (depth === 0 && "。．.｡".includes(ch)) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out.filter((t) => t.trim());
}
function findUnclosedParamBar(codeOnly) {
  const lines = codeOnly.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const n = (lines[i].match(/[|｜]/g) || []).length;
    if (n % 2 === 1) return i + 1;
  }
  return 0;
}
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
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[bl];
}
function closestMethod(token, methodNames2) {
  if (!token) return null;
  let best = null, bestD = 3;
  for (const name of methodNames2) {
    if (Math.abs(name.length - token.length) > 2) continue;
    const d = levenshtein(token, name);
    if (d < bestD) {
      best = name;
      bestD = d;
    }
    if (bestD === 0) break;
  }
  return best;
}
var CATEGORY_MESSAGES = {
  EMPTY_PROGRAM: "プログラムが空、またはコメントのみです。命令を書いてみましょう。",
  UNCLOSED_STRING: '文字列 " が閉じていません。"...." の形で閉じてください。',
  UNCLOSED_BLOCK: "ブロック【「 」】のかっこの数が合っていません。",
  UNCLOSED_PAREN: "丸括弧 ( ) （ ） の数が合っていません。",
  UNCLOSED_PARAM: "ブロックの引数【|相手|】の【|】が閉じていません。【|】で始めて【|】で閉じます。",
  NO_LHS: "代入の【＝】の前に変数名がありません。【変数 ＝ 値。】の形にします。",
  NO_VALUE: "代入の右辺（値）がありません。【＝】の後に値を書きます。",
  NO_OPERAND: "演算子の後に値がありません。例【10 ＋ 20】のように両側に値を書きます。",
  NO_LEFT_OPERAND: "演算子の前に値がありません。例【10 ＋ 20】のように両側に値を書きます。",
  PERIOD_MISSING: "行の終わりに【。】が必要です。",
  PERIOD_BETWEEN: "文と文の間に【。】が必要です。1つの行に2つの文を書くときも、【。】で区切ります。",
  // dolittle_repair.js の REPAIR_MESSAGES と同文
  EXTRA_PERIOD: "文の途中に【。】が紛れ込んでいます。",
  DOUBLE_PERIOD: "【。】または【.】が連続しています。1つだけにしてください。",
  DOUBLE_BANG: "【！】または【!】が連続しています。1つだけにしてください。",
  MISSING_BANG: "オブジェクトに命令する記号【！】が抜けているようです。",
  OBJECT_OUTSIDE_BLOCK: "繰り返したい命令は、オブジェクトの名前ごと【「 」】の中に書きます。",
  BANG_WITHOUT_METHOD: "【！】の後に、何をするかの命令の名前が書かれていません。",
  UNKNOWN_METHOD: "登録されていないメソッド名です。",
  INVALID_ASSIGNMENT: "システムが用意した名前（赤・タートル等）を別の値で上書きできません。",
  UNSUPPORTED_OP: "この演算子はドリトルでは使えません。",
  ESCAPE_SEQ: "文字列内の \\n や \\t は使えません。",
  PARSE_OK_BUT_LOGGED: "構文は正しいです。実行時エラーの可能性があります。",
  OTHER: "原因を特定できませんでした。マニュアルを確認してください。"
};
function classify(rec, methodNames2) {
  const src = String(rec.srcText || "").replace(/\r\n?/g, "\n");
  const pos = rec.pos;
  const chkOk = rec.checkerOk;
  const chkLine = rec.checkerLine;
  const result = (category, subdetail = "") => {
    const lineNo = typeof chkLine === "number" && chkLine > 0 ? chkLine : offsetToLine(src, typeof pos === "number" ? pos : 0);
    let userMessage = CATEGORY_MESSAGES[category] || category;
    if (category === "UNKNOWN_METHOD" && subdetail) {
      const [token, target] = subdetail.split("->");
      if (target && target !== "NONE") {
        userMessage = `命令【${token}】は登録されていません。もしかして【${target}】のことですか？`;
      } else if (token) {
        userMessage = `命令【${token}】は登録されていません。`;
      }
    }
    if (category === "UNCLOSED_BLOCK" && subdetail) {
      const diff = parseInt(subdetail);
      if (diff > 0) userMessage = `ブロック【「】が ${diff} 個多く、【」】が足りません。`;
      else if (diff < 0) userMessage = `ブロック【」】が ${-diff} 個多く、【「】が足りません。`;
    }
    return { category, subdetail, userMessage, lineNo };
  };
  if (chkOk) return result("PARSE_OK_BUT_LOGGED");
  const stripped = src.trim();
  const regions = stripStringsAndComments(src);
  const codeOnlyStripped = regions.codeOnly.trim();
  if (!stripped || !codeOnlyStripped) return result("EMPTY_PROGRAM");
  if (regions.stringUnclosed) {
    const ls = src.split("\n"), pl = typeof pos === "number" && pos >= 0 ? offsetToLine(src, pos) : null;
    const odd = (ln2) => ((ls[ln2 - 1] || "").replace(LINE_COMMENT_RE, "$1").match(/["“”『』]/g) || []).length % 2 === 1;
    const order = pl ? [pl, pl - 1, ...ls.map((_, i) => i + 1)] : ls.map((_, i) => i + 1);
    const ln = order.find((x) => x >= 1 && x <= ls.length && odd(x));
    return result("UNCLOSED_STRING", ln ? `line${ln}` : "");
  }
  const code = regions.codeOnly;
  const br = countBrackets(code);
  const blockDiff = br.blockOpen - br.blockClose;
  if (blockDiff !== 0) {
    return result("UNCLOSED_BLOCK", (blockDiff > 0 ? "+" : "") + blockDiff);
  }
  const parenDiff = br.fparOpen + br.hparOpen - (br.fparClose + br.hparClose);
  if (parenDiff !== 0) {
    return result("UNCLOSED_PAREN", (parenDiff > 0 ? "+" : "") + parenDiff);
  }
  const op = findUnsupportedOp(code);
  if (op) return result("UNSUPPORTED_OP", op);
  if (hasEscapeSeqInStrings(src)) return result("ESCAPE_SEQ");
  const srcLines = src.split("\n");
  const hasChkLine = typeof chkLine === "number" && chkLine > 0;
  const errLineNo = hasChkLine ? chkLine : offsetToLine(src, typeof pos === "number" ? pos : 0);
  const targetLine = lineAt(src, errLineNo);
  const prevLine = errLineNo > 1 ? lineAt(src, errLineNo - 1) : "";
  let stmtLine = chkLine;
  if (hasChkLine && typeof pos === "number" && pos >= 0) {
    let k = pos - 1;
    while (k >= 0 && !"。．｡".includes(src[k])) k--;
    stmtLine = Math.max(chkLine - 3, offsetToLine(src, k + 1));
  }
  const near = (ln) => !hasChkLine || ln >= Math.min(stmtLine, chkLine - 1) && ln <= chkLine + 1;
  const window = [];
  for (let ln = 1; ln <= srcLines.length; ln++) if (near(ln)) window.push(ln);
  const codeLine = (ln) => stripStringsAndComments(srcLines[ln - 1]).codeOnly;
  const maskedLine = (ln) => srcLines[ln - 1].replace(/["”“『][^"”“』\n]*["”“』]/g, '"S"').replace(LINE_COMMENT_RE, "$1");
  const posLine = typeof pos === "number" && pos >= 0 ? offsetToLine(src, pos) : null;
  for (const ln of posLine ? [posLine, ...window.filter((x) => x !== posLine)] : window) {
    const q = (srcLines[ln - 1].replace(LINE_COMMENT_RE, "$1").match(/["“”『』]/g) || []).length;
    if (q % 2 === 1) return result("UNCLOSED_STRING", `line${ln}`);
  }
  const rbLine = findObjectOutsideRepeatBlock(code);
  if (rbLine && near(rbLine)) return result("OBJECT_OUTSIDE_BLOCK", `line${rbLine}`);
  const bwLine = findBangWithoutMethod(code);
  if (bwLine && near(bwLine)) return result("BANG_WITHOUT_METHOD", `line${bwLine}`);
  const upLine = findUnclosedParamBar(code);
  if (upLine && near(upLine)) return result("UNCLOSED_PARAM", `line${upLine}`);
  for (const ln of window) if (hasDoubleBang(codeLine(ln))) return result("DOUBLE_BANG", `line${ln}`);
  for (const ln of window) if (hasDoublePeriod(codeLine(ln))) return result("DOUBLE_PERIOD", `line${ln}`);
  for (const ln of window) {
    for (const st of statementsOf(maskedLine(ln))) {
      const t = st.trim();
      if (/^[=＝](?![=＝])/.test(t)) return result("NO_LHS", `line${ln}`);
      if (/[=＝]$/.test(t) && !/[=＝!！<>＜＞]\s*[=＝]$/.test(t)) return result("NO_VALUE", `line${ln}`);
      if (/[+*/＋＊／×÷−-]$/.test(t) || /[+*/＋＊／×÷−-]\s*[)）]/.test(t)) return result("NO_OPERAND", `line${ln}`);
      if (/[=＝(（]\s*[+*/＋＊／×÷]/.test(t)) return result("NO_LEFT_OPERAND", `line${ln}`);
    }
  }
  if (posLine) {
    const upto = maskedLine(posLine).slice(0, pos - (src.split("\n").slice(0, posLine - 1).join("\n").length + (posLine > 1 ? 1 : 0)) + 2);
    const segs = statementsOf(upto);
    const seg = segs.length ? segs[segs.length - 1] : "";
    if (looksLikeUnterminatedStatement(seg, methodNames2)) return result("PERIOD_BETWEEN", `line${posLine}`);
  }
  if (typeof pos === "number" && pos >= 0) {
    let q = pos;
    while (q > 0 && /[ \t　]/.test(src[q - 1])) q--;
    const atPeriod = pos < src.length && "。．.｡".includes(src[pos]);
    const restOfLine = src.slice(pos).split("\n")[0];
    const afterPeriod = q > 0 && "。．.｡".includes(src[q - 1]) && /\S/.test(restOfLine) && !/^[=＝]/.test(restOfLine);
    if (atPeriod || afterPeriod) return result("EXTRA_PERIOD", `line${offsetToLine(src, pos)}`);
  } else {
    if (hasChkLine && lineLacksTerminator(targetLine) && targetLine.trim()) return result("PERIOD_MISSING", `line${errLineNo}`);
    for (const ln of window) if (hasExtraPeriodInLine(codeLine(ln))) return result("EXTRA_PERIOD", `line${ln}`);
  }
  for (const ln of window) {
    if (/」\s*[0-9０-９]+\s*(回)?\s*繰り返す/.test(codeLine(ln))) return result("MISSING_BANG", `line${ln}`);
  }
  for (const ln of window) {
    for (const st of statementsOf(codeLine(ln))) {
      if (looksLikeMissingBang(st)) return result("MISSING_BANG", `line${ln}`);
    }
  }
  let prevNo = errLineNo - 1;
  while (prevNo >= 1 && (!codeLine(prevNo).trim() || /[「|｜]\s*$/.test(codeLine(prevNo)))) prevNo--;
  const prevCode = prevNo >= 1 ? srcLines[prevNo - 1] : "";
  if (prevNo >= 1 && lineLacksTerminator(prevCode) && prevCode.trim()) return result("PERIOD_MISSING", `line${prevNo}`);
  if (lineLacksTerminator(targetLine) && targetLine.trim()) return result("PERIOD_MISSING", `line${errLineNo}`);
  const resAssign = firstReservedAssign(targetLine) || firstReservedAssign(prevLine);
  if (resAssign) return result("INVALID_ASSIGNMENT", resAssign);
  if (methodNames2 && methodNames2.size > 0) {
    const scan = (lineNos) => {
      for (const ln of lineNos) {
        for (const name of extractMethodCalls(codeLine(ln))) {
          if (!methodNames2.has(name)) {
            const cand = closestMethod(name, methodNames2);
            return { ...result("UNKNOWN_METHOD", `${name}->${cand || "NONE"}`), lineNo: ln };
          }
        }
      }
      return null;
    };
    const r1 = scan(window);
    if (r1) return r1;
    const r2 = scan(srcLines.map((_, i) => i + 1));
    if (r2) return r2;
  }
  return result("OTHER");
}

// js/lib/diagnose/dolittle_lint.js
var QUOTE_OPEN2 = '"”“『';
var QUOTE_CLOSE2 = '"”“』';
var COND_RE = /^[\s　]*[！!][\s　]*(ならば|なら|の間|まで)/;
var HTML_VOID2 = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, source: 1, track: 1, wbr: 1 };
var HTML_RAW2 = { style: 1, script: 1, textarea: 1, title: 1 };
var HTML_OPEN2 = /^<([a-zA-Z][a-zA-Z0-9-]*)(?:\s+[^\s"'>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*\s*(\/?)>/;
var HTML_CLOSE2 = /^<\/([a-zA-Z][a-zA-Z0-9-]*)\s*>/;
function scanHtmlTag2(str, pos) {
  let i = pos;
  const stack = [];
  let m, name;
  if (str.charAt(i) !== "<" || str.substr(i, 2) === "</" || str.substr(i, 4) === "<!--") return null;
  for (; ; ) {
    if (str.charAt(i) === "<") {
      if (str.substr(i, 2) === "</") {
        m = HTML_CLOSE2.exec(str.substring(i));
        if (!m || !stack.length || m[1].toLowerCase() !== stack[stack.length - 1]) return null;
        stack.pop();
        i += m[0].length;
      } else if (str.substr(i, 4) === "<!--") {
        const ce = str.indexOf("-->", i + 4);
        if (ce < 0) return null;
        i = ce + 3;
      } else {
        m = HTML_OPEN2.exec(str.substring(i));
        if (!m) return null;
        name = m[1].toLowerCase();
        i += m[0].length;
        if (m[2] !== "/" && !HTML_VOID2[name]) {
          if (HTML_RAW2[name]) {
            const ci = str.toLowerCase().indexOf("</" + name, i);
            if (ci < 0) return null;
            const gt = str.indexOf(">", ci);
            if (gt < 0) return null;
            i = gt + 1;
          } else stack.push(name);
        }
      }
      if (!stack.length) return { len: i - pos };
    } else {
      const lt = str.indexOf("<", i);
      if (lt < 0) return null;
      i = lt;
    }
  }
}
function mask(src) {
  let out = "", i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === "<") {
      const tg = scanHtmlTag2(src, i);
      if (tg) {
        out += src.slice(i, i + tg.len).replace(/[^\n]/g, " ");
        i += tg.len;
        continue;
      }
    }
    if (c === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") {
        out += " ";
        i++;
      }
      continue;
    }
    if (QUOTE_OPEN2.includes(c)) {
      out += c;
      i++;
      while (i < src.length && !QUOTE_CLOSE2.includes(src[i]) && src[i] !== "\n") {
        out += " ";
        i++;
      }
      if (i < src.length && QUOTE_CLOSE2.includes(src[i])) {
        out += src[i];
        i++;
      }
      continue;
    }
    out += c;
    i++;
  }
  return out;
}
var lineOf = (s, p) => (s.slice(0, p).match(/\n/g) || []).length + 1;
function lint(src, methodNames2, helpers = {}) {
  const found = [];
  const m = mask(src);
  {
    const RE = /^([ \t　]*(?:[^\s　「」！!。．.｡＝=：:（）()"”“『』\[\]［］]+[ \t　]*[＝=][ \t　]*)?)([^\s　「」！!。．.｡＝=：:（）()"”“『』\[\]［］]+)[ \t　]*[！!]([^「」。．.｡\[\]\n]*?)[ \t　]*([0-9０-９]+)(回)?[ \t　]*繰り返す/;
    const srcLines = src.split("\n");
    for (let li = 0; li < srcLines.length; li++) {
      const mm = RE.exec(srcLines[li].replace(/\/\/.*$/, ""));
      if (!mm || !mm[3].split(/[！!]/).pop().trim()) continue;
      const [all, indent, name, body, num, kai] = mm;
      const repl = `${indent}「${name}！${body.trim()}」！${num}${kai || ""} 繰り返す`;
      const fixedLines = srcLines.slice();
      fixedLines[li] = repl + srcLines[li].slice(all.length);
      const ex = `「${name}！${body.trim().length <= 20 ? body.trim() : "…"}」！${num}${kai || ""} 繰り返す`;
      found.push({
        category: "REPEAT_WITHOUT_BLOCK",
        line: li + 1,
        subdetail: `line${li + 1}`,
        fixedSrc: fixedLines.join("\n"),
        userMessage: `${li + 1}行目の【繰り返す】は、ブロック【「 」】に送る命令です。このままでは【${name}】に【繰り返す】が送られ、動かしたときにエラーになります。繰り返したい命令を【「 」】で囲んで、【${ex}】のように書きます。`
      });
      break;
    }
  }
  const stack = [];
  for (let i = 0; i < m.length; i++) {
    if (m[i] === "「") stack.push(i);
    else if (m[i] === "」" && stack.length) {
      const start = stack.pop();
      if (!COND_RE.test(m.slice(i + 1, i + 40))) continue;
      const body = m.slice(start + 1, i);
      if (body.includes("「") || /[。．｡]/.test(body)) continue;
      const re = /[=＝]/g;
      let mm, hit = -1, count = 0;
      while ((mm = re.exec(body)) !== null) {
        const a = body[mm.index - 1] || "", b = body[mm.index + 1] || "";
        if ("=＝!！<＜>＞".includes(a) || "=＝".includes(b)) continue;
        count++;
        hit = mm.index;
      }
      if (count === 1) {
        const at = start + 1 + hit, ln = lineOf(src, at);
        found.push({
          category: "ASSIGN_IN_CONDITION",
          line: ln,
          subdetail: `line${ln}`,
          fixedSrc: src.slice(0, at) + "＝＝" + src.slice(at + 1),
          userMessage: "条件のブロックの中で【＝】を使っています。比べるときは【＝＝】です（【＝】は代入です）。"
        });
      }
    }
  }
  if ((m.match(/[（(]/g) || []).length === (m.match(/[）)]/g) || []).length) {
    const isCmpEq = (i) => "=＝!！<＜>＞".includes(m[i - 1] || "") || "=＝".includes(m[i + 1] || "");
    let paren = 0, seenEq = false;
    const already = new Set(found.map((f) => f.line));
    for (let i = 0; i < m.length; i++) {
      const c = m[i];
      if (c === "（" || c === "(") paren++;
      else if (c === "）" || c === ")") paren = Math.max(0, paren - 1);
      else if ("。．｡「」\n".includes(c) || c === "." && !(/[0-9０-９]/.test(m[i - 1] || "") && /[0-9０-９]/.test(m[i + 1] || ""))) {
        seenEq = false;
        paren = 0;
      } else if ((c === "＝" || c === "=") && !isCmpEq(i)) {
        if (paren > 0 || seenEq) {
          const ln = lineOf(src, i);
          if (!already.has(ln)) {
            let q = i - 1;
            while (q >= 0 && /[ \t　]/.test(m[q])) q--;
            const likelyCompare = paren > 0 || /[）)0-9０-９"”]/.test(m[q] || "");
            found.push({
              category: "ASSIGN_IN_EXPRESSION",
              line: ln,
              subdetail: `line${ln}`,
              inParen: paren > 0,
              likelyCompare,
              fixedSrc: src.slice(0, i) + "＝＝" + src.slice(i + 1),
              userMessage: "式の中で【＝】を使っています。比べるときは【＝＝】です（【＝】は代入です）。"
            });
            already.add(ln);
          }
        }
        seenEq = true;
      }
    }
  }
  {
    let depth = 0, start = 0;
    const check = (a, b) => {
      let t = m.slice(a, b), prev;
      do {
        prev = t;
        t = t.replace(/「[^「」]*」/g, "□");
      } while (t !== prev);
      t = t.trim();
      if (!t || t.includes("□")) return;
      if (/^[0-9０-９.．]+$/.test(t) || /^["“”『][^"“”』]*["“”』]$/.test(t) || /^[぀-ヿ一-鿿_A-Za-z][぀-ヿ一-鿿_A-Za-z0-9０-９]*$/.test(t)) {
        const off = a + (m.slice(a, b).length - m.slice(a, b).trimStart().length), ln = lineOf(src, off);
        if (!found.some((f) => f.line === ln)) found.push({
          category: "NO_EFFECT_STATEMENT",
          line: ln,
          subdetail: `line${ln}`,
          userMessage: "何もしない文があります。【＝】や【！】が抜けていたり、【。】になっていたりしないか見てください。"
        });
      }
    };
    for (let i = 0; i < m.length; i++) {
      const c = m[i];
      if (c === "「") depth++;
      else if (c === "」") depth = Math.max(0, depth - 1);
      else if (depth === 0 && ("。．｡".includes(c) || c === "." && !(/[0-9０-９]/.test(m[i - 1] || "") && /[0-9０-９]/.test(m[i + 1] || "")))) {
        check(start, i);
        start = i + 1;
      }
    }
  }
  if (methodNames2 && methodNames2.size) {
    const re = /[0-9０-９](?=[^\s　0-9０-９.．。｡！!、,（(）)「」＝=：:＋+－\-＊*／/"”“『』])/g;
    let mm;
    const sites = [];
    while ((mm = re.exec(m)) !== null) {
      const at = mm.index + 1, w = /^[^\s　0-9０-９.．。｡！!、,（(）)「」＝=：:＋+－\-＊*／/"”“『』]+/.exec(m.slice(at))[0];
      let name = "";
      for (let k = Math.min(w.length, 12); k >= 2; k--) if (methodNames2.has(w.slice(0, k))) {
        name = w.slice(0, k);
        break;
      }
      if (name) sites.push({ at, name });
    }
    if (sites.length) {
      const { at, name } = sites[0];
      let b = at - 1;
      while (b > 0 && /[0-9０-９.．]/.test(src[b - 1])) b--;
      const num = src.slice(b, at), ln = lineOf(src, at);
      let fixedSrc = src;
      for (let q = sites.length - 1; q >= 0; q--) fixedSrc = fixedSrc.slice(0, sites[q].at) + " " + fixedSrc.slice(sites[q].at);
      if (!found.some((f) => f.line === ln)) found.push({
        category: "NUM_WORD_GLUED",
        line: ln,
        subdetail: `line${ln}`,
        fixedSrc,
        userMessage: `${ln}行目の【${num}${name}】は、数と命令の間に空白が必要です。【${num} ${name}】のように書きます。` + (sites.length > 1 ? `（ほかに ${sites.length - 1} か所、同じ形があります）` : "")
      });
    }
  }
  {
    const NAME = '[^\\s　「」！!。．.｡＝=：:（）()"”“『』\\[\\]［］、,]+';
    const made = [];
    const RE_MAKE = new RegExp(`(^|[\\s　。．｡「：:])(${NAME})[\\s　]*[＝=](?![＝=])[\\s　]*タイマー[\\s　]*[！!][^。．｡「」\\n]*?作る`, "g");
    for (const d of m.matchAll(RE_MAKE)) if (d[2] !== "タイマー" && !made.includes(d[2])) made.push(d[2]);
    if (made.length) {
      const RE_CALL = /タイマー[\s　]*[！!]/g;
      let mm;
      while ((mm = RE_CALL.exec(m)) !== null) {
        let q = mm.index - 1;
        while (q >= 0 && /[\s　]/.test(m[q])) q--;
        if (q >= 0 && !"。．｡「".includes(m[q])) continue;
        let i = mm.index + mm[0].length, depth = 0, body = "";
        for (; i < m.length; i++) {
          const c = m[i];
          if (c === "「") depth++;
          else if (c === "」") {
            if (depth === 0) break;
            depth--;
          } else if (depth === 0 && ("。．｡".includes(c) || c === "." && !(/[0-9０-９]/.test(m[i - 1] || "") && /[0-9０-９]/.test(m[i + 1] || "")))) break;
          body += c;
        }
        let t = body, prev;
        do {
          prev = t;
          t = t.replace(/「[^「」]*」/g, "□");
        } while (t !== prev);
        const mw = /(?:^|[\s　□）)"”“』])(次に実行|最後に実行|実行)(?=[\s　。．｡！!]|$)/.exec(t);
        if (!mw) continue;
        if (/(?:^|[\s　□）)"”“』！!])作る(?=[\s　。．｡！!「□（(]|$)/.test(t)) continue;
        const ln = lineOf(src, mm.index), name = made[0], method = mw[1];
        const fixedSrc = made.length === 1 ? src.slice(0, mm.index) + name + src.slice(mm.index + "タイマー".length) : void 0;
        const names2 = made.length === 1 ? `【${name}】` : made.map((n) => `【${n}】`).join("・");
        if (!found.some((f) => f.line === ln)) found.push({
          category: "TIMER_PROTO_EXECUTE",
          line: ln,
          subdetail: `line${ln}`,
          fixedSrc,
          userMessage: `${ln}行目の【タイマー！…${method}】は、【${name}＝タイマー！作る】で作ったタイマーではなく、もとの【タイマー】を動かします。このままでは【${name}！停止】で止められません。作ったタイマーを動かすときは【${name}！…${method}】のように、作ったタイマーの名前（${names2}）で書きます。`
        });
        break;
      }
    }
  }
  const { extractMethodCalls: extractMethodCalls2, closestMethod: closestMethod2 } = helpers;
  if (methodNames2 && methodNames2.size && extractMethodCalls2 && closestMethod2) {
    const defined = /* @__PURE__ */ new Set();
    for (const d of m.matchAll(/[：:][\s　]*([^\s　＝=：:！!「」（）()。．｡、,]+)[\s　]*[=＝](?![=＝])/g)) defined.add(d[1]);
    for (const d of m.matchAll(/(^|[\s　。．｡「])([^\s　＝=：:！!「」（）()。．｡、,0-9０-９]+)[\s　]*[=＝](?![=＝])/g)) defined.add(d[2]);
    for (const d of m.matchAll(/[|｜]([^|｜\n]*)[|｜]/g)) for (const v of d[1].split(/[\s　]+/)) if (v) defined.add(v);
    const lines = m.split("\n");
    const methodWords = (line) => {
      const out = [];
      for (const seg of line.split(/[。．｡]/)) {
        const b = seg.search(/[！!]/);
        if (b < 0) continue;
        let rest = seg.slice(b + 1).replace(/「[^」]*」?/g, " ").replace(/[（(][^）)]*[）)]?/g, " ").replace(/["“”『][^"“”』]*["“”』]?/g, " ");
        for (let t of rest.split(/[\s　！!」]+/)) {
          t = t.replace(/[、,。．｡]+$/, "");
          if (!/^[぀-ヿ一-鿿_A-Za-z][぀-ヿ一-鿿_A-Za-z0-9０-９？]*$/.test(t)) continue;
          out.push(t);
        }
      }
      return out;
    };
    for (let li = 0; li < lines.length; li++) {
      for (const name of methodWords(lines[li])) {
        if (methodNames2.has(name) || defined.has(name)) continue;
        if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) continue;
        const lv = /^([ーｰ])([0-9０-９.．]+)$/.exec(name);
        if (lv) {
          const srcLines2 = src.split("\n"), before2 = srcLines2.slice(0, li).join("\n").length + (li > 0 ? 1 : 0);
          const col2 = lines[li].indexOf(name), at2 = col2 < 0 ? -1 : before2 + col2;
          found.push({
            category: "UNKNOWN_METHOD",
            line: li + 1,
            subdetail: `${name}->−${lv[2]}`,
            fixedSrc: at2 < 0 ? void 0 : src.slice(0, at2) + "−" + src.slice(at2 + 1),
            userMessage: `${li + 1}行目の【${name}】の【${lv[1]}】は長音記号（のばす音）で、マイナスではありません。マイナスの数は【−${lv[2]}】のように【−】（または半角の -）で書きます。`
          });
          break;
        }
        const near = suggest(name, methodNames2);
        if (!near) continue;
        const srcLines = src.split("\n"), before = srcLines.slice(0, li).join("\n").length + (li > 0 ? 1 : 0);
        const col = lines[li].search(new RegExp(`(^|[\\s　！!])${name.replace(/[?？]/g, "\\$&")}(?=[\\s　。．.｡]|$)`));
        const at = col < 0 ? -1 : before + col + (/[\s　！!]/.test(lines[li][col]) ? 1 : 0);
        found.push({
          category: "UNKNOWN_METHOD",
          line: li + 1,
          subdetail: `${name}->${near}`,
          fixedSrc: at < 0 ? void 0 : src.slice(0, at) + near + src.slice(at + name.length),
          userMessage: `命令【${name}】は登録されていません。もしかして【${near}】のことですか？`
        });
        break;
      }
    }
  }
  found.sort((a, b) => a.line - b.line);
  return found;
}
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function suggest(name, names2) {
  let best = null, bestKey = null;
  for (const n of names2) {
    const dist = lev(name, n);
    const prefix = n.startsWith(name) || name.startsWith(n);
    if (!prefix && dist > Math.min(2, Math.floor(name.length / 2))) continue;
    const key = [n.startsWith(name) ? 0 : 1, dist, Math.abs(n.length - name.length)];
    if (!bestKey || key[0] < bestKey[0] || key[0] === bestKey[0] && (key[1] < bestKey[1] || key[1] === bestKey[1] && key[2] < bestKey[2])) {
      best = n;
      bestKey = key;
    }
  }
  return best;
}

// js/lib/diagnose/dolittle_repair.js
var QUOTE_OPEN3 = '"”“『';
var QUOTE_CLOSE3 = '"”“』';
var LINE_COMMENT_RE2 = /^((?:[^"”“『/\n]|\/(?!\/)|["”“『][^"”“』\n]*(?:["”“』]|$))*)\/\/.*$/;
var TERMS = "。．.｡";
var WS = " 	　";
var OPS = "+*/＋＊／×÷−-";
var lineOf2 = (src, pos) => (src.slice(0, Math.max(0, pos)).match(/\n/g) || []).length + 1;
var backWs = (src, p) => {
  let q = p;
  while (q > 0 && WS.includes(src[q - 1])) q--;
  return q;
};
var backCode = (src, p) => {
  let q = p;
  while (q > 0 && (WS + "\n").includes(src[q - 1])) q--;
  return q;
};
var lineEnd = (src, p) => {
  const i = src.indexOf("\n", p);
  return i < 0 ? src.length : i;
};
var lineStart = (src, p) => src.lastIndexOf("\n", p - 1) + 1;
function verify(parseInfo, src2, origPos, delta, src) {
  const r = parseInfo(src2);
  if (!r) return null;
  if (r.ok) return { ok: true, progress: Infinity };
  const np = typeof r.pos === "number" ? r.pos : -1;
  if (origPos < 0) return np - delta > origPos ? { ok: false, progress: np - delta } : null;
  const origLine = lineOf2(src, origPos), newLine = lineOf2(src2, np);
  const atEnd = np >= src2.replace(/\s+$/, "").length;
  if (np - delta > origPos && (newLine > origLine || atEnd)) return { ok: false, progress: np - delta - origPos };
  return null;
}
function diagnoseOnce(src, parseInfo, opts = {}) {
  const r0 = parseInfo(src);
  if (!r0 || r0.ok) return null;
  const pos = typeof r0.pos === "number" ? r0.pos : null;
  const cands = [];
  const push = (kind, src2, delta, at, priority, needOk = false) => cands.push({ kind, src2, delta, at, priority, needOk });
  if (pos === null) {
    const end = src.replace(/\s+$/, "").length;
    push("UNCLOSED_BLOCK", src.slice(0, end) + "」。" + src.slice(end), 2, end, 30);
    push("UNCLOSED_PAREN", src.slice(0, end) + "）。" + src.slice(end), 2, end, 31);
    push("UNCLOSED_STRING", src.slice(0, end) + '"。' + src.slice(end), 2, end, 32);
    push("UNCLOSED_BLOCK", src.slice(0, end) + "」！1 繰り返す。" + src.slice(end), 8, end, 33);
  } else {
    const p = pos;
    const q = backWs(src, p);
    const qc = backCode(src, p);
    const cur = src[p] || "";
    const prev = qc > 0 ? src[qc - 1] : "";
    const rest = src.slice(p, lineEnd(src, p));
    const le = lineEnd(src, p), ls = lineStart(src, p);
    if (prev === "」") {
      let depth = 0, open = -1;
      for (let i = qc - 1; i >= 0; i--) {
        if (src[i] === "」") depth++;
        else if (src[i] === "「") {
          depth--;
          if (depth === 0) {
            open = i;
            break;
          }
        }
      }
      if (open > 0) {
        const before = src.slice(Math.max(0, open - 12), open).replace(/[\s　]+$/, "");
        if (!/[=＝]$/.test(before)) {
          push("MISSING_EXECUTE", src.slice(0, qc) + "実行" + src.slice(qc), 2, qc, 9);
          if (src.slice(qc, lineEnd(src, qc)).replace(LINE_COMMENT_RE2, "$1").trim() === "") push("MISSING_EXECUTE", src.slice(0, qc) + "実行。" + src.slice(qc), 3, qc, 9.1);
        }
      }
    }
    if (TERMS.includes(cur)) {
      const prevIsTerm = q > 0 && TERMS.includes(src[q - 1]);
      const atEol = src.slice(p + 1, lineEnd(src, p)).replace(LINE_COMMENT_RE2, "$1").trim() === "";
      if (prevIsTerm || !atEol) push(prevIsTerm ? "DOUBLE_PERIOD" : "EXTRA_PERIOD", src.slice(0, p) + src.slice(p + 1), -1, p, 10);
    }
    if (qc > 0 && TERMS.includes(prev) && !TERMS.includes(cur) && /\S/.test(rest) && ls < qc) {
      push("EXTRA_PERIOD", src.slice(0, qc - 1) + src.slice(qc), -1, qc - 1, 12);
    }
    if ((cur === "！" || cur === "!") && (prev === "！" || prev === "!")) push("DOUBLE_BANG", src.slice(0, p) + src.slice(p + 1), -1, p, 11);
    if (cur === "」") push("UNCLOSED_BLOCK", src.slice(0, p) + src.slice(p + 1), -1, p, 40);
    if (cur === "）" || cur === ")") push("UNCLOSED_PAREN", src.slice(0, p) + src.slice(p + 1), -1, p, 41);
    if ("、；，;,".includes(cur)) push("WRONG_TERMINATOR", src.slice(0, p) + "。" + src.slice(p + 1), 0, p, 15);
    if ("：:＝=？?".includes(cur) && !(cur === "＝" || cur === "=")) push("WRONG_SEND_SYMBOL", src.slice(0, p) + "！" + src.slice(p + 1), 0, p, 50);
    if ((cur === "＝" || cur === "=") && !/^[=＝]/.test(src.slice(p + 1))) push("WRONG_SEND_SYMBOL", src.slice(0, p) + "！" + src.slice(p + 1), 0, p, 51);
    if (qc > 0 && "：:？?".includes(prev)) push("WRONG_SEND_SYMBOL", src.slice(0, qc - 1) + "！" + src.slice(qc), 0, qc - 1, 13);
    if (qc > 0 && (prev === "＝" || prev === "=") && !(qc > 1 && "＝=!！<>＜＞".includes(src[qc - 2]))) push("WRONG_SEND_SYMBOL", src.slice(0, qc - 1) + "！" + src.slice(qc), 0, qc - 1, 52);
    if (qc > 0 && "、；，;,".includes(prev)) push("WRONG_TERMINATOR", src.slice(0, qc - 1) + "。" + src.slice(qc), 0, qc - 1, 14);
    if (src.slice(qc, p).includes("\n")) push("PERIOD_MISSING", src.slice(0, qc) + "。" + src.slice(qc), 1, qc, 15.4);
    {
      let e = lineStart(src, p) - 1, n = 0, scanned = 0;
      while (e > 0 && n < 3 && scanned < 12) {
        const s0 = lineStart(src, e);
        const code = src.slice(s0, e).replace(LINE_COMMENT_RE2, "$1");
        const end = s0 + code.replace(/\s+$/, "").length;
        if (code.trim()) {
          scanned++;
          if (!TERMS.includes(src[end - 1]) && !/[「|｜]$/.test(code.trim())) {
            push("PERIOD_MISSING", src.slice(0, end) + "。" + src.slice(end), 1, end, 15.5 + n * 0.1);
            n++;
          }
          if (/」$/.test(code.trim()) && /[！!]/.test(code)) push("MISSING_EXECUTE", src.slice(0, end) + "実行。" + src.slice(end), 3, end, 9.2 + n * 0.01);
          if (/[！!]$/.test(code.trim())) push("BANG_WITHOUT_METHOD", src.slice(0, end) + "歩く。" + src.slice(end), 3, end, 25.1 + n * 0.01);
        }
        e = s0 - 1;
      }
    }
    if ((cur === "！" || cur === "!") && q === p) {
      let w0 = p;
      while (w0 > ls && WORD_CH.test(src[w0 - 1])) w0--;
      const before = src.slice(ls, w0).replace(LINE_COMMENT_RE2, "$1");
      const e = backWs(src, w0);
      const last = before.replace(/[\s　]+$/, "").slice(-1);
      if (w0 < p && /[\s　]/.test(src[w0 - 1] || "") && /[！!]/.test(before) && last && !(TERMS + "「|｜＝=：:！!").includes(last)) {
        cands.push({ kind: "PERIOD_BETWEEN", src2: src.slice(0, e) + "。" + src.slice(e), delta: 1, at: e, priority: 15.8, word: src.slice(w0, p) });
      }
    }
    if (q > 0 && QUOTE_CLOSE3.includes(src[q - 1])) {
      let o = q - 2;
      while (o >= 0 && !QUOTE_OPEN3.includes(src[o]) && src[o] !== "\n") o--;
      let t = o - 1;
      while (t >= 0 && WS.includes(src[t])) t--;
      if (o >= 0 && t >= 0 && TERMS.includes(src[t]) && /作る[\s　]*$/.test(src.slice(Math.max(0, t - 8), t))) push("EXTRA_PERIOD", src.slice(0, t) + src.slice(t + 1), -1, t, 20);
    }
    {
      let t = q - 1;
      while (t >= ls && !TERMS.includes(src[t])) t--;
      const frag = t >= ls ? src.slice(t + 1, q) : "";
      const head = (/^[\s　]*([^\s　（(「"”“『』）)0-9０-９＋－\-]+)/.exec(frag) || [])[1] || "";
      const isReceiver = head && (/^(タートル|ボタン|ラベル|フィールド|タイマー|図形|配列|色|リスト|選択メニュー|スライダー|音|メロディ|楽器|システム|ルート|画像)$/.test(head) || new RegExp(`(^|[\\s　。．｡「])${head.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s　]*[=＝]`).test(src));
      if (t >= ls && frag.trim() && !isReceiver && !/[！!＝=「」]/.test(frag) && /作る[\s　]*$/.test(src.slice(ls, t)))
        push("EXTRA_PERIOD", src.slice(0, t) + src.slice(t + 1), -1, t, 20.5);
    }
    push("MISSING_BANG", src.slice(0, q) + "！" + src.slice(q), 1, q, 21);
    const count = (re) => (src.match(re) || []).length;
    const lineText = src.slice(ls, le).replace(LINE_COMMENT_RE2, "$1");
    if (count(/「/g) > count(/」/g)) {
      push("UNCLOSED_BLOCK", src.slice(0, q) + "」" + src.slice(q), 1, q, 42);
      push("UNCLOSED_BLOCK", src.slice(0, qc) + "」。" + src.slice(qc), 2, qc, 43);
    }
    if (count(/[(（]/g) > count(/[)）]/g)) push("UNCLOSED_PAREN", src.slice(0, q) + "）" + src.slice(q), 1, q, 44);
    if ((lineText.match(/["“”『』]/g) || []).length % 2 === 1) {
      push("UNCLOSED_STRING", src.slice(0, le) + '"' + src.slice(le), 1, le, 45);
      push("UNCLOSED_STRING", src.slice(0, q) + '"' + src.slice(q), 1, q, 46);
    }
    if ((lineText.match(/[|｜]/g) || []).length % 2 === 1) push("UNCLOSED_PARAM", src.slice(0, q) + "|" + src.slice(q), 1, q, 47);
    const SYM = "＝=：:！!、";
    const nbr = (i, dir) => {
      let j = i + dir;
      while (j >= 0 && j < src.length && WS.includes(src[j])) j += dir;
      return src[j] || "";
    };
    const obviouslyExtra = (i) => {
      const ch = src[i];
      if (!ch || !SYM.includes(ch)) return false;
      if (ch === "、") return true;
      const a = nbr(i, -1), b = nbr(i, 1);
      if (SYM.includes(a) || SYM.includes(b)) return true;
      if ((ch === "！" || ch === "!") && (b === "" || b === "\n" || TERMS.includes(b))) return true;
      if ((ch === "！" || ch === "!") && "」）)".includes(b) && secondBang(i)) return true;
      return false;
    };
    const secondBang = (i) => {
      if (!(src[i] === "！" || src[i] === "!")) return false;
      let depth = 0;
      for (let k = i - 1; k >= 0; k--) {
        const c = src[k];
        if (QUOTE_CLOSE3.includes(c) || QUOTE_OPEN3.includes(c)) {
          let j = k - 1;
          while (j >= 0 && !QUOTE_OPEN3.includes(src[j]) && src[j] !== "\n") j--;
          k = Math.max(j, 0);
          continue;
        }
        if (c === "」" || c === "）" || c === ")") {
          depth++;
          continue;
        }
        if (c === "「" || c === "（" || c === "(") {
          if (depth === 0) return false;
          depth--;
          continue;
        }
        if (depth > 0) continue;
        if (TERMS.includes(c) || c === "\n" && /^[\s　]*$/.test(src.slice(lineStart(src, k), k))) {
          if (TERMS.includes(c)) return false;
        }
        if ((c === "！" || c === "!") && !"=＝<>＜＞".includes(src[k + 1] || "")) return true;
      }
      return false;
    };
    for (const i of [p, qc - 1]) if (i >= 0 && secondBang(i)) {
      const head = /([^\s　！!＝=：:。．｡「」（）()"”“『』]+)[ \t　]*([！!])[ \t　]*([^\s　！!＝=：:。．｡「」（）()"”“『』]+)[ \t　]*$/.exec(src.slice(lineStart(src, i), i));
      if (head && lineStart(src, i) + head.index === lineStart(src, i) + src.slice(lineStart(src, i), i).search(/\S/)) {
        const b1 = lineStart(src, i) + head.index + head[1].length + head[0].slice(head[1].length).indexOf(head[2]);
        push("WRONG_SEND_SYMBOL", src.slice(0, b1) + "＝" + src.slice(b1 + 1), 0, b1, 13);
      }
      push("EXTRA_SYMBOL", src.slice(0, i) + src.slice(i + 1), -1, i, 16.5, true);
      break;
    }
    {
      const m = /^([\s　]*[^\s　！!＝=：:。．｡「」（）()"”“『』]+)[ \t　]*([！!])[ \t　]*[＝=](?![＝=])/.exec(src.slice(ls, le));
      if (m) {
        const at = ls + m[0].lastIndexOf(m[2]);
        push("EXTRA_SYMBOL", src.slice(0, at) + src.slice(at + 1), -1, at, 12);
        const eq = ls + m[0].length - 1;
        push("EXTRA_SYMBOL", src.slice(0, eq) + src.slice(eq + 1), -1, eq, 12.1);
      }
    }
    {
      let e = p + (cur === "＝" || cur === "=" ? 1 : 0), s0 = e;
      while (s0 > 0 && "＝= 	　".includes(src[s0 - 1])) s0--;
      const run = src.slice(s0, e).replace(/[\s　]/g, "");
      const before = src.slice(lineStart(src, p), s0).trim();
      if (run.length >= 2 && /^[＝=]+$/.test(run) && /^[^\s　！!＝=：:。．｡「」（）()"”“『』]+$/.test(before))
        push("EXTRA_SYMBOL", src.slice(0, s0) + "＝" + src.slice(e), 1 - (e - s0), s0, 8.5);
    }
    if (obviouslyExtra(p)) push("EXTRA_SYMBOL", src.slice(0, p) + src.slice(p + 1), -1, p, 16);
    if (qc > 0 && obviouslyExtra(qc - 1)) push("EXTRA_SYMBOL", src.slice(0, qc - 1) + src.slice(qc), -1, qc - 1, 17);
    if (prev === "！" || prev === "!") push("BANG_WITHOUT_METHOD", src.slice(0, qc) + "歩く" + src.slice(qc), 2, qc, 25);
    if (prev === "＝" || prev === "=") push("NO_VALUE", src.slice(0, qc) + "0" + src.slice(qc), 1, qc, 26);
    if (OPS.includes(prev)) push("NO_OPERAND", src.slice(0, qc) + "0" + src.slice(qc), 1, qc, 27);
    if (OPS.includes(cur) && !"−-".includes(cur)) push("NO_LEFT_OPERAND", src.slice(0, p) + "0" + src.slice(p), 1, p, 28);
    if ((cur === "＝" || cur === "=") && (qc === 0 || TERMS.includes(prev) || prev === "\n" || prev === "「")) push("NO_LHS", src.slice(0, p) + "x" + src.slice(p), 1, p, 29);
    if (cur === "」") {
      let s = qc;
      while (s > 0 && !TERMS.includes(src[s - 1]) && src[s - 1] !== "\n") s--;
      push("UNCLOSED_BLOCK", src.slice(0, s) + "「" + src.slice(s), 1, s, 48);
    }
  }
  if (opts.kinds) {
    for (let i = cands.length - 1; i >= 0; i--) if (!opts.kinds.has(cands[i].kind)) cands.splice(i, 1);
  }
  cands.sort((a, b) => a.priority - b.priority);
  let best = null;
  for (const c of cands) {
    const v = verify(parseInfo, c.src2, pos === null ? -1 : pos, c.delta, src);
    if (c.needOk && !(v && v.ok)) continue;
    if (opts.debug) console.log("[cand]", c.kind, "prio", c.priority, "at", c.at, "->", JSON.stringify(v), JSON.stringify(c.src2.slice(Math.max(0, c.at - 12), c.at + 14)));
    if (!v) continue;
    if (v.ok) {
      best = { ...c, v };
      break;
    }
    if (!best) best = { ...c, v };
  }
  if (!best) return null;
  const line = lineOf2(src, best.at);
  return {
    category: best.kind,
    line,
    subdetail: `line${line}`,
    repair: { kind: best.kind, line, pos: best.at },
    fixedSrc: best.src2,
    parseOk: best.v.ok,
    ...best.word ? { word: best.word } : {}
  };
}
function locateMissingClose(src, parseInfo, open = "「", close = "」", methodNames2 = null) {
  const stack = [];
  for (let i = 0; i < src.length; i++) {
    if (QUOTE_OPEN3.includes(src[i])) {
      i++;
      while (i < src.length && !QUOTE_CLOSE3.includes(src[i]) && src[i] !== "\n") i++;
      continue;
    }
    if (src[i] === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    if (src[i] === open || open === "（" && src[i] === "(") stack.push(i);
    else if ((src[i] === close || close === "）" && src[i] === ")") && stack.length) stack.pop();
  }
  if (!stack.length) return null;
  const from = stack[stack.length - 1] + 1;
  const r0 = parseInfo(src);
  const stop = r0 && typeof r0.pos === "number" ? r0.pos : src.length;
  const limit = stop < from ? src.length : src.indexOf("\n", stop) < 0 ? src.length : src.indexOf("\n", stop);
  const cands = [];
  for (let at = from; at <= limit; at++) {
    const a = src[at - 1] || "", b = src[at] || "";
    const aWs = /[\s　]/.test(a), bWs = /[\s　]/.test(b) || b === "";
    if (aWs && !bWs || !aWs && bWs || !aWs && !bWs && /[！!。．｡（(）)「」、]/.test(a + b)) {
      cands.push(at);
      continue;
    }
    if (close === "）" && !aWs && /[＋+－\-＊*／/％%＝=＜<＞>]/.test(b) && !/[＋+－\-＊*／/％%＝=＜<＞>!！]/.test(a)) {
      cands.push(at);
      continue;
    }
    if (WORD_CH.test(a) && WORD_CH.test(b) && midWordOK(src, at, methodNames2)) cands.push(at);
  }
  cands.sort((x, y) => Math.abs(stop - x) - Math.abs(stop - y));
  const pool = cands.slice(0, 150);
  const okAt = new Set(pool.filter((at) => {
    const r = parseInfo(src.slice(0, at) + close + src.slice(at));
    return r && r.ok;
  }));
  const second = okAt.size ? [] : pool.slice(0, 30).filter((at) => {
    const d2 = diagnoseOnce(src.slice(0, at) + close + src.slice(at), parseInfo);
    return d2 && d2.parseOk;
  });
  let best = null;
  for (const at of okAt.size ? [...okAt] : second) {
    const okish = okAt.size ? 2 : 1;
    const next = src.slice(at).replace(/^[ \t　]+/, "");
    const nextScore = BLOCK_TAKERS.test(next) ? 3 : /^[！!]/.test(next) ? 3 : startsWithMethod(next, methodNames2) ? 2.3 : close === "）" && /^([（(]|[＋+－\-＊*／/％%＝=＜<＞>])/.test(next) ? 2.3 : /^[。．.｡]/.test(next) ? 2 : /^[\r\n]/.test(next) || next === "" ? 1 : 0;
    const score = okish * 10 + nextScore;
    const later = close === "）" ? at < best?.at : at > best?.at;
    if (!best || score > best.score || score === best.score && later) best = { at, score };
  }
  if (!best) return null;
  const text = close === "）" && src[from - 1] === "(" ? ")" : close;
  return { line: lineOf2(src, best.at), pos: best.at, text, stage: okAt.size ? 1 : 2 };
}
var WORD_CH = /[^\s　！!。．.｡、,（(）)「」＝=：:＋+－\-＊*／/"”“『』]/;
var BLOCK_TAKERS = /^(実行|繰り返す|そうでなければ|ならば|なら|の間|まで)/;
function midWordOK(src, at, names2) {
  let s = at, e = at;
  while (s > 0 && WORD_CH.test(src[s - 1])) s--;
  while (e < src.length && WORD_CH.test(src[e])) e++;
  const word = src.slice(s, e), next = src.slice(at, e);
  if (names2 && names2.has(word)) return false;
  return BLOCK_TAKERS.test(next) || startsWithMethod(next, names2) >= 2;
}
function startsWithMethod(text, names2) {
  if (!names2 || !names2.size) return 0;
  const m = /^[^\s　！!。．.｡、,（(）)「」＝=：:＋+－\-＊*／/]+/.exec(text);
  return m && names2.has(m[0]) ? m[0].length : 0;
}
function locateExtraClose(src, parseInfo, close = "」") {
  let best = null;
  const r0 = parseInfo(src);
  const origPos = r0 && typeof r0.pos === "number" ? r0.pos : -1;
  for (let i = 0; i < src.length; i++) {
    if (!(src[i] === close || close === "）" && src[i] === ")")) continue;
    for (const len of TERMS.includes(src[i + 1] || "") ? [1, 2] : [1]) {
      const s2 = src.slice(0, i) + src.slice(i + len);
      const r = parseInfo(s2);
      if (!r) continue;
      let okish = r.ok ? 3 : 0;
      if (!okish) {
        const d2 = diagnoseOnce(s2, parseInfo);
        if (d2 && d2.parseOk) okish = 2;
      }
      if (!okish && typeof r.pos === "number" && r.pos > origPos) okish = 1;
      if (!okish) continue;
      const ls = src.lastIndexOf("\n", i - 1) + 1, le = src.indexOf("\n", i) < 0 ? src.length : src.indexOf("\n", i);
      const lineRest = src.slice(ls, le).replace(LINE_COMMENT_RE2, "$1").trim();
      const score = okish * 10 + (src[i - 1] === close || src[i + 1] === close ? 2 : /^[」）)]\s*[。．.｡]?$/.test(lineRest) ? 1 : 0);
      if (!best || score > best.score || score === best.score && i > best.at) best = { at: i, score, len };
    }
  }
  return best ? { line: lineOf2(src, best.at), pos: best.at, text: "", len: best.len, stage: best.score >= 30 ? 1 : 2 } : null;
}
function diagnose(src, parseInfo, opts = {}) {
  src = String(src || "").replace(/\r\n?/g, "\n");
  const maxErrors = opts.maxErrors || 3;
  const list = [];
  let cur = src;
  for (let i = 0; i < maxErrors; i++) {
    const d = diagnoseOnce(cur, parseInfo, opts);
    if (!d) break;
    list.push(d);
    if (d.parseOk) break;
    cur = d.fixedSrc;
  }
  if (!list.length) return null;
  const first = list[0];
  return {
    category: first.category,
    line: first.line,
    subdetail: first.subdetail,
    repairs: list.map((d) => d.repair),
    fixedSrc: list[list.length - 1].fixedSrc,
    firstFixedSrc: first.fixedSrc,
    count: list.length,
    word: first.word
  };
}
var REPAIR_MESSAGES = {
  MISSING_EXECUTE: "【なら】【の間】やタイマーに渡したブロックの後には【実行】が必要です。ブロックを閉じた【」】の後に【実行】を書きます。",
  EXTRA_SYMBOL: "余分な記号があります。記号が重なっていたり、いらない所に入っていたりしないか見てください。",
  WRONG_TERMINATOR: "文の終わりは【。】です。【、】や【；】は使えません。",
  WRONG_SEND_SYMBOL: "オブジェクトに命令する記号は【！】です。【：】や【＝】では命令を送れません。",
  PERIOD_BETWEEN: "文と文の間に【。】が必要です。1つの行に2つの文を書くときも、【。】で区切ります。"
};

// js/lib/diagnose/dolittle_diagnose.js
var QUOTE_OPEN4 = '"”“『';
var QUOTE_CLOSE4 = '"”“』';
var LINE_COMMENT_RE3 = /^((?:[^"”“『/\n]|\/(?!\/)|["”“『][^"”“』\n]*(?:["”“』]|$))*)\/\/.*$/;
var WRAPPER_RE = /^root\.system\.run\(function\(\)\{return AsyncByGenerator\.toVal\(\(function\*\(\)\s*\{([\s\S]*)\}\)\.apply\(this\)\);\}\);\s*$/;
function quiet(fn) {
  const o = console.log;
  console.log = () => {
  };
  try {
    return fn();
  } finally {
    console.log = o;
  }
}
function makeChecker(parser, kind = "ba") {
  function checkSyntaxLocal(src) {
    const P = parser || globalThis.MinimalParser;
    if (!P || !src.trim()) return null;
    try {
      const js = quiet(() => P.parse(src));
      const m = WRAPPER_RE.exec(js);
      if (m && (m[1].trim() === "" || /^return\s*$/.test(m[1].trim()))) return { ok: false, line: null, pos: null, message: "" };
      if (kind === "djs") {
        const lines = src.split("\n");
        for (let i = lines.length - 1; i >= 0; i--) {
          const t = lines[i].replace(LINE_COMMENT_RE3, "$1").trim();
          if (!t) continue;
          if (!/[。．.｡]$/.test(t)) {
            const upto = lines.slice(0, i + 1).join("\n").replace(/\/\/[^\n]*$/, "").replace(/\s+$/, "");
            return { ok: false, line: i + 1, pos: null, finalPos: upto.length, message: `${i + 1}行目付近を確認してください。` };
          }
          break;
        }
      }
      return { ok: true };
    } catch (e) {
      const message = e && e.message ? e.message : String(e);
      const lm = /(\d+)\s*行目/.exec(message);
      return { ok: false, line: lm ? parseInt(lm[1], 10) : null, pos: e && typeof e.maxPos === "number" ? e.maxPos : null, message };
    }
  }
  function parseInfo(src) {
    const c = checkSyntaxLocal(src);
    if (!c) return { ok: true };
    const p = typeof c.pos === "number" ? c.pos : typeof c.finalPos === "number" ? c.finalPos : null;
    return { ok: !!c.ok, pos: p, line: c.line ?? null };
  }
  return { checkSyntaxLocal, parseInfo };
}
function firstUnmatchedOpen(src, o, cl) {
  const opens = o === "（" ? "（(" : o, closes = cl === "）" ? "）)" : cl;
  const stack = [];
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    if (QUOTE_OPEN4.includes(ch)) {
      i++;
      while (i < src.length && !QUOTE_CLOSE4.includes(src[i]) && src[i] !== "\n") i++;
      continue;
    }
    if (opens.includes(ch)) stack.push(i);
    else if (closes.includes(ch) && stack.length) stack.pop();
  }
  return stack.length ? stack[0] : -1;
}
function shortBefore(before) {
  const tok = before.split(/[\s　「」]+/).pop();
  if (tok.length >= 2 && tok.length <= 12) return tok;
  return before.length <= 8 && !/[「」]/.test(before) ? before : "…" + before.slice(-8);
}
var WRONG_BRACKET = {
  "｛": "「",
  "｝": "」",
  "{": "「",
  "}": "」",
  "［": "「",
  "］": "」",
  "【": "「",
  "】": "」",
  "〔": "「",
  "〕": "」",
  "〈": "「",
  "〉": "」",
  "《": "「",
  "》": "」"
};
function wrongBracket(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  const hits = [];
  let paren = 0;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    if (QUOTE_OPEN4.includes(ch)) {
      i++;
      while (i < src.length && !QUOTE_CLOSE4.includes(src[i]) && src[i] !== "\n") i++;
      continue;
    }
    if (ch === "（" || ch === "(") paren++;
    else if ((ch === "）" || ch === ")") && paren > 0) paren--;
    else if (WRONG_BRACKET[ch]) hits.push({ i, to: paren > 0 ? WRONG_BRACKET[ch] === "「" ? "（" : "）" : WRONG_BRACKET[ch] });
  }
  if (!hits.length || hits[0].i > chk.pos) return null;
  let fixed = src;
  for (const h of hits) fixed = fixed.slice(0, h.i) + h.to + fixed.slice(h.i + 1);
  const r = parseInfo(fixed);
  if (!r.ok && !(typeof r.pos === "number" && r.pos > chk.pos)) return null;
  const ln = (src.slice(0, hits[0].i).match(/\n/g) || []).length + 1;
  const kinds = [...new Set(hits.map((h) => src[h.i]))];
  return {
    category: "WRONG_BRACKET",
    line: ln,
    subdetail: `line${ln}`,
    fixedSrc: fixed,
    parseOk: !!r.ok,
    userMessage: `${ln}行目の${kinds.some((k) => "【】".includes(k)) ? " " + kinds.join(" ") + " " : kinds.map((k) => `【${k}】`).join("")}は、ブロックの記号ではありません。ブロックは【「】と【」】で囲みます。`
  };
}
var FILE_NAME_RE = /(^|[^A-Za-z0-9_ａ-ｚＡ-Ｚ０-９"”“『])([A-Za-z0-9_\-ａ-ｚＡ-Ｚ０-９]+[.．](?:png|gif|jpe?g|bmp|svg|webp|mp3|wav|ogg|mid|midi))(?![A-Za-z0-9])/gi;
function unquotedFilename(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  let masked = "";
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") {
        masked += " ";
        i++;
      }
      masked += src[i] || "";
      continue;
    }
    if (QUOTE_OPEN4.includes(ch)) {
      masked += " ";
      i++;
      while (i < src.length && !QUOTE_CLOSE4.includes(src[i]) && src[i] !== "\n") {
        masked += " ";
        i++;
      }
      if (i < src.length) masked += src[i] === "\n" ? "\n" : " ";
      continue;
    }
    masked += ch;
  }
  const hits = [];
  for (const m of masked.matchAll(FILE_NAME_RE)) {
    const i = m.index + m[1].length, name2 = m[2];
    if (/["”“『』]/.test(src[i - 1] || "") || /["”“『』]/.test(src[i + name2.length] || "")) continue;
    hits.push({ i, name: name2 });
  }
  if (!hits.length || hits[0].i > chk.pos) return null;
  let fixed = src;
  for (let k = hits.length - 1; k >= 0; k--) {
    const h = hits[k];
    fixed = fixed.slice(0, h.i) + '"' + h.name + '"' + fixed.slice(h.i + h.name.length);
  }
  const r = parseInfo(fixed);
  if (!r.ok && !(typeof r.pos === "number" && r.pos > chk.pos + 2)) return null;
  const ln = (src.slice(0, hits[0].i).match(/\n/g) || []).length + 1;
  const name = hits[0].name;
  return {
    category: "UNQUOTED_FILENAME",
    line: ln,
    subdetail: `line${ln}`,
    fixedSrc: fixed,
    parseOk: !!r.ok,
    userMessage: `${ln}行目の【${name}】はファイルの名前なので、"${name}" のように【"】で囲んで書きます。` + (hits.length > 1 ? `（ほかに ${hits.length - 1} か所、同じ形があります）` : "")
  };
}
var REPEAT_LINE_RE = /^([ \t　]*(?:[^\s　「」！!。．.｡＝=：:（）()"”“『』\[\]［］]+[ \t　]*[＝=][ \t　]*)?)([^\s　「」！!。．.｡＝=：:（）()"”“『』\[\]［］]+)[ \t　]*[！!]([^「」。．.｡\[\]\n]*?)[ \t　]*([0-9０-９]+)(回)?[ \t　]*繰り返す/;
function repeatBody(body) {
  return body.split(/[！!]/).pop().trim();
}
function repeatWithoutBlock(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  const lines = src.split("\n");
  const stopLine = (src.slice(0, chk.pos).match(/\n/g) || []).length + 1;
  for (const ln of [stopLine, stopLine - 1]) {
    const line = lines[ln - 1];
    if (!line) continue;
    const m = REPEAT_LINE_RE.exec(line.replace(LINE_COMMENT_RE3, "$1"));
    if (!m || !repeatBody(m[3])) continue;
    const [all, indent, name, body, num, kai] = m;
    const repl = `${indent}「${name}！${body.trim()}」！${num}${kai || ""} 繰り返す`;
    const fixedLines = lines.slice();
    fixedLines[ln - 1] = repl + line.slice(all.length);
    const fixed = fixedLines.join("\n");
    const r = parseInfo(fixed);
    if (!r.ok && !(typeof r.pos === "number" && r.pos > chk.pos + 2)) continue;
    const ex = `「${name}！${body.trim().length <= 20 ? body.trim() : "…"}」！${num}${kai || ""} 繰り返す`;
    return {
      category: "REPEAT_WITHOUT_BLOCK",
      line: ln,
      subdetail: `line${ln}`,
      fixedSrc: fixed,
      parseOk: !!r.ok,
      userMessage: `${ln}行目の【繰り返す】は、ブロック【「 」】に送る命令です。繰り返したい命令を【「 」】で囲んで、【${ex}】のように書きます。`
    };
  }
  return null;
}
var lineEndOf = (src, p) => {
  const i = src.indexOf("\n", p);
  return i < 0 ? src.length : i;
};
function argWithoutMethod(src, chk, parseInfo) {
  const p = chk.pos;
  if (typeof p !== "number" || !"。．.".includes(src[p] || "")) return null;
  let e = p;
  while (e > 0 && " 	　".includes(src[e - 1])) e--;
  const last = src[e - 1] || "";
  let s0 = e, val = "";
  if (last === "）" || last === ")") {
    let depth = 0, i = e - 1;
    for (; i >= 0; i--) {
      if (src[i] === "）" || src[i] === ")") depth++;
      else if (src[i] === "（" || src[i] === "(") {
        depth--;
        if (depth === 0) break;
      } else if (src[i] === "\n") return null;
    }
    if (i < 0) return null;
    s0 = i;
  } else if (QUOTE_CLOSE4.includes(last)) {
    let i = e - 2;
    while (i >= 0 && !QUOTE_OPEN4.includes(src[i]) && src[i] !== "\n") i--;
    if (i < 0 || src[i] === "\n") return null;
    s0 = i;
  } else if (/[0-9０-９]/.test(last)) {
    let i = e - 1;
    while (i > 0 && /[0-9０-９.．\-－]/.test(src[i - 1])) i--;
    s0 = i;
  } else if (e >= 2 && /[぀-ヿ一-鿿]/.test(last) && /[0-9０-９]/.test(src[e - 2])) {
    let i = e - 2;
    while (i > 0 && /[0-9０-９.．\-－]/.test(src[i - 1])) i--;
    s0 = i;
  } else return null;
  val = src.slice(s0, e);
  const ls = src.lastIndexOf("\n", s0 - 1) + 1, before = src.slice(ls, s0);
  if ((src.slice(ls, lineEndOf(src, p)).replace(LINE_COMMENT_RE3, "$1").match(/["”“『』]/g) || []).length % 2 === 1) return null;
  const stmt = before.split(/[。．｡]/).pop();
  if (!/[！!]/.test(stmt)) return null;
  const after = src.slice(p + 1, lineEndOf(src, p)).replace(LINE_COMMENT_RE3, "$1").trim();
  if (after && !/^[^\s　！!。．.｡「」]+[\s　]*[！!＝=]/.test(after) && !/^[」]/.test(after)) return null;
  const r = parseInfo(src.slice(0, e) + " 歩く" + src.slice(e));
  if (!r.ok && !(typeof r.pos === "number" && r.pos > p + 3)) return null;
  const ln = (src.slice(0, e).match(/\n/g) || []).length + 1;
  return {
    category: "ARG_WITHOUT_METHOD",
    line: ln,
    subdetail: `line${ln}`,
    userMessage: `${ln}行目の【${val}】の後に、何をするかの命令の名前がありません。値の後には命令の名前を書きます（いらない値なら消します）。`
  };
}
var HALFWIDTH = { "｡": "。", "｢": "「", "｣": "」" };
function halfwidthPunct(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  const hits = [];
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    if (QUOTE_OPEN4.includes(ch)) {
      i++;
      while (i < src.length && !QUOTE_CLOSE4.includes(src[i]) && src[i] !== "\n") i++;
      continue;
    }
    if (HALFWIDTH[ch]) hits.push(i);
  }
  if (!hits.length || hits[0] > chk.pos) return null;
  let fixed = src;
  for (const i of hits) fixed = fixed.slice(0, i) + HALFWIDTH[src[i]] + fixed.slice(i + 1);
  const r = parseInfo(fixed);
  if (!r.ok && !(typeof r.pos === "number" && r.pos > chk.pos)) return null;
  const ln = (src.slice(0, hits[0]).match(/\n/g) || []).length + 1;
  const kinds = [...new Set(hits.map((i) => src[i]))];
  return {
    category: "HALFWIDTH_PUNCT",
    line: ln,
    subdetail: `line${ln}`,
    fixedSrc: fixed,
    userMessage: `${ln}行目に半角の${kinds.map((k) => `【${k}】`).join("")}があります。ドリトルでは全角の${kinds.map((k) => `【${HALFWIDTH[k]}】`).join("")}を使います。`
  };
}
function gluedSites(src, from, to, names2) {
  const out = [];
  let inStr = null;
  for (let i = 0; i < Math.min(to, src.length - 1); i++) {
    const ch = src[i];
    if (inStr) {
      if (QUOTE_CLOSE4.includes(ch) || ch === "\n") inStr = null;
      continue;
    }
    if (QUOTE_OPEN4.includes(ch)) {
      inStr = true;
      continue;
    }
    if (ch === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    if (i + 1 < from || !/[0-9０-９]/.test(ch)) continue;
    const w = /^[^\s　0-9０-９.．。｡！!、,（(）)「」＝=：:＋+－\-＊*／/"”“『』]+/.exec(src.slice(i + 1));
    if (!w) continue;
    const unit = (/^(ミリ秒|ドット|ピクセル|歩|回|度|秒|個|本|つ|分|枚|倍|ｃｍ|cm|ｍｍ|mm)/.exec(w[0]) || [""])[0];
    let name = "";
    for (const u of unit ? [unit, ""] : [""]) {
      const rest = w[0].slice(u.length);
      for (let k = Math.min(rest.length, 12); k >= 2; k--) if (names2.has(rest.slice(0, k))) {
        name = rest.slice(0, k);
        break;
      }
      if (name) {
        out.push({ at: i + 1 + u.length, name, unit: u });
        break;
      }
    }
  }
  return out;
}
function progressed(r, chk, at, delta) {
  if (!r) return false;
  if (r.ok) return true;
  return typeof r.pos === "number" && typeof chk.pos === "number" && r.pos + (at < chk.pos ? -delta : 0) > chk.pos;
}
var lineOfPos = (src, p) => (src.slice(0, p).match(/\n/g) || []).length + 1;
function nearLines(src, chk) {
  const ls0 = src.lastIndexOf("\n", chk.pos - 1) + 1, le = (() => {
    const e = src.indexOf("\n", chk.pos);
    return e < 0 ? src.length : e;
  })();
  const ls = src.lastIndexOf("\n", ls0 - 2) + 1;
  return [ls, le];
}
function bangBeforeAssign(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  const [ls, le] = nearLines(src, chk);
  const seg = src.slice(ls, le).replace(LINE_COMMENT_RE3, "$1");
  {
    const re2 = /([^\s　！!＝=：:。．｡「」（）()"”“『』\/／]+)[ \t　]*([！!])[ \t　]*(タートル|ボタン|ラベル|フィールド|タイマー|図形|配列|色|リスト|選択メニュー|スライダー|音|メロディ|楽器|画像)[ \t　]*[！!]/g;
    let m2;
    while (m2 = re2.exec(seg)) {
      const at = ls + m2.index + m2[0].indexOf(m2[2], m2[1].length);
      const fixed = src.slice(0, at) + "＝" + src.slice(at + 1), r = parseInfo(fixed);
      if (!progressed(r, chk, at, 0)) continue;
      const ln = lineOfPos(src, at);
      return {
        category: "WRONG_SEND_SYMBOL",
        line: ln,
        subdetail: `line${ln}`,
        fixedSrc: fixed,
        parseOk: !!r.ok,
        userMessage: `${ln}行目の【${m2[1]}${m2[2]}${m2[3]}】は、作ったものに名前を付けるときは【${m2[1]}＝${m2[3]}！作る】のように【＝】を使います（【！】は命令を送る記号です）。`
      };
    }
  }
  const re = /([^\s　！!＝=：:。．｡「」（）()"”“『』\/／]+)[ \t　]*([！!])[ \t　]*(?:([^\s　！!＝=：:。．｡「」（）()"”“『』0-9０-９\/／]+)[ \t　]*)?([＝=])(?![＝=])/g;
  let m;
  while (m = re.exec(seg)) {
    const name = m[1], prop = m[3] || "", bangAt = ls + m.index + m[0].indexOf(m[2], name.length);
    if (/^(もし|ならば|そうでなければ|ずっと|繰り返す|実行)$/.test(name)) continue;
    let fixed, ln = lineOfPos(src, bangAt), msg;
    if (!prop) {
      fixed = src.slice(0, bangAt) + src.slice(bangAt + 1);
      msg = `${ln}行目の【${name}${m[2]}${m[4]}】は【！】が余分です。名前に入れるときは【${name}＝…】のように【＝】だけを書きます。`;
    } else {
      fixed = src.slice(0, bangAt) + "：" + src.slice(bangAt + 1);
      msg = `${ln}行目の【${name}${m[2]}${prop}${m[4]}】は、属性を決めるときは【！】でなく【：】を使い、【${name}：${prop}＝…】と書きます。`;
    }
    const r = parseInfo(fixed);
    if (!progressed(r, chk, bangAt, prop ? 0 : 1)) continue;
    return { category: prop ? "WRONG_SEND_SYMBOL" : "EXTRA_SYMBOL", line: ln, subdetail: `line${ln}`, fixedSrc: fixed, parseOk: !!r.ok, userMessage: msg };
  }
  return null;
}
function trailingBang(src, chk, parseInfo, names2) {
  if (typeof chk.pos !== "number") return null;
  const [ls, le] = nearLines(src, chk);
  const seg = src.slice(ls, le).replace(LINE_COMMENT_RE3, "$1");
  const res = [
    /([^\s　！!]+)[ \t　]*([！!]+)(?=[ \t　]*(?:[。．｡」]|$))/gm,
    /(?<![^\s　（(＝=！!。．｡「])([0-9０-９.．]+)[ \t　]*([！!])(?=[ \t　]*[^\s　！!＝=。．｡」])/g,
    /([^\s　！!＝=：:。．｡「」（）()"”“『』0-9０-９]+)[ \t　]*([！!])(?=[ \t　]*[^\s　！!＝=。．｡」（(0-9０-９"”“『])/g,
    /(?<![^\s　（(！!。．｡「])([0-9０-９.．]+)[ \t　]*([＝=])(?![＝=])(?=[ \t　]*[^\s　！!＝=。．｡」0-9０-９])/g
  ];
  for (const [ri, re] of res.entries()) {
    let m;
    while (m = re.exec(seg)) {
      const bangAt = ls + m.index + m[0].indexOf(m[2], m[1].length), nBang = m[2].length;
      if (/[」]$/.test(m[1])) continue;
      const isNum = /^[0-9０-９.．]+$/.test(m[1]);
      if (!isNum && !(names2 && names2.has(m[1]))) continue;
      if (ri === 2 && !(names2 && names2.has((/^[ \t　]*([^\s　！!＝=。．｡」（(]+)/.exec(seg.slice(m.index + m[0].length)) || [])[1] || ""))) continue;
      if (ri === 2 && RECEIVER_WORDS.test(m[1])) continue;
      const stmtFrom = Math.max(src.lastIndexOf("。", bangAt - 1), src.lastIndexOf("．", bangAt - 1), src.lastIndexOf("｡", bangAt - 1), src.lastIndexOf("「", bangAt - 1), src.lastIndexOf("\n", bangAt - 1)) + 1;
      if (!/[！!]/.test(src.slice(stmtFrom, bangAt))) continue;
      if (isNum && /」[ \t　]*$/.test(src.slice(stmtFrom, bangAt).replace(/[0-9０-９.． \t　]+$/, ""))) continue;
      const fixed = src.slice(0, bangAt) + src.slice(bangAt + nBang);
      const r = parseInfo(fixed);
      if (!progressed(r, chk, bangAt, nBang)) continue;
      const ln = lineOfPos(src, bangAt);
      return {
        category: "EXTRA_SYMBOL",
        line: ln,
        subdetail: `line${ln}`,
        fixedSrc: fixed,
        parseOk: !!r.ok,
        userMessage: ri === 3 ? `${ln}行目の【${m[1].slice(-8)}${m[2]}】の【${m[2]}】は余分です。【＝】は【名前＝値】の形で名前に値を入れるときに使い、命令に渡す値の後には書きません。` : `${ln}行目の【${m[1].slice(-8)}${m[2]}】の【${m[2]}】は余分です。【！】は命令を送る相手の名前の後に 1 つだけ書き、続けて書く命令の間には書きません。`
      };
    }
  }
  return null;
}
function strayBar(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  const [ls, le] = nearLines(src, chk);
  const seg = src.slice(ls, le).replace(LINE_COMMENT_RE3, "$1");
  const bars = [...seg.matchAll(/[|｜]/g)].map((m) => ls + m.index);
  if (bars.length !== 1) return null;
  const at = bars[0], ln = lineOfPos(src, at);
  if (/「[^\n「」]{0,6}$/.test(src.slice(ls, at))) return null;
  const asBang = src.slice(0, at) + "！" + src.slice(at + 1), rb = parseInfo(asBang);
  if (!/^[ \t　]*[！!]/.test(src.slice(at + 1, le)) && /[^\s　！!＝=：:。．｡「」（）()"”“『』]$/.test(src.slice(ls, at).replace(/[ \t　]+$/, "")) && progressed(rb, chk, at, 0))
    return {
      category: "WRONG_SEND_SYMBOL",
      line: ln,
      subdetail: `line${ln}`,
      fixedSrc: asBang,
      parseOk: !!rb.ok,
      userMessage: `${ln}行目の【${src[at]}】は、命令を送る記号【！】の打ち間違いのようです。【！】に直します。`
    };
  const fixed = src.slice(0, at) + src.slice(at + 1);
  const r = parseInfo(fixed);
  if (!progressed(r, chk, at, 1)) return null;
  return {
    category: "EXTRA_SYMBOL",
    line: ln,
    subdetail: `line${ln}`,
    fixedSrc: fixed,
    parseOk: !!r.ok,
    userMessage: `${ln}行目の【${src[at]}】は余分です。【｜】はブロックの引数を【「｜ｘ｜ …」】のように書くときにだけ使います。`
  };
}
function wrongColon(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  const [ls, le] = nearLines(src, chk);
  const seg = src.slice(ls, le).replace(LINE_COMMENT_RE3, "$1");
  const re = /([^\s　！!＝=：:；;、,。．｡「」（）()"”“『』]+)[ \t　]*([；;、,])[ \t　]*([^\s　！!＝=：:；;、,。．｡「」（）()"”“『』]+)[ \t　]*(?=([＝=])(?![＝=]))/g;
  let m;
  while (m = re.exec(seg)) {
    const lineStartIn = seg.lastIndexOf("\n", m.index - 1) + 1, before = seg.slice(lineStartIn, m.index).trim();
    if (before && !/[。．｡「]$/.test(before)) continue;
    const at = ls + m.index + m[0].indexOf(m[2], m[1].length);
    const fixed = src.slice(0, at) + "：" + src.slice(at + 1), r = parseInfo(fixed);
    if (!progressed(r, chk, at, 0)) continue;
    const ln = lineOfPos(src, at);
    return {
      category: "WRONG_COLON",
      line: ln,
      subdetail: `line${ln}`,
      fixedSrc: fixed,
      parseOk: !!r.ok,
      userMessage: `${ln}行目の【${m[1]}${m[2]}${m[3]}${m[4]}】の【${m[2]}】は、属性を決める【：】の打ち間違いです。【${m[1]}：${m[3]}＝…】と書きます。`
    };
  }
  return null;
}
function commentSymbol(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  const [ls, le] = nearLines(src, chk);
  const seg = src.slice(ls, le);
  const cands = [];
  for (const m of seg.matchAll(/(^|\n)([ \t　]*)\/(?![\/*])/g)) cands.push({ at: ls + m.index + m[1].length + m[2].length, len: 1, tok: "/" });
  for (const m of seg.matchAll(/(^|[\s　。．｡])#/g)) cands.push({ at: ls + m.index + m[1].length, len: 1, tok: "#" });
  for (const m of seg.matchAll(/\/\*/g)) {
    const e = seg.indexOf("*/", m.index + 2);
    cands.push({ at: ls + m.index, len: 2, tok: "/*", end: e < 0 ? -1 : ls + e });
  }
  for (const c of cands) {
    const lineStart2 = src.lastIndexOf("\n", c.at - 1) + 1;
    if ((src.slice(lineStart2, c.at).match(/["”“『]/g) || []).length % 2 === 1) continue;
    let fixed = src.slice(0, c.at) + "//" + src.slice(c.at + c.len);
    if (c.end >= 0) {
      const e2 = c.end + 1;
      const lineEnd2 = fixed.indexOf("\n", c.at);
      if (lineEnd2 < 0 || e2 < lineEnd2) fixed = fixed.slice(0, e2) + fixed.slice(e2 + 2);
      else continue;
    }
    const r = parseInfo(fixed);
    if (!progressed(r, chk, c.at, c.len - 2)) continue;
    const ln = lineOfPos(src, c.at);
    return {
      category: "COMMENT_SYMBOL",
      line: ln,
      subdetail: `line${ln}`,
      fixedSrc: fixed,
      parseOk: !!r.ok,
      userMessage: `${ln}行目の【${c.tok}】はドリトルのコメントの記号ではありません。コメント（メモ）は【//】の後に書きます（その行の終わりまでがコメントになります）。`
    };
  }
  return null;
}
function missingAssign(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  const [ls, le] = nearLines(src, chk);
  const seg = src.slice(ls, le).replace(LINE_COMMENT_RE3, "$1");
  const tries = [];
  for (const m of seg.matchAll(/([^\s　！!＝=：:。．｡「」（）()"”“『』]+[ \t　]*[：:][ \t　]*[^\s　！!＝=：:。．｡「」（）()"”“『』]+)[ \t　]*(?=「)/g)) tries.push({ at: ls + m.index + m[1].length, head: m[1], form: "prop" });
  for (const m of seg.matchAll(/(^|\n)([ \t　]*)([^\s　！!＝=：:。．｡「」（）()"”“『』0-9０-９]+)[ \t　]+(?=(タートル|ボタン|ラベル|フィールド|タイマー|図形|配列|色|リスト|選択メニュー|スライダー|音|メロディ|楽器|画像)[ \t　]*[！!])/g)) tries.push({ at: ls + m.index + m[1].length + m[2].length + m[3].length, head: m[3], form: "name" });
  for (const t of tries) {
    const fixed = src.slice(0, t.at) + "＝" + src.slice(t.at), r = parseInfo(fixed);
    if (!progressed(r, chk, t.at, 1)) continue;
    const ln = lineOfPos(src, t.at);
    const rest = (/^[ \t　]*([^\s　]+[ \t　]*[！!][ \t　]*[^\s　。．｡]*)/.exec(src.slice(t.at)) || [, src.slice(t.at).split("\n")[0].trim().slice(0, 6)])[1].replace(/[ \t　]+/g, "");
    return {
      category: "MISSING_ASSIGN",
      line: ln,
      subdetail: `line${ln}`,
      fixedSrc: fixed,
      parseOk: !!r.ok,
      userMessage: t.form === "prop" ? `${ln}行目の【${t.head}】の後に、属性に入れる【＝】が抜けています。【${t.head}＝「…」】のように書きます。` : `${ln}行目の【${t.head} ${rest}】は、作ったものに名前を付ける【＝】が抜けています。【${t.head}＝${rest}】のように書きます。`
    };
  }
  return null;
}
function numberSymbol(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  const [ls, le] = nearLines(src, chk);
  const seg = src.slice(ls, le).replace(LINE_COMMENT_RE3, "$1");
  const tries = [];
  for (const m of seg.matchAll(/(?<![^\s　（(＝=！!、,])([0-9０-９]+)([,，・])([0-9０-９]+)/g)) tries.push({ at: ls + m.index + m[1].length, from: m[2], to: ".", num: m[1] + m[2] + m[3], fixedNum: m[1] + "." + m[3], what: "小数点" });
  for (const m of seg.matchAll(/([0-9０-９.．]+|[）)])[ \t　]*([ーｰ])[ \t　]*([0-9０-９.．]+|[（(])/g)) tries.push({ at: ls + m.index + m[0].indexOf(m[2], m[1].length), from: m[2], to: "−", num: m[0], fixedNum: m[0].replace(m[2], "−"), what: "マイナス" });
  for (const t of tries) {
    const fixed = src.slice(0, t.at) + t.to + src.slice(t.at + 1), r = parseInfo(fixed);
    if (!progressed(r, chk, t.at, 0)) continue;
    const ln = lineOfPos(src, t.at);
    return {
      category: "NUMBER_SYMBOL",
      line: ln,
      subdetail: `line${ln}`,
      fixedSrc: fixed,
      parseOk: !!r.ok,
      userMessage: t.what === "小数点" ? `${ln}行目の【${t.num}】の【${t.from}】は小数点ではありません。小数点は【.】で、【${t.fixedNum}】と書きます。` : `${ln}行目の【${t.num}】の【${t.from}】は長音記号（のばす音）で、マイナスではありません。引き算やマイナスの数は【−】で、【${t.fixedNum}】と書きます。`
    };
  }
  return null;
}
function wrongParamBar(src, chk, parseInfo) {
  if (typeof chk.pos !== "number") return null;
  const [ls, le] = nearLines(src, chk);
  const seg = src.slice(ls, le).replace(LINE_COMMENT_RE3, "$1");
  const re = /「[ \t　]*([I1lｌ１Ｉ])([a-zA-Zｘｙｚ][a-zA-Zｘｙｚ ]{0,8}?)([I1lｌ１Ｉ|｜])(?=[ \t　「！!]|$)/g;
  let m;
  while (m = re.exec(seg)) {
    const a = ls + m.index + m[0].indexOf(m[1]), b = ls + m.index + m[0].length - 1;
    let fixed = src.slice(0, a) + "|" + src.slice(a + 1);
    if (!"|｜".includes(m[3])) fixed = fixed.slice(0, b) + "|" + fixed.slice(b + 1);
    const r = parseInfo(fixed);
    if (!progressed(r, chk, a, 0)) continue;
    const ln = lineOfPos(src, a);
    return {
      category: "WRONG_PARAM_BAR",
      line: ln,
      subdetail: `line${ln}`,
      fixedSrc: fixed,
      parseOk: !!r.ok,
      userMessage: `${ln}行目の【${m[1]}${m[2]}${m[3]}】は、ブロックの引数を囲む縦棒【｜】を似た字で打っています。【「｜${m[2].trim()}｜ …」】のように縦棒【｜】で囲みます。`
    };
  }
  return null;
}
function numWordGlued(src, chk, parseInfo, names2) {
  if (typeof chk.pos !== "number" || !names2 || !names2.size) return null;
  const from = src.lastIndexOf("\n", Math.max(0, src.lastIndexOf("\n", chk.pos - 1) - 1)) + 1;
  const sites = gluedSites(src, from, chk.pos + 1, names2);
  for (let j = sites.length - 1; j >= 0; j--) {
    const { at, name, unit = "" } = sites[j];
    const s2 = src.slice(0, at) + " " + src.slice(at);
    const r = parseInfo(s2);
    if (!(r.ok || typeof r.pos === "number" && r.pos > chk.pos + 1)) continue;
    let fixed = s2;
    for (let k = 0; k < 30; k++) {
      const rk = parseInfo(fixed);
      if (rk.ok || typeof rk.pos !== "number") break;
      const more = gluedSites(fixed, 0, rk.pos + 1, names2);
      let done = false;
      for (let q = more.length - 1; q >= 0; q--) {
        const f2 = fixed.slice(0, more[q].at) + " " + fixed.slice(more[q].at), r2 = parseInfo(f2);
        if (r2.ok || typeof r2.pos === "number" && r2.pos > rk.pos + 1) {
          fixed = f2;
          done = true;
          break;
        }
      }
      if (!done) break;
    }
    const all = gluedSites(src, 0, src.length, names2);
    let allFixed = src;
    for (let q = all.length - 1; q >= 0; q--) allFixed = allFixed.slice(0, all[q].at) + " " + allFixed.slice(all[q].at);
    const ra = parseInfo(allFixed), rf = parseInfo(fixed);
    if (ra.ok || !rf.ok && typeof ra.pos === "number" && typeof rf.pos === "number" && ra.pos >= rf.pos) fixed = allFixed;
    let b = at - unit.length - 1;
    while (b > 0 && /[0-9０-９.．]/.test(src[b - 1])) b--;
    const num = src.slice(b, at), ln = (src.slice(0, at).match(/\n/g) || []).length + 1;
    const others = fixed === allFixed ? all.length - 1 : 0;
    return {
      category: "NUM_WORD_GLUED",
      line: ln,
      subdetail: `line${ln}`,
      fixedSrc: fixed,
      userMessage: `${ln}行目の【${num}${name}】は、数と命令の間に空白が必要です。【${num} ${name}】のように書きます。` + (others > 0 ? `（ほかに ${others} か所、同じ形があります）` : "")
    };
  }
  return null;
}
var STRUCTURAL = /* @__PURE__ */ new Set([
  "NUM_WORD_GLUED",
  "HALFWIDTH_PUNCT",
  "UNCLOSED_BLOCK",
  "UNCLOSED_PAREN",
  "UNCLOSED_STRING",
  "UNCLOSED_PARAM",
  "UNSUPPORTED_OP",
  "ESCAPE_SEQ",
  "NO_LHS",
  "NO_VALUE",
  "NO_OPERAND",
  "NO_LEFT_OPERAND",
  "OBJECT_OUTSIDE_BLOCK",
  "BANG_WITHOUT_METHOD",
  "DOUBLE_BANG",
  "DOUBLE_PERIOD"
]);
var TRUSTED_FIX = /* @__PURE__ */ new Set([
  "WRONG_PARAM_BAR",
  "MISSING_ASSIGN",
  "NUMBER_SYMBOL",
  "WRONG_COLON",
  "COMMENT_SYMBOL",
  "REPEAT_WITHOUT_BLOCK",
  "UNQUOTED_FILENAME",
  "WRONG_BRACKET",
  "PERIOD_MISSING",
  "NUM_WORD_GLUED",
  "PERIOD_BETWEEN",
  "HALFWIDTH_PUNCT",
  "DOUBLE_BANG",
  "DOUBLE_PERIOD",
  "EXTRA_SYMBOL",
  "ASSIGN_IN_CONDITION",
  "UNKNOWN_METHOD",
  "UNCLOSED_PAREN",
  "UNCLOSED_BLOCK",
  "EXTRA_PERIOD",
  "MISSING_EXECUTE",
  "MISSING_BANG",
  "TIMER_PROTO_EXECUTE"
]);
var CLASS_NAMES = /^(タートル|ボタン|ラベル|フィールド|タイマー|図形|配列|色|リスト|選択メニュー|スライダー|音|メロディ|楽器|システム|ルート)$/;
var RECEIVER_WORDS = /^(タートル|ボタン|ラベル|フィールド|タイマー|図形|配列|色|リスト|選択メニュー|スライダー|音|メロディ|楽器|システム|ルート|画像|自分|相手|画面|時計|かめた|かめぞう)$/;
function isTrustedFix(d, src) {
  if (!d || !d.fixedSrc || !TRUSTED_FIX.has(d.category)) return false;
  const fixed = d.fixedSrc;
  let i = 0;
  while (i < src.length && src[i] === fixed[i]) i++;
  const before = src.slice(0, i), after = src.slice(i);
  if (d.category === "WRONG_BRACKET" || d.category === "UNQUOTED_FILENAME" || d.category === "REPEAT_WITHOUT_BLOCK") return !!d.parseOk;
  if (["WRONG_COLON", "COMMENT_SYMBOL", "MISSING_ASSIGN", "NUMBER_SYMBOL", "WRONG_PARAM_BAR"].includes(d.category)) return true;
  if (d.category === "UNCLOSED_BLOCK" || d.category === "UNCLOSED_PAREN") return !!d.fix;
  if (d.category === "MISSING_EXECUTE") return !/^[\s　]*[。．.][\s　]*実行/.test(after);
  if (d.category === "PERIOD_MISSING") {
    const ls = src.lastIndexOf("\n", i - 1) + 1, line = src.slice(ls, i).replace(LINE_COMMENT_RE3, "$1");
    if (/[！!」]/.test(line)) return true;
    if (/[=＝]/.test(line)) return !/[=＝][\s　]*(タートル|ボタン|ラベル|フィールド|タイマー|図形|配列|色|リスト|選択メニュー|スライダー|音|メロディ|楽器)/.test(line);
    const prev = src.slice(0, ls).replace(/\s+$/, "").split("\n").pop().replace(LINE_COMMENT_RE3, "$1").trim();
    return /[！!]/.test(prev) && !/[。．.｡]$/.test(prev);
  }
  if (d.category === "EXTRA_PERIOD") {
    if (/[0-9０-９][\s　]*$/.test(before) && /^[．.][\s　]*[0-9０-９]/.test(after)) return false;
    return after.slice(1).split("\n")[0].replace(LINE_COMMENT_RE3, "$1").trim() !== "";
  }
  if (d.category === "MISSING_BANG") {
    const b = before.replace(/[ \t　]+$/, "");
    if (b.endsWith("」")) return true;
    const w = (/([^\s　！!。．.｡、,（(）)「」＝=：:＋+－\-＊*／/"”“『』]+)$/.exec(b) || [])[1] || "";
    if (!w || /^[0-9０-９]/.test(w)) return false;
    if (CLASS_NAMES.test(w)) return true;
    const esc = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[\\s　。．｡「])${esc}[\\s　]*[=＝:：]`).test(src.slice(0, b.length - w.length));
  }
  return true;
}
function diagnoseProgram(src, methodNames2, deps2, engine = "sfirst") {
  src = String(src || "").replace(/\r\n?/g, "\n");
  const d = diagnoseProgramRaw(src, methodNames2, deps2, engine);
  return d ? { ...d, fixTrusted: isTrustedFix(d, src) } : d;
}
function diagnoseProgramRaw(src, methodNames2, deps2, engine = "sfirst") {
  const { classify: classify2, CATEGORY_MESSAGES: CATEGORY_MESSAGES2, repairDiagnose, REPAIR_MESSAGES: REPAIR_MESSAGES2 } = deps2;
  const checker = deps2.checker || (deps2.checker = makeChecker(deps2.parser, deps2.parserKind || "ba"));
  const { checkSyntaxLocal, parseInfo } = checker;
  const chk = checkSyntaxLocal(src);
  if (chk && !chk.ok && deps2.language) {
    const lang = deps2.language.isDolittle(src);
    if (!lang.ok) return { category: "NOT_DOLITTLE", line: null, subdetail: lang.reason, userMessage: deps2.language.NOT_DOLITTLE_MESSAGE, via: "language", chk, language: lang };
  }
  const chkLine1 = !chk ? null : typeof chk.pos === "number" ? (src.slice(0, chk.pos).match(/\n/g) || []).length + 1 : typeof chk.finalPos === "number" ? chk.line : typeof chk.line === "number" ? chk.line + 1 : null;
  const viaClassify = () => {
    const r2 = classify2({
      srcText: src,
      pos: chk && typeof chk.pos === "number" ? chk.pos : null,
      checkerOk: chk ? chk.ok : false,
      checkerLine: chkLine1,
      checkerMessage: chk && chk.message ? chk.message : ""
    }, methodNames2);
    const m = /^line(\d+)$/.exec(String(r2.subdetail || ""));
    return {
      category: r2.category,
      line: m ? parseInt(m[1], 10) : r2.lineNo || null,
      subdetail: r2.subdetail || "",
      userMessage: r2.userMessage,
      via: "classify",
      chk
    };
  };
  const viaRepair = () => {
    const d = repairDiagnose(src, parseInfo, { methodNames: methodNames2 });
    if (!d) return null;
    let userMessage = REPAIR_MESSAGES2 && REPAIR_MESSAGES2[d.category] || CATEGORY_MESSAGES2[d.category] || d.category;
    if (d.category === "PERIOD_BETWEEN" && d.word) userMessage += `【${d.word}】の前に【。】が抜けています。`;
    return {
      category: d.category,
      line: d.line,
      subdetail: d.subdetail,
      userMessage,
      via: "repair",
      chk,
      repairs: d.repairs,
      fixedSrc: d.firstFixedSrc
    };
  };
  if (chk && chk.ok && deps2.lint && engine !== "classify") {
    const f = deps2.lint(src, deps2.lintNames || methodNames2, deps2.lintHelpers || {});
    if (f && f.length) {
      const parseOk = f[0].category === "REPEAT_WITHOUT_BLOCK" && f[0].fixedSrc ? !!parseInfo(f[0].fixedSrc).ok : void 0;
      return { ...f[0], ...parseOk === void 0 ? {} : { parseOk }, via: "lint", chk, others: f.slice(1) };
    }
  }
  if (!chk || chk.ok || engine === "classify") return viaClassify();
  if (engine === "repair") return viaRepair() || { ...viaClassify(), category: "OTHER", userMessage: CATEGORY_MESSAGES2.OTHER };
  if (engine === "hybrid") return viaRepair() || viaClassify();
  if (engine === "cfirst") {
    const c2 = viaClassify();
    return c2.category !== "OTHER" ? c2 : viaRepair() || c2;
  }
  if (chk.pos == null && typeof chk.finalPos === "number") return viaClassify();
  const hw = halfwidthPunct(src, chk, parseInfo);
  if (hw) return { ...hw, chk, via: "classify" };
  const wb = wrongBracket(src, chk, parseInfo);
  if (wb) return { ...wb, chk, via: "classify" };
  const uf = unquotedFilename(src, chk, parseInfo);
  if (uf) return { ...uf, chk, via: "classify" };
  const rw = repeatWithoutBlock(src, chk, parseInfo);
  if (rw) return { ...rw, chk, via: "classify" };
  const am = argWithoutMethod(src, chk, parseInfo);
  if (am) return { ...am, chk, via: "classify" };
  const glue = numWordGlued(src, chk, parseInfo, deps2.lintNames || methodNames2);
  if (glue) return { ...glue, chk, via: "classify" };
  const ba = bangBeforeAssign(src, chk, parseInfo);
  if (ba) return { ...ba, chk, via: "classify" };
  const tb = trailingBang(src, chk, parseInfo, methodNames2);
  if (tb) return { ...tb, chk, via: "classify" };
  const sb = strayBar(src, chk, parseInfo);
  if (sb) return { ...sb, chk, via: "classify" };
  const wc = wrongColon(src, chk, parseInfo);
  if (wc) return { ...wc, chk, via: "classify" };
  const cs = commentSymbol(src, chk, parseInfo);
  if (cs) return { ...cs, chk, via: "classify" };
  const wp = wrongParamBar(src, chk, parseInfo);
  if (wp) return { ...wp, chk, via: "classify" };
  const ma = missingAssign(src, chk, parseInfo);
  if (ma) return { ...ma, chk, via: "classify" };
  const ns = numberSymbol(src, chk, parseInfo);
  if (ns) return { ...ns, chk, via: "classify" };
  const c = viaClassify();
  if ((c.category === "UNCLOSED_BLOCK" || c.category === "UNCLOSED_PAREN") && typeof chk.pos === "number") {
    const stopLine = (src.slice(0, chk.pos).match(/\n/g) || []).length + 1;
    const [o, cl] = c.category === "UNCLOSED_BLOCK" ? ["「", "」"] : ["（", "）"];
    const firstOpen = firstUnmatchedOpen(src, o, cl);
    const lastOpenLine = firstOpen < 0 ? 0 : (src.slice(0, firstOpen).match(/\n/g) || []).length + 1;
    if (/^\+/.test(String(c.subdetail || "")) && lastOpenLine > stopLine) {
      const r2 = viaRepair();
      if (r2 && r2.line <= stopLine + 1) return { ...r2, userMessage: r2.userMessage + `（このほか、${lastOpenLine}行目の【${o}】も閉じていません）` };
    }
  }
  if ((c.category === "UNCLOSED_BLOCK" || c.category === "UNCLOSED_PAREN") && deps2.locateMissingClose) {
    const [o, cl] = c.category === "UNCLOSED_BLOCK" ? ["「", "」"] : ["（", "）"];
    const extra = /^-/.test(String(c.subdetail || ""));
    if (typeof chk.pos === "number") {
      const ls = src.lastIndexOf("\n", chk.pos - 1) + 1;
      const atHead = src.slice(ls, chk.pos).trim() === "";
      let e = ls - 1, prev = "";
      while (e > 0) {
        const s0 = src.lastIndexOf("\n", e - 1) + 1;
        prev = src.slice(s0, e).replace(LINE_COMMENT_RE3, "$1").trim();
        if (prev) break;
        e = s0 - 1;
      }
      const opens = (prev.match(/「/g) || []).length, closes = (prev.match(/」/g) || []).length;
      if (atHead && prev && !/[。．.｡「」|｜]$/.test(prev) && opens <= closes) {
        const r2 = viaRepair();
        if (r2 && r2.category === "PERIOD_MISSING") return { ...r2, userMessage: r2.userMessage + `（このほか、ブロックや括弧の数も合っていません: ${c.userMessage}）` };
      }
    }
    if (extra && c.category === "UNCLOSED_BLOCK" && typeof chk.pos === "number") {
      const [ls0, le0] = [src.lastIndexOf("\n", chk.pos - 1) + 1, (() => {
        const e = src.indexOf("\n", chk.pos);
        return e < 0 ? src.length : e;
      })()];
      for (const ls of [ls0, src.lastIndexOf("\n", ls0 - 2) + 1]) {
        const le = src.indexOf("\n", ls) < 0 ? src.length : src.indexOf("\n", ls);
        const line = src.slice(ls, le).replace(LINE_COMMENT_RE3, "$1");
        const m = /」[ \t　]*([！!])?[ \t　]*(?:[0-9０-９]+|[（(][^）)]*[）)])[ \t　]*(回)?[ \t　]*繰り返す/.exec(line);
        if (!m || !/[！!]/.test(line.slice(0, m.index))) continue;
        const m2 = /([＝=][ \t　]*「)[ \t　]*(?=[！!])/.exec(line.slice(0, m.index)) || /(「[ \t　]*[|｜][^|｜\n]*[|｜])[ \t　]*(?=[^\s　「」])/.exec(line.slice(0, m.index));
        if (line.slice(0, m.index).includes("「")) {
          if (!m2) continue;
          const at = ls + m2.index + m2[0].length;
          const fixed2 = src.slice(0, at) + "「" + src.slice(at), r3 = parseInfo(fixed2), ln2 = lineOfPos(src, at);
          return {
            ...c,
            line: ln2,
            subdetail: `line${ln2}`,
            fixedSrc: fixed2,
            fix: r3 && r3.ok ? { pos: at, line: ln2, text: "「" } : null,
            userMessage: `${ln2}行目の【${line.slice(0, m2.index + m2[0].length).trim().slice(-10)}】の後に、繰り返す命令を囲む【「】が抜けています。【名前：属性＝「 「！１００ 歩く」！５回 繰り返す 」。】のように、ブロックの中にもう 1 組の【「】と【」】が要ります。`
          };
        }
        const indent = (/^[ \t　]*/.exec(line) || [""])[0].length;
        const closeAt = ls + m.index;
        let fixed = src.slice(0, closeAt + 1) + (m[1] ? "" : "！") + src.slice(closeAt + 1);
        fixed = fixed.slice(0, ls + indent) + "「" + fixed.slice(ls + indent);
        const r2 = parseInfo(fixed), ln = lineOfPos(src, ls);
        const head = line.trim().slice(0, 8);
        return {
          ...c,
          line: ln,
          subdetail: `line${ln}`,
          fixedSrc: fixed,
          fix: r2 && r2.ok ? { pos: ls + indent, line: ln, text: "「" } : null,
          userMessage: `${ln}行目の【${head}】の前に【「】が抜けています。繰り返す命令は【「かめた！１００ 歩く」！４ 繰り返す】のように【「】と【」】で囲みます${m[1] ? "" : "（【」】の後の【！】も要ります）"}。`
        };
      }
    }
    const loc = extra ? deps2.locateExtraClose ? deps2.locateExtraClose(src, parseInfo, cl) : null : deps2.locateMissingClose(src, parseInfo, o, cl, deps2.lintNames || methodNames2);
    if (loc && loc.stage === 2) return { ...c, line: c.line, userMessage: c.userMessage + (extra ? `どの【${cl}】が余分かは、ブロックの対応を上から順に確かめてください。` : `どこに【${cl}】を補うかは、【${o}】から始まるまとまりを上から順に確かめてください。`) };
    if (loc && extra) {
      const ln = loc.line;
      const what = loc.len === 2 ? `【${cl}${src[loc.pos + 1]}】` : `【${cl}】`;
      return {
        ...c,
        line: ln,
        subdetail: `line${ln}`,
        userMessage: `${c.userMessage}${ln}行目の${what}が余分なようです。`,
        fix: loc,
        fixedSrc: src.slice(0, loc.pos) + src.slice(loc.pos + (loc.len || 1))
      };
    }
    if (loc) {
      const ln = loc.line, lineText = src.split("\n")[ln - 1] || "";
      const ls = src.lastIndexOf("\n", loc.pos - 1) + 1;
      const atStart = loc.pos === ls + (lineText.length - lineText.trimStart().length);
      const before = src.slice(ls, loc.pos).trim(), rest = lineText.slice(loc.pos - ls).replace(LINE_COMMENT_RE3, "$1").trim();
      const where = atStart ? `${ln}行目の先頭（【${lineText.trim().slice(0, 8)}】の前）` : rest === "" ? `${ln}行目の終わり` : /^[。．.｡]$/.test(rest) ? `${ln}行目の終わりの【${rest}】の前` : `${ln}行目の【${shortBefore(before)}】の後`;
      const ins = loc.text || cl;
      return {
        ...c,
        line: ln,
        subdetail: `line${ln}`,
        userMessage: `${c.userMessage}${where}に【${ins}】を補うと合います。`,
        fix: loc,
        fixedSrc: src.slice(0, loc.pos) + ins + src.slice(loc.pos)
      };
    }
  }
  if ((c.category === "UNCLOSED_BLOCK" || c.category === "UNCLOSED_PAREN") && typeof chk.pos === "number") {
    const posLine = (src.slice(0, chk.pos).match(/\n/g) || []).length + 1;
    return { ...c, line: posLine, subdetail: c.subdetail };
  }
  if (STRUCTURAL.has(c.category)) return c;
  if (deps2.lint && chk && !chk.ok) {
    const stopLine = typeof chk.pos === "number" ? (src.slice(0, chk.pos).match(/\n/g) || []).length + 1 : chk.line;
    const f = (deps2.lint(src, deps2.lintNames || methodNames2, deps2.lintHelpers || {}) || []).filter((x) => (x.category === "ASSIGN_IN_CONDITION" || x.category === "ASSIGN_IN_EXPRESSION" && x.likelyCompare) && stopLine && Math.abs(x.line - stopLine) <= 1);
    if (f.length) return { ...f[0], via: "lint", chk };
  }
  const r = viaRepair();
  if (r) return r;
  if (c.category === "PERIOD_MISSING" && typeof chk.pos === "number")
    return { ...c, category: "OTHER", userMessage: CATEGORY_MESSAGES2.OTHER, line: (src.slice(0, chk.pos).match(/\n/g) || []).length + 1 };
  if (c.category === "OTHER" && typeof chk.pos === "number") return { ...c, line: (src.slice(0, chk.pos).match(/\n/g) || []).length + 1 };
  return c;
}

// js/lib/diagnose/dolittle_categories.js
var CATEGORIES = [
  // ---- 分類でないもの ----
  { id: "PARSE_OK_BUT_LOGGED", name: "構文は正しい", source: "classify", trust: "n/a", hint: false, mutation: "（正しいプログラムが期待）" },
  { id: "EMPTY_PROGRAM", name: "プログラムが空", source: "classify", trust: "n/a", hint: false, mutation: "（作れない）" },
  { id: "OTHER", name: "原因不明", source: "classify", trust: "n/a", hint: false, mutation: "（期待にしない）" },
  {
    id: "NOT_DOLITTLE",
    name: "ドリトルのプログラムではない",
    source: "diagnose",
    trust: "n/a",
    hint: true,
    mutation: "（作れない: 正しいドリトルから他言語は作れない）",
    gold: "（他言語（Python・JavaScript・HTML）と日本語のメモ。2026-10-03 先生の指示で診断の対象から外す。判定は web/js/dolittle_language.js）"
  },
  // ---- 記号の数・対応 ----
  { id: "UNCLOSED_STRING", name: "文字列の閉じ忘れ", source: "classify", trust: "never", hint: true, mutation: ["delete_quote", "del_open_quote", "del_close_quote", "dup_quote", "ins_quote"] },
  { id: "UNCLOSED_BLOCK", name: "ブロックの閉じ忘れ", source: "classify", trust: "cond", trustNote: "補う・消す位置を探せたとき（fix あり）", hint: true, mutation: ["delete_block", "del_lblock", "del_rblock", "dup_lblock", "dup_rblock", "ins_lblock_before_word", "ins_rblock_after_word"] },
  { id: "UNCLOSED_PAREN", name: "丸かっこの閉じ忘れ", source: "classify", trust: "cond", trustNote: "補う・消す位置を探せたとき", hint: true, mutation: ["delete_paren", "del_lparen", "del_rparen", "dup_lparen", "dup_rparen", "ins_lparen", "ins_rparen"] },
  { id: "UNCLOSED_PARAM", name: "ブロックの引数「|」の閉じ忘れ", source: "classify", trust: "never", hint: true, mutation: ["delete_param_bar", "del_bar", "dup_bar", "ins_bar"] },
  { id: "WRONG_BRACKET", name: "ブロックの記号でないかっこ", source: "diagnose", trust: "cond", trustNote: "替えた版が最後まで通るとき", hint: true, mutation: ["brace_block"] },
  // ---- 文の終わり ----
  { id: "PERIOD_MISSING", name: "行末の「。」抜け", source: "repair", trust: "cond", trustNote: "行に「！」か「」」がある、または「！」のある前の行から続く文", hint: true, mutation: ["delete_final_terminator", "delete_any_terminator"] },
  { id: "PERIOD_BETWEEN", name: "文と文の間の「。」抜け", source: "repair", trust: "always", hint: true, mutation: ["delete_any_terminator"] },
  { id: "EXTRA_PERIOD", name: "文の途中の「。」", source: "repair", trust: "cond", trustNote: "同じ行の後ろに続きがあるとき（行末の「。」は消さない）", hint: true, mutation: ["insert_mid_terminator"] },
  { id: "DOUBLE_PERIOD", name: "「。。」の重なり", source: "classify", trust: "always", hint: true, mutation: ["dup_terminator"] },
  { id: "WRONG_TERMINATOR", name: "文の終わりの記号の誤り", source: "repair", trust: "never", hint: true, mutation: ["term_to_jpcomma", "ins_jpcomma"] },
  { id: "HALFWIDTH_PUNCT", name: "半角の「｡」「｢」「｣」", source: "diagnose", trust: "always", hint: true, mutation: ["halfwidth_punct"] },
  // ---- 命令を送る形 ----
  { id: "MISSING_BANG", name: "「！」抜け", source: "repair", trust: "cond", trustNote: "ブロックの後・プログラムで作った名前の後・クラス名の後だけ", hint: true, mutation: ["delete_bang"] },
  { id: "DOUBLE_BANG", name: "「！！」の重なり", source: "classify", trust: "always", hint: true, mutation: ["dup_bang"] },
  { id: "BANG_WITHOUT_METHOD", name: "「！」の後に命令が無い", source: "classify", trust: "never", hint: true, mutation: ["delete_method", "ins_bang_end"] },
  { id: "ARG_WITHOUT_METHOD", name: "値の後に命令が無い", source: "diagnose", trust: "n/a", hint: true, mutation: ["del_method_after_arg"] },
  { id: "WRONG_SEND_SYMBOL", name: "命令を送る記号の誤り", source: "repair", trust: "never", hint: true, mutation: ["bang_to_colon", "bang_to_question"] },
  { id: "WRONG_COLON", name: "属性の「：」の打ち間違い", source: "diagnose", trust: "cond", trustNote: "「：」に替えた版が先へ進むとき", hint: true, mutation: "（作れない: 正しい形に「：」の属性定義が少ない。実データ 15 本で確認）" },
  { id: "COMMENT_SYMBOL", name: "コメントの記号の誤り", source: "diagnose", trust: "cond", trustNote: "「//」に替えた版が先へ進むとき", hint: true, mutation: "（作れない）" },
  { id: "MISSING_ASSIGN", name: "「＝」抜け", source: "diagnose", trust: "cond", trustNote: "「＝」を足した版が先へ進むとき", hint: true, mutation: "（作れない: 正しい形に属性定義が少ない。gold 5 本）" },
  { id: "WRONG_PARAM_BAR", name: "引数の「｜」の打ち間違い", source: "diagnose", trust: "cond", trustNote: "「｜」に替えた版が先へ進むとき", hint: true, mutation: "（作れない）" },
  { id: "NUMBER_SYMBOL", name: "数の記号の違い", source: "diagnose", trust: "cond", trustNote: "記号を替えた版が先へ進むとき", hint: true, mutation: "（作れない）" },
  { id: "EXTRA_SYMBOL", name: "余分な記号", source: "repair", trust: "always", hint: true, mutation: ["ins_jpcomma", "ins_bang_end"] },
  // 文末の「！」は BANG_WITHOUT_METHOD とどちらでも正解
  { id: "NUM_WORD_GLUED", name: "数と命令名の間の空白抜け", source: "diagnose", trust: "always", hint: true, mutation: ["glue_number_word", "glue_num_word"] },
  { id: "UNQUOTED_FILENAME", name: 'ファイル名を「"」で囲んでいない', source: "diagnose", trust: "cond", trustNote: "囲んだ版が最後まで通るとき", hint: true, mutation: ["unquote_filename"] },
  { id: "REPEAT_WITHOUT_BLOCK", name: "ブロック無しの「繰り返す」", source: "diagnose", trust: "cond", trustNote: "直した版が最後まで通るとき", hint: true, mutation: ["unblock_repeat"] },
  { id: "OBJECT_OUTSIDE_BLOCK", name: "繰り返すブロックの外に命令", source: "classify", trust: "never", hint: true, mutation: "（作れない: 正しい形から機械的に作る変異が無い）" },
  { id: "MISSING_EXECUTE", name: "「実行」抜け", source: "repair", trust: "cond", trustNote: "「。実行」の形を除く", hint: true, mutation: ["del_jikkou"] },
  { id: "UNKNOWN_METHOD", name: "命令名の誤り", source: "lint", trust: "cond", trustNote: "候補が 1 つに決まるとき（注意の層が直した版を作る）", hint: true, mutation: ["method_typo_drop", "method_typo_swap", "ins_space_in_word"] },
  // ---- 代入・式 ----
  { id: "NO_LHS", name: "「＝」の前に名前が無い", source: "classify", trust: "never", hint: true, mutation: ["delete_lhs"] },
  { id: "NO_VALUE", name: "「＝」の後に値が無い", source: "classify", trust: "never", hint: true, mutation: ["delete_rhs"] },
  { id: "NO_OPERAND", name: "演算子の後に値が無い", source: "classify", trust: "never", hint: true, mutation: ["delete_right_operand", "dup_op", "ins_op_end"] },
  { id: "NO_LEFT_OPERAND", name: "演算子の前に値が無い", source: "classify", trust: "never", hint: true, mutation: ["delete_left_operand"] },
  {
    id: "UNSUPPORTED_OP",
    name: "未対応の演算子",
    source: "classify",
    trust: "never",
    hint: true,
    mutation: ["replace_op_unsupported"],
    gold: "（例なし: 2026-10-03 の正解集合では、この種類と判定された 8 本が JavaScript / Python と「||ｘ|」の打ち間違いだった。ドリトルで && や ** を書いた実例は未確認）"
  },
  { id: "INVALID_ASSIGNMENT", name: "システムの名前への代入", source: "classify", trust: "never", hint: true, mutation: "（作れない: 種に赤・青などへの代入が無い）" },
  {
    id: "ESCAPE_SEQ",
    name: "文字列の中の \\n など",
    source: "classify",
    trust: "never",
    hint: true,
    mutation: "（作れない）",
    gold: "（例なし: 2026-10-03 の正解集合では、この種類と判定された 14 本すべてが JavaScript / Python のプログラムだった。ドリトルで \\n を書いた実例は未確認）"
  },
  // ---- 構文は通るが誤りの可能性が高い（注意の層） ----
  { id: "ASSIGN_IN_CONDITION", name: "条件の中の「＝」", source: "lint", trust: "always", hint: true, mutation: ["cmp_to_assign"] },
  { id: "ASSIGN_IN_EXPRESSION", name: "式の中の「＝」", source: "lint", trust: "never", trustNote: "1 文の 2 つ目の「＝」は句点抜けと区別できないため、直した版は答えにしない（gold で見直す）", hint: true, mutation: ["cmp_to_assign"] },
  { id: "NO_EFFECT_STATEMENT", name: "何もしない文", source: "lint", trust: "n/a", hint: true, mutation: "（作れない: 期待が決まらない）" },
  {
    id: "TIMER_PROTO_EXECUTE",
    name: "作ったタイマーでなく「タイマー」に実行",
    source: "lint",
    trust: "cond",
    trustNote: "作ったタイマーが 1 つのとき（受け手をその名前に替える）",
    hint: true,
    mutation: ["timer_proto_receiver"],
    gold: "（構文が通るので実データの構文エラーには無い。2026-10-31 先生の報告: 時計＝タイマー！作る の後に タイマー！「…」実行 と書くと 時計！停止 が効かない。V4 も同じ動作）"
  }
];
var CATEGORY_IDS = new Set(CATEGORIES.map((c) => c.id));
var byId = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
var TRUSTED_IDS = new Set(CATEGORIES.filter((c) => c.trust === "always" || c.trust === "cond").map((c) => c.id));
var nameOf = (id) => byId[id] ? byId[id].name : id;

// js/lib/diagnose/dolittle_language.js
var dolittle_language_exports = {};
__export(dolittle_language_exports, {
  NOT_DOLITTLE_MESSAGE: () => NOT_DOLITTLE_MESSAGE,
  isDolittle: () => isDolittle
});
var DOL_WORDS = /タートル|ボタン|ラベル|フィールド|タイマー|配列|図形|選択メニュー|スライダー|メロディ|楽器|画像|画面|作る|歩く|回り|繰り返す|実行|かめた|かめぞう|乱数|もし|ならば|そうでなければ|変身|背景|線の色|ペン|時間|動作|表示|消す|書く/;
var JP = /[぀-ヿ一-鿿]/;
var STRINGS = /["”“『][^"”“』\n]*["”“』]?|'[^'\n]*['’]?/g;
var DOL_LINE = [
  /[^\s　！!]+[\s　]*[！!][\s　]*([぀-ヿ一-鿿A-Za-zＡ-Ｚａ-ｚ"”“『(（0-9０-９「\-－]|$)/,
  // 名前！命令／名前！値（文字列の中の world! は除く）
  /(?<![=＝!<>])[＝=](?![=＝])[\s　]*(「|[0-9０-９]|["”“『])/,
  // 代入（== は除く）
  /「|」/,
  /＝(?=.*[぀-ヿ一-鿿０-９。])|[぀-ヿ一-鿿０-９。].*＝/,
  // 全角の＝と、日本語・全角数字・「。」が同じ行にあればドリトルの証拠（`x＝＝＝３。` を弾かない。`name ＝ 'Taro'` は弾く。2026-10-18）
  /^[\s　]*｜[^｜]*｜/,
  DOL_WORDS,
  // 文字列の外に日本語があり、文字列・数・ドリトルの記号を伴う行（亀吉くん "usa.gif" 変身する／画面：背景色（黒）のような「！」抜け）
  (l) => {
    const t = l.replace(STRINGS, "").replace(/#.*$/, "");
    return JP.test(t) && /["”“『』0-9０-９＝。（）「」：]/.test(t);
  }
];
var ASCII_ONLY = /^[\x20-\x7e]*$/;
var DOL_WORDS_EN = /(^|[\s,!=(\[])(create|forward|back|rightturn|leftturn|turnRight|turnLeft|repeat|execute|moveTo|moveBy|penup|pendown|Turtle|Button|Label|Timer|Field|Figure|SelectMenu|Slider|TextArea|Screen|makeGroup|setAction)(?=[\s,!.\]]|$)/;
var FOREIGN_LINE = [
  /^[\s　]*(import|from\s+\w+\s+import|def|class|function|var|let|const|for|while|if|elif|else|return|print|console\.|#include|public|private|using|int|void|char|double|float|string)\b/,
  /^[\s　]*(print|input|len|range|int|str)\s*\(/,
  /[;{}]\s*$/,
  /^[\s　]*#(?!include)/,
  // # コメント（Python）。ドリトルのコメントは //
  /^[\s　]*<\/?[a-zA-Z!][^>]*>/,
  // HTML
  /^\s*\w+\s*=\s*\w+\s*\(.*\)\s*$/
  // x = f(...)（半角だけで書かれた呼び出し）
];
function isDolittle(src) {
  const lines = String(src || "").split("\n").map((l) => l.replace(/\/\/.*$/, "").trim()).filter(Boolean);
  let dol = 0, foreign = 0;
  for (const l of lines) {
    if (!(ASCII_ONLY.test(l) && !l.includes("!")) && DOL_LINE.some((re) => typeof re === "function" ? re(l) : re.test(l))) dol++;
    else if (ASCII_ONLY.test(l) && DOL_WORDS_EN.test(l)) dol++;
    if (FOREIGN_LINE.some((re) => re.test(l))) foreign++;
  }
  if (!lines.length) return { ok: true, dol, foreign, reason: "" };
  if (dol === 0) return { ok: false, dol, foreign, reason: foreign ? "他の言語の書き方" : "ドリトルの命令（名前！命令）が無い" };
  if (foreign > dol) return { ok: false, dol, foreign, reason: "他の言語の書き方" };
  return { ok: true, dol, foreign, reason: "" };
}
var NOT_DOLITTLE_MESSAGE = "ドリトルのプログラムではないようです（ほかの言語の書き方か、文章になっています）。ドリトルのプログラム（例: かめた！１００ 歩く。）を貼り付けてください。";

// js/lib/diagnose/code_diff.js
var norm = (s) => s.replace(/\s+$/, "");
function lineDiff(oldText, newText) {
  const A = String(oldText).replace(/\r/g, "").replace(/\n+$/, "").split("\n");
  const B = String(newText).replace(/\r/g, "").replace(/\n+$/, "").split("\n");
  const n = A.length, m = B.length;
  const L = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i2 = n - 1; i2 >= 0; i2--)
    for (let j2 = m - 1; j2 >= 0; j2--)
      L[i2][j2] = norm(A[i2]) === norm(B[j2]) ? L[i2 + 1][j2 + 1] + 1 : Math.max(L[i2 + 1][j2], L[i2][j2 + 1]);
  const ops = [];
  let i = 0, j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && norm(A[i]) === norm(B[j])) {
      ops.push({ op: "same", text: B[j], a: i + 1, b: j + 1 });
      i++;
      j++;
    } else if (j < m && (i >= n || L[i][j + 1] >= L[i + 1][j])) {
      ops.push({ op: "add", text: B[j], b: j + 1 });
      j++;
    } else {
      ops.push({ op: "del", text: A[i], a: i + 1 });
      i++;
    }
  }
  for (let k = 0; k < ops.length; k++) {
    if (ops[k].op !== "add") continue;
    let e = k;
    while (e < ops.length && ops[e].op === "add") e++;
    let f = e;
    while (f < ops.length && ops[f].op === "del") f++;
    if (f > e) {
      ops.splice(k, f - k, ...ops.slice(e, f), ...ops.slice(k, e));
      k = f - 1;
    }
  }
  return ops;
}

// js/lib/diagnose/data/dolittle_methods.txt
var dolittle_methods_default = "Button\nField\nLabel\nWebクライアント\ncreator\ncreators\nmethods\nnote\nsystem_variables\nあかるくする\nあたい\nあたい?\nあまり\nあらわれる\nあるく\nいち\nいちでけす\nいちにかく\nいどう\nいどうする\nいれる\nいろ\nいろせってい\nうわがき\nうわがきする\nえらぶ\nえん\nえんそう\nえんそうする\nおおきいせいすうにする\nおおきいせいすうをつくる\nおおきさ\nおおきさ?\nおおきなせいすうにする\nおおきなせいすうを作る\nおきかえる\nおくゆき?\nおとあげる\nおとをあげる\nおんがくこうか\nおんりょう\nかいぎょう\nかいぎょうする\nかいすう\nかいてん?\nかく\nかくけい\nかくだい\nかくだいする\nかくにんだいあろぐ\nかける\nかこう\nかこうする\nかっけい\nから\nかんかく\nがっきせってい\nがっきせっていする\nがっきをせっていする\nきえる\nきょうゆう\nきょうゆうする\nきーたっぷ?\nくじびき\nくじ引き\nくらくする\nくりあ\nくりあする\nくりかえす\nくり返す\nぐー?\nけす\nけつごう\nけつごうする\nこーどもじ\nさいしょう\nさいしょうをえらぶ\nさいず\nさいず?\nさいだい\nさいだいをえらぶ\nさがす\nさくじょ\nさくじょする\nさーばーぽーと\nしすてむびょう?\nしゅうりょう\nしゅうりょうする\nしゅつりょく\nしゅつりょくする\nしんすう\nじ?\nじかん\nじかん?\nじこく?\nじっこう\nじっこうする\nじどうかいぎょう\nすわいぷ?\nずけいにする\nずけいをつくる\nせってい\nせっていする\nせつぞく\nせつぞくする\nせんたくだいあろぐ\nせんのいろ\nせんのふとさ\nぜんごのいち?\nぜんぶ\nぜんぶおきかえる\nぜんぶかく\nぜんぶほんとう\nそうでないなら\nそうでなく\nそうでなければ\nそうにゅう\nそうにゅうする\nそれぞれじっこう\nそれぞれじっこうする\nそれぞれ実行\nそれぞれ実行する\nそんざい?\nたかさ?\nたす\nたっぷ?\nたてのいち?\nたてむき\nたてむきにする\nちゅうしんにもどる\nちゅうだん\nちゅうだんする\nちょき?\nついか\nついかする\nつかう\nつき?\nつぎのぎょう\nつくる\nていし\nていしする\nてまえにひょうじ\nてまえにひょうじする\nてんぽ\nでーたある?\nでーたすう?\nとうろく\nとうろくする\nとし?\nとじる\nどれか\nどれかほんとう\nどれか本当\nながさ?\nなら\nならば\nなんばんめ?\nなんもじめ?\nにち?\nにちじ?\nにゅうりょくだいあろぐ\nぬる\nねん?\nのあいだ\nの間\nはいけいがぞう\nはねかえる\nはね返る\nはば?\nはやさ\nはんたい\nはんとうめいにする\nぱー?\nひ?\nひく\nひだりかいてん\nひだりかいてん?\nひだりすわいぷ?\nひだりにまわる\nひだりまわり\nひづけ?\nひょうじだいあろぐ\nひらく\nびょう?\nふぉーかす\nふくせい\nふくせいする\nふくむ?\nふやす\nふん?\nぶぶん\nぶんかつ\nぶんかつする\nへらす\nへんしん\nへんしんする\nぺんあり\nぺんなし\nほうがんし\nほうこう\nほんとう\nまぜる\nまつ\nまで\nみぎかいてん\nみぎかいてん?\nみぎすわいぷ?\nみぎにまわる\nみぎまわり\nみる\nむおん\nむおんにする\nむき\nむき?\nもじいろ\nもじけす\nもじこーど\nもじさいず\nもじしょく\nもじだす\nもじのいろ\nもじをけす\nもじをだす\nもじコード\nもどる\nゆびのかず?\nようそすう\nようそすう?\nようび?\nよこのいち?\nよこむき\nよこむきにする\nよみかき\nよむ\nよむだけ\nらんすう\nらんすうしょきか\nらんすうしょきかする\nらんだむにえらぶ\nらんだむにつくる\nれんけつ\nれんけつする\nわる\nオブジェクト\nオブジェクトファイル\nキータップ\nキータップ?\nクリア\nクリアする\nグー?\nコンソール\nコンパス\nコード\nコードもじ\nコード文字\nサイズ\nサイズ?\nサーバー\nサーバーポート\nシステム\nシステムびょう?\nシステム時間\nシステム時間?\nシステム秒?\nシリアルポート\nジャイロセンサ\nジャイロセンサー\nスライダー\nスワイプ\nスワイプ?\nタイマー\nタッチした?\nタッチしている?\nタッチしてる?\nタッチセンサ\nタッチセンサー\nタップ\nタップ?\nタートル\nダブルクォーテーション\nダブルクォート\nダブルクオーテーション\nダブルクオート\nチョキ?\nテキストエリア\nテキストファイル\nテンポ\nデータある?\nデータすう?\nデータ数?\nドラム\nバンド\nパー?\nピッチ?\nピンク\nフィールド\nフォーカス\nブロック\nペンあり\nペンなし\nボタン\nメロディ\nヨー?\nラベル\nランダムに作る\nランダムに選ぶ\nリスト\nリズム\nルート\nロール?\n上下の加速度?\n上書き\n上書きする\n不透明にする\n中心に戻る\n中断\n中断する\n乱数\n乱数初期化\n乱数初期化する\n位置\n位置で消す\n位置に書く\n何文字目?\n何番目?\n余り\n作る\n使う\n値\n値?\n値A\n値B\n値C\n停止\n停止する\n偽\n光\n入れる\n入力ダイアログ\n全部\n全部書く\n全部本当\n全部置き換える\n共有\n共有する\n円\n円周率\n出力\n出力する\n分\n分?\n分割\n分割する\n列数\n初期化\n削除\n削除する\n前後の位置?\n前後の傾き?\n前後の加速度?\n前後方向の傾き?\n割る\n加工\n加工する\n加速度センサ\n加速度センサー\n動作\n動作設定\n半透明にする\n単発実行\n反対\n右に回る\n右スワイプ?\n右ダブルクォーテーション\n右ダブルクォート\n右ダブルクオーテーション\n右ダブルクオート\n右二重かぎ括弧\n右二重鉤括弧\n右回り\n右回転\n右回転?\n向き\n向き?\n含む?\n回数\n回転\n回転?\n図形\n図形にする\n図形を作る\n塗る\n増やす\n変身\n変身する\n大きい整数\n大きい整数にする\n大きい整数を作る\n大きさ\n大きさ?\n大きな整数にする\n大きな整数を作る\n奥行き?\n存在?\n完了時実行\n実行\n実行する\n左に回る\n左スワイプ?\n左ダブルクォーテーション\n左ダブルクォート\n左ダブルクオーテーション\n左ダブルクオート\n左二重かぎ括弧\n左二重鉤括弧\n左右の傾き?\n左右の加速度?\n左右方向の傾き?\n左回り\n左回転\n左回転?\n幅\n幅?\n年\n年?\n引く\n待つ\n戻る\n手前に表示\n手前に表示する\n打楽器\n拡大\n拡大する\n指の数?\n挿入\n挿入する\n掛ける\n探す\n接続\n接続する\n改行\n改行する\n数値\n文字の色\n文字を出す\n文字を消す\n文字コード\n文字サイズ\n文字出す\n文字列\n文字数\n文字消す\n文字色\n方向\n方向?\n方眼紙\n日\n日?\n日付\n日付?\n日時\n日時?\n明るくする\n時\n時?\n時刻\n時刻?\n時間\n時間?\n暗くする\n曜日\n曜日?\n書いて改行\n書く\n最大\n最大を選ぶ\n最小\n最小を選ぶ\n最後に実行\n月\n月?\n未定義\n本当\n桁数\n楽器\n楽器を設定する\n楽器設定\n楽器設定する\n横の位置?\n横向き\n横向きにする\n次に実行\n次の行\n止める\n歩く\n水\n水平の傾き?\n水平方向の傾き?\n水色\n消える\n消す\n混ぜる\n減らす\n演奏\n演奏する\n無音\n無音にする\n現れる\n画面\n登録\n登録する\n白\n相手\n真\n確認ダイアログ\n磁気センサ\n磁気センサー\n秒\n秒?\n移動\n移動する\n紫\n終了\n終了する\n終了時実行\n結合\n結合する\n絵の具\n絵具\n緑\n線の太さ\n線の色\n縦の位置?\n縦向き\n縦向きにする\n繰り返す\n繰返す\n置き換える\n背景画像\n自分\n自動改行\n色\n色設定\n行修正\n行数\n衝突\n表示ダイアログ\n複製\n複製する\n要素数\n要素数?\n見る\n角形\n触れた?\n触れている?\n触れてる?\n設定\n設定する\n読み書き\n読む\n読むだけ\n調整\n論理値\n赤\n足す\n跳ね返る\n辞書\n追加\n追加する\n速さ\n連結\n連結する\n進数\n選ぶ\n選択ダイアログ\n選択メニュー\n部分\n配列\n配列で読む\n長さ?\n閉じる\n開く\n間隔\n青\n音を上げる\n音上げる\n音楽効果\n音量\n高さ\n高さ?\n黄\n黄色\n黒\n";

// js/lib/diagnose/data/dolittle_methods_all.txt
var dolittle_methods_all_default = "Button\nCSV表示\nField\nLabel\nTSV表示\nWebクライアント\n_KEY_名前\n_グリッド線なし\n_ヒストグラム\n_プロット幅\n_マーカフラグ\n_メモリ範囲\n_レコード連結\n_不偏共分散\n_不偏分散\n_不偏標準偏差\n_中央値\n_位置\n_偏差\n_偏相関係数\n_共分散\n_円グラフ\n_円原点x\n_円原点y\n_分散\n_原点x\n_原点y\n_右端\n_合計値\n_向き\n_含む?\n_含む？\n_図形を作る\n_基準方向\n_天井\n_左端\n_帯グラフ\n_帯メモリ間隔\n_帯長さ\n_平均値\n_底\n_引数設定\n_折れ線グラフ\n_散布図\n_方向\n_最大メモリ\n_最大値\n_最小メモリ\n_最頻値\n_桁x\n_桁y\n_棒グラフ\n_標準偏差\n_横幅\n_横軸タイトル文\n_段数\n_段数x\n_段数y\n_画面幅\n_画面高さ\n_相関係数\n_積み上げ棒グラフ\n_第1四分位数\n_第3四分位数\n_箱ひげ図\n_範囲指定\n_縦幅\n_縦軸タイトル文\n_起点メモリ\n_軸タイトルサイズ\n_軸ラベルサイズ\n_近似\n_間隔\n_集計\ncreator\ncreators\netc表示\nf1の番号\njsonにする\njson解析\nmax桁数\nmethods\nmin桁数\nnote\nobjキュー\nsystem_variables\nwebクライアント\nxy平面\nx基準\nx始点\nx幅\nx平均\nx終点\nx軸データ_multi\nx軸マス数\nx軸交点\nx配列\ny基準\ny始点\ny幅\ny平均\ny終点\ny軸マス数\ny配列\nあ\nあいてがきえる\nあお\nあか\nあかるくする\nあこーでぃおん\nあたい\nあたい?\nあたい？\nあまり\nあゆみ緑\nあゆみ赤\nあゆみ青\nあゆみ黄\nあらわれる\nあるく\nいいえ\nいち\nいちでけす\nいちにかく\nいどう\nいどうする\nいれる\nいろ\nいろせってい\nうしろ\nうわがき\nうわがきする\nえらぶ\nえん\nえんそう\nえんそうする\nおおきいせいすうにする\nおおきいせいすうをつくる\nおおきさ\nおおきさ?\nおおきさ？\nおおきなせいすうにする\nおおきなせいすうを作る\nおきかえる\nおくゆき?\nおくゆき？\nおとあげる\nおとをあげる\nおるがん\nおんがくこうか\nおんりょう\nかいぎょう\nかいぎょうする\nかいすう\nかいてん?\nかいてん？\nかえす\nかく\nかくけい\nかくだい\nかくだいする\nかくにんだいあろぐ\nかける\nかこう\nかこうする\nかっけい\nかつ\nかめ\nかめた\nから\nかんかく\nがいせつえん\nがっきせってい\nがっきせっていする\nがっきをせっていする\nがめんしょうきょ\nがめんをけす\nき\nきいろ\nきえる\nきょうゆう\nきょうゆうする\nきーたっぷ?\nきーたっぷ？\nぎたー\nく\nくじびき\nくじ引き\nくらくする\nくらりねっと\nくりあ\nくりあする\nくりかえす\nくりすますべる\nくり返す\nぐー?\nぐー？\nけす\nけつごう\nけつごうする\nげんてん\nこんが\nこーどもじ\nさいしょう\nさいしょうをえらぶ\nさいず\nさいず?\nさいず？\nさいだい\nさいだいをえらぶ\nさがす\nさくじょ\nさくじょする\nさしかえ\nさしかえる\nさーばーぽーと\nし\nしすてむびょう?\nしすてむびょう？\nしゅうりょう\nしゅうりょうする\nしゅつりょく\nしゅつりょくする\nしゅとく\nしょうきょ\nしょうとつ\nしろ\nしんすう\nじ?\nじかん\nじかん?\nじかん？\nじこく?\nじこく？\nじっこう\nじっこうする\nじどうかいぎょう\nじぶん\nじぶんがきえる\nじ？\nすねあ\nすわいぷ?\nすわいぷ？\nずけいにする\nずけいになる\nずけいをつくる\nずけいをひだり\nずけいをみぎ\nずけいを右\nずけいを左\nせってい\nせっていする\nせつぞく\nせつぞくする\nせんたくだいあろぐ\nせんのいろ\nせんのふとさ\nせんをひく\nせんを引く\nぜんごのいち?\nぜんごのいち？\nぜんぶ\nぜんぶおきかえる\nぜんぶかく\nぜんぶほんとう\nそ\nそうでないなら\nそうでなく\nそうでなければ\nそうにゅう\nそうにゅうする\nそれぞれじっこう\nそれぞれじっこうする\nそれぞれ実行\nそれぞれ実行する\nそんざい?\nそんざい？\nた\nたかさ?\nたかさ？\nたす\nたっぷ?\nたっぷ？\nたてのいち?\nたてのいち？\nたてむき\nたてむきにする\nたむ\nたんばりん\nち\nちゃいにーず\nちゅうしんにもどる\nちゅうだん\nちゅうだんする\nちょき?\nちょき？\nつ\nついか\nついかする\nつかう\nつき?\nつき？\nつぎのぎょう\nつくる\nていし\nていしする\nてまえにひょうじ\nてまえにひょうじする\nてんぽ\nでーたある?\nでーたある？\nでーたすう?\nでーたすう？\nとうろく\nとうろくする\nとし?\nとし？\nとじる\nとらいあんぐる\nとらんぺっと\nど\nどれか\nどれかほんとう\nどれか本当\nないせつえん\nながさ?\nながさ？\nなきごえ\nなら\nならば\nなんばんめ?\nなんばんめ？\nなんもじめ?\nなんもじめ？\nにち?\nにちじ?\nにちじ？\nにち？\nにゅうりょくだいあろぐ\nぬる\nねん?\nねん？\nのあいだ\nの間\nはい\nはいけいがぞう\nはいはっと\nはくしゅ\nはねかえる\nはね返る\nはば?\nはば？\nはやさ\nはんけいをかく\nはんけいを書く\nはんたい\nはんとうめいにする\nばいと\nばす\nぱ\nぱー?\nぱー？\nひ?\nひく\nひだり\nひだりかいてん\nひだりかいてん?\nひだりかいてん？\nひだりすわいぷ?\nひだりすわいぷ？\nひだりにまわる\nひだりまわり\nひづけ?\nひづけ？\nひょうじだいあろぐ\nひらく\nひ？\nびょう?\nびょう？\nぴあの\nぴんく\nふ\nふぉーかす\nふくせい\nふくせいする\nふくむ?\nふくむ？\nふやす\nふん?\nふん？\nぶぶん\nぶんかつ\nぶんかつする\nへらす\nへんしん\nへんしんする\nべる\nべーす\nべーすろくよん\nぺんあり\nぺんなし\nほいっする\nほうがんし\nほうこう\nほんとう\nぼんご\nまうす\nまえ\nまぜる\nまたは\nまつ\nまで\nみ\nみぎ\nみぎかいてん\nみぎかいてん?\nみぎかいてん？\nみぎすわいぷ?\nみぎすわいぷ？\nみぎにまわる\nみぎまわり\nみず\nみずいろ\nみどり\nみる\nむおん\nむおんにする\nむき\nむき?\nむき？\nむらさき\nもじいろ\nもじけす\nもじこーど\nもじさいず\nもじしょく\nもじだす\nもじのいろ\nもじをけす\nもじをだす\nもじコード\nもとのプロット幅\nもどる\nゆっくりタートル\nゆっくり動く\nゆびのかず?\nゆびのかず？\nようそすう\nようそすう?\nようそすう？\nようび?\nようび？\nよこのいち?\nよこのいち？\nよこむき\nよこむきにする\nよみかき\nよむ\nよむだけ\nら\nらいど\nらんすう\nらんすうしょきか\nらんすうしょきかする\nらんだむにえらぶ\nらんだむにつくる\nれ\nれんけつ\nれんけつする\nわる\nん\nアイスレイン\nアコースティクベース\nアコーディオン\nアゴゴ\nアトモスフィア\nアプローズ\nアルトサックス\nイングリッシュホルン\nウッドブロック\nエコードロップ\nエスエフ\nエレクトリックグランドピアノ\nエレクトリックピアノ1\nエレクトリックピアノ2\nエレクトリックピアノ１\nエレクトリックピアノ２\nオカリナ\nオブジェクト\nオブジェクトファイル\nオルガン\nオンライン版ドリトル\nオーケストラハープ\nオーケストラヒット\nオーバードライブギター\nオープンクイーカ\nオープントライアングル\nオープンハイコンガ\nオープンハイハット\nオーボエ\nカウベル\nカウント\nカバサ\nカリオペ\nカリンバ\nガンショット\nキュー\nキータップ\nキータップ?\nキータップ？\nギター\nギターハーモニクス\nギターフレットノイズ\nク\nクラッシュシンバル1\nクラッシュシンバル2\nクラッシュシンバル１\nクラッシュシンバル２\nクラビネット\nクラリネット\nクラヴェス\nクリア\nクリアする\nクリスタル\nクリスマスベル\nクリーンギター\nクロス集計\nクロス集計表\nクローズハイハット\nクワイアパッド\nグラフ\nグランドピアノ\nグリッド線なし\nグロッケンシュピール\nグー?\nグー？\nコンガ\nコンソール\nコントラバス\nコンパス\nコード\nコードもじ\nコード文字\nコーラス\nゴブリン\nサイズ\nサイズ?\nサイズ？\nサイドスティック\nサウンドトラック\nサーバ\nサーバー\nサーバーポート\nシ\nシステム\nシステムびょう?\nシステムびょう？\nシステム時間\nシステム時間?\nシステム時間？\nシステム秒?\nシステム秒？\nシタール\nシャナイ\nショートギロ\nショートホイッスル\nシリアルポート\nシロフォン\nシンセストリングス1\nシンセストリングス2\nシンセストリングス１\nシンセストリングス２\nシンセドラム\nシンセブラス1\nシンセブラス2\nシンセブラス１\nシンセブラス２\nシンセベース1\nシンセベース2\nシンセベース１\nシンセベース２\nシンセボイス\nシーショア\nジャイロセンサ\nジャイロセンサー\nジャズギター\nスウィープパッド\nスクウェアリード\nスティールギター\nスティールドラム\nストリングス\nスネア\nスネアドラム1\nスネアドラム2\nスネアドラム１\nスネアドラム２\nスプラッシュシンバル\nスライダー\nスラップベース1\nスラップベース2\nスラップベース１\nスラップベース２\nスローストリングス\nスワイプ\nスワイプ?\nスワイプ？\nセンサ情報へのアクセスを許可\nソ\nソプラノサックス\nソートゥースリード\nタ\nタイプ\nタイマー\nタッチした?\nタッチした？\nタッチしている?\nタッチしている？\nタッチしてる?\nタッチしてる？\nタッチセンサ\nタッチセンサー\nタップ\nタップ?\nタップ？\nタム\nタンゴアコーディオン\nタンバリン\nタートル\nダブルクォーテーション\nダブルクォート\nダブルクオーテーション\nダブルクオート\nダルシマー\nチ\nチェレスタ\nチェロ\nチフリード\nチャイニーズ\nチャイニーズシンバル\nチャランゴ\nチヤーチオルガン\nチューバ\nチューブラーベル\nチョキ?\nチョキ？\nチーズ\nチーズ角度\nツ\nティンクルベル\nティンパニ\nテキストエリア\nテキストファイル\nテナーサックス\nテレフォン\nテンポ\nテーブル\nテーブルオブジェクト\nディストーションギター\nデータ\nデータある?\nデータある？\nデータすう?\nデータすう？\nデータ数?\nデータ数？\nデータ補正値計算\nデータ補正用配列\nトライアングル\nトランペット\nトレモロストリングス\nトロンボーン\nトークン\nド\nド3\nドどトとタたチちツつクくパぱ\nドタ\nドラム\nドローバーオルガン\nナイロンギター\nニューエイジパッド\nニョロ位置\nハイアゴゴ\nハイウッドブロック\nハイタンバール\nハイトム1\nハイトム2\nハイトム１\nハイトム２\nハイハット\nハイボンゴ\nハロパッド\nハープシコード\nハーモニカ\nバイオリン\nバイト\nバイト列\nバグパイプ\nバス\nバスドラム1\nバスドラム2\nバスドラム１\nバスドラム２\nバスーン\nバリトンサックス\nバンジョー\nバンド\nバード\nパ\nパンフルート\nパー?\nパーカッシブオルガン\nパー？\nヒストグラム\nビオラ\nビブラフォン\nピアノ\nピチカートストリングス\nピックベース\nピッコロ\nピッチ?\nピッチ？\nピンク\nフ\nファイルから作る\nファイルから追加\nファイル名\nフィドル\nフィフスリード\nフィンガーベース\nフィールド\nフィールド名\nフィールド名取得\nフィールド名変更\nフィールド名要素数\nフィールド数\nフィールド番号\nフィールド番号取得\nフォント\nフォントサイズ\nフォーカス\nフラグ\nフルート\nフレットレスベース\nフレンチホルン\nブライトネス\nブライトピアノ\nブラスセクション\nブレスノイズ\nブロウボトル\nブロック\nプロット\nプロットx\nプロット数\nヘッダ\nヘリコプター\nベル\nベース\nベース64\nベースアンドリード\nペダルハイハット\nペン\nペン2\nペンあり\nペンなし\nペン色\nホイッスル\nホンキートンクピアノ\nボイス\nボイスリード\nボウドパッド\nボタン\nボンゴ\nポリシンセパッド\nマウス\nマラカス\nマリンバ\nマーカなし\nミ\nミドルトム1\nミドルトム2\nミドルトム１\nミドルトム２\nミュージックボックス\nミュートギター\nミュートクイーカ\nミュートトライアングル\nミュートトランペット\nミュートハイコンガ\nメタリックパッド\nメモリ\nメモリ範囲\nメモリ線描画\nメモリ調整\nメロディ\nメロディックタム\nヨー?\nヨー？\nラ\nライド\nライドシンバル1\nライドシンバル2\nライドシンバル１\nライドシンバル２\nライドベル\nラベル\nラベルx\nラベルy\nラベルなし\nラベルサイズ\nラベルペン\nラベル数\nランダムに作る\nランダムに選ぶ\nリコーダー\nリスト\nリスト幅\nリスト高さ\nリズム\nリバースシンバル\nリードオルガン\nルート\nレ\nレコード取り出し\nロックオルガン\nロングギロ\nロングホイッスル\nローアゴゴ\nローウッドブロック\nローコンガ\nロータンバール\nロートム1\nロートム2\nロートム１\nロートム２\nローボンゴ\nロール?\nロール？\nワームパッド\nン\nヴィブラスラップ\n・\nー\n一致レコード行番号配列\n三味線\n上下の加速度?\n上下の加速度？\n上書き\n上書きする\n不偏共分散\n不偏分散\n不偏標準偏差\n不透明にする\n並び替えたいフィールド名の番号\n中央値\n中心に戻る\n中断\n中断する\n乱数\n乱数初期化\n乱数初期化する\n付箋\n件\n件数\n位置\n位置で消す\n位置に書く\n位置確定\n何文字目?\n何文字目？\n何番目?\n何番目？\n余り\n余りを求める\n作る\n作成\n使う\n個体番号\n値\n値?\n値A\n値B\n値C\n値読み出し\n値？\n偏差\n偏相関係数\n停止\n停止する\n偽\n傾き\n傾きセンサーのキャリブレーション\n光\n入れる\n入力ダイアログ\n全部\n全部書く\n全部本当\n全部置き換える\n共分散\n共有\n共有する\n内接円\n内接円の半径\n内接半径\n内部_重複なし\n円\n円グラフ\n円周率\n出力\n出力する\n分\n分?\n分割\n分割する\n分散\n分？\n切片\n列数\n初期化\n削除\n削除する\n前\n前後の位置?\n前後の位置？\n前後の傾き?\n前後の傾き？\n前後の加速度?\n前後の加速度？\n前後方向の傾き?\n前後方向の傾き？\n割る\n割合\n割合ラベルy\n割合合計\n加工\n加工する\n加速度センサ\n加速度センサー\n動作\n動作設定\n区切り文字\n半径\n半径をかく\n半径を書く\n半透明にする\n単発実行\n原点\n反対\n取得\n右\n右に傾けてください\n右に回る\n右スワイプ?\n右スワイプ？\n右ダブルクォーテーション\n右ダブルクォート\n右ダブルクオーテーション\n右ダブルクオート\n右二重かぎ括弧\n右二重鉤括弧\n右回り\n右回転\n右回転?\n右回転？\n合計\n合計値\n名\n名前リスト\n向き\n向き?\n向き？\n含む?\n含む？\n四角ボタン\n回数\n回転\n回転?\n回転させてください\n回転？\n図形\n図形like\n図形にする\n図形になる\n図形をひだり\n図形をみぎ\n図形を作る\n図形を右\n図形を左\n図形を描画\n図形クリック動作\n図形ライク\n図形化\n土\n型判定\n型配列\n基準方向\n基準点x\n基準点y\n塗る\n増やす\n増加キー\n変身\n変身する\n外接円\n外接円の半径\n大きい整数\n大きい整数にする\n大きい整数を作る\n大きい順\n大きさ\n大きさ?\n大きさ？\n大きな整数にする\n大きな整数を作る\n太鼓\n奥行き?\n奥行き？\n始点x\n始点y\n存在?\n存在？\n完了時実行\n実行\n実行が中断されました\n実行する\n射影\n小さい順\n尺八\n左\n左に回る\n左スワイプ?\n左スワイプ？\n左ダブルクォーテーション\n左ダブルクォート\n左ダブルクオーテーション\n左ダブルクオート\n左二重かぎ括弧\n左二重鉤括弧\n左右の傾き?\n左右の傾き？\n左右の加速度?\n左右の加速度？\n左右方向の傾き?\n左右方向の傾き？\n左回り\n左回転\n左回転?\n左回転？\n差し替え\n差し替える\n帯\n帯グラフ\n幅\n幅?\n幅？\n平均値\n平均値置換\n年\n年?\n年？\n度数\n度数分布\n度数分布表\n式の長さ\n引く\n引数\n待つ\n戻る\n手前に傾けてください\n手前に表示\n手前に表示する\n手拍子\n打楽器\n折れ線グラフ\n抜き出す\n拍手\n拡大\n拡大する\n指の数?\n指の数？\n挿入\n挿入する\n掛ける\n探す\n接続\n接続する\n描画\n描画済みグラフ\n描画用データ\n改行\n改行する\n散布図\n数える\n数でないもの\n数でない値\n数にする\n数値\n文字の色\n文字を出す\n文字を消す\n文字コード\n文字コード配列にする\n文字コード配列の比較\n文字サイズ\n文字出す\n文字列\n文字列にする\n文字数\n文字数カウント\n文字消す\n文字色\n方向\n方向?\n方向？\n方眼紙\n日\n日?\n日付\n日付?\n日付？\n日時\n日時?\n日時？\n日？\n明るくする\n時\n時?\n時刻\n時刻?\n時刻？\n時計\n時間\n時間?\n時間？\n時？\n暗くする\n曜日\n曜日?\n曜日？\n書いて改行\n書き出し完了\n書く\n最大\n最大を選ぶ\n最大値\n最大長\n最小\n最小を選ぶ\n最小二乗法\n最小値\n最後に実行\n最長\n最頻値\n月\n月?\n月？\n有効\n木\n未定義\n本当\n桁数\n棒グラフ\n楽器\n楽器を設定する\n楽器設定\n楽器設定する\n標準偏差\n横\n横の位置?\n横の位置配列\n横の位置？\n横向き\n横向きにする\n横幅\n横幅設定\n横軸タイトル\n横軸タイトル描画\n横軸タイトル文\n横軸ラベル\n横軸ラベル長\n横軸描画\n欠損値の置換\n次に実行\n次の行\n止める\n正合計配列\n正多角形\n正高さ配列\n歩く\n水\n水平に戻してください\n水平の傾き?\n水平の傾き？\n水平方向の傾き?\n水平方向の傾き？\n水色\n注釈フラグ\n消える\n消す\n消去\n混ぜる\n減らす\n減少キー\n渡す\n演奏\n演奏する\n火\n点\n点を打つ\n点キュー\n点集合\n無音\n無音にする\n現れる\n琴\n画像\n画像にする\n画像ファイル\n画面\n画面を消す\n画面幅\n画面消去\n画面高\n番号\n番目\n番目を\n登録\n登録する\n白\n目盛り\n相対度数\n相手\n相関係数\n真\n真偽値\n着色\n矢印の方向に傾けてください\n矢印方向に傾けてください\n確認ダイアログ\n磁気センサ\n磁気センサー\n秒\n秒?\n秒？\n移動\n移動する\n移動値\n種類\n積み上げ棒グラフ\n空オブジェクト\n端末を水平にしてください\n端末を水平に持ってください\n第1四分位数\n第3四分位数\n箱ひげ図\n範囲\n系列ラベルx\n系列ラベルy\n系列名\n系列名長\n系列数\n紫\n終了\n終了する\n終了時実行\n終点_y\n終点x\n終点y\n経度?\n経度？\n結合\n結合する\n絵の具\n絵具\n緑\n線の太さ\n線の色\n線をひく\n線を引く\n線形近似\n緯度?\n緯度？\n縦\n縦の位置?\n縦の位置？\n縦向き\n縦向きにする\n縦幅設定\n縦表示\n縦軸タイトル\n縦軸タイトル描画\n縦軸タイトル文\n縦軸描画\n縦軸間隔\n繰り返す\n繰返す\n置き換える\n背景画像\n背景色\n自分\n自動改行\n色\n色設定\n行修正\n行列入れ替え\n行数\n行数m\n行数t\n行番号\n衝突\n表示\n表示ダイアログ\n補正フィールド決定\n補正値\n複製\n複製する\n要求\n要素数\n要素数?\n要素数m\n要素数t\n要素数？\n見る\n角度合計\n角形\n触れた?\n触れた？\n触れている?\n触れている？\n触れてる?\n触れてる？\n計\n設定\n設定する\n読み書き\n読む\n読むだけ\n調整\n調整完了\n論理値\n負合計配列\n負高さ配列\n赤\n起点メモリ\n足す\n跳ね返る\n辞書\n辺の数\n辺の長さ\n返す\n追加\n追加する\n追加データ\n追加予定レコード行番号配列\n追加数\n送る\n送信\n途中データm\n途中データt\n速さ\n連結\n連結m\n連結t\n連結する\n連結データ配列\n進数\n選ぶ\n選択\n選択ダイアログ\n選択メニュー\n部分\n配列\n配列?\n配列から作る\n配列で読む\n配列にする\n配列？\n重複なし\n重複削除配列\n金\n長\n長さ?\n長さ？\n閉じる\n開く\n間隔\n階級\n階級幅\n階級数\n集計\n集計2\n青\n音を上げる\n音上げる\n音楽効果\n音量\n項目\n高さ\n高さ?\n高さ？\n鳴き声\n黄\n黄色\n黒\n";

// djs-virtual:djs-precheck-unbalanced
var g = {};
(function(global) {
  "use strict";
  const QUOTE_CHARS = '"“”';
  function isQuoteChar(ch) {
    return ch !== void 0 && QUOTE_CHARS.indexOf(ch) !== -1;
  }
  const isSlash = (ch) => ch === "/" || ch === "／", isStar = (ch) => ch === "*" || ch === "＊";
  function stripStringsAndComments2(text) {
    const out = [];
    let i = 0, n = text.length;
    let stringUnclosed = false;
    while (i < n) {
      const c = text[i];
      if (c === "<" && typeof MinimalParser !== "undefined" && MinimalParser.scanHtmlTag) {
        const tg = MinimalParser.scanHtmlTag(text, i);
        if (tg) {
          let blank = text.slice(i, i + tg.len).replace(/[^\n]/g, " ");
          const tp = MinimalParser.lastTagPeriods;
          if (tp && tp.src === text && tp.at[i + tg.len]) blank = blank.slice(0, -1) + "。";
          out.push(blank);
          i += tg.len;
          continue;
        }
      }
      if (isSlash(c) && i + 1 < n && isSlash(text[i + 1])) {
        let j = i;
        while (j < n && text[j] !== "\n") j++;
        out.push(" ".repeat(j - i));
        i = j;
        continue;
      }
      if (isSlash(c) && i + 1 < n && isStar(text[i + 1])) {
        let j = i + 2;
        while (j < n && !(isStar(text[j]) && j + 1 < n && isSlash(text[j + 1]))) j++;
        j = j < n ? j + 2 : n;
        out.push(text.slice(i, j).replace(/[^\n]/g, " "));
        i = j;
        continue;
      }
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
  function countBrackets2(code) {
    return {
      blockOpen: (code.match(/「/g) || []).length,
      blockClose: (code.match(/」/g) || []).length,
      fparOpen: (code.match(/（/g) || []).length,
      fparClose: (code.match(/）/g) || []).length,
      hparOpen: (code.match(/\(/g) || []).length,
      hparClose: (code.match(/\)/g) || []).length
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
  const UNSUPPORTED_OP_RE2 = /&&|\|\||(?<!\*)\*\*(?!\*)|<>|=<|=>/;
  function findUnsupportedOp2(code) {
    const m = code.match(UNSUPPORTED_OP_RE2);
    return m ? m[0] : null;
  }
  function hasExtraPeriodInLine2(line) {
    const s = line.replace(/\s+$/, "");
    if (s.length <= 1) return false;
    const lastChar = s[s.length - 1];
    const body = "。.．｡".includes(lastChar) ? s.slice(0, -1) : s;
    return /[。．｡]/.test(body);
  }
  function maskBlocksForExtraPeriod(text) {
    const code = stripStringsAndComments2(text).codeOnly;
    let depth = 0, out = "";
    for (let i = 0; i < code.length; i++) {
      const c = code[i];
      if (c === "「") {
        depth++;
        out += "「";
      } else if (c === "」") {
        if (depth > 0) depth--;
        out += "」";
      } else if (c === "\n") {
        out += "\n";
      } else out += depth > 0 ? " " : c;
    }
    return out;
  }
  function hasDoubleBang2(code) {
    return code.includes("！！") || code.includes("!!");
  }
  const DOUBLE_PERIOD_RE2 = /[。．.｡]{2,}/;
  function hasDoublePeriod2(code) {
    return DOUBLE_PERIOD_RE2.test(code);
  }
  function hasStrayJpComma(code) {
    return code.includes("、") || code.includes("､");
  }
  const TERMINATORS_TRAIL_RE2 = /[。．.｡]\s*$/;
  const IDENT_RE2 = /^[　-鿿_A-Za-z][　-鿿_A-Za-z0-9]*$/;
  function looksLikeMissingBang2(line) {
    let s = line.trim();
    if (!s) return false;
    s = s.replace(TERMINATORS_TRAIL_RE2, "");
    let rhs;
    if (s.includes("=") || s.includes("＝")) {
      rhs = s.split(/[=＝]/, 2)[1] || "";
      rhs = rhs.trim();
    } else {
      rhs = s;
    }
    if (!rhs) return false;
    if (/[！!:：]/.test(rhs)) return false;
    const tokens = rhs.split(/\s+/).filter((t) => t);
    if (tokens.length < 2) return false;
    const identCount = tokens.filter((t) => IDENT_RE2.test(t)).length;
    return identCount >= 2;
  }
  function isDolittleIdentChar(ch) {
    if (!ch) return false;
    if (/[A-Za-z0-9_]/.test(ch)) return true;
    const c = ch.codePointAt(0);
    return c >= 12352 && c <= 12543 || c >= 19968 && c <= 40959 || ch === "ー" || ch === "々";
  }
  const SELF_BEFORE_PAREN_RE = /自分\s*[（(]/g;
  function selfMissingBangLine(src) {
    const code = stripStringsAndComments2(src).codeOnly;
    SELF_BEFORE_PAREN_RE.lastIndex = 0;
    let m;
    while ((m = SELF_BEFORE_PAREN_RE.exec(code)) !== null) {
      const before = m.index > 0 ? code[m.index - 1] : "";
      if (isDolittleIdentChar(before)) continue;
      return offsetToLine2(src, m.index);
    }
    return null;
  }
  const CLOSEPAREN_SELF_RE = /[）)]\s*自分/g;
  function selfAfterCloseParenLine(src) {
    const code = stripStringsAndComments2(src).codeOnly;
    CLOSEPAREN_SELF_RE.lastIndex = 0;
    let m;
    while ((m = CLOSEPAREN_SELF_RE.exec(code)) !== null) {
      const selfPos = m.index + m[0].indexOf("自分");
      const after = code[selfPos + 2] || "";
      if (isDolittleIdentChar(after)) continue;
      return offsetToLine2(src, selfPos);
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
  const ESC_SEQ_RE2 = /\\[ntr]/;
  function hasEscapeSeqInStrings2(text) {
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
        if (ESC_SEQ_RE2.test(literal)) return true;
        i = j < n && text[j] === '"' ? j + 1 : j;
        continue;
      }
      i++;
    }
    return false;
  }
  const METHOD_CALL_RE2 = /[！!]\s*([　-鿿_A-Za-z][　-鿿_A-Za-z0-9]*)/g;
  const TRAILING_PUNCT_RE = /[。．｡、，]+$/;
  function extractMethodCalls2(code) {
    const calls = [];
    let m;
    METHOD_CALL_RE2.lastIndex = 0;
    while ((m = METHOD_CALL_RE2.exec(code)) !== null) {
      const name = m[1].replace(TRAILING_PUNCT_RE, "");
      if (name) calls.push(name);
    }
    return calls;
  }
  const RESERVED_LHS2 = /* @__PURE__ */ new Set([
    "赤",
    "青",
    "緑",
    "黄",
    "白",
    "黒",
    "紫",
    "桃",
    "橙",
    "茶",
    "灰",
    "タートル",
    "ボタン",
    "ラベル",
    "テキスト",
    "図形",
    "選択メニュー",
    "スライダー",
    "イメージ",
    "リスナー",
    "タイマー",
    "ストップウォッチ",
    "配列",
    "色",
    "音",
    "サウンド",
    "テーブル",
    "通信",
    "音声合成",
    "画面"
  ]);
  const RESERVED_ASSIGN_RE2 = /^\s*([　-鿿_A-Za-z][　-鿿_A-Za-z0-9]*)\s*[=＝]/;
  function firstReservedAssign2(line) {
    const m = line.match(RESERVED_ASSIGN_RE2);
    if (!m) return null;
    return RESERVED_LHS2.has(m[1]) ? m[1] : null;
  }
  function lineAt2(text, lineNo) {
    if (lineNo <= 0) return "";
    const lines = text.split("\n");
    return lineNo - 1 < lines.length ? lines[lineNo - 1] : "";
  }
  function offsetToLine2(text, offset) {
    if (offset == null || offset < 0 || offset >= text.length) return 1;
    let count = 1;
    for (let i = 0; i < offset; i++) {
      if (text[i] === "\n") count++;
    }
    return count;
  }
  const TERMINATORS2 = "。.．｡";
  function lineLacksTerminator2(line) {
    const s = line.replace(/\s+$/, "");
    if (!s) return false;
    return !TERMINATORS2.includes(s[s.length - 1]);
  }
  function levenshtein2(a, b) {
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
        dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
        prev = tmp;
      }
    }
    return dp[bl];
  }
  function closestMethod2(token, methodNames2) {
    if (!token) return null;
    if ([...token].length <= 1) return null;
    let best = null, bestD = 3;
    for (const name of methodNames2) {
      if (Math.abs(name.length - token.length) > 2) continue;
      const d = levenshtein2(token, name);
      if (d < bestD) {
        best = name;
        bestD = d;
      }
      if (bestD === 0) break;
    }
    return best;
  }
  const CATEGORY_MESSAGES2 = {
    EMPTY_PROGRAM: "プログラムが空、またはコメントのみです。命令を書いてみましょう。",
    UNCLOSED_STRING: '文字列 " が閉じていません。"...." の形で閉じてください。',
    UNCLOSED_BLOCK: "ブロック「 」のかっこの数が合っていません。",
    UNCLOSED_PAREN: "丸括弧 ( ) （ ） の数が合っていません。",
    PERIOD_MISSING: "行の終わりに「。」が必要です。",
    EXTRA_PERIOD: "文の途中に「。」が紛れ込んでいます。",
    DOUBLE_PERIOD: "「。」または「.」が連続しています。1つだけにしてください。",
    DOUBLE_BANG: "「！」または「!」が連続しています。1つだけにしてください。",
    MISSING_BANG: "オブジェクトに命令する記号「！」が抜けているようです。",
    UNKNOWN_METHOD: "登録されていないメソッド名です。",
    INVALID_ASSIGNMENT: "システムが用意した名前（赤・タートル等）を別の値で上書きできません。",
    UNSUPPORTED_OP: "この演算子はドリトルでは使えません。",
    ESCAPE_SEQ: "文字列内の \\n や \\t は使えません。",
    // ★djsローカル追加（2026-06-30）: 詰まり位置(maxPos)ベースの具体メッセージ（文言はV4流用）
    NO_VALUE: "代入の右辺（値）がありません。「＝」の後に値を書きます。",
    NO_OPERAND: "演算子の後に値がありません。例「10 ＋ 20」のように両側に値を書きます。",
    NO_LEFT_OPERAND: "演算子の前に値がありません。例「10 ＋ 20」のように両側に値を書きます。",
    NO_METHOD: "「！」の後に命令（メソッド）がありません。例「かめた！歩く」のように命令を書きます。",
    NO_LHS: "代入の「＝」の前に変数名がありません。「変数 ＝ 値。」の形にします。",
    NO_OPERATOR: "値が続いています。間に演算子（＊＋−／など）が抜けていないか確認してください。例「数 ＊ 2」。",
    // ★djsローカル追加（2026-07-04）: ブロック直後に値／数字＋命令のくっつき
    VALUE_AFTER_BLOCK: "ブロック「…」の直後に値が続いています。ブロックを繰り返すときは「！」と回数をこの順で書きます（例「…」！4 繰り返す）。「！」の抜けや「4！」のような順序の誤りを確認してください。",
    NUMBER_GLUED_METHOD: "数字と命令がくっついています。間にスペースを空けて分けて書いてください（例「90 左回り」）。",
    BAD_PROPERTY: "プロパティの「:」の後に名前がありません。「オブジェクト:なまえ＝値」の形にします。「:」が続いていないか、名前が抜けていないか確認してください。",
    DANGLING_VALUE: "値が命令や式につながっていません。命令には「！」、計算には演算子、文の区切りには「。」が必要です（命令の引数は命令の前、例「100 歩く」）。",
    PARSE_OK_BUT_LOGGED: "構文は正しいです。実行時エラーの可能性があります。",
    OTHER: "原因を特定できませんでした。マニュアルを確認してください。"
  };
  const STUCK_OPERATOR_CHARS = "＋+－-ー＊*×／/÷％%";
  const STUCK_ASSIGN_CHARS = "＝=";
  const STUCK_VALUE_END = "。．｡」)）.";
  function isOperandChar(ch) {
    if (!ch) return false;
    if (/[0-9０-９A-Za-z_]/.test(ch)) return true;
    const c = ch.codePointAt(0);
    return c >= 12352 && c <= 12543 || c >= 19968 && c <= 40959 || ch === "ー" || ch === "々";
  }
  function analyzeStuckPoint(src, pos) {
    if (typeof pos !== "number" || pos < 0 || pos > src.length) return null;
    const code = stripStringsAndComments2(src).codeOnly;
    const atChar = pos < code.length ? code[pos] : "";
    let q = pos - 1;
    while (q >= 0 && /\s/.test(code[q])) q--;
    const prev = q >= 0 ? code[q] : "";
    const valueEmpty = atChar === "" || STUCK_VALUE_END.indexOf(atChar) !== -1;
    if (prev === ":" || prev === "：") {
      if (atChar === ":" || atChar === "：" || STUCK_ASSIGN_CHARS.indexOf(atChar) !== -1 || /[0-9０-９]/.test(atChar) || valueEmpty) return "BAD_PROPERTY";
    }
    var NO_LEFT_PREV = "(（＝=！!。．｡「、:：";
    if (STUCK_OPERATOR_CHARS.indexOf(atChar) !== -1) {
      if (prev === "" || NO_LEFT_PREV.indexOf(prev) !== -1) return "NO_LEFT_OPERAND";
    }
    if (STUCK_ASSIGN_CHARS.indexOf(atChar) !== -1) {
      if (prev === "" || STUCK_VALUE_END.indexOf(prev) !== -1 || prev === "！" || prev === "!" || prev === "「" || prev === "(" || prev === "（") return "NO_LHS";
    }
    if ((atChar === "！" || atChar === "!") && STUCK_OPERATOR_CHARS.indexOf(prev) !== -1) return "NO_OPERAND";
    if (valueEmpty) {
      if (STUCK_ASSIGN_CHARS.indexOf(prev) !== -1) return "NO_VALUE";
      if (STUCK_OPERATOR_CHARS.indexOf(prev) !== -1) return "NO_OPERAND";
      if (prev === "！" || prev === "!") return "NO_METHOD";
      if (isOperandChar(prev)) return "DANGLING_VALUE";
    }
    if (isOperandChar(atChar) && prev === "」") return "VALUE_AFTER_BLOCK";
    if (isOperandChar(atChar) && isOperandChar(prev)) return "NO_OPERATOR";
    return null;
  }
  function detectNumberGluedToMethod(src, methodNames2) {
    if (!methodNames2 || methodNames2.size === 0) return null;
    const code = stripStringsAndComments2(src).codeOnly;
    const re = /[0-9０-９]+([ぁ-んァ-ヶ一-龥ー々a-zA-Z_]+)/g;
    let m;
    while ((m = re.exec(code)) !== null) {
      const word = m[1];
      if (methodNames2.has(word)) {
        return { num: m[0].slice(0, m[0].length - word.length), word, offset: m.index };
      }
    }
    return null;
  }
  function detectBangThenOperator(src) {
    const code = stripStringsAndComments2(src).codeOnly;
    const m = /[!！][\s　]*[=＝＊*×／/÷％%＞＜<>]/.exec(code);
    return m ? m.index : -1;
  }
  function buildOtherMessage(src, pos) {
    const tips = "よくある原因: 演算子（＊＋−／）の抜け・「！」の付け方・かっこ「」（）の対応・全角/半角の混在を確認してください。";
    if (typeof pos !== "number" || pos < 0) return "プログラムの書き方を読み取れませんでした。" + tips;
    const code = stripStringsAndComments2(src).codeOnly;
    const tok = (pos < code.length ? code[pos] || "" : "").trim();
    const lineNo = offsetToLine2(src, Math.min(pos, Math.max(0, src.length - 1)));
    let line = lineAt2(src, lineNo).trim();
    if (line.length > 60) line = line.slice(0, 60) + "…";
    const where = tok ? `「${tok}」のあたりで` : "この付近で";
    return `${where}書き方を読み取れませんでした。${tips}` + (line ? `
（${lineNo}行目: ${line}）` : "");
  }
  function classify2(rec, methodNames2) {
    const src = rec.srcText || "";
    const pos = rec.pos;
    const chkOk = rec.checkerOk;
    const chkLine = rec.checkerLine;
    const result = (category, subdetail = "") => {
      const lineNo = typeof chkLine === "number" && chkLine > 0 ? chkLine : offsetToLine2(src, typeof pos === "number" ? pos : 0);
      let userMessage = CATEGORY_MESSAGES2[category] || category;
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
    if (chkOk) return result("PARSE_OK_BUT_LOGGED");
    const stripped = src.trim();
    const regions = stripStringsAndComments2(src);
    const codeOnlyStripped = regions.codeOnly.trim();
    if (!stripped || !codeOnlyStripped) return result("EMPTY_PROGRAM");
    if (regions.stringUnclosed) return result("UNCLOSED_STRING");
    const code = regions.codeOnly;
    const br = countBrackets2(code);
    const blockDiff = br.blockOpen - br.blockClose;
    if (blockDiff !== 0) {
      return result("UNCLOSED_BLOCK", (blockDiff > 0 ? "+" : "") + blockDiff);
    }
    const parenDiff = br.fparOpen + br.hparOpen - (br.fparClose + br.hparClose);
    if (parenDiff !== 0) {
      return result("UNCLOSED_PAREN", (parenDiff > 0 ? "+" : "") + parenDiff);
    }
    if (hasDoubleBang2(code)) return result("DOUBLE_BANG");
    if (hasDoublePeriod2(code)) return result("DOUBLE_PERIOD");
    const op = findUnsupportedOp2(code);
    if (op) return result("UNSUPPORTED_OP", op);
    if (hasEscapeSeqInStrings2(src)) return result("ESCAPE_SEQ");
    const errLineNo = typeof chkLine === "number" && chkLine > 0 ? chkLine : offsetToLine2(src, typeof pos === "number" ? pos : 0);
    const targetLine = lineAt2(src, errLineNo);
    const prevLine = errLineNo > 1 ? lineAt2(src, errLineNo - 1) : "";
    const srcLines = src.split("\n");
    const maskedLines = maskBlocksForExtraPeriod(src).split("\n");
    for (let ln = 0; ln < maskedLines.length; ln++) {
      if (hasExtraPeriodInLine2(maskedLines[ln])) {
        return result("EXTRA_PERIOD", `line${ln + 1}`);
      }
    }
    const selfLine = selfMissingBangLine(src);
    if (selfLine != null) {
      const r = result("MISSING_BANG", `self_paren`);
      r.lineNo = selfLine;
      return r;
    }
    for (let ln = 0; ln < srcLines.length; ln++) {
      if (looksLikeMissingBang2(srcLines[ln])) {
        return result("MISSING_BANG", `line${ln + 1}`);
      }
    }
    const selfPeriodLine = selfAfterCloseParenLine(src);
    if (selfPeriodLine != null) {
      const r = result("PERIOD_MISSING", "self_after_paren");
      r.lineNo = selfPeriodLine;
      r.userMessage = "文の区切りに「。」が抜けています。前の文の終わりに「。」を付けてください。";
      return r;
    }
    if (lineLacksTerminator2(prevLine) && prevLine.trim()) {
      const r = result("PERIOD_MISSING", "prev_line");
      if (r.lineNo > 1) r.lineNo -= 1;
      return r;
    }
    if (lineLacksTerminator2(targetLine) && targetLine.trim()) {
      return result("PERIOD_MISSING", "this_line");
    }
    let resAssign = firstReservedAssign2(targetLine) || firstReservedAssign2(prevLine);
    if (resAssign) return result("INVALID_ASSIGNMENT", resAssign);
    if (methodNames2 && methodNames2.size > 0) {
      const calls = extractMethodCalls2(code);
      for (const name of calls) {
        if (!methodNames2.has(name)) {
          const near = closestMethod2(name, methodNames2);
          return result("UNKNOWN_METHOD", `${name}->${near || "NONE"}`);
        }
      }
    }
    const glued = detectNumberGluedToMethod(src, methodNames2);
    if (glued) {
      return {
        category: "NUMBER_GLUED_METHOD",
        subdetail: glued.num + glued.word,
        userMessage: `数字「${glued.num}」と命令「${glued.word}」がくっついています。間にスペースを空けて「${glued.num} ${glued.word}」のように分けて書いてください。`,
        lineNo: offsetToLine2(src, glued.offset)
      };
    }
    const stuckCat = analyzeStuckPoint(src, typeof pos === "number" ? pos : null);
    if (stuckCat) {
      const r = result(stuckCat);
      r.lineNo = offsetToLine2(src, Math.min(pos, Math.max(0, src.length - 1)));
      return r;
    }
    const vs = precheckStatementStructure(src);
    if (vs) return vs;
    const botOff = detectBangThenOperator(src);
    if (botOff >= 0) {
      const r = result("NO_METHOD");
      r.lineNo = offsetToLine2(src, botOff);
      return r;
    }
    const other = result("OTHER");
    other.userMessage = buildOtherMessage(src, typeof pos === "number" ? pos : null);
    return other;
  }
  function lastUnmatchedBlockLine(src) {
    const code = stripStringsAndComments2(src).codeOnly;
    let depth = 0, openIdx = -1;
    for (let i = 0; i < code.length; i++) {
      if (code[i] === "「") {
        if (depth === 0) openIdx = i;
        depth++;
      } else if (code[i] === "」") {
        if (depth > 0) depth--;
      }
    }
    return depth > 0 && openIdx >= 0 ? offsetToLine2(src, openIdx) : null;
  }
  function precheckUnbalanced(src) {
    const text = src || "";
    const make = (category, lineNo, userMessage) => ({
      category,
      subdetail: "precheck",
      userMessage: userMessage || CATEGORY_MESSAGES2[category] || category,
      lineNo: lineNo || 1
    });
    const regions = stripStringsAndComments2(text);
    if (regions.stringUnclosed) {
      const idx = Math.max(text.lastIndexOf('"'), text.lastIndexOf("“"), text.lastIndexOf("”"));
      return make("UNCLOSED_STRING", idx >= 0 ? offsetToLine2(text, idx) : 1);
    }
    const br = countBrackets2(regions.codeOnly);
    const blockDiff = br.blockOpen - br.blockClose;
    if (blockDiff !== 0) {
      const msg = blockDiff > 0 ? `ブロック「が ${blockDiff} 個多く、」が足りません。` : `ブロック」が ${-blockDiff} 個多く、「が足りません。`;
      const lineNo = (blockDiff > 0 ? lastUnmatchedBlockLine(text) : null) || offsetToLine2(text, text.length - 1);
      return make("UNCLOSED_BLOCK", lineNo, msg);
    }
    const parenDiff = br.fparOpen + br.hparOpen - (br.fparClose + br.hparClose);
    if (parenDiff !== 0) {
      return make("UNCLOSED_PAREN", offsetToLine2(text, text.length - 1));
    }
    return null;
  }
  function isDigitChar(ch) {
    return ch !== void 0 && (ch >= "0" && ch <= "9" || ch >= "０" && ch <= "９");
  }
  function isStatementTerminatorAt(code, i) {
    const c = code[i];
    if (c === "。" || c === "｡") return true;
    if (c === "." || c === "．") return !(isDigitChar(code[i - 1]) && isDigitChar(code[i + 1]));
    return false;
  }
  function maskNestedGroups(text) {
    let out = "", pd = 0, bd = 0;
    for (let k = 0; k < text.length; k++) {
      const ch = text[k];
      if (ch === "(" || ch === "（") {
        pd++;
        out += " ";
      } else if (ch === ")" || ch === "）") {
        if (pd > 0) pd--;
        out += " ";
      } else if (ch === "「") {
        bd++;
        out += " ";
      } else if (ch === "」") {
        if (bd > 0) bd--;
        out += " ";
      } else out += pd > 0 || bd > 0 ? " " : ch;
    }
    return out;
  }
  function stripComparisonOps(m) {
    return m.replace(/[>＞<＜][=＝]/g, "  ").replace(/[!！][=＝]/g, "  ").replace(/[=＝][=＝]/g, "  ");
  }
  function statementType(text) {
    const m = stripComparisonOps(maskNestedGroups(text));
    if (/[=＝]/.test(m)) return 1;
    if (/[！!]/.test(m)) return 2;
    return 3;
  }
  const PROCEDURE_FUNCS = /* @__PURE__ */ new Set(["乱数初期化", "乱数初期化する", "らんすうしょきか", "らんすうしょきかする", "setseed"]);
  function isSingleParenCall(t, names2) {
    const mm = /^[^\s　（(）)「」=＝！!]+[（(]/.exec(t);
    if (!mm) return false;
    if (names2 && !names2.has(mm[0].slice(0, -1).toLowerCase())) return false;
    let depth = 0;
    for (let k = mm[0].length - 1; k < t.length; k++) {
      const ch = t[k];
      if (ch === "(" || ch === "（") depth++;
      else if (ch === ")" || ch === "）") {
        depth--;
        if (depth === 0) return k === t.length - 1;
      }
    }
    return false;
  }
  function isCompoundValue(text) {
    const m = stripComparisonOps(maskNestedGroups(text)).trim();
    if (isSingleParenCall(text.trim(), PROCEDURE_FUNCS)) return false;
    return /\S[\s　]/.test(m) || /[（(]/.test(text);
  }
  function precheckStatementStructure(src) {
    const text = src || "";
    const code = stripStringsAndComments2(text).codeOnly;
    let suspectOffset = -1, suspectWord = null;
    let i = 0;
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
        if (depth === 0) {
          const w = noEffectWord(s);
          if (w) {
            suspectOffset = s.start;
            suspectWord = w;
            return;
          }
        }
        if (!isCompoundValue(s.text)) continue;
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
        if (t.trim() || text.slice(start, end).trim()) stmts.push({ start, text: t });
        start = end + 1;
      };
      while (i < code.length) {
        const c = code[i];
        if (c === "「") {
          i++;
          walkLevel(depth + 1);
          continue;
        }
        if (c === "」") {
          flush(i);
          i++;
          finalize(stmts, depth);
          return;
        }
        if (isStatementTerminatorAt(code, i)) {
          flush(i);
          i++;
          continue;
        }
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
        lineNo: offsetToLine2(text, suspectOffset)
      };
    }
    return {
      category: "VALUE_STMT",
      subdetail: "value_stmt",
      userMessage: "この文には代入「＝」も命令送信「！」も見当たりません。「＝」(代入)か「！」(命令)が抜けていないか確認してください。",
      lineNo: offsetToLine2(text, suspectOffset)
    };
  }
  global.DolittleClassify = {
    classify: classify2,
    closestMethod: closestMethod2,
    precheckUnbalanced,
    // ★djsローカル追加（実行前の構造チェック）
    precheckStatementStructure,
    // ★djsローカル追加（文構造ベース判定）
    CATEGORY_MESSAGES: CATEGORY_MESSAGES2,
    // 以下はテスト/デバッグ用に公開
    stripStringsAndComments: stripStringsAndComments2,
    offsetToLine: offsetToLine2
  };
})(g);
var djs_precheck_unbalanced_default = g.DolittleClassify.precheckUnbalanced;

// djs-virtual:djs-category-labels
var djs_category_labels_default = {
  EMPTY_PROGRAM: "プログラムが空",
  UNCLOSED_STRING: "文字列の閉じ忘れ",
  UNCLOSED_BLOCK: "ブロック「」の数",
  UNCLOSED_PAREN: "丸括弧の数",
  PERIOD_MISSING: "句点「。」抜け",
  EXTRA_PERIOD: "余分な「。」",
  DOUBLE_PERIOD: "「。」の連続",
  DOUBLE_BANG: "「！」の連続",
  MISSING_BANG: "「！」抜け",
  UNKNOWN_METHOD: "未登録の命令名",
  INVALID_ASSIGNMENT: "システム名の上書き",
  UNSUPPORTED_OP: "使えない演算子",
  ESCAPE_SEQ: "エスケープ記号",
  NO_VALUE: "右辺の値なし",
  NO_OPERAND: "演算子の後に値なし",
  NO_LEFT_OPERAND: "演算子の前に値なし",
  NO_METHOD: "！の後に命令なし",
  NO_LHS: "左辺の変数名なし",
  NO_OPERATOR: "演算子の抜け",
  VALUE_STMT: "文の構造",
  PARSE_OK_BUT_LOGGED: "実行時エラーの可能性",
  RUNTIME: "実行中のエラー",
  OTHER: "エラー"
};

// tools/bitarrow_kit/src/diagnoseEntry.js
var names = (t) => new Set(String(t).split(/\r?\n/).map((s) => s.trim()).filter(Boolean));
var methodNames = names(dolittle_methods_default);
var deps = {
  classify,
  CATEGORY_MESSAGES,
  repairDiagnose: diagnose,
  REPAIR_MESSAGES,
  locateMissingClose,
  locateExtraClose,
  parserKind: "djs",
  lint,
  lintHelpers: { extractMethodCalls, closestMethod },
  language: dolittle_language_exports,
  lintNames: names(dolittle_methods_all_default)
};
var label = (cat) => djs_category_labels_default[cat] || (nameOf(cat) !== cat ? nameOf(cat) : "") || "エラー";
function describeFix(src, fixedSrc) {
  if (!fixedSrc || fixedSrc === src) return "";
  const ops = lineDiff(src, fixedSrc), out = [];
  for (let k = 0; k < ops.length; ) {
    if (ops[k].op === "same") {
      k++;
      continue;
    }
    let e = k;
    while (e < ops.length && ops[e].op !== "same") e++;
    const dels = ops.slice(k, e).filter((o) => o.op === "del"), adds = ops.slice(k, e).filter((o) => o.op === "add");
    for (let i = 0; i < Math.max(dels.length, adds.length); i++) {
      const d = dels[i], a = adds[i];
      if (d && a) out.push(`${d.a}行目: ${d.text.trim()} → ${a.text.trim()}`);
      else if (d) out.push(`${d.a}行目を消す: ${d.text.trim()}`);
      else out.push(`${a.b}行目に足す: ${a.text.trim()}`);
    }
    k = e;
  }
  return (out.length > 4 ? [...out.slice(0, 4), "…"] : out).join(" ／ ");
}
var one = (s) => String(s || "").replace(/\s*\n\s*/g, " ").trim();
function format(src, category, line, userMessage, fixedSrc) {
  const fix = describeFix(src, fixedSrc);
  return {
    category,
    line: line || 0,
    text: `【${label(category)}】 ${line ? line + "行目付近: " : ""}${one(userMessage)}${fix ? " 直し方の例: " + fix : ""}`
  };
}
function explain(src, parser) {
  deps.parser = parser;
  if (deps.checkerFor !== parser) {
    deps.checker = makeChecker(parser, "djs");
    deps.checkerFor = parser;
  }
  const d = diagnoseProgram(src, methodNames, deps, "sfirst");
  if (!d || !d.category) return null;
  return format(src, d.category, d.line, d.userMessage, d.fixTrusted ? d.fixedSrc : "");
}
function precheck(src) {
  const p = djs_precheck_unbalanced_default(src);
  return p ? format(src, p.category, p.lineNo, p.userMessage, "") : null;
}
var diagnoseEntry_default = { explain, precheck };
export {
  diagnoseEntry_default as default,
  explain,
  precheck
};
