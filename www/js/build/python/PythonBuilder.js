define(["assert","DeferredUtil","wget", "IndentBuffer","Sync","FS","SplashScreen","AsyncByGenerator","PythonParser","PythonSemantics","ctrl"],
function (A,DU,wget,IndentBuffer,Sync,FS,SplashScreen,ABG,PP,S,ctrl) {//<-dtl
    PythonBuilder=function (prj, dst) {//<-Dtl
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
    };
    var libs=["jquery-1.12.1","require"].map(function (n) {
        return "lib/"+n+".js";
    });
    var p=PythonBuilder.prototype;//<-dtl
    p.progress=function (m) {
        if (window.SplashScreen) window.SplashScreen.progress(m);
    };
    p.dlFiles=function () {
        var dst=this.dst;
        var urls=[];
        urls=urls.concat(libs);
        var base="runtime/";
        var args=urls.map(function (url) {
            var dstf=dst.rel(url);
            if (!dstf.exists()) return wget(base+url, dstf);
        });
        return $.when.apply($,args);
    };
    p.genHTML=function (f) {
        this.progress("generate "+f.src.html.name());
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
        $(head).append($("<script>").text("window.controllerPath='"+WebSite.controller+"';"));
        $(head).append($("<script>").text("window.onerror=window.onerror||"+
        function (e) {alert(e);}+";"));
        $(head).append($("<link>").attr({"rel":"stylesheet","href":WebSite.runtime+"css/run_style.css"}));

        libs.map(function (r) {
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
        return DU.each(curPrj.dir.ls(),function (n) {
            if (FS.PathUtil.ext(n)!=".html")  return;
            var f=curPrj.dir.rel(n);
            var name=f.truncExt();
            var html=f;
            var py=f.up().rel(name+".py");// <-dtl
            if (!py.exists()) return;
            files.push({name:name,
                src:{html:html,py:py}, //<-dtl
                dst:{
                    html:dst.rel(name+".html"),
                    js:dst.rel(name+".js"),
                    map: dst.rel(name+".js.map")
                }
            });
            return SplashScreen.waitIfBusy();
        }).then(DU.tr(function () {
            return DU.each(files,function (f) {
                t.progress("Transpile "+f.src.py.name());//<-dtl
                var isMainFile=(f.src.py.path()==mainFilePath);//<-dtl
                if (!isMainFile && isNewer(f.dst.js, f.src.py) && isNewer(f.dst.html, f.src.html)) return SplashScreen.waitIfBusy();//<-dtl
                t.compile(f);
                t.genHTML(f);
                return SplashScreen.waitIfBusy();
            });
        }));
    };
    var superMode=false;
    ctrl.post("RunPython/isSuper").then(function (r) {
        superMode=r-0;
        console.log("superMode",superMode);
    });
    p.compile=function (f) {
        var pysrcF=f.src.py;
        if (!superMode) {
            var node=PP.parse(pysrcF);
            try {
                S.check(node);
            } catch(e) {
                throw TError(e.message,pysrcF,e.node.pos);
            }
        }
        //console.log("PPToken",PP.Tokenizer(pysrc).tokenize());
        var buf=IndentBuffer({dstFile:f.dst.js,mapFile:f.dst.map});
        buf.setSrcFile(pysrcF);//<-dtl
        buf.printf("$.ajax(window.controllerPath+'?RunPython/run', {data:{srcPath:%s}}).then("+
        "function (r) { $(document.body).text(r.replace(/.*echo off/,''));},function (e){alert(e.responseText);});",
            JSON.stringify(f.src.py.path())
        );//PythonParser.parse(f.src.py.text(),{indentBuffer:buf,src:f.src.py.name(),//<-dtl
        buf.close();

    };
    p.upload=function (pub) {
        return Sync.sync(this.dst,pub);
    };
    return PythonBuilder;//<-Dtl
});
