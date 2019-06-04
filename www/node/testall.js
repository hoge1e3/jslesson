/*global require, process*/
const JS="../js/";
const exec = require('child_process').exec;
const requirejs=require("./r.js");//../node_modules/requirejs/bin/r.js");
const reqConf=require(JS+"reqConf.js").conf;
delete reqConf.urlArgs;
reqConf.baseUrl=JS;
requirejs.config(reqConf);
requirejs(["FS","PythonParser","PythonSemantics","PythonGen","Python2JS"],
function (FS,PP,S,G,J) {
    const testHome=FS.get(process.cwd()).rel("test/");
    const srcHome=testHome;
    const gen=testHome.rel("gen/");
    const js=testHome.rel("js/");
    const err=testHome.rel("err/");
    const header="import bawrapper\n";
    testHome.each(pySrcF=>{
        if (!pySrcF.endsWith(".py")) return;
        console.log(pySrcF.path());
        try {
            const node=PP.parse(pySrcF);
            const v=S.check(node,pySrcF);
            const code=G(node,v.anon,S);
            const cvSrcF=gen.rel(pySrcF.relPath(srcHome));
            cvSrcF.text(header+code);
            const jscode=J(node,v.anon,{genReqJS:true,pyLibPath:"http://localhost/runtime/lib/python"});
            const jsSrcF=js.rel(pySrcF.relPath(srcHome).replace(/\.py$/,".js"));
            jsSrcF.text(jscode);

        } catch(e) {
            const pos=e.pos||(e.node && e.node.pos);
            let src=pySrcF.text();
            if (pos) {
                src=src.substring(0,pos)+"!!HERE!!"+src.substring(pos);
            }
            err.rel(pySrcF.relPath(srcHome)).text(e.stack+"\n"+src);
            console.log(e.stack);
        }

    });

});
