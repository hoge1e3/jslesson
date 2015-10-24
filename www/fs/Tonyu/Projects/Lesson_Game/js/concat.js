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
      _this.bx=100;
      $LASTPOS=2000088;//user.Game2:88
      _this.by=0;
      $LASTPOS=2000094;//user.Game2:94
      _this.score=0;
      $LASTPOS=2000103;//user.Game2:103
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=2000127;//user.Game2:127
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=2000149;//user.Game2:149
      while (true) {
        $LASTPOS=2000181;//user.Game2:181
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=2000218;//user.Game2:218
        _this.move("ball",_this.bx,_this.by);
        $LASTPOS=2000242;//user.Game2:242
        _this.by+=10;
        $LASTPOS=2000274;//user.Game2:274
        if (_this.by>400) {
          $LASTPOS=2000296;//user.Game2:296
          _this.bx=_this.Math.random()*400;
          $LASTPOS=2000326;//user.Game2:326
          _this.by=0;
          $LASTPOS=2000340;//user.Game2:340
          _this.score+=10;
          $LASTPOS=2000359;//user.Game2:359
          _this.setText("score",_this.score);
          
        }
        $LASTPOS=2000406;//user.Game2:406
        if (_this.x>_this.bx-30&&_this.x<_this.bx+30&&_this.y>_this.by-30&&_this.y<_this.by+30) {
          $LASTPOS=2000508;//user.Game2:508
          _this.changeImage("neko","images/sound.png");
          
        }
        $LASTPOS=2000558;//user.Game2:558
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
      _this.bx=100;
      $LASTPOS=2000088;//user.Game2:88
      _this.by=0;
      $LASTPOS=2000094;//user.Game2:94
      _this.score=0;
      
      _thread.enter(function _trc_Game2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000103;//user.Game2:103
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000127;//user.Game2:127
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=2000149;//user.Game2:149
          case 3:
            $LASTPOS=2000181;//user.Game2:181
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=2000218;//user.Game2:218
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=5;return;
          case 5:
            
            $LASTPOS=2000242;//user.Game2:242
            _this.by+=10;
            $LASTPOS=2000274;//user.Game2:274
            if (!(_this.by>400)) { __pc=7; break; }
            $LASTPOS=2000296;//user.Game2:296
            _this.bx=_this.Math.random()*400;
            $LASTPOS=2000326;//user.Game2:326
            _this.by=0;
            $LASTPOS=2000340;//user.Game2:340
            _this.score+=10;
            $LASTPOS=2000359;//user.Game2:359
            _this.fiber$setText(_thread, "score", _this.score);
            __pc=6;return;
          case 6:
            
          case 7:
            
            $LASTPOS=2000406;//user.Game2:406
            if (!(_this.x>_this.bx-30&&_this.x<_this.bx+30&&_this.y>_this.by-30&&_this.y<_this.by+30)) { __pc=9; break; }
            $LASTPOS=2000508;//user.Game2:508
            _this.fiber$changeImage(_thread, "neko", "images/sound.png");
            __pc=8;return;
          case 8:
            
          case 9:
            
            $LASTPOS=2000558;//user.Game2:558
            _this.fiber$wait(_thread, 50);
            __pc=10;return;
          case 10:
            
            __pc=3;break;
          case 11:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game2_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000593;//user.Game2:593
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000593;//user.Game2:593
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000625;//user.Game2:625
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000625;//user.Game2:625
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
      
      $LASTPOS=3000080;//user.Game2_1:80
      _this.x=100;
      $LASTPOS=3000087;//user.Game2_1:87
      _this.y=300;
      $LASTPOS=3000104;//user.Game2_1:104
      _this.bx=100;
      $LASTPOS=3000112;//user.Game2_1:112
      _this.by=0;
      $LASTPOS=3000118;//user.Game2_1:118
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=3000142;//user.Game2_1:142
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=3000164;//user.Game2_1:164
      while (true) {
        $LASTPOS=3000196;//user.Game2_1:196
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=3000233;//user.Game2_1:233
        _this.move("ball",_this.bx,_this.by);
        $LASTPOS=3000257;//user.Game2_1:257
        _this.by+=10;
        $LASTPOS=3000269;//user.Game2_1:269
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game2_1_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000080;//user.Game2_1:80
      _this.x=100;
      $LASTPOS=3000087;//user.Game2_1:87
      _this.y=300;
      $LASTPOS=3000104;//user.Game2_1:104
      _this.bx=100;
      $LASTPOS=3000112;//user.Game2_1:112
      _this.by=0;
      
      _thread.enter(function _trc_Game2_1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000118;//user.Game2_1:118
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=3000142;//user.Game2_1:142
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=3000164;//user.Game2_1:164
          case 3:
            $LASTPOS=3000196;//user.Game2_1:196
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=3000233;//user.Game2_1:233
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=5;return;
          case 5:
            
            $LASTPOS=3000257;//user.Game2_1:257
            _this.by+=10;
            $LASTPOS=3000269;//user.Game2_1:269
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
      
      $LASTPOS=3000304;//user.Game2_1:304
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_1_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000304;//user.Game2_1:304
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_1_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000336;//user.Game2_1:336
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_1_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000336;//user.Game2_1:336
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
      
      $LASTPOS=4000080;//user.Game2_2:80
      _this.x=100;
      $LASTPOS=4000087;//user.Game2_2:87
      _this.y=300;
      $LASTPOS=4000104;//user.Game2_2:104
      _this.bx=100;
      $LASTPOS=4000112;//user.Game2_2:112
      _this.by=0;
      $LASTPOS=4000129;//user.Game2_2:129
      _this.score=0;
      $LASTPOS=4000138;//user.Game2_2:138
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=4000162;//user.Game2_2:162
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=4000184;//user.Game2_2:184
      while (true) {
        $LASTPOS=4000216;//user.Game2_2:216
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=4000253;//user.Game2_2:253
        _this.move("ball",_this.bx,_this.by);
        $LASTPOS=4000277;//user.Game2_2:277
        _this.by+=10;
        $LASTPOS=4000314;//user.Game2_2:314
        if (_this.by>400) {
          $LASTPOS=4000354;//user.Game2_2:354
          _this.by=0;
          $LASTPOS=4000368;//user.Game2_2:368
          _this.score+=10;
          $LASTPOS=4000387;//user.Game2_2:387
          _this.setText("score",_this.score);
          
        }
        $LASTPOS=4000421;//user.Game2_2:421
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game2_2_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000080;//user.Game2_2:80
      _this.x=100;
      $LASTPOS=4000087;//user.Game2_2:87
      _this.y=300;
      $LASTPOS=4000104;//user.Game2_2:104
      _this.bx=100;
      $LASTPOS=4000112;//user.Game2_2:112
      _this.by=0;
      $LASTPOS=4000129;//user.Game2_2:129
      _this.score=0;
      
      _thread.enter(function _trc_Game2_2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=4000138;//user.Game2_2:138
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=4000162;//user.Game2_2:162
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=4000184;//user.Game2_2:184
          case 3:
            $LASTPOS=4000216;//user.Game2_2:216
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=4000253;//user.Game2_2:253
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=5;return;
          case 5:
            
            $LASTPOS=4000277;//user.Game2_2:277
            _this.by+=10;
            $LASTPOS=4000314;//user.Game2_2:314
            if (!(_this.by>400)) { __pc=7; break; }
            $LASTPOS=4000354;//user.Game2_2:354
            _this.by=0;
            $LASTPOS=4000368;//user.Game2_2:368
            _this.score+=10;
            $LASTPOS=4000387;//user.Game2_2:387
            _this.fiber$setText(_thread, "score", _this.score);
            __pc=6;return;
          case 6:
            
          case 7:
            
            $LASTPOS=4000421;//user.Game2_2:421
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
      
      $LASTPOS=4000456;//user.Game2_2:456
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_2_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000456;//user.Game2_2:456
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_2_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=4000488;//user.Game2_2:488
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_2_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000488;//user.Game2_2:488
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
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
      
      $LASTPOS=5000091;//user.Game2_3:91
      _this.x=100;
      $LASTPOS=5000098;//user.Game2_3:98
      _this.y=300;
      $LASTPOS=5000115;//user.Game2_3:115
      _this.bx=100;
      $LASTPOS=5000123;//user.Game2_3:123
      _this.by=0;
      $LASTPOS=5000140;//user.Game2_3:140
      _this.score=0;
      $LASTPOS=5000149;//user.Game2_3:149
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=5000173;//user.Game2_3:173
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=5000195;//user.Game2_3:195
      while (true) {
        $LASTPOS=5000227;//user.Game2_3:227
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=5000264;//user.Game2_3:264
        _this.move("ball",_this.bx,_this.by);
        $LASTPOS=5000288;//user.Game2_3:288
        _this.by+=10;
        $LASTPOS=5000325;//user.Game2_3:325
        if (_this.by>400) {
          $LASTPOS=5000379;//user.Game2_3:379
          _this.bx=_this.Math.random()*400;
          $LASTPOS=5000427;//user.Game2_3:427
          _this.by=0;
          $LASTPOS=5000441;//user.Game2_3:441
          _this.score+=10;
          $LASTPOS=5000460;//user.Game2_3:460
          _this.setText("score",_this.score);
          
        }
        $LASTPOS=5000494;//user.Game2_3:494
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game2_3_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000091;//user.Game2_3:91
      _this.x=100;
      $LASTPOS=5000098;//user.Game2_3:98
      _this.y=300;
      $LASTPOS=5000115;//user.Game2_3:115
      _this.bx=100;
      $LASTPOS=5000123;//user.Game2_3:123
      _this.by=0;
      $LASTPOS=5000140;//user.Game2_3:140
      _this.score=0;
      
      _thread.enter(function _trc_Game2_3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=5000149;//user.Game2_3:149
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=5000173;//user.Game2_3:173
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=5000195;//user.Game2_3:195
          case 3:
            $LASTPOS=5000227;//user.Game2_3:227
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=5000264;//user.Game2_3:264
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=5;return;
          case 5:
            
            $LASTPOS=5000288;//user.Game2_3:288
            _this.by+=10;
            $LASTPOS=5000325;//user.Game2_3:325
            if (!(_this.by>400)) { __pc=7; break; }
            $LASTPOS=5000379;//user.Game2_3:379
            _this.bx=_this.Math.random()*400;
            $LASTPOS=5000427;//user.Game2_3:427
            _this.by=0;
            $LASTPOS=5000441;//user.Game2_3:441
            _this.score+=10;
            $LASTPOS=5000460;//user.Game2_3:460
            _this.fiber$setText(_thread, "score", _this.score);
            __pc=6;return;
          case 6:
            
          case 7:
            
            $LASTPOS=5000494;//user.Game2_3:494
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
      
      $LASTPOS=5000529;//user.Game2_3:529
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_3_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000529;//user.Game2_3:529
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_3_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000561;//user.Game2_3:561
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_3_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000561;//user.Game2_3:561
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
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
      
      $LASTPOS=6000043;//user.Game3:43
      _this.x=100;
      $LASTPOS=6000050;//user.Game3:50
      _this.y=300;
      $LASTPOS=6000057;//user.Game3:57
      _this.bx=[0,100,200,300,400];
      $LASTPOS=6000081;//user.Game3:81
      _this.by=[0,10,20,30,40];
      $LASTPOS=6000101;//user.Game3:101
      _this.score=0;
      $LASTPOS=6000110;//user.Game3:110
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=6000134;//user.Game3:134
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=6000156;//user.Game3:156
      while (true) {
        $LASTPOS=6000174;//user.Game3:174
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=6000213;//user.Game3:213
        $LASTPOS=6000218;//user.Game3:218
        _this.i=0;
        while(_this.i<5) {
          {
            $LASTPOS=6000244;//user.Game3:244
            _this.move("ball"+_this.i,_this.bx[_this.i],_this.by[_this.i]);
            $LASTPOS=6000280;//user.Game3:280
            _this.by[_this.i]+=10;
            $LASTPOS=6000299;//user.Game3:299
            if (_this.by[_this.i]>400) {
              $LASTPOS=6000328;//user.Game3:328
              _this.bx[_this.i]=_this.Math.random()*400;
              $LASTPOS=6000365;//user.Game3:365
              _this.by[_this.i]=0;
              $LASTPOS=6000386;//user.Game3:386
              _this.score+=10;
              $LASTPOS=6000409;//user.Game3:409
              _this.setText("score",_this.score);
              
            }
            $LASTPOS=6000451;//user.Game3:451
            if (_this.x>_this.bx[_this.i]-30&&_this.x<_this.bx[_this.i]+30&&_this.y>_this.by[_this.i]-30&&_this.y<_this.by[_this.i]+30) {
              $LASTPOS=6000533;//user.Game3:533
              _this.y=- 100;
              
            }
          }
          _this.i++;
        }
        $LASTPOS=6000570;//user.Game3:570
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game3_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=6000043;//user.Game3:43
      _this.x=100;
      $LASTPOS=6000050;//user.Game3:50
      _this.y=300;
      $LASTPOS=6000057;//user.Game3:57
      _this.bx=[0,100,200,300,400];
      $LASTPOS=6000081;//user.Game3:81
      _this.by=[0,10,20,30,40];
      $LASTPOS=6000101;//user.Game3:101
      _this.score=0;
      
      _thread.enter(function _trc_Game3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=6000110;//user.Game3:110
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=6000134;//user.Game3:134
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=6000156;//user.Game3:156
          case 3:
            $LASTPOS=6000174;//user.Game3:174
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=6000213;//user.Game3:213
            $LASTPOS=6000218;//user.Game3:218
            _this.i=0;;
          case 5:
            if (!(_this.i<5)) { __pc=9; break; }
            $LASTPOS=6000244;//user.Game3:244
            _this.fiber$move(_thread, "ball"+_this.i, _this.bx[_this.i], _this.by[_this.i]);
            __pc=6;return;
          case 6:
            
            $LASTPOS=6000280;//user.Game3:280
            _this.by[_this.i]+=10;
            $LASTPOS=6000299;//user.Game3:299
            if (!(_this.by[_this.i]>400)) { __pc=8; break; }
            $LASTPOS=6000328;//user.Game3:328
            _this.bx[_this.i]=_this.Math.random()*400;
            $LASTPOS=6000365;//user.Game3:365
            _this.by[_this.i]=0;
            $LASTPOS=6000386;//user.Game3:386
            _this.score+=10;
            $LASTPOS=6000409;//user.Game3:409
            _this.fiber$setText(_thread, "score", _this.score);
            __pc=7;return;
          case 7:
            
          case 8:
            
            $LASTPOS=6000451;//user.Game3:451
            if (_this.x>_this.bx[_this.i]-30&&_this.x<_this.bx[_this.i]+30&&_this.y>_this.by[_this.i]-30&&_this.y<_this.by[_this.i]+30) {
              $LASTPOS=6000533;//user.Game3:533
              _this.y=- 100;
              
            }
            _this.i++;
            __pc=5;break;
          case 9:
            
            $LASTPOS=6000570;//user.Game3:570
            _this.fiber$wait(_thread, 50);
            __pc=10;return;
          case 10:
            
            __pc=3;break;
          case 11:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game3_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=6000605;//user.Game3:605
      _this.x-=10;
    },
    fiber$left :function _trc_Game3_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=6000605;//user.Game3:605
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game3_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=6000637;//user.Game3:637
      _this.x+=10;
    },
    fiber$right :function _trc_Game3_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=6000637;//user.Game3:637
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
