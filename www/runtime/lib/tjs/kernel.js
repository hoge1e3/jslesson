Tonyu.klass.define({
  fullName: 'jslker.Parent',
  shortName: 'Parent',
  namespace: 'jslker',
  includes: [],
  methods: {
    main :function _trc_Parent_main() {//
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
      _this.canvas=$("[name="+canv+"]")[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002030;//jslker.Parent:2030
      _this.canvas=$("[name="+canv+"]")[0];
      
      _thread.retVal=_this;return;
    },
    setColor :function _trc_Parent_setColor(r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002089;//jslker.Parent:2089
      if (_this.canvas) {
        $LASTPOS=1002110;//jslker.Parent:2110
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1002148;//jslker.Parent:2148
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1002197;//jslker.Parent:2197
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002089;//jslker.Parent:2089
      if (_this.canvas) {
        $LASTPOS=1002110;//jslker.Parent:2110
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1002148;//jslker.Parent:2148
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1002197;//jslker.Parent:2197
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002275;//jslker.Parent:2275
      if (_this.canvas) {
        $LASTPOS=1002296;//jslker.Parent:2296
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1002334;//jslker.Parent:2334
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002275;//jslker.Parent:2275
      if (_this.canvas) {
        $LASTPOS=1002296;//jslker.Parent:2296
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1002334;//jslker.Parent:2334
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    getNumber :function _trc_Parent_getNumber(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002445;//jslker.Parent:2445
      _this.val=$("[name="+elem+"]").val();
      return _this.val-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002445;//jslker.Parent:2445
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002575;//jslker.Parent:2575
      _this.val=$("[name="+elem+"]").val();
      return _this.val;
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002575;//jslker.Parent:2575
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val;return;
      
      
      _thread.retVal=_this;return;
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002713;//jslker.Parent:2713
      $("[name="+elem+"]").text(num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002713;//jslker.Parent:2713
      $("[name="+elem+"]").text(num);
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002783;//jslker.Parent:2783
      $("[name="+elem+"]").attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002783;//jslker.Parent:2783
      $("[name="+elem+"]").attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002852;//jslker.Parent:2852
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002852;//jslker.Parent:2852
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002977;//jslker.Parent:2977
      console.log(scaleX,scaleY);
      $LASTPOS=1003010;//jslker.Parent:3010
      if (! scaleX) {
        $LASTPOS=1003032;//jslker.Parent:3032
        scaleX=1;
        $LASTPOS=1003051;//jslker.Parent:3051
        scaleY=1;
        
      } else {
        $LASTPOS=1003072;//jslker.Parent:3072
        if (! scaleY) {
          $LASTPOS=1003094;//jslker.Parent:3094
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1003121;//jslker.Parent:3121
      console.log(scaleX,scaleY);
      $LASTPOS=1003154;//jslker.Parent:3154
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002977;//jslker.Parent:2977
      console.log(scaleX,scaleY);
      $LASTPOS=1003010;//jslker.Parent:3010
      if (! scaleX) {
        $LASTPOS=1003032;//jslker.Parent:3032
        scaleX=1;
        $LASTPOS=1003051;//jslker.Parent:3051
        scaleY=1;
        
      } else {
        $LASTPOS=1003072;//jslker.Parent:3072
        if (! scaleY) {
          $LASTPOS=1003094;//jslker.Parent:3094
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1003121;//jslker.Parent:3121
      console.log(scaleX,scaleY);
      $LASTPOS=1003154;//jslker.Parent:3154
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003321;//jslker.Parent:3321
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003321;//jslker.Parent:3321
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003457;//jslker.Parent:3457
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003457;//jslker.Parent:3457
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1003588;//jslker.Parent:3588
      time=time||100;
      $LASTPOS=1003609;//jslker.Parent:3609
      t = null;
      $LASTPOS=1003629;//jslker.Parent:3629
      t.suspend();
      $LASTPOS=1003647;//jslker.Parent:3647
      setTimeout((function anonymous_3658() {
        
        $LASTPOS=1003672;//jslker.Parent:3672
        t.steps();
      }),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1003588;//jslker.Parent:3588
      time=time||100;
      $LASTPOS=1003609;//jslker.Parent:3609
      t = _thread;
      $LASTPOS=1003629;//jslker.Parent:3629
      t.suspend();
      $LASTPOS=1003647;//jslker.Parent:3647
      setTimeout((function anonymous_3658() {
        
        $LASTPOS=1003672;//jslker.Parent:3672
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
      
      $LASTPOS=1003782;//jslker.Parent:3782
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003782;//jslker.Parent:3782
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      $LASTPOS=1003855;//jslker.Parent:3855
      e = _this.document.createElement(elem);
      $LASTPOS=1003897;//jslker.Parent:3897
      e.setAttribute("name",n);
      $LASTPOS=1003929;//jslker.Parent:3929
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1003855;//jslker.Parent:3855
      e = _this.document.createElement(elem);
      $LASTPOS=1003897;//jslker.Parent:3897
      e.setAttribute("name",n);
      $LASTPOS=1003929;//jslker.Parent:3929
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003988;//jslker.Parent:3988
      if (_this.canvas) {
        $LASTPOS=1004009;//jslker.Parent:4009
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004047;//jslker.Parent:4047
        _this.ctx.save();
        $LASTPOS=1004068;//jslker.Parent:4068
        _this.ctx.beginPath();
        $LASTPOS=1004094;//jslker.Parent:4094
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1004131;//jslker.Parent:4131
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1004161;//jslker.Parent:4161
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1004213;//jslker.Parent:4213
        _this.ctx.fill();
        $LASTPOS=1004234;//jslker.Parent:4234
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003988;//jslker.Parent:3988
      if (_this.canvas) {
        $LASTPOS=1004009;//jslker.Parent:4009
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004047;//jslker.Parent:4047
        _this.ctx.save();
        $LASTPOS=1004068;//jslker.Parent:4068
        _this.ctx.beginPath();
        $LASTPOS=1004094;//jslker.Parent:4094
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1004131;//jslker.Parent:4131
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1004161;//jslker.Parent:4161
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1004213;//jslker.Parent:4213
        _this.ctx.fill();
        $LASTPOS=1004234;//jslker.Parent:4234
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004289;//jslker.Parent:4289
      if (_this.canvas) {
        $LASTPOS=1004310;//jslker.Parent:4310
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004348;//jslker.Parent:4348
        _this.ctx.beginPath();
        $LASTPOS=1004374;//jslker.Parent:4374
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1004402;//jslker.Parent:4402
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1004430;//jslker.Parent:4430
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004289;//jslker.Parent:4289
      if (_this.canvas) {
        $LASTPOS=1004310;//jslker.Parent:4310
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004348;//jslker.Parent:4348
        _this.ctx.beginPath();
        $LASTPOS=1004374;//jslker.Parent:4374
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1004402;//jslker.Parent:4402
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1004430;//jslker.Parent:4430
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004481;//jslker.Parent:4481
      if (_this.canvas) {
        $LASTPOS=1004502;//jslker.Parent:4502
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004540;//jslker.Parent:4540
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004481;//jslker.Parent:4481
      if (_this.canvas) {
        $LASTPOS=1004502;//jslker.Parent:4502
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004540;//jslker.Parent:4540
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004598;//jslker.Parent:4598
      if (_this.canvas) {
        $LASTPOS=1004619;//jslker.Parent:4619
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004657;//jslker.Parent:4657
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004598;//jslker.Parent:4598
      if (_this.canvas) {
        $LASTPOS=1004619;//jslker.Parent:4619
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004657;//jslker.Parent:4657
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004720;//jslker.Parent:4720
      _this.keyData=[];
      $LASTPOS=1004737;//jslker.Parent:4737
      _this.document.onkeydown=(function anonymous_4758(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1004781;//jslker.Parent:4781
        if (! e) {
          $LASTPOS=1004788;//jslker.Parent:4788
          e=window.event;
        }
        $LASTPOS=1004815;//jslker.Parent:4815
        key_code = e.keyCode;
        $LASTPOS=1004850;//jslker.Parent:4850
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1004919;//jslker.Parent:4919
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1004988;//jslker.Parent:4988
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1005026;//jslker.Parent:5026
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1005092;//jslker.Parent:5092
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1005129;//jslker.Parent:5129
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1005192;//jslker.Parent:5192
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1005228;//jslker.Parent:5228
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1005290;//jslker.Parent:5290
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1005323;//jslker.Parent:5323
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1005381;//jslker.Parent:5381
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1005412;//jslker.Parent:5412
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1005476;//jslker.Parent:5476
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1005510;//jslker.Parent:5510
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1005572;//jslker.Parent:5572
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1005605;//jslker.Parent:5605
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1005651;//jslker.Parent:5651
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
      $LASTPOS=1005816;//jslker.Parent:5816
      _this.document.onkeyup=(function anonymous_5835(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1005858;//jslker.Parent:5858
        if (! e) {
          $LASTPOS=1005865;//jslker.Parent:5865
          e=window.event;
        }
        $LASTPOS=1005892;//jslker.Parent:5892
        key_code = e.keyCode;
        $LASTPOS=1005927;//jslker.Parent:5927
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1005996;//jslker.Parent:5996
        if (e.keyCode==16) {
          $LASTPOS=1006014;//jslker.Parent:6014
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1006052;//jslker.Parent:6052
          if (e.keyCode==17) {
            $LASTPOS=1006070;//jslker.Parent:6070
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1006107;//jslker.Parent:6107
            if (e.keyCode==18) {
              $LASTPOS=1006125;//jslker.Parent:6125
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1006161;//jslker.Parent:6161
              if (e.keyCode==37) {
                $LASTPOS=1006179;//jslker.Parent:6179
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1006212;//jslker.Parent:6212
                if (e.keyCode==38) {
                  $LASTPOS=1006230;//jslker.Parent:6230
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1006261;//jslker.Parent:6261
                  if (e.keyCode==39) {
                    $LASTPOS=1006279;//jslker.Parent:6279
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1006313;//jslker.Parent:6313
                    if (e.keyCode==40) {
                      $LASTPOS=1006331;//jslker.Parent:6331
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1006364;//jslker.Parent:6364
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
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"setInterval":{"nowait":false},"setTimeout":{"nowait":false},"catchException":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"new":{"nowait":false},"getkey":{"nowait":false},"dist":{"nowait":false},"sqrt":{"nowait":false},"sin":{"nowait":false},"cos":{"nowait":false},"tan":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map