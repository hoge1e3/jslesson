define(["UI"],function (UI) {
    var res={};
    res.show=function (src, runURL, options) {
        options=options||{};
        window.dialogClosed=false;
        var d=res.embed(src, runURL, options);
        d.dialog({width:600,close:function(){window.dialogClosed=true;if(typeof options.toEditor == "function")options.toEditor();}});//,height:options.height?options.height-50:400});
    };
    res.embed=function (src, runURL, options) {
        if (!options) options={};
        if (!res.d) {
            res.d=UI("div",{title:"実行画面ダイアログ"},
                    ["div",{id:"browser"},
                          ["iframe",{id:"ifrmDlg",width:465,height:options.height||400,src:runURL}]
                    ],
                    ["button", {type:"button",$var:"OKButton", on:{click: function () {
                        res.d.dialog("close");
                    }}}, "OK"]
            );
        }
        $("#ifrmDlg").attr(src,runURL);
        if($("#ifrmDlg")[0]) console.log($("#ifrmDlg")[0].contentWindow.document.body);
        if($("#ifrmDlg")[0]) $("#ifrmDlg")[0].contentWindow.document.getElementById("console").style.fontSize=options.font+"px";
        var d=res.d;
        return d;
    };
    return res;
});