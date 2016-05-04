button = new(function() {
	var id_cnt=0;
	this.label = '';
  this.posx;
	this.posy;
  this.id;

  this.draw = (function() {
    var btn = document.createElement('button');
    var canvas = document.getElementById('id');

    btn.textContent = label;
    canvas.appentChild(btn);
  });

  this.create = (function(label,key) {
	  var obj = Object.create(this);
    obj.id = 'btn'+id_cnt++;
    obj.label = label;

		$("<button id='"+obj.id+"'>"+((obj.label)?obj.label:"")+"</button>").appendTo("body");

		obj.posx=system.gui_posx;
		obj.posy=system.gui_posy;
		system.gui_posx+=80;
		if(system.gui_posx>=600){system.gui_posx=10;system.gui_posy+=20;}
		var btn=document.getElementById(obj.id);
	  btn.style.position="absolute";
	  btn.style.left=obj.posx+"px";
		btn.style.top=obj.posy+"px";
		//btn.style.font-size=1.9+"em";
		btn.onclick=function(){var onclick=obj.動作;try{onclick();}catch(e){alert("エラーが発生しました。\n"+e);}};
	  return obj;
	});

	this.position=function(posx,posy){
		posx=(document.getElementById("canvas").width) / (2)+posx;
		posy=(document.getElementById("canvas").height) / (2)-posy;
		var btn = document.getElementById(this.id);
		btn.style.position="absolute";
		btn.style.left=posx+"px";
		btn.style.top=posy+"px";
		return this;
	}
  this.動作 = (function() {}); //ユーザが上書きで定義するための雛形
	this.次の行 = (function(){default_posx=50;default_posy+=40;return this;});
  return this;
});

var ボタン=button;
ボタン.作る=button.create;
ボタン.位置=button.position;
