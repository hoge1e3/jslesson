define(["Shell", "FS","DeferredUtil","UI","source-map","LocalBrowserInfoClass","WebSite"],
function (sh,FS,DU,UI,S,LocalBrowserInfoClass,WebSite) {
    var LocalBrowserWindow=function (options) {
        this.targetAttr=options||{};
        this.window=options.window||window.open("about:blank","LocalBrowserWindow","menubar=no,toolbar=no,width=500,height=500");
    };
    var BLANK_URL=WebSite.runtime+"blank.html";
    var p=LocalBrowserWindow.prototype;
    p.close=function () {
        this.window.close();
    };
    p.resize=function (w,h) {
        //TODO
    };
    p.focus=function () {
        if (this.window) {
            //this.window.focus();
            this.window=window.open(BLANK_URL,"LocalBrowserWindow","menubar=no,toolbar=no,width=500,height=500");
        }
    };
    p.isActive=function () {
        return (this.window && !this.window.closed);
    };
    var urlparam=/\?.*$/;
    p.open=function (f,options) {
        options=options||{};
        var iwin=this.window;
        var idoc;
        var onload=options.onload || function () {};
        var onerror=options.onerror || (window.onerror ? function () {
//            return window.onerror.apply(window,[0,0,0,0,e]);
            return window.onerror.apply(window,arguments);
        }: function () {});
        delete options.onload;
        var base=f.up();
        var thiz=this;
        var loaded;
        window.lastLBW=this;
        window.LBW_onload=(function () {
            console.log("Loading...");
            if (loaded) return;
            loaded=true;
            iwin.LocalBrowserInfo=new LocalBrowserInfoClass(thiz,iwin,f,options);
            iwin.LocalBrowserInfo.wrapErrorHandler(onerror);
            return iwin.LocalBrowserInfo.loadNode(f).then(function () {
                onload.apply(iwin,[]);
            }).fail(function (e) {
                onerror.apply(iwin,[0,0,0,0,e]);
            });
        });
        iwin.location.href=BLANK_URL;
        return this.window;
    };
    function isFirefox() {
        return navigator.userAgent.indexOf("Firefox")>=0;
    }
    function iframeSrcURL(){
        var src="<!DOCTYPE HTML><html><head></head><body></body></html>";
        var blob = new Blob([src], {type: "text/html"});
        var url = URL.createObjectURL(blob);
        return url;
    }
    if (typeof sh=="object") sh.browserw=function (f,options) {
        f=this.resolve(f,true);
        var d=new $.Deferred;
        this.echo(place);
        var w=new LocalBrowserWindow(options);
        w.open(f,{onload:function () {
            d.resolve();
        },onerror:function (e) {
            d.reject(e);
        }});
        return d.promise();
    };
    return LocalBrowserWindow;
});
