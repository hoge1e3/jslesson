var compile=function(src,dst){
	
	try{
		var program=js_beautify("globals={};"+MinimalParser.parse(src.text())+"main();");
		console.log(program);
	}catch(e){
		alert(e);
	}
	dst.text(program);
};
