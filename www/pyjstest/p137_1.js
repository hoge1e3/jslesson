define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.yokin=100000;
  __top.riritsu=0.05;
  for (__top.i of __top.range(10)) {
    PYLIB.LoopChecker.check();
    __top.risoku=(__top.yokin).__mul__(__top.riritsu);
    __top.yokin=(__top.yokin).__add__(__top.risoku);
    PYLIB.print((__top.i).__add__(1)," 年目 :",__top.yokin);
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
