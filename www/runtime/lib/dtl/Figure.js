(function(){return DtlPromise.run(this,[function () { return this['Figure']=this['Actor']['create']();
;},function () { return this['Figure']['initialize']=dtlbind(this,function(parent){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return parent;
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']=parent['lineG'];
;},function () { return this['element']['remove']();
;},function () { return this['pos']=parent['lineOrig'];
;},function () { return this['dir']=(0);
;},function () { return this['setLocalShapeAsLines']();
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']=this['createSVGElem']("g");
;},function () { return this['copySVGElem']((this['element']),(this['__proto__']['element']));
;},function () { return this['polygonElem']=this['undef'];
;},function () { return this['findPolygonElem']();
;}]);}));
;},function () { return this['isShowing']=this['false'];
;},function () { return this['appear']();
;}]);});
;},function () { return this['Figure']['findPolygonElem']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var p;
return DtlPromise.run(this,[function () { return p=this['element']['find']("polygon");
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (p['length']>(0));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['polygonElem']=p;
;}]);}));
;}]);});
;},function () { return this['Figure']['setLocalShapeAsPolygon']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
var j;
var lx;
var ly;
var ls;
return DtlPromise.run(this,[function () { return t=this;
;},function () { return ls=this['element']['find']("line");
;},function () { return this['localShape']=this['Polygon']['create']();
;},function () { return ls['each'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return j=(t['$'])['create']((this));
;},function () { return lx=j['attr']("x1");
;},function () { return lx=(lx-(0));
;},function () { return ly=j['attr']("y1");
;},function () { return ly=(ly-(0));
;},function () { return (t['localShape'])['addVertex']((lx),(ly));
;}]);}));
;},function () { return lx=j['attr']("x2");
;},function () { return lx=(lx-(0));
;},function () { return ly=j['attr']("y2");
;},function () { return ly=(ly-(0));
;},function () { return this['localShape']['addVertex']((lx),(ly));
;}]);});
;},function () { return this['Figure']['setLocalShapeAsLines']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
var j;
var x1;
var y1;
var x2;
var y2;
var p1;
var p2;
var w;
return DtlPromise.run(this,[function () { return t=this;
;},function () { return this['localShape']=this['ShapeGroup']['create']();
;},function () { return this['element']['find']("line")['each'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return j=(t['$'])['create']((this));
;},function () { return x1=j['attr']("x1");
;},function () { return x1=(x1-(0));
;},function () { return y1=j['attr']("y1");
;},function () { return y1=(y1-(0));
;},function () { return p1=(t['Vec2'])['create']((x1),(y1));
;},function () { return x2=j['attr']("x2");
;},function () { return x2=(x2-(0));
;},function () { return y2=j['attr']("y2");
;},function () { return y2=(y2-(0));
;},function () { return p2=(t['Vec2'])['create']((x2),(y2));
;},function () { return w=j['attr']("data-width");
;},function () { return w=(w-(0));
;},function () { return (t['localShape'])['add'](((t['Polygon'])['fromLine']((p1),(p2),(w))));
;}]);}));
;},function () { return this['localShape'];
;}]);});
;},function () { return this['Figure']['getLocalShape']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['localShape'];
;}]);});
;},function () { return this['Figure']['getCrashShape']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var tr;
return DtlPromise.run(this,[function () { return this['getLocalShape']()['transform']((this['dir']),(this['pos']));
;}]);});
;},function () { return this['Figure']['paint']=dtlbind(this,function(col){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var buf;
var ls;
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['polygonElem'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return buf="";
;},function () { return ls=this['element']['find']("line");
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((ls['length'])>=(2));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['setLocalShapeAsPolygon']();
;},function () { return this['localShape']['each'](dtlbind(this,function(v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return buf=((((buf+(v['x']))+",")+(v['y']))+" ");
;}]);}));
;},function () { return this['polygonElem']=this['createSVGElem']("polygon")['attr']("points",(buf))['appendTo']((this['element']));
;},function () { return ls['remove']();
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ls['attr']("style",((((("stroke:"+col)+";")+"stroke-width:")+(ls['attr']("data-width")))));
;}]);}));
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['polygonElem'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['polygonElem']['attr']("fill",(col));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['Figure']['makeGroup']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['Group']['create']((_args));
;}]);});
;}]);}).checkerror().apply(root,[]);
//# sourceMappingURL=Figure.js.map
