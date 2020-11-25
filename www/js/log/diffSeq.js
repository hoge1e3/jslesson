/* global getCode, calcDiff */
// require logViewer.js
async function diffSeq(user, file) {
    const logs=await $.post("?LogQuery/index",{
        user, file, limit:100, output:"json" ,sort:"asc",
    });
    console.log(logs);
    let prevProgram, prevTime;
    $("<h2>").text(`First Code:`).appendTo("body");
    const outputs={};
    for (let log of logs) {
        const lRaw=JSON.parse(log.raw);
        const curProg=getCode(lRaw);//.code.C || pRaw.code.JavaScript || pRaw.code.Dolittle || pRaw.code.Python || "";
        //var curProg=getCode(cRaw);
        const output=(outputs[curProg]=outputs[curProg]||{dom:$("<pre>")});
        if (looksLikeOutput(lRaw.detail)) {
            output.text=lRaw.detail;
        }
        if (!prevProgram) {
            $("<pre>").text(curProg).appendTo("body");
            $("<h3>").text("Output:").appendTo("body");
            output.dom.appendTo("body");
            prevTime=log.time;
        } else if (prevProgram!==curProg){
            $("<hr>").appendTo("body");
            $("<div>").text(`↑${log.time-prevTime} Sec.↓ `).appendTo("body");
            $("<hr>").appendTo("body");
            $("<h3>").text("Changed:").appendTo("body");

            const id="DIV"+Math.floor(Math.random()*1000000);
            $("<div>").attr({id}).appendTo("body");
            calcDiff(prevProgram,curProg,`#${id}`,"Prev","Current",true);
            $("<h3>").text("Output:").appendTo("body");
            output.dom.appendTo("body");
            prevTime=log.time;
        }
        prevProgram=curProg;
    }
    for (let prog in outputs) {
        const output=outputs[prog];
        output.dom.text(output.text||"(empty)");
    }
    $(".diff th").each(function () {
        let th=$(this);
        if (th.text().match(/^[0-9]+$/)) {
            th.text("");
        }
    });
    function looksLikeOutput(detail) {
        if (detail==="未保存の内容") return false;
        if (detail==="保存しました") return false;
        if (detail==="実行しました") return false;
        return true;
    }
}
