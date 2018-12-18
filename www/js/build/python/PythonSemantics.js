// MINIJAVA
define (["Visitor","context"],
function (Visitor,context) {
const builtins=["print","range"];
let curClass; // 今解析中のクラスオブジェクト
let curMethod; // 今解析中のメソッドオブジェクト
//----

const vdef={
    program: function (node) {
        for (const b of node.body) {
            this.visit(b);
        }
    },
    classdef: function (node) {
        //console.log("classDef",node);
        for (const b of node.body) {
            this.visit(b);
        }
    },
    define: function (node) {
        //console.log("define",node);
        for (p of node.params.body) {
            this.addScope(p+"",{type:"local"});
        }
        for (const b of node.body) {
            this.visit(b);
        }
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
    block: function (node) {
        for (const b of node.body) {
            this.visit(b);
        }
    },
    forStmt: function (node) {
        //console.log("forStmt", node);
        var loopVar=node.var;
        this.visit(node.set);
        this.newScope(()=>{
            this.addScope(loopVar,{type:"local"});
            this.visit(node.do);
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
    nodent: function (){},
    "+": function (){},
    "*": function (){},
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
        if (!i) this.error("変数または関数"+node+"は未定義です",node);
    },
    "arg": function (node) {
        //if (node.name) console.log(node.name);
        this.visit(node.value);
    },
    "literal": function (node) {

    }
};
const Semantics= {
    check: function (node,srcF) {
        const v=Visitor(vdef);
        v.ctx=context();
        v.def=function (node) {
            if (node==null) console.log("Semantics.check.def","NULL");
            else console.log("Semantics.check.def",node.type, node);
        };
        v.enter=function (...args) {
            return this.ctx.enter(...args);
        };
        v.rootScope={};
        for (const b of builtins) v.rootScope[b]={type:"function"};
        v.newScope=function (f) {
            ns=Object.create(this.ctx.scope||this.rootScope);
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
            e.noTrace=true;
            throw e;
        };
        v.newScope(()=>v.visit(node));
    }
};
return Semantics;
});