(function (){
var root={window:window,document:document, console:console};
window.root=root;
root.root=root;
root.Root=root;
var localize=function (obj, map) {
    for (var k in map) if (obj[k]) obj[map[k]]=obj[k];
};
root.create=function () {
    var r=Object.create(this);
    var init=(r.initialize || r["初期化"] || function (){});
    init.apply(r,arguments);
    return r;
};
root.initialize=function () {};
root.initialize.isEventHandler=true;
root.extend=function (o) {
    for (var k in o) {
        this[k]=o[k];
    }
    return this;
};
root.showAliasState=function (dst) {
    var buf=[];
    //var names=[];
    var a=root.allDtlObjsAndBuiltins;/*.sort(function (a,b) {
        return (a.__name__>b.__name__ ? 1: a.__name__<b.__name__ ? -1:0);
    });*/
    //for (var on in root) names.push(on);
    //names=names.sort();
    a.forEach(function (o) {
        //var o=root[on];
        var on=o.__name__;
        //console.log("NAME",on,o);
        if (o===window || o===console || o===document) return;
        if (o===null || o===undefined) {
            buf.push(on+"="+o);
        } else if ((typeof o!=="object") && (typeof o!=="function")) {
            buf.push(on+"="+o);
        } else {
            //if (o.__VISITED) return;
            for (var k in o) {
                //if (!o.hasOwnProperty(k)) continue;
                buf.push(on+"."+k);
            }
            //o.__VISITED=true;
        }
    });
    buf=buf.sort();
    var str=buf.join("\n");
    return str;
    //$("<textarea>").attr({rows:10}).css("position","absolute").val(str).appendTo("body");
};

root.getAllDtlObjs=function (res,path) {
    var first,resv=[];
    if (!res) {
        res=[];
        first=true;
        path="root";
        this.markDtlObj(path);
    } else {
        path=this.__name__;
    }
    res.push(this);
    for (var k in this) {
        var e=this[k];
        if (root.isPrototypeOf(e)) {
            if (e.markDtlObj(path+":"+k)) {
                resv.push(e);
            }
        } else {
            if (typeof e=="object" && e!==root && e!==null &&
            e!==window && e!==console && e!==document) {
                //沢山ワーニングが出てくるので一時コメントアウト
                //console.log("Warning: not a dtl obj",path+":"+k);
            }
        }
    }
    resv.forEach(function (e) {
        e.getAllDtlObjs(res);
    });
    return res;
};
root.markDtlObj=function (path) {
    if (this.hasOwnProperty("__name__")) return false;
    this.__name__=path;
    return true;
};

root.makeCaseInsensitiveAll=function () {
    //if (!root.allDtlObjsAndBuiltins) {
        root.allDtlObjsAndBuiltins=[Number,String,Boolean,Array,Function].map(function (f) {
            return f.prototype;
        }).concat(root.getAllDtlObjs());
        root.allDtlObjsAndBuiltins.forEach(function (e) {
            root.makeCaseInsensitive(e);
        });
    //}
};
root.makeCaseInsensitive=function (obj) {
    var m={};
    for (var k in obj) {
        if (! obj.hasOwnProperty(k)) continue;
        var l=k.toLowerCase();
        if (k!==l) {
            (m[l]=m[l]||[]).push(k);
        }
    }
    for (var l in m) {
        root.addAlias2.apply(obj,m[l].concat(l));
    }
};
root.addAlias2=function () {
    var methods=Array.prototype.slice.call(arguments);
    var o=this;
    var emp=[];
    var has=[];
    //var parentHas=[];
    for (var i=0 ;i<methods.length; i++) {
        if (methods[i] in o/* && o.hasOwnProperty(methods[i])*/) {
            has.push(methods[i]);
            if (has.length>=2) {
                if (o[has[has.length-1]]!==o[has[0]]) {
                    console.log("Warning! diferrent method ",
                    has[has.length-1], has[0],o[has[has.length-1]], o[has[0]]);
                    return;
                }
            }
        } else {
            /*if (methods[i] in o) {
                parentHas.push(methods[i]);
            } else {*/
                emp.push(methods[i]);
            //}
        }
    }
    /*if (has.length>0 && emp.length>0 && parentHas.length>0) {
        console.log("Warning Complecated! ",has,emp,parentHas);
        return ;
    }*/
    if (has.length>0) {
        if (emp.length>0) root.addAlias.apply(o, [has[0]].concat(emp));
        return o[has[0]];
    } else {
        //沢山警告出て来るので一時コメントアウト
        // console.log("Warning! method not found obj=",o.__name__,"meth=",methods);
    }
    return;
};
root.addAlias=function () {
    var a=Array.prototype.slice.call(arguments);
    var orig=a.shift();
    var t=this;
    if (t[orig] && t[orig].isEventHandler) {
        //console.log("Is event handler:",orig);
        a.forEach(function (al) {
            Object.defineProperty(t,al,{
    	        enumerable:true,configurable:true,
    	        get:function() { return this[orig]; },
    	        set:function(v) { return this[orig]=v; }
            });
        });
    } else {
        a.forEach(function (al) {
            var key="_KEY_"+al;
            Object.defineProperty(t,al,{
    	        enumerable:true,configurable:true,
    	        get:function() {
    	            return (key in this ?this[key]:this[orig]);
    	        },
    	        set:function(v) {
    	            return this[key]=v;
    	        }
            });
        });
    }
    return this;
};
root.findObject=function (obj) {
    if (!root[obj]) {
        obj=obj[0].toUpperCase()+obj.substring(1);
        //console.log("Retrying by",obj);
    }
    if (!root[obj]) {
        obj=obj[0].toLowerCase()+obj.substring(1);
        //console.log("Retrying by",obj);
    }
    return root[obj];
};
root.addAliasFromTable=function () {
    // objects, methods....
    var a=Array.prototype.slice.call(arguments).map(function (e) {
        return e.replace(/\s/g,"");
    });
    var objects=a.shift().split(",");
    var methods=a.join(",").split(",");
    objects.forEach(function (obj) {
        var o=root[obj];//root.findObject(obj);
        if (!o) {
            //沢山ワーニングが出てくるので一時コメントアウト
            // console.log("Warning! object ",obj," not found");
            return;
        }
        if (typeof o === "boolean") return;
        if (typeof o === "function") o=o.prototype;
        root.addAlias2.apply(o, methods);
        /*var originalMethod,cnt=0;
        var emp=[];
        var has=[];
        for (var i=0 ;i<methods.length; i++) {
            //console.log("METHIN",methods[i],"in",root[obj],"->",methods[i] in root[obj]);
            if (methods[i] in o) {
                has.push(methods[i]);
                if (has.length>=2) {
                    if (o[has[has.length-1]]!==o[has[0]]) {
                        console.log("Warning! diferrent method ",has[has.length-1], has[0],o[has[has.length-1]], o[has[0]]);
                        return;
                    }
                }
            } else {
                emp.push(methods[i]);
            }
        }
        if (has.length>0) {
            if (emp.length>0) root.addAlias.apply(o, [has[0]].concat(emp));
        } else {
            console.log("Warning! method not found obj=",obj,"meth=",methods);
        }*/
    });
};
var and=root.create().extend(
    {true:function(){var arr=Array.prototype.slice.call(arguments);var res=Boolean(arr[0]);$.each(arr,function(key,value){res=(res&&value);});return res;}}
);
var or=root.create().extend(
    {true:function(){var arr=Array.prototype.slice.call(arguments);var res=Boolean(arr[0]);$.each(arr,function(key,value){res=(res||value);});return res;}}
);
root.and=and;
root.or=or;

root.system=root.create().extend({
	localize: localize,
	new:function(obj){
    var args=Array.prototype.slice.call(arguments);
    obj=args.shift();
    //console.log(args);
    var creater=function(args){
      return obj.apply(this,args);
    };
    creater.prototype=obj.prototype;
    var res;
    try{
      res=new creater(args);
    }catch(e){
      res=new obj(args[0]);
    }
    return res;
	},
	sleep:function(time){
		var start=new Date().getTime();
		var end=start+time;
		for(;;){
			if((new Date().getTime())>=end)break;
		}
	},
	throw:function(e){throw new Error(e);},
	"try": function (t,c,f) {
	    try {
	        return t.execute();
	    } catch(e) {
	        if (c) return c.execute(e);
	    } finally {
	        if (f) return t.execute();
	    }
	},
	write:function(o,k,v){
		o[k]=v;
		return o;
	},
	read:function(o,k){
		return o[k]
	},
	delete:function(o,k){
		delete o[k];
		return o;
	},
	 "datetime?":function(){
                const now = new Date();

                // 曜日の配列
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                // 月の配列
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                // 各要素を取得
                const dayName = days[now.getDay()];
                const monthName = months[now.getMonth()];
                const date = now.getDate().toString().padStart(2, '0');
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');
                const year = now.getFullYear();

                // JST (Japan Standard Time) を追加
                // （V4 は Java の Date.toString。日本時間なら JST、それ以外は GMT+hh:mm）
                const off = -now.getTimezoneOffset();
                const timezone = off === 540 ? 'JST' :
                  'GMT' + (off >= 0 ? '+' : '-') + String(Math.floor(Math.abs(off) / 60)).padStart(2, '0') + ':' + String(Math.abs(off) % 60).padStart(2, '0');

                // フォーマットした文字列を返す
                return `${dayName} ${monthName} ${date} ${hours}:${minutes}:${seconds} ${timezone} ${year}`;
        },
	"time?":function(){
                const now = new Date();

                // 各要素を取得
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');

                // フォーマットした文字列を返す
                return `${hours}:${minutes}:${seconds}`;
        },
	"dayofweek?":function(){
		const now = new Date();
		    
		// 日本語の曜日配列
		const daysJP = ['日', '月', '火', '水', '木', '金', '土'];

		// 曜日の1文字だけを返す
		return daysJP[now.getDay()];
	},
	// 年?〜秒? は V3/V4 と同じく文字列（OxSystem.getYear 等 = SimpleDateFormat の結果）。
	// 計算に使うときは数に変換される（"9"！1 掛ける＝9、比較 "9" < 12 も数として比べる）。
	"hour?": function() { return String(new Date().getHours()); },
	"minute?": function() { return String(new Date().getMinutes()); },
	"second?": function() { return String(new Date().getSeconds()); },
	"year?": function() { return String(new Date().getFullYear()); },
	"month?": function() { return String(new Date().getMonth() + 1); },
	"day?": function() { return String(new Date().getDate()); },
	// 日付?（date?）は Util.js の system.date（別名 date?/today）で定義
	// システム秒?: 秒（小数つき）。V3/V4 と同じ（OxSystem.getSystemTime = ミリ秒/1000.0）
	"systemtime?": function(){ return new Date().getTime()/1000; }
});
root.System=root.system;

// ---- システムの命令（V4.02 の機能テスト sys./sys2. に合わせて追加, 2026-09-27） ----
(function (sys) {
    var RtE=function (msg) {
        var R=window.DolittleRuntimeError;
        return (R && R.RtError) ? R.RtError("RT_SYSTEM", msg) : new Error(msg);
    };
    // 自動テスト（IDE を ?e2e=1 で開いたとき）はダイアログを出さず既定値を返す（V4 のテストモードと同じ）
    var isTestMode=function () {
        try {
            if (/(^|[?&])e2e=/.test(window.location.search)) return true;
            var p=window.parent;
            if (p && p!==window && /(^|[?&])e2e=/.test(p.location.search)) return true;
        } catch (e) {}
        return false;
    };
    sys.isTestMode=isTestMode;
    var isArr=function (a) { return Array.isArray(a); };

    // プロパティ（V4 OxSystem のコンストラクタ）。大文字小文字の書き方の違いでも読めるよう両方置く
    var props={};
    (function () {
        var vs="オンライン版ドリトル", vn;
        try {
            var t=window.parent && window.parent!==window && window.parent.document.body ? window.parent.document.body.textContent : "";
            var m=/オンライン版ドリトル\s*V(\d+)\.(\d+)[^\n]*?\([^)]*\)/.exec(t||"");
            if (m) { vs=m[0].trim(); vn=Number(m[1])*100+Number(m[2]); }
        } catch (e) {}
        props.versionstr=vs;
        if (vn!==undefined) props.version=vn;
        var nav=window.navigator||{};
        props.osname=(nav.userAgentData && nav.userAgentData.platform) || nav.platform || "";
        props.osversion="";
        props.displaywidth=(window.screen && window.screen.width) || 0;
        props.displayheight=(window.screen && window.screen.height) || 0;
        props.lang=nav.language || "";
        props.user="";
        props.cwd="";
    })();
    var camel={versionstr:"versionStr",osname:"osName",osversion:"osVersion",displaywidth:"displayWidth",displayheight:"displayHeight"};
    Object.keys(props).forEach(function (k) {
        sys[k]=props[k];
        if (camel[k]) sys[camel[k]]=props[k];
    });

    // 使う: 統計ライブラリ（テーブル）は最初から読み込み済み。引数なしは何もしない（V3 loadIniFile）。
    // それ以外は /dtl/<名前>.dtl.js を読み込み、無ければエラー。
    // db（テーブル）と stat は run.html で db.js を読み込み済み
    var builtinLibs={stat:true,statlib:true,db:true};
    sys.use=function (name) {
        if (arguments.length<1 || name===undefined || name===null || name==="") return this;
        name=String(name);
        if (builtinLibs[name.toLowerCase()]) return this;
        var self=this;
        return DtlPromise.new(function (succ, fail) {
            fetch("/dtl/"+encodeURIComponent(name)+".dtl.js").then(function (r) {
                var ct=(r.headers.get("content-type")||"");
                if (!r.ok || /html/i.test(ct)) throw RtE("ライブラリ『"+name+"』が見つかりません。『使う』に渡す名前を確認してください。");
                return r.text();
            }).then(function (code) {
                (new Function(code)).call(root);
                succ(self);
            }).catch(function (e) {
                fail(e && e.isDolittleRt ? e : RtE("ライブラリ『"+name+"』を読み込めませんでした。"));
            });
        });
    };

    // program: 編集中のプログラムを行の配列で返す
    sys.program=function () {
        var src="";
        try {
            var p=window.parent;
            if (p && p!==window && p.editor && p.editor.getValue) src=p.editor.getValue();
            else src=localStorage.getItem("prgrm.dtl")||"";
        } catch (e) {}
        return src.split(/\r?\n/);
    };

    // サーバーポート・proxy: ブラウザでは設定できないので何もしない（カスケードできるよう自分を返す）
    sys.setserverport=function () { return this; };
    sys.proxy=function () {
        if (arguments.length<1 || arguments.length>2) return undefined;
        return this;
    };
    sys.setproxy=sys.proxy;

    // ダイアログ（ブラウザの alert/confirm/prompt）。自動テストでは出さずに既定値を返す
    sys.messagedialog=function (msg, title) {
        if (arguments.length<1) return this;
        if (!isTestMode()) window.alert((title!==undefined ? title+"\n\n" : "")+msg);
        return this;
    };
    sys.confirmdialog=function (msg, title) {
        if (isTestMode()) return false;
        return !!window.confirm((title!==undefined ? title+"\n\n" : "")+(msg===undefined ? "" : msg));
    };
    sys.inputdialog=function (msg) {
        if (isTestMode()) return "";
        var r=window.prompt(msg===undefined ? "" : String(msg), "");
        return r===null ? "" : r;
    };
    // 選択ダイアログ: （候補）／質問（候補）／質問 既定値（候補）。候補が配列でなければ空文字列。
    // ブラウザには選択用の標準ダイアログが無いので、番号か候補の文字を入力してもらう。
    sys.selectdialog=function () {
        var a=Array.prototype.slice.call(arguments), items, msg="", def="";
        if (a.length===1 && isArr(a[0])) items=a[0];
        else if (a.length===2 && isArr(a[1])) { msg=String(a[0]); items=a[1]; }
        else if (a.length>=3 && isArr(a[2])) { msg=String(a[0]); def=String(a[1]); items=a[2]; }
        else return "";
        if (isTestMode()) return "";
        var lines=items.map(function (v, i) { return (i+1)+": "+v; }).join("\n");
        var r=window.prompt((msg ? msg+"\n" : "")+lines+"\n（番号か候補を入力）", def);
        if (r===null) return "";
        r=String(r).trim();
        for (var i=0;i<items.length;i++) if (String(items[i])===r) return items[i];
        var n=Number(r.replace(/[０-９]/g, function (c) { return String.fromCharCode(c.charCodeAt(0)-0xfee0); }));
        if (n>=1 && n<=items.length && Math.floor(n)===n) return items[n-1];
        return "";
    };

    // 外部コマンドの実行: ブラウザからは実行できない
    sys.exec=function () {
        throw RtE("オンライン版（ブラウザ）では外部コマンドを実行できません。");
    };
    sys.execute=sys.exec;
})(root.system);

root.random=function(param){
	return Random.random(param);
};
root.sin=function(param){return Math.sin(param);};
root.cos=function(param){return Math.cos(param);};
root.tan=function(param){return Math.tan(param);};
root.abs=function(param){return Math.abs(param);};

root.background=root.create().extend({
	paint:function(color){$(document.body).css("background",color);}
});

root.true=true;
root.false=false;
root.undefined=undefined;
root.null=null;
root.instanceof=function(f,s){
    // @hoge1e3 f は何が来ても大丈夫。  null instanceof Array も通る
	//if(typeof f!="object")throw new Error("instanceofの第一引数にはオブジェクトを渡して下さい。");
	if(typeof s!="function")throw new Error("instanceofの第二引数には関数を渡して下さい。");
	return (f instanceof s);
};
root.typeof=function(p){return typeof p;};
root.is=function(){
    var child, parent;
    if (arguments.length>=2) {
        child=arguments[0];
        parent=arguments[1];
    } else {
        child=this;
        parent=arguments[0];
    }
    if((typeof parent)=="function") {
        parent=parent.prototype;
    }
	if((typeof parent)!="object")throw new Error("isの引数にはオブジェクトを渡して下さい。");
	return parent.isPrototypeOf(child);
};

//Array
Object.defineProperty(Array,"create",{
	enumerable:false,configurable:true,
	value:function(){
		return Array.prototype.slice.call(arguments);
	}
});
// 配列の番号を検証する（Tier2 と同じ親切なエラー経路）。opts は requireIndexInRange に渡す。
function checkArrayIndex(arr,index,opts){
	if(typeof window!=="undefined"&&window.DolittleRuntimeError&&window.DolittleRuntimeError.requireIndexInRange)
		window.DolittleRuntimeError.requireIndexInRange(arr,index,opts);
}
// 既存の配列に「作る」を送ると複製（引数があればその要素の新しい配列）。V4 OxArray.make と同じ。
Object.defineProperty(Array.prototype,"create",{
	enumerable:false,configurable:true,writable:true,
	value:function(){
		return arguments.length ? Array.prototype.slice.call(arguments) : this.slice();
	}
});
Object.defineProperty(Array.prototype,"get",{
	enumerable:false,configurable:true,
	value:function(index){
		// Tier2: 範囲外→RT_RANGE、添字が非数値→RT_NEED_NUMBER（黙り失敗の親切化）。
		if(typeof window!=="undefined"&&window.DolittleRuntimeError&&window.DolittleRuntimeError.requireIndexInRange)
			window.DolittleRuntimeError.requireIndexInRange(this,index,{method:"読む"});
		return this[index-1];
	}
});
Object.defineProperty(Array.prototype,"set",{
	enumerable:false,configurable:true,
	value:function(index,value){
		// 0番目以下・非整数・非数値はエラー。末尾より後ろは拡張（従来どおり）。
		checkArrayIndex(this,index,{method:"上書き",noMax:true});
		this[index-1]=value;return this;
	}
});
Object.defineProperty(Array.prototype,"add",{
	enumerable:false,configurable:true,
	// 複数の引数は順に末尾へ追加（V4 OxArray.put）
	value:function(){for(var i=0;i<arguments.length;i++)this.push(arguments[i]);return this;}
});
// 消す: 指定した値と等しい要素をすべて削除（V4 OxArray.removeAll）。
// 数値と数字の文字列は数として等しければ同じとみなす（V4 remove_sub と同じ）。
function arrayElemEquals(a,b){
	if(a===b) return true;
	var ta=typeof a, tb=typeof b;
	if((ta==="number"&&tb==="string")||(ta==="string"&&tb==="number")){
		var sa=(ta==="string")?a:b;
		if(String(sa).trim()==="") return false;
		return !isNaN(Number(a))&&!isNaN(Number(b))&&Number(a)===Number(b);
	}
	return false;
}
Object.defineProperty(Array.prototype,"remove",{
	enumerable:false,configurable:true,
	value:function(){
		for(var j=0;j<arguments.length;j++){
			for(var i=this.length-1;i>=0;i--){
				if(arrayElemEquals(this[i],arguments[j])) this.splice(i,1);
			}
		}
		return this;
	}
});
Object.defineProperty(Array.prototype,"removepos",{
	enumerable:false,configurable:true,
	value:function(index){
		checkArrayIndex(this,index,{method:"位置で消す"});
		this.splice(index-1,1);return this;
	}
});
Object.defineProperty(Array.prototype,"insert",{
	enumerable:false,configurable:true,
	// 範囲は 1〜要素数+1（末尾の次への挿入は可）。3個目以降の引数も続けて挿入（V4 OxArray.insert）。
	value:function(index){
		checkArrayIndex(this,index,{method:"挿入",extra:1});
		for(var i=1;i<arguments.length;i++) this.splice(index-2+i,0,arguments[i]);
		return this;
	}
});
// それぞれ実行（each/foreach）。本体が promise（通信の 読む・待つ 等を含む非同期ブロック）を返したら、
// repeat と同じく then で次の要素へつなぎ、各回を順に待つ（2026-11-02。それまでは同期実装で、
// 非同期の本体が全要素ぶん並走し、完了順に結果が入り、トップレベルは最後の 1 回しか待たなかった。V4 は順に待つ）。
function arrayEachFrom(arr,func,start){
	var res=undefined;
	for(var i=start;i<arr.length;i++){
		try {
			// 本体は executeBody（生の実行）で「！返す」を関数境界まで貫通させる（§13.B）。
			res=func.executeBody(arr[i],i+1);
		} catch(e) {
			// ループ中断「！中断」（V4 handover §13.A）: 「それぞれ実行」を正常終了する（同期経路）。
			// 辞書(Dict.each)は keys.each 経由なのでここだけで配列・辞書とも対応。
			if (e && e.isBreakLoop) break;
			throw e;   // ！返す(isReturn) は関数境界まで貫通
		}
		if (DtlPromise.isPromise(res)) {
			var next=i+1;
			return res.then(function (r) {
				if (next>=arr.length) return r;
				return arrayEachFrom(arr,func,next);
			}, function (e) {
				// ループ中断（非同期経路）: 待つ等の後の「！中断」は promise の拒否で届く。正常終了扱い。
				if (e && e.isBreakLoop) return undefined;
				throw e;
			});
		}
	}
	return res;
}
Object.defineProperty(Array.prototype,"each",{
	enumerable:false,configurable:true,
	value:function(func){ return arrayEachFrom(this,func,0); },
});
root.addAlias.call(Array.prototype,"each","foreach");
Object.defineProperty(Array.prototype,"length?",{
	enumerable:false,configurable:true,
	value:function(){return this.length;}
});
root.addAlias.call(Array.prototype,"length?","size?");
Object.defineProperty(Array.prototype,"clear",{
	enumerable:false,configurable:true,
	value:function(){this.length=0;return this;}
});
Object.defineProperty(Array.prototype,"randomSelect",{
	enumerable:false,configurable:true,
	value:function(){
		return this[this.length.random()-1];
	}
});
root.addAlias.call(Array.prototype,"randomSelect","random");
Object.defineProperty(Array.prototype,"select",{
	enumerable:false,configurable:true,
	value:function(f){
		var res=[];
		for(var i=0;i<this.length;i++){
			if(f.execute(this[i])==true){
				res.push(this[i]);
			}
		}
		return res;
	}
});
root.addAlias.call(Array.prototype,"select","grep");
// 破壊的？非破壊的？
Object.defineProperty(Array.prototype,"process",{
	enumerable:false,configurable:true,
	value:function(f){
		for(var i=0;i<this.length;i++){
			this[i]=f.execute(this[i]);
		}
		return this;
	}
});
root.addAlias.call(Array.prototype,"process","replace");
Object.defineProperty(Array.prototype,"bond",{
	enumerable:false,configurable:true,
	value:function(j){
		// 区切りは文字列のときだけ使う（V4 OxArray.join）。省略時は区切りなし。
		return this.join((typeof j==="string")?j:"");
	}
});
Object.defineProperty(Array.prototype,"max",{
	enumerable:false,configurable:true,
	value:function(){
		var max=this[0];
		for(var i=0;i<this.length;i++){
			if(max<this[i]){
				max=this[i];
			}
		}
		return max;
	}
});
Object.defineProperty(Array.prototype,"min",{
	enumerable:false,configurable:true,
	value:function(){
		var min=this[0];
		for(var i=0;i<this.length;i++){
			if(min>this[i]){
				min=this[i];
			}
		}
		return min;
	}
});
//root["配列"]=Array;
root.Array=Array;

// ===== 値と演算（V4.02 の機能テストに合わせる, 2026-09-27） =====
// 数字の文字列（"3"・"３"・"100歩"）は数として計算し、数でない文字列との ＋ は連結する（V3/V4 の OxString と同じ）。
// 大きな整数は JavaScript の BigInt で表す。演算子（＋ － ＊ ／ ％ ＝＝ ！＝ ＜ ＞ ＜＝ ＞＝）は
// トランスパイラ（minimal.js の mk）が root.system.rtadd 等の呼び出しにコンパイルする。
var DtlValue=(function(){
	var V={};
	var EPS=0.0000001; // V4 OxNumber.EPSILON（＝＝ の許容誤差）
	// Number/String/Boolean/BigInt のラッパーオブジェクト（メソッド内の this）を素の値に戻す
	V.prim=function(v){
		// HTML 要素の「要素：値」「要素：テキスト」（HtmlDom.js の accessor）は、読むと「呼ぶと設定になる関数」で、中身の値を __dtlValue に持つ。計算・比較は中身で行う（2026-10-25）
		if (typeof v==="function" && Object.prototype.hasOwnProperty.call(v,"__dtlValue")) return v.__dtlValue;
		if (v!==null && typeof v==="object" && v.__isHtmlDom && typeof v.dtlValue==="function") return v.dtlValue();   // HTML 要素そのものは中身の値（入力欄なら value、他は文字）
		if (v!==null && typeof v==="object") {
			if (v instanceof Number || v instanceof String || v instanceof Boolean) return v.valueOf();
			if (typeof BigInt!=="undefined" && v instanceof BigInt) return v.valueOf();
		}
		return v;
	};
	V.isBig=function(v){ return typeof v==="bigint"; };
	// V4 OxObject.isToNumber: 先頭の空白・符号のあとに数字があれば数（後ろの単位 "100歩" は無視）
	V.isNumStr=function(s){
		var sign=0,integral=0,point=0,decimal=0;
		for (var i=0;i<s.length;i++) {
			var c=s.charAt(i);
			if (c==="−"||c==="－"||c==="-"||c==="ー"||c==="+"||c==="＋") {
				if (sign>0||integral>0||point>0||decimal>0) return false;
				sign++;
			} else if ((c>="0"&&c<="9")||(c>="０"&&c<="９")) {
				if (point===0) integral++; else decimal++;
			} else if (c==="."||c==="．"||c==="。"||c==="｡") {
				if (point>0||decimal>0) return false;
				point++;
			} else if (sign===0&&integral===0&&(c===" "||c==="　")) {
				// 先頭の空白は読み飛ばす
			} else break;
		}
		return integral>0;
	};
	// 全角→半角にして、数として読める先頭部分だけを返す（V4 toHalfNumStr と strToDouble 相当）
	V.halfNumStr=function(s){
		s=String(s).replace(/^[ 　]+/,"");
		var out="",i=0,c;
		var sgn="";
		c=s.charAt(0);
		if (c==="-"||c==="−"||c==="－"||c==="ー") { sgn="-"; i=1; }
		else if (c==="+"||c==="＋") { i=1; }
		var z=function(ch){
			var k=ch.charCodeAt(0);
			if (k>=0xFF10&&k<=0xFF19) return String.fromCharCode(k-0xFEE0);
			if ((k>=0xFF41&&k<=0xFF46)||(k>=0xFF21&&k<=0xFF26)) return String.fromCharCode(k-0xFEE0);
			if (ch==="ｘ"||ch==="Ｘ") return "x";
			if (ch==="ｂ"||ch==="Ｂ") return "b";
			return ch;
		};
		var rest=s.substring(i);
		var h=rest.substring(0,2).split("").map(z).join("");
		if (/^0[xX]/.test(h)) {
			var m=rest.substring(2).split("").map(z).join("").match(/^[0-9a-fA-F]+/);
			return {sign:sgn,hex:m?m[0]:"0"};
		}
		if (/^0[bB]/.test(h)) {
			var mb=rest.substring(2).split("").map(z).join("").match(/^[01]+/);
			return {sign:sgn,bin:mb?mb[0]:"0"};
		}
		for (;i<s.length;i++) {
			c=z(s.charAt(i));
			if (c>="0"&&c<="9") out+=c;
			else if (c==="."||c==="．"||c==="。"||c==="｡"||c==="・") out+=".";
			else break;
		}
		return {sign:sgn,dec:out};
	};
	V.strToNum=function(s){
		var h=V.halfNumStr(s);
		var v;
		if (h.hex!==undefined) v=parseInt(h.hex,16);
		else if (h.bin!==undefined) v=parseInt(h.bin,2);
		else v=parseFloat(h.dec);
		if (isNaN(v)) v=0;
		return h.sign==="-"?-v:v;
	};
	// 数として扱えるか（数・大きな整数・数字の文字列）
	V.isNumLike=function(v){
		v=V.prim(v);
		if (typeof v==="number"||typeof v==="bigint") return true;
		if (typeof v==="string") return V.isNumStr(v);
		return false;
	};
	V.toNum=function(v){
		v=V.prim(v);
		if (typeof v==="number") return v;
		if (typeof v==="bigint") return Number(v);
		if (typeof v==="string") return V.strToNum(v);
		return Number(v);
	};
	V.toBig=function(v){
		v=V.prim(v);
		if (typeof v==="bigint") return v;
		if (typeof v==="number") return BigInt(Math.trunc(v));
		var h=V.halfNumStr(v);
		var b;
		if (h.hex!==undefined) b=BigInt("0x"+h.hex);
		else if (h.bin!==undefined) b=BigInt("0b"+h.bin);
		else {
			var ip=h.dec.split(".")[0];
			b=BigInt(ip===""?"0":ip);
		}
		return h.sign==="-"?-b:b;
	};
	var rtErr=function(code,msg){
		var R=window.DolittleRuntimeError;
		if (R&&R.RtError) return R.RtError(code,msg);
		return new Error(msg);
	};
	V.needNumber=function(v,method){
		var R=window.DolittleRuntimeError;
		if (R&&R.needNumberError) return R.needNumberError(v,{method:method});
		return new Error("数でないもの "+v+" で計算しようとしました。");
	};
	V.zeroError=function(method){
		return rtErr("RT_ARITH","0で"+(method==="余り"?"余りを求める":"割る")+
			"ことはできません。『"+method+"』には0以外の数を指定してください。");
	};
	V.rtErr=rtErr;
	// 足し算: 数どうし（数字の文字列を含む）は数の和、大きな整数が混じれば大きな整数、それ以外は連結（JS の +）
	V.add=function(a,b){
		if (typeof a==="number"&&typeof b==="number") return a+b;
		a=V.prim(a); b=V.prim(b);
		if (typeof a==="bigint"||typeof b==="bigint") {
			if (V.isNumLike(a)&&V.isNumLike(b)) return V.toBig(a)+V.toBig(b);
			return String(a)+String(b);
		}
		if (V.isNumLike(a)&&V.isNumLike(b)) return V.toNum(a)+V.toNum(b);
		return a+b;
	};
	var NAMES={"-":"引く","*":"掛ける","/":"割る","%":"余り"};
	// 引き算・掛け算・割り算・余り: 数（数字の文字列）でなければエラー（V4 Tier2）
	V.arith=function(op,a,b){
		var method=NAMES[op];
		a=V.prim(a); b=V.prim(b);
		if (typeof a!=="number"||typeof b!=="number") {
			if (!V.isNumLike(a)) throw V.needNumber(a,method);
			if (!V.isNumLike(b)) throw V.needNumber(b,method);
			if (typeof a==="bigint"||typeof b==="bigint") {
				// 数÷大きな整数 と 数％大きな整数 は数の計算（V4 OxNumber.div/mod と同じ）
				if (typeof a!=="bigint"&&(op==="/"||op==="%")) {
					a=V.toNum(a); b=V.toNum(b);
				} else {
					var x=V.toBig(a), y=V.toBig(b);
					switch (op) {
						case "-": return x-y;
						case "*": return x*y;
						case "/": if (y===BigInt(0)) throw V.zeroError(method); return x/y;   // 整数の商
						case "%": if (y===BigInt(0)) throw V.zeroError(method); return x%y;   // 被除数の符号（-7%3＝-1）
					}
				}
			} else {
				a=V.toNum(a); b=V.toNum(b);
			}
		}
		switch (op) {
			case "-": return a-b;
			case "*": return a*b;
			case "/": if (b===0) throw V.zeroError(method); return a/b;
			case "%": if (b===0) throw V.zeroError(method); return a%b;
		}
	};
	// 比較の結果: -1/0/1、比べられなければ null
	var cmpBigNum=function(x,n){ // x: bigint, n: number
		if (Number.isInteger(n)) { var y=BigInt(n); return x<y?-1:(x>y?1:0); }
		var xf=Number(x); return xf<n?-1:(xf>n?1:0);
	};
	V.cmp=function(a,b){
		a=V.prim(a); b=V.prim(b);
		if (typeof a==="number"&&typeof b==="number") {
			if (isNaN(a)||isNaN(b)) return null;
			return a<b?-1:(a>b?1:0);
		}
		if (typeof a==="bigint"||typeof b==="bigint") {
			if (!V.isNumLike(a)||!V.isNumLike(b)) return null;
			if (typeof a==="bigint"&&typeof b==="bigint") return a<b?-1:(a>b?1:0);
			if (typeof a==="bigint") return cmpBigNum(a,V.toNum(b));
			return -cmpBigNum(b,V.toNum(a));
		}
		if (V.isNumLike(a)&&V.isNumLike(b)) {
			var x=V.toNum(a), y=V.toNum(b);
			return x<y?-1:(x>y?1:0);
		}
		if (typeof a==="string"&&typeof b==="string") return a<b?-1:(a>b?1:0);
		return null;
	};
	// ＝＝: 数どうしは誤差 0.0000001 まで等しい（0.1＋0.2＝＝0.3 は真）。数字の文字列も数として比べる
	V.eq=function(a,b){
		if (a===b) return true;
		a=V.prim(a); b=V.prim(b);
		if (a===b) return true;
		if (typeof a==="bigint"||typeof b==="bigint") return V.cmp(a,b)===0;
		if (V.isNumLike(a)&&V.isNumLike(b)) return Math.abs(V.toNum(a)-V.toNum(b))<=EPS;
		return false;
	};
	return V;
})();
root.system.dtlValue=DtlValue;
root.system.rtadd=function(a,b){ return DtlValue.add(a,b); };
root.system.rtsub=function(a,b){ return DtlValue.arith("-",a,b); };
root.system.rtmul=function(a,b){ return DtlValue.arith("*",a,b); };
root.system.rtdiv=function(a,b){ return DtlValue.arith("/",a,b); };
root.system.rtmod=function(a,b){ return DtlValue.arith("%",a,b); };
root.system.rteq=function(a,b){ return DtlValue.eq(a,b); };
root.system.rtne=function(a,b){ return !DtlValue.eq(a,b); };
root.system.rtlt=function(a,b){ var c=DtlValue.cmp(a,b); return c!==null&&c<0; };
root.system.rtle=function(a,b){ var c=DtlValue.cmp(a,b); return c!==null&&c<=0; };
root.system.rtgt=function(a,b){ var c=DtlValue.cmp(a,b); return c!==null&&c>0; };
root.system.rtge=function(a,b){ var c=DtlValue.cmp(a,b); return c!==null&&c>=0; };
// 変数や式に付けた単項マイナス（-x）は文法に無い（V4 と同じ。負の数の定数 -3 だけ書ける）
root.system.rtnegvar=function(){
	throw DtlValue.rtErr("RT_SYNTAX","「-」を付けて負にできるのは数の定数（-3 など）だけです。"+
		"変数や式を負にするときは 0－x のように書いてください。");
};
// ---- オブジェクトのプロパティ操作（V4 OxObject: props/propnames/getprop/setprop/removeprop/sametype?） ----
// 自分で設定したプロパティ＝自身の列挙可能なプロパティのうち、別名の実体（_KEY_…）と内部用（__…）を除いたもの。
function ownPropNames(o){
	return Object.keys(o).filter(function(k){ return !/^_KEY_/.test(k) && !/^__/.test(k); });
}
// 型の名前（sametype? 用）。組み込みの値は種類、ドリトルのオブジェクトは一番近い登録済みオブジェクト。
function dtlTypeName(v){
	if (v===undefined||v===null) return "undefined";
	if (Array.isArray(v)) return "Array";
	var t=typeof v;
	if (t==="number"||t==="string"||t==="boolean"||t==="function") return t;
	if (v instanceof Number) return "number";
	if (v instanceof String) return "string";
	if (v instanceof Boolean) return "boolean";
	for (var p=v; p; p=Object.getPrototypeOf(p)) {
		if (Object.prototype.hasOwnProperty.call(p,"__name__")) return "obj:"+p.__name__;
	}
	return "object";
}
function propValueStr(v){
	if (typeof v==="number") return String(v);
	if (typeof v==="function") return "\"<ブロック>\"";
	if (typeof v==="boolean") return "\"_"+v+"_\"";
	return "\""+String(v)+"\"";
}
root.propnames=function(){ return ownPropNames(this); };
root.props=function(){
	var o=this;
	return "("+ownPropNames(o).map(function(k){ return "("+k+" "+propValueStr(o[k])+")"; }).join("")+")";
};
root.getprop=function(k){ return (arguments.length ? this[String(k)] : undefined); };
root.setprop=function(k,v){ if (arguments.length>=2) this[String(k)]=v; return this; };
root.putprop=root.setprop;
root.removeprop=function(k){ if (arguments.length) delete this[String(k)]; return this; };
// sametype? は数値・文字列・真偽値・配列にも送れる（引数なしは偽）
function sameType(x){ return arguments.length>=1 && dtlTypeName(this.valueOf? this.valueOf(): this)===dtlTypeName(x); }
root["sametype?"]=function(x){ return arguments.length>=1 && dtlTypeName(this)===dtlTypeName(x); };
[Number.prototype,String.prototype,Boolean.prototype,Array.prototype].forEach(function(pr){
	Object.defineProperty(pr,"sametype?",{enumerable:false,configurable:true,writable:true,value:sameType});
});

//Stringオブジェクト
// 足す: 引数1つなら ＋ と同じ（数字の文字列どうしは数の和、それ以外は連結）。複数の引数は従来どおり連結。
String.prototype.add=function(n){
	if (arguments.length===1) return DtlValue.add(String(this),n);
	return String.prototype.concat.apply(String(this),arguments);
};
// 連結: 配列を渡すと要素を順につなぐ（V4 OxString.append）。配列以外は標準の concat と同じ。
(function(){
	var nativeConcat=String.prototype.concat;
	String.prototype.concat=function(){
		var a=[];
		for (var i=0;i<arguments.length;i++) {
			if (Array.isArray(arguments[i])) a=a.concat(arguments[i].map(function(e){return String(e);}));
			else a.push(arguments[i]);
		}
		return nativeConcat.apply(this,a);
	};
})();
// 文字列の命令が受け取る「文字の並びの指定」は正規表現（V3/V4 と同じ）。読めなければ命令名を出して案内する
// （V4 の message_master ErrRuntimeBadPattern* と同じ文面）
function dtlPattern(p,flags,cmd){
	try { return new RegExp(String(p),flags); }
	catch(e){
		var msg="『"+cmd+"』に渡した『"+String(p)+"』は、文字の並びの指定（正規表現）として読めません。"+
			"( ) [ ] { } . * + ? ^ $ | は特別な意味を持ちます。その記号そのものを指定するときは、『[(]』のように [ ] で囲んでください。";
		var R=window.DolittleRuntimeError;
		var err=(R&&R.RtError)?R.RtError("RT_PATTERN",msg):new Error(msg);
		err.isDolittleRt=true;
		throw err;
	}
}
String.prototype["contain?"]=function(_param){return -1!=this.valueOf().search(dtlPattern(_param,"","含む？"));};
// 何文字目？／探す: 見つかった位置（1始まり）、無ければ0。2番目の引数は探し始める位置（V4 OxString.indexof）
String.prototype["position?"]=function(p,start){
	var from=(start===undefined)?0:Math.max(0,Math.trunc(DtlValue.toNum(start))-1);
	return String(this).indexOf(String(p),from)+1;
};
String.prototype.substr=function(){return ((arguments.length==1)?substr1:substr2).apply(this,arguments);};
String.prototype["length?"]=function(){return this.length;};
String.prototype.partition=function(s){return this.split(RegExp(s));};
// 分割: 区切りは正規表現（V4 は Java の String.split）。1文字の区切りは文字どおりに扱う（"." "|" などで全部が区切りにならないように）
String.prototype.dtlsplit=function(s){
	if (s===undefined) return undefined;
	s=String(s);
	var str=String(this);
	if (s.length<=1) return str.split(s);
	return str.split(dtlPattern(s,"","分割"));
};
// 文字コード: 先頭の文字のコード。空文字は未定義（V4 OxString.charCode）
String.prototype.dtlcharcode=function(){
	var s=String(this);
	return s.length===0?undefined:s.charCodeAt(0);
};
// コード文字: 数字の文字列ならそのコードの文字（V4 OxString.codeChar）
String.prototype.codechar=function(){
	var s=String(this);
	if (!DtlValue.isNumStr(s)) return undefined;
	return String.fromCodePoint(Math.trunc(DtlValue.strToNum(s)));
};
// unescape: \n \t などのエスケープを1文字にする（V4 OxString.unEscape＝Java の unescapeJava）
String.prototype.unescape=function(){
	return String(this).replace(/\\(u[0-9a-fA-F]{4}|[0-7]{1,3}|.)/g,function(m,c){
		switch (c) {
			case "n": return "\n";
			case "t": return "\t";
			case "r": return "\r";
			case "b": return "\b";
			case "f": return "\f";
			case "\\": return "\\";
			case "\"": return "\"";
			case "'": return "'";
		}
		if (c.charAt(0)==="u"&&c.length===5) return String.fromCharCode(parseInt(c.substring(1),16));
		if (/^[0-7]+$/.test(c)) return String.fromCharCode(parseInt(c,8));
		return c;
	});
};
String.prototype.oneReplace=function(_pattern,_replacement){return this.valueOf().replace(dtlPattern(_pattern,"","置き換える"),_replacement);};
String.prototype.allReplace=function(_pattern,_replacement){return this.valueOf().replace(dtlPattern(_pattern,"g","全部置き換える"),_replacement);};
String.prototype.toNumber=function () {
    return parseFloat(this)||0;
};
// 計算・比較: 演算子と同じ規則（数字の文字列は数として計算する。数でなければエラー）
String.prototype.sub=function(n){return DtlValue.arith("-",String(this),n);};
String.prototype.mul=function(n){return DtlValue.arith("*",String(this),n);};
String.prototype.div=function(n){return DtlValue.arith("/",String(this),n);};
String.prototype.mod=function(n){return DtlValue.arith("%",String(this),n);};
String.prototype.eq=function(n){return root.system.rteq(String(this),n);};
String.prototype.ne=function(n){return root.system.rtne(String(this),n);};
String.prototype.gt=function(n){return root.system.rtgt(String(this),n);};
String.prototype.ge=function(n){return root.system.rtge(String(this),n);};
String.prototype.lt=function(n){return root.system.rtlt(String(this),n);};
String.prototype.le=function(n){return root.system.rtle(String(this),n);};
// 数学関数: 数字の文字列なら数と同じ結果。数でない文字列はエラー（V4 OxString, 2026-09-26 決定）
["sqrt","sin","cos","tan","asin","acos","atan","atan2","round","ceil","floor","exp","log","ln","pow","abs"].forEach(function(k){
	String.prototype[k]=function(){
		var s=String(this);
		if (!DtlValue.isNumStr(s)) throw DtlValue.needNumber(s,k);
		return Number.prototype[k].apply(DtlValue.strToNum(s),arguments);
	};
});
// 乱数: 数字の文字列なら数と同じ（1〜n）。数でなければ未定義
String.prototype.random=function(){
	var s=String(this);
	return DtlValue.isNumStr(s)?Number.prototype.random.call(DtlValue.strToNum(s)):undefined;
};
// 乱数初期化: 数字の文字列なら数と同じ系列。数でなければ時刻で初期化し直し、受け手を返す（V4 OxString.setSeed）
String.prototype.setSeed=function(){
	var s=String(this);
	if (DtlValue.isNumStr(s)) return Number.prototype.setSeed.call(DtlValue.strToNum(s));
	Random.init();
	return s;
};
// 大きい整数にする
String.prototype.bigint=function(){
	var s=String(this);
	if (!DtlValue.isNumStr(s)) throw DtlValue.needNumber(s,"大きい整数にする");
	return DtlValue.toBig(s);
};
// 文字列！"abc" 作る
String.create=function(s){return (s===undefined||s===null)?"":String(s);};
var substr1=function(param){return this.substring(param-1);};
var substr2=function(param1,param2){return this.substring(param1-1,param1-1+param2);}
// 文字列！実行: 構文エラーは実行時エラーとして表示して止める（V3/V4 と同じ）。
// ドリトルの文は句点で終わるので、句点の無い文字列（"3＋4"）も構文エラーにする。
String.prototype.execute=function(){
  var src=this.toString();
  var synErr=function(detail){
    return DtlValue.rtErr("RT_SYNTAX","文字列として実行したプログラム「"+src+"」に書き方の誤りがあります。"+(detail||""));
  };
  var body=src.replace(/\/\/[^\n]*/g,"").replace(/[\s　]+$/,"");
  if (body!=="" && !/[.。．｡」\]]$/.test(body)) throw synErr("文の終わりに「。」が必要です。");
  var dtlNode;
  try{
    dtlNode=(window.MinimalParser||window.parent.MinimalParser).parseAsNode(src);
  }catch(e){
    throw synErr("");
  }
  var js=(window.MinimalParser||window.parent.MinimalParser).node2js(dtlNode);
  var f=new Function(js);
  return f.call(this);
};

//Booleanオブジェクト
Boolean.prototype.then=function(){return (this==true)?root._true:root._false;};
Boolean.prototype.else=function(){return (this==true)?root._false:root._true;};
Boolean.prototype.not=function(){return (false==this);};
// 条件ブロックの値の判定。真偽値はその値、数・文字列は偽として扱う（V4 は真偽値以外をすべて偽にする）。
// オブジェクト・配列・ブロックは従来どおり「値があれば真」: 組み込みのドリトル製ライブラリ（Util.js の
// 全部！…本当、Vec2.js 等）が「値があるか」の判定に なら／そうでなければ を使っているため。
var isTrueValue=function(v){
	if (v instanceof Boolean) v=v.valueOf();
	if (typeof v==="boolean") return v;
	if (typeof v==="number"||typeof v==="string"||typeof v==="bigint") return false;
	return !!v;
};
// 全部本当／かつ・どれか本当／または（V4 OxBoolean.and/or）。ブロックを渡すと実行した結果を使う
var boolArg=function(a){
	if (typeof a==="function") a=a.execute();
	return a;
};
Boolean.prototype.alltrue=function(){
	if (!this.valueOf()) return false;
	for (var i=0;i<arguments.length;i++) {
		var a=boolArg(arguments[i]);
		if (a===false||(a instanceof Boolean&&!a.valueOf())) return false;
	}
	return true;
};
Boolean.prototype.sometrue=function(){
	if (this.valueOf()) return true;
	for (var i=0;i<arguments.length;i++) {
		if (isTrueValue(boolArg(arguments[i]))) return true;
	}
	return false;
};
//Number
["floor","round","ceil","exp"].forEach(function (k) {
    Number.prototype[k]=function () {
        return Math[k](this);
    };
});
Number.prototype.abs=function(){return Math.abs(this);};
// 負の数の平方根はエラー（V4, 2026-09-26 決定）
Number.prototype.sqrt=function(){
	var v=this.valueOf();
	if (v<0) throw DtlValue.rtErr("RT_ARITH","負の数（"+v+"）の平方根は求められません。0以上の数を指定してください。");
	return Math.sqrt(v);
};
["sin","cos","tan"].forEach(function (k) {
    Number.prototype[k]=function () {
        return Math[k](this.radian());
    };
});
["atan","acos","asin"].forEach(function(k){
	Number.prototype[k]=function(){
		return Math[k](this).degree();
	};
});
Number.prototype.base=function(n){
	return this.toString(n).toUpperCase();
};
Number.prototype.atan2=function(y){
	if (!DtlValue.isNumLike(y)) throw DtlValue.needNumber(y,"atan2");
	return Math.atan2(DtlValue.toNum(y),this).degree();
};
Number.prototype.pow=function(m){
	m=DtlValue.prim(m);
	if (typeof m==="bigint") return DtlValue.toBig(this.valueOf())**m;
	if (!DtlValue.isNumLike(m)) throw DtlValue.needNumber(m,"pow");
	return Math.pow(this,DtlValue.toNum(m));
};
Number.prototype.log=function(){
	return Math.log10(this);
};
Number.prototype.ln=function(){
	return Math.log(this);
};
Number.prototype.radian=function() {
    return this/180*Math.PI;
};
Number.prototype.degree=function() {
    return this/Math.PI*180;
};
// 乱数: 正の数 n なら 1〜n の整数、0以下なら 0以上1未満の実数（V4 OxNumber.random）
Number.prototype.random=function(){
	return Random.random(this.valueOf());
};
// 乱数初期化: 同じ数で初期化すると同じ系列（java.util.Random と同じ線形合同法）。0 なら時刻で初期化し直す
Number.prototype.setSeed=function(){
	var n=Random.toInt(this.valueOf());
	if (n===0) Random.init(); else Random.setSeed(n);
	return this.valueOf();
};
// 大きい整数にする（小数部は切り捨て）
Number.prototype.bigint=function(){
	return DtlValue.toBig(this.valueOf());
};
Number.prototype.add=function(n){
	return DtlValue.add(this.valueOf(),n);
};
// Tier2: 数値演算のガード（黙り失敗の親切化）。非数値→RT_NEED_NUMBER、0除算→RT_ARITH。
// 演算子形 a/b・a%b 等はトランスパイラが root.system.rt* 経由にコンパイルする（上の DtlValue）。
Number.prototype.sub=function(n){
	return DtlValue.arith("-",this.valueOf(),n);
};
Number.prototype.mul=function(n){
	return DtlValue.arith("*",this.valueOf(),n);
};
Number.prototype.div=function(n){
	return DtlValue.arith("/",this.valueOf(),n);
};
Number.prototype.mod=function(n){
	return DtlValue.arith("%",this.valueOf(),n);
};
Number.prototype.eq=function(n){return root.system.rteq(this.valueOf(),n);};
Number.prototype.ne=function(n){return root.system.rtne(this.valueOf(),n);};
Number.prototype.gt=function(n){return root.system.rtgt(this.valueOf(),n);};
Number.prototype.ge=function(n){return root.system.rtge(this.valueOf(),n);};
Number.prototype.lt=function(n){return root.system.rtlt(this.valueOf(),n);};
Number.prototype.le=function(n){return root.system.rtle(this.valueOf(),n);};
Number.prototype.fromCharCode=function(){
	return String.fromCharCode(this);
};

// 大きい整数（BigInt）。V4 OxBigInteger 相当。演算子は DtlValue が扱う
if (typeof BigInt!=="undefined") {
	(function(){
		var BP=BigInt.prototype;
		var bv=function(t){return DtlValue.prim(t);};
		BP.add=function(n){return DtlValue.add(bv(this),n);};
		BP.sub=function(n){return DtlValue.arith("-",bv(this),n);};
		BP.mul=function(n){return DtlValue.arith("*",bv(this),n);};
		BP.div=function(n){return DtlValue.arith("/",bv(this),n);};
		BP.mod=function(n){return DtlValue.arith("%",bv(this),n);};
		BP.eq=function(n){return root.system.rteq(bv(this),n);};
		BP.ne=function(n){return root.system.rtne(bv(this),n);};
		BP.gt=function(n){return root.system.rtgt(bv(this),n);};
		BP.ge=function(n){return root.system.rtge(bv(this),n);};
		BP.lt=function(n){return root.system.rtlt(bv(this),n);};
		BP.le=function(n){return root.system.rtle(bv(this),n);};
		BP.pow=function(n){
			if (!DtlValue.isNumLike(n)) throw DtlValue.needNumber(n,"pow");
			var e=DtlValue.toBig(n);
			if (e<BigInt(0)) return Math.pow(Number(bv(this)),Number(e));
			return bv(this)**e;
		};
		BP.abs=function(){var v=bv(this); return v<BigInt(0)?-v:v;};
		BP.codechar=function(){return String.fromCodePoint(Number(bv(this)));};
		BP.bigint=function(){return bv(this);};
		BP.create=function(n){return DtlValue.toBig(n===undefined?0:n);};
	})();
}

// 乱数: java.util.Random と同じ線形合同法（V4 と同じ系列。乱数初期化（5）→ 乱数（100）＝88,93,75）
var Random=new function(){
	var MULT=BigInt("0x5DEECE66D"), ADD=BigInt(11), MASK=(BigInt(1)<<BigInt(48))-BigInt(1);
	var seed;
	this.setSeed=function(s){
		seed=(BigInt(s)^MULT)&MASK;
		return s;
	};
	this.init=function(){
		this.setSeed(Math.floor(Math.random()*4294967296)*65536+Math.floor(Math.random()*65536));
	};
	var next=function(bits){
		seed=(seed*MULT+ADD)&MASK;
		return Number(BigInt.asIntN(32,seed>>BigInt(48-bits)));
	};
	this.nextInt=function(n){
		if ((n&-n)===n) return Number((BigInt(n)*BigInt(next(31)))>>BigInt(31));
		var bits,val;
		do {
			bits=next(31);
			val=bits%n;
		} while (((bits-val+(n-1))|0)<0);
		return val;
	};
	this.nextDouble=function(){
		return (next(26)*134217728+next(27))/9007199254740992;
	};
	// Java の (int) と同じ切り捨て
	this.toInt=function(v){
		v=Math.trunc(Number(v));
		if (isNaN(v)) return 0;
		if (v>2147483647) return 2147483647;
		if (v<-2147483648) return -2147483648;
		return v;
	};
	this.random=function(m){
		var n=this.toInt(m);
		return (m>0&&n>0)?this.nextInt(n)+1:this.nextDouble();
	};
	this.init();
};

// ループ中断「！中断」（V4 handover §12, 2026-07-05）
// root.breakloop が専用例外を投げ、繰り返す(repeat)/の間(_while)/タイマー(Timer.execute) が
// 捕捉してループを「正常終了」する（ループ後の文は継続実行）。ループ外まで伝播した場合は
// toFriendly（dolittle_runtime_error.js）が親切メッセージ化する（エラー扱いにしない判定は isBreakLoop）。
// 判定は instanceof でなく isBreakLoop マーカー（文字列化された onerror 経路でも message で判別可能）。
function BreakLoopException() {
    this.name="BreakLoopException";
    this.message="Loop break";
    this.isBreakLoop=true;
}
BreakLoopException.prototype=Object.create(Error.prototype);
BreakLoopException.prototype.constructor=BreakLoopException;
root.BreakLoopException=BreakLoopException;
root.breakloop=function(){ throw new BreakLoopException(); };

// 関数からの脱出「！(値)返す」（V4 handover §13.B, 2026-07-06）
// root.returnval が戻り値を保持した専用例外を投げ、関数境界（Function.prototype.execute と
// root.system.send＝オブジェクト独自メソッド呼び出し）が捕捉して value を返す。
// if/繰り返す/の間/それぞれ実行 の本体は executeBody（生の実行）で貫通させ、
// 最も内側の関数境界まで届ける。タイマー本体は f.execute のまま（別スタックの非同期実行で
// 関数境界へ脱出不能＝そのtickの早期returnとして扱う。詳細 Timer.js は非改変）。
// トップレベル（関数外）から漏れた場合は handleError/toFriendly が「エラー扱いしない＝
// 静かに終了」する（V4 のトップレベル返す＝プログラム終了と同じ）。
// 判定は instanceof でなく isReturn マーカー（BreakLoopException と同方針）。
function ReturnException(v) {
    this.name="ReturnException";
    this.message="Return";
    this.isReturn=true;
    this.value=v;
}
ReturnException.prototype=Object.create(Error.prototype);
ReturnException.prototype.constructor=ReturnException;
root.ReturnException=ReturnException;
root.returnval=function(v){ throw new ReturnException(arguments.length ? v : undefined); };

// 送信ヘルパ（V4 OxBlock.methodcall 相当の関数境界）。トランスパイラ（minimal.js meth_call）が
// 全送信 `obj！メソッド` をここ経由にコンパイルする（2026-07-06）。
// - 呼び先がネイティブ（実行/なら/繰り返す/それぞれ実行/返す 等の制御メソッド・組み込み）なら
//   完全素通し＝挙動不変。制御ブロック本体の「！返す」貫通仕様（§13.B）も不変。
// - 呼び先が dtlbind されたブロック（＝ドリトル定義のメソッド）のときだけ関数境界となり、
//   ReturnException を value 化する（同期＝throw / 非同期＝promise拒否。execute と同パターン）。
// this=受け手（自分）を保つため f.apply(obj,...) で呼ぶ（execute の bound 迂回は使えない）。
// 非同期ブロック（！待つ 等を含む）は値でなく generator を返し、呼び出し側の yield* で委譲される。
// その途中で投げられた ReturnException を send 境界で value 化するための透過ラッパ。
// lib.js を ES5 のまま保つため new Function で遅延構築する（generator 非対応環境では
// 非同期ブロック自体が生成されない＝この分岐に来ないので安全）。
var _sendGenWrap=null;
function sendGenWrap(res) {
    if (!_sendGenWrap) {
        _sendGenWrap=new Function("res",
            "return (function*(){ try { return yield* res; } catch(e) { if (e && e.isReturn) return e.value; throw e; } })();");
    }
    return _sendGenWrap(res);
}
// 第4引数 recv（2026-09-03）: トランスパイラが受け手が単純な変数のときだけ渡す表示名
// （"表示" / "：x" / "a：b"）。受け手が undefined/null のとき、従来と同文の TypeError
// （Cannot read properties of undefined (reading '名')＝onerror 文字列経路の regex 互換）に
// isEmptyReceiver/receiverName/methodName を付けて投げ、toFriendly が変数名入りの親切文にする。
// 未定義に送れる比較（V4 OxUndef）: 未定義どうしは等しく、大小比較は偽
var UNDEF_OPS={
    eq:function(a){return a.length===1&&(a[0]===undefined||a[0]===null);},
    ne:function(a){return a.length===1&&!(a[0]===undefined||a[0]===null);},
    gt:function(){return false;}, ge:function(){return false;},
    lt:function(){return false;}, le:function(){return false;}
};
// 「配列：合計＝「…」」「数値：二乗＝「…」」は、トランスパイラが root['配列']（＝Array 関数）の
// プロパティとして設定する。値（配列・数値・文字列・真偽値・ブロック）自身に無い命令のときだけ、
// その種類の関数に利用者が設定したドリトルのブロック（isDtlBlock）を探して使う。
function builtinUserMethod(obj,name){
    var C=Array.isArray(obj)?Array:
        (typeof obj==="number"||obj instanceof Number)?Number:
        (typeof obj==="string"||obj instanceof String)?String:
        (typeof obj==="boolean"||obj instanceof Boolean)?Boolean:
        (typeof obj==="function")?Function:null;
    if (!C || !Object.prototype.hasOwnProperty.call(C,name)) return undefined;
    var f=C[name];
    return (typeof f==="function" && f.isDtlBlock) ? f : undefined;
}
// 「a_2」の読み出し（トランスパイラが「名_番号」の変数を値として読むときに使う）。
// その名前の変数があればその値。無ければ「名」が配列で番号が範囲内のとき要素、それ以外は未定義（V4 OxObject.getProp）。
root.system.send=function(obj,name,args,recv){
    if ((obj===undefined||obj===null)&&UNDEF_OPS.hasOwnProperty(name)) return UNDEF_OPS[name](args);
    if (obj===undefined||obj===null) {
        var er=new TypeError("Cannot read properties of "+obj+" (reading '"+name+"')");
        er.isEmptyReceiver=true;
        er.receiverName=recv||null;
        er.methodName=name;
        throw er;
    }
    var f=obj[name];
    if (typeof f!=="function") f=builtinUserMethod(obj,name);
    if (typeof f!=="function") {
        // ブラケット形メッセージ（dolittle_runtime_error.js extractNotAFunctionName 互換）
        throw new TypeError("obj['"+name+"'] is not a function");
    }
    if (!f.isDtlBlock) return f.apply(obj,args);
    var res;
    try {
        res=f.apply(obj,args);  // 同期経路: ブロックが最初の yield 前に投げた返す
    } catch(e) {
        if (e && e.isReturn) return e.value;
        throw e;
    }
    if (AsyncByGenerator.isGenerator(res)) {
        return sendGenWrap(res);  // 非同期経路: 委譲中の返す
    }
    if (DtlPromise.isPromise(res)) {
        return res.then(function (r) {
            return r;
        }, function (e) {
            if (e && e.isReturn) return e.value;
            throw e;
        });
    }
    return res;
};

//Function
// executeBody = 生のブロック実行（return を捕捉しない）。制御ブロック本体（if/ループ/foreach/
// タイマー）はこちらを呼び、「！返す」を関数境界まで貫通させる。
Function.prototype.executeBody=function(){
    return root.system.run2(this.apply(this.bound||this,arguments));
};
// execute = 関数境界。「！実行」（実行→execute エイリアス）とイベントハンドラ
// （func.checkerror().execute()）がここを通る。ReturnException を捕捉して value を返す。
// 同期経路（throw）と非同期経路（generator→promise 拒否）の両方を処理（repeat の二経路に倣う）。
Function.prototype.execute=function(){
    var res;
    try {
        res=this.executeBody.apply(this,arguments);
    } catch(e) {
        if (e && e.isReturn) return e.value;
        throw e;
    }
    if (DtlPromise.isPromise(res)) {
        return res.then(function (r) {
            return r;
        }, function (e) {
            if (e && e.isReturn) return e.value;
            throw e;
        });
    }
    return res;
};
Function.prototype.repeat=function(param){
	var res;
	for(var i=1;i<=param;++i) {
        try {
            // 制御ブロック本体は executeBody（生の実行）で呼び、「！返す」を関数境界まで貫通させる。
            res=this.executeBody(i);
        } catch(e) {
            // ループ中断（同期経路）: toVal は同期ブロックをその場で完走させるため、
            // 「！中断」の例外は通常ここに同期的に届く。ループを正常終了する。
            if (e && e.isBreakLoop) break;
            throw e;
        }
        if (DtlPromise.isPromise(res)) {
            var f=this;
            return res.then(function (r) {
                if (param<=1) return r;
                return f.repeat(param-1);
            }, function (e) {
                // ループ中断（非同期経路）: 同一イテレーション内で「待つ」等の後に
                // 「！中断」した場合は promise の拒否で届く。正常終了扱いで解決する。
                if (e && e.isBreakLoop) return undefined;
                throw e;
            });
        }
	}
    return res;
};
Function.prototype.while=function(){
	return root._while.create(this);
};
// 条件ブロックの値が真偽値の真のときだけ真。真偽値でない値（「5」など）は偽として扱う（V4 と同じ）
Function.prototype.then=function(){return isTrueValue(this.execute(this,arguments))?root._true:root._false;};
Function.prototype.else=function(){return isTrueValue(this.execute(this,arguments))?root._false:root._true;};
root.system.handleError=function (e){
    // 「！返す」が関数境界（execute / root.system.send）に捕まらず最上位まで漏れた場合
    // （＝トップレベル・関数外の返す）は、エラー扱いせず静かに終了する
    // （V4 のトップレベル返す＝プログラム終了と同じ・§13.B）。
    if (e && e.isReturn) return;
    console.error(e);
    var msg=(e&&e.message)?e.message:String(e);
    // 実行時エラーを学習者向けの日本語メッセージに親切化（改善不能なら元メッセージを使う）
    if (typeof window!=="undefined" && window.DolittleRuntimeError){
        try{ var f=window.DolittleRuntimeError.toFriendly(e); if(f) msg=f; }catch(_){}
    }
    if (typeof onerror==="function") onerror(msg,"unknown",1,1,e);
    else throw e;
};
root.system.run2=function (res) {
    if (AsyncByGenerator.isGenerator(res)) {
        return AsyncByGenerator.run(res);
    }
    return res;
};
// トップレベルの実行。生成コードは戻り値を返さないため、非同期（トップレベルの「待つ」等）の
// 終了を知らせる promise を root.system.lastRun に残す（runtime/js/index.js が実行終了の知らせに使う）。
root.system.run=function (func) {
    root.system.lastRun=undefined;
    try {
        var res=func.apply(root,[]);
        if (AsyncByGenerator.isGenerator(res)) {
            res=AsyncByGenerator.run(res);
            res=res.catch(root.system.handleError);
            root.system.lastRun=res;
            return res;
        }
    } catch (e) {
        root.system.handleError(e);
    }
};
// 変数「名前_N」の読み出し（トランスパイラが名前_N の形の変数を読むときに使う・2026-09-27）。
// 変数「名前_N」があればその値。無ければ、配列「名前」の N 番目（1始まり）を返す
// （V4 OxObject.getProp 準拠。例: json解析 した最上位が配列の JSON を 木_1 で読む）。
root.system.readN=function (obj,name){
    var v=obj[name];
    if (v!==undefined) return v;
    var m=/^(.+)_([0-9]+)$/.exec(name);
    if (!m) return v;
    var arr=obj[m[1]];
    var i=parseInt(m[2],10);
    if (Array.isArray(arr) && i>=1 && i<=arr.length) {
        var e=arr[i-1];
        return (e===null) ? undefined : e;
    }
    return v;
};
// 旧名（配列担当の実装名）。トランスパイラは readN を使う
root.system.readIndexedVar=function(o,name){ return root.system.readN(o,name); };
Function.prototype.checkerror=function () {
    var f=this;
    return dtlbind(f.bound, function () {
        try {
           var res=f.apply(this,arguments);
           if (res && typeof res.catch==="function") {
                return res.catch(root.system.handleError);
           }
           return res;
        } catch(e) {
            root.system.handleError(e);
        }
    });
};
Function.prototype.or=function(){
	var res;
	var args=(arguments.length)?Array.prototype.slice.call(arguments):[];
	args.unshift(this);
	var obj=function(){
		this.func=(function(){});
		this.params=[];
	};
	var objs=[];
	do{
		objs.push(new obj());
		objs[objs.length-1].func=args.shift();
		while(!(typeof args[0]).match(/function|undefined/)){
			objs[objs.length-1].params.push(args.shift());
		}
	}while(args.length>0);
	var keys=Object.keys(objs);
	for(var i=0;i<keys.length;i++){
		i=keys[i];
		res=objs[i].func.execute.apply(objs[i].func,objs[i].params);
		if(res)break;
	}
	return ((res)?res:root.false);
}
Function.prototype.try=function(){
	var res={
		catch:function(){
			return {finally:res.finally};
		},
		finally:function(f){
			f.execute();
		}
	};
	try{
		this.execute.apply(this,arguments);
	}catch(e){
		res.catch=function(f){f.execute(e);return {finally:res.finally};};
	}
	return res;
};
var _jsroot; (function () {_jsroot=this;})();
function dtlbind(bound, f) {
    f.bound=bound;
    // 送信境界判定用マーカー（root.system.send）。dtlbind はブロック生成の唯一の通過点なので、
    // ここでタグ付けすると「ドリトル定義のメソッド」だけを関数境界にできる（ネイティブは非タグ）。
    f.isDtlBlock=true;
    return f;
};

window.dtlbind=dtlbind;
root._while=root.create();
root._while.initialize=function(cond){
  this._while.execute=function(func){
  	var res=undefined;
  	try {
  		while(cond.execute()){
  			// 本体は executeBody（生の実行）で「！返す」を関数境界まで貫通させる。
  			res=func.executeBody();
  		}
  	} catch(e) {
  		// ループ中断「！中断」はループの正常終了として扱う（他の例外は従来どおり伝播）
  		if (!(e && e.isBreakLoop)) throw e;
  	}
  	return res;
  };
};

root._true=root.create();
root._true.else= function (func) {
	// そうでなければ/なら の本体は executeBody で「！返す」を関数境界まで貫通させる。
	return (root._done.create(func.executeBody()));
};
root._true.execute= function (func) {
	return func.executeBody();
};
root._true.then= function(func){
	return (func).then();
};
root._false=root.create();
root._false.else= function(func){
	return root._true;
};
root._false.execute= function(func){
	return undefined;
};
// 「A」！なら「B」なら「…」実行 は A と B が両方真のときだけ実行する。A が偽なら B は評価しない
// （そうでなければ の後の なら＝else if は _false.else が返す _true.then が評価する）
root._false.then= function(func){
	return root._false;
};


root._done= root.create();
root._done.initialize=function(p){
	this._self=p;
};
root._done.else= function(func){
	return this;
};
root._done.execute=function(func){
	return this._self;
};
root._done.then=function(func){
	return this;
};

root.module=root.create().extend({
    require: function () {
        var a=Array.prototype.slice.call(arguments);
        var reqs=[],func;
        while (true) {
            var v=a.shift();
            if (v==null) break;
            if (typeof v=="string") reqs.push(v);
            if (typeof v=="function") {
                func=v;
                break;
            }
        }
        return window.requirejs(reqs,function() {
            if (func) return func.checkerror().execute(arguments);
        });
    }
});
"Number,String,Boolean,Array,Function".split(",").forEach(function (f) {
    root[f]=window[f];
    root[f].prototype.__name__=f+":prototype";
});
root.Block=root.Function;
// 大きい整数（BigInt）: 「大きい整数」「bigInteger」（Japanese2.js の別名表の "bigInteger" はこれを指す）
if (typeof BigInt!=="undefined") {
    root.BigInteger=BigInt;
    root.bigInteger=BigInt;
    BigInt.prototype.__name__="BigInt:prototype";
}
// 円周率（V4 dolittle.ini の PI・π。英字の変数名は大文字小文字を区別しないので pi も同じ）
root.PI=Math.PI;
root.pi=Math.PI;
root["\u03C0"]=Math.PI;

root.emptyObj=function(){return {};};
root["空オブジェクト"]=root.emptyObj;
root.system.capture=function(x,y,w,h){
  var svg=$("#turtle_svg");
  var bodyj=$("body");
  var w_ = parseFloat(bodyj.css("width"));
  var h_ = parseFloat(svg.css("height"));
  // console.log(w_);
  // console.log($("body").css("height"));
  if(x !==undefined && y !==undefined && w !==undefined && h !==undefined){
    x=parseFloat(x);
    y=parseFloat(y);
    w = parseFloat(w);
    h = parseFloat(h);
    x=w_/2+x;
    y=h_/2-y;
    width=x+w;
    height=y+h;
  }else{
    // console.log("x");
    x=0 , y=0;
    w = parseFloat(svg.attr("width"));
    h = parseFloat(svg.attr("height"));
  }

  setTimeout(function(){
    var filename=root.system.inputFileName("保存する画像のファイル名を入力してください。",".png");
    if(filename=="cansel")return;
    svg2image(filename,x,y,w,h);
  }.bind(this),1000);
};
root.system.inputFileName=function(text,ext){
  var filename="ファイル名"+ext;
  filename=prompt(text,filename);
  if(filename == "" || filename == null){
    alert("キャンセルしました。");
    return "cansel";
  }
  if(filename.match(/\.[a-zA-Z0-9]+$/) == null) filename+= ext;
  return filename;
};
root.wait=function (f) {
    if (!DtlPromise.available()) return this;
    if (typeof f==="number") {
        return this.wait(function (s) {
            setTimeout(s,f*1000);
        });
    }
    if (typeof f!=="function") {
        return this.wait(0.1);
    }
    var self=this;
    return DtlPromise.new(function (_succ,fail) {
        var succ=function (r) {
            if (arguments.length===0) {
                r=self;
            }
            _succ(r);
        };
        f.execute(succ,fail);
    });
};
DtlPromise=root.DtlPromise={
    new: function (f) {
        if (typeof Promise==="function") {
            return new Promise(function (succ,fail) {
                f.execute(succ,fail);
            });
        }
    },
    isPromise: function (p) {
        return AsyncByGenerator.isPromise(p);
    },
    available: function () {
        return AsyncByGenerator.supportsGenerator;
    }

    /*IS: "IS_DTL_PROMISE",
    // promisify
    wait: function (obj,f) {// f:promise or func
        var pro;
        if (typeof f==="function"){
            var d=new $.Deferred;
            pro=d.promise();
            f.execute(d.resolve.bind(d),d.reject.bind(d));
        } else pro=f;
        var cpro;
        var isp=DtlPromise.is(obj);
        var IS=DtlPromise.IS;
        var resolved;
        obj[IS]=(isp?isp.then(function () {
            return pro;
        }):pro).then(function (r) {
            resolved=true;
            var isp=DtlPromise.is(obj);
            if (isp===cpro) delete obj[IS];
            return r;
        });
        if (resolved) delete obj[IS];
        else cpro=obj[IS];
        return obj;
    },
    is: function (res) {
        if (res && res[DtlPromise.IS] &&
            res.hasOwnProperty(DtlPromise.IS)) return res[DtlPromise.IS];
    },
    run:function (self,a) {
        function loop() {
            var res;
            while (a.length>0) {
                var f=a.shift();
                if (typeof f!=="function") continue;
                res=f.call(self);
                var dp=DtlPromise.is(res);
                if (dp) {
                    // DtlPromise.run should return promisified object, not (native)promise
                    return DtlPromise.wait(res, dp.then(loop));
                }
            }
            return res;
        }
        return loop();
    }*/
};
})();

function labels2svg(){
  var txt_g=$(document.createElementNS("http://www.w3.org/2000/svg","g"));
  wndj=$(window);
  wndw=wndj.width();
  wndh=wndj.height();
  txt_g.attr("font-family","mono").attr("id","txt_g");
  txt_g.attr("transform","translate("+wndw/2+","+wndh/2+")");
  txt_g.appendTo($("#turtle_svg"));

  labels=$("#UI_div").find("span");
  svged_labels=[];
  labels.map(function(k,e){
    var ej=$(e);
    if(ej.css("display")=="none")return;
    svged_labels.push(ej);
    // ej.hide();
    var text=ej.text();
    var left=ej.css("left");
    var top=ej.css("top");
    var font_size=ej.css("font-size");
    top=2+parseFloat(top)+parseFloat(font_size)+"px";

    var svg_txt=$(document.createElementNS("http://www.w3.org/2000/svg","text"));
    svg_txt.html(text).attr("x",left).attr("y",top).attr("font-size",font_size);
    svg_txt.appendTo(txt_g);
  });
}
function svgedLabels2labels(){
  $("#txt_g").remove();
  svged_labels.map(function(e){e.show();});
}

function svg2image(filename,x,y,width,height){
  labels2svg();
  var svg=$("#turtle_svg");

  var width_ = parseFloat(svg.attr("width"));
  var height_ = parseFloat(svg.attr("height"));
  $("body").append("<canvas id='canvas1' class='hidden' width="  + width + " height=" + height +"></canvas>")
  var bclr=svg.css("background-color");
  svg.css("background-color","white");

  var canvas = $("#canvas1")[0]
  var ctx = canvas.getContext("2d")

  svg.attr("viewBox", x + " " + y + " " + width + " " + height)

  var data = new XMLSerializer().serializeToString(svg[0])
  var imgsrc = "data:image/svg+xml;charset=utf-8;base64,"
                         + btoa(unescape(encodeURIComponent(data)))
  var image = new Image()
  image.onload = function(){
      ctx.drawImage(image, -x, -y);
      $("body").append("<a id='image-file' class='hidden' type='application/octet-stream' href='"
                         + canvas.toDataURL("image/png") + "' download="+filename+">Donload Image</a>")
      $("#image-file")[0].click()

      $("#canvas1").remove()
      $("#image-file").remove()
      svg.attr("viewBox","0 0 "+width_+" "+height_);
      svgedLabels2labels();
  }
  image.src = imgsrc;
  svg.css("background-color",bclr);
}

