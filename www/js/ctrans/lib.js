lineBuf=[];
NULL=0;
function log(){
	console.log(arguments);
};
function pointer(obj,key,type) {
	if(Array.isArray(obj[key])){
		var tmp=[];
		for(var i=0;i<obj[key].length;i++){
			var $={
				read:function(){return obj[key][i];},
				write:function(v){return obj[key][i]=v;},
				type:type.split(",")[1],
			};
			tmp.push($);
			//if(tmp[2])console.log(tmp[2].read());
		}
//console.log(tmp[1].read());
for(var i=0;i<tmp.length;i++)console.log(tmp[i].read());
		return tmp;
	}
  return {
    read: function () { return obj[key];},
    write: function (v) { return obj[key]=v;},
		type: type,
  };
}
function scanf(line, dest) {
console.log(dest);
	var val;
	line=ch_arr_to_str(line);
  var input=prompt(lineBuf.join(""),"");
  printf(str_to_ch_arr(input+"\n"));
	var format=line.match(/%d|%c|%x|%#x|%lf|%f/);
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
	}
	
	if(typeof dest.write=="function")
		dest.write(cast(dest.type,val));
	else dest=val;
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
				res=cast("int",arg);
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
		    else if (arg instanceof Array) {
		        res=ch_arr_to_str(arg);       
		    }
		    return res;
		default:
		    return "ERR";
		}
	});
	lineBuf.push(line);
	if (lineBuf.length>5) lineBuf.shift();
	(printf.STDOUT||$("#console")).append(line);
}
["abs","acos","asin","atan","atan2","ceil","cos","exp","floor",
"log","max","min","pow","random","round","sin","sqrt","tan"].forEach(function (k) {
    var f=Math[k];
    if (typeof f=="function") {
        window[k]=f.bind(Math);
    }
});
// -------- 文字列関数はchr_arrayを想定していたが、本当はpointerが通じるようにしないといかん
function strlen(str) {
    var len=0;
    while (str[len++]);
    return len;
}
function strcpy(dst,src) {
    return strncpy(dst,src,strlen(src)+1);
}
function fillStr(str,n) {
    //  "ABC", 5 ->   "ABC\0\0"
    var z;
    var dst=[];
    for (var i=0;i<n;i++) {
        if (src[i]==0) {
            z=true;        
        }
        if (z) {
            dst[i]=0;
        } else {
            dst[i]=src[i];
        }
    }
    return dst;
}
function strncpy(dst, src,n) {
    src=fillStr(src,n);    
    for (var i=0;i<n;i++) {
        dst[i]=src[i];
    }
    return pointer(dst,0);
}
function strncmp(s1,s2,n) {
    for (var i=0;i<n;i++) {
        if (s1[i]==0 && s2[i]==0) return 0;
        var s=s1[i]>s2[i]?1:s1[i]<s2[i]?-1:0;
        if (s!=0) return s;
    }
    return 0;
}
function strcmp(s1,s2) {
    var len=Math.max(strlen(s1),strlen(s2));
    return strncmp( fillStr(s1,len),fillStr(s2,len) ,len);
}
function strcat(dst,src) {
    return strncat(dst,src,strlen(src));
}
function strncat(dst,src,n) {
    var p=strlen(dst);
    var i;
    for (i=0;i<n;i++) {
        dst[p+i]=src[i];
        if (src[i]==0) break;
    }
    if (i>=n) src[i]=0;
    return pointer(dst,0);
}
function index(str,c) {
    for (var i=0; str[i] ; i++) {
        if (str[i]==c) return i;
    }
    return NULL;
}
function rindex(str,c) {
    for (var i=strlen(str)-1; i>=0 ; i--) {
        if (str[i]==c) return i;
    }
    return NULL;
}
function memcmp(s1,s2,n) {
    for (var i=0;i<n;i++) {
        var s=s1[i]>s2[i]?1:s1[i]<s2[i]?-1:0;
        if (s!=0) return s;
    }
    return 0;
}
window.print=function() {throw new Error("print関数はありません。printfの間違いではないですか？");}
