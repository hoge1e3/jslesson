define(["FS","Klass","source-map","DeferredUtil"], function (FS,Klass,S,DU) {
	var regsm=/sourceMappingURL\s*=\s*([^\s]*)/i;
	var regrc=/:([0-9]+):([0-9]+)/;
	var urlparam=/\?.*$/;
	var singletonTag={body:1,head:1};

	var LocalBrowserInfoClass=Klass.define({
		$:function (browser, window, file, options) {
			this.browser=browser;
			this.options=options||{};
			this.window=window;
			this.params=options.params||{};
			this.origLoadEvt=options.origLoadEvt||{};
			this.__file__=file;
			this.file=file;
			this.base=this.file.up();
			this.fileMap={};
			this.registerGlobals();
		},
		//__file__: f,
		//browser: thiz,
		//params: options.params||{},
		open: function (url) {
			if (FS.PathUtil.isRelativePath(url)) {
				this.browser.open(this.file.up().rel(url));
			} else {
				this.window.location.href=url;
			}
		},
		registerGlobals: function () {
            if (this.options.globals) {
                for(var k in this.options.globals) {
                    this.window[k]=this.options.globals[k];
                }
            }
		},
		convertURL:function (url) {
			if (this.fileMap[url]) {
				return this.fileMap[url].blobUrl;
			}
			var urlHead=url.replace(urlparam,"");
			if (FS.PathUtil.isURL(urlHead) || urlHead.match(/^data:/)) {
				return url;
			}
			var base=this.base;
			var file;
			var blobUrl=url;
			if (FS.PathUtil.isRelativePath(urlHead)) {
				file=base.rel(urlHead);
				if (file.exists()) {
					blobUrl=this.file2blobURL(file);
				}
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
				blobUrl:blobUrl,
			};
			if(smc) this.fileMap[url].sourcemap=smc;
			return this.fileMap[url].blobUrl;
		},
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
				var t=this;
				ex.stack=(ex.stack+"").split("\n").map(function (l) {
					return t.blob2originalURL(l);
				}).join("\n");
				console.log("stack converted!",ex.stack);
			}
			return ex;
		},
		file2blobURL:function (sfile) {
			var iwin=this.window;
			var blob;
			if (sfile.isText()) {
				blob = new iwin.Blob([sfile.text()], {type: sfile.contentType()});
			} else {
				blob = new iwin.Blob([sfile.bytes()], {type: sfile.contentType()});
			}
			var url = iwin.URL.createObjectURL(blob);
			return url;
		},
		wrapErrorHandler: function (onerror){
			var self=this;
			self.window.onerror=function (message, source, lineno, colno,ex) {
				source=self.blob2originalURL(source+"");
				self.originalStackTrace(ex);
				return onerror(message, source, lineno, colno,ex);
				//if (window.onerror) window.onerror(message, source, lineno, colno,ex);
			};
		},
		loadNode: function (f) {
            var dp=new DOMParser();
            var src=dp.parseFromString(f.text()||"<html></html>","text/html");
            if (this.options.onparse) {
                src=this.options.onparse(src,document);
            }
		    var self=this;
		    var iwin=this.window;
		    var idoc=iwin.document;
			let loadEvents=[];
			iwin.addEventListener_old=iwin.addEventListener;
            iwin.addEventListener=function (type,...args){
                if (type==="load") {
                    loadEvents.push(args[0]);
                    return;
                }
                return iwin.addEventListener_old(type,...args);
            };
			let origLoadEvt=this.origLoadEvt;
            return $.when().then(function () {
                return self.appendNode(
                    src.getElementsByTagName("html")[0],
                    idoc.getElementsByTagName("html")[0]);
            }).then(function () {
				for (let h of loadEvents) h.apply(iwin,[origLoadEvt]);
                if(typeof (iwin.onload)==="function") iwin.onload(origLoadEvt);
            });
		},
		appendNode:function appendNode(src,dst) {
			var self=this;
			var idoc=this.window.document;
			var c=src.childNodes;
			return DU.tryLoop(function (i){
				var d;
				if (i>=c.length) return DU.brk();
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
						var colon=":";
						var value=n.getAttribute(name);
						if (n.tagName.toLowerCase()=="a" && name=="href" &&
						FS.PathUtil.isRelativePath(value)) {
							value="javascript"+colon+"LocalBrowserInfo.open('"+value+"');";
						}
						if (name=="src") {
							value=self.convertURL(value);
							if (n.tagName.toLowerCase()=="script") {
								d=new $.Deferred();
								nn.onload = nn.onreadystatechange = function() {
									d.resolve(i+1);
								};
							}
						}
						nn.setAttribute(name, value);
					});
					dst.appendChild(nn);
					return $.when(d && d.promise()).then(function () {
						return self.appendNode(n ,nn);
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

	});
	return LocalBrowserInfoClass;
});
