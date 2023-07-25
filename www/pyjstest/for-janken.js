define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.random=require('http://localhost/runtime/lib/python/py_random.js').install(PYLIB);
  
  
  __top.win=0;
  __top.draw=0;
  
  
  for (__top.i of __top.range(3)) {
    PYLIB.LoopChecker.check();
    PYLIB.print((("■じゃんけん").__add__(__top.str((__top.i).__add__(1)))).__add__("回目"));
    PYLIB.print("> 0:グー、1:チョキ、2:パー");
    
    __top.com=__top.random.__getattribute__('randint')(0,2);
    
    __top.you=__top.int(__top.input("あなたの手は? "));
    
    PYLIB.print(("コンピュータの手=").__add__(__top.str(__top.com)));
    
    __top.n=((((__top.com).__sub__(__top.you)).__add__(3))).__mod__(3);
    if ((__top.n).__eq__(0)) {
      PYLIB.LoopChecker.check();
      PYLIB.print("→あいこ");
      __top.draw=(__top.draw).__add__(1);
    }else if ((__top.n).__eq__(1)) {
      PYLIB.LoopChecker.check();
      PYLIB.print("→勝ち (^v^)y");
      __top.win=(__top.win).__add__(1);
    }else {
      PYLIB.LoopChecker.check();
      PYLIB.print("→負け (ToT)m");
    }PYLIB.print("---");
  }
  
  PYLIB.print((((("結果=3戦").__add__(__top.str(__top.win))).__add__("勝")).__add__(__top.str(__top.draw))).__add__("引分"));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
