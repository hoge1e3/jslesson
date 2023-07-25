define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.test_list=[{"名前":"田中","国語":80,"算数":45,"社会":90},{"名前":"鈴川","国語":62,"算数":70,"社会":58},{"名前":"早川","国語":77,"算数":69,"社会":74}];
  
  __top.total=0;
  for (__top.p of __top.test_list) {
    PYLIB.LoopChecker.check();
    __top.total=(__top.total).__add__(__top.p.__getitem__("国語"));
  }__top.ave=(__top.total).__div__(__top.len(__top.test_list));
  PYLIB.print(__top.ave);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
