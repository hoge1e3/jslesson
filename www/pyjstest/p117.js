define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.x=0;
  PYLIB.print("x = ",__top.x);
  for (__top.i of __top.range(1,6,1)) {
    PYLIB.LoopChecker.check();
    __top.x=(__top.x).__add__(10);
    PYLIB.print("x = ",__top.x);
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
