collision=new(function(){
	var coll_arr=[];
	this.erase=function(param){
		for(var i=0;i<coll_arr.length;i++)
			if(coll_arr[i]===param)coll_arr.removepos(i+1);
	}
	this.chk_coll=function(me){
		for(var i=0;i<coll_arr.length;i++){
			if(coll_arr[i]===me)continue;
			var obj2=coll_arr[i];
			var obj_coll=me.get_coll();
			var obj2_coll=obj2.get_coll();
			var x1=obj_coll.x;
			var y1=obj_coll.y;
			var x2=obj2_coll.x;
			var y2=obj2_coll.y;
			//console.log(Math.pow((obj_coll.x-obj2_coll.x),2)+Math.pow((obj_coll.y-obj2_coll.y),2));
			if(Math.pow((x1-x2),2)+Math.pow((y1-y2),2)<=3000){
				me.衝突(obj2);
				obj2.衝突(me);
			}
		}
	};
	this.push=function(param){coll_arr.push(param);};
});
