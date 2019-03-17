define(["root"],function (root) {
    var ua = root.navigator.userAgent.toLowerCase();
    return {
        isIE: (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0),
        isFirefox:root.navigator.userAgent.indexOf("Firefox")>=0,
        isChrome:navigator.userAgent.indexOf("Chrome")>=0
    };
});
