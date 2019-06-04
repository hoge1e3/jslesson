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
  PYLIB.print(("開始"));
  var i=0;
  var v=0;
  while (PYLIB.wrap(i).__le__(10)) {
    PYLIB.LoopChecker.check();
    PYLIB.print((i));
    v=PYLIB.wrap(v).__add__(i);
  }PYLIB.print(("終わり"));
});
requirejs(['__main__'],function(){});
