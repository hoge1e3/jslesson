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
      
      $LASTPOS=1000023;//user.Game1:23
      _this.x=100;
      $LASTPOS=1000030;//user.Game1:30
      _this.y=300;
      $LASTPOS=1000037;//user.Game1:37
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=1000061;//user.Game1:61
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=1000083;//user.Game1:83
      while (true) {
        $LASTPOS=1000101;//user.Game1:101
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=1000123;//user.Game1:123
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game1_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000023;//user.Game1:23
      _this.x=100;
      $LASTPOS=1000030;//user.Game1:30
      _this.y=300;
      
      _thread.enter(function _trc_Game1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000037;//user.Game1:37
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000061;//user.Game1:61
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000083;//user.Game1:83
          case 3:
            $LASTPOS=1000101;//user.Game1:101
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=1000123;//user.Game1:123
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
      
      $LASTPOS=1000158;//user.Game1:158
      _this.x-=10;
    },
    fiber$left :function _trc_Game1_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000158;//user.Game1:158
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game1_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000190;//user.Game1:190
      _this.x+=10;
    },
    fiber$right :function _trc_Game1_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000190;//user.Game1:190
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
      
      $LASTPOS=2000023;//user.Game2:23
      _this.x=100;
      $LASTPOS=2000030;//user.Game2:30
      _this.y=300;
      $LASTPOS=2000037;//user.Game2:37
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=2000061;//user.Game2:61
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=2000083;//user.Game2:83
      while (true) {
        $LASTPOS=2000101;//user.Game2:101
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=2000123;//user.Game2:123
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
      
      _thread.enter(function _trc_Game2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000037;//user.Game2:37
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000061;//user.Game2:61
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=2000083;//user.Game2:83
          case 3:
            $LASTPOS=2000101;//user.Game2:101
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=2000123;//user.Game2:123
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
    left :function _trc_Game2_left() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000158;//user.Game2:158
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_f_left(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000158;//user.Game2:158
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_right() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000190;//user.Game2:190
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_f_right(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000190;//user.Game2:190
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
