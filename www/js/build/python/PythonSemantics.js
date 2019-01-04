// MINIJAVA
define (["Visitor","context"],
function (Visitor,context) {
const builtins=["print","range","int","str","float"];
let curClass; // 今解析中のクラスオブジェクト
let curMethod; // 今解析中のメソッドオブジェクト
const importable={
    datetime:true,
    random:true,
    jp:true
};
//----

const vdef={
    program: function (node) {
        for (const b of node.body) {
            this.visit(b);
        }
    },
    importStmt: function (node) {
        if (!importable[node.name]) {
            this.error(node.name+" はインポートできません",node);
        }
        this.addScope(node.alias || node.name,{type:"module",vtype:importable[node.name]});
    },
    classdef: function (node) {
        //console.log("classDef",node);
        for (const b of node.body) {
            this.visit(b);
        }
    },
    define: function (node) {
        //console.log("define",node);
        this.addScope(node.name,{type:"function"});
        this.newScope(()=>{
            for (p of node.params.body) {
                this.addScope(p+"",{type:"local"});
            }
            for (const b of node.body) {
                this.visit(b);
            }
        });
    },
    exprStmt: function (node) {
        this.visit(node.expr);
    },
    letStmt: function (node) {
        if (node.left.type==="symbol") {
            this.addScope(node.left+"",{type:"local"});
        } else {
            this.visit(node.left);
        }
        this.visit(node.right);
    },
    ifStmt: function (node) {
        //console.log("ifStmt", node);
    },
    breakStmt: function (node) {

    },
    printStmt: function (node) {
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
        this.addScope(loopVar,{type:"local"});
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
    memberRef: function (node) {
        // node.name
        //console.log("memberRef", args);
    },
    "number": function (node) {
        // node.text

    },
    symbol: function (node) {
        var i=this.getScope(node+"");
        if (!i) {
            console.log("symbol undef",node,this.curScope());
            this.error("変数または関数"+node+"は未定義です",node);
        }
    },
    "arg": function (node) {
        //if (node.name) console.log(node.name);
        this.visit(node.value);
    },
    "literal": function (node) {

    },
    "paren": function (node) {
        this.visit(node.body);
    }
};
const thru=["nodent",">=","<=","==","!=","+=","-=","*=","/=","%=",
  ">","<","=",".",":","+","-","*","/","%","(",")",",","!"];
for (let t of thru) {
    vdef[t]=()=>{};
}
const Semantics= {
    check: function (node,srcF) {
        const v=Visitor(vdef);
        v.ctx=context();
        v.def=function (node) {
            if (node==null) console.log("Semantics.check.def","NULL");
            else console.log("Semantics.check.def",node.type, node);
            throw new Error("Semantics handler unset: "+(node&&node.type));
        };
        v.enter=function (...args) {
            return this.ctx.enter(...args);
        };
        v.rootScope={};
        for (const b of builtins) v.rootScope[b]={type:"function"};
        v.newScope=function (f) {
            var pa=this.ctx.scope||this.rootScope;
            ns=Object.create(pa);
            //ns.PARENT_SCOPE=pa;
            return this.enter({scope:ns},f);
        };
        v.addScope=function (name,info) {
            this.curScope()[name]=info;
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
    }
};
return Semantics;
});
