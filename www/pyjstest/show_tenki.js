define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.url="http://weather.livedoor.com/forecast/webservice/json/v1";
  __top.url=(__top.url).__iadd__("?city=130010")
  
  
  __top.req=require('http://localhost/runtime/lib/python/py_urllib,request.js').install(PYLIB);
  __top.res=__top.req.__getattribute__('urlopen')(__top.url);
  __top.json_data=__top.res.__getattribute__('read')();
  
  
  __top.json=require('http://localhost/runtime/lib/python/py_json.js').install(PYLIB);
  __top.data=__top.json.__getattribute__('loads')(__top.json_data);
  
  
  for (__top.row of __top.data.__getitem__("forecasts")) {
    PYLIB.LoopChecker.check();
    __top.label=__top.row.__getitem__("dateLabel");
    __top.telop=__top.row.__getitem__("telop");
    PYLIB.print(((__top.label).__add__(" : ")).__add__(__top.telop));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
