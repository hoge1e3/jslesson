import UI from "./../ui/UI.js";
import DA from "./../ui/DiagAdjuster.js";
class GUIDialog {
    show(params) {
        res.d=UI("div",{title:"GUIダイアログ",id:"GUIrunDlg",css:{overflow:"hidden"}},
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
    }
}