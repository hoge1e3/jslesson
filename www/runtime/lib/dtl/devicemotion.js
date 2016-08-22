root.加速度センサ=root.create();
root.加速度センサ.x=0;
root.加速度センサ.y=0;
root.加速度センサ.動作=(function(){});
root.加速度センサ.initialize=function(){
	if (
		(window.navigator.userAgent.indexOf('iPhone') > 0 || 
		window.navigator.userAgent.indexOf('iPad') > 0 || 
		window.navigator.userAgent.indexOf('iPod') > 0 || 
		window.navigator.userAgent.indexOf('Android') > 0)==false){
		window.alert("タブレット、スマホ専用のオブジェクトです。この端末では動作しないことがあります");
		//return -1;
	}
	var self=this;
    try {
        self.calibrated=JSON.parse(localStorage.acceleratorCalibration);
        console.log(self.calibrated,window.orientation);
    }catch(e) {
        console.log(e);
        self.calibrated={f:false,x:1,y:1};
    }
	window.$(function(){
		window.addEventListener("devicemotion", function(evt){
			var x=((evt.accelerationIncludingGravity.x));
			var y=((evt.accelerationIncludingGravity.y));
			var c=self.getCalibratedXY({x:x,y:y},self.calibrated);
			self.x=c.x;self.y=c.y;
			/*if(window.orientation==0){
				self.y=y,self.x=x;
			}else if(window.orientation==180){
				self.y=-y,self.x=-x;
			}else if(window.orientation==90){
				self.y=x,self.x=-y;
			}else {
				self.y=-x,self.x=y;
			}*/
			self["動作"].execute(self.x,self.y);
		},true);
	});
};
root.加速度センサ.getCalibratedXY=function (raw,c) {
     if (c.f) {
         return {x:raw.y*c.y, y:raw.x*c.x};
     } else {
         return {y:raw.y*c.y, x:raw.x*c.x};
     }   
};
root.加速度センサ.calibrate=function () {
      location.href=(window.WebSite&&window.WebSite.runtime || window.runtimePath)+"/cal.html";
};
root.加速度センサ['調整']=root.加速度センサ.calibrate;
root.加速度センサ["横の傾き?"]=function(){return this.x};
root.加速度センサ["xの傾き?"]=root.加速度センサ["横の傾き?"];
root.加速度センサ["縦の傾き?"]=function(){return this.y};
root.加速度センサ["yの傾き?"]=root.加速度センサ["縦の傾き?"];

root.傾きセンサ=root.加速度センサ;


root.Compass=root.create();
root.Compass.direction=0;
root.Compass["動作"]=(function(){});
root.Compass.initialize=function(){
	if (
		(window.navigator.userAgent.indexOf('iPhone') > 0 || 
		window.navigator.userAgent.indexOf('iPad') > 0 || 
		window.navigator.userAgent.indexOf('iPod') > 0 || 
		window.navigator.userAgent.indexOf('Android') > 0)==false){
		window.alert("タブレット、スマホ専用のオブジェクトです。この端末では動作しないことがあります");
		//return -1;
	}
	var self=this;
	window.$(function(){
		window.ondeviceorientation=function(evt){
			self.direction=evt.webkitCompassHeading;
			self["動作"].execute(self.directioin);
		};
	});
};
root.Compass["方向?"]=function(){return this.direction;};
root.Compass["方角?"]=function(){
	var res;
	if(this.direction>315)res="北";
	else if(this.direction>225)res="西";
	else if(this.direction>135)res="南";
	else if(this.direction>45)res="東";
	else res="北";
	return res;
};
root["磁気センサ"]=root.Compass;
root["磁気センサー"]=root.Compass;
root["コンパス"]=root.Compass;
root["方位磁針"]=root.Compass;
root["方位磁石"]=root.Compass;

root.GPS=root.create();
root.GPS.latitude=0;
root.GPS.longitude=0;
root.GPS.gps=null;
root.GPS.initialize=function(){
	if (
		(window.navigator.userAgent.indexOf('iPhone') > 0 || 
		window.navigator.userAgent.indexOf('iPad') > 0 || 
		window.navigator.userAgent.indexOf('iPod') > 0 || 
		window.navigator.userAgent.indexOf('Android') > 0)==false){
		window.alert("タブレット、スマホ専用のオブジェクトです。この端末では動作しないことがあります");
		//return -1;
	}
	window.$(function(){
		this.gps=window.navigator.geolocation.getCurrentPosition(function(position){
			var latitude=position.coords.latitude;
			var longitude=position.coords.longitude;
			this.latitude=latitude;
			this.longitude=longitude;
			return position;
		}	,function(){window.alert("GPSの立ち上げに失敗しました。");return -1;});
	});
};
root.GPS["緯度?"]=function(){return this.latitude;};
root.GPS["経度?"]=function(){return this.longitude;};
root.GPS["今どこ?"]=function(){return this.latitude+"/n"+this.longitude;};

root.タッチセンサ=root.create();
root.タッチセンサ.x=0;
root.タッチセンサ.y=0;
root.タッチセンサ.touching=false;
root.タッチセンサ.touched=false;
root.タッチセンサ["動作"]=(function(){});
root.タッチセンサ.initialize=function(){
	if (
		(window.navigator.userAgent.indexOf('iPhone') > 0 || 
		window.navigator.userAgent.indexOf('iPad') > 0 || 
		window.navigator.userAgent.indexOf('iPod') > 0 || 
		window.navigator.userAgent.indexOf('Android') > 0)==false){
		window.alert("タブレット、スマホ専用のオブジェクトです。この端末では動作しないことがあります");
		//return -1;
	}
	var self=this;
	window.$(function(){
		window.document.addEventListener("touchstart", function(evt){
			var x=0,y=0;
			//var width=document.getElementById("canvas").width/2;
			//var height=document.getElementById("canvas").height/2;
			var width=window.$("#canvas").context.documentElement.clientWidth/2;
			var height=window.$("#canvas").context.documentElement.clientHeight/2;
			x=evt.touches[0].clientX;
			y=evt.touches[0].clientY;	
			self.x=x-width;
			self.y=height-y;
			self.touching=true;
			self.touched=true;
			if(evt.cancelable)e.preventDefault();
			self["動作"].execute(self.x,self.y);
	  }, true);
	});

	window.$(function(){
	  window.document.addEventListener("touchmove", function(evt){
			var x=0,y=0;
			//var width=document.getElementById("canvas").width/2;
			//var height=document.getElementById("canvas").height/2;
			var width=window.$("#canvas").context.documentElement.clientWidth/2;
			var height=window.$("#canvas").context.documentElement.clientHeight/2;
			x=evt.touches[0].clientX;
			y=evt.touches[0].clientY;
			self.x=x-width;
			self.y=height-y;
			if(evt.cancelable)e.preventDefault();
			self["動作"].execute(self.x,self.y);	
		}, true);
	});
	window.$(function(){
		window.document.addEventListener("touchend", function(evt){
			self.touching=false;
		}, true);
	});
	window.$(function(){
		window.document.addEventListener("touchcancel", function(evt){
			self.touching=false;
		}, true);
	});
};
root.タッチセンサ["タッチした?"]=function(){
	var res=this.touched;
	this.touched=false;
	return res;
};
root.タッチセンサ["触れた?"]=root.タッチセンサ["タッチした?"];
root.タッチセンサ["タッチしている?"]=function(){return this.touching;};
root.タッチセンサ["タッチしてる?"]=root.タッチセンサ["タッチしている?"];
root.タッチセンサ["触れている?"]=root.タッチセンサ["タッチしている?"];
root.タッチセンサ["触れてる?"]=root.タッチセンサ["タッチしている?"];
root.タッチセンサ["横の位置?"]=function(){return this.x;};
//root.タッチセンサ["xの位置?"]=root.タッチセンサ["横の位置?"];
//root.タッチセンサ["x座標?"]=root.タッチセンサ["横の位置?"];
root.タッチセンサ["縦の位置?"]=function(){return this.y;};
//root.タッチセンサ["yの位置?"]=root.タッチセンサ["縦の位置?"];
//root.タッチセンサ["y座標?"]=root.タッチセンサ["縦の位置?"];
root.タッチセンサー=root.タッチセンサ;

root.ジャイロセンサ=root.create();
root.ジャイロセンサ.x=0;
root.ジャイロセンサ.y=0;
root.ジャイロセンサ.z=0;
root.ジャイロセンサ["動作"]=(function(){});
root.ジャイロセンサ.initialize=function(){
	if (
		(window.navigator.userAgent.indexOf('iPhone') > 0 || 
		window.navigator.userAgent.indexOf('iPad') > 0 || 
		window.navigator.userAgent.indexOf('iPod') > 0 || 
		window.navigator.userAgent.indexOf('Android') > 0)==false){
		window.alert("タブレット、スマホ専用のオブジェクトです。この端末では動作しないことがあります");
		//return -1;
	}
	var self=this;
	window.$(function(){
		window.addEventListener("deviceorientation",function(evt){
			var x=evt.beta;
			var y=evt.gamma;
			var z=evt.alpha;
			self.x=x;
			self.y=y;
			self.z=z;
			self["動作"].execute(self.x,self.y,self.z);
		},true);
	});
};
root.ジャイロセンサ["回した角度?"]=function(){return this.z;};
root.ジャイロセンサ["z軸の角度?"]=root.ジャイロセンサ["回した角度?"];
root.ジャイロセンサ["縦の角度?"]=function(){return this.x;};
root.ジャイロセンサ["x軸の角度?"]=root.ジャイロセンサ["縦の角度?"];
root.ジャイロセンサ["横軸の角度?"]=root.ジャイロセンサ["縦の角度?"];
root.ジャイロセンサ["横の角度?"]=function(){return this.y;};
root.ジャイロセンサ["y軸の角度?"]=root.ジャイロセンサ["横の角度?"];
root.ジャイロセンサ["縦軸の角度?"]=root.ジャイロセンサ["横の角度?"];
root.ジャイロセンサー=root.ジャイロセンサ;

// from http://jsdo.it/hoge1e4/47Z2/
function startCalibration(onend) {
    var cve=$("<canvas>").css({
        position:"absolute",left:$(window).width()/2-100, top:$(window).height()/2-100}).appendTo("body");
    var inter;    
    // forked from hoge1e4's "傾きセンサーのキャリブレーション" http://jsdo.it/hoge1e4/E7fi
    function Accel() {
        var self=this;
        window.$(function(){
            window.addEventListener("devicemotion", function(evt){
                var x=((evt.accelerationIncludingGravity.x));
                var y=((evt.accelerationIncludingGravity.y));
                var raw={x:x,y:y};
                if (!self.calibrationMode) {
                    var p=self.getCalibratedXY(raw, Accel.calibrated);
                    self.action(p.x,p.y);
                } else {
                    var bestc,mind=100000;
                    self.calibrationList.forEach(function (c,i) {
                        var cxy=self.getCalibratedXY(raw,c);
                        var dir=Math.atan2(cxy.y,cxy.x);
                        //var dst={x:Math.cos( self.dstDir), y: Math.sin( self.dstDir) };
                        var dd=Math.abs(angleDiff(self.dstDir-dir));
                        c.dist=c.dist||0;
                        c.dist+=dd;
                    });
                    self.action(raw.x,raw.y);
                }
            },true);
        });
    }
    function dist(a,b) {
        return (a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y);
    }
    function angleDiff(d) {
        while (d>Math.PI) d-=Math.PI*2;
        while (d<-Math.PI) d+=Math.PI*2;
        return d;
    }
    var p=Accel.prototype;
    p.getCalibratedXY=function (raw,c) {
         if (c.f) {
             return {x:raw.y*c.y, y:raw.x*c.x};
         } else {
             return {y:raw.y*c.y, x:raw.x*c.x};
         }   
    };
    p.calibrationList=[
        {f:false,x:1, y:1},   
        {f:false,x:-1, y:1},   
        {f:false,x:1, y:-1},   
        {f:false,x:-1, y:-1},   
        {f:true,x:1, y:1},   
        {f:true,x:-1, y:1},   
        {f:true,x:1, y:-1},   
        {f:true,x:-1, y:-1}   
    ];
    
    Accel.calibrated={f:false, x:1, y:1};
    var a=new Accel;
    a.calibrationMode=true;
    a.dstDir=0;
    var cnt=0;
    a.action=function (x,y) {
        var cv= cve[0].getContext("2d");
        cv.fillStyle="white";
        cv.fillRect(0,0,200,200);
        cv.fillStyle="red";
        if (cnt<4) {
            cv.font="12px monospace";
            cv.fillText("矢印の方向に傾けてください",20,50);
            cv.font="30px monospace";
            cv.fillText("→↓←↑"[cnt],100,100);//100+Math.cos(a.dstDir)*80,100+Math.sin(a.dstDir)*80,10,10);
        }
        if (cnt==4) {
            var min=10000000;
            a.calibrationList.forEach(function (c,i) {
                c.dist=c.dist||0;
                //console.log(c);
                if (c.dist<min) { Accel.calibrated=c; min=c.dist;}
            });
            localStorage.acceleratorCalibration=JSON.stringify( Accel.calibrated);
             a.calibrationMode=false; 
            onend( Accel.calibrated);
        }
        if (cnt>=4) {
            cv.fillStyle="black";
            cv.fillText("調整完了",20,50);
            cv.fillRect(100+x*30,100+y*30,10,10);
            clearInterval(inter);
        }
        cv.fillStyle="red";
    };
    inter=setInterval(function () {
         cnt++;   
        a.dstDir+=Math.PI/2;
    },3000);
}
