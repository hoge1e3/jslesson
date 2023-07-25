define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  __top.zouka=0.01;
  __top.capacity=1000;
  __top.n=[10];
  for (__top.i of __top.range(1000)) {
    PYLIB.LoopChecker.check();
    __top.zoukasuu=(__top.n.__getitem__(__top.i)).__mul__(__top.zouka);
    __top.gensyousuu=((__top.n.__getitem__(__top.i)).__mul__(((__top.n.__getitem__(__top.i)).__div__(__top.capacity)))).__mul__(__top.zouka);
    __top.n.__getattribute__('append')((__top.n.__getitem__(__top.i)).__add__(((__top.zoukasuu).__sub__(__top.gensyousuu))));
  }__top.plt.__getattribute__('plot')(__top.n);
  __top.plt.__getattribute__('title')("number of life");
  __top.plt.__getattribute__('xlabel')("time");
  __top.plt.__getattribute__('ylabel')("number");
  __top.plt.__getattribute__('show')();
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
