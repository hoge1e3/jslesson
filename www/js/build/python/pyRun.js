define(["PythonParser","PythonSemantics","PythonGen","Python2JS","PyLib","TError"],
function (PP,S,G,J,PL,TError) {
    function run(srcF) {
        var node=PP.parse(srcF);
        try {
            var v=S.check(node);
            var gen=G(node);
            var genj=J(node,v.anon);
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