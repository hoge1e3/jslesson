root.system.run(function(){return AsyncByGenerator.toVal((function*() {this['Assets']=(yield* AsyncByGenerator.toGen(this['create']()));
this['Assets']['list']=dtlbind(this,function(context){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return AsyncByGenerator.toVal((function*() {this['ep']=(yield* AsyncByGenerator.toGen(this['endPoint']()));
this['ls']=(yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(this['Ajax']['create'](((this['ep']+"a.php?Asset/list")))))['data']((context))))['get']()));
return (yield* AsyncByGenerator.toGen(this['ls']['map'](dtlbind(this,function(s){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var a;
var n;
return AsyncByGenerator.toVal((function*() {a=(yield* AsyncByGenerator.toGen(s['split']("/")));
n=(yield* AsyncByGenerator.toGen(a['get']((2))));
return ((context+"/")+n);
}).apply(this));}))));
}).apply(this));});
this['Assets']['endPoint']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return AsyncByGenerator.toVal((function*() {return this['window']['BitArrow']['serverTop'];
}).apply(this));});
this['Assets']['load']=dtlbind(this,function(path){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var a;
var c;
var f;
return AsyncByGenerator.toVal((function*() {a=(yield* AsyncByGenerator.toGen(path['split']("/")));
c=(yield* AsyncByGenerator.toGen(a['get']((1))));
f=(yield* AsyncByGenerator.toGen(a['get']((2))));
this['ep']=(yield* AsyncByGenerator.toGen(this['endPoint']()));
return (yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(this['Ajax']['create'](((this['ep']+"a.php?Asset/download")))))['data']("context",(c))))['data']("filename",(f))))['get']()));
}).apply(this));});
return this['Assets']['save']=dtlbind(this,function(path,content){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var a;
var c;
var f;
return AsyncByGenerator.toVal((function*() {a=(yield* AsyncByGenerator.toGen(path['split']("/")));
c=(yield* AsyncByGenerator.toGen(a['get']((1))));
f=(yield* AsyncByGenerator.toGen(a['get']((2))));
this['ep']=(yield* AsyncByGenerator.toGen(this['endPoint']()));
return (yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen((yield* AsyncByGenerator.toGen(this['Ajax']['create'](((this['ep']+"a.php?Asset/upload")))))['data']("context",(c))))['data']("filename",(f))))['data']("content",(content))))['post']()));
}).apply(this));});
}).apply(this));});
//# sourceMappingURL=Assets.js.map
