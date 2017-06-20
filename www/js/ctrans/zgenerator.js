define(["Visitor","IndentBuffer"],function (Visitor,IB) {
    ZGen={
        generate:function(node) {
            var v=Visitor({

            });
            v.undefs={};
            v.def= function (node) {
                var v=this;
                console.log("Visiting undef",node.type);
                /*if (!node.type && node instanceof Array) {
                    return node.forEach(function (e) {
                        v.def(e);
                    });
                }*/
                if (!node.type) {
                    console.log("No type",node);
                    return;
                }
                if (!node.type  || v.undefs[node.type]) return;
                var b=v.undefs[node.type]=IB();
                b.indentStr="    ";
                b.printf("%s: function (node) {%{",node.type);
                b.printf("var v=this;%n");
                //var se=n["[SUBELEMENTS]"];
                for (var k in node) {
                    var e=node[k];
                    if (k==="[SUBELEMENTS]") {
                        continue;
                    }
                    if (k.match(/^[0-9]+$/)) {
                        continue;
                    }
                    if (e instanceof Array) {
                        b.printf("node.%s.forEach(function (e) {%{",k);
                        b.printf("v.printf(\"%%v\",e);%n");
                        b.printf("%}});%n");
                        e.forEach(function (e) {
                            v.visit(e);
                        });
                    } else if (e && e.type) {
                        b.printf("v.printf(\"%%v\",node.%s);%n",k);
                        v.visit(e);
                    }
                }
                b.printf("%}},");
            };
            v.buf=IB();
            v.printf=function () {
                return this.buf.printf.apply(this.b,arguments);
            };
            v.visit(node);
            for (var k in v.undefs) {
                v.printf("%s%n",v.undefs[k].buf);
            }
            console.log(v.buf.buf);
            return(v.buf.buf);

        }
    };
    return ZGen;
});
/*
requirejs(["zgenerator"],function (z) {
    z.generate(window.lastOutput);
});
*/
