define([],function () {
    RemoteProject={};
    RemoteProject.url=function () {
        return "runDtl.php?"+Math.random();
    };
	RemoteProject.list=function () {
	    return $.get(this.url(),{file:"/scripts/ListProjects.dtlvm"});
	};
	RemoteProject.delete=function (n) {
	    return $.get(this.url(),{file:"/scripts/DeleteProject.dtlvm",project:n+"/"});
	};
	RemoteProject.rename=function (from,to) {
	    return $.get(this.url(),{
	        file:"/scripts/RenameProject.dtlvm",
	        from:from+"/",to:to+"/"
	    });
	};
	return RemoteProject;
});
