define(["Visitor","IndentBuffer","context","PyLib","PythonSemantics"],
function (Visitor,IndentBuffer,context,PL,S) {
    var PYLIB="PYLIB";
    const TOP="__top";
    const vdef={
        program: function (node) {
            this.printf("%s.LoopChecker.reset();%n",PYLIB);
            this.visit(node.body);
        },
        classdef: function (node) {
            const sp=b=>node.extends? this.visit(node.extends.super) : b.printf("Object");
            this.ctx.enter({inClass:node},()=>{
                let na=this.anon.get(node.name);
                const topLevel=(na && na.scopeInfo && na.scopeInfo.topLevel);
                this.printf("%s%s=%s.class(%f,{%{"+
                    "%s:'%s',%j"+
                "%}});",
                (topLevel?"":"var "), (topLevel?TOP+".":"")+node.name, PYLIB, sp,
                    "CLASSNAME",node.name, [",",node.body.filter(b=>b.type==="define")]);
            });
        },//
        define: function (node) {
            const nan=this.anon.get(node);
            const sca=this.anon.get(nan.localScope);
            //let lets=nan.lets;
            if (typeof sca.level!=="number") {
                console.error("level not set", node, nan, sca);
                throw new Error("level not set");
            }
            /*if (!lets) {
                console.log("LETSNO", nan);
            }
            if (lets.length==0) lets="";
            else lets=`let ${lets.join(",")};`;*/
            //let hasDefVal=node.params.body.some((p)=>p.defVal);
            //lets+=`const __local${sca.level}=${PYLIB}.parseArgs2(arguments, ${spec} );\n`;
            if (this.ctx.inClass) {
                this.printf("%n%s: ",node.name);
            } else {
                //let na=this.anon.get(node.name);
                //let prefix=(na && na.scopeInfo && na.scopeInfo.topLevel) ? TOP+".": "";
                this.printf("%v=", /*prefix,*/ node.name);
            }
            this.printf("%s.f(%v,",PYLIB,node.params);
            /*for (let p of node.params.body) {
                this.printf("{");
                this.printf("name: %s,",JSON.stringify(p.name+""));
                if (p.defVal) {
                    this.printf("def: %v,", p.defVal);
                }
                this.printf("},");
            }*/
            this.printf("function* (%s){%{%v%}})",scopeSymbol(sca.level), node.body);
            if (this.ctx.inClass) {
            } else {
                this.printf(";%n");
            }
            /*} else {
                let na=this.anon.get(node.name);
                let prefix=(na && na.scopeInfo && na.scopeInfo.topLevel) ? TOP+".": "";
                this.printf("%s%s=function %v{%{%s%n%v%}};%n", prefix ,node.name, node.params, lets, node.body);
            }*/
        },
        paramList: function (node) {
            this.printf("[%j]",[",",node.body]);
        },
        param: function(node) {
            this.printf("{");
            this.printf("name: %s,",JSON.stringify(node.name+""));
            if (node.defVal) {
                this.printf("def: %v,", node.defVal);
            }
            this.printf("}");
            /*
            if (node.defVal) {
                this.printf("%s=%v",node.name, node.defVal);
            } else {
                this.printf("%s",node.name);
            }*/
        },
        defVal: function (node) {
            this.printf("%v",node.value);
        },
        importStmt2: function (node) {
            for (let e of node.elements) {
                this.visit(e);
            }
        },
        importElement: function (node) {
            var url=this.options.pyLibPath+"/py_"+node.name+".js";
            if (node.alias) {
                this.printf("%v=require('%s').install(%s);", node.alias, url, PYLIB);
            } else {
                this.printf("%v=require('%s').install(%s);", node.name, url, PYLIB);
            }
        },
        fromImportStmt: function (node) {
            var url=this.options.pyLibPath+"/py_"+node.name+".js";
            if (node.localNames.names.text==="*"){
                this.printf("Object.assign(%s, require('%s').install(%s));", TOP, url, PYLIB);
            } else {
                this.printf("{%j}=require('%s').install(%s);", [",",node.localNames.names], url, PYLIB);
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
                this.printf("(%v).__delattr__(%v);",a.obj, a.index);
            } else {
                this.printf("(%v).__delattr__('%s');",a.obj, a.name);
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
            this.printf("for (%v of %v) %v", node.vars, node.set, node.do);
        },
        listComprehension: function (node) {
            const vn=node.vars[0];
            this.printf("%s.listComprehension(%s=>%v, %v)",
                       PYLIB, vn, node.elem, node.set);
        },
        letStmt: function (node) {
            /*if (this.anon.get(node).needVar) {
                this.printf("var ");
            }*/
            //console.log("NODEL",node.left);//lvallist
            const firstBody=node.left.body && node.left.body[0];
            const io=PL.iops[node.op+""];
            const value=node.right;
            const matchPostfix=firstBody && firstBody.type==="postfix" && firstBody;
            if (matchPostfix &&
                matchPostfix.op.type==="index") {
                // TODO: [x[5],y]=[2,3]  -> x.__setitem__(5,2), y=3
                const object=matchPostfix.left;
                const index=matchPostfix.op;
                console.log("NODEL2",object,index);
                if (io) {
                    this.printf("%v.__setitem__(%v, "+
                        "( %v.__getitem__(%v) ).__%s__(%v)"+
                    ");",
                        object, index.body,
                        object, index.body, io, value
                    );
                } else {
                    this.printf("%v.__setitem__(%v, %v);",object, index.body,value );
                }
            } else if (matchPostfix &&
                matchPostfix.op.type==="memberRef") {
                // TODO: [x[5],y]=[2,3]  -> x.__setitem__(5,2), y=3
                const object=matchPostfix.left;
                const name=matchPostfix.op.name;
                console.log("NODEL3",object,name);
                if (io) {
                    this.printf("%v.__setattr__('%s', "+
                        "( %v.__getattribute__('%s') ).__%s__(%v)"+
                    ");",
                        object, name,
                        object, name, io, value
                    );
                } else {
                    this.printf("%v.__setattr__('%s', %v);",object, name,value );
                }
            } else if (io) {
                this.printf("%v=(%v).__%s__(%v)" ,
                node.left, node.left, io, value);
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
        tryStmt(node) {
            this.printf("try");
            this.visit(node.body);
            if (node.exceptParts[0]) this.visit(node.exceptParts[0]);
            if (node.finallyPart) this.visit(node.finallyPart);
        },
        exceptPart(node) {
            this.printf("catch");
            if (node.exceptParam) this.visit(node.exceptParam);
            else this.printf("(_excep)");
            //console.log("node.body", node.body);
            this.visit(node.body);
        },
        exceptParam(node) {
            if (node.asName) {
                this.printf("(%s)",node.asName.name);
            } else this.printf("(_excep)");
        },
        finallyPart(node) {
            this.printf("finally");
            this.visit(node.body);
        },
        memberRef: function (node) {
            this.printf(".__getattribute__('%s')",node.name);
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
            this.printf("%s.dict({%j})",PYLIB, [",",node.body]);
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
                this.printf("(%v).__%s__(%v)", node.left,o, node.right);
            } else if (io) {
                this.printf("%v=(%v).__%s__(%v)" ,
                node.left, node.left, io, node.right);
            } else if (node.op+""==="in") {
                this.printf("(%v).__contains__(%v)" ,
                    node.right, node.left);
            } else {
                throw new Error("No operator for "+node.op);
            }
            //this.printf("%v%v%v",node.left,node.op,node.right);
        },
        postfix: function (node) {
            if (node.op.type==="args" && !this.options.disableAsync) {
                this.printf("yield* %s.R(%v%v)", PYLIB,node.left,node.op);
            } else {
                this.printf("%v%v",node.left,node.op);
            }
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
        semicolon(node) {
            this.printf(";");
        },
        lambdaExpr(node) {
            const nan=this.anon.get(node);
            const sca=this.anon.get(nan.localScope);
            this.printf("%s.f([%j],function*(%s){return %v;})",
            PYLIB, [",",node.params], scopeSymbol(sca.level),  node.returns);
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
            const a=this.anon.get(node);
            if (a.scopeInfo && a.scopeInfo.scope) {
                // global x  -> registerd in scope with level=1 but "as global"
                const isg=a.scopeInfo.topLevel;// ? TOP+".":"");
                let sa=this.anon.get(a.scopeInfo.scope);
                const pre=scopeSymbol(isg ? 0 :sa.level);
                //this.printf("/*%s*/%s",sa.level,pre+"."+node);
                this.printf("%s",pre+"."+node);
                return; //pre+"."+node;
            }
            console.error("No scope info",a);
            throw new Error("No scope info");
            //const nex=pre+node;
            //this.printf("%s",nex);
        },
    };
    function scopeSymbol(level) {
        return (level==0?TOP:`__${level}`);
    }
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
        v.printf("var %s=%s.moduleScope(%s, %s);%n", TOP, PYLIB, PYLIB, !!options.useJSRoot);
        if (!options.disableAsync) {
            v.printf("%s.runAsync(function*() {%{",PYLIB);
        }
        v.visit(node);
        if (!options.disableAsync) {
            v.printf("%n%}});");
        }
        if (options.injectAfter) {
            v.printf(options.injectAfter);
        }
        if (options.genReqJS) {
            v.printf("return %s;%n",TOP);
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
