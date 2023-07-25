define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.p_list=[["田中",30,50,80],["井上",80,20,40],["鈴木",80,30,40],["斉藤",70,78,76]];
  
  
  __top.kokugo=0;
  __top.sansu=0;
  __top.syakai=0;
  for (__top.p of __top.p_list) {
    PYLIB.LoopChecker.check();
    __top.kokugo=(__top.kokugo).__add__(__top.p.__getitem__(1));
    __top.sansu=(__top.sansu).__add__(__top.p.__getitem__(2));
    __top.syakai=(__top.syakai).__add__(__top.p.__getitem__(3));
  }
  
  __top.ninzu=__top.len(__top.p_list);
  PYLIB.print(("国語=").__add__(__top.str((__top.kokugo).__div__(__top.ninzu))));
  PYLIB.print(("算数=").__add__(__top.str((__top.sansu).__div__(__top.ninzu))));
  PYLIB.print(("社会=").__add__(__top.str((__top.syakai).__div__(__top.ninzu))));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
