define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.base_year=2018;
  for (__top.i of __top.range(100)) {
    PYLIB.LoopChecker.check();
    __top.y=(__top.base_year).__sub__(__top.i);
    PYLIB.print((((("西暦").__add__(__top.str(__top.y))).__add__("年 = 満")).__add__(__top.str(__top.i))).__add__("歳"));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
