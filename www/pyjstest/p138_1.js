define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.rd=require('http://localhost/runtime/lib/python/py_numpy,random.js').install(PYLIB);
  __top.ransuu=__top.rd.__getattribute__('rand')();
  PYLIB.print(" 乱数 ",__top.ransuu);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
