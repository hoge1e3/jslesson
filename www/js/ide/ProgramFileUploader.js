define(["FS","DragDrop","root"],function (FS,DragDrop,root) {
    var P=FS.PathUtil;
    var ProgramFileUploader={
        acceptingEXT(prj) {
            const acext={".html":1};
            acext[prj.getEXT()]=1;
            return acext;
        },
        accept(fileList,prj) {
            //options=options||{};
            //extPattern=options.extPattern||/.*/;
            const acext=ProgramFileUploader.acceptingEXT(prj);
            const EXT=prj.getEXT(), HEXT=".html";
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
                            var srcPfile=srcDir.rel(name+EXT);
                            var dstPfile=dstDir.rel(name+EXT);
                            var srcHfile=srcDir.rel(name+HEXT);
                            var dstHfile=dstDir.rel(name+HEXT);
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
        },

        addMissingFiles(prj, options) {
            const fileNames=prj.sourceFiles();
            const EXT=prj.getEXT(), HEXT=".html";

            for (let name in fileNames) {
                const file=fileNames[name];
                const pfile=file.sibling(name+EXT);
                const hfile=file.sibling(name+HEXT);
                if (!pfile.exists()) pfile.text("");
                if (!hfile.exists()) hfile.text("");
            }
        },
        fromZip(zipFile, projectsDir) {

        }
    };
    root.ProgramFileUploader=ProgramFileUploader;
    return ProgramFileUploader;
});
