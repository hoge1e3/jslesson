({
    name: 'pyRun',
    out: 'gen/pyRun_concat.js',
    optimize:"none",
    baseUrl: ".",
    wrap: {
        startFile: "requireSimulator2_head.js.txt",
        endFile: "requireSimulator2_tail.js.txt"
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
/*newVer=function () {var da=new Date();
var fn=""+da.getFullYear()+dec(da.getMonth()+1)+dec(da.getDate())+
dec(da.getHours())+dec(da.getMinutes())+dec(da.getSeconds());return fn;
function dec(v,n) {v="0"+v;return v.substring(v.length-2)}*/
