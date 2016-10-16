Tonyu.klass.define({
  fullName: 'user.Getkey',
  shortName: 'Getkey',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Getkey_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000045;//user.Getkey:45
      _this.move("a",100,200);
      $LASTPOS=1000064;//user.Getkey:64
      _this.move("b",100,300);
      $LASTPOS=1000083;//user.Getkey:83
      _this.keyData=[];
      $LASTPOS=1000107;//user.Getkey:107
      _this.document.onkeydown=(function anonymous_128(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1000146;//user.Getkey:146
        if (! e) {
          $LASTPOS=1000153;//user.Getkey:153
          e=window.event;
        }
        $LASTPOS=1000175;//user.Getkey:175
        key_code = e.keyCode;
        $LASTPOS=1000205;//user.Getkey:205
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1000269;//user.Getkey:269
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=1000338;//user.Getkey:338
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=1000371;//user.Getkey:371
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=1000437;//user.Getkey:437
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=1000469;//user.Getkey:469
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=1000532;//user.Getkey:532
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=1000563;//user.Getkey:563
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=1000625;//user.Getkey:625
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=1000653;//user.Getkey:653
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=1000711;//user.Getkey:711
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=1000737;//user.Getkey:737
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=1000801;//user.Getkey:801
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=1000830;//user.Getkey:830
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=1000892;//user.Getkey:892
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=1000920;//user.Getkey:920
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=1000966;//user.Getkey:966
                        _this.keyData[key_char]=1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        $LASTPOS=1000991;//user.Getkey:991
        console.log(key_char+"data="+_this.keyData[key_char]+" ,keyCode="+e.keyCode);
      });
      $LASTPOS=1001127;//user.Getkey:1127
      _this.document.onkeyup=(function anonymous_1146(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=1001164;//user.Getkey:1164
        if (! e) {
          $LASTPOS=1001171;//user.Getkey:1171
          e=window.event;
        }
        $LASTPOS=1001193;//user.Getkey:1193
        key_code = e.keyCode;
        $LASTPOS=1001223;//user.Getkey:1223
        key_char = String.fromCharCode(key_code).toLowerCase();
        $LASTPOS=1001287;//user.Getkey:1287
        if (e.keyCode==16) {
          $LASTPOS=1001305;//user.Getkey:1305
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=1001338;//user.Getkey:1338
          if (e.keyCode==17) {
            $LASTPOS=1001356;//user.Getkey:1356
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=1001388;//user.Getkey:1388
            if (e.keyCode==18) {
              $LASTPOS=1001406;//user.Getkey:1406
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=1001437;//user.Getkey:1437
              if (e.keyCode==37) {
                $LASTPOS=1001455;//user.Getkey:1455
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=1001483;//user.Getkey:1483
                if (e.keyCode==38) {
                  $LASTPOS=1001501;//user.Getkey:1501
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=1001527;//user.Getkey:1527
                  if (e.keyCode==39) {
                    $LASTPOS=1001545;//user.Getkey:1545
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=1001574;//user.Getkey:1574
                    if (e.keyCode==40) {
                      $LASTPOS=1001592;//user.Getkey:1592
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=1001620;//user.Getkey:1620
                      _this.keyData[key_char]=0;
                    }
                  }
                }
              }
            }
          }
        }
        $LASTPOS=1001645;//user.Getkey:1645
        console.log(_this.keyData);
      });
      $LASTPOS=1002106;//user.Getkey:2106
      while (true) {
        $LASTPOS=1002123;//user.Getkey:2123
        _this.setText('a',_this.getkey("left"));
        $LASTPOS=1002156;//user.Getkey:2156
        _this.setText('b',_this.getkey("b"));
        $LASTPOS=1002218;//user.Getkey:2218
        _this.wait(100);
        
      }
    },
    fiber$main :function _trc_Getkey_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Getkey_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000045;//user.Getkey:45
            _this.fiber$move(_thread, "a", 100, 200);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1000064;//user.Getkey:64
            _this.fiber$move(_thread, "b", 100, 300);
            __pc=2;return;
          case 2:
            
            $LASTPOS=1000083;//user.Getkey:83
            _this.keyData=[];
            $LASTPOS=1000107;//user.Getkey:107
            _this.document.onkeydown=(function anonymous_128(e) {
              var key_code;
              var key_char;
              
              $LASTPOS=1000146;//user.Getkey:146
              if (! e) {
                $LASTPOS=1000153;//user.Getkey:153
                e=window.event;
              }
              $LASTPOS=1000175;//user.Getkey:175
              key_code = e.keyCode;
              $LASTPOS=1000205;//user.Getkey:205
              key_char = String.fromCharCode(key_code).toLowerCase();
              $LASTPOS=1000269;//user.Getkey:269
              if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
                $LASTPOS=1000338;//user.Getkey:338
                _this.keyData["shift_key"]=1;
              } else {
                $LASTPOS=1000371;//user.Getkey:371
                if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
                  $LASTPOS=1000437;//user.Getkey:437
                  _this.keyData["ctrl_key"]=1;
                } else {
                  $LASTPOS=1000469;//user.Getkey:469
                  if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
                    $LASTPOS=1000532;//user.Getkey:532
                    _this.keyData["alt_key"]=1;
                  } else {
                    $LASTPOS=1000563;//user.Getkey:563
                    if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                      $LASTPOS=1000625;//user.Getkey:625
                      _this.keyData["left"]=1;
                    } else {
                      $LASTPOS=1000653;//user.Getkey:653
                      if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                        $LASTPOS=1000711;//user.Getkey:711
                        _this.keyData["up"]=1;
                      } else {
                        $LASTPOS=1000737;//user.Getkey:737
                        if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                          $LASTPOS=1000801;//user.Getkey:801
                          _this.keyData["right"]=1;
                        } else {
                          $LASTPOS=1000830;//user.Getkey:830
                          if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                            $LASTPOS=1000892;//user.Getkey:892
                            _this.keyData["down"]=1;
                          } else {
                            $LASTPOS=1000920;//user.Getkey:920
                            if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                              $LASTPOS=1000966;//user.Getkey:966
                              _this.keyData[key_char]=1;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              $LASTPOS=1000991;//user.Getkey:991
              console.log(key_char+"data="+_this.keyData[key_char]+" ,keyCode="+e.keyCode);
            });
            $LASTPOS=1001127;//user.Getkey:1127
            _this.document.onkeyup=(function anonymous_1146(e) {
              var key_code;
              var key_char;
              
              $LASTPOS=1001164;//user.Getkey:1164
              if (! e) {
                $LASTPOS=1001171;//user.Getkey:1171
                e=window.event;
              }
              $LASTPOS=1001193;//user.Getkey:1193
              key_code = e.keyCode;
              $LASTPOS=1001223;//user.Getkey:1223
              key_char = String.fromCharCode(key_code).toLowerCase();
              $LASTPOS=1001287;//user.Getkey:1287
              if (e.keyCode==16) {
                $LASTPOS=1001305;//user.Getkey:1305
                _this.keyData["shift_key"]=0;
              } else {
                $LASTPOS=1001338;//user.Getkey:1338
                if (e.keyCode==17) {
                  $LASTPOS=1001356;//user.Getkey:1356
                  _this.keyData["ctrl_key"]=0;
                } else {
                  $LASTPOS=1001388;//user.Getkey:1388
                  if (e.keyCode==18) {
                    $LASTPOS=1001406;//user.Getkey:1406
                    _this.keyData["alt_key"]=0;
                  } else {
                    $LASTPOS=1001437;//user.Getkey:1437
                    if (e.keyCode==37) {
                      $LASTPOS=1001455;//user.Getkey:1455
                      _this.keyData["left"]=0;
                    } else {
                      $LASTPOS=1001483;//user.Getkey:1483
                      if (e.keyCode==38) {
                        $LASTPOS=1001501;//user.Getkey:1501
                        _this.keyData["up"]=0;
                      } else {
                        $LASTPOS=1001527;//user.Getkey:1527
                        if (e.keyCode==39) {
                          $LASTPOS=1001545;//user.Getkey:1545
                          _this.keyData["right"]=0;
                        } else {
                          $LASTPOS=1001574;//user.Getkey:1574
                          if (e.keyCode==40) {
                            $LASTPOS=1001592;//user.Getkey:1592
                            _this.keyData["down"]=0;
                          } else {
                            $LASTPOS=1001620;//user.Getkey:1620
                            _this.keyData[key_char]=0;
                          }
                        }
                      }
                    }
                  }
                }
              }
              $LASTPOS=1001645;//user.Getkey:1645
              console.log(_this.keyData);
            });
            $LASTPOS=1002106;//user.Getkey:2106
          case 3:
            $LASTPOS=1002123;//user.Getkey:2123
            _this.fiber$setText(_thread, 'a', _this.getkey("left"));
            __pc=4;return;
          case 4:
            
            $LASTPOS=1002156;//user.Getkey:2156
            _this.fiber$setText(_thread, 'b', _this.getkey("b"));
            __pc=5;return;
          case 5:
            
            $LASTPOS=1002218;//user.Getkey:2218
            _this.fiber$wait(_thread, 100);
            __pc=6;return;
          case 6:
            
            __pc=3;break;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getkey :function _trc_Getkey_getkey(k) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.keyData[k.toLowerCase()]||0;
    },
    fiber$getkey :function _trc_Getkey_f_getkey(_thread,k) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyData[k.toLowerCase()]||0;return;
      
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Getkey_wait(t) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001757;//user.Getkey:1757
      Object.keys(_this.keyData).forEach((function anonymous_1786(k) {
        
        $LASTPOS=1001807;//user.Getkey:1807
        if (_this.keyData[k]>0) {
          $LASTPOS=1001824;//user.Getkey:1824
          _this.keyData[k]++;
        }
      }));
      $LASTPOS=1001850;//user.Getkey:1850
      Tonyu.classes.jslker.Parent.prototype.wait.apply( _this, [t]);
    },
    fiber$wait :function _trc_Getkey_f_wait(_thread,t) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001757;//user.Getkey:1757
      Object.keys(_this.keyData).forEach((function anonymous_1786(k) {
        
        $LASTPOS=1001807;//user.Getkey:1807
        if (_this.keyData[k]>0) {
          $LASTPOS=1001824;//user.Getkey:1824
          _this.keyData[k]++;
        }
      }));
      
      _thread.enter(function _trc_Getkey_ent_wait(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001850;//user.Getkey:1850
            Tonyu.classes.jslker.Parent.prototype.fiber$wait.apply( _this, [_thread, t]);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setInterval :function _trc_Getkey_setInterval(func,t,gk) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001904;//user.Getkey:1904
      window.setInterval((function anonymous_1923() {
        
        $LASTPOS=1001943;//user.Getkey:1943
        func();
        $LASTPOS=1001959;//user.Getkey:1959
        if (gk) {
          $LASTPOS=1001979;//user.Getkey:1979
          Object.keys(_this.keyData).forEach((function anonymous_2008(k) {
            
            $LASTPOS=1002037;//user.Getkey:2037
            if (_this.keyData[k]>0) {
              $LASTPOS=1002054;//user.Getkey:2054
              _this.keyData[k]++;
            }
          }));
          
        }
      }),t);
    },
    fiber$setInterval :function _trc_Getkey_f_setInterval(_thread,func,t,gk) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001904;//user.Getkey:1904
      window.setInterval((function anonymous_1923() {
        
        $LASTPOS=1001943;//user.Getkey:1943
        func();
        $LASTPOS=1001959;//user.Getkey:1959
        if (gk) {
          $LASTPOS=1001979;//user.Getkey:1979
          Object.keys(_this.keyData).forEach((function anonymous_2008(k) {
            
            $LASTPOS=1002037;//user.Getkey:2037
            if (_this.keyData[k]>0) {
              $LASTPOS=1002054;//user.Getkey:2054
              _this.keyData[k]++;
            }
          }));
          
        }
      }),t);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"wait":{"nowait":false},"setInterval":{"nowait":false}}}
});Tonyu.klass.define({
  fullName: 'user.HTML1',
  shortName: 'HTML1',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_HTML1_main() {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_HTML1_f_main(_thread) {
      "use strict";
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
//# sourceMappingURL=concat.js.map