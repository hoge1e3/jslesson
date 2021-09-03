define(function (require, exports, module) {
    const UI=require("UI");
    function Tab(options) {
        if (typeof options.length==="number") {
            options={contents:options};
        }
        const infos=options.contents;
        const baseClass=options.class||"tabs";
        const classes= options.classes||{
            all: baseClass,
            selector: `${baseClass}-selector`,
            container: `${baseClass}-container`,
            content: `${baseClass}-content`,
            button: `${baseClass}-button`,
        };
        let onSelect;
        const sel=name=>{
            for (let dom of doms) {
                if (dom.info.name===name) {
                    dom.content.show();
                    dom.button.addClass("selected");
                    if (onSelect) onSelect(name, dom);
                } else {
                    dom.content.hide();
                    dom.button.removeClass("selected");
                }
            }
        };
        const res=UI("div",{class: classes.all, $var:"__top"});
        const selector=UI("div",{class:classes.selector}).appendTo(res);
        const container=UI("div",{class:classes.container}).appendTo(res);
        const doms=[];
        let init=infos[0].name;
        for (let info of infos) {
            const button=UI("button", {
                    class: classes.button,
                    "data-name": info.name}, info.caption || info.name );
            button.appendTo(selector);
            const content=UI("div", {class:classes.content, "data-name": info.name},
                        info.content
                    );
            content.appendTo(container);
            const dom={ info ,button, content};
            Object.assign(res.$vars, info.content.$vars||{});
            const name=info.name;
            button.click(()=>sel(name));
            doms.append(dom);
            if (info.selected) {
                init=name;
            }
        }
        sel(init);
        onSelect=options.onSelect;
        return {content:res, select:sel, contents:doms};
    }
    module.exports=Tab;
});
