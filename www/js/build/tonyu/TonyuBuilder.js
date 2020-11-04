/*global requirejs*/
define(["FS","Util","WebSite","plugins","Shell","Tonyu","Sync","ResEditors","BuilderClient","ProjectFactory","sysMod","root","exceptionCatcher"],
        function (FS,Util,WebSite,plugins,sh,Tonyu,Sync,ResEditors,BuilderClient,F,sysMod,root,EC) {
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
    var MkRun=function (prj, dst, ide) {
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
                "bootClass":"kernel.Boot",
                globals:{
                    $defaultFPS:60,
                    $imageSmoothingDisabled:true,
                    $soundLoadAndDecode:false
                }
            },
            "plugins":{}
        };
        const ns2depspec= {
            kernel: {namespace:"kernel", url: kernelURL}
        };
        this.ide=ide;
        this.prj=prj;// BitArrow-based
        const opt=prj.getOptions();
        if (!opt.compiler || !opt.compiler.namespace) {
            prj.setOptions(Tonyu.defaultOptions);
        }
        this.dst=dst;// SFile in ramdisk
        const workerURL=(root.reqConf.baseUrl.match(/es5/)?
        	"BuilderWorker.es5.js":"BuilderWorker.js");
        const builder=new BuilderClient(prj ,{
            worker: {ns2depspec, url: workerURL},locale:"ja",
        });
        this.builderClient=builder;
        this.convertPath=p=>builder.convertFromWorkerPath(p);
        prj.include(langMod).include(sysMod);
        Tonyu.globals.$currentProject=this.prj;
        Tonyu.currentProject=this.prj;
        if (!prj.getResourceFile().exists()) {
            prj.setResource({
	            images:[
    	            {name:"$pat_base", url: "${runtime}images/base.png", pwidth:32, pheight:32},
    	            {name:"$pat_sample", url: "${runtime}images/Sample.png"},
    	            {name:"$pat_neko", url: "${runtime}images/neko.png", pwidth:32, pheight:32},
    	            {name:"$pat_mapchip", url: "${runtime}images/mapchip.png", pwidth:32, pheight:32}
    	        ],
	            sounds:[]
            });
        }
        this.resEditors=new ResEditors(this.prj);
        this.prj.getPublishedURL().then(function (r) {
            WebSite.pubURLOfPrj=r;
        });
        ide.on("rename",evt=>this.refreshRunMenu());
        ide.on("createContent",evt=>this.refreshRunMenu());
        //prj.getPublishedURL() // why delete?
    };
    var p=MkRun.prototype;
    p.build=async function (options) {
        const c=this.builderClient;
        await c.clean();
        if (options.upload) {
            await this.mkrun(options);
            const pubd=options.publishedDir;
            const pubu=options.publishedURL.replace(/\/$/,"")+"/index.html";
            console.log("Tonyu upload",this.dst,pubd, pubu);
            const r=await Sync.sync(this.dst,pubd,{excludes:["images/","sounds/"]});
            console.log("Tonyu upload syncres",r);
            return {publishedURL:pubu};
        }
        const opt=this.prj.getOptions();
        console.log("OPTOPT",opt, options);
        if (options.mainClass && opt.run && opt.run.mainClass!==options.mainClass) {
            opt.run.mainClass=options.mainClass;
            console.log("OPTSET",opt);
            this.prj.setOptions(opt);
        }
        //const main=opt.run.mainClass;
        this.removeThumbnail();
        const aliases={};//this.genUrlAliases();
        const indexFile=this.dst.rel("index.html");
        indexFile.text(this.debugHTML(this.prj.getDir().path(),aliases));
        return {indexFile};
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
    function when(...procs) {
        procs=procs.map((p,i)=>$.when(p).then(
            r=>{console.log(i,"Succ");return r;},
            r=>{console.log(i,"Fail",r);return r;},
        ));
        return $.when(...procs);
    }
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
            const src=`<!DOCTYPE html>
<html><head>
<title>Tonyu System 2</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script>window.runtimePath="${WebSite.runtime}/";</script>
<script>
WebSite={};
WebSite.urlAliases={};
WebSite.runtime="${WebSite.runtime}";
WebSite_runType="manual";
WebSite.serverType="BA";
WebSite.surpressCreateThumbnail=true;
WebSite.doResize=true;
WebSite.tonyuHome="/Tonyu/";
WebSite.compiledKernel=WebSite.runtime+"lib/tonyu/kernel.js";
WebSite.pluginTop=WebSite.runtime+"lib/tonyu/plugins";
WebSite.pubURLOfPrj="./";
</script>
<script src="${WebSite.runtime}lib/require.js"></script>
<script>
reqConf={
	paths: {

	}
};
</script>
<script src="${WebSite.runtime}lib/jquery-1.12.1.js" type="text/javascript" data-nocat="true"></script>
<script src="js/files.js"></script>
<script src="${WebSite.runtime}lib/tonyu/runScript2_concat.min.js"></script>
</head>
<body></body>
</html>`;
            return dest.rel("index.html").text(src);//tonyuLibDir.rel("index.html").copyTo(dest);
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
    p.upload=async function (pub) {
        // Done in build
    };
    p.addMenu=function (Menu) {
        Menu.appendSub(
            {label:"ツール",id:"tool",after:$("#config")},
            {label:"画像リスト",id:"imageList",action:this.showImageList.bind(this)}
        );
        Menu.appendSub("tool",
            {label:"音声リスト",id:"soundList",action:this.showSoundList.bind(this)},
        );
        Menu.appendSub("tool",
            {label:"マップエディタ",id:"mapEditor",action:this.mapEditor.bind(this)},
        );
        Menu.appendSub("tool",
            {label:"HTML出力",id:"exportHTML",action:this.exportHTML.bind(this)},
        );
        Menu.deleteMain("runMenu");
        Menu.appendMain(
            {label:"実行",id:"runTonyu",after:$("#fileMenu"),sub:[]}
        );
        this.refreshRunMenu();
    };
    p.exportHTML=function () {
        requirejs(["ExportHTMLDialog"],E=>{
            this.exportHTMLDialog=this.exportHTMLDialog||new E(this.prj);
            this.exportHTMLDialog.show({includeJSScript:true});
        });
    };
    p.mapEditor=function () {
        this.ide.run({mainClass:"kernel.MapEditor"});
    };
    p.showImageList=function () {
        var t=this;
        t.prj.getPublishedURL().then(function (r) {
            WebSite.pubURLOfPrj=r;
            //t.prj._publishedURL=r;
            t.resEditors.open("image");
        }).catch(console.error.bind(console));
    };
    p.showSoundList=function () {
        var t=this;
        t.prj.getPublishedURL().then(function (r) {
            WebSite.pubURLOfPrj=r;
            //t.prj._publishedURL=r;
            t.resEditors.open("sound");
        }).catch(console.error.bind(console));
    };
    p.refreshRunMenu=function () {
        const EXT=".tonyu";
        const ide=this.ide;
        const prj=this.prj;
        const curPrjDir=prj.getDir();
        const runMenuOrd=ide.desktopEnv.runMenuOrd || [];
        const NSP_USR=prj.getNamespace();
        curPrjDir.each(function (f) {
            if (f.endsWith(EXT)) {
                var n=f.truncExt(EXT);
                if (runMenuOrd.indexOf(n)<0) {
                    runMenuOrd.push(n);
                }
            }
        });
        let i;
        for (i=runMenuOrd.length-1; i>=0 ; i--) {
            var f=curPrjDir.rel(runMenuOrd[i]+EXT);
            if (!f.exists()) {
                runMenuOrd.splice(i,1);
            }
        }
        $("#submenu_runTonyu").empty();
        i=0;
        runMenuOrd.forEach(n=>{
            var ii=i;
            if (typeof n!="string") {console.log(n); alert("not a string: "+n);}
            //if (ii>=15) return;
            $("#submenu_runTonyu").append(
                $("<li>").append(
                    $("<a>").attr("href","#").text(n+"を実行"+(i==0?"(F9)":"")).click(()=>{
                        if (typeof n!="string") {console.log(n); alert("not a string2: "+n);}
                        ide.run({mainClass:`${NSP_USR}.${n}`, mainFile:curPrjDir.rel(`${n}${EXT}`) });
                        if (ii>0) {
                            runMenuOrd.splice(ii, 1);
                            runMenuOrd.unshift(n);
                            this.refreshRunMenu();
                            ide.saveDesktopEnv();
                        }
                    })
                )
            );
            i++;
        });
        /*$("#runMenu").append(
                $("<li>").append(
                        $("<a>").attr("href","#").text("停止(F2)").click(F(function () {
                            stop();
                        }))));
        $("#runMenu").append(
                $("<li>").append(
                        $("<a>").attr("href","#").text("実行するファイルを選択...").click(F(dialogs.selectMain))
                    ));*/
    };
    /*p.afterCreateContent=function () {
        this.refreshRunMenu();
    };*/
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
        "images/sound_mzo.png":WebSite.runtime+"images/sound_mzo.png",
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
