define(["assert","DeferredUtil","wget"], function (A,DU,wget) {
    TJSBuilder=function (prj, dst) {
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
    };
    var p=TJSBuilder.prototype;
    p.dlFiles=function () {
        var dst=this.dst;
        var urls=["lib/TonyuLib.js",
        "lib/jquery-1.12.1.js","lib/kernel.js",
        "lib/require.js","lib/run.js",
        "images/neko1.png","images/ball.png"];
        var base="fs/runtime/";
        var args=urls.map(function (url) {
            var dstf=dst.rel(url);
            if (!dstf.exists()) return wget(base+url, dstf);
        });
        return $.when.apply($,args);
    };
    p.build=function (curHTMLFile, curJSFile) {
        var curPrj=this.prj;
        var name=curPrj.getClassName(curJSFile);
        A.is(name,String);
        var dst=this.dst;
        return this.dlFiles().then(function () {
            return curPrj.loadClasses();            
        }).then(DU.throwF(function() {
            var concat=curPrj.getOutputFile();
            dst.rel("user.js").copyFrom(concat);
            var dp=new DOMParser;
            var dom=dp.parseFromString(curHTMLFile.text(),"text/html");
            var html=dom.getElementsByTagName("html")[0];
            var head=dom.getElementsByTagName("head")[0];
            ["lib/jquery-1.12.1.js","lib/require.js","lib/run.js"].forEach(function (src) {
                var nn=document.createElement("script");
                nn.setAttribute("charset","utf-8");
                nn.setAttribute("src",src);
                head.appendChild(nn);
            });
            var nn=document.createElement("script");
            nn.setAttribute("charset","utf-8");
            nn.appendChild(document.createTextNode("run('"+name+"');"));
            head.appendChild(nn);
            dst.rel("index.html").text("<html>"+html.innerHTML+"</html>");
            
        }), function (e) {
            if (typeof SplashScreen!="undefined") SplashScreen.hide();
            if (e.isTError) {
                console.log("showErr: run");
                showErrorPos($("#errorPos"),e);
                displayMode("compile_error");
            }else{
                Tonyu.onRuntimeError(e);
            }
        });            
    };
    return TJSBuilder;
});