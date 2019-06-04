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
  var yokin=100000;
  var riritsu=0.05;
  var i;
  for (i of range(10)) {
    PYLIB.LoopChecker.check();
    var risoku=PYLIB.wrap(yokin).__mul__(riritsu);
    yokin=PYLIB.wrap(yokin).__add__(risoku);
    PYLIB.print(PYLIB.wrap(i).__add__(1)," 年目 :",yokin);
  }
});
requirejs(['__main__'],function(){});
