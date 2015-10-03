Tonyu.klass.define({
  fullName: 'user.Lesson1',
  shortName: 'Lesson1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Lesson1_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000015;//user.Lesson1:15
      _this.addText("head","あいうえお");
      $LASTPOS=1000041;//user.Lesson1:41
      _this.x=100;
      $LASTPOS=1000048;//user.Lesson1:48
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=1000071;//user.Lesson1:71
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=1000096;//user.Lesson1:96
      while (true) {
        $LASTPOS=1000114;//user.Lesson1:114
        _this.move("head",_this.x,50);
        $LASTPOS=1000137;//user.Lesson1:137
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Lesson1_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Lesson1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000015;//user.Lesson1:15
            _this.fiber$addText(_thread, "head", "あいうえお");
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000041;//user.Lesson1:41
            _this.x=100;
            $LASTPOS=1000048;//user.Lesson1:48
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000071;//user.Lesson1:71
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=3;return;
          case 3:
            
            $LASTPOS=1000096;//user.Lesson1:96
          case 4:
            $LASTPOS=1000114;//user.Lesson1:114
            _this.fiber$move(_thread, "head", _this.x, 50);
            __pc=5;return;
          case 5:
            
            $LASTPOS=1000137;//user.Lesson1:137
            _this.fiber$wait(_thread, 50);
            __pc=6;return;
          case 6:
            
            __pc=4;break;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Lesson1_left() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000172;//user.Lesson1:172
      _this.x-=10;
    },
    fiber$left :function _trc_Lesson1_f_left(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000172;//user.Lesson1:172
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Lesson1_right() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000203;//user.Lesson1:203
      _this.x+=10;
    },
    fiber$right :function _trc_Lesson1_f_right(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000203;//user.Lesson1:203
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}}}
});
