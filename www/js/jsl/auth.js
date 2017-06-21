define(["FS","md5"], function (FS,md5) {
    Auth={
        check:function () {
            var self=this;
            //console.log("CHK");
            return $.when(
                $.get(".?Login/curclass&"+Math.random()),
                $.get(".?Login/curuser&"+Math.random()),
                $.get(".?Login/curTeacher&"+Math.random())
            ).then(function (c,u,t) {
                //console.log("CHKE",c[0],u[0]);
                self.login(c[0],u[0],t[0]);
                return self;
            });
        },
        loggedIn:function () {
            return (typeof this.class)==="string" && this.class.length>0 &&
                   (typeof this.user) ==="string" && this.user.length>0;
        },
        login:function (_class,user,teacher) {
            this.class=_class;
            this.user=user;
            this.teacher=teacher;
            console.log("teacher",teacher);
        },
        localProjects:function ( ){
            return FS.get("/home/").rel(this.class+"/").rel(this.user+"/"); //changeHOME(1)
            //return FS.resolve("${tonyuHome}/Projects/");//changeHOME
        },
        remoteProjects: function () {
            return FS.get("/home/").rel(this.class+"/").rel(this.user+"/"); //changeHOME(1)
            //return FS.get("/");//changeHOME
        },
        genHash:function (projectName) {
            return md5(this.class+"/"+this.user+"/"+projectName).substring(0,8)+"/";
        },
        getHash: function (projectName) {
            return $.ajax("a.php?Login/getPublishedDir",{
                data: {
                    project: projectName
                }
            })
        },
        publishedDir: function (projectName) {
            return this.getHash(projectName).then(function (name){
                return FS.get("/pub/"+name);
            });
        },
        publishedURL: function (projectName) {
            return this.getHash(projectName).then(function (name) {
                return WebSite.published+name;
            });
        },
        remotePublics: function () {
            return this.remoteProjects().rel("public/"); //changeHOME(1)
            //return FS.get("/public/");//changeHOME
        }
    };
    return Auth;
});
