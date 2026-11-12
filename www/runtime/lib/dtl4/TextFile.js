(function(){this['テキストファイル']=this['作る']();
this['テキストファイル']['initialize']=dtlbind(this,function(filename){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,1);
this['text']=this['fromWebStorage']((filename));
dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['text'];
})['else']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['text']=this['fromServer']((filename));
}));
this['arr']=this['text']['split']((this['window']['RegExp']("[\r\n]")));
return this['arr'];
});
this['テキストファイル']['fromServer']=dtlbind(this,function(filename){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,1);
this['opt']=this['system']['new'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return }));
this['opt']['url']="./";
dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return filename['含む?']("^data/");
})['そうでなければ']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['opt']['url']=(this['opt']['url']+"data/");
}));
this['opt']['url']=(this['opt']['url']+filename);
this['opt']['async']=root['false'];
this['file']=this['window']['$']['ajax']((this['opt']));
return dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['file']['responseText']['含む?']("404 Not Found");
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return "ファイルが存在しません。ファイル名を見直してください";
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['file']['responseText'];
}));
});
this['テキストファイル']['fromWebStorage']=dtlbind(this,function(filename){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,1);
dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return filename['含む?']("^data/");
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return filename=filename['置き換える']("^data/","");
}));
return root['window']['localStorage']['getItem']((("dtl/uploadFile/"+filename)));
});
return this['テキストファイル']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['arr'];
});
}).checkerror().apply(root,[]);

/*
テキストファイル＝！作る。
テキストファイル：initialize=[|filename|
    text=自分！(filename)fromWebStorage.
     [text]!else[
         text=自分！（filename）fromServer.
     ]execute.
  	arr=text!(window!"[\r\n]"RegExp)split.
    arr.
].
テキストファイル：fromServer=[|filename|
    opt=system![]new.
    opt:url="./".
    「filename!"^data/"含む？」！そうでなければ「
        opt:url=opt:url+"data/"．
    」実行．
    opt:url=opt:url+filename.
    opt:async=:false.
    file=window:$!(opt)ajax.
    「file:responseText!"404 Not Found" 含む？」！なら「
        "ファイルが存在しません。ファイル名を見直してください"。
    」そうでなければ「
        file:responseText。
    」実行。
].
テキストファイル：fromWebStorage=[|filename|
    「filename!"^data/"含む？」！なら「
        filename=filename!"^data/" ""置き換える。
    」実行．
    :window:localStorage!("dtl/uploadFile/"+filename)getItem
].
テキストファイル：読む＝「arr」。
*/
