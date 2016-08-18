define([],function () {
	var ListProjects=function () {
	    return $.get("runDtl.php",{file:"/scripts/ListProjects.dtlvm"});
	};
	return ListProjects;
});