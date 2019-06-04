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
  function binsearch(a,p){
    var i=0;
    var j=PYLIB.wrap(len(a)).__sub__(1);
    while (PYLIB.wrap(i).__le__(j)) {
      PYLIB.LoopChecker.check();
      var m=int(PYLIB.wrap((PYLIB.wrap(i).__add__(j))).__div__(2));
      if (PYLIB.wrap(a[m]).__eq__(p)) {
        PYLIB.LoopChecker.check();
        PYLIB.print(m,"番目に 見つかりました ");
        break;
      }else {
        PYLIB.LoopChecker.check();
        if (PYLIB.wrap(a[m]).__gt__(p)) {
          PYLIB.LoopChecker.check();
          j=PYLIB.wrap(m).__sub__(1);
        }else {
          PYLIB.LoopChecker.check();
          i=PYLIB.wrap(m).__add__(1);
        }
      }
    }
  }
  
  var a=[25,33,43,51,66,71,88];
  var p=43;
  binsearch(a,p);
});
requirejs(['__main__'],function(){});
