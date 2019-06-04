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
  function a(){
    PYLIB.print("---");
    
  }
  a();
  PYLIB.print(3);
  a();
  PYLIB.print(3,5);
  a();
  PYLIB.print(3,PYLIB.opt({end:' '}));
  a();
  PYLIB.print(3);
  a();
  PYLIB.print(3);
  a();
  PYLIB.print(3,5);
  a();
  PYLIB.print(3,PYLIB.opt({end:' '}));
  a();
  PYLIB.print((PYLIB.Tuple([3,5])));
});
requirejs(['__main__'],function(){});
