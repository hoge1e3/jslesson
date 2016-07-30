root.Accelo=root.create();
root.Accelo.x=0;
root.Accelo.y=0;
root.Accelo.動作=(function(){});
root.Accelo.initialize=function(){
	if (
		(window.navigator.userAgent.indexOf('iPhone') > 0 || 
		window.navigator.userAgent.indexOf('iPad') > 0 || 
		window.navigator.userAgent.indexOf('iPod') > 0 || 
		window.navigator.userAgent.indexOf('Android') > 0)==false){
		window.alert("タブレット、スマホ専用のオブジェクトです。");
		return -1;
	}
	var self=this;
	window.$(function(){
		window.addEventListener("devicemotion", function(evt){
		try{
				window.alert((evt.accelerationIncludingGravity.y));
			var x=((evt.accelerationIncludingGravity.x));
			var y=((evt.accelerationIncludingGravity.y));

			if(window.orientation==0){
				self.x=y,self.y=x;
			}else if(window.orientation==180){
				self.x=-y,self.y=-x;
			}else if(window.orientation==90){
				self.x=x,self.y=-y;
			}else {
				self.x=-x,self.y=y;
			}
			self.動作.execute(self.x,self.y);}catch(e){throw new Error(e);}
		},true);
	});
};
this["動作"]=(function(){});
this["横の傾き"]=function(){return this.x};
this["xの傾き"]=this["横の傾き"];
this["xの傾き"]=this["横の傾き"];
this["縦の傾き"]=function(){return this.y};
this["yの傾き"]=this["縦の傾き"];
this["yの傾き"]=this["縦の傾き"];
/*root.Accelo=new (function(){
	this.x=0;
	this.y=0;
	this.作る=function(){
		if (
			(navigator.userAgent.indexOf('iPhone') > 0 || 
			navigator.userAgent.indexOf('iPad') > 0 || 
			navigator.userAgent.indexOf('iPod') > 0 || 
			navigator.userAgent.indexOf('Android') > 0)==false){
			alert("タブレット専用のオブジェクトです。");
			return -1;
		}
		var obj=root.create();
		obj=Object.create(this);
		$(function(){
			window.addEventListener("devicemotion", function(evt){
				var dx=(parseInt(evt.accelerationIncludingGravity.x));
				var dy=(parseInt(evt.accelerationIncludingGravity.y));
				if(window.orientation==0){obj.x=dy,obj.y=dx;}//obj.動作(y,x);
				else if(window.orientation==180){obj.x=-dy,obj.y=-dx;}//obj.動作(-y,-x);
				else if(window.orientation==90){obj.x=dx,obj.y=-dy;}//obj.動作(x,-y);
				else {obj.x=-dx,obj.y=dy;}//obj.動作(-x,y);
				obj.動作.call(root,obj.x,obj.y);
			}, true);
		});
		return obj;
	};
	this["動作"]=(function(){});
	this["横の傾き"]=function(){return this.x};
	this["xの傾き"]=this["横の傾き"];
	this["xの傾き"]=this["横の傾き"];
	this["縦の傾き"]=function(){return this.y};
	this["yの傾き"]=this["縦の傾き"];
	this["yの傾き"]=this["縦の傾き"];

});*/

root.加速度センサ =root.Accelo;
root.傾きセンサ=root.加速度センサ;

root.コンパス = new (function(){
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


