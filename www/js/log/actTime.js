$(()=>{
    addActualTime2();
});
const SYM_AT=Symbol("actualTime");
const SYM_ROW=Symbol("row");
async function addActualTime2(){
    const header=$("tr.header");
    const f=( header.find("[data-attr='filename']")[0]);
    const u=( header.find("[data-attr='user']")[0]);
    console.log(f,u);
    if (!f || !u) return;
    header.append($("<th>").attr({"data-attr":"at_complete"}).text("at_complete"));
    header.append($("<th>").attr({"data-attr":"at_full"}).text("at_full"));
    header.append($("<th>").attr({"data-attr":"ok"}).text("ok"));
    const rows=[...$("tr.record")].map((row)=>$(row));
    const rowsByFile={};
    let batch=[],batch_size=10;
    async function addBatch(row, user,file) {
        const ar=[user,file];
        ar[SYM_ROW]=row;
        batch.push(ar);
        if (batch.length<10) {
            return;
        }
        await flushBatch();
    }
    async function flushBatch() {
        const url=`a.php?TeacherLog/getActualtime2Batch&usersfiles=${JSON.stringify(batch)}`;
        console.log(url);
        try {
            const r=await $.get(url);
            console.log(r);
            let i=0;
            for (let e of r) {
                const row=batch[i][SYM_ROW];
                row.append($("<td>").attr({"data-attr":"at_complete"}).text(e[0]));  
                row.append($("<td>").attr({"data-attr":"at_full"}).text(e[1]));  
                row.append($("<td>").attr({"data-attr":"ok"}).append(
                    $("<a>").attr({
                        target:"ok",
                        href: `?GetLastFiles/index&file=${batch[i][1]}#${batch[i][0]}`
                    }).text(e[2]==1?"OK":e[2]==0?"NG":"未採点")
                ));  
                row[SYM_AT]=e[0]-0;  
                i++;
            }
        } catch (e) {
            console.log(e);
        } finally {
            batch=[];
        }
    }
    for (let row of rows) {
        const f=row.find("[data-attr='filename']");
        const u=row.find("[data-attr='user']");
        //rowsByFile[f]=rowsByFile[f]||[];
        //rowsByFile[f].push(row);
        if (!f[0] || !u[0]) continue;
        //console.log(u.text(), f.text());
        if (!u.text()) continue;
        if (!f.text()) continue;
        await addBatch(row, u.text(), f.text());
    }
    await flushBatch();
    for (let row of rows) {
        const f=row.find("[data-attr='filename']");
        const ok=row.find("[data-attr='ok']");
        const key=f.text()+"_"+ok.text();
        rowsByFile[key]=rowsByFile[key]||[];
        rowsByFile[key].push(row);
    }
    header.append($("<th>").attr({"data-attr":"outlier"}).text("outlier"));
    console.log(rowsByFile);
    for (let f of Object.keys(rowsByFile)) {
        outlier(rowsByFile[f]);
    }
    $("table").tablesorter({
        // define a custom text extraction function
            textExtraction: function(node) {
                // extract data from markup and return it
                //console.log(node.getAttribute("data-rate"));
                if(node.getAttribute("data-rate")!=null){
                    return (parseInt(node.getAttribute("data-rate"))+100)+"";
                }
                return node.innerHTML;
            },
            emptyTo:"bottom",
        });

}

function outlier(rows) {
    // 配列を昇順でソート
    rows.sort((a, b) => a[SYM_AT] - b[SYM_AT]);
    // 第1四分位数、第3四分位数を計算
    const q1Index = Math.floor(rows.length * 0.25);
    const q3Index = Math.floor(rows.length * 0.75);
    const q1 = rows[q1Index][SYM_AT];
    const q3 = rows[q3Index][SYM_AT];
    // 四分位範囲を計算
    const iqr = q3 - q1;
    for (let row of rows) {
        const out = (row[SYM_AT]-q3)/iqr;
        row.append($("<td>").attr({"data-attr":"outlier","data-value":out}).text(Math.round(out*10)/10));  
    }
    // 外れ値の閾値を計算
    //const outlierThreshold = q3 + (1.5 * iqr);
    //return outlierThreshold;
  }