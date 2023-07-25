define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.math=require('http://localhost/runtime/lib/python/py_math.js').install(PYLIB);
  __top.plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  __top.dt=0.01;
  __top.v0=30;
  __top.g=9.8;
  __top.x=[0];
  __top.y=[0];
  __top.angle=((45.0).__mul__(__top.math.__getattribute__('pi'))).__div__(180.0);
  __top.vx=[(__top.v0).__mul__(__top.math.__getattribute__('cos')(__top.angle))];
  __top.vy=[(__top.v0).__mul__(__top.math.__getattribute__('sin')(__top.angle))];
  for (__top.i of __top.range(1000)) {
    PYLIB.LoopChecker.check();
    __top.vx.__getattribute__('append')(__top.vx.__getitem__(__top.i));
    __top.vy.__getattribute__('append')((__top.vy.__getitem__(__top.i)).__sub__((__top.g).__mul__(__top.dt)));
    __top.x.__getattribute__('append')((__top.x.__getitem__(__top.i)).__add__((__top.vx.__getitem__(__top.i)).__mul__(__top.dt)));
    __top.y.__getattribute__('append')((__top.y.__getitem__(__top.i)).__add__(((((__top.vy.__getitem__(__top.i)).__add__(__top.vy.__getitem__((__top.i).__add__(1))))).__div__(2.0)).__mul__(__top.dt)));
    if ((__top.y.__getitem__(__top.i)).__lt__(0)) {
      PYLIB.LoopChecker.check();
      break;
    }
  }__top.plt.__getattribute__('plot')(__top.x,__top.y);
  __top.plt.__getattribute__('title')("parabollic motion");
  __top.plt.__getattribute__('xlabel')("distance");
  __top.plt.__getattribute__('ylabel')("height");
  __top.plt.__getattribute__('show')();
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
