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
        $LASTPOS=1001053;//jslker.Parent:1053
        $("body").on("touchmove",(function anonymous_1078(e) {
          
          $LASTPOS=1001104;//jslker.Parent:1104
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1001234;//jslker.Parent:1234
        $("body").on("touchend",(function anonymous_1258(e) {
          
          $LASTPOS=1001284;//jslker.Parent:1284
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1001413;//jslker.Parent:1413
        $("body").on("mousedown",(function anonymous_1438(e) {
          
          $LASTPOS=1001464;//jslker.Parent:1464
          _this.down=true;
          $LASTPOS=1001488;//jslker.Parent:1488
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1001541;//jslker.Parent:1541
        $("body").on("mousemove",(function anonymous_1566(e) {
          
          $LASTPOS=1001592;//jslker.Parent:1592
          if (_this.down) {
            $LASTPOS=1001601;//jslker.Parent:1601
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1001653;//jslker.Parent:1653
        $("body").on("mouseup",(function anonymous_1676(e) {
          
          $LASTPOS=1001702;//jslker.Parent:1702
          _this.down=false;
          $LASTPOS=1001727;//jslker.Parent:1727
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
        $LASTPOS=1001053;//jslker.Parent:1053
        $("body").on("touchmove",(function anonymous_1078(e) {
          
          $LASTPOS=1001104;//jslker.Parent:1104
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=1001234;//jslker.Parent:1234
        $("body").on("touchend",(function anonymous_1258(e) {
          
          $LASTPOS=1001284;//jslker.Parent:1284
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=1001413;//jslker.Parent:1413
        $("body").on("mousedown",(function anonymous_1438(e) {
          
          $LASTPOS=1001464;//jslker.Parent:1464
          _this.down=true;
          $LASTPOS=1001488;//jslker.Parent:1488
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=1001541;//jslker.Parent:1541
        $("body").on("mousemove",(function anonymous_1566(e) {
          
          $LASTPOS=1001592;//jslker.Parent:1592
          if (_this.down) {
            $LASTPOS=1001601;//jslker.Parent:1601
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=1001653;//jslker.Parent:1653
        $("body").on("mouseup",(function anonymous_1676(e) {
          
          $LASTPOS=1001702;//jslker.Parent:1702
          _this.down=false;
          $LASTPOS=1001727;//jslker.Parent:1727
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001854;//jslker.Parent:1854
      _this.canvas=$("[name="+canv+"]")[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001854;//jslker.Parent:1854
      _this.canvas=$("[name="+canv+"]")[0];
      
      _thread.retVal=_this;return;
    },
    setColor :function _trc_Parent_setColor(r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001913;//jslker.Parent:1913
      if (_this.canvas) {
        $LASTPOS=1001934;//jslker.Parent:1934
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001972;//jslker.Parent:1972
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1002021;//jslker.Parent:2021
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001913;//jslker.Parent:1913
      if (_this.canvas) {
        $LASTPOS=1001934;//jslker.Parent:1934
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001972;//jslker.Parent:1972
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1002021;//jslker.Parent:2021
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002099;//jslker.Parent:2099
      if (_this.canvas) {
        $LASTPOS=1002120;//jslker.Parent:2120
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1002158;//jslker.Parent:2158
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002099;//jslker.Parent:2099
      if (_this.canvas) {
        $LASTPOS=1002120;//jslker.Parent:2120
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1002158;//jslker.Parent:2158
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    getNumber :function _trc_Parent_getNumber(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002269;//jslker.Parent:2269
      _this.val=$("[name="+elem+"]").val();
      return _this.val-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002269;//jslker.Parent:2269
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002399;//jslker.Parent:2399
      _this.val=$("[name="+elem+"]").val();
      return _this.val;
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002399;//jslker.Parent:2399
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val;return;
      
      
      _thread.retVal=_this;return;
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002537;//jslker.Parent:2537
      $("[name="+elem+"]").text(num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002537;//jslker.Parent:2537
      $("[name="+elem+"]").text(num);
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002607;//jslker.Parent:2607
      $("[name="+elem+"]").attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002607;//jslker.Parent:2607
      $("[name="+elem+"]").attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002676;//jslker.Parent:2676
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002676;//jslker.Parent:2676
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002801;//jslker.Parent:2801
      console.log(scaleX,scaleY);
      $LASTPOS=1002834;//jslker.Parent:2834
      if (! scaleX) {
        $LASTPOS=1002856;//jslker.Parent:2856
        scaleX=1;
        $LASTPOS=1002875;//jslker.Parent:2875
        scaleY=1;
        
      } else {
        $LASTPOS=1002896;//jslker.Parent:2896
        if (! scaleY) {
          $LASTPOS=1002918;//jslker.Parent:2918
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1002945;//jslker.Parent:2945
      console.log(scaleX,scaleY);
      $LASTPOS=1002978;//jslker.Parent:2978
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002801;//jslker.Parent:2801
      console.log(scaleX,scaleY);
      $LASTPOS=1002834;//jslker.Parent:2834
      if (! scaleX) {
        $LASTPOS=1002856;//jslker.Parent:2856
        scaleX=1;
        $LASTPOS=1002875;//jslker.Parent:2875
        scaleY=1;
        
      } else {
        $LASTPOS=1002896;//jslker.Parent:2896
        if (! scaleY) {
          $LASTPOS=1002918;//jslker.Parent:2918
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1002945;//jslker.Parent:2945
      console.log(scaleX,scaleY);
      $LASTPOS=1002978;//jslker.Parent:2978
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003145;//jslker.Parent:3145
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003145;//jslker.Parent:3145
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003281;//jslker.Parent:3281
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003281;//jslker.Parent:3281
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1003412;//jslker.Parent:3412
      time=time||100;
      $LASTPOS=1003433;//jslker.Parent:3433
      t = null;
      $LASTPOS=1003453;//jslker.Parent:3453
      t.suspend();
      $LASTPOS=1003471;//jslker.Parent:3471
      setTimeout((function anonymous_3482() {
        
        $LASTPOS=1003496;//jslker.Parent:3496
        t.steps();
      }),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1003412;//jslker.Parent:3412
      time=time||100;
      $LASTPOS=1003433;//jslker.Parent:3433
      t = _thread;
      $LASTPOS=1003453;//jslker.Parent:3453
      t.suspend();
      $LASTPOS=1003471;//jslker.Parent:3471
      setTimeout((function anonymous_3482() {
        
        $LASTPOS=1003496;//jslker.Parent:3496
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
      
      $LASTPOS=1003606;//jslker.Parent:3606
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003606;//jslker.Parent:3606
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      $LASTPOS=1003679;//jslker.Parent:3679
      e = _this.document.createElement(elem);
      $LASTPOS=1003721;//jslker.Parent:3721
      e.setAttribute("name",n);
      $LASTPOS=1003753;//jslker.Parent:3753
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1003679;//jslker.Parent:3679
      e = _this.document.createElement(elem);
      $LASTPOS=1003721;//jslker.Parent:3721
      e.setAttribute("name",n);
      $LASTPOS=1003753;//jslker.Parent:3753
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1003812;//jslker.Parent:3812
      if (_this.canvas) {
        $LASTPOS=1003833;//jslker.Parent:3833
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1003871;//jslker.Parent:3871
        _this.ctx.save();
        $LASTPOS=1003892;//jslker.Parent:3892
        _this.ctx.beginPath();
        $LASTPOS=1003918;//jslker.Parent:3918
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1003955;//jslker.Parent:3955
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1003985;//jslker.Parent:3985
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1004037;//jslker.Parent:4037
        _this.ctx.fill();
        $LASTPOS=1004058;//jslker.Parent:4058
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003812;//jslker.Parent:3812
      if (_this.canvas) {
        $LASTPOS=1003833;//jslker.Parent:3833
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1003871;//jslker.Parent:3871
        _this.ctx.save();
        $LASTPOS=1003892;//jslker.Parent:3892
        _this.ctx.beginPath();
        $LASTPOS=1003918;//jslker.Parent:3918
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1003955;//jslker.Parent:3955
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1003985;//jslker.Parent:3985
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1004037;//jslker.Parent:4037
        _this.ctx.fill();
        $LASTPOS=1004058;//jslker.Parent:4058
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004113;//jslker.Parent:4113
      if (_this.canvas) {
        $LASTPOS=1004134;//jslker.Parent:4134
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004172;//jslker.Parent:4172
        _this.ctx.beginPath();
        $LASTPOS=1004198;//jslker.Parent:4198
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1004226;//jslker.Parent:4226
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1004254;//jslker.Parent:4254
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004113;//jslker.Parent:4113
      if (_this.canvas) {
        $LASTPOS=1004134;//jslker.Parent:4134
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004172;//jslker.Parent:4172
        _this.ctx.beginPath();
        $LASTPOS=1004198;//jslker.Parent:4198
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1004226;//jslker.Parent:4226
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1004254;//jslker.Parent:4254
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004305;//jslker.Parent:4305
      if (_this.canvas) {
        $LASTPOS=1004326;//jslker.Parent:4326
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004364;//jslker.Parent:4364
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004305;//jslker.Parent:4305
      if (_this.canvas) {
        $LASTPOS=1004326;//jslker.Parent:4326
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004364;//jslker.Parent:4364
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1004422;//jslker.Parent:4422
      if (_this.canvas) {
        $LASTPOS=1004443;//jslker.Parent:4443
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004481;//jslker.Parent:4481
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1004422;//jslker.Parent:4422
      if (_this.canvas) {
        $LASTPOS=1004443;//jslker.Parent:4443
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1004481;//jslker.Parent:4481
        _this.ctx.fillText(t,x,y);
        
      }
      
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
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"ex":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"getkey":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map