Tonyu.klass.define({
  fullName: 'user.Foo',
  shortName: 'Foo',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Foo_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000047;//user.Foo:47
      _this.ra=$("#runArea");
      $LASTPOS=1000066;//user.Foo:66
      _this.ra.empty();
      $LASTPOS=1000079;//user.Foo:79
      _this.x=3;
      $LASTPOS=1000085;//user.Foo:85
      _this.y=5;
      $LASTPOS=1000091;//user.Foo:91
      $("<div>").text(_this.x+_this.y).appendTo(_this.ra);
      $LASTPOS=1000127;//user.Foo:127
      _this.cv=$("<canvas>").attr({width: 300,height: 300}).appendTo(_this.ra);
      $LASTPOS=1000187;//user.Foo:187
      _this.c=_this.cv[0].getContext("2d");
    },
    fiber$main :function _trc_Foo_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000047;//user.Foo:47
      _this.ra=$("#runArea");
      $LASTPOS=1000066;//user.Foo:66
      _this.ra.empty();
      $LASTPOS=1000079;//user.Foo:79
      _this.x=3;
      $LASTPOS=1000085;//user.Foo:85
      _this.y=5;
      $LASTPOS=1000091;//user.Foo:91
      $("<div>").text(_this.x+_this.y).appendTo(_this.ra);
      $LASTPOS=1000127;//user.Foo:127
      _this.cv=$("<canvas>").attr({width: 300,height: 300}).appendTo(_this.ra);
      $LASTPOS=1000187;//user.Foo:187
      _this.c=_this.cv[0].getContext("2d");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.HTMLTest',
  shortName: 'HTMLTest',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_HTMLTest_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000109;//user.HTMLTest:109
      _this.y=0;
      $LASTPOS=2000114;//user.HTMLTest:114
      _this.vy=0;
      $LASTPOS=2000120;//user.HTMLTest:120
      _this.setText("mesg","Hello");
      $LASTPOS=2000145;//user.HTMLTest:145
      $LASTPOS=2000150;//user.HTMLTest:150
      _this.i=0;
      while(_this.i<50) {
        {
          $LASTPOS=2000259;//user.HTMLTest:259
          _this.move("image",_this.i,_this.y);
          $LASTPOS=2000282;//user.HTMLTest:282
          _this.transform("image",_this.i*3);
          $LASTPOS=2000436;//user.HTMLTest:436
          _this.y+=_this.vy;
          $LASTPOS=2000447;//user.HTMLTest:447
          if (_this.i%100==0) {
            $LASTPOS=2000469;//user.HTMLTest:469
            _this.vy=- _this.vy;
            $LASTPOS=2000485;//user.HTMLTest:485
            _this.addText("mesg","!");
            
          }
          $LASTPOS=2000516;//user.HTMLTest:516
          _this.vy+=0.1;
          $LASTPOS=2000529;//user.HTMLTest:529
          _this.wait(20);
        }
        _this.i++;
      }
      $LASTPOS=2000541;//user.HTMLTest:541
      _this.setText("mesg","fin");
    },
    fiber$main :function _trc_HTMLTest_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000109;//user.HTMLTest:109
      _this.y=0;
      $LASTPOS=2000114;//user.HTMLTest:114
      _this.vy=0;
      
      _thread.enter(function _trc_HTMLTest_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000120;//user.HTMLTest:120
            _this.fiber$setText(_thread, "mesg", "Hello");
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000145;//user.HTMLTest:145
            $LASTPOS=2000150;//user.HTMLTest:150
            _this.i=0;;
          case 2:
            if (!(_this.i<50)) { __pc=8; break; }
            $LASTPOS=2000259;//user.HTMLTest:259
            _this.fiber$move(_thread, "image", _this.i, _this.y);
            __pc=3;return;
          case 3:
            
            $LASTPOS=2000282;//user.HTMLTest:282
            _this.fiber$transform(_thread, "image", _this.i*3);
            __pc=4;return;
          case 4:
            
            $LASTPOS=2000436;//user.HTMLTest:436
            _this.y+=_this.vy;
            $LASTPOS=2000447;//user.HTMLTest:447
            if (!(_this.i%100==0)) { __pc=6; break; }
            $LASTPOS=2000469;//user.HTMLTest:469
            _this.vy=- _this.vy;
            $LASTPOS=2000485;//user.HTMLTest:485
            _this.fiber$addText(_thread, "mesg", "!");
            __pc=5;return;
          case 5:
            
          case 6:
            
            $LASTPOS=2000516;//user.HTMLTest:516
            _this.vy+=0.1;
            $LASTPOS=2000529;//user.HTMLTest:529
            _this.fiber$wait(_thread, 20);
            __pc=7;return;
          case 7:
            
            _this.i++;
            __pc=2;break;
          case 8:
            
            $LASTPOS=2000541;//user.HTMLTest:541
            _this.fiber$setText(_thread, "mesg", "fin");
            __pc=9;return;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Konnafuuni',
  shortName: 'Konnafuuni',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Konnafuuni_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000015;//user.Konnafuuni:15
      _this.addText("message","Hello");
      $LASTPOS=3000062;//user.Konnafuuni:62
      _this.onClick("calc",Tonyu.bindFunc(_this,_this.calc));
      $LASTPOS=3000098;//user.Konnafuuni:98
      _this.onTouch("c",Tonyu.bindFunc(_this,_this.rect));
      $LASTPOS=3000325;//user.Konnafuuni:325
      _this.setCanvas("mycanvas");
      $LASTPOS=3000395;//user.Konnafuuni:395
      _this.setColor(255,0,0);
      $LASTPOS=3000414;//user.Konnafuuni:414
      _this.fillRect(10,20,30,50);
      $LASTPOS=3000438;//user.Konnafuuni:438
      _this.setColor(0,255,0);
      $LASTPOS=3000457;//user.Konnafuuni:457
      _this.fillRect(100,100,20,30);
    },
    fiber$main :function _trc_Konnafuuni_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Konnafuuni_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000015;//user.Konnafuuni:15
            _this.fiber$addText(_thread, "message", "Hello");
            __pc=1;return;
          case 1:
            
            $LASTPOS=3000062;//user.Konnafuuni:62
            _this.fiber$onClick(_thread, "calc", Tonyu.bindFunc(_this,_this.calc));
            __pc=2;return;
          case 2:
            
            $LASTPOS=3000098;//user.Konnafuuni:98
            _this.fiber$onTouch(_thread, "c", Tonyu.bindFunc(_this,_this.rect));
            __pc=3;return;
          case 3:
            
            $LASTPOS=3000325;//user.Konnafuuni:325
            _this.fiber$setCanvas(_thread, "mycanvas");
            __pc=4;return;
          case 4:
            
            $LASTPOS=3000395;//user.Konnafuuni:395
            _this.fiber$setColor(_thread, 255, 0, 0);
            __pc=5;return;
          case 5:
            
            $LASTPOS=3000414;//user.Konnafuuni:414
            _this.fiber$fillRect(_thread, 10, 20, 30, 50);
            __pc=6;return;
          case 6:
            
            $LASTPOS=3000438;//user.Konnafuuni:438
            _this.fiber$setColor(_thread, 0, 255, 0);
            __pc=7;return;
          case 7:
            
            $LASTPOS=3000457;//user.Konnafuuni:457
            _this.fiber$fillRect(_thread, 100, 100, 20, 30);
            __pc=8;return;
          case 8:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    rect :function _trc_Konnafuuni_rect(x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000141;//user.Konnafuuni:141
      _this.fillRect(100,20,50,50);
      $LASTPOS=3000169;//user.Konnafuuni:169
      _this.addText("message",x);
    },
    fiber$rect :function _trc_Konnafuuni_f_rect(_thread,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Konnafuuni_ent_rect(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000141;//user.Konnafuuni:141
            _this.fiber$fillRect(_thread, 100, 20, 50, 50);
            __pc=1;return;
          case 1:
            
            $LASTPOS=3000169;//user.Konnafuuni:169
            _this.fiber$addText(_thread, "message", x);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    calc :function _trc_Konnafuuni_calc() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000215;//user.Konnafuuni:215
      _this.a=_this.getNumber("a");
      $LASTPOS=3000255;//user.Konnafuuni:255
      _this.b=_this.getNumber("b");
      $LASTPOS=3000277;//user.Konnafuuni:277
      _this.result=_this.a+_this.b;
      $LASTPOS=3000293;//user.Konnafuuni:293
      _this.setNumber("c",_this.result);
    },
    fiber$calc :function _trc_Konnafuuni_f_calc(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Konnafuuni_ent_calc(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000215;//user.Konnafuuni:215
            _this.fiber$getNumber(_thread, "a");
            __pc=1;return;
          case 1:
            _this.a=_thread.retVal;
            
            $LASTPOS=3000255;//user.Konnafuuni:255
            _this.fiber$getNumber(_thread, "b");
            __pc=2;return;
          case 2:
            _this.b=_thread.retVal;
            
            $LASTPOS=3000277;//user.Konnafuuni:277
            _this.result=_this.a+_this.b;
            $LASTPOS=3000293;//user.Konnafuuni:293
            _this.fiber$setNumber(_thread, "c", _this.result);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"rect":{"nowait":false},"calc":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Test',
  shortName: 'Test',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Test_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      $LASTPOS=4000043;//user.Test:43
      _this.ra=$("#runArea");
      $LASTPOS=4000075;//user.Test:75
      _this.x=3;
      $LASTPOS=4000080;//user.Test:80
      _this.y=5;
      $LASTPOS=4000085;//user.Test:85
      _this.inp=$("<input>").val("test").css({position: "absolute"});
      $LASTPOS=4000140;//user.Test:140
      $("<div>").text(_this.x+_this.y).appendTo(_this.ra).append(_this.inp);
      $LASTPOS=4000187;//user.Test:187
      _this.cv=$("<canvas>").attr({width: 300,height: 300}).appendTo(_this.ra);
      $LASTPOS=4000246;//user.Test:246
      _this.c=_this.cv[0].getContext("2d");
      $LASTPOS=4000273;//user.Test:273
      $LASTPOS=4000278;//user.Test:278
      i = 0;
      while(i<100) {
        {
          $LASTPOS=4000305;//user.Test:305
          _this.inp.css({left: i,top: i});
          $LASTPOS=4000332;//user.Test:332
          _this.wait(10);
        }
        i++;
      }
      $LASTPOS=4000353;//user.Test:353
      _this.c.fillRect(30,30,50,50);
      $LASTPOS=4000392;//user.Test:392
      _this.c.fillStyle="green";
      $LASTPOS=4000413;//user.Test:413
      _this.c.fillRect(30,30,100,50);
      $LASTPOS=4000439;//user.Test:439
      _this.wait(10);
      $LASTPOS=4000462;//user.Test:462
      _this.c.strokeStyle="blue";
      $LASTPOS=4000484;//user.Test:484
      _this.c.lineWidth=2;
      $LASTPOS=4000499;//user.Test:499
      _this.c.strokeRect(30,30,100,50);
      $LASTPOS=4000527;//user.Test:527
      _this.wait(1000);
      $LASTPOS=4000546;//user.Test:546
      $LASTPOS=4000550;//user.Test:550
      i=0;
      while(i<200) {
        {
          $LASTPOS=4000576;//user.Test:576
          _this.c.beginPath();
          $LASTPOS=4000595;//user.Test:595
          _this.c.moveTo(100,100);
          $LASTPOS=4000618;//user.Test:618
          _this.c.lineTo(150,200+i);
          $LASTPOS=4000643;//user.Test:643
          _this.c.stroke();
          $LASTPOS=4000659;//user.Test:659
          _this.wait(10);
        }
        i+=10;
      }
      $LASTPOS=4000682;//user.Test:682
      _this.c.beginPath();
      $LASTPOS=4000697;//user.Test:697
      _this.c.moveTo(200,200);
      $LASTPOS=4000716;//user.Test:716
      _this.c.lineTo(250,250);
      $LASTPOS=4000735;//user.Test:735
      _this.c.lineTo(200,250);
      $LASTPOS=4000754;//user.Test:754
      _this.c.closePath();
      $LASTPOS=4000769;//user.Test:769
      _this.c.fill();
      $LASTPOS=4000779;//user.Test:779
      _this.c.stroke();
      $LASTPOS=4000791;//user.Test:791
      _this.wait(1000);
      $LASTPOS=4000811;//user.Test:811
      _this.c.beginPath();
      $LASTPOS=4000826;//user.Test:826
      _this.c.arc(200,100,50,0,Math.PI*2);
      $LASTPOS=4000857;//user.Test:857
      _this.c.fill();
      $LASTPOS=4000867;//user.Test:867
      _this.c.stroke();
      $LASTPOS=4000879;//user.Test:879
      _this.wait(1000);
      $LASTPOS=4000900;//user.Test:900
      _this.c.font="50px monospace";
      $LASTPOS=4000925;//user.Test:925
      _this.c.fillText("Hello",50,50);
      $LASTPOS=4000952;//user.Test:952
      _this.c.strokeText("Hello",50,50);
    },
    fiber$main :function _trc_Test_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      $LASTPOS=4000043;//user.Test:43
      _this.ra=$("#runArea");
      $LASTPOS=4000075;//user.Test:75
      _this.x=3;
      $LASTPOS=4000080;//user.Test:80
      _this.y=5;
      $LASTPOS=4000085;//user.Test:85
      _this.inp=$("<input>").val("test").css({position: "absolute"});
      $LASTPOS=4000140;//user.Test:140
      $("<div>").text(_this.x+_this.y).appendTo(_this.ra).append(_this.inp);
      $LASTPOS=4000187;//user.Test:187
      _this.cv=$("<canvas>").attr({width: 300,height: 300}).appendTo(_this.ra);
      $LASTPOS=4000246;//user.Test:246
      _this.c=_this.cv[0].getContext("2d");
      
      _thread.enter(function _trc_Test_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=4000273;//user.Test:273
            $LASTPOS=4000278;//user.Test:278
            i = 0;;
          case 1:
            if (!(i<100)) { __pc=3; break; }
            $LASTPOS=4000305;//user.Test:305
            _this.inp.css({left: i,top: i});
            $LASTPOS=4000332;//user.Test:332
            _this.fiber$wait(_thread, 10);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            $LASTPOS=4000353;//user.Test:353
            _this.c.fillRect(30,30,50,50);
            $LASTPOS=4000392;//user.Test:392
            _this.c.fillStyle="green";
            $LASTPOS=4000413;//user.Test:413
            _this.c.fillRect(30,30,100,50);
            $LASTPOS=4000439;//user.Test:439
            _this.fiber$wait(_thread, 10);
            __pc=4;return;
          case 4:
            
            $LASTPOS=4000462;//user.Test:462
            _this.c.strokeStyle="blue";
            $LASTPOS=4000484;//user.Test:484
            _this.c.lineWidth=2;
            $LASTPOS=4000499;//user.Test:499
            _this.c.strokeRect(30,30,100,50);
            $LASTPOS=4000527;//user.Test:527
            _this.fiber$wait(_thread, 1000);
            __pc=5;return;
          case 5:
            
            $LASTPOS=4000546;//user.Test:546
            $LASTPOS=4000550;//user.Test:550
            i=0;;
          case 6:
            if (!(i<200)) { __pc=8; break; }
            $LASTPOS=4000576;//user.Test:576
            _this.c.beginPath();
            $LASTPOS=4000595;//user.Test:595
            _this.c.moveTo(100,100);
            $LASTPOS=4000618;//user.Test:618
            _this.c.lineTo(150,200+i);
            $LASTPOS=4000643;//user.Test:643
            _this.c.stroke();
            $LASTPOS=4000659;//user.Test:659
            _this.fiber$wait(_thread, 10);
            __pc=7;return;
          case 7:
            
            i+=10;
            __pc=6;break;
          case 8:
            
            $LASTPOS=4000682;//user.Test:682
            _this.c.beginPath();
            $LASTPOS=4000697;//user.Test:697
            _this.c.moveTo(200,200);
            $LASTPOS=4000716;//user.Test:716
            _this.c.lineTo(250,250);
            $LASTPOS=4000735;//user.Test:735
            _this.c.lineTo(200,250);
            $LASTPOS=4000754;//user.Test:754
            _this.c.closePath();
            $LASTPOS=4000769;//user.Test:769
            _this.c.fill();
            $LASTPOS=4000779;//user.Test:779
            _this.c.stroke();
            $LASTPOS=4000791;//user.Test:791
            _this.fiber$wait(_thread, 1000);
            __pc=9;return;
          case 9:
            
            $LASTPOS=4000811;//user.Test:811
            _this.c.beginPath();
            $LASTPOS=4000826;//user.Test:826
            _this.c.arc(200,100,50,0,Math.PI*2);
            $LASTPOS=4000857;//user.Test:857
            _this.c.fill();
            $LASTPOS=4000867;//user.Test:867
            _this.c.stroke();
            $LASTPOS=4000879;//user.Test:879
            _this.fiber$wait(_thread, 1000);
            __pc=10;return;
          case 10:
            
            $LASTPOS=4000900;//user.Test:900
            _this.c.font="50px monospace";
            $LASTPOS=4000925;//user.Test:925
            _this.c.fillText("Hello",50,50);
            $LASTPOS=4000952;//user.Test:952
            _this.c.strokeText("Hello",50,50);
            _thread.exit(_this);return;
          }
        }
      });
    },
    wait :function _trc_Test_wait(time) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=4001001;//user.Test:1001
      time=time||100;
      $LASTPOS=4001021;//user.Test:1021
      t = null;
      $LASTPOS=4001040;//user.Test:1040
      t.suspend();
      $LASTPOS=4001057;//user.Test:1057
      setTimeout((function anonymous_1068() {
        
        $LASTPOS=4001081;//user.Test:1081
        t.steps();
      }),time);
    },
    fiber$wait :function _trc_Test_f_wait(_thread,time) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=4001001;//user.Test:1001
      time=time||100;
      $LASTPOS=4001021;//user.Test:1021
      t = _thread;
      $LASTPOS=4001040;//user.Test:1040
      t.suspend();
      $LASTPOS=4001057;//user.Test:1057
      setTimeout((function anonymous_1068() {
        
        $LASTPOS=4001081;//user.Test:1081
        t.steps();
      }),time);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"wait":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.TestParent',
  shortName: 'TestParent',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_TestParent_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_TestParent_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TestParent_initialize() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000054;//user.TestParent:54
      _this.ra=$("#runArea");
      $LASTPOS=5000076;//user.TestParent:76
      _this.ra.empty();
      $LASTPOS=5000092;//user.TestParent:92
      _this.x=3;
      $LASTPOS=5000101;//user.TestParent:101
      _this.y=5;
      $LASTPOS=5000110;//user.TestParent:110
      $("<div>").text(_this.x+_this.y).appendTo(_this.ra);
      $LASTPOS=5000149;//user.TestParent:149
      Tonyu.globals.$cv=$("<canvas>").attr({width: 300,height: 300}).appendTo(_this.ra);
    },
    fillRect :function _trc_TestParent_fillRect(x,y,rectW,rectH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000243;//user.TestParent:243
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000274;//user.TestParent:274
      _this.c.fillStyle=_this.fillStyle;
      $LASTPOS=5000301;//user.TestParent:301
      _this.c.fillRect(x,y,rectW,rectH);
    },
    fiber$fillRect :function _trc_TestParent_f_fillRect(_thread,x,y,rectW,rectH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000243;//user.TestParent:243
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000274;//user.TestParent:274
      _this.c.fillStyle=_this.fillStyle;
      $LASTPOS=5000301;//user.TestParent:301
      _this.c.fillRect(x,y,rectW,rectH);
      
      _thread.retVal=_this;return;
    },
    strokeRect :function _trc_TestParent_strokeRect(x,y,rectW,rectH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000366;//user.TestParent:366
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000397;//user.TestParent:397
      _this.c.strokeStyle=_this.strokeStyle;
      $LASTPOS=5000428;//user.TestParent:428
      _this.c.strokeRect(x,y,rectW,rectH);
    },
    fiber$strokeRect :function _trc_TestParent_f_strokeRect(_thread,x,y,rectW,rectH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000366;//user.TestParent:366
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000397;//user.TestParent:397
      _this.c.strokeStyle=_this.strokeStyle;
      $LASTPOS=5000428;//user.TestParent:428
      _this.c.strokeRect(x,y,rectW,rectH);
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_TestParent_clearRect(x,y,rectW,rectH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000494;//user.TestParent:494
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000525;//user.TestParent:525
      _this.c.clearRect(x,y,rectW,rectH);
    },
    fiber$clearRect :function _trc_TestParent_f_clearRect(_thread,x,y,rectW,rectH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000494;//user.TestParent:494
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000525;//user.TestParent:525
      _this.c.clearRect(x,y,rectW,rectH);
      
      _thread.retVal=_this;return;
    },
    beginPath :function _trc_TestParent_beginPath() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000575;//user.TestParent:575
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000606;//user.TestParent:606
      _this.c.beginPath();
    },
    fiber$beginPath :function _trc_TestParent_f_beginPath(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000575;//user.TestParent:575
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000606;//user.TestParent:606
      _this.c.beginPath();
      
      _thread.retVal=_this;return;
    },
    closePath :function _trc_TestParent_closePath() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000641;//user.TestParent:641
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000672;//user.TestParent:672
      _this.c.closePath();
    },
    fiber$closePath :function _trc_TestParent_f_closePath(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000641;//user.TestParent:641
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000672;//user.TestParent:672
      _this.c.closePath();
      
      _thread.retVal=_this;return;
    },
    moveTo :function _trc_TestParent_moveTo(x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000707;//user.TestParent:707
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000738;//user.TestParent:738
      _this.c.moveTo(x,y);
    },
    fiber$moveTo :function _trc_TestParent_f_moveTo(_thread,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000707;//user.TestParent:707
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000738;//user.TestParent:738
      _this.c.moveTo(x,y);
      
      _thread.retVal=_this;return;
    },
    lineTo :function _trc_TestParent_lineTo(x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000773;//user.TestParent:773
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000804;//user.TestParent:804
      _this.c.lineTo(x,y);
    },
    fiber$lineTo :function _trc_TestParent_f_lineTo(_thread,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000773;//user.TestParent:773
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000804;//user.TestParent:804
      _this.c.lineTo(x,y);
      
      _thread.retVal=_this;return;
    },
    stroke :function _trc_TestParent_stroke() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000836;//user.TestParent:836
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000867;//user.TestParent:867
      _this.c.stroke();
    },
    fiber$stroke :function _trc_TestParent_f_stroke(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000836;//user.TestParent:836
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000867;//user.TestParent:867
      _this.c.stroke();
      
      _thread.retVal=_this;return;
    },
    fill :function _trc_TestParent_fill() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000894;//user.TestParent:894
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000925;//user.TestParent:925
      _this.c.fill();
    },
    fiber$fill :function _trc_TestParent_f_fill(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000894;//user.TestParent:894
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000925;//user.TestParent:925
      _this.c.fill();
      
      _thread.retVal=_this;return;
    },
    arc :function _trc_TestParent_arc(x,y,r,startA,endA) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000966;//user.TestParent:966
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000997;//user.TestParent:997
      _this.c.arc(x,y,r,startA,endA);
    },
    fiber$arc :function _trc_TestParent_f_arc(_thread,x,y,r,startA,endA) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000966;//user.TestParent:966
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5000997;//user.TestParent:997
      _this.c.arc(x,y,r,startA,endA);
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_TestParent_fillText(t,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5001047;//user.TestParent:1047
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5001078;//user.TestParent:1078
      _this.c.font=_this.font;
      $LASTPOS=5001095;//user.TestParent:1095
      _this.c.fillText(t,x,y);
    },
    fiber$fillText :function _trc_TestParent_f_fillText(_thread,t,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5001047;//user.TestParent:1047
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5001078;//user.TestParent:1078
      _this.c.font=_this.font;
      $LASTPOS=5001095;//user.TestParent:1095
      _this.c.fillText(t,x,y);
      
      _thread.retVal=_this;return;
    },
    strokeText :function _trc_TestParent_strokeText(t,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5001140;//user.TestParent:1140
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5001171;//user.TestParent:1171
      _this.c.font=_this.font;
      $LASTPOS=5001188;//user.TestParent:1188
      _this.c.strokeText(t,x,y);
    },
    fiber$strokeText :function _trc_TestParent_f_strokeText(_thread,t,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5001140;//user.TestParent:1140
      _this.c=Tonyu.globals.$cv[0].getContext("2d");
      $LASTPOS=5001171;//user.TestParent:1171
      _this.c.font=_this.font;
      $LASTPOS=5001188;//user.TestParent:1188
      _this.c.strokeText(t,x,y);
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_TestParent_wait(time) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=5001229;//user.TestParent:1229
      time=time||100;
      $LASTPOS=5001249;//user.TestParent:1249
      t = null;
      $LASTPOS=5001268;//user.TestParent:1268
      t.suspend();
      $LASTPOS=5001285;//user.TestParent:1285
      setTimeout((function anonymous_1296() {
        
        $LASTPOS=5001309;//user.TestParent:1309
        t.steps();
      }),time);
    },
    fiber$wait :function _trc_TestParent_f_wait(_thread,time) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=5001229;//user.TestParent:1229
      time=time||100;
      $LASTPOS=5001249;//user.TestParent:1249
      t = _thread;
      $LASTPOS=5001268;//user.TestParent:1268
      t.suspend();
      $LASTPOS=5001285;//user.TestParent:1285
      setTimeout((function anonymous_1296() {
        
        $LASTPOS=5001309;//user.TestParent:1309
        t.steps();
      }),time);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"fillRect":{"nowait":false},"strokeRect":{"nowait":false},"clearRect":{"nowait":false},"beginPath":{"nowait":false},"closePath":{"nowait":false},"moveTo":{"nowait":false},"lineTo":{"nowait":false},"stroke":{"nowait":false},"fill":{"nowait":false},"arc":{"nowait":false},"fillText":{"nowait":false},"strokeText":{"nowait":false},"wait":{"nowait":false}}}
});
