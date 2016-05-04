var canvas=new (function(){
	var draw_arr=[];
	var cv=document.getElementById('canvas');
	var ctx=cv.getContext("2d");
	var w=cv.width;
	var h=cv.height;
	this.push=function(param){
		draw_arr.push(param);
	};
	this.erase=function(param){
		for(var i=0;i<draw_arr.length;i++){
			if(draw_arr[i]===param)draw_arr.removepos(i+1);
		}
		console.log(draw_arr);
	}
	setInterval((function() {
		ctx.clearRect(0, 0, w, h);
		draw_arr.forEach((function(e) {
			e.draw(ctx);
		}));
	}), 50);
});

