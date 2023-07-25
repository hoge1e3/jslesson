define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.rd=require('http://localhost/runtime/lib/python/py_numpy,random.js').install(PYLIB);
  __top.plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  __top.totalcount=2000;
  __top.incount=0;
  for (__top.i of __top.range(__top.totalcount)) {
    PYLIB.LoopChecker.check();
    __top.x=__top.rd.__getattribute__('random')();
    __top.y=__top.rd.__getattribute__('random')();
    if ((((__top.x).__pow__(2)).__add__((__top.y).__pow__(2))).__lt__(1.0)) {
      PYLIB.LoopChecker.check();
      __top.incount=(__top.incount).__iadd__(1)
      __top.plt.__getattribute__('scatter')(__top.x,__top.y,PYLIB.opt({c:"red"}));
    }else {
      PYLIB.LoopChecker.check();
      __top.plt.__getattribute__('scatter')(__top.x,__top.y,PYLIB.opt({c:"blue"}));
    }
  }PYLIB.print(" 円周率 :",((__top.incount).__mul__(4.0)).__div__(__top.totalcount));
  __top.plt.__getattribute__('title')("Monte Carlo method");
  __top.plt.__getattribute__('show')();
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
