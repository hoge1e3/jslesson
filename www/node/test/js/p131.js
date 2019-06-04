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
  
  function quicksort(a,start,end){
    var m=int(PYLIB.wrap((PYLIB.wrap(start).__add__(end))).__div__(2));
    var i=start;
    var j=end;
    while ((PYLIB.wrap(i).__lt__(j))) {
      PYLIB.LoopChecker.check();
      while (PYLIB.wrap(a[i]).__lt__(a[m])) {
        PYLIB.LoopChecker.check();
        i=PYLIB.wrap(i).__add__(1);
      }while (PYLIB.wrap(a[j]).__gt__(a[m])) {
        PYLIB.LoopChecker.check();
        j=PYLIB.wrap(j).__sub__(1);
      }if (PYLIB.wrap(i).__ge__(j)) {
        PYLIB.LoopChecker.check();
        break;
      }var temp=a[i];
      a[i]=a[j];
      a[j]=temp;
      if (PYLIB.wrap(i).__eq__(m)) {
        PYLIB.LoopChecker.check();
        m=j;
      }else if (PYLIB.wrap(j).__eq__(m)) {
        PYLIB.LoopChecker.check();
        m=i;
      }i=PYLIB.wrap(i).__add__(1);
      j=PYLIB.wrap(j).__sub__(1);
    }if (PYLIB.wrap(start).__lt__(PYLIB.wrap(i).__sub__(1))) {
      PYLIB.LoopChecker.check();
      quicksort(a,start,PYLIB.wrap(m).__sub__(1));
    }if (PYLIB.wrap(end).__gt__(PYLIB.wrap(j).__add__(1))) {
      PYLIB.LoopChecker.check();
      quicksort(a,PYLIB.wrap(m).__add__(1),end);
    }
  }
  
  var a=[7,22,11,34,17,52,26,13,40,20,10,5,16,8,4,2,1];
  PYLIB.print(" ソート前 ",a);
  quicksort(a,0,PYLIB.wrap(len(a)).__sub__(1));
  PYLIB.print(" ソート後 ",a);
});
requirejs(['__main__'],function(){});
