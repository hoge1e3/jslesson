define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.s=__top.input("判定したい数は？");
  __top.i=__top.int(__top.s);
  if (((__top.i).__mod__(2)).__eq__(0)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("偶数");
  }else {
    PYLIB.LoopChecker.check();
    PYLIB.print("奇数");
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
