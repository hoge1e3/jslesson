define([],function () {
    Message={};
    Message.build=function () {
        var a=Array.prototype.slice.call(arguments);
        var format=a.shift();
        var P="vroijvowe0r324";
        format=format.replace(/\{([0-9])\}/g,P+"$1"+P);
        format=format.replace(new RegExp(P+"([0-9])"+P,"g"),function (_,n) {
            return a[parseInt(n)-1];
        });
        return format;
    };
    return Message;
});
