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
  var random=require('http://localhost/runtime/lib/python/py_random.js').install(PYLIB);
  
  
  var win=0;
  var draw=0;
  
  
  var i;
  for (i of range(3)) {
    PYLIB.LoopChecker.check();
    PYLIB.print((PYLIB.wrap(PYLIB.wrap("■じゃんけん").__add__(str(PYLIB.wrap(i).__add__(1)))).__add__("回目")));
    PYLIB.print(("> 0:グー、1:チョキ、2:パー"));
    
    var com=random.randint(0,2);
    
    var you=int(input("あなたの手は? "));
    
    PYLIB.print((PYLIB.wrap("コンピュータの手=").__add__(str(com))));
    
    var n=PYLIB.wrap((PYLIB.wrap(PYLIB.wrap(com).__sub__(you)).__add__(3))).__mod__(3);
    if (PYLIB.wrap(n).__eq__(0)) {
      PYLIB.LoopChecker.check();
      PYLIB.print(("→あいこ"));
      draw=PYLIB.wrap(draw).__add__(1);
    }else if (PYLIB.wrap(n).__eq__(1)) {
      PYLIB.LoopChecker.check();
      PYLIB.print(("→勝ち (^v^)y"));
      win=PYLIB.wrap(win).__add__(1);
    }else {
      PYLIB.LoopChecker.check();
      PYLIB.print(("→負け (ToT)m"));
    }PYLIB.print(("---"));
  }
  
  PYLIB.print((PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.wrap("結果=3戦").__add__(str(win))).__add__("勝")).__add__(str(draw))).__add__("引分")));
});
requirejs(['__main__'],function(){});
