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
  
  var re=require('http://localhost/runtime/lib/python/py_re.js').install(PYLIB);
  var plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  
  var f=open("class/scatter.txt");
  var Xs=[];
  var Ys=[];
  var line;
  for (line of f) {
    PYLIB.LoopChecker.check();
    line=re.sub(/\n/,"",line);
    
    var [x,y]=line.split("\t");
    
    plt.scatter(int(x),int(y));
    Xs.append(int(x));
    Ys.append(int(y));
  }f.close;
  plt.show();
  plt.clf();
  
  plt.plot(Xs,Ys);
  
  plt.show();
});
requirejs(['__main__'],function(){});
