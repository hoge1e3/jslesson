function run(className) {
    requirejs.config({
        shim: {
            Tonyu: {
                exports:"Tonyu"
            }
        },
        paths: {
          "Tonyu": window.runtimePath+"lib/tjs/TonyuLib",
          "Tonyu.Iterator": window.runtimePath+"lib/tjs/Iterator",
          "kernel": window.runtimePath+"lib/tjs/kernel",
        }
    });
   requirejs(["Tonyu","Tonyu.Iterator"], function () {
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
