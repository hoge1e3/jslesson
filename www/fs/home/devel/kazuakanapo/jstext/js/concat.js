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
  fullName: 'user.Testforin',
  shortName: 'Testforin',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Testforin_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var k;
      var v;
      var _it_1;
      
      $LASTPOS=1000073;//user.Testforin:73
      _this.obj={x: "hello ",y: "goodmorning ",z: "goodevening "};
      $LASTPOS=1000125;//user.Testforin:125
      _it_1=Tonyu.iterator(_this.obj,2);
      while(_it_1.next()) {
        k=_it_1[0];
        v=_it_1[1];
        
        $LASTPOS=1000150;//user.Testforin:150
        _this.document.write(_this.obj[k]);
        
      }
    },
    fiber$main :function _trc_Testforin_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var k;
      var v;
      var _it_1;
      
      $LASTPOS=1000073;//user.Testforin:73
      _this.obj={x: "hello ",y: "goodmorning ",z: "goodevening "};
      $LASTPOS=1000125;//user.Testforin:125
      _it_1=Tonyu.iterator(_this.obj,2);
      while(_it_1.next()) {
        k=_it_1[0];
        v=_it_1[1];
        
        $LASTPOS=1000150;//user.Testforin:150
        _this.document.write(_this.obj[k]);
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map