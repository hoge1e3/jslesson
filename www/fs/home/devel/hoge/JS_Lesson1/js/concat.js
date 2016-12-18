Tonyu.klass.define({
  fullName: 'user.HTML1',
  shortName: 'HTML1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_HTML1_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000017;//user.HTML1:17
      $LASTPOS=1000021;//user.HTML1:21
      _this.i=0;
      while(_this.i<10) {
        {
          $LASTPOS=1000042;//user.HTML1:42
          if (_this.i==5) {
            $LASTPOS=1000052;//user.HTML1:52
            _this.setText("bun","<image src=images/crab.png >");
          } else {
            $LASTPOS=1000109;//user.HTML1:109
            _this.addText("bun","<image src=images/crab.png >");
          }
          $LASTPOS=1000161;//user.HTML1:161
          _this.wait(500);
        }
        _this.i++;
      }
    },
    fiber$main :function _trc_HTML1_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_HTML1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000017;//user.HTML1:17
            $LASTPOS=1000021;//user.HTML1:21
            _this.i=0;;
          case 1:
            if (!(_this.i<10)) { __pc=7; break; }
            $LASTPOS=1000042;//user.HTML1:42
            if (!(_this.i==5)) { __pc=3; break; }
            $LASTPOS=1000052;//user.HTML1:52
            _this.fiber$setText(_thread, "bun", "<image src=images/crab.png >");
            __pc=2;return;
          case 2:
            
            __pc=5;break;
          case 3:
            $LASTPOS=1000109;//user.HTML1:109
            _this.fiber$addText(_thread, "bun", "<image src=images/crab.png >");
            __pc=4;return;
          case 4:
            
          case 5:
            
            $LASTPOS=1000161;//user.HTML1:161
            _this.fiber$wait(_thread, 500);
            __pc=6;return;
          case 6:
            
            _this.i++;
            __pc=1;break;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.HTML2_BG',
  shortName: 'HTML2_BG',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_HTML2_BG_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_HTML2_BG_f_main(_thread) {
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
  fullName: 'user.HTML3_IMG',
  shortName: 'HTML3_IMG',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_HTML3_IMG_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_HTML3_IMG_f_main(_thread) {
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
  fullName: 'user.HTML4_UI',
  shortName: 'HTML4_UI',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_HTML4_UI_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000023;//user.HTML4_UI:23
      _this.onClick("ok",Tonyu.bindFunc(_this,_this.add));
    },
    fiber$main :function _trc_HTML4_UI_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_HTML4_UI_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000023;//user.HTML4_UI:23
            _this.fiber$onClick(_thread, "ok", Tonyu.bindFunc(_this,_this.add));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    add :function _trc_HTML4_UI_add() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var x;
      var y;
      var result;
      
      $LASTPOS=2000066;//user.HTML4_UI:66
      x = _this.getNumber("x");
      $LASTPOS=2000093;//user.HTML4_UI:93
      y = _this.getNumber("y");
      $LASTPOS=2000120;//user.HTML4_UI:120
      result = x+y;
      $LASTPOS=2000141;//user.HTML4_UI:141
      _this.setText("result",result);
    },
    fiber$add :function _trc_HTML4_UI_f_add(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var x;
      var y;
      var result;
      
      $LASTPOS=2000066;//user.HTML4_UI:66
      x = _this.getNumber("x");
      $LASTPOS=2000093;//user.HTML4_UI:93
      y = _this.getNumber("y");
      $LASTPOS=2000120;//user.HTML4_UI:120
      result = x+y;
      
      _thread.enter(function _trc_HTML4_UI_ent_add(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000141;//user.HTML4_UI:141
            _this.fiber$setText(_thread, "result", result);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"add":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.HTML5_Link',
  shortName: 'HTML5_Link',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_HTML5_Link_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_HTML5_Link_f_main(_thread) {
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
  fullName: 'user.Jyanpoi',
  shortName: 'Jyanpoi',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Jyanpoi_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000075;//user.Jyanpoi:75
      _this.onClick("b",Tonyu.bindFunc(_this,_this.judge));
    },
    fiber$main :function _trc_Jyanpoi_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Jyanpoi_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000075;//user.Jyanpoi:75
            _this.fiber$onClick(_thread, "b", Tonyu.bindFunc(_this,_this.judge));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    judge :function _trc_Jyanpoi_judge() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000121;//user.Jyanpoi:121
      _this.jcode=_this.rnd(3);
      $LASTPOS=3000167;//user.Jyanpoi:167
      if (_this.jcode==0) {
        $LASTPOS=3000190;//user.Jyanpoi:190
        _this.setText("j","ぐー");
        
      } else {
        $LASTPOS=3000221;//user.Jyanpoi:221
        if (_this.jcode==1) {
          $LASTPOS=3000234;//user.Jyanpoi:234
          _this.setText("j","ちょき");
          
        } else {
          $LASTPOS=3000276;//user.Jyanpoi:276
          if (_this.jcode==2) {
            $LASTPOS=3000289;//user.Jyanpoi:289
            _this.setText("j","ぱー");
            
          }
        }
      }
    },
    fiber$judge :function _trc_Jyanpoi_f_judge(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Jyanpoi_ent_judge(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000121;//user.Jyanpoi:121
            _this.fiber$rnd(_thread, 3);
            __pc=1;return;
          case 1:
            _this.jcode=_thread.retVal;
            
            $LASTPOS=3000167;//user.Jyanpoi:167
            if (!(_this.jcode==0)) { __pc=3; break; }
            $LASTPOS=3000190;//user.Jyanpoi:190
            _this.fiber$setText(_thread, "j", "ぐー");
            __pc=2;return;
          case 2:
            
            __pc=9;break;
          case 3:
            $LASTPOS=3000221;//user.Jyanpoi:221
            if (!(_this.jcode==1)) { __pc=5; break; }
            $LASTPOS=3000234;//user.Jyanpoi:234
            _this.fiber$setText(_thread, "j", "ちょき");
            __pc=4;return;
          case 4:
            
            __pc=8;break;
          case 5:
            $LASTPOS=3000276;//user.Jyanpoi:276
            if (!(_this.jcode==2)) { __pc=7; break; }
            $LASTPOS=3000289;//user.Jyanpoi:289
            _this.fiber$setText(_thread, "j", "ぱー");
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"judge":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map