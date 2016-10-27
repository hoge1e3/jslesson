Tonyu.klass.define({
  fullName: 'user.PrintImages',
  shortName: 'PrintImages',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_PrintImages_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000089;//user.PrintImages:89
      $LASTPOS=1000093;//user.PrintImages:93
      _this.i=1;
      while(_this.i<=50) {
        {
          $LASTPOS=1000113;//user.PrintImages:113
          if (_this.i%2==0) {
            $LASTPOS=1000133;//user.PrintImages:133
            _this.addText("area","<img src=images/neko1.png>");
            
          } else {
            $LASTPOS=1000198;//user.PrintImages:198
            _this.addText("area","<img src=images/fish.png>");
            
          }
        }
        _this.i++;
      }
    },
    fiber$main :function _trc_PrintImages_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_PrintImages_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000089;//user.PrintImages:89
            $LASTPOS=1000093;//user.PrintImages:93
            _this.i=1;;
          case 1:
            if (!(_this.i<=50)) { __pc=6; break; }
            $LASTPOS=1000113;//user.PrintImages:113
            if (!(_this.i%2==0)) { __pc=3; break; }
            $LASTPOS=1000133;//user.PrintImages:133
            _this.fiber$addText(_thread, "area", "<img src=images/neko1.png>");
            __pc=2;return;
          case 2:
            
            __pc=5;break;
          case 3:
            $LASTPOS=1000198;//user.PrintImages:198
            _this.fiber$addText(_thread, "area", "<img src=images/fish.png>");
            __pc=4;return;
          case 4:
            
          case 5:
            
            _this.i++;
            __pc=1;break;
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.WhileDonyu',
  shortName: 'WhileDonyu',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_WhileDonyu_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000073;//user.WhileDonyu:73
      $LASTPOS=2000077;//user.WhileDonyu:77
      _this.i=1;
      while(_this.i<=50) {
        {
          $LASTPOS=2000097;//user.WhileDonyu:97
          if (_this.i%2==0) {
            $LASTPOS=2000117;//user.WhileDonyu:117
            _this.addText("area","<img src=images/neko1.png>");
            
          } else {
            $LASTPOS=2000182;//user.WhileDonyu:182
            _this.addText("area","<img src=images/fish.png>");
            
          }
        }
        _this.i++;
      }
    },
    fiber$main :function _trc_WhileDonyu_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_WhileDonyu_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000073;//user.WhileDonyu:73
            $LASTPOS=2000077;//user.WhileDonyu:77
            _this.i=1;;
          case 1:
            if (!(_this.i<=50)) { __pc=6; break; }
            $LASTPOS=2000097;//user.WhileDonyu:97
            if (!(_this.i%2==0)) { __pc=3; break; }
            $LASTPOS=2000117;//user.WhileDonyu:117
            _this.fiber$addText(_thread, "area", "<img src=images/neko1.png>");
            __pc=2;return;
          case 2:
            
            __pc=5;break;
          case 3:
            $LASTPOS=2000182;//user.WhileDonyu:182
            _this.fiber$addText(_thread, "area", "<img src=images/fish.png>");
            __pc=4;return;
          case 4:
            
          case 5:
            
            _this.i++;
            __pc=1;break;
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.Colatz',
  shortName: 'Colatz',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Colatz_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000073;//user.Colatz:73
      _this.num=27;
      $LASTPOS=3000081;//user.Colatz:81
      while (_this.num!=1) {
        $LASTPOS=3000100;//user.Colatz:100
        if (_this.num%2==0) {
          $LASTPOS=3000122;//user.Colatz:122
          _this.num=_this.num/2;
          
        } else {
          $LASTPOS=3000152;//user.Colatz:152
          _this.num=_this.num*3+1;
          
        }
        $LASTPOS=3000175;//user.Colatz:175
        _this.addText("r",_this.num);
        $LASTPOS=3000197;//user.Colatz:197
        _this.addText("r","<br>");
        
      }
    },
    fiber$main :function _trc_Colatz_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000073;//user.Colatz:73
      _this.num=27;
      
      _thread.enter(function _trc_Colatz_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000081;//user.Colatz:81
          case 1:
            if (!(_this.num!=1)) { __pc=4; break; }
            $LASTPOS=3000100;//user.Colatz:100
            if (_this.num%2==0) {
              $LASTPOS=3000122;//user.Colatz:122
              _this.num=_this.num/2;
              
            } else {
              $LASTPOS=3000152;//user.Colatz:152
              _this.num=_this.num*3+1;
              
            }
            $LASTPOS=3000175;//user.Colatz:175
            _this.fiber$addText(_thread, "r", _this.num);
            __pc=2;return;
          case 2:
            
            $LASTPOS=3000197;//user.Colatz:197
            _this.fiber$addText(_thread, "r", "<br>");
            __pc=3;return;
          case 3:
            
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
//# sourceMappingURL=concat.js.map