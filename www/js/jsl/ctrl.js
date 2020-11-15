define([], function () {
    var ctrl={};
    ctrl.url=function (path,params) {
        let res=".?"+path;
        if (params) {
            res+=Object.keys(params).map (k=>`&${k}=${params[k]}`).join("");
        }
        return res;
    };
    ctrl.run=function (method,path,params) {
        params=params||{};
        return $.ajax({
            url: ctrl.url(path),
            data:params,
            cache: false,
            type:method
        });
    };
    ctrl.get=function (path,params) {
        return ctrl.run("get",path,params);
    };
    ctrl.post=function (path,params) {
        return ctrl.run("post",path,params);
    };
    return ctrl;
});
