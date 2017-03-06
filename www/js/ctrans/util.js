function promisize(p) {
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
    if (window.parent && window.parent.dialogClosed) throw new Error("ダイアログが閉じられたので実行を停止しました");
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

function str_to_ch_arr(str){
	var $=[];
	for(var i=0;i<str.length;i++){$.push(str.charCodeAt(i));}
	//for(var i=0;i<str.length;i++){$.push(cast(CType.char,str.charCodeAt(i)));}
	$.push(0);
	return $;
}
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
