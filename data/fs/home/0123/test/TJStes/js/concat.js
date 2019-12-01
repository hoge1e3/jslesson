Tonyu.klass.define({
  fullName: 'user.Test',
  shortName: 'Test',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Test_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000001;//user.Test:1
      _this.sum=0;
      $LASTPOS=1000008;//user.Test:8
      $LASTPOS=1000012;//user.Test:12
      _this.i=1;for (; _this.i<=10 ; _this.i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1000033;//user.Test:33
          _this.sum+=_this.i;
          $LASTPOS=1000045;//user.Test:45
          _this.wait(10);
          $LASTPOS=1000059;//user.Test:59
          _this.setText('test',_this.sum);
        }
      }
    },
    fiber$main :function _trc_Test_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000001;//user.Test:1
      _this.sum=0;
      
      _thread.enter(function _trc_Test_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000008;//user.Test:8
            $LASTPOS=1000012;//user.Test:12
            _this.i=1;
          case 1:
            if (!(_this.i<=10)) { __pc=5     ; break; }
            $LASTPOS=1000033;//user.Test:33
            _this.sum+=_this.i;
            $LASTPOS=1000045;//user.Test:45
            _this.fiber$wait(_thread, 10);
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000059;//user.Test:59
            _this.fiber$setText(_thread, 'test', _this.sum);
            __pc=3;return;
          case 3:
            
          case 4     :
            _this.i++;
            __pc=1;break;
          case 5     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"sum":{},"i":{}}}
});

//# sourceMappingURL=concat.js.map