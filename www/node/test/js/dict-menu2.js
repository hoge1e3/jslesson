define('__main__',function (require,exports,module) {
  var PYLIB=require('http://localhost/runtime/lib/python/PyLib.js');
  var __top=Object.create(PYLIB);
  PYLIB.LoopChecker.reset();
  
  __top.menu_dict={"洋風カレー":900,"オムライス":870,"ラザニア":790,"ハンバーグ定食":920,"トマトパスタ":720};
  
  var math=require('http://localhost/runtime/lib/python/py_math.js').install(PYLIB);
  var PYLIB.checkSet(__top.key,'key'),PYLIB.checkSet(__top.v1,'v1');
  for (PYLIB.checkSet(__top.key,'key') of PYLIB.checkSet(__top.menu_dict,'menu_dict').__getattribute__('items')()) {
    PYLIB.LoopChecker.check();
    __top.v2=PYLIB.checkSet(__top.math,'math').__getattribute__('ceil')(PYLIB.wrap(PYLIB.checkSet(__top.v1,'v1')).__mul__(1.3));
    PYLIB.print(PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.wrap(PYLIB.checkSet(__top.key,'key')).__add__(" : ")).__add__(PYLIB.checkSet(__top.str,'str')(PYLIB.checkSet(__top.v1,'v1')))).__add__("→")).__add__(PYLIB.checkSet(__top.str,'str')(PYLIB.checkSet(__top.v2,'v2')))).__add__("円"));
  }
});
requirejs(['__main__'],function(){
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }});
