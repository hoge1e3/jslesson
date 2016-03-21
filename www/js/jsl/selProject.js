requirejs(["FS","Shell","Shell2","ProjectCompiler",
           "NewProjectDialog","UI","Auth","zip","Sync"],
  function (FS, sh,sh2,TPRC,
           NPD,           UI, Auth,zip,Sync) {
$(function () {
    $("body").append(UI("div",
            ["h1","プロジェクト一覧"],
            ["div",
	        ["a",{href:"https://docs.google.com/document/d/17_RcWbezzXf4ShnTUcS2IRYxgO03QB9--sFN4xC9Ts0/pub",target:"manTab"},"入門テキスト"],"JSLessonの基本的な使い方を説明します。"
	    ],
	    ["div",
	        ["a",{href:"https://docs.google.com/document/d/1VzrUiHj6IBIgnN4GY2AFs92wGwjlreG6DmByg3VkROA/pub",target:"gamTab"},"ゲーム制作のテキスト"],"JSLessonでゲームを制作するサンプル教材です。"
	    ],
	    ["div",
	    	["a",{href:"https://docs.google.com/document/d/1TqO4SCzWyCggfRZ8onqcAmiIpHPQygeSuVtO0atbZVs/pub",target:"apiTab"},"JSLessonで使える命令"],"JSLessonで使える命令の一覧と使用例です。"
	    ],
	    ["div",
	    	["a",{href:"https://docs.google.com/document/d/1oLtnBKggCuOI-cyD16ZCg7JOFCi-oS8Rj9vo0uhWFvs/pub",target:"regTab"},"教員の方向け説明"],"JSLessonを使って授業を展開される方への説明です。"
	    ],
	    ["div",
	    	["a",{href:"teacher.php",target:"teaTab"},"教員用ログイン"]
            ],
            ["button", {id:"newPrj", "class":"btn btn-primary"}, "新規プロジェクト"],
            ["span",{id:"syncMesg"}],
            ["div",{id:"prjItemList"}]
    ));
    var projects=FS.resolve("${tonyuHome}/Projects/");
    console.log(projects);
    projects.mkdir();
    sh.cd(projects);
    var curDir=projects;
    function ls() {
        $("#prjItemList").empty();
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
        d.forEach(function (e) {
            var f=e[0];
            var name=f.name();

            if (!f.isDir()) return;
            if (!f.rel("options.json").exists()) return;
            var u=UI("div", {"class":"project"},
                    ["a", {href:"?r=jsl_edit&dir="+f.path()},
                     ["img",{$var:"t",src:FS.expandPath("${sampleImg}/tonyu.png")}],
                     ["div", name]],
                     ["div",
                      ["a",{on:{click:ren(f)}},"名前変更"], ["span"," "],
                      ["a",{on:{click:del(f)}},"削除"]]
                  );
            u.appendTo("#prjItemList");
            /*setTimeout(function () {
                var tn=f.rel("images/").rel("icon_thumbnail.png");
                //console.log(tn.path());
                if (tn.exists()) {
                    u.$vars.t.attr("src",tn.text());
                }
            },10);*/
        });
    }
    /*Auth.currentUser(function (r){
        if (r) {
            $(".while-logged-out").hide();
            $("#login").text(r);
        } else {
            $(".while-logged-in").hide();
        }
    });*/
    function ren(f) {
        return function () {
            NPD.show(projects, function (prjDir) {
                prjDir.moveFrom(f);
                ls();
            },{ren:true, defName:f.name().replace("/","")});
        };
    }
    function del(f) {
        return function () {
            if (confirm(f+"を削除しますか？")) {
                f.rm({r:true});
                ls();
            }
        };
    }
    if (!WebSite.isNW) {
        $("#syncMesg").text("同期しています....");
        Sync.sync(projects, FS.get("/"),{v:true}).then(function (e) {
            $("#syncMesg").append("完了");
            ls();
            setTimeout(function () {
                $("#syncMesg").text(e.classid+" クラスの"+e.user+"でログインしています。");
                $("#syncMesg").append(UI("a",{href:"login.php"},"他ユーザでログイン"));
            },1000);
        }).fail(function (e) {
            if (e==Sync.NOT_LOGGED_IN) {
                $("#syncMesg").empty().append(UI("a",{href:"login.php"},"ログイン"));
            } else {
                $("#syncMesg").text("エラー!"+e);
                console.log(e);
            }
        });
    }
    $("#newPrj").click(function (){
    	NPD.show(projects, function (prjDir) {
            prjDir.mkdir();
            TPRC(prjDir).setOptions({
                compiler:{
                    namespace:"user",
                    outputFile:"js/concat.js",
                    defaultSuperClass:"jslker.Parent",
                    dependingProjects:[
                         {"namespace":"jslker", "compiledURL":"${JSLKer}/js/concat.js"}
                    ]
                }
            });
            document.location.href="?r=jsl_edit&dir="+prjDir.path();
    	});
    });
    ls();
});
});
