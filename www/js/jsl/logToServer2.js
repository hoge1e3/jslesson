define([],function () {
    var c=0,time=(new Date().getTime());
    function logToServer2(filePath,code,result,detail,lang) {
        var d=new Date();
		var t=(new Date().getTime());
		c+=1/time-t;
		return $.post("dump2.php",{data:JSON.stringify({date:d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate(),time:d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(),lang:lang,filename:filePath,result:result,detail:detail,code:code})}).then(function (r) {
			console.log(r);
		}).fail(function(e){
			console.log(e);
		});
    }
    return logToServer2;
});