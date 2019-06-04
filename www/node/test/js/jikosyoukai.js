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
  
  var name=input("名前は？");
  var age=input("年齢は？");
  var hobby=input("趣味は？");
  var nickname=input("みんなからなんて呼ばれたい？");
  
  var s1=PYLIB.wrap(PYLIB.wrap("はじめまして。").__add__(name)).__add__("と言います。\n");
  var s2=PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.wrap("年齢は").__add__(age)).__add__("才で、趣味は")).__add__(hobby)).__add__("です。\n");
  var s3=PYLIB.wrap(PYLIB.wrap("ぜひ、").__add__(nickname)).__add__("と呼んでください。\n");
  var s4="みんなと仲良くなりたいです。";
  PYLIB.print(("--------"));
  PYLIB.print((PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(s1).__add__(s2)).__add__(s3)).__add__(s4)));
});
requirejs(['__main__'],function(){});
