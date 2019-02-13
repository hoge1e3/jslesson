function runOnServer(srcPath) {
    $.ajax(window.controllerPath+'?RunPython/run', {data:{srcPath:srcPath}}).then(
        function (r) {
            r=r.replace(/.*echo off\s*/,'');
            var spl="["+Math.random()+"]";
            var imgs=[];
            r=r.replace(/<img src='[^']+'\/>/g, function (_) {
                imgs.push(_);
                return spl;
            });
            var out=$('#output');
            console.log(r,imgs);
            r.split(spl).map(function (span) {
                out.append($("<span>").text(span));
                if (imgs.length) {
                    out.append($(imgs.shift()));
                }
            });

        },
        function (e){alert(e.responseText);}
    );
}
