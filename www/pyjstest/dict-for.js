define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.test_dict={"田中":48,"佐藤":78,"井上":49};
  for (__top.key of __top.test_dict) {
    PYLIB.LoopChecker.check();
    __top.value=__top.test_dict.__getitem__(__top.key);
    PYLIB.print(((__top.key).__add__("=")).__add__(__top.str(__top.value)));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
