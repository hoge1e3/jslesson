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
    //test!!
    var PL={};
    PL.import=function (lib) {
        if (lib==="random") {
            return {
                random: Math.random,
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
                }
            };
        }
        throw new Error("ライブラリ "+lib+" はインポートできません．(サーバで実行すると動作する可能性があります)");
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
    PL.sorted=function (a) {
        return a.slice().sort();
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
            },
            __mod__: function (self,other) {
                let args;
                if (other instanceof Array) args=other;
                else if (other instanceof PL.Tuple) args=other.elems;
                else args=[other];
                return sprintfJS(self.unwrap(),...args);
            },
            __add__: function (self,other) {
                if (typeof u(other)!=="string") {
                    throw new Error("文字列に文字列以外の値を+で追加できません．str()関数を使って変換してください．");
                }
                return PL.Wrapper.prototype.__add__.call(self,other);
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
    PL.Tuple=PL.class({
        __init__:function (self, elems) {
            self.elems=elems;
        },
        toString: function (self) {
            return "("+self.elems.join(", ")+")";
        }
    });
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
    String.prototype.format=function (...args) {
        const str=this;
        const o={};
        let i=0;
        for (const a of args) {
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
                return o[i++];
            } else {
                return o[name];
            }
        });
    };
    Array.prototype.append=Array.prototype.push;
    //---
    PL.builtins=["range","input","str","int","float","len","type","quit","exit","sorted",
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
