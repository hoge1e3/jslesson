define(["Contents","extend","assert","PathUtil"],
function (C,extend,A,P) {

var SFile=function (fs, path) {
    A.is(path, P.Absolute);
    A(fs && fs.getReturnTypes);
    this._path=path;
    this.fs=fs;
    if (this.isDir() && !P.isDir(path)) {
        this._path+=P.SEP;
    }
};
SFile.is=function (path) {
    return path && typeof (path.isSFile)=="function" && path.isSFile();
};
function getPath(f) {
    if (SFile.is(f)) {
        return f.path();
    } else {
        A.is(f,P.Absolute);
        return f;
    }
}
SFile.prototype={
    isSFile: function (){return true;},
    _clone: function (){
        return this.fs.getRootFS().get(this.path());
    },
    _resolve: function (path) {
        var res;
        if (SFile.is(path)) {
            res=path;
        } else {
            A.is(path,P.Absolute);
            res=this.fs.getRootFS().get(path);
        }
        if (this.wrapper) {
            return this.wrapper.wrap(res);
        } else {
            return res;
        }
    },
    contains: function (file) {
        A(SFile.is(file),file+" shoud be a SFile object.");
        if (!this.isDir()) return false;
        return P.startsWith( file.path(), this.path());
    },
    // パス・名前・相対ファイル取得メソッド
    // このファイルのフルパスを取得
    path: function () {
        return this._path;//this.fs.getPathFromRootFS(this.pathT);
    },
    // Path from This fs
    /*pathInThisFS: function () {
        return this.pathT;
    },*/
    // このファイルの名前のみを取得
    name: function () {
        return P.name(this.path());
    },
    // このファイルの拡張子を除いた名前を取得（extは省略可能）
    truncExt: function (ext) {
        return P.truncExt(this.path(),ext);
    },
    // このファイルの拡張子を取得
    ext: function () {
        return P.ext(this.path());
    },
    // このファイルのbaseを基準とした相対パスを取得
    relPath: function (base) {
        // base should be SFile or Path from rootFS
        var bp=(base.path ?
                base.path() :
                base );
        return P.relPath(this.path(), A.is(bp,P.Absolute) );
    },
    // このファイルの親ファイルのファイルオブジェクトを取得
    up:function () {
        var pathR=this.path();
        var pa=P.up(pathR);
        if (pa==null) return null;
        return this._resolve(pa);
    },
    // このフォルダを基準に相対パスrelPathで指定されたファイルのファイルオブジェクトを取得
    // 注意：フォルダを指定する場合、relPathは必ず/ で終わること
    rel: function (relPath) {
        A.is(relPath, P.Relative);
        this.assertDir();
        var pathR=this.path();
        return this._resolve(P.rel(pathR, relPath));
    },
    // このファイルのファイル名がpreで始まっているか？
    startsWith: function (pre) {
        return P.startsWith(this.name(),pre);
    },
    // このファイルのファイル名がpostで終わっているか？
    endsWith: function (post) {
        return P.endsWith(this.name(),post);
    },
    // このファイルオブジェクトとoが同じファイルを指すファイルオブジェクトか？
    equals:function (o) {
        return (o && typeof o.path=="function" && o.path()==this.path());
    },
    toString:function (){
        return this.path();
    },
    //属性など
    // このファイルのタイムスタンプを更新
    touch: function () {
        this.fs.touch(this.path());
    },
    // このファイルが読み取り専用か？
    isReadOnly: function () {
        this.fs.isReadOnly(this.path());
    },
    isTrashed:function () {
        var m=this.metaInfo();
        if (!m) return false;
        return m.trashed;
    },
    metaInfo: function () {
        if (arguments.length==0) {
            return this.getMetaInfo.apply(this,arguments);
        } else {
            return this.setMetaInfo.apply(this,arguments);
        }
    },
    getMetaInfo: function (options) {
        return this.fs.getMetaInfo(this.path(),options);
    },
    setMetaInfo: function (info, options) {
        return this.fs.setMetaInfo(this.path(),info, options);
    },
    //最終更新時刻を数値(ミリ秒)で返す
    lastUpdate:function () {
        A(this.exists());
        return this.metaInfo().lastUpdate;
    },
    /*rootFS: function () {
        return this.fs.getRootFS();
    },*/
    // ファイルが存在するか？
    exists: function (options) {
        options=options||{};
        var p=this.fs.exists(this.path(),options);
        if (p || options.noFollowLink) {
            return p;
        } else {
            return this.resolveLink().exists({noFollowLink:true});
        }
    },
    /*copyTo: function (dst, options) {
        this.fs.cp(this.path(),getPath(dst),options);
    },*/
    // ファイルを削除する
    rm: function (options) {
        options=options||{};
        if (!this.exists({noFollowLink:true})) {
            var l=this.resolveLink();
            if (!this.equals(l)) return l.rm(options);
        }
        if (this.isDir() && (options.recursive||options.r)) {
            this.each(function (f) {
                f.rm(options);
            });
        }
        var pathT=this.path();
        this.fs.rm(pathT, options);
    },
    removeWithoutTrash: function (options) {
        options=options||{};
        options.noTrash=true;
        this.rm(options);
    },
    // フォルダか？
    isDir: function () {
        return this.fs.isDir(this.path());
    },
    // 引数なし：ファイルをテキストとして呼び出す
    // 引数1個： ファイルに引数に指定した文字列を書き込む
    text:function () {
        var l=this.resolveLink();
        if (!this.equals(l)) return l.text.apply(l,arguments);
        if (arguments.length>0) {
            this.setText(arguments[0]);
        } else {
            return this.getText();
        }
    },
    setText:function (t) {
        A.is(t,String);
        this.fs.setContent(this.path(), t);
    },
    getText:function (t) {
        return this.fs.getContent(this.path(), {type:String});
    },
    // ファイルを読みだし、行ごとの配列を返す
    lines:function () {
        return this.text().split("\n");
    },
    // 引数なし：ファイルの内容をJSONとして解釈しオブジェクトを返す
    // 引数あり：引数のオブジェクトをJSONに変換して書き込む
    obj: function () {
        var file=this;
        if (arguments.length==0) {
            var t=file.text();
            if (!t) return null;
            return JSON.parse(t);
        } else {
            file.text(JSON.stringify(A.is(arguments[0],Object) ));
        }
    },
    // src（ファイルオブジェクト）からファイルをコピー
    copyFrom: function (src, options) {
        var dst=this;
        var options=options||{};
        var srcIsDir=src.isDir();
        var dstIsDir=dst.isDir();
        if (!srcIsDir && dstIsDir) {
            dst=dst.rel(src.name());
            assert(!dst.isDir(), dst+" exists as an directory.");
            dstIsDir=false;
        }
        if (srcIsDir && !dstIsDir) {
           this.err("Cannot move dir to file");
        } else if (!srcIsDir && !dstIsDir) {
            //this.fs.cp(A.is(src.path(), P.Absolute), this.path(),options);
            var srcc=src.getText(); // TODO
            var res=dst.setText(srcc);
            if (options.a) {
                dst.setMetaInfo(src.getMetaInfo());
            }
            return res;
        } else {
            A(srcIsDir && dstIsDir);
            var t=this;
            src.each(function (s) {
                dst.rel(s.name()).copyFrom(s, options);
            });
        }
        //file.text(src.text());
        //if (options.a) file.metaInfo(src.metaInfo());
    },
    // src（ファイルオブジェクト）からここにファイルを移動
    moveFrom: function (src, options) {
        var res=this.copyFrom(src,options);
        src.rm({recursive:true});
        return res;//this.fs.mv(getPath(src),this.path(),options);
    },
    // Dir
    assertDir:function () {
        A.is(this.path(),P.Dir);
        return this;
    },
    /*files:function (f,options) {
        var dir=this.assertDir();
        var res=[];
        this.each(function (f) {
            res.add(f);
        },options);
        return res;
    },*/
    // このフォルダ直下の各ファイルオブジェクトeについて、関数f(e)を繰り返し呼び出す
    each:function (f,options) {
        var dir=this.assertDir();
        dir.listFiles(options).forEach(f);
    },
    // このフォルダとそのサブフォルダ内の各ファイルオブジェクトeについて、関数f(e)を繰り返し呼び出す
    recursive:function (fun,options) {
        var dir=this.assertDir();
        dir.each(function (f) {
            if (f.isDir()) f.recursive(fun);
            else fun(f);
        },options);
    },
    // このフォルダ直下の各ファイルeを配列で返す
    listFiles:function (options) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        var l=this.resolveLink();
        if (!this.equals(l)) return l.listFiles.apply(l,arguments);
        var path=this.path();
        var ord;
        if (typeof options=="function") ord=options;
        options=dir.convertOptions(options);
        if (!ord) ord=options.order;
        var di=this.fs.opendir(path, options);
        var res=[];
        for (var i=0;i<di.length; i++) {
            var name=di[i];
            //if (!options.includeTrashed && dinfo[i].trashed) continue;
            if (options.excludes[path+name] ) continue;
            res.push(dir.rel(name));
        }
        if (typeof ord=="function" && res.sort) res.sort(ord);
        return res;
    },
    // このフォルダ内の各ファイルのファイル名を配列で返す
    ls:function (options) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        var res=dir.listFiles(options);
        return res.map(function (f) {
            return f.name();
        });
    },
    convertOptions:function(options) {
        var dir=this.assertDir();
        var pathR=this.path();
        if (!options) options={};
        if (!options.excludes) options.excludes={};
        if (options.excludes instanceof Array) {
            var excludes={};
            options.excludes.forEach(function (e) {
                if (P.startsWith(e,"/")) {
                    excludes[e]=1;
                } else {
                    excludes[pathR+e]=1;
                }
            });
            options.excludes=excludes;
        }
        return A.is(options,{excludes:{}});
    },
    // このディレクトリを作成する
    mkdir: function () {
        this.touch();
    },
    link: function (to,options) {// % ln to path
        to=this._resolve(A(to));
        this.fs.link(this.path(),to.path(),options);
    },
    resolveLink: function () {
        var l=this.fs.resolveLink(this.path());
        A.is(l,P.Absolute);
        return this._resolve(l);
    },
    isLink: function () {
        return this.fs.isLink(this.path());
    }
};
return SFile;
});
