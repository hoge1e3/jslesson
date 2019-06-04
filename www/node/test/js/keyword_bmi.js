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
  
  function calc_bmi(weight,height){
    return PYLIB.wrap(weight).__div__(PYLIB.wrap((PYLIB.wrap(height).__div__(100))).__pow__(2));
  }
  
  
  var bmi1=calc_bmi(PYLIB.opt({weight:65,height:150}));
  PYLIB.print(PYLIB.wrap("bmi1=").__add__(str(bmi1)));
  
  var bmi2=calc_bmi(PYLIB.opt({height:150,weight:65}));
  PYLIB.print(PYLIB.wrap("bmi2=").__add__(str(bmi2)));
});
requirejs(['__main__'],function(){});
