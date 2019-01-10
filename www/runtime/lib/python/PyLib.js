define([],function () {
    var PL={};
    PL.print=function () {
        var a=PL.parseArgs(arguments);
        console.log("print",arguments,a);
        var end=a.options.end!=null ? a.options.end: "\n";
        PL.STDOUT.append(a.join(" ")+end);
    };
    PL.input=function () {
        var r=prompt();
        return r;
    };
    PL.int=function (s) {return s-0;};
    PL.str=function (s) {return s+"";};
    PL.STDOUT={
        append: function (s) {
            console.log(s);
        }
    };
    if (typeof $==="function") {
        var c=$("#console");
        if (c.length>0) {
            PL.STDOUT=c;
        }
    }
    PL.Option=function (o){
        if (!(this instanceof PL.Option)) return new PL.Option(o);
        for (var k in o) this[k]=o[k];
    };
    PL.parseArgs=function (a) {
        var res=Array.prototype.slice.call(a);
        if (res[res.length-1] instanceof PL.Option) {
            res.options=res.pop();
        } else {
            res.options={};
        }
        return res;
    };
    PL.opt=PL.Option;
    PL.range=function (b,e) {
        if (e==null) {e=b;b=0;}
        var res=[];
        for (;b<e;b++) res.push(b);
        return res;
    };
    PL.builtins=["range","input","str","int"];
    window.PYLIB=PL;
    return PL;
});
