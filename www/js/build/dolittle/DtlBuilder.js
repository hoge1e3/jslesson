define(["assert","DeferredUtil","wget", "dolittle/minimal","IndentBuffer"], 
function (A,DU,wget,dtlParser,IndentBuffer) {
    DtlBuilder=function (prj, dst) {
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
    var libs=["jquery-1.12.1","require"].map(function (n) {return "lib/"+n+".js";});
    var dtlibs=["lib","polyk","Vec2","Actor","Group","UI","Turtle","Figure","DOM","Japanese"].map(
        function (n) {return "lib/dtl/"+n+".js";});
    var p=DtlBuilder.prototype;
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
        //var curHTMLFile=d.rel(name+".html");
        var dp=new DOMParser;
        var dom=dp.parseFromString(f.src.html.text(),"text/html");
        var html=dom.getElementsByTagName("html")[0];
        var head=dom.getElementsByTagName("head")[0];
        libs.concat(dtlibs).concat([f.name+".js"]).forEach(function (src) {
            var nn=document.createElement("script");
            nn.setAttribute("charset","utf-8");
            nn.setAttribute("src",src);
            head.appendChild(nn);
        });
        /*var nn=document.createElement("script");
        nn.setAttribute("charset","utf-8");
        var ns=this.prj.getNamespace();
        nn.appendChild(document.createTextNode("run('"+ns+"."+name+"');"));
        head.appendChild(nn);*/
        //var dstHTMLF=dst.rel(curHTMLFile.name());
        return f.dst.html.text("<html>"+html.innerHTML+"</html>");
        
    };
    function isNewer(a,b) {
        if (!a.exists()) return false;
        return a.lastUpdate()>b.lastUpdate();
    }   
    p.build=function () {
        var curPrj=this.prj;
        var dst=this.dst;
        var t=this;
        var files=[];
        curPrj.dir.each(function (f) {
            if (f.ext()!=".html")  return;
            var name=f.truncExt();
            var html=f;
            var dtl=f.up().rel(name+".dtl");
            if (!dtl.exists()) return;
            files.push({name:name,
            src:{html:html,dtl:dtl},
            dst:{
                html:dst.rel(html.name()),
                js:dst.rel(name+".js"),
                map: dst.rel(name+".js.map")
            }});
        });
        return this.dlFiles().then(DU.tr(function () {
            return DU.each(files,function (f) {
                if (isNewer(f.dst.js, f.src.dtl)) return;
                var buf=IndentBuffer({dstFile:f.dst.js,mapFile:f.dst.map});
                buf.setSrcFile(f.src.dtl);
                var js=dtlParser.parse(f.src.dtl.text(),{indentBuffer:buf,src:f.src.dtl.name()});
                return buf.close();
                //console.log(buf.srcmap.toString());
                //return f.dst.js.text(js);
            });
        })).then(DU.tr(function() {
             return DU.each(files,function (f) {
                if (isNewer(f.dst.html, f.src.html)) return;
                return t.genHTML(f);
            });
        }));         
    };
    return DtlBuilder;
});