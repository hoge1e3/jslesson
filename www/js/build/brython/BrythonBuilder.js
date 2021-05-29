define(function (require, exports, module) {
    const Sync=require("Sync");
    const ctrl=require("ctrl");
    const brythonURL="https://cdn.jsdelivr.net/npm/brython@3.9.3/brython.min.js";
    const stdlibURL="https://cdn.jsdelivr.net/npm/brython@3.9.3/brython_stdlib.js";
    module.exports=class BrythonBuilder {
        constructor(prj, dst,ide) {//<-Dtl
            this.prj=prj;// TPRC
            this.dst=dst;// SFile in ramdisk
            this.ide=ide;
            //this.runLocal=true;
        }
        async genHTML(html, p5) {
            const dst=this.dst;
            const code=p5.text();
            html.text(`<html>
                <script src="${brythonURL}"></script>
                <script src="${stdlibURL}"></script>
                <body onload="brython(1);">
                <pre id="console"></pre>
                <script>
const old=console.error;
console.error=(...a)=> {
    document.querySelector("#console").append(a.join(" "));
    return old.apply(console, a);
};
                </script>
                <script type="text/python">
import sys
from browser import document, console
class Writer:
    def write(*arg, **k):
        console.log(arg, k)
        document.querySelector("#console") <= arg[1]
sys.stdout=Writer()
#sys.stderr=Writer()
</script>
                <script type="text/python">${code}</script>
                </body>
            </html>`);
            //return url;
        }
        async build(options) {
            options=options||{};
            const curPrj=this.prj;
            const dst=this.dst;
            const EXT=curPrj.getEXT();
            const HEXT=".html";
            //let publishedURL;
            for (let f of curPrj.dir.listFiles()) {
                //console.log(f.path());
                if (!curPrj.isHTMLFile(f))  continue;
                var name=curPrj.truncEXT(f);
                var html=dst.rel(name+HEXT);
                const pyDst=dst.rel(name+EXT);
                const pySrc=f.sibling(pyDst.name());
                pyDst.copyFrom(pySrc);
                console.log(name, html.path(), pySrc.path(), pyDst.path(), pySrc.exists());
                if (!pySrc.exists()) continue;
                const url=await this.genHTML(html, pySrc);
            }
        }
        upload(pub) {
            return Sync.sync(this.dst,pub);
        }
    };
});
