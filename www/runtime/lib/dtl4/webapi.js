root.webapi_driver={};
root.webapi_driver.read=function(url,opt){
    // 「wa:user = 入力:value」（HtmlDom.js の accessor＝関数）や「wa:num = 入力欄」（要素そのもの）は中身の値を送る（2026-10-25。
    // jQuery は関数を呼んでしまい、要素はプロパティの列になっていた）
    if (opt && typeof opt==="object" && root.system && root.system.dtlValue) {
        var o={}; for (var k in opt) { if (Object.prototype.hasOwnProperty.call(opt,k)) o[k]=root.system.dtlValue.prim(opt[k]); }
        opt=o;
    }
    return new Promise(function(resolve,reject){
        $.get(url,opt,function(response){
            if(typeof response==="string"){
                // 文字列応答はJSONとしてパース
                try{
                    result=JSON.parse(response);
                }catch(e){
                    console.log(e);
                    try{
                        result=eval("(function(){return "+response+";})()");
                    }catch(ee){
                        // JSON でも JS の値でもない応答（PHP の echo の文）はそのまま文字列で返す（2026-10-25。以前は "" にしていて、
                        // hcp4 の教材の「message:テキスト = ret」が空になった。beta も文字列を返す）
                        result=response;
                    }
                }
            }else{
                // jQueryがContent-Type(application/json等)で既にパース済みのオブジェクト/配列
                result=response;
            }
            // JSONツリーの `_N`(1始まり配列)アクセス対応（WebClientFetch.js の wrapTree、実行時に存在）
            if(root.WebClientFetchDriver && root.WebClientFetchDriver.wrapTree){
                result=root.WebClientFetchDriver.wrapTree(result);
            }
            resolve(result);
        }).fail(function(){
            // 接続できない（CORS で拒まれた場合を含む）ときは実行時エラーにする。
            // 以前は失敗時の処理が無く、応答を待ったまま止まってエラーも出なかった（WebClientFetch.js と同じ文面）
            var msg="webapi: "+url+" に接続できませんでした。URL を確認してください。"+
                "（ブラウザでは、相手のサーバーが他のサイトからの利用（CORS）を許可していない場合も接続できません。）";
            var R=window.DolittleRuntimeError;
            var e;
            if(R&&R.RtError){ e=R.RtError("RT_WEB",msg); } else { e=new Error(msg); e.isDolittleRt=true; }
            reject(e);
        });
    });
}

// WebAPI（webapi）: url 以外のプロパティをクエリにして GET し、JSON を解析した結果を返す。
// 2026-11-02 に素の JS に書き直した（以前はドリトルで書いた read を変換した生成コード。末尾のコメントに原文）。
// - 送るのは「url 以外の、自分で設定したプロパティ」。別名のある名前（色・color 等）は "_KEY_名前" に保存されるので元の名前に戻す
//   （以前は _KEY_色=… のまま送っていた）。関数と "__" で始まる内部用の名前は送らない。
// - 値が 0・偽 も送る（以前は値の真偽で filter していたため 0・""・偽 が落ちていた）。空文字と 未定義 は V4（OxWebClient）と同じく送らない。
// - url が無いときは "" を返す（従来どおり）。
root.WebAPI=root.create();
root.WebAPI.read=function(){
    var self=this;
    if (!("url" in self) || self.url===undefined || self.url===null || String(self.url)==="") return "";
    var entries={};
    var prim=(root.system && root.system.dtlValue) ? root.system.dtlValue.prim : function(v){ return v; };
    Object.keys(self).forEach(function(k){
        if (k==="url") return;
        var name=(k.indexOf("_KEY_")===0)?k.slice(5):k;
        if (name.indexOf("__")===0) return;
        var v=prim(self[k]);   // 「wa:user = 入力:value」（accessor）や要素そのものは中身の値にする（driver と同じ）
        if (v===undefined || v===null || typeof v==="function") return;   // 未定義・ブロック（メソッド）は送らない
        if (typeof v==="string" && v==="") return;                          // 空文字は V4（OxWebClient）と同じく送らない
        entries[name]=v;                                                     // 0・偽・配列はそのまま渡す（jQuery が文字にする）
    });
    return root.webapi_driver.read(self.url,entries);
};
root.addAlias("WebAPI","webapi");
root.WebAPI.addAlias("read","読む");

/*
/*
root.webapi_driver={};
root.webapi_driver.read=function(url,opt){
    return new Promise(function(resolve,reject){
        $.get(url,opt,function(response){
            try{
                result=JSON.parse(response);
            }catch(e){
                console.log(e);
                try{
                    result=eval("(function(){return "+response+";})()");
                }catch(ee){
                    console.log(ee);
                    result="";
                }
            }
            resolve(result);
        });
    });
}
* /

WebAPI=!create.
WebAPI:read=[|;result keys params entries |
    keys=:window:Object!(self)keys.
    [(keys![|key| key=="url"]filter):length>0]!then[
        params=keys![|key| key!="url" ]filter.
        params=params!([|key| system!(self)(key)read]!(self)bind)filter.
        entries=:window!"(function(){return {}})();"eval.
        params![|key ;_value|
            _value=system!(self)(key)read.
            system!(entries)(key)(_value)write.
        ]each.
        result=webapi_driver!(url)(entries)read.
    ]else[result=""]execute.
    result.
].
root!"WebAPI" "webapi" addAlias.
WebAPI!"read" "読む" addAlias.

*/
