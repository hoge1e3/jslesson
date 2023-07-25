define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=Object.create(PYLIB);
  PYLIB.LoopChecker.reset();
  
  __top.url="http://weather.livedoor.com/forecast/webservice/json/v1";
  __top.url=PYLIB.wrap(__top.url).__iadd__("?city=130010")
  
  
  var req=require('http://localhost/runtime/lib/python/py_urllib,request.js').install(PYLIB);
  __top.res=PYLIB.checkSet(__top.req,'req').__getattribute__('urlopen')(PYLIB.checkSet(__top.url,'url'));
  __top.json_data=PYLIB.checkSet(__top.res,'res').__getattribute__('read')();
  
  
  var json=require('http://localhost/runtime/lib/python/py_json.js').install(PYLIB);
  __top.data=PYLIB.checkSet(__top.json,'json').__getattribute__('loads')(PYLIB.checkSet(__top.json_data,'json_data'));
  
  
  var PYLIB.checkSet(__top.row,'row');
  for (PYLIB.checkSet(__top.row,'row') of PYLIB.checkSet(__top.data,'data').__getitem__("forecasts")) {
    PYLIB.LoopChecker.check();
    __top.label=PYLIB.checkSet(__top.row,'row').__getitem__("dateLabel");
    __top.telop=PYLIB.checkSet(__top.row,'row').__getitem__("telop");
    PYLIB.print(PYLIB.wrap(PYLIB.wrap(PYLIB.checkSet(__top.label,'label')).__add__(" : ")).__add__(PYLIB.checkSet(__top.telop,'telop')));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
