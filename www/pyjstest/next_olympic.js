define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.show_next_olympic=function (year){
    let i,year2,s;
    i=(4).__sub__((year).__mod__(4));
    year2=(year).__add__(i);
    
    s="{0}年の次のオリンピックは{1}年".__getattribute__('format')(year,year2);
    PYLIB.print(s);
  };
  
  
  __top.show_next_olympic(2016);
  __top.show_next_olympic(2018);
  __top.show_next_olympic(2020);
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
