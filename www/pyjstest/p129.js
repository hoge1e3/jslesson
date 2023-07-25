define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.binsearch=function (a,p){
    let i,j,m;
    i=0;
    j=(__top.len(a)).__sub__(1);
    while ((i).__le__(j)) {
      PYLIB.LoopChecker.check();
      m=__top.int((((i).__add__(j))).__div__(2));
      if ((a.__getitem__(m)).__eq__(p)) {
        PYLIB.LoopChecker.check();
        PYLIB.print(m,"番目に 見つかりました ");
        break;
      }else {
        PYLIB.LoopChecker.check();
        if ((a.__getitem__(m)).__gt__(p)) {
          PYLIB.LoopChecker.check();
          j=(m).__sub__(1);
        }else {
          PYLIB.LoopChecker.check();
          i=(m).__add__(1);
        }
      }
    }
  };
  
  __top.a=[25,33,43,51,66,71,88];
  __top.p=43;
  __top.binsearch(__top.a,__top.p);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
