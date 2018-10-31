define(["UI","Klass"],function (UI,Klass) {
    var res={};
    CommentDialog2=Klass.define({
        $this: "t",
        $: ["prj"],
        getComment: function (t,file) {
            var path=t.prj.getDir().name()+file.name();
            return $.get(WebSite.controller+"?Mark/getLast&file="+path+"&p="+Math.random()).then(function (r) {
                if (typeof r==="string") r=JSON.parse(r);
                if (!r.result) return null;
                return r;
            });
        },
        show: function (t,r) {
            t.createDOM();
            if (!r) return;
            t.result.text(r.result);
            t.comment.val(r.comment);
            t.dom.dialog({width:600});
        },
        createDOM: function (t) {
            if (t.dom) return t.dom;
            t.dom=UI("div",{title:"採点結果"},
                ["div",{$var:"result"}],
                ["textarea",{$var:"comment",rows:20,cols:60,readonly:true}]
            );
            t.result=t.dom.$vars.result;
            t.comment=t.dom.$vars.comment;
            return t.dom;
        }
    });
    return CommentDialog2;
});
