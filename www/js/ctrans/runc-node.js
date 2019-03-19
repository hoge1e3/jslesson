requirejs=require("requirejs");
requirejs.config({
    shim: {
        "tester": {
            exports:"tester"
        },
        Parser:{exports:"Parser"},
        ExpressionParser:{exports:"ExpressionParser"},
        jsgen:{exports:"js_gen"},
        "AsyncByGenerator":{
            exports:"AsyncByGenerator"
        },
        hoge:{exports:"fuga"}
    },
    paths: {
        "Message": "../lib/Message",
        "assert": "../lib/assert",
        "ctrans/ctrans":"ctrans",
		"ctrans/ctype":"../../runtime/lib/c/ctype",
        "Klass":"../lib/Klass",
        "Parser":"parser",
        "ExpressionParser":"../lang/ExpressionParser2",
        "scanf": "../../runtime/lib/c/scanf",
        "lib": "../../runtime/lib/c/lib",
        "util": "../../runtime/lib/c/util",
        "hoge":"fuga"
    }
})
requirejs(["scanf","ctrans","jsgen","beautify","lib","util","x"],
function (scanf,ctrans,js_gen) {
	runc=function (src,stdin,options) {
		try {
			options=options||{};
			var tree=MinimalParser.parse(src);
			var program=js_beautify(js_gen(tree,options));
			console.log("PRG",program);
			var func=new Function(program);
			if (stdin instanceof Array) scanf.STDIN=stdin;
			else if (typeof stdin==="string") scanf.STDIN=stdin.split("\n");
			else delete scanf.STDIN;
	       	var buf="";
	       	printf.STDOUT={
	       		append:function (s) {buf+=s;},
	       		text:function(){return buf;}
	       	};
			return promisize(func()).then(function () {
				//console.log("DONE",buf);
				return buf;
			});
		} catch (e) {
			return new Promise(function (succ,fail) {
				fail(e+(e.pos?" at "+e.pos:""));
			});
		}
	};
	runc(`
	#include<stdio.h>
	int main(void) {
		printf("Hello world");
	}
		`).then(function (buf) {
			console.log(buf);
		});

});
