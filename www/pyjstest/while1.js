define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.i=1;
  while ((__top.i).__le__(5)) {
    PYLIB.LoopChecker.check();
    PYLIB.print((("*** ").__add__(__top.str(__top.i))).__add__(" ***"));
    __top.i=(__top.i).__add__(1);
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
