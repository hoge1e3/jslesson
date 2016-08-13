(function(){this['Screen']=this['create']();
this['Screen']['width?']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['$']['create']((this['window']))['width']();
});
this['Screen']['height?']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['$']['create']((this['window']))['height']();
});
this['Screen']['paint']=dtlbind(this,function(c){
var self=this;var 自分=self;
return this['$']['create']("body")['css']("background-color",((c+"")));
});
this['UI']=this['Actor']['create']();
this['UI']['setTrans']=dtlbind(this,function(){
var self=this;var 自分=self;
var str;
str=(((("postion:absolute;left:"+(this['pos']['x']))+";top:")+(this['pos']['y']))+";");
this['element']['attr']("transform",(str))['attr']("data-trans",((((this['pos']['x'])+",")+(this['pos']['y']))));
return this;
});
this['UI']['appear']=dtlbind(this,function(){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['show']();
}));
return this;
});
this['UI']['die']=dtlbind(this,function(){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['hide']();
}));
return this;
});
this['UI']['top']=((((this['Screen']['height?']())/(2)))-(20));
this['UI']['autoLayout']=dtlbind(this,function(){
var self=this;var 自分=self;
var o;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['last'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
this['console']['log']("autoL",(this['last']['right?']()),(this['last']['top?']()));
return this['moveTo']((this['last']['right?']()),(this['last']['top?']()));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['moveTo']((((-(this['Screen']['width?']())/(2))+(20))),(this['top']));
}));
return this['UI']['last']=this;
});
this['UI']['left?']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['element']['offset']())['left']-((this['Screen']['width?']())/(2)));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (0);
}));
});
this['UI']['right?']=dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['left?']())+(this['width?']()));
});
this['UI']['top?']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return -(((this['element']['offset']())['top']-((this['Screen']['height?']())/(2))));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (0);
}));
});
this['UI']['bottom?']=dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['top?']())-(this['height?']()));
});
this['UI']['width?']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['outerWidth']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (0);
}));
});
this['UI']['height?']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['outerHeight']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (0);
}));
});
this['UI']['nextLine']=dtlbind(this,function(){
var self=this;var 自分=self;
var top;
var left;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['last'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
this['console']['log']("NL",(this['Screen']['width?']()),(this['last']['bottom?']()));
left=((-(this['Screen']['width?']())/(2))+(20));
top=this['last']['bottom?']();
return this['moveTo']((left),(top));
}));
return this;
});
this['UI']['write']=dtlbind(this,function(m){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['text']((m));
}));
return self;
});
this['UI']['str2int']=dtlbind(this,function(s){
var self=this;var 自分=self;
var r;
r=this['window']['parseFloat']((s));
return dtlbind(this,function(){
var self=this;var 自分=self;
return (r===r);
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return r;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return s;
}));
});
this['UI']['readString']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['text']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return "";
}));
});
this['UI']['read']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['str2int']((this['readString']()));
});
this['UI']['inc']=dtlbind(this,function(by){
var self=this;var 自分=self;
by=dtlbind(this,function(){
var self=this;var 自分=self;
return by;
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (1);
}));
return this['write'](((((this['read']())-(0))+by)));
});
this['UI']['dec']=dtlbind(this,function(by){
var self=this;var 自分=self;
by=dtlbind(this,function(){
var self=this;var 自分=self;
return by;
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (1);
}));
return this['write']((((this['read']())-by)));
});
this['UI']['moveBy']=dtlbind(this,function(x,y){
var self=this;var 自分=self;
var oldx;
var oldy;
oldx=(self['element']['get']((0)))['offsetLeft'];
oldy=(self['element']['get']((0)))['offsetTop'];
self['position'](((oldx+x)),((oldy-y)));
return self;
});
this['UI']['moveTo']=dtlbind(this,function(x,y){
var self=this;var 自分=self;
var w;
var h;
w=(0);
h=(0);
self['element']['css']("top",((((h-y))+"px")))['css']("left",((((w+x))+"px")));
return self;
});
this['UI']['container']=this['$']['create']("<div>")['appendTo']("body")['css']("position","absolute")['css']("left",(((this['Screen']['width?']())/(2))))['css']("top",(((this['Screen']['height?']())/(2))));
this['$']['create']((this['window']))['resize']((dtlbind(this,function(){
var self=this;var 自分=self;
return this['UI']['container']['css']("left",(((this['Screen']['width?']())/(2))))['css']("top",(((this['Screen']['height?']())/(2))));
})['bind']((this))));
this['Label']=this['UI']['create']();
this['Label']['left']=(0);
this['Label']['initialize']=dtlbind(this,function(label){
var self=this;var 自分=self;
var t;
t=this;
dtlbind(this,function(){
var self=this;var 自分=self;
return (label===this['undef']);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return label=this['read']();
}));
this['element']=this['$']['create']("<div>")['text'](((label+"")))['css']("position","absolute")['css']("font-size","1.0em")['appendTo']((this['container']));
return this['autoLayout']();
});
this['Label']['fontColor']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;
var args;
var c;
args=root['window']['Array']['prototype']['slice']['call']((arguments));
dtlbind(this,function(){
var self=this;var 自分=self;
return (args['length']===(1));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=r;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=this['Color']['create']((r),(g),(b));
}));
self['element']['css']("color",(c));
return self;
});
this['Label']['fontSize']=dtlbind(this,function(s){
var self=this;var 自分=self;
self['element']['css']("font-size",(((s/(10))+"em")));
return self;
});
this['Button']=this['UI']['create']();
this['Button']['action']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
this['Button']['left']=(0);
this['Button']['initialize']=dtlbind(this,function(label,key){
var self=this;var 自分=self;
var t;
t=this;
dtlbind(this,function(){
var self=this;var 自分=self;
return (label===this['undef']);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return label=this['read']();
}));
this['element']=this['$']['create']("<button>")['text']((label))['css']("position","absolute")['click'](dtlbind(this,function(){
var self=this;var 自分=self;
return t['action']();
}))['appendTo']((this['container']));
this['autoLayout']();
this['element']['css']("font-size","1.0em")['css']("border-style","none");
return root['window']['$'](dtlbind(this,function(){
var self=this;var 自分=self;
return root['window']['document']['addEventListener']("keydown",dtlbind(this,function(k){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return (k['keyCode']===(root['Button']['toKeyCode']((key))));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return t['action']();
}));
}),(root['true']));
}));
});
this['Button']['paint']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;
var args;
var c;
args=root['window']['Array']['prototype']['slice']['call']((arguments));
dtlbind(this,function(){
var self=this;var 自分=self;
return (args['length']===(1));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=r;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=this['Color']['create']((r),(g),(b));
}));
self['element']['css']("background-color",(c));
return self;
});
this['Button']['fontColor']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;
var args;
var c;
args=root['window']['Array']['prototype']['slice']['call']((arguments));
dtlbind(this,function(){
var self=this;var 自分=self;
return (args['length']===(1));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=r;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=this['Color']['create']((r),(g),(b));
}));
self['element']['css']("color",(c));
return self;
});
this['Button']['fontSize']=dtlbind(this,function(s){
var self=this;var 自分=self;
self['element']['css']("font-size",(((s/(10))+"em")));
return self;
});
this['Button']['size']=dtlbind(this,function(w,h){
var self=this;var 自分=self;
self['element']['css']("width",((w+"px")))['css']("height",((h+"px")));
return self;
});
this['Button']['toKeyCode']=dtlbind(this,function(k){
var self=this;var 自分=self;
k=((k+""))['toUpperCase']();
return dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="LEFT");
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return (37);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="UP");
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return (38);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="RIGHT");
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return (39);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="DOWN");
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return (40);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="SPACE");
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (32);
}));
});
this['Button']['inc']=dtlbind(this,function(){
var self=this;var 自分=self;
var label;
label=(self['element']['get']((0)))['innerHTML'];
dtlbind(this,function(){
var self=this;var 自分=self;
return label['match']((root['window']['RegExp']("^([0-9０-９]+)$")));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return self['element']['text']((((root['window']['parseInt']((label)))+(1))));
}));
return self;
});
this['Field']=this['UI']['create']();
this['Field']['initialize']=dtlbind(this,function(label){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return (label===this['undef']);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return label=this['read']();
}));
this['element']=this['$']['create']("<input>")['val']((label))['css']("position","absolute")['appendTo']((this['container']));
return this['autoLayout']();
});
this['Field']['write']=dtlbind(this,function(m){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['val']((m));
}));
return self;
});
return this['Field']['readString']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['val']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return "";
}));
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=UI.js.map
