root.system.run(function(){this['テキストファイル']=this['create']();
this['テキストファイル']['initialize']=dtlbind(this,function(filename){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['opt']=this['system']['new'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return }));
this['opt']['url']=("http://klab.eplang.jp/honda/data/"+(filename));
this['opt']['async']=root['false'];
this['file']=this['window']['$']['ajax']((this['opt']));
this['text']=this['file']['responseText'];
this['arr']=this['text']['split']((this['window']['RegExp']("[\r\n]")));
return this['arr'];
});
return this['テキストファイル']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['arr'];
});
});
//# sourceMappingURL=TextFile.js.map
