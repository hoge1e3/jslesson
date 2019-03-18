define(["FS","UI"],function (FS,UI) {
    var res={};
    var P=FS.PathUtil;
	res.show=function (dir,options) {
    	var d=res.embed(dir,options);
    	if (!res.opened) {
        	d.dialog({width:600,height:300,
        	    close: function () {
        	        res.opened=false;
        	    }
        	});
    	}
    	res.opened=true;
	};
	res.embed=function (dir, options) {
	    if (!options) options={};
	    options.onAdd=options.onAdd||function (){};
	    var mediaInfos={
	        c:{
	            name:"Cソースファイル",
	            exts:["c"],
                extPattern:/\.c$/i,
                contentType:/text\/.*/,
            }
	    };
	    var mediaInfo=mediaInfos.c;
        if (!res.d) {
            var FType={
                fromVal: function (val){
                    return val=="" ? null : FS.get(val);
                },
                toVal: function (v){ return v ? v.path() : "";}
            };
            var dragMsg="ここに"+mediaInfo.name+"ファイル("+mediaInfo.exts.join("/")+")をドラッグ＆ドロップして追加．";
            res.dragPoint=UI("div",
                {style:"margin:10px; padding-left:10px; padding-right:10px; padding-top:50px; padding-bottom:50px; border:solid blue 2px;",
                on:{dragover: s, dragenter: s, drop:dropAdd}},dragMsg,
                ["br"],        "※ファイルの文字コードはUTF-8Nにしてください．"
            );
        	res.d=UI("div",{title:"ファイルアップロード"},
        	    res.dragPoint,
        	    ["div",{$var:"result"}]
        	    /* ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]*/
            );
        }
        function dropAdd(e) {
            var eo=e.originalEvent;
            var files = Array.prototype.slice.call(eo.dataTransfer.files);
            var added=[],cnt=files.length;

            files.forEach(function (file) {
                var itemName=file.name;//.replace(mediaInfo.extPattern,"").replace(/\W/g,"_");
                if (!P.ext(file.name).match(mediaInfo.extPattern)) {
                    res.d.$vars.result.append(
                        UI("div",itemName+": このファイルは追加できません")
                    );
                    dec();
                    return;
                }
                var itemFile=dir.rel(itemName);
                if (itemFile.exists()) {
                    var upmesg=itemName+": 同名のファイルがあるため中止しました．";
                    dec();
                    res.d.$vars.result.append(
                        UI("div",upmesg)
                    );
                } else {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var fileContent = reader.result;
                        var upmesg;
                        itemFile.setBytes(fileContent);
                        added.push(itemFile);
                        upmesg=itemName+": アップロードしました．";
                        dec();
                        res.d.$vars.result.append(
                            UI("div",upmesg)
                        );
                        //v.url="ls:"+itemFile.relPath(prj.getDir());// fileContent;
                        //add(v);
                    };
                    reader.readAsArrayBuffer(file);
                }
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

        var d=res.d;
        d.$vars.result.empty();
        //var c=d.$vars.cont;
        //c.append($("<div>").text(mesg));
    	d.done=function () {

    	    /*if (d.$edits.validator.isValid()) {
                onOK(model);
                d.dialog("close");
    	    }*/
    	};
    	return d;
    };
    return res;
});
