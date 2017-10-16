function run(className) {
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
          "Klass": window.runtimePath+"lib/Klass",
          "assert": window.runtimePath+"lib/assert",
          "FS": window.runtimePath+"lib/FS",
          "DeferredUtil": window.runtimePath+"lib/DeferredUtil",
          "Tonyu": window.runtimePath+"lib/tjs/TonyuLib",
          "Tonyu.Thread": window.runtimePath+"lib/tjs/TonyuThread",
          "Tonyu.Iterator": window.runtimePath+"lib/tjs/TonyuIterator",
          "kernel": window.runtimePath+"lib/tjs/kernel",
      },
      urlArgs: requirejs.version=="2.1.9"? "": function (id,url) {
            //console.log("URLARGS",id,url);
            if (url.match(/^http/)) {
                try {
                    if (window.opener===window) {
                        return "";
                    }
                    return window.opener.requirejs.s.contexts._.config.urlArgs(id,url);
                } catch (e) {
                    //console.log("URLARGS err",e.stack);
                    return "";
                }
            } else {
                return (url.indexOf("?")<0?"?":"&")+Math.random();
            }
       }
    });
   //requirejs(["Tonyu"], function () {
   //     requirejs(["kernel"],function (){
            requirejs(["user.js"],_run);
   //     });
   //});
   function _run() {
        var bootClass=Tonyu.getClass(className);
        if (!bootClass) throw TError( klass+" というクラスはありません", "不明" ,0);
        Tonyu.runMode=true;
        var boot=new bootClass();
        var th=Tonyu.thread();
        th.apply(boot,"main");
        $LASTPOS=0;
        if (typeof SplashScreen!="undefined") SplashScreen.hide();
        th.steps();
        if (window.curTh) window.curTh.kill();
        window.curTh=th;
	    return th;
   }
}
