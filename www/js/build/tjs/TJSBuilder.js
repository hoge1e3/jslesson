define(["assert","DeferredUtil","wget","Sync"], 
function (A,DU,wget,Sync) {
    TJSBuilder=function (prj, dst) {
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
    };
    var p=TJSBuilder.prototype;
    p.dlFiles=function () {
        var dst=this.dst;
        var urls=["lib/tjs/TonyuLib.js",
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
        var d=this.prj.dir;
        var curHTMLFile=d.rel(name+".html");
        var dp=new DOMParser;
        var dom=dp.parseFromString(curHTMLFile.text(),"text/html");
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
        $(head).append($("<script>").text("window.$LASTPOS=0;window.runtimePath='"+WebSite.runtime+"';"));
        ["lib/jquery-1.12.1.js","lib/require.js","lib/tjs/run.js"].forEach(function (src) {
            var nn=document.createElement("script");
            nn.setAttribute("charset","utf-8");
            nn.setAttribute("src",WebSite.runtime+src);
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
    p.build=function () {
        var curPrj=this.prj;
        var opt=curPrj.getOptions();
        console.log("opT",opt);
        if (opt.compiler && 
        opt.compiler.dependingProjects && 
        opt.compiler.dependingProjects[0]){
            if (opt.compiler.dependingProjects[0].compiledURL=="${JSLKer}/js/concat.js") {
                opt.compiler.dependingProjects[0].compiledURL="${JSLKer}";
                curPrj.setOptions(opt);
            }
        }
        var dst=this.dst;
        var t=this;
        return /*this.dlFiles()*/$.when().then(function () {
            return curPrj.loadClasses();            
        }).then(function() {
            var concat=curPrj.getOutputFile();
            dst.rel("user.js").copyFrom(concat);
            curPrj.dir.each(function (f) {
                if (f.ext()!=".html")  return;
                t.genHTML(f.truncExt());
            });
        });            
    };
    p.upload=function (pub) {
        return Sync.sync(this.dst,pub);  
    };
    return TJSBuilder;
});