define(["assert","DeferredUtil","wget", "cCompiler","IndentBuffer","Sync","FS","SplashScreen"],
function (A,DU,wget,compile,IndentBuffer,Sync,FS,SplashScreen) {
    CBuilder=function (prj, dst) {
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
    };
    var libs=["jquery-1.12.1","require"].map(function (n) {
        return "lib/"+n+".js";
    });
    var clibs=["lib","util","ctype","x","AsyncByGenerator","AsyncByGeneratorRaw"].map(
        function (n) {
            return "lib/c/"+n+".js";
        }
    );
    var p=CBuilder.prototype;
    p.progress=function (m) {
        if (window.SplashScreen) window.SplashScreen.progress(m);
    };
    p.genHTML=function (f,options) {
        options=options||{};
        this.progress("generate "+f.src.html.name());
        //var curHTMLFile=d.rel(name+".html");
        var dp=new DOMParser;
        var dom=dp.parseFromString(f.src.html.text(),"text/html");
        var html=dom.getElementsByTagName("html")[0];
        var head=dom.getElementsByTagName("head")[0];
        var body=dom.getElementsByTagName("body")[0];
        var runtimePath=options.runtimePath||WebSite.runtime;
        $(head).append($("<meta>").attr("charset","UTF-8"));
        $(head).append($("<script>").text("window.runtimePath='"+runtimePath+"';"));
        $(head).append($("<script>").text("window.sourceName='"+f.src.html.truncExt()+"';"));
        $(head).append($("<script>").text("window.onerror=window.onerror||"+
        function (e) {alert(e);}+";"));

        libs/*.concat(clibs)*/.map(function (r) {
            return runtimePath+r;
        }).concat([runtimePath+"lib/c/runc.js"]).forEach(function (src) {
            var nn=document.createElement("script");
            nn.setAttribute("charset","utf-8");
            var src2;
            src2=src+requirejs.s.contexts._.config.urlArgs("",src);
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
        return DU.each([options.mainFile],function (c) {
            //if (FS.PathUtil.ext(n)!=".html")  return;
            var name=c.truncExt();
            var html=c.sibling(name+".html");
            console.log("C/HTML",c,html);
            if (!c.exists()) return;
            files.push({name:name,
                src:{html:html,c:c},
                dst:{
                    html:dst.rel(name+".html"),
                    js:dst.rel(name+".js"),
                    map: dst.rel(name+".js.map")
                }
            });
            return SplashScreen.waitIfBusy();
        }).then(DU.tr(function () {
            return DU.each(files,function (f) {
                t.progress("Transpile "+f.src.c.name());
                var isMainFile=(f.src.c.path()==mainFilePath);
                if (!isMainFile && isNewer(f.dst.js, f.src.c)) return SplashScreen.waitIfBusy();
                /*var buf=IndentBuffer({dstFile:f.dst.js,mapFile:f.dst.map});
                buf.setSrcFile(f.src.dtl);
                var js=dtlParser.parse(f.src.dtl.text(),{indentBuffer:buf,src:f.src.dtl.name(),
                throwCompileErrorOnRuntime:!isMainFile});
                buf.close();*/
                compile(f.src.c,f.dst.js,{noReturn:true});
                return SplashScreen.waitIfBusy();
            });
        })).then(DU.tr(function() {
            return DU.each(files,function (f) {
                if (isNewer(f.dst.html, f.src.html)) return SplashScreen.waitIfBusy();
                t.genHTML(f,options);
                return SplashScreen.waitIfBusy();
            });
        }));
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
    p.silentRun=function (file,options) {
        options=options||{};
        // file: compiled html file
        return DU.funcPromise(function (succ,err) {
            if (options.timeout) {
                setTimeout(function () {
                    err(new Error("Timeout"));
                },options.timeout);
            }
            requirejs(["LocalBrowser"],function (LocalBrowser) {
                var hidden=$("<div>").hide().appendTo("body");
                dialogClosed=false;
                var b=new LocalBrowser(hidden);
                b.open(file,{
                    onerror:function (message, source, lineno, colno,ex) {
                        err(ex||new Error(message+" at "+source+":"+lineno+":"+colno));
                    },
                    params:{stdin:options.stdin},
                    globals: {
                        runc_handleError:function (r) {
                            err(r);
                            b.close();
                            hidden.remove();
                        },
                        runc_sendResult: function (r) {
                            //console.log("Result sent ",r);
                            succ(r);
                            b.close();
                            hidden.remove();
                        }
                    }
                });
            });
            //BABuilder.silentRun(FS.get("/ram/build/P0414_2.html"),{stdin:"20\n15\n"}).then(function (r){console.log("R",r);},function (r){console.log("E",r);});
        });
    };
    return CBuilder;
});
