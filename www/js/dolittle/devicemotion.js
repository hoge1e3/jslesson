var Accelo=(function(){
	this.作る=function(){
		if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0)==false){
			alert("タブレット専用のオブジェクトです。");
			return -1;
		}
		console.log((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0)==false);
		var obj={};
		obj=Object.create(this);
		$(function(){
			window.addEventListener("devicemotion", function(evt){
				var x=(parseInt(evt.accelerationIncludingGravity.x));
				var y=(parseInt(evt.accelerationIncludingGravity.y));
				try{
					if(window.orientation===0)obj.動作(y,x);
					else if(window.orientation===180)obj.動作(-y,-x);
					else if(window.orientation===90)obj.動作(x,-y);
					else obj.動作(-x,y);
				}catch(e){alert("エラーが発生しました。\n"+e);}
				
			}, true);
		});
		return obj;
	};
});
Accelo.prototype=root;

var 加速度センサ = new Accelo;
var 傾きセンサ=加速度センサ;

var コンパス = new (function(){
	var 方角=null;
	var direction=null;
	this.作る =function(){
		if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0)==false){
			alert("タブレット専用のオブジェクトです。");
			return -1;
		}
		var obj={};
		obj=Object.create(this);
		$(function(){
			window.ondeviceorientation = function(event){
				direction=event.webkitCompassHeading;
				方角=((direction>315)?"北":((direction>225)?"西":((direction>135)?"南":((direction>45)?"東":("北")))));
				try{
					obj.動作(-(direction-direction%1));
				}catch(e){alert("エラーが発生しました。\n"+e);}
			}
		},true);
	return obj;
	};
	this.動作=(function(){});
	this.方角__question=function(){return 方角;};
	this.向き__question=function(){return direction;};
	this.東__question=function(){return (方角=="東");};
	this.西__question=function(){return (方角=="西");};
	this.南__question=function(){return (方角=="南");};
	this.北__question=function(){return (方角=="北");};
});
