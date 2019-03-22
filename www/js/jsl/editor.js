/*global requirejs*/
define(function (require) {
    var Util=require("Util");
    var FS=require("FS");
    var FileList=require("FileList");
    var FileMenu=require("FileMenu");
    var showErrorPos=require("showErrorPos");
    var fixIndent=require("fixIndent");
    var sh=require("Shell");
    var KeyEventChecker=require("KeyEventChecker");
    var UIDiag=require("UIDiag");
    var WebSite=require("WebSite");
    var EC=require("exceptionCatcher");
    var Columns=require("Columns");
    var A=require("assert");
    var Menu=require("Menu");
    var DU=require("DeferredUtil");
    var Sync=require("Sync");
    var RunDialog2=require("RunDialog2");
    var logToServer2=require("logToServer2");
    var SplashScreen=require("SplashScreen");
    var Auth=require("Auth");
    var DistributeDialog=require("DistributeDialog");
    var NotificationDialog=require("NotificationDialog");
    var IframeDialog=require("IframeDialog");
    var AssignmentDialog=require("AssignmentDialog");
    var SubmitDialog=require("SubmitDialog");
    var CommentDialog2=require("CommentDialog2");
    var NPD=require("NewProjectDialog");
    var ProgramFileUploader=require("ProgramFileUploader");
    var AssetDialog=require("AssetDialog");
    var root=require("root");
    var ErrorDialog=require("ErrorDialog");
    var BAProject=require("BAProject");
    var UA=require("UserAgent");
    if (location.href.match(/localhost/)) {
        console.log("assertion mode strict");
        A.setMode(A.MODE_STRICT);
    } else {
        console.log("assertion mode defensive");
        A.setMode(A.MODE_DEFENSIVE);
    }
    var P=FS.PathUtil;
    var dir=Util.getQueryString("dir");
    if (!dir) {
        alert("dir is not specified");
        location.href="index.html";
        return;
    }
    var curProjectDir=FS.get(dir);
    var curPrj=BAProject(curProjectDir);
    /*
    getEXT
    getOptions
    getPublishedURL
    getName
    sourceFiles
    dir(field)-> it should be getDir
    method called from Builders, CommentDialog2, SubmitDialog,AssignmentDialog
    */
    var ALWAYS_UPLOAD=(localStorage.ALWAYS_UPLOAD==="true");
    console.log("ALWAYS_UPLOAD",ALWAYS_UPLOAD);
    if (root.BitArrow) root.BitArrow.curProjectDir=curProjectDir.path();
    var langList={
        "js":"JavaScript",
        "c":"C",
        "dtl":"Dolittle",
        "tonyu":"Tonyu",
        "dncl":"DNCL",
        "py":"Python",
    };
    var helpURL;
    var unsaved=false;
    var unsynced=false;
    //var Builder;
    var builder;
    var ram;
    //var scoremsg;
    function showToast(msg){
    	$("#toastArea").html(msg);
    	setTimeout(function(){
    		$("#toastArea").text("");
    	},5000);
    }
    function sync() {
    	unsaved=false;
        return Sync.sync(curProjectDir, curProjectDir,{v:true}).then(function(r){
            console.log("SYNCTHEN",r);
            unsynced=false;
            showToast("保存しました。");
        }).fail(function (e) {
            if (!e) e="Unknown error";
            logToServer2("","","","SYNC ERROR!",
            (e.stack || e.responseText || e));
            console.log(e);
            alert("保存に失敗しました。");
        });
    }
    function firstSync() {
        return Auth.check().then(sync).then(function () {
            if (!curProjectDir.exists() || !curProjectDir.rel("options.json").exists()) {
                var lang=Util.getQueryString("lang");
                if (!lang) {
                    alert("フォルダ"+dir+" は存在しません．");
                    location.href="index.html";
                    return;
                }
                NPD.create(curProjectDir.up(),{name:curProjectDir.name(),lang:lang});
            }
        });
    }
    DU.setE(function(e) {
        e=e.responseText||e;
        console.error("Err",e);
        alert(e);
    });
    $.when(DU.documentReady(),firstSync(), DU.requirejs(["ace"])).
    then(ready).fail(function (e) {
        alert("エラー"+e);
        console.log(e.stack);
        SplashScreen.hide();
    });

function ready() {
    var F=EC.f;
    var JS_NOP="javascriptCOLON;".replace(/COLON/,":");
    root.$LASTPOS=0;
    //Tonyu.globals.$currentProject=curPrj;
    //Tonyu.currentProject=curPrj;
    var EXT=curPrj.getEXT();
    var HEXT=".html";
    var opt=curPrj.getOptions();
    var lang=opt.language || "js";
    switch (lang){
    case "c":
        requirejs(["CBuilder"],function(_){
            setupBuilder(_);
        });
        helpURL="http://bitarrow.eplang.jp/index.php?c_use";
    	break;
    case "js":
    	requirejs(["TJSBuilder"],function(_){
            setupBuilder(_);
    	});
    	helpURL="http://bitarrow.eplang.jp/index.php?javascript";
    	break;
    case "dtl":
    	requirejs(["DtlBuilder"],function(_){
            setupBuilder(_);
    	});
    	helpURL="http://bitarrow.eplang.jp/index.php?dolittle_use";
    	break;
    case "dncl":
    	requirejs(["DnclBuilder"],setupBuilder);
    	helpURL="http://bitarrow.eplang.jp/index.php?dncl_use";
    	break;
    case "py":
    	requirejs(["PythonBuilder"],setupBuilder);
        ALWAYS_UPLOAD=UA.isIE; 
    	//helpURL="http://bitarrow.eplang.jp/index.php?dncl_use";
    	break;
    case "tonyu":
        ALWAYS_UPLOAD=true;
        requirejs(["TonyuBuilder"],setupBuilder);
        break;
    }
    function setupBuilder(BuilderClass) {
        $("#fullScr").attr("href",JS_NOP).text("別ページで表示");
        ram=FS.get("/ram/build/");
        FS.mount(ram.path(),"ram");
        builder=new BuilderClass(curPrj, ram);
        window.BABuilder=builder;
        builderReady();
    }
    function builderReady() {
        window.curPrj=curPrj;
        if (builder.addMenu) builder.addMenu(Menu);
        autoexec();
        autologexec();
        autosubexec();
    }
    function autoexec() {
        var autoexec=Util.getQueryString("autoexec",null);
        console.log("AE",autoexec);
        if (autoexec) {
            fl.select(curProjectDir.rel(autoexec));
            run();
        }
    }
    function autologexec() {
        var id=Util.getQueryString("autologexec",null);
        if (id) {
            $.ajax(WebSite.controller+"?AddErrorInfo/getLog&logid="+id).then(function (r) {
                var raw=JSON.parse(r.raw);
                var name="AutoExec";
                var f=curProjectDir.rel(name+EXT);
                var pf;
                console.log("ale",r,f.path());
                if (!f.exists()) {
                   FM.on.createContent(f);
                }
                var extmap={
                    c:".c",javascript:".tonyu",dolittle:".dtl",dtl:".dtl",
                    dncl:".dncl",
                    html:".html",
                };
                for (var k in raw.code) {
                    f=curProjectDir.rel(name+extmap[k.toLowerCase()]);
                    if(k.toLowerCase()!="html") pf=f;
                    console.log("ale-edt",k,f.path(),f.exists());
                    if (f.exists()) {
                        fl.select(f);
                        getCurrentEditorInfo().editor.getSession().getDocument().setValue(raw.code[k]);
                    }
                }
                fl.select(pf);
                run();
           }).catch (function (e) {console.error(e);});
        }
    }
    function autosubexec() {
        var id=Util.getQueryString("autosubexec",null);
        if (id) {
            $.ajax(WebSite.controller+"?Mark/getSubmission&id="+id).then(function (r) {
               r=typeof r==="object" ? r: JSON.parse(r);
               var files=r.files;
               var file;
               for (var k in files) {file=files[k];}
               fl.select(curProjectDir.rel("Test.c"));
               getCurrentEditorInfo().editor.getSession().getDocument().setValue(file);
               run();
           }).catch(function (e) {
               console.error(e);
           });
        }
    }
    function makeUI(){
        Columns.make(
            ["div",{id:"fileViewer","class":"col-xs-2"},
                ["div",{id:"fileItemList"}]
            ],
            ["div",{id:"mainArea","class":"col-xs-10"},
                ["div",{id:"errorPos"}],
                ["div",{id:"tabTop"},
                     ["button",{
                         "class":"selTab","data-ext":HEXT,css:{display:lang=="js"?"inline":"none"}
                     },"HTML"],
                     ["button",{
                         "class":"selTab","data-ext":EXT
                     },langList[lang]],
                     ["span",{id:"curFileLabel"}],
                     ["span",{id:"modLabel"}],
                     ["span",{id:"commentLink"}],
                     ["a",{id:"fullScr",href:JS_NOP}],
                     ["span",{id:"toastArea"}]
                  ],
                  ["div",{id:"progs"}]
              ]
        );
    }
    makeUI();
    function makeMenu() {
        Menu.make({label:"Bit Arrow",id:"home",sub:
                [
                  {label:"ファイル",id:"fileMenu",sub:[
                      {label:"新規",id:"newFile"},
                      {label:"名前変更",id:"mvFile"},
                      {label:"コピー",id:"cpFile"},
                      {label:"素材管理",id:"upFile",action:upFile},
                      //{label:"閉じる",id:"closeFile"},
                      {label:"削除", id:"rmFile"}
                  ]},
                  {label:"実行",id:"runMenu",action:run},
                  {label:"保存",id:"save"},
                  {label:"設定",id:"config",sub:[
                      {label:"エディタの文字の大きさ",id:"textsize",action:textSize}
                  ]}
              ]}
        );
        $.ajax(".?Class/getOptions").then(function (r) {
            if (r.useAssignment==="yes") {
                Menu.appendMain({after:"#save",label:"提出",id:"submit",action:submit});
            }
        });
        showDistMenu();
        Menu.appendMain({label:"使用方法",id:"openHelp"});
    }
    var assetDialog;
    function upFile() {
        assetDialog=assetDialog||AssetDialog();
        assetDialog.show();
    }
    var commentDialog=new CommentDialog2(curPrj);
    var submitDialog;
    function submit() {
        if (!submitDialog) submitDialog=new SubmitDialog(curPrj);
        var inf=getCurrentEditorInfo();
        if (!inf || !inf.file) return alert("提出するファイルを開いてください");
        submitDialog.show(inf.file);
    }
    function showDistMenu(){
        if(Auth.teacher){
            Menu.appendMain(
                {label:"教員",id:"distribute",sub:[
                    {label:"ファイルを配布",id:"distributeFile",action:distributeFile}
                ]}
            );
            $.ajax(".?Class/getOptions").then(function (r) {
                if (r.useAssignment==="yes") {
                    Menu.appendSub("distribute",
                        {label:"課題作成",id:"assignment",action:assignment}
                    );
                }
            });
        }else{
        }
    }
    var assignmentDialog=new AssignmentDialog(curPrj);
    function assignment() {
        var inf=getCurrentEditorInfo();
        assignmentDialog.show(inf && inf.file);
    }
    function distributeFile() {
        var curPrjName=curProjectDir.name();
        var inf=getCurrentEditorInfo();
        if (!inf) {
            alert("配布したいファイルを開いてください。");
            return;
        }
        var curFile=getCurrentEditorInfo().file;
        DistributeDialog.show(curFile.text(),function(text,overwrite){
            console.log(text,overwrite);
            $.ajax({
                type:"POST",
                url:WebSite.controller+"?Class/distribute",
                data:{
                    "prj":curPrjName,
                    "file":curFile.name(),
                    "htmlText":fileSet(curFile)[0].text(),
                    "html":fileSet(curFile)[0].name(),
                    "cont":text,
                    "over":overwrite
                }
            }).then(
                function(d){
                    alert(d);
                },
                function(d){
                    alert("配布に失敗しました");
                    console.log(d);
                }
            );
        });

    }
    /*function distributePrj() {
        alert("distributePrj!");
    }*/
    function checkPublishedURL() {
        Auth.publishedURL(curPrj.getName()+"/").then(function (u) {
            if (window.BitArrow) window.BitArrow.publishedURL=u;
        });
    }
    checkPublishedURL();
    makeMenu();

    var screenH;
    function onResize() {
        var h=$(window).height()-$("#navBar").height()-$("#tabTop").height();
        h-=20;
        screenH=h;
        var rw=$("#runArea").width();
        $("#progs pre").css("height",h+"px");
        console.log("canvas size",rw,h);
        $("#fileItemList").height(h);
    }
    onResize();
    var desktopEnv=loadDesktopEnv();
    window.editorTextSize=desktopEnv.editorFontSize||18;
    var editors={};

    KeyEventChecker.down(document,"bs",F(function (e) {
        A.is(e,"Event");
	    var f=$(":focus");
	    var doConfirm=true;
	    if (f.length>0 &&
	        (
	            (f[0].tagName.toLowerCase()=="input" &&
    	        (!f.attr("type") || f.attr("type")=="text")) ||
	            f[0].tagName.toLowerCase()=="textarea"
	        )
	    ) doConfirm=false;
	    if(doConfirm){
            UIDiag.confirm("一つ前のページに戻ります。よろしいですか？").then(function (r) {
                if (r) {
                    history.back();
                }
            });
            e.stopPropagation();
            e.preventDefault();
            return false;
	    }
    }));
    KeyEventChecker.down(document,"ctrl+shift+s",function () {
        sh.window();
    });
    KeyEventChecker.down(document,"F9",F(run));
    KeyEventChecker.down(document,"F2",F(function(){
        stop();
        var progs=getCurrentEditor();
        if(progs) progs.focus();
        //console.log("F2 pressed");
    }));
    KeyEventChecker.down(document,"ctrl+s",F(function (e) {
        A.is(e,"Event");
    	save();
    	e.stopPropagation();
    	e.preventDefault();
    	return false;
    }));
    $(window).resize(F(onResize));
    $("body")[0].spellcheck=false;
    sh.cd(curProjectDir);

    var fl=FileList($("#fileItemList"),{
        topDir: curProjectDir,
        on:{
            select: F(open),
            displayName: dispNameFL
        }
    });
    ProgramFileUploader.accept(fl,{
        ext:EXT, hext:HEXT//Pattern: new RegExp(EXT+"|"+HEXT)
    });
    var FM=FileMenu();
    FM.fileList=fl;
    var sourceFiles={};
    $("#newFile").click(F(function () {
        sourceFiles=curPrj.sourceFiles();
        console.log(sourceFiles);
        FM.create();
    }));
    $("#mvFile").click(F(FM.mv));
    $("#cpFile").click(F(function () {
        var inf=getCurrentEditorInfo();
        if (!inf) {
            alert("コピーしたいファイルを開いてください。");
            return;
        }
        var old=inf.file;
        var oldName=old.truncExt();
        FM.dialogOpt({title:"コピー", name:oldName, action:"cp", onend:function (_new) {
            if (!_new) return;
            var olds=fileSet(old);
            var news=fileSet(_new);
            A(olds.length==news.length,"olds.length==news.length");
            var ci;
            for (var i=0;i<olds.length;i++) {
                if (olds[i].equals(old)) ci=i;
                if (olds[i].exists() && !news[i].exists()) {
                    news[i].copyFrom(olds[i]);
                }
            }
            A.is(ci,Number);
            ls();
            fl.select(news[ci]);
        }});
    }));

    $("#rmFile").click(F(FM.rm));
    $("#closeFile").click(closeCurrentFile);
    function closeCurrentFile() {
        var inf=getCurrentEditorInfo();
        if (!inf) {
            return;
        }
        var f=inf.file;
        var s=fileSet(f);
        s.forEach(function (e) {
            close(e);
        });
    }
    FM.on.close=function (f) {
        var s=fileSet(f);
        var shouldRemove=false;
        s.forEach(function (e) {
            if (!e.exists()) shouldRemove=true;
        });
        s.forEach(function (e) {
            if (shouldRemove && e.exists()) {
                e.rm();
            }
            close(e);
        });
    };
    FM.on.ls=ls;
    FM.on.validateName=fixName;
    FM.on.createContent=function (f) {
        if (f.ext()==EXT || f.ext()==HEXT) {
            fileSet(f).forEach(function (e) {
                if (e.ext()==EXT && !e.exists()) {
                    e.text((lang=="py"?"# ":"// ")+langList[lang]+"\n");
                    if(lang=="js") e.text("// "+langList[lang]+"\n// ここで扱われるJavaScriptは通常のJavaScriptとは異なります。詳しくは使用方法をご覧ください。\n");
                } else if (e.ext()==HEXT  && !e.exists()) {
                    e.text("<html>\n\n</html>");
                } else if (!e.exists()) {
                    e.text("");
                }
            });
        } else if (!f.exists()) {
            f.text("");
        }
    };
    FM.on.displayName=function (f) {
        A.is(f,String);
        var r=dispNameFM(f);
        if (r) {
            return r;
        }
        return f;
    };
    FM.on.rm=function (f) {
        var fs=fileSet(f);
        for (var i=0;i<fs.length;i++) {
            if (fs[i].exists()) {
                fs[i].rm();
                logToServer2(fs[i].path(),"REMOVED","REMOVED","remove","remove",lang);
            }
            close(fs[i]);
        }
        ls();
        return false;
    };
    FM.on.mv=function (old,_new) {
        var olds=fileSet(old);
        var news=fileSet(_new);
        A(olds.length==news.length,"olds.length==news.length");
        var ci;
        for (var i=0;i<olds.length;i++) {
            if (olds[i].equals(old)) ci=i;
            if (olds[i].exists() && !news[i].exists()) {
                news[i].moveFrom(olds[i]);
                try {
                    logToServer2(olds[i].path(),"MOVED","MOVED","rename",
                    olds[i].path()+"->"+news[i].path()  ,lang);
                }catch(e){console.log(e.stack);}
            }
            close(olds[i]);
        }
        A.is(ci,Number);
        ls();
        fl.select(news[ci]);
        return false;
    };
    F(FM.on);
    console.log("listing", curProjectDir.path());
    fl.ls(curProjectDir);
    console.log("listing", curProjectDir.path(),"done");
    function ls(){
        fl.ls(curProjectDir);
    }
    function dispNameFL(name) {
        A.is(name,String);
        //var name=f.name();
        if (P.startsWith(name,".")) return null;
        if (P.isDir(name)) return name;
        //                          Why commented out??
        //  in dtl mode, if A.html is newer than A.dtl, "A" will be bound to "A.html"
        //      but html tab is not shown  -> cannot edit A.dtl, kowareta!!
        if (P.endsWith(name,EXT) /*|| P.endsWith(name,HEXT)*/) return P.truncExt(name);
        return null;
    }
    function dispNameFM(name) {
        A.is(name,String);
        //var name=f.name();
        if (P.startsWith(name,".")) return null;
        if (P.isDir(name)) return name;
        //      this is used for mvdiag, both A.js and A.html shoud be "A"
        if (P.endsWith(name,EXT) || P.endsWith(name,HEXT)) return P.truncExt(name);
        return null;
    }
    function fixName(name, options) {
        A.is(arguments,[String]);
        options=options||{};
        var upcased=false;
        /*if (name.match(/^[a-z]/)) {
            name= name.substring(0,1).toUpperCase()+name.substring(1);
            upcased=true;
        }*/
        if (name.match(/^[A-Za-z_][a-zA-Z0-9_]*$/)) {
            if (sourceFiles[name]) {
                return {ok:false, reason:name+"は存在します"};
            }
            if (upcased) {
                return {ok:true, file: curProjectDir.rel(name+EXT), note: "先頭を大文字("+name+") にして作成します．"};
            }
            return {ok:true, file: curProjectDir.rel(name+EXT)};
        } else {
            return {ok:false, reason:"名前は，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．"};
        }
    }
    function getCurrentEditorInfo() {
        var f=fl.curFile();
        if (!f) return null;
        A.is(f,"SFile");
        return editors[f.path()];//A.is(editors[f.path()],"EditorInfo?");
    }
    function getCurrentEditor() {//->AceEditor?
        var i=getCurrentEditorInfo();
        if (i) return A.is(i.editor,"AceEditor");
        return null;
    }
    function displayMode(mode) {
        // mode == run     compile_error     runtime_error    edit
        var prog=getCurrentEditor();
        switch(mode) {
        case "run":
            if (prog) prog.blur();
            showErrorPos($("#errorPos"));
            break;
        case "compile_error":
            SplashScreen.hide();
            break;
        case "runtime_error":
            SplashScreen.hide();
            break;
        case "edit":
            break;
        }
    }
    function stop() {
        /*if(curth){
            try {
                curth.kill();
            }catch(e) {
                //IE shows error "解放されたスクリプトからコードを実行できません。";
                console.log(e);
            }
            curth=null;
        }*/
        displayMode("edit");
    }
    //var curName,runURL;
    $("#fullScr").click(runFullScr);
    function runFullScr() {
            var inf=getCurrentEditorInfo();
            if (!inf) {
                alert("実行したいファイルを選んでください");
            }
            save();
            sync();
            if (builder && inf) {
                var curFile=inf.file;
                var curFiles=fileSet(curFile);
                var curHTMLFile=curFiles[0];
                var curLogicFile=curFiles[1];

                var pub;
                //var pub=Auth.remotePublics()/*FS.get("/public/")*/.rel(curProjectDir.name());
                SplashScreen.show();
                Auth.publishedDir(curPrj.getName()+"/").then(function (_p) {
                    pub=_p;
                    return builder.build({mainFile:curLogicFile});
                }).then(function () {
                    return builder.upload(pub);
                }).then(function () {
                    console.log("tonyu upl done");
                    SplashScreen.hide();
                    return Auth.publishedURL(curPrj.getName()+"/");
                }).then(function (_u) {
                    var cv=$("<div>");
                    cv.dialog();
                    var runURL=_u+(lang=="tonyu"?"index.html":curHTMLFile.name());
                    cv.append($("<div>").append(
                        $("<a>").attr({target:"runit",href:runURL}).text("別ページで開く")
                    ));
                    cv.append($("<div>").qrcode({width:200,height:200,text:runURL}));
                    if (builder.qrDialog) builder.qrDialog({
                        dialogJQ:cv,
                        editorInfo:getCurrentEditorInfo(),
                        rerun:runFullScr
                    });
                    return sync();
                }).fail(function (e) {
                    //console.log("betupe-ji fail",e);
                    EC.handleException(e);
                    SplashScreen.hide();
                });
            }
    }
    //\run
    function run() {//run!!
        var inf=getCurrentEditorInfo();
        if (!inf) {
            alert("実行したいファイルを開いてください。");
            return;
        }
        var newwnd;
        if (RunDialog2.hasLocalBrowserWindow()) {
            newwnd=window.open("about:blank","LocalBrowserWindow"+Math.random(),"menubar=no,toolbar=no,width=500,height=500");
        }
        var curFile=inf.file;
        var curFiles=fileSet(curFile);
        var curHTMLFile=curFiles[0];
        var curJSFile=curFiles[1];
	    window.sendResult=function(resDetail){
            logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"C Run",resDetail,"C");
        };
        stop();
        save();
        // display=none
        $("[name=runtimeErrorDialog]").parent().css("display","none");
        displayMode("run");
    	    try {
                SplashScreen.show();
    	        $("#fullScr").attr("href",JS_NOP).text("別ページで表示");
                DU.timeout(0).then(function () {
                    var b=builder.build({mainFile:curJSFile});
                    if (ALWAYS_UPLOAD) {
                        return b.then(function () {
                            return Auth.publishedDir(curProjectDir.name());
                        }).then(function (pub) {
                            console.log("Upload comp",pub);
                            return builder.upload(pub);
                        });
                    }
                    return b;
                }).then(function () {
                    logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),langList[lang]+" Run","実行しました",langList[lang]);
                    if (ALWAYS_UPLOAD) {
                        return Auth.publishedURL(curProjectDir.name()).then(function (pub) {
                            var runURL=pub+(lang=="tonyu"?"index.html": curHTMLFile.name());
                            return IframeDialog.show(runURL,{width:600,height:400});
                        });
                    }
                    var indexF=ram.rel(curHTMLFile.name());
                    return RunDialog2.show(indexF,{
                        window:newwnd,
                        height:RunDialog2.geom.height||screenH-50,
                        toEditor:focusToEditor,
                        font:desktopEnv.editorFontSize||18
                    });
                }).fail(function (e) {
                    console.log(e.stack);
                    if (e.isTError) {
                        showErrorPos($("#errorPos"),e);
                        logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),lang.toUpperCase()+" Compile Error",e.src+":"+e.pos+"\n"+e.mesg,langList[lang]);
                    } else {
                        EC.handleException(e);
                    }
                }).always(function () {
                    SplashScreen.hide();
                    return sync();
                });
            }catch(e) {
	            if(e) console.log(e.stack);
                SplashScreen.hide();
            }
    }
    window.moveFromFrame=function (name) {
        A.is(name,String);
        var f=curProjectDir.rel(name);
        if (f.exists()) {
            fl.select(f);
            run();
        }
    };
    //var curth;
    /*window.setupFrame=function (r) {
        A.is(r,Function);
        var inf=getCurrentEditorInfo();
        var ht="";
        var curFile=inf.file;
        var curFiles=fileSet(curFile);
        var curHTMLFile=curFiles[0];
        //var curJSFile=curFiles[1];
        ht=curHTMLFile.text();
        var f=curPrj.getOutputFile();
        var js=f.text();
        curth=r(ht,js, curName);
        SplashScreen.hide();
    };*/
    var alertOnce;
    alertOnce=function (e) {
        alert(e);
        alertOnce=function(){};
    };
    window.onerror=function (a,b,c,d,e) {
        console.log("window.onerror",arguments);
        if (!e) return;
        return EC.handleException(e);
    };
    var errorDialog=new ErrorDialog();
    EC.handleException=function (e) {
        if (e.type==="dialogClosed") {
            console.log(e.stack);
            return;
        }
        errorDialog.show(e);
    };
    function close(rm) { // rm or mv
        var i=editors[rm.path()]; //getCurrentEditorInfo();
        if (i) {
            A.is(i,"EditorInfo");
            i.editor.destroy();
            i.dom.remove();
            delete editors[rm.path()];
            //alert(editors[rm.path()]);
        }
    }
    function fixZSpace(prog) {
        A.is(prog,"AceEditor");
        var prev=prog.getValue();
        var fixed=prev.replace(/　/g,"  ");
        if (fixed!==prev) {
            var cur=prog.getCursorPosition();
            prog.setValue(fixed);
            prog.clearSelection();
            prog.moveCursorTo(cur.row, cur.column);
        }
    }
    function fixEditorIndent(prog) {
        if (lang==="dncl" || lang==="py") return;// bad know-how!
        A.is(prog,"AceEditor");
        var prev=prog.getValue();
        var fixed=fixIndent( prev ).replace(/　/g,"  ");
        if (fixed!==prev) {
            var cur=prog.getCursorPosition();
            prog.setValue(fixed);
            prog.clearSelection();
            prog.moveCursorTo(cur.row, cur.column);
        }
    }
    /*function reloadFromFiles() {
        for (var path in editors) {
            var inf=editors[path];
            var curFile=inf.file; //fl.curFile();
            var prog=inf.editor; //getCurrentEditor();
            if (curFile.exists() && prog) {
                prog.setValue(curFile.text());
                prog.clearSelection();
            }
        }
    }*/
    function save() {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        var curFile=inf.file; //fl.curFile();
        var prog=inf.editor; //getCurrentEditor();
        if (curFile && prog && !curFile.isReadOnly()) {
            if (curFile.ext()==EXT) fixEditorIndent(prog);
            else fixZSpace(prog);
            var old=curFile.text();
            var nw=prog.getValue();
            if (old!=nw) {
                curFile.text(nw);
                logToServer2(curFile.path(),curFile.text(),/*curHTMLFile.text()*/"HTML","Save","保存しました",langList[lang]);
            }
        }
        fl.setModified(false);
    }
    function watchModified() {
        try {
            var inf=getCurrentEditorInfo();
            if (!inf) return;
            var curFile=inf.file; //fl.curFile();
        	var prog=inf.editor;//getCurrentEditor();
        	var mod=(curFile.exists()?curFile.text():"")!=prog.getValue();
        	fl.setModified(mod);
    	    $("#modLabel").text(mod?"(変更あり)":"");
    	    if(mod){
    	        unsaved=true;
    	        unsynced=true;
    	    }else{
    	        unsaved=false;
    	    }
        }catch(e) {
            console.log(e);
        }
    }
    function fileSet(c) {
        A.is(c,"SFile");
        var n=c.truncExt();
        return [c.up().rel(n+HEXT), c.up().rel(n+EXT)];
    }
    $(".selTab").click(function () {
        var ext=A.is($(this).attr("data-ext"),String);
        var c=fl.curFile();
        if (!c) {
            alert("まず、メニューの「ファイル」→「新規」でファイルを作るか、左のファイル一覧からファイルを選んでください。");
            return;
        }
        var n=c.truncExt();
        var f=c.up().rel(n+ext);
        if (!f.exists()) {
            FM.on.createContent(f);
        }
        fl.select(f);
    });
    setInterval(watchModified,1000);
    var curDOM;
    function open(f) {
	// do not call directly !!  it doesnt change fl.curFile. use fl.select instead
        A.is(f,"SFile");
        if (!window.ace) {
            alert("しばらくしてからもう一度開いてください");
            return true;
        }
        if (f.isDir()) {
            return;
        }
        save();
        if (curDOM) curDOM.hide();
        var inf=editors[f.path()];
        $(".selTab").removeClass("selected");
        $(".selTab[data-ext='"+f.ext()+"']").addClass("selected");
        if (!inf) {
            var progDOM=$("<pre>").css("height", screenH+"px").text(f.text()).appendTo("#progs");
            progDOM.attr("data-file",f.name());
            var prog=root.ace.edit(progDOM[0]);
            if (typeof desktopEnv.editorFontSize=="number") prog.setFontSize(desktopEnv.editorFontSize);
    	    else prog.setFontSize(18);
            //prog.setFontSize(20);
            prog.setTheme("ace/theme/eclipse");
            //defaultKeyboard=prog.getKeyboardHandler();
            //if(desktopEnv.editorMode=="emacs") prog.setKeyboardHandler("ace/keyboard/emacs");
            //prog.setKeyboardHandler(defaultKeyboard);
            if (f.ext()==EXT && lang=="c") {
                prog.getSession().setMode("ace/mode/c_cpp");
            }
            else if (f.ext()==EXT) {
                prog.getSession().setMode("ace/mode/tonyu");
            }
            if (f.ext()==HEXT) {
                prog.getSession().setMode("ace/mode/html");
            }
            prog.getSession().setUseWrapMode(true);
            editors[f.path()]={file:f , editor: prog, dom:progDOM};
            progDOM.click(F(function () {
                displayMode("edit");
            }));
            prog.setReadOnly(false);
            prog.clearSelection();
            prog.focus();
            curDOM=progDOM;
        } else {
            inf.dom.show();
            inf.editor.focus();
            curDOM=inf.dom;
            //if(desktopEnv.editorMode=="emacs") inf.editor.setKeyboardHandler("ace/keyboard/emacs");
            //else inf.editor.setKeyboardHandler(defaultKeyboard);
        }
        commentDialog.getComment(f).then(function (c) {
            $("#commentLink").empty();
            console.log(c);
            if (c) {
                $("#commentLink").append("&nbsp;").append(
                    $("<a>").text("採点結果").click(function () {
                        commentDialog.show(c);
                    })).append("&nbsp;");
            }
        }).catch(DU.E);
        $("#curFileLabel").text(f.truncExt());
    }
    root.d=function () {
        root.Tonyu.currentProject.dumpJS.apply(this,arguments);
    };
    function loadDesktopEnv() {
        var d=curProjectDir.rel(".desktop");
        var res;
        if (d.exists()) {
            res=d.obj();
        } else {
            res={};
        }
        if (!res.runMenuOrd) res.runMenuOrd=[];
        desktopEnv=res;
        return res;
    }
    function saveDesktopEnv() {
        var d=curProjectDir.rel(".desktop");
        d.obj(desktopEnv);
    }
    if (root.progBar) {root.progBar.clear();}
    function textSize() {
        var prog=getCurrentEditor();
        var s=prompt("エディタの文字の大きさ", desktopEnv.editorFontSize||18);
        if(s==null) return;
        desktopEnv.editorFontSize=parseInt(s);
        if (prog) prog.setFontSize(desktopEnv.editorFontSize||18);
        saveDesktopEnv();
        window.editorTextSize=desktopEnv.editorFontSize||18;
    }
    /*function editorType() {
        var prog=getCurrentEditor();
        if(prog.getKeyboardHandler()==defaultKeyboard){
            prog.setKeyboardHandler("ace/keyboard/emacs");
            desktopEnv.editorMode="emacs";
        }else{
            prog.setKeyboardHandler(defaultKeyboard);
            desktopEnv.editorMode="ace-default";
        }
        saveDesktopEnv();
        focusToEditor();
    }*/
    $("#home").click(F(function () {
        save();
        goHome();
    }));
    //$("#runMenu").click(F(run));
    function goHome(){
        console.log("goHome");
        unsynced=false;
        location.href="index.html";
    }
    $("#openHelp").click(function(){
        window.open(helpURL,"helpTab");
    });
    sh.curFile=function () {
        return fl.curFile();
    };
    $(window).on("beforeunload",function(e){
        e=e||{};
        if(unsynced || unsaved){
            return "保存されていないデータがあります。\nこれまでの作業を保存するためには一度実行してください。";
        }
    });
    $("#save").click(F(function () {
        save();
        sync();
    }));
    FM.onMenuStart=save;
    function focusToEditor(){
        var prog=getCurrentEditor();
        if(prog) prog.focus();
    }
    window.getCurrentEditorInfo=getCurrentEditorInfo;
    SplashScreen.hide();
    window.NotificationDialog=NotificationDialog;
}// of ready
});
