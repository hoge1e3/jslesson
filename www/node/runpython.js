/*global require, process*/
const ngword=null; // /\b(open|eval|getattr|setattr|sys|os)\b/;
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
    /*
    var c=FS.get(process.cwd());
    console.log(c.ls());
    var fl=c.listFiles();
    console.log(fl.map((f)=>f.name()));
    var f=c.rel("test.py");
    console.log(f.path(),f.text());*/
    var pySrcPath=process.argv[2];
    /*var isSuper=!!(process.argv[3]-0);
    var work=process.argv[4];
    var asset=process.argv[5];*/
    //console.log("work",process.argv);
    //return;

    //var workd=FS.get(work);
    var pySrcF,cvSrcF;
    if (FS.PathUtil.isAbsolute(pySrcPath)) {
        pySrcF=FS.get(pySrcPath);
    } else {
        pySrcF=FS.get(process.cwd()).rel(pySrcPath);
    }
    var workd=pySrcF.up();
    var conf=workd.rel("config.json").obj();
    var isSuper=!!conf.super;
    //var asset=conf.sharedAsset;
    //console.log("sp,a=",isSuper, asset);
    //var headerF=FS.get(process.cwd()).rel("header.py");
    var header="",lineAdjust=0;
    if (!isSuper) {
        header="import bawrapper\n";
        lineAdjust=1;
    }
    /*if (headerF.exists() && !isSuper) {
        header=headerF.text();
        header=header.replace(/\n$/,"");
        lineAdjust=header.split("\n").length;
        header+="\n";
    }*/

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
        var stdin=workd.rel("stdin.txt");
        var pre=Promise.resolve();
        if (!stdin.exists()) {
            pre=stdin.text("\n\n\n\n\n\n\n\n\n");
        }
        pre.then(()=>{
            //console.log(workd.rel("stdin.txt").exists());
            exec('python "'+cvSrcF.path()+'" < stdin.txt ', (err, stdout, stderr) => {
                //if (err) { console.log(err+""); }
                var mesg=stderr+"";
                mesg=mesg.replace(/line ([0-9]+)/g,function (r,ln) {
                    return "line "+(ln-lineAdjust);
                });
                console.log(mesg);
                console.log(stdout);
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
