(function(){
	this["random"]=function(){
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
	this["乱数"]=this["random"];
	this["ランダム"]=this["乱数"];
}).apply(dnclroot);
