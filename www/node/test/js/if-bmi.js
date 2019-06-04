define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var range=PYLIB.range;
  var input=PYLIB.input;
  var str=PYLIB.str;
  var int=PYLIB.int;
  var float=PYLIB.float;
  var len=PYLIB.len;
  var type=PYLIB.type;
  var quit=PYLIB.quit;
  var exit=PYLIB.exit;
  var sorted=PYLIB.sorted;
  var fillRect=PYLIB.fillRect;
  var setColor=PYLIB.setColor;
  var setTimeout=PYLIB.setTimeout;
  var clearRect=PYLIB.clearRect;
  var clear=PYLIB.clear;
  var open=PYLIB.open;
  PYLIB.LoopChecker.reset();
  
  var w=float(input("体重kgは？"));
  var h=float(input("身長cmは？"));
  
  
  var bmi=PYLIB.wrap(w).__div__(PYLIB.wrap((PYLIB.wrap(h).__div__(100))).__pow__(2));
  PYLIB.print((PYLIB.wrap("BMI=").__add__(str(bmi))));
  
  
  if (PYLIB.wrap(bmi).__lt__(18.5)) {
    PYLIB.LoopChecker.check();
    PYLIB.print(("痩せ型"));
  }else if (PYLIB.wrap(18.5).__le__(bmi) && PYLIB.wrap(bmi).__lt__(25)) {
    PYLIB.LoopChecker.check();
    PYLIB.print(("普通体重"));
  }else if (PYLIB.wrap(bmi).__ge__(25)) {
    PYLIB.LoopChecker.check();
    PYLIB.print(("肥満"));
  }
});
requirejs(['__main__'],function(){});
