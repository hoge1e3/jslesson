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
      
      return (function anonymous_432() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000582;//jslker.Parent:582
          window.onerror("","","","",e);
          
        }
      });
    },
    fiber$catchException :function _trc_Parent_f_catchException(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(function anonymous_432() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000582;//jslker.Parent:582
          window.onerror("","","","",e);
          
        }
      });return;
      
      
      _thread.retVal=_this;return;
    },
    findElement :function _trc_Parent_findElement(elem) {
      "use strict";
      var _this=this;
      var res;
      
      $LASTPOS=1000662;//jslker.Parent:662
      if (elem instanceof $) {
        return elem;
      }
      $LASTPOS=1000703;//jslker.Parent:703
      res = $("[name="+elem+"]");
      
      $LASTPOS=1000738;//jslker.Parent:738
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
      
      $LASTPOS=1000662;//jslker.Parent:662
      if (elem instanceof $) {
        _thread.retVal=elem;return;
        
      }
      $LASTPOS=1000703;//jslker.Parent:703
      res = $("[name="+elem+"]");
      
      $LASTPOS=1000738;//jslker.Parent:738
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
      
      $LASTPOS=1000819;//jslker.Parent:819
      elem=_this.findElement(elem);
      $LASTPOS=1000848;//jslker.Parent:848
      if (! elem[0]) {
        return false;
      }
      $LASTPOS=1000881;//jslker.Parent:881
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
            $LASTPOS=1000819;//jslker.Parent:819
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1000848;//jslker.Parent:848
            if (!(! elem[0])) { __pc=2     ; break; }
            _thread.exit(false);return;
          case 2     :
            
            $LASTPOS=1000881;//jslker.Parent:881
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
      
      $LASTPOS=1000997;//jslker.Parent:997
      elem=_this.findElement(elem);
      $LASTPOS=1001026;//jslker.Parent:1026
      if (_this.isFormElement(elem)) {
        $LASTPOS=1001062;//jslker.Parent:1062
        elem.val("");
        
      } else {
        $LASTPOS=1001099;//jslker.Parent:1099
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
            $LASTPOS=1000997;//jslker.Parent:997
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001026;//jslker.Parent:1026
            if (_this.isFormElement(elem)) {
              $LASTPOS=1001062;//jslker.Parent:1062
              elem.val("");
              
            } else {
              $LASTPOS=1001099;//jslker.Parent:1099
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
      
      $LASTPOS=1001149;//jslker.Parent:1149
      elem=_this.findElement(elem);
      $LASTPOS=1001178;//jslker.Parent:1178
      if (_this.isFormElement(elem)) {
        $LASTPOS=1001214;//jslker.Parent:1214
        elem.val(elem.val()+val);
        
      } else {
        $LASTPOS=1001266;//jslker.Parent:1266
        if (_this.document.baWriteTo) {
          $LASTPOS=1001305;//jslker.Parent:1305
          dst = elem[0];
          
          $LASTPOS=1001335;//jslker.Parent:1335
          if (dst) {
            $LASTPOS=1001344;//jslker.Parent:1344
            _this.document.baWriteTo(dst,val);
          }
          
        } else {
          $LASTPOS=1001405;//jslker.Parent:1405
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
            $LASTPOS=1001149;//jslker.Parent:1149
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001178;//jslker.Parent:1178
            if (_this.isFormElement(elem)) {
              $LASTPOS=1001214;//jslker.Parent:1214
              elem.val(elem.val()+val);
              
            } else {
              $LASTPOS=1001266;//jslker.Parent:1266
              if (_this.document.baWriteTo) {
                $LASTPOS=1001305;//jslker.Parent:1305
                dst = elem[0];
                
                $LASTPOS=1001335;//jslker.Parent:1335
                if (dst) {
                  $LASTPOS=1001344;//jslker.Parent:1344
                  _this.document.baWriteTo(dst,val);
                }
                
              } else {
                $LASTPOS=1001405;//jslker.Parent:1405
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
      
      $LASTPOS=1001470;//jslker.Parent:1470
      _this.clearContent(elem);
      $LASTPOS=1001495;//jslker.Parent:1495
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
            $LASTPOS=1001470;//jslker.Parent:1470
            _this.fiber$clearContent(_thread, elem);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1001495;//jslker.Parent:1495
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
      
      $LASTPOS=1001590;//jslker.Parent:1590
      elem=_this.findElement(elem);
      $LASTPOS=1001619;//jslker.Parent:1619
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
            $LASTPOS=1001590;//jslker.Parent:1590
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=1001619;//jslker.Parent:1619
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
      
      $LASTPOS=1001772;//jslker.Parent:1772
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
            $LASTPOS=1001772;//jslker.Parent:1772
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
      
      
      $LASTPOS=1001847;//jslker.Parent:1847
      if (typeof  func=='function') {
        $LASTPOS=1001887;//jslker.Parent:1887
        if (func.methodInfo) {
          $LASTPOS=1001923;//jslker.Parent:1923
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1001997;//jslker.Parent:1997
        fname=func+"";
        
      }
      $LASTPOS=1002024;//jslker.Parent:2024
      if (typeof  fname=="string") {
        $LASTPOS=1002063;//jslker.Parent:2063
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1002130;//jslker.Parent:2130
        if (_this["fiber$"+fname]) {
          $LASTPOS=1002171;//jslker.Parent:2171
          usepara=true;
          
        }
        
      }
      $LASTPOS=1002208;//jslker.Parent:2208
      if (usepara) {
        $LASTPOS=1002232;//jslker.Parent:2232
        _this.findElement(elem).click(_this.catchException((function anonymous_2271() {
          
          $LASTPOS=1002288;//jslker.Parent:2288
          _this.parallel(fname);
        })));
        
      } else {
        $LASTPOS=1002402;//jslker.Parent:2402
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
      
      
      $LASTPOS=1001847;//jslker.Parent:1847
      if (typeof  func=='function') {
        $LASTPOS=1001887;//jslker.Parent:1887
        if (func.methodInfo) {
          $LASTPOS=1001923;//jslker.Parent:1923
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1001997;//jslker.Parent:1997
        fname=func+"";
        
      }
      $LASTPOS=1002024;//jslker.Parent:2024
      if (typeof  fname=="string") {
        $LASTPOS=1002063;//jslker.Parent:2063
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1002130;//jslker.Parent:2130
        if (_this["fiber$"+fname]) {
          $LASTPOS=1002171;//jslker.Parent:2171
          usepara=true;
          
        }
        
      }
      
      _thread.enter(function _trc_Parent_ent_onClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1002208;//jslker.Parent:2208
            if (!(usepara)) { __pc=1     ; break; }
            $LASTPOS=1002232;//jslker.Parent:2232
            _this.findElement(elem).click(_this.catchException((function anonymous_2271() {
              
              $LASTPOS=1002288;//jslker.Parent:2288
              _this.parallel(fname);
            })));
            __pc=2     ;break;
          case 1     :
            {
              $LASTPOS=1002402;//jslker.Parent:2402
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
      
      $LASTPOS=1002481;//jslker.Parent:2481
      if (typeof  func=="function") {
        $LASTPOS=1002519;//jslker.Parent:2519
        $("body").on("touchstart",(function anonymous_2545(e) {
          
          $LASTPOS=1002571;//jslker.Parent:2571
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1002702;//jslker.Parent:2702
        $("body").on("touchmove",(function anonymous_2727(e) {
          
          $LASTPOS=1002753;//jslker.Parent:2753
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002883;//jslker.Parent:2883
        $("body").on("touchend",(function anonymous_2907(e) {
          
          $LASTPOS=1002933;//jslker.Parent:2933
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1003062;//jslker.Parent:3062
        $("body").on("mousedown",(function anonymous_3087(e) {
          
          $LASTPOS=1003113;//jslker.Parent:3113
          _this.down=true;
          $LASTPOS=1003137;//jslker.Parent:3137
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1003190;//jslker.Parent:3190
        $("body").on("mousemove",(function anonymous_3215(e) {
          
          $LASTPOS=1003241;//jslker.Parent:3241
          if (_this.down) {
            $LASTPOS=1003250;//jslker.Parent:3250
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1003302;//jslker.Parent:3302
        $("body").on("mouseup",(function anonymous_3325(e) {
          
          $LASTPOS=1003351;//jslker.Parent:3351
          _this.down=false;
          $LASTPOS=1003376;//jslker.Parent:3376
          func(e.pageX,e.pageY,"end");
        }));
        
      }
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002481;//jslker.Parent:2481
      if (typeof  func=="function") {
        $LASTPOS=1002519;//jslker.Parent:2519
        $("body").on("touchstart",(function anonymous_2545(e) {
          
          $LASTPOS=1002571;//jslker.Parent:2571
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1002702;//jslker.Parent:2702
        $("body").on("touchmove",(function anonymous_2727(e) {
          
          $LASTPOS=1002753;//jslker.Parent:2753
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002883;//jslker.Parent:2883
        $("body").on("touchend",(function anonymous_2907(e) {
          
          $LASTPOS=1002933;//jslker.Parent:2933
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1003062;//jslker.Parent:3062
        $("body").on("mousedown",(function anonymous_3087(e) {
          
          $LASTPOS=1003113;//jslker.Parent:3113
          _this.down=true;
          $LASTPOS=1003137;//jslker.Parent:3137
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1003190;//jslker.Parent:3190
        $("body").on("mousemove",(function anonymous_3215(e) {
          
          $LASTPOS=1003241;//jslker.Parent:3241
          if (_this.down) {
            $LASTPOS=1003250;//jslker.Parent:3250
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1003302;//jslker.Parent:3302
        $("body").on("mouseup",(function anonymous_3325(e) {
          
          $LASTPOS=1003351;//jslker.Parent:3351
          _this.down=false;
          $LASTPOS=1003376;//jslker.Parent:3376
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003503;//jslker.Parent:3503
      _this._canvas=_this.findElement(canv)[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003503;//jslker.Parent:3503
      _this._canvas=_this.findElement(canv)[0];
      
      _thread.retVal=_this;return;
    },
    searchCanvas :function _trc_Parent_searchCanvas() {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003559;//jslker.Parent:3559
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
      
      $LASTPOS=1003559;//jslker.Parent:3559
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
      
      $LASTPOS=1003684;//jslker.Parent:3684
      if (_this.searchCanvas()) {
        $LASTPOS=1003713;//jslker.Parent:3713
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003752;//jslker.Parent:3752
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003801;//jslker.Parent:3801
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003684;//jslker.Parent:3684
      if (_this.searchCanvas()) {
        $LASTPOS=1003713;//jslker.Parent:3713
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003752;//jslker.Parent:3752
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003801;//jslker.Parent:3801
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003879;//jslker.Parent:3879
      if (_this.searchCanvas()) {
        $LASTPOS=1003908;//jslker.Parent:3908
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003947;//jslker.Parent:3947
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003879;//jslker.Parent:3879
      if (_this.searchCanvas()) {
        $LASTPOS=1003908;//jslker.Parent:3908
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003947;//jslker.Parent:3947
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004015;//jslker.Parent:4015
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1004059;//jslker.Parent:4059
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1004105;//jslker.Parent:4105
      _this.findElement(elem).attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004015;//jslker.Parent:4015
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1004059;//jslker.Parent:4059
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1004105;//jslker.Parent:4105
      _this.findElement(elem).attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004171;//jslker.Parent:4171
      _this.findElement(elem).css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004171;//jslker.Parent:4171
      _this.findElement(elem).css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004293;//jslker.Parent:4293
      console.log(scaleX,scaleY);
      $LASTPOS=1004326;//jslker.Parent:4326
      if (! scaleX) {
        $LASTPOS=1004348;//jslker.Parent:4348
        scaleX=1;
        $LASTPOS=1004367;//jslker.Parent:4367
        scaleY=1;
        
      } else {
        $LASTPOS=1004388;//jslker.Parent:4388
        if (! scaleY) {
          $LASTPOS=1004410;//jslker.Parent:4410
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004437;//jslker.Parent:4437
      console.log(scaleX,scaleY);
      $LASTPOS=1004470;//jslker.Parent:4470
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004293;//jslker.Parent:4293
      console.log(scaleX,scaleY);
      $LASTPOS=1004326;//jslker.Parent:4326
      if (! scaleX) {
        $LASTPOS=1004348;//jslker.Parent:4348
        scaleX=1;
        $LASTPOS=1004367;//jslker.Parent:4367
        scaleY=1;
        
      } else {
        $LASTPOS=1004388;//jslker.Parent:4388
        if (! scaleY) {
          $LASTPOS=1004410;//jslker.Parent:4410
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004437;//jslker.Parent:4437
      console.log(scaleX,scaleY);
      $LASTPOS=1004470;//jslker.Parent:4470
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004634;//jslker.Parent:4634
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004634;//jslker.Parent:4634
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004767;//jslker.Parent:4767
      _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004767;//jslker.Parent:4767
      _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this;
      var t;
      var runThread;
      
      $LASTPOS=1004895;//jslker.Parent:4895
      time=time||100;
      $LASTPOS=1004916;//jslker.Parent:4916
      t = null;
      
      $LASTPOS=1004936;//jslker.Parent:4936
      runThread = _this.catchException((function anonymous_4965() {
        
        $LASTPOS=1004977;//jslker.Parent:4977
        t.steps();
        $LASTPOS=1004997;//jslker.Parent:4997
        if (t.preempted) {
          $LASTPOS=1005029;//jslker.Parent:5029
          setTimeout(runThread,0);
          
        }
      }));
      
      $LASTPOS=1005078;//jslker.Parent:5078
      t.suspend();
      $LASTPOS=1005096;//jslker.Parent:5096
      setTimeout(runThread,time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var runThread;
      
      $LASTPOS=1004895;//jslker.Parent:4895
      time=time||100;
      $LASTPOS=1004916;//jslker.Parent:4916
      t = _thread;
      
      
      _thread.enter(function _trc_Parent_ent_wait(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1004936;//jslker.Parent:4936
            _this.fiber$catchException(_thread, (function anonymous_4965() {
              
              $LASTPOS=1004977;//jslker.Parent:4977
              t.steps();
              $LASTPOS=1004997;//jslker.Parent:4997
              if (t.preempted) {
                $LASTPOS=1005029;//jslker.Parent:5029
                setTimeout(runThread,0);
                
              }
            }));
            __pc=1;return;
          case 1:
            runThread=_thread.retVal;
            
            $LASTPOS=1005078;//jslker.Parent:5078
            t.suspend();
            $LASTPOS=1005096;//jslker.Parent:5096
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
      
      $LASTPOS=1005209;//jslker.Parent:5209
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005209;//jslker.Parent:5209
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this;
      var e;
      
      $LASTPOS=1005282;//jslker.Parent:5282
      e = _this.document.createElement(elem);
      
      $LASTPOS=1005324;//jslker.Parent:5324
      e.setAttribute("name",n);
      $LASTPOS=1005356;//jslker.Parent:5356
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1005282;//jslker.Parent:5282
      e = _this.document.createElement(elem);
      
      $LASTPOS=1005324;//jslker.Parent:5324
      e.setAttribute("name",n);
      $LASTPOS=1005356;//jslker.Parent:5356
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005415;//jslker.Parent:5415
      if (_this.searchCanvas()) {
        $LASTPOS=1005444;//jslker.Parent:5444
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005483;//jslker.Parent:5483
        _this.ctx.save();
        $LASTPOS=1005504;//jslker.Parent:5504
        _this.ctx.beginPath();
        $LASTPOS=1005530;//jslker.Parent:5530
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005567;//jslker.Parent:5567
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005597;//jslker.Parent:5597
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005649;//jslker.Parent:5649
        _this.ctx.fill();
        $LASTPOS=1005670;//jslker.Parent:5670
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005415;//jslker.Parent:5415
      if (_this.searchCanvas()) {
        $LASTPOS=1005444;//jslker.Parent:5444
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005483;//jslker.Parent:5483
        _this.ctx.save();
        $LASTPOS=1005504;//jslker.Parent:5504
        _this.ctx.beginPath();
        $LASTPOS=1005530;//jslker.Parent:5530
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005567;//jslker.Parent:5567
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005597;//jslker.Parent:5597
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005649;//jslker.Parent:5649
        _this.ctx.fill();
        $LASTPOS=1005670;//jslker.Parent:5670
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005725;//jslker.Parent:5725
      if (_this.searchCanvas()) {
        $LASTPOS=1005754;//jslker.Parent:5754
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005793;//jslker.Parent:5793
        _this.ctx.beginPath();
        $LASTPOS=1005819;//jslker.Parent:5819
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005847;//jslker.Parent:5847
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005875;//jslker.Parent:5875
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005725;//jslker.Parent:5725
      if (_this.searchCanvas()) {
        $LASTPOS=1005754;//jslker.Parent:5754
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005793;//jslker.Parent:5793
        _this.ctx.beginPath();
        $LASTPOS=1005819;//jslker.Parent:5819
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005847;//jslker.Parent:5847
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005875;//jslker.Parent:5875
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1005926;//jslker.Parent:5926
      if (_this.searchCanvas()) {
        $LASTPOS=1005955;//jslker.Parent:5955
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005994;//jslker.Parent:5994
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005926;//jslker.Parent:5926
      if (_this.searchCanvas()) {
        $LASTPOS=1005955;//jslker.Parent:5955
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005994;//jslker.Parent:5994
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1006052;//jslker.Parent:6052
      if (_this.searchCanvas()) {
        $LASTPOS=1006081;//jslker.Parent:6081
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1006120;//jslker.Parent:6120
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1006052;//jslker.Parent:6052
      if (_this.searchCanvas()) {
        $LASTPOS=1006081;//jslker.Parent:6081
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1006120;//jslker.Parent:6120
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this;
      
      $LASTPOS=1006183;//jslker.Parent:6183
      _this.activityGroup=_this.activityGroup||"default";
      $LASTPOS=1006228;//jslker.Parent:6228
      _this.keyData=[];
      $LASTPOS=1006245;//jslker.Parent:6245
      _this.document.onkeydown=(function anonymous_6266(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006289;//jslker.Parent:6289
        if (! e) {
          $LASTPOS=1006296;//jslker.Parent:6296
          e=window.event;
        }
        $LASTPOS=1006323;//jslker.Parent:6323
        key_code = e.keyCode;
        
        $LASTPOS=1006358;//jslker.Parent:6358
        key_char = String.fromCharCode(key_code).toLowerCase();
        
        $LASTPOS=1006427;//jslker.Parent:6427
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1006496;//jslker.Parent:6496
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1006534;//jslker.Parent:6534
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1006600;//jslker.Parent:6600
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1006637;//jslker.Parent:6637
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1006700;//jslker.Parent:6700
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1006736;//jslker.Parent:6736
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1006798;//jslker.Parent:6798
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1006831;//jslker.Parent:6831
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1006889;//jslker.Parent:6889
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1006920;//jslker.Parent:6920
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1006984;//jslker.Parent:6984
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1007018;//jslker.Parent:7018
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1007080;//jslker.Parent:7080
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1007113;//jslker.Parent:7113
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1007159;//jslker.Parent:7159
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
      $LASTPOS=1007324;//jslker.Parent:7324
      _this.document.onkeyup=(function anonymous_7343(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1007366;//jslker.Parent:7366
        if (! e) {
          $LASTPOS=1007373;//jslker.Parent:7373
          e=window.event;
        }
        $LASTPOS=1007400;//jslker.Parent:7400
        key_code = e.keyCode;
        
        $LASTPOS=1007435;//jslker.Parent:7435
        key_char = String.fromCharCode(key_code).toLowerCase();
        
        $LASTPOS=1007504;//jslker.Parent:7504
        if (e.keyCode==16) {
          $LASTPOS=1007522;//jslker.Parent:7522
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1007560;//jslker.Parent:7560
          if (e.keyCode==17) {
            $LASTPOS=1007578;//jslker.Parent:7578
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1007615;//jslker.Parent:7615
            if (e.keyCode==18) {
              $LASTPOS=1007633;//jslker.Parent:7633
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1007669;//jslker.Parent:7669
              if (e.keyCode==37) {
                $LASTPOS=1007687;//jslker.Parent:7687
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1007720;//jslker.Parent:7720
                if (e.keyCode==38) {
                  $LASTPOS=1007738;//jslker.Parent:7738
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1007769;//jslker.Parent:7769
                  if (e.keyCode==39) {
                    $LASTPOS=1007787;//jslker.Parent:7787
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1007821;//jslker.Parent:7821
                    if (e.keyCode==40) {
                      $LASTPOS=1007839;//jslker.Parent:7839
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1007872;//jslker.Parent:7872
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
      
      $LASTPOS=1008396;//jslker.Parent:8396
      a = Array.prototype.slice.call(arguments);
      
      $LASTPOS=1008446;//jslker.Parent:8446
      methodName = a.shift();
      
      $LASTPOS=1008477;//jslker.Parent:8477
      t = Tonyu.thread();
      
      $LASTPOS=1008504;//jslker.Parent:8504
      t.apply(_this,methodName,a);
      $LASTPOS=1008537;//jslker.Parent:8537
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
      
      $LASTPOS=1008396;//jslker.Parent:8396
      a = Array.prototype.slice.call(_arguments);
      
      $LASTPOS=1008446;//jslker.Parent:8446
      methodName = a.shift();
      
      $LASTPOS=1008477;//jslker.Parent:8477
      t = Tonyu.thread();
      
      $LASTPOS=1008504;//jslker.Parent:8504
      t.apply(_this,methodName,a);
      $LASTPOS=1008537;//jslker.Parent:8537
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this;
      var clicked;
      var _func;
      
      $LASTPOS=1008575;//jslker.Parent:8575
      clicked = 0;
      
      $LASTPOS=1008595;//jslker.Parent:8595
      _func = (function anonymous_8605() {
        
        $LASTPOS=1008626;//jslker.Parent:8626
        clicked=1;
      });
      
      $LASTPOS=1008650;//jslker.Parent:8650
      _this.onClick(elem,_func);
      $LASTPOS=1008676;//jslker.Parent:8676
      while (clicked==0) {
        Tonyu.checkLoop();
        $LASTPOS=1008704;//jslker.Parent:8704
        _this.wait(10);
        
      }
      $LASTPOS=1008726;//jslker.Parent:8726
      _this.findElement(elem).off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=1008575;//jslker.Parent:8575
      clicked = 0;
      
      $LASTPOS=1008595;//jslker.Parent:8595
      _func = (function anonymous_8605() {
        
        $LASTPOS=1008626;//jslker.Parent:8626
        clicked=1;
      });
      
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008650;//jslker.Parent:8650
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008676;//jslker.Parent:8676
          case 2:
            if (!(clicked==0)) { __pc=4     ; break; }
            $LASTPOS=1008704;//jslker.Parent:8704
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4     :
            
            $LASTPOS=1008726;//jslker.Parent:8726
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
      
      $LASTPOS=1008797;//jslker.Parent:8797
      t = null;
      
      $LASTPOS=1008817;//jslker.Parent:8817
      t.suspend();
      $LASTPOS=1008835;//jslker.Parent:8835
      _this._err=null;
      $LASTPOS=1008851;//jslker.Parent:8851
      promise.then((function anonymous_8864(r) {
        
        $LASTPOS=1008880;//jslker.Parent:8880
        _this._res=r;
        $LASTPOS=1008897;//jslker.Parent:8897
        t.steps();
      }),(function anonymous_8915(e) {
        
        $LASTPOS=1008931;//jslker.Parent:8931
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1009014;//jslker.Parent:9014
        t.steps();
      }));
    },
    fiber$_waitFor :function _trc_Parent_f__waitFor(_thread,promise) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1008797;//jslker.Parent:8797
      t = _thread;
      
      $LASTPOS=1008817;//jslker.Parent:8817
      t.suspend();
      $LASTPOS=1008835;//jslker.Parent:8835
      _this._err=null;
      $LASTPOS=1008851;//jslker.Parent:8851
      promise.then((function anonymous_8864(r) {
        
        $LASTPOS=1008880;//jslker.Parent:8880
        _this._res=r;
        $LASTPOS=1008897;//jslker.Parent:8897
        t.steps();
      }),(function anonymous_8915(e) {
        
        $LASTPOS=1008931;//jslker.Parent:8931
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=1009014;//jslker.Parent:9014
        t.steps();
      }));
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_Parent_waitFor(promise) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1009063;//jslker.Parent:9063
      _this._waitFor(promise);
      $LASTPOS=1009087;//jslker.Parent:9087
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
            $LASTPOS=1009063;//jslker.Parent:9063
            _this.fiber$_waitFor(_thread, promise);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1009087;//jslker.Parent:9087
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
      
      $LASTPOS=1009162;//jslker.Parent:9162
      url = window.location.href;
      
      $LASTPOS=1009197;//jslker.Parent:9197
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/put"+"&key="+key+"&value="+value+"&url="+url+"&group="+_this.activityGroup);
      
      
      $LASTPOS=1009370;//jslker.Parent:9370
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
      
      $LASTPOS=1009162;//jslker.Parent:9162
      url = window.location.href;
      
      $LASTPOS=1009197;//jslker.Parent:9197
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/put"+"&key="+key+"&value="+value+"&url="+url+"&group="+_this.activityGroup);
      
      
      
      _thread.enter(function _trc_Parent_ent_putToServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009370;//jslker.Parent:9370
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
      
      $LASTPOS=1009423;//jslker.Parent:9423
      _this.activityGroup=g||"default";
    },
    fiber$setGroup :function _trc_Parent_f_setGroup(_thread,g) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1009423;//jslker.Parent:9423
      _this.activityGroup=g||"default";
      
      _thread.retVal=_this;return;
    },
    getFromServer :function _trc_Parent_getFromServer(key) {
      "use strict";
      var _this=this;
      var url;
      var p;
      var r;
      
      $LASTPOS=1009482;//jslker.Parent:9482
      url = window.location.href;
      
      $LASTPOS=1009517;//jslker.Parent:9517
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      $LASTPOS=1009668;//jslker.Parent:9668
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
      
      $LASTPOS=1009482;//jslker.Parent:9482
      url = window.location.href;
      
      $LASTPOS=1009517;//jslker.Parent:9517
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      
      _thread.enter(function _trc_Parent_ent_getFromServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009668;//jslker.Parent:9668
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
      
      $LASTPOS=1009738;//jslker.Parent:9738
      _this.group=_this.activityGroup;
      $LASTPOS=1009764;//jslker.Parent:9764
      url = window.location.href;
      
      $LASTPOS=1009799;//jslker.Parent:9799
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1009866;//jslker.Parent:9866
      if (d1!=null) {
        $LASTPOS=1009880;//jslker.Parent:9880
        params+="&data1="+d1;
      }
      $LASTPOS=1009907;//jslker.Parent:9907
      if (d2!=null) {
        $LASTPOS=1009921;//jslker.Parent:9921
        params+="&data2="+d2;
      }
      $LASTPOS=1009948;//jslker.Parent:9948
      if (d3!=null) {
        $LASTPOS=1009962;//jslker.Parent:9962
        params+="&data3="+d3;
      }
      $LASTPOS=1009989;//jslker.Parent:9989
      if (d4!=null) {
        $LASTPOS=1010003;//jslker.Parent:10003
        params+="&data4="+d4;
      }
      $LASTPOS=1010030;//jslker.Parent:10030
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      $LASTPOS=1010115;//jslker.Parent:10115
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
      
      $LASTPOS=1009738;//jslker.Parent:9738
      _this.group=_this.activityGroup;
      $LASTPOS=1009764;//jslker.Parent:9764
      url = window.location.href;
      
      $LASTPOS=1009799;//jslker.Parent:9799
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1009866;//jslker.Parent:9866
      if (d1!=null) {
        $LASTPOS=1009880;//jslker.Parent:9880
        params+="&data1="+d1;
      }
      $LASTPOS=1009907;//jslker.Parent:9907
      if (d2!=null) {
        $LASTPOS=1009921;//jslker.Parent:9921
        params+="&data2="+d2;
      }
      $LASTPOS=1009948;//jslker.Parent:9948
      if (d3!=null) {
        $LASTPOS=1009962;//jslker.Parent:9962
        params+="&data3="+d3;
      }
      $LASTPOS=1009989;//jslker.Parent:9989
      if (d4!=null) {
        $LASTPOS=1010003;//jslker.Parent:10003
        params+="&data4="+d4;
      }
      $LASTPOS=1010030;//jslker.Parent:10030
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_addLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010115;//jslker.Parent:10115
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
      
      $LASTPOS=1010186;//jslker.Parent:10186
      _this.group=_this.activityGroup;
      $LASTPOS=1010212;//jslker.Parent:10212
      url = window.location.href;
      
      $LASTPOS=1010247;//jslker.Parent:10247
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010314;//jslker.Parent:10314
      if (d1!=null) {
        $LASTPOS=1010328;//jslker.Parent:10328
        params+="&data1="+d1;
      }
      $LASTPOS=1010355;//jslker.Parent:10355
      if (d2!=null) {
        $LASTPOS=1010369;//jslker.Parent:10369
        params+="&data2="+d2;
      }
      $LASTPOS=1010396;//jslker.Parent:10396
      if (d3!=null) {
        $LASTPOS=1010410;//jslker.Parent:10410
        params+="&data3="+d3;
      }
      $LASTPOS=1010437;//jslker.Parent:10437
      if (d4!=null) {
        $LASTPOS=1010451;//jslker.Parent:10451
        params+="&data4="+d4;
      }
      $LASTPOS=1010478;//jslker.Parent:10478
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      $LASTPOS=1010564;//jslker.Parent:10564
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
      
      $LASTPOS=1010186;//jslker.Parent:10186
      _this.group=_this.activityGroup;
      $LASTPOS=1010212;//jslker.Parent:10212
      url = window.location.href;
      
      $LASTPOS=1010247;//jslker.Parent:10247
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010314;//jslker.Parent:10314
      if (d1!=null) {
        $LASTPOS=1010328;//jslker.Parent:10328
        params+="&data1="+d1;
      }
      $LASTPOS=1010355;//jslker.Parent:10355
      if (d2!=null) {
        $LASTPOS=1010369;//jslker.Parent:10369
        params+="&data2="+d2;
      }
      $LASTPOS=1010396;//jslker.Parent:10396
      if (d3!=null) {
        $LASTPOS=1010410;//jslker.Parent:10410
        params+="&data3="+d3;
      }
      $LASTPOS=1010437;//jslker.Parent:10437
      if (d4!=null) {
        $LASTPOS=1010451;//jslker.Parent:10451
        params+="&data4="+d4;
      }
      $LASTPOS=1010478;//jslker.Parent:10478
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_findLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010564;//jslker.Parent:10564
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
      
      
      $LASTPOS=1010632;//jslker.Parent:10632
      if (typeof  BitArrow==="object"&&BitArrow.publishedURL) {
        $LASTPOS=1010700;//jslker.Parent:10700
        url=BitArrow.publishedURL;
        
      } else {
        $LASTPOS=1010750;//jslker.Parent:10750
        url=window.location.href;
        
      }
      $LASTPOS=1010788;//jslker.Parent:10788
      params = "&url="+url;
      
      $LASTPOS=1010817;//jslker.Parent:10817
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/info"+params);
      
      
      $LASTPOS=1010904;//jslker.Parent:10904
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
      
      
      $LASTPOS=1010632;//jslker.Parent:10632
      if (typeof  BitArrow==="object"&&BitArrow.publishedURL) {
        $LASTPOS=1010700;//jslker.Parent:10700
        url=BitArrow.publishedURL;
        
      } else {
        $LASTPOS=1010750;//jslker.Parent:10750
        url=window.location.href;
        
      }
      $LASTPOS=1010788;//jslker.Parent:10788
      params = "&url="+url;
      
      $LASTPOS=1010817;//jslker.Parent:10817
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/info"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_curProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010904;//jslker.Parent:10904
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
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"setInterval":{"nowait":false},"setTimeout":{"nowait":false},"catchException":{"nowait":false},"findElement":{"nowait":false},"isFormElement":{"nowait":false},"clearContent":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"searchCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"new":{"nowait":false},"getkey":{"nowait":false},"dist":{"nowait":false},"angle":{"nowait":false},"rad":{"nowait":true},"deg":{"nowait":true},"sqrt":{"nowait":false},"sin":{"nowait":false},"cos":{"nowait":false},"tan":{"nowait":false},"parallel":{"nowait":false},"waitClick":{"nowait":false},"_waitFor":{"nowait":false},"waitFor":{"nowait":false},"putToServer":{"nowait":false},"setGroup":{"nowait":false},"getFromServer":{"nowait":false},"addLog":{"nowait":false},"findLog":{"nowait":false},"curProject":{"nowait":false}},"fields":{"document":{},"down":{},"_canvas":{},"ctx":{},"Math":{},"activityGroup":{},"keyData":{},"_err":{},"_res":{},"group":{}}}
});

//# sourceMappingURL=concat.js.map