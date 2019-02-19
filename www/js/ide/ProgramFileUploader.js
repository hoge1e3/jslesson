define(["FS","DragDrop"],function (FS,DragDrop) {
    var P=FS.PathUtil;
    ProgramFileUploader={
        accept: function (fileList,options) {
            options=options||{};
            extPattern=options.extPattern||/.*/;
            DragDrop.accept(fileList.elem, {
                onCheckFile: function (dst,file) {
                    if (!extPattern.exec(P.ext(file.name))) {
                        return DragDrop.CancelReason(file.name+": このファイルは追加できません");
                    }
                    if (dst.exists()) {
                        return DragDrop.CancelReason(itemName+": 同名のファイルがあるため中止しました．");
                    }
                    return dst;
                },
                onComplete: function (status) {
                    console.log(status);
                }
            });
        }
    };
    return ProgramFileUploader;
});
