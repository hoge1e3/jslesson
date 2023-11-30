/*global requirejs*/
define(["assert","DeferredUtil","wget","Sync","WebSite","Tonyu","BuilderClient","Util","FS","ProjectFactory","root"],
function (A,DU,wget,Sync,WebSite,Tonyu,BuilderClient,Util,FS,F,root) {
    const langMod=BuilderClient.langMod;
    F.addDependencyResolver((prj, spec)=> {
        if (spec.namespace==="jslker") {
            return F.create("compiled",{namespace:spec.namespace, url:WebSite.JSLKer});
        }
    });
    var TJSBuilder=function (prj, dst) {
        this.prj=prj;// TPRC from BA
        const opt=prj.getOptions();
        if (!opt.compiler || !opt.compiler.namespace) {
            opt.compiler={
                namespace:"user",
                outputFile:"js/concat.js",
                defaultSuperClass:"jslker.Parent",
                dependingProjects:[
                    {"namespace":"jslker", "compiledURL":"${JSLKer}"}
                ]
            };
            prj.setOptions(opt);
        }
        const ns2depspec= {
            jslker: {namespace:"jslker", url: WebSite.JSLKer}
        };
        prj.include(langMod);
        //Util.extend(prj, langMod);// TODO .include(langMod);
        prj.getOutputFile=function () {//override
            const opt=this.getOptions();
            const dir=this.getDir();
            if (opt.compiler.outputFile) return FS.resolve(opt.compiler.outputFile,dir.path());
            return dir.rel("js/concat.js");
        };
        const workerURL=(root.reqConf.baseUrl.match(/es5/)?
        	"BuilderWorker.es5.js":"BuilderWorker.js");
        const builder=new BuilderClient(prj ,{
            worker: {ns2depspec, url: workerURL},locale:"ja",
        });//PRC(prj.getDir());// Tonyu-lang dependent
        //Util.extend(tprj, prj);// TODO .include(langMod);

        this.builder=builder;//tprj=tprj;
        this.convertPath=p=>builder.convertFromWorkerPath(p);
        prj.builder=builder;
        this.dst=dst;// SFile in ramdisk
        Tonyu.globals.$currentProject=this.prj;
        Tonyu.currentProject=this.prj;
    };
    var p=TJSBuilder.prototype;
    p.dlFiles=function () {
        var dst=this.dst;
        var urls=["lib/tjs/TonyuRuntime.js",
        "lib/jquery-1.12.1.js","lib/tjs/kernel.js",
        "lib/require.js","lib/tjs/run.js",
        "images/neko1.png","images/ball.png"];
        var base="runtime/";
        var args=urls.map(function (url) {
            var dstf=dst.rel(url);
            if (!dstf.exists()) return wget(base+url, dstf);
        });
        return $.when.apply($,args);
    };
    p.genHTML=function (name) {
        var dst=this.dst;
        var d=this.prj.getDir();
        var curHTMLFile=d.rel(name+".html");
        var dp=new DOMParser();
        var dom=dp.parseFromString(curHTMLFile.text()||"<html></html>","text/html");
        var html=dom.getElementsByTagName("html")[0];
        var head=dom.getElementsByTagName("head")[0];
        var body=dom.getElementsByTagName("body")[0];
        $(body).find("img").each(function () {
            var url=$(this).attr("src");
            if ( (typeof url=="string") && !url.match(/^http/)) {
                $(this).attr("src",WebSite.runtime+url);
            }
        });
        /*var base=document.createElement("base");
        base.setAttribute("href",WebSite.runtime);
        head.appendChild(base);
        var metacharset=document.createElement("meta");
        metacharset.setAttribute("charset","UTF-8");
        head.appendChild(metacharset);*/
        $(head).append($("<meta>").attr("charset","UTF-8"));
        if (window.BitArrow) {
            var ba={
                version:window.BitArrow.version,
                urlArgs:window.BitArrow.urlArgs,
                publishedURL:window.BitArrow.publishedURL,
                runtimePath:WebSite.runtime,
                hosts: WebSite.hosts,
            };
            $(head).append($("<script>").text("window.BitArrow="+JSON.stringify(ba)+";"));
        }
        $(head).append($("<script>").text("window.$LASTPOS=0;window.runtimePath='"+WebSite.runtime+"';"));
        ["lib/polyfill.js","lib/tjs/documentWrite.js"].forEach(function (src) {
            var nn=document.createElement("script");
            nn.setAttribute("charset","utf-8");
            nn.setAttribute("src",WebSite.runtime+src);
            head.appendChild(nn);
        });

        /*nn=document.createElement("script");
        nn.setAttribute("charset","utf-8");
        nn.setAttribute("src",WebSite.runtime+"lib/plotly-latest.min.js");
        head.appendChild(nn);*/

        ["lib/plotly-latest.min.js","lib/jquery-1.12.1.js","lib/require.js","lib/tjs/run.js"].forEach(function (src) {
            var nn=document.createElement("script");
            nn.setAttribute("charset","utf-8");
            var url=WebSite.runtime+src;
            if (requirejs.version!=="2.1.9" && typeof requirejs.s.contexts._.config.urlArgs==="function") {
                url+=requirejs.s.contexts._.config.urlArgs("",url);
            }
            nn.setAttribute("src",url);
            body.appendChild(nn);
        });
        var nn=document.createElement("script");
        nn.setAttribute("charset","utf-8");
        var ns=this.prj.getNamespace();
        nn.appendChild(document.createTextNode("run('"+ns+"."+name+"');"));
        body.appendChild(nn);
        var dstHTMLF=dst.rel(curHTMLFile.name());
        dstHTMLF.text("<html>"+html.innerHTML+"</html>");
    };
    p.build=async function () {
        const prj=this.prj, builder=this.builder;
        var opt=prj.getOptions();
        console.log("opT",opt);
        if (opt.compiler &&
        opt.compiler.dependingProjects &&
        opt.compiler.dependingProjects[0]){
            if (opt.compiler.dependingProjects[0].compiledURL=="${JSLKer}/js/concat.js") {
                opt.compiler.dependingProjects[0].compiledURL="${JSLKer}";
                prj.setOptions(opt);
            }
        }
        var dst=this.dst;
        var t=this;
        await builder.clean();
        var concat=prj.getOutputFile();
        dst.rel("user.js").copyFrom(concat);
        // source-map  concat.js.map(in user.js) this is not good
        var mapfile=concat.sibling(concat.name()+".map");
        if (mapfile.exists()) {
            dst.rel("concat.js.map").copyFrom(mapfile);
        } else {
            console.log("NOTE",mapfile.path(),"not exists");
        }
        prj.getDir().each(function (f) {
            if (f.ext()!=".html")  return;
            t.genHTML(f.truncExt());
        });
    };
    p.upload=function (pub) {
        return Sync.sync(this.dst,pub);
    };
    return TJSBuilder;
});
