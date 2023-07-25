define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.yubin_api="http://api.aoikujira.com/zip/json/";
  
  
  __top.get_json=function (url){
    let req,json,res,json_data;
    req=require('http://localhost/runtime/lib/python/py_urllib,request.js').install(PYLIB);json=require('http://localhost/runtime/lib/python/py_json.js').install(PYLIB);
    res=req.__getattribute__('urlopen')(url);
    json_data=res.__getattribute__('read')();
    return json.__getattribute__('loads')(json_data);
  };
  
  
  __top.get_addr=function (zip_code){
    let url,a;
    url=(__top.yubin_api).__add__(zip_code);
    a=__top.get_json(url);
    return ((a.__getitem__("state")).__add__(a.__getitem__("city"))).__add__(a.__getitem__("address"));
    
  };
  
  if ((__top.__name__).__eq__("__main__")) {
    PYLIB.LoopChecker.check();
    PYLIB.print(__top.get_addr("110-0006"));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
