var js_gen=function(p){
	var result="";
	var gen=function(e){
		if(typeof e=="function")gen(e());
		else if(Array.isArray(e))e.forEach(function(e){gen(e);});
		else result+=((e)?e:"")+" ";
	};
	gen(p);
	return "scopes_0=window;"+result+"loop_start2();main();";
};
