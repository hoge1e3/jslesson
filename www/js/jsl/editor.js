requirejs(["Util", "Tonyu", "FS", "FileList", "FileMenu",
           "showErrorPos", "fixIndent",  "ProjectCompiler",
           "Shell","Shell2","KeyEventChecker",
           "runtime", "searchDialog","StackTrace",
           "UI","UIDiag","WebSite","exceptionCatcher","Tonyu.TraceTbl",
           "Columns","assert","Menu","TError","DeferredUtil","Sync","RunDialog","RunDialog2",
           "TJSBuilder","LocalBrowser"
          ],
function (Util, Tonyu, FS, FileList, FileMenu,
          showErrorPos, fixIndent, TPRC,
          sh,sh2,  KeyEventChecker,
          rt, searchDialog,StackTrace,
          UI, UIDiag,WebSite,EC,TTB,
          Columns,A,Menu,TError,DU,Sync,RunDialog,RunDialog2,
          TJSBuilder,LocalBrowser
          ) {
$(function () {
    var curClassroom;
    $.get("login.php?curclass="+Math.random()).then(function (r){
        console.log(r);
        curClassroom=r;
    });
    var curUser;
    $.get("login.php?curuser="+Math.random()).then(function (r) {
        console.log(r);
        curUser=r;
    });
    if (typeof SplashScreen!="undefined") SplashScreen.show();
    requirejs(["ace"],function (){
        console.log("ace loaded:",ace);
        if (typeof SplashScreen!="undefined") SplashScreen.hide();
    });
    var F=EC.f;
    $LASTPOS=0;
    var home=FS.resolve("${tonyuHome}");
    var dir=Util.getQueryString("dir");
    if (!dir) {
        alert("dir is not specified");
        return;
    }
    var curProjectDir=FS.get(dir);
    var curPrj=TPRC(curProjectDir);
    Tonyu.globals.$currentProject=curPrj;
    Tonyu.currentProject=curPrj;
    //var EXT=A(curPrj.EXT);
    var EXT=curPrj.getEXT();
    var HEXT=".html";
    var opt=curPrj.getOptions();
    var lang=opt.language || "js";
    var langList={
	"js":"JavaScript",
	"c":"C"
    };
    var unsaved=false;
    var unsynced=false;
    if(lang=="c"){
	requirejs(["cCompiler"],function(){
	    console.log("cCom requirejsed");
	});
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
                         "class":"selTab","data-ext":HEXT
                     },"HTML"],
                     ["button",{
                         "class":"selTab","data-ext":EXT
                     },langList[lang]],
                     ["span",{id:"curFileLabel"}],
                     ["span",{id:"modLabel"}],
                     ["span",{id:"toastArea"}],
                     ["a",{id:"fullScr",href:"javascript:;"}]
                  ],
                  ["div",{id:"progs"}]
              ]/*,
              ["div",{id:"runArea","class":"col-xs-5"},
               ["div","実行結果：",["a",{id:"fullScr",href:"javascript:;"}]],
               ["iframe",{id:"ifrm",width:465,height:465}],
	       ["div",{id:"toastArea"}]
              ]*/
        );
    }
    makeUI();
    function makeMenu() {
        Menu.make("JS Lesson",
                [
                  {label:"Home"/*,href:"index.html"*/,id:"home"},
                  {label:"ファイル",sub:[
                      {label:"新規",id:"newFile"},
                      {label:"名前変更",id:"mvFile"},
                      {label:"コピー",id:"cpFile"},
                      {label:"削除", id:"rmFile"}
                  ]},
                  {label:"実行",id:"runMenu",action:run/*sub:[
                      {label:"実行(F9)",id:"runMenu",action:run},
                      {label:"停止(F2)",id:"stopMenu",action:stop},
                  ]*/},
                  {label:"保存",id:"save"},
                  {label:"設定",sub:[
                      {label:"エディタの文字の大きさ",id:"textsize",action:textSize}
                  ]}
                ]
        );
    }
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
    var runMenuOrd=desktopEnv.runMenuOrd;
    var editors={};

    KeyEventChecker.down(document,"bs",F(function (e) {
	if($(":focus").attr("id")!="inputDialog"){
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
    KeyEventChecker.down(document,"F9",F(run));
    KeyEventChecker.down(document,"F2",F(function(){
        stop();
        if(progs=getCurrentEditor()) progs.focus();
        //console.log("F2 pressed");
    }));
    KeyEventChecker.down(document,"ctrl+s",F(function (e) {
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
            displayName: dispName
        }
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
    FM.on.close=function (f) {
        var s=fileSet(f);
        s.forEach(function (e) {
            if (e.exists()) {
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
                    e.text("// "+langList[lang]+"\n");
                } else if (e.ext()==HEXT  && !e.exists()) {
                    e.text("<html>\n\n</html>");
                } else {
                    e.text("");
                }
            });
        } else {
            f.text("");
        }
    };
    FM.on.displayName=function (f) {
        var r=dispName(f);
        if (r) {
            return r;
        }
        return f.name();
    };
    var refactorUI;
    FM.on.rm=function (f) {
        var fs=fileSet(f);
        for (var i=0;i<fs.length;i++) {
            if (fs[i].exists()) fs[i].rm();
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
            }
            close(olds[i]);
        }
        A.is(ci,Number);
        ls();
        fl.select(news[ci]);
        return false;
    };
    F(FM.on);
    fl.ls(curProjectDir);
    function ls(){
        fl.ls(curProjectDir);
    }
    function dispName(f) {
        var name=f.name();
        if (f.isDir()) return name;
        if (f.endsWith(EXT) /*|| f.endsWith(HEXT)*/) return f.truncExt();
        return null;
    }
    function fixName(name, options) {
        var upcased=false;
        if (name.match(/^[a-z]/)) {
            name= name.substring(0,1).toUpperCase()+name.substring(1);
            upcased=true;
        }
        if (name.match(/^[A-Z_][a-zA-Z0-9_]*$/)) {
            if (sourceFiles[name]) {
                return {ok:false, reason:name+"はシステムで利用されている名前なので使用できません"};
            }
            if (upcased) {
                //name= name.substring(0,1).toUpperCase()+name.substring(1);
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
        return editors[f.path()];
    }
    function getCurrentEditor() {
        var i=getCurrentEditorInfo();
        if (i) return i.editor;
        return null;
    }
    function displayMode(mode, next) {
        // mode == run     compile_error     runtime_error    edit
        var prog=getCurrentEditor();
        switch(mode) {
        case "run":
            if (prog) prog.blur();
            showErrorPos($("#errorPos"));
            break;
        case "compile_error":
            if (typeof SplashScreen!="undefined") SplashScreen.hide();
            break;
        case "runtime_error":
            if (typeof SplashScreen!="undefined") SplashScreen.hide();
            break;
        case "edit":
            //if(progs=getCurrentEditor()) progs.focus();
            break;
        }
    }
    function stop() {
        //curPrj.stop();
        if(curth){
            curth.kill();
        }
        displayMode("edit");
    }
    var curName,runURL;
    function sync() {
        var projects=FS.resolve("${tonyuHome}/Projects/");
	unsaved=false;
	//unsynced=false;
        return Sync.sync(projects, FS.get("/"),{v:true}).then(
            function(){unsynced=false;showToast("保存しました");}
        ).fail(function (e) {
            console.log(e);
            alert("保存に失敗しました。");
        });
    }
    $("#fullScr").click(function () {
        if (runURL) {
            var cv=$("<div>");
            cv.dialog();
            sync().then(function () {
                cv.append($("<div>").append(
                        $("<a>").attr({target:"runit",href:runURL}).text("別ページで開く")
                ));
                cv.append($("<div>").qrcode(runURL));
            });
        }
    });
    function run() {//run!!
        var inf=getCurrentEditorInfo();
        if (!inf) {
            alert("実行したいファイルを開いてください。");
            return;
        }
        var curFile=inf.file;
        var curFiles=fileSet(curFile);
        var curHTMLFile=curFiles[0];
        var curJSFile=curFiles[1];

        stop();
        save();
        displayMode("run");
        if(lang=="js"){
            if (typeof SplashScreen!="undefined") SplashScreen.show();
            /*//RunDialog2 (new version)
            try {
                var ram=FS.get("/ram/build/");
                FS.mount(ram.path(),"ram");
                var b=new TJSBuilder(curPrj, ram);
                b.build().then(function () {
                    //console.log(ram.ls());
                    var indexF=ram.rel(curHTMLFile.name());
                    RunDialog2.show(indexF,
                    {height:screenH-50,toEditor:focusToEditor,font:desktopEnv.editorFontSize||18});
                }).fail(function (e) {
                    console.log(e.stack);
                }).done(function () {
                    if (typeof SplashScreen!="undefined") SplashScreen.hide();
                });
            }catch(e) {
                console.log(e.stack);
            }
            QR code
            sync
            */
            
            var name=curPrj.getClassName(curJSFile);
            A.is(name,String);
	        runURL=location.href.replace(/\/[^\/]*\?.*$/,
	                "/run.html?classroom="+curClassroom+"&usr="+curUser+
	                "&prj="+curProjectDir.name().replace("/","")+
	                "&class="+name.replace("user.","")
	        );
	        $("#fullScr").attr("href","javascript:;").text("別ページで実行");
	        $("#qr").text("QR");
	        curPrj.loadClasses().then(DU.throwF(function() {
	            curName=name;
	            if (curFrameRun) {
	                window.setupFrame(curFrameRun);
	                RunDialog.show("src","run.html",{height:screenH-50,toEditor:focusToEditor,font:desktopEnv.editorFontSize||18});
	            } else {
	                //$("#ifrm").attr("src","run.html");
	                RunDialog.show("src","run.html",{height:screenH-50,toEditor:focusToEditor,font:desktopEnv.editorFontSize||18});
	            }
	            return sync();
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
	}else if(lang=="c"){
	    $.post("dump.php",{data:"//"+curJSFile.path()+"\n"+curJSFile.text()}).then(function (r) {
	        console.log(r);
	    }).fail(function (e) {
	        console.log(e);
	    });
		var compiledFile=curPrj.getOutputFile();
		var log={};
		try{
			compile(curJSFile,compiledFile,log);
	        	runURL=location.href.replace(/\/[^\/]*\?.*$/,
	        	        "/js/ctrans/runc.html?file="+compiledFile.path()
	        	);
			//$("#ifrm").attr("src",runURL);
			    RunDialog.show("src",runURL,{height:screenH-50,toEditor:focusToEditor,font:desktopEnv.editorFontSize||18});
		        $("#fullScr").attr("href","javascript:;").text("別ページで実行");
		        $("#qr").text("QR");
		}catch(e){
			$.post("dump.php",{data:"COMPILE ERROR!\n"+e+"\nCOMPILE ERROR END!"}).then(function (r) {
				console.log(r);
			}).fail(function(e){
				console.log(e);
			});
			alert(e);
		}
        return sync();
	}
    }
    window.moveFromFrame=function (name) {
        var f=curProjectDir.rel(name);
        if (f.exists()) {
            fl.select(f);
            run();
        }
    };
    var curFrameRun;
    var curth;
    window.setupFrame=function (r) {
        curFrameRun=r;
        var inf=getCurrentEditorInfo();
        var ht="";
        var curFile=inf.file;
        var curFiles=fileSet(curFile);
        var curHTMLFile=curFiles[0];
        var curJSFile=curFiles[1];
        var ht=curHTMLFile.text();
        var f=curPrj.getOutputFile();
        var js=f.text();
        curth=r(ht,js, curName);
        if (typeof SplashScreen!="undefined") SplashScreen.hide();
    };
    var alertOnce;
    alertOnce=function (e) {
        alert(e);
        alertOnce=function(){};
    };
    window.onerror=EC.handleException=Tonyu.onRuntimeError=function (e) {
        Tonyu.globals.$lastError=e;
        var t=curPrj.env.traceTbl;
        var te;
        var tid = t.find(e) || t.decode($LASTPOS); // user.Main:234
        if (tid) {
            te=curPrj.decodeTrace(tid);
        }
        console.log("onRunTimeError:stackTrace1",e.stack,te,$LASTPOS);
        if (te) {
            te.mesg=e;
            if (e.pluginName) {
                alert(e.message);
            } else {
                var diag=showErrorPos($("#errorPos"),te);
                displayMode("runtime_error");
                $("#errorPos").find(".quickFix").append(
                        UI("button",{on:{click: function () {
                            setDiagMode(true);
                            diag.dialog("close");
                            run();
                        }}},"診断モードで実行しなおす"));
            }
            stop();
        } else {
            UI("div",{title:"Error"},"["+e+"]",["pre",e.stack]).dialog({width:800});
            stop();
        }
    };
    $("#search").click(F(function () {
        console.log("src diag");
        searchDialog.show(curProjectDir,function (info){
            fl.select(info.file);
            setTimeout(function () {
                var prog=getCurrentEditor();
                if (prog) prog.gotoLine(info.lineNo);
            },50);
        });
    }));
    function close(rm) { // rm or mv
        var i=editors[rm.path()]; //getCurrentEditorInfo();
        if (i) {
            i.editor.destroy();
            i.dom.remove();
            delete editors[rm.path()];
        }
    }
    function fixEditorIndent(prog) {
        var cur=prog.getCursorPosition();
        prog.setValue(fixIndent( prog.getValue() ));
        prog.clearSelection();
        prog.moveCursorTo(cur.row, cur.column);
    }
    function reloadFromFiles() {
        for (var path in editors) {
            var inf=editors[path];
            var curFile=inf.file; //fl.curFile();
            var prog=inf.editor; //getCurrentEditor();
            if (curFile.exists() && prog) {
                prog.setValue(curFile.text());
                prog.clearSelection();
            }
        }
    }
    function save() {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        var curFile=inf.file; //fl.curFile();
        var prog=inf.editor; //getCurrentEditor();
        if (curFile && prog && !curFile.isReadOnly()) {
            if (curFile.ext()==EXT) fixEditorIndent(prog);
            var old=curFile.text();
            var nw=prog.getValue();
            if (old!=nw) {
                curFile.text(nw);
            }
        }
        fl.setModified(false);
    }
    function watchModified() {
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
    }
    function fileSet(c) {
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
            var prog=ace.edit(progDOM[0]);
            if (typeof desktopEnv.editorFontSize=="number") prog.setFontSize(desktopEnv.editorFontSize);
	    else prog.setFontSize(18);
            //prog.setFontSize(20);
            prog.setTheme("ace/theme/eclipse");
            if (f.ext()==EXT && lang=="c") {
                prog.getSession().setMode("ace/mode/c_cpp");
            }
            else if (f.ext()==EXT) {
                prog.getSession().setMode("ace/mode/tonyu");
            }
            if (f.ext()==HEXT) {
                prog.getSession().setMode("ace/mode/html");
            }
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
        }
        $("#curFileLabel").text(f.truncExt());
    }
    d=function () {
        Tonyu.currentProject.dumpJS.apply(this,arguments);
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
        return desktopEnv=res;
    }
    function saveDesktopEnv() {
        var d=curProjectDir.rel(".desktop");
        d.obj(desktopEnv);
    }
    $("#prjOptEditor").click(F(function () {
        ProjectOptionsEditor(curPrj);
    }));
    var helpd=null;
    $("#refHelp").click(F(function () {
    	if (!helpd) helpd=WikiDialog.create(home.rel("doc/tonyu2/"));
    	helpd.show();
    }));
    if (typeof progBar=="object") {progBar.clear();}
    $("#rmPRJ").click(F(function () {
        if (prompt(curProjectDir+"内のファイルをすべて削除しますか？削除する場合はDELETE と入力してください．","")!="DELETE") {
            return;
        }
        sh.rm(curProjectDir,{r:1});
        document.location.href="index.html";
    }));
    $("#mvPRJ").click(F(function () {
        var np=prompt("新しいプロジェクトの名前を入れてください", curProjectDir.name().replace(/\//g,""));
        if (!np || np=="") return;
        if (!np.match(/\/$/)) np+="/";
        var npd=curProjectDir.up().rel(np);
        if (npd.exists()) {
            alert(npd+" はすでに存在します");
            return;
        }
        sh.cp(curProjectDir,npd);
        sh.rm(curProjectDir,{r:1});
        document.location.href="project.html?dir="+npd;
    }));
    function textSize() {
        var prog=getCurrentEditor();
        var s=prompt("エディタの文字の大きさ", desktopEnv.editorFontSize||18);
        desktopEnv.editorFontSize=parseInt(s);
        if (prog) prog.setFontSize(desktopEnv.editorFontSize||18);
        saveDesktopEnv();
    }
    function showToast(msg){
	$("#toastArea").text(msg);
	setTimeout(function(){
		$("#toastArea").text("");
	    },5000);
    }
    $("#home").click(F(function () {
	goHome();
    }));
    $("#runMenu").click(F(run));
    function goHome(){
	console.log("goHome");
	unsynced=false;
	location.href="index.html";
    }
    sh.curFile=function () {
        return fl.curFile();
    };
    $(window).on("beforeunload",function(e){
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
        if(prog=getCurrentEditor()) prog.focus();
    }
//    SplashScreen.hide();
});
//});// of load ace
});
