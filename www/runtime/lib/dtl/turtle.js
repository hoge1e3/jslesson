(function(){this['turtle']=this['Actor']['create']();
this['Turtle']=this['turtle'];
this['Turtle']['baseURL']=(this['window']['runtimePath']+"images/");
this['Turtle']['img']="ayumi.gif";
this['turtle']['action']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
this['turtle']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;
var t;
t=this;
this['element']=this['createSVGElem']("image");
this['element']['get']((0))['setAttributeNS']("http://www.w3.org/1999/xlink","href",((this['baseURL']+this['img'])));
this['adjustImage']();
this['getImageSize'](((this['baseURL']+this['img'])));
this['element']['attr']("transform","scale(1,-1)");
this['element']['click'](dtlbind(this,function(){
var self=this;var 自分=self;
return t['action']();
}));
this['lineColor']("black");
this['newLineG']();
this['isShowing']=this['false'];
return this['appear']();
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
this['turtle']['circle']=dtlbind(this,function(r){
var self=this;var 自分=self;
var d;
d=(r*(0.1745328));
this['backward'](((d/(2))));
dtlbind(this,function(){
var self=this;var 自分=self;
return this['forward']((d))['rightTurn']((10));
})['repeat']((36));
return this['forward'](((d/(2))));
});
this['turtle']['closePath']=dtlbind(this,function(){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['isPenDown'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['moveTo']((this['lineOrig']['x']),(this['lineOrig']['y']));
}));
return this;
});
this['turtle']['addAlias']("closePath","close");
this['turtle']['lineColor']=dtlbind(this,function(col){
var self=this;var 自分=self;
this['_lineCol']=col;
return this;
});
this['turtle']['lineWidth']=dtlbind(this,function(w){
var self=this;var 自分=self;
w=this['num']((w));
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
this['turtle']['paint']=dtlbind(this,function(col){
var self=this;var 自分=self;
return this['makeFigure']((col));
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
this['turtle']['setShape']=dtlbind(this,function(url){
var self=this;var 自分=self;
this['img']=url;
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
this['turtle']['addAlias']("setShape","change");
this['turtle']['setTrans']=dtlbind(this,function(){
var self=this;var 自分=self;
var str;
str=(((("translate("+(this['pos']['x']))+" ")+(this['pos']['y']))+") ");
str=(((str+"rotate(")+this['dir'])+") ");
str=(((((str+"scale(")+this['_scale'])+" ")+(((0)-this['_scale'])))+") ");
this['element']['attr']("transform",(str))['attr']("data-trans",((((((this['pos']['x'])+",")+(this['pos']['y']))+",")+this['dir'])));
dtlbind(this,function(){
var self=this;var 自分=self;
return this['isShowing'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['checkCrash']();
}));
return this;
});
root['action']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
root['action']['isEventHandler']=this['true'];
root['click']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
root['click']['isEventHandler']=this['true'];
return this['turtle']['setAction']=dtlbind(this,function(f){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['typeof']((f)))==="function");
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['action']=f;
}));
return this;
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=Turtle.js.map
