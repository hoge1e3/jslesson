Tonyu.klass.define({
  fullName: 'user.Fuga',
  shortName: 'Fuga',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Fuga_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000027;//user.Fuga:27
      _this.wait(1000);
      $LASTPOS=1000039;//user.Fuga:39
      $("h1").append("は");
    },
    fiber$main :function _trc_Fuga_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Fuga_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000027;//user.Fuga:27
            _this.fiber$wait(_thread, 1000);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000039;//user.Fuga:39
            $("h1").append("は");
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
