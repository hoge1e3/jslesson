define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.random=require('http://localhost/runtime/lib/python/py_random.js').install(PYLIB);
  __top.time=require('http://localhost/runtime/lib/python/py_time.js').install(PYLIB);
  
  
  __top.a=0;
  __top.b=0;
  __top.goal=20;
  
  __top.user=__top.input("aとbのどちらのカメが勝つか？");
  
  
  PYLIB.print("競争開始！");
  
  while (((__top.a).__lt__(__top.goal)) && ((__top.b).__lt__(__top.goal))) {
    PYLIB.LoopChecker.check();
    PYLIB.print(" --- ");
    __top.a=(__top.a).__add__(__top.random.__getattribute__('randint')(1,6));
    __top.b=(__top.b).__add__(__top.random.__getattribute__('randint')(1,6));
    PYLIB.print((("a:").__add__((">").__mul__(__top.a))).__add__("@"));
    PYLIB.print((("b:").__add__((">").__mul__(__top.b))).__add__("@"));
    __top.time.__getattribute__('sleep')(1);
  }
  
  if ((__top.a).__eq__(__top.b)) {
    PYLIB.LoopChecker.check();
    __top.winner="同時";
  }else if ((__top.a).__gt__(__top.b)) {
    PYLIB.LoopChecker.check();
    __top.winner="a";
  }else {
    PYLIB.LoopChecker.check();
    __top.winner="b";
  }
  if ((__top.winner).__eq__(__top.user)) {
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
