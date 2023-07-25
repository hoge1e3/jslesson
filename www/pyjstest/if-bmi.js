define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.w=__top.float(__top.input("体重kgは？"));
  __top.h=__top.float(__top.input("身長cmは？"));
  
  
  __top.bmi=(__top.w).__div__((((__top.h).__div__(100))).__pow__(2));
  PYLIB.print(("BMI=").__add__(__top.str(__top.bmi)));
  
  
  if ((__top.bmi).__lt__(18.5)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("痩せ型");
  }else if ((18.5).__le__(__top.bmi) && (__top.bmi).__lt__(25)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("普通体重");
  }else if ((__top.bmi).__ge__(25)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("肥満");
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
