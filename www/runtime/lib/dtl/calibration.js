function startCalibration(onend) {
    var W=200,H=200;
    var XYZ=["x","y","z"],ABG=["alpha","beta","gamma"],RPY=["roll","pitch","yaw"];
    var cve=$("<canvas>").attr({width:W,height:H}).css({
        position:"absolute",
        left:$(window).width()/2-W/2, 
        top:$(window).height()/2-H/2
    }).appendTo("body");
    var timer;
    function Sensor() {
        this.addEventListener();
    }
    var p=Sensor.prototype;
    p.addEventListener=function () {
        this._hnd=this.handler.bind(this);
        window.addEventListener(this.eventType, this._hnd ,true);
    };
    p.removeEventListener=function () {
        window.removeEventListener(this.eventType, this._hnd ,true);
    };
    p.getParamObj=function (evt) {
        return evt;
    };
    p.normalize=function (v) {return v;};
    p.handler=function(evt){
        var self=this;
        self.raw={};
        self.rawKeys.forEach(function (k) {
            self.raw[k]=self.getParamObj(evt)[k];
        });
        self.setCalibratedXY();
        self.action();
    };
    p.action=function (){};
    //--------- copy to devmotion ---------
    p.setCalibratedXY=function () {
        var self=this;
        if (!self.calibration) self.initCalibration();
        self.calibrated={};
        self.calibratedKeys.forEach(function (k) {
            var c=self.calibration[k];
            self.calibrated[k]=self.normalize(self.raw[c.rawkey]*c.sgn);
        });
    };
    p.initCalibration=function () {
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
    };
    //--------- copy to devmotion end---------
    p.saveCalibration=function () {
        var self=this;
        localStorage[self.lsKey]=JSON.stringify(self.calibration);
    };
    p.setHome=function () {
        var self=this;
        if (!self.raw) return;
        self.home={};
        self.rawKeys.forEach(function (k) {
            self.home[k]=self.raw[k];
        });
        console.log("HOME",self.home);
    };
    p.doCalibration=function (calibratedKey,sgn) {
        var self=this;
        var c=this.calibrationFromDirection(calibratedKey,sgn);
        if (!c) return;
        if (!self.calibration) self.initCalibration();
        self.calibration[calibratedKey]=c;  
    };
    p.verifyCalibration=function (calibratedKey,sgn) {
        var self=this;
        var c=this.calibrationFromDirection(calibratedKey,sgn);
        if (!c) return true;
        if (!self.calibration) self.initCalibration();
        var cc=self.calibration[calibratedKey];
        if (!cc) return false;
        return (cc.rawkey==c.rawkey && cc.sgn==c.sgn);  
    };
    p.calibrationFromDirection=function (calibratedKey,csgn) {
        var self=this;
        if (!self.raw) return;
        if (!self.home) return;
        var maxdif,maxsgn,maxk;
        self.rawKeys.forEach(function (k) {
            var d=self.normalize(self.raw[k]-self.home[k]);
            console.log(k,self.raw[k],self.home[k], d);
            var dif,sgn;
            if (d>0) {dif=d;sgn=1;} 
            else {dif=-d;sgn=-1;}
            if (!maxdif || dif>maxdif) {
                maxdif=dif;
                maxsgn=sgn;
                maxk=k;
            }
        });
        console.log("MAX",maxk,maxsgn);
        return {rawkey:maxk,sgn:maxsgn*csgn};
    };
    
    function Accel() {
        this.addEventListener();
    }
    p=Accel.prototype=new Sensor();
    p.getParamObj=function (evt) {
        return evt.accelerationIncludingGravity;
    };
    //--------- copy to devmotion---------
    p.lsKey="accelCalibration";
    p.rawKeys=XYZ;
    p.calibratedKeys=XYZ;
    p.eventType="devicemotion";
    //--------- copy to devmotion end---------
    function Gyro() {
        this.addEventListener();
    }
    p=Gyro.prototype=new Sensor();
    p.normalize=function (k) {
        while(k<0) k+=360;
        k=k%360;
        return k>=180 ? k-360 : k;
    };
    //--------- copy to devmotion---------
    p.lsKey="gyroCalibration";
    p.rawKeys=ABG;
    p.calibratedKeys=RPY;
    p.eventType="deviceorientation";
    //--------- copy to devmotion end---------

    var a=new Accel();
    var g=new Gyro();
    var cnt=0,state=0,inter=50;
    var rollBase=0, pitchBase=0;
    setInterval(function () {
        var cv= cve[0].getContext("2d");
        cv.fillStyle="white";
        cv.fillRect(0,0,200,200);
        cv.fillStyle="black";
        switch(state) {
        case 0:
            mesg("端末を水平にしてください");
            cnt+=inter;if(cnt>3000) {
                a.setHome();g.setHome();
                state++;cnt=0;
                console.log("Z", a.raw);
            }
            break;
        case 1:
            mesg("右に軽く傾けてください");
            arrow("→");
            cnt+=inter;if(cnt>3000) {
                a.doCalibration("x",1);
                g.doCalibration("roll",1);
                state=4;cnt=0;
            };
            break;
        case 2:case 4:case 6:case 8:case 10:
            mesg("元の姿勢に戻してください");
            cnt+=inter;if(cnt>3000) {
                a.setHome();g.setHome();
                state++;cnt=0;
            }
            break;
        case 3:
            mesg("矢印方向に傾けてください");
            arrow("←");
            cnt+=inter;if(cnt>3000) {
                if (a.verifyCalibration("x",-1) && g.verifyCalibration("roll",-1)) {
                    state++;
                } else {
                    state=0;
                }
                cnt=0;
            };
            break;
        case 5:
            mesg("手前に軽く傾けてください");
            arrow("↓");
            cnt+=inter;if(cnt>3000) {
                a.doCalibration("y",1);
                g.doCalibration("pitch",1);
                state=8;cnt=0;
            };
            break;
        case 7:
            mesg("矢印方向に傾けてください");
            arrow("↑");
            cnt+=inter;if(cnt>3000) {
                if (a.verifyCalibration("y",-1) && g.verifyCalibration("pitch",-1)) {
                    state++;
                } else state=4;
                cnt=0;
            };
            break;
        case 9:
            mesg("水平にしたまま、右に30度くらい回転させてください");
            arrow("↻");
            cnt+=inter;if(cnt>3000) {
                g.doCalibration("yaw",1);
                state++;cnt=0;
            };
            break;
        case 11:
            console.log("A",a.calibration);
            console.log("G",g.calibration);
            var gc=g.calibrated;
            console.log("G",g.calibrated);
            if (gc) {
                rollBase=gc.roll;
                pitchBase=gc.pitch;
            }
            a.saveCalibration();
            g.saveCalibration();
            console.log(rollBase,pitchBase);
            state++;
            cnt=0;
            break;
        case 12:
            mesg("調整完了");
            var ac=a.calibrated;
            if (ac) {
                cv.fillStyle="red";
                cv.fillRect(W/2+ac.x*W/4,H/2+ac.y*H/4,10,10);
            }
            var gc=g.calibrated;
            if (gc) {
                cv.fillStyle="green";
                cv.strokeStyle="green";
                cv.fillRect(W/2+g.normalize(gc.roll-rollBase)/180*(W/2), 
                H/2+g.normalize(gc.pitch-pitchBase)/180*(H/2),10,10);
                cv.beginPath();
                cv.moveTo(W/2+Math.cos(-rad(gc.yaw))*W/2, H/2+Math.sin(-rad(gc.yaw))*H/2 );
                cv.lineTo(W/2-Math.cos(-rad(gc.yaw))*W/2, H/2-Math.sin(-rad(gc.yaw))*H/2 );
                cv.stroke();
                //console.log(gc.pitch,pitchBase);
            }
            cnt+=inter;
            if (cnt>3000) {
                if (onend) onend();
                cve.remove();
                a.removeEventListener();
                g.removeEventListener();
                state++;
            }
            break;
        }
        function rad(d) {
            return d/180*Math.PI;
        }
        function mesg(s) {
            cv.font="12px monospace";
            cv.fillText(s,0,50);
        }
        function arrow(a) {
            cv.font="30px monospace";
            cv.fillText(a,W/2,H/2);
        }
    },inter);
   
}