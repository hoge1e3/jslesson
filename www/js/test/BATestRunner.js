define(function (require,exports,module) {
    const WebSite=window.WebSite;
    const TestRunner=require("test/TestRunner");
    const EventHandler=require("EventHandler");
    class ProjectItem {
        constructor(runner, jdom) {
            this.runner=runner;
            this.jdom=jdom;
            this.name=jdom.find(".name").text();
            this.lang=jdom.find("img").attr("src").replace(/.\/images\/([\w\d]+)\.png/,(_,l)=>l);
        }
        async open() {
            this.jdom.find(".name").get(0).click();
            const r=this.runner;
            const ic=new IDEContext(r, this.name);
            await ic.init();
            return ic;
        }
        async delete() {
            this.jdom.find(".cmd_del")[0].click();
        }
    }
    class ProjectSelContext {
        constructor(runner) {
            this.runner=runner;
        }
        async sleep(t){await this.runner.sleep(t);}
        $(q) {return this.runner.$(q);}
        getItem(name) {
            return this.getItems().find(p=>p.name===name);
        }
        getItems() {
            const res=[];
            const r=this.runner;
            r.$(".project").each(function (){
                res.push(new ProjectItem(r,$(this)));
            });
            return res;
        }
        getNames() {
            return this.getItems().map(p=>p.name);
        }
        async open(name) {
            const n=this.getItem(name);
            if (!n) throw new Error(`project ${name} does not exist`);
            return await n.open();
        }
        async init() {
            const r=this.runner;
            await r.open(r.projectSelURL);
            await r.waitAppear(()=>{
                const w=r.contentWindow();
                const d=w.document;
                return d.querySelector("#userInfo") || d.querySelector("[name='class']");
            },"projectSel");
            const w=r.contentWindow();
            const d=w.document;
            if (d.querySelector("#userInfo")) {
                await r.waitForText("他ユーザでログイン");
                return;
            }
            const options=r.options;
            if (options.className && options.userName) {
                await r.sleep(1000);
                d.querySelector("[name='class']").value=(options.className);
                await r.sleep(500);
                d.querySelector("[name='user']").value=(options.userName);
                await r.sleep(500);
                d.forms[0].submit();//");//clickByText("OK");
                await r.sleep(300);
                r.loggedin=true;
                return this;
            } else {
                alert("BitArrowにログインしてください。");
            }
        }
        async prepareEmpty(name, lang) {
            await this.deleteIfExists(name);
            await this.sleep(1000);
            return await this.create(name,lang);
            //await this.sleep(1000);
        }
        async deleteIfExists(name) {
            const r=this.runner;
            await r.waitTrue(()=>{
                const prjItem=this.getItem(name);
                if (!prjItem) {
                    console.log("Project ",name," did not exist.");
                    return true;
                }
                prjItem.delete();
            },`Project ${name} still exists!`);
        }
        async create(name, lang) {
            const prjItem=this.getItem(name);
            if (prjItem) throw new Error(`Project ${name} already exists.`);
            const r=this.runner;
            const w=r.contentWindow();
            const $=w.$;
            $('#newPrj').click();
            await r.sleep();
            $('#prjName').val(name);
            await r.sleep();
            $('#prjLang').val(lang);
            await r.sleep();
            await r.clickByText("OK");
            await r.sleep();
            const ic=new IDEContext(r, name);
            await ic.init();
            return ic;
        }
    }
    class IDEContext {
        constructor(runner, name) {
            this.runner=runner;
            this.name=name;
            this.events=new EventHandler();
        }
        async sleep(t){await this.runner.sleep(t);}
        $(q) {return this.runner.$(q);}
        async init() {
            const r=this.runner;
            await r.waitAppear(()=>r.contentWindow().errorDialog,"builderReady");
            this.errorDialog=r.contentWindow().errorDialog;
            this.errorDialog.on("show",(...args)=>this.events.fire("error",...args));
        }
        on(...args) {
            return this.events.on(...args);
        }
        getFileItem(name) {
            const res=this.$(`.fileItem:contains('${name}')`);
            if (res.get(0)) return res;
            return null;
        }
        getFileNames() {
            const res=[];
            this.$(".fileItem").each(function () {
                res.push(this.innerText);
            });
            return res;
        }
        async openFile(name) {
            const r=this.runner;
            await r.waitForText("ファイル");
            const ec=new EditContext(this,name);
            if (!this.getFileItem(name)) {
                await r.toggleMenu();
                //await r.sleep();
                await r.selectLinkByText("ファイル");
                await r.sleep();
                await r.selectLinkByText("新規");
                await r.sleep();
                await r.toggleMenu();
                const w=r.contentWindow();
                const $=w.$;
                $("#inputDialog").val(name);
                await r.sleep();
                await r.clickByText("OK");
            }
            await ec.init();
            return ec;
        }
        testcase(params) {
            return new Testcase(this,params);
        }
    }
    class Testcase {
        // fileName:string
        // expect: function | string
        // context: string
        constructor(ctx,params) {
            this.ideCtx=ctx;
            this.runner=this.ideCtx.runner;
            Object.assign(this,params);
        }
        async run() {
            const r=this.runner;
            const ec=await this.ideCtx.openFile(this.fileName);
            await ec.input(this.content);
            await r.sleep();
            const rc=await ec.run();
            const expect=this.expect;
            const ef=(typeof expect==="function") ? expect : window=>{
                const tx=rc.getOutputBodyText();
                console.log("The output", tx);
                console.log(tx,expect);
                if (tx!==expect) throw new Error("Asserion failed"+tx+"!="+expect);
            };
            await r.retry(()=>ef(rc.getOutputWindow()));
            await rc.close();
        }
    }
    class EditContext {
        constructor(ideCtx, name) {
            this.ideCtx=ideCtx;
            this.runner=ideCtx.runner;
            this.name=name;
        }
        async init() {
            (await this.runner.waitTrue(()=>this.ideCtx.getFileItem(this.name))).get(0).click();
            return this;
        }
        async sleep(t){await this.runner.sleep(t);}
        $(q) {return this.runner.$(q);}
        getCurrentEditor() {
            return this.runner.contentWindow().getCurrentEditorInfo().editor;
        }
        getContent() {
            return this.getCurrentEditor().getValue();
        }
        async input(cont) {
            if (typeof cont==="string") {
                const e=this.getCurrentEditor();
                e.setValue(cont);
            } else {
                for (let lang in cont) {
                    this.selectLangTab(lang);
                    await this.sleep();
                    const e=this.getCurrentEditor();
                    e.setValue(cont[lang]);
                    await this.sleep();
                }
            }
        }
        async selectLangTab(name) {
            const r=this.runner;
            const e=await r.retryGet(
                ()=>r.$(`.selTab:contains('${name}')`).get(0),
                `selectLangTab ${name} fail`);
            e.click();
        }
        async run(options) {
            const r=new RunContext(this,options);
            return await r.init();
        }
    }
    class RunContext {
        constructor(editCtx, options) {
            this.editCtx=editCtx;
            this.ideCtx=editCtx.ideCtx;
            this.runner=this.ideCtx.runner;
            this.options=options||{runAt:"browser", fullScr:false};
        }
        async sleep(t){await this.runner.sleep(t);}
        $(q) {return this.runner.$(q);}
        async init(){
            const r=this.runner;
            let errorInfo;
            const h=this.ideCtx.on("error", e=>errorInfo=e);
            await r.toggleMenu();
            const options=this.options;
            if (options.fullScr) {
                r.$("#fullScr").click();
            } else if (r.$("#runMenu").length) {
                await r.clickByID("runMenu");
            } else if (r.$("#runPython").length) {
                await r.clickByID("runPython");
                await r.sleep();
                await r.clickByID(options.runAt==="browser"?"runBrowser":"runServer");
            }
            await r.toggleMenu();
            await r.waitTrue(()=>{
                if (errorInfo) return errorInfo;
                if (options.fullScr) {
                    const urlElem=r.$("[target='runit']");
                    if (!urlElem.is(":visible")) return;
                    const url=urlElem.attr("href");
                    if (url) urlElem.closest(".ui-dialog").find(".ui-dialog-titlebar-close")[0].click();
                    this.url=url;
                    return url;
                } else {
                    return this.getOutputWindow();
                }
            });
            h.remove();
            if (errorInfo) {
                if (errorInfo.error instanceof Error) {
                    errorInfo.error.info=errorInfo;
                    throw errorInfo.error;
                }
                const e=new Error(errorInfo.mesg||errorInfo);
                e.info=errorInfo;
                throw e;
            }
            return this;
        }
        getOutputWindow() {
            return this.$("#ifrmDlg")[0].contentWindow;
        }
        getConsoleOutput() {
            return this.$("#ifrmDlg")[0].contentWindow.
                document.getElementById("console").innerText;
        }
        getOutputBodyHTML() {
            return this.$("#ifrmDlg")[0].contentWindow.
                document.body.innerHTML;
        }
        getOutputBodyText() {
            return this.$("#ifrmDlg")[0].contentWindow.
                document.body.innerText;
        }
        async close() {
            const r=this.runner;
            await r.clickByText("閉じる");
        }
    }
    class BATestRunner extends TestRunner {
        constructor(options) {
            super(options);
            options=this.options;
            //options.className=options.className||"0123";
            //options.userName=options.userName||"test";
        }
        static async create(options) {
            const r=new BATestRunner(options);
            await r.run();
            return r;
        }
        async run() {
            super.run();
            this.projectSelURL=this.options.bitarrowTop||WebSite.serverTop;//'http://localhost/';
            this.loginURL=this.projectSelURL+'?Login/';
            //var projectSelURL='http://klab.eplang.jp/jslesson/'
            this.loggedin=false;
            if (window.SplashScreen) window.SplashScreen.hide();
        }
        async openProjectSel() {
            const ctx=new ProjectSelContext(this);
            await ctx.init();
            return ctx;
        }
        async toggleMenu() {
            const q=".navbar-toggle";
            if (!$(q)[0]) return;
            await this.clickByQuery(q);
            await this.sleep();
        }
        trimspace(s) {
            return s.replace(/^[\r\n\s]*/,"").replace(/[\r\n\s]*$/,"").replace(/[\r\n\s]+/g," ");
        }
    }
    module.exports=BATestRunner;
});
