(function (root) {
var Textarea=(function() {
	var id_cnt=0;
  this.posx;
	this.posy;
  this.id;

  this.create = (function(str) {
	  var obj = Object.create(this);
    obj.id = 'txt'+id_cnt++;

		$("<textarea id=\'"+obj.id+"\'>"+(str?str:"")+"</textarea>").appendTo("body");

		obj.posx=system.gui_posx;
		obj.posy=system.gui_posy;
		system.gui_posx+=80;
    if(system.gui_posx>=600){system.gui_posx=10;system.gui_posy+=20;}
		var txt=document.getElementById(obj.id);
		//txt.style.font-size="110%";
	  txt.style.position="absolute";
	  txt.style.left=obj.posx+"px";
		txt.style.top=obj.posy+"px";
	  return obj;
	});

	this.position=function(posx,posy){
		posx=(document.getElementById("canvas").width) / (2)+posx;
		posy=(document.getElementById("canvas").height) / (2)-posy;
		var txtarea = document.getElementById(this.id);
		txtarea.style.left=posx+"px";
		txtarea.style.top=posy+"px";
		return this;
	};

	this.write=function(str){
		document.getElementById(this.id).value+=str;
		return this;
	};
	this.overwrite=function(str){
		document.getElementById(this.id).value=str;
		return this;
	};

	this.width=function(sizex){
		document.getElementById(this.id).cols=sizex*2;
		return this;
	};
	this.height=function(sizey){
		document.getElementById(this.id).rows=sizey;
		return this;
	};
	this.改行=function(){
		document.getElementById(this.id).value+="\n";
	};
	this.clear=function(){
		document.getElementById(this.id).value="";
	};
  return this;
});
if (root!==window) Textarea.prototype=root;
root.textarea=new Textarea;
root.テキストエリア=root.textarea;
var textarea=root.textarea;
root.textarea.位置=textarea.position;
root.textarea.作る=textarea.create;
root.textarea.幅=textarea.width;
root.textarea.高さ=textarea.height;
root.textarea.書く=textarea.write;
root.textarea.上書き=textarea.overwrite;
root.textarea.クリア=textarea.clear;
root.textarea.白紙=textarea.clear;
})(root);