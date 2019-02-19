define(["Klass","UI","ctrl","WebSite"], function (Klass,UI,ctrl,WebSite) {
    var res={};
    AssetDialog=Klass.define({
        $this: "t",
        $: ["prj"],
        show: function (t) {
            t.createDOM();
            /*if (!r) return;
            t.result.text(r.result);
            t.comment.val(r.comment);*/
            t.dom.dialog({width:600});
        },
        refresh: function (t,mesg) {
            console.log("refresh",mesg);
            ctrl.get("Asset/list").then(function (r) {
                t.list.empty();
                r.forEach(function (u) {
                    var fileName=u.replace(/[^\/]+\//,"");
                    var urlFull=WebSite.published+u;
                    t.list.append(UI("div",
                        ["span",urlFull],
                        ["button",{on:{click:del}},"削除"]
                    ));
                    function del() {
                        console.log("DEL",fileName);
                        ctrl.get("Asset/del",{fileName:fileName}).then(t.$bind.refresh,err);
                    }
                });
            }).catch(err);
        },
        createDOM: function (t) {
            if (t.dom) return t.dom;
            var dragMsg="ここに素材ファイルをドラッグ＆ドロップして追加．";
            var dragPoint=UI("div",
                {style:"margin:10px; padding-left:10px; padding-right:10px; padding-top:10px; padding-bottom:10px; border:solid blue 2px;",
            /*on:{dragover: s, dragenter: s, drop:dropAdd}*/},dragMsg,
                ["br"],
            );
            t.dom=UI("div",{title:"素材アップロード",on:{dragover: s, dragenter: s, drop:dropAdd}},
                dragPoint,
                ["div",{$var:"list",style:"height: 400px; overflow-y:scroll"}]
            );
            t.result=t.dom.$vars.result;
            t.comment=t.dom.$vars.comment;
            t.list=t.dom.$vars.list;
            t.refresh();
            return t.dom;
        }
    });
    function err(e) {
        if (e&&e.responseText) console.error(e.responseText);
        console.error(e);
    }
    function sendImageBinary(blob,fn) {
        var formData = new FormData();
        formData.append('acceptImage', blob,fn);

        return $.ajax({
            type: 'POST',
            url: ctrl.url("Asset/upload"),
            data: formData,
            contentType: false,
            processData: false
        });
    }
    function dropAdd(e) {
        var eo=e.originalEvent;
        var files = Array.prototype.slice.call(eo.dataTransfer.files);
        var added=[],cnt=files.length;

        files.forEach(function (file) {
            var itemName=file.name;
            console.log("FILEASSET",file);
            var reader = new FileReader();
            reader.onload = function(e) {
                var fileContent = reader.result;
                var upmesg;
                var blob=new Blob([fileContent],{type:"application/octet-stream"});
                sendImageBinary(blob,itemName).then(function (r) {
                    console.log(r);
                },function (e) {
                    console.error(e);
                });
            };
            reader.readAsArrayBuffer(file);
        });
        function dec() {
            cnt--;
            if (cnt<=0) {
                options.onAdd(added);
            }
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
    }
    function s(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    return AssetDialog;
})
