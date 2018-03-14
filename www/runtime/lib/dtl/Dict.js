(function(){return DtlPromise.run(this,[function () { return this['Dict']=this['create']();
;},function () { return this['Dict']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var k;
var v;
return DtlPromise.run(this,[function () { return this['myDict']=this['root']['create']();
;},function () { return args=root['window']['Array']['prototype']['slice']['call']((_args));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['and']['true']((dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return k=(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return args['shift']();
;}]);})['or'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['undefined'];
;}]);})));
;}]);})['execute']()),(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return v=(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return args['shift']();
;}]);})['or'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['undefined'];
;}]);})));
;}]);})['execute']()));
;}]);})['while']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['write']((k),(v));
;}]);}));
;}]);});
;},function () { return this['Dict']['write']=dtlbind(this,function(k,v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return this['system']['write']((this['myDict']),(k),(v));
;},function () { return this;
;}]);});
;},function () { return this['Dict']['read']=dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['system']['read']((this['myDict']),(k));
;}]);});
;},function () { return this['Dict']['delete']=dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['system']['delete']((this['myDict']),(k));
;}]);});
;},function () { return this['Dict']['has?']=dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return ((this['system']['read']((this['myDict']),(k)))!==this['undefined']);
;}]);});
;},function () { return this['Dict']['each']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var keys;
return DtlPromise.run(this,[function () { return keys=root['window']['Object']['keys']((this['myDict']));
;},function () { return keys['each'](dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return f['execute']((k),(this['read']((k))));
;}]);}));
;}]);});
;},function () { return this['Dict']['toString']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var res;
var keys;
var kvs;
return DtlPromise.run(this,[function () { return res=this['Array']['create']("[");
;},function () { return keys=root['window']['Object']['keys']((this['myDict']));
;},function () { return kvs=this['Array']['create']();
;},function () { return keys['each'](dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return kvs['add']((this['Array']['create']((k),"=>",(this['read']((k))))['join'](" ")));
;}]);}));
;},function () { return res['add']((kvs['join'](" , ")));
;},function () { return res['add']("]");
;},function () { return res['join'](" ");
;}]);});
;}]);}).checkerror().apply(root,[]);
//# sourceMappingURL=Dict.js.map
