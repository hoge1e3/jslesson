// MINIJAVA
define (["Visitor","context","PyLib","Annotation","root"],
function (Visitor,context,PyLib,Annotation,root) {
const builtins=PyLib.builtins;//["print","range","int","str","float","input","len"];
builtins.push("open");
const importable={
    datetime:{server:true},
    dateutil:{server:true},
    random:{browser:["random", "randrange", "randint", "shuffle", "sample", "choice"],server:true},
    math:{browser:["fabs", "ceil", "floor", "sqrt"], server:true},
    //jp:true,
    //fs:{wrapper:true,server:true},
    re:{server:true},
    decimal:{server:true},
    g:{browser:[
        "fillRect", "writeGraphicsLog", "clear", "update", "setColor",
        "setLineWidth", "drawGrid", "setPen", "movePen", "setTextSize",
        "drawString", "drawText", "drawNumber", "drawLine",
        "fillOval", "getkey", "wait", "setTimeout"]},
    turtle:{browser:["Turtle","forward","right","left","clear","position"] },
    requests:{server:true},//SPECIAL
    json:{server:true},//SPECIAL
    sys:{wrapper:true,server:true},
    MeCab: {wrapper:true, server:true},
    matplotlib:{wrapper:true,server:true},
    folium:{wrapper:true,server:true},
    numpy:{wrapper:true,server:true},
    cv2:{wrapper:true,server:true},
    pandas:{wrapper:true,server:true},
    scipy:{wrapper:true,server:true},
    BeautifulSoup:{wrapper:true,server:true},
    sklearn:{wrapper:true,server:true},
    os:{wrapper:true,server:true},
    urllib:{wrapper:true,server:true},
    bs4:{wrapper:true,server:true},
    time:{wrapper:true,server:true},
    badb:{server:true},
    cdb:{server:true},
    js:{browser: Object.keys(root)}
    // turtle: js?
};

//-----
const KIND_GLOBAL="global", KIND_NONGLOBAL="local";
class ScopeInfo {
    constructor(scope,name,kind,declarator) {
        this.scope=scope;
        this.name=name;
        this.kind=kind;// kind is "global" only delared by statement `global x`, others are "local" even top-level 
        this.declarator=declarator;
    }
}
const vdef={
    program: function (node) {
        this.preScanDefs(node.body);
        for (let b of node.body) {
            this.visit(b);
        }
    },
    importStmt2: function (node) {
        for (let e of node.elements) this.visit(e);
    },
    importElement: function (node) {
        const nameHead=node.name[0];
        this.checkImportable(nameHead);
        const sym=node.alias || nameHead;
        this.addScope(sym,{vtype:importable[nameHead],node:sym});
        this.anon.put(sym, {isLeft: true});
    },
    fromImportStmt: function (node) {
        const nameHead=node.name[0];
        this.checkImportable(nameHead);
        if (node.localNames.names.text==="*") {
            if (this.curScope()!==this.rootScope) {
                this.error("import * はトップレベルにしか書けません．");
            }
            const names=Semantics.importable[nameHead][this.options.runAt];
            if (names && names.join) {
                for (let localName of names) {
                    this.addScope(localName,{localName});
                }
            } else {
                this.error(`from ${nameHead} import * は使えません。*の部分に使いたい命令をカンマ区切りで書いてください。`,node);
            }
        } else {
            for (let localName of node.localNames.names) {
                this.addScope(localName,{localName, node:localName});
                this.anon.put(localName, {isLeft: true});
            }
        }
    },
    classdef: function (node) {
        //console.log("classDef",node);
        if (node.extends) {
            this.visit(node.extends.super);
        }
        for (let b of node.body) {
            this.visit(b);
        }
        this.addScope(node.name , {node});
    },
    define: function (node) {
        for (let p of node.params.body) {
            if (p.defVal) {
                this.visit(p.defVal.value);
            }
        }
        this.newScope(()=>{
            const s=this.curScope();
            for (let p of node.params.body) {
                this.addScope(p.name+"",{node:p.name});
                this.anon.put(p.name,{isLeft: true});
            }
            const params=Object.keys(s);
            this.preScanDefs(node.body);
            for (let b of node.body) {
                this.visit(b);
            }
            const lets=Object.keys(s).filter((k)=>params.indexOf(k)<0);
            this.anon.put(node, {lets});
            //console.log("LETS", node, lets);
        });
    },
    exprStmt: function (node) {
        this.visit(node.expr);
    },
    globalStmt: function (node) {
        for (let name of node.names) {
            this.addScope(name+"",{kind:KIND_GLOBAL,node:name});
        }
    },
    tryStmt(node) {
        this.visit(node.body);
        for (let e of node.exceptParts) {
            this.visit(e);
        }
        if (node.finallyPart) this.visit(node.finallyPart);
    },
    exceptPart(node) {
        if (node.exceptParam) {
            const ep=node.exceptParam;
            //this.printf(" %v",ep.eType);
            if (ep.asName) {
                const asName=ep.asName;
                this.newScope(()=>{
                    this.addScope(asName.name,{node:asName.name});
                    this.visit(node.body);
                });
            } else this.visit(node.body);
        } else this.visit(node.body);
    },
    finallyPart(node) {
        this.visit(node.body);
    },
    letStmt: function (node) {
        this.procLeft(node.left);
        this.visit(node.right);
    },
    ifStmt: function (node) {
        //console.log("ifStmt", node);
        this.visit(node.cond);
        this.visit(node.then);
        for (let e of node.elif) this.visit(e);
        if (node.else) this.visit(node.else);
    },
    whileStmt: function (node) {
        //console.log("ifStmt", node);
        this.visit(node.cond);
        this.visit(node.do);
    },
    elifPart: function (node) {
        this.visit(node.cond);
        this.visit(node.then);
    },
    elsePart: function (node) {
        this.visit(node.then);
    },
    breakStmt: function (node) {

    },
    continueStmt: function (node) {

    },
    delStmt: function(node) {
        var a=expr=>{
            switch (expr.type) {
            case "postfix":
                switch (expr.op.type) {
                case "memberRef":
                    this.anon.put(node,{
                        obj: expr.left,
                        name: expr.op.name
                    });
                    return true;
                case "index":
                    // expr.op = {body: exprSliceList }
                    this.anon.put(node,{
                        obj: expr.left,
                        index: expr.op.body
                    });
                    return true;
                }
                return false;
            case "paren":
                return a(expr.body);
            default:
                return false;
            }
        };
        if (!a(node.expr)) {
            this.error("del の後ろは「オブジェクト.属性名」という形式にしてください．"  , node);
        }
        this.visit(node.expr);
    },
    slice: function (node) {
        if (node.start) this.visit(node.start);
        if (node.stop) this.visit(node.stop);
        if (node.step) this.visit(node.step);
    },
    printStmt3: function (node) {
        for (let value of node.args.body) {
            this.visit(value);
        }
    },
    printStmt: function (node) {
        // print 3
        // print 3,5
        // print 3,
        // print (3),
        // print (3)
        // print (3,)
        // print (3,5)
        // print (3,)
        // print ((3,5)) #Tuple

        //this.visit(node.values); <- avoid to marked as Tuple
        let values;
        if (node.values.body.length===1 && node.values.body[0].type==="paren") {
            // print (3,5) -> node.values=exprList{body=[paren{body=[exprList{body=[3,5]}]}]}
            const paren=node.values.body[0];
            values=paren.body.body;
        } else {
            values=node.values.body;
        }
        for (let b of values) {
            this.visit(b);
        }
        this.anon.put(node,{values});
        if (node.values.t) {
            this.anon.put(node,{nobr:true});
        }
    },
    block: function (node) {
        for (let b of node.body) {
            this.visit(b);
        }
    },
    forStmt: function (node) {
        //console.log("forStmt", node);
        var loopVars=node.vars;
        this.visit(node.set);
        if (loopVars.length>1 && this.options.runAt=="browser") {
            this.error("ブラウザで実行する場合，forの後ろには複数の変数を書くことができません．",node);
        }
        this.procLeft(loopVars);
        /*for(let loopVar of loopVars){
          this.addScope(loopVar,{node:loopVar});
        }*/
        this.visit(node.do);
        /*this.newScope(()=>{
            this.addScope(loopVar,{type:"local"});
            this.visit(node.do);
        });*/
    },
    listComprehension: function (node) {
        //console.log("forStmt", node);
        var loopVars=node.vars;
        this.visit(node.set);
        this.newScope(() => {
            for(let loopVar of loopVars){
                this.addScope(loopVar,{node:loopVar});
            }
            this.visit(node.elem);
        });
    },
    infixr: function(node) {
        // node.left node.op node.right
        this.visit(node.left);
        this.visit(node.op);
        this.visit(node.right);
    },
    infixl: function(node) {
        this.visit(node.left);
        this.visit(node.op);
        this.visit(node.right);
    },
    postfix: function (node) {
        this.visit(node.left);
        this.visit(node.op);
        /*if (node.op.type=="args") {

        }*/
    },
    prefix: function (node) {
        this.visit(node.op);
        this.visit(node.right);
    },
    args: function (node) {
        // node.arg
        //console.log("args", args);
        for (let b of node.body) {
            this.visit(b);
        }
    },
    exprList: function (node) {
        if (node.body.length>1 || node.t) {
            this.anon.put(node,{isTuple:true});
        }
        for (let b of node.body) {
            this.visit(b);
        }
    },
    exprSliceList: function (node) {
        if (node.body.length>1 || node.t) {
            this.anon.put(node,{isTuple:true});
        }
        for (let b of node.body) {
            this.visit(b);
        }
    },
    array: function (node) {
        for (let b of node.body) {
            this.visit(b);
        }
    },
    dict: function (node) {
        for (let b of node.body) {
            this.visit(b);
        }
    },
    dictEntry: function (node) {
        this.visit(node.key);
        this.visit(node.value);
    },
    index: function (node) {
        // index= [ exprSliceList ]
        this.visit(node.body);
    },
    memberRef: function (node) {
        // node.name
        //console.log("memberRef", args);
    },
    "number": function (node) {
        // node.text

    },
    symbol: function (node) {
        var i=this.getScope(node+"");
        if (node+""==="input") {
            this.useInput=true;
        }
        if (!i) {
            i=this.addScope(node+"", {node, scope:this.rootScope});
            console.log("symbol undef. treated as top level",node,this.curScope());
            //this.error("変数または関数"+node+"は未定義です",node);
        }
        this.anon.put(node,{scopeInfo:i});
    },
    "arg": function (node) {
        //if (node.name) console.log(node.name);
        this.visit(node.value);
    },
    lambdaExpr(node){
        this.newScope(()=>{
            this.addScope(node.param+"",{node:node.param});
            this.anon.put(node.param, {isLeft: true});
            this.visit(node.returns);
        });
    },
    semicolon(node) {

    },
    "literal": function (node) {

    },
    "literal3": function (node) {

    },
    "returnStmt": function (node) {
        if (node.expr) {
            this.visit(node.expr);
        }
    },
    "paren": function (node) {
        this.visit(node.body);
    }
};
const thru=["nodent","in",">=","<=","==","!=","+=","-=","*=","/=","%=","**","//",
  ">","<","=",".",":","+","-","*","/","%","(",")",",","not","and","or","True","False","None",
  "passStmt","superCall","isnt"];
for (let t of thru) {
    vdef[t]=()=>{};
}
const Semantics= {
    check: function (node,options) {
        options=options||{};
        const v=Visitor(vdef);
        v.ctx=context();
        v.anon=new Annotation();
        v.options=options;
        v.def=function (node) {
            if (node==null) console.log("Semantics.check.def","NULL");
            else console.log("Semantics.check.def",node.type, node);
            throw new Error("Semantics handler unset: "+(node&&node.type));
        };
        v.enter=function (...args) {
            return this.ctx.enter(...args);
        };
        v.rootScope={};
        v.rootScope[Semantics.SYM_ROOT]=true;
        v.newScopeInfo=function (scope, name, kind, declarator) {
            const res=new ScopeInfo(scope, name, kind, declarator);
            if (scope===v.rootScope || kind===KIND_GLOBAL) res.topLevel=true;
            return res;
        };
        for (let b of builtins) {
            v.rootScope[b]=v.newScopeInfo(v.rootScope,b);
            v.rootScope[b].builtin=true;
        }
        v.newScope=function (f) {
            var pa=this.ctx.scope||this.rootScope;
            var ns=Object.create(pa);
            //ns.PARENT_SCOPE=pa;
            return this.enter({scope:ns},f);
        };
        // \addScope
        v.addScope=function (name,info) {
            const cs=info.scope || this.curScope();
            if (!info.node && name && name.type) {
                info.node=name;
            }
            const nsi=v.newScopeInfo(cs,name+"",info.kind||KIND_NONGLOBAL, info.node) ;
            cs[name+""]=nsi;
            if (info.node) this.anon.put(info.node, {scopeInfo:nsi});
            return nsi;
        };
        v.getScope=function (name) {
            return this.curScope()[name];
        };
        v.curScope=function () {return this.ctx.scope;};
        v.error=function (mesg,node) {
            if (options.srcFile) mesg+=":"+options.srcFile.name();
            if (node.row && node.col) mesg+=":"+node.row+":"+node.col;
            var e=new Error(mesg);
            e.node=node;
            //e.noTrace=true;
            throw e;
        };
        v.checkImportable=function (nameHead) {
            //const nameHead=node.name[0];
            if (!importable[nameHead]) {
                this.error(nameHead+" はインポートできません",nameHead);
            }
            if (this.options.runAt && !importable[nameHead][this.options.runAt]) {
                let hint="．";
                //console.log("IMP",node);
                if (importable[nameHead].browser) hint="(「ブラウザで実行」するとインポートできます)．";
                if (importable[nameHead].server) hint="(「サーバで実行」するとインポートできます)．";
                this.error(nameHead+" はインポートできません"+hint,nameHead);
            }
        };
        v.preScanDefs=function (stmtList) {
            for (let node of stmtList) {
                if (node.type==="globalStmt") {
                    v.visit(node);
                }
                if (node.type==="classdef") {
                    this.addScope(node.name,{node});
                    v.visit(node.name);
                }
                if (node.type==="define") {
                    this.addScope(node.name,{node});
                    v.visit(node.name);
                }
                if (node.type==="forStmt") {
                    //this.addScope(node.name,{node});
                    var loopVars=node.vars;
                    this.procLeft(loopVars, true);
                    /*for(let loopVar of loopVars){
                      this.addScope(loopVar,{node:loopVar});
                    }*/
                }
                if (node.type==="letStmt") {
                    this.procLeft(node.left, true);
                }
                if (node.type==="importStmt2") {
                    /*for (let e of node.elemtns) {
                        let name=e.name;
                        let nameHead=name[0];
                        let alias=e.alias;
                        if (alias) {
                            this.addScope(alias.name,{node:alias});
                        } else {
                            this.addScope(name[0]+"",{node:name[0]});
                        }
                    }*/
                    this.visit(node);
                }
                if (node.type==="fromImportStmt") {
                    /*for (let name of node.localNames) {

                    }*/
                    this.visit(node);
                }
            }
        };
        v.procLeft=function (lval, isPrescan) {
            //const node=letStmt;
            var v=this;
            function procLElem(node) {
                switch (node.type) {
                    case "symbol":
                    procSym(node);
                    break;
                    case "lvalList":
                    for (let sym of node.body) {
                        procLElem(sym);
                    }
                    break;
                    default:
                    // a.b = fails  in prescan
                    if (!isPrescan) v.visit(node);
                }
            }
            function procSym(sym) {
                let info=v.getScope(sym+"");
                if (info && info.kind===KIND_GLOBAL) {
                } else if (!info || info.scope!==v.curScope()) {
                    info=v.addScope(sym+"",{node:sym});
                    //v.anon.put(node,{needVar:v.curScope()!==v.rootScope});
                }
                v.anon.put(sym,{isLeft:true, scopeInfo: info});
            }
            procLElem(lval);
        };
        //v.newScope(()=>v.visit(node));
        v.enter({scope:v.rootScope}, ()=>v.visit(node));
        return v;
    },
    importable
};
Semantics.SYM_ROOT=Symbol("rootScope");
return Semantics;
});
