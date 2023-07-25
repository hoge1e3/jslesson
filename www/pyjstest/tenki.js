define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  
  __top.get_json=function (url){
    let req,json,res,json_data;
    req=require('http://localhost/runtime/lib/python/py_urllib,request.js').install(PYLIB);
    json=require('http://localhost/runtime/lib/python/py_json.js').install(PYLIB);
    
    res=req.__getattribute__('urlopen')(url);
    json_data=res.__getattribute__('read')();
    
    return json.__getattribute__('loads')(json_data);
  };
  
  
  __top.get_weather=function (city_id){
    let url,data,s,row,label,telop;
    url="http://weather.livedoor.com/forecast/webservice/json/v1";
    url=(url).__iadd__(("?city=").__add__(__top.str(city_id)))
    data=__top.get_json(url);
    s="";
    for (row of data.__getitem__("forecasts")) {
      PYLIB.LoopChecker.check();
      label=row.__getitem__("dateLabel");
      telop=row.__getitem__("telop");
      s=(s).__iadd__((((label).__add__(" : ")).__add__(telop)).__add__("\n"))
    }return s;
  };
  
  
  if ((__top.__name__).__eq__("__main__")) {
    PYLIB.LoopChecker.check();
    __top.res=__top.get_weather(130010);
    PYLIB.print(__top.res);
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
