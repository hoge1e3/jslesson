define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.calc_bmi=function (weight,height){
    
    return (weight).__div__((((height).__div__(100))).__pow__(2));
  };
  
  
  __top.bmi1=__top.calc_bmi(PYLIB.opt({weight:65,height:150}));
  PYLIB.print(("bmi1=").__add__(__top.str(__top.bmi1)));
  
  __top.bmi2=__top.calc_bmi(PYLIB.opt({height:150,weight:65}));
  PYLIB.print(("bmi2=").__add__(__top.str(__top.bmi2)));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
