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
  var datetime=require('http://localhost/runtime/lib/python/py_datetime.js').install(PYLIB);
  
  
  function calc_days(y,m,d){
    
    var olympic=datetime.datetime(2020,7,24).timestamp();
    var target=datetime.datetime(y,m,d).timestamp();
    
    var perday=PYLIB.wrap(PYLIB.wrap(24).__mul__(60)).__mul__(60);
    var days=PYLIB.wrap((PYLIB.wrap(olympic).__sub__(target))).__floordiv__(perday);
    
    var s="{0}/{1}/{2}から{3}日後".format(y,m,d,int(days));
    PYLIB.print((s));
  }
  
  
  calc_days(2017,12,1);
  calc_days(2018,3,1);
  
  
  var t=datetime.date.today();
  calc_days(t.year,t.month,t.day);
});
requirejs(['__main__'],function(){});
