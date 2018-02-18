define(["Klass","UI","assert","DateUtil","DeferredUtil"],
function (Klass,UI,A,DateUtil,DU) {
    var TestsuiteDialog=Klass.define({
        $this:"t",
        controller: "Testcase",
        dialogParam: {
            width:500,
            height:400
        },
        $:function (t,assignment) {
            t.assignment=assignment;
            t.assignmentParam="&assignment="+t.assignment.id;
            t.prefix=t.assignment.name+"-";
        },
        setEditMode: function (t) {
            t.button.text("更新");
            t.mode="edit";
            t.genOutB.prop("disabled",false);
            t.delB.prop("disabled",false);
        },
        setAddMode: function (t) {
            t.button.text("追加");
            t.mode="add";
            t.genOutB.prop("disabled",true);
            t.delB.prop("disabled",true);
            delete t.cur;
        },
        edit: function (t,name) {
            t.dom=t.dom||t.createDOM();
            //t.dom.dialog(t.dialogParam);
            t.mode=null;
            $.post("a.php?"+t.controller+"/get",{
                assignment: t.assignment.id,
                name: name
            }).then(function (a) {
                console.log("got",a);
                t.cur=a;
                t.setEditMode();
                t.name.val(a.name);
                t.origname.val(a.name);
                t.input.val(a.input);
            }).catch(DU.E);
        },
        add: function (t) {
            var dir;
            t.name.val(t.prefix);
            t.input.val("");
            t.setAddMode();
        },
        show: function (t) {
            t.dom=t.dom||t.createDOM();
            t.dom.dialog(t.dialogParam);
            t.add();
            //console.log("tlist",t.showList());
            t.showList();
        },
        showList:function (t) {
            t.list.empty();
            return $.get("a.php?"+t.controller+"/list"+t.assignmentParam).then(function (r) {
                console.log("list ",r);
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
                "div",{title:"テストケースの管理"},
                ["div",{css:{float:"left"},$var:"list"}],
                ["div",{css:{float:"right"}},
                ["form",{action:"javascript:;",name:"as_edit"},
                    ["div",
                        ["label",{for:"name"},"テストケース名"],
                        ["input",{name:"name"}],
                        ["input",{type:"hidden",name:"origname"}]
                    ],
                    ["div",
                        ["label",{for:"input"},"入力"],
                        ["textarea",{rows:5,cols:32,name:"input"}]
                    ],
                    ["button",{name:"button",on:{click:t.$bind.post}},"追加"],
                    ["button",{name:"genOutB",on:{click:t.$bind.genOutB}},"出力生成"],
                    ["button",{name:"delB",on:{click:t.$bind.del}},"削除"],
                    ["span",{$var:"mesg"}]
                ]]
            );
            var form=t.dom.find("form")[0];
            t.list=t.dom.$vars.list;
            t.mesg=t.dom.$vars.mesg;
            t.name=$(form.name);
            t.genOutB=$(form.genOutB);
            t.delB=$(form.delB);
            t.origname=$(form.origname);
            t.input=$(form.input);
            t.button=$(form.button);
            return t.dom;
        },
        showMesg: function (t,text) {
            if (t._etimer) clearTimeout(t._etimer);
            t.mesg.text(text);
            t._etimer=setTimeout(function () {
                t.mesg.text("");
            },1000);
        },
        editTest: function (t) {
            if (t.mode!=="edit") throw new Error("Not edit mode");
            console.log(t.cur);
            //alert("Edit"+d);
        },
        post: function (t) {
            var param={
                assignment: t.assignment.id,
                origname:t.origname.val(),
                name:t.name.val(),
                input:t.input.val()
            };
            console.log("post param",param);
            switch (t.mode) {
            case "add":
            return $.post("a.php?"+t.controller+"/add",param).then(function (r){
                t.cur=param;
                t.cur.id=r-0;
                t.showMesg("追加しました");
                t.showList();
                t.setEditMode();
                t.origname.val(param.name);
                console.log("Result",r,param);
            },DU.E);
            case "edit":
            if (t.origname.val()!==t.name.val()) {
                return $.post("a.php?"+t.controller+"/rename",param).then(function (r){
                    t.showList();
                    t.showMesg("更新しました");
                    console.log("Result",r);
                },DU.E);
            } else {
                return $.post("a.php?"+t.controller+"/edit",param).then(function (r){
                    t.showMesg("更新しました");
                    console.log("Result",r);
                },DU.E);
            }
            default:
                alert("No mode "+t.mode);
            }
        },
        del: function (t) {
            if (t.mode!=="edit") return;
            if (!confirm(t.cur.name+"を削除しますか？")) return;
            $.get("a.php?"+t.controller+"/del&id="+t.cur.id).then(function (r){
                t.showMesg("削除しました");
                t.add();
                t.showList();
                console.log("Result",r);
            },DU.E);
        },
        dispose: function (t) {
            if (t.dom) t.dom.remove();
        }
    });
    return TestsuiteDialog;
});
