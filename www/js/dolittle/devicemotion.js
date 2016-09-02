var XYZ=["x","y","z"],ABG=["alpha","beta","gamma"],RPY=["roll","pitch","yaw"];
var Calibratable={
    setCalibrated:function () {
        var self=this;
        if (!self.calibration) self.initCalibration();
        self.calibrated={};
        self.calibratedKeys.forEach(function (k) {
            var c=self.calibration[k];
            self.calibrated[k]=self.normalize(self.raw[c.rawkey]*c.sgn);
        });
    },
    normalize:function (x){return x;},
    initCalibration:function () {
        var self=this;
        try {
            self.calibration=JSON.parse(localStorage[self.lsKey]);
            self.calibratedKeys.forEach(function (k,i) {
                var c=self.calibration[k];
                if (typeof c.rawkey==="string" &&
                    typeof c.sgn==="number") {
                } else {
                    throw "Invalid data";
                }
            });
        } catch (e) {
            self.calibration={};
            self.rawKeys.forEach(function (k,i) {
                self.calibration[self.calibratedKeys[i]]={rawkey:k,sgn:1};
            });        
        }
        console.log("Calload", self.calibration);
    },
    calibrate:function () {
        var self=this;
        startCalibration(function () {
            root.加速度センサ.initCalibration();
            root.gyroSensor.initCalibration();
        });
    }
};

root.加速度センサ=root.create();
root.加速度センサ.x=0;
root.加速度センサ.y=0;
root.加速度センサ.z=0;
root.加速度センサ.initialize=function(){
	var self=this;
    /*try {
        self.calibrated=JSON.parse(localStorage.acceleratorCalibration);
        console.log(self.calibrated,window.orientation);
    }catch(e) {
        console.log(e);
        self.calibrated={f:false,x:1,y:1};
    }*/
	window.$(function(){
		window.addEventListener("devicemotion", function(evt){
			var x=((evt.accelerationIncludingGravity.x) || 0);
			var y=((evt.accelerationIncludingGravity.y) || 0);
			var z=((evt.accelerationIncludingGravity.z) || 0);
			self.raw={x:x,y:y,z:z};
			self.setCalibrated();
			//var c=self.getCalibratedXY({x:x,y:y},self.calibrated);
			var c=self.calibrated;
			self.x=c.x;self.y=-c.y;
			self.z=z;

		},true);
	});
};
root.加速度センサ.使う=function(){
	var self=this;
    /*try {
        self.calibrated=JSON.parse(localStorage.acceleratorCalibration);
        console.log(self.calibrated,window.orientation);
    }catch(e) {
        console.log(e);
        self.calibrated={f:false,x:1,y:1};
    }*/
	window.$(function(){
		window.addEventListener("devicemotion", function(evt){
			var x=((evt.accelerationIncludingGravity.x) || 0);
			var y=((evt.accelerationIncludingGravity.y) || 0);
			var z=((evt.accelerationIncludingGravity.z) || 0);
			self.raw={x:x,y:y,z:z};
			self.setCalibrated();
			//var c=self.getCalibratedXY({x:x,y:y},self.calibrated);
			var c=self.calibrated;
			self.x=c.x;self.y=-c.y;
			self.z=z;

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
root.加速度センサ.calibrate=Calibratable.calibrate;/*function () {
    var self=this;
    startCalibration(function () {
        root.加速度センサ.initCalibration();
        root.gyroSensor.initCalibration();
    });
};*/
root.加速度センサ['調整']=root.加速度センサ.calibrate;
root.加速度センサ["左右の加速度?"]=function(){return this.x};
root.加速度センサ["前後の加速度?"]=function(){return -this.y};
root.加速度センサ["上下の加速度?"]=function(){return this.z};
root.加速度センサ.lsKey="accelCalibration";
root.加速度センサ.setCalibrated=Calibratable.setCalibrated;
root.加速度センサ.initCalibration=Calibratable.initCalibration;
root.加速度センサ.normalize=Calibratable.normalize;
root.加速度センサ.rawKeys=XYZ;
root.加速度センサ.calibratedKeys=XYZ;
root.加速度センサ.eventType="devicemotion";

root.加速度センサー=root.加速度センサ;

root.Compass=root.create();
root.Compass.direction=0;
root.Compass.initialize=function(){
	var self=this;
	window.$(function(){
		window.ondeviceorientation=function(evt){
			self.direction=(evt.webkitCompassHeading || 0);
		};
	});
};

root.Compass.使う=function(){
	var self=this;
	window.$(function(){
		window.ondeviceorientation=function(evt){
			self.direction=(evt.webkitCompassHeading || 0);
		};
	});
};

root.Compass["方向?"]=function(){return this.direction;};
root["磁気センサ"]=root.Compass;
root["磁気センサー"]=root.Compass;
root["コンパス"]=root.Compass;

root.GPS=root.create();
root.GPS.latitude=0;
root.GPS.longitude=0;
root.GPS.gps=null;
root.GPS.initialize=function(){
	window.$(function(){
		this.gps=window.navigator.geolocation.getCurrentPosition(function(position){
			var latitude=position.coords.latitude;
			var longitude=position.coords.longitude;
			this.latitude=latitude || 0;
			this.longitude=longitude || 0;
			return position;
		}	,function(){window.alert("GPSの立ち上げに失敗しました。");return -1;});
	});
};

root.GPS.使う=function(){
	window.$(function(){
		this.gps=window.navigator.geolocation.getCurrentPosition(function(position){
			var latitude=position.coords.latitude;
			var longitude=position.coords.longitude;
			this.latitude=latitude || 0;
			this.longitude=longitude || 0;
			return position;
		}	,function(){window.alert("GPSの立ち上げに失敗しました。");return -1;});
	});
};

root.GPS["緯度?"]=function(){return this.latitude;};
root.GPS["経度?"]=function(){return this.longitude;};

root.タッチセンサ=root.create();
root.タッチセンサ.x=0;
root.タッチセンサ.y=0;
root.タッチセンサ.touching=false;
root.タッチセンサ.touched=false;
root.タッチセンサ["動作"]=(function(){});
root.タッチセンサ.initialize=function(){

	var self=this;
	window.$(function(){
		window.document.addEventListener("touchstart", function(evt){
			var x=0,y=0;
			var width=window.$("#canvas").context.documentElement.clientWidth/2;
			var height=window.$("#canvas").context.documentElement.clientHeight/2;
			x=(evt.touches[0].clientX) || 0;
			y=(evt.touches[0].clientY) || 0;	
			self.x=x-width;
			self.y=height-y;
			self["動作"].execute(self.x,self.y);
			self.touching=true;
			self.touched=true;
	  }, true);
	});

	window.$(function(){
	  window.document.addEventListener("touchmove", function(evt){
			var x=0,y=0;
			var width=(window.$("#canvas").context.documentElement.clientWidth/2) || 0;
			var height=(window.$("#canvas").context.documentElement.clientHeight/2) || 0;
			x=evt.touches[0].clientX;
			y=evt.touches[0].clientY;
			self.x=x-width;
			self.y=height-y;
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

root.タッチセンサ.使う=function(){
	var self=this;
	window.$(function(){
		window.document.addEventListener("touchstart", function(evt){
			var x=0,y=0;
			var width=window.$("#canvas").context.documentElement.clientWidth/2;
			var height=window.$("#canvas").context.documentElement.clientHeight/2;
			x=(evt.touches[0].clientX) || 0;
			y=(evt.touches[0].clientY) || 0;	
			self.x=x-width;
			self.y=height-y;
			self["動作"].execute(self.x,self.y);
			self.touching=true;
			self.touched=true;
	  }, true);
	});

	window.$(function(){
	  window.document.addEventListener("touchmove", function(evt){
			var x=0,y=0;
			var width=(window.$("#canvas").context.documentElement.clientWidth/2) || 0;
			var height=(window.$("#canvas").context.documentElement.clientHeight/2) || 0;
			x=evt.touches[0].clientX;
			y=evt.touches[0].clientY;
			self.x=x-width;
			self.y=height-y;
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
root.タッチセンサ["縦の位置?"]=function(){return this.y;};
root.タッチセンサー=root.タッチセンサ;

root.gyroSensor=root.create();
root.gyroSensor.x=0;
root.gyroSensor.y=0;
root.gyroSensor.z=0;
root.gyroSensor.initialize=function(){
	this.x=0;
	this.y=0;
	this.z=0;
	var self=this;
	window.$(function(){
		window.addEventListener("deviceorientation",function(evt){
			var x=evt.beta || 0;
			var y=evt.gamma || 0;
			var z=evt.alpha || 0;
			self.raw={alpha:z,beta:x,gamma:y};
			self.setCalibrated();
			self.x=self.calibrated.roll;
			self.y=-self.calibrated.pitch;
			self.z=self.calibrated.yaw;
		},true);
	});
};

root.gyroSensor.使う=function(){
	this.x=0;
	this.y=0;
	this.z=0;
	var self=this;
	window.$(function(){
		window.addEventListener("deviceorientation",function(evt){
			var x=evt.beta || 0;
			var y=evt.gamma || 0;
			var z=evt.alpha || 0;
			self.raw={alpha:z,beta:x,gamma:y};
			self.setCalibrated();
			self.x=self.calibrated.roll;
			self.y=-self.calibrated.pitch;
			self.z=self.calibrated.yaw;
		},true);
	});

};

root.gyroSensor.getYaw=function(){return this.z;};
root.gyroSensor["ヨー?"]=root.gyroSensor.getYaw;
root.gyroSensor["水平方向の傾き?"]=root.gyroSensor.getYaw;
root.gyroSensor["水平の傾き?"]=root.gyroSensor.getYaw;
root.gyroSensor.getRoll=function(){return this.x;};
root.gyroSensor["ロール?"]=root.gyroSensor.getRoll;
root.gyroSensor["左右方向の傾き?"]=root.gyroSensor.getRoll;
root.gyroSensor["左右の傾き?"]=root.gyroSensor.getRoll;
root.gyroSensor.getPitch=function(){return this.y;};
root.gyroSensor["ピッチ?"]=root.gyroSensor.getPitch;
root.gyroSensor["前後方向の傾き?"]=root.gyroSensor.getPitch;
root.gyroSensor["前後の傾き?"]=root.gyroSensor.getPitch;

root.gyroSensor.calibrate=Calibratable.calibrate;
root.gyroSensor['調整']=root.gyroSensor.calibrate;
root.gyroSensor.setCalibrated=Calibratable.setCalibrated;
root.gyroSensor.initCalibration=Calibratable.initCalibration;
root.gyroSensor.normalize=function (k) {
    while(k<0) k+=360;
    k=k%360;
    return k>=180 ? k-360 : k;
};
root.gyroSensor.lsKey="gyroCalibration";
root.gyroSensor.rawKeys=ABG;
root.gyroSensor.calibratedKeys=RPY;
root.gyroSensor.eventType="deviceorientation";

root.ジャイロセンサ=root.gyroSensor;
root.ジャイロセンサー=root.gyroSensor;

// from http://jsdo.it/hoge1e4/47Z2/
function startCalibrationOLD(onend) {
    var cve=$("<canvas>").attr({width:200,height:200}).css({
        position:"absolute",left:$(window).width()/2-100, top:$(window).height()/2-100}).appendTo("body");
    var timer;
    // forked from hoge1e4's "傾きセンサーのキャリブレーション" http://jsdo.it/hoge1e4/E7fi
    var hnd;
    function Accel() {
        var self=this;
        this.handler=function(evt){
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
        };
        hnd=this.handler;
        window.addEventListener("devicemotion", this.handler,true);
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
        }
        if (cnt==5) {
            cve.remove();
            console.log("SAME",hnd,a.handler);
            cnt=6;
            window.removeEventListener("devicemotion",hnd);
            clearInterval(timer);
            onend( Accel.calibrated);            
        }
        if (cnt>=4) {
            cv.fillStyle="black";
            cv.fillText("調整完了",20,50);
            cv.fillRect(100+x*30,100+y*30,10,10);
        }
        cv.fillStyle="red";
    };
    timer=setInterval(function () {
         cnt++;   
        a.dstDir+=Math.PI/2;
    },3000);
}
