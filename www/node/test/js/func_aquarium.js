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
  
  function calc_fee(age,is_monday){
    var fee=2000;
    
    if (PYLIB.wrap(age).__lt__(3)) {
      PYLIB.LoopChecker.check();
      fee=0;
    }else if (PYLIB.wrap(age).__lt__(6)) {
      PYLIB.LoopChecker.check();
      fee=500;
    }else if (PYLIB.wrap(age).__ge__(60)) {
      PYLIB.LoopChecker.check();
      fee=1500;
    }
    if (is_monday) {
      PYLIB.LoopChecker.check();
      fee=int(PYLIB.wrap(fee).__mul__(0.8));
    }return fee;
  }
  
  
  PYLIB.print((calc_fee(18,false)));
  PYLIB.print((calc_fee(20,true)));
  PYLIB.print((calc_fee(2,false)));
  PYLIB.print((calc_fee(70,true)));
});
requirejs(['__main__'],function(){});
