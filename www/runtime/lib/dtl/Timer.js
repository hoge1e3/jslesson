(function(){this['alltimer']=this['create']();
this['alltimer']['list']=this['Array']['create']();
this['alltimer']['stop']=dtlbind(this,function(){
var self=this;var 自分=self;
this['list']['each'](dtlbind(this,function(i){
var self=this;var 自分=self;
return i['stop']();
}));
return this;
});
this['Timer']=this['create']();
this['Timer']['i']=(100);
this['Timer']['t']=(100);
this['Timer']['interval']=dtlbind(this,function(i){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return (i>=(0.001));
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return i=(0.001);
}));
this['i']=(i*(1000));
return this;
});
this['Timer']['times']=dtlbind(this,function(t){
var self=this;var 自分=self;
this['t']=t;
return this;
});
this['Timer']['duration']=dtlbind(this,function(t){
var self=this;var 自分=self;
this['t']=((t*(1000))/this['i']);
return this;
});
this['Timer']['d']=root['system']['new']((root['window']['$']['Deferred']))['resolve']();
this['Timer']['skip']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
this['Timer']['abort']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
this['Timer']['addAlias']("abort","stop");
this['Timer']['execute']=dtlbind(this,function(f){
var self=this;var 自分=self;
var s;
var t;
var i;
var c;
s=this;
t=s['t'];
i=s['i'];
c=(1);
root['alltimer']['list']['add']((s));
s['d']=s['d']['then'](dtlbind(this,function(){
var self=this;var 自分=self;
var d;
s['abort']=dtlbind(this,function(){
var self=this;var 自分=self;
return root['window']['clearInterval']((s['id']));
});
s['skip']=dtlbind(this,function(){
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
s['abort']();
return this['window']['onerror']("","","","",(e));
}));
c=(c+(1));
return dtlbind(this,function(){
var self=this;var 自分=self;
return (c>t);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return s['skip']();
}));
}),(i));
return d;
}));
return this;
});
this['Timer']['next_execute']=this['Timer']['execute'];
return this['Timer']['after_execute']=dtlbind(this,function(f){
var self=this;var 自分=self;
this['d']['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return f['execute']();
}));
return this;
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=Timer.js.map
