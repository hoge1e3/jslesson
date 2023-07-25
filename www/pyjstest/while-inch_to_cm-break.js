define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.c=0;
  while ((__top.c).__lt__(10)) {
    PYLIB.LoopChecker.check();
    PYLIB.print(" --- ");
    __top.s=__top.input("インチは？");
    if ((__top.s).__eq__("")) {
      PYLIB.LoopChecker.check();
      break;
    }__top.inch=__top.float(__top.s);
    __top.cm=(__top.inch).__mul__(2.54);
    PYLIB.print((__top.str(__top.cm)).__add__("センチです"));
    __top.c=(__top.c).__iadd__(1)
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
