function run(className) {
    var R=window.BitArrow ? window.BitArrow.runtimePath : window.runtimePath;
    requirejs.config({
        shim: {
            Tonyu: {
                exports:"Tonyu"
            },
            kernel: {
                deps:["Tonyu"]
            },
            "user.js": {
                deps:["kernel"]
            }
        },
        paths: {
          "Klass": R+"lib/Klass",
          "assert": R+"lib/assert",
          "FS": R+"lib/FS",
          "DeferredUtil": R+"lib/DeferredUtil",
          "Tonyu": R+"lib/tjs/TonyuLib",
          "Tonyu.Thread": R+"lib/tjs/TonyuThread",
          "Tonyu.Iterator": R+"lib/tjs/TonyuIterator",
          "kernel": R+"lib/tjs/kernel",
      },
      urlArgs: requirejs.version=="2.1.9"? "": function (id,url) {
            //console.log("URLARGS",id,url);
            if (url.match(/^http/)) {
                try {
                    return (url.indexOf("?")<0?"?":"&")+BitArrow.urlArgs;
                } catch (e) {
                    //console.log("URLARGS err",e.stack);
                    return "";
                }
            } else {
                return (url.indexOf("?")<0?"?":"&")+Math.random();
            }
       }
    });
    requirejs(["user.js"],_run);
   function _run() {
        var bootClass=Tonyu.getClass(className);
        if (!bootClass) throw TError( klass+" というクラスはありません", "不明" ,0);
        Tonyu.runMode=true;
        var boot=new bootClass();
        var th=Tonyu.thread();
        th.apply(boot,"main");
        $LASTPOS=0;
        if (typeof SplashScreen!="undefined") SplashScreen.hide();
        function runThread() {
            th.steps();
            if (th.preempted) {
                setTimeout(runThread,0);
            }
        }
        runThread();
        if (window.curTh) window.curTh.kill();
        window.curTh=th;
	    return th;
   }
}
