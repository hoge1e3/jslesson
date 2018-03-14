(function(){return DtlPromise.run(this,[function () { return this['$']=this['create']();
;},function () { return this['$']['create']=dtlbind(this,function(tag){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return (this['window']['$'])['call']((this['root']),(tag));
;}]);});
;},function () { return this['Actor']=this['create']();
;},function () { return this['Actor']['pos']=this['Vec2']['O'];
;},function () { return this['Actor']['dir']=(0);
;},function () { return this['Actor']['num']=dtlbind(this,function(x){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return x;
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return x;
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (0);
;}]);}));
;}]);});
;},function () { return this['Actor']['createSVGElem']=dtlbind(this,function(tag){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['$']['create']((this['document']['createElementNS']("http://www.w3.org/2000/svg",(tag))));
;}]);});
;},function () { return this['Actor']['copySVGElem']=dtlbind(this,function(dst,src){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var t;
var n;
var a;
var s;
return DtlPromise.run(this,[function () { return src=this['$']['create']((src));
;},function () { return dst=this['$']['create']((dst));
;},function () { return t=this;
;},function () { return src['children']()['each'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return s=this;
;},function () { return n=t['createSVGElem']((s['tagName']))['get']((0));
;},function () { return a=(t['Array']['prototype']['slice'])['call']((s['attributes']));
;},function () { return a['each'](dtlbind(this,function(an){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return an=an['name'];
;},function () { return n['setAttribute']((an),(s['getAttribute']((an))));
;}]);}));
;},function () { return dst['append']((n));
;},function () { return t['copySVGElem']((n),(s));
;}]);}));
;}]);});
;},function () { return this['Actor']['show']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['group']['add']((this));
;},function () { return this['setTrans']();
;},function () { return this['isShowing']=this['true'];
;},function () { return this;
;}]);});
;},function () { return this['Actor']['hide']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var i;
return DtlPromise.run(this,[function () { return this['group']['remove']((this));
;},function () { return this['isShowing']=this['false'];
;},function () { return this;
;}]);});
;},function () { return this['Actor']['addAlias']("show","appear")['addAlias']("hide","die");
;},function () { return this['Actor']['group']=this['Actor']['create']();
;},function () { return this['Actor']['group']['members']=this['Array']['create']();
;},function () { return this['Actor']['group']['remove']=dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var i;
return DtlPromise.run(this,[function () { return i=this['members']['indexOf']((m));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (i>=(0));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['members']['splice']((i),((1)));
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return m['element'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return m['element']['remove']();
;}]);}));
;}]);});
;},function () { return this['Actor']['group']['add']=dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var i;
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return m['getCrashShape'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['system']['throw']((("NO"+m)));
;}]);}));
;},function () { return i=this['members']['indexOf']((m));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (i<(0));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['members']['push']((m));
;},function () { return this['element']['append']((m['element']));
;}]);}));
;}]);});
;},function () { return this['Actor']['initSVG']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
var wndj;
var svgw;
var svgh;
return DtlPromise.run(this,[function () { return this['svg']=this['$']['create']("svg");
;},function () { return this['console']['log']("SVG",(this['svg']));
;},function () { return wndj=this['$']['create']((this['window']));
;},function () { return svgw=((wndj['width']())-(10));
;},function () { return svgh=((wndj['height']())-(10));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (svgh<=(0));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return svgh=((svgw/(16))*(9));
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['svg']['length']===(0));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['svg']=this['createSVGElem']("svg")['attr']("width",(svgw))['attr']("height",(svgh))['css']("position","absolute")['appendTo']("body");
;}]);}));
;},function () { return this['svg_g']=this['svg']['find']("g");
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['svg_g']['length']===(0));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['svg_g']=this['createSVGElem']("g")['attr']("transform",((((("translate("+((svgw/(2))))+",")+((svgh/(2))))+") scale(1,-1)")))['appendTo']((this['svg']));
;}]);}));
;},function () { return t=this;
;},function () { return wndj['resize'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return svgw=((wndj['width']())-(10));
;},function () { return svgh=((wndj['height']())-(10));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (svgh<=(0));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return svgh=((svgw/(16))*(9));
;}]);}));
;},function () { return (t['svg'])['attr']("width",(svgw))['attr']("height",(svgh));
;},function () { return (t['svg_g'])['attr']("transform",((((("translate("+((svgw/(2))))+",")+((svgh/(2))))+") scale(1,-1)")));
;}]);}));
;},function () { return this['group']['element']=this['svg_g'];
;}]);});
;},function () { return this['Actor']['initSVG']();
;},function () { return this['Actor']['forward']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return by=this['num']((by));
;},function () { return this['_lastPos']=this['pos'];
;},function () { return this['_lastStep']=by;
;},function () { return this['pos']=this['pos']['add'](((this['Vec2']['X'])['rotate']((this['dir']))['mul']((by))));
;},function () { return this['setTrans']();
;},function () { return this;
;}]);});
;},function () { return this['Actor']['backward']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return by=this['num']((by));
;},function () { return this['forward']((-by));
;}]);});
;},function () { return this['Actor']['turnLeft']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return by=this['num']((by));
;},function () { return this['dir']=(this['dir']+by);
;},function () { return this['setTrans']();
;},function () { return this;
;}]);});
;},function () { return this['Actor']['turnRight']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return by=this['num']((by));
;},function () { return this['turnLeft']((-by));
;}]);});
;},function () { return this['Actor']['leftTurn']=this['Actor']['turnLeft'];
;},function () { return this['Actor']['rightTurn']=this['Actor']['turnRight'];
;},function () { return this['Actor']['getCrashShape']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['Polygon']['create']()['addVertex'](((-this['width']/(2))),((-this['height']/(2))))['addVertex'](((this['width']/(2))),((-this['height']/(2))))['addVertex'](((this['width']/(2))),((this['height']/(2))))['addVertex'](((-this['width']/(2))),((this['height']/(2))))['transform']((this['dir']),(this['pos']));
;}]);});
;},function () { return this['Actor']['crashTo']=dtlbind(this,function(o){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return o['getCrashShape'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['system']['throw']((("NO"+o)));
;}]);}));
;},function () { return (this['getCrashShape']())['intersects']((o['getCrashShape']()));
;}]);});
;},function () { return this['Actor']['_scale']=(1);
;},function () { return this['Actor']['setTrans']=dtlbind(this,function(str){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return str=(((("translate("+(this['pos']['x']))+" ")+(this['pos']['y']))+") ");
;},function () { return str=(((str+"rotate(")+this['dir'])+") ");
;},function () { return str=(((((str+"scale(")+this['_scale'])+" ")+this['_scale'])+") ");
;},function () { return this['element']['attr']("transform",(str))['attr']("data-trans",((((((this['pos']['x'])+",")+(this['pos']['y']))+",")+this['dir'])));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['isShowing'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['checkCrash']();
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['Actor']['scale']=dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['_scale']=(this['_scale']*s);
;},function () { return this['setTrans']();
;}]);});
;},function () { return this['Actor']['moveTo']=dtlbind(this,function(dx,dy){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return dx=this['num']((dx));
;},function () { return dy=this['num']((dy));
;},function () { return this['pos']=this['Vec2']['create']((dx),(dy));
;},function () { return this['setTrans']();
;}]);});
;},function () { return this['Actor']['moveToCenter']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['moveTo']((0),(0));
;}]);});
;},function () { return this['Actor']['addAlias']("moveToCenter","moveCenter");
;},function () { return this['Actor']['moveBy']=dtlbind(this,function(dx,dy){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return dx=this['num']((dx));
;},function () { return dy=this['num']((dy));
;},function () { return this['moveTo'](((this['pos']['x']+dx)),((this['pos']['y']+dy)));
;}]);});
;},function () { return this['Actor']['setDir']=dtlbind(this,function(d){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['dir']=this['num']((d));
;},function () { return this['setTrans']();
;}]);});
;},function () { return this['Actor']['addAlias']("setDir","direction");
;},function () { return this['Actor']['getDir']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['dir'];
;}]);});
;},function () { return this['Actor']['addAlias']("getDir","direction?");
;},function () { return root['collision']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);});
;},function () { return root['collision']['isEventHandler']=this['true'];
;},function () { return this['Actor']['checkCrash']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['Actor']['_doingCheckCrash'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['Actor']['_doingCheckCrash']=(1);
;},function () { return this['allCrash']()['each'](dtlbind(this,function(a){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['collision']((a));
;},function () { return a['collision']((this));
;}]);}));
;},function () { return this['Actor']['_doingCheckCrash']=(0);
;}]);}));
;}]);});
;},function () { return this['Actor']['allCrash']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
var res;
return DtlPromise.run(this,[function () { return res=this['Array']['create']();
;},function () { return (this['group']['members'])['each'](dtlbind(this,function(a){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this!==a);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['crashTo']((a));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return res['push']((a));
;}]);}));
;}]);}));
;}]);}));
;},function () { return res;
;}]);});
;},function () { return this['Actor']['bounce']=dtlbind(this,function(_hitTarget){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var lp;
var ld;
var stp;
var a;
return DtlPromise.run(this,[function () { return lp=this['_lastPos'];
;},function () { return ld=this['dir'];
;},function () { return stp=lp['sub']((this['pos']))['len']();
;},function () { return this['pos']=lp;
;},function () { return a=((2)*((this['dir']-(_hitTarget['getDir']()))));
;},function () { return this['turnRight']((a));
;},function () { return this['forward']((stp));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['allCrash']())['length'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['pos']=lp;
;},function () { return this['dir']=ld;
;},function () { return this['turnLeft']((((180)-a)));
;},function () { return this['forward']((stp));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['allCrash']())['length'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['pos']=lp;
;},function () { return this['dir']=ld;
;},function () { return this['turnLeft']((180));
;}]);}));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['Actor']['xpos?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['pos']['x'];
;}]);});
;},function () { return this['Actor']['ypos?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['pos']['y'];
;}]);});
;}]);}).checkerror().apply(root,[]);
//# sourceMappingURL=Actor.js.map
