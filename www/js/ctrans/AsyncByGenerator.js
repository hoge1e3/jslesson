(function (f) {
    var text=(f+"").replace(/^function.*\/\*/,"").replace(/\*\/\}$/,"");
    try{
        (new Function(text))();
    }catch(e) {
    }
})(function (){/*
AsyncByGenerator={
    isPromise: function isPromise(v) {
        return (v && typeof v.then==="function");
    },
    isGenerator: function isGenerator(v) {
        return this.GeneratorFunction.prototype.isPrototypeOf(v);
    },
    init: function () {
        try {
            f=new Function("this.GeneratorFunction = ((function*(){})()).constructor;");
            f.call(this);
            this.supportsGenerator=true;
        } catch (e) {
        }
    },
    run: function (it) {
        var t=this;
        while(true) {
            var n=it.next();
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
        return (function*(){yield v;})();
    }
};
AsyncByGenerator.init();
*/});

