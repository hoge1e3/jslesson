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
      var _it_781;
      var _it_782;
      var _it_783;
      
      //$LASTPOS=1000178;//user.FNlog:178
      _this.paramstr = location.href.replace(/^.*\?/,"").replace(/#.*$/,"");
      
      //$LASTPOS=1000245;//user.FNlog:245
      _this.params = Tonyu.globals.$params||{};
      
      //$LASTPOS=1000269;//user.FNlog:269
      _it_781=Tonyu.iterator(_this.paramstr.split("&"),1);
      while(_it_781.next()) {
        _this.k=_it_781[0];
        
        //$LASTPOS=1000310;//user.FNlog:310
        _this.vals = _this.k.split("=");
        
        //$LASTPOS=1000337;//user.FNlog:337
        if (_this.vals.length==2) {
          //$LASTPOS=1000357;//user.FNlog:357
          _this.params[_this.vals[0]]=_this.vals[1];
        }
        
      }
      //$LASTPOS=1000425;//user.FNlog:425
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=1000467;//user.FNlog:467
      _this.cnt=0;
      //$LASTPOS=1000474;//user.FNlog:474
      _this.day=_this.params.day||"2018-07-09";
      //$LASTPOS=1000504;//user.FNlog:504
      _this.ymd=_this.day.split("-");
      //$LASTPOS=1000524;//user.FNlog:524
      _this.day=new Date();
      //$LASTPOS=1000540;//user.FNlog:540
      _this.day.setYear(_this.ymd[0]-0);
      //$LASTPOS=1000563;//user.FNlog:563
      _this.day.setMonth(_this.ymd[1]-1);
      //$LASTPOS=1000587;//user.FNlog:587
      _this.day.setDate(_this.ymd[2]-0);
      //$LASTPOS=1000610;//user.FNlog:610
      _this.classid=_this.params.classid;
      //$LASTPOS=1000634;//user.FNlog:634
      _this.timezone=(_this.params.timezone||9)-0;
      //$LASTPOS=1000721;//user.FNlog:721
      _this.day=_this.day.getTime();
      //$LASTPOS=1000740;//user.FNlog:740
      _this.day=_this.floor(_this.day/1000);
      //$LASTPOS=1000761;//user.FNlog:761
      _this.day=_this.floor(_this.day/86400)*86400-_this.timezone*3600;
      //$LASTPOS=1000803;//user.FNlog:803
      _this.btime = _this.day;
      
      //$LASTPOS=1000831;//user.FNlog:831
      _this.duration = 86400;
      
      //$LASTPOS=1000851;//user.FNlog:851
      _this.etime = _this.btime+_this.duration;
      
      //$LASTPOS=1000877;//user.FNlog:877
      _this.timelines = [];
      _this.filerank = {};
      _this.topfile = {};
      
      //$LASTPOS=1000918;//user.FNlog:918
      _this.url=location.host=="bitarrow.eplang.jp"?"https://bitarrow.eplang.jp/bitarrowbeta/":"http://localhost/";
      //$LASTPOS=1001023;//user.FNlog:1023
      _this.files=_this.waitFor($.get(_this.url+"a.php?TeacherLog/getFileNames",{day: _this.btime,classid: _this.classid}));
      //$LASTPOS=1001118;//user.FNlog:1118
      _it_782=Tonyu.iterator(_this.files.split("\n"),2);
      while(_it_782.next()) {
        _this.cnt=_it_782[0];
        _this.line=_it_782[1];
        
        //$LASTPOS=1001189;//user.FNlog:1189
        if (_this.cnt==0) {
          continue;
          
        }
        //$LASTPOS=1001215;//user.FNlog:1215
        _this.d = _this.line.split("\t");
        
        //$LASTPOS=1001243;//user.FNlog:1243
        _this.user = _this.d[0];
        _this.filename = _this.d[1];
        _this.time = _this.d[2];
        
        //$LASTPOS=1001297;//user.FNlog:1297
        if (_this.puser!=_this.user) {
          //$LASTPOS=1001324;//user.FNlog:1324
          _this.timeline=[];
          //$LASTPOS=1001345;//user.FNlog:1345
          _this.timeline.user=_this.user;
          //$LASTPOS=1001373;//user.FNlog:1373
          _this.timelines.push(_this.timeline);
          //$LASTPOS=1001407;//user.FNlog:1407
          _this.fileappeared={};
          //$LASTPOS=1001432;//user.FNlog:1432
          _this.puser=_this.user;
          
        }
        //$LASTPOS=1001454;//user.FNlog:1454
        if (_this.time<_this.etime) {
          //$LASTPOS=1001480;//user.FNlog:1480
          _this.timeline.end=_this.time;
          //$LASTPOS=1001507;//user.FNlog:1507
          if (! _this.fileappeared[_this.filename]) {
            //$LASTPOS=1001550;//user.FNlog:1550
            _this.fileappeared[_this.filename]=1;
            //$LASTPOS=1001588;//user.FNlog:1588
            _this.filerank[_this.filename]=(_this.filerank[_this.filename]||0)+1;
            
          }
          //$LASTPOS=1001652;//user.FNlog:1652
          _this.timeline.push({filename: _this.filename,time: _this.time});
          
        }
        
      }
      //$LASTPOS=1001694;//user.FNlog:1694
      _this.fileranka=[];
      //$LASTPOS=1001708;//user.FNlog:1708
      _it_783=Tonyu.iterator(_this.filerank,2);
      while(_it_783.next()) {
        _this.filename=_it_783[0];
        _this.count=_it_783[1];
        
        //$LASTPOS=1001751;//user.FNlog:1751
        _this.fileranka.push({filename: _this.filename,count: _this.count});
        
      }
      //$LASTPOS=1001785;//user.FNlog:1785
      _this.fileranka=_this.fileranka.sort((function anonymous_1810(a,b) {
        
        return b.count-a.count;
      }));
      //$LASTPOS=1001850;//user.FNlog:1850
      //$LASTPOS=1001855;//user.FNlog:1855
      _this.i=0;for (; _this.i<_this.min(10,_this.fileranka.length) ; _this.i++) {
        Tonyu.checkLoop();
        //$LASTPOS=1001891;//user.FNlog:1891
        _this.topfile[_this.fileranka[_this.i].filename]=1;
      }
      //$LASTPOS=1001925;//user.FNlog:1925
      _this.timelines=_this.timelines.sort((function anonymous_1950(a,b) {
        
        return a.end-b.end;
      }));
      //$LASTPOS=1001986;//user.FNlog:1986
      new Tonyu.classes.user.Graph({src: _this});
    },
    fiber$main :function _trc_FNlog_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var _it_781;
      var _it_782;
      var _it_783;
      
      //$LASTPOS=1000178;//user.FNlog:178
      _this.paramstr = location.href.replace(/^.*\?/,"").replace(/#.*$/,"");
      
      //$LASTPOS=1000245;//user.FNlog:245
      _this.params = Tonyu.globals.$params||{};
      
      //$LASTPOS=1000269;//user.FNlog:269
      _it_781=Tonyu.iterator(_this.paramstr.split("&"),1);
      while(_it_781.next()) {
        _this.k=_it_781[0];
        
        //$LASTPOS=1000310;//user.FNlog:310
        _this.vals = _this.k.split("=");
        
        //$LASTPOS=1000337;//user.FNlog:337
        if (_this.vals.length==2) {
          //$LASTPOS=1000357;//user.FNlog:357
          _this.params[_this.vals[0]]=_this.vals[1];
        }
        
      }
      //$LASTPOS=1000425;//user.FNlog:425
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=1000467;//user.FNlog:467
      _this.cnt=0;
      //$LASTPOS=1000474;//user.FNlog:474
      _this.day=_this.params.day||"2018-07-09";
      //$LASTPOS=1000504;//user.FNlog:504
      _this.ymd=_this.day.split("-");
      //$LASTPOS=1000524;//user.FNlog:524
      _this.day=new Date();
      //$LASTPOS=1000540;//user.FNlog:540
      _this.day.setYear(_this.ymd[0]-0);
      //$LASTPOS=1000563;//user.FNlog:563
      _this.day.setMonth(_this.ymd[1]-1);
      //$LASTPOS=1000587;//user.FNlog:587
      _this.day.setDate(_this.ymd[2]-0);
      //$LASTPOS=1000610;//user.FNlog:610
      _this.classid=_this.params.classid;
      //$LASTPOS=1000634;//user.FNlog:634
      _this.timezone=(_this.params.timezone||9)-0;
      //$LASTPOS=1000721;//user.FNlog:721
      _this.day=_this.day.getTime();
      //$LASTPOS=1000740;//user.FNlog:740
      _this.day=_this.floor(_this.day/1000);
      //$LASTPOS=1000761;//user.FNlog:761
      _this.day=_this.floor(_this.day/86400)*86400-_this.timezone*3600;
      //$LASTPOS=1000803;//user.FNlog:803
      _this.btime = _this.day;
      
      //$LASTPOS=1000831;//user.FNlog:831
      _this.duration = 86400;
      
      //$LASTPOS=1000851;//user.FNlog:851
      _this.etime = _this.btime+_this.duration;
      
      //$LASTPOS=1000877;//user.FNlog:877
      _this.timelines = [];
      _this.filerank = {};
      _this.topfile = {};
      
      //$LASTPOS=1000918;//user.FNlog:918
      _this.url=location.host=="bitarrow.eplang.jp"?"https://bitarrow.eplang.jp/bitarrowbeta/":"http://localhost/";
      
      _thread.enter(function _trc_FNlog_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1001023;//user.FNlog:1023
            _this.fiber$waitFor(_thread, $.get(_this.url+"a.php?TeacherLog/getFileNames",{day: _this.btime,classid: _this.classid}));
            __pc=1;return;
          case 1:
            _this.files=_thread.retVal;
            
            //$LASTPOS=1001118;//user.FNlog:1118
            _it_782=Tonyu.iterator(_this.files.split("\n"),2);
            while(_it_782.next()) {
              _this.cnt=_it_782[0];
              _this.line=_it_782[1];
              
              //$LASTPOS=1001189;//user.FNlog:1189
              if (_this.cnt==0) {
                continue;
                
              }
              //$LASTPOS=1001215;//user.FNlog:1215
              _this.d = _this.line.split("\t");
              
              //$LASTPOS=1001243;//user.FNlog:1243
              _this.user = _this.d[0];
              _this.filename = _this.d[1];
              _this.time = _this.d[2];
              
              //$LASTPOS=1001297;//user.FNlog:1297
              if (_this.puser!=_this.user) {
                //$LASTPOS=1001324;//user.FNlog:1324
                _this.timeline=[];
                //$LASTPOS=1001345;//user.FNlog:1345
                _this.timeline.user=_this.user;
                //$LASTPOS=1001373;//user.FNlog:1373
                _this.timelines.push(_this.timeline);
                //$LASTPOS=1001407;//user.FNlog:1407
                _this.fileappeared={};
                //$LASTPOS=1001432;//user.FNlog:1432
                _this.puser=_this.user;
                
              }
              //$LASTPOS=1001454;//user.FNlog:1454
              if (_this.time<_this.etime) {
                //$LASTPOS=1001480;//user.FNlog:1480
                _this.timeline.end=_this.time;
                //$LASTPOS=1001507;//user.FNlog:1507
                if (! _this.fileappeared[_this.filename]) {
                  //$LASTPOS=1001550;//user.FNlog:1550
                  _this.fileappeared[_this.filename]=1;
                  //$LASTPOS=1001588;//user.FNlog:1588
                  _this.filerank[_this.filename]=(_this.filerank[_this.filename]||0)+1;
                  
                }
                //$LASTPOS=1001652;//user.FNlog:1652
                _this.timeline.push({filename: _this.filename,time: _this.time});
                
              }
              
            }
            //$LASTPOS=1001694;//user.FNlog:1694
            _this.fileranka=[];
            //$LASTPOS=1001708;//user.FNlog:1708
            _it_783=Tonyu.iterator(_this.filerank,2);
            while(_it_783.next()) {
              _this.filename=_it_783[0];
              _this.count=_it_783[1];
              
              //$LASTPOS=1001751;//user.FNlog:1751
              _this.fileranka.push({filename: _this.filename,count: _this.count});
              
            }
            //$LASTPOS=1001785;//user.FNlog:1785
            _this.fileranka=_this.fileranka.sort((function anonymous_1810(a,b) {
              
              return b.count-a.count;
            }));
            //$LASTPOS=1001850;//user.FNlog:1850
            //$LASTPOS=1001855;//user.FNlog:1855
            _this.i=0;for (; _this.i<_this.min(10,_this.fileranka.length) ; _this.i++) {
              Tonyu.checkLoop();
              //$LASTPOS=1001891;//user.FNlog:1891
              _this.topfile[_this.fileranka[_this.i].filename]=1;
            }
            //$LASTPOS=1001925;//user.FNlog:1925
            _this.timelines=_this.timelines.sort((function anonymous_1950(a,b) {
              
              return a.end-b.end;
            }));
            //$LASTPOS=1001986;//user.FNlog:1986
            new Tonyu.classes.user.Graph({src: _this});
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"paramstr":{},"params":{},"k":{},"vals":{},"btime":{},"duration":{},"etime":{},"timelines":{},"filerank":{},"topfile":{},"d":{},"user":{},"filename":{},"time":{},"count":{},"cnt":{},"day":{},"ymd":{},"classid":{},"timezone":{},"url":{},"files":{},"line":{},"puser":{},"timeline":{},"fileappeared":{},"fileranka":{},"i":{}}}
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
      
      //$LASTPOS=4000000;//user.Graph:0
      "field strict";
      
      //$LASTPOS=4000031;//user.Graph:31
      _this.colors = {};
      
      //$LASTPOS=4000046;//user.Graph:46
      Tonyu.globals.$h=5;
      //$LASTPOS=4000053;//user.Graph:53
      _this.hslc = 0;
      
      
      //$LASTPOS=4000091;//user.Graph:91
      _this.setRange();
      
      //$LASTPOS=4000181;//user.Graph:181
      new Tonyu.classes.user.Indicator({graph: _this,timelines: _this.src.timelines,layer: Tonyu.globals.$frontLayer});
      //$LASTPOS=4000251;//user.Graph:251
      _this.drawLines();
      //$LASTPOS=4000264;//user.Graph:264
      _this.drawLegends();
      //$LASTPOS=4000279;//user.Graph:279
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=4000297;//user.Graph:297
        if (_this.getkey("mouseleft")==1) {
          //$LASTPOS=4000335;//user.Graph:335
          _this.zoomIn(Tonyu.globals.$mouseX);
          //$LASTPOS=4000360;//user.Graph:360
          _this.drawLines();
          
        }
        //$LASTPOS=4000383;//user.Graph:383
        if (_this.getkey("mouseright")==1) {
          //$LASTPOS=4000422;//user.Graph:422
          _this.zoomOut(Tonyu.globals.$mouseX);
          //$LASTPOS=4000448;//user.Graph:448
          _this.drawLines();
          
        }
        //$LASTPOS=4000471;//user.Graph:471
        _this.update();
        
      }
      //$LASTPOS=4000483;//user.Graph:483
      _this.p=- 1;
    },
    fiber$main :function _trc_Graph_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000000;//user.Graph:0
      "field strict";
      
      //$LASTPOS=4000031;//user.Graph:31
      _this.colors = {};
      
      //$LASTPOS=4000046;//user.Graph:46
      Tonyu.globals.$h=5;
      //$LASTPOS=4000053;//user.Graph:53
      _this.hslc = 0;
      
      
      
      _thread.enter(function _trc_Graph_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000091;//user.Graph:91
            _this.fiber$setRange(_thread);
            __pc=1;return;
          case 1:
            
            
            //$LASTPOS=4000181;//user.Graph:181
            new Tonyu.classes.user.Indicator({graph: _this,timelines: _this.src.timelines,layer: Tonyu.globals.$frontLayer});
            //$LASTPOS=4000251;//user.Graph:251
            _this.fiber$drawLines(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=4000264;//user.Graph:264
            _this.fiber$drawLegends(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=4000279;//user.Graph:279
          case 4:
            //$LASTPOS=4000297;//user.Graph:297
            if (!(_this.getkey("mouseleft")==1)) { __pc=7     ; break; }
            //$LASTPOS=4000335;//user.Graph:335
            _this.fiber$zoomIn(_thread, Tonyu.globals.$mouseX);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=4000360;//user.Graph:360
            _this.fiber$drawLines(_thread);
            __pc=6;return;
          case 6:
            
          case 7     :
            
            //$LASTPOS=4000383;//user.Graph:383
            if (!(_this.getkey("mouseright")==1)) { __pc=10    ; break; }
            //$LASTPOS=4000422;//user.Graph:422
            _this.fiber$zoomOut(_thread, Tonyu.globals.$mouseX);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=4000448;//user.Graph:448
            _this.fiber$drawLines(_thread);
            __pc=9;return;
          case 9:
            
          case 10    :
            
            //$LASTPOS=4000471;//user.Graph:471
            _this.fiber$update(_thread);
            __pc=11;return;
          case 11:
            
            __pc=4;break;
          case 12    :
            
            //$LASTPOS=4000483;//user.Graph:483
            _this.p=- 1;
            _thread.exit(_this);return;
          }
        }
      });
    },
    drawLines :function _trc_Graph_drawLines() {
      "use strict";
      var _this=this;
      var cnt;
      var px;
      var timeline;
      var _it_557;
      var e;
      var _it_558;
      var filename;
      var time;
      
      //$LASTPOS=4000508;//user.Graph:508
      if (_this.linesYMax) {
        //$LASTPOS=4000533;//user.Graph:533
        Tonyu.globals.$panel.fillStyle="white";
        //$LASTPOS=4000567;//user.Graph:567
        Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,_this.linesYMax);
        
      }
      //$LASTPOS=4000622;//user.Graph:622
      cnt = 0;
      
      
      //$LASTPOS=4000649;//user.Graph:649
      _this.y=0;
      //$LASTPOS=4000658;//user.Graph:658
      _it_557=Tonyu.iterator(_this.src.timelines,1);
      while(_it_557.next()) {
        timeline=_it_557[0];
        
        //$LASTPOS=4000704;//user.Graph:704
        _it_558=Tonyu.iterator(timeline,1);
        while(_it_558.next()) {
          e=_it_558[0];
          
          //$LASTPOS=4000742;//user.Graph:742
          filename = e.filename;
          time = e.time;
          
          //$LASTPOS=4000792;//user.Graph:792
          _this.x=_this.time2x(time);
          //$LASTPOS=4000820;//user.Graph:820
          if (px) {
            //$LASTPOS=4000846;//user.Graph:846
            Tonyu.globals.$panel.fillRect(px,_this.y,_this.clamp((_this.x-px),1,10),Tonyu.globals.$h);
            
          }
          //$LASTPOS=4000919;//user.Graph:919
          px=_this.x;
          //$LASTPOS=4000937;//user.Graph:937
          Tonyu.globals.$panel.fillStyle=_this.getColor(filename);
          //$LASTPOS=4000986;//user.Graph:986
          cnt++;
          //$LASTPOS=4001005;//user.Graph:1005
          if (cnt%20==0) {
            //$LASTPOS=4001020;//user.Graph:1020
            _this.update();
          }
          
        }
        //$LASTPOS=4001048;//user.Graph:1048
        _this.y+=Tonyu.globals.$h;
        
      }
      //$LASTPOS=4001065;//user.Graph:1065
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
      var _it_557;
      var e;
      var _it_558;
      var filename;
      var time;
      
      //$LASTPOS=4000508;//user.Graph:508
      if (_this.linesYMax) {
        //$LASTPOS=4000533;//user.Graph:533
        Tonyu.globals.$panel.fillStyle="white";
        //$LASTPOS=4000567;//user.Graph:567
        Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,_this.linesYMax);
        
      }
      //$LASTPOS=4000622;//user.Graph:622
      cnt = 0;
      
      
      //$LASTPOS=4000649;//user.Graph:649
      _this.y=0;
      
      _thread.enter(function _trc_Graph_ent_drawLines(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000658;//user.Graph:658
            _it_557=Tonyu.iterator(_this.src.timelines,1);
          case 1:
            if (!(_it_557.next())) { __pc=8     ; break; }
            timeline=_it_557[0];
            
            //$LASTPOS=4000704;//user.Graph:704
            _it_558=Tonyu.iterator(timeline,1);
          case 2:
            if (!(_it_558.next())) { __pc=7     ; break; }
            e=_it_558[0];
            
            //$LASTPOS=4000742;//user.Graph:742
            filename = e.filename;
            time = e.time;
            
            //$LASTPOS=4000792;//user.Graph:792
            _this.fiber$time2x(_thread, time);
            __pc=3;return;
          case 3:
            _this.x=_thread.retVal;
            
            //$LASTPOS=4000820;//user.Graph:820
            if (px) {
              //$LASTPOS=4000846;//user.Graph:846
              Tonyu.globals.$panel.fillRect(px,_this.y,_this.clamp((_this.x-px),1,10),Tonyu.globals.$h);
              
            }
            //$LASTPOS=4000919;//user.Graph:919
            px=_this.x;
            //$LASTPOS=4000937;//user.Graph:937
            _this.fiber$getColor(_thread, filename);
            __pc=4;return;
          case 4:
            Tonyu.globals.$panel.fillStyle=_thread.retVal;
            
            //$LASTPOS=4000986;//user.Graph:986
            cnt++;
            //$LASTPOS=4001005;//user.Graph:1005
            if (!(cnt%20==0)) { __pc=6     ; break; }
            //$LASTPOS=4001020;//user.Graph:1020
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
          case 6     :
            
            __pc=2;break;
          case 7     :
            
            //$LASTPOS=4001048;//user.Graph:1048
            _this.y+=Tonyu.globals.$h;
            __pc=1;break;
          case 8     :
            
            //$LASTPOS=4001065;//user.Graph:1065
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
      
      //$LASTPOS=4001097;//user.Graph:1097
      t = _this.x2time(x);
      
      //$LASTPOS=4001118;//user.Graph:1118
      nd = _this.duration/2;
      
      //$LASTPOS=4001141;//user.Graph:1141
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
            //$LASTPOS=4001097;//user.Graph:1097
            _this.fiber$x2time(_thread, x);
            __pc=1;return;
          case 1:
            t=_thread.retVal;
            
            //$LASTPOS=4001118;//user.Graph:1118
            nd = _this.duration/2;
            
            //$LASTPOS=4001141;//user.Graph:1141
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
      
      //$LASTPOS=4001186;//user.Graph:1186
      t = _this.x2time(x);
      
      //$LASTPOS=4001207;//user.Graph:1207
      nd = _this.duration*2;
      
      //$LASTPOS=4001230;//user.Graph:1230
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
            //$LASTPOS=4001186;//user.Graph:1186
            _this.fiber$x2time(_thread, x);
            __pc=1;return;
          case 1:
            t=_thread.retVal;
            
            //$LASTPOS=4001207;//user.Graph:1207
            nd = _this.duration*2;
            
            //$LASTPOS=4001230;//user.Graph:1230
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
      
      //$LASTPOS=4001278;//user.Graph:1278
      _this.btime=_this.clamp(b||_this.src.btime,_this.src.btime,_this.src.etime);
      //$LASTPOS=4001329;//user.Graph:1329
      _this.etime=_this.clamp(e||_this.src.etime,_this.src.btime,_this.src.etime);
      //$LASTPOS=4001380;//user.Graph:1380
      _this.duration=_this.etime-_this.btime;
    },
    fiber$setRange :function _trc_Graph_f_setRange(_thread,b,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4001278;//user.Graph:1278
      _this.btime=_this.clamp(b||_this.src.btime,_this.src.btime,_this.src.etime);
      //$LASTPOS=4001329;//user.Graph:1329
      _this.etime=_this.clamp(e||_this.src.etime,_this.src.btime,_this.src.etime);
      //$LASTPOS=4001380;//user.Graph:1380
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
      var fn;
      var col;
      var _it_571;
      
      //$LASTPOS=4001552;//user.Graph:1552
      sz = 12;
      
      //$LASTPOS=4001567;//user.Graph:1567
      _this.x=10;
      //$LASTPOS=4001572;//user.Graph:1572
      _this.y+=30;
      //$LASTPOS=4001583;//user.Graph:1583
      by = _this.y;
      
      //$LASTPOS=4001597;//user.Graph:1597
      _it_571=Tonyu.iterator(_this.colors,2);
      while(_it_571.next()) {
        fn=_it_571[0];
        col=_it_571[1];
        
        //$LASTPOS=4001634;//user.Graph:1634
        Tonyu.globals.$panel.fillStyle=col;
        //$LASTPOS=4001700;//user.Graph:1700
        Tonyu.globals.$panel.fillText(fn,_this.x,_this.y,sz,"left");
        //$LASTPOS=4001743;//user.Graph:1743
        _this.y+=sz;
        //$LASTPOS=4001758;//user.Graph:1758
        if (_this.y>Tonyu.globals.$screenHeight-sz) {
          //$LASTPOS=4001796;//user.Graph:1796
          _this.y=by;
          //$LASTPOS=4001814;//user.Graph:1814
          _this.x+=100;
          
        }
        
      }
    },
    fiber$drawLegends :function _trc_Graph_f_drawLegends(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sz;
      var by;
      var fn;
      var col;
      var _it_571;
      
      //$LASTPOS=4001552;//user.Graph:1552
      sz = 12;
      
      //$LASTPOS=4001567;//user.Graph:1567
      _this.x=10;
      //$LASTPOS=4001572;//user.Graph:1572
      _this.y+=30;
      //$LASTPOS=4001583;//user.Graph:1583
      by = _this.y;
      
      //$LASTPOS=4001597;//user.Graph:1597
      _it_571=Tonyu.iterator(_this.colors,2);
      while(_it_571.next()) {
        fn=_it_571[0];
        col=_it_571[1];
        
        //$LASTPOS=4001634;//user.Graph:1634
        Tonyu.globals.$panel.fillStyle=col;
        //$LASTPOS=4001700;//user.Graph:1700
        Tonyu.globals.$panel.fillText(fn,_this.x,_this.y,sz,"left");
        //$LASTPOS=4001743;//user.Graph:1743
        _this.y+=sz;
        //$LASTPOS=4001758;//user.Graph:1758
        if (_this.y>Tonyu.globals.$screenHeight-sz) {
          //$LASTPOS=4001796;//user.Graph:1796
          _this.y=by;
          //$LASTPOS=4001814;//user.Graph:1814
          _this.x+=100;
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    getColor :function _trc_Graph_getColor(file) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=4001862;//user.Graph:1862
      if (! _this.src.topfile[file]) {
        return "#888";
      }
      //$LASTPOS=4001937;//user.Graph:1937
      if (_this.colors[file]) {
        return _this.colors[file];
      }
      //$LASTPOS=4001980;//user.Graph:1980
      _this.colors[file]=new Tonyu.classes.kernel.Color({h: _this.hslc,s: 1,l: _this.hslc>360?0.4:0.7});
      //$LASTPOS=4002073;//user.Graph:2073
      _this.hslc+=42;
      return _this.colors[file];
    },
    fiber$getColor :function _trc_Graph_f_getColor(_thread,file) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4001862;//user.Graph:1862
      if (! _this.src.topfile[file]) {
        _thread.retVal="#888";return;
        
      }
      //$LASTPOS=4001937;//user.Graph:1937
      if (_this.colors[file]) {
        _thread.retVal=_this.colors[file];return;
        
      }
      //$LASTPOS=4001980;//user.Graph:1980
      _this.colors[file]=new Tonyu.classes.kernel.Color({h: _this.hslc,s: 1,l: _this.hslc>360?0.4:0.7});
      //$LASTPOS=4002073;//user.Graph:2073
      _this.hslc+=42;
      _thread.retVal=_this.colors[file];return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"drawLines":{"nowait":false},"zoomIn":{"nowait":false},"zoomOut":{"nowait":false},"setRange":{"nowait":false},"x2time":{"nowait":false},"time2x":{"nowait":false},"drawLegends":{"nowait":false},"getColor":{"nowait":false}},"fields":{"src":{},"colors":{},"hslc":{},"btime":{},"etime":{},"duration":{},"linesYMax":{}}}
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
      
      //$LASTPOS=2000000;//user.Indicator:0
      _this.fillStyle="black";
      //$LASTPOS=2000019;//user.Indicator:19
      _this.text="?";
      //$LASTPOS=2000029;//user.Indicator:29
      _this.zOrder=- 10;
      //$LASTPOS=2000041;//user.Indicator:41
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=2000059;//user.Indicator:59
        _this.x=Tonyu.globals.$mouseX;
        //$LASTPOS=2000074;//user.Indicator:74
        _this.yy=Tonyu.globals.$mouseY;
        //$LASTPOS=2000090;//user.Indicator:90
        _this.i=_this.floor(_this.yy/Tonyu.globals.$h);
        //$LASTPOS=2000110;//user.Indicator:110
        _this.t=_this.timelines[_this.i];
        //$LASTPOS=2000130;//user.Indicator:130
        _this.y=_this.yy+50;
        //$LASTPOS=2000143;//user.Indicator:143
        if (_this.t&&_this.t.user) {
          //$LASTPOS=2000170;//user.Indicator:170
          _this.text=_this.t.user;
          
        } else {
          //$LASTPOS=2000194;//user.Indicator:194
          _this.text="";
        }
        //$LASTPOS=2000207;//user.Indicator:207
        _this.ti=_this.graph.x2time(_this.x);
        //$LASTPOS=2000231;//user.Indicator:231
        _this.d = new Date();
        
        //$LASTPOS=2000253;//user.Indicator:253
        _this.d.setTime(_this.ti*1000);
        //$LASTPOS=2000277;//user.Indicator:277
        _this.text+="\n"+[_this.d.getHours(),_this.d.getMinutes()].join(":");
        //$LASTPOS=2000333;//user.Indicator:333
        _this.update();
        
      }
    },
    fiber$main :function _trc_Indicator_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Indicator:0
      _this.fillStyle="black";
      //$LASTPOS=2000019;//user.Indicator:19
      _this.text="?";
      //$LASTPOS=2000029;//user.Indicator:29
      _this.zOrder=- 10;
      
      _thread.enter(function _trc_Indicator_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000041;//user.Indicator:41
          case 1:
            //$LASTPOS=2000059;//user.Indicator:59
            _this.x=Tonyu.globals.$mouseX;
            //$LASTPOS=2000074;//user.Indicator:74
            _this.yy=Tonyu.globals.$mouseY;
            //$LASTPOS=2000090;//user.Indicator:90
            _this.i=_this.floor(_this.yy/Tonyu.globals.$h);
            //$LASTPOS=2000110;//user.Indicator:110
            _this.t=_this.timelines[_this.i];
            //$LASTPOS=2000130;//user.Indicator:130
            _this.y=_this.yy+50;
            //$LASTPOS=2000143;//user.Indicator:143
            if (_this.t&&_this.t.user) {
              //$LASTPOS=2000170;//user.Indicator:170
              _this.text=_this.t.user;
              
            } else {
              //$LASTPOS=2000194;//user.Indicator:194
              _this.text="";
            }
            //$LASTPOS=2000207;//user.Indicator:207
            _this.ti=_this.graph.x2time(_this.x);
            //$LASTPOS=2000231;//user.Indicator:231
            _this.d = new Date();
            
            //$LASTPOS=2000253;//user.Indicator:253
            _this.d.setTime(_this.ti*1000);
            //$LASTPOS=2000277;//user.Indicator:277
            _this.text+="\n"+[_this.d.getHours(),_this.d.getMinutes()].join(":");
            //$LASTPOS=2000333;//user.Indicator:333
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
      
      //$LASTPOS=3000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=3000029;//user.Main:29
      _this.cols=["lime","red","blue","yellow","#f0f"];
      //$LASTPOS=3000075;//user.Main:75
      //$LASTPOS=3000079;//user.Main:79
      _this.i=0;for (; _this.i<50 ; _this.i++) {
        Tonyu.checkLoop();
        {
          //$LASTPOS=3000099;//user.Main:99
          _this.x=0;
          //$LASTPOS=3000108;//user.Main:108
          _this.n=0;
          //$LASTPOS=3000117;//user.Main:117
          //$LASTPOS=3000122;//user.Main:122
          _this.j=0;for (; _this.j<400 ; _this.j++) {
            Tonyu.checkLoop();
            {
              //$LASTPOS=3000147;//user.Main:147
              _this.n+=_this.rnd()*(0.1+_this.i/100);
              //$LASTPOS=3000177;//user.Main:177
              if (_this.n>=5) {
                break;
                
              }
              //$LASTPOS=3000202;//user.Main:202
              Tonyu.globals.$panel.fillStyle=_this.cols[_this.floor(_this.n)];
              //$LASTPOS=3000243;//user.Main:243
              _this.w=_this.rnd(10)+1;
              //$LASTPOS=3000264;//user.Main:264
              Tonyu.globals.$panel.fillRect(_this.x,_this.i*2,_this.w,2);
              //$LASTPOS=3000300;//user.Main:300
              _this.x+=_this.w;
            }
          }
          //$LASTPOS=3000316;//user.Main:316
          _this.update();
        }
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=3000029;//user.Main:29
      _this.cols=["lime","red","blue","yellow","#f0f"];
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000075;//user.Main:75
            //$LASTPOS=3000079;//user.Main:79
            _this.i=0;
          case 1:
            if (!(_this.i<50)) { __pc=4     ; break; }
            //$LASTPOS=3000099;//user.Main:99
            _this.x=0;
            //$LASTPOS=3000108;//user.Main:108
            _this.n=0;
            //$LASTPOS=3000117;//user.Main:117
            //$LASTPOS=3000122;//user.Main:122
            _this.j=0;for (; _this.j<400 ; _this.j++) {
              Tonyu.checkLoop();
              {
                //$LASTPOS=3000147;//user.Main:147
                _this.n+=_this.rnd()*(0.1+_this.i/100);
                //$LASTPOS=3000177;//user.Main:177
                if (_this.n>=5) {
                  break;
                  
                }
                //$LASTPOS=3000202;//user.Main:202
                Tonyu.globals.$panel.fillStyle=_this.cols[_this.floor(_this.n)];
                //$LASTPOS=3000243;//user.Main:243
                _this.w=_this.rnd(10)+1;
                //$LASTPOS=3000264;//user.Main:264
                Tonyu.globals.$panel.fillRect(_this.x,_this.i*2,_this.w,2);
                //$LASTPOS=3000300;//user.Main:300
                _this.x+=_this.w;
              }
            }
            //$LASTPOS=3000316;//user.Main:316
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

//# sourceMappingURL=concat.js.map