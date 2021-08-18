root.system.run(function(){return AsyncByGenerator.toVal((function*() {this['Ajax']=(yield* AsyncByGenerator.toGen(this['create']()));
this['Ajax']['initialize']=dtlbind(this,function(url){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {this['url']=url;
this['params']=(yield* AsyncByGenerator.toGen(this['system']['new'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));}))));
return this['method']="get";
}).apply(this));});
this['Ajax']['data']=dtlbind(this,function(key,value){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['system']['write']((this['params']),(key),(value))));
this['method']="post";
return this;
}).apply(this));});
this['Ajax']['execute']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var s;
return AsyncByGenerator.toVal((function*() {s=this;
return (yield* AsyncByGenerator.toGen(this['DtlPromise']['new'](dtlbind(this,function(succ){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {this['opt']=(yield* AsyncByGenerator.toGen(this['system']['new'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));}))));
this['opt']['method']=s['method'];
this['opt']['url']=s['url'];
this['opt']['data']=s['params'];
this['opt']['success']=succ;
return (yield* AsyncByGenerator.toGen((this['window']['$'])['ajax']((this['opt']))));
}).apply(this));}))));
}).apply(this));});
this['Ajax']['get']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['method']="get";
return (yield* AsyncByGenerator.toGen(this['execute']()));
}).apply(this));});
return this['Ajax']['post']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['method']="post";
return (yield* AsyncByGenerator.toGen(this['execute']()));
}).apply(this));});
}).apply(this));});
//# sourceMappingURL=Ajax.js.map
