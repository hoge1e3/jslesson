Tonyu.klass.define({
  fullName: 'user.Neko',
  shortName: 'Neko',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Neko_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000024;//user.Neko:24
      $("#ne").append("ねこ");
    },
    fiber$main :function _trc_Neko_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000024;//user.Neko:24
      $("#ne").append("ねこ");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
