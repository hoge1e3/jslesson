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
    const js=testHome.rel("../../pyjstest/");
    const err=testHome.rel("err/");
    const header="from bawrapper import *\n";
    testHome.each(pySrcF=>{
        if (!pySrcF.endsWith(".py")) return;
        console.log(pySrcF.path());
        try {
            const cvSrcF=gen.rel(pySrcF.relPath(srcHome));
            const jsSrcF=js.rel(pySrcF.relPath(srcHome).replace(/\.py$/,".js"));
            if (cvSrcF.exists()) cvSrcF.rm();
            if (jsSrcF.exists()) jsSrcF.rm();
            const node=PP.parse(pySrcF);
            const v=S.check(node,pySrcF);
            const code=G(node,v.anon,S);
            cvSrcF.text(header+code);
            const jscode=J(node,v.anon,{genReqJS:true,pyLibPath:"http://localhost/runtime/lib/python"});
            jsSrcF.text(jscode);

        } catch(e) {
            const pos=e.pos||(e.node && e.node.pos);
            let src=pySrcF.text().replace(/\r/g,"");
            if (pos) {
                src=src.substring(0,pos)+"!!HERE!!"+src.substring(pos);
            }
            err.rel(pySrcF.relPath(srcHome)).text(e.stack+"\n"+src);
            console.log(e.stack);
        }

    });
    let files=js.listFiles().filter((f)=>f.ext()===".js").map(f=>f.name());
    js.rel("files.json").obj(files);
    console.log(`Test Python: goto ${gen.path()} and run ALL.bat `);
    console.log(`Test JS: goto http://localhost/pyjstest/runall.html`);
    console.log("Then:")
    console.log("python comparable.py test/gen/output.json pyres_{branch}.txt");
    console.log("python comparable.py ../pyjstest/output.json jsres_{branch}.txt");
    console.log("diff pyres.txt jsres.txt");
});
