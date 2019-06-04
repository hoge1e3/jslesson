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
  PYLIB.print("インチからセンチへの変換");
  PYLIB.print("プログラムを終わるには,[Ctrl]+[C]キーを押します。");
  
  while (true) {
    PYLIB.LoopChecker.check();
    PYLIB.print(" --- ");
    var inch=float(input("インチは？"));
    var cm=PYLIB.wrap(inch).__mul__(2.54);
    PYLIB.print(PYLIB.wrap(str(cm)).__add__("センチです"));
  }
});
requirejs(['__main__'],function(){});
