define(function (require, exports, module) {
    const UI=require("UI");
    const Tab=require("Tab");
    const ctrl=require("ctrl");
    class ExportOutputDialog {
        outDest() {
            return this.vars.dest[0].outDest.value;
        }
        renderTable(sep) {
            const vars=this.vars;
            const s=vars.plain.val();
            const lines =s.split("\n");
            let ln=0;
            vars.table.empty();
            let attrs=[], datas=[];
            for (let line of lines ){
                const isAttr=ln==0;
                const tr=$("<tr>").appendTo(vars.table);
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
                for (let d of row) {
                    const td=$(isAttr? "<th>": "<td>").appendTo(tr);
                    td.text(d);
                }
                ln++;
            }
            this.cdbData=datas;
            console.log(datas);
        }
        dom() {
            const cw=550,ch=250;
            if (this._dom) return this._dom;
            const chdest=(n)=>{
                switch(n){
                case "dl":
                    this.vars.send.text("ダウンロード");
                    this.vars.nameLabel.text("ファイル名");
                    break;
                case "ulu":
                case "ulc":
                    this.vars.send.text("送信");
                    this.vars.nameLabel.text("ファイル名");
                    break;
                case "cdb":
                    this.vars.send.text("送信");
                    this.vars.nameLabel.text("APIキー名");
                    break;
                }
            };
            const opt=(vname, caption)=>(["div",
                ["input", {
                    type:"radio", id:`outDest_${vname}`, name:`outDest`,
                    $var: vname, value:vname,
                    on:{change: ()=>chdest(vname)},
                }],
                ["label", {for: `outDest_${vname}`}, caption]
            ]);
            const tabs=Tab({
                onSelect: (name)=> {
                    const vars=this.vars;
                    if (name==="table") {
                        const s=vars.plain.val();
                        let sep=vars.sep.val();
                        if (!sep) {
                            sep=inferSeparator(s);
                            vars.sep.val(sep);
                        }
                        this.renderTable(sep);
                    }
                },
                contents: [
                    {
                        name: "plain", caption:"テキスト",
                        content: UI("textarea",{$var:"plain", css:{width: cw, height: ch}})
                    },
                    {
                        name: "table", caption:"表",
                        content: UI("div",{css:{
                                width: cw, height: ch,
                                overflowY: "scroll",overflowX: "scroll"
                            }},
                            ["div",
                                "区切り記号:", ["input", {$var:"sep",on:{input:()=>{
                                    const sep=this.vars.sep.val();
                                    this.renderTable(sep);
                                }}}],
                            ],
                            ["table",{$var:"table", class:"output", rows:10, cols:60}]
                        ),
                    }
                ],
            });
            this._dom=UI("div",
                ["div",
                    ["div",
                        ["form",{$var:"dest"},
                            opt("dl","ダウンロード"),
                            opt("ulu","「素材管理」(user)に送信"),
                            opt("ulc","「素材管理」(class)に送信"),
                            opt("cdb","Connect DBに送信"),
                        ]
                    ],
                    ["span",{$var: "nameLabel"},"ファイル名"], ["input",{$var:"name", value:"output.txt"}],
                    ["span",{$var: "status"}],
                    ["button", {$var:"send", on:{click:this.send.bind(this)}}, "ダウンロード"],
                ],
                tabs.content,
            );
            this.vars=Object.assign(this._dom.$vars, tabs.content.$vars);
            this.vars.dest[0].outDest.value="dl";
            chdest("dl");
            return this._dom;
        }
        async send() {
            const vars=this.vars;
            const content=this.dataContent();
            const name=vars.name.val();
            if (!name) {
                alert(`${vars.nameLabel.text()}を入れてください．`);
                return;
            }
            vars.send.prop("disabled",true);
            vars.status.text(`${vars.send.val()}中……`);
            try {
                switch(this.outDest()) {
                    case "dl":
                    window.saveAs(new Blob([content]), name);
                    break;
                    case "ulu":
                    await this.uploadAsset("user",name, content);
                    break;
                    case "ulc":
                    await this.uploadAsset("class",name, content);
                    break;
                    case "cdb":
                    const data=this.cdbData;
                    if (!data) {
                        return alert("データがありません");
                    }
                    const key=vars.name.val();
                    await ctrl.post("CDB/post", {key, data:JSON.stringify(data)});
                    break;
                }
                vars.status.text("完了");
            } catch (e) {
                alert(e.responseText || e);
                vars.status.text("失敗");
            } finally {
                vars.send.prop("disabled",false);
            }
        }
        uploadAsset(context, filename, content) {
            return $.post(ctrl.url("Asset/upload"),{context, filename, content});
        }
        dataContent() {
            return this.vars.plain.val();
        }
        show(srcElem) {
            const d=this.dom();
            d.dialog({
                title:"出力の共有",
                width:600, height:500
            });
            this.vars.status.text("");
            this.vars.plain.val(srcElem.innerText);
        }
    }
    function inferSeparator(text) {
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
    module.exports=new ExportOutputDialog();
});
