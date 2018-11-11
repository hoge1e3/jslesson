Tonyu.klass.define({
  fullName: 'user.TempData',
  shortName: 'TempData',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_TempData_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000131;//user.TempData:131
      _this.setGroup("sample");
      $LASTPOS=1000151;//user.TempData:151
      _this.res=_this.findLog("thermo");
      $LASTPOS=1000174;//user.TempData:174
      $LASTPOS=1000178;//user.TempData:178
      _this.i = 0;
      for (; _this.i<_this.res.length ; _this.i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1000209;//user.TempData:209
          _this.t=_this.convertTime(_this.res[_this.i]);
          $LASTPOS=1000236;//user.TempData:236
          _this.addText("temp",_this.t+" "+_this.res[_this.i].data1+"度<br>");
          $LASTPOS=1000284;//user.TempData:284
          _this.wait(10);
        }
      }
    },
    fiber$main :function _trc_TempData_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_TempData_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000131;//user.TempData:131
            _this.fiber$setGroup(_thread, "sample");
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000151;//user.TempData:151
            _this.fiber$findLog(_thread, "thermo");
            __pc=2;return;
          case 2:
            _this.res=_thread.retVal;
            
            $LASTPOS=1000174;//user.TempData:174
            $LASTPOS=1000178;//user.TempData:178
            _this.i = 0;
            
          case 3:
            if (!(_this.i<_this.res.length)) { __pc=8     ; break; }
            $LASTPOS=1000209;//user.TempData:209
            _this.fiber$convertTime(_thread, _this.res[_this.i]);
            __pc=4;return;
          case 4:
            _this.t=_thread.retVal;
            
            $LASTPOS=1000236;//user.TempData:236
            _this.fiber$addText(_thread, "temp", _this.t+" "+_this.res[_this.i].data1+"度<br>");
            __pc=5;return;
          case 5:
            
            $LASTPOS=1000284;//user.TempData:284
            _this.fiber$wait(_thread, 10);
            __pc=6;return;
          case 6:
            
          case 7     :
            _this.i++;
            __pc=3;break;
          case 8     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    convertTime :function _trc_TempData_convertTime(r) {
      "use strict";
      var _this=this;
      var d;
      
      $LASTPOS=1000059;//user.TempData:59
      d = new Date(parseInt(r.time*1000));
      
      return d.toLocaleString();
    },
    fiber$convertTime :function _trc_TempData_f_convertTime(_thread,r) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      
      $LASTPOS=1000059;//user.TempData:59
      d = new Date(parseInt(r.time*1000));
      
      _thread.retVal=d.toLocaleString();return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"convertTime":{"nowait":false}},"fields":{"res":{},"i":{},"t":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Js1',
  shortName: 'Js1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Js1_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000000;//user.Js1:0
      _this.move("neko",100,100);
      $LASTPOS=2000022;//user.Js1:22
      _this.wait(100);
      $LASTPOS=2000033;//user.Js1:33
      _this.move("neko",110,100);
      $LASTPOS=2000055;//user.Js1:55
      _this.wait(100);
      $LASTPOS=2000066;//user.Js1:66
      _this.move("neko",120,100);
      $LASTPOS=2000088;//user.Js1:88
      _this.wait(100);
      $LASTPOS=2000099;//user.Js1:99
      _this.move("neko",130,100);
      $LASTPOS=2000121;//user.Js1:121
      _this.wait(100);
      $LASTPOS=2000132;//user.Js1:132
      _this.move("neko",140,100);
      $LASTPOS=2000154;//user.Js1:154
      _this.wait(100);
      $LASTPOS=2000165;//user.Js1:165
      _this.move("neko",150,100);
      $LASTPOS=2000187;//user.Js1:187
      _this.wait(100);
      $LASTPOS=2000198;//user.Js1:198
      _this.move("neko",160,100);
      $LASTPOS=2000220;//user.Js1:220
      _this.wait(100);
      $LASTPOS=2000231;//user.Js1:231
      _this.move("neko",170,100);
      $LASTPOS=2000253;//user.Js1:253
      _this.wait(100);
    },
    fiber$main :function _trc_Js1_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Js1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000000;//user.Js1:0
            _this.fiber$move(_thread, "neko", 100, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2000022;//user.Js1:22
            _this.fiber$wait(_thread, 100);
            __pc=2;return;
          case 2:
            
            $LASTPOS=2000033;//user.Js1:33
            _this.fiber$move(_thread, "neko", 110, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=2000055;//user.Js1:55
            _this.fiber$wait(_thread, 100);
            __pc=4;return;
          case 4:
            
            $LASTPOS=2000066;//user.Js1:66
            _this.fiber$move(_thread, "neko", 120, 100);
            __pc=5;return;
          case 5:
            
            $LASTPOS=2000088;//user.Js1:88
            _this.fiber$wait(_thread, 100);
            __pc=6;return;
          case 6:
            
            $LASTPOS=2000099;//user.Js1:99
            _this.fiber$move(_thread, "neko", 130, 100);
            __pc=7;return;
          case 7:
            
            $LASTPOS=2000121;//user.Js1:121
            _this.fiber$wait(_thread, 100);
            __pc=8;return;
          case 8:
            
            $LASTPOS=2000132;//user.Js1:132
            _this.fiber$move(_thread, "neko", 140, 100);
            __pc=9;return;
          case 9:
            
            $LASTPOS=2000154;//user.Js1:154
            _this.fiber$wait(_thread, 100);
            __pc=10;return;
          case 10:
            
            $LASTPOS=2000165;//user.Js1:165
            _this.fiber$move(_thread, "neko", 150, 100);
            __pc=11;return;
          case 11:
            
            $LASTPOS=2000187;//user.Js1:187
            _this.fiber$wait(_thread, 100);
            __pc=12;return;
          case 12:
            
            $LASTPOS=2000198;//user.Js1:198
            _this.fiber$move(_thread, "neko", 160, 100);
            __pc=13;return;
          case 13:
            
            $LASTPOS=2000220;//user.Js1:220
            _this.fiber$wait(_thread, 100);
            __pc=14;return;
          case 14:
            
            $LASTPOS=2000231;//user.Js1:231
            _this.fiber$move(_thread, "neko", 170, 100);
            __pc=15;return;
          case 15:
            
            $LASTPOS=2000253;//user.Js1:253
            _this.fiber$wait(_thread, 100);
            __pc=16;return;
          case 16:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.FizzBuzz',
  shortName: 'FizzBuzz',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_FizzBuzz_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=3000000;//user.FizzBuzz:0
      $LASTPOS=3000004;//user.FizzBuzz:4
      _this.i=1;for (; _this.i<=50 ; _this.i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=3000024;//user.FizzBuzz:24
          if (_this.i%15==0) {
            $LASTPOS=3000045;//user.FizzBuzz:45
            _this.addText("t","FizzBuzz");
            
          } else {
            $LASTPOS=3000080;//user.FizzBuzz:80
            if (_this.i%3==0) {
              $LASTPOS=3000100;//user.FizzBuzz:100
              _this.addText("t","Fizz");
              
            } else {
              $LASTPOS=3000131;//user.FizzBuzz:131
              if (_this.i%5==0) {
                $LASTPOS=3000151;//user.FizzBuzz:151
                _this.addText("t","Buzz");
                
              } else {
                $LASTPOS=3000191;//user.FizzBuzz:191
                _this.addText("t",_this.i);
                
              }
            }
          }
          $LASTPOS=3000217;//user.FizzBuzz:217
          _this.addText("t","<br>");
          $LASTPOS=3000242;//user.FizzBuzz:242
          _this.wait(300);
        }
      }
    },
    fiber$main :function _trc_FizzBuzz_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_FizzBuzz_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000000;//user.FizzBuzz:0
            $LASTPOS=3000004;//user.FizzBuzz:4
            _this.i=1;
          case 1:
            if (!(_this.i<=50)) { __pc=15    ; break; }
            $LASTPOS=3000024;//user.FizzBuzz:24
            if (!(_this.i%15==0)) { __pc=3     ; break; }
            $LASTPOS=3000045;//user.FizzBuzz:45
            _this.fiber$addText(_thread, "t", "FizzBuzz");
            __pc=2;return;
          case 2:
            
            __pc=11    ;break;
          case 3     :
            $LASTPOS=3000080;//user.FizzBuzz:80
            if (!(_this.i%3==0)) { __pc=5     ; break; }
            $LASTPOS=3000100;//user.FizzBuzz:100
            _this.fiber$addText(_thread, "t", "Fizz");
            __pc=4;return;
          case 4:
            
            __pc=10    ;break;
          case 5     :
            $LASTPOS=3000131;//user.FizzBuzz:131
            if (!(_this.i%5==0)) { __pc=7     ; break; }
            $LASTPOS=3000151;//user.FizzBuzz:151
            _this.fiber$addText(_thread, "t", "Buzz");
            __pc=6;return;
          case 6:
            
            __pc=9     ;break;
          case 7     :
            $LASTPOS=3000191;//user.FizzBuzz:191
            _this.fiber$addText(_thread, "t", _this.i);
            __pc=8;return;
          case 8:
            
          case 9     :
            
          case 10    :
            
          case 11    :
            
            $LASTPOS=3000217;//user.FizzBuzz:217
            _this.fiber$addText(_thread, "t", "<br>");
            __pc=12;return;
          case 12:
            
            $LASTPOS=3000242;//user.FizzBuzz:242
            _this.fiber$wait(_thread, 300);
            __pc=13;return;
          case 13:
            
          case 14    :
            _this.i++;
            __pc=1;break;
          case 15    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"i":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Game1',
  shortName: 'Game1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game1_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=4000008;//user.Game1:8
      _this.x=100;
      $LASTPOS=4000015;//user.Game1:15
      _this.y=300;
      $LASTPOS=4000022;//user.Game1:22
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=4000046;//user.Game1:46
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=4000068;//user.Game1:68
      while (true) {
        Tonyu.checkLoop();
        $LASTPOS=4000086;//user.Game1:86
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=4000108;//user.Game1:108
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game1_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000008;//user.Game1:8
      _this.x=100;
      $LASTPOS=4000015;//user.Game1:15
      _this.y=300;
      
      _thread.enter(function _trc_Game1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=4000022;//user.Game1:22
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=4000046;//user.Game1:46
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=4000068;//user.Game1:68
          case 3:
            $LASTPOS=4000086;//user.Game1:86
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=4000108;//user.Game1:108
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
      
      $LASTPOS=4000143;//user.Game1:143
      _this.x-=10;
    },
    fiber$left :function _trc_Game1_f_left(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000143;//user.Game1:143
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game1_right() {
      "use strict";
      var _this=this;
      
      $LASTPOS=4000175;//user.Game1:175
      _this.x+=10;
    },
    fiber$right :function _trc_Game1_f_right(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=4000175;//user.Game1:175
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}},"fields":{"x":{},"y":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Js3',
  shortName: 'Js3',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Js3_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=5000000;//user.Js3:0
      _this.x=100;
      $LASTPOS=5000007;//user.Js3:7
      while (true) {
        Tonyu.checkLoop();
        $LASTPOS=5000024;//user.Js3:24
        _this.move("neko",_this.x,100);
        $LASTPOS=5000048;//user.Js3:48
        _this.x+=10;
        $LASTPOS=5000059;//user.Js3:59
        _this.wait(100);
        
      }
    },
    fiber$main :function _trc_Js3_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=5000000;//user.Js3:0
      _this.x=100;
      
      _thread.enter(function _trc_Js3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=5000007;//user.Js3:7
          case 1:
            $LASTPOS=5000024;//user.Js3:24
            _this.fiber$move(_thread, "neko", _this.x, 100);
            __pc=2;return;
          case 2:
            
            $LASTPOS=5000048;//user.Js3:48
            _this.x+=10;
            $LASTPOS=5000059;//user.Js3:59
            _this.fiber$wait(_thread, 100);
            __pc=3;return;
          case 3:
            
            __pc=1;break;
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"x":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Js2',
  shortName: 'Js2',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Js2_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=6000000;//user.Js2:0
      _this.x=100;
      $LASTPOS=6000007;//user.Js2:7
      _this.move("neko",_this.x,100);
      $LASTPOS=6000027;//user.Js2:27
      _this.x+=10;
      $LASTPOS=6000034;//user.Js2:34
      _this.wait(100);
      $LASTPOS=6000045;//user.Js2:45
      _this.move("neko",_this.x,100);
      $LASTPOS=6000065;//user.Js2:65
      _this.x+=10;
      $LASTPOS=6000072;//user.Js2:72
      _this.wait(100);
      $LASTPOS=6000083;//user.Js2:83
      _this.move("neko",_this.x,100);
      $LASTPOS=6000103;//user.Js2:103
      _this.x+=10;
      $LASTPOS=6000110;//user.Js2:110
      _this.wait(100);
      $LASTPOS=6000121;//user.Js2:121
      _this.move("neko",_this.x,100);
      $LASTPOS=6000141;//user.Js2:141
      _this.x+=10;
      $LASTPOS=6000148;//user.Js2:148
      _this.wait(100);
      $LASTPOS=6000159;//user.Js2:159
      _this.move("neko",_this.x,100);
      $LASTPOS=6000179;//user.Js2:179
      _this.x+=10;
      $LASTPOS=6000186;//user.Js2:186
      _this.wait(100);
    },
    fiber$main :function _trc_Js2_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=6000000;//user.Js2:0
      _this.x=100;
      
      _thread.enter(function _trc_Js2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=6000007;//user.Js2:7
            _this.fiber$move(_thread, "neko", _this.x, 100);
            __pc=1;return;
          case 1:
            
            $LASTPOS=6000027;//user.Js2:27
            _this.x+=10;
            $LASTPOS=6000034;//user.Js2:34
            _this.fiber$wait(_thread, 100);
            __pc=2;return;
          case 2:
            
            $LASTPOS=6000045;//user.Js2:45
            _this.fiber$move(_thread, "neko", _this.x, 100);
            __pc=3;return;
          case 3:
            
            $LASTPOS=6000065;//user.Js2:65
            _this.x+=10;
            $LASTPOS=6000072;//user.Js2:72
            _this.fiber$wait(_thread, 100);
            __pc=4;return;
          case 4:
            
            $LASTPOS=6000083;//user.Js2:83
            _this.fiber$move(_thread, "neko", _this.x, 100);
            __pc=5;return;
          case 5:
            
            $LASTPOS=6000103;//user.Js2:103
            _this.x+=10;
            $LASTPOS=6000110;//user.Js2:110
            _this.fiber$wait(_thread, 100);
            __pc=6;return;
          case 6:
            
            $LASTPOS=6000121;//user.Js2:121
            _this.fiber$move(_thread, "neko", _this.x, 100);
            __pc=7;return;
          case 7:
            
            $LASTPOS=6000141;//user.Js2:141
            _this.x+=10;
            $LASTPOS=6000148;//user.Js2:148
            _this.fiber$wait(_thread, 100);
            __pc=8;return;
          case 8:
            
            $LASTPOS=6000159;//user.Js2:159
            _this.fiber$move(_thread, "neko", _this.x, 100);
            __pc=9;return;
          case 9:
            
            $LASTPOS=6000179;//user.Js2:179
            _this.x+=10;
            $LASTPOS=6000186;//user.Js2:186
            _this.fiber$wait(_thread, 100);
            __pc=10;return;
          case 10:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"x":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Chat',
  shortName: 'Chat',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Chat_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=7000000;//user.Chat:0
      _this.setGroup("sample");
      $LASTPOS=7000020;//user.Chat:20
      _this.latestUpdate=0;
      $LASTPOS=7000036;//user.Chat:36
      _this.onClick("send",Tonyu.bindFunc(_this,_this.send));
      $LASTPOS=7000448;//user.Chat:448
      while (true) {
        Tonyu.checkLoop();
        $LASTPOS=7000465;//user.Chat:465
        _this.read();
        $LASTPOS=7000477;//user.Chat:477
        _this.wait(10000);
        
      }
    },
    fiber$main :function _trc_Chat_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Chat_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=7000000;//user.Chat:0
            _this.fiber$setGroup(_thread, "sample");
            __pc=1;return;
          case 1:
            
            $LASTPOS=7000020;//user.Chat:20
            _this.latestUpdate=0;
            $LASTPOS=7000036;//user.Chat:36
            _this.fiber$onClick(_thread, "send", Tonyu.bindFunc(_this,_this.send));
            __pc=2;return;
          case 2:
            
            $LASTPOS=7000448;//user.Chat:448
          case 3:
            $LASTPOS=7000465;//user.Chat:465
            _this.fiber$read(_thread);
            __pc=4;return;
          case 4:
            
            $LASTPOS=7000477;//user.Chat:477
            _this.fiber$wait(_thread, 10000);
            __pc=5;return;
          case 5:
            
            __pc=3;break;
          case 6     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    send :function _trc_Chat_send() {
      "use strict";
      var _this=this;
      var m;
      var n;
      
      $LASTPOS=7000079;//user.Chat:79
      m = _this.getText("message");
      
      $LASTPOS=7000109;//user.Chat:109
      n = _this.getText("name");
      
      $LASTPOS=7000136;//user.Chat:136
      _this.addLog("chat",m,n);
      $LASTPOS=7000160;//user.Chat:160
      _this.setText("message","");
      $LASTPOS=7000187;//user.Chat:187
      _this.read();
    },
    fiber$send :function _trc_Chat_f_send(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var m;
      var n;
      
      
      _thread.enter(function _trc_Chat_ent_send(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=7000079;//user.Chat:79
            _this.fiber$getText(_thread, "message");
            __pc=1;return;
          case 1:
            m=_thread.retVal;
            
            $LASTPOS=7000109;//user.Chat:109
            _this.fiber$getText(_thread, "name");
            __pc=2;return;
          case 2:
            n=_thread.retVal;
            
            $LASTPOS=7000136;//user.Chat:136
            _this.fiber$addLog(_thread, "chat", m, n);
            __pc=3;return;
          case 3:
            
            $LASTPOS=7000160;//user.Chat:160
            _this.fiber$setText(_thread, "message", "");
            __pc=4;return;
          case 4:
            
            $LASTPOS=7000187;//user.Chat:187
            _this.fiber$read(_thread);
            __pc=5;return;
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    read :function _trc_Chat_read() {
      "use strict";
      var _this=this;
      var i;
      
      $LASTPOS=7000218;//user.Chat:218
      _this.msg=_this.findLog("chat");
      $LASTPOS=7000243;//user.Chat:243
      $LASTPOS=7000247;//user.Chat:247
      i = 0;
      for (; i<_this.msg.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=7000282;//user.Chat:282
          if (_this.msg[i].time>_this.latestUpdate) {
            $LASTPOS=7000324;//user.Chat:324
            _this.addText("talk",_this.msg[i].data2+":"+_this.msg[i].data1+"<br>");
            $LASTPOS=7000390;//user.Chat:390
            _this.latestUpdate=_this.msg[i].time;
            
          }
        }
      }
      $LASTPOS=7000436;//user.Chat:436
      _this.wait(10);
    },
    fiber$read :function _trc_Chat_f_read(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Chat_ent_read(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=7000218;//user.Chat:218
            _this.fiber$findLog(_thread, "chat");
            __pc=1;return;
          case 1:
            _this.msg=_thread.retVal;
            
            $LASTPOS=7000243;//user.Chat:243
            $LASTPOS=7000247;//user.Chat:247
            i = 0;
            
          case 2:
            if (!(i<_this.msg.length)) { __pc=6     ; break; }
            $LASTPOS=7000282;//user.Chat:282
            if (!(_this.msg[i].time>_this.latestUpdate)) { __pc=4     ; break; }
            $LASTPOS=7000324;//user.Chat:324
            _this.fiber$addText(_thread, "talk", _this.msg[i].data2+":"+_this.msg[i].data1+"<br>");
            __pc=3;return;
          case 3:
            
            $LASTPOS=7000390;//user.Chat:390
            _this.latestUpdate=_this.msg[i].time;
          case 4     :
            
          case 5     :
            i++;
            __pc=2;break;
          case 6     :
            
            $LASTPOS=7000436;//user.Chat:436
            _this.fiber$wait(_thread, 10);
            __pc=7;return;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"send":{"nowait":false},"read":{"nowait":false}},"fields":{"latestUpdate":{},"msg":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Game2',
  shortName: 'Game2',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game2_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=8000015;//user.Game2:15
      _this.x=100;
      $LASTPOS=8000022;//user.Game2:22
      _this.y=300;
      $LASTPOS=8000029;//user.Game2:29
      _this.bx=100;
      $LASTPOS=8000037;//user.Game2:37
      _this.by=0;
      $LASTPOS=8000043;//user.Game2:43
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=8000067;//user.Game2:67
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=8000089;//user.Game2:89
      while (true) {
        Tonyu.checkLoop();
        $LASTPOS=8000107;//user.Game2:107
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=8000129;//user.Game2:129
        _this.moveBall();
        $LASTPOS=8000145;//user.Game2:145
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game2_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=8000015;//user.Game2:15
      _this.x=100;
      $LASTPOS=8000022;//user.Game2:22
      _this.y=300;
      $LASTPOS=8000029;//user.Game2:29
      _this.bx=100;
      $LASTPOS=8000037;//user.Game2:37
      _this.by=0;
      
      _thread.enter(function _trc_Game2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=8000043;//user.Game2:43
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=8000067;//user.Game2:67
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=8000089;//user.Game2:89
          case 3:
            $LASTPOS=8000107;//user.Game2:107
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=8000129;//user.Game2:129
            _this.fiber$moveBall(_thread);
            __pc=5;return;
          case 5:
            
            $LASTPOS=8000145;//user.Game2:145
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
      
      $LASTPOS=8000183;//user.Game2:183
      _this.move("ball",_this.bx,_this.by);
      $LASTPOS=8000207;//user.Game2:207
      _this.by+=10;
      $LASTPOS=8000219;//user.Game2:219
      if (_this.by>400) {
        $LASTPOS=8000241;//user.Game2:241
        _this.by=0;
        $LASTPOS=8000255;//user.Game2:255
        _this.bx=_this.rnd(300);
        
      }
      $LASTPOS=8000278;//user.Game2:278
      if (_this.bx>_this.x-30&&_this.bx<_this.x+30&&_this.by>_this.y-30&&_this.by<_this.y+30) {
        $LASTPOS=8000339;//user.Game2:339
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
            $LASTPOS=8000183;//user.Game2:183
            _this.fiber$move(_thread, "ball", _this.bx, _this.by);
            __pc=1;return;
          case 1:
            
            $LASTPOS=8000207;//user.Game2:207
            _this.by+=10;
            $LASTPOS=8000219;//user.Game2:219
            if (!(_this.by>400)) { __pc=3     ; break; }
            $LASTPOS=8000241;//user.Game2:241
            _this.by=0;
            $LASTPOS=8000255;//user.Game2:255
            _this.fiber$rnd(_thread, 300);
            __pc=2;return;
          case 2:
            _this.bx=_thread.retVal;
            
          case 3     :
            
            $LASTPOS=8000278;//user.Game2:278
            if (_this.bx>_this.x-30&&_this.bx<_this.x+30&&_this.by>_this.y-30&&_this.by<_this.y+30) {
              $LASTPOS=8000339;//user.Game2:339
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
      
      $LASTPOS=8000378;//user.Game2:378
      _this.x-=10;
    },
    fiber$left :function _trc_Game2_f_left(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=8000378;//user.Game2:378
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game2_right() {
      "use strict";
      var _this=this;
      
      $LASTPOS=8000410;//user.Game2:410
      _this.x+=10;
    },
    fiber$right :function _trc_Game2_f_right(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=8000410;//user.Game2:410
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"moveBall":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}},"fields":{"x":{},"y":{},"bx":{},"by":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Hit',
  shortName: 'Hit',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Hit_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=9000000;//user.Hit:0
      while (true) {
        Tonyu.checkLoop();
        $LASTPOS=9000019;//user.Hit:19
        _this.x=10;
        $LASTPOS=9000029;//user.Hit:29
        _this.y=200;
        $LASTPOS=9000040;//user.Hit:40
        _this.tx=_this.rnd(200)+10;
        $LASTPOS=9000060;//user.Hit:60
        _this.ty=_this.rnd(200);
        $LASTPOS=9000077;//user.Hit:77
        _this.move("ball",_this.x,_this.y);
        $LASTPOS=9000099;//user.Hit:99
        _this.move("target",_this.tx,_this.ty);
        $LASTPOS=9000125;//user.Hit:125
        _this.waitClick("start");
        $LASTPOS=9000149;//user.Hit:149
        _this.vx=_this.getNumber("vx");
        $LASTPOS=9000173;//user.Hit:173
        _this.vy=- _this.getNumber("vy");
        $LASTPOS=9000198;//user.Hit:198
        _this.atari=false;
        $LASTPOS=9000215;//user.Hit:215
        while (_this.y<300) {
          Tonyu.checkLoop();
          $LASTPOS=9000238;//user.Hit:238
          _this.move("ball",_this.x,_this.y);
          $LASTPOS=9000264;//user.Hit:264
          _this.x+=_this.vx;
          $LASTPOS=9000270;//user.Hit:270
          _this.y+=_this.vy;
          $LASTPOS=9000285;//user.Hit:285
          _this.vy++;
          $LASTPOS=9000299;//user.Hit:299
          if (_this.dist(_this.x-_this.tx,_this.y-_this.ty)<30) {
            $LASTPOS=9000337;//user.Hit:337
            _this.move("target",- 100,- 100);
            $LASTPOS=9000375;//user.Hit:375
            _this.atari=true;
            $LASTPOS=9000399;//user.Hit:399
            _this.setText("result","あたり");
            
          }
          $LASTPOS=9000442;//user.Hit:442
          _this.wait(100);
          
        }
        $LASTPOS=9000463;//user.Hit:463
        if (! _this.atari) {
          $LASTPOS=9000475;//user.Hit:475
          _this.setText("result","はずれ");
        }
        
      }
    },
    fiber$main :function _trc_Hit_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Hit_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=9000000;//user.Hit:0
          case 1:
            $LASTPOS=9000019;//user.Hit:19
            _this.x=10;
            $LASTPOS=9000029;//user.Hit:29
            _this.y=200;
            $LASTPOS=9000040;//user.Hit:40
            _this.tx=_this.rnd(200)+10;
            $LASTPOS=9000060;//user.Hit:60
            _this.fiber$rnd(_thread, 200);
            __pc=2;return;
          case 2:
            _this.ty=_thread.retVal;
            
            $LASTPOS=9000077;//user.Hit:77
            _this.fiber$move(_thread, "ball", _this.x, _this.y);
            __pc=3;return;
          case 3:
            
            $LASTPOS=9000099;//user.Hit:99
            _this.fiber$move(_thread, "target", _this.tx, _this.ty);
            __pc=4;return;
          case 4:
            
            $LASTPOS=9000125;//user.Hit:125
            _this.fiber$waitClick(_thread, "start");
            __pc=5;return;
          case 5:
            
            $LASTPOS=9000149;//user.Hit:149
            _this.fiber$getNumber(_thread, "vx");
            __pc=6;return;
          case 6:
            _this.vx=_thread.retVal;
            
            $LASTPOS=9000173;//user.Hit:173
            _this.vy=- _this.getNumber("vy");
            $LASTPOS=9000198;//user.Hit:198
            _this.atari=false;
            $LASTPOS=9000215;//user.Hit:215
          case 7:
            if (!(_this.y<300)) { __pc=13    ; break; }
            $LASTPOS=9000238;//user.Hit:238
            _this.fiber$move(_thread, "ball", _this.x, _this.y);
            __pc=8;return;
          case 8:
            
            $LASTPOS=9000264;//user.Hit:264
            _this.x+=_this.vx;
            $LASTPOS=9000270;//user.Hit:270
            _this.y+=_this.vy;
            $LASTPOS=9000285;//user.Hit:285
            _this.vy++;
            $LASTPOS=9000299;//user.Hit:299
            if (!(_this.dist(_this.x-_this.tx,_this.y-_this.ty)<30)) { __pc=11    ; break; }
            $LASTPOS=9000337;//user.Hit:337
            _this.fiber$move(_thread, "target", - 100, - 100);
            __pc=9;return;
          case 9:
            
            $LASTPOS=9000375;//user.Hit:375
            _this.atari=true;
            $LASTPOS=9000399;//user.Hit:399
            _this.fiber$setText(_thread, "result", "あたり");
            __pc=10;return;
          case 10:
            
          case 11    :
            
            $LASTPOS=9000442;//user.Hit:442
            _this.fiber$wait(_thread, 100);
            __pc=12;return;
          case 12:
            
            __pc=7;break;
          case 13    :
            
            $LASTPOS=9000463;//user.Hit:463
            if (!(! _this.atari)) { __pc=15    ; break; }
            $LASTPOS=9000475;//user.Hit:475
            _this.fiber$setText(_thread, "result", "はずれ");
            __pc=14;return;
          case 14:
            
          case 15    :
            
            __pc=1;break;
          case 16    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"x":{},"y":{},"tx":{},"ty":{},"vx":{},"vy":{},"atari":{}}}
});
Tonyu.klass.define({
  fullName: 'user.HTML1',
  shortName: 'HTML1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_HTML1_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_HTML1_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.Game3',
  shortName: 'Game3',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Game3_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=10000006;//user.Game3:6
      _this.x=100;
      $LASTPOS=10000013;//user.Game3:13
      _this.y=300;
      $LASTPOS=10000020;//user.Game3:20
      _this.bx=[50,320,250,20];
      $LASTPOS=10000040;//user.Game3:40
      _this.by=[0,10,50,30];
      $LASTPOS=10000057;//user.Game3:57
      _this.onClick("right",Tonyu.bindFunc(_this,_this.right));
      $LASTPOS=10000081;//user.Game3:81
      _this.onClick("left",Tonyu.bindFunc(_this,_this.left));
      $LASTPOS=10000103;//user.Game3:103
      while (true) {
        Tonyu.checkLoop();
        $LASTPOS=10000121;//user.Game3:121
        _this.move("neko",_this.x,_this.y);
        $LASTPOS=10000143;//user.Game3:143
        $LASTPOS=10000148;//user.Game3:148
        _this.i=0;for (; _this.i<4 ; _this.i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=10000170;//user.Game3:170
            _this.moveBall(_this.i);
          }
        }
        $LASTPOS=10000193;//user.Game3:193
        _this.wait(50);
        
      }
    },
    fiber$main :function _trc_Game3_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=10000006;//user.Game3:6
      _this.x=100;
      $LASTPOS=10000013;//user.Game3:13
      _this.y=300;
      $LASTPOS=10000020;//user.Game3:20
      _this.bx=[50,320,250,20];
      $LASTPOS=10000040;//user.Game3:40
      _this.by=[0,10,50,30];
      
      _thread.enter(function _trc_Game3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=10000057;//user.Game3:57
            _this.fiber$onClick(_thread, "right", Tonyu.bindFunc(_this,_this.right));
            __pc=1;return;
          case 1:
            
            $LASTPOS=10000081;//user.Game3:81
            _this.fiber$onClick(_thread, "left", Tonyu.bindFunc(_this,_this.left));
            __pc=2;return;
          case 2:
            
            $LASTPOS=10000103;//user.Game3:103
          case 3:
            $LASTPOS=10000121;//user.Game3:121
            _this.fiber$move(_thread, "neko", _this.x, _this.y);
            __pc=4;return;
          case 4:
            
            $LASTPOS=10000143;//user.Game3:143
            $LASTPOS=10000148;//user.Game3:148
            _this.i=0;
          case 5:
            if (!(_this.i<4)) { __pc=8     ; break; }
            $LASTPOS=10000170;//user.Game3:170
            _this.fiber$moveBall(_thread, _this.i);
            __pc=6;return;
          case 6:
            
          case 7     :
            _this.i++;
            __pc=5;break;
          case 8     :
            
            $LASTPOS=10000193;//user.Game3:193
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
      
      $LASTPOS=10000232;//user.Game3:232
      _this.move("ball"+i,_this.bx[i],_this.by[i]);
      $LASTPOS=10000264;//user.Game3:264
      _this.by[i]+=10;
      $LASTPOS=10000279;//user.Game3:279
      if (_this.by[i]>400) {
        $LASTPOS=10000304;//user.Game3:304
        _this.by[i]=0;
        $LASTPOS=10000321;//user.Game3:321
        _this.bx[i]=_this.rnd(300);
        
      }
      $LASTPOS=10000347;//user.Game3:347
      if (_this.bx[i]>_this.x-30&&_this.bx[i]<_this.x+30&&_this.by[i]>_this.y-30&&_this.by[i]<_this.y+30) {
        $LASTPOS=10000420;//user.Game3:420
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
            $LASTPOS=10000232;//user.Game3:232
            _this.fiber$move(_thread, "ball"+i, _this.bx[i], _this.by[i]);
            __pc=1;return;
          case 1:
            
            $LASTPOS=10000264;//user.Game3:264
            _this.by[i]+=10;
            $LASTPOS=10000279;//user.Game3:279
            if (!(_this.by[i]>400)) { __pc=3     ; break; }
            $LASTPOS=10000304;//user.Game3:304
            _this.by[i]=0;
            $LASTPOS=10000321;//user.Game3:321
            _this.fiber$rnd(_thread, 300);
            __pc=2;return;
          case 2:
            _this.bx[i]=_thread.retVal;
            
          case 3     :
            
            $LASTPOS=10000347;//user.Game3:347
            if (_this.bx[i]>_this.x-30&&_this.bx[i]<_this.x+30&&_this.by[i]>_this.y-30&&_this.by[i]<_this.y+30) {
              $LASTPOS=10000420;//user.Game3:420
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
      
      $LASTPOS=10000459;//user.Game3:459
      _this.x-=10;
    },
    fiber$left :function _trc_Game3_f_left(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=10000459;//user.Game3:459
      _this.x-=10;
      
      _thread.retVal=_this;return;
    },
    right :function _trc_Game3_right() {
      "use strict";
      var _this=this;
      
      $LASTPOS=10000491;//user.Game3:491
      _this.x+=10;
    },
    fiber$right :function _trc_Game3_f_right(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=10000491;//user.Game3:491
      _this.x+=10;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"moveBall":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false}},"fields":{"x":{},"y":{},"bx":{},"by":{},"i":{}}}
});

//# sourceMappingURL=concat.js.map