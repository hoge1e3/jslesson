define(["assert","DeferredUtil","wget", "dolittle/minimal","IndentBuffer","Sync","FS","SplashScreen","AsyncByGenerator","UI","root","WebSite"],
function (A,DU,wget,dtlParser,IndentBuffer,Sync,FS,SplashScreen,ABG,UI,root,WebSite) {
    var DtlBuilder=root.DtlBuilder=function (prj, dst) {
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
    };
    /*var images=["99.gif", "akazukin.gif", "apple.png", "arrow0.png",
    "arrow1.png", "arrow2.png", "arrow3.png", "ayumi.gif",
    "ayumi.png", "ayumiAka.gif", "ayumiAo.gif", "ayumiBlue.png",
    "ayumiKiiro.gif", "ayumiRed.png", "ayumiYellow.png",
    "ball.png", "base.png", "beetle.png", "bluefish.png",
    "book.png", "car.png", "clear.png", "copy.png",
    "crab.png", "cut.png", "ecl.png", "editAdd.png", "fish.png",
    "heri.gif", "inputPad.png", "kuno.gif", "kuno.png",
    "mapchip.png", "myurobo.png", "neko.png", "neko1.png",
    "neko2.png", "niwa.gif", "nowprint.png", "paste.png",
    "pen.png", "rabbitBlue.png", "rabbitGreen.png",
    "rabbitRed.png", "rabbitYellow.png", "raceBlue.png",
    "raceGreen.png", "raceRed.png", "raceYellow.png",
    "redo.png", "rocket.gif", "runner.png", "Sample.png",
    "server.png", "soccer.png", "sound.png", "star.png",
    "tnu.ico", "tonbo.gif", "tonyu.png", "trumpet.png",
    "tulip.png", "ui-icons_888888_256x240.png", "undo.png", "usa.gif"].map(
        function (n) {return "images/"+n;});*/
    var libs=["polyfill","jquery-1.12.1","require","AsyncByGenerator"].map(function (n) {
        return "lib/"+n+".js";
    });
    var dtlibs=["promise","mt","lib",
    "parser","ExpressionParser","context","minimal",
    "polyk","calibration","devicemotion",
    "Dict","Vec2","Actor","Group","UI","Color","Timer",
    "Util","Turtle","Figure","DOM","TextFile","Japanese2","db"].map(
        function (n) {
            return "lib/dtl/"+n+".js";
        }
    );
    var p=DtlBuilder.prototype;
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
                runtimePath:WebSite.runtime,
                main:f.name};
            $(head).append($("<script>").text("window.BitArrow="+JSON.stringify(ba)+";"));
        }
        (["lib/require.js","lib/dtl/runDtl.js"]).map(function (r) {
            return WebSite.runtime+r;
        }).forEach(function (src) {
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
    p.genHTMLOLD=function (f) {
        this.progress("generate "+f.src.html.name());
        //var curHTMLFile=d.rel(name+".html");
        var dp=new DOMParser();
        var dom=dp.parseFromString(f.src.html.text(),"text/html");
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

        libs.concat(dtlibs).map(function (r) {
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
            var dtl=f.up().rel(name+".dtl");
            if (!dtl.exists()) return;
            files.push({name:name,
                src:{html:html,dtl:dtl},
                dst:{
                    html:dst.rel(name+".html"),
                    dtlvm:isVM(dtl.text())?dst.rel(name+".dtlvm"):null,
                    js:dst.rel(name+".js"),
                    map: dst.rel(name+".js.map")
                }
            });
            return SplashScreen.waitIfBusy();
        }).then(DU.tr(function () {
            return DU.each(files,function (f) {
                t.progress("Transpile "+f.src.dtl.name());
                //console.log("File new?",f.src.html.name(), isNewer(f.dst.html, f.src.html), isNewer(f.dst.js, f.src.dtl));
                var isMainFile=(f.src.dtl.path()==mainFilePath);
                if (!isMainFile && isNewer(f.dst.js, f.src.dtl) && isNewer(f.dst.html, f.src.html)) return SplashScreen.waitIfBusy();
                if (f.dst.dtlvm) {
                    compileVM(f);
                } else {
                    var buf=IndentBuffer({dstFile:f.dst.js,mapFile:f.dst.map});
                    buf.setSrcFile(f.src.dtl);
                    var js=dtlParser.parse(f.src.dtl.text(),{
                        indentBuffer:buf,
                        src:f.src.dtl.name(),
                        srcPath: f.src.dtl.path(),
                        throwCompileErrorOnRuntime:!isMainFile
                    });
                    buf.close();
                }
                t.genHTML(f);
                return SplashScreen.waitIfBusy();
            });
        }))/*.then(DU.tr(function() {
            return DU.each(files,function (f) {
                if (isNewer(f.dst.html, f.src.html) && isNewer(f.dst.js, f.src.dtl)) return SplashScreen.waitIfBusy();
                t.genHTML(f);
                return SplashScreen.waitIfBusy();
            });
        }))*/;
    };
    function isVM(src) {
        return src.match(/RUN_AT_SERVER/);
    }
    function compileVM(f) {
        return DU.requirejs(["dolittle/dtlvm"]).then(function () {
			var dtlNode=dtlParser.parseAsNode(f.src.dtl.text());
    		var vmc=dtlParser.node2vm(dtlNode);
    		var vmcj=JSON.stringify(vmc);
    		f.dst.dtlvm.text(vmcj);
			console.log("VM Code", vmcj);
            var DATA="dummy";
			var scr=function () {
			    $.post("runDtl.php",DATA).then(function (res) {
			        console.log("VMRES",res);
			        alert(res);
			    }).fail(function (e) {
			        alert("エラー："+e.responseText);
			    });
			};
			scr=("("+scr+")()").replace(/DATA/,JSON.stringify({script:vmcj}));
			f.dst.js.text(scr);//"alert('このファイルはサーバで実行してください');");
			return SplashScreen.waitIfBusy();
        });
    }
    p.upload=function (pub) {
        return Sync.sync(this.dst,pub);
    };
    p.qrDialog=function (ctx) {
        var e=ctx.editorInfo.editor;
        var src=e.getValue();
        if (src.indexOf("NOGENERATOR")>=0) return;
        ctx.dialogJQ.append(UI("div",
            ["button",{on:{click:addNongen}},"古い端末で表示する"]
        ));
        function addNongen() {
            src="//NOGENERATOR\n"+src;
            e.setValue(src);
            setTimeout(ctx.rerun,500);
            ctx.dialogJQ.dialog("close");
        }
    };
    return DtlBuilder;
});
