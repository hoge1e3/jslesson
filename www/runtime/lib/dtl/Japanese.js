(function(){return dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['window']['localStorage']['noLocalize'])!=="1");
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
var aa;
var fp;
var ap;
var bp;
var np;
var sp;
aa=this['root']['addAlias'];
this['ルート']=this['root'];
this['はい']=root['true'];
this['いいえ']=root['false'];
this['真']=root['true'];
this['偽']=root['false'];
this['addAlias']("initialize","初期化");
this['addAlias']("pi","円周率");
this['addAlias']("dq","ダブルクォート","ダブルクォーテーション");
this['addAlias']("dq","ダブルクオート","ダブルクオーテーション");
this['addAlias']("ldq","左ダブルクォート","左ダブルクォーテーション");
this['addAlias']("ldq","左ダブルクオート","左ダブルクオーテーション");
this['addAlias']("rdq","右ダブルクォート","右ダブルクォーテーション");
this['addAlias']("rdq","右ダブルクオート","右ダブルクオーテーション");
this['addAlias']("ldb","左二重鉤括弧","左二重かぎ括弧");
this['addAlias']("rdb","右二重鉤括弧","右二重かぎ括弧");
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
this['Color']['addAlias']("randomCreate","ランダムに作る")['addAlias']("toHalfOpacity","半透明にする")['addAlias']("toFullOpacity","不透明にする");
this['addAlias']("Ink","絵の具");
this['Ink']['addAlias']("mix","混ぜる");
this['addAlias']("Light","光");
this['Light']['addAlias']("mix","混ぜる");
this['addAlias']("create","作る");
this['addAlias']("create","만들다");
this['Actor']['addAlias']("forward","歩く")['addAlias']("turnRight","右回り")['addAlias']("turnLeft","左回り")['addAlias']("moveTo","位置")['addAlias']("moveBy","移動する")['addAlias']("setDir","向き")['addAlias']("getDir","向き?")['addAlias']("bounce","跳ね返る")['addAlias']("xpos?","横の位置?")['addAlias']("ypos?","縦の位置?")['addAlias']("die","消える")['addAlias']("appear","現れる")['addAlias']("collision","衝突")['addAlias']("moveCenter","中心に戻る");
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
this['Turtle']['addAlias']("action","動作")['addAlias']("setAction","動作設定");
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
this['Timer']['addAlias']("skip","中断");
this['Timer']['addAlias']("abort","停止");
this['Timer']['addAlias']("after_execute","完了時実行");
this['Timer']['addAlias']("after_execute","終了時実行");
this['Timer']['addAlias']("after_execute","最後に実行");
this['Timer']['addAlias']("times","回数");
this['Timer']['addAlias']("interval","間隔");
this['Timer']['addAlias']("duration","時間");
this['UI']['addAlias']("nextLine","次の行")['addAlias']("inc","増やす")['addAlias']("dec","減らす")['addAlias']("read","読む")['addAlias']("moveTo","位置")['addAlias']("moveTo","position")['addAlias']("moveBy","移動する")['addAlias']("width?","幅?")['addAlias']("height?","高さ?")['addAlias']("width","幅")['addAlias']("height","高さ")['addAlias']("clear","クリア")['addAlias']("write","書く")['addAlias']("add","追加")['addAlias']("newLine","改行");
this['ボタン']=this['Button'];
this['Button']['addAlias']("action","動作");
this['Button']['addAlias']("setAction","動作設定");
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
this['リスト']=this['ListBox'];
this['TextArea']['addAlias']("write","書く")['addAlias']("overwrite","上書き")['addAlias']("writeLn","書いて改行")['addAlias']("readOnly","読むだけ")['addAlias']("writable","読み書き")['addAlias']("autoBR","自動改行")['addAlias']("newLine","改行")['addAlias']("setRow","行数")['addAlias']("setCol","桁数")['addAlias']("setCol","文字数")['addAlias']("setCol","列数")['addAlias']("readAsArray","配列で読む")['addAlias']("changeLine","行修正");
this['addAlias']("Screen","画面");
this['Screen']['addAlias']("paint","塗る")['addAlias']("width?","幅?")['addAlias']("height?","高さ?");
this['addAlias']("and","全部","ぜんぶ");
aa['call']((this['and']),"true","本当","ほんとう");
this['addAlias']("or","どれか");
aa['call']((this['or']),"true","本当","ほんとう");
this['addAlias']("Dict","辞書");
this['Dict']['addAlias']("write","書く")['addAlias']("read","読む")['addAlias']("has?","含む?")['addAlias']("each","それぞれ実行")['addAlias']("delete","削除");
this['システム']=this['system'];
aa['call']((this['system']),"systemTime","システム時間?");
aa['call']((this['system']),"systemTIme","システム時間");
aa['call']((this['system']),"time","時刻?");
aa['call']((this['system']),"time","時刻");
aa['call']((this['system']),"today","日時?");
aa['call']((this['system']),"today","日時");
aa['call']((this['system']),"day","曜日?");
aa['call']((this['system']),"day","曜日");
aa['call']((this['system']),"year","年?");
aa['call']((this['system']),"year","年");
aa['call']((this['system']),"month","月?");
aa['call']((this['system']),"month","月");
aa['call']((this['system']),"date","日?");
aa['call']((this['system']),"date","日");
aa['call']((this['system']),"hours","時?");
aa['call']((this['system']),"hours","時");
aa['call']((this['system']),"minutes","分?");
aa['call']((this['system']),"minutes","分");
aa['call']((this['system']),"seconds","秒?");
aa['call']((this['system']),"seconds","秒");
this['addAlias']("accelerationSensor","加速度センサ","加速度センサー");
this['accelerationSensor']['addAlias']("setAction","動作設定")['addAlias']("use","使う")['addAlias']("calibrate","調整")['addAlias']("action","動作")['addAlias']("getXAcceleration","左右の加速度?")['addAlias']("getYAcceleration","前後の加速度?")['addAlias']("getZAcceleration","上下の加速度?");
this['addAlias']("compass","コンパス","磁気センサ","磁気センサー");
this['compass']['addAlias']("use","使う")['addAlias']("setAction","動作設定")['addAlias']("action","動作")['addAlias']("getDirection","方向?","向き?");
this['addAlias']("touchSensor","タッチセンサ","タッチセンサー");
this['touchSensor']['addAlias']("setAction","動作設定")['addAlias']("action","動作")['addAlias']("use","使う")['addAlias']("getTouched","タッチした?","触れた?")['addAlias']("getTouching","タッチしている?","タッチしてる?","触れている?","触れてる?")['addAlias']("getX","横の位置?")['addAlias']("getY","縦の位置?");
this['addAlias']("gyroSensor","ジャイロセンサ","ジャイロセンサー");
this['gyroSensor']['addAlias']("setAction","動作設定")['addAlias']("action","動作")['addAlias']("use","使う")['addAlias']("getYaw","ヨー?","水平方向の傾き?","水平の傾き?")['addAlias']("getRoll","ロール?","左右方向の傾き?","左右の傾き?")['addAlias']("getPitch","ピッチ?","上下方向の傾き?","上下の傾き?")['addAlias']("calibrate","調整")['addAlias']("use","使う");
this['文字列']=this['window']['String'];
sp=this['window']['String']['prototype'];
aa['call']((sp),"add","連結");
aa['call']((sp),"contain?","含む?");
aa['call']((sp),"position?","何文字目?");
aa['call']((sp),"substr","部分");
aa['call']((sp),"length?","長さ?");
aa['call']((sp),"partition","分割");
aa['call']((sp),"oneReplace","置き換える");
aa['call']((sp),"allReplace","全部置き換える");
aa['call']((sp),"charCodeAt","文字コード");
this['配列']=this['window']['Array'];
ap=this['window']['Array']['prototype'];
aa['call']((this['window']['Array']),"create","作る");
aa['call']((ap),"get","読む");
aa['call']((ap),"set","上書き");
aa['call']((ap),"add","書く");
aa['call']((ap),"remove","消す");
aa['call']((ap),"removepos","位置で消す");
aa['call']((ap),"insert","挿入");
aa['call']((ap),"each","それぞれ実行");
aa['call']((ap),"length?","要素数?");
aa['call']((ap),"clear","クリア");
aa['call']((ap),"concat","連結");
aa['call']((ap),"randomSelect","ランダムに選ぶ");
aa['call']((ap),"each","それぞれ実行");
aa['call']((ap),"select","選ぶ");
aa['call']((ap),"max","最大");
aa['call']((ap),"min","最小");
aa['call']((ap),"bond","結合");
aa['call']((ap),"process","加工");
this['ブロック']=this['window']['Function'];
fp=this['window']['Function']['prototype'];
aa['call']((fp),"execute","実行");
aa['call']((fp),"repeat","繰り返す");
aa['call']((fp),"while","の間");
aa['call']((fp),"then","なら");
aa['call']((fp),"else","そうでなければ");
this['_true']['addAlias']("else","そうでなければ")['addAlias']("execute","実行")['addAlias']("then","なら");
this['_false']['addAlias']("else","そうでなければ")['addAlias']("execute","実行")['addAlias']("then","なら");
this['_done']['addAlias']("else","そうでなければ")['addAlias']("execute","実行")['addAlias']("then","なら");
this['_while']['addAlias']("execute","実行");
this['数値']=this['window']['Number'];
np=this['window']['Number']['prototype'];
aa['call']((np),"setSeed","乱数初期化");
aa['call']((np),"random","乱数");
aa['call']((np),"add","足す");
aa['call']((np),"add","たす");
aa['call']((np),"sub","引く");
aa['call']((np),"sub","ひく");
aa['call']((np),"mul","掛ける");
aa['call']((np),"mul","かける");
aa['call']((np),"div","割る");
aa['call']((np),"div","わる");
aa['call']((np),"mod","余り");
aa['call']((np),"mod","あまり");
aa['call']((np),"fromCharCode","コード文字");
this['真偽値']=this['window']['Boolean'];
bp=this['window']['Boolean']['prototype'];
aa['call']((bp),"then","なら");
aa['call']((bp),"else","そうでなければ");
return aa['call']((bp),"not","反対");
}));
}).checkerror().apply(root,[]);
//# sourceMappingURL=Japanese.js.map
