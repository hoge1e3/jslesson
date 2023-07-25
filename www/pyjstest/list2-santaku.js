define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  
  __top.quiz_list=[["夏目漱石の本名は？","石男","浩介","金之助",3],["野口英世が亡くなった場所は？","福島","ガーナ","パリ",2],["福澤諭吉が広めたものは？","カレー","電灯","天ぷら",1],["樋口一葉が書いた小説は？","双葉","十三夜","歌世界",2]];
  
  
  __top.random=require('http://localhost/runtime/lib/python/py_random.js').install(PYLIB);
  __top.random.__getattribute__('shuffle')(__top.quiz_list);
  
  
  for (__top.quiz of __top.quiz_list) {
    PYLIB.LoopChecker.check();
    PYLIB.print("[問題]");
    PYLIB.print(__top.quiz.__getitem__(0));
    
    for (__top.i of __top.range(3)) {
      PYLIB.LoopChecker.check();
      __top.no=(__top.i).__add__(1);
      PYLIB.print(((__top.str(__top.no)).__add__(": ")).__add__(__top.quiz.__getitem__(__top.no)));
    }
    __top.user=__top.int(__top.input("答えは? "));
    
    __top.ans=__top.quiz.__getitem__(4);
    if ((__top.user).__eq__(__top.ans)) {
      PYLIB.LoopChecker.check();
      PYLIB.print("正解！");
    }else {
      PYLIB.LoopChecker.check();
      PYLIB.print(("ハズレ ... 答えは ").__add__(__top.quiz.__getitem__(__top.ans)));
    }PYLIB.print(" --- ");
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
