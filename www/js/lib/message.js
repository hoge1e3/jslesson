define(["root"],function (root) {
    var Message={};
    Message.build=function () {
        var a=Array.prototype.slice.call(arguments);
        var format=a.shift();
        if (a.length===1 && a[0] instanceof Array) a=a[0];
        var P="vroijvowe0r324";
        format=format.replace(/\{([0-9])\}/g,P+"$1"+P);
        format=format.replace(new RegExp(P+"([0-9])"+P,"g"),function (_,n) {
            return a[parseInt(n)-1]+"";
        });
        return format;
    };
    root.Message=Message;
    return Message;
});
