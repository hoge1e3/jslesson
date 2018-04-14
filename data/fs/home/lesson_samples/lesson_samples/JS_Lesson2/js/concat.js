Tonyu.klass.define({
  fullName: 'user.Canvas',
  shortName: 'Canvas',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Canvas_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000015;//user.Canvas:15
      _this.setCanvas("cv");
      $LASTPOS=1000033;//user.Canvas:33
      _this.fillRect(20,30,50,50);
      $LASTPOS=1000057;//user.Canvas:57
      _this.moveTo(50,50);
      $LASTPOS=1000073;//user.Canvas:73
      _this.lineTo(100,120);
    },
    fiber$main :function _trc_Canvas_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Canvas_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000015;//user.Canvas:15
            _this.fiber$setCanvas(_thread, "cv");
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000033;//user.Canvas:33
            _this.fiber$fillRect(_thread, 20, 30, 50, 50);
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000057;//user.Canvas:57
            _this.moveTo(50,50);
            $LASTPOS=1000073;//user.Canvas:73
            _this.lineTo(100,120);
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
  fullName: 'user.Move',
  shortName: 'Move',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Move_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000027;//user.Move:27
      _this.move("moji",100,100);
      $LASTPOS=2000050;//user.Move:50
      _this.wait(1000);
      $LASTPOS=2000063;//user.Move:63
      _this.move("moji",110,100);
      $LASTPOS=2000086;//user.Move:86
      _this.wait(1000);
      $LASTPOS=2000099;//user.Move:99
      _this.move("moji",120,100);
    },
    fiber$main :function _trc_Move_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Move_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000027;//user.Move:27
            _this.fiber$move(_thread, "moji", 100, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000050;//user.Move:50
            _this.fiber$wait(_thread, 1000);
            __pc=2;return;
          case 2:
            
            $LASTPOS=2000063;//user.Move:63
            _this.fiber$move(_thread, "moji", 110, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=2000086;//user.Move:86
            _this.fiber$wait(_thread, 1000);
            __pc=4;return;
          case 4:
            
            $LASTPOS=2000099;//user.Move:99
            _this.fiber$move(_thread, "moji", 120, 100);
            __pc=5;return;
          case 5:
            
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
  fullName: 'user.MoveIf',
  shortName: 'MoveIf',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_MoveIf_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000015;//user.MoveIf:15
      _this.x=100;
      $LASTPOS=3000023;//user.MoveIf:23
      while (true) {
        $LASTPOS=3000042;//user.MoveIf:42
        _this.move("moji",_this.x,100);
        $LASTPOS=3000067;//user.MoveIf:67
        _this.wait(100);
        $LASTPOS=3000083;//user.MoveIf:83
        _this.x+=10;
        $LASTPOS=3000095;//user.MoveIf:95
        if (_this.x>200) {
          $LASTPOS=3000106;//user.MoveIf:106
          _this.x=0;
        }
        
      }
    },
    fiber$main :function _trc_MoveIf_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000015;//user.MoveIf:15
      _this.x=100;
      
      _thread.enter(function _trc_MoveIf_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000023;//user.MoveIf:23
          case 1:
            $LASTPOS=3000042;//user.MoveIf:42
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=2;return;
          case 2:
            
            $LASTPOS=3000067;//user.MoveIf:67
            _this.fiber$wait(_thread, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=3000083;//user.MoveIf:83
            _this.x+=10;
            $LASTPOS=3000095;//user.MoveIf:95
            if (_this.x>200) {
              $LASTPOS=3000106;//user.MoveIf:106
              _this.x=0;
            }
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
  fullName: 'user.MoveVar',
  shortName: 'MoveVar',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_MoveVar_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=4000033;//user.MoveVar:33
      _this.x=100;
      $LASTPOS=4000041;//user.MoveVar:41
      _this.move("moji",_this.x,100);
      $LASTPOS=4000062;//user.MoveVar:62
      _this.wait(1000);
      $LASTPOS=4000075;//user.MoveVar:75
      _this.x+=10;
      $LASTPOS=4000083;//user.MoveVar:83
      _this.move("moji",_this.x,100);
      $LASTPOS=4000104;//user.MoveVar:104
      _this.wait(1000);
      $LASTPOS=4000117;//user.MoveVar:117
      _this.x+=10;
      $LASTPOS=4000125;//user.MoveVar:125
      _this.move("moji",_this.x,100);
      $LASTPOS=4000146;//user.MoveVar:146
      _this.wait(1000);
    },
    fiber$main :function _trc_MoveVar_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000033;//user.MoveVar:33
      _this.x=100;
      
      _thread.enter(function _trc_MoveVar_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=4000041;//user.MoveVar:41
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=4000062;//user.MoveVar:62
            _this.fiber$wait(_thread, 1000);
            __pc=2;return;
          case 2:
            
            $LASTPOS=4000075;//user.MoveVar:75
            _this.x+=10;
            $LASTPOS=4000083;//user.MoveVar:83
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=4000104;//user.MoveVar:104
            _this.fiber$wait(_thread, 1000);
            __pc=4;return;
          case 4:
            
            $LASTPOS=4000117;//user.MoveVar:117
            _this.x+=10;
            $LASTPOS=4000125;//user.MoveVar:125
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=5;return;
          case 5:
            
            $LASTPOS=4000146;//user.MoveVar:146
            _this.fiber$wait(_thread, 1000);
            __pc=6;return;
          case 6:
            
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
  fullName: 'user.MoveWhile',
  shortName: 'MoveWhile',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_MoveWhile_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=5000015;//user.MoveWhile:15
      _this.x=100;
      $LASTPOS=5000023;//user.MoveWhile:23
      while (_this.x<200) {
        $LASTPOS=5000043;//user.MoveWhile:43
        _this.move("moji",_this.x,100);
        $LASTPOS=5000068;//user.MoveWhile:68
        _this.wait(100);
        $LASTPOS=5000084;//user.MoveWhile:84
        _this.x+=5;
        
      }
    },
    fiber$main :function _trc_MoveWhile_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000015;//user.MoveWhile:15
      _this.x=100;
      
      _thread.enter(function _trc_MoveWhile_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=5000023;//user.MoveWhile:23
          case 1:
            if (!(_this.x<200)) { __pc=4; break; }
            $LASTPOS=5000043;//user.MoveWhile:43
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=2;return;
          case 2:
            
            $LASTPOS=5000068;//user.MoveWhile:68
            _this.fiber$wait(_thread, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=5000084;//user.MoveWhile:84
            _this.x+=5;
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
  fullName: 'user.WriteLabel',
  shortName: 'WriteLabel',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_WriteLabel_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=6000029;//user.WriteLabel:29
      _this.c=0;
      $LASTPOS=6000035;//user.WriteLabel:35
      while (_this.c<10) {
        $LASTPOS=6000054;//user.WriteLabel:54
        _this.setText("count",_this.c);
        $LASTPOS=6000079;//user.WriteLabel:79
        _this.wait(1000);
        $LASTPOS=6000096;//user.WriteLabel:96
        _this.c+=1;
        
      }
    },
    fiber$main :function _trc_WriteLabel_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=6000029;//user.WriteLabel:29
      _this.c=0;
      
      _thread.enter(function _trc_WriteLabel_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=6000035;//user.WriteLabel:35
          case 1:
            if (!(_this.c<10)) { __pc=4; break; }
            $LASTPOS=6000054;//user.WriteLabel:54
            _this.fiber$setText(_thread, "count", _this.c);
            __pc=2;return;
          case 2:
            
            $LASTPOS=6000079;//user.WriteLabel:79
            _this.fiber$wait(_thread, 1000);
            __pc=3;return;
          case 3:
            
            $LASTPOS=6000096;//user.WriteLabel:96
            _this.c+=1;
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
