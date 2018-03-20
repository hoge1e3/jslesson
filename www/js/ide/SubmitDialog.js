define(["UI","Klass","DeferredUtil"],
function (UI,Klass,DU){
    var SubmitDialog=Klass.define({
        $this:"t",
        $: function (t,prj) {
            t.prj=prj;
        },
        show: function (t,file) {
            t.dom=t.dom||t.createDOM();
            t.dom.dialog();
            var path=t.prj.getDir().name()+file.name();
            return $.get(WebSite.controller+"?Assignment/list").
            then(function (r) {
                console.log("Assignment/list",r);
                r.forEach(function (e) {
                    if (typeof e.files==="string") e.files=JSON.parse(e.files);
                    if (e.files[path]) e.ord=0;
                    else e.ord=1;
                });
                r=r.sort(function (a,b) {
                    var c=a.ord-b.ord;
                    if (c!=0) return c;
                    return (a.name>b.name ? 1:-1);
                });
                console.log(r);
                r.forEach(function (n) {

                    $(t.form.name).append(
                        UI("option",{value:n.name},n.name)
                    );
                });
                t.form.file.value=path;
            }).catch(DU.E);
        },
        createDOM:function (t) {
            t.dom=UI("div",{title:"課題の提出"},
            ["form",{action:"javascript:;",$var:"form"},
                ["div",
                    ["label",{for:"name"},"課題名"],
                    ["select",{name:"name"}],
                ],
                ["div",
                    ["label",{for:"file"},"ファイル名"],
                    ["input",{name:"file"}],
                ],
                ["div",
                    ["input",{type:"submit",name:"button",
                    on:{click:t.$bind.submit}},"提出"]
                ],
            ]);
            t.form=t.dom.$vars.form[0];
            return t.dom;
        },
        submit: function (t) {
            var param={};
            var names=["name","file"];
            names.forEach(function (name) {
                param[name]=t.form[name].value;
            });
            var fobj=t.prj.getDir().up().rel(param.file);
            console.log(fobj.path());
            param.files={};
            param.files[param.file]=fobj.text();
            delete param.file;
            param.files=JSON.stringify(param.files);
            console.log("submit",param);
            $.get(WebSite.controller+"?Assignment/submit",param).then(function (r) {
                if (typeof r=="string") {
                    r=JSON.parse(r);
                }
                console.log(r);
                alert("提出しました");
            }).catch(DU.E);
        }
    });
    return SubmitDialog;
});
