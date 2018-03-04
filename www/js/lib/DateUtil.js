define([],function (){
    //https://qiita.com/osakanafish/items/c64fe8a34e7221e811d0
    var format = function (date, format) {
        if (!(date instanceof Date)) date=new Date(date);
        if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
        format = format.replace(/YYYY/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        if (format.match(/S/g)) {
            var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
            var length = format.match(/S/g).length;
            for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
        }
        return format;
    };
    var toUnixTime = function (date) {
        if (!(date instanceof Date)) date=new Date(date);
        var t=date.getTime();
        return Math.floor(t/1000);
    };
    var fromUnixTime = function (ut) {
        return new Date((ut-0)*1000);
    };
    return {
        format:format,
        toUnixTime:toUnixTime,
        fromUnixTime:fromUnixTime
    };
});
