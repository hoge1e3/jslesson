Tonyu.klass.define({
  fullName: 'user.Blink',
  shortName: 'Blink',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Panel,
  includes: [],
  methods: {
    main :function _trc_Blink_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=91000156;//user.Blink:156
      _this.zOrder=- 10;
      //$LASTPOS=91000168;//user.Blink:168
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=91000241;//user.Blink:241
        _this.alpha=_this.sin(Tonyu.globals.$frameCount*6)*127+128;
        //$LASTPOS=91000279;//user.Blink:279
        _this.update();
        
      }
    },
    fiber$main :function _trc_Blink_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=91000156;//user.Blink:156
      _this.zOrder=- 10;
      
      _thread.enter(function _trc_Blink_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=91000168;//user.Blink:168
          case 1:
            //$LASTPOS=91000241;//user.Blink:241
            _this.alpha=_this.sin(Tonyu.globals.$frameCount*6)*127+128;
            //$LASTPOS=91000279;//user.Blink:279
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    add :function _trc_Blink_add(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=91000034;//user.Blink:34
      _this.fillRect(param.x,param.y,2,Tonyu.globals.$h);
    },
    fiber$add :function _trc_Blink_f_add(_thread,param) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=91000034;//user.Blink:34
      _this.fillRect(param.x,param.y,2,Tonyu.globals.$h);
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Blink_clear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=91000083;//user.Blink:83
      _this.clearRect();
    },
    fiber$clear :function _trc_Blink_f_clear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Blink_ent_clear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=91000083;//user.Blink:83
            _this.fiber$clearRect(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __getter__defaultLayer :function _trc_Blink___getter__defaultLayer() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$frontLayer;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"add":{"nowait":false},"clear":{"nowait":false},"__getter__defaultLayer":{"nowait":true}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.ClickableText',
  shortName: 'ClickableText',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_ClickableText_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=92000089;//user.ClickableText:89
      _this.align="left";
      //$LASTPOS=92000103;//user.ClickableText:103
      _this.update();
      //$LASTPOS=92000113;//user.ClickableText:113
      _this.shape=new Tonyu.classes.kernel.RectShape({x: _this.x+_this.width/2,y: _this.y+_this.height/2,width: _this.width,height: _this.height});
      //$LASTPOS=92000173;//user.ClickableText:173
      _this.ofi=_this.fillStyle;
      //$LASTPOS=92000188;//user.ClickableText:188
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=92000206;//user.ClickableText:206
        if (_this.shape.contains({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
          //$LASTPOS=92000257;//user.ClickableText:257
          _this.fillStyle="#ddd";
          //$LASTPOS=92000283;//user.ClickableText:283
          if (Tonyu.globals.$touches[0].touched) {
            //$LASTPOS=92000322;//user.ClickableText:322
            if (_this.onClick) {
              //$LASTPOS=92000335;//user.ClickableText:335
              _this.onClick(_this);
            }
            
          }
          
        } else {
          //$LASTPOS=92000381;//user.ClickableText:381
          _this.fillStyle=_this.ofi;
          
        }
        //$LASTPOS=92000406;//user.ClickableText:406
        _this.update();
        
      }
    },
    fiber$main :function _trc_ClickableText_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=92000089;//user.ClickableText:89
      _this.align="left";
      
      _thread.enter(function _trc_ClickableText_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=92000103;//user.ClickableText:103
            _this.fiber$update(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=92000113;//user.ClickableText:113
            _this.shape=new Tonyu.classes.kernel.RectShape({x: _this.x+_this.width/2,y: _this.y+_this.height/2,width: _this.width,height: _this.height});
            //$LASTPOS=92000173;//user.ClickableText:173
            _this.ofi=_this.fillStyle;
            //$LASTPOS=92000188;//user.ClickableText:188
          case 2:
            //$LASTPOS=92000206;//user.ClickableText:206
            if (_this.shape.contains({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
              //$LASTPOS=92000257;//user.ClickableText:257
              _this.fillStyle="#ddd";
              //$LASTPOS=92000283;//user.ClickableText:283
              if (Tonyu.globals.$touches[0].touched) {
                //$LASTPOS=92000322;//user.ClickableText:322
                if (_this.onClick) {
                  //$LASTPOS=92000335;//user.ClickableText:335
                  _this.onClick(_this);
                }
                
              }
              
            } else {
              //$LASTPOS=92000381;//user.ClickableText:381
              _this.fillStyle=_this.ofi;
              
            }
            //$LASTPOS=92000406;//user.ClickableText:406
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"shape":{},"ofi":{},"onClick":{}}}
});
Tonyu.klass.define({
  fullName: 'user.FNlog',
  shortName: 'FNlog',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_FNlog_main() {
      "use strict";
      var _this=this;
      var _it_992;
      var _it_993;
      var _it_994;
      
      //$LASTPOS=93000178;//user.FNlog:178
      _this.paramstr = location.href.replace(/^.*\?/,"").replace(/#.*$/,"");
      
      //$LASTPOS=93000245;//user.FNlog:245
      _this.params = Tonyu.globals.$params||{};
      
      //$LASTPOS=93000269;//user.FNlog:269
      _it_992=Tonyu.iterator(_this.paramstr.split("&"),1);
      while(_it_992.next()) {
        _this.k=_it_992[0];
        
        //$LASTPOS=93000310;//user.FNlog:310
        _this.vals = _this.k.split("=");
        
        //$LASTPOS=93000337;//user.FNlog:337
        if (_this.vals.length==2) {
          //$LASTPOS=93000357;//user.FNlog:357
          _this.params[_this.vals[0]]=_this.vals[1];
        }
        
      }
      //$LASTPOS=93000425;//user.FNlog:425
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=93000467;//user.FNlog:467
      _this.cnt=0;
      //$LASTPOS=93000474;//user.FNlog:474
      _this.day=_this.params.day||"2018-06-08";
      //$LASTPOS=93000504;//user.FNlog:504
      _this.ymd=_this.day.split("-");
      //$LASTPOS=93000524;//user.FNlog:524
      _this.day=new Date();
      //$LASTPOS=93000540;//user.FNlog:540
      _this.day.setDate(_this.ymd[2]-0);
      //$LASTPOS=93000563;//user.FNlog:563
      _this.day.setYear(_this.ymd[0]-0);
      //$LASTPOS=93000586;//user.FNlog:586
      _this.day.setMonth(_this.ymd[1]-1);
      //$LASTPOS=93000610;//user.FNlog:610
      _this.classid=_this.params.classid;
      //$LASTPOS=93000634;//user.FNlog:634
      _this.timezone=(_this.params.timezone||9)-0;
      //$LASTPOS=93000721;//user.FNlog:721
      _this.day=_this.day.getTime();
      //$LASTPOS=93000740;//user.FNlog:740
      _this.day=_this.floor(_this.day/1000);
      //$LASTPOS=93000761;//user.FNlog:761
      _this.day=_this.floor(_this.day/86400)*86400-_this.timezone*3600;
      //$LASTPOS=93000803;//user.FNlog:803
      _this.btime = _this.day;
      
      //$LASTPOS=93000831;//user.FNlog:831
      _this.duration = 86400;
      
      //$LASTPOS=93000851;//user.FNlog:851
      _this.etime = _this.btime+_this.duration;
      
      //$LASTPOS=93000877;//user.FNlog:877
      _this.print(_this.btime);
      //$LASTPOS=93000891;//user.FNlog:891
      _this.timelines = [];
      _this.filerank = {};
      _this.topfile = {};
      
      //$LASTPOS=93000932;//user.FNlog:932
      _this.url=location.host=="bitarrow.eplang.jp"?"https://bitarrow.eplang.jp/bitarrowbeta/":"http://localhost/";
      //$LASTPOS=93001037;//user.FNlog:1037
      Tonyu.globals.$testmode=(location.protocol==="chrome-extension:");
      //$LASTPOS=93001090;//user.FNlog:1090
      if (Tonyu.globals.$testmode) {
        //$LASTPOS=93001111;//user.FNlog:1111
        _this.files=_this.file("fnlog.txt").text();
        //$LASTPOS=93001147;//user.FNlog:1147
        _this.marks=_this.file("mark.json").obj();
        
      } else {
        //$LASTPOS=93001191;//user.FNlog:1191
        _this.files=_this.waitFor($.get(_this.url+"a.php?TeacherLog/getFileNames",{day: _this.btime,classid: _this.classid}));
        //$LASTPOS=93001274;//user.FNlog:1274
        _this.marks=_this.waitFor($.get(_this.url+"a.php?Assignment/matrix",{start: _this.btime,end: _this.etime,output: "json"}));
        
      }
      //$LASTPOS=93001494;//user.FNlog:1494
      _it_993=Tonyu.iterator(_this.files.split("\n"),2);
      while(_it_993.next()) {
        _this.cnt=_it_993[0];
        _this.line=_it_993[1];
        
        //$LASTPOS=93001565;//user.FNlog:1565
        if (_this.cnt==0) {
          continue;
          
        }
        //$LASTPOS=93001591;//user.FNlog:1591
        _this.d = _this.line.split("\t");
        
        //$LASTPOS=93001619;//user.FNlog:1619
        _this.user = _this.d[0];
        _this.filename = _this.d[1];
        _this.time = _this.d[2];
        
        //$LASTPOS=93001673;//user.FNlog:1673
        if (_this.puser!=_this.user) {
          //$LASTPOS=93001700;//user.FNlog:1700
          _this.timeline=[];
          //$LASTPOS=93001721;//user.FNlog:1721
          _this.timeline.user=_this.user;
          //$LASTPOS=93001749;//user.FNlog:1749
          _this.timeline.mark=_this.marks[_this.user];
          //$LASTPOS=93001784;//user.FNlog:1784
          _this.timeline.avg={};
          //$LASTPOS=93001809;//user.FNlog:1809
          _this.timelines.push(_this.timeline);
          //$LASTPOS=93001843;//user.FNlog:1843
          _this.fileappeared={};
          //$LASTPOS=93001868;//user.FNlog:1868
          _this.puser=_this.user;
          
        }
        //$LASTPOS=93001890;//user.FNlog:1890
        if (_this.time<_this.etime) {
          //$LASTPOS=93001916;//user.FNlog:1916
          _this.timeline.end=_this.time;
          //$LASTPOS=93001943;//user.FNlog:1943
          if (! _this.fileappeared[_this.filename]) {
            //$LASTPOS=93001986;//user.FNlog:1986
            _this.fileappeared[_this.filename]=1;
            //$LASTPOS=93002024;//user.FNlog:2024
            _this.filerank[_this.filename]=(_this.filerank[_this.filename]||0)+1;
            
          }
          //$LASTPOS=93002088;//user.FNlog:2088
          _this.timeline.push({filename: _this.filename,time: _this.time});
          //$LASTPOS=93002130;//user.FNlog:2130
          _this.timeline.avg[_this.filename]=_this.timeline.avg[_this.filename]||new Tonyu.classes.user.Summarizer;
          //$LASTPOS=93002201;//user.FNlog:2201
          _this.timeline.avg[_this.filename].add(_this.time-_this.btime);
          
        }
        
      }
      //$LASTPOS=93002249;//user.FNlog:2249
      _this.fileranka=[];
      //$LASTPOS=93002263;//user.FNlog:2263
      _it_994=Tonyu.iterator(_this.filerank,2);
      while(_it_994.next()) {
        _this.filename=_it_994[0];
        _this.count=_it_994[1];
        
        //$LASTPOS=93002306;//user.FNlog:2306
        _this.fileranka.push({filename: _this.filename,count: _this.count});
        
      }
      //$LASTPOS=93002340;//user.FNlog:2340
      _this.fileranka=_this.fileranka.sort((function anonymous_2365(a,b) {
        
        return b.count-a.count;
      }));
      //$LASTPOS=93002405;//user.FNlog:2405
      _this.cols=["#f00","#0f0","#00f","#f0f","#0ff","#ff0","#000","#800","#080","#008","#808","#088","#880"];
      //$LASTPOS=93002504;//user.FNlog:2504
      //$LASTPOS=93002509;//user.FNlog:2509
      _this.i=0;for (; _this.i<_this.min(_this.cols.length,_this.fileranka.length) ; _this.i++) {
        Tonyu.checkLoop();
        //$LASTPOS=93002554;//user.FNlog:2554
        _this.topfile[_this.fileranka[_this.i].filename]=_this.cols[_this.i];
      }
      //$LASTPOS=93002594;//user.FNlog:2594
      _this.timelines=_this.timelines.sort((function anonymous_2619(a,b) {
        
        return a.end-b.end;
      }));
      //$LASTPOS=93002655;//user.FNlog:2655
      new Tonyu.classes.user.Graph({src: _this});
    },
    fiber$main :function _trc_FNlog_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var _it_992;
      var _it_993;
      var _it_994;
      
      //$LASTPOS=93000178;//user.FNlog:178
      _this.paramstr = location.href.replace(/^.*\?/,"").replace(/#.*$/,"");
      
      //$LASTPOS=93000245;//user.FNlog:245
      _this.params = Tonyu.globals.$params||{};
      
      //$LASTPOS=93000269;//user.FNlog:269
      _it_992=Tonyu.iterator(_this.paramstr.split("&"),1);
      while(_it_992.next()) {
        _this.k=_it_992[0];
        
        //$LASTPOS=93000310;//user.FNlog:310
        _this.vals = _this.k.split("=");
        
        //$LASTPOS=93000337;//user.FNlog:337
        if (_this.vals.length==2) {
          //$LASTPOS=93000357;//user.FNlog:357
          _this.params[_this.vals[0]]=_this.vals[1];
        }
        
      }
      //$LASTPOS=93000425;//user.FNlog:425
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=93000467;//user.FNlog:467
      _this.cnt=0;
      //$LASTPOS=93000474;//user.FNlog:474
      _this.day=_this.params.day||"2018-06-08";
      //$LASTPOS=93000504;//user.FNlog:504
      _this.ymd=_this.day.split("-");
      //$LASTPOS=93000524;//user.FNlog:524
      _this.day=new Date();
      //$LASTPOS=93000540;//user.FNlog:540
      _this.day.setDate(_this.ymd[2]-0);
      //$LASTPOS=93000563;//user.FNlog:563
      _this.day.setYear(_this.ymd[0]-0);
      //$LASTPOS=93000586;//user.FNlog:586
      _this.day.setMonth(_this.ymd[1]-1);
      //$LASTPOS=93000610;//user.FNlog:610
      _this.classid=_this.params.classid;
      //$LASTPOS=93000634;//user.FNlog:634
      _this.timezone=(_this.params.timezone||9)-0;
      //$LASTPOS=93000721;//user.FNlog:721
      _this.day=_this.day.getTime();
      //$LASTPOS=93000740;//user.FNlog:740
      _this.day=_this.floor(_this.day/1000);
      //$LASTPOS=93000761;//user.FNlog:761
      _this.day=_this.floor(_this.day/86400)*86400-_this.timezone*3600;
      //$LASTPOS=93000803;//user.FNlog:803
      _this.btime = _this.day;
      
      //$LASTPOS=93000831;//user.FNlog:831
      _this.duration = 86400;
      
      //$LASTPOS=93000851;//user.FNlog:851
      _this.etime = _this.btime+_this.duration;
      
      //$LASTPOS=93000877;//user.FNlog:877
      _this.print(_this.btime);
      //$LASTPOS=93000891;//user.FNlog:891
      _this.timelines = [];
      _this.filerank = {};
      _this.topfile = {};
      
      //$LASTPOS=93000932;//user.FNlog:932
      _this.url=location.host=="bitarrow.eplang.jp"?"https://bitarrow.eplang.jp/bitarrowbeta/":"http://localhost/";
      //$LASTPOS=93001037;//user.FNlog:1037
      Tonyu.globals.$testmode=(location.protocol==="chrome-extension:");
      
      _thread.enter(function _trc_FNlog_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=93001090;//user.FNlog:1090
            if (!(Tonyu.globals.$testmode)) { __pc=1     ; break; }
            {
              //$LASTPOS=93001111;//user.FNlog:1111
              _this.files=_this.file("fnlog.txt").text();
              //$LASTPOS=93001147;//user.FNlog:1147
              _this.marks=_this.file("mark.json").obj();
            }
            __pc=4     ;break;
          case 1     :
            //$LASTPOS=93001191;//user.FNlog:1191
            _this.fiber$waitFor(_thread, $.get(_this.url+"a.php?TeacherLog/getFileNames",{day: _this.btime,classid: _this.classid}));
            __pc=2;return;
          case 2:
            _this.files=_thread.retVal;
            
            //$LASTPOS=93001274;//user.FNlog:1274
            _this.fiber$waitFor(_thread, $.get(_this.url+"a.php?Assignment/matrix",{start: _this.btime,end: _this.etime,output: "json"}));
            __pc=3;return;
          case 3:
            _this.marks=_thread.retVal;
            
          case 4     :
            
            //$LASTPOS=93001494;//user.FNlog:1494
            _it_993=Tonyu.iterator(_this.files.split("\n"),2);
            while(_it_993.next()) {
              _this.cnt=_it_993[0];
              _this.line=_it_993[1];
              
              //$LASTPOS=93001565;//user.FNlog:1565
              if (_this.cnt==0) {
                continue;
                
              }
              //$LASTPOS=93001591;//user.FNlog:1591
              _this.d = _this.line.split("\t");
              
              //$LASTPOS=93001619;//user.FNlog:1619
              _this.user = _this.d[0];
              _this.filename = _this.d[1];
              _this.time = _this.d[2];
              
              //$LASTPOS=93001673;//user.FNlog:1673
              if (_this.puser!=_this.user) {
                //$LASTPOS=93001700;//user.FNlog:1700
                _this.timeline=[];
                //$LASTPOS=93001721;//user.FNlog:1721
                _this.timeline.user=_this.user;
                //$LASTPOS=93001749;//user.FNlog:1749
                _this.timeline.mark=_this.marks[_this.user];
                //$LASTPOS=93001784;//user.FNlog:1784
                _this.timeline.avg={};
                //$LASTPOS=93001809;//user.FNlog:1809
                _this.timelines.push(_this.timeline);
                //$LASTPOS=93001843;//user.FNlog:1843
                _this.fileappeared={};
                //$LASTPOS=93001868;//user.FNlog:1868
                _this.puser=_this.user;
                
              }
              //$LASTPOS=93001890;//user.FNlog:1890
              if (_this.time<_this.etime) {
                //$LASTPOS=93001916;//user.FNlog:1916
                _this.timeline.end=_this.time;
                //$LASTPOS=93001943;//user.FNlog:1943
                if (! _this.fileappeared[_this.filename]) {
                  //$LASTPOS=93001986;//user.FNlog:1986
                  _this.fileappeared[_this.filename]=1;
                  //$LASTPOS=93002024;//user.FNlog:2024
                  _this.filerank[_this.filename]=(_this.filerank[_this.filename]||0)+1;
                  
                }
                //$LASTPOS=93002088;//user.FNlog:2088
                _this.timeline.push({filename: _this.filename,time: _this.time});
                //$LASTPOS=93002130;//user.FNlog:2130
                _this.timeline.avg[_this.filename]=_this.timeline.avg[_this.filename]||new Tonyu.classes.user.Summarizer;
                //$LASTPOS=93002201;//user.FNlog:2201
                _this.timeline.avg[_this.filename].add(_this.time-_this.btime);
                
              }
              
            }
            //$LASTPOS=93002249;//user.FNlog:2249
            _this.fileranka=[];
            //$LASTPOS=93002263;//user.FNlog:2263
            _it_994=Tonyu.iterator(_this.filerank,2);
            while(_it_994.next()) {
              _this.filename=_it_994[0];
              _this.count=_it_994[1];
              
              //$LASTPOS=93002306;//user.FNlog:2306
              _this.fileranka.push({filename: _this.filename,count: _this.count});
              
            }
            //$LASTPOS=93002340;//user.FNlog:2340
            _this.fileranka=_this.fileranka.sort((function anonymous_2365(a,b) {
              
              return b.count-a.count;
            }));
            //$LASTPOS=93002405;//user.FNlog:2405
            _this.cols=["#f00","#0f0","#00f","#f0f","#0ff","#ff0","#000","#800","#080","#008","#808","#088","#880"];
            //$LASTPOS=93002504;//user.FNlog:2504
            //$LASTPOS=93002509;//user.FNlog:2509
            _this.i=0;for (; _this.i<_this.min(_this.cols.length,_this.fileranka.length) ; _this.i++) {
              Tonyu.checkLoop();
              //$LASTPOS=93002554;//user.FNlog:2554
              _this.topfile[_this.fileranka[_this.i].filename]=_this.cols[_this.i];
            }
            //$LASTPOS=93002594;//user.FNlog:2594
            _this.timelines=_this.timelines.sort((function anonymous_2619(a,b) {
              
              return a.end-b.end;
            }));
            //$LASTPOS=93002655;//user.FNlog:2655
            new Tonyu.classes.user.Graph({src: _this});
            _thread.exit(_this);return;
          }
        }
      });
    },
    sortByFile :function _trc_FNlog_sortByFile(filename) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=93002704;//user.FNlog:2704
      _this.timelines=_this.timelines.sort((function anonymous_2729(a,b) {
        var ava;
        var avb;
        
        //$LASTPOS=93002746;//user.FNlog:2746
        ava = a.avg[filename];
        
        //$LASTPOS=93002779;//user.FNlog:2779
        avb = b.avg[filename];
        
        //$LASTPOS=93002812;//user.FNlog:2812
        ava=(ava?ava.average:0);
        //$LASTPOS=93002847;//user.FNlog:2847
        avb=(avb?avb.average:0);
        return ava-avb;
      }));
    },
    fiber$sortByFile :function _trc_FNlog_f_sortByFile(_thread,filename) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=93002704;//user.FNlog:2704
      _this.timelines=_this.timelines.sort((function anonymous_2729(a,b) {
        var ava;
        var avb;
        
        //$LASTPOS=93002746;//user.FNlog:2746
        ava = a.avg[filename];
        
        //$LASTPOS=93002779;//user.FNlog:2779
        avb = b.avg[filename];
        
        //$LASTPOS=93002812;//user.FNlog:2812
        ava=(ava?ava.average:0);
        //$LASTPOS=93002847;//user.FNlog:2847
        avb=(avb?avb.average:0);
        return ava-avb;
      }));
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"sortByFile":{"nowait":false}},"fields":{"paramstr":{},"params":{},"k":{},"vals":{},"btime":{},"duration":{},"etime":{},"timelines":{},"filerank":{},"topfile":{},"d":{},"user":{},"filename":{},"time":{},"count":{},"cnt":{},"day":{},"ymd":{},"classid":{},"timezone":{},"url":{},"files":{},"marks":{},"line":{},"puser":{},"timeline":{},"fileappeared":{},"fileranka":{},"cols":{},"i":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Graph',
  shortName: 'Graph',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Graph_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=94000000;//user.Graph:0
      "field strict";
      
      //$LASTPOS=94000031;//user.Graph:31
      _this.colors = {};
      
      //$LASTPOS=94000046;//user.Graph:46
      Tonyu.globals.$h=5;
      //$LASTPOS=94000053;//user.Graph:53
      _this.hslc = 0;
      
      
      //$LASTPOS=94000109;//user.Graph:109
      _this.setRange();
      
      //$LASTPOS=94000199;//user.Graph:199
      Tonyu.globals.$blink=new Tonyu.classes.user.Blink;
      //$LASTPOS=94000217;//user.Graph:217
      new Tonyu.classes.user.Indicator({graph: _this,timelines: _this.src.timelines,layer: Tonyu.globals.$frontLayer});
      //$LASTPOS=94000287;//user.Graph:287
      _this.drawLines();
      //$LASTPOS=94000300;//user.Graph:300
      _this.drawLegends();
      //$LASTPOS=94000315;//user.Graph:315
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=94000333;//user.Graph:333
        if (_this.getkey("I")==1) {
          //$LASTPOS=94000363;//user.Graph:363
          _this.zoomIn(Tonyu.globals.$mouseX);
          //$LASTPOS=94000388;//user.Graph:388
          _this.drawLines();
          
        }
        //$LASTPOS=94000411;//user.Graph:411
        if (_this.getkey("O")==1) {
          //$LASTPOS=94000441;//user.Graph:441
          _this.zoomOut(Tonyu.globals.$mouseX);
          //$LASTPOS=94000467;//user.Graph:467
          _this.drawLines();
          
        }
        //$LASTPOS=94000490;//user.Graph:490
        if (_this.getkey("mouseleft")==1) {
          //$LASTPOS=94000528;//user.Graph:528
          _this.t = _this.y2timeline(Tonyu.globals.$mouseY);
          
          //$LASTPOS=94000563;//user.Graph:563
          if (_this.t) {
            //$LASTPOS=94000585;//user.Graph:585
            _this.url = "https://bitarrow.eplang.jp/bitarrowbeta/a.php?TeacherLog/view1&user="+_this.t.user+"&day="+_this.floor(_this.btime);
            
            //$LASTPOS=94000735;//user.Graph:735
            Tonyu.globals.$WebPage.openNewWindow(_this.url);
            
          }
          
        }
        //$LASTPOS=94000784;//user.Graph:784
        if (_this.reqRedraw) {
          //$LASTPOS=94000799;//user.Graph:799
          _this.drawLines();
        }
        //$LASTPOS=94000816;//user.Graph:816
        _this.update();
        
      }
      //$LASTPOS=94000828;//user.Graph:828
      _this.p=- 1;
    },
    fiber$main :function _trc_Graph_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=94000000;//user.Graph:0
      "field strict";
      
      //$LASTPOS=94000031;//user.Graph:31
      _this.colors = {};
      
      //$LASTPOS=94000046;//user.Graph:46
      Tonyu.globals.$h=5;
      //$LASTPOS=94000053;//user.Graph:53
      _this.hslc = 0;
      
      
      
      _thread.enter(function _trc_Graph_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=94000109;//user.Graph:109
            _this.fiber$setRange(_thread);
            __pc=1;return;
          case 1:
            
            
            //$LASTPOS=94000199;//user.Graph:199
            Tonyu.globals.$blink=new Tonyu.classes.user.Blink;
            //$LASTPOS=94000217;//user.Graph:217
            new Tonyu.classes.user.Indicator({graph: _this,timelines: _this.src.timelines,layer: Tonyu.globals.$frontLayer});
            //$LASTPOS=94000287;//user.Graph:287
            _this.fiber$drawLines(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=94000300;//user.Graph:300
            _this.fiber$drawLegends(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=94000315;//user.Graph:315
          case 4:
            //$LASTPOS=94000333;//user.Graph:333
            if (!(_this.getkey("I")==1)) { __pc=7     ; break; }
            //$LASTPOS=94000363;//user.Graph:363
            _this.fiber$zoomIn(_thread, Tonyu.globals.$mouseX);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=94000388;//user.Graph:388
            _this.fiber$drawLines(_thread);
            __pc=6;return;
          case 6:
            
          case 7     :
            
            //$LASTPOS=94000411;//user.Graph:411
            if (!(_this.getkey("O")==1)) { __pc=10    ; break; }
            //$LASTPOS=94000441;//user.Graph:441
            _this.fiber$zoomOut(_thread, Tonyu.globals.$mouseX);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=94000467;//user.Graph:467
            _this.fiber$drawLines(_thread);
            __pc=9;return;
          case 9:
            
          case 10    :
            
            //$LASTPOS=94000490;//user.Graph:490
            if (!(_this.getkey("mouseleft")==1)) { __pc=12    ; break; }
            //$LASTPOS=94000528;//user.Graph:528
            _this.fiber$y2timeline(_thread, Tonyu.globals.$mouseY);
            __pc=11;return;
          case 11:
            _this.t=_thread.retVal;
            
            //$LASTPOS=94000563;//user.Graph:563
            if (_this.t) {
              //$LASTPOS=94000585;//user.Graph:585
              _this.url = "https://bitarrow.eplang.jp/bitarrowbeta/a.php?TeacherLog/view1&user="+_this.t.user+"&day="+_this.floor(_this.btime);
              
              //$LASTPOS=94000735;//user.Graph:735
              Tonyu.globals.$WebPage.openNewWindow(_this.url);
              
            }
          case 12    :
            
            //$LASTPOS=94000784;//user.Graph:784
            if (!(_this.reqRedraw)) { __pc=14    ; break; }
            //$LASTPOS=94000799;//user.Graph:799
            _this.fiber$drawLines(_thread);
            __pc=13;return;
          case 13:
            
          case 14    :
            
            //$LASTPOS=94000816;//user.Graph:816
            _this.fiber$update(_thread);
            __pc=15;return;
          case 15:
            
            __pc=4;break;
          case 16    :
            
            //$LASTPOS=94000828;//user.Graph:828
            _this.p=- 1;
            _thread.exit(_this);return;
          }
        }
      });
    },
    y2timeline :function _trc_Graph_y2timeline(yy) {
      "use strict";
      var _this=this;
      var i;
      var t;
      
      //$LASTPOS=94000856;//user.Graph:856
      i = _this.floor(yy/Tonyu.globals.$h);
      
      //$LASTPOS=94000880;//user.Graph:880
      t = _this.src.timelines[i];
      
      return t;
    },
    fiber$y2timeline :function _trc_Graph_f_y2timeline(_thread,yy) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var t;
      
      //$LASTPOS=94000856;//user.Graph:856
      i = _this.floor(yy/Tonyu.globals.$h);
      
      //$LASTPOS=94000880;//user.Graph:880
      t = _this.src.timelines[i];
      
      _thread.retVal=t;return;
      
      
      _thread.retVal=_this;return;
    },
    drawLines :function _trc_Graph_drawLines() {
      "use strict";
      var _this=this;
      var cnt;
      var px;
      var timeline;
      var _it_924;
      var e;
      var _it_925;
      var filename;
      var time;
      var mark;
      var k;
      var m;
      var _it_926;
      
      //$LASTPOS=94000939;//user.Graph:939
      Tonyu.globals.$blink.clear();
      //$LASTPOS=94000995;//user.Graph:995
      if (_this.linesYMax) {
        //$LASTPOS=94001020;//user.Graph:1020
        Tonyu.globals.$panel.fillStyle="white";
        //$LASTPOS=94001054;//user.Graph:1054
        Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,_this.linesYMax);
        
      }
      //$LASTPOS=94001109;//user.Graph:1109
      cnt = 0;
      
      
      //$LASTPOS=94001136;//user.Graph:1136
      _this.y=0;
      //$LASTPOS=94001145;//user.Graph:1145
      _it_924=Tonyu.iterator(_this.src.timelines,1);
      while(_it_924.next()) {
        timeline=_it_924[0];
        
        //$LASTPOS=94001191;//user.Graph:1191
        _it_925=Tonyu.iterator(timeline,1);
        while(_it_925.next()) {
          e=_it_925[0];
          
          //$LASTPOS=94001229;//user.Graph:1229
          filename = e.filename;
          time = e.time;
          
          //$LASTPOS=94001279;//user.Graph:1279
          _this.x=_this.time2x(time);
          //$LASTPOS=94001307;//user.Graph:1307
          if (px) {
            //$LASTPOS=94001333;//user.Graph:1333
            Tonyu.globals.$panel.fillRect(px,_this.y,_this.clamp((_this.x-px),1,10),Tonyu.globals.$h);
            
          }
          //$LASTPOS=94001406;//user.Graph:1406
          px=_this.x;
          //$LASTPOS=94001424;//user.Graph:1424
          Tonyu.globals.$panel.fillStyle=_this.getColor(filename);
          //$LASTPOS=94001473;//user.Graph:1473
          cnt++;
          //$LASTPOS=94001492;//user.Graph:1492
          if (cnt%1000==0) {
            //$LASTPOS=94001509;//user.Graph:1509
            _this.update();
          }
          
        }
        //$LASTPOS=94001537;//user.Graph:1537
        mark = timeline.mark;
        
        //$LASTPOS=94001569;//user.Graph:1569
        if (mark) {
          //$LASTPOS=94001593;//user.Graph:1593
          _it_926=Tonyu.iterator(mark,2);
          while(_it_926.next()) {
            k=_it_926[0];
            m=_it_926[1];
            
            //$LASTPOS=94001633;//user.Graph:1633
            if (m.result==="OK") {
              //$LASTPOS=94001790;//user.Graph:1790
              Tonyu.globals.$blink.add({mark: mark,x: _this.time2x(m.time),y: _this.y});
              
            }
            
          }
          
        }
        //$LASTPOS=94001877;//user.Graph:1877
        _this.y+=Tonyu.globals.$h;
        
      }
      //$LASTPOS=94001894;//user.Graph:1894
      _this.reqRedraw=0;
      //$LASTPOS=94001955;//user.Graph:1955
      _this.linesYMax=_this.y;
    },
    fiber$drawLines :function _trc_Graph_f_drawLines(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cnt;
      var px;
      var timeline;
      var _it_924;
      var e;
      var _it_925;
      var filename;
      var time;
      var mark;
      var k;
      var m;
      var _it_926;
      
      //$LASTPOS=94000939;//user.Graph:939
      Tonyu.globals.$blink.clear();
      //$LASTPOS=94000995;//user.Graph:995
      if (_this.linesYMax) {
        //$LASTPOS=94001020;//user.Graph:1020
        Tonyu.globals.$panel.fillStyle="white";
        //$LASTPOS=94001054;//user.Graph:1054
        Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,_this.linesYMax);
        
      }
      //$LASTPOS=94001109;//user.Graph:1109
      cnt = 0;
      
      
      //$LASTPOS=94001136;//user.Graph:1136
      _this.y=0;
      
      _thread.enter(function _trc_Graph_ent_drawLines(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=94001145;//user.Graph:1145
            _it_924=Tonyu.iterator(_this.src.timelines,1);
          case 1:
            if (!(_it_924.next())) { __pc=8     ; break; }
            timeline=_it_924[0];
            
            //$LASTPOS=94001191;//user.Graph:1191
            _it_925=Tonyu.iterator(timeline,1);
          case 2:
            if (!(_it_925.next())) { __pc=7     ; break; }
            e=_it_925[0];
            
            //$LASTPOS=94001229;//user.Graph:1229
            filename = e.filename;
            time = e.time;
            
            //$LASTPOS=94001279;//user.Graph:1279
            _this.fiber$time2x(_thread, time);
            __pc=3;return;
          case 3:
            _this.x=_thread.retVal;
            
            //$LASTPOS=94001307;//user.Graph:1307
            if (px) {
              //$LASTPOS=94001333;//user.Graph:1333
              Tonyu.globals.$panel.fillRect(px,_this.y,_this.clamp((_this.x-px),1,10),Tonyu.globals.$h);
              
            }
            //$LASTPOS=94001406;//user.Graph:1406
            px=_this.x;
            //$LASTPOS=94001424;//user.Graph:1424
            _this.fiber$getColor(_thread, filename);
            __pc=4;return;
          case 4:
            Tonyu.globals.$panel.fillStyle=_thread.retVal;
            
            //$LASTPOS=94001473;//user.Graph:1473
            cnt++;
            //$LASTPOS=94001492;//user.Graph:1492
            if (!(cnt%1000==0)) { __pc=6     ; break; }
            //$LASTPOS=94001509;//user.Graph:1509
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
          case 6     :
            
            __pc=2;break;
          case 7     :
            
            //$LASTPOS=94001537;//user.Graph:1537
            mark = timeline.mark;
            
            //$LASTPOS=94001569;//user.Graph:1569
            if (mark) {
              //$LASTPOS=94001593;//user.Graph:1593
              _it_926=Tonyu.iterator(mark,2);
              while(_it_926.next()) {
                k=_it_926[0];
                m=_it_926[1];
                
                //$LASTPOS=94001633;//user.Graph:1633
                if (m.result==="OK") {
                  //$LASTPOS=94001790;//user.Graph:1790
                  Tonyu.globals.$blink.add({mark: mark,x: _this.time2x(m.time),y: _this.y});
                  
                }
                
              }
              
            }
            //$LASTPOS=94001877;//user.Graph:1877
            _this.y+=Tonyu.globals.$h;
            __pc=1;break;
          case 8     :
            
            //$LASTPOS=94001894;//user.Graph:1894
            _this.reqRedraw=0;
            //$LASTPOS=94001955;//user.Graph:1955
            _this.linesYMax=_this.y;
            _thread.exit(_this);return;
          }
        }
      });
    },
    zoomIn :function _trc_Graph_zoomIn(x) {
      "use strict";
      var _this=this;
      var t;
      var nd;
      
      //$LASTPOS=94001987;//user.Graph:1987
      t = _this.x2time(x);
      
      //$LASTPOS=94002008;//user.Graph:2008
      nd = _this.duration/2;
      
      //$LASTPOS=94002031;//user.Graph:2031
      _this.setRange(t-nd/2,t+nd/2);
    },
    fiber$zoomIn :function _trc_Graph_f_zoomIn(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var nd;
      
      
      _thread.enter(function _trc_Graph_ent_zoomIn(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=94001987;//user.Graph:1987
            _this.fiber$x2time(_thread, x);
            __pc=1;return;
          case 1:
            t=_thread.retVal;
            
            //$LASTPOS=94002008;//user.Graph:2008
            nd = _this.duration/2;
            
            //$LASTPOS=94002031;//user.Graph:2031
            _this.fiber$setRange(_thread, t-nd/2, t+nd/2);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    zoomOut :function _trc_Graph_zoomOut(x) {
      "use strict";
      var _this=this;
      var t;
      var nd;
      
      //$LASTPOS=94002076;//user.Graph:2076
      t = _this.x2time(x);
      
      //$LASTPOS=94002097;//user.Graph:2097
      nd = _this.duration*2;
      
      //$LASTPOS=94002120;//user.Graph:2120
      _this.setRange(t-nd/2,t+nd/2);
    },
    fiber$zoomOut :function _trc_Graph_f_zoomOut(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var nd;
      
      
      _thread.enter(function _trc_Graph_ent_zoomOut(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=94002076;//user.Graph:2076
            _this.fiber$x2time(_thread, x);
            __pc=1;return;
          case 1:
            t=_thread.retVal;
            
            //$LASTPOS=94002097;//user.Graph:2097
            nd = _this.duration*2;
            
            //$LASTPOS=94002120;//user.Graph:2120
            _this.fiber$setRange(_thread, t-nd/2, t+nd/2);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setRange :function _trc_Graph_setRange(b,e) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=94002168;//user.Graph:2168
      _this.btime=_this.clamp(b||_this.src.btime,_this.src.btime,_this.src.etime);
      //$LASTPOS=94002219;//user.Graph:2219
      _this.etime=_this.clamp(e||_this.src.etime,_this.src.btime,_this.src.etime);
      //$LASTPOS=94002270;//user.Graph:2270
      _this.duration=_this.etime-_this.btime;
    },
    fiber$setRange :function _trc_Graph_f_setRange(_thread,b,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=94002168;//user.Graph:2168
      _this.btime=_this.clamp(b||_this.src.btime,_this.src.btime,_this.src.etime);
      //$LASTPOS=94002219;//user.Graph:2219
      _this.etime=_this.clamp(e||_this.src.etime,_this.src.btime,_this.src.etime);
      //$LASTPOS=94002270;//user.Graph:2270
      _this.duration=_this.etime-_this.btime;
      
      _thread.retVal=_this;return;
    },
    x2time :function _trc_Graph_x2time(x) {
      "use strict";
      var _this=this;
      
      return _this.btime+(x/Tonyu.globals.$screenWidth*_this.duration);
    },
    fiber$x2time :function _trc_Graph_f_x2time(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.btime+(x/Tonyu.globals.$screenWidth*_this.duration);return;
      
      
      _thread.retVal=_this;return;
    },
    time2x :function _trc_Graph_time2x(time) {
      "use strict";
      var _this=this;
      
      return (time-_this.btime)/_this.duration*Tonyu.globals.$screenWidth;
    },
    fiber$time2x :function _trc_Graph_f_time2x(_thread,time) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(time-_this.btime)/_this.duration*Tonyu.globals.$screenWidth;return;
      
      
      _thread.retVal=_this;return;
    },
    drawLegends :function _trc_Graph_drawLegends() {
      "use strict";
      var _this=this;
      var sz;
      var by;
      var i;
      var r;
      var _it_943;
      
      //$LASTPOS=94002442;//user.Graph:2442
      sz = 12;
      
      //$LASTPOS=94002457;//user.Graph:2457
      _this.x=10;
      //$LASTPOS=94002462;//user.Graph:2462
      _this.y+=30;
      //$LASTPOS=94002473;//user.Graph:2473
      by = _this.y;
      
      //$LASTPOS=94002487;//user.Graph:2487
      Tonyu.globals.$panel.context.textBaseline="top";
      //$LASTPOS=94002526;//user.Graph:2526
      _it_943=Tonyu.iterator(_this.src.fileranka,2);
      while(_it_943.next()) {
        i=_it_943[0];
        r=_it_943[1];
        
        //$LASTPOS=94002567;//user.Graph:2567
        if (i>=_this.src.cols.length) {
          break;
          
        }
        //$LASTPOS=94002606;//user.Graph:2606
        Tonyu.globals.$panel.fillStyle=_this.getColor(r.filename);
        //$LASTPOS=94002689;//user.Graph:2689
        new Tonyu.classes.user.ClickableText({filename: r.filename,fillStyle: _this.getColor(r.filename),text: r.filename+"("+r.count+")",x: _this.x,y: _this.y,size: sz,onClick: (function anonymous_2862(b) {
          
          //$LASTPOS=94002885;//user.Graph:2885
          _this.src.sortByFile(b.filename);
          //$LASTPOS=94002929;//user.Graph:2929
          _this.curFile=b.filename;
          //$LASTPOS=94002965;//user.Graph:2965
          _this.reqRedraw=1;
        })});
        //$LASTPOS=94003166;//user.Graph:3166
        Tonyu.globals.$panel.fillRect(_this.x-sz,_this.y,sz,sz);
        //$LASTPOS=94003214;//user.Graph:3214
        _this.y+=sz;
        //$LASTPOS=94003229;//user.Graph:3229
        if (_this.y>Tonyu.globals.$screenHeight-sz) {
          //$LASTPOS=94003267;//user.Graph:3267
          _this.y=by;
          //$LASTPOS=94003285;//user.Graph:3285
          _this.x+=100;
          
        }
        
      }
      //$LASTPOS=94003313;//user.Graph:3313
      _this.y+=sz;
      //$LASTPOS=94003324;//user.Graph:3324
      Tonyu.globals.$panel.fillStyle="black";
      //$LASTPOS=94003354;//user.Graph:3354
      Tonyu.globals.$panel.fillText("I: Zoomin / O: Zoomout",_this.x,_this.y,sz,"left");
    },
    fiber$drawLegends :function _trc_Graph_f_drawLegends(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sz;
      var by;
      var i;
      var r;
      var _it_943;
      
      //$LASTPOS=94002442;//user.Graph:2442
      sz = 12;
      
      //$LASTPOS=94002457;//user.Graph:2457
      _this.x=10;
      //$LASTPOS=94002462;//user.Graph:2462
      _this.y+=30;
      //$LASTPOS=94002473;//user.Graph:2473
      by = _this.y;
      
      //$LASTPOS=94002487;//user.Graph:2487
      Tonyu.globals.$panel.context.textBaseline="top";
      
      _thread.enter(function _trc_Graph_ent_drawLegends(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=94002526;//user.Graph:2526
            _it_943=Tonyu.iterator(_this.src.fileranka,2);
          case 1:
            if (!(_it_943.next())) { __pc=4     ; break; }
            i=_it_943[0];
            r=_it_943[1];
            
            //$LASTPOS=94002567;//user.Graph:2567
            if (!(i>=_this.src.cols.length)) { __pc=2     ; break; }
            __pc=4     ; break;
            
          case 2     :
            
            //$LASTPOS=94002606;//user.Graph:2606
            _this.fiber$getColor(_thread, r.filename);
            __pc=3;return;
          case 3:
            Tonyu.globals.$panel.fillStyle=_thread.retVal;
            
            //$LASTPOS=94002689;//user.Graph:2689
            new Tonyu.classes.user.ClickableText({filename: r.filename,fillStyle: _this.getColor(r.filename),text: r.filename+"("+r.count+")",x: _this.x,y: _this.y,size: sz,onClick: (function anonymous_2862(b) {
              
              //$LASTPOS=94002885;//user.Graph:2885
              _this.src.sortByFile(b.filename);
              //$LASTPOS=94002929;//user.Graph:2929
              _this.curFile=b.filename;
              //$LASTPOS=94002965;//user.Graph:2965
              _this.reqRedraw=1;
            })});
            //$LASTPOS=94003166;//user.Graph:3166
            Tonyu.globals.$panel.fillRect(_this.x-sz,_this.y,sz,sz);
            //$LASTPOS=94003214;//user.Graph:3214
            _this.y+=sz;
            //$LASTPOS=94003229;//user.Graph:3229
            if (_this.y>Tonyu.globals.$screenHeight-sz) {
              //$LASTPOS=94003267;//user.Graph:3267
              _this.y=by;
              //$LASTPOS=94003285;//user.Graph:3285
              _this.x+=100;
              
            }
            __pc=1;break;
          case 4     :
            
            //$LASTPOS=94003313;//user.Graph:3313
            _this.y+=sz;
            //$LASTPOS=94003324;//user.Graph:3324
            Tonyu.globals.$panel.fillStyle="black";
            //$LASTPOS=94003354;//user.Graph:3354
            Tonyu.globals.$panel.fillText("I: Zoomin / O: Zoomout",_this.x,_this.y,sz,"left");
            _thread.exit(_this);return;
          }
        }
      });
    },
    getColor :function _trc_Graph_getColor(file) {
      "use strict";
      var _this=this;
      
      return _this.src.topfile[file]||"#888";
    },
    fiber$getColor :function _trc_Graph_f_getColor(_thread,file) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.src.topfile[file]||"#888";return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"y2timeline":{"nowait":false},"drawLines":{"nowait":false},"zoomIn":{"nowait":false},"zoomOut":{"nowait":false},"setRange":{"nowait":false},"x2time":{"nowait":false},"time2x":{"nowait":false},"drawLegends":{"nowait":false},"getColor":{"nowait":false}},"fields":{"src":{},"colors":{},"hslc":{},"btime":{},"etime":{},"duration":{},"reqRedraw":{},"curFile":{},"linesYMax":{},"t":{},"url":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Indicator',
  shortName: 'Indicator',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Indicator_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=95000000;//user.Indicator:0
      _this.fillStyle="black";
      //$LASTPOS=95000019;//user.Indicator:19
      _this.text="?";
      //$LASTPOS=95000029;//user.Indicator:29
      _this.zOrder=- 10;
      //$LASTPOS=95000041;//user.Indicator:41
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=95000059;//user.Indicator:59
        _this.x=Tonyu.globals.$mouseX;
        //$LASTPOS=95000074;//user.Indicator:74
        _this.yy=Tonyu.globals.$mouseY;
        //$LASTPOS=95000090;//user.Indicator:90
        _this.i=_this.floor(_this.yy/Tonyu.globals.$h);
        //$LASTPOS=95000110;//user.Indicator:110
        _this.t=_this.timelines[_this.i];
        //$LASTPOS=95000130;//user.Indicator:130
        _this.y=_this.yy+50;
        //$LASTPOS=95000143;//user.Indicator:143
        if (_this.t&&_this.t.user) {
          //$LASTPOS=95000170;//user.Indicator:170
          _this.text=_this.t.user;
          
        } else {
          //$LASTPOS=95000194;//user.Indicator:194
          _this.text="";
        }
        //$LASTPOS=95000207;//user.Indicator:207
        _this.ti=_this.graph.x2time(_this.x);
        //$LASTPOS=95000231;//user.Indicator:231
        _this.d = new Date();
        
        //$LASTPOS=95000253;//user.Indicator:253
        _this.d.setTime(_this.ti*1000);
        //$LASTPOS=95000277;//user.Indicator:277
        _this.text+="\n"+[_this.d.getHours(),_this.d.getMinutes()].join(":");
        //$LASTPOS=95000333;//user.Indicator:333
        if (_this.t&&_this.t.avg&&_this.graph.curFile) {
          //$LASTPOS=95000366;//user.Indicator:366
          _this.text+="\n"+_this.t.avg[_this.graph.curFile];
        }
        //$LASTPOS=95000403;//user.Indicator:403
        _this.update();
        
      }
    },
    fiber$main :function _trc_Indicator_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=95000000;//user.Indicator:0
      _this.fillStyle="black";
      //$LASTPOS=95000019;//user.Indicator:19
      _this.text="?";
      //$LASTPOS=95000029;//user.Indicator:29
      _this.zOrder=- 10;
      
      _thread.enter(function _trc_Indicator_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=95000041;//user.Indicator:41
          case 1:
            //$LASTPOS=95000059;//user.Indicator:59
            _this.x=Tonyu.globals.$mouseX;
            //$LASTPOS=95000074;//user.Indicator:74
            _this.yy=Tonyu.globals.$mouseY;
            //$LASTPOS=95000090;//user.Indicator:90
            _this.i=_this.floor(_this.yy/Tonyu.globals.$h);
            //$LASTPOS=95000110;//user.Indicator:110
            _this.t=_this.timelines[_this.i];
            //$LASTPOS=95000130;//user.Indicator:130
            _this.y=_this.yy+50;
            //$LASTPOS=95000143;//user.Indicator:143
            if (_this.t&&_this.t.user) {
              //$LASTPOS=95000170;//user.Indicator:170
              _this.text=_this.t.user;
              
            } else {
              //$LASTPOS=95000194;//user.Indicator:194
              _this.text="";
            }
            //$LASTPOS=95000207;//user.Indicator:207
            _this.ti=_this.graph.x2time(_this.x);
            //$LASTPOS=95000231;//user.Indicator:231
            _this.d = new Date();
            
            //$LASTPOS=95000253;//user.Indicator:253
            _this.d.setTime(_this.ti*1000);
            //$LASTPOS=95000277;//user.Indicator:277
            _this.text+="\n"+[_this.d.getHours(),_this.d.getMinutes()].join(":");
            //$LASTPOS=95000333;//user.Indicator:333
            if (_this.t&&_this.t.avg&&_this.graph.curFile) {
              //$LASTPOS=95000366;//user.Indicator:366
              _this.text+="\n"+_this.t.avg[_this.graph.curFile];
            }
            //$LASTPOS=95000403;//user.Indicator:403
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"d":{},"yy":{},"i":{},"t":{},"timelines":{},"ti":{},"graph":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=96000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=96000029;//user.Main:29
      _this.cols=["lime","red","blue","yellow","#f0f"];
      //$LASTPOS=96000075;//user.Main:75
      //$LASTPOS=96000079;//user.Main:79
      _this.i=0;for (; _this.i<50 ; _this.i++) {
        Tonyu.checkLoop();
        {
          //$LASTPOS=96000099;//user.Main:99
          _this.x=0;
          //$LASTPOS=96000108;//user.Main:108
          _this.n=0;
          //$LASTPOS=96000117;//user.Main:117
          //$LASTPOS=96000122;//user.Main:122
          _this.j=0;for (; _this.j<400 ; _this.j++) {
            Tonyu.checkLoop();
            {
              //$LASTPOS=96000147;//user.Main:147
              _this.n+=_this.rnd()*(0.1+_this.i/100);
              //$LASTPOS=96000177;//user.Main:177
              if (_this.n>=5) {
                break;
                
              }
              //$LASTPOS=96000202;//user.Main:202
              Tonyu.globals.$panel.fillStyle=_this.cols[_this.floor(_this.n)];
              //$LASTPOS=96000243;//user.Main:243
              _this.w=_this.rnd(10)+1;
              //$LASTPOS=96000264;//user.Main:264
              Tonyu.globals.$panel.fillRect(_this.x,_this.i*2,_this.w,2);
              //$LASTPOS=96000300;//user.Main:300
              _this.x+=_this.w;
            }
          }
          //$LASTPOS=96000316;//user.Main:316
          _this.update();
        }
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=96000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=96000029;//user.Main:29
      _this.cols=["lime","red","blue","yellow","#f0f"];
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=96000075;//user.Main:75
            //$LASTPOS=96000079;//user.Main:79
            _this.i=0;
          case 1:
            if (!(_this.i<50)) { __pc=4     ; break; }
            //$LASTPOS=96000099;//user.Main:99
            _this.x=0;
            //$LASTPOS=96000108;//user.Main:108
            _this.n=0;
            //$LASTPOS=96000117;//user.Main:117
            //$LASTPOS=96000122;//user.Main:122
            _this.j=0;for (; _this.j<400 ; _this.j++) {
              Tonyu.checkLoop();
              {
                //$LASTPOS=96000147;//user.Main:147
                _this.n+=_this.rnd()*(0.1+_this.i/100);
                //$LASTPOS=96000177;//user.Main:177
                if (_this.n>=5) {
                  break;
                  
                }
                //$LASTPOS=96000202;//user.Main:202
                Tonyu.globals.$panel.fillStyle=_this.cols[_this.floor(_this.n)];
                //$LASTPOS=96000243;//user.Main:243
                _this.w=_this.rnd(10)+1;
                //$LASTPOS=96000264;//user.Main:264
                Tonyu.globals.$panel.fillRect(_this.x,_this.i*2,_this.w,2);
                //$LASTPOS=96000300;//user.Main:300
                _this.x+=_this.w;
              }
            }
            //$LASTPOS=96000316;//user.Main:316
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
          case 3     :
            _this.i++;
            __pc=1;break;
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"cols":{},"i":{},"n":{},"j":{},"w":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Summarizer',
  shortName: 'Summarizer',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_Summarizer_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Summarizer_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Summarizer_initialize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=97000030;//user.Summarizer:30
      _this.sum=0;
      //$LASTPOS=97000041;//user.Summarizer:41
      _this.count=0;
    },
    add :function _trc_Summarizer_add(val) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=97000068;//user.Summarizer:68
      if (_this.min==null||val<_this.min) {
        //$LASTPOS=97000094;//user.Summarizer:94
        _this.min=val;
      }
      //$LASTPOS=97000107;//user.Summarizer:107
      if (_this.max==null||val>_this.max) {
        //$LASTPOS=97000133;//user.Summarizer:133
        _this.max=val;
      }
      //$LASTPOS=97000146;//user.Summarizer:146
      _this.sum+=val;
      //$LASTPOS=97000160;//user.Summarizer:160
      _this.count++;
    },
    fiber$add :function _trc_Summarizer_f_add(_thread,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=97000068;//user.Summarizer:68
      if (_this.min==null||val<_this.min) {
        //$LASTPOS=97000094;//user.Summarizer:94
        _this.min=val;
      }
      //$LASTPOS=97000107;//user.Summarizer:107
      if (_this.max==null||val>_this.max) {
        //$LASTPOS=97000133;//user.Summarizer:133
        _this.max=val;
      }
      //$LASTPOS=97000146;//user.Summarizer:146
      _this.sum+=val;
      //$LASTPOS=97000160;//user.Summarizer:160
      _this.count++;
      
      _thread.retVal=_this;return;
    },
    __getter__average :function _trc_Summarizer___getter__average() {
      "use strict";
      var _this=this;
      
      return _this.sum/_this.count;
    },
    toString :function _trc_Summarizer_toString() {
      "use strict";
      var _this=this;
      
      return _this.average+"("+_this.count+")";
    },
    fiber$toString :function _trc_Summarizer_f_toString(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.average+"("+_this.count+")";return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"__getter__average":{"nowait":true},"toString":{"nowait":false}},"fields":{"sum":{},"count":{},"min":{},"max":{}}}
});

//# sourceMappingURL=concat.js.map