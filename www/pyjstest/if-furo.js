define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.ondo=37;
  if ((__top.ondo).__le__(40)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("点火処理");
  }else {
    PYLIB.LoopChecker.check();
    PYLIB.print("消化処理");
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
