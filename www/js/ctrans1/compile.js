var compile=function(src,dst){
	var program=expr.ParseStr(src.text());
	src.text(program);
};
