Tonyu.klass.define({
  fullName: 'jslker.Parent',
  shortName: 'Parent',
  namespace: 'jslker',
  includes: [],
  methods: {
    main :function _trc_Parent_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Parent_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __getter__Math :function _trc_Parent___getter__Math() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return window.Math;
    },
    __getter__document :function _trc_Parent___getter__document() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return window.document;
    },
    setInterval :function _trc_Parent_setInterval(f,t) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return window.setInterval(_this.catchException(f),t);
    },
    fiber$setInterval :function _trc_Parent_f_setInterval(_thread,f,t) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=window.setInterval(_this.catchException(f),t);return;
      
      
      _thread.retVal=_this;return;
    },
    setTimeout :function _trc_Parent_setTimeout(f,t) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return window.setTimeout(_this.catchException(f),t);
    },
    fiber$setTimeout :function _trc_Parent_f_setTimeout(_thread,f,t) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=window.setTimeout(_this.catchException(f),t);return;
      
      
      _thread.retVal=_this;return;
    },
    catchException :function _trc_Parent_catchException(f) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return (function anonymous_365() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000515;//jslker.Parent:515
          window.onerror("","","","",e);
          
        }
      });
    },
    fiber$catchException :function _trc_Parent_f_catchException(_thread,f) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(function anonymous_365() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000515;//jslker.Parent:515
          window.onerror("","","","",e);
          
        }
      });return;
      
      
      _thread.retVal=_this;return;
    },
    findElement :function _trc_Parent_findElement(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      
      $LASTPOS=1000595;//jslker.Parent:595
      if (elem instanceof $) {
        return elem;
      }
      $LASTPOS=1000636;//jslker.Parent:636
      res = $("[name="+elem+"]");
      $LASTPOS=1000671;//jslker.Parent:671
      if (res[0]) {
        return res;
      }
      return $("#"+elem);
    },
    fiber$findElement :function _trc_Parent_f_findElement(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      $LASTPOS=1000595;//jslker.Parent:595
      if (elem instanceof $) {
        _thread.retVal=elem;return;
        
      }
      $LASTPOS=1000636;//jslker.Parent:636
      res = $("[name="+elem+"]");
      $LASTPOS=1000671;//jslker.Parent:671
      if (res[0]) {
        _thread.retVal=res;return;
        
      }
      _thread.retVal=$("#"+elem);return;
      
      
      _thread.retVal=_this;return;
    },
    isFormElement :function _trc_Parent_isFormElement(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1000752;//jslker.Parent:752
      elem=_this.findElement(elem);
      $LASTPOS=1000781;//jslker.Parent:781
      if (! elem[0]) {
        return false;
      }
      $LASTPOS=1000814;//jslker.Parent:814
      t = (""+elem[0].tagName).toLowerCase();
      return t==="input"||t==="textarea";
    },
    fiber$isFormElement :function _trc_Parent_f_isFormElement(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      
      _thread.enter(function _trc_Parent_ent_isFormElement(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000752;//jslker.Parent:752
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1000781;//jslker.Parent:781
            if (!(! elem[0])) { __pc=2; break; }
            _thread.exit(false);return;
          case 2:
            
            $LASTPOS=1000814;//jslker.Parent:814
            t = (""+elem[0].tagName).toLowerCase();
            _thread.exit(t==="input"||t==="textarea");return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    clearContent :function _trc_Parent_clearContent(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000930;//jslker.Parent:930
      elem=_this.findElement(elem);
      $LASTPOS=1000959;//jslker.Parent:959
      if (_this.isFormElement(elem)) {
        $LASTPOS=1000995;//jslker.Parent:995
        elem.val("");
        
      } else {
        $LASTPOS=1001032;//jslker.Parent:1032
        elem.empty();
        
      }
    },
    fiber$clearContent :function _trc_Parent_f_clearContent(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_clearContent(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000930;//jslker.Parent:930
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1000959;//jslker.Parent:959
            if (_this.isFormElement(elem)) {
              $LASTPOS=1000995;//jslker.Parent:995
              elem.val("");
              
            } else {
              $LASTPOS=1001032;//jslker.Parent:1032
              elem.empty();
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    addText :function _trc_Parent_addText(elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var dst;
      
      $LASTPOS=1001082;//jslker.Parent:1082
      elem=_this.findElement(elem);
      $LASTPOS=1001111;//jslker.Parent:1111
      if (_this.isFormElement(elem)) {
        $LASTPOS=1001147;//jslker.Parent:1147
        elem.val(elem.val()+val);
        
      } else {
        $LASTPOS=1001199;//jslker.Parent:1199
        if (_this.document.baWriteTo) {
          $LASTPOS=1001238;//jslker.Parent:1238
          dst = elem[0];
          $LASTPOS=1001268;//jslker.Parent:1268
          if (dst) {
            $LASTPOS=1001277;//jslker.Parent:1277
            _this.document.baWriteTo(dst,val);
          }
          
        } else {
          $LASTPOS=1001338;//jslker.Parent:1338
          elem.append(val);
          
        }
        
      }
    },
    fiber$addText :function _trc_Parent_f_addText(_thread,elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var dst;
      
      
      _thread.enter(function _trc_Parent_ent_addText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001082;//jslker.Parent:1082
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001111;//jslker.Parent:1111
            if (_this.isFormElement(elem)) {
              $LASTPOS=1001147;//jslker.Parent:1147
              elem.val(elem.val()+val);
              
            } else {
              $LASTPOS=1001199;//jslker.Parent:1199
              if (_this.document.baWriteTo) {
                $LASTPOS=1001238;//jslker.Parent:1238
                dst = elem[0];
                $LASTPOS=1001268;//jslker.Parent:1268
                if (dst) {
                  $LASTPOS=1001277;//jslker.Parent:1277
                  _this.document.baWriteTo(dst,val);
                }
                
              } else {
                $LASTPOS=1001338;//jslker.Parent:1338
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001403;//jslker.Parent:1403
      _this.clearContent(elem);
      $LASTPOS=1001428;//jslker.Parent:1428
      _this.addText(elem,val);
    },
    fiber$setText :function _trc_Parent_f_setText(_thread,elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_setText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001403;//jslker.Parent:1403
            _this.fiber$clearContent(_thread, elem);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1001428;//jslker.Parent:1428
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.getText(elem)-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.getText(elem)-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001523;//jslker.Parent:1523
      elem=_this.findElement(elem);
      $LASTPOS=1001552;//jslker.Parent:1552
      if (_this.isFormElement(elem)) {
        return elem.val();
        
      } else {
        return elem[0]&&elem[0].innerHTML;
        
      }
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_getText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001523;//jslker.Parent:1523
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001552;//jslker.Parent:1552
            if (!(_this.isFormElement(elem))) { __pc=2; break; }
            _thread.exit(elem.val());return;
            __pc=3;break;
          case 2:
            _thread.exit(elem[0]&&elem[0].innerHTML);return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001705;//jslker.Parent:1705
      _this.setText(elem,num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_setNumber(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001705;//jslker.Parent:1705
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var usepara;
      var fname;
      
      $LASTPOS=1001756;//jslker.Parent:1756
      usepara;fname;
      $LASTPOS=1001780;//jslker.Parent:1780
      if (typeof  func=='function') {
        $LASTPOS=1001820;//jslker.Parent:1820
        if (func.methodInfo) {
          $LASTPOS=1001856;//jslker.Parent:1856
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1001930;//jslker.Parent:1930
        fname=func+"";
        
      }
      $LASTPOS=1001957;//jslker.Parent:1957
      if (typeof  fname=="string") {
        $LASTPOS=1001996;//jslker.Parent:1996
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1002063;//jslker.Parent:2063
        if (_this["fiber$"+fname]) {
          $LASTPOS=1002104;//jslker.Parent:2104
          usepara=true;
          
        }
        
      }
      $LASTPOS=1002141;//jslker.Parent:2141
      if (usepara) {
        $LASTPOS=1002165;//jslker.Parent:2165
        $("[name="+elem+"]").click(_this.catchException((function anonymous_2207() {
          
          $LASTPOS=1002224;//jslker.Parent:2224
          _this.parallel(fname);
        })));
        
      } else {
        $LASTPOS=1002338;//jslker.Parent:2338
        $("[name="+elem+"]").click(_this.catchException(func));
        
      }
    },
    fiber$onClick :function _trc_Parent_f_onClick(_thread,elem,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var usepara;
      var fname;
      
      $LASTPOS=1001756;//jslker.Parent:1756
      usepara;fname;
      $LASTPOS=1001780;//jslker.Parent:1780
      if (typeof  func=='function') {
        $LASTPOS=1001820;//jslker.Parent:1820
        if (func.methodInfo) {
          $LASTPOS=1001856;//jslker.Parent:1856
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1001930;//jslker.Parent:1930
        fname=func+"";
        
      }
      $LASTPOS=1001957;//jslker.Parent:1957
      if (typeof  fname=="string") {
        $LASTPOS=1001996;//jslker.Parent:1996
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1002063;//jslker.Parent:2063
        if (_this["fiber$"+fname]) {
          $LASTPOS=1002104;//jslker.Parent:2104
          usepara=true;
          
        }
        
      }
      
      _thread.enter(function _trc_Parent_ent_onClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1002141;//jslker.Parent:2141
            if (!(usepara)) { __pc=1; break; }
            $LASTPOS=1002165;//jslker.Parent:2165
            $("[name="+elem+"]").click(_this.catchException((function anonymous_2207() {
              
              $LASTPOS=1002224;//jslker.Parent:2224
              _this.parallel(fname);
            })));
            __pc=2;break;
          case 1:
            {
              $LASTPOS=1002338;//jslker.Parent:2338
              $("[name="+elem+"]").click(_this.catchException(func));
            }
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onTouch :function _trc_Parent_onTouch(func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002420;//jslker.Parent:2420
      if (typeof  func=="function") {
        $LASTPOS=1002458;//jslker.Parent:2458
        $("body").on("touchstart",(function anonymous_2484(e) {
          
          $LASTPOS=1002510;//jslker.Parent:2510
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1002641;//jslker.Parent:2641
        $("body").on("touchmove",(function anonymous_2666(e) {
          
          $LASTPOS=1002692;//jslker.Parent:2692
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002822;//jslker.Parent:2822
        $("body").on("touchend",(function anonymous_2846(e) {
          
          $LASTPOS=1002872;//jslker.Parent:2872
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1003001;//jslker.Parent:3001
        $("body").on("mousedown",(function anonymous_3026(e) {
          
          $LASTPOS=1003052;//jslker.Parent:3052
          _this.down=true;
          $LASTPOS=1003076;//jslker.Parent:3076
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1003129;//jslker.Parent:3129
        $("body").on("mousemove",(function anonymous_3154(e) {
          
          $LASTPOS=1003180;//jslker.Parent:3180
          if (_this.down) {
            $LASTPOS=1003189;//jslker.Parent:3189
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1003241;//jslker.Parent:3241
        $("body").on("mouseup",(function anonymous_3264(e) {
          
          $LASTPOS=1003290;//jslker.Parent:3290
          _this.down=false;
          $LASTPOS=1003315;//jslker.Parent:3315
          func(e.pageX,e.pageY,"end");
        }));
        
      }
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002420;//jslker.Parent:2420
      if (typeof  func=="function") {
        $LASTPOS=1002458;//jslker.Parent:2458
        $("body").on("touchstart",(function anonymous_2484(e) {
          
          $LASTPOS=1002510;//jslker.Parent:2510
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1002641;//jslker.Parent:2641
        $("body").on("touchmove",(function anonymous_2666(e) {
          
          $LASTPOS=1002692;//jslker.Parent:2692
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002822;//jslker.Parent:2822
        $("body").on("touchend",(function anonymous_2846(e) {
          
          $LASTPOS=1002872;//jslker.Parent:2872
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1003001;//jslker.Parent:3001
        $("body").on("mousedown",(function anonymous_3026(e) {
          
          $LASTPOS=1003052;//jslker.Parent:3052
          _this.down=true;
          $LASTPOS=1003076;//jslker.Parent:3076
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1003129;//jslker.Parent:3129
        $("body").on("mousemove",(function anonymous_3154(e) {
          
          $LASTPOS=1003180;//jslker.Parent:3180
          if (_this.down) {
            $LASTPOS=1003189;//jslker.Parent:3189
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1003241;//jslker.Parent:3241
        $("body").on("mouseup",(function anonymous_3264(e) {
          
          $LASTPOS=1003290;//jslker.Parent:3290
          _this.down=false;
          $LASTPOS=1003315;//jslker.Parent:3315
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003442;//jslker.Parent:3442
      _this._canvas=$("[name="+canv+"]")[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003442;//jslker.Parent:3442
      _this._canvas=$("[name="+canv+"]")[0];
      
      _thread.retVal=_this;return;
    },
    searchCanvas :function _trc_Parent_searchCanvas() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003501;//jslker.Parent:3501
      if (! _this._canvas) {
        return _this._canvas=$("canvas")[0];
        
      } else {
        return _this._canvas;
        
      }
    },
    fiber$searchCanvas :function _trc_Parent_f_searchCanvas(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003501;//jslker.Parent:3501
      if (! _this._canvas) {
        _thread.retVal=_this._canvas=$("canvas")[0];return;
        
        
      } else {
        _thread.retVal=_this._canvas;return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    setColor :function _trc_Parent_setColor(r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003626;//jslker.Parent:3626
      if (_this.searchCanvas()) {
        $LASTPOS=1003655;//jslker.Parent:3655
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003694;//jslker.Parent:3694
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003743;//jslker.Parent:3743
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003626;//jslker.Parent:3626
      if (_this.searchCanvas()) {
        $LASTPOS=1003655;//jslker.Parent:3655
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003694;//jslker.Parent:3694
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003743;//jslker.Parent:3743
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003821;//jslker.Parent:3821
      if (_this.searchCanvas()) {
        $LASTPOS=1003850;//jslker.Parent:3850
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003889;//jslker.Parent:3889
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003821;//jslker.Parent:3821
      if (_this.searchCanvas()) {
        $LASTPOS=1003850;//jslker.Parent:3850
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003889;//jslker.Parent:3889
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003957;//jslker.Parent:3957
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1004001;//jslker.Parent:4001
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1004047;//jslker.Parent:4047
      $("[name="+elem+"]").attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003957;//jslker.Parent:3957
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1004001;//jslker.Parent:4001
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1004047;//jslker.Parent:4047
      $("[name="+elem+"]").attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004116;//jslker.Parent:4116
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004116;//jslker.Parent:4116
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004241;//jslker.Parent:4241
      console.log(scaleX,scaleY);
      $LASTPOS=1004274;//jslker.Parent:4274
      if (! scaleX) {
        $LASTPOS=1004296;//jslker.Parent:4296
        scaleX=1;
        $LASTPOS=1004315;//jslker.Parent:4315
        scaleY=1;
        
      } else {
        $LASTPOS=1004336;//jslker.Parent:4336
        if (! scaleY) {
          $LASTPOS=1004358;//jslker.Parent:4358
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004385;//jslker.Parent:4385
      console.log(scaleX,scaleY);
      $LASTPOS=1004418;//jslker.Parent:4418
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004241;//jslker.Parent:4241
      console.log(scaleX,scaleY);
      $LASTPOS=1004274;//jslker.Parent:4274
      if (! scaleX) {
        $LASTPOS=1004296;//jslker.Parent:4296
        scaleX=1;
        $LASTPOS=1004315;//jslker.Parent:4315
        scaleY=1;
        
      } else {
        $LASTPOS=1004336;//jslker.Parent:4336
        if (! scaleY) {
          $LASTPOS=1004358;//jslker.Parent:4358
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004385;//jslker.Parent:4385
      console.log(scaleX,scaleY);
      $LASTPOS=1004418;//jslker.Parent:4418
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004585;//jslker.Parent:4585
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004585;//jslker.Parent:4585
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004721;//jslker.Parent:4721
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004721;//jslker.Parent:4721
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1004852;//jslker.Parent:4852
      time=time||100;
      $LASTPOS=1004873;//jslker.Parent:4873
      t = null;
      $LASTPOS=1004893;//jslker.Parent:4893
      t.suspend();
      $LASTPOS=1004911;//jslker.Parent:4911
      setTimeout(_this.catchException((function anonymous_4937() {
        
        $LASTPOS=1004951;//jslker.Parent:4951
        t.steps();
      })),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1004852;//jslker.Parent:4852
      time=time||100;
      $LASTPOS=1004873;//jslker.Parent:4873
      t = _thread;
      $LASTPOS=1004893;//jslker.Parent:4893
      t.suspend();
      $LASTPOS=1004911;//jslker.Parent:4911
      setTimeout(_this.catchException((function anonymous_4937() {
        
        $LASTPOS=1004951;//jslker.Parent:4951
        t.steps();
      })),time);
      
      _thread.retVal=_this;return;
    },
    rnd :function _trc_Parent_rnd(max) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.Math.floor(_this.Math.random()*max);
    },
    fiber$rnd :function _trc_Parent_f_rnd(_thread,max) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.floor(_this.Math.random()*max);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_Parent_setBGColor(c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005062;//jslker.Parent:5062
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005062;//jslker.Parent:5062
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      $LASTPOS=1005135;//jslker.Parent:5135
      e = _this.document.createElement(elem);
      $LASTPOS=1005177;//jslker.Parent:5177
      e.setAttribute("name",n);
      $LASTPOS=1005209;//jslker.Parent:5209
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1005135;//jslker.Parent:5135
      e = _this.document.createElement(elem);
      $LASTPOS=1005177;//jslker.Parent:5177
      e.setAttribute("name",n);
      $LASTPOS=1005209;//jslker.Parent:5209
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005268;//jslker.Parent:5268
      if (_this.searchCanvas()) {
        $LASTPOS=1005297;//jslker.Parent:5297
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005336;//jslker.Parent:5336
        _this.ctx.save();
        $LASTPOS=1005357;//jslker.Parent:5357
        _this.ctx.beginPath();
        $LASTPOS=1005383;//jslker.Parent:5383
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005420;//jslker.Parent:5420
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005450;//jslker.Parent:5450
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005502;//jslker.Parent:5502
        _this.ctx.fill();
        $LASTPOS=1005523;//jslker.Parent:5523
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005268;//jslker.Parent:5268
      if (_this.searchCanvas()) {
        $LASTPOS=1005297;//jslker.Parent:5297
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005336;//jslker.Parent:5336
        _this.ctx.save();
        $LASTPOS=1005357;//jslker.Parent:5357
        _this.ctx.beginPath();
        $LASTPOS=1005383;//jslker.Parent:5383
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005420;//jslker.Parent:5420
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005450;//jslker.Parent:5450
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005502;//jslker.Parent:5502
        _this.ctx.fill();
        $LASTPOS=1005523;//jslker.Parent:5523
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005578;//jslker.Parent:5578
      if (_this.searchCanvas()) {
        $LASTPOS=1005607;//jslker.Parent:5607
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005646;//jslker.Parent:5646
        _this.ctx.beginPath();
        $LASTPOS=1005672;//jslker.Parent:5672
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005700;//jslker.Parent:5700
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005728;//jslker.Parent:5728
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005578;//jslker.Parent:5578
      if (_this.searchCanvas()) {
        $LASTPOS=1005607;//jslker.Parent:5607
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005646;//jslker.Parent:5646
        _this.ctx.beginPath();
        $LASTPOS=1005672;//jslker.Parent:5672
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005700;//jslker.Parent:5700
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005728;//jslker.Parent:5728
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005779;//jslker.Parent:5779
      if (_this.searchCanvas()) {
        $LASTPOS=1005808;//jslker.Parent:5808
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005847;//jslker.Parent:5847
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005779;//jslker.Parent:5779
      if (_this.searchCanvas()) {
        $LASTPOS=1005808;//jslker.Parent:5808
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005847;//jslker.Parent:5847
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005905;//jslker.Parent:5905
      if (_this.searchCanvas()) {
        $LASTPOS=1005934;//jslker.Parent:5934
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005973;//jslker.Parent:5973
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005905;//jslker.Parent:5905
      if (_this.searchCanvas()) {
        $LASTPOS=1005934;//jslker.Parent:5934
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005973;//jslker.Parent:5973
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1006036;//jslker.Parent:6036
      _this.keyData=[];
      $LASTPOS=1006053;//jslker.Parent:6053
      _this.document.onkeydown=(function anonymous_6074(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006097;//jslker.Parent:6097
        if (! e) {
          $LASTPOS=1006104;//jslker.Parent:6104
          e=window.event;
        }
        $LASTPOS=1006131;//jslker.Parent:6131
        key_code = e.keyCode;
        $LASTPOS=1006166;//jslker.Parent:6166
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1006235;//jslker.Parent:6235
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1006304;//jslker.Parent:6304
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1006342;//jslker.Parent:6342
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1006408;//jslker.Parent:6408
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1006445;//jslker.Parent:6445
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1006508;//jslker.Parent:6508
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1006544;//jslker.Parent:6544
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1006606;//jslker.Parent:6606
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1006639;//jslker.Parent:6639
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1006697;//jslker.Parent:6697
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1006728;//jslker.Parent:6728
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1006792;//jslker.Parent:6792
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1006826;//jslker.Parent:6826
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1006888;//jslker.Parent:6888
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1006921;//jslker.Parent:6921
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1006967;//jslker.Parent:6967
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
      $LASTPOS=1007132;//jslker.Parent:7132
      _this.document.onkeyup=(function anonymous_7151(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1007174;//jslker.Parent:7174
        if (! e) {
          $LASTPOS=1007181;//jslker.Parent:7181
          e=window.event;
        }
        $LASTPOS=1007208;//jslker.Parent:7208
        key_code = e.keyCode;
        $LASTPOS=1007243;//jslker.Parent:7243
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1007312;//jslker.Parent:7312
        if (e.keyCode==16) {
          $LASTPOS=1007330;//jslker.Parent:7330
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1007368;//jslker.Parent:7368
          if (e.keyCode==17) {
            $LASTPOS=1007386;//jslker.Parent:7386
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1007423;//jslker.Parent:7423
            if (e.keyCode==18) {
              $LASTPOS=1007441;//jslker.Parent:7441
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1007477;//jslker.Parent:7477
              if (e.keyCode==37) {
                $LASTPOS=1007495;//jslker.Parent:7495
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1007528;//jslker.Parent:7528
                if (e.keyCode==38) {
                  $LASTPOS=1007546;//jslker.Parent:7546
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1007577;//jslker.Parent:7577
                  if (e.keyCode==39) {
                    $LASTPOS=1007595;//jslker.Parent:7595
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1007629;//jslker.Parent:7629
                    if (e.keyCode==40) {
                      $LASTPOS=1007647;//jslker.Parent:7647
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1007680;//jslker.Parent:7680
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.keyData[k.toLowerCase()]||0;
    },
    fiber$getkey :function _trc_Parent_f_getkey(_thread,k) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyData[k.toLowerCase()]||0;return;
      
      
      _thread.retVal=_this;return;
    },
    dist :function _trc_Parent_dist(x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.sqrt(x*x+y*y);
    },
    fiber$dist :function _trc_Parent_f_dist(_thread,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.sqrt(x*x+y*y);return;
      
      
      _thread.retVal=_this;return;
    },
    angle :function _trc_Parent_angle(x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.deg(_this.Math.atan2(y,x));
    },
    fiber$angle :function _trc_Parent_f_angle(_thread,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.deg(_this.Math.atan2(y,x));return;
      
      
      _thread.retVal=_this;return;
    },
    rad :function _trc_Parent_rad(d) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return d/180*_this.Math.PI;
    },
    deg :function _trc_Parent_deg(d) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return d/_this.Math.PI*180;
    },
    sqrt :function _trc_Parent_sqrt(x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.Math.sqrt(x);
    },
    fiber$sqrt :function _trc_Parent_f_sqrt(_thread,x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.sqrt(x);return;
      
      
      _thread.retVal=_this;return;
    },
    sin :function _trc_Parent_sin(x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.Math.sin(_this.rad(x));
    },
    fiber$sin :function _trc_Parent_f_sin(_thread,x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.sin(_this.rad(x));return;
      
      
      _thread.retVal=_this;return;
    },
    cos :function _trc_Parent_cos(x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.Math.cos(_this.rad(x));
    },
    fiber$cos :function _trc_Parent_f_cos(_thread,x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.cos(_this.rad(x));return;
      
      
      _thread.retVal=_this;return;
    },
    tan :function _trc_Parent_tan(x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.Math.tan(_this.rad(x));
    },
    fiber$tan :function _trc_Parent_f_tan(_thread,x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.tan(_this.rad(x));return;
      
      
      _thread.retVal=_this;return;
    },
    parallel :function _trc_Parent_parallel() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      var methodName;
      var t;
      
      $LASTPOS=1008204;//jslker.Parent:8204
      a = Array.prototype.slice.call(arguments);
      $LASTPOS=1008254;//jslker.Parent:8254
      methodName = a.shift();
      $LASTPOS=1008285;//jslker.Parent:8285
      t = Tonyu.thread();
      $LASTPOS=1008312;//jslker.Parent:8312
      t.apply(_this,methodName,a);
      $LASTPOS=1008345;//jslker.Parent:8345
      t.steps();
    },
    fiber$parallel :function _trc_Parent_f_parallel(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var methodName;
      var t;
      
      $LASTPOS=1008204;//jslker.Parent:8204
      a = Array.prototype.slice.call(_arguments);
      $LASTPOS=1008254;//jslker.Parent:8254
      methodName = a.shift();
      $LASTPOS=1008285;//jslker.Parent:8285
      t = Tonyu.thread();
      $LASTPOS=1008312;//jslker.Parent:8312
      t.apply(_this,methodName,a);
      $LASTPOS=1008345;//jslker.Parent:8345
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var clicked;
      var _func;
      
      $LASTPOS=1008383;//jslker.Parent:8383
      clicked = 0;
      $LASTPOS=1008403;//jslker.Parent:8403
      _func = (function anonymous_8413() {
        
        $LASTPOS=1008434;//jslker.Parent:8434
        clicked=1;
      });
      $LASTPOS=1008458;//jslker.Parent:8458
      _this.onClick(elem,_func);
      $LASTPOS=1008484;//jslker.Parent:8484
      while (clicked==0) {
        $LASTPOS=1008512;//jslker.Parent:8512
        _this.wait(10);
        
      }
      $LASTPOS=1008534;//jslker.Parent:8534
      $("[name="+elem+"]").off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=1008383;//jslker.Parent:8383
      clicked = 0;
      $LASTPOS=1008403;//jslker.Parent:8403
      _func = (function anonymous_8413() {
        
        $LASTPOS=1008434;//jslker.Parent:8434
        clicked=1;
      });
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008458;//jslker.Parent:8458
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008484;//jslker.Parent:8484
          case 2:
            if (!(clicked==0)) { __pc=4; break; }
            $LASTPOS=1008512;//jslker.Parent:8512
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            $LASTPOS=1008534;//jslker.Parent:8534
            $("[name="+elem+"]").off("click","",_func);
            _thread.exit(_this);return;
          }
        }
      });
    },
    _waitFor :function _trc_Parent__waitFor(promise) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1008608;//jslker.Parent:8608
      t = null;
      $LASTPOS=1008628;//jslker.Parent:8628
      t.suspend();
      $LASTPOS=1008646;//jslker.Parent:8646
      _this._err=null;
      $LASTPOS=1008662;//jslker.Parent:8662
      promise.then((function anonymous_8675(r) {
        
        $LASTPOS=1008691;//jslker.Parent:8691
        _this._res=r;
        $LASTPOS=1008708;//jslker.Parent:8708
        t.steps();
      }),(function anonymous_8726(e) {
        
        $LASTPOS=1008742;//jslker.Parent:8742
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1008825;//jslker.Parent:8825
        t.steps();
      }));
    },
    fiber$_waitFor :function _trc_Parent_f__waitFor(_thread,promise) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1008608;//jslker.Parent:8608
      t = _thread;
      $LASTPOS=1008628;//jslker.Parent:8628
      t.suspend();
      $LASTPOS=1008646;//jslker.Parent:8646
      _this._err=null;
      $LASTPOS=1008662;//jslker.Parent:8662
      promise.then((function anonymous_8675(r) {
        
        $LASTPOS=1008691;//jslker.Parent:8691
        _this._res=r;
        $LASTPOS=1008708;//jslker.Parent:8708
        t.steps();
      }),(function anonymous_8726(e) {
        
        $LASTPOS=1008742;//jslker.Parent:8742
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1008825;//jslker.Parent:8825
        t.steps();
      }));
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_Parent_waitFor(promise) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1008874;//jslker.Parent:8874
      _this._waitFor(promise);
      $LASTPOS=1008898;//jslker.Parent:8898
      if (_this._err) {
        throw _this._err;
        
      }
      return _this._res;
    },
    fiber$waitFor :function _trc_Parent_f_waitFor(_thread,promise) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_waitFor(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008874;//jslker.Parent:8874
            _this.fiber$_waitFor(_thread, promise);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008898;//jslker.Parent:8898
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var url;
      var p;
      var r;
      
      $LASTPOS=1008973;//jslker.Parent:8973
      url = window.location.href;
      $LASTPOS=1009008;//jslker.Parent:9008
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/put"+"&key="+key+"&value="+value+"&url="+url);
      $LASTPOS=1009139;//jslker.Parent:9139
      r;
      $LASTPOS=1009151;//jslker.Parent:9151
      r=_this.waitFor(p);
      return r;
    },
    fiber$putToServer :function _trc_Parent_f_putToServer(_thread,key,value) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var p;
      var r;
      
      $LASTPOS=1008973;//jslker.Parent:8973
      url = window.location.href;
      $LASTPOS=1009008;//jslker.Parent:9008
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/put"+"&key="+key+"&value="+value+"&url="+url);
      $LASTPOS=1009139;//jslker.Parent:9139
      r;
      
      _thread.enter(function _trc_Parent_ent_putToServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009151;//jslker.Parent:9151
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
    getFromServer :function _trc_Parent_getFromServer(key) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var url;
      var p;
      var r;
      
      $LASTPOS=1009211;//jslker.Parent:9211
      url = window.location.href;
      $LASTPOS=1009246;//jslker.Parent:9246
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url);
      $LASTPOS=1009355;//jslker.Parent:9355
      r;
      $LASTPOS=1009367;//jslker.Parent:9367
      r=_this.waitFor(p);
      return r;
    },
    fiber$getFromServer :function _trc_Parent_f_getFromServer(_thread,key) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var p;
      var r;
      
      $LASTPOS=1009211;//jslker.Parent:9211
      url = window.location.href;
      $LASTPOS=1009246;//jslker.Parent:9246
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url);
      $LASTPOS=1009355;//jslker.Parent:9355
      r;
      
      _thread.enter(function _trc_Parent_ent_getFromServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009367;//jslker.Parent:9367
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
    addLog :function _trc_Parent_addLog(group,practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=1009443;//jslker.Parent:9443
      url = window.location.href;
      $LASTPOS=1009478;//jslker.Parent:9478
      params = "&group="+group+"&practice="+practice+"&url="+url;
      $LASTPOS=1009545;//jslker.Parent:9545
      if (d1!=null) {
        $LASTPOS=1009559;//jslker.Parent:9559
        params+="&data1="+d1;
      }
      $LASTPOS=1009586;//jslker.Parent:9586
      if (d2!=null) {
        $LASTPOS=1009600;//jslker.Parent:9600
        params+="&data2="+d2;
      }
      $LASTPOS=1009627;//jslker.Parent:9627
      if (d3!=null) {
        $LASTPOS=1009641;//jslker.Parent:9641
        params+="&data3="+d3;
      }
      $LASTPOS=1009668;//jslker.Parent:9668
      if (d4!=null) {
        $LASTPOS=1009682;//jslker.Parent:9682
        params+="&data4="+d4;
      }
      $LASTPOS=1009709;//jslker.Parent:9709
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      $LASTPOS=1009782;//jslker.Parent:9782
      r;
      $LASTPOS=1009794;//jslker.Parent:9794
      r=_this.waitFor(p);
      return r;
    },
    fiber$addLog :function _trc_Parent_f_addLog(_thread,group,practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=1009443;//jslker.Parent:9443
      url = window.location.href;
      $LASTPOS=1009478;//jslker.Parent:9478
      params = "&group="+group+"&practice="+practice+"&url="+url;
      $LASTPOS=1009545;//jslker.Parent:9545
      if (d1!=null) {
        $LASTPOS=1009559;//jslker.Parent:9559
        params+="&data1="+d1;
      }
      $LASTPOS=1009586;//jslker.Parent:9586
      if (d2!=null) {
        $LASTPOS=1009600;//jslker.Parent:9600
        params+="&data2="+d2;
      }
      $LASTPOS=1009627;//jslker.Parent:9627
      if (d3!=null) {
        $LASTPOS=1009641;//jslker.Parent:9641
        params+="&data3="+d3;
      }
      $LASTPOS=1009668;//jslker.Parent:9668
      if (d4!=null) {
        $LASTPOS=1009682;//jslker.Parent:9682
        params+="&data4="+d4;
      }
      $LASTPOS=1009709;//jslker.Parent:9709
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      $LASTPOS=1009782;//jslker.Parent:9782
      r;
      
      _thread.enter(function _trc_Parent_ent_addLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009794;//jslker.Parent:9794
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
    findLog :function _trc_Parent_findLog(group,practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=1009871;//jslker.Parent:9871
      url = window.location.href;
      $LASTPOS=1009906;//jslker.Parent:9906
      params = "&group="+group+"&practice="+practice+"&url="+url;
      $LASTPOS=1009973;//jslker.Parent:9973
      if (d1!=null) {
        $LASTPOS=1009987;//jslker.Parent:9987
        params+="&data1="+d1;
      }
      $LASTPOS=1010014;//jslker.Parent:10014
      if (d2!=null) {
        $LASTPOS=1010028;//jslker.Parent:10028
        params+="&data2="+d2;
      }
      $LASTPOS=1010055;//jslker.Parent:10055
      if (d3!=null) {
        $LASTPOS=1010069;//jslker.Parent:10069
        params+="&data3="+d3;
      }
      $LASTPOS=1010096;//jslker.Parent:10096
      if (d4!=null) {
        $LASTPOS=1010110;//jslker.Parent:10110
        params+="&data4="+d4;
      }
      $LASTPOS=1010137;//jslker.Parent:10137
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      $LASTPOS=1010211;//jslker.Parent:10211
      r;
      $LASTPOS=1010223;//jslker.Parent:10223
      r=_this.waitFor(p);
      return r;
    },
    fiber$findLog :function _trc_Parent_f_findLog(_thread,group,practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=1009871;//jslker.Parent:9871
      url = window.location.href;
      $LASTPOS=1009906;//jslker.Parent:9906
      params = "&group="+group+"&practice="+practice+"&url="+url;
      $LASTPOS=1009973;//jslker.Parent:9973
      if (d1!=null) {
        $LASTPOS=1009987;//jslker.Parent:9987
        params+="&data1="+d1;
      }
      $LASTPOS=1010014;//jslker.Parent:10014
      if (d2!=null) {
        $LASTPOS=1010028;//jslker.Parent:10028
        params+="&data2="+d2;
      }
      $LASTPOS=1010055;//jslker.Parent:10055
      if (d3!=null) {
        $LASTPOS=1010069;//jslker.Parent:10069
        params+="&data3="+d3;
      }
      $LASTPOS=1010096;//jslker.Parent:10096
      if (d4!=null) {
        $LASTPOS=1010110;//jslker.Parent:10110
        params+="&data4="+d4;
      }
      $LASTPOS=1010137;//jslker.Parent:10137
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      $LASTPOS=1010211;//jslker.Parent:10211
      r;
      
      _thread.enter(function _trc_Parent_ent_findLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010223;//jslker.Parent:10223
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
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"setInterval":{"nowait":false},"setTimeout":{"nowait":false},"catchException":{"nowait":false},"findElement":{"nowait":false},"isFormElement":{"nowait":false},"clearContent":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"searchCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"new":{"nowait":false},"getkey":{"nowait":false},"dist":{"nowait":false},"angle":{"nowait":false},"rad":{"nowait":true},"deg":{"nowait":true},"sqrt":{"nowait":false},"sin":{"nowait":false},"cos":{"nowait":false},"tan":{"nowait":false},"parallel":{"nowait":false},"waitClick":{"nowait":false},"_waitFor":{"nowait":false},"waitFor":{"nowait":false},"putToServer":{"nowait":false},"getFromServer":{"nowait":false},"addLog":{"nowait":false},"findLog":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map