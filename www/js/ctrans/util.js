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
		param&=0x000000ff;
	
		if(param&0x80)res=param|0xffffff00;
		else res=param;
		
		return res;
	},
	toUnsigned_char:function(param){
		var res=0;
		param&=0x000000ff;

		res=param;
		return res;
	},
	toFloat:function(param){return param;},
	toUnsigned_float(param){return param;},
	toDouble:function(param){return param;},
	toUnsigned_double(param){return param;},
	toArray:function(param){return param;},
}
