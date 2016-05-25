define(["UI"],function (UI) {
    var res={};
    res.show=function (src, runURL, options) {
        options=options||{};
        window.dialogClosed=false;
        var d=res.embed(src, runURL, options);
        d.dialog({width:600,close:function(){window.dialogClosed=true;}});//,height:options.height?options.height-50:400});
    };
    res.embed=function (src, runURL, options) {
        if (!options) options={};

        if (!res.d) {
            res.d=UI("div",{title:"実行画面ダイアログ"},
                    ["div",
                          ["iframe",{id:"ifrmDlg",width:465,height:options.height||400,src:runURL}]
                    ]
            );
        }
        $("#ifrmDlg").attr(src,runURL);
        var d=res.d;
        /*d.done=function () {
            opt.run.mainClass=e.mainClass.val();
            prj.setOptions(opt);
        };
        d.run=function () {
            d.done();
            prj.rawRun();
        };*/
        return d;
    };
    return res;
});