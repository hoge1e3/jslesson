var compile=function(src,dst,options){
	var tree=MinimalParser.parse(src.text());
	var program=js_beautify(js_gen(tree,options));
	dst.text(program);
};
