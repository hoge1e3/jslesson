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
    ex :function _trc_Parent_ex(f) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return (function anonymous_186() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000296;//jslker.Parent:296
          Tonyu.onRuntimeError(e);
          
        }
      });
    },
    fiber$ex :function _trc_Parent_f_ex(_thread,f) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(function anonymous_186() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=1000296;//jslker.Parent:296
          Tonyu.onRuntimeError(e);
          
        }
      });return;
      
      
      _thread.retVal=_this;return;
    },
    addText :function _trc_Parent_addText(elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000422;//jslker.Parent:422
      $("[name="+elem+"]").append(val);
    },
    fiber$addText :function _trc_Parent_f_addText(_thread,elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000422;//jslker.Parent:422
      $("[name="+elem+"]").append(val);
      
      _thread.retVal=_this;return;
    },
    setText :function _trc_Parent_setText(elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000537;//jslker.Parent:537
      $("[name="+elem+"]").text(val);
    },
    fiber$setText :function _trc_Parent_f_setText(_thread,elem,val) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000537;//jslker.Parent:537
      $("[name="+elem+"]").text(val);
      
      _thread.retVal=_this;return;
    },
    onClick :function _trc_Parent_onClick(elem,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000599;//jslker.Parent:599
      if (typeof  func!='function') {
        throw new Error("onClickの二つ目の引数には 関数名 を \" \"をつけずに書いてください");
        
        
      }
      $LASTPOS=1000769;//jslker.Parent:769
      $("[name="+elem+"]").click(_this.ex(func));
    },
    fiber$onClick :function _trc_Parent_f_onClick(_thread,elem,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000599;//jslker.Parent:599
      if (typeof  func!='function') {
        throw new Error("onClickの二つ目の引数には 関数名 を \" \"をつけずに書いてください");
        
        
      }
      $LASTPOS=1000769;//jslker.Parent:769
      $("[name="+elem+"]").click(_this.ex(func));
      
      _thread.retVal=_this;return;
    },
    onTouch :function _trc_Parent_onTouch(func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000832;//jslker.Parent:832
      if (typeof  func=="function") {
        $LASTPOS=1000870;//jslker.Parent:870
        $("body").on("touchstart",(function anonymous_896(e) {
          
          $LASTPOS=1000922;//jslker.Parent:922
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1001039;//jslker.Parent:1039
        $("body").on("touchmove",(function anonymous_1064(e) {
          
          $LASTPOS=1001090;//jslker.Parent:1090
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1001206;//jslker.Parent:1206
        $("body").on("touchend",(function anonymous_1230(e) {
          
          $LASTPOS=1001256;//jslker.Parent:1256
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1001371;//jslker.Parent:1371
        $("body").on("mousedown",(function anonymous_1396(e) {
          
          $LASTPOS=1001422;//jslker.Parent:1422
          _this.down=true;
          $LASTPOS=1001446;//jslker.Parent:1446
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1001499;//jslker.Parent:1499
        $("body").on("mousemove",(function anonymous_1524(e) {
          
          $LASTPOS=1001550;//jslker.Parent:1550
          if (_this.down) {
            $LASTPOS=1001559;//jslker.Parent:1559
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1001611;//jslker.Parent:1611
        $("body").on("mouseup",(function anonymous_1634(e) {
          
          $LASTPOS=1001660;//jslker.Parent:1660
          _this.down=false;
          $LASTPOS=1001685;//jslker.Parent:1685
          func(e.pageX,e.pageY,"end");
        }));
        
      }
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000832;//jslker.Parent:832
      if (typeof  func=="function") {
        $LASTPOS=1000870;//jslker.Parent:870
        $("body").on("touchstart",(function anonymous_896(e) {
          
          $LASTPOS=1000922;//jslker.Parent:922
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=1001039;//jslker.Parent:1039
        $("body").on("touchmove",(function anonymous_1064(e) {
          
          $LASTPOS=1001090;//jslker.Parent:1090
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1001206;//jslker.Parent:1206
        $("body").on("touchend",(function anonymous_1230(e) {
          
          $LASTPOS=1001256;//jslker.Parent:1256
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1001371;//jslker.Parent:1371
        $("body").on("mousedown",(function anonymous_1396(e) {
          
          $LASTPOS=1001422;//jslker.Parent:1422
          _this.down=true;
          $LASTPOS=1001446;//jslker.Parent:1446
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1001499;//jslker.Parent:1499
        $("body").on("mousemove",(function anonymous_1524(e) {
          
          $LASTPOS=1001550;//jslker.Parent:1550
          if (_this.down) {
            $LASTPOS=1001559;//jslker.Parent:1559
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1001611;//jslker.Parent:1611
        $("body").on("mouseup",(function anonymous_1634(e) {
          
          $LASTPOS=1001660;//jslker.Parent:1660
          _this.down=false;
          $LASTPOS=1001685;//jslker.Parent:1685
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001812;//jslker.Parent:1812
      _this.canvas=$("[name="+canv+"]")[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001812;//jslker.Parent:1812
      _this.canvas=$("[name="+canv+"]")[0];
      
      _thread.retVal=_this;return;
    },
    setColor :function _trc_Parent_setColor(r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001871;//jslker.Parent:1871
      if (_this.canvas) {
        $LASTPOS=1001892;//jslker.Parent:1892
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001930;//jslker.Parent:1930
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1001979;//jslker.Parent:1979
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001871;//jslker.Parent:1871
      if (_this.canvas) {
        $LASTPOS=1001892;//jslker.Parent:1892
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001930;//jslker.Parent:1930
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1001979;//jslker.Parent:1979
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002057;//jslker.Parent:2057
      if (_this.canvas) {
        $LASTPOS=1002078;//jslker.Parent:2078
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1002116;//jslker.Parent:2116
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002057;//jslker.Parent:2057
      if (_this.canvas) {
        $LASTPOS=1002078;//jslker.Parent:2078
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1002116;//jslker.Parent:2116
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    getNumber :function _trc_Parent_getNumber(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002227;//jslker.Parent:2227
      _this.val=$("[name="+elem+"]").val();
      return _this.val-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002227;//jslker.Parent:2227
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002357;//jslker.Parent:2357
      _this.val=$("[name="+elem+"]").val();
      return _this.val;
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002357;//jslker.Parent:2357
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val;return;
      
      
      _thread.retVal=_this;return;
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002495;//jslker.Parent:2495
      $("[name="+elem+"]").text(num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002495;//jslker.Parent:2495
      $("[name="+elem+"]").text(num);
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002565;//jslker.Parent:2565
      $("[name="+elem+"]").attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002565;//jslker.Parent:2565
      $("[name="+elem+"]").attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002634;//jslker.Parent:2634
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002634;//jslker.Parent:2634
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002759;//jslker.Parent:2759
      console.log(scaleX,scaleY);
      $LASTPOS=1002792;//jslker.Parent:2792
      if (! scaleX) {
        $LASTPOS=1002814;//jslker.Parent:2814
        scaleX=1;
        $LASTPOS=1002833;//jslker.Parent:2833
        scaleY=1;
        
      } else {
        $LASTPOS=1002854;//jslker.Parent:2854
        if (! scaleY) {
          $LASTPOS=1002876;//jslker.Parent:2876
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1002903;//jslker.Parent:2903
      console.log(scaleX,scaleY);
      $LASTPOS=1002936;//jslker.Parent:2936
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002759;//jslker.Parent:2759
      console.log(scaleX,scaleY);
      $LASTPOS=1002792;//jslker.Parent:2792
      if (! scaleX) {
        $LASTPOS=1002814;//jslker.Parent:2814
        scaleX=1;
        $LASTPOS=1002833;//jslker.Parent:2833
        scaleY=1;
        
      } else {
        $LASTPOS=1002854;//jslker.Parent:2854
        if (! scaleY) {
          $LASTPOS=1002876;//jslker.Parent:2876
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1002903;//jslker.Parent:2903
      console.log(scaleX,scaleY);
      $LASTPOS=1002936;//jslker.Parent:2936
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003093;//jslker.Parent:3093
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003093;//jslker.Parent:3093
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003219;//jslker.Parent:3219
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003219;//jslker.Parent:3219
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1003340;//jslker.Parent:3340
      time=time||100;
      $LASTPOS=1003361;//jslker.Parent:3361
      t = null;
      $LASTPOS=1003381;//jslker.Parent:3381
      t.suspend();
      $LASTPOS=1003399;//jslker.Parent:3399
      setTimeout((function anonymous_3410() {
        
        $LASTPOS=1003424;//jslker.Parent:3424
        t.steps();
      }),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1003340;//jslker.Parent:3340
      time=time||100;
      $LASTPOS=1003361;//jslker.Parent:3361
      t = _thread;
      $LASTPOS=1003381;//jslker.Parent:3381
      t.suspend();
      $LASTPOS=1003399;//jslker.Parent:3399
      setTimeout((function anonymous_3410() {
        
        $LASTPOS=1003424;//jslker.Parent:3424
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
      
      $LASTPOS=1003534;//jslker.Parent:3534
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003534;//jslker.Parent:3534
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    getkey :function _trc_Parent_getkey() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$getkey :function _trc_Parent_f_getkey(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"ex":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"getkey":{"nowait":false}}}
});
