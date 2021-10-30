/*global require, process*/
const ngword=null; // /\b(open|eval|getattr|setattr|sys|os)\b/;
//const ngword=/\b(breakpoint|compile|exec|globals|__builtins__|subprocess|pathlib|glob|open|eval|getattr|setattr|sys|os)\b/;  // special-change
const JS="../js/";
const exec = require('child_process').exec;
const requirejs=require("./r.js");//../node_modules/requirejs/bin/r.js");
const reqConf=require(JS+"reqConf.js").conf;
delete reqConf.urlArgs;
reqConf.baseUrl=JS;
requirejs.config(reqConf);
requirejs(["FS","PythonParser","PythonSemantics","PythonGen"],
function (FS,PP,S,G) {
// ps -ax|grep python|wc
    var pySrcPath=process.argv[2];
    var pySrcF,cvSrcF;
    if (FS.PathUtil.isAbsolute(pySrcPath)) {
        pySrcF=FS.get(pySrcPath);
    } else {
        pySrcF=FS.get(process.cwd()).rel(pySrcPath);
    }
    var workd=pySrcF.up();
    var conf=workd.rel("config.json").obj();
    var isSuper=!!conf.super;
    var header="",lineAdjust=0;
    if (!isSuper) {
        header="import bawrapper\n";
        lineAdjust=1;
    }
    cvSrcF=workd.rel("conv.py");
    try {
        var node;
        if (!isSuper) {
            node=PP.parse(pySrcF);
            var v=S.check(node,pySrcF);
            var code=G(node,v.anon,S);
            cvSrcF.text(header+code);
            //console.log("GCode",code);
        } else {
            cvSrcF=pySrcF;
            if (ngword) {
                if (ngword.exec(cvSrcF.text())) {
                    throw new Error("このプログラムはセキュリティの都合上実行できません．");
                }
            }

        }
        process.env.PYTHONPATH=process.cwd()+(process.cwd().indexOf("\\")>=0?";":":")+process.env.PYTHONPATH;
        //process.env.BAASSETPATH=asset;
        //console.log("Passed",'python '+pySrcF.path());
        process.chdir(workd.path());
        //console.log("pythonpath", process.env.PYTHONPATH);
        //console.log("work dir", workd.path());
        var stdin=workd.rel("stdin.txt");
        var pre=Promise.resolve();
        if (!stdin.exists()) {
            pre=stdin.text("\n\n\n\n\n\n\n\n\n");
        }
        pre.then(()=>{
            //console.log(workd.rel("stdin.txt").exists());
            //exec('python3.5 "'+cvSrcF.path()+'" < stdin.txt ', (err, stdout, stderr) => {// special-change
            exec('python "'+cvSrcF.path()+'" < stdin.txt ', (err, stdout, stderr) => {
                //if (err) { console.log(err+""); }
                var mesg=stderr+"";
                mesg=mesg.replace(/line ([0-9]+)/g,function (r,ln) {
                    return "line "+(ln-lineAdjust);
                });
                console.log(trimLines(stdout));
                console.log(mesg);
            });
        });
    } catch(e) {
        if (e.noTrace) {
            //console.log(e);
            console.error(e.message);
        } else {
            console.log(e);
            throw e;
        }
    }

});
function trimLines(str) {
    // RunPythonController  system_ex stalls with too long lines
    return str.split("\n").map(line=>line.substring(0,1024)).join("\n");
}
