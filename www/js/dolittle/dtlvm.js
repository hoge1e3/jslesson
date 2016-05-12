MinimalParser.node2vm=function (node) {
    var v=Visitor({
        program: function (node){
            console.log("PROG");
            v.visit(node.subnodes[0]);
        },
        statement: function (node) {
            var assign=node.subnodes[0];
            var expr=node.subnodes[1];
            console.log("STMT",assign, expr);
        }
    }); 
    v.def=function (node) {
        if (node instanceof Array && !node.type) {
            node.forEach(function (n) {v.visit(n);});
        } else {
            console.log("undef node",node.type, node);
        }
    };
    v.visit(node);

};