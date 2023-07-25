define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  
  
  
  
  
  
  __top.x=PYLIB.Tuple([3]);
  PYLIB.print(__top.x);
  __top.x=PYLIB.Tuple([3]);
  PYLIB.print(__top.x);
  
  __top.x=PYLIB.Tuple([3,5]);
  PYLIB.print(__top.x);
  __top.x=PYLIB.Tuple([3,5]);
  PYLIB.print(__top.x);
  __top.x=(PYLIB.Tuple([3,5]));
  PYLIB.print(__top.x);
  __top.x=PYLIB.Tuple([3,5]);
  PYLIB.print(__top.x);
  
  
  [__top.x,__top.y]=PYLIB.Tuple([3,5]);
  PYLIB.print(__top.x,__top.y);
  [__top.x,__top.y]=PYLIB.Tuple([3,5]);
  PYLIB.print(__top.x,__top.y);
  [__top.x,__top.y]=PYLIB.Tuple([3,5]);
  PYLIB.print(__top.x,__top.y);
  [__top.x,__top.y]=PYLIB.Tuple([3,5]);
  PYLIB.print(__top.x,__top.y);
  
  
  [__top.x,__top.y]=PYLIB.Tuple([3,5]);
  PYLIB.print(__top.x,__top.y);
  [__top.x,__top.y]=(PYLIB.Tuple([3,5]));
  PYLIB.print(__top.x,__top.y);
  [__top.x,__top.y]=(PYLIB.Tuple([3,5]));
  PYLIB.print(__top.x,__top.y);
  [__top.x,__top.y]=PYLIB.Tuple([3,5]);
  PYLIB.print(__top.x,__top.y);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
