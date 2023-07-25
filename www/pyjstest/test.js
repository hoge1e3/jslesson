define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.sys=require('http://localhost/runtime/lib/python/py_sys.js').install(PYLIB);
  PYLIB.print(__top.sys.__getattribute__('path'));
  
  __top.x=3;
  __top.f=__top.open("myfile.txt");
  for (__top.i of __top.range(10)) {
    PYLIB.LoopChecker.check();
    PYLIB.print ((__top.i).__add__(__top.x),PYLIB.opt({end:""}));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
