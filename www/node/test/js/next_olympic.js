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
  
  function show_next_olympic(year){
    var i=PYLIB.wrap(4).__sub__(PYLIB.wrap(year).__mod__(4));
    var year2=PYLIB.wrap(year).__add__(i);
    
    var s="{0}年の次のオリンピックは{1}年".format(year,year2);
    PYLIB.print(s);
  }
  
  
  show_next_olympic(2016);
  show_next_olympic(2018);
  show_next_olympic(2020);
});
requirejs(['__main__'],function(){});
