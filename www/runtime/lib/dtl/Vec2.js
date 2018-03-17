root.system.run(function(){this['Vec2']=this['create']();
this['Vec2']['initialize']=dtlbind(this,function(x,y){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['x']=x;
return this['y']=y;
});
this['Vec2']['add']=dtlbind(this,function(o){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['Vec2']['create'](((this['x']+o['x'])),((this['y']+o['y'])));
});
this['Vec2']['sub']=dtlbind(this,function(o){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['Vec2']['create'](((this['x']-o['x'])),((this['y']-o['y'])));
});
this['Vec2'];
this['mul']=dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['Vec2']['create'](((k*this['x'])),((k*this['y'])));
});
this['Vec2'];
this['div']=dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['Vec2']['create'](((this['x']/k)),((this['y']/k)));
});
this['Vec2']['len']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['window']['Math'])['sqrt']((((this['x']*this['x'])+(this['y']*this['y']))));
});
this['Vec2']['dir']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['window']['Math'])['atan2']((this['y']),(this['x']))['degree']();
});
this['Vec2']['rotate']=dtlbind(this,function(d){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var vx;
var vy;
vx=this['Vec2']['create']((d['cos']()),(d['sin']()));
vy=this['Vec2']['create']((((d+(90)))['cos']()),(((d+(90)))['sin']()));
return vx['mul']((this['x']))['add']((vy['mul']((this['y']))));
});
this['Vec2']['O']=this['Vec2']['create']((0),(0));
this['Vec2']['X']=this['Vec2']['create']((1),(0));
this['Vec2']['Y']=this['Vec2']['create']((0),(1));
this['Shape']=this['create']();
this['Shape']['isIdentityTransform']=dtlbind(this,function(dir,pos){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (dir===(0));
})['and'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
pos;
return (this['x']===(0));
}),dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
pos;
return (this['y']===(0));
}));
});
this['Polygon']=this['Shape']['create']();
this['Polygon']['initialize']=dtlbind(this,function(v2ary){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['v2ary']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return v2ary;
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return v2ary;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['Array']['create']();
}));
});
this['Polygon']['fromPolyKArray']=dtlbind(this,function(a){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var x;
var y;
var res;
res=this['Polygon']['create']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return a['length']();
})['while']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
x=a['shift']();
y=a['shift']();
return res['addVertex']((x),(y));
}));
return res;
});
this['Polygon']['originPoint']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['and']['true'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['v2ary'];
}),dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['v2ary']['length?']())>(0));
}))['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['v2ary']['get']((1));
}));
});
this['Polygon']['lastPoint']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['and']['true'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['v2ary'];
}),dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['v2ary']['length?']())>(0));
}))['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['v2ary']['get']((this['v2ary']['length?']()));
}));
});
this['Polygon']['isPathClosed']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var o;
var l;
o=this['originPoint']();
l=this['lastPoint']();
return this['and']['true'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return o;
}),dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return l;
}),dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((o['sub']((l))['len']())<(0.1));
}));
});
this['Polygon']['addVertex']=dtlbind(this,function(x,y){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['v2ary']['push']((this['Vec2']['create']((x),(y))));
return this;
});
this['Polygon']['addPoint']=this['Polygon']['addVertex'];
this['Polygon']['toPolyKArray']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var res;
res=this['Array']['create']();
this['v2ary']['forEach'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
res['push']((e['x']));
return res['push']((e['y']));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['isPathClosed']();
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
res['pop']();
return res['pop']();
}));
return (this['window']['PolyK'])['FixDirection']((res));
});
this['Polygon']['transform']=dtlbind(this,function(deg,pos){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var res;
return this['Polygon']['create']((this['v2ary']['map'](dtlbind(this,function(v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return v['rotate']((deg))['add']((pos));
}))));
});
this['Polygon']['each']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['v2ary']['forEach'](dtlbind(this,function(v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return f['execute']((v));
}));
});
this['Polygon']['pointCount']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['v2ary']['length'];
});
this['Polygon']['center']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var p;
p=this['Vec2']['O'];
this['each'](dtlbind(this,function(v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return p=p['add']((v));
}));
return p['div']((this['pointCount']()));
});
this['Polygon']['fromLine']=dtlbind(this,function(pos1,pos2,width){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
var p;
var d;
var l;
p=pos2['sub']((pos1));
d=p['dir']();
l=p['len']();
return this['create']()['addPoint']((0),-((width/(2))))['addPoint']((l),-((width/(2))))['addPoint']((l),((width/(2))))['addPoint']((0),((width/(2))))['transform']((d),(pos1));
});
this['Polygon']['intersects']=dtlbind(this,function(o){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return o['is']((this['Polygon']));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['window']['PolyK'])['Intersects']((this['toPolyKArray']()),(o['toPolyKArray']()));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return o['intersects']((this));
}));
});
this['ShapeGroup']=this['Shape']['create']();
this['ShapeGroup']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['shapes']=this['Array']['create']();
});
this['ShapeGroup']['add']=dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['shapes']['push']((s));
});
this['ShapeGroup']['intersects']=dtlbind(this,function(b){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var res;
var a;
a=this;
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return b['is']((this['ShapeGroup']));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (a['shapes'])['each'](dtlbind(this,function(ae){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return (b['shapes'])['each'](dtlbind(this,function(be){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ae['intersects']((be));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return res=this['true'];
}));
}));
}));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (a['shapes'])['each'](dtlbind(this,function(ae){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ae['intersects']((b));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return res=this['true'];
}));
}));
}));
return res;
});
this['ShapeGroup']['transform']=dtlbind(this,function(dir,pos){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var res;
res=this['ShapeGroup']['create']();
this['shapes']['forEach'](dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return res['add']((s['transform']((dir),(pos))));
}));
return res;
});
return this['ShapeGroup']['center']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var p;
p=this['Vec2']['O'];
this['shapes']['each'](dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return p=p['add']((s['center']()));
}));
return p['div']((this['shapes']['length']));
});
});
//# sourceMappingURL=Vec2.js.map
