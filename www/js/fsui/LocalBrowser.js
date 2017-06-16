define(["Shell", "FS","DeferredUtil","UI","source-map"],
function (sh,FS,DU,UI,S) {
    var LocalBrowser={};
    var F=DU.tr;
    LocalBrowser=function (dom,options) {
        this.iframeAttr=options||{};
        this.iframeArea=dom;//=UI("iframe");
    };
    var singletonTag={body:1,head:1};
    p=LocalBrowser.prototype;
    p.close=function () {
        $(this.iframeArea).empty();
    };
    p.resize=function (w,h) {
        if (this.iframe) {
            this.iframe.attr({
                    width:w,height:h
            });
            this.iframeAttr.width=w;
            this.iframeAttr.height=h;
        }
    };
    p.focus=function () {
        if (this.iframe) this.iframe.focus();
    };
    var urlparam=/\?.*$/;
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
        if (isFirefox()) {
            i.attr("src",iframeSrcURL());
        }
        this.iframe=i;
        var base=f.up();
        var iwin;
        var idoc;
        var thiz=this;
        var regsm=/sourceMappingURL\s*=\s*([^\s]*)/i;
        var regrc=/:([0-9]+):([0-9]+)/;
        window.ifrm=i[0];
        var loaded;
        i.on("load",function () {
            if (loaded) return;
            loaded=true;
            iwin=i[0].contentWindow;
            if (options.globals) {
                for(var k in options.globals) {
                    //console.log("Reg global",k,options.globals[k]);
                    iwin[k]=options.globals[k];
                }
            }
            iwin.LocalBrowserInfo={
                __file__: f,
                browser: thiz,
                params: options.params||{},
                open: function (url) {
                    if (FS.PathUtil.isRelativePath(url)) {
                        thiz.open(f.up().rel(url));
                    } else {
                        iwin.location.href=url;
                    }
                },
                convertURL:function (url) {
                    if (this.fileMap[url]) {
                        return this.fileMap[url].blobUrl;
                    }
                    var urlHead=url.replace(urlparam,"");
                    if (FS.PathUtil.isURL(urlHead)) {
                        return url;
                    }
                    var file;
                    if (FS.PathUtil.isRelativePath(urlHead)) {
                        file=base.rel(urlHead);
                    } else {
                        file=FS.get(urlHead);
                    }
                    var smc;
                    if (FS.PathUtil.endsWith(urlHead,".js") && file.exists()) {
                        var r=regsm.exec(file.text());
                        if (r) {
                            var smf=file.sibling(r[1]);
                            if (smf.exists()) {
                                smc = new S.SourceMapConsumer(smf.obj());
                                console.log("Source map",smc);
                            }
                        }
                    }
                    this.fileMap[url]={
                        file:file,
                        blobUrl:LocalBrowser.convertURL(iwin, url, base),
                    };
                    if(smc) this.fileMap[url].sourcemap=smc;
                    return this.fileMap[url].blobUrl;
                },
                fileMap:{},
                blob2originalURL: function (line) {
                    for (var url in this.fileMap) {
                        var blobURL=this.fileMap[url].blobUrl;
                        var sourcemap=this.fileMap[url].sourcemap;
                        var idx=line.indexOf(blobURL);
                        if (idx>=0) {
                            var trail=line.substring(idx+blobURL.length);
                            var rr=regrc.exec(trail);
                            if (sourcemap && rr) {
                                var r=parseInt(rr[1]);
                                var c=parseInt(rr[2]);
                                var op;
                                op=sourcemap.originalPositionFor({
                                    line: r, column:c,
                                    bias:S.SourceMapConsumer.GREATEST_LOWER_BOUND
                                });
                                if (op.source==null) {
                                    op=sourcemap.originalPositionFor({
                                        line: r, column:c,
                                        bias:S.SourceMapConsumer.LEAST_UPPER_BOUND
                                    });
                                }
                                if (window.parent) {
                                    window.parent.lastSourceMap=sourcemap;
                                }
                                console.log("Original", line, r,c,op);
                                line=line.substring(0,idx)+
                                op.source+":"+op.line+":"+op.column+")";
                                console.log("Converted", line);
                            } else {
                                line=line.substring(0,idx)+url+trail;
                            }
                        }
                    }
                    return line;
                },
                originalStackTrace: function (ex) {
                    if (ex && ex.stack) {
                        console.log("stack converting ",ex.stack);
                        ex.stack=(ex.stack+"").split("\n").map(function (l) {
                            return iwin.LocalBrowserInfo.blob2originalURL(l);
                        }).join("\n");
                        console.log("stack converted!",ex.stack);
                    }
                    return ex;
                }
            };
            iwin.onerror=function (message, source, lineno, colno,ex) {
                source=iwin.LocalBrowserInfo.blob2originalURL(source+"");
                iwin.LocalBrowserInfo.originalStackTrace(ex);
                if (window.onerror) window.onerror(message, source, lineno, colno,ex);
            };
            idoc=iwin.document;
            /*idoc.write=function () {
                Array.prototype.slice.call(arguments).forEach(function (e) {
                    var dp=new DOMParser;
                    var r=dp.parseFromString(e,"text/html");
                    appendTo(r.body,idoc.body);
                    //idoc.body.innerHTML+=e;//appendChild(idoc.createTextNode(e));
                });
            };
            idoc.writeln=function () {
                idoc.write.apply(idoc,arguments);
                idoc.write("\n");
            };*/
            return $.when().then(F(function () {
                return appendTo(src.getElementsByTagName("html")[0],
                idoc.getElementsByTagName("html")[0]);
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
                switch (n.nodeType) {
                case Node.ELEMENT_NODE:
                    var nn=singletonTag[n.tagName.toLowerCase()] ?
                    idoc.getElementsByTagName(n.tagName)[0]:
                    idoc.createElement(n.tagName);
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
                        //return DU.timeout(100,i+1);
                        return i+1;//DU.timeout(0,i+1);
                    });
                case Node.TEXT_NODE:
                    dst.appendChild(idoc.createTextNode(n.textContent));
                    break;
                }
                //return DU.timeout(100,i+1);
                return i+1;//DU.timeout(0,i+1);
            },0);
        }
    };
    LocalBrowser.convertURL=function (iwin,url,base) {
        var urlHead=url.replace(urlparam,"");
        if (FS.PathUtil.isRelativePath(urlHead)) {
            var sfile=base.rel(urlHead);
            if (sfile.exists()) {
                url=LocalBrowser.file2blobURL(iwin,sfile);
            }
        }
        return url;
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
