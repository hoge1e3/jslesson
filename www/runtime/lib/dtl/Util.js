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
this['system']['dayStr']="日月火水木金土";
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
