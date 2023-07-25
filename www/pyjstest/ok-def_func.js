define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.main=function (){
    
    PYLIB.print(__top.tasu(3,5));
    __top.sub1();
    __top.sub2();
  };
  
  
  __top.tasu=function (a,b){
    
    return (a).__add__(b);
  };
  __top.sub1=function (){
    
    PYLIB.print("sub1");
  };
  __top.sub2=function (){
    
    PYLIB.print("sub2");
  };
  
  
  __top.main();
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
