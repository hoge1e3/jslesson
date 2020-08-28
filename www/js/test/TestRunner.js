define(function (require,exports,module) {
    module.exports=class {
        constructor(options) {
            options=options||{};
            this.options=options;
            options.defaultSleepTime=options.defaultSleepTime||1000;
            options.timeout=options.timeout||10000;
        }
        async run() {
            const n=(a,b)=>typeof a==="number"? a: b;
            const width=n(this.options.width, $(window).width()-50);
            const height=n(this.options.height, $(window).height()-100);
            const ifrmjq=$("<iframe>").attr({
                /*src:this.projectSelURL,*/width,height
            }).appendTo("body");
            this.iframe=ifrmjq[0];
        }
        contentWindow() {
            return this.iframe.contentWindow;
        }
        open(url) {
            this.contentWindow().location.href=url;
        }
        $(...args) {
            const w=this.contentWindow();
            const $=w.$;
            return $(...args);
        }
        trimspace(s) {
            return s.replace(/^[\r\n\s]*/,"").replace(/[\r\n\s]*$/,"").replace(/[\r\n\s]+/g," ");
        }
        async waitForText(text,filter="") {
            const sel=await this.retry(()=>{
                const sel=this.findByText(text,filter);
                if (!sel.length) throw new Error(`timeout for text ${text}`);
                return sel;
            });
            return sel;
        }
        async waitForQuery(q) {
            return await this.retryGet(
                ()=>this.$(q).get(0),
                `timeout for query ${q}`);
        }
        async clickByQuery(q) {
            const e=await this.waitForQuery(q);
            e.click();
        }
        async clickByText(t,filter="") {
            const sel=await this.waitForText(t);
            sel.click();
        }
        waitTrue(f, mesg="waitTrue") {
            return this.waitAppear(f,mesg);
        }
        async waitAppear(f, mesg="waitAppear") {
            return await this.retry(()=>{
                const e=f();
                if (e) return e;
                throw new Error(`Timeout for ${mesg}`);
            });
        }
        findByText(t, filter="") {
            let sel,len;
            this.$(`${filter}:contains('${t}')`).each(function () {
                const e=$(this);
                if (!sel || e.html().length<len) {
                    len=e.html().length;
                    sel=this;
                }
            });
            //const e=this.$(`:contains('${t}')`).get(0);
            return $(sel);
        }
        //runMenu
        async clickByID(id) {
            return await this.clickByQuery("#"+id);
        }
        async selectLinkByText(t) {
            const e=await this.retryGet(
                ()=>this.$(`a:contains('${t}')`).get(0),
                `selectLinkByText ${t} fail `);
            e.click();
        }
        async setValueFollowing(text, value) {
            const e=await this.retryGet(
                ()=>this.findInputFollowing(text),
                `setValueFollowing:${text} not found`
            );
            e.val(value);
        }
        findInputFollowing(text) {
            let e=this.findByText(text);
            while(true) {
                e=this.nextElement(e);
                if (!e) return null;
                if (e[0].tagName==="input" || e[0].tagName==="textarea") {
                    return e;
                }
            }
        }
        sleep(t) {
            return new Promise(s=>setTimeout(s,t||this.options.defaultSleepTime));
        }
        async retryGet(f,failMesg) {
            return await this.retry(()=>{
                const r=f();
                if (!r) throw new Error(failMesg);
                return r;
            });
        }
        async retry(f) {
            let ex;
            const options=this.options;
            for (let i=0;i<options.timeout/options.defaultSleepTime;i++) {
                try {
                    return f();
                } catch(e){
                    ex=e;
                    await this.sleep();
                }
            }
            throw ex;
        }
        nextElement(e,noChild=false) {
            const c=e.children();
            if (c.length==0) noChild=true;
            if (noChild) {
                const n=e.next();
                if (!n.length) {
                    const p=e.parent();
                    if (!p.length) return null;
                    return this.nextElement(p,true);
                } else {
                    return n;
                }
            } else {
                return $(c[0]);
            }
        }
    };
});
