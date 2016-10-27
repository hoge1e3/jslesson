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
});
//# sourceMappingURL=concat.js.map