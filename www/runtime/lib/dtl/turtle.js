(function(){this['turtle']=this['Actor']['create']();
this['Turtle']=this['turtle'];
this['Turtle']['baseURL']=(this['window']['runtimePath']+"images/");
this['Turtle']['img']="ayumi.gif";
this['turtle']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;
this['element']=this['createSVGElem']("image");
this['element']['get']((0))['setAttributeNS']("http://www.w3.org/1999/xlink","href",((this['baseURL']+self['img'])));
this['adjustImage']();
this['element']['attr']("transform","scale(1,-1)");
this['lineColor']("black");
this['appear']();
this['newLineG']();
return this['setTrans']();
});
this['turtle']['width']=(32);
this['turtle']['height']=(32);
this['turtle']['_lineWidth']=(3);
this['turtle']['isPenDown']=this['true'];
this['turtle']['adjustImage']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['attr']("width",((this['width']+"px")))['attr']("height",((this['height']+"px")))['attr']("x",((-this['width']/(2))))['attr']("y",((-this['height']/(2))));
});
this['turtle']['getImageSize']=dtlbind(this,function(url){
var self=this;var 自分=self;
var t;
t=this;
return this['$']['create']("<img>")['css']("display","none")['load'](dtlbind(this,function(){
var self=this;var 自分=self;
var j;
j=(t['$'])['create']((this));
t['width']=j['width']();
t['height']=j['height']();
t['adjustImage']();
return j['remove']();
}))['attr']("src",(url))['appendTo']("body");
});
this['turtle']['newLineG']=dtlbind(this,function(){
var self=this;var 自分=self;
this['lineG']=this['createSVGElem']("g")['appendTo']((this['svg_g']));
this['lineG']['attr']("transform",((((("translate("+(this['pos']['x']))+" ")+(this['pos']['y']))+")")));
return this['lineOrig']=this['pos'];
});
this['turtle']['addPath']=dtlbind(this,function(pos1,pos2){
var self=this;var 自分=self;
var line;
pos1=pos1['sub']((this['lineOrig']));
pos2=pos2['sub']((this['lineOrig']));
line=this['createSVGElem']("line")['attr']("x1",(pos1['x']))['attr']("y1",(pos1['y']))['attr']("x2",(pos2['x']))['attr']("y2",(pos2['y']))['attr']("style",(((("stroke:"+this['_lineCol'])+";stroke-width:")+this['_lineWidth'])))['attr']("data-width",(this['_lineWidth']))['appendTo']((this['lineG']));
return this;
});
this['turtle']['addPathAfterAction']=dtlbind(this,function(a){
var self=this;var 自分=self;
var pos1;
pos1=this['pos'];
a['execute']();
dtlbind(this,function(){
var self=this;var 自分=self;
return this['isPenDown'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['addPath']((pos1),(this['pos']));
}));
return this;
});
this['turtle']['forward']=dtlbind(this,function(by){
var self=this;var 自分=self;
return this['addPathAfterAction'](dtlbind(this,function(){
var self=this;var 自分=self;
return (this['Actor']['forward'])['call']((this),(by));
}));
});
this['turtle']['moveTo']=dtlbind(this,function(x,y){
var self=this;var 自分=self;
return this['addPathAfterAction'](dtlbind(this,function(){
var self=this;var 自分=self;
return (this['Actor']['moveTo'])['call']((this),(x),(y));
}));
});
this['turtle']['close']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['addPath']((this['pos']),(this['lineOrig']));
});
this['turtle']['lineColor']=dtlbind(this,function(col){
var self=this;var 自分=self;
this['_lineCol']=col;
return this;
});
this['turtle']['lineWidth']=dtlbind(this,function(w){
var self=this;var 自分=self;
this['_lineWidth']=w;
return this;
});
this['turtle']['makeFigure']=dtlbind(this,function(col){
var self=this;var 自分=self;
var r;
r=this['Figure']['create']((this));
dtlbind(this,function(){
var self=this;var 自分=self;
return col;
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return r['paint']((col));
}));
this['newLineG']();
return r;
});
this['turtle']['penDown']=dtlbind(this,function(){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['isPenDown'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return }))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
this['isPenDown']=this['true'];
return this['newLineG']();
}));
return this;
});
this['turtle']['penUp']=dtlbind(this,function(){
var self=this;var 自分=self;
this['isPenDown']=this['false'];
return this;
});
this['turtle']['change']=dtlbind(this,function(url){
var self=this;var 自分=self;
self['img']=url;
url=dtlbind(this,function(){
var self=this;var 自分=self;
return url['match']("https?");
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return url;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (this['baseURL']+url);
}));
this['element']['get']((0))['setAttributeNS']("http://www.w3.org/1999/xlink","href",(url));
this['getImageSize']((url));
return this;
});
return this['turtle']['setTrans']=dtlbind(this,function(){
var self=this;var 自分=self;
var str;
str=(((("translate("+(this['pos']['x']))+" ")+(this['pos']['y']))+") ");
str=(((str+"rotate(")+this['dir'])+") ");
str=(str+"scale(1 -1) ");
this['element']['attr']("transform",(str))['attr']("data-trans",((((((this['pos']['x'])+",")+(this['pos']['y']))+",")+this['dir'])));
this['checkCrash']();
return this;
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=Turtle.js.map
