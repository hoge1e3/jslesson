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
  var test_dict={"田中":48,"佐藤":78,"井上":49};
  var key;
  for (key of test_dict) {
    PYLIB.LoopChecker.check();
    var value=test_dict[key];
    PYLIB.print((PYLIB.wrap(PYLIB.wrap(key).__add__("=")).__add__(str(value))));
  }
});
requirejs(['__main__'],function(){});
