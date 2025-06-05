if(!Tonyu.load)Tonyu.load=(_,f)=>f();
Tonyu.load({"compiler":{"namespace":"user","outputFile":"js/concat.js","defaultSuperClass":"kernel.Actor","dependingProjects":[{"namespace":"kernel"}]},"language":"tonyu","run":{"mainClass":"user.Main","bootClass":"kernel.Boot","globals":{"$defaultFPS":60,"$imageSmoothingDisabled":true,"$soundLoadAndDecode":false}},"plugins":{"timbre":1}}, ()=>{
Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.PlayMod],
  methods: function (__superClass) {
    return {
      main :function _trc_Main_main() {
        var _this=this;
        
        _this.x=_this.y=100;
        while (true) {
          Tonyu.checkLoop();
          if (_this.getkey(32)==1) {
            _this.pl=_this.play("@1,0 v10 cdedc","@10,2 v15>e<fgdc","@10,0 rrrrc");
            
          }
          _this.x++;
          _this.update();
          
        }
      },
      fiber$main :function* _trc_Main_f_main(_thread) {
        var _this=this;
        
        _this.x=_this.y=100;
        while (true) {
          yield null;
          if (_this.getkey(32)==1) {
            _this.pl=(yield* _this.fiber$play(_thread, "@1,0 v10 cdedc", "@10,2 v15>e<fgdc", "@10,0 rrrrc"));
            
          }
          _this.x++;
          (yield* _this.fiber$update(_thread));
          
        }
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{"pl":{}}}
});

});

//# sourceMappingURL=concat.js.map