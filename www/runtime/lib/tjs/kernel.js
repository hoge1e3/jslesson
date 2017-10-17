Tonyu.klass.define({
  fullName: 'jslker.Parent',
  shortName: 'Parent',
  namespace: 'jslker',
  includes: [],
  methods: {
    main :function _trc_Parent_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Parent_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __getter__Math :function _trc_Parent___getter__Math() {
      "use strict";
      var _this=this;
      
      return window.Math;
    },
    __getter__document :function _trc_Parent___getter__document() {
      "use strict";
      var _this=this;
      
      return window.document;
    },
    setInterval :function _trc_Parent_setInterval(f,t) {
      "use strict";
      var _this=this;
      
      return window.setInterval(_this.catchException(f),t);
    },
    fiber$setInterval :function _trc_Parent_f_setInterval(_thread,f,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=window.setInterval(_this.catchException(f),t);return;
      
      
      _thread.retVal=_this;return;
    },
    setTimeout :function _trc_Parent_setTimeout(f,t) {
      "use strict";
      var _this=this;
      
      return window.setTimeout(_this.catchException(f),t);
    },
    fiber$setTimeout :function _trc_Parent_f_setTimeout(_thread,f,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=window.setTimeout(_this.catchException(f),t);return;
      
      
      _thread.retVal=_this;return;
    },
    catchException :function _trc_Parent_catchException(f) {
      "use strict";
      var _this=this;
      
      return (function anonymous_414() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000564;//jslker.Parent:564
          window.onerror("","","","",e);
          
        }
      });
    },
    fiber$catchException :function _trc_Parent_f_catchException(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(function anonymous_414() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000564;//jslker.Parent:564
          window.onerror("","","","",e);
          
        }
      });return;
      
      
      _thread.retVal=_this;return;
    },
    findElement :function _trc_Parent_findElement(elem) {
      "use strict";
      var _this=this;
      var res;
      
      $LASTPOS=1000644;//jslker.Parent:644
      if (elem instanceof $) {
        return elem;
      }
      $LASTPOS=1000685;//jslker.Parent:685
      res = $("[name="+elem+"]");
      
      $LASTPOS=1000720;//jslker.Parent:720
      if (res[0]) {
        return res;
      }
      return $("#"+elem);
    },
    fiber$findElement :function _trc_Parent_f_findElement(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      $LASTPOS=1000644;//jslker.Parent:644
      if (elem instanceof $) {
        _thread.retVal=elem;return;
        
      }
      $LASTPOS=1000685;//jslker.Parent:685
      res = $("[name="+elem+"]");
      
      $LASTPOS=1000720;//jslker.Parent:720
      if (res[0]) {
        _thread.retVal=res;return;
        
      }
      _thread.retVal=$("#"+elem);return;
      
      
      _thread.retVal=_this;return;
    },
    isFormElement :function _trc_Parent_isFormElement(elem) {
      "use strict";
      var _this=this;
      var t;
      
      $LASTPOS=1000801;//jslker.Parent:801
      elem=_this.findElement(elem);
      $LASTPOS=1000830;//jslker.Parent:830
      if (! elem[0]) {
        return false;
      }
      $LASTPOS=1000863;//jslker.Parent:863
      t = (""+elem[0].tagName).toLowerCase();
      
      return t==="input"||t==="textarea";
    },
    fiber$isFormElement :function _trc_Parent_f_isFormElement(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      
      _thread.enter(function _trc_Parent_ent_isFormElement(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000801;//jslker.Parent:801
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1000830;//jslker.Parent:830
            if (!(! elem[0])) { __pc=2     ; break; }
            _thread.exit(false);return;
          case 2     :
            
            $LASTPOS=1000863;//jslker.Parent:863
            t = (""+elem[0].tagName).toLowerCase();
            
            _thread.exit(t==="input"||t==="textarea");return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    clearContent :function _trc_Parent_clearContent(elem) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000979;//jslker.Parent:979
      elem=_this.findElement(elem);
      $LASTPOS=1001008;//jslker.Parent:1008
      if (_this.isFormElement(elem)) {
        $LASTPOS=1001044;//jslker.Parent:1044
        elem.val("");
        
      } else {
        $LASTPOS=1001081;//jslker.Parent:1081
        elem.empty();
        
      }
    },
    fiber$clearContent :function _trc_Parent_f_clearContent(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_clearContent(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000979;//jslker.Parent:979
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001008;//jslker.Parent:1008
            if (_this.isFormElement(elem)) {
              $LASTPOS=1001044;//jslker.Parent:1044
              elem.val("");
              
            } else {
              $LASTPOS=1001081;//jslker.Parent:1081
              elem.empty();
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    addText :function _trc_Parent_addText(elem,val) {
      "use strict";
      var _this=this;
      var dst;
      
      $LASTPOS=1001131;//jslker.Parent:1131
      elem=_this.findElement(elem);
      $LASTPOS=1001160;//jslker.Parent:1160
      if (_this.isFormElement(elem)) {
        $LASTPOS=1001196;//jslker.Parent:1196
        elem.val(elem.val()+val);
        
      } else {
        $LASTPOS=1001248;//jslker.Parent:1248
        if (_this.document.baWriteTo) {
          $LASTPOS=1001287;//jslker.Parent:1287
          dst = elem[0];
          
          $LASTPOS=1001317;//jslker.Parent:1317
          if (dst) {
            $LASTPOS=1001326;//jslker.Parent:1326
            _this.document.baWriteTo(dst,val);
          }
          
        } else {
          $LASTPOS=1001387;//jslker.Parent:1387
          elem.append(val);
          
        }
        
      }
    },
    fiber$addText :function _trc_Parent_f_addText(_thread,elem,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var dst;
      
      
      _thread.enter(function _trc_Parent_ent_addText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001131;//jslker.Parent:1131
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001160;//jslker.Parent:1160
            if (_this.isFormElement(elem)) {
              $LASTPOS=1001196;//jslker.Parent:1196
              elem.val(elem.val()+val);
              
            } else {
              $LASTPOS=1001248;//jslker.Parent:1248
              if (_this.document.baWriteTo) {
                $LASTPOS=1001287;//jslker.Parent:1287
                dst = elem[0];
                
                $LASTPOS=1001317;//jslker.Parent:1317
                if (dst) {
                  $LASTPOS=1001326;//jslker.Parent:1326
                  _this.document.baWriteTo(dst,val);
                }
                
              } else {
                $LASTPOS=1001387;//jslker.Parent:1387
                elem.append(val);
                
              }
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    setText :function _trc_Parent_setText(elem,val) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001452;//jslker.Parent:1452
      _this.clearContent(elem);
      $LASTPOS=1001477;//jslker.Parent:1477
      _this.addText(elem,val);
    },
    fiber$setText :function _trc_Parent_f_setText(_thread,elem,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_setText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001452;//jslker.Parent:1452
            _this.fiber$clearContent(_thread, elem);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1001477;//jslker.Parent:1477
            _this.fiber$addText(_thread, elem, val);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getNumber :function _trc_Parent_getNumber(elem) {
      "use strict";
      var _this=this;
      
      return _this.getText(elem)-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.getText(elem)-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001572;//jslker.Parent:1572
      elem=_this.findElement(elem);
      $LASTPOS=1001601;//jslker.Parent:1601
      if (_this.isFormElement(elem)) {
        return elem.val();
        
      } else {
        return elem[0]&&elem[0].innerHTML;
        
      }
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_getText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001572;//jslker.Parent:1572
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001601;//jslker.Parent:1601
            if (!(_this.isFormElement(elem))) { __pc=2     ; break; }
            _thread.exit(elem.val());return;
            __pc=3     ;break;
          case 2     :
            _thread.exit(elem[0]&&elem[0].innerHTML);return;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001754;//jslker.Parent:1754
      _this.setText(elem,num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_setNumber(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001754;//jslker.Parent:1754
            _this.fiber$setText(_thread, elem, num);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onClick :function _trc_Parent_onClick(elem,func) {
      "use strict";
      var _this=this;
      var usepara;
      var fname;
      
      
      $LASTPOS=1001829;//jslker.Parent:1829
      if (typeof  func=='function') {
        $LASTPOS=1001869;//jslker.Parent:1869
        if (func.methodInfo) {
          $LASTPOS=1001905;//jslker.Parent:1905
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1001979;//jslker.Parent:1979
        fname=func+"";
        
      }
      $LASTPOS=1002006;//jslker.Parent:2006
      if (typeof  fname=="string") {
        $LASTPOS=1002045;//jslker.Parent:2045
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1002112;//jslker.Parent:2112
        if (_this["fiber$"+fname]) {
          $LASTPOS=1002153;//jslker.Parent:2153
          usepara=true;
          
        }
        
      }
      $LASTPOS=1002190;//jslker.Parent:2190
      if (usepara) {
        $LASTPOS=1002214;//jslker.Parent:2214
        _this.findElement(elem).click(_this.catchException((function anonymous_2253() {
          
          $LASTPOS=1002270;//jslker.Parent:2270
          _this.parallel(fname);
        })));
        
      } else {
        $LASTPOS=1002384;//jslker.Parent:2384
        _this.findElement(elem).click(_this.catchException(func));
        
      }
    },
    fiber$onClick :function _trc_Parent_f_onClick(_thread,elem,func) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var usepara;
      var fname;
      
      
      $LASTPOS=1001829;//jslker.Parent:1829
      if (typeof  func=='function') {
        $LASTPOS=1001869;//jslker.Parent:1869
        if (func.methodInfo) {
          $LASTPOS=1001905;//jslker.Parent:1905
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1001979;//jslker.Parent:1979
        fname=func+"";
        
      }
      $LASTPOS=1002006;//jslker.Parent:2006
      if (typeof  fname=="string") {
        $LASTPOS=1002045;//jslker.Parent:2045
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1002112;//jslker.Parent:2112
        if (_this["fiber$"+fname]) {
          $LASTPOS=1002153;//jslker.Parent:2153
          usepara=true;
          
        }
        
      }
      
      _thread.enter(function _trc_Parent_ent_onClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1002190;//jslker.Parent:2190
            if (!(usepara)) { __pc=1     ; break; }
            $LASTPOS=1002214;//jslker.Parent:2214
            _this.findElement(elem).click(_this.catchException((function anonymous_2253() {
              
              $LASTPOS=1002270;//jslker.Parent:2270
              _this.parallel(fname);
            })));
            __pc=2     ;break;
          case 1     :
            {
              $LASTPOS=1002384;//jslker.Parent:2384
              _this.findElement(elem).click(_this.catchException(func));
            }
          case 2     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onTouch :function _trc_Parent_onTouch(func) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1002463;//jslker.Parent:2463
      if (typeof  func=="function") {
        $LASTPOS=1002501;//jslker.Parent:2501
        $("body").on("touchstart",(function anonymous_2527(e) {
          
          $LASTPOS=1002553;//jslker.Parent:2553
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1002684;//jslker.Parent:2684
        $("body").on("touchmove",(function anonymous_2709(e) {
          
          $LASTPOS=1002735;//jslker.Parent:2735
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002865;//jslker.Parent:2865
        $("body").on("touchend",(function anonymous_2889(e) {
          
          $LASTPOS=1002915;//jslker.Parent:2915
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1003044;//jslker.Parent:3044
        $("body").on("mousedown",(function anonymous_3069(e) {
          
          $LASTPOS=1003095;//jslker.Parent:3095
          _this.down=true;
          $LASTPOS=1003119;//jslker.Parent:3119
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1003172;//jslker.Parent:3172
        $("body").on("mousemove",(function anonymous_3197(e) {
          
          $LASTPOS=1003223;//jslker.Parent:3223
          if (_this.down) {
            $LASTPOS=1003232;//jslker.Parent:3232
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1003284;//jslker.Parent:3284
        $("body").on("mouseup",(function anonymous_3307(e) {
          
          $LASTPOS=1003333;//jslker.Parent:3333
          _this.down=false;
          $LASTPOS=1003358;//jslker.Parent:3358
          func(e.pageX,e.pageY,"end");
        }));
        
      }
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002463;//jslker.Parent:2463
      if (typeof  func=="function") {
        $LASTPOS=1002501;//jslker.Parent:2501
        $("body").on("touchstart",(function anonymous_2527(e) {
          
          $LASTPOS=1002553;//jslker.Parent:2553
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1002684;//jslker.Parent:2684
        $("body").on("touchmove",(function anonymous_2709(e) {
          
          $LASTPOS=1002735;//jslker.Parent:2735
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002865;//jslker.Parent:2865
        $("body").on("touchend",(function anonymous_2889(e) {
          
          $LASTPOS=1002915;//jslker.Parent:2915
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1003044;//jslker.Parent:3044
        $("body").on("mousedown",(function anonymous_3069(e) {
          
          $LASTPOS=1003095;//jslker.Parent:3095
          _this.down=true;
          $LASTPOS=1003119;//jslker.Parent:3119
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1003172;//jslker.Parent:3172
        $("body").on("mousemove",(function anonymous_3197(e) {
          
          $LASTPOS=1003223;//jslker.Parent:3223
          if (_this.down) {
            $LASTPOS=1003232;//jslker.Parent:3232
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1003284;//jslker.Parent:3284
        $("body").on("mouseup",(function anonymous_3307(e) {
          
          $LASTPOS=1003333;//jslker.Parent:3333
          _this.down=false;
          $LASTPOS=1003358;//jslker.Parent:3358
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003485;//jslker.Parent:3485
      _this._canvas=_this.findElement(canv)[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003485;//jslker.Parent:3485
      _this._canvas=_this.findElement(canv)[0];
      
      _thread.retVal=_this;return;
    },
    searchCanvas :function _trc_Parent_searchCanvas() {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003541;//jslker.Parent:3541
      if (! _this._canvas) {
        return _this._canvas=$("canvas")[0];
        
      } else {
        return _this._canvas;
        
      }
    },
    fiber$searchCanvas :function _trc_Parent_f_searchCanvas(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003541;//jslker.Parent:3541
      if (! _this._canvas) {
        _thread.retVal=_this._canvas=$("canvas")[0];return;
        
        
      } else {
        _thread.retVal=_this._canvas;return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    setColor :function _trc_Parent_setColor(r,g,b) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003666;//jslker.Parent:3666
      if (_this.searchCanvas()) {
        $LASTPOS=1003695;//jslker.Parent:3695
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003734;//jslker.Parent:3734
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003783;//jslker.Parent:3783
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003666;//jslker.Parent:3666
      if (_this.searchCanvas()) {
        $LASTPOS=1003695;//jslker.Parent:3695
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003734;//jslker.Parent:3734
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003783;//jslker.Parent:3783
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003861;//jslker.Parent:3861
      if (_this.searchCanvas()) {
        $LASTPOS=1003890;//jslker.Parent:3890
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003929;//jslker.Parent:3929
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003861;//jslker.Parent:3861
      if (_this.searchCanvas()) {
        $LASTPOS=1003890;//jslker.Parent:3890
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003929;//jslker.Parent:3929
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003997;//jslker.Parent:3997
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1004041;//jslker.Parent:4041
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1004087;//jslker.Parent:4087
      _this.findElement(elem).attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003997;//jslker.Parent:3997
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1004041;//jslker.Parent:4041
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1004087;//jslker.Parent:4087
      _this.findElement(elem).attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004153;//jslker.Parent:4153
      _this.findElement(elem).css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004153;//jslker.Parent:4153
      _this.findElement(elem).css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004275;//jslker.Parent:4275
      console.log(scaleX,scaleY);
      $LASTPOS=1004308;//jslker.Parent:4308
      if (! scaleX) {
        $LASTPOS=1004330;//jslker.Parent:4330
        scaleX=1;
        $LASTPOS=1004349;//jslker.Parent:4349
        scaleY=1;
        
      } else {
        $LASTPOS=1004370;//jslker.Parent:4370
        if (! scaleY) {
          $LASTPOS=1004392;//jslker.Parent:4392
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004419;//jslker.Parent:4419
      console.log(scaleX,scaleY);
      $LASTPOS=1004452;//jslker.Parent:4452
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004275;//jslker.Parent:4275
      console.log(scaleX,scaleY);
      $LASTPOS=1004308;//jslker.Parent:4308
      if (! scaleX) {
        $LASTPOS=1004330;//jslker.Parent:4330
        scaleX=1;
        $LASTPOS=1004349;//jslker.Parent:4349
        scaleY=1;
        
      } else {
        $LASTPOS=1004370;//jslker.Parent:4370
        if (! scaleY) {
          $LASTPOS=1004392;//jslker.Parent:4392
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004419;//jslker.Parent:4419
      console.log(scaleX,scaleY);
      $LASTPOS=1004452;//jslker.Parent:4452
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004616;//jslker.Parent:4616
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004616;//jslker.Parent:4616
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004749;//jslker.Parent:4749
      _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004749;//jslker.Parent:4749
      _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this;
      var t;
      var runThread;
      
      $LASTPOS=1004877;//jslker.Parent:4877
      time=time||100;
      $LASTPOS=1004898;//jslker.Parent:4898
      t = null;
      
      $LASTPOS=1004918;//jslker.Parent:4918
      runThread = _this.catchException((function anonymous_4947() {
        
        $LASTPOS=1004959;//jslker.Parent:4959
        t.steps();
        $LASTPOS=1004979;//jslker.Parent:4979
        if (t.preempted) {
          $LASTPOS=1005011;//jslker.Parent:5011
          setTimeout(runThread,0);
          
        }
      }));
      
      $LASTPOS=1005060;//jslker.Parent:5060
      t.suspend();
      $LASTPOS=1005078;//jslker.Parent:5078
      setTimeout(runThread,time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var runThread;
      
      $LASTPOS=1004877;//jslker.Parent:4877
      time=time||100;
      $LASTPOS=1004898;//jslker.Parent:4898
      t = _thread;
      
      
      _thread.enter(function _trc_Parent_ent_wait(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1004918;//jslker.Parent:4918
            _this.fiber$catchException(_thread, (function anonymous_4947() {
              
              $LASTPOS=1004959;//jslker.Parent:4959
              t.steps();
              $LASTPOS=1004979;//jslker.Parent:4979
              if (t.preempted) {
                $LASTPOS=1005011;//jslker.Parent:5011
                setTimeout(runThread,0);
                
              }
            }));
            __pc=1;return;
          case 1:
            runThread=_thread.retVal;
            
            $LASTPOS=1005060;//jslker.Parent:5060
            t.suspend();
            $LASTPOS=1005078;//jslker.Parent:5078
            setTimeout(runThread,time);
            _thread.exit(_this);return;
          }
        }
      });
    },
    rnd :function _trc_Parent_rnd(max) {
      "use strict";
      var _this=this;
      
      return _this.Math.floor(_this.Math.random()*max);
    },
    fiber$rnd :function _trc_Parent_f_rnd(_thread,max) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.floor(_this.Math.random()*max);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_Parent_setBGColor(c) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005191;//jslker.Parent:5191
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005191;//jslker.Parent:5191
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this;
      var e;
      
      $LASTPOS=1005264;//jslker.Parent:5264
      e = _this.document.createElement(elem);
      
      $LASTPOS=1005306;//jslker.Parent:5306
      e.setAttribute("name",n);
      $LASTPOS=1005338;//jslker.Parent:5338
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1005264;//jslker.Parent:5264
      e = _this.document.createElement(elem);
      
      $LASTPOS=1005306;//jslker.Parent:5306
      e.setAttribute("name",n);
      $LASTPOS=1005338;//jslker.Parent:5338
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005397;//jslker.Parent:5397
      if (_this.searchCanvas()) {
        $LASTPOS=1005426;//jslker.Parent:5426
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005465;//jslker.Parent:5465
        _this.ctx.save();
        $LASTPOS=1005486;//jslker.Parent:5486
        _this.ctx.beginPath();
        $LASTPOS=1005512;//jslker.Parent:5512
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005549;//jslker.Parent:5549
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005579;//jslker.Parent:5579
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005631;//jslker.Parent:5631
        _this.ctx.fill();
        $LASTPOS=1005652;//jslker.Parent:5652
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005397;//jslker.Parent:5397
      if (_this.searchCanvas()) {
        $LASTPOS=1005426;//jslker.Parent:5426
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005465;//jslker.Parent:5465
        _this.ctx.save();
        $LASTPOS=1005486;//jslker.Parent:5486
        _this.ctx.beginPath();
        $LASTPOS=1005512;//jslker.Parent:5512
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005549;//jslker.Parent:5549
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005579;//jslker.Parent:5579
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005631;//jslker.Parent:5631
        _this.ctx.fill();
        $LASTPOS=1005652;//jslker.Parent:5652
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005707;//jslker.Parent:5707
      if (_this.searchCanvas()) {
        $LASTPOS=1005736;//jslker.Parent:5736
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005775;//jslker.Parent:5775
        _this.ctx.beginPath();
        $LASTPOS=1005801;//jslker.Parent:5801
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005829;//jslker.Parent:5829
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005857;//jslker.Parent:5857
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005707;//jslker.Parent:5707
      if (_this.searchCanvas()) {
        $LASTPOS=1005736;//jslker.Parent:5736
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005775;//jslker.Parent:5775
        _this.ctx.beginPath();
        $LASTPOS=1005801;//jslker.Parent:5801
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005829;//jslker.Parent:5829
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005857;//jslker.Parent:5857
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005908;//jslker.Parent:5908
      if (_this.searchCanvas()) {
        $LASTPOS=1005937;//jslker.Parent:5937
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005976;//jslker.Parent:5976
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005908;//jslker.Parent:5908
      if (_this.searchCanvas()) {
        $LASTPOS=1005937;//jslker.Parent:5937
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005976;//jslker.Parent:5976
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1006034;//jslker.Parent:6034
      if (_this.searchCanvas()) {
        $LASTPOS=1006063;//jslker.Parent:6063
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1006102;//jslker.Parent:6102
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1006034;//jslker.Parent:6034
      if (_this.searchCanvas()) {
        $LASTPOS=1006063;//jslker.Parent:6063
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1006102;//jslker.Parent:6102
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this;
      
      $LASTPOS=1006165;//jslker.Parent:6165
      _this.activityGroup=_this.activityGroup||"default";
      $LASTPOS=1006210;//jslker.Parent:6210
      _this.keyData=[];
      $LASTPOS=1006227;//jslker.Parent:6227
      _this.document.onkeydown=(function anonymous_6248(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006271;//jslker.Parent:6271
        if (! e) {
          $LASTPOS=1006278;//jslker.Parent:6278
          e=window.event;
        }
        $LASTPOS=1006305;//jslker.Parent:6305
        key_code = e.keyCode;
        
        $LASTPOS=1006340;//jslker.Parent:6340
        key_char = String.fromCharCode(key_code).toLowerCase();
        
        $LASTPOS=1006409;//jslker.Parent:6409
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1006478;//jslker.Parent:6478
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1006516;//jslker.Parent:6516
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1006582;//jslker.Parent:6582
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1006619;//jslker.Parent:6619
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1006682;//jslker.Parent:6682
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1006718;//jslker.Parent:6718
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1006780;//jslker.Parent:6780
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1006813;//jslker.Parent:6813
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1006871;//jslker.Parent:6871
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1006902;//jslker.Parent:6902
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1006966;//jslker.Parent:6966
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1007000;//jslker.Parent:7000
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1007062;//jslker.Parent:7062
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1007095;//jslker.Parent:7095
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1007141;//jslker.Parent:7141
                        _this.keyData[key_char]=1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
      $LASTPOS=1007306;//jslker.Parent:7306
      _this.document.onkeyup=(function anonymous_7325(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1007348;//jslker.Parent:7348
        if (! e) {
          $LASTPOS=1007355;//jslker.Parent:7355
          e=window.event;
        }
        $LASTPOS=1007382;//jslker.Parent:7382
        key_code = e.keyCode;
        
        $LASTPOS=1007417;//jslker.Parent:7417
        key_char = String.fromCharCode(key_code).toLowerCase();
        
        $LASTPOS=1007486;//jslker.Parent:7486
        if (e.keyCode==16) {
          $LASTPOS=1007504;//jslker.Parent:7504
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1007542;//jslker.Parent:7542
          if (e.keyCode==17) {
            $LASTPOS=1007560;//jslker.Parent:7560
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1007597;//jslker.Parent:7597
            if (e.keyCode==18) {
              $LASTPOS=1007615;//jslker.Parent:7615
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1007651;//jslker.Parent:7651
              if (e.keyCode==37) {
                $LASTPOS=1007669;//jslker.Parent:7669
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1007702;//jslker.Parent:7702
                if (e.keyCode==38) {
                  $LASTPOS=1007720;//jslker.Parent:7720
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1007751;//jslker.Parent:7751
                  if (e.keyCode==39) {
                    $LASTPOS=1007769;//jslker.Parent:7769
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1007803;//jslker.Parent:7803
                    if (e.keyCode==40) {
                      $LASTPOS=1007821;//jslker.Parent:7821
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1007854;//jslker.Parent:7854
                      _this.keyData[key_char]=0;
                    }
                  }
                }
              }
            }
          }
        }
      });
    },
    getkey :function _trc_Parent_getkey(k) {
      "use strict";
      var _this=this;
      
      return _this.keyData[k.toLowerCase()]||0;
    },
    fiber$getkey :function _trc_Parent_f_getkey(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyData[k.toLowerCase()]||0;return;
      
      
      _thread.retVal=_this;return;
    },
    dist :function _trc_Parent_dist(x,y) {
      "use strict";
      var _this=this;
      
      return _this.sqrt(x*x+y*y);
    },
    fiber$dist :function _trc_Parent_f_dist(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.sqrt(x*x+y*y);return;
      
      
      _thread.retVal=_this;return;
    },
    angle :function _trc_Parent_angle(x,y) {
      "use strict";
      var _this=this;
      
      return _this.deg(_this.Math.atan2(y,x));
    },
    fiber$angle :function _trc_Parent_f_angle(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.deg(_this.Math.atan2(y,x));return;
      
      
      _thread.retVal=_this;return;
    },
    rad :function _trc_Parent_rad(d) {
      "use strict";
      var _this=this;
      
      return d/180*_this.Math.PI;
    },
    deg :function _trc_Parent_deg(d) {
      "use strict";
      var _this=this;
      
      return d/_this.Math.PI*180;
    },
    sqrt :function _trc_Parent_sqrt(x) {
      "use strict";
      var _this=this;
      
      return _this.Math.sqrt(x);
    },
    fiber$sqrt :function _trc_Parent_f_sqrt(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.sqrt(x);return;
      
      
      _thread.retVal=_this;return;
    },
    sin :function _trc_Parent_sin(x) {
      "use strict";
      var _this=this;
      
      return _this.Math.sin(_this.rad(x));
    },
    fiber$sin :function _trc_Parent_f_sin(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.sin(_this.rad(x));return;
      
      
      _thread.retVal=_this;return;
    },
    cos :function _trc_Parent_cos(x) {
      "use strict";
      var _this=this;
      
      return _this.Math.cos(_this.rad(x));
    },
    fiber$cos :function _trc_Parent_f_cos(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.cos(_this.rad(x));return;
      
      
      _thread.retVal=_this;return;
    },
    tan :function _trc_Parent_tan(x) {
      "use strict";
      var _this=this;
      
      return _this.Math.tan(_this.rad(x));
    },
    fiber$tan :function _trc_Parent_f_tan(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.tan(_this.rad(x));return;
      
      
      _thread.retVal=_this;return;
    },
    parallel :function _trc_Parent_parallel() {
      "use strict";
      var _this=this;
      var a;
      var methodName;
      var t;
      
      $LASTPOS=1008378;//jslker.Parent:8378
      a = Array.prototype.slice.call(arguments);
      
      $LASTPOS=1008428;//jslker.Parent:8428
      methodName = a.shift();
      
      $LASTPOS=1008459;//jslker.Parent:8459
      t = Tonyu.thread();
      
      $LASTPOS=1008486;//jslker.Parent:8486
      t.apply(_this,methodName,a);
      $LASTPOS=1008519;//jslker.Parent:8519
      t.steps();
    },
    fiber$parallel :function _trc_Parent_f_parallel(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var methodName;
      var t;
      
      $LASTPOS=1008378;//jslker.Parent:8378
      a = Array.prototype.slice.call(_arguments);
      
      $LASTPOS=1008428;//jslker.Parent:8428
      methodName = a.shift();
      
      $LASTPOS=1008459;//jslker.Parent:8459
      t = Tonyu.thread();
      
      $LASTPOS=1008486;//jslker.Parent:8486
      t.apply(_this,methodName,a);
      $LASTPOS=1008519;//jslker.Parent:8519
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this;
      var clicked;
      var _func;
      
      $LASTPOS=1008557;//jslker.Parent:8557
      clicked = 0;
      
      $LASTPOS=1008577;//jslker.Parent:8577
      _func = (function anonymous_8587() {
        
        $LASTPOS=1008608;//jslker.Parent:8608
        clicked=1;
      });
      
      $LASTPOS=1008632;//jslker.Parent:8632
      _this.onClick(elem,_func);
      $LASTPOS=1008658;//jslker.Parent:8658
      while (clicked==0) {
        Tonyu.checkLoop();
        $LASTPOS=1008686;//jslker.Parent:8686
        _this.wait(10);
        
      }
      $LASTPOS=1008708;//jslker.Parent:8708
      _this.findElement(elem).off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=1008557;//jslker.Parent:8557
      clicked = 0;
      
      $LASTPOS=1008577;//jslker.Parent:8577
      _func = (function anonymous_8587() {
        
        $LASTPOS=1008608;//jslker.Parent:8608
        clicked=1;
      });
      
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008632;//jslker.Parent:8632
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008658;//jslker.Parent:8658
          case 2:
            if (!(clicked==0)) { __pc=4     ; break; }
            $LASTPOS=1008686;//jslker.Parent:8686
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4     :
            
            $LASTPOS=1008708;//jslker.Parent:8708
            _this.findElement(elem).off("click","",_func);
            _thread.exit(_this);return;
          }
        }
      });
    },
    _waitFor :function _trc_Parent__waitFor(promise) {
      "use strict";
      var _this=this;
      var t;
      
      $LASTPOS=1008779;//jslker.Parent:8779
      t = null;
      
      $LASTPOS=1008799;//jslker.Parent:8799
      t.suspend();
      $LASTPOS=1008817;//jslker.Parent:8817
      _this._err=null;
      $LASTPOS=1008833;//jslker.Parent:8833
      promise.then((function anonymous_8846(r) {
        
        $LASTPOS=1008862;//jslker.Parent:8862
        _this._res=r;
        $LASTPOS=1008879;//jslker.Parent:8879
        t.steps();
      }),(function anonymous_8897(e) {
        
        $LASTPOS=1008913;//jslker.Parent:8913
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1008996;//jslker.Parent:8996
        t.steps();
      }));
    },
    fiber$_waitFor :function _trc_Parent_f__waitFor(_thread,promise) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1008779;//jslker.Parent:8779
      t = _thread;
      
      $LASTPOS=1008799;//jslker.Parent:8799
      t.suspend();
      $LASTPOS=1008817;//jslker.Parent:8817
      _this._err=null;
      $LASTPOS=1008833;//jslker.Parent:8833
      promise.then((function anonymous_8846(r) {
        
        $LASTPOS=1008862;//jslker.Parent:8862
        _this._res=r;
        $LASTPOS=1008879;//jslker.Parent:8879
        t.steps();
      }),(function anonymous_8897(e) {
        
        $LASTPOS=1008913;//jslker.Parent:8913
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1008996;//jslker.Parent:8996
        t.steps();
      }));
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_Parent_waitFor(promise) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1009045;//jslker.Parent:9045
      _this._waitFor(promise);
      $LASTPOS=1009069;//jslker.Parent:9069
      if (_this._err) {
        throw _this._err;
        
      }
      return _this._res;
    },
    fiber$waitFor :function _trc_Parent_f_waitFor(_thread,promise) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_waitFor(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009045;//jslker.Parent:9045
            _this.fiber$_waitFor(_thread, promise);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1009069;//jslker.Parent:9069
            if (_this._err) {
              throw _this._err;
              
            }
            _thread.exit(_this._res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    putToServer :function _trc_Parent_putToServer(key,value) {
      "use strict";
      var _this=this;
      var url;
      var p;
      var r;
      
      $LASTPOS=1009144;//jslker.Parent:9144
      url = window.location.href;
      
      $LASTPOS=1009179;//jslker.Parent:9179
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/put"+"&key="+key+"&value="+value+"&url="+url+"&group="+_this.activityGroup);
      
      
      $LASTPOS=1009352;//jslker.Parent:9352
      r=_this.waitFor(p);
      return r;
    },
    fiber$putToServer :function _trc_Parent_f_putToServer(_thread,key,value) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var p;
      var r;
      
      $LASTPOS=1009144;//jslker.Parent:9144
      url = window.location.href;
      
      $LASTPOS=1009179;//jslker.Parent:9179
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/put"+"&key="+key+"&value="+value+"&url="+url+"&group="+_this.activityGroup);
      
      
      
      _thread.enter(function _trc_Parent_ent_putToServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009352;//jslker.Parent:9352
            _this.fiber$waitFor(_thread, p);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    setGroup :function _trc_Parent_setGroup(g) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1009405;//jslker.Parent:9405
      _this.activityGroup=g||"default";
    },
    fiber$setGroup :function _trc_Parent_f_setGroup(_thread,g) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1009405;//jslker.Parent:9405
      _this.activityGroup=g||"default";
      
      _thread.retVal=_this;return;
    },
    getFromServer :function _trc_Parent_getFromServer(key) {
      "use strict";
      var _this=this;
      var url;
      var p;
      var r;
      
      $LASTPOS=1009464;//jslker.Parent:9464
      url = window.location.href;
      
      $LASTPOS=1009499;//jslker.Parent:9499
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      $LASTPOS=1009650;//jslker.Parent:9650
      r=_this.waitFor(p);
      return r;
    },
    fiber$getFromServer :function _trc_Parent_f_getFromServer(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var p;
      var r;
      
      $LASTPOS=1009464;//jslker.Parent:9464
      url = window.location.href;
      
      $LASTPOS=1009499;//jslker.Parent:9499
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      
      _thread.enter(function _trc_Parent_ent_getFromServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009650;//jslker.Parent:9650
            _this.fiber$waitFor(_thread, p);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    addLog :function _trc_Parent_addLog(practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this;
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=1009720;//jslker.Parent:9720
      _this.group=_this.activityGroup;
      $LASTPOS=1009746;//jslker.Parent:9746
      url = window.location.href;
      
      $LASTPOS=1009781;//jslker.Parent:9781
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1009848;//jslker.Parent:9848
      if (d1!=null) {
        $LASTPOS=1009862;//jslker.Parent:9862
        params+="&data1="+d1;
      }
      $LASTPOS=1009889;//jslker.Parent:9889
      if (d2!=null) {
        $LASTPOS=1009903;//jslker.Parent:9903
        params+="&data2="+d2;
      }
      $LASTPOS=1009930;//jslker.Parent:9930
      if (d3!=null) {
        $LASTPOS=1009944;//jslker.Parent:9944
        params+="&data3="+d3;
      }
      $LASTPOS=1009971;//jslker.Parent:9971
      if (d4!=null) {
        $LASTPOS=1009985;//jslker.Parent:9985
        params+="&data4="+d4;
      }
      $LASTPOS=1010012;//jslker.Parent:10012
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      $LASTPOS=1010097;//jslker.Parent:10097
      r=_this.waitFor(p);
      return r;
    },
    fiber$addLog :function _trc_Parent_f_addLog(_thread,practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=1009720;//jslker.Parent:9720
      _this.group=_this.activityGroup;
      $LASTPOS=1009746;//jslker.Parent:9746
      url = window.location.href;
      
      $LASTPOS=1009781;//jslker.Parent:9781
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1009848;//jslker.Parent:9848
      if (d1!=null) {
        $LASTPOS=1009862;//jslker.Parent:9862
        params+="&data1="+d1;
      }
      $LASTPOS=1009889;//jslker.Parent:9889
      if (d2!=null) {
        $LASTPOS=1009903;//jslker.Parent:9903
        params+="&data2="+d2;
      }
      $LASTPOS=1009930;//jslker.Parent:9930
      if (d3!=null) {
        $LASTPOS=1009944;//jslker.Parent:9944
        params+="&data3="+d3;
      }
      $LASTPOS=1009971;//jslker.Parent:9971
      if (d4!=null) {
        $LASTPOS=1009985;//jslker.Parent:9985
        params+="&data4="+d4;
      }
      $LASTPOS=1010012;//jslker.Parent:10012
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_addLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010097;//jslker.Parent:10097
            _this.fiber$waitFor(_thread, p);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    findLog :function _trc_Parent_findLog(practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this;
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=1010168;//jslker.Parent:10168
      _this.group=_this.activityGroup;
      $LASTPOS=1010194;//jslker.Parent:10194
      url = window.location.href;
      
      $LASTPOS=1010229;//jslker.Parent:10229
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010296;//jslker.Parent:10296
      if (d1!=null) {
        $LASTPOS=1010310;//jslker.Parent:10310
        params+="&data1="+d1;
      }
      $LASTPOS=1010337;//jslker.Parent:10337
      if (d2!=null) {
        $LASTPOS=1010351;//jslker.Parent:10351
        params+="&data2="+d2;
      }
      $LASTPOS=1010378;//jslker.Parent:10378
      if (d3!=null) {
        $LASTPOS=1010392;//jslker.Parent:10392
        params+="&data3="+d3;
      }
      $LASTPOS=1010419;//jslker.Parent:10419
      if (d4!=null) {
        $LASTPOS=1010433;//jslker.Parent:10433
        params+="&data4="+d4;
      }
      $LASTPOS=1010460;//jslker.Parent:10460
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      $LASTPOS=1010546;//jslker.Parent:10546
      r=_this.waitFor(p);
      return r;
    },
    fiber$findLog :function _trc_Parent_f_findLog(_thread,practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=1010168;//jslker.Parent:10168
      _this.group=_this.activityGroup;
      $LASTPOS=1010194;//jslker.Parent:10194
      url = window.location.href;
      
      $LASTPOS=1010229;//jslker.Parent:10229
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010296;//jslker.Parent:10296
      if (d1!=null) {
        $LASTPOS=1010310;//jslker.Parent:10310
        params+="&data1="+d1;
      }
      $LASTPOS=1010337;//jslker.Parent:10337
      if (d2!=null) {
        $LASTPOS=1010351;//jslker.Parent:10351
        params+="&data2="+d2;
      }
      $LASTPOS=1010378;//jslker.Parent:10378
      if (d3!=null) {
        $LASTPOS=1010392;//jslker.Parent:10392
        params+="&data3="+d3;
      }
      $LASTPOS=1010419;//jslker.Parent:10419
      if (d4!=null) {
        $LASTPOS=1010433;//jslker.Parent:10433
        params+="&data4="+d4;
      }
      $LASTPOS=1010460;//jslker.Parent:10460
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_findLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010546;//jslker.Parent:10546
            _this.fiber$waitFor(_thread, p);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"setInterval":{"nowait":false},"setTimeout":{"nowait":false},"catchException":{"nowait":false},"findElement":{"nowait":false},"isFormElement":{"nowait":false},"clearContent":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"searchCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"new":{"nowait":false},"getkey":{"nowait":false},"dist":{"nowait":false},"angle":{"nowait":false},"rad":{"nowait":true},"deg":{"nowait":true},"sqrt":{"nowait":false},"sin":{"nowait":false},"cos":{"nowait":false},"tan":{"nowait":false},"parallel":{"nowait":false},"waitClick":{"nowait":false},"_waitFor":{"nowait":false},"waitFor":{"nowait":false},"putToServer":{"nowait":false},"setGroup":{"nowait":false},"getFromServer":{"nowait":false},"addLog":{"nowait":false},"findLog":{"nowait":false}},"fields":{"document":{},"down":{},"_canvas":{},"ctx":{},"Math":{},"activityGroup":{},"keyData":{},"_err":{},"_res":{},"group":{}}}
});

//# sourceMappingURL=concat.js.map