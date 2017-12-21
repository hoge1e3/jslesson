Tonyu.klass.define({
  fullName: 'user.Plot',
  shortName: 'Plot',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Plot_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Plot_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Plot_initialize(div) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000091;//user.Plot:91
      _this._place=div;
      $LASTPOS=1000113;//user.Plot:113
      _this._xaxname="";
      $LASTPOS=1000136;//user.Plot:136
      _this._yaxname="";
      $LASTPOS=1000159;//user.Plot:159
      _this._xrange;
      $LASTPOS=1000178;//user.Plot:178
      _this._yrange;
      $LASTPOS=1000197;//user.Plot:197
      _this._isDrawCor=false;
      $LASTPOS=1000225;//user.Plot:225
      _this._corObj={};
    },
    setCorrelation :function _trc_Plot_setCorrelation(src,x,y,min,max,interval) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000302;//user.Plot:302
      if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
        return _this;
        
      }
      $LASTPOS=1000403;//user.Plot:403
      console.log(min,max,interval);
      $LASTPOS=1000439;//user.Plot:439
      _this._corObj=_this._correlation(src,x,y,min,max,interval);
      $LASTPOS=1000497;//user.Plot:497
      _this._isDrawCor=true;
    },
    fiber$setCorrelation :function _trc_Plot_f_setCorrelation(_thread,src,x,y,min,max,interval) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000302;//user.Plot:302
      if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
        _thread.retVal=_this;return;
        
        
      }
      $LASTPOS=1000403;//user.Plot:403
      console.log(min,max,interval);
      
      _thread.enter(function _trc_Plot_ent_setCorrelation(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000439;//user.Plot:439
            _this.fiber$_correlation(_thread, src, x, y, min, max, interval);
            __pc=1;return;
          case 1:
            _this._corObj=_thread.retVal;
            
            $LASTPOS=1000497;//user.Plot:497
            _this._isDrawCor=true;
            _thread.exit(_this);return;
          }
        }
      });
    },
    setAxisText :function _trc_Plot_setAxisText(x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000555;//user.Plot:555
      _this._xaxname=x;
      $LASTPOS=1000577;//user.Plot:577
      _this._yaxname=y;
    },
    fiber$setAxisText :function _trc_Plot_f_setAxisText(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000555;//user.Plot:555
      _this._xaxname=x;
      $LASTPOS=1000577;//user.Plot:577
      _this._yaxname=y;
      
      _thread.retVal=_this;return;
    },
    setRange :function _trc_Plot_setRange(x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000627;//user.Plot:627
      _this._xrange=x;
      $LASTPOS=1000648;//user.Plot:648
      _this._yrange=y;
    },
    fiber$setRange :function _trc_Plot_f_setRange(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000627;//user.Plot:627
      _this._xrange=x;
      $LASTPOS=1000648;//user.Plot:648
      _this._yrange=y;
      
      _thread.retVal=_this;return;
    },
    lineChart :function _trc_Plot_lineChart(src,xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000710;//user.Plot:710
      _this._drawGraph(src,"line",xaxis,yaxis);
    },
    fiber$lineChart :function _trc_Plot_f_lineChart(_thread,src,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Plot_ent_lineChart(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000710;//user.Plot:710
            _this.fiber$_drawGraph(_thread, src, "line", xaxis, yaxis);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    barChart :function _trc_Plot_barChart(src,xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000791;//user.Plot:791
      _this._drawGraph(src,"bar",xaxis,yaxis);
    },
    fiber$barChart :function _trc_Plot_f_barChart(_thread,src,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Plot_ent_barChart(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1000791;//user.Plot:791
            _this.fiber$_drawGraph(_thread, src, "bar", xaxis, yaxis);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    _min :function _trc_Plot__min(src,k) {
      "use strict";
      var _this=this;
      var ary;
      var i;
      
      $LASTPOS=1000857;//user.Plot:857
      ary = new Array();
      
      $LASTPOS=1000883;//user.Plot:883
      $LASTPOS=1000887;//user.Plot:887
      i = 0;
      for (; i<src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1000923;//user.Plot:923
          ary.push(src[i][k]);
        }
      }
      $LASTPOS=1000956;//user.Plot:956
      ary.sort((function anonymous_965(a,b) {
        
        return a-b;
      }));
      return ary[0];
    },
    fiber$_min :function _trc_Plot_f__min(_thread,src,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ary;
      var i;
      
      $LASTPOS=1000857;//user.Plot:857
      ary = new Array();
      
      $LASTPOS=1000883;//user.Plot:883
      $LASTPOS=1000887;//user.Plot:887
      i = 0;
      for (; i<src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1000923;//user.Plot:923
          ary.push(src[i][k]);
        }
      }
      $LASTPOS=1000956;//user.Plot:956
      ary.sort((function anonymous_965(a,b) {
        
        return a-b;
      }));
      _thread.retVal=ary[0];return;
      
      
      _thread.retVal=_this;return;
    },
    _max :function _trc_Plot__max(src,k) {
      "use strict";
      var _this=this;
      var ary;
      var i;
      
      $LASTPOS=1001045;//user.Plot:1045
      ary = new Array();
      
      $LASTPOS=1001071;//user.Plot:1071
      $LASTPOS=1001075;//user.Plot:1075
      i = 0;
      for (; i<src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1001111;//user.Plot:1111
          ary.push(src[i][k]);
        }
      }
      $LASTPOS=1001144;//user.Plot:1144
      ary.sort((function anonymous_1153(a,b) {
        
        return b-a;
      }));
      return ary[0];
    },
    fiber$_max :function _trc_Plot_f__max(_thread,src,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ary;
      var i;
      
      $LASTPOS=1001045;//user.Plot:1045
      ary = new Array();
      
      $LASTPOS=1001071;//user.Plot:1071
      $LASTPOS=1001075;//user.Plot:1075
      i = 0;
      for (; i<src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1001111;//user.Plot:1111
          ary.push(src[i][k]);
        }
      }
      $LASTPOS=1001144;//user.Plot:1144
      ary.sort((function anonymous_1153(a,b) {
        
        return b-a;
      }));
      _thread.retVal=ary[0];return;
      
      
      _thread.retVal=_this;return;
    },
    scatterChart :function _trc_Plot_scatterChart(src,xaxis,yaxis,isCor) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001257;//user.Plot:1257
      if (isCor==true) {
        $LASTPOS=1001273;//user.Plot:1273
        _this.setCorrelation(src,xaxis,yaxis,parseFloat(_this._min(src,xaxis)),parseFloat(_this._max(src,xaxis)),parseFloat((_this._max(src,xaxis)-_this._min(src,xaxis))/10));
      }
      $LASTPOS=1001416;//user.Plot:1416
      _this._drawGraph(src,"scatter",xaxis,yaxis);
    },
    fiber$scatterChart :function _trc_Plot_f_scatterChart(_thread,src,xaxis,yaxis,isCor) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Plot_ent_scatterChart(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001257;//user.Plot:1257
            if (!(isCor==true)) { __pc=2     ; break; }
            $LASTPOS=1001273;//user.Plot:1273
            _this.fiber$setCorrelation(_thread, src, xaxis, yaxis, parseFloat(_this._min(src,xaxis)), parseFloat(_this._max(src,xaxis)), parseFloat((_this._max(src,xaxis)-_this._min(src,xaxis))/10));
            __pc=1;return;
          case 1:
            
          case 2     :
            
            $LASTPOS=1001416;//user.Plot:1416
            _this.fiber$_drawGraph(_thread, src, "scatter", xaxis, yaxis);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    _drawGraph :function _trc_Plot__drawGraph(src,type,xaxis,yaxis) {
      "use strict";
      var _this=this;
      var x;
      var y;
      var xaxopt;
      var yaxopt;
      var i;
      var xv;
      var mode;
      var data;
      var options;
      
      $LASTPOS=1001507;//user.Plot:1507
      x = [];
      
      $LASTPOS=1001522;//user.Plot:1522
      y = [];
      
      $LASTPOS=1001537;//user.Plot:1537
      xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
      
      $LASTPOS=1001751;//user.Plot:1751
      yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
      
      $LASTPOS=1001997;//user.Plot:1997
      $LASTPOS=1002001;//user.Plot:2001
      i = 0;
      for (; i<src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1002037;//user.Plot:2037
          if (xaxis=="time") {
            $LASTPOS=1002069;//user.Plot:2069
            xv = src[i][xaxis]*1000;
            
            $LASTPOS=1002109;//user.Plot:2109
            xaxopt["type"]='date';
            
          } else {
            $LASTPOS=1002161;//user.Plot:2161
            xv = src[i][xaxis];
            
            
          }
          $LASTPOS=1002203;//user.Plot:2203
          x.push(xv);
          $LASTPOS=1002224;//user.Plot:2224
          y.push(src[i][yaxis]);
        }
      }
      $LASTPOS=1002269;//user.Plot:2269
      if (type=="scatter") {
        $LASTPOS=1002299;//user.Plot:2299
        mode = "markers";
        
        
      } else {
        $LASTPOS=1002340;//user.Plot:2340
        mode = "lines";
        
        
      }
      $LASTPOS=1002370;//user.Plot:2370
      data = [{x: x,y: y,type: type,mode: mode}];
      
      $LASTPOS=1002479;//user.Plot:2479
      if (_this._isDrawCor===true) {
        $LASTPOS=1002511;//user.Plot:2511
        _this._corObj.mode='lines';
        $LASTPOS=1002542;//user.Plot:2542
        _this._corObj.line={dash: 'dot',width: 4};
        $LASTPOS=1002586;//user.Plot:2586
        data.push(_this._corObj);
        
      }
      $LASTPOS=1002618;//user.Plot:2618
      options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
      
      $LASTPOS=1003255;//user.Plot:3255
      window.Plotly.newPlot(_this._place,data,options);
    },
    fiber$_drawGraph :function _trc_Plot_f__drawGraph(_thread,src,type,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var x;
      var y;
      var xaxopt;
      var yaxopt;
      var i;
      var xv;
      var mode;
      var data;
      var options;
      
      $LASTPOS=1001507;//user.Plot:1507
      x = [];
      
      $LASTPOS=1001522;//user.Plot:1522
      y = [];
      
      $LASTPOS=1001537;//user.Plot:1537
      xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
      
      $LASTPOS=1001751;//user.Plot:1751
      yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
      
      $LASTPOS=1001997;//user.Plot:1997
      $LASTPOS=1002001;//user.Plot:2001
      i = 0;
      for (; i<src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1002037;//user.Plot:2037
          if (xaxis=="time") {
            $LASTPOS=1002069;//user.Plot:2069
            xv = src[i][xaxis]*1000;
            
            $LASTPOS=1002109;//user.Plot:2109
            xaxopt["type"]='date';
            
          } else {
            $LASTPOS=1002161;//user.Plot:2161
            xv = src[i][xaxis];
            
            
          }
          $LASTPOS=1002203;//user.Plot:2203
          x.push(xv);
          $LASTPOS=1002224;//user.Plot:2224
          y.push(src[i][yaxis]);
        }
      }
      $LASTPOS=1002269;//user.Plot:2269
      if (type=="scatter") {
        $LASTPOS=1002299;//user.Plot:2299
        mode = "markers";
        
        
      } else {
        $LASTPOS=1002340;//user.Plot:2340
        mode = "lines";
        
        
      }
      $LASTPOS=1002370;//user.Plot:2370
      data = [{x: x,y: y,type: type,mode: mode}];
      
      $LASTPOS=1002479;//user.Plot:2479
      if (_this._isDrawCor===true) {
        $LASTPOS=1002511;//user.Plot:2511
        _this._corObj.mode='lines';
        $LASTPOS=1002542;//user.Plot:2542
        _this._corObj.line={dash: 'dot',width: 4};
        $LASTPOS=1002586;//user.Plot:2586
        data.push(_this._corObj);
        
      }
      $LASTPOS=1002618;//user.Plot:2618
      options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
      
      $LASTPOS=1003255;//user.Plot:3255
      window.Plotly.newPlot(_this._place,data,options);
      
      _thread.retVal=_this;return;
    },
    _correlation :function _trc_Plot__correlation(dataObj,d1,d2,min,max,interval) {
      "use strict";
      var _this=this;
      var obj;
      var data1Ave;
      var data2Ave;
      var data1Dev;
      var data2Dev;
      var data1Var;
      var data2Var;
      var o;
      var _it_18;
      var _it_19;
      var k;
      var v;
      var _it_20;
      var data1Sdev;
      var data2Sdev;
      var dataCov;
      var _it_21;
      var cor;
      var a;
      var b;
      var x;
      var y;
      var i;
      
      $LASTPOS=1003363;//user.Plot:3363
      obj = {};
      
      $LASTPOS=1003380;//user.Plot:3380
      data1Ave = 0;
      
      $LASTPOS=1003401;//user.Plot:3401
      data2Ave = 0;
      
      $LASTPOS=1003422;//user.Plot:3422
      data1Dev = [];
      
      $LASTPOS=1003444;//user.Plot:3444
      data2Dev = [];
      
      $LASTPOS=1003466;//user.Plot:3466
      data1Var = 0;
      
      $LASTPOS=1003487;//user.Plot:3487
      data2Var = 0;
      
      $LASTPOS=1003508;//user.Plot:3508
      _it_18=Tonyu.iterator(dataObj,1);
      while(_it_18.next()) {
        o=_it_18[0];
        
        $LASTPOS=1003540;//user.Plot:3540
        data1Ave+=o[d1]-0;
        $LASTPOS=1003568;//user.Plot:3568
        data2Ave+=o[d2]-0;
        
      }
      $LASTPOS=1003599;//user.Plot:3599
      data1Ave=data1Ave/dataObj.length;
      $LASTPOS=1003638;//user.Plot:3638
      data2Ave=data2Ave/dataObj.length;
      $LASTPOS=1003775;//user.Plot:3775
      _it_19=Tonyu.iterator(dataObj,1);
      while(_it_19.next()) {
        o=_it_19[0];
        
        $LASTPOS=1003807;//user.Plot:3807
        data1Dev.push(o[d1]-data1Ave);
        $LASTPOS=1003847;//user.Plot:3847
        data2Dev.push(o[d2]-data2Ave);
        
      }
      $LASTPOS=1003990;//user.Plot:3990
      _it_20=Tonyu.iterator(data1Dev,2);
      while(_it_20.next()) {
        k=_it_20[0];
        v=_it_20[1];
        
        $LASTPOS=1004025;//user.Plot:4025
        data1Var+=Math.pow(data1Dev[k],2);
        $LASTPOS=1004069;//user.Plot:4069
        data2Var+=Math.pow(data2Dev[k],2);
        
      }
      $LASTPOS=1004116;//user.Plot:4116
      data1Var=data1Var/data1Dev.length;
      $LASTPOS=1004156;//user.Plot:4156
      data2Var=data2Var/data2Dev.length;
      $LASTPOS=1004296;//user.Plot:4296
      data1Sdev = Math.sqrt(data1Var);
      
      $LASTPOS=1004336;//user.Plot:4336
      data2Sdev = Math.sqrt(data2Var);
      
      $LASTPOS=1004478;//user.Plot:4478
      dataCov = 0;
      
      $LASTPOS=1004498;//user.Plot:4498
      _it_21=Tonyu.iterator(data1Dev,2);
      while(_it_21.next()) {
        k=_it_21[0];
        v=_it_21[1];
        
        $LASTPOS=1004533;//user.Plot:4533
        dataCov+=data1Dev[k]*data2Dev[k];
        
      }
      $LASTPOS=1004579;//user.Plot:4579
      dataCov=dataCov/data1Dev.length;
      $LASTPOS=1004669;//user.Plot:4669
      cor = dataCov/(data1Sdev*data2Sdev);
      
      $LASTPOS=1004761;//user.Plot:4761
      a = cor*(data2Sdev/data1Sdev);
      
      $LASTPOS=1004799;//user.Plot:4799
      b = data2Ave-(a*data1Ave);
      
      $LASTPOS=1004906;//user.Plot:4906
      x = [];
      
      $LASTPOS=1004921;//user.Plot:4921
      y = [];
      
      $LASTPOS=1004936;//user.Plot:4936
      $LASTPOS=1004940;//user.Plot:4940
      i = min;
      for (; i<=max ; i=i+interval) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1004981;//user.Plot:4981
          console.log(i);
          $LASTPOS=1005006;//user.Plot:5006
          x.push(i);
          $LASTPOS=1005026;//user.Plot:5026
          y.push(a*i+b);
        }
      }
      return {x: x,y: y};
    },
    fiber$_correlation :function _trc_Plot_f__correlation(_thread,dataObj,d1,d2,min,max,interval) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var data1Ave;
      var data2Ave;
      var data1Dev;
      var data2Dev;
      var data1Var;
      var data2Var;
      var o;
      var _it_18;
      var _it_19;
      var k;
      var v;
      var _it_20;
      var data1Sdev;
      var data2Sdev;
      var dataCov;
      var _it_21;
      var cor;
      var a;
      var b;
      var x;
      var y;
      var i;
      
      $LASTPOS=1003363;//user.Plot:3363
      obj = {};
      
      $LASTPOS=1003380;//user.Plot:3380
      data1Ave = 0;
      
      $LASTPOS=1003401;//user.Plot:3401
      data2Ave = 0;
      
      $LASTPOS=1003422;//user.Plot:3422
      data1Dev = [];
      
      $LASTPOS=1003444;//user.Plot:3444
      data2Dev = [];
      
      $LASTPOS=1003466;//user.Plot:3466
      data1Var = 0;
      
      $LASTPOS=1003487;//user.Plot:3487
      data2Var = 0;
      
      $LASTPOS=1003508;//user.Plot:3508
      _it_18=Tonyu.iterator(dataObj,1);
      while(_it_18.next()) {
        o=_it_18[0];
        
        $LASTPOS=1003540;//user.Plot:3540
        data1Ave+=o[d1]-0;
        $LASTPOS=1003568;//user.Plot:3568
        data2Ave+=o[d2]-0;
        
      }
      $LASTPOS=1003599;//user.Plot:3599
      data1Ave=data1Ave/dataObj.length;
      $LASTPOS=1003638;//user.Plot:3638
      data2Ave=data2Ave/dataObj.length;
      $LASTPOS=1003775;//user.Plot:3775
      _it_19=Tonyu.iterator(dataObj,1);
      while(_it_19.next()) {
        o=_it_19[0];
        
        $LASTPOS=1003807;//user.Plot:3807
        data1Dev.push(o[d1]-data1Ave);
        $LASTPOS=1003847;//user.Plot:3847
        data2Dev.push(o[d2]-data2Ave);
        
      }
      $LASTPOS=1003990;//user.Plot:3990
      _it_20=Tonyu.iterator(data1Dev,2);
      while(_it_20.next()) {
        k=_it_20[0];
        v=_it_20[1];
        
        $LASTPOS=1004025;//user.Plot:4025
        data1Var+=Math.pow(data1Dev[k],2);
        $LASTPOS=1004069;//user.Plot:4069
        data2Var+=Math.pow(data2Dev[k],2);
        
      }
      $LASTPOS=1004116;//user.Plot:4116
      data1Var=data1Var/data1Dev.length;
      $LASTPOS=1004156;//user.Plot:4156
      data2Var=data2Var/data2Dev.length;
      $LASTPOS=1004296;//user.Plot:4296
      data1Sdev = Math.sqrt(data1Var);
      
      $LASTPOS=1004336;//user.Plot:4336
      data2Sdev = Math.sqrt(data2Var);
      
      $LASTPOS=1004478;//user.Plot:4478
      dataCov = 0;
      
      $LASTPOS=1004498;//user.Plot:4498
      _it_21=Tonyu.iterator(data1Dev,2);
      while(_it_21.next()) {
        k=_it_21[0];
        v=_it_21[1];
        
        $LASTPOS=1004533;//user.Plot:4533
        dataCov+=data1Dev[k]*data2Dev[k];
        
      }
      $LASTPOS=1004579;//user.Plot:4579
      dataCov=dataCov/data1Dev.length;
      $LASTPOS=1004669;//user.Plot:4669
      cor = dataCov/(data1Sdev*data2Sdev);
      
      $LASTPOS=1004761;//user.Plot:4761
      a = cor*(data2Sdev/data1Sdev);
      
      $LASTPOS=1004799;//user.Plot:4799
      b = data2Ave-(a*data1Ave);
      
      $LASTPOS=1004906;//user.Plot:4906
      x = [];
      
      $LASTPOS=1004921;//user.Plot:4921
      y = [];
      
      $LASTPOS=1004936;//user.Plot:4936
      $LASTPOS=1004940;//user.Plot:4940
      i = min;
      for (; i<=max ; i=i+interval) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1004981;//user.Plot:4981
          console.log(i);
          $LASTPOS=1005006;//user.Plot:5006
          x.push(i);
          $LASTPOS=1005026;//user.Plot:5026
          y.push(a*i+b);
        }
      }
      _thread.retVal={x: x,y: y};return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"setCorrelation":{"nowait":false},"setAxisText":{"nowait":false},"setRange":{"nowait":false},"lineChart":{"nowait":false},"barChart":{"nowait":false},"_min":{"nowait":false},"_max":{"nowait":false},"scatterChart":{"nowait":false},"_drawGraph":{"nowait":false},"_correlation":{"nowait":false}},"fields":{"_xrange":{},"_yrange":{},"_isDrawCor":{},"_corObj":{},"_yaxname":{},"_xaxname":{},"_place":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Sca',
  shortName: 'Sca',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Sca_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000017;//user.Sca:17
      _this.p=new Tonyu.classes.user.Plot("s");
      $LASTPOS=2000035;//user.Sca:35
      _this.src = [];
      
      $LASTPOS=2000048;//user.Sca:48
      _this.d1raw = _this.getText("data1");
      
      $LASTPOS=2000077;//user.Sca:77
      _this.d2raw = _this.getText("data2");
      
      $LASTPOS=2000108;//user.Sca:108
      _this.d1L = _this.d1raw.split("\n");
      
      $LASTPOS=2000136;//user.Sca:136
      _this.d2L = _this.d2raw.split("\n");
      
      $LASTPOS=2000164;//user.Sca:164
      $LASTPOS=2000168;//user.Sca:168
      _this.i = 0;
      for (; _this.i<_this.d1L.length ; _this.i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2000200;//user.Sca:200
          _this.d1 = _this.d1L[_this.i].split("\t");
          
          $LASTPOS=2000232;//user.Sca:232
          _this.d2 = _this.d2L[_this.i].split("\t");
          
          $LASTPOS=2000264;//user.Sca:264
          _this.tmpObj = {"data1": _this.d1[1],"data2": _this.d2[1],"data3": _this.d1[0]};
          
          $LASTPOS=2000325;//user.Sca:325
          _this.src.push(_this.tmpObj);
        }
      }
      $LASTPOS=2000347;//user.Sca:347
      console.log(_this.src);
      $LASTPOS=2000366;//user.Sca:366
      _this.p.scatterChart(_this.src,"data1","data2",true);
    },
    fiber$main :function _trc_Sca_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000017;//user.Sca:17
      _this.p=new Tonyu.classes.user.Plot("s");
      $LASTPOS=2000035;//user.Sca:35
      _this.src = [];
      
      
      _thread.enter(function _trc_Sca_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000048;//user.Sca:48
            _this.fiber$getText(_thread, "data1");
            __pc=1;return;
          case 1:
            _this.d1raw=_thread.retVal;
            
            $LASTPOS=2000077;//user.Sca:77
            _this.fiber$getText(_thread, "data2");
            __pc=2;return;
          case 2:
            _this.d2raw=_thread.retVal;
            
            $LASTPOS=2000108;//user.Sca:108
            _this.d1L = _this.d1raw.split("\n");
            
            $LASTPOS=2000136;//user.Sca:136
            _this.d2L = _this.d2raw.split("\n");
            
            $LASTPOS=2000164;//user.Sca:164
            $LASTPOS=2000168;//user.Sca:168
            _this.i = 0;
            for (; _this.i<_this.d1L.length ; _this.i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=2000200;//user.Sca:200
                _this.d1 = _this.d1L[_this.i].split("\t");
                
                $LASTPOS=2000232;//user.Sca:232
                _this.d2 = _this.d2L[_this.i].split("\t");
                
                $LASTPOS=2000264;//user.Sca:264
                _this.tmpObj = {"data1": _this.d1[1],"data2": _this.d2[1],"data3": _this.d1[0]};
                
                $LASTPOS=2000325;//user.Sca:325
                _this.src.push(_this.tmpObj);
              }
            }
            $LASTPOS=2000347;//user.Sca:347
            console.log(_this.src);
            $LASTPOS=2000366;//user.Sca:366
            _this.p.scatterChart(_this.src,"data1","data2",true);
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"src":{},"d1raw":{},"d2raw":{},"d1L":{},"d2L":{},"p":{},"i":{},"d1":{},"d2":{},"tmpObj":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Test',
  shortName: 'Test',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Test_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=3000000;//user.Test:0
      _this.p=new Tonyu.classes.user.Plot("s");
      $LASTPOS=3000018;//user.Test:18
      _this.src = [];
      
      $LASTPOS=3000031;//user.Test:31
      $LASTPOS=3000035;//user.Test:35
      _this.i = - 10;
      for (; _this.i<10 ; _this.i+=0.1) {
        Tonyu.checkLoop();
        {
          $LASTPOS=3000064;//user.Test:64
          _this.x = _this.i;
          
          $LASTPOS=3000078;//user.Test:78
          _this.y = 2*_this.x*_this.x-10;
          
          $LASTPOS=3000099;//user.Test:99
          _this.tmpObj = {"x": _this.x,"y": _this.y};
          
          $LASTPOS=3000130;//user.Test:130
          _this.src.push(_this.tmpObj);
        }
      }
      $LASTPOS=3000152;//user.Test:152
      _this.p.setRange([- 10,10],[- 10,10]);
      $LASTPOS=3000184;//user.Test:184
      _this.p.lineChart(_this.src,"x","y");
    },
    fiber$main :function _trc_Test_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000000;//user.Test:0
      _this.p=new Tonyu.classes.user.Plot("s");
      $LASTPOS=3000018;//user.Test:18
      _this.src = [];
      
      $LASTPOS=3000031;//user.Test:31
      $LASTPOS=3000035;//user.Test:35
      _this.i = - 10;
      for (; _this.i<10 ; _this.i+=0.1) {
        Tonyu.checkLoop();
        {
          $LASTPOS=3000064;//user.Test:64
          _this.x = _this.i;
          
          $LASTPOS=3000078;//user.Test:78
          _this.y = 2*_this.x*_this.x-10;
          
          $LASTPOS=3000099;//user.Test:99
          _this.tmpObj = {"x": _this.x,"y": _this.y};
          
          $LASTPOS=3000130;//user.Test:130
          _this.src.push(_this.tmpObj);
        }
      }
      $LASTPOS=3000152;//user.Test:152
      _this.p.setRange([- 10,10],[- 10,10]);
      $LASTPOS=3000184;//user.Test:184
      _this.p.lineChart(_this.src,"x","y");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"src":{},"p":{},"i":{},"x":{},"y":{},"tmpObj":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Postget',
  shortName: 'Postget',
  namespace: 'user',
  superclass: Tonyu.classes.jslker.Parent,
  includes: [],
  methods: {
    main :function _trc_Postget_main() {
      "use strict";
      var _this=this;
      
      $LASTPOS=4000015;//user.Postget:15
      _this.onClick("b",Tonyu.bindFunc(_this,_this.send));
      $LASTPOS=4000034;//user.Postget:34
      _this.setText("a",_this.getFromServer("testkey"));
    },
    fiber$main :function _trc_Postget_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Postget_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=4000015;//user.Postget:15
            _this.fiber$onClick(_thread, "b", Tonyu.bindFunc(_this,_this.send));
            __pc=1;return;
          case 1:
            
            $LASTPOS=4000034;//user.Postget:34
            _this.fiber$setText(_thread, "a", _this.getFromServer("testkey"));
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    send :function _trc_Postget_send() {
      "use strict";
      var _this=this;
      
      $LASTPOS=4000094;//user.Postget:94
      _this.t=_this.getText("t");
      $LASTPOS=4000114;//user.Postget:114
      _this.putToServer("testkey",_this.t);
      $LASTPOS=4000144;//user.Postget:144
      _this.v=_this.getFromServer("testkey");
      $LASTPOS=4000176;//user.Postget:176
      _this.setText("a",_this.v);
    },
    fiber$send :function _trc_Postget_f_send(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Postget_ent_send(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=4000094;//user.Postget:94
            _this.fiber$getText(_thread, "t");
            __pc=1;return;
          case 1:
            _this.t=_thread.retVal;
            
            $LASTPOS=4000114;//user.Postget:114
            _this.fiber$putToServer(_thread, "testkey", _this.t);
            __pc=2;return;
          case 2:
            
            $LASTPOS=4000144;//user.Postget:144
            _this.fiber$getFromServer(_thread, "testkey");
            __pc=3;return;
          case 3:
            _this.v=_thread.retVal;
            
            $LASTPOS=4000176;//user.Postget:176
            _this.fiber$setText(_thread, "a", _this.v);
            __pc=4;return;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    putToServer :function _trc_Postget_putToServer(key,value) {
      "use strict";
      var _this=this;
      var url;
      var p;
      var r;
      
      $LASTPOS=4000226;//user.Postget:226
      url = window.location.href;
      
      $LASTPOS=4000260;//user.Postget:260
      p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
      
      
      $LASTPOS=4000456;//user.Postget:456
      r=_this.waitFor(p);
      return r;
    },
    fiber$putToServer :function _trc_Postget_f_putToServer(_thread,key,value) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var p;
      var r;
      
      $LASTPOS=4000226;//user.Postget:226
      url = window.location.href;
      
      $LASTPOS=4000260;//user.Postget:260
      p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
      
      
      
      _thread.enter(function _trc_Postget_ent_putToServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=4000456;//user.Postget:456
            _this.fiber$waitFor(_thread, p);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"send":{"nowait":false},"putToServer":{"nowait":false}},"fields":{"t":{},"v":{}}}
});

//# sourceMappingURL=concat.js.map