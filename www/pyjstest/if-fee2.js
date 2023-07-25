define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.age=__top.int(__top.input("年齢は？"));
  if ((__top.age).__ge__(6) && (__top.age).__lt__(60)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("1100円");
  }else {
    PYLIB.LoopChecker.check();
    PYLIB.print("500円");
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
