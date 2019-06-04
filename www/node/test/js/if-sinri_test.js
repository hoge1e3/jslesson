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
  
  PYLIB.print("これから無人島でしばらく一人で生活しなくてはなりません。");
  PYLIB.print("好きなものを一つだけ持って行くとしたら何を持って行く？");
  PYLIB.print("1: ナイフ");
  PYLIB.print("2: 携帯電話");
  PYLIB.print("3: 漫画");
  
  
  var s=input("答えは？");
  var i=int(s);
  
  
  if (PYLIB.wrap(i).__lt__(1)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("範囲外");
    quit();
  }if (PYLIB.wrap(i).__gt__(3)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("範囲外");
    quit();
  }
  
  PYLIB.print("\n----\n");
  PYLIB.print("無人島生活から、将来の恋人について分かります。");
  if (PYLIB.wrap(i).__eq__(1)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("現実的な道具を選んだあなたは..");
    PYLIB.print("現実的な身の丈にあった相手を選ぶでしょう。");
  }else if (PYLIB.wrap(i).__eq__(2)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("誰かとつながる道具を選んだあなたは..");
    PYLIB.print("話し好きな賑やかな相手が相応しいでしょう。");
  }else if (PYLIB.wrap(i).__eq__(3)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("実用よりも娯楽アイテムを選んだあなたは..");
    PYLIB.print("夢見がちなので、理想がとても高いでしょう。");
  }
});
requirejs(['__main__'],function(){});
