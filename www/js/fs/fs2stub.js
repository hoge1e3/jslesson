define(["FSLib","WebSite"],
        function (FS,WebSite) {
    FS.setEnv(WebSite);
    return FS;
});