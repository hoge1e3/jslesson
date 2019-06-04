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
  
  var p_list=[["田中",30,50,80],["井上",80,20,40],["鈴木",80,30,40],["斉藤",70,78,76]];
  
  
  var kokugo=0;
  var sansu=0;
  var syakai=0;
  var p;
  for (p of p_list) {
    PYLIB.LoopChecker.check();
    kokugo=PYLIB.wrap(kokugo).__add__(p[1]);
    sansu=PYLIB.wrap(sansu).__add__(p[2]);
    syakai=PYLIB.wrap(syakai).__add__(p[3]);
  }
  
  var ninzu=len(p_list);
  PYLIB.print((PYLIB.wrap("国語=").__add__(str(PYLIB.wrap(kokugo).__div__(ninzu)))));
  PYLIB.print((PYLIB.wrap("算数=").__add__(str(PYLIB.wrap(sansu).__div__(ninzu)))));
  PYLIB.print((PYLIB.wrap("社会=").__add__(str(PYLIB.wrap(syakai).__div__(ninzu)))));
});
requirejs(['__main__'],function(){});
