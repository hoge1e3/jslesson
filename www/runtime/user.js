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
      
      $LASTPOS=1000026;//user.Game1:26
      _this.x=100;
      $LASTPOS=1000034;//user.Game1:34
      _this.y=300;
      $LASTPOS=1000042;//user.Game1:42
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=1000067;//user.Game1:67
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=1000090;//user.Game1:90
      while (true) {
        $LASTPOS=1000109;//user.Game1:109
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=1000132;//user.Game1:132
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game1_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000026;//user.Game1:26
      _this.x=100;
      $LASTPOS=1000034;//user.Game1:34
      _this.y=300;
      
      _thread.enter(function _trc_Game1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000042;//user.Game1:42
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000067;//user.Game1:67
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000090;//user.Game1:90
          case 3:
            $LASTPOS=1000109;//user.Game1:109
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=1000132;//user.Game1:132
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
      
      $LASTPOS=1000171;//user.Game1:171
      _this.x-=10;
    },
    fiber$left :function _trc_Game1_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000171;//user.Game1:171
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game1_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000206;//user.Game1:206
      _this.x+=10;
    },
    fiber$right :function _trc_Game1_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000206;//user.Game1:206
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.Game2',
  shortName: 'Game2',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game2_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000023;//user.Game2:23
      _this.x=100;
      $LASTPOS=2000030;//user.Game2:30
      _this.y=300;
      $LASTPOS=2000037;//user.Game2:37
      _this.bx=100;
      $LASTPOS=2000045;//user.Game2:45
      _this.by=0;
      $LASTPOS=2000051;//user.Game2:51
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=2000075;//user.Game2:75
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=2000097;//user.Game2:97
      while (true) {
        $LASTPOS=2000115;//user.Game2:115
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=2000137;//user.Game2:137
        _this.moveBall();
        $LASTPOS=2000153;//user.Game2:153
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game2_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000023;//user.Game2:23
      _this.x=100;
      $LASTPOS=2000030;//user.Game2:30
      _this.y=300;
      $LASTPOS=2000037;//user.Game2:37
      _this.bx=100;
      $LASTPOS=2000045;//user.Game2:45
      _this.by=0;
      
      _thread.enter(function _trc_Game2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000051;//user.Game2:51
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000075;//user.Game2:75
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=2000097;//user.Game2:97
          case 3:
            $LASTPOS=2000115;//user.Game2:115
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=2000137;//user.Game2:137
            _this.fiber$moveBall(_thread);
            __pc=5;return;
          case 5:
            
            $LASTPOS=2000153;//user.Game2:153
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
    moveBall :function _trc_Game2_moveBall() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000191;//user.Game2:191
      _this.move("ball",_this.bx,_this.by);
      $LASTPOS=2000215;//user.Game2:215
      _this.by+=10;
      $LASTPOS=2000227;//user.Game2:227
      if (_this.by>400) {
        $LASTPOS=2000249;//user.Game2:249
        _this.by=0;
        $LASTPOS=2000263;//user.Game2:263
        _this.bx=_this.rnd(300);
        
      }
      $LASTPOS=2000286;//user.Game2:286
      if (_this.bx>_this.x-30&&_this.bx<_this.x+30&&_this.by>_this.y-30&&_this.by<_this.y+30) {
        $LASTPOS=2000347;//user.Game2:347
        _this.y=- 1000;
        
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
            $LASTPOS=2000191;//user.Game2:191
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000215;//user.Game2:215
            _this.by+=10;
            $LASTPOS=2000227;//user.Game2:227
            if (!(_this.by>400)) { __pc=3; break; }
            $LASTPOS=2000249;//user.Game2:249
            _this.by=0;
            $LASTPOS=2000263;//user.Game2:263
            _this.fiber$rnd(_thread, 300);
            __pc=2;return;
          case 2:
            _this.bx=_thread.retVal;
            
          case 3:
            
            $LASTPOS=2000286;//user.Game2:286
            if (_this.bx>_this.x-30&&_this.bx<_this.x+30&&_this.by>_this.y-30&&_this.by<_this.y+30) {
              $LASTPOS=2000347;//user.Game2:347
              _this.y=- 1000;
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game2_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000386;//user.Game2:386
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000386;//user.Game2:386
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000418;//user.Game2:418
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000418;//user.Game2:418
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"moveBall":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.Game3',
  shortName: 'Game3',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game3_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000023;//user.Game3:23
      _this.x=100;
      $LASTPOS=3000030;//user.Game3:30
      _this.y=300;
      $LASTPOS=3000037;//user.Game3:37
      _this.bx=[50,320,250,20];
      $LASTPOS=3000057;//user.Game3:57
      _this.by=[0,10,50,30];
      $LASTPOS=3000074;//user.Game3:74
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=3000098;//user.Game3:98
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=3000120;//user.Game3:120
      _this.s.r.c=0;
      $LASTPOS=3000129;//user.Game3:129
      while (true) {
        $LASTPOS=3000147;//user.Game3:147
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=3000169;//user.Game3:169
        $LASTPOS=3000174;//user.Game3:174
        _this.i=0;
        while(_this.i<4) {
          $LASTPOS=3000187;//user.Game3:187
          _this.moveBall(_this.i);
          _this.i++;
        }
        $LASTPOS=3000204;//user.Game3:204
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game3_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000023;//user.Game3:23
      _this.x=100;
      $LASTPOS=3000030;//user.Game3:30
      _this.y=300;
      $LASTPOS=3000037;//user.Game3:37
      _this.bx=[50,320,250,20];
      $LASTPOS=3000057;//user.Game3:57
      _this.by=[0,10,50,30];
      
      _thread.enter(function _trc_Game3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000074;//user.Game3:74
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=3000098;//user.Game3:98
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=3000120;//user.Game3:120
            _this.s.r.c=0;
            $LASTPOS=3000129;//user.Game3:129
          case 3:
            $LASTPOS=3000147;//user.Game3:147
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=3000169;//user.Game3:169
            $LASTPOS=3000174;//user.Game3:174
            _this.i=0;;
          case 5:
            if (!(_this.i<4)) { __pc=7; break; }
            $LASTPOS=3000187;//user.Game3:187
            _this.fiber$moveBall(_thread, _this.i);
            __pc=6;return;
          case 6:
            
            _this.i++;
            __pc=5;break;
          case 7:
            
            $LASTPOS=3000204;//user.Game3:204
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
    moveBall :function _trc_Game3_moveBall(i) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000256;//user.Game3:256
      _this.move("ball"+i,_this.bx[i],_this.by[i]);
      $LASTPOS=3000288;//user.Game3:288
      _this.by[i]+=10;
      $LASTPOS=3000303;//user.Game3:303
      if (_this.by[i]>400) {
        $LASTPOS=3000328;//user.Game3:328
        _this.by[i]=0;
        $LASTPOS=3000345;//user.Game3:345
        _this.bx[i]=_this.rnd(300);
        
      }
      $LASTPOS=3000371;//user.Game3:371
      if (_this.bx[i]>_this.x-30&&_this.bx[i]<_this.x+30&&_this.by[i]>_this.y-30&&_this.by[i]<_this.y+30) {
        $LASTPOS=3000444;//user.Game3:444
        _this.y=- 1000;
        
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
            $LASTPOS=3000256;//user.Game3:256
            _this.fiber$move(_thread, "ball"+i, _this.bx[i], _this.by[i]);
            __pc=1;return;
          case 1:
            
            $LASTPOS=3000288;//user.Game3:288
            _this.by[i]+=10;
            $LASTPOS=3000303;//user.Game3:303
            if (!(_this.by[i]>400)) { __pc=3; break; }
            $LASTPOS=3000328;//user.Game3:328
            _this.by[i]=0;
            $LASTPOS=3000345;//user.Game3:345
            _this.fiber$rnd(_thread, 300);
            __pc=2;return;
          case 2:
            _this.bx[i]=_thread.retVal;
            
          case 3:
            
            $LASTPOS=3000371;//user.Game3:371
            if (_this.bx[i]>_this.x-30&&_this.bx[i]<_this.x+30&&_this.by[i]>_this.y-30&&_this.by[i]<_this.y+30) {
              $LASTPOS=3000444;//user.Game3:444
              _this.y=- 1000;
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Game3_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000483;//user.Game3:483
      _this.x-=10;
    },
    fiber$left :function _trc_Game3_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000483;//user.Game3:483
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game3_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000515;//user.Game3:515
      _this.x+=10;
    },
    fiber$right :function _trc_Game3_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000515;//user.Game3:515
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"moveBall":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map