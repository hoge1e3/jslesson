/*global atom,require*/
console.log("Auto desu");
/*global.rerunit=function () {
    console.log("Auto desuka?");
    init();
};*/
//const fs=require("fs");
const dirs=atom.project.getDirectories();
console.log(dirs);
if (!dirs[0]) return;
const projectRootPath=dirs[0].path;
//const prjRoot=`${projectRoot}/TODO.txt`;
const requirejs=require(`${projectRootPath}/www/node/r.js`);
const JS=`${projectRootPath}/www/js`;
const reqConf=require(`${JS}/reqConf.js`).conf;
delete reqConf.urlArgs;
reqConf.baseUrl=JS;
requirejs.config(reqConf);

requirejs(["FS"],(FS)=> {
    const projectRoot=FS.get(projectRootPath);
    const sy=require(`${projectRootPath}/scripts/sync.js`);
    sy(sync);
    function filify(f,name) {
        if (f.isDir()) return f.rel(name);
        return f;
    }
    function sync(path1,path2) {
        const f1=projectRoot.rel(path1);
        const f2=filify(projectRoot.rel(path2), f1.name());
        function same() {
            return f1.text()===f2.text();
        }
        if (same()) {
            f1.watch(()=>{
                if (!same()) {
                    f1.copyTo(f2);
                }
            });
            f2.watch(()=>{
                if (!same()) {
                    f2.copyTo(f1);
                }
            });
        } else {
            console.warn(f1.path()+" and "+f2.path()+" are not synced. Auto-sync disabled.");
        }
    }
    //console.log(FS.get(projectRoot).rel("TODO.txt").text());
});

    /*fs.watch(prjRoot,(type,path)=>{
        console.log(type,path);

    });*/
