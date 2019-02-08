root.system.run(function(){this['テーブル']=this['作る']();
this['テーブル']['データ']=this['配列']['作る']();
this['テーブル']['_画面幅']=this['画面']['幅?']();
this['テーブル']['_画面高さ']=this['画面']['高さ?']();
this['テーブル']['x']=((20)+((this['テーブル']['_画面幅'])/-(2)));
this['テーブル']['y']=((this['テーブル']['_画面高さ'])/(2));
this['テーブル']['リスト高さ']=(((this['テーブル']['_画面高さ'])*(3))/(10));
this['テーブル']['テキストファイル']=this['作る']();
this['テーブル']['テキストファイル']['initialize']=dtlbind(this,function(filename){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['text']=this['fromWebStorage']((filename));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['text'];
})['else']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['text']=this['fromServer']((filename));
}));
this['arr']=this['text']['split']((this['window']['RegExp']("[\r\n]")));
return this['arr'];
});
this['テーブル']['テキストファイル']['fromServer']=dtlbind(this,function(filename){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['opt']=this['system']['new'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return }));
this['opt']['url']="https://bitarrow.eplang.jp/beta1808/";
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['window']['BitArrow']['runtimePath'])['含む?']("localhost");
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['opt']['url']="http://localhost/";
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return filename['含む?']("^data/");
})['そうでなければ']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['opt']['url']=(this['opt']['url']+"data/");
}));
this['opt']['url']=(this['opt']['url']+filename);
this['opt']['async']=root['false'];
this['file']=this['window']['$']['ajax']((this['opt']));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['file']['responseText']['含む?']("404 Not Found");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return "ファイルが存在しません。ファイル名を見直してください";
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['file']['responseText'];
}));
});
this['テーブル']['テキストファイル']['fromWebStorage']=dtlbind(this,function(filename){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return filename['含む?']("^data/");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return filename=filename['置き換える']("^data/","");
}));
return root['window']['localStorage']['getItem']((("dtl/uploadFile/"+filename)));
});
this['テーブル']['テキストファイル']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['arr'];
});
this['テーブル']['getarg']=dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((this['配列?']((n))),(this['配列?']((n['読む']((1))))));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n['読む']((1));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n;
}));
});
this['テーブル']['作る']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ret']=this['テーブル']['create']();
this['ret']['データ']=this['配列']['作る']();
this['args']=this['getarg']((_rest));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['args']!==this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ret']['フィールド名']=this['args'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ret']['フィールド名']=this['配列']['作る']();
}));
return this['ret'];
});
this['テーブル']['配列?']=dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['どれか']['本当']((((""+n))['含む?']("]")),((n===this['undef'])));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['true'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['false'];
}));
});
this['テーブル']['書く']=dtlbind(this,function(v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['配列?']((v));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return v['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['データ']=this['データ']['書く']((n));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['データ']=this['データ']['書く']((v));
}));
return this;
});
this['テーブル']['読む']=dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['データ']['読む']((i));
});
this['テーブル']['連結']=dtlbind(this,function(v){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var ret;
this['データ']=this['データ']['連結']((v));
return this;
});
this['テーブル']['区切り文字']=dtlbind(this,function(deli){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['deli']=deli;
return this;
});
this['テーブル']['文字コード']=dtlbind(this,function(encode){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['encode']=encode;
return this;
});
this['テーブル']['ファイルから作る']=dtlbind(this,function(fn){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var fld_tmp;
var fld;
var _tmp;
var deli;
this['tf']=this['テキストファイル']['作る']((fn));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['encode']===(this['undef']));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['encode']="Shift-JIS";
}));
this['dt']=this['tf']['読む']((this['encode']));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['dt']!==this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (deli===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['dt']['読む']((1)))['含む?']("\t");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return deli="\t";
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return deli=",";
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['フィールド名']===this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
fld_tmp=(this['dt']['読む']((1)))['分割']((deli));
fld=this['配列']['作る']();
fld_tmp['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
n=(""+n);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n['含む?']("[(]");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
_tmp=n['分割']("[(]");
return n=_tmp['読む']((1));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n['含む?']("[(]");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
_tmp=n['分割']("[(]");
return n=_tmp['読む']((1));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n['含む?']("[^0-9０-９\-\.]");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return fld['書く']((n));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return fld['書く']((("F"+n)));
}));
}));
return this['ret']=this['テーブル']['作る']((fld));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['dt']['読む']((1)))['分割']((deli)))['それぞれ実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['dt']['挿入']((1),"");
}));
}));
this['dt']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i>(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
n=(n+" ");
this['tmp']=n['分割']((deli));
return this['tmp']['それぞれ実行'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
m=m['置き換える'](" $","");
m=m['置き換える']("^ ","");
m=m['置き換える']("^\-$","");
m=m['置き換える']("^\-$","");
m=m['置き換える']("^\ー$","");
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return m['含む?']("[^0-9０-９\.\-]");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ret']['書く']((m));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ret']['書く']((root['window']['parseFloat']((m))));
}));
}));
}));
}));
return this['ret'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['ファイルから追加']=dtlbind(this,function(fn){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['tf']=this['テキストファイル']['作る']((fn));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['encode']===(this['undef']));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['encode']="Shift-JIS";
}));
this['dt']=this['tf']['読む']((this['encode']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['deli']===(this['undef']));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['deli']="\t";
}));
this['fld']=(this['dt']['読む']((1)))['分割']((this['deli']));
this['ret']=this;
this['dt']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['tmp']=n['分割']((this['deli']));
return this['tmp']['それぞれ実行'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['ret']['書く']((m));
}));
}));
return this['ret'];
});
this['テーブル']['値読み出し']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['val']=(this['データ']['読む']((1)));
return this['val'];
});
this['テーブル']['フィールド番号取得']=dtlbind(this,function(f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['fs']=this['undef'];
this['要素数']=this['フィールド名']['要素数?']();
dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['フィールド名']['読む']((n)))===f);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['fs']=n;
}));
})['繰り返す']((this['フィールド名']['要素数?']()));
return this['fs'];
});
this['テーブル']['文字数カウント']=dtlbind(this,function(Str){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
Str=(Str+"");
this['length']=Str['長さ?']();
this['sum']=(0);
dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当'](((((Str['部分']((n),(1)))['文字コード']()['進数']((10)))>(31))),((((Str['部分']((n),(1)))['文字コード']()['進数']((10)))<(127))));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['sum']=(this['sum']+(1));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['sum']=(this['sum']+(2));
}));
})['繰り返す']((this['length']));
return this['sum'];
});
this['テーブル']['表示']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var 要素数;
var 文字列;
var レコード;
var カラム名;
var tmp;
var space;
var s;
var 幅;
var 文字数;
var lst;
var 件数;
要素数=this['フィールド名']['要素数?']();
文字数=this['配列']['作る']();
レコード="";
カラム名="";
this['フィールド名']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return 文字数['書く']((this['文字数カウント']((n))));
}));
this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n==="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n="NA";
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((((((n+""))['含む?']("[^0-9０-９\-\.]"))===this['false'])),(((((n+""))['長さ?']())>(5))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
n=((n*(10000))).round();
return n=(n/(10000));
}));
tmp=this['文字数カウント'](((n+"")));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((文字数['読む']((((((i-(1)))%要素数)+(1)))))<tmp);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return 文字数['上書き']((((((i-(1)))%要素数)+(1))),(tmp));
}));
}));
space="";
this['フィールド名']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
n=(n+"");
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return space=(space+" ");
})['繰り返す']((((文字数['読む']((((((i-(1)))%要素数)+(1)))))-(this['文字数カウント'](((n+"")))))));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===要素数);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return カラム名=カラム名['連結'](((space+n)));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return カラム名=カラム名['連結']((((space+n)+"|")));
}));
return space="";
}));
幅=(0);
文字数['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return 幅=(幅+n);
}));
s="";
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return s=(s+"-");
})['繰り返す']((((幅+要素数)-(1))));
件数=((this['データ']['要素数?']())/(this['フィールド名']['要素数?']()));
this['リスト幅']=(this['テーブル']['_画面幅']/(2.5));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (要素数===(1));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['横幅']=s['長さ?']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['横幅']<=(1));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['補正値']=((15)*this['横幅']);
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['横幅']<=(2));
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['補正値']=((4)*this['横幅']);
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['横幅']<=(3));
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['補正値']=((3)*this['横幅']);
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['横幅']<(7));
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['補正値']=((2)*this['横幅']);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['補正値']=this['横幅'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((((23)+(((幅+要素数))*(7)))+this['補正値']))<=(this['リスト幅']));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['リスト幅']=((((23)+(((幅+要素数))*(7)))+this['補正値']));
}));
lst=this['テキストエリア']['作る']((カラム名))['大きさ']((this['リスト幅']),(this['リスト高さ']))['位置']((this['テーブル']['x']),(this['テーブル']['y']));
return this['テーブル']['x']=((this['テーブル']['x'])+(((40)+this['リスト幅'])));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((((23)+(((幅+要素数))*(7))))<=(this['リスト幅']));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['リスト幅']=(((23)+(((幅+要素数))*(7))));
}));
lst=this['テキストエリア']['作る']((カラム名))['大きさ']((this['リスト幅']),(this['リスト高さ']))['位置']((this['テーブル']['x']),(this['テーブル']['y']));
return this['テーブル']['x']=((this['テーブル']['x'])+(((40)+this['リスト幅'])));
}));
lst['書く']((s))['改行']();
this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n==="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n="NA";
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((((((n+""))['含む?']("[^0-9０-９\-\.]"))===this['false'])),(((((n+""))['長さ?']())>(5))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
n=((n*(10000))).round();
return n=(n/(10000));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return space=(space+" ");
})['繰り返す']((((文字数['読む']((((((i-(1)))%要素数)+(1)))))-(this['文字数カウント'](((n+"")))))));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%要素数)===(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return レコード=レコード['連結'](((space+n)));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return レコード=レコード['連結']((((space+n)+"|")));
}));
space="";
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((((i-(1)))%要素数)===(要素数-(1))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
lst['書く']((レコード))['改行']();
return レコード="";
}));
}));
this['テーブル']['フラグ']=(1);
return this;
});
this['テーブル']['TSV表示']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var 要素数;
var 文字列;
var レコード;
var カラム名;
var tmp;
var space;
var s;
var 幅;
var 文字数;
var lst;
var 件数;
要素数=this['フィールド名']['要素数?']();
文字数=this['配列']['作る']();
レコード="";
カラム名="";
this['フィールド名']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return 文字数['書く']((this['文字数カウント']((n))));
}));
this['フィールド名']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===要素数);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return カラム名=カラム名['連結']((n));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return カラム名=カラム名['連結'](((n+"\t")));
}));
}));
this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
tmp=this['文字数カウント'](((n+"")));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((文字数['読む']((((((i-(1)))%要素数)+(1)))))<tmp);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return 文字数['上書き']((((((i-(1)))%要素数)+(1))),(tmp));
}));
}));
幅=(0);
文字数['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return 幅=(幅+n);
}));
件数=((this['データ']['要素数?']())/(this['フィールド名']['要素数?']()));
this['リスト幅']=(this['テーブル']['_画面幅']/(2.5));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((((23)+(((幅+要素数))*(7))))<=(this['リスト幅']));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['リスト幅']=(((23)+(((幅+要素数))*(7))));
}));
lst=this['テキストエリア']['作る']((カラム名))['大きさ']((this['リスト幅']),(this['リスト高さ']))['位置']((this['テーブル']['x']),(this['テーブル']['y']));
this['テーブル']['x']=((this['テーブル']['x'])+(((40)+this['リスト幅'])));
this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%要素数)===(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return レコード=レコード['連結']((n));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return レコード=レコード['連結'](((n+"\t")));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((((i-(1)))%要素数)===(要素数-(1))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
lst['書く']((レコード))['改行']();
return レコード="";
}));
}));
return this;
});
this['テーブル']['CSV表示']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var 要素数;
var 文字列;
var レコード;
var カラム名;
var tmp;
var space;
var s;
var 幅;
var 文字数;
var lst;
var 件数;
要素数=this['フィールド名']['要素数?']();
文字数=this['配列']['作る']();
レコード="";
カラム名="";
this['フィールド名']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return 文字数['書く']((this['文字数カウント']((n))));
}));
this['フィールド名']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===要素数);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return カラム名=カラム名['連結']((n));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return カラム名=カラム名['連結'](((n+",")));
}));
}));
this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
tmp=this['文字数カウント'](((n+"")));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((文字数['読む']((((((i-(1)))%要素数)+(1)))))<tmp);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return 文字数['上書き']((((((i-(1)))%要素数)+(1))),(tmp));
}));
}));
幅=(0);
文字数['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return 幅=(幅+n);
}));
件数=((this['データ']['要素数?']())/(this['フィールド名']['要素数?']()));
this['リスト幅']=(this['テーブル']['_画面幅']/(2.5));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((((23)+(((幅+要素数))*(7))))<=(this['リスト幅']));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['リスト幅']=(((23)+(((幅+要素数))*(7))));
}));
lst=this['テキストエリア']['作る']((カラム名))['大きさ']((this['リスト幅']),(this['リスト高さ']))['位置']((this['テーブル']['x']),(this['テーブル']['y']));
this['テーブル']['x']=((this['テーブル']['x'])+(((40)+this['リスト幅'])));
this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%要素数)===(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return レコード=レコード['連結']((n));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return レコード=レコード['連結'](((n+",")));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((((i-(1)))%要素数)===(要素数-(1))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
lst['書く']((レコード))['改行']();
return レコード="";
}));
}));
return this;
});
this['テーブル']['配列から作る']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['arg']=_rest['作る']();
this['field_arr']=this['配列']['作る']();
this['arg']['それぞれ実行'](dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['field_arr']['書く']((i['読む']((1))));
}));
this['要素数']=(this['arg']['読む']((1)))['要素数?']();
this['ret']=this['テーブル']['作る']((this['field_arr']));
dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j>(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['arg']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return this['ret']['書く']((n['読む']((j))));
}));
}));
})['繰り返す']((this['要素数']));
return this['ret'];
});
this['テーブル']['フィールド名変更']=dtlbind(this,function(before,after){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当'](((after!==this['undef'])),((before!==this['undef'])));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['フィールド名']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n===before);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['num']=i;
}));
}));
this['フィールド名']['上書き']((this['num']),(after));
return this['フィールド名']=this['フィールド名'];
}));
return this;
});
this['テーブル']['件数']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ret;
ret=this['テーブル']['作る']("件数");
ret['書く']((((this['データ']['要素数?']())/(this['フィールド名']['要素数?']()))));
return ret;
});
this['テーブル']['数にする']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['num']=root['window']['parseFloat']((this['データ']['読む']((1))));
return this['num'];
});
this['テーブル']['配列にする']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['arr']=this['配列']['作る']();
this['データ']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['arr']['書く']((n));
}));
return this['arr'];
});
this['テーブル']['欠損値の置換']=dtlbind(this,function(option){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="0置換");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n==="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['データ']['上書き']((i),(0));
}));
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="平均値置換");
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n==="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['tmp']=this['作る']();
this['フィールド']=this['フィールド名']['読む'](((i%(this['フィールド名']['要素数?']()))));
return this['データ']['上書き']((i),(this['平均値']((this['フィールド']))['値読み出し']()));
}));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n==="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['tmp']=this['作る']();
this['フィールド']=this['フィールド名']['読む'](((i%(this['フィールド名']['要素数?']()))));
return this['データ']['上書き']((i),(this['中央値']((this['フィールド']))['値読み出し']()));
}));
}));
}));
return this;
});
this['テーブル']['check_fn']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var flag;
var res;
args=this['getarg']((_rest));
flag=(0);
res=this['false'];
args['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['フィールド名']['それぞれ実行'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n===m);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=(flag+(1));
}));
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (flag===(args['要素数?']()));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return res=this['true'];
}));
return res;
});
this['テーブル']['check_dt']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var res;
res=this['true'];
this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((n+""))['含む?']("[^0-9０-９\-\.]");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return res=this['false'];
}));
}));
return res;
});
this['テーブル']['check_arg']=dtlbind(this,function(args,option){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var _max;
var flag;
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (args!==this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['arg_num']=args['要素数?']();
flag=this['true'];
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="freq");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['arg_num'])<(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['arg_num'])>=(2));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _max=args['読む']((2));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['arg_num'])>=(3));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_min']=args['読む']((3));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['arg_num'])>=(4));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['階級幅']=args['読む']((4));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['階級幅']!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['階級幅']+""))['含む?']("[^0-9０-９\.-]");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_min']!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['_min']+""))['含む?']("[^0-9０-９\.-]");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (_max!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((_max+""))['含む?']("[^0-9０-９\.-]");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (flag===this['true']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['射影']((args['読む']((1))))['check_dt']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="common");
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['arg_num']<(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args)))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (flag===this['true']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['tmp']=this['射影']((args));
this['str_arr']=this['tmp']['データ']['選ぶ'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ((n+""))['含む?']("[^0-9０-９\.-]");
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['str_arr']['要素数?']())>(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (flag===this['false']);
}));
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="common1");
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['arg_num']<(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="common2");
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['arg_num']<(2));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args['読む']((2)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="qn1");
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['arg_num']<(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (flag===this['true']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['射影']((args['読む']((1))))['check_dt']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="qn2");
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['arg_num']<(2));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args['読む']((2)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (flag===this['true']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['射影']((args['読む']((1))))['check_dt']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['射影']((args['読む']((2))))['check_dt']((args['読む']((2)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="qn3");
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['arg_num']<(2));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args['読む']((2)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args['読む']((3)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (flag===this['true']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['射影']((args['読む']((1))))['check_dt']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['射影']((args['読む']((2))))['check_dt']((args['読む']((2)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['射影']((args['読む']((3))))['check_dt']((args['読む']((2)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="qn");
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['arg_num']<(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['check_fn']((args)))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (flag===this['true']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['射影']((args['読む']((1))))['check_dt']((args['読む']((1)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['射影']((args['読む']((2))))['check_dt']((args['読む']((2)))))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
}));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=this['false'];
}));
return flag;
});
this['テーブル']['射影']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var fs;
var fn;
var ret;
var 全数;
fs=this['配列']['作る']();
fn=this['配列']['作る']();
this['要素数']=this['フィールド名']['要素数?']();
this['引数']=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_fn']((this['引数']));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['引数']['それぞれ実行'](dtlbind(this,function(f,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['フィールド名']['読む']((n)))===f);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
fs['書く']((n));
return fn['書く']((f));
}));
})['繰り返す']((this['フィールド名']['要素数?']()));
}));
ret=this['テーブル']['作る']((fn));
this['tmp']=this['配列']['作る']();
fs['それぞれ実行'](dtlbind(this,function(m,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((((i-(1)))%this['要素数']))===((m-(1))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['tmp']['書く']((n));
}));
}));
}));
全数=this['件数']()['数にする']();
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((this['tmp']['読む'](((i+((((j-(1)))*全数)))))));
})['繰り返す']((fs['要素数?']()));
})['繰り返す']((全数));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['選択']=dtlbind(this,function(条件){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var ret;
ret=this['テーブル']['作る']((this['フィールド名']));
this['データ']['それぞれ実行'](dtlbind(this,function(r,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['番号']=(((i-(1)))%(this['フィールド名']['要素数?']()));
this['f']=this['フィールド名']['読む'](((this['番号']+(1))));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((r+""))['含む?']("[^0-9０-９\-\.]");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['s']=((((((""+this['f'])+"＝")+((34)).コード文字())+r)+((34)).コード文字())+"。");
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['s']=((((""+this['f'])+"＝")+r)+"。");
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['s']['含む?']("<"))===this['false']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['s'])['実行']();
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((条件['実行']()),(((i%(this['フィールド名']['要素数?']()))===(0))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((this['データ']['読む']((((i-this['番号'])+((n-(1))))))));
})['繰り返す']((this['フィールド名']['要素数?']()));
}));
}));
return ret;
});
this['テーブル']['結合']=dtlbind(this,function(t){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var ret;
this['keyf']=this['配列']['作る']();
this['keyn']=this['配列']['作る']();
this['keye']=this['配列']['作る']();
this['要素数m']=this['フィールド名']['要素数?']();
this['要素数t']=t['フィールド名']['要素数?']();
dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['f']=this['フィールド名']['読む']((n));
return dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['f2']=t['フィールド名']['読む']((i));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['f']===this['f2']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['kf']=this['f'];
this['kn']=n;
this['ki']=i;
this['keyf']['書く']((this['f']));
this['keyn']['書く']((n));
return this['keye']['書く']((i));
}));
})['繰り返す']((this['要素数t']));
})['繰り返す']((this['要素数m']));
this['途中データm']=this['射影']((this['keyf']));
this['途中データt']=t['射影']((this['keyf']));
this['行数m']=this['途中データm']['件数']()['数にする']();
this['行数t']=this['途中データt']['件数']()['数にする']();
this['列数']=this['keyf']['要素数?']();
this['連結m']=this['途中データm']['_レコード連結']((this['行数m']),(this['列数']));
this['連結t']=this['途中データt']['_レコード連結']((this['行数t']),(this['列数']));
this['一致レコード行番号配列']=this['配列']['作る']();
this['追加予定レコード行番号配列']=this['配列']['作る']();
this['連結m']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return this['連結t']['それぞれ実行'](dtlbind(this,function(m,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((("@@"+n))===(("@@"+m)));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['一致レコード行番号配列']['書く']((i));
return this['追加予定レコード行番号配列']['書く']((j));
}));
}));
}));
this['tmp_arr']=this['配列']['作る']();
this['tmp']=this['配列']['作る']();
t['フィールド名']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['tmp']['書く']((n));
}));
t['フィールド名']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['keyf']['それぞれ実行'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n===m);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['tmp']['消す']((n));
}));
}));
}));
this['追加データ']=t['射影']((this['tmp']));
this['fn']=(this['フィールド名'])['連結']((this['tmp']));
ret=this['テーブル']['作る']((this['fn']));
this['一致レコード行番号配列']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((this['データ']['読む']((((((n*this['要素数m']))+((j-(1))))-((this['要素数']-(1))))))));
})['繰り返す']((this['要素数m']));
return dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['番号']=this['追加予定レコード行番号配列']['読む']((i));
return ret['書く']((this['追加データ']['読む'](((((((this['番号']-(1)))*(this['追加データ']['フィールド名']['要素数?']())))+(j))))));
})['繰り返す']((this['追加データ']['フィールド名']['要素数?']()));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((((ret['データ']['要素数?']())===(0))),(((this['一致レコード行番号配列']['要素数']())!==(0))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['mn']=((this['要素数?']())/this['要素数m']);
this['tn']=((t['要素数?']())/this['要素数t']);
this['time']=(0);
this['time2']=(0);
return dtlbind(this,function(cnt){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((this['データ']['読む'](((i+this['time'])))));
})['繰り返す']((this['要素数m']));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((t['読む'](((i+this['time2'])))));
})['繰り返す']((this['要素数t']));
this['time2']=(this['time2']+this['要素数t']);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['time2']===(t['要素数?']()));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['time2']=(0);
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((cnt%this['tn']))===(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['time']=(this['time']+this['要素数m']);
}));
})['繰り返す'](((this['mn']*this['tn'])));
}));
return ret;
});
this['テーブル']['_レコード連結']=dtlbind(this,function(行数,列数){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['ret']=this['配列']['作る']();
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['tmp']="";
dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j!==(列数));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['tmp']=((this['tmp']+""))['連結']((((this['データ']['読む'](((((((i-(1)))*(列数)))+j))))+"＠＠")));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['tmp']=((this['tmp']+""))['連結']((((this['データ']['読む'](((((((i-(1)))*(列数)))+j))))+"")));
}));
})['繰り返す']((列数));
return this['ret']['書く']((this['tmp']));
})['繰り返す']((行数));
return this['ret'];
});
this['テーブル']['行列入れ替え']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var tmp;
var f;
tmp=this['配列']['作る']();
f=this['フィールド名'];
this['フィールド数']=f['要素数?']();
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return tmp['書く']((this['配列']['作る']((f['読む']((i))))));
})['繰り返す']((this['フィールド数']));
(this['データ'])['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['index']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((i%this['フィールド数']))===(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['フィールド数'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%this['フィールド数']));
}));
return (tmp['読む']((this['index'])))['書く']((n));
}));
tmp['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===(1));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
n['加工'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return (m+"");
}));
return this['ret']=this['テーブル']['作る']((n));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ret']['データ']=(this['ret']['データ'])['連結']((n));
}));
}));
return this['ret'];
});
this['テーブル']['小さい順']=dtlbind(this,function(並び替えたいフィールド名){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var ret;
var res;
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (並び替えたいフィールド名===this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['並び替えたいフィールド名の番号']=(0);
dtlbind(this,function(番号){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['フィールド名']['読む']((番号)))===並び替えたいフィールド名);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['並び替えたいフィールド名の番号']=番号;
}));
})['繰り返す']((this['フィールド名']['要素数?']()));
this['quick']=dtlbind(this,function(arr,num,num_f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
var ret;
var n;
var p;
var left;
var right;
var v;
var p番号;
var v番号;
ret=arr;
n=arr['要素数?']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((n/num_f))>(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
p番号=(n-num_f);
left=this['配列']['作る']();
right=this['配列']['作る']();
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var v番号;
v番号=(((i-(1)))*num_f);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((arr['読む'](((v番号+num))))<(arr['読む'](((p番号+num)))));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return left['書く']((arr['読む'](((v番号+i)))));
})['繰り返す']((num_f));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return right['書く']((arr['読む'](((v番号+i)))));
})['繰り返す']((num_f));
}));
})['繰り返す']((((n/num_f)-(1))));
p=this['配列']['作る']();
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return p['書く']((arr['読む'](((p番号+i)))));
})['繰り返す']((num_f));
return ret=this['配列']['作る']()['連結']((this['quick']((left),(num),(num_f))),(p),(this['quick']((right),(num),(num_f))));
}));
return ret;
});
res=this['quick']((this['データ']),(this['並び替えたいフィールド名の番号']),(this['フィールド名']['要素数?']()));
ret=this['テーブル']['作る']((this['フィールド名']));
dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((res['読む']((n))));
})['繰り返す']((res['要素数?']()));
return ret;
}));
});
this['テーブル']['大きい順']=dtlbind(this,function(並び替えたいフィールド名){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var ret;
var res;
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (並び替えたいフィールド名===this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['並び替えたいフィールド名の番号']=(0);
dtlbind(this,function(番号){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['フィールド名']['読む']((番号)))===並び替えたいフィールド名);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['並び替えたいフィールド名の番号']=番号;
}));
})['繰り返す']((this['フィールド名']['要素数?']()));
this['quick']=dtlbind(this,function(arr,num,num_f){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
var ret;
var n;
var p;
var left;
var right;
var v;
var p番号;
var v番号;
ret=arr;
n=arr['要素数?']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((n/num_f))>(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
p番号=(n-num_f);
left=this['配列']['作る']();
right=this['配列']['作る']();
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var v番号;
v番号=(((i-(1)))*num_f);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((arr['読む'](((v番号+num))))>(arr['読む'](((p番号+num)))));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return left['書く']((arr['読む'](((v番号+i)))));
})['繰り返す']((num_f));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return right['書く']((arr['読む'](((v番号+i)))));
})['繰り返す']((num_f));
}));
})['繰り返す']((((n/num_f)-(1))));
p=this['配列']['作る']();
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return p['書く']((arr['読む'](((p番号+i)))));
})['繰り返す']((num_f));
return ret=this['配列']['作る']()['連結']((this['quick']((left),(num),(num_f))),(p),(this['quick']((right),(num),(num_f))));
}));
return ret;
});
res=this['quick']((this['データ']),(this['並び替えたいフィールド名の番号']),(this['フィールド名']['要素数?']()));
ret=this['テーブル']['作る']((this['フィールド名']));
dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((res['読む']((n))));
})['繰り返す']((res['要素数?']()));
return ret;
}));
});
this['テーブル']['内部_重複なし']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ret;
var flag;
this['f']=_rest['読む']((1));
this['arr']=((this['射影']((this['f'])))['データ'])['消す']("");
ret=this['テーブル']['作る']((this['f']));
flag=(0);
this['arr']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
ret['データ']['それぞれ実行'](dtlbind(this,function(m,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n===m);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=(1);
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (flag===(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ret['書く']((n));
}));
return flag=(0);
}));
return ret;
});
this['テーブル']['重複なし']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ret;
var flag;
this['列数']=this['フィールド名']['要素数?']();
this['行数']=((this['データ']['要素数?']())/this['列数']);
this['res']=this['テーブル']['作る']((this['フィールド名']));
this['連結データ配列']=this['配列']['作る']();
this['重複削除配列']=this['配列']['作る']();
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['tmp']="";
dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j!==(this['列数']));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['tmp']=((this['tmp']+""))['連結']((((this['読む'](((((((i-(1)))*(this['列数'])))+j))))+"＠＠")));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['tmp']=((this['tmp']+""))['連結']((((this['読む'](((((((i-(1)))*(this['列数'])))+j))))+"")));
}));
})['繰り返す']((this['列数']));
return this['連結データ配列']['書く']((this['tmp']));
})['繰り返す']((this['行数']));
this['連結データ配列']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['i']===(1));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['重複削除配列']['書く']((n));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
flag=(0);
this['重複削除配列']['それぞれ実行'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (m===n);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return flag=(1);
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (flag===(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['重複削除配列']['書く']((n));
}));
return flag=(0);
}));
}));
this['res']=this['テーブル']['作る']((this['フィールド名']));
this['重複削除配列']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['tmp']=n['分割']("＠＠");
return this['tmp']['それぞれ実行'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((m+""))['含む?']("[^0-9０-９\-\.]");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['res']['書く']((m));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['res']['書く']((root['window']['parseFloat']((m))));
}));
}));
}));
return this['res'];
});
this['テーブル']['追加']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['フィールド数']=this['フィールド名']['要素数?']();
this['追加数']=_rest['要素数?']();
_rest['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['配列?']((n));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['追加数']=n['要素数?']();
return n['それぞれ実行'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['書く']((m));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i<=this['フィールド数']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['書く']((n));
}));
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当'](((((this['フィールド数']-this['追加数']))>(0))),((this['追加数']!==(0))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['書く']("");
})['繰り返す'](((this['フィールド数']-this['追加数'])));
}));
return this;
});
this['テーブル']['レコード取り出し']=dtlbind(this,function(key,num){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var ret;
ret=this['テーブル']['作る']((this['フィールド名']));
this['要素数']=this['フィールド名']['要素数?']();
this['データ']['それぞれ実行'](dtlbind(this,function(r,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当'](((key===r)),(((((i-num))%this['要素数'])===(0))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((this['読む']((((i-num)+(j))))));
})['繰り返す']((this['要素数']));
}));
}));
return ret;
});
this['テーブル']['集計']=dtlbind(this,function(f,con){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var cnt;
this['ret']=this['テーブル']['作る'](((f+"_集計")));
cnt=(0);
this['arr']=this['射影']((f));
this['arr']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n===con);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return cnt=(cnt+(1));
}));
}));
this['ret']['書く']((cnt));
return this['ret'];
});
this['テーブル']['集計2']=dtlbind(this,function(f1,con1,f2,con2){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,4);
var cnt;
this['ret']=this['テーブル']['作る'](((f1+"_集計")));
cnt=(0);
this['f1_arr']=this['射影']((f1));
this['f2_arr']=this['射影']((f2));
this['要素数']=(this['f1_arr']['フィールド名'])['要素数?']();
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var v1;
var v2;
v1=this['f1_arr']['データ']['読む']((i));
v2=this['f2_arr']['データ']['読む']((i));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当'](((((v1+""))===((con1+"")))),((((v2+""))===((con2+"")))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return cnt=(cnt+(1));
}));
})['繰り返す']((this['f1_arr']['件数']()['数にする']()));
this['ret']['書く']((cnt));
return this['ret'];
});
this['テーブル']['_引数設定']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['args']=this['配列']['作る']();
this['フィールド名']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['args']['書く']((n));
}));
this['型配列']=this['グラフ']['型判定']((this));
this['型配列']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['args']['消す']((n));
}));
return this['args'];
});
this['テーブル']['最大値']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ret;
var f1_arr;
var args;
var arg_num;
var max;
args=this['getarg']((_rest));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (args===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return args=this['_引数設定']();
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ret=this['テーブル']['作る']();
args['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
ret['フィールド名']['書く'](((n+"_最大値")));
f1_arr=this['射影']((n));
f1_arr['データ']['消す']("");
f1_arr['データ']['それぞれ実行'](dtlbind(this,function(m,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return max=m;
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (max<m);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return max=m;
}));
}));
return ret['書く']((max));
}));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['最小値']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ret;
var f1_arr;
var args;
var arg_num;
var min;
args=this['getarg']((_rest));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (args===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return args=this['_引数設定']();
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ret=this['テーブル']['作る']();
args['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
ret['フィールド名']['書く'](((n+"_最大値")));
f1_arr=this['射影']((n));
f1_arr['データ']['消す']("");
f1_arr['データ']['それぞれ実行'](dtlbind(this,function(m,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return min=m;
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (min>m);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return min=m;
}));
}));
return ret['書く']((min));
}));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['最頻値']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var freq_arr;
var _max_rec;
var args;
var arg_num;
var _max;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common1");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['f1']=args['読む']((1));
freq_arr=this['度数']((this['f1']));
_max=freq_arr['最大値']("度数")['数にする']();
_max_rec=freq_arr['レコード取り出し']((_max),(2));
this['ret']=this['テーブル']['作る']((((this['f1'])+"_最頻値")),"度数");
_max_rec['データ']['それぞれ実行'](dtlbind(this,function(val,cnt){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return this['ret']['書く']((val));
}));
return this['ret'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['合計値']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var f1;
var ret;
var sum;
args=this['getarg']((_rest));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (args===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return args=this['_引数設定']();
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ret=this['テーブル']['作る']();
return args['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['フィールド番号']=this['フィールド番号取得']((n));
ret['フィールド名']['書く'](((n+"_合計値")));
sum=(0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['フィールド番号']!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['データ']['読む'](((this['フィールド番号']+(((i-(1)))*(this['フィールド名']['要素数?']()))))))!=="NA");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return sum=(sum+(this['データ']['読む'](((this['フィールド番号']+(((i-(1)))*(this['フィールド名']['要素数?']())))))));
}));
})['繰り返す']((((this['データ']['要素数?']())/this['要素数'])));
return ret['書く']((sum));
}));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
return ret;
});
this['テーブル']['平均値']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var f1;
var ret;
var sum;
var レコード数;
var フィールド番号;
args=this['getarg']((_rest));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (args===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return args=this['_引数設定']();
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ret=this['テーブル']['作る']();
return args['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
フィールド番号=this['フィールド番号取得']((n));
ret['フィールド名']['書く'](((n+"_平均値")));
レコード数=((this['データ']['要素数?']())/(this['フィールド名']['要素数?']()));
sum=(0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (フィールド番号!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['データ']['読む'](((フィールド番号+(((i-(1)))*(this['フィールド名']['要素数?']()))))))==="");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return レコード数=(レコード数-(1));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return sum=(sum+(root['window']['parseFloat']((this['データ']['読む'](((フィールド番号+(((i-(1)))*(this['フィールド名']['要素数?']())))))))));
}));
})['繰り返す']((((this['データ']['要素数?']())/this['要素数'])));
return ret['書く'](((sum/(レコード数))));
}));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
return ret;
});
this['テーブル']['偏差']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var f1;
var f1_arr;
var dev_arr;
var ret;
var ave;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"qn1");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=args['読む']((1));
f1_arr=this['射影']((f1));
f1_arr['データ']=f1_arr['データ']['消す']("");
ave=f1_arr['平均値']((f1))['値読み出し']();
dev_arr=this['配列']['作る']();
f1_arr['データ']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n!=="NA");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dev_arr['書く'](((n-ave)));
}));
}));
ret=this['テーブル']['作る']((((f1)+"_偏差")));
dev_arr['それぞれ実行'](dtlbind(this,function(val){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((val));
}));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['分散']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ret;
var sum;
var data_array;
var ave;
var dev;
var disp;
var args;
var f1;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"qn1");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=args['読む']((1));
data_array=this['射影']((f1));
data_array['データ']=data_array['データ']['消す']("");
sum=data_array['合計値']((f1))['値読み出し']();
ave=(sum/(data_array['データ']['要素数?']()));
dev=(0);
data_array['データ']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dev=(dev+(((((n)-(ave)))*(((n)-(ave))))));
}));
disp=(0);
disp=(dev/(data_array['データ']['要素数?']()));
ret=this['テーブル']['作る']((((f1)+"_分散")));
ret['書く']((disp));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['不偏分散']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var data_array;
var sum;
var 要素数;
var ave;
var dev;
var disp;
var args;
var f1;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"qn1");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=args['読む']((1));
data_array=this['射影']((f1));
data_array['データ']=data_array['データ']['消す']("");
sum=data_array['合計値']((f1))['値読み出し']();
要素数=data_array['データ']['要素数?']();
ave=(sum/要素数);
dev=(0);
data_array['データ']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dev=(dev+(((((n)-(ave)))*(((n)-(ave))))));
}));
disp=(0);
disp=((((要素数/((要素数-(1)))))*dev)/要素数);
this['ret']=this['テーブル']['作る']((((f1)+"_不偏分散")));
this['ret']['書く']((disp));
return this['ret'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['共分散']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var f1;
var f2;
var f1_dev_arr;
var f2_dev_arr;
var total;
var ret;
var cav;
var args;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"qn2");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=args['読む']((1));
f2=args['読む']((2));
f1_dev_arr=this['偏差']((f1));
f2_dev_arr=this['偏差']((f2));
total=(0);
f1_dev_arr['データ']['それぞれ実行'](dtlbind(this,function(val,cnt){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return total=(total+((val*(f2_dev_arr['データ']['読む']((cnt))))));
}));
cav=(total/(f1_dev_arr['データ']['要素数?']()));
ret=this['テーブル']['作る']((((((f1)+"&")+(f2))+"_共分散")));
ret['書く']((cav));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['不偏共分散']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var f1;
var f2;
var f1_dev_arr;
var f2_dev_arr;
var 要素数;
var total;
var cav;
var ret;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"qn2");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=args['読む']((1));
f2=args['読む']((2));
f1_dev_arr=this['偏差']((f1));
f2_dev_arr=this['偏差']((f2));
要素数=f1_dev_arr['データ']['要素数?']();
total=(0);
f1_dev_arr['データ']['それぞれ実行'](dtlbind(this,function(val,cnt){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return total=(total+((val*(f2_dev_arr['データ']['読む']((cnt))))));
}));
cav=(((要素数/((要素数-(1)))))*((total/要素数)));
ret=this['テーブル']['作る']((((((f1)+"&")+(f2))+"_不偏共分散")));
ret['書く']((cav));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['相関係数']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var f1;
var f2;
var tmp1;
var tmp2;
var cav;
var st_dev1;
var st_dev2;
var cor;
var ret;
this['args']=this['getarg']((_rest));
this['args2']=this['args']['concat']();
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((this['args']),"qn");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=this['args']['読む']((1));
f2=this['args']['読む']((2));
tmp1=this['配列']['作る']();
this['args']['それぞれ実行'](dtlbind(this,function(f1){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
tmp2=this['配列']['作る']();
this['args']['それぞれ実行'](dtlbind(this,function(f2){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
cav=this['共分散']((f1),(f2))['値読み出し']();
st_dev1=this['標準偏差']((f1))['値読み出し']();
st_dev2=this['標準偏差']((f2))['値読み出し']();
cor=(cav/((st_dev1*st_dev2)));
return tmp2['書く']((cor));
}));
return tmp1['書く']((tmp2));
}));
ret=this['テーブル']['作る']((this['args']['挿入']((1),"")));
tmp1['それぞれ実行'](dtlbind(this,function(f,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return ret['追加']((f['挿入']((1),(this['args']['読む'](((i+(1))))))));
}));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['不偏共分散']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var f1;
var f2;
var f1_dev_arr;
var f2_dev_arr;
var 要素数;
var total;
var cav;
var ret;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"qn2");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=args['読む']((1));
f2=args['読む']((2));
f1_dev_arr=this['偏差']((f1));
f2_dev_arr=this['偏差']((f2));
要素数=f1_dev_arr['データ']['要素数?']();
total=(0);
f1_dev_arr['データ']['それぞれ実行'](dtlbind(this,function(val,cnt){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return total=(total+((val*(f2_dev_arr['データ']['読む']((cnt))))));
}));
cav=(((要素数/((要素数-(1)))))*((total/要素数)));
ret=this['テーブル']['作る']((((((f1)+"&")+(f2))+"_不偏共分散")));
ret['書く']((cav));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['_相関係数']=dtlbind(this,function(f1,f2){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var tmp1;
var tmp2;
var cav;
var st_dev1;
var st_dev2;
var cor;
var ret;
cav=this['共分散']((f1),(f2))['値読み出し']();
st_dev1=this['標準偏差']((f1))['値読み出し']();
st_dev2=this['標準偏差']((f2))['値読み出し']();
cor=(cav/((st_dev1*st_dev2)));
return cor;
});
this['テーブル']['偏相関係数']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var f1;
var f2;
var tmp1;
var tmp2;
var cav;
var st_dev1;
var st_dev2;
var cor;
var ret;
this['args']=this['getarg']((_rest));
this['args2']=this['args']['concat']();
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((this['args']),"qn3");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=this['args']['読む']((1));
f2=this['args']['読む']((2));
this['f3']=this['args']['読む']((3));
this['cor1']=this['_相関係数']((f2),(this['f3']));
this['cor2']=this['_相関係数']((f1),(f2));
this['cor3']=this['_相関係数']((f1),(this['f3']));
this['cor2']=(0.706);
this['cor3']=(0.87);
this['cor1']=(0.302);
this['r']=(((this['cor2']-((this['cor1']*this['cor3']))))/(((((1)-((this['cor1'])['pow']((2))))).sqrt()*(((1)-((this['cor3'])['pow']((2))))).sqrt())));
ret=this['テーブル']['作る'](((((((f1+"&")+f2)+"&")+this['f3'])+"_偏相関係数")));
ret['書く']((this['r']));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['標準偏差']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var f1;
var disp;
var sdev;
var ret;
var args;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"qn1");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=args['読む']((1));
disp=this['分散']((f1))['値読み出し']();
sdev=(disp).sqrt();
ret=this['テーブル']['作る']((((f1)+"_標準偏差")));
return ret['書く']((sdev));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['不偏標準偏差']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var f1;
var disp;
var sdev;
var ret;
var args;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"qn1");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=args['読む']((1));
disp=this['不偏分散']((f1))['値読み出し']();
sdev=(disp).sqrt();
ret=this['テーブル']['作る']((((f1)+"_不偏標準偏差")));
return ret['書く']((sdev));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['中央値']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var f1;
var data_arr;
var 要素数;
var 中心;
var median;
var disp;
var sdev;
var ret;
var args;
args=this['getarg']((_rest));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (args===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return args=this['_引数設定']();
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ret=this['テーブル']['作る']();
args['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
data_arr=this['小さい順']((n))['射影']((n));
data_arr['データ']=data_arr['データ']['消す']("");
要素数=data_arr['データ']['要素数?']();
ret['フィールド名']['書く'](((n+"_中央値")));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (要素数!==(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
中心=((要素数/(2))).ceil();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((要素数%(2)))===(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return median=((((data_arr['データ']['読む']((中心)))+(data_arr['読む'](((中心+(1)))))))/(2));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return median=data_arr['データ']['読む']((中心));
}));
return ret['書く']((median));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ret['書く']((this['undef']));
}));
}));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['第1四分位数']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var f1;
var data_arr;
var 要素数;
var 中心;
var data;
var qua1;
var ret;
args=this['getarg']((_rest));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (args===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return args=this['_引数設定']();
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ret=this['テーブル']['作る']();
return args['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
data_arr=this['小さい順']((n))['射影']((n));
data_arr['データ']=data_arr['データ']['消す']("");
要素数=data_arr['データ']['要素数?']();
中心=((要素数/(2))).floor();
data=this['テーブル']['作る']((n));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return data['書く']((data_arr['データ']['読む']((i))));
})['繰り返す']((中心));
qua1=data['中央値']((n))['値読み出し']();
ret['フィールド名']['書く']((((n)+"_第1四分位数")));
return ret['書く']((qua1));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['第3四分位数']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var f1;
var data_arr;
var 要素数;
var 中心;
var data;
var qua3;
var ret;
args=this['getarg']((_rest));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (args===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return args=this['_引数設定']();
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ret=this['テーブル']['作る']();
return args['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
data_arr=this['大きい順']((n))['射影']((n));
data_arr['データ']=data_arr['データ']['消す']("");
要素数=data_arr['データ']['要素数?']();
中心=((要素数/(2))).floor();
data=this['テーブル']['作る']((n));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return data['書く']((data_arr['データ']['読む']((i))));
})['繰り返す']((中心));
qua3=data['中央値']((n))['値読み出し']();
ret['フィールド名']['書く'](((n+"_第3四分位数")));
return ret['書く']((qua3));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['度数']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var arg_num;
var キー達;
var 値達;
var ret;
var f1_arr;
var 件数;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common1");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
arg_num=args['要素数?']();
this['f1']=args['読む']((1));
キー達=this['配列']['作る']();
値達=this['配列']['作る']();
this['f1の番号']=(0);
f1_arr=this['射影']((this['f1']));
f1_arr['データ']=f1_arr['データ']['消す']("");
件数=f1_arr['データ']['要素数?']();
this['階級']=this['配列']['作る']();
this['カウント']=this['配列']['作る']();
this['フィールド名要素数']=this['フィールド名']['要素数?']();
this['文字コード配列にする']=dtlbind(this,function(str){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var ret;
ret=this['配列']['作る']();
((str+""))['分割']("")['それぞれ実行'](dtlbind(this,function(要素){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((要素['文字コード']()));
}));
return ret;
});
this['文字列にする']=dtlbind(this,function(文字コード配列){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var ret;
ret="";
文字コード配列['それぞれ実行'](dtlbind(this,function(要素){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret=(ret['連結'](((要素)['コード文字']())));
}));
return ret;
});
キー達['探す']=dtlbind(this,function(キー){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var 結果;
結果=(0);
this['文字コード配列の比較']=dtlbind(this,function(左,右){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return (((""+左))===((""+右)));
});
dtlbind(this,function(番号){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['文字コード配列の比較']((this['読む']((番号))),(キー));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return 結果=番号;
}));
})['繰り返す']((this['要素数?']()));
return 結果;
});
dtlbind(this,function(番号){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['フィールド名']['読む']((番号)))===this['f1']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['f1の番号']=番号;
}));
})['繰り返す']((this['フィールド名要素数']));
dtlbind(this,function(番号){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var 値;
var キー番号;
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['データ']['読む']((((this['フィールド名要素数']*((番号-(1))))+this['f1の番号']))))!=="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
値=this['文字コード配列にする']((this['データ']['読む']((((this['フィールド名要素数']*((番号-(1))))+this['f1の番号'])))));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((キー達['探す']((値)))===(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
キー達['書く']((値));
return 値達['書く']((0));
}));
キー番号=キー達['探す']((値));
return 値達['上書き']((キー番号),(((値達['読む']((キー番号)))+(1))));
}));
})['繰り返す']((((this['データ']['要素数?']())/(this['フィールド名要素数']))));
ret=this['テーブル']['作る']((this['f1']),"度数");
dtlbind(this,function(番号){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
ret['書く']((this['文字列にする']((キー達['読む']((番号))))));
return ret['書く']((値達['読む']((番号))));
})['繰り返す']((キー達['要素数?']()));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['度数分布']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ret;
var args;
var arg_num;
var 件数;
var f1_arr;
var _min;
var _max;
var 階級幅;
var f1;
var flag;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"freq");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
arg_num=args['要素数?']();
f1=args['読む']((1));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((arg_num)>=(2));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _max=args['読む']((2));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((arg_num)>=(3));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _min=args['読む']((3));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((arg_num)>=(4));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return 階級幅=args['読む']((4));
}));
this['f1の番号']=(0);
f1_arr=this['射影']((f1));
f1_arr['データ']=f1_arr['データ']['消す']("");
件数=f1_arr['データ']['要素数?']();
this['階級']=this['配列']['作る']();
this['カウント']=this['配列']['作る']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (_min===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _min=f1_arr['最小値']((f1))['数にする']();
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (_max===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _max=f1_arr['最大値']((f1))['数にする']();
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (_max>_min);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['min桁数']=(((_min).log()+(1))).floor();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['min桁数']>(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _min=(((_min/((10)['pow'](((this['min桁数']-(1))))))).floor()*((10)['pow'](((this['min桁数']-(1))))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _min=(0);
}));
this['max桁数']=(((_max).log()+(1))).floor();
_min=(((_min/((10)['pow'](((this['min桁数']-(1))))))).floor()*((10)['pow'](((this['min桁数']-(1))))));
_max=(((_max/((10)['pow'](((this['max桁数']-(1))))))).ceil()*((10)['pow'](((this['max桁数']-(1))))));
this['sum']=(_max-_min);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (階級幅===this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['sum']>(1));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['階級数']=(this['sum']/((10)['pow']((((this['sum']).log()).floor()))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['階級数']=(10);
}));
this['桁数']=((((this['sum']/this['階級数'])).log()+(1))).floor();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['桁数']<=(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['桁数']=(this['桁数']-(1));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (_max>=(10));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return 階級幅=(((((this['sum']/this['階級数']))*this['桁数'])).ceil()/(this['桁数']));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return 階級幅=((((((this['sum']/this['階級数']))*(10))*this['桁数'])).ceil()/(((10)*this['桁数'])));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['階級数']=((this['sum']/階級幅)).round();
}));
ret=this['テーブル']['作る']("階級","度数");
dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n!==this['階級数']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['階級']['書く']((this['配列']['作る'](((((((((_min+(階級幅*((n-(1))))))*(100))).round()/(100))+""))['連結']((("~"+((((((_min+(階級幅*n)))*(10))).round()/(10))))))))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['階級']['書く']((this['配列']['作る'](((((((((_min+(階級幅*((n-(1))))))*(100))).round()/(100))+""))['連結']((("~"+(_max))))))));
}));
(this['階級']['読む']((n)))['書く']((0));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n===(1));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['カウント']['書く'](((_min+(階級幅*((n-(1)))))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((_min+(階級幅*((n-(1))))))<_max);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['カウント']['書く'](((_min+(階級幅*((n-(1)))))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['カウント']['書く']((_max));
}));
}));
})['繰り返す']((this['階級数']));
f1_arr['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return this['カウント']['それぞれ実行'](dtlbind(this,function(m,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===this['階級数']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((((m<=n))),((((m+階級幅))>=n)));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['階級']['読む']((j)))['上書き']((2),((((this['階級']['読む']((j)))['読む']((2)))+(1))));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((((m<=n))),((((m+階級幅))>n)));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['階級']['読む']((j)))['上書き']((2),((((this['階級']['読む']((j)))['読む']((2)))+(1))));
}));
}));
}));
}));
this['階級']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return n['それぞれ実行'](dtlbind(this,function(val){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return ret['書く']((val));
}));
}));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['度数分布表']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var args;
var arg_num;
var f1;
var freq;
var frec_sum;
var frecdist_sum;
var ret;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"freq");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
arg_num=args['要素数?']();
f1=args['読む']((1));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((arg_num)>=(2));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_max']=args['読む']((2));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((arg_num)>=(3));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_min']=args['読む']((3));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((arg_num)>=(4));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['階級幅']=args['読む']((4));
}));
freq=this['度数分布']((f1),(this['_max']),(this['_min']),(this['階級幅']));
frec_sum=freq['合計値']("度数")['数にする']();
frecdist_sum=(0);
ret=this['テーブル']['作る']("階級","度数","相対度数");
freq['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
ret['書く']((n));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%(2))===(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ret['書く'](((n/frec_sum)));
return frecdist_sum=(frecdist_sum+((n/frec_sum)));
}));
}));
ret['書く']("計");
ret['書く']((frec_sum));
ret['書く']((frecdist_sum));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
f1=args['読む']((1));
ret=this['テーブル']['作る']((f1),"度数","相対度数");
this['f_arr']=this['度数']((f1))['射影']((f1));
freq=this['度数']((f1))['射影']("度数");
this['sum']=(0);
freq['データ']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['sum']=(this['sum']+n);
}));
freq['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
ret['書く']((this['f_arr']['データ']['読む']((i))));
ret['書く']((n));
return ret['書く'](((n/this['sum'])));
}));
return ret;
}));
});
this['テーブル']['クロス集計']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ret;
var val;
var cp;
var tmp;
var sum;
var sum_array;
var args;
var arg_num;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common2");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
arg_num=args['要素数?']();
tmp=this['配列']['作る']();
args['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i<=(2));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return tmp['書く']((this['射影']((n))['重複なし']()));
}));
}));
this['カウント']=this['配列']['作る']();
((tmp['読む']((1)))['データ'])['それぞれ実行'](dtlbind(this,function(n,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
sum=(0);
this['カウント']['書く']((n));
return ((tmp['読む']((2)))['データ'])['それぞれ実行'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当'](((n!=="")),((m!=="")));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
val=this['集計2']((args['読む']((1))),(n),(args['読む']((2))),(m))['数にする']();
this['カウント']['書く']((val));
return sum=(sum+val);
}));
}));
}));
ret=this['テーブル']['作る']("");
((tmp['読む']((2)))['データ'])['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n!=="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ret['フィールド名']['書く']((n));
}));
}));
this['カウント']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return ret['書く']((n));
}));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['クロス集計表']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ret;
var val;
var cp;
var tmp;
var sum;
var sum_array;
var args;
var arg_num;
args=this['getarg']((_rest));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_arg']((args),"common2");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
arg_num=args['要素数?']();
tmp=this['配列']['作る']();
args['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i<=(2));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return tmp['書く']((this['射影']((n))['重複なし']()));
}));
}));
this['カウント']=this['配列']['作る']();
(tmp['読む']((1)))['それぞれ実行'](dtlbind(this,function(n,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
sum=(0);
this['カウント']['書く']((n));
(tmp['読む']((2)))['それぞれ実行'](dtlbind(this,function(m){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当'](((n!=="")),((m!=="")));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
val=this['集計2']((args['読む']((1))),(n),(args['読む']((2))),(m))['数にする']();
this['カウント']['書く']((val));
return sum=(sum+val);
}));
}));
return this['カウント']['書く']((sum));
}));
ret=this['テーブル']['作る']("");
(tmp['読む']((2)))['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n!=="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ret['フィールド名']['書く']((n));
}));
}));
ret['フィールド名']['書く']("合計");
this['カウント']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return ret['書く']((n));
}));
sum_array=this['配列']['作る']("合計");
sum=(0);
(tmp['読む']((2)))['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n!=="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
val=this['集計']((args['読む']((2))),(n))['数にする']();
sum_array['書く']((val));
return sum=(sum+val);
}));
}));
sum_array['書く']((sum));
ret['追加']((sum_array));
return ret;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
});
this['テーブル']['数える']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var ret;
var f1;
var f1_arr;
var _max;
var args;
var arg_num;
args=this['getarg']((_rest));
ret=this['テーブル']['作る']("");
this['フィールド名']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
ret['データ']['書く']((n));
return args['それぞれ実行'](dtlbind(this,function(m,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ret['フィールド名']['書く']((m));
}));
this['num']=this['集計']((n),(m))['数にする']();
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['num']!==(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ret['データ']['書く']((this['num']));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ret['データ']['書く'](((0)));
}));
}));
}));
return ret;
});
this['テーブル']['フィールド名取得']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['res']=this['フィールド名']['作る']();
return this['res'];
});
this['テーブル']['抜き出す']=dtlbind(this,function(start,end){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var 要素数;
var res;
要素数=(this['フィールド名'])['要素数?']();
this['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['行番号']=((((i-(1)))/要素数)).floor();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return res=this['テーブル']['作る']((this['フィールド名']));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (end===this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['行番号'])===start);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return res['書く']((n));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((((this['行番号'])>=start)),(((this['行番号'])<=end)));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return res['書く']((n));
}));
}));
}));
return res;
});
this['グラフ']=this['タートル']['作る']()['消える']()['図形を作る']();
this['グラフ']['_間隔']=(30);
this['グラフ']['_プロット幅']=(20);
this['グラフ']['_原点x']=((this['テーブル']['_画面幅'])/-(2.2));
this['グラフ']['_原点y']=(((-(1)*(this['テーブル']['_画面高さ']))*(2.8))/(10));
this['グラフ']['_縦幅']=(((this['テーブル']['_画面高さ'])*(4.5))/(10));
this['グラフ']['_横幅']=((this['グラフ']['_縦幅'])*(1.5));
this['グラフ']['_方向']="縦";
this['グラフ']['_天井']=(this['グラフ']['_原点y']+(30));
this['グラフ']['_底']=(this['グラフ']['_原点y']-(10));
this['グラフ']['_左端']=(this['グラフ']['_原点x']-(20));
this['グラフ']['_右端']=((this['グラフ']['_原点x']+this['グラフ']['_横幅'])+(10));
this['グラフ']['_マーカフラグ']=this['true'];
this['グラフ']['_最小メモリ']=this['undef'];
this['グラフ']['_最大メモリ']=this['undef'];
this['グラフ']['_横軸タイトル文']=this['undef'];
this['グラフ']['_縦軸タイトル文']=this['undef'];
this['グラフ']['_起点メモリ']=(0);
this['グラフ']['_軸ラベルサイズ']=(8);
this['グラフ']['_軸タイトルサイズ']=(10);
this['グラフ']['_含む?']=dtlbind(this,function(arr,key){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var res;
res=this['false'];
arr['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n===key);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return res=this['true'];
}));
}));
return res;
});
this['グラフ']['位置確定']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['グラフ']['_原点x']=((60)+(this['グラフ']['_原点x']));
this['_左端']=((this['グラフ']['_原点x']-(30)));
return this['_右端']=(((this['グラフ']['_原点x']+this['_横幅'])+(10)));
});
this['グラフ']['型判定']=dtlbind(this,function(data){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['arr']=this['配列']['作る']();
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((data['データ']['読む']((i)))+""))['含む?']("[^0-9.-]");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['arr']['書く']((data['フィールド名']['読む']((i))));
}));
})['繰り返す']((data['フィールド名']['要素数?']()));
return this['arr'];
});
this['グラフ']['横軸タイトル描画']=dtlbind(this,function(option){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var 画面パーツ;
var 付箋;
var 文字数;
文字数=this['_横軸タイトル文']['長さ?']();
this['ラベル']['作る']((this['_横軸タイトル文']))['文字サイズ']((this['_軸タイトルサイズ']))['位置']((((this['_左端']+(((this['_右端']-this['_左端']))/(2)))-(文字数*(5)))),((this['_底']-(10))));
this['_底']=((this['_底'])-(((3)*this['_軸タイトルサイズ'])));
return this;
});
this['グラフ']['横軸タイトル']=dtlbind(this,function(title){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (title!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_横軸タイトル文']=title;
}));
return this;
});
this['グラフ']['縦軸タイトル描画']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var 画面パーツ;
var 付箋;
var 文字数;
文字数=this['_縦軸タイトル文']['長さ?']();
this['縦表示']((this['_縦軸タイトル文']),((this['_左端']-(10))),(((this['_底']+(((this['_天井']-this['_底']))/(2)))+(文字数*(5)))),"title");
this['_左端']=(this['_左端']-(25));
return this;
});
this['グラフ']['縦軸タイトル']=dtlbind(this,function(title){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (title!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_縦軸タイトル文']=title;
}));
return this;
});
this['グラフ']['移動する']=dtlbind(this,function(x,y){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['グラフ']['_原点x']=(this['グラフ']['_原点x']+x);
this['グラフ']['_原点y']=(this['グラフ']['_原点y']+y);
this['_左端']=(this['_左端']+x);
this['_右端']=(this['_右端']+x);
this['_天井']=(this['_天井']+y);
this['_底']=(this['_底']+y);
return this;
});
this['グラフ']['位置']=dtlbind(this,function(x,y){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var 移動距離x;
var 移動距離y;
移動距離x=(x-this['グラフ']['_原点x']);
移動距離y=(y-this['グラフ']['_原点y']);
this['グラフ']['_原点x']=x;
this['グラフ']['_原点y']=y;
this['_左端']=(this['_左端']+移動距離x);
this['_右端']=(this['_右端']+移動距離x);
this['_天井']=(this['_天井']+移動距離y);
this['_底']=(this['_底']+移動距離y);
return this;
});
this['グラフ']['x軸データ_multi']=dtlbind(this,function(data_arr,option){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var num;
var cnt;
var _max;
var 付箋;
data_arr['データ']['それぞれ実行'](dtlbind(this,function(data,cnt){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
num=((data+""))['長さ?']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (cnt===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _max=num;
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (_max<num);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _max=num;
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option!=="ラベルなし");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return data_arr['データ']['それぞれ実行'](dtlbind(this,function(data,cnt){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
data=(data+"");
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((_max)<(4));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
付箋=this['ラベル']['作る']((data))['文字サイズ']((this['_軸ラベルサイズ']))['位置']((((this['_XORIGIN'])+((this['_XINTERVAL'])*(cnt)))),(((this['_YLOWERLIM'])-(20))));
return 付箋['タイプ']="横軸ラベル";
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['種類'])!=="ヒストグラム");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['etc表示']((data),((((this['_XORIGIN'])+((this['_XINTERVAL'])*(cnt)))+(this['_XINTERVAL']*(0.6)))),(((this['_YLOWERLIM'])-(20))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['縦表示']((data),((((this['_XORIGIN'])+((this['_XINTERVAL'])*(cnt)))+(this['_XINTERVAL']*(0.6)))),(((this['_YLOWERLIM'])-(20))),"横軸ラベル");
}));
}));
}));
}));
this['_YLOWERLIM']=(this['_YLOWERLIM']-(20));
return this;
});
this['グラフ']['データ補正値計算']=dtlbind(this,function(data_arr,range){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
var scale;
var 段数;
var up_lim;
data_arr['それぞれ実行'](dtlbind(this,function(data,cnt){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_範囲指定'];
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_最大メモリ']!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (data>this['_最大メモリ']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return data=this['_最大メモリ'];
}));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_最小メモリ']!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (data<this['_最小メモリ']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return data=this['_最小メモリ'];
}));
}));
}));
this['ab']=(data).abs();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (cnt===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ab__max']=this['ab'];
this['_min']=data;
return this['_max']=data;
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['ab__max']<this['ab']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ab__max']=this['ab'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_min']>data);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_min']=data;
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_max']<data);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_max']=data;
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当'](((this['_最小メモリ']===this['undef'])),((this['_min']>=(0))));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_最小メモリ']=(0);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_最小メモリ']=this['_min'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_最大メモリ']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_最大メモリ']=this['_max'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['ab__max']>(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['digit']=(((this['ab__max']).abs()).log()).ceil();
this['base']=(this['ab__max']*(1.05));
this['place']=(10)['pow']((((this['base']).log()).floor()));
this['up1_digit']=((this['base']/this['place'])).floor();
scale=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['up1_digit']<(2));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['place']*(0.2));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['up1_digit']<(5));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['place']*(0.5));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['place'];
}));
}));
段数=(((this['base']/scale)+(1))).floor();
return this['roof']=(段数*scale);
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_最小メモリ']<(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_縦幅']=(this['_縦幅']/(1.5));
this['_DACOL']=(range/this['roof']);
this['_段数']=(段数*(2));
this['__min']=this['_min'];
this['__max']=this['_max'];
this['_digit']=this['digit'];
this['_scale']=(scale/(2));
this['_roof']=(this['roof']/(2));
this['グラフ']['_原点y']=(this['グラフ']['_原点y']/(3));
return this['_DACOL']=(this['_DACOL']/(1.5));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_DACOL']=(range/this['roof']);
this['_段数']=段数;
this['__min']=this['_min'];
this['__max']=this['_max'];
this['_digit']=this['digit'];
this['_scale']=scale;
return this['_roof']=this['roof'];
}));
return this['_DACOL'];
});
this['グラフ']['メモリ線描画']=dtlbind(this,function(要素数){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var ペン;
var col;
var 軸線;
var i;
this['横軸描画']=dtlbind(this,function(i,起点メモリ){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['ラベル']['作る']((((this['_scale']*i)+起点メモリ)))['位置'](((this['グラフ']['_原点x']-this['調整'])),((((this['グラフ']['_原点y']+(((this['_縦幅']/this['_段数']))*i)))+(10))))['文字サイズ']((this['_軸ラベルサイズ']));
return ペン['線の太さ']((1))['線の色']((col))['ペンなし']()['位置']((this['グラフ']['_原点x']),((this['グラフ']['_原点y']+(((this['_縦幅']/this['_段数']))*i))))['ペンあり']()['歩く']((this['_横幅']));
});
this['縦軸描画']=dtlbind(this,function(i,起点メモリ){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['幅']=(((((this['_scale']*i)).floor())+""))['長さ?']();
this['ラベル']['作る']((((this['_scale']*i)+起点メモリ)))['位置']((((this['グラフ']['_原点x']+(((this['_横幅']/this['_段数'])*i)))-(this['幅']*(5)))),((this['グラフ']['_原点y']-(10))))['文字サイズ']((this['_軸ラベルサイズ']));
return ペン['線の太さ']((1))['線の色']((col))['ペンなし']()['位置'](((this['グラフ']['_原点x']+(((this['_横幅']/this['_段数']))*i))),(this['グラフ']['_原点y']))['ペンあり']()['歩く']((this['_縦幅']));
});
col=this['色']['作る']((12434877));
this['調整']=((this['_digit'])*(10));
i=(0);
this['起点メモリ']=(0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="縦");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ペン=this['タートル']['作る']();
this['_左端']=((this['グラフ']['_原点x']-this['調整'])-(30));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['__max']>(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['起点メモリ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_最小メモリ']>(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_最小メモリ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (0);
}));
i=(0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['_最大メモリ'])>=(((this['_scale']*i)+this['起点メモリ'])));
})['の間']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['横軸描画']['実行']((i),(this['起点メモリ']));
return i=(i+(1));
}));
this['横軸描画']['実行']((i),(this['起点メモリ']));
return this['_天井']=(this['グラフ']['_原点y']+(((this['_縦幅']/this['_段数']))*i));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_最小メモリ']<(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['起点メモリ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_最大メモリ']<(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_最大メモリ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (0);
}));
i=(0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['_最小メモリ'])<=((this['_scale']*i)));
})['の間']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['横軸描画']['実行']((i),(this['起点メモリ']));
return i=(i-(1));
}));
this['横軸描画']['実行']((i),(this['起点メモリ']));
return this['_底']=((this['グラフ']['_原点y']+(((this['_縦幅']/this['_段数']))*i))-(10));
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="横");
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ペン=this['タートル']['作る']()['左回り']((90));
this['_底']=(this['グラフ']['_原点y']-(40));
this['縦軸描画']['実行']((i),(this['起点メモリ']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['__max']>(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['起点メモリ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_最小メモリ']>(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_最小メモリ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (0);
}));
i=(1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['_最大メモリ'])>=((this['_scale']*i)));
})['の間']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['縦軸描画']['実行']((i),(this['起点メモリ']));
return i=(i+(1));
}));
this['縦軸描画']['実行']((i),(this['起点メモリ']));
return this['_右端']=((this['グラフ']['_原点x']+(((this['_横幅']/this['_段数']))*i))+(20));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_最小メモリ']<(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['起点メモリ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_最大メモリ']<(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_最大メモリ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (0);
}));
i=-(1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['_最小メモリ'])<=((this['_scale']*i)));
})['の間']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['縦軸描画']['実行']((i),(this['起点メモリ']));
return i=(i-(1));
}));
this['縦軸描画']['実行']((i),(this['起点メモリ']));
return this['_左端']=((this['グラフ']['_原点x']+(((this['_横幅']/this['_段数']))*i))-(40));
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="帯");
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
ペン=this['タートル']['作る']()['線の太さ']((1))['線の色']((col))['左回り']((90));
ペン['ペンなし']()['位置']((this['グラフ']['_原点x']),(this['グラフ']['_原点y']));
this['_底']=(this['グラフ']['_原点y']-(40));
this['_天井']=(this['グラフ']['_原点y']+this['_縦幅']);
this['メモリ']=(0);
this['_帯メモリ間隔']=((this['_横幅'])/(5));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['幅']=((this['メモリ']+""))['長さ?']();
this['ラベル']['作る']((this['メモリ']))['文字サイズ']((this['_軸ラベルサイズ']))['位置']((((this['グラフ']['_原点x']+((this['_帯メモリ間隔'])*((i-(1)))))-(this['幅']*(5)))),((this['グラフ']['_原点y']-(10))));
ペン['ペンあり']()['歩く']((this['_縦幅']));
ペン['ペンなし']()['位置'](((this['グラフ']['_原点x']+((this['_帯メモリ間隔'])*i))),(this['グラフ']['_原点y']));
return this['メモリ']=(this['メモリ']+(20));
})['繰り返す']((6));
return this['_右端']=((this['グラフ']['_原点x']+((this['_横幅'])))+(20));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="散布図");
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['調整']=(this['_桁y']*(10));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['調整']===(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['調整']=(20);
}));
ペン=this['タートル']['作る']()['線の太さ']((1))['線の色']((col));
ペン['ペンなし']()['位置']((this['グラフ']['_原点x']),(this['グラフ']['_原点y']));
this['_左端']=(this['_左端']-(20));
this['_底']=(this['_底']-(20));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['どれか']['本当']((this['どれか']['本当']((this['全部']['本当'](((i===(1))),((this['_グリッド線なし']===this['true'])))),(this['全部']['本当'](((i===((this['_段数y']+(1))))),((this['_グリッド線なし']===this['true'])))))),((this['_グリッド線なし']===this['false'])));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ペン['ペンあり']()['歩く']((this['_横幅']));
}));
ペン['ペンなし']()['位置']((this['グラフ']['_原点x']),((this['グラフ']['_原点y']+((this['_横幅']/this['_段数y'])*i))));
return this['ラベル']['作る'](((this['_scaley']*((i-(1))))))['文字サイズ']((this['_軸ラベルサイズ']))['位置']((((this['グラフ']['_原点x']-this['調整'])-(10))),((((this['グラフ']['_原点y']+(((this['_縦幅']/this['_段数y']))*((i-(1))))))+(10))));
})['繰り返す'](((this['_段数y']+(1))));
ペン['ペンなし']()['位置']((this['グラフ']['_原点x']),(this['グラフ']['_原点y']))['左回り']((90));
return dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['幅']=((((this['_scalex']*i))+""))['長さ?']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_桁x']===(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['幅']=(3);
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['どれか']['本当']((this['どれか']['本当']((this['全部']['本当'](((i===(1))),((this['_グリッド線なし']===this['true'])))),(this['全部']['本当'](((i===((this['_段数x']+(1))))),((this['_グリッド線なし']===this['true'])))))),((this['_グリッド線なし']===this['false'])));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ペン['ペンあり']()['歩く']((this['_縦幅']));
}));
ペン['ペンなし']()['位置'](((this['グラフ']['_原点x']+((this['_縦幅']/this['_段数x'])*i))),(this['グラフ']['_原点y']));
return this['ラベル']['作る'](((this['_scalex']*((i-(1))))))['文字サイズ']((this['_軸ラベルサイズ']))['位置']((((this['グラフ']['_原点x']+(((this['_横幅']/this['_段数x'])*((i-(1))))))-(this['幅']*(5)))),((this['グラフ']['_原点y']-(10))));
})['繰り返す'](((this['_段数x']+(1))));
}));
ペン['図形を作る']();
ペン['消える']();
return this;
});
this['グラフ']['縦幅設定']=dtlbind(this,function(data_arr){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var tmp_arr;
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="縦");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['データ補正値計算']((data_arr['データ']),(this['_縦幅']));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="横");
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['データ補正値計算']((data_arr['データ']),(this['_横幅']));
}));
});
this['グラフ']['横幅設定']=dtlbind(this,function(要素数){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="縦");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_右端']=((this['グラフ']['_原点x']+this['_横幅'])+(30));
this['_プロット幅']=((((this['_横幅'])*(2))/(5))/(要素数));
return this['_間隔']=((((this['_横幅'])*(3))/(5))/((要素数+(1))));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="横");
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_横幅']=(250);
this['_右端']=((this['グラフ']['_原点x']+this['_横幅'])+(30));
this['_プロット幅']=((((this['_縦幅'])*(2))/(5))/(要素数));
return this['_間隔']=((((this['_縦幅'])*(3))/(5))/((要素数+(1))));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="帯");
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_右端']=((this['グラフ']['_原点x']+this['_横幅'])+(30));
this['_プロット幅']=((((this['_縦幅'])*(2))/(5))/(要素数));
this['_間隔']=((((this['_縦幅'])*(3))/(5))/((要素数+(1))));
return this['_digit']=(0);
}));
});
this['グラフ']['横向き']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var tmp;
this['_方向']="横";
this['グラフ']['_原点x']=(this['グラフ']['_原点x']+(250));
this['_天井']=(this['_縦幅']+(30));
return this;
});
this['グラフ']['メモリ範囲']=dtlbind(this,function(最小,最大){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['_範囲指定']=this['true'];
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (最小!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_最小メモリ']=最小;
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (最大!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_最大メモリ']=最大;
}));
return this;
});
this['グラフ']['補正フィールド決定']=dtlbind(this,function(f_arr){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var tmp;
var _max;
f_arr['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
tmp=this['_DATA']['最大値']((n))['値読み出し']();
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===(1));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
_max=tmp;
return this['F']=n;
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (_max<tmp);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
_max=tmp;
return this['F']=n;
}));
}));
}));
return this['F'];
});
this['グラフ']['線形近似']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_近似']=this['true'];
return this;
});
this['グラフ']['マーカなし']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_マーカフラグ']=this['false'];
return this;
});
this['グラフ']['最小二乗法']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="散布図");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['標準偏差']=this['_DATA']['標準偏差']((this['f1']))['値読み出し']();
this['共分散']=this['_DATA']['共分散']((this['f1']),(this['f2']))['値読み出し']();
this['x平均']=this['_DATA']['平均値']((this['f1']))['値読み出し']();
this['y平均']=this['_DATA']['平均値']((this['f2']))['値読み出し']();
this['傾き']=(this['共分散']/(this['標準偏差']['pow']((2))));
this['切片']=(this['y平均']-((this['傾き']*this['x平均'])));
this['x2']=(this['_横幅']/this['_DACOLX']);
this['y2']=((this['x2']*this['傾き'])+this['切片']);
this['ペン']=this['タートル']['作る']()['ぺんなし']()['線の太さ']((1));
this['始点x']=this['グラフ']['_原点x'];
this['始点y']=(this['グラフ']['_原点y']+(this['切片']*this['_DACOLY']));
this['終点x']=(this['グラフ']['_原点x']+(this['x2']*this['_DACOLX']));
this['終点y']=(this['グラフ']['_原点y']+(this['y2']*this['_DACOLY']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['始点y']<this['グラフ']['_原点y']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['始点x']=((((this['切片']/((-(1)*this['傾き']))))*this['_DACOLX'])+this['グラフ']['_原点x']);
return this['始点y']=this['グラフ']['_原点y'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['終点y']>this['_縦幅']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['終点x']=(((((((this['_scaley']*this['_段数y']))-this['切片']))/this['傾き'])*this['_DACOLX'])+this['グラフ']['_原点x']);
return this['終点_y']=((((this['_scaley']*this['_段数y']))*this['_DACOLX'])+this['グラフ']['_原点y']);
}));
this['ペン']['位置']((this['始点x']),(this['始点y']))['ぺんあり']()['位置']((this['終点x']),(this['終点y']))['図形を作る']((this['青']));
this['傾き']=((((this['共分散']/(this['標準偏差']['pow']((2))))*(10000))).round()/(10000));
this['切片']=(((((this['y平均']-((this['傾き']*this['x平均']))))*(10000))).round()/(10000));
this['ラベル']['作る']((((("y="+(this['傾き']))+"x+")+(this['切片']))))['文字サイズ'](((this['_軸ラベルサイズ']-(4))))['位置']((((this['グラフ']['_原点x']+(this['x2']*this['_DACOLX']))+(10))),(((this['グラフ']['_原点y']+(this['y2']*this['_DACOLY']))+(5))));
this['ペン']['消える']();
this['式の長さ']=(((("y="+(this['傾き']))+"x+")+(this['切片'])))['長さ?']();
this['_右端']=(((this['グラフ']['_原点x']+(this['_横幅']))+(40))+((this['式の長さ']*(10))));
this['テーブル']['x']=this['_右端'];
return this['ラベル']['作る']("    ")['位置']((this['_右端']),(0));
}));
return this;
});
this['グラフ']['グリッド線なし']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_グリッド線なし']=this['true'];
return this;
});
this['グラフ']['縦軸間隔']=dtlbind(this,function(val){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['グラフ']['_YSCALE']=val;
return this;
});
this['グラフ']['画像にする']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_底']<(((-(1)*this['テーブル']['_画面高さ'])/(2))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_底']=((-(1)*this['テーブル']['_画面高さ'])/(2));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_天井']>((this['テーブル']['_画面高さ']/(2))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_天井']=(this['テーブル']['_画面高さ']/(2));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_右端']>((this['テーブル']['_画面幅']/(2))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_右端']=(this['テーブル']['_画面幅']/(2));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_左端']<(((-(1)*this['テーブル']['_画面幅'])/(2))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_左端']=((-(1)*this['テーブル']['_画面幅'])/(2));
}));
this['システム']['capture']((this['_左端']),(this['_天井']),((this['_右端']-this['_左端'])),(((this['_天井']-this['_底'])).abs()));
return this;
});
this['グラフ']['縦表示']=dtlbind(this,function(文字列,x,y,option,long){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,5);
var 文字数;
var _SIZE;
var 調整;
文字列=(文字列+"");
文字数=(文字列)['長さ?']();
調整=(12);
_SIZE=(0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (option==="title");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
_SIZE=this['_軸タイトルサイズ'];
return 調整=(18);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return _SIZE=(this['_軸ラベルサイズ']-(4));
}));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['tmp']=this['配列']['作る']((文字列['部分']((i),(1))));
return this['tmp']['それぞれ実行'](dtlbind(this,function(n,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['付箋']=this['ラベル']['作る']((n))['位置']((x),((y-(調整*i))))['文字サイズ']((_SIZE));
return this['付箋']['タイプ']="縦軸タイトル";
}));
})['繰り返す']((文字数));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (long!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_底']=(y-long);
}));
});
this['グラフ']['着色']=dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%(8))===(1));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['col']=this['色']['作る']((5789946));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%(8))===(2));
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['col']=this['色']['作る']((11119093));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%(8))===(3));
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['col']=this['色']['作る']((11138546));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%(8))===(4));
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['col']=this['色']['作る']((11138473));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%(8))===(5));
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['col']=this['色']['作る']((15922601));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%(8))===(6));
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['col']=this['色']['作る']((16109737));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%(8))===(7));
}))['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['col']=this['色']['作る']((16099753));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((i%(8))===(0));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['col']=this['色']['作る']((16406616));
}));
return this['col'];
});
this['グラフ']['初期化']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_底']=this['グラフ']['_原点y'];
});
this['テーブル']['棒グラフ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_棒グラフ']=this['グラフ']['作る']();
this['_棒グラフ']['種類']="棒グラフ";
this['_棒グラフ']['描画済みグラフ']=this['配列']['作る']();
this['_棒グラフ']['_DATA']=this;
this['_棒グラフ']['f1']=this['フィールド名']['読む']((1));
this['_棒グラフ']['f2']=this['getarg']((_rest));
this['_棒グラフ']['描画']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['初期化']();
this['位置確定']();
this['型配列']=this['型判定']((this['_DATA']));
this['data_x']=this['_DATA']['射影']((this['f1']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['f2']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['f2']=this['配列']['作る']();
this['_DATA']['フィールド名']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['f2']['書く']((n));
}));
return this['f2']['位置で消す']((1));
}));
this['最大長']=(0);
this['data_x']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((((n+""))['長さ?']())>this['最大長']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['最大長']=((n+""))['長さ?']();
}));
}));
this['data_y']=this['_DATA']['射影']((this['f2']));
this['要素数']=this['data_x']['データ']['要素数?']();
this['ラベル数']=((this['要素数']/(35))).ceil();
this['横幅設定']((this['要素数']));
this['縦幅設定']((this['data_y']));
this['メモリ線描画']((this['要素数']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['型配列']['要素数?']())>(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['型配列']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['_含む?']((this['f2']),(n)))===this['true']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n!==(this['_DATA']['フィールド名']['読む']((1))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['x軸データ_multi']((this['_DATA']['射影']((n))));
}));
return this['f2']=this['f2']['消す']((n));
}));
}));
}));
this['ペン']=this['タートル']['作る']()['線の太さ']((1));
this['系列数']=this['f2']['要素数?']();
this['もとのプロット幅']=this['_プロット幅'];
this['_プロット幅']=(this['_プロット幅']/this['系列数']);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="縦");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ぺんなし']()['位置'](((this['グラフ']['_原点x']+this['_間隔'])),(this['グラフ']['_原点y']))['左回り']((90))['ぺんあり']();
this['ラベルx']=(((this['グラフ']['_原点x']+this['_間隔'])+(this['もとのプロット幅']/(2)))-((this['_軸ラベルサイズ']/(2))));
this['ラベルy']=this['グラフ']['_原点y'];
dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['data_y']=this['_DATA']['射影']((this['f2']['読む']((j))));
this['ラベルサイズ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_プロット幅']>(10));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (10);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_プロット幅'];
}));
this['data_y']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n==="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=(0);
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_範囲指定'];
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最大メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最大メモリ'];
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n<=this['_最小メモリ']);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最小メモリ'];
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最小メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
n=(((n-this['_起点メモリ']))*(this['_DACOL']));
return this['ペン']['ペンあり']()['歩く']((n))['右回り']((90))['歩く']((this['_プロット幅']))['右回り']((90))['歩く']((n))['右回り']((180))['図形にする']((this['着色']((j))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['移動する']((this['_プロット幅']),(0));
}));
this['ペン']['ペンなし']()['移動する'](((this['_間隔']+(((this['系列数']-(1)))*this['_プロット幅']))),(0));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((((i-(1)))%this['ラベル数']))===(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['横軸ラベル']=this['data_x']['読む']((i));
this['横軸ラベル長']=((this['横軸ラベル']+""))['長さ?']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((this['最大長']*(5)))>this['_プロット幅']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['縦表示']((this['横軸ラベル']),(this['ラベルx']),(this['ラベルy']),"",(this['最大長']));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ラベル']['作る']((this['横軸ラベル']))['文字サイズ']((this['_軸ラベルサイズ']))['位置'](((this['ラベルx']-((this['横軸ラベル長']*(5))/(2)))),(this['ラベルy']));
}));
return this['ラベルx']=((this['ラベルx']+(this['_間隔']*this['ラベル数']))+(this['もとのプロット幅']*this['ラベル数']));
}));
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_底']>=this['ラベルy']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_底']=(this['ラベルy']-(30));
}));
return this['ペン']['ぺんなし']()['位置']((((this['グラフ']['_原点x']+this['_間隔'])+(this['_プロット幅']*j))),(this['グラフ']['_原点y']));
})['繰り返す']((this['系列数']));
return this['_底']=(this['_底']-((13)*this['最大長']));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="横");
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ぺんなし']()['位置']((this['グラフ']['_原点x']),((this['グラフ']['_原点y']+this['_間隔'])))['ぺんあり']();
this['ラベルx']=(this['グラフ']['_原点x']-(10));
this['ラベルy']=(((this['グラフ']['_原点y']+((this['_間隔']+this['もとのプロット幅'])))-(this['もとのプロット幅']/(2)))+(6));
return dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['data_y']=this['_DATA']['射影']((this['f2']['読む']((j))));
this['data_y']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n==="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=(0);
}));
this['val']=this['data_x']['読む']((i));
this['メモリ調整']=((((this['val']+""))['長さ?']())*(10));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_範囲指定'];
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最大メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最大メモリ'];
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n<=this['_最小メモリ']);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最小メモリ'];
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最小メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
n=(((n-this['_起点メモリ']))*(this['_DACOL']));
return this['ペン']['ペンあり']()['歩く']((n))['左回り']((90))['歩く']((this['_プロット幅']))['左回り']((90))['歩く']((n))['左回り']((180))['図形にする']((this['着色']((j))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['移動する']((0),(this['_プロット幅']));
}));
this['ペン']['ペンなし']()['移動する']((0),((this['_間隔']+(((this['系列数']-(1)))*this['_プロット幅']))));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((((i-(1)))%this['ラベル数']))===(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ラベル']['作る']((this['val']))['文字サイズ'](((this['_軸ラベルサイズ']-(2))))['位置'](((this['ラベルx']-this['メモリ調整'])),(this['ラベルy']));
this['ラベルy']=(this['ラベルy']+(((this['_間隔']+this['もとのプロット幅']))*this['ラベル数']));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_左端']>=(((this['ラベルx']-this['メモリ調整'])-(30))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_左端']=((this['ラベルx']-this['メモリ調整'])-(30));
}));
}));
}));
}));
return this['ペン']['ぺんなし']()['位置']((this['グラフ']['_原点x']),(((this['グラフ']['_原点y']+this['_間隔'])+(this['_プロット幅']*j))));
})['繰り返す']((this['系列数']));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['系列数']>(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="横");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['ペンなし']()['位置']((this['グラフ']['_原点x']),((this['_底']-(5))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['ペンなし']()['位置']((this['グラフ']['_原点x']),((this['_底']-(10))));
}));
this['系列ラベルx']=(this['グラフ']['_原点x']+(10));
this['系列ラベルy']=(this['_底']+(7));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['系列名']=this['f2']['読む']((i));
this['系列名長']=((this['系列名']+""))['長さ?']();
this['ペン']['ペンあり']()['角形']((6),(4))['図形を作る']((this['着色']((i))));
this['a']=this['ラベル']['作る']((this['系列名']))['位置']((this['系列ラベルx']),(this['系列ラベルy']))['文字サイズ'](((this['_軸ラベルサイズ']-(2))));
this['ペン']['ペンなし']()['移動する']((((this['系列名長']*(12))+(16))),(0));
return this['系列ラベルx']=(this['系列ラベルx']+(((this['系列名長']*(12))+(16))));
})['繰り返す']((this['系列数']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_右端']<this['系列ラベルx']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_右端']=this['系列ラベルx'];
}));
return this['_底']=(this['_底']-(20));
}));
this['ペン']['消える']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_横軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['横軸タイトル']((this['f1']));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_縦軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['縦軸タイトル']((""));
}));
this['縦軸タイトル描画']();
this['横軸タイトル描画']();
this['グラフ']['_原点x']=(this['_右端']+(60));
this['_最小メモリ']=this['undef'];
return this;
});
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_棒グラフ']['f2']===this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_棒グラフ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_fn']((this['_棒グラフ']['f2']));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_棒グラフ']['_DATA']['射影']((this['_棒グラフ']['f2']['読む']((1))))['check_dt']();
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_棒グラフ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}));
});
this['テーブル']['ヒストグラム']=dtlbind(this,function(f2,_max,_min,階級幅){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,4);
var tmp;
this['_ヒストグラム']=this['グラフ']['作る']();
this['_ヒストグラム']['種類']="ヒストグラム";
this['_ヒストグラム']['f1']=this['フィールド名']['読む']((1));
this['_ヒストグラム']['f2']=f2;
this['_ヒストグラム']['_DATA']=this;
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['_ヒストグラム']['f1'])!=="階級");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_ヒストグラム']['_DATA']=this['度数分布']((this['_ヒストグラム']['f2']),(_max),(_min),(階級幅));
this['_ヒストグラム']['f1']="階級";
return this['_ヒストグラム']['f2']="度数";
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_ヒストグラム']['f2']===this['undef']);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_ヒストグラム']['f2']="度数";
}));
this['_ヒストグラム']['描画']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['位置確定']();
this['初期化']();
this['data_x']=this['_DATA']['射影']((this['f1']));
this['data_y']=this['_DATA']['射影']((this['f2']));
this['要素数']=this['data_y']['データ']['要素数?']();
this['横幅設定']((this['要素数']));
this['縦幅設定']((this['data_y']));
this['メモリ線描画']((this['要素数']));
this['ペン']=this['タートル']['作る']()['線の太さ']((1));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="縦");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ぺんなし']()['位置'](((this['グラフ']['_原点x']+this['_間隔'])),(this['グラフ']['_原点y']))['左回り']((90))['ぺんあり']();
this['ラベルx']=(this['グラフ']['_原点x']+(this['_間隔']));
this['ラベルy']=(this['グラフ']['_原点y']-(20));
this['ラベルサイズ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_プロット幅']>(10));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (10);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_プロット幅'];
}));
this['data_y']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最大メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最大メモリ'];
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n<=this['_最小メモリ']);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最小メモリ'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最小メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
n=(((n-this['_起点メモリ']))*(this['_DACOL']));
this['ペン']['ペンあり']()['歩く']((n))['右回り']((90))['歩く'](((this['_プロット幅']+(((((this['_間隔']*this['要素数'])-this['_間隔']))/this['要素数'])))))['右回り']((90))['歩く']((n))['右回り']((180))['図形にする']((this['色']['作る']((14737656))));
this['ペン']['ぺんなし']()['移動する'](((-(1)*((this['_プロット幅']+(((((this['_間隔']*this['要素数'])-this['_間隔']))/this['要素数'])))))),(0));
return this['ペン']['線の色']((this['色']['作る']((5592405))))['ペンあり']()['歩く']((n))['右回り']((90))['歩く'](((this['_プロット幅']+(((((this['_間隔']*this['要素数'])-this['_間隔']))/this['要素数'])))))['右回り']((90))['歩く']((n))['右回り']((180))['図形を作る']();
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['移動する'](((this['_プロット幅']+(((((this['_間隔']*this['要素数'])-this['_間隔']))/this['要素数'])))),(0));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ラベルペン']=this['タートル']['作る']()['線の太さ']((1))['ペンなし']()['位置']((this['ラベルx']),(this['ラベルy']))['ペンあり']()['歩く'](((this['_横幅']-(this['_間隔']*(2)))))['右回り']((90));
}));
this['ニョロ位置']=(((this['data_x']['読む']((i)))+""))['何文字目?']("~");
this['横軸ラベル']=(((this['data_x']['読む']((i)))+""))['部分']((1),((this['ニョロ位置']-(1))));
this['ラベルペン']['ペンなし']()['位置']((this['ラベルx']),(this['ラベルy']))['ペンあり']()['歩く']((10));
this['横軸ラベル長']=((this['横軸ラベル']+""))['長さ?']();
this['調整']=(0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['横軸ラベル長']<(3));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['調整']=((((3)-this['横軸ラベル長']))*(5));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['横軸ラベル長']>(3));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['調整']=((-(1)*((this['横軸ラベル長']-(3))))*(2));
}));
this['ラベル']['作る']((this['横軸ラベル']))['文字サイズ']((this['_軸ラベルサイズ']))['位置']((((this['ラベルx']+this['調整'])-(10))),((this['ラベルy']-(10))));
return this['ラベルx']=((this['ラベルx']+this['_プロット幅'])+(((((this['_間隔']*this['要素数'])-this['_間隔']))/this['要素数'])));
}));
this['横軸ラベル']=(this['data_x']['読む']((this['要素数'])))['部分'](((this['ニョロ位置']+(1))),((((this['data_x']['読む']((this['要素数'])))+""))['長さ?']()));
this['ラベルペン']['ペンなし']()['位置']((this['ラベルx']),(this['ラベルy']))['ペンあり']()['歩く']((10));
this['ラベル']['作る']((this['横軸ラベル']))['文字サイズ']((this['_軸ラベルサイズ']))['位置']((((this['ラベルx']+this['調整'])-(10))),((this['ラベルy']-(10))));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_底']>=this['ラベルy']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_底']=(this['ラベルy']-(30));
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="横");
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ぺんなし']()['位置']((this['グラフ']['_原点x']),((this['グラフ']['_原点y']+this['_間隔'])))['ぺんあり']();
this['ラベルx']=(this['グラフ']['_原点x']-(15));
this['ラベルy']=(this['グラフ']['_原点y']+(this['_間隔']));
this['ラベルサイズ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_プロット幅']>(10));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (8);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_プロット幅'];
}));
this['data_y']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['val']=this['data_x']['読む']((i));
this['メモリ調整']=((((this['val']+""))['長さ?']())*(12));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最大メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最大メモリ'];
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n<=this['_最小メモリ']);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最小メモリ'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最小メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
n=(((n-this['_起点メモリ']))*(this['_DACOL']));
this['ペン']['ペンあり']()['歩く']((n))['左回り']((90))['歩く'](((this['_プロット幅']+(((((this['_間隔']*this['要素数'])-this['_間隔']))/this['要素数'])))))['左回り']((90))['歩く']((n))['左回り']((180))['図形にする']((this['色']['作る']((14737656))));
this['ペン']['ぺんなし']()['移動する']((0),((-(1)*((this['_プロット幅']+(((((this['_間隔']*this['要素数'])-this['_間隔']))/this['要素数'])))))));
return this['ペン']['線の色']((this['色']['作る']((5592405))))['ペンあり']()['歩く']((n))['左回り']((90))['歩く'](((this['_プロット幅']+(((((this['_間隔']*this['要素数'])-this['_間隔']))/this['要素数'])))))['左回り']((90))['歩く']((n))['左回り']((180))['図形を作る']();
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['移動する']((0),((this['_プロット幅']+(((((this['_間隔']*this['要素数'])-this['_間隔']))/this['要素数'])))));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ラベルペン']=this['タートル']['作る']()['左回り']((90))['線の太さ']((1))['ペンなし']()['位置']((this['ラベルx']),(this['ラベルy']))['ペンあり']()['歩く'](((this['_縦幅']-(this['_間隔']*(2)))))['左回り']((90));
}));
this['ニョロ位置']=(((this['data_x']['読む']((i)))+""))['何文字目?']("~");
this['横軸ラベル']=(((this['data_x']['読む']((i)))+""))['部分']((1),((this['ニョロ位置']-(1))));
this['ラベルペン']['ペンなし']()['位置']((this['ラベルx']),(this['ラベルy']))['ペンあり']()['歩く']((10));
this['横軸ラベル長']=((this['横軸ラベル']+""))['長さ?']();
this['ラベル']['作る']((this['横軸ラベル']))['文字サイズ']((this['_軸ラベルサイズ']))['位置']((((this['ラベルx']-((this['横軸ラベル長']*(7))))-(10))),((this['ラベルy']+(10))));
this['ラベルy']=((this['ラベルy']+this['_プロット幅'])+(((((this['_間隔']*this['要素数'])-this['_間隔']))/this['要素数'])));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_左端']>=(((this['ラベルx']-this['メモリ調整'])-(30))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_左端']=((this['ラベルx']-this['メモリ調整'])-(30));
}));
}));
this['横軸ラベル']=(this['data_x']['読む']((this['要素数'])))['部分'](((this['ニョロ位置']+(1))),((((this['data_x']['読む']((this['要素数'])))+""))['長さ?']()));
this['ラベルペン']['ペンなし']()['位置']((this['ラベルx']),(this['ラベルy']))['ペンあり']()['歩く']((10));
return this['ラベル']['作る']((this['横軸ラベル']))['文字サイズ']((this['_軸ラベルサイズ']))['位置']((((this['ラベルx']-((this['横軸ラベル長']*(7))))-(10))),((this['ラベルy']+(10))));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['系列数']>(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="横");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['ペンなし']()['位置']((this['グラフ']['_原点x']),((this['_底']-(5))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['ペンなし']()['位置']((this['グラフ']['_原点x']),((this['_底']-(10))));
}));
this['系列ラベルx']=(this['グラフ']['_原点x']+(10));
this['系列ラベルy']=this['_底'];
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['系列名']=f2['読む']((i));
this['系列名長']=((this['系列名']+""))['長さ?']();
this['ペン']['ペンあり']()['角形']((6),(4))['図形を作る']((this['着色']((i))));
this['a']=this['ラベル']['作る']((this['系列名']))['位置']((this['系列ラベルx']),(this['系列ラベルy']))['文字サイズ'](((this['_軸ラベルサイズ']-(2))));
this['ペン']['ペンなし']()['移動する']((((this['系列名長']*(10))+(16))),(0));
return this['系列ラベルx']=(this['系列ラベルx']+(((this['系列名長']*(10))+(16))));
})['繰り返す']((this['系列数']));
return this['_底']=(this['_底']-(20));
}));
this['ペン']['消える']();
this['ラベルペン']['消える']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_横軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['横軸タイトル'](("階級"));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_縦軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['縦軸タイトル'](("度数"));
}));
this['縦軸タイトル描画']();
this['横軸タイトル描画']();
this['グラフ']['_原点x']=(this['_右端']+(60));
this['_最小メモリ']=this['undef'];
return this;
});
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['どれか']['本当'](((this['_ヒストグラム']['f2']===this['undef'])),((this['_ヒストグラム']['_DATA']===this['undef'])));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_ヒストグラム']['_DATA']['check_fn']((this['_ヒストグラム']['f2']));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_ヒストグラム']['_DATA']['射影']((this['_ヒストグラム']['f2']))['check_dt']();
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_ヒストグラム'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}));
});
this['テーブル']['積み上げ棒グラフ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_積み上げ棒グラフ']=this['グラフ']['作る']();
this['_積み上げ棒グラフ']['種類']="積み上げ棒グラフ";
this['_積み上げ棒グラフ']['_DATA']=this;
this['_積み上げ棒グラフ']['f1']=this['フィールド名']['読む']((1));
this['_積み上げ棒グラフ']['f2']=this['getarg']((_rest));
this['_積み上げ棒グラフ']['描画']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['位置確定']();
this['初期化']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['f2']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['tmp']=this['_DATA']['フィールド名']['concat']();
return this['f2']=(this['tmp'])['位置で消す']((1));
}));
this['tmp_data']=this['_DATA']['射影']((this['f2']));
this['data_x']=this['_DATA']['射影']((this['f1']));
this['フィールド数']=this['f2']['要素数?']();
this['系列数']=this['data_x']['データ']['要素数?']();
this['正合計配列']=this['配列']['作る']();
this['負合計配列']=this['配列']['作る']();
this['データ補正用配列']=this['配列']['作る']();
this['データ補正用配列']['データ']=this['配列']['作る']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['正合計配列']['書く']((0));
return this['負合計配列']['書く']((0));
})['繰り返す']((this['フィールド数']));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['tmp_data']['読む']((((((i-(1)))*this['フィールド数'])+j))))>(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['正合計配列']['上書き']((j),(((this['正合計配列']['読む']((j)))+(this['tmp_data']['読む']((((((i-(1)))*this['フィールド数'])+j)))))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['負合計配列']['上書き']((j),(((this['負合計配列']['読む']((j)))+(this['tmp_data']['読む']((((((i-(1)))*this['フィールド数'])+j)))))));
}));
})['繰り返す']((this['フィールド数']));
})['繰り返す']((this['系列数']));
this['データ補正用配列']['データ']=this['正合計配列']['連結']((this['負合計配列']));
this['描画用データ']=this['_DATA']['射影']((this['f2']['挿入']((1),(this['f1']))))['行列入れ替え']();
this['f2']['位置で消す']((1));
this['正高さ配列']=this['配列']['作る']();
this['負高さ配列']=this['配列']['作る']();
this['横幅設定']((this['フィールド数']));
this['縦幅設定']((this['データ補正用配列']));
this['メモリ線描画']((this['フィールド数']));
this['ペン']=this['タートル']['作る']()['線の太さ']((1));
this['ペン']['ぺんなし']()['位置'](((this['グラフ']['_原点x']+this['_間隔'])),(this['グラフ']['_原点y']))['左回り']((90));
this['ラベルx']=((this['グラフ']['_原点x']+this['_間隔'])+(this['_プロット幅']/(2)));
this['ラベルy']=(this['グラフ']['_原点y']-(10));
dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['data_y']=this['描画用データ']['射影']((((this['data_x']['データ']['読む']((j)))+"")));
this['ラベルサイズ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_プロット幅']>(10));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (10);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_プロット幅'];
}));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var n;
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['正高さ配列']['書く']((0));
return this['負高さ配列']['書く']((0));
}));
n=this['data_y']['データ']['読む']((i));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最大メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最大メモリ'];
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n<=this['_最小メモリ']);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最小メモリ'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最小メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['移動値']=this['正高さ配列']['読む']((i));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['移動値']=this['負高さ配列']['読む']((i));
}));
n=(((n-this['_起点メモリ']))*(this['_DACOL']));
this['ペン']['ぺんなし']()['移動する']((0),(this['移動値']));
return this['ペン']['ペンあり']()['歩く']((n))['右回り']((90))['歩く']((this['_プロット幅']))['右回り']((90))['歩く']((n))['右回り']((180))['図形にする']((this['着色']((j))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['移動する']((this['_プロット幅']),(0));
}));
this['ペン']['ペンなし']()['移動する']((this['_間隔']),((-(1)*this['移動値'])));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>(0));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['正高さ配列']['上書き']((i),(((this['正高さ配列']['読む']((i)))+n)));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['負高さ配列']['上書き']((i),(((this['負高さ配列']['読む']((i)))+n)));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['横軸ラベル']=this['f2']['読む']((i));
this['横軸ラベル長']=((this['横軸ラベル']+""))['長さ?']();
this['調整']=(0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['横軸ラベル長']<(3));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['調整']=((((3)-this['横軸ラベル長']))*(5));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['横軸ラベル長']>(3));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['調整']=((-(1)*((this['横軸ラベル長']-(3))))*(3));
}));
this['ラベル']['作る']((this['横軸ラベル']))['文字サイズ']((this['_軸ラベルサイズ']))['位置']((((this['ラベルx']+this['調整'])-(this['横軸ラベル長']*(3)))),(this['ラベルy']));
return this['ラベルx']=((this['ラベルx']+this['_間隔'])+this['_プロット幅']);
}));
})['繰り返す']((this['フィールド数']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_底']>=this['ラベルy']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_底']=(this['ラベルy']-(30));
}));
return this['ペン']['ぺんなし']()['位置'](((this['グラフ']['_原点x']+this['_間隔'])),(this['グラフ']['_原点y']));
})['繰り返す']((this['系列数']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['系列数']>(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ペンなし']()['位置']((this['グラフ']['_原点x']),((this['_底']-(10))));
this['系列ラベルx']=(this['グラフ']['_原点x']+(10));
this['系列ラベルy']=(this['_底']+(10));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['系列名']=this['data_x']['読む']((i));
this['系列名長']=((this['系列名']+""))['長さ?']();
this['ペン']['ペンあり']()['角形']((6),(4))['図形を作る']((this['着色']((i))));
this['a']=this['ラベル']['作る']((this['系列名']))['位置']((this['系列ラベルx']),(this['系列ラベルy']))['文字サイズ'](((this['_軸ラベルサイズ']-(2))));
this['ペン']['ペンなし']()['移動する']((((this['系列名長']*(10))+(16))),(0));
return this['系列ラベルx']=(this['系列ラベルx']+(((this['系列名長']*(10))+(16))));
})['繰り返す']((this['系列数']));
return this['_底']=(this['_底']-(20));
}));
this['ペン']['消える']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_横軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['横軸タイトル'](("項目"));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_縦軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['縦軸タイトル']((""));
}));
this['縦軸タイトル描画']();
this['横軸タイトル描画']();
this['グラフ']['_原点x']=(this['_右端']+(60));
this['_最小メモリ']=this['undef'];
return this;
});
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_積み上げ棒グラフ']['f2']===this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_積み上げ棒グラフ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_fn']((this['_積み上げ棒グラフ']['f2']));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_積み上げ棒グラフ']['_DATA']['射影']((this['_積み上げ棒グラフ']['f2']['読む']((1))))['check_dt']();
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_積み上げ棒グラフ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}));
});
this['テーブル']['折れ線グラフ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var _max;
var _maxf;
this['_折れ線グラフ']=this['グラフ']['作る']();
this['_折れ線グラフ']['種類']="折れ線グラフ";
this['_折れ線グラフ']['_DATA']=this;
this['_折れ線グラフ']['f1']=this['フィールド名']['読む']((1));
this['_折れ線グラフ']['f2']=this['getarg']((_rest));
this['_折れ線グラフ']['描画']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['_向き']="縦";
this['位置確定']();
this['data_x']=this['_DATA']['射影']((this['f1']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['f2']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['f2']=this['配列']['作る']();
this['_DATA']['フィールド名']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['f2']['書く']((n));
}));
return this['f2']['位置で消す']((1));
}));
this['data_y']=this['_DATA']['射影']((this['f2']));
this['要素数']=this['data_x']['データ']['要素数?']();
this['系列数']=this['f2']['要素数?']();
this['最大長']=(0);
this['data_x']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((((n+""))['長さ?']())>this['最大長']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['最大長']=((n+""))['長さ?']();
}));
}));
this['ラベル数']=((this['要素数']/(32))).ceil();
this['横幅設定']((this['要素数']));
this['縦幅設定']((this['data_y']));
this['メモリ線描画']((this['要素数']));
this['ペン']=this['タートル']['作る']()['線の太さ']((2));
this['ラベルx']=(this['グラフ']['_原点x']+(this['_間隔']));
this['ラベルy']=(this['グラフ']['_原点y']-(10));
dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['data_y']=this['_DATA']['射影']((this['f2']['読む']((j))));
this['ラベルサイズ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_プロット幅']>(10));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (10);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_プロット幅'];
}));
this['data_y']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_メモリ範囲'];
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最大メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=this['_最大メモリ'];
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n<=this['_最小メモリ']);
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return }));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['plot_flag']=this['false'];
this['y1']=((((n-this['_起点メモリ']))*(this['_DACOL']))+this['グラフ']['_原点y']);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['y1']>=this['_最小メモリ']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['plot_flag']=this['true'];
}));
this['プロットx']=((this['グラフ']['_原点x']+this['_間隔'])+(this['_プロット幅']/(2)));
this['ペン']['ペンなし']()['位置']((this['プロットx']),(this['y1']));
return this['x1']=this['プロットx'];
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n>=this['_最小メモリ']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
n=((((n-this['_起点メモリ']))*(this['_DACOL']))+this['グラフ']['_原点y']);
this['x2']=(this['x1']+((this['_間隔']+this['_プロット幅'])));
this['y2']=n;
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['plot_flag'];
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_マーカフラグ'];
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['ペンあり']()['角形']((4),(8))['図形にする']((this['着色']((j))))['移動する'](-(2),(5));
}));
}));
this['ペン']['ぺんあり']()['位置']((this['プロットx']),(n))['図形を作る']((this['着色']((j))));
this['プロットx']=(this['プロットx']+((this['_間隔']+this['_プロット幅'])));
this['x1']=this['x2'];
this['y1']=this['y2'];
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===this['要素数']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_マーカフラグ'];
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['ペンあり']()['角形']((4),(8))['図形にする']((this['着色']((j))))['移動する'](-(2),(5));
}));
}));
return this['plot_flag']=this['true'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
n=(((n-this['_起点メモリ']))*(this['_DACOL']));
this['x2']=(this['x1']+((this['_間隔']+this['_プロット幅'])));
this['y2']=n;
this['x軸交点']=((((-(1)*this['y1'])/((this['y2']-this['y1'])))/((this['x2']-this['x1'])))+this['x1']);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['plot_flag'];
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_マーカフラグ'];
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ペンあり']()['角形']((4),(8))['図形にする']((this['着色']((j))))['移動する'](-(2),(5));
return this['ペン']['ぺんあり']()['位置']((this['x軸交点']),(this['グラフ']['_原点y']))['図形を作る']((this['着色']((j))));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['ぺんなし']()['位置']((this['x軸交点']),(this['グラフ']['_原点y']));
}));
this['プロットx']=(this['プロットx']+((this['_間隔']+this['_プロット幅'])));
this['x1']=this['x2'];
this['y1']=this['y2'];
return this['plot_flag']=this['false'];
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((((i-(1)))%(this['ラベル数'])))===(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['横軸ラベル']=this['data_x']['読む']((i));
this['横軸ラベル長']=((this['横軸ラベル']+""))['長さ?']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (((this['最大長']*(5)))>this['_プロット幅']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['縦表示']((this['横軸ラベル']),(this['ラベルx']),(this['ラベルy']),"",(this['最大長']));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ラベル']['作る']((this['横軸ラベル']))['文字サイズ']((this['_軸ラベルサイズ']))['位置'](((this['ラベルx']-((this['横軸ラベル長']*(5))/(2)))),(this['ラベルy']));
}));
return this['ラベルx']=(this['ラベルx']+(((this['_間隔']+this['_プロット幅']))*this['ラベル数']));
}));
}));
}));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_底']>=this['ラベルy']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_底']=(this['ラベルy']-(30));
}));
})['繰り返す']((this['系列数']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['系列数']>(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ペンなし']()['位置']((this['グラフ']['_原点x']),((this['_底']-(12))));
this['系列ラベルx']=(this['グラフ']['_原点x']+(10));
this['系列ラベルy']=this['_底'];
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['系列名']=this['f2']['読む']((i));
this['系列名長']=((this['系列名']+""))['長さ?']();
this['ペン']['ペンあり']()['角形']((6),(4))['図形を作る']((this['着色']((i))));
this['a']=this['ラベル']['作る']((this['系列名']))['位置']((this['系列ラベルx']),(this['系列ラベルy']))['文字サイズ']((this['_軸ラベルサイズ']));
this['ペン']['ペンなし']()['移動する']((((this['系列名長']*(16))+(16))),(0));
return this['系列ラベルx']=(this['系列ラベルx']+(((this['系列名長']*(16))+(16))));
})['繰り返す']((this['系列数']));
return this['_底']=(this['_底']-(20));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_横軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['横軸タイトル']((this['f1']));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_縦軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['縦軸タイトル']((""));
}));
this['縦軸タイトル描画']();
this['横軸タイトル描画']();
this['グラフ']['_原点x']=(this['_右端']+(60));
this['ペン']['消える']();
this['_最小メモリ']=this['undef'];
return this;
});
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_折れ線グラフ']['f2']===this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_折れ線グラフ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_fn']((this['_折れ線グラフ']['f2']));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_折れ線グラフ']['_DATA']['射影']((this['_折れ線グラフ']['f2']['読む']((1))))['check_dt']();
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_折れ線グラフ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}));
});
this['テーブル']['円グラフ']=dtlbind(this,function(f2){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['どれか']['本当'](((f2==="")),((f2===this['undef'])));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return f2=(this['フィールド名'])['読む']((2));
}));
this['_円グラフ']=this['グラフ']['作る']();
this['_円グラフ']['_DATA']=this;
this['_円グラフ']['f1']=this['フィールド名']['読む']((1));
this['_円グラフ']['f2']=f2;
this['_円グラフ']['描画']=dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['位置確定']();
this['移動する']((20),(0));
this['ペン']=this['タートル']['作る']();
this['D_f1']=this['_DATA']['小さい順']((f2))['射影']((this['f1']));
this['r']=(this['グラフ']['_縦幅']/(2));
this['x']=(90);
this['x_pos']=(this['r']+(20));
this['y_pos']=(-(1)*this['r']);
this['_円原点x']=(this['グラフ']['_原点x']+this['r']);
this['_円原点y']=(this['グラフ']['_原点y']+(this['r']/(2)));
this['d_arr']=this['_DATA']['小さい順']((f2))['射影']((f2));
this['sum']=this['d_arr']['合計値']((f2))['値読み出し']();
this['add']=(0);
this['_左端']=(((this['_円原点x'])-(this['r']))-(20));
this['_天井']=(((this['_円原点y'])+(this['r']))+(30));
this['_底']=(((this['_円原点y'])+this['y_pos'])-(20));
this['要素数']=this['d_arr']['データ']['要素数?']();
this['_max_length']=(1);
this['角度合計']=(0);
this['割合合計']=(0);
this['d_arr']['データ']['それぞれ実行'](dtlbind(this,function(val,j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['prop']=((((val/this['sum']))*(1000))).round();
this['prop']=(this['prop']/(10));
this['チーズ角度']=((this['prop']*(3.6))).round();
this['col']=this['グラフ']['着色']((j));
this['long']=(0);
this['割合合計']=(this['割合合計']+this['prop']);
this['角度合計']=(this['角度合計']+this['チーズ角度']);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===this['要素数']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['角度合計']>(360));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['チーズ角度']=(this['チーズ角度']-((this['角度合計']-(360))));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['角度合計']<(360));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['チーズ角度']=(this['チーズ角度']+(((360)-this['角度合計'])));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['割合合計']>(100));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['prop']=(this['prop']-((this['割合合計']-(100))));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['割合合計']<(100));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['prop']=(this['prop']+(((100)-this['割合合計'])));
}));
return this['prop']=((((this['prop']*(10))).round())/(10));
}));
this['ペン']['ペンなし']()['位置']((0),(0));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['チーズ角度']!==(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['チーズ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ペンあり']()['線の太さ']((1))['位置']((((this['r'])*(this['x']).cos())),(((this['r'])*(this['x']).sin())));
this['x']=(this['x']+(1));
this['long']=(this['long']+(1));
return this['ペン'];
})['繰り返す']((this['チーズ角度']))['位置']((0),(0))['図形を作る']((this['col']));
this['チーズ']['位置']((this['_円原点x']),(this['_円原点y']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['long'])>=(20));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ラベル']['作る'](((this['prop']+"%")))['位置']((((this['_円原点x']+((((this['r']/(3))*(2)))*((this['x']-((this['long']/(2))))).cos()))-(5))),((this['_円原点y']+((((this['r']/(3))*(2)))*((this['x']-((this['long']/(2))))).sin()))))['文字サイズ'](((this['_軸ラベルサイズ']-(4))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ラベル']['作る'](((this['prop']+"%")))['位置']((((this['_円原点x']+((((this['r']/(4))*(5)))*((this['x']-((this['long']/(2))))).cos()))-(5))),((this['_円原点y']+((((this['r']/(4))*(5)))*((this['x']-((this['long']/(2))))).sin()))))['文字サイズ'](((this['_軸ラベルサイズ']-(5))));
return this['ペン']['ペンなし']()['位置']((((this['_円原点x']+((((this['r']/(4))*(5)))*((this['x']-((this['long']/(2))))).cos()))+(5))),(((this['_円原点y']+((((this['r']/(4))*(5)))*((this['x']-((this['long']/(2))))).sin()))-(25))))['ペンあり']()['位置'](((this['_円原点x']+((this['r'])*((this['x']-((this['long']/(2))))).cos()))),((this['_円原点y']+((this['r'])*((this['x']-((this['long']/(2))))).sin()))))['図形を作る']((this['黒']));
}));
this['ペン']['ペンなし']()['位置'](((this['_円原点x']+this['x_pos'])),((this['_円原点y']+this['y_pos'])))['ペンあり']()['角形']((10),(4))['図形を作る']((this['col']));
this['A']=this['ラベル']['作る']((this['D_f1']['データ']['読む']((j))))['位置']((((this['_円原点x']+this['x_pos'])+(15))),(((this['_円原点y']+this['y_pos'])+(10))))['文字サイズ']((this['_軸ラベルサイズ']));
this['ラベル']['作る'](((("  "+(this['d_arr']['読む']((j))))+"件")))['位置'](((((this['_円原点x']+this['x_pos'])+(15))+(this['A']['幅?']()))),(((this['_円原点y']+this['y_pos'])+(10))))['文字サイズ']((this['_軸ラベルサイズ']));
this['y_pos']=(this['y_pos']+(20));
this['sum_length']=(((((this['D_f1']['データ']['読む']((j)))+""))['長さ?']())+(((("    "+(this['d_arr']['読む']((j))))+"件"))['長さ?']()));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_max_length']<this['sum_length']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_max_length']=this['sum_length'];
}));
}));
}));
this['_右端']=((this['_円原点x']+this['x_pos'])+((15)*(this['_max_length'])));
this['グラフ']['_原点x']=(this['_右端']+(60));
this['ペン']['消える']();
this['_最小メモリ']=this['undef'];
return this;
});
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['どれか']['本当'](((f2===this['undef'])),((this['_円グラフ']['_DATA']===this['undef'])));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['check_fn']((this['_円グラフ']['f2']));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['射影']((this['_円グラフ']['f2']))['check_dt']();
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_円グラフ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}));
});
this['テーブル']['帯グラフ']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var 補正;
this['_帯グラフ']=this['グラフ']['作る']();
this['_帯グラフ']['_DATA']=this;
this['_帯グラフ']['f1']=this['フィールド名']['読む']((1));
this['_帯グラフ']['joint_pos']=this['配列']['作る']();
this['_帯グラフ']['f2']=this['getarg']((_rest));
this['_帯グラフ']['_帯長さ']=((this['_帯グラフ']['_横幅'])/(100));
this['_帯グラフ']['_方向']="帯";
this['_帯グラフ']['描画']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
var 系列長;
var kxpos;
this['位置確定']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['f2']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['tmp']=(this['_DATA']['フィールド名'])['concat']();
return this['f2']=this['tmp']['位置で消す']((1));
}));
this['型配列']=this['型判定']((this['_DATA']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['型配列']['要素数?']())>(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['型配列']['それぞれ実行'](dtlbind(this,function(n){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['f2']=this['f2']['消す']((n));
}));
}));
this['data_x']=this['_DATA']['射影']((this['f1']));
this['フィールド数']=this['f2']['要素数?']();
this['系列数']=this['data_x']['データ']['要素数?']();
this['ペン']=this['タートル']['作る']()['線の太さ']((1));
this['横の位置配列']=this['配列']['作る']();
this['注釈フラグ']=this['false'];
this['描画用データ']=this['_DATA']['射影']((this['f2']['挿入']((1),(this['f1']))))['行列入れ替え']();
this['f2']['位置で消す']((1));
this['横幅設定']((this['フィールド数']));
this['メモリ線描画']((this['フィールド数']));
this['_プロット幅']=this['_プロット幅'];
this['ペン']['ぺんなし']()['位置']((this['グラフ']['_原点x']),((this['グラフ']['_原点y']+this['_間隔'])));
this['ラベルx']=(this['グラフ']['_原点x']-(10));
this['ラベルy']=(this['グラフ']['_原点y']+(((this['_間隔']+(this['_プロット幅']/(2)))+(this['_軸ラベルサイズ']))));
this['割合ラベルy']=(this['グラフ']['_原点y']+(((this['_間隔']+(this['_プロット幅']/(2)))+(this['_軸ラベルサイズ']))));
dtlbind(this,function(j){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['data_y']=this['描画用データ']['射影']((((this['data_x']['読む']((j)))+"")));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
var n;
this['合計']=this['_DATA']['合計値']((this['f2']['読む']((i))))['数にする']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['横の位置配列']['書く']((0));
}));
n=this['data_y']['データ']['読む']((i));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (n==="");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return n=(0);
}));
this['val']=this['f2']['読む']((i));
this['メモリ調整']=((((this['val']+""))['長さ?']())*(12));
this['割合']=(((((n/this['合計']))*(1000))).round()/(10));
this['ペン']['ペンなし']()['移動する']((this['横の位置配列']['読む']((i))),(0));
this['ペン']['ペンあり']()['歩く']((((this['_帯長さ'])*this['割合'])))['左回り']((90))['歩く']((this['_プロット幅']))['左回り']((90))['歩く']((((this['_帯長さ'])*this['割合'])))['左回り']((180))['図形にする']((this['着色']((j))));
this['ペン']['ペンなし']()['移動する']((0),(this['_間隔']));
this['ペン']['ペンなし']()['移動する'](((-(1)*(this['横の位置配列']['読む']((i))))),(0));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['割合']!==(0));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ラベル']['作る'](((this['割合']+"%")))['位置'](((((this['グラフ']['_原点x']+(this['横の位置配列']['読む']((i))))+((((this['_帯長さ'])*this['割合']))/(2)))-(10))),(this['割合ラベルy']))['文字サイズ']((this['_軸ラベルサイズ']));
}));
this['横の位置配列']['上書き']((i),(((this['横の位置配列']['読む']((i)))+((this['_帯長さ'])*this['割合']))));
this['割合ラベルy']=(this['割合ラベルy']+((this['_間隔']+this['_プロット幅'])));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (j===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ラベル']['作る']((this['val']))['文字サイズ']((this['_軸ラベルサイズ']))['位置'](((this['ラベルx']-this['メモリ調整'])),(this['ラベルy']));
this['ラベルy']=(this['ラベルy']+((this['_間隔']+this['_プロット幅'])));
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_左端']>=(((this['ラベルx']-this['メモリ調整'])-(30))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_左端']=((this['ラベルx']-this['メモリ調整'])-(30));
}));
}));
})['繰り返す']((this['フィールド数']));
this['割合ラベルy']=(this['グラフ']['_原点y']+(((this['_間隔']+(this['_プロット幅']/(2)))+(this['_軸ラベルサイズ']))));
this['ペン']['ぺんなし']()['位置']((this['グラフ']['_原点x']),((this['グラフ']['_原点y']+this['_間隔'])));
this['横の位置配列']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (i===(1));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン2']=this['タートル']['作る']()['線の色']((this['色']['作る']((12434877))));
return this['ペン2']['線の色']((this['赤']))['ペンなし']()['位置'](((this['グラフ']['_原点x']+n)),(((this['グラフ']['_原点y']+this['_間隔'])+this['_プロット幅'])));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン2']['線の色']((this['色']['作る']((12434877))))['ペンあり']()['位置'](((this['グラフ']['_原点x']+n)),(((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*i))-this['_プロット幅'])))['図形を作る']();
return this['ペン2']['ペンなし']()['移動する']((0),(this['_プロット幅']))['消える']();
}));
return this['ペン2']['消える']();
}));
return this['ペン']['ぺんなし']()['位置']((this['グラフ']['_原点x']),((this['グラフ']['_原点y']+this['_間隔'])));
})['繰り返す']((this['系列数']));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['系列数']>(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ペンなし']()['位置']((this['グラフ']['_原点x']),((this['_底']+(1))));
this['系列ラベルx']=(this['グラフ']['_原点x']+(10));
this['系列ラベルy']=(this['_底']+(7));
dtlbind(this,function(i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
this['系列名']=this['data_x']['読む']((i));
this['系列名長']=((this['系列名']+""))['長さ?']();
this['ペン']['ペンあり']()['角形']((6),(4))['図形を作る']((this['着色']((i))));
this['ラベル']['作る']((this['系列名']))['位置']((this['系列ラベルx']),(this['系列ラベルy']))['文字サイズ'](((this['_軸ラベルサイズ']-(2))));
this['ペン']['ペンなし']()['移動する']((((this['系列名長']*(12))+(16))),(0));
return this['系列ラベルx']=(this['系列ラベルx']+(((this['系列名長']*(12))+(16))));
})['繰り返す']((this['系列数']));
return this['_底']=(this['_底']-(20));
}));
this['ペン']['消える']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_横軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['横軸タイトル']((this['f1']));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_縦軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['縦軸タイトル']((""));
}));
this['縦軸タイトル描画']();
this['横軸タイトル描画']();
this['グラフ']['_原点x']=(this['_右端']+(60));
this['_最小メモリ']=this['undef'];
return this;
});
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_帯グラフ']['f2']===this['undef']);
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_帯グラフ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((this['check_fn']((this['_帯グラフ']['f2']))),((this['_帯グラフ']['_DATA']!==this['undef'])));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_帯グラフ']['_DATA']['射影']((this['_帯グラフ']['f2']['読む']((1))))['check_dt']();
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_帯グラフ'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}));
});
this['テーブル']['散布図']=dtlbind(this,function(f1,f2,flag){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,3);
this['_散布図']=this['グラフ']['作る']();
this['_散布図']['_DATA']=this;
this['_散布図']['f1']=f1;
this['_散布図']['f2']=f2;
this['_散布図']['_方向']="散布図";
this['_散布図']['_グリッド線なし']=this['false'];
this['_散布図']['_横幅']=this['グラフ']['_縦幅'];
this['_散布図']['_縦幅']=this['グラフ']['_縦幅'];
this['_散布図']['_天井']=(this['_散布図']['_原点y']+this['_散布図']['_横幅']);
this['_散布図']['_原点y']=(this['_散布図']['_原点y']-(10));
this['_散布図']['描画']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['位置確定']();
this['ペン']=this['タートル']['作る']();
this['data_x']=this['_DATA']['射影']((f1));
this['data_y']=this['_DATA']['射影']((f2));
this['_DACOLX']=this['データ補正値計算']((this['data_x']['データ']),(this['_横幅']));
this['_scalex']=this['_scale'];
this['_段数x']=this['_段数'];
this['_桁x']=this['_digit'];
this['_最大メモリ']=this['undef'];
this['_最小メモリ']=this['undef'];
this['_DACOLY']=this['データ補正値計算']((this['data_y']['データ']),(this['_縦幅']));
this['_scaley']=this['_scale'];
this['_段数y']=this['_段数'];
this['_桁y']=this['_digit'];
this['メモリ線描画']();
this['data_x']['データ']['それぞれ実行'](dtlbind(this,function(val,cnt){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(val*this['_DACOLX']))),(((((this['data_y']['データ']['読む']((cnt)))*this['_DACOLY'])+this['グラフ']['_原点y'])+(3))))['ペンあり']()['角形']((4),(6))['図形を作る']((this['赤']));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_横軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['横軸タイトル']((f1));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_縦軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['縦軸タイトル']((f2));
}));
this['縦軸タイトル描画']();
this['横軸タイトル描画']();
this['ペン']['消える']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_近似'];
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['最小二乗法']();
return this['_近似']=this['false'];
}));
this['グラフ']['_原点x']=(this['_右端']+(60));
this['_最小メモリ']=this['undef'];
return this;
});
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['どれか']['本当'](((this['_散布図']['f1']===this['undef'])),((this['_散布図']['f2']===this['undef'])));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((this['check_fn']((this['_散布図']['f1']))),(this['check_fn']((this['_散布図']['f2']))));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((this['_散布図']['_DATA']['射影']((this['_散布図']['f1']))['check_dt']()),(this['_散布図']['_DATA']['射影']((this['_散布図']['f2']))['check_dt']()));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_散布図'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}));
});
return this['テーブル']['箱ひげ図']=dtlbind(this,function(f1,f2){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['_箱ひげ図']=this['グラフ']['作る']();
this['_箱ひげ図']['_DATA']=this;
this['_箱ひげ図']['f1']=f1;
this['_箱ひげ図']['f2']=f2;
this['_箱ひげ図']['描画']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['位置確定']();
this['data_x']=this['_DATA']['内部_重複なし']((f1));
this['f1_num']=(0);
this['f2_num']=(0);
this['data_y']=this['_DATA']['射影']((f2));
this['要素数']=this['data_x']['データ']['要素数?']();
this['プロット数']=this['data_y']['データ']['要素数?']();
this['横幅設定']((this['要素数']));
this['縦幅設定']((this['data_y']));
this['メモリ線描画']((this['要素数']));
dtlbind(this,function(番号){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['_DATA']['フィールド名']['読む']((番号)))===(f1));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['f1_num']=番号;
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return ((this['_DATA']['フィールド名']['読む']((番号)))===(f2));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['f2_num']=番号;
}));
})['繰り返す']((this['_DATA']['フィールド名']['要素数?']()));
this['ペン']=this['タートル']['作る']()['線の太さ']((1));
this['data_x']['データ']['それぞれ実行'](dtlbind(this,function(f,cnt){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['tmp']=this['_DATA']['レコード取り出し']((f),(this['f1_num']));
this['tmp2']=this['tmp']['射影']((f2));
this['tmp3']=this['tmp']['射影']((f2));
this['qua3']=this['tmp']['第3四分位数']((f2))['値読み出し']();
this['qua2']=this['tmp']['中央値']((f2))['値読み出し']();
this['qua1']=this['tmp']['第1四分位数']((f2))['値読み出し']();
this['ave']=this['tmp']['平均値']((f2))['値読み出し']();
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['qua1']!==this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['IRQ']=(this['qua3']-this['qua1']);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="縦");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['tmp2']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['どれか']['本当'](((n>((this['qua3']+(this['IRQ']*(1.5)))))),((n<((this['qua1']-(this['IRQ']*(1.5)))))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ペンなし']()['位置'](((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))),((this['グラフ']['_原点y']+(n*this['_DACOL']))))['ぺんあり']()['円']((3));
return this['tmp3']['データ']['消す']((n));
}));
}));
this['_max']=this['tmp3']['最大値']((f2))['値読み出し']();
this['_min']=this['tmp3']['最小値']((f2))['値読み出し']();
this['ペン']['ぺんなし']()['位置']((((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))-(((((20)/((2)).sqrt()))/(2))))),(((this['グラフ']['_原点y']+(this['ave']*(this['_DACOL'])))+(((((20)/((2)).sqrt()))/(2))))))['右回り']((45))['ぺんあり']()['歩く']((20))['ペンなし']()['位置']()['左回り']((45));
this['ペン']['ぺんなし']()['位置']((((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))-(((((20)/((2)).sqrt()))/(2))))),(((this['グラフ']['_原点y']+(this['ave']*(this['_DACOL'])))-(((((20)/((2)).sqrt()))/(2))))))['左回り']((45))['ぺんあり']()['歩く']((20))['ペンなし']()['位置']()['右回り']((45));
this['ペン']['ペンなし']()['位置'](((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))),((this['グラフ']['_原点y']+(this['_max']*this['_DACOL']))))['ペンあり']()['位置'](((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))),((this['グラフ']['_原点y']+(this['qua3']*this['_DACOL']))));
this['ペン']['ペンなし']()['位置'](((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))),((this['グラフ']['_原点y']+(this['qua1']*this['_DACOL']))))['ペンあり']()['位置'](((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))),((this['グラフ']['_原点y']+(this['_min']*this['_DACOL']))));
this['ペン']['ペンなし']()['位置']((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])),((this['グラフ']['_原点y']+(this['qua3']*this['_DACOL']))))['ペンあり']()['位置']((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])),((this['グラフ']['_原点y']+(this['qua1']*this['_DACOL']))));
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))),((this['グラフ']['_原点y']+(this['qua3']*this['_DACOL']))))['ペンあり']()['位置'](((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))),((this['グラフ']['_原点y']+(this['qua1']*this['_DACOL']))));
this['ペン']['ペンなし']()['位置']((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])),((this['グラフ']['_原点y']+(this['qua3']*this['_DACOL']))))['ペンあり']()['歩く']((this['_プロット幅']));
this['ペン']['ペンなし']()['位置']((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])),((this['グラフ']['_原点y']+(this['qua2']*this['_DACOL']))))['ペンあり']()['歩く']((this['_プロット幅']));
this['ペン']['ペンなし']()['位置']((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])),((this['グラフ']['_原点y']+(this['qua1']*this['_DACOL']))))['ペンあり']()['歩く']((this['_プロット幅']));
this['ペン']['ペンなし']()['位置']((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])),((this['グラフ']['_原点y']+(this['_max']*this['_DACOL']))))['ペンあり']()['歩く']((this['_プロット幅']));
this['ペン']['ペンなし']()['位置']((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])),((this['グラフ']['_原点y']+(this['_min']*this['_DACOL']))))['ペンあり']()['歩く']((this['_プロット幅']))['ペンなし']();
this['プロット']=this['ペン']['図形にする']();
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (cnt===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['data_x']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['長']=((n+""))['長さ?']();
this['調整']=(0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['長']<(3));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['調整']=((((3)-this['長']))*(5));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['長']>(3));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['調整']=((-(1)*((this['長']-(3))))*(2));
}));
return this['ラベル']['作る']((n))['文字サイズ']((this['_軸ラベルサイズ']))['位置'](((((this['グラフ']['_原点x']+(((this['_間隔']+this['_プロット幅']))*i))-(this['_プロット幅']/(2)))-(this['長']*(5)))),((this['グラフ']['_原点y']-(10))));
}));
return this['_底']=(this['_底']-(30));
}));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_方向']==="横");
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (cnt===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['ペン']['左回り']((90));
}));
this['tmp2']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['どれか']['本当'](((n>((this['qua3']+(this['IRQ']*(1.5)))))),((n<((this['qua1']-(this['IRQ']*(1.5)))))));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(n*this['_DACOL']))),((((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))))['ぺんあり']()['円']((3));
return this['tmp3']['データ']['消す']((n));
}));
}));
this['_max']=this['tmp3']['最大値']((f2))['値読み出し']();
this['_min']=this['tmp3']['最小値']((f2))['値読み出し']();
this['ペン']['ぺんなし']()['位置']((((this['グラフ']['_原点x']+(this['ave']*(this['_DACOL'])))-(((((20)/((2)).sqrt()))/(2))))),(((((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))-(((((20)/((2)).sqrt()))/(2))))))['右回り']((45))['ぺんあり']()['歩く']((20))['ペンなし']()['位置']()['左回り']((45));
this['ペン']['ぺんなし']()['位置']((((this['グラフ']['_原点x']+(this['ave']*(this['_DACOL'])))+(((((20)/((2)).sqrt()))/(2))))),(((((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))-(((((20)/((2)).sqrt()))/(2))))))['左回り']((45))['ぺんあり']()['歩く']((20))['ペンなし']()['位置']()['右回り']((45));
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(this['_max']*this['_DACOL']))),((((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))))['ペンあり']()['位置'](((this['グラフ']['_原点x']+(this['qua3']*this['_DACOL']))),((((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))));
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(this['qua1']*this['_DACOL']))),((((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))))['ペンあり']()['位置'](((this['グラフ']['_原点x']+(this['_min']*this['_DACOL']))),((((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])+((this['_プロット幅']/(2))))));
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(this['qua3']*this['_DACOL']))),(((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])))['ペンあり']()['位置'](((this['グラフ']['_原点x']+(this['qua1']*this['_DACOL']))),(((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])));
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(this['qua3']*this['_DACOL']))),((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))))['ペンあり']()['位置'](((this['グラフ']['_原点x']+(this['qua1']*this['_DACOL']))),((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))));
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(this['qua3']*this['_DACOL']))),(((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])))['ペンあり']()['歩く']((this['_プロット幅']));
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(this['qua2']*this['_DACOL']))),(((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])))['ペンあり']()['歩く']((this['_プロット幅']));
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(this['qua1']*this['_DACOL']))),(((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])))['ペンあり']()['歩く']((this['_プロット幅']));
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(this['_max']*this['_DACOL']))),(((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])))['ペンあり']()['歩く']((this['_プロット幅']));
this['ペン']['ペンなし']()['位置'](((this['グラフ']['_原点x']+(this['_min']*this['_DACOL']))),(((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*cnt))-this['_プロット幅'])))['ペンあり']()['歩く']((this['_プロット幅']))['ペンなし']();
this['プロット']=this['ペン']['図形にする']();
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (cnt===(1));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
this['最長']=(0);
this['data_x']['データ']['それぞれ実行'](dtlbind(this,function(n,i){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,2);
this['長']=((n+""))['長さ?']();
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['長']>this['最長']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['最長']=this['長'];
}));
this['調整']=(0);
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['長']<(3));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['調整']=((((3)-this['長']))*(5));
}))['なら'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['長']>(3));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['調整']=((-(1)*((this['長']-(3))))*(2));
}));
return this['ラベル']['作る']((n))['文字サイズ']((this['_軸ラベルサイズ']))['位置'](((((this['グラフ']['_原点x']-(20))+this['長'])-(this['長']*(10)))),((((this['グラフ']['_原点y']+(((this['_間隔']+this['_プロット幅']))*i))-(this['_プロット幅']/(2)))+(10))));
}));
return this['_左端']=(this['_左端']-(this['最長']*(15)));
}));
}));
}));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_横軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['横軸タイトル'](("項目"));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return (this['_縦軸タイトル文']===this['undef']);
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['縦軸タイトル']((""));
}));
this['縦軸タイトル描画']();
this['横軸タイトル描画']();
this['グラフ']['_原点x']=(this['_右端']+(60));
this['ペン']['図形にする']();
this['ペン']['消える']();
this['_最小メモリ']=this['undef'];
return this;
});
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['どれか']['本当'](((this['_箱ひげ図']['f1']===this['undef'])),((this['_箱ひげ図']['f2']===this['undef'])));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((this['check_fn']((this['_箱ひげ図']['f1']))),(this['check_fn']((this['_箱ひげ図']['f2']))));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_箱ひげ図']['_DATA']['射影']((this['_箱ひげ図']['f2']))['check_dt']();
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['_箱ひげ図'];
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['undef'];
}));
}));
});
});
//# sourceMappingURL=db.js.map
