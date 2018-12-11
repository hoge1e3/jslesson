const JS="../js/";
const exec = require('child_process').exec;
const requirejs=require("./r.js");//../node_modules/requirejs/bin/r.js");
const reqConf=require(JS+"reqConf.js").conf;
delete reqConf.urlArgs;
reqConf.baseUrl=JS;
requirejs.config(reqConf);
requirejs(["FS","PythonParser","PythonSemantics"],function (FS,PP,S) {

    /*
    var c=FS.get(process.cwd());
    console.log(c.ls());
    var fl=c.listFiles();
    console.log(fl.map((f)=>f.name()));
    var f=c.rel("test.py");
    console.log(f.path(),f.text());*/
    var pySrcPath=process.argv[2];
    var pySrcF;
    if (FS.PathUtil.isAbsolute(pySrcPath)) {
        pySrcF=FS.get(pySrcPath);
    } else {
        pySrcF=FS.get(process.cwd()).rel(pySrcPath);
    }
    try {
        var node=PP.parse(pySrcF);
        S.check(node,pySrcF);
        //console.log("Passed",'python '+pySrcF.path());
        exec('python '+pySrcF.path(), (err, stdout, stderr) => {
            if (err) { console.error(err); }
            console.error(stderr);
            console.log(stdout);
        });
    } catch(e) {
        if (e.noTrace) {
            console.error(e.message);
        } else {
            throw e;
        }
    }

});
