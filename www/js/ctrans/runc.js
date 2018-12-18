(function () {
    var R=window.BitArrow ? window.BitArrow.runtimePath : window.runtimePath;
    requirejs.config({
        paths: {
          "lib": R+"lib/c/lib",
          "scanf": R+"lib/c/scanf",
          "util": R+"lib/c/util",
          "ctype": R+"lib/c/ctype",
          "x": R+"lib/c/x",
          "AsyncByGenerator": R+"lib/AsyncByGenerator",
         // "AsyncByGeneratorRaw": R+"lib/c/AsyncByGeneratorRaw",
          "assert": R+"lib/assert",
          "Klass": R+"lib/Klass",
          "FS": R+"lib/FS",
          "_Util": R+"lib/util"
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
})();
requirejs(["assert","Klass","FS","_Util"],function (assert,Klass,FS,_Util) {
  requirejs(["scanf","lib","util","ctype","x","AsyncByGenerator"],function (_s,lib,u,c,x,ABG) {
    //  ABG.ready(function(){
    requirejs([window.sourceName],function () {
        try{
            if ($("#console").length==0) {
                if (parent && parent.editorTextSize) {
                    var size=parent.editorTextSize+"px";
                }else{
                    var size="";
                }
                $("<pre>").attr({id:"console",style:"font-size:"+size+";"}).appendTo("body");
            }
            var s=Util.getQueryString("stdin",null);
            if(typeof s==="string") scanf.STDIN=s.split("\n");
            if (typeof main!=="function") throw new Error("main関数がありません");
            promisize(main()).then(function () {
                var sr=window.runc_sendResult||parent.sendResult;
                sr($("#console").text());
            },handleError);
  		}catch(e){
  		    handleError(e);
  		}
  		function handleError(e) {
            if (e.suppressHandleError) return ;
            if (window.runc_handleError) return window.runc_handleError(e);
            console.log(e.stack);
            if (parent && parent.Tonyu && typeof parent.Tonyu.onRuntimeError==="function") {
                parent.Tonyu.onRuntimeError(e);
            } else {
                alert(e);
            }
        }
    });
    //});
  });
});