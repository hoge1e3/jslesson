Tonyu.klass.define({
  fullName: 'user.Touch',
  shortName: 'Touch',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Touch_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000014;//user.Touch:14
      _this.onTouch(Tonyu.bindFunc(_this,_this.touch));
    },
    fiber$main :function _trc_Touch_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Touch_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000014;//user.Touch:14
            _this.fiber$onTouch(_thread, Tonyu.bindFunc(_this,_this.touch));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    touch :function _trc_Touch_touch(x,y,state) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000056;//user.Touch:56
      _this.move("label",x,y);
      $LASTPOS=1000079;//user.Touch:79
      _this.setText("label",state);
    },
    fiber$touch :function _trc_Touch_f_touch(_thread,x,y,state) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Touch_ent_touch(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000056;//user.Touch:56
            _this.fiber$move(_thread, "label", x, y);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000079;//user.Touch:79
            _this.fiber$setText(_thread, "label", state);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"touch":{"nowait":false}}}
});
