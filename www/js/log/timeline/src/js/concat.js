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
      
      //$LASTPOS=92000156;//user.Blink:156
      _this.zOrder=- 10;
      //$LASTPOS=92000168;//user.Blink:168
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=92000241;//user.Blink:241
        _this.alpha=_this.sin(Tonyu.globals.$frameCount*6)*127+128;
        //$LASTPOS=92000279;//user.Blink:279
        _this.update();
        
      }
    },
    fiber$main :function _trc_Blink_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=92000156;//user.Blink:156
      _this.zOrder=- 10;
      
      _thread.enter(function _trc_Blink_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=92000168;//user.Blink:168
          case 1:
            //$LASTPOS=92000241;//user.Blink:241
            _this.alpha=_this.sin(Tonyu.globals.$frameCount*6)*127+128;
            //$LASTPOS=92000279;//user.Blink:279
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
      
      //$LASTPOS=92000034;//user.Blink:34
      _this.fillRect(param.x,param.y,2,Tonyu.globals.$h);
    },
    fiber$add :function _trc_Blink_f_add(_thread,param) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=92000034;//user.Blink:34
      _this.fillRect(param.x,param.y,2,Tonyu.globals.$h);
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Blink_clear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=92000083;//user.Blink:83
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
            //$LASTPOS=92000083;//user.Blink:83
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
      
      //$LASTPOS=93000089;//user.ClickableText:89
      _this.align="left";
      //$LASTPOS=93000103;//user.ClickableText:103
      _this.update();
      //$LASTPOS=93000113;//user.ClickableText:113
      _this.shape=new Tonyu.classes.kernel.RectShape({x: _this.x+_this.width/2,y: _this.y+_this.height/2,width: _this.width,height: _this.height});
      //$LASTPOS=93000173;//user.ClickableText:173
      _this.ofi=_this.fillStyle;
      //$LASTPOS=93000188;//user.ClickableText:188
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=93000206;//user.ClickableText:206
        if (_this.shape.contains({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
          //$LASTPOS=93000257;//user.ClickableText:257
          _this.fillStyle="#ddd";
          //$LASTPOS=93000283;//user.ClickableText:283
          if (Tonyu.globals.$touches[0].touched) {
            //$LASTPOS=93000322;//user.ClickableText:322
            if (_this.onClick) {
              //$LASTPOS=93000335;//user.ClickableText:335
              _this.onClick(_this);
            }
            
          }
          
        } else {
          //$LASTPOS=93000381;//user.ClickableText:381
          _this.fillStyle=_this.ofi;
          
        }
        //$LASTPOS=93000406;//user.ClickableText:406
        _this.update();
        
      }
    },
    fiber$main :function _trc_ClickableText_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=93000089;//user.ClickableText:89
      _this.align="left";
      
      _thread.enter(function _trc_ClickableText_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=93000103;//user.ClickableText:103
            _this.fiber$update(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=93000113;//user.ClickableText:113
            _this.shape=new Tonyu.classes.kernel.RectShape({x: _this.x+_this.width/2,y: _this.y+_this.height/2,width: _this.width,height: _this.height});
            //$LASTPOS=93000173;//user.ClickableText:173
            _this.ofi=_this.fillStyle;
            //$LASTPOS=93000188;//user.ClickableText:188
          case 2:
            //$LASTPOS=93000206;//user.ClickableText:206
            if (_this.shape.contains({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
              //$LASTPOS=93000257;//user.ClickableText:257
              _this.fillStyle="#ddd";
              //$LASTPOS=93000283;//user.ClickableText:283
              if (Tonyu.globals.$touches[0].touched) {
                //$LASTPOS=93000322;//user.ClickableText:322
                if (_this.onClick) {
                  //$LASTPOS=93000335;//user.ClickableText:335
                  _this.onClick(_this);
                }
                
              }
              
            } else {
              //$LASTPOS=93000381;//user.ClickableText:381
              _this.fillStyle=_this.ofi;
              
            }
            //$LASTPOS=93000406;//user.ClickableText:406
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
      var _it_858;
      var _it_859;
      var _it_860;
      
      //$LASTPOS=94000178;//user.FNlog:178
      _this.paramstr = location.href.replace(/^.*\?/,"").replace(/#.*$/,"");
      
      //$LASTPOS=94000245;//user.FNlog:245
      _this.params = Tonyu.globals.$params||{};
      
      //$LASTPOS=94000269;//user.FNlog:269
      _it_858=Tonyu.iterator(_this.paramstr.split("&"),1);
      while(_it_858.next()) {
        _this.k=_it_858[0];
        
        //$LASTPOS=94000310;//user.FNlog:310
        _this.vals = _this.k.split("=");
        
        //$LASTPOS=94000337;//user.FNlog:337
        if (_this.vals.length==2) {
          //$LASTPOS=94000357;//user.FNlog:357
          _this.params[_this.vals[0]]=_this.vals[1];
        }
        
      }
      //$LASTPOS=94000425;//user.FNlog:425
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=94000467;//user.FNlog:467
      _this.cnt=0;
      //$LASTPOS=94000474;//user.FNlog:474
      _this.day=_this.params.day||"2018-06-08";
      //$LASTPOS=94000504;//user.FNlog:504
      _this.ymd=_this.day.split("-");
      //$LASTPOS=94000524;//user.FNlog:524
      _this.day=new Date();
      //$LASTPOS=94000540;//user.FNlog:540
      _this.day.setDate(_this.ymd[2]-0);
      //$LASTPOS=94000563;//user.FNlog:563
      _this.day.setYear(_this.ymd[0]-0);
      //$LASTPOS=94000586;//user.FNlog:586
      _this.day.setMonth(_this.ymd[1]-1);
      //$LASTPOS=94000610;//user.FNlog:610
      _this.classid=_this.params.classid;
      //$LASTPOS=94000634;//user.FNlog:634
      _this.timezone=(_this.params.timezone||9)-0;
      //$LASTPOS=94000721;//user.FNlog:721
      _this.day=_this.day.getTime();
      //$LASTPOS=94000740;//user.FNlog:740
      _this.day=_this.floor(_this.day/1000);
      //$LASTPOS=94000761;//user.FNlog:761
      _this.day=_this.floor(_this.day/86400)*86400-_this.timezone*3600;
      //$LASTPOS=94000803;//user.FNlog:803
      _this.btime = _this.day;
      
      //$LASTPOS=94000831;//user.FNlog:831
      _this.duration = 86400;
      
      //$LASTPOS=94000851;//user.FNlog:851
      _this.etime = _this.btime+_this.duration;
      
      //$LASTPOS=94000877;//user.FNlog:877
      _this.print(_this.btime);
      //$LASTPOS=94000891;//user.FNlog:891
      _this.timelines = [];
      _this.filerank = {};
      _this.topfile = {};
      
      //$LASTPOS=94000932;//user.FNlog:932
      _this.url=location.href.replace(/\/js\/.*/,"/");
      //$LASTPOS=94001066;//user.FNlog:1066
      Tonyu.globals.$testmode=(location.protocol==="chrome-extension:");
      //$LASTPOS=94001119;//user.FNlog:1119
      if (Tonyu.globals.$testmode) {
        //$LASTPOS=94001140;//user.FNlog:1140
        _this.files=_this.file("fnlog.txt").text();
        //$LASTPOS=94001176;//user.FNlog:1176
        _this.marks=_this.file("mark.json").obj();
        
      } else {
        //$LASTPOS=94001220;//user.FNlog:1220
        _this.files=_this.waitFor($.get(_this.url+"a.php?TeacherLog/getFileNames",{day: _this.btime,classid: _this.classid}));
        //$LASTPOS=94001303;//user.FNlog:1303
        _this.marks=_this.waitFor($.get(_this.url+"a.php?Assignment/matrix",{start: _this.btime,end: _this.etime,output: "json"}));
        
      }
      //$LASTPOS=94001523;//user.FNlog:1523
      _it_859=Tonyu.iterator(_this.files.split("\n"),2);
      while(_it_859.next()) {
        _this.cnt=_it_859[0];
        _this.line=_it_859[1];
        
        //$LASTPOS=94001594;//user.FNlog:1594
        if (_this.cnt==0) {
          continue;
          
        }
        //$LASTPOS=94001620;//user.FNlog:1620
        _this.d = _this.line.split("\t");
        
        //$LASTPOS=94001648;//user.FNlog:1648
        _this.user = _this.d[0];
        _this.filename = _this.d[1];
        _this.time = _this.d[2];
        
        //$LASTPOS=94001702;//user.FNlog:1702
        if (_this.puser!=_this.user) {
          //$LASTPOS=94001729;//user.FNlog:1729
          _this.timeline=[];
          //$LASTPOS=94001750;//user.FNlog:1750
          _this.timeline.user=_this.user;
          //$LASTPOS=94001778;//user.FNlog:1778
          _this.timeline.mark=_this.marks[_this.user];
          //$LASTPOS=94001813;//user.FNlog:1813
          _this.timeline.avg={};
          //$LASTPOS=94001838;//user.FNlog:1838
          _this.timelines.push(_this.timeline);
          //$LASTPOS=94001872;//user.FNlog:1872
          _this.fileappeared={};
          //$LASTPOS=94001897;//user.FNlog:1897
          _this.puser=_this.user;
          
        }
        //$LASTPOS=94001919;//user.FNlog:1919
        if (_this.time<_this.etime) {
          //$LASTPOS=94001945;//user.FNlog:1945
          _this.timeline.end=_this.time;
          //$LASTPOS=94001972;//user.FNlog:1972
          if (! _this.fileappeared[_this.filename]) {
            //$LASTPOS=94002015;//user.FNlog:2015
            _this.fileappeared[_this.filename]=1;
            //$LASTPOS=94002053;//user.FNlog:2053
            _this.filerank[_this.filename]=(_this.filerank[_this.filename]||0)+1;
            
          }
          //$LASTPOS=94002117;//user.FNlog:2117
          _this.timeline.push({filename: _this.filename,time: _this.time});
          //$LASTPOS=94002159;//user.FNlog:2159
          _this.timeline.avg[_this.filename]=_this.timeline.avg[_this.filename]||new Tonyu.classes.user.Summarizer;
          //$LASTPOS=94002230;//user.FNlog:2230
          _this.timeline.avg[_this.filename].add(_this.time-_this.btime);
          
        }
        
      }
      //$LASTPOS=94002278;//user.FNlog:2278
      _this.fileranka=[];
      //$LASTPOS=94002292;//user.FNlog:2292
      _it_860=Tonyu.iterator(_this.filerank,2);
      while(_it_860.next()) {
        _this.filename=_it_860[0];
        _this.count=_it_860[1];
        
        //$LASTPOS=94002335;//user.FNlog:2335
        _this.fileranka.push({filename: _this.filename,count: _this.count});
        
      }
      //$LASTPOS=94002369;//user.FNlog:2369
      _this.fileranka=_this.fileranka.sort((function anonymous_2394(a,b) {
        
        return b.count-a.count;
      }));
      //$LASTPOS=94002434;//user.FNlog:2434
      _this.cols=["#f00","#0f0","#00f","#f0f","#0ff","#ff0","#000","#800","#080","#008","#808","#088","#880"];
      //$LASTPOS=94002533;//user.FNlog:2533
      //$LASTPOS=94002538;//user.FNlog:2538
      _this.i=0;for (; _this.i<_this.min(_this.cols.length,_this.fileranka.length) ; _this.i++) {
        Tonyu.checkLoop();
        //$LASTPOS=94002583;//user.FNlog:2583
        _this.topfile[_this.fileranka[_this.i].filename]=_this.cols[_this.i];
      }
      //$LASTPOS=94002623;//user.FNlog:2623
      _this.timelines=_this.timelines.sort((function anonymous_2648(a,b) {
        
        return a.end-b.end;
      }));
      //$LASTPOS=94002684;//user.FNlog:2684
      new Tonyu.classes.user.Graph({src: _this});
    },
    fiber$main :function _trc_FNlog_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var _it_858;
      var _it_859;
      var _it_860;
      
      //$LASTPOS=94000178;//user.FNlog:178
      _this.paramstr = location.href.replace(/^.*\?/,"").replace(/#.*$/,"");
      
      //$LASTPOS=94000245;//user.FNlog:245
      _this.params = Tonyu.globals.$params||{};
      
      //$LASTPOS=94000269;//user.FNlog:269
      _it_858=Tonyu.iterator(_this.paramstr.split("&"),1);
      while(_it_858.next()) {
        _this.k=_it_858[0];
        
        //$LASTPOS=94000310;//user.FNlog:310
        _this.vals = _this.k.split("=");
        
        //$LASTPOS=94000337;//user.FNlog:337
        if (_this.vals.length==2) {
          //$LASTPOS=94000357;//user.FNlog:357
          _this.params[_this.vals[0]]=_this.vals[1];
        }
        
      }
      //$LASTPOS=94000425;//user.FNlog:425
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=94000467;//user.FNlog:467
      _this.cnt=0;
      //$LASTPOS=94000474;//user.FNlog:474
      _this.day=_this.params.day||"2018-06-08";
      //$LASTPOS=94000504;//user.FNlog:504
      _this.ymd=_this.day.split("-");
      //$LASTPOS=94000524;//user.FNlog:524
      _this.day=new Date();
      //$LASTPOS=94000540;//user.FNlog:540
      _this.day.setDate(_this.ymd[2]-0);
      //$LASTPOS=94000563;//user.FNlog:563
      _this.day.setYear(_this.ymd[0]-0);
      //$LASTPOS=94000586;//user.FNlog:586
      _this.day.setMonth(_this.ymd[1]-1);
      //$LASTPOS=94000610;//user.FNlog:610
      _this.classid=_this.params.classid;
      //$LASTPOS=94000634;//user.FNlog:634
      _this.timezone=(_this.params.timezone||9)-0;
      //$LASTPOS=94000721;//user.FNlog:721
      _this.day=_this.day.getTime();
      //$LASTPOS=94000740;//user.FNlog:740
      _this.day=_this.floor(_this.day/1000);
      //$LASTPOS=94000761;//user.FNlog:761
      _this.day=_this.floor(_this.day/86400)*86400-_this.timezone*3600;
      //$LASTPOS=94000803;//user.FNlog:803
      _this.btime = _this.day;
      
      //$LASTPOS=94000831;//user.FNlog:831
      _this.duration = 86400;
      
      //$LASTPOS=94000851;//user.FNlog:851
      _this.etime = _this.btime+_this.duration;
      
      //$LASTPOS=94000877;//user.FNlog:877
      _this.print(_this.btime);
      //$LASTPOS=94000891;//user.FNlog:891
      _this.timelines = [];
      _this.filerank = {};
      _this.topfile = {};
      
      //$LASTPOS=94000932;//user.FNlog:932
      _this.url=location.href.replace(/\/js\/.*/,"/");
      //$LASTPOS=94001066;//user.FNlog:1066
      Tonyu.globals.$testmode=(location.protocol==="chrome-extension:");
      
      _thread.enter(function _trc_FNlog_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=94001119;//user.FNlog:1119
            if (!(Tonyu.globals.$testmode)) { __pc=1     ; break; }
            {
              //$LASTPOS=94001140;//user.FNlog:1140
              _this.files=_this.file("fnlog.txt").text();
              //$LASTPOS=94001176;//user.FNlog:1176
              _this.marks=_this.file("mark.json").obj();
            }
            __pc=4     ;break;
          case 1     :
            //$LASTPOS=94001220;//user.FNlog:1220
            _this.fiber$waitFor(_thread, $.get(_this.url+"a.php?TeacherLog/getFileNames",{day: _this.btime,classid: _this.classid}));
            __pc=2;return;
          case 2:
            _this.files=_thread.retVal;
            
            //$LASTPOS=94001303;//user.FNlog:1303
            _this.fiber$waitFor(_thread, $.get(_this.url+"a.php?Assignment/matrix",{start: _this.btime,end: _this.etime,output: "json"}));
            __pc=3;return;
          case 3:
            _this.marks=_thread.retVal;
            
          case 4     :
            
            //$LASTPOS=94001523;//user.FNlog:1523
            _it_859=Tonyu.iterator(_this.files.split("\n"),2);
            while(_it_859.next()) {
              _this.cnt=_it_859[0];
              _this.line=_it_859[1];
              
              //$LASTPOS=94001594;//user.FNlog:1594
              if (_this.cnt==0) {
                continue;
                
              }
              //$LASTPOS=94001620;//user.FNlog:1620
              _this.d = _this.line.split("\t");
              
              //$LASTPOS=94001648;//user.FNlog:1648
              _this.user = _this.d[0];
              _this.filename = _this.d[1];
              _this.time = _this.d[2];
              
              //$LASTPOS=94001702;//user.FNlog:1702
              if (_this.puser!=_this.user) {
                //$LASTPOS=94001729;//user.FNlog:1729
                _this.timeline=[];
                //$LASTPOS=94001750;//user.FNlog:1750
                _this.timeline.user=_this.user;
                //$LASTPOS=94001778;//user.FNlog:1778
                _this.timeline.mark=_this.marks[_this.user];
                //$LASTPOS=94001813;//user.FNlog:1813
                _this.timeline.avg={};
                //$LASTPOS=94001838;//user.FNlog:1838
                _this.timelines.push(_this.timeline);
                //$LASTPOS=94001872;//user.FNlog:1872
                _this.fileappeared={};
                //$LASTPOS=94001897;//user.FNlog:1897
                _this.puser=_this.user;
                
              }
              //$LASTPOS=94001919;//user.FNlog:1919
              if (_this.time<_this.etime) {
                //$LASTPOS=94001945;//user.FNlog:1945
                _this.timeline.end=_this.time;
                //$LASTPOS=94001972;//user.FNlog:1972
                if (! _this.fileappeared[_this.filename]) {
                  //$LASTPOS=94002015;//user.FNlog:2015
                  _this.fileappeared[_this.filename]=1;
                  //$LASTPOS=94002053;//user.FNlog:2053
                  _this.filerank[_this.filename]=(_this.filerank[_this.filename]||0)+1;
                  
                }
                //$LASTPOS=94002117;//user.FNlog:2117
                _this.timeline.push({filename: _this.filename,time: _this.time});
                //$LASTPOS=94002159;//user.FNlog:2159
                _this.timeline.avg[_this.filename]=_this.timeline.avg[_this.filename]||new Tonyu.classes.user.Summarizer;
                //$LASTPOS=94002230;//user.FNlog:2230
                _this.timeline.avg[_this.filename].add(_this.time-_this.btime);
                
              }
              
            }
            //$LASTPOS=94002278;//user.FNlog:2278
            _this.fileranka=[];
            //$LASTPOS=94002292;//user.FNlog:2292
            _it_860=Tonyu.iterator(_this.filerank,2);
            while(_it_860.next()) {
              _this.filename=_it_860[0];
              _this.count=_it_860[1];
              
              //$LASTPOS=94002335;//user.FNlog:2335
              _this.fileranka.push({filename: _this.filename,count: _this.count});
              
            }
            //$LASTPOS=94002369;//user.FNlog:2369
            _this.fileranka=_this.fileranka.sort((function anonymous_2394(a,b) {
              
              return b.count-a.count;
            }));
            //$LASTPOS=94002434;//user.FNlog:2434
            _this.cols=["#f00","#0f0","#00f","#f0f","#0ff","#ff0","#000","#800","#080","#008","#808","#088","#880"];
            //$LASTPOS=94002533;//user.FNlog:2533
            //$LASTPOS=94002538;//user.FNlog:2538
            _this.i=0;for (; _this.i<_this.min(_this.cols.length,_this.fileranka.length) ; _this.i++) {
              Tonyu.checkLoop();
              //$LASTPOS=94002583;//user.FNlog:2583
              _this.topfile[_this.fileranka[_this.i].filename]=_this.cols[_this.i];
            }
            //$LASTPOS=94002623;//user.FNlog:2623
            _this.timelines=_this.timelines.sort((function anonymous_2648(a,b) {
              
              return a.end-b.end;
            }));
            //$LASTPOS=94002684;//user.FNlog:2684
            new Tonyu.classes.user.Graph({src: _this});
            _thread.exit(_this);return;
          }
        }
      });
    },
    sortByFile :function _trc_FNlog_sortByFile(filename) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=94002733;//user.FNlog:2733
      _this.timelines=_this.timelines.sort((function anonymous_2758(a,b) {
        var ava;
        var avb;
        
        //$LASTPOS=94002775;//user.FNlog:2775
        ava = a.avg[filename];
        
        //$LASTPOS=94002808;//user.FNlog:2808
        avb = b.avg[filename];
        
        //$LASTPOS=94002841;//user.FNlog:2841
        ava=(ava?ava.average:0);
        //$LASTPOS=94002876;//user.FNlog:2876
        avb=(avb?avb.average:0);
        return ava-avb;
      }));
    },
    fiber$sortByFile :function _trc_FNlog_f_sortByFile(_thread,filename) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=94002733;//user.FNlog:2733
      _this.timelines=_this.timelines.sort((function anonymous_2758(a,b) {
        var ava;
        var avb;
        
        //$LASTPOS=94002775;//user.FNlog:2775
        ava = a.avg[filename];
        
        //$LASTPOS=94002808;//user.FNlog:2808
        avb = b.avg[filename];
        
        //$LASTPOS=94002841;//user.FNlog:2841
        ava=(ava?ava.average:0);
        //$LASTPOS=94002876;//user.FNlog:2876
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
      
      //$LASTPOS=95000000;//user.Graph:0
      "field strict";
      
      //$LASTPOS=95000031;//user.Graph:31
      _this.colors = {};
      
      //$LASTPOS=95000046;//user.Graph:46
      Tonyu.globals.$h=5;
      //$LASTPOS=95000053;//user.Graph:53
      _this.hslc = 0;
      
      
      //$LASTPOS=95000109;//user.Graph:109
      _this.setRange();
      
      //$LASTPOS=95000199;//user.Graph:199
      Tonyu.globals.$blink=new Tonyu.classes.user.Blink;
      //$LASTPOS=95000217;//user.Graph:217
      new Tonyu.classes.user.Indicator({graph: _this,timelines: _this.src.timelines,layer: Tonyu.globals.$frontLayer});
      //$LASTPOS=95000287;//user.Graph:287
      _this.drawLines();
      //$LASTPOS=95000300;//user.Graph:300
      _this.drawLegends();
      //$LASTPOS=95000315;//user.Graph:315
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=95000333;//user.Graph:333
        if (_this.getkey("I")==1) {
          //$LASTPOS=95000363;//user.Graph:363
          _this.zoomIn(Tonyu.globals.$mouseX);
          //$LASTPOS=95000388;//user.Graph:388
          _this.drawLines();
          
        }
        //$LASTPOS=95000411;//user.Graph:411
        if (_this.getkey("O")==1) {
          //$LASTPOS=95000441;//user.Graph:441
          _this.zoomOut(Tonyu.globals.$mouseX);
          //$LASTPOS=95000467;//user.Graph:467
          _this.drawLines();
          
        }
        //$LASTPOS=95000490;//user.Graph:490
        if (_this.getkey("mouseleft")==1) {
          //$LASTPOS=95000528;//user.Graph:528
          _this.t = _this.y2timeline(Tonyu.globals.$mouseY);
          
          //$LASTPOS=95000563;//user.Graph:563
          if (_this.t) {
            //$LASTPOS=95000585;//user.Graph:585
            _this.url = "https://bitarrow.eplang.jp/bitarrowbeta/a.php?TeacherLog/view1&user="+_this.t.user+"&day="+_this.floor(_this.btime);
            
            //$LASTPOS=95000735;//user.Graph:735
            Tonyu.globals.$WebPage.openNewWindow(_this.url);
            
          }
          
        }
        //$LASTPOS=95000784;//user.Graph:784
        if (_this.reqRedraw) {
          //$LASTPOS=95000799;//user.Graph:799
          _this.drawLines();
        }
        //$LASTPOS=95000816;//user.Graph:816
        _this.update();
        
      }
      //$LASTPOS=95000828;//user.Graph:828
      _this.p=- 1;
    },
    fiber$main :function _trc_Graph_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=95000000;//user.Graph:0
      "field strict";
      
      //$LASTPOS=95000031;//user.Graph:31
      _this.colors = {};
      
      //$LASTPOS=95000046;//user.Graph:46
      Tonyu.globals.$h=5;
      //$LASTPOS=95000053;//user.Graph:53
      _this.hslc = 0;
      
      
      
      _thread.enter(function _trc_Graph_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=95000109;//user.Graph:109
            _this.fiber$setRange(_thread);
            __pc=1;return;
          case 1:
            
            
            //$LASTPOS=95000199;//user.Graph:199
            Tonyu.globals.$blink=new Tonyu.classes.user.Blink;
            //$LASTPOS=95000217;//user.Graph:217
            new Tonyu.classes.user.Indicator({graph: _this,timelines: _this.src.timelines,layer: Tonyu.globals.$frontLayer});
            //$LASTPOS=95000287;//user.Graph:287
            _this.fiber$drawLines(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=95000300;//user.Graph:300
            _this.fiber$drawLegends(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=95000315;//user.Graph:315
          case 4:
            //$LASTPOS=95000333;//user.Graph:333
            if (!(_this.getkey("I")==1)) { __pc=7     ; break; }
            //$LASTPOS=95000363;//user.Graph:363
            _this.fiber$zoomIn(_thread, Tonyu.globals.$mouseX);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=95000388;//user.Graph:388
            _this.fiber$drawLines(_thread);
            __pc=6;return;
          case 6:
            
          case 7     :
            
            //$LASTPOS=95000411;//user.Graph:411
            if (!(_this.getkey("O")==1)) { __pc=10    ; break; }
            //$LASTPOS=95000441;//user.Graph:441
            _this.fiber$zoomOut(_thread, Tonyu.globals.$mouseX);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=95000467;//user.Graph:467
            _this.fiber$drawLines(_thread);
            __pc=9;return;
          case 9:
            
          case 10    :
            
            //$LASTPOS=95000490;//user.Graph:490
            if (!(_this.getkey("mouseleft")==1)) { __pc=12    ; break; }
            //$LASTPOS=95000528;//user.Graph:528
            _this.fiber$y2timeline(_thread, Tonyu.globals.$mouseY);
            __pc=11;return;
          case 11:
            _this.t=_thread.retVal;
            
            //$LASTPOS=95000563;//user.Graph:563
            if (_this.t) {
              //$LASTPOS=95000585;//user.Graph:585
              _this.url = "https://bitarrow.eplang.jp/bitarrowbeta/a.php?TeacherLog/view1&user="+_this.t.user+"&day="+_this.floor(_this.btime);
              
              //$LASTPOS=95000735;//user.Graph:735
              Tonyu.globals.$WebPage.openNewWindow(_this.url);
              
            }
          case 12    :
            
            //$LASTPOS=95000784;//user.Graph:784
            if (!(_this.reqRedraw)) { __pc=14    ; break; }
            //$LASTPOS=95000799;//user.Graph:799
            _this.fiber$drawLines(_thread);
            __pc=13;return;
          case 13:
            
          case 14    :
            
            //$LASTPOS=95000816;//user.Graph:816
            _this.fiber$update(_thread);
            __pc=15;return;
          case 15:
            
            __pc=4;break;
          case 16    :
            
            //$LASTPOS=95000828;//user.Graph:828
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
      
      //$LASTPOS=95000856;//user.Graph:856
      i = _this.floor(yy/Tonyu.globals.$h);
      
      //$LASTPOS=95000880;//user.Graph:880
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
      
      //$LASTPOS=95000856;//user.Graph:856
      i = _this.floor(yy/Tonyu.globals.$h);
      
      //$LASTPOS=95000880;//user.Graph:880
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
      var _it_832;
      var e;
      var _it_833;
      var filename;
      var time;
      var mark;
      var k;
      var m;
      var _it_834;
      
      //$LASTPOS=95000939;//user.Graph:939
      Tonyu.globals.$blink.clear();
      //$LASTPOS=95000995;//user.Graph:995
      if (_this.linesYMax) {
        //$LASTPOS=95001020;//user.Graph:1020
        Tonyu.globals.$panel.fillStyle="white";
        //$LASTPOS=95001054;//user.Graph:1054
        Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,_this.linesYMax);
        
      }
      //$LASTPOS=95001109;//user.Graph:1109
      cnt = 0;
      
      
      //$LASTPOS=95001136;//user.Graph:1136
      _this.y=0;
      //$LASTPOS=95001145;//user.Graph:1145
      _it_832=Tonyu.iterator(_this.src.timelines,1);
      while(_it_832.next()) {
        timeline=_it_832[0];
        
        //$LASTPOS=95001191;//user.Graph:1191
        _it_833=Tonyu.iterator(timeline,1);
        while(_it_833.next()) {
          e=_it_833[0];
          
          //$LASTPOS=95001229;//user.Graph:1229
          filename = e.filename;
          time = e.time;
          
          //$LASTPOS=95001279;//user.Graph:1279
          _this.x=_this.time2x(time);
          //$LASTPOS=95001307;//user.Graph:1307
          if (px) {
            //$LASTPOS=95001333;//user.Graph:1333
            Tonyu.globals.$panel.fillRect(px,_this.y,_this.clamp((_this.x-px),1,10),Tonyu.globals.$h);
            
          }
          //$LASTPOS=95001406;//user.Graph:1406
          px=_this.x;
          //$LASTPOS=95001424;//user.Graph:1424
          Tonyu.globals.$panel.fillStyle=_this.getColor(filename);
          //$LASTPOS=95001473;//user.Graph:1473
          cnt++;
          //$LASTPOS=95001492;//user.Graph:1492
          if (cnt%1000==0) {
            //$LASTPOS=95001509;//user.Graph:1509
            _this.update();
          }
          
        }
        //$LASTPOS=95001537;//user.Graph:1537
        mark = timeline.mark;
        
        //$LASTPOS=95001569;//user.Graph:1569
        if (mark) {
          //$LASTPOS=95001593;//user.Graph:1593
          _it_834=Tonyu.iterator(mark,2);
          while(_it_834.next()) {
            k=_it_834[0];
            m=_it_834[1];
            
            //$LASTPOS=95001633;//user.Graph:1633
            if (m.result==="OK") {
              //$LASTPOS=95001790;//user.Graph:1790
              Tonyu.globals.$blink.add({mark: mark,x: _this.time2x(m.time),y: _this.y});
              
            }
            
          }
          
        }
        //$LASTPOS=95001877;//user.Graph:1877
        _this.y+=Tonyu.globals.$h;
        
      }
      //$LASTPOS=95001894;//user.Graph:1894
      _this.reqRedraw=0;
      //$LASTPOS=95001955;//user.Graph:1955
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
      var _it_832;
      var e;
      var _it_833;
      var filename;
      var time;
      var mark;
      var k;
      var m;
      var _it_834;
      
      //$LASTPOS=95000939;//user.Graph:939
      Tonyu.globals.$blink.clear();
      //$LASTPOS=95000995;//user.Graph:995
      if (_this.linesYMax) {
        //$LASTPOS=95001020;//user.Graph:1020
        Tonyu.globals.$panel.fillStyle="white";
        //$LASTPOS=95001054;//user.Graph:1054
        Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,_this.linesYMax);
        
      }
      //$LASTPOS=95001109;//user.Graph:1109
      cnt = 0;
      
      
      //$LASTPOS=95001136;//user.Graph:1136
      _this.y=0;
      
      _thread.enter(function _trc_Graph_ent_drawLines(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=95001145;//user.Graph:1145
            _it_832=Tonyu.iterator(_this.src.timelines,1);
          case 1:
            if (!(_it_832.next())) { __pc=8     ; break; }
            timeline=_it_832[0];
            
            //$LASTPOS=95001191;//user.Graph:1191
            _it_833=Tonyu.iterator(timeline,1);
          case 2:
            if (!(_it_833.next())) { __pc=7     ; break; }
            e=_it_833[0];
            
            //$LASTPOS=95001229;//user.Graph:1229
            filename = e.filename;
            time = e.time;
            
            //$LASTPOS=95001279;//user.Graph:1279
            _this.fiber$time2x(_thread, time);
            __pc=3;return;
          case 3:
            _this.x=_thread.retVal;
            
            //$LASTPOS=95001307;//user.Graph:1307
            if (px) {
              //$LASTPOS=95001333;//user.Graph:1333
              Tonyu.globals.$panel.fillRect(px,_this.y,_this.clamp((_this.x-px),1,10),Tonyu.globals.$h);
              
            }
            //$LASTPOS=95001406;//user.Graph:1406
            px=_this.x;
            //$LASTPOS=95001424;//user.Graph:1424
            _this.fiber$getColor(_thread, filename);
            __pc=4;return;
          case 4:
            Tonyu.globals.$panel.fillStyle=_thread.retVal;
            
            //$LASTPOS=95001473;//user.Graph:1473
            cnt++;
            //$LASTPOS=95001492;//user.Graph:1492
            if (!(cnt%1000==0)) { __pc=6     ; break; }
            //$LASTPOS=95001509;//user.Graph:1509
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
          case 6     :
            
            __pc=2;break;
          case 7     :
            
            //$LASTPOS=95001537;//user.Graph:1537
            mark = timeline.mark;
            
            //$LASTPOS=95001569;//user.Graph:1569
            if (mark) {
              //$LASTPOS=95001593;//user.Graph:1593
              _it_834=Tonyu.iterator(mark,2);
              while(_it_834.next()) {
                k=_it_834[0];
                m=_it_834[1];
                
                //$LASTPOS=95001633;//user.Graph:1633
                if (m.result==="OK") {
                  //$LASTPOS=95001790;//user.Graph:1790
                  Tonyu.globals.$blink.add({mark: mark,x: _this.time2x(m.time),y: _this.y});
                  
                }
                
              }
              
            }
            //$LASTPOS=95001877;//user.Graph:1877
            _this.y+=Tonyu.globals.$h;
            __pc=1;break;
          case 8     :
            
            //$LASTPOS=95001894;//user.Graph:1894
            _this.reqRedraw=0;
            //$LASTPOS=95001955;//user.Graph:1955
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
      
      //$LASTPOS=95001987;//user.Graph:1987
      t = _this.x2time(x);
      
      //$LASTPOS=95002008;//user.Graph:2008
      nd = _this.duration/2;
      
      //$LASTPOS=95002031;//user.Graph:2031
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
            //$LASTPOS=95001987;//user.Graph:1987
            _this.fiber$x2time(_thread, x);
            __pc=1;return;
          case 1:
            t=_thread.retVal;
            
            //$LASTPOS=95002008;//user.Graph:2008
            nd = _this.duration/2;
            
            //$LASTPOS=95002031;//user.Graph:2031
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
      
      //$LASTPOS=95002076;//user.Graph:2076
      t = _this.x2time(x);
      
      //$LASTPOS=95002097;//user.Graph:2097
      nd = _this.duration*2;
      
      //$LASTPOS=95002120;//user.Graph:2120
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
            //$LASTPOS=95002076;//user.Graph:2076
            _this.fiber$x2time(_thread, x);
            __pc=1;return;
          case 1:
            t=_thread.retVal;
            
            //$LASTPOS=95002097;//user.Graph:2097
            nd = _this.duration*2;
            
            //$LASTPOS=95002120;//user.Graph:2120
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
      
      //$LASTPOS=95002168;//user.Graph:2168
      _this.btime=_this.clamp(b||_this.src.btime,_this.src.btime,_this.src.etime);
      //$LASTPOS=95002219;//user.Graph:2219
      _this.etime=_this.clamp(e||_this.src.etime,_this.src.btime,_this.src.etime);
      //$LASTPOS=95002270;//user.Graph:2270
      _this.duration=_this.etime-_this.btime;
    },
    fiber$setRange :function _trc_Graph_f_setRange(_thread,b,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=95002168;//user.Graph:2168
      _this.btime=_this.clamp(b||_this.src.btime,_this.src.btime,_this.src.etime);
      //$LASTPOS=95002219;//user.Graph:2219
      _this.etime=_this.clamp(e||_this.src.etime,_this.src.btime,_this.src.etime);
      //$LASTPOS=95002270;//user.Graph:2270
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
      var _it_851;
      
      //$LASTPOS=95002442;//user.Graph:2442
      sz = 12;
      
      //$LASTPOS=95002457;//user.Graph:2457
      _this.x=10;
      //$LASTPOS=95002462;//user.Graph:2462
      _this.y+=30;
      //$LASTPOS=95002473;//user.Graph:2473
      by = _this.y;
      
      //$LASTPOS=95002487;//user.Graph:2487
      Tonyu.globals.$panel.context.textBaseline="top";
      //$LASTPOS=95002526;//user.Graph:2526
      _it_851=Tonyu.iterator(_this.src.fileranka,2);
      while(_it_851.next()) {
        i=_it_851[0];
        r=_it_851[1];
        
        //$LASTPOS=95002567;//user.Graph:2567
        if (i>=_this.src.cols.length) {
          break;
          
        }
        //$LASTPOS=95002606;//user.Graph:2606
        Tonyu.globals.$panel.fillStyle=_this.getColor(r.filename);
        //$LASTPOS=95002689;//user.Graph:2689
        new Tonyu.classes.user.ClickableText({filename: r.filename,fillStyle: _this.getColor(r.filename),text: r.filename+"("+r.count+")",x: _this.x,y: _this.y,size: sz,onClick: (function anonymous_2862(b) {
          
          //$LASTPOS=95002885;//user.Graph:2885
          _this.src.sortByFile(b.filename);
          //$LASTPOS=95002929;//user.Graph:2929
          _this.curFile=b.filename;
          //$LASTPOS=95002965;//user.Graph:2965
          _this.reqRedraw=1;
        })});
        //$LASTPOS=95003166;//user.Graph:3166
        Tonyu.globals.$panel.fillRect(_this.x-sz,_this.y,sz,sz);
        //$LASTPOS=95003214;//user.Graph:3214
        _this.y+=sz;
        //$LASTPOS=95003229;//user.Graph:3229
        if (_this.y>Tonyu.globals.$screenHeight-sz) {
          //$LASTPOS=95003267;//user.Graph:3267
          _this.y=by;
          //$LASTPOS=95003285;//user.Graph:3285
          _this.x+=100;
          
        }
        
      }
      //$LASTPOS=95003313;//user.Graph:3313
      _this.y+=sz;
      //$LASTPOS=95003324;//user.Graph:3324
      Tonyu.globals.$panel.fillStyle="black";
      //$LASTPOS=95003354;//user.Graph:3354
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
      var _it_851;
      
      //$LASTPOS=95002442;//user.Graph:2442
      sz = 12;
      
      //$LASTPOS=95002457;//user.Graph:2457
      _this.x=10;
      //$LASTPOS=95002462;//user.Graph:2462
      _this.y+=30;
      //$LASTPOS=95002473;//user.Graph:2473
      by = _this.y;
      
      //$LASTPOS=95002487;//user.Graph:2487
      Tonyu.globals.$panel.context.textBaseline="top";
      
      _thread.enter(function _trc_Graph_ent_drawLegends(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=95002526;//user.Graph:2526
            _it_851=Tonyu.iterator(_this.src.fileranka,2);
          case 1:
            if (!(_it_851.next())) { __pc=4     ; break; }
            i=_it_851[0];
            r=_it_851[1];
            
            //$LASTPOS=95002567;//user.Graph:2567
            if (!(i>=_this.src.cols.length)) { __pc=2     ; break; }
            __pc=4     ; break;
            
          case 2     :
            
            //$LASTPOS=95002606;//user.Graph:2606
            _this.fiber$getColor(_thread, r.filename);
            __pc=3;return;
          case 3:
            Tonyu.globals.$panel.fillStyle=_thread.retVal;
            
            //$LASTPOS=95002689;//user.Graph:2689
            new Tonyu.classes.user.ClickableText({filename: r.filename,fillStyle: _this.getColor(r.filename),text: r.filename+"("+r.count+")",x: _this.x,y: _this.y,size: sz,onClick: (function anonymous_2862(b) {
              
              //$LASTPOS=95002885;//user.Graph:2885
              _this.src.sortByFile(b.filename);
              //$LASTPOS=95002929;//user.Graph:2929
              _this.curFile=b.filename;
              //$LASTPOS=95002965;//user.Graph:2965
              _this.reqRedraw=1;
            })});
            //$LASTPOS=95003166;//user.Graph:3166
            Tonyu.globals.$panel.fillRect(_this.x-sz,_this.y,sz,sz);
            //$LASTPOS=95003214;//user.Graph:3214
            _this.y+=sz;
            //$LASTPOS=95003229;//user.Graph:3229
            if (_this.y>Tonyu.globals.$screenHeight-sz) {
              //$LASTPOS=95003267;//user.Graph:3267
              _this.y=by;
              //$LASTPOS=95003285;//user.Graph:3285
              _this.x+=100;
              
            }
            __pc=1;break;
          case 4     :
            
            //$LASTPOS=95003313;//user.Graph:3313
            _this.y+=sz;
            //$LASTPOS=95003324;//user.Graph:3324
            Tonyu.globals.$panel.fillStyle="black";
            //$LASTPOS=95003354;//user.Graph:3354
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
      
      //$LASTPOS=96000000;//user.Indicator:0
      _this.fillStyle="black";
      //$LASTPOS=96000019;//user.Indicator:19
      _this.text="?";
      //$LASTPOS=96000029;//user.Indicator:29
      _this.zOrder=- 10;
      //$LASTPOS=96000041;//user.Indicator:41
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=96000059;//user.Indicator:59
        _this.x=Tonyu.globals.$mouseX;
        //$LASTPOS=96000074;//user.Indicator:74
        _this.yy=Tonyu.globals.$mouseY;
        //$LASTPOS=96000090;//user.Indicator:90
        _this.i=_this.floor(_this.yy/Tonyu.globals.$h);
        //$LASTPOS=96000110;//user.Indicator:110
        _this.t=_this.timelines[_this.i];
        //$LASTPOS=96000130;//user.Indicator:130
        _this.y=_this.yy+50;
        //$LASTPOS=96000143;//user.Indicator:143
        if (_this.t&&_this.t.user) {
          //$LASTPOS=96000170;//user.Indicator:170
          _this.text=_this.t.user;
          
        } else {
          //$LASTPOS=96000194;//user.Indicator:194
          _this.text="";
        }
        //$LASTPOS=96000207;//user.Indicator:207
        _this.ti=_this.graph.x2time(_this.x);
        //$LASTPOS=96000231;//user.Indicator:231
        _this.d = new Date();
        
        //$LASTPOS=96000253;//user.Indicator:253
        _this.d.setTime(_this.ti*1000);
        //$LASTPOS=96000277;//user.Indicator:277
        _this.text+="\n"+[_this.d.getHours(),_this.d.getMinutes()].join(":");
        //$LASTPOS=96000333;//user.Indicator:333
        if (_this.t&&_this.t.avg&&_this.graph.curFile) {
          //$LASTPOS=96000366;//user.Indicator:366
          _this.text+="\n"+_this.t.avg[_this.graph.curFile];
        }
        //$LASTPOS=96000403;//user.Indicator:403
        _this.update();
        
      }
    },
    fiber$main :function _trc_Indicator_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=96000000;//user.Indicator:0
      _this.fillStyle="black";
      //$LASTPOS=96000019;//user.Indicator:19
      _this.text="?";
      //$LASTPOS=96000029;//user.Indicator:29
      _this.zOrder=- 10;
      
      _thread.enter(function _trc_Indicator_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=96000041;//user.Indicator:41
          case 1:
            //$LASTPOS=96000059;//user.Indicator:59
            _this.x=Tonyu.globals.$mouseX;
            //$LASTPOS=96000074;//user.Indicator:74
            _this.yy=Tonyu.globals.$mouseY;
            //$LASTPOS=96000090;//user.Indicator:90
            _this.i=_this.floor(_this.yy/Tonyu.globals.$h);
            //$LASTPOS=96000110;//user.Indicator:110
            _this.t=_this.timelines[_this.i];
            //$LASTPOS=96000130;//user.Indicator:130
            _this.y=_this.yy+50;
            //$LASTPOS=96000143;//user.Indicator:143
            if (_this.t&&_this.t.user) {
              //$LASTPOS=96000170;//user.Indicator:170
              _this.text=_this.t.user;
              
            } else {
              //$LASTPOS=96000194;//user.Indicator:194
              _this.text="";
            }
            //$LASTPOS=96000207;//user.Indicator:207
            _this.ti=_this.graph.x2time(_this.x);
            //$LASTPOS=96000231;//user.Indicator:231
            _this.d = new Date();
            
            //$LASTPOS=96000253;//user.Indicator:253
            _this.d.setTime(_this.ti*1000);
            //$LASTPOS=96000277;//user.Indicator:277
            _this.text+="\n"+[_this.d.getHours(),_this.d.getMinutes()].join(":");
            //$LASTPOS=96000333;//user.Indicator:333
            if (_this.t&&_this.t.avg&&_this.graph.curFile) {
              //$LASTPOS=96000366;//user.Indicator:366
              _this.text+="\n"+_this.t.avg[_this.graph.curFile];
            }
            //$LASTPOS=96000403;//user.Indicator:403
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
      
      //$LASTPOS=97000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=97000029;//user.Main:29
      _this.cols=["lime","red","blue","yellow","#f0f"];
      //$LASTPOS=97000075;//user.Main:75
      //$LASTPOS=97000079;//user.Main:79
      _this.i=0;for (; _this.i<50 ; _this.i++) {
        Tonyu.checkLoop();
        {
          //$LASTPOS=97000099;//user.Main:99
          _this.x=0;
          //$LASTPOS=97000108;//user.Main:108
          _this.n=0;
          //$LASTPOS=97000117;//user.Main:117
          //$LASTPOS=97000122;//user.Main:122
          _this.j=0;for (; _this.j<400 ; _this.j++) {
            Tonyu.checkLoop();
            {
              //$LASTPOS=97000147;//user.Main:147
              _this.n+=_this.rnd()*(0.1+_this.i/100);
              //$LASTPOS=97000177;//user.Main:177
              if (_this.n>=5) {
                break;
                
              }
              //$LASTPOS=97000202;//user.Main:202
              Tonyu.globals.$panel.fillStyle=_this.cols[_this.floor(_this.n)];
              //$LASTPOS=97000243;//user.Main:243
              _this.w=_this.rnd(10)+1;
              //$LASTPOS=97000264;//user.Main:264
              Tonyu.globals.$panel.fillRect(_this.x,_this.i*2,_this.w,2);
              //$LASTPOS=97000300;//user.Main:300
              _this.x+=_this.w;
            }
          }
          //$LASTPOS=97000316;//user.Main:316
          _this.update();
        }
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=97000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=97000029;//user.Main:29
      _this.cols=["lime","red","blue","yellow","#f0f"];
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=97000075;//user.Main:75
            //$LASTPOS=97000079;//user.Main:79
            _this.i=0;
          case 1:
            if (!(_this.i<50)) { __pc=4     ; break; }
            //$LASTPOS=97000099;//user.Main:99
            _this.x=0;
            //$LASTPOS=97000108;//user.Main:108
            _this.n=0;
            //$LASTPOS=97000117;//user.Main:117
            //$LASTPOS=97000122;//user.Main:122
            _this.j=0;for (; _this.j<400 ; _this.j++) {
              Tonyu.checkLoop();
              {
                //$LASTPOS=97000147;//user.Main:147
                _this.n+=_this.rnd()*(0.1+_this.i/100);
                //$LASTPOS=97000177;//user.Main:177
                if (_this.n>=5) {
                  break;
                  
                }
                //$LASTPOS=97000202;//user.Main:202
                Tonyu.globals.$panel.fillStyle=_this.cols[_this.floor(_this.n)];
                //$LASTPOS=97000243;//user.Main:243
                _this.w=_this.rnd(10)+1;
                //$LASTPOS=97000264;//user.Main:264
                Tonyu.globals.$panel.fillRect(_this.x,_this.i*2,_this.w,2);
                //$LASTPOS=97000300;//user.Main:300
                _this.x+=_this.w;
              }
            }
            //$LASTPOS=97000316;//user.Main:316
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
      
      //$LASTPOS=98000030;//user.Summarizer:30
      _this.sum=0;
      //$LASTPOS=98000041;//user.Summarizer:41
      _this.count=0;
    },
    add :function _trc_Summarizer_add(val) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=98000068;//user.Summarizer:68
      if (_this.min==null||val<_this.min) {
        //$LASTPOS=98000094;//user.Summarizer:94
        _this.min=val;
      }
      //$LASTPOS=98000107;//user.Summarizer:107
      if (_this.max==null||val>_this.max) {
        //$LASTPOS=98000133;//user.Summarizer:133
        _this.max=val;
      }
      //$LASTPOS=98000146;//user.Summarizer:146
      _this.sum+=val;
      //$LASTPOS=98000160;//user.Summarizer:160
      _this.count++;
    },
    fiber$add :function _trc_Summarizer_f_add(_thread,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=98000068;//user.Summarizer:68
      if (_this.min==null||val<_this.min) {
        //$LASTPOS=98000094;//user.Summarizer:94
        _this.min=val;
      }
      //$LASTPOS=98000107;//user.Summarizer:107
      if (_this.max==null||val>_this.max) {
        //$LASTPOS=98000133;//user.Summarizer:133
        _this.max=val;
      }
      //$LASTPOS=98000146;//user.Summarizer:146
      _this.sum+=val;
      //$LASTPOS=98000160;//user.Summarizer:160
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