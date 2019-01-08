define(["PythonParser","PythonSemantics","PythonGen","Python2JS","PyLib"],
function (PP,S,G,J,PL) {
    function run(srcF) {
        var node=PP.parse(srcF);
        try {
            S.check(node);
            var gen=G(node);
            var genj=J(node);
            console.log(genj);
            var f=new Function(genj);
            console.log(f());
        } catch(e) {
            if (e.node) {
                throw TError(e.message,srcF,e.node.pos);
            } else {
                console.log(e.stack);
                throw e;
            }
        }
    }
    return run;
});
