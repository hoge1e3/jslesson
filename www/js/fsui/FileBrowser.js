define(["Shell","FS","DeferredUtil","UI"],function (sh,FS,DU,UI) {
    var res={
        show:function (dir,options) {
            this.options=options||{};
            if (this.options.l) {
                this.options.topDir=dir;
            }
            var d=this.embed(dir,options);
            var t=this;
            d.dialog({
                width:600,
                height:500,
                close:function(){t.save();}
            });
        },
        embed:function (dir,options) {
            var t=this;
            this.options=options||{};
            if (!this.d) {
                this.d=UI("div",{title:"ファイルブラウザ"},
                    ["div",
                        ["span",{$var:"fileNameBar"}],
                        ["button",{on:{click:function () {
                            t.remove();
                        }}},"削除"]
                    ],
                    ["table",["tr",
                        ["td", ["select",{$var:"fileList",size:15}] ],
                        ["td", ["textarea",{$var:"editor",rows:20,cols:40}]]
                    ]],
                    ["div",["button",{on:{click:function () {
                        t.d.dialog("close");
                    }}},"保存して閉じる"] ]
                );
                for (var k in this.d.$vars) {
                    this[k]=this.d.$vars[k];
                }
            }
            this.editor.prop("disabled",true);
            delete this.curFile;
            delete this.curDir;
            this.fileNameBar.text("-");
            this.editor.val("");
            this.ls(dir);
            return this.d;
        },
        open: function (f) {
            if (!this.allows(f)) {
                throw new Error(f+"の表示は許可されていません");
            }
            var t=this;
            var p=t.options.topDir? f.relPath(t.options.topDir) : f.path();
            t.fileNameBar.text(p);
            if (f.isDir()) return this.ls(f);
            return DU.resolve(this.save()).then(function () {
                t.curFile=f;
                t.editor.prop("disabled",false);
                t.editor.val(f.text());
            });
        },
        ls:function (d) {
            var t=this;
            t.curDir=d;
            t.fileList.empty();
            var pa=d.up();
            if (pa && this.allows(pa)) {
                var option=UI("option",{
                    value:d.up().path(),
                    on:{click:function () {
                        t.open(d.up());
                    }}
                },"[UP]");
            }
            t.fileList.append(option);
            return d.each(function (f) {
                var option=UI("option",{
                    value:f.path(),
                    on:{click:function () {
                        t.open(f);
                    }}
                },f.name());
                t.fileList.append(option);
            });
        },
        remove: function () {
            if (!this.curFile) return;
            var r=confirm(this.curFile.name()+"を削除しますか?");
            if (r) {
                this.curFile.rm();
                this.ls(this.curDir);
                this.curFile=null;
                this.editor.val("");
            }
        },
        save:function () {
            if (!this.curFile) return;
            return this.curFile.text(this.editor.val());
        },
        allows:function (f) {
            if (this.options.topDir) {
                return this.options.topDir.contains(f);
            }
            return true;
        }
    };
    sh.newCommand("explorer",function (dir,options) {
        if (typeof dir=="string") dir=this.resolve(dir,true);
        else { options=dir||{}; dir=null;}
        res.show(dir||this.cwd,options);
    });
    return res;
});
