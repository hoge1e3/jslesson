define(["FS","Util","WebSite","plugins","Shell","Tonyu","Sync","ResEditor"],
        function (FS,Util,WebSite,plugins,sh,Tonyu,Sync,ResEditor) {
    var MkRun=function (prj, dst) {
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
    };
    var p=MkRun.prototype;
    p.build=function (options) {
        FS.mount(location.protocol+"//"+location.host+"/", "web");
        var prj=this.prj;
        var dest=this.dst;
        options=options||{};
        var prjDir=prj.getDir();
        var resc=prj.getResource();
        var opt=prj.getOptions();
        console.log("TB.OPT",opt);
        var loadFilesBuf="function loadFiles(dir){\n";
        var runtimeDir=FS.get(WebSite.runtime);
        var tonyuLibDir=runtimeDir.rel("lib/tonyu/");
        if (options.copySrc) copySrc();
        return prj.loadClasses().then(function() {
            return $.when(
                //convertLSURL(resc.images),
                //convertLSURL(resc.sounds),
                genFilesJS(),
                copyScripts(),
                copyPlugins(),
                copyLibs(),
                //copyResources("images/"),
                //copyResources("sounds/"),
                copyIndexHtml(),
                genReadme()
            );
        });

        function genReadme() {
            dest.rel("Readme.txt").text(
                    "このフォルダは、Webサーバにアップロードしないと正常に動作しない可能性があります。\n"+
                    "詳しくは\nhttp://hoge1e3.sakura.ne.jp/tonyu/tonyu2/runtime.html\nを御覧ください。\n"
            );
        }
        function copyResources(dir) {
            var src=prjDir.rel(dir);
            if (src.exists()) src.copyTo(dest.rel(dir));
        }
        function genFilesJS(){
            addFileToLoadFiles("res.json",resc);
            addFileToLoadFiles("options.json",opt);
            var mapd=prjDir.rel("maps/");
            if (mapd.exists()) {
                mapd.recursive(function (mf) {
                    addFileToLoadFiles( mf.relPath(prjDir), mf.obj());
                });
            }
            dest.rel("js/files.js").text(loadFilesBuf+"}");
        }
        function copyIndexHtml() {
            //  runtime\lib\tonyu\index.html
            return tonyuLibDir.rel("index.html").copyTo(dest);
        }
        function copyScripts() {
            var usrjs=prjDir.rel("js/concat.js");
            var usrjsmap=prjDir.rel("js/concat.js.map");
            var kerjs=tonyuLibDir.rel("kernel.js");
            //var runScr2=tonyuLibDir.rel("gen/runScript2_concat.js");
            return $.when(
                usrjs.copyTo(dest.rel("js/concat.js")),
                usrjsmap.copyTo(dest.rel("js/concat.js.map"))
                //kerjs.copyTo(dest.rel("js/kernel.js"))//,
                //runScr2.copyTo(dest.rel("js/runScript2_concat.js"))
            );
        }
        function copyPlugins() {
            var pluginDir=tonyuLibDir.rel("plugins/");
            if (!opt.plugins) return;
            // TODO opt.plugins is now hash, but array is preferrable....
            var args=[];
            for (var n in opt.plugins) {
                // TODO if src not found, do not copy and use src directory(maybe http://....)
                var pf=pluginDir.rel(plugins.installed[n].src);
                args.push( pf.copyTo(dest.rel("js/plugins/")) );
            }
            return $.when.apply($,args);
        }
        function copyLibs() {
            /*return $.when(
                    runtimeDir.rel("lib/jquery-1.12.1.js").copyTo(dest.rel("js/lib/")),
                    runtimeDir.rel("lib/require.js").copyTo(dest.rel("js/lib/"))
            );*/
        }
        function addFileToLoadFiles(name, data) {
            loadFilesBuf+="\tdir.rel('"+name+"').obj("+JSON.stringify(data)+");\n";
        }
        function convertLSURL(r) {
            for (var k in r) {
                var url=r[k].url;
                if (Util.startsWith(url,"ls:")) {
                    var rel=url.substring("ls:".length);
                    r[k].url=rel;
                }
            }
        }
        /*function copySampleImages() {
            var urlAliases= {
                "images/Ball.png":1,
                "images/base.png":1,
                "images/Sample.png":"../../images/Sample.png",
                "images/neko.png":"../../images/neko.png",
                "images/inputPad.png":"../../images/inputPad.png",
                "images/mapchip.png":"../../images/mapchip.png",
                "images/sound.png":"../../images/sound.png",
                    "images/ecl.png":"../../images/ecl.png"
            };
            var args=[];
            for (var k in resc.images) {
                var u= resc.images[k].url;
                if (urlAliases[u] && !prjDir.rel(u).exists()) {
                    var imgf=wwwDir.rel(u);
                    if (imgf.exists()) {
                        args.push( imgf.copyTo(dest.rel(u)) );
                    } else {
                        sh.echo(imgf+" not exists!");
                    }
                }
            }
            return $.when.apply($,args);
        }*/
        function copySrc() {
            prjDir.copyTo(dest.rel("src/"));
        }
    };
    p.upload=function (pub) {
        return Sync.sync(this.dst,pub,{excludes:["images/","sounds/"]});
    };
    p.addMenu=function (Menu) {
        Menu.appendSub(
            {label:"ツール",id:"tool",after:$("#config")},
            {label:"画像リスト",id:"imageList",action:this.showImageList.bind(this)}
        );
    };
    p.showImageList=function () {
        ResEditor(this.prj,"image");
    };

    return MkRun;
});
