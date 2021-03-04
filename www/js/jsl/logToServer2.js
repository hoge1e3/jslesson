define(function (require, exports, module) {
    const stringifyError=require("stringifyError");
    var c=0,time=(new Date().getTime());
    function logToServer2(filePath,codeL,codeH,result,detail,lang) {
        var d=new Date();
		var t=(new Date().getTime());
		c+=1/time-t;
		var code={};
		code[lang]=codeL;
		code.HTML=codeH;
        if (typeof detail==="object") {//} instanceof Error) {
            const eobj=stringifyError(detail);
            /*
            var eobj={stack:detail.stack,message:detail.message, strMesg:detail+""};
            for (var k in detail) {
                if (k==="errorParams") {
                    eobj[k]=detail[k]+"";
                } else {
                    eobj[k]=detail[k];
                }
            }*/
            detail=eobj;
        }
        var data={date:d.getFullYear()+"/"+dataPadding(d.getMonth()+1)+"/"+dataPadding(d.getDate()),time:dataPadding(d.getHours())+":"+dataPadding(d.getMinutes())+":"+dataPadding(d.getSeconds()),lang:lang,filename:filePath,result:result,detail:detail,code:code};
        console.log("logged to server DATA",data);
		return $.post(".?dump2",{data:JSON.stringify(data)}).then(function (r) {
			console.log(r);
		}).fail(function(e){
			console.log(e);
		});
    }
    function dataPadding(d){
        return ('0'+d).slice(-2);
    }
    return logToServer2;
});
