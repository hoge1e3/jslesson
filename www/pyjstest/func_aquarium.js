define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.calc_fee=function (age,is_monday){
    let fee;
    fee=2000;
    
    if ((age).__lt__(3)) {
      PYLIB.LoopChecker.check();
      fee=0;
    }else if ((age).__lt__(6)) {
      PYLIB.LoopChecker.check();
      fee=500;
    }else if ((age).__ge__(60)) {
      PYLIB.LoopChecker.check();
      fee=1500;
    }
    if (is_monday) {
      PYLIB.LoopChecker.check();
      fee=__top.int((fee).__mul__(0.8));
    }return fee;
  };
  
  
  PYLIB.print(__top.calc_fee(18,false));
  PYLIB.print(__top.calc_fee(20,true));
  PYLIB.print(__top.calc_fee(2,false));
  PYLIB.print(__top.calc_fee(70,true));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
