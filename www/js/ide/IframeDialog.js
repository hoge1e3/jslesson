define(["UI","DiagAdjuster"],
function (UI ,DA) {
    var res={};
    res.show=function (url, options) {
        options=options||{};
        options.height=options.height||600;
        options.width=options.width||16*((options.height+10)/9);
        if (options.window && !options.window.closed) {
            options.window.location.href=url;
            return;
        }
        window.dialogClosed=false;
        var d=res.embed(url, options);
        console.log("IframeDialog options",options);
        d.dialog({
            width:options.width,
            height:options.height,
            position: { my: "center top", at: "right bottom"},
            close:function(){
                window.dialogClosed=true;
                //if (res.b) res.b.close();
                if(typeof options.toEditor == "function")options.toEditor();
            },
            resize:handleResize
        });//,height:options.height?options.height-50:400});
        setTimeout(function () {
            try {
                if (!res.iframe[0].contentWindow.onerror) res.iframe[0].contentWindow.onerror=window.onerror;
            } catch(e) {
                console.log(e);
            }
        },100);
        handleResize();
        function handleResize() {
            if (res.da) {
                res.da.handleResize();
            }
        }
    };
    res.close=function () {
        if (!res.d)return;
        res.d.dialog("close");
    };
    res.embed=function (url, options) {
        res.url=url;
        options=options||{};
        if (!res.d) {
            res.d=UI("div",{title:"実行画面ダイアログ",id:"runDlg",css:{overflow:"hidden"}},
                    ["div",{$var:"browser"},
                        ["iframe",{$var:"iframe",src:url}]
                    ],
                    ["button", {type:"button",$var:"OKButton", on:{click: function () {
                        res.d.dialog("close");
                    }}}, "閉じる"],
                    (["button", {type:"button",$var:"WButton", on:{click: function () {
                        if (res.window && !res.window.closed) res.window.close();
                        res.window=window.open(res.url,"LocalBrowserWindow"+Math.random(),"menubar=no,toolbar=no,width=500,height=500");
                        if (!res.window.onerror) res.window.onerror=window.onerror;
                    }}}, "別ウィンドウ"])
            );
            res.iframe=res.d.$vars.iframe;
            res.da=new DA(res.d);
            res.da.afterResize=function (d) {
                if (res.iframe) {
                    res.iframe.attr({
                        width:d.width(),
                        height:d.height()-res.d.$vars.OKButton.height()});
                }
            };
        } else {
            try {
                res.iframe[0].contentWindow.location.href=url;
            } catch(e) {
                res.iframe.attr({src:url});
            }
        }
        setTimeout(function () {
            res.iframe.focus();
        },100);
        //if (res.da) res.da.handleResize();
        return res.d;
    };
    return res;
});
