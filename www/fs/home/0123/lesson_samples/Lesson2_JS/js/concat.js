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
      
      $LASTPOS=1000025;//user.Move:25
      _this.move("moji",100,100);
      $LASTPOS=1000047;//user.Move:47
      _this.wait(1000);
      $LASTPOS=1000059;//user.Move:59
      _this.move("moji",110,100);
      $LASTPOS=1000081;//user.Move:81
      _this.wait(1000);
      $LASTPOS=1000093;//user.Move:93
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
            $LASTPOS=1000025;//user.Move:25
            _this.fiber$move(_thread, "moji", 100, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000047;//user.Move:47
            _this.fiber$wait(_thread, 1000);
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000059;//user.Move:59
            _this.fiber$move(_thread, "moji", 110, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=1000081;//user.Move:81
            _this.fiber$wait(_thread, 1000);
            __pc=4;return;
          case 4:
            
            $LASTPOS=1000093;//user.Move:93
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
  fullName: 'user.MoveVar',
  shortName: 'MoveVar',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_MoveVar_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000031;//user.MoveVar:31
      _this.x=100;
      $LASTPOS=2000038;//user.MoveVar:38
      _this.move("moji",_this.x,100);
      $LASTPOS=2000058;//user.MoveVar:58
      _this.wait(1000);
      $LASTPOS=2000070;//user.MoveVar:70
      _this.x+=10;
      $LASTPOS=2000077;//user.MoveVar:77
      _this.move("moji",_this.x,100);
      $LASTPOS=2000097;//user.MoveVar:97
      _this.wait(1000);
      $LASTPOS=2000109;//user.MoveVar:109
      _this.x+=10;
      $LASTPOS=2000116;//user.MoveVar:116
      _this.move("moji",_this.x,100);
      $LASTPOS=2000136;//user.MoveVar:136
      _this.wait(1000);
    },
    fiber$main :function _trc_MoveVar_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000031;//user.MoveVar:31
      _this.x=100;
      
      _thread.enter(function _trc_MoveVar_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000038;//user.MoveVar:38
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000058;//user.MoveVar:58
            _this.fiber$wait(_thread, 1000);
            __pc=2;return;
          case 2:
            
            $LASTPOS=2000070;//user.MoveVar:70
            _this.x+=10;
            $LASTPOS=2000077;//user.MoveVar:77
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=2000097;//user.MoveVar:97
            _this.fiber$wait(_thread, 1000);
            __pc=4;return;
          case 4:
            
            $LASTPOS=2000109;//user.MoveVar:109
            _this.x+=10;
            $LASTPOS=2000116;//user.MoveVar:116
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=5;return;
          case 5:
            
            $LASTPOS=2000136;//user.MoveVar:136
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
      
      $LASTPOS=3000014;//user.MoveWhile:14
      _this.x=100;
      $LASTPOS=3000021;//user.MoveWhile:21
      while (_this.x<200) {
        $LASTPOS=3000040;//user.MoveWhile:40
        _this.move("moji",_this.x,100);
        $LASTPOS=3000064;//user.MoveWhile:64
        _this.wait(1000);
        $LASTPOS=3000080;//user.MoveWhile:80
        _this.x+=10;
        
      }
    },
    fiber$main :function _trc_MoveWhile_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000014;//user.MoveWhile:14
      _this.x=100;
      
      _thread.enter(function _trc_MoveWhile_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000021;//user.MoveWhile:21
          case 1:
            if (!(_this.x<200)) { __pc=4; break; }
            $LASTPOS=3000040;//user.MoveWhile:40
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=2;return;
          case 2:
            
            $LASTPOS=3000064;//user.MoveWhile:64
            _this.fiber$wait(_thread, 1000);
            __pc=3;return;
          case 3:
            
            $LASTPOS=3000080;//user.MoveWhile:80
            _this.x+=10;
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
      
      $LASTPOS=4000027;//user.WriteLabel:27
      _this.c=0;
      $LASTPOS=4000032;//user.WriteLabel:32
      while (_this.c<10) {
        $LASTPOS=4000050;//user.WriteLabel:50
        _this.setText("count",_this.c);
        $LASTPOS=4000074;//user.WriteLabel:74
        _this.wait(1000);
        $LASTPOS=4000090;//user.WriteLabel:90
        _this.c+=1;
        
      }
    },
    fiber$main :function _trc_WriteLabel_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000027;//user.WriteLabel:27
      _this.c=0;
      
      _thread.enter(function _trc_WriteLabel_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=4000032;//user.WriteLabel:32
          case 1:
            if (!(_this.c<10)) { __pc=4; break; }
            $LASTPOS=4000050;//user.WriteLabel:50
            _this.fiber$setText(_thread, "count", _this.c);
            __pc=2;return;
          case 2:
            
            $LASTPOS=4000074;//user.WriteLabel:74
            _this.fiber$wait(_thread, 1000);
            __pc=3;return;
          case 3:
            
            $LASTPOS=4000090;//user.WriteLabel:90
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
      
      $LASTPOS=5000014;//user.MoveIf:14
      _this.x=100;
      $LASTPOS=5000021;//user.MoveIf:21
      while (true) {
        $LASTPOS=5000039;//user.MoveIf:39
        _this.move("moji",_this.x,100);
        $LASTPOS=5000063;//user.MoveIf:63
        _this.wait(100);
        $LASTPOS=5000078;//user.MoveIf:78
        _this.x+=10;
        $LASTPOS=5000089;//user.MoveIf:89
        if (_this.x>200) {
          $LASTPOS=5000100;//user.MoveIf:100
          _this.x=0;
        }
        
      }
    },
    fiber$main :function _trc_MoveIf_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000014;//user.MoveIf:14
      _this.x=100;
      
      _thread.enter(function _trc_MoveIf_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=5000021;//user.MoveIf:21
          case 1:
            $LASTPOS=5000039;//user.MoveIf:39
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=2;return;
          case 2:
            
            $LASTPOS=5000063;//user.MoveIf:63
            _this.fiber$wait(_thread, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=5000078;//user.MoveIf:78
            _this.x+=10;
            $LASTPOS=5000089;//user.MoveIf:89
            if (_this.x>200) {
              $LASTPOS=5000100;//user.MoveIf:100
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
  fullName: 'user.Canvas',
  shortName: 'Canvas',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Canvas_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=6000014;//user.Canvas:14
      _this.setCanvas("cv");
      $LASTPOS=6000031;//user.Canvas:31
      _this.fillRect(20,30,50,50);
      $LASTPOS=6000054;//user.Canvas:54
      _this.moveTo(50,50);
      $LASTPOS=6000069;//user.Canvas:69
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
            $LASTPOS=6000014;//user.Canvas:14
            _this.fiber$setCanvas(_thread, "cv");
            __pc=1;return;
          case 1:
            
            $LASTPOS=6000031;//user.Canvas:31
            _this.fiber$fillRect(_thread, 20, 30, 50, 50);
            __pc=2;return;
          case 2:
            
            $LASTPOS=6000054;//user.Canvas:54
            _this.moveTo(50,50);
            $LASTPOS=6000069;//user.Canvas:69
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
