/*global global,atom,require*/
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
    function sync(path1,path2) {
        const f1=projectRoot.rel(path1);
        const f2=projectRoot.rel(path2);
        f1.watch((type,f)=>{
            console.log(type,f,f1.path());
        });
        f2.watch((type,f)=>{
            console.log(type,f,f2.path());
        });
    }
    //console.log(FS.get(projectRoot).rel("TODO.txt").text());
});

    /*fs.watch(prjRoot,(type,path)=>{
        console.log(type,path);

    });*/
