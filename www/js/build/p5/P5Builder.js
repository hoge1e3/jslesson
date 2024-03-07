define(function (require, exports, module) {
    const Sync=require("Sync");
    const ctrl=require("ctrl");
    const p5jsURL="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js";

    module.exports=class P5Builder {
        constructor(prj, dst,ide) {//<-Dtl
            this.prj=prj;// TPRC
            this.dst=dst;// SFile in ramdisk
            this.ide=ide;
            //this.runLocal=true;
        }
        async genHTML(html, p5) {
            const dst=this.dst;
            //const path=html.path();
            //const paths=path.split("/");
            //paths.splice(0,paths.length-4);
            //const [klass,user,project,file]=paths;
            //const url=await ctrl.get("PHP/urlOf",{class:klass,user,project,file:file.replace(/\.html/,".php")});//+`&class=${klass}&user=${user}&project=${project}&file=${file.replace(/\.html/,".php")}`;
            //const dh=dst.rel(html.name());
            const code=p5.text();
            //console.log("dh",dh.path());
            //console.log("url",url);
            //dh.text(`<html><script>location.href="${url}";</script></html>`);
            html.text(`<html>
                <script src="${p5.name()}"></script>
                <script>
                function _wrap(f) {
                    return function (...args) {
                        try {
                            return f(...args);
                        } catch(e) {
                            if (typeof onerror==="function") onerror(null,null,null,null,e);
                            else {
                                alert(e);
                            }
                            throw e;
                        }
                    };
                }
                if (typeof window.setup==="function") window.setup=_wrap(window.setup);
                /*for (let m of ["draw","setup","keyPressed","keyReleased","keyTyped","mouseMoved","mouseDragged","mousePressed","mouseClicked"]) {
                    if (typeof window[m]==="function") window[m]=_wrap(window[m]);
                }*/
                </script>
                <script src="${p5jsURL}"></script>
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
                const p5Dst=dst.rel(name+EXT);
                const p5Src=f.sibling(p5Dst.name());
                p5Dst.copyFrom(p5Src);
                console.log(name, html.path(), p5Src.path(), p5Dst.path(), p5Src.exists());
                if (!p5Src.exists()) continue;
                const url=await this.genHTML(html, p5Src);
            }
        }
        upload(pub) {
            return Sync.sync(this.dst,pub);
        }
    };
});
