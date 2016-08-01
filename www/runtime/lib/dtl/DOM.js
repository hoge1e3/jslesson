(function(){this['HTML']=this['create']();
this['HTML']['get']=dtlbind(this,function(name){
var self=this;var 自分=self;
var res;
res=this['HTML']['create']();
res['jq']=this['$']['create'](((("[name='"+name)+"']")));
return res;
});
return this['HTML']['move']=dtlbind(this,function(x,y){
var self=this;var 自分=self;
return this['jq']['css']("position","absolute")['css']("left",(x))['css']("top",(y));
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=DOM.js.map
