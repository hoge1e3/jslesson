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
  var random=require('http://localhost/runtime/lib/python/py_random.js').install(PYLIB);
  var a=5;
  var r=random.randrange(10);
  PYLIB.print("r=",r);
  if (PYLIB.wrap(a).__eq__(r)) {
    PYLIB.LoopChecker.check();
    PYLIB.print((" 当たり "));
  }else if (PYLIB.wrap(a).__gt__(r)) {
    PYLIB.LoopChecker.check();
    PYLIB.print(("a の方が大きい "));
  }else if (PYLIB.wrap(a).__lt__(r)) {
    PYLIB.LoopChecker.check();
    PYLIB.print(("a の方が小さい "));
  }
});
requirejs(['__main__'],function(){});
