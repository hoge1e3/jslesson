//function runOnServer2(str,needStdin) {
function runOnServer3(prj, file, needStdin) {
    return runOnServerInteravtive(prj,file);
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
function runOnServerInteravtive(prj,file) {
    let stdout="",stderr="";
    $.post(window.controllerPath+'?RunPython/runInDocker_interactive', {prj, file ,url:location.href,rand:Math.random()}).then(proc);

    function proc(r) {
        //$("#output").empty();
        const stdout_delta=r.stdout.substring(stdout.length);
        console.log([r.stdout, stdout, stdout_delta]);
        stdout=r.stdout;
        const stderr_delta=r.stderr.substring(stderr.length);
        stderr=r.stderr;
        convout(stdout_delta, $("#output"));
        if (stderr_delta) {
            $("<div>").css({color:"red"}).text(stderr_delta).appendTo("#output");
        }
        if (r.reqid) {
            const input=$("<input>").appendTo("#output");
            input.on("keydown",(e)=>{
                if (e.keyCode===13) {
                    $("#output").append(input.val()+"\n");
                    $.post(window.controllerPath+'?RunPython/runInDocker_interactive', {prj, file ,url:location.href, reqid: r.reqid, stdin:input.val()+"\n", rand:Math.random()}).then(proc);
                    input.remove();
                }
            });
        } else {
            if (typeof parent!=="undefined" && parent.sendResult) {
                const r=$("#output").text();
                parent.sendResult(r,"Python");
            }
        }    
    }

}
function convout(r, out) {
    out=$(out);
    r=r.replace(/^[\s\S]*echo off\s*\n?/,'');
    var spl="["+Math.random()+"]";
    var imgs=[];
    r=r.replace(/(<img src='[^']+'\/>)|(<iframe src='[^']+'><\/iframe>)/g, function (_) {
        imgs.push(_);
        return spl;
    });
    //console.log(r,imgs);
    r.split(spl).map(function (span) {
        out.append($("<span>").text(span));
        if (imgs.length) {
            out.append($(imgs.shift()));
        }
    });
}
//function runOnServerWithStdin(str,stdin) {
function runOnServerWithStdin(prj, file, stdin) {
    jQuery.support.cors = true;
    $('#output').text("Running python on server");
    var t=setInterval(function () {
        $('#output').append(".");
    },500);
    //$.post(window.controllerPath+'?RunPython/runStr', {str:str,rand:Math.random(),stdin:stdin}).then(
    $.post(window.controllerPath+'?RunPython/runInDocker', {prj, file ,url:location.href,rand:Math.random(),stdin:stdin}).then(
        function (r) {
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
