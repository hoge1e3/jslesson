define(["FS","DragDrop","root","UI","LanguageList","Sync","ProjectFactory"],
function (FS,DragDrop,root,UI,LL,Sync,PF) {
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
            FS.zip.unzip(zipFile);

        }
    };
    FS.mount("/ram/","ram");
    //var zip=FS.zip;
    const tmpDir=FS.get("/ram/");

    class ZipImporter {
        constructor(dir, elem, options) {
            const t=this;
            t.elem=elem;
            t.dir=dir;
            t.tmpDir=tmpDir.rel(dir.name());
            options=options||{};
            t.onComplete=options.onComplete;
            if (t.elem) t.prepareDragDrop();
        }
        prepareDragDrop() {
            const t=this;
            DragDrop.accept(t.elem, t.tmpDir, {
                onComplete: async function (status) {
                    t.showDialog();
                    var ctx={imported:0, from:"dragDrop"};
                    try {
                        await t.acceptDrag(status,ctx);
                        t.closeDialog();
                        if (t.onComplete) t.onComplete(ctx);
                    } catch (e) {
                        t.closeDialog();
                        console.error(e);
                        alert(e);
                    }
                }
            });
        }
        async acceptDrag(status,ctx) {
            const t=this;
            for (let k in status) {
                const s=status[k];
                //s.file;
                //s.status;
                if (s.status==="uploaded" && s.file.ext()===".zip") {
                    await t.unzip(s.file,ctx);
                }
            }
            console.log("End acceptDrag");
        }
        showDialog(mesg) {
            const t=this;
            mesg=mesg||R("importingFromZip");
            if (!t.dialog) {
                t.dialog=UI("div",{title:R("importFromZip")},
                    ["span",{$var:"mesg"}, mesg]
                );
                t.mesg=t.dialog.$vars.mesg;
            } else {
                t.mesg.text(mesg);
            }
            if (!t.dialogOpened) {
                t.dialog.dialog({modal:true});
            }
            t.dialogOpened=true;
        }
        closeDialog() {
            const t=this;
            if (t.dialog) {
                t.dialog.dialog("close");
                t.dialogOpened=false;
            }
        }
        unzip(file,ctx) {
            // ctx.dstDir is set when fromPrjB, /Tonyu/Project/prjfile_0.00/
            const t=this;
            t.showDialog(R("unzipping",file.name()));
            var zipexdir=t.tmpDir.rel(file.truncExt()+"/");
            var opt={
                progress: function (file) {
                    t.showDialog(R("unzipping",file.name()));
                    return new Promise(s=>setTimeout(s,0));
                }
            };
            return FS.zip.unzip(file, zipexdir,opt ).then(function () {
                if (ctx.rel) {
                    zipexdir=zipexdir.rel(ctx.rel);
                    if (!zipexdir.exists()) {
                        return ctx;
                    }
                }
                return t.traverse(zipexdir,ctx);
            });
        }
        async traverse(dir,ctx) {
            const t=this;
            ctx=ctx||{};
            ctx.imported=ctx.imported||0;
            let imported=false;
            for (let f of dir.listFiles()) {
                t.showDialog(R("checking file",f.name()));
                if (f.isDir()) continue;
                if (f.name()==="options.json") {
                    ctx.imported++;
                    imported=true;
                    await t.importFrom(f.up(),ctx);
                } else {
                    const ext=f.ext() && f.ext().replace(/^\./,"");
                    if (LL[ext] && !ctx.detected) {
                        ctx.detected={ext, dir};
                    }
                }
            }
            if (!imported) {
                for (let f of dir.listFiles()) {
                    t.showDialog(R("checking dir",f.name()));
                    if (f.isDir()) {
                        await t.traverse(f,ctx);
                    }
                }
            }
            if (ctx.imported===0 && ctx.detected) {
                ctx.detected.dir.rel("options.json").obj({lang:ctx.detected.ext});
                await t.importFrom(ctx.detected.dir, ctx);
            }
            return ctx;
        }
        async importFrom(src,ctx) {
            const t=this;
            var dst;
            var dstParent=t.dir;
            var nameT=FS.PathUtil.truncSEP(src.name());
            if (nameT==="src") {
                nameT=FS.PathUtil.truncSEP(src.up().name());
            }
            var name=nameT+"/";
            dst=dstParent.rel(name);
            var i=2;
            while (dst.exists()) {
                name=nameT+i+"/";
                i++;
                dst=dstParent.rel(name);
            }
            t.showDialog(R("copying",src.name(),dst.name()));
            console.log("importFrom",src.path(), "to", dst.path());
            const sync=src.rel(".sync/");
            if (sync.exists()) {
                sync.rm({r:1});
            }
            await src.copyTo(dst);

            const curPrj=PF.create("ba",{dir:dst});

            ProgramFileUploader.addMissingFiles(curPrj);
            t.showDialog("Syncing");
            const res=await Sync.sync(dst,dst,{v:true});
            console.log("Copy done",res);
        }
    }
    function R(...args) {
        return args.join(" ");
    }


    root.ProgramFileUploader=ProgramFileUploader;
    ProgramFileUploader.ZipImporter=ZipImporter;
    return ProgramFileUploader;
});
