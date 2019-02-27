define(["Visitor","IndentBuffer"],
function (Visitor,IndentBuffer) {
    const BAWRAPPER="bawrapper";
    const vdef={
        program: function (node) {
            this.visit(node.body);
        },
        classdef: function (node) {
            this.printf("class %s%v:%{%v%}",node.name,node.body);
        },
        define: function (node) {
            this.printf("def %s%v:%{%v%}",node.name,node.params,node.body);
        },
        paramList: function (node) {
            this.printf("(%j)",[",",node.body]);
        },
        importStmt: function (node) {
            const nameHead=node.name[0];
            const inf=this.importable[nameHead+""];
            if (inf && inf.wrapper) {
                this.printf("import _%v",node.name);
                if (node.alias) this.printf(" as %v",node.alias);
                else this.printf(" as %v",node.name);
            } else {
                this.printf("import %v",node.name);
                if (node.alias) this.printf(" as %v",node.alias);
            }
            //this.printf("%n");
        },
        packageName: function (node) {
            this.printf("%j",[".",node]);
        },
        exprStmt: function (node) {
            this.visit(node.expr);
        },
        returnStmt: function (node) {
            this.printf("return %v",node.expr);
        },
        ifStmt: function (node) {
            this.printf("if %v%v", node.cond,node.then);
            this.visit(node.elif);
            if (node.else) this.visit(node.else);
        },
        elifPart: function (node) {
            this.printf("elif %v%v", node.cond,node.then);
        },
        elsePart: function (node) {
            this.printf("else%v",node.then);
        },
        forStmt: function (node) {
            this.printf("for %v in %v%v", node.var, node.set, node.do);
        },
        letStmt: function (node) {
            this.visit(node.left);
            this.printf("=");
            this.visit(node.right);
            //this.printf("%n");
        },
        printStmt: function (node) {
            if (node.nobr) this.printf("print(%j,end=' ')",[",",node.values]);
            else this.printf("print(%j)",[",",node.values]);
        },
        printStmt3: function (node) {
            this.printf("print%v",node.args);
        },
        memberRef: function (node) {
            this.printf(".%v",node.name);
        },
        args: function (node) {
            this.printf("(%j)",[",",node.body]);
        },
        tuple: function (node) {
            this.printf("(%j)",[",",node.body]);
        },
        tupleLval: function (node) {
            this.printf("(%j)",[",",node.body]);
        },
        array: function (node) {
            this.printf("[%j]",[",",node.body]);
        },
        index: function (node) {
            this.printf("[%j]",[":",node.body]);
        },
        arg: function (node) {
            if (node.name) {
                this.printf("%s=",node.name);
            }
            this.visit(node.value);
        },
        block: function (node) {
            this.printf(":%{");
            this.visit(node.body);
            this.printf("%}");
        },
        paren: function (node) {
            this.printf("(%v)",node.body);
        },
        ":indent": function (node) {
            this.printf(":%{");
        },
        "dedent": function (node) {
            this.printf("%}");
        },
        "nodent": function (node) {
            this.printf("%n");
        },
        infixl: function(node) {
            this.printf("%v%v%v",node.left,node.op,node.right);
        },
        postfix: function (node) {
            this.printf("%v%v",node.left,node.op);
        },
        prefix: function (node) {
            this.printf("%v%v",node.op,node.right);
        },
        breakStmt: function (node) {
            this.printf("break")
        },
        symbol: function (node) {
            var a=this.anon.get(node);
            if (a.scopeInfo && a.scopeInfo.builtin) {
                this.printf("%s._%s", BAWRAPPER,node+"");
            } else {
                this.printf("%s",node+"");
            }
        }
    };
    const verbs=[">=","<=","==","!=","+=","-=","*=","/=","%=","**",
      ">","<","=",".",":","+","-","*","/","%","(",")",",","!",
      "number","literal","and","or"];
    for (const ve of verbs) {
        vdef[ve]=function (node) {
            //console.log("verb",node);
            this.printf("%s",node+"");
        };
    }
    function gen(node,anon,options={}) {
        const v=Visitor(vdef);
        v.anon=anon;
        v.importable=options.importable||{};
        //console.log("IMP",v.importable);
        v.def=function (node) {
            var v=this;
            if (node instanceof Array) {
                for (const n of node) v.visit(n);
            } else {
                this.printf("%s(%s)",node+"",(node ? node.type+"": "UNDEF"));
                //throw new Error("Visiting undef "+(node && node.type));
            }
        };
        const buf=IndentBuffer();
        buf.visitor=v;
        v.printf=buf.printf.bind(buf);
        v.buf=buf;
        v.visit(node);
        //console.log("pgen res",buf.buf);
        return buf.buf;
    }
    return gen;
});
