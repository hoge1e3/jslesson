/*global SerialControl*/
define(["assert","DeferredUtil","wget", "IndentBuffer","Sync","FS","SplashScreen","AsyncByGenerator",
"PythonParser","PythonSemantics","PythonGen","Python2JS","ctrl","root","WebSite","TError","DelayedCompileError",
"SerialControl","KeyEventChecker"],
function (A,DU,wget,IndentBuffer,Sync,FS,SplashScreen,ABG,
    PP,S,G,J,ctrl,root,WebSite,TError,DelayedCompileError,
    _SerialControl,KeyEventChecker) {//<-dtl
    var PythonBuilder=function (prj, dst,ide) {//<-Dtl
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
        this.ide=ide;
    };
    var libs=["polyfill","jquery-1.12.1","jquery.binarytransport","require"].map(function (n) {
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
    p.genHTML_Browser=function (f) {
        this.progress("generate for browser: "+f.src.html.name());
        const {html,head,body,dom}=commonHeader(f);
        const libsP=[...libs];//, "lib/python/PyLib.js"];
        libsP.map(function (r) {
            return WebSite.runtime+r;
        })/*.concat([f.name+".js"])*/.forEach(function (src) {
            var nn=scriptTag(src);
            body.appendChild(nn);
        });
        addScript(body,`requirejs(["${f.name}"], ${function (mod) {
            console.log("Run end", mod);
            mod.load().then((mod)=>{
                console.log(mod);
                if (window.parent && window.parent.sendResult) {
                    window.parent.sendResult($("#output").text(),"py");
                }    
            },(err)=>{
                window.onerror(0,0,0,0,err);
            });
        }+""});`);
        return f.dst.html.text("<!DOCTYPE HTML>\n<html>"+html.innerHTML+"</html>");
    };
    p.genHTML_Server=function (f) {
        this.progress("generate for server: "+f.src.html.name());
        const {html,head,body,dom}=commonHeader(f);
        const libsP=[...libs, "lib/python/runOnServer.js"];
        libsP.map(function (r) {
            return WebSite.runtime+r;
        }).concat([f.name+".js"]).forEach(function (src) {
            var nn=scriptTag(src);
            body.appendChild(nn);
        });
        return f.dst.html.text("<!DOCTYPE HTML>\n<html>"+html.innerHTML+"</html>");
    };
    function commonHeader(f) {
        var dp=new DOMParser();
        var dom=dp.parseFromString(f.src.html.text()||"<html></html>","text/html");
        var html=dom.getElementsByTagName("html")[0];
        var head=dom.getElementsByTagName("head")[0];
        var body=dom.getElementsByTagName("body")[0];
        $(body).append($("<pre>").attr("id",'output'));
        $(head).append($("<meta>").attr("charset","UTF-8"));
        if (root.BitArrow) {
            var BitArrow=root.BitArrow;
            var ba={
                version:BitArrow.version,
                urlArgs:BitArrow.urlArgs,
                publishedURL:BitArrow.publishedURL,
                runtimePath:WebSite.runtime,
                hosts: WebSite.hosts,
            };
            addScript(head,"window.BitArrow="+JSON.stringify(ba)+";");
        }
        addScript(head, "window.runtimePath='"+WebSite.runtime+"';");
        if (WebSite.hosts) {
            addScript(head,`
            BitArrow.inService=window.location.hostname===new URL(BitArrow.hosts.service.top).host;
            if (BitArrow.inService) {
                BitArrow.runtimePath=${JSON.stringify(WebSite.hosts.service.runtime)};
                window.controllerPath=${JSON.stringify(WebSite.hosts.service.controller)};
            } else {
                window.controllerPath=${JSON.stringify(WebSite.controller)};
            }
            `);    
        } else {
            addScript(head,"window.controllerPath='"+(WebSite.controller_in_service||WebSite.controller)+"';");
        }
        addScript(head, "window.onerror=window.onerror||"+
        function (message, file, lineNo, colNo, error) {console.log(arguments);alert(error||message);}+";");
        $(head).append($("<link>").attr({"rel":"stylesheet","href":WebSite.runtime+"css/run_style.css"}));
        return {dom, html, head, body};
    }
    function addScript(elem, src) {
        elem.appendChild($("<script>").text(src)[0]);
    }
    function scriptTag(src) {
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
        return nn;
    }
    p.genHTML_Raspi=function (f) {
        const pythonSrc=f.src.py.text();
        let ba={};
        if (root.BitArrow) {
            var BitArrow=root.BitArrow;
            ba={
                version:BitArrow.version,
                urlArgs:BitArrow.urlArgs,
                publishedURL:BitArrow.publishedURL,
                serverTop: WebSite.serverTop,
                runtimePath:WebSite.runtime};
        }
        const html=`<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf8"/>
    <script>
    window.BitArrow=${JSON.stringify(ba)};
    </script>
    <script src="${WebSite.runtime}/lib/jquery-1.12.1.js"></script>
    <style>
    #sentData {
        background: #eee;
    }
    </style>
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
<div id="sentData"></div>
<pre id="console">
</pre>
<script src="${WebSite.runtime}/lib/python/raspi.js">
</script>
<script src="${WebSite.runtime}/lib/python/ExportOutput.js">
</script>
</body>
</html>`;
        return f.dst.html.text(html);
    };
    function isNewer(a,b) {
        if (!a.exists()) return false;
        return a.lastUpdate()>b.lastUpdate();
    }
    p.build=function (options) {
        options=options||{};
        let runAt=(options.runAt)||"browser";
        if (options.fullScr) runAt=(this.prevRunAt);
        else this.prevRunAt=runAt;
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
                    //py:dst.rel(name+".py"),
                    map: dst.rel(name+".js.map")
                }
            });
            return SplashScreen.waitIfBusy();
        }).then(DU.tr(function () {
            return DU.each(files,function (f) {
                t.progress("Transpile "+f.src.py.name());//<-dtl
                var isMainFile=(f.src.py.path()==mainFilePath);//<-dtl
                if (!isMainFile) {
                    if (runAt==="raspi" ||
                      (isNewer(f.dst.js, f.src.py) &&
                       isNewer(f.dst.html, f.src.html))) {
                        return SplashScreen.waitIfBusy();//<-dtl
                    }
                }
                console.log("Transpile "+f.src.py.name());
                //console.log("upload",upload);
                t.compile(f,{runAt,isMainFile,upload,publishedURL,files});
                if (runAt==="raspi") t.genHTML_Raspi(f);
                else if (runAt==="browser") t.genHTML_Browser(f);
                else t.genHTML_Server(f);
                return SplashScreen.waitIfBusy();
            });
        }));
    };
    //var superMode=true;// docker

    p.compile=function (f,{runAt,isMainFile,upload,publishedURL,files}) {
        var pysrcF=f.src.py;
        var js;
        var anon,node,errSrc,needInput=false;
        if (runAt==="raspi") {
            //node=PP.parse(pysrcF);
            return;
        }
        if (runAt==="browser") {// docker
            try {
                node=PP.parse(pysrcF);
                var vres=S.check(node,{srcFile:pysrcF, runAt, files});
                needInput=!!vres.useInput;
                anon=vres.anon;
            } catch(e) {
                if (!isMainFile && (e.node || typeof e.pos==="number")) {
                    var pos=e.node?e.node.pos:e.pos;
                    e.pos=pos;
                    errSrc=DelayedCompileError(e);
                } else {
                    console.log(e.stack);
                    throw e;
                }
            }
        } else {
            //--- docker do nothing
            //runLocal=false;
            needInput=(!!pysrcF.text().match(/\binput\b\s*\(/))+"";
        }
        //console.log("PPToken",PP.Tokenizer(pysrc).tokenize());
        var buf=IndentBuffer({dstFile:f.dst.js,mapFile:f.dst.map});
        buf.setSrcFile(pysrcF);//<-dtl
        if (errSrc) {
            buf.printf("%s",errSrc);
        } else if (runAt==="browser") {
            J(node,anon,{buf:buf,genReqJS:true, pyLibPath:WebSite.runtime+"lib/python"});
        } else {
            const pyFile=f.src.py;
            const name=pyFile.name();
            const prj=pyFile.up().name().replace(/\/$/,"");

            buf.printf("runOnServer3('%s','%s',%s);",    prj, name ,needInput );
            //buf.printf("runOnServer2(%s,%s);",    JSON.stringify(f.src.py.text()),needInput );
        }
        buf.close();
        // always run local default is not good for betupe-ji jikkou
        // this.runAt="browser";
    };
    /*function checkSuperMode(){
        if (typeof superMode==="number") return DU.resolve(superMode);
        return ctrl.post("RunPython/isSuper").then(function (r) {
            superMode=r-0;
            console.log("superMode",superMode);
            return superMode;
        });
    }*/
    p.addMenu=async function (Menu) {
        var t=this;
        //const superMode=await checkSuperMode();
        //if (superMode) return;
        Menu.deleteMain("runMenu");
        const runAtServer=async ()=>{
            await t.ide.run({runAt:"server"});
        };
        Menu.appendMain(
            {label:"実行",id:"runPython",after:$("#fileMenu"),sub:
            [
                {label:"ブラウザで実行(F9)",id:"runBrowser",action: async ()=>{
                    await t.ide.run({runAt:"browser"});
                } } ,
                {label:"サーバで実行(Ctrl+F9)",id:"runServer",action: runAtServer}
            ]}
        );
        KeyEventChecker.down(document,"ctrl+F9",runAtServer);
        Menu.appendSub(
            {label:"ツール",id:"tool",after:$("#config")},
            //{label:"Raspi-pico接続",id:"raspiPanel",action:this.showRaspiPanel.bind(this)}
            {label:"組み込み機器接続",id:"raspiPanel",action:this.showRaspiPanel.bind(this)}
        );
        this.menu=Menu;
    };
    p.showRaspiPanel=function () {
        if (this.serialControl) return;
        const serialDOM=$("<div>Serial</div>");
        $("#tabTop").after(serialDOM);
        this.serialControl=new SerialControl();
        this.serialControl.render(serialDOM[0]);
        //this.menu.appendSub("runPython",{label:"Raspiで実行",id:"runRaspi",action: async ()=>{
        this.menu.appendSub("runPython",{label:"組み込み機器で実行",id:"runRaspi",action: async ()=>{
            await this.ide.run({runAt:"raspi"});
        } });
    };
    p.upload=function (pub) {
        return Sync.sync(this.dst,pub);
    };
    p.getIndentFixer=function () {
        return {
            fix(t) {
		return t.replace(/[”“]/g,'"');
            }
        };
    };
    p.Semantics=S;
    return PythonBuilder;//<-Dtl
});
