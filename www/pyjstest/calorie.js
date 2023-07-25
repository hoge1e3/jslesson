define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.show_calorie=function (min,weight=50){
    let kcal,msg,s;
    kcal=(((weight).__mul__(2)).__mul__(((min).__div__(60)))).__mul__(1.05);
    msg="体重{0}kgの人が{1}分歩くと{2}kcal消費";
    s=msg.__getattribute__('format')(weight,min,kcal);
    PYLIB.print(s);
  };
  
  
  __top.show_calorie(30,PYLIB.opt({weight:60}));
  __top.show_calorie(30,PYLIB.opt({weight:60}));
  __top.show_calorie(30);
  __top.show_calorie(60);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
