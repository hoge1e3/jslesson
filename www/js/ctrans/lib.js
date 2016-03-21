lineBuf=[];
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
function printf(format) {
    //var line=format.replace(/%d/,value);
    var line=format;
		for(var i=1;i<arguments.length;i++){
			line=line.replace(/%d/,arguments[i]);
		}
    lineBuf.push(line);
    if (lineBuf.length>5) lineBuf.shift();
    $("#console").append(line);
}
