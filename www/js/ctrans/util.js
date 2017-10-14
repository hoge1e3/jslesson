window.supportsAsync=false;
try {
    f=new Function ("var a=async function (){};");
    f();
    window.supportsAsync=true;
}catch(e){
}
var STRUCT_TYPE="#struct_type";
function StructObj(type) {
    if (!(this instanceof StructObj)) return new StructObj(type);
    this[STRUCT_TYPE]=type;
    if (type instanceof CType.Struct) {//TODO: CTYPE_NAME
        var t=this;
        type.members.forEach(function (m) {
            var v;
            if ((m.vtype) instanceof CType.Struct) {//TODO: CTYPE_NAME
                v=StructObj(m.vtype);
            } else if ((m.vtype) instanceof CType.Array) {//TODO: CTYPE_NAME
                v=arrInit2(m.vtype.e, m.vtype.length);
            } else {
                v=dustValue();
            }
            t[m.name+""]=v;
        });
        //console.log("StructObjCreat",type.name,this);
    } else {
        throw new Error("Type should be set");
    }
}
function copyStruct(src) {
    var res=StructObj(src[STRUCT_TYPE]);
    for (var k in src) {
        if (k===STRUCT_TYPE) continue;
        if (isStruct(src[k])) res[k]=copyStruct(src[k]);
        else res[k]=src[k];
    }
    return res;
    function isStruct(o) {
        return o instanceof StructObj;
    }
}
function copyArray(dst,src,type) {
    var e=type.e;
    for (var i=0;i<type.length;i++) {
        var v=src.offset(i).read();
        if (e instanceof CType.Struct) copyStruct2(dst.offset(i).read(),v,e);
        else if (e instanceof CType.Array) copyArray(dst.offset(i).read(),v,e);
        else dst.offset(i).write(v);
    }
    return dst;
}
function copyStruct2(dst,src,type) {
    //console.log("CopyStruct",dst,src);
    type.members.forEach(function (m,i) {
        var k=m.name+"";
        var val=src.IS_POINTER ? src.offset(i).read() : src[k];
        if ((m.vtype) instanceof CType.Struct) copyStruct2(dst[k],val,m.vtype);
        else if ((m.vtype) instanceof CType.Array) copyArray(dst[k],val,m.vtype);
        else dst[k]=val;
    });
    return dst;
}
function pointer(obj,key,type,ofs) {
    if (obj.IS_POINTER) {
        return obj.offset(key);
    }
    if (typeof key==="number") {
        key=Math.floor(key);
    }
    return {
        obj:obj,
        key:key,
        isValidBorder: function () {
            if (obj instanceof Array && typeof key==="number") {
                if (key<0 || key>=obj.length) {
                    return false;
                }
            }
            return true;
        },
        checkBorder: function () {
            if (obj instanceof Array && typeof key==="number") {
                if (key<0 || key>=obj.length) {
                    throw new Error("配列の"+key+"番目にアクセスしようとしました．"+
                    "この配列の有効な添字は[0]から["+(obj.length-1)+"]までです");
                }
            }
        },
        read: function () {
            this.checkBorder();
            return obj[key];
        },
        write: function (v) { this.writeOp("=",v);},
		writeOp:function(op,v){
		    this.checkBorder();
		    switch (op) {
		    case "=":return obj[key]=v;
		    case "+=":return obj[key]+=v;
		    case "-=":return obj[key]-=v;
		    case "*=":return obj[key]*=v;
		    case "/=":return obj[key]/=v;
		    case "%=":return obj[key]%=v;
		    case "++":return obj[key]++;
		    case "--":return obj[key]--;
		    case "++p":return ++obj[key];
		    case "--p":return --obj[key];
		    }
		},
    	type: type,
    	offset: function (o) {
    	    if (typeof key!="number") throw new Error(key+": この操作はできません");
    	    return pointer(obj,key+o,type);
    	},
		IS_POINTER:true
    };
}

function promisize(p) {
    if (typeof AsyncByGenerator=="object") {
        if (AsyncByGenerator.supportsGenerator &&
            AsyncByGenerator.isGenerator(p)) {
            return AsyncByGenerator.run(p);
        }
    }
    if (typeof Promise==="function") {
        if (p instanceof Promise) return p;
        return new Promise(function (succ) {succ(p);});
    } else {
        return $.when(p);
    }
}

function search_scope_level(key,chk){
	var i=scopes.length-1;
	for(;i>=0;i--)
		if(scopes[i][key]!==undefined)break;
	//if (i!=chk) console.log("Noteq",i,chk);
	if(i>=0) return i;
	else throw("変数"+key+"は定義されていません。");
}
function loop_start2(){
    //if (window.parent) window.parent.dialogClosed=false;
    window.startTime=new Date().getTime();
}
function loop_chk2() {
    if (window.parent && window.parent.dialogClosed) {
        var e=new Error("ダイアログが閉じられたので実行を停止しました");
        e.type="dialogClosed";
        throw e;
    }
    var now=new Date().getTime();
    if (now-window.startTime>5000) {
        //console.log(window.parent, window.opener);
        var b=confirm("ループが５秒以上続いています。\n実行を停止するにはOKを押してください。");
	    if(b){throw new Error("実行を停止しました。");}
		else loop_start2();
    }
}
function loop_start(){
	return {time:(new Date().getTime()),count:0};
}

function loop_chk(start){
	var now=new Date().getTime();
	start.count++;
	if(now-start.time>5000 && start.count>10){
	    var b=confirm("ループが５秒以上続いています。\n実行を停止するにはOKを押してください。");
	    if(b){throw new Error("実行を停止しました。");}
		else start.time=new Date().getTime();
	}
}

/*function eval(){
  var str =prompt();
	new Function(str)();
}*/

function str_to_ch_ptr(str){
	var $=[];
	str=str+"";
	for(var i=0;i<str.length;i++){$.push(str.charCodeAt(i));}
	//for(var i=0;i<str.length;i++){$.push(cast(CType.char,str.charCodeAt(i)));}
	$.push(0);
	return pointer($,0);
}
function ch_ptr_to_str(ptr) {
	var line="";
	if (typeof ptr==="string") return ptr;
	if (ptr instanceof Array) ptr=pointer(ptr,0);
	var c;
	for(;c=ptr.read();ptr=ptr.offset(1)){
	    line+=(String.fromCharCode(c));
	}
	return line;
}
//obsolate
function str_to_ch_arr(str){
	var $=[];
	for(var i=0;i<str.length;i++){$.push(str.charCodeAt(i));}
	//for(var i=0;i<str.length;i++){$.push(cast(CType.char,str.charCodeAt(i)));}
	$.push(0);
	return $;
}
//obsolate
function ch_arr_to_str(arr){
	var line="";
	for(var i=0;i<arr.length;i++){
	    if (!arr[i]) break;
	    line+=(String.fromCharCode(arr[i]));
	}
	return line;

}

function param_init(arg,init){
	var res=null;
	if(arg!==undefined&&arg!==null)res=arg;
	else if(init!==undefined&&init!==null)res=init;
	else throw("関数の引数が足りません。");
	return res;
}
function dustValue() {
    return 0xdeadbeef;
}
function doNotification(mesg) {
    if (parent && parent.NotificationDialog) {
        parent.NotificationDialog.show(mesg);
    }
    console.log("doNotification",mesg);
}
function checkDust(v,name) {
    if (v===dustValue()) {
        doNotification("値が初期化されていない可能性があります");
    }
    return v;
}
function expandArray(aryptr,vtype,hasDust) {
    var a=aryptr.obj;
    while(a.length<vtype.length) a.push(initialValue(vtype.e,hasDust));
}
function initialValue(vtype,hasDust) {
    var e=hasDust?dustValue():0;
    if (vtype instanceof CType.Array) {
        e=arrInit2(vtype.e,vtype.length,hasDust);
    } else if (vtype instanceof CType.Struct) {
        e=StructObj(vtype);
    }
    return e;
}
function arrInit2(vtype,length,hasDust){
    var res=[];
    for (var i=0;i<length;i++) {
        var e=initialValue(vtype,hasDust);/*hasDust?dustValue():0;
        if (vtype instanceof CType.Array) {
            e=arrInit2(vtype.e,vtype.length,hasDust);
        } else if (vtype instanceof CType.Struct) {
            e=StructObj(vtype);
        }*/
        res.push(e);
    }
    return pointer(res,0);
}
function arrInit(){
    var a=Array.prototype.slice.call(arguments);
    if (a.length===0) return null;
    var n=a.shift();
	var res=[];
    for (var i=0;i<n;i++) {
        res.push(arrInit.apply(this,a));
    }
    return res;
	/*for(var i=arguments.length-1;i>=0;i--){
		var tmp=res;
		res=[];
		for(var n=0;n<arguments[i];n++){
			res.push(tmp);
		}
	}
	return res;*/
}

function constructByArrInit(type,data) {
    //console.log("cbai",type, data.obj);
    var ary,str;
    function get(i) {
        if (!data.IS_POINTER) {
            throw new Error("初期化子の書き方が違います");
        }
        var o=data.offset(i);
        if (o.isValidBorder()) {
            return o.read();
        } else {
            return dustValue();
        }
    }
    if (type instanceof CType.Array) {
        ary=[];
        for (var i=0; i<type.length ;i++ ) {
            ary.push(constructByArrInit(type.e, get(i)));
        }
        return pointer(ary,0);
    } else if (type instanceof CType.Struct) {
        str=StructObj(type);
        type.members.forEach(function (m,i) {
            var v=get(i);
            str[m.name+""]=constructByArrInit(m.vtype, v);
        });
        return str;
    } else {
        return data;
    }
    return cast(type,data);
}
function cast(type,data){
    if (!(type instanceof CType.Base)) {
        console.log("ERR",type,": not a type");
        throw new Error(type+": not a type");
    }
    return type.cast(data);

	/*type=type.replace(/ /g,"_");
	type=type.charAt(0).toUpperCase()+type.slice(1);

	if(typeof data == "string")data=data.charCodeAt(0);

    var castf=casts["to"+type];
    if (!castf) return data;
	var res=castf(data);

	return res;*/
}

var casts={
	toInt:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;
		res=param;

		return res;
	},
	toUnsigned_int:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;
		res=param;

		return res;
	},

	toChar:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;

		//if(param&0x80)res=param|0xffffff00;
		//else res=param;
		res=param;

		return res;
	},
	toUnsigned_char:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;

		res=param;
		return res;
	},
	toFloat:function(param){return param;},
	toUnsigned_float:function(param){return param;},
	toDouble:function(param){return param;},
	toUnsigned_double:function(param){return param;},
	toArray:function(param){return param;},
	toLong:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;
		res=param;
		return param;
	},
	toUnsigned_long:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;
		res=param;
		return res;
	},
	toShort:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffff;

		if(param&0x8000)res=param|0xffff0000;
		else res=param;
		return res;
	},
	toUnsigned_short:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffff;

		res=param;
		return res;
	},
};
