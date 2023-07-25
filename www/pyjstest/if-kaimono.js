define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.total_str=__top.input("買い物の合計金額は？");
  __top.total=__top.int(__top.total_str);
  
  if ((__top.total).__ge__(5000)) {
    PYLIB.LoopChecker.check();
    __top.total=__top.int((__top.total).__mul__(0.9));
    PYLIB.print("- 1割引適用");
  }
  if ((__top.total).__lt__(10000)) {
    PYLIB.LoopChecker.check();
    __top.total=(__top.total).__add__(1500);
    PYLIB.print("+ 送料1500円");
  }else {
    PYLIB.LoopChecker.check();
    PYLIB.print("- 送料無料適用");
  }
  PYLIB.print((("支払い金額は、").__add__(__top.str(__top.total))).__add__("円です"));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
