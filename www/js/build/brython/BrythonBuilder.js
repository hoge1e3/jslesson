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
                <script>window.sendResult=(...a)=>{
                    console.log("SR", ...a);
                    if (window.parent && window.parent.sendResult) {
                        window.parent.sendResult(...a);
                    }
                };</script>
                <script>
const old=console.error;
let oldContent="";
console.error=(...a)=> {
    const content = a.join(" ");
    if (oldContent!==content) {
        oldContent=content;
        document.querySelector("#console").append(content);
        window.parent.sendResult(content, "bry", "Runtime Error");
    }
    return old.apply(console, a);
};
                </script>
                <script type="text/python">
import sys
from browser import document, console
class Writer:
    def write(*arg, **k):
        #console.log(arg, k)
        document.querySelector("#console") <= arg[1]
sys.stdout=Writer()
#sys.stderr=Writer()
</script>
                <script type="text/python">${code}</script>
                <script type="text/python">
from browser import window
#window.console.log("SENDO", window.parent.sendResult, window.document.querySelector("#console").innerText )
window.console.log("SENDO",window.sendResult)
window.sendResult(window.document.querySelector("#console").innerText,"bry")
</script>
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
