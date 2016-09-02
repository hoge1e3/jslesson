(function(){this['dq']=root['window']['String']['fromCharCode']((34));
this['ldq']=root['window']['String']['fromCharCode']((8220));
this['rdq']=root['window']['String']['fromCharCode']((8221));
this['ldb']=root['window']['String']['fromCharCode']((12302));
this['rdb']=root['window']['String']['fromCharCode']((12303));
this['and']=this['create']();
this['and']['true']=dtlbind(this,function(){
var self=this;var 自分=self;
var args;
var f;
args=(this['window']['Array']['prototype']['slice']['call']((arguments)));
f=root['true'];
args['each'](dtlbind(this,function(p){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return (p===root['false']);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return f=root['false'];
}));
}));
return f;
});
this['or']=this['create']();
this['or']['true']=dtlbind(this,function(){
var self=this;var 自分=self;
var args;
var f;
args=(this['window']['Array']['prototype']['slice']['call']((arguments)));
f=root['false'];
args['each'](dtlbind(this,function(p){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return p;
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return f=root['true'];
}));
}));
return f;
});
this['system']['systemTime']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['new']((root['window']['Date']))['getTime']();
});
this['system']['time']=dtlbind(this,function(){
var self=this;var 自分=self;
var d;
d=this['new']((root['window']['Date']));
return (((((d['getHours']())+":")+(d['getMinutes']()))+":")+(d['getSeconds']()));
});
this['system']['today']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['new']((root['window']['Date']))['toString']();
});
this['system']['day']=dtlbind(this,function(){
var self=this;var 自分=self;
var n;
n=this['new']((root['window']['Date']))['getDay']();
return dtlbind(this,function(){
var self=this;var 自分=self;
return (n===(0));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return "日";
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (n===(1));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return "月";
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (n===(2));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return "火";
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (n===(3));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return "水";
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (n===(4));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return "木";
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (n===(5));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return "金";
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return "土";
}));
});
this['system']['year']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['new']((root['window']['Date']))['getFullYear']();
});
this['system']['month']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['new']((root['window']['Date']))['getMonth']();
});
this['system']['date']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['new']((root['window']['Date']))['getDate']();
});
this['system']['hours']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['new']((root['window']['Date']))['getHours']();
});
this['system']['minutes']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['new']((root['window']['Date']))['getMinutes']();
});
this['system']['seconds']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['new']((root['window']['Date']))['getSeconds']();
});
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
return this['isset']=dtlbind(this,function(n){
var self=this;var 自分=self;
return this['and']['true'](((n!==this['undef'])),((n!==this['null'])));
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=Util.js.map
