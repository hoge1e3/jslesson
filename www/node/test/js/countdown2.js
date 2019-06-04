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
    var olympic=datetime.date(2020,7,24);
    var target=datetime.date(y,m,d);
    var days=(PYLIB.wrap(olympic).__sub__(target)).days;
    var s=PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(str(y)).__add__("/")).__add__(str(m))).__add__("/")).__add__(str(d))).__add__("から");
    PYLIB.print(PYLIB.wrap(PYLIB.wrap(s).__add__(str(days))).__add__("日後"));
  }
  
  
  calc_days(2017,12,1);
  calc_days(2018,3,1);
  
  
  var t=datetime.date.today();
  calc_days(t.year,t.month,t.day);
});
requirejs(['__main__'],function(){});
