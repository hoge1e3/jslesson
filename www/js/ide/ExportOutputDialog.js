define(function (require, exports, module) {
    const UI=require("UI");
    class ExportOutputDialog {
        dom() {
            const opt=(vname, caption)=>(["input", {type:"radio", $var: vname}, caption]);
            return UI("div",
                ["div",
                    ["div",
                        opt("dl","ダウンロード"),
                        opt("ulu","「素材管理」(user)に送信"),
                        opt("ulc","「素材管理」(class)に送信"),
                        opt("cdb","Connect DBに送信"),
                    ],
                    "ファイル名/APIキー名", ["input",{$var:"name"}]
                ],
                ["div",
                    ["textarea"]
                ]
            );
        }
        show(srcElem) {

        }
    }
    module.exports=new ExportOutputDialog();
});
