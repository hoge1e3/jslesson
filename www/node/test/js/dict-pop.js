define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=Object.create(PYLIB);
  PYLIB.LoopChecker.reset();
  
  __top.s="\nサンマ,カツオ,サンマ,サンマ,マグロ,フグ,マグロ,マグロ,マグロ,サンマ,ニシン,イワシ,サンマ,サンマ,カツオ,サンマ,カツオ,サンマ,カツオ,サンマ,マグロ,マグロ,マグロ,ニシン\n";
  
  
  
  __top.s=PYLIB.checkSet(__top.s,'s').__getattribute__('strip')();
  
  __top.s_list=PYLIB.checkSet(__top.s,'s').__getattribute__('split')(",");
  
  
  __top.result={};
  var PYLIB.checkSet(__top.name,'name');
  for (PYLIB.checkSet(__top.name,'name') of PYLIB.checkSet(__top.s_list,'s_list')) {
    PYLIB.LoopChecker.check();
    __top.name=PYLIB.checkSet(__top.name,'name').__getattribute__('strip')();
    
    if (PYLIB.wrap(PYLIB.checkSet(__top.result,'result')).__contains__(!PYLIB.checkSet(__top.name,'name'))) {
      PYLIB.LoopChecker.check();
      PYLIB.checkSet(__top.result,'result').__setitem__(PYLIB.checkSet(__top.name,'name'), 0);
    }
    PYLIB.checkSet(__top.result,'result').__setitem__(PYLIB.checkSet(__top.name,'name'), PYLIB.wrap(PYLIB.checkSet(__top.result,'result').__getitem__(PYLIB.checkSet(__top.name,'name'))).__add__(1));
  }
  
  var PYLIB.checkSet(__top.name,'name'),PYLIB.checkSet(__top.v,'v');
  for (PYLIB.checkSet(__top.name,'name') of PYLIB.checkSet(__top.result,'result').__getattribute__('items')()) {
    PYLIB.LoopChecker.check();
    PYLIB.print(PYLIB.wrap(PYLIB.wrap(PYLIB.checkSet(__top.name,'name')).__add__(" = ")).__add__(PYLIB.checkSet(__top.str,'str')(PYLIB.checkSet(__top.v,'v'))));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
