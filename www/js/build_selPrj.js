({
    name: 'jsl_selProject',
    out: 'gen/selPrj_concat.js',
    optimize:"none",
    baseUrl: ".",
    wrap: {
        startFile: "func_head.txt",
        endFile: "func_tail.txt"
    },
    paths: (function () {
        var conf=nodeRequire(process.cwd()+"/reqConf.js");
        return conf.conf.paths;
     })(),
    shim: (function () {
        var conf=nodeRequire(process.cwd()+"/reqConf.js");
        return conf.conf.shim;
     })()
})
