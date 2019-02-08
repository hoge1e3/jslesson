define(["Visitor","IndentBuffer","context","PyLib"],
function (Visitor,IndentBuffer,context,PL) {
    var PYLIB="PYLIB";
    const vdef={
        program: function (node) {
            this.visit(node.body);
        },
        classdef: function (node) {
            this.ctx.enter({inClass:node},()=>{
                this.printf("%s.class('%s',{%{%j%}}",PYLIB,node.name,[",",node.body]);
            });
        },
        define: function (node) {
            if (this.ctx.inClass) {
                this.printf("%n%s: function %s%v{%{%v%}}",node.name,node.params,node.body);
            } else {
                this.printf("function %s%v{%{%v%}}%n",node.name,node.params,node.body);

            }
        },
        paramList: function (node) {
            this.printf("(%j)",[",",node.body]);
        },
        importStmt: function (node) {
            if (node.alias) {
                this.printf("%s=%s.import('%v');",node.alias,PYLIB,node.name);
            } else {
                this.printf("%s=%s.import('%v');",node.name,PYLIB,node.name);
            }//this.printf("%n");
        },
        exprStmt: function (node) {
            this.visit(node.expr);
        },
        returnStmt: function (node) {
            this.printf("return %v;",node.expr);
        },
        ifStmt: function (node) {
            this.printf("if (%v) %v", node.cond,node.then);
            this.visit(node.elif);
            if (node.else) this.visit(node.else);
        },
        elifPart: function (node) {
            this.printf("else if (%v) %v", node.cond,node.then);
        },
        elsePart: function (node) {
            this.printf("else %v",node.then);
        },
        forStmt: function (node) {
            this.printf("var %v;%nfor (%v of %v) %v", node.var,node.var, node.set, node.do);
        },
        letStmt: function (node) {
            if (this.anon.get(node).needVar) {
                this.printf("var ");
            }
            this.visit(node.left);
            this.printf("=");
            this.visit(node.right);
            this.printf(";");
            //this.printf("%n");
        },
        globalStmt: function (node) {},
        printStmt: function (node) {
            if (node.nobr) this.printf("%s.print(%j,%s.opt({end:' '}));",
            PYLIB,[",",node.values],PYLIB);
            else this.printf("%s.print(%j);",PYLIB,[",",node.values]);
        },
        printStmt3: function (node) {
            this.printf("%s.print %v;",PYLIB,node.args);
        },
        memberRef: function (node) {
            this.printf(".%v",node.name);
        },
        args: function (node) {
            const noname=node.body.filter((a)=>!a.name);
            const hasname=node.body.filter((a)=>a.name);
            this.printf("(");
            this.printf("%j",[",",noname]);
            if (hasname.length) {
                this.printf(",%s.opt({%j})",PYLIB,[",",hasname]);
            }
            this.printf(")");
        },
        arg: function (node) {
            if (node.name) {
                this.printf("%s:",node.name);
            }
            this.visit(node.value);
        },
        block: function (node) {
            this.printf("{%{");
            this.visit(node.body);
            this.printf("%}}");
        },
        paren: function (node) {
            this.printf("(%v)",node.body);
        },
        ":indent": function (node) {
            this.printf("%{");
        },
        "dedent": function (node) {
            this.printf("%}");
        },
        "nodent": function (node) {
            this.printf("%n");
        },
        infixl: function(node) {
            if (isCmp(node)) {
                const ec=expandCmps(node);
                if (ec.length>1) {
                    this.printf("%j",[" and ",ec]);
                    return;
                }
            }
            var o=PL.ops[node.op+""];
            if (!o) throw new Error("No operator for "+node.op);
            this.printf("%s.wrap(%v).__%s__(%v)",PYLIB, node.left,o, node.right);
            //this.printf("%v%v%v",node.left,node.op,node.right);
        },
        postfix: function (node) {
            this.printf("%v%v",node.left,node.op);
        },
        prefix: function (node) {
            this.printf("%v%v",node.op,node.right);
        },
        breakStmt: function (node) {
            this.printf("break")
        }
    };
    const cmps={">":1,"<":1,"==":1,">=":1,"<=":1,"!=":1};
    function isCmp(node) {
        return cmps[node.op+""];
    }
    function expandCmps(node) {
        if (isCmp(node.left)) {
            var r=expandCmps(node.left);
            r.push( { type:"infixl", left: r[r.length-1].right, op:node.op, right:node.right});
            return r;
        } else {
            return [node];
        }
    }
    const verbs=[">=","<=","==","!=","+=","-=","*=","/=","%=",
      ">","<","=",".",":","+","-","*","/","%","(",")",",","!",
      "number","symbol","literal"];
    for (const ve of verbs) {
        vdef[ve]=function (node) {
            //console.log("verb",node);
            this.printf("%s",node+"");
        };
    }
    function gen(node,anon,options) {
        options=options||{};
        const v=Visitor(vdef);
        v.anon=anon;
        v.def=function (node) {
            var v=this;
            if (node instanceof Array) {
                for (const n of node) v.visit(n);
            } else {
                this.printf("%s(%s)",node+"",(node ? node.type+"": "UNDEF"));
                //throw new Error("Visiting undef "+(node && node.type));
            }
        };
        v.ctx=context();
        const buf=options.buf||IndentBuffer();
        buf.visitor=v;
        v.printf=buf.printf.bind(buf);
        v.buf=buf;
        if (options.genReqJS) {
            options.pyLibPath=options.pyLibPath||"PyLib";
            v.printf("requirejs(['%s'], function (%s) {%{",options.pyLibPath,PYLIB);
        }
        for (const n of PL.builtins) {
            v.printf("var %s=%s.%s;%n",n,PYLIB,n);
        }
        v.visit(node);
        if (options.genReqJS) {
            v.printf("%}});");
        }
        //console.log("pgen res",buf.buf);
        return buf.buf;
    }
    return gen;
});
