(function(){this['Dict']=this['create']();
this['Dict']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;
var args;
var k;
var v;
this['myDict']=this['root']['create']();
args=root['window']['Array']['prototype']['slice']['call']((arguments));
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['and']['true']((dtlbind(this,function(){
var self=this;var 自分=self;
return k=(dtlbind(this,function(){
var self=this;var 自分=self;
return args['shift']();
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['undefined'];
})));
})['execute']()),(dtlbind(this,function(){
var self=this;var 自分=self;
return v=(dtlbind(this,function(){
var self=this;var 自分=self;
return args['shift']();
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['undefined'];
})));
})['execute']()));
})['while']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['write']((k),(v));
}));
});
this['Dict']['write']=dtlbind(this,function(k,v){
var self=this;var 自分=self;
this['system']['write']((this['myDict']),(k),(v));
return this;
});
this['Dict']['read']=dtlbind(this,function(k){
var self=this;var 自分=self;
return this['system']['read']((this['myDict']),(k));
});
this['Dict']['delete']=dtlbind(this,function(k){
var self=this;var 自分=self;
return this['system']['delete']((this['myDict']),(k));
});
this['Dict']['has?']=dtlbind(this,function(k){
var self=this;var 自分=self;
return ((this['system']['read']((this['myDict']),(k)))!==this['undefined']);
});
this['Dict']['each']=dtlbind(this,function(f){
var self=this;var 自分=self;
var keys;
keys=root['window']['Object']['keys']((this['myDict']));
return keys['each'](dtlbind(this,function(k){
var self=this;var 自分=self;
return f['execute']((k),(this['read']((k))));
}));
});
return this['Dict']['toString']=dtlbind(this,function(){
var self=this;var 自分=self;
var res;
var keys;
var kvs;
res=this['Array']['create']("[");
keys=root['window']['Object']['keys']((this['myDict']));
kvs=this['Array']['create']();
keys['each'](dtlbind(this,function(k){
var self=this;var 自分=self;
return kvs['add']((this['Array']['create']((k),"=>",(this['read']((k))))['join'](" ")));
}));
res['add']((kvs['join'](" , ")));
res['add']("]");
return res['join'](" ");
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=Dict.js.map
