Tonyu.klass.define({
  fullName: 'user.Game1',
  shortName: 'Game1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Game1_main() {
        "use strict";
        var _this=this;
        
        _this.x=100;
        _this.y=300;
        _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
        _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
        while (true) {
          Tonyu.checkLoop();
          _this.move("neko",_this.x,_this.y);
          _this.wait(50);
          
        }
      },
      fiber$main :function _trc_Game1_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x=100;
        _this.y=300;
        
        _thread.enter(function _trc_Game1_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
              __pc=1;return;
            case 1:
              
              _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
              __pc=2;return;
            case 2:
              
            case 3:
              _this.fiber$move(_thread, "neko", _this.x, _this.y);
              __pc=4;return;
            case 4:
              
              _this.fiber$wait(_thread, 50);
              __pc=5;return;
            case 5:
              
              __pc=3;break;
            case 6     :
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      left :function _trc_Game1_left() {
        "use strict";
        var _this=this;
        
        _this.x-=10;
      },
      fiber$left :function _trc_Game1_f_left(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x-=10;
        
        _thread.retVal=_this;return;
      },
      right :function _trc_Game1_right() {
        "use strict";
        var _this=this;
        
        _this.x+=10;
      },
      fiber$right :function _trc_Game1_f_right(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x+=10;
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}},"fields":{"x":{},"y":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Game2',
  shortName: 'Game2',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Game2_main() {
        "use strict";
        var _this=this;
        
        _this.x=100;
        _this.y=300;
        _this.bx=100;
        _this.by=0;
        _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
        _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
        while (true) {
          Tonyu.checkLoop();
          _this.move("neko",_this.x,_this.y);
          _this.moveBall();
          _this.wait(50);
          
        }
      },
      fiber$main :function _trc_Game2_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x=100;
        _this.y=300;
        _this.bx=100;
        _this.by=0;
        
        _thread.enter(function _trc_Game2_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
              __pc=1;return;
            case 1:
              
              _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
              __pc=2;return;
            case 2:
              
            case 3:
              _this.fiber$move(_thread, "neko", _this.x, _this.y);
              __pc=4;return;
            case 4:
              
              _this.fiber$moveBall(_thread);
              __pc=5;return;
            case 5:
              
              _this.fiber$wait(_thread, 50);
              __pc=6;return;
            case 6:
              
              __pc=3;break;
            case 7     :
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      moveBall :function _trc_Game2_moveBall() {
        "use strict";
        var _this=this;
        
        _this.move("ball",_this.bx,_this.by);
        _this.by+=10;
        if (_this.by>400) {
          _this.by=0;
          _this.bx=_this.rnd(300);
          
        }
        if (_this.bx>_this.x-30&&_this.bx<_this.x+30&&_this.by>_this.y-30&&_this.by<_this.y+30) {
          _this.y=- 1000;
          
        }
      },
      fiber$moveBall :function _trc_Game2_f_moveBall(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _thread.enter(function _trc_Game2_ent_moveBall(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$move(_thread, "ball", _this.bx, _this.by);
              __pc=1;return;
            case 1:
              
              _this.by+=10;
              if (!(_this.by>400)) { __pc=3     ; break; }
              _this.by=0;
              _this.fiber$rnd(_thread, 300);
              __pc=2;return;
            case 2:
              _this.bx=_thread.retVal;
              
            case 3     :
              
              if (_this.bx>_this.x-30&&_this.bx<_this.x+30&&_this.by>_this.y-30&&_this.by<_this.y+30) {
                _this.y=- 1000;
                
              }
              _thread.exit(_this);return;
            }
          }
        });
      },
      left :function _trc_Game2_left() {
        "use strict";
        var _this=this;
        
        _this.x-=10;
      },
      fiber$left :function _trc_Game2_f_left(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x-=10;
        
        _thread.retVal=_this;return;
      },
      right :function _trc_Game2_right() {
        "use strict";
        var _this=this;
        
        _this.x+=10;
      },
      fiber$right :function _trc_Game2_f_right(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x+=10;
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"moveBall":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}},"fields":{"x":{},"y":{},"bx":{},"by":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Game3',
  shortName: 'Game3',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Game3_main() {
        "use strict";
        var _this=this;
        
        _this.x=100;
        _this.y=300;
        _this.bx=[50,320,250,20];
        _this.by=[0,10,50,30];
        _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
        _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
        while (true) {
          Tonyu.checkLoop();
          _this.move("neko",_this.x,_this.y);
          _this.i=0;for (; _this.i<4 ; _this.i++) {
            Tonyu.checkLoop();
            _this.moveBall(_this.i);
          }
          _this.wait(50);
          
        }
      },
      fiber$main :function _trc_Game3_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x=100;
        _this.y=300;
        _this.bx=[50,320,250,20];
        _this.by=[0,10,50,30];
        
        _thread.enter(function _trc_Game3_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
              __pc=1;return;
            case 1:
              
              _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
              __pc=2;return;
            case 2:
              
            case 3:
              _this.fiber$move(_thread, "neko", _this.x, _this.y);
              __pc=4;return;
            case 4:
              
              _this.i=0;
            case 5:
              if (!(_this.i<4)) { __pc=8     ; break; }
              _this.fiber$moveBall(_thread, _this.i);
              __pc=6;return;
            case 6:
              
            case 7     :
              _this.i++;
              __pc=5;break;
            case 8     :
              
              _this.fiber$wait(_thread, 50);
              __pc=9;return;
            case 9:
              
              __pc=3;break;
            case 10    :
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      moveBall :function _trc_Game3_moveBall(i) {
        "use strict";
        var _this=this;
        
        _this.move("ball"+i,_this.bx[i],_this.by[i]);
        _this.by[i]+=10;
        if (_this.by[i]>400) {
          _this.by[i]=0;
          _this.bx[i]=_this.rnd(300);
          
        }
        if (_this.bx[i]>_this.x-30&&_this.bx[i]<_this.x+30&&_this.by[i]>_this.y-30&&_this.by[i]<_this.y+30) {
          _this.y=- 1000;
          
        }
      },
      fiber$moveBall :function _trc_Game3_f_moveBall(_thread,i) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _thread.enter(function _trc_Game3_ent_moveBall(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$move(_thread, "ball"+i, _this.bx[i], _this.by[i]);
              __pc=1;return;
            case 1:
              
              _this.by[i]+=10;
              if (!(_this.by[i]>400)) { __pc=3     ; break; }
              _this.by[i]=0;
              _this.fiber$rnd(_thread, 300);
              __pc=2;return;
            case 2:
              _this.bx[i]=_thread.retVal;
              
            case 3     :
              
              if (_this.bx[i]>_this.x-30&&_this.bx[i]<_this.x+30&&_this.by[i]>_this.y-30&&_this.by[i]<_this.y+30) {
                _this.y=- 1000;
                
              }
              _thread.exit(_this);return;
            }
          }
        });
      },
      left :function _trc_Game3_left() {
        "use strict";
        var _this=this;
        
        _this.x-=10;
        _this.wait(100);
        _this.x-=10;
      },
      fiber$left :function _trc_Game3_f_left(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x-=10;
        
        _thread.enter(function _trc_Game3_ent_left(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$wait(_thread, 100);
              __pc=1;return;
            case 1:
              
              _this.x-=10;
              _thread.exit(_this);return;
            }
          }
        });
      },
      right :function _trc_Game3_right() {
        "use strict";
        var _this=this;
        
        _this.x+=10;
        _this.wait(100);
        _this.x+=10;
      },
      fiber$right :function _trc_Game3_f_right(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x+=10;
        
        _thread.enter(function _trc_Game3_ent_right(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$wait(_thread, 100);
              __pc=1;return;
            case 1:
              
              _this.x+=10;
              _thread.exit(_this);return;
            }
          }
        });
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"moveBall":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}},"fields":{"x":{},"y":{},"bx":{},"by":{},"i":{}}}
});

//# sourceMappingURL=concat.js.map