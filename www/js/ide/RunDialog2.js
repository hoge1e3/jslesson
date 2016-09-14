define(["UI","LocalBrowser","DiagAdjuster"],
function (UI, LocalBrowser,DA) {
    var res={};
    res.show=function (runFile, options) {
        options=options||{};
        options.height=options.height||600;
        window.dialogClosed=false;
        var d=res.embed(runFile, options);
        d.dialog({
            width:16*((options.height+10)/9),
            position: { my: "center top", at: "right bottom"},
            //width:600,
            close:function(){
                window.dialogClosed=true;
                if (res.b) res.b.close();
                if(typeof options.toEditor == "function")options.toEditor();
            }, 
            resize:handleResize
        });//,height:options.height?options.height-50:400});
        handleResize();
        function handleResize() {
            if (res.b/* && res.b.iframe*/) {
                res.b.resize(d.width(),d.height()-d.$vars.OKButton.height());
                /*res.b.iframe.attr({
                    width:d.width(),
                    height:d.height()-d.$vars.OKButton.height()});*/
            }
        }
    };
    res.embed=function (runFile, options) {
        options=options||{};
        if (!res.d) {
            res.d=UI("div",{title:"実行画面ダイアログ",css:{overflow:"hidden"}},
                    ["div",{$var:"browser"}],
                    ["button", {type:"button",$var:"OKButton", on:{click: function () {
                        res.d.dialog("close");
                    }}}, "閉じる"]
            );
            res.da=new DA(res.d);
            res.da.afterResize=function (d) {
                if (res.b && res.b.iframe) {
                    res.b.iframe.attr({
                        width:d.width(),
                        height:d.height()-res.d.$vars.OKButton.height()});
                }
            };
            res.b=new LocalBrowser(res.d.$vars.browser[0],{
                id:"ifrmDlg",
                width:400,
                height:400
            });
        }
        setTimeout(function () {
            res.b.focus();
        },100);
        res.b.open(runFile,{
            onload:function () {
                console.log(this);
                var cons=this.contentWindow.document.getElementById("console");
                if (cons) cons.style.fontSize=options.font+"px";
            }
        });
        //if (res.da) res.da.handleResize();
        return res.d;
    };
    return res;
});