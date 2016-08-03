(function(){this['alltimer']=this['create']();
this['alltimer']['list']=this['Array']['create']();
this['alltimer']['stop']=dtlbind(this,function(){
var self=this;var 自分=self;
self['list']['each'](dtlbind(this,function(i){
var self=this;var 自分=self;
return i['stop']();
}));
return self;
});
this['Timer']=this['create']();
this['Timer']['interval_val']=(100);
this['Timer']['times_val']=(100);
this['Timer']['interval']=dtlbind(this,function(i){
var self=this;var 自分=self;
self['interval_val']=i;
return self;
});
this['Timer']['times']=dtlbind(this,function(t){
var self=this;var 自分=self;
self['times_val']=t;
return self;
});
this['Timer']['d']=root['system']['new']((root['window']['$']['Deferred']))['resolve']();
this['Timer']['stop']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
this['Timer']['execute']=dtlbind(this,function(f){
var self=this;var 自分=self;
var s;
var t;
var i;
var c;
s=self;
t=s['times_val'];
i=s['interval_val'];
c=(1);
root['alltimer']['list']['add']((s));
s['d']=s['d']['then'](dtlbind(this,function(){
var self=this;var 自分=self;
var d;
s['stop']=dtlbind(this,function(){
var self=this;var 自分=self;
return root['window']['clearInterval']((s['id']));
});
d=root['system']['new']((root['window']['$']['Deferred']));
s['id']=(root['window'])['setInterval'](dtlbind(this,function(){
var self=this;var 自分=self;
f['execute']((c));
c=(c+(1));
return dtlbind(this,function(){
var self=this;var 自分=self;
return (c>t);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
s['stop']();
return d['resolve']();
}));
}),(i));
return d;
}));
return self;
});
return this['Timer']['after_execute']=dtlbind(this,function(f){
var self=this;var 自分=self;
self['d']['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return f['execute']();
}));
return self;
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=Timer.js.map
