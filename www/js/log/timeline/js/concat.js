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
      var _it_1;
      var _it_2;
      var _it_3;
      
      //$LASTPOS=1000178;//user.FNlog:178
      _this.paramstr = location.href.replace(/^.*\?/,"").replace(/#.*$/,"");
      
      //$LASTPOS=1000245;//user.FNlog:245
      _this.params = Tonyu.globals.$params||{};
      
      //$LASTPOS=1000269;//user.FNlog:269
      _it_1=Tonyu.iterator(_this.paramstr.split("&"),1);
      while(_it_1.next()) {
        _this.k=_it_1[0];
        
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
      _this.day=_this.params.day||"2018-06-08";
      //$LASTPOS=1000504;//user.FNlog:504
      _this.ymd=_this.day.split("-");
      //$LASTPOS=1000524;//user.FNlog:524
      _this.day=new Date();
      //$LASTPOS=1000540;//user.FNlog:540
      _this.day.setMonth(_this.ymd[1]-1);
      //$LASTPOS=1000564;//user.FNlog:564
      _this.day.setYear(_this.ymd[0]-0);
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
      //$LASTPOS=1001152;//user.FNlog:1152
      _it_2=Tonyu.iterator(_this.files.split("\n"),2);
      while(_it_2.next()) {
        _this.cnt=_it_2[0];
        _this.line=_it_2[1];
        
        //$LASTPOS=1001223;//user.FNlog:1223
        if (_this.cnt==0) {
          continue;
          
        }
        //$LASTPOS=1001249;//user.FNlog:1249
        _this.d = _this.line.split("\t");
        
        //$LASTPOS=1001277;//user.FNlog:1277
        _this.user = _this.d[0];
        _this.filename = _this.d[1];
        _this.time = _this.d[2];
        
        //$LASTPOS=1001331;//user.FNlog:1331
        if (_this.puser!=_this.user) {
          //$LASTPOS=1001358;//user.FNlog:1358
          _this.timeline=[];
          //$LASTPOS=1001379;//user.FNlog:1379
          _this.timeline.user=_this.user;
          //$LASTPOS=1001407;//user.FNlog:1407
          _this.timelines.push(_this.timeline);
          //$LASTPOS=1001441;//user.FNlog:1441
          _this.fileappeared={};
          //$LASTPOS=1001466;//user.FNlog:1466
          _this.puser=_this.user;
          
        }
        //$LASTPOS=1001488;//user.FNlog:1488
        if (_this.time<_this.etime) {
          //$LASTPOS=1001514;//user.FNlog:1514
          _this.timeline.end=_this.time;
          //$LASTPOS=1001541;//user.FNlog:1541
          if (! _this.fileappeared[_this.filename]) {
            //$LASTPOS=1001584;//user.FNlog:1584
            _this.fileappeared[_this.filename]=1;
            //$LASTPOS=1001622;//user.FNlog:1622
            _this.filerank[_this.filename]=(_this.filerank[_this.filename]||0)+1;
            
          }
          //$LASTPOS=1001686;//user.FNlog:1686
          _this.timeline.push({filename: _this.filename,time: _this.time});
          
        }
        
      }
      //$LASTPOS=1001728;//user.FNlog:1728
      _this.fileranka=[];
      //$LASTPOS=1001742;//user.FNlog:1742
      _it_3=Tonyu.iterator(_this.filerank,2);
      while(_it_3.next()) {
        _this.filename=_it_3[0];
        _this.count=_it_3[1];
        
        //$LASTPOS=1001785;//user.FNlog:1785
        _this.fileranka.push({filename: _this.filename,count: _this.count});
        
      }
      //$LASTPOS=1001819;//user.FNlog:1819
      _this.fileranka=_this.fileranka.sort((function anonymous_1844(a,b) {
        
        return b.count-a.count;
      }));
      //$LASTPOS=1001884;//user.FNlog:1884
      _this.cols=["#f00","#0f0","#00f","#f0f","#0ff","#ff0","#000","#800","#080","#008","#808","#088","#880"];
      //$LASTPOS=1001983;//user.FNlog:1983
      //$LASTPOS=1001988;//user.FNlog:1988
      _this.i=0;for (; _this.i<_this.min(_this.cols.length,_this.fileranka.length) ; _this.i++) {
        Tonyu.checkLoop();
        //$LASTPOS=1002033;//user.FNlog:2033
        _this.topfile[_this.fileranka[_this.i].filename]=_this.cols[_this.i];
      }
      //$LASTPOS=1002073;//user.FNlog:2073
      _this.timelines=_this.timelines.sort((function anonymous_2098(a,b) {
        
        return a.end-b.end;
      }));
      //$LASTPOS=1002134;//user.FNlog:2134
      new Tonyu.classes.user.Graph({src: _this});
    },
    fiber$main :function _trc_FNlog_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var _it_1;
      var _it_2;
      var _it_3;
      
      //$LASTPOS=1000178;//user.FNlog:178
      _this.paramstr = location.href.replace(/^.*\?/,"").replace(/#.*$/,"");
      
      //$LASTPOS=1000245;//user.FNlog:245
      _this.params = Tonyu.globals.$params||{};
      
      //$LASTPOS=1000269;//user.FNlog:269
      _it_1=Tonyu.iterator(_this.paramstr.split("&"),1);
      while(_it_1.next()) {
        _this.k=_it_1[0];
        
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
      _this.day=_this.params.day||"2018-06-08";
      //$LASTPOS=1000504;//user.FNlog:504
      _this.ymd=_this.day.split("-");
      //$LASTPOS=1000524;//user.FNlog:524
      _this.day=new Date();
      //$LASTPOS=1000540;//user.FNlog:540
      _this.day.setMonth(_this.ymd[1]-1);
      //$LASTPOS=1000564;//user.FNlog:564
      _this.day.setYear(_this.ymd[0]-0);
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
            
            //$LASTPOS=1001152;//user.FNlog:1152
            _it_2=Tonyu.iterator(_this.files.split("\n"),2);
            while(_it_2.next()) {
              _this.cnt=_it_2[0];
              _this.line=_it_2[1];
              
              //$LASTPOS=1001223;//user.FNlog:1223
              if (_this.cnt==0) {
                continue;
                
              }
              //$LASTPOS=1001249;//user.FNlog:1249
              _this.d = _this.line.split("\t");
              
              //$LASTPOS=1001277;//user.FNlog:1277
              _this.user = _this.d[0];
              _this.filename = _this.d[1];
              _this.time = _this.d[2];
              
              //$LASTPOS=1001331;//user.FNlog:1331
              if (_this.puser!=_this.user) {
                //$LASTPOS=1001358;//user.FNlog:1358
                _this.timeline=[];
                //$LASTPOS=1001379;//user.FNlog:1379
                _this.timeline.user=_this.user;
                //$LASTPOS=1001407;//user.FNlog:1407
                _this.timelines.push(_this.timeline);
                //$LASTPOS=1001441;//user.FNlog:1441
                _this.fileappeared={};
                //$LASTPOS=1001466;//user.FNlog:1466
                _this.puser=_this.user;
                
              }
              //$LASTPOS=1001488;//user.FNlog:1488
              if (_this.time<_this.etime) {
                //$LASTPOS=1001514;//user.FNlog:1514
                _this.timeline.end=_this.time;
                //$LASTPOS=1001541;//user.FNlog:1541
                if (! _this.fileappeared[_this.filename]) {
                  //$LASTPOS=1001584;//user.FNlog:1584
                  _this.fileappeared[_this.filename]=1;
                  //$LASTPOS=1001622;//user.FNlog:1622
                  _this.filerank[_this.filename]=(_this.filerank[_this.filename]||0)+1;
                  
                }
                //$LASTPOS=1001686;//user.FNlog:1686
                _this.timeline.push({filename: _this.filename,time: _this.time});
                
              }
              
            }
            //$LASTPOS=1001728;//user.FNlog:1728
            _this.fileranka=[];
            //$LASTPOS=1001742;//user.FNlog:1742
            _it_3=Tonyu.iterator(_this.filerank,2);
            while(_it_3.next()) {
              _this.filename=_it_3[0];
              _this.count=_it_3[1];
              
              //$LASTPOS=1001785;//user.FNlog:1785
              _this.fileranka.push({filename: _this.filename,count: _this.count});
              
            }
            //$LASTPOS=1001819;//user.FNlog:1819
            _this.fileranka=_this.fileranka.sort((function anonymous_1844(a,b) {
              
              return b.count-a.count;
            }));
            //$LASTPOS=1001884;//user.FNlog:1884
            _this.cols=["#f00","#0f0","#00f","#f0f","#0ff","#ff0","#000","#800","#080","#008","#808","#088","#880"];
            //$LASTPOS=1001983;//user.FNlog:1983
            //$LASTPOS=1001988;//user.FNlog:1988
            _this.i=0;for (; _this.i<_this.min(_this.cols.length,_this.fileranka.length) ; _this.i++) {
              Tonyu.checkLoop();
              //$LASTPOS=1002033;//user.FNlog:2033
              _this.topfile[_this.fileranka[_this.i].filename]=_this.cols[_this.i];
            }
            //$LASTPOS=1002073;//user.FNlog:2073
            _this.timelines=_this.timelines.sort((function anonymous_2098(a,b) {
              
              return a.end-b.end;
            }));
            //$LASTPOS=1002134;//user.FNlog:2134
            new Tonyu.classes.user.Graph({src: _this});
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"paramstr":{},"params":{},"k":{},"vals":{},"btime":{},"duration":{},"etime":{},"timelines":{},"filerank":{},"topfile":{},"d":{},"user":{},"filename":{},"time":{},"count":{},"cnt":{},"day":{},"ymd":{},"classid":{},"timezone":{},"url":{},"files":{},"line":{},"puser":{},"timeline":{},"fileappeared":{},"fileranka":{},"cols":{},"i":{}}}
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
      
      //$LASTPOS=2000000;//user.Graph:0
      "field strict";
      
      //$LASTPOS=2000031;//user.Graph:31
      _this.colors = {};
      
      //$LASTPOS=2000046;//user.Graph:46
      Tonyu.globals.$h=5;
      //$LASTPOS=2000053;//user.Graph:53
      _this.hslc = 0;
      
      
      //$LASTPOS=2000091;//user.Graph:91
      _this.setRange();
      
      //$LASTPOS=2000181;//user.Graph:181
      new Tonyu.classes.user.Indicator({graph: _this,timelines: _this.src.timelines,layer: Tonyu.globals.$frontLayer});
      //$LASTPOS=2000251;//user.Graph:251
      _this.drawLines();
      //$LASTPOS=2000264;//user.Graph:264
      _this.drawLegends();
      //$LASTPOS=2000279;//user.Graph:279
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=2000297;//user.Graph:297
        if (_this.getkey("I")==1) {
          //$LASTPOS=2000327;//user.Graph:327
          _this.zoomIn(Tonyu.globals.$mouseX);
          //$LASTPOS=2000352;//user.Graph:352
          _this.drawLines();
          
        }
        //$LASTPOS=2000375;//user.Graph:375
        if (_this.getkey("O")==1) {
          //$LASTPOS=2000405;//user.Graph:405
          _this.zoomOut(Tonyu.globals.$mouseX);
          //$LASTPOS=2000431;//user.Graph:431
          _this.drawLines();
          
        }
        //$LASTPOS=2000454;//user.Graph:454
        if (_this.getkey("mouseleft")==1) {
          //$LASTPOS=2000492;//user.Graph:492
          _this.t = _this.y2timeline(Tonyu.globals.$mouseY);
          
          //$LASTPOS=2000527;//user.Graph:527
          if (_this.t) {
            //$LASTPOS=2000549;//user.Graph:549
            _this.url = "https://bitarrow.eplang.jp/bitarrowbeta/a.php?TeacherLog/view1&user="+_this.t.user+"&day="+_this.floor(_this.btime);
            
            //$LASTPOS=2000699;//user.Graph:699
            Tonyu.globals.$WebPage.openNewWindow(_this.url);
            
          }
          
        }
        //$LASTPOS=2000748;//user.Graph:748
        _this.update();
        
      }
      //$LASTPOS=2000760;//user.Graph:760
      _this.p=- 1;
    },
    fiber$main :function _trc_Graph_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Graph:0
      "field strict";
      
      //$LASTPOS=2000031;//user.Graph:31
      _this.colors = {};
      
      //$LASTPOS=2000046;//user.Graph:46
      Tonyu.globals.$h=5;
      //$LASTPOS=2000053;//user.Graph:53
      _this.hslc = 0;
      
      
      
      _thread.enter(function _trc_Graph_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000091;//user.Graph:91
            _this.fiber$setRange(_thread);
            __pc=1;return;
          case 1:
            
            
            //$LASTPOS=2000181;//user.Graph:181
            new Tonyu.classes.user.Indicator({graph: _this,timelines: _this.src.timelines,layer: Tonyu.globals.$frontLayer});
            //$LASTPOS=2000251;//user.Graph:251
            _this.fiber$drawLines(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2000264;//user.Graph:264
            _this.fiber$drawLegends(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=2000279;//user.Graph:279
          case 4:
            //$LASTPOS=2000297;//user.Graph:297
            if (!(_this.getkey("I")==1)) { __pc=7     ; break; }
            //$LASTPOS=2000327;//user.Graph:327
            _this.fiber$zoomIn(_thread, Tonyu.globals.$mouseX);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=2000352;//user.Graph:352
            _this.fiber$drawLines(_thread);
            __pc=6;return;
          case 6:
            
          case 7     :
            
            //$LASTPOS=2000375;//user.Graph:375
            if (!(_this.getkey("O")==1)) { __pc=10    ; break; }
            //$LASTPOS=2000405;//user.Graph:405
            _this.fiber$zoomOut(_thread, Tonyu.globals.$mouseX);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=2000431;//user.Graph:431
            _this.fiber$drawLines(_thread);
            __pc=9;return;
          case 9:
            
          case 10    :
            
            //$LASTPOS=2000454;//user.Graph:454
            if (!(_this.getkey("mouseleft")==1)) { __pc=12    ; break; }
            //$LASTPOS=2000492;//user.Graph:492
            _this.fiber$y2timeline(_thread, Tonyu.globals.$mouseY);
            __pc=11;return;
          case 11:
            _this.t=_thread.retVal;
            
            //$LASTPOS=2000527;//user.Graph:527
            if (_this.t) {
              //$LASTPOS=2000549;//user.Graph:549
              _this.url = "https://bitarrow.eplang.jp/bitarrowbeta/a.php?TeacherLog/view1&user="+_this.t.user+"&day="+_this.floor(_this.btime);
              
              //$LASTPOS=2000699;//user.Graph:699
              Tonyu.globals.$WebPage.openNewWindow(_this.url);
              
            }
          case 12    :
            
            //$LASTPOS=2000748;//user.Graph:748
            _this.fiber$update(_thread);
            __pc=13;return;
          case 13:
            
            __pc=4;break;
          case 14    :
            
            //$LASTPOS=2000760;//user.Graph:760
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
      
      //$LASTPOS=2000788;//user.Graph:788
      i = _this.floor(yy/Tonyu.globals.$h);
      
      //$LASTPOS=2000812;//user.Graph:812
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
      
      //$LASTPOS=2000788;//user.Graph:788
      i = _this.floor(yy/Tonyu.globals.$h);
      
      //$LASTPOS=2000812;//user.Graph:812
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
      var _it_13;
      var e;
      var _it_14;
      var filename;
      var time;
      
      //$LASTPOS=2000871;//user.Graph:871
      if (_this.linesYMax) {
        //$LASTPOS=2000896;//user.Graph:896
        Tonyu.globals.$panel.fillStyle="white";
        //$LASTPOS=2000930;//user.Graph:930
        Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,_this.linesYMax);
        
      }
      //$LASTPOS=2000985;//user.Graph:985
      cnt = 0;
      
      
      //$LASTPOS=2001012;//user.Graph:1012
      _this.y=0;
      //$LASTPOS=2001021;//user.Graph:1021
      _it_13=Tonyu.iterator(_this.src.timelines,1);
      while(_it_13.next()) {
        timeline=_it_13[0];
        
        //$LASTPOS=2001067;//user.Graph:1067
        _it_14=Tonyu.iterator(timeline,1);
        while(_it_14.next()) {
          e=_it_14[0];
          
          //$LASTPOS=2001105;//user.Graph:1105
          filename = e.filename;
          time = e.time;
          
          //$LASTPOS=2001155;//user.Graph:1155
          _this.x=_this.time2x(time);
          //$LASTPOS=2001183;//user.Graph:1183
          if (px) {
            //$LASTPOS=2001209;//user.Graph:1209
            Tonyu.globals.$panel.fillRect(px,_this.y,_this.clamp((_this.x-px),1,10),Tonyu.globals.$h);
            
          }
          //$LASTPOS=2001282;//user.Graph:1282
          px=_this.x;
          //$LASTPOS=2001300;//user.Graph:1300
          Tonyu.globals.$panel.fillStyle=_this.getColor(filename);
          //$LASTPOS=2001349;//user.Graph:1349
          cnt++;
          //$LASTPOS=2001368;//user.Graph:1368
          if (cnt%1000==0) {
            //$LASTPOS=2001385;//user.Graph:1385
            _this.update();
          }
          
        }
        //$LASTPOS=2001413;//user.Graph:1413
        _this.y+=Tonyu.globals.$h;
        
      }
      //$LASTPOS=2001430;//user.Graph:1430
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
      var _it_13;
      var e;
      var _it_14;
      var filename;
      var time;
      
      //$LASTPOS=2000871;//user.Graph:871
      if (_this.linesYMax) {
        //$LASTPOS=2000896;//user.Graph:896
        Tonyu.globals.$panel.fillStyle="white";
        //$LASTPOS=2000930;//user.Graph:930
        Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,_this.linesYMax);
        
      }
      //$LASTPOS=2000985;//user.Graph:985
      cnt = 0;
      
      
      //$LASTPOS=2001012;//user.Graph:1012
      _this.y=0;
      
      _thread.enter(function _trc_Graph_ent_drawLines(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2001021;//user.Graph:1021
            _it_13=Tonyu.iterator(_this.src.timelines,1);
          case 1:
            if (!(_it_13.next())) { __pc=8     ; break; }
            timeline=_it_13[0];
            
            //$LASTPOS=2001067;//user.Graph:1067
            _it_14=Tonyu.iterator(timeline,1);
          case 2:
            if (!(_it_14.next())) { __pc=7     ; break; }
            e=_it_14[0];
            
            //$LASTPOS=2001105;//user.Graph:1105
            filename = e.filename;
            time = e.time;
            
            //$LASTPOS=2001155;//user.Graph:1155
            _this.fiber$time2x(_thread, time);
            __pc=3;return;
          case 3:
            _this.x=_thread.retVal;
            
            //$LASTPOS=2001183;//user.Graph:1183
            if (px) {
              //$LASTPOS=2001209;//user.Graph:1209
              Tonyu.globals.$panel.fillRect(px,_this.y,_this.clamp((_this.x-px),1,10),Tonyu.globals.$h);
              
            }
            //$LASTPOS=2001282;//user.Graph:1282
            px=_this.x;
            //$LASTPOS=2001300;//user.Graph:1300
            _this.fiber$getColor(_thread, filename);
            __pc=4;return;
          case 4:
            Tonyu.globals.$panel.fillStyle=_thread.retVal;
            
            //$LASTPOS=2001349;//user.Graph:1349
            cnt++;
            //$LASTPOS=2001368;//user.Graph:1368
            if (!(cnt%1000==0)) { __pc=6     ; break; }
            //$LASTPOS=2001385;//user.Graph:1385
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
          case 6     :
            
            __pc=2;break;
          case 7     :
            
            //$LASTPOS=2001413;//user.Graph:1413
            _this.y+=Tonyu.globals.$h;
            __pc=1;break;
          case 8     :
            
            //$LASTPOS=2001430;//user.Graph:1430
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
      
      //$LASTPOS=2001462;//user.Graph:1462
      t = _this.x2time(x);
      
      //$LASTPOS=2001483;//user.Graph:1483
      nd = _this.duration/2;
      
      //$LASTPOS=2001506;//user.Graph:1506
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
            //$LASTPOS=2001462;//user.Graph:1462
            _this.fiber$x2time(_thread, x);
            __pc=1;return;
          case 1:
            t=_thread.retVal;
            
            //$LASTPOS=2001483;//user.Graph:1483
            nd = _this.duration/2;
            
            //$LASTPOS=2001506;//user.Graph:1506
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
      
      //$LASTPOS=2001551;//user.Graph:1551
      t = _this.x2time(x);
      
      //$LASTPOS=2001572;//user.Graph:1572
      nd = _this.duration*2;
      
      //$LASTPOS=2001595;//user.Graph:1595
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
            //$LASTPOS=2001551;//user.Graph:1551
            _this.fiber$x2time(_thread, x);
            __pc=1;return;
          case 1:
            t=_thread.retVal;
            
            //$LASTPOS=2001572;//user.Graph:1572
            nd = _this.duration*2;
            
            //$LASTPOS=2001595;//user.Graph:1595
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
      
      //$LASTPOS=2001643;//user.Graph:1643
      _this.btime=_this.clamp(b||_this.src.btime,_this.src.btime,_this.src.etime);
      //$LASTPOS=2001694;//user.Graph:1694
      _this.etime=_this.clamp(e||_this.src.etime,_this.src.btime,_this.src.etime);
      //$LASTPOS=2001745;//user.Graph:1745
      _this.duration=_this.etime-_this.btime;
    },
    fiber$setRange :function _trc_Graph_f_setRange(_thread,b,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2001643;//user.Graph:1643
      _this.btime=_this.clamp(b||_this.src.btime,_this.src.btime,_this.src.etime);
      //$LASTPOS=2001694;//user.Graph:1694
      _this.etime=_this.clamp(e||_this.src.etime,_this.src.btime,_this.src.etime);
      //$LASTPOS=2001745;//user.Graph:1745
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
      var _it_27;
      
      //$LASTPOS=2001917;//user.Graph:1917
      sz = 12;
      
      //$LASTPOS=2001932;//user.Graph:1932
      _this.x=10;
      //$LASTPOS=2001937;//user.Graph:1937
      _this.y+=30;
      //$LASTPOS=2001948;//user.Graph:1948
      by = _this.y;
      
      //$LASTPOS=2001962;//user.Graph:1962
      _it_27=Tonyu.iterator(_this.src.fileranka,2);
      while(_it_27.next()) {
        i=_it_27[0];
        r=_it_27[1];
        
        //$LASTPOS=2002003;//user.Graph:2003
        if (i>=_this.src.cols.length) {
          break;
          
        }
        //$LASTPOS=2002042;//user.Graph:2042
        Tonyu.globals.$panel.fillStyle=_this.getColor(r.filename);
        //$LASTPOS=2002125;//user.Graph:2125
        Tonyu.globals.$panel.fillText(r.filename+"("+r.count+")",_this.x,_this.y,sz,"left");
        //$LASTPOS=2002192;//user.Graph:2192
        _this.y+=sz;
        //$LASTPOS=2002207;//user.Graph:2207
        if (_this.y>Tonyu.globals.$screenHeight-sz) {
          //$LASTPOS=2002245;//user.Graph:2245
          _this.y=by;
          //$LASTPOS=2002263;//user.Graph:2263
          _this.x+=100;
          
        }
        
      }
      //$LASTPOS=2002291;//user.Graph:2291
      _this.y+=sz;
      //$LASTPOS=2002302;//user.Graph:2302
      Tonyu.globals.$panel.fillStyle="black";
      //$LASTPOS=2002332;//user.Graph:2332
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
      var _it_27;
      
      //$LASTPOS=2001917;//user.Graph:1917
      sz = 12;
      
      //$LASTPOS=2001932;//user.Graph:1932
      _this.x=10;
      //$LASTPOS=2001937;//user.Graph:1937
      _this.y+=30;
      //$LASTPOS=2001948;//user.Graph:1948
      by = _this.y;
      
      
      _thread.enter(function _trc_Graph_ent_drawLegends(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2001962;//user.Graph:1962
            _it_27=Tonyu.iterator(_this.src.fileranka,2);
          case 1:
            if (!(_it_27.next())) { __pc=4     ; break; }
            i=_it_27[0];
            r=_it_27[1];
            
            //$LASTPOS=2002003;//user.Graph:2003
            if (!(i>=_this.src.cols.length)) { __pc=2     ; break; }
            __pc=4     ; break;
            
          case 2     :
            
            //$LASTPOS=2002042;//user.Graph:2042
            _this.fiber$getColor(_thread, r.filename);
            __pc=3;return;
          case 3:
            Tonyu.globals.$panel.fillStyle=_thread.retVal;
            
            //$LASTPOS=2002125;//user.Graph:2125
            Tonyu.globals.$panel.fillText(r.filename+"("+r.count+")",_this.x,_this.y,sz,"left");
            //$LASTPOS=2002192;//user.Graph:2192
            _this.y+=sz;
            //$LASTPOS=2002207;//user.Graph:2207
            if (_this.y>Tonyu.globals.$screenHeight-sz) {
              //$LASTPOS=2002245;//user.Graph:2245
              _this.y=by;
              //$LASTPOS=2002263;//user.Graph:2263
              _this.x+=100;
              
            }
            __pc=1;break;
          case 4     :
            
            //$LASTPOS=2002291;//user.Graph:2291
            _this.y+=sz;
            //$LASTPOS=2002302;//user.Graph:2302
            Tonyu.globals.$panel.fillStyle="black";
            //$LASTPOS=2002332;//user.Graph:2332
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
      //$LASTPOS=2002456;//user.Graph:2456
      if (! _this.src.topfile[file]) {
        return "#888";
      }
      //$LASTPOS=2002531;//user.Graph:2531
      if (_this.colors[file]) {
        return _this.colors[file];
      }
      //$LASTPOS=2002574;//user.Graph:2574
      _this.colors[file]=new Tonyu.classes.kernel.Color({h: _this.hslc,s: 1,l: _this.hslc>360?0.3:0.8});
      //$LASTPOS=2002668;//user.Graph:2668
      _this.hslc+=42;
      return _this.colors[file];
    },
    fiber$getColor :function _trc_Graph_f_getColor(_thread,file) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.src.topfile[file]||"#888";return;
      
      //$LASTPOS=2002456;//user.Graph:2456
      if (! _this.src.topfile[file]) {
        _thread.retVal="#888";return;
        
      }
      //$LASTPOS=2002531;//user.Graph:2531
      if (_this.colors[file]) {
        _thread.retVal=_this.colors[file];return;
        
      }
      //$LASTPOS=2002574;//user.Graph:2574
      _this.colors[file]=new Tonyu.classes.kernel.Color({h: _this.hslc,s: 1,l: _this.hslc>360?0.3:0.8});
      //$LASTPOS=2002668;//user.Graph:2668
      _this.hslc+=42;
      _thread.retVal=_this.colors[file];return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"y2timeline":{"nowait":false},"drawLines":{"nowait":false},"zoomIn":{"nowait":false},"zoomOut":{"nowait":false},"setRange":{"nowait":false},"x2time":{"nowait":false},"time2x":{"nowait":false},"drawLegends":{"nowait":false},"getColor":{"nowait":false}},"fields":{"src":{},"colors":{},"hslc":{},"btime":{},"etime":{},"duration":{},"linesYMax":{},"t":{},"url":{}}}
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
      
      //$LASTPOS=3000000;//user.Indicator:0
      _this.fillStyle="black";
      //$LASTPOS=3000019;//user.Indicator:19
      _this.text="?";
      //$LASTPOS=3000029;//user.Indicator:29
      _this.zOrder=- 10;
      //$LASTPOS=3000041;//user.Indicator:41
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=3000059;//user.Indicator:59
        _this.x=Tonyu.globals.$mouseX;
        //$LASTPOS=3000074;//user.Indicator:74
        _this.yy=Tonyu.globals.$mouseY;
        //$LASTPOS=3000090;//user.Indicator:90
        _this.i=_this.floor(_this.yy/Tonyu.globals.$h);
        //$LASTPOS=3000110;//user.Indicator:110
        _this.t=_this.timelines[_this.i];
        //$LASTPOS=3000130;//user.Indicator:130
        _this.y=_this.yy+50;
        //$LASTPOS=3000143;//user.Indicator:143
        if (_this.t&&_this.t.user) {
          //$LASTPOS=3000170;//user.Indicator:170
          _this.text=_this.t.user;
          
        } else {
          //$LASTPOS=3000194;//user.Indicator:194
          _this.text="";
        }
        //$LASTPOS=3000207;//user.Indicator:207
        _this.ti=_this.graph.x2time(_this.x);
        //$LASTPOS=3000231;//user.Indicator:231
        _this.d = new Date();
        
        //$LASTPOS=3000253;//user.Indicator:253
        _this.d.setTime(_this.ti*1000);
        //$LASTPOS=3000277;//user.Indicator:277
        _this.text+="\n"+[_this.d.getHours(),_this.d.getMinutes()].join(":");
        //$LASTPOS=3000333;//user.Indicator:333
        _this.update();
        
      }
    },
    fiber$main :function _trc_Indicator_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000000;//user.Indicator:0
      _this.fillStyle="black";
      //$LASTPOS=3000019;//user.Indicator:19
      _this.text="?";
      //$LASTPOS=3000029;//user.Indicator:29
      _this.zOrder=- 10;
      
      _thread.enter(function _trc_Indicator_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000041;//user.Indicator:41
          case 1:
            //$LASTPOS=3000059;//user.Indicator:59
            _this.x=Tonyu.globals.$mouseX;
            //$LASTPOS=3000074;//user.Indicator:74
            _this.yy=Tonyu.globals.$mouseY;
            //$LASTPOS=3000090;//user.Indicator:90
            _this.i=_this.floor(_this.yy/Tonyu.globals.$h);
            //$LASTPOS=3000110;//user.Indicator:110
            _this.t=_this.timelines[_this.i];
            //$LASTPOS=3000130;//user.Indicator:130
            _this.y=_this.yy+50;
            //$LASTPOS=3000143;//user.Indicator:143
            if (_this.t&&_this.t.user) {
              //$LASTPOS=3000170;//user.Indicator:170
              _this.text=_this.t.user;
              
            } else {
              //$LASTPOS=3000194;//user.Indicator:194
              _this.text="";
            }
            //$LASTPOS=3000207;//user.Indicator:207
            _this.ti=_this.graph.x2time(_this.x);
            //$LASTPOS=3000231;//user.Indicator:231
            _this.d = new Date();
            
            //$LASTPOS=3000253;//user.Indicator:253
            _this.d.setTime(_this.ti*1000);
            //$LASTPOS=3000277;//user.Indicator:277
            _this.text+="\n"+[_this.d.getHours(),_this.d.getMinutes()].join(":");
            //$LASTPOS=3000333;//user.Indicator:333
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
      
      //$LASTPOS=4000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=4000029;//user.Main:29
      _this.cols=["lime","red","blue","yellow","#f0f"];
      //$LASTPOS=4000075;//user.Main:75
      //$LASTPOS=4000079;//user.Main:79
      _this.i=0;for (; _this.i<50 ; _this.i++) {
        Tonyu.checkLoop();
        {
          //$LASTPOS=4000099;//user.Main:99
          _this.x=0;
          //$LASTPOS=4000108;//user.Main:108
          _this.n=0;
          //$LASTPOS=4000117;//user.Main:117
          //$LASTPOS=4000122;//user.Main:122
          _this.j=0;for (; _this.j<400 ; _this.j++) {
            Tonyu.checkLoop();
            {
              //$LASTPOS=4000147;//user.Main:147
              _this.n+=_this.rnd()*(0.1+_this.i/100);
              //$LASTPOS=4000177;//user.Main:177
              if (_this.n>=5) {
                break;
                
              }
              //$LASTPOS=4000202;//user.Main:202
              Tonyu.globals.$panel.fillStyle=_this.cols[_this.floor(_this.n)];
              //$LASTPOS=4000243;//user.Main:243
              _this.w=_this.rnd(10)+1;
              //$LASTPOS=4000264;//user.Main:264
              Tonyu.globals.$panel.fillRect(_this.x,_this.i*2,_this.w,2);
              //$LASTPOS=4000300;//user.Main:300
              _this.x+=_this.w;
            }
          }
          //$LASTPOS=4000316;//user.Main:316
          _this.update();
        }
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=4000029;//user.Main:29
      _this.cols=["lime","red","blue","yellow","#f0f"];
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000075;//user.Main:75
            //$LASTPOS=4000079;//user.Main:79
            _this.i=0;
          case 1:
            if (!(_this.i<50)) { __pc=4     ; break; }
            //$LASTPOS=4000099;//user.Main:99
            _this.x=0;
            //$LASTPOS=4000108;//user.Main:108
            _this.n=0;
            //$LASTPOS=4000117;//user.Main:117
            //$LASTPOS=4000122;//user.Main:122
            _this.j=0;for (; _this.j<400 ; _this.j++) {
              Tonyu.checkLoop();
              {
                //$LASTPOS=4000147;//user.Main:147
                _this.n+=_this.rnd()*(0.1+_this.i/100);
                //$LASTPOS=4000177;//user.Main:177
                if (_this.n>=5) {
                  break;
                  
                }
                //$LASTPOS=4000202;//user.Main:202
                Tonyu.globals.$panel.fillStyle=_this.cols[_this.floor(_this.n)];
                //$LASTPOS=4000243;//user.Main:243
                _this.w=_this.rnd(10)+1;
                //$LASTPOS=4000264;//user.Main:264
                Tonyu.globals.$panel.fillRect(_this.x,_this.i*2,_this.w,2);
                //$LASTPOS=4000300;//user.Main:300
                _this.x+=_this.w;
              }
            }
            //$LASTPOS=4000316;//user.Main:316
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