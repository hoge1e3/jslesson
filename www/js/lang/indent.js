/*global define*/
define([],function () {
	return fixIndent;
function fixIndent(str, indentStr) {
	if (!indentStr) indentStr="    ";
	var incdec={"{":1, "}":-1,"[":1,"]":-1,"「":1,"」":-1};
	var linfo=[];
		var r={row:0, col:0};
		var len=str.length;
		for (var i=0 ; i<len ;i++) {
			var c=str.substring(i,i+1);
			if (incdec[c]) {
				if (!linfo[r.row]) linfo[r.row]="";
				linfo[r.row]+=c;
			} else if (c=="\n") {
				r.row++;
				r.col=0;
			} else {
				r.col++;
			}
		}
	//}
	//console.log(linfo);
	var res="";
	var lines=str.split("\n");
	var curDepth=0;
	var row=0;
	lines.forEach(function (line) {
		var opens=0, closes=0;
		line=line.replace(/^\s*/,"");
		if (linfo[row]!=null) {
			linfo[row].match(/^([\]\}\)」]*)/);
			//console.log(linfo[row],RegExp.$1);
			closes=RegExp.$1.length;
			linfo[row].match(/([\[\{\(「]*)$/);
			//console.log(linfo[row],RegExp.$1);
			opens=RegExp.$1.length;
		}
		curDepth-=closes;
		line=indStr()+line;
		curDepth+=opens;
		res+=line+"\n";
		row++;
	});
	res=res.replace(/\n$/,"");
	//console.log(res);
	return res;
	function indStr() {
		var res="";
		for (var i=0 ;i<curDepth ;i++) {
			res+=indentStr;
		}
		return res;
	}
}
});
