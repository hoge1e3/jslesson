(function(){this['Figure']=this['Actor']['create']();
this['Figure']['initialize']=dtlbind(this,function(parent){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return parent;
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
this['element']=parent['lineG'];
this['element']['remove']();
this['pos']=parent['lineOrig'];
this['dir']=(0);
return this['setLocalShapeAsLines']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
this['element']=this['createSVGElem']("g");
return this['copySVGElem']((this['element']),(this['__proto__']['element']));
}));
this['setTrans']();
return this['appear']();
});
this['Figure']['setLocalShapeAsPolygon']=dtlbind(this,function(){
var self=this;var 自分=self;
var t;
var j;
var lx;
var ly;
var ls;
t=this;
ls=this['element']['find']("line");
this['localShape']=this['Polygon']['create']();
ls['each'](dtlbind(this,function(){
var self=this;var 自分=self;
j=(t['$'])['create']((this));
lx=j['attr']("x1");
lx=(lx-(0));
ly=j['attr']("y1");
ly=(ly-(0));
return (t['localShape'])['addVertex']((lx),(ly));
}));
lx=j['attr']("x2");
lx=(lx-(0));
ly=j['attr']("y2");
ly=(ly-(0));
return this['localShape']['addVertex']((lx),(ly));
});
this['Figure']['setLocalShapeAsLines']=dtlbind(this,function(){
var self=this;var 自分=self;
var t;
var j;
var x1;
var y1;
var x2;
var y2;
var p1;
var p2;
var w;
t=this;
this['localShape']=this['ShapeGroup']['create']();
this['element']['find']("line")['each'](dtlbind(this,function(){
var self=this;var 自分=self;
j=(t['$'])['create']((this));
x1=j['attr']("x1");
x1=(x1-(0));
y1=j['attr']("y1");
y1=(y1-(0));
p1=(t['Vec2'])['create']((x1),(y1));
x2=j['attr']("x2");
x2=(x2-(0));
y2=j['attr']("y2");
y2=(y2-(0));
p2=(t['Vec2'])['create']((x2),(y2));
w=j['attr']("data-width");
w=(w-(0));
return (t['localShape'])['add'](((t['Polygon'])['fromLine']((p1),(p2),(w))));
}));
return this['localShape'];
});
this['Figure']['getLocalShape']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['localShape'];
});
this['Figure']['getCrashShape']=dtlbind(this,function(){
var self=this;var 自分=self;
var tr;
return this['getLocalShape']()['transform']((this['dir']),(this['pos']));
});
this['Figure']['paint']=dtlbind(this,function(col){
var self=this;var 自分=self;
var buf;
var ls;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['polygonElem'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return }))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
buf="";
ls=this['element']['find']("line");
return dtlbind(this,function(){
var self=this;var 自分=self;
return ((ls['length'])>=(2));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
this['setLocalShapeAsPolygon']();
this['localShape']['each'](dtlbind(this,function(v){
var self=this;var 自分=self;
return buf=((((buf+(v['x']))+",")+(v['y']))+" ");
}));
this['polygonElem']=this['createSVGElem']("polygon")['attr']("points",(buf))['appendTo']((this['element']));
return ls['remove']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return ls['attr']("style",((((("stroke:"+col)+";")+"stroke-width:")+(ls['attr']("data-width")))));
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return this['polygonElem'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['polygonElem']['attr']("fill",(col));
}));
return this;
});
return this['Figure']['makeGroup']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['Group']['create']((arguments));
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=Figure.js.map
