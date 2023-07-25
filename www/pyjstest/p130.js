define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.swc=0;
  __top.selectionsort=function (a){
    let swc,i,j,temp;
    
    for (i of __top.range(0,__top.len(a),1)) {
      PYLIB.LoopChecker.check();
      for (j of __top.range((i).__add__(1),__top.len(a),1)) {
        PYLIB.LoopChecker.check();
        if ((a.__getitem__(j)).__lt__(a.__getitem__(i))) {
          PYLIB.LoopChecker.check();
          __top.swc=(__top.swc).__iadd__(1)
          temp=a.__getitem__(i);
          a.__setitem__(i, a.__getitem__(j));
          a.__setitem__(j, temp);
        }
      }
    }
  };
  
  
  
  __top.a=[7,22,11,34,17,52,26,13,40,20,10,5,16,8,4,2,1];
  
  PYLIB.print(" ソート前 ",__top.a);
  __top.selectionsort(__top.a);
  PYLIB.print(" ソート後 ",__top.a);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
