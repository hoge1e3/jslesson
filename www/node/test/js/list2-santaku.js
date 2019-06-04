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
  
  
  var quiz_list=[["夏目漱石の本名は？","石男","浩介","金之助",3],["野口英世が亡くなった場所は？","福島","ガーナ","パリ",2],["福澤諭吉が広めたものは？","カレー","電灯","天ぷら",1],["樋口一葉が書いた小説は？","双葉","十三夜","歌世界",2]];
  
  
  var random=require('http://localhost/runtime/lib/python/py_random.js').install(PYLIB);
  random.shuffle(quiz_list);
  
  
  var quiz;
  for (quiz of quiz_list) {
    PYLIB.LoopChecker.check();
    PYLIB.print(("[問題]"));
    PYLIB.print((quiz[0]));
    
    var i;
    for (i of range(3)) {
      PYLIB.LoopChecker.check();
      var no=PYLIB.wrap(i).__add__(1);
      PYLIB.print((PYLIB.wrap(PYLIB.wrap(str(no)).__add__(": ")).__add__(quiz[no])));
    }
    var user=int(input("答えは? "));
    
    var ans=quiz[4];
    if (PYLIB.wrap(user).__eq__(ans)) {
      PYLIB.LoopChecker.check();
      PYLIB.print(("正解！"));
    }else {
      PYLIB.LoopChecker.check();
      PYLIB.print((PYLIB.wrap("ハズレ ... 答えは ").__add__(quiz[ans])));
    }PYLIB.print((" --- "));
  }
});
requirejs(['__main__'],function(){});
