(function (){
var root={window:window,document:document, console:console};
window.root=root;
root.root=root;
var localize=function (obj, map) {
    for (var k in map) if (obj[k]) obj[map[k]]=obj[k];
};
root.create=function () {
    var r=Object.create(this);
    var init=(r.initialize || r["初期化"] || function (){});
    init.apply(r,arguments);
    return r;
};

root.addAlias=function () {
    var a=Array.prototype.slice.call(arguments);
    var orig=a.shift();
    var t=this;
    a.forEach(function (al) {
        Object.defineProperty(t,al,{
	        enumerable:false,configurable:true,
	        get:function() { return this[orig]; },
	        set:function(v) { return this[orig]=v; }
        });
    });
    return this;
};
 var and={true:function(){var arr=Array.prototype.slice.call(arguments);var res=Boolean(arr[0]);$.each(arr,function(key,value){res=(res&&value);});return res;}};
 var or={true:function(){var arr=Array.prototype.slice.call(arguments);var res=Boolean(arr[0]);$.each(arr,function(key,value){res=(res||value);});return res;}};
 root.and=and;
 root.or=or;

root.system={
	localize: localize,
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
	throw:function(e){throw new Error(e);},
	"try": function (t,c,f) {
	    try {
	        return t.execute();
	    } catch(e) {
	        if (c) return c.execute(e);
	    } finally {
	        if (f) return t.execute();
	    }
	},
	write:function(o,k,v){
		o[k]=v;
		return o;
	},
	read:function(o,k){
		return o[k]
	},
	delete:function(o,k){
		delete o[k];
		return o;
	},
};
localize(root, {system:"システム", create:"作る"});

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

root.true=true;
root.false=false;
root.undefined=undefined;
root.null=null;
root.instanceof=function(f,s){
	if(typeof f!="object")throw new Error("instanceofの第一引数にはオブジェクトを渡して下さい。");
	if(typeof s!="function")throw new Error("instanceofの第二引数には関数を渡して下さい。");
	return (f instanceof s);
};
root.typeof=function(p){return typeof p;};
root.is=function(){
    var child, parent;
    if (arguments.length>=2) {
        child=arguments[0];
        parent=arguments[1];
    } else {
        child=this;
        parent=arguments[1];
    }
	if((typeof parent)!="object")throw new Error("isの引数にはオブジェクトを渡して下さい。");
	return parent.isPrototypeOf(child);
};

//Timerオブジェクト
root.timer=new (function(){
	var timer_list=[];
	this.allreset=function(){timer_list.each(function(e){e.stop();});};
	this.last_func=new $.Deferred;
	this.last_func.resolve();
	this.interval_val=100;
	this.times_val=100;
	this.cnt=1;
	this.create=function(){
	    var obj=Object.create(this);
	    //if (!obj.__proto__) obj.__proto__=this;
	    return obj;
	};
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
	value:function(){
		for(var i in arguments)this.push(arguments[i]);
		return this;
	}
});
Object.defineProperty(Array.prototype,"remove",{
	enumerable:false,configurable:true,
	value:function(obj){
		for(var i=0;i<this.length;i++){
			if(this[i]===obj){this.removepos(i+1);break;}
		}
		return this;
	}
});
Object.defineProperty(Array.prototype,"消す",{
	enumerable:false,configurable:true,
	value:function(obj){
		for(var i=0;i<this.length;i++){
			if(this[i]===obj){this.removepos(i+1);break;}
		}
		return this;
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
Object.defineProperty(Array.prototype,"each",{
	enumerable:false,configurable:true,
	value:function(func){
		var res=undefined;
		for(var i=0;i<this.length;i++){
			res=func.execute(this[i]);
		}
		return res;
	},
});
/*Object.defineProperty(Array.prototype,"foreach",{
	enumerable:false,configurable:true,
	value:Array.prototype.forEach
});*/
Object.defineProperty(Array.prototype,"それぞれ実行",{
	enumerable:false,configurable:true,
	value:Array.prototype.each
});
Object.defineProperty(Array.prototype,"length?",{
	enumerable:false,configurable:true,
	value:function(){return this.length;}
});
Object.defineProperty(Array.prototype,"要素数?",{
	enumerable:false,configurable:true,
	value:function(){return this.length;}
});
Object.defineProperty(Array.prototype,"連結",{
	enumerable:false,configurable:true,
	value:function(){
		for(var i in arguments){
			if(Array.isArray(arguments[i]))Array.prototype.push.apply(this,arguments[i]);
			else this.push(arguments[i]);
		}
		return this;
	}
});
Object.defineProperty(Array.prototype,"クリア",{
	enumerable:false,configurable:true,
	value:function(){var length=this.length;for(var i=0;i<=length;i++)this.removepos(1);return this;}
});
Object.defineProperty(Array.prototype,"randomSelect",{
	enumerable:false,configurable:true,
	value:function(){
		return this[this.length.random()-1];
	}
});
Object.defineProperty(Array.prototype,"select",{
	enumerable:false,configurable:true,
	value:function(f){
		var res=[];
		for(var i=0;i<this.length;i++){
			if(f.execute(this[i])==true){
				res.push(this[i]);
			}
		}
		return res;
	}
});
Object.defineProperty(Array.prototype,"process",{
	enumerable:false,configurable:true,
	value:function(f){
		for(var i=0;i<this.length;i++){
			this[i]=f.execute(this[i]);
		}
		return this;
	}
});
Object.defineProperty(Array.prototype,"bond",{
	enumerable:false,configurable:true,
	value:function(j){
		return this.join((j)?j:"");
	}
});
Object.defineProperty(Array.prototype,"max",{
	enumerable:false,configurable:true,
	value:function(){
		var max=this[0];
		for(var i=0;i<this.length;i++){
			if(max<this[i]){
				max=this[i];
			}
		}
		return max;
	}
});
Object.defineProperty(Array.prototype,"min",{
	enumerable:false,configurable:true,
	value:function(){
		var min=this[0];
		for(var i=0;i<this.length;i++){
			if(min>this[i]){
				min=this[i];
			}
		}
		return min;
	}
});
root["配列"]=Array;
root.Array=Array;

//Stringオブジェクト
String.prototype.add=String.prototype.concat;
String.prototype["連結"]=String.prototype.concat;
String.prototype["contain?"]=function(_param){return -1!=this.valueOf().search(RegExp(_param));};
String.prototype["含む?"]=String.prototype["contain?"];
String.prototype["isPosition?"]=function(p){return this.valueOf().search(RegExp(p))+1};
String.prototype["何文字目?"]=function(_param){return this.valueOf().search(RegExp(_param))+1};
String.prototype["substr"]=function(){return ((arguments.length==1)?substr1:substr2).apply(this,arguments);};
String.prototype["部分"]=String.prototype.substr;
String.prototype["length?"]=function(){return this.length;};
String.prototype["長さ?"]=String.prototype["length?"];
String.prototype["分割"]=String.prototype.split;
String.prototype["置き換える"]=String.prototype.replace;
String.prototype.allReplace=function(_pattern,_replacement){return this.valueOf().replace((new RegExp(_pattern,"g")),_replacement);};
String.prototype["全部置き換える"]=String.prototype.allReplace;
var substr1=function(param){return this.substring(param-1);};
var substr2=function(param1,param2){return this.substring(param1-1,param2);}

//Booleanオブジェクト
Boolean.prototype.then=function(){return (this)?root._true:root._false;};
Boolean.prototype.not=function(){return (false==this);};
Boolean.prototype["反対"]=Boolean.prototype.not;
//Number
["abs","floor","sqrt","round","ceil","exp"].forEach(function (k) {
    Number.prototype[k]=function () {
        return Math[k](this);
    };
});
["sin","cos","tan"].forEach(function (k) {
    Number.prototype[k]=function () {
        return Math[k](this.radian());
    };
});
["atan","acos","asin"].forEach(function(k){
	Number.prototype[k]=function(){
		return Math[k](this).degree();
	};
});
Number.prototype.atan2=function(y){
	return Math.atan2(y,this).degree();
};
Number.prototype.pow=function(m){
	return Math.pow(this,m);
};
Number.prototype.log=function(){
	return Math.log10(this);
};
Number.prototype.ln=function(){
	return Math.log(this);
};
Number.prototype.radian=function() {
    return this/180*Math.PI;
};
Number.prototype.degree=function() {
    return this/Math.PI*180;
};
Number.prototype.random=function(){
	return Random.random(this);
};
Number.prototype.setSeed=function(){
	return Random.setSeed(parseInt(this));
};
Number.prototype.add=function(n){
	return this+n;
};
Number.prototype.sub=function(n){
	return this-n;
};
Number.prototype.mul=function(n){
	return this*n;
};
Number.prototype.div=function(n){
	return this/n;
};
Number.prototype.mod=function(n){
	return this%n
};
Number.prototype.eq=function(n){
	return this==n
};
Number.prototype.ne=function(n){
	return this!=n
};
Number.prototype.gt=function(n){
	return this>n
};
Number.prototype.ge=function(n){
	return this>=n
};
Number.prototype.lt=function(n){
	return this<n
};
Number.prototype.le=function(n){
	return this<=n
};

var Random=new function(){
	this.mtjs=new MersenneTwister();
	
};

Random.setSeed=function(s){
	this.mtjs.setSeed(s);
	return s;
};
Random.random=function(m){
	return (m>0)?(this.mtjs.nextInt(1,m+1)):(this.mtjs.next());
};

//Function
Function.prototype.execute	=	function(){return this.apply(this.bound||this,arguments);};
Function.prototype.repeat=function(param){
	var res;
	for(var i=1;i<=param;++i)res=this.execute(i);
	return res;
};
Function.prototype.while=function(){
	return root._while.create(this);
};
Function.prototype.then=function(){return (this.execute(this,arguments))?root._true:root._false;};
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
Function.prototype.or=function(){
	var res;
	var args=(arguments.length)?Array.prototype.slice.call(arguments):[];
	args.unshift(this);
	var obj=function(){
		this.func=(function(){});
		this.params=[];
	};
	var objs=[];
	do{
		objs.push(new obj());
		objs[objs.length-1].func=args.shift();
		while(!(typeof args[0]).match(/function|undefined/)){
			objs[objs.length-1].params.push(args.shift());
		}
	}while(args.length>0);
	var keys=Object.keys(objs);
	for(var i=0;i<keys.length;i++){
		i=keys[i];
		res=objs[i].func.execute.apply(objs[i].func,objs[i].params);
		if(res)break;
	}
	return ((res)?res:root.false);
}
Function.prototype.try=function(){
	var res={
		catch:function(){
			return {finally:res.finally};
		},
		finally:function(f){
			f.execute();
		}
	};
	try{
		this.execute.apply(this,arguments);
	}catch(e){
		res.catch=function(f){f.execute(e);return {finally:res.finally};};
	}
	return res;
};
var _jsroot; (function () {_jsroot=this;})();
function dtlbind(bound, f) {
    f.bound=bound;
    return f;
};
window.dtlbind=dtlbind;
root._while=root.create();
root._while.initialize=function(f){
	this.s=f;
};
root._while.execute=function(f){
	var res=undefined;
	while(this.s()){
		res=f.execute();
	}
	return res;
};
root._while["実行"]=root._while.execute;

root._true=root.create();
root._true["else"]= function (func) {
	return (root._done.create(func.execute()));
};
root._true["そうでなければ"]= function(func){
	return (root._done.create(func.execute()));
};
root._true.execute= function (func) {
	return func.execute();
};
root._true["実行"]=function(func){
	return func.execute();
};
root._true.then= function(func){
	return (func).then();
};
root._true["なら"]=function(func){
	return (func).then();
};

root._false=root.create();
root._false["else"]= function(func){
	return root._true;
};
root._false["そうでなければ"]=function(func){
	return root._true;
};
root._false.execute= function(func){
	return undefined;
};
root._false["実行"]=function(func){
	return undefined;
};
root._false.then= function(func){
	return (func).then();
};
root._false["なら"]=function(func){
	return (func).then();
};

root._done= root.create();
root._done.initialize=function(p){
	this._self=p;
};
root._done["else"]= function(func){
	return this;
};
root._done["そうでなければ"]=function(func){
	return this;
};
root._done.execute=function(func){
	return this._self;
};
root._done["実行"]=function(func){
	return this._self;
};
root._done.then=function(func){
	return this;
};
root._done["なら"]=function(func){
	return this;
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
