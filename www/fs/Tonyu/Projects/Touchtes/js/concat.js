Tonyu.klass.define({
  fullName: 'user.Touce',
  shortName: 'Touce',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Touce_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000015;//user.Touce:15
      _this.setCanvas("cv");
      $LASTPOS=1000059;//user.Touce:59
      _this.onTouch(Tonyu.bindFunc(_this,_this.touce));
    },
    fiber$main :function _trc_Touce_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Touce_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000015;//user.Touce:15
            _this.fiber$setCanvas(_thread, "cv");
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000059;//user.Touce:59
            _this.fiber$onTouch(_thread, Tonyu.bindFunc(_this,_this.touce));
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    touce :function _trc_Touce_touce(x,y,state) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000101;//user.Touce:101
      _this.move("zu",x,y);
      $LASTPOS=1000121;//user.Touce:121
      _this.setText("zu",state);
    },
    fiber$touce :function _trc_Touce_f_touce(_thread,x,y,state) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Touce_ent_touce(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000101;//user.Touce:101
            _this.fiber$move(_thread, "zu", x, y);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000121;//user.Touce:121
            _this.fiber$setText(_thread, "zu", state);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"touce":{"nowait":false}}}
});
