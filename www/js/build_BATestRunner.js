/*global nodeRequire, process*/
({
    name: 'test/BATestRunner',
    out: 'gen/BARunner.js',
    optimize:"none",
    baseUrl: ".",
    wrap: {
        startFile: "requireSimulator2_head.js.txt",
        end: `
    //-----------
    var resMod;
    requirejs(["test/BATestRunner"], function (r) {
        resMod=r;
    });
    if (typeof window!=="undefined" && window.BARunner===undefined) window.BARunner=resMod;
    if (typeof module!=="undefined") module.exports=resMod;
    return resMod;
})(window);
`
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
