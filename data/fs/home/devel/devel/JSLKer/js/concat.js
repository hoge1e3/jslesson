if(!Tonyu.load)Tonyu.load=(_,f)=>f();
Tonyu.load({"compiler":{"namespace":"jslker","outputFile":"js/concat.js","dependingProjects":[]}}, ()=>{
Tonyu.klass.define({
  fullName: 'jslker.Graph',
  shortName: 'Graph',
  namespace: 'jslker',
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Graph_main() {
        var _this=this;
        
      },
      fiber$main :function* _trc_Graph_f_main(_thread) {
        var _this=this;
        
        
      },
      initialize :function _trc_Graph_initialize(div) {
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
        var _this=this;
        
        _this.src=data;
      },
      fiber$setData :function* _trc_Graph_f_setData(_thread,data) {
        var _this=this;
        
        _this.src=data;
        
      },
      addData :function _trc_Graph_addData(d) {
        var _this=this;
        
        if (typeof  d==="object") {
          _this.src.push(d);
          
        } else {
          _this.src.push({x: arguments[0],y: arguments[1]});
          
        }
      },
      fiber$addData :function* _trc_Graph_f_addData(_thread,d) {
        var _this=this;
        var _arguments=Tonyu.A(arguments);
        
        if (typeof  d==="object") {
          _this.src.push(d);
          
        } else {
          _this.src.push({x: _arguments[0],y: _arguments[1]});
          
        }
        
      },
      onLoadLib :function _trc_Graph_onLoadLib(f) {
        var _this=this;
        
        if (_this.Plotly) {
          f(_this.Plotly);
        } else {
          _this.loadLibHandlers.push(f);
        }
      },
      fiber$onLoadLib :function* _trc_Graph_f_onLoadLib(_thread,f) {
        var _this=this;
        
        if (_this.Plotly) {
          f(_this.Plotly);
        } else {
          _this.loadLibHandlers.push(f);
        }
        
      },
      waitLoadLib :function _trc_Graph_waitLoadLib() {
        var _this=this;
        var f;
        
        if (! window.Plotly) {
          window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
          
        } else {
          _this.Plotly=window.Plotly;
          for ([f] of Tonyu.iterator2(_this.loadLibHandlers,1)) {
            f(_this.Plotly);
          }
          
        }
      },
      fiber$waitLoadLib :function* _trc_Graph_f_waitLoadLib(_thread) {
        var _this=this;
        var f;
        
        if (! window.Plotly) {
          window.setTimeout(Tonyu.bindFunc(_this,_this.waitLoadLib),100);
          
        } else {
          _this.Plotly=window.Plotly;
          for ([f] of Tonyu.iterator2(_this.loadLibHandlers,1)) {
            f(_this.Plotly);
          }
          
        }
        
      },
      _setCorrelation :function _trc_Graph__setCorrelation(x,y,min,max,interval) {
        var _this=this;
        
        if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
          return _this;
          
        }
        console.log(min,max,interval);
        _this._corObj=_this._correlation(x,y,min,max,interval);
        _this._isDrawCor=true;
      },
      fiber$_setCorrelation :function* _trc_Graph_f__setCorrelation(_thread,x,y,min,max,interval) {
        var _this=this;
        
        if ((min>max&&interval>0)||(min<=max&&interval<0)||interval==0) {
          return _this;
          
        }
        console.log(min,max,interval);
        _this._corObj=(yield* _this.fiber$_correlation(_thread, x, y, min, max, interval));
        _this._isDrawCor=true;
        
      },
      setAxisText :function _trc_Graph_setAxisText(x,y) {
        var _this=this;
        
        _this.setXAxisText(x);
        _this.setYAxisText(y);
      },
      fiber$setAxisText :function* _trc_Graph_f_setAxisText(_thread,x,y) {
        var _this=this;
        
        (yield* _this.fiber$setXAxisText(_thread, x));
        (yield* _this.fiber$setYAxisText(_thread, y));
        
      },
      setXAxisText :function _trc_Graph_setXAxisText(x) {
        var _this=this;
        
        _this._xaxname=x;
      },
      fiber$setXAxisText :function* _trc_Graph_f_setXAxisText(_thread,x) {
        var _this=this;
        
        _this._xaxname=x;
        
      },
      setYAxisText :function _trc_Graph_setYAxisText(y) {
        var _this=this;
        
        _this._yaxname=y;
      },
      fiber$setYAxisText :function* _trc_Graph_f_setYAxisText(_thread,y) {
        var _this=this;
        
        _this._yaxname=y;
        
      },
      setAxisType :function _trc_Graph_setAxisType(xtype,ytype) {
        var _this=this;
        
        _this.setXAxisType(xtype);
        _this.setXAxisType(ytype);
      },
      fiber$setAxisType :function* _trc_Graph_f_setAxisType(_thread,xtype,ytype) {
        var _this=this;
        
        (yield* _this.fiber$setXAxisType(_thread, xtype));
        (yield* _this.fiber$setXAxisType(_thread, ytype));
        
      },
      setXAxisType :function _trc_Graph_setXAxisType(xtype) {
        var _this=this;
        
        if (xtype=="time") {
          xtype="date";
        }
        _this._xaxtype=xtype;
      },
      fiber$setXAxisType :function* _trc_Graph_f_setXAxisType(_thread,xtype) {
        var _this=this;
        
        if (xtype=="time") {
          xtype="date";
        }
        _this._xaxtype=xtype;
        
      },
      setYAxisType :function _trc_Graph_setYAxisType(ytype) {
        var _this=this;
        
        if (ytype=="time") {
          ytype="date";
        }
        _this._yaxtype=ytype;
      },
      fiber$setYAxisType :function* _trc_Graph_f_setYAxisType(_thread,ytype) {
        var _this=this;
        
        if (ytype=="time") {
          ytype="date";
        }
        _this._yaxtype=ytype;
        
      },
      bindType :function _trc_Graph_bindType(name,type) {
        var _this=this;
        
        if (type) {
          _this._typemap[name]=type;
        }
      },
      fiber$bindType :function* _trc_Graph_f_bindType(_thread,name,type) {
        var _this=this;
        
        if (type) {
          _this._typemap[name]=type;
        }
        
      },
      setXRange :function _trc_Graph_setXRange(min,max,logScale) {
        var _this=this;
        
        _this._xrange=[min,max];
        _this._xrange.logScale=logScale;
      },
      fiber$setXRange :function* _trc_Graph_f_setXRange(_thread,min,max,logScale) {
        var _this=this;
        
        _this._xrange=[min,max];
        _this._xrange.logScale=logScale;
        
      },
      setYRange :function _trc_Graph_setYRange(min,max,logScale) {
        var _this=this;
        
        _this._yrange=[min,max];
        _this._yrange.logScale=logScale;
      },
      fiber$setYRange :function* _trc_Graph_f_setYRange(_thread,min,max,logScale) {
        var _this=this;
        
        _this._yrange=[min,max];
        _this._yrange.logScale=logScale;
        
      },
      line :function _trc_Graph_line(xaxis,yaxis) {
        var _this=this;
        
        _this._drawGraph("line",xaxis,yaxis);
      },
      fiber$line :function* _trc_Graph_f_line(_thread,xaxis,yaxis) {
        var _this=this;
        
        (yield* _this.fiber$_drawGraph(_thread, "line", xaxis, yaxis));
        
      },
      bar :function _trc_Graph_bar(xaxis,yaxis) {
        var _this=this;
        
        _this._drawGraph("bar",xaxis,yaxis);
      },
      fiber$bar :function* _trc_Graph_f_bar(_thread,xaxis,yaxis) {
        var _this=this;
        
        (yield* _this.fiber$_drawGraph(_thread, "bar", xaxis, yaxis));
        
      },
      vec :function _trc_Graph_vec(k) {
        var _this=this;
        
        return _this.src.map((function anonymous_2298(rec) {
          
          return _this.getValue(rec,k);
        }));
      },
      fiber$vec :function* _trc_Graph_f_vec(_thread,k) {
        var _this=this;
        
        return _this.src.map((function anonymous_2298(rec) {
          
          return _this.getValue(rec,k);
        }));
        
      },
      min :function _trc_Graph_min(k) {
        var _this=this;
        var ary;
        
        ary = _this.vec(k);
        
        ary.sort((function anonymous_2404(a,b) {
          
          return a-b;
        }));
        return ary[0];
      },
      fiber$min :function* _trc_Graph_f_min(_thread,k) {
        var _this=this;
        var ary;
        
        ary=yield* _this.fiber$vec(_thread, k);
        
        ary.sort((function anonymous_2404(a,b) {
          
          return a-b;
        }));
        return ary[0];
        
      },
      max :function _trc_Graph_max(k) {
        var _this=this;
        var ary;
        
        ary = _this.vec(k);
        
        ary.sort((function anonymous_2509(a,b) {
          
          return b-a;
        }));
        return ary[0];
      },
      fiber$max :function* _trc_Graph_f_max(_thread,k) {
        var _this=this;
        var ary;
        
        ary=yield* _this.fiber$vec(_thread, k);
        
        ary.sort((function anonymous_2509(a,b) {
          
          return b-a;
        }));
        return ary[0];
        
      },
      med :function _trc_Graph_med(k) {
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
      fiber$med :function* _trc_Graph_f_med(_thread,k) {
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
      mode :function _trc_Graph_mode(k) {
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
        
        for (i = 0;
         i<_this.src.length ; i++) {
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
        for (j = 0;
         j<Object.keys(counter).length ; j++) {
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
        
        for (j = 0;
         j<Object.keys(counter).length ; j++) {
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
      fiber$mode :function* _trc_Graph_f_mode(_thread,k) {
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
        
        for (i = 0;
         i<_this.src.length ; i++) {
          yield null;
          {
            value=yield* _this.fiber$getValue(_thread, _this.src[i], k);
            
            if (! counter[value]) {
              counter[value]=0;
              
            }
            counter[value]++;
            nativeValues[value]=value;
          }
        }
        for (j = 0;
         j<Object.keys(counter).length ; j++) {
          yield null;
          {
            _this.key=Object.keys(counter)[j];
            if (counter[_this.key]>maxCounter) {
              maxCounter=counter[_this.key];
              maxValue=nativeValues[_this.key];
              
            }
          }
        }
        ret = [];
        
        for (j = 0;
         j<Object.keys(counter).length ; j++) {
          yield null;
          {
            _this.key=Object.keys(counter)[j];
            if (counter[_this.key]==maxCounter) {
              ret.push(nativeValues[_this.key]);
              
            }
          }
        }
        return {"mode": maxCounter,"nums": ret};
        
      },
      freq :function _trc_Graph_freq(k) {
        var _this=this;
        var ret;
        var o;
        
        ret = [];
        
        for ([o] of Tonyu.iterator2(_this.vec(k),1)) {
          if (ret[o[k]]) {
            ret[o[k]]++;
            
          } else {
            ret[o[k]]=1;
            
          }
          
        }
        return ret;
      },
      fiber$freq :function* _trc_Graph_f_freq(_thread,k) {
        var _this=this;
        var ret;
        var o;
        
        ret = [];
        
        for ([o] of Tonyu.iterator2(_this.vec(k),1)) {
          if (ret[o[k]]) {
            ret[o[k]]++;
            
          } else {
            ret[o[k]]=1;
            
          }
          
        }
        return ret;
        
      },
      scatter :function _trc_Graph_scatter(xaxis,yaxis,isCor) {
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
      fiber$scatter :function* _trc_Graph_f_scatter(_thread,xaxis,yaxis,isCor) {
        var _this=this;
        
        if (typeof  xaxis==="boolean") {
          isCor=xaxis;
          xaxis="x";
          yaxis="y";
          
        }
        xaxis=xaxis||"x";
        yaxis=yaxis||"y";
        (yield* _this.fiber$bindType(_thread, xaxis, _this._xaxtype));
        (yield* _this.fiber$bindType(_thread, yaxis, _this._yaxtype));
        if (isCor==true) {
          (yield* _this.fiber$_setCorrelation(_thread, xaxis, yaxis, parseFloat(_this.min(xaxis)), parseFloat(_this.max(xaxis)), parseFloat((_this.max(xaxis)-_this.min(xaxis))/10)));
        }
        (yield* _this.fiber$_drawGraph(_thread, "scatter", xaxis, yaxis));
        
      },
      pie :function _trc_Graph_pie(xaxis,yaxis) {
        var _this=this;
        
        _this._drawGraph("pie",xaxis,yaxis);
      },
      fiber$pie :function* _trc_Graph_f_pie(_thread,xaxis,yaxis) {
        var _this=this;
        
        (yield* _this.fiber$_drawGraph(_thread, "pie", xaxis, yaxis));
        
      },
      _drawGraph :function _trc_Graph__drawGraph(type,xaxis,yaxis) {
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
      fiber$_drawGraph :function* _trc_Graph_f__drawGraph(_thread,type,xaxis,yaxis) {
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
        (yield* _this.fiber$bindType(_thread, xaxis, _this._xaxtype));
        (yield* _this.fiber$bindType(_thread, yaxis, _this._yaxtype));
        x = [];
        
        y = [];
        
        xaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._xrange};
        
        yaxopt = {autotick: true,ticks: 'outside',tick0: 0,dtick: 0.25,ticklen: 8,tickwidth: 4,tickcolor: '#000',range: _this._yrange};
        
        console.log("range",_this._xrange,_this._yrange);
        xt=yield* _this.fiber$detectType(_thread, xaxis);
        
        yt=yield* _this.fiber$detectType(_thread, yaxis);
        
        if (xt=="date"||xt=="time"||xt=="msec") {
          xaxopt["type"]='date';
          
        }
        if (yt=="date"||yt=="time"||yt=="msec") {
          yaxopt["type"]='date';
          
        }
        x=(yield* _this.fiber$vec(_thread, xaxis));
        y=(yield* _this.fiber$vec(_thread, yaxis));
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
        
        (yield* _this.fiber$onLoadLib(_thread, (function anonymous_6686(Plotly) {
          
          Plotly.newPlot(_this._place,data,options);
        })));
        
      },
      getValue :function _trc_Graph_getValue(record,name) {
        var _this=this;
        var type;
        
        type = _this.detectType(name);
        
        return _this.convertValue(record[name],type);
      },
      fiber$getValue :function* _trc_Graph_f_getValue(_thread,record,name) {
        var _this=this;
        var type;
        
        type=yield* _this.fiber$detectType(_thread, name);
        
        return yield* _this.fiber$convertValue(_thread, record[name], type);
        
        
      },
      detectType :function _trc_Graph_detectType(name) {
        var _this=this;
        
        if (_this._typemap[name]) {
          return _this._typemap[name];
        }
        return (name=="time"||name=="date"?"date":"number");
      },
      fiber$detectType :function* _trc_Graph_f_detectType(_thread,name) {
        var _this=this;
        
        if (_this._typemap[name]) {
          return _this._typemap[name];
        }
        return (name=="time"||name=="date"?"date":"number");
        
      },
      convertValue :function _trc_Graph_convertValue(val,type) {
        var _this=this;
        
        if (type=="msec"||type=="sec"||type=="date"||type=="time") {
          return _this.convertTime(val,type);
          
        }
        if (type=="number") {
          return val-0;
        }
        return val;
      },
      fiber$convertValue :function* _trc_Graph_f_convertValue(_thread,val,type) {
        var _this=this;
        
        if (type=="msec"||type=="sec"||type=="date"||type=="time") {
          return yield* _this.fiber$convertTime(_thread, val, type);
          
          
        }
        if (type=="number") {
          return val-0;
        }
        return val;
        
      },
      convertTime :function _trc_Graph_convertTime(t,to) {
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
      fiber$convertTime :function* _trc_Graph_f_convertTime(_thread,t,to) {
        var _this=this;
        var n;
        
        to=to||"msec";
        n=yield* _this.fiber$looksLikeNumber(_thread, t);
        
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
      looksLikeNumber :function _trc_Graph_looksLikeNumber(n) {
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
      fiber$looksLikeNumber :function* _trc_Graph_f_looksLikeNumber(_thread,n) {
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
      sum :function _trc_Graph_sum(k) {
        var _this=this;
        var s;
        var v;
        
        s = 0;
        
        if (typeof  (k)==="object") {
          for (_this.i=0; _this.i<k.length ; _this.i++) {
            Tonyu.checkLoop();
            {
              s+=k[_this.i]-0;
            }
          }
          
        } else {
          for ([v] of Tonyu.iterator2(_this.vec(k),1)) {
            s+=v-0;
            
          }
          
        }
        return s;
      },
      fiber$sum :function* _trc_Graph_f_sum(_thread,k) {
        var _this=this;
        var s;
        var v;
        
        s = 0;
        
        if (typeof  (k)==="object") {
          for (_this.i=0; _this.i<k.length ; _this.i++) {
            yield null;
            {
              s+=k[_this.i]-0;
            }
          }
          
        } else {
          for ([v] of Tonyu.iterator2(_this.vec(k),1)) {
            s+=v-0;
            
          }
          
        }
        return s;
        
      },
      mean :function _trc_Graph_mean(k) {
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
      fiber$mean :function* _trc_Graph_f_mean(_thread,k) {
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
      dev :function _trc_Graph_dev(k) {
        var _this=this;
        var d;
        var a;
        var i;
        var v;
        
        d = [];
        a = 0;
        
        if (k===undefined) {
          a=_this.mean(_this.src);
          for (i = 0;
           i<_this.src.length ; i++) {
            Tonyu.checkLoop();
            {
              d.push(_this.src[i]-a);
            }
          }
          
        } else {
          a=_this.mean(k);
          for ([v] of Tonyu.iterator2(_this.vec(k),1)) {
            d.push(v-a);
            
          }
          
        }
        return d;
      },
      fiber$dev :function* _trc_Graph_f_dev(_thread,k) {
        var _this=this;
        var d;
        var a;
        var i;
        var v;
        
        d = [];
        a = 0;
        
        if (k===undefined) {
          a=(yield* _this.fiber$mean(_thread, _this.src));
          for (i = 0;
           i<_this.src.length ; i++) {
            yield null;
            {
              d.push(_this.src[i]-a);
            }
          }
          
        } else {
          a=(yield* _this.fiber$mean(_thread, k));
          for ([v] of Tonyu.iterator2(_this.vec(k),1)) {
            d.push(v-a);
            
          }
          
        }
        return d;
        
      },
      vari :function _trc_Graph_vari(k) {
        var _this=this;
        var ary;
        var deved;
        var i;
        
        ary = [];
        
        if (k===undefined) {
          deved = _this.dev(_this.src);
          
          for (i = 0;
           i<deved.length ; i++) {
            Tonyu.checkLoop();
            {
              ary.push(Math.pow(deved[i],2));
            }
          }
          
        } else {
          deved = _this.dev(k);
          
          console.log(deved);
          for (i = 0;
           i<deved.length ; i++) {
            Tonyu.checkLoop();
            {
              ary.push(Math.pow(deved[i],2));
            }
          }
          
        }
        console.log("arrry",ary);
        return _this.mean(ary);
      },
      fiber$vari :function* _trc_Graph_f_vari(_thread,k) {
        var _this=this;
        var ary;
        var deved;
        var i;
        
        ary = [];
        
        if (k===undefined) {
          deved=yield* _this.fiber$dev(_thread, _this.src);
          
          for (i = 0;
           i<deved.length ; i++) {
            yield null;
            {
              ary.push(Math.pow(deved[i],2));
            }
          }
          
        } else {
          deved=yield* _this.fiber$dev(_thread, k);
          
          console.log(deved);
          for (i = 0;
           i<deved.length ; i++) {
            yield null;
            {
              ary.push(Math.pow(deved[i],2));
            }
          }
          
        }
        console.log("arrry",ary);
        return yield* _this.fiber$mean(_thread, ary);
        
        
      },
      std :function _trc_Graph_std(k) {
        var _this=this;
        var disp;
        
        disp = _this.vari(k);
        
        return Math.sqrt(disp);
      },
      fiber$std :function* _trc_Graph_f_std(_thread,k) {
        var _this=this;
        var disp;
        
        disp=yield* _this.fiber$vari(_thread, k);
        
        return Math.sqrt(disp);
        
      },
      cov :function _trc_Graph_cov(k1,k2) {
        var _this=this;
        var dev1;
        var dev2;
        var dataCov;
        var k;
        var v;
        
        dev1 = _this.dev(k1);
        
        dev2 = _this.dev(k2);
        
        dataCov = 0;
        
        for ([k, v] of Tonyu.iterator2(dev1,2)) {
          dataCov+=dev1[k]*dev2[k];
          
        }
        dataCov=dataCov/dev1.length;
        return dataCov;
      },
      fiber$cov :function* _trc_Graph_f_cov(_thread,k1,k2) {
        var _this=this;
        var dev1;
        var dev2;
        var dataCov;
        var k;
        var v;
        
        dev1=yield* _this.fiber$dev(_thread, k1);
        
        dev2=yield* _this.fiber$dev(_thread, k2);
        
        dataCov = 0;
        
        for ([k, v] of Tonyu.iterator2(dev1,2)) {
          dataCov+=dev1[k]*dev2[k];
          
        }
        dataCov=dataCov/dev1.length;
        return dataCov;
        
      },
      corrcoef :function _trc_Graph_corrcoef(k1,k2) {
        var _this=this;
        var cov1;
        var std1;
        var std2;
        
        cov1 = _this.cov(k1,k2);
        
        std1 = _this.std(k1);
        
        std2 = _this.std(k2);
        
        return cov1/(std1*std2);
      },
      fiber$corrcoef :function* _trc_Graph_f_corrcoef(_thread,k1,k2) {
        var _this=this;
        var cov1;
        var std1;
        var std2;
        
        cov1=yield* _this.fiber$cov(_thread, k1, k2);
        
        std1=yield* _this.fiber$std(_thread, k1);
        
        std2=yield* _this.fiber$std(_thread, k2);
        
        return cov1/(std1*std2);
        
      },
      _correlation :function _trc_Graph__correlation(d1,d2,min,max,interval) {
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
        
        for (i = min;
         i<=max+1 ; i=i+interval) {
          Tonyu.checkLoop();
          {
            x.push(i);
            y.push(a*i+b);
          }
        }
        return {x: x,y: y};
      },
      fiber$_correlation :function* _trc_Graph_f__correlation(_thread,d1,d2,min,max,interval) {
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
        
        for (i = min;
         i<=max+1 ; i=i+interval) {
          yield null;
          {
            x.push(i);
            y.push(a*i+b);
          }
        }
        return {x: x,y: y};
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}},"new":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"setData":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"addData":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"onLoadLib":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"waitLoadLib":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"_setCorrelation":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null,null,null],"returnValue":null}},"setAxisText":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"setXAxisText":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"setYAxisText":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"setAxisType":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"setXAxisType":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"setYAxisType":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"bindType":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"setXRange":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"setYRange":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"line":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"bar":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"vec":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"min":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"max":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"med":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"mode":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"freq":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"scatter":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"pie":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"_drawGraph":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"getValue":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"detectType":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"convertValue":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"convertTime":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"looksLikeNumber":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"sum":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"mean":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"dev":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"vari":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"std":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"cov":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"corrcoef":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"_correlation":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null,null,null],"returnValue":null}}},"fields":{"plotlyURL":{},"loadLibHandlers":{},"src":{},"_typemap":{},"Plotly":{},"_xaxtype":{},"_yaxtype":{},"_xrange":{},"_yrange":{},"key":{},"_isDrawCor":{},"_corObj":{},"_yaxname":{},"_xaxname":{},"_place":{},"i":{}}}
});
Tonyu.klass.define({
  fullName: 'jslker.Parent',
  shortName: 'Parent',
  namespace: 'jslker',
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Parent_main() {
        var _this=this;
        
      },
      fiber$main :function* _trc_Parent_f_main(_thread) {
        var _this=this;
        
        
      },
      __getter__Math :function _trc_Parent___getter__Math() {
        var _this=this;
        
        return window.Math;
      },
      __getter__document :function _trc_Parent___getter__document() {
        var _this=this;
        
        return window.document;
      },
      setInterval :function _trc_Parent_setInterval(f,t) {
        var _this=this;
        
        return window.setInterval(_this.catchException(f),t);
      },
      fiber$setInterval :function* _trc_Parent_f_setInterval(_thread,f,t) {
        var _this=this;
        
        return window.setInterval(_this.catchException(f),t);
        
      },
      setTimeout :function _trc_Parent_setTimeout(f,t) {
        var _this=this;
        
        return window.setTimeout(_this.catchException(f),t);
      },
      fiber$setTimeout :function* _trc_Parent_f_setTimeout(_thread,f,t) {
        var _this=this;
        
        return window.setTimeout(_this.catchException(f),t);
        
      },
      catchException :function _trc_Parent_catchException(f) {
        var _this=this;
        var e;
        
        return (function anonymous_560() {
          var e;
          
          try {
            return f.apply(_this,arguments);
            
          } catch (e) {
            window.onerror("","","","",e);
            
          }
        });
      },
      fiber$catchException :function* _trc_Parent_f_catchException(_thread,f) {
        var _this=this;
        var e;
        
        return (function anonymous_560() {
          var e;
          
          try {
            return f.apply(_this,arguments);
            
          } catch (e) {
            window.onerror("","","","",e);
            
          }
        });
        
      },
      findElement :function _trc_Parent_findElement(elem) {
        var _this=this;
        var res;
        
        if (elem instanceof $) {
          return elem;
        }
        if (elem instanceof window.Node) {
          return $(elem);
        }
        res = $("[name="+elem+"]");
        
        if (res[0]) {
          return res;
        }
        return $("#"+elem);
      },
      fiber$findElement :function* _trc_Parent_f_findElement(_thread,elem) {
        var _this=this;
        var res;
        
        if (elem instanceof $) {
          return elem;
        }
        if (elem instanceof window.Node) {
          return $(elem);
        }
        res = $("[name="+elem+"]");
        
        if (res[0]) {
          return res;
        }
        return $("#"+elem);
        
      },
      isFormElement :function _trc_Parent_isFormElement(elem) {
        var _this=this;
        var t;
        
        elem=_this.findElement(elem);
        if (! elem[0]) {
          return false;
        }
        t = (""+elem[0].tagName).toLowerCase();
        
        return t==="input"||t==="textarea";
      },
      fiber$isFormElement :function* _trc_Parent_f_isFormElement(_thread,elem) {
        var _this=this;
        var t;
        
        elem=(yield* _this.fiber$findElement(_thread, elem));
        if (! elem[0]) {
          return false;
        }
        t = (""+elem[0].tagName).toLowerCase();
        
        return t==="input"||t==="textarea";
        
      },
      clearContent :function _trc_Parent_clearContent(elem) {
        var _this=this;
        
        elem=_this.findElement(elem);
        if (_this.isFormElement(elem)) {
          elem.val("");
          
        } else {
          elem.empty();
          
        }
      },
      fiber$clearContent :function* _trc_Parent_f_clearContent(_thread,elem) {
        var _this=this;
        
        elem=(yield* _this.fiber$findElement(_thread, elem));
        if (_this.isFormElement(elem)) {
          elem.val("");
          
        } else {
          elem.empty();
          
        }
        
      },
      addText :function _trc_Parent_addText(elem,val) {
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
      fiber$addText :function* _trc_Parent_f_addText(_thread,elem,val) {
        var _this=this;
        var dst;
        
        elem=(yield* _this.fiber$findElement(_thread, elem));
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
      setText :function _trc_Parent_setText(elem,val) {
        var _this=this;
        
        _this.clearContent(elem);
        _this.addText(elem,val);
      },
      fiber$setText :function* _trc_Parent_f_setText(_thread,elem,val) {
        var _this=this;
        
        (yield* _this.fiber$clearContent(_thread, elem));
        (yield* _this.fiber$addText(_thread, elem, val));
        
      },
      getNumber :function _trc_Parent_getNumber(elem) {
        var _this=this;
        
        return _this.getText(elem)-0;
      },
      fiber$getNumber :function* _trc_Parent_f_getNumber(_thread,elem) {
        var _this=this;
        
        return _this.getText(elem)-0;
        
      },
      getText :function _trc_Parent_getText(elem) {
        var _this=this;
        
        elem=_this.findElement(elem);
        if (_this.isFormElement(elem)) {
          return elem.val();
          
        } else {
          return elem[0]&&elem[0].innerHTML;
          
        }
      },
      fiber$getText :function* _trc_Parent_f_getText(_thread,elem) {
        var _this=this;
        
        elem=(yield* _this.fiber$findElement(_thread, elem));
        if (_this.isFormElement(elem)) {
          return elem.val();
          
        } else {
          return elem[0]&&elem[0].innerHTML;
          
        }
        
      },
      setNumber :function _trc_Parent_setNumber(elem,num) {
        var _this=this;
        
        _this.setText(elem,num);
      },
      fiber$setNumber :function* _trc_Parent_f_setNumber(_thread,elem,num) {
        var _this=this;
        
        (yield* _this.fiber$setText(_thread, elem, num));
        
      },
      arrayLike :function _trc_Parent_arrayLike(a) {
        var _this=this;
        
        if (typeof  a.length!=="number") {
          return false;
        }
        if (a.length==0) {
          return true;
        }
        return a[a.length-1]!==undefined;
      },
      fiber$arrayLike :function* _trc_Parent_f_arrayLike(_thread,a) {
        var _this=this;
        
        if (typeof  a.length!=="number") {
          return false;
        }
        if (a.length==0) {
          return true;
        }
        return a[a.length-1]!==undefined;
        
      },
      getAttr :function _trc_Parent_getAttr(elem,name) {
        var _this=this;
        
        elem=_this.findElement(elem);
        return elem.attr(name);
      },
      fiber$getAttr :function* _trc_Parent_f_getAttr(_thread,elem,name) {
        var _this=this;
        
        elem=(yield* _this.fiber$findElement(_thread, elem));
        return elem.attr(name);
        
      },
      setAttr :function _trc_Parent_setAttr(elem,name,value) {
        var _this=this;
        
        elem=_this.findElement(elem);
        return elem.attr(name,value);
      },
      fiber$setAttr :function* _trc_Parent_f_setAttr(_thread,elem,name,value) {
        var _this=this;
        
        elem=(yield* _this.fiber$findElement(_thread, elem));
        return elem.attr(name,value);
        
      },
      onClick :function _trc_Parent_onClick(elem,func,args) {
        var _this=this;
        var usepara;
        var fname;
        
        
        elem=_this.findElement(elem);
        if (args!=null&&! _this.arrayLike(args)) {
          args=[args];
          
        }
        args=args||[elem];
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
          elem.click(_this.catchException((function anonymous_2878() {
            
            Tonyu.bindFunc(_this,_this.parallel).apply(_this,[fname].concat(args));
          })));
          
        } else {
          elem.click(_this.catchException((function anonymous_3062() {
            
            return func.apply(_this,args);
          })));
          
        }
      },
      fiber$onClick :function* _trc_Parent_f_onClick(_thread,elem,func,args) {
        var _this=this;
        var usepara;
        var fname;
        
        
        elem=(yield* _this.fiber$findElement(_thread, elem));
        if (args!=null&&! _this.arrayLike(args)) {
          args=[args];
          
        }
        args=args||[elem];
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
          elem.click(_this.catchException((function anonymous_2878() {
            
            Tonyu.bindFunc(_this,_this.parallel).apply(_this,[fname].concat(args));
          })));
          
        } else {
          elem.click(_this.catchException((function anonymous_3062() {
            
            return func.apply(_this,args);
          })));
          
        }
        
      },
      onTouch :function _trc_Parent_onTouch(func) {
        var _this=this;
        
        if (typeof  func=="function") {
          $("body").on("touchstart",(function anonymous_3218(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
          }));
          $("body").on("touchmove",(function anonymous_3400(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
          }));
          $("body").on("touchend",(function anonymous_3580(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
          }));
          $("body").on("mousedown",(function anonymous_3760(e) {
            
            _this.down=true;
            func(e.pageX,e.pageY,"start");
          }));
          $("body").on("mousemove",(function anonymous_3888(e) {
            
            if (_this.down) {
              func(e.pageX,e.pageY,"move");
            }
          }));
          $("body").on("mouseup",(function anonymous_3998(e) {
            
            _this.down=false;
            func(e.pageX,e.pageY,"end");
          }));
          
        }
      },
      fiber$onTouch :function* _trc_Parent_f_onTouch(_thread,func) {
        var _this=this;
        
        if (typeof  func=="function") {
          $("body").on("touchstart",(function anonymous_3218(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"start");
          }));
          $("body").on("touchmove",(function anonymous_3400(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"move");
          }));
          $("body").on("touchend",(function anonymous_3580(e) {
            
            func(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY,"end");
          }));
          $("body").on("mousedown",(function anonymous_3760(e) {
            
            _this.down=true;
            func(e.pageX,e.pageY,"start");
          }));
          $("body").on("mousemove",(function anonymous_3888(e) {
            
            if (_this.down) {
              func(e.pageX,e.pageY,"move");
            }
          }));
          $("body").on("mouseup",(function anonymous_3998(e) {
            
            _this.down=false;
            func(e.pageX,e.pageY,"end");
          }));
          
        }
        
      },
      setCanvas :function _trc_Parent_setCanvas(canv) {
        var _this=this;
        
        _this._canvas=_this.findElement(canv)[0];
      },
      fiber$setCanvas :function* _trc_Parent_f_setCanvas(_thread,canv) {
        var _this=this;
        
        _this._canvas=_this.findElement(canv)[0];
        
      },
      searchCanvas :function _trc_Parent_searchCanvas() {
        var _this=this;
        
        if (! _this._canvas) {
          return _this._canvas=$("canvas")[0];
          
        } else {
          return _this._canvas;
          
        }
      },
      fiber$searchCanvas :function* _trc_Parent_f_searchCanvas(_thread) {
        var _this=this;
        
        if (! _this._canvas) {
          return _this._canvas=$("canvas")[0];
          
        } else {
          return _this._canvas;
          
        }
        
      },
      setColor :function _trc_Parent_setColor(r,g,b) {
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
          _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
          
        }
      },
      fiber$setColor :function* _trc_Parent_f_setColor(_thread,r,g,b) {
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
          _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
          
        }
        
      },
      fillRect :function _trc_Parent_fillRect(x,y,w,h) {
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillRect(x,y,w,h);
          
        }
      },
      fiber$fillRect :function* _trc_Parent_f_fillRect(_thread,x,y,w,h) {
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillRect(x,y,w,h);
          
        }
        
      },
      changeImage :function _trc_Parent_changeImage(elem,newsrc) {
        var _this=this;
        
        if (! (newsrc+"").match(/^http/)) {
          newsrc=window.runtimePath+newsrc;
          
        }
        _this.findElement(elem).attr("src",newsrc);
      },
      fiber$changeImage :function* _trc_Parent_f_changeImage(_thread,elem,newsrc) {
        var _this=this;
        
        if (! (newsrc+"").match(/^http/)) {
          newsrc=window.runtimePath+newsrc;
          
        }
        _this.findElement(elem).attr("src",newsrc);
        
      },
      move :function _trc_Parent_move(elem,x,y) {
        var _this=this;
        
        _this.findElement(elem).css({position: "absolute",left: x,top: y});
      },
      fiber$move :function* _trc_Parent_f_move(_thread,elem,x,y) {
        var _this=this;
        
        _this.findElement(elem).css({position: "absolute",left: x,top: y});
        
      },
      transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
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
      fiber$transform :function* _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
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
      rotate :function _trc_Parent_rotate(elem,angle) {
        var _this=this;
        
        _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
      },
      fiber$rotate :function* _trc_Parent_f_rotate(_thread,elem,angle) {
        var _this=this;
        
        _this.findElement(elem).css({position: "absolute",transform: "rotate("+angle+"deg)"});
        
      },
      resize :function _trc_Parent_resize(elem,w,h) {
        var _this=this;
        
        _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
      },
      fiber$resize :function* _trc_Parent_f_resize(_thread,elem,w,h) {
        var _this=this;
        
        _this.findElement(elem).css({position: "absolute",transform: "scale("+w+","+h+")"});
        
      },
      wait :function _trc_Parent_wait(time) {
        var _this=this;
        var t;
        
        time=time||100;
        t = null;
        
        t.suspend();
        setTimeout((()=>(_this.runThread(t))),time);
      },
      fiber$wait :function* _trc_Parent_f_wait(_thread,time) {
        var _this=this;
        var t;
        
        time=time||100;
        t = _thread;
        
        t.suspend();
        setTimeout((()=>(_this.runThread(t))),time);
        
      },
      rnd :function _trc_Parent_rnd(max) {
        var _this=this;
        
        return _this.Math.floor(_this.Math.random()*max);
      },
      fiber$rnd :function* _trc_Parent_f_rnd(_thread,max) {
        var _this=this;
        
        return _this.Math.floor(_this.Math.random()*max);
        
      },
      setBGColor :function _trc_Parent_setBGColor(c) {
        var _this=this;
        
        $("body").attr("bgcolor",c);
      },
      fiber$setBGColor :function* _trc_Parent_f_setBGColor(_thread,c) {
        var _this=this;
        
        $("body").attr("bgcolor",c);
        
      },
      newElement :function _trc_Parent_newElement(elem,n,innerHTML) {
        var _this=this;
        var e;
        var parent;
        var after;
        var k;
        var v;
        
        e = _this.document.createElement(elem);
        
        parent = $(_this.document.body);
        
        after = {};
        
        if (typeof  n==="string") {
          e.setAttribute("name",n);
          
        } else {
          if (n.parent) {
            parent=_this.findElement(n.parent);
            if (typeof  n.parent!=="string") {
              delete n.parent;
            }
            
          }
          if (n.onClick) {
            after.onClick=n.onClick;
            delete n.onClick;
            
          }
          for ([k, v] of Tonyu.iterator2(n,2)) {
            e.setAttribute(k,v);
            
          }
          
        }
        if (innerHTML) {
          e.innerHTML=innerHTML;
          
        }
        parent.append(e);
        if (after.onClick) {
          _this.onClick(e,after.onClick);
          
        }
        return $(e);
      },
      fiber$newElement :function* _trc_Parent_f_newElement(_thread,elem,n,innerHTML) {
        var _this=this;
        var e;
        var parent;
        var after;
        var k;
        var v;
        
        e = _this.document.createElement(elem);
        
        parent = $(_this.document.body);
        
        after = {};
        
        if (typeof  n==="string") {
          e.setAttribute("name",n);
          
        } else {
          if (n.parent) {
            parent=(yield* _this.fiber$findElement(_thread, n.parent));
            if (typeof  n.parent!=="string") {
              delete n.parent;
            }
            
          }
          if (n.onClick) {
            after.onClick=n.onClick;
            delete n.onClick;
            
          }
          for ([k, v] of Tonyu.iterator2(n,2)) {
            e.setAttribute(k,v);
            
          }
          
        }
        if (innerHTML) {
          e.innerHTML=innerHTML;
          
        }
        parent.append(e);
        if (after.onClick) {
          (yield* _this.fiber$onClick(_thread, e, after.onClick));
          
        }
        return $(e);
        
      },
      fillOval :function _trc_Parent_fillOval(x,y,w,h) {
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
      fiber$fillOval :function* _trc_Parent_f_fillOval(_thread,x,y,w,h) {
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
      drawLine :function _trc_Parent_drawLine(x1,y1,x2,y2) {
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.beginPath();
          _this.ctx.moveTo(x1,y1);
          _this.ctx.lineTo(x2,y2);
          _this.ctx.stroke();
          
        }
      },
      fiber$drawLine :function* _trc_Parent_f_drawLine(_thread,x1,y1,x2,y2) {
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.beginPath();
          _this.ctx.moveTo(x1,y1);
          _this.ctx.lineTo(x2,y2);
          _this.ctx.stroke();
          
        }
        
      },
      clearRect :function _trc_Parent_clearRect(x,y,w,h) {
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.clearRect(x,y,w,h);
          
        }
      },
      fiber$clearRect :function* _trc_Parent_f_clearRect(_thread,x,y,w,h) {
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.clearRect(x,y,w,h);
          
        }
        
      },
      fillText :function _trc_Parent_fillText(t,x,y) {
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillText(t,x,y);
          
        }
      },
      fiber$fillText :function* _trc_Parent_f_fillText(_thread,t,x,y) {
        var _this=this;
        
        if (_this.searchCanvas()) {
          _this.ctx=_this._canvas.getContext("2d");
          _this.ctx.fillText(t,x,y);
          
        }
        
      },
      initialize :function _trc_Parent_initialize() {
        var _this=this;
        
        _this.activityGroup=_this.activityGroup||"default";
        _this.keyData=[];
        _this.document.onkeydown=(function anonymous_7387(e) {
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
        _this.document.onkeyup=(function anonymous_8464(e) {
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
        var _this=this;
        
        return _this.keyData[k.toLowerCase()]||0;
      },
      fiber$getkey :function* _trc_Parent_f_getkey(_thread,k) {
        var _this=this;
        
        return _this.keyData[k.toLowerCase()]||0;
        
      },
      dist :function _trc_Parent_dist(x,y) {
        var _this=this;
        
        return _this.sqrt(x*x+y*y);
      },
      fiber$dist :function* _trc_Parent_f_dist(_thread,x,y) {
        var _this=this;
        
        return yield* _this.fiber$sqrt(_thread, x*x+y*y);
        
        
      },
      angle :function _trc_Parent_angle(x,y) {
        var _this=this;
        
        return _this.deg(_this.Math.atan2(y,x));
      },
      fiber$angle :function* _trc_Parent_f_angle(_thread,x,y) {
        var _this=this;
        
        return _this.deg(_this.Math.atan2(y,x));
        
      },
      rad :function _trc_Parent_rad(d) {
        var _this=this;
        
        return d/180*_this.Math.PI;
      },
      deg :function _trc_Parent_deg(d) {
        var _this=this;
        
        return d/_this.Math.PI*180;
      },
      sqrt :function _trc_Parent_sqrt(x) {
        var _this=this;
        
        return _this.Math.sqrt(x);
      },
      fiber$sqrt :function* _trc_Parent_f_sqrt(_thread,x) {
        var _this=this;
        
        return _this.Math.sqrt(x);
        
      },
      sin :function _trc_Parent_sin(x) {
        var _this=this;
        
        return _this.Math.sin(_this.rad(x));
      },
      fiber$sin :function* _trc_Parent_f_sin(_thread,x) {
        var _this=this;
        
        return _this.Math.sin(_this.rad(x));
        
      },
      cos :function _trc_Parent_cos(x) {
        var _this=this;
        
        return _this.Math.cos(_this.rad(x));
      },
      fiber$cos :function* _trc_Parent_f_cos(_thread,x) {
        var _this=this;
        
        return _this.Math.cos(_this.rad(x));
        
      },
      tan :function _trc_Parent_tan(x) {
        var _this=this;
        
        return _this.Math.tan(_this.rad(x));
      },
      fiber$tan :function* _trc_Parent_f_tan(_thread,x) {
        var _this=this;
        
        return _this.Math.tan(_this.rad(x));
        
      },
      parallel :function _trc_Parent_parallel() {
        var _this=this;
        var a;
        var methodName;
        var t;
        
        a = Array.prototype.slice.call(arguments);
        
        methodName = a.shift();
        
        t = Tonyu.thread();
        
        t.apply(_this,methodName,a);
        _this.runThread(t);
      },
      fiber$parallel :function* _trc_Parent_f_parallel(_thread) {
        var _this=this;
        var _arguments=Tonyu.A(arguments);
        var a;
        var methodName;
        var t;
        
        a = Array.prototype.slice.call(_arguments);
        
        methodName = a.shift();
        
        t = Tonyu.thread();
        
        t.apply(_this,methodName,a);
        (yield* _this.fiber$runThread(_thread, t));
        
      },
      runThread :function _trc_Parent_runThread(th) {
        var _this=this;
        
        _this.catchException((function anonymous_9720() {
          
          th.steps();
          if (th.preempted) {
            setTimeout((()=>(_this.runThread(th))),0);
            
          }
        }));
      },
      fiber$runThread :function* _trc_Parent_f_runThread(_thread,th) {
        var _this=this;
        
        (yield* _this.fiber$catchException(_thread, (function anonymous_9720() {
          
          th.steps();
          if (th.preempted) {
            setTimeout((()=>(_this.runThread(th))),0);
            
          }
        })));
        
      },
      waitClick :function _trc_Parent_waitClick(elem) {
        var _this=this;
        var clicked;
        var _func;
        
        clicked = 0;
        
        _func = (function anonymous_9895() {
          
          clicked=1;
        });
        
        _this.onClick(elem,_func);
        while (clicked==0) {
          Tonyu.checkLoop();
          _this.wait(10);
          
        }
        _this.findElement(elem).off("click","",_func);
      },
      fiber$waitClick :function* _trc_Parent_f_waitClick(_thread,elem) {
        var _this=this;
        var clicked;
        var _func;
        
        clicked = 0;
        
        _func = (function anonymous_9895() {
          
          clicked=1;
        });
        
        (yield* _this.fiber$onClick(_thread, elem, _func));
        while (clicked==0) {
          yield null;
          (yield* _this.fiber$wait(_thread, 10));
          
        }
        _this.findElement(elem).off("click","",_func);
        
      },
      _waitFor :function _trc_Parent__waitFor(promise) {
        var _this=this;
        
        _this._err=null;
        promise.then((function anonymous_10124(r) {
          
          _this._res=r;
        }),(function anonymous_10155(e) {
          
          _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        }));
      },
      fiber$_waitFor :function* _trc_Parent_f__waitFor(_thread,promise) {
        var _this=this;
        
        _this._err=null;
        (yield* _thread.await(promise.then((function anonymous_10124(r) {
          
          _this._res=r;
        }),(function anonymous_10155(e) {
          
          _this._err=(e instanceof window.Error?e:new Error(e.responseText||e+""));
        }))));
        
      },
      waitFor :function _trc_Parent_waitFor(promise) {
        var _this=this;
        
        _this._waitFor(promise);
        if (_this._err) {
          throw _this._err;
          
        }
        return _this._res;
      },
      fiber$waitFor :function* _trc_Parent_f_waitFor(_thread,promise) {
        var _this=this;
        
        (yield* _this.fiber$_waitFor(_thread, promise));
        if (_this._err) {
          throw _this._err;
          
        }
        return _this._res;
        
      },
      putToServer :function _trc_Parent_putToServer(key,value) {
        var _this=this;
        var url;
        var p;
        var r;
        
        url = window.location.href;
        
        p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
        
        
        r=_this.waitFor(p);
        return r;
      },
      fiber$putToServer :function* _trc_Parent_f_putToServer(_thread,key,value) {
        var _this=this;
        var url;
        var p;
        var r;
        
        url = window.location.href;
        
        p = window.$.ajax({url: window.runtimePath+"a.php?KeyValue/put",type: 'POST',data: {key: key,value: value,url: url,group: _this.activityGroup}});
        
        
        r=(yield* _this.fiber$waitFor(_thread, p));
        return r;
        
      },
      setGroup :function _trc_Parent_setGroup(g) {
        var _this=this;
        
        _this.activityGroup=g||"default";
      },
      fiber$setGroup :function* _trc_Parent_f_setGroup(_thread,g) {
        var _this=this;
        
        _this.activityGroup=g||"default";
        
      },
      getFromServer :function _trc_Parent_getFromServer(key) {
        var _this=this;
        var url;
        var p;
        var r;
        
        url = window.location.href;
        
        p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
        
        
        r=_this.waitFor(p);
        return r;
      },
      fiber$getFromServer :function* _trc_Parent_f_getFromServer(_thread,key) {
        var _this=this;
        var url;
        var p;
        var r;
        
        url = window.location.href;
        
        p = window.$.ajax(window.runtimePath+"a.php?KeyValue/get"+"&key="+key+"&url="+url+"&group="+_this.activityGroup);
        
        
        r=(yield* _this.fiber$waitFor(_thread, p));
        return r;
        
      },
      getListFromServer :function _trc_Parent_getListFromServer() {
        var _this=this;
        var url;
        var p;
        var r;
        
        url = window.location.href;
        
        p = window.$.ajax(window.runtimePath+"a.php?KeyValue/ls"+"&url="+url+"&group="+_this.activityGroup);
        
        
        r=_this.waitFor(p);
        return Object.keys(r.data);
      },
      fiber$getListFromServer :function* _trc_Parent_f_getListFromServer(_thread) {
        var _this=this;
        var url;
        var p;
        var r;
        
        url = window.location.href;
        
        p = window.$.ajax(window.runtimePath+"a.php?KeyValue/ls"+"&url="+url+"&group="+_this.activityGroup);
        
        
        r=(yield* _this.fiber$waitFor(_thread, p));
        return Object.keys(r.data);
        
      },
      addLog :function _trc_Parent_addLog(practice,d1,d2,d3,d4) {
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
      fiber$addLog :function* _trc_Parent_f_addLog(_thread,practice,d1,d2,d3,d4) {
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
        
        
        r=(yield* _this.fiber$waitFor(_thread, p));
        return r;
        
      },
      findLog :function _trc_Parent_findLog(practice,d1,d2,d3,d4) {
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
      fiber$findLog :function* _trc_Parent_f_findLog(_thread,practice,d1,d2,d3,d4) {
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
        
        
        r=(yield* _this.fiber$waitFor(_thread, p));
        return r;
        
      },
      curProject :function _trc_Parent_curProject() {
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
      fiber$curProject :function* _trc_Parent_f_curProject(_thread) {
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
        
        
        r=(yield* _this.fiber$waitFor(_thread, p));
        return r;
        
      },
      createGraph :function _trc_Parent_createGraph(target,src) {
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
      fiber$createGraph :function* _trc_Parent_f_createGraph(_thread,target,src) {
        var _this=this;
        var e;
        var g;
        
        e=yield* _this.fiber$findElement(_thread, target);
        
        if (! e[0]) {
          e=$("<div>").appendTo("body");
          
        }
        g = new Tonyu.classes.jslker.Graph(e[0]);
        
        g.src=src||[];
        return g;
        
      },
      readFile :function _trc_Parent_readFile(path) {
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
      fiber$readFile :function* _trc_Parent_f_readFile(_thread,path) {
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
        
        
        r=(yield* _this.fiber$waitFor(_thread, p));
        return r;
        
      },
      writeFile :function _trc_Parent_writeFile(path,content) {
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
      fiber$writeFile :function* _trc_Parent_f_writeFile(_thread,path,content) {
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
        
        
        r=(yield* _this.fiber$waitFor(_thread, p));
        return r;
        
      },
      loadRaspiScript :function _trc_Parent_loadRaspiScript() {
        var _this=this;
        var ppath;
        
        ppath = BitArrow.runtimePath+"lib/python/";
        
        _this.waitFor($.getScript(ppath+"SerialControl.js"));
        _this.waitFor($.getScript(ppath+"raspi_repl.js"));
      },
      fiber$loadRaspiScript :function* _trc_Parent_f_loadRaspiScript(_thread) {
        var _this=this;
        var ppath;
        
        ppath = BitArrow.runtimePath+"lib/python/";
        
        (yield* _this.fiber$waitFor(_thread, $.getScript(ppath+"SerialControl.js")));
        (yield* _this.fiber$waitFor(_thread, $.getScript(ppath+"raspi_repl.js")));
        
      },
      startRaspi :function _trc_Parent_startRaspi() {
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
      fiber$startRaspi :function* _trc_Parent_f_startRaspi(_thread) {
        var _this=this;
        
        if (_this.raspiStarted) {
          return _this;
        }
        (yield* _this.fiber$loadRaspiScript(_thread));
        _this.raspiREPL=new RaspiREPL();
        (yield* _this.fiber$waitFor(_thread, _this.raspiREPL.waitReady()));
        (yield* _this.fiber$execRaspi(_thread, "import machine"));
        _this.raspiStarted=true;
        
      },
      execRaspi :function _trc_Parent_execRaspi(script) {
        var _this=this;
        var r;
        
        
        r=_this.waitFor(_this.raspiREPL.runCmd(script));
        return r;
      },
      fiber$execRaspi :function* _trc_Parent_f_execRaspi(_thread,script) {
        var _this=this;
        var r;
        
        
        r=(yield* _this.fiber$waitFor(_thread, _this.raspiREPL.runCmd(script)));
        return r;
        
      },
      readADC :function _trc_Parent_readADC(port,bytes) {
        var _this=this;
        var r;
        
        
        _this.startRaspi();
        r=_this.execRaspi("print(machine.ADC("+port+").read_u16())");
        return r;
      },
      fiber$readADC :function* _trc_Parent_f_readADC(_thread,port,bytes) {
        var _this=this;
        var r;
        
        
        (yield* _this.fiber$startRaspi(_thread));
        r=(yield* _this.fiber$execRaspi(_thread, "print(machine.ADC("+port+").read_u16())"));
        return r;
        
      },
      getTemperature :function _trc_Parent_getTemperature() {
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
      fiber$getTemperature :function* _trc_Parent_f_getTemperature(_thread) {
        var _this=this;
        var t;
        var conversion_factor;
        var reading;
        var temperature;
        
        
        t=(yield* _this.fiber$readADC(_thread, 4));
        conversion_factor = 3.3/(65535);
        
        reading = t*conversion_factor;
        
        temperature = 27-(reading-0.706)/0.001721;
        
        return temperature;
        
      },
      addCDB :function _trc_Parent_addCDB(key,data) {
        var _this=this;
        var p;
        var r;
        
        p = window.$.post(window.runtimePath+"a.php?CDB/post",{key: key,data: window.JSON.stringify(data)});
        
        
        r=_this.waitFor(p);
        return r;
      },
      fiber$addCDB :function* _trc_Parent_f_addCDB(_thread,key,data) {
        var _this=this;
        var p;
        var r;
        
        p = window.$.post(window.runtimePath+"a.php?CDB/post",{key: key,data: window.JSON.stringify(data)});
        
        
        r=(yield* _this.fiber$waitFor(_thread, p));
        return r;
        
      },
      findCDB :function _trc_Parent_findCDB(key) {
        var _this=this;
        var p;
        var r;
        
        p = window.$.get(window.runtimePath+"a.php?CDB/get&key="+key);
        
        
        r=_this.waitFor(p);
        return r;
      },
      fiber$findCDB :function* _trc_Parent_f_findCDB(_thread,key) {
        var _this=this;
        var p;
        var r;
        
        p = window.$.get(window.runtimePath+"a.php?CDB/get&key="+key);
        
        
        r=(yield* _this.fiber$waitFor(_thread, p));
        return r;
        
      },
      callServer :function _trc_Parent_callServer(url,stdin) {
        var _this=this;
        var t;
        var timeout;
        var p;
        var r;
        
        if (typeof  url!=="string") {
          throw new Error("callServer: "+url+"はURLの文字列ではありません．");
          
          
        }
        
        
        p = new window.Promise((function anonymous_14911(_s) {
          var s;
          var fullURL;
          var ifrm;
          function clean() {
            
            ifrm.remove();
            window.clearTimeout(t);
            if (timeout) {
              timeout.remove();
            }
          }
          s = (function anonymous_14934(str) {
            
            str=str.replace(/\s*$/,"");
            _s(str);
          });
          
          
          window.sendResult=(function anonymous_15193(r) {
            
            clean();
            s(r);
          });
          window.onmessage=(function anonymous_15279(e) {
            
            clean();
            s(e.data.result);
          });
          fullURL = url+(stdin?"?stdin="+window.encodeURI(stdin):"");
          
          ifrm = window.$("<iframe>").attr({src: fullURL,width: 1,height: 1}).appendTo("body");
          
          t=window.setTimeout((function anonymous_15546() {
            
            ifrm.attr({width: 600,height: 300});
            timeout=window.$("<div>").append("サーバからの応答に時間がかかっています．").append(window.$("<a>").attr({target: "debug",href: fullURL}).text("処理を確認..."));
            ifrm.before(timeout);
          }),5000);
        }));
        
        r = _this.waitFor(p);
        
        return r;
      },
      fiber$callServer :function* _trc_Parent_f_callServer(_thread,url,stdin) {
        var _this=this;
        var t;
        var timeout;
        var p;
        var r;
        
        if (typeof  url!=="string") {
          throw new Error("callServer: "+url+"はURLの文字列ではありません．");
          
          
        }
        
        
        p = new window.Promise((function anonymous_14911(_s) {
          var s;
          var fullURL;
          var ifrm;
          function clean() {
            
            ifrm.remove();
            window.clearTimeout(t);
            if (timeout) {
              timeout.remove();
            }
          }
          s = (function anonymous_14934(str) {
            
            str=str.replace(/\s*$/,"");
            _s(str);
          });
          
          
          window.sendResult=(function anonymous_15193(r) {
            
            clean();
            s(r);
          });
          window.onmessage=(function anonymous_15279(e) {
            
            clean();
            s(e.data.result);
          });
          fullURL = url+(stdin?"?stdin="+window.encodeURI(stdin):"");
          
          ifrm = window.$("<iframe>").attr({src: fullURL,width: 1,height: 1}).appendTo("body");
          
          t=window.setTimeout((function anonymous_15546() {
            
            ifrm.attr({width: 600,height: 300});
            timeout=window.$("<div>").append("サーバからの応答に時間がかかっています．").append(window.$("<a>").attr({target: "debug",href: fullURL}).text("処理を確認..."));
            ifrm.before(timeout);
          }),5000);
        }));
        
        r=yield* _this.fiber$waitFor(_thread, p);
        
        return r;
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}},"__getter__Math":{"nowait":true,"isMain":false,"vtype":{"params":[],"returnValue":null}},"__getter__document":{"nowait":true,"isMain":false,"vtype":{"params":[],"returnValue":null}},"setInterval":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"setTimeout":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"catchException":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"findElement":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"isFormElement":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"clearContent":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"addText":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"setText":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"getNumber":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"getText":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"setNumber":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"arrayLike":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"getAttr":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"setAttr":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"onClick":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"onTouch":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"setCanvas":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"searchCanvas":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"setColor":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"fillRect":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null,null],"returnValue":null}},"changeImage":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"move":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"transform":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null,null],"returnValue":null}},"rotate":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"resize":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"wait":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"rnd":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"setBGColor":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"newElement":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"fillOval":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null,null],"returnValue":null}},"drawLine":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null,null],"returnValue":null}},"clearRect":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null,null],"returnValue":null}},"fillText":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null],"returnValue":null}},"new":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"getkey":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"dist":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"angle":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"rad":{"nowait":true,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"deg":{"nowait":true,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"sqrt":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"sin":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"cos":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"tan":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"parallel":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"runThread":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"waitClick":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"_waitFor":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"waitFor":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"putToServer":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"setGroup":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"getFromServer":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"getListFromServer":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"addLog":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null,null,null],"returnValue":null}},"findLog":{"nowait":false,"isMain":false,"vtype":{"params":[null,null,null,null,null],"returnValue":null}},"curProject":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"createGraph":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"readFile":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"writeFile":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"loadRaspiScript":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"startRaspi":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"execRaspi":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"readADC":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"getTemperature":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"addCDB":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}},"findCDB":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"callServer":{"nowait":false,"isMain":false,"vtype":{"params":[null,null],"returnValue":null}}},"fields":{"down":{},"_canvas":{},"ctx":{},"activityGroup":{},"keyData":{},"_err":{},"_res":{},"group":{},"raspiStarted":{},"raspiREPL":{}}}
});

});

//# sourceMappingURL=concat.js.map