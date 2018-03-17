root.system.run(function(){this['Group']=(this['Actor']['group'])['create']();
return this['Group']['initialize']=dtlbind(this,function(_members){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _members;
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['members']=this['Array']['create']();
_members=(this['Array']['prototype']['slice'])['call']((_members));
this['pos']=this['Vec2']['O'];
_members['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['pos']=this['pos']['add']((m['getCrashShape']()['center']()));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _members['length'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['pos']=this['pos']['div']((_members['length']));
}));
this['element']=this['createSVGElem']("g");
_members['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
m['pos']=m['pos']['sub']((this['pos']));
(m['group'])['remove']((m));
this['add']((m));
return m['setTrans']();
}));
return this['appear']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['element']=this['createSVGElem']("g");
_members=this['members'];
this['members']=this['Array']['create']();
_members['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var mc;
mc=m['create']();
(mc['group'])['remove']((mc));
this['add']((mc));
return mc['setTrans']();
}));
return this['appear']();
}));
});
});
//# sourceMappingURL=Group.js.map
