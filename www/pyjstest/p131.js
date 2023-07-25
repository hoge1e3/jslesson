define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.quicksort=function (a,start,end){
    let m,i,j,temp;
    m=__top.int((((start).__add__(end))).__div__(2));
    i=start;
    j=end;
    while (((i).__lt__(j))) {
      PYLIB.LoopChecker.check();
      while ((a.__getitem__(i)).__lt__(a.__getitem__(m))) {
        PYLIB.LoopChecker.check();
        i=(i).__add__(1);
      }while ((a.__getitem__(j)).__gt__(a.__getitem__(m))) {
        PYLIB.LoopChecker.check();
        j=(j).__sub__(1);
      }if ((i).__ge__(j)) {
        PYLIB.LoopChecker.check();
        break;
      }temp=a.__getitem__(i);
      a.__setitem__(i, a.__getitem__(j));
      a.__setitem__(j, temp);
      if ((i).__eq__(m)) {
        PYLIB.LoopChecker.check();
        m=j;
      }else if ((j).__eq__(m)) {
        PYLIB.LoopChecker.check();
        m=i;
      }i=(i).__add__(1);
      j=(j).__sub__(1);
    }if ((start).__lt__((i).__sub__(1))) {
      PYLIB.LoopChecker.check();
      __top.quicksort(a,start,(m).__sub__(1));
    }if ((end).__gt__((j).__add__(1))) {
      PYLIB.LoopChecker.check();
      __top.quicksort(a,(m).__add__(1),end);
    }
  };
  
  __top.a=[7,22,11,34,17,52,26,13,40,20,10,5,16,8,4,2,1];
  PYLIB.print(" ソート前 ",__top.a);
  __top.quicksort(__top.a,0,(__top.len(__top.a)).__sub__(1));
  PYLIB.print(" ソート後 ",__top.a);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
