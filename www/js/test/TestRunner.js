define(function (require,exports,module) {
    const WebSite=require("WebSite");
    module.exports=class {
        constructor(options) {
            options=options||{};
            this.options=options;
            options.defaultSleepTime=options.defaultSleepTime||1000;
            options.className=options.className||"0123";
            options.userName=options.userName||"test";
        }
        async run() {
            this.projectSelURL=WebSite.serverTop;//'http://localhost/';
            const width=$(window).width()-50;
            const height=$(window).height()-100;
            const ifrmjq=$("<iframe>").attr({
                /*src:this.projectSelURL,*/width,height
            }).appendTo("body");
            window.SplashScreen.hide();
            this.iframe=ifrmjq[0];
            this.loginURL=WebSite.serverTop+'?Login/';
            //var projectSelURL='http://klab.eplang.jp/jslesson/'
            this.loggedin=false;
        }
        contentWindow() {
            return this.iframe.contentWindow;
        }
        async openProjectSel() {
            await this.open(this.projectSelURL);
            await this.sleep(1000);
            //if (this.loggedin) return;
            //driver.wait.until(webdriver.ExpectedConditions.alertIsPresent());
            //await this.open(this.loginURL);
            const w=this.contentWindow();
            const d=w.document;
            if (d.querySelector("#userInfo")) {
                return;
            }
            const options=this.options;
            await this.sleep(1000);
            d.querySelector("[name='class']").value=(options.className);
            await this.sleep(500);
            d.querySelector("[name='user']").value=(options.userName);
            await this.sleep(500);
            d.forms[0].submit();//");//clickByText("OK");
            await this.sleep(300);
            this.loggedin=true;
        }
        open(url) {
            this.contentWindow().location.href=url;
        }
        $(...args) {
            const w=this.contentWindow();
            const $=w.$;
            return $(...args);
        }
        async prepareEmptyProject(name, lang) {
            await this.deleteProjectIfExists(name);
            await this.sleep(1000);
            await this.createProject(name,lang);
            await this.sleep(1000);
        }
        async deleteProjectIfExists(name) {
            const prjItem=this.findByText(name).closest(".project");
            if (!prjItem.length) {
                console.log("Project ",name," did not exist.");
                return;
            }
            prjItem.find(".cmd_del")[0].click();
            await this.sleep();
        }
        async createProject(name, lang) {
            const w=this.contentWindow();
            const $=w.$;
            $('#newPrj').click();
            await this.sleep();
            $('#prjName').val(name);
            await this.sleep();
            $('#prjLang').val(lang);
            await this.sleep();
            await this.clickByText("OK");
            await this.sleep();
        }
        async toggleMenu() {
            const q=".navbar-toggle";
            if (!$(q)[0]) return;
            await this.clickByQuery(q);
            await this.sleep();
        }
        async createFile(name) {
            await this.toggleMenu();
            //await this.sleep();
            await this.selectLinkByText("ファイル");
            //await this.sleep();
            await this.selectLinkByText("新規");
            await this.sleep();
            await this.toggleMenu();
            const w=this.contentWindow();
            const $=w.$;
            $("#inputDialog").val(name);
            await this.sleep();
            await this.clickByText("OK");
        }
        async createAndTest(c) {
            // c:{fileName, content, expect};
            await this.createFile(c.fileName);
            await this.inputAndRunCode(c);
        }
        async inputAndRunCode(c) {
            console.log("Iarc",c);
            await this.inputToEditor(c.content);
            await this.runCode(c);
        }
        getCurrentEditor() {
            return this.contentWindow().getCurrentEditorInfo().editor;
        }
        async inputToEditor(cont) {
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
        async runCode(testCase) {
        	await this.toggleMenu();
            if (this.$("#runMenu").length) {
                await this.clickByID("runMenu");
            } else if (this.$("#runPython").length) {
                await this.clickByID("runPython");
                await this.sleep();
                await this.clickByID("runServer");
            }
            await this.toggleMenu();
            await this.sleep(testCase.sleepTime||3000);
            const tx=this.getOutputBodyText();
        	console.log("The output", tx);
        	const expect=testCase.expect;
            console.log(tx,expect);
            if (typeof expect==="string") {
                if (tx!==expect) throw new Error("Asserion failed"+tx+"!="+expect);
            } else if (typeof expect==="function") {
                await expect(this.getOutputWindow());
            }
            await this.clickByText("OK");
        }
        trimspace(s) {
            return s.replace(/^[\r\n\s]*/,"").replace(/[\r\n\s]*$/,"").replace(/[\r\n\s]+/g," ");
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
        async clickByQuery(q) {
            const e=await this.retryGet(
                ()=>this.$(q).get(0),
                `clickByQuery ${q} fail `);
            e.click();
        }
        async waitAppear(f) {
            while(true) {
                const e=f();
                if (e) break;
                this.sleep();
            }
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
        async clickByText(t,filter="") {
            const sel=await this.retry(()=>{
                const sel=this.findByText(t,filter);
                if (!sel.length) throw new Error(`clickByText ${t} fail `);
                return sel;
            });
            console.log("Clicked",sel);
            sel.click();
        }
        //runMenu
        async clickByID(id) {
            const e=await this.retryGet(
                ()=>this.$(`#${id}`).get(0),
                `clickByID ${id} fail `);
            e.click();
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
        async selectLangTab(name) {
            const e=await this.retryGet(
                ()=>this.$(`.selTab:contains('${name}')`).get(0),
                `selectLangTab ${name} fail`);
            e.click();
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
            for (let i=0;i<10;i++) {
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
