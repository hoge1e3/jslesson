define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.value=30;
  
  __top.hoge1=function (){
    
    PYLIB.print(__top.value);
  };
  
  __top.hoge2=function (){
    let value;
    
    __top.value=999;
    PYLIB.print(__top.value);
  };
  
  __top.hoge1();
  __top.hoge2();
  PYLIB.print(__top.value);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
