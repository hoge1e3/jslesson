(function(){this['HTML']=this['create']();
this['HTML']['get']=dtlbind(this,function(name){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,1);
var res;
res=this['HTML']['create']();
res['jq']=this['$']['create'](((("[name='"+name)+"']")));
return res;
});
return this['HTML']['move']=dtlbind(this,function(x,y){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,2);
return this['jq']['css']("position","absolute")['css']("left",(x))['css']("top",(y));
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=DOM.js.map
