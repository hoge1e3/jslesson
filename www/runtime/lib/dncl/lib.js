var dnclroot={};

Object.defineProperty(Array.prototype,"toString",{
	enumerable:false,configurable:true,
	value:function(){
		return "{ "+this.join(", ")+" }";
	}
});

(function(){
	var disp_area=undefined;
	this["dncl_disp"]=function(_params,_newLineFlag){
		if(disp_area===undefined){
			disp_area=root["TextArea"]["create"]()["size"](400,600);
		}
		if(_params[_params.length-1]==="\n"){
			_newLineFlag=false;
		}
		_params=_params.map(function(e){
			if(Array.isArray(e)){e=""+e;}
			return e;
		});
		disp_area["write"](Array.prototype.slice.call(_params));
		if(_newLineFlag){
			disp_area["newLine"]();
		}
	};
	
	var trtl=undefined;
	this["turtle_create"]=function(){
	  trtl=root["タートル"]["作る"]();
	};
	this["fwd"]=function(num){trtl["歩く"](num);};
	this["rt"]=function(num){trtl["右回り"](num);};
	this["lt"]=function(num){dnclroot["rt"](-num);};
	this["pc"]=function(c){trtl["線の色"](c);};
	
	this["ref"]=function(name,val){
		return (val!==undefined)?val:(initDict[name]);
	};
	
	var initDict={};
	this["allSet"]=function(name,val){
		this[name]=this[name]||[];
		initDict[name]=val;
	};
	this["toIndex"]=function(index){
		if((typeof index)=="number")index=Math.floor(index)-1
		return index;
	};
	this["toInt"]=function(val){
		if((typeof val)=="number")val=Math.floor(val);
		return val
	};
	this["undef20"]=function(val){
		return (val===undefined)?0:val;
	};
	var startTime=undefined;
	this["__start"]=function(){
		startTime=(new Date()).getTime()/1000;
	};
	this["getTime"]=function(){
		return (new Date()).getTime()/1000;
	};
	this["elapsedTime"]=function(){
		return ((new Date()).getTime()/1000)-(startTime);
	};
	this["経過時間"]=this["elapsedTime"];
	this["ifndef"]=function(obj,key){
		obj[key]=(obj[key]===undefined)?[]:obj[key];
		if(!Array.isArray(obj[key]))throw new Error("配列ではない値を配列として参照しようとしています。");
		return obj[key];
	};
	this["param_or_this"]=function(k,params){
		return (Object.keys(params).indexOf(k)===-1)?this:params;
	};
	this["log"]=function(){
		console.log.apply(this,arguments);
	};
	this["typeof"]=function(val){
		return typeof val;
	};
}).apply(dnclroot);
