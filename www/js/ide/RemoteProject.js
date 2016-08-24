define([],function () {
    RemoteProject={};
	RemoteProject.list=function () {
	    return $.get("runDtl.php",{file:"/scripts/ListProjects.dtlvm"});
	};
	RemoteProject.delete=function (n) {
	    return $.get("runDtl.php",{file:"/scripts/DeleteProject.dtlvm",project:n});
	};
	RemoteProject.rename=function (from,to) {
	    return $.get("runDtl.php",{
	        file:"/scripts/RenameProject.dtlvm",
	        from:from,to:to
	    });
	};
	return RemoteProject;
});