(function(){this.色名=dtlbind(this,function(x){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="黒");
}).なら().実行(dtlbind(this,function(){
var self=this;var 自分=self;
return x="black";
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="赤");
}).なら().実行(dtlbind(this,function(){
var self=this;var 自分=self;
return x="red";
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="緑");
}).なら().実行(dtlbind(this,function(){
var self=this;var 自分=self;
return x="green";
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="青");
}).なら().実行(dtlbind(this,function(){
var self=this;var 自分=self;
return x="blue";
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="ピンク");
}).なら().実行(dtlbind(this,function(){
var self=this;var 自分=self;
return x="pink";
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="紫");
}).なら().実行(dtlbind(this,function(){
var self=this;var 自分=self;
return x="magenta";
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="水色");
}).なら().実行(dtlbind(this,function(){
var self=this;var 自分=self;
return x="cyan";
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="黄色");
}).なら().実行(dtlbind(this,function(){
var self=this;var 自分=self;
return x="yellow";
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="白");
}).なら().実行(dtlbind(this,function(){
var self=this;var 自分=self;
return x="white";
}));
return x;
});
this.青="blue";
this.赤="red";
this.緑="green";
this.青="blue";
this.ピンク="pink";
this.紫="magenta";
this.水色="cyan";
this.黄色="yellow";
this.白="white";
this.addAlias("create","作る");
this.addAlias("create","만들다");
this.Actor.addAlias("forward","歩く").addAlias("turnRight","右回り").addAlias("turnLeft","左回り").addAlias("moveTo","位置").addAlias("moveBy","移動する").addAlias("setDir","向き").addAlias("bounce","跳ね返る").addAlias("die","消える").addAlias("collision","衝突");
this.addAlias("turtle","タートル");
this.タートル.図形を作る=dtlbind(this,function(x){
var self=this;var 自分=self;
return this.makeFigure((this.色名((x))));
});
this.タートル.戻る=dtlbind(this,function(x){
var self=this;var 自分=self;
return this.forward((-x));
});
this.タートル.ペンあり=this.turtle.penDown;
this.タートル.ペンなし=this.turtle.penUp;
this.タートル.線の色=this.turtle.lineColor;
this.タートル.線の太さ=this.turtle.lineWidth;
this.turtle.歩く=this.turtle.forward;
this.turtle.変身する=this.turtle.change;
this.タートル.円=dtlbind(this,function(r){
var self=this;var 自分=self;
var d;
d=(r*(0.1745328));
this.戻る(((d/(2))));
dtlbind(this,function(){
var self=this;var 自分=self;
return this.歩く((d)).右回り((10));
}).repeat((36));
return this.歩く(((d/(2))));
});
this.turtle.circle=this.タートル.円;
this.turtle.閉じる=this.turtle.close;
this.図形=this.Figure;
this.図形.塗る=dtlbind(this,function(x){
var self=this;var 自分=self;
return this.paint((this.色名((x))));
});
this.図形.結合する=this.Figure.makeGroup;
this.HTML.読む=dtlbind(this,function(x){
var self=this;var 自分=self;
return this.get((x));
});
this.HTML.位置=dtlbind(this,function(x,y){
var self=this;var 自分=self;
return this.move((x),(y));
});
this.タイマー=this.timer;
this.タイマー.作る=dtlbind(this,function(){
var self=this;var 自分=self;
return this.create();
});
this.タイマー.実行=dtlbind(this,function(x){
var self=this;var 自分=self;
return this.execute((x));
});
this.タイマー.中断=this.timer.stop;
this.ボタン=this.Button;
this.Button.addAlias("action","動作");
this.フィールド=this.Field;
return this.Field.増やす=this.Field.inc;
}).checkerror().apply(root,[]);
//# sourceMappingURL=Japanese.js.map
