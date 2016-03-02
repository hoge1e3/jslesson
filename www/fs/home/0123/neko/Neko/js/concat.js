Tonyu.klass.define({
  fullName: 'user.Nedo',
  shortName: 'Nedo',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Nedo_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000015;//user.Nedo:15
      _this.x=0;
      $LASTPOS=1000019;//user.Nedo:19
      _this.y=0;
      $LASTPOS=1000024;//user.Nedo:24
      while (true) {
        $LASTPOS=1000042;//user.Nedo:42
        _this.move("n",_this.x,_this.y);
        $LASTPOS=1000061;//user.Nedo:61
        _this.x++;
        $LASTPOS=1000070;//user.Nedo:70
        _this.wait();
        
      }
    },
    fiber$main :function _trc_Nedo_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000015;//user.Nedo:15
      _this.x=0;
      $LASTPOS=1000019;//user.Nedo:19
      _this.y=0;
      
      _thread.enter(function _trc_Nedo_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000024;//user.Nedo:24
          case 1:
            $LASTPOS=1000042;//user.Nedo:42
            _this.fiber$move(_thread, "n", _this.x, _this.y);
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000061;//user.Nedo:61
            _this.x++;
            $LASTPOS=1000070;//user.Nedo:70
            _this.fiber$wait(_thread);
            __pc=3;return;
          case 3:
            
            __pc=1;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
