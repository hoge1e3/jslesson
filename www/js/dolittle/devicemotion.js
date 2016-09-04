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
            root.accelerationSensor.initCalibration();
            root.gyroSensor.initCalibration();
        });
    }
};

root.accelerationSensor=root.create();
root.accelerationSensor.x=0;
root.accelerationSensor.y=0;
root.accelerationSensor.z=0;
root.accelerationSensor.action=(function(){});
root.accelerationSensor.initialized=false;
root.accelerationSensor.initialize=function(){
	this.init();
};
root.accelerationSensor.use=function(){
	this.init();
	return this;
};
root.accelerationSensor.init=function(){
	if(this.initialized)return this;
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
			self.action.execute(self.x,self.y,self.z);
		},true);
		this.initialized=true;
		return this;
	});
};


root.accelerationSensor.getCalibratedXY=function (raw,c) {
     if (c.f) {
         return {x:raw.y*c.y, y:raw.x*c.x};
     } else {
         return {y:raw.y*c.y, x:raw.x*c.x};
     }   
};
root.accelerationSensor.calibrate=Calibratable.calibrate;/*function () {
    var self=this;
    startCalibration(function () {
        root.accelerationSensor.initCalibration();
        root.gyroSensor.initCalibration();
    });
};*/
root.accelerationSensor.getXAcceleration=function(){
	if(this.initialized==false)this.init();
	return this.x
};
root.accelerationSensor.getYAcceleration=function(){
	if(this.initialized==false)this.init();
	return -this.y
};
root.accelerationSensor.getZAcceleration=function(){
	if(this.initialized==false)this.init();
	return this.z
};
root.accelerationSensor.setAction=function(f){
	if(this.initialized==false)this.init();
	if((typeof f)!="function")return this;
	this.action=f;
	return this;
};

root.accelerationSensor.lsKey="accelCalibration";
root.accelerationSensor.setCalibrated=Calibratable.setCalibrated;
root.accelerationSensor.initCalibration=Calibratable.initCalibration;
root.accelerationSensor.normalize=Calibratable.normalize;
root.accelerationSensor.rawKeys=XYZ;
root.accelerationSensor.calibratedKeys=XYZ;
root.accelerationSensor.eventType="devicemotion";

root.accelerationSensor["動作設定"]=root.accelerationSensor.setAction;
root.accelerationSensor["使う"]=root.accelerationSensor.use;
root.accelerationSensor['調整']=root.accelerationSensor.calibrate;
root.accelerationSensor["左右の加速度?"]=root.accelerationSensor.getXAcceleration;
root.accelerationSensor["前後の加速度?"]=root.accelerationSensor.getYAcceleration;
root.accelerationSensor["上下の加速度?"]=root.accelerationSensor.getZAcceleration;
root.加速度センサ=root.accelerationSensor;
root.加速度センサー=root.加速度センサ;

root.compass=root.create();
root.compass.direction=0;
root.compass.action=(function(){});
root.compass.initialized=false;
root.compass.initialize=function(){
	this.init();
};

root.compass.use=function(){
	this.init();
	return this;
};
root.compass.init=function(){
	if(this.initialized)return this;
	var self=this;
	window.$(function(){
		window.ondeviceorientation=function(evt){
			self.direction=(evt.webkitCompassHeading || 0);
			self.action.execute(self.direction);
		};
	});
	this.initialized=true;
	return this;
};

root.compass.getDirection=function(){
	if(this.initialized==false)this.init();
	return this.direction;
};
root.compass.setAction=function(f){
	if(this.initialized==false)this.init();
	if((typeof f)!="function")return this;
	this.action=f;
	return this;
};

root.compass["動作設定"]=root.compass.setAction;
root.compass["使う"]=root.compass.getDirection;
root.compass["向き?"]=root.compass.getDirection;
root.compass["方向?"]=root.compass.getDirection;
root["磁気センサ"]=root.compass;
root["磁気センサー"]=root.compass;
root["コンパス"]=root.compass;

root.GPS=root.create();
root.GPS.latitude=0;
root.GPS.longitude=0;
root.GPS.gps=null;
root.GPS.initialized=false;
root.GPS.initialize=function(){
	this.init();
};

root.GPS.use=function(){
	this.init();
	return this;
};
root.GPS.init=function(){
	if(this.initialized)return this;
	window.$(function(){
		this.gps=window.navigator.geolocation.getCurrentPosition(function(position){
			var latitude=position.coords.latitude;
			var longitude=position.coords.longitude;
			this.latitude=latitude || 0;
			this.longitude=longitude || 0;
			return position;
		}	,function(){window.alert("GPSの立ち上げに失敗しました。");return -1;});
	});
	this.initialized=true;
	return this;
};

root.GPS.getLatitude=function(){
	if(this.initialized==false)this.init();
	return this.latitude;
};
root.GPS.getLongitude=function(){
	if(this.initialized==false)this.init();
	return this.longitude;
};
root.GPS["使う"]=root.GPS.use;
root.GPS["緯度?"]=root.GPS.getLatitude;
root.GPS["経度?"]=root.GPS.getLongitude;


root.touchSensor=root.create();
root.touchSensor.x=0;
root.touchSensor.y=0;
root.touchSensor.touching=false;
root.touchSensor.touched=false;
root.touchSensor.action=(function(){});
root.touchSensor.initialized=false;
root.touchSensor.action=(function(){});
root.touchSensor.initialize=function(){
	this.init();
};
root.touchSensor.use=function(){
	this.init();
	return this;
};
root.touchSensor.init=function(){
	if(this.initialized)return this;
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
			self.action.execute(self.x,self.y);
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
	this.initialized=true;
	return this;
};

root.touchSensor.getTouched=function(){
	if(this.initialized==false)this.init();
	var res=this.touched;
	this.touched=false;
	return res;
};
root.touchSensor.getTouching=function(){
	if(this.initialized==false)this.init();
	return this.touching;
};

root.touchSensor.getX=function(){
	if(this.initialized==false)this.init();
	return this.x;
};
root.touchSensor.getY=function(){
	if(this.initialized==false)this.init();
	return this.y;
};
root.touchSensor.setAction=function(f){
	if(this.initialized==false)this.init();
	if((typeof f)!="function")return this;
	root.touchSensor.action=f;
	return this;
};
root.touchSensor["動作設定"]=root.touchSensor.setAction;
root.touchSensor["使う"]=root.touchSensor.use;
root.touchSensor["タッチした?"]=root.touchSensor.getTouched;
root.touchSensor["触れた?"]=root.touchSensor.getTouched;
root.touchSensor["タッチしている?"]=root.touchSensor.getTouching;
root.touchSensor["タッチしてる?"]=root.touchSensor.getTouching;
root.touchSensor["触れている?"]=root.touchSensor.getTouching;
root.touchSensor["触れてる?"]=root.touchSensor.getTouching;
root.touchSensor["横の位置?"]=root.touchSensor.getX;
root.touchSensor["縦の位置?"]=root.touchSensor.getY;
root["タッチセンサ"]=root.touchSensor;
root["タッチセンサー"]=root.touchSensor;

root.gyroSensor=root.create();
root.gyroSensor.x=0;
root.gyroSensor.y=0;
root.gyroSensor.z=0;
root.gyroSensor.action=(function(){});
root.gyroSensor.initialized=false;
root.gyroSensor.initialize=function(){
	this.init();
};
root.gyroSensor.use=function(){
	this.init();
	return this;
};
root.gyroSensor.init=function(){
	if(this.initialized)return this;
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
			self.action.execute(self.x,self.y,self.z);
		},true);
	});
	this.initialized=true;
	return this;
};

root.gyroSensor.getYaw=function(){
	if(this.initialized==false)this.init();
	return this.z;
};
root.gyroSensor.getRoll=function(){
	if(this.initialized==false)this.init();
	return this.x;
};
root.gyroSensor.getPitch=function(){
	if(this.initialized==false)this.init();
	return this.y;
};
root.gyroSensor.setAction=function(f){
	if(this.initialized==false)this.init();
	if((typeof f)!="function")return this;
	this.action=f;
	return this;
};

root.gyroSensor.calibrate=Calibratable.calibrate;
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

root.gyroSensor["動作設定"]=root.gyroSensor.setAction;
root.gyroSensor["ヨー?"]=root.gyroSensor.getYaw;
root.gyroSensor["水平方向の傾き?"]=root.gyroSensor.getYaw;
root.gyroSensor["水平の傾き?"]=root.gyroSensor.getYaw;
root.gyroSensor["ロール?"]=root.gyroSensor.getRoll;
root.gyroSensor["左右方向の傾き?"]=root.gyroSensor.getRoll;
root.gyroSensor["左右の傾き?"]=root.gyroSensor.getRoll;
root.gyroSensor["ピッチ?"]=root.gyroSensor.getPitch;
root.gyroSensor["前後方向の傾き?"]=root.gyroSensor.getPitch;
root.gyroSensor["前後の傾き?"]=root.gyroSensor.getPitch;
root.gyroSensor['調整']=root.gyroSensor.calibrate;
root.gyroSensor["使う"]=root.gyroSensor.use;
root["ジャイロセンサ"]=root.gyroSensor;
root["ジャイロセンサー"]=root.gyroSensor;

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
