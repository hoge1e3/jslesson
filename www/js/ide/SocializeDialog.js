define(function (require,exports,module) {
    const UI=require("UI");
    function Comment(cont) {
        const like=UI("span","❤0").css({float:"right"});
        const elem=UI("div",{class:"socializePopup"},cont,like).
        appendTo("body");
        function show(at) {
            elem.show();
            let cnt=0;
            let t=setInterval(()=>{
                elem.css({left:`${at.left}px`, top:`${at.top}px`});
                cnt++;
                if (cnt<10){
                    at.top-=5;
                }
                if (cnt>180) {
                    hide();
                    clearInterval(t);
                }
            },20);
        }
        function hide() {elem.remove();}
        return {show,hide};
    }
    module.exports=(ide)=>{
        const elem=UI("div",{title:"について気づいたこと"},
            ["input", {$var:"cont", size:60,on:{enterkey:send}}],
            ["button", {$var:"OKButton", on:{click: send}},"送信"]
        );
        const vars=elem.$vars;
        function send() {
            const cont=vars.cont.val();
            vars.cont.val("");
            const o=elem.offset();
            console.log(o);
            o.top-=50;
            Comment(cont).show(o);
        }
        function changeFile(f) {
            elem.dialog("option","title",f.name()+"について気づいたこと");
        }
        function show(f) {
            elem.dialog({width:800,height:100,position: { my: "center bottom", at: "center bottom"},});
            if (f) changeFile(f);
        }
        return {changeFile,show};
    };
});
