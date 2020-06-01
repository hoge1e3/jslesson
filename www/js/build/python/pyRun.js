define(["PythonParser","PythonSemantics","PythonGen","Python2JS","PyLib","TError","jshint"],
function (PP,S,G,J,PL,TError,jshint) {
    function run(srcF) {
        var node=PP.parse(srcF);
        try {
            var v=S.check(node);
            //var gen=G(node);
            var genj=J(node,v.anon);
            console.log(genj);
            var f=new jshint.Function(genj);
            console.log(f());
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");                
            }
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
