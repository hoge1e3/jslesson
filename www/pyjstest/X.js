define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.g=require('http://localhost/runtime/lib/python/py_g.js').install(PYLIB);
  
  __top.g.__getattribute__('drawGrid')();
  for (__top.i of __top.range(10)) {
    PYLIB.LoopChecker.check();
    __top.g.__getattribute__('fillRect')((__top.i).__mul__(20),30,10,50);
  }__top.x=10;
  __top.y=10;
  
  __top.move=function (){
    let x,y;
    
    __top.g.__getattribute__('clear')();
    __top.g.__getattribute__('fillRect')(__top.x,__top.y,50,50);
    if (__top.g.__getattribute__('getkey')("right")) {
      PYLIB.LoopChecker.check();
      __top.x=(__top.x).__iadd__(1)
    }if (__top.g.__getattribute__('getkey')("left")) {
      PYLIB.LoopChecker.check();
      __top.x=(__top.x).__isub__(1)
    }if ((__top.x).__lt__(100)) {
      PYLIB.LoopChecker.check();
      __top.g.__getattribute__('setTimeout')(__top.move,10);
    }else {
      PYLIB.LoopChecker.check();
      __top.g.__getattribute__('setTimeout')(__top.gov,10);
    }
  };
  __top.gov=function (){
    let x,y;
    
    __top.g.__getattribute__('clear')();
    __top.g.__getattribute__('fillRect')(__top.x,__top.y,50,50);
    __top.y=(__top.y).__iadd__(10)
    if ((__top.y).__lt__(300)) {
      PYLIB.LoopChecker.check();
      __top.g.__getattribute__('setTimeout')(__top.gov,10);
    }
  };
  
  
  __top.g.__getattribute__('setTimeout')(__top.move,10);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
