define(["Klass","UI","ctrl"], function (Klass,UI,ctrl) {
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
        createDOM: function (t) {
            if (t.dom) return t.dom;
            var dragMsg="ここに素材ファイルをドラッグ＆ドロップして追加．";
            var dragPoint=UI("div",
                {style:"margin:10px; padding-left:10px; padding-right:10px; padding-top:50px; padding-bottom:50px; border:solid blue 2px;",
                on:{dragover: s, dragenter: s, drop:dropAdd}},dragMsg,
                ["br"],
            );
            t.dom=UI("div",{title:"素材アップロード"},
                dragPoint,
                ["div",{$var:"list"}]
            );
            t.result=t.dom.$vars.result;
            t.comment=t.dom.$vars.comment;
            return t.dom;
        }
    });
    function sendImageBinary(blob,fn) {
        var formData = new FormData();
        formData.append('acceptImage', blob,fn);

        return $.ajax({
            type: 'POST',
            url: ctrl.url("Asset/upload"),
            data: formData,
            contentType: false,
            processData: false,
            /*success:function(date, dataType){
                console.log("succcess");
                console.log(data);
                var $img = $('img');
                var imgSrc = $img.attr('src');
                $img.attr('src', "");
                $img.attr('src', imgSrc);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                //console.log("error");
            }*/
        });
    }
    function dropAdd(e) {
        var eo=e.originalEvent;
        var files = Array.prototype.slice.call(eo.dataTransfer.files);
        var added=[],cnt=files.length;

        files.forEach(function (file) {
            var itemName=file.name;
            console.log("FILEASSET",file);
            /*var itemFile=dir.rel(itemName);
            if (itemFile.exists()) {
                upmesg=itemName+": 同名のファイルがあるため中止しました．";
                dec();
                res.d.$vars.result.append(
                    UI("div",upmesg)
                );
            } else {*/
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
                    /*itemFile.setBytes(fileContent);
                    added.push(itemFile);
                    upmesg=itemName+": アップロードしました．";
                    dec();
                    res.d.$vars.result.append(
                        UI("div",upmesg)
                    );*/
                };
                reader.readAsArrayBuffer(file);
            //}
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
