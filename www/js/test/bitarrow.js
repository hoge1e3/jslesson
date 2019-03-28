define(function (require,module,exports) {
const SLP=500;
window.TESTING=true;
class BATest{
    async run() {

        //var testHome=FS.get("../www/fs/home/0123/test/");

        //var projectSelURL='http://klab.eplang.jp/jslesson/';
        //var projectSelURL='http://localhost/?noconcat=true';
        this.projectSelURL='http://localhost/';
        const ifrmjq=$("<iframe>").attr({
            /*src:this.projectSelURL,*/width:600,height:600
        }).appendTo("body");
        window.SplashScreen.hide();
        this.iframe=ifrmjq[0];
        this.loginURL='http://localhost/?Login/';
        //var projectSelURL='http://klab.eplang.jp/jslesson/'
        this.loggedin=false;



        // For C/JS/Dtl
        // rmdir 'Ctes'
        // cp 'Ctmpl' 'Ctes'
        /*
        rmDir(testHome.rel("Ctes/"));
        copyDir(testHome.rel("Ctmpl/"), testHome.rel("Ctes/") );
        rmDir(testHome.rel("TJStes/"));
        copyDir(testHome.rel("TJSTmpl/"), testHome.rel("TJStes/") );
        rmDir(testHome.rel("DtlTes/"));
        copyDir(testHome.rel("DtlTmpl/"), testHome.rel("DtlTes/") );*/
        this.createdCCode="";

        await this.sleep(1000);
        await this.openProjectSel();
        await this.testC();
        await this.openProjectSel();
        await this.testJS();
        await this.openProjectSel();
        await this.testDtl();
        // CHECK new user
        // CHECK copySample
        // CHECK erase new user
    }
    contentWindow() {
        return this.iframe.contentWindow;
    }
    async testC() {
        const c=this.createdCCode=this.genTestCode();
        await this.sleep(1000);
        this.selectLinkByText("Ctes");
        await this.sleep(1000);
        await this.createFile("Test1");
        await this.inputAndRunCode(c);
    // - open existing File 'Test2' and run
    //clickByText("Test2");
    //await this.sleep(SLP);
    // - update File 'Test2' and run
    // - rename File 'Test2' to Test4' and run
    // - delete File 'Test3'
    //    check folder status

    // create Project 'Cnew'
    // - create File 'A' and run
    // - update File 'A' and run
    // - rename File 'A' to 'B' and run
    //     check folder status
    // - delete File 'B'
    // - create File 'C' and run
    //     check folder status
    // open existing Project 'Ctes'

    }
    async testJS() {
        await this.sleep(3000);
        await this.selectLinkByText("TJStes");
        await this.sleep(2000);
        await this.clickByText("Test1");
        await this.sleep(SLP);
        await this.runTJSCode('<span name="val">55</span>');
    }
    async testDtl() {
        await this.sleep(3000);
        this.selectLinkByText("DtlTes");
        await this.sleep(2000);
        this.clickByText("Test");
        await this.sleep(SLP);
        await this.runDtlCode();
    }
    async rmDir(d) {
        if (!d.exists()) return;
        d.recursive(function (f) {
            console.log("RM", f.path());
            f.rm();
        });
    }
    async copyDir(src,dst) {
        src.recursive(function (f) {
            var dstf=dst.rel(f.relPath(src));
            dstf.text(f.text());
        });
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
        await this.sleep(1000);
        d.querySelector("[name='class']").value=("0123");
        await this.sleep(500);
        d.querySelector("[name='user']").value=("test");
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
    async createProject(name, lang) {
        const w=this.contentWindow();
        const $=w.$;
        $('#newPrj').click();
        await this.sleep();
        $('#prjName').val(name);
        await this.sleep();
        this.clickByText("OK");
        await this.sleep();
    }
    async createFile(name) {
        this.clickByQuery(".navbar-toggle");
        await this.sleep();
        this.selectLinkByText("ファイル");
        await this.sleep();
        this.selectLinkByText("新規");
        await this.sleep();
        this.clickByQuery(".navbar-toggle");
        const w=this.contentWindow();
        const $=w.$;
        $("#inputDialog").val(name);
        await this.sleep();
        this.clickByText("OK");
    }
    async genTestCode() {
        var num=Math.floor(Math.random()*99999);
        var cont=[
        "#include<stdio.h>",
        "int main(void){",
        "    int x="+num+";",
        '    printf("%d",x*2);',
        '}'
        ].join("\n");
        return {cont:cont, expect:""+num*2};
    }
    async inputAndRunCode(c) {
        console.log("Iarc",c);
        await this.inputToEditor(c.cont);
        await this.runCode(c.expect);
    }
    async runCode(expect) {
    	this.clickByID("runMenu");
        await this.sleep();
        const tx=this.getConsoleOutput();
    	console.log("The output", tx);
    	console.log(tx,expect);
    	if (tx!==expect) throw new Error("Asserion failed"+tx+"!="+expect);
        this.clickByText("OK");
    }
    trimspace(s) {
        return s.replace(/^[\r\n\s]*/,"").replace(/[\r\n\s]*$/,"").replace(/[\r\n\s]+/g," ");
    }
    async runTJSCode(expect) {
    	this.clickByID("runMenu");
    	expect=this.trimspace(expect);
    	await this.sleep(2000);
    	const tx=this.trimspace(this.getOutputBodyHTML());
    	console.log("The output", tx);
    	//console.log(tx,expect);
    	if (tx.indexOf(expect)<0) throw new Error("Asserion failed: the output does not contain"+expect);
    	this.clickByText("OK");
    }
    async runDtlCode() {
    	this.clickByID("runMenu");
    	await this.sleep(2000);
        const tx=this.getOutputBodyHTML();
        var cnt=0;
	    tx.replace(/<line[^>]*>/g,function (e) {
            console.log(e);
            switch(cnt) {
                case 0:
                    if (e.indexOf("100")<0) throw new Error("Line #0 not found: ");
                    break;
                case 1:
                    if (e.indexOf("50")<0 || e.indexOf("86")<0) throw new Error("Line #1 not found :");
                    break;
                case 2:
                    if (e.indexOf("50")<0 || e.indexOf("-86")<0) throw new Error("Line #2 not found :");
                    break;
                default:
                    throw new Error("Too many lines");
            }
            cnt++;
    	});
    	if (cnt<3) throw new Error("Too few lines: "+cnt);
    }
    getConsoleOutput() {
        return this.$("#ifrmDlg")[0].contentWindow.
        	document.getElementById("console").innerText;
    }
    getOutputBodyHTML() {
        return this.$("#ifrmDlg")[0].contentWindow.
        	document.body.innerHTML;
    }
    inputToEditor(cont) {
        var e=this.contentWindow().getCurrentEditorInfo().editor;
        e.setValue(cont);
    }
    clickByQuery(q) {
        const e=this.$(q).get(0);
        if (!e) throw new Error(`clickByQuery ${q} fail `);
        e.click();
    }
    clickByText(t) {
        let sel,len;
        this.$(`:contains('${t}')`).each(function () {
            const e=$(this);
            if (!sel || e.text().length<len) {
                len=e.text().length;
                sel=this;
            }
        });
        //const e=this.$(`:contains('${t}')`).get(0);
        if (!sel) throw new Error(`clickByText ${t} fail `);
        console.log("Clicked",sel);
        sel.click();
    }
    //runMenu
    clickByID(id) {
        const e=this.$(`#${id}`).get(0);
        if (!e) throw new Error(`clickByID ${id} fail `);
        e.click();
    }
    selectLinkByText(t) {
        const e=this.$(`a:contains('${t}')`).get(0);
        if (!e) throw new Error(`selectLinkByText ${t} fail `);
        e.click();
    //    innerWindow.location.href=$(`a:contains('${t}')`).attr('href');
    	//driver.executeScript(scr);
    }
    sleep(t) {
        return new Promise(s=>setTimeout(s,t||SLP));
    }
}
window.baTest=new BATest();
window.baTest.run().then(r=>console.log(r),e=>console.error(e));
});
