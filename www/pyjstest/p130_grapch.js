define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.np=require('http://localhost/runtime/lib/python/py_numpy.js').install(PYLIB);
  __top.rd=require('http://localhost/runtime/lib/python/py_numpy,random.js').install(PYLIB);
  __top.plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  
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
  
  
  
  for (__top.n of __top.range(5,15)) {
    PYLIB.LoopChecker.check();
    __top.a=__top.rd.__getattribute__('randint')(1,100,__top.n);
    PYLIB.print(" ソート前 ",__top.a);
    __top.selectionsort(__top.a);
    PYLIB.print(" ソート後 ",__top.a);
    PYLIB.print("並び替え ",__top.swc);
    __top.plt.__getattribute__('scatter')(__top.n,__top.swc,PYLIB.opt({color:"blue"}));
    
  }__top.plt.__getattribute__('show')();
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
