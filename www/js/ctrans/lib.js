/* global window,global*/
(function () {
var _global=(typeof window!=="undefined" ? window : global);
var root=(typeof window!=="undefined" ? window : global);
_global.lineBuf=[];
_global.NULL=undefined;
_global.EOF=-1;
_global.log=function log(){
	console.log(arguments);
};

_global.cjsFileHome=function cjsFileHome() {
	var d;
	if (root.BitArrow && typeof root.BitArrow.publishedURL==="string") {
		var a=root.BitArrow.publishedURL.replace(/\/$/,"").split("/");
		d=a.pop();
	}
	if (!d) d="unknown";
	return root.FS.get("/c-js/").rel(d+"/");
};
_global.fopen=function fopen(file, mode) {
	file=_global.ch_ptr_to_str(file);
	mode=_global.ch_ptr_to_str(mode);
	var f=_global.cjsFileHome().rel(file);
	var fp={
		file:f,
		mode:mode,
		isFP:true
	};
	if (mode.indexOf("r")>=0) {
		if (!f.exists()) {
			//throw new Error("ファイル "+file+"はありません．");
			return _global.NULL;
		}
		fp.pos=0;
		fp.text=f.text();
	} else if (mode.indexOf("w")>=0) {
		fp.pos=0;
		fp.text="";
	} else if (mode.indexOf("a")>=0) {
		if (!f.exists()) {
			fp.pos=0;fp.text="";
		} else {
			fp.text=f.text();fp.pos=fp.text.length;
		}
	} else {
		throw new Error('fopenの第２引数には "r" "w" "a" のいずれかを指定してください．→'+mode);
	}
	return fp;
};
_global.fputs=function fputs(str,fp) {
	if (!fp||!fp.isFP) throw new Error("fputs: 第2引数がファイルではありません");
	if (fp.closed) throw new Error("fputs: このファイルはすでに閉じられています");
	if (fp.mode==="r") throw new Error("読み込み中のファイルにfputsはできません");
	str=_global.ch_ptr_to_str(str);
	fp.text+=str;
	fp.pos+=str.length;
};
_global.fgets=function fgets(str,len,fp) {
	if (!fp||!fp.isFP) throw new Error("fgets: 第3引数がファイルではありません");
	if (fp.closed) throw new Error("fgets: このファイルはすでに閉じられています");
	if (fp.mode!=="r") throw new Error("書き込み中のファイルにfgetsはできません");
	len--;//for \0
	var heading=fp.text.substring(fp.pos);
	var inputLen=heading.indexOf("\n");
	if (inputLen<0) inputLen=heading.length;
	else inputLen++;
	if (inputLen>len) inputLen=len;
	if (inputLen===0) return _global.NULL;
	var input=heading.substring(0,inputLen);
	fp.pos+=inputLen;
	return _global.strcpy(str,_global.str_to_ch_ptr(input));
};
_global.fclose=function fclose(fp) {
	if (!fp||!fp.isFP) throw new Error("fclose: 引数がファイルではありません");
	if (fp.closed) throw new Error("fclose: このファイルはすでに閉じられています");
	fp.file.text(fp.text);
	fp.closed=true;
};
_global.fprintf=function fprintf() {
	var a=Array.prototype.slice.call(arguments);
	var fp=a.shift();
	var line=sprintfJS.apply(this,a);
	return _global.fputs(_global.str_to_ch_ptr(line),fp);
};
_global.fscanf=function fscanf() {
	var args=Array.prototype.slice.call(arguments);
	var fp=args.shift();
	if (!fp||!fp.isFP) throw new Error("fscanf: 第1引数がファイルではありません");
	if (fp.closed) throw new Error("fscanf: このファイルはすでに閉じられています");
	if (fp.mode.indexOf("w")>=0) throw new Error("書き込み中のファイルにfscanfはできません");
	var input;
	do {
		var heading=fp.text.substring(fp.pos);
		if (heading.trim()==="") {
			fp.pos+=heading.length;
			return _global.EOF;
		}
		var inputLen=heading.indexOf("\n");
		if (inputLen<0) inputLen=heading.length;
		else inputLen++;
		input=heading.substring(0,inputLen);
		fp.pos+=inputLen;
	} while (input.trim()==="");
	args.unshift(_global.str_to_ch_ptr(input));
	return _global.sscanf.apply(this,args);
};
_global.scanf=function scanf() {
	var args=Array.prototype.slice.call(arguments);
    if (scanf.STDIN) {
		return afterScan(scanf.STDIN.shift());
	} else if (typeof window==="undefined") {
		if (!scanf.nodeInterface) {
			var readline = global.require('readline');
			scanf.nodeInterface = readline.createInterface({
			  input: global.process.stdin,
			  output: global.process.stdout
			});
			scanf.nodeBuf=[];
			scanf.nodeInterface.on("line",function (l) {
				scanf.nodeBuf.push(l);
				if (scanf.nodeOnLine) {
					scanf.nodeOnLine(afterScan(scanf.nodeBuf.shift()));
					delete scanf.nodeOnLine;
				}
			});
		}
		if (scanf.nodeBuf.length>0) return afterScan(scanf.nodeBuf.shift());
		return new Promise(function (p) {
			scanf.nodeOnLine=p;
		});
	} else if (root.AsyncByGenerator &&
	    root.AsyncByGenerator.supportsGenerator &&
	    $("#console")[0]) {
	    return new Promise(function (p) {
	        var box=$("<input>").on("keydown",function (e) {
	            console.log(e);
	            if (e.originalEvent.keyCode==13) {
	                $(this).remove();
	                p(this.value);
	            }
	        });
	        $("#console").append(box);
	        box.focus();
	    }).then(afterScan);
	} else {
        var input=root.prompt(_global.lineBuf.join("")+"\n(実行を停止するには^Cを入力)","");
		afterScan(input);
	}
	function afterScan(input) {
		_global.loop_start2();
		if (input.toLowerCase()=="^c") throw new Error("実行を停止しました");
        printScanfLine(input+"\n");
		//printf(str_to_ch_ptr(input+"\n"));
		args.unshift(_global.str_to_ch_ptr(input));
		return _global.sscanf.apply(this,args);
	}
};
_global.sscanf=function sscanf() {
	var dests=Array.prototype.slice.call(arguments);
	var line=_global.ch_ptr_to_str(dests.shift());
	var format=_global.ch_ptr_to_str(dests.shift());
//TODO
//https://github.com/Lellansin/node-scanf/blob/master/lib/scanf.js
	var r=_global.sscanfJS(line,format);
	if (dests.length!==r.length) {
		throw new Error("scanfやfscanfで読んだ行に含まれる値の個数("+r.length+")と、"+
			"格納先の変数の個数("+dests.length+")が一致しません。");
	}
	r.forEach(function (val,i) {
		var dest=dests[i];
		if(dest && typeof dest.write=="function") {
			if (typeof val==="string") {
				var src=_global.str_to_ch_ptr(val);
	    		_global.strcpy(dest, src);
			} else if (dest.type instanceof _global.CType.Base) {
        		dest.write(_global.cast(dest.type,val));
    	    } else {
        		dest.write(val);
    	    }
    	} else {
			throw new Error("読み込む変数はポインタでなければなりません。変数の前に&を付け忘れていませんか？");
		}
	});
	return dests.length;
};

function sprintfJS() {
	//  input -> chrptr  output->jsString
	// from http://d.hatena.ne.jp/uupaa/20080301/1204380616
    var rv = [], i = 0, v, width, precision, sign, idx, argv = arguments, next = 0;
    var unsign = function(val) { return (val >= 0) ? val : val % 0x100000000 + 0x100000000; };
    var getArg = function() {
		if (!idx && next>=argv.length) throw new Error("printfの引数が足りません");
		return argv[idx ? idx - 1 : next++];
	};
	var parseInt2=function (arg) {
		var res=0;
		if (arg && arg.IS_POINTER) {
			return arg.addr||0;
		}
		switch(typeof arg){
		case "number": case "boolean":
			res=_global.cast(_global.CType.Int(),arg);
			break;
		}
		return res;
	};
	var s = (_global.ch_ptr_to_str(getArg())+ "     ").split(""); // add dummy 5 chars.

    for (; i < s.length - 5; ++i) {
      if (s[i] !== "%") { rv.push(s[i]); continue; }

      ++i; idx = 0; precision = undefined;

      // arg-index-specifier
      if (!isNaN(parseInt(s[i])) && s[i + 1] === "$") { idx = parseInt(s[i]); i += 2; }
      // sign-specifier
	  // sign = (s[i] !== "#") ? false : ++i, true;
      if (s[i] !== "#") { sign= false; }
	  else {++i; sign=true;}
      // width-specifier
      width = (isNaN(parseInt(s[i]))) ? 0 : parseInt(s[i++]);
      // precision-specifier
      if (s[i] === "." && !isNaN(parseInt(s[i + 1]))) { precision = parseInt(s[i + 1]); i += 2; }

      switch (s[i]) {
      case "d": v = parseInt2(getArg()).toString(); break;
      case "u": v = parseInt2(getArg()); if (!isNaN(v)) { v = unsign(v).toString(); } break;
      case "o": v = parseInt2(getArg()); if (!isNaN(v)) { v = (sign ? "0"  : "") + unsign(v).toString(8); } break;
      case "x": v = parseInt2(getArg()); if (!isNaN(v)) { v = (sign ? "0x" : "") + unsign(v).toString(16); } break;
      case "X": v = parseInt2(getArg()); if (!isNaN(v)) { v = (sign ? "0X" : "") + unsign(v).toString(16).toUpperCase(); } break;
      case "f": v = parseFloat(getArg()).toFixed(precision||6); break;
      case "c": width = 0; v = getArg(); v = (typeof v === "number") ? String.fromCharCode(v) : NaN; break;
      case "s": width = 0; v = _global.ch_ptr_to_str(getArg()); if (precision) { v = v.substring(0, precision); } break;
      case "%": width = 0; v = s[i]; break;
      default:  width = 0; v = "%" + ((width) ? width.toString() : "") + s[i].toString(); break;
      }
      if (isNaN(v)) { v = v.toString(); }
  	  if (v.length < width) rv.push(" ".repeat(width - v.length), v); else rv.push(v);
    }
    var line=rv.join("");
	//console.log("ARGV",next,argv.length);
	if (!idx && next<argv.length) _global.doNotification("printfの引数が多すぎます．");
	return line;
}
_global.printf=function printf() {
	var line=sprintfJS.apply(this,arguments);
	_global.lineBuf.push(line);
	if (_global.lineBuf.length>5) _global.lineBuf.shift();
	var con=(printf.STDOUT||$("#console"));
	con.append(line);
	if (con.text().length>65536) throw new Error("printfによる出力が多すぎます");
};
function printScanfLine(line) {
	_global.lineBuf.push(line);
	if (_global.lineBuf.length>5) _global.lineBuf.shift();
	if (!_global.printf.STDOUT) {
		$("#console").append(line);
	}
}
// also in ctrans.js
["abs","acos","asin","atan","atan2","ceil","cos","exp","floor",
"log","max","min","pow","random","round","sin","sqrt","tan"].forEach(function (k) {
    var f=Math[k];
	//var _global=(typeof window!=="undefined" ? window : global);
    if (typeof f=="function") {
        _global[k]=f.bind(Math);
    }
});
// -------- 文字列関数はchr_arrayを想定していたが、本当はpointerが通じるようにしないといかん
function pointerize(s) {
    if (s.IS_POINTER) return s;
    if (s instanceof Array) return _global.pointer(s,0);
    if (!s.IS_POINTER) throw new Error(s+" is not pointer.");
    return s;
}
_global.strlen=function strlen(str) {
    str=pointerize(str);
    var len=0;
    while (str.read()) {
        str=str.offset(1);
        len++;
    }
    return len;
};
_global.strcpy=function strcpy(dst,src) {
    return _global.strncpy(dst,src,_global.strlen(src)+1);
};
function fillStr(str,n) {
    str=pointerize(str);
    //  "ABC", 5 ->   "ABC\0\0"
    var z;
    var dst=[];
    var infty=(typeof n!=="number");
    for (var i=0;infty || i<n;i++) {
        /*if (infty) {
            console.log(str.read());
            if (i>100) break;
        }*/
        if (!str.read()) {
            z=true;
        }
        if (z) {
            dst[i]=0;
            if (infty) break;
        } else {
            dst[i]=str.read();
        }
        str=str.offset(1);
    }
    return dst;
}
_global.strncpy=function strncpy(dst, src,n) {
    dst=pointerize(dst);
    var r=dst;
    src=fillStr(src,n);
    for (var i=0;i<n;i++) {
        dst.write(src[i]);
        dst=dst.offset(1);
    }
    return r;
};
_global.strncmp=function strncmp(s1,s2,n) {
    s1=pointerize(s1);
    s2=pointerize(s2);
    for (var i=0;i<n;i++) {
        var e1=s1.read(),e2=s2.read();
        if (e1===0 && e2===0) return 0;
        var s=e1>e2?1:e1<e2?-1:0;
        if (s!==0) return s;
        s1=s1.offset(1);
        s2=s2.offset(1);
    }
    return 0;
};
_global.strcmp=function strcmp(s1,s2) {
    var len=Math.max(_global.strlen(s1),_global.strlen(s2));
    return _global.strncmp( fillStr(s1,len),fillStr(s2,len) ,len);
};
_global.strcat=function strcat(dst,src) {
    return _global.strncat(dst,src,_global.strlen(src)+1);
};
_global.strncat=function strncat(dst,src,n) {
    src=pointerize(src);
    var head=pointerize(dst);
    var p=_global.strlen(head);
    dst=head.offset(p);
    var i;
    for (i=0;i<n;i++) {
        dst.write(src.read());
        if (src.read()===0) break;
        src=src.offset(1);
        dst=dst.offset(1);
    }
    if (i>=n) src.write(0);
    return head;
};
_global.memset=function memset(dst,s,n) {
    dst=pointerize(dst);
    while(n--) {
        dst.write(s);
        dst=dst.offset(1);
    }
};
_global.index=function index(str,c) {
    str=pointerize(str);
    for (var i=0; str.read() ; i++) {
        if (str.read()==c) return str;
        str=str.offset(1);
    }
    return _global.NULL;
};
_global.rindex=function rindex(str,c) {
    str=pointerize(str);
    var ini=_global.strlen(str)-1;
    str=str.offset(ini);
    for (var i=ini ; i>=0 ; i--) {
        if (str.read()==c) return str;
        str=str.offset(-1);
    }
    return _global.NULL;
};
_global.strstr=function strstr(haystack, needle) {
    needle=pointerize(needle);
    haystack=pointerize(haystack);
    var cnt=_global.strlen(haystack)-_global.strlen(needle);
    var nlen=_global.strlen(needle);
    var i,j;
    for (i=0; i<=cnt ;i++) {
        for (j=0;j<nlen;j++) {
            var h=haystack.offset(i+j).read();
            var n=needle.offset(j).read();
            //console.log(i+j,j,h,n);
            if (h!==n) break;
        }
        if (j===nlen) return haystack.offset(i);
    }
    return _global.NULL;
};
_global.memcmp=function memcmp(s1,s2,n) {
    s1=pointerize(s1);
    s2=pointerize(s2);
    for (var i=0;i<n;i++) {
        var e1=s1.read(),e2=s2.read();
        var s=e1>e2?1:e1<e2?-1:0;
        if (s!==0) return s;
        s1=s1.offset(1);
        s2=s2.offset(1);
    }
    return 0;
};
_global.memcpy=function memcpy(dst, src,n) {
    src=pointerize(src);
    dst=pointerize(dst);
    var r=dst;
    for (var i=0;i<n;i++) {
        dst.write(src.read());
        src=src.offset(1);
        dst=dst.offset(1);
    }
    return r;
};
_global.usleep=function usleep(msec) {
    _global.loop_start2();
    return new Promise(function (succ) {
        setTimeout(succ,msec/1000);
    });
};
_global.sleep=function sleep(msec) {
    _global.loop_start2();
    return new Promise(function (succ) {
        setTimeout(succ,msec*1000);
    });
};
_global.RAND_MAX=0x7fffffff;
_global.rand=function rand() {
    return Math.floor(Math.random()*_global.RAND_MAX);
};
_global.srand=function srand(/*s*/) {

};
_global.time=function time() {
	return new Date().getTime();
};
_global.exit=function exit(status) {
	var e=new Error("exit()によりプログラムが終了しました");
	e.suppressHandleError=!status;
	e.status=status;
	throw e;
};
})();
//function print() {throw new Error("print関数はありません。printfの間違いではないですか？");};
