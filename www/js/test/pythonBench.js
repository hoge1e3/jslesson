define(function (require,module,exports) {
    const BATestRunner=require("test/BATestRunner");
    const Util=require("Util");
    window.TESTING=true;
    class PythonBench extends BATestRunner {
        async run() {
            super.run();
            let prjName=sessionStorage.testprj;
            if (!prjName) {
                prjName=("test"+Math.random()).replace(/[^\w\d]/g,"").substring(0,10);
                sessionStorage.testprj=prjName;
            }
            await this.openProjectSel();
            await this.waitForText("新規プロジェクト");
            await this.prepareEmptyProject(prjName,"py");
            await this.waitBuidlerReady();
            while(true) {
                const r=Math.floor(Math.random()*5+3);
                const c=Math.floor(Math.random()*5+3);
                const sec=(Math.random()*10+5)*1000;
                const seci=Math.floor(sec/1000);
                await this.createAndTest({
                    fileName: "Test",
                    content: `
for i in range(${r}):
    for j in range(${c}):
        print (i*j, end=" ")
    print()
print("Waiting for ",${seci}," Sec.")
`,
                });
                console.log("Waiting for ",seci," sec.");
                await this.sleep(sec-1000);
                await this.clickByText("閉じる");
                await this.sleep(1000);
            }
        }
    }
    window.baTest=new PythonBench({defaultSleepTime:100});
    window.baTest.run().then(r=>console.log(r),e=>console.error(e));
});
