define(["FS"], function (FS) {
    Auth={
        check:function () {
            var self=this;
            //console.log("CHK");
            return $.when(
                $.get("login.php?curclass="+Math.random()),
                $.get("login.php?curuser="+Math.random())
            ).then(function (c,u) {
                //console.log("CHKE",c[0],u[0]);
                self.login(c[0],u[0]);
                return self;
            });
        },
        loggedIn:function () {
            return (typeof this.class)==="string" && this.class.length>0 &&
                   (typeof this.user) ==="string" && this.user.length>0;
        },
        login:function (_class,user) {
            this.class=_class;
            this.user=user;
        },
        localProjects:function ( ){
            return FS.resolve("${tonyuHome}/Projects/");//changeHOME
        },
        remoteProjects: function () {
            //return FS.get("/home/").rel(this.class+"/").rel(this.user+"/") //changeHOME (1)
            return FS.get("/");//changeHOME
        },
        remotePublics: function () {
            //return this.remoteProjects().rel("public/") //changeHOME (1)
            return FS.get("/public/");//changeHOME
        }
    };
    return Auth;
});