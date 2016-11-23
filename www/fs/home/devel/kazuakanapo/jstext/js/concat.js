Tonyu.klass.define({
  fullName: 'user.Whyhr',
  shortName: 'Whyhr',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Whyhr_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Whyhr_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.WhyhrUsingDOM',
  shortName: 'WhyhrUsingDOM',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_WhyhrUsingDOM_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_WhyhrUsingDOM_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.ErrCheck',
  shortName: 'ErrCheck',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_ErrCheck_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000075;//user.ErrCheck:75
      $LASTPOS=1000079;//user.ErrCheck:79
      _this.i=1;
      while(_this.i<=300) {
        {
          $LASTPOS=1000101;//user.ErrCheck:101
          if (_this.i%15==0) {
            $LASTPOS=1000123;//user.ErrCheck:123
            _this.addText("j","FizzBuzz");
            
          } else {
            $LASTPOS=1000159;//user.ErrCheck:159
            if (_this.i-30==0.1) {
              $LASTPOS=1000212;//user.ErrCheck:212
              _this.addText("j","Fizz");
              
            } else {
              $LASTPOS=1000244;//user.ErrCheck:244
              if (_this.i%5==0) {
                $LASTPOS=1000275;//user.ErrCheck:275
                _this.addText("j","Buzz");
                
              } else {
                $LASTPOS=1000317;//user.ErrCheck:317
                if (_this.i%3==0) {
                  $LASTPOS=1000348;//user.ErrCheck:348
                  _this.addText("j","Fizz");
                  
                } else {
                  $LASTPOS=1000400;//user.ErrCheck:400
                  _this.addText("j",_this.i);
                  
                }
              }
            }
          }
          $LASTPOS=1000428;//user.ErrCheck:428
          _this.addText("j","<br>");
          $LASTPOS=1000454;//user.ErrCheck:454
          _this.wait(2);
        }
        _this.i++;
      }
    },
    fiber$main :function _trc_ErrCheck_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_ErrCheck_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000075;//user.ErrCheck:75
            $LASTPOS=1000079;//user.ErrCheck:79
            _this.i=1;;
          case 1:
            if (!(_this.i<=300)) { __pc=17; break; }
            $LASTPOS=1000101;//user.ErrCheck:101
            if (!(_this.i%15==0)) { __pc=3; break; }
            $LASTPOS=1000123;//user.ErrCheck:123
            _this.fiber$addText(_thread, "j", "FizzBuzz");
            __pc=2;return;
          case 2:
            
            __pc=14;break;
          case 3:
            $LASTPOS=1000159;//user.ErrCheck:159
            if (!(_this.i-30==0.1)) { __pc=5; break; }
            $LASTPOS=1000212;//user.ErrCheck:212
            _this.fiber$addText(_thread, "j", "Fizz");
            __pc=4;return;
          case 4:
            
            __pc=13;break;
          case 5:
            $LASTPOS=1000244;//user.ErrCheck:244
            if (!(_this.i%5==0)) { __pc=7; break; }
            $LASTPOS=1000275;//user.ErrCheck:275
            _this.fiber$addText(_thread, "j", "Buzz");
            __pc=6;return;
          case 6:
            
            __pc=12;break;
          case 7:
            $LASTPOS=1000317;//user.ErrCheck:317
            if (!(_this.i%3==0)) { __pc=9; break; }
            $LASTPOS=1000348;//user.ErrCheck:348
            _this.fiber$addText(_thread, "j", "Fizz");
            __pc=8;return;
          case 8:
            
            __pc=11;break;
          case 9:
            $LASTPOS=1000400;//user.ErrCheck:400
            _this.fiber$addText(_thread, "j", _this.i);
            __pc=10;return;
          case 10:
            
          case 11:
            
          case 12:
            
          case 13:
            
          case 14:
            
            $LASTPOS=1000428;//user.ErrCheck:428
            _this.fiber$addText(_thread, "j", "<br>");
            __pc=15;return;
          case 15:
            
            $LASTPOS=1000454;//user.ErrCheck:454
            _this.fiber$wait(_thread, 2);
            __pc=16;return;
          case 16:
            
            _this.i++;
            __pc=1;break;
          case 17:
            
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