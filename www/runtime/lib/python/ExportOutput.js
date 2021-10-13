/* global BitArrow*/
(function () {
    const ctrl={
        url(path,params) {
            let res=BitArrow.serverTop+".?"+path;
            if (params) {
                res+=Object.keys(params).map (k=>`&${k}=${params[k]}`).join("");
            }
            return res;
        },
        run(method,path,params) {
            params=params||{};
            return $.ajax({
                url: ctrl.url(path),
                data:params,
                cache: false,
                type:method
            });
        },
        get(path,params) {
            return ctrl.run("get",path,params);
        },
        post (path,params) {
            return ctrl.run("post",path,params);
        }
    };
    window.ExportOutput={
        uploadAsset(context, filename, content) {
            return ctrl.post("Asset/upload",{context, filename, content});
        },
        postCDB(key, data) {
            return ctrl.post("CDB/post", {key, data:JSON.stringify(data)});
        },
        renderTable(sep, text) {// TODO overlap with  ExportOutputDialog
            const lines =text.split("\n");
            let ln=0;
            let attrs=[], datas=[];
            for (let line of lines ){
                const isAttr=ln==0;
                line=line.replace(/\r/,"");
                if (line.length===0) continue;
                const row=line.split(sep);
                if (isAttr) attrs=row;
                else {
                    const data={};
                    let i=0;
                    for (let attr of attrs) {
                        data[attr]=row[i];
                        i++;
                    }
                    datas.push(data);
                }
                ln++;
            }
            console.log(datas);
            return datas;
        },
        inferSeparator(text) {// TODO same as ExportOutputDialog
            const cands=[",","\t"," ", /\s+/];
            const lines=text.split("\n");
            let res, max=-1;
            for (let cand of cands) {
                let score=0, prev;
                for (let line of lines) {
                    const a=line.split(cand);
                    if (!prev || a.length===prev) {
                        score+=a.length;
                    }
                    prev=a.length;
                }
                if (score>max) {
                    res=cand;
                    max=score;
                }
            }
            return res;
        }
    };
})();
