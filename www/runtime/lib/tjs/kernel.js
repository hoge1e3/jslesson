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
      
      $LASTPOS=1009438;//jslker.Parent:9438
      url = window.location.href;
      
      $LASTPOS=1009473;//jslker.Parent:9473
      p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
      
      
      $LASTPOS=1009675;//jslker.Parent:9675
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
      
      $LASTPOS=1009438;//jslker.Parent:9438
      url = window.location.href;
      
      $LASTPOS=1009473;//jslker.Parent:9473
      p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
      
      
      
      _thread.enter(function _trc_Parent_ent_putToServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009675;//jslker.Parent:9675
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
      
      $LASTPOS=1009728;//jslker.Parent:9728
      _this.activityGroup=g||"default";
    },
    fiber$setGroup :function _trc_Parent_f_setGroup(_thread,g) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1009728;//jslker.Parent:9728
      _this.activityGroup=g||"default";
      
      _thread.retVal=_this;return;
    },
    getFromServer :function _trc_Parent_getFromServer(key) {
      "use strict";
      var _this=this;
      var url;
      var p;
      var r;
      
      $LASTPOS=1009787;//jslker.Parent:9787
      url = window.location.href;
      
      $LASTPOS=1009822;//jslker.Parent:9822
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      $LASTPOS=1009973;//jslker.Parent:9973
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
      
      $LASTPOS=1009787;//jslker.Parent:9787
      url = window.location.href;
      
      $LASTPOS=1009822;//jslker.Parent:9822
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      
      _thread.enter(function _trc_Parent_ent_getFromServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1009973;//jslker.Parent:9973
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
      
      $LASTPOS=1010043;//jslker.Parent:10043
      _this.group=_this.activityGroup;
      $LASTPOS=1010069;//jslker.Parent:10069
      url = window.location.href;
      
      $LASTPOS=1010104;//jslker.Parent:10104
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010171;//jslker.Parent:10171
      if (d1!=null) {
        $LASTPOS=1010185;//jslker.Parent:10185
        params+="&data1="+d1;
      }
      $LASTPOS=1010212;//jslker.Parent:10212
      if (d2!=null) {
        $LASTPOS=1010226;//jslker.Parent:10226
        params+="&data2="+d2;
      }
      $LASTPOS=1010253;//jslker.Parent:10253
      if (d3!=null) {
        $LASTPOS=1010267;//jslker.Parent:10267
        params+="&data3="+d3;
      }
      $LASTPOS=1010294;//jslker.Parent:10294
      if (d4!=null) {
        $LASTPOS=1010308;//jslker.Parent:10308
        params+="&data4="+d4;
      }
      $LASTPOS=1010335;//jslker.Parent:10335
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      $LASTPOS=1010420;//jslker.Parent:10420
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
      
      $LASTPOS=1010043;//jslker.Parent:10043
      _this.group=_this.activityGroup;
      $LASTPOS=1010069;//jslker.Parent:10069
      url = window.location.href;
      
      $LASTPOS=1010104;//jslker.Parent:10104
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010171;//jslker.Parent:10171
      if (d1!=null) {
        $LASTPOS=1010185;//jslker.Parent:10185
        params+="&data1="+d1;
      }
      $LASTPOS=1010212;//jslker.Parent:10212
      if (d2!=null) {
        $LASTPOS=1010226;//jslker.Parent:10226
        params+="&data2="+d2;
      }
      $LASTPOS=1010253;//jslker.Parent:10253
      if (d3!=null) {
        $LASTPOS=1010267;//jslker.Parent:10267
        params+="&data3="+d3;
      }
      $LASTPOS=1010294;//jslker.Parent:10294
      if (d4!=null) {
        $LASTPOS=1010308;//jslker.Parent:10308
        params+="&data4="+d4;
      }
      $LASTPOS=1010335;//jslker.Parent:10335
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_addLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010420;//jslker.Parent:10420
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
      
      $LASTPOS=1010491;//jslker.Parent:10491
      _this.group=_this.activityGroup;
      $LASTPOS=1010517;//jslker.Parent:10517
      url = window.location.href;
      
      $LASTPOS=1010552;//jslker.Parent:10552
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010619;//jslker.Parent:10619
      if (d1!=null) {
        $LASTPOS=1010633;//jslker.Parent:10633
        params+="&data1="+d1;
      }
      $LASTPOS=1010660;//jslker.Parent:10660
      if (d2!=null) {
        $LASTPOS=1010674;//jslker.Parent:10674
        params+="&data2="+d2;
      }
      $LASTPOS=1010701;//jslker.Parent:10701
      if (d3!=null) {
        $LASTPOS=1010715;//jslker.Parent:10715
        params+="&data3="+d3;
      }
      $LASTPOS=1010742;//jslker.Parent:10742
      if (d4!=null) {
        $LASTPOS=1010756;//jslker.Parent:10756
        params+="&data4="+d4;
      }
      $LASTPOS=1010783;//jslker.Parent:10783
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      $LASTPOS=1010869;//jslker.Parent:10869
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
      
      $LASTPOS=1010491;//jslker.Parent:10491
      _this.group=_this.activityGroup;
      $LASTPOS=1010517;//jslker.Parent:10517
      url = window.location.href;
      
      $LASTPOS=1010552;//jslker.Parent:10552
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=1010619;//jslker.Parent:10619
      if (d1!=null) {
        $LASTPOS=1010633;//jslker.Parent:10633
        params+="&data1="+d1;
      }
      $LASTPOS=1010660;//jslker.Parent:10660
      if (d2!=null) {
        $LASTPOS=1010674;//jslker.Parent:10674
        params+="&data2="+d2;
      }
      $LASTPOS=1010701;//jslker.Parent:10701
      if (d3!=null) {
        $LASTPOS=1010715;//jslker.Parent:10715
        params+="&data3="+d3;
      }
      $LASTPOS=1010742;//jslker.Parent:10742
      if (d4!=null) {
        $LASTPOS=1010756;//jslker.Parent:10756
        params+="&data4="+d4;
      }
      $LASTPOS=1010783;//jslker.Parent:10783
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_findLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1010869;//jslker.Parent:10869
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
      
      
      $LASTPOS=1010937;//jslker.Parent:10937
      if (typeof  BitArrow==="object"&&BitArrow.publishedURL) {
        $LASTPOS=1011005;//jslker.Parent:11005
        url=BitArrow.publishedURL;
        
      } else {
        $LASTPOS=1011055;//jslker.Parent:11055
        url=window.location.href;
        
      }
      $LASTPOS=1011093;//jslker.Parent:11093
      params = "&url="+url;
      
      $LASTPOS=1011122;//jslker.Parent:11122
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/info"+params);
      
      
      $LASTPOS=1011209;//jslker.Parent:11209
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
      
      
      $LASTPOS=1010937;//jslker.Parent:10937
      if (typeof  BitArrow==="object"&&BitArrow.publishedURL) {
        $LASTPOS=1011005;//jslker.Parent:11005
        url=BitArrow.publishedURL;
        
      } else {
        $LASTPOS=1011055;//jslker.Parent:11055
        url=window.location.href;
        
      }
      $LASTPOS=1011093;//jslker.Parent:11093
      params = "&url="+url;
      
      $LASTPOS=1011122;//jslker.Parent:11122
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/info"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_curProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1011209;//jslker.Parent:11209
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
    },
    onLoadLib :function _trc_Graph_onLoadLib(f) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000421;//jslker.Graph:421
      if (_this.Plotly) {
        $LASTPOS=2000433;//jslker.Graph:433
        f(_this.Plotly);
      } else {
        $LASTPOS=2000454;//jslker.Graph:454
        _this.loadLibHandlers.push(f);
      }
    },
    fiber$onLoadLib :function _trc_Graph_f_onLoadLib(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000421;//jslker.Graph:421
      if (_this.Plotly) {
        $LASTPOS=2000433;//jslker.Graph:433
        f(_this.Plotly);
      } else {
        $LASTPOS=2000454;//jslker.Graph:454
        _this.loadLibHandlers.push(f);
      }
      
      _thread.retVal=_this;return;
    },
    waitLoadLib :function _trc_Graph_waitLoadLib() {
      "use strict";
      var _this=this;
      var f;
      var _it_48;
      
      $LASTPOS=2000505;//jslker.Graph:505
      if (! window.Plotly) {
        $LASTPOS=2000536;//jslker.Graph:536
        window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
        
      } else {
        $LASTPOS=2000596;//jslker.Graph:596
        _this.Plotly=window.Plotly;
        $LASTPOS=2000627;//jslker.Graph:627
        _it_48=Tonyu.iterator(_this.loadLibHandlers,1);
        while(_it_48.next()) {
          f=_it_48[0];
          
          $LASTPOS=2000658;//jslker.Graph:658
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
      var _it_48;
      
      $LASTPOS=2000505;//jslker.Graph:505
      if (! window.Plotly) {
        $LASTPOS=2000536;//jslker.Graph:536
        window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
        
      } else {
        $LASTPOS=2000596;//jslker.Graph:596
        _this.Plotly=window.Plotly;
        $LASTPOS=2000627;//jslker.Graph:627
        _it_48=Tonyu.iterator(_this.loadLibHandlers,1);
        while(_it_48.next()) {
          f=_it_48[0];
          
          $LASTPOS=2000658;//jslker.Graph:658
          f(_this.Plotly);
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    _setCorrelation :function _trc_Graph__setCorrelation(x,y,min,max,interval) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000733;//jslker.Graph:733
      if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
        return _this;
        
      }
      $LASTPOS=2000834;//jslker.Graph:834
      console.log(min,max,interval);
      $LASTPOS=2000870;//jslker.Graph:870
      _this._corObj=_this._correlation(x,y,min,max,interval);
      $LASTPOS=2000924;//jslker.Graph:924
      _this._isDrawCor=true;
    },
    fiber$_setCorrelation :function _trc_Graph_f__setCorrelation(_thread,x,y,min,max,interval) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000733;//jslker.Graph:733
      if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
        _thread.retVal=_this;return;
        
        
      }
      $LASTPOS=2000834;//jslker.Graph:834
      console.log(min,max,interval);
      
      _thread.enter(function _trc_Graph_ent__setCorrelation(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000870;//jslker.Graph:870
            _this.fiber$_correlation(_thread, x, y, min, max, interval);
            __pc=1;return;
          case 1:
            _this._corObj=_thread.retVal;
            
            $LASTPOS=2000924;//jslker.Graph:924
            _this._isDrawCor=true;
            _thread.exit(_this);return;
          }
        }
      });
    },
    setAxisText :function _trc_Graph_setAxisText(x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000982;//jslker.Graph:982
      _this._xaxname=x;
      $LASTPOS=2001004;//jslker.Graph:1004
      _this._yaxname=y;
    },
    fiber$setAxisText :function _trc_Graph_f_setAxisText(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000982;//jslker.Graph:982
      _this._xaxname=x;
      $LASTPOS=2001004;//jslker.Graph:1004
      _this._yaxname=y;
      
      _thread.retVal=_this;return;
    },
    setXAxisText :function _trc_Graph_setXAxisText(x) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001056;//jslker.Graph:1056
      _this._xaxname=x;
    },
    fiber$setXAxisText :function _trc_Graph_f_setXAxisText(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2001056;//jslker.Graph:1056
      _this._xaxname=x;
      
      _thread.retVal=_this;return;
    },
    setYAxisText :function _trc_Graph_setYAxisText(y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001108;//jslker.Graph:1108
      _this._yaxname=y;
    },
    fiber$setYAxisText :function _trc_Graph_f_setYAxisText(_thread,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2001108;//jslker.Graph:1108
      _this._yaxname=y;
      
      _thread.retVal=_this;return;
    },
    setXRange :function _trc_Graph_setXRange(min,max) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001163;//jslker.Graph:1163
      _this._xrange=[min,max];
    },
    fiber$setXRange :function _trc_Graph_f_setXRange(_thread,min,max) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2001163;//jslker.Graph:1163
      _this._xrange=[min,max];
      
      _thread.retVal=_this;return;
    },
    setYRange :function _trc_Graph_setYRange(min,max) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001225;//jslker.Graph:1225
      _this._yrange=[min,max];
    },
    fiber$setYRange :function _trc_Graph_f_setYRange(_thread,min,max) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2001225;//jslker.Graph:1225
      _this._yrange=[min,max];
      
      _thread.retVal=_this;return;
    },
    line :function _trc_Graph_line(xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001286;//jslker.Graph:1286
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
            $LASTPOS=2001286;//jslker.Graph:1286
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
      
      $LASTPOS=2001354;//jslker.Graph:1354
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
            $LASTPOS=2001354;//jslker.Graph:1354
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
      
      $LASTPOS=2001411;//jslker.Graph:1411
      ary = new Array();
      
      $LASTPOS=2001437;//jslker.Graph:1437
      $LASTPOS=2001441;//jslker.Graph:1441
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2001477;//jslker.Graph:1477
          ary.push(_this.src[i][k]);
        }
      }
      $LASTPOS=2001510;//jslker.Graph:1510
      ary.sort((function anonymous_1519(a,b) {
        
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
      
      $LASTPOS=2001411;//jslker.Graph:1411
      ary = new Array();
      
      $LASTPOS=2001437;//jslker.Graph:1437
      $LASTPOS=2001441;//jslker.Graph:1441
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2001477;//jslker.Graph:1477
          ary.push(_this.src[i][k]);
        }
      }
      $LASTPOS=2001510;//jslker.Graph:1510
      ary.sort((function anonymous_1519(a,b) {
        
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
      
      $LASTPOS=2001594;//jslker.Graph:1594
      ary = new Array();
      
      $LASTPOS=2001620;//jslker.Graph:1620
      $LASTPOS=2001624;//jslker.Graph:1624
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2001660;//jslker.Graph:1660
          ary.push(_this.src[i][k]);
        }
      }
      $LASTPOS=2001693;//jslker.Graph:1693
      ary.sort((function anonymous_1702(a,b) {
        
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
      
      $LASTPOS=2001594;//jslker.Graph:1594
      ary = new Array();
      
      $LASTPOS=2001620;//jslker.Graph:1620
      $LASTPOS=2001624;//jslker.Graph:1624
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2001660;//jslker.Graph:1660
          ary.push(_this.src[i][k]);
        }
      }
      $LASTPOS=2001693;//jslker.Graph:1693
      ary.sort((function anonymous_1702(a,b) {
        
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
      
      $LASTPOS=2001778;//jslker.Graph:1778
      half = Math.ceil(_this.src.length/2);
      
      $LASTPOS=2001819;//jslker.Graph:1819
      temp = _this.src.sort((function anonymous_1839(a,b) {
        
        $LASTPOS=2001863;//jslker.Graph:1863
        console.log(a[k],b[k]);
        $LASTPOS=2001896;//jslker.Graph:1896
        if ((a[k]-0)>(b[k]-0)) {
          return - 1;
        }
        $LASTPOS=2001938;//jslker.Graph:1938
        if ((a[k]-0)<(b[k]-0)) {
          return 1;
        }
        return 0;
      }));
      
      $LASTPOS=2002003;//jslker.Graph:2003
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
      
      $LASTPOS=2001778;//jslker.Graph:1778
      half = Math.ceil(_this.src.length/2);
      
      $LASTPOS=2001819;//jslker.Graph:1819
      temp = _this.src.sort((function anonymous_1839(a,b) {
        
        $LASTPOS=2001863;//jslker.Graph:1863
        console.log(a[k],b[k]);
        $LASTPOS=2001896;//jslker.Graph:1896
        if ((a[k]-0)>(b[k]-0)) {
          return - 1;
        }
        $LASTPOS=2001938;//jslker.Graph:1938
        if ((a[k]-0)<(b[k]-0)) {
          return 1;
        }
        return 0;
      }));
      
      $LASTPOS=2002003;//jslker.Graph:2003
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
      
      $LASTPOS=2002146;//jslker.Graph:2146
      counter = {};
      
      $LASTPOS=2002169;//jslker.Graph:2169
      nativeValues = {};
      
      $LASTPOS=2002197;//jslker.Graph:2197
      maxCounter = 0;
      
      $LASTPOS=2002222;//jslker.Graph:2222
      maxValue = null;
      
      $LASTPOS=2002248;//jslker.Graph:2248
      $LASTPOS=2002253;//jslker.Graph:2253
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002296;//jslker.Graph:2296
          if (! counter[_this.src[i][k]]) {
            $LASTPOS=2002336;//jslker.Graph:2336
            counter[_this.src[i][k]]=0;
            
          }
          $LASTPOS=2002380;//jslker.Graph:2380
          counter[_this.src[i][k]]++;
          $LASTPOS=2002411;//jslker.Graph:2411
          nativeValues[_this.src[i][k]]=_this.src[i][k];
        }
      }
      $LASTPOS=2002460;//jslker.Graph:2460
      $LASTPOS=2002465;//jslker.Graph:2465
      j = 0;
      for (; j<Object.keys(counter).length ; j++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002525;//jslker.Graph:2525
          _this.key=Object.keys(counter)[j];
          $LASTPOS=2002565;//jslker.Graph:2565
          if (counter[_this.key]>maxCounter) {
            $LASTPOS=2002611;//jslker.Graph:2611
            maxCounter=counter[_this.key];
            $LASTPOS=2002651;//jslker.Graph:2651
            maxValue=nativeValues[_this.key];
            
          }
        }
      }
      $LASTPOS=2002704;//jslker.Graph:2704
      ret = [];
      
      $LASTPOS=2002721;//jslker.Graph:2721
      $LASTPOS=2002726;//jslker.Graph:2726
      j = 0;
      for (; j<Object.keys(counter).length ; j++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002786;//jslker.Graph:2786
          _this.key=Object.keys(counter)[j];
          $LASTPOS=2002826;//jslker.Graph:2826
          if (counter[_this.key]==maxCounter) {
            $LASTPOS=2002873;//jslker.Graph:2873
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
      
      $LASTPOS=2002146;//jslker.Graph:2146
      counter = {};
      
      $LASTPOS=2002169;//jslker.Graph:2169
      nativeValues = {};
      
      $LASTPOS=2002197;//jslker.Graph:2197
      maxCounter = 0;
      
      $LASTPOS=2002222;//jslker.Graph:2222
      maxValue = null;
      
      $LASTPOS=2002248;//jslker.Graph:2248
      $LASTPOS=2002253;//jslker.Graph:2253
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002296;//jslker.Graph:2296
          if (! counter[_this.src[i][k]]) {
            $LASTPOS=2002336;//jslker.Graph:2336
            counter[_this.src[i][k]]=0;
            
          }
          $LASTPOS=2002380;//jslker.Graph:2380
          counter[_this.src[i][k]]++;
          $LASTPOS=2002411;//jslker.Graph:2411
          nativeValues[_this.src[i][k]]=_this.src[i][k];
        }
      }
      $LASTPOS=2002460;//jslker.Graph:2460
      $LASTPOS=2002465;//jslker.Graph:2465
      j = 0;
      for (; j<Object.keys(counter).length ; j++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002525;//jslker.Graph:2525
          _this.key=Object.keys(counter)[j];
          $LASTPOS=2002565;//jslker.Graph:2565
          if (counter[_this.key]>maxCounter) {
            $LASTPOS=2002611;//jslker.Graph:2611
            maxCounter=counter[_this.key];
            $LASTPOS=2002651;//jslker.Graph:2651
            maxValue=nativeValues[_this.key];
            
          }
        }
      }
      $LASTPOS=2002704;//jslker.Graph:2704
      ret = [];
      
      $LASTPOS=2002721;//jslker.Graph:2721
      $LASTPOS=2002726;//jslker.Graph:2726
      j = 0;
      for (; j<Object.keys(counter).length ; j++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2002786;//jslker.Graph:2786
          _this.key=Object.keys(counter)[j];
          $LASTPOS=2002826;//jslker.Graph:2826
          if (counter[_this.key]==maxCounter) {
            $LASTPOS=2002873;//jslker.Graph:2873
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
      var _it_70;
      
      $LASTPOS=2002991;//jslker.Graph:2991
      ret = [];
      
      $LASTPOS=2003008;//jslker.Graph:3008
      _it_70=Tonyu.iterator(_this.src,1);
      while(_it_70.next()) {
        o=_it_70[0];
        
        $LASTPOS=2003036;//jslker.Graph:3036
        if (ret[o[k]]) {
          $LASTPOS=2003064;//jslker.Graph:3064
          ret[o[k]]++;
          
        } else {
          $LASTPOS=2003106;//jslker.Graph:3106
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
      var _it_70;
      
      $LASTPOS=2002991;//jslker.Graph:2991
      ret = [];
      
      $LASTPOS=2003008;//jslker.Graph:3008
      _it_70=Tonyu.iterator(_this.src,1);
      while(_it_70.next()) {
        o=_it_70[0];
        
        $LASTPOS=2003036;//jslker.Graph:3036
        if (ret[o[k]]) {
          $LASTPOS=2003064;//jslker.Graph:3064
          ret[o[k]]++;
          
        } else {
          $LASTPOS=2003106;//jslker.Graph:3106
          ret[o[k]]=1;
          
        }
        
      }
      _thread.retVal=ret;return;
      
      
      _thread.retVal=_this;return;
    },
    scatter :function _trc_Graph_scatter(xaxis,yaxis,isCor) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2003202;//jslker.Graph:3202
      if (isCor==true) {
        $LASTPOS=2003218;//jslker.Graph:3218
        _this._setCorrelation(xaxis,yaxis,parseFloat(_this.min(xaxis)),parseFloat(_this.max(xaxis)),parseFloat((_this.max(xaxis)-_this.min(xaxis))/10));
      }
      $LASTPOS=2003338;//jslker.Graph:3338
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
            $LASTPOS=2003202;//jslker.Graph:3202
            if (!(isCor==true)) { __pc=2     ; break; }
            $LASTPOS=2003218;//jslker.Graph:3218
            _this.fiber$_setCorrelation(_thread, xaxis, yaxis, parseFloat(_this.min(xaxis)), parseFloat(_this.max(xaxis)), parseFloat((_this.max(xaxis)-_this.min(xaxis))/10));
            __pc=1;return;
          case 1:
            
          case 2     :
            
            $LASTPOS=2003338;//jslker.Graph:3338
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
      
      $LASTPOS=2003409;//jslker.Graph:3409
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
            $LASTPOS=2003409;//jslker.Graph:3409
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
      
      $LASTPOS=2003488;//jslker.Graph:3488
      x = [];
      
      $LASTPOS=2003503;//jslker.Graph:3503
      y = [];
      
      $LASTPOS=2003518;//jslker.Graph:3518
      xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
      
      $LASTPOS=2003732;//jslker.Graph:3732
      yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
      
      $LASTPOS=2003978;//jslker.Graph:3978
      $LASTPOS=2003982;//jslker.Graph:3982
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2004018;//jslker.Graph:4018
          if (xaxis=="time") {
            $LASTPOS=2004050;//jslker.Graph:4050
            xv = _this.src[i][xaxis]*1000;
            
            $LASTPOS=2004090;//jslker.Graph:4090
            xaxopt["type"]='date';
            
          } else {
            $LASTPOS=2004142;//jslker.Graph:4142
            xv = _this.src[i][xaxis];
            
            
          }
          $LASTPOS=2004184;//jslker.Graph:4184
          x.push(xv);
          $LASTPOS=2004205;//jslker.Graph:4205
          y.push(_this.src[i][yaxis]);
        }
      }
      $LASTPOS=2004250;//jslker.Graph:4250
      if (type=="scatter") {
        $LASTPOS=2004280;//jslker.Graph:4280
        mode = "markers";
        
        
      } else {
        $LASTPOS=2004321;//jslker.Graph:4321
        mode = "lines";
        
        
      }
      $LASTPOS=2004351;//jslker.Graph:4351
      data = [{x: x,y: y,type: type,mode: mode}];
      
      $LASTPOS=2004460;//jslker.Graph:4460
      if (_this._isDrawCor===true) {
        $LASTPOS=2004492;//jslker.Graph:4492
        _this._corObj.mode='lines';
        $LASTPOS=2004523;//jslker.Graph:4523
        _this._corObj.line={dash: 'dot',width: 4};
        $LASTPOS=2004567;//jslker.Graph:4567
        data.push(_this._corObj);
        
      }
      $LASTPOS=2004599;//jslker.Graph:4599
      options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
      
      $LASTPOS=2005230;//jslker.Graph:5230
      _this.onLoadLib((function anonymous_5240(Plotly) {
        
        $LASTPOS=2005261;//jslker.Graph:5261
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
      
      $LASTPOS=2003488;//jslker.Graph:3488
      x = [];
      
      $LASTPOS=2003503;//jslker.Graph:3503
      y = [];
      
      $LASTPOS=2003518;//jslker.Graph:3518
      xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
      
      $LASTPOS=2003732;//jslker.Graph:3732
      yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
      
      $LASTPOS=2003978;//jslker.Graph:3978
      $LASTPOS=2003982;//jslker.Graph:3982
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2004018;//jslker.Graph:4018
          if (xaxis=="time") {
            $LASTPOS=2004050;//jslker.Graph:4050
            xv = _this.src[i][xaxis]*1000;
            
            $LASTPOS=2004090;//jslker.Graph:4090
            xaxopt["type"]='date';
            
          } else {
            $LASTPOS=2004142;//jslker.Graph:4142
            xv = _this.src[i][xaxis];
            
            
          }
          $LASTPOS=2004184;//jslker.Graph:4184
          x.push(xv);
          $LASTPOS=2004205;//jslker.Graph:4205
          y.push(_this.src[i][yaxis]);
        }
      }
      $LASTPOS=2004250;//jslker.Graph:4250
      if (type=="scatter") {
        $LASTPOS=2004280;//jslker.Graph:4280
        mode = "markers";
        
        
      } else {
        $LASTPOS=2004321;//jslker.Graph:4321
        mode = "lines";
        
        
      }
      $LASTPOS=2004351;//jslker.Graph:4351
      data = [{x: x,y: y,type: type,mode: mode}];
      
      $LASTPOS=2004460;//jslker.Graph:4460
      if (_this._isDrawCor===true) {
        $LASTPOS=2004492;//jslker.Graph:4492
        _this._corObj.mode='lines';
        $LASTPOS=2004523;//jslker.Graph:4523
        _this._corObj.line={dash: 'dot',width: 4};
        $LASTPOS=2004567;//jslker.Graph:4567
        data.push(_this._corObj);
        
      }
      $LASTPOS=2004599;//jslker.Graph:4599
      options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
      
      
      _thread.enter(function _trc_Graph_ent__drawGraph(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2005230;//jslker.Graph:5230
            _this.fiber$onLoadLib(_thread, (function anonymous_5240(Plotly) {
              
              $LASTPOS=2005261;//jslker.Graph:5261
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
      var _it_84;
      
      $LASTPOS=2005332;//jslker.Graph:5332
      s = 0;
      
      $LASTPOS=2005346;//jslker.Graph:5346
      if (typeof  (k)==="object") {
        $LASTPOS=2005381;//jslker.Graph:5381
        $LASTPOS=2005385;//jslker.Graph:5385
        _this.i=0;for (; _this.i<k.length ; _this.i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=2005419;//jslker.Graph:5419
            s+=k[_this.i]-0;
          }
        }
        
      } else {
        $LASTPOS=2005462;//jslker.Graph:5462
        _it_84=Tonyu.iterator(_this.src,1);
        while(_it_84.next()) {
          o=_it_84[0];
          
          $LASTPOS=2005494;//jslker.Graph:5494
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
      var _it_84;
      
      $LASTPOS=2005332;//jslker.Graph:5332
      s = 0;
      
      $LASTPOS=2005346;//jslker.Graph:5346
      if (typeof  (k)==="object") {
        $LASTPOS=2005381;//jslker.Graph:5381
        $LASTPOS=2005385;//jslker.Graph:5385
        _this.i=0;for (; _this.i<k.length ; _this.i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=2005419;//jslker.Graph:5419
            s+=k[_this.i]-0;
          }
        }
        
      } else {
        $LASTPOS=2005462;//jslker.Graph:5462
        _it_84=Tonyu.iterator(_this.src,1);
        while(_it_84.next()) {
          o=_it_84[0];
          
          $LASTPOS=2005494;//jslker.Graph:5494
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
      
      $LASTPOS=2005565;//jslker.Graph:5565
      a = 0;
      
      $LASTPOS=2005579;//jslker.Graph:5579
      if (typeof  (k)==="object") {
        $LASTPOS=2005614;//jslker.Graph:5614
        a=_this.sum(k)/k.length;
        
      } else {
        $LASTPOS=2005654;//jslker.Graph:5654
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
      
      $LASTPOS=2005565;//jslker.Graph:5565
      a = 0;
      
      $LASTPOS=2005579;//jslker.Graph:5579
      if (typeof  (k)==="object") {
        $LASTPOS=2005614;//jslker.Graph:5614
        a=_this.sum(k)/k.length;
        
      } else {
        $LASTPOS=2005654;//jslker.Graph:5654
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
      var _it_89;
      
      $LASTPOS=2005723;//jslker.Graph:5723
      d = [];
      a = 0;
      
      $LASTPOS=2005742;//jslker.Graph:5742
      if (k===undefined) {
        $LASTPOS=2005770;//jslker.Graph:5770
        a=_this.mean(_this.src);
        $LASTPOS=2005792;//jslker.Graph:5792
        $LASTPOS=2005796;//jslker.Graph:5796
        i = 0;
        for (; i<_this.src.length ; i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=2005836;//jslker.Graph:5836
            d.push(_this.src[i]-a);
          }
        }
        
      } else {
        $LASTPOS=2005886;//jslker.Graph:5886
        a=_this.mean(k);
        $LASTPOS=2005906;//jslker.Graph:5906
        _it_89=Tonyu.iterator(_this.src,1);
        while(_it_89.next()) {
          o=_it_89[0];
          
          $LASTPOS=2005938;//jslker.Graph:5938
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
      var _it_89;
      
      $LASTPOS=2005723;//jslker.Graph:5723
      d = [];
      a = 0;
      
      
      _thread.enter(function _trc_Graph_ent_dev(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2005742;//jslker.Graph:5742
            if (!(k===undefined)) { __pc=2     ; break; }
            $LASTPOS=2005770;//jslker.Graph:5770
            _this.fiber$mean(_thread, _this.src);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            $LASTPOS=2005792;//jslker.Graph:5792
            $LASTPOS=2005796;//jslker.Graph:5796
            i = 0;
            for (; i<_this.src.length ; i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=2005836;//jslker.Graph:5836
                d.push(_this.src[i]-a);
              }
            }
            __pc=4     ;break;
          case 2     :
            $LASTPOS=2005886;//jslker.Graph:5886
            _this.fiber$mean(_thread, k);
            __pc=3;return;
          case 3:
            a=_thread.retVal;
            
            $LASTPOS=2005906;//jslker.Graph:5906
            _it_89=Tonyu.iterator(_this.src,1);
            while(_it_89.next()) {
              o=_it_89[0];
              
              $LASTPOS=2005938;//jslker.Graph:5938
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
      
      $LASTPOS=2006014;//jslker.Graph:6014
      ary = [];
      
      $LASTPOS=2006031;//jslker.Graph:6031
      if (k===undefined) {
        $LASTPOS=2006059;//jslker.Graph:6059
        deved = _this.dev(_this.src);
        
        $LASTPOS=2006088;//jslker.Graph:6088
        $LASTPOS=2006092;//jslker.Graph:6092
        i = 0;
        for (; i<deved.length ; i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=2006134;//jslker.Graph:6134
            ary.push(Math.pow(deved[i],2));
          }
        }
        
      } else {
        $LASTPOS=2006198;//jslker.Graph:6198
        deved = _this.dev(k);
        
        $LASTPOS=2006225;//jslker.Graph:6225
        console.log(deved);
        $LASTPOS=2006254;//jslker.Graph:6254
        $LASTPOS=2006258;//jslker.Graph:6258
        i = 0;
        for (; i<deved.length ; i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=2006300;//jslker.Graph:6300
            ary.push(Math.pow(deved[i],2));
          }
        }
        
      }
      $LASTPOS=2006355;//jslker.Graph:6355
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
      
      $LASTPOS=2006014;//jslker.Graph:6014
      ary = [];
      
      
      _thread.enter(function _trc_Graph_ent_vari(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2006031;//jslker.Graph:6031
            if (!(k===undefined)) { __pc=2     ; break; }
            $LASTPOS=2006059;//jslker.Graph:6059
            _this.fiber$dev(_thread, _this.src);
            __pc=1;return;
          case 1:
            deved=_thread.retVal;
            
            $LASTPOS=2006088;//jslker.Graph:6088
            $LASTPOS=2006092;//jslker.Graph:6092
            i = 0;
            for (; i<deved.length ; i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=2006134;//jslker.Graph:6134
                ary.push(Math.pow(deved[i],2));
              }
            }
            __pc=4     ;break;
          case 2     :
            $LASTPOS=2006198;//jslker.Graph:6198
            _this.fiber$dev(_thread, k);
            __pc=3;return;
          case 3:
            deved=_thread.retVal;
            
            $LASTPOS=2006225;//jslker.Graph:6225
            console.log(deved);
            $LASTPOS=2006254;//jslker.Graph:6254
            $LASTPOS=2006258;//jslker.Graph:6258
            i = 0;
            for (; i<deved.length ; i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=2006300;//jslker.Graph:6300
                ary.push(Math.pow(deved[i],2));
              }
            }
          case 4     :
            
            $LASTPOS=2006355;//jslker.Graph:6355
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
      
      $LASTPOS=2006430;//jslker.Graph:6430
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
            $LASTPOS=2006430;//jslker.Graph:6430
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
      var _it_99;
      
      $LASTPOS=2006507;//jslker.Graph:6507
      dev1 = _this.dev(k1);
      
      $LASTPOS=2006530;//jslker.Graph:6530
      dev2 = _this.dev(k2);
      
      $LASTPOS=2006553;//jslker.Graph:6553
      dataCov = 0;
      
      $LASTPOS=2006573;//jslker.Graph:6573
      _it_99=Tonyu.iterator(dev1,2);
      while(_it_99.next()) {
        k=_it_99[0];
        v=_it_99[1];
        
        $LASTPOS=2006604;//jslker.Graph:6604
        dataCov+=dev1[k]*dev2[k];
        
      }
      $LASTPOS=2006642;//jslker.Graph:6642
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
      var _it_99;
      
      
      _thread.enter(function _trc_Graph_ent_cov(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2006507;//jslker.Graph:6507
            _this.fiber$dev(_thread, k1);
            __pc=1;return;
          case 1:
            dev1=_thread.retVal;
            
            $LASTPOS=2006530;//jslker.Graph:6530
            _this.fiber$dev(_thread, k2);
            __pc=2;return;
          case 2:
            dev2=_thread.retVal;
            
            $LASTPOS=2006553;//jslker.Graph:6553
            dataCov = 0;
            
            $LASTPOS=2006573;//jslker.Graph:6573
            _it_99=Tonyu.iterator(dev1,2);
            while(_it_99.next()) {
              k=_it_99[0];
              v=_it_99[1];
              
              $LASTPOS=2006604;//jslker.Graph:6604
              dataCov+=dev1[k]*dev2[k];
              
            }
            $LASTPOS=2006642;//jslker.Graph:6642
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
      
      $LASTPOS=2006727;//jslker.Graph:6727
      cov1 = _this.cov(k1,k2);
      
      $LASTPOS=2006753;//jslker.Graph:6753
      std1 = _this.std(k1);
      
      $LASTPOS=2006776;//jslker.Graph:6776
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
            $LASTPOS=2006727;//jslker.Graph:6727
            _this.fiber$cov(_thread, k1, k2);
            __pc=1;return;
          case 1:
            cov1=_thread.retVal;
            
            $LASTPOS=2006753;//jslker.Graph:6753
            _this.fiber$std(_thread, k1);
            __pc=2;return;
          case 2:
            std1=_thread.retVal;
            
            $LASTPOS=2006776;//jslker.Graph:6776
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
      
      $LASTPOS=2006882;//jslker.Graph:6882
      a = _this.corrcoef(d1,d2)*(_this.std(d2)/_this.std(d1));
      
      $LASTPOS=2006928;//jslker.Graph:6928
      b = _this.mean(d2)-(a*_this.mean(d1));
      
      $LASTPOS=2006962;//jslker.Graph:6962
      x = [];
      
      $LASTPOS=2006977;//jslker.Graph:6977
      y = [];
      
      $LASTPOS=2006992;//jslker.Graph:6992
      $LASTPOS=2006996;//jslker.Graph:6996
      i = min;
      for (; i<=max+1 ; i=i+interval) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2007039;//jslker.Graph:7039
          console.log(i);
          $LASTPOS=2007064;//jslker.Graph:7064
          x.push(i);
          $LASTPOS=2007084;//jslker.Graph:7084
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
      
      $LASTPOS=2006882;//jslker.Graph:6882
      a = _this.corrcoef(d1,d2)*(_this.std(d2)/_this.std(d1));
      
      $LASTPOS=2006928;//jslker.Graph:6928
      b = _this.mean(d2)-(a*_this.mean(d1));
      
      $LASTPOS=2006962;//jslker.Graph:6962
      x = [];
      
      $LASTPOS=2006977;//jslker.Graph:6977
      y = [];
      
      $LASTPOS=2006992;//jslker.Graph:6992
      $LASTPOS=2006996;//jslker.Graph:6996
      i = min;
      for (; i<=max+1 ; i=i+interval) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2007039;//jslker.Graph:7039
          console.log(i);
          $LASTPOS=2007064;//jslker.Graph:7064
          x.push(i);
          $LASTPOS=2007084;//jslker.Graph:7084
          y.push(a*i+b);
        }
      }
      _thread.retVal={x: x,y: y};return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"onLoadLib":{"nowait":false},"waitLoadLib":{"nowait":false},"_setCorrelation":{"nowait":false},"setAxisText":{"nowait":false},"setXAxisText":{"nowait":false},"setYAxisText":{"nowait":false},"setXRange":{"nowait":false},"setYRange":{"nowait":false},"line":{"nowait":false},"bar":{"nowait":false},"min":{"nowait":false},"max":{"nowait":false},"med":{"nowait":false},"mode":{"nowait":false},"freq":{"nowait":false},"scatter":{"nowait":false},"pie":{"nowait":false},"_drawGraph":{"nowait":false},"sum":{"nowait":false},"mean":{"nowait":false},"dev":{"nowait":false},"vari":{"nowait":false},"std":{"nowait":false},"cov":{"nowait":false},"corrcoef":{"nowait":false},"_correlation":{"nowait":false}},"fields":{"plotlyURL":{},"loadLibHandlers":{},"Plotly":{},"src":{},"key":{},"_xrange":{},"_yrange":{},"_isDrawCor":{},"_corObj":{},"_yaxname":{},"_xaxname":{},"_place":{},"i":{}}}
});

//# sourceMappingURL=concat.js.map