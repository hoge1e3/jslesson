define(["Klass","UI","assert","DateUtil","DeferredUtil"],
function (Klass,UI,A,DateUtil,DU) {
    var AssignmentDialog=Klass.define({
        $this:"t",
        dialogParam: {
            width:500,
            height:400
        },
        edit: function (t,name) {
            t.dom=t.dom||t.createDOM();
            //t.dom.dialog(t.dialogParam);
            t.mode=null;
            t.button.text("更新");
            $.post("a.php?Assignment/get",{
                name: name
            }).then(function (a) {
                console.log("got",a);
                t.mode="edit";
                t.name.val(a.name);
                t.origname.val(a.name);
                for (var k in a.files) {
                    t.file.val(k);
                }
                t.time.val(DateUtil.format(a.time-0,"YYYY/MM/DD"));
                t.deadline.val(DateUtil.format(a.deadline-0,"YYYY/MM/DD"));
                t.description.val(a.description);
            },function (e) {
                console.error(e.responseText);
            });
        },
        add: function (t,file) {
            var dir;
            if (file) {
                if (file.isDir()) {
                    dir=file;
                    file=null;
                } else {
                    dir=file.up();
                }
                t.file.val(file||"");
                t.prefix=dir.name().replace(/\//g,"-");
            }
            t.name.val(t.prefix);
            t.description.val("");
            t.mode="add";
            t.button.text("追加");
        },
        show: function (t,file) {
            t.dom=t.dom||t.createDOM();
            t.dom.dialog(t.dialogParam);
            t.add(file);
            console.log("tlist",t.showList());
            t.showList();
        },
        showList:function (t) {
            t.list.empty();
            return $.get("a.php?Assignment/list").then(function (r) {
                t.list.empty();
                t.list.append(UI("div",
                    ["a",{href:"javascript:;",on:{
                        click: function () {
                            t.add();
                        }
                    }},"新規"]));
                r.forEach(function (e) {
                    t.list.append(UI("div",
                    ["a",{href:"javascript:;",on:{
                        click: function () {
                            t.edit(e.name);
                        }
                    }},e.name]));
                });
            }).catch(DU.E);
        },
        createDOM: function (t) {
            t.dom=UI(
                "div",{title:"課題の管理"},
                ["div",{css:{float:"left"},$var:"list"}],
                ["div",{css:{float:"right"}},
                ["form",{action:"javascript:;",name:"as_edit"},
                    ["div",
                        ["label",{for:"name"},"課題名"],
                        ["input",{name:"name"}],
                        ["input",{type:"hidden",name:"origname"}]
                    ],
                    ["div",
                        ["label",{for:"description"},"説明"],
                        ["textarea",{rows:5,cols:32,name:"description"}]
                    ],
                    ["div",
                        ["label",{for:"time"},"出題日"],
                        ["input",{name:"time",
                        value:DateUtil.format(new Date,"YYYY/MM/DD")}]
                    ],
                    ["div",
                        ["label",{for:"deadline"},"締切日"],
                        ["input",{name:"deadline",
                        value:DateUtil.format(
                            new Date().getTime()+1000*365*86400,"YYYY/MM/DD"
                        )}]
                    ],
                    ["div",
                        ["label",{for:"file"},"ファイル"],
                        ["input",{name:"file"}]
                    ],
                    ["button",{name:"button",on:{click:t.$bind.post}},"追加"],
                    ["span",{$var:"mesg"}]
                ]]
            );
            var form=t.dom.find("form")[0];
            t.list=t.dom.$vars.list;
            t.mesg=t.dom.$vars.mesg;
            t.name=$(form.name);
            t.origname=$(form.origname);
            t.description=$(form.description);
            t.file=$(form.file);
            t.button=$(form.button);
            t.time=$(form.time);
            t.deadline=$(form.deadline);
            return t.dom;
        },
        showMesg: function (t,text) {
            if (t._etimer) clearTimeout(t._etimer);
            t.mesg.text(text);
            t._etimer=setTimeout(function () {
                t.mesg.text("");
            },1000);
        },
        post: function (t) {
            var param={
                origname:t.origname.val(),
                name:t.name.val(),
                description:t.description.val(),
                time:new Date(t.time.val()).getTime(),
                deadline:new Date(t.deadline.val()).getTime(),
                files:{}
            };
            param.files[t.file.val()]=true;
            param.files=JSON.stringify(param.files);
            console.log("post param",param);
            switch (t.mode) {
            case "add":
            return $.post("a.php?Assignment/add",param).then(function (r){
                t.showMesg("追加しました");
                t.showList();
                console.log("Result",r);
            },DU.E);
            case "edit":
            if (t.origname.val()!==t.name.val()) {
                return $.post("a.php?Assignment/rename",param).then(function (r){
                    t.showList();
                    t.showMesg("更新しました");
                    console.log("Result",r);
                },DU.E);
            } else {
                return $.post("a.php?Assignment/edit",param).then(function (r){
                    t.showMesg("更新しました");
                    console.log("Result",r);
                },DU.E);
            }
            default:
                alert("No mode "+t.mode);
            }
        }
    });
    assignmentDialog=new AssignmentDialog();
    return assignmentDialog;
});
