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
  function listsum(a){
    var sum=0;
    var i;
    for (i of range(0,len(a),1)) {
      PYLIB.LoopChecker.check();
      sum=PYLIB.wrap(sum).__add__(a[i]);
    }return sum;
  }
  var a=[56,3,62,17,87,22,36,83,21,12];
  var sum=listsum(a);
  PYLIB.print(sum);
});
requirejs(['__main__'],function(){});
