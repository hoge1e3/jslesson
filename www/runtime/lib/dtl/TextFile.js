(function(){return DtlPromise.run(this,[function () { return this['テキストファイル']=this['create']();
;},function () { return this['テキストファイル']['initialize']=dtlbind(this,function(filename){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['opt']=this['system']['new'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);}));
;},function () { return this['opt']['url']=("http://klab.eplang.jp/honda/data/"+(filename));
;},function () { return this['opt']['async']=root['false'];
;},function () { return this['file']=this['window']['$']['ajax']((this['opt']));
;},function () { return this['text']=this['file']['responseText'];
;},function () { return this['arr']=this['text']['split']((this['window']['RegExp']("[\r\n]")));
;},function () { return this['arr'];
;}]);});
;},function () { return this['テキストファイル']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['arr'];
;}]);});
;}]);}).checkerror().apply(root,[]);
//# sourceMappingURL=TextFile.js.map
