(function(){return DtlPromise.run(this,[function () { return this['alltimer']=this['create']();
;},function () { return this['alltimer']['list']=this['Array']['create']();
;},function () { return this['alltimer']['stop']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['list']['each'](dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return i['stop']();
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['Timer']=this['create']();
;},function () { return this['Timer']['i']=(100);
;},function () { return this['Timer']['t']=(100);
;},function () { return this['Timer']['interval']=dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (i>=(0.001));
;}]);})['or'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return i=(0.001);
;}]);}));
;},function () { return this['i']=(i*(1000));
;},function () { return this;
;}]);});
;},function () { return this['Timer']['times']=dtlbind(this,function(t){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['t']=t;
;},function () { return this;
;}]);});
;},function () { return this['Timer']['duration']=dtlbind(this,function(t){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['t']=((t*(1000))/this['i']);
;},function () { return this;
;}]);});
;},function () { return this['Timer']['d']=root['system']['new']((root['window']['$']['Deferred']))['resolve']();
;},function () { return this['Timer']['skip']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);});
;},function () { return this['Timer']['abort']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);});
;},function () { return this['Timer']['addAlias']("abort","stop");
;},function () { return this['Timer']['execute']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var s;
var t;
var i;
var c;
return DtlPromise.run(this,[function () { return s=this;
;},function () { return t=s['t'];
;},function () { return i=s['i'];
;},function () { return c=(1);
;},function () { return root['alltimer']['list']['add']((s));
;},function () { return s['d']=s['d']['then'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var d;
return DtlPromise.run(this,[function () { return s['abort']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return root['window']['clearInterval']((s['id']));
;}]);});
;},function () { return s['skip']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return root['window']['clearInterval']((s['id']));
;},function () { return d['resolve']();
;}]);});
;},function () { return d=root['system']['new']((root['window']['$']['Deferred']));
;},function () { return s['id']=(root['window'])['setInterval'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return f['execute']((c));
;}]);})['try']()['catch'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return s['abort']();
;},function () { return this['window']['onerror']("","","","",(e));
;}]);}));
;},function () { return c=(c+(1));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (c>t);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return s['skip']();
;}]);}));
;}]);}),(i));
;},function () { return d;
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['Timer']['next_execute']=this['Timer']['execute'];
;},function () { return this['Timer']['after_execute']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['d']['then'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return f['execute']();
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['Timer']['wait']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['DtlPromise']['wait']((this),dtlbind(this,function(succ){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['after_execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return succ['execute']();
;}]);}));
;}]);}));
;}]);});
;},function () { return this['Timer']['addAlias']("after_execute","execute_once");
;},function () { return this['addAlias']("Timer","timer");
;}]);}).checkerror().apply(root,[]);
//# sourceMappingURL=Timer.js.map
