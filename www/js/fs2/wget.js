define(["Shell","FS"],function (sh,FS) {
    /*sh.wget=function (url,options) {
        var dst=this.resolve(FS.PathUtil.name(url));
        sh.echo("Getting ",url,"...");
        return $.get(url).then(function (r) {
            sh.echo("Save to ",dst.path());
            dst.text(r);
        });
    };*/
    sh.wget=function (url,options) {
        options=options||{};
        var dst=this.resolve(options.o || FS.PathUtil.name(url));
        this.echo("Getting ",url," -> ",dst);
        return wget(url,dst,options);
    };
    function wget(url,dst,options) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";
        var d=new $.Deferred();
        oReq.onload = function (oEvent) {
            var arrayBuffer = oReq.response; // Note: not oReq.responseText
            if (arrayBuffer) {
                dst.bytes(arrayBuffer);
                d.resolve(arrayBuffer);
            } else {
                d.reject();
            }
        };
        oReq.send(null);
        return d.promise();
    }
    return wget;
});
