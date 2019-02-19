define(["FS"],function (FS) {
    var DU=FS.DeferredUtil;
    var SFile=FS.SFile;
    DragDrop={};
    DragDrop.readFile=function (file) {
        return DU.promise(function (succ) {
            var reader = new FileReader();
            reader.onload = function(e) {
                succ(reader);
            };
            reader.readAsArrayBuffer(file);
        });
    };
    DragDrop.CancelReason=function(r){
        if (this instanceof DragDrop.CancelReason) {
            this.reason=r;
        } else {
            return new DragDrop.CancelReason(r);
        }
    };
    DragDrop.accept=function (dom, fdst,options) {
        var useTmp;
        if (!SFile.is(fdst)) {
            options=fdst||options;
            useTmp="/dd-ram/"+Math.random()+"/";
            FS.mount(useTmp,"ram");
            fdst=FS.get(useTmp);
            console.log("Mount",useTmp);
        }
        options=options||{};
        options.draggingClass=options.draggingClass||"dragging";
        dom.on("dragover",over);
        dom.on("dragenter",enter);
        dom.on("dragleave",leave);
        dom.on("drop",dropAdd);
        if (!options.onCheckFile) {
            options.onCheckFile=function (f) {
                if (options.overwrite) {
                    return f;
                } else {
                    if (f.exists()) return false;
                    return f;
                }
            };
        }
        if (!options.onCheckFiles) {
            options.onCheckFiles=function (fileEnt) {
                return fileEnt;
            };
        }
        if (!options.onError) {
            options.onError=function (e) {
                console.error(e);
            };
        }
        function dropAdd(e) {
            var dst=fdst;
            if (typeof dst==="function") dst=dst();
            dom.removeClass(options.draggingClass);
            var status={};
            var eo=e.originalEvent;
            e.stopPropagation();
            e.preventDefault();
            var files = Array.prototype.slice.call(eo.dataTransfer.files);
            var added=[],cnt=files.length;
            var fileSet=files.map(function (file) {
                var itemName=file.name;
                var dstFile=dst.rel(itemName);
                return {dst:dstFile,src:file,name:itemName};
            });
            DU.resolve(
                options.onCheckFiles(fileSet)
            ).then(function (fileSet) {
                return DU.each(fileSet,function (fileEnt) {
                    var name=fileEnt.name;
                    var dstFile=fileEnt.dst ,actFile;
                    var srcFile=fileEnt.src;
                    return DU.resolve(
                        options.onCheckFile(dstFile,srcFile)
                    ).then(function (cr) {
                        if (cr===false || cr instanceof DragDrop.CancelReason) {
                            status[dstFile.path()]={
                                file:dstFile,
                                status:"cancelled",
                                reason: cr.reason
                            };
                            return;
                        }
                        if (SFile.is(cr)) actFile=cr;
                        else actFile=dstFile;
                        return DragDrop.readFile(srcFile).then(function (reader) {
                            var fileContent=reader.result;
                            actFile.setBytes(fileContent);
                            status[dstFile.path()]={
                                file:dstFile,
                                status:"uploaded"
                            };
                            if (actFile.path()!==dstFile.path()) {
                                status[dstFile.path()].redirectedTo=actFile;
                            }
                        });
                    });
                });
            }).then(function () {
                if (options.onComplete) return options.onComplete(status);
            }).catch(function (e) {
                options.onError(e);
            }).done(function () {
                if (useTmp) {
                    FS.unmount(useTmp);
                    console.log("Umount",useTmp);
                }
            });
            return false;
        }
        function over(e) {
            e.stopPropagation();
            e.preventDefault();
        }
        var entc=0;
        function enter(e) {
            var eo=e.originalEvent;
            entc++;
            dom.addClass(options.draggingClass);
        }
        function leave(e) {
            var eo=e.originalEvent;
            console.log("leave",eo.target.innerHTML,e);
            entc--;
            if (entc<=0) dom.removeClass(options.draggingClass);
        }
    };
    return DragDrop;
});
