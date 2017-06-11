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
      "FS": window.runtimePath+"lib/FS"
    }
});
requirejs(["assert","Klass","FS"],function () {
  requirejs(["lib","util","ctype","x","AsyncByGenerator"],function () {
    requirejs([window.sourceName],function () {
      try{
          if ($("#console").length==0) {
            $("<pre>").attr({id:"console"}).appendTo("body");
          }
    			promisize(main()).then(function () {
        			parent.sendResult($("#console").text());
    			},handleError);
  		}catch(e){
  		    handleError(e);
  		}
  		function handleError(e) {
  		    console.log(e.stack);
    			alert(e);
    			parent.Tonyu.onRuntimeError(e);
  		}
    });
  });
});
