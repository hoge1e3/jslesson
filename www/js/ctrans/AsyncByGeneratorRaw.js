define([],function (){
function ex(d,s) {for(var k in s) d[k]=s[k];}
ex(AsyncByGenerator,{
    isPromise: function isPromise(v) {
        return (v && typeof v.then==="function");
    },
    isGenerator: function isGenerator(v) {
        return v && 
            ((typeof Symbol==="function" && v[Symbol.toStringTag]==="Generator") ||
                this.GeneratorFunction.prototype.isPrototypeOf(v));
    },
    init: function () {
        f=new Function("this.GeneratorFunction = ((function*(){})()).constructor;");
        f.call(this);
        this.supportsGenerator=true;
    },
    run: function (it) {
        var t=this;
        while(true) {
            var n;
            try {
                n=it.next();
            } catch(e) {
                return new Promise(function (succ,fail) {
                    fail(e);
                });
            }
            if (this.isPromise(n.value)) {
                if (n.done) {
                    return n.value;
                } else {
                    return n.value.then(function () {
                        return t.run(it);
                    });
                }
            } else {
                if (n.done) {
                    return new Promise(function (succ) {
                        succ(n.value);
                    });
                }
            }
        }  
    },
    toGen: function (v) {
        if (this.isPromise(v)) {
            var res;
            var p=v.then(function (r) {
                res=r;
            });
            return (function*() {yield p;return res;})();
        } else if (this.isGenerator(v)) {
            return v;
        }
        return (function*(){/*console.log("toGen",v);*/return v;})();
    }
});
AsyncByGenerator.init();
return AsyncByGenerator;
});

