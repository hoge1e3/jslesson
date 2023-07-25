define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.tasu=function (a,b){
    
    return (a).__add__(b);
  };
  
  __top.hiku=function (a,b){
    
    return (a).__sub__(b);
  };
  
  __top.kakeru=function (a,b){
    
    return (a).__mul__(b);
  };
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
