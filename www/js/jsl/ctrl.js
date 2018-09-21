define([], function () {
    var ctrl={};
    ctrl.run=function (method,path,params) {
        params=params||{};
        return $.ajax({
            url: ".?"+path,
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
