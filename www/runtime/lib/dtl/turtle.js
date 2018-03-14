(function(){return DtlPromise.run(this,[function () { return this['turtle']=this['Actor']['create']();
;},function () { return this['Turtle']=this['turtle'];
;},function () { return this['Turtle']['baseURL']=(this['window']['runtimePath']+"images/");
;},function () { return this['Turtle']['img']="ayumi.gif";
;},function () { return this['turtle']['action']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);});
;},function () { return this['turtle']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var t;
return DtlPromise.run(this,[function () { return t=this;
;},function () { return this['element']=this['createSVGElem']("image");
;},function () { return this['element']['get']((0))['setAttributeNS']("http://www.w3.org/1999/xlink","href",((this['baseURL']+this['img'])));
;},function () { return this['adjustImage']();
;},function () { return this['getImageSize'](((this['baseURL']+this['img'])));
;},function () { return this['element']['attr']("transform","scale(1,-1)");
;},function () { return this['element']['click'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return t['action']();
;}]);}));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['_lineCol'];
;}]);})['else']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['lineColor']("black");
;}]);}));
;},function () { return this['newLineG']();
;},function () { return this['isShowing']=this['false'];
;},function () { return this['appear']();
;},function () { return this['pos']=this['pos']['add']((this['Vec2']['O']));
;},function () { return this['dir']=this['dir'];
;}]);});
;},function () { return this['turtle']['width']=(32);
;},function () { return this['turtle']['height']=(32);
;},function () { return this['turtle']['_lineWidth']=(3);
;},function () { return this['turtle']['isPenDown']=this['true'];
;},function () { return this['turtle']['adjustImage']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['element']['attr']("width",((this['width']+"px")))['attr']("height",((this['height']+"px")))['attr']("x",((-this['width']/(2))))['attr']("y",((-this['height']/(2))));
;}]);});
;},function () { return this['turtle']['getImageSize']=dtlbind(this,function(url){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var t;
return DtlPromise.run(this,[function () { return t=this;
;},function () { return this['$']['create']("<img>")['css']("display","none")['load'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var j;
return DtlPromise.run(this,[function () { return j=(t['$'])['create']((this));
;},function () { return t['width']=j['width']();
;},function () { return t['height']=j['height']();
;},function () { return t['adjustImage']();
;},function () { return j['remove']();
;}]);}))['attr']("src",(url))['appendTo']("body");
;}]);});
;},function () { return this['turtle']['newLineG']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['lineG']=this['createSVGElem']("g")['appendTo']((this['svg_g']));
;},function () { return this['lineG']['attr']("transform",((((("translate("+(this['pos']['x']))+" ")+(this['pos']['y']))+")")));
;},function () { return this['lineOrig']=this['pos'];
;}]);});
;},function () { return this['turtle']['addPath']=dtlbind(this,function(pos1,pos2){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var line;
return DtlPromise.run(this,[function () { return pos1=pos1['sub']((this['lineOrig']));
;},function () { return pos2=pos2['sub']((this['lineOrig']));
;},function () { return line=this['createSVGElem']("line")['attr']("x1",(pos1['x']))['attr']("y1",(pos1['y']))['attr']("x2",(pos2['x']))['attr']("y2",(pos2['y']))['attr']("style",(((("stroke:"+this['_lineCol'])+";stroke-width:")+this['_lineWidth'])))['attr']("data-width",(this['_lineWidth']))['appendTo']((this['lineG']));
;},function () { return this;
;}]);});
;},function () { return this['turtle']['addPathAfterAction']=dtlbind(this,function(a){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var pos1;
return DtlPromise.run(this,[function () { return pos1=this['pos'];
;},function () { return a['execute']();
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['isPenDown'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['addPath']((pos1),(this['pos']));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['turtle']['forward']=dtlbind(this,function(by){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['addPathAfterAction'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['Actor']['forward'])['call']((this),(by));
;}]);}));
;}]);});
;},function () { return this['turtle']['moveTo']=dtlbind(this,function(x,y){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return this['addPathAfterAction'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['Actor']['moveTo'])['call']((this),(x),(y));
;}]);}));
;}]);});
;},function () { return this['turtle']['circle']=dtlbind(this,function(r){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var d;
return DtlPromise.run(this,[function () { return d=(r*(0.1745328));
;},function () { return this['backward'](((d/(2))));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['forward']((d))['rightTurn']((10));
;}]);})['repeat']((36));
;},function () { return this['forward'](((d/(2))));
;}]);});
;},function () { return this['turtle']['closePath']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['isPenDown'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['moveTo']((this['lineOrig']['x']),(this['lineOrig']['y']));
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['turtle']['addAlias']("closePath","close");
;},function () { return this['turtle']['lineColor']=dtlbind(this,function(col){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return col;
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['_lineCol']=col;
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['turtle']['lineWidth']=dtlbind(this,function(w){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return w=this['num']((w));
;},function () { return this['_lineWidth']=w;
;},function () { return this;
;}]);});
;},function () { return this['turtle']['makeFigure']=dtlbind(this,function(col){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var r;
return DtlPromise.run(this,[function () { return r=this['Figure']['create']((this));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return col;
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return r['paint']((col));
;}]);}));
;},function () { return this['newLineG']();
;},function () { return r;
;}]);});
;},function () { return this['turtle']['paint']=dtlbind(this,function(col){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['makeFigure']((col));
;}]);});
;},function () { return this['turtle']['penDown']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['isPenDown'];
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['isPenDown']=this['true'];
;},function () { return this['newLineG']();
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['turtle']['penUp']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['isPenDown']=this['false'];
;},function () { return this;
;}]);});
;},function () { return this['turtle']['setShape']=dtlbind(this,function(url){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return this['img']=url;
;},function () { return url=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return url['match']("https?");
;}]);})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return url;
;}]);}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return (this['baseURL']+url);
;}]);}));
;},function () { return this['element']['get']((0))['setAttributeNS']("http://www.w3.org/1999/xlink","href",(url));
;},function () { return this['getImageSize']((url));
;},function () { return this;
;}]);});
;},function () { return this['turtle']['addAlias']("setShape","change");
;},function () { return this['turtle']['setTrans']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var str;
return DtlPromise.run(this,[function () { return str=(((("translate("+(this['pos']['x']))+" ")+(this['pos']['y']))+") ");
;},function () { return str=(((str+"rotate(")+this['dir'])+") ");
;},function () { return str=(((((str+"scale(")+this['_scale'])+" ")+(((0)-this['_scale'])))+") ");
;},function () { return this['element']['attr']("transform",(str))['attr']("data-trans",((((((this['pos']['x'])+",")+(this['pos']['y']))+",")+this['dir'])));
;},function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['isShowing'];
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['checkCrash']();
;}]);}));
;},function () { return this;
;}]);});
;},function () { return this['turtle']['polygon']=dtlbind(this,function(d,n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['forward']((d))['rightturn']((((360)/n)));
;}]);})['repeat']((n));
;}]);});
;},function () { return root['action']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);});
;},function () { return root['action']['isEventHandler']=this['true'];
;},function () { return root['click']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[]);});
;},function () { return root['click']['isEventHandler']=this['true'];
;},function () { return this['turtle']['setAction']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return DtlPromise.run(this,[function () { return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return ((this['typeof']((f)))==="function");
;}]);})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return DtlPromise.run(this,[function () { return this['action']=f;
;}]);}));
;},function () { return this;
;}]);});
;}]);}).checkerror().apply(root,[]);
//# sourceMappingURL=Turtle.js.map
