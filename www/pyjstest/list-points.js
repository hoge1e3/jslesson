define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.points=[62,58,72,60,47,81,74,65,59,38];
  
  
  __top.total=0;
  for (__top.pt of __top.points) {
    PYLIB.LoopChecker.check();
    __top.total=(__top.total).__add__(__top.pt);
  }PYLIB.print(("合計点=").__add__(__top.str(__top.total)));
  
  
  __top.ave=(__top.total).__div__(__top.len(__top.points));
  PYLIB.print(("平均点=").__add__(__top.str(__top.ave)));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
