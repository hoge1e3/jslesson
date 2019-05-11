function setup(){
	var divs=document.getElementsByTagName("div");
	var div=divs[divs.length-3];
	var newA=document.createElement("a");
	newA.setAttribute("style","display:none;");
	newA.id="downloader";
	newA.setAttribute("href","#");
	div.appendChild(newA);
	array_data=[];
}

function getData(){
	if(array_data.length>0) array_data=[];
	for(var i in logsOfOneUser){
		array_data[i]=getLogsByFileName(i);
	}
}
function setData(){
	for(var key of Object.keys(array_data)){
		array_data[key].sort(compare);
		calcDiffLast(array_data[key]);
	}
}
function downloadAll(){
	//setData();
	for(var key of Object.keys(array_data)){
 		download(array_data[key],key);
	}
}

function getLogsByFileName(fn){
	var ret=[];
	for(var i in logsOfOneUser[fn]){
		getPreviousLog(logsOfOneUser[fn][i]).done(function(r){
			var r=JSON.parse(r.raw);
			var ary=[];
			ary["filename"]=r.filename.split("/")[5];
			ary["date"]=r.date;
			ary["time"]=r.time;
			ary["code"]=r.code.C;
			ary["result"]=r.result;
			ret.push(ary);
		});
	}
	return ret;
}

function calcDiffLast(ary){
	for(var i=0;i<ary.length;i++){
		if(i>0) var d1=calcDiff(ary[i-1]["code"],ary[i]["code"],null,null,null,false);
		else var d1={"insert":0,"delete":0,"replace":0,"equal":0};
		var d=calcDiff(ary[i]["code"],ary[ary.length-1]["code"],null,null,null,false);
		ary[i].push(ary[i]["time"]);
		ary[i].push(interval(ary,i));
		ary[i].push(ary[i]["result"]);
		ary[i].push(d1["insert"]);
		ary[i].push(d1["delete"]);
		ary[i].push(d1["replace"]);
		ary[i].push(d1["equal"]);
		ary[i].push(d["insert"]);
		ary[i].push(d["delete"]);
		ary[i].push(d["replace"]);
		ary[i].push(d["equal"]);
	}
}

function interval(ary,ind){
	if(ind==0) return 0;
	bef=ary[ind-1]["time"];
	aft=ary[ind]["time"];
	b=bef.split(":");
	a=aft.split(":");
	bTime=b[0]*60*60+b[1]*60+(b[2]-0);
	aTime=a[0]*60*60+a[1]*60+(a[2]-0);
	return aTime-bTime;

}
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  let comparison = 0;
  if (a.time > b.time) {
    comparison = 1;
  } else if (a.time < b.time) {
    comparison = -1;
  }
  return comparison;
}
function download(ary,k){
	var fn=k.split("/")[1];
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    var csv_data = ary.map(function(l){return l.join(',')}).join('\r\n');
    var blob = new Blob([bom, csv_data], { type: 'text/csv' });
    var url = (window.URL || window.webkitURL).createObjectURL(blob);

    var a = document.getElementById('downloader');
    a.download = userId+"_"+fn+'_data.csv';
    a.href = url;
    $('#downloader')[0].click();
}
/*function clearBreak(base){
  var lines=base.split("\n");
  var res=lines.filter(function(l){
    return !l.match(/^(\s)*$/);
  });
  return res.join("\n");
}
function calcDiff(prev,now,id,btn,ntn,flag){
  // get the baseText and newText values from the two textboxes, and split them into lines
  var cbPrev=clearBreak(prev);
  var cbNow=clearBreak(now);
  var base = difflib.stringAsLines(cbPrev);
  //var newtxt = difflib.stringAsLines($("newText").value);
  var newtxt = difflib.stringAsLines(cbNow);
  // create  a SequenceMatcher instance that diffs the two sets of lines
  var sm = new difflib.SequenceMatcher(base, newtxt);

  // get the opcodes from the SequenceMatcher instance
  // opcodes is a list of 3-tuples describing what changes should be made to the base text
  // in order to yield the new text
  var opcodes = sm.get_opcodes();
  //var diffoutputdiv = $("[id='"+id+"diff']")[0];
  var diffoutputdiv = $(id)[0];
  console.log(sm,opcodes);
  var diffData={"insert":0,"delete":0,"replace":0,"equal":0};
  for(var opti in opcodes){
    var opt=opcodes[opti];
    console.log("switch"+opt[0]);
    switch(opt[0]){
      case "equal":
      case "delete":
        diffData[opt[0]]+=(opt[2]-opt[1]);
        break;
      case "insert":
        diffData[opt[0]]+=(opt[4]-opt[3]);
        break;
      case "replace":
        diffData[opt[0]]+=Math.max(opt[2]-opt[1],opt[4]-opt[3]);
        break;
      default:
        console.log("Unknown state '"+opt[0]+"' discovered.");
    }
  }
  if(flag!==false){
    while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
    //var contextSize = $("contextSize").value;
    //contextSize = contextSize ? contextSize : null;

    // build the diff view and add it to the current DOM
    diffoutputdiv.appendChild(diffview.buildView({
      baseTextLines: base,
      newTextLines: newtxt,
      opcodes: opcodes,
      // set the display titles for each resource
      baseTextName: btn,
      newTextName: ntn,
      contextSize: 5,
      viewType: $("inline").checked ? 1 : 0
    }));
  }
  return diffData;
  // scroll down to the diff view window.
  //location = url + "#diff";
}
*/
function howto(){
	console.log("Step 1. Use 'getData()' to get log data");
	console.log("Step 2. Use 'setData()' to prepare of download");
	console.log("Step 3. Use 'downloadAll()' to download csv file(s)");
	console.log("Use 'howto()' if you want to see this information again.");
}
$(function(){
	setup();
	howto();
});