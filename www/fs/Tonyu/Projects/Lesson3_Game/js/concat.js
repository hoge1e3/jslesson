Tonyu.klass.define({
  fullName: 'user.Game1',
  shortName: 'Game1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game1_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000056;//user.Game1:56
      _this.x=100;
      $LASTPOS=1000063;//user.Game1:63
      _this.y=300;
      $LASTPOS=1000070;//user.Game1:70
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=1000094;//user.Game1:94
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=1000116;//user.Game1:116
      while (true) {
        $LASTPOS=1000134;//user.Game1:134
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=1000156;//user.Game1:156
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game1_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000056;//user.Game1:56
      _this.x=100;
      $LASTPOS=1000063;//user.Game1:63
      _this.y=300;
      
      _thread.enter(function _trc_Game1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000070;//user.Game1:70
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000094;//user.Game1:94
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000116;//user.Game1:116
          case 3:
            $LASTPOS=1000134;//user.Game1:134
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=1000156;//user.Game1:156
            _this.fiber$wait(_thread, 50);
            __pc=5;return;
          case 5:
            
            __pc=3;break;
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game1_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000191;//user.Game1:191
      _this.x-=10;
    },
    fiber$left :function _trc_Game1_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000191;//user.Game1:191
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game1_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000223;//user.Game1:223
      _this.x+=10;
    },
    fiber$right :function _trc_Game1_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000223;//user.Game1:223
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Game2',
  shortName: 'Game2',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game2_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000066;//user.Game2:66
      _this.x=100;
      $LASTPOS=2000073;//user.Game2:73
      _this.y=300;
      $LASTPOS=2000080;//user.Game2:80
      _this.bx=10;
      $LASTPOS=2000087;//user.Game2:87
      _this.by=0;
      $LASTPOS=2000093;//user.Game2:93
      _this.score=0;
      $LASTPOS=2000102;//user.Game2:102
      _this.move("left",50,400);
      $LASTPOS=2000123;//user.Game2:123
      _this.move("right",100,400);
      $LASTPOS=2000146;//user.Game2:146
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=2000170;//user.Game2:170
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=2000192;//user.Game2:192
      while (true) {
        $LASTPOS=2000224;//user.Game2:224
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=2000246;//user.Game2:246
        _this.moveBall();
        $LASTPOS=2000262;//user.Game2:262
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game2_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000066;//user.Game2:66
      _this.x=100;
      $LASTPOS=2000073;//user.Game2:73
      _this.y=300;
      $LASTPOS=2000080;//user.Game2:80
      _this.bx=10;
      $LASTPOS=2000087;//user.Game2:87
      _this.by=0;
      $LASTPOS=2000093;//user.Game2:93
      _this.score=0;
      
      _thread.enter(function _trc_Game2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000102;//user.Game2:102
            _this.fiber$move(_thread, "left", 50, 400);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000123;//user.Game2:123
            _this.fiber$move(_thread, "right", 100, 400);
            __pc=2;return;
          case 2:
            
            $LASTPOS=2000146;//user.Game2:146
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=3;return;
          case 3:
            
            $LASTPOS=2000170;//user.Game2:170
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=4;return;
          case 4:
            
            $LASTPOS=2000192;//user.Game2:192
          case 5:
            $LASTPOS=2000224;//user.Game2:224
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=6;return;
          case 6:
            
            $LASTPOS=2000246;//user.Game2:246
            _this.fiber$moveBall(_thread);
            __pc=7;return;
          case 7:
            
            $LASTPOS=2000262;//user.Game2:262
            _this.fiber$wait(_thread, 50);
            __pc=8;return;
          case 8:
            
            __pc=5;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game2_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000297;//user.Game2:297
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000297;//user.Game2:297
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000329;//user.Game2:329
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000329;//user.Game2:329
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    moveBall :function _trc_Game2_moveBall() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000379;//user.Game2:379
      _this.move("ball",_this.bx,_this.by);
      $LASTPOS=2000403;//user.Game2:403
      _this.by+=10;
      $LASTPOS=2000435;//user.Game2:435
      if (_this.by>400) {
        $LASTPOS=2000457;//user.Game2:457
        _this.bx=_this.Math.random()*400;
        $LASTPOS=2000487;//user.Game2:487
        _this.by=0;
        $LASTPOS=2000501;//user.Game2:501
        _this.score+=10;
        $LASTPOS=2000520;//user.Game2:520
        _this.setText("score",_this.score);
        
      }
      $LASTPOS=2000567;//user.Game2:567
      if (_this.x>_this.bx-30&&_this.x<_this.bx+30&&_this.y>_this.by-30&&_this.y<_this.by+30) {
        $LASTPOS=2000642;//user.Game2:642
        _this.changeImage("neko","https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");
        
      }
    },
    fiber$moveBall :function _trc_Game2_f_moveBall(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Game2_ent_moveBall(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000379;//user.Game2:379
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000403;//user.Game2:403
            _this.by+=10;
            $LASTPOS=2000435;//user.Game2:435
            if (!(_this.by>400)) { __pc=3; break; }
            $LASTPOS=2000457;//user.Game2:457
            _this.bx=_this.Math.random()*400;
            $LASTPOS=2000487;//user.Game2:487
            _this.by=0;
            $LASTPOS=2000501;//user.Game2:501
            _this.score+=10;
            $LASTPOS=2000520;//user.Game2:520
            _this.fiber$setText(_thread, "score", _this.score);
            __pc=2;return;
          case 2:
            
          case 3:
            
            $LASTPOS=2000567;//user.Game2:567
            if (!(_this.x>_this.bx-30&&_this.x<_this.bx+30&&_this.y>_this.by-30&&_this.y<_this.by+30)) { __pc=5; break; }
            $LASTPOS=2000642;//user.Game2:642
            _this.fiber$changeImage(_thread, "neko", "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");
            __pc=4;return;
          case 4:
            
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false},"moveBall":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Game3',
  shortName: 'Game3',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game3_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000043;//user.Game3:43
      _this.x=100;
      $LASTPOS=3000050;//user.Game3:50
      _this.y=300;
      $LASTPOS=3000057;//user.Game3:57
      _this.bx=[0,100,200,300,400];
      $LASTPOS=3000081;//user.Game3:81
      _this.by=[0,10,20,30,40];
      $LASTPOS=3000101;//user.Game3:101
      _this.score=0;
      $LASTPOS=3000110;//user.Game3:110
      _this.move("left",50,400);
      $LASTPOS=3000131;//user.Game3:131
      _this.move("right",100,400);
      $LASTPOS=3000155;//user.Game3:155
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=3000179;//user.Game3:179
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=3000201;//user.Game3:201
      while (true) {
        $LASTPOS=3000219;//user.Game3:219
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=3000258;//user.Game3:258
        _this.moveBall(0);
        $LASTPOS=3000275;//user.Game3:275
        _this.moveBall(1);
        $LASTPOS=3000292;//user.Game3:292
        _this.moveBall(2);
        $LASTPOS=3000309;//user.Game3:309
        _this.moveBall(3);
        $LASTPOS=3000326;//user.Game3:326
        _this.moveBall(4);
        $LASTPOS=3000343;//user.Game3:343
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game3_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000043;//user.Game3:43
      _this.x=100;
      $LASTPOS=3000050;//user.Game3:50
      _this.y=300;
      $LASTPOS=3000057;//user.Game3:57
      _this.bx=[0,100,200,300,400];
      $LASTPOS=3000081;//user.Game3:81
      _this.by=[0,10,20,30,40];
      $LASTPOS=3000101;//user.Game3:101
      _this.score=0;
      
      _thread.enter(function _trc_Game3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000110;//user.Game3:110
            _this.fiber$move(_thread, "left", 50, 400);
            __pc=1;return;
          case 1:
            
            $LASTPOS=3000131;//user.Game3:131
            _this.fiber$move(_thread, "right", 100, 400);
            __pc=2;return;
          case 2:
            
            $LASTPOS=3000155;//user.Game3:155
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=3;return;
          case 3:
            
            $LASTPOS=3000179;//user.Game3:179
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=4;return;
          case 4:
            
            $LASTPOS=3000201;//user.Game3:201
          case 5:
            $LASTPOS=3000219;//user.Game3:219
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=6;return;
          case 6:
            
            $LASTPOS=3000258;//user.Game3:258
            _this.fiber$moveBall(_thread, 0);
            __pc=7;return;
          case 7:
            
            $LASTPOS=3000275;//user.Game3:275
            _this.fiber$moveBall(_thread, 1);
            __pc=8;return;
          case 8:
            
            $LASTPOS=3000292;//user.Game3:292
            _this.fiber$moveBall(_thread, 2);
            __pc=9;return;
          case 9:
            
            $LASTPOS=3000309;//user.Game3:309
            _this.fiber$moveBall(_thread, 3);
            __pc=10;return;
          case 10:
            
            $LASTPOS=3000326;//user.Game3:326
            _this.fiber$moveBall(_thread, 4);
            __pc=11;return;
          case 11:
            
            $LASTPOS=3000343;//user.Game3:343
            _this.fiber$wait(_thread, 50);
            __pc=12;return;
          case 12:
            
            __pc=5;break;
          case 13:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game3_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000378;//user.Game3:378
      _this.x-=20;
    },
    fiber$left :function _trc_Game3_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000378;//user.Game3:378
      _this.x-=20;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game3_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000410;//user.Game3:410
      _this.x+=20;
    },
    fiber$right :function _trc_Game3_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000410;//user.Game3:410
      _this.x+=20;
      
      _thread.retVal=_this;return;
    },
    moveBall :function _trc_Game3_moveBall(i) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000446;//user.Game3:446
      _this.move("ball"+i,_this.bx[i],_this.by[i]);
      $LASTPOS=3000478;//user.Game3:478
      _this.by[i]+=5;
      $LASTPOS=3000492;//user.Game3:492
      if (_this.by[i]>400) {
        $LASTPOS=3000517;//user.Game3:517
        _this.bx[i]=_this.Math.random()*400;
        $LASTPOS=3000550;//user.Game3:550
        _this.by[i]=0;
        $LASTPOS=3000567;//user.Game3:567
        _this.score+=1;
        $LASTPOS=3000585;//user.Game3:585
        _this.setText("score",_this.score);
        
      }
      $LASTPOS=3000619;//user.Game3:619
      if (_this.x>_this.bx[i]-30&&_this.x<_this.bx[i]+30&&_this.y>_this.by[i]-30&&_this.y<_this.by[i]+30) {
        $LASTPOS=3000693;//user.Game3:693
        _this.y=- 100;
        
      }
    },
    fiber$moveBall :function _trc_Game3_f_moveBall(_thread,i) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Game3_ent_moveBall(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000446;//user.Game3:446
            _this.fiber$move(_thread, "ball"+i, _this.bx[i], _this.by[i]);
            __pc=1;return;
          case 1:
            
            $LASTPOS=3000478;//user.Game3:478
            _this.by[i]+=5;
            $LASTPOS=3000492;//user.Game3:492
            if (!(_this.by[i]>400)) { __pc=3; break; }
            $LASTPOS=3000517;//user.Game3:517
            _this.bx[i]=_this.Math.random()*400;
            $LASTPOS=3000550;//user.Game3:550
            _this.by[i]=0;
            $LASTPOS=3000567;//user.Game3:567
            _this.score+=1;
            $LASTPOS=3000585;//user.Game3:585
            _this.fiber$setText(_thread, "score", _this.score);
            __pc=2;return;
          case 2:
            
          case 3:
            
            $LASTPOS=3000619;//user.Game3:619
            if (_this.x>_this.bx[i]-30&&_this.x<_this.bx[i]+30&&_this.y>_this.by[i]-30&&_this.y<_this.by[i]+30) {
              $LASTPOS=3000693;//user.Game3:693
              _this.y=- 100;
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false},"moveBall":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Game2_3',
  shortName: 'Game2_3',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game2_3_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=4000091;//user.Game2_3:91
      _this.x=100;
      $LASTPOS=4000098;//user.Game2_3:98
      _this.y=300;
      $LASTPOS=4000115;//user.Game2_3:115
      _this.bx=100;
      $LASTPOS=4000123;//user.Game2_3:123
      _this.by=0;
      $LASTPOS=4000140;//user.Game2_3:140
      _this.score=0;
      $LASTPOS=4000149;//user.Game2_3:149
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=4000173;//user.Game2_3:173
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=4000195;//user.Game2_3:195
      while (true) {
        $LASTPOS=4000227;//user.Game2_3:227
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=4000264;//user.Game2_3:264
        _this.move("ball",_this.bx,_this.by);
        $LASTPOS=4000288;//user.Game2_3:288
        _this.by+=10;
        $LASTPOS=4000325;//user.Game2_3:325
        if (_this.by>400) {
          $LASTPOS=4000379;//user.Game2_3:379
          _this.bx=_this.Math.random()*400;
          $LASTPOS=4000427;//user.Game2_3:427
          _this.by=0;
          $LASTPOS=4000441;//user.Game2_3:441
          _this.score+=10;
          $LASTPOS=4000460;//user.Game2_3:460
          _this.setText("score",_this.score);
          
        }
        $LASTPOS=4000494;//user.Game2_3:494
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game2_3_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000091;//user.Game2_3:91
      _this.x=100;
      $LASTPOS=4000098;//user.Game2_3:98
      _this.y=300;
      $LASTPOS=4000115;//user.Game2_3:115
      _this.bx=100;
      $LASTPOS=4000123;//user.Game2_3:123
      _this.by=0;
      $LASTPOS=4000140;//user.Game2_3:140
      _this.score=0;
      
      _thread.enter(function _trc_Game2_3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=4000149;//user.Game2_3:149
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=4000173;//user.Game2_3:173
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=4000195;//user.Game2_3:195
          case 3:
            $LASTPOS=4000227;//user.Game2_3:227
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=4000264;//user.Game2_3:264
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=5;return;
          case 5:
            
            $LASTPOS=4000288;//user.Game2_3:288
            _this.by+=10;
            $LASTPOS=4000325;//user.Game2_3:325
            if (!(_this.by>400)) { __pc=7; break; }
            $LASTPOS=4000379;//user.Game2_3:379
            _this.bx=_this.Math.random()*400;
            $LASTPOS=4000427;//user.Game2_3:427
            _this.by=0;
            $LASTPOS=4000441;//user.Game2_3:441
            _this.score+=10;
            $LASTPOS=4000460;//user.Game2_3:460
            _this.fiber$setText(_thread, "score", _this.score);
            __pc=6;return;
          case 6:
            
          case 7:
            
            $LASTPOS=4000494;//user.Game2_3:494
            _this.fiber$wait(_thread, 50);
            __pc=8;return;
          case 8:
            
            __pc=3;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game2_3_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=4000529;//user.Game2_3:529
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_3_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000529;//user.Game2_3:529
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_3_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=4000561;//user.Game2_3:561
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_3_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000561;//user.Game2_3:561
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Game2_2',
  shortName: 'Game2_2',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game2_2_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000080;//user.Game2_2:80
      _this.x=100;
      $LASTPOS=5000087;//user.Game2_2:87
      _this.y=300;
      $LASTPOS=5000104;//user.Game2_2:104
      _this.bx=100;
      $LASTPOS=5000112;//user.Game2_2:112
      _this.by=0;
      $LASTPOS=5000129;//user.Game2_2:129
      _this.score=0;
      $LASTPOS=5000138;//user.Game2_2:138
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=5000162;//user.Game2_2:162
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=5000184;//user.Game2_2:184
      while (true) {
        $LASTPOS=5000216;//user.Game2_2:216
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=5000253;//user.Game2_2:253
        _this.move("ball",_this.bx,_this.by);
        $LASTPOS=5000277;//user.Game2_2:277
        _this.by+=10;
        $LASTPOS=5000314;//user.Game2_2:314
        if (_this.by>400) {
          $LASTPOS=5000354;//user.Game2_2:354
          _this.by=0;
          $LASTPOS=5000368;//user.Game2_2:368
          _this.score+=10;
          $LASTPOS=5000387;//user.Game2_2:387
          _this.setText("score",_this.score);
          
        }
        $LASTPOS=5000421;//user.Game2_2:421
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game2_2_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000080;//user.Game2_2:80
      _this.x=100;
      $LASTPOS=5000087;//user.Game2_2:87
      _this.y=300;
      $LASTPOS=5000104;//user.Game2_2:104
      _this.bx=100;
      $LASTPOS=5000112;//user.Game2_2:112
      _this.by=0;
      $LASTPOS=5000129;//user.Game2_2:129
      _this.score=0;
      
      _thread.enter(function _trc_Game2_2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=5000138;//user.Game2_2:138
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=5000162;//user.Game2_2:162
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=5000184;//user.Game2_2:184
          case 3:
            $LASTPOS=5000216;//user.Game2_2:216
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=5000253;//user.Game2_2:253
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=5;return;
          case 5:
            
            $LASTPOS=5000277;//user.Game2_2:277
            _this.by+=10;
            $LASTPOS=5000314;//user.Game2_2:314
            if (!(_this.by>400)) { __pc=7; break; }
            $LASTPOS=5000354;//user.Game2_2:354
            _this.by=0;
            $LASTPOS=5000368;//user.Game2_2:368
            _this.score+=10;
            $LASTPOS=5000387;//user.Game2_2:387
            _this.fiber$setText(_thread, "score", _this.score);
            __pc=6;return;
          case 6:
            
          case 7:
            
            $LASTPOS=5000421;//user.Game2_2:421
            _this.fiber$wait(_thread, 50);
            __pc=8;return;
          case 8:
            
            __pc=3;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game2_2_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000456;//user.Game2_2:456
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_2_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000456;//user.Game2_2:456
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_2_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000488;//user.Game2_2:488
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_2_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000488;//user.Game2_2:488
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Game2_1',
  shortName: 'Game2_1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game2_1_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=6000080;//user.Game2_1:80
      _this.x=100;
      $LASTPOS=6000087;//user.Game2_1:87
      _this.y=300;
      $LASTPOS=6000104;//user.Game2_1:104
      _this.bx=100;
      $LASTPOS=6000112;//user.Game2_1:112
      _this.by=0;
      $LASTPOS=6000118;//user.Game2_1:118
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=6000142;//user.Game2_1:142
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=6000164;//user.Game2_1:164
      while (true) {
        $LASTPOS=6000196;//user.Game2_1:196
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=6000233;//user.Game2_1:233
        _this.move("ball",_this.bx,_this.by);
        $LASTPOS=6000257;//user.Game2_1:257
        _this.by+=10;
        $LASTPOS=6000269;//user.Game2_1:269
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game2_1_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=6000080;//user.Game2_1:80
      _this.x=100;
      $LASTPOS=6000087;//user.Game2_1:87
      _this.y=300;
      $LASTPOS=6000104;//user.Game2_1:104
      _this.bx=100;
      $LASTPOS=6000112;//user.Game2_1:112
      _this.by=0;
      
      _thread.enter(function _trc_Game2_1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=6000118;//user.Game2_1:118
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=6000142;//user.Game2_1:142
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=6000164;//user.Game2_1:164
          case 3:
            $LASTPOS=6000196;//user.Game2_1:196
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=6000233;//user.Game2_1:233
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=5;return;
          case 5:
            
            $LASTPOS=6000257;//user.Game2_1:257
            _this.by+=10;
            $LASTPOS=6000269;//user.Game2_1:269
            _this.fiber$wait(_thread, 50);
            __pc=6;return;
          case 6:
            
            __pc=3;break;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game2_1_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=6000304;//user.Game2_1:304
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_1_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=6000304;//user.Game2_1:304
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_1_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=6000336;//user.Game2_1:336
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_1_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=6000336;//user.Game2_1:336
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Game2_NoCat',
  shortName: 'Game2_NoCat',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game2_NoCat_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=7000066;//user.Game2_NoCat:66
      _this.bx=50;
      $LASTPOS=7000073;//user.Game2_NoCat:73
      _this.by=0;
      $LASTPOS=7000079;//user.Game2_NoCat:79
      while (true) {
        $LASTPOS=7000112;//user.Game2_NoCat:112
        _this.move("ball",_this.bx,_this.by);
        $LASTPOS=7000136;//user.Game2_NoCat:136
        _this.by+=20;
        $LASTPOS=7000168;//user.Game2_NoCat:168
        if (_this.by>400) {
          $LASTPOS=7000190;//user.Game2_NoCat:190
          _this.bx=_this.Math.random()*400;
          $LASTPOS=7000220;//user.Game2_NoCat:220
          _this.by=0;
          
        }
        $LASTPOS=7000291;//user.Game2_NoCat:291
        _this.wait(50);
        
      }
      $LASTPOS=7000304;//user.Game2_NoCat:304
      _this.x=100;
      $LASTPOS=7000311;//user.Game2_NoCat:311
      _this.y=300;
      $LASTPOS=7000318;//user.Game2_NoCat:318
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=7000342;//user.Game2_NoCat:342
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=7000364;//user.Game2_NoCat:364
      while (true) {
        $LASTPOS=7000382;//user.Game2_NoCat:382
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=7000404;//user.Game2_NoCat:404
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game2_NoCat_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=7000066;//user.Game2_NoCat:66
      _this.bx=50;
      $LASTPOS=7000073;//user.Game2_NoCat:73
      _this.by=0;
      
      _thread.enter(function _trc_Game2_NoCat_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=7000079;//user.Game2_NoCat:79
          case 1:
            $LASTPOS=7000112;//user.Game2_NoCat:112
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=2;return;
          case 2:
            
            $LASTPOS=7000136;//user.Game2_NoCat:136
            _this.by+=20;
            $LASTPOS=7000168;//user.Game2_NoCat:168
            if (_this.by>400) {
              $LASTPOS=7000190;//user.Game2_NoCat:190
              _this.bx=_this.Math.random()*400;
              $LASTPOS=7000220;//user.Game2_NoCat:220
              _this.by=0;
              
            }
            $LASTPOS=7000291;//user.Game2_NoCat:291
            _this.fiber$wait(_thread, 50);
            __pc=3;return;
          case 3:
            
            __pc=1;break;
          case 4:
            
            $LASTPOS=7000304;//user.Game2_NoCat:304
            _this.x=100;
            $LASTPOS=7000311;//user.Game2_NoCat:311
            _this.y=300;
            $LASTPOS=7000318;//user.Game2_NoCat:318
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=5;return;
          case 5:
            
            $LASTPOS=7000342;//user.Game2_NoCat:342
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=6;return;
          case 6:
            
            $LASTPOS=7000364;//user.Game2_NoCat:364
          case 7:
            $LASTPOS=7000382;//user.Game2_NoCat:382
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=8;return;
          case 8:
            
            $LASTPOS=7000404;//user.Game2_NoCat:404
            _this.fiber$wait(_thread, 50);
            __pc=9;return;
          case 9:
            
            __pc=7;break;
          case 10:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game2_NoCat_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=7000439;//user.Game2_NoCat:439
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_NoCat_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=7000439;//user.Game2_NoCat:439
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_NoCat_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=7000471;//user.Game2_NoCat:471
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_NoCat_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=7000471;//user.Game2_NoCat:471
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Step1_3',
  shortName: 'Step1_3',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Step1_3_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=8000014;//user.Step1_3:14
      _this.x=100;
      $LASTPOS=8000021;//user.Step1_3:21
      _this.y=300;
      $LASTPOS=8000029;//user.Step1_3:29
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=8000053;//user.Step1_3:53
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=8000075;//user.Step1_3:75
      while (true) {
        $LASTPOS=8000092;//user.Step1_3:92
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=8000114;//user.Step1_3:114
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Step1_3_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=8000014;//user.Step1_3:14
      _this.x=100;
      $LASTPOS=8000021;//user.Step1_3:21
      _this.y=300;
      
      _thread.enter(function _trc_Step1_3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=8000029;//user.Step1_3:29
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=8000053;//user.Step1_3:53
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=8000075;//user.Step1_3:75
          case 3:
            $LASTPOS=8000092;//user.Step1_3:92
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=8000114;//user.Step1_3:114
            _this.fiber$wait(_thread, 50);
            __pc=5;return;
          case 5:
            
            __pc=3;break;
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Step1_3_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=8000149;//user.Step1_3:149
      _this.x-=10;
    },
    fiber$left :function _trc_Step1_3_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=8000149;//user.Step1_3:149
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Step1_3_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=8000181;//user.Step1_3:181
      _this.x+=10;
    },
    fiber$right :function _trc_Step1_3_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=8000181;//user.Step1_3:181
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Lesson2',
  shortName: 'Lesson2',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Lesson2_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Lesson2_f_main(_thread) {
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
Tonyu.klass.define({
  fullName: 'user.Step1_1',
  shortName: 'Step1_1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Step1_1_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Step1_1_f_main(_thread) {
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
Tonyu.klass.define({
  fullName: 'user.Step1_2',
  shortName: 'Step1_2',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Step1_2_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=9000014;//user.Step1_2:14
      _this.x=100;
      $LASTPOS=9000021;//user.Step1_2:21
      _this.y=300;
      $LASTPOS=9000028;//user.Step1_2:28
      while (true) {
        $LASTPOS=9000045;//user.Step1_2:45
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=9000067;//user.Step1_2:67
        _this.x+=10;
        $LASTPOS=9000078;//user.Step1_2:78
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Step1_2_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=9000014;//user.Step1_2:14
      _this.x=100;
      $LASTPOS=9000021;//user.Step1_2:21
      _this.y=300;
      
      _thread.enter(function _trc_Step1_2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=9000028;//user.Step1_2:28
          case 1:
            $LASTPOS=9000045;//user.Step1_2:45
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=2;return;
          case 2:
            
            $LASTPOS=9000067;//user.Step1_2:67
            _this.x+=10;
            $LASTPOS=9000078;//user.Step1_2:78
            _this.fiber$wait(_thread, 50);
            __pc=3;return;
          case 3:
            
            __pc=1;break;
          case 4:
            
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
  fullName: 'user.Step2_1',
  shortName: 'Step2_1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Step2_1_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=10000014;//user.Step2_1:14
      _this.x=100;
      $LASTPOS=10000021;//user.Step2_1:21
      _this.y=300;
      $LASTPOS=10000028;//user.Step2_1:28
      _this.bx=100;
      $LASTPOS=10000036;//user.Step2_1:36
      _this.by=0;
      $LASTPOS=10000043;//user.Step2_1:43
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=10000067;//user.Step2_1:67
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=10000089;//user.Step2_1:89
      while (true) {
        $LASTPOS=10000106;//user.Step2_1:106
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=10000128;//user.Step2_1:128
        _this.move("ball",_this.bx,_this.by);
        $LASTPOS=10000152;//user.Step2_1:152
        _this.by+=10;
        $LASTPOS=10000164;//user.Step2_1:164
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Step2_1_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=10000014;//user.Step2_1:14
      _this.x=100;
      $LASTPOS=10000021;//user.Step2_1:21
      _this.y=300;
      $LASTPOS=10000028;//user.Step2_1:28
      _this.bx=100;
      $LASTPOS=10000036;//user.Step2_1:36
      _this.by=0;
      
      _thread.enter(function _trc_Step2_1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=10000043;//user.Step2_1:43
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=10000067;//user.Step2_1:67
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=10000089;//user.Step2_1:89
          case 3:
            $LASTPOS=10000106;//user.Step2_1:106
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=10000128;//user.Step2_1:128
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=5;return;
          case 5:
            
            $LASTPOS=10000152;//user.Step2_1:152
            _this.by+=10;
            $LASTPOS=10000164;//user.Step2_1:164
            _this.fiber$wait(_thread, 50);
            __pc=6;return;
          case 6:
            
            __pc=3;break;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Step2_1_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=10000199;//user.Step2_1:199
      _this.x-=10;
    },
    fiber$left :function _trc_Step2_1_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=10000199;//user.Step2_1:199
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Step2_1_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=10000231;//user.Step2_1:231
      _this.x+=10;
    },
    fiber$right :function _trc_Step2_1_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=10000231;//user.Step2_1:231
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
