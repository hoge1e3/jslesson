/* globals difflib*/
var classID, thisURL, userId, day, all, teacherID, reloadMode, logsOfOneUser, programs, indexList;
var displayingId, selectedFile;
$(document).ready(function() {
    //dx=0,dy=0;
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
function fold(show) {
    const items = [];
    $(".logItem").each(function () {
        items.push($(this));
    });
    console.log("ITEMS",items);
    let chunk;
    for (let item of items) {
        if (toBeFold(item)) {
            chunk = chunk || [];
            chunk.push(item);
        } else {
            procChunk();
        }
    }
    procChunk();
    function procChunk() {
        if (!chunk) return;
        const items = chunk;
        chunk = null;
        if (items.length<2) return;
        let showing = true;
        console.log("CHUNK",items);
        const id = Math.random();
        const duration=items[items.length-1].attr("data-time")-items[0].attr("data-time");
        const openedLabel="▼", closedLabel=`▶(${items.length}, ${duration}secs.)…`;
        const handle = $("<div>").text(openedLabel).click(c);
        items[0].before(handle);
        if (!show) c();
        function c() {
            showing = !showing;
            for (let item of items) {
                if (showing) item.show();
                else item.hide();
            }
            handle.text(showing?openedLabel:closedLabel);
        }
    }
    function toBeFold(item) {
        return item.hasClass("Open") || (item.hasClass("Save") && item.hasClass("unchanged"));// !item.hasClass("advanced") && !item.hasClass("regressed"));
    }
}
function getLog(logid,userid){
  $.ajax({
      type: "POST",
      // url: "?Class/getLog",
      //data: "logid="+logid,
      url: "?LogQuery/byId",
      data: "id="+logid,
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
function getLogs(user,day,all){
    let cmd="getLogClusters";
    if (location.href.match(/nocluster/)) {
        cmd="getLogs";
    }
    const file=getQueryString("file",null);
    if (file) {
        return $.ajax({
          type: "POST",
          url: `?LogQuery/index`,
          data: {user,file,output:"json"},
          dataType: "json",
        });
    }
    const days=getQueryString("days",1);
    return $.ajax({
      type: "POST",
      // url: "?Class/getLog",
      //data: "logid="+logid,
      url: `?TeacherLog/${cmd}`,
      data: {user,day,days,all:(all?1:0)},
      dataType: "json",
    });
}
const IDLE_TIME=300;
let scrolled=false;
let cutTime;
async function view1new() {
    let logs=await getLogs(userId,day,all);
    const curp=/cut=([\d]+)/;
    const r=curp.exec(location.href);
    if (r) {
        cutTime=r[1]-0;
        logs=logs.filter(log=>log.time<cutTime);
    }
    //const showSave=location.href.match(/showSave/);
    console.log(logs, all);
    if (logs.length===0) {
        document.body.innerHTML=(`
            この日のログはありません．
            <a href=".?TeacherLog/view1Dates&user=${userId}">他の日のログを見る</a>
        `);
    }
    programs=[];// {filename: [log....]}
    //logs=logs.filter(log=>!(log.result.match(/(Save|Open)/) && !showSave));
    for (let log of logs) {
        //log.raw=JSON.parse(log.raw);
        const filename=log.filename;
        if(!programs[filename]) programs[filename]=[];
        try {
            programs[filename].push(JSON.parse(log.raw));
        } catch(e) {
            console.log("JSON_ERROR",log.raw);
            console.error(e);
        }
    }
    let /*paka=0, lastNotPaka,*/ last, lastByFile={};
    const logTypes=[
        "Unsaved", "Open","Error", "Save", "Run", "Other"
    ];
    const detectType=log=>{
        for (const t of logTypes) {
            if (log.result.indexOf(t)>=0) return t;
        }
        return "Other";
    };
    const searchDiv=$("<div>").appendTo("#fileList");
    const word=$("<input>").appendTo(searchDiv).on("keydown",e=>{
        if (e.keyCode==13) {
            for (let log of logs) {
                try {
                    if (getCode(JSON.parse(log.raw)).indexOf(word.val())>=0) {
                        $("#"+log.id).addClass("found");
                    }
                }catch(ex){
                    console.error(ex);
                }
            }
        }
    });
    logs.forEach(log=>{
        const filename=log.filename;
        //<div>${FILENAME}</div>
        /*if (log.result.match(/(Save|Open)/) && !showSave) {
            paka++;
            return;
        }
        if (paka>1 && lastNotPaka) {
            $(`<div>Save/Open for ${log.time-lastNotPaka.time}secs</div>`).appendTo("#fileList");
        }*/
        if (last) {
            const elapsedFromLast=(log.time-last.time);
            if (last.filename===log.filename) {
                //console.log(last.fileName+" "+last.id+" "+log.id+" e="+elapsedFromLast);
                log.actualTime=last.actualTime+(elapsedFromLast>=IDLE_TIME?0:elapsedFromLast);
            } else {
                if (!lastByFile[log.filename]) {
                    log.actualTime=0;
                } else {
                    log.actualTime=lastByFile[log.filename].actualTime;
                }
            }
            if (elapsedFromLast>=IDLE_TIME) {
                $(`<div>Idle for ${log.time-last.time}secs.</div>`).addClass("logItem").appendTo("#fileList");
            }
        }
        //lastNotPaka=log;
        //paka=0;
        if (!lastByFile[log.filename]) {
            log.actualTime=0;// 他のファイルをいじっていた時間を除去した時間
            log.actualTime2=0;// 同一ファイルで5分以上開いている部分を5分とみなした時間
        } else {
            const elapsedFromLast=(log.time-lastByFile[log.filename].time);
            log.actualTime2=lastByFile[log.filename].actualTime2+Math.min(elapsedFromLast, IDLE_TIME);
        }
        lastByFile[log.filename]=log;
        $("<div>").appendTo("#fileList").
        addClass("logItem").addClass(detectType(log)).
        append($("<span>").addClass("fileName").text(filename)).click(function () {
            console.log(log.id);
            if (!scrolled) {scrolled=true; this.scrollIntoView();}
            showLogOneUser.call(this, log.id, log.user, filename);
        }).attr("id", log.id).attr("data-filename",log.filename).
            attr("data-actualTime",log.actualTime).
            attr("data-actualTime2",log.actualTime2);
        //<font color="black">${FILENAME}</font></div>
        //<script>
        //shownLogs.push(log);
        last=log;
        try {
            showFileEntry(log);
        } catch(e){
            console.log(e);
        }
        //</script>
    });

    const logid=getQueryString("logid",false);
    if (logid) {
        document.getElementById(logid).click();
    } else {
        for (let log of logs) {
            //console.log("hairaito", log.time, day);
            if (log.time>=day) {
                const e=document.getElementById(log.id);
                if (e) {
                    e.click();
                    break;
                }
            }
        }
    }
    fold(all);
}
function getOneUsersLogId(userid,pon){
  showFrame(logs[userid],userid,pon);
}
function getCode(raw) {
    for (let k in raw.code) {
        if (k==="HTML") continue;
        return raw.code[k];
    }
    return "";
    /*return raw.code.C || raw.code.JavaScript || raw.code.Dolittle || raw.code.DNCL || raw.code.Python || raw.code.py ||
    raw.code.Tonyu || raw.code.tonyu || raw.code.undefined || raw.code.PHP || raw.code.php ||
    raw.code["p5.js"] || raw.code["p5.py"] || raw.code.brython || "";*/
}
function goFileTop(file) {
    console.log("Top",file);
    scrolled=false;
    const e=$(`[data-filename="${file}"]`);
    e[0].click();
}
function goFileLast(file) {
    console.log("Last",file);
    scrolled=false;
    const e=$(`[data-filename="${file}"]`);
    e[e.length-1].click();
}
function goFileNext(file, skipEq=true) {
    console.log("Next",file);
    scrolled=false;
    const e=$(`[data-filename="${file}"]`);
    let doClick;
    for (let i=0;i<e.length-1;i++) {
        if (doClick) {
            if (skipEq && $(e[i]).hasClass("unchanged")) continue;
            else {
                e[i].click();
                break;
            }
        }
        if (e[i].id===currentLogId) {
            doClick=true;
        }
    }
}
function goFilePrev(file, skipEq=true) {
    console.log("Prev",file);
    scrolled=false;
    const e=$(`[data-filename="${file}"]`);
    let doClick;
    for (let i=e.length-1;i>=0;i--) {
        if (doClick) {
            if (skipEq && $(e[i]).hasClass("unchanged")) continue;
            else {
                e[i].click();
                break;
            }
        }
        if (e[i].id===currentLogId) {
            doClick=true;
        }
    }
}

function navByFile(file) {
    return `
        <a href="javascript:;" onclick="goFileTop('${file}')">Top</a> |
        <a href="javascript:;" onclick="goFilePrev('${file}')">Prev</a> |
        <a href="javascript:;" onclick="goFileNext('${file}')">Next</a> |
        <a href="javascript:;" onclick="goFileLast('${file}')">Last</a>
    `;
}
function cut(time) {
    if (!time){
        location.href=location.href.replace(/cut=[\d]+/,"");
    } else if (location.href.match(/cut=[\d]+/)) {
        location.href=location.href.replace(/cut=[\d]+/,`cut=${time}`);
    } else {
        location.href+=`&cut=${time}`;
    }
}
var currentLogId, showDiffFlag, prevProgram;
function openFrame(data){
  console.log(data);
  if(displayingId!==""){
      $("[id='"+displayingId+"ui']").css("display","none");
      $("[id='"+displayingId+"res']").css("display","none");
      $("[id='"+displayingId+"diff']").css("display","none");
      $("[id='"+displayingId+"']").css("display","none");
      $("[data-id='"+currentLogId+"']").css("background-color","white");
  }
  showDiffFlag=(displayingId==data.user);
  currentLogId=data.id;
  displayingId=data.user;
  var raw=JSON.parse(data.raw);
  var code=getCode(raw);//.code.C || raw.code.JavaScript || raw.code.Dolittle || raw.code.DNCL || raw.code.Python || "";
  //res=data.filename+"\n"+data.result+"\n-------------\n"+data.code.C;
  let res=code;
  res=res.replace(/</g,"&lt;");
  res=res.replace(/>/g,"&gt;");
  $("[id='"+displayingId+"ui']").css("display","inline");
  $("[id='"+displayingId+"res']").css("display","inline");
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
  //var filehist='<span class="filename" filename="'+fn+'" onClick="showFileHistory(this.getAttribute('+"'"+'filename'+"'"+'))">'+data.filename+'</span>';
  const filedURL=getQueryString("file",null)? location.href: location.href+"&file="+data.filename;
  const filehist=`<a class="filename" href=${filedURL}>${data.filename}</a>`;
  //var filehist=data.filename;
  var lang=raw.code.C ?"c" : raw.code.JavaScript ? "js" : raw.code.Dolittle ? "dtl" : raw.code.DNCL ? "dncl" : raw.code.Python ? "py" :"unknown";
  var detail=raw.detail;
  var prjName="Auto_"+lang;
  var runLink=teacherID && ".?r=jsl_edit&dir=/home/"+classID+"/"+teacherID+"/"+prjName+"/&autologexec="+data.id+"&lang="+lang;
  var userid=data.user;
  const logDOM=$(`#${data.id}`);
  $.get("?TeacherLog/getNameOfUser",{user:userid}).then(r=>$("#userName").text(r));
  const rawLink=`?LogQuery/byId&id=${data.id}`;
  $("[id='"+userid+"res']").html(`<Br/>
        <div>
            <span class="logtime">${logtime}</span>&nbsp;
            ${cutTime ? `<button onclick="cut()">この日の最後まで表示</button>` :""}&nbsp;
            <button onclick="cut(${data.time})">この時刻以降非表示</button>&nbsp;
            <a href="?TeacherLog/view1Dates&user=${userid}">他の日付...</a>
        </div>
      <div><a target='raw' href="${rawLink}">Raw..</a></div>`+
      (runLink ?
          "<a target='runCheck' href='"+runLink+"'>実行してみる</a><br>":"")+
      userid+"(<span id='userName'></span>)<BR>"+
      filehist+ navByFile(data.filename)+
      `actualTime=<span class='actualTime'>${logDOM.attr("data-actualTime")}</span>`+"<br>"+
      `actualTime2=<span class='actualTime2'>${logDOM.attr("data-actualTime2")}</span>`+"<br>"+
      data.result);
  $("[id='"+userid+"']").height(30);
  $("[id='"+userid+"']").html(res);
  $("[id='"+userid+"']").css("display","inline");
  //$("#"+userid).width($("#"+userid).parent().width());
  $("[id='"+userid+"']").height( checknull( $("[id='"+userid+"']").get(0), userid).scrollHeight);
  $("[data-id='"+data.id+"']").css("background-color","orange");
  $("[id='"+userid+"detail']").html(decodeDetail(detail));
  //alert(logid);
  if(showDiffFlag && typeof prevProgram!=="undefined"/*&& prevProgram!=code*/){
    calcDiff(prevProgram,code,"[id='"+userid+"diff']","Prev","Current",true);
    $("[id='"+userid+"diff']").css("display","inline");
  }
  prevProgram=code;
  //console.log("code",code);
  //console.log("res",res);
}
function decodeDetail(detail) {
    if (typeof detail==="string") return detail;
    if (detail && typeof detail.message==="string") return detail.message;
    return JSON.stringify(detail);
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
      // url: "?Class/getLog",
      //data: "logid="+logid,
      url: "?LogQuery/byId",
      data: "id="+logid,
      dataType: "json"
  });
}
var maxEqual={}, lastAdvance={};
function showFileEntry(l) {
    var userid=l.user;
    if(!logsOfOneUser[l.filename]) logsOfOneUser[l.filename]=[];
    logsOfOneUser[l.filename].push(l.id-0);
    var pRaw;
    if(!indexList[l.filename]){
      indexList[l.filename]=0;
      pRaw=programs[l.filename][0];
    }else{
      var i=indexList[l.filename];
      pRaw=programs[l.filename][i-1];
      //console.log(i-1,pRaw);
    }
    indexList[l.filename]++;
    var cRaw=JSON.parse(l.raw);
    var lRaw=programs[l.filename][programs[l.filename].length-1];
    //console.log(pRaw,cRaw,lRaw);
    var prevProg=getCode(pRaw);//.code.C || pRaw.code.JavaScript || pRaw.code.Dolittle || pRaw.code.Python || "";
    var curProg=getCode(cRaw);//.code.C || cRaw.code.JavaScript || cRaw.code.Dolittle || cRaw.code.Python || "";
    var lastProg=getCode(lRaw);//.code.C || lRaw.code.JavaScript || lRaw.code.Dolittle || lRaw.code.Python || "";
    var prevDiffData=calcDiff(prevProg,curProg,"[id='"+userid+"diff']","Prev","Current",false);
    var lastDiffData=calcDiff(curProg,lastProg,"[id='"+userid+"diffLast']","Current","Last",false);
    var lastDiffData1=calcDiff(prevProg,lastProg,"[id='"+userid+"diffLast']","Prev","Last",false);
    var pd=":"+prevDiffData.delete+":"+prevDiffData.insert+":"+prevDiffData.replace+":"+prevDiffData.equal;
    var ld="-"+lastDiffData.delete+":"+lastDiffData.insert+":"+lastDiffData.replace+":"+lastDiffData.equal;
    //console.log("lastDiff",lastDiffData.equal,lastDiffData1.equal);
    //let advanced, regressed;
    var e=$("<span>").attr({id:l.id+'summary'}).addClass("diffStat");
    const line=$("#"+l.id);
    line.attr({"data-time": l.time});
    e.appendTo(line);
    const r=x=>Math.floor(x*10)/10;
    lastDiffData.equal+=lastDiffData.equalFine;
    let sameLines=`:${r(lastDiffData.equal)}/${lastDiffData.prevLines}/${lastDiffData.nowLines}`;
    if (prevDiffData.delete+prevDiffData.insert+prevDiffData.replace===0) {
        e.addClass("unchanged");
        line.addClass("unchanged");
        sameLines+="＝";
    }
    if(lastDiffData.equal<lastDiffData1.equal){
        e.addClass("regressed");
        line.addClass("regressed");
        //regressed=true;
        sameLines+="★";
    }
    if (lastDiffData.equal>(typeof maxEqual[l.filename]==="number"? maxEqual[l.filename] :-1)) {
        if (typeof maxEqual[l.filename]==="number") {
            e.addClass("advanced");
            line.addClass("advanced");
            //advanced=true;
            sameLines+="♪";
        }
        maxEqual[l.filename]=lastDiffData.equal;
        lastAdvance[l.filename]=l;
    } else if (lastAdvance[l.filename]) {
        const unadv=(l.time-lastAdvance[l.filename].time);
        if (unadv>=30*60) {
            e.addClass("unadvanced_30");
        } else if (unadv>=20*60) {
            e.addClass("unadvanced_20");
        } else if (unadv>=15*60) {
            e.addClass("unadvanced_15");
        } else if (unadv>=10*60) {
            e.addClass("unadvanced_10");
        } else if (unadv>=5*60) {
            e.addClass("unadvanced_5");
        }
        //sameLines+=`<font color="#f80">×</font>`;
    }
    e.html(sameLines);
    /*console.log("prev",prevProg);
    console.log("cur",curProg);
    console.log("diff",prevDiffData, lastDiffData);
    console.log("cur/last",curProg,lastProg, curProg===lastProg);*/

}
var prevLog;
async function showLogOneUser(logid,userid,fn){
    console.log("SLO",this,arguments);
    if (prevLog) $(prevLog).removeClass("selected");
    $(this).addClass("selected");
    prevLog=this;
  getLog(logid,userid);// openFrameする
  var ind=logsOfOneUser[fn].indexOf(logid-0);
  var currentProgram;
  var cururl=location.href.replace(/&logid=[0-9]+/,"")+"&logid="+logid;
  history.replaceState(null,null,cururl);
  console.log(ind,logsOfOneUser[fn]);
  //return;
    try {
        const r=await getPreviousLog(logsOfOneUser[fn][ind]);//.done(function(r){
        const curRaw=JSON.parse(r.raw);
        currentProgram=getCode(curRaw);//.code.C || curRaw.code.JavaScript || curRaw.code.Dolittle || curRaw.code.Python;

        let code="最初のプログラム";
        if (ind>0) {
            const result=await getPreviousLog(logsOfOneUser[fn][ind-1]);//.done(function(result) {
            const raw=JSON.parse(result.raw);
            code=getCode(raw);
        }
        const last=await getPreviousLog(logsOfOneUser[fn][logsOfOneUser[fn].length-1]);//.done(function(last){
        const lRaw=JSON.parse(last.raw);
        const lastProg=getCode(lRaw);//lRaw.code.C || lRaw.code.JavaScript || lRaw.code.Dolittle || lRaw.code.Python || "";
        const prevDiffData=calcDiff(code,currentProgram,"[id='"+userid+"diff']","Prev","Current",true);
        const lastDiffData=calcDiff(currentProgram,lastProg,"[id='"+userid+"diffLast']","Current","Last",true);

    }catch(e) {
        console.log("failed get last log",e.stack||e);
    }
}
function clearBreak(base){
  var lines=base.split("\n");
  var res=lines.filter(function(l){
    return !l.match(/^(\s)*$/);
  });
  return res.join("\n");
}
function checknull(o,mesg) {
    if (o) return o;
    throw new Error(mesg+" is not found");
}

function calcDiffOneLine(prev, now) {
    const base   = prev.split("");
    const newtxt = now.split("");
    const sm     = new difflib.SequenceMatcher(base, newtxt);
    var opcodes = sm.get_opcodes();
    //console.log("SequenceMatcher", opcodes);
    var diffData = {
        "insert": 0,
        "delete": 0,
        "replace": 0,
        "equal": 0,
        equalFine:0,
    };
    let diffLine = "";
    for (var opti in opcodes) {
        var opt = opcodes[opti];
        //console.log("switch", opt[0], opti, opt[2]);
        switch (opt[0]) {
            case "equal":
                if (opti == 0 && opcodes.length > 1) diffLine = opt[2];
                diffData[opt[0]] += (opt[2] - opt[1]); //  b   e    b    e
                break;
            case "delete":
                if (opti == 0) diffLine = 0; //  Left     Right
                diffData[opt[0]] += (opt[2] - opt[1]); //  b   e    b    e
                break;
            case "insert":
                if (opti == 0) diffLine = 0;
                diffData[opt[0]] += (opt[4] - opt[3]);
                break;
            case "replace":
                if (opti == 0) diffLine = 0;
                const pls = opt[2] - opt[1];
                const nls = opt[4] - opt[3];
                diffData[opt[0]] += Math.max(pls, nls);

                break;
            default:
                console.log("Unknown state '" + opt[0] + "' discovered.");
        }
    }
    diffData.firstLine = diffLine;
    return diffData;
}
function calcDiff(prev,now,id,btn,ntn,show){
    const byChar=getQueryString("bychar",false);
  // get the baseText and newText values from the two textboxes, and split them into lines
  var cbPrev=clearBreak(prev);
  var cbNow=clearBreak(now);
  const mkary=byChar? s=>s.split("") : s=>difflib.stringAsLines(s);
  var base = mkary(cbPrev);
  var newtxt = mkary(cbNow);
  //var base = difflib.stringAsLines(cbPrev);
  //var newtxt = difflib.stringAsLines($("newText").value);
  //var newtxt = difflib.stringAsLines(cbNow);
  // create  a SequenceMatcher instance that diffs the two sets of lines
  var sm = new difflib.SequenceMatcher(base, newtxt);

  // get the opcodes from the SequenceMatcher instance
  // opcodes is a list of 3-tuples describing what changes should be made to the base text
  // in order to yield the new text
  var opcodes = sm.get_opcodes();
  //var diffoutputdiv = $("[id='"+id+"diff']")[0];
  //console.log("SequenceMatcher",opcodes);
  var diffData={"insert":0,"delete":0,"replace":0,"equal":0,        equalFine:0,
  nowLines:newtxt.length, prevLines:base.length};
  let diffLine="";
  for(var opti in opcodes){
    var opt=opcodes[opti];
    //console.log("switch",opt[0],opti,opt[2]);
    switch(opt[0]){
      case "equal":
        if (opti==0 && opcodes.length>1) diffLine=opt[2];
        diffData[opt[0]]+=(opt[2]-opt[1]);//  b   e    b    e
        break;
      case "delete":
        if (opti==0) diffLine=0;          //  Left     Right
        diffData[opt[0]]+=(opt[2]-opt[1]);//  b   e    b    e
        break;
      case "insert":
        if (opti==0) diffLine=0;
        diffData[opt[0]]+=(opt[4]-opt[3]);
        break;
      case "replace":
        if (opti == 0) diffLine = 0;
        const pls = opt[2] - opt[1];
        const nls = opt[4] - opt[3];
        diffData[opt[0]] += Math.max(pls, nls);
        if (!byChar && pls===nls) {
                for (let i=0;i<pls;i++) {
                       const bl=base[opt[1]+i];
                       const nl=newtxt[opt[3]+i];
                       const d=calcDiffOneLine(bl ,nl);
                       diffData.equalFine+=(d.equal/Math.max(bl.length, nl.length));
                }
        }
        break;
      default:
        console.log("Unknown state '"+opt[0]+"' discovered.");
    }
  }
  diffData.firstLine=diffLine;
  if(show){
      let diffoutputdiv = checknull( $(id)[0], id);
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
function getQueryString(key, default_)
{
    if (arguments.length===1) default_="";
   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
   var qs = regex.exec(location.href);
   if(qs == null)
    return default_;
   else
    return decodeURLComponentEx(qs[1]);
}
function decodeURLComponentEx(s){
    return decodeURIComponent(s.replace(/\+/g, '%20'));
}
