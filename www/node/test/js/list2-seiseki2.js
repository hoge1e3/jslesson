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
  
  var sub_list=["国語","算数","社会"];
  
  
  var i;
  for (i of range(3)) {
    PYLIB.LoopChecker.check();
    var k=PYLIB.wrap(i).__add__(1);
    
    var total=0;
    var p;
    for (p of p_list) {
      PYLIB.LoopChecker.check();
      var v=p[k];
      total=PYLIB.wrap(total).__add__(v);
    }
    var ave=PYLIB.wrap(total).__div__(len(p_list));
    PYLIB.print((PYLIB.wrap(PYLIB.wrap(sub_list[i]).__add__("=")).__add__(str(ave))));
  }
});
requirejs(['__main__'],function(){});
