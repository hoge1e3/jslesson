(function(){
	this["入れ替える"]=function(arr,a,b){
		a--,b--;
		var tmp=arr[a];
		arr[a]=arr[b];
		arr[b]=tmp;
		return arr;
	};
	this["入れる"]=function(arr,i,obj){
		i--;
		//要素数を超えた位置への挿入は、その位置への代入に等しい
		if(i>arr.length-1)arr[i]=obj;
		else arr.splice(i,0,obj);
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
	this["取り出す"]=function(arr,num){
		return arr.splice(num?num-1:0,1)[0];
	};
	this["追加する"]=function(arr,val){
		arr.push(val);
	};
	this["空"]=function(arr){
		return arr.length===0;
	};
	this["空でない"]=function(arr){
		return arr.length!==0;
	};
	this["連結"]=function(){
		var ret=Array.prototype.concat.apply([],arguments)
		return $.grep(ret,function(e){return e!== undefined});
	};
}).apply(dnclroot);
