define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.a=[56,3,62,17,87,22,36,83,21,12];
  __top.sum=0;
  for (__top.i of __top.range(0,10,1)) {
    PYLIB.LoopChecker.check();
    __top.sum=(__top.sum).__add__(__top.a.__getitem__(__top.i));
  }PYLIB.print(__top.sum);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
