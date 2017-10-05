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
      
      $LASTPOS=1004877;//jslker.Parent:4877
      time=time||100;
      $LASTPOS=1004898;//jslker.Parent:4898
      t = null;
      
      $LASTPOS=1004918;//jslker.Parent:4918
      t.suspend();
      $LASTPOS=1004936;//jslker.Parent:4936
      setTimeout(_this.catchException((function anonymous_4962() {
        
        $LASTPOS=1004976;//jslker.Parent:4976
        t.steps();
      })),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1004877;//jslker.Parent:4877
      time=time||100;
      $LASTPOS=1004898;//jslker.Parent:4898
      t = _thread;
      
      $LASTPOS=1004918;//jslker.Parent:4918
      t.suspend();
      $LASTPOS=1004936;//jslker.Parent:4936
      setTimeout(_this.catchException((function anonymous_4962() {
        
        $LASTPOS=1004976;//jslker.Parent:4976
        t.steps();
      })),time);
      
      _thread.retVal=_this;return;
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
      
      $LASTPOS=1005087;//jslker.Parent:5087
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005087;//jslker.Parent:5087
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this;
      var e;
      
      $LASTPOS=1005160;//jslker.Parent:5160
      e = _this.document.createElement(elem);
      
      $LASTPOS=1005202;//jslker.Parent:5202
      e.setAttribute("name",n);
      $LASTPOS=1005234;//jslker.Parent:5234
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1005160;//jslker.Parent:5160
      e = _this.document.createElement(elem);
      
      $LASTPOS=1005202;//jslker.Parent:5202
      e.setAttribute("name",n);
      $LASTPOS=1005234;//jslker.Parent:5234
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005293;//jslker.Parent:5293
      if (_this.searchCanvas()) {
        $LASTPOS=1005322;//jslker.Parent:5322
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005361;//jslker.Parent:5361
        _this.ctx.save();
        $LASTPOS=1005382;//jslker.Parent:5382
        _this.ctx.beginPath();
        $LASTPOS=1005408;//jslker.Parent:5408
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005445;//jslker.Parent:5445
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005475;//jslker.Parent:5475
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005527;//jslker.Parent:5527
        _this.ctx.fill();
        $LASTPOS=1005548;//jslker.Parent:5548
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005293;//jslker.Parent:5293
      if (_this.searchCanvas()) {
        $LASTPOS=1005322;//jslker.Parent:5322
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005361;//jslker.Parent:5361
        _this.ctx.save();
        $LASTPOS=1005382;//jslker.Parent:5382
        _this.ctx.beginPath();
        $LASTPOS=1005408;//jslker.Parent:5408
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005445;//jslker.Parent:5445
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005475;//jslker.Parent:5475
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005527;//jslker.Parent:5527
        _this.ctx.fill();
        $LASTPOS=1005548;//jslker.Parent:5548
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005603;//jslker.Parent:5603
      if (_this.searchCanvas()) {
        $LASTPOS=1005632;//jslker.Parent:5632
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005671;//jslker.Parent:5671
        _this.ctx.beginPath();
        $LASTPOS=1005697;//jslker.Parent:5697
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005725;//jslker.Parent:5725
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005753;//jslker.Parent:5753
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005603;//jslker.Parent:5603
      if (_this.searchCanvas()) {
        $LASTPOS=1005632;//jslker.Parent:5632
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005671;//jslker.Parent:5671
        _this.ctx.beginPath();
        $LASTPOS=1005697;//jslker.Parent:5697
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005725;//jslker.Parent:5725
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005753;//jslker.Parent:5753
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005804;//jslker.Parent:5804
      if (_this.searchCanvas()) {
        $LASTPOS=1005833;//jslker.Parent:5833
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005872;//jslker.Parent:5872
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005804;//jslker.Parent:5804
      if (_this.searchCanvas()) {
        $LASTPOS=1005833;//jslker.Parent:5833
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005872;//jslker.Parent:5872
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005930;//jslker.Parent:5930
      if (_this.searchCanvas()) {
        $LASTPOS=1005959;//jslker.Parent:5959
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005998;//jslker.Parent:5998
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005930;//jslker.Parent:5930
      if (_this.searchCanvas()) {
        $LASTPOS=1005959;//jslker.Parent:5959
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005998;//jslker.Parent:5998
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this;
      
      $LASTPOS=1006061;//jslker.Parent:6061
      _this.activityGroup=_this.activityGroup||"default";
      $LASTPOS=1006106;//jslker.Parent:6106
      _this.keyData=[];
      $LASTPOS=1006123;//jslker.Parent:6123
      _this.document.onkeydown=(function anonymous_6144(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006167;//jslker.Parent:6167
        if (! e) {
          $LASTPOS=1006174;//jslker.Parent:6174
          e=window.event;
        }
        $LASTPOS=1006201;//jslker.Parent:6201
        key_code = e.keyCode;
        
        $LASTPOS=1006236;//jslker.Parent:6236
        key_char = String.fromCharCode(key_code).toLowerCase();
        
        $LASTPOS=1006305;//jslker.Parent:6305
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1006374;//jslker.Parent:6374
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1006412;//jslker.Parent:6412
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1006478;//jslker.Parent:6478
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1006515;//jslker.Parent:6515
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1006578;//jslker.Parent:6578
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1006614;//jslker.Parent:6614
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1006676;//jslker.Parent:6676
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1006709;//jslker.Parent:6709
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1006767;//jslker.Parent:6767
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1006798;//jslker.Parent:6798
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1006862;//jslker.Parent:6862
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1006896;//jslker.Parent:6896
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1006958;//jslker.Parent:6958
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1006991;//jslker.Parent:6991
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1007037;//jslker.Parent:7037
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
      $LASTPOS=1007202;//jslker.Parent:7202
      _this.document.onkeyup=(function anonymous_7221(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1007244;//jslker.Parent:7244
        if (! e) {
          $LASTPOS=1007251;//jslker.Parent:7251
          e=window.event;
        }
        $LASTPOS=1007278;//jslker.Parent:7278
        key_code = e.keyCode;
        
        $LASTPOS=1007313;//jslker.Parent:7313
        key_char = String.fromCharCode(key_code).toLowerCase();
        
        $LASTPOS=1007382;//jslker.Parent:7382
        if (e.keyCode==16) {
          $LASTPOS=1007400;//jslker.Parent:7400
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1007438;//jslker.Parent:7438
          if (e.keyCode==17) {
            $LASTPOS=1007456;//jslker.Parent:7456
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1007493;//jslker.Parent:7493
            if (e.keyCode==18) {
              $LASTPOS=1007511;//jslker.Parent:7511
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1007547;//jslker.Parent:7547
              if (e.keyCode==37) {
                $LASTPOS=1007565;//jslker.Parent:7565
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1007598;//jslker.Parent:7598
                if (e.keyCode==38) {
                  $LASTPOS=1007616;//jslker.Parent:7616
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1007647;//jslker.Parent:7647
                  if (e.keyCode==39) {
                    $LASTPOS=1007665;//jslker.Parent:7665
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1007699;//jslker.Parent:7699
                    if (e.keyCode==40) {
                      $LASTPOS=1007717;//jslker.Parent:7717
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1007750;//jslker.Parent:7750
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
      
      $LASTPOS=1008274;//jslker.Parent:8274
      a = Array.prototype.slice.call(arguments);
      
      $LASTPOS=1008324;//jslker.Parent:8324
      methodName = a.shift();
      
      $LASTPOS=1008355;//jslker.Parent:8355
      t = Tonyu.thread();
      
      $LASTPOS=1008382;//jslker.Parent:8382
      t.apply(_this,methodName,a);
      $LASTPOS=1008415;//jslker.Parent:8415
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
      
      $LASTPOS=1008274;//jslker.Parent:8274
      a = Array.prototype.slice.call(_arguments);
      
      $LASTPOS=1008324;//jslker.Parent:8324
      methodName = a.shift();
      
      $LASTPOS=1008355;//jslker.Parent:8355
      t = Tonyu.thread();
      
      $LASTPOS=1008382;//jslker.Parent:8382
      t.apply(_this,methodName,a);
      $LASTPOS=1008415;//jslker.Parent:8415
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this;
      var clicked;
      var _func;
      
      $LASTPOS=1008453;//jslker.Parent:8453
      clicked = 0;
      
      $LASTPOS=1008473;//jslker.Parent:8473
      _func = (function anonymous_8483() {
        
        $LASTPOS=1008504;//jslker.Parent:8504
        clicked=1;
      });
      
      $LASTPOS=1008528;//jslker.Parent:8528
      _this.onClick(elem,_func);
      $LASTPOS=1008554;//jslker.Parent:8554
      while (clicked==0) {
        $LASTPOS=1008582;//jslker.Parent:8582
        _this.wait(10);
        
      }
      $LASTPOS=1008604;//jslker.Parent:8604
      _this.findElement(elem).off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=1008453;//jslker.Parent:8453
      clicked = 0;
      
      $LASTPOS=1008473;//jslker.Parent:8473
      _func = (function anonymous_8483() {
        
        $LASTPOS=1008504;//jslker.Parent:8504
        clicked=1;
      });
      
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008528;//jslker.Parent:8528
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008554;//jslker.Parent:8554
          case 2:
            if (!(clicked==0)) { __pc=4     ; break; }
            $LASTPOS=1008582;//jslker.Parent:8582
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4     :
            
            $LASTPOS=1008604;//jslker.Parent:8604
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
      
      $LASTPOS=1008675;//jslker.Parent:8675
      t = null;
      
      $LASTPOS=1008695;//jslker.Parent:8695
      t.suspend();
      $LASTPOS=1008713;//jslker.Parent:8713
      _this._err=null;
      $LASTPOS=1008729;//jslker.Parent:8729
      promise.then((function anonymous_8742(r) {
        
        $LASTPOS=1008758;//jslker.Parent:8758
        _this._res=r;
        $LASTPOS=1008775;//jslker.Parent:8775
        t.steps();
      }),(function anonymous_8793(e) {
        
        $LASTPOS=1008809;//jslker.Parent:8809
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1008892;//jslker.Parent:8892
        t.steps();
      }));
    },
    fiber$_waitFor :function _trc_Parent_f__waitFor(_thread,promise) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1008675;//jslker.Parent:8675
      t = _thread;
      
      $LASTPOS=1008695;//jslker.Parent:8695
      t.suspend();
      $LASTPOS=1008713;//jslker.Parent:8713
      _this._err=null;
      $LASTPOS=1008729;//jslker.Parent:8729
      promise.then((function anonymous_8742(r) {
        
        $LASTPOS=1008758;//jslker.Parent:8758
        _this._res=r;
        $LASTPOS=1008775;//jslker.Parent:8775
        t.steps();
      }),(function anonymous_8793(e) {
        
        $LASTPOS=1008809;//jslker.Parent:8809
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1008892;//jslker.Parent:8892
        t.steps();
      }));
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_Parent_waitFor(promise) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1008941;//jslker.Parent:8941
      _this._waitFor(promise);
      $LASTPOS=1008965;//jslker.Parent:8965
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
            $LASTPOS=1008941;//jslker.Parent:8941
            _this.fiber$_waitFor(_thread, promise);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008965;//jslker.Parent:8965
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
      
      $LASTPOS=1009040;//jslker.Parent:9040
      url = window.location.href;
      
      $LASTPOS=1009075;//jslker.Parent:9075
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/put"+"&key="+key+"&value="+value+"&url="+url+"&group="+_this.activityGroup);
      
      
      $LASTPOS=1009248;//jslker.Parent:9248
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
      
      $LASTPOS=1009040;//jslker.Parent:9040
      url = window.location.href;
      
      $LASTPOS=1009075;//jslker.Parent:9075
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/put"+"&key="+key+"&value="+value+"&url="+url+"&group="+_this.activityGroup);
      
      
      
      _thread.enter(function _trc_Parent_ent_putToServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009248;//jslker.Parent:9248
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
      
      $LASTPOS=1009301;//jslker.Parent:9301
      _this.activityGroup=g||"default";
    },
    fiber$setGroup :function _trc_Parent_f_setGroup(_thread,g) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1009301;//jslker.Parent:9301
      _this.activityGroup=g||"default";
      
      _thread.retVal=_this;return;
    },
    getFromServer :function _trc_Parent_getFromServer(key) {
      "use strict";
      var _this=this;
      var url;
      var p;
      var r;
      
      $LASTPOS=1009360;//jslker.Parent:9360
      url = window.location.href;
      
      $LASTPOS=1009395;//jslker.Parent:9395
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      $LASTPOS=1009546;//jslker.Parent:9546
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
      
      $LASTPOS=1009360;//jslker.Parent:9360
      url = window.location.href;
      
      $LASTPOS=1009395;//jslker.Parent:9395
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      
      _thread.enter(function _trc_Parent_ent_getFromServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009546;//jslker.Parent:9546
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
      
      $LASTPOS=1009616;//jslker.Parent:9616
      _this.group=_this.activityGroup;
      $LASTPOS=1009642;//jslker.Parent:9642
      url = window.location.href;
      
      $LASTPOS=1009677;//jslker.Parent:9677
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1009744;//jslker.Parent:9744
      if (d1!=null) {
        $LASTPOS=1009758;//jslker.Parent:9758
        params+="&data1="+d1;
      }
      $LASTPOS=1009785;//jslker.Parent:9785
      if (d2!=null) {
        $LASTPOS=1009799;//jslker.Parent:9799
        params+="&data2="+d2;
      }
      $LASTPOS=1009826;//jslker.Parent:9826
      if (d3!=null) {
        $LASTPOS=1009840;//jslker.Parent:9840
        params+="&data3="+d3;
      }
      $LASTPOS=1009867;//jslker.Parent:9867
      if (d4!=null) {
        $LASTPOS=1009881;//jslker.Parent:9881
        params+="&data4="+d4;
      }
      $LASTPOS=1009908;//jslker.Parent:9908
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      $LASTPOS=1009993;//jslker.Parent:9993
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
      
      $LASTPOS=1009616;//jslker.Parent:9616
      _this.group=_this.activityGroup;
      $LASTPOS=1009642;//jslker.Parent:9642
      url = window.location.href;
      
      $LASTPOS=1009677;//jslker.Parent:9677
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1009744;//jslker.Parent:9744
      if (d1!=null) {
        $LASTPOS=1009758;//jslker.Parent:9758
        params+="&data1="+d1;
      }
      $LASTPOS=1009785;//jslker.Parent:9785
      if (d2!=null) {
        $LASTPOS=1009799;//jslker.Parent:9799
        params+="&data2="+d2;
      }
      $LASTPOS=1009826;//jslker.Parent:9826
      if (d3!=null) {
        $LASTPOS=1009840;//jslker.Parent:9840
        params+="&data3="+d3;
      }
      $LASTPOS=1009867;//jslker.Parent:9867
      if (d4!=null) {
        $LASTPOS=1009881;//jslker.Parent:9881
        params+="&data4="+d4;
      }
      $LASTPOS=1009908;//jslker.Parent:9908
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_addLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009993;//jslker.Parent:9993
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
      
      $LASTPOS=1010064;//jslker.Parent:10064
      _this.group=_this.activityGroup;
      $LASTPOS=1010090;//jslker.Parent:10090
      url = window.location.href;
      
      $LASTPOS=1010125;//jslker.Parent:10125
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010192;//jslker.Parent:10192
      if (d1!=null) {
        $LASTPOS=1010206;//jslker.Parent:10206
        params+="&data1="+d1;
      }
      $LASTPOS=1010233;//jslker.Parent:10233
      if (d2!=null) {
        $LASTPOS=1010247;//jslker.Parent:10247
        params+="&data2="+d2;
      }
      $LASTPOS=1010274;//jslker.Parent:10274
      if (d3!=null) {
        $LASTPOS=1010288;//jslker.Parent:10288
        params+="&data3="+d3;
      }
      $LASTPOS=1010315;//jslker.Parent:10315
      if (d4!=null) {
        $LASTPOS=1010329;//jslker.Parent:10329
        params+="&data4="+d4;
      }
      $LASTPOS=1010356;//jslker.Parent:10356
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      $LASTPOS=1010442;//jslker.Parent:10442
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
      
      $LASTPOS=1010064;//jslker.Parent:10064
      _this.group=_this.activityGroup;
      $LASTPOS=1010090;//jslker.Parent:10090
      url = window.location.href;
      
      $LASTPOS=1010125;//jslker.Parent:10125
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010192;//jslker.Parent:10192
      if (d1!=null) {
        $LASTPOS=1010206;//jslker.Parent:10206
        params+="&data1="+d1;
      }
      $LASTPOS=1010233;//jslker.Parent:10233
      if (d2!=null) {
        $LASTPOS=1010247;//jslker.Parent:10247
        params+="&data2="+d2;
      }
      $LASTPOS=1010274;//jslker.Parent:10274
      if (d3!=null) {
        $LASTPOS=1010288;//jslker.Parent:10288
        params+="&data3="+d3;
      }
      $LASTPOS=1010315;//jslker.Parent:10315
      if (d4!=null) {
        $LASTPOS=1010329;//jslker.Parent:10329
        params+="&data4="+d4;
      }
      $LASTPOS=1010356;//jslker.Parent:10356
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_findLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010442;//jslker.Parent:10442
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