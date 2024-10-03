define(function (require,exports,module) {
    const Sync=require("Sync");
    class WebBuidler{
        constructor(prj, dst) {
            this.prj=prj;// TPRC
            this.dst=dst;// SFile in ramdisk
        }
        fixName(name,{curDir, curFile, action}){
            const pat={
                reg:/^[^\\\/:\*\?<>\|]+\/?$/, 
                error:"\\ / : * ? < > | は使えません",
            };
            if (name==="") {
                return {ok:false, reason:"ファイル名を入力してください"};
            }
            if (name.match(pat.reg)) {
                let file=curDir.rel(name);
                if (curFile && file.isDir()) {
                    if (!this.prj.getDir().contains(file)) {
                        return {ok:false, reason:"プロジェクト外のフォルダは指定できません．"};
                    }
                    if (!file.exists()) {
                        return {ok:false, reason:name+"は存在しません"};
                    }
                    file=file.rel(curFile.name());
                    if (!file.exists()) {
                        return {
                            ok:true, 
                            file,
                            note:`フォルダ${name}に移動します．`,
                        };
                    } else {
                        return {ok:false, reason:`移動先のフォルダに${name}が存在します`};
                    }
                }
                if (file.exists()) {
                    return {ok:false, reason:name+"は存在します"};
                }
                if (name.match(/\/$/)) {
                    if (!this.prj.getDir().contains(file)) {
                        return {ok:false, reason:"プロジェクト外のフォルダは指定できません．"};
                    }
                    return {ok:true, file, note:"フォルダを作成します．"};
                }
                return {ok:true, file};
            }
            return {ok:false, reason:pat.error};
        }
        async upload(publishedDir){
            //alert("Do not build!");
            await Sync.sync(this.dst, publishedDir, {v:1});
        }
        async build(){
            const dir=this.prj.getDir();
            dir.recursive((f)=>{
                const rel=f.relPath(dir);
                if(rel.match(/.sync\//)) return;
                console.log(rel);
                this.dst.rel(rel).copyFrom(f);
            });
        }
    }
    WebBuidler.prototype.ALWAYS_UPLOAD=true;
    return WebBuidler;
});