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
  var math=require('http://localhost/runtime/lib/python/py_math.js').install(PYLIB);
  var plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  var dt=0.01;
  var v0=30;
  var g=9.8;
  var x=[0];
  var y=[0];
  var angle=PYLIB.wrap(PYLIB.wrap(45.0).__mul__(math.pi)).__div__(180.0);
  var vx=[PYLIB.wrap(v0).__mul__(math.cos(angle))];
  var vy=[PYLIB.wrap(v0).__mul__(math.sin(angle))];
  var i;
  for (i of range(1000)) {
    PYLIB.LoopChecker.check();
    vx.append(vx[i]);
    vy.append(PYLIB.wrap(vy[i]).__sub__(PYLIB.wrap(g).__mul__(dt)));
    x.append(PYLIB.wrap(x[i]).__add__(PYLIB.wrap(vx[i]).__mul__(dt)));
    y.append(PYLIB.wrap(y[i]).__add__(PYLIB.wrap(PYLIB.wrap((PYLIB.wrap(vy[i]).__add__(vy[PYLIB.wrap(i).__add__(1)]))).__div__(2.0)).__mul__(dt)));
    if (PYLIB.wrap(y[i]).__lt__(0)) {
      PYLIB.LoopChecker.check();
      break;
    }
  }plt.plot(x,y);
  plt.title("parabollic motion");
  plt.xlabel("distance");
  plt.ylabel("height");
  plt.show();
});
requirejs(['__main__'],function(){});
