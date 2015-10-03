Tonyu.klass.define({
  fullName: 'user.MoveVar',
  shortName: 'MoveVar',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_MoveVar_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000031;//user.MoveVar:31
      _this.x=100;
      $LASTPOS=1000038;//user.MoveVar:38
      _this.move("moji",_this.x,100);
      $LASTPOS=1000058;//user.MoveVar:58
      _this.wait(1000);
      $LASTPOS=1000070;//user.MoveVar:70
      _this.x+=10;
      $LASTPOS=1000077;//user.MoveVar:77
      _this.move("moji",_this.x,100);
      $LASTPOS=1000097;//user.MoveVar:97
      _this.wait(1000);
      $LASTPOS=1000109;//user.MoveVar:109
      _this.x+=10;
      $LASTPOS=1000116;//user.MoveVar:116
      _this.move("moji",_this.x,100);
      $LASTPOS=1000136;//user.MoveVar:136
      _this.wait(1000);
    },
    fiber$main :function _trc_MoveVar_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000031;//user.MoveVar:31
      _this.x=100;
      
      _thread.enter(function _trc_MoveVar_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000038;//user.MoveVar:38
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000058;//user.MoveVar:58
            _this.fiber$wait(_thread, 1000);
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000070;//user.MoveVar:70
            _this.x+=10;
            $LASTPOS=1000077;//user.MoveVar:77
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=1000097;//user.MoveVar:97
            _this.fiber$wait(_thread, 1000);
            __pc=4;return;
          case 4:
            
            $LASTPOS=1000109;//user.MoveVar:109
            _this.x+=10;
            $LASTPOS=1000116;//user.MoveVar:116
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=5;return;
          case 5:
            
            $LASTPOS=1000136;//user.MoveVar:136
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
  fullName: 'user.WriteLabel',
  shortName: 'WriteLabel',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_WriteLabel_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000027;//user.WriteLabel:27
      _this.c=0;
      $LASTPOS=2000032;//user.WriteLabel:32
      while (_this.c<10) {
        $LASTPOS=2000050;//user.WriteLabel:50
        _this.setText("count",_this.c);
        $LASTPOS=2000074;//user.WriteLabel:74
        _this.wait(1000);
        $LASTPOS=2000090;//user.WriteLabel:90
        _this.c+=1;
        
      }
    },
    fiber$main :function _trc_WriteLabel_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000027;//user.WriteLabel:27
      _this.c=0;
      
      _thread.enter(function _trc_WriteLabel_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000032;//user.WriteLabel:32
          case 1:
            if (!(_this.c<10)) { __pc=4; break; }
            $LASTPOS=2000050;//user.WriteLabel:50
            _this.fiber$setText(_thread, "count", _this.c);
            __pc=2;return;
          case 2:
            
            $LASTPOS=2000074;//user.WriteLabel:74
            _this.fiber$wait(_thread, 1000);
            __pc=3;return;
          case 3:
            
            $LASTPOS=2000090;//user.WriteLabel:90
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
  fullName: 'user.Move',
  shortName: 'Move',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Move_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000025;//user.Move:25
      _this.move("moji",100,100);
      $LASTPOS=3000047;//user.Move:47
      _this.wait(1000);
      $LASTPOS=3000059;//user.Move:59
      _this.move("moji",110,100);
      $LASTPOS=3000081;//user.Move:81
      _this.wait(1000);
      $LASTPOS=3000093;//user.Move:93
      _this.move("moji",120,100);
    },
    fiber$main :function _trc_Move_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Move_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000025;//user.Move:25
            _this.fiber$move(_thread, "moji", 100, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=3000047;//user.Move:47
            _this.fiber$wait(_thread, 1000);
            __pc=2;return;
          case 2:
            
            $LASTPOS=3000059;//user.Move:59
            _this.fiber$move(_thread, "moji", 110, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=3000081;//user.Move:81
            _this.fiber$wait(_thread, 1000);
            __pc=4;return;
          case 4:
            
            $LASTPOS=3000093;//user.Move:93
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
  fullName: 'user.MoveWhile',
  shortName: 'MoveWhile',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_MoveWhile_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=4000014;//user.MoveWhile:14
      _this.x=100;
      $LASTPOS=4000021;//user.MoveWhile:21
      while (_this.x<200) {
        $LASTPOS=4000040;//user.MoveWhile:40
        _this.move("moji",_this.x,100);
        $LASTPOS=4000064;//user.MoveWhile:64
        _this.wait(1000);
        $LASTPOS=4000080;//user.MoveWhile:80
        _this.x+=10;
        
      }
    },
    fiber$main :function _trc_MoveWhile_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000014;//user.MoveWhile:14
      _this.x=100;
      
      _thread.enter(function _trc_MoveWhile_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=4000021;//user.MoveWhile:21
          case 1:
            if (!(_this.x<200)) { __pc=4; break; }
            $LASTPOS=4000040;//user.MoveWhile:40
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=2;return;
          case 2:
            
            $LASTPOS=4000064;//user.MoveWhile:64
            _this.fiber$wait(_thread, 1000);
            __pc=3;return;
          case 3:
            
            $LASTPOS=4000080;//user.MoveWhile:80
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
