var compile=function(src,dst){
	var tree=MinimalParser.parse(src.text());
	var program=js_beautify(js_gen(tree));
	dst.text(program);
};
