define(["FS","Util","WebSite","plugins","Shell","Tonyu","Sync","ResEditor","BuilderClient","ProjectFactory","sysMod","root","exceptionCatcher"],
        function (FS,Util,WebSite,plugins,sh,Tonyu,Sync,ResEditor,BuilderClient,F,sysMod,root,EC) {
    const langMod=BuilderClient.langMod;
    const runtimeDir=FS.get(WebSite.runtime);
    const tonyuLibDir=runtimeDir.rel("lib/tonyu/");

    const kernelURL=tonyuLibDir.rel("kernel.js").path();
    root.onTonyuDebuggerReady=d=>{
        d.on("runtimeError",e=> {
            console.log("runtimeError",e);
            EC.handleException(e);
            d.stop();
        });
    };
    F.addDependencyResolver((prj, spec)=> {
        if (spec.namespace==="kernel") {
            return F.create("compiled",{
                namespace:spec.namespace,
                url:kernelURL });
        }
    });
    var MkRun=function (prj, dst) {
        Tonyu.defaultOptions={
            "compiler":{
                "namespace":"user",
                "outputFile":"js/concat.js",
                "defaultSuperClass":"kernel.Actor",
                "dependingProjects":[{"namespace":"kernel"}]
            },
            "language":"tonyu",
            "run":{
                "mainClass":"user.Main",
                "bootClass":"kernel.Boot"
            }
        };
        const ns2depspec= {
            kernel: {namespace:"kernel", url: kernelURL}
        };
        this.prj=prj;// BitArrow-based
        this.dst=dst;// SFile in ramdisk
        const builder=new BuilderClient(prj ,{
            worker: {ns2depspec, url: "BuilderWorker.js"/*WORKER_URL*/}
        });
        this.builderClient=builder;
        this.convertPath=p=>builder.convertFromWorkerPath(p);
        prj.include(langMod).include(sysMod);
        Tonyu.globals.$currentProject=this.prj;
        Tonyu.currentProject=this.prj;
        //prj.getPublishedURL()
    };
    var p=MkRun.prototype;
    p.build=async function (options) {
        if (options.fullScr) return await p.mkrun(options);
        const c=this.builderClient;
        await c.clean();
        const opt=this.prj.getOptions();
        //const main=opt.run.mainClass;
        this.removeThumbnail();
        const aliases=this.genUrlAliases();
        this.dst.rel("index.html").text(this.debugHTML(this.prj.getDir().path(),aliases));
    };
    p.removeThumbnail=function () {
        const prj=this.prj;
        const resc=prj.getResource();
        if (resc.images) {
            const cnt=resc.images.length;
            resc.images=resc.images.filter(item=>item.name!=="$icon_thumbnail");
            if (resc.images.length<cnt) prj.setResource(resc);
        }
    };
    p.genUrlAliases=function () {
        const prj=this.prj;
        const resc=prj.getResource();
        const res={};
        const publishedURL=root.BitArrow.publishedURL;
        gen(resc.images);
        gen(resc.sounds);
        return res;
        function gen(items) {
            for (let item of items) {
                res[item.url]=publishedURL+item.url;
            }
        }
    };
    p.mkrun=function(options) {
        FS.mount(location.protocol+"//"+location.host+"/", "web");
        var prj=this.prj;
        var dest=this.dst;
        options=options||{};
        var prjDir=prj.getDir();
        var resc=prj.getResource();
        var opt=prj.getOptions();
        console.log("TB.OPT",opt);
        var loadFilesBuf="function loadFiles(dir){\n";
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
        Menu.appendSub("tool",
            {label:"音声リスト",id:"soundList",action:this.showSoundList.bind(this)},
        );
    };
    p.showImageList=function () {
        var t=this;
        t.prj.getPublishedURL().then(function (r) {
            t.prj._publishedURL=r;
            ResEditor(t.prj,"image");
        }).catch(console.error.bind(console));
    };
    p.showSoundList=function () {
        var t=this;
        t.prj.getPublishedURL().then(function (r) {
            t.prj._publishedURL=r;
            ResEditor(t.prj,"sound");
        }).catch(console.error.bind(console));
    };
    p.debugHTML=(prj,aliases)=>{
        return `<!DOCTYPE html>
<html>
<head>
<script>
WebSite_runType="manual";
WebSite=parent.WebSite;
WebSite.serverType="BA";
WebSite.surpressCreateThumbnail=true;
WebSite.doResize=true;
WebSite.urlAliases= {
        "images/base.png":WebSite.runtime+"images/base.png",
        "images/Sample.png":WebSite.runtime+"images/Sample.png",
        "images/neko.png":WebSite.runtime+"images/neko.png",
        "images/mapchip.png":WebSite.runtime+"images/mapchip.png",
        "images/sound.png":WebSite.runtime+"images/sound.png",
        "images/sound_ogg.png":WebSite.runtime+"images/sound_ogg.png",
        "images/sound_mp3.png":WebSite.runtime+"images/sound_mp3.png",
        "images/sound_mp4.png":WebSite.runtime+"images/sound_mp4.png",
        "images/sound_m4a.png":WebSite.runtime+"images/sound_m4a.png",
        "images/sound_mid.png":WebSite.runtime+"images/sound_mid.png",
        "images/sound_wav.png":WebSite.runtime+"images/sound_wav.png",
        "images/ecl.png":WebSite.runtime+"images/ecl.png",

};
WebSite.pluginTop=WebSite.runtime+"lib/tonyu/plugins";
Object.assign(WebSite.urlAliases,${JSON.stringify(aliases)});
Tonyu_StartProject='${prj}';
</script>
<script src="js/lib/jquery-1.12.1.js" type="text/javascript"></script>
<script src="js/lib/require.js"></script>
<script src="js/reqConf.js"></script>
<script>
    requirejs.config(reqConf);
    requirejs(["SysDebugger_concat"],function () {});
</script></head>
<body><div id='splash' style='position:relative; height: 100%;'><div class='progress'></div></div></body>
</html>
`;
    };
    return MkRun;
});
