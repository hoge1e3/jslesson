define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.v=0;
  for (__top.k of __top.range(10)) {
    PYLIB.LoopChecker.check();
    __top.i=(__top.k).__add__(1);
    PYLIB.print(((((__top.str(__top.v)).__add__("+")).__add__(__top.str(__top.i))).__add__("=")).__add__(__top.str((__top.v).__add__(__top.i))));
    __top.v=(__top.v).__add__(__top.i);
  }PYLIB.print("---");
  PYLIB.print(("合計=").__add__(__top.str(__top.v)));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
