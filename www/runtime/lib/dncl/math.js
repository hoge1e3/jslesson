(function(){
	this["乱数"]=this["random"]=function(){
		var under,high;
		switch(arguments.length){
			case 0:
				under=1,high=100;
			break;
			case 1:
				under=1,high=arguments[0];
			break;
			case 2:
				under=arguments[0],high=arguments[1];
			break;
		}
		var rnd=Math.random();
		rnd=Math.round(rnd*(high-under))+under;
		return rnd;
	};
	["sin","cos","tan","asin","acos","atan","atan2","sqrt","floor","ceil","round","abs","exp","log","log2","log10"].map(function(fn){
		this[fn]=function(){
			return Math[fn].apply(this,arguments);
		};
	}.bind(this));
}).apply(dnclroot);
