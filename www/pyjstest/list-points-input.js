define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.points=[];
  
  
  while (true) {
    PYLIB.LoopChecker.check();
    __top.s=__top.input("点数は? ");
    if (((__top.s).__eq__("")) || ((__top.s).__eq__("q"))) {
      PYLIB.LoopChecker.check();
      break;
    }__top.v=__top.int(__top.s);
    __top.points.__getattribute__('append')(__top.v);
  }
  
  __top.total=0;
  for (__top.v of __top.points) {
    PYLIB.LoopChecker.check();
    __top.total=(__top.total).__add__(__top.v);
  }PYLIB.print(("合計点=").__add__(__top.str(__top.total)));
  __top.ave=(__top.total).__div__(__top.len(__top.points));
  PYLIB.print(("平均点=").__add__(__top.str(__top.ave)));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
