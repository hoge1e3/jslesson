requirejs.config({
    paths: {
      "lib": window.runtimePath+"lib/c/lib",
      "util": window.runtimePath+"lib/c/util",
      "ctype": window.runtimePath+"lib/c/ctype",
      "x": window.runtimePath+"lib/c/x",
      "AsyncByGenerator": window.runtimePath+"lib/c/AsyncByGenerator",
      "AsyncByGeneratorRaw": window.runtimePath+"lib/c/AsyncByGeneratorRaw",
      "assert": window.runtimePath+"lib/assert",
      "Klass": window.runtimePath+"lib/Klass",
      "FS": window.runtimePath+"lib/FS",
      "_Util": window.runtimePath+"lib/util"
  }
});
requirejs(["assert","Klass","FS","_Util"],function (assert,Klass,FS,_Util) {
  requirejs(["lib","util","ctype","x","AsyncByGenerator"],function (lib,u,c,x,ABG) {
      ABG.ready(function(){
    requirejs([window.sourceName],function () {
      try{
          if ($("#console").length==0) {
            $("<pre>").attr({id:"console"}).appendTo("body");
          }
          var s=Util.getQueryString("stdin",null);
          if(typeof s==="string") scanf.STDIN=s.split("\n");
                promisize(main()).then(function () {
                    var sr=window.runc_sendResult||parent.sendResult;
                    sr($("#console").text());
                },handleError);
  		}catch(e){
  		    handleError(e);
  		}
  		function handleError(e) {
            if (window.runc_handleError) return window.runc_handleError(e);
            console.log(e.stack);
            if (parent && parent.Tonyu && typeof parent.Tonyu.onRuntimeError==="function") {
                parent.Tonyu.onRuntimeError(e);
            } else {
                alert(e);
            }
        }
    });
    });
  });
});
