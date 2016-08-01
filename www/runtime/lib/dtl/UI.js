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
this['Button']=this['UI']['create']();
this['Button']['action']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
this['Button']['left']=(0);
this['Button']['initialize']=dtlbind(this,function(label){
var self=this;var 自分=self;
var t;
t=this;
this['element']=this['$']['create']("<button>")['text']((label))['css']("position","absolute")['click'](dtlbind(this,function(){
var self=this;var 自分=self;
return t['action']();
}))['appendTo']("body");
return this['autoLayout']();
});
this['Field']=this['UI']['create']();
this['Field']['initialize']=dtlbind(this,function(label){
var self=this;var 自分=self;
this['element']=this['$']['create']("<input>")['val']((label))['css']("position","absolute")['appendTo']("body");
return this['autoLayout']();
});
return this['Field']['inc']=dtlbind(this,function(by){
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
}).checkerror().apply(root,[]);
//# sourceMappingURL=UI.js.map
