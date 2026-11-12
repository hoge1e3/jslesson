// HTML オブジェクト（HTML 対応ドリトル）。元: ~/Dropbox/claudeCode/www/jsdolittle/djs-beta-html/runtime/js/HTML.js（2026-09-29 版）。
// 1〜608 行目相当（dfs2dom と CSS・属性・プロパティの日本語名の対応表）はそのまま写し、以降を djs 向けに書き直した（2026-10-25 試作）。
// 使い方（マニュアル ref_html_js）: 要素＝<p>文</p>。 <span></span>！"文" テキスト。 要素：動作＝「…」。 出力欄＝#output。
function dfs2dom(node, depth = 0) {
	if(!node)return null;
	const dom = root.htmldom.createForTag(node.nodeName.toLowerCase());
	if (node.attributes) {
		for (const attr of node.attributes) {
			if(attr.name == 'id'){
				// root[attr.value.replaceAll(/-/g,'_')] = dom;
				dom.element.id=attr.value;
				continue;
			}
			if(attr.name == 'class'){
				dom.element.classList.add(attr.value);
				continue;
			}
			dom.element.setAttribute(attr.name,attr.value);
			// try{
			//   dom.element[attr.name] = attr.value;
			// }catch(e){
			// }
		}
	}
	dom.applyAction();
	for (const child of node.childNodes) {
		if (child.nodeType === Node.TEXT_NODE) {
			if (child.textContent.trim() !== '') {
				// 文字と子要素が混ざるとき（<p>こんにちは<b>太字</b>世界</p>）も順序を保つ（beta は textContent に代入していて子要素が消えた）
				dom.element.appendChild(document.createTextNode(child.textContent.trim()));
			}
		} else {
			const childDOM = dfs2dom(child, depth + 1);
			childDOM.appendTo(dom);
			dom._subNodes.push(childDOM);
		}
	}
	return dom;
}

const cssPropertyMap = {
	"アクセント色": "accentColor",
	"追加記号": "additiveSymbols",
	"コンテンツ整列": "alignContent",
	"アイテム整列": "alignItems",
	"自身整列": "alignSelf",
	"基準線揃え": "alignmentBaseline",
	"一括設定": "all",
	"アニメーション": "animation",
	"アニメーション遅延": "animationDelay",
	"アニメーション方向": "animationDirection",
	"アニメーション時間": "animationDuration",
	"アニメーション終了状態": "animationFillMode",
	"アニメーション繰り返し回数": "animationIterationCount",
	"アニメーション名": "animationName",
	"アニメーション再生状態": "animationPlayState",
	"アニメーション速度曲線": "animationTimingFunction",
	"外観": "appearance",
	"縦横比": "aspectRatio",
	"背景フィルター": "backdropFilter",
	"裏面表示": "backfaceVisibility",
	"背景": "background",
	"背景固定": "backgroundAttachment",
	"背景合成モード": "backgroundBlendMode",
	"背景クリップ": "backgroundClip",
	"背景色": "backgroundColor",
	"塗る": "backgroundColor",
	"背景画像": "backgroundImage",
	"背景起点": "backgroundOrigin",
	"背景位置": "backgroundPosition",
	"背景繰り返し": "backgroundRepeat",
	"背景サイズ": "backgroundSize",
	"ブロックサイズ": "blockSize",
	"枠線": "border",
	"下枠線": "borderBottom",
	"下枠線色": "borderBottomColor",
	"左下角丸": "borderBottomLeftRadius",
	"右下角丸": "borderBottomRightRadius",
	"下枠線スタイル": "borderBottomStyle",
	"下枠線幅": "borderBottomWidth",
	"枠線結合": "borderCollapse",
	"枠線色": "borderColor",
	"枠線画像": "borderImage",
	"枠線画像はみ出し": "borderImageOutset",
	"枠線画像繰り返し": "borderImageRepeat",
	"枠線画像分割": "borderImageSlice",
	"枠線画像ソース": "borderImageSource",
	"枠線画像幅": "borderImageWidth",
	"左枠線": "borderLeft",
	"左枠線色": "borderLeftColor",
	"左枠線スタイル": "borderLeftStyle",
	"左枠線幅": "borderLeftWidth",
	"角丸": "borderRadius",
	"右枠線": "borderRight",
	"右枠線色": "borderRightColor",
	"右枠線スタイル": "borderRightStyle",
	"右枠線幅": "borderRightWidth",
	"枠線間隔": "borderSpacing",
	"枠線スタイル": "borderStyle",
	"上枠線": "borderTop",
	"上枠線色": "borderTopColor",
	"左上角丸": "borderTopLeftRadius",
	"右上角丸": "borderTopRightRadius",
	"上枠線スタイル": "borderTopStyle",
	"上枠線幅": "borderTopWidth",
	"枠線幅": "borderWidth",
	"下位置": "bottom",
	"装飾分割": "boxDecorationBreak",
	"影": "boxShadow",
	"ボックスサイズ": "boxSizing",
	"後改ページ": "breakAfter",
	"前改ページ": "breakBefore",
	"内部改ページ": "breakInside",
	"表題位置": "captionSide",
	"キャレット色": "caretColor",
	"フロート解除": "floatClear",
	"クリップ": "clip",
	"クリップパス": "clipPath",
	"文字色": "color",
	"fontColor": "color",
	"段組み数": "columnCount",
	"段組み埋め": "columnFill",
	"段組み間隔": "columnGap",
	"段組み罫線": "columnRule",
	"段組み罫線色": "columnRuleColor",
	"段組み罫線スタイル": "columnRuleStyle",
	"段組み罫線幅": "columnRuleWidth",
	"段組み結合": "columnSpan",
	"段組み幅": "columnWidth",
	"段組み": "columns",
	"内容": "content",
	"カウンター増分": "counterIncrement",
	"カウンターリセット": "counterReset",
	"カーソル": "cursor",
	"文字方向": "direction",
	"表示方法": "display",
	"空セル表示": "emptyCells",
	"フィルター": "filter",
	"柔軟性": "flex",
	"基準サイズ": "flexBasis",
	"配置方向": "flexDirection",
	"配置フロー": "flexFlow",
	"伸長係数": "flexGrow",
	"収縮係数": "flexShrink",
	"折り返し": "flexWrap",
	"フロート": "float",
	"フォント": "font",
	"フォント種類": "fontFamily",
	"文字サイズ": "fontSize",
	"フォントスタイル": "fontStyle",
	"フォントバリアント": "fontVariant",
	"文字の太さ": "fontWeight",
	"間隔": "gap",
	"グリッド": "grid",
	"グリッド配置": "gridArea",
	"自動列サイズ": "gridAutoColumns",
	"自動配置": "gridAutoFlow",
	"自動行サイズ": "gridAutoRows",
	"列配置": "gridColumn",
	"列終了": "gridColumnEnd",
	"列間隔": "gridColumnGap",
	"列開始": "gridColumnStart",
	"グリッド間隔": "gridGap",
	"行配置": "gridRow",
	"行終了": "gridRowEnd",
	"行間隔": "gridRowGap",
	"行開始": "gridRowStart",
	"グリッドテンプレート": "gridTemplate",
	"領域名": "gridTemplateAreas",
	"列構成": "gridTemplateColumns",
	"行構成": "gridTemplateRows",
	"高さ": "height",
	"ハイフネーション": "hyphens",
	"画像描画": "imageRendering",
	"位置": "inset",
	"重ね合わせ分離": "isolation",
	"主軸配置": "justifyContent",
	"アイテム配置": "justifyItems",
	"自身配置": "justifySelf",
	"左位置": "left",
	"文字間隔": "letterSpacing",
	"行高": "lineHeight",
	"リスト形式": "listStyle",
	"リスト画像": "listStyleImage",
	"リストマーク位置": "listStylePosition",
	"リストマーク種類": "listStyleType",
	"外側余白": "margin",
	"下外側余白": "marginBottom",
	"左外側余白": "marginLeft",
	"右外側余白": "marginRight",
	"上外側余白": "marginTop",
	"最大高さ": "maxHeight",
	"最大幅": "maxWidth",
	"最小高さ": "minHeight",
	"最小幅": "minWidth",
	"混合モード": "mixBlendMode",
	"オブジェクト適合": "objectFit",
	"オブジェクト位置": "objectPosition",
	"不透明度": "opacity",
	"順序": "order",
	"輪郭線": "outline",
	"輪郭線色": "outlineColor",
	"輪郭線オフセット": "outlineOffset",
	"輪郭線スタイル": "outlineStyle",
	"輪郭線幅": "outlineWidth",
	"はみ出し制御": "overflow",
	"はみ出し処理": "overflow",
	"ラッピング": "overflow",
	"単語分割": "overflowWrap",
	"横はみ出し制御": "overflowX",
	"縦はみ出し制御": "overflowY",
	"内側余白": "padding",
	"下内側余白": "paddingBottom",
	"左内側余白": "paddingLeft",
	"右内側余白": "paddingRight",
	"上内側余白": "paddingTop",
	"後改ページ": "pageBreakAfter",
	"前改ページ": "pageBreakBefore",
	"内部改ページ": "pageBreakInside",
	"遠近法": "perspective",
	"遠近法原点": "perspectiveOrigin",
	"ポインター制御": "pointerEvents",
	"配置方法": "position",
	"引用符": "quotes",
	"サイズ変更": "resize",
	"右位置": "right",
	"回転": "rotate",
	"拡大縮小": "scale",
	"スクロール動作": "scrollBehavior",
	"テーブルレイアウト": "tableLayout",
	"文字揃え": "textAlign",
	"文字装飾": "textDecoration",
	"文字装飾色": "textDecorationColor",
	"文字装飾線": "textDecorationLine",
	"文字装飾スタイル": "textDecorationStyle",
	"段落字下げ": "textIndent",
	"文字はみ出し": "textOverflow",
	"文字影": "textShadow",
	"文字変換": "textTransform",
	"上位置": "top",
	"変形": "transform",
	"変形原点": "transformOrigin",
	"変形スタイル": "transformStyle",
	"遷移": "transition",
	"遷移遅延": "transitionDelay",
	"遷移時間": "transitionDuration",
	"遷移プロパティ": "transitionProperty",
	"遷移速度曲線": "transitionTimingFunction",
	"移動": "translate",
	"双方向テキスト": "unicodeBidi",
	"テキスト選択": "userSelect",
	"縦配置": "verticalAlign",
	"可視性": "visibility",
	"空白制御": "whiteSpace",
	"幅": "width",
	"単語改行": "wordBreak",
	"単語間隔": "wordSpacing",
	"単語折り返し": "wordWrap",
	"文字表記方向": "writingMode",
	"重なり順序": "zIndex",
	"拡大率": "zoom",
}
const cssPropertyProxy = {
	width:{
		get:function(v){ return parseFloat(v); },
		set:function(v){ if(typeof v == 'number') return v+'px'; return v; }
	},
	height:{
		get:function(v){ return parseFloat(v); },
		set:function(v){ if(typeof v == 'number') return v+'px'; return v; }
	},
};

function createStyleManager(element) {
  const baseHandler = {
    get(target, prop) {
      const cssProperty = cssPropertyMap[prop] || prop;
			if(cssPropertyProxy[cssProperty]&&cssPropertyProxy[cssProperty].get){
				return cssPropertyProxy[cssProperty].get(element.style[cssProperty]);
			}
      return element.style[cssProperty];
    },

    set(target, prop, value) {
      const cssProperty = cssPropertyMap[prop] || prop;
			if(cssPropertyProxy[cssProperty]&&cssPropertyProxy[cssProperty].set){
				value = cssPropertyProxy[cssProperty].set(value);
			}
			// console.log(`${cssProperty} ==> ${value}`);
			element.style[cssProperty] = value;
      return true;
    },

    has(target, prop) {
      return prop in cssPropertyMap || prop in element.style;
    },

    ownKeys(target) {
      return [...new Set([
        ...Object.keys(cssPropertyMap),
        ...Object.keys(element.style)
      ])];
    },

    getOwnPropertyDescriptor(target, prop) {
      return {
        enumerable: true,
        configurable: true,
        value: this.get(target, prop)
      };
    }
  };

  return new Proxy({}, baseHandler);
}

const DOMAttributeMap = {
	
	// 基本的な属性
	"識別子": "id",
	"クラス": "class",
	// "スタイル": "style", // スタイルは別で定義
	"ツールチップ": "title",
	"補足情報": "title",
	"補足説明": "title",
	"言語": "lang",
	"文字方向": "dir",
	"非表示": "hidden",

	// リンク・参照関連
	"リンク先": "href",
	"ソース": "src",
	"代替テキスト": "alt",
	"表示先": "target",
	"関連性": "rel",
	"種類": "type",
	"タイプ": "type",
	"名前": "name",
	// "値": "value", // DOMPropertyとして定義

	// フォーム関連
	"送信先": "action",
	"送信方法": "method",
	"エンコード方式": "enctype",
	"自動補完": "autocomplete",
	"自動フォーカス": "autofocus",
	"無効化": "disabled",
	"読み取り専用": "readonly",
	"読取り専用": "readonly",
	"読取専用": "readonly",
	"必須項目": "required",
	"必須": "required",
	"入力例": "placeholder",
	"ヒント": "placeholder",
	"プレースホルダー": "placeholder",
	"入力パターン": "pattern",
	"最大文字数": "maxlength",
	"最大長": "maxlength",
	"最小文字数": "minlength",
	"最大値": "max",
	"最小値": "min",
	"刻み値": "step",
	"複数選択": "multiple",
	"チェック状態": "checked",
	"チェック": "checked",
	"選択状態": "checked",
	"選択済み": "selected",

	// 表示制御
	"編集可能": "contenteditable",
	"ドラッグ可能": "draggable",
	"スペルチェック": "spellcheck",
	"タブ順序": "tabindex",

	// メディア関連
	// "幅": "width",
	// "高さ": "height",
	"コントロール表示": "controls",
	"自動再生": "autoplay",
	"繰り返し": "loop",
	"ミュート": "muted",
	"先読み": "preload",
	"サムネイル": "poster",
	"インライン再生": "playsinline",
	"現在時間": "currenttime",
	"音量": "volume",
	"バッファー済み": "buffered",
	"再生済み": "played",
	"シーク中": "seeking",
	"終了状態": "ended",

	// テーブル関連
	"横結合": "colspan",
	"縦結合": "rowspan",
	"関連見出し": "headers",
	"スコープ": "scope",

	// イベントハンドラ
	"クリック時": "onclick",
	"変更時": "onchange",
	"送信時": "onsubmit",
	"読み込み時": "onload",
	"入力時": "oninput",
	"キー押下時": "onkeydown",
	"エンターキー押下時": "onenterdown",
	"キー解放時": "onkeyup",
	"マウス進入時": "onmouseenter",
	"マウス退出時": "onmouseleave",
	"フォーカス時": "onfocus",
	"フォーカス消失時": "onblur",

	// アクセシビリティ
	"役割": "role",
	"音声ラベル": "aria-label",
	"説明元": "aria-describedby",
	"音声非表示": "aria-hidden",
	"展開状態": "aria-expanded",
	"制御対象": "aria-controls",
	"更新通知": "aria-live",
	"必須状態": "aria-required",
	"チェック状態": "aria-checked",
	"無効状態": "aria-disabled",
	"押下状態": "aria-pressed",
	"ポップアップ有無": "aria-haspopup",
	"現在位置": "aria-current",
	"更新単位": "aria-atomic",
	"更新中": "aria-busy",
	"列数": "aria-colcount",
	"列番号": "aria-colindex",
	"列結合数": "aria-colspan",
	"詳細参照": "aria-details",
	"エラーメッセージ": "aria-errormessage",
	"読み上げ順序": "aria-flowto",
	"不正状態": "aria-invalid",
	"ショートカット": "aria-keyshortcuts",
	"階層レベル": "aria-level",
	"モーダル状態": "aria-modal",
	"複数行": "aria-multiline",
	"複数選択可": "aria-multiselectable",
	"方向": "aria-orientation",
	"位置番号": "aria-posinset",
	"更新通知種類": "aria-relevant",
	"行数": "aria-rowcount",
	"行番号": "aria-rowindex",
	"行結合数": "aria-rowspan",
	"全体数": "aria-setsize",
	"ソート状態": "aria-sort",
	"値テキスト": "aria-valuetext",

	// メタ情報
	"文字コード": "charset",
	"内容": "content",
	"HTTP設定": "http-equiv",
	"プロパティ名": "property",
	"スキーマ": "scheme",

	// スクリプト関連
	"非同期読み込み": "async",
	"遅延読み込み": "defer",
	"完全性": "integrity",
	"クロスオリジン": "crossorigin",

	// フォーム検証
	"検証無効": "novalidate",
	"フォーム検証無効": "formnovalidate",
	"フォーム参照": "form",
	"送信先上書き": "formaction",
	"送信方法上書き": "formmethod",
	"開き方上書き": "formtarget",
	"エンコード方式上書き": "formenctype",

	// iframe関連
	"サンドボックス": "sandbox",
	"機能許可": "allow",
	"読み込み方式": "loading",
	"リファラー方針": "referrerpolicy",

	// その他
	"受入形式": "accept",
	"キャプチャー": "capture",
	"候補リスト": "list",
	"開封状態": "open",
	"メディア条件": "media",
	"サイズ一覧": "sizes",
	"リソース種別": "as"
};
const DOMAttributeProxy = {
	'onclick':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'onchange':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'onsubmit':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'onload':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'oninput':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'onkeydown':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'onenterdown':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'onkeyup':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'onmouseenter':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'onmouseleave':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'onfocus':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
	'onblur':{
		set:function(f,target){
			if(!typeof f == 'function') return;
			f.isEventHandler = true;
			return f.bind(target);
		}
	},
};

const DOMPropertyMap = {
	"値": "value",
  "内部テキスト": "innerText",
  "HTML内容": "innerHTML",
  "HTML要素": "innerHTML",
  "外部HTML": "outerHTML",
	"テキスト": "textContent",
  "子要素": "children",
  "親要素": "parentNode",
  "次要素": "nextSibling",
  "前要素": "previousSibling",
  "最初の子要素": "firstChild",
  "最後の子要素": "lastChild"
};
const DOMPropertyProxy = {
	innerHTML:{
		set:function(v){
			return (v instanceof HTMLElement)?v:v.toString();
		},
	},
};

const enterKeyTypes = ["text", "search", "email", "url", "number", "tel", "password"];

// ===== ここから djs 向けの本体（djs-beta-html の HTML.js 610〜1221 行を写し、djs の実行環境（lib.js の root・send・DtlValue・checkerror）に合わせた） =====
// 変えた点: ES module → 通常の script、#UI-div → #UI_div、root['ラベル'/'ボタン'/'フィールド'/'テキストエリア'] の置き換えはしない
// （djs の GUI 部品を残す）、動作は root.system.send 経由（ブロックの返す・エラー表示が他の部品と同じ）、
// 別名の定義は要素ごとでなく root.htmldom に 1 回、数は DtlValue、色は Color の toString（rgba）、#id で取った既存要素は wrap で包む
(function(){
	var root=window.root;
	var V=root.system.dtlValue;
	var toNum=function(v){ v=V.prim(v); return V.isNumLike(v)?V.toNum(v):NaN; };
	var str=function(v){ v=V.prim(v); return (v===null||v===undefined)?'':String(v); };
	var rtErr=function(msg){ var R=window.DolittleRuntimeError; if(R&&R.RtError) return R.RtError("RT_HTML",msg); var e=new Error(msg); e.isDolittleRt=true; return e; };

	root.dom=root.create();
	var H=root.htmldom=root.create();
	H.originObj=H;
	H.action=function(){};
	H.action.isEventHandler=true;
	H._subNodes=[];
	H._domObjList=[];
	H.toString=function(){ return this.element?this.element.outerHTML:''; };
	H.__isHtmlDom=true;
	H.dtlValue=function(){ return this.read(); };   // 計算・比較・テキストへの代入で要素を使うと中身の値（lib.js の DtlValue.prim）

	// 文字列の HTML → 要素オブジェクト（最初の要素を返す。<style> 等 head に入るものや 2 つ目以降も本文に置く）
	root.parseHTML=function(htmlString){
		// <template> の中身として解析する（2026-11-02）。DOMParser の body では <tr>・<td>・<th>・<caption>・<col> など
		// 表の部品が単独では捨てられて「読めませんでした」になったが、template の解析規則はこれらを残す（<style>・<meta> 等も中身に残る）。
		var tpl=document.createElement('template');
		tpl.innerHTML=htmlString;
		var all=Array.prototype.slice.call(tpl.content.childNodes).filter(function(n){ return n.nodeType===1; });
		if(!all.length){
			// 念のため従来の解析も試す（<body …> だけを書いた場合など）
			var doc=new DOMParser().parseFromString(htmlString,'text/html');
			var bodyChilds=Array.prototype.slice.call(doc.body.childNodes).filter(function(n){ return n.nodeType===1; });
			var headChilds=Array.prototype.slice.call(doc.head.childNodes).filter(function(n){ return n.nodeType===1; });
			all=bodyChilds.length?bodyChilds.concat(headChilds):headChilds;
		}
		if(!all.length) throw rtErr('HTML の要素が読めませんでした: '+htmlString);
		var first=dfs2dom(all[0]);
		for(var i=1;i<all.length;i++) dfs2dom(all[i]);
		return first;
	};
	// #id で既存の要素を取る。ドリトルが作った要素ならそのオブジェクト、そうでなければ包んで返す
	root.getDOM=function(selector){
		var el=document.querySelector(selector);
		if(!el) throw rtErr(selector+' の要素が見つかりません。id の名前を確かめてください。');
		for(var i=0;i<H._domObjList.length;i++){ if(H._domObjList[i].element===el) return H._domObjList[i]; }
		return H.wrap(el);
	};
	H.wrap=function(el){
		var name=el.nodeName.toLowerCase();
		var obj=Object.create(root.dom[name]||H);
		obj.element=el;
		obj._subNodes=[];
		obj.applyAction();
		H._domObjList.push(obj);
		return obj;
	};
	H.createForTag=function(name){
		if(!root.dom[name]) defineTag(name);
		return root.dom[name].create();
	};

	// 動作: ボタン等はクリック、文字の入力欄は Enter、チェック・選択・range 等は変更。ブロックは send 経由で呼ぶ（UI.js の部品と同じ扱い）
	H.applyAction=function(){
		var self=this, el=this.element;
		if(!el||el.__dtlActionApplied) return this;
		el.__dtlActionApplied=true;
		var fire=function(){   // UI.js の UI.callAction と同じ（自分＝要素。run2 で generator を回す＝動作の中の webapi！読む や 待つ が進む）
			var f=self.action;
			if(typeof f!=='function'||f===H.action) return;
			var args=Array.prototype.slice.call(arguments), res;
			try{ res=root.system.run2(f.apply(self,args)); }
			catch(e){ if(e&&e.isReturn) return e.value; root.system.handleError(e); return; }
			if(root.DtlPromise&&root.DtlPromise.isPromise(res)) return res.then(function(r){ return r; },function(e){ if(e&&e.isReturn) return e.value; root.system.handleError(e); });
			return res;
		};
		// どの出来事で発火するかは出来事のたびに要素の種類で決める（<input type="checkbox"> の type は要素を作った後に付くため、作った時点では text）
		var isEnterInput=function(){ return el instanceof HTMLInputElement && enterKeyTypes.indexOf(el.type)>=0; };
		var isValueElem=function(){ return el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement; };
		var down=false;
		el.addEventListener('keydown',function(ev){ if(!isEnterInput()||ev.isComposing) return; if(ev.key==='Enter'&&!down){ down=true; fire(el.value); } });
		el.addEventListener('keyup',function(ev){ if(ev.key==='Enter') down=false; });
		el.addEventListener('change',function(){ if(!isValueElem()||isEnterInput()) return; fire(el.type==='checkbox'?el.checked:el.value); });
		el.addEventListener('click',function(){ if(isValueElem()) return; fire(); });
		return this;
	};
	H.addAlias('action','動作');   // isEventHandler なので「要素：動作＝「…」」が action に入る

	// 名前 1 つにつき、「要素！値 名前」（命令）・「要素：名前＝値」（代入）・「要素：名前」（読む）の 3 つを同じ accessor で受ける:
	// 読むと「その時点の値として振る舞い、呼ぶと設定になる関数」を返す（beta の DOMPropertyMap と同じ仕組み。lib.js の DtlValue.prim が
	// __dtlValue で中身に戻す）。beta は属性と CSS を命令だけにしていたので、教材の「img:src = …」「iframe:src = …」は属性に入らなかった（2026-10-25 に測定）
	var RESERVED=Object.getOwnPropertyNames(H);   // action・動作・read など H の命令と同じ名前の属性（form の action 等）は上書きしない
	var defineAccessor=function(names, getRaw, setRaw, shadow){
		names=names.filter(function(n){ return RESERVED.indexOf(n)<0; });
		var accessor={configurable:true,enumerable:false,
			get:function(){ var self=this, value=getRaw.call(self);
				var primitive=(typeof value==='object'&&value!==null)?String(value):value;
				var f=function(){ setRaw.apply(self,arguments); return self; };
				f.__dtlValue=primitive; f.toString=function(){ return str(value); }; f.valueOf=function(){ return primitive; }; f[Symbol.toPrimitive]=function(){ return primitive; };
				return f; },
			set:function(v,name){
				// 動作の中の素の代入は要素のプロパティになる（UI.js の部品と同じ）。「title = <h3>…</h3>」「closeButton = …」のように
				// 要素やブロックを入れるときは変数として持つ（属性 title に outerHTML を書かない。beta も変数になっていた）
				if(shadow&&((v!==null&&typeof v==='object'&&v.__isHtmlDom)||(typeof v==='function'&&!Object.prototype.hasOwnProperty.call(v,'__dtlValue')))){
					Object.defineProperty(this,name,{value:v,writable:true,configurable:true,enumerable:true}); return;
				}
				setRaw.call(this,v); }};
		names.forEach(function(n){ var a=Object.assign({},accessor); var name=n; a.set=function(v){ accessor.set.call(this,v,name); }; Object.defineProperty(H,n,a); H[n+'?']=function(){ return getRaw.call(this); }; });
	};
	// CSS プロパティ（「要素！"red" 背景色」「要素：背景色＝"red"」「要素！背景色?」）
	Object.keys(cssPropertyMap).forEach(function(ja){
		var en=cssPropertyMap[ja], p=cssPropertyProxy[en];
		defineAccessor([en,ja],
			function(){ var v=this.element.style[en]; return (p&&p.get)?p.get(v):v; },
			function(){ var params=Array.prototype.slice.call(arguments); this.element.style[en]=(p&&p.set)?p.set.apply(null,params):params.map(str).join(' '); }, true);
	});
	// 属性（「画像！"…" ソース」「画像：src＝"…"」「段落！識別子?」）。無い属性は undefined（「要素:id == undefined」が成り立つ）。
	// 真偽の属性（checked・disabled・readonly・selected …）は要素のプロパティを読み書きする（getAttribute は操作後の状態を映さない）
	Object.keys(DOMAttributeMap).forEach(function(ja){
		var en=DOMAttributeMap[ja], p=DOMAttributeProxy[en];
		defineAccessor([en,ja],
			function(){ if(typeof this.element[en]==='boolean') return this.element[en]; var v=this.element.getAttribute(en); if(v===null) return undefined; return (p&&p.get)?p.get(v):v; },
			function(){ var params=Array.prototype.slice.call(arguments);
				if(typeof this.element[en]==='boolean'){ var b=params.length?V.prim(params[0]):true; this.element[en]=!(b===false||b===0||b===''||b==='false'); return; }
				if(p&&p.set){ var v=p.set.apply(null,params.concat([this])); if(typeof v==='function') this.element[en]=v; else this.element.setAttribute(en,v); }
				else this.element.setAttribute(en,params.map(str).join(' ')); }, true);
	});
	// DOM プロパティ（値・テキスト・innerHTML …）
	Object.keys(DOMPropertyMap).forEach(function(ja){
		var en=DOMPropertyMap[ja], p=DOMPropertyProxy[en];
		defineAccessor([en,ja],
			function(){ var v=this.element[en]; return (p&&p.get)?p.get(v):v; },
			function(){ var params=Array.prototype.slice.call(arguments); this.element[en]=(p&&p.set)?p.set.apply(null,params.concat([this])):params.map(str).join(' '); });
	});
	// style: 「要素:style:display＝"none"」（Proxy で日本語の CSS 名も可）と「要素:style＝"color:orange;"」（文字列）の両方
	var styleAccessor={configurable:true,enumerable:false,
		get:function(){ if(!this._style||this._styleEl!==this.element){ this._style=createStyleManager(this.element); this._styleEl=this.element; } return this._style; },
		set:function(v){ this.element.setAttribute('style',str(v)); }};
	Object.defineProperty(H,'style',styleAccessor); Object.defineProperty(H,'見た目',styleAccessor);
	H.applyCssPropertyManager=function(){ return this; };

	H.appendTo=function(target){
		if(target instanceof HTMLElement){} else if(target&&target.element instanceof HTMLElement){ target=target.element; } else return this;
		target.appendChild(this.element);
		return this;
	};
	H.append=function(){
		for(var i=0;i<arguments.length;i++){ var child=arguments[i];
			if(child instanceof HTMLElement){} else if(child&&child.element instanceof HTMLElement){ child=child.element; } else continue;
			this.element.appendChild(child);
		}
		return this;
	};
	// 本文に置く HTML の入れ物。少し余白を取り、長くなったらページがスクロールする（run.html の body は overflow:hidden）
	H.container=function(){
		var c=document.getElementById('HTML_div');
		if(!c){ c=document.createElement('div'); c.id='HTML_div'; c.style.cssText='position:relative;padding:8px;'; document.body.appendChild(c); document.body.style.overflow='auto'; }
		return c;
	};
	H.initializeElement=function(){
		this.element=this.element.cloneNode(true);
		this._subNodes=[];
		H.container().appendChild(this.element);
		this.applyAction();
		H._domObjList.push(this);
	};
	H.newLine=function(){ this.element.before(document.createElement('br')); return this; };
	H.moveTo=function(x,y){
		this.appendTo(document.querySelector('#UI_div'));
		this.element.style.position='absolute';
		if(x!=null) this.element.style.left=toNum(x)+'px';
		if(y!=null) this.element.style.top=toNum(y)+'px';
		return this;
	};
	H.moveBy=function(x,y){
		this.element.style.position='absolute';
		this.element.style.left=(this['xpos?']()+(toNum(x)||0))+'px';
		this.element.style.top=(this['ypos?']()+(toNum(y)||0))+'px';
		return this;
	};
	H['xpos?']=function(){ return this.element.getBoundingClientRect().left; };
	H['ypos?']=function(){ return this.element.getBoundingClientRect().top; };
	H['width?']=function(){ return this.element.offsetWidth; };
	H['height?']=function(){ return this.element.offsetHeight; };
	H.setSize=function(x,y){ this.element.style.boxSizing='border-box'; if(x!=null) this.element.style.width=toNum(x)+'px'; if(y!=null) this.element.style.height=toNum(y)+'px'; return this; };
	H.setFontSize=function(size){ if(size!=null) this.element.style.fontSize=(typeof V.prim(size)==='number')?size+'px':str(size); return this; };
	H.fill=function(color){ this.element.style.backgroundColor=str(color); return this; };   // Color は toString が rgba(...)、文字列（"red"）も可
	H.setFontColor=function(color){ this.element.style.color=str(color); return this; };
	H.hide=function(){ if(this.element.style.display==='none') return this; this.saveDisplay=this.element.style.display||''; this.element.style.display='none'; return this; };
	H.show=function(){ this.element.style.display=this.saveDisplay||''; return this; };
	H.remove=function(){ this.element.remove(); return this; };
	var isValueElem=function(el){ return el instanceof HTMLInputElement||el instanceof HTMLTextAreaElement||el instanceof HTMLSelectElement; };
	H.read=function(){ return isValueElem(this.element)?(this.element.value||''):(this.element.textContent||''); };
	H.write=function(text){ if(isValueElem(this.element)) this.element.value=str(text); else this.element.textContent=str(text); return this; };
	H.increase=function(num){ var a=toNum(this.read()), b=toNum(num); if(!isNaN(a)&&!isNaN(b)) this.write(a+b); return this; };
	H.decrease=function(num){ var a=toNum(this.read()), b=toNum(num); if(!isNaN(a)&&!isNaN(b)) this.write(a-b); return this; };
	H.clear=function(){ this.element.innerHTML=''; if(isValueElem(this.element)) this.element.value=''; this._subNodes=[]; return this; };
	H.classAdd=function(className){ if(typeof className==='string') this.element.classList.add(className); return this; };
	H.setAction=function(f){ if(typeof f==='function') this.action=f; return this; };

	var domAliasMap={
		'newLine':'次の行', 'moveTo':'位置', 'moveBy':'移動する', 'xpos?':'横の位置?', 'ypos?':'縦の位置?',
		'width?':'幅?', 'height?':'高さ?', 'setSize':'大きさ', 'setFontSize':'文字サイズ', 'fill':'塗る', 'setFontColor':'文字色',
		'hide':['消える'], 'remove':['削除する'], 'show':'現れる', 'read':'読む', 'write':'書く', 'increase':'増やす', 'decrease':'減らす',
		'clear':['クリア','要素削除'], 'append':['入れる','いれる','子要素追加'], 'appendTo':'親要素へ追加', 'classAdd':'クラス追加',
		'setAction':['動作設定','setEvent'],
	};
	Object.keys(domAliasMap).forEach(function(from){
		var to=domAliasMap[from]; if(!Array.isArray(to)) to=[to];
		to.forEach(function(t){ H.addAlias(from,t); });
	});

	// タグごとのプロトタイプ root.dom.<tag>。initialize の引数で中身を与える
	var defineTag=function(tagName,init){
		var p=root.dom[tagName]=H.create();
		p.element=document.createElement(tagName);
		p.initialize=init||function(){ this.initializeElement(); };
		return p;
	};
	// 値を持つもの
	["input","textarea","progress","meter"].forEach(function(tagName){
		defineTag(tagName,function(){ this.initializeElement(); var text=Array.prototype.slice.call(arguments);
			if(text.length) this.element.value=text.map(str).join(this.element.tagName==='TEXTAREA'?'\n':''); });
	});
	root.dom.textarea.autoNLf=false;
	root.dom.textarea.autoNL=function(){ this.autoNLf=true; return this; };
	root.dom.textarea.nl=function(){ this.element.value+='\n'; return this; };
	root.dom.textarea.write=function(value){ this.element.value+=str(value); if(this.autoNLf) this.element.value+='\n'; return this; };
	root.dom.textarea.overwrite=function(value){ this.element.value=str(value); return this; };
	root.dom.textarea.readOnly=function(){ this.element.setAttribute('readonly',true); return this; };
	root.dom.textarea.writable=function(){ this.element.removeAttribute('readonly'); return this; };
	root.dom.textarea.addAlias('overwrite','上書き').addAlias('write','書く').addAlias('readOnly','読むだけ').addAlias('writable','読み書き');
	// 文字を持つもの
	["p","h1","h2","h3","h4","h5","h6","span","div","strong","em","blockquote","code","pre","a","li","td","th","caption","label","button","option","title","figcaption","legend","summary","time","address","cite","q","dfn","abbr","footer","header","main","nav","aside","article","section"].forEach(function(tagName){
		defineTag(tagName,function(){ this.initializeElement(); var text=Array.prototype.slice.call(arguments);
			if(text.length) this.element.textContent=text.map(str).join(''); });
	});
	// 子要素の並びを持つもの（配列から作る。「書く」で末尾に、「挿入」で途中に）
	[["ul","li"],["ol","li"],["dl","dt"],["dl","dd"],["select","option"],["tbody","tr"],["tr","td"],["thead","th"],["colgroup","col"],["datalist","option"],["optgroup","option"],["map","area"],["menu","li"]].forEach(function(pair){
		var tagName=pair[0], sub=pair[1];
		var p=defineTag(tagName,function(){ this.initializeElement(); var ary=Array.prototype.slice.call(arguments);
			if(!ary.length) return;
			ary=ary.reduce(function(a,b){ return a.concat(b); },[]);
			this.element.innerHTML='';
			var self=this; ary.forEach(function(item){ self.append(item); }); });
		p.append=function(){
			for(var i=0;i<arguments.length;i++){ var node=arguments[i];
				if(Array.isArray(node)) node=root.dom[sub].create(node);   // 配列は子要素の並び（表の行 HTML：table！（配列！行１ 行２ 作る）作る の行→td）
				else if(!(node&&node.element instanceof HTMLElement)) node=root.dom[sub].create(str(node));
				node.appendTo(this.element); this._subNodes.push(node);
			}
			return this;
		};
		p.addAlias('append','書く');
		p['挿入']=function(pos,v){
			pos=toNum(pos)-1;
			var node=(v&&v.element instanceof HTMLElement)?v:root.dom[sub].create(str(v));
			if(this._subNodes.length<=pos||pos<0){ this.append(node); return this; }
			this.element.insertBefore(node.element,this._subNodes[pos].element);
			this._subNodes.splice(pos,0,node);
			return this;
		};
	});
	// その他
	["html","head","body","meta","link","script","style","base","br","hr","wbr","source","track","embed","object","param","video","audio","picture","iframe","canvas","svg","math","noscript","template","slot","bdi","bdo","data","details","dialog","figure","hgroup","kbd","mark","output","portal","rp","rt","ruby","s","samp","small","sub","sup","var","form","fieldset","col"].forEach(function(tagName){ defineTag(tagName); });
	// 宣言 HTML！使う／HTML！使わない（先頭に書く）: タグの有無による自動判定（minimal.js が root.system.htmlMode=true を出す）を上書きする。
	// 以後に作る GUI 部品の置き場所が変わる（UI.js の autoLayout）。2026-10-26
	root.HTML=root.create();
	root.HTML.use=function(){ root.system.htmlMode=true; return this; };
	root.HTML.unuse=function(){ root.system.htmlMode=false; return this; };
	root.HTML.addAlias('use','使う'); root.HTML.addAlias('unuse','使わない');
	if(!root.alert){ root.alert=function(msg){ root.system.messagedialog(str(msg)); return this; }; }
	defineTag("img",function(src){ this.initializeElement(); if(src!==undefined) this.element.src=str(src); });
	defineTag("table",function(tbl){ this.initializeElement(); if(!Array.isArray(tbl)) return; this.element.innerHTML=''; root.dom.tbody.create(tbl).appendTo(this.element); });
	// ドリトルの文法で要素を作る入口（2026-10-31 先生の決定）: HTML：h1！"見出し" 作る、HTML：ul！"a" "b" 作る、HTML：img！"a.png" 作る、HTML：table！（配列！（配列！"a" "b" 作る）作る）作る。
	// root.HTML.<tag> は root.dom.<tag> と同じプロトタイプ（タグを書いたときと同じ要素になる）。パーサが HTML：タグ名 を見ると HTML モードの印を出す（minimal.js）
	Object.keys(root.dom).forEach(function(tagName){ if(/^[a-z][a-z0-9]*$/.test(tagName) && !(tagName in root.HTML)) root.HTML[tagName]=root.dom[tagName]; });
})();
