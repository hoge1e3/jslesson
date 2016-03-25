var compile=function(src,dst,log){
	log.err="OK";
	log.errcode="";
	try{
		var program=js_beautify("scopes=[];scopes.push({});"+MinimalParser.parse(src.text())+"main();");
		log.program=program;
	}catch(e){
		alert(e);
		log.err="ERR";
		log.errcode=e;
	}
	dst.text(program);
};
