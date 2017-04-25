lineBuf=[];
NULL=0;
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
function scanf(line, dest) {
    //console.log(dest);
	var val;
	line=ch_arr_to_str(line);
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
    	loop_start2();
        if (input.toLowerCase()=="^c") throw new Error("実行を停止しました");
        printf(str_to_ch_arr(input+"\n"));
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
    		var src=str_to_ch_arr(val);
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
function printf() {
    //var line=format.replace(/%d/,value);
	var args=Array.prototype.slice.call(arguments);
	var line=args.shift();
	if(Array.isArray(line))line=ch_arr_to_str(line);
	else line=""+line;
	line=line.replace(/%d|%c|%x|%#x|%u|%lf|%f|%s/g,function (fmt) {
        var arg=args.shift();
		switch(fmt){
		case "%d":
			var res="0";
			switch(typeof arg){
			case "number": case "boolean":
				res=cast(CType.int,arg);
				break;
			}
			return res;
		case "%c":
			var res=" ";
			if(typeof arg=="number")res=String.fromCharCode(arg);
			else if(typeof arg=="string")res=arg+"";
			return res;
		case "%x":
			var res="0";
			if(typeof arg=="number")res=(arg>>>0).toString(16);
			return res;
		case "%#x":
			var res="0";
			if(typeof arg=="number")res="0x"+(arg>>>0).toString(16);
			return res;
		case "%u":
			var res="0";
			if(typeof arg=="number")res=arg>>>0;
			return res;
		case "%f":
			var res="0.000000";
			if(typeof arg=="number")res=arg;
			return res;
		case "%lf":
			var res="0.000000";
			if(typeof arg=="number")res=arg;
			return res;
		case "%s":
		    var res="";
		    if (typeof arg=="string") res=arg;
		    else if (arg.read && arg.offset) {
		        res=ch_arr_to_str(fillStr(arg));
		    } else if (arg instanceof Array) {
		        res=ch_arr_to_str(arg);       
		    }
		    return res;
		default:
		    return "ERR";
		}
	});
	lineBuf.push(line);
	if (lineBuf.length>5) lineBuf.shift();
	var con=(printf.STDOUT||$("#console"));
	con.append(line);
	if (con.text().length>65536) throw new Error("printfによる出力が多すぎます");
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
    if (s instanceof Array) return pointer(s,0);
    if (!s.read || !s.write) throw new Error(s+" is not pointer.");
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
    for (i=0; i<cnt ;i++) {
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
function rand() {
    return Math.floor(Math.random()*0xffffffff);
}
window.print=function() {throw new Error("print関数はありません。printfの間違いではないですか？");};
