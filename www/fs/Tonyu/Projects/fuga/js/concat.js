Tonyu.klass.define({
  fullName: 'user.Fug',
  shortName: 'Fug',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Fug_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000014;//user.Fug:14
      _this.move("fuga",200,200);
      $LASTPOS=1000036;//user.Fug:36
      $LASTPOS=1000041;//user.Fug:41
      _this.i=0;
      while(_this.i<200) {
        {
          $LASTPOS=1000062;//user.Fug:62
          _this.transform("fuga",_this.i,2,1);
          $LASTPOS=1000091;//user.Fug:91
          _this.wait(20);
        }
        _this.i++;
      }
    },
    fiber$main :function _trc_Fug_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Fug_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000014;//user.Fug:14
            _this.fiber$move(_thread, "fuga", 200, 200);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000036;//user.Fug:36
            $LASTPOS=1000041;//user.Fug:41
            _this.i=0;;
          case 2:
            if (!(_this.i<200)) { __pc=5; break; }
            $LASTPOS=1000062;//user.Fug:62
            _this.fiber$transform(_thread, "fuga", _this.i, 2, 1);
            __pc=3;return;
          case 3:
            
            $LASTPOS=1000091;//user.Fug:91
            _this.fiber$wait(_thread, 20);
            __pc=4;return;
          case 4:
            
            _this.i++;
            __pc=2;break;
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Hello',
  shortName: 'Hello',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Hello_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=2000011;//user.Hello:11
      _this.wait(1000);
      $LASTPOS=2000023;//user.Hello:23
      $("h1").text("nyan");
    },
    fiber$main :function _trc_Hello_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Hello_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000011;//user.Hello:11
            _this.fiber$wait(_thread, 1000);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000023;//user.Hello:23
            $("h1").text("nyan");
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Toste',
  shortName: 'Toste',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Toste_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=3000024;//user.Toste:24
      _this.wait(1000);
      $LASTPOS=3000036;//user.Toste:36
      $("h1").append("llo");
    },
    fiber$main :function _trc_Toste_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Toste_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000024;//user.Toste:24
            _this.fiber$wait(_thread, 1000);
            __pc=1;return;
          case 1:
            
            $LASTPOS=3000036;//user.Toste:36
            $("h1").append("llo");
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
