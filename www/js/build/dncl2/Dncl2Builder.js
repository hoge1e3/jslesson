define(["assert","DeferredUtil","wget", "build/dncl2/minimal","IndentBuffer","Sync","FS","SplashScreen","AsyncByGenerator","root","WebSite","TError"],
function (A,DU,wget,DNCL2,IndentBuffer,Sync,FS,SplashScreen,ABG,root,WebSite,TError) {//<-dtl
    var Dncl2Builder=function (prj, dst) {//<-Dtl
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
    };
    root.Dncl2Builder=Dncl2Builder;
    var dnclibs=["minimal"].map(
        function (n) {
            return "lib/dncl2/"+n+".js";
        }
    );
    var p=Dncl2Builder.prototype;//<-dtl
    p.progress=function (m) {
        if (window.SplashScreen) window.SplashScreen.progress(m);
    };
    p.dlFiles=function () {
        var dst=this.dst;
        var urls=[];
        urls=urls.concat(dnclibs);
        var base="runtime/";
        var args=urls.map(function (url) {
            var dstf=dst.rel(url);
            if (!dstf.exists()) return wget(base+url, dstf);
        });
        return $.when.apply($,args);
    };
    p.genHTML=function (f) {
        this.progress("generate "+f.src.html.name());
        //var curHTMLFile=d.rel(name+".html");
        var dp=new DOMParser();
        var dom=dp.parseFromString(f.src.html.text()||"<html></html>","text/html");
        var html=dom.getElementsByTagName("html")[0];
        var head=dom.getElementsByTagName("head")[0];
        var body=dom.getElementsByTagName("body")[0];
        $(head).append($("<meta>").attr("charset","UTF-8"));
        if (window.BitArrow) {
            var BitArrow=window.BitArrow;
            var ba={
                version:BitArrow.version,
                urlArgs:BitArrow.urlArgs,
                publishedURL:BitArrow.publishedURL,
                runtimePath:WebSite.runtime};
            $(head).append($("<script>").text("window.BitArrow="+JSON.stringify(ba)+";"));
        }
        $(head).append($("<script>").text("window.runtimePath='"+WebSite.runtime+"';"));
        $(head).append($("<script>").text("window.onerror=window.onerror||"+
        function (e) {alert(e);}+";"));
        $(head).append($("<link>").attr({"rel":"stylesheet","href":WebSite.runtime+"css/run_style.css"}));
        $(body).append(`<pre id="display" style="width:100%;height:100%;margini:1em;"></pre>`);

        dnclibs.map(function (r) {
            return WebSite.runtime+r;
        }).concat([f.name+".js"]).forEach(function (src) {
            var nn=document.createElement("script");
            nn.setAttribute("charset","utf-8");
            var src2;
            var requirejs=root.requirejs;
            if (FS.PathUtil.isURL(src) && requirejs.version!=="2.1.9" && typeof requirejs.s.contexts._.config.urlArgs==="function") {
                src2=src+requirejs.s.contexts._.config.urlArgs("",src);
            } else {
                src2=src+(src.indexOf("?")<0?"?":"&")+Math.random();
            }
            nn.setAttribute("src",src2);
            body.appendChild(nn);
        });
        return f.dst.html.text("<!DOCTYPE HTML>\n<html>"+html.innerHTML+"</html>");
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
                var js=DNCL2.transpile(f.src.dncl.text());
                f.dst.js.text(`DNCL2.run(${JSON.stringify(js)});`);
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
