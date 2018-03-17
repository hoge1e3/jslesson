root.system.run(function(){this['Dict']=this['create']();
this['Dict']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var k;
var v;
this['myDict']=this['root']['create']();
args=root['window']['Array']['prototype']['slice']['call']((_args));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['and']['true']((dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return k=(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return args['shift']();
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undefined'];
})));
})['execute']()),(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return v=(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return args['shift']();
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undefined'];
})));
})['execute']()));
})['while']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['write']((k),(v));
}));
});
this['Dict']['write']=dtlbind(this,function(k,v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['system']['write']((this['myDict']),(k),(v));
return this;
});
this['Dict']['read']=dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['system']['read']((this['myDict']),(k));
});
this['Dict']['delete']=dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['system']['delete']((this['myDict']),(k));
});
this['Dict']['has?']=dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ((this['system']['read']((this['myDict']),(k)))!==this['undefined']);
});
this['Dict']['each']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var keys;
keys=root['window']['Object']['keys']((this['myDict']));
return keys['each'](dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return f['execute']((k),(this['read']((k))));
}));
});
return this['Dict']['toString']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var res;
var keys;
var kvs;
res=this['Array']['create']("[");
keys=root['window']['Object']['keys']((this['myDict']));
kvs=this['Array']['create']();
keys['each'](dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return kvs['add']((this['Array']['create']((k),"=>",(this['read']((k))))['join'](" ")));
}));
res['add']((kvs['join'](" , ")));
res['add']("]");
return res['join'](" ");
});
});
//# sourceMappingURL=Dict.js.map
