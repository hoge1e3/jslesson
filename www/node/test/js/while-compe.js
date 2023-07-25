define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=Object.create(PYLIB);
  PYLIB.LoopChecker.reset();
  
  var random=require('http://localhost/runtime/lib/python/py_random.js').install(PYLIB);
  var time=require('http://localhost/runtime/lib/python/py_time.js').install(PYLIB);
  
  
  __top.a=0;
  __top.b=0;
  __top.goal=20;
  
  __top.user=PYLIB.checkSet(__top.input,'input')("aとbのどちらのカメが勝つか？");
  
  
  PYLIB.print("競争開始！");
  
  while ((PYLIB.wrap(PYLIB.checkSet(__top.a,'a')).__lt__(PYLIB.checkSet(__top.goal,'goal'))) && (PYLIB.wrap(PYLIB.checkSet(__top.b,'b')).__lt__(PYLIB.checkSet(__top.goal,'goal')))) {
    PYLIB.LoopChecker.check();
    PYLIB.print(" --- ");
    __top.a=PYLIB.wrap(PYLIB.checkSet(__top.a,'a')).__add__(PYLIB.checkSet(__top.random,'random').__getattribute__('randint')(1,6));
    __top.b=PYLIB.wrap(PYLIB.checkSet(__top.b,'b')).__add__(PYLIB.checkSet(__top.random,'random').__getattribute__('randint')(1,6));
    PYLIB.print(PYLIB.wrap(PYLIB.wrap("a:").__add__(PYLIB.wrap(">").__mul__(PYLIB.checkSet(__top.a,'a')))).__add__("@"));
    PYLIB.print(PYLIB.wrap(PYLIB.wrap("b:").__add__(PYLIB.wrap(">").__mul__(PYLIB.checkSet(__top.b,'b')))).__add__("@"));
    PYLIB.checkSet(__top.time,'time').__getattribute__('sleep')(1);
  }
  
  if (PYLIB.wrap(PYLIB.checkSet(__top.a,'a')).__eq__(PYLIB.checkSet(__top.b,'b'))) {
    PYLIB.LoopChecker.check();
    __top.winner="同時";
  }else if (PYLIB.wrap(PYLIB.checkSet(__top.a,'a')).__gt__(PYLIB.checkSet(__top.b,'b'))) {
    PYLIB.LoopChecker.check();
    __top.winner="a";
  }else {
    PYLIB.LoopChecker.check();
    __top.winner="b";
  }
  if (PYLIB.wrap(PYLIB.checkSet(__top.winner,'winner')).__eq__(PYLIB.checkSet(__top.user,'user'))) {
    PYLIB.LoopChecker.check();
    PYLIB.print("当たり！");
  }else {
    PYLIB.LoopChecker.check();
    PYLIB.print("はずれ");
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
