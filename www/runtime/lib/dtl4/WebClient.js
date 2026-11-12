(function(){this['Webクライアント']=this['作る']();
this['Webクライアント']['initialize']=dtlbind(this,function(url,ポート){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,2);
var info;
this['param']=this['辞書']['作る']();
return dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((url),(ポート));
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
info=url['match']((root['window']['RegExp'](("(?:[0-9]{1,3}\.[0-9]{1,3}\.[0   -9]{1,3}\.[0-9]{1,3})|localhost"))));
this['index']=info['index'];
this['length']=(info['get']((1)))['length'];
this['insert_pos']=(this['index']+this['length']);
return this['url']=((((url['slice']((0),(this['insert_pos'])))+":")+(ポート))+(url['slice']((this['insert_pos']),(url['length']))));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return root['window']['alert']("引数が正しくありません（Webクライアント）");
}));
});
this['Webクライアント']['値']=dtlbind(this,function(鍵,値){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,2);
return dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['全部']['本当']((鍵),(値));
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['param']['書く']((鍵),(値));
}));
});
this['Webクライアント']['消す']=dtlbind(this,function(鍵){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return 鍵;
})['なら']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['param']['削除']((鍵));
}));
});
this['Webクライアント']['クリア']=dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['param']=this['辞書']['作る']();
});
this['Webクライアント']['data2JSON']=dtlbind(this,function(data){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return data;
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return root['window']['JSON']['stringify']((data));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return "";
}));
});
this['Webクライアント']['JSON2data']=dtlbind(this,function(JSON){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,1);
return dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return JSON;
})['なら']()['そうでなければ'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return this['system']['try'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return root['window']['JSON']['parse']((JSON));
}),dtlbind(this,function(e){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,1);
return root['window']['alert']((e));
}));
}))['実行'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return "";
}));
});
return this['Webクライアント']['読む']=dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
var _url;
var レスポンス;
var opt;
var get_param;
var _args;
_args=_rest;
return dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return ((((_args['length'])%(2)))===(1));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
root['window']['alert']("引数の数が正しくありません（Webクライアント）");
return "";
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
get_param=this['配列']['作る']();
this['param']['それぞれ実行'](dtlbind(this,function(k,v){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,2);
return get_param['書く']((((k+"=")+(root['window']['JSON']['stringify']((v))))));
}));
dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return (_args['length']>(0));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
var key;
var value;
key=_args['shift']();
value=_args['shift']();
return get_param['push']((((key+"=")+(root['window']['JSON']['stringify']((value))))));
})['repeat']((((_args['length'])/(2))));
}));
_url=this['url'];
dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return (get_param['length']>(0));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return _url=((_url+"?")+(get_param['join']("&")));
}));
opt=this['system']['new'](dtlbind(this,function(){
var self=this;var 自分=self;var _rest=Array.prototype.slice.call(arguments,0);
return }));
opt['type']="GET";
opt['async']=root['false'];
opt['url']=(_url);
レスポンス=root['window']['$']['ajax']((opt));
root['window']['console']['log']((レスポンス));
return this['JSON2data']((レスポンス['responseText']));
}));
});
}).checkerror().apply(root,[]);

/*
Webクライアント＝！作る。
Webクライアント：initialize=「｜url ポート;info｜
    自分：param=辞書！作る。
    「全部！（url）（ポート）本当」！なら「
        info=url!(:window!("(?:[0-9]{1,3}\.[0-9]{1,3}\.[0   -9]{1,3}\.[0-9]{1,3})|localhost")RegExp)match.
        index=info:index.
        length=(info!1 get):length.
        insert_pos=index+length.
        self:url=(url!0 (insert_pos)slice) +":"+ (ポート) + (url!(insert_pos)(url:length)slice).
    」そうでなければ「
        :window!"引数が正しくありません（Webクライアント）"alert.
    」実行。
    
」。
Webクライアント：値＝「｜鍵　値｜
    「全部！（鍵）（値）本当」！なら「
        自分：param！（鍵）（値）書く。
    」実行。
」。
Webクライアント：消す＝「｜鍵｜
    「鍵」！なら「
        自分：param！（鍵）削除。
    」実行。
」。
Webクライアント：クリア＝「
    自分：param=辞書！作る。
」。
Webクライアント：data2JSON=「｜data｜
    「data」!なら「
        :window:JSON!(data)stringify
    」そうでなければ「
        ""
    」実行。
」。
Webクライアント：JSON2data=「｜JSON｜
    「JSON」！なら「
        system!「
            :window:JSON!(JSON)parse
        」「｜e｜
            :window!(e)alert.
        」try.
    」そうでなければ「
        ""
    」実行。
」。
Webクライアント：読む＝「｜;_url レスポンス opt get_param _args｜
    _args=_rest.
	[((_args:length)%2)==1]!then[
	    :window!"引数の数が正しくありません（Webクライアント）"alert.
	    "".
	]else[
	    get_param=配列！作る.
	    自分：param!「|k v|
	        get_param!(k+"="+(:window:JSON!(v)stringify))書く
	    」それぞれ実行。
	    [_args:length>0]!then[
	        [|;key value|
	         key=_args!shift.
	         value=_args!shift.
	         get_param!(key+"="+(:window:JSON!(value)stringify))push.
	        ]!((_args:length)/2)repeat.
	    ]execute.
	    _url=url.
	    [get_param:length>0]!then[
	        _url=_url+"?"+(get_param!"&"join)
        ]execute.
        opt=system![]new.
        opt:type="GET".
        opt:async=:false.
        opt:url=(_url).
        レスポンス=:window:$!(opt)ajax.
        :window:console!(レスポンス)log.
        // label!(_url)create　次の行.
        自分！（レスポンス：responseText）JSON2data.
	]execute.
」。


// wc=Webクライアント！"http://localhost/test.js" 2021 作る。
// wc!"key" 123 値。
// // wc!"key2" "value2" 値。
// label!((wc!読む))create。
// // wc!"key3" "value3" 値。
// // wc!読む。
// // wc!"key" 消す。
// // wc!読む。
// // wc!クリア。
// // wc!読む。
// // wc!"key4" "key5" 読む。
*/