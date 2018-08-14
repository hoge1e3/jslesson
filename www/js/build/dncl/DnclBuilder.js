define(["assert","DeferredUtil","wget", "dncl/minimal","IndentBuffer","Sync","FS","SplashScreen","AsyncByGenerator"],
function (A,DU,wget,dnclParser,IndentBuffer,Sync,FS,SplashScreen,ABG) {//<-dtl
    DnclBuilder=function (prj, dst) {//<-Dtl
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
    };
    var libs=["jquery-1.12.1","require","AsyncByGenerator"].map(function (n) {
        return "lib/"+n+".js";
    });
    var dtlibs=["promise","mt","lib","polyk","calibration","devicemotion",
    "Dict","Vec2","Actor","Group","UI","Color","Timer",
    "Util","Turtle","Figure","DOM","TextFile","Japanese2"].map(
        function (n) {
            return "lib/dtl/"+n+".js";
        }
    );
    var dnclibs=["lib","performance_test","math","easier_arr","dump"].map(
        function (n) {
            return "lib/dncl/"+n+".js";
        }
    );
    var p=DnclBuilder.prototype;//<-dtl
    p.progress=function (m) {
        if (window.SplashScreen) window.SplashScreen.progress(m);
    };
    p.dlFiles=function () {
        var dst=this.dst;
        var urls=[];
        //"lib/jquery-1.12.1.js",
        //"lib/require.js","lib/dtl/lib.js","lib/dtl/polyk.js"];
        urls=urls.concat(libs);
        urls=urls.concat(dtlibs);
        urls=urls.concat(dnclibs);
        //urls=urls.concat(images);
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
        var dp=new DOMParser;
        var dom=dp.parseFromString(f.src.html.text(),"text/html");
        var html=dom.getElementsByTagName("html")[0];
        var head=dom.getElementsByTagName("head")[0];
        var body=dom.getElementsByTagName("body")[0];
        $(head).append($("<meta>").attr("charset","UTF-8"));
        if (window.BitArrow) {
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

        libs.concat(dtlibs).concat(dnclibs).map(function (r) {
            return WebSite.runtime+r;
        }).concat([f.name+".js"]).forEach(function (src) {
            var nn=document.createElement("script");
            nn.setAttribute("charset","utf-8");
            var src2;
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
    p.build=function (options) {
        options=options||{};
        var mainFilePath=options.mainFile && options.mainFile.path();
        var curPrj=this.prj;
        var dst=this.dst;
        var t=this;
        var files=[];
        //var tr=curPrj.dir.getDirTree({style:"no-recursive"});
        return DU.each(curPrj.dir.ls(),function (n) {
            if (FS.PathUtil.ext(n)!=".html")  return;
            var f=curPrj.dir.rel(n);
            var name=f.truncExt();
            var html=f;
            var dncl=f.up().rel(name+".dncl");// <-dtl
            if (!dncl.exists()) return;
            files.push({name:name,
                src:{html:html,dncl:dncl}, //<-dtl
                dst:{
                    html:dst.rel(name+".html"),
                    //dtlvm:isVM(dtl.text())?dst.rel(name+".dtlvm"):null,
                    js:dst.rel(name+".js"),
                    map: dst.rel(name+".js.map")
                }
            });
            return SplashScreen.waitIfBusy();
        }).then(DU.tr(function () {
            return DU.each(files,function (f) {
                t.progress("Transpile "+f.src.dncl.name());//<-dtl
                var isMainFile=(f.src.dncl.path()==mainFilePath);//<-dtl
                if (!isMainFile && isNewer(f.dst.js, f.src.dncl) && isNewer(f.dst.html, f.src.html)) return SplashScreen.waitIfBusy();//<-dtl
                //if (f.dst.dtlvm) return compileVM(f);
                var buf=IndentBuffer({dstFile:f.dst.js,mapFile:f.dst.map});
                buf.setSrcFile(f.src.dncl);//<-dtl
                var js=dnclParser.parse(f.src.dncl.text(),{indentBuffer:buf,src:f.src.dncl.name(),//<-dtl
                throwCompileErrorOnRuntime:!isMainFile});
                buf.buf=dnclParser.postprocess(buf.buf);
                buf.close();
                t.genHTML(f);
                return SplashScreen.waitIfBusy();
            });
        }));
    };
    p.upload=function (pub) {
        return Sync.sync(this.dst,pub);
    };
    return DnclBuilder;//<-Dtl
});
