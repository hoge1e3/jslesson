$(document).ready(function() {
    dx=0,dy=0;
    displayingId="";
    selectedFile="";
// call the tablesorter plugin
    $("table").tablesorter({
    // define a custom text extraction function
        textExtraction: function(node) {
            // extract data from markup and return it
            console.log(node.getAttribute("data-rate"));
            if(node.getAttribute("data-rate")!=null){
                return (parseInt(node.getAttribute("data-rate"))+100)+"";
            }
            return node.innerHTML;
        }
    });
});
function getLog(logid,userid){
  $.ajax({
      type: "POST",
      url: "?Class/getLog",
      data: "logid="+logid,
      dataType: "json",
      success: function(data,dataType){
          console.log(data);
          openFrame(data);
      },
      error: function(xhr, textStatus, errorThrown){
          console.log("ログデータの取得に失敗しました。",xhr,textStatus,errorThrown);
          alert("ログデータの取得に失敗しました。"+textStatus);

      }
  });

}
function getOneUsersLogId(userid,pon){
  showFrame(logs[userid],userid,pon);
}
function openFrame(data){
  console.log(data);
  if(displayingId!==""){
      $("[id='"+displayingId+"ui']").css("display","none");
      $("[id='"+displayingId+"res']").css("display","none");
      $("[id='"+displayingId+"diff']").css("display","none");
      $("#"+displayingId).css("display","none");
      $("[data-id='"+currentLogId+"']").css("background-color","white");
  }
  displayingId==data.user ? showDiffFlag=true : showDiffFlag=false;
  currentLogId=data.id;
  displayingId=data.user;
  var raw=JSON.parse(data.raw);
  var code=raw.code.C || raw.code.JavaScript || raw.code.Dolittle || raw.code.DNCL;
  //res=data.filename+"\n"+data.result+"\n-------------\n"+data.code.C;
  res=code;
  res=res.replace(/</g,"&lt;");
  res=res.replace(/>/g,"&gt;");
  $("[id="+displayingId+"ui]").css("display","inline");
  $("[id="+displayingId+"res]").css("display","inline");
  //http://bitarrow.eplang.jp/bitarrowbeta/
  var d = new Date( parseInt(data.time) * 1000 );
  var year  = d.getFullYear();
  var month = d.getMonth() + 1;
  var day  = d.getDate();
  var hour = ( '0' + d.getHours() ).slice(-2);
  var min  = ( '0' + d.getMinutes() ).slice(-2);
  var sec   = ( '0' + d.getSeconds() ).slice(-2);
  var logtime=year+"/"+month+"/"+day+" "+hour+":"+min+":"+sec;
  var fn=data.filename.replace("/","__");
  fn=fn.replace(".","__");
  var filehist='<span filename="'+fn+'" onClick="showFileHistory(this.getAttribute('+"'"+'filename'+"'"+'))">'+data.filename+'</span>';
  //var filehist=data.filename;
  var lang=raw.code.C ?"c" : raw.code.JavaScript ? "js" : raw.code.Dolittle ? "dtl" : raw.code.DNCL ? "dncl" :"unknown";
  var prjName="Auto_"+lang;
  var runLink=".?r=jsl_edit&dir=/home/"+classID+"/"+teacherID+"/"+prjName+"/&autologexec="+data.id+"&lang="+lang;
  var userid=data.user;
  $("#"+userid+"res").html("<br>"+logtime+"<br><a target='runCheck' href='"+runLink+"'>実行してみる</a><br>"+filehist+"<br>"+data.result);
  $("#"+userid).height(30);
  $("#"+userid).html(res);
  $("#"+userid).css("display","inline");
  //$("#"+userid).width($("#"+userid).parent().width());
  $("#"+userid).height($("#"+userid).get(0).scrollHeight);
  $("[data-id='"+data.id+"']").css("background-color","orange");
  //alert(logid);
  if(showDiffFlag && prevProgram!=code){
    calcDiff(prevProgram,code,userid);
    $("#"+userid+"diff").css("display","inline");
  }
  prevProgram=code;
  //console.log("code",code);
  //console.log("res",res);
}
function showFrame(data,userid,pon){
  console.log("data",data,currentLogId,data.indexOf(currentLogId));
  //data=data.map(function(a){return a.id});
  var currentIndex=data.indexOf(parseInt(currentLogId));
  if(pon=="prev"){
    if(currentIndex==0){
      alert("このデータはこのユーザの一番最初のログデータです。");
    }else{
      console.log("dci",currentLogId,currentIndex,data[currentIndex-1]);
      getLog(data[currentIndex-1],userid);
    }
  }
  else if(pon=="next"){
    if(currentIndex==data.length-1){
      alert("このデータはこのユーザの最新のログデータです。");
    }else{
      console.log("dci",currentLogId,currentIndex,data[currentIndex+1]);
      getLog(data[currentIndex+1],userid);
    }
  }
}
function showFileHistory(filename){
  if(selectedFile!==""){
    $("[filename='fn"+selectedFile+"']").css("font-size","-=10");
  }
  if(selectedFile!=filename){
    $("[filename='fn"+filename+"']").css("font-size","+=10");
    selectedFile=filename;
  }else{
    selectedFile="";
  }
  // todo
  console.log("testfilehist","#fn"+filename);
}
function toggleReload(){
  if(reloadMode) unsetReload();
  else setReload();
}
function setReload(){
  reloadMode=1;
  location.href=thisURL+"&interval="+interval+"&reloadMode="+1;
}
function unsetReload(){
  reloadMode=0;
  clearTimeout(autoReload);
  document.getElementById("reloadButton").innerHTML="自動再読み込みをする";
}
if(reloadMode){
  autoReload=setTimeout(function(){
    location.href=thisURL+"&interval="+interval+"&reloadMode="+1;
  },180*1000);
}
function getPreviousLog(logid){
  return $.ajax({
      type: "POST",
      url: "?Class/getLog",
      data: "logid="+logid,
      dataType: "json"
  });
}
var prevLog;
function showLogOneUser(logid,userid,fn){
    console.log("SLO",this,arguments);
    if (prevLog) $(prevLog).css({background:"#fff"});
    $(this).css({background:"#ff0"});
    prevLog=this;
  getLog(logid,userid);
  var ind=logsOfOneUser[fn].indexOf(logid-0);
  var currentProgram;
  var cururl=location.href.replace(/&logid=[0-9]+/,"")+"&logid="+logid;
  history.replaceState(null,null,cururl);
  if(ind>0){
    getPreviousLog(logsOfOneUser[fn][ind]).done(function(r){
      var curRaw=JSON.parse(r.raw);
      currentProgram=curRaw.code.C || curRaw.code.JavaScript || curRaw.code.Dolittle;
      getPreviousLog(logsOfOneUser[fn][ind-1]).done(function(result) {
        var raw=JSON.parse(result.raw);
        var code=raw.code.C || raw.code.JavaScript || raw.code.Dolittle || "";
        calcDiff(code,currentProgram,userid);
      }).fail(function(result) {
        console.log("failed get previous log",result);
      });
    }).fail(function(r){
      console.log("failed get current log",result);
    });
  }
}
function calcDiff(prev,now,id){
  // get the baseText and newText values from the two textboxes, and split them into lines
  var base = difflib.stringAsLines(prev);
  //var newtxt = difflib.stringAsLines($("newText").value);
  var newtxt = difflib.stringAsLines(now);

  // create  a SequenceMatcher instance that diffs the two sets of lines
  var sm = new difflib.SequenceMatcher(base, newtxt);

  // get the opcodes from the SequenceMatcher instance
  // opcodes is a list of 3-tuples describing what changes should be made to the base text
  // in order to yield the new text
  var opcodes = sm.get_opcodes();
  var diffoutputdiv = $("#"+id+"diff")[0];
  console.log(sm,opcodes);
  while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
  //var contextSize = $("contextSize").value;
  //contextSize = contextSize ? contextSize : null;

  // build the diff view and add it to the current DOM
  diffoutputdiv.appendChild(diffview.buildView({
    baseTextLines: base,
    newTextLines: newtxt,
    opcodes: opcodes,
    // set the display titles for each resource
    baseTextName: "Base Text",
    newTextName: "New Text",
    contextSize: 5,
    viewType: $("inline").checked ? 1 : 0
  }));

  // scroll down to the diff view window.
  //location = url + "#diff";
}
