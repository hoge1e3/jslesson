root.system.run(function(){return AsyncByGenerator.toVal((function*() {this['root']['load_mml_mod']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['root']['mml_mod'];
}).apply(this));})['then']()))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));}))))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['root']['audio_ctx']=(yield* AsyncByGenerator.toGen((this['window']['AudioContext'])['new']()));
this['url']=((this['window']['runtimePath'])+"lib/mml_ba.js");
this['root']['mml_ba_mod']=(yield* AsyncByGenerator.toGen(this['root']['import']((this['url']))));
this['root']['mml_mod']=this['root']['mml_ba_mod']['mod'];
return (yield* AsyncByGenerator.toGen((this['window']['Promise'])['resolve'](((yield* AsyncByGenerator.toGen(this['root']['mml_ba_mod']['initMML']()))))));
}).apply(this));}))));
return this['root']['mml_mod'];
}).apply(this));});
this['root']['console']=this['window']['console'];
this['musicBase']=(yield* AsyncByGenerator.toGen(this['create']()));
this['musicBase']['resolve']=dtlbind(this,function(p){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['window']['Promise']['resolve']((p))));
}).apply(this));});
this['musicBase']['getOrigin']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var o;
return AsyncByGenerator.toVal((function*() {o=this['window']['location']['origin'];
return (yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return ((o+"")!=="null");
}).apply(this));})['then']()))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return o;
}).apply(this));}))))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return o=this['window']['parent']['origin'];
}).apply(this));})['try']()));
return o;
}).apply(this));}))));
}).apply(this));});
this['musicBase']['fixOrigin']=dtlbind(this,function(urlStr){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var url;
var o;
return AsyncByGenerator.toVal((function*() {url=(yield* AsyncByGenerator.toGen((this['window']['URL'])['new']((urlStr))));
o=(yield* AsyncByGenerator.toGen(this['getOrigin']()));
return (((o+url['pathname'])+url['search'])+url['hash']);
}).apply(this));});
this['musicBase']['fetch']=dtlbind(this,function(url){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var r;
return AsyncByGenerator.toVal((function*() {url=(yield* AsyncByGenerator.toGen(this['fixOrigin']((url))));
r=(yield* AsyncByGenerator.toGen(this['resolve'](((yield* AsyncByGenerator.toGen(this['window']['fetch']((url))))))));
return (yield* AsyncByGenerator.toGen(this['resolve'](((yield* AsyncByGenerator.toGen(r['arrayBuffer']()))))));
}).apply(this));});
this['playable']=(yield* AsyncByGenerator.toGen(this['musicBase']['create']()));
this['playable']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['_addReserved']=_args;
}).apply(this));});
this['playable']['addReserved']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var tmp;
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['_addReserved'];
}).apply(this));})['then']()))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {tmp=this['_addReserved'];
this['_addReserved']=this['false'];
return (yield* AsyncByGenerator.toGen(tmp['each'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['add']((e))));
}).apply(this));}))));
}).apply(this));}))));
}).apply(this));});
this['playable']['tempo']=dtlbind(this,function(t){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {this['_tempo']=t;
return this;
}).apply(this));});
this['Instrument']=(yield* AsyncByGenerator.toGen(this['musicBase']['create']()));
this['Instrument']['initialize']=dtlbind(this,function(name){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return this['url']=name;
}).apply(this));});
this['Instrument']['loadDefaultSet']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['Instrument']['defaultSet'];
}).apply(this));})['then']()))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['Instrument']['defaultSet'];
}).apply(this));}))))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['root']['load_mml_mod']()));
return this['Instrument']['defaultSet']=(yield* AsyncByGenerator.toGen(this['resolve'](((yield* AsyncByGenerator.toGen(this['root']['mml_ba_mod']['loadWaves']()))))));
}).apply(this));}))));
}).apply(this));});
this['Instrument']['load']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var r;
var a;
var mod;
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['waveform'];
}).apply(this));})['then']()))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['waveform'];
}).apply(this));}))))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {a=(yield* AsyncByGenerator.toGen(this['fetch']((this['url']))));
mod=(yield* AsyncByGenerator.toGen(this['root']['load_mml_mod']()));
return this['waveform']=(yield* AsyncByGenerator.toGen(this['resolve'](((yield* AsyncByGenerator.toGen(mod['oscillator']['bufferedWaveformOfFile']((this['root']['audio_ctx']),(a))))))));
}).apply(this));}))));
}).apply(this));});
this['musicMelody']=(yield* AsyncByGenerator.toGen(this['playable']['create']()));
this['Melody']=this['musicMelody'];
this['musicMelody']['setDefaultInstrument']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['waveform']=(yield* AsyncByGenerator.toGen(((yield* AsyncByGenerator.toGen(this['Instrument']['loadDefaultSet']())))['get']((1))));
(yield* AsyncByGenerator.toGen(this['console']['log']("setDefaultInstrument",(this['waveform']))));
return this;
}).apply(this));});
this['musicMelody']['set']=dtlbind(this,function(instrument){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {this['waveform']=(yield* AsyncByGenerator.toGen(instrument['load']()));
return this;
}).apply(this));});
this['musicMelody']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['_addReserved']=_args;
this['queue']=(yield* AsyncByGenerator.toGen(this['Array']['create']()));
this['waveform']="square";
return this['_tempo']=(88);
}).apply(this));});
this['musicMelody']['single']=dtlbind(this,function(mml){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var mod;
var p;
var melody;
return AsyncByGenerator.toVal((function*() {mod=(yield* AsyncByGenerator.toGen(this['root']['load_mml_mod']()));
p=(yield* AsyncByGenerator.toGen(mod['MelodyParser']['new']((mod['japaneseLiteralSet']),(mml))));
melody=(yield* AsyncByGenerator.toGen(p['parse']()));
return melody;
}).apply(this));});
this['musicMelody']['add']=dtlbind(this,function(mml){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var melody;
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['addReserved']()));
(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
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
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['addReserved']()));
mod=(yield* AsyncByGenerator.toGen(this['root']['load_mml_mod']()));
src=(yield* AsyncByGenerator.toGen(mod['toSource']((this['queue']),(this['_tempo']),(this['waveform']))));
this['playback']=(yield* AsyncByGenerator.toGen(src['play']((this['root']['audio_ctx']))));
return this;
}).apply(this));});
this['musicDrum']=(yield* AsyncByGenerator.toGen(this['playable']['create']()));
this['DrumSet']=this['musicDrum'];
this['musicDrum']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['_addReserved']=_args;
this['queue']=(yield* AsyncByGenerator.toGen(this['Array']['create']()));
return this['_tempo']=(88);
}).apply(this));});
this['musicDrum']['loadLiteralSet']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['literalSet'];
}).apply(this));})['then']()))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['literalSet'];
}).apply(this));}))))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var load;
var mod;
var map;
var a;
return AsyncByGenerator.toVal((function*() {mod=(yield* AsyncByGenerator.toGen(this['root']['load_mml_mod']()));
load=dtlbind(this,function(mml,file){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var a;
var buf;
var pr;
return AsyncByGenerator.toVal((function*() {a=(yield* AsyncByGenerator.toGen(this['fetch']((("http://127.0.0.1/runtime/sounds/"+file)))));
pr=(yield* AsyncByGenerator.toGen((mod['oscillator'])['bufferedWaveformOfFile']((this['root']['audio_ctx']),(a),(440))));
buf=(yield* AsyncByGenerator.toGen(this['resolve']((pr))));
return (yield* AsyncByGenerator.toGen(map['set']((mml),(buf))));
}).apply(this));});
map=(yield* AsyncByGenerator.toGen((this['window']['Map'])['new']()));
(yield* AsyncByGenerator.toGen(load['execute']("ド","maou_se_inst_drum2_kick.wav")));
(yield* AsyncByGenerator.toGen(load['execute']("ツ","maou_se_inst_drum1_hat.wav")));
(yield* AsyncByGenerator.toGen(load['execute']("タ","maou_se_inst_drum2_snare.wav")));
(yield* AsyncByGenerator.toGen(load['execute']("パ","maou_se_inst_drum1_cymbal.wav")));
this['literalSet']=(yield* AsyncByGenerator.toGen(mod['createRhysmLiteralSet']((mod['japaneseRhysmLiteralSetBase']),(map))));
return this['literalSet'];
}).apply(this));}))));
}).apply(this));});
this['musicDrum']['single']=dtlbind(this,function(mml){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var mod;
var p;
var rhysm;
return AsyncByGenerator.toVal((function*() {mod=(yield* AsyncByGenerator.toGen(this['root']['load_mml_mod']()));
p=(yield* AsyncByGenerator.toGen(mod['RhysmParser']['new'](((yield* AsyncByGenerator.toGen(this['loadLiteralSet']()))),(mml))));
rhysm=(yield* AsyncByGenerator.toGen(p['parse']()));
return rhysm;
}).apply(this));});
this['musicDrum']['add']=dtlbind(this,function(mml){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var rhysm;
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['addReserved']()));
(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
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
return AsyncByGenerator.toVal((function*() {rhysm=(yield* AsyncByGenerator.toGen(this['single']((mml))));
return this['queue']=(yield* AsyncByGenerator.toGen(this['queue']['concat']((rhysm))));
}).apply(this));}))));
return this;
}).apply(this));});
this['musicDrum']['silent']=dtlbind(this,function(c){
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
this['musicDrum']['play']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var mod;
var src;
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['addReserved']()));
mod=(yield* AsyncByGenerator.toGen(this['root']['load_mml_mod']()));
src=(yield* AsyncByGenerator.toGen(mod['rhysmToSource']((this['queue']),(this['_tempo']))));
this['playback']=(yield* AsyncByGenerator.toGen(src['play']((this['root']['audio_ctx']))));
return this;
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
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['members']['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(m['tempo']((t))));
}).apply(this));}))));
return this;
}).apply(this));});
return this['musicBand']['play']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['members']['each'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(m['play']()));
}).apply(this));}))));
return this;
}).apply(this));});
}).apply(this));});
//# sourceMappingURL=Music.js.map
