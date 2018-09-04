root.system.run(function(){this['$']=this['create']();
this['$']['create']=dtlbind(this,function(tag){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return (this['window']['$'])['call']((this['root']),(tag));
});
this['Actor']=this['create']();
this['Actor']['pos']=this['Vec2']['O'];
this['Actor']['dir']=(0);
this['Actor']['num']=dtlbind(this,function(x){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return x;
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return x;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (0);
}));
});
this['Actor']['createSVGElem']=dtlbind(this,function(tag){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['$']['create']((this['document']['createElementNS']("http://www.w3.org/2000/svg",(tag))));
});
this['Actor']['copySVGElem']=dtlbind(this,function(dst,src){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var t;
var n;
var a;
var s;
src=this['$']['create']((src));
dst=this['$']['create']((dst));
t=this;
return src['children']()['each'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
s=this;
n=t['createSVGElem']((s['tagName']))['get']((0));
a=(t['Array']['prototype']['slice'])['call']((s['attributes']));
a['each'](dtlbind(this,function(an){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
an=an['name'];
return n['setAttribute']((an),(s['getAttribute']((an))));
}));
dst['append']((n));
return t['copySVGElem']((n),(s));
}));
});
this['Actor']['show']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['group']['add']((this));
this['setTrans']();
this['isShowing']=this['true'];
return this;
});
this['Actor']['hide']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var i;
this['group']['remove']((this));
this['isShowing']=this['false'];
return this;
});
this['Actor']['addAlias']("show","appear")['addAlias']("hide","die");
this['Actor']['group']=this['Actor']['create']();
this['Actor']['group']['members']=this['Array']['create']();
this['Actor']['group']['remove']=dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var i;
i=this['members']['indexOf']((m));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i>=(0));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['members']['splice']((i),((1)));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return m['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return m['element']['remove']();
}));
});
this['Actor']['group']['add']=dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var i;
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return m['getCrashShape'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return }))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['system']['throw']((("NO"+m)));
}));
i=this['members']['indexOf']((m));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i<(0));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['members']['push']((m));
return this['element']['append']((m['element']));
}));
});
this['Actor']['initSVG']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
var wndj;
var svgw;
var svgh;
this['svg']=this['$']['create']("svg");
this['console']['log']("SVG",(this['svg']));
wndj=this['$']['create']((this['window']));
svgw=((wndj['width']())-(10));
svgh=((wndj['height']())-(10));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (svgh<=(0));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return svgh=((svgw/(16))*(9));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['svg']['length']===(0));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['svg']=this['createSVGElem']("svg")['attr']("id","turtle_svg")['attr']("width",(svgw))['attr']("height",(svgh))['css']("position","absolute")['appendTo']("body");
}));
this['svg_g']=this['svg']['find']("g");
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['svg_g']['length']===(0));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['svg_g']=this['createSVGElem']("g")['attr']("transform",((((("translate("+((svgw/(2))))+",")+((svgh/(2))))+") scale(1,-1)")))['appendTo']((this['svg']));
}));
t=this;
wndj['resize'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
svgw=((wndj['width']())-(10));
svgh=((wndj['height']())-(10));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (svgh<=(0));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return svgh=((svgw/(16))*(9));
}));
(t['svg'])['attr']("width",(svgw))['attr']("height",(svgh));
return (t['svg_g'])['attr']("transform",((((("translate("+((svgw/(2))))+",")+((svgh/(2))))+") scale(1,-1)")));
}));
return this['group']['element']=this['svg_g'];
});
this['Actor']['initSVG']();
this['Actor']['forward']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
by=this['num']((by));
this['_lastPos']=this['pos'];
this['_lastStep']=by;
this['pos']=this['pos']['add'](((this['Vec2']['X'])['rotate']((this['dir']))['mul']((by))));
this['setTrans']();
return this;
});
this['Actor']['backward']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
by=this['num']((by));
return this['forward']((-by));
});
this['Actor']['turnLeft']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
by=this['num']((by));
this['dir']=(this['dir']+by);
this['setTrans']();
return this;
});
this['Actor']['turnRight']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
by=this['num']((by));
return this['turnLeft']((-by));
});
this['Actor']['leftTurn']=this['Actor']['turnLeft'];
this['Actor']['rightTurn']=this['Actor']['turnRight'];
this['Actor']['getCrashShape']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['Polygon']['create']()['addVertex'](((-this['width']/(2))),((-this['height']/(2))))['addVertex'](((this['width']/(2))),((-this['height']/(2))))['addVertex'](((this['width']/(2))),((this['height']/(2))))['addVertex'](((-this['width']/(2))),((this['height']/(2))))['transform']((this['dir']),(this['pos']));
});
this['Actor']['crashTo']=dtlbind(this,function(o){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return o['getCrashShape'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return }))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['system']['throw']((("NO"+o)));
}));
return (this['getCrashShape']())['intersects']((o['getCrashShape']()));
});
this['Actor']['_scale']=(1);
this['Actor']['setTrans']=dtlbind(this,function(str){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
str=(((("translate("+(this['pos']['x']))+" ")+(this['pos']['y']))+") ");
str=(((str+"rotate(")+this['dir'])+") ");
str=(((((str+"scale(")+this['_scale'])+" ")+this['_scale'])+") ");
this['element']['attr']("transform",(str))['attr']("data-trans",((((((this['pos']['x'])+",")+(this['pos']['y']))+",")+this['dir'])));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['isShowing'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['checkCrash']();
}));
return this;
});
this['Actor']['scale']=dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['_scale']=(this['_scale']*s);
return this['setTrans']();
});
this['Actor']['moveTo']=dtlbind(this,function(dx,dy){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dx=this['num']((dx));
dy=this['num']((dy));
this['pos']=this['Vec2']['create']((dx),(dy));
return this['setTrans']();
});
this['Actor']['moveToCenter']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['moveTo']((0),(0));
});
this['Actor']['addAlias']("moveToCenter","moveCenter");
this['Actor']['moveBy']=dtlbind(this,function(dx,dy){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dx=this['num']((dx));
dy=this['num']((dy));
return this['moveTo'](((this['pos']['x']+dx)),((this['pos']['y']+dy)));
});
this['Actor']['setDir']=dtlbind(this,function(d){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['dir']=this['num']((d));
return this['setTrans']();
});
this['Actor']['addAlias']("setDir","direction");
this['Actor']['getDir']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['dir'];
});
this['Actor']['addAlias']("getDir","direction?");
root['collision']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return });
root['collision']['isEventHandler']=this['true'];
this['Actor']['checkCrash']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['Actor']['_doingCheckCrash'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return }))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['Actor']['_doingCheckCrash']=(1);
this['allCrash']()['each'](dtlbind(this,function(a){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['collision']((a));
return a['collision']((this));
}));
return this['Actor']['_doingCheckCrash']=(0);
}));
});
this['Actor']['allCrash']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
var res;
res=this['Array']['create']();
(this['group']['members'])['each'](dtlbind(this,function(a){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this!==a);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['crashTo']((a));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return res['push']((a));
}));
}));
}));
return res;
});
this['Actor']['bounce']=dtlbind(this,function(_hitTarget){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var lp;
var ld;
var stp;
var a;
lp=this['_lastPos'];
ld=this['dir'];
stp=lp['sub']((this['pos']))['len']();
this['pos']=lp;
a=((2)*((this['dir']-(_hitTarget['getDir']()))));
this['turnRight']((a));
this['forward']((stp));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['allCrash']())['length'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['pos']=lp;
this['dir']=ld;
this['turnLeft']((((180)-a)));
this['forward']((stp));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['allCrash']())['length'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['pos']=lp;
this['dir']=ld;
return this['turnLeft']((180));
}));
}));
return this;
});
this['Actor']['xpos?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['pos']['x'];
});
return this['Actor']['ypos?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['pos']['y'];
});
});
//# sourceMappingURL=Actor.js.map
