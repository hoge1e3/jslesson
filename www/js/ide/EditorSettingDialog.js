define(function (require, exports, module) {
    const UI=require("UI");
    class EditorSettingDialog {
        show(ide,options) {
            const d=this.embed(ide,options);
            this.dom=d;
            d.dialog({width:600});
        }
        embed(ide,options) {
            if (!options) options={};
            const desktopEnv=ide.desktopEnv;
            const close=()=>{
                desktopEnv.editorFontSize=this.vars.size.val()-0;
                desktopEnv.showInvisibles=this.vars.showInvisibles.prop("checked");
                ide.saveDesktopEnv();
                const ei=ide.getCurrentEditorInfo();
                if (ei) {
                    ei.editor.setFontSize(desktopEnv.editorFontSize||18);
                    ei.editor.setShowInvisibles(!!desktopEnv.showInvisibles);
                }
                this.dom.dialog("close");
            };
            if (!this.dom) {
                this.dom=UI("div",{title:"エディタの設定"},
                    ["div","文字の大きさ",["input",{$var:"size",on:{enterkey:close}}]],
                    ["div",["input",{type:"checkbox",$var:"showInvisibles"}],"スペースやタブを表示する"],
                    ["button",{on:{click:close}},"OK"]
                );
                this.vars=this.dom.$vars;
            }
            this.vars.size.val(desktopEnv.editorFontSize||18);
            this.vars.showInvisibles.prop("checked", !!desktopEnv.showInvisibles);
            return this.dom;
        }
    }
    module.exports=EditorSettingDialog;
});
