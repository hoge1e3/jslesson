define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.rate=110;
  __top.dvd=2200;
  __top.total=(__top.dvd).__mul__(3);
  __top.usd=(__top.total).__div__(__top.rate);
  PYLIB.print(__top.usd);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
