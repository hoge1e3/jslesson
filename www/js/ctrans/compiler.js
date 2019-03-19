define(["ctrans/ctrans","ctrans/beautify","ctrans/jsgen", "root"],
function (MinimalParser,js_beautify,js_gen,root) {
	root.compile=function(src,dst,options){
		var tree=MinimalParser.parse(src);
		var program=root.js_beautify(js_gen(tree,options));
		dst.text(program);
	};
	return root.compile;
});
