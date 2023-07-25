define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.x=40;
  if ((__top.x).__ge__(60)) {
    PYLIB.LoopChecker.check();
    PYLIB.print(" 合格 ");
  }else {
    PYLIB.LoopChecker.check();
    PYLIB.print(" 不合格 ");
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
