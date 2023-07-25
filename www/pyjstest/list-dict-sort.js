define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.test_list=[{"名前":"田中","国語":80,"算数":45,"社会":90},{"名前":"鈴川","国語":62,"算数":70,"社会":58},{"名前":"早川","国語":77,"算数":69,"社会":74}];
  
  
  for (__top.p of __top.test_list) {
    PYLIB.LoopChecker.check();
    __top.p.__setitem__("合計", ((__top.p.__getitem__("国語")).__add__(__top.p.__getitem__("算数"))).__add__(__top.p.__getitem__("社会")));
  }
  
  __top.test_list=__top.sorted(__top.test_list,PYLIB.opt({key:((v)=>v.__getitem__("合計")),reverse:true}));
  
  
  for (__top.p of __top.test_list) {
    PYLIB.LoopChecker.check();
    PYLIB.print(((__top.p.__getitem__("名前")).__add__(":")).__add__(__top.str(__top.p.__getitem__("合計"))));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
