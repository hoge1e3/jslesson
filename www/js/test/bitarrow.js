// http://localhost/?r=test/bitarrow
// class: 0123  user: test
define(function (require,module,exports) {
const WebSite=require("WebSite");
const BATestRunner=require("test/BATestRunner");
const SLP=1000;
window.TESTING=true;
class BATest extends BATestRunner {
    constructor() {
        super({defaultSleepTime:SLP, className:"0123",userName:"test"});
    }
    async run() {
        super.run();
        this.createdCCode="";

        await this.sleep(1000);
        /*await this.testC(await this.openProjectSel());
        await this.testJS(await this.openProjectSel());
        await this.testDtl(await this.openProjectSel());
        */
        //await this.testCompileError_C(await this.openProjectSel());
        await this.testRuntimeError_TJS(await this.openProjectSel());
        await this.openProjectSel();
        console.log("SUCCESS");
    }
    async testCompileError_C(pc) {
        const ic=await pc.prepareEmpty("Ctes","c");
        const ec=await ic.openFile("Era");
        await ec.input(`
int main(){
    x=3;
}`);
        let theError;
        try {
            const r=await ec.run();
        } catch (e) {
            theError=e;
            console.log("Error ocurred successfully",e, e.info);

        }
        if (!theError) {
            console.log("Kowaretenaikara kowareta");
        }
    }
    async testRuntimeError_TJS(pc) {
        const ic=await pc.prepareEmpty("TJStes","js");
        const ec=await ic.openFile("Era");
        await ec.input({
            HTML: "<span id='test'></span>",
            JavaScript:"a.b.c;"
        });
        let theError;
        const h=ic.on("error",info=> {
            theError=info;
            console.log("Error ocurred successfully",info);
        });
        const r=await ec.run();
        await this.waitTrue(()=>theError);
        h.remove();
    }

    async testC(pc) {
        await pc.sleep(1000);
        const ic=await pc.prepareEmpty("Ctes","c");
        const c=this.genCTestCase();
        const tc=ic.testcase(c);
        await tc.run();
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
    async testJS(pc) {
        await this.sleep(3000);
        const ec=await pc.prepareEmpty("TJStes","js");
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
        const t=await ec.testcase(testCase);
        await t.run();
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
    async testDtl(pc) {
        const ic=await pc.open("DtlTes");
        const ec=await ic.openFile("Test");
        await this.runDtlCode(ec);
    }
    async runDtlCode(ec) {
        const rc=await ec.run();
        await this.retry(()=>{
            const tx=rc.getOutputBodyHTML();
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
        },"Dtl test fail");
    }
}
window.baTest=new BATest();
window.baTest.run().then(r=>console.log(r),e=>console.error(e));
});
