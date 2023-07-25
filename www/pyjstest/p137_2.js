define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  __top.riritsu=0.05;
  __top.yokin=[100000];
  for (__top.i of __top.range(10)) {
    PYLIB.LoopChecker.check();
    __top.risoku=__top.int((__top.yokin.__getitem__(__top.i)).__mul__(__top.riritsu));
    __top.yokin.__getattribute__('append')((__top.yokin.__getitem__(__top.i)).__add__(__top.risoku));
  }__top.plt.__getattribute__('title')("FUKURI KEISAN");
  __top.plt.__getattribute__('xlabel')("Year");
  __top.plt.__getattribute__('ylabel')("Yokin[YEN]");
  __top.plt.__getattribute__('plot')(__top.yokin,PYLIB.opt({marker:"o"}));
  __top.plt.__getattribute__('show')();
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
