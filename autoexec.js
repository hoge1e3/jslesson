/*global global,atom,require*/
console.log("Auto desu");
global.rerunit=function () {
    console.log("Auto desuka?");
    init();
};
const fs=require("fs");

init();
function init() {
    const dirs=atom.project.getDirectories();
    console.log(dirs);
    if (!dirs[0]) return;
    const projectRoot=dirs[0].path;
    //const prjRoot=`${projectRoot}/TODO.txt`;
    const requirejs=require(`${projectRoot}/www/node/r.js`);
    const JS=`${projectRoot}/www/js`;
    const reqConf=require(`${JS}/reqConf.js`).conf;
    delete reqConf.urlArgs;
    reqConf.baseUrl=JS;
    requirejs.config(reqConf);

    requirejs(["FS"],(FS)=> {
        console.log(FS.get(projectRoot).rel("TODO.txt").text());
    });

    /*fs.watch(prjRoot,(type,path)=>{
        console.log(type,path);

    });*/
}
function sync(path1,path2) {
    const c=fs.readSync(path1);

    fs.watch(path1, (type,path)=>{

    });
}
