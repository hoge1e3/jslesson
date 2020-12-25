define(["root","ctrl"],function (root,ctrl) {
    var RemoteProject={};
    RemoteProject.url=function (cmd) {
        return "runDtl.php?"+Math.random();
    };
	RemoteProject.list=function () {
        return ctrl.get("Project/list",{id:Math.random()});
	    //return $.get(this.url(),{file:"/scripts/ListProjects.dtlvm"});
	};
	RemoteProject.delete=function (n) {
        return ctrl.get("Project/delete",{id:Math.random(), project:n+"/"});
	    //return $.get(this.url(),{file:"/scripts/DeleteProject.dtlvm",project:n+"/"});
	};
	RemoteProject.rename=function (from,to) {
        return ctrl.get("Project/rename",{id:Math.random(), from:from+"/", to:to+"/"});
	    /*return $.get(this.url(),{
	        file:"/scripts/RenameProject.dtlvm",
	        from:from+"/",to:to+"/"
	    });*/
	};
    root.RemoteProject=RemoteProject;
	return RemoteProject;
});
