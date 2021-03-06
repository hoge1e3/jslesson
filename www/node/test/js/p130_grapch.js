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
  
  var swc=0;
  function selectionsort(a){
    
    var i;
    for (i of range(0,len(a),1)) {
      PYLIB.LoopChecker.check();
      var j;
      for (j of range(PYLIB.wrap(i).__add__(1),len(a),1)) {
        PYLIB.LoopChecker.check();
        if (PYLIB.wrap(a[j]).__lt__(a[i])) {
          PYLIB.LoopChecker.check();
          swc=PYLIB.wrap(swc).__iadd__(1);
          var temp=a[i];
          a[i]=a[j];
          a[j]=temp;
        }
      }
    }
  }
  
  
  
  var n;
  for (n of range(5,15)) {
    PYLIB.LoopChecker.check();
    var a=rd.randint(1,100,n);
    PYLIB.print(" ソート前 ",a);
    selectionsort(a);
    PYLIB.print(" ソート後 ",a);
    PYLIB.print("並び替え ",swc);
    plt.scatter(n,swc,PYLIB.opt({color:"blue"}));
    
  }plt.show();
});
requirejs(['__main__'],function(){});
