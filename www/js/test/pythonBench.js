define(function (require,module,exports) {
    const BATestRunner=require("test/BATestRunner");
    const Util=require("Util");
    window.TESTING=true;
    class PythonBench extends BATestRunner {
        async run() {
            let lastExecTime=0;
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
#「実行」→「サーバで実行」を選んでください
import numpy.random as rd # 乱数を発生させる関数の呼び出し
import matplotlib.pyplot as plt # グラフプロットの呼び出し
totalcount = 200 # ランダムに打つ点の総数
incount = 0 # 円に入った点の数
for i in range(totalcount):
  x = rd.random() #0-1 の範囲の値
  y = rd.random() #0-1 の範囲の値
  if x**2 + y**2 < 1.0: # 単位円の中に入ったら
    incount += 1 # 入ったカウンターに１を加える
    plt.scatter(x, y, c="red") # 赤色でプロット
  else:
    plt.scatter(x, y, c="blue") # 青色でプロット
print(" 円周率 :", incount * 4.0 / totalcount) # 求まった円周率
print(" lastExecTime= ${lastExecTime}")
plt.title("Monte Carlo method") # グラフのタイトル
plt.show()
`,
                });
                const d=performance.now();
                while(true) {
                    const c=this.getOutputBodyText();
                    if (c.match(/円周率/)) break;
                    console.log("cont",c);
                    await this.sleep(1000);
                }
                lastExecTime=performance.now()-d;
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
