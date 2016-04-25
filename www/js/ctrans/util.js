function search_scope_level(key){
console.log(scopes);
	var i=scopes.length-1;
	for(;i>=0;i--)
		if(scopes[i][key]!==undefined)break;
	
	if(i>=0) return i;
	else throw("変数"+key+"は定義されていません。");
}

function loop_start(){
	return {time:(new Date().getTime())}
}

function loop_chk(start){
	var now=new Date().getTime();
	if(now-start.time>5000){
		var b=confirm("ループが５秒以上続いています。\n実行を停止しますか？");

		if(b){setTimeout(function(){exit;},10);throw("実行を停止しました。");}
		else start.time=new Date().getTime();
	}
}

function eval(){
  var str =prompt();
	new Function(str)();
}

function str_to_ch_arr(str){
	var $=[];
	for(var i=0;i<str.length;i++){$.push(cast("char",str.charCodeAt(i)));}
	return $;
}
function ch_arr_to_str(arr){
	var line="";
	for(var i=0;i<arr.length;i++){line+=(String.fromCharCode(arr[i]));}
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
	var res=[];
	for(var i=arguments.length-1;i>=0;i--){
		var tmp=res;
		res=[];
		for(var n=0;n<arguments[i];n++){
			res.push(tmp);
		}
	}
	return res;
}

function cast(type,data){
	var type=type.replace(/ /g,"_");
	type=type.charAt(0).toUpperCase()+type.slice(1);

	if(typeof data == "string")data=data.charCodeAt(0);

	var res=casts["to"+type](data);

	return res;
}

var casts={
	toInt:function(param){
		var res=0;
		param&=0xffffffff;
		res=param;

		return res;
	},
	toUnsigned_int:function(param){
		var res=0;
		param&=0xffffffff;
		res=param;

		return res;
	},
	
	toChar:function(param){
		var res=0;
		param&=0xffffffff;
	
		//if(param&0x80)res=param|0xffffff00;
		//else res=param;
		res=param;

		return res;
	},
	toUnsigned_char:function(param){
		var res=0;
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
		param&=0xffffffff;
		res=param;
		return param;
	},
	toUnsigned_long:function(param){
		var res=0;
		param&=0xffffffff;
		res=param;
		return res;
	},
	toShort:function(param){
		var res=0;
		param&=0xffff;

		if(param&0x8000)res=param|0xffff0000;
		else res=param;
		return res;
	},
	toUnsigned_short:function(param){
		var res=0;
		param&=0xffff;

		res=param;
		return res;
	},
}
