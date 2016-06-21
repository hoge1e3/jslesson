var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
//    .forBrowser('firefox')
    .build();

driver.get('http://localhost/?noconcat=true');
driver.wait(until.titleIs('JS Lesson'), 10000);
driver.sleep(1000);
//driver.wait.until(webdriver.ExpectedConditions.alertIsPresent());
var alert = driver.switchTo().alert();
alert.accept();
driver.sleep(1000);
driver.executeScript(function () {
	location.href='login.php';
});
driver.sleep(1000);
driver.findElement(By.name('class')).sendKeys("0123");
driver.findElement(By.name('user')).sendKeys("test");
driver.executeScript("document.forms[0].submit();");//clickByText("OK");


// Project/File CRUD
// create Project
// - create File and run
// open existing Project
// - create File and run
// - open existing File and run
// - update File and run
// - rename File and run
// - delete File

driver.sleep(3000);

/*
//driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.id('newPrj')).click();
driver.sleep(1000);
driver.findElement(By.id('prjName')).sendKeys('Tesuto');
driver.sleep(1000);
//driver.findElement(By.linkText('OK')).click();//sendKeys('Tesuto');
clickByText("OK");
//driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.sleep(1000);
*/
selectLinkByText("Ctes/");
driver.sleep(1000);
clickByText("Test2");
driver.sleep(1000);
var num=Math.floor(Math.random()*999999); 
var cont=[
    "#include<stdio.h>",
    "int main(void){",
    "   int x="+num+";",
    '   printf("%d",x*2);',
    '}'
].join("\n");

inputToEditor(cont).then(function () {
	console.log("num=", num);
	clickByText("実行");
	driver.sleep(2000);
	return getConsoleOutput();
}).then(function (tx) {
	console.log("The output", tx);
	var res=parseInt(tx);
	console.log(res,num*2,res===num*2);
	if (res!==num*2) throw new Error("Asserion failed"+res+"!="+num*2);
	clickByText("OK");
    driver.quit();
});
function clickByText(t) {
    var scr="$(\":contains('"+t+"')\").click();";
    //console.log("EXEC ",scr);
	driver.executeScript(scr);
}
function selectLinkByText(t) {
    var scr="location.href=$(\"a:contains('"+t+"')\").attr('href');";
	driver.executeScript(scr);
}
function getConsoleOutput() {
    return driver.executeScript(function () {
    	return $("#ifrmDlg")[0].contentWindow.
    	document.getElementById("console").innerText;
    });
}
function inputToEditor(cont) {
    return driver.executeScript(function (cont) {
        var e=getCurrentEditorInfo().editor;
        e.setValue(cont);
    },cont);
}