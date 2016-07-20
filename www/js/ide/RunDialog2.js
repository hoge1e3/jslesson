define(["UI","LocalBrowser"],function (UI, LocalBrowser) {
    var res={};
    res.show=function (runFile, options) {
        options=options||{};
        window.dialogClosed=false;
        var d=res.embed(runFile, options);
        d.dialog({
            width:600,
            close:function(){
                window.dialogClosed=true;
                if (res.b) res.b.close();
                if(typeof options.toEditor == "function")options.toEditor();
            }, 
            resize:function(e,u){
                console.log(u.size);
                //$("#iBrowser").css({width:u.size.width-50,height:u.size.height-120});
                if (res.b && res.b.iframe) {
                    res.b.iframe.attr({width:u.size.width-50,height:u.size.height-120});
                }
            }
        });//,height:options.height?options.height-50:400});
    };
    res.embed=function (runFile, options) {
        options=options||{};
        if (!res.d) {
            res.d=UI("div",{title:"実行画面ダイアログ"},
                    ["div",{$var:"browser"}],
                    ["button", {type:"button",$var:"OKButton", on:{click: function () {
                        res.d.dialog("close");
                    }}}, "OK"]
            );
            res.b=new LocalBrowser(res.d.$vars.browser[0],
            {id:"ifrmDlg",width:465,height:options.height||400});
        }
        res.b.open(runFile,{
            onload:function () {
                console.log(this);
                var cons=this.contentWindow.document.getElementById("console");
                if (cons) cons.style.fontSize=options.font+"px";
            }
        });
        return res.d;
    };
    return res;
});