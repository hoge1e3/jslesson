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
  
  
  
  
  
  
  
  var x=PYLIB.Tuple([3]);
  PYLIB.print(x);
  x=PYLIB.Tuple([3]);
  PYLIB.print(x);
  
  x=PYLIB.Tuple([3,5]);
  PYLIB.print(x);
  x=PYLIB.Tuple([3,5]);
  PYLIB.print(x);
  x=(PYLIB.Tuple([3,5]));
  PYLIB.print(x);
  x=PYLIB.Tuple([3,5]);
  PYLIB.print(x);
  
  
  var [x,y]=PYLIB.Tuple([3,5]);
  PYLIB.print(x,y);
  [x,y]=PYLIB.Tuple([3,5]);
  PYLIB.print(x,y);
  [x,y]=PYLIB.Tuple([3,5]);
  PYLIB.print(x,y);
  [x,y]=PYLIB.Tuple([3,5]);
  PYLIB.print(x,y);
  
  
  [x,y]=PYLIB.Tuple([3,5]);
  PYLIB.print(x,y);
  [x,y]=(PYLIB.Tuple([3,5]));
  PYLIB.print(x,y);
  [x,y]=(PYLIB.Tuple([3,5]));
  PYLIB.print(x,y);
  [x,y]=PYLIB.Tuple([3,5]);
  PYLIB.print(x,y);
});
requirejs(['__main__'],function(){});
