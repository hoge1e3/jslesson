define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.tasu=function (a,b){
    
    return (a).__add__(b);
  };
  
  
  PYLIB.print(__top.tasu(2,5));
  PYLIB.print(__top.tasu(10,30));
  PYLIB.print(__top.tasu(500,240));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
