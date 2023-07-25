define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.kyureki={"睦月":1,"如月":2,"弥生":3,"卯月":4,"皐":5,"水無月":6,"文月":7,"葉月":8,"長月":9,"神無月":10,"霜月":11,"師走":12};
  
  
  while (true) {
    PYLIB.LoopChecker.check();
    __top.tuki=__top.input("旧暦の月名を入力> ");
    if ((__top.tuki).__eq__("") || (__top.tuki).__eq__("q")) {
      PYLIB.LoopChecker.check();
      break;
    }if ((__top.kyureki).__contains__(__top.tuki)) {
      PYLIB.LoopChecker.check();
      PYLIB.print((__top.str(__top.kyureki.__getitem__(__top.tuki))).__add__("月です"));
    }else {
      PYLIB.LoopChecker.check();
      PYLIB.print("ありません");
    }
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
