var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* global self,global*/
define(function (require, exports, module) {
    //var PyX=require("./PyX.js");
    // same with root.js
    function getRoot() {
        if (typeof window !== "undefined") return window;
        if (typeof self !== "undefined") return self;
        if (typeof global !== "undefined") return global;
        return function () {
            return this;
        }();
    }
    var root = getRoot();
    //test!!!
    var PL = {};
    PL.import = function (lib) {
        if (PL.import.libs[lib]) return PL.import.libs[lib];
        throw new Error("ライブラリ " + lib + " はインポートできません．(サーバで実行すると動作する可能性があります)");
    };
    //  It seems to be old: add to PythonSemantics and create runtime/lib/python/py_***.js
    PL.import.libs = {
        random: {
            random: Math.random,
            randrange: function randrange() {
                return this.choice(PL.range.apply(PL, arguments));
            },
            randint: function randint(a, b) {
                return Math.floor(Math.random() * (b - a + 1)) + a;
            },
            shuffle: function shuffle(list) {
                for (var i = list.length - 1; i >= 0; i--) {
                    var e = list.splice(this.randint(i), 1);
                    list.push(e[0]);
                }
                return list;
            },
            sample: function sample(list) {
                return this.shuffle(list.slice());
            },
            choice: function choice(seq) {
                return seq[this.randint(0, seq.length - 1)];
            }
        },
        math: {
            fabs: Math.abs.bind(Math),
            ceil: Math.ceil.bind(Math),
            floor: Math.floor.bind(Math),
            sqrt: Math.sqrt.bind(Math)
        }
    };
    //PyX.install(PL);
    PL.lineBuf = "";
    PL.print = function () {
        var a = PL.parseArgs(arguments);
        console.log("print", arguments, a);
        var end = a.options.end != null ? a.options.end : "\n";
        if (!PL.isinstance(end, PL.str)) {
            throw new Error("endには文字列を指定してください");
        }
        var out = a.map(PL.str).join(" ") + end;
        PL.lineBuf += out;
        var lines = PL.lineBuf.split("\n");
        if (lines.length > 10) {
            PL.lineBuf = lines.slice(lines.length - 10).join("\n");
        }
        PL.STDOUT.append($("<span>").text(out));
    };
    PL.input = function (s) {
        if (s) PL.print(s, PL.Option({ end: "" }));
        var r = prompt(PL.lineBuf);
        PL.LoopChecker.reset();
        PL.print(r);
        return r;
    };
    PL.len = function (s) {
        return s.length;
    };
    function chkNan(v, mesg) {
        return v;
    }

    PL.list = function (iter) {
        var res = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = iter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var x = _step.value;
                res.push(x);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return res;
    };
    PL.listComprehension = function (elem, gen) {
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
        var res = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = gen[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var e = _step2.value;
                res.push(elem(e));
            } //yield (elem(e));
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return res;
    };
    PL.str = function (s) {
        //  s==false
        if (s != null && s.__str__) return s.__str__(); // __OP__
        return s + "";
    };
    PL.sum = function (s) {
        var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = s[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var e = _step3.value;

                init = init.__add__(e); // __OP__
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return init;
    };
    PL.abs = function (s) {
        return Math.abs(s);
    };
    PL.min = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (args[0][Symbol.iterator]) {
            return Math.min.apply(Math, _toConsumableArray(Array.from(args[0])));
        }
        return Math.min.apply(Math, args);
    };
    PL.max = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        if (args[0][Symbol.iterator]) {
            return Math.max.apply(Math, _toConsumableArray(Array.from(args[0])));
        }
        return Math.max.apply(Math, args);
    };
    PL.open = function () {
        throw new Error("openを使うには，「サーバで実行」を選んでください．");
    };
    PL.quit = function (s) {
        PL.exit();
    };
    PL.exit = function (s) {
        var e = new Error("exit でプログラムが終了しました。");
        e.noTrace = true;
        throw e;
    };
    PL.type = function (s) {
        switch (_typeof(u(s))) {
            case "number":
                if (Math.floor(s) == s) return PL.int;
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
    PL.isinstance = function (obj, klass) {
        if (klass === PL.int) {
            return typeof u(obj) === "number" && Math.floor(obj) === obj;
        } else if (klass === PL.float || klass === Number) {
            return typeof u(obj) === "number";
        } else if (klass === PL.str || klass === String) {
            return typeof u(obj) === "string";
        }
        var ocl = obj && obj.__class__;
        return !!ocl && (ocl === klass || PL.isinstance(Object.getPrototypeOf(ocl.prototype), klass));
    };
    PL.sorted = function (a) {
        var _a$slice;

        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
        }

        return (_a$slice = a.slice()).sort.apply(_a$slice, args);
    };
    PL.loop_start2 = function loop_start2() {
        //if (_global.parent) _global.parent.dialogClosed=false;
        PL.startTime = new Date().getTime();
    };
    PL.loop_chk2 = function loop_chk2() {
        if (root.parent && root.parent.dialogClosed) {
            var e = new Error("ダイアログが閉じられたので実行を停止しました");
            e.type = "dialogClosed";
            throw e;
        }
        var now = new Date().getTime();
        if (now - PL.startTime > 5000) {
            //console.log(_global.parent, _global.opener);
            var b = confirm("ループが5秒以上続いています。\n実行を停止するにはOKを押してください。");
            if (b) {
                throw new Error("実行を停止しました。");
            } else PL.loop_start2();
        }
    };

    PL.STDOUT = {
        append: function append(s) {
            console.log(s);
        }
    };
    if (typeof $ === "function") {
        $(function () {
            var c = $("#output");
            if (c.length > 0) {
                PL.STDOUT = c;
            }
        });
    }
    PL.Option = function (o) {
        if (!(this instanceof PL.Option)) return new PL.Option(o);
        for (var k in o) {
            this[k] = o[k];
        }
    };
    PL.parseArgs = function (a) {
        var res = Array.prototype.slice.call(a);
        if (res[res.length - 1] instanceof PL.Option) {
            res.options = res.pop();
        } else {
            res.options = {};
        }
        return res;
    };
    PL.parseArgs2 = function (arg, spec) {
        // spec: [{name:  , defval: }]
        arg = Array.prototype.slice.call(arg);
        var opt = null;
        if (arg[arg.length - 1] instanceof PL.Option) {
            opt = arg.pop();
        }
        var res = spec.map(function (s, i) {
            return i < arg.length ? arg[i] : opt && opt[s.name] !== undefined ? opt[s.name] : s.defval;
        });
        return res;
    };

    PL.opt = PL.Option;
    PL.range = function (b, e) {
        var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        if (e == null) {
            e = b;b = 0;
        }
        if (!PL.isinstance(b, PL.int)) throw new Error("rangeの引数(開始)には整数を指定してください");
        if (!PL.isinstance(e, PL.int)) throw new Error("rangeの引数(終了)には整数を指定してください");
        if (!PL.isinstance(s, PL.int)) throw new Error("rangeの引数(増分)には整数を指定してください");
        var res = [];
        for (; s > 0 && b < e || s < 0 && b > e; b += s) {
            res.push(b);
        }return res;
    };
    PL.wrap = function (v) {
        return v;
    };
    PL.class = function (parent, defs) {
        if (arguments.length < 2) {
            defs = parent;
            parent = PL.Object || Object;
        }
        var nw = defs.__new__ || function (cls) {
            var self = Object.create(cls.prototype, {});
            return self;
        };
        var _res;
        _res = function res() {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(_res);
            var self = nw.apply(null, a);
            if (self.__init__) self.__init__.apply(self, arguments);
            return self;
        };
        _res.prototype = Object.create(parent.prototype, {});
        var methodNames = [];
        function addMethod(k) {
            var m = defs[k];
            if (typeof m === "function") {
                /*res.prototype[k]=function () {
                    var a=Array.prototype.slice.call(arguments);
                    a.unshift(this);
                    return m.apply(this,a);
                }; ^ this cannot override in subclasses */
                Object.defineProperty(_res.prototype, k, {
                    value: function value() {
                        var a = Array.prototype.slice.call(arguments);
                        a.unshift(this);
                        return m.apply(this, a);
                    },
                    enumerable: false
                });
                if (k !== "__str__") {
                    Object.defineProperty(_res, k, {
                        value: m
                    });
                }
                methodNames.push(k);
            } else {
                _res.prototype[k] = m;
            }
        }
        _res.__name__ = defs.CLASSNAME;
        _res.__module__ = "__main__";
        _res.prototype.constructor = _res;
        Object.defineProperty(_res.prototype, "__class__", {
            value: _res,
            enumerable: false
        });
        Object.defineProperty(_res, "__class__", {
            value: PL.type,
            enumerable: false
        });
        _res.__methodnames__ = methodNames;
        Object.defineProperty(_res, "__str__", {
            value: function value() {
                return "<class '" + _res.__module__ + "." + _res.__name__ + "'>";
            },
            enumerable: false
        });
        _res.__bases__ = PL.Tuple && PL.Tuple(parent ? [parent] : []);
        //res.prototype.toString=function(){return this.__str__();};
        for (var k in defs) {
            if (defs.hasOwnProperty(k)) addMethod(k);
        }
        return _res;
    };
    PL.float = function (s) {
        var v = s - 0;
        if (v !== v) throw new Error(s + " \u306F float\u306B\u5909\u63DB\u3067\u304D\u307E\u305B\u3093");
        return v;
    };
    PL.int = function (s) {
        var v = s - 0;
        if (v !== v) throw new Error(s + " \u306F int\u306B\u5909\u63DB\u3067\u304D\u307E\u305B\u3093");
        if (s.match(/\./)) throw new Error(s + " \u306F\u5C0F\u6570\u70B9\u3092\u542B\u3093\u3067\u3044\u308B\u306E\u3067int\u306B\u5909\u63DB\u3067\u304D\u307E\u305B\u3093");
        return v;
    };
    PL.super = function (klass, self) {
        //console.log("klass,self, name",klass,self, klass.__name__);
        //console.log("klass.prototype.CLASSNAME",klass.prototype.CLASSNAME);
        if (!klass.__bases__) {
            console.log(klass);
            throw new Error("superclass of " + klass.prototype.CLASSNAME + " not found");
        }
        var superclass = klass.__bases__.elems[0];
        if (!superclass) {
            throw new Error("superclass of " + klass.prototype.CLASSNAME + " not found");
        }
        //console.log("superclass", superclass, superclass.__name__, klass.__methodnames__, superclass.__methodnames__);
        var superprot = superclass.prototype;
        if (superprot === klass.prototype) {
            console.log(self, self.CLASSNAME);
            console.log(klass, klass.prototype.CLASSNAME);
            console.log(superclass, superclass.prototype.CLASSNAME);
            console.log(superprot, superprot.CLASSNAME);
            throw new Error("SAME!");
        }
        //console.log("superprot",superprot.CLASSNAME);
        var res = {};
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = klass.__methodnames__[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var meth = _step4.value;

                if (typeof superprot[meth] !== "function") continue;
                Object.defineProperty(res, meth, { value: superprot[meth].bind(self) });
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        return res;
    };
    PL.Tuple = PL.class({
        __init__: function __init__(self, elems) {
            self.elems = elems;
            for (var i = 0; i < elems.length; i++) {
                self[i] = elems[i];
            }
        },
        toString: function toString(self) {
            return "(" + self.elems.join(", ") + ")";
        }
    });
    PL.Tuple.prototype[Symbol.iterator] = function () {
        var _elems;

        return (_elems = this.elems)[Symbol.iterator].apply(_elems, arguments);
    };
    PL.None = null;
    PL.checkSet = function (v) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Variable";

        if (v !== undefined) return v;
        throw new Error(name + " is not defined.");
    };
    PL.Tuple.__bases__ = PL.Tuple([]);
    PL.Slice = PL.class({
        __init__: function __init__(self, start, stop) {
            var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

            self.start = start;
            self.stop = stop;
            self.step = step;
        },
        toString: function toString(self) {
            return "slice(" + self.start + ", " + self.stop + ", " + self.step + ")";
        }
    });
    PL.invoke = function (self, name, args) {
        var m = self[name];
        if (typeof m === "function") return m.apply(self, args);
        return m.__call__.apply(m, args);
    };
    PL.Object = PL.class(Object, {
        __init__: function __init__() {}
    });
    PL.ops = {
        "+": "add",
        "-": "sub",
        "*": "mul",
        "/": "div",
        "//": "floordiv",
        "%": "mod",
        ">": "gt",
        "<": "lt",
        ">=": "ge",
        "<=": "le",
        "!=": "ne",
        "==": "eq",
        "**": "pow"
    };
    PL.iops = {};
    var k;
    for (k in PL.ops) {
        if (k.match(/=/)) continue;
        PL.iops[k + "="] = "i" + PL.ops[k];
    }
    function u(v) {
        return v;
    }

    PL.invalidOP = function (left, op, right) {
        function typestr(val) {
            if (val == PL.None) return "None";
            return val && PL.type(val).__name__;
            /*const res=(typeof u(val));
            if (res!=="object") return res;
            if (val && val.__getTypeName__) return val.__getTypeName__();
            return res;*/
        }
        throw new Error("unsupported operand type(s) for " + op + ": '" + typestr(left) + "' and '" + typestr(right) + "'");
    };

    PL.LoopChecker = {
        check: function check() {
            if (this.last) {
                var now = new Date().getTime();
                if (now - this.last > 5000) {
                    throw new Error("無限ループをストップしました");
                }
            }
        },
        reset: function reset() {
            this.last = new Date().getTime();
        }
    };
    //--- monkey patch

    PL.addMonkeyPatch = function (cl, methods) {
        var p = cl.prototype;
        for (var k in methods) {
            if (methods.hasOwnProperty(k)) addMethod(k);
        }
        function addMethod(k) {
            var m = methods[k];
            Object.defineProperty(p, k, {
                value: k === "__class__" ? m : function () {
                    var a = Array.prototype.slice.call(arguments);
                    a.unshift(this);
                    return m.apply(this, a);
                },
                enumerable: false
            });
        }
    };
    var IDHASH = Symbol("identityHashcode");
    PL.addMonkeyPatch(Object, {
        __class__: Object,
        //__getTypeName__: function (){return "<class object>";},
        __call__: function __call__(self) {
            for (var _len4 = arguments.length, a = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                a[_key4 - 1] = arguments[_key4];
            }

            //var a=Array.prototype.slice.call(arguments,1);
            return self.apply(self, a);
        },
        //toString: function (self) {return self.value+"";},
        __str__: function __str__(self) {
            self[IDHASH] = self[IDHASH] || ~~(Math.random() * Math.pow(2, 31));
            var t = PL.type(self);
            return "<" + t.__module__ + "." + t.__name__ + " object at 0x" + this[IDHASH].toString(16) + ">";
        },
        __add__: function __add__(self, other) {
            return self + u(other);
        },
        __sub__: function __sub__(self, other) {
            return self - u(other);
        },
        __mul__: function __mul__(self, other) {
            return self * u(other);
        },
        __div__: function __div__(self, other) {
            return self / u(other);
        },
        __floordiv__: function __floordiv__(self, other) {
            return Math.floor(self / u(other));
        },
        __mod__: function __mod__(self, other) {
            return self % u(other);
        },
        __gt__: function __gt__(self, other) {
            return self > u(other);
        },
        __lt__: function __lt__(self, other) {
            return self < u(other);
        },
        __ge__: function __ge__(self, other) {
            return self >= u(other);
        },
        __le__: function __le__(self, other) {
            return self <= u(other);
        },
        __eq__: function __eq__(self, other) {
            return self == u(other); /* Number wrapped */
        },
        __ne__: function __ne__(self, other) {
            return self != u(other); /* Number wrapped */
        },
        __pow__: function __pow__(self, other) {
            return Math.pow(self, u(other));
        },

        __iadd__: function __iadd__(self, other) {
            self = self.__add__(other);return self;
        },
        __isub__: function __isub__(self, other) {
            self = self.__sub__(other);return self;
        },
        __imul__: function __imul__(self, other) {
            self = self.__mul__(other);return self;
        },
        __idiv__: function __idiv__(self, other) {
            self = self.__div__(other);return self;
        },
        __ifloordiv__: function __ifloordiv__(self, other) {
            self = self.__floordiv__(other);return self;
        },
        __imod__: function __imod__(self, other) {
            self = self.__mod__(other);return self;
        },
        __ipow__: function __ipow__(self, other) {
            self = self.__pow__(other);return self;
        },

        __getattr__: function __getattr__(self, name) {
            //__getattr__は、オブジェクトのインスタンス辞書に属性が見つからないときに呼び出されるメソッドです。
            throw new Error("\u30D5\u30A3\u30FC\u30EB\u30C9 " + name + " \u306F\u3042\u308A\u307E\u305B\u3093");
        },
        __getattribute__: function __getattribute__(self, name) {
            if (!(name in self)) {
                return self.__getattr__(name);
            }
            var r = self[name];
            if (typeof r === "function") {
                return r.bind(self);
            }
            return r;
        },
        __setattr__: function __setattr__(self, name, value) {
            self[name] = value;
        },
        __delattr__: function __delattr__(self, name) {
            delete self[name];
        },
        __getitem__: function __getitem__(self, key) {
            if (!(key in self)) {
                throw new Error("\u5024" + self + "[" + key + "] \u306F\u3042\u308A\u307E\u305B\u3093");
            }
            return self[key];
        },
        __setitem__: function __setitem__(self, key, value) {
            self[key] = value;
        }
        //____: function (self,other) { return selfother;},
    });
    PL.addMonkeyPatch(Number, {
        __class__: Number,
        __str__: function __str__(self) {
            return self + "";
        }
    }
    //__getTypeName__: function (){return "number";},
    );
    function setStr2Class(klass, name) {
        Object.defineProperty(klass, "__str__", {
            value: function value() {
                return "<class '" + name + "'>";
            },
            enumerable: false
        });
    }
    setStr2Class(String, "str");
    setStr2Class(Boolean, "bool");
    setStr2Class(Function, "function");
    setStr2Class(PL.int, "int");
    setStr2Class(PL.float, "float");
    setStr2Class(PL.type, "type");
    /*Object.defineProperty(Number, "__str__", {
        value:function () {
            const n=this;
            if (Math.floor(n)==n) return "<class 'int'>";
            else return "<class 'float'>";
        },
        enumerable: false,
    });*/
    PL.addMonkeyPatch(String, {
        __class__: String,
        __str__: function __str__(self) {
            return self + "";
        },

        //__getTypeName__: function (){return "str";},
        __mul__: function __mul__(self, other) {
            switch (typeof other === "undefined" ? "undefined" : _typeof(other)) {
                case "number":
                    var res = "";
                    for (; other; other--) {
                        res += self;
                    }return res;
                default:
                    PL.invalidOP(self, "__mul__", other);
            }
        },
        __mod__: function __mod__(self, other) {
            var args = void 0;
            if (other instanceof Array) args = other;else if (other instanceof PL.Tuple) args = other.elems;else args = [other];
            return sprintfJS.apply(undefined, [self].concat(_toConsumableArray(args)));
        },
        __add__: function __add__(self, other) {
            if (typeof u(other) !== "string") {
                throw new Error("文字列に文字列以外の値を+で追加できません．str()関数を使って変換してください．");
            }
            return Object.prototype.__add__.call(self, other);
        },
        __gt__: otherShouldString("__gt__"),
        __lt__: otherShouldString("__lt__"),
        __ge__: otherShouldString("__ge__"),
        __le__: otherShouldString("__le__"),
        __eq__: otherShouldString("__eq__"),
        __ne__: otherShouldString("__ne__"),
        format: function format(self) {
            var str = self;
            var o = {};
            var i = 0;

            for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                args[_key5 - 1] = arguments[_key5];
            }

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = args[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _a = _step5.value;

                    if (_a instanceof PL.Option) {
                        Object.assign(o, _a);
                    } else {
                        o[i + ""] = _a;
                    }
                    i++;
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            i = 0;
            return str.replace(/{([0-9a-zA-Z_]*)}/g, function (_, name) {
                if (!name) {
                    return PL.str(o[i++]);
                } else {
                    return PL.str(o[name]);
                }
            });
        }
    });

    function otherShouldString(k) {
        return function (self, other) {
            if (typeof u(other) !== "string") {
                PL.invalidOP(self, k, other);
            }
            return Object.prototype[k].call(self, other);
        };
    }
    PL.addMonkeyPatch(Boolean, {
        __class__: Boolean,
        //: function (){return "boolean";},
        __str__: function __str__(self) {
            //  self is wrapped. always trusy
            return self == true ? "True" : "False";
        }
    });
    PL.addMonkeyPatch(Function, {
        __class__: Function
        //__getTypeName__: function (){return "function";},
    });
    var orig_sort = Array.prototype.sort;
    function sliceToIndex(array, _ref) {
        var start = _ref.start,
            stop = _ref.stop,
            step = _ref.step;

        start = start || 0;
        if (stop == null) stop = array.length;
        if (start < 0) start = array.length + start;
        if (stop < 0) stop = array.length + stop;
        if (step == null) step = 1;
        if (step > 0) {
            return (/*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var i;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    i = start;

                                case 1:
                                    if (!(i < stop)) {
                                        _context.next = 7;
                                        break;
                                    }

                                    _context.next = 4;
                                    return i;

                                case 4:
                                    i += step;
                                    _context.next = 1;
                                    break;

                                case 7:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                })()
            );
        }
        if (step < 0) {
            return (/*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var i;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    i = start;

                                case 1:
                                    if (!(i > stop)) {
                                        _context2.next = 7;
                                        break;
                                    }

                                    _context2.next = 4;
                                    return i;

                                case 4:
                                    i += step;
                                    _context2.next = 1;
                                    break;

                                case 7:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                })()
            );
        }
        throw new Error("Slice step is 0");
    }
    PL.addMonkeyPatch(Array, {
        __class__: PL.list,
        append: function append(self) {
            for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                args[_key6 - 1] = arguments[_key6];
            }

            return self.push.apply(self, args);
        },
        __add__: function __add__(self) {
            for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                args[_key7 - 1] = arguments[_key7];
            }

            return self.concat.apply(self, args);
        },
        __delattr__: function __delattr__(self, i) {
            self.splice(i, 1);
        },
        __str__: function __str__(self) {
            return "[" + self.map(function (e) {
                return PL.str(e);
            }).join(", ") + "]";
        },

        __getitem__: function __getitem__(self, key) {
            if (key instanceof PL.Slice) {
                var res = [];
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = sliceToIndex(this, key)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var i = _step6.value;

                        res.push(this[i]);
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                return res;
            }
            if (key < 0) key = self.length + key;
            if (key >= self.length) throw new Error("\u6DFB\u5B57[" + key + "]\u306F\u7BC4\u56F2\u5916\u3067\u3059(0..." + (self.length - 1) + ")");
            return self[key];
        },
        __setitem__: function __setitem__(self, key, value) {
            if (key instanceof PL.Slice) {
                var it = value[Symbol.iterator]();
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = sliceToIndex(this, key)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var i = _step7.value;

                        this[i] = it.next().value;
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }

                return value;
            }
            if (key < 0) key = self.length + key;
            if (key >= self.length) throw new Error("\u6DFB\u5B57[" + key + "]\u306F\u7BC4\u56F2\u5916\u3067\u3059(0..." + (self.length - 1) + ")");
            self[key] = value;
        },
        copy: function copy(self) {
            return self.slice();
        },
        sorted: function sorted(self) {
            var _self$slice;

            for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
                args[_key8 - 1] = arguments[_key8];
            }

            return (_self$slice = self.slice()).sort.apply(_self$slice, args);
        },
        sort: function sort(self, comp) {
            comp = comp || function (a, b) {
                return a > b ? 1 : a < b ? -1 : 0;
            };
            if (comp instanceof PL.Option) {
                var key = comp.key;
                if (typeof key === "string") {
                    var ks = key;
                    key = function key(o) {
                        return o[ks];
                    };
                }
                if (typeof key === "function") {
                    var sorted = self.map(function (val, idx) {
                        return { val: val, idx: idx };
                    }).sort(function (a, b) {
                        var va = key(a.val);
                        var vb = key(b.val);
                        if (va > vb) return 1;else if (va < vb) return -1;else return a.idx - b.idx;
                    }).map(function (r) {
                        return r.val;
                    });
                    while (self.length) {
                        self.pop();
                    }while (sorted.length) {
                        self.push(sorted.shift());
                    }
                }
                if (comp.reverse) {
                    self.reverse();
                }
                return self;
            }
            return orig_sort.apply(self, [comp]);
        },
        __contains__: function __contains__(self, elem) {
            return self.indexOf(elem) >= 0;
        }
    });

    //---
    PL.builtins = ["range", "input", "str", "int", "sum", "float", "object", "len", "type", "quit", "exit", "sorted", "abs", "min", "max", "list", "isinstance", "zip", "fillRect", "setColor", "setTimeout", "clearRect", "clear"];
    root.PYLIB = PL;

    function sprintfJS() {
        //  input -> jsString  output->jsString
        // from http://d.hatena.ne.jp/uupaa/20080301/1204380616
        var rv = [],
            i = 0,
            v,
            width,
            precision,
            sign,
            idx,
            argv = arguments,
            next = 0;
        var unsign = function unsign(val) {
            return val >= 0 ? val : val % 0x100000000 + 0x100000000;
        };
        var getArg = function getArg() {
            if (!idx && next >= argv.length) throw new Error("printfの引数が足りません");
            return argv[idx ? idx - 1 : next++];
        };
        var parseInt2 = function parseInt2(arg) {
            var res = 0;
            if (arg && arg.IS_POINTER) {
                return arg.addr || 0;
            }
            switch (typeof arg === "undefined" ? "undefined" : _typeof(arg)) {
                case "number":
                    res = arg - 0;
                    break;
                case "boolean":
                    res = !!arg;
                    break;
            }
            return res;
        };
        var s = (getArg() + "     ").split(""); // add dummy 5 chars.

        for (; i < s.length - 5; ++i) {
            if (s[i] !== "%") {
                rv.push(s[i]);continue;
            }

            ++i;idx = 0;precision = undefined;

            // arg-index-specifier
            if (!isNaN(parseInt(s[i])) && s[i + 1] === "$") {
                idx = parseInt(s[i]);i += 2;
            }
            // sign-specifier
            // sign = (s[i] !== "#") ? false : ++i, true;
            if (s[i] !== "#") {
                sign = false;
            } else {
                ++i;sign = true;
            }
            // width-specifier
            width = isNaN(parseInt(s[i])) ? 0 : parseInt(s[i++]);
            // precision-specifier
            if (s[i] === "." && !isNaN(parseInt(s[i + 1]))) {
                precision = parseInt(s[i + 1]);i += 2;
            }

            switch (s[i]) {
                case "d":
                    v = parseInt2(getArg()).toString();break;
                case "u":
                    v = parseInt2(getArg());if (!isNaN(v)) {
                        v = unsign(v).toString();
                    }break;
                case "o":
                    v = parseInt2(getArg());if (!isNaN(v)) {
                        v = (sign ? "0" : "") + unsign(v).toString(8);
                    }break;
                case "x":
                    v = parseInt2(getArg());if (!isNaN(v)) {
                        v = (sign ? "0x" : "") + unsign(v).toString(16);
                    }break;
                case "X":
                    v = parseInt2(getArg());if (!isNaN(v)) {
                        v = (sign ? "0X" : "") + unsign(v).toString(16).toUpperCase();
                    }break;
                case "f":
                    v = parseFloat(getArg()).toFixed(precision || 6);break;
                case "c":
                    width = 0;v = getArg();v = typeof v === "number" ? String.fromCharCode(v) : NaN;break;
                case "s":
                    width = 0;v = getArg();if (precision) {
                        v = v.substring(0, precision);
                    }break;
                case "%":
                    width = 0;v = s[i];break;
                default:
                    width = 0;v = "%" + (width ? width.toString() : "") + s[i].toString();break;
            }
            if (isNaN(v)) {
                v = v.toString();
            }
            if (v.length < width) rv.push(" ".repeat(width - v.length), v);else rv.push(v);
        }
        var line = rv.join("");
        //console.log("ARGV",next,argv.length);
        //if (!idx && next<argv.length) _global.doNotification("printfの引数が多すぎます．");
        return line;
    }
    return PL;
});
