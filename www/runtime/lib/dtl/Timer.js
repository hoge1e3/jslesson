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
this['Timer']['i']=(100);
this['Timer']['t']=(100);
this['Timer']['interval']=dtlbind(this,function(i){
var self=this;var 自分=self;
self['i']=(i*(1000));
return self;
});
this['Timer']['times']=dtlbind(this,function(t){
var self=this;var 自分=self;
self['t']=t;
return self;
});
this['Timer']['duration']=dtlbind(this,function(t){
var self=this;var 自分=self;
self['t']=((t*(1000))/self['i']);
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
t=s['t'];
i=s['i'];
c=(1);
root['alltimer']['list']['add']((s));
s['d']=s['d']['then'](dtlbind(this,function(){
var self=this;var 自分=self;
var d;
s['stop']=dtlbind(this,function(){
var self=this;var 自分=self;
root['window']['clearInterval']((s['id']));
return d['resolve']();
});
d=root['system']['new']((root['window']['$']['Deferred']));
s['id']=(root['window'])['setInterval'](dtlbind(this,function(){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return f['execute']((c));
})['try']()['catch'](dtlbind(this,function(e){
var self=this;var 自分=self;
s['stop']();
return root['system']['throw']((e));
}));
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
this['Timer']['next_execute']=this['Timer']['execute'];
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
