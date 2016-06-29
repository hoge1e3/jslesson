(function (){
var root={window:window,document:document, console:console};
window.root=root;
root.root=root;
//var ctx=$("canvas").get(0).getContext("2d");
var localize=function (obj, map) {
    for (var k in map) if (obj[k]) obj[map[k]]=obj[k];
};
root.system={
	localize: localize,
	gui_posx:10,
	gui_posy:10,
	timestamp__question:function(){return new Date().getTime();},
	time__question:function(){
		var date = new Date();
		return (date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
	},
	new:function(obj){
		return new(Function.prototype.bind.apply(obj,arguments));
	},
	sleep:function(time){
		var start=new Date().getTime();
		var end=start+time;
		for(;;){
			if((new Date().getTime())>=end)break;
		}
	},
	log:function(param){return console.log(param.valueOf());},
	use:function(lib){
		return $.ajax({url:"http://oecu-edu.sakura.ne.jp/honda/"+lib}).then(function(data){
			console.log(data);
			(new Function(window.parent.MinimalParser.parse(data)))();
		},function(){alert("setup.iniの読み込みに失敗しました");});
	},
	"システム秒__question":function(){return new Date().getTime();},
	"時刻__question":function(){
		var date = new Date();
		return (date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
	},
	"日時__question":function(){return (new Date).toString();},
	"曜日__question":function(){var num=(new Date).getDay();var res=null;
		if(num==0)return "日";
		else if(num==1)res= "月";
		else if(num==2)res= "火";
		else if(num==3)res= "水";
		else if(num==4)res= "木";
		else if(num==5)res= "金";
		else res="土";
		return res;
	},
	"年__question":function(){return (new Date).getFullYear();},
	"月__question":function(){return (new Date).getMonth();},
	"日__question":function(){return (new Date).getDate();},
	"時__question":function(){return (new Date).getHours();},
	"分__question":function(){return (new Date).getMinutes();},
	"秒__question":function(){return (new Date).getSeconds();}
};
root.create=function () {
    var r=Object.create(this);
    var init=(r.initialize || r["初期化"] || function (){});
    init.apply(r,arguments);
    return r;
};
localize(root, {system:"システム", create:"作る"});
localize(root.system, {time__question:"時刻__question"  ,use: "使う"});

root.random=function(param){
	var res=Math.random();
	res=res*param;
	res=res-res%1;
	return res+1;
};
root.sin=function(param){return Math.sin(param);};
root.cos=function(param){return Math.cos(param);};
root.tan=function(param){return Math.tan(param);};
root.abs=function(param){return Math.abs(param);};

root.background={
	paint:function(color){$(document.body).css("background",color);}

};

//Timerオブジェクト
root.timer=new (function(){
	var timer_list=[];
	this.allreset=function(){timer_list.foreach(function(e){e.stop();});};
	this.last_func=new $.Deferred;
	this.last_func.resolve();
	this.interval_val=100;
	this.times_val=100;
	this.cnt=1;
	this.create=function(){var obj=Object.create(this);return obj;};
	this.interval=function(num){this.interval_val=num*1000;return this;};
	this.times=function(num){this.times_val=num;return this;};
	//this.wait=function(){var end_flag=false;this.last_func.then(function(){end_flag=true;});for(;;){if(end_flag)break;system.sleep(1);console.log("a");}};
	this["完了時実行"]=function(func){this.last_func=this.last_func.then(func);};
	this.execute=function(func,times){
		var self=this;
		var timer_func=function(){
			var d=new $.Deferred;
			if(times)self.times_val=times;
			var flg=true;
			self.id=setInterval(function(){
				if(flg){
					self.stop=function(){clearInterval(self.id);};
					timer_list.push(self);console.log(timer_list);
					flg=false;
				}
				try {
    				func.execute(self.cnt);
				} catch (e) {
				    self.stop();
				    if (onerror) onerror(e.message,"timer",0,0,e);
				}
				if(++self.cnt>self.times_val){
					self.cnt=1;
					clearInterval(self.id);
					if(self.last_func==d)alert("test");
					d.resolve();
				}
			},self.interval_val);
			return d;
		};
		//if(this.exe_flag){
			this.last_func=this.last_func.then(timer_func);
		//}else{
			//this.last_func=timer_func();
			//this.exe_flag=true;
		//}
		return this;
	};
	this.duration=function(time){
		this.times_val=time/(this.interval_val/1000);
		return this;
	}
});
root["タイマー"]=root.timer;
localize(root.timer, {times:"回数",interval:"間隔", execute:"実行", 
create:"作る",duration:"時間"});
//Array

Object.defineProperty(Array,"create",{
	enumerable:false,configurable:true,
	value:function(){
		return Array.prototype.slice.call(arguments);
	}
});
Object.defineProperty(Array,"作る",{
	enumerable:false,configurable:true,
	value:function(){
		return Array.prototype.slice.call(arguments);
	}
});
Object.defineProperty(Array.prototype,"get",{
	enumerable:false,configurable:true,
	value:function(index){return (this[index-1])?(this[index-1]):(null);}
});
Object.defineProperty(Array.prototype,"読む",{
	enumerable:false,configurable:true,
	value:function(index){return (this[index-1])?(this[index-1]):(null);}
});
Object.defineProperty(Array.prototype,"set",{
	enumerable:false,configurable:true,
	value:function(index,value){this[index-1]=value;return this;}
});
Object.defineProperty(Array.prototype,"上書き",{
	enumerable:false,configurable:true,
	value:function(index,value){this[index-1]=value;return this;}
});
Object.defineProperty(Array.prototype,"add",{
	enumerable:false,configurable:true,
	value:function(value){this.push(value);return this;}
});
Object.defineProperty(Array.prototype,"書く",{
	enumerable:false,configurable:true,
	value:function(value){this.push(value);return this;}
});
Object.defineProperty(Array.prototype,"remove",{
	enumerable:false,configurable:true,
	value:function(obj){
		for(var i=0;i<this.length;i++){
			if(this[i]==obj){this.removepos(i);i=0;}
		}
	}
});
Object.defineProperty(Array.prototype,"消す",{
	enumerable:false,configurable:true,
	value:function(obj){
		for(var i=0;i<this.length;i++){
			if(this[i]==obj){this.removepos(i);i=0;}
		}
	}
});
Object.defineProperty(Array.prototype,"removepos",{
	enumerable:false,configurable:true,
	value:function(index){this.splice(index-1,1);return this;}
});
Object.defineProperty(Array.prototype,"位置で消す",{
	enumerable:false,configurable:true,
	value:function(index){this.splice(index-1,1);return this;}
});
Object.defineProperty(Array.prototype,"insert",{
	enumerable:false,configurable:true,
	value:function(index,value){this.splice(index-1,0,value);return this;}
});
Object.defineProperty(Array.prototype,"挿入",{
	enumerable:false,configurable:true,
	value:function(index,value){this.splice(index-1,0,value);return this;}
});
Object.defineProperty(Array.prototype,"foreach",{
	enumerable:false,configurable:true,
	value:Array.prototype.forEach
});
Object.defineProperty(Array.prototype,"それぞれ実行",{
	enumerable:false,configurable:true,
	value:Array.prototype.forEach
});
Object.defineProperty(Array.prototype,"length__question",{
	enumerable:false,configurable:true,
	value:function(){return this.length;}
});
Object.defineProperty(Array.prototype,"要素数__question",{
	enumerable:false,configurable:true,
	value:function(){return this.length;}
});
Object.defineProperty(Array.prototype,"連結",{
	enumerable:false,configurable:true,
	value:function(arr){Array.prototype.push.apply(this,arr);return this;}
});
Object.defineProperty(Array.prototype,"クリア",{
	enumerable:false,configurable:true,
	value:function(){var length=this.length;for(var i=0;i<=length;i++)this.removepos(1);return this;}
});
root["配列"]=Array;
root.Array=Array;

//Stringオブジェクト
String.prototype.add=function(_param){return this.valueOf()+ _param;};
String.prototype["連結"]=String.prototype.add;
String.prototype.contain__question=function(_param){return -1!=this.valueOf().search(RegExp(_param));};
String.prototype["含む__question"]=String.prototype.contain__question;
String.prototype["何文字目__question"]=function(_param){return this.valueOf().search(RegExp(_param))+1};
String.prototype["substr"]=function(){return ((arguments.length==1)?substr1:substr2).apply(this,arguments);};
String.prototype["部分__question"]=String.prototype.substr;
String.prototype["length__question"]=function(){return this.length;};
String.prototype["長さ__question"]=String.prototype.length__question;
String.prototype["分割"]=String.prototype.split;
String.prototype["置き換える"]=String.prototype.replace;
String.prototype["全部置き換える"]=function(_pattern,_replacement){return this.valueOf().replace((new RegExp(_pattern,"g")),_replacement);};
var substr1=function(param){return this.substring(param-1);};
var substr2=function(param1,param2){return this.substring(param1-1,param2);}

var and={true:function(){var arr=Array.prototype.slice.call(arguments);var res=Boolean(arr[0]);$.each(arr,function(key,value){res=(res&&value);});return res;}};
var or={true:function(){var arr=Array.prototype.slice.call(arguments);var res=Boolean(arr[0]);$.each(arr,function(key,value){res=(res||value);});return res;}};

//Booleanオブジェクト
Boolean.prototype.then=function(){return (this)?True:False;};
Boolean.prototype["反対"]=function(){return (false==this);};
//Number
["atan","abs","floor"].forEach(function (k) {
    Number.prototype[k]=function () {
        return Math[k](this);
    };
});
["sin","cos","tan"].forEach(function (k) {
    Number.prototype[k]=function () {
        return Math[k](this.radian());
    };
});
Number.prototype.radian=function() {
    return this/180*Math.PI;
};
Number.prototype.degree=function() {
    return this/Math.PI*180;
};

//Function
Function.prototype.execute	=	function(){return this.apply(this.bound||this,arguments);};
Function.prototype.repeat=function(param){
	var res;
	for(var i=1;i<=param;++i)res=this.execute(i);
	return res;
};
Function.prototype.while=function(){return (new While(this));};
Function.prototype.then=function(){return (this.execute(this,arguments))?True:False;};
Function.prototype.checkerror=function () {
    var f=this;
    return dtlbind(f.bound, function () {
        try {
           return f.apply(this,arguments);
        } catch(e) {
            if (onerror) onerror(e.message,"unknown",1,1,e); 
            else throw e; 
        }
    });
};
var _jsroot; (function () {_jsroot=this;})();
function dtlbind(bound, f) {
    f.bound=bound;
    return f;
};
window.dtlbind=dtlbind;
While=function(func){
	this._self=func;
	this.execute=function(func){
		while(this._self()){
			func.execute();
		};
	return undefined;
	};
};

True={
	else: function (func) {
		return (new Done(func.execute()));
	},
	"そうでなければ": function(func){
		return (new Done(func.execute()));
	},
	execute: function (func) {
		return func.execute();
	},
	"実行":function(func){
		return func.execute();
	},
	then: function(func){
		return (func).then();
	},
	"なら":function(func){
		return (func).then();
	},
};

False={
	else: function(func){
		return True;
	},
	"そうでなければ":function(func){
		return True;
	},
	execute: function(func){
		return undefined;
	},
	"実行":function(func){
		return undefined;
	},
	then: function(func){
		return (func).then();
	},
	"なら":function(func){
		return (func).then();
	},
};

Done= function(param){
	this._self=param;
	this.else= function(func){
		return this;
	};
	this["そうでなければ"]=function(func){
		return this;
	};
	this.execute=function(func){
		return this._self;
	};
	this["実行"]=function(func){
		return this._self;
	};
	this.then=function(func){
		return this;
	};
	this["なら"]=function(func){
		return this;
	};
};
root["ブロック"]=Function;
localize(Function.prototype,{then:"なら", repeat:"繰り返す", "while":"の間"});

root.module={
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
};

})();