define([],function () {
    var c=0,time=(new Date().getTime());
    function logToServer(content) {
		var t=(new Date().getTime());
		c+=1/time-t;
		return $.post("dump.php",{data:content+""}).then(function (r) {
			console.log(r);
		}).fail(function(e){
			console.log(e);
		});
    }
    return logToServer;
});
