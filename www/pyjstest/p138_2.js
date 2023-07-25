define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.np=require('http://localhost/runtime/lib/python/py_numpy.js').install(PYLIB);
  __top.rd=require('http://localhost/runtime/lib/python/py_numpy,random.js').install(PYLIB);
  __top.saikoro=__top.rd.__getattribute__('randint')(1,(6).__add__(1),100);
  PYLIB.print(__top.saikoro);
  __top.deme=[];
  for (__top.i of __top.range(6)) {
    PYLIB.LoopChecker.check();
    __top.deme.__getattribute__('append')(__top.np.__getattribute__('count_nonzero')((__top.saikoro).__eq__((__top.i).__add__(1))));
  }PYLIB.print(" 出現数 :",__top.deme);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
