/* global requirejs*/
(function () {
    var BitArrow=window.BitArrow;
    var R=window.runtimePath=BitArrow.runtimePath;
    var libs=["jquery-1.12.1","AsyncByGenerator"].map(function (n) {
        return R+"lib/"+n+".js";
    });
    function mapDtl(n) {
        return R+"lib/dtl/"+n+".js";
    }
    function mapDtlNoJS(n) {
        return R+"lib/dtl/"+n;
    }
    var dtlPreLibs=["promise","mt","lib","polyk","calibration"].map(mapDtl);
    dtlPreLibs.push("minimal");
    var dtlLibs=["devicemotion","Dict","Vec2","Actor","Group","UI","Color","Timer",
    "Util","Turtle","Figure","DOM","TextFile","Japanese2","db"].map(mapDtl).map(function (e) {
        return [e];
    });
    requirejs.config({
        shim: {
            minimal: {
                deps: ["Parser","ExpressionParser","context"]
            },
            ExpressionParser: {
                deps: ["Parser"]
            }
        },
        paths: {
            Parser: mapDtlNoJS("parser"),
            minimal: mapDtlNoJS("minimal"),
            ExpressionParser: mapDtlNoJS("ExpressionParser"),
            context: mapDtlNoJS("context")
        }
    });
    var allLibs=[libs,dtlPreLibs].concat(dtlLibs);
    //console.log(allLibs);
    function load(i) {
        if (i>=allLibs.length) return done();
        requirejs(allLibs[i],function () {
            load(i+1);
        });
    }
    load(0);
    function done() {
        window.onerror=window.onerror||function (e) {alert(e);};
        window.$(function () {
            $("head").append($("<link>").attr({"rel":"stylesheet","href":R+"css/run_style.css"}));
        });
        requirejs([BitArrow.main], function () {
        });
    }
})();
