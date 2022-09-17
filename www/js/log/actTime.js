$(()=>{
    addActualTime2();
});
async function addActualTime2(){
    const header=$("tr.header");
    const f=( header.find("[data-attr='filename']")[0]);
    const u=( header.find("[data-attr='user']")[0]);
    console.log(f,u);
    if (!f || !u) return;
    header.append($("<td>").addClass("header").text("actualTime"));
    const rows=$("tr.record");
    for (let row of rows) {
        //console.log(row);
        row=$(row);
        const f=row.find("[data-attr='filename']");
        const u=row.find("[data-attr='user']");
        if (!f[0] || !u[0]) continue;
        console.log(u.text(), f.text());
        const url=`a.php?TeacherLog/getActualtime2&user=${u.text()}&file=${f.text()}`;
        console.log(url);
        try {
            const r=await $.get(url);
            row.append($("<td>").addClass("record").text(r));    
        } catch (e) {
            console.log(e);
        }
    }
}
