requirejs(["Util", "Tonyu", "FS", "FileList", "FileMenu",
           "showErrorPos", "fixIndent",  "ProjectCompiler",
           "Shell","Shell2","KeyEventChecker",
           "runtime", "searchDialog","StackTrace",
           "UI","WebSite","exceptionCatcher","Tonyu.TraceTbl",
           "Columns","assert","Menu","TError","DeferredUtil"
          ],
function (Util, Tonyu, FS, FileList, FileMenu,
          showErrorPos, fixIndent, TPRC,
          sh,sh2,  KeyEventChecker,
          rt, searchDialog,StackTrace,
          UI,WebSite,EC,TTB,
          Columns,A,Menu,TError,DU
          ) {
$(function () {
requirejs(["ace"],function (){
    console.log("ace loaded:",ace);
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
    var EXT=A(curPrj.EXT);
    var HEXT=".html";
    var desktopEnv=loadDesktopEnv();
    var runMenuOrd=desktopEnv.runMenuOrd;

    function makeUI(){
        Columns.make(
              ["div",{id:"fileViewer","class":"col-xs-2"},
                  ["div",{id:"fileItemList"}]
              ],
              ["div",{id:"mainArea","class":"col-xs-5"},
                  ["div",{id:"errorPos"}],
                  ["div",{id:"tabTop"},
                     ["button",{
                         "class":"selTab","data-ext":HEXT
                     },"HTML"],
                     ["button",{
                         "class":"selTab","data-ext":EXT
                     },"JavaScript"],
                     ["span",{id:"curFileLabel"}],
                     ["span",{id:"modLabel"}]
                  ],
                  ["div",{id:"progs"}]
              ],
              ["div",{id:"runArea","class":"col-xs-5"},
               ["iframe",{id:"ifrm",width:465,height:465}]
              ]
        );
    }
    makeUI();
    function makeMenu() {
        Menu.make("JS Lesson",
                [
                  {label:"Home",href:"index.html"},
                  {label:"ファイル",sub:[
                      {label:"新規",id:"newFile"},
                      {label:"名前変更",id:"mvFile"},
                      {label:"コピー",id:"cpFile"},
                      {label:"削除", id:"rmFile"}
                  ]},
                  {label:"実行",sub:[
                      {label:"実行(F9)",id:"runMenu",action:run},
                      {label:"停止(F2)",id:"stopMenu",action:stop},
                  ]}
                ]
        );
    }
    makeMenu();

    var screenH;
    function onResize() {
        //console.log($(window).height(), $("#navBar").height());
        var h=$(window).height()-$("#navBar").height()-$("#tabTop").height();
        h-=20;
        screenH=h;
        var rw=$("#runArea").width();
        $("#progs pre").css("height",h+"px");
        console.log("canvas size",rw,h);
        //$("#cv").attr("height", h).attr("width", rw);
        //cv=$("#cv")[0].getContext("2d");
        $("#fileItemList").height(h);
    }
    onResize();
    var editors={};

    KeyEventChecker.down(document,"F9",F(run));
    KeyEventChecker.down(document,"F2",F(stop));
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
            //fl.select(nf);
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
                    e.text("// Javascript\n");
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
    /*FM.on.mvExtraUI=function (d) {
        refactorUI=UI("div",["input",{type:"checkbox",$var:"chk",checked:"true",value:"chked"}],"プログラム中のクラス名も変更する");
        d.append(refactorUI);
    };*/
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
        /*if (!refactorUI) return;
        var oldCN=old.truncExt(EXT);
        var newCN=_new.truncExt(EXT);
        if (refactorUI.$vars.chk.prop("checked")) {
            //alert(oldCN+"=>"+newCN);
            save();
            try {
                curPrj.renameClassName(oldCN,newCN);
            } catch (e) {
                alert("プログラム内にエラーがあります．エラーを修正するか，「プログラム中のクラス名も変更する」のチェックを外してもう一度やり直してください．");
                console.log(e);
                return false;
            }
        }
        //close(old);  does in FileMenu
        */
        //reloadFromFiles();
        //refactorUI=null;
    };
    F(FM.on);
    fl.ls(curProjectDir);
    function ls(){
        fl.ls(curProjectDir);
//        refreshRunMenu();
    }
    function dispName(f) {
        var name=f.name();
        if (f.isDir()) return name;
        if (f.endsWith(EXT) || f.endsWith(HEXT)) return f.truncExt();
        return null;
    }
    function fixName(name, options) {
        var upcased=false;
        //if (name=="aaaa") throw new Error("iikagen name error "+EC.enter);
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
                return {ok:true, file: curProjectDir.rel(name+HEXT), note: "先頭を大文字("+name+") にして作成します．"};
            }
            return {ok:true, file: curProjectDir.rel(name+HEXT)};
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
            break;
        }
    }
    function stop() {
        //curPrj.stop();
        displayMode("edit");
    }
    var curName;
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

        var name=curPrj.getClassName(curJSFile);
        A.is(name,String);
        stop();
        save();
        displayMode("run");
        if (typeof SplashScreen!="undefined") SplashScreen.show();
        //if (curHTMLFile.exists()) $("#runArea")[0].innerHTML=curHTMLFile.text();
        curPrj.loadClasses().then(DU.throwF(function() {
            curName=name;
            if (curFrameRun) {
                window.setupFrame(curFrameRun);
            } else {
                $("#ifrm").attr("src","run.html");
            }

            /*A(Tonyu.classes);
            var bootClass=Tonyu.getClass(name);
            if (!bootClass) throw TError( name+" というクラスはありません", "不明" ,0);
            Tonyu.runMode=true;
            var boot=new bootClass();
            var th=Tonyu.thread();
            th.apply(boot,"main");
            $LASTPOS=0;
            if (typeof SplashScreen!="undefined") SplashScreen.hide();
            th.steps();*/
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
    }
    window.moveFromFrame=function (name) {
        var f=curProjectDir.rel(name);
        if (f.exists()) {
            fl.select(f);
            run();
        }
    };
    var curFrameRun;
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
        r(ht,js, curName);
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
            UI("div",{title:"Error"},e,["pre",e.stack]).dialog({width:800});
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
    }
    function fileSet(c) {
        var n=c.truncExt();
        return [c.up().rel(n+HEXT), c.up().rel(n+EXT)];
    }
    $(".selTab").click(function () {
        var ext=A.is($(this).attr("data-ext"),String);
        //$(".selTab").removeClass("selected");
        //$(this).addClass("selected");
        var c=fl.curFile();
        if (!c) {
            alert("まず、メニュー→新規でファイルを作るから、左のファイル一覧からファイルを選んでください。");
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
            prog.setTheme("ace/theme/eclipse");
            if (f.ext()==EXT) {
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
    $("#editorEditor").click(F(function () {
        var prog=getCurrentEditor();
        var s=prompt("エディタの文字の大きさ", desktopEnv.editorFontSize||12);
        desktopEnv.editorFontSize=parseInt(s);
        if (prog) prog.setFontSize(desktopEnv.editorFontSize||12);
        saveDesktopEnv();
    }));
    sh.curFile=function () {
        return fl.curFile();
    };
    FM.onMenuStart=save;
    SplashScreen.hide();
});
});// of load ace
});
