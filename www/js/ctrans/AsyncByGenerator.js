/*global self,global*/
//define([],function () {
(function () {
    function F(f) {
        var src=f+"";
        var argsp=/^function\s*\(([^\)]+)\)/;
        var args=argsp.exec(src)[1].replace(/\s/g,"").split(",");
        var bodyp=/\/\*---((\n|\r|.)*)---\*\//;
        try {
            return Function.apply(null, args.concat([ bodyp.exec(src)[1] ]));
        } catch (e) {
            return f;
        }
    }
    // same with root.js
    function getRoot(){
        if (typeof window!=="undefined") return window;
        if (typeof self!=="undefined") return self;
        if (typeof global!=="undefined") return global;
        return (function (){return this;})();
    }
    var root=getRoot();

    var AsyncByGenerator=root.AsyncByGenerator={
        doReady: function () {
           this.isReady=true;
           if (this.onReady) {
               this.onReady();
           }
        },
        ready: function (f) {
            if (this.isReady) {
                f();
            } else {
                this.onReady=f;
            }
        },
        isPromise: function isPromise(v) {
            return (typeof Promise==="function") && (v instanceof Promise);//(v && typeof v.then==="function");
        },
        isGenerator: function isGenerator(v) {
            return v &&
                ((typeof Symbol==="function" && v[Symbol.toStringTag]==="Generator") ||
                    (this.GeneratorFunction &&
                    this.GeneratorFunction.prototype.isPrototypeOf(v))
                );
        },
        init: function () {
            try {
                var f=new Function("this.GeneratorFunction = ((function*(){})()).constructor;");
                f.call(this);
                this.supportsGenerator=true;
            } catch(e) {
                this.supportsGenerator=false;
            }
            console.log("ABG",this.supportsGenerator);
            this.doReady();
        },
        run: function (it) {
            var t=this;
            while(true) {
                var n;
                try {
                    n=it.next();
                } catch(e) {
                    return Promise.reject(e);
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
                        return Promise.resolve(n.value);
                    }
                }
            }
        },
        toGen: F(function (v) {
            /*---
            if (this.isPromise(v)) {
                var res;
                var p=v.then(function (r) {
                    res=r;
                });
                return (function*() {yield p;return res;})();
            } else if (this.isGenerator(v)) {
                return v;
            }
            return (function*(){return v;})();
            ---*/
        }),
        toVal: F(function (gen) {
            /*---
            var n=gen.next();
            if (n.done) return n.value;
            return (function*() {
                while(true) {
                    yield n.value;
                    n=gen.next();
                    if (n.done) return n.value;
                }
            })();
            ---*/
        })
    };
    root.AsyncByGenerator.init();
    /*var text="return (function*(){});";
    try{
        (new Function(text))();
        requirejs(["AsyncByGeneratorRaw"],function (){
            console.log("ABG loaded");
            AsyncByGenerator.doReady();
        });
    }catch(e) {
        AsyncByGenerator.supportsGenerator=false;
        AsyncByGenerator.doReady();
    }*/
    return root.AsyncByGenerator;
})();
