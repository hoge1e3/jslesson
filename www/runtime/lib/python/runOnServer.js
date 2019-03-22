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
