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
  
  var points=[62,58,72,60,47,81,74,65,59,38];
  
  
  var total=0;
  var pt;
  for (pt of points) {
    PYLIB.LoopChecker.check();
    total=PYLIB.wrap(total).__add__(pt);
  }PYLIB.print((PYLIB.wrap("合計点=").__add__(str(total))));
  
  
  var ave=PYLIB.wrap(total).__div__(len(points));
  PYLIB.print((PYLIB.wrap("平均点=").__add__(str(ave))));
});
requirejs(['__main__'],function(){});
