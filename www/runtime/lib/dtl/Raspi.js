root.system.run(function(){return AsyncByGenerator.toVal((function*() {this['Raspi']=(yield* AsyncByGenerator.toGen(this['create']()));
this['Raspi']['connect']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ba;
var ppath;
var rr;
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['rp'];
}).apply(this));})['then']()))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));}))))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {ba=(this['window']['BitArrow']);
ppath=((ba['runtimePath'])+"lib/python/");
(yield* AsyncByGenerator.toGen(this['system']['getScript'](((ppath+"SerialControl.js")))));
(yield* AsyncByGenerator.toGen(this['system']['getScript'](((ppath+"raspi_repl.js")))));
this['rp']=(yield* AsyncByGenerator.toGen(this['system']['new']((this['window']['RaspiREPL']))));
(yield* AsyncByGenerator.toGen(this['rp']['waitReady']()));
return (yield* AsyncByGenerator.toGen(this['exec']("import machine")));
}).apply(this));}))));
return this;
}).apply(this));});
this['Raspi']['exec']=dtlbind(this,function(script){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['rp']['runCmd']((script))));
}).apply(this));});
this['Raspi']['readADC']=dtlbind(this,function(port,bytes){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['connect']()));
return (yield* AsyncByGenerator.toGen(this['exec'](((("print(machine.ADC("+port)+").read_u16())")))));
}).apply(this));});
this['Raspi']['conversion_factor']=((3.3)/((65535)));
this['Raspi']['getTemperature']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
var reading;
return AsyncByGenerator.toVal((function*() {t=(yield* AsyncByGenerator.toGen(this['readADC']((4))));
reading=(t*this['conversion_factor']);
return (((27)-(((reading-(0.706)))/(0.001721))));
}).apply(this));});
this['Raspi']['writePin']=dtlbind(this,function(port,value){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var scr;
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen(this['connect']()));
scr=(((("machine.Pin("+port)+", machine.Pin.OUT).value(")+value)+")");
return (yield* AsyncByGenerator.toGen(this['exec']((scr))));
}).apply(this));});
return this['Raspi']['led']=dtlbind(this,function(value){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['writePin']((25),(value))));
}).apply(this));});
}).apply(this));});
//# sourceMappingURL=Raspi.js.map
