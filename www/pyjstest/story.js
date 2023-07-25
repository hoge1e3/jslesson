define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.name=__top.input("お名前は?");
  __top.s1=(("これは、勇者").__add__(__top.name)).__add__("の物語だ。\n");
  __top.s2=(("ある日、").__add__(__top.name)).__add__("が歩いていると...\n");
  __top.s3="盗賊が現れた！\n";
  __top.s4=(("しかし、").__add__(__top.name)).__add__("は強かったので撃退した。\n");
  PYLIB.print((((__top.s1).__add__(__top.s2)).__add__(__top.s3)).__add__(__top.s4));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
