define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.a=function (){
    
    PYLIB.print("---");
    
  };
  __top.a();
  PYLIB.print(3);
  __top.a();
  PYLIB.print(3,5);
  __top.a();
  PYLIB.print(3,PYLIB.opt({end:' '}));
  __top.a();
  PYLIB.print(3);
  __top.a();
  PYLIB.print(3);
  __top.a();
  PYLIB.print(3,5);
  __top.a();
  PYLIB.print(3,PYLIB.opt({end:' '}));
  __top.a();
  PYLIB.print((PYLIB.Tuple([3,5])));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
