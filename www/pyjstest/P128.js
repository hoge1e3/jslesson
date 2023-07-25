define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.linsearch=function (a,p){
    let i;
    for (i of __top.range(0,__top.len(a),1)) {
      PYLIB.LoopChecker.check();
      if ((a.__getitem__(i)).__eq__(p)) {
        PYLIB.LoopChecker.check();
        PYLIB.print(i,"番目に 見つかりました ");
        break;
      }
    }
  };
  __top.a=[61,15,82,77,21,32,53];
  __top.p=82;
  __top.linsearch(__top.a,__top.p);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
