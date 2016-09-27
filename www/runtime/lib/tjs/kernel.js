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
      $("[name="+elem+"]").attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003404;//jslker.Parent:3404
      $("[name="+elem+"]").attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003473;//jslker.Parent:3473
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003473;//jslker.Parent:3473
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003598;//jslker.Parent:3598
      console.log(scaleX,scaleY);
      $LASTPOS=1003631;//jslker.Parent:3631
      if (! scaleX) {
        $LASTPOS=1003653;//jslker.Parent:3653
        scaleX=1;
        $LASTPOS=1003672;//jslker.Parent:3672
        scaleY=1;
        
      } else {
        $LASTPOS=1003693;//jslker.Parent:3693
        if (! scaleY) {
          $LASTPOS=1003715;//jslker.Parent:3715
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1003742;//jslker.Parent:3742
      console.log(scaleX,scaleY);
      $LASTPOS=1003775;//jslker.Parent:3775
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003598;//jslker.Parent:3598
      console.log(scaleX,scaleY);
      $LASTPOS=1003631;//jslker.Parent:3631
      if (! scaleX) {
        $LASTPOS=1003653;//jslker.Parent:3653
        scaleX=1;
        $LASTPOS=1003672;//jslker.Parent:3672
        scaleY=1;
        
      } else {
        $LASTPOS=1003693;//jslker.Parent:3693
        if (! scaleY) {
          $LASTPOS=1003715;//jslker.Parent:3715
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1003742;//jslker.Parent:3742
      console.log(scaleX,scaleY);
      $LASTPOS=1003775;//jslker.Parent:3775
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003942;//jslker.Parent:3942
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003942;//jslker.Parent:3942
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004078;//jslker.Parent:4078
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004078;//jslker.Parent:4078
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1004209;//jslker.Parent:4209
      time=time||100;
      $LASTPOS=1004230;//jslker.Parent:4230
      t = null;
      $LASTPOS=1004250;//jslker.Parent:4250
      t.suspend();
      $LASTPOS=1004268;//jslker.Parent:4268
      setTimeout(_this.catchException((function anonymous_4294() {
        
        $LASTPOS=1004308;//jslker.Parent:4308
        t.steps();
      })),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1004209;//jslker.Parent:4209
      time=time||100;
      $LASTPOS=1004230;//jslker.Parent:4230
      t = _thread;
      $LASTPOS=1004250;//jslker.Parent:4250
      t.suspend();
      $LASTPOS=1004268;//jslker.Parent:4268
      setTimeout(_this.catchException((function anonymous_4294() {
        
        $LASTPOS=1004308;//jslker.Parent:4308
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
      
      $LASTPOS=1004419;//jslker.Parent:4419
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004419;//jslker.Parent:4419
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      $LASTPOS=1004492;//jslker.Parent:4492
      e = _this.document.createElement(elem);
      $LASTPOS=1004534;//jslker.Parent:4534
      e.setAttribute("name",n);
      $LASTPOS=1004566;//jslker.Parent:4566
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1004492;//jslker.Parent:4492
      e = _this.document.createElement(elem);
      $LASTPOS=1004534;//jslker.Parent:4534
      e.setAttribute("name",n);
      $LASTPOS=1004566;//jslker.Parent:4566
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004625;//jslker.Parent:4625
      if (_this.searchCanvas()) {
        $LASTPOS=1004654;//jslker.Parent:4654
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004693;//jslker.Parent:4693
        _this.ctx.save();
        $LASTPOS=1004714;//jslker.Parent:4714
        _this.ctx.beginPath();
        $LASTPOS=1004740;//jslker.Parent:4740
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1004777;//jslker.Parent:4777
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1004807;//jslker.Parent:4807
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1004859;//jslker.Parent:4859
        _this.ctx.fill();
        $LASTPOS=1004880;//jslker.Parent:4880
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004625;//jslker.Parent:4625
      if (_this.searchCanvas()) {
        $LASTPOS=1004654;//jslker.Parent:4654
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004693;//jslker.Parent:4693
        _this.ctx.save();
        $LASTPOS=1004714;//jslker.Parent:4714
        _this.ctx.beginPath();
        $LASTPOS=1004740;//jslker.Parent:4740
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1004777;//jslker.Parent:4777
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1004807;//jslker.Parent:4807
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1004859;//jslker.Parent:4859
        _this.ctx.fill();
        $LASTPOS=1004880;//jslker.Parent:4880
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004935;//jslker.Parent:4935
      if (_this.searchCanvas()) {
        $LASTPOS=1004964;//jslker.Parent:4964
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005003;//jslker.Parent:5003
        _this.ctx.beginPath();
        $LASTPOS=1005029;//jslker.Parent:5029
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005057;//jslker.Parent:5057
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005085;//jslker.Parent:5085
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004935;//jslker.Parent:4935
      if (_this.searchCanvas()) {
        $LASTPOS=1004964;//jslker.Parent:4964
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005003;//jslker.Parent:5003
        _this.ctx.beginPath();
        $LASTPOS=1005029;//jslker.Parent:5029
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005057;//jslker.Parent:5057
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005085;//jslker.Parent:5085
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005136;//jslker.Parent:5136
      if (_this.searchCanvas()) {
        $LASTPOS=1005165;//jslker.Parent:5165
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005204;//jslker.Parent:5204
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005136;//jslker.Parent:5136
      if (_this.searchCanvas()) {
        $LASTPOS=1005165;//jslker.Parent:5165
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005204;//jslker.Parent:5204
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005262;//jslker.Parent:5262
      if (_this.searchCanvas()) {
        $LASTPOS=1005291;//jslker.Parent:5291
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005330;//jslker.Parent:5330
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005262;//jslker.Parent:5262
      if (_this.searchCanvas()) {
        $LASTPOS=1005291;//jslker.Parent:5291
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005330;//jslker.Parent:5330
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005393;//jslker.Parent:5393
      _this.keyData=[];
      $LASTPOS=1005410;//jslker.Parent:5410
      _this.document.onkeydown=(function anonymous_5431(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1005454;//jslker.Parent:5454
        if (! e) {
          $LASTPOS=1005461;//jslker.Parent:5461
          e=window.event;
        }
        $LASTPOS=1005488;//jslker.Parent:5488
        key_code = e.keyCode;
        $LASTPOS=1005523;//jslker.Parent:5523
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1005592;//jslker.Parent:5592
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1005661;//jslker.Parent:5661
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1005699;//jslker.Parent:5699
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1005765;//jslker.Parent:5765
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1005802;//jslker.Parent:5802
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1005865;//jslker.Parent:5865
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1005901;//jslker.Parent:5901
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1005963;//jslker.Parent:5963
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1005996;//jslker.Parent:5996
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1006054;//jslker.Parent:6054
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1006085;//jslker.Parent:6085
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1006149;//jslker.Parent:6149
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1006183;//jslker.Parent:6183
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1006245;//jslker.Parent:6245
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1006278;//jslker.Parent:6278
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1006324;//jslker.Parent:6324
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
      $LASTPOS=1006489;//jslker.Parent:6489
      _this.document.onkeyup=(function anonymous_6508(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006531;//jslker.Parent:6531
        if (! e) {
          $LASTPOS=1006538;//jslker.Parent:6538
          e=window.event;
        }
        $LASTPOS=1006565;//jslker.Parent:6565
        key_code = e.keyCode;
        $LASTPOS=1006600;//jslker.Parent:6600
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1006669;//jslker.Parent:6669
        if (e.keyCode==16) {
          $LASTPOS=1006687;//jslker.Parent:6687
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1006725;//jslker.Parent:6725
          if (e.keyCode==17) {
            $LASTPOS=1006743;//jslker.Parent:6743
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1006780;//jslker.Parent:6780
            if (e.keyCode==18) {
              $LASTPOS=1006798;//jslker.Parent:6798
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1006834;//jslker.Parent:6834
              if (e.keyCode==37) {
                $LASTPOS=1006852;//jslker.Parent:6852
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1006885;//jslker.Parent:6885
                if (e.keyCode==38) {
                  $LASTPOS=1006903;//jslker.Parent:6903
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1006934;//jslker.Parent:6934
                  if (e.keyCode==39) {
                    $LASTPOS=1006952;//jslker.Parent:6952
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1006986;//jslker.Parent:6986
                    if (e.keyCode==40) {
                      $LASTPOS=1007004;//jslker.Parent:7004
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1007037;//jslker.Parent:7037
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
      
      $LASTPOS=1007561;//jslker.Parent:7561
      a = Array.prototype.slice.call(arguments);
      $LASTPOS=1007611;//jslker.Parent:7611
      methodName = a.shift();
      $LASTPOS=1007642;//jslker.Parent:7642
      t = Tonyu.thread();
      $LASTPOS=1007669;//jslker.Parent:7669
      t.apply(_this,methodName,a);
      $LASTPOS=1007702;//jslker.Parent:7702
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
      
      $LASTPOS=1007561;//jslker.Parent:7561
      a = Array.prototype.slice.call(_arguments);
      $LASTPOS=1007611;//jslker.Parent:7611
      methodName = a.shift();
      $LASTPOS=1007642;//jslker.Parent:7642
      t = Tonyu.thread();
      $LASTPOS=1007669;//jslker.Parent:7669
      t.apply(_this,methodName,a);
      $LASTPOS=1007702;//jslker.Parent:7702
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var clicked;
      var _func;
      
      $LASTPOS=1007740;//jslker.Parent:7740
      clicked = 0;
      $LASTPOS=1007760;//jslker.Parent:7760
      _func = (function anonymous_7770() {
        
        $LASTPOS=1007791;//jslker.Parent:7791
        clicked=1;
      });
      $LASTPOS=1007815;//jslker.Parent:7815
      _this.onClick(elem,_func);
      $LASTPOS=1007841;//jslker.Parent:7841
      while (clicked==0) {
        $LASTPOS=1007869;//jslker.Parent:7869
        _this.wait(10);
        
      }
      $LASTPOS=1007891;//jslker.Parent:7891
      $("[name="+elem+"]").off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=1007740;//jslker.Parent:7740
      clicked = 0;
      $LASTPOS=1007760;//jslker.Parent:7760
      _func = (function anonymous_7770() {
        
        $LASTPOS=1007791;//jslker.Parent:7791
        clicked=1;
      });
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1007815;//jslker.Parent:7815
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1007841;//jslker.Parent:7841
          case 2:
            if (!(clicked==0)) { __pc=4; break; }
            $LASTPOS=1007869;//jslker.Parent:7869
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            $LASTPOS=1007891;//jslker.Parent:7891
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