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
  var tomato=530;
  var cheese=750;
  var tofu=99;
  var total=PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(tomato).__mul__(3)).__add__(PYLIB.wrap(cheese).__mul__(2))).__add__(PYLIB.wrap(tofu).__mul__(5));
  var price=PYLIB.wrap(total).__mul__(0.8);
  PYLIB.print((price));
});
requirejs(['__main__'],function(){});
