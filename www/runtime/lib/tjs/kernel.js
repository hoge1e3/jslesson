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
      var dst;
      
      $LASTPOS=1000647;//jslker.Parent:647
      if (_this.document.baWriteTo) {
        $LASTPOS=1000682;//jslker.Parent:682
        dst = $("[name="+elem+"]")[0];
        $LASTPOS=1000724;//jslker.Parent:724
        if (dst) {
          $LASTPOS=1000733;//jslker.Parent:733
          _this.document.baWriteTo(dst,val);
        }
        
      } else {
        $LASTPOS=1000786;//jslker.Parent:786
        $("[name="+elem+"]").append(val);
        
      }
    },
    fiber$addText :function _trc_Parent_f_addText(_thread,elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var dst;
      
      $LASTPOS=1000647;//jslker.Parent:647
      if (_this.document.baWriteTo) {
        $LASTPOS=1000682;//jslker.Parent:682
        dst = $("[name="+elem+"]")[0];
        $LASTPOS=1000724;//jslker.Parent:724
        if (dst) {
          $LASTPOS=1000733;//jslker.Parent:733
          _this.document.baWriteTo(dst,val);
        }
        
      } else {
        $LASTPOS=1000786;//jslker.Parent:786
        $("[name="+elem+"]").append(val);
        
      }
      
      _thread.retVal=_this;return;
    },
    setText :function _trc_Parent_setText(elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000856;//jslker.Parent:856
      $("[name="+elem+"]").empty();
      $LASTPOS=1000891;//jslker.Parent:891
      _this.addText(elem,val);
    },
    fiber$setText :function _trc_Parent_f_setText(_thread,elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000856;//jslker.Parent:856
      $("[name="+elem+"]").empty();
      
      _thread.enter(function _trc_Parent_ent_setText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000891;//jslker.Parent:891
            _this.fiber$addText(_thread, elem, val);
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
      
      $LASTPOS=1001031;//jslker.Parent:1031
      usepara;fname;
      $LASTPOS=1001055;//jslker.Parent:1055
      if (typeof  func=='function') {
        $LASTPOS=1001095;//jslker.Parent:1095
        if (func.methodInfo) {
          $LASTPOS=1001131;//jslker.Parent:1131
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1001205;//jslker.Parent:1205
        fname=func+"";
        
      }
      $LASTPOS=1001232;//jslker.Parent:1232
      if (typeof  fname=="string") {
        $LASTPOS=1001271;//jslker.Parent:1271
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1001338;//jslker.Parent:1338
        if (_this["fiber$"+fname]) {
          $LASTPOS=1001379;//jslker.Parent:1379
          usepara=true;
          
        }
        
      }
      $LASTPOS=1001416;//jslker.Parent:1416
      if (usepara) {
        $LASTPOS=1001440;//jslker.Parent:1440
        $("[name="+elem+"]").click(_this.catchException((function anonymous_1482() {
          
          $LASTPOS=1001499;//jslker.Parent:1499
          _this.parallel(fname);
        })));
        
      } else {
        $LASTPOS=1001613;//jslker.Parent:1613
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
      
      $LASTPOS=1001031;//jslker.Parent:1031
      usepara;fname;
      $LASTPOS=1001055;//jslker.Parent:1055
      if (typeof  func=='function') {
        $LASTPOS=1001095;//jslker.Parent:1095
        if (func.methodInfo) {
          $LASTPOS=1001131;//jslker.Parent:1131
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=1001205;//jslker.Parent:1205
        fname=func+"";
        
      }
      $LASTPOS=1001232;//jslker.Parent:1232
      if (typeof  fname=="string") {
        $LASTPOS=1001271;//jslker.Parent:1271
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=1001338;//jslker.Parent:1338
        if (_this["fiber$"+fname]) {
          $LASTPOS=1001379;//jslker.Parent:1379
          usepara=true;
          
        }
        
      }
      
      _thread.enter(function _trc_Parent_ent_onClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001416;//jslker.Parent:1416
            if (!(usepara)) { __pc=1; break; }
            $LASTPOS=1001440;//jslker.Parent:1440
            $("[name="+elem+"]").click(_this.catchException((function anonymous_1482() {
              
              $LASTPOS=1001499;//jslker.Parent:1499
              _this.parallel(fname);
            })));
            __pc=2;break;
          case 1:
            {
              $LASTPOS=1001613;//jslker.Parent:1613
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
      
      $LASTPOS=1001695;//jslker.Parent:1695
      if (typeof  func=="function") {
        $LASTPOS=1001733;//jslker.Parent:1733
        $("body").on("touchstart",(function anonymous_1759(e) {
          
          $LASTPOS=1001785;//jslker.Parent:1785
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1001916;//jslker.Parent:1916
        $("body").on("touchmove",(function anonymous_1941(e) {
          
          $LASTPOS=1001967;//jslker.Parent:1967
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002097;//jslker.Parent:2097
        $("body").on("touchend",(function anonymous_2121(e) {
          
          $LASTPOS=1002147;//jslker.Parent:2147
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1002276;//jslker.Parent:2276
        $("body").on("mousedown",(function anonymous_2301(e) {
          
          $LASTPOS=1002327;//jslker.Parent:2327
          _this.down=true;
          $LASTPOS=1002351;//jslker.Parent:2351
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1002404;//jslker.Parent:2404
        $("body").on("mousemove",(function anonymous_2429(e) {
          
          $LASTPOS=1002455;//jslker.Parent:2455
          if (_this.down) {
            $LASTPOS=1002464;//jslker.Parent:2464
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1002516;//jslker.Parent:2516
        $("body").on("mouseup",(function anonymous_2539(e) {
          
          $LASTPOS=1002565;//jslker.Parent:2565
          _this.down=false;
          $LASTPOS=1002590;//jslker.Parent:2590
          func(e.pageX,e.pageY,"end");
        }));
        
      }
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001695;//jslker.Parent:1695
      if (typeof  func=="function") {
        $LASTPOS=1001733;//jslker.Parent:1733
        $("body").on("touchstart",(function anonymous_1759(e) {
          
          $LASTPOS=1001785;//jslker.Parent:1785
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1001916;//jslker.Parent:1916
        $("body").on("touchmove",(function anonymous_1941(e) {
          
          $LASTPOS=1001967;//jslker.Parent:1967
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1002097;//jslker.Parent:2097
        $("body").on("touchend",(function anonymous_2121(e) {
          
          $LASTPOS=1002147;//jslker.Parent:2147
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1002276;//jslker.Parent:2276
        $("body").on("mousedown",(function anonymous_2301(e) {
          
          $LASTPOS=1002327;//jslker.Parent:2327
          _this.down=true;
          $LASTPOS=1002351;//jslker.Parent:2351
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1002404;//jslker.Parent:2404
        $("body").on("mousemove",(function anonymous_2429(e) {
          
          $LASTPOS=1002455;//jslker.Parent:2455
          if (_this.down) {
            $LASTPOS=1002464;//jslker.Parent:2464
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1002516;//jslker.Parent:2516
        $("body").on("mouseup",(function anonymous_2539(e) {
          
          $LASTPOS=1002565;//jslker.Parent:2565
          _this.down=false;
          $LASTPOS=1002590;//jslker.Parent:2590
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002717;//jslker.Parent:2717
      _this._canvas=$("[name="+canv+"]")[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002717;//jslker.Parent:2717
      _this._canvas=$("[name="+canv+"]")[0];
      
      _thread.retVal=_this;return;
    },
    searchCanvas :function _trc_Parent_searchCanvas() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002776;//jslker.Parent:2776
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
      
      $LASTPOS=1002776;//jslker.Parent:2776
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
      
      $LASTPOS=1002901;//jslker.Parent:2901
      if (_this.searchCanvas()) {
        $LASTPOS=1002930;//jslker.Parent:2930
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002969;//jslker.Parent:2969
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003018;//jslker.Parent:3018
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002901;//jslker.Parent:2901
      if (_this.searchCanvas()) {
        $LASTPOS=1002930;//jslker.Parent:2930
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002969;//jslker.Parent:2969
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003018;//jslker.Parent:3018
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003096;//jslker.Parent:3096
      if (_this.searchCanvas()) {
        $LASTPOS=1003125;//jslker.Parent:3125
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003164;//jslker.Parent:3164
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003096;//jslker.Parent:3096
      if (_this.searchCanvas()) {
        $LASTPOS=1003125;//jslker.Parent:3125
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003164;//jslker.Parent:3164
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    getNumber :function _trc_Parent_getNumber(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003275;//jslker.Parent:3275
      _this.val=$("[name="+elem+"]").val();
      return _this.val-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003275;//jslker.Parent:3275
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003405;//jslker.Parent:3405
      _this.val=$("[name="+elem+"]").val();
      return _this.val;
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003405;//jslker.Parent:3405
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val;return;
      
      
      _thread.retVal=_this;return;
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003543;//jslker.Parent:3543
      $("[name="+elem+"]").text(num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003543;//jslker.Parent:3543
      $("[name="+elem+"]").text(num);
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003613;//jslker.Parent:3613
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1003657;//jslker.Parent:3657
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1003703;//jslker.Parent:3703
      $("[name="+elem+"]").attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003613;//jslker.Parent:3613
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1003657;//jslker.Parent:3657
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1003703;//jslker.Parent:3703
      $("[name="+elem+"]").attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003772;//jslker.Parent:3772
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003772;//jslker.Parent:3772
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003897;//jslker.Parent:3897
      console.log(scaleX,scaleY);
      $LASTPOS=1003930;//jslker.Parent:3930
      if (! scaleX) {
        $LASTPOS=1003952;//jslker.Parent:3952
        scaleX=1;
        $LASTPOS=1003971;//jslker.Parent:3971
        scaleY=1;
        
      } else {
        $LASTPOS=1003992;//jslker.Parent:3992
        if (! scaleY) {
          $LASTPOS=1004014;//jslker.Parent:4014
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004041;//jslker.Parent:4041
      console.log(scaleX,scaleY);
      $LASTPOS=1004074;//jslker.Parent:4074
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003897;//jslker.Parent:3897
      console.log(scaleX,scaleY);
      $LASTPOS=1003930;//jslker.Parent:3930
      if (! scaleX) {
        $LASTPOS=1003952;//jslker.Parent:3952
        scaleX=1;
        $LASTPOS=1003971;//jslker.Parent:3971
        scaleY=1;
        
      } else {
        $LASTPOS=1003992;//jslker.Parent:3992
        if (! scaleY) {
          $LASTPOS=1004014;//jslker.Parent:4014
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004041;//jslker.Parent:4041
      console.log(scaleX,scaleY);
      $LASTPOS=1004074;//jslker.Parent:4074
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004241;//jslker.Parent:4241
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004241;//jslker.Parent:4241
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004377;//jslker.Parent:4377
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004377;//jslker.Parent:4377
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1004508;//jslker.Parent:4508
      time=time||100;
      $LASTPOS=1004529;//jslker.Parent:4529
      t = null;
      $LASTPOS=1004549;//jslker.Parent:4549
      t.suspend();
      $LASTPOS=1004567;//jslker.Parent:4567
      setTimeout(_this.catchException((function anonymous_4593() {
        
        $LASTPOS=1004607;//jslker.Parent:4607
        t.steps();
      })),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1004508;//jslker.Parent:4508
      time=time||100;
      $LASTPOS=1004529;//jslker.Parent:4529
      t = _thread;
      $LASTPOS=1004549;//jslker.Parent:4549
      t.suspend();
      $LASTPOS=1004567;//jslker.Parent:4567
      setTimeout(_this.catchException((function anonymous_4593() {
        
        $LASTPOS=1004607;//jslker.Parent:4607
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
      
      $LASTPOS=1004718;//jslker.Parent:4718
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004718;//jslker.Parent:4718
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      $LASTPOS=1004791;//jslker.Parent:4791
      e = _this.document.createElement(elem);
      $LASTPOS=1004833;//jslker.Parent:4833
      e.setAttribute("name",n);
      $LASTPOS=1004865;//jslker.Parent:4865
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1004791;//jslker.Parent:4791
      e = _this.document.createElement(elem);
      $LASTPOS=1004833;//jslker.Parent:4833
      e.setAttribute("name",n);
      $LASTPOS=1004865;//jslker.Parent:4865
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004924;//jslker.Parent:4924
      if (_this.searchCanvas()) {
        $LASTPOS=1004953;//jslker.Parent:4953
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004992;//jslker.Parent:4992
        _this.ctx.save();
        $LASTPOS=1005013;//jslker.Parent:5013
        _this.ctx.beginPath();
        $LASTPOS=1005039;//jslker.Parent:5039
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005076;//jslker.Parent:5076
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005106;//jslker.Parent:5106
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005158;//jslker.Parent:5158
        _this.ctx.fill();
        $LASTPOS=1005179;//jslker.Parent:5179
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004924;//jslker.Parent:4924
      if (_this.searchCanvas()) {
        $LASTPOS=1004953;//jslker.Parent:4953
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004992;//jslker.Parent:4992
        _this.ctx.save();
        $LASTPOS=1005013;//jslker.Parent:5013
        _this.ctx.beginPath();
        $LASTPOS=1005039;//jslker.Parent:5039
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005076;//jslker.Parent:5076
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005106;//jslker.Parent:5106
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005158;//jslker.Parent:5158
        _this.ctx.fill();
        $LASTPOS=1005179;//jslker.Parent:5179
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005234;//jslker.Parent:5234
      if (_this.searchCanvas()) {
        $LASTPOS=1005263;//jslker.Parent:5263
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005302;//jslker.Parent:5302
        _this.ctx.beginPath();
        $LASTPOS=1005328;//jslker.Parent:5328
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005356;//jslker.Parent:5356
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005384;//jslker.Parent:5384
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005234;//jslker.Parent:5234
      if (_this.searchCanvas()) {
        $LASTPOS=1005263;//jslker.Parent:5263
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005302;//jslker.Parent:5302
        _this.ctx.beginPath();
        $LASTPOS=1005328;//jslker.Parent:5328
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005356;//jslker.Parent:5356
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005384;//jslker.Parent:5384
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005435;//jslker.Parent:5435
      if (_this.searchCanvas()) {
        $LASTPOS=1005464;//jslker.Parent:5464
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005503;//jslker.Parent:5503
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005435;//jslker.Parent:5435
      if (_this.searchCanvas()) {
        $LASTPOS=1005464;//jslker.Parent:5464
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005503;//jslker.Parent:5503
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005561;//jslker.Parent:5561
      if (_this.searchCanvas()) {
        $LASTPOS=1005590;//jslker.Parent:5590
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005629;//jslker.Parent:5629
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005561;//jslker.Parent:5561
      if (_this.searchCanvas()) {
        $LASTPOS=1005590;//jslker.Parent:5590
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005629;//jslker.Parent:5629
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005692;//jslker.Parent:5692
      _this.keyData=[];
      $LASTPOS=1005709;//jslker.Parent:5709
      _this.document.onkeydown=(function anonymous_5730(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1005753;//jslker.Parent:5753
        if (! e) {
          $LASTPOS=1005760;//jslker.Parent:5760
          e=window.event;
        }
        $LASTPOS=1005787;//jslker.Parent:5787
        key_code = e.keyCode;
        $LASTPOS=1005822;//jslker.Parent:5822
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1005891;//jslker.Parent:5891
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1005960;//jslker.Parent:5960
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1005998;//jslker.Parent:5998
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1006064;//jslker.Parent:6064
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1006101;//jslker.Parent:6101
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1006164;//jslker.Parent:6164
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1006200;//jslker.Parent:6200
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1006262;//jslker.Parent:6262
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1006295;//jslker.Parent:6295
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1006353;//jslker.Parent:6353
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1006384;//jslker.Parent:6384
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1006448;//jslker.Parent:6448
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1006482;//jslker.Parent:6482
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1006544;//jslker.Parent:6544
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1006577;//jslker.Parent:6577
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1006623;//jslker.Parent:6623
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
      $LASTPOS=1006788;//jslker.Parent:6788
      _this.document.onkeyup=(function anonymous_6807(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006830;//jslker.Parent:6830
        if (! e) {
          $LASTPOS=1006837;//jslker.Parent:6837
          e=window.event;
        }
        $LASTPOS=1006864;//jslker.Parent:6864
        key_code = e.keyCode;
        $LASTPOS=1006899;//jslker.Parent:6899
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1006968;//jslker.Parent:6968
        if (e.keyCode==16) {
          $LASTPOS=1006986;//jslker.Parent:6986
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1007024;//jslker.Parent:7024
          if (e.keyCode==17) {
            $LASTPOS=1007042;//jslker.Parent:7042
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1007079;//jslker.Parent:7079
            if (e.keyCode==18) {
              $LASTPOS=1007097;//jslker.Parent:7097
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1007133;//jslker.Parent:7133
              if (e.keyCode==37) {
                $LASTPOS=1007151;//jslker.Parent:7151
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1007184;//jslker.Parent:7184
                if (e.keyCode==38) {
                  $LASTPOS=1007202;//jslker.Parent:7202
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1007233;//jslker.Parent:7233
                  if (e.keyCode==39) {
                    $LASTPOS=1007251;//jslker.Parent:7251
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1007285;//jslker.Parent:7285
                    if (e.keyCode==40) {
                      $LASTPOS=1007303;//jslker.Parent:7303
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1007336;//jslker.Parent:7336
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
      
      $LASTPOS=1007860;//jslker.Parent:7860
      a = Array.prototype.slice.call(arguments);
      $LASTPOS=1007910;//jslker.Parent:7910
      methodName = a.shift();
      $LASTPOS=1007941;//jslker.Parent:7941
      t = Tonyu.thread();
      $LASTPOS=1007968;//jslker.Parent:7968
      t.apply(_this,methodName,a);
      $LASTPOS=1008001;//jslker.Parent:8001
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
      
      $LASTPOS=1007860;//jslker.Parent:7860
      a = Array.prototype.slice.call(_arguments);
      $LASTPOS=1007910;//jslker.Parent:7910
      methodName = a.shift();
      $LASTPOS=1007941;//jslker.Parent:7941
      t = Tonyu.thread();
      $LASTPOS=1007968;//jslker.Parent:7968
      t.apply(_this,methodName,a);
      $LASTPOS=1008001;//jslker.Parent:8001
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var clicked;
      var _func;
      
      $LASTPOS=1008039;//jslker.Parent:8039
      clicked = 0;
      $LASTPOS=1008059;//jslker.Parent:8059
      _func = (function anonymous_8069() {
        
        $LASTPOS=1008090;//jslker.Parent:8090
        clicked=1;
      });
      $LASTPOS=1008114;//jslker.Parent:8114
      _this.onClick(elem,_func);
      $LASTPOS=1008140;//jslker.Parent:8140
      while (clicked==0) {
        $LASTPOS=1008168;//jslker.Parent:8168
        _this.wait(10);
        
      }
      $LASTPOS=1008190;//jslker.Parent:8190
      $("[name="+elem+"]").off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=1008039;//jslker.Parent:8039
      clicked = 0;
      $LASTPOS=1008059;//jslker.Parent:8059
      _func = (function anonymous_8069() {
        
        $LASTPOS=1008090;//jslker.Parent:8090
        clicked=1;
      });
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008114;//jslker.Parent:8114
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008140;//jslker.Parent:8140
          case 2:
            if (!(clicked==0)) { __pc=4; break; }
            $LASTPOS=1008168;//jslker.Parent:8168
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            $LASTPOS=1008190;//jslker.Parent:8190
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
      
      $LASTPOS=1008264;//jslker.Parent:8264
      t = null;
      $LASTPOS=1008284;//jslker.Parent:8284
      t.suspend();
      $LASTPOS=1008302;//jslker.Parent:8302
      _this._err=null;
      $LASTPOS=1008318;//jslker.Parent:8318
      promise.then((function anonymous_8331(r) {
        
        $LASTPOS=1008347;//jslker.Parent:8347
        _this._res=r;
        $LASTPOS=1008364;//jslker.Parent:8364
        t.steps();
      }),(function anonymous_8382(e) {
        
        $LASTPOS=1008398;//jslker.Parent:8398
        _this._err=e||"Error";
        $LASTPOS=1008424;//jslker.Parent:8424
        t.steps();
      }));
    },
    fiber$_waitFor :function _trc_Parent_f__waitFor(_thread,promise) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1008264;//jslker.Parent:8264
      t = _thread;
      $LASTPOS=1008284;//jslker.Parent:8284
      t.suspend();
      $LASTPOS=1008302;//jslker.Parent:8302
      _this._err=null;
      $LASTPOS=1008318;//jslker.Parent:8318
      promise.then((function anonymous_8331(r) {
        
        $LASTPOS=1008347;//jslker.Parent:8347
        _this._res=r;
        $LASTPOS=1008364;//jslker.Parent:8364
        t.steps();
      }),(function anonymous_8382(e) {
        
        $LASTPOS=1008398;//jslker.Parent:8398
        _this._err=e||"Error";
        $LASTPOS=1008424;//jslker.Parent:8424
        t.steps();
      }));
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_Parent_waitFor(promise) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1008473;//jslker.Parent:8473
      _this._waitFor(promise);
      $LASTPOS=1008497;//jslker.Parent:8497
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
            $LASTPOS=1008473;//jslker.Parent:8473
            _this.fiber$_waitFor(_thread, promise);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008497;//jslker.Parent:8497
            if (_this._err) {
              throw _this._err;
              
            }
            _thread.exit(_this._res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"setInterval":{"nowait":false},"setTimeout":{"nowait":false},"catchException":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"searchCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"new":{"nowait":false},"getkey":{"nowait":false},"dist":{"nowait":false},"angle":{"nowait":false},"rad":{"nowait":true},"deg":{"nowait":true},"sqrt":{"nowait":false},"sin":{"nowait":false},"cos":{"nowait":false},"tan":{"nowait":false},"parallel":{"nowait":false},"waitClick":{"nowait":false},"_waitFor":{"nowait":false},"waitFor":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map