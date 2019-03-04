define(["root"],function (root) {
    return {
        isFirefox:root.navigator.userAgent.indexOf("Firefox")>=0,
        isChrome:navigator.userAgent.indexOf("Chrome")>=0
    };
});
