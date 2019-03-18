define(["ctrans/ctrans","ctrans/beautify","ctrans/jsgen", "root"],function (MinimalParser,js_beautify,jsgen,root) {
	root.compile=function(src,dst,options){
		var tree=MinimalParser.parse(src);
		var program=root.js_beautify(root.js_gen(tree,options));
		dst.text(program);
	};
	return root.compile;
});
