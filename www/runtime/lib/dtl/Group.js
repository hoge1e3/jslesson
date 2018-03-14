(function(){return DtlPromise.run(this,[function () { return this['Group']=(this['Actor']['group'])['create']();
;},function () { return this['Group']['initialize']=dtlbind(this,function(_members){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return _members;
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['members']=this['Array']['create']();
;},function () { return _members=(this['Array']['prototype']['slice'])['call']((_members));
;},function () { return this['pos']=this['Vec2']['O'];
;},function () { return _members['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['pos']=this['pos']['add']((m['getCrashShape']()['center']()));
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return _members['length'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['pos']=this['pos']['div']((_members['length']));
;}]);}));
;},function () { return this['element']=this['createSVGElem']("g");
;},function () { return _members['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return m['pos']=m['pos']['sub']((this['pos']));
;},function () { return (m['group'])['remove']((m));
;},function () { return this['add']((m));
;},function () { return m['setTrans']();
;}]);}));
;},function () { return this['appear']();
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']=this['createSVGElem']("g");
;},function () { return _members=this['members'];
;},function () { return this['members']=this['Array']['create']();
;},function () { return _members['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var mc;
return DtlPromise.run(this,[function () { return mc=m['create']();
;},function () { return (mc['group'])['remove']((mc));
;},function () { return this['add']((mc));
;},function () { return mc['setTrans']();
;}]);}));
;},function () { return this['appear']();
;}]);}));
;}]);});
;}]);}).checkerror().apply(root,[]);
//# sourceMappingURL=Group.js.map
