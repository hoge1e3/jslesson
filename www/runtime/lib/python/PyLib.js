define([],function () {
    var PL={};
    PL.print=function () {
        var a=PL.parseArgs(arguments);
        console.log("print",arguments,a);
        var end=a.options.end!=null ? a.options.end: "\n";
        PL.STDOUT.append(a.join(" ")+end);
    };
    PL.input=function (s) {
        var r=prompt(s||"");
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
        $(function () {
            var c=$("#output");
            if (c.length>0) {
                PL.STDOUT=c;
            }
        });
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
    PL.wrap=function (v) {
        var W=PL.wrappers[typeof v];
        if (!W) return v;
        return W(v);
    };
    PL.class=function (parent,defs) {
        if (arguments.length<2) {
            defs=parent;
            parent=PL.Object;
        }
        var nw=defs.__new__ || function (cls) {
            var self=Object.create(cls.prototype,{});
            return self;
        };
        var res;
        res=function () {
            var a=Array.prototype.slice.call(arguments);
            a.unshift(res);
            var self=nw.apply(null,a);
            self.__init__.apply(self,arguments);
            return self;
        };
        res.prototype=Object.create(parent.prototype,{});
        for (var k in defs) (function (k) {
            var m=defs[k];
            res.prototype[k]=function () {
                var a=Array.prototype.slice.call(arguments);
                a.unshift(this);
                return m.apply(this,a);
            };
        })(k);
        return res;
    };
    PL.invoke=function (self,name,args) {
        var m=self[name];
        if (typeof m==="function") return m.apply(self, args);
        return m.__call__.apply(m,args);
    };
    PL.Object=PL.class(Object, {
        __init__: function () {},
    });
    PL.ops={
        "+":"add",
        "-":"sub",
        "*":"mul",
        "/":"div",
        "%":"mod",
        ">":"gt",
        "<":"lt",
        ">=":"ge",
        "<=":"le",
        "!=":"ne",
        "==":"eq",
        "**":"pow",
    };
    PL.Wrapper=PL.class(PL.Object, {
        __init__: function (self,value) {self.value=value;},
        unwrap: function (self) {return self.value;},
        __call__: function (self) {
            var a=Array.prototype.slice.call(arguments,1);
            return self.unwrap().apply(self, a);
        },
        __add__: function (self,other) { return self.unwrap()+other;},
        __sub__: function (self,other) { return self.unwrap()-other;},
        __mul__: function (self,other) { return self.unwrap()*other;},
        __div__: function (self,other) { return self.unwrap()/other;},
        __mod__: function (self,other) { return self.unwrap()%other;},
        __gt__: function (self,other) { return self.unwrap()>other;},
        __lt__: function (self,other) { return self.unwrap()<other;},
        __ge__: function (self,other) { return self.unwrap()>=other;},
        __le__: function (self,other) { return self.unwrap()<=other;},
        __eq__: function (self,other) { return self.unwrap()===other;},
        __ne__: function (self,other) { return self.unwrap()!==other;},
        __pow__: function (self,other) { return Math.pow(self.unwrap(),other);},
        //____: function (self,other) { return selfother;},
    });
    PL.wrappers={
        number:PL.class(PL.Wrapper,{

        }),
        string:PL.class(PL.Wrapper,{
            __mul__: function (self,other) {
                switch (typeof other) {
                case "number":
                    var res="";
                    for (;other;other--) res+=self.unwrap();
                    return res;
                default:
                    PY.invalidOP("__mul__",other);
                }
            }
        }),
        boolean:PL.class(PL.Wrapper,{

        }),
        function:PL.class(PL.Wrapper,{

        })
    };
    PL.builtins=["range","input","str","int"];
    window.PYLIB=PL;
    return PL;
});
