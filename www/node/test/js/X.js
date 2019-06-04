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
  var g=require('http://localhost/runtime/lib/python/py_g.js').install(PYLIB);
  
  g.drawGrid();
  var i;
  for (i of range(10)) {
    PYLIB.LoopChecker.check();
    g.fillRect(PYLIB.wrap(i).__mul__(20),30,10,50);
  }var x=10;
  var y=10;
  
  function move(){
    
    g.clear();
    g.fillRect(x,y,50,50);
    if (g.getkey("right")) {
      PYLIB.LoopChecker.check();
      x=PYLIB.wrap(x).__iadd__(1);
    }if (g.getkey("left")) {
      PYLIB.LoopChecker.check();
      x=PYLIB.wrap(x).__isub__(1);
    }if (PYLIB.wrap(x).__lt__(100)) {
      PYLIB.LoopChecker.check();
      g.setTimeout(move,10);
    }else {
      PYLIB.LoopChecker.check();
      g.setTimeout(gov,10);
    }
  }
  function gov(){
    
    g.clear();
    g.fillRect(x,y,50,50);
    y=PYLIB.wrap(y).__iadd__(10);
    if (PYLIB.wrap(y).__lt__(300)) {
      PYLIB.LoopChecker.check();
      g.setTimeout(gov,10);
    }
  }
  
  
  g.setTimeout(move,10);
});
requirejs(['__main__'],function(){});
