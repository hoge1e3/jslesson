lineBuf=[];
NULL=undefined;
EOF=-1;
function log(){
	console.log(arguments);
}

// Moved to util.js
/*function pointer(obj,key,type,ofs) {
	if(Array.isArray(obj[key])){
		var tmp=[];
		ofs=ofs||0;
		for(var i=0;i<obj[key].length;i++){
		    (function (i) {
    			var $={
    				read:function(){return obj[key][i+ofs];},
    				write:function(v){return obj[key][i+ofs]=v;},
    				offset: function (o) {
                	    return tmp[i+o];
                	},
    				type:type.split(",")[1],
    			};
    			tmp.push($);
		    })(i);
		}
        //for(var i=0;i<tmp.length;i++)console.log(tmp[i].read());
		return tmp;
	}
    return {
        read: function () { return obj[key];},
        write: function (v) { return obj[key]=v;},
    	type: type,
    	offset: function (o) {
    	    if (typeof key!="number") throw new Error(key+": この操作はできません");
    	    return pointer(obj,key+o,type);
    	}
    };
}*/
function cjsFileHome() {
	var d;
	if (window.BitArrow && typeof window.BitArrow.publishedURL==="string") {
		var a=window.BitArrow.publishedURL.replace(/\/$/,"").split("/");
		d=a.pop();
	}
	if (!d) d="unknown";
	return FS.get("/c-js/").rel(d+"/");
}
function fopen(file, mode) {
	file=ch_ptr_to_str(file);
	mode=ch_ptr_to_str(mode);
	var f=cjsFileHome().rel(file);
	var fp={
		file:f,
		mode:mode,
		isFP:true
	};
	if (mode.indexOf("r")>=0) {
		if (!f.exists()) {
			//throw new Error("ファイル "+file+"はありません．");
			return NULL;
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
}
function fputs(str,fp) {
	if (!fp||!fp.isFP) throw new Error("fputs: 第2引数がファイルではありません");
	if (fp.closed) throw new Error("fputs: このファイルはすでに閉じられています");
	if (fp.mode==="r") throw new Error("読み込み中のファイルにfputsはできません");
	str=ch_ptr_to_str(str);
	fp.text+=str;
	fp.pos+=str.length;
}
function fgets(str,len,fp) {
	if (!fp||!fp.isFP) throw new Error("fgets: 第3引数がファイルではありません");
	if (fp.closed) throw new Error("fgets: このファイルはすでに閉じられています");
	if (fp.mode!=="r") throw new Error("書き込み中のファイルにfgetsはできません");
	len--;//for \0
	var heading=fp.text.substring(fp.pos);
	var inputLen=heading.indexOf("\n");
	if (inputLen<0) inputLen=heading.length;
	else inputLen++;
	if (inputLen>len) inputLen=len;
	if (inputLen===0) return NULL;
	var input=heading.substring(0,inputLen);
	fp.pos+=inputLen;
	return strcpy(str,str_to_ch_ptr(input));
}
function fclose(fp) {
	if (!fp||!fp.isFP) throw new Error("fclose: 引数がファイルではありません");
	if (fp.closed) throw new Error("fclose: このファイルはすでに閉じられています");
	fp.file.text(fp.text);
	fp.closed=true;
}
function fprintf() {
	var a=Array.prototype.slice.call(arguments);
	var fp=a.shift();
	var line=sprintfJS.apply(this,a);
	return fputs(str_to_ch_ptr(line),fp);
}
function fscanf() {
	var args=Array.prototype.slice.call(arguments);
	var fp=args.shift();
	if (!fp||!fp.isFP) throw new Error("fscanf: 第1引数がファイルではありません");
	if (fp.closed) throw new Error("fscanf: このファイルはすでに閉じられています");
	if (fp.mode!=="r") throw new Error("書き込み中のファイルにfscanfはできません");
	var input;
	do {
		var heading=fp.text.substring(fp.pos);
		if (heading.trim()==="") {
			fp.pos+=heading.length;
			return EOF;
		}
		var inputLen=heading.indexOf("\n");
		if (inputLen<0) inputLen=heading.length;
		else inputLen++;
		input=heading.substring(0,inputLen);
		fp.pos+=inputLen;
	} while (input.trim()==="");
	args.unshift(str_to_ch_ptr(input));
	return sscanf.apply(this,args);
}
function scanfOLD(line, dest) {
    //console.log(dest);
	line=ch_ptr_to_str(line);
	if (scanf.STDIN) {
	    afterScan(scanf.STDIN.shift());
	} else if (window.AsyncByGenerator &&
	    window.AsyncByGenerator.supportsGenerator &&
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
        var input=prompt(lineBuf.join("")+"\n(実行を停止するには^Cを入力)","");
        afterScan(input);
	}
    function afterScan(input) {
		var val;
    	loop_start2();
        if (input.toLowerCase()=="^c") throw new Error("実行を停止しました");
		printScanfLine(input+"\n");
		//printf(str_to_ch_ptr(input+"\n"));
    	var format=line.match(/%d|%c|%x|%#x|%lf|%f|%s/);
    	switch(format+""){
    	case "%d":
    		val=parseInt(input);
    	    break;
    	case "%f":case "%lf":
    		val=parseFloat(input);
    	    break;
    	case "%c":
    		val=input.charCodeAt(0);
    	    break;
    	case "%s":
    		val=input;
    		var src=str_to_ch_ptr(val);
    		strcpy(dest, src);
    		dest=null;
    	    break;
    	}

    	if(dest && typeof dest.write=="function") {
    	    if (dest.type instanceof CType.Base) {
        		dest.write(cast(dest.type,val));
    	    } else {
        		dest.write(val);
    	    }
    	}
    	//else dest=val;
    }
}
function scanf() {
	var args=Array.prototype.slice.call(arguments);
    if (scanf.STDIN) {
		return afterScan(scanf.STDIN.shift());
	} else if (window.AsyncByGenerator &&
	    window.AsyncByGenerator.supportsGenerator &&
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
        var input=prompt(lineBuf.join("")+"\n(実行を停止するには^Cを入力)","");
		afterScan(input);
	}
	function afterScan(input) {
		loop_start2();
		if (input.toLowerCase()=="^c") throw new Error("実行を停止しました");
        printScanfLine(input+"\n");
		//printf(str_to_ch_ptr(input+"\n"));
		args.unshift(str_to_ch_ptr(input));
		return sscanf.apply(this,args);
	}
}
function sscanf() {
	var dests=Array.prototype.slice.call(arguments);
	var line=ch_ptr_to_str(dests.shift());
	var format=ch_ptr_to_str(dests.shift());
//TODO
//https://github.com/Lellansin/node-scanf/blob/master/lib/scanf.js
	var r=sscanfJS(line,format);
	if (dests.length!==r.length) {
		throw new Error("scanfやfscanfで読んだ行に含まれる値の個数("+r.length+")と、"+
			"格納先の変数の個数("+dests.length+")が一致しません。");
	}
	r.forEach(function (val,i) {
		var dest=dests[i];
		if(dest && typeof dest.write=="function") {
			if (typeof val==="string") {
				var src=str_to_ch_ptr(val);
	    		strcpy(dest, src);
			} else if (dest.type instanceof CType.Base) {
        		dest.write(cast(dest.type,val));
    	    } else {
        		dest.write(val);
    	    }
    	} else {
			throw new Error("読み込む変数はポインタでなければなりません。変数の前に&を付け忘れていませんか？");
		}
	});
	return dests.length;
}

function sprintfJS() {
	//  input -> chrptr  output->jsString
	// from http://d.hatena.ne.jp/uupaa/20080301/1204380616
    var rv = [], i = 0, v, width, precision, sign, idx, argv = arguments, next = 0;
    var unsign = function(val) { return (val >= 0) ? val : val % 0x100000000 + 0x100000000; };
    var getArg = function() { return argv[idx ? idx - 1 : next++]; };
	var parseInt2=function (arg) {
		var res=0;
		switch(typeof arg){
		case "number": case "boolean":
			res=cast(CType.int,arg);
			break;
		}
		return res;
	};
	var s = (ch_ptr_to_str(getArg())+ "     ").split(""); // add dummy 5 chars.

    for (; i < s.length - 5; ++i) {
      if (s[i] !== "%") { rv.push(s[i]); continue; }

      ++i, idx = 0, precision = undefined;

      // arg-index-specifier
      if (!isNaN(parseInt(s[i])) && s[i + 1] === "$") { idx = parseInt(s[i]); i += 2; }
      // sign-specifier
      sign = (s[i] !== "#") ? false : ++i, true;
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
      case "s": width = 0; v = ch_ptr_to_str(getArg()); if (precision) { v = v.substring(0, precision); } break;
      case "%": width = 0; v = s[i]; break;
      default:  width = 0; v = "%" + ((width) ? width.toString() : "") + s[i].toString(); break;
      }
      if (isNaN(v)) { v = v.toString(); }
      (v.length < width) ? rv.push(" ".repeat(width - v.length), v) : rv.push(v);
    }
    var line=rv.join("");
	return line;
}
function printf() {
	var line=sprintfJS.apply(this,arguments);
	lineBuf.push(line);
	if (lineBuf.length>5) lineBuf.shift();
	var con=(printf.STDOUT||$("#console"));
	con.append(line);
	if (con.text().length>65536) throw new Error("printfによる出力が多すぎます");
}
function printScanfLine(line) {
	lineBuf.push(line);
	if (lineBuf.length>5) lineBuf.shift();
	if (!printf.STDOUT) {
		$("#console").append(line);
	}
}
// also in ctrans.js
["abs","acos","asin","atan","atan2","ceil","cos","exp","floor",
"log","max","min","pow","random","round","sin","sqrt","tan"].forEach(function (k) {
    var f=Math[k];
    if (typeof f=="function") {
        window[k]=f.bind(Math);
    }
});
// -------- 文字列関数はchr_arrayを想定していたが、本当はpointerが通じるようにしないといかん
function pointerize(s) {
    if (s.IS_POINTER) return s;
    if (s instanceof Array) return pointer(s,0);
    if (!s.IS_POINTER) throw new Error(s+" is not pointer.");
    return s;
}
function strlen(str) {
    str=pointerize(str);
    var len=0;
    while (str.read()) {
        str=str.offset(1);
        len++;
    }
    return len;
}
function strcpy(dst,src) {
    return strncpy(dst,src,strlen(src)+1);
}
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
function strncpy(dst, src,n) {
    dst=pointerize(dst);
    var r=dst;
    src=fillStr(src,n);
    for (var i=0;i<n;i++) {
        dst.write(src[i]);
        dst=dst.offset(1);
    }
    return r;
}
function strncmp(s1,s2,n) {
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
}
function strcmp(s1,s2) {
    var len=Math.max(strlen(s1),strlen(s2));
    return strncmp( fillStr(s1,len),fillStr(s2,len) ,len);
}
function strcat(dst,src) {
    return strncat(dst,src,strlen(src)+1);
}
function strncat(dst,src,n) {
    src=pointerize(src);
    var head=pointerize(dst);
    var p=strlen(head);
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
}
function memset(dst,s,n) {
    dst=pointerize(dst);
    while(n--) {
        dst.write(s);
        dst=dst.offset(1);
    }
}
function index(str,c) {
    str=pointerize(str);
    for (var i=0; str.read() ; i++) {
        if (str.read()==c) return str;
        str=str.offset(1);
    }
    return NULL;
}
function rindex(str,c) {
    str=pointerize(str);
    var ini=strlen(str)-1;
    str=str.offset(ini);
    for (var i=ini ; i>=0 ; i--) {
        if (str.read()==c) return str;
        str=str.offset(-1);
    }
    return NULL;
}
function strstr(haystack, needle) {
    needle=pointerize(needle);
    haystack=pointerize(haystack);
    var cnt=strlen(haystack)-strlen(needle);
    var nlen=strlen(needle);
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
    return NULL;
}
function memcmp(s1,s2,n) {
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
}
function memcpy(dst, src,n) {
    src=pointerize(src);
    dst=pointerize(dst);
    var r=dst;
    for (var i=0;i<n;i++) {
        dst.write(src.read());
        src=src.offset(1);
        dst=dst.offset(1);
    }
    return r;
}
function usleep(msec) {
    loop_start2();
    return new Promise(function (succ) {
        setTimeout(succ,msec/1000);
    });
}
function sleep(msec) {
    loop_start2();
    return new Promise(function (succ) {
        setTimeout(succ,msec*1000);
    });
}
RAND_MAX=0x7fffffff;
function rand() {
    return Math.floor(Math.random()*RAND_MAX);
}
function exit(status) {
	var e=new Error("exit()によりプログラムが終了しました");
	e.suppressHandleError=!status;
	e.status=status;
	throw e;
}
window.print=function() {throw new Error("print関数はありません。printfの間違いではないですか？");};
