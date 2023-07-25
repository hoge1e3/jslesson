define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  __top.datetime=require('http://localhost/runtime/lib/python/py_datetime.js').install(PYLIB);
  
  
  __top.calc_days=function (y,m,d){
    let olympic,target,days,s;
    olympic=__top.datetime.__getattribute__('date')(2020,7,24);
    target=__top.datetime.__getattribute__('date')(y,m,d);
    days=((olympic).__sub__(target)).__getattribute__('days');
    s=(((((__top.str(y)).__add__("/")).__add__(__top.str(m))).__add__("/")).__add__(__top.str(d))).__add__("から");
    PYLIB.print(((s).__add__(__top.str(days))).__add__("日後"));
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
