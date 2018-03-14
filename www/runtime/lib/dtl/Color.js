(function(){return DtlPromise.run(this,[function () { return this['Color']=this['root']['create']();
;},function () { return this['Color']['r']=(0);
;},function () { return this['Color']['g']=(0);
;},function () { return this['Color']['b']=(0);
;},function () { return this['Color']['a']=(1);
;},function () { return this['Color']['initialize']=dtlbind(this,function(arg1,arg2,arg3){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
var args;
var r;
var g;
var b;
return DtlPromise.run(this,[function () { return args=_args;
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (arg1['toString']())['match']((root['window']['RegExp']("^#[0-9A-F]{6}$")));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var s;
return DtlPromise.run(this,[function () { return s=arg1['toString']()['split']("");
;},function () { return s['shift']();
;},function () { return r=root['window']['parseInt']((((s['shift']())+(s['shift']()))),(16));
;},function () { return g=root['window']['parseInt']((((s['shift']())+(s['shift']()))),(16));
;},function () { return b=root['window']['parseInt']((((s['shift']())+(s['shift']()))),(16));
;}]);}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['and']['true'](((args['length']===(1))),(((this['typeof']((arg1)))==="number")));
;}]);}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return b=(arg1%(256));
;},function () { return arg1=root['window']['parseInt'](((arg1/(256))));
;},function () { return g=(arg1%(256));
;},function () { return arg1=root['window']['parseInt'](((arg1/(256))));
;},function () { return r=(arg1%(256));
;},function () { return arg1=root['window']['parseInt'](((arg1/(256))));
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return arg1=root['window']['Math']['floor']((arg1));
;},function () { return arg2=root['window']['Math']['floor']((arg2));
;},function () { return arg3=root['window']['Math']['floor']((arg3));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (arg1>(255));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return r=(255);
;}]);}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (arg1<(0));
;}]);}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return r=(0);
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return r=arg1;
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (arg2>(255));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return g=(255);
;}]);}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (arg2<(0));
;}]);}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return g=(0);
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return g=arg2;
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (arg3>(255));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return b=(255);
;}]);}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (arg3<(0));
;}]);}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return b=(0);
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return b=arg3;
;}]);}));
;}]);}));
;},function () { return this['r']=r;
;},function () { return this['g']=g;
;},function () { return this['b']=b;
;},function () { return this['a']=(1);
;}]);});
;},function () { return this['Color']['randomCreate']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['Color']['create']((((255)).random()),(((255)).random()),(((255)).random()));
;}]);});
;},function () { return this['Color']['darken']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['Color']['create'](((this['r']-(50))),((this['g']-(50))),((this['b']-(50))));
;}]);});
;},function () { return this['Color']['addAlias']("darken","darker");
;},function () { return this['Color']['brighten']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['Color']['create'](((this['r']+(50))),((this['g']+(50))),((this['b']+(50))));
;}]);});
;},function () { return this['Color']['addAlias']("brighten","brighter");
;},function () { return this['Color']['toString']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (((((((("rgba("+this['r'])+",")+this['g'])+",")+this['b'])+",")+this['a'])+")");
;}]);});
;},function () { return this['Color']['toHalfOpacity']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['a']=(0.5);
;},function () { return this;
;}]);});
;},function () { return this['Color']['addAlias']("toHalfOpacity","setTransparency");
;},function () { return this['Color']['toFullOpacity']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['a']=(1);
;},function () { return this;
;}]);});
;},function () { return this['Color']['setCMYK']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['black']=(this['window']['Math'])['min']((((1)-(this['r']/(255)))),(((1)-(this['g']/(255)))),(((1)-(this['b']/(255)))));
;},function () { return this['cyan']=(((((1)-((this['r']/(255))))-this['black']))/(((1)-this['black'])));
;},function () { return this['magenta']=(((((1)-((this['g']/(255))))-this['black']))/(((1)-this['black'])));
;},function () { return this['yellow']=(((((1)-((this['b']/(255))))-this['black']))/(((1)-this['black'])));
;},function () { return this;
;}]);});
;},function () { return this['Color']['fromCMYK']=dtlbind(this,function(cyan,magenta,yellow,black){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,4);
return DtlPromise.run(this,[function () { return this['Color']['create']((((((1)-((this['window']['Math'])['min']((1),(((cyan*(((1)-black)))+black))))))*(255))),(((((1)-((this['window']['Math'])['min']((1),(((magenta*(((1)-black)))+black))))))*(255))),(((((1)-((this['window']['Math'])['min']((1),(((yellow*(((1)-black)))+black))))))*(255))));
;}]);});
;},function () { return this['Color']['getRed']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['r'];
;}]);});
;},function () { return this['Color']['getGreen']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['g'];
;}]);});
;},function () { return this['Color']['getBlue']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['b'];
;}]);});
;},function () { return this['Color']['mixParam']=(1.1);
;},function () { return this['Light']=this['create']();
;},function () { return this['Light']['mix']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var c;
return DtlPromise.run(this,[function () { return this['args']=(this['Array']['prototype']['slice'])['call']((_args));
;},function () { return this['args']=this['args']['select'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return (root['is'])['call']((e),(this['Color']));
;}]);}));
;},function () { return c=this['args']['shift']();
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((this['args']['length'])===(0));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return c;
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (c['mixColor'])['apply']((c),(this['args']));
;}]);}));
;}]);});
;},function () { return this['Ink']=this['create']();
;},function () { return this['Ink']['mix']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var c;
return DtlPromise.run(this,[function () { return this['args']=(this['Array']['prototype']['slice'])['call']((_args));
;},function () { return this['args']=this['args']['select'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return (root['is'])['call']((e),(this['Color']));
;}]);}));
;},function () { return c=this['args']['shift']();
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((this['args']['length'])===(0));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return c;
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (c['mixColor2'])['apply']((c),(this['args']));
;}]);}));
;}]);});
;},function () { return this['Color']['mixColor']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var red;
var green;
var blue;
var yyy;
var m;
return DtlPromise.run(this,[function () { return args=(this['Array']['prototype']['slice'])['call']((_args));
;},function () { return args=args['select'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return (root['is'])['call']((e),(this['Color']));
;}]);}));
;},function () { return red=this['getRed']();
;},function () { return green=this['getGreen']();
;},function () { return blue=this['getBlue']();
;},function () { return yyy=this['max']((red),(green),(blue));
;},function () { return args['each'](dtlbind(this,function(arg){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var r;
var g;
var b;
var y;
return DtlPromise.run(this,[function () { return r=arg['getRed']();
;},function () { return g=arg['getGreen']();
;},function () { return b=arg['getBlue']();
;},function () { return y=this['max']((r),(g),(b));
;},function () { return red=(red+r);
;},function () { return green=(green+g);
;},function () { return blue=(blue+b);
;},function () { return yyy=(yyy+y);
;}]);}));
;},function () { return m=((yyy/(this['max']((red),(green),(blue))))/(((args['length'])+(1))));
;},function () { return this['Color']['create'](((red*m)),((green*m)),((blue*m)));
;}]);});
;},function () { return this['Color']['max']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
var m;
return DtlPromise.run(this,[function () { return m=r;
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (m<g);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return m=g;
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (m<b);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return m=b;
;}]);}));
;},function () { return m;
;}]);});
;},function () { return this['Color']['mixColor2']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var red;
var green;
var blue;
var yyy;
var m;
return DtlPromise.run(this,[function () { return args=(this['Array']['prototype']['slice'])['call']((_args));
;},function () { return args=args['select'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return (root['is'])['call']((e),(this['Color']));
;}]);}));
;},function () { return red=((255)-(this['getRed']()));
;},function () { return green=((255)-(this['getGreen']()));
;},function () { return blue=((255)-(this['getBlue']()));
;},function () { return yyy=this['max']((red),(green),(blue));
;},function () { return args['each'](dtlbind(this,function(arg){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var r;
var g;
var b;
var y;
return DtlPromise.run(this,[function () { return r=((255)-(arg['getRed']()));
;},function () { return g=((255)-(arg['getGreen']()));
;},function () { return b=((255)-(arg['getBlue']()));
;},function () { return y=this['max']((r),(g),(b));
;},function () { return red=(red+r);
;},function () { return green=(green+g);
;},function () { return blue=(blue+b);
;},function () { return yyy=(yyy+y);
;}]);}));
;},function () { return m=((yyy/(this['max']((red),(green),(blue))))/(((args['length'])+(1))));
;},function () { return this['Color']['create']((((255)-(red*m))),(((255)-(green*m))),(((255)-(blue*m))));
;}]);});
;},function () { return this['Black']=this['Color']['create']((0),(0),(0));
;},function () { return this['White']=this['Color']['create']((255),(255),(255));
;},function () { return this['Blue']=this['Color']['create']((8),(8),(255));
;},function () { return this['Red']=this['Color']['create']((255),(8),(8));
;},function () { return this['Green']=this['Color']['create']((8),(255),(8));
;},function () { return this['Pink']=this['Color']['create']((255),(0),(255));
;},function () { return this['Magenta']=this['Color']['create']((255),(0),(255));
;},function () { return this['Cyan']=this['Color']['create']((0),(255),(255));
;},function () { return this['Yellow']=this['Color']['create']((255),(255),(0));
;}]);}).checkerror().apply(root,[]);
//# sourceMappingURL=Color.js.map
