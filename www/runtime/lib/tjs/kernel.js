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
        _this.findElement(elem).click(_this.catchException((function anonymous_2204() {
          
          $LASTPOS=1002221;//jslker.Parent:2221
          _this.parallel(fname);
        })));
        
      } else {
        $LASTPOS=1002335;//jslker.Parent:2335
        _this.findElement(elem).click(_this.catchException(func));
        
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
            _this.findElement(elem).click(_this.catchException((function anonymous_2204() {
              
              $LASTPOS=1002221;//jslker.Parent:2221
              _this.parallel(fname);
            })));
            __pc=2;break;
          case 1:
            {
              $LASTPOS=1002335;//jslker.Parent:2335
              _this.findElement(elem).click(_this.catchException(func));
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
      
      $LASTPOS=1002414;//jslker.Parent:2414
      if (typeof  func=="function") {
        $LASTPOS=1002452;//jslker.Parent:2452
        $("body").on("touchstart",(function anonymous_2478(e) {
          
          $LASTPOS=1002504;//jslker.Parent:2504
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1002635;//jslker.Parent:2635
        $("body").on("touchmove",(function anonymous_2660(e) {
          
          $LASTPOS=1002686;//jslker.Parent:2686
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002816;//jslker.Parent:2816
        $("body").on("touchend",(function anonymous_2840(e) {
          
          $LASTPOS=1002866;//jslker.Parent:2866
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1002995;//jslker.Parent:2995
        $("body").on("mousedown",(function anonymous_3020(e) {
          
          $LASTPOS=1003046;//jslker.Parent:3046
          _this.down=true;
          $LASTPOS=1003070;//jslker.Parent:3070
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1003123;//jslker.Parent:3123
        $("body").on("mousemove",(function anonymous_3148(e) {
          
          $LASTPOS=1003174;//jslker.Parent:3174
          if (_this.down) {
            $LASTPOS=1003183;//jslker.Parent:3183
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1003235;//jslker.Parent:3235
        $("body").on("mouseup",(function anonymous_3258(e) {
          
          $LASTPOS=1003284;//jslker.Parent:3284
          _this.down=false;
          $LASTPOS=1003309;//jslker.Parent:3309
          func(e.pageX,e.pageY,"end");
        }));
        
      }
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002414;//jslker.Parent:2414
      if (typeof  func=="function") {
        $LASTPOS=1002452;//jslker.Parent:2452
        $("body").on("touchstart",(function anonymous_2478(e) {
          
          $LASTPOS=1002504;//jslker.Parent:2504
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1002635;//jslker.Parent:2635
        $("body").on("touchmove",(function anonymous_2660(e) {
          
          $LASTPOS=1002686;//jslker.Parent:2686
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002816;//jslker.Parent:2816
        $("body").on("touchend",(function anonymous_2840(e) {
          
          $LASTPOS=1002866;//jslker.Parent:2866
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1002995;//jslker.Parent:2995
        $("body").on("mousedown",(function anonymous_3020(e) {
          
          $LASTPOS=1003046;//jslker.Parent:3046
          _this.down=true;
          $LASTPOS=1003070;//jslker.Parent:3070
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1003123;//jslker.Parent:3123
        $("body").on("mousemove",(function anonymous_3148(e) {
          
          $LASTPOS=1003174;//jslker.Parent:3174
          if (_this.down) {
            $LASTPOS=1003183;//jslker.Parent:3183
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1003235;//jslker.Parent:3235
        $("body").on("mouseup",(function anonymous_3258(e) {
          
          $LASTPOS=1003284;//jslker.Parent:3284
          _this.down=false;
          $LASTPOS=1003309;//jslker.Parent:3309
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003436;//jslker.Parent:3436
      _this._canvas=_this.findElement(canv)[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003436;//jslker.Parent:3436
      _this._canvas=_this.findElement(canv)[0];
      
      _thread.retVal=_this;return;
    },
    searchCanvas :function _trc_Parent_searchCanvas() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003492;//jslker.Parent:3492
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
      
      $LASTPOS=1003492;//jslker.Parent:3492
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
      
      $LASTPOS=1003617;//jslker.Parent:3617
      if (_this.searchCanvas()) {
        $LASTPOS=1003646;//jslker.Parent:3646
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003685;//jslker.Parent:3685
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003734;//jslker.Parent:3734
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003617;//jslker.Parent:3617
      if (_this.searchCanvas()) {
        $LASTPOS=1003646;//jslker.Parent:3646
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003685;//jslker.Parent:3685
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003734;//jslker.Parent:3734
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003812;//jslker.Parent:3812
      if (_this.searchCanvas()) {
        $LASTPOS=1003841;//jslker.Parent:3841
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003880;//jslker.Parent:3880
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003812;//jslker.Parent:3812
      if (_this.searchCanvas()) {
        $LASTPOS=1003841;//jslker.Parent:3841
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003880;//jslker.Parent:3880
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003948;//jslker.Parent:3948
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1003992;//jslker.Parent:3992
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1004038;//jslker.Parent:4038
      _this.findElement(elem).attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003948;//jslker.Parent:3948
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1003992;//jslker.Parent:3992
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1004038;//jslker.Parent:4038
      _this.findElement(elem).attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004104;//jslker.Parent:4104
      _this.findElement(elem).css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004104;//jslker.Parent:4104
      _this.findElement(elem).css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004226;//jslker.Parent:4226
      console.log(scaleX,scaleY);
      $LASTPOS=1004259;//jslker.Parent:4259
      if (! scaleX) {
        $LASTPOS=1004281;//jslker.Parent:4281
        scaleX=1;
        $LASTPOS=1004300;//jslker.Parent:4300
        scaleY=1;
        
      } else {
        $LASTPOS=1004321;//jslker.Parent:4321
        if (! scaleY) {
          $LASTPOS=1004343;//jslker.Parent:4343
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004370;//jslker.Parent:4370
      console.log(scaleX,scaleY);
      $LASTPOS=1004403;//jslker.Parent:4403
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004226;//jslker.Parent:4226
      console.log(scaleX,scaleY);
      $LASTPOS=1004259;//jslker.Parent:4259
      if (! scaleX) {
        $LASTPOS=1004281;//jslker.Parent:4281
        scaleX=1;
        $LASTPOS=1004300;//jslker.Parent:4300
        scaleY=1;
        
      } else {
        $LASTPOS=1004321;//jslker.Parent:4321
        if (! scaleY) {
          $LASTPOS=1004343;//jslker.Parent:4343
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004370;//jslker.Parent:4370
      console.log(scaleX,scaleY);
      $LASTPOS=1004403;//jslker.Parent:4403
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004567;//jslker.Parent:4567
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004567;//jslker.Parent:4567
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004700;//jslker.Parent:4700
      _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004700;//jslker.Parent:4700
      _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1004828;//jslker.Parent:4828
      time=time||100;
      $LASTPOS=1004849;//jslker.Parent:4849
      t = null;
      $LASTPOS=1004869;//jslker.Parent:4869
      t.suspend();
      $LASTPOS=1004887;//jslker.Parent:4887
      setTimeout(_this.catchException((function anonymous_4913() {
        
        $LASTPOS=1004927;//jslker.Parent:4927
        t.steps();
      })),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1004828;//jslker.Parent:4828
      time=time||100;
      $LASTPOS=1004849;//jslker.Parent:4849
      t = _thread;
      $LASTPOS=1004869;//jslker.Parent:4869
      t.suspend();
      $LASTPOS=1004887;//jslker.Parent:4887
      setTimeout(_this.catchException((function anonymous_4913() {
        
        $LASTPOS=1004927;//jslker.Parent:4927
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
      
      $LASTPOS=1005038;//jslker.Parent:5038
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005038;//jslker.Parent:5038
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      $LASTPOS=1005111;//jslker.Parent:5111
      e = _this.document.createElement(elem);
      $LASTPOS=1005153;//jslker.Parent:5153
      e.setAttribute("name",n);
      $LASTPOS=1005185;//jslker.Parent:5185
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1005111;//jslker.Parent:5111
      e = _this.document.createElement(elem);
      $LASTPOS=1005153;//jslker.Parent:5153
      e.setAttribute("name",n);
      $LASTPOS=1005185;//jslker.Parent:5185
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005244;//jslker.Parent:5244
      if (_this.searchCanvas()) {
        $LASTPOS=1005273;//jslker.Parent:5273
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005312;//jslker.Parent:5312
        _this.ctx.save();
        $LASTPOS=1005333;//jslker.Parent:5333
        _this.ctx.beginPath();
        $LASTPOS=1005359;//jslker.Parent:5359
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005396;//jslker.Parent:5396
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005426;//jslker.Parent:5426
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005478;//jslker.Parent:5478
        _this.ctx.fill();
        $LASTPOS=1005499;//jslker.Parent:5499
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005244;//jslker.Parent:5244
      if (_this.searchCanvas()) {
        $LASTPOS=1005273;//jslker.Parent:5273
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005312;//jslker.Parent:5312
        _this.ctx.save();
        $LASTPOS=1005333;//jslker.Parent:5333
        _this.ctx.beginPath();
        $LASTPOS=1005359;//jslker.Parent:5359
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005396;//jslker.Parent:5396
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005426;//jslker.Parent:5426
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005478;//jslker.Parent:5478
        _this.ctx.fill();
        $LASTPOS=1005499;//jslker.Parent:5499
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005554;//jslker.Parent:5554
      if (_this.searchCanvas()) {
        $LASTPOS=1005583;//jslker.Parent:5583
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005622;//jslker.Parent:5622
        _this.ctx.beginPath();
        $LASTPOS=1005648;//jslker.Parent:5648
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005676;//jslker.Parent:5676
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005704;//jslker.Parent:5704
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005554;//jslker.Parent:5554
      if (_this.searchCanvas()) {
        $LASTPOS=1005583;//jslker.Parent:5583
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005622;//jslker.Parent:5622
        _this.ctx.beginPath();
        $LASTPOS=1005648;//jslker.Parent:5648
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005676;//jslker.Parent:5676
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005704;//jslker.Parent:5704
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005755;//jslker.Parent:5755
      if (_this.searchCanvas()) {
        $LASTPOS=1005784;//jslker.Parent:5784
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005823;//jslker.Parent:5823
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005755;//jslker.Parent:5755
      if (_this.searchCanvas()) {
        $LASTPOS=1005784;//jslker.Parent:5784
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005823;//jslker.Parent:5823
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005881;//jslker.Parent:5881
      if (_this.searchCanvas()) {
        $LASTPOS=1005910;//jslker.Parent:5910
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005949;//jslker.Parent:5949
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005881;//jslker.Parent:5881
      if (_this.searchCanvas()) {
        $LASTPOS=1005910;//jslker.Parent:5910
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005949;//jslker.Parent:5949
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1006012;//jslker.Parent:6012
      _this.keyData=[];
      $LASTPOS=1006029;//jslker.Parent:6029
      _this.document.onkeydown=(function anonymous_6050(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006073;//jslker.Parent:6073
        if (! e) {
          $LASTPOS=1006080;//jslker.Parent:6080
          e=window.event;
        }
        $LASTPOS=1006107;//jslker.Parent:6107
        key_code = e.keyCode;
        $LASTPOS=1006142;//jslker.Parent:6142
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1006211;//jslker.Parent:6211
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1006280;//jslker.Parent:6280
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1006318;//jslker.Parent:6318
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1006384;//jslker.Parent:6384
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1006421;//jslker.Parent:6421
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1006484;//jslker.Parent:6484
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1006520;//jslker.Parent:6520
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1006582;//jslker.Parent:6582
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1006615;//jslker.Parent:6615
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1006673;//jslker.Parent:6673
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1006704;//jslker.Parent:6704
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1006768;//jslker.Parent:6768
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1006802;//jslker.Parent:6802
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1006864;//jslker.Parent:6864
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1006897;//jslker.Parent:6897
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1006943;//jslker.Parent:6943
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
      $LASTPOS=1007108;//jslker.Parent:7108
      _this.document.onkeyup=(function anonymous_7127(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1007150;//jslker.Parent:7150
        if (! e) {
          $LASTPOS=1007157;//jslker.Parent:7157
          e=window.event;
        }
        $LASTPOS=1007184;//jslker.Parent:7184
        key_code = e.keyCode;
        $LASTPOS=1007219;//jslker.Parent:7219
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1007288;//jslker.Parent:7288
        if (e.keyCode==16) {
          $LASTPOS=1007306;//jslker.Parent:7306
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1007344;//jslker.Parent:7344
          if (e.keyCode==17) {
            $LASTPOS=1007362;//jslker.Parent:7362
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1007399;//jslker.Parent:7399
            if (e.keyCode==18) {
              $LASTPOS=1007417;//jslker.Parent:7417
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1007453;//jslker.Parent:7453
              if (e.keyCode==37) {
                $LASTPOS=1007471;//jslker.Parent:7471
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1007504;//jslker.Parent:7504
                if (e.keyCode==38) {
                  $LASTPOS=1007522;//jslker.Parent:7522
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1007553;//jslker.Parent:7553
                  if (e.keyCode==39) {
                    $LASTPOS=1007571;//jslker.Parent:7571
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1007605;//jslker.Parent:7605
                    if (e.keyCode==40) {
                      $LASTPOS=1007623;//jslker.Parent:7623
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1007656;//jslker.Parent:7656
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
      
      $LASTPOS=1008180;//jslker.Parent:8180
      a = Array.prototype.slice.call(arguments);
      $LASTPOS=1008230;//jslker.Parent:8230
      methodName = a.shift();
      $LASTPOS=1008261;//jslker.Parent:8261
      t = Tonyu.thread();
      $LASTPOS=1008288;//jslker.Parent:8288
      t.apply(_this,methodName,a);
      $LASTPOS=1008321;//jslker.Parent:8321
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
      
      $LASTPOS=1008180;//jslker.Parent:8180
      a = Array.prototype.slice.call(_arguments);
      $LASTPOS=1008230;//jslker.Parent:8230
      methodName = a.shift();
      $LASTPOS=1008261;//jslker.Parent:8261
      t = Tonyu.thread();
      $LASTPOS=1008288;//jslker.Parent:8288
      t.apply(_this,methodName,a);
      $LASTPOS=1008321;//jslker.Parent:8321
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var clicked;
      var _func;
      
      $LASTPOS=1008359;//jslker.Parent:8359
      clicked = 0;
      $LASTPOS=1008379;//jslker.Parent:8379
      _func = (function anonymous_8389() {
        
        $LASTPOS=1008410;//jslker.Parent:8410
        clicked=1;
      });
      $LASTPOS=1008434;//jslker.Parent:8434
      _this.onClick(elem,_func);
      $LASTPOS=1008460;//jslker.Parent:8460
      while (clicked==0) {
        $LASTPOS=1008488;//jslker.Parent:8488
        _this.wait(10);
        
      }
      $LASTPOS=1008510;//jslker.Parent:8510
      _this.findElement(elem).off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=1008359;//jslker.Parent:8359
      clicked = 0;
      $LASTPOS=1008379;//jslker.Parent:8379
      _func = (function anonymous_8389() {
        
        $LASTPOS=1008410;//jslker.Parent:8410
        clicked=1;
      });
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008434;//jslker.Parent:8434
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008460;//jslker.Parent:8460
          case 2:
            if (!(clicked==0)) { __pc=4; break; }
            $LASTPOS=1008488;//jslker.Parent:8488
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            $LASTPOS=1008510;//jslker.Parent:8510
            _this.findElement(elem).off("click","",_func);
            _thread.exit(_this);return;
          }
        }
      });
    },
    _waitFor :function _trc_Parent__waitFor(promise) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1008581;//jslker.Parent:8581
      t = null;
      $LASTPOS=1008601;//jslker.Parent:8601
      t.suspend();
      $LASTPOS=1008619;//jslker.Parent:8619
      _this._err=null;
      $LASTPOS=1008635;//jslker.Parent:8635
      promise.then((function anonymous_8648(r) {
        
        $LASTPOS=1008664;//jslker.Parent:8664
        _this._res=r;
        $LASTPOS=1008681;//jslker.Parent:8681
        t.steps();
      }),(function anonymous_8699(e) {
        
        $LASTPOS=1008715;//jslker.Parent:8715
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1008798;//jslker.Parent:8798
        t.steps();
      }));
    },
    fiber$_waitFor :function _trc_Parent_f__waitFor(_thread,promise) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1008581;//jslker.Parent:8581
      t = _thread;
      $LASTPOS=1008601;//jslker.Parent:8601
      t.suspend();
      $LASTPOS=1008619;//jslker.Parent:8619
      _this._err=null;
      $LASTPOS=1008635;//jslker.Parent:8635
      promise.then((function anonymous_8648(r) {
        
        $LASTPOS=1008664;//jslker.Parent:8664
        _this._res=r;
        $LASTPOS=1008681;//jslker.Parent:8681
        t.steps();
      }),(function anonymous_8699(e) {
        
        $LASTPOS=1008715;//jslker.Parent:8715
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1008798;//jslker.Parent:8798
        t.steps();
      }));
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_Parent_waitFor(promise) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1008847;//jslker.Parent:8847
      _this._waitFor(promise);
      $LASTPOS=1008871;//jslker.Parent:8871
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
            $LASTPOS=1008847;//jslker.Parent:8847
            _this.fiber$_waitFor(_thread, promise);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008871;//jslker.Parent:8871
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
      
      $LASTPOS=1008946;//jslker.Parent:8946
      url = window.location.href;
      $LASTPOS=1008981;//jslker.Parent:8981
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/put"+"&key="+key+"&value="+value+"&url="+url);
      $LASTPOS=1009112;//jslker.Parent:9112
      r;
      $LASTPOS=1009124;//jslker.Parent:9124
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
      
      $LASTPOS=1008946;//jslker.Parent:8946
      url = window.location.href;
      $LASTPOS=1008981;//jslker.Parent:8981
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/put"+"&key="+key+"&value="+value+"&url="+url);
      $LASTPOS=1009112;//jslker.Parent:9112
      r;
      
      _thread.enter(function _trc_Parent_ent_putToServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009124;//jslker.Parent:9124
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
      
      $LASTPOS=1009184;//jslker.Parent:9184
      url = window.location.href;
      $LASTPOS=1009219;//jslker.Parent:9219
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url);
      $LASTPOS=1009328;//jslker.Parent:9328
      r;
      $LASTPOS=1009340;//jslker.Parent:9340
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
      
      $LASTPOS=1009184;//jslker.Parent:9184
      url = window.location.href;
      $LASTPOS=1009219;//jslker.Parent:9219
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url);
      $LASTPOS=1009328;//jslker.Parent:9328
      r;
      
      _thread.enter(function _trc_Parent_ent_getFromServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009340;//jslker.Parent:9340
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
      
      $LASTPOS=1009416;//jslker.Parent:9416
      url = window.location.href;
      $LASTPOS=1009451;//jslker.Parent:9451
      params = "&group="+group+"&practice="+practice+"&url="+url;
      $LASTPOS=1009518;//jslker.Parent:9518
      if (d1!=null) {
        $LASTPOS=1009532;//jslker.Parent:9532
        params+="&data1="+d1;
      }
      $LASTPOS=1009559;//jslker.Parent:9559
      if (d2!=null) {
        $LASTPOS=1009573;//jslker.Parent:9573
        params+="&data2="+d2;
      }
      $LASTPOS=1009600;//jslker.Parent:9600
      if (d3!=null) {
        $LASTPOS=1009614;//jslker.Parent:9614
        params+="&data3="+d3;
      }
      $LASTPOS=1009641;//jslker.Parent:9641
      if (d4!=null) {
        $LASTPOS=1009655;//jslker.Parent:9655
        params+="&data4="+d4;
      }
      $LASTPOS=1009682;//jslker.Parent:9682
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      $LASTPOS=1009755;//jslker.Parent:9755
      r;
      $LASTPOS=1009767;//jslker.Parent:9767
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
      
      $LASTPOS=1009416;//jslker.Parent:9416
      url = window.location.href;
      $LASTPOS=1009451;//jslker.Parent:9451
      params = "&group="+group+"&practice="+practice+"&url="+url;
      $LASTPOS=1009518;//jslker.Parent:9518
      if (d1!=null) {
        $LASTPOS=1009532;//jslker.Parent:9532
        params+="&data1="+d1;
      }
      $LASTPOS=1009559;//jslker.Parent:9559
      if (d2!=null) {
        $LASTPOS=1009573;//jslker.Parent:9573
        params+="&data2="+d2;
      }
      $LASTPOS=1009600;//jslker.Parent:9600
      if (d3!=null) {
        $LASTPOS=1009614;//jslker.Parent:9614
        params+="&data3="+d3;
      }
      $LASTPOS=1009641;//jslker.Parent:9641
      if (d4!=null) {
        $LASTPOS=1009655;//jslker.Parent:9655
        params+="&data4="+d4;
      }
      $LASTPOS=1009682;//jslker.Parent:9682
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      $LASTPOS=1009755;//jslker.Parent:9755
      r;
      
      _thread.enter(function _trc_Parent_ent_addLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009767;//jslker.Parent:9767
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
      
      $LASTPOS=1009844;//jslker.Parent:9844
      url = window.location.href;
      $LASTPOS=1009879;//jslker.Parent:9879
      params = "&group="+group+"&practice="+practice+"&url="+url;
      $LASTPOS=1009946;//jslker.Parent:9946
      if (d1!=null) {
        $LASTPOS=1009960;//jslker.Parent:9960
        params+="&data1="+d1;
      }
      $LASTPOS=1009987;//jslker.Parent:9987
      if (d2!=null) {
        $LASTPOS=1010001;//jslker.Parent:10001
        params+="&data2="+d2;
      }
      $LASTPOS=1010028;//jslker.Parent:10028
      if (d3!=null) {
        $LASTPOS=1010042;//jslker.Parent:10042
        params+="&data3="+d3;
      }
      $LASTPOS=1010069;//jslker.Parent:10069
      if (d4!=null) {
        $LASTPOS=1010083;//jslker.Parent:10083
        params+="&data4="+d4;
      }
      $LASTPOS=1010110;//jslker.Parent:10110
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      $LASTPOS=1010184;//jslker.Parent:10184
      r;
      $LASTPOS=1010196;//jslker.Parent:10196
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
      
      $LASTPOS=1009844;//jslker.Parent:9844
      url = window.location.href;
      $LASTPOS=1009879;//jslker.Parent:9879
      params = "&group="+group+"&practice="+practice+"&url="+url;
      $LASTPOS=1009946;//jslker.Parent:9946
      if (d1!=null) {
        $LASTPOS=1009960;//jslker.Parent:9960
        params+="&data1="+d1;
      }
      $LASTPOS=1009987;//jslker.Parent:9987
      if (d2!=null) {
        $LASTPOS=1010001;//jslker.Parent:10001
        params+="&data2="+d2;
      }
      $LASTPOS=1010028;//jslker.Parent:10028
      if (d3!=null) {
        $LASTPOS=1010042;//jslker.Parent:10042
        params+="&data3="+d3;
      }
      $LASTPOS=1010069;//jslker.Parent:10069
      if (d4!=null) {
        $LASTPOS=1010083;//jslker.Parent:10083
        params+="&data4="+d4;
      }
      $LASTPOS=1010110;//jslker.Parent:10110
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      $LASTPOS=1010184;//jslker.Parent:10184
      r;
      
      _thread.enter(function _trc_Parent_ent_findLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010196;//jslker.Parent:10196
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