define(function (require,exports,module) {
    class WebBuidler{
        fixName(name,{curDir}){
            const pat={
                reg:/^[^\\\/:\*\?<>\|]+\/?$/, 
                error:"\\ / : * ? < > | は使えません",
            };
            if (name==="") {
                return {ok:false, reason:"ファイル名を入力してください"};
            }
            if (name.match(pat.reg)) {
                const file=curDir.rel(name);
                if (file.exists()) {
                    return {ok:false, reason:name+"は存在します"};
                }
                if (name.match(/\/$/)) {
                    return {ok:true, file, note:"フォルダを作成します．"};
                }
                return {ok:true, file};
            }
            return {ok:false, reason:pat.error};
        }
        build(){
            alert("Do not build!");
        }
        upload(){
            alert("Do not upload!");
        }
    }
    return WebBuidler;
});