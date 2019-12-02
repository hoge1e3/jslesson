// http://localhost/?r=test/bitarrow
// class: 0123  user: test
define(function (require,module,exports) {
const TestRunner=require("test/TestRunner");
const SLP=1000;
window.TESTING=true;
class BATest extends TestRunner {
    constructor() {
        super({defaultSleepTime:SLP, className:"0123",userName:"test"});
    }
    async run() {
        super.run();
        this.createdCCode="";

        await this.sleep(1000);
        await this.openProjectSel();
        await this.testC();
        await this.openProjectSel();
        await this.testJS();
        await this.openProjectSel();
        await this.testDtl();
    }
    async testC() {
        await this.sleep(1000);
        await this.prepareEmptyProject("Ctes","c");
        const c=this.genCTestCase();
        await this.createAndTest(c);
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
    genCTestCase() {
        var num=Math.floor(Math.random()*99999);
        var content=[
        "#include<stdio.h>",
        "int main(void){",
        "    int x="+num+";",
        '    printf("%d",x*2);',
        '}'
        ].join("\n");
        return {fileName:"C_Tes2",content, expect:""+num*2};
    }
    async testJS() {
        await this.sleep(3000);
        await this.prepareEmptyProject("TJStes","js");
        await this.sleep(2000);
        const testCase={
            fileName: "Test",
            content:{
                HTML: "<span id='test'></span>",
                JavaScript:`
sum=0;
for(i=1;i<=10;i++) {
    sum+=i;
    wait(10);
    setText('test',sum);
}`
            },
            expect: "55",
            sleepTime: 5000
        };
        await this.createAndTest(testCase);
        //await this.runTJSCode('<span name="val">55</span>');
    }
    async runTJSCode(expect) {
    	await this.clickByID("runMenu");
    	expect=this.trimspace(expect);
    	await this.sleep(2000);
    	const tx=this.trimspace(this.getOutputBodyHTML());
    	console.log("The output", tx);
    	//console.log(tx,expect);
    	if (tx.indexOf(expect)<0) throw new Error("Asserion failed: the output does not contain"+expect);
    	await this.clickByText("OK");
    }
    async testDtl() {
        await this.sleep(3000);
        await this.selectLinkByText("DtlTes");
        await this.sleep(2000);
        await this.clickByText("Test");
        await this.sleep(SLP);
        await this.runDtlCode();
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
}
window.baTest=new BATest();
window.baTest.run().then(r=>console.log(r),e=>console.error(e));
});
