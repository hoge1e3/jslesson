/* global self,global*/
define(function (require,exports,module) {
    //var PyX=require("./PyX.js");
    // same with root.js
    //const ABG=require("AsyncByGenerator");
    //const ctrl=require("ctrl");
    function getRoot(){
        if (typeof window!=="undefined") return window;
        if (typeof self!=="undefined") return self;
        if (typeof global!=="undefined") return global;
        return (function (){return this;})();
    }
    var root=getRoot();
    //test!!!
    var PL={};
    PL.import=function (lib) {
        if (PL.import.libs[lib]) return PL.import.libs[lib];
        throw new Error("ライブラリ "+lib+" はインポートできません．(サーバで実行すると動作する可能性があります)");
    };
    //  It seems to be old: add to PythonSemantics and create runtime/lib/python/py_***.js
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
                    const e=list.splice(this.randint(0,i),1);
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
        },
        js:root
    };
    PL.spreadMod=(mod, names) => names.map((n)=>mod[n]);
    PL.proxy=(target)=>{
        return new Proxy(()=>"Hoge", {
            get(_target, prop, receiver) {
                if (prop==="__unproxy__") return ()=>target;
                return target.__getattribute__(prop);
            },
            set(_target, prop, newVal) {
                target.__setattr__(prop, newVal);
            },
            apply(_target, self, ...args) {
                return target.__call__(target, ...args);
            },
            has(_target, name) {
                return name in target;
            },
        });
    };
    //PyX.install(PL);
    PL.lineBuf="";
    PL.print=function () {
        var a=PL.parseArgs(arguments);
        console.log("print",arguments,a);
        var end=a.options.end!=null ? a.options.end: "\n";
        if (!PL.isinstance(end, PL.str)) {
            throw new Error("endには文字列を指定してください");
        }
        var out=a.map(PL.str).join(" ")+end;
        PL.lineBuf+=out;
        var lines=PL.lineBuf.split("\n");
        if(lines.length>10) {
            PL.lineBuf=lines.slice(lines.length-10).join("\n");
        }
        if (PL.STDOUT) {
            if (typeof $==="function") PL.STDOUT.append($("<span>").text(out));
            else PL.STDOUT.append(out);
        }
    };
    PL.input=function (s) {
        if (s) PL.print(s,PL.Option({end:""}));
        var r=PL.STDIN ? PL.STDIN.shift() : prompt(PL.lineBuf);
        if (r==null) r="";
        PL.LoopChecker.reset();
        PL.print(r);
        return r;
    };
    PL.len=function (s) {return s.length;};
    function chkNan(v, mesg) {
        return v;
    }
    
    PL.list=(iter)=>{
        const res=[];
        for (let x of iter) res.push(x);
        return res;
    };
    PL.listComprehension=(vn, elem, gen)=>{
        /*return {
            [Symbol.iterator]: ()=>{
                const iter=gen[Symbol.iterator]();
                return {
                    next() {
                        const r=iter.next();
                        if (r.done) return r;
                        r.value=elem(r.value);
                        return r;
                    }
                };
            }
        };*/
        const res=[];
        for (let e of gen) res.push(elem({[vn]:e}));//yield (elem(e));
        return res;
    };
    PL.str=function (s) {
        //  s==false
        if (s!=null && s.__str__) {
            const res=s.__str__();
            if (typeof res!=="string") throw new Error("__str__の戻り値は文字列である必要があります．");
            return res;// __OP__
        }
        return "None";
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
    //PL.open=function () {throw new Error("openを使うには，「サーバで実行」を選んでください．");};
    PL.quit=function (s) {PL.exit();};
    PL.exit=function (s) {
        var e=new Error("exit でプログラムが終了しました。");
        e.noTrace=true;
        throw e;
    };
    PL.type=function (s) {
        switch (typeof u(s)) {
            case "number":
                if (Math.floor(s)==s) return PL.int;
                return PL.float;
            //case "string":return String;
            //case "function":return Function;
            //case "boolean":return Boolean;
            default:
            //if (s && s.__getTypeName__) return s.__getTypeName__();
            if (s && s.__class__) return s.__class__;
            return "object";
        }
    };
    PL.issubclass=function (sub,sup) {
        if (sub===sup) return true;
        if (!sub.__bases__ || !sub.__bases__[0]) return false;
        return PL.issubclass(sub.__bases__[0], sup);
    };
    PL.isinstance=function (obj,klass) {
        if (obj==null) {
            return klass===PL.NoneType;
        }
        if (klass===PL.int) {
            return (typeof u(obj)==="number" && Math.floor(obj)===obj);
        } else if (klass===PL.float || klass===Number) {
            return (typeof u(obj)==="number");
        } else if (klass===PL.str || klass===String) {
            return (typeof u(obj)==="string");
        }
        const ocl=obj && obj.__class__;
        if (!ocl) return false;
        return PL.issubclass(ocl, klass);
    };
    PL.sorted=function (a, ...args) {
        return a.slice().sort(...args);
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
            var b=confirm("ループが5秒以上続いています。\n実行を停止するにはOKを押してください。");
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
            c=$("#stdin");
            if (c.length>0) {
                PL.STDIN=c.text().split("\n");
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
    PL.parseArgs2=function(args, spec) {
        // spec: [{name:  , def:  , ast: "*" || "**" }]
        args=Array.from(args);
        const allowExtra=spec.allowExtra;
        spec=spec.slice();
        let opt=null, optKeys={};
        if (args[args.length-1] instanceof PL.Option) {
            opt=args.pop();
            for (let k of Object.keys(opt)) optKeys[k]=true;
        }
        let i=0;
        const res={};
        while (spec.length) {
            let s=spec.shift();
            if (typeof s==="string") s={name:s};
            if (!s.ast) {
                if (args.length) res[s.name]=(args.shift());
                else if (opt && opt.hasOwnProperty(s.name)) {
                    if (res.hasOwnProperty(s.name)) {
                        throw new Error(`引数${s.name}はすでに渡されています．`);
                    }
                    delete optKeys[s.name];
                    res[s.name]=(opt[s.name]);
                } else if ("def" in s) res[s.name]=(s.def);
                else throw new Error(`引数${s.name}が渡されていません．`);
            } else if (s.ast==="*") {
                res[s.name]=(PL.Tuple(args));
                args=[];
            } else if (s.ast==="**") {
                res[s.name]=(opt);
            }
        }
        if (Object.keys(optKeys).length) {
            throw new Error(`引数${Object.keys(optKeys)}はありません．`)
        }
        if (args.length && !allowExtra) {
            throw new Error(`余計な引数が${args.length}個あります．`);
        }
        return res;
    };
    PL.f=(spec, body)=>{
        const res=function (...args){
            return PL.AsyncByGenerator.toVal(body.call(this,PL.parseArgs2(args, spec)));    
        };
        res.spec=spec;
        return res;
    };
    PL.opt=PL.Option;
    PL.range=function (b,e,s=1) {
        if (e==null) {e=b;b=0;}
        if (!PL.isinstance(b,PL.int)) throw new Error("rangeの引数(開始)には整数を指定してください");
        if (!PL.isinstance(e,PL.int)) throw new Error("rangeの引数(終了)には整数を指定してください");
        if (!PL.isinstance(s,PL.int)) throw new Error("rangeの引数(増分)には整数を指定してください");
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
            return PL.proxy(self);
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
                if (k!=="__str__") {
                    Object.defineProperty(res,k,{
                        value: m
                    });    
                }
                if (k==="__iter__") {
                    Object.defineProperty(res.prototype, Symbol.iterator, {
                        value(){
                            return PL.pyiter(m.apply(this,[this]));
                        }
                    });
                }
                methodNames.push(k);
            } else {
                res.prototype[k]=m;
            }
        }
        res.__name__=defs.__name__ || defs.CLASSNAME;
        res.__module__="__main__";
        res.prototype.constructor=res;
        Object.defineProperty(res.prototype,"__class__",{
            value:res,
            enumerable: false
        });
        Object.defineProperty(res,"__class__",{
            value:PL.type,
            enumerable: false
        });
        res.__methodnames__=methodNames;
        Object.defineProperty(res, "__str__",{
            value: ()=>`<class '${res.__module__}.${res.__name__}'>`,
            enumerable: false
        });        
        res.__bases__=PL.Tuple && PL.Tuple(parent?[parent]:[]);
        //res.prototype.toString=function(){return this.__str__();};
        for (var k in defs) {
            if (defs.hasOwnProperty(k)) addMethod(k);
        }
        return res;
    };
    PL.NoneType=PL.class({});
    PL.pyiter=function (iter) {
        return {
            next() {
                try {
                    return {done:false, value: iter.__next__()};
                }catch(e) {
                    if (e instanceof PL.StopIteration) return {done:true, value:null};
                    throw e;
                }
            }
        };
    };
    PL.AttributeError=class extends Error {};
    //PL.AttributeError.prototype=new Error();
    PL.StopIteration=function (){};
    PL.StopIteration.prototype=new Error();
    PL.float=function (s) {
        const v=s-0;
        if (v!==v) throw new Error(`${s} は floatに変換できません`);
        return v;
    };
    PL.int=function (s) {
        const v=s-0;
        if (v!==v) throw new Error(`${s} は intに変換できません`);
        if (typeof s==="string") {
            if (s.match(/\./)) throw new Error(`${s} は小数点を含んでいるのでintに変換できません`);
        }
        return v;
    };
    PL.super=function(klass,self) {
        //console.log("klass,self, name",klass,self, klass.__name__);
        //console.log("klass.prototype.CLASSNAME",klass.prototype.CLASSNAME);
        if (!klass.__bases__) {
            console.log(klass);
            throw new Error(`${klass.prototype.CLASSNAME}には親クラスがありません．`);
        }
        const superclass=klass.__bases__.elems[0];
        if (!superclass) {
            throw new Error(`${klass.prototype.CLASSNAME}には親クラスがありません．`);
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
        __name__: "tuple",
        __init__:function (self, elems) {
            self.elems=elems;
            for (let i=0;i<elems.length;i++) self[i]=elems[i];
        },
        toString: function (self) {
            return "("+self.elems.join(", ")+")";
        }
    });
    PL.Tuple.__bases__=PL.Tuple([]);
    PL.Tuple.prototype[Symbol.iterator]=function(...args) {
        return this.elems[Symbol.iterator](...args);
    };
    PL.dict=PL.class({
        __name__: "dict",
        __init__(self, src) {
            self.map=new Map();
            for (let k in src) {
                self.map.set(k, src[k]);
            }
        },
        __getitem__(self, name) {
            if (self.map.has(name)) {
                return self.map.get(name);
            }
            throw new Error(`辞書にキー'${name}'がありません．`);
        },
        __setitem__(self, name,value) {
            self.map.set(name, value);
        },
        __contains__(self, elem) {
            return self.map.has(elem);
        }
    });
    PL.dict.prototype[Symbol.iterator]=function(...args) {
        return this.map.keys();
    };
    PL.None=null;
    let Encoding;
    PL.open=async function (...args) {
        const {filename, mode, encoding}=PL.parseArgs2(args,["filename","mode",{name:"encoding",def:"utf8"}]);
        let cp;
        filename.replace(/^(user|class)\/(.*)/,(_,context,path)=>cp={context,path});
        let content="";
        if (!cp) {
            throw new Error("ファイル名はuser/ か class/で始めてください．: "+filename);
        }
        if (mode.match(/[ra]/)) {
            if (encoding!=="utf8") {
                if (!Encoding) {
                    Encoding=await new Promise((s)=>
                        requirejs(["https://cdnjs.cloudflare.com/ajax/libs/encoding-japanese/2.0.0/encoding.min.js"], s));
                }
                //alert(Encoding);
            }
            const {files, prefix, baseUrl}=await ctrl.get("Asset/list2",{context:cp.context});
            const fileName=files.find((fileName)=>fileName===cp.path);
            if (!fileName) {
                if (!mode.match(/a/)) {
                    throw new Error("ファイル" +cp.context+"/"+cp.path+"はありません．「ファイル」→「素材管理」からファイル名を確認してください．");
                }
            } else {
                const urlFull=baseUrl+fileName;// WebSite.published+u;
                //alert(urlFull);
                if(encoding!=="utf8") {
                    const ary=await $.ajax({
                        url: urlFull,
                        type: "GET",
                        dataType: 'binary',
                        responseType:'arraybuffer',
                        processData: false
                    });
                    const ary8=new Uint8Array(ary);
                    const unicodeArray=Encoding.convert(ary8, {
                        to: 'UNICODE',
                        from: encoding
                    });
                    //console.log(ary8, unicodeArray);
                    content = Encoding.codeToString(unicodeArray);
                } else content=await $.get(urlFull);    
            }
            if (!mode.match(/a/)) return PL.ReaderFile(content);
        } 
        if (mode.match(/[wa]/)) {
            return PL.WriterFile(cp.context, cp.path, content);
        }
        throw new Error("第2引数（モード指定）に誤りがあります："+mode);
    };
    PL.ReaderFile=PL.class({
        __init__(self, content) {self.content=content;},
        __iter__(self) {
            //self._line=0;
            if (self.content==="") self.lines=[];
            const lastHasBR=self.content[self.content.length-1]=="\n";
            self.lines=self.content.split("\n").map((s)=>s+"\n");
            if (lastHasBR) {
                self.lines.pop();
            } else {
                self.lines[self.lines.length-1]=self.lines[self.lines.length-1].trim();
            }
            return self;
        },
        __next__(self) {
            if (self.lines.length) return self.lines.shift();
            throw new PL.StopIteration();
        },
        close(self){
            self.closed=true;
        },
    });
    PL.WriterFile=PL.class({
        __init__(self, context, filename, content="") {
            self.context=context;
            self.filename=filename;
            self.content=content;
            self.flushTimer=null;
        },
        write(self, str) {
            self.content+=str;
            if (self.flushTimer) {
                clearTimeout(self.flushTimer);
            }
            self.flushTimer=setTimeout(()=>{
                self.flush();
            },1000);
        },
        async close(self) {
            await self.flush();
            self.closed=true;
        },
        async flush(self) {
            if (self.flushTimer) {
                clearTimeout(self.flushTimer);
            }
            const blob=new Blob([self.content],{type:"text/plain"});
            const formData = new FormData();
            formData.append('acceptImage', blob, self.filename);
            formData.append("context",self.context);
            return await $.ajax({
                type: 'POST',
                url: ctrl.url("Asset/upload"),
                data: formData,
                contentType: false,
                processData: false
            });
        },
    });
    PL.checkSet=(v, name="Variable")=>{
        if (v!==undefined) return v;
        throw new Error(`${name} is not defined.`);
    };
    PL.hasattr=(o, name)=>{
        try {
            if (!o) return false;
            o.__getattribute__(name);
            return true;
        } catch(e) {
            if (e instanceof PL.AttributeError) return false;
            throw e;
        }
    };
    PL.hasattr_js=(o, name)=>{
        if (!o) return;
        o=o.__unproxy__();
        const inable=(e)=>typeof e==="object"||typeof e==="function";
        return (inable(o) && name in o) || o[name]!==undefined;
    };
    PL.typeof_field=(o, field, type)=> {
        /*if (o instanceof String) {
            console.log("WHY" , o, field, type);
            //return false;
        }
        if (!o || typeof o!=="object") return false;*/
        //console.log("typeof_field", o, field, type);
        if (typeof field==="object") {
            for (let k in field) {
                if (typeof field[k] instanceof String) {
                    console.log(field, k ,field[k]);
                    throw new Error("Invalid field spec");
                }
                if (!PL.typeof_field(o,k,field[k])) return false;
            }
            return true;
        }
        if (type) {
            return PL.typeof_field(o, field)===type;
        }
        if (!PL.hasattr_js(o, field)) {
            return "undefined";
        }
        return typeof o[field]; 
    };
    PL.isArray=(v)=>{
        if (!v) return false;
        v=v.__unproxy__();
        return (v instanceof Array) || (
            (PL.typeof_field(v,{length:"number", slice:"function", map:"function"})));
    };
    PL.isArrayLike=(v)=> {
        if (!v) return false;
        if (typeof v==="string" || v instanceof String) return false;
        v=v.__unproxy__();
        return PL.isArray(v) || (
            typeof v==="object" && PL.typeof_field(v,{length:"number"}) &&(
                v.length===0 ||
                (0 in v && v.length-1 in v)
            )
        );
    };
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
    PL.moduleScope=(parent, useJSRoot)=> {
        let target=parent ? Object.create(parent) :{};
        target.globals=()=>PL.dict(target);
        return new Proxy(target, {
            get(target, prop, receiver) {
                if (prop==="__unproxy__") return ()=>target;
                if (prop in target) return target[prop];
                if (useJSRoot && prop in root) {
                    const r=root[prop];
                    if (typeof r==="function") return r.bind(root);
                    return r;
                }
                if (prop==="then" || typeof prop!=="string" ) {
                    // 'then' will be checked on return of async function
                    // Symbol(Symbol.toStringTag) is also
                    return undefined;
                }
                throw new Error(`変数${prop}は定義されていません．`);
            },
        });
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
            if (val==PL.None) return "None";
            return val && PL.type(val).__name__;
            /*const res=(typeof u(val));
            if (res!=="object") return res;
            if (val && val.__getTypeName__) return val.__getTypeName__();
            return res;*/
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
    const IDHASH=Symbol("identityHashcode");
    PL.addMonkeyPatch(Object, {
        __class__:Object,
        //__getTypeName__: function (){return "<class object>";},
        __call__: function (self,...a) {
            //var a=Array.prototype.slice.call(arguments,1);
            if (typeof self==="function") return self.apply(self, a);
            console.log("Cannot call", self);
            throw new Error("この値は関数呼び出しできません");
        },
        //toString: function (self) {return self.value+"";},
        __str__: function (self) {
            self[IDHASH]=self[IDHASH]||(~~(Math.random()*(2**31)));
            const t=PL.type(self);
            return `<${t.__module__}.${t.__name__} object at 0x${this[IDHASH].toString(16)}>`;
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
            if (name===Symbol.iterator) {
                throw new PL.AttributeError(`このオブジェクトは繰り返し可能ではありません．`);
            }
            if (name==="then" || typeof name!=="string" ) {
                // 'then' will be checked on return of async function
                // Symbol(Symbol.toStringTag) is also
                return undefined;
            }
            console.log("Field ", name, " not found in ",self);
            throw new PL.AttributeError(`フィールド ${name.toString()} はありません`);
        },
        __getattribute__: function (self,name) {
            if (!PL.hasattr_js(self, name)) {
                return self.__getattr__(name);
            }
            const r=self[name];
            if (typeof r==="function" && !PL.isinstance(r, PL.type)) {
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
            if (!(key in self)) {
                throw new Error(`値${self}[${key}] はありません`);
            }
            return self[key];
        },
        __setitem__:function (self,key, value) {
            self[key]=value;
        },
        __contains__(self, elem) {
            return self.hasOwnProperty(elem) || elem in self;
        },
        __unproxy__(self) {return self;},
        //____: function (self,other) { return selfother;},
    });
    PL.addMonkeyPatch(Number,{
        __class__:Number,
        __str__(self){return self+"";},
        //__getTypeName__: function (){return "number";},
    });
    function setStr2Class(klass,name) {
        Object.defineProperty(klass, "__str__", {
            value: function () {
                return `<class '${name}'>`;
            },
            enumerable: false,
        });
    }
    setStr2Class(String,"str");
    setStr2Class(Boolean,"bool");
    setStr2Class(Function,"function");
    setStr2Class(PL.int,"int");
    setStr2Class(PL.float,"float");
    setStr2Class(PL.type, "type");
    /*Object.defineProperty(Number, "__str__", {
        value:function () {
            const n=this;
            if (Math.floor(n)==n) return "<class 'int'>";
            else return "<class 'float'>";
        },
        enumerable: false,
    });*/
    String.prototype.split_orig=String.prototype.split;
    PL.addMonkeyPatch(String,({
        __class__:String,
        split(self, ...args) {
            if (args.length===0) {
                return self.replace(/^\s*/,"").replace(/\s*$/,"").split_orig(/\s+/);
            } else {
                return self.split_orig(...args);
            }
        },
        __str__(self){return self+"";},
        //__getTypeName__: function (){return "str";},
        __mul__: function (self,other) {
            switch (typeof other) {
            case "number":
                let res="";
                for (;other;other--) res+=self;
                return res;
            case "boolean":
                return other ? self+"" :"";
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
        __gt__: otherShouldString("__gt__"),
        __lt__: otherShouldString("__lt__"),
        __ge__: otherShouldString("__ge__"),
        __le__: otherShouldString("__le__"),
        __eq__: otherShouldString("__eq__"),
        __ne__: otherShouldString("__ne__"),
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
        },
        __unproxy__(self) {return self+"";},
    }));
    PL.addMonkeyPatch(Number, {
        __class__: Number,
        __add__(self,other) {
            if (typeof u(other)==="string") {
                throw new Error("数値に文字列を追加できません．左辺をstr()で変換するか，右辺をint()またはfloat()で変換する必要があります．");
            }
            return self+other;
        },
        __mul__(self,other) {
            switch (typeof other) {
            case "number":
                return self*other;
            case "boolean":
                return other ? self-0 :0;
            case "string":
                return other.__mul__(self);
            default:
                PL.invalidOP(self, "__mul__",other);
            }
        },  
        __unproxy__(self) {return self-0;},
    });
    function otherShouldString(k) {
        return function (self,other) {
            if (typeof u(other)!=="string") {
                PL.invalidOP(self, k,other);
            }
            return Object.prototype[k].call(self,other);
        };
    }
    PL.addMonkeyPatch(Boolean,{
        __class__: Boolean,
        //: function (){return "boolean";},
        __str__(self) {
            //  self is wrapped. always trusy
            return self==true?"True":"False";
        },
        __mul__(self, other) {
            switch (typeof other) {
                case "number":
                case "string":
                    return other.__mul__(self);
                case "boolean":
                    return PL.int(self)*PL.int(other);
                default:
                    PL.invalidOP(self, "__mul__",other);
            }
        },
        __unproxy__(self) {return !!self;},
    });
    PL.addMonkeyPatch(Function,{
        __class__: Function,
        new(self, ...args) {
            return new self(...args);
        }
        //__getTypeName__: function (){return "function";},
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
            return "["+self.map((e)=>
                typeof e==="string" ? JSON.stringify(e).replace(/^"/,"'").replace(/"$/,"'") : PL.str(e)
            ).join(", ")+"]";
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
            if (key>=self.length) throw new Error(`添字[${key}]は範囲外です(0...${self.length-1})`);
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
            if (key>=self.length) throw new Error(`添字[${key}]は範囲外です(0...${self.length-1})`);
            self[key]=value;
        },
        copy: function (self) {
            return self.slice();
        },
        sorted: function (self, ...args) {
            return self.slice().sort(...args);
        },
        sort: function (self, comp) {
            const nat=(a,b)=>{
                if (a==null || b==null) throw new Error("未定義の値が入っているので並び替えできません");
                return (a.__gt__(b)?1:a.__lt__(b)?-1:0);
            };
            comp=comp||nat;
            if (comp instanceof PL.Option) {
                let key=comp.key;
                if (typeof key==="string") {
                    const ks=key;
                    key=(o)=>o[ks];
                } 
                if (typeof key==="function") {
                    const sorted=self.map((val,idx)=>({val,idx}) ).sort((a,b)=>{
                        const va=key(a.val);
                        const vb=key(b.val);
                        if (va.__gt__(vb)) return 1;
                        else if (va.__lt__(vb)) return -1;
                        else return a.idx-b.idx;
                    }).map(r=>r.val);
                    while(self.length) self.pop();
                    while(sorted.length) self.push(sorted.shift());
                } else {
                    self.sort(nat);
                }
                if (comp.reverse) {
                    self.reverse();
                }
                return self;
            }
            return orig_sort.apply(self, [comp]);
        },
        __contains__(self, elem) {
            return self.indexOf(elem)>=0;
        },
        remove(self, item) {
            let i=self.indexOf(item);
            if (i<0) {
                throw new Error("指定された要素は配列にありません");
            }
            self.splice(i,1);
        },
    });

    //---
    PL.builtins=["range","input","str","int","sum","float","object","len","type","quit","exit","sorted","abs",
    "min","max","list","isinstance","zip",
    "fillRect","setColor","setTimeout","clearRect","clear","StopIteration"];
    root.PYLIB=PL;
    PL.root=root;

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
    PL.run=function (main) {
        requirejs(main, function () {
            if (typeof window!=="undefined" && window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");                
            }
        });
    };

    PL.AsyncByGenerator = {
        doReady() {
            this.isReady = true;
            if (this.onReady) {
                this.onReady();
            }
        },
        ready(f) {
            if (this.isReady) {
                f();
            } else {
                this.onReady = f;
            }
        },
        isPromise(v) {
            return typeof Promise === "function" && v instanceof Promise; 
        },
        isGenerator(v) {
            return v && (typeof Symbol === "function" && v[Symbol.toStringTag] === "Generator" || this.GeneratorFunction && this.GeneratorFunction.prototype.isPrototypeOf(v));
        },
        init() {
            this.GeneratorFunction = ((function*(){})()).constructor;
            this.doReady();
        },
        run(it) {
            var t = this;
            while (true) {
                var n;
                try {
                    n = it.next();
                } catch (e) {
                    return Promise.reject(e);
                }
                if (this.isPromise(n.value)) {
                    if (n.done) {
                        return n.value;
                    } else {
                        //console.log("Getting then from1 ",n.value);
                        return n.value.then(()=>{
                            //PL.LoopChecker.reset();
                            return t.run(it);
                        });
                    }
                } else {
                    if (n.done) {
                        // Promise.resolve(n.value) -> field then not found
                        return new Promise((s)=>s(n.value));
                    }
                }
            }
        },
        toGen(v) {
            if (this.isPromise(v)) {
                var res;
                //console.log("Getting then from2 ",v);
                var p=v.then(function (r) {
                    res=r;
                });
                return (function*() {yield p;return res;})();
            } else if (this.isGenerator(v)) {
                return v;
            }
            return (function*(){return v;})();            
        },
        toVal(gen) {
            var n=gen.next();
            if (n.done) return n.value;
            return (function*() {
                while(true) {
                    yield n.value;
                    n=gen.next();
                    if (n.done) return n.value;
                }
            })();
        }
    };
    PL.AsyncByGenerator.init();
    const ctrl={};
    ctrl.url=function (path,params) {
        let res=".?"+path;
        if (params) {
            res+=Object.keys(params).map (k=>`&${k}=${params[k]}`).join("");
        }
        return res;
    };
    ctrl.run=function (method,path,params) {
        params=params||{};
        return $.ajax({
            url: ctrl.url(path),
            data:params,
            cache: false,
            type:method
        });
    };
    ctrl.get=function (path,params) {
        return ctrl.run("get",path,params);
    };
    ctrl.post=function (path,params) {
        return ctrl.run("post",path,params);
    };
    PL.ctrl=ctrl;
    PL.runAsync=(genF)=>{
        return PL.AsyncByGenerator.run(genF());
    };
    setInterval(()=>PL.LoopChecker.reset(),2000);
    PL.G=PL.R=(x)=>PL.AsyncByGenerator.toGen(x);
    PL.V=(g)=>PL.AsyncByGenerator.toVal(g);
    PL.await=function *(p){
        let res,err;
        yield p.then((r)=>{res=r;}, (e)=>{err=e;});
        if (err) throw err;
        return res;
    };
    PL.initializedAll=true;
    return PL;
});
