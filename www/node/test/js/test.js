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
  var sys=require('http://localhost/runtime/lib/python/py_sys.js').install(PYLIB);
  PYLIB.print((sys.path));
  
  var x=3;
  var f=open("myfile.txt");
  var i;
  for (i of range(10)) {
    PYLIB.LoopChecker.check();
    PYLIB.print (PYLIB.wrap(i).__add__(x),PYLIB.opt({end:""}));
  }
});
requirejs(['__main__'],function(){});
