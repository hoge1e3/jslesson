Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Main_main() {
        "use strict";
        var _this=this;
        
        _this.x=100;
        _this.y=200;
        new Tonyu.classes.kernel.Button({top: 300,onClick: (function anonymous_43() {
          
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_land);
        })});
      },
      fiber$main :function _trc_Main_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x=100;
        _this.y=200;
        new Tonyu.classes.kernel.Button({top: 300,onClick: (function anonymous_43() {
          
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_land);
        })});
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});

//# sourceMappingURL=concat.js.map