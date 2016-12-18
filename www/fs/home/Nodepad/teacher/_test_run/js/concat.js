Tonyu.klass.define({
  fullName: 'user.Run',
  shortName: 'Run',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Run_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000000;//user.Run:0
      $LASTPOS=1000004;//user.Run:4
      _this.p=1;
      while(_this.p<=5) {
        {
          $LASTPOS=1000048;//user.Run:48
          $LASTPOS=1000052;//user.Run:52
          _this.i=1;
          while(_this.i<=10) {
            {
              $LASTPOS=1000103;//user.Run:103
              if (_this.i%2==0) {
                $LASTPOS=1000127;//user.Run:127
                _this.addText("j","<img src=images/ayumiAka.png>");
                
              } else {
                $LASTPOS=1000200;//user.Run:200
                if (_this.i%2==1) {
                  $LASTPOS=1000224;//user.Run:224
                  _this.addText("j","<img src=images/ayumiAo,png>");
                  
                }
              }
            }
            _this.i++;
          }
          $LASTPOS=1000334;//user.Run:334
          _this.addText("j","<br>");
        }
        _this.p++;
      }
    },
    fiber$main :function _trc_Run_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Run_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000000;//user.Run:0
            $LASTPOS=1000004;//user.Run:4
            _this.p=1;;
          case 1:
            if (!(_this.p<=5)) { __pc=10; break; }
            $LASTPOS=1000048;//user.Run:48
            $LASTPOS=1000052;//user.Run:52
            _this.i=1;;
          case 2:
            if (!(_this.i<=10)) { __pc=8; break; }
            $LASTPOS=1000103;//user.Run:103
            if (!(_this.i%2==0)) { __pc=4; break; }
            $LASTPOS=1000127;//user.Run:127
            _this.fiber$addText(_thread, "j", "<img src=images/ayumiAka.png>");
            __pc=3;return;
          case 3:
            
            __pc=7;break;
          case 4:
            $LASTPOS=1000200;//user.Run:200
            if (!(_this.i%2==1)) { __pc=6; break; }
            $LASTPOS=1000224;//user.Run:224
            _this.fiber$addText(_thread, "j", "<img src=images/ayumiAo,png>");
            __pc=5;return;
          case 5:
            
          case 6:
            
          case 7:
            
            _this.i++;
            __pc=2;break;
          case 8:
            
            $LASTPOS=1000334;//user.Run:334
            _this.fiber$addText(_thread, "j", "<br>");
            __pc=9;return;
          case 9:
            
            _this.p++;
            __pc=1;break;
          case 10:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map