define(function (require, exports, module) {
    const DesktopSettingDialog=require("DesktopSettingDialog");
    const Sync=require("Sync");
    const desktopSettingDialog=new DesktopSettingDialog();
    exports.confFile=function (projects) {
        const settingDir=projects.rel(".setting/");
        const confFile=settingDir.rel(".desktop");
        return confFile;
    };
    exports.init=async function (projects) {
        const settingDir=projects.rel(".setting/");
        const confFile=settingDir.rel(".desktop");
        const ide={
            ls(){},
            desktopEnv: {},
            getCurrentEditorInfo(){},
            saveDesktopEnv(){
                confFile.obj(ide.desktopEnv);
                Sync.sync(settingDir, settingDir,{v:true}).then(
                    console.log.bind(console),console.error.bind(console));
            }
        };
        exports.ide=ide;
        await Sync.sync(settingDir, settingDir,{v:true});
        if (confFile.exists()) {
            try {
                ide.desktopEnv=confFile.obj();
            } catch(e){
                console.error(e);
            }
        }
        console.log("ide.desktopEnv", ide.desktopEnv);
    };
    exports.open=async function () {
        desktopSettingDialog.show(exports.ide);
    };
});
