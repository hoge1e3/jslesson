(function(){this['UI']=this['Actor']['create']();
this['UI']['setTrans']=dtlbind(this,function(){
var self=this;var 自分=self;
var str;
str=(((("postion:absolute;left:"+(this['pos']['x']))+";top:")+(this['pos']['y']))+";");
this['element']['attr']("transform",(str))['attr']("data-trans",((((this['pos']['x'])+",")+(this['pos']['y']))));
return this;
});
this['UI']['autoLayout']=dtlbind(this,function(){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['last'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['css']("left",(((this['last']['offset']())['left']+(this['last']['outerWidth']()))));
}));
return this['UI']['last']=this['element'];
});
this['Label']=this['UI']['create']();
this['Label']['left']=(0);
this['Label']['initialize']=dtlbind(this,function(label){
var self=this;var 自分=self;
var t;
t=this;
this['element']=this['$']['create']("<div>")['text'](((label+"")))['css']("position","absolute")['css']("font-size","1.0em")['appendTo']("body");
return this['autoLayout']();
});
this['Label']['write']=dtlbind(this,function(m){
var self=this;var 自分=self;
this['element']['text']((m));
return self;
});
this['Label']['inc']=dtlbind(this,function(by){
var self=this;var 自分=self;
by=dtlbind(this,function(){
var self=this;var 自分=self;
return by;
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (1);
}));
this['element']['text'](((((this['element']['text']())-(0))+by)));
return self;
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
this['Label']['moveTo']=dtlbind(this,function(x,y){
var self=this;var 自分=self;
var oldx;
var oldy;
oldx=(self['element']['get']((0)))['offsetLeft'];
oldy=(self['element']['get']((0)))['offsetTop'];
self['position'](((oldx+x)),((oldy-y)));
return self;
});
this['Label']['position']=dtlbind(this,function(x,y){
var self=this;var 自分=self;
var w;
var h;
w=((root['window']['$']("#canvas"))['context']['documentElement']['clientWidth']/(2));
h=((root['window']['$']("#canvas"))['context']['documentElement']['clientHeight']/(2));
self['element']['css']("top",((((h-y))+"px")))['css']("left",((((w+x))+"px")));
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
this['element']=this['$']['create']("<button>")['text']((label))['css']("position","absolute")['click'](dtlbind(this,function(){
var self=this;var 自分=self;
return t['action']();
}))['appendTo']("body");
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
this['Button']['width?']=dtlbind(this,function(){
var self=this;var 自分=self;
return (self['element']['get']((0)))['offsetWidth'];
});
this['Button']['height?']=dtlbind(this,function(){
var self=this;var 自分=self;
return (self['element']['get']((0)))['offsetHeight'];
});
this['Button']['size']=dtlbind(this,function(w,h){
var self=this;var 自分=self;
self['element']['css']("width",((w+"px")))['css']("height",((h+"px")));
return self;
});
this['Button']['position']=dtlbind(this,function(x,y){
var self=this;var 自分=self;
var w;
var h;
w=((root['window']['$']("#canvas"))['context']['documentElement']['clientWidth']/(2));
h=((root['window']['$']("#canvas"))['context']['documentElement']['clientHeight']/(2));
self['element']['css']("top",((((h-y))+"px")))['css']("left",((((w+x))+"px")));
return self;
});
this['Button']['moveTo']=dtlbind(this,function(x,y){
var self=this;var 自分=self;
var oldx;
var oldy;
oldx=(self['element']['get']((0)))['offsetLeft'];
oldy=(self['element']['get']((0)))['offsetTop'];
self['position'](((oldx+x)),((oldy-y)));
return self;
});
this['Button']['toKeyCode']=dtlbind(this,function(k){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="LEFT");
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="Left");
}),dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="left");
}));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return (37);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="UP");
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="Up");
}),dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="up");
}));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return (38);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="RIGHT");
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="Right");
}),dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="right");
}));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return (39);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="DOWM");
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="Down");
}),dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="down");
}));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return (40);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="SPACE");
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="Space");
}),dtlbind(this,function(){
var self=this;var 自分=self;
return (k==="space");
}));
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
this['element']=this['$']['create']("<input>")['val']((label))['css']("position","absolute")['appendTo']("body");
return this['autoLayout']();
});
this['Field']['inc']=dtlbind(this,function(by){
var self=this;var 自分=self;
by=dtlbind(this,function(){
var self=this;var 自分=self;
return by;
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (1);
}));
return this['element']['val'](((((this['element']['val']())-(0))+by)));
});
this['Screen']=this['create']();
this['Screen']['width?']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['$']['create']((this['window']))['width']();
});
this['Screen']['height?']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['$']['create']((this['window']))['height']();
});
return this['Screen']['paint']=dtlbind(this,function(c){
var self=this;var 自分=self;
return this['$']['create']("body")['attr']("bgcolor",(c));
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=UI.js.map
