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
  var np=require('http://localhost/runtime/lib/python/py_numpy.js').install(PYLIB);
  var rd=require('http://localhost/runtime/lib/python/py_numpy,random.js').install(PYLIB);
  var plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  var saikoro=rd.randint(1,PYLIB.wrap(6).__add__(1),100);
  var deme=[];
  var i;
  for (i of range(6)) {
    PYLIB.LoopChecker.check();
    deme.append(np.count_nonzero(PYLIB.wrap(saikoro).__eq__(PYLIB.wrap(i).__add__(1))));
  }var left=[1,2,3,4,5,6];
  plt.title("SAIKORO SIMULATION");
  plt.xlabel("ME");
  plt.ylabel("KAISUU");
  plt.bar(left,deme,PYLIB.opt({align:"center"}));
  plt.show();
});
requirejs(['__main__'],function(){});
