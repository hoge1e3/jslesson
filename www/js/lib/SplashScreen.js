window.SplashScreen=window.SplashScreen||(function () {
    var s=$("<img>").css({position:"absolute",
            left: 100, top:100, fontSize: 30, //background: "white",
            zIndex:1000,transform:"scale(0.5,0.5)"
        }).attr({src:"images/bitarrow-3_360.png"});
    var SS={};
    SS.show=function (mesg) {
    	if (!s) return;
        //s.text(mesg||"Please wait...");
    	//if (SS.state) return;
    	SS.state=true;
    	console.log("Show");
    	s.appendTo("body");
        var top=$(window).height()/2-s.height()/2;
        var left=$(window).width()/2-s.width()/2;
        SS.x=10;
        s.css("left",SS.x);
        s.css("top",top);
    };
    var cnt=0;
    setTimeout(animation,100);
    function animation() {
        var top=$(window).height()/2-s.height()/2;
        var left=$(window).width()/2-s.width()/2;
        if (SS.state=="away") {
            SS.x+=100;
            if (SS.x+s.width()/2>=$(window).width()) {
                s.remove();
                SS.state=false;
            } else {
                s.css("left",SS.x);
            }       
        } else if (SS.state===true) {
            //s.text("Please wait"+(cnt%2==0?"...":""));
            cnt+=0.5;
            s.css("left",SS.x);
            s.css("top",top+Math.sin(cnt)*10);
            if (SS.x<left) SS.x+=100;
        }
        setTimeout(animation,100);
        SS.lastAnimated=new Date().getTime();
    }
    SS.lastAnimated=0;
    SS.waitIfBusy=function (r) {
        if (SS.busyTime()>90) {
            var d=new $.Deferred;
            setTimeout(function () {d.resolve(r)},0);
            return d.promise();
        }  
        return r;
    };
    SS.busyTime=function () {
        return new Date().getTime()-SS.lastAnimated;
    }
    SS.progress=function (me) {
        //s.text(me||"Please wait...");
        //SS.show(me);
    };
    SS.hide=function () {
    	if (SS.state===false) return;
    	console.log("Hide");
    	s.remove();
    	SS.state="away";
    };
    return SS;
})();