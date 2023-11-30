Tonyu.klass.define({
  fullName: 'jslker.Graph',
  shortName: 'Graph',
  namespace: 'jslker',
  includes: [],
  methods: function (__superClass) {
    return {
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
        
        _this._place=div;
        _this._xaxname="";
        _this._yaxname="";
        _this._xrange;
        _this._yrange;
        _this._isDrawCor=false;
        _this.plotlyURL=window.runtimePath+"lib/plotly-latest.min.js";
        window.$.getScript(_this.plotlyURL);
        window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
        _this.loadLibHandlers=[];
        _this._corObj={};
        _this.src=_this.src||[];
        _this._typemap={};
      },
      setData :function _trc_Graph_setData(data) {
        "use strict";
        var _this=this;
        
        _this.src=data;
      },
      fiber$setData :function _trc_Graph_f_setData(_thread,data) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.src=data;
        
        _thread.retVal=_this;return;
      },
      addData :function _trc_Graph_addData(d) {
        "use strict";
        var _this=this;
        
        if (typeof  d==="object") {
          _this.src.push(d);
          
        } else {
          _this.src.push({x: arguments[0],y: arguments[1]});
          
        }
      },
      fiber$addData :function _trc_Graph_f_addData(_thread,d) {
        "use strict";
        var _this=this;
        var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (typeof  d==="object") {
          _this.src.push(d);
          
        } else {
          _this.src.push({x: _arguments[0],y: _arguments[1]});
          
        }
        
        _thread.retVal=_this;return;
      },
      onLoadLib :function _trc_Graph_onLoadLib(f) {
        "use strict";
        var _this=this;
        
        if (_this.Plotly) {
          f(_this.Plotly);
        } else {
          _this.loadLibHandlers.push(f);
        }
      },
      fiber$onLoadLib :function _trc_Graph_f_onLoadLib(_thread,f) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (_this.Plotly) {
          f(_this.Plotly);
        } else {
          _this.loadLibHandlers.push(f);
        }
        
        _thread.retVal=_this;return;
      },
      waitLoadLib :function _trc_Graph_waitLoadLib() {
        "use strict";
        var _this=this;
        var f;
        var _it_1;
        
        if (! window.Plotly) {
          window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
          
        } else {
          _this.Plotly=window.Plotly;
          _it_1=Tonyu.iterator(_this.loadLibHandlers,1);
          while(_it_1.next()) {
            f=_it_1[0];
            
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
        var _it_1;
        
        if (! window.Plotly) {
          window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
          
        } else {
          _this.Plotly=window.Plotly;
          _it_1=Tonyu.iterator(_this.loadLibHandlers,1);
          while(_it_1.next()) {
            f=_it_1[0];
            
            f(_this.Plotly);
          }
          
        }
        
        _thread.retVal=_this;return;
      },
      _setCorrelation :function _trc_Graph__setCorrelation(x,y,min,max,interval) {
        "use strict";
        var _this=this;
        
        if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
          return _this;
          
        }
        console.log(min,max,interval);
        _this._corObj=_this._correlation(x,y,min,max,interval);
        _this._isDrawCor=true;
      },
      fiber$_setCorrelation :function _trc_Graph_f__setCorrelation(_thread,x,y,min,max,interval) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
          _thread.retVal=_this;return;
          
          
        }
        console.log(min,max,interval);
        
        _thread.enter(function _trc_Graph_ent__setCorrelation(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$_correlation(_thread, x, y, min, max, interval);
              __pc=1;return;
            case 1:
              _this._corObj=_thread.retVal;
              
              _this._isDrawCor=true;
              _thread.exit(_this);return;
            }
          }
        });
      },
      setAxisText :function _trc_Graph_setAxisText(x,y) {
        "use strict";
        var _this=this;
        
        _this.setXAxisText(x);
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
              _this.fiber$setXAxisText(_thread, x);
              __pc=1;return;
            case 1:
              
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
        
        _this._xaxname=x;
      },
      fiber$setXAxisText :function _trc_Graph_f_setXAxisText(_thread,x) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this._xaxname=x;
        
        _thread.retVal=_this;return;
      },
      setYAxisText :function _trc_Graph_setYAxisText(y) {
        "use strict";
        var _this=this;
        
        _this._yaxname=y;
      },
      fiber$setYAxisText :function _trc_Graph_f_setYAxisText(_thread,y) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this._yaxname=y;
        
        _thread.retVal=_this;return;
      },
      setAxisType :function _trc_Graph_setAxisType(xtype,ytype) {
        "use strict";
        var _this=this;
        
        _this.setXAxisType(xtype);
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
              _this.fiber$setXAxisType(_thread, xtype);
              __pc=1;return;
            case 1:
              
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
        
        if (xtype=="time") {
          xtype="date";
        }
        _this._xaxtype=xtype;
      },
      fiber$setXAxisType :function _trc_Graph_f_setXAxisType(_thread,xtype) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (xtype=="time") {
          xtype="date";
        }
        _this._xaxtype=xtype;
        
        _thread.retVal=_this;return;
      },
      setYAxisType :function _trc_Graph_setYAxisType(ytype) {
        "use strict";
        var _this=this;
        
        if (ytype=="time") {
          ytype="date";
        }
        _this._yaxtype=ytype;
      },
      fiber$setYAxisType :function _trc_Graph_f_setYAxisType(_thread,ytype) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (ytype=="time") {
          ytype="date";
        }
        _this._yaxtype=ytype;
        
        _thread.retVal=_this;return;
      },
      bindType :function _trc_Graph_bindType(name,type) {
        "use strict";
        var _this=this;
        
        if (type) {
          _this._typemap[name]=type;
        }
      },
      fiber$bindType :function _trc_Graph_f_bindType(_thread,name,type) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (type) {
          _this._typemap[name]=type;
        }
        
        _thread.retVal=_this;return;
      },
      setXRange :function _trc_Graph_setXRange(min,max,logScale) {
        "use strict";
        var _this=this;
        
        _this._xrange=[min,max];
        _this._xrange.logScale=logScale;
      },
      fiber$setXRange :function _trc_Graph_f_setXRange(_thread,min,max,logScale) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this._xrange=[min,max];
        _this._xrange.logScale=logScale;
        
        _thread.retVal=_this;return;
      },
      setYRange :function _trc_Graph_setYRange(min,max,logScale) {
        "use strict";
        var _this=this;
        
        _this._yrange=[min,max];
        _this._yrange.logScale=logScale;
      },
      fiber$setYRange :function _trc_Graph_f_setYRange(_thread,min,max,logScale) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this._yrange=[min,max];
        _this._yrange.logScale=logScale;
        
        _thread.retVal=_this;return;
      },
      line :function _trc_Graph_line(xaxis,yaxis) {
        "use strict";
        var _this=this;
        
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
        
        return _this.src.map((function anonymous_2298(rec) {
          
          return _this.getValue(rec,k);
        }));
      },
      fiber$vec :function _trc_Graph_f_vec(_thread,k) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _thread.enter(function _trc_Graph_ent_vec(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _thread.exit(_this.src.map((function anonymous_2298(rec) {
                
                return _this.getValue(rec,k);
              })));return;
              _thread.exit(_this);return;
            }
          }
        });
      },
      min :function _trc_Graph_min(k) {
        "use strict";
        var _this=this;
        var ary;
        
        ary = _this.vec(k);
        
        ary.sort((function anonymous_2404(a,b) {
          
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
              _this.fiber$vec(_thread, k);
              __pc=1;return;
            case 1:
              ary=_thread.retVal;
              
              ary.sort((function anonymous_2404(a,b) {
                
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
        
        ary = _this.vec(k);
        
        ary.sort((function anonymous_2509(a,b) {
          
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
              _this.fiber$vec(_thread, k);
              __pc=1;return;
            case 1:
              ary=_thread.retVal;
              
              ary.sort((function anonymous_2509(a,b) {
                
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
        
        half = Math.ceil(_this.src.length/2);
        
        temp = _this.vec(k).sort((function anonymous_2649(a,b) {
          
          if ((a[k]-0)>(b[k]-0)) {
            return - 1;
          }
          if ((a[k]-0)<(b[k]-0)) {
            return 1;
          }
          return 0;
        }));
        
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
        
        half = Math.ceil(_this.src.length/2);
        
        temp = _this.vec(k).sort((function anonymous_2649(a,b) {
          
          if ((a[k]-0)>(b[k]-0)) {
            return - 1;
          }
          if ((a[k]-0)<(b[k]-0)) {
            return 1;
          }
          return 0;
        }));
        
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
        
        counter = {};
        
        nativeValues = {};
        
        maxCounter = 0;
        
        maxValue = null;
        
        i = 0;
        for (; i<_this.src.length ; i++) {
          Tonyu.checkLoop();
          {
            value = _this.getValue(_this.src[i],k);
            
            if (! counter[value]) {
              counter[value]=0;
              
            }
            counter[value]++;
            nativeValues[value]=value;
          }
        }
        j = 0;
        for (; j<Object.keys(counter).length ; j++) {
          Tonyu.checkLoop();
          {
            _this.key=Object.keys(counter)[j];
            if (counter[_this.key]>maxCounter) {
              maxCounter=counter[_this.key];
              maxValue=nativeValues[_this.key];
              
            }
          }
        }
        ret = [];
        
        j = 0;
        for (; j<Object.keys(counter).length ; j++) {
          Tonyu.checkLoop();
          {
            _this.key=Object.keys(counter)[j];
            if (counter[_this.key]==maxCounter) {
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
        
        counter = {};
        
        nativeValues = {};
        
        maxCounter = 0;
        
        maxValue = null;
        
        
        _thread.enter(function _trc_Graph_ent_mode(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              i = 0;
              
            case 1:
              if (!(i<_this.src.length)) { __pc=4     ; break; }
              _this.fiber$getValue(_thread, _this.src[i], k);
              __pc=2;return;
            case 2:
              value=_thread.retVal;
              
              if (! counter[value]) {
                counter[value]=0;
                
              }
              counter[value]++;
              nativeValues[value]=value;
            case 3     :
              i++;
              __pc=1;break;
            case 4     :
              
              j = 0;
              for (; j<Object.keys(counter).length ; j++) {
                Tonyu.checkLoop();
                {
                  _this.key=Object.keys(counter)[j];
                  if (counter[_this.key]>maxCounter) {
                    maxCounter=counter[_this.key];
                    maxValue=nativeValues[_this.key];
                    
                  }
                }
              }
              ret = [];
              
              j = 0;
              for (; j<Object.keys(counter).length ; j++) {
                Tonyu.checkLoop();
                {
                  _this.key=Object.keys(counter)[j];
                  if (counter[_this.key]==maxCounter) {
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
        var _it_23;
        
        ret = [];
        
        _it_23=Tonyu.iterator(_this.vec(k),1);
        while(_it_23.next()) {
          o=_it_23[0];
          
          if (ret[o[k]]) {
            ret[o[k]]++;
            
          } else {
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
        var _it_23;
        
        ret = [];
        
        _it_23=Tonyu.iterator(_this.vec(k),1);
        while(_it_23.next()) {
          o=_it_23[0];
          
          if (ret[o[k]]) {
            ret[o[k]]++;
            
          } else {
            ret[o[k]]=1;
            
          }
          
        }
        _thread.retVal=ret;return;
        
        
        _thread.retVal=_this;return;
      },
      scatter :function _trc_Graph_scatter(xaxis,yaxis,isCor) {
        "use strict";
        var _this=this;
        
        if (typeof  xaxis==="boolean") {
          isCor=xaxis;
          xaxis="x";
          yaxis="y";
          
        }
        xaxis=xaxis||"x";
        yaxis=yaxis||"y";
        _this.bindType(xaxis,_this._xaxtype);
        _this.bindType(yaxis,_this._yaxtype);
        if (isCor==true) {
          _this._setCorrelation(xaxis,yaxis,parseFloat(_this.min(xaxis)),parseFloat(_this.max(xaxis)),parseFloat((_this.max(xaxis)-_this.min(xaxis))/10));
        }
        _this._drawGraph("scatter",xaxis,yaxis);
      },
      fiber$scatter :function _trc_Graph_f_scatter(_thread,xaxis,yaxis,isCor) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (typeof  xaxis==="boolean") {
          isCor=xaxis;
          xaxis="x";
          yaxis="y";
          
        }
        xaxis=xaxis||"x";
        yaxis=yaxis||"y";
        
        _thread.enter(function _trc_Graph_ent_scatter(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$bindType(_thread, xaxis, _this._xaxtype);
              __pc=1;return;
            case 1:
              
              _this.fiber$bindType(_thread, yaxis, _this._yaxtype);
              __pc=2;return;
            case 2:
              
              if (!(isCor==true)) { __pc=4     ; break; }
              _this.fiber$_setCorrelation(_thread, xaxis, yaxis, parseFloat(_this.min(xaxis)), parseFloat(_this.max(xaxis)), parseFloat((_this.max(xaxis)-_this.min(xaxis))/10));
              __pc=3;return;
            case 3:
              
            case 4     :
              
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
        
        xaxis=xaxis||"x";
        yaxis=yaxis||"y";
        _this.bindType(xaxis,_this._xaxtype);
        _this.bindType(yaxis,_this._yaxtype);
        x = [];
        
        y = [];
        
        xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
        
        yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
        
        console.log("range",_this._xrange,_this._yrange);
        xt = _this.detectType(xaxis);
        
        yt = _this.detectType(yaxis);
        
        if (xt=="date"||xt=="time"||xt=="msec") {
          xaxopt["type"]='date';
          
        }
        if (yt=="date"||yt=="time"||yt=="msec") {
          yaxopt["type"]='date';
          
        }
        x=_this.vec(xaxis);
        y=_this.vec(yaxis);
        if (type=="scatter") {
          mode = "markers";
          
          
        } else {
          mode = "lines";
          
          
        }
        data = [{x: x,y: y,type: type,mode: mode}];
        
        if (_this._isDrawCor===true) {
          _this._corObj.mode='lines';
          _this._corObj.line={dash: 'dot',width: 4};
          data.push(_this._corObj);
          
        }
        options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
        
        _this.onLoadLib((function anonymous_6686(Plotly) {
          
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
        
        xaxis=xaxis||"x";
        yaxis=yaxis||"y";
        
        _thread.enter(function _trc_Graph_ent__drawGraph(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$bindType(_thread, xaxis, _this._xaxtype);
              __pc=1;return;
            case 1:
              
              _this.fiber$bindType(_thread, yaxis, _this._yaxtype);
              __pc=2;return;
            case 2:
              
              x = [];
              
              y = [];
              
              xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
              
              yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
              
              console.log("range",_this._xrange,_this._yrange);
              _this.fiber$detectType(_thread, xaxis);
              __pc=3;return;
            case 3:
              xt=_thread.retVal;
              
              _this.fiber$detectType(_thread, yaxis);
              __pc=4;return;
            case 4:
              yt=_thread.retVal;
              
              if (xt=="date"||xt=="time"||xt=="msec") {
                xaxopt["type"]='date';
                
              }
              if (yt=="date"||yt=="time"||yt=="msec") {
                yaxopt["type"]='date';
                
              }
              _this.fiber$vec(_thread, xaxis);
              __pc=5;return;
            case 5:
              x=_thread.retVal;
              
              _this.fiber$vec(_thread, yaxis);
              __pc=6;return;
            case 6:
              y=_thread.retVal;
              
              if (type=="scatter") {
                mode = "markers";
                
                
              } else {
                mode = "lines";
                
                
              }
              data = [{x: x,y: y,type: type,mode: mode}];
              
              if (_this._isDrawCor===true) {
                _this._corObj.mode='lines';
                _this._corObj.line={dash: 'dot',width: 4};
                data.push(_this._corObj);
                
              }
              options = {xaxis: xaxopt,yaxis: yaxopt,annotations: [{xref: 'paper',yref: 'paper',x: 0,xanchor: 'right',y: 1,yanchor: 'bottom',text: _this._yaxname,showarrow: false},{xref: 'paper',yref: 'paper',x: 1,xanchor: 'left',y: 0,yanchor: 'top',text: _this._xaxname,showarrow: false}]};
              
              _this.fiber$onLoadLib(_thread, (function anonymous_6686(Plotly) {
                
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
              _this.fiber$detectType(_thread, name);
              __pc=1;return;
            case 1:
              type=_thread.retVal;
              
              _this.fiber$convertValue(_thread, record[name], type);
              __pc=2;return;
            case 2:
              _thread.exit(_thread.retVal);return;
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      detectType :function _trc_Graph_detectType(name) {
        "use strict";
        var _this=this;
        
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
        
        if (_this._typemap[name]) {
          _thread.retVal=_this._typemap[name];return;
          
        }
        _thread.retVal=(name=="time"||name=="date"?"date":"number");return;
        
        
        _thread.retVal=_this;return;
      },
      convertValue :function _trc_Graph_convertValue(val,type) {
        "use strict";
        var _this=this;
        
        if (type=="msec"||type=="sec"||type=="date"||type=="time") {
          return _this.convertTime(val,type);
          
        }
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
        
        
        _thread.enter(function _trc_Graph_ent_convertValue(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              if (!(type=="msec"||type=="sec"||type=="date"||type=="time")) { __pc=2     ; break; }
              _this.fiber$convertTime(_thread, val, type);
              __pc=1;return;
            case 1:
              _thread.exit(_thread.retVal);return;
              
            case 2     :
              
              if (!(type=="number")) { __pc=3     ; break; }
              _thread.exit(val-0);return;
            case 3     :
              
              _thread.exit(val);return;
              _thread.exit(_this);return;
            }
          }
        });
      },
      convertTime :function _trc_Graph_convertTime(t,to) {
        "use strict";
        var _this=this;
        var n;
        
        to=to||"msec";
        n = _this.looksLikeNumber(t);
        
        if (n) {
          if (n<3000000000) {
            n*=1000;
            
          }
          if (to==="sec") {
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
        
        to=to||"msec";
        
        _thread.enter(function _trc_Graph_ent_convertTime(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$looksLikeNumber(_thread, t);
              __pc=1;return;
            case 1:
              n=_thread.retVal;
              
              if (!(n)) { __pc=2     ; break; }
              if (n<3000000000) {
                n*=1000;
                
              }
              if (to==="sec") {
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
        
        if (typeof  n=="number") {
          return n;
        }
        if (typeof  n=="string") {
          n-=0;
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
        
        if (typeof  n=="number") {
          _thread.retVal=n;return;
          
        }
        if (typeof  n=="string") {
          n-=0;
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
        var _it_39;
        
        s = 0;
        
        if (typeof  (k)==="object") {
          _this.i=0;for (; _this.i<k.length ; _this.i++) {
            Tonyu.checkLoop();
            {
              s+=k[_this.i]-0;
            }
          }
          
        } else {
          _it_39=Tonyu.iterator(_this.vec(k),1);
          while(_it_39.next()) {
            v=_it_39[0];
            
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
        var _it_39;
        
        s = 0;
        
        if (typeof  (k)==="object") {
          _this.i=0;for (; _this.i<k.length ; _this.i++) {
            Tonyu.checkLoop();
            {
              s+=k[_this.i]-0;
            }
          }
          
        } else {
          _it_39=Tonyu.iterator(_this.vec(k),1);
          while(_it_39.next()) {
            v=_it_39[0];
            
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
        
        a = 0;
        
        if (typeof  (k)==="object") {
          a=_this.sum(k)/k.length;
          
        } else {
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
        
        a = 0;
        
        if (typeof  (k)==="object") {
          a=_this.sum(k)/k.length;
          
        } else {
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
        var _it_44;
        
        d = [];
        a = 0;
        
        if (k===undefined) {
          a=_this.mean(_this.src);
          i = 0;
          for (; i<_this.src.length ; i++) {
            Tonyu.checkLoop();
            {
              d.push(_this.src[i]-a);
            }
          }
          
        } else {
          a=_this.mean(k);
          _it_44=Tonyu.iterator(_this.vec(k),1);
          while(_it_44.next()) {
            v=_it_44[0];
            
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
        var _it_44;
        
        d = [];
        a = 0;
        
        
        _thread.enter(function _trc_Graph_ent_dev(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              if (!(k===undefined)) { __pc=2     ; break; }
              _this.fiber$mean(_thread, _this.src);
              __pc=1;return;
            case 1:
              a=_thread.retVal;
              
              i = 0;
              for (; i<_this.src.length ; i++) {
                Tonyu.checkLoop();
                {
                  d.push(_this.src[i]-a);
                }
              }
              __pc=4     ;break;
            case 2     :
              _this.fiber$mean(_thread, k);
              __pc=3;return;
            case 3:
              a=_thread.retVal;
              
              _it_44=Tonyu.iterator(_this.vec(k),1);
              while(_it_44.next()) {
                v=_it_44[0];
                
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
        
        ary = [];
        
        if (k===undefined) {
          deved = _this.dev(_this.src);
          
          i = 0;
          for (; i<deved.length ; i++) {
            Tonyu.checkLoop();
            {
              ary.push(Math.pow(deved[i],2));
            }
          }
          
        } else {
          deved = _this.dev(k);
          
          console.log(deved);
          i = 0;
          for (; i<deved.length ; i++) {
            Tonyu.checkLoop();
            {
              ary.push(Math.pow(deved[i],2));
            }
          }
          
        }
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
        
        ary = [];
        
        
        _thread.enter(function _trc_Graph_ent_vari(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              if (!(k===undefined)) { __pc=2     ; break; }
              _this.fiber$dev(_thread, _this.src);
              __pc=1;return;
            case 1:
              deved=_thread.retVal;
              
              i = 0;
              for (; i<deved.length ; i++) {
                Tonyu.checkLoop();
                {
                  ary.push(Math.pow(deved[i],2));
                }
              }
              __pc=4     ;break;
            case 2     :
              _this.fiber$dev(_thread, k);
              __pc=3;return;
            case 3:
              deved=_thread.retVal;
              
              console.log(deved);
              i = 0;
              for (; i<deved.length ; i++) {
                Tonyu.checkLoop();
                {
                  ary.push(Math.pow(deved[i],2));
                }
              }
            case 4     :
              
              console.log("arrry",ary);
              _this.fiber$mean(_thread, ary);
              __pc=5;return;
            case 5:
              _thread.exit(_thread.retVal);return;
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      std :function _trc_Graph_std(k) {
        "use strict";
        var _this=this;
        var disp;
        
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
        var _it_54;
        
        dev1 = _this.dev(k1);
        
        dev2 = _this.dev(k2);
        
        dataCov = 0;
        
        _it_54=Tonyu.iterator(dev1,2);
        while(_it_54.next()) {
          k=_it_54[0];
          v=_it_54[1];
          
          dataCov+=dev1[k]*dev2[k];
          
        }
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
        var _it_54;
        
        
        _thread.enter(function _trc_Graph_ent_cov(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$dev(_thread, k1);
              __pc=1;return;
            case 1:
              dev1=_thread.retVal;
              
              _this.fiber$dev(_thread, k2);
              __pc=2;return;
            case 2:
              dev2=_thread.retVal;
              
              dataCov = 0;
              
              _it_54=Tonyu.iterator(dev1,2);
              while(_it_54.next()) {
                k=_it_54[0];
                v=_it_54[1];
                
                dataCov+=dev1[k]*dev2[k];
                
              }
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
        
        cov1 = _this.cov(k1,k2);
        
        std1 = _this.std(k1);
        
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
              _this.fiber$cov(_thread, k1, k2);
              __pc=1;return;
            case 1:
              cov1=_thread.retVal;
              
              _this.fiber$std(_thread, k1);
              __pc=2;return;
            case 2:
              std1=_thread.retVal;
              
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
        
        a = _this.corrcoef(d1,d2)*(_this.std(d2)/_this.std(d1));
        
        b = _this.mean(d2)-(a*_this.mean(d1));
        
        x = [];
        
        y = [];
        
        i = min;
        for (; i<=max+1 ; i=i+interval) {
          Tonyu.checkLoop();
          {
            x.push(i);
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
        
        a = _this.corrcoef(d1,d2)*(_this.std(d2)/_this.std(d1));
        
        b = _this.mean(d2)-(a*_this.mean(d1));
        
        x = [];
        
        y = [];
        
        i = min;
        for (; i<=max+1 ; i=i+interval) {
          Tonyu.checkLoop();
          {
            x.push(i);
            y.push(a*i+b);
          }
        }
        _thread.retVal={x: x,y: y};return;
        
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"setData":{"nowait":false},"addData":{"nowait":false},"onLoadLib":{"nowait":false},"waitLoadLib":{"nowait":false},"_setCorrelation":{"nowait":false},"setAxisText":{"nowait":false},"setXAxisText":{"nowait":false},"setYAxisText":{"nowait":false},"setAxisType":{"nowait":false},"setXAxisType":{"nowait":false},"setYAxisType":{"nowait":false},"bindType":{"nowait":false},"setXRange":{"nowait":false},"setYRange":{"nowait":false},"line":{"nowait":false},"bar":{"nowait":false},"vec":{"nowait":false},"min":{"nowait":false},"max":{"nowait":false},"med":{"nowait":false},"mode":{"nowait":false},"freq":{"nowait":false},"scatter":{"nowait":false},"pie":{"nowait":false},"_drawGraph":{"nowait":false},"getValue":{"nowait":false},"detectType":{"nowait":false},"convertValue":{"nowait":false},"convertTime":{"nowait":false},"looksLikeNumber":{"nowait":false},"sum":{"nowait":false},"mean":{"nowait":false},"dev":{"nowait":false},"vari":{"nowait":false},"std":{"nowait":false},"cov":{"nowait":false},"corrcoef":{"nowait":false},"_correlation":{"nowait":false}},"fields":{"plotlyURL":{},"loadLibHandlers":{},"src":{},"_typemap":{},"Plotly":{},"_xaxtype":{},"_yaxtype":{},"_xrange":{},"_yrange":{},"key":{},"_isDrawCor":{},"_corObj":{},"_yaxname":{},"_xaxname":{},"_place":{},"i":{}}}
});
Tonyu.klass.define({
  fullName: 'jslker.Parent',
  shortName: 'Parent',
  namespace: 'jslker',
  includes: [],
  methods: function (__superClass) {
    return {
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
        
        return (function anonymous_538() {
          var e;
          
          try {
            return f.apply(_this,arguments);
            
          } catch (e) {
            window.onerror("","","","",e);
            
          }
        });
      },
      fiber$catchException :function _trc_Parent_f_catchException(_thread,f) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _thread.retVal=(function anonymous_538() {
          var e;
          
          try {
            return f.apply(_this,arguments);
            
          } catch (e) {
            window.onerror("","","","",e);
            
          }
        });return;
        
        
        _thread.retVal=_this;return;
      },
      findElement :function _trc_Parent_findElement(elem) {
        "use strict";
        var _this=this;
        var res;
        
        if (elem instanceof $) {
          return elem;
        }
        res = $("[name="+elem+"]");
        
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
        
        if (elem instanceof $) {
          _thread.retVal=elem;return;
          
        }
        res = $("[name="+elem+"]");
        
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
        
        elem=_this.findElement(elem);
        if (! elem[0]) {
          return false;
        }
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
              _this.fiber$findElement(_thread, elem);
              __pc=1;return;
            case 1:
              elem=_thread.retVal;
              
              if (!(! elem[0])) { __pc=2     ; break; }
              _thread.exit(false);return;
            case 2     :
              
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
        
        elem=_this.findElement(elem);
        if (_this.isFormElement(elem)) {
          elem.val("");
          
        } else {
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
              _this.fiber$findElement(_thread, elem);
              __pc=1;return;
            case 1:
              elem=_thread.retVal;
              
              if (_this.isFormElement(elem)) {
                elem.val("");
                
              } else {
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
        
        elem=_this.findElement(elem);
        if (_this.isFormElement(elem)) {
          elem.val(elem.val()+val);
          
        } else {
          if (_this.document.baWriteTo) {
            dst = elem[0];
            
            if (dst) {
              _this.document.baWriteTo(dst,val);
            }
            
          } else {
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
              _this.fiber$findElement(_thread, elem);
              __pc=1;return;
            case 1:
              elem=_thread.retVal;
              
              if (_this.isFormElement(elem)) {
                elem.val(elem.val()+val);
                
              } else {
                if (_this.document.baWriteTo) {
                  dst = elem[0];
                  
                  if (dst) {
                    _this.document.baWriteTo(dst,val);
                  }
                  
                } else {
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
        
        _this.clearContent(elem);
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
              _this.fiber$clearContent(_thread, elem);
              __pc=1;return;
            case 1:
              
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
        
        elem=_this.findElement(elem);
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
              _this.fiber$findElement(_thread, elem);
              __pc=1;return;
            case 1:
              elem=_thread.retVal;
              
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
        
        
        if (typeof  func=='function') {
          if (func.methodInfo) {
            fname=func.methodInfo.name;
            
          }
          
        } else {
          fname=func+"";
          
        }
        if (typeof  fname=="string") {
          if (! _this[fname]) {
            throw new Error("メソッド"+func+"が存在しません");
            
          }
          if (_this["fiber$"+fname]) {
            usepara=true;
            
          }
          
        }
        if (usepara) {
          _this.findElement(elem).click(_this.catchException((function anonymous_2362() {
            
            _this.parallel(fname);
          })));
          
        } else {
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
        
        
        if (typeof  func=='function') {
          if (func.methodInfo) {
            fname=func.methodInfo.name;
            
          }
          
        } else {
          fname=func+"";
          
        }
        if (typeof  fname=="string") {
          if (! _this[fname]) {
            throw new Error("メソッド"+func+"が存在しません");
            
          }
          if (_this["fiber$"+fname]) {
            usepara=true;
            
          }
          
        }
        
        _thread.enter(function _trc_Parent_ent_onClick(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              if (!(usepara)) { __pc=1     ; break; }
              _this.findElement(elem).click(_this.catchException((function anonymous_2362() {
                
                _this.parallel(fname);
              })));
              __pc=2     ;break;
            case 1     :
              {
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
        
        if (typeof  func=="function") {
          $("body").on("touchstart",(function anonymous_2636(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
          }));
          $("body").on("touchmove",(function anonymous_2818(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
          }));
          $("body").on("touchend",(function anonymous_2998(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
          }));
          $("body").on("mousedown",(function anonymous_3178(e) {
            
            _this.down=true;
            func(e.pageX,e.pageY,"start");
          }));
          $("body").on("mousemove",(function anonymous_3306(e) {
            
            if (_this.down) {
              func(e.pageX,e.pageY,"move");
            }
          }));
          $("body").on("mouseup",(function anonymous_3416(e) {
            
            _this.down=false;
            func(e.pageX,e.pageY,"end");
          }));
          
        }
      },
      fiber$onTouch :function _trc_Parent_f_onTouch(_thread,func) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (typeof  func=="function") {
          $("body").on("touchstart",(function anonymous_2636(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
          }));
          $("body").on("touchmove",(function anonymous_2818(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
          }));
          $("body").on("touchend",(function anonymous_2998(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
          }));
          $("body").on("mousedown",(function anonymous_3178(e) {
            
            _this.down=true;
            func(e.pageX,e.pageY,"start");
          }));
          $("body").on("mousemove",(function anonymous_3306(e) {
            
            if (_this.down) {
              func(e.pageX,e.pageY,"move");
            }
          }));
          $("body").on("mouseup",(function anonymous_3416(e) {
            
            _this.down=false;
            func(e.pageX,e.pageY,"end");
          }));
          
        }
        
        _thread.retVal=_this;return;
      },
      setCanvas :function _trc_Parent_setCanvas(canv) {
        "use strict";
        var _this=this;
        
        _this._canvas=_this.findElement(canv)[0];
      },
      fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this._canvas=_this.findElement(canv)[0];
        
        _thread.retVal=_this;return;
      },
      searchCanvas :function _trc_Parent_searchCanvas() {
        "use strict";
        var _this=this;
        
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
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
          _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
          
        }
      },
      fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
          _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
          
        }
        
        _thread.retVal=_this;return;
      },
      fillRect :function _trc_Parent_fillRect(x,y,w,h) {
        "use strict";
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillRect(x,y,w,h);
          
        }
      },
      fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillRect(x,y,w,h);
          
        }
        
        _thread.retVal=_this;return;
      },
      changeImage :function _trc_Parent_changeImage(elem,newsrc) {
        "use strict";
        var _this=this;
        
        if (! (newsrc+"").match(/^http/)) {
          newsrc=window.runtimePath+newsrc;
          
        }
        _this.findElement(elem).attr("src",newsrc);
      },
      fiber$changeImage :function _trc_Parent_f_changeImage(_thread,elem,newsrc) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (! (newsrc+"").match(/^http/)) {
          newsrc=window.runtimePath+newsrc;
          
        }
        _this.findElement(elem).attr("src",newsrc);
        
        _thread.retVal=_this;return;
      },
      move :function _trc_Parent_move(elem,x,y) {
        "use strict";
        var _this=this;
        
        _this.findElement(elem).css({position: "absolute",left: x,top: y});
      },
      fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.findElement(elem).css({position: "absolute",left: x,top: y});
        
        _thread.retVal=_this;return;
      },
      transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
        "use strict";
        var _this=this;
        
        console.log(scaleX,scaleY);
        if (! scaleX) {
          scaleX=1;
          scaleY=1;
          
        } else {
          if (! scaleY) {
            scaleY=scaleX;
            
          }
        }
        console.log(scaleX,scaleY);
        _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      },
      fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        console.log(scaleX,scaleY);
        if (! scaleX) {
          scaleX=1;
          scaleY=1;
          
        } else {
          if (! scaleY) {
            scaleY=scaleX;
            
          }
        }
        console.log(scaleX,scaleY);
        _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
        
        _thread.retVal=_this;return;
      },
      rotate :function _trc_Parent_rotate(elem,angle) {
        "use strict";
        var _this=this;
        
        _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
      },
      fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
        
        _thread.retVal=_this;return;
      },
      resize :function _trc_Parent_resize(elem,w,h) {
        "use strict";
        var _this=this;
        
        _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
      },
      fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
        
        _thread.retVal=_this;return;
      },
      wait :function _trc_Parent_wait(time) {
        "use strict";
        var _this=this;
        var t;
        var runThread;
        
        time=time||100;
        t = null;
        
        runThread = _this.catchException((function anonymous_5056() {
          
          t.steps();
          if (t.preempted) {
            setTimeout(runThread,0);
            
          }
        }));
        
        t.suspend();
        setTimeout(runThread,time);
      },
      fiber$wait :function _trc_Parent_f_wait(_thread,time) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var t;
        var runThread;
        
        time=time||100;
        t = _thread;
        
        
        _thread.enter(function _trc_Parent_ent_wait(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$catchException(_thread, (function anonymous_5056() {
                
                t.steps();
                if (t.preempted) {
                  setTimeout(runThread,0);
                  
                }
              }));
              __pc=1;return;
            case 1:
              runThread=_thread.retVal;
              
              t.suspend();
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
        
        $("body").attr("bgcolor",c);
      },
      fiber$setBGColor :function _trc_Parent_f_setBGColor(_thread,c) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        $("body").attr("bgcolor",c);
        
        _thread.retVal=_this;return;
      },
      newElement :function _trc_Parent_newElement(elem,n) {
        "use strict";
        var _this=this;
        var e;
        
        e = _this.document.createElement(elem);
        
        e.setAttribute("name",n);
        _this.document.body.appendChild(e);
      },
      fiber$newElement :function _trc_Parent_f_newElement(_thread,elem,n) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var e;
        
        e = _this.document.createElement(elem);
        
        e.setAttribute("name",n);
        _this.document.body.appendChild(e);
        
        _thread.retVal=_this;return;
      },
      fillOval :function _trc_Parent_fillOval(x,y,w,h) {
        "use strict";
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.save();
          _this.ctx.beginPath();
          _this.ctx.translate(x+w/2,y+h/2);
          _this.ctx.scale(w/w,h/w);
          _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
          _this.ctx.fill();
          _this.ctx.restore();
          
        }
      },
      fiber$fillOval :function _trc_Parent_f_fillOval(_thread,x,y,w,h) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.save();
          _this.ctx.beginPath();
          _this.ctx.translate(x+w/2,y+h/2);
          _this.ctx.scale(w/w,h/w);
          _this.ctx.arc(0,0,w/2,0,2*_this.Math.PI,false);
          _this.ctx.fill();
          _this.ctx.restore();
          
        }
        
        _thread.retVal=_this;return;
      },
      drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
        "use strict";
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.beginPath();
          _this.ctx.moveTo(x1,y1);
          _this.ctx.lineTo(x2,y2);
          _this.ctx.stroke();
          
        }
      },
      fiber$drawLine :function _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.beginPath();
          _this.ctx.moveTo(x1,y1);
          _this.ctx.lineTo(x2,y2);
          _this.ctx.stroke();
          
        }
        
        _thread.retVal=_this;return;
      },
      clearRect :function _trc_Parent_clearRect(x,y,w,h) {
        "use strict";
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.clearRect(x,y,w,h);
          
        }
      },
      fiber$clearRect :function _trc_Parent_f_clearRect(_thread,x,y,w,h) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.clearRect(x,y,w,h);
          
        }
        
        _thread.retVal=_this;return;
      },
      fillText :function _trc_Parent_fillText(t,x,y) {
        "use strict";
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillText(t,x,y);
          
        }
      },
      fiber$fillText :function _trc_Parent_f_fillText(_thread,t,x,y) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillText(t,x,y);
          
        }
        
        _thread.retVal=_this;return;
      },
      initialize :function _trc_Parent_initialize() {
        "use strict";
        var _this=this;
        
        _this.activityGroup=_this.activityGroup||"default";
        _this.keyData=[];
        _this.document.onkeydown=(function anonymous_6357(e) {
          var key_code;
          var key_char;
          
          if (! e) {
            e=window.event;
          }
          key_code = e.keyCode;
          
          key_char = String.fromCharCode(key_code).toLowerCase();
          
          if (e.shiftKey&&(! _this.keyData["shift_key"]||_this.keyData["shift_key"]==0)) {
            _this.keyData["shift_key"]=1;
          } else {
            if (e.ctrlKey&&(! _this.keyData["ctrl_key"]||_this.keyData["ctrl_key"]==0)) {
              _this.keyData["ctrl_key"]=1;
            } else {
              if (e.altKey&&(! _this.keyData["alt_key"]||_this.keyData["alt_key"]==0)) {
                _this.keyData["alt_key"]=1;
              } else {
                if (e.keyCode==37&&(! _this.keyData["left"]||_this.keyData["left"]==0)) {
                  _this.keyData["left"]=1;
                } else {
                  if (e.keyCode==38&&(! _this.keyData["up"]||_this.keyData["up"]==0)) {
                    _this.keyData["up"]=1;
                  } else {
                    if (e.keyCode==39&&(! _this.keyData["right"]||_this.keyData["right"]==0)) {
                      _this.keyData["right"]=1;
                    } else {
                      if (e.keyCode==40&&(! _this.keyData["down"]||_this.keyData["down"]==0)) {
                        _this.keyData["down"]=1;
                      } else {
                        if (! _this.keyData[key_char]||_this.keyData[key_char]==0) {
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
        _this.document.onkeyup=(function anonymous_7434(e) {
          var key_code;
          var key_char;
          
          if (! e) {
            e=window.event;
          }
          key_code = e.keyCode;
          
          key_char = String.fromCharCode(key_code).toLowerCase();
          
          if (e.keyCode==16) {
            _this.keyData["shift_key"]=0;
          } else {
            if (e.keyCode==17) {
              _this.keyData["ctrl_key"]=0;
            } else {
              if (e.keyCode==18) {
                _this.keyData["alt_key"]=0;
              } else {
                if (e.keyCode==37) {
                  _this.keyData["left"]=0;
                } else {
                  if (e.keyCode==38) {
                    _this.keyData["up"]=0;
                  } else {
                    if (e.keyCode==39) {
                      _this.keyData["right"]=0;
                    } else {
                      if (e.keyCode==40) {
                        _this.keyData["down"]=0;
                      } else {
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
        
        
        _thread.enter(function _trc_Parent_ent_dist(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$sqrt(_thread, x*x+y*y);
              __pc=1;return;
            case 1:
              _thread.exit(_thread.retVal);return;
              
              _thread.exit(_this);return;
            }
          }
        });
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
        
        a = Array.prototype.slice.call(arguments);
        
        methodName = a.shift();
        
        t = Tonyu.thread();
        
        t.apply(_this,methodName,a);
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
        
        a = Array.prototype.slice.call(_arguments);
        
        methodName = a.shift();
        
        t = Tonyu.thread();
        
        t.apply(_this,methodName,a);
        t.steps();
        
        _thread.retVal=_this;return;
      },
      waitClick :function _trc_Parent_waitClick(elem) {
        "use strict";
        var _this=this;
        var clicked;
        var _func;
        
        clicked = 0;
        
        _func = (function anonymous_8695() {
          
          clicked=1;
        });
        
        _this.onClick(elem,_func);
        while (clicked==0) {
          Tonyu.checkLoop();
          _this.wait(10);
          
        }
        _this.findElement(elem).off("click","",_func);
      },
      fiber$waitClick :function _trc_Parent_f_waitClick(_thread,elem) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var clicked;
        var _func;
        
        clicked = 0;
        
        _func = (function anonymous_8695() {
          
          clicked=1;
        });
        
        
        _thread.enter(function _trc_Parent_ent_waitClick(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$onClick(_thread, elem, _func);
              __pc=1;return;
            case 1:
              
            case 2:
              if (!(clicked==0)) { __pc=4     ; break; }
              _this.fiber$wait(_thread, 10);
              __pc=3;return;
            case 3:
              
              __pc=2;break;
            case 4     :
              
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
        
        t = null;
        
        t.suspend();
        _this._err=null;
        promise.then((function anonymous_8954(r) {
          
          _this._res=r;
          t.steps();
        }),(function anonymous_9005(e) {
          
          _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
          t.steps();
        }));
      },
      fiber$_waitFor :function _trc_Parent_f__waitFor(_thread,promise) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var t;
        
        t = _thread;
        
        t.suspend();
        _this._err=null;
        promise.then((function anonymous_8954(r) {
          
          _this._res=r;
          t.steps();
        }),(function anonymous_9005(e) {
          
          _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
          t.steps();
        }));
        
        _thread.retVal=_this;return;
      },
      waitFor :function _trc_Parent_waitFor(promise) {
        "use strict";
        var _this=this;
        
        _this._waitFor(promise);
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
              _this.fiber$_waitFor(_thread, promise);
              __pc=1;return;
            case 1:
              
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
        
        url = window.location.href;
        
        p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
        
        
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
        
        url = window.location.href;
        
        p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
        
        
        
        _thread.enter(function _trc_Parent_ent_putToServer(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
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
        
        _this.activityGroup=g||"default";
      },
      fiber$setGroup :function _trc_Parent_f_setGroup(_thread,g) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.activityGroup=g||"default";
        
        _thread.retVal=_this;return;
      },
      getFromServer :function _trc_Parent_getFromServer(key) {
        "use strict";
        var _this=this;
        var url;
        var p;
        var r;
        
        url = window.location.href;
        
        p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
        
        
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
        
        url = window.location.href;
        
        p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
        
        
        
        _thread.enter(function _trc_Parent_ent_getFromServer(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
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
      getListFromServer :function _trc_Parent_getListFromServer() {
        "use strict";
        var _this=this;
        var url;
        var p;
        var r;
        
        url = window.location.href;
        
        p = window.$.ajax(window.runtimePath+"a.php?KeyValue/ls"+"&url="+url+"&group="+_this.activityGroup);
        
        
        r=_this.waitFor(p);
        return Object.keys(r.data);
      },
      fiber$getListFromServer :function _trc_Parent_f_getListFromServer(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var url;
        var p;
        var r;
        
        url = window.location.href;
        
        p = window.$.ajax(window.runtimePath+"a.php?KeyValue/ls"+"&url="+url+"&group="+_this.activityGroup);
        
        
        
        _thread.enter(function _trc_Parent_ent_getListFromServer(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$waitFor(_thread, p);
              __pc=1;return;
            case 1:
              r=_thread.retVal;
              
              _thread.exit(Object.keys(r.data));return;
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
        
        _this.group=_this.activityGroup;
        url = window.location.href;
        
        params = "&group="+_this.group+"&practice="+practice+"&url="+url;
        
        if (d1!=null) {
          params+="&data1="+d1;
        }
        if (d2!=null) {
          params+="&data2="+d2;
        }
        if (d3!=null) {
          params+="&data3="+d3;
        }
        if (d4!=null) {
          params+="&data4="+d4;
        }
        p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
        
        
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
        
        _this.group=_this.activityGroup;
        url = window.location.href;
        
        params = "&group="+_this.group+"&practice="+practice+"&url="+url;
        
        if (d1!=null) {
          params+="&data1="+d1;
        }
        if (d2!=null) {
          params+="&data2="+d2;
        }
        if (d3!=null) {
          params+="&data3="+d3;
        }
        if (d4!=null) {
          params+="&data4="+d4;
        }
        p = window.$.ajax(window.runtimePath+"a.php?BigData/add"+params);
        
        
        
        _thread.enter(function _trc_Parent_ent_addLog(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
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
        
        _this.group=_this.activityGroup;
        url = window.location.href;
        
        params = "&group="+_this.group+"&practice="+practice+"&url="+url;
        
        if (d1!=null) {
          params+="&data1="+d1;
        }
        if (d2!=null) {
          params+="&data2="+d2;
        }
        if (d3!=null) {
          params+="&data3="+d3;
        }
        if (d4!=null) {
          params+="&data4="+d4;
        }
        p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
        
        
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
        
        _this.group=_this.activityGroup;
        url = window.location.href;
        
        params = "&group="+_this.group+"&practice="+practice+"&url="+url;
        
        if (d1!=null) {
          params+="&data1="+d1;
        }
        if (d2!=null) {
          params+="&data2="+d2;
        }
        if (d3!=null) {
          params+="&data3="+d3;
        }
        if (d4!=null) {
          params+="&data4="+d4;
        }
        p = window.$.ajax(window.runtimePath+"a.php?BigData/find"+params);
        
        
        
        _thread.enter(function _trc_Parent_ent_findLog(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
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
        
        
        if (typeof  BitArrow==="object"&&BitArrow.publishedURL) {
          url=BitArrow.publishedURL;
          
        } else {
          url=window.location.href;
          
        }
        params = "&url="+url;
        
        p = window.$.ajax(window.runtimePath+"a.php?KeyValue/info"+params);
        
        
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
        
        
        if (typeof  BitArrow==="object"&&BitArrow.publishedURL) {
          url=BitArrow.publishedURL;
          
        } else {
          url=window.location.href;
          
        }
        params = "&url="+url;
        
        p = window.$.ajax(window.runtimePath+"a.php?KeyValue/info"+params);
        
        
        
        _thread.enter(function _trc_Parent_ent_curProject(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
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
        
        e = _this.findElement(target);
        
        if (! e[0]) {
          e=$("<div>").appendTo("body");
          
        }
        g = new Tonyu.classes.jslker.Graph(e[0]);
        
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
              _this.fiber$findElement(_thread, target);
              __pc=1;return;
            case 1:
              e=_thread.retVal;
              
              if (! e[0]) {
                e=$("<div>").appendTo("body");
                
              }
              g = new Tonyu.classes.jslker.Graph(e[0]);
              
              g.src=src||[];
              _thread.exit(g);return;
              _thread.exit(_this);return;
            }
          }
        });
      },
      readFile :function _trc_Parent_readFile(path) {
        "use strict";
        var _this=this;
        var a;
        var context;
        var filename;
        var p;
        var r;
        
        a = path.split("/");
        
        context = a[0];
        filename = a[1];
        
        p = window.$.ajax({url: window.runtimePath+"a.php?Asset/download",data: {context: context,filename: filename}});
        
        
        r=_this.waitFor(p);
        return r;
      },
      fiber$readFile :function _trc_Parent_f_readFile(_thread,path) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var a;
        var context;
        var filename;
        var p;
        var r;
        
        a = path.split("/");
        
        context = a[0];
        filename = a[1];
        
        p = window.$.ajax({url: window.runtimePath+"a.php?Asset/download",data: {context: context,filename: filename}});
        
        
        
        _thread.enter(function _trc_Parent_ent_readFile(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
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
      writeFile :function _trc_Parent_writeFile(path,content) {
        "use strict";
        var _this=this;
        var a;
        var context;
        var filename;
        var p;
        var r;
        
        a = path.split("/");
        
        context = a[0];
        filename = a[1];
        
        p = window.$.ajax({url: window.runtimePath+"a.php?Asset/upload",data: {context: context,filename: filename,content: content}});
        
        
        r=_this.waitFor(p);
        return r;
      },
      fiber$writeFile :function _trc_Parent_f_writeFile(_thread,path,content) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var a;
        var context;
        var filename;
        var p;
        var r;
        
        a = path.split("/");
        
        context = a[0];
        filename = a[1];
        
        p = window.$.ajax({url: window.runtimePath+"a.php?Asset/upload",data: {context: context,filename: filename,content: content}});
        
        
        
        _thread.enter(function _trc_Parent_ent_writeFile(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
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
      loadRaspiScript :function _trc_Parent_loadRaspiScript() {
        "use strict";
        var _this=this;
        var ppath;
        
        ppath = BitArrow.runtimePath+"lib/python/";
        
        _this.waitFor($.getScript(ppath+"SerialControl.js"));
        _this.waitFor($.getScript(ppath+"raspi_repl.js"));
      },
      fiber$loadRaspiScript :function _trc_Parent_f_loadRaspiScript(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var ppath;
        
        ppath = BitArrow.runtimePath+"lib/python/";
        
        
        _thread.enter(function _trc_Parent_ent_loadRaspiScript(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$waitFor(_thread, $.getScript(ppath+"SerialControl.js"));
              __pc=1;return;
            case 1:
              
              _this.fiber$waitFor(_thread, $.getScript(ppath+"raspi_repl.js"));
              __pc=2;return;
            case 2:
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      startRaspi :function _trc_Parent_startRaspi() {
        "use strict";
        var _this=this;
        
        if (_this.raspiStarted) {
          return _this;
        }
        _this.loadRaspiScript();
        _this.raspiREPL=new RaspiREPL();
        _this.waitFor(_this.raspiREPL.waitReady());
        _this.execRaspi("import machine");
        _this.raspiStarted=true;
      },
      fiber$startRaspi :function _trc_Parent_f_startRaspi(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (_this.raspiStarted) {
          _thread.retVal=_this;return;
          
        }
        
        _thread.enter(function _trc_Parent_ent_startRaspi(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$loadRaspiScript(_thread);
              __pc=1;return;
            case 1:
              
              _this.raspiREPL=new RaspiREPL();
              _this.fiber$waitFor(_thread, _this.raspiREPL.waitReady());
              __pc=2;return;
            case 2:
              
              _this.fiber$execRaspi(_thread, "import machine");
              __pc=3;return;
            case 3:
              
              _this.raspiStarted=true;
              _thread.exit(_this);return;
            }
          }
        });
      },
      execRaspi :function _trc_Parent_execRaspi(script) {
        "use strict";
        var _this=this;
        var r;
        
        
        r=_this.waitFor(_this.raspiREPL.runCmd(script));
        return r;
      },
      fiber$execRaspi :function _trc_Parent_f_execRaspi(_thread,script) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var r;
        
        
        
        _thread.enter(function _trc_Parent_ent_execRaspi(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$waitFor(_thread, _this.raspiREPL.runCmd(script));
              __pc=1;return;
            case 1:
              r=_thread.retVal;
              
              _thread.exit(r);return;
              _thread.exit(_this);return;
            }
          }
        });
      },
      readADC :function _trc_Parent_readADC(port,bytes) {
        "use strict";
        var _this=this;
        var r;
        
        
        _this.startRaspi();
        r=_this.execRaspi("print(machine.ADC("+port+").read_u16())");
        return r;
      },
      fiber$readADC :function _trc_Parent_f_readADC(_thread,port,bytes) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var r;
        
        
        
        _thread.enter(function _trc_Parent_ent_readADC(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$startRaspi(_thread);
              __pc=1;return;
            case 1:
              
              _this.fiber$execRaspi(_thread, "print(machine.ADC("+port+").read_u16())");
              __pc=2;return;
            case 2:
              r=_thread.retVal;
              
              _thread.exit(r);return;
              _thread.exit(_this);return;
            }
          }
        });
      },
      getTemperature :function _trc_Parent_getTemperature() {
        "use strict";
        var _this=this;
        var t;
        var conversion_factor;
        var reading;
        var temperature;
        
        
        t=_this.readADC(4);
        conversion_factor = 3.3/(65535);
        
        reading = t*conversion_factor;
        
        temperature = 27-(reading-0.706)/0.001721;
        
        return temperature;
      },
      fiber$getTemperature :function _trc_Parent_f_getTemperature(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var t;
        var conversion_factor;
        var reading;
        var temperature;
        
        
        
        _thread.enter(function _trc_Parent_ent_getTemperature(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$readADC(_thread, 4);
              __pc=1;return;
            case 1:
              t=_thread.retVal;
              
              conversion_factor = 3.3/(65535);
              
              reading = t*conversion_factor;
              
              temperature = 27-(reading-0.706)/0.001721;
              
              _thread.exit(temperature);return;
              _thread.exit(_this);return;
            }
          }
        });
      },
      addCDB :function _trc_Parent_addCDB(key,data) {
        "use strict";
        var _this=this;
        var p;
        var r;
        
        p = window.$.post(window.runtimePath+"a.php?CDB/post",{key: key,data: window.JSON.stringify(data)});
        
        
        r=_this.waitFor(p);
        return r;
      },
      fiber$addCDB :function _trc_Parent_f_addCDB(_thread,key,data) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var p;
        var r;
        
        p = window.$.post(window.runtimePath+"a.php?CDB/post",{key: key,data: window.JSON.stringify(data)});
        
        
        
        _thread.enter(function _trc_Parent_ent_addCDB(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
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
      findCDB :function _trc_Parent_findCDB(key) {
        "use strict";
        var _this=this;
        var p;
        var r;
        
        p = window.$.get(window.runtimePath+"a.php?CDB/get&key="+key);
        
        
        r=_this.waitFor(p);
        return r;
      },
      fiber$findCDB :function _trc_Parent_f_findCDB(_thread,key) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var p;
        var r;
        
        p = window.$.get(window.runtimePath+"a.php?CDB/get&key="+key);
        
        
        
        _thread.enter(function _trc_Parent_ent_findCDB(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
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
      callServer :function _trc_Parent_callServer(url,stdin) {
        "use strict";
        var _this=this;
        var h;
        var u;
        var ih;
        var p;
        var r;
        
        if (BitArrow&&BitArrow.hosts) {
          h = BitArrow.hosts;
          
          u = new URL(url);
          
          ih = new URL(h.ide.top).host;
          
          BitArrow.inIDE=(! window.location.hostname)||window.location.hostname===ih;
          if (BitArrow.inIDE) {
            u.host=ih;
            url=u+"";
            
          }
          
        }
        p = new window.Promise((function anonymous_13967(s) {
          var ifrm;
          
          window.sendResult=(function anonymous_14001(r) {
            
            ifrm.remove();
            s(r);
          });
          ifrm = window.$("<iframe>").attr({src: url+"?stdin="+stdin,width: 1,height: 1}).appendTo("body");
          
        }));
        
        r = _this.waitFor(p);
        
        return r;
      },
      fiber$callServer :function _trc_Parent_f_callServer(_thread,url,stdin) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var h;
        var u;
        var ih;
        var p;
        var r;
        
        if (BitArrow&&BitArrow.hosts) {
          h = BitArrow.hosts;
          
          u = new URL(url);
          
          ih = new URL(h.ide.top).host;
          
          BitArrow.inIDE=(! window.location.hostname)||window.location.hostname===ih;
          if (BitArrow.inIDE) {
            u.host=ih;
            url=u+"";
            
          }
          
        }
        p = new window.Promise((function anonymous_13967(s) {
          var ifrm;
          
          window.sendResult=(function anonymous_14001(r) {
            
            ifrm.remove();
            s(r);
          });
          ifrm = window.$("<iframe>").attr({src: url+"?stdin="+stdin,width: 1,height: 1}).appendTo("body");
          
        }));
        
        
        _thread.enter(function _trc_Parent_ent_callServer(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
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
    };
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"setInterval":{"nowait":false},"setTimeout":{"nowait":false},"catchException":{"nowait":false},"findElement":{"nowait":false},"isFormElement":{"nowait":false},"clearContent":{"nowait":false},"addText":{"nowait":false},"setText":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"searchCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"changeImage":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false},"rnd":{"nowait":false},"setBGColor":{"nowait":false},"newElement":{"nowait":false},"fillOval":{"nowait":false},"drawLine":{"nowait":false},"clearRect":{"nowait":false},"fillText":{"nowait":false},"new":{"nowait":false},"getkey":{"nowait":false},"dist":{"nowait":false},"angle":{"nowait":false},"rad":{"nowait":true},"deg":{"nowait":true},"sqrt":{"nowait":false},"sin":{"nowait":false},"cos":{"nowait":false},"tan":{"nowait":false},"parallel":{"nowait":false},"waitClick":{"nowait":false},"_waitFor":{"nowait":false},"waitFor":{"nowait":false},"putToServer":{"nowait":false},"setGroup":{"nowait":false},"getFromServer":{"nowait":false},"getListFromServer":{"nowait":false},"addLog":{"nowait":false},"findLog":{"nowait":false},"curProject":{"nowait":false},"createGraph":{"nowait":false},"readFile":{"nowait":false},"writeFile":{"nowait":false},"loadRaspiScript":{"nowait":false},"startRaspi":{"nowait":false},"execRaspi":{"nowait":false},"readADC":{"nowait":false},"getTemperature":{"nowait":false},"addCDB":{"nowait":false},"findCDB":{"nowait":false},"callServer":{"nowait":false}},"fields":{"down":{},"_canvas":{},"ctx":{},"activityGroup":{},"keyData":{},"_err":{},"_res":{},"group":{},"raspiStarted":{},"raspiREPL":{}}}
});

//# sourceMappingURL=concat.js.map