define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=PYLIB.moduleScope(PYLIB, false);
  PYLIB.LoopChecker.reset();
  
  __top.menu_dict={"洋風カレー":900,"オムライス":870,"ラザニア":790,"ハンバーグ定食":920,"トマトパスタ":720};
  
  
  __top.math=require('http://localhost/runtime/lib/python/py_math.js').install(PYLIB);
  for (__top.key of __top.menu_dict) {
    PYLIB.LoopChecker.check();
    __top.v1=__top.menu_dict.__getitem__(__top.key);
    __top.v2=__top.math.__getattribute__('ceil')((__top.v1).__mul__(1.3));
    PYLIB.print((((((__top.key).__add__(" : ")).__add__(__top.str(__top.v1))).__add__("→")).__add__(__top.str(__top.v2))).__add__("円"));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
