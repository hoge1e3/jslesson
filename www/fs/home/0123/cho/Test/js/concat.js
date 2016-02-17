Tonyu.klass.define({
  fullName: 'user.T1',
  shortName: 'T1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_T1_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_T1_f_main(_thread) {
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
  fullName: 'user.T2',
  shortName: 'T2',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_T2_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000014;//user.T2:14
      $LASTPOS=1000018;//user.T2:18
      _this.i=0;
      while(_this.i<10) {
        {
          $LASTPOS=1000037;//user.T2:37
          _this.setText("s",_this.i);
          $LASTPOS=1000057;//user.T2:57
          _this.wait(20);
        }
        _this.i++;
      }
    },
    fiber$main :function _trc_T2_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_T2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000014;//user.T2:14
            $LASTPOS=1000018;//user.T2:18
            _this.i=0;;
          case 1:
            if (!(_this.i<10)) { __pc=4; break; }
            $LASTPOS=1000037;//user.T2:37
            _this.fiber$setText(_thread, "s", _this.i);
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000057;//user.T2:57
            _this.fiber$wait(_thread, 20);
            __pc=3;return;
          case 3:
            
            _this.i++;
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
