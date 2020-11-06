/* global $ */
define(["FS","md5","WebSite","DeferredUtil","root"], function (FS,md5,WebSite,DU,root) {
    root.Auth={
        check:function () {
            var self=this;
            //console.log("CHK");
            return $.get(WebSite.controller+"?Login/curStatus&"+Math.random()).then(function (r) {
                if (typeof r==="string") r=JSON.parse(r);
                console.log(r,r.class,r.user, r.teacher);
                self.login(r.class,r.user, r.teacher);
                return self;
            });

            /*return $.when(
                $.get(WebSite.controller+"?Login/curclass&"+Math.random()),
                $.get(WebSite.controller+"?Login/curuser&"+Math.random()),
                $.get(WebSite.controller+"?Login/curTeacher&"+Math.random())
            ).then(function (c,u,t) {
                //console.log("CHKE",c[0],u[0]);
                self.login(c[0],u[0],t[0]);
                return self;
            });*/
        },
        assertLogin: function (options) {
            var self=this;
            return DU.promise(function (succ/*,fail*/) {
                if (self.loggedIn()) {
                    onsucc();
                } else {
                    self.check().then(function () {
                        if (!self.loggedIn()) {
                            options.showLoginLink(WebSite.controller+"?Login/form");
                        } else {
                            onsucc();
                        }
                    });
                }
                function onsucc() {
                    var userInfo={class:self.class,user:self.user};
                    if (options.success) options.success(userInfo);
                    succ(userInfo);
                }
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
            var self=this;
            if (self.hashCache[projectName]) {
                return $.when(self.hashCache[projectName]);
            }
            return $.ajax(WebSite.controller+"?Login/getPublishedDir",{
                data: {
                    project: projectName
                }
            }).then(function (res) {
                self.hashCache[projectName]=res;
                return res;
            });
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
        },
        hashCache:{},
        getClassOptions: function () {
            return $.ajax(".?Class/getOptions");
        },
    };
    return root.Auth;
});
