Tonyu.klass.define({
  fullName: 'user.Js01',
  shortName: 'Js01',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Js01_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Js01_f_main(_thread) {
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
  fullName: 'user.Js02',
  shortName: 'Js02',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Js02_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000014;//user.Js02:14
      _this.x=100;
      $LASTPOS=1000021;//user.Js02:21
      _this.move("moji",_this.x,100);
      $LASTPOS=1000041;//user.Js02:41
      _this.wait(1000);
      $LASTPOS=1000053;//user.Js02:53
      _this.x+=10;
      $LASTPOS=1000060;//user.Js02:60
      _this.move("moji",_this.x,100);
    },
    fiber$main :function _trc_Js02_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000014;//user.Js02:14
      _this.x=100;
      
      _thread.enter(function _trc_Js02_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000021;//user.Js02:21
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000041;//user.Js02:41
            _this.fiber$wait(_thread, 1000);
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000053;//user.Js02:53
            _this.x+=10;
            $LASTPOS=1000060;//user.Js02:60
            _this.fiber$move(_thread, "moji", _this.x, 100);
            __pc=3;return;
          case 3:
            
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
  fullName: 'user.JS03',
  shortName: 'JS03',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_JS03_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000014;//user.JS03:14
      _this.resize("n",2,0.8);
      $LASTPOS=2000033;//user.JS03:33
      _this.move("n",_this.rnd(200),_this.rnd(200));
    },
    fiber$main :function _trc_JS03_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_JS03_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000014;//user.JS03:14
            _this.fiber$resize(_thread, "n", 2, 0.8);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000033;//user.JS03:33
            _this.fiber$move(_thread, "n", _this.rnd(200), _this.rnd(200));
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
