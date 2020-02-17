define(function (require,exports,module) {
    const UI=require("UI");
    const ctrl=require("ctrl");
    const popups=[];
    function up() {
        if (up.cnt<=0) return;
        up.cnt--;
        if (up.cnt<=0) {
            if(up.queue.length) up.queue.shift()();
        }
        for (let p of popups) p.moveBy();
        if (popups.length>5) popups[0].hide();
    }
    up.cnt=0;
    up.queue=[];
    up.reserve=f=>up.queue.push(f);
    setInterval(up,20);
    function CommentPopup(com) {
        const favButton=UI("span",{on:{click:toggleFav}},"❤");
        if (com.favByMyself) favButton.addClass("faved");
        const favCount=UI("span",com.favsHaving||"0");

        const like=UI("span",favButton, favCount).css({float:"right"});
        const elem=UI("div",{class:"socializePopup"},com.content,like).
        appendTo("body");
        let at;
        function show(_at) {
            at=at||_at;
            if (up.cnt>0) {
                return up.reserve(show);
            }
            popups.push(self);
            console.log("POP!",com);
            up.cnt=10;
            elem.show();
            elem.css({left:`${at.left}px`, top:`${at.top}px`});
        }
        function moveBy() {
            at.top-=5;
            elem.css({left:`${at.left}px`, top:`${at.top}px`});
        }
        function hide() {
            elem.remove();
            const i=popups.indexOf(self);
            popups.splice(i,1);
        }
        async function toggleFav() {
            if (com.favByMyself) {
                await ctrl.get("Note/rmFav",{id:com.favByMyself});
                favCount.text(favCount.text()-1);
                favButton.removeClass("faved");
                com.favByMyself=false;
            } else {
                await ctrl.get("Note/addFav",{id:com.id});
                favCount.text(favCount.text()-0+1);
                favButton.addClass("faved");
                com.favByMyself=true;
            }
        }
        const self={show,hide,moveBy};

        return self;
    }
    CommentPopup.clear=()=>{
        while (popups.length) popups[0].hide();
        up.queue=[];
    };
    module.exports=(ide)=>{
        const elem=UI("div",{title:"についてのノート"},
            ["input", {$var:"cont", size:60,on:{enterkey:send}}],
            ["button", {$var:"OKButton", on:{click: send}},"送信"]
        );
        const vars=elem.$vars;
        let file;
        async function send() {
            const cont=vars.cont.val();
            vars.cont.val("");
            const o=elem.offset();
            console.log(o);
            o.top-=50;
            const com={content:cont};
            CommentPopup(com).show(o);
            if (file) {
                const prjTop=ide.prj.getDir().up();
                const filePath=file.relPath(prjTop);
                com.id=await ctrl.post("Note/put",{
                    file:filePath,
                    content:cont,
                });
                console.log("New note ",com.id);
            }
        }
        async function changeFile(f) {
            if (file && f && file.path()===f.path()) return;
            CommentPopup.clear();
            file=f;
            const prjTop=ide.prj.getDir().up();
            const filePath=file.relPath(prjTop);

            elem.dialog("option","title",f.name()+"について気づいたこと");
            const coms=await ctrl.get("Note/get",{file:filePath});
            console.log("coms",coms);
            for (let com of coms) {
                const o=elem.offset();
                o.top-=50;
                CommentPopup(com).show(o);
            }
        }
        function show(f) {
            elem.dialog({width:800,height:100,position: { my: "center bottom", at: "center bottom"},});
            if (f) changeFile(f);
        }
        return {changeFile,show};
    };
});
