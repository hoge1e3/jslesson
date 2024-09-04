define(["assert","importModule","wget", "IndentBuffer","Sync","FS","SplashScreen","root","WebSite","TError"],
function (A,importModule,wget,IndentBuffer,Sync,FS,SplashScreen,root,WebSite,TError) {//<-dtl
    var Dncl2Builder=function (prj, dst) {//<-Dtl
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
    };
    root.Dncl2Builder=Dncl2Builder;
    let transpile;
    importModule("./build/dncl2/js/index-es.js").then((mod)=>{
        transpile=mod.transpile;
        console.log("transpile",transpile);
    });

    const dnclibs=["index"].map(
        function (n) {
            return "lib/dncl2/"+n+".js";
        }
    );
    var p=Dncl2Builder.prototype;//<-dtl
    p.progress=function (m) {
        if (window.SplashScreen) window.SplashScreen.progress(m);
    };
    /*p.dlFiles=function () {
        var dst=this.dst;
        var urls=[];
        urls=urls.concat(dnclibs);
        var base="runtime/";
        var args=urls.map(function (url) {
            var dstf=dst.rel(url);
            if (!dstf.exists()) return wget(base+url, dstf);
        });
        return $.when.apply($,args);
    };*/
    p.genHTML=function (f) {
        this.progress("generate "+f.src.html.name());
        const runtime=FS.PathUtil.filify(WebSite.runtime)+"/lib/dncl2";
        f.dst.html.text(`<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-type" content="text/html; charset=utf8"/>
    </head>        
    <body>
	<script src="${runtime}/jquery-1.12.1.js"></script>
    <script type="module">
        window.BitArrow=${JSON.stringify({hosts:WebSite.hosts})};
        const hosts=BitArrow.hosts;
        BitArrow.inService=window.location.hostname===new URL(BitArrow.hosts.service.top).host;
        const runtime=(BitArrow.inService? hosts.service.runtime : hosts.ide.runtime)+"/lib/dncl2/";
        console.log("runtime",runtime);
        const {run}=await import(runtime+"index.js");
        let prePre = undefined;
        window.write=(str,isNotBR)=>{
            const tag = prePre || document.createElement('pre');
            prePre = undefined;
            if(isNotBR)prePre = tag;
            tag.textContent += str;
            document.body.appendChild(tag);
            document.body.scrollTop = document.body.scrollHeight;
        };
        window.displayClear=()=>{
            document.body.innerHTML = '';
        };
        run(${JSON.stringify(f.dst.js.text())});
	</script>
</body></html>
        `);
        return;
    };
    function isNewer(a,b) {
        if (!a.exists()) return false;
        return a.lastUpdate()>b.lastUpdate();
    }
    p.build=async function (options) {
        options=options||{};
        var mainFilePath=options.mainFile && options.mainFile.path();
        var curPrj=this.prj;
        var dst=this.dst;
        var t=this;
        var files=[];
        const fileNames=await curPrj.dir.ls();
        for (let n of fileNames) {
            if (FS.PathUtil.ext(n)!=".html")  continue;
            var f=curPrj.dir.rel(n);
            var name=f.truncExt();
            var html=f;
            var dncl=f.up().rel(name+".dncl2");// <-dtl
            if (!dncl.exists()) continue;
            files.push({name:name,
                src:{html:html,dncl:dncl}, //<-dtl
                dst:{
                    html:dst.rel(name+".html"),
                    //dtlvm:isVM(dtl.text())?dst.rel(name+".dtlvm"):null,
                    js:dst.rel(name+".js"),
                    map: dst.rel(name+".js.map")
                }
            });
            await SplashScreen.waitIfBusy();
        }
        for (let f of files) {
            t.progress("Transpile "+f.src.dncl.name());//<-dtl
            var isMainFile=(f.src.dncl.path()==mainFilePath);//<-dtl
            if (!isMainFile/* && isNewer(f.dst.js, f.src.dncl) && isNewer(f.dst.html, f.src.html)*/) {
                await SplashScreen.waitIfBusy();//<-dtl
                continue;
            } //if (f.dst.dtlvm) return compileVM(f);
            var buf=IndentBuffer({dstFile:f.dst.js,mapFile:f.dst.map});
            buf.setSrcFile(f.src.dncl);//<-dtl
            try {
                var js=transpile(f.src.dncl.text());
                f.dst.js.text(js);//`DNCL2.run(${JSON.stringify(js)});`);
                t.genHTML(f);
            } catch (e) {
                console.log(e.message);
                let errpos=/★★★/;
                let m=errpos.exec(e.message);
                if (!m) throw e;
                let pos=m.index;
                //let src=e.message.replace(/★★★.*/,"");
                throw TError("文法エラー",f.src.dncl ,pos);
            }
            await SplashScreen.waitIfBusy();
        }
    };
    p.upload=function (pub) {
        return Sync.sync(this.dst,pub);
    };
    return Dncl2Builder;//<-Dtl
});
