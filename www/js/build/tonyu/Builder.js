define(["Klass","TonyuBuilder","TonyuProject"],function(Klass,_,TPRC){
    Tonyu.defaultOptions={
        compiler: { defaultSuperClass: "Actor"},
        run: {mainClass: "Main", bootClass: "Boot"},
        kernelEditable: false
    };
    TonyuBuilder_pluggable=Klass.define({
        $this: "t",
        $:function (t,ide) {
            t.ide=ide;
            console.log("tnub requirejsed");
            $("#fullScr").attr("href","javascript:;").text("別ページで表示");
            var FS=ide.FS;
            ram=FS.get("/ram/build/");
            FS.mount(ram.path(),"ram");
            t.curPrj=TPRC(ide.prjDir);// curPrj re-construct!!!?
            //builder=new Builder(curPrj, ram);
            t.curPrj.getPublishedURL().then(builderReady);

        }
    });
    return TonyuBuilder_pluggable;
});
