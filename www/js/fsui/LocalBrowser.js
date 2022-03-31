define(["Shell", "FS","DeferredUtil","UI","source-map","LocalBrowserInfoClass"],
function (sh,FS,DU,UI,S,LocalBrowserInfoClass) {
    var LocalBrowser={};
    //var F=DU.tr;
    LocalBrowser=function (dom,options) {
        this.targetAttr=options||{};
        this.targetArea=dom;//=UI("iframe");
    };
    var p=LocalBrowser.prototype;
    p.close=function () {
        $(this.targetArea).empty();
    };
    p.resize=function (w,h) {
        if (this.iframe) {
            this.iframe.attr({
                    width:w,height:h
            });
        }
        this.targetAttr.width=w;
        this.targetAttr.height=h;
    };
    p.focus=function () {
        if (this.iframe) this.iframe.focus();
    };
    var urlparam=/\?.*$/;
    p.open=function (f,options) {
        options=options||{};
        var iwin;
        var idoc;
        var onload=options.onload || function () {};
        var onerror=options.onerror || (window.onerror ? function () {
            //return window.onerror.apply(window,[0,0,0,0,e]);
            return window.onerror.apply(window,arguments);
        }: function () {});
        delete options.onload;
        /*var dp=new DOMParser;
        var src=dp.parseFromString(f.text(),"text/html");
        if (options.onparse) {
            src=options.onparse(src,document);
        }*/
        var i=$("<iframe>");
        i.attr(this.targetAttr);
        if (isFirefox()) {
            i.attr("src",iframeSrcURL());
        }
        this.iframe=i;
        var base=f.up();
        var thiz=this;
        window.ifrm=i[0];
        var loaded;
        i.on("load",function () {
            if (loaded) return;
            loaded=true;
            iwin=i[0].contentWindow;
            /*if (options.globals) {
                for(var k in options.globals) {
                    iwin[k]=options.globals[k];
                }
            }*/
            iwin.LocalBrowserInfo=new LocalBrowserInfoClass(thiz,iwin,f,options);
            iwin.LocalBrowserInfo.wrapErrorHandler(onerror);
            //idoc=iwin.document;
            return iwin.LocalBrowserInfo.loadNode(f).then(function () {
                onload.apply(i[0],[]);
            }).fail(onerror);
            /*return $.when().then(F(function () {
                return iwin.LocalBrowserInfo.appendNode(
                    src.getElementsByTagName("html")[0],
                    idoc.getElementsByTagName("html")[0]);
            })).then(F(function () {
                if(typeof (iwin.onload)==="function") iwin.onload();
                onload.apply(i[0],[]);
            })).fail(onerror);*/
        });
        $(this.targetArea).empty().append(i);
        return i[0];
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
    if (typeof sh=="object") sh.browser=function (f,options) {
        f=this.resolve(f,true);
        var d=new $.Deferred();
        var place=$("<div>");
        this.echo(place);
        var ifrm=new LocalBrowser(place,options);
        ifrm.open(f,{onload:function () {
            d.resolve();
        },onerror:function (e) {
            d.reject(e);
        }});
        return d.promise();
    };
    return LocalBrowser;
});
