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
  
  var total_str=input("買い物の合計金額は？");
  var total=int(total_str);
  
  if (PYLIB.wrap(total).__ge__(5000)) {
    PYLIB.LoopChecker.check();
    total=int(PYLIB.wrap(total).__mul__(0.9));
    PYLIB.print(("- 1割引適用"));
  }
  if (PYLIB.wrap(total).__lt__(10000)) {
    PYLIB.LoopChecker.check();
    total=PYLIB.wrap(total).__add__(1500);
    PYLIB.print(("+ 送料1500円"));
  }else {
    PYLIB.LoopChecker.check();
    PYLIB.print(("- 送料無料適用"));
  }
  PYLIB.print((PYLIB.wrap(PYLIB.wrap("支払い金額は、").__add__(str(total))).__add__("円です")));
});
requirejs(['__main__'],function(){});
