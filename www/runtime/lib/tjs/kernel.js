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
      
      return (function anonymous_453() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000603;//jslker.Parent:603
          window.onerror("","","","",e);
          
        }
      });
    },
    fiber$catchException :function _trc_Parent_f_catchException(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(function anonymous_453() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000603;//jslker.Parent:603
          window.onerror("","","","",e);
          
        }
      });return;
      
      
      _thread.retVal=_this;return;
    },
    findElement :function _trc_Parent_findElement(elem) {
      "use strict";
      var _this=this;
      var res;
      
      $LASTPOS=1000683;//jslker.Parent:683
      if (elem instanceof $) {
        return elem;
      }
      $LASTPOS=1000724;//jslker.Parent:724
      res = $("[name="+elem+"]");
      
      $LASTPOS=1000759;//jslker.Parent:759
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
      
      $LASTPOS=1000683;//jslker.Parent:683
      if (elem instanceof $) {
        _thread.retVal=elem;return;
        
      }
      $LASTPOS=1000724;//jslker.Parent:724
      res = $("[name="+elem+"]");
      
      $LASTPOS=1000759;//jslker.Parent:759
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
      
      $LASTPOS=1000840;//jslker.Parent:840
      elem=_this.findElement(elem);
      $LASTPOS=1000869;//jslker.Parent:869
      if (! elem[0]) {
        return false;
      }
      $LASTPOS=1000902;//jslker.Parent:902
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
            $LASTPOS=1000840;//jslker.Parent:840
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1000869;//jslker.Parent:869
            if (!(! elem[0])) { __pc=2     ; break; }
            _thread.exit(false);return;
          case 2     :
            
            $LASTPOS=1000902;//jslker.Parent:902
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
      
      $LASTPOS=1001018;//jslker.Parent:1018
      elem=_this.findElement(elem);
      $LASTPOS=1001047;//jslker.Parent:1047
      if (_this.isFormElement(elem)) {
        $LASTPOS=1001083;//jslker.Parent:1083
        elem.val("");
        
      } else {
        $LASTPOS=1001120;//jslker.Parent:1120
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
            $LASTPOS=1001018;//jslker.Parent:1018
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001047;//jslker.Parent:1047
            if (_this.isFormElement(elem)) {
              $LASTPOS=1001083;//jslker.Parent:1083
              elem.val("");
              
            } else {
              $LASTPOS=1001120;//jslker.Parent:1120
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
      
      $LASTPOS=1001170;//jslker.Parent:1170
      elem=_this.findElement(elem);
      $LASTPOS=1001199;//jslker.Parent:1199
      if (_this.isFormElement(elem)) {
        $LASTPOS=1001235;//jslker.Parent:1235
        elem.val(elem.val()+val);
        
      } else {
        $LASTPOS=1001287;//jslker.Parent:1287
        if (_this.document.baWriteTo) {
          $LASTPOS=1001326;//jslker.Parent:1326
          dst = elem[0];
          
          $LASTPOS=1001356;//jslker.Parent:1356
          if (dst) {
            $LASTPOS=1001365;//jslker.Parent:1365
            _this.document.baWriteTo(dst,val);
          }
          
        } else {
          $LASTPOS=1001426;//jslker.Parent:1426
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
            $LASTPOS=1001170;//jslker.Parent:1170
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001199;//jslker.Parent:1199
            if (_this.isFormElement(elem)) {
              $LASTPOS=1001235;//jslker.Parent:1235
              elem.val(elem.val()+val);
              
            } else {
              $LASTPOS=1001287;//jslker.Parent:1287
              if (_this.document.baWriteTo) {
                $LASTPOS=1001326;//jslker.Parent:1326
                dst = elem[0];
                
                $LASTPOS=1001356;//jslker.Parent:1356
                if (dst) {
                  $LASTPOS=1001365;//jslker.Parent:1365
                  _this.document.baWriteTo(dst,val);
                }
                
              } else {
                $LASTPOS=1001426;//jslker.Parent:1426
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
      
      $LASTPOS=1001491;//jslker.Parent:1491
      _this.clearContent(elem);
      $LASTPOS=1001516;//jslker.Parent:1516
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
            $LASTPOS=1001491;//jslker.Parent:1491
            _this.fiber$clearContent(_thread, elem);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1001516;//jslker.Parent:1516
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
      
      $LASTPOS=1001611;//jslker.Parent:1611
      elem=_this.findElement(elem);
      $LASTPOS=1001640;//jslker.Parent:1640
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
            $LASTPOS=1001611;//jslker.Parent:1611
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001640;//jslker.Parent:1640
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
      
      $LASTPOS=1001793;//jslker.Parent:1793
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
            $LASTPOS=1001793;//jslker.Parent:1793
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
      
      
      $LASTPOS=1001868;//jslker.Parent:1868
      if (typeof  func=='function') {
        $LASTPOS=1001908;//jslker.Parent:1908
        if (func.methodInfo) {
          $LASTPOS=1001944;//jslker.Parent:1944
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1002018;//jslker.Parent:2018
        fname=func+"";
        
      }
      $LASTPOS=1002045;//jslker.Parent:2045
      if (typeof  fname=="string") {
        $LASTPOS=1002084;//jslker.Parent:2084
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1002151;//jslker.Parent:2151
        if (_this["fiber$"+fname]) {
          $LASTPOS=1002192;//jslker.Parent:2192
          usepara=true;
          
        }
        
      }
      $LASTPOS=1002229;//jslker.Parent:2229
      if (usepara) {
        $LASTPOS=1002253;//jslker.Parent:2253
        _this.findElement(elem).click(_this.catchException((function anonymous_2292() {
          
          $LASTPOS=1002309;//jslker.Parent:2309
          _this.parallel(fname);
        })));
        
      } else {
        $LASTPOS=1002423;//jslker.Parent:2423
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
      
      
      $LASTPOS=1001868;//jslker.Parent:1868
      if (typeof  func=='function') {
        $LASTPOS=1001908;//jslker.Parent:1908
        if (func.methodInfo) {
          $LASTPOS=1001944;//jslker.Parent:1944
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1002018;//jslker.Parent:2018
        fname=func+"";
        
      }
      $LASTPOS=1002045;//jslker.Parent:2045
      if (typeof  fname=="string") {
        $LASTPOS=1002084;//jslker.Parent:2084
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1002151;//jslker.Parent:2151
        if (_this["fiber$"+fname]) {
          $LASTPOS=1002192;//jslker.Parent:2192
          usepara=true;
          
        }
        
      }
      
      _thread.enter(function _trc_Parent_ent_onClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1002229;//jslker.Parent:2229
            if (!(usepara)) { __pc=1     ; break; }
            $LASTPOS=1002253;//jslker.Parent:2253
            _this.findElement(elem).click(_this.catchException((function anonymous_2292() {
              
              $LASTPOS=1002309;//jslker.Parent:2309
              _this.parallel(fname);
            })));
            __pc=2     ;break;
          case 1     :
            {
              $LASTPOS=1002423;//jslker.Parent:2423
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
      
      $LASTPOS=1002502;//jslker.Parent:2502
      if (typeof  func=="function") {
        $LASTPOS=1002540;//jslker.Parent:2540
        $("body").on("touchstart",(function anonymous_2566(e) {
          
          $LASTPOS=1002592;//jslker.Parent:2592
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1002723;//jslker.Parent:2723
        $("body").on("touchmove",(function anonymous_2748(e) {
          
          $LASTPOS=1002774;//jslker.Parent:2774
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002904;//jslker.Parent:2904
        $("body").on("touchend",(function anonymous_2928(e) {
          
          $LASTPOS=1002954;//jslker.Parent:2954
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1003083;//jslker.Parent:3083
        $("body").on("mousedown",(function anonymous_3108(e) {
          
          $LASTPOS=1003134;//jslker.Parent:3134
          _this.down=true;
          $LASTPOS=1003158;//jslker.Parent:3158
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1003211;//jslker.Parent:3211
        $("body").on("mousemove",(function anonymous_3236(e) {
          
          $LASTPOS=1003262;//jslker.Parent:3262
          if (_this.down) {
            $LASTPOS=1003271;//jslker.Parent:3271
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1003323;//jslker.Parent:3323
        $("body").on("mouseup",(function anonymous_3346(e) {
          
          $LASTPOS=1003372;//jslker.Parent:3372
          _this.down=false;
          $LASTPOS=1003397;//jslker.Parent:3397
          func(e.pageX,e.pageY,"end");
        }));
        
      }
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002502;//jslker.Parent:2502
      if (typeof  func=="function") {
        $LASTPOS=1002540;//jslker.Parent:2540
        $("body").on("touchstart",(function anonymous_2566(e) {
          
          $LASTPOS=1002592;//jslker.Parent:2592
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1002723;//jslker.Parent:2723
        $("body").on("touchmove",(function anonymous_2748(e) {
          
          $LASTPOS=1002774;//jslker.Parent:2774
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002904;//jslker.Parent:2904
        $("body").on("touchend",(function anonymous_2928(e) {
          
          $LASTPOS=1002954;//jslker.Parent:2954
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1003083;//jslker.Parent:3083
        $("body").on("mousedown",(function anonymous_3108(e) {
          
          $LASTPOS=1003134;//jslker.Parent:3134
          _this.down=true;
          $LASTPOS=1003158;//jslker.Parent:3158
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1003211;//jslker.Parent:3211
        $("body").on("mousemove",(function anonymous_3236(e) {
          
          $LASTPOS=1003262;//jslker.Parent:3262
          if (_this.down) {
            $LASTPOS=1003271;//jslker.Parent:3271
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1003323;//jslker.Parent:3323
        $("body").on("mouseup",(function anonymous_3346(e) {
          
          $LASTPOS=1003372;//jslker.Parent:3372
          _this.down=false;
          $LASTPOS=1003397;//jslker.Parent:3397
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003524;//jslker.Parent:3524
      _this._canvas=_this.findElement(canv)[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003524;//jslker.Parent:3524
      _this._canvas=_this.findElement(canv)[0];
      
      _thread.retVal=_this;return;
    },
    searchCanvas :function _trc_Parent_searchCanvas() {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003580;//jslker.Parent:3580
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
      
      $LASTPOS=1003580;//jslker.Parent:3580
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
      
      $LASTPOS=1003705;//jslker.Parent:3705
      if (_this.searchCanvas()) {
        $LASTPOS=1003734;//jslker.Parent:3734
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003773;//jslker.Parent:3773
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003822;//jslker.Parent:3822
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003705;//jslker.Parent:3705
      if (_this.searchCanvas()) {
        $LASTPOS=1003734;//jslker.Parent:3734
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003773;//jslker.Parent:3773
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003822;//jslker.Parent:3822
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003900;//jslker.Parent:3900
      if (_this.searchCanvas()) {
        $LASTPOS=1003929;//jslker.Parent:3929
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003968;//jslker.Parent:3968
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003900;//jslker.Parent:3900
      if (_this.searchCanvas()) {
        $LASTPOS=1003929;//jslker.Parent:3929
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003968;//jslker.Parent:3968
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004036;//jslker.Parent:4036
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1004080;//jslker.Parent:4080
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1004126;//jslker.Parent:4126
      _this.findElement(elem).attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004036;//jslker.Parent:4036
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1004080;//jslker.Parent:4080
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1004126;//jslker.Parent:4126
      _this.findElement(elem).attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004192;//jslker.Parent:4192
      _this.findElement(elem).css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004192;//jslker.Parent:4192
      _this.findElement(elem).css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004314;//jslker.Parent:4314
      console.log(scaleX,scaleY);
      $LASTPOS=1004347;//jslker.Parent:4347
      if (! scaleX) {
        $LASTPOS=1004369;//jslker.Parent:4369
        scaleX=1;
        $LASTPOS=1004388;//jslker.Parent:4388
        scaleY=1;
        
      } else {
        $LASTPOS=1004409;//jslker.Parent:4409
        if (! scaleY) {
          $LASTPOS=1004431;//jslker.Parent:4431
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004458;//jslker.Parent:4458
      console.log(scaleX,scaleY);
      $LASTPOS=1004491;//jslker.Parent:4491
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004314;//jslker.Parent:4314
      console.log(scaleX,scaleY);
      $LASTPOS=1004347;//jslker.Parent:4347
      if (! scaleX) {
        $LASTPOS=1004369;//jslker.Parent:4369
        scaleX=1;
        $LASTPOS=1004388;//jslker.Parent:4388
        scaleY=1;
        
      } else {
        $LASTPOS=1004409;//jslker.Parent:4409
        if (! scaleY) {
          $LASTPOS=1004431;//jslker.Parent:4431
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004458;//jslker.Parent:4458
      console.log(scaleX,scaleY);
      $LASTPOS=1004491;//jslker.Parent:4491
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004655;//jslker.Parent:4655
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004655;//jslker.Parent:4655
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004788;//jslker.Parent:4788
      _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004788;//jslker.Parent:4788
      _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this;
      var t;
      var runThread;
      
      $LASTPOS=1004916;//jslker.Parent:4916
      time=time||100;
      $LASTPOS=1004937;//jslker.Parent:4937
      t = null;
      
      $LASTPOS=1004957;//jslker.Parent:4957
      runThread = _this.catchException((function anonymous_4986() {
        
        $LASTPOS=1004998;//jslker.Parent:4998
        t.steps();
        $LASTPOS=1005018;//jslker.Parent:5018
        if (t.preempted) {
          $LASTPOS=1005050;//jslker.Parent:5050
          setTimeout(runThread,0);
          
        }
      }));
      
      $LASTPOS=1005099;//jslker.Parent:5099
      t.suspend();
      $LASTPOS=1005117;//jslker.Parent:5117
      setTimeout(runThread,time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var runThread;
      
      $LASTPOS=1004916;//jslker.Parent:4916
      time=time||100;
      $LASTPOS=1004937;//jslker.Parent:4937
      t = _thread;
      
      
      _thread.enter(function _trc_Parent_ent_wait(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1004957;//jslker.Parent:4957
            _this.fiber$catchException(_thread, (function anonymous_4986() {
              
              $LASTPOS=1004998;//jslker.Parent:4998
              t.steps();
              $LASTPOS=1005018;//jslker.Parent:5018
              if (t.preempted) {
                $LASTPOS=1005050;//jslker.Parent:5050
                setTimeout(runThread,0);
                
              }
            }));
            __pc=1;return;
          case 1:
            runThread=_thread.retVal;
            
            $LASTPOS=1005099;//jslker.Parent:5099
            t.suspend();
            $LASTPOS=1005117;//jslker.Parent:5117
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
      
      $LASTPOS=1005230;//jslker.Parent:5230
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005230;//jslker.Parent:5230
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this;
      var e;
      
      $LASTPOS=1005303;//jslker.Parent:5303
      e = _this.document.createElement(elem);
      
      $LASTPOS=1005345;//jslker.Parent:5345
      e.setAttribute("name",n);
      $LASTPOS=1005377;//jslker.Parent:5377
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1005303;//jslker.Parent:5303
      e = _this.document.createElement(elem);
      
      $LASTPOS=1005345;//jslker.Parent:5345
      e.setAttribute("name",n);
      $LASTPOS=1005377;//jslker.Parent:5377
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005436;//jslker.Parent:5436
      if (_this.searchCanvas()) {
        $LASTPOS=1005465;//jslker.Parent:5465
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005504;//jslker.Parent:5504
        _this.ctx.save();
        $LASTPOS=1005525;//jslker.Parent:5525
        _this.ctx.beginPath();
        $LASTPOS=1005551;//jslker.Parent:5551
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005588;//jslker.Parent:5588
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005618;//jslker.Parent:5618
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005670;//jslker.Parent:5670
        _this.ctx.fill();
        $LASTPOS=1005691;//jslker.Parent:5691
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005436;//jslker.Parent:5436
      if (_this.searchCanvas()) {
        $LASTPOS=1005465;//jslker.Parent:5465
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005504;//jslker.Parent:5504
        _this.ctx.save();
        $LASTPOS=1005525;//jslker.Parent:5525
        _this.ctx.beginPath();
        $LASTPOS=1005551;//jslker.Parent:5551
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005588;//jslker.Parent:5588
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005618;//jslker.Parent:5618
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005670;//jslker.Parent:5670
        _this.ctx.fill();
        $LASTPOS=1005691;//jslker.Parent:5691
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005746;//jslker.Parent:5746
      if (_this.searchCanvas()) {
        $LASTPOS=1005775;//jslker.Parent:5775
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005814;//jslker.Parent:5814
        _this.ctx.beginPath();
        $LASTPOS=1005840;//jslker.Parent:5840
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005868;//jslker.Parent:5868
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005896;//jslker.Parent:5896
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005746;//jslker.Parent:5746
      if (_this.searchCanvas()) {
        $LASTPOS=1005775;//jslker.Parent:5775
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005814;//jslker.Parent:5814
        _this.ctx.beginPath();
        $LASTPOS=1005840;//jslker.Parent:5840
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005868;//jslker.Parent:5868
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005896;//jslker.Parent:5896
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005947;//jslker.Parent:5947
      if (_this.searchCanvas()) {
        $LASTPOS=1005976;//jslker.Parent:5976
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1006015;//jslker.Parent:6015
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005947;//jslker.Parent:5947
      if (_this.searchCanvas()) {
        $LASTPOS=1005976;//jslker.Parent:5976
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1006015;//jslker.Parent:6015
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1006073;//jslker.Parent:6073
      if (_this.searchCanvas()) {
        $LASTPOS=1006102;//jslker.Parent:6102
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1006141;//jslker.Parent:6141
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1006073;//jslker.Parent:6073
      if (_this.searchCanvas()) {
        $LASTPOS=1006102;//jslker.Parent:6102
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1006141;//jslker.Parent:6141
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this;
      
      $LASTPOS=1006204;//jslker.Parent:6204
      _this.activityGroup=_this.activityGroup||"default";
      $LASTPOS=1006249;//jslker.Parent:6249
      _this.keyData=[];
      $LASTPOS=1006266;//jslker.Parent:6266
      _this.document.onkeydown=(function anonymous_6287(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006310;//jslker.Parent:6310
        if (! e) {
          $LASTPOS=1006317;//jslker.Parent:6317
          e=window.event;
        }
        $LASTPOS=1006344;//jslker.Parent:6344
        key_code = e.keyCode;
        
        $LASTPOS=1006379;//jslker.Parent:6379
        key_char = String.fromCharCode(key_code).toLowerCase();
        
        $LASTPOS=1006448;//jslker.Parent:6448
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1006517;//jslker.Parent:6517
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1006555;//jslker.Parent:6555
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1006621;//jslker.Parent:6621
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1006658;//jslker.Parent:6658
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1006721;//jslker.Parent:6721
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1006757;//jslker.Parent:6757
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1006819;//jslker.Parent:6819
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1006852;//jslker.Parent:6852
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1006910;//jslker.Parent:6910
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1006941;//jslker.Parent:6941
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1007005;//jslker.Parent:7005
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1007039;//jslker.Parent:7039
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1007101;//jslker.Parent:7101
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1007134;//jslker.Parent:7134
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1007180;//jslker.Parent:7180
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
      $LASTPOS=1007345;//jslker.Parent:7345
      _this.document.onkeyup=(function anonymous_7364(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1007387;//jslker.Parent:7387
        if (! e) {
          $LASTPOS=1007394;//jslker.Parent:7394
          e=window.event;
        }
        $LASTPOS=1007421;//jslker.Parent:7421
        key_code = e.keyCode;
        
        $LASTPOS=1007456;//jslker.Parent:7456
        key_char = String.fromCharCode(key_code).toLowerCase();
        
        $LASTPOS=1007525;//jslker.Parent:7525
        if (e.keyCode==16) {
          $LASTPOS=1007543;//jslker.Parent:7543
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1007581;//jslker.Parent:7581
          if (e.keyCode==17) {
            $LASTPOS=1007599;//jslker.Parent:7599
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1007636;//jslker.Parent:7636
            if (e.keyCode==18) {
              $LASTPOS=1007654;//jslker.Parent:7654
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1007690;//jslker.Parent:7690
              if (e.keyCode==37) {
                $LASTPOS=1007708;//jslker.Parent:7708
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1007741;//jslker.Parent:7741
                if (e.keyCode==38) {
                  $LASTPOS=1007759;//jslker.Parent:7759
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1007790;//jslker.Parent:7790
                  if (e.keyCode==39) {
                    $LASTPOS=1007808;//jslker.Parent:7808
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1007842;//jslker.Parent:7842
                    if (e.keyCode==40) {
                      $LASTPOS=1007860;//jslker.Parent:7860
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1007893;//jslker.Parent:7893
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
      
      $LASTPOS=1008417;//jslker.Parent:8417
      a = Array.prototype.slice.call(arguments);
      
      $LASTPOS=1008467;//jslker.Parent:8467
      methodName = a.shift();
      
      $LASTPOS=1008498;//jslker.Parent:8498
      t = Tonyu.thread();
      
      $LASTPOS=1008525;//jslker.Parent:8525
      t.apply(_this,methodName,a);
      $LASTPOS=1008558;//jslker.Parent:8558
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
      
      $LASTPOS=1008417;//jslker.Parent:8417
      a = Array.prototype.slice.call(_arguments);
      
      $LASTPOS=1008467;//jslker.Parent:8467
      methodName = a.shift();
      
      $LASTPOS=1008498;//jslker.Parent:8498
      t = Tonyu.thread();
      
      $LASTPOS=1008525;//jslker.Parent:8525
      t.apply(_this,methodName,a);
      $LASTPOS=1008558;//jslker.Parent:8558
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this;
      var clicked;
      var _func;
      
      $LASTPOS=1008596;//jslker.Parent:8596
      clicked = 0;
      
      $LASTPOS=1008616;//jslker.Parent:8616
      _func = (function anonymous_8626() {
        
        $LASTPOS=1008647;//jslker.Parent:8647
        clicked=1;
      });
      
      $LASTPOS=1008671;//jslker.Parent:8671
      _this.onClick(elem,_func);
      $LASTPOS=1008697;//jslker.Parent:8697
      while (clicked==0) {
        Tonyu.checkLoop();
        $LASTPOS=1008725;//jslker.Parent:8725
        _this.wait(10);
        
      }
      $LASTPOS=1008747;//jslker.Parent:8747
      _this.findElement(elem).off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=1008596;//jslker.Parent:8596
      clicked = 0;
      
      $LASTPOS=1008616;//jslker.Parent:8616
      _func = (function anonymous_8626() {
        
        $LASTPOS=1008647;//jslker.Parent:8647
        clicked=1;
      });
      
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008671;//jslker.Parent:8671
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008697;//jslker.Parent:8697
          case 2:
            if (!(clicked==0)) { __pc=4     ; break; }
            $LASTPOS=1008725;//jslker.Parent:8725
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4     :
            
            $LASTPOS=1008747;//jslker.Parent:8747
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
      
      $LASTPOS=1008818;//jslker.Parent:8818
      t = null;
      
      $LASTPOS=1008838;//jslker.Parent:8838
      t.suspend();
      $LASTPOS=1008856;//jslker.Parent:8856
      _this._err=null;
      $LASTPOS=1008872;//jslker.Parent:8872
      promise.then((function anonymous_8885(r) {
        
        $LASTPOS=1008901;//jslker.Parent:8901
        _this._res=r;
        $LASTPOS=1008918;//jslker.Parent:8918
        t.steps();
      }),(function anonymous_8936(e) {
        
        $LASTPOS=1008952;//jslker.Parent:8952
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1009035;//jslker.Parent:9035
        t.steps();
      }));
    },
    fiber$_waitFor :function _trc_Parent_f__waitFor(_thread,promise) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1008818;//jslker.Parent:8818
      t = _thread;
      
      $LASTPOS=1008838;//jslker.Parent:8838
      t.suspend();
      $LASTPOS=1008856;//jslker.Parent:8856
      _this._err=null;
      $LASTPOS=1008872;//jslker.Parent:8872
      promise.then((function anonymous_8885(r) {
        
        $LASTPOS=1008901;//jslker.Parent:8901
        _this._res=r;
        $LASTPOS=1008918;//jslker.Parent:8918
        t.steps();
      }),(function anonymous_8936(e) {
        
        $LASTPOS=1008952;//jslker.Parent:8952
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1009035;//jslker.Parent:9035
        t.steps();
      }));
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_Parent_waitFor(promise) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1009084;//jslker.Parent:9084
      _this._waitFor(promise);
      $LASTPOS=1009108;//jslker.Parent:9108
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
            $LASTPOS=1009084;//jslker.Parent:9084
            _this.fiber$_waitFor(_thread, promise);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1009108;//jslker.Parent:9108
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
      
      $LASTPOS=1009459;//jslker.Parent:9459
      url = window.location.href;
      
      $LASTPOS=1009494;//jslker.Parent:9494
      p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
      
      
      $LASTPOS=1009696;//jslker.Parent:9696
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
      
      $LASTPOS=1009459;//jslker.Parent:9459
      url = window.location.href;
      
      $LASTPOS=1009494;//jslker.Parent:9494
      p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
      
      
      
      _thread.enter(function _trc_Parent_ent_putToServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009696;//jslker.Parent:9696
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
      
      $LASTPOS=1009749;//jslker.Parent:9749
      _this.activityGroup=g||"default";
    },
    fiber$setGroup :function _trc_Parent_f_setGroup(_thread,g) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1009749;//jslker.Parent:9749
      _this.activityGroup=g||"default";
      
      _thread.retVal=_this;return;
    },
    getFromServer :function _trc_Parent_getFromServer(key) {
      "use strict";
      var _this=this;
      var url;
      var p;
      var r;
      
      $LASTPOS=1009808;//jslker.Parent:9808
      url = window.location.href;
      
      $LASTPOS=1009843;//jslker.Parent:9843
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      $LASTPOS=1009994;//jslker.Parent:9994
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
      
      $LASTPOS=1009808;//jslker.Parent:9808
      url = window.location.href;
      
      $LASTPOS=1009843;//jslker.Parent:9843
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      
      _thread.enter(function _trc_Parent_ent_getFromServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009994;//jslker.Parent:9994
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
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      $LASTPOS=1010441;//jslker.Parent:10441
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
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_addLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010441;//jslker.Parent:10441
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
      
      $LASTPOS=1010512;//jslker.Parent:10512
      _this.group=_this.activityGroup;
      $LASTPOS=1010538;//jslker.Parent:10538
      url = window.location.href;
      
      $LASTPOS=1010573;//jslker.Parent:10573
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010640;//jslker.Parent:10640
      if (d1!=null) {
        $LASTPOS=1010654;//jslker.Parent:10654
        params+="&data1="+d1;
      }
      $LASTPOS=1010681;//jslker.Parent:10681
      if (d2!=null) {
        $LASTPOS=1010695;//jslker.Parent:10695
        params+="&data2="+d2;
      }
      $LASTPOS=1010722;//jslker.Parent:10722
      if (d3!=null) {
        $LASTPOS=1010736;//jslker.Parent:10736
        params+="&data3="+d3;
      }
      $LASTPOS=1010763;//jslker.Parent:10763
      if (d4!=null) {
        $LASTPOS=1010777;//jslker.Parent:10777
        params+="&data4="+d4;
      }
      $LASTPOS=1010804;//jslker.Parent:10804
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      $LASTPOS=1010890;//jslker.Parent:10890
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
      
      $LASTPOS=1010512;//jslker.Parent:10512
      _this.group=_this.activityGroup;
      $LASTPOS=1010538;//jslker.Parent:10538
      url = window.location.href;
      
      $LASTPOS=1010573;//jslker.Parent:10573
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010640;//jslker.Parent:10640
      if (d1!=null) {
        $LASTPOS=1010654;//jslker.Parent:10654
        params+="&data1="+d1;
      }
      $LASTPOS=1010681;//jslker.Parent:10681
      if (d2!=null) {
        $LASTPOS=1010695;//jslker.Parent:10695
        params+="&data2="+d2;
      }
      $LASTPOS=1010722;//jslker.Parent:10722
      if (d3!=null) {
        $LASTPOS=1010736;//jslker.Parent:10736
        params+="&data3="+d3;
      }
      $LASTPOS=1010763;//jslker.Parent:10763
      if (d4!=null) {
        $LASTPOS=1010777;//jslker.Parent:10777
        params+="&data4="+d4;
      }
      $LASTPOS=1010804;//jslker.Parent:10804
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_findLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010890;//jslker.Parent:10890
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
    curProject :function _trc_Parent_curProject() {
      "use strict";
      var _this=this;
      var url;
      var params;
      var p;
      var r;
      
      
      $LASTPOS=1010958;//jslker.Parent:10958
      if (typeof  BitArrow==="object"&&BitArrow.publishedURL) {
        $LASTPOS=1011026;//jslker.Parent:11026
        url=BitArrow.publishedURL;
        
      } else {
        $LASTPOS=1011076;//jslker.Parent:11076
        url=window.location.href;
        
      }
      $LASTPOS=1011114;//jslker.Parent:11114
      params = "&url="+url;
      
      $LASTPOS=1011143;//jslker.Parent:11143
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/info"+params);
      
      
      $LASTPOS=1011230;//jslker.Parent:11230
      r=_this.waitFor(p);
      return r;
    },
    fiber$curProject :function _trc_Parent_f_curProject(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var params;
      var p;
      var r;
      
      
      $LASTPOS=1010958;//jslker.Parent:10958
      if (typeof  BitArrow==="object"&&BitArrow.publishedURL) {
        $LASTPOS=1011026;//jslker.Parent:11026
        url=BitArrow.publishedURL;
        
      } else {
        $LASTPOS=1011076;//jslker.Parent:11076
        url=window.location.href;
        
      }
      $LASTPOS=1011114;//jslker.Parent:11114
      params = "&url="+url;
      
      $LASTPOS=1011143;//jslker.Parent:11143
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/info"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_curProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1011230;//jslker.Parent:11230
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
    createGraph :function _trc_Parent_createGraph(target,src) {
      "use strict";
      var _this=this;
      var e;
      var g;
      
      $LASTPOS=1011301;//jslker.Parent:11301
      e = _this.findElement(target);
      
      $LASTPOS=1011333;//jslker.Parent:11333
      if (! e[0]) {
        $LASTPOS=1011355;//jslker.Parent:11355
        e=$("<div>").appendTo("body");
        
      }
      $LASTPOS=1011398;//jslker.Parent:11398
      g = new Tonyu.classes.jslker.Graph(e[0]);
      
      $LASTPOS=1011426;//jslker.Parent:11426
      g.src=src||[];
      return g;
    },
    fiber$createGraph :function _trc_Parent_f_createGraph(_thread,target,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      var g;
      
      
      _thread.enter(function _trc_Parent_ent_createGraph(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1011301;//jslker.Parent:11301
            _this.fiber$findElement(_thread, target);
            __pc=1;return;
          case 1:
            e=_thread.retVal;
            
            $LASTPOS=1011333;//jslker.Parent:11333
            if (! e[0]) {
              $LASTPOS=1011355;//jslker.Parent:11355
              e=$("<div>").appendTo("body");
              
            }
            $LASTPOS=1011398;//jslker.Parent:11398
            g = new Tonyu.classes.jslker.Graph(e[0]);
            
            $LASTPOS=1011426;//jslker.Parent:11426
            g.src=src||[];
            _thread.exit(g);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"setInterval":{"nowait":false},"setTimeout":{"nowait":false},"catchException":{"nowait":false},"findElement":{"nowait":false},"isFormElement":{"nowait":false},"clearContent":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"searchCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"new":{"nowait":false},"getkey":{"nowait":false},"dist":{"nowait":false},"angle":{"nowait":false},"rad":{"nowait":true},"deg":{"nowait":true},"sqrt":{"nowait":false},"sin":{"nowait":false},"cos":{"nowait":false},"tan":{"nowait":false},"parallel":{"nowait":false},"waitClick":{"nowait":false},"_waitFor":{"nowait":false},"waitFor":{"nowait":false},"putToServer":{"nowait":false},"setGroup":{"nowait":false},"getFromServer":{"nowait":false},"addLog":{"nowait":false},"findLog":{"nowait":false},"curProject":{"nowait":false},"createGraph":{"nowait":false}},"fields":{"document":{},"down":{},"_canvas":{},"ctx":{},"Math":{},"activityGroup":{},"keyData":{},"_err":{},"_res":{},"group":{}}}
});
Tonyu.klass.define({
  fullName: 'jslker.Graph',
  shortName: 'Graph',
  namespace: 'jslker',
  includes: [],
  methods: {
    main :function _trc_Graph_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Graph_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Graph_initialize(div) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000091;//jslker.Graph:91
      _this._place=div;
      $LASTPOS=2000113;//jslker.Graph:113
      _this._xaxname="";
      $LASTPOS=2000136;//jslker.Graph:136
      _this._yaxname="";
      $LASTPOS=2000159;//jslker.Graph:159
      _this._xrange;
      $LASTPOS=2000178;//jslker.Graph:178
      _this._yrange;
      $LASTPOS=2000197;//jslker.Graph:197
      _this._isDrawCor=false;
      $LASTPOS=2000225;//jslker.Graph:225
      _this.plotlyURL="runtime/lib/plotly-latest.min.js";
      $LASTPOS=2000276;//jslker.Graph:276
      window.$.getScript(_this.plotlyURL);
      $LASTPOS=2000312;//jslker.Graph:312
      window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
      $LASTPOS=2000354;//jslker.Graph:354
      _this.loadLibHandlers=[];
      $LASTPOS=2000379;//jslker.Graph:379
      _this._corObj={};
      $LASTPOS=2000401;//jslker.Graph:401
      _this.src=_this.src||[];
    },
    addData :function _trc_Graph_addData(d) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000437;//jslker.Graph:437
      _this.src.push(d);
    },
    fiber$addData :function _trc_Graph_f_addData(_thread,d) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000437;//jslker.Graph:437
      _this.src.push(d);
      
      _thread.retVal=_this;return;
    },
    onLoadLib :function _trc_Graph_onLoadLib(f) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000475;//jslker.Graph:475
      if (_this.Plotly) {
        $LASTPOS=2000487;//jslker.Graph:487
        f(_this.Plotly);
      } else {
        $LASTPOS=2000508;//jslker.Graph:508
        _this.loadLibHandlers.push(f);
      }
    },
    fiber$onLoadLib :function _trc_Graph_f_onLoadLib(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000475;//jslker.Graph:475
      if (_this.Plotly) {
        $LASTPOS=2000487;//jslker.Graph:487
        f(_this.Plotly);
      } else {
        $LASTPOS=2000508;//jslker.Graph:508
        _this.loadLibHandlers.push(f);
      }
      
      _thread.retVal=_this;return;
    },
    waitLoadLib :function _trc_Graph_waitLoadLib() {
      "use strict";
      var _this=this;
      var f;
      var _it_50;
      
      $LASTPOS=2000559;//jslker.Graph:559
      if (! window.Plotly) {
        $LASTPOS=2000590;//jslker.Graph:590
        window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
        
      } else {
        $LASTPOS=2000650;//jslker.Graph:650
        _this.Plotly=window.Plotly;
        $LASTPOS=2000681;//jslker.Graph:681
        _it_50=Tonyu.iterator(_this.loadLibHandlers,1);
        while(_it_50.next()) {
          f=_it_50[0];
          
          $LASTPOS=2000712;//jslker.Graph:712
          f(_this.Plotly);
        }
        
      }
    },
    fiber$waitLoadLib :function _trc_Graph_f_waitLoadLib(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var _it_50;
      
      $LASTPOS=2000559;//jslker.Graph:559
      if (! window.Plotly) {
        $LASTPOS=2000590;//jslker.Graph:590
        window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
        
      } else {
        $LASTPOS=2000650;//jslker.Graph:650
        _this.Plotly=window.Plotly;
        $LASTPOS=2000681;//jslker.Graph:681
        _it_50=Tonyu.iterator(_this.loadLibHandlers,1);
        while(_it_50.next()) {
          f=_it_50[0];
          
          $LASTPOS=2000712;//jslker.Graph:712
          f(_this.Plotly);
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    _setCorrelation :function _trc_Graph__setCorrelation(x,y,min,max,interval) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000787;//jslker.Graph:787
      if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
        return _this;
        
      }
      $LASTPOS=2000888;//jslker.Graph:888
      console.log(min,max,interval);
      $LASTPOS=2000924;//jslker.Graph:924
      _this._corObj=_this._correlation(x,y,min,max,interval);
      $LASTPOS=2000978;//jslker.Graph:978
      _this._isDrawCor=true;
    },
    fiber$_setCorrelation :function _trc_Graph_f__setCorrelation(_thread,x,y,min,max,interval) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000787;//jslker.Graph:787
      if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
        _thread.retVal=_this;return;
        
        
      }
      $LASTPOS=2000888;//jslker.Graph:888
      console.log(min,max,interval);
      
      _thread.enter(function _trc_Graph_ent__setCorrelation(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000924;//jslker.Graph:924
            _this.fiber$_correlation(_thread, x, y, min, max, interval);
            __pc=1;return;
          case 1:
            _this._corObj=_thread.retVal;
            
            $LASTPOS=2000978;//jslker.Graph:978
            _this._isDrawCor=true;
            _thread.exit(_this);return;
          }
        }
      });
    },
    setAxisText :function _trc_Graph_setAxisText(x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001036;//jslker.Graph:1036
      _this._xaxname=x;
      $LASTPOS=2001058;//jslker.Graph:1058
      _this._yaxname=y;
    },
    fiber$setAxisText :function _trc_Graph_f_setAxisText(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2001036;//jslker.Graph:1036
      _this._xaxname=x;
      $LASTPOS=2001058;//jslker.Graph:1058
      _this._yaxname=y;
      
      _thread.retVal=_this;return;
    },
    setXAxisText :function _trc_Graph_setXAxisText(x) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001110;//jslker.Graph:1110
      _this._xaxname=x;
    },
    fiber$setXAxisText :function _trc_Graph_f_setXAxisText(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2001110;//jslker.Graph:1110
      _this._xaxname=x;
      
      _thread.retVal=_this;return;
    },
    setYAxisText :function _trc_Graph_setYAxisText(y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001162;//jslker.Graph:1162
      _this._yaxname=y;
    },
    fiber$setYAxisText :function _trc_Graph_f_setYAxisText(_thread,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2001162;//jslker.Graph:1162
      _this._yaxname=y;
      
      _thread.retVal=_this;return;
    },
    setXRange :function _trc_Graph_setXRange(min,max) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001217;//jslker.Graph:1217
      _this._xrange=[min,max];
    },
    fiber$setXRange :function _trc_Graph_f_setXRange(_thread,min,max) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2001217;//jslker.Graph:1217
      _this._xrange=[min,max];
      
      _thread.retVal=_this;return;
    },
    setYRange :function _trc_Graph_setYRange(min,max) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001279;//jslker.Graph:1279
      _this._yrange=[min,max];
    },
    fiber$setYRange :function _trc_Graph_f_setYRange(_thread,min,max) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2001279;//jslker.Graph:1279
      _this._yrange=[min,max];
      
      _thread.retVal=_this;return;
    },
    line :function _trc_Graph_line(xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001340;//jslker.Graph:1340
      _this._drawGraph("line",xaxis,yaxis);
    },
    fiber$line :function _trc_Graph_f_line(_thread,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Graph_ent_line(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2001340;//jslker.Graph:1340
            _this.fiber$_drawGraph(_thread, "line", xaxis, yaxis);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    bar :function _trc_Graph_bar(xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001408;//jslker.Graph:1408
      _this._drawGraph("bar",xaxis,yaxis);
    },
    fiber$bar :function _trc_Graph_f_bar(_thread,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Graph_ent_bar(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2001408;//jslker.Graph:1408
            _this.fiber$_drawGraph(_thread, "bar", xaxis, yaxis);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    min :function _trc_Graph_min(k) {
      "use strict";
      var _this=this;
      var ary;
      var i;
      
      $LASTPOS=2001465;//jslker.Graph:1465
      ary = new Array();
      
      $LASTPOS=2001491;//jslker.Graph:1491
      $LASTPOS=2001495;//jslker.Graph:1495
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2001531;//jslker.Graph:1531
          ary.push(_this.src[i][k]);
        }
      }
      $LASTPOS=2001564;//jslker.Graph:1564
      ary.sort((function anonymous_1573(a,b) {
        
        return a-b;
      }));
      return ary[0];
    },
    fiber$min :function _trc_Graph_f_min(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ary;
      var i;
      
      $LASTPOS=2001465;//jslker.Graph:1465
      ary = new Array();
      
      $LASTPOS=2001491;//jslker.Graph:1491
      $LASTPOS=2001495;//jslker.Graph:1495
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2001531;//jslker.Graph:1531
          ary.push(_this.src[i][k]);
        }
      }
      $LASTPOS=2001564;//jslker.Graph:1564
      ary.sort((function anonymous_1573(a,b) {
        
        return a-b;
      }));
      _thread.retVal=ary[0];return;
      
      
      _thread.retVal=_this;return;
    },
    max :function _trc_Graph_max(k) {
      "use strict";
      var _this=this;
      var ary;
      var i;
      
      $LASTPOS=2001648;//jslker.Graph:1648
      ary = new Array();
      
      $LASTPOS=2001674;//jslker.Graph:1674
      $LASTPOS=2001678;//jslker.Graph:1678
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2001714;//jslker.Graph:1714
          ary.push(_this.src[i][k]);
        }
      }
      $LASTPOS=2001747;//jslker.Graph:1747
      ary.sort((function anonymous_1756(a,b) {
        
        return b-a;
      }));
      return ary[0];
    },
    fiber$max :function _trc_Graph_f_max(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ary;
      var i;
      
      $LASTPOS=2001648;//jslker.Graph:1648
      ary = new Array();
      
      $LASTPOS=2001674;//jslker.Graph:1674
      $LASTPOS=2001678;//jslker.Graph:1678
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2001714;//jslker.Graph:1714
          ary.push(_this.src[i][k]);
        }
      }
      $LASTPOS=2001747;//jslker.Graph:1747
      ary.sort((function anonymous_1756(a,b) {
        
        return b-a;
      }));
      _thread.retVal=ary[0];return;
      
      
      _thread.retVal=_this;return;
    },
    med :function _trc_Graph_med(k) {
      "use strict";
      var _this=this;
      var half;
      var temp;
      
      $LASTPOS=2001832;//jslker.Graph:1832
      half = Math.ceil(_this.src.length/2);
      
      $LASTPOS=2001873;//jslker.Graph:1873
      temp = _this.src.sort((function anonymous_1893(a,b) {
        
        $LASTPOS=2001917;//jslker.Graph:1917
        console.log(a[k],b[k]);
        $LASTPOS=2001950;//jslker.Graph:1950
        if ((a[k]-0)>(b[k]-0)) {
          return - 1;
        }
        $LASTPOS=2001992;//jslker.Graph:1992
        if ((a[k]-0)<(b[k]-0)) {
          return 1;
        }
        return 0;
      }));
      
      $LASTPOS=2002057;//jslker.Graph:2057
      if (temp.length%2) {
        return temp[half][k];
        
      }
      return ((temp[half-1][k]-0)+(temp[half][k]-0))/2;
    },
    fiber$med :function _trc_Graph_f_med(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var half;
      var temp;
      
      $LASTPOS=2001832;//jslker.Graph:1832
      half = Math.ceil(_this.src.length/2);
      
      $LASTPOS=2001873;//jslker.Graph:1873
      temp = _this.src.sort((function anonymous_1893(a,b) {
        
        $LASTPOS=2001917;//jslker.Graph:1917
        console.log(a[k],b[k]);
        $LASTPOS=2001950;//jslker.Graph:1950
        if ((a[k]-0)>(b[k]-0)) {
          return - 1;
        }
        $LASTPOS=2001992;//jslker.Graph:1992
        if ((a[k]-0)<(b[k]-0)) {
          return 1;
        }
        return 0;
      }));
      
      $LASTPOS=2002057;//jslker.Graph:2057
      if (temp.length%2) {
        _thread.retVal=temp[half][k];return;
        
        
      }
      _thread.retVal=((temp[half-1][k]-0)+(temp[half][k]-0))/2;return;
      
      
      _thread.retVal=_this;return;
    },
    mode :function _trc_Graph_mode(k) {
      "use strict";
      var _this=this;
      var counter;
      var nativeValues;
      var maxCounter;
      var maxValue;
      var i;
      var j;
      var ret;
      
      $LASTPOS=2002200;//jslker.Graph:2200
      counter = {};
      
      $LASTPOS=2002223;//jslker.Graph:2223
      nativeValues = {};
      
      $LASTPOS=2002251;//jslker.Graph:2251
      maxCounter = 0;
      
      $LASTPOS=2002276;//jslker.Graph:2276
      maxValue = null;
      
      $LASTPOS=2002302;//jslker.Graph:2302
      $LASTPOS=2002307;//jslker.Graph:2307
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002350;//jslker.Graph:2350
          if (! counter[_this.src[i][k]]) {
            $LASTPOS=2002390;//jslker.Graph:2390
            counter[_this.src[i][k]]=0;
            
          }
          $LASTPOS=2002434;//jslker.Graph:2434
          counter[_this.src[i][k]]++;
          $LASTPOS=2002465;//jslker.Graph:2465
          nativeValues[_this.src[i][k]]=_this.src[i][k];
        }
      }
      $LASTPOS=2002514;//jslker.Graph:2514
      $LASTPOS=2002519;//jslker.Graph:2519
      j = 0;
      for (; j<Object.keys(counter).length ; j++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002579;//jslker.Graph:2579
          _this.key=Object.keys(counter)[j];
          $LASTPOS=2002619;//jslker.Graph:2619
          if (counter[_this.key]>maxCounter) {
            $LASTPOS=2002665;//jslker.Graph:2665
            maxCounter=counter[_this.key];
            $LASTPOS=2002705;//jslker.Graph:2705
            maxValue=nativeValues[_this.key];
            
          }
        }
      }
      $LASTPOS=2002758;//jslker.Graph:2758
      ret = [];
      
      $LASTPOS=2002775;//jslker.Graph:2775
      $LASTPOS=2002780;//jslker.Graph:2780
      j = 0;
      for (; j<Object.keys(counter).length ; j++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002840;//jslker.Graph:2840
          _this.key=Object.keys(counter)[j];
          $LASTPOS=2002880;//jslker.Graph:2880
          if (counter[_this.key]==maxCounter) {
            $LASTPOS=2002927;//jslker.Graph:2927
            ret.push(nativeValues[_this.key]);
            
          }
        }
      }
      return {"mode": maxCounter,"nums": ret};
    },
    fiber$mode :function _trc_Graph_f_mode(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var counter;
      var nativeValues;
      var maxCounter;
      var maxValue;
      var i;
      var j;
      var ret;
      
      $LASTPOS=2002200;//jslker.Graph:2200
      counter = {};
      
      $LASTPOS=2002223;//jslker.Graph:2223
      nativeValues = {};
      
      $LASTPOS=2002251;//jslker.Graph:2251
      maxCounter = 0;
      
      $LASTPOS=2002276;//jslker.Graph:2276
      maxValue = null;
      
      $LASTPOS=2002302;//jslker.Graph:2302
      $LASTPOS=2002307;//jslker.Graph:2307
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002350;//jslker.Graph:2350
          if (! counter[_this.src[i][k]]) {
            $LASTPOS=2002390;//jslker.Graph:2390
            counter[_this.src[i][k]]=0;
            
          }
          $LASTPOS=2002434;//jslker.Graph:2434
          counter[_this.src[i][k]]++;
          $LASTPOS=2002465;//jslker.Graph:2465
          nativeValues[_this.src[i][k]]=_this.src[i][k];
        }
      }
      $LASTPOS=2002514;//jslker.Graph:2514
      $LASTPOS=2002519;//jslker.Graph:2519
      j = 0;
      for (; j<Object.keys(counter).length ; j++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002579;//jslker.Graph:2579
          _this.key=Object.keys(counter)[j];
          $LASTPOS=2002619;//jslker.Graph:2619
          if (counter[_this.key]>maxCounter) {
            $LASTPOS=2002665;//jslker.Graph:2665
            maxCounter=counter[_this.key];
            $LASTPOS=2002705;//jslker.Graph:2705
            maxValue=nativeValues[_this.key];
            
          }
        }
      }
      $LASTPOS=2002758;//jslker.Graph:2758
      ret = [];
      
      $LASTPOS=2002775;//jslker.Graph:2775
      $LASTPOS=2002780;//jslker.Graph:2780
      j = 0;
      for (; j<Object.keys(counter).length ; j++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002840;//jslker.Graph:2840
          _this.key=Object.keys(counter)[j];
          $LASTPOS=2002880;//jslker.Graph:2880
          if (counter[_this.key]==maxCounter) {
            $LASTPOS=2002927;//jslker.Graph:2927
            ret.push(nativeValues[_this.key]);
            
          }
        }
      }
      _thread.retVal={"mode": maxCounter,"nums": ret};return;
      
      
      _thread.retVal=_this;return;
    },
    freq :function _trc_Graph_freq(k) {
      "use strict";
      var _this=this;
      var ret;
      var o;
      var _it_72;
      
      $LASTPOS=2003045;//jslker.Graph:3045
      ret = [];
      
      $LASTPOS=2003062;//jslker.Graph:3062
      _it_72=Tonyu.iterator(_this.src,1);
      while(_it_72.next()) {
        o=_it_72[0];
        
        $LASTPOS=2003090;//jslker.Graph:3090
        if (ret[o[k]]) {
          $LASTPOS=2003118;//jslker.Graph:3118
          ret[o[k]]++;
          
        } else {
          $LASTPOS=2003160;//jslker.Graph:3160
          ret[o[k]]=1;
          
        }
        
      }
      return ret;
    },
    fiber$freq :function _trc_Graph_f_freq(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ret;
      var o;
      var _it_72;
      
      $LASTPOS=2003045;//jslker.Graph:3045
      ret = [];
      
      $LASTPOS=2003062;//jslker.Graph:3062
      _it_72=Tonyu.iterator(_this.src,1);
      while(_it_72.next()) {
        o=_it_72[0];
        
        $LASTPOS=2003090;//jslker.Graph:3090
        if (ret[o[k]]) {
          $LASTPOS=2003118;//jslker.Graph:3118
          ret[o[k]]++;
          
        } else {
          $LASTPOS=2003160;//jslker.Graph:3160
          ret[o[k]]=1;
          
        }
        
      }
      _thread.retVal=ret;return;
      
      
      _thread.retVal=_this;return;
    },
    scatter :function _trc_Graph_scatter(xaxis,yaxis,isCor) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2003256;//jslker.Graph:3256
      if (isCor==true) {
        $LASTPOS=2003272;//jslker.Graph:3272
        _this._setCorrelation(xaxis,yaxis,parseFloat(_this.min(xaxis)),parseFloat(_this.max(xaxis)),parseFloat((_this.max(xaxis)-_this.min(xaxis))/10));
      }
      $LASTPOS=2003392;//jslker.Graph:3392
      _this._drawGraph("scatter",xaxis,yaxis);
    },
    fiber$scatter :function _trc_Graph_f_scatter(_thread,xaxis,yaxis,isCor) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Graph_ent_scatter(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2003256;//jslker.Graph:3256
            if (!(isCor==true)) { __pc=2     ; break; }
            $LASTPOS=2003272;//jslker.Graph:3272
            _this.fiber$_setCorrelation(_thread, xaxis, yaxis, parseFloat(_this.min(xaxis)), parseFloat(_this.max(xaxis)), parseFloat((_this.max(xaxis)-_this.min(xaxis))/10));
            __pc=1;return;
          case 1:
            
          case 2     :
            
            $LASTPOS=2003392;//jslker.Graph:3392
            _this.fiber$_drawGraph(_thread, "scatter", xaxis, yaxis);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    pie :function _trc_Graph_pie(xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2003463;//jslker.Graph:3463
      _this._drawGraph("pie",xaxis,yaxis);
    },
    fiber$pie :function _trc_Graph_f_pie(_thread,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Graph_ent_pie(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2003463;//jslker.Graph:3463
            _this.fiber$_drawGraph(_thread, "pie", xaxis, yaxis);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    _drawGraph :function _trc_Graph__drawGraph(type,xaxis,yaxis) {
      "use strict";
      var _this=this;
      var x;
      var y;
      var xaxopt;
      var yaxopt;
      var i;
      var xv;
      var mode;
      var data;
      var options;
      
      $LASTPOS=2003542;//jslker.Graph:3542
      x = [];
      
      $LASTPOS=2003557;//jslker.Graph:3557
      y = [];
      
      $LASTPOS=2003572;//jslker.Graph:3572
      xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
      
      $LASTPOS=2003786;//jslker.Graph:3786
      yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
      
      $LASTPOS=2004032;//jslker.Graph:4032
      $LASTPOS=2004036;//jslker.Graph:4036
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2004072;//jslker.Graph:4072
          if (xaxis=="time") {
            $LASTPOS=2004104;//jslker.Graph:4104
            xv = _this.src[i][xaxis]*1000;
            
            $LASTPOS=2004144;//jslker.Graph:4144
            xaxopt["type"]='date';
            
          } else {
            $LASTPOS=2004196;//jslker.Graph:4196
            xv = _this.src[i][xaxis];
            
            
          }
          $LASTPOS=2004238;//jslker.Graph:4238
          x.push(xv);
          $LASTPOS=2004259;//jslker.Graph:4259
          y.push(_this.src[i][yaxis]);
        }
      }
      $LASTPOS=2004304;//jslker.Graph:4304
      if (type=="scatter") {
        $LASTPOS=2004334;//jslker.Graph:4334
        mode = "markers";
        
        
      } else {
        $LASTPOS=2004375;//jslker.Graph:4375
        mode = "lines";
        
        
      }
      $LASTPOS=2004405;//jslker.Graph:4405
      data = [{x: x,y: y,type: type,mode: mode}];
      
      $LASTPOS=2004514;//jslker.Graph:4514
      if (_this._isDrawCor===true) {
        $LASTPOS=2004546;//jslker.Graph:4546
        _this._corObj.mode='lines';
        $LASTPOS=2004577;//jslker.Graph:4577
        _this._corObj.line={dash: 'dot',width: 4};
        $LASTPOS=2004621;//jslker.Graph:4621
        data.push(_this._corObj);
        
      }
      $LASTPOS=2004653;//jslker.Graph:4653
      options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
      
      $LASTPOS=2005284;//jslker.Graph:5284
      _this.onLoadLib((function anonymous_5294(Plotly) {
        
        $LASTPOS=2005315;//jslker.Graph:5315
        Plotly.newPlot(_this._place,data,options);
      }));
    },
    fiber$_drawGraph :function _trc_Graph_f__drawGraph(_thread,type,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var x;
      var y;
      var xaxopt;
      var yaxopt;
      var i;
      var xv;
      var mode;
      var data;
      var options;
      
      $LASTPOS=2003542;//jslker.Graph:3542
      x = [];
      
      $LASTPOS=2003557;//jslker.Graph:3557
      y = [];
      
      $LASTPOS=2003572;//jslker.Graph:3572
      xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
      
      $LASTPOS=2003786;//jslker.Graph:3786
      yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
      
      $LASTPOS=2004032;//jslker.Graph:4032
      $LASTPOS=2004036;//jslker.Graph:4036
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2004072;//jslker.Graph:4072
          if (xaxis=="time") {
            $LASTPOS=2004104;//jslker.Graph:4104
            xv = _this.src[i][xaxis]*1000;
            
            $LASTPOS=2004144;//jslker.Graph:4144
            xaxopt["type"]='date';
            
          } else {
            $LASTPOS=2004196;//jslker.Graph:4196
            xv = _this.src[i][xaxis];
            
            
          }
          $LASTPOS=2004238;//jslker.Graph:4238
          x.push(xv);
          $LASTPOS=2004259;//jslker.Graph:4259
          y.push(_this.src[i][yaxis]);
        }
      }
      $LASTPOS=2004304;//jslker.Graph:4304
      if (type=="scatter") {
        $LASTPOS=2004334;//jslker.Graph:4334
        mode = "markers";
        
        
      } else {
        $LASTPOS=2004375;//jslker.Graph:4375
        mode = "lines";
        
        
      }
      $LASTPOS=2004405;//jslker.Graph:4405
      data = [{x: x,y: y,type: type,mode: mode}];
      
      $LASTPOS=2004514;//jslker.Graph:4514
      if (_this._isDrawCor===true) {
        $LASTPOS=2004546;//jslker.Graph:4546
        _this._corObj.mode='lines';
        $LASTPOS=2004577;//jslker.Graph:4577
        _this._corObj.line={dash: 'dot',width: 4};
        $LASTPOS=2004621;//jslker.Graph:4621
        data.push(_this._corObj);
        
      }
      $LASTPOS=2004653;//jslker.Graph:4653
      options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
      
      
      _thread.enter(function _trc_Graph_ent__drawGraph(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2005284;//jslker.Graph:5284
            _this.fiber$onLoadLib(_thread, (function anonymous_5294(Plotly) {
              
              $LASTPOS=2005315;//jslker.Graph:5315
              Plotly.newPlot(_this._place,data,options);
            }));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    sum :function _trc_Graph_sum(k) {
      "use strict";
      var _this=this;
      var s;
      var o;
      var _it_86;
      
      $LASTPOS=2005386;//jslker.Graph:5386
      s = 0;
      
      $LASTPOS=2005400;//jslker.Graph:5400
      if (typeof  (k)==="object") {
        $LASTPOS=2005435;//jslker.Graph:5435
        $LASTPOS=2005439;//jslker.Graph:5439
        _this.i=0;for (; _this.i<k.length ; _this.i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=2005473;//jslker.Graph:5473
            s+=k[_this.i]-0;
          }
        }
        
      } else {
        $LASTPOS=2005516;//jslker.Graph:5516
        _it_86=Tonyu.iterator(_this.src,1);
        while(_it_86.next()) {
          o=_it_86[0];
          
          $LASTPOS=2005548;//jslker.Graph:5548
          s+=o[k]-0;
          
        }
        
      }
      return s;
    },
    fiber$sum :function _trc_Graph_f_sum(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      var o;
      var _it_86;
      
      $LASTPOS=2005386;//jslker.Graph:5386
      s = 0;
      
      $LASTPOS=2005400;//jslker.Graph:5400
      if (typeof  (k)==="object") {
        $LASTPOS=2005435;//jslker.Graph:5435
        $LASTPOS=2005439;//jslker.Graph:5439
        _this.i=0;for (; _this.i<k.length ; _this.i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=2005473;//jslker.Graph:5473
            s+=k[_this.i]-0;
          }
        }
        
      } else {
        $LASTPOS=2005516;//jslker.Graph:5516
        _it_86=Tonyu.iterator(_this.src,1);
        while(_it_86.next()) {
          o=_it_86[0];
          
          $LASTPOS=2005548;//jslker.Graph:5548
          s+=o[k]-0;
          
        }
        
      }
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    mean :function _trc_Graph_mean(k) {
      "use strict";
      var _this=this;
      var a;
      
      $LASTPOS=2005619;//jslker.Graph:5619
      a = 0;
      
      $LASTPOS=2005633;//jslker.Graph:5633
      if (typeof  (k)==="object") {
        $LASTPOS=2005668;//jslker.Graph:5668
        a=_this.sum(k)/k.length;
        
      } else {
        $LASTPOS=2005708;//jslker.Graph:5708
        a=_this.sum(k)/_this.src.length;
        
      }
      return a;
    },
    fiber$mean :function _trc_Graph_f_mean(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      $LASTPOS=2005619;//jslker.Graph:5619
      a = 0;
      
      $LASTPOS=2005633;//jslker.Graph:5633
      if (typeof  (k)==="object") {
        $LASTPOS=2005668;//jslker.Graph:5668
        a=_this.sum(k)/k.length;
        
      } else {
        $LASTPOS=2005708;//jslker.Graph:5708
        a=_this.sum(k)/_this.src.length;
        
      }
      _thread.retVal=a;return;
      
      
      _thread.retVal=_this;return;
    },
    dev :function _trc_Graph_dev(k) {
      "use strict";
      var _this=this;
      var d;
      var a;
      var i;
      var o;
      var _it_91;
      
      $LASTPOS=2005777;//jslker.Graph:5777
      d = [];
      a = 0;
      
      $LASTPOS=2005796;//jslker.Graph:5796
      if (k===undefined) {
        $LASTPOS=2005824;//jslker.Graph:5824
        a=_this.mean(_this.src);
        $LASTPOS=2005846;//jslker.Graph:5846
        $LASTPOS=2005850;//jslker.Graph:5850
        i = 0;
        for (; i<_this.src.length ; i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=2005890;//jslker.Graph:5890
            d.push(_this.src[i]-a);
          }
        }
        
      } else {
        $LASTPOS=2005940;//jslker.Graph:5940
        a=_this.mean(k);
        $LASTPOS=2005960;//jslker.Graph:5960
        _it_91=Tonyu.iterator(_this.src,1);
        while(_it_91.next()) {
          o=_it_91[0];
          
          $LASTPOS=2005992;//jslker.Graph:5992
          d.push(o[k]-a);
          
        }
        
      }
      return d;
    },
    fiber$dev :function _trc_Graph_f_dev(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      var a;
      var i;
      var o;
      var _it_91;
      
      $LASTPOS=2005777;//jslker.Graph:5777
      d = [];
      a = 0;
      
      
      _thread.enter(function _trc_Graph_ent_dev(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2005796;//jslker.Graph:5796
            if (!(k===undefined)) { __pc=2     ; break; }
            $LASTPOS=2005824;//jslker.Graph:5824
            _this.fiber$mean(_thread, _this.src);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            $LASTPOS=2005846;//jslker.Graph:5846
            $LASTPOS=2005850;//jslker.Graph:5850
            i = 0;
            for (; i<_this.src.length ; i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=2005890;//jslker.Graph:5890
                d.push(_this.src[i]-a);
              }
            }
            __pc=4     ;break;
          case 2     :
            $LASTPOS=2005940;//jslker.Graph:5940
            _this.fiber$mean(_thread, k);
            __pc=3;return;
          case 3:
            a=_thread.retVal;
            
            $LASTPOS=2005960;//jslker.Graph:5960
            _it_91=Tonyu.iterator(_this.src,1);
            while(_it_91.next()) {
              o=_it_91[0];
              
              $LASTPOS=2005992;//jslker.Graph:5992
              d.push(o[k]-a);
              
            }
          case 4     :
            
            _thread.exit(d);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    vari :function _trc_Graph_vari(k) {
      "use strict";
      var _this=this;
      var ary;
      var deved;
      var i;
      
      $LASTPOS=2006068;//jslker.Graph:6068
      ary = [];
      
      $LASTPOS=2006085;//jslker.Graph:6085
      if (k===undefined) {
        $LASTPOS=2006113;//jslker.Graph:6113
        deved = _this.dev(_this.src);
        
        $LASTPOS=2006142;//jslker.Graph:6142
        $LASTPOS=2006146;//jslker.Graph:6146
        i = 0;
        for (; i<deved.length ; i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=2006188;//jslker.Graph:6188
            ary.push(Math.pow(deved[i],2));
          }
        }
        
      } else {
        $LASTPOS=2006252;//jslker.Graph:6252
        deved = _this.dev(k);
        
        $LASTPOS=2006279;//jslker.Graph:6279
        console.log(deved);
        $LASTPOS=2006308;//jslker.Graph:6308
        $LASTPOS=2006312;//jslker.Graph:6312
        i = 0;
        for (; i<deved.length ; i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=2006354;//jslker.Graph:6354
            ary.push(Math.pow(deved[i],2));
          }
        }
        
      }
      $LASTPOS=2006409;//jslker.Graph:6409
      console.log("arrry",ary);
      return _this.mean(ary);
    },
    fiber$vari :function _trc_Graph_f_vari(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ary;
      var deved;
      var i;
      
      $LASTPOS=2006068;//jslker.Graph:6068
      ary = [];
      
      
      _thread.enter(function _trc_Graph_ent_vari(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2006085;//jslker.Graph:6085
            if (!(k===undefined)) { __pc=2     ; break; }
            $LASTPOS=2006113;//jslker.Graph:6113
            _this.fiber$dev(_thread, _this.src);
            __pc=1;return;
          case 1:
            deved=_thread.retVal;
            
            $LASTPOS=2006142;//jslker.Graph:6142
            $LASTPOS=2006146;//jslker.Graph:6146
            i = 0;
            for (; i<deved.length ; i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=2006188;//jslker.Graph:6188
                ary.push(Math.pow(deved[i],2));
              }
            }
            __pc=4     ;break;
          case 2     :
            $LASTPOS=2006252;//jslker.Graph:6252
            _this.fiber$dev(_thread, k);
            __pc=3;return;
          case 3:
            deved=_thread.retVal;
            
            $LASTPOS=2006279;//jslker.Graph:6279
            console.log(deved);
            $LASTPOS=2006308;//jslker.Graph:6308
            $LASTPOS=2006312;//jslker.Graph:6312
            i = 0;
            for (; i<deved.length ; i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=2006354;//jslker.Graph:6354
                ary.push(Math.pow(deved[i],2));
              }
            }
          case 4     :
            
            $LASTPOS=2006409;//jslker.Graph:6409
            console.log("arrry",ary);
            _thread.exit(_this.mean(ary));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    std :function _trc_Graph_std(k) {
      "use strict";
      var _this=this;
      var disp;
      
      $LASTPOS=2006484;//jslker.Graph:6484
      disp = _this.vari(k);
      
      return Math.sqrt(disp);
    },
    fiber$std :function _trc_Graph_f_std(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var disp;
      
      
      _thread.enter(function _trc_Graph_ent_std(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2006484;//jslker.Graph:6484
            _this.fiber$vari(_thread, k);
            __pc=1;return;
          case 1:
            disp=_thread.retVal;
            
            _thread.exit(Math.sqrt(disp));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    cov :function _trc_Graph_cov(k1,k2) {
      "use strict";
      var _this=this;
      var dev1;
      var dev2;
      var dataCov;
      var k;
      var v;
      var _it_101;
      
      $LASTPOS=2006561;//jslker.Graph:6561
      dev1 = _this.dev(k1);
      
      $LASTPOS=2006584;//jslker.Graph:6584
      dev2 = _this.dev(k2);
      
      $LASTPOS=2006607;//jslker.Graph:6607
      dataCov = 0;
      
      $LASTPOS=2006627;//jslker.Graph:6627
      _it_101=Tonyu.iterator(dev1,2);
      while(_it_101.next()) {
        k=_it_101[0];
        v=_it_101[1];
        
        $LASTPOS=2006658;//jslker.Graph:6658
        dataCov+=dev1[k]*dev2[k];
        
      }
      $LASTPOS=2006696;//jslker.Graph:6696
      dataCov=dataCov/dev1.length;
      return dataCov;
    },
    fiber$cov :function _trc_Graph_f_cov(_thread,k1,k2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var dev1;
      var dev2;
      var dataCov;
      var k;
      var v;
      var _it_101;
      
      
      _thread.enter(function _trc_Graph_ent_cov(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2006561;//jslker.Graph:6561
            _this.fiber$dev(_thread, k1);
            __pc=1;return;
          case 1:
            dev1=_thread.retVal;
            
            $LASTPOS=2006584;//jslker.Graph:6584
            _this.fiber$dev(_thread, k2);
            __pc=2;return;
          case 2:
            dev2=_thread.retVal;
            
            $LASTPOS=2006607;//jslker.Graph:6607
            dataCov = 0;
            
            $LASTPOS=2006627;//jslker.Graph:6627
            _it_101=Tonyu.iterator(dev1,2);
            while(_it_101.next()) {
              k=_it_101[0];
              v=_it_101[1];
              
              $LASTPOS=2006658;//jslker.Graph:6658
              dataCov+=dev1[k]*dev2[k];
              
            }
            $LASTPOS=2006696;//jslker.Graph:6696
            dataCov=dataCov/dev1.length;
            _thread.exit(dataCov);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    corrcoef :function _trc_Graph_corrcoef(k1,k2) {
      "use strict";
      var _this=this;
      var cov1;
      var std1;
      var std2;
      
      $LASTPOS=2006781;//jslker.Graph:6781
      cov1 = _this.cov(k1,k2);
      
      $LASTPOS=2006807;//jslker.Graph:6807
      std1 = _this.std(k1);
      
      $LASTPOS=2006830;//jslker.Graph:6830
      std2 = _this.std(k2);
      
      return cov1/(std1*std2);
    },
    fiber$corrcoef :function _trc_Graph_f_corrcoef(_thread,k1,k2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cov1;
      var std1;
      var std2;
      
      
      _thread.enter(function _trc_Graph_ent_corrcoef(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2006781;//jslker.Graph:6781
            _this.fiber$cov(_thread, k1, k2);
            __pc=1;return;
          case 1:
            cov1=_thread.retVal;
            
            $LASTPOS=2006807;//jslker.Graph:6807
            _this.fiber$std(_thread, k1);
            __pc=2;return;
          case 2:
            std1=_thread.retVal;
            
            $LASTPOS=2006830;//jslker.Graph:6830
            _this.fiber$std(_thread, k2);
            __pc=3;return;
          case 3:
            std2=_thread.retVal;
            
            _thread.exit(cov1/(std1*std2));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    _correlation :function _trc_Graph__correlation(d1,d2,min,max,interval) {
      "use strict";
      var _this=this;
      var a;
      var b;
      var x;
      var y;
      var i;
      
      $LASTPOS=2006936;//jslker.Graph:6936
      a = _this.corrcoef(d1,d2)*(_this.std(d2)/_this.std(d1));
      
      $LASTPOS=2006982;//jslker.Graph:6982
      b = _this.mean(d2)-(a*_this.mean(d1));
      
      $LASTPOS=2007016;//jslker.Graph:7016
      x = [];
      
      $LASTPOS=2007031;//jslker.Graph:7031
      y = [];
      
      $LASTPOS=2007046;//jslker.Graph:7046
      $LASTPOS=2007050;//jslker.Graph:7050
      i = min;
      for (; i<=max+1 ; i=i+interval) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2007093;//jslker.Graph:7093
          console.log(i);
          $LASTPOS=2007118;//jslker.Graph:7118
          x.push(i);
          $LASTPOS=2007138;//jslker.Graph:7138
          y.push(a*i+b);
        }
      }
      return {x: x,y: y};
    },
    fiber$_correlation :function _trc_Graph_f__correlation(_thread,d1,d2,min,max,interval) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var b;
      var x;
      var y;
      var i;
      
      $LASTPOS=2006936;//jslker.Graph:6936
      a = _this.corrcoef(d1,d2)*(_this.std(d2)/_this.std(d1));
      
      $LASTPOS=2006982;//jslker.Graph:6982
      b = _this.mean(d2)-(a*_this.mean(d1));
      
      $LASTPOS=2007016;//jslker.Graph:7016
      x = [];
      
      $LASTPOS=2007031;//jslker.Graph:7031
      y = [];
      
      $LASTPOS=2007046;//jslker.Graph:7046
      $LASTPOS=2007050;//jslker.Graph:7050
      i = min;
      for (; i<=max+1 ; i=i+interval) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2007093;//jslker.Graph:7093
          console.log(i);
          $LASTPOS=2007118;//jslker.Graph:7118
          x.push(i);
          $LASTPOS=2007138;//jslker.Graph:7138
          y.push(a*i+b);
        }
      }
      _thread.retVal={x: x,y: y};return;
      
      
      _thread.retVal=_this;return;
    },
    setData :function _trc_Graph_setData(data) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2007217;//jslker.Graph:7217
      _this.src=data;
    },
    fiber$setData :function _trc_Graph_f_setData(_thread,data) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2007217;//jslker.Graph:7217
      _this.src=data;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"addData":{"nowait":false},"onLoadLib":{"nowait":false},"waitLoadLib":{"nowait":false},"_setCorrelation":{"nowait":false},"setAxisText":{"nowait":false},"setXAxisText":{"nowait":false},"setYAxisText":{"nowait":false},"setXRange":{"nowait":false},"setYRange":{"nowait":false},"line":{"nowait":false},"bar":{"nowait":false},"min":{"nowait":false},"max":{"nowait":false},"med":{"nowait":false},"mode":{"nowait":false},"freq":{"nowait":false},"scatter":{"nowait":false},"pie":{"nowait":false},"_drawGraph":{"nowait":false},"sum":{"nowait":false},"mean":{"nowait":false},"dev":{"nowait":false},"vari":{"nowait":false},"std":{"nowait":false},"cov":{"nowait":false},"corrcoef":{"nowait":false},"_correlation":{"nowait":false},"setData":{"nowait":false}},"fields":{"plotlyURL":{},"loadLibHandlers":{},"src":{},"Plotly":{},"key":{},"_xrange":{},"_yrange":{},"_isDrawCor":{},"_corObj":{},"_yaxname":{},"_xaxname":{},"_place":{},"i":{}}}
});

//# sourceMappingURL=concat.js.map