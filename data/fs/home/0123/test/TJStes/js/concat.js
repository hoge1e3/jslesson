Tonyu.klass.define({
  fullName: 'user.Test',
  shortName: 'Test',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Test_main() {
        "use strict";
        var _this=this;
        
        _this.sum=0;
        _this.i=1;for (; _this.i<=10 ; _this.i++) {
          Tonyu.checkLoop();
          {
            _this.sum+=_this.i;
            _this.wait(10);
            _this.setText('test',_this.sum);
          }
        }
      },
      fiber$main :function _trc_Test_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.sum=0;
        
        _thread.enter(function _trc_Test_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.i=1;
            case 1:
              if (!(_this.i<=10)) { __pc=5     ; break; }
              _this.sum+=_this.i;
              _this.fiber$wait(_thread, 10);
              __pc=2;return;
            case 2:
              
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
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"sum":{},"i":{}}}
});

//# sourceMappingURL=concat.js.map