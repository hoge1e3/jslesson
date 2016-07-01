var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var FS = require("./SFile.js");
var testHome=FS.get("../www/fs/home/0123/test/");
var projectSelURL='http://localhost/?noconcat=true';
var loggedin=false;
//'http://localhost/'
//'http://klab.eplang.jp/jslesson/'
var SLP=500;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
//    .forBrowser('firefox')
    .build();



// For C/JS/Dtl
// rmdir 'Ctes'
// cp 'Ctmpl' 'Ctes'
rmDir(testHome.rel("Ctes/"));
copyDir(testHome.rel("Ctmpl/"), testHome.rel("Ctes/") );
rmDir(testHome.rel("TJStes/"));
copyDir(testHome.rel("TJSTmpl/"), testHome.rel("TJStes/") );

openProjectSel().then(testC).
then(openProjectSel).then(testJS).
then(function () {
    driver.quit();
});

function testC() {
    var c=genTestCode();
    return driver.sleep(3000).then(function () {
        selectLinkByText("Ctes/");
        driver.sleep(1000);
        // - create File 'Test1' and run
        return createFile("Test1");
    }).then(function () {
        return inputAndRunCode(c);  
    });
// - open existing File 'Test2' and run
//clickByText("Test2");
//driver.sleep(SLP);
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
function testJS() {
    return driver.sleep(3000).then(function () {
        selectLinkByText("TJStes/");
        driver.sleep(1000);
        clickByText("Test1");
        driver.sleep(SLP);
        return runTJSCode('<span name="val">55</span>');
    });
}
function rmDir(d) {
    if (!d.exists()) return;
    d.recursive(function (f) {
        console.log("RM", f.path());
        f.rm();
    });
}
function copyDir(src,dst) {
    src.recursive(function (f) {
        var dstf=dst.rel(f.relPath(src));
        dstf.text(f.text());
    });
}
function openProjectSel() {
    driver.get(projectSelURL);
    
    driver.wait(until.titleIs('JS Lesson'), 10000);
    if (loggedin) return;
    driver.sleep(1000);
    //driver.wait.until(webdriver.ExpectedConditions.alertIsPresent());
    var alert = driver.switchTo().alert();
    alert.accept();
    driver.sleep(SLP);
    driver.executeScript(function () {
    	location.href='login.php';
    });
    driver.sleep(SLP);
    driver.findElement(By.name('class')).sendKeys("0123");
    driver.findElement(By.name('user')).sendKeys("test");
    driver.executeScript("document.forms[0].submit();");//clickByText("OK");
    loggedin=true;
    return driver.sleep(10);
}
function createProject(name) {
    driver.findElement(By.id('newPrj')).click();
    driver.sleep(SLP);
    driver.findElement(By.id('prjName')).sendKeys(name);
    driver.sleep(SLP);
    //driver.findElement(By.linkText('OK')).click();//sendKeys('Tesuto');
    clickByText("OK");
    //driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    driver.sleep(SLP);
}
function createFile(name) {
    clickByText("ファイル");
    driver.sleep(SLP);
    clickByText("新規");
    driver.findElement(By.id("inputDialog")).sendKeys(name);
    driver.sleep(SLP);
    clickByText("OK");
}
function genTestCode() {
    var num=Math.floor(Math.random()*99999);
    var cont=[
    "#include<stdio.h>",
    "int main(void){",
    "   int x="+num+";",
    '   printf("%d",x*2);',
    '}'
    ].join("\n");
    return {cont:cont, expect:""+num*2};
}
function inputAndRunCode(c) {
    return inputToEditor(c.cont).then(function () {
        return runCode(c.expect);
    });
}
function runCode(expect) {
	clickByText("実行");
	driver.sleep(2000);
	return getConsoleOutput().then(function (tx) {
    	console.log("The output", tx);
    	console.log(tx,expect);
    	if (tx!==expect) throw new Error("Asserion failed"+tx+"!="+expect);
    	clickByText("OK");
    });
}
function trimspace(s) {
    return s.replace(/^[\r\n\s]*/,"").replace(/[\r\n\s]*$/,"").replace(/[\r\n\s]+/g," ");
}
function runTJSCode(expect) {
	clickByText("実行");
	expect=trimspace(expect);
	driver.sleep(2000);
	return getOutputBodyHTML().then(function (tx) {
	    tx=trimspace(tx);
    	console.log("The output", tx);
    	console.log(tx,expect);
    	if (tx!==expect) throw new Error("Asserion failed"+tx+"!="+expect);
    	clickByText("OK");
    });
}
function getConsoleOutput() {
    return driver.executeScript(function () {
    	return $("#ifrmDlg")[0].contentWindow.
    	document.getElementById("console").innerText;
    });
}
function getOutputBodyHTML() {
    return driver.executeScript(function () {
        return $("#ifrmDlg")[0].contentWindow.
    	document.body.innerHTML;
    });
}
function inputToEditor(cont) {
    return driver.executeScript(function (cont) {
        var e=getCurrentEditorInfo().editor;
        e.setValue(cont);
    },cont);
}
function clickByText(t) {
    var scr="$(\":contains('"+t+"')\").click();";
    //console.log("EXEC ",scr);
	driver.executeScript(scr);
}
function selectLinkByText(t) {
    var scr="location.href=$(\"a:contains('"+t+"')\").attr('href');";
	driver.executeScript(scr);
}