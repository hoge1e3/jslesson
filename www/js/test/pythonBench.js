define(function (require,module,exports) {
    const TestRunner=require("test/TestRunner");
    window.TESTING=true;
    class PythonBench extends TestRunner {
        async run() {
            super.run();
            await this.openProjectSel();
            await this.sleep(1000);
            await this.prepareEmptyProject("pyBench","py");
            await this.sleep(3000);
            await this.createAndTest({
                fileName: "Test",
                content: `
for i in range(10):
    for j in range(10):
        print (i*j, end=" ")
    print()
`,

            });
        }
    }
    window.baTest=new PythonBench();
    window.baTest.run().then(r=>console.log(r),e=>console.error(e));
});
