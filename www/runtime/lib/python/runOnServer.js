//function runOnServer2(str,needStdin) {
function runOnServer3(prj, file, needStdin) {
    var stdin,t,place;
    if (!needStdin) {
        stdin="\n\n\n\n\n\n\n\n";
        runOnServerWithStdin(prj,file,stdin);
    } else {
        place=$("<div>").appendTo("body");
        $("<div>").text("入力を設定してください(入力値ごとに改行で区切る)").appendTo(place);
        t=$("<textarea>").attr({rows:10,cols:40}).appendTo(place);
        $("<button>").text("実行").click(function () {
            stdin=t.val()+"\n";
            runOnServerWithStdin(prj,file,stdin);
            place.remove();
        }).appendTo(place);
    }
}
//function runOnServerWithStdin(str,stdin) {
function runOnServerWithStdin(prj, file, stdin) {
    jQuery.support.cors = true;
    $('#output').text("Running python on server");
    var t=setInterval(function () {
        $('#output').append(".");
    },500);
    //$.post(window.controllerPath+'?RunPython/runStr', {str:str,rand:Math.random(),stdin:stdin}).then(
    $.post(window.controllerPath+'?RunPython/runInDocker', {prj, file ,rand:Math.random(),stdin:stdin}).then(
        function (r) {
            clearInterval(t);
            parent.window.echooff=r;
            r=r.replace(/^[\s\S]*echo off\s*\n?/,'');
            var spl="["+Math.random()+"]";
            var imgs=[];
            r=r.replace(/<img src='[^']+'\/>/g, function (_) {
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
        }
    );
}

function runOnServer(srcPath) {
    jQuery.support.cors = true;
    $('#output').text("Running python on server");
    var t=setInterval(function () {
        $('#output').append(".");
    },500);
    $.ajax(window.controllerPath+'?RunPython/run', {data:{srcPath:srcPath,rand:Math.random()}}).then(
        function (r) {
            clearInterval(t);
            r=r.replace(/.*echo off\s*/,'');
            var spl="["+Math.random()+"]";
            var imgs=[];
            r=r.replace(/<img src='[^']+'\/>/g, function (_) {
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
        }
    );
}
