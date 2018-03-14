(function(){return DtlPromise.run(this,[function () { return this['Screen']=this['create']();
;},function () { return this['Screen']['width?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['$']['create']((this['window']))['width']();
;}]);});
;},function () { return this['Screen']['height?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['$']['create']((this['window']))['height']();
;}]);});
;},function () { return this['Screen']['paint']=dtlbind(this,function(c){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['$']['create']("body")['css']("background-color",((c+"")));
;}]);});
;},function () { return this['addAlias']("Screen","Panel");
;},function () { return this['UI']=this['create']();
;},function () { return this['UI']['setTrans']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var str;
return DtlPromise.run(this,[function () { return str=(((("postion:absolute;left:"+(this['pos']['x']))+";top:")+(this['pos']['y']))+";");
;},function () { return this['element']['attr']("transform",(str))['attr']("data-trans",((((this['pos']['x'])+",")+(this['pos']['y']))));
;},function () { return this;
;}]);});
;},function () { return this['UI']['hide']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['hide']();
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['UI']['show']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['show']();
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['UI']['addAlias']("hide","die");
;},function () { return this['UI']['addAlias']("show","appear");
;},function () { return this['UI']['top']=((((this['Screen']['height?']())/(2)))-(20));
;},function () { return this['UI']['autoLayout']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['UILayout']['add']((this));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['last'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['moveTo']((((this['last']['right?']())+(10))),(this['last']['top?']()));
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['moveTo']((((-(this['Screen']['width?']())/(2))+(20))),(this['top']));
;}]);}));
;},function () { return this['UI']['last']=this;
;}]);});
;},function () { return this['UI']['moveTo']=dtlbind(this,function(left,top){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return this['UILayout']['remove']((this),(left),(top));
;},function () { return this;
;}]);});
;},function () { return this['UI']['moveBy']=dtlbind(this,function(dx,dy){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return this['moveTo']((((this['left?']())+dx)),(((this['top?']())+dy)));
;}]);});
;},function () { return this['UI']['left?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((this['element']['offset']())['left']-((this['UI']['container']['offset']())['left']));
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (0);
;}]);}));
;}]);});
;},function () { return this['UI']['addAlias']("left?","xpos?");
;},function () { return this['UI']['right?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((this['left?']())+(this['width?']()));
;}]);});
;},function () { return this['UI']['top?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return -(((this['element']['offset']())['top']-((this['UI']['container']['offset']())['top'])));
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (0);
;}]);}));
;}]);});
;},function () { return this['UI']['addAlias']("top?","ypos?");
;},function () { return this['UI']['bottom?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((this['top?']())-(this['height?']()));
;}]);});
;},function () { return this['UI']['width?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['outerWidth']();
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (0);
;}]);}));
;}]);});
;},function () { return this['UI']['height?']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['outerHeight']();
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (0);
;}]);}));
;}]);});
;},function () { return this['UI']['width']=dtlbind(this,function(w){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['width']((w));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['UI']['height']=dtlbind(this,function(w){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['height']((w));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['UI']['nextLine']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var top;
var left;
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['last'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['console']['log']("NL",(this['Screen']['width?']()),(this['last']['bottom?']()));
;},function () { return left=((-(this['Screen']['width?']())/(2))+(20));
;},function () { return top=this['last']['bottom?']();
;},function () { return this['moveTo']((left),(top));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['UI']['write']=dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['element']['get']((0)))['innerHTML']=this['num2str']((m));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['UI']['addAlias']("write","set");
;},function () { return this['UI']['add']=dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['write'](((((this['element']['get']((0)))['innerHTML'])+m)));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['UI']['newLine']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['add']("<br>");
;},function () { return this;
;}]);});
;},function () { return this['UI']['clear']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['write']("");
;}]);});
;},function () { return this['UI']['num2strDigits']=(1000000);
;},function () { return this['UI']['num2str']=dtlbind(this,function(v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var r;
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (v===this['null']);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return v="";
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (v===this['undef']);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return v="";
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((this['typeof']((v)))==="number");
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return v=(((this['window']['Math'])['round'](((v*this['num2strDigits']))))/this['num2strDigits']);
;}]);}));
;},function () { return (v+"");
;}]);});
;},function () { return this['UI']['int2str']=this['UI']['num2str'];
;},function () { return this['UI']['str2num']=dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var r;
return DtlPromise.run(this,[function () { return r=this['window']['parseFloat']((s));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (r===r);
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return r;
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return s;
;}]);}));
;}]);});
;},function () { return this['UI']['str2int']=this['UI']['str2num'];
;},function () { return this['UI']['readString']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['text']();
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return "";
;}]);}));
;}]);});
;},function () { return this['UI']['read']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['str2num']((this['readString']()));
;}]);});
;},function () { return this['UI']['addAlias']("read","get");
;},function () { return this['UI']['inc']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return by=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return by;
;}]);})['or'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (1);
;}]);}));
;},function () { return this['write'](((((this['read']())-(0))+by)));
;}]);});
;},function () { return this['UI']['addAlias']("inc","increment");
;},function () { return this['UI']['dec']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return by=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return by;
;}]);})['or'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (1);
;}]);}));
;},function () { return this['write']((((this['read']())-by)));
;}]);});
;},function () { return this['UI']['addAlias']("dec","decrement");
;},function () { return this['UI']['paint']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
var args;
var c;
return DtlPromise.run(this,[function () { return args=root['window']['Array']['prototype']['slice']['call']((_args));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (args['length']===(1));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return c=r;
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return c=this['Color']['create']((r),(g),(b));
;}]);}));
;},function () { return this['element']['css']("background-color",(c));
;},function () { return this;
;}]);});
;},function () { return this['UI']['fontColor']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
var args;
var c;
return DtlPromise.run(this,[function () { return args=root['window']['Array']['prototype']['slice']['call']((_args));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (args['length']===(1));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return c=r;
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return c=this['Color']['create']((r),(g),(b));
;}]);}));
;},function () { return this['element']['css']("color",(c));
;},function () { return this;
;}]);});
;},function () { return this['UI']['fontSize']=dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['element']['css']("font-size",(((s/(10))+"em")));
;},function () { return this;
;}]);});
;},function () { return this['UI']['size']=dtlbind(this,function(w,h){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return this['element']['css']("width",((w+"px")))['css']("height",((h+"px")));
;},function () { return this;
;}]);});
;},function () { return this['UI']['attachEvent']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);});
;},function () { return this['UI']['container']=this['$']['create']("<div>")['appendTo']("body")['css']("position","absolute")['css']("left",(((this['Screen']['width?']())/(2))))['css']("top",(((this['Screen']['height?']())/(2))));
;},function () { return this['$']['create']((this['window']))['resize']((dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['UI']['container']['css']("left",(((this['Screen']['width?']())/(2))))['css']("top",(((this['Screen']['height?']())/(2))));
;}]);})['bind']((this))));
;},function () { return this['UILayout']=this['create']();
;},function () { return this['UILayout']['space']=(20);
;},function () { return this['UILayout']['initElem']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']=this['$']['create']("<div>")['appendTo']((this['UI']['container']));
;},function () { return this['element']['css']("white-space","nowrap")['css']("position","absolute")['css']("left",(((-(this['Screen']['width?']())/(2))+this['space'])))['css']("top",(((-(this['Screen']['height?']())/(2))+this['space'])));
;},function () { return this['$']['create']((this['window']))['resize']((dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['css']("left",(((-(this['Screen']['width?']())/(2))+this['space'])))['css']("top",(((-(this['Screen']['height?']())/(2))+this['space'])));
;}]);})['bind']((this))));
;}]);});
;},function () { return this['UILayout']['initElem']();
;},function () { return this['UILayout']['add']=dtlbind(this,function(ui){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return ui['element']['remove']();
;},function () { return ui['inUILayout']=this;
;},function () { return this['element']['append']((ui['element']));
;},function () { return ui['attachEvent']();
;},function () { return ui['element']['css']("position","static");
;}]);});
;},function () { return this['UILayout']['remove']=dtlbind(this,function(ui,left,top){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ui['inUILayout'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ui['element']['remove']();
;},function () { return ui['inUILayout']=this['false'];
;},function () { return this['UI']['container']['append']((ui['element']));
;},function () { return ui['attachEvent']();
;}]);}));
;},function () { return ui['element']['css']("position","absolute")['css']("left",(left))['css']("top",(-top));
;}]);});
;},function () { return this['UILayout']['br']=dtlbind(this,function(ui){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['$']['create']("<br>")['insertBefore']((ui['element']));
;}]);});
;},function () { return this['Label']=this['UI']['create']();
;},function () { return this['Label']['left']=(0);
;},function () { return this['Label']['initialize']=dtlbind(this,function(label){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var t;
return DtlPromise.run(this,[function () { return t=this;
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (label===this['undef']);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return label=this['read']();
;}]);}));
;},function () { return this['element']=this['$']['create']("<span>")['text']((this['num2str']((label))))['css']("font-size","1.0em")['css']("vertical-align","top")['css']("white-space","nowrap");
;},function () { return this['autoLayout']();
;}]);});
;},function () { return this['Label']['fontColor']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
var args;
var c;
return DtlPromise.run(this,[function () { return args=root['window']['Array']['prototype']['slice']['call']((_args));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (args['length']===(1));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return c=r;
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return c=this['Color']['create']((r),(g),(b));
;}]);}));
;},function () { return this['element']['css']("color",(c));
;},function () { return this;
;}]);});
;},function () { return this['Label']['fontSize']=dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['element']['css']("font-size",(((s/(10))+"em")));
;},function () { return this;
;}]);});
;},function () { return this['Button']=this['UI']['create']();
;},function () { return this['Button']['action']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);});
;},function () { return this['Button']['left']=(0);
;},function () { return this['Button']['attachEvent']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
return DtlPromise.run(this,[function () { return t=this;
;},function () { return this['element']['click'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return t['action']();
;}]);}));
;}]);});
;},function () { return this['Button']['initialize']=dtlbind(this,function(label,key){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var t;
return DtlPromise.run(this,[function () { return t=this;
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (label===this['undef']);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return label=this['read']();
;}]);}));
;},function () { return this['element']=this['$']['create']("<button>")['text']((this['num2str']((label))))['css']("vertical-align","top")['css']("white-space","nowrap");
;},function () { return this['autoLayout']();
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return key;
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return root['window']['$'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return root['window']['document']['addEventListener']("keydown",dtlbind(this,function(k){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (k['keyCode']===(root['Button']['keyCodeDict']['read']((((key+""))['toUpperCase']()))));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return t['action']();
;}]);}));
;}]);}),(root['true']));
;}]);}));
;}]);}));
;}]);});
;},function () { return this['Button']['setAction']=dtlbind(this,function(a){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['action']=a;
;},function () { return this;
;}]);});
;},function () { return this['Button']['keyCodeDict']=this['Dict']['create']();
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var arr;
return DtlPromise.run(this,[function () { return arr=this['Array']['create']("0","1","2","3","4","5","6","7","8","9");
;},function () { return dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['Button']['keyCodeDict']['write']((arr['get']((n))),((n+(47))));
;}]);})['repeat']((arr['length?']()));
;},function () { return arr=this['Array']['create']("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
;},function () { return dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['Button']['keyCodeDict']['write']((arr['get']((n))),((n+(64))));
;}]);})['repeat']((arr['length?']()));
;},function () { return arr=this['Array']['create']("F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12");
;},function () { return dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['Button']['keyCodeDict']['write']((arr['get']((n))),((n+(111))));
;}]);})['repeat']((arr['length?']()));
;},function () { return this['Button']['keyCodeDict']['write']("ESCAPE",(27))['write']("MINUS",(189))['write']("BACK_SLASH",(220))['write']("OPEN_BRACKET",(219))['write']("CLOSE_BRACKET",(221))['write']("SEMICOLON",(186))['write']("COMMA",(188))['write']("PERIOD",(190))['write']("SLASH",(191))['write']("ENTER",(13))['write']("PAGE_UP",(33))['write']("PAGE_DOWN",(34))['write']("END",(35))['write']("HOME",(36))['write']("LEFT",(37))['write']("UP",(38))['write']("RIGHT",(39))['write']("DOWN",(40))['write']("SPACE",(32))['write']("SHIFT",(16))['write']("CTRL",(17));
;}]);})['execute']();
;},function () { return this['Button']['inc']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var label;
return DtlPromise.run(this,[function () { return label=(this['element']['get']((0)))['innerHTML'];
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return label['match']((root['window']['RegExp']("^([0-9０-９]+)$")));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['text']((((root['window']['parseInt']((label)))+(1))));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['Field']=this['UI']['create']();
;},function () { return this['Field']['action']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);});
;},function () { return this['Field']['attachEvent']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
return DtlPromise.run(this,[function () { return t=this;
;},function () { return this['element']['keypress'](dtlbind(this,function(key){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (key['which']===(13));
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return t['action']((t['readString']()));
;}]);}));
;}]);}));
;}]);});
;},function () { return this['Field']['setAction']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['action']=f;
;},function () { return this;
;}]);});
;},function () { return this['Field']['initialize']=dtlbind(this,function(label){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (label===this['undef']);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return label=this['read']();
;}]);}));
;},function () { return this['element']=this['$']['create']("<input>")['val']((this['num2str']((label))))['css']("vertical-align","top")['css']("white-space","nowrap");
;},function () { return this['autoLayout']();
;}]);});
;},function () { return this['Field']['write']=dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['val']((this['num2str']((m))));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['Field']['readString']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['val']();
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return "";
;}]);}));
;}]);});
;},function () { return this['TextArea']=this['UI']['create']();
;},function () { return this['ListBox']=this['TextArea']['create']();
;},function () { return this['TextArea']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var label;
return DtlPromise.run(this,[function () { return label=this['read']();
;},function () { return this['manualRow']=this['false'];
;},function () { return this['manualCol']=this['false'];
;},function () { return this['element']=this['$']['create']("<textarea>")['val']((label))['css']("vertical-align","top");
;},function () { return this['element']['attr']("readonly",(this['isReadOnly']));
;},function () { return this['autoResize']();
;},function () { return this['autoLayout']();
;},function () { return this['writeLn']['apply']((this),(_args));
;}]);});
;},function () { return this['TextArea']['autoNewLine']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (f===this['undef']);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return f=this['true'];
;}]);}));
;},function () { return this['isAutoBR']=f;
;},function () { return this;
;}]);});
;},function () { return this['TextArea']['addAlias']("autoNewLine","autoBR");
;},function () { return this['TextArea']['setReadOnly']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['isReadOnly']=f;
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['attr']("readonly",(f));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['TextArea']['readOnly']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['setReadOnly']((this['true']));
;}]);});
;},function () { return this['TextArea']['writable']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['setReadOnly']((this['false']));
;}]);});
;},function () { return this['TextArea']['addAlias']("writable","readWrite");
;},function () { return this['ListBox']['readOnly']()['autoBR']();
;},function () { return this['TextArea']['mblen']=dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var i;
var c;
var r;
return DtlPromise.run(this,[function () { return i=(0);
;},function () { return r=(0);
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (i<(s['length']));
;}]);})['while']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return c=s['charCodeAt']((i));
;},function () { return r=(r+(dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (c>=(128));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (2);
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (1);
;}]);}))));
;},function () { return i=(i+(1));
;}]);}));
;},function () { return r;
;}]);});
;},function () { return this['TextArea']['autoResize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var r;
var c;
return DtlPromise.run(this,[function () { return r=(1);
;},function () { return c=(1);
;},function () { return this['readString']()['split']("\n")['each'](dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var l;
return DtlPromise.run(this,[function () { return l=this['mblen']((s));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (l>c);
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return c=l;
;}]);}));
;},function () { return r=(r+(1));
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['manualRow'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['attr']("rows",(r));
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['manualCol'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['attr']("cols",(c));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['TextArea']['setRow']=dtlbind(this,function(r){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['element']['attr']("rows",(r));
;},function () { return this['manualRow']=this['true'];
;},function () { return this;
;}]);});
;},function () { return this['TextArea']['setCol']=dtlbind(this,function(c){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['element']['attr']("cols",(c));
;},function () { return this['manualCol']=this['true'];
;},function () { return this;
;}]);});
;},function () { return this['TextArea']['overwrite']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var a;
var buf;
return DtlPromise.run(this,[function () { return this['clear']();
;},function () { return this['writeLn']['apply']((this),(_args));
;}]);});
;},function () { return this['TextArea']['readString']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['val']();
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return "";
;}]);}));
;}]);});
;},function () { return this['TextArea']['read']=this['TextArea']['readString'];
;},function () { return this['TextArea']['write']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['Array']['prototype']['slice'])['call']((_args))['each'](dtlbind(this,function(cont){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['_write1']((cont),(this['isAutoBR']));
;}]);}));
;},function () { return this['autoResize']();
;}]);});
;},function () { return this['TextArea']['rawOverwrite']=dtlbind(this,function(c){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['val']((c));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['TextArea']['rawAppend']=dtlbind(this,function(cont){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['rawOverwrite']((((this['readString']())+(this['num2str']((cont))))));
;}]);});
;},function () { return this['TextArea']['writeLn']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['Array']['prototype']['slice'])['call']((_args))['each'](dtlbind(this,function(cont){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['_write1']((cont),(this['true']));
;}]);}));
;},function () { return this['autoResize']();
;}]);});
;},function () { return this['TextArea']['_write1']=dtlbind(this,function(cont,br){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['instanceof']((cont),(this['Array']));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return cont['each'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['_write1']((e),(br));
;}]);}));
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['rawAppend']((cont));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return br;
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['rawAppend']("\n");
;}]);}));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['TextArea']['newLine']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['rawAppend'](("\n"));
;}]);});
;},function () { return this['TextArea']['clear']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['rawOverwrite']("");
;},function () { return this['autoResize']();
;}]);});
;},function () { return this['TextArea']['readAsArray']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['read']()['split']("\n")['select'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return (e!=="");
;}]);}))['map']((dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['str2num']((e));
;}]);})['bind']((this))));
;}]);});
;},function () { return this['TextArea']['changeLine']=dtlbind(this,function(no,line){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return this['overwrite']((this['readAsArray']()['set']((no),(line))));
;}]);});
;},function () { return this['SelectMenu']=this['UI']['create']();
;},function () { return this['SelectMenu']['action']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);});
;},function () { return this['SelectMenu']['attachEvent']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
return DtlPromise.run(this,[function () { return t=this;
;},function () { return this['element']['change'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var num;
var txt;
return DtlPromise.run(this,[function () { return txt=t['element']['find']("option:selected")['text']();
;},function () { return num=t['element']['val']();
;},function () { return t['action']((txt),(num));
;}]);}));
;},function () { return this['element']['click']((dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['val']("0");
;}]);})['bind']((this))));
;}]);});
;},function () { return this['SelectMenu']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
return DtlPromise.run(this,[function () { return args=root['window']['Array']['prototype']['slice']['call']((_args));
;},function () { return this['optNum']=(0);
;},function () { return this['element']=this['$']['create']("<select>")['val']((this['num2str']((this['label']))))['css']("min-width","100px")['css']("font-size","1.3em")['css']("vertical-align","top")['css']("white-space","nowrap");
;},function () { return this['autoLayout']();
;},function () { return args['each'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['add']((e));
;}]);}));
;}]);});
;},function () { return this['SelectMenu']['add']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var opt;
return DtlPromise.run(this,[function () { return this['args']=root['window']['Array']['prototype']['slice']['call']((_args));
;},function () { return this['args']['each'](dtlbind(this,function(e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return root['window']['Array']['isArray']((e));
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return e['each'](dtlbind(this,function(e_e){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['add']((e_e));
;}]);}));
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return opt=this['$']['create']("<option>");
;},function () { return opt['attr']("value",(this['optNum']));
;},function () { return opt['text']((e));
;},function () { return this['optNum']=(this['optNum']+(1));
;},function () { return this['element']['append']((opt));
;}]);}));
;}]);}));
;},function () { return this;
;}]);});
;}]);}).checkerror().apply(root,[]);
//# sourceMappingURL=UI.js.map
