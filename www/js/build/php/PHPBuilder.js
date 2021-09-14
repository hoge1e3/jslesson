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
        async genHTML(html) {
            const dst=this.dst;
            const path=html.path();
            const paths=path.split("/");
            paths.splice(0,paths.length-4);
            const [klass,user,project,file]=paths;
            const url=await ctrl.get("PHP/urlOf",{class:klass,user,project,file:file.replace(/\.html/,".php")});//+`&class=${klass}&user=${user}&project=${project}&file=${file.replace(/\.html/,".php")}`;
            const dh=dst.rel(html.name());
            //console.log("dh",dh.path());
            console.log("url",url);
            //dh.text(`<html><script>location.href="${url}";</script></html>`);
            dh.text(`<html>
                <script>
                let prevURL;
                function goPage() {
                    const f=document.getElementById("frame");
                    const u=document.getElementById("url");
                    f.src=u.value;
                    prevURL=u.value;
                }
                function showHTML() {
                    const f=document.getElementById("frame");
                    const h=document.getElementById("html");
                    f.style="display: none;";
                    h.style="display: inline";
                    h.value=f.contentWindow.document.documentElement.outerHTML;;
                }
                function showFrame() {
                    const f=document.getElementById("frame");
                    const h=document.getElementById("html");
                    h.style="display: none;";
                    f.style="display: inline";
                }
                function sendResult(html) {
                    const res=looksLikeError(html) ? "Runtime Error" : "Run";
                    if (window.parent && window.parent.sendResult) {
                        window.parent.sendResult(html, "PHP", res);
                    }
                }
                function looksLikeError(html) {
                    //<b>Notice</b>
                    //<b>Parse error</b>
                    //<b>Fatal error</b>
                    return html.match(/<b>(notice|[\\w\\s]*error)<\\/b>/i);
                }
                function refreshURL() {
                    try {
                        const f=document.getElementById("frame");
                        const u=document.getElementById("url");
                        const src=f.contentWindow.location.href;
                        if (src!=="about:blank" && src!==prevURL) {
                            u.value=src;
                            prevURL=src;
                            sendResult(f.contentWindow.document.body.innerHTML);
                        }
                    } catch(e) {

                    }
                }
                function attachEnterKey() {
                    const u=document.getElementById("url");
                    u.addEventListener("keydown",e=>{
                        if (e.keyCode===13) {
                            goPage();
                        }
                    })
                }
                </script>
                <div><input id="url" value="${url}" size=100/><button onclick='goPage()'>Go</button></div>
                <!--div>
                    <button onclick="showHTML()">HTMLソース</button>
                    <button onclick="showFrame()">Webページ</button>
                </div-->
                <div>
                    <textarea id="html" style="display:none;" width="100%" height="90%"></textarea>
                    <iframe id="frame" width="100%" height="90%" src="${url}"></iframe>
                </div>
                <script>setInterval(refreshURL,500);attachEnterKey();</script>
            </html>`);
            return url;
        }
        async build(options) {
            options=options||{};
            const curPrj=this.prj;
            const dst=this.dst;
            let publishedURL;
            for (let f of curPrj.dir.listFiles()) {
                //console.log(f.path());
                if (f.ext()!==".html")  continue;
                var name=f.truncExt();
                var html=f;
                var php=f.up().rel(name+".php");
                //console.log(name, html.path(), php.path());
                if (!php.exists()) continue;
                const url=await this.genHTML(html);
                if (php.name()===options.curLogicFile.name()) {
                    publishedURL=url;
                }
            }
            await this.ide.sync();
            return {
                synced:true,
                publishedURL
            };
        }
        upload(pub) {
            return Sync.sync(this.dst,pub);
        }
    };

});
