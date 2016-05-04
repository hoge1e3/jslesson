/*turtle={
	create:function(){
		var obj={};
		obj=Object.create(new turtle_obj);
		canvas.push(obj);
		collision.push(obj);
		return obj;
	}
};
タートル=turtle;
タートル.作る=タートル.create;
*/
turtle = new(function() {
	this.erase_flag=false;
  this.angle=0;
	this.lineWidth=1;
  this.posx = (document.getElementById("canvas").width) / 2;
	this.posy = (document.getElementById("canvas").height) / 2;
	var sizex=35;
	var sizey=27;
	var time=(new Date().getTime());
	this.img="ayumi.gif";
	this.pen_flag=true;
	//var ctx=null;
	//this.collision=(function(you){console.log(you.get_coll());you.erase();});
	this.collision=function(){};
	this.衝突=function(){};
  this.draw = (function(ctx) {
		var img=new Image();
		img.src=this.img+"?"+time;
		ctx.lineWidth=this.lineWidth;
		ctx.beginPath();
		ctx.moveTo(this.path[0]["x"],this.path[0]["y"]);
		for(var i=1;i<this.path.length;i++){
			if(this.path[i]["pen"])ctx.lineTo(this.path[i]["x"],this.path[i]["y"]);
			else ctx.moveTo(this.path[i]["x"],this.path[i]["y"]);
		}
		ctx.stroke();
		ctx.save();
		ctx.translate((this.posx),(this.posy));
		ctx.rotate(-this.angle*Math.PI/180);
		ctx.translate(-this.posx,-this.posy);
		ctx.drawImage(img,this.posx-(sizex/2),this.posy-(sizey/2));
		ctx.restore();
  });
  this.setshape = (function(param) {
		this.img=param;
		return this;
  });
 	this.create=function(){
		//var obj=$.extend(true,{},this);
		var obj={};
		obj = Object.create(this);
		obj.path=[{x:obj.posx,y:obj.posy}];
		canvas.push(obj);
		collision.push(obj);
		return obj;
	};

  this.forward = (function(param) {

    (this.posx = (this.posx) + ((Math.cos(((this.angle) * (Math.PI)) / (180))) * (param)));
    (this.posy = (this.posy) - ((Math.sin(((this.angle) * (Math.PI)) / (180))) * (param)));
		this.path.push({x:this.posx,y:this.posy,pen:this.pen_flag});
		if(this.erase_flag==false)collision.chk_coll(this);
		return this;
  });
	this.backward = (function(param) {
		param=-param;
    (this.posx = (this.posx) + ((Math.cos(((this.angle) * (Math.PI)) / (180))) * (param)));
    (this.posy = (this.posy) - ((Math.sin(((this.angle) * (Math.PI)) / (180))) * (param)));
		this.path.push({x:this.posx,y:this.posy,pen:this.pen_flag});
		if(this.erase_flag==false)collision.chk_coll(this);
		return this;
  });
	this.erase=function(){
		if(this.erase_flag==false){
			collision.erase(this);
			canvas.erase(this);
			this.erase_flag=true;
		}
		return this;
	};
	this.現れる=function(){
		if(this.erase_flag){
			collision.push(this);
			canvas.push(this);
			this.erase_flag=false;
		}
		return this;
	};
  this.leftturn = (function(param) {
    (this.angle = (this.angle) + (param));
		return this;
  });
	this.get_coll=function(){
		return {
			x:this.posx,
			y:this.posy
		};
	};
  this.rightturn = (function(param) {
	  (this.angle = (this.angle) - (param));
		return this;
  });
	this.position=function(x,y){
		x=(document.getElementById("canvas").width) / (2)+x;
		y=(document.getElementById("canvas").height) / (2)-y;
		this.posx=x;
		this.posy=y;
		this.path.push({x:this.posx,y:this.posy,pen:this.pen_flag});
		if(this.erase_flag==false)collision.chk_coll(this);
		return this;
	};
	this.penup=function(){
		this.pen_flag=false;
		return this;
	};
	this.pendown=function(){
		this.pen_flag=true;
		return this;
	};
	this.中心に戻る=function(){
		this.posx = (document.getElementById("canvas").width) / (2);
		this.posy = (document.getElementById("canvas").height) / (2);
		return this;
	};
	this.向き=function(_angle){
		this.angle=_angle;
		return this;
	};
	this.移動する=function(_x,_y){
		this.posx+=_x;
		this.posy-=_y;
		this.path.push({x:this.posx,y:this.posy,pen:this.pen_flag});
		if(this.erase_flag==false)collision.chk_coll(this);
		return this;
	};
	this.閉じる=function(){
		this.posx=this.path[0]["x"];
		this.posy=this.path[0]["y"];
		this.path.push({x:this.posx,y:this.posy,pen:this.pen_flag});
		if(this.erase_flag==false)collision.chk_coll(this);
		return this;
	};
	this.線の太さ=function(weight){
		this.lineWidth=weight;
		return this;
	};
	this.円形=function(r){
	};
  return this;
});
var タートル=turtle;
タートル.作る=turtle.create;
タートル.歩く=turtle.forward;
タートル.左回り=turtle.leftturn;
タートル.右回り=turtle.rightturn;
タートル.ペンなし=turtle.penup;
タートル.ペンあり=turtle.pendown;
タートル.位置=turtle.position;
タートル.変身する=turtle.setshape;
タートル.消える=turtle.erase;
タートル.戻る=turtle.backward;

/*
turtle.prototype={
	collision:function(){},
  draw:(function(ctx) {
		ctx=ctx;
		ctx.beginPath();
		ctx.moveTo(path[0]["x"],path[0]["y"]);
		for(var i=1;i<path.length;i++){
			ctx.lineTo(path[i]["x"],path[i]["y"]);
		}
		ctx.stroke();
		ctx.save();
		ctx.translate((posx),(posy));
		ctx.rotate(-angle*Math.PI/180);
		ctx.translate(-posx,-posy);
		ctx.drawImage(img.img,posx-(img.sizex/2),posy-(img.sizey/2));
		ctx.restore();
  }),
  setshape:(function(param) {
		img.img.src = param+"?"+(new Date().getTime());
		return this;
  }),
 	create:function(){
		var obj={};
		obj = Object.create(turtle);
		canvas.push(obj);
		collision.push(obj);
		return obj;
	},
  forward:(function(param) {
    (posx = (posx) + ((Math.cos(((angle) * (Math.PI)) / (180))) * (param)));
    (posy = (posy) - ((Math.sin(((angle) * (Math.PI)) / (180))) * (param)));
		if(pen_flag)path.push({x:posx,y:posy});
		collision.chk_coll(this);
		return this;
  }),
	erase:function(){
		collision.erase(this);
		canvas.erase(this);
	},
  leftturn:(function(param) {
    (angle = (angle) + (param));
		return this;
  }),
	get_coll:function(){
		return {
			x:posx,
			y:posy,
		};
	},
  rightturn:(function(param) {
	  (angle = (angle) - (param));
		return this;
  }),
	position:function(x,y){
		posx=x;
		posy=y;
		return this;
	},
	penup:function(){
		pen_flag=false;
		return this;
	},
	pendown:function(){
		pen_flag=true;
		return this;
	},
};
turtle=new turtle;
*/
//turtle=new turtle_obj();
