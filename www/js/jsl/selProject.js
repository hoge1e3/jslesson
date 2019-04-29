define(["FS","Shell","Shell2",
           "NewProjectDialog","UI","Auth","zip","Sync","NewSampleDialog","RenameProjectDialog",
           "assert","DeferredUtil","RemoteProject","SplashScreen",
       "ctrl"],
    function(FS, sh,sh2,
           NPD, UI, Auth,zip,Sync,NSD,RPD,
           A,DU,RemoteProject,SplashScreen,
       ctrl) {
    if (location.href.match(/localhost/)) {
        A.setMode(A.MODE_STRICT);
    } else {
        A.setMode(A.MODE_DEFENSIVE);
    }
    $.when(DU.documentReady(),Auth.check()).then(ready).fail(function (e) {
        alert("エラー!"+e);
        console.log(e.stack);
        SplashScreen.hide();
    });
function ready() {//-------------------------
    console.log("AUth",Auth.user,Auth.class);
    if(!Auth.loggedIn()) {
        alert("ログインしていません。ログインページに移動します。");
        location.href=".?Login/form";
        return;
    }
    $("body").append(UI("div",
            ["div",{class:"hero-unit"},
            ["div",{id:"userInfo",css:{float:"right"},margin:"50px"},"ようこそ",["br"],["div","同期中です..."]],
            ["h1", ["img",{src:"images/bitarrow-2.png",css:{"display":"inline"},width:"100px"}],"Bit Arrow"]],
            ["div","【お知らせ】新しいバージョン",["span",{class:"notice"},"(2019_0501)"],"になりました．",
            ["a",{href:"https://bitarrow.eplang.jp/?change1905",target:"wikiTab"},"主な変更点..."]/*," | ",
            ["a",{href:"https://bitarrow.eplang.jp/2017_0328/",target:"wikiTab"},"以前のバージョン(2017_0328)を使う"]*/],
            ["div",
	            ["a",{href:"https://bitarrow.eplang.jp/",target:"wikiTab"},"Bit Arrow解説ページ"],
                ["span",{class:"assignment"}," | ",
                ["a",{href:".?Assignment/view",target:"asTab"},"採点結果を見る"]],
                " | ",["a",{href:".?Teacher/login",target:"teaTab"},"教員用ログイン"]
	        ],
            ["hr",{color:"#000000",size:"4"}],
            //["h2","プロジェクト一覧"],
	        /*
            ["div",
	        ["a",{href:"https://docs.google.com/document/d/17_RcWbezzXf4ShnTUcS2IRYxgO03QB9--sFN4xC9Ts0/pub",target:"manTab"},"入門テキスト"],"Bit Arrowの基本的な使い方を説明します。"
	    ],
	    ["div",
	        ["a",{href:"https://docs.google.com/document/d/1VzrUiHj6IBIgnN4GY2AFs92wGwjlreG6DmByg3VkROA/pub",target:"gamTab"},"ゲーム制作のテキスト"],"Bit Arrowでゲームを制作するサンプル教材です。"
	    ],
	    ["div",
	    	["a",{href:"https://docs.google.com/document/d/1TqO4SCzWyCggfRZ8onqcAmiIpHPQygeSuVtO0atbZVs/pub",target:"apiTab"},"Bit Arrowで使える命令"],"Bit Arrowで使える命令の一覧と使用例です。"
	    ],
	    ["div",
	    	["a",{href:"https://docs.google.com/document/d/1oLtnBKggCuOI-cyD16ZCg7JOFCi-oS8Rj9vo0uhWFvs/pub",target:"regTab"},"教員の方向け説明"],"Bit Arrowを使って授業を展開される方への説明です。"
	    ],
	    ["div",
	    	["a",{href:"teacher.php",target:"teaTab"},"教員用ログイン"]
            ],*/
            ["button", {id:"newPrj", "class":"btn btn-primary"}, "新規プロジェクト"],
            ["button", {id:"newSample", "class":"btn btn-primary"}, "サンプルプロジェクト"],
            ["span",{id:"syncMesg"}],
            ["div",{id:"prjItemList"}]
    ));
    $(".assignment").hide();
    ctrl.get("Class/getOptions").then(function (r) {
        if (r.useAssignment==="yes") {
            $(".assignment").show();
        }
    });
    setTimeout(function () {
        $("#syncMesg").empty();
        $("#userInfo").text(Auth.class+" クラスの"+Auth.user+"さん、こんにちは");
        $("#userInfo").append(UI("br"));
        $("#userInfo").append(UI("a",{href:".?Login/form"},"他ユーザでログイン"));
    },1000);
    var projects=Auth.localProjects();// FS.resolve("${tonyuHome}/Projects/");
    console.log(projects);
    projects.mkdir();
    sh.cd(projects);
    var curDir=projects;
    var projectsInfo=[];// name not ends with / (truncated at function item() )
    function ls() {
        $("#prjItemList").empty();
        return RemoteProject.list().then(function (d) {
            projectsInfo=d;
            d.findProject=function (name) {
                var res;
                d.forEach(function(i) {
                    if (i.name===name) res=i;
                });
                return res;
            };
            d.sort(function (a,b) { return b.lastUpdate-a.lastUpdate;});
            d.forEach(item);
        }).fail(function(e){
            console.log("list failed",e);
        });
        /*
        var d=[];
        curDir.each(function (f) {
            if (!f.isDir()) return;
            var l=f.lastUpdate();
            var r=f.rel("options.json");
            if (r.exists()) {
                l=r.lastUpdate();
            }
            d.push([f,l]);
        });
        d=d.sort(function (a,b) {
            return b[1]-a[1];
        });
        */
        function item(e) {
            e.name=e.name.replace(/\/$/,"");
            var f=projects.rel(e.name+"/");
            e.dir=f;
            var name=e.name;

            if (!f.isDir()) return;
            //if (!f.rel("options.json").exists()) return;
            var u=UI("div", {"class":"project"},
                    ["a", {href:"?r=jsl_edit&dir="+f.path()},
                     ["img",{$var:"t",src:FS.expandPath("${sampleImg}/"+(e.language||"js")+".png")}],
                     ["div", name]],
                     ["div",
                      ["a",{on:{click:ren(name)}},"名前変更"], ["span"," "],
                      ["a",{on:{click:del(name)}},"削除"]]
                  );
            u.appendTo("#prjItemList");
        }
    }
    function ren(fromName) {//  not endswidth /
        return function () {
            RPD.show(projectsInfo, fromName, function (model) {
                var toName=model.name;// not endswidth /
                if (toName===fromName) {
                    alert("同じ名前です");
                    return;
                }
                //console.log(prjDir);
                RemoteProject.rename(fromName, toName).then(function () {
                    var fromD=projectsInfo.findProject(fromName).dir;
            	    var toD=projects.rel(toName+"/");
                    //var toD=projectsInfo.findProject(toName).dir;
                    if (fromD.exists()) toD.moveFrom(fromD);
                    return ls();
                }).fail(function (e){
                    console.log(e,e.stack); alert("名前変更に失敗しました。");
                });
            },{ren:true, defName:fromName});
        };
    }
    function del(name) {// not endswidth /
        return function () {
            if (confirm(name+"を削除しますか？")) {
                RemoteProject.delete(name).then(function () {
                    var d=projectsInfo.findProject(name).dir;
                    if (d.exists()) d.rm({r:true});
                    ls();
                }).fail(function (e){
                    console.log(e,e.stack); alert("削除に失敗しました。");
                });
            }
        };
    }
    $("#newPrj").click(function (){
    	NPD.show(projectsInfo, function (model) {
            NPD.create(projects,model);
    	    console.log(model);
    	    var prjDir=projects.rel(model.name+"/");
            /*prjDir.mkdir();
            TPRC(prjDir).setOptions({
                compiler:{
                    namespace:"user",
                    outputFile:"js/concat.js",
                    defaultSuperClass:"jslker.Parent",
                    dependingProjects:[
                         {"namespace":"jslker", "compiledURL":"${JSLKer}"}
                        // {"namespace":"jslker", "compiledURL":"${JSLKer}/js/concat.js"}
                    ]
                },
        		language:model.lang
            });*/
            document.location.href="?r=jsl_edit&dir="+prjDir.path();
    	});
    });
    $("#newSample").click(function (){
        return NSD.show(projectsInfo,function (model) {
            DU.loop(function (i) {
                var inf=projectsInfo.findProject(model.name);
                if (inf) {
                    document.location.href="?r=jsl_edit&dir="+inf.dir.path();
                    return DU.brk();
                }
                if (i==1) return DU.brk();
                return ls().then(function () {
                    return i+1;
                });
            },0);
        });
    });
    ls().then(function () {
        if (window.SplashScreen) window.SplashScreen.hide();
    });
}//------of function ready()-----------
});
