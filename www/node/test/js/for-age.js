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
  var base_year=2018;
  var i;
  for (i of range(100)) {
    PYLIB.LoopChecker.check();
    var y=PYLIB.wrap(base_year).__sub__(i);
    PYLIB.print((PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.wrap("西暦").__add__(str(y))).__add__("年 = 満")).__add__(str(i))).__add__("歳")));
  }
});
requirejs(['__main__'],function(){});
