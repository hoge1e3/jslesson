define(["Visitor","IndentBuffer","assert"],
function (Visitor,IndentBuffer,assert) {
    const BAWRAPPER="bawrapper";//
    const vdef={
        program: function (node) {
            this.visit(node.body);
        },
        classdef: function (node) {
            this.printf("class %s:%{%v%}",node.name,node.body);
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
            const useWrapper=(inf && inf.wrapper);
            const localName=node.alias || node.name;
            this.printf("import %s%v", useWrapper?"_":"", node.name);
            if (node.alias || useWrapper) {
                this.printf(" as %v", localName);
            }
            /*if (inf && inf.wrapper) {
                this.printf("import _%v",node.name);
                if (node.alias) this.printf(" as %v",node.alias);
                else this.printf(" as %v",node.name);
            } else {
                this.printf("import %v",node.name);
                if (node.alias) this.printf(" as %v",node.alias);
            }*/
            //this.printf("%n");
        },
        importStmt2: function (node) {
            this.printf("import %j",[",",node.elements]);
        },
        importElement: function (node) {
            const nameHead=node.name[0];
            const inf=this.importable[nameHead+""];
            const useWrapper=(inf && inf.wrapper);
            const localName=node.alias || node.name;
            this.printf("%s%v", useWrapper?"_":"", node.name);
            if (node.alias || useWrapper) {
                this.printf(" as %v", localName);
            }
        },

        fromImportStmt: function (node) {
            const nameHead=node.name[0];
            const inf=this.importable[nameHead+""];
            const useWrapper=(inf && inf.wrapper);
            this.printf("from %s%v import %v",useWrapper?"_":"",node.name, node.localNames);
        },
        localNames: function (node) {
            if (node.names.text==="*") this.printf("*");
            else this.printf("%j",[",",node.names]);
        },
        globalStmt: function (node) {
            this.printf("global %j",[",",node.names]);
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
        delStmt: function (node) {
            this.printf("del %v",node.expr);
        },
        whileStmt: function (node) {
            this.printf("while %v%v", node.cond,node.do);
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
            this.printf("for %j in %v%v", [",",node.vars], node.set, node.do);
        },
        letStmt: function (node) {
            this.visit(node.left);
            this.printf("%s",node.op);
            this.visit(node.right);
            //this.printf("%n");
        },
        printStmt: function (node) {
            var a=this.anon.get(node);
            if (a.nobr) {
                this.printf("print(%j,end=' ')",[",",a.values]);
            } else {
                this.printf("print(%j)",[",",a.values]);
            }
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
        exprList: function (node) {
            this.printf("%j",[",",node.body]);
        },
        exprSliceList: function (node) {
            this.printf("%j",[",",node.body]);
        },
        slice: function (node) {
            const empty={type:"literal", toString:()=>""};
            node.start=node.start||empty;
            node.stop=node.stop||empty;
            node.step=node.step||empty;
            this.printf("%v:%v:%v", node.start, node.stop, node.step);
        },
        lvalList: function (node) {
            this.printf("%j",[",",node.body]);
        },
        array: function (node) {
            this.printf("[%j]",[",",node.body]);
        },
        dict: function (node) {
            this.printf("{%j}",[",",node.body]);
        },
        dictEntry: function (node) {
            this.printf("%v:%v",node.key,node.value);
        },
        index: function (node) {
            this.printf("[%v]",node.body);
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
        ":indent": function () {
            this.printf(":%{");
        },
        "dedent": function () {
            this.printf("%}");
        },
        "nodent": function () {
            this.printf("%n");
        },
        infixl: function(node) {
            this.printf("%v%v%v",node.left,node.op,node.right);
        },
        isnt: function () {
            this.printf(" is not ");
        },
        postfix: function (node) {
            this.printf("%v%v",node.left,node.op);
        },
        prefix: function (node) {
            this.printf("%v%v",node.op,node.right);
        },
        breakStmt: function () {
            this.printf("break");
        },
        continueStmt: function () {
            this.printf("continue");
        },
        passStmt: function () {
            this.printf("pass");
        },
        superCall: function () {
            this.printf("super()");
        },
        symbol: function (node) {
            var a=this.anon.get(node);
            if (a.scopeInfo && a.scopeInfo.builtin) {
                this.printf("%s._%s", BAWRAPPER,node+"");
            } else {
                this.printf("%s",node+"");
            }
        },
        not: function() {
            this.printf("not ");
        },
        "literal3":function (node) {
            this.printf("%s",node+"");
        },
        "literal":function (node) {
            this.printf("%s",node+"");
        }
    };
    const verbs=[">=","<=","==","!=","+=","-=","*=","/=","%=","**","//",
      ">","<","=",".",":","+","-","*","/","%","(",")",",",
      "number","and","or","True","False","None"];
    for (let ve of verbs) {
        vdef[ve]=function (node) {
            //console.log("verb",node);
            this.printf(" %s ",node+"");
        };
    }
    function gen(node,anon,options={}) {
        const v=Visitor(vdef);
        v.anon=assert(anon);
        v.importable=options.importable||{};
        //console.log("IMP",v.importable);
        v.def=function (node) {
            var v=this;
            if (node instanceof Array) {
                for (let n of node) v.visit(n);
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
