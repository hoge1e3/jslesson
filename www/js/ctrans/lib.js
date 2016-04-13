lineBuf=[];
function log(){
	console.log(arguments);
};
function pointer(obj,key) {
   return {
      read: function () { return obj[key];},
      write: function (v) { return obj[key]=v;}
   };
}
function scanf(format, dest) {
    var line=prompt(lineBuf.join(""),"");
    var val=parseInt(line);
    printf(val+"\n");
    dest.write(val);
}
function printf(line) {
    //var line=format.replace(/%d/,value);
		var tmp=line;
		line="";
		for(var i=0;i<tmp.length;i++){line+=(String.fromCharCode(tmp[i]));}
		console.log(line);
		var args=Array.prototype.slice.call(arguments);
		args.shift();
		while(true){
			var format=line.match(/%d|%c|%x|%#x|%u|%lf|%f/);
			if(!format)break;
			switch(format+""){
			case "%d":
				var res="0";
				if(typeof args[0]=="number")res=cast("int",args[0]);
				line=line.replace(/%d/,res);
			break;
			case "%c":
				var res=" ";
				if(typeof args[0]=="number")res=String.fromCharCode(args[0]);
				line=line.replace(/%c/,res);
			break;
			case "%x":
				var res="0";
				if(typeof args[0]=="number")res=(args[0]>>>0).toString(16);
				line=line.replace(/%x/,res);
			break;
			case "%#x":
				var res="0";
				if(typeof args[0]=="number")res="0x"+(args[0]>>>0).toString(16);
				line=line.replace(/%#x/,res);
			break;
			case "%u":
				var res="0";
				if(typeof args[0]=="number")res=args[0]>>>0;
				line=line.replace(/%u/,res);
			break;
			case "%f":
			  var res="0.000000";
				if(typeof args[0]=="number")res=args[0];
				line=line.replace(/%f/,res);
			break;
			case "%lf":
				var res="0.000000";
				if(typeof args[0]=="number")res=args[0];
				line=line.replace(/%lf/,res);
			break;
			default:line=line.replace(RegExp(format),"ERR");
			}
			if(args.length>0)args.shift();
		}
		/*for(var i=1;i<arguments.length;i++){
			console.log(line.match(/%./)+"");
			line=line.replace(/%d/,arguments[i]);
		}
		*/
    lineBuf.push(line);
    if (lineBuf.length>5) lineBuf.shift();
    $("#console").append(line);
}
