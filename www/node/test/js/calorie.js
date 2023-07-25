define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=Object.create(PYLIB);
  PYLIB.LoopChecker.reset();
  
  __top.show_calorie=function (min,weight=50){
    var kcal=PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.checkSet(weight,'weight')).__mul__(2)).__mul__((PYLIB.wrap(PYLIB.checkSet(min,'min')).__div__(60)))).__mul__(1.05);
    var msg="体重{0}kgの人が{1}分歩くと{2}kcal消費";
    var s=PYLIB.checkSet(msg,'msg').__getattribute__('format')(PYLIB.checkSet(weight,'weight'),PYLIB.checkSet(min,'min'),PYLIB.checkSet(kcal,'kcal'));
    PYLIB.print(PYLIB.checkSet(s,'s'));
  }
  
  
  PYLIB.checkSet(__top.show_calorie,'show_calorie')(30,PYLIB.opt({weight:60}));
  PYLIB.checkSet(__top.show_calorie,'show_calorie')(30,PYLIB.opt({weight:60}));
  PYLIB.checkSet(__top.show_calorie,'show_calorie')(30);
  PYLIB.checkSet(__top.show_calorie,'show_calorie')(60);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
