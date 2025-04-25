root.system.run(function(){return AsyncByGenerator.toVal((function*() {this['root']['load_mml_mod']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['root']['mml_mod'];
}).apply(this));})['then']()))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));}))))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['root']['autio_ctx']=(yield* AsyncByGenerator.toGen((this['window']['AudioContext'])['new']()));
this['url']=((this['window']['runtimePath'])+"lib/mml.js");
return this['root']['mml_mod']=(yield* AsyncByGenerator.toGen(this['root']['import']((this['url']))));
}).apply(this));}))));
return this['root']['mml_mod'];
}).apply(this));});
this['playable']=(yield* AsyncByGenerator.toGen(this['create']()));
this['playable']['tempo']=dtlbind(this,function(t){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {this['_tempo']=t;
return this;
}).apply(this));});
this['musicMelody']=(yield* AsyncByGenerator.toGen(this['playable']['create']()));
this['Melody']=this['musicMelody'];
this['musicMelody']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['queue']=(yield* AsyncByGenerator.toGen(this['Array']['create']()));
return this['_tempo']=(88);
}).apply(this));});
this['musicMelody']['single']=dtlbind(this,function(mml){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var mod;
var p;
return AsyncByGenerator.toVal((function*() {mod=(yield* AsyncByGenerator.toGen(this['root']['load_mml_mod']()));
p=(yield* AsyncByGenerator.toGen(mod['MelodyParser']['new']((mod['japaneseLiteralSet']),(mml))));
this['melody']=(yield* AsyncByGenerator.toGen(p['parse']()));
return this['melody'];
}).apply(this));});
this['musicMelody']['add']=dtlbind(this,function(mml){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var melody;
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return mml['queue'];
}).apply(this));})['then']()))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((mml['queue'])['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['queue']['add']((m))));
}).apply(this));}))));
}).apply(this));}))))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {melody=(yield* AsyncByGenerator.toGen(this['single']((mml))));
return this['queue']=(yield* AsyncByGenerator.toGen(this['queue']['concat']((melody))));
}).apply(this));}))));
return this;
}).apply(this));});
this['musicMelody']['silent']=dtlbind(this,function(c){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var str;
return AsyncByGenerator.toVal((function*() {str="";
(yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return str=(str+"・");
}).apply(this));})['repeat']((c))));
(yield* AsyncByGenerator.toGen(this['add']((str))));
return this;
}).apply(this));});
this['musicMelody']['play']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var mod;
var src;
return AsyncByGenerator.toVal((function*() {mod=(yield* AsyncByGenerator.toGen(this['root']['load_mml_mod']()));
src=(yield* AsyncByGenerator.toGen(mod['toSource']((this['queue']),(this['_tempo']))));
return this['playback']=(yield* AsyncByGenerator.toGen(src['play']((this['root']['autio_ctx']))));
}).apply(this));});
this['musicBand']=(yield* AsyncByGenerator.toGen(this['playable']['create']()));
this['Band']=this['musicBand'];
this['musicBand']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['members']=(yield* AsyncByGenerator.toGen(this['Array']['create']()));
(yield* AsyncByGenerator.toGen(_args['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['add']((m))));
}).apply(this));}))));
return this['_tempo']=(88);
}).apply(this));});
this['musicBand']['add']=dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['members']['add']((m))));
return this;
}).apply(this));});
this['musicBand']['tempo']=dtlbind(this,function(t){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['members']['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(m['tempo']((t))));
}).apply(this));}))));
}).apply(this));});
return this['musicBand']['play']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['members']['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(m['play']()));
}).apply(this));}))));
}).apply(this));});
}).apply(this));});
//# sourceMappingURL=Music.js.map
