define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  PYLIB.print("インチからセンチへの変換");
  PYLIB.print("プログラムを終わるには,[Ctrl]+[C]キーを押します。");
  __top.c=0;
  while ((__top.c).__lt__(10)) {
    PYLIB.LoopChecker.check();
    PYLIB.print(" --- ");
    __top.inch=__top.float(__top.input("インチは？"));
    __top.cm=(__top.inch).__mul__(2.54);
    PYLIB.print((__top.str(__top.cm)).__add__("センチです"));
    __top.c=(__top.c).__iadd__(1)
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
