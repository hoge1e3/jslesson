define(function (require,module,exports) {
    const BATestRunner=require("test/BATestRunner");
    const r=new BATestRunner({width:1,height:1});
    const place=$("<div>").appendTo("body");
    async function main() {
        place.empty();
        place.append("Listing projects...");
        await r.run();
        const prjSel=await r.openProjectSel();
        place.empty();
        const prjList=$("<div>").appendTo(place);
        prjSel.getItems().forEach(item=>{
            const itemDiv=$("<div>").appendTo(prjList);
            itemDiv.append(`${item.name} / ${item.lang} `);
            itemDiv.click(()=>open(item));
        });
    }
    async function open(item) {
        place.empty();
        place.append(`opening ${item.name}`);
        const ide=await item.open();
        place.empty();
        $("<div>").append("Home").appendTo(place).click(main);
        const fileList=$("<div>").appendTo(place);
        ide.getFileNames().forEach(name=>{
            const item=$("<div>").text(name).appendTo(fileList);
            item.click(()=>openFile(name));
        });
        const runButton=$("<button>").text("Run").appendTo(place).click(run);
        const textArea=$("<textarea>").appendTo(place);
        const output=$("<textarea>").appendTo(place);
        let edit;
        async function openFile(name) {
            if (edit) await edit.input(textArea.val());
            edit=await ide.openFile(name);
            textArea.val(edit.getContent());
        }
        let timer;
        async function run() {
            if (!edit) return ;
            if (timer) clearInterval(timer);
            await edit.input(textArea.val());
            const url=await edit.runFullScr();
            $("<a>").attr({href:url,target:"run"}).text("Run").appendTo(place);
            /*
            const result=await edit.run();
            timer=setInterval(()=>{
                output.val(result.getOutputBodyText());
            },1000);
            */
        }
    }
    main();
});
