define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.name=__top.input("名前は？");
  __top.age=__top.input("年齢は？");
  __top.hobby=__top.input("趣味は？");
  __top.nickname=__top.input("みんなからなんて呼ばれたい？");
  
  __top.s1=(("はじめまして。").__add__(__top.name)).__add__("と言います。\n");
  __top.s2=(((("年齢は").__add__(__top.age)).__add__("才で、趣味は")).__add__(__top.hobby)).__add__("です。\n");
  __top.s3=(("ぜひ、").__add__(__top.nickname)).__add__("と呼んでください。\n");
  __top.s4="みんなと仲良くなりたいです。";
  PYLIB.print("--------");
  PYLIB.print((((__top.s1).__add__(__top.s2)).__add__(__top.s3)).__add__(__top.s4));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
