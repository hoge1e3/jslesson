define([],function () {
    function logToServer(content) {
		return $.post("dump.php",{data:content+""}).then(function (r) {
			console.log(r);
		}).fail(function(e){
			console.log(e);
		});
    }
    return logToServer;
});