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
  var s=input("判定したい数は？");
  var i=int(s);
  if (PYLIB.wrap(PYLIB.wrap(i).__mod__(2)).__eq__(0)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("偶数");
  }else {
    PYLIB.LoopChecker.check();
    PYLIB.print("奇数");
  }
});
requirejs(['__main__'],function(){});
