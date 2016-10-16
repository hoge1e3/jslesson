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
      
      return (function anonymous_350() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000460;//jslker.Parent:460
          Tonyu.onRuntimeError(e);
          
        }
      });
    },
    fiber$catchException :function _trc_Parent_f_catchException(_thread,f) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(function anonymous_350() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000460;//jslker.Parent:460
          Tonyu.onRuntimeError(e);
          
        }
      });return;
      
      
      _thread.retVal=_this;return;
    },
    addText :function _trc_Parent_addText(elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000586;//jslker.Parent:586
      $("[name="+elem+"]").append(val);
    },
    fiber$addText :function _trc_Parent_f_addText(_thread,elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000586;//jslker.Parent:586
      $("[name="+elem+"]").append(val);
      
      _thread.retVal=_this;return;
    },
    setText :function _trc_Parent_setText(elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000701;//jslker.Parent:701
      $("[name="+elem+"]").text(val);
    },
    fiber$setText :function _trc_Parent_f_setText(_thread,elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000701;//jslker.Parent:701
      $("[name="+elem+"]").text(val);
      
      _thread.retVal=_this;return;
    },
    onClick :function _trc_Parent_onClick(elem,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000763;//jslker.Parent:763
      if (typeof  func!='function') {
        throw new Error("onClickの二つ目の引数には 関数名 を \" \"をつけずに書いてください");
        
        
      }
      $LASTPOS=1000933;//jslker.Parent:933
      $("[name="+elem+"]").click(_this.catchException(func));
    },
    fiber$onClick :function _trc_Parent_f_onClick(_thread,elem,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000763;//jslker.Parent:763
      if (typeof  func!='function') {
        throw new Error("onClickの二つ目の引数には 関数名 を \" \"をつけずに書いてください");
        
        
      }
      $LASTPOS=1000933;//jslker.Parent:933
      $("[name="+elem+"]").click(_this.catchException(func));
      
      _thread.retVal=_this;return;
    },
    onTouch :function _trc_Parent_onTouch(func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001008;//jslker.Parent:1008
      if (typeof  func=="function") {
        $LASTPOS=1001046;//jslker.Parent:1046
        $("body").on("touchstart",(function anonymous_1072(e) {
          
          $LASTPOS=1001098;//jslker.Parent:1098
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1001229;//jslker.Parent:1229
        $("body").on("touchmove",(function anonymous_1254(e) {
          
          $LASTPOS=1001280;//jslker.Parent:1280
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1001410;//jslker.Parent:1410
        $("body").on("touchend",(function anonymous_1434(e) {
          
          $LASTPOS=1001460;//jslker.Parent:1460
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1001589;//jslker.Parent:1589
        $("body").on("mousedown",(function anonymous_1614(e) {
          
          $LASTPOS=1001640;//jslker.Parent:1640
          _this.down=true;
          $LASTPOS=1001664;//jslker.Parent:1664
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1001717;//jslker.Parent:1717
        $("body").on("mousemove",(function anonymous_1742(e) {
          
          $LASTPOS=1001768;//jslker.Parent:1768
          if (_this.down) {
            $LASTPOS=1001777;//jslker.Parent:1777
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1001829;//jslker.Parent:1829
        $("body").on("mouseup",(function anonymous_1852(e) {
          
          $LASTPOS=1001878;//jslker.Parent:1878
          _this.down=false;
          $LASTPOS=1001903;//jslker.Parent:1903
          func(e.pageX,e.pageY,"end");
        }));
        
      }
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001008;//jslker.Parent:1008
      if (typeof  func=="function") {
        $LASTPOS=1001046;//jslker.Parent:1046
        $("body").on("touchstart",(function anonymous_1072(e) {
          
          $LASTPOS=1001098;//jslker.Parent:1098
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1001229;//jslker.Parent:1229
        $("body").on("touchmove",(function anonymous_1254(e) {
          
          $LASTPOS=1001280;//jslker.Parent:1280
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1001410;//jslker.Parent:1410
        $("body").on("touchend",(function anonymous_1434(e) {
          
          $LASTPOS=1001460;//jslker.Parent:1460
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1001589;//jslker.Parent:1589
        $("body").on("mousedown",(function anonymous_1614(e) {
          
          $LASTPOS=1001640;//jslker.Parent:1640
          _this.down=true;
          $LASTPOS=1001664;//jslker.Parent:1664
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1001717;//jslker.Parent:1717
        $("body").on("mousemove",(function anonymous_1742(e) {
          
          $LASTPOS=1001768;//jslker.Parent:1768
          if (_this.down) {
            $LASTPOS=1001777;//jslker.Parent:1777
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1001829;//jslker.Parent:1829
        $("body").on("mouseup",(function anonymous_1852(e) {
          
          $LASTPOS=1001878;//jslker.Parent:1878
          _this.down=false;
          $LASTPOS=1001903;//jslker.Parent:1903
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002030;//jslker.Parent:2030
      _this._canvas=$("[name="+canv+"]")[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002030;//jslker.Parent:2030
      _this._canvas=$("[name="+canv+"]")[0];
      
      _thread.retVal=_this;return;
    },
    searchCanvas :function _trc_Parent_searchCanvas() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002089;//jslker.Parent:2089
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
      
      $LASTPOS=1002089;//jslker.Parent:2089
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
      
      $LASTPOS=1002212;//jslker.Parent:2212
      if (_this.searchCanvas()) {
        $LASTPOS=1002241;//jslker.Parent:2241
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002280;//jslker.Parent:2280
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1002329;//jslker.Parent:2329
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002212;//jslker.Parent:2212
      if (_this.searchCanvas()) {
        $LASTPOS=1002241;//jslker.Parent:2241
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002280;//jslker.Parent:2280
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1002329;//jslker.Parent:2329
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002407;//jslker.Parent:2407
      if (_this.searchCanvas()) {
        $LASTPOS=1002436;//jslker.Parent:2436
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002475;//jslker.Parent:2475
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002407;//jslker.Parent:2407
      if (_this.searchCanvas()) {
        $LASTPOS=1002436;//jslker.Parent:2436
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1002475;//jslker.Parent:2475
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    getNumber :function _trc_Parent_getNumber(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002586;//jslker.Parent:2586
      _this.val=$("[name="+elem+"]").val();
      return _this.val-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002586;//jslker.Parent:2586
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002716;//jslker.Parent:2716
      _this.val=$("[name="+elem+"]").val();
      return _this.val;
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002716;//jslker.Parent:2716
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val;return;
      
      
      _thread.retVal=_this;return;
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002854;//jslker.Parent:2854
      $("[name="+elem+"]").text(num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002854;//jslker.Parent:2854
      $("[name="+elem+"]").text(num);
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002924;//jslker.Parent:2924
      $("[name="+elem+"]").attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002924;//jslker.Parent:2924
      $("[name="+elem+"]").attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002993;//jslker.Parent:2993
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002993;//jslker.Parent:2993
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003118;//jslker.Parent:3118
      console.log(scaleX,scaleY);
      $LASTPOS=1003151;//jslker.Parent:3151
      if (! scaleX) {
        $LASTPOS=1003173;//jslker.Parent:3173
        scaleX=1;
        $LASTPOS=1003192;//jslker.Parent:3192
        scaleY=1;
        
      } else {
        $LASTPOS=1003213;//jslker.Parent:3213
        if (! scaleY) {
          $LASTPOS=1003235;//jslker.Parent:3235
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1003262;//jslker.Parent:3262
      console.log(scaleX,scaleY);
      $LASTPOS=1003295;//jslker.Parent:3295
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003118;//jslker.Parent:3118
      console.log(scaleX,scaleY);
      $LASTPOS=1003151;//jslker.Parent:3151
      if (! scaleX) {
        $LASTPOS=1003173;//jslker.Parent:3173
        scaleX=1;
        $LASTPOS=1003192;//jslker.Parent:3192
        scaleY=1;
        
      } else {
        $LASTPOS=1003213;//jslker.Parent:3213
        if (! scaleY) {
          $LASTPOS=1003235;//jslker.Parent:3235
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1003262;//jslker.Parent:3262
      console.log(scaleX,scaleY);
      $LASTPOS=1003295;//jslker.Parent:3295
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003462;//jslker.Parent:3462
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003462;//jslker.Parent:3462
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003598;//jslker.Parent:3598
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003598;//jslker.Parent:3598
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1003729;//jslker.Parent:3729
      time=time||100;
      $LASTPOS=1003750;//jslker.Parent:3750
      t = null;
      $LASTPOS=1003770;//jslker.Parent:3770
      t.suspend();
      $LASTPOS=1003788;//jslker.Parent:3788
      setTimeout((function anonymous_3799() {
        
        $LASTPOS=1003813;//jslker.Parent:3813
        t.steps();
      }),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1003729;//jslker.Parent:3729
      time=time||100;
      $LASTPOS=1003750;//jslker.Parent:3750
      t = _thread;
      $LASTPOS=1003770;//jslker.Parent:3770
      t.suspend();
      $LASTPOS=1003788;//jslker.Parent:3788
      setTimeout((function anonymous_3799() {
        
        $LASTPOS=1003813;//jslker.Parent:3813
        t.steps();
      }),time);
      
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
      
      $LASTPOS=1003923;//jslker.Parent:3923
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003923;//jslker.Parent:3923
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      $LASTPOS=1003996;//jslker.Parent:3996
      e = _this.document.createElement(elem);
      $LASTPOS=1004038;//jslker.Parent:4038
      e.setAttribute("name",n);
      $LASTPOS=1004070;//jslker.Parent:4070
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1003996;//jslker.Parent:3996
      e = _this.document.createElement(elem);
      $LASTPOS=1004038;//jslker.Parent:4038
      e.setAttribute("name",n);
      $LASTPOS=1004070;//jslker.Parent:4070
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004129;//jslker.Parent:4129
      if (_this.searchCanvas()) {
        $LASTPOS=1004158;//jslker.Parent:4158
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004197;//jslker.Parent:4197
        _this.ctx.save();
        $LASTPOS=1004218;//jslker.Parent:4218
        _this.ctx.beginPath();
        $LASTPOS=1004244;//jslker.Parent:4244
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1004281;//jslker.Parent:4281
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1004311;//jslker.Parent:4311
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1004363;//jslker.Parent:4363
        _this.ctx.fill();
        $LASTPOS=1004384;//jslker.Parent:4384
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004129;//jslker.Parent:4129
      if (_this.searchCanvas()) {
        $LASTPOS=1004158;//jslker.Parent:4158
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004197;//jslker.Parent:4197
        _this.ctx.save();
        $LASTPOS=1004218;//jslker.Parent:4218
        _this.ctx.beginPath();
        $LASTPOS=1004244;//jslker.Parent:4244
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1004281;//jslker.Parent:4281
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1004311;//jslker.Parent:4311
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1004363;//jslker.Parent:4363
        _this.ctx.fill();
        $LASTPOS=1004384;//jslker.Parent:4384
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004439;//jslker.Parent:4439
      if (_this.searchCanvas()) {
        $LASTPOS=1004468;//jslker.Parent:4468
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004507;//jslker.Parent:4507
        _this.ctx.beginPath();
        $LASTPOS=1004533;//jslker.Parent:4533
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1004561;//jslker.Parent:4561
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1004589;//jslker.Parent:4589
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004439;//jslker.Parent:4439
      if (_this.searchCanvas()) {
        $LASTPOS=1004468;//jslker.Parent:4468
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004507;//jslker.Parent:4507
        _this.ctx.beginPath();
        $LASTPOS=1004533;//jslker.Parent:4533
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1004561;//jslker.Parent:4561
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1004589;//jslker.Parent:4589
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004640;//jslker.Parent:4640
      if (_this.searchCanvas()) {
        $LASTPOS=1004669;//jslker.Parent:4669
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004708;//jslker.Parent:4708
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004640;//jslker.Parent:4640
      if (_this.searchCanvas()) {
        $LASTPOS=1004669;//jslker.Parent:4669
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004708;//jslker.Parent:4708
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004766;//jslker.Parent:4766
      if (_this.searchCanvas()) {
        $LASTPOS=1004795;//jslker.Parent:4795
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004834;//jslker.Parent:4834
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004766;//jslker.Parent:4766
      if (_this.searchCanvas()) {
        $LASTPOS=1004795;//jslker.Parent:4795
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=1004834;//jslker.Parent:4834
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004897;//jslker.Parent:4897
      _this.keyData=[];
      $LASTPOS=1004914;//jslker.Parent:4914
      _this.document.onkeydown=(function anonymous_4935(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1004958;//jslker.Parent:4958
        if (! e) {
          $LASTPOS=1004965;//jslker.Parent:4965
          e=window.event;
        }
        $LASTPOS=1004992;//jslker.Parent:4992
        key_code = e.keyCode;
        $LASTPOS=1005027;//jslker.Parent:5027
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1005096;//jslker.Parent:5096
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1005165;//jslker.Parent:5165
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1005203;//jslker.Parent:5203
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1005269;//jslker.Parent:5269
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1005306;//jslker.Parent:5306
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1005369;//jslker.Parent:5369
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1005405;//jslker.Parent:5405
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1005467;//jslker.Parent:5467
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1005500;//jslker.Parent:5500
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1005558;//jslker.Parent:5558
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1005589;//jslker.Parent:5589
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1005653;//jslker.Parent:5653
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1005687;//jslker.Parent:5687
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1005749;//jslker.Parent:5749
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1005782;//jslker.Parent:5782
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1005828;//jslker.Parent:5828
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
      $LASTPOS=1005993;//jslker.Parent:5993
      _this.document.onkeyup=(function anonymous_6012(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1006035;//jslker.Parent:6035
        if (! e) {
          $LASTPOS=1006042;//jslker.Parent:6042
          e=window.event;
        }
        $LASTPOS=1006069;//jslker.Parent:6069
        key_code = e.keyCode;
        $LASTPOS=1006104;//jslker.Parent:6104
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1006173;//jslker.Parent:6173
        if (e.keyCode==16) {
          $LASTPOS=1006191;//jslker.Parent:6191
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1006229;//jslker.Parent:6229
          if (e.keyCode==17) {
            $LASTPOS=1006247;//jslker.Parent:6247
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1006284;//jslker.Parent:6284
            if (e.keyCode==18) {
              $LASTPOS=1006302;//jslker.Parent:6302
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1006338;//jslker.Parent:6338
              if (e.keyCode==37) {
                $LASTPOS=1006356;//jslker.Parent:6356
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1006389;//jslker.Parent:6389
                if (e.keyCode==38) {
                  $LASTPOS=1006407;//jslker.Parent:6407
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1006438;//jslker.Parent:6438
                  if (e.keyCode==39) {
                    $LASTPOS=1006456;//jslker.Parent:6456
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1006490;//jslker.Parent:6490
                    if (e.keyCode==40) {
                      $LASTPOS=1006508;//jslker.Parent:6508
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1006541;//jslker.Parent:6541
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
      
      return _this.Math.sin(x);
    },
    fiber$sin :function _trc_Parent_f_sin(_thread,x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.sin(x);return;
      
      
      _thread.retVal=_this;return;
    },
    cos :function _trc_Parent_cos(x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.Math.cos(x);
    },
    fiber$cos :function _trc_Parent_f_cos(_thread,x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.cos(x);return;
      
      
      _thread.retVal=_this;return;
    },
    tan :function _trc_Parent_tan(x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.Math.tan(x);
    },
    fiber$tan :function _trc_Parent_f_tan(_thread,x) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.tan(x);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"setInterval":{"nowait":false},"setTimeout":{"nowait":false},"catchException":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"searchCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"new":{"nowait":false},"getkey":{"nowait":false},"dist":{"nowait":false},"sqrt":{"nowait":false},"sin":{"nowait":false},"cos":{"nowait":false},"tan":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map