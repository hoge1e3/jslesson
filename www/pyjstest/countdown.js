define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.datetime=require('http://localhost/runtime/lib/python/py_datetime.js').install(PYLIB);
  
  
  __top.calc_days=function (y,m,d){
    let olympic,target,perday,days,s;
    
    olympic=__top.datetime.__getattribute__('datetime')(2020,7,24).__getattribute__('timestamp')();
    target=__top.datetime.__getattribute__('datetime')(y,m,d).__getattribute__('timestamp')();
    
    perday=((24).__mul__(60)).__mul__(60);
    days=(((olympic).__sub__(target))).__floordiv__(perday);
    
    s="{0}/{1}/{2}から{3}日後".__getattribute__('format')(y,m,d,__top.int(days));
    PYLIB.print(s);
  };
  
  
  __top.calc_days(2017,12,1);
  __top.calc_days(2018,3,1);
  
  
  __top.t=__top.datetime.__getattribute__('date').__getattribute__('today')();
  __top.calc_days(__top.t.__getattribute__('year'),__top.t.__getattribute__('month'),__top.t.__getattribute__('day'));
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
