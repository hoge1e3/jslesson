(function(){
	this["入れ替える"]=function(arr,a,b){
		a--,b--;
		var tmp=arr[a];
		arr[a]=arr[b];
		arr[b]=tmp;
		return arr;
	};
	this["挿入"]=function(arr,i,obj){
		i--;
		arr.splice(i,0,obj);
		return arr;
	};
	this["削除"]=function(arr,i){
		i--;
		arr.splice(i,1);
		return arr;
	};
	this["要素数"]=function(arr){
		return arr.length;
	};
}).apply(dnclroot);
