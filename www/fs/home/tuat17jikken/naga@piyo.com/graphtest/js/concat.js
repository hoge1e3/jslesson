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
      
      $LASTPOS=1000000;//user.Test:0
      _this.p=new Tonyu.classes.user.Plot("s");
      $LASTPOS=1000018;//user.Test:18
      _this.src = [];
      
      $LASTPOS=1000031;//user.Test:31
      $LASTPOS=1000035;//user.Test:35
      _this.i = - 10;
      for (; _this.i<10 ; _this.i+=0.1) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1000064;//user.Test:64
          _this.x = _this.i;
          
          $LASTPOS=1000078;//user.Test:78
          _this.y = 2*_this.x*_this.x-10;
          
          $LASTPOS=1000099;//user.Test:99
          _this.tmpObj = {"x": _this.x,"y": _this.y};
          
          $LASTPOS=1000130;//user.Test:130
          _this.src.push(_this.tmpObj);
        }
      }
      $LASTPOS=1000152;//user.Test:152
      _this.p.setRange([- 10,10],[- 10,10]);
      $LASTPOS=1000184;//user.Test:184
      _this.p.lineChart(_this.src,"x","y");
    },
    fiber$main :function _trc_Test_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000000;//user.Test:0
      _this.p=new Tonyu.classes.user.Plot("s");
      $LASTPOS=1000018;//user.Test:18
      _this.src = [];
      
      $LASTPOS=1000031;//user.Test:31
      $LASTPOS=1000035;//user.Test:35
      _this.i = - 10;
      for (; _this.i<10 ; _this.i+=0.1) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1000064;//user.Test:64
          _this.x = _this.i;
          
          $LASTPOS=1000078;//user.Test:78
          _this.y = 2*_this.x*_this.x-10;
          
          $LASTPOS=1000099;//user.Test:99
          _this.tmpObj = {"x": _this.x,"y": _this.y};
          
          $LASTPOS=1000130;//user.Test:130
          _this.src.push(_this.tmpObj);
        }
      }
      $LASTPOS=1000152;//user.Test:152
      _this.p.setRange([- 10,10],[- 10,10]);
      $LASTPOS=1000184;//user.Test:184
      _this.p.lineChart(_this.src,"x","y");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"src":{},"p":{},"i":{},"x":{},"y":{},"tmpObj":{}}}
});
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
      
      $LASTPOS=2000042;//user.Plot:42
      _this._place=div;
      $LASTPOS=2000064;//user.Plot:64
      _this._xaxname="";
      $LASTPOS=2000087;//user.Plot:87
      _this._yaxname="";
      $LASTPOS=2000110;//user.Plot:110
      _this._xrange;
      $LASTPOS=2000129;//user.Plot:129
      _this._yrange;
      $LASTPOS=2000148;//user.Plot:148
      _this._isDrawCor=false;
      $LASTPOS=2000176;//user.Plot:176
      _this._corObj={};
    },
    setCorrelation :function _trc_Plot_setCorrelation(src,x,y,min,max,interval) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000253;//user.Plot:253
      if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
        return _this;
        
      }
      $LASTPOS=2000354;//user.Plot:354
      _this._corObj=_this._correlation(src,x,y,min,max,interval);
      $LASTPOS=2000412;//user.Plot:412
      _this._isDrawCor=true;
    },
    fiber$setCorrelation :function _trc_Plot_f_setCorrelation(_thread,src,x,y,min,max,interval) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000253;//user.Plot:253
      if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
        _thread.retVal=_this;return;
        
        
      }
      
      _thread.enter(function _trc_Plot_ent_setCorrelation(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000354;//user.Plot:354
            _this.fiber$_correlation(_thread, src, x, y, min, max, interval);
            __pc=1;return;
          case 1:
            _this._corObj=_thread.retVal;
            
            $LASTPOS=2000412;//user.Plot:412
            _this._isDrawCor=true;
            _thread.exit(_this);return;
          }
        }
      });
    },
    setAxisText :function _trc_Plot_setAxisText(x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000470;//user.Plot:470
      _this._xaxname=x;
      $LASTPOS=2000492;//user.Plot:492
      _this._yaxname=y;
    },
    fiber$setAxisText :function _trc_Plot_f_setAxisText(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000470;//user.Plot:470
      _this._xaxname=x;
      $LASTPOS=2000492;//user.Plot:492
      _this._yaxname=y;
      
      _thread.retVal=_this;return;
    },
    setRange :function _trc_Plot_setRange(x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000542;//user.Plot:542
      _this._xrange=x;
      $LASTPOS=2000563;//user.Plot:563
      _this._yrange=y;
    },
    fiber$setRange :function _trc_Plot_f_setRange(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2000542;//user.Plot:542
      _this._xrange=x;
      $LASTPOS=2000563;//user.Plot:563
      _this._yrange=y;
      
      _thread.retVal=_this;return;
    },
    lineChart :function _trc_Plot_lineChart(src,xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000625;//user.Plot:625
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
            $LASTPOS=2000625;//user.Plot:625
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
      
      $LASTPOS=2000706;//user.Plot:706
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
            $LASTPOS=2000706;//user.Plot:706
            _this.fiber$_drawGraph(_thread, src, "bar", xaxis, yaxis);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    scatterChart :function _trc_Plot_scatterChart(src,xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2000790;//user.Plot:790
      _this._drawGraph(src,"scatter",xaxis,yaxis);
    },
    fiber$scatterChart :function _trc_Plot_f_scatterChart(_thread,src,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Plot_ent_scatterChart(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000790;//user.Plot:790
            _this.fiber$_drawGraph(_thread, src, "scatter", xaxis, yaxis);
            __pc=1;return;
          case 1:
            
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
      
      $LASTPOS=2000881;//user.Plot:881
      x = [];
      
      $LASTPOS=2000896;//user.Plot:896
      y = [];
      
      $LASTPOS=2000911;//user.Plot:911
      xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
      
      $LASTPOS=2001125;//user.Plot:1125
      yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
      
      $LASTPOS=2001371;//user.Plot:1371
      $LASTPOS=2001375;//user.Plot:1375
      i = 0;
      for (; i<src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2001411;//user.Plot:1411
          if (xaxis=="time") {
            $LASTPOS=2001443;//user.Plot:1443
            xv = src[i][xaxis]*1000;
            
            $LASTPOS=2001483;//user.Plot:1483
            xaxopt["type"]='date';
            
          } else {
            $LASTPOS=2001535;//user.Plot:1535
            xv = src[i][xaxis];
            
            
          }
          $LASTPOS=2001577;//user.Plot:1577
          x.push(xv);
          $LASTPOS=2001598;//user.Plot:1598
          y.push(src[i][yaxis]);
        }
      }
      $LASTPOS=2001643;//user.Plot:1643
      if (type=="scatter") {
        $LASTPOS=2001673;//user.Plot:1673
        mode = "markers";
        
        
      } else {
        $LASTPOS=2001714;//user.Plot:1714
        mode = "lines";
        
        
      }
      $LASTPOS=2001744;//user.Plot:1744
      data = [{x: x,y: y,type: type,mode: mode}];
      
      $LASTPOS=2001853;//user.Plot:1853
      if (_this._isDrawCor===true) {
        $LASTPOS=2001885;//user.Plot:1885
        _this._corObj.mode='lines';
        $LASTPOS=2001916;//user.Plot:1916
        _this._corObj.line={dash: 'dot',width: 4};
        $LASTPOS=2001960;//user.Plot:1960
        data.push(_this._corObj);
        
      }
      $LASTPOS=2001992;//user.Plot:1992
      options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
      
      $LASTPOS=2002629;//user.Plot:2629
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
      
      $LASTPOS=2000881;//user.Plot:881
      x = [];
      
      $LASTPOS=2000896;//user.Plot:896
      y = [];
      
      $LASTPOS=2000911;//user.Plot:911
      xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
      
      $LASTPOS=2001125;//user.Plot:1125
      yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
      
      $LASTPOS=2001371;//user.Plot:1371
      $LASTPOS=2001375;//user.Plot:1375
      i = 0;
      for (; i<src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2001411;//user.Plot:1411
          if (xaxis=="time") {
            $LASTPOS=2001443;//user.Plot:1443
            xv = src[i][xaxis]*1000;
            
            $LASTPOS=2001483;//user.Plot:1483
            xaxopt["type"]='date';
            
          } else {
            $LASTPOS=2001535;//user.Plot:1535
            xv = src[i][xaxis];
            
            
          }
          $LASTPOS=2001577;//user.Plot:1577
          x.push(xv);
          $LASTPOS=2001598;//user.Plot:1598
          y.push(src[i][yaxis]);
        }
      }
      $LASTPOS=2001643;//user.Plot:1643
      if (type=="scatter") {
        $LASTPOS=2001673;//user.Plot:1673
        mode = "markers";
        
        
      } else {
        $LASTPOS=2001714;//user.Plot:1714
        mode = "lines";
        
        
      }
      $LASTPOS=2001744;//user.Plot:1744
      data = [{x: x,y: y,type: type,mode: mode}];
      
      $LASTPOS=2001853;//user.Plot:1853
      if (_this._isDrawCor===true) {
        $LASTPOS=2001885;//user.Plot:1885
        _this._corObj.mode='lines';
        $LASTPOS=2001916;//user.Plot:1916
        _this._corObj.line={dash: 'dot',width: 4};
        $LASTPOS=2001960;//user.Plot:1960
        data.push(_this._corObj);
        
      }
      $LASTPOS=2001992;//user.Plot:1992
      options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
      
      $LASTPOS=2002629;//user.Plot:2629
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
      var _it_46;
      var _it_47;
      var k;
      var v;
      var _it_48;
      var data1Sdev;
      var data2Sdev;
      var dataCov;
      var _it_49;
      var cor;
      var a;
      var b;
      var x;
      var y;
      var i;
      
      $LASTPOS=2002737;//user.Plot:2737
      obj = {};
      
      $LASTPOS=2002754;//user.Plot:2754
      data1Ave = 0;
      
      $LASTPOS=2002775;//user.Plot:2775
      data2Ave = 0;
      
      $LASTPOS=2002796;//user.Plot:2796
      data1Dev = [];
      
      $LASTPOS=2002818;//user.Plot:2818
      data2Dev = [];
      
      $LASTPOS=2002840;//user.Plot:2840
      data1Var = 0;
      
      $LASTPOS=2002861;//user.Plot:2861
      data2Var = 0;
      
      $LASTPOS=2002882;//user.Plot:2882
      _it_46=Tonyu.iterator(dataObj,1);
      while(_it_46.next()) {
        o=_it_46[0];
        
        $LASTPOS=2002914;//user.Plot:2914
        data1Ave+=o[d1]-0;
        $LASTPOS=2002942;//user.Plot:2942
        data2Ave+=o[d2]-0;
        
      }
      $LASTPOS=2002973;//user.Plot:2973
      data1Ave=data1Ave/dataObj.length;
      $LASTPOS=2003012;//user.Plot:3012
      data2Ave=data2Ave/dataObj.length;
      $LASTPOS=2003149;//user.Plot:3149
      _it_47=Tonyu.iterator(dataObj,1);
      while(_it_47.next()) {
        o=_it_47[0];
        
        $LASTPOS=2003181;//user.Plot:3181
        data1Dev.push(o[d1]-data1Ave);
        $LASTPOS=2003221;//user.Plot:3221
        data2Dev.push(o[d2]-data2Ave);
        
      }
      $LASTPOS=2003364;//user.Plot:3364
      _it_48=Tonyu.iterator(data1Dev,2);
      while(_it_48.next()) {
        k=_it_48[0];
        v=_it_48[1];
        
        $LASTPOS=2003399;//user.Plot:3399
        data1Var+=_this.Math.pow(data1Dev[k],2);
        $LASTPOS=2003443;//user.Plot:3443
        data2Var+=_this.Math.pow(data2Dev[k],2);
        
      }
      $LASTPOS=2003490;//user.Plot:3490
      data1Var=data1Var/data1Dev.length;
      $LASTPOS=2003530;//user.Plot:3530
      data2Var=data2Var/data2Dev.length;
      $LASTPOS=2003670;//user.Plot:3670
      data1Sdev = _this.Math.sqrt(data1Var);
      
      $LASTPOS=2003710;//user.Plot:3710
      data2Sdev = _this.Math.sqrt(data2Var);
      
      $LASTPOS=2003852;//user.Plot:3852
      dataCov = 0;
      
      $LASTPOS=2003872;//user.Plot:3872
      _it_49=Tonyu.iterator(data1Dev,2);
      while(_it_49.next()) {
        k=_it_49[0];
        v=_it_49[1];
        
        $LASTPOS=2003907;//user.Plot:3907
        dataCov+=data1Dev[k]*data2Dev[k];
        
      }
      $LASTPOS=2003953;//user.Plot:3953
      dataCov=dataCov/data1Dev.length;
      $LASTPOS=2004043;//user.Plot:4043
      cor = dataCov/(data1Sdev*data2Sdev);
      
      $LASTPOS=2004135;//user.Plot:4135
      a = cor*(data2Sdev/data1Sdev);
      
      $LASTPOS=2004173;//user.Plot:4173
      b = data2Ave-(a*data1Ave);
      
      $LASTPOS=2004280;//user.Plot:4280
      x = [];
      
      $LASTPOS=2004295;//user.Plot:4295
      y = [];
      
      $LASTPOS=2004310;//user.Plot:4310
      $LASTPOS=2004314;//user.Plot:4314
      i = min;
      for (; i<=max ; i=i+interval) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2004355;//user.Plot:4355
          x.push(i);
          $LASTPOS=2004375;//user.Plot:4375
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
      var _it_46;
      var _it_47;
      var k;
      var v;
      var _it_48;
      var data1Sdev;
      var data2Sdev;
      var dataCov;
      var _it_49;
      var cor;
      var a;
      var b;
      var x;
      var y;
      var i;
      
      $LASTPOS=2002737;//user.Plot:2737
      obj = {};
      
      $LASTPOS=2002754;//user.Plot:2754
      data1Ave = 0;
      
      $LASTPOS=2002775;//user.Plot:2775
      data2Ave = 0;
      
      $LASTPOS=2002796;//user.Plot:2796
      data1Dev = [];
      
      $LASTPOS=2002818;//user.Plot:2818
      data2Dev = [];
      
      $LASTPOS=2002840;//user.Plot:2840
      data1Var = 0;
      
      $LASTPOS=2002861;//user.Plot:2861
      data2Var = 0;
      
      $LASTPOS=2002882;//user.Plot:2882
      _it_46=Tonyu.iterator(dataObj,1);
      while(_it_46.next()) {
        o=_it_46[0];
        
        $LASTPOS=2002914;//user.Plot:2914
        data1Ave+=o[d1]-0;
        $LASTPOS=2002942;//user.Plot:2942
        data2Ave+=o[d2]-0;
        
      }
      $LASTPOS=2002973;//user.Plot:2973
      data1Ave=data1Ave/dataObj.length;
      $LASTPOS=2003012;//user.Plot:3012
      data2Ave=data2Ave/dataObj.length;
      $LASTPOS=2003149;//user.Plot:3149
      _it_47=Tonyu.iterator(dataObj,1);
      while(_it_47.next()) {
        o=_it_47[0];
        
        $LASTPOS=2003181;//user.Plot:3181
        data1Dev.push(o[d1]-data1Ave);
        $LASTPOS=2003221;//user.Plot:3221
        data2Dev.push(o[d2]-data2Ave);
        
      }
      $LASTPOS=2003364;//user.Plot:3364
      _it_48=Tonyu.iterator(data1Dev,2);
      while(_it_48.next()) {
        k=_it_48[0];
        v=_it_48[1];
        
        $LASTPOS=2003399;//user.Plot:3399
        data1Var+=_this.Math.pow(data1Dev[k],2);
        $LASTPOS=2003443;//user.Plot:3443
        data2Var+=_this.Math.pow(data2Dev[k],2);
        
      }
      $LASTPOS=2003490;//user.Plot:3490
      data1Var=data1Var/data1Dev.length;
      $LASTPOS=2003530;//user.Plot:3530
      data2Var=data2Var/data2Dev.length;
      $LASTPOS=2003670;//user.Plot:3670
      data1Sdev = _this.Math.sqrt(data1Var);
      
      $LASTPOS=2003710;//user.Plot:3710
      data2Sdev = _this.Math.sqrt(data2Var);
      
      $LASTPOS=2003852;//user.Plot:3852
      dataCov = 0;
      
      $LASTPOS=2003872;//user.Plot:3872
      _it_49=Tonyu.iterator(data1Dev,2);
      while(_it_49.next()) {
        k=_it_49[0];
        v=_it_49[1];
        
        $LASTPOS=2003907;//user.Plot:3907
        dataCov+=data1Dev[k]*data2Dev[k];
        
      }
      $LASTPOS=2003953;//user.Plot:3953
      dataCov=dataCov/data1Dev.length;
      $LASTPOS=2004043;//user.Plot:4043
      cor = dataCov/(data1Sdev*data2Sdev);
      
      $LASTPOS=2004135;//user.Plot:4135
      a = cor*(data2Sdev/data1Sdev);
      
      $LASTPOS=2004173;//user.Plot:4173
      b = data2Ave-(a*data1Ave);
      
      $LASTPOS=2004280;//user.Plot:4280
      x = [];
      
      $LASTPOS=2004295;//user.Plot:4295
      y = [];
      
      $LASTPOS=2004310;//user.Plot:4310
      $LASTPOS=2004314;//user.Plot:4314
      i = min;
      for (; i<=max ; i=i+interval) {
        Tonyu.checkLoop();
        {
          $LASTPOS=2004355;//user.Plot:4355
          x.push(i);
          $LASTPOS=2004375;//user.Plot:4375
          y.push(a*i+b);
        }
      }
      _thread.retVal={x: x,y: y};return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"setCorrelation":{"nowait":false},"setAxisText":{"nowait":false},"setRange":{"nowait":false},"lineChart":{"nowait":false},"barChart":{"nowait":false},"scatterChart":{"nowait":false},"_drawGraph":{"nowait":false},"_correlation":{"nowait":false}},"fields":{"_xrange":{},"_yrange":{},"_isDrawCor":{},"_corObj":{},"_yaxname":{},"_xaxname":{},"_place":{}}}
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
      
      $LASTPOS=3000000;//user.Sca:0
      _this.p=new Tonyu.classes.user.Plot("s");
      $LASTPOS=3000018;//user.Sca:18
      _this.src = [];
      
      $LASTPOS=3000031;//user.Sca:31
      _this.d1raw = _this.getText("data1");
      
      $LASTPOS=3000060;//user.Sca:60
      _this.d2raw = _this.getText("data2");
      
      $LASTPOS=3000091;//user.Sca:91
      _this.d1L = _this.d1raw.split("\n");
      
      $LASTPOS=3000119;//user.Sca:119
      _this.d2L = _this.d2raw.split("\n");
      
      $LASTPOS=3000147;//user.Sca:147
      $LASTPOS=3000151;//user.Sca:151
      _this.i = 0;
      for (; _this.i<_this.d1L.length ; _this.i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=3000183;//user.Sca:183
          _this.d1 = _this.d1L[_this.i].split("\t");
          
          $LASTPOS=3000215;//user.Sca:215
          _this.d2 = _this.d2L[_this.i].split("\t");
          
          $LASTPOS=3000247;//user.Sca:247
          _this.tmpObj = {"data1": _this.d1[1],"data2": _this.d2[1],"data3": _this.d1[0]};
          
          $LASTPOS=3000308;//user.Sca:308
          _this.src.push(_this.tmpObj);
        }
      }
      $LASTPOS=3000330;//user.Sca:330
      _this.p.setCorrelation(_this.src,"data1","data2",10,75,(75-10)/100);
      $LASTPOS=3000388;//user.Sca:388
      _this.p.scatterChart(_this.src,"data1","data2",_this.corObj);
    },
    fiber$main :function _trc_Sca_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=3000000;//user.Sca:0
      _this.p=new Tonyu.classes.user.Plot("s");
      $LASTPOS=3000018;//user.Sca:18
      _this.src = [];
      
      
      _thread.enter(function _trc_Sca_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=3000031;//user.Sca:31
            _this.fiber$getText(_thread, "data1");
            __pc=1;return;
          case 1:
            _this.d1raw=_thread.retVal;
            
            $LASTPOS=3000060;//user.Sca:60
            _this.fiber$getText(_thread, "data2");
            __pc=2;return;
          case 2:
            _this.d2raw=_thread.retVal;
            
            $LASTPOS=3000091;//user.Sca:91
            _this.d1L = _this.d1raw.split("\n");
            
            $LASTPOS=3000119;//user.Sca:119
            _this.d2L = _this.d2raw.split("\n");
            
            $LASTPOS=3000147;//user.Sca:147
            $LASTPOS=3000151;//user.Sca:151
            _this.i = 0;
            for (; _this.i<_this.d1L.length ; _this.i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=3000183;//user.Sca:183
                _this.d1 = _this.d1L[_this.i].split("\t");
                
                $LASTPOS=3000215;//user.Sca:215
                _this.d2 = _this.d2L[_this.i].split("\t");
                
                $LASTPOS=3000247;//user.Sca:247
                _this.tmpObj = {"data1": _this.d1[1],"data2": _this.d2[1],"data3": _this.d1[0]};
                
                $LASTPOS=3000308;//user.Sca:308
                _this.src.push(_this.tmpObj);
              }
            }
            $LASTPOS=3000330;//user.Sca:330
            _this.p.setCorrelation(_this.src,"data1","data2",10,75,(75-10)/100);
            $LASTPOS=3000388;//user.Sca:388
            _this.p.scatterChart(_this.src,"data1","data2",_this.corObj);
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"src":{},"d1raw":{},"d2raw":{},"d1L":{},"d2L":{},"p":{},"i":{},"d1":{},"d2":{},"tmpObj":{},"corObj":{}}}
});

//# sourceMappingURL=concat.js.map