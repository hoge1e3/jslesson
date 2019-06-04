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
  
  var menu_dict={"洋風カレー":900,"オムライス":870,"ラザニア":790,"ハンバーグ定食":920,"トマトパスタ":720};
  
  
  var math=require('http://localhost/runtime/lib/python/py_math.js').install(PYLIB);
  var key;
  for (key of menu_dict) {
    PYLIB.LoopChecker.check();
    var v1=menu_dict[key];
    var v2=math.ceil(PYLIB.wrap(v1).__mul__(1.3));
    PYLIB.print((PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(key).__add__(" : ")).__add__(str(v1))).__add__("→")).__add__(str(v2))).__add__("円")));
  }
});
requirejs(['__main__'],function(){});
