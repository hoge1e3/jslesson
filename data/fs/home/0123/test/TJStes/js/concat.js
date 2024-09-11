if(!Tonyu.load)Tonyu.load=(_,f)=>f();
Tonyu.load({"language":"js","compiler":{"namespace":"user","outputFile":"js/concat.js","defaultSuperClass":"jslker.Parent","dependingProjects":[{"namespace":"jslker"}]}}, ()=>{
Tonyu.klass.define({
  fullName: 'user.Era',
  shortName: 'Era',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Era_main() {
        var _this=this;
        
        _this.wait(1000);
        _this.a.b.c;
      },
      fiber$main :function* _trc_Era_f_main(_thread) {
        var _this=this;
        
        (yield* _this.fiber$wait(_thread, 1000));
        _this.a.b.c;
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{"a":{}}}
});

});

//# sourceMappingURL=concat.js.map