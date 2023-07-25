define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=Object.create(PYLIB);
  PYLIB.LoopChecker.reset();
  
  __top.test_list=[{"名前":"田中","国語":80,"算数":45,"社会":90},{"名前":"鈴川","国語":62,"算数":70,"社会":58},{"名前":"早川","国語":77,"算数":69,"社会":74}];
  
  
  var PYLIB.checkSet(__top.p,'p');
  for (PYLIB.checkSet(__top.p,'p') of PYLIB.checkSet(__top.test_list,'test_list')) {
    PYLIB.LoopChecker.check();
    PYLIB.checkSet(__top.p,'p').__setitem__("合計", PYLIB.wrap(PYLIB.wrap(PYLIB.checkSet(__top.p,'p').__getitem__("国語")).__add__(PYLIB.checkSet(__top.p,'p').__getitem__("算数"))).__add__(PYLIB.checkSet(__top.p,'p').__getitem__("社会")));
  }
  
  __top.test_list=PYLIB.checkSet(__top.sorted,'sorted')(PYLIB.checkSet(__top.test_list,'test_list'),PYLIB.opt({key:((PYLIB.checkSet(v,'v'))=>PYLIB.checkSet(v,'v').__getitem__("合計")),reverse:true}));
  
  
  var PYLIB.checkSet(__top.p,'p');
  for (PYLIB.checkSet(__top.p,'p') of PYLIB.checkSet(__top.test_list,'test_list')) {
    PYLIB.LoopChecker.check();
    PYLIB.print(PYLIB.wrap(PYLIB.wrap(PYLIB.checkSet(__top.p,'p').__getitem__("名前")).__add__(":")).__add__(PYLIB.checkSet(__top.str,'str')(PYLIB.checkSet(__top.p,'p').__getitem__("合計"))));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
