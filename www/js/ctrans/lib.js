lineBuf=[];
function log(){
	console.log(arguments);
};
function pointer(obj,key,type) {
	if(Array.isArray(obj[key])){
		var tmp=[];
		for(var i=0;i<obj[key].length;i++){
			var $={
				read:function(){return obj[key][i];},
				write:function(v){return obj[key][i]=v;},
				type:type.split(",")[1],
			};
			tmp.push($);
			//if(tmp[2])console.log(tmp[2].read());
		}
//console.log(tmp[1].read());
for(var i=0;i<tmp.length;i++)console.log(tmp[i].read());
		return tmp;
	}
  return {
    read: function () { return obj[key];},
    write: function (v) { return obj[key]=v;},
		type: type,
  };
}
function scanf(line, dest) {
console.log(dest);
	var val;
	line=ch_arr_to_str(line);
  var input=prompt(lineBuf.join(""),"");
  printf(str_to_ch_arr(input+"\n"));
	var format=line.match(/%d|%c|%x|%#x|%lf|%f/);
	switch(format+""){
	case "%d":
		val=parseInt(input);
	break;
	case "%f":case "%lf":
		val=parseFloat(input);
	break;
	case "%c":
		val=input.charCodeAt(0);
	break;
	}
	
	if(typeof dest.write=="function")
		dest.write(cast(dest.type,val));
	else dest=val;
}
function printf() {
    //var line=format.replace(/%d/,value);
	var args=Array.prototype.slice.call(arguments);
	var line=args.shift();
	if(Array.isArray(line))line=ch_arr_to_str(line);
	else line=""+line;
	line=line.replace(/%d|%c|%x|%#x|%u|%lf|%f|%s/g,function (fmt) {
        var arg=args.shift();
		switch(fmt){
		case "%d":
			var res="0";
			switch(typeof arg){
			case "number": case "boolean":
				res=cast("int",arg);
				break;
			}
			return res;
		case "%c":
			var res=" ";
			if(typeof arg=="number")res=String.fromCharCode(arg);
			else if(typeof arg=="string")res=arg+"";
			return res;
		case "%x":
			var res="0";
			if(typeof arg=="number")res=(arg>>>0).toString(16);
			return res;
		case "%#x":
			var res="0";
			if(typeof arg=="number")res="0x"+(arg>>>0).toString(16);
			return res;
		case "%u":
			var res="0";
			if(typeof arg=="number")res=arg>>>0;
			return res;
		case "%f":
			var res="0.000000";
			if(typeof arg=="number")res=arg;
			return res;
		case "%lf":
			var res="0.000000";
			if(typeof arg=="number")res=arg;
			return res;
		case "%s":
		    var res="";
		    if (typeof arg=="string") res=arg;
		    else if (arg instanceof Array) {
		        res=ch_arr_to_str(arg);       
		    }
		    return res;
		default:
		    return "ERR";
		}
	});
	lineBuf.push(line);
	if (lineBuf.length>5) lineBuf.shift();
	(printf.STDOUT||$("#console")).append(line);
}

window.print=function() {throw new Error("print関数はありません。printfの間違いではないですか？");}
