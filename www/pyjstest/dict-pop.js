define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.s="\nサンマ,カツオ,サンマ,サンマ,マグロ,フグ,マグロ,マグロ,マグロ,サンマ,ニシン,イワシ,サンマ,サンマ,カツオ,サンマ,カツオ,サンマ,カツオ,サンマ,マグロ,マグロ,マグロ,ニシン\n";
  
  
  
  __top.s=__top.s.__getattribute__('strip')();
  
  __top.s_list=__top.s.__getattribute__('split')(",");
  
  
  __top.result={};
  for (__top.name of __top.s_list) {
    PYLIB.LoopChecker.check();
    __top.name=__top.name.__getattribute__('strip')();
    
    if ((__top.result).__contains__(!__top.name)) {
      PYLIB.LoopChecker.check();
      __top.result.__setitem__(__top.name, 0);
    }
    __top.result.__setitem__(__top.name, (__top.result.__getitem__(__top.name)).__add__(1));
  }
  
  for ([__top.name,__top.v] of __top.result.__getattribute__('items')()) {
    PYLIB.LoopChecker.check();
    PYLIB.print(((__top.name).__add__(" = ")).__add__(__top.str(__top.v)));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
