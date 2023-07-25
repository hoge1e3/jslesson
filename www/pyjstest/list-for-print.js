define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.nums=[51,33,24,63,21];
  for (__top.v of __top.nums) {
    PYLIB.LoopChecker.check();
    PYLIB.print((("--- ").__add__(__top.str(__top.v))).__add__(" ---"));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
