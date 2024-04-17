if(!Tonyu.load)Tonyu.load=(_,f)=>f();
Tonyu.load({"language":"js","compiler":{"namespace":"user","outputFile":"js/concat.js","defaultSuperClass":"jslker.Parent","dependingProjects":[{"namespace":"jslker"}]}}, ()=>{
Tonyu.klass.define({
  fullName: 'user.Test',
  shortName: 'Test',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Test_main() {
        var _this=this;
        
        _this.sum=0;
        for (_this.i=1; _this.i<=10 ; _this.i++) {
          Tonyu.checkLoop();
          {
            _this.sum+=_this.i;
            _this.wait(10);
            _this.setText('test',_this.sum);
          }
        }
      },
      fiber$main :function* _trc_Test_f_main(_thread) {
        var _this=this;
        
        _this.sum=0;
        for (_this.i=1; _this.i<=10 ; _this.i++) {
          yield null;
          {
            _this.sum+=_this.i;
            (yield* _this.fiber$wait(_thread, 10));
            (yield* _this.fiber$setText(_thread, 'test', _this.sum));
          }
        }
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{"sum":{},"i":{}}}
});

});

//# sourceMappingURL=concat.js.map