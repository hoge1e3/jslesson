define(function (require, exports, module) {
    const UI=require("UI");
    const jshint=require("jshint");
    class DesktopSettingDialog {
        show(ide,options) {
            const d=this.embed(ide,options);
            this.dom=d;
            d.dialog({width:500,height:500});
        }
        embed(ide,options) {
            if (!options) options={};
            const desktopEnv=ide.desktopEnv;
            const close=()=>{
                const form=this.vars.form[0];
                desktopEnv.editorFontSize=form.editorFontSize.value-0;
                desktopEnv.showInvisibles=$(form.showInvisibles).prop("checked");
                desktopEnv.fileList=form.fileList.value;
                const prd=desktopEnv.runDialog;
                desktopEnv.runDialog=form.runDialog.value;
                if (prd!==desktopEnv.runDialog) {
                    alert("設定変更に伴い，再読み込みを行います");
                    location.reload();
                }
                ide.saveDesktopEnv();
                const ei=ide.getCurrentEditorInfo();
                if (ei) {
                    ei.editor.setFontSize(desktopEnv.editorFontSize||18);
                    ei.editor.setShowInvisibles(!!desktopEnv.showInvisibles);
                }
                ide.ls();
                this.dom.dialog("close");
            };
            if (!this.dom) {
                this.dom=UI("div",{title:"設定"},
                    ["form",{$var:"form",action:jshint.scriptURL(";")},
                        ["h3","エディタ"],
                        ["div","文字の大きさ",
                            ["input",{name:"editorFontSize",$var:"size",on:{enterkey:close}}]],
                        ["div",
                            ["input",{name:"showInvisibles",type:"checkbox",$var:"showInvisibles"}],
                            "スペースやタブを表示する"],
                        ["h3","ファイル表示"],
                        ["div",
                            ["input",{type:"radio",name:"fileList",value:"latest",$var:"fileList"}],"更新順",
                            ["input",{type:"radio",name:"fileList",value:"name",$var:"fileList"}],"名前順",
                        ],
                        ["h3","実行結果の表示位置"],
                        ["div",
                            ["input",{type:"radio",name:"runDialog",value:"dialog",$var:"runDialog"}],"ダイアログ",
                            ["input",{type:"radio",name:"runDialog",value:"split",$var:"runDialog"}],"画面下部",
                        ],
                        ["button",{on:{click:close}},"OK"]
                    ]);
                this.vars=this.dom.$vars;
            }
            const form=this.vars.form[0];
            form.editorFontSize.value=(desktopEnv.editorFontSize||18);
            $(form.showInvisibles).prop("checked", !!desktopEnv.showInvisibles);
            form.fileList.value=desktopEnv.fileList||"latest";
            form.runDialog.value=desktopEnv.runDialog||"dialog";
            return this.dom;
        }
    }
    module.exports=DesktopSettingDialog;
});
