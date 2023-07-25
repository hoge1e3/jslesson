define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  for (__top.i of __top.range(10)) {
    PYLIB.LoopChecker.check();
    PYLIB.print((("--- ").__add__(__top.str(__top.i))).__add__(" ---"));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
