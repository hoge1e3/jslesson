/* global self,global*/
define([],function () {
    // same with root.js
    function getRoot(){
        if (typeof window!=="undefined") return window;
        if (typeof self!=="undefined") return self;
        if (typeof global!=="undefined") return global;
        return (function (){return this;})();
    }
    var root=getRoot();

    var PL={};
    PL.import=function (lib) {
        if (lib==="random") {
            return {
                random: Math.random,
                randint: function (a,b) {
                    return Math.floor(Math.random()*(b-a+1))+a;
                }
            };
        }
    };
    PL.lineBuf="";
    PL.print=function () {
        var a=PL.parseArgs(arguments);
        console.log("print",arguments,a);
        var end=a.options.end!=null ? a.options.end: "\n";
        var out=a.join(" ")+end;
        PL.lineBuf+=out;
        var lines=PL.lineBuf.split("\n");
        if(lines.length>10) {
            PL.lineBuf=lines.slice(lines.length-5).join("\n");
        }
        PL.STDOUT.append($("<span>").text(out));
    };
    PL.input=function (s) {
        if (s) PL.print(s,PL.Option({end:""}));
        var r=prompt(PL.lineBuf);
        PL.LoopChecker.reset();
        PL.print(r);
        return r;
    };
    PL.len=function (s) {return s.length;};
    PL.float=function (s) {return s-0;};
    PL.int=function (s) {return s-0;};
    PL.str=function (s) {return s+"";};
    PL.quit=function (s) {PL.exit();};
    PL.exit=function (s) {
        var e=new Error("exit でプログラムが終了しました。");
        e.noTrace=true;
        throw e;
    };
    PL.type=function (s) {
        switch (typeof s) {
            case "number":
            case "string":
            case "function":
            case "boolean":
            return typeof s;
            default:
            if (s && s.__getTypeName__) return s.__getTypeName__();
            if (s && s.constructor) return s.constructor;
            return "object";
        }
    };
    PL.fillRect=function (x,y,w,h){
        var ctx=PL.CANVAS[0].getContext("2d");
        ctx.fillRect(x,y,w,h);
    };
    PL.clearRect=function(x,y,w,h){
        var ctx=PL.CANVAS[0].getContext("2d");
        ctx.clearRect(x,y,w,h);
    };
    PL.clear=function(){
        PL.clearRect(0,0,PL.CANVAS.width(),PL.CANVAS.height());
    };
    PL.setColor=function (r,g,b){
        var ctx=PL.CANVAS[0].getContext("2d");
        ctx.fillStyle="rgb("+r+","+g+","+b+")";
    };
    PL.setTimeout=function (f,t){
        setTimeout(f,t);
    };
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
        function addMethod(k) {
            var m=defs[k];
            res.prototype[k]=function () {
                var a=Array.prototype.slice.call(arguments);
                a.unshift(this);
                return m.apply(this,a);
            };
        }
        for (var k in defs) addMethod(k);
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
        "//":"floordiv",
        "%":"mod",
        ">":"gt",
        "<":"lt",
        ">=":"ge",
        "<=":"le",
        "!=":"ne",
        "==":"eq",
        "**":"pow",
    };
    PL.iops={};
    var k;
    for (k in PL.ops) {
        if (k.match(/=/)) continue;
        PL.iops[k+"="]="i"+PL.ops[k];
    }
    PL.unwrap=u;
    function u(v) {
        if (v instanceof PL.Wrapper) return v.unwrap();
        return v;
    }
    PL.Wrapper=PL.class(PL.Object, {
        __init__: function (self,value) {self.value=value;},
        unwrap: function (self) {return self.value;},
        __call__: function (self) {
            var a=Array.prototype.slice.call(arguments,1);
            return self.unwrap().apply(self, a);
        },
        toString: function (self) {return self.value+"";},
        __add__: function (self,other) { return self.unwrap()+u(other);},
        __sub__: function (self,other) { return self.unwrap()-u(other);},
        __mul__: function (self,other) { return self.unwrap()*u(other);},
        __div__: function (self,other) { return self.unwrap()/u(other);},
        __floordiv__: function (self,other) { return Math.floor(self.unwrap()/u(other));},
        __mod__: function (self,other) { return self.unwrap()%u(other);},
        __gt__: function (self,other) { return self.unwrap()>u(other);},
        __lt__: function (self,other) { return self.unwrap()<u(other);},
        __ge__: function (self,other) { return self.unwrap()>=u(other);},
        __le__: function (self,other) { return self.unwrap()<=u(other);},
        __eq__: function (self,other) { return self.unwrap()===u(other);},
        __ne__: function (self,other) { return self.unwrap()!==u(other);},
        __pow__: function (self,other) { return Math.pow(self.unwrap(),u(other));},

        __iadd__: function (self,other) { self.value=self.unwrap()+u(other);return self;},
        __isub__: function (self,other) { self.value=self.unwrap()-u(other);return self;},
        __imul__: function (self,other) { self.value=self.unwrap()*u(other);return self;},
        __idiv__: function (self,other) { self.value=self.unwrap()/u(other);return self;},
        __ifloordiv__: function (self,other) { self.value=Math.floor(self.unwrap()/u(other));return self;},
        __imod__: function (self,other) { self.value=self.unwrap()%u(other);return self;},
        __ipow__: function (self,other) { self.value=Math.pow(self.unwrap(),u(other));return self;},

        //____: function (self,other) { return selfother;},
    });
    PL.wrappers={
        number:PL.class(PL.Wrapper,{
            __getTypeName__: function (){return "<class number>";},
        }),
        string:PL.class(PL.Wrapper,{
            __getTypeName__: function (){return "<class str>";},
            __mul__: function (self,other) {
                switch (typeof other) {
                case "number":
                    var res="";
                    for (;other;other--) res+=self.unwrap();
                    return res;
                default:
                    PL.invalidOP("__mul__",other);
                }
            }
        }),
        boolean:PL.class(PL.Wrapper,{
            __getTypeName__: function (){return "<class boolean>";},

        }),
        function:PL.class(PL.Wrapper,{
            __getTypeName__: function (){return "<class function>";},

        })
    };
    PL.invalidOP=function (op,to) {
        throw new Error("Cannot do opration "+op+" to "+to);
    };
    PL.LoopChecker={
        check: function () {
            if (this.last) {
                var now=new Date().getTime();
                if (now-this.last>5000) {
                    throw new Error("無限ループをストップしました");
                }
            }
        },
        reset: function () {
            this.last=new Date().getTime();
        }
    };
    PL.builtins=["range","input","str","int","float","len","type","quit","exit",
    "fillRect","setColor","setTimeout","clearRect","clear"];
    root.PYLIB=PL;
    return PL;
});
