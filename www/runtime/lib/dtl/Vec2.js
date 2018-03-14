(function(){return DtlPromise.run(this,[function () { return this['Vec2']=this['create']();
;},function () { return this['Vec2']['initialize']=dtlbind(this,function(x,y){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return this['x']=x;
;},function () { return this['y']=y;
;}]);});
;},function () { return this['Vec2']['add']=dtlbind(this,function(o){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['Vec2']['create'](((this['x']+o['x'])),((this['y']+o['y'])));
;}]);});
;},function () { return this['Vec2']['sub']=dtlbind(this,function(o){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['Vec2']['create'](((this['x']-o['x'])),((this['y']-o['y'])));
;}]);});
;},function () { return this['Vec2'];
;},function () { return this['mul']=dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['Vec2']['create'](((k*this['x'])),((k*this['y'])));
;}]);});
;},function () { return this['Vec2'];
;},function () { return this['div']=dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['Vec2']['create'](((this['x']/k)),((this['y']/k)));
;}]);});
;},function () { return this['Vec2']['len']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['window']['Math'])['sqrt']((((this['x']*this['x'])+(this['y']*this['y']))));
;}]);});
;},function () { return this['Vec2']['dir']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['window']['Math'])['atan2']((this['y']),(this['x']))['degree']();
;}]);});
;},function () { return this['Vec2']['rotate']=dtlbind(this,function(d){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var vx;
var vy;
return DtlPromise.run(this,[function () { return vx=this['Vec2']['create']((d['cos']()),(d['sin']()));
;},function () { return vy=this['Vec2']['create']((((d+(90)))['cos']()),(((d+(90)))['sin']()));
;},function () { return vx['mul']((this['x']))['add']((vy['mul']((this['y']))));
;}]);});
;},function () { return this['Vec2']['O']=this['Vec2']['create']((0),(0));
;},function () { return this['Vec2']['X']=this['Vec2']['create']((1),(0));
;},function () { return this['Vec2']['Y']=this['Vec2']['create']((0),(1));
;},function () { return this['Shape']=this['create']();
;},function () { return this['Shape']['isIdentityTransform']=dtlbind(this,function(dir,pos){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (dir===(0));
;}]);})['and'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return pos;
;},function () { return (this['x']===(0));
;}]);}),dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return pos;
;},function () { return (this['y']===(0));
;}]);}));
;}]);});
;},function () { return this['Polygon']=this['Shape']['create']();
;},function () { return this['Polygon']['initialize']=dtlbind(this,function(v2ary){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['v2ary']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return v2ary;
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return v2ary;
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['Array']['create']();
;}]);}));
;}]);});
;},function () { return this['Polygon']['fromPolyKArray']=dtlbind(this,function(a){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var x;
var y;
var res;
return DtlPromise.run(this,[function () { return res=this['Polygon']['create']();
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return a['length']();
;}]);})['while']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return x=a['shift']();
;},function () { return y=a['shift']();
;},function () { return res['addVertex']((x),(y));
;}]);}));
;},function () { return res;
;}]);});
;},function () { return this['Polygon']['originPoint']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['and']['true'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['v2ary'];
;}]);}),dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((this['v2ary']['length?']())>(0));
;}]);}))['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['v2ary']['get']((1));
;}]);}));
;}]);});
;},function () { return this['Polygon']['lastPoint']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['and']['true'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['v2ary'];
;}]);}),dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((this['v2ary']['length?']())>(0));
;}]);}))['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['v2ary']['get']((this['v2ary']['length?']()));
;}]);}));
;}]);});
;},function () { return this['Polygon']['isPathClosed']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var o;
var l;
return DtlPromise.run(this,[function () { return o=this['originPoint']();
;},function () { return l=this['lastPoint']();
;},function () { return this['and']['true'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return o;
;}]);}),dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return l;
;}]);}),dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((o['sub']((l))['len']())<(0.1));
;}]);}));
;}]);});
;},function () { return this['Polygon']['addVertex']=dtlbind(this,function(x,y){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return this['v2ary']['push']((this['Vec2']['create']((x),(y))));
;},function () { return this;
;}]);});
;},function () { return this['Polygon']['addPoint']=this['Polygon']['addVertex'];
;},function () { return this['Polygon']['toPolyKArray']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var res;
return DtlPromise.run(this,[function () { return res=this['Array']['create']();
;},function () { return this['v2ary']['forEach'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return res['push']((e['x']));
;},function () { return res['push']((e['y']));
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['isPathClosed']();
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return res['pop']();
;},function () { return res['pop']();
;}]);}));
;},function () { return (this['window']['PolyK'])['FixDirection']((res));
;}]);});
;},function () { return this['Polygon']['transform']=dtlbind(this,function(deg,pos){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var res;
return DtlPromise.run(this,[function () { return this['Polygon']['create']((this['v2ary']['map'](dtlbind(this,function(v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return v['rotate']((deg))['add']((pos));
;}]);}))));
;}]);});
;},function () { return this['Polygon']['each']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['v2ary']['forEach'](dtlbind(this,function(v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return f['execute']((v));
;}]);}));
;}]);});
;},function () { return this['Polygon']['pointCount']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['v2ary']['length'];
;}]);});
;},function () { return this['Polygon']['center']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var p;
return DtlPromise.run(this,[function () { return p=this['Vec2']['O'];
;},function () { return this['each'](dtlbind(this,function(v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return p=p['add']((v));
;}]);}));
;},function () { return p['div']((this['pointCount']()));
;}]);});
;},function () { return this['Polygon']['fromLine']=dtlbind(this,function(pos1,pos2,width){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
var p;
var d;
var l;
return DtlPromise.run(this,[function () { return p=pos2['sub']((pos1));
;},function () { return d=p['dir']();
;},function () { return l=p['len']();
;},function () { return this['create']()['addPoint']((0),-((width/(2))))['addPoint']((l),-((width/(2))))['addPoint']((l),((width/(2))))['addPoint']((0),((width/(2))))['transform']((d),(pos1));
;}]);});
;},function () { return this['Polygon']['intersects']=dtlbind(this,function(o){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return o['is']((this['Polygon']));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['window']['PolyK'])['Intersects']((this['toPolyKArray']()),(o['toPolyKArray']()));
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return o['intersects']((this));
;}]);}));
;}]);});
;},function () { return this['ShapeGroup']=this['Shape']['create']();
;},function () { return this['ShapeGroup']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['shapes']=this['Array']['create']();
;}]);});
;},function () { return this['ShapeGroup']['add']=dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['shapes']['push']((s));
;}]);});
;},function () { return this['ShapeGroup']['intersects']=dtlbind(this,function(b){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var res;
var a;
return DtlPromise.run(this,[function () { return a=this;
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return b['is']((this['ShapeGroup']));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (a['shapes'])['each'](dtlbind(this,function(ae){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return (b['shapes'])['each'](dtlbind(this,function(be){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ae['intersects']((be));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return res=this['true'];
;}]);}));
;}]);}));
;}]);}));
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (a['shapes'])['each'](dtlbind(this,function(ae){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ae['intersects']((b));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return res=this['true'];
;}]);}));
;}]);}));
;}]);}));
;},function () { return res;
;}]);});
;},function () { return this['ShapeGroup']['transform']=dtlbind(this,function(dir,pos){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var res;
return DtlPromise.run(this,[function () { return res=this['ShapeGroup']['create']();
;},function () { return this['shapes']['forEach'](dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return res['add']((s['transform']((dir),(pos))));
;}]);}));
;},function () { return res;
;}]);});
;},function () { return this['ShapeGroup']['center']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var p;
return DtlPromise.run(this,[function () { return p=this['Vec2']['O'];
;},function () { return this['shapes']['each'](dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return p=p['add']((s['center']()));
;}]);}));
;},function () { return p['div']((this['shapes']['length']));
;}]);});
;}]);}).checkerror().apply(root,[]);
//# sourceMappingURL=Vec2.js.map
