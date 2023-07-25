define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.listsum=function (a){
    let sum,i;
    sum=0;
    for (i of __top.range(0,__top.len(a),1)) {
      PYLIB.LoopChecker.check();
      sum=(sum).__add__(a.__getitem__(i));
    }return sum;
  };
  __top.a=[56,3,62,17,87,22,36,83,21,12];
  __top.sum=__top.listsum(__top.a);
  PYLIB.print(__top.sum);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
