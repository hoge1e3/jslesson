define(["FS","DragDrop","root"],function (FS,DragDrop,root) {
    var P=FS.PathUtil;
    var ProgramFileUploader={
        accept: function (fileList,options) {
            options=options||{};
            //extPattern=options.extPattern||/.*/;
            var acext={};
            acext[options.ext]=1;
            acext[options.hext]=1;
            DragDrop.accept(fileList.elem, {
                onCheckFile: function (dst,file) {
                    if (!acext[P.ext(file.name)]) {
                        return DragDrop.CancelReason(file.name+": このファイルは追加できません");
                    }
                    if (dst.exists()) {
                        return DragDrop.CancelReason(file.name+": 同名のファイルがあるため中止しました．");
                    }
                    return dst;
                },
                onComplete: function (status) {
                    var dstDir=fileList.curDir();
                    for (var k in status) {
                        if (status[k].status==="uploaded") {
                            var srcFile=status[k].file;
                            var srcDir=srcFile.up();
                            var name=srcFile.truncExt();
                            var srcPfile=srcDir.rel(name+options.ext);
                            var dstPfile=dstDir.rel(name+options.ext);
                            var srcHfile=srcDir.rel(name+options.hext);
                            var dstHfile=dstDir.rel(name+options.hext);
                            if (!srcPfile.exists()) {
                                srcPfile.text("");
                            }
                            if (!srcHfile.exists()) {
                                srcHfile.text("");
                            }
                            if (!dstPfile.exists()) {
                                dstPfile.copyFrom(srcPfile);
                            }
                            if (!dstHfile.exists()) {
                                dstHfile.copyFrom(srcHfile);
                            }
                        }
                    }
                    console.log(status);
                    fileList.ls();
                }
            });
        }
    };
    root.ProgramFileUploader=ProgramFileUploader;
    return ProgramFileUploader;
});
