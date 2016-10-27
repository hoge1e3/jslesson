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
      
      $LASTPOS=1002776;//jslker.Parent:2776
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
      
      $LASTPOS=1002899;//jslker.Parent:2899
      if (_this.searchCanvas()) {
        $LASTPOS=1002928;//jslker.Parent:2928
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002967;//jslker.Parent:2967
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003016;//jslker.Parent:3016
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002899;//jslker.Parent:2899
      if (_this.searchCanvas()) {
        $LASTPOS=1002928;//jslker.Parent:2928
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002967;//jslker.Parent:2967
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1003016;//jslker.Parent:3016
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003094;//jslker.Parent:3094
      if (_this.searchCanvas()) {
        $LASTPOS=1003123;//jslker.Parent:3123
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003162;//jslker.Parent:3162
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003094;//jslker.Parent:3094
      if (_this.searchCanvas()) {
        $LASTPOS=1003123;//jslker.Parent:3123
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1003162;//jslker.Parent:3162
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    getNumber :function _trc_Parent_getNumber(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003273;//jslker.Parent:3273
      _this.val=$("[name="+elem+"]").val();
      return _this.val-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003273;//jslker.Parent:3273
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003403;//jslker.Parent:3403
      _this.val=$("[name="+elem+"]").val();
      return _this.val;
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003403;//jslker.Parent:3403
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val;return;
      
      
      _thread.retVal=_this;return;
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003541;//jslker.Parent:3541
      $("[name="+elem+"]").text(num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003541;//jslker.Parent:3541
      $("[name="+elem+"]").text(num);
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003611;//jslker.Parent:3611
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1003655;//jslker.Parent:3655
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1003701;//jslker.Parent:3701
      $("[name="+elem+"]").attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003611;//jslker.Parent:3611
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=1003655;//jslker.Parent:3655
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=1003701;//jslker.Parent:3701
      $("[name="+elem+"]").attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003770;//jslker.Parent:3770
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003770;//jslker.Parent:3770
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003895;//jslker.Parent:3895
      console.log(scaleX,scaleY);
      $LASTPOS=1003928;//jslker.Parent:3928
      if (! scaleX) {
        $LASTPOS=1003950;//jslker.Parent:3950
        scaleX=1;
        $LASTPOS=1003969;//jslker.Parent:3969
        scaleY=1;
        
      } else {
        $LASTPOS=1003990;//jslker.Parent:3990
        if (! scaleY) {
          $LASTPOS=1004012;//jslker.Parent:4012
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004039;//jslker.Parent:4039
      console.log(scaleX,scaleY);
      $LASTPOS=1004072;//jslker.Parent:4072
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003895;//jslker.Parent:3895
      console.log(scaleX,scaleY);
      $LASTPOS=1003928;//jslker.Parent:3928
      if (! scaleX) {
        $LASTPOS=1003950;//jslker.Parent:3950
        scaleX=1;
        $LASTPOS=1003969;//jslker.Parent:3969
        scaleY=1;
        
      } else {
        $LASTPOS=1003990;//jslker.Parent:3990
        if (! scaleY) {
          $LASTPOS=1004012;//jslker.Parent:4012
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1004039;//jslker.Parent:4039
      console.log(scaleX,scaleY);
      $LASTPOS=1004072;//jslker.Parent:4072
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004239;//jslker.Parent:4239
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004239;//jslker.Parent:4239
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004375;//jslker.Parent:4375
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004375;//jslker.Parent:4375
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1004506;//jslker.Parent:4506
      time=time||100;
      $LASTPOS=1004527;//jslker.Parent:4527
      t = null;
      $LASTPOS=1004547;//jslker.Parent:4547
      t.suspend();
      $LASTPOS=1004565;//jslker.Parent:4565
      setTimeout(_this.catchException((function anonymous_4591() {
        
        $LASTPOS=1004605;//jslker.Parent:4605
        t.steps();
      })),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1004506;//jslker.Parent:4506
      time=time||100;
      $LASTPOS=1004527;//jslker.Parent:4527
      t = _thread;
      $LASTPOS=1004547;//jslker.Parent:4547
      t.suspend();
      $LASTPOS=1004565;//jslker.Parent:4565
      setTimeout(_this.catchException((function anonymous_4591() {
        
        $LASTPOS=1004605;//jslker.Parent:4605
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
      
      $LASTPOS=1004716;//jslker.Parent:4716
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004716;//jslker.Parent:4716
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      $LASTPOS=1004789;//jslker.Parent:4789
      e = _this.document.createElement(elem);
      $LASTPOS=1004831;//jslker.Parent:4831
      e.setAttribute("name",n);
      $LASTPOS=1004863;//jslker.Parent:4863
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1004789;//jslker.Parent:4789
      e = _this.document.createElement(elem);
      $LASTPOS=1004831;//jslker.Parent:4831
      e.setAttribute("name",n);
      $LASTPOS=1004863;//jslker.Parent:4863
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004922;//jslker.Parent:4922
      if (_this.searchCanvas()) {
        $LASTPOS=1004951;//jslker.Parent:4951
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004990;//jslker.Parent:4990
        _this.ctx.save();
        $LASTPOS=1005011;//jslker.Parent:5011
        _this.ctx.beginPath();
        $LASTPOS=1005037;//jslker.Parent:5037
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005074;//jslker.Parent:5074
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005104;//jslker.Parent:5104
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005156;//jslker.Parent:5156
        _this.ctx.fill();
        $LASTPOS=1005177;//jslker.Parent:5177
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004922;//jslker.Parent:4922
      if (_this.searchCanvas()) {
        $LASTPOS=1004951;//jslker.Parent:4951
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004990;//jslker.Parent:4990
        _this.ctx.save();
        $LASTPOS=1005011;//jslker.Parent:5011
        _this.ctx.beginPath();
        $LASTPOS=1005037;//jslker.Parent:5037
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1005074;//jslker.Parent:5074
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1005104;//jslker.Parent:5104
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1005156;//jslker.Parent:5156
        _this.ctx.fill();
        $LASTPOS=1005177;//jslker.Parent:5177
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005232;//jslker.Parent:5232
      if (_this.searchCanvas()) {
        $LASTPOS=1005261;//jslker.Parent:5261
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005300;//jslker.Parent:5300
        _this.ctx.beginPath();
        $LASTPOS=1005326;//jslker.Parent:5326
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005354;//jslker.Parent:5354
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005382;//jslker.Parent:5382
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005232;//jslker.Parent:5232
      if (_this.searchCanvas()) {
        $LASTPOS=1005261;//jslker.Parent:5261
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005300;//jslker.Parent:5300
        _this.ctx.beginPath();
        $LASTPOS=1005326;//jslker.Parent:5326
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1005354;//jslker.Parent:5354
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1005382;//jslker.Parent:5382
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005433;//jslker.Parent:5433
      if (_this.searchCanvas()) {
        $LASTPOS=1005462;//jslker.Parent:5462
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005501;//jslker.Parent:5501
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005433;//jslker.Parent:5433
      if (_this.searchCanvas()) {
        $LASTPOS=1005462;//jslker.Parent:5462
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005501;//jslker.Parent:5501
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005559;//jslker.Parent:5559
      if (_this.searchCanvas()) {
        $LASTPOS=1005588;//jslker.Parent:5588
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005627;//jslker.Parent:5627
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1005559;//jslker.Parent:5559
      if (_this.searchCanvas()) {
        $LASTPOS=1005588;//jslker.Parent:5588
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1005627;//jslker.Parent:5627
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1005690;//jslker.Parent:5690
      _this.keyData=[];
      $LASTPOS=1005707;//jslker.Parent:5707
      _this.document.onkeydown=(function anonymous_5728(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1005751;//jslker.Parent:5751
        if (! e) {
          $LASTPOS=1005758;//jslker.Parent:5758
          e=window.event;
        }
        $LASTPOS=1005785;//jslker.Parent:5785
        key_code = e.keyCode;
        $LASTPOS=1005820;//jslker.Parent:5820
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1005889;//jslker.Parent:5889
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1005958;//jslker.Parent:5958
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1005996;//jslker.Parent:5996
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1006062;//jslker.Parent:6062
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1006099;//jslker.Parent:6099
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1006162;//jslker.Parent:6162
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1006198;//jslker.Parent:6198
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1006260;//jslker.Parent:6260
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1006293;//jslker.Parent:6293
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1006351;//jslker.Parent:6351
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1006382;//jslker.Parent:6382
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1006446;//jslker.Parent:6446
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1006480;//jslker.Parent:6480
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1006542;//jslker.Parent:6542
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1006575;//jslker.Parent:6575
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1006621;//jslker.Parent:6621
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
      $LASTPOS=1006786;//jslker.Parent:6786
      _this.document.onkeyup=(function anonymous_6805(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006828;//jslker.Parent:6828
        if (! e) {
          $LASTPOS=1006835;//jslker.Parent:6835
          e=window.event;
        }
        $LASTPOS=1006862;//jslker.Parent:6862
        key_code = e.keyCode;
        $LASTPOS=1006897;//jslker.Parent:6897
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1006966;//jslker.Parent:6966
        if (e.keyCode==16) {
          $LASTPOS=1006984;//jslker.Parent:6984
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1007022;//jslker.Parent:7022
          if (e.keyCode==17) {
            $LASTPOS=1007040;//jslker.Parent:7040
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1007077;//jslker.Parent:7077
            if (e.keyCode==18) {
              $LASTPOS=1007095;//jslker.Parent:7095
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1007131;//jslker.Parent:7131
              if (e.keyCode==37) {
                $LASTPOS=1007149;//jslker.Parent:7149
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1007182;//jslker.Parent:7182
                if (e.keyCode==38) {
                  $LASTPOS=1007200;//jslker.Parent:7200
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1007231;//jslker.Parent:7231
                  if (e.keyCode==39) {
                    $LASTPOS=1007249;//jslker.Parent:7249
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1007283;//jslker.Parent:7283
                    if (e.keyCode==40) {
                      $LASTPOS=1007301;//jslker.Parent:7301
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1007334;//jslker.Parent:7334
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
      
      $LASTPOS=1007858;//jslker.Parent:7858
      a = Array.prototype.slice.call(arguments);
      $LASTPOS=1007908;//jslker.Parent:7908
      methodName = a.shift();
      $LASTPOS=1007939;//jslker.Parent:7939
      t = Tonyu.thread();
      $LASTPOS=1007966;//jslker.Parent:7966
      t.apply(_this,methodName,a);
      $LASTPOS=1007999;//jslker.Parent:7999
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
      
      $LASTPOS=1007858;//jslker.Parent:7858
      a = Array.prototype.slice.call(_arguments);
      $LASTPOS=1007908;//jslker.Parent:7908
      methodName = a.shift();
      $LASTPOS=1007939;//jslker.Parent:7939
      t = Tonyu.thread();
      $LASTPOS=1007966;//jslker.Parent:7966
      t.apply(_this,methodName,a);
      $LASTPOS=1007999;//jslker.Parent:7999
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var clicked;
      var _func;
      
      $LASTPOS=1008037;//jslker.Parent:8037
      clicked = 0;
      $LASTPOS=1008057;//jslker.Parent:8057
      _func = (function anonymous_8067() {
        
        $LASTPOS=1008088;//jslker.Parent:8088
        clicked=1;
      });
      $LASTPOS=1008112;//jslker.Parent:8112
      _this.onClick(elem,_func);
      $LASTPOS=1008138;//jslker.Parent:8138
      while (clicked==0) {
        $LASTPOS=1008166;//jslker.Parent:8166
        _this.wait(10);
        
      }
      $LASTPOS=1008188;//jslker.Parent:8188
      $("[name="+elem+"]").off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=1008037;//jslker.Parent:8037
      clicked = 0;
      $LASTPOS=1008057;//jslker.Parent:8057
      _func = (function anonymous_8067() {
        
        $LASTPOS=1008088;//jslker.Parent:8088
        clicked=1;
      });
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008112;//jslker.Parent:8112
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1008138;//jslker.Parent:8138
          case 2:
            if (!(clicked==0)) { __pc=4; break; }
            $LASTPOS=1008166;//jslker.Parent:8166
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            $LASTPOS=1008188;//jslker.Parent:8188
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