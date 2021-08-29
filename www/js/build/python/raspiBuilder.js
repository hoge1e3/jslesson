/*global SerialControl*/
define(function (require, exports, module) {
    const root=require("root");
    const WebSite=require("WebSite");
    const FS=require("FS");
    const SplashScreen=require("SplashScreen");
    const PP=require("PythonParser");
    const S=require("PythonSemantics");
    const Sync=require("Sync");
    // See: https://stackoverflow.com/questions/37711603/javascript-es6-class-definition-not-accessible-in-window-global
    const _SerialControl=require("SerialControl");
    const EXT=".ras.py";
    const PythonBuilder=function (prj, dst,ide) {//<-Dtl
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
        this.ide=ide;
        //this.runLocal=true;
    };
    var p=PythonBuilder.prototype;//<-dtl
    p.progress=function (m) {
        if (window.SplashScreen) window.SplashScreen.progress(m);
    };
    p.genHTML=function (f, pythonSrc) {
        let ba={};
        if (root.BitArrow) {
            var BitArrow=root.BitArrow;
            ba={
                version:BitArrow.version,
                urlArgs:BitArrow.urlArgs,
                publishedURL:BitArrow.publishedURL,
                runtimePath:WebSite.runtime};
        }
        const html=`<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf8"/>
    <script>
    window.BitArrow=${JSON.stringify(ba)};
    </script>
</head>
<body>
<div id="control"></div>
<Script src="${WebSite.runtime}/lib/python/SerialControl.js"></script>
<div>
<div style="display:none;">
<textarea rows=5 cols=40 id="prog">${pythonSrc}</textarea>
<button onclick="run()">Run</button>
</textarea>
</div>
<button onclick="ctrlC()">Stop</button>
<button onclick="rstRun()">Restart</button>
<button onclick="clearConsole()">Clear</button>
<pre id="console">
</pre>
<script src="${WebSite.runtime}/lib/python/raspi.js">
</script>
</body>
</html>`;
        return f.dst.html.text(html);
    };
    function isNewer(a,b) {
        if (!a.exists()) return false;
        return a.lastUpdate()>b.lastUpdate();
    }
    p.build=async function (options) {
        options=options||{};
        let runLocal=(options.runLocal!==false);
        if (options.fullScr) runLocal=(this.prevRunLocal!==false);
        else this.prevRunLocal=runLocal;
        var mainFilePath=options.mainFile && options.mainFile.path();
        var curPrj=this.prj;
        var dst=this.dst;
        var t=this;
        var files=[];
        for (let n of curPrj.dir.ls()) {
            if (FS.PathUtil.ext(n)!=".html") continue;
            var f=curPrj.dir.rel(n);
            var name=f.truncExt();
            var html=f;
            var py=f.up().rel(name+EXT);// <-dtl
            if (!py.exists()) continue;
            files.push({name:name,
                src:{html:html,py:py}, //<-dtl
                dst:{
                    html:dst.rel(name+".html"),
                    js:dst.rel(name+".js"),
                    //py:dst.rel(name+".py"),
                    map: dst.rel(name+".js.map")
                }
            });
            await SplashScreen.waitIfBusy();
        }
        for (let f of files) {
            t.progress("Transpile "+f.src.py.name());//<-dtl
            var isMainFile=(f.src.py.path()==mainFilePath);//<-dtl
            if (!isMainFile) continue;
            //if (!isMainFile && isNewer(f.dst.js, f.src.py) && isNewer(f.dst.html, f.src.html)) return SplashScreen.waitIfBusy();//<-dtl
            console.log("Transpile "+f.src.py.name());
            t.compile(f);
            const pythonSrc=f.src.py.text();
            t.genHTML(f,pythonSrc);
            await SplashScreen.waitIfBusy();
        }
    };
    var superMode=false;
    p.addMenu=async function (Menu) {
        const serialDOM=$("<div>Serial</div>");
        $("#tabTop").after(serialDOM);
        p.serialControl=new SerialControl();
        p.serialControl.render(serialDOM[0]);
    };
    p.compile=function (f) {
        var pysrcF=f.src.py;
        var js;
        var anon,node,errSrc,needInput=false;
        node=PP.parse(pysrcF);
        //var vres=S.check(node,{srcFile:pysrcF, runAt: "server"});
        //needInput=!!vres.useInput;
        //anon=vres.anon;
    };
    p.upload=function (pub) {
        return Sync.sync(this.dst,pub);
    };
    p.Semantics=S;
    return PythonBuilder;//<-Dtl
});
