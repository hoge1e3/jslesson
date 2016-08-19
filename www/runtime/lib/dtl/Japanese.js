(function(){this['aa']=this['root']['addAlias'];
this['ルート']=this['root'];
this['はい']=root['true'];
this['いいえ']=root['false'];
this['色名']=dtlbind(this,function(x){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="黒");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;
return x=this['black'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="赤");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;
return x=this['red'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="緑");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;
return x=this['green'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="青");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;
return x=this['blue'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="ピンク");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;
return x=this['pink'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="紫");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;
return x=this['magenta'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="水色");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;
return x=this['cyan'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="黄色");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;
return x=this['yellow'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (x==="白");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;
return x=this['white'];
}));
return x;
});
this['addAlias']("blue","青");
this['addAlias']("red","赤");
this['addAlias']("green","緑");
this['addAlias']("pink","ピンク");
this['addAlias']("magenta","紫");
this['addAlias']("cyan","水色");
this['addAlias']("cyan","水");
this['addAlias']("yellow","黄色");
this['addAlias']("yellow","黄");
this['addAlias']("white","白");
this['addAlias']("black","黒");
this['addAlias']("Color","色");
this['Color']['addAlias']("darken","暗くする");
this['Color']['addAlias']("brighten","明るくする");
this['Color']['addAlias']("randomCreate","ランダムに作る");
this['addAlias']("Ink","絵の具");
this['Ink']['addAlias']("mix","混ぜる");
this['addAlias']("Light","光");
this['Light']['addAlias']("mix","混ぜる");
this['addAlias']("create","作る");
this['addAlias']("create","만들다");
this['Actor']['addAlias']("forward","歩く")['addAlias']("turnRight","右回り")['addAlias']("turnLeft","左回り")['addAlias']("moveTo","位置")['addAlias']("moveBy","移動する")['addAlias']("setDir","向き")['addAlias']("getDir","向き?")['addAlias']("bounce","跳ね返る")['addAlias']("xpos?","横の位置?")['addAlias']("ypos?","縦の位置?")['addAlias']("die","消える")['addAlias']("appear","現れる")['addAlias']("collision","衝突");
this['addAlias']("turtle","タートル");
this['タートル']['図形を作る']=dtlbind(this,function(x){
var self=this;var 自分=self;
return this['makeFigure']((this['色名']((x))));
});
this['タートル']['戻る']=dtlbind(this,function(x){
var self=this;var 自分=self;
return this['forward']((-x));
});
this['タートル']['ペンあり']=this['turtle']['penDown'];
this['タートル']['ペンなし']=this['turtle']['penUp'];
this['タートル']['線の色']=this['turtle']['lineColor'];
this['タートル']['線の太さ']=this['turtle']['lineWidth'];
this['turtle']['歩く']=this['turtle']['forward'];
this['turtle']['変身する']=this['turtle']['change'];
this['タートル']['円']=dtlbind(this,function(r){
var self=this;var 自分=self;
var d;
d=(r*(0.1745328));
this['戻る'](((d/(2))));
dtlbind(this,function(){
var self=this;var 自分=self;
return this['歩く']((d))['右回り']((10));
})['repeat']((36));
return this['歩く'](((d/(2))));
});
this['turtle']['circle']=this['タートル']['円'];
this['turtle']['閉じる']=this['turtle']['close'];
this['図形']=this['Figure'];
this['図形']['塗る']=dtlbind(this,function(x){
var self=this;var 自分=self;
return this['paint']((this['色名']((x))));
});
this['図形']['結合する']=this['Figure']['makeGroup'];
this['図形']['結合']=this['Figure']['makeGroup'];
this['HTML']['読む']=dtlbind(this,function(x){
var self=this;var 自分=self;
return this['get']((x));
});
this['HTML']['位置']=dtlbind(this,function(x,y){
var self=this;var 自分=self;
return this['move']((x),(y));
});
this['addAlias']("Timer","タイマー");
this['Timer']['addAlias']("execute","実行");
this['Timer']['addAlias']("next_execute","次に実行");
this['Timer']['addAlias']("stop","中断");
this['Timer']['addAlias']("after_execute","完了時実行");
this['Timer']['addAlias']("after_execute","終了時実行");
this['Timer']['addAlias']("after_execute","最後に実行");
this['Timer']['addAlias']("times","回数");
this['Timer']['addAlias']("interval","間隔");
this['Timer']['addAlias']("duration","時間");
this['UI']['addAlias']("nextLine","次の行")['addAlias']("inc","増やす")['addAlias']("dec","減らす")['addAlias']("read","読む")['addAlias']("moveTo","位置")['addAlias']("moveTo","position")['addAlias']("moveBy","移動する")['addAlias']("width?","幅?")['addAlias']("height?","高さ?")['addAlias']("clear","クリア")['addAlias']("write","書く")['addAlias']("add","追加")['addAlias']("newLine","改行");
this['ボタン']=this['Button'];
this['Button']['addAlias']("action","動作");
this['Button']['addAlias']("width?","幅?");
this['Button']['addAlias']("height?","高さ?");
this['Button']['addAlias']("size","大きさ");
this['Button']['addAlias']("fontSize","文字サイズ");
this['Button']['addAlias']("paint","塗る");
this['Button']['addAlias']("fontColor","文字色");
this['addAlias']("Label","ラベル");
this['Label']['addAlias']("fontColor","文字色");
this['フィールド']=this['Field'];
this['テキストエリア']=this['TextArea'];
this['TextArea']['addAlias']("append","追加する")['addAlias']("append","追加")['addAlias']("appendLn","追加して改行")['addAlias']("newLine","改行")['addAlias']("newLine","改行する");
this['addAlias']("Screen","画面");
this['Screen']['addAlias']("paint","塗る")['addAlias']("width?","幅?")['addAlias']("height?","高さ?");
this['addAlias']("and","全部");
this['aa']['call']((this['and']),"true","本当");
this['addAlias']("or","どれか");
this['aa']['call']((this['or']),"true","本当");
this['システム']=this['system'];
this['aa']['call']((this['system']),"systemTime","システム時間?");
this['aa']['call']((this['system']),"systemTIme","システム時間");
this['aa']['call']((this['system']),"time","時刻?");
this['aa']['call']((this['system']),"time","時刻");
this['aa']['call']((this['system']),"today","日時?");
this['aa']['call']((this['system']),"today","日時");
this['aa']['call']((this['system']),"day","曜日?");
this['aa']['call']((this['system']),"day","曜日");
this['aa']['call']((this['system']),"year","年?");
this['aa']['call']((this['system']),"year","年");
this['aa']['call']((this['system']),"month","月?");
this['aa']['call']((this['system']),"month","月");
this['aa']['call']((this['system']),"date","日?");
this['aa']['call']((this['system']),"date","日");
this['aa']['call']((this['system']),"hours","時?");
this['aa']['call']((this['system']),"hours","時");
this['aa']['call']((this['system']),"minutes","分?");
this['aa']['call']((this['system']),"minutes","分");
this['aa']['call']((this['system']),"seconds","秒?");
this['aa']['call']((this['system']),"seconds","秒");
this['文字列']=this['window']['String'];
this['sp']=this['window']['String']['prototype'];
this['aa']['call']((this['sp']),"add","連結");
this['aa']['call']((this['sp']),"contain?","含む?");
this['aa']['call']((this['sp']),"substr","部分");
this['aa']['call']((this['sp']),"length?","長さ?");
this['aa']['call']((this['sp']),"split","分割");
this['aa']['call']((this['sp']),"replace","置き換える");
this['aa']['call']((this['sp']),"allReplace","全部置き換える");
this['配列']=this['window']['Array'];
this['ap']=this['window']['Array']['prototype'];
this['aa']['call']((this['ap']),"create","作る");
this['aa']['call']((this['ap']),"get","読む");
this['aa']['call']((this['ap']),"set","上書き");
this['aa']['call']((this['ap']),"add","書く");
this['aa']['call']((this['ap']),"remove","消す");
this['aa']['call']((this['ap']),"removepos","位置で消す");
this['aa']['call']((this['ap']),"insert","挿入");
this['aa']['call']((this['ap']),"each","それぞれ実行");
this['aa']['call']((this['ap']),"length?","要素数?");
this['aa']['call']((this['ap']),"concat","連結");
this['aa']['call']((this['ap']),"randomSelect","ランダムに選ぶ");
this['aa']['call']((this['ap']),"each","それぞれ実行");
this['aa']['call']((this['ap']),"select","選ぶ");
this['aa']['call']((this['ap']),"max","最大");
this['aa']['call']((this['ap']),"min","最小");
this['aa']['call']((this['ap']),"bond","結合");
this['aa']['call']((this['ap']),"process","加工");
this['ブロック']=this['window']['Function'];
this['fp']=this['window']['Function']['prototype'];
this['aa']['call']((this['fp']),"execute","実行");
this['aa']['call']((this['fp']),"repeat","繰り返す");
this['aa']['call']((this['fp']),"while","の間");
this['aa']['call']((this['fp']),"then","なら");
this['_true']['addAlias']("else","そうでなければ")['addAlias']("execute","実行")['addAlias']("then","なら");
this['_false']['addAlias']("else","そうでなければ")['addAlias']("execute","実行")['addAlias']("then","なら");
return this['_done']['addAlias']("else","そうでなければ")['addAlias']("execute","実行")['addAlias']("then","なら");
}).checkerror().apply(root,[]);
//# sourceMappingURL=Japanese.js.map
