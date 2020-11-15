/* global getCode, calcDiff */
// require logViewer.js
async function diffSeq(user, file) {
    const logs=await $.post("?LogQuery/index",{
        user, file, limit:100, output:"json" ,sort:"asc",
    });
    console.log(logs);
    let prevProgram, prevTime;
    $("<div>").text(`First Code:`).appendTo("body");
    for (let log of logs) {
        const lRaw=JSON.parse(log.raw);
        const curProg=getCode(lRaw);//.code.C || pRaw.code.JavaScript || pRaw.code.Dolittle || pRaw.code.Python || "";
        //var curProg=getCode(cRaw);
        if (!prevProgram) {
            $("<pre>").text(curProg).appendTo("body");
            prevTime=log.time;
        } else if (prevProgram!==curProg){
            $("<div>").text(`${log.time-prevTime} Sec. `).appendTo("body");
            const id="DIV"+Math.floor(Math.random()*1000000);
            $("<div>").attr({id}).appendTo("body");
            calcDiff(prevProgram,curProg,`#${id}`,"Prev","Current",true);
            prevTime=log.time;
        }
        prevProgram=curProg;
    }
    $(".diff th").each(function () {
        let th=$(this);
        if (th.text().match(/^[0-9]+$/)) {
            th.text("");
        }
    });
}
