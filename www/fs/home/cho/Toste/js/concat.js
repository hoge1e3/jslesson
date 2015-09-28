Tonyu.klass.define({
  fullName: 'user.Head',
  shortName: 'Head',
  namespace: 'user',
  includes: [],
  methods: {
    main :function _trc_Head_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000014;//user.Head:14
      _this.x=3;
    },
    fiber$main :function _trc_Head_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000014;//user.Head:14
      _this.x=3;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
