Tonyu.klass.define({
  fullName: 'user.Blink',
  shortName: 'Blink',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Panel,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Blink_main() {
        "use strict";
        var _this=this;
        
        //$LASTPOS=1000156;//user.Blink:156
        _this.zOrder=- 10;
        //$LASTPOS=1000168;//user.Blink:168
        while (true) {
          //$LASTPOS=1000241;//user.Blink:241
          _this.alpha=_this.sin(Tonyu.globals.$frameCount*6)*127+128;
          //$LASTPOS=1000279;//user.Blink:279
          _this.update();
          
        }
      },
      fiber$main :function _trc_Blink_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        //$LASTPOS=1000156;//user.Blink:156
        _this.zOrder=- 10;
        
        _thread.enter(function _trc_Blink_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              //$LASTPOS=1000168;//user.Blink:168
            case 1:
              //$LASTPOS=1000241;//user.Blink:241
              _this.alpha=_this.sin(Tonyu.globals.$frameCount*6)*127+128;
              //$LASTPOS=1000279;//user.Blink:279
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
        
        //$LASTPOS=1000034;//user.Blink:34
        _this.fillRect(param.x,param.y,2,Tonyu.globals.$h);
      },
      fiber$add :function _trc_Blink_f_add(_thread,param) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        //$LASTPOS=1000034;//user.Blink:34
        _this.fillRect(param.x,param.y,2,Tonyu.globals.$h);
        
        _thread.retVal=_this;return;
      },
      clear :function _trc_Blink_clear() {
        "use strict";
        var _this=this;
        
        //$LASTPOS=1000083;//user.Blink:83
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
              //$LASTPOS=1000083;//user.Blink:83
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
    };
  },
  decls: {"methods":{"main":{"nowait":false},"add":{"nowait":false},"clear":{"nowait":false},"__getter__defaultLayer":{"nowait":true}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.ClickableText',
  shortName: 'ClickableText',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_ClickableText_main() {
        "use strict";
        var _this=this;
        
        //$LASTPOS=2000089;//user.ClickableText:89
        _this.align="left";
        //$LASTPOS=2000103;//user.ClickableText:103
        _this.update();
        //$LASTPOS=2000113;//user.ClickableText:113
        _this.shape=new Tonyu.classes.kernel.RectShape({x: _this.x+_this.width/2,y: _this.y+_this.height/2,width: _this.width,height: _this.height});
        //$LASTPOS=2000173;//user.ClickableText:173
        _this.ofi=_this.fillStyle;
        //$LASTPOS=2000188;//user.ClickableText:188
        while (true) {
          //$LASTPOS=2000206;//user.ClickableText:206
          if (_this.shape.contains({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
            //$LASTPOS=2000257;//user.ClickableText:257
            _this.fillStyle="#ddd";
            //$LASTPOS=2000283;//user.ClickableText:283
            if (Tonyu.globals.$touches[0].touched) {
              //$LASTPOS=2000322;//user.ClickableText:322
              if (_this.onClick) {
                //$LASTPOS=2000335;//user.ClickableText:335
                _this.onClick(_this);
              }
              
            }
            
          } else {
            //$LASTPOS=2000381;//user.ClickableText:381
            _this.fillStyle=_this.ofi;
            
          }
          //$LASTPOS=2000406;//user.ClickableText:406
          _this.update();
          
        }
      },
      fiber$main :function _trc_ClickableText_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        //$LASTPOS=2000089;//user.ClickableText:89
        _this.align="left";
        
        _thread.enter(function _trc_ClickableText_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              //$LASTPOS=2000103;//user.ClickableText:103
              _this.fiber$update(_thread);
              __pc=1;return;
            case 1:
              
              //$LASTPOS=2000113;//user.ClickableText:113
              _this.shape=new Tonyu.classes.kernel.RectShape({x: _this.x+_this.width/2,y: _this.y+_this.height/2,width: _this.width,height: _this.height});
              //$LASTPOS=2000173;//user.ClickableText:173
              _this.ofi=_this.fillStyle;
              //$LASTPOS=2000188;//user.ClickableText:188
            case 2:
              //$LASTPOS=2000206;//user.ClickableText:206
              if (_this.shape.contains({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
                //$LASTPOS=2000257;//user.ClickableText:257
                _this.fillStyle="#ddd";
                //$LASTPOS=2000283;//user.ClickableText:283
                if (Tonyu.globals.$touches[0].touched) {
                  //$LASTPOS=2000322;//user.ClickableText:322
                  if (_this.onClick) {
                    //$LASTPOS=2000335;//user.ClickableText:335
                    _this.onClick(_this);
                  }
                  
                }
                
              } else {
                //$LASTPOS=2000381;//user.ClickableText:381
                _this.fillStyle=_this.ofi;
                
              }
              //$LASTPOS=2000406;//user.ClickableText:406
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
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"shape":{},"ofi":{},"onClick":{}}}
});
Tonyu.klass.define({
  fullName: 'user.FNlog',
  shortName: 'FNlog',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_FNlog_main() {
        "use strict";
        var _this=this;
        var _it_126;
        var _it_127;
        var _it_128;
        
        //$LASTPOS=3000178;//user.FNlog:178
        _this.paramstr = location.href.replace(/^.*\?/,"").replace(/#.*$/,"");
        
        //$LASTPOS=3000245;//user.FNlog:245
        _this.params = Tonyu.globals.$params||{};
        
        //$LASTPOS=3000269;//user.FNlog:269
        _it_126=Tonyu.iterator(_this.paramstr.split("&"),1);
        while(_it_126.next()) {
          _this.k=_it_126[0];
          
          //$LASTPOS=3000310;//user.FNlog:310
          _this.vals = _this.k.split("=");
          
          //$LASTPOS=3000337;//user.FNlog:337
          if (_this.vals.length==2) {
            //$LASTPOS=3000357;//user.FNlog:357
            _this.params[_this.vals[0]]=_this.vals[1];
          }
          
        }
        //$LASTPOS=3000425;//user.FNlog:425
        Tonyu.globals.$Screen.setBGColor("white");
        //$LASTPOS=3000467;//user.FNlog:467
        _this.cnt=0;
        //$LASTPOS=3000474;//user.FNlog:474
        _this.day=_this.params.day||"2018-06-08";
        //$LASTPOS=3000504;//user.FNlog:504
        _this.ymd=_this.day.split("-");
        //$LASTPOS=3000524;//user.FNlog:524
        _this.day=new Date();
        //$LASTPOS=3000540;//user.FNlog:540
        _this.day.setDate(_this.ymd[2]-0);
        //$LASTPOS=3000563;//user.FNlog:563
        _this.day.setYear(_this.ymd[0]-0);
        //$LASTPOS=3000586;//user.FNlog:586
        _this.day.setMonth(_this.ymd[1]-1);
        //$LASTPOS=3000610;//user.FNlog:610
        _this.classid=_this.params.classid;
        //$LASTPOS=3000634;//user.FNlog:634
        _this.timezone=(_this.params.timezone||9)-0;
        //$LASTPOS=3000721;//user.FNlog:721
        _this.day=_this.day.getTime();
        //$LASTPOS=3000740;//user.FNlog:740
        _this.day=_this.floor(_this.day/1000);
        //$LASTPOS=3000761;//user.FNlog:761
        _this.day=_this.floor(_this.day/86400)*86400-_this.timezone*3600;
        //$LASTPOS=3000803;//user.FNlog:803
        _this.btime = _this.day;
        
        //$LASTPOS=3000831;//user.FNlog:831
        _this.duration = 86400;
        
        //$LASTPOS=3000851;//user.FNlog:851
        _this.etime = _this.btime+_this.duration;
        
        //$LASTPOS=3000877;//user.FNlog:877
        _this.print(_this.btime);
        //$LASTPOS=3000891;//user.FNlog:891
        _this.timelines = [];
        _this.filerank = {};
        _this.topfile = {};
        
        //$LASTPOS=3000932;//user.FNlog:932
        _this.url=location.href.replace(/\/js\/.*/,"/");
        //$LASTPOS=3001066;//user.FNlog:1066
        Tonyu.globals.$testmode=(location.protocol==="chrome-extension:");
        //$LASTPOS=3001119;//user.FNlog:1119
        if (Tonyu.globals.$testmode) {
          //$LASTPOS=3001140;//user.FNlog:1140
          _this.files=_this.file("fnlog.txt").text();
          //$LASTPOS=3001176;//user.FNlog:1176
          _this.marks=_this.file("mark.json").obj();
          
        } else {
          //$LASTPOS=3001220;//user.FNlog:1220
          _this.files=_this.waitFor($.get(_this.url+"a.php?TeacherLog/getFileNames",{day: _this.btime,classid: _this.classid}));
          //$LASTPOS=3001303;//user.FNlog:1303
          _this.marks=_this.waitFor($.get(_this.url+"a.php?Assignment/matrix",{start: _this.btime,end: _this.etime,output: "json"}));
          
        }
        //$LASTPOS=3001523;//user.FNlog:1523
        _it_127=Tonyu.iterator(_this.files.split("\n"),2);
        while(_it_127.next()) {
          _this.cnt=_it_127[0];
          _this.line=_it_127[1];
          
          //$LASTPOS=3001594;//user.FNlog:1594
          if (_this.cnt==0) {
            continue;
            
          }
          //$LASTPOS=3001620;//user.FNlog:1620
          _this.d = _this.line.split("\t");
          
          //$LASTPOS=3001648;//user.FNlog:1648
          _this.user = _this.d[0];
          _this.filename = _this.d[1];
          _this.time = _this.d[2];
          
          //$LASTPOS=3001702;//user.FNlog:1702
          if (_this.puser!=_this.user) {
            //$LASTPOS=3001729;//user.FNlog:1729
            _this.timeline=[];
            //$LASTPOS=3001750;//user.FNlog:1750
            _this.timeline.user=_this.user;
            //$LASTPOS=3001778;//user.FNlog:1778
            _this.timeline.mark=_this.marks[_this.user];
            //$LASTPOS=3001813;//user.FNlog:1813
            _this.timeline.avg={};
            //$LASTPOS=3001838;//user.FNlog:1838
            _this.timelines.push(_this.timeline);
            //$LASTPOS=3001872;//user.FNlog:1872
            _this.fileappeared={};
            //$LASTPOS=3001897;//user.FNlog:1897
            _this.puser=_this.user;
            
          }
          //$LASTPOS=3001919;//user.FNlog:1919
          if (_this.time<_this.etime) {
            //$LASTPOS=3001945;//user.FNlog:1945
            _this.timeline.end=_this.time;
            //$LASTPOS=3001972;//user.FNlog:1972
            if (! _this.fileappeared[_this.filename]) {
              //$LASTPOS=3002015;//user.FNlog:2015
              _this.fileappeared[_this.filename]=1;
              //$LASTPOS=3002053;//user.FNlog:2053
              _this.filerank[_this.filename]=(_this.filerank[_this.filename]||0)+1;
              
            }
            //$LASTPOS=3002117;//user.FNlog:2117
            _this.timeline.push({filename: _this.filename,time: _this.time});
            //$LASTPOS=3002159;//user.FNlog:2159
            _this.timeline.avg[_this.filename]=_this.timeline.avg[_this.filename]||new Tonyu.classes.user.Summarizer;
            //$LASTPOS=3002230;//user.FNlog:2230
            _this.timeline.avg[_this.filename].add(_this.time-_this.btime);
            
          }
          
        }
        //$LASTPOS=3002278;//user.FNlog:2278
        _this.fileranka=[];
        //$LASTPOS=3002292;//user.FNlog:2292
        _it_128=Tonyu.iterator(_this.filerank,2);
        while(_it_128.next()) {
          _this.filename=_it_128[0];
          _this.count=_it_128[1];
          
          //$LASTPOS=3002335;//user.FNlog:2335
          _this.fileranka.push({filename: _this.filename,count: _this.count});
          
        }
        //$LASTPOS=3002369;//user.FNlog:2369
        _this.fileranka=_this.fileranka.sort((function anonymous_2394(a,b) {
          
          return b.count-a.count;
        }));
        //$LASTPOS=3002434;//user.FNlog:2434
        _this.cols=["#f00","#0f0","#00f","#f0f","#0ff","#ff0","#000","#800","#080","#008","#808","#088","#880"];
        //$LASTPOS=3002533;//user.FNlog:2533
        //$LASTPOS=3002538;//user.FNlog:2538
        _this.i=0;for (; _this.i<_this.min(_this.cols.length,_this.fileranka.length) ; _this.i++) {
          //$LASTPOS=3002583;//user.FNlog:2583
          _this.topfile[_this.fileranka[_this.i].filename]=_this.cols[_this.i];
        }
        //$LASTPOS=3002623;//user.FNlog:2623
        _this.timelines=_this.timelines.sort((function anonymous_2648(a,b) {
          
          return a.end-b.end;
        }));
        //$LASTPOS=3002684;//user.FNlog:2684
        new Tonyu.classes.user.Graph({src: _this});
      },
      fiber$main :function _trc_FNlog_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var _it_126;
        var _it_127;
        var _it_128;
        
        //$LASTPOS=3000178;//user.FNlog:178
        _this.paramstr = location.href.replace(/^.*\?/,"").replace(/#.*$/,"");
        
        //$LASTPOS=3000245;//user.FNlog:245
        _this.params = Tonyu.globals.$params||{};
        
        //$LASTPOS=3000269;//user.FNlog:269
        _it_126=Tonyu.iterator(_this.paramstr.split("&"),1);
        while(_it_126.next()) {
          _this.k=_it_126[0];
          
          //$LASTPOS=3000310;//user.FNlog:310
          _this.vals = _this.k.split("=");
          
          //$LASTPOS=3000337;//user.FNlog:337
          if (_this.vals.length==2) {
            //$LASTPOS=3000357;//user.FNlog:357
            _this.params[_this.vals[0]]=_this.vals[1];
          }
          
        }
        //$LASTPOS=3000425;//user.FNlog:425
        Tonyu.globals.$Screen.setBGColor("white");
        //$LASTPOS=3000467;//user.FNlog:467
        _this.cnt=0;
        //$LASTPOS=3000474;//user.FNlog:474
        _this.day=_this.params.day||"2018-06-08";
        //$LASTPOS=3000504;//user.FNlog:504
        _this.ymd=_this.day.split("-");
        //$LASTPOS=3000524;//user.FNlog:524
        _this.day=new Date();
        //$LASTPOS=3000540;//user.FNlog:540
        _this.day.setDate(_this.ymd[2]-0);
        //$LASTPOS=3000563;//user.FNlog:563
        _this.day.setYear(_this.ymd[0]-0);
        //$LASTPOS=3000586;//user.FNlog:586
        _this.day.setMonth(_this.ymd[1]-1);
        //$LASTPOS=3000610;//user.FNlog:610
        _this.classid=_this.params.classid;
        //$LASTPOS=3000634;//user.FNlog:634
        _this.timezone=(_this.params.timezone||9)-0;
        //$LASTPOS=3000721;//user.FNlog:721
        _this.day=_this.day.getTime();
        //$LASTPOS=3000740;//user.FNlog:740
        _this.day=_this.floor(_this.day/1000);
        //$LASTPOS=3000761;//user.FNlog:761
        _this.day=_this.floor(_this.day/86400)*86400-_this.timezone*3600;
        //$LASTPOS=3000803;//user.FNlog:803
        _this.btime = _this.day;
        
        //$LASTPOS=3000831;//user.FNlog:831
        _this.duration = 86400;
        
        //$LASTPOS=3000851;//user.FNlog:851
        _this.etime = _this.btime+_this.duration;
        
        //$LASTPOS=3000877;//user.FNlog:877
        _this.print(_this.btime);
        //$LASTPOS=3000891;//user.FNlog:891
        _this.timelines = [];
        _this.filerank = {};
        _this.topfile = {};
        
        //$LASTPOS=3000932;//user.FNlog:932
        _this.url=location.href.replace(/\/js\/.*/,"/");
        //$LASTPOS=3001066;//user.FNlog:1066
        Tonyu.globals.$testmode=(location.protocol==="chrome-extension:");
        
        _thread.enter(function _trc_FNlog_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              //$LASTPOS=3001119;//user.FNlog:1119
              if (!(Tonyu.globals.$testmode)) { __pc=1     ; break; }
              {
                //$LASTPOS=3001140;//user.FNlog:1140
                _this.files=_this.file("fnlog.txt").text();
                //$LASTPOS=3001176;//user.FNlog:1176
                _this.marks=_this.file("mark.json").obj();
              }
              __pc=4     ;break;
            case 1     :
              //$LASTPOS=3001220;//user.FNlog:1220
              _this.fiber$waitFor(_thread, $.get(_this.url+"a.php?TeacherLog/getFileNames",{day: _this.btime,classid: _this.classid}));
              __pc=2;return;
            case 2:
              _this.files=_thread.retVal;
              
              //$LASTPOS=3001303;//user.FNlog:1303
              _this.fiber$waitFor(_thread, $.get(_this.url+"a.php?Assignment/matrix",{start: _this.btime,end: _this.etime,output: "json"}));
              __pc=3;return;
            case 3:
              _this.marks=_thread.retVal;
              
            case 4     :
              
              //$LASTPOS=3001523;//user.FNlog:1523
              _it_127=Tonyu.iterator(_this.files.split("\n"),2);
              while(_it_127.next()) {
                _this.cnt=_it_127[0];
                _this.line=_it_127[1];
                
                //$LASTPOS=3001594;//user.FNlog:1594
                if (_this.cnt==0) {
                  continue;
                  
                }
                //$LASTPOS=3001620;//user.FNlog:1620
                _this.d = _this.line.split("\t");
                
                //$LASTPOS=3001648;//user.FNlog:1648
                _this.user = _this.d[0];
                _this.filename = _this.d[1];
                _this.time = _this.d[2];
                
                //$LASTPOS=3001702;//user.FNlog:1702
                if (_this.puser!=_this.user) {
                  //$LASTPOS=3001729;//user.FNlog:1729
                  _this.timeline=[];
                  //$LASTPOS=3001750;//user.FNlog:1750
                  _this.timeline.user=_this.user;
                  //$LASTPOS=3001778;//user.FNlog:1778
                  _this.timeline.mark=_this.marks[_this.user];
                  //$LASTPOS=3001813;//user.FNlog:1813
                  _this.timeline.avg={};
                  //$LASTPOS=3001838;//user.FNlog:1838
                  _this.timelines.push(_this.timeline);
                  //$LASTPOS=3001872;//user.FNlog:1872
                  _this.fileappeared={};
                  //$LASTPOS=3001897;//user.FNlog:1897
                  _this.puser=_this.user;
                  
                }
                //$LASTPOS=3001919;//user.FNlog:1919
                if (_this.time<_this.etime) {
                  //$LASTPOS=3001945;//user.FNlog:1945
                  _this.timeline.end=_this.time;
                  //$LASTPOS=3001972;//user.FNlog:1972
                  if (! _this.fileappeared[_this.filename]) {
                    //$LASTPOS=3002015;//user.FNlog:2015
                    _this.fileappeared[_this.filename]=1;
                    //$LASTPOS=3002053;//user.FNlog:2053
                    _this.filerank[_this.filename]=(_this.filerank[_this.filename]||0)+1;
                    
                  }
                  //$LASTPOS=3002117;//user.FNlog:2117
                  _this.timeline.push({filename: _this.filename,time: _this.time});
                  //$LASTPOS=3002159;//user.FNlog:2159
                  _this.timeline.avg[_this.filename]=_this.timeline.avg[_this.filename]||new Tonyu.classes.user.Summarizer;
                  //$LASTPOS=3002230;//user.FNlog:2230
                  _this.timeline.avg[_this.filename].add(_this.time-_this.btime);
                  
                }
                
              }
              //$LASTPOS=3002278;//user.FNlog:2278
              _this.fileranka=[];
              //$LASTPOS=3002292;//user.FNlog:2292
              _it_128=Tonyu.iterator(_this.filerank,2);
              while(_it_128.next()) {
                _this.filename=_it_128[0];
                _this.count=_it_128[1];
                
                //$LASTPOS=3002335;//user.FNlog:2335
                _this.fileranka.push({filename: _this.filename,count: _this.count});
                
              }
              //$LASTPOS=3002369;//user.FNlog:2369
              _this.fileranka=_this.fileranka.sort((function anonymous_2394(a,b) {
                
                return b.count-a.count;
              }));
              //$LASTPOS=3002434;//user.FNlog:2434
              _this.cols=["#f00","#0f0","#00f","#f0f","#0ff","#ff0","#000","#800","#080","#008","#808","#088","#880"];
              //$LASTPOS=3002533;//user.FNlog:2533
              //$LASTPOS=3002538;//user.FNlog:2538
              _this.i=0;for (; _this.i<_this.min(_this.cols.length,_this.fileranka.length) ; _this.i++) {
                //$LASTPOS=3002583;//user.FNlog:2583
                _this.topfile[_this.fileranka[_this.i].filename]=_this.cols[_this.i];
              }
              //$LASTPOS=3002623;//user.FNlog:2623
              _this.timelines=_this.timelines.sort((function anonymous_2648(a,b) {
                
                return a.end-b.end;
              }));
              //$LASTPOS=3002684;//user.FNlog:2684
              new Tonyu.classes.user.Graph({src: _this});
              _thread.exit(_this);return;
            }
          }
        });
      },
      sortByFile :function _trc_FNlog_sortByFile(filename) {
        "use strict";
        var _this=this;
        
        //$LASTPOS=3002733;//user.FNlog:2733
        _this.timelines=_this.timelines.sort((function anonymous_2758(a,b) {
          var ava;
          var avb;
          
          //$LASTPOS=3002775;//user.FNlog:2775
          ava = a.avg[filename];
          
          //$LASTPOS=3002808;//user.FNlog:2808
          avb = b.avg[filename];
          
          //$LASTPOS=3002841;//user.FNlog:2841
          ava=(ava?ava.average:0);
          //$LASTPOS=3002876;//user.FNlog:2876
          avb=(avb?avb.average:0);
          return ava-avb;
        }));
      },
      fiber$sortByFile :function _trc_FNlog_f_sortByFile(_thread,filename) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        //$LASTPOS=3002733;//user.FNlog:2733
        _this.timelines=_this.timelines.sort((function anonymous_2758(a,b) {
          var ava;
          var avb;
          
          //$LASTPOS=3002775;//user.FNlog:2775
          ava = a.avg[filename];
          
          //$LASTPOS=3002808;//user.FNlog:2808
          avb = b.avg[filename];
          
          //$LASTPOS=3002841;//user.FNlog:2841
          ava=(ava?ava.average:0);
          //$LASTPOS=3002876;//user.FNlog:2876
          avb=(avb?avb.average:0);
          return ava-avb;
        }));
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"sortByFile":{"nowait":false}},"fields":{"paramstr":{},"params":{},"k":{},"vals":{},"btime":{},"duration":{},"etime":{},"timelines":{},"filerank":{},"topfile":{},"d":{},"user":{},"filename":{},"time":{},"count":{},"cnt":{},"day":{},"ymd":{},"classid":{},"timezone":{},"url":{},"files":{},"marks":{},"line":{},"puser":{},"timeline":{},"fileappeared":{},"fileranka":{},"cols":{},"i":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Graph',
  shortName: 'Graph',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Graph_main() {
        "use strict";
        var _this=this;
        
        //$LASTPOS=4000026;//user.Graph:26
        $.getScript("https://bitarrow.eplang.jp/bitarrow/js/lib/jquery-ui.js");
        //$LASTPOS=4000098;//user.Graph:98
        "field strict";
        
        //$LASTPOS=4000129;//user.Graph:129
        _this.colors = {};
        
        //$LASTPOS=4000144;//user.Graph:144
        Tonyu.globals.$h=5;
        //$LASTPOS=4000151;//user.Graph:151
        _this.hslc = 0;
        
        
        //$LASTPOS=4000207;//user.Graph:207
        _this.setRange();
        
        //$LASTPOS=4000297;//user.Graph:297
        Tonyu.globals.$blink=new Tonyu.classes.user.Blink;
        //$LASTPOS=4000315;//user.Graph:315
        new Tonyu.classes.user.Indicator({graph: _this,timelines: _this.src.timelines,layer: Tonyu.globals.$frontLayer});
        //$LASTPOS=4000385;//user.Graph:385
        _this.drawLines();
        //$LASTPOS=4000398;//user.Graph:398
        _this.drawLegends();
        //$LASTPOS=4000413;//user.Graph:413
        while (true) {
          //$LASTPOS=4000431;//user.Graph:431
          if (_this.getkey("I")==1) {
            //$LASTPOS=4000461;//user.Graph:461
            _this.zoomIn(Tonyu.globals.$mouseX);
            //$LASTPOS=4000486;//user.Graph:486
            _this.drawLines();
            
          }
          //$LASTPOS=4000509;//user.Graph:509
          if (_this.getkey("O")==1) {
            //$LASTPOS=4000539;//user.Graph:539
            _this.zoomOut(Tonyu.globals.$mouseX);
            //$LASTPOS=4000565;//user.Graph:565
            _this.drawLines();
            
          }
          //$LASTPOS=4000593;//user.Graph:593
          if (_this.getkey("S")==1) {
            //$LASTPOS=4000623;//user.Graph:623
            _this.summary();
            
          }
          //$LASTPOS=4000647;//user.Graph:647
          if (_this.getkey("mouseleft")==1) {
            //$LASTPOS=4000685;//user.Graph:685
            _this.t = _this.y2timeline(Tonyu.globals.$mouseY);
            
            //$LASTPOS=4000720;//user.Graph:720
            if (_this.t) {
              //$LASTPOS=4000742;//user.Graph:742
              _this.url = "https://bitarrow.eplang.jp/bitarrowbeta/a.php?TeacherLog/view1&user="+_this.t.user+"&day="+_this.floor(_this.btime);
              
              //$LASTPOS=4000892;//user.Graph:892
              Tonyu.globals.$WebPage.openNewWindow(_this.url);
              
            }
            
          }
          //$LASTPOS=4000941;//user.Graph:941
          if (_this.reqRedraw) {
            //$LASTPOS=4000956;//user.Graph:956
            _this.drawLines();
          }
          //$LASTPOS=4000973;//user.Graph:973
          _this.update();
          
        }
        //$LASTPOS=4000985;//user.Graph:985
        _this.p=- 1;
      },
      fiber$main :function _trc_Graph_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        //$LASTPOS=4000026;//user.Graph:26
        $.getScript("https://bitarrow.eplang.jp/bitarrow/js/lib/jquery-ui.js");
        //$LASTPOS=4000098;//user.Graph:98
        "field strict";
        
        //$LASTPOS=4000129;//user.Graph:129
        _this.colors = {};
        
        //$LASTPOS=4000144;//user.Graph:144
        Tonyu.globals.$h=5;
        //$LASTPOS=4000151;//user.Graph:151
        _this.hslc = 0;
        
        
        
        _thread.enter(function _trc_Graph_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              //$LASTPOS=4000207;//user.Graph:207
              _this.fiber$setRange(_thread);
              __pc=1;return;
            case 1:
              
              
              //$LASTPOS=4000297;//user.Graph:297
              Tonyu.globals.$blink=new Tonyu.classes.user.Blink;
              //$LASTPOS=4000315;//user.Graph:315
              new Tonyu.classes.user.Indicator({graph: _this,timelines: _this.src.timelines,layer: Tonyu.globals.$frontLayer});
              //$LASTPOS=4000385;//user.Graph:385
              _this.fiber$drawLines(_thread);
              __pc=2;return;
            case 2:
              
              //$LASTPOS=4000398;//user.Graph:398
              _this.fiber$drawLegends(_thread);
              __pc=3;return;
            case 3:
              
              //$LASTPOS=4000413;//user.Graph:413
            case 4:
              //$LASTPOS=4000431;//user.Graph:431
              if (!(_this.getkey("I")==1)) { __pc=7     ; break; }
              //$LASTPOS=4000461;//user.Graph:461
              _this.fiber$zoomIn(_thread, Tonyu.globals.$mouseX);
              __pc=5;return;
            case 5:
              
              //$LASTPOS=4000486;//user.Graph:486
              _this.fiber$drawLines(_thread);
              __pc=6;return;
            case 6:
              
            case 7     :
              
              //$LASTPOS=4000509;//user.Graph:509
              if (!(_this.getkey("O")==1)) { __pc=10    ; break; }
              //$LASTPOS=4000539;//user.Graph:539
              _this.fiber$zoomOut(_thread, Tonyu.globals.$mouseX);
              __pc=8;return;
            case 8:
              
              //$LASTPOS=4000565;//user.Graph:565
              _this.fiber$drawLines(_thread);
              __pc=9;return;
            case 9:
              
            case 10    :
              
              //$LASTPOS=4000593;//user.Graph:593
              if (!(_this.getkey("S")==1)) { __pc=12    ; break; }
              //$LASTPOS=4000623;//user.Graph:623
              _this.fiber$summary(_thread);
              __pc=11;return;
            case 11:
              
            case 12    :
              
              //$LASTPOS=4000647;//user.Graph:647
              if (!(_this.getkey("mouseleft")==1)) { __pc=14    ; break; }
              //$LASTPOS=4000685;//user.Graph:685
              _this.fiber$y2timeline(_thread, Tonyu.globals.$mouseY);
              __pc=13;return;
            case 13:
              _this.t=_thread.retVal;
              
              //$LASTPOS=4000720;//user.Graph:720
              if (_this.t) {
                //$LASTPOS=4000742;//user.Graph:742
                _this.url = "https://bitarrow.eplang.jp/bitarrowbeta/a.php?TeacherLog/view1&user="+_this.t.user+"&day="+_this.floor(_this.btime);
                
                //$LASTPOS=4000892;//user.Graph:892
                Tonyu.globals.$WebPage.openNewWindow(_this.url);
                
              }
            case 14    :
              
              //$LASTPOS=4000941;//user.Graph:941
              if (!(_this.reqRedraw)) { __pc=16    ; break; }
              //$LASTPOS=4000956;//user.Graph:956
              _this.fiber$drawLines(_thread);
              __pc=15;return;
            case 15:
              
            case 16    :
              
              //$LASTPOS=4000973;//user.Graph:973
              _this.fiber$update(_thread);
              __pc=17;return;
            case 17:
              
              __pc=4;break;
            case 18    :
              
              //$LASTPOS=4000985;//user.Graph:985
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
        
        //$LASTPOS=4001013;//user.Graph:1013
        i = _this.floor(yy/Tonyu.globals.$h);
        
        //$LASTPOS=4001037;//user.Graph:1037
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
        
        //$LASTPOS=4001013;//user.Graph:1013
        i = _this.floor(yy/Tonyu.globals.$h);
        
        //$LASTPOS=4001037;//user.Graph:1037
        t = _this.src.timelines[i];
        
        _thread.retVal=t;return;
        
        
        _thread.retVal=_this;return;
      },
      summary :function _trc_Graph_summary() {
        "use strict";
        var _this=this;
        var d;
        var t;
        var tx;
        var timeline;
        var _it_415;
        var fn;
        var av;
        var _it_416;
        
        //$LASTPOS=4001094;//user.Graph:1094
        d = $("<div>").dialog({width: 800,height: 600});
        
        //$LASTPOS=4001147;//user.Graph:1147
        d.append("ユーザ，ファイル毎の編集回数，編集時刻の平均・最小・最大（単位：この日の0時からの経過秒）");
        //$LASTPOS=4001210;//user.Graph:1210
        t = $("<textarea>").attr({rows: 30,cols: 120}).appendTo(d);
        
        //$LASTPOS=4001272;//user.Graph:1272
        tx = ["user","file","count","t.average","t.min","t.max"].join("\t")+"\n";
        
        //$LASTPOS=4001357;//user.Graph:1357
        _it_415=Tonyu.iterator(_this.src.timelines,1);
        while(_it_415.next()) {
          timeline=_it_415[0];
          
          //$LASTPOS=4001403;//user.Graph:1403
          _it_416=Tonyu.iterator(timeline.avg,2);
          while(_it_416.next()) {
            fn=_it_416[0];
            av=_it_416[1];
            
            //$LASTPOS=4001787;//user.Graph:1787
            tx+=[timeline.user,fn,av.count,av.average,av.min,av.max].join("\t")+"\n";
            
          }
          
        }
        //$LASTPOS=4001964;//user.Graph:1964
        t.val(tx);
      },
      fiber$summary :function _trc_Graph_f_summary(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var d;
        var t;
        var tx;
        var timeline;
        var _it_415;
        var fn;
        var av;
        var _it_416;
        
        //$LASTPOS=4001094;//user.Graph:1094
        d = $("<div>").dialog({width: 800,height: 600});
        
        //$LASTPOS=4001147;//user.Graph:1147
        d.append("ユーザ，ファイル毎の編集回数，編集時刻の平均・最小・最大（単位：この日の0時からの経過秒）");
        //$LASTPOS=4001210;//user.Graph:1210
        t = $("<textarea>").attr({rows: 30,cols: 120}).appendTo(d);
        
        //$LASTPOS=4001272;//user.Graph:1272
        tx = ["user","file","count","t.average","t.min","t.max"].join("\t")+"\n";
        
        //$LASTPOS=4001357;//user.Graph:1357
        _it_415=Tonyu.iterator(_this.src.timelines,1);
        while(_it_415.next()) {
          timeline=_it_415[0];
          
          //$LASTPOS=4001403;//user.Graph:1403
          _it_416=Tonyu.iterator(timeline.avg,2);
          while(_it_416.next()) {
            fn=_it_416[0];
            av=_it_416[1];
            
            //$LASTPOS=4001787;//user.Graph:1787
            tx+=[timeline.user,fn,av.count,av.average,av.min,av.max].join("\t")+"\n";
            
          }
          
        }
        //$LASTPOS=4001964;//user.Graph:1964
        t.val(tx);
        
        _thread.retVal=_this;return;
      },
      drawLines :function _trc_Graph_drawLines() {
        "use strict";
        var _this=this;
        var cnt;
        var px;
        var timeline;
        var _it_425;
        var mark;
        var k;
        var m;
        var _it_426;
        
        //$LASTPOS=4001996;//user.Graph:1996
        Tonyu.globals.$blink.clear();
        //$LASTPOS=4002052;//user.Graph:2052
        if (_this.linesYMax) {
          //$LASTPOS=4002077;//user.Graph:2077
          Tonyu.globals.$panel.fillStyle="white";
          //$LASTPOS=4002111;//user.Graph:2111
          Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,_this.linesYMax);
          
        }
        //$LASTPOS=4002166;//user.Graph:2166
        cnt = 0;
        
        
        //$LASTPOS=4002193;//user.Graph:2193
        _this.y=0;
        //$LASTPOS=4002202;//user.Graph:2202
        _it_425=Tonyu.iterator(_this.src.timelines,1);
        while(_it_425.next()) {
          timeline=_it_425[0];
          
          //$LASTPOS=4002248;//user.Graph:2248
          _this.draw1Line(timeline);
          //$LASTPOS=4002627;//user.Graph:2627
          mark = timeline.mark;
          
          //$LASTPOS=4002659;//user.Graph:2659
          if (mark) {
            //$LASTPOS=4002683;//user.Graph:2683
            _it_426=Tonyu.iterator(mark,2);
            while(_it_426.next()) {
              k=_it_426[0];
              m=_it_426[1];
              
              //$LASTPOS=4002723;//user.Graph:2723
              if (m.result==="OK") {
                //$LASTPOS=4002880;//user.Graph:2880
                Tonyu.globals.$blink.add({mark: mark,x: _this.time2x(m.time),y: _this.y});
                
              }
              
            }
            
          }
          //$LASTPOS=4002967;//user.Graph:2967
          _this.update();
          //$LASTPOS=4002985;//user.Graph:2985
          _this.y+=Tonyu.globals.$h;
          
        }
        //$LASTPOS=4003002;//user.Graph:3002
        _this.reqRedraw=0;
        //$LASTPOS=4003063;//user.Graph:3063
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
        var _it_425;
        var mark;
        var k;
        var m;
        var _it_426;
        
        //$LASTPOS=4001996;//user.Graph:1996
        Tonyu.globals.$blink.clear();
        //$LASTPOS=4002052;//user.Graph:2052
        if (_this.linesYMax) {
          //$LASTPOS=4002077;//user.Graph:2077
          Tonyu.globals.$panel.fillStyle="white";
          //$LASTPOS=4002111;//user.Graph:2111
          Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,_this.linesYMax);
          
        }
        //$LASTPOS=4002166;//user.Graph:2166
        cnt = 0;
        
        
        //$LASTPOS=4002193;//user.Graph:2193
        _this.y=0;
        
        _thread.enter(function _trc_Graph_ent_drawLines(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              //$LASTPOS=4002202;//user.Graph:2202
              _it_425=Tonyu.iterator(_this.src.timelines,1);
            case 1:
              if (!(_it_425.next())) { __pc=3     ; break; }
              timeline=_it_425[0];
              
              //$LASTPOS=4002248;//user.Graph:2248
              _this.draw1Line(timeline);
              //$LASTPOS=4002627;//user.Graph:2627
              mark = timeline.mark;
              
              //$LASTPOS=4002659;//user.Graph:2659
              if (mark) {
                //$LASTPOS=4002683;//user.Graph:2683
                _it_426=Tonyu.iterator(mark,2);
                while(_it_426.next()) {
                  k=_it_426[0];
                  m=_it_426[1];
                  
                  //$LASTPOS=4002723;//user.Graph:2723
                  if (m.result==="OK") {
                    //$LASTPOS=4002880;//user.Graph:2880
                    Tonyu.globals.$blink.add({mark: mark,x: _this.time2x(m.time),y: _this.y});
                    
                  }
                  
                }
                
              }
              //$LASTPOS=4002967;//user.Graph:2967
              _this.fiber$update(_thread);
              __pc=2;return;
            case 2:
              
              //$LASTPOS=4002985;//user.Graph:2985
              _this.y+=Tonyu.globals.$h;
              __pc=1;break;
            case 3     :
              
              //$LASTPOS=4003002;//user.Graph:3002
              _this.reqRedraw=0;
              //$LASTPOS=4003063;//user.Graph:3063
              _this.linesYMax=_this.y;
              _thread.exit(_this);return;
            }
          }
        });
      },
      draw1Line :function _trc_Graph_draw1Line(timeline) {
        "use strict";
        var _this=this;
        var px;
        var e;
        var _it_435;
        var filename;
        var time;
        
        
        //$LASTPOS=4003124;//user.Graph:3124
        _it_435=Tonyu.iterator(timeline,1);
        while(_it_435.next()) {
          e=_it_435[0];
          
          //$LASTPOS=4003158;//user.Graph:3158
          filename = e.filename;
          time = e.time;
          
          //$LASTPOS=4003204;//user.Graph:3204
          _this.x=_this.time2x(time);
          //$LASTPOS=4003228;//user.Graph:3228
          if (px) {
            //$LASTPOS=4003250;//user.Graph:3250
            Tonyu.globals.$panel.fillRect(px,_this.y,_this.clamp((_this.x-px),1,10),Tonyu.globals.$h);
            
          }
          //$LASTPOS=4003315;//user.Graph:3315
          px=_this.x;
          //$LASTPOS=4003329;//user.Graph:3329
          Tonyu.globals.$panel.fillStyle=_this.getColor(filename);
          
        }
      },
      zoomIn :function _trc_Graph_zoomIn(x) {
        "use strict";
        var _this=this;
        var t;
        var nd;
        
        //$LASTPOS=4003450;//user.Graph:3450
        t = _this.x2time(x);
        
        //$LASTPOS=4003471;//user.Graph:3471
        nd = _this.duration/2;
        
        //$LASTPOS=4003494;//user.Graph:3494
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
              //$LASTPOS=4003450;//user.Graph:3450
              _this.fiber$x2time(_thread, x);
              __pc=1;return;
            case 1:
              t=_thread.retVal;
              
              //$LASTPOS=4003471;//user.Graph:3471
              nd = _this.duration/2;
              
              //$LASTPOS=4003494;//user.Graph:3494
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
        
        //$LASTPOS=4003539;//user.Graph:3539
        t = _this.x2time(x);
        
        //$LASTPOS=4003560;//user.Graph:3560
        nd = _this.duration*2;
        
        //$LASTPOS=4003583;//user.Graph:3583
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
              //$LASTPOS=4003539;//user.Graph:3539
              _this.fiber$x2time(_thread, x);
              __pc=1;return;
            case 1:
              t=_thread.retVal;
              
              //$LASTPOS=4003560;//user.Graph:3560
              nd = _this.duration*2;
              
              //$LASTPOS=4003583;//user.Graph:3583
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
        
        //$LASTPOS=4003631;//user.Graph:3631
        _this.btime=_this.clamp(b||_this.src.btime,_this.src.btime,_this.src.etime);
        //$LASTPOS=4003682;//user.Graph:3682
        _this.etime=_this.clamp(e||_this.src.etime,_this.src.btime,_this.src.etime);
        //$LASTPOS=4003733;//user.Graph:3733
        _this.duration=_this.etime-_this.btime;
      },
      fiber$setRange :function _trc_Graph_f_setRange(_thread,b,e) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        //$LASTPOS=4003631;//user.Graph:3631
        _this.btime=_this.clamp(b||_this.src.btime,_this.src.btime,_this.src.etime);
        //$LASTPOS=4003682;//user.Graph:3682
        _this.etime=_this.clamp(e||_this.src.etime,_this.src.btime,_this.src.etime);
        //$LASTPOS=4003733;//user.Graph:3733
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
        var _it_445;
        
        //$LASTPOS=4003905;//user.Graph:3905
        sz = 12;
        
        //$LASTPOS=4003920;//user.Graph:3920
        _this.x=10;
        //$LASTPOS=4003925;//user.Graph:3925
        _this.y+=30;
        //$LASTPOS=4003936;//user.Graph:3936
        by = _this.y;
        
        //$LASTPOS=4003950;//user.Graph:3950
        Tonyu.globals.$panel.context.textBaseline="top";
        //$LASTPOS=4003989;//user.Graph:3989
        _it_445=Tonyu.iterator(_this.src.fileranka,2);
        while(_it_445.next()) {
          i=_it_445[0];
          r=_it_445[1];
          
          //$LASTPOS=4004030;//user.Graph:4030
          if (i>=_this.src.cols.length) {
            break;
            
          }
          //$LASTPOS=4004069;//user.Graph:4069
          Tonyu.globals.$panel.fillStyle=_this.getColor(r.filename);
          //$LASTPOS=4004152;//user.Graph:4152
          new Tonyu.classes.user.ClickableText({filename: r.filename,fillStyle: _this.getColor(r.filename),text: r.filename+"("+r.count+")",x: _this.x,y: _this.y,size: sz,onClick: (function anonymous_4325(b) {
            
            //$LASTPOS=4004348;//user.Graph:4348
            _this.src.sortByFile(b.filename);
            //$LASTPOS=4004392;//user.Graph:4392
            _this.curFile=b.filename;
            //$LASTPOS=4004428;//user.Graph:4428
            _this.reqRedraw=1;
          })});
          //$LASTPOS=4004629;//user.Graph:4629
          Tonyu.globals.$panel.fillRect(_this.x-sz,_this.y,sz,sz);
          //$LASTPOS=4004677;//user.Graph:4677
          _this.y+=sz;
          //$LASTPOS=4004692;//user.Graph:4692
          if (_this.y>Tonyu.globals.$screenHeight-sz) {
            //$LASTPOS=4004730;//user.Graph:4730
            _this.y=by;
            //$LASTPOS=4004748;//user.Graph:4748
            _this.x+=100;
            
          }
          
        }
        //$LASTPOS=4004776;//user.Graph:4776
        _this.y+=sz;
        //$LASTPOS=4004787;//user.Graph:4787
        Tonyu.globals.$panel.fillStyle="black";
        //$LASTPOS=4004817;//user.Graph:4817
        Tonyu.globals.$panel.fillText("I: Zoomin / O: Zoomout / S:summary",_this.x,_this.y,sz,"left");
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
        var _it_445;
        
        //$LASTPOS=4003905;//user.Graph:3905
        sz = 12;
        
        //$LASTPOS=4003920;//user.Graph:3920
        _this.x=10;
        //$LASTPOS=4003925;//user.Graph:3925
        _this.y+=30;
        //$LASTPOS=4003936;//user.Graph:3936
        by = _this.y;
        
        //$LASTPOS=4003950;//user.Graph:3950
        Tonyu.globals.$panel.context.textBaseline="top";
        
        _thread.enter(function _trc_Graph_ent_drawLegends(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              //$LASTPOS=4003989;//user.Graph:3989
              _it_445=Tonyu.iterator(_this.src.fileranka,2);
            case 1:
              if (!(_it_445.next())) { __pc=4     ; break; }
              i=_it_445[0];
              r=_it_445[1];
              
              //$LASTPOS=4004030;//user.Graph:4030
              if (!(i>=_this.src.cols.length)) { __pc=2     ; break; }
              __pc=4     ; break;
              
            case 2     :
              
              //$LASTPOS=4004069;//user.Graph:4069
              _this.fiber$getColor(_thread, r.filename);
              __pc=3;return;
            case 3:
              Tonyu.globals.$panel.fillStyle=_thread.retVal;
              
              //$LASTPOS=4004152;//user.Graph:4152
              new Tonyu.classes.user.ClickableText({filename: r.filename,fillStyle: _this.getColor(r.filename),text: r.filename+"("+r.count+")",x: _this.x,y: _this.y,size: sz,onClick: (function anonymous_4325(b) {
                
                //$LASTPOS=4004348;//user.Graph:4348
                _this.src.sortByFile(b.filename);
                //$LASTPOS=4004392;//user.Graph:4392
                _this.curFile=b.filename;
                //$LASTPOS=4004428;//user.Graph:4428
                _this.reqRedraw=1;
              })});
              //$LASTPOS=4004629;//user.Graph:4629
              Tonyu.globals.$panel.fillRect(_this.x-sz,_this.y,sz,sz);
              //$LASTPOS=4004677;//user.Graph:4677
              _this.y+=sz;
              //$LASTPOS=4004692;//user.Graph:4692
              if (_this.y>Tonyu.globals.$screenHeight-sz) {
                //$LASTPOS=4004730;//user.Graph:4730
                _this.y=by;
                //$LASTPOS=4004748;//user.Graph:4748
                _this.x+=100;
                
              }
              __pc=1;break;
            case 4     :
              
              //$LASTPOS=4004776;//user.Graph:4776
              _this.y+=sz;
              //$LASTPOS=4004787;//user.Graph:4787
              Tonyu.globals.$panel.fillStyle="black";
              //$LASTPOS=4004817;//user.Graph:4817
              Tonyu.globals.$panel.fillText("I: Zoomin / O: Zoomout / S:summary",_this.x,_this.y,sz,"left");
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
    };
  },
  decls: {"methods":{"main":{"nowait":false},"y2timeline":{"nowait":false},"summary":{"nowait":false},"drawLines":{"nowait":false},"draw1Line":{"nowait":true},"zoomIn":{"nowait":false},"zoomOut":{"nowait":false},"setRange":{"nowait":false},"x2time":{"nowait":false},"time2x":{"nowait":false},"drawLegends":{"nowait":false},"getColor":{"nowait":false}},"fields":{"src":{},"colors":{},"hslc":{},"btime":{},"etime":{},"duration":{},"reqRedraw":{},"curFile":{},"linesYMax":{},"t":{},"url":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Indicator',
  shortName: 'Indicator',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Indicator_main() {
        "use strict";
        var _this=this;
        
        //$LASTPOS=5000000;//user.Indicator:0
        _this.fillStyle="black";
        //$LASTPOS=5000019;//user.Indicator:19
        _this.text="?";
        //$LASTPOS=5000029;//user.Indicator:29
        _this.zOrder=- 10;
        //$LASTPOS=5000041;//user.Indicator:41
        while (true) {
          //$LASTPOS=5000059;//user.Indicator:59
          _this.x=Tonyu.globals.$mouseX;
          //$LASTPOS=5000074;//user.Indicator:74
          _this.yy=Tonyu.globals.$mouseY;
          //$LASTPOS=5000090;//user.Indicator:90
          _this.i=_this.floor(_this.yy/Tonyu.globals.$h);
          //$LASTPOS=5000110;//user.Indicator:110
          _this.t=_this.timelines[_this.i];
          //$LASTPOS=5000130;//user.Indicator:130
          _this.y=_this.yy+50;
          //$LASTPOS=5000143;//user.Indicator:143
          if (_this.t&&_this.t.user) {
            //$LASTPOS=5000170;//user.Indicator:170
            _this.text=_this.t.user;
            
          } else {
            //$LASTPOS=5000194;//user.Indicator:194
            _this.text="";
          }
          //$LASTPOS=5000207;//user.Indicator:207
          _this.ti=_this.graph.x2time(_this.x);
          //$LASTPOS=5000231;//user.Indicator:231
          _this.d = new Date();
          
          //$LASTPOS=5000253;//user.Indicator:253
          _this.d.setTime(_this.ti*1000);
          //$LASTPOS=5000277;//user.Indicator:277
          _this.text+="\n"+[_this.d.getHours(),_this.d.getMinutes()].join(":");
          //$LASTPOS=5000333;//user.Indicator:333
          if (_this.t&&_this.t.avg&&_this.graph.curFile) {
            //$LASTPOS=5000366;//user.Indicator:366
            _this.text+="\n"+_this.t.avg[_this.graph.curFile];
          }
          //$LASTPOS=5000403;//user.Indicator:403
          _this.update();
          
        }
      },
      fiber$main :function _trc_Indicator_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        //$LASTPOS=5000000;//user.Indicator:0
        _this.fillStyle="black";
        //$LASTPOS=5000019;//user.Indicator:19
        _this.text="?";
        //$LASTPOS=5000029;//user.Indicator:29
        _this.zOrder=- 10;
        
        _thread.enter(function _trc_Indicator_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              //$LASTPOS=5000041;//user.Indicator:41
            case 1:
              //$LASTPOS=5000059;//user.Indicator:59
              _this.x=Tonyu.globals.$mouseX;
              //$LASTPOS=5000074;//user.Indicator:74
              _this.yy=Tonyu.globals.$mouseY;
              //$LASTPOS=5000090;//user.Indicator:90
              _this.i=_this.floor(_this.yy/Tonyu.globals.$h);
              //$LASTPOS=5000110;//user.Indicator:110
              _this.t=_this.timelines[_this.i];
              //$LASTPOS=5000130;//user.Indicator:130
              _this.y=_this.yy+50;
              //$LASTPOS=5000143;//user.Indicator:143
              if (_this.t&&_this.t.user) {
                //$LASTPOS=5000170;//user.Indicator:170
                _this.text=_this.t.user;
                
              } else {
                //$LASTPOS=5000194;//user.Indicator:194
                _this.text="";
              }
              //$LASTPOS=5000207;//user.Indicator:207
              _this.ti=_this.graph.x2time(_this.x);
              //$LASTPOS=5000231;//user.Indicator:231
              _this.d = new Date();
              
              //$LASTPOS=5000253;//user.Indicator:253
              _this.d.setTime(_this.ti*1000);
              //$LASTPOS=5000277;//user.Indicator:277
              _this.text+="\n"+[_this.d.getHours(),_this.d.getMinutes()].join(":");
              //$LASTPOS=5000333;//user.Indicator:333
              if (_this.t&&_this.t.avg&&_this.graph.curFile) {
                //$LASTPOS=5000366;//user.Indicator:366
                _this.text+="\n"+_this.t.avg[_this.graph.curFile];
              }
              //$LASTPOS=5000403;//user.Indicator:403
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
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"d":{},"yy":{},"i":{},"t":{},"timelines":{},"ti":{},"graph":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Main_main() {
        "use strict";
        var _this=this;
        
        //$LASTPOS=6000000;//user.Main:0
        Tonyu.globals.$Screen.setBGColor("white");
        //$LASTPOS=6000029;//user.Main:29
        _this.cols=["lime","red","blue","yellow","#f0f"];
        //$LASTPOS=6000075;//user.Main:75
        //$LASTPOS=6000079;//user.Main:79
        _this.i=0;for (; _this.i<50 ; _this.i++) {
          {
            //$LASTPOS=6000099;//user.Main:99
            _this.x=0;
            //$LASTPOS=6000108;//user.Main:108
            _this.n=0;
            //$LASTPOS=6000117;//user.Main:117
            //$LASTPOS=6000122;//user.Main:122
            _this.j=0;for (; _this.j<400 ; _this.j++) {
              {
                //$LASTPOS=6000147;//user.Main:147
                _this.n+=_this.rnd()*(0.1+_this.i/100);
                //$LASTPOS=6000177;//user.Main:177
                if (_this.n>=5) {
                  break;
                  
                }
                //$LASTPOS=6000202;//user.Main:202
                Tonyu.globals.$panel.fillStyle=_this.cols[_this.floor(_this.n)];
                //$LASTPOS=6000243;//user.Main:243
                _this.w=_this.rnd(10)+1;
                //$LASTPOS=6000264;//user.Main:264
                Tonyu.globals.$panel.fillRect(_this.x,_this.i*2,_this.w,2);
                //$LASTPOS=6000300;//user.Main:300
                _this.x+=_this.w;
              }
            }
            //$LASTPOS=6000316;//user.Main:316
            _this.update();
          }
        }
      },
      fiber$main :function _trc_Main_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        //$LASTPOS=6000000;//user.Main:0
        Tonyu.globals.$Screen.setBGColor("white");
        //$LASTPOS=6000029;//user.Main:29
        _this.cols=["lime","red","blue","yellow","#f0f"];
        
        _thread.enter(function _trc_Main_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              //$LASTPOS=6000075;//user.Main:75
              //$LASTPOS=6000079;//user.Main:79
              _this.i=0;
            case 1:
              if (!(_this.i<50)) { __pc=4     ; break; }
              //$LASTPOS=6000099;//user.Main:99
              _this.x=0;
              //$LASTPOS=6000108;//user.Main:108
              _this.n=0;
              //$LASTPOS=6000117;//user.Main:117
              //$LASTPOS=6000122;//user.Main:122
              _this.j=0;for (; _this.j<400 ; _this.j++) {
                {
                  //$LASTPOS=6000147;//user.Main:147
                  _this.n+=_this.rnd()*(0.1+_this.i/100);
                  //$LASTPOS=6000177;//user.Main:177
                  if (_this.n>=5) {
                    break;
                    
                  }
                  //$LASTPOS=6000202;//user.Main:202
                  Tonyu.globals.$panel.fillStyle=_this.cols[_this.floor(_this.n)];
                  //$LASTPOS=6000243;//user.Main:243
                  _this.w=_this.rnd(10)+1;
                  //$LASTPOS=6000264;//user.Main:264
                  Tonyu.globals.$panel.fillRect(_this.x,_this.i*2,_this.w,2);
                  //$LASTPOS=6000300;//user.Main:300
                  _this.x+=_this.w;
                }
              }
              //$LASTPOS=6000316;//user.Main:316
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
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"cols":{},"i":{},"n":{},"j":{},"w":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Summarizer',
  shortName: 'Summarizer',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: function (__superClass) {
    return {
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
        
        //$LASTPOS=7000030;//user.Summarizer:30
        _this.sum=0;
        //$LASTPOS=7000041;//user.Summarizer:41
        _this.count=0;
      },
      add :function _trc_Summarizer_add(val) {
        "use strict";
        var _this=this;
        
        //$LASTPOS=7000068;//user.Summarizer:68
        if (_this.min==null||val<_this.min) {
          //$LASTPOS=7000094;//user.Summarizer:94
          _this.min=val;
        }
        //$LASTPOS=7000107;//user.Summarizer:107
        if (_this.max==null||val>_this.max) {
          //$LASTPOS=7000133;//user.Summarizer:133
          _this.max=val;
        }
        //$LASTPOS=7000146;//user.Summarizer:146
        _this.sum+=val;
        //$LASTPOS=7000160;//user.Summarizer:160
        _this.count++;
      },
      fiber$add :function _trc_Summarizer_f_add(_thread,val) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        //$LASTPOS=7000068;//user.Summarizer:68
        if (_this.min==null||val<_this.min) {
          //$LASTPOS=7000094;//user.Summarizer:94
          _this.min=val;
        }
        //$LASTPOS=7000107;//user.Summarizer:107
        if (_this.max==null||val>_this.max) {
          //$LASTPOS=7000133;//user.Summarizer:133
          _this.max=val;
        }
        //$LASTPOS=7000146;//user.Summarizer:146
        _this.sum+=val;
        //$LASTPOS=7000160;//user.Summarizer:160
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
    };
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"__getter__average":{"nowait":true},"toString":{"nowait":false}},"fields":{"sum":{},"count":{},"min":{},"max":{}}}
});

//# sourceMappingURL=concat.js.map