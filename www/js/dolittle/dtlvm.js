MinimalParser.node2vm=function (node) {
    var ctx=context();
    var inf2meth={"+":"add","-":"sub","*":"mul","/":"div",
    "%":"mod",">=":"ge", "<=":"le",">":"gt","<":"lt",
    "==":"eq", "!=":"ne"};
    var pre2meth={
       "+":"positive","-":"neg"
    };
    var v=Visitor({
        paren: function (node) {
            v.visit(node.subnodes[1]);
        },
        func_exec: function (node) {
            var name=node.subnodes[0];
            var paren=node.subnodes[1];
            v.visit(paren);
            add(["send",1,name+""]);
        },
        elec: function (node) {
            var params=node.subnodes[0];
            var meth=node.subnodes[1];
            v.visit(params);
            add(["send",params.length, meth+""]);
        },
        meth_call: function (node) {
            var obj=node.subnodes[0];
            var elec=node.subnodes[2];
			if (obj) v.visit(obj);
			else {
			    add(["push1","self"]);
			    //add(["push2","root"]);
			}
			v.visit(elec);
        },
        infix: function (node) {
            var left=node.subnodes[0];
            var op=node.subnodes[1];
            var right=node.subnodes[2];
            v.visit(left);
            v.visit(right);
            add(["send",1,inf2meth[op+""]]);
            
        },
        prefix: function (node) {
            var op=node.subnodes[0];
            var right=node.subnodes[1];
            v.visit(right);
            if (op+""!="+") add(["send",1,pre2meth[op+""]]);
        },
        postfix: function (node) {
            var left=node.subnodes[0];
            var op=node.subnodes[1];
            v.visit(left);
            v.visit(op);            
        },
        number:function (node) {
            add(["pushi",parseFloat(node.value+"")]);
        },
        string:function (node) {
            add(["pushi",node.content+""]);
        },
        block_param: function (node) {
            var params=node.subnodes[1];
            var locals=node.subnodes[3];
            params.forEach(function (p) {
            	add(["para",p+""]);
            });
            locals.forEach(function (p) {
            	add(["tmp",p+""]);
            });
            
        },
        block: function (node) {
            var param=node.subnodes[1];
            var progs=node.subnodes[2];
            var nc=[];
            ctx.enter({code:nc,depth:node.depth},function () {
                v.visit(param);
                v.visit(progs);
            });
            add(["pushb",nc]);
        },
        localVar: function (node) {
            var name=node.name;//subnodes[0];
            add(["push1",name+""]);
        },
        field: function (node) {
            var name=node.name;//subnodes[0];
            add(["push1","self"]);
            add(["push2",name+""]);
        },
        rootVar: function (node) {
            var name=node.name;//subnodes[0];
            add(["push1","root"]);
            add(["push2",name+""]);
        },
        memberAccess: function (node) {
            var name=node.name;//subnodes[0];
            add(["push2",name+""]);
        },
        statement: function (node) {
            var assign=node.subnodes[0];
            var left=assign && assign.subnodes[0];
            var expr=node.subnodes[1];
            switch(left ? left.type : "nolet") {
           	case "localVar":
	            v.visit(expr);
	            add(["store1",left.name+"", ctx.depth-left.depth]);//TODO
            	break;
           	case "field":
           		add(["push1","self"]);
	            v.visit(expr);
	            add(["store2",left.name+""]);
            	break;
           	case "rootVar":
           		add(["push1","root"]);
	            v.visit(expr);
	            add(["store2",left.name+""]);
            	break;
            case "postfix":
            	v.visit(left[0]);
	            v.visit(expr);
	            add(["store2",left[1].name+""]);
            	break;
            default:
	            v.visit(expr);
            }
        },
        statement_list: function (node){
            //console.log("PROG");
            var statements=node.subnodes[0];
            statements.forEach(function (stmt,i) {
                v.visit(stmt);
                if (i==statements.length-1) add(["ret"]);
                else add(["pop",1]);
            })
        }
    }); 
    v.def=function (node) {
        if (node instanceof Array && !node.type) {
            node.forEach(function (n) {v.visit(n);});
        } else {
            console.log("undef node",node.type, node);
        }
    };
    var nc=[];
    ctx.enter({code:nc,depth:0},function () {
          v.visit(node);
    });
    function add(c) {
    	ctx.code.push(c);
    }
    return nc;
};