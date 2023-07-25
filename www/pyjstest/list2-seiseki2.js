define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.p_list=[["田中",30,50,80],["井上",80,20,40],["鈴木",80,30,40],["斉藤",70,78,76]];
  
  __top.sub_list=["国語","算数","社会"];
  
  
  for (__top.i of __top.range(3)) {
    PYLIB.LoopChecker.check();
    __top.k=(__top.i).__add__(1);
    
    __top.total=0;
    for (__top.p of __top.p_list) {
      PYLIB.LoopChecker.check();
      __top.v=__top.p.__getitem__(__top.k);
      __top.total=(__top.total).__add__(__top.v);
    }
    __top.ave=(__top.total).__div__(__top.len(__top.p_list));
    PYLIB.print(((__top.sub_list.__getitem__(__top.i)).__add__("=")).__add__(__top.str(__top.ave)));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
