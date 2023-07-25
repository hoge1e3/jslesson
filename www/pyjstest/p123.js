define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.random=require('http://localhost/runtime/lib/python/py_random.js').install(PYLIB);
  __top.a=5;
  __top.r=__top.random.__getattribute__('randrange')(10);
  PYLIB.print("r=",__top.r);
  if ((__top.a).__eq__(__top.r)) {
    PYLIB.LoopChecker.check();
    PYLIB.print(" 当たり ");
  }else if ((__top.a).__gt__(__top.r)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("a の方が大きい ");
  }else if ((__top.a).__lt__(__top.r)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("a の方が小さい ");
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
