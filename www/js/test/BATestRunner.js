define(function (require,exports,module) {
    const WebSite=require("WebSite");
    const TestRunner=require("test/TestRunner");
    module.exports=class extends TestRunner {
        constructor(options) {
            super(options);
            options=this.options;
            options.className=options.className||"0123";
            options.userName=options.userName||"test";
        }
        async run() {
            super.run();
            this.projectSelURL=WebSite.serverTop;//'http://localhost/';
            this.loginURL=WebSite.serverTop+'?Login/';
            //var projectSelURL='http://klab.eplang.jp/jslesson/'
            this.loggedin=false;
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
                await this.waitForText("他ユーザでログイン");
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
        async waitBuidlerReady() {
            await this.waitAppear(()=>this.contentWindow().curPrj);
        }
        async createFile(name) {
            await this.waitForText("ファイル");
            if (this.fileExistsInList(name)) return;
            await this.toggleMenu();
            //await this.sleep();
            await this.selectLinkByText("ファイル");
            await this.sleep();
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
            await this.inputToEditor(c.content);
            await this.sleep();
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
        async selectLangTab(name) {
            const e=await this.retryGet(
                ()=>this.$(`.selTab:contains('${name}')`).get(0),
                `selectLangTab ${name} fail`);
            e.click();
        }
        fileExistsInList(name) {
            return this.$(`.fileItem:contains('${name}')`).get(0);
        }
    };
});
