root.system.run(function(){return AsyncByGenerator.toVal((function*() {this['microbit']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['作る']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this;
}).apply(this));});
this['microbit']['ウィンドウ']=this['window'];
this['microbit']['接続']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ba;
var ppath;
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['rp'];
}).apply(this));})['then']()))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));}))))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {ba=((this['ウィンドウ'])['BitArrow']);
ppath=((ba['runtimePath'])+"lib/python/");
(yield* AsyncByGenerator.toGen((root['system'])['getScript'](((ppath+"SerialControl.js")))));
(yield* AsyncByGenerator.toGen((root['system'])['getScript'](((ppath+"raspi_repl.js")))));
this['rp']=(yield* AsyncByGenerator.toGen((root['system'])['new'](((this['ウィンドウ'])['RaspiREPL']))));
(yield* AsyncByGenerator.toGen(this['rp']['waitReady']()));
(yield* AsyncByGenerator.toGen(this['exec']("import radio")));
return (yield* AsyncByGenerator.toGen(this['exec']("import microbit")));
}).apply(this));}))));
return this;
}).apply(this));});
this['microbit']['exec']=dtlbind(this,function(script){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['rp']['runCmd']((script))));
}).apply(this));});
this['単位']=(yield* AsyncByGenerator.toGen(this['作る']()));
this['摂氏']=(yield* AsyncByGenerator.toGen(this['単位']['作る']()));
this['明度']=(yield* AsyncByGenerator.toGen(this['単位']['作る']()));
this['ミリg']=(yield* AsyncByGenerator.toGen(this['単位']['作る']()));
this['ナノテスラ']=(yield* AsyncByGenerator.toGen(this['単位']['作る']()));
this['摂氏']['変換式']=dtlbind(this,function(摂氏){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return 摂氏;
}).apply(this));});
this['明度']['変換式']=dtlbind(this,function(明度){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return 明度;
}).apply(this));});
this['ミリg']['変換式']=dtlbind(this,function(ミリg){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return ミリg;
}).apply(this));});
this['ナノテスラ']['変換式']=dtlbind(this,function(ナノテスラ){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return ナノテスラ;
}).apply(this));});
this['microbit']['内蔵センサ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['温度センサ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['光センサ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['加速度センサ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['加速度センサ']['x']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['加速度センサ']['y']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['加速度センサ']['z']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['加速度センサ']['作る']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this;
}).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['x']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['y']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['z']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['作る']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this;
}).apply(this));});
this['microbit']['内蔵センサ']['mbボタン']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['mbボタン']['a']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['mbボタン']['b']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['mbボタン']['作る']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this;
}).apply(this));});
this['microbit']['内蔵センサ']['ボタン']=this['microbit']['内蔵センサ']['mbボタン'];
this['microbit']['無線']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['LED']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['外部センサ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['外部センサ']['ADC']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return }).apply(this));});
this['microbit']['内蔵センサ']['温度センサ']['変換先単位']=this['摂氏'];
this['microbit']['内蔵センサ']['温度センサ']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.temperature()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
return this['result']=(yield* AsyncByGenerator.toGen((this['変換先単位'])['変換式']((this['result']))));
}).apply(this));});
this['microbit']['内蔵センサ']['温度センサ']['単位設定']=dtlbind(this,function(単位){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return this['変換先単位']=単位;
}).apply(this));});
this['microbit']['内蔵センサ']['光センサ']['変換先単位']=this['明度'];
this['microbit']['内蔵センサ']['光センサ']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.display.read_light_level()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
return this['result']=(yield* AsyncByGenerator.toGen((this['変換先単位'])['変換式']((this['result']))));
}).apply(this));});
this['microbit']['内蔵センサ']['光センサ']['単位設定']=dtlbind(this,function(単位){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return this['変換先単位']=単位;
}).apply(this));});
this['microbit']['内蔵センサ']['加速度センサ']['変換先単位']=this['ミリg'];
this['microbit']['内蔵センサ']['加速度センサ']['xyzそれぞれ読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['ret']=(yield* AsyncByGenerator.toGen((root['microbit']['内蔵センサ']['加速度センサ'])['作る']()));
this['result_x']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(microbit.accelerometer.get_x())")));
this['ret']['x']=(yield* AsyncByGenerator.toGen((this['変換先単位'])['変換式']((this['result_x']))));
this['result_y']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(microbit.accelerometer.get_y())")));
this['ret']['y']=(yield* AsyncByGenerator.toGen((this['変換先単位'])['変換式']((this['result_y']))));
this['result_z']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(microbit.accelerometer.get_z())")));
this['ret']['z']=(yield* AsyncByGenerator.toGen((this['変換先単位'])['変換式']((this['result_z']))));
return this['ret'];
}).apply(this));});
this['microbit']['内蔵センサ']['加速度センサ']['単位設定']=dtlbind(this,function(単位){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return this['変換先単位']=単位;
}).apply(this));});
this['microbit']['内蔵センサ']['加速度センサ']['x']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.accelerometer.get_x()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
return this['result']=(yield* AsyncByGenerator.toGen((root['microbit']['内蔵センサ']['加速度センサ']['変換先単位'])['変換式']((this['result']))));
}).apply(this));});
this['microbit']['内蔵センサ']['加速度センサ']['y']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.accelerometer.get_y()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
return this['result']=(yield* AsyncByGenerator.toGen((root['microbit']['内蔵センサ']['加速度センサ']['変換先単位'])['変換式']((this['result']))));
}).apply(this));});
this['microbit']['内蔵センサ']['加速度センサ']['z']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.accelerometer.get_z()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
return this['result']=(yield* AsyncByGenerator.toGen((root['microbit']['内蔵センサ']['加速度センサ']['変換先単位'])['変換式']((this['result']))));
}).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['変換先単位']=this['ナノテスラ'];
this['microbit']['内蔵センサ']['地磁気センサ']['キャリブレーション']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(microbit.compass.clear_calibration())")));
return (yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(microbit.compass.calibrate())")));
}).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['xyzそれぞれ読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['ret']=(yield* AsyncByGenerator.toGen((root['microbit']['内蔵センサ']['地磁気センサ'])['作る']()));
this['result_x']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(microbit.compass.get_x())")));
this['ret']['x']=(yield* AsyncByGenerator.toGen((this['変換先単位'])['変換式']((this['result_x']))));
this['result_y']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(microbit.compass.get_y())")));
this['ret']['y']=(yield* AsyncByGenerator.toGen((this['変換先単位'])['変換式']((this['result_y']))));
this['result_z']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(microbit.compass.get_z())")));
this['ret']['z']=(yield* AsyncByGenerator.toGen((this['変換先単位'])['変換式']((this['result_z']))));
return this['ret'];
}).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['単位設定']=dtlbind(this,function(単位){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return this['変換先単位']=単位;
}).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['強さを読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.compass.get_field_strength()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
return this['result']=(yield* AsyncByGenerator.toGen((this['変換先単位'])['変換式']((this['result']))));
}).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['方角を読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.compass.heading()";
return this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
}).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['x']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.compass.get_x()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
return this['result']=(yield* AsyncByGenerator.toGen((root['microbit']['内蔵センサ']['地磁気センサ']['変換先単位'])['変換式']((this['result']))));
}).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['y']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.compass.get_y()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
return this['result']=(yield* AsyncByGenerator.toGen((root['microbit']['内蔵センサ']['地磁気センサ']['変換先単位'])['変換式']((this['result']))));
}).apply(this));});
this['microbit']['内蔵センサ']['地磁気センサ']['z']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.compass.get_z()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
return this['result']=(yield* AsyncByGenerator.toGen((root['microbit']['内蔵センサ']['地磁気センサ']['変換先単位'])['変換式']((this['result']))));
}).apply(this));});
this['microbit']['内蔵センサ']['mbボタン']['abそれぞれ読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['ret']=(yield* AsyncByGenerator.toGen(this['作る']()));
this['result_a']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(microbit.button_a.was_pressed())")));
(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['result_a']['含む?']("True")));
}).apply(this));})['なら']()))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['ret']['a']=root['はい'];
}).apply(this));}))))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['ret']['a']=root['いいえ'];
}).apply(this));}))));
this['result_b']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(microbit.button_b.was_pressed())")));
(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['result_b']['含む?']("True")));
}).apply(this));})['なら']()))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['ret']['b']=root['はい'];
}).apply(this));}))))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['ret']['b']=root['いいえ'];
}).apply(this));}))));
return this['ret'];
}).apply(this));});
this['microbit']['内蔵センサ']['mbボタン']['a']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.button_a.was_pressed()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['result']['含む?']("True")));
}).apply(this));})['なら']()))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['result']=root['はい'];
}).apply(this));}))))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['result']=root['いいえ'];
}).apply(this));}))));
return this['result'];
}).apply(this));});
this['microbit']['内蔵センサ']['mbボタン']['b']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {this['string']="microbit.button_b.was_pressed()";
this['result']=(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print("+this['string'])+")")))));
(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen(this['result']['含む?']("True")));
}).apply(this));})['なら']()))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['result']=root['はい'];
}).apply(this));}))))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['result']=root['いいえ'];
}).apply(this));}))));
return this['result'];
}).apply(this));});
this['microbit']['無線']['起動']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(radio.on())")));
}).apply(this));});
this['microbit']['無線']['終了']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(radio.off())")));
}).apply(this));});
this['microbit']['無線']['送信']=dtlbind(this,function(メッセージ){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print(radio.send('"+メッセージ)+"'))")))));
}).apply(this));});
this['microbit']['無線']['受信']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(radio.receive())")));
}).apply(this));});
this['microbit']['無線']['グループ']=dtlbind(this,function(グループ番号){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(radio.config(group=",+(グループ番号),+"))")));
}).apply(this));});
this['microbit']['LED']['クリア']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec']("print(display.clear())")));
}).apply(this));});
this['microbit']['LED']['表示']=dtlbind(this,function(メッセージ){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print(display.show('"+メッセージ)+"'))")))));
}).apply(this));});
this['microbit']['LED']['スクロール表示']=dtlbind(this,function(メッセージ){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print(display.scroll('"+メッセージ)+"'))")))));
}).apply(this));});
this['microbit']['外部センサ']['ADC']['ピン番号']=(0);
this['microbit']['外部センサ']['ADC']['ピン設定']=dtlbind(this,function(数値){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return this['ピン番号']=数値;
}).apply(this));});
this['microbit']['外部センサ']['ADC']['アナログで読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print(pin"+(this['ピン番号']))+".read_analog())")))));
}).apply(this));});
this['microbit']['外部センサ']['ADC']['アナログで書く']=dtlbind(this,function(数値){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((((("print(pin"+(this['ピン番号']))+".write_analog(")+数値)+"))")))));
}).apply(this));});
this['microbit']['外部センサ']['ADC']['デジタルで読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {(yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((((("print(pin"+(this['ピン番号']))+".set_pull(pin")+(this['ピン番号']))+".PULL_UP))")))));
return (yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((("print(pin"+(this['ピン番号']))+".read_digital())")))));
}).apply(this));});
return this['microbit']['外部センサ']['ADC']['デジタルで書く']=dtlbind(this,function(数値){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {return (yield* AsyncByGenerator.toGen((root['microbit'])['exec'](((((("print(pin"+(this['ピン番号']))+".write_digital(")+数値)+"))")))));
}).apply(this));});
}).apply(this));});
//# sourceMappingURL=MicroBit.js.map
