define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.np=require('http://localhost/runtime/lib/python/py_numpy.js').install(PYLIB);
  __top.rd=require('http://localhost/runtime/lib/python/py_numpy,random.js').install(PYLIB);
  __top.plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  __top.saikoro=__top.rd.__getattribute__('randint')(1,(6).__add__(1),100);
  __top.deme=[];
  for (__top.i of __top.range(6)) {
    PYLIB.LoopChecker.check();
    __top.deme.__getattribute__('append')(__top.np.__getattribute__('count_nonzero')((__top.saikoro).__eq__((__top.i).__add__(1))));
  }__top.left=[1,2,3,4,5,6];
  __top.plt.__getattribute__('title')("SAIKORO SIMULATION");
  __top.plt.__getattribute__('xlabel')("ME");
  __top.plt.__getattribute__('ylabel')("KAISUU");
  __top.plt.__getattribute__('bar')(__top.left,__top.deme,PYLIB.opt({align:"center"}));
  __top.plt.__getattribute__('show')();
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
