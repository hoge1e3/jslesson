({
    name: 'FS',
    out: 'gen/FS.js',
    optimize:"none",
    baseUrl: ".",
    paths: (function () {
        var conf=nodeRequire(process.cwd()+"/reqConf.js");
        return conf.conf.paths;
     })(),
    shim: (function () {
        var conf=nodeRequire(process.cwd()+"/reqConf.js");
        return conf.conf.shim;
     })()
})
