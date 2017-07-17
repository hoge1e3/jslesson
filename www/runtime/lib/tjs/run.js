function run(className) {
    requirejs.config({
        shim: {
            Tonyu: {
                exports:"Tonyu"
            }
        },
        paths: {
          "Klass": window.runtimePath+"lib/Klass", 
          "assert": window.runtimePath+"lib/assert", 
          "DeferredUtil": window.runtimePath+"lib/DeferredUtil", 
          "Tonyu": window.runtimePath+"lib/tjs/TonyuLib",
          "Tonyu.Thread": window.runtimePath+"lib/tjs/TonyuThread",
          "Tonyu.Iterator": window.runtimePath+"lib/tjs/TonyuIterator",
          "kernel": window.runtimePath+"lib/tjs/kernel",
        }
    });
   requirejs(["Tonyu"], function () {
        requirejs(["kernel"],function (){
            requirejs(["user.js"],_run);
        });
   });
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
