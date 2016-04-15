var tester=function(path){
	var fs=require('fs');
	var list=fs.readdirSync(path);

	this.recursive=function(callback){
			path=path.split("/");
			var data=path[path.length-1];
			path.pop();
			each(path,data,callback);
	};

	var each=function(path,data,callback){
		data+='';
		path.push(data);
		switch(type(data)){
		case "CFILE":
			callback({
				name:function(){return data;},
				path:function(){return path.join("/");},
				text:function(){return (fs.readFileSync(path.join("/"),"utf8")).replace(/\t/g,"  ");},
			});
		break;
		case "DIR":
//util.print(path.join("/"));
			$.each(fs.readdirSync(path.join("/")),function(){each(path,this,callback);});
		break;
		}
		path.pop();
	};
	var type=function(fname){
		var type="";
		if((fname).match(/\./)){
			if((fname).match(/\.c$/))type= "CFILE";
			else type= "OTHERFILE";
		}else type= "DIR";

		return type;
	};
	return this;
}
