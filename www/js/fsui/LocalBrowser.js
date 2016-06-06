define(["Shell", "FS","DeferredUtil","UI"],function (sh,FS,DU,UI) {
    var LocalBrowser={};
    var F=DU.tr;
    LocalBrowser=function (dom,options) {
        this.iframeAttr=options||{};
        this.iframeArea=dom;//=UI("iframe");
    };
    p=LocalBrowser.prototype;
    p.close=function () {
        $(this.iframeArea).empty();
    };
    p.open=function (f,options) {    
        options=options||{};
        var onload=options.onload || function () {};
        var onerror=options.onerror || function () {};
        delete options.onload;
        var dp=new DOMParser;
        var src=dp.parseFromString(f.text(),"text/html");
        if (options.onparse) {
            src=options.onparse(src,document);
        }
        var i=$("<iframe>");
        i.attr(this.iframeAttr);
        var base=f.up();
        var iwin;
        var idoc;
        var thiz=this;
        window.ifrm=i[0];
        i.on("load",function () {
            iwin=i[0].contentWindow;
            iwin.LocalBrowserInfo={
                __file__: f,
                browser: thiz,
                open: function (url) {
                    if (FS.PathUtil.isRelativePath(url)) {
                        thiz.open(f.up().rel(url));
                    } else {
                        iwin.location.href=url;
                    }
                },
                convertURL:function (url) {
                    return LocalBrowser.convertURL(iwin, url, base);
                }
            };
            idoc=iwin.document;
            return $.when().then(F(function () {
                return appendTo(src.getElementsByTagName("head")[0], idoc.head);
            })).then(F(function (){
                return appendTo(src.getElementsByTagName("body")[0], idoc.body);
            })).then(F(function () {
                onload.apply(i[0],[]);
            })).fail(onerror);
        });
        $(this.iframeArea).empty().append(i);
        return i[0];
        function appendTo(src,dst) {
            var c=src.childNodes;
            return DU.tryLoop(function (i){
                var d;
                if (!(i<c.length)) return DU.brk();
                var n=c[i];
                //console.log(i,n.tagName);
                if (n.tagName) {
                    var nn=idoc.createElement(n.tagName);
                    var at=n.attributes;
                    // should charset must be set first than src
                    var names=[];
                    for (var j=0;j<at.length;j++) {
                        names.push(at[j].name);
                    }
                    var idx=names.indexOf("charset");
                    if (idx>=0) { 
                        names.splice(idx,1); 
                        names.unshift("charset"); 
                    }
                    names.forEach(function (name) {
                        var value=n.getAttribute(name);
                        if (n.tagName.toLowerCase()=="a" && name=="href" && 
                        FS.PathUtil.isRelativePath(value)) {
                            value="javascript:LocalBrowserInfo.open('"+value+"');";
                        }
                        if (name=="src") {
                            value=iwin.LocalBrowserInfo.convertURL(value);
                            if (n.tagName.toLowerCase()=="script") {
                                d=new $.Deferred;
                                nn.onload = nn.onreadystatechange = function() {
                                    d.resolve(i+1);
                                };
                            }
                        }
                        nn.setAttribute(name, value);
                    });
                    dst.appendChild(nn);
                    return $.when(d && d.promise()).then(function () {
                        return appendTo(n ,nn);
                    }).then (function () {
                        return i+1;
                    });
                } else {
                    dst.appendChild(idoc.createTextNode(n.textContent));
                    return i+1;
                }
            },0);
        }
    };
    LocalBrowser.convertURL=function (iwin,url,base) {
        if (FS.PathUtil.isRelativePath(url)) {
            var sfile=base.rel(url);
            url=LocalBrowser.file2blobURL(iwin,sfile);
        }
        return url;
    };
    LocalBrowser.file2blobURL=function (iwin,sfile) {
        var blob;
        if (sfile.isText()) {
            blob = new iwin.Blob([sfile.text()], {type: sfile.contentType()});
        } else {
            blob = new iwin.Blob([sfile.bytes()], {type: sfile.contentType()});
        }
        var url = iwin.URL.createObjectURL(blob);
        return url;
    };
    if (typeof sh=="object") sh.browser=function (f,options) {
        f=this.resolve(f,true);
        var d=new $.Deferred;
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
