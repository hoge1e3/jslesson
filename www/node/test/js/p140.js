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
  var rd=require('http://localhost/runtime/lib/python/py_numpy,random.js').install(PYLIB);
  var plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  var totalcount=2000;
  var incount=0;
  var i;
  for (i of range(totalcount)) {
    PYLIB.LoopChecker.check();
    var x=rd.random();
    var y=rd.random();
    if (PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(x).__pow__(2)).__add__(PYLIB.wrap(y).__pow__(2))).__lt__(1.0)) {
      PYLIB.LoopChecker.check();
      incount=PYLIB.wrap(incount).__iadd__(1);
      plt.scatter(x,y,PYLIB.opt({c:"red"}));
    }else {
      PYLIB.LoopChecker.check();
      plt.scatter(x,y,PYLIB.opt({c:"blue"}));
    }
  }PYLIB.print(" 円周率 :",PYLIB.wrap(PYLIB.wrap(incount).__mul__(4.0)).__div__(totalcount));
  plt.title("Monte Carlo method");
  plt.show();
});
requirejs(['__main__'],function(){});
