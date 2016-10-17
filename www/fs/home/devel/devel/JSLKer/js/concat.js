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
    addText :function _trc_Parent_addText(elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000647;//jslker.Parent:647
      $("[name="+elem+"]").append(val);
    },
    fiber$addText :function _trc_Parent_f_addText(_thread,elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000647;//jslker.Parent:647
      $("[name="+elem+"]").append(val);
      
      _thread.retVal=_this;return;
    },
    setText :function _trc_Parent_setText(elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000762;//jslker.Parent:762
      $("[name="+elem+"]").text(val);
    },
    fiber$setText :function _trc_Parent_f_setText(_thread,elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000762;//jslker.Parent:762
      $("[name="+elem+"]").text(val);
      
      _thread.retVal=_this;return;
    },
    onClick :function _trc_Parent_onClick(elem,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var usepara;
      var fname;
      
      $LASTPOS=1000824;//jslker.Parent:824
      usepara;fname;
      $LASTPOS=1000848;//jslker.Parent:848
      if (typeof  func=='function') {
        $LASTPOS=1000888;//jslker.Parent:888
        if (func.methodInfo) {
          $LASTPOS=1000924;//jslker.Parent:924
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1000998;//jslker.Parent:998
        fname=func+"";
        
      }
      $LASTPOS=1001025;//jslker.Parent:1025
      if (typeof  fname=="string") {
        $LASTPOS=1001064;//jslker.Parent:1064
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1001131;//jslker.Parent:1131
        if (_this["fiber$"+fname]) {
          $LASTPOS=1001172;//jslker.Parent:1172
          usepara=true;
          
        }
        
      }
      $LASTPOS=1001209;//jslker.Parent:1209
      if (usepara) {
        $LASTPOS=1001233;//jslker.Parent:1233
        $("[name="+elem+"]").click(_this.catchException((function anonymous_1275() {
          
          $LASTPOS=1001292;//jslker.Parent:1292
          _this.parallel(fname);
        })));
        
      } else {
        $LASTPOS=1001406;//jslker.Parent:1406
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
      
      $LASTPOS=1000824;//jslker.Parent:824
      usepara;fname;
      $LASTPOS=1000848;//jslker.Parent:848
      if (typeof  func=='function') {
        $LASTPOS=1000888;//jslker.Parent:888
        if (func.methodInfo) {
          $LASTPOS=1000924;//jslker.Parent:924
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1000998;//jslker.Parent:998
        fname=func+"";
        
      }
      $LASTPOS=1001025;//jslker.Parent:1025
      if (typeof  fname=="string") {
        $LASTPOS=1001064;//jslker.Parent:1064
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1001131;//jslker.Parent:1131
        if (_this["fiber$"+fname]) {
          $LASTPOS=1001172;//jslker.Parent:1172
          usepara=true;
          
        }
        
      }
      
      _thread.enter(function _trc_Parent_ent_onClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001209;//jslker.Parent:1209
            if (!(usepara)) { __pc=1; break; }
            $LASTPOS=1001233;//jslker.Parent:1233
            $("[name="+elem+"]").click(_this.catchException((function anonymous_1275() {
              
              $LASTPOS=1001292;//jslker.Parent:1292
              _this.parallel(fname);
            })));
            __pc=2;break;
          case 1:
            {
              $LASTPOS=1001406;//jslker.Parent:1406
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
      
      $LASTPOS=1001488;//jslker.Parent:1488
      if (typeof  func=="function") {
        $LASTPOS=1001526;//jslker.Parent:1526
        $("body").on("touchstart",(function anonymous_1552(e) {
          
          $LASTPOS=1001578;//jslker.Parent:1578
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1001709;//jslker.Parent:1709
        $("body").on("touchmove",(function anonymous_1734(e) {
          
          $LASTPOS=1001760;//jslker.Parent:1760
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1001890;//jslker.Parent:1890
        $("body").on("touchend",(function anonymous_1914(e) {
          
          $LASTPOS=1001940;//jslker.Parent:1940
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1002069;//jslker.Parent:2069
        $("body").on("mousedown",(function anonymous_2094(e) {
          
          $LASTPOS=1002120;//jslker.Parent:2120
          _this.down=true;
          $LASTPOS=1002144;//jslker.Parent:2144
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1002197;//jslker.Parent:2197
        $("body").on("mousemove",(function anonymous_2222(e) {
          
          $LASTPOS=1002248;//jslker.Parent:2248
          if (_this.down) {
            $LASTPOS=1002257;//jslker.Parent:2257
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1002309;//jslker.Parent:2309
        $("body").on("mouseup",(function anonymous_2332(e) {
          
          $LASTPOS=1002358;//jslker.Parent:2358
          _this.down=false;
          $LASTPOS=1002383;//jslker.Parent:2383
          func(e.pageX,e.pageY,"end");
        }));
        
      }
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001488;//jslker.Parent:1488
      if (typeof  func=="function") {
        $LASTPOS=1001526;//jslker.Parent:1526
        $("body").on("touchstart",(function anonymous_1552(e) {
          
          $LASTPOS=1001578;//jslker.Parent:1578
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1001709;//jslker.Parent:1709
        $("body").on("touchmove",(function anonymous_1734(e) {
          
          $LASTPOS=1001760;//jslker.Parent:1760
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1001890;//jslker.Parent:1890
        $("body").on("touchend",(function anonymous_1914(e) {
          
          $LASTPOS=1001940;//jslker.Parent:1940
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1002069;//jslker.Parent:2069
        $("body").on("mousedown",(function anonymous_2094(e) {
          
          $LASTPOS=1002120;//jslker.Parent:2120
          _this.down=true;
          $LASTPOS=1002144;//jslker.Parent:2144
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1002197;//jslker.Parent:2197
        $("body").on("mousemove",(function anonymous_2222(e) {
          
          $LASTPOS=1002248;//jslker.Parent:2248
          if (_this.down) {
            $LASTPOS=1002257;//jslker.Parent:2257
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1002309;//jslker.Parent:2309
        $("body").on("mouseup",(function anonymous_2332(e) {
          
          $LASTPOS=1002358;//jslker.Parent:2358
          _this.down=false;
          $LASTPOS=1002383;//jslker.Parent:2383
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002510;//jslker.Parent:2510
      _this._canvas=$("[name="+canv+"]")[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002510;//jslker.Parent:2510
      _this._canvas=$("[name="+canv+"]")[0];
      
      _thread.retVal=_this;return;
    },
    searchCanvas :function _trc_Parent_searchCanvas() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002569;//jslker.Parent:2569
      if (! _this._canvas) {
        return _this._canvas=$(_this.canvas)[0];
        
      } else {
        return _this._canvas;
        
      }
    },
    fiber$searchCanvas :function _trc_Parent_f_searchCanvas(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002569;//jslker.Parent:2569
      if (! _this._canvas) {
        _thread.retVal=_this._canvas=$(_this.canvas)[0];return;
        
        
      } else {
        _thread.retVal=_this._canvas;return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    setColor :function _trc_Parent_setColor(r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002692;//jslker.Parent:2692
      if (_this.searchCanvas()) {
        $LASTPOS=1002721;//jslker.Parent:2721
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002760;//jslker.Parent:2760
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1002809;//jslker.Parent:2809
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002692;//jslker.Parent:2692
      if (_this.searchCanvas()) {
        $LASTPOS=1002721;//jslker.Parent:2721
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002760;//jslker.Parent:2760
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1002809;//jslker.Parent:2809
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002887;//jslker.Parent:2887
      if (_this.searchCanvas()) {
        $LASTPOS=1002916;//jslker.Parent:2916
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002955;//jslker.Parent:2955
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002887;//jslker.Parent:2887
      if (_this.searchCanvas()) {
        $LASTPOS=1002916;//jslker.Parent:2916
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002955;//jslker.Parent:2955
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    getNumber :function _trc_Parent_getNumber(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003066;//jslker.Parent:3066
      _this.val=$("[name="+elem+"]").val();
      return _this.val-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003066;//jslker.Parent:3066
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003196;//jslker.Parent:3196
      _this.val=$("[name="+elem+"]").val();
      return _this.val;
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003196;//jslker.Parent:3196
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val;return;
      
      
      _thread.retVal=_this;return;
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003334;//jslker.Parent:3334
      $("[name="+elem+"]").text(num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003334;//jslker.Parent:3334
      $("[name="+elem+"]").text(num);
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003404;//jslker.Parent:3404
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1003448;//jslker.Parent:3448
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1003494;//jslker.Parent:3494
      $("[name="+elem+"]").attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003404;//jslker.Parent:3404
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1003448;//jslker.Parent:3448
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1003494;//jslker.Parent:3494
      $("[name="+elem+"]").attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003563;//jslker.Parent:3563
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003563;//jslker.Parent:3563
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003688;//jslker.Parent:3688
      console.log(scaleX,scaleY);
      $LASTPOS=1003721;//jslker.Parent:3721
      if (! scaleX) {
        $LASTPOS=1003743;//jslker.Parent:3743
        scaleX=1;
        $LASTPOS=1003762;//jslker.Parent:3762
        scaleY=1;
        
      } else {
        $LASTPOS=1003783;//jslker.Parent:3783
        if (! scaleY) {
          $LASTPOS=1003805;//jslker.Parent:3805
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1003832;//jslker.Parent:3832
      console.log(scaleX,scaleY);
      $LASTPOS=1003865;//jslker.Parent:3865
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003688;//jslker.Parent:3688
      console.log(scaleX,scaleY);
      $LASTPOS=1003721;//jslker.Parent:3721
      if (! scaleX) {
        $LASTPOS=1003743;//jslker.Parent:3743
        scaleX=1;
        $LASTPOS=1003762;//jslker.Parent:3762
        scaleY=1;
        
      } else {
        $LASTPOS=1003783;//jslker.Parent:3783
        if (! scaleY) {
          $LASTPOS=1003805;//jslker.Parent:3805
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1003832;//jslker.Parent:3832
      console.log(scaleX,scaleY);
      $LASTPOS=1003865;//jslker.Parent:3865
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004032;//jslker.Parent:4032
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004032;//jslker.Parent:4032
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004168;//jslker.Parent:4168
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004168;//jslker.Parent:4168
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1004299;//jslker.Parent:4299
      time=time||100;
      $LASTPOS=1004320;//jslker.Parent:4320
      t = null;
      $LASTPOS=1004340;//jslker.Parent:4340
      t.suspend();
      $LASTPOS=1004358;//jslker.Parent:4358
      setTimeout(_this.catchException((function anonymous_4384() {
        
        $LASTPOS=1004398;//jslker.Parent:4398
        t.steps();
      })),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1004299;//jslker.Parent:4299
      time=time||100;
      $LASTPOS=1004320;//jslker.Parent:4320
      t = _thread;
      $LASTPOS=1004340;//jslker.Parent:4340
      t.suspend();
      $LASTPOS=1004358;//jslker.Parent:4358
      setTimeout(_this.catchException((function anonymous_4384() {
        
        $LASTPOS=1004398;//jslker.Parent:4398
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
      
      $LASTPOS=1004509;//jslker.Parent:4509
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004509;//jslker.Parent:4509
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      $LASTPOS=1004582;//jslker.Parent:4582
      e = _this.document.createElement(elem);
      $LASTPOS=1004624;//jslker.Parent:4624
      e.setAttribute("name",n);
      $LASTPOS=1004656;//jslker.Parent:4656
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1004582;//jslker.Parent:4582
      e = _this.document.createElement(elem);
      $LASTPOS=1004624;//jslker.Parent:4624
      e.setAttribute("name",n);
      $LASTPOS=1004656;//jslker.Parent:4656
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004715;//jslker.Parent:4715
      if (_this.searchCanvas()) {
        $LASTPOS=1004744;//jslker.Parent:4744
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004783;//jslker.Parent:4783
        _this.ctx.save();
        $LASTPOS=1004804;//jslker.Parent:4804
        _this.ctx.beginPath();
        $LASTPOS=1004830;//jslker.Parent:4830
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1004867;//jslker.Parent:4867
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1004897;//jslker.Parent:4897
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1004949;//jslker.Parent:4949
        _this.ctx.fill();
        $LASTPOS=1004970;//jslker.Parent:4970
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004715;//jslker.Parent:4715
      if (_this.searchCanvas()) {
        $LASTPOS=1004744;//jslker.Parent:4744
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004783;//jslker.Parent:4783
        _this.ctx.save();
        $LASTPOS=1004804;//jslker.Parent:4804
        _this.ctx.beginPath();
        $LASTPOS=1004830;//jslker.Parent:4830
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1004867;//jslker.Parent:4867
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1004897;//jslker.Parent:4897
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1004949;//jslker.Parent:4949
        _this.ctx.fill();
        $LASTPOS=1004970;//jslker.Parent:4970
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005025;//jslker.Parent:5025
      if (_this.searchCanvas()) {
        $LASTPOS=1005054;//jslker.Parent:5054
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005093;//jslker.Parent:5093
        _this.ctx.beginPath();
        $LASTPOS=1005119;//jslker.Parent:5119
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005147;//jslker.Parent:5147
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005175;//jslker.Parent:5175
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005025;//jslker.Parent:5025
      if (_this.searchCanvas()) {
        $LASTPOS=1005054;//jslker.Parent:5054
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005093;//jslker.Parent:5093
        _this.ctx.beginPath();
        $LASTPOS=1005119;//jslker.Parent:5119
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005147;//jslker.Parent:5147
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005175;//jslker.Parent:5175
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005226;//jslker.Parent:5226
      if (_this.searchCanvas()) {
        $LASTPOS=1005255;//jslker.Parent:5255
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005294;//jslker.Parent:5294
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005226;//jslker.Parent:5226
      if (_this.searchCanvas()) {
        $LASTPOS=1005255;//jslker.Parent:5255
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005294;//jslker.Parent:5294
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005352;//jslker.Parent:5352
      if (_this.searchCanvas()) {
        $LASTPOS=1005381;//jslker.Parent:5381
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005420;//jslker.Parent:5420
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005352;//jslker.Parent:5352
      if (_this.searchCanvas()) {
        $LASTPOS=1005381;//jslker.Parent:5381
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005420;//jslker.Parent:5420
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005483;//jslker.Parent:5483
      _this.keyData=[];
      $LASTPOS=1005500;//jslker.Parent:5500
      _this.document.onkeydown=(function anonymous_5521(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1005544;//jslker.Parent:5544
        if (! e) {
          $LASTPOS=1005551;//jslker.Parent:5551
          e=window.event;
        }
        $LASTPOS=1005578;//jslker.Parent:5578
        key_code = e.keyCode;
        $LASTPOS=1005613;//jslker.Parent:5613
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1005682;//jslker.Parent:5682
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1005751;//jslker.Parent:5751
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1005789;//jslker.Parent:5789
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1005855;//jslker.Parent:5855
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1005892;//jslker.Parent:5892
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1005955;//jslker.Parent:5955
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1005991;//jslker.Parent:5991
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1006053;//jslker.Parent:6053
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1006086;//jslker.Parent:6086
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1006144;//jslker.Parent:6144
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1006175;//jslker.Parent:6175
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1006239;//jslker.Parent:6239
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1006273;//jslker.Parent:6273
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1006335;//jslker.Parent:6335
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1006368;//jslker.Parent:6368
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1006414;//jslker.Parent:6414
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
      $LASTPOS=1006579;//jslker.Parent:6579
      _this.document.onkeyup=(function anonymous_6598(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006621;//jslker.Parent:6621
        if (! e) {
          $LASTPOS=1006628;//jslker.Parent:6628
          e=window.event;
        }
        $LASTPOS=1006655;//jslker.Parent:6655
        key_code = e.keyCode;
        $LASTPOS=1006690;//jslker.Parent:6690
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1006759;//jslker.Parent:6759
        if (e.keyCode==16) {
          $LASTPOS=1006777;//jslker.Parent:6777
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1006815;//jslker.Parent:6815
          if (e.keyCode==17) {
            $LASTPOS=1006833;//jslker.Parent:6833
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1006870;//jslker.Parent:6870
            if (e.keyCode==18) {
              $LASTPOS=1006888;//jslker.Parent:6888
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1006924;//jslker.Parent:6924
              if (e.keyCode==37) {
                $LASTPOS=1006942;//jslker.Parent:6942
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1006975;//jslker.Parent:6975
                if (e.keyCode==38) {
                  $LASTPOS=1006993;//jslker.Parent:6993
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1007024;//jslker.Parent:7024
                  if (e.keyCode==39) {
                    $LASTPOS=1007042;//jslker.Parent:7042
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1007076;//jslker.Parent:7076
                    if (e.keyCode==40) {
                      $LASTPOS=1007094;//jslker.Parent:7094
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1007127;//jslker.Parent:7127
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
      
      $LASTPOS=1007651;//jslker.Parent:7651
      a = Array.prototype.slice.call(arguments);
      $LASTPOS=1007701;//jslker.Parent:7701
      methodName = a.shift();
      $LASTPOS=1007732;//jslker.Parent:7732
      t = Tonyu.thread();
      $LASTPOS=1007759;//jslker.Parent:7759
      t.apply(_this,methodName,a);
      $LASTPOS=1007792;//jslker.Parent:7792
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
      
      $LASTPOS=1007651;//jslker.Parent:7651
      a = Array.prototype.slice.call(_arguments);
      $LASTPOS=1007701;//jslker.Parent:7701
      methodName = a.shift();
      $LASTPOS=1007732;//jslker.Parent:7732
      t = Tonyu.thread();
      $LASTPOS=1007759;//jslker.Parent:7759
      t.apply(_this,methodName,a);
      $LASTPOS=1007792;//jslker.Parent:7792
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var clicked;
      var _func;
      
      $LASTPOS=1007830;//jslker.Parent:7830
      clicked = 0;
      $LASTPOS=1007850;//jslker.Parent:7850
      _func = (function anonymous_7860() {
        
        $LASTPOS=1007881;//jslker.Parent:7881
        clicked=1;
      });
      $LASTPOS=1007905;//jslker.Parent:7905
      _this.onClick(elem,_func);
      $LASTPOS=1007931;//jslker.Parent:7931
      while (clicked==0) {
        $LASTPOS=1007959;//jslker.Parent:7959
        _this.wait(10);
        
      }
      $LASTPOS=1007981;//jslker.Parent:7981
      $("[name="+elem+"]").off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=1007830;//jslker.Parent:7830
      clicked = 0;
      $LASTPOS=1007850;//jslker.Parent:7850
      _func = (function anonymous_7860() {
        
        $LASTPOS=1007881;//jslker.Parent:7881
        clicked=1;
      });
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1007905;//jslker.Parent:7905
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1007931;//jslker.Parent:7931
          case 2:
            if (!(clicked==0)) { __pc=4; break; }
            $LASTPOS=1007959;//jslker.Parent:7959
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            $LASTPOS=1007981;//jslker.Parent:7981
            $("[name="+elem+"]").off("click","",_func);
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"setInterval":{"nowait":false},"setTimeout":{"nowait":false},"catchException":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"searchCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"new":{"nowait":false},"getkey":{"nowait":false},"dist":{"nowait":false},"angle":{"nowait":false},"rad":{"nowait":true},"deg":{"nowait":true},"sqrt":{"nowait":false},"sin":{"nowait":false},"cos":{"nowait":false},"tan":{"nowait":false},"parallel":{"nowait":false},"waitClick":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map