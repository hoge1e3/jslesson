Tonyu.klass.define({
  fullName: 'user.Hello',
  shortName: 'Hello',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Hello_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000011;//user.Hello:11
      _this.wait(1000);
      $LASTPOS=1000023;//user.Hello:23
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
            $LASTPOS=1000011;//user.Hello:11
            _this.fiber$wait(_thread, 1000);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000023;//user.Hello:23
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
      
      $LASTPOS=2000024;//user.Toste:24
      _this.wait(100);
      $LASTPOS=2000035;//user.Toste:35
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
            $LASTPOS=2000024;//user.Toste:24
            _this.fiber$wait(_thread, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000035;//user.Toste:35
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
