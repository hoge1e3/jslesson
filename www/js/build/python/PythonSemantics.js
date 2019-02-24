// MINIJAVA
define (["Visitor","context","PyLib","Annotation"],
function (Visitor,context,PyLib,Annotation) {
const builtins=PyLib.builtins;//["print","range","int","str","float","input","len"];
builtins.push("open");
let curClass; // 今解析中のクラスオブジェクト
let curMethod; // 今解析中のメソッドオブジェクト
const importable={
    datetime:true,
    random:true,
    math:true,
    jp:true,
    fs:true,
    matplotlib:{wrapper:true},
    numpy:{wrapper:true}
};
//----
class ScopeInfo {
    constructor(scope,name,kind,declarator) {
        this.scope=scope;
        this.name=name;
        this.kind=kind;
        this.declarator=declarator;
    }
}
const vdef={
    program: function (node) {
        for (const b of node.body) {
            this.visit(b);
        }
    },
    importStmt: function (node) {
        const nameHead=node.name[0]
        if (!importable[nameHead]) {
            this.error(nameHead+" はインポートできません",node);
        }
        this.addScope(node.alias || nameHead,{kind:"module",vtype:importable[nameHead],node});
    },
    classdef: function (node) {
        //console.log("classDef",node);
        for (const b of node.body) {
            this.visit(b);
        }
    },
    define: function (node) {
        //console.log("define",node);
        this.addScope(node.name,{kind:"function",node});
        this.newScope(()=>{
            for (p of node.params.body) {
                this.addScope(p+"",{kind:"local",node:p});
            }
            for (const b of node.body) {
                this.visit(b);
            }
        });
    },
    exprStmt: function (node) {
        this.visit(node.expr);
    },
    globalStmt: function (node) {
        for (const name of node.names) {
            this.addScope(name+"",{kind:"global",node:name});
        }
    },
    letStmt: function (node) {
        if (node.left.type==="symbol") {
            const info=this.getScope(node.left+"");
            if (info && info.kind==="global") {

            } else if (!info || info.scope!==this.curScope()) {
                this.addScope(node.left+"",{kind:"local",node});
                this.anon.put(node,{needVar:true});
            }
        } else {
            this.visit(node.left);
        }
        this.visit(node.right);
    },
    ifStmt: function (node) {
        //console.log("ifStmt", node);
        this.visit(node.cond);
        this.visit(node.then);
        for (const e of node.elif) this.visit(e);
        if (node.else) this.visit(node.else);
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
    printStmt3: function (node) {
        for (const value of node.args.body) {
            this.visit(value);
        }
    },
    printStmt: function (node) {
        //console.log("PStm",node);
        for (const value of node.values) {
            this.visit(value);
        }
    },
    block: function (node) {
        for (const b of node.body) {
            this.visit(b);
        }
    },
    forStmt: function (node) {
        //console.log("forStmt", node);
        var loopVar=node.var;
        this.visit(node.set);
        this.addScope(loopVar,{kind:"local",node:loopVar});
        this.visit(node.do);
        /*this.newScope(()=>{
            this.addScope(loopVar,{type:"local"});
            this.visit(node.do);
        });*/
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
        for (const b of node.body) {
            this.visit(b);
        }
    },
    array: function (node) {
        for (const b of node.body) {
            this.visit(b);
        }
    },
    index: function (node) {
        for (const b of node.body) {
            this.visit(b);
        }
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
            console.log("symbol undef",node,this.curScope());
            this.error("変数または関数"+node+"は未定義です",node);
        }
        this.anon.put(node,{scopeInfo:i});
    },
    "arg": function (node) {
        //if (node.name) console.log(node.name);
        this.visit(node.value);
    },
    "literal": function (node) {

    },
    "returnStmt": function (node) {
        this.visit(node.expr);
    },
    "paren": function (node) {
        this.visit(node.body);
    }
};
const thru=["nodent",">=","<=","==","!=","+=","-=","*=","/=","%=","**",
  ">","<","=",".",":","+","-","*","/","%","(",")",",","!","and","or"];
for (let t of thru) {
    vdef[t]=()=>{};
}
const Semantics= {
    check: function (node,srcF) {
        const v=Visitor(vdef);
        v.ctx=context();
        v.anon=new Annotation();
        v.def=function (node) {
            if (node==null) console.log("Semantics.check.def","NULL");
            else console.log("Semantics.check.def",node.type, node);
            throw new Error("Semantics handler unset: "+(node&&node.type));
        };
        v.enter=function (...args) {
            return this.ctx.enter(...args);
        };
        v.rootScope={};
        for (const b of builtins) v.rootScope[b]=new ScopeInfo(v.rootScope,b,"function");
        v.newScope=function (f) {
            var pa=this.ctx.scope||this.rootScope;
            ns=Object.create(pa);
            //ns.PARENT_SCOPE=pa;
            return this.enter({scope:ns},f);
        };
        v.addScope=function (name,info) {
            const cs=this.curScope();
            if (!info.node && name && name.type) {
                info.node=name;
            }
            cs[name+""]=new ScopeInfo(cs,name+"",info.kind, info.node) ;
            return cs[name+""];
        };
        v.getScope=function (name) {
            return this.curScope()[name];
        };
        v.curScope=function () {return this.ctx.scope;};
        v.error=function (mesg,node) {
            if (srcF) mesg+=":"+srcF.name();
            if (node.row && node.col) mesg+=":"+node.row+":"+node.col;
            var e=new Error(mesg);
            e.node=node;
            //e.noTrace=true;
            throw e;
        };
        v.newScope(()=>v.visit(node));
        return v;
    },
    importable
};
return Semantics;
});
