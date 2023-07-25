define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.re=require('http://localhost/runtime/lib/python/py_re.js').install(PYLIB);
  __top.plt=require('http://localhost/runtime/lib/python/py_matplotlib,pyplot.js').install(PYLIB);
  
  __top.f=__top.open("class/scatter.txt");
  __top.Xs=[];
  __top.Ys=[];
  for (__top.line of __top.f) {
    PYLIB.LoopChecker.check();
    __top.line=__top.re.__getattribute__('sub')(/\n/,"",__top.line);
    
    [__top.x,__top.y]=__top.line.__getattribute__('split')("\t");
    
    __top.plt.__getattribute__('scatter')(__top.int(__top.x),__top.int(__top.y));
    __top.Xs.__getattribute__('append')(__top.int(__top.x));
    __top.Ys.__getattribute__('append')(__top.int(__top.y));
  }__top.f.__getattribute__('close');
  __top.plt.__getattribute__('show')();
  __top.plt.__getattribute__('clf')();
  
  __top.plt.__getattribute__('plot')(__top.Xs,__top.Ys);
  
  __top.plt.__getattribute__('show')();
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
