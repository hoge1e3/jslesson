(function(){this['dq']=root['window']['String']['fromCharCode']((34));
this['ldq']=root['window']['String']['fromCharCode']((8220));
this['rdq']=root['window']['String']['fromCharCode']((8221));
this['ldb']=root['window']['String']['fromCharCode']((12302));
this['rdb']=root['window']['String']['fromCharCode']((12303));
this['and']=this['create']();
this['and']['true']=dtlbind(this,function(){
var self=this;var 自分=self;
var args;
var res;
var flag;
args=(this['window']['Array']['prototype']['slice']['call']((arguments)));
flag=root['true'];
res=root['false'];
args['each'](dtlbind(this,function(p){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return flag;
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
res=dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['typeof']((p)))==="function");
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return p['execute']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return p;
}));
return res;
})['else']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return flag=root['false'];
}));
}));
}));
return res;
});
this['or']=this['create']();
this['or']['true']=dtlbind(this,function(){
var self=this;var 自分=self;
var args;
var res;
var flag;
args=(this['window']['Array']['prototype']['slice']['call']((arguments)));
flag=root['true'];
res=root['false'];
args['each'](dtlbind(this,function(p){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return flag;
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return res=dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['typeof']((p)))==="function");
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return p['execute']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return p;
}));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return flag=root['false'];
}));
}));
}));
return res;
});

// 日付?（date/today の別名）: 「2026-09-26」形式（V4 OxSystem.getYMD）。
// 以前は this['new'](Date) が Date を作れず「this is not a Date object」になっていた。
this['system']['date']=function(){
var d=new root['window']['Date']();
return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
};
this['system']['addAlias']("date","date?","today","today?");

this['toNumber']=dtlbind(this,function(n){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return n;
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return (n-(0));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (0);
}));
});
this['pi']=root['window']['Math']['PI'];
this['isset']=dtlbind(this,function(n){
var self=this;var 自分=self;
return this['and']['true'](((n!==this['undef'])),((n!==this['null'])));
});
return this['Array']['prototype']['toString']=dtlbind(this,function(){
var self=this;var 自分=self;
return (("["+(this['join'](" ")))+"]");
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=Util.js.map
