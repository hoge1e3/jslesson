if(!Tonyu.load)Tonyu.load=(_,f)=>f();
Tonyu.load({"compiler":{"namespace":"user","outputFile":"js/concat.js","defaultSuperClass":"jslker.Parent","dependingProjects":[{"namespace":"jslker"}]},"language":"js"}, ()=>{
Tonyu.klass.define({
  fullName: 'user.A',
  shortName: 'A',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_A_main() {
        var _this=this;
        
        _this.wait(1000);
        _this.a.b.c;
      },
      fiber$main :function* _trc_A_f_main(_thread) {
        var _this=this;
        
        (yield* _this.fiber$wait(_thread, 1000));
        _this.a.b.c;
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{"a":{}}}
});
Tonyu.klass.define({
  fullName: 'user.C_Tes2',
  shortName: 'C_Tes2',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_C_Tes2_main() {
        var _this=this;
        
      },
      fiber$main :function* _trc_C_Tes2_f_main(_thread) {
        var _this=this;
        
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{}}
});

});

//# sourceMappingURL=concat.js.map