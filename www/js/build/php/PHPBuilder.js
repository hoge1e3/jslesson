define(function (require, exports, module) {
    const Sync=require("Sync");
    const ctrl=require("ctrl");
    module.exports=class PHPBuilder {
        constructor(prj, dst,ide) {//<-Dtl
            this.prj=prj;// TPRC
            this.dst=dst;// SFile in ramdisk
            this.ide=ide;
            //this.runLocal=true;
        }
        genHTML(html) {
            const dst=this.dst;
            const path=html.path();
            const paths=path.split("/");
            paths.splice(0,paths.length-4);
            const [klass,user,project,file]=paths;
            const url=ctrl.url("PHP/run")+`&class=${klass}&user=${user}&project=${project}&file=${file.replace(/\.html/,".php")}`;
            const dh=dst.rel(html.name());
            //console.log("dh",dh.path());
            dh.text(`<html><script>location.href="${url}";</script></html>`);
        }
        async build(options) {
            options=options||{};
            const curPrj=this.prj;
            const dst=this.dst;
            for (let f of curPrj.dir.listFiles()) {
                //console.log(f.path());
                if (f.ext()!==".html")  continue;
                var name=f.truncExt();
                var html=f;
                var php=f.up().rel(name+".php");
                //console.log(name, html.path(), php.path());
                if (!php.exists()) continue;
                this.genHTML(html);
            }
            await this.ide.sync();
        }
        upload(pub) {
            return Sync.sync(this.dst,pub);
        }
    };
});
