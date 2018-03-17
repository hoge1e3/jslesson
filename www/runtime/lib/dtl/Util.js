root.system.run(function(){this['dq']=root['window']['String']['fromCharCode']((34));
this['ldq']=root['window']['String']['fromCharCode']((8220));
this['rdq']=root['window']['String']['fromCharCode']((8221));
this['ldb']=root['window']['String']['fromCharCode']((12302));
this['rdb']=root['window']['String']['fromCharCode']((12303));
this['and']=this['create']();
this['and']['true']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var res;
var flag;
args=(this['window']['Array']['prototype']['slice']['call']((_args)));
flag=root['true'];
res=root['false'];
args['each'](dtlbind(this,function(p){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag;
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
res=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['typeof']((p)))==="function");
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return p['execute']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return p;
}));
return res;
})['else']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=root['false'];
}));
}));
}));
return res;
});
this['or']=this['create']();
this['or']['true']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var res;
var flag;
args=(this['window']['Array']['prototype']['slice']['call']((_args)));
flag=root['true'];
res=root['false'];
args['each'](dtlbind(this,function(p){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag;
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return res=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['typeof']((p)))==="function");
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return p['execute']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return p;
}));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=root['false'];
}));
}));
}));
return res;
});
this['system']['systemTime']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['new']((root['window']['Date']))['getTime']();
});
this['system']['addAlias']("systemTime","systemTime?");
this['system']['time']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var d;
d=this['new']((root['window']['Date']));
return (((((d['getHours']())+":")+(d['getMinutes']()))+":")+(d['getSeconds']()));
});
this['system']['addAlias']("time","time?");
this['system']['date']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var d;
d=this['new']((root['window']['Date']));
return (((((d['getFullYear']())+"/")+(((d['getMonth']())+(1))))+"/")+(d['getDate']()));
});
this['system']['addAlias']("date","date?","today","today?");
this['system']['dateTime']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((this['date']())+" ")+(this['time']()));
});
this['system']['addAlias']("dateTime","dateTime?");
this['system']['dayStr']="日月火水木金土";
this['system']['dayOfWeek']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var n;
n=this['new']((root['window']['Date']))['getDay']();
return this['dayStr']['substring']((n),((n+(1))));
});
this['system']['addAlias']("dayOfWeek","dayOfWeek?");
this['system']['year']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['new']((root['window']['Date']))['getFullYear']();
});
this['system']['addAlias']("year","year?");
this['system']['month']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['new']((root['window']['Date']))['getMonth']())+(1));
});
this['system']['addAlias']("month","month?");
this['system']['day']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['new']((root['window']['Date']))['getDate']();
});
this['system']['addAlias']("day","day?");
this['system']['hours']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['new']((root['window']['Date']))['getHours']();
});
this['system']['addAlias']("hours","hour","hours?","hour?");
this['system']['minutes']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['new']((root['window']['Date']))['getMinutes']();
});
this['system']['addAlias']("minutes","minute","minutes?","minute?");
this['system']['seconds']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['new']((root['window']['Date']))['getSeconds']();
});
this['system']['addAlias']("seconds","second","seconds?","second?");
this['toNumber']=dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n;
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n-(0));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (0);
}));
});
this['pi']=root['window']['Math']['PI'];
this['isset']=dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['and']['true'](((n!==this['undef'])),((n!==this['null'])));
});
return this['Array']['prototype']['toString']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (("["+(this['join'](" ")))+"]");
});
});
//# sourceMappingURL=Util.js.map
