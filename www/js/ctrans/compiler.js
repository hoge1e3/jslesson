var compile=function(src,dst){
	var tree=MinimalParser.parse(src.text());
	var program=js_beautify("scopes_0={};scopes=[];scopes.push({});"+js_gen(tree)+"main();");
	dst.text(program);
};
