// !!DO NOT EDIT this file!!
// Edit www/js/build/python//PyLib.js Instead.
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
    //test!!
    var PL = {};
    PL.import = function (lib) {
        if (PL.import.libs[lib]) return PL.import.libs[lib];
        throw new Error("ライブラリ " + lib + " はインポートできません．(サーバで実行すると動作する可能性があります)");
    };
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
            floor: Math.floor.bind(Math)
        }
    };
    //PyX.install(PL);
    PL.lineBuf = "";
    PL.print = function () {
        var a = PL.parseArgs(arguments);
        console.log("print", arguments, a);
        var end = a.options.end != null ? a.options.end : "\n";
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
    PL.float = function (s) {
        return s - 0;
    };
    PL.int = function (s) {
        return parseInt(s - 0);
    };
    PL.str = function (s) {
        //  s==false
        if (s != null && s.__str__) return s.__str__();
        return s + "";
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

    PL.quit = function (s) {
        PL.exit();
    };
    PL.exit = function (s) {
        var e = new Error("exit でプログラムが終了しました。");
        e.noTrace = true;
        throw e;
    };
    PL.type = function (s) {
        switch (typeof s === "undefined" ? "undefined" : _typeof(s)) {
            case "number":
                return Number;
            case "string":
                return String;
            case "function":
                return Function;
            case "boolean":
                return Boolean;
            default:
                //if (s && s.__getTypeName__) return s.__getTypeName__();
                if (s && s.__class__) return s.__class__;
                return "object";
        }
    };
    PL.sorted = function (a) {
        return a.slice().sort();
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
            var b = confirm("ループが５秒以上続いています。\n実行を停止するにはOKを押してください。");
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
    PL.opt = PL.Option;
    PL.range = function (b, e) {
        var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        if (e == null) {
            e = b;b = 0;
        }
        var res = [];
        for (; b < e; b += s) {
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
        function addMethod(k) {
            var m = defs[k];
            if (typeof m === "function") {
                _res.prototype[k] = function () {
                    var a = Array.prototype.slice.call(arguments);
                    a.unshift(this);
                    return m.apply(this, a);
                };
            } else {
                _res.prototype[k] = m;
            }
        }
        _res.__name__ = defs.CLASSNAME;
        _res.prototype.constructor = _res;
        _res.prototype.__class__ = _res;
        _res.__str__ = function () {
            return "<class '__main__." + _res.__name__ + "'>";
        };
        _res.__bases__ = PL.Tuple && PL.Tuple(parent ? [parent] : []);
        for (var k in defs) {
            addMethod(k);
        }return _res;
    };
    PL.super = function (klass, self) {
        //console.log("klass,self",klass,self);
        //console.log("klass.prototype.CLASSNAME",klass.prototype.CLASSNAME);
        var superclass = klass.__bases__.elems[0];
        if (!superclass) {
            throw new Error("superclass not found");
        }
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
        for (var meth in superprot) {
            if (typeof superprot[meth] !== "function") continue;
            res[meth] = superprot[meth].bind(self);
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
    PL.Tuple.__bases__ = PL.Tuple([]);
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

    PL.invalidOP = function (op, to) {
        throw new Error("Cannot do opration " + op + " to " + to);
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

    String.prototype.format = function () {
        var str = this;
        var o = {};
        var i = 0;

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var a = _step.value;

                if (a instanceof PL.Option) {
                    Object.assign(o, a);
                } else {
                    o[i + ""] = a;
                }
                i++;
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

        i = 0;
        return str.replace(/{([0-9a-zA-Z_]*)}/g, function (_, name) {
            if (!name) {
                return o[i++];
            } else {
                return o[name];
            }
        });
    };
    PL.addMonkeyPatch = function (cl, methods) {
        var p = cl.prototype;
        for (var k in methods) {
            addMethod(k);
        }function addMethod(k) {
            var m = methods[k];
            Object.defineProperty(p, k, {
                value: function value() {
                    var a = Array.prototype.slice.call(arguments);
                    a.unshift(this);
                    return m.apply(this, a);
                },
                enumerable: false
            });
        }
    };
    PL.addMonkeyPatch(Object, {
        __getTypeName__: function __getTypeName__() {
            return "<class object>";
        },
        __call__: function __call__(self) {
            for (var _len4 = arguments.length, a = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                a[_key4 - 1] = arguments[_key4];
            }

            //var a=Array.prototype.slice.call(arguments,1);
            return self.apply(self, a);
        },
        //toString: function (self) {return self.value+"";},
        __str__: function __str__(self) {
            return self + "";
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

        __delattr__: function __delattr__(self, name) {
            delete self[name];
        }
        //____: function (self,other) { return selfother;},
    });
    PL.addMonkeyPatch(Number, {
        __getTypeName__: function __getTypeName__() {
            return "<class number>";
        }
    });
    PL.addMonkeyPatch(String, {
        __getTypeName__: function __getTypeName__() {
            return "<class str>";
        },
        __mul__: function __mul__(self, other) {
            switch (typeof other === "undefined" ? "undefined" : _typeof(other)) {
                case "number":
                    var res = "";
                    for (; other; other--) {
                        res += self;
                    }return res;
                default:
                    PL.invalidOP("__mul__", other);
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
        }
    });
    PL.addMonkeyPatch(Boolean, {
        __getTypeName__: function __getTypeName__() {
            return "<class boolean>";
        },
        __str__: function __str__(self) {
            //  self is wrapped. always trusy
            return self == true ? "True" : "False";
        }
    });
    PL.addMonkeyPatch(Function, {
        __getTypeName__: function __getTypeName__() {
            return "<class function>";
        }
    });
    PL.addMonkeyPatch(Array, {
        append: function append(self) {
            for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                args[_key5 - 1] = arguments[_key5];
            }

            return self.push.apply(self, args);
        },
        __add__: function __add__(self) {
            for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                args[_key6 - 1] = arguments[_key6];
            }

            return self.concat.apply(self, args);
        },
        __delattr__: function __delattr__(self, i) {
            self.splice(i, 1);
        },
        __str__: function __str__(self) {
            return "[" + self.join(", ") + "]";
        }
    });

    //---
    PL.builtins = ["range", "input", "str", "int", "float", "len", "type", "quit", "exit", "sorted", "abs", "min", "max", "fillRect", "setColor", "setTimeout", "clearRect", "clear"];
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
//# sourceMappingURL=PyLib.js.map