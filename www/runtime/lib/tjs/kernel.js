Tonyu.klass.define({
  fullName: 'jslker.Graph',
  shortName: 'Graph',
  namespace: 'jslker',
  includes: [],
  methods: {
    main :function _trc_Graph_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Graph_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Graph_initialize(div) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000086;//jslker.Graph:86
      _this._place=div;
      $LASTPOS=1000107;//jslker.Graph:107
      _this._xaxname="";
      $LASTPOS=1000129;//jslker.Graph:129
      _this._yaxname="";
      $LASTPOS=1000151;//jslker.Graph:151
      _this._xrange;
      $LASTPOS=1000169;//jslker.Graph:169
      _this._yrange;
      $LASTPOS=1000187;//jslker.Graph:187
      _this._isDrawCor=false;
      $LASTPOS=1000214;//jslker.Graph:214
      _this.plotlyURL=window.runtimePath+"lib/plotly-latest.min.js";
      $LASTPOS=1000275;//jslker.Graph:275
      window.$.getScript(_this.plotlyURL);
      $LASTPOS=1000310;//jslker.Graph:310
      window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
      $LASTPOS=1000351;//jslker.Graph:351
      _this.loadLibHandlers=[];
      $LASTPOS=1000375;//jslker.Graph:375
      _this._corObj={};
      $LASTPOS=1000396;//jslker.Graph:396
      _this.src=_this.src||[];
      $LASTPOS=1000413;//jslker.Graph:413
      _this._typemap={};
    },
    setData :function _trc_Graph_setData(data) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000501;//jslker.Graph:501
      _this.src=data;
    },
    fiber$setData :function _trc_Graph_f_setData(_thread,data) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000501;//jslker.Graph:501
      _this.src=data;
      
      _thread.retVal=_this;return;
    },
    addData :function _trc_Graph_addData(d) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000560;//jslker.Graph:560
      if (typeof  d==="object") {
        $LASTPOS=1000595;//jslker.Graph:595
        _this.src.push(d);
        
      } else {
        $LASTPOS=1000629;//jslker.Graph:629
        _this.src.push({x: arguments[0],y: arguments[1]});
        
      }
    },
    fiber$addData :function _trc_Graph_f_addData(_thread,d) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000560;//jslker.Graph:560
      if (typeof  d==="object") {
        $LASTPOS=1000595;//jslker.Graph:595
        _this.src.push(d);
        
      } else {
        $LASTPOS=1000629;//jslker.Graph:629
        _this.src.push({x: _arguments[0],y: _arguments[1]});
        
      }
      
      _thread.retVal=_this;return;
    },
    onLoadLib :function _trc_Graph_onLoadLib(f) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1000711;//jslker.Graph:711
      if (_this.Plotly) {
        $LASTPOS=1000723;//jslker.Graph:723
        f(_this.Plotly);
      } else {
        $LASTPOS=1000743;//jslker.Graph:743
        _this.loadLibHandlers.push(f);
      }
    },
    fiber$onLoadLib :function _trc_Graph_f_onLoadLib(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000711;//jslker.Graph:711
      if (_this.Plotly) {
        $LASTPOS=1000723;//jslker.Graph:723
        f(_this.Plotly);
      } else {
        $LASTPOS=1000743;//jslker.Graph:743
        _this.loadLibHandlers.push(f);
      }
      
      _thread.retVal=_this;return;
    },
    waitLoadLib :function _trc_Graph_waitLoadLib() {
      "use strict";
      var _this=this;
      var f;
      var _it_117;
      
      $LASTPOS=1000791;//jslker.Graph:791
      if (! window.Plotly) {
        $LASTPOS=1000821;//jslker.Graph:821
        window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
        
      } else {
        $LASTPOS=1000879;//jslker.Graph:879
        _this.Plotly=window.Plotly;
        $LASTPOS=1000909;//jslker.Graph:909
        _it_117=Tonyu.iterator(_this.loadLibHandlers,1);
        while(_it_117.next()) {
          f=_it_117[0];
          
          $LASTPOS=1000940;//jslker.Graph:940
          f(_this.Plotly);
        }
        
      }
    },
    fiber$waitLoadLib :function _trc_Graph_f_waitLoadLib(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var _it_117;
      
      $LASTPOS=1000791;//jslker.Graph:791
      if (! window.Plotly) {
        $LASTPOS=1000821;//jslker.Graph:821
        window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
        
      } else {
        $LASTPOS=1000879;//jslker.Graph:879
        _this.Plotly=window.Plotly;
        $LASTPOS=1000909;//jslker.Graph:909
        _it_117=Tonyu.iterator(_this.loadLibHandlers,1);
        while(_it_117.next()) {
          f=_it_117[0];
          
          $LASTPOS=1000940;//jslker.Graph:940
          f(_this.Plotly);
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    _setCorrelation :function _trc_Graph__setCorrelation(x,y,min,max,interval) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001023;//jslker.Graph:1023
      if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
        return _this;
        
      }
      $LASTPOS=1001121;//jslker.Graph:1121
      console.log(min,max,interval);
      $LASTPOS=1001156;//jslker.Graph:1156
      _this._corObj=_this._correlation(x,y,min,max,interval);
      $LASTPOS=1001209;//jslker.Graph:1209
      _this._isDrawCor=true;
    },
    fiber$_setCorrelation :function _trc_Graph_f__setCorrelation(_thread,x,y,min,max,interval) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001023;//jslker.Graph:1023
      if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
        _thread.retVal=_this;return;
        
        
      }
      $LASTPOS=1001121;//jslker.Graph:1121
      console.log(min,max,interval);
      
      _thread.enter(function _trc_Graph_ent__setCorrelation(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001156;//jslker.Graph:1156
            _this.fiber$_correlation(_thread, x, y, min, max, interval);
            __pc=1;return;
          case 1:
            _this._corObj=_thread.retVal;
            
            $LASTPOS=1001209;//jslker.Graph:1209
            _this._isDrawCor=true;
            _thread.exit(_this);return;
          }
        }
      });
    },
    setAxisText :function _trc_Graph_setAxisText(x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001264;//jslker.Graph:1264
      _this.setXAxisText(x);
      $LASTPOS=1001285;//jslker.Graph:1285
      _this.setYAxisText(y);
    },
    fiber$setAxisText :function _trc_Graph_f_setAxisText(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Graph_ent_setAxisText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001264;//jslker.Graph:1264
            _this.fiber$setXAxisText(_thread, x);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1001285;//jslker.Graph:1285
            _this.fiber$setYAxisText(_thread, y);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setXAxisText :function _trc_Graph_setXAxisText(x) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001334;//jslker.Graph:1334
      _this._xaxname=x;
    },
    fiber$setXAxisText :function _trc_Graph_f_setXAxisText(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001334;//jslker.Graph:1334
      _this._xaxname=x;
      
      _thread.retVal=_this;return;
    },
    setYAxisText :function _trc_Graph_setYAxisText(y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001383;//jslker.Graph:1383
      _this._yaxname=y;
    },
    fiber$setYAxisText :function _trc_Graph_f_setYAxisText(_thread,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001383;//jslker.Graph:1383
      _this._yaxname=y;
      
      _thread.retVal=_this;return;
    },
    setAxisType :function _trc_Graph_setAxisType(xtype,ytype) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001442;//jslker.Graph:1442
      _this.setXAxisType(xtype);
      $LASTPOS=1001467;//jslker.Graph:1467
      _this.setXAxisType(ytype);
    },
    fiber$setAxisType :function _trc_Graph_f_setAxisType(_thread,xtype,ytype) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Graph_ent_setAxisType(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001442;//jslker.Graph:1442
            _this.fiber$setXAxisType(_thread, xtype);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1001467;//jslker.Graph:1467
            _this.fiber$setXAxisType(_thread, ytype);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setXAxisType :function _trc_Graph_setXAxisType(xtype) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001553;//jslker.Graph:1553
      if (xtype=="time") {
        $LASTPOS=1001572;//jslker.Graph:1572
        xtype="date";
      }
      $LASTPOS=1001590;//jslker.Graph:1590
      _this._xaxtype=xtype;
    },
    fiber$setXAxisType :function _trc_Graph_f_setXAxisType(_thread,xtype) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001553;//jslker.Graph:1553
      if (xtype=="time") {
        $LASTPOS=1001572;//jslker.Graph:1572
        xtype="date";
      }
      $LASTPOS=1001590;//jslker.Graph:1590
      _this._xaxtype=xtype;
      
      _thread.retVal=_this;return;
    },
    setYAxisType :function _trc_Graph_setYAxisType(ytype) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001643;//jslker.Graph:1643
      if (ytype=="time") {
        $LASTPOS=1001662;//jslker.Graph:1662
        ytype="date";
      }
      $LASTPOS=1001680;//jslker.Graph:1680
      _this._yaxtype=ytype;
    },
    fiber$setYAxisType :function _trc_Graph_f_setYAxisType(_thread,ytype) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001643;//jslker.Graph:1643
      if (ytype=="time") {
        $LASTPOS=1001662;//jslker.Graph:1662
        ytype="date";
      }
      $LASTPOS=1001680;//jslker.Graph:1680
      _this._yaxtype=ytype;
      
      _thread.retVal=_this;return;
    },
    bindType :function _trc_Graph_bindType(name,type) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001733;//jslker.Graph:1733
      if (type) {
        $LASTPOS=1001743;//jslker.Graph:1743
        _this._typemap[name]=type;
      }
    },
    fiber$bindType :function _trc_Graph_f_bindType(_thread,name,type) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001733;//jslker.Graph:1733
      if (type) {
        $LASTPOS=1001743;//jslker.Graph:1743
        _this._typemap[name]=type;
      }
      
      _thread.retVal=_this;return;
    },
    setXRange :function _trc_Graph_setXRange(min,max,logScale) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001809;//jslker.Graph:1809
      _this._xrange=[min,max];
      $LASTPOS=1001832;//jslker.Graph:1832
      _this._xrange.logScale=logScale;
    },
    fiber$setXRange :function _trc_Graph_f_setXRange(_thread,min,max,logScale) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001809;//jslker.Graph:1809
      _this._xrange=[min,max];
      $LASTPOS=1001832;//jslker.Graph:1832
      _this._xrange.logScale=logScale;
      
      _thread.retVal=_this;return;
    },
    setYRange :function _trc_Graph_setYRange(min,max,logScale) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001909;//jslker.Graph:1909
      _this._yrange=[min,max];
      $LASTPOS=1001932;//jslker.Graph:1932
      _this._yrange.logScale=logScale;
    },
    fiber$setYRange :function _trc_Graph_f_setYRange(_thread,min,max,logScale) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001909;//jslker.Graph:1909
      _this._yrange=[min,max];
      $LASTPOS=1001932;//jslker.Graph:1932
      _this._yrange.logScale=logScale;
      
      _thread.retVal=_this;return;
    },
    line :function _trc_Graph_line(xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1001999;//jslker.Graph:1999
      _this._drawGraph("line",xaxis,yaxis);
    },
    fiber$line :function _trc_Graph_f_line(_thread,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Graph_ent_line(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1001999;//jslker.Graph:1999
            _this.fiber$_drawGraph(_thread, "line", xaxis, yaxis);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    bar :function _trc_Graph_bar(xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1002064;//jslker.Graph:2064
      _this._drawGraph("bar",xaxis,yaxis);
    },
    fiber$bar :function _trc_Graph_f_bar(_thread,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Graph_ent_bar(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1002064;//jslker.Graph:2064
            _this.fiber$_drawGraph(_thread, "bar", xaxis, yaxis);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    vec :function _trc_Graph_vec(k) {
      "use strict";
      var _this=this;
      
      return _this.src.map((function anonymous_2201(rec) {
        
        return _this.getValue(rec,k);
      }));
    },
    fiber$vec :function _trc_Graph_f_vec(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.src.map((function anonymous_2201(rec) {
        
        return _this.getValue(rec,k);
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    min :function _trc_Graph_min(k) {
      "use strict";
      var _this=this;
      var ary;
      
      $LASTPOS=1002272;//jslker.Graph:2272
      ary = _this.vec(k);
      
      $LASTPOS=1002292;//jslker.Graph:2292
      ary.sort((function anonymous_2301(a,b) {
        
        return a-b;
      }));
      return ary[0];
    },
    fiber$min :function _trc_Graph_f_min(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ary;
      
      
      _thread.enter(function _trc_Graph_ent_min(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1002272;//jslker.Graph:2272
            _this.fiber$vec(_thread, k);
            __pc=1;return;
          case 1:
            ary=_thread.retVal;
            
            $LASTPOS=1002292;//jslker.Graph:2292
            ary.sort((function anonymous_2301(a,b) {
              
              return a-b;
            }));
            _thread.exit(ary[0]);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    max :function _trc_Graph_max(k) {
      "use strict";
      var _this=this;
      var ary;
      
      $LASTPOS=1002372;//jslker.Graph:2372
      ary = _this.vec(k);
      
      $LASTPOS=1002392;//jslker.Graph:2392
      ary.sort((function anonymous_2401(a,b) {
        
        return b-a;
      }));
      return ary[0];
    },
    fiber$max :function _trc_Graph_f_max(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ary;
      
      
      _thread.enter(function _trc_Graph_ent_max(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1002372;//jslker.Graph:2372
            _this.fiber$vec(_thread, k);
            __pc=1;return;
          case 1:
            ary=_thread.retVal;
            
            $LASTPOS=1002392;//jslker.Graph:2392
            ary.sort((function anonymous_2401(a,b) {
              
              return b-a;
            }));
            _thread.exit(ary[0]);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    med :function _trc_Graph_med(k) {
      "use strict";
      var _this=this;
      var half;
      var temp;
      
      $LASTPOS=1002473;//jslker.Graph:2473
      half = Math.ceil(_this.src.length/2);
      
      $LASTPOS=1002513;//jslker.Graph:2513
      temp = _this.vec(k).sort((function anonymous_2536(a,b) {
        
        $LASTPOS=1002593;//jslker.Graph:2593
        if ((a[k]-0)>(b[k]-0)) {
          return - 1;
        }
        $LASTPOS=1002634;//jslker.Graph:2634
        if ((a[k]-0)<(b[k]-0)) {
          return 1;
        }
        return 0;
      }));
      
      $LASTPOS=1002696;//jslker.Graph:2696
      if (temp.length%2) {
        return temp[half][k];
        
      }
      return ((temp[half-1][k]-0)+(temp[half][k]-0))/2;
    },
    fiber$med :function _trc_Graph_f_med(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var half;
      var temp;
      
      $LASTPOS=1002473;//jslker.Graph:2473
      half = Math.ceil(_this.src.length/2);
      
      $LASTPOS=1002513;//jslker.Graph:2513
      temp = _this.vec(k).sort((function anonymous_2536(a,b) {
        
        $LASTPOS=1002593;//jslker.Graph:2593
        if ((a[k]-0)>(b[k]-0)) {
          return - 1;
        }
        $LASTPOS=1002634;//jslker.Graph:2634
        if ((a[k]-0)<(b[k]-0)) {
          return 1;
        }
        return 0;
      }));
      
      $LASTPOS=1002696;//jslker.Graph:2696
      if (temp.length%2) {
        _thread.retVal=temp[half][k];return;
        
        
      }
      _thread.retVal=((temp[half-1][k]-0)+(temp[half][k]-0))/2;return;
      
      
      _thread.retVal=_this;return;
    },
    mode :function _trc_Graph_mode(k) {
      "use strict";
      var _this=this;
      var counter;
      var nativeValues;
      var maxCounter;
      var maxValue;
      var i;
      var value;
      var j;
      var ret;
      
      $LASTPOS=1002833;//jslker.Graph:2833
      counter = {};
      
      $LASTPOS=1002855;//jslker.Graph:2855
      nativeValues = {};
      
      $LASTPOS=1002882;//jslker.Graph:2882
      maxCounter = 0;
      
      $LASTPOS=1002906;//jslker.Graph:2906
      maxValue = null;
      
      $LASTPOS=1002931;//jslker.Graph:2931
      $LASTPOS=1002936;//jslker.Graph:2936
      i = 0;
      for (; i<_this.src.length ; i++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1002978;//jslker.Graph:2978
          value = _this.getValue(_this.src[i],k);
          
          $LASTPOS=1003016;//jslker.Graph:3016
          if (! counter[value]) {
            $LASTPOS=1003051;//jslker.Graph:3051
            counter[value]=0;
            
          }
          $LASTPOS=1003089;//jslker.Graph:3089
          counter[value]++;
          $LASTPOS=1003115;//jslker.Graph:3115
          nativeValues[value]=value;
        }
      }
      $LASTPOS=1003154;//jslker.Graph:3154
      $LASTPOS=1003159;//jslker.Graph:3159
      j = 0;
      for (; j<Object.keys(counter).length ; j++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1003218;//jslker.Graph:3218
          _this.key=Object.keys(counter)[j];
          $LASTPOS=1003257;//jslker.Graph:3257
          if (counter[_this.key]>maxCounter) {
            $LASTPOS=1003302;//jslker.Graph:3302
            maxCounter=counter[_this.key];
            $LASTPOS=1003341;//jslker.Graph:3341
            maxValue=nativeValues[_this.key];
            
          }
        }
      }
      $LASTPOS=1003391;//jslker.Graph:3391
      ret = [];
      
      $LASTPOS=1003407;//jslker.Graph:3407
      $LASTPOS=1003412;//jslker.Graph:3412
      j = 0;
      for (; j<Object.keys(counter).length ; j++) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1003471;//jslker.Graph:3471
          _this.key=Object.keys(counter)[j];
          $LASTPOS=1003510;//jslker.Graph:3510
          if (counter[_this.key]==maxCounter) {
            $LASTPOS=1003556;//jslker.Graph:3556
            ret.push(nativeValues[_this.key]);
            
          }
        }
      }
      return {"mode": maxCounter,"nums": ret};
    },
    fiber$mode :function _trc_Graph_f_mode(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var counter;
      var nativeValues;
      var maxCounter;
      var maxValue;
      var i;
      var value;
      var j;
      var ret;
      
      $LASTPOS=1002833;//jslker.Graph:2833
      counter = {};
      
      $LASTPOS=1002855;//jslker.Graph:2855
      nativeValues = {};
      
      $LASTPOS=1002882;//jslker.Graph:2882
      maxCounter = 0;
      
      $LASTPOS=1002906;//jslker.Graph:2906
      maxValue = null;
      
      
      _thread.enter(function _trc_Graph_ent_mode(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1002931;//jslker.Graph:2931
            $LASTPOS=1002936;//jslker.Graph:2936
            i = 0;
            
          case 1:
            if (!(i<_this.src.length)) { __pc=4     ; break; }
            $LASTPOS=1002978;//jslker.Graph:2978
            _this.fiber$getValue(_thread, _this.src[i], k);
            __pc=2;return;
          case 2:
            value=_thread.retVal;
            
            $LASTPOS=1003016;//jslker.Graph:3016
            if (! counter[value]) {
              $LASTPOS=1003051;//jslker.Graph:3051
              counter[value]=0;
              
            }
            $LASTPOS=1003089;//jslker.Graph:3089
            counter[value]++;
            $LASTPOS=1003115;//jslker.Graph:3115
            nativeValues[value]=value;
          case 3     :
            i++;
            __pc=1;break;
          case 4     :
            
            $LASTPOS=1003154;//jslker.Graph:3154
            $LASTPOS=1003159;//jslker.Graph:3159
            j = 0;
            for (; j<Object.keys(counter).length ; j++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=1003218;//jslker.Graph:3218
                _this.key=Object.keys(counter)[j];
                $LASTPOS=1003257;//jslker.Graph:3257
                if (counter[_this.key]>maxCounter) {
                  $LASTPOS=1003302;//jslker.Graph:3302
                  maxCounter=counter[_this.key];
                  $LASTPOS=1003341;//jslker.Graph:3341
                  maxValue=nativeValues[_this.key];
                  
                }
              }
            }
            $LASTPOS=1003391;//jslker.Graph:3391
            ret = [];
            
            $LASTPOS=1003407;//jslker.Graph:3407
            $LASTPOS=1003412;//jslker.Graph:3412
            j = 0;
            for (; j<Object.keys(counter).length ; j++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=1003471;//jslker.Graph:3471
                _this.key=Object.keys(counter)[j];
                $LASTPOS=1003510;//jslker.Graph:3510
                if (counter[_this.key]==maxCounter) {
                  $LASTPOS=1003556;//jslker.Graph:3556
                  ret.push(nativeValues[_this.key]);
                  
                }
              }
            }
            _thread.exit({"mode": maxCounter,"nums": ret});return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    freq :function _trc_Graph_freq(k) {
      "use strict";
      var _this=this;
      var ret;
      var o;
      var _it_139;
      
      $LASTPOS=1003668;//jslker.Graph:3668
      ret = [];
      
      $LASTPOS=1003684;//jslker.Graph:3684
      _it_139=Tonyu.iterator(_this.vec(k),1);
      while(_it_139.next()) {
        o=_it_139[0];
        
        $LASTPOS=1003714;//jslker.Graph:3714
        if (ret[o[k]]) {
          $LASTPOS=1003741;//jslker.Graph:3741
          ret[o[k]]++;
          
        } else {
          $LASTPOS=1003781;//jslker.Graph:3781
          ret[o[k]]=1;
          
        }
        
      }
      return ret;
    },
    fiber$freq :function _trc_Graph_f_freq(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ret;
      var o;
      var _it_139;
      
      $LASTPOS=1003668;//jslker.Graph:3668
      ret = [];
      
      $LASTPOS=1003684;//jslker.Graph:3684
      _it_139=Tonyu.iterator(_this.vec(k),1);
      while(_it_139.next()) {
        o=_it_139[0];
        
        $LASTPOS=1003714;//jslker.Graph:3714
        if (ret[o[k]]) {
          $LASTPOS=1003741;//jslker.Graph:3741
          ret[o[k]]++;
          
        } else {
          $LASTPOS=1003781;//jslker.Graph:3781
          ret[o[k]]=1;
          
        }
        
      }
      _thread.retVal=ret;return;
      
      
      _thread.retVal=_this;return;
    },
    scatter :function _trc_Graph_scatter(xaxis,yaxis,isCor) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1003890;//jslker.Graph:3890
      if (typeof  xaxis==="boolean") {
        $LASTPOS=1003930;//jslker.Graph:3930
        isCor=xaxis;
        $LASTPOS=1003951;//jslker.Graph:3951
        xaxis="x";
        $LASTPOS=1003961;//jslker.Graph:3961
        yaxis="y";
        
      }
      $LASTPOS=1003982;//jslker.Graph:3982
      xaxis=xaxis||"x";
      $LASTPOS=1004004;//jslker.Graph:4004
      yaxis=yaxis||"y";
      $LASTPOS=1004026;//jslker.Graph:4026
      _this.bindType(xaxis,_this._xaxtype);
      $LASTPOS=1004056;//jslker.Graph:4056
      _this.bindType(yaxis,_this._yaxtype);
      $LASTPOS=1004091;//jslker.Graph:4091
      if (isCor==true) {
        $LASTPOS=1004107;//jslker.Graph:4107
        _this._setCorrelation(xaxis,yaxis,parseFloat(_this.min(xaxis)),parseFloat(_this.max(xaxis)),parseFloat((_this.max(xaxis)-_this.min(xaxis))/10));
      }
      $LASTPOS=1004226;//jslker.Graph:4226
      _this._drawGraph("scatter",xaxis,yaxis);
    },
    fiber$scatter :function _trc_Graph_f_scatter(_thread,xaxis,yaxis,isCor) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1003890;//jslker.Graph:3890
      if (typeof  xaxis==="boolean") {
        $LASTPOS=1003930;//jslker.Graph:3930
        isCor=xaxis;
        $LASTPOS=1003951;//jslker.Graph:3951
        xaxis="x";
        $LASTPOS=1003961;//jslker.Graph:3961
        yaxis="y";
        
      }
      $LASTPOS=1003982;//jslker.Graph:3982
      xaxis=xaxis||"x";
      $LASTPOS=1004004;//jslker.Graph:4004
      yaxis=yaxis||"y";
      
      _thread.enter(function _trc_Graph_ent_scatter(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1004026;//jslker.Graph:4026
            _this.fiber$bindType(_thread, xaxis, _this._xaxtype);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1004056;//jslker.Graph:4056
            _this.fiber$bindType(_thread, yaxis, _this._yaxtype);
            __pc=2;return;
          case 2:
            
            $LASTPOS=1004091;//jslker.Graph:4091
            if (!(isCor==true)) { __pc=4     ; break; }
            $LASTPOS=1004107;//jslker.Graph:4107
            _this.fiber$_setCorrelation(_thread, xaxis, yaxis, parseFloat(_this.min(xaxis)), parseFloat(_this.max(xaxis)), parseFloat((_this.max(xaxis)-_this.min(xaxis))/10));
            __pc=3;return;
          case 3:
            
          case 4     :
            
            $LASTPOS=1004226;//jslker.Graph:4226
            _this.fiber$_drawGraph(_thread, "scatter", xaxis, yaxis);
            __pc=5;return;
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    pie :function _trc_Graph_pie(xaxis,yaxis) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1004294;//jslker.Graph:4294
      _this._drawGraph("pie",xaxis,yaxis);
    },
    fiber$pie :function _trc_Graph_f_pie(_thread,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Graph_ent_pie(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1004294;//jslker.Graph:4294
            _this.fiber$_drawGraph(_thread, "pie", xaxis, yaxis);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    _drawGraph :function _trc_Graph__drawGraph(type,xaxis,yaxis) {
      "use strict";
      var _this=this;
      var x;
      var y;
      var xaxopt;
      var yaxopt;
      var xt;
      var yt;
      var mode;
      var data;
      var options;
      
      $LASTPOS=1004370;//jslker.Graph:4370
      xaxis=xaxis||"x";
      $LASTPOS=1004392;//jslker.Graph:4392
      yaxis=yaxis||"y";
      $LASTPOS=1004414;//jslker.Graph:4414
      _this.bindType(xaxis,_this._xaxtype);
      $LASTPOS=1004444;//jslker.Graph:4444
      _this.bindType(yaxis,_this._yaxtype);
      $LASTPOS=1004474;//jslker.Graph:4474
      x = [];
      
      $LASTPOS=1004488;//jslker.Graph:4488
      y = [];
      
      $LASTPOS=1004502;//jslker.Graph:4502
      xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
      
      $LASTPOS=1004706;//jslker.Graph:4706
      yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
      
      $LASTPOS=1004941;//jslker.Graph:4941
      console.log("range",_this._xrange,_this._yrange);
      $LASTPOS=1004983;//jslker.Graph:4983
      xt = _this.detectType(xaxis);
      
      $LASTPOS=1005013;//jslker.Graph:5013
      yt = _this.detectType(yaxis);
      
      $LASTPOS=1005043;//jslker.Graph:5043
      if (xt=="date"||xt=="time"||xt=="msec") {
        $LASTPOS=1005091;//jslker.Graph:5091
        xaxopt["type"]='date';
        
      }
      $LASTPOS=1005124;//jslker.Graph:5124
      if (yt=="date"||yt=="time"||yt=="msec") {
        $LASTPOS=1005172;//jslker.Graph:5172
        yaxopt["type"]='date';
        
      }
      $LASTPOS=1005205;//jslker.Graph:5205
      x=_this.vec(xaxis);
      $LASTPOS=1005223;//jslker.Graph:5223
      y=_this.vec(yaxis);
      $LASTPOS=1005467;//jslker.Graph:5467
      if (type=="scatter") {
        $LASTPOS=1005496;//jslker.Graph:5496
        mode = "markers";
        
        
      } else {
        $LASTPOS=1005535;//jslker.Graph:5535
        mode = "lines";
        
        
      }
      $LASTPOS=1005563;//jslker.Graph:5563
      data = [{x: x,y: y,type: type,mode: mode}];
      
      $LASTPOS=1005666;//jslker.Graph:5666
      if (_this._isDrawCor===true) {
        $LASTPOS=1005697;//jslker.Graph:5697
        _this._corObj.mode='lines';
        $LASTPOS=1005727;//jslker.Graph:5727
        _this._corObj.line={dash: 'dot',width: 4};
        $LASTPOS=1005770;//jslker.Graph:5770
        data.push(_this._corObj);
        
      }
      $LASTPOS=1005800;//jslker.Graph:5800
      options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
      
      $LASTPOS=1006407;//jslker.Graph:6407
      _this.onLoadLib((function anonymous_6417(Plotly) {
        
        $LASTPOS=1006437;//jslker.Graph:6437
        Plotly.newPlot(_this._place,data,options);
      }));
    },
    fiber$_drawGraph :function _trc_Graph_f__drawGraph(_thread,type,xaxis,yaxis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var x;
      var y;
      var xaxopt;
      var yaxopt;
      var xt;
      var yt;
      var mode;
      var data;
      var options;
      
      $LASTPOS=1004370;//jslker.Graph:4370
      xaxis=xaxis||"x";
      $LASTPOS=1004392;//jslker.Graph:4392
      yaxis=yaxis||"y";
      
      _thread.enter(function _trc_Graph_ent__drawGraph(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1004414;//jslker.Graph:4414
            _this.fiber$bindType(_thread, xaxis, _this._xaxtype);
            __pc=1;return;
          case 1:
            
            $LASTPOS=1004444;//jslker.Graph:4444
            _this.fiber$bindType(_thread, yaxis, _this._yaxtype);
            __pc=2;return;
          case 2:
            
            $LASTPOS=1004474;//jslker.Graph:4474
            x = [];
            
            $LASTPOS=1004488;//jslker.Graph:4488
            y = [];
            
            $LASTPOS=1004502;//jslker.Graph:4502
            xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
            
            $LASTPOS=1004706;//jslker.Graph:4706
            yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
            
            $LASTPOS=1004941;//jslker.Graph:4941
            console.log("range",_this._xrange,_this._yrange);
            $LASTPOS=1004983;//jslker.Graph:4983
            _this.fiber$detectType(_thread, xaxis);
            __pc=3;return;
          case 3:
            xt=_thread.retVal;
            
            $LASTPOS=1005013;//jslker.Graph:5013
            _this.fiber$detectType(_thread, yaxis);
            __pc=4;return;
          case 4:
            yt=_thread.retVal;
            
            $LASTPOS=1005043;//jslker.Graph:5043
            if (xt=="date"||xt=="time"||xt=="msec") {
              $LASTPOS=1005091;//jslker.Graph:5091
              xaxopt["type"]='date';
              
            }
            $LASTPOS=1005124;//jslker.Graph:5124
            if (yt=="date"||yt=="time"||yt=="msec") {
              $LASTPOS=1005172;//jslker.Graph:5172
              yaxopt["type"]='date';
              
            }
            $LASTPOS=1005205;//jslker.Graph:5205
            _this.fiber$vec(_thread, xaxis);
            __pc=5;return;
          case 5:
            x=_thread.retVal;
            
            $LASTPOS=1005223;//jslker.Graph:5223
            _this.fiber$vec(_thread, yaxis);
            __pc=6;return;
          case 6:
            y=_thread.retVal;
            
            $LASTPOS=1005467;//jslker.Graph:5467
            if (type=="scatter") {
              $LASTPOS=1005496;//jslker.Graph:5496
              mode = "markers";
              
              
            } else {
              $LASTPOS=1005535;//jslker.Graph:5535
              mode = "lines";
              
              
            }
            $LASTPOS=1005563;//jslker.Graph:5563
            data = [{x: x,y: y,type: type,mode: mode}];
            
            $LASTPOS=1005666;//jslker.Graph:5666
            if (_this._isDrawCor===true) {
              $LASTPOS=1005697;//jslker.Graph:5697
              _this._corObj.mode='lines';
              $LASTPOS=1005727;//jslker.Graph:5727
              _this._corObj.line={dash: 'dot',width: 4};
              $LASTPOS=1005770;//jslker.Graph:5770
              data.push(_this._corObj);
              
            }
            $LASTPOS=1005800;//jslker.Graph:5800
            options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
            
            $LASTPOS=1006407;//jslker.Graph:6407
            _this.fiber$onLoadLib(_thread, (function anonymous_6417(Plotly) {
              
              $LASTPOS=1006437;//jslker.Graph:6437
              Plotly.newPlot(_this._place,data,options);
            }));
            __pc=7;return;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getValue :function _trc_Graph_getValue(record,name) {
      "use strict";
      var _this=this;
      var type;
      
      $LASTPOS=1006537;//jslker.Graph:6537
      type = _this.detectType(name);
      
      return _this.convertValue(record[name],type);
    },
    fiber$getValue :function _trc_Graph_f_getValue(_thread,record,name) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var type;
      
      
      _thread.enter(function _trc_Graph_ent_getValue(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1006537;//jslker.Graph:6537
            _this.fiber$detectType(_thread, name);
            __pc=1;return;
          case 1:
            type=_thread.retVal;
            
            _thread.exit(_this.convertValue(record[name],type));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    detectType :function _trc_Graph_detectType(name) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1006642;//jslker.Graph:6642
      if (_this._typemap[name]) {
        return _this._typemap[name];
      }
      return (name=="time"||name=="date"?"date":"number");
    },
    fiber$detectType :function _trc_Graph_f_detectType(_thread,name) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1006642;//jslker.Graph:6642
      if (_this._typemap[name]) {
        _thread.retVal=_this._typemap[name];return;
        
      }
      _thread.retVal=(name=="time"||name=="date"?"date":"number");return;
      
      
      _thread.retVal=_this;return;
    },
    convertValue :function _trc_Graph_convertValue(val,type) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1006784;//jslker.Graph:6784
      if (type=="msec"||type=="sec"||type=="date"||type=="time") {
        return _this.convertTime(val,type);
        
      }
      $LASTPOS=1006904;//jslker.Graph:6904
      if (type=="number") {
        return val-0;
      }
      return val;
    },
    fiber$convertValue :function _trc_Graph_f_convertValue(_thread,val,type) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1006784;//jslker.Graph:6784
      if (type=="msec"||type=="sec"||type=="date"||type=="time") {
        _thread.retVal=_this.convertTime(val,type);return;
        
        
      }
      $LASTPOS=1006904;//jslker.Graph:6904
      if (type=="number") {
        _thread.retVal=val-0;return;
        
      }
      _thread.retVal=val;return;
      
      
      _thread.retVal=_this;return;
    },
    convertTime :function _trc_Graph_convertTime(t,to) {
      "use strict";
      var _this=this;
      var n;
      
      $LASTPOS=1007028;//jslker.Graph:7028
      to=to||"msec";
      $LASTPOS=1007047;//jslker.Graph:7047
      n = _this.looksLikeNumber(t);
      
      $LASTPOS=1007077;//jslker.Graph:7077
      if (n) {
        $LASTPOS=1007094;//jslker.Graph:7094
        if (n<3000000000) {
          $LASTPOS=1007151;//jslker.Graph:7151
          n*=1000;
          
        }
        $LASTPOS=1007178;//jslker.Graph:7178
        if (to==="sec") {
          $LASTPOS=1007194;//jslker.Graph:7194
          n/=1000;
        }
        return n;
        
      }
      return t;
    },
    fiber$convertTime :function _trc_Graph_f_convertTime(_thread,t,to) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var n;
      
      $LASTPOS=1007028;//jslker.Graph:7028
      to=to||"msec";
      
      _thread.enter(function _trc_Graph_ent_convertTime(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1007047;//jslker.Graph:7047
            _this.fiber$looksLikeNumber(_thread, t);
            __pc=1;return;
          case 1:
            n=_thread.retVal;
            
            $LASTPOS=1007077;//jslker.Graph:7077
            if (!(n)) { __pc=2     ; break; }
            $LASTPOS=1007094;//jslker.Graph:7094
            if (n<3000000000) {
              $LASTPOS=1007151;//jslker.Graph:7151
              n*=1000;
              
            }
            $LASTPOS=1007178;//jslker.Graph:7178
            if (to==="sec") {
              $LASTPOS=1007194;//jslker.Graph:7194
              n/=1000;
            }
            _thread.exit(n);return;
          case 2     :
            
            _thread.exit(t);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    looksLikeNumber :function _trc_Graph_looksLikeNumber(n) {
      "use strict";
      var _this=this;
      
      $LASTPOS=1007277;//jslker.Graph:7277
      if (typeof  n=="number") {
        return n;
      }
      $LASTPOS=1007315;//jslker.Graph:7315
      if (typeof  n=="string") {
        $LASTPOS=1007349;//jslker.Graph:7349
        n-=0;
        $LASTPOS=1007363;//jslker.Graph:7363
        if (n===n) {
          return n;
        }
        
      }
      return false;
    },
    fiber$looksLikeNumber :function _trc_Graph_f_looksLikeNumber(_thread,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1007277;//jslker.Graph:7277
      if (typeof  n=="number") {
        _thread.retVal=n;return;
        
      }
      $LASTPOS=1007315;//jslker.Graph:7315
      if (typeof  n=="string") {
        $LASTPOS=1007349;//jslker.Graph:7349
        n-=0;
        $LASTPOS=1007363;//jslker.Graph:7363
        if (n===n) {
          _thread.retVal=n;return;
          
        }
        
      }
      _thread.retVal=false;return;
      
      
      _thread.retVal=_this;return;
    },
    sum :function _trc_Graph_sum(k) {
      "use strict";
      var _this=this;
      var s;
      var v;
      var _it_155;
      
      $LASTPOS=1007445;//jslker.Graph:7445
      s = 0;
      
      $LASTPOS=1007458;//jslker.Graph:7458
      if (typeof  (k)==="object") {
        $LASTPOS=1007492;//jslker.Graph:7492
        $LASTPOS=1007496;//jslker.Graph:7496
        _this.i=0;for (; _this.i<k.length ; _this.i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=1007529;//jslker.Graph:7529
            s+=k[_this.i]-0;
          }
        }
        
      } else {
        $LASTPOS=1007569;//jslker.Graph:7569
        _it_155=Tonyu.iterator(_this.vec(k),1);
        while(_it_155.next()) {
          v=_it_155[0];
          
          $LASTPOS=1007603;//jslker.Graph:7603
          s+=v-0;
          
        }
        
      }
      return s;
    },
    fiber$sum :function _trc_Graph_f_sum(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      var v;
      var _it_155;
      
      $LASTPOS=1007445;//jslker.Graph:7445
      s = 0;
      
      $LASTPOS=1007458;//jslker.Graph:7458
      if (typeof  (k)==="object") {
        $LASTPOS=1007492;//jslker.Graph:7492
        $LASTPOS=1007496;//jslker.Graph:7496
        _this.i=0;for (; _this.i<k.length ; _this.i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=1007529;//jslker.Graph:7529
            s+=k[_this.i]-0;
          }
        }
        
      } else {
        $LASTPOS=1007569;//jslker.Graph:7569
        _it_155=Tonyu.iterator(_this.vec(k),1);
        while(_it_155.next()) {
          v=_it_155[0];
          
          $LASTPOS=1007603;//jslker.Graph:7603
          s+=v-0;
          
        }
        
      }
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    mean :function _trc_Graph_mean(k) {
      "use strict";
      var _this=this;
      var a;
      
      $LASTPOS=1007665;//jslker.Graph:7665
      a = 0;
      
      $LASTPOS=1007678;//jslker.Graph:7678
      if (typeof  (k)==="object") {
        $LASTPOS=1007712;//jslker.Graph:7712
        a=_this.sum(k)/k.length;
        
      } else {
        $LASTPOS=1007750;//jslker.Graph:7750
        a=_this.sum(k)/_this.src.length;
        
      }
      return a;
    },
    fiber$mean :function _trc_Graph_f_mean(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      $LASTPOS=1007665;//jslker.Graph:7665
      a = 0;
      
      $LASTPOS=1007678;//jslker.Graph:7678
      if (typeof  (k)==="object") {
        $LASTPOS=1007712;//jslker.Graph:7712
        a=_this.sum(k)/k.length;
        
      } else {
        $LASTPOS=1007750;//jslker.Graph:7750
        a=_this.sum(k)/_this.src.length;
        
      }
      _thread.retVal=a;return;
      
      
      _thread.retVal=_this;return;
    },
    dev :function _trc_Graph_dev(k) {
      "use strict";
      var _this=this;
      var d;
      var a;
      var i;
      var v;
      var _it_160;
      
      $LASTPOS=1007814;//jslker.Graph:7814
      d = [];
      a = 0;
      
      $LASTPOS=1007832;//jslker.Graph:7832
      if (k===undefined) {
        $LASTPOS=1007859;//jslker.Graph:7859
        a=_this.mean(_this.src);
        $LASTPOS=1007880;//jslker.Graph:7880
        $LASTPOS=1007884;//jslker.Graph:7884
        i = 0;
        for (; i<_this.src.length ; i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=1007923;//jslker.Graph:7923
            d.push(_this.src[i]-a);
          }
        }
        
      } else {
        $LASTPOS=1007970;//jslker.Graph:7970
        a=_this.mean(k);
        $LASTPOS=1007989;//jslker.Graph:7989
        _it_160=Tonyu.iterator(_this.vec(k),1);
        while(_it_160.next()) {
          v=_it_160[0];
          
          $LASTPOS=1008023;//jslker.Graph:8023
          d.push(v-a);
          
        }
        
      }
      return d;
    },
    fiber$dev :function _trc_Graph_f_dev(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      var a;
      var i;
      var v;
      var _it_160;
      
      $LASTPOS=1007814;//jslker.Graph:7814
      d = [];
      a = 0;
      
      
      _thread.enter(function _trc_Graph_ent_dev(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1007832;//jslker.Graph:7832
            if (!(k===undefined)) { __pc=2     ; break; }
            $LASTPOS=1007859;//jslker.Graph:7859
            _this.fiber$mean(_thread, _this.src);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            $LASTPOS=1007880;//jslker.Graph:7880
            $LASTPOS=1007884;//jslker.Graph:7884
            i = 0;
            for (; i<_this.src.length ; i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=1007923;//jslker.Graph:7923
                d.push(_this.src[i]-a);
              }
            }
            __pc=4     ;break;
          case 2     :
            $LASTPOS=1007970;//jslker.Graph:7970
            _this.fiber$mean(_thread, k);
            __pc=3;return;
          case 3:
            a=_thread.retVal;
            
            $LASTPOS=1007989;//jslker.Graph:7989
            _it_160=Tonyu.iterator(_this.vec(k),1);
            while(_it_160.next()) {
              v=_it_160[0];
              
              $LASTPOS=1008023;//jslker.Graph:8023
              d.push(v-a);
              
            }
          case 4     :
            
            _thread.exit(d);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    vari :function _trc_Graph_vari(k) {
      "use strict";
      var _this=this;
      var ary;
      var deved;
      var i;
      
      $LASTPOS=1008090;//jslker.Graph:8090
      ary = [];
      
      $LASTPOS=1008106;//jslker.Graph:8106
      if (k===undefined) {
        $LASTPOS=1008133;//jslker.Graph:8133
        deved = _this.dev(_this.src);
        
        $LASTPOS=1008161;//jslker.Graph:8161
        $LASTPOS=1008165;//jslker.Graph:8165
        i = 0;
        for (; i<deved.length ; i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=1008206;//jslker.Graph:8206
            ary.push(Math.pow(deved[i],2));
          }
        }
        
      } else {
        $LASTPOS=1008267;//jslker.Graph:8267
        deved = _this.dev(k);
        
        $LASTPOS=1008293;//jslker.Graph:8293
        console.log(deved);
        $LASTPOS=1008321;//jslker.Graph:8321
        $LASTPOS=1008325;//jslker.Graph:8325
        i = 0;
        for (; i<deved.length ; i++) {
          Tonyu.checkLoop();
          {
            $LASTPOS=1008366;//jslker.Graph:8366
            ary.push(Math.pow(deved[i],2));
          }
        }
        
      }
      $LASTPOS=1008418;//jslker.Graph:8418
      console.log("arrry",ary);
      return _this.mean(ary);
    },
    fiber$vari :function _trc_Graph_f_vari(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ary;
      var deved;
      var i;
      
      $LASTPOS=1008090;//jslker.Graph:8090
      ary = [];
      
      
      _thread.enter(function _trc_Graph_ent_vari(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008106;//jslker.Graph:8106
            if (!(k===undefined)) { __pc=2     ; break; }
            $LASTPOS=1008133;//jslker.Graph:8133
            _this.fiber$dev(_thread, _this.src);
            __pc=1;return;
          case 1:
            deved=_thread.retVal;
            
            $LASTPOS=1008161;//jslker.Graph:8161
            $LASTPOS=1008165;//jslker.Graph:8165
            i = 0;
            for (; i<deved.length ; i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=1008206;//jslker.Graph:8206
                ary.push(Math.pow(deved[i],2));
              }
            }
            __pc=4     ;break;
          case 2     :
            $LASTPOS=1008267;//jslker.Graph:8267
            _this.fiber$dev(_thread, k);
            __pc=3;return;
          case 3:
            deved=_thread.retVal;
            
            $LASTPOS=1008293;//jslker.Graph:8293
            console.log(deved);
            $LASTPOS=1008321;//jslker.Graph:8321
            $LASTPOS=1008325;//jslker.Graph:8325
            i = 0;
            for (; i<deved.length ; i++) {
              Tonyu.checkLoop();
              {
                $LASTPOS=1008366;//jslker.Graph:8366
                ary.push(Math.pow(deved[i],2));
              }
            }
          case 4     :
            
            $LASTPOS=1008418;//jslker.Graph:8418
            console.log("arrry",ary);
            _thread.exit(_this.mean(ary));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    std :function _trc_Graph_std(k) {
      "use strict";
      var _this=this;
      var disp;
      
      $LASTPOS=1008489;//jslker.Graph:8489
      disp = _this.vari(k);
      
      return Math.sqrt(disp);
    },
    fiber$std :function _trc_Graph_f_std(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var disp;
      
      
      _thread.enter(function _trc_Graph_ent_std(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008489;//jslker.Graph:8489
            _this.fiber$vari(_thread, k);
            __pc=1;return;
          case 1:
            disp=_thread.retVal;
            
            _thread.exit(Math.sqrt(disp));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    cov :function _trc_Graph_cov(k1,k2) {
      "use strict";
      var _this=this;
      var dev1;
      var dev2;
      var dataCov;
      var k;
      var v;
      var _it_170;
      
      $LASTPOS=1008562;//jslker.Graph:8562
      dev1 = _this.dev(k1);
      
      $LASTPOS=1008584;//jslker.Graph:8584
      dev2 = _this.dev(k2);
      
      $LASTPOS=1008606;//jslker.Graph:8606
      dataCov = 0;
      
      $LASTPOS=1008625;//jslker.Graph:8625
      _it_170=Tonyu.iterator(dev1,2);
      while(_it_170.next()) {
        k=_it_170[0];
        v=_it_170[1];
        
        $LASTPOS=1008655;//jslker.Graph:8655
        dataCov+=dev1[k]*dev2[k];
        
      }
      $LASTPOS=1008691;//jslker.Graph:8691
      dataCov=dataCov/dev1.length;
      return dataCov;
    },
    fiber$cov :function _trc_Graph_f_cov(_thread,k1,k2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var dev1;
      var dev2;
      var dataCov;
      var k;
      var v;
      var _it_170;
      
      
      _thread.enter(function _trc_Graph_ent_cov(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008562;//jslker.Graph:8562
            _this.fiber$dev(_thread, k1);
            __pc=1;return;
          case 1:
            dev1=_thread.retVal;
            
            $LASTPOS=1008584;//jslker.Graph:8584
            _this.fiber$dev(_thread, k2);
            __pc=2;return;
          case 2:
            dev2=_thread.retVal;
            
            $LASTPOS=1008606;//jslker.Graph:8606
            dataCov = 0;
            
            $LASTPOS=1008625;//jslker.Graph:8625
            _it_170=Tonyu.iterator(dev1,2);
            while(_it_170.next()) {
              k=_it_170[0];
              v=_it_170[1];
              
              $LASTPOS=1008655;//jslker.Graph:8655
              dataCov+=dev1[k]*dev2[k];
              
            }
            $LASTPOS=1008691;//jslker.Graph:8691
            dataCov=dataCov/dev1.length;
            _thread.exit(dataCov);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    corrcoef :function _trc_Graph_corrcoef(k1,k2) {
      "use strict";
      var _this=this;
      var cov1;
      var std1;
      var std2;
      
      $LASTPOS=1008772;//jslker.Graph:8772
      cov1 = _this.cov(k1,k2);
      
      $LASTPOS=1008797;//jslker.Graph:8797
      std1 = _this.std(k1);
      
      $LASTPOS=1008819;//jslker.Graph:8819
      std2 = _this.std(k2);
      
      return cov1/(std1*std2);
    },
    fiber$corrcoef :function _trc_Graph_f_corrcoef(_thread,k1,k2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cov1;
      var std1;
      var std2;
      
      
      _thread.enter(function _trc_Graph_ent_corrcoef(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=1008772;//jslker.Graph:8772
            _this.fiber$cov(_thread, k1, k2);
            __pc=1;return;
          case 1:
            cov1=_thread.retVal;
            
            $LASTPOS=1008797;//jslker.Graph:8797
            _this.fiber$std(_thread, k1);
            __pc=2;return;
          case 2:
            std1=_thread.retVal;
            
            $LASTPOS=1008819;//jslker.Graph:8819
            _this.fiber$std(_thread, k2);
            __pc=3;return;
          case 3:
            std2=_thread.retVal;
            
            _thread.exit(cov1/(std1*std2));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    _correlation :function _trc_Graph__correlation(d1,d2,min,max,interval) {
      "use strict";
      var _this=this;
      var a;
      var b;
      var x;
      var y;
      var i;
      
      $LASTPOS=1008921;//jslker.Graph:8921
      a = _this.corrcoef(d1,d2)*(_this.std(d2)/_this.std(d1));
      
      $LASTPOS=1008966;//jslker.Graph:8966
      b = _this.mean(d2)-(a*_this.mean(d1));
      
      $LASTPOS=1008999;//jslker.Graph:8999
      x = [];
      
      $LASTPOS=1009013;//jslker.Graph:9013
      y = [];
      
      $LASTPOS=1009063;//jslker.Graph:9063
      $LASTPOS=1009067;//jslker.Graph:9067
      i = min;
      for (; i<=max+1 ; i=i+interval) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1009109;//jslker.Graph:9109
          x.push(i);
          $LASTPOS=1009128;//jslker.Graph:9128
          y.push(a*i+b);
        }
      }
      return {x: x,y: y};
    },
    fiber$_correlation :function _trc_Graph_f__correlation(_thread,d1,d2,min,max,interval) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var b;
      var x;
      var y;
      var i;
      
      $LASTPOS=1008921;//jslker.Graph:8921
      a = _this.corrcoef(d1,d2)*(_this.std(d2)/_this.std(d1));
      
      $LASTPOS=1008966;//jslker.Graph:8966
      b = _this.mean(d2)-(a*_this.mean(d1));
      
      $LASTPOS=1008999;//jslker.Graph:8999
      x = [];
      
      $LASTPOS=1009013;//jslker.Graph:9013
      y = [];
      
      $LASTPOS=1009063;//jslker.Graph:9063
      $LASTPOS=1009067;//jslker.Graph:9067
      i = min;
      for (; i<=max+1 ; i=i+interval) {
        Tonyu.checkLoop();
        {
          $LASTPOS=1009109;//jslker.Graph:9109
          x.push(i);
          $LASTPOS=1009128;//jslker.Graph:9128
          y.push(a*i+b);
        }
      }
      _thread.retVal={x: x,y: y};return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"setData":{"nowait":false},"addData":{"nowait":false},"onLoadLib":{"nowait":false},"waitLoadLib":{"nowait":false},"_setCorrelation":{"nowait":false},"setAxisText":{"nowait":false},"setXAxisText":{"nowait":false},"setYAxisText":{"nowait":false},"setAxisType":{"nowait":false},"setXAxisType":{"nowait":false},"setYAxisType":{"nowait":false},"bindType":{"nowait":false},"setXRange":{"nowait":false},"setYRange":{"nowait":false},"line":{"nowait":false},"bar":{"nowait":false},"vec":{"nowait":false},"min":{"nowait":false},"max":{"nowait":false},"med":{"nowait":false},"mode":{"nowait":false},"freq":{"nowait":false},"scatter":{"nowait":false},"pie":{"nowait":false},"_drawGraph":{"nowait":false},"getValue":{"nowait":false},"detectType":{"nowait":false},"convertValue":{"nowait":false},"convertTime":{"nowait":false},"looksLikeNumber":{"nowait":false},"sum":{"nowait":false},"mean":{"nowait":false},"dev":{"nowait":false},"vari":{"nowait":false},"std":{"nowait":false},"cov":{"nowait":false},"corrcoef":{"nowait":false},"_correlation":{"nowait":false}},"fields":{"plotlyURL":{},"loadLibHandlers":{},"src":{},"_typemap":{},"Plotly":{},"_xaxtype":{},"_yaxtype":{},"_xrange":{},"_yrange":{},"key":{},"_isDrawCor":{},"_corObj":{},"_yaxname":{},"_xaxname":{},"_place":{},"i":{}}}
});
Tonyu.klass.define({
  fullName: 'jslker.Parent',
  shortName: 'Parent',
  namespace: 'jslker',
  includes: [],
  methods: {
    main :function _trc_Parent_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Parent_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __getter__Math :function _trc_Parent___getter__Math() {
      "use strict";
      var _this=this;
      
      return window.Math;
    },
    __getter__document :function _trc_Parent___getter__document() {
      "use strict";
      var _this=this;
      
      return window.document;
    },
    setInterval :function _trc_Parent_setInterval(f,t) {
      "use strict";
      var _this=this;
      
      return window.setInterval(_this.catchException(f),t);
    },
    fiber$setInterval :function _trc_Parent_f_setInterval(_thread,f,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=window.setInterval(_this.catchException(f),t);return;
      
      
      _thread.retVal=_this;return;
    },
    setTimeout :function _trc_Parent_setTimeout(f,t) {
      "use strict";
      var _this=this;
      
      return window.setTimeout(_this.catchException(f),t);
    },
    fiber$setTimeout :function _trc_Parent_f_setTimeout(_thread,f,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=window.setTimeout(_this.catchException(f),t);return;
      
      
      _thread.retVal=_this;return;
    },
    catchException :function _trc_Parent_catchException(f) {
      "use strict";
      var _this=this;
      
      return (function anonymous_453() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=2000603;//jslker.Parent:603
          window.onerror("","","","",e);
          
        }
      });
    },
    fiber$catchException :function _trc_Parent_f_catchException(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(function anonymous_453() {
        var e;
        
        try {
          return f.apply(_this,arguments);
          
        } catch (e) {
          $LASTPOS=2000603;//jslker.Parent:603
          window.onerror("","","","",e);
          
        }
      });return;
      
      
      _thread.retVal=_this;return;
    },
    findElement :function _trc_Parent_findElement(elem) {
      "use strict";
      var _this=this;
      var res;
      
      $LASTPOS=2000683;//jslker.Parent:683
      if (elem instanceof $) {
        return elem;
      }
      $LASTPOS=2000724;//jslker.Parent:724
      res = $("[name="+elem+"]");
      
      $LASTPOS=2000759;//jslker.Parent:759
      if (res[0]) {
        return res;
      }
      return $("#"+elem);
    },
    fiber$findElement :function _trc_Parent_f_findElement(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      $LASTPOS=2000683;//jslker.Parent:683
      if (elem instanceof $) {
        _thread.retVal=elem;return;
        
      }
      $LASTPOS=2000724;//jslker.Parent:724
      res = $("[name="+elem+"]");
      
      $LASTPOS=2000759;//jslker.Parent:759
      if (res[0]) {
        _thread.retVal=res;return;
        
      }
      _thread.retVal=$("#"+elem);return;
      
      
      _thread.retVal=_this;return;
    },
    isFormElement :function _trc_Parent_isFormElement(elem) {
      "use strict";
      var _this=this;
      var t;
      
      $LASTPOS=2000840;//jslker.Parent:840
      elem=_this.findElement(elem);
      $LASTPOS=2000869;//jslker.Parent:869
      if (! elem[0]) {
        return false;
      }
      $LASTPOS=2000902;//jslker.Parent:902
      t = (""+elem[0].tagName).toLowerCase();
      
      return t==="input"||t==="textarea";
    },
    fiber$isFormElement :function _trc_Parent_f_isFormElement(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      
      _thread.enter(function _trc_Parent_ent_isFormElement(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2000840;//jslker.Parent:840
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=2000869;//jslker.Parent:869
            if (!(! elem[0])) { __pc=2     ; break; }
            _thread.exit(false);return;
          case 2     :
            
            $LASTPOS=2000902;//jslker.Parent:902
            t = (""+elem[0].tagName).toLowerCase();
            
            _thread.exit(t==="input"||t==="textarea");return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    clearContent :function _trc_Parent_clearContent(elem) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001018;//jslker.Parent:1018
      elem=_this.findElement(elem);
      $LASTPOS=2001047;//jslker.Parent:1047
      if (_this.isFormElement(elem)) {
        $LASTPOS=2001083;//jslker.Parent:1083
        elem.val("");
        
      } else {
        $LASTPOS=2001120;//jslker.Parent:1120
        elem.empty();
        
      }
    },
    fiber$clearContent :function _trc_Parent_f_clearContent(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_clearContent(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2001018;//jslker.Parent:1018
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=2001047;//jslker.Parent:1047
            if (_this.isFormElement(elem)) {
              $LASTPOS=2001083;//jslker.Parent:1083
              elem.val("");
              
            } else {
              $LASTPOS=2001120;//jslker.Parent:1120
              elem.empty();
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    addText :function _trc_Parent_addText(elem,val) {
      "use strict";
      var _this=this;
      var dst;
      
      $LASTPOS=2001170;//jslker.Parent:1170
      elem=_this.findElement(elem);
      $LASTPOS=2001199;//jslker.Parent:1199
      if (_this.isFormElement(elem)) {
        $LASTPOS=2001235;//jslker.Parent:1235
        elem.val(elem.val()+val);
        
      } else {
        $LASTPOS=2001287;//jslker.Parent:1287
        if (_this.document.baWriteTo) {
          $LASTPOS=2001326;//jslker.Parent:1326
          dst = elem[0];
          
          $LASTPOS=2001356;//jslker.Parent:1356
          if (dst) {
            $LASTPOS=2001365;//jslker.Parent:1365
            _this.document.baWriteTo(dst,val);
          }
          
        } else {
          $LASTPOS=2001426;//jslker.Parent:1426
          elem.append(val);
          
        }
        
      }
    },
    fiber$addText :function _trc_Parent_f_addText(_thread,elem,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var dst;
      
      
      _thread.enter(function _trc_Parent_ent_addText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2001170;//jslker.Parent:1170
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=2001199;//jslker.Parent:1199
            if (_this.isFormElement(elem)) {
              $LASTPOS=2001235;//jslker.Parent:1235
              elem.val(elem.val()+val);
              
            } else {
              $LASTPOS=2001287;//jslker.Parent:1287
              if (_this.document.baWriteTo) {
                $LASTPOS=2001326;//jslker.Parent:1326
                dst = elem[0];
                
                $LASTPOS=2001356;//jslker.Parent:1356
                if (dst) {
                  $LASTPOS=2001365;//jslker.Parent:1365
                  _this.document.baWriteTo(dst,val);
                }
                
              } else {
                $LASTPOS=2001426;//jslker.Parent:1426
                elem.append(val);
                
              }
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    setText :function _trc_Parent_setText(elem,val) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001491;//jslker.Parent:1491
      _this.clearContent(elem);
      $LASTPOS=2001516;//jslker.Parent:1516
      _this.addText(elem,val);
    },
    fiber$setText :function _trc_Parent_f_setText(_thread,elem,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_setText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2001491;//jslker.Parent:1491
            _this.fiber$clearContent(_thread, elem);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2001516;//jslker.Parent:1516
            _this.fiber$addText(_thread, elem, val);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getNumber :function _trc_Parent_getNumber(elem) {
      "use strict";
      var _this=this;
      
      return _this.getText(elem)-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.getText(elem)-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001611;//jslker.Parent:1611
      elem=_this.findElement(elem);
      $LASTPOS=2001640;//jslker.Parent:1640
      if (_this.isFormElement(elem)) {
        return elem.val();
        
      } else {
        return elem[0]&&elem[0].innerHTML;
        
      }
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_getText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2001611;//jslker.Parent:1611
            _this.fiber$findElement(_thread, elem);
            __pc=1;return;
          case 1:
            elem=_thread.retVal;
            
            $LASTPOS=2001640;//jslker.Parent:1640
            if (!(_this.isFormElement(elem))) { __pc=2     ; break; }
            _thread.exit(elem.val());return;
            __pc=3     ;break;
          case 2     :
            _thread.exit(elem[0]&&elem[0].innerHTML);return;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2001793;//jslker.Parent:1793
      _this.setText(elem,num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_setNumber(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2001793;//jslker.Parent:1793
            _this.fiber$setText(_thread, elem, num);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onClick :function _trc_Parent_onClick(elem,func) {
      "use strict";
      var _this=this;
      var usepara;
      var fname;
      
      
      $LASTPOS=2001868;//jslker.Parent:1868
      if (typeof  func=='function') {
        $LASTPOS=2001908;//jslker.Parent:1908
        if (func.methodInfo) {
          $LASTPOS=2001944;//jslker.Parent:1944
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=2002018;//jslker.Parent:2018
        fname=func+"";
        
      }
      $LASTPOS=2002045;//jslker.Parent:2045
      if (typeof  fname=="string") {
        $LASTPOS=2002084;//jslker.Parent:2084
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=2002151;//jslker.Parent:2151
        if (_this["fiber$"+fname]) {
          $LASTPOS=2002192;//jslker.Parent:2192
          usepara=true;
          
        }
        
      }
      $LASTPOS=2002229;//jslker.Parent:2229
      if (usepara) {
        $LASTPOS=2002253;//jslker.Parent:2253
        _this.findElement(elem).click(_this.catchException((function anonymous_2292() {
          
          $LASTPOS=2002309;//jslker.Parent:2309
          _this.parallel(fname);
        })));
        
      } else {
        $LASTPOS=2002423;//jslker.Parent:2423
        _this.findElement(elem).click(_this.catchException(func));
        
      }
    },
    fiber$onClick :function _trc_Parent_f_onClick(_thread,elem,func) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var usepara;
      var fname;
      
      
      $LASTPOS=2001868;//jslker.Parent:1868
      if (typeof  func=='function') {
        $LASTPOS=2001908;//jslker.Parent:1908
        if (func.methodInfo) {
          $LASTPOS=2001944;//jslker.Parent:1944
          fname=func.methodInfo.name;
          
        }
        
      } else {
        $LASTPOS=2002018;//jslker.Parent:2018
        fname=func+"";
        
      }
      $LASTPOS=2002045;//jslker.Parent:2045
      if (typeof  fname=="string") {
        $LASTPOS=2002084;//jslker.Parent:2084
        if (! _this[fname]) {
          throw new Error("メソッド"+func+"が存在しません");
          
        }
        $LASTPOS=2002151;//jslker.Parent:2151
        if (_this["fiber$"+fname]) {
          $LASTPOS=2002192;//jslker.Parent:2192
          usepara=true;
          
        }
        
      }
      
      _thread.enter(function _trc_Parent_ent_onClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2002229;//jslker.Parent:2229
            if (!(usepara)) { __pc=1     ; break; }
            $LASTPOS=2002253;//jslker.Parent:2253
            _this.findElement(elem).click(_this.catchException((function anonymous_2292() {
              
              $LASTPOS=2002309;//jslker.Parent:2309
              _this.parallel(fname);
            })));
            __pc=2     ;break;
          case 1     :
            {
              $LASTPOS=2002423;//jslker.Parent:2423
              _this.findElement(elem).click(_this.catchException(func));
            }
          case 2     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onTouch :function _trc_Parent_onTouch(func) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2002502;//jslker.Parent:2502
      if (typeof  func=="function") {
        $LASTPOS=2002540;//jslker.Parent:2540
        $("body").on("touchstart",(function anonymous_2566(e) {
          
          $LASTPOS=2002592;//jslker.Parent:2592
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=2002723;//jslker.Parent:2723
        $("body").on("touchmove",(function anonymous_2748(e) {
          
          $LASTPOS=2002774;//jslker.Parent:2774
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=2002904;//jslker.Parent:2904
        $("body").on("touchend",(function anonymous_2928(e) {
          
          $LASTPOS=2002954;//jslker.Parent:2954
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=2003083;//jslker.Parent:3083
        $("body").on("mousedown",(function anonymous_3108(e) {
          
          $LASTPOS=2003134;//jslker.Parent:3134
          _this.down=true;
          $LASTPOS=2003158;//jslker.Parent:3158
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=2003211;//jslker.Parent:3211
        $("body").on("mousemove",(function anonymous_3236(e) {
          
          $LASTPOS=2003262;//jslker.Parent:3262
          if (_this.down) {
            $LASTPOS=2003271;//jslker.Parent:3271
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=2003323;//jslker.Parent:3323
        $("body").on("mouseup",(function anonymous_3346(e) {
          
          $LASTPOS=2003372;//jslker.Parent:3372
          _this.down=false;
          $LASTPOS=2003397;//jslker.Parent:3397
          func(e.pageX,e.pageY,"end");
        }));
        
      }
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2002502;//jslker.Parent:2502
      if (typeof  func=="function") {
        $LASTPOS=2002540;//jslker.Parent:2540
        $("body").on("touchstart",(function anonymous_2566(e) {
          
          $LASTPOS=2002592;//jslker.Parent:2592
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
        }));
        $LASTPOS=2002723;//jslker.Parent:2723
        $("body").on("touchmove",(function anonymous_2748(e) {
          
          $LASTPOS=2002774;//jslker.Parent:2774
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
        }));
        $LASTPOS=2002904;//jslker.Parent:2904
        $("body").on("touchend",(function anonymous_2928(e) {
          
          $LASTPOS=2002954;//jslker.Parent:2954
          func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
        }));
        $LASTPOS=2003083;//jslker.Parent:3083
        $("body").on("mousedown",(function anonymous_3108(e) {
          
          $LASTPOS=2003134;//jslker.Parent:3134
          _this.down=true;
          $LASTPOS=2003158;//jslker.Parent:3158
          func(e.pageX,e.pageY,"start");
        }));
        $LASTPOS=2003211;//jslker.Parent:3211
        $("body").on("mousemove",(function anonymous_3236(e) {
          
          $LASTPOS=2003262;//jslker.Parent:3262
          if (_this.down) {
            $LASTPOS=2003271;//jslker.Parent:3271
            func(e.pageX,e.pageY,"move");
          }
        }));
        $LASTPOS=2003323;//jslker.Parent:3323
        $("body").on("mouseup",(function anonymous_3346(e) {
          
          $LASTPOS=2003372;//jslker.Parent:3372
          _this.down=false;
          $LASTPOS=2003397;//jslker.Parent:3397
          func(e.pageX,e.pageY,"end");
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2003524;//jslker.Parent:3524
      _this._canvas=_this.findElement(canv)[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2003524;//jslker.Parent:3524
      _this._canvas=_this.findElement(canv)[0];
      
      _thread.retVal=_this;return;
    },
    searchCanvas :function _trc_Parent_searchCanvas() {
      "use strict";
      var _this=this;
      
      $LASTPOS=2003580;//jslker.Parent:3580
      if (! _this._canvas) {
        return _this._canvas=$("canvas")[0];
        
      } else {
        return _this._canvas;
        
      }
    },
    fiber$searchCanvas :function _trc_Parent_f_searchCanvas(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2003580;//jslker.Parent:3580
      if (! _this._canvas) {
        _thread.retVal=_this._canvas=$("canvas")[0];return;
        
        
      } else {
        _thread.retVal=_this._canvas;return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    setColor :function _trc_Parent_setColor(r,g,b) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2003705;//jslker.Parent:3705
      if (_this.searchCanvas()) {
        $LASTPOS=2003734;//jslker.Parent:3734
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2003773;//jslker.Parent:3773
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=2003822;//jslker.Parent:3822
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2003705;//jslker.Parent:3705
      if (_this.searchCanvas()) {
        $LASTPOS=2003734;//jslker.Parent:3734
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2003773;//jslker.Parent:3773
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=2003822;//jslker.Parent:3822
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2003900;//jslker.Parent:3900
      if (_this.searchCanvas()) {
        $LASTPOS=2003929;//jslker.Parent:3929
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2003968;//jslker.Parent:3968
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2003900;//jslker.Parent:3900
      if (_this.searchCanvas()) {
        $LASTPOS=2003929;//jslker.Parent:3929
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2003968;//jslker.Parent:3968
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    changeImage :function _trc_Parent_changeImage(elem,newsrc) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2004036;//jslker.Parent:4036
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=2004080;//jslker.Parent:4080
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=2004126;//jslker.Parent:4126
      _this.findElement(elem).attr("src",newsrc);
    },
    fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2004036;//jslker.Parent:4036
      if (! (newsrc+"").match(/^http/)) {
        $LASTPOS=2004080;//jslker.Parent:4080
        newsrc=window.runtimePath+newsrc;
        
      }
      $LASTPOS=2004126;//jslker.Parent:4126
      _this.findElement(elem).attr("src",newsrc);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2004192;//jslker.Parent:4192
      _this.findElement(elem).css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2004192;//jslker.Parent:4192
      _this.findElement(elem).css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2004314;//jslker.Parent:4314
      console.log(scaleX,scaleY);
      $LASTPOS=2004347;//jslker.Parent:4347
      if (! scaleX) {
        $LASTPOS=2004369;//jslker.Parent:4369
        scaleX=1;
        $LASTPOS=2004388;//jslker.Parent:4388
        scaleY=1;
        
      } else {
        $LASTPOS=2004409;//jslker.Parent:4409
        if (! scaleY) {
          $LASTPOS=2004431;//jslker.Parent:4431
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=2004458;//jslker.Parent:4458
      console.log(scaleX,scaleY);
      $LASTPOS=2004491;//jslker.Parent:4491
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2004314;//jslker.Parent:4314
      console.log(scaleX,scaleY);
      $LASTPOS=2004347;//jslker.Parent:4347
      if (! scaleX) {
        $LASTPOS=2004369;//jslker.Parent:4369
        scaleX=1;
        $LASTPOS=2004388;//jslker.Parent:4388
        scaleY=1;
        
      } else {
        $LASTPOS=2004409;//jslker.Parent:4409
        if (! scaleY) {
          $LASTPOS=2004431;//jslker.Parent:4431
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=2004458;//jslker.Parent:4458
      console.log(scaleX,scaleY);
      $LASTPOS=2004491;//jslker.Parent:4491
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2004655;//jslker.Parent:4655
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2004655;//jslker.Parent:4655
      _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2004788;//jslker.Parent:4788
      _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2004788;//jslker.Parent:4788
      _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      "use strict";
      var _this=this;
      var t;
      var runThread;
      
      $LASTPOS=2004916;//jslker.Parent:4916
      time=time||100;
      $LASTPOS=2004937;//jslker.Parent:4937
      t = null;
      
      $LASTPOS=2004957;//jslker.Parent:4957
      runThread = _this.catchException((function anonymous_4986() {
        
        $LASTPOS=2004998;//jslker.Parent:4998
        t.steps();
        $LASTPOS=2005018;//jslker.Parent:5018
        if (t.preempted) {
          $LASTPOS=2005050;//jslker.Parent:5050
          setTimeout(runThread,0);
          
        }
      }));
      
      $LASTPOS=2005099;//jslker.Parent:5099
      t.suspend();
      $LASTPOS=2005117;//jslker.Parent:5117
      setTimeout(runThread,time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var runThread;
      
      $LASTPOS=2004916;//jslker.Parent:4916
      time=time||100;
      $LASTPOS=2004937;//jslker.Parent:4937
      t = _thread;
      
      
      _thread.enter(function _trc_Parent_ent_wait(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2004957;//jslker.Parent:4957
            _this.fiber$catchException(_thread, (function anonymous_4986() {
              
              $LASTPOS=2004998;//jslker.Parent:4998
              t.steps();
              $LASTPOS=2005018;//jslker.Parent:5018
              if (t.preempted) {
                $LASTPOS=2005050;//jslker.Parent:5050
                setTimeout(runThread,0);
                
              }
            }));
            __pc=1;return;
          case 1:
            runThread=_thread.retVal;
            
            $LASTPOS=2005099;//jslker.Parent:5099
            t.suspend();
            $LASTPOS=2005117;//jslker.Parent:5117
            setTimeout(runThread,time);
            _thread.exit(_this);return;
          }
        }
      });
    },
    rnd :function _trc_Parent_rnd(max) {
      "use strict";
      var _this=this;
      
      return _this.Math.floor(_this.Math.random()*max);
    },
    fiber$rnd :function _trc_Parent_f_rnd(_thread,max) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.floor(_this.Math.random()*max);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_Parent_setBGColor(c) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2005230;//jslker.Parent:5230
      $("body").attr("bgcolor",c);
    },
    fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2005230;//jslker.Parent:5230
      $("body").attr("bgcolor",c);
      
      _thread.retVal=_this;return;
    },
    newElement :function _trc_Parent_newElement(elem,n) {
      "use strict";
      var _this=this;
      var e;
      
      $LASTPOS=2005303;//jslker.Parent:5303
      e = _this.document.createElement(elem);
      
      $LASTPOS=2005345;//jslker.Parent:5345
      e.setAttribute("name",n);
      $LASTPOS=2005377;//jslker.Parent:5377
      _this.document.body.appendChild(e);
    },
    fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      $LASTPOS=2005303;//jslker.Parent:5303
      e = _this.document.createElement(elem);
      
      $LASTPOS=2005345;//jslker.Parent:5345
      e.setAttribute("name",n);
      $LASTPOS=2005377;//jslker.Parent:5377
      _this.document.body.appendChild(e);
      
      _thread.retVal=_this;return;
    },
    fillOval :function _trc_Parent_fillOval(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2005436;//jslker.Parent:5436
      if (_this.searchCanvas()) {
        $LASTPOS=2005465;//jslker.Parent:5465
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2005504;//jslker.Parent:5504
        _this.ctx.save();
        $LASTPOS=2005525;//jslker.Parent:5525
        _this.ctx.beginPath();
        $LASTPOS=2005551;//jslker.Parent:5551
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=2005588;//jslker.Parent:5588
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=2005618;//jslker.Parent:5618
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=2005670;//jslker.Parent:5670
        _this.ctx.fill();
        $LASTPOS=2005691;//jslker.Parent:5691
        _this.ctx.restore();
        
      }
    },
    fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2005436;//jslker.Parent:5436
      if (_this.searchCanvas()) {
        $LASTPOS=2005465;//jslker.Parent:5465
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2005504;//jslker.Parent:5504
        _this.ctx.save();
        $LASTPOS=2005525;//jslker.Parent:5525
        _this.ctx.beginPath();
        $LASTPOS=2005551;//jslker.Parent:5551
        _this.ctx.translate(x+w/2,y+h/2);
        $LASTPOS=2005588;//jslker.Parent:5588
        _this.ctx.scale(w/w,h/w);
        $LASTPOS=2005618;//jslker.Parent:5618
        _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
        $LASTPOS=2005670;//jslker.Parent:5670
        _this.ctx.fill();
        $LASTPOS=2005691;//jslker.Parent:5691
        _this.ctx.restore();
        
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2005746;//jslker.Parent:5746
      if (_this.searchCanvas()) {
        $LASTPOS=2005775;//jslker.Parent:5775
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2005814;//jslker.Parent:5814
        _this.ctx.beginPath();
        $LASTPOS=2005840;//jslker.Parent:5840
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=2005868;//jslker.Parent:5868
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=2005896;//jslker.Parent:5896
        _this.ctx.stroke();
        
      }
    },
    fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2005746;//jslker.Parent:5746
      if (_this.searchCanvas()) {
        $LASTPOS=2005775;//jslker.Parent:5775
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2005814;//jslker.Parent:5814
        _this.ctx.beginPath();
        $LASTPOS=2005840;//jslker.Parent:5840
        _this.ctx.moveTo(x1,y1);
        $LASTPOS=2005868;//jslker.Parent:5868
        _this.ctx.lineTo(x2,y2);
        $LASTPOS=2005896;//jslker.Parent:5896
        _this.ctx.stroke();
        
      }
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Parent_clearRect(x,y,w,h) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2005947;//jslker.Parent:5947
      if (_this.searchCanvas()) {
        $LASTPOS=2005976;//jslker.Parent:5976
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2006015;//jslker.Parent:6015
        _this.ctx.clearRect(x,y,w,h);
        
      }
    },
    fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2005947;//jslker.Parent:5947
      if (_this.searchCanvas()) {
        $LASTPOS=2005976;//jslker.Parent:5976
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2006015;//jslker.Parent:6015
        _this.ctx.clearRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Parent_fillText(t,x,y) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2006073;//jslker.Parent:6073
      if (_this.searchCanvas()) {
        $LASTPOS=2006102;//jslker.Parent:6102
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2006141;//jslker.Parent:6141
        _this.ctx.fillText(t,x,y);
        
      }
    },
    fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2006073;//jslker.Parent:6073
      if (_this.searchCanvas()) {
        $LASTPOS=2006102;//jslker.Parent:6102
        _this.ctx=_this._canvas.getContext("2d");
        $LASTPOS=2006141;//jslker.Parent:6141
        _this.ctx.fillText(t,x,y);
        
      }
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Parent_initialize() {
      "use strict";
      var _this=this;
      
      $LASTPOS=2006204;//jslker.Parent:6204
      _this.activityGroup=_this.activityGroup||"default";
      $LASTPOS=2006249;//jslker.Parent:6249
      _this.keyData=[];
      $LASTPOS=2006266;//jslker.Parent:6266
      _this.document.onkeydown=(function anonymous_6287(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=2006310;//jslker.Parent:6310
        if (! e) {
          $LASTPOS=2006317;//jslker.Parent:6317
          e=window.event;
        }
        $LASTPOS=2006344;//jslker.Parent:6344
        key_code = e.keyCode;
        
        $LASTPOS=2006379;//jslker.Parent:6379
        key_char = String.fromCharCode(key_code).toLowerCase();
        
        $LASTPOS=2006448;//jslker.Parent:6448
        if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
          $LASTPOS=2006517;//jslker.Parent:6517
          _this.keyData["shift_key"]=1;
        } else {
          $LASTPOS=2006555;//jslker.Parent:6555
          if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
            $LASTPOS=2006621;//jslker.Parent:6621
            _this.keyData["ctrl_key"]=1;
          } else {
            $LASTPOS=2006658;//jslker.Parent:6658
            if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
              $LASTPOS=2006721;//jslker.Parent:6721
              _this.keyData["alt_key"]=1;
            } else {
              $LASTPOS=2006757;//jslker.Parent:6757
              if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                $LASTPOS=2006819;//jslker.Parent:6819
                _this.keyData["left"]=1;
              } else {
                $LASTPOS=2006852;//jslker.Parent:6852
                if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                  $LASTPOS=2006910;//jslker.Parent:6910
                  _this.keyData["up"]=1;
                } else {
                  $LASTPOS=2006941;//jslker.Parent:6941
                  if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                    $LASTPOS=2007005;//jslker.Parent:7005
                    _this.keyData["right"]=1;
                  } else {
                    $LASTPOS=2007039;//jslker.Parent:7039
                    if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                      $LASTPOS=2007101;//jslker.Parent:7101
                      _this.keyData["down"]=1;
                    } else {
                      $LASTPOS=2007134;//jslker.Parent:7134
                      if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
                        $LASTPOS=2007180;//jslker.Parent:7180
                        _this.keyData[key_char]=1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
      $LASTPOS=2007345;//jslker.Parent:7345
      _this.document.onkeyup=(function anonymous_7364(e) {
        var key_code;
        var key_char;
        
        $LASTPOS=2007387;//jslker.Parent:7387
        if (! e) {
          $LASTPOS=2007394;//jslker.Parent:7394
          e=window.event;
        }
        $LASTPOS=2007421;//jslker.Parent:7421
        key_code = e.keyCode;
        
        $LASTPOS=2007456;//jslker.Parent:7456
        key_char = String.fromCharCode(key_code).toLowerCase();
        
        $LASTPOS=2007525;//jslker.Parent:7525
        if (e.keyCode==16) {
          $LASTPOS=2007543;//jslker.Parent:7543
          _this.keyData["shift_key"]=0;
        } else {
          $LASTPOS=2007581;//jslker.Parent:7581
          if (e.keyCode==17) {
            $LASTPOS=2007599;//jslker.Parent:7599
            _this.keyData["ctrl_key"]=0;
          } else {
            $LASTPOS=2007636;//jslker.Parent:7636
            if (e.keyCode==18) {
              $LASTPOS=2007654;//jslker.Parent:7654
              _this.keyData["alt_key"]=0;
            } else {
              $LASTPOS=2007690;//jslker.Parent:7690
              if (e.keyCode==37) {
                $LASTPOS=2007708;//jslker.Parent:7708
                _this.keyData["left"]=0;
              } else {
                $LASTPOS=2007741;//jslker.Parent:7741
                if (e.keyCode==38) {
                  $LASTPOS=2007759;//jslker.Parent:7759
                  _this.keyData["up"]=0;
                } else {
                  $LASTPOS=2007790;//jslker.Parent:7790
                  if (e.keyCode==39) {
                    $LASTPOS=2007808;//jslker.Parent:7808
                    _this.keyData["right"]=0;
                  } else {
                    $LASTPOS=2007842;//jslker.Parent:7842
                    if (e.keyCode==40) {
                      $LASTPOS=2007860;//jslker.Parent:7860
                      _this.keyData["down"]=0;
                    } else {
                      $LASTPOS=2007893;//jslker.Parent:7893
                      _this.keyData[key_char]=0;
                    }
                  }
                }
              }
            }
          }
        }
      });
    },
    getkey :function _trc_Parent_getkey(k) {
      "use strict";
      var _this=this;
      
      return _this.keyData[k.toLowerCase()]||0;
    },
    fiber$getkey :function _trc_Parent_f_getkey(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyData[k.toLowerCase()]||0;return;
      
      
      _thread.retVal=_this;return;
    },
    dist :function _trc_Parent_dist(x,y) {
      "use strict";
      var _this=this;
      
      return _this.sqrt(x*x+y*y);
    },
    fiber$dist :function _trc_Parent_f_dist(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.sqrt(x*x+y*y);return;
      
      
      _thread.retVal=_this;return;
    },
    angle :function _trc_Parent_angle(x,y) {
      "use strict";
      var _this=this;
      
      return _this.deg(_this.Math.atan2(y,x));
    },
    fiber$angle :function _trc_Parent_f_angle(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.deg(_this.Math.atan2(y,x));return;
      
      
      _thread.retVal=_this;return;
    },
    rad :function _trc_Parent_rad(d) {
      "use strict";
      var _this=this;
      
      return d/180*_this.Math.PI;
    },
    deg :function _trc_Parent_deg(d) {
      "use strict";
      var _this=this;
      
      return d/_this.Math.PI*180;
    },
    sqrt :function _trc_Parent_sqrt(x) {
      "use strict";
      var _this=this;
      
      return _this.Math.sqrt(x);
    },
    fiber$sqrt :function _trc_Parent_f_sqrt(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.sqrt(x);return;
      
      
      _thread.retVal=_this;return;
    },
    sin :function _trc_Parent_sin(x) {
      "use strict";
      var _this=this;
      
      return _this.Math.sin(_this.rad(x));
    },
    fiber$sin :function _trc_Parent_f_sin(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.sin(_this.rad(x));return;
      
      
      _thread.retVal=_this;return;
    },
    cos :function _trc_Parent_cos(x) {
      "use strict";
      var _this=this;
      
      return _this.Math.cos(_this.rad(x));
    },
    fiber$cos :function _trc_Parent_f_cos(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.cos(_this.rad(x));return;
      
      
      _thread.retVal=_this;return;
    },
    tan :function _trc_Parent_tan(x) {
      "use strict";
      var _this=this;
      
      return _this.Math.tan(_this.rad(x));
    },
    fiber$tan :function _trc_Parent_f_tan(_thread,x) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.Math.tan(_this.rad(x));return;
      
      
      _thread.retVal=_this;return;
    },
    parallel :function _trc_Parent_parallel() {
      "use strict";
      var _this=this;
      var a;
      var methodName;
      var t;
      
      $LASTPOS=2008417;//jslker.Parent:8417
      a = Array.prototype.slice.call(arguments);
      
      $LASTPOS=2008467;//jslker.Parent:8467
      methodName = a.shift();
      
      $LASTPOS=2008498;//jslker.Parent:8498
      t = Tonyu.thread();
      
      $LASTPOS=2008525;//jslker.Parent:8525
      t.apply(_this,methodName,a);
      $LASTPOS=2008558;//jslker.Parent:8558
      t.steps();
    },
    fiber$parallel :function _trc_Parent_f_parallel(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var methodName;
      var t;
      
      $LASTPOS=2008417;//jslker.Parent:8417
      a = Array.prototype.slice.call(_arguments);
      
      $LASTPOS=2008467;//jslker.Parent:8467
      methodName = a.shift();
      
      $LASTPOS=2008498;//jslker.Parent:8498
      t = Tonyu.thread();
      
      $LASTPOS=2008525;//jslker.Parent:8525
      t.apply(_this,methodName,a);
      $LASTPOS=2008558;//jslker.Parent:8558
      t.steps();
      
      _thread.retVal=_this;return;
    },
    waitClick :function _trc_Parent_waitClick(elem) {
      "use strict";
      var _this=this;
      var clicked;
      var _func;
      
      $LASTPOS=2008596;//jslker.Parent:8596
      clicked = 0;
      
      $LASTPOS=2008616;//jslker.Parent:8616
      _func = (function anonymous_8626() {
        
        $LASTPOS=2008647;//jslker.Parent:8647
        clicked=1;
      });
      
      $LASTPOS=2008671;//jslker.Parent:8671
      _this.onClick(elem,_func);
      $LASTPOS=2008697;//jslker.Parent:8697
      while (clicked==0) {
        Tonyu.checkLoop();
        $LASTPOS=2008725;//jslker.Parent:8725
        _this.wait(10);
        
      }
      $LASTPOS=2008747;//jslker.Parent:8747
      _this.findElement(elem).off("click","",_func);
    },
    fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var clicked;
      var _func;
      
      $LASTPOS=2008596;//jslker.Parent:8596
      clicked = 0;
      
      $LASTPOS=2008616;//jslker.Parent:8616
      _func = (function anonymous_8626() {
        
        $LASTPOS=2008647;//jslker.Parent:8647
        clicked=1;
      });
      
      
      _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2008671;//jslker.Parent:8671
            _this.fiber$onClick(_thread, elem, _func);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2008697;//jslker.Parent:8697
          case 2:
            if (!(clicked==0)) { __pc=4     ; break; }
            $LASTPOS=2008725;//jslker.Parent:8725
            _this.fiber$wait(_thread, 10);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4     :
            
            $LASTPOS=2008747;//jslker.Parent:8747
            _this.findElement(elem).off("click","",_func);
            _thread.exit(_this);return;
          }
        }
      });
    },
    _waitFor :function _trc_Parent__waitFor(promise) {
      "use strict";
      var _this=this;
      var t;
      
      $LASTPOS=2008818;//jslker.Parent:8818
      t = null;
      
      $LASTPOS=2008838;//jslker.Parent:8838
      t.suspend();
      $LASTPOS=2008856;//jslker.Parent:8856
      _this._err=null;
      $LASTPOS=2008872;//jslker.Parent:8872
      promise.then((function anonymous_8885(r) {
        
        $LASTPOS=2008901;//jslker.Parent:8901
        _this._res=r;
        $LASTPOS=2008918;//jslker.Parent:8918
        t.steps();
      }),(function anonymous_8936(e) {
        
        $LASTPOS=2008952;//jslker.Parent:8952
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=2009035;//jslker.Parent:9035
        t.steps();
      }));
    },
    fiber$_waitFor :function _trc_Parent_f__waitFor(_thread,promise) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=2008818;//jslker.Parent:8818
      t = _thread;
      
      $LASTPOS=2008838;//jslker.Parent:8838
      t.suspend();
      $LASTPOS=2008856;//jslker.Parent:8856
      _this._err=null;
      $LASTPOS=2008872;//jslker.Parent:8872
      promise.then((function anonymous_8885(r) {
        
        $LASTPOS=2008901;//jslker.Parent:8901
        _this._res=r;
        $LASTPOS=2008918;//jslker.Parent:8918
        t.steps();
      }),(function anonymous_8936(e) {
        
        $LASTPOS=2008952;//jslker.Parent:8952
        _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        $LASTPOS=2009035;//jslker.Parent:9035
        t.steps();
      }));
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_Parent_waitFor(promise) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2009084;//jslker.Parent:9084
      _this._waitFor(promise);
      $LASTPOS=2009108;//jslker.Parent:9108
      if (_this._err) {
        throw _this._err;
        
      }
      return _this._res;
    },
    fiber$waitFor :function _trc_Parent_f_waitFor(_thread,promise) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Parent_ent_waitFor(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2009084;//jslker.Parent:9084
            _this.fiber$_waitFor(_thread, promise);
            __pc=1;return;
          case 1:
            
            $LASTPOS=2009108;//jslker.Parent:9108
            if (_this._err) {
              throw _this._err;
              
            }
            _thread.exit(_this._res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    putToServer :function _trc_Parent_putToServer(key,value) {
      "use strict";
      var _this=this;
      var url;
      var p;
      var r;
      
      $LASTPOS=2009459;//jslker.Parent:9459
      url = window.location.href;
      
      $LASTPOS=2009494;//jslker.Parent:9494
      p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
      
      
      $LASTPOS=2009696;//jslker.Parent:9696
      r=_this.waitFor(p);
      return r;
    },
    fiber$putToServer :function _trc_Parent_f_putToServer(_thread,key,value) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var p;
      var r;
      
      $LASTPOS=2009459;//jslker.Parent:9459
      url = window.location.href;
      
      $LASTPOS=2009494;//jslker.Parent:9494
      p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
      
      
      
      _thread.enter(function _trc_Parent_ent_putToServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2009696;//jslker.Parent:9696
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
    setGroup :function _trc_Parent_setGroup(g) {
      "use strict";
      var _this=this;
      
      $LASTPOS=2009749;//jslker.Parent:9749
      _this.activityGroup=g||"default";
    },
    fiber$setGroup :function _trc_Parent_f_setGroup(_thread,g) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=2009749;//jslker.Parent:9749
      _this.activityGroup=g||"default";
      
      _thread.retVal=_this;return;
    },
    getFromServer :function _trc_Parent_getFromServer(key) {
      "use strict";
      var _this=this;
      var url;
      var p;
      var r;
      
      $LASTPOS=2009808;//jslker.Parent:9808
      url = window.location.href;
      
      $LASTPOS=2009843;//jslker.Parent:9843
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      $LASTPOS=2009994;//jslker.Parent:9994
      r=_this.waitFor(p);
      return r;
    },
    fiber$getFromServer :function _trc_Parent_f_getFromServer(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var p;
      var r;
      
      $LASTPOS=2009808;//jslker.Parent:9808
      url = window.location.href;
      
      $LASTPOS=2009843;//jslker.Parent:9843
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
      
      
      
      _thread.enter(function _trc_Parent_ent_getFromServer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2009994;//jslker.Parent:9994
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
    addLog :function _trc_Parent_addLog(practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this;
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=2010064;//jslker.Parent:10064
      _this.group=_this.activityGroup;
      $LASTPOS=2010090;//jslker.Parent:10090
      url = window.location.href;
      
      $LASTPOS=2010125;//jslker.Parent:10125
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=2010192;//jslker.Parent:10192
      if (d1!=null) {
        $LASTPOS=2010206;//jslker.Parent:10206
        params+="&data1="+d1;
      }
      $LASTPOS=2010233;//jslker.Parent:10233
      if (d2!=null) {
        $LASTPOS=2010247;//jslker.Parent:10247
        params+="&data2="+d2;
      }
      $LASTPOS=2010274;//jslker.Parent:10274
      if (d3!=null) {
        $LASTPOS=2010288;//jslker.Parent:10288
        params+="&data3="+d3;
      }
      $LASTPOS=2010315;//jslker.Parent:10315
      if (d4!=null) {
        $LASTPOS=2010329;//jslker.Parent:10329
        params+="&data4="+d4;
      }
      $LASTPOS=2010356;//jslker.Parent:10356
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      $LASTPOS=2010441;//jslker.Parent:10441
      r=_this.waitFor(p);
      return r;
    },
    fiber$addLog :function _trc_Parent_f_addLog(_thread,practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=2010064;//jslker.Parent:10064
      _this.group=_this.activityGroup;
      $LASTPOS=2010090;//jslker.Parent:10090
      url = window.location.href;
      
      $LASTPOS=2010125;//jslker.Parent:10125
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=2010192;//jslker.Parent:10192
      if (d1!=null) {
        $LASTPOS=2010206;//jslker.Parent:10206
        params+="&data1="+d1;
      }
      $LASTPOS=2010233;//jslker.Parent:10233
      if (d2!=null) {
        $LASTPOS=2010247;//jslker.Parent:10247
        params+="&data2="+d2;
      }
      $LASTPOS=2010274;//jslker.Parent:10274
      if (d3!=null) {
        $LASTPOS=2010288;//jslker.Parent:10288
        params+="&data3="+d3;
      }
      $LASTPOS=2010315;//jslker.Parent:10315
      if (d4!=null) {
        $LASTPOS=2010329;//jslker.Parent:10329
        params+="&data4="+d4;
      }
      $LASTPOS=2010356;//jslker.Parent:10356
      p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_addLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2010441;//jslker.Parent:10441
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
    findLog :function _trc_Parent_findLog(practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this;
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=2010512;//jslker.Parent:10512
      _this.group=_this.activityGroup;
      $LASTPOS=2010538;//jslker.Parent:10538
      url = window.location.href;
      
      $LASTPOS=2010573;//jslker.Parent:10573
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=2010640;//jslker.Parent:10640
      if (d1!=null) {
        $LASTPOS=2010654;//jslker.Parent:10654
        params+="&data1="+d1;
      }
      $LASTPOS=2010681;//jslker.Parent:10681
      if (d2!=null) {
        $LASTPOS=2010695;//jslker.Parent:10695
        params+="&data2="+d2;
      }
      $LASTPOS=2010722;//jslker.Parent:10722
      if (d3!=null) {
        $LASTPOS=2010736;//jslker.Parent:10736
        params+="&data3="+d3;
      }
      $LASTPOS=2010763;//jslker.Parent:10763
      if (d4!=null) {
        $LASTPOS=2010777;//jslker.Parent:10777
        params+="&data4="+d4;
      }
      $LASTPOS=2010804;//jslker.Parent:10804
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      $LASTPOS=2010890;//jslker.Parent:10890
      r=_this.waitFor(p);
      return r;
    },
    fiber$findLog :function _trc_Parent_f_findLog(_thread,practice,d1,d2,d3,d4) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var params;
      var p;
      var r;
      
      $LASTPOS=2010512;//jslker.Parent:10512
      _this.group=_this.activityGroup;
      $LASTPOS=2010538;//jslker.Parent:10538
      url = window.location.href;
      
      $LASTPOS=2010573;//jslker.Parent:10573
      params = "&group="+_this.group+"&practice="+practice+"&url="+url;
      
      $LASTPOS=2010640;//jslker.Parent:10640
      if (d1!=null) {
        $LASTPOS=2010654;//jslker.Parent:10654
        params+="&data1="+d1;
      }
      $LASTPOS=2010681;//jslker.Parent:10681
      if (d2!=null) {
        $LASTPOS=2010695;//jslker.Parent:10695
        params+="&data2="+d2;
      }
      $LASTPOS=2010722;//jslker.Parent:10722
      if (d3!=null) {
        $LASTPOS=2010736;//jslker.Parent:10736
        params+="&data3="+d3;
      }
      $LASTPOS=2010763;//jslker.Parent:10763
      if (d4!=null) {
        $LASTPOS=2010777;//jslker.Parent:10777
        params+="&data4="+d4;
      }
      $LASTPOS=2010804;//jslker.Parent:10804
      p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_findLog(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2010890;//jslker.Parent:10890
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
    curProject :function _trc_Parent_curProject() {
      "use strict";
      var _this=this;
      var url;
      var params;
      var p;
      var r;
      
      
      $LASTPOS=2010958;//jslker.Parent:10958
      if (typeof  BitArrow==="object"&&BitArrow.publishedURL) {
        $LASTPOS=2011026;//jslker.Parent:11026
        url=BitArrow.publishedURL;
        
      } else {
        $LASTPOS=2011076;//jslker.Parent:11076
        url=window.location.href;
        
      }
      $LASTPOS=2011114;//jslker.Parent:11114
      params = "&url="+url;
      
      $LASTPOS=2011143;//jslker.Parent:11143
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/info"+params);
      
      
      $LASTPOS=2011230;//jslker.Parent:11230
      r=_this.waitFor(p);
      return r;
    },
    fiber$curProject :function _trc_Parent_f_curProject(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      var params;
      var p;
      var r;
      
      
      $LASTPOS=2010958;//jslker.Parent:10958
      if (typeof  BitArrow==="object"&&BitArrow.publishedURL) {
        $LASTPOS=2011026;//jslker.Parent:11026
        url=BitArrow.publishedURL;
        
      } else {
        $LASTPOS=2011076;//jslker.Parent:11076
        url=window.location.href;
        
      }
      $LASTPOS=2011114;//jslker.Parent:11114
      params = "&url="+url;
      
      $LASTPOS=2011143;//jslker.Parent:11143
      p = window.$.ajax(window.runtimePath+"a.php?KeyValue/info"+params);
      
      
      
      _thread.enter(function _trc_Parent_ent_curProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2011230;//jslker.Parent:11230
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
    createGraph :function _trc_Parent_createGraph(target,src) {
      "use strict";
      var _this=this;
      var e;
      var g;
      
      $LASTPOS=2011301;//jslker.Parent:11301
      e = _this.findElement(target);
      
      $LASTPOS=2011333;//jslker.Parent:11333
      if (! e[0]) {
        $LASTPOS=2011355;//jslker.Parent:11355
        e=$("<div>").appendTo("body");
        
      }
      $LASTPOS=2011398;//jslker.Parent:11398
      g = new Tonyu.classes.jslker.Graph(e[0]);
      
      $LASTPOS=2011426;//jslker.Parent:11426
      g.src=src||[];
      return g;
    },
    fiber$createGraph :function _trc_Parent_f_createGraph(_thread,target,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      var g;
      
      
      _thread.enter(function _trc_Parent_ent_createGraph(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            $LASTPOS=2011301;//jslker.Parent:11301
            _this.fiber$findElement(_thread, target);
            __pc=1;return;
          case 1:
            e=_thread.retVal;
            
            $LASTPOS=2011333;//jslker.Parent:11333
            if (! e[0]) {
              $LASTPOS=2011355;//jslker.Parent:11355
              e=$("<div>").appendTo("body");
              
            }
            $LASTPOS=2011398;//jslker.Parent:11398
            g = new Tonyu.classes.jslker.Graph(e[0]);
            
            $LASTPOS=2011426;//jslker.Parent:11426
            g.src=src||[];
            _thread.exit(g);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"setInterval":{"nowait":false},"setTimeout":{"nowait":false},"catchException":{"nowait":false},"findElement":{"nowait":false},"isFormElement":{"nowait":false},"clearContent":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"searchCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"new":{"nowait":false},"getkey":{"nowait":false},"dist":{"nowait":false},"angle":{"nowait":false},"rad":{"nowait":true},"deg":{"nowait":true},"sqrt":{"nowait":false},"sin":{"nowait":false},"cos":{"nowait":false},"tan":{"nowait":false},"parallel":{"nowait":false},"waitClick":{"nowait":false},"_waitFor":{"nowait":false},"waitFor":{"nowait":false},"putToServer":{"nowait":false},"setGroup":{"nowait":false},"getFromServer":{"nowait":false},"addLog":{"nowait":false},"findLog":{"nowait":false},"curProject":{"nowait":false},"createGraph":{"nowait":false}},"fields":{"document":{},"down":{},"_canvas":{},"ctx":{},"Math":{},"activityGroup":{},"keyData":{},"_err":{},"_res":{},"group":{}}}
});

//# sourceMappingURL=concat.js.map