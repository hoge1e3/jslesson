(function(){
	var vars2strarr=function(obj){
		var keys=Object.keys(obj);
		var strarr=[];
		for(var i=0;i<keys.length;i++){
			var key=keys[i];
			if(key=="params"){
				var params=vars2strarr(obj[key]);
				params=params.map(function(param){
					return "(引数) "+param;
				});
				strarr=params.concat(strarr);
			}else{
				if((typeof obj[key])=="function")continue;
				var line=key+" => "+obj[key];
				strarr.push(line)
			}
		}
		return strarr;
	}
	this["確認"]=function(){
		this["dncl_disp"](["確認-------------------"],true);
		var strarr=vars2strarr($.extend({},this));
		for(var i=0;i<strarr.length;i++){
			this["dncl_disp"]([strarr[i]],true);
		}
		this["dncl_disp"](["-----------------------"],true);
	};
}).apply(dnclroot);
