//function runOnServer2(str,needStdin) {
async function runOnServer3(prj, file, needStdin) {
    var stdin=await handleStdin(needStdin);
    runOnServerWithStdin(prj,file,stdin);
}
async function handleStdin(needStdin) {
    let inq=getQueryString("stdin",null);
    if (!needStdin) {
        let stdin="\n\n\n\n\n\n\n\n";
        return stdin;
    } else if (typeof inq==="string") {
        return inq;
    } else {
        return await showStdinBox();
    }    
}
function showStdinBox() {
    return new Promise((succ)=>{
        let place=$("<div>").appendTo("body");
        $("<div>").text("入力を設定してください(入力値ごとに改行で区切る)").appendTo(place);
        let t=$("<textarea>").attr({rows:10,cols:40}).appendTo(place);
        $("<button>").text("実行").click(function () {
            let stdin=t.val()+"\n";
            succ(stdin);
            place.remove();
        }).appendTo(place);
    });
}
let hindicator;
function showIndicator() {
    $('#output').text("Running python on server");
    hindicator=setInterval(function () {
        $('#output').append(".");
    },500);
}
function clearIndicator() {
    clearInterval(hindicator);
    $('#output').text("");
}
function procResult(r) {
    clearIndicator();
    parent.window.echooff=r;
    r=r.replace(/^[\s\S]*echo off\s*\n?/,'');
    var spl="["+Math.random()+"]";
    var imgs=[];
    r=r.replace(/(<img src='[^']+'\/>)|(<iframe src='[^']+'><\/iframe>)/g, function (_) {
        imgs.push(_);
        return spl;
    });
    var out=$('#output');
    $('#output').text("");
    console.log(r,imgs);
    r.split(spl).map(function (span) {
        out.append($("<span>").text(span));
        if (imgs.length) {
            out.append($(imgs.shift()));
        }
    });
    if (typeof parent!=="undefined" && parent.sendResult) {
        parent.sendResult(r,"Python");
    }
}

function procError(e){
    clearIndicator();
    if (typeof e==="string") $('#output').append(e);
    //else if (e.responseText) alert(e.responseText);
    //else if (e.statusText) alert(e.statusText);
    else if (typeof e==="object") {
        //var buf="Fail "+window.controllerPath+'?RunPython/run'+ "\n";
        for (var k in e) {
            if (typeof e[k]!=="function"){
                $('#output').append(k+": "+e[k]+", ");
            }
        }
        //alert(buf);
    }
    if (typeof parent!=="undefined" && parent.sendResult) {
        const r=$("#output").text();
        parent.sendResult(r,"Python");
    }
}
//function runOnServerWithStdin(str,stdin) {
function runOnServerWithStdin(prj, file, stdin) {
    jQuery.support.cors = true;
    /*$('#output').text("Running python on server");
    var t=setInterval(function () {
        $('#output').append(".");
    },500);*/
    showIndicator();
    //$.post(window.controllerPath+'?RunPython/runStr', {str:str,rand:Math.random(),stdin:stdin}).then(
    $.post(window.controllerPath+'?RunPython/runInDocker', {prj, file ,url:location.href,rand:Math.random(),stdin:stdin}).then(
        /*function (r) {
            clearInterval(t);
            parent.window.echooff=r;
            r=r.replace(/^[\s\S]*echo off\s*\n?/,'');
            var spl="["+Math.random()+"]";
            var imgs=[];
            r=r.replace(/(<img src='[^']+'\/>)|(<iframe src='[^']+'><\/iframe>)/g, function (_) {
                imgs.push(_);
                return spl;
            });
            var out=$('#output');
            $('#output').text("");
            console.log(r,imgs);
            r.split(spl).map(function (span) {
                out.append($("<span>").text(span));
                if (imgs.length) {
                    out.append($(imgs.shift()));
                }
            });
            if (typeof parent!=="undefined" && parent.sendResult) {
                parent.sendResult(r,"Python");
            }
        },
        function (e){
            clearInterval(t);
            if (typeof e==="string") $('#output').append(e);
            //else if (e.responseText) alert(e.responseText);
            //else if (e.statusText) alert(e.statusText);
            else if (typeof e==="object") {
                //var buf="Fail "+window.controllerPath+'?RunPython/run'+ "\n";
                for (var k in e) {
                    if (typeof e[k]!=="function"){
                        $('#output').append(k+": "+e[k]+", ");
                    }
                }
                //alert(buf);
            }
            if (typeof parent!=="undefined" && parent.sendResult) {
                const r=$("#output").text();
                parent.sendResult(r,"Python");
            }
        }*/
        procResult, procError
    );
}
function runOnServer(srcPath) {
    jQuery.support.cors = true;
    showIndicator();
    $.ajax(window.controllerPath+'?RunPython/run', {data:{srcPath:srcPath,rand:Math.random()}}).then(
        procResult, procError
    );
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