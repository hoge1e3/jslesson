(function(){this['Group']=(this['Actor']['group'])['create']();
return this['Group']['initialize']=dtlbind(this,function(_members){
var self=this;var 自分=self;
this['members']=this['Array']['create']();
_members=(this['Array']['prototype']['slice'])['call']((_members));
this['pos']=this['Vec2']['O'];
_members['each'](dtlbind(this,function(m){
var self=this;var 自分=self;
return this['pos']=this['pos']['add']((m['getCrashShape']()['center']()));
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return _members['length'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['pos']=this['pos']['div']((_members['length']));
}));
this['element']=this['createSVGElem']("g");
_members['each'](dtlbind(this,function(m){
var self=this;var 自分=self;
m['pos']=m['pos']['sub']((this['pos']));
(m['group'])['remove']((m));
this['add']((m));
return m['setTrans']();
}));
this['appear']();
return this['setTrans']();
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=Group.js.map
