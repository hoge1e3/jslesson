define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  PYLIB.print("これから無人島でしばらく一人で生活しなくてはなりません。");
  PYLIB.print("好きなものを一つだけ持って行くとしたら何を持って行く？");
  PYLIB.print("1: ナイフ");
  PYLIB.print("2: 携帯電話");
  PYLIB.print("3: 漫画");
  
  
  __top.s=__top.input("答えは？");
  __top.i=__top.int(__top.s);
  
  
  if ((__top.i).__lt__(1)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("範囲外");
    __top.quit();
  }if ((__top.i).__gt__(3)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("範囲外");
    __top.quit();
  }
  
  PYLIB.print("\n----\n");
  PYLIB.print("無人島生活から、将来の恋人について分かります。");
  if ((__top.i).__eq__(1)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("現実的な道具を選んだあなたは..");
    PYLIB.print("現実的な身の丈にあった相手を選ぶでしょう。");
  }else if ((__top.i).__eq__(2)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("誰かとつながる道具を選んだあなたは..");
    PYLIB.print("話し好きな賑やかな相手が相応しいでしょう。");
  }else if ((__top.i).__eq__(3)) {
    PYLIB.LoopChecker.check();
    PYLIB.print("実用よりも娯楽アイテムを選んだあなたは..");
    PYLIB.print("夢見がちなので、理想がとても高いでしょう。");
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
