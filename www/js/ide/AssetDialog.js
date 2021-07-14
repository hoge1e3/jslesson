define(["Klass","UI","ctrl","WebSite","DragDrop","root"],
function (Klass,UI,ctrl,WebSite,DragDrop,root) {
    //var res={};
    root.AssetDialog=Klass.define({
        $this: true,
        $: ["prj"],
        show: function (t) {
            t.createDOM();
            t.dom.dialog({width:600});
        },
        refresh: function (t,mesg) {
            console.log("refresh",mesg);
            ctrl.get("Asset/list",{context:t.context}).then(function (r) {
                t.list.empty();
                r.forEach(function (u) {
                    var fileName=u.replace(/[^\/]+\//,"");
                    var urlFull=WebSite.published+u;
                    t.list.append(UI("div",
                        ["a",{href:urlFull, target:"asset"},urlFull],
                        ["button",{on:{click:del}},"削除"]
                    ));
                    function del() {
                        console.log("DEL",fileName);
                        ctrl.get("Asset/del",{fileName:fileName,context:t.context}).
                        then(t.$bind.refresh,err);
                    }
                });
            }).catch(err);
        },
        createDOM: function (t) {
            if (t.dom) return t.dom;
            var dragMsg="ここに素材ファイルをドラッグ＆ドロップして追加．";
            var notice="※プログラムファイルはこのページ左端のファイル一覧にドラッグ＆ドロップしてください．";
            var dragPoint=UI("div",
                {style:"margin:10px; padding-left:10px; padding-right:10px; padding-top:10px; padding-bottom:10px; border:solid blue 2px;"},
                dragMsg,["br"],
                notice,["br"]
            );
            function toggleB(ctx) {
                var cap={user:"(自分用)",class:"(クラスで共有)"};
                return ["button",{
                    $var:ctx,
                    on:{click:function() {
                        t.toggleContext(ctx);
                    }}},
                    ctx+cap[ctx]
                ];
            }
            t.dom=UI("div",{title:"素材管理"},
                ["div",
                    toggleB("user"),toggleB("class")
                ],
                ["div",{$var:"content"},
                    dragPoint,
                    ["div",{$var:"list",style:"height: 400px; overflow-y:scroll"}]
                ]
            );
            DragDrop.accept(t.dom.$vars.content,{
                onComplete: t.$bind.complete, overwrite:true,
            });
            t.result=t.dom.$vars.result;
            t.comment=t.dom.$vars.comment;
            t.list=t.dom.$vars.list;
            //t.refresh();
            t.toggleContext("user");
            return t.dom;
        },
        toggleContext: function (t,ctx) {
            if (t.prevCtxBtn) t.prevCtxBtn.removeClass("selected");
            var b=t.dom.$vars[ctx];
            b.addClass("selected");
            t.prevCtxBtn=b;
            t.context=ctx;
            t.refresh();
        },
        complete: function (t,status) {
            var cnt=0;
            console.log("complete ",status);
            for (var k in status) {
                if (status[k].status!=="uploaded") continue;
                var file=status[k].file;
                //var fileContent=file.bytes();
                var blob=file.getBlob();//new Blob([fileContent],{type:"application/octet-stream"});
                cnt++;
                t.sendImageBinary(blob,file.name()).then(log,err).done(dec);
            }
            function log(r){console.log(r);}
            function err(r){console.error(r);}
            function dec() {
                cnt--;
                if (cnt<=0) t.refresh();
            }
        },
        sendImageBinary:function (t,blob,fn) {
            var formData = new FormData();
            formData.append('acceptImage', blob,fn);
            formData.append("context",t.context);
            return $.ajax({
                type: 'POST',
                url: ctrl.url("Asset/upload"),
                data: formData,
                contentType: false,
                processData: false
            });
        }
    });
    function err(e) {
        if (e&&e.responseText) console.error(e.responseText);
        console.error(e);
    }

    return root.AssetDialog;
});
