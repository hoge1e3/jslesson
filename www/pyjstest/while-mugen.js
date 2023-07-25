define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  PYLIB.print("開始");
  __top.i=0;
  __top.v=0;
  while ((__top.i).__le__(10)) {
    PYLIB.LoopChecker.check();
    PYLIB.print(__top.i);
    __top.v=(__top.v).__add__(__top.i);
  }PYLIB.print("終わり");
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
