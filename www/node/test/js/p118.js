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
  var x=0;
  PYLIB.print("x = ",x);
  var i;
  for (i of range(1,6,1)) {
    PYLIB.LoopChecker.check();
    x=PYLIB.wrap(x).__add__(10);
    if (PYLIB.wrap(PYLIB.wrap(i).__mod__(2)).__eq__(1)) {
      PYLIB.LoopChecker.check();
      PYLIB.print("x = ",x);
    }
  }
});
requirejs(['__main__'],function(){});
