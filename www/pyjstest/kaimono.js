define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.tomato=530;
  __top.cheese=750;
  __top.tofu=99;
  __top.total=(((__top.tomato).__mul__(3)).__add__((__top.cheese).__mul__(2))).__add__((__top.tofu).__mul__(5));
  __top.price=(__top.total).__mul__(0.8);
  PYLIB.print(__top.price);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
