define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.i=0;
  while ((__top.i).__lt__(5)) {
    PYLIB.LoopChecker.check();
    __top.i=(__top.i).__add__(1);
    PYLIB.print(("--> ").__add__(__top.str(__top.i)));
    if (((__top.i).__mod__(2)).__eq__(0)) {
      PYLIB.LoopChecker.check();
      continue;
    }PYLIB.print(("<-- ").__add__(__top.str(__top.i)));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
