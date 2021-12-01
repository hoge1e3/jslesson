/* global self,global*/
define(function (require,exports,module) {
    //var PyX=require("./PyX.js");
    // same with root.js
    function getRoot(){
        if (typeof window!=="undefined") return window;
        if (typeof self!=="undefined") return self;
        if (typeof global!=="undefined") return global;
        return (function (){return this;})();
    }
    var root=getRoot();
    //test!!
    var PL={};
    PL.import=function (lib) {
        if (PL.import.libs[lib]) return PL.import.libs[lib];
        throw new Error("ライブラリ "+lib+" はインポートできません．(サーバで実行すると動作する可能性があります)");
    };
    // It seems to be old: add to PythonSemantics and create runtime/lib/python/py_***.js
    PL.import.libs={
        random:{
            random: Math.random,
            randrange: function (...args) {
                return this.choice(PL.range(...args));
            },
            randint: function (a,b) {
                return Math.floor(Math.random()*(b-a+1))+a;
            },
            shuffle: function (list) {
                for (let i=list.length-1; i>=0 ;i--) {
                    const e=list.splice(this.randint(i),1);
                    list.push(e[0]);
                }
                return list;
            },
            sample: function (list) {
                return this.shuffle(list.slice());
            },
            choice: function (seq) {
                return seq[this.randint(0,seq.length-1)];
            }
        },
        math:{
            fabs:Math.abs.bind(Math),
            ceil:Math.ceil.bind(Math),
            floor:Math.floor.bind(Math),
            sqrt:Math.sqrt.bind(Math),
        }
    };
    //PyX.install(PL);
    PL.lineBuf="";
    PL.print=function () {
        var a=PL.parseArgs(arguments);
        console.log("print",arguments,a);
        var end=a.options.end!=null ? a.options.end: "\n";
        if (typeof u(end)!=="string") {
            throw new Error("endには文字列を指定してください");
        }
        var out=a.map(PL.str).join(" ")+end;
        PL.lineBuf+=out;
        var lines=PL.lineBuf.split("\n");
        if(lines.length>10) {
            PL.lineBuf=lines.slice(lines.length-10).join("\n");
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
    PL.int=function (s) {return parseInt(s-0);};
    PL.list=(iter)=>{
        const res=[];
        for (let x in iter) res.push(x);
        return res;
    };
    PL.listComprehension=(elem, gen)=>{
        const res=[];
        for (let e of gen) res.push(elem(e));
        return res;
    };
    PL.str=function (s) {
        //  s==false
        if (s!=null && s.__str__) return s.__str__();// __OP__
        return s+"";
    };
    PL.sum=function (s,init=0) {
        for (let e of s) {
            init=init.__add__(e); // __OP__
        }
        return init;
    };
    PL.abs=function (s) {
        return Math.abs(s);
    };
    PL.min=function (...args) {
        if (args[0][Symbol.iterator]) {
            return Math.min(...Array.from(args[0]));
        }
        return Math.min(...args);
    };
    PL.max=function (...args) {
        if (args[0][Symbol.iterator]) {
            return Math.max(...Array.from(args[0]));
        }
        return Math.max(...args);
    };
    PL.open=function () {throw new Error("openを使うには，「サーバで実行」を選んでください．");};
    PL.quit=function (s) {PL.exit();};
    PL.exit=function (s) {
        var e=new Error("exit でプログラムが終了しました。");
        e.noTrace=true;
        throw e;
    };
    PL.type=function (s) {
        switch (typeof s) {
            case "number":return Number;
            case "string":return String;
            case "function":return Function;
            case "boolean":return Boolean;
            default:
            //if (s && s.__getTypeName__) return s.__getTypeName__();
            if (s && s.__class__) return s.__class__;
            return "object";
        }
    };
    PL.isinstance=function (obj,klass) {
        const ocl=obj && obj.__class__;
        return !!ocl &&
        (ocl===klass ||
            PL.isinstance(Object.getPrototypeOf(ocl.prototype),klass)
        );
    };
    PL.sorted=function (a) {
        return a.slice().sort();
    };
    PL.loop_start2=function loop_start2(){
        //if (_global.parent) _global.parent.dialogClosed=false;
        PL.startTime=new Date().getTime();
    };
    PL.loop_chk2=function loop_chk2() {
        if (root.parent && root.parent.dialogClosed) {
            var e=new Error("ダイアログが閉じられたので実行を停止しました");
            e.type="dialogClosed";
            throw e;
        }
        var now=new Date().getTime();
        if (now-PL.startTime>5000) {
            //console.log(_global.parent, _global.opener);
            var b=confirm("ループが５秒以上続いています。\n実行を停止するにはOKを押してください。");
    	    if(b){throw new Error("実行を停止しました。");}
    		else PL.loop_start2();
        }
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
    PL.parseArgs2=function(arg, spec) {
        // spec: [{name:  , defval: }]
        arg=Array.prototype.slice.call(arg);
        let opt=null;
        if (arg[arg.length-1] instanceof PL.Option) {
            opt=arg.pop();
        }
        const res=spec.map((s,i)=>
            i<arg.length ? arg[i] :
            (opt && opt[s.name]!==undefined) ? opt[s.name] : s.defval
        );
        return res;
    };

    PL.opt=PL.Option;
    PL.range=function (b,e,s=1) {
        if (e==null) {e=b;b=0;}
        if (typeof b!=="number") throw new Error("rangeの引数には数値を指定してください");
        if (typeof e!=="number") throw new Error("rangeの引数には数値を指定してください");
        if (typeof s!=="number") throw new Error("rangeの引数には数値を指定してください");
        var res=[];
        for (; s>0&&b<e || s<0&&b>e ;b+=s) res.push(b);
        return res;
    };
    PL.wrap=function (v) {
        return v;
    };
    PL.class=function (parent,defs) {
        if (arguments.length<2) {
            defs=parent;
            parent=PL.Object||Object;
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
            if (self.__init__) self.__init__.apply(self,arguments);
            return self;
        };
        res.prototype=Object.create(parent.prototype,{});
        const methodNames=[];
        function addMethod(k) {
            var m=defs[k];
            if (typeof m==="function") {
                /*res.prototype[k]=function () {
                    var a=Array.prototype.slice.call(arguments);
                    a.unshift(this);
                    return m.apply(this,a);
                }; ^ this cannot override in subclasses */
                Object.defineProperty(res.prototype,k,{
                    value: function () {
                        var a=Array.prototype.slice.call(arguments);
                        a.unshift(this);
                        return m.apply(this,a);
                    },
                    enumerable: false
                });
                methodNames.push(k);
            } else {
                res.prototype[k]=m;
            }
        }
        res.__name__=defs.CLASSNAME;
        res.prototype.constructor=res;
        Object.defineProperty(res.prototype,"__class__",{
            value:res,
            enumerable: false
        });
        res.__methodnames__=methodNames;
        res.__str__=()=>`<class '__main__.${res.__name__}'>`;
        res.__bases__=PL.Tuple && PL.Tuple(parent?[parent]:[]);
        for (var k in defs) {
            if (defs.hasOwnProperty(k)) addMethod(k);
        }
        return res;
    };
    PL.super=function(klass,self) {
        //console.log("klass,self, name",klass,self, klass.__name__);
        //console.log("klass.prototype.CLASSNAME",klass.prototype.CLASSNAME);
        if (!klass.__bases__) {
            console.log(klass);
            throw new Error(`superclass of ${klass.prototype.CLASSNAME} not found`);
        }
        const superclass=klass.__bases__.elems[0];
        if (!superclass) {
            throw new Error(`superclass of ${klass.prototype.CLASSNAME} not found`);
        }
        //console.log("superclass", superclass, superclass.__name__, klass.__methodnames__, superclass.__methodnames__);
        const superprot=superclass.prototype;
        if (superprot===klass.prototype) {
            console.log(self,self.CLASSNAME);
            console.log(klass,klass.prototype.CLASSNAME);
            console.log(superclass,superclass.prototype.CLASSNAME);
            console.log(superprot,superprot.CLASSNAME);
            throw new Error("SAME!");
        }
        //console.log("superprot",superprot.CLASSNAME);
        const res={};
        for (var meth of klass.__methodnames__) {
            if (typeof superprot[meth]!=="function") continue;
            Object.defineProperty(res,meth,{value:superprot[meth].bind(self)});
        }
        return res;
    };
    PL.Tuple=PL.class({
        __init__:function (self, elems) {
            self.elems=elems;
            for (let i=0;i<elems.length;i++) self[i]=elems[i];
        },
        toString: function (self) {
            return "("+self.elems.join(", ")+")";
        }
    });
    PL.Tuple.prototype[Symbol.iterator]=function(...args) {
        return this.elems[Symbol.iterator](...args);
    };
    PL.None=null;
    PL.Tuple.__bases__=PL.Tuple([]);
    PL.Slice=PL.class({
        __init__:function (self, start, stop, step=1) {
            self.start=start;
            self.stop=stop;
            self.step=step;
        },
        toString: function (self) {
            return `slice(${self.start}, ${self.stop}, ${self.step})`;
        }
    });
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
    function u(v) {
        return v;
    }

    PL.invalidOP=function (left, op, right) {
        function typestr(val) {
            if (val==null) return "None";
            const res=(typeof u(val));
            if (res!=="object") return res;
            if (val && val.__getTypeName__) return val.__getTypeName__();
            return res;
        }
        throw new Error(`unsupported operand type(s) for ${op}: '${typestr(left)}' and '${typestr(right)}'`);
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
    //--- monkey patch

    PL.addMonkeyPatch=function (cl, methods) {
        var p=cl.prototype;
        for (var k in methods) {
            if (methods.hasOwnProperty(k)) addMethod(k);
        }
        function addMethod(k) {
            var m=methods[k];
            Object.defineProperty(p,k,{
                value: (k==="__class__"?m:function () {
                    var a=Array.prototype.slice.call(arguments);
                    a.unshift(this);
                    return m.apply(this,a);
                }),
                enumerable: false
            });
        }
    };
    PL.addMonkeyPatch(Object, {
        __class__:Object,
        __getTypeName__: function (){return "<class object>";},
        __call__: function (self,...a) {
            //var a=Array.prototype.slice.call(arguments,1);
            return self.apply(self, a);
        },
        //toString: function (self) {return self.value+"";},
        __str__: function (self) {
            return self+"";
        },
        __add__: function (self,other) {return self+u(other);
        },
        __sub__: function (self,other) { return self-u(other);},
        __mul__: function (self,other) { return self*u(other);},
        __div__: function (self,other) { return self/u(other);},
        __floordiv__: function (self,other) { return Math.floor(self/u(other));},
        __mod__: function (self,other) { return self%u(other);},
        __gt__: function (self,other) { return self>u(other);},
        __lt__: function (self,other) { return self<u(other);},
        __ge__: function (self,other) { return self>=u(other);},
        __le__: function (self,other) { return self<=u(other);},
        __eq__: function (self,other) { return self==u(other);/* Number wrapped */},
        __ne__: function (self,other) { return self!=u(other);/* Number wrapped */},
        __pow__: function (self,other) { return Math.pow(self,u(other));},

        __iadd__: function (self,other) { self=self.__add__(other);return self;},
        __isub__: function (self,other) { self=self.__sub__(other);return self;},
        __imul__: function (self,other) { self=self.__mul__(other);return self;},
        __idiv__: function (self,other) { self=self.__div__(other);return self;},
        __ifloordiv__: function (self,other) { self=self.__floordiv__(other);return self;},
        __imod__: function (self,other) { self=self.__mod__(other);return self;},
        __ipow__: function (self,other) { self=self.__pow__(other);return self;},

        __getattr__: function (self,name) {
            //__getattr__は、オブジェクトのインスタンス辞書に属性が見つからないときに呼び出されるメソッドです。
            throw new Error(`field ${name} is not defined`);
        },
        __getattribute__: function (self,name) {
            if (!(name in self)) {
                return self.__getattr__(name);
            }
            const r=self[name];
            if (typeof r==="function") {
                return r.bind(self);
            }
            return r;
        },
        __setattr__: function (self, name, value) {
            self[name]=value;
        },
        __delattr__: function (self,name) {
            delete self[name];
        },
        __getitem__:function (self, key) {
            return self[key];
        },
        __setitem__:function (self,key, value) {
            self[key]=value;
        }
        //____: function (self,other) { return selfother;},
    });
    PL.addMonkeyPatch(Number,{
        __class__:Number,
        __getTypeName__: function (){return "<class number>";},
    });
    PL.addMonkeyPatch(String,({
        __class__:String,
        __getTypeName__: function (){return "<class str>";},
        __mul__: function (self,other) {
            switch (typeof other) {
            case "number":
                var res="";
                for (;other;other--) res+=self;
                return res;
            default:
                PL.invalidOP(self, "__mul__",other);
            }
        },
        __mod__: function (self,other) {
            let args;
            if (other instanceof Array) args=other;
            else if (other instanceof PL.Tuple) args=other.elems;
            else args=[other];
            return sprintfJS(self,...args);
        },
        __add__: function (self,other) {
            if (typeof u(other)!=="string") {
                throw new Error("文字列に文字列以外の値を+で追加できません．str()関数を使って変換してください．");
            }
            return Object.prototype.__add__.call(self,other);
        },
        __gt__: otherShouldString("gt"),
        __lt__: otherShouldString("lt"),
        __ge__: otherShouldString("ge"),
        __le__: otherShouldString("le"),
        __eq__: otherShouldString("eq"),
        __ne__: otherShouldString("ne"),
        format: function (self,...args) {
            const str=self;
            const o={};
            let i=0;
            for (let a of args) {
                if (a instanceof PL.Option) {
                    Object.assign(o, a );
                } else {
                    o[i+""]=a;
                }
                i++;
            }
            i=0;
            return str.replace(/{([0-9a-zA-Z_]*)}/g, (_,name)=>{
                if (!name) {
                    return PL.str(o[i++]);
                } else {
                    return PL.str(o[name]);
                }
            });
        }
    }));
    function otherShouldString(k) {
        return function (self,other) {
            if (typeof u(other)!=="string") {
                PL.invalidOP(self, k,other);
            }
            return Object.prototype[k].call(self,other);
        };
    }
    PL.addMonkeyPatch(Boolean,{
        __getTypeName__: function (){return "<class boolean>";},
        __str__(self) {
            //  self is wrapped. always trusy
            return self==true?"True":"False";
        }

    });
    PL.addMonkeyPatch(Function,{
        __getTypeName__: function (){return "<class function>";},
    });
    const orig_sort=Array.prototype.sort;
    function sliceToIndex(array, {start, stop, step}) {
        start=start||0;
        if (stop==null) stop=array.length;
        if (start<0) start=array.length+start;
        if (stop<0) stop=array.length+stop;
        if (step==null) step=1;
        if (step>0) {
            return function*() {
                for (let i=start;i<stop;i+=step) {
                    yield i;
                }
            }();
        }
        if (step<0) {
            return function*() {
                for (let i=start;i>stop;i+=step) {
                    yield i;
                }
            }();
        }
        throw new Error("Slice step is 0");
    }
    PL.addMonkeyPatch(Array, {
        __class__:PL.list,
        append(self, ...args) {
            return self.push(...args);
        },
        __add__(self,...args) {
            return self.concat(...args);
        },
        __delattr__(self,i) {
            self.splice(i,1);
        },
        __str__(self) {
            return "["+self.join(", ")+"]";
        },
        __getitem__:function (self, key) {
            if (key instanceof PL.Slice) {
                const res=[];
                for (let i of sliceToIndex(this, key)) {
                    res.push(this[i]);
                }
                return res;
            }
            if (key<0) key=self.length+key;
            if (key>=self.length) throw new Error("Index "+key+" is out of range");
            return self[key];
        },
        __setitem__:function (self,key, value) {
            if (key instanceof PL.Slice) {
                const it=value[Symbol.iterator]();
                for (let i of sliceToIndex(this, key)) {
                    this[i]=it.next().value;
                }
                return value;
            }
            if (key<0) key=self.length+key;
            if (key>=self.length) throw new Error("Index "+key+" is out of range");
            self[key]=value;
        },
        copy: function (self) {
            return self.slice();
        },
        sorted: function (self) {
            return self.slice().sort();
        },
        sort: function (self, comp) {
            comp=comp||((a,b)=>(a>b?1:a<b?-1:0));
            if (comp instanceof PL.Option) {
                let key=comp.key;
                if (typeof key==="string") {
                    const ks=key;
                    key=o=>o[ks];
                }
                if (typeof key==="function") {
                    const sorted=self.map((val,idx)=>({val,idx}) ).sort((a,b)=>{
                        const va=key(a.val);
                        const vb=key(b.val);
                        if (va>vb) return 1;
                        else if (va<vb) return -1;
                        else return a.idx-b.idx;
                    }).map(r=>r.val);
                    while(self.length) self.pop();
                    while(sorted.length) self.push(sorted.shift());
                }
                if (comp.reverse) {
                    self.reverse();
                }
                return self;
            }
            return orig_sort.apply(self, [comp]);
        },
        __contains__: function () {

        }
    });

    //---
    PL.builtins=["range","input","str","int","sum","float","object","len","type","quit","exit","sorted","abs",
    "min","max","list","isinstance","zip",
    "fillRect","setColor","setTimeout","clearRect","clear"];
    root.PYLIB=PL;

    function sprintfJS() {
    	//  input -> jsString  output->jsString
    	// from http://d.hatena.ne.jp/uupaa/20080301/1204380616
        var rv = [], i = 0, v, width, precision, sign, idx, argv = arguments, next = 0;
        var unsign = function(val) { return (val >= 0) ? val : val % 0x100000000 + 0x100000000; };
        var getArg = function() {
    		if (!idx && next>=argv.length) throw new Error("printfの引数が足りません");
    		return argv[idx ? idx - 1 : next++];
    	};
    	var parseInt2=function (arg) {
    		var res=0;
    		if (arg && arg.IS_POINTER) {
    			return arg.addr||0;
    		}
    		switch(typeof arg){
    		case "number":
                res=arg-0;
                break;
            case "boolean":
    			res=!!arg;
    			break;
    		}
    		return res;
    	};
    	var s = (getArg()+ "     ").split(""); // add dummy 5 chars.

        for (; i < s.length - 5; ++i) {
          if (s[i] !== "%") { rv.push(s[i]); continue; }

          ++i; idx = 0; precision = undefined;

          // arg-index-specifier
          if (!isNaN(parseInt(s[i])) && s[i + 1] === "$") { idx = parseInt(s[i]); i += 2; }
          // sign-specifier
    	  // sign = (s[i] !== "#") ? false : ++i, true;
          if (s[i] !== "#") { sign= false; }
    	  else {++i; sign=true;}
          // width-specifier
          width = (isNaN(parseInt(s[i]))) ? 0 : parseInt(s[i++]);
          // precision-specifier
          if (s[i] === "." && !isNaN(parseInt(s[i + 1]))) { precision = parseInt(s[i + 1]); i += 2; }

          switch (s[i]) {
          case "d": v = parseInt2(getArg()).toString(); break;
          case "u": v = parseInt2(getArg()); if (!isNaN(v)) { v = unsign(v).toString(); } break;
          case "o": v = parseInt2(getArg()); if (!isNaN(v)) { v = (sign ? "0"  : "") + unsign(v).toString(8); } break;
          case "x": v = parseInt2(getArg()); if (!isNaN(v)) { v = (sign ? "0x" : "") + unsign(v).toString(16); } break;
          case "X": v = parseInt2(getArg()); if (!isNaN(v)) { v = (sign ? "0X" : "") + unsign(v).toString(16).toUpperCase(); } break;
          case "f": v = parseFloat(getArg()).toFixed(precision||6); break;
          case "c": width = 0; v = getArg(); v = (typeof v === "number") ? String.fromCharCode(v) : NaN; break;
          case "s": width = 0; v = getArg(); if (precision) { v = v.substring(0, precision); } break;
          case "%": width = 0; v = s[i]; break;
          default:  width = 0; v = "%" + ((width) ? width.toString() : "") + s[i].toString(); break;
          }
          if (isNaN(v)) { v = v.toString(); }
      	  if (v.length < width) rv.push(" ".repeat(width - v.length), v); else rv.push(v);
        }
        var line=rv.join("");
    	//console.log("ARGV",next,argv.length);
    	//if (!idx && next<argv.length) _global.doNotification("printfの引数が多すぎます．");
    	return line;
    }
    return PL;
});
