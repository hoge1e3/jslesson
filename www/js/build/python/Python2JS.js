define(["Visitor","IndentBuffer","context","PyLib","PythonSemantics"],
function (Visitor,IndentBuffer,context,PL,S) {
    var PYLIB="PYLIB";
    const vdef={
        program: function (node) {
            this.printf("%s.LoopChecker.reset();%n",PYLIB);
            this.visit(node.body);
        },
        classdef: function (node) {
            const sp=b=>node.extends? this.visit(node.extends.super) : b.printf("Object");
            this.ctx.enter({inClass:node},()=>{
                this.printf("var %s=%s.class(%f,{%{"+
                    "%s:'%s',%j"+
                "%}});",
                node.name, PYLIB,sp,
                    "CLASSNAME",node.name, [",",node.body.filter(b=>b.type==="define")]);
            });
        },//
        define: function (node) {
            if (this.ctx.inClass) {
                this.printf("%n%s: function %v{%{%v%}}",node.name,node.params,node.body);
            } else {
                this.printf("function %s%v{%{%v%}}%n",node.name,node.params,node.body);

            }
        },
        paramList: function (node) {
            this.printf("(%j)",[",",node.body]);
        },
        importStmt: function (node) {
            var url=this.options.pyLibPath+"/py_"+node.name+".js";
            if (node.alias) {
                this.printf("var %s=require('%s').install(%s);", node.alias, url, PYLIB);
                //this.printf("var %s=%s.import('%v');",node.alias,PYLIB,node.name);
            } else {
                this.printf("var %s=require('%s').install(%s);", node.name, url, PYLIB);
                //this.printf("var %s=%s.import('%v');",node.name,PYLIB,node.name);
            }//this.printf("%n");
        },
        importStmt2: function (node) {
            for (let e of node.elements) {
                this.visit(e);
            }
        },
        importElement: function (node) {
            var url=this.options.pyLibPath+"/py_"+node.name+".js";
            if (node.alias) {
                this.printf("var %s=require('%s').install(%s);", node.alias, url, PYLIB);
            } else {
                this.printf("var %s=require('%s').install(%s);", node.name, url, PYLIB);
            }
        },
        fromImportStmt: function (node) {
            var url=this.options.pyLibPath+"/py_"+node.name+".js";
            if (node.localNames.names.text==="*"){
                this.printf("var {%s}=require('%s').install(%s);",
                S.importable[node.name].browser.join(","), url, PYLIB);
            } else {
                this.printf("var {%j}=require('%s').install(%s);", [",",node.localNames.names], url, PYLIB);
            }
        },
        exprStmt: function (node) {
            this.printf("%v;",node.expr);
        },
        returnStmt: function (node) {
            if (node.expr) this.printf("return %v;",node.expr);
            else this.printf("return ;");
        },
        delStmt: function (node) {
            var a=this.anon.get(node);
            if (a.index) {
                this.printf("%s.wrap(%v).__delattr__(%v);",PYLIB, a.obj, a.index);
            } else {
                this.printf("%s.wrap(%v).__delattr__('%s');",PYLIB, a.obj, a.name);
            }
        },
        whileStmt: function (node) {
            this.printf("while (%v) %v", node.cond,node.do);
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
            this.printf("var %j;%nfor (%v of %v) %v", [",",node.vars],node.vars[0], node.set, node.do);
        },
        listComprehension: function (node) {
            const vn=node.vars[0];
            this.printf("%s.listComprehension(%s=>%v, %v)",
                       PYLIB, vn, node.elem, node.set);
        },
        letStmt: function (node) {
            if (this.anon.get(node).needVar) {
                this.printf("var ");
            }
            console.log("NODEL",node.left);//lvallist
            const firstBody=node.left.body && node.left.body[0];
            const io=PL.iops[node.op+""];
            if (firstBody &&
                firstBody.type==="postfix" &&
                firstBody.op.type==="index") {
                // TODO: [x[5],y]=[2,3]  -> x.__setitem__(5,2), y=3
                const object=firstBody.left;
                const index=firstBody.op;
                const value=node.right;
                console.log("NODEL2",object,index);
                if (io) {
                    this.printf("%v.__setitem__(%v, "+
                        "%s.wrap( %v.__getitem__(%v) ).__%s__(%v)"+
                    ");",
                        object, index.body,
                        PYLIB, object, index.body, io, value
                    );
                } else {
                    this.printf("%v.__setitem__(%v, %v);",object, index.body,value );
                }
            } else if (io) {
                const value=node.right;
                this.printf("%v=%s.wrap(%v).__%s__(%v)" ,
                node.left, PYLIB, node.left, io, value);
            } else {
                //if (node.left.type)
                this.visit(node.left);
                this.printf("=");
                this.visit(node.right);
                this.printf(";");
                //this.printf("%n");
            }
        },
        globalStmt: function (node) {},
        printStmt: function (node) {
            var a=this.anon.get(node);
            if (a.nobr) {
                this.printf("%s.print(%j,%s.opt({end:' '}));",
                PYLIB,[",",a.values],PYLIB);
            } else {
                this.printf("%s.print(%j);",PYLIB,[",",a.values]);
            }
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
                if (noname.length) this.printf(",");
                this.printf("%s.opt({%j})",PYLIB,[",",hasname]);
            }
            this.printf(")");
        },
        arg: function (node) {
            if (node.name) {
                this.printf("%s:",node.name);
            }
            this.visit(node.value);
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
            // index: ["[",{body:"exprSliceList"},"]"],
            this.printf(".__getitem__(%v)",node.body);
                //this.printf("[%v]",b);
        },
        block: function (node) {
            this.printf("{%{");
            this.printf("%s.LoopChecker.check();%n",PYLIB);
            this.visit(node.body);
            this.printf("%}}");
        },
        paren: function (node) {
            this.printf("(%v)",node.body);
        },
        exprList: function (node) {
            const a=this.anon.get(node);
            if (a.isTuple) {
                this.printf("%s.Tuple([%j])",PYLIB,[",",node.body]);
            } else {
                this.printf("%v",node.body[0]);
            }
        },
        exprSliceList: function (node) {
            // exprSliceList: [{body:sep1(or("expr","slice"),",")},{t:tailC}]
            const a=this.anon.get(node);
            if (a.isTuple) {
                this.printf("%s.Tuple([%j])",PYLIB,[",",node.body]);
            } else {
                this.printf("%v",node.body[0]);
            }
        },
        slice: function (node) {
            node.start=node.start||{type:"None"};
            node.stop=node.stop||{type:"None"};
            node.step=node.step||{type:"None"};
            this.printf("%s.Slice(%v, %v, %v)", PYLIB, node.start, node.stop, node.step);
        },
        lvalList: function (node) {
            if (node.body.length===1) {
                this.printf("%v",node.body[0]);
            } else {
                this.printf("[%j]",[",",node.body]);
            }
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
                    this.printf("%j",[" && ",ec]);
                    return;
                }
            }
            if (node.op+""==="and" ) {
                this.printf("%v && %v",node.left,node.right);
                return;
            }
            if (node.op+""==="or") {
                this.printf("%v || %v",node.left,node.right);
                return;
            }
            var o=PL.ops[node.op+""],io=PL.iops[node.op+""];
            if (o) {
                this.printf("%s.wrap(%v).__%s__(%v)",PYLIB, node.left,o, node.right);
            } else if (io) {
                this.printf("%v=%s.wrap(%v).__%s__(%v)" ,
                node.left, PYLIB, node.left, io, node.right);
            } else if (node.op+""==="in") {
                this.printf("%s.wrap(%v).__contains__(%v)" ,
                    PYLIB, node.right, node.left);
            } else {
                throw new Error("No operator for "+node.op);
            }
            //this.printf("%v%v%v",node.left,node.op,node.right);
        },
        postfix: function (node) {
            this.printf("%v%v",node.left,node.op);
        },
        prefix: function (node) {
            this.printf("%v%v",node.op,node.right);
        },
        breakStmt: function (node) {
            this.printf("break;");
        },
        continueStmt: function (node) {
            this.printf("continue;");
        },
        passStmt: function () {
            this.printf(";");
        },
        superCall: function () {
            this.printf("%s.super(this.__class__, this)",PYLIB);
        },
        and: function (node) {
            this.printf("&&");
        },
        or: function (node) {
            this.printf("||");
        },
        not: function (node) {
            this.printf("!");
        },
        literal: function (node) {
            let s=(node+"");
            if (s.match(/^r/)) {
                s=s.replace(/^r/,"").
                replace(/^["']/,"/").
                replace(/["']$/,"/");
            }
            this.printf("%s",s);
        },
        literal3: function (node) {
            var cont=node.text.substring(3,node.text.length-3);
            this.printf("%s",JSON.stringify(cont));
        },
        True: function () {this.printf("true");},
        False: function () {this.printf("false");},
        None: function () {this.printf("%s.None",PYLIB);},
        symbol(node) {
            if (this.convertSymbol[node.text]) {
                this.printf(this.convertSymbol[node.text]);
            } else {
                this.printf("%s",node+"");
            }
        },
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
      "number"];
    for (let ve of verbs) {
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
                for (let n of node) v.visit(n);
            } else {
                this.printf("%s(%s)",node+"",(node ? node.type+"": "UNDEF"));
                //throw new Error("Visiting undef "+(node && node.type));
            }
        };
        v.options=options;
        v.convertSymbol={};
        for (let im of options.implicitImports||[]) {
            for (let n of im.names) {
                v.convertSymbol[n]=im.head+"."+n;
            }
        }
        //console.log("convertSymbol",this.convertSymbol,options.implicitImports);
        v.ctx=context();
        const buf=options.buf||IndentBuffer();
        buf.visitor=v;
        v.printf=buf.printf.bind(buf);
        v.buf=buf;
        if (options.genReqJS) {
            options.pyLibPath=options.pyLibPath||".";//"PyLib";
            v.printf("define('__main__',function (require,exports,module) {%{");
            v.printf("var %s=require('%s/PyLib.js');%n",PYLIB,options.pyLibPath);
        }
        if (options.injectBefore) {
            v.printf(options.injectBefore);
        }
        for (let n of PL.builtins) {
            v.printf("var %s=%s.%s;%n",n,PYLIB,n);
        }
        v.visit(node);
        if (options.injectAfter) {
            v.printf(options.injectAfter);
        }
        if (options.genReqJS) {
            v.printf("%}});%n");
            const SEND_LOG=`
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }`;
            v.printf("requirejs(['__main__'],function(){%s});%n",SEND_LOG);
        }
        //console.log("pgen res",buf.buf);
        return buf.buf;
    }
    return gen;
});
