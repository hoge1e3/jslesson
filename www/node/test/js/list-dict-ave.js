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
  
  var test_list=[{"名前":"田中","国語":80,"算数":45,"社会":90},{"名前":"鈴川","国語":62,"算数":70,"社会":58},{"名前":"早川","国語":77,"算数":69,"社会":74}];
  
  var total=0;
  var p;
  for (p of test_list) {
    PYLIB.LoopChecker.check();
    total=PYLIB.wrap(total).__add__(p["国語"]);
  }var ave=PYLIB.wrap(total).__div__(len(test_list));
  PYLIB.print((ave));
});
requirejs(['__main__'],function(){});
