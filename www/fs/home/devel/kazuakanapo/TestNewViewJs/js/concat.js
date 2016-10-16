Tonyu.klass.define({
  fullName: 'user.NewView',
  shortName: 'NewView',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_NewView_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var x;
      var y;
      var w;
      var h;
      var teki;
      
      $LASTPOS=1000014;//user.NewView:14
      _this.move("s",10,100);
      $LASTPOS=1000032;//user.NewView:32
      _this.newElement("canvas","added");
      $LASTPOS=1000062;//user.NewView:62
      _this.newElement("button","addedButton");
      $LASTPOS=1000098;//user.NewView:98
      _this.setText("addedButton","PUSHIT!");
      $LASTPOS=1000132;//user.NewView:132
      _this.setCanvas("added");
      $LASTPOS=1000152;//user.NewView:152
      _this.fillRect(50,50,20,20);
      $LASTPOS=1000175;//user.NewView:175
      _this.drawLine(5,5,40,40);
      $LASTPOS=1000196;//user.NewView:196
      _this.drawLine(10,2,40,10);
      $LASTPOS=1000218;//user.NewView:218
      _this.clearRect(0,0,100,100);
      $LASTPOS=1000242;//user.NewView:242
      _this.setColor(255,0,0);
      $LASTPOS=1000261;//user.NewView:261
      _this.fillText("Test Canvas",50,50);
      $LASTPOS=1000292;//user.NewView:292
      _this.fillRect(0,0,500,500);
      $LASTPOS=1000315;//user.NewView:315
      x = 0;y = 0;w = 60;h = 20;
      $LASTPOS=1000338;//user.NewView:338
      _this.clearRect(x,y,w,h);
      $LASTPOS=1000358;//user.NewView:358
      _this.fillOval(x,y,w,h);
      $LASTPOS=1000377;//user.NewView:377
      _this.onClick("addedButton",Tonyu.bindFunc(_this,_this.test));
      $LASTPOS=1000522;//user.NewView:522
      _this.document.forms.peach.cider.value="PEACHCIDER!";
      $LASTPOS=1000571;//user.NewView:571
      teki = _this.document.getElementById("tekitou");
      $LASTPOS=1000616;//user.NewView:616
      teki.setAttribute("data-teki","20");
      $LASTPOS=1000653;//user.NewView:653
      _this.setText("s",teki.getAttribute("data-teki"));
    },
    fiber$main :function _trc_NewView_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var x;
      var y;
      var w;
      var h;
      var teki;
      
      
      _thread.enter(function _trc_NewView_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000014;//user.NewView:14
            _this.fiber$move(_thread, "s", 10, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000032;//user.NewView:32
            _this.fiber$newElement(_thread, "canvas", "added");
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000062;//user.NewView:62
            _this.fiber$newElement(_thread, "button", "addedButton");
            __pc=3;return;
          case 3:
            
            $LASTPOS=1000098;//user.NewView:98
            _this.fiber$setText(_thread, "addedButton", "PUSHIT!");
            __pc=4;return;
          case 4:
            
            $LASTPOS=1000132;//user.NewView:132
            _this.fiber$setCanvas(_thread, "added");
            __pc=5;return;
          case 5:
            
            $LASTPOS=1000152;//user.NewView:152
            _this.fiber$fillRect(_thread, 50, 50, 20, 20);
            __pc=6;return;
          case 6:
            
            $LASTPOS=1000175;//user.NewView:175
            _this.fiber$drawLine(_thread, 5, 5, 40, 40);
            __pc=7;return;
          case 7:
            
            $LASTPOS=1000196;//user.NewView:196
            _this.fiber$drawLine(_thread, 10, 2, 40, 10);
            __pc=8;return;
          case 8:
            
            $LASTPOS=1000218;//user.NewView:218
            _this.fiber$clearRect(_thread, 0, 0, 100, 100);
            __pc=9;return;
          case 9:
            
            $LASTPOS=1000242;//user.NewView:242
            _this.fiber$setColor(_thread, 255, 0, 0);
            __pc=10;return;
          case 10:
            
            $LASTPOS=1000261;//user.NewView:261
            _this.fiber$fillText(_thread, "Test Canvas", 50, 50);
            __pc=11;return;
          case 11:
            
            $LASTPOS=1000292;//user.NewView:292
            _this.fiber$fillRect(_thread, 0, 0, 500, 500);
            __pc=12;return;
          case 12:
            
            $LASTPOS=1000315;//user.NewView:315
            x = 0;y = 0;w = 60;h = 20;
            $LASTPOS=1000338;//user.NewView:338
            _this.fiber$clearRect(_thread, x, y, w, h);
            __pc=13;return;
          case 13:
            
            $LASTPOS=1000358;//user.NewView:358
            _this.fiber$fillOval(_thread, x, y, w, h);
            __pc=14;return;
          case 14:
            
            $LASTPOS=1000377;//user.NewView:377
            _this.fiber$onClick(_thread, "addedButton", Tonyu.bindFunc(_this,_this.test));
            __pc=15;return;
          case 15:
            
            $LASTPOS=1000522;//user.NewView:522
            _this.document.forms.peach.cider.value="PEACHCIDER!";
            $LASTPOS=1000571;//user.NewView:571
            teki = _this.document.getElementById("tekitou");
            $LASTPOS=1000616;//user.NewView:616
            teki.setAttribute("data-teki","20");
            $LASTPOS=1000653;//user.NewView:653
            _this.fiber$setText(_thread, "s", teki.getAttribute("data-teki"));
            __pc=16;return;
          case 16:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    test :function _trc_NewView_test() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000427;//user.NewView:427
      _this.move("addedButton",10,200);
    },
    fiber$test :function _trc_NewView_f_test(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NewView_ent_test(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000427;//user.NewView:427
            _this.fiber$move(_thread, "addedButton", 10, 200);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    newElement :function _trc_NewView_newElement(elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      $LASTPOS=1000724;//user.NewView:724
      e = _this.document.createElement(elem);
      $LASTPOS=1000765;//user.NewView:765
      e.setAttribute("name",n);
      $LASTPOS=1000796;//user.NewView:796
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_NewView_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=1000724;//user.NewView:724
      e = _this.document.createElement(elem);
      $LASTPOS=1000765;//user.NewView:765
      e.setAttribute("name",n);
      $LASTPOS=1000796;//user.NewView:796
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_NewView_fillOval(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000852;//user.NewView:852
      if (_this.canvas) {
        $LASTPOS=1000872;//user.NewView:872
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1000909;//user.NewView:909
        _this.ctx.save();
        $LASTPOS=1000929;//user.NewView:929
        _this.ctx.beginPath();
        $LASTPOS=1000954;//user.NewView:954
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1000990;//user.NewView:990
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1001019;//user.NewView:1019
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1001070;//user.NewView:1070
        _this.ctx.fill();
        $LASTPOS=1001090;//user.NewView:1090
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_NewView_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000852;//user.NewView:852
      if (_this.canvas) {
        $LASTPOS=1000872;//user.NewView:872
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1000909;//user.NewView:909
        _this.ctx.save();
        $LASTPOS=1000929;//user.NewView:929
        _this.ctx.beginPath();
        $LASTPOS=1000954;//user.NewView:954
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=1000990;//user.NewView:990
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=1001019;//user.NewView:1019
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=1001070;//user.NewView:1070
        _this.ctx.fill();
        $LASTPOS=1001090;//user.NewView:1090
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_NewView_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001141;//user.NewView:1141
      if (_this.canvas) {
        $LASTPOS=1001161;//user.NewView:1161
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001198;//user.NewView:1198
        _this.ctx.beginPath();
        $LASTPOS=1001223;//user.NewView:1223
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1001250;//user.NewView:1250
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1001277;//user.NewView:1277
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_NewView_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001141;//user.NewView:1141
      if (_this.canvas) {
        $LASTPOS=1001161;//user.NewView:1161
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001198;//user.NewView:1198
        _this.ctx.beginPath();
        $LASTPOS=1001223;//user.NewView:1223
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=1001250;//user.NewView:1250
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=1001277;//user.NewView:1277
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_NewView_clearRect(x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001324;//user.NewView:1324
      if (_this.canvas) {
        $LASTPOS=1001344;//user.NewView:1344
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001381;//user.NewView:1381
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_NewView_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001324;//user.NewView:1324
      if (_this.canvas) {
        $LASTPOS=1001344;//user.NewView:1344
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001381;//user.NewView:1381
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_NewView_fillText(t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001435;//user.NewView:1435
      if (_this.canvas) {
        $LASTPOS=1001455;//user.NewView:1455
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001492;//user.NewView:1492
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_NewView_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001435;//user.NewView:1435
      if (_this.canvas) {
        $LASTPOS=1001455;//user.NewView:1455
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001492;//user.NewView:1492
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"test":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.Test',
  shortName: 'Test',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Test_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var s;
      
      $LASTPOS=2000035;//user.Test:35
      _this.x=100;
      $LASTPOS=2000042;//user.Test:42
      _this.y=100;
      $LASTPOS=2000148;//user.Test:148
      while (true) {
        $LASTPOS=2000165;//user.Test:165
        s = _this.document.getElementsByName("neko")[0].style;
        $LASTPOS=2000220;//user.Test:220
        s.position="absolute";
        $LASTPOS=2000247;//user.Test:247
        s.top=_this.y;
        $LASTPOS=2000260;//user.Test:260
        s.left=_this.x;
        $LASTPOS=2000274;//user.Test:274
        _this.x+=5;
        $LASTPOS=2000284;//user.Test:284
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Test_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      
      $LASTPOS=2000035;//user.Test:35
      _this.x=100;
      $LASTPOS=2000042;//user.Test:42
      _this.y=100;
      
      _thread.enter(function _trc_Test_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000148;//user.Test:148
          case 1:
            $LASTPOS=2000165;//user.Test:165
            s = _this.document.getElementsByName("neko")[0].style;
            $LASTPOS=2000220;//user.Test:220
            s.position="absolute";
            $LASTPOS=2000247;//user.Test:247
            s.top=_this.y;
            $LASTPOS=2000260;//user.Test:260
            s.left=_this.x;
            $LASTPOS=2000274;//user.Test:274
            _this.x+=5;
            $LASTPOS=2000284;//user.Test:284
            _this.fiber$wait(_thread, 50);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.HTML01',
  shortName: 'HTML01',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_HTML01_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_HTML01_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map