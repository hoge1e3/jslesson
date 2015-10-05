JSONLisp = (function() {
    var ev, evalArgs, apply;
    var cnt = 0,
        debug = false,
        depth = 0;
    var keys = {
        EXPR: "passing_expr",
        Q: "quote",
        C: "curScope",
        "while": "while",
        A_LEN: "array_len",
        O_EACH_K: "obj_each_keys",
        A_GET: "array_get",
        O_GET: "object_get",
        A_SET: "array_set",
        O_SET: "object_set",
        V_GET: "var_get",
        V_SET: "var_set",
        LAZY: "lazy",
        LAMBDA: "lambda"
    };
    var special = {};
    special[keys.Q] = function(scope, expr) {
        var args = [];
        for (var i = 1; i < expr.length; i++) {
            args.push(expr[i]);
        }
        return args;
    };
    //special[keys.C]=function (scope,expr){return scope;};
    special[keys.V_GET] = function(scope, expr) {
        return builtin.get(scope, ev(scope, expr[1]));
    };
    special[keys.V_SET] = function(scope, expr) {
        return builtin.set(scope, ev(scope, expr[1]), ev(
            scope, expr[2]));
    };
    special[keys.LAZY] = function(scope, expr) {
        return {
            scope: scope,
            expr: expr[1]
        };
    };
    special[keys.LAMBDA] = function(scope, expr) {
        return {
            scope: scope,
            expr: expr[2],
            params: expr[1]
        };
    };

    function dumpRes(r) {
        if (debug) {
            depth--;
            console.log(indent(depth) + "end", typeof r, r);
        }
        return r;
    }

    function indent(d) {
        var r = "";
        while (d--) {
            r += "--";
        }
        return r;
    }
    var B=builtin = {
        ev: function(scope, expr) {
            var args, ns;
            if (debug) {
                console.log(indent(depth) + JSON.stringify(
                    expr));
                depth++;
                if (depth > 30) throw "ERR!";
            }
            if (typeof expr != "object" || !expr[0])
                return dumpRes(expr);
            var cmd = ev(scope, expr[0]),
                n;
            if (typeof cmd == "string") {
                n = cmd;
                cmd = scope[n];
            }
            if (!cmd) throw "Command " + cmd + "(" +
                n + ") not found";
            if (cmd.special) {
                return dumpRes(cmd(scope, expr));
            }
            args = [];
            for (var i = 1; i < expr.length; i++) {
                var a=ev(scope, expr[i]);
                if (B.is_exception(a)) return a;
                args.push(a);
            }
            return dumpRes(apply(cmd, args));
        },
        apply: function(cmd, args) {
            if (typeof cmd == "function") {
                return cmd.apply(this, args);
            } else if (cmd.expr) {
                if (cmd.params) {
                    ns = newScope(cmd.scope);
                    args = args || [];
                    cmd.params.forEach(function(n, i) {
                        ns[n] = args[i];
                    });
                    return ev(ns, cmd.expr);
                } else {
                    return ev(cmd.scope, cmd.expr);
                }
            }
            throw "Command " + cmd + " not found";
        },

        newScope: function(o) {
            var f = function() {};
            f.prototype = o;
            return new f;
        },
        get: function(scope, name) {
            return scope[name];
        },
        set: function s(scope, name, value) {
            return scope[name] = value;
        },
        mul: function(x, y) {
            return x * y;
        },
        add: function(x, y) {
            return x + y;
        },
        lt: function(a, b) {
            return a < b;
        },
        "do": function() {
            return arguments[arguments.length - 1];
        },
        "debug": function() {
            console.log.apply(console, arguments);
            return arguments[0];
        },
        toJSON: JSON.stringify.bind(),
        array_len: function(a) {
            return a.length;
        },
        "if": function (cond, then, _else) {
            if(cond) return apply(then);
            if (_else) return apply(_else);
        },
        "while": function(cond, expr) {
            var res;
            while (apply(cond)) {
                res = apply(expr);
                if (B.is_exception(res)) {
                    if(res.message=="break") {
                        return res.message;
                    }
                    return res;
                }
            }
            return res;
        },
        "try": function (stmt,cat) {
            try {
                var res=apply(stmt);
                if (B.is_exception(res)) return apply(cat,[res.message]);
                return res;
            } catch (e) {
                return apply(cat,[e.message]);
            }
        },
        "throw": function (mesg) {
            return new Error(mesg);
        },
        is_exception: function (e) {
            return e instanceof Error;
        }
    };
    window.newScope = builtin.newScope;

    function initRoot() {
        var res = {};
        _.extend(res, builtin);
        _.each(special, function(e, k) {
            e.special = true;
        });
        _.extend(res, special);
        return res;
    }

    function run(expr) {
        scope = initRoot();
        return ev(scope, expr);
    }
    ev = builtin.ev;
    apply = builtin.apply;
    window.run = run;
    return {
        run: run,
        initRoot: initRoot,
        ev: builtin.ev,
        keys: keys,
        builtin: builtin,
        special: special
    };
})();