define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.inch=__top.input("何インチ？");
  __top.cm=(__top.float(__top.inch)).__mul__(2.54);
  PYLIB.print((("答えは...").__add__(__top.str(__top.cm))).__add__("cmです"));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
