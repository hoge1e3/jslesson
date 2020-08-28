(function (global) {
    var define,requirejs;
	var R={};
	var REQJS="REQJS_";
	var reqjsSeq=0;
	R.def=function (name, reqs,func) {
		var m=R.getModuleInfo(name);
        if (typeof reqs=="function" ||
            (reqs && reqs.join && reqs.join(",").match(/^require,exports,module/))) {
            if (typeof reqs=="function") {
                func=reqs;
		        reqs=R.reqsFromFunc(func);
            } else {
                reqs=reqs.slice(3);
            }
    		R.setReqs( m, reqs);
    		m.func=function () {
    		    var module={exports:{}};
    			var res=func(R.doLoad,module.exports,module);
    			return res || module.exports;
    		};
		} else {
    		R.setReqs( m, reqs);
    		m.func=function () {
    			return func.apply(this, R.getObjs(reqs));
    		};
		}
		R.loadIfAvailable(m);
	};
	define=function (name,reqs,func) {
		R.def(name, reqs,func);
	};
	define.amd={};
	requirejs=function (reqs,func) {
		R.def(REQJS+(reqjsSeq++),reqs,func);
	};
	R.setReqs=function (m, reqs) {
		reqs.forEach(function (req) {
			var reqm=R.getModuleInfo(req);
			if (!reqm.loaded) {
				m.reqs[req]=reqm;
				reqm.revReqs[m.name]=m;
			}
		});
	};
	R.getModuleInfo=function (name) {
		var ms=R.modules;
		return ms[name]=ms[name]||{name:name,reqs:{},revReqs:{}};
	};
	R.doLoad=function (name) {
		var m=R.getModuleInfo(name);
		if (m.loaded) return m.obj;
		m.loaded=true;
		var res=m.func();
	    if ( res==null && !name.match(/^REQJS_/)) console.log("Warning: No obj for "+name);
		m.obj=res;
		for (var i in m.revReqs) {
			R.notifyLoaded(m.revReqs[i], m.name);
		}
		return res;
	};
	R.notifyLoaded=function (dependingMod, loadedModuleName) {
	    // depengindMod depends on loadedModule
		delete dependingMod.reqs[loadedModuleName];
		R.loadIfAvailable(dependingMod);
	};
	R.loadIfAvailable=function (m) {
		for (var i in m.reqs) {
			return;
		}
		R.doLoad(m.name);
	};
	R.getObjs=function (ary) {
		var res=[];
		ary.forEach(function (n) {
			var cur=R.doLoad(n);
			res.push(cur);
		});
		return res;
	};
	R.reqsFromFunc=function (f) {
	    var str=f+"";
	    var res=[];
	    str.replace(/require\s*\(\s*["']([^"']+)["']\s*\)/g,function (m,a) {
	       res.push(a);
	    });
	    return res;
	};
	R.modules={};
	//requireSimulator=R;
//----------
define('test/TestRunner',['require','exports','module'],function (require,exports,module) {
    module.exports=class {
        constructor(options) {
            options=options||{};
            this.options=options;
            options.defaultSleepTime=options.defaultSleepTime||1000;
            options.timeout=options.timeout||10000;
        }
        async run() {
            const n=(a,b)=>typeof a==="number"? a: b;
            const width=n(this.options.width, $(window).width()-50);
            const height=n(this.options.height, $(window).height()-100);
            const ifrmjq=$("<iframe>").attr({
                /*src:this.projectSelURL,*/width,height
            }).appendTo("body");
            this.iframe=ifrmjq[0];
        }
        contentWindow() {
            return this.iframe.contentWindow;
        }
        open(url) {
            this.contentWindow().location.href=url;
        }
        $(...args) {
            const w=this.contentWindow();
            const $=w.$;
            return $(...args);
        }
        trimspace(s) {
            return s.replace(/^[\r\n\s]*/,"").replace(/[\r\n\s]*$/,"").replace(/[\r\n\s]+/g," ");
        }
        async waitForText(text,filter="") {
            const sel=await this.retry(()=>{
                const sel=this.findByText(text,filter);
                if (!sel.length) throw new Error(`timeout for text ${text}`);
                return sel;
            });
            return sel;
        }
        async waitForQuery(q) {
            return await this.retryGet(
                ()=>this.$(q).get(0),
                `timeout for query ${q}`);
        }
        async clickByQuery(q) {
            const e=await this.waitForQuery(q);
            e.click();
        }
        async clickByText(t,filter="") {
            const sel=await this.waitForText(t);
            sel.click();
        }
        waitTrue(f, mesg="waitTrue") {
            return this.waitAppear(f,mesg);
        }
        async waitAppear(f, mesg="waitAppear") {
            return await this.retry(()=>{
                const e=f();
                if (e) return e;
                throw new Error(`Timeout for ${mesg}`);
            });
        }
        findByText(t, filter="") {
            let sel,len;
            this.$(`${filter}:contains('${t}')`).each(function () {
                const e=$(this);
                if (!sel || e.html().length<len) {
                    len=e.html().length;
                    sel=this;
                }
            });
            //const e=this.$(`:contains('${t}')`).get(0);
            return $(sel);
        }
        //runMenu
        async clickByID(id) {
            return await this.clickByQuery("#"+id);
        }
        async selectLinkByText(t) {
            const e=await this.retryGet(
                ()=>this.$(`a:contains('${t}')`).get(0),
                `selectLinkByText ${t} fail `);
            e.click();
        }
        async setValueFollowing(text, value) {
            const e=await this.retryGet(
                ()=>this.findInputFollowing(text),
                `setValueFollowing:${text} not found`
            );
            e.val(value);
        }
        findInputFollowing(text) {
            let e=this.findByText(text);
            while(true) {
                e=this.nextElement(e);
                if (!e) return null;
                if (e[0].tagName==="input" || e[0].tagName==="textarea") {
                    return e;
                }
            }
        }
        sleep(t) {
            return new Promise(s=>setTimeout(s,t||this.options.defaultSleepTime));
        }
        async retryGet(f,failMesg) {
            return await this.retry(()=>{
                const r=f();
                if (!r) throw new Error(failMesg);
                return r;
            });
        }
        async retry(f) {
            let ex;
            const options=this.options;
            for (let i=0;i<options.timeout/options.defaultSleepTime;i++) {
                try {
                    return f();
                } catch(e){
                    ex=e;
                    await this.sleep();
                }
            }
            throw ex;
        }
        nextElement(e,noChild=false) {
            const c=e.children();
            if (c.length==0) noChild=true;
            if (noChild) {
                const n=e.next();
                if (!n.length) {
                    const p=e.parent();
                    if (!p.length) return null;
                    return this.nextElement(p,true);
                } else {
                    return n;
                }
            } else {
                return $(c[0]);
            }
        }
    };
});

define('test/BATestRunner',['require','exports','module','test/TestRunner'],function (require,exports,module) {
    const WebSite=window.WebSite;
    const TestRunner=require("test/TestRunner");
    class ProjectItem {
        constructor(runner, jdom) {
            this.runner=runner;
            this.jdom=jdom;
            this.name=jdom.find(".name").text();
            this.lang=jdom.find("img").attr("src").replace(/.\/images\/([\w\d]+)\.png/,(_,l)=>l);
        }
        async open() {
            this.jdom.find(".name").get(0).click();
            const r=this.runner;
            const ic=new IDEContext(r);
            await ic.init();
            return ic;
        }
        async delete() {
            this.jdom.find(".cmd_del")[0].click();
        }
    }
    class ProjectSelContext {
        constructor(runner) {
            this.runner=runner;
        }
        async sleep(t){await this.runner.sleep(t);}
        $(q) {return this.runner.$(q);}
        getItem(name) {
            return this.getItems().find(p=>p.name===name);
        }
        getItems() {
            const res=[];
            const r=this.runner;
            r.$(".project").each(function (){
                res.push(new ProjectItem(r,$(this)));
            });
            return res;
        }
        getNames() {
            return this.getItems().map(p=>p.name);
        }
        async open(name) {
            const n=this.getItem(name);
            if (!n) throw new Error(`project ${name} does not exist`);
            return await n.open();
        }
        async init() {
            const r=this.runner;
            await r.open(r.projectSelURL);
            await r.waitAppear(()=>{
                const w=r.contentWindow();
                const d=w.document;
                return d.querySelector("#userInfo") || d.querySelector("[name='class']");
            },"projectSel");
            const w=r.contentWindow();
            const d=w.document;
            if (d.querySelector("#userInfo")) {
                await r.waitForText("他ユーザでログイン");
                return;
            }
            const options=r.options;
            await r.sleep(1000);
            d.querySelector("[name='class']").value=(options.className);
            await r.sleep(500);
            d.querySelector("[name='user']").value=(options.userName);
            await r.sleep(500);
            d.forms[0].submit();//");//clickByText("OK");
            await r.sleep(300);
            r.loggedin=true;
            return this;
        }
        async prepareEmpty(name, lang) {
            await this.deleteIfExists(name);
            await this.sleep(1000);
            return await this.create(name,lang);
            //await this.sleep(1000);
        }
        async deleteIfExists(name) {
            const r=this.runner;
            await r.waitTrue(()=>{
                const prjItem=this.getItem(name);
                if (!prjItem) {
                    console.log("Project ",name," did not exist.");
                    return true;
                }
                prjItem.delete();
            },`Project ${name} still exists!`);
        }
        async create(name, lang) {
            const r=this.runner;
            const w=r.contentWindow();
            const $=w.$;
            $('#newPrj').click();
            await r.sleep();
            $('#prjName').val(name);
            await r.sleep();
            $('#prjLang').val(lang);
            await r.sleep();
            await r.clickByText("OK");
            await r.sleep();
            const ic=new IDEContext(r);
            await ic.init();
            return ic;
        }
    }
    class IDEContext {
        constructor(runner) {
            this.runner=runner;
        }
        async sleep(t){await this.runner.sleep(t);}
        $(q) {return this.runner.$(q);}
        async init() {
            const r=this.runner;
            await r.waitAppear(()=>r.contentWindow().curPrj,"builderReady");
        }
        getFileItem(name) {
            const res=this.$(`.fileItem:contains('${name}')`);
            if (res.get(0)) return res;
            return null;
        }
        getFileNames() {
            const res=[];
            this.$(".fileItem").each(function () {
                res.push(this.innerText);
            });
            return res;
        }
        async openFile(name) {
            const r=this.runner;
            await r.waitForText("ファイル");
            const ec=new EditContext(this,name);
            if (!this.getFileItem(name)) {
                await r.toggleMenu();
                //await r.sleep();
                await r.selectLinkByText("ファイル");
                await r.sleep();
                await r.selectLinkByText("新規");
                await r.sleep();
                await r.toggleMenu();
                const w=r.contentWindow();
                const $=w.$;
                $("#inputDialog").val(name);
                await r.sleep();
                await r.clickByText("OK");
            }
            await ec.init();
            return ec;
        }
        testcase(params) {
            return new Testcase(this,params);
        }
    }
    class Testcase {
        // fileName:string
        // expect: function | string
        // context: string
        constructor(ctx,params) {
            this.ideCtx=ctx;
            this.runner=this.ideCtx.runner;
            Object.assign(this,params);
        }
        async run() {
            const r=this.runner;
            const ec=await this.ideCtx.openFile(this.fileName);
            await ec.input(this.content);
            await r.sleep();
            const rc=await ec.run();
            const expect=this.expect;
            const ef=(typeof expect==="function") ? expect : window=>{
                const tx=rc.getOutputBodyText();
                console.log("The output", tx);
                console.log(tx,expect);
                if (tx!==expect) throw new Error("Asserion failed"+tx+"!="+expect);
            };
            await r.retry(()=>ef(rc.getOutputWindow()));
            await rc.close();
        }
    }
    class EditContext {
        constructor(ideCtx, name) {
            this.ideCtx=ideCtx;
            this.runner=ideCtx.runner;
            this.name=name;
        }
        async init() {
            (await this.runner.waitTrue(()=>this.ideCtx.getFileItem(this.name))).get(0).click();
            return this;
        }
        async sleep(t){await this.runner.sleep(t);}
        $(q) {return this.runner.$(q);}
        getCurrentEditor() {
            return this.runner.contentWindow().getCurrentEditorInfo().editor;
        }
        getContent() {
            return this.getCurrentEditor().getValue();
        }
        async input(cont) {
            if (typeof cont==="string") {
                const e=this.getCurrentEditor();
                e.setValue(cont);
            } else {
                for (let lang in cont) {
                    this.selectLangTab(lang);
                    await this.sleep();
                    const e=this.getCurrentEditor();
                    e.setValue(cont[lang]);
                    await this.sleep();
                }
            }
        }
        async selectLangTab(name) {
            const r=this.runner;
            const e=await r.retryGet(
                ()=>r.$(`.selTab:contains('${name}')`).get(0),
                `selectLangTab ${name} fail`);
            e.click();
        }
        async run() {
            const r=new RunContext(this);
            return await r.init();
        }
        async runFullScr() {
            const r=this.runner;
            r.$("#fullScr").click();
            return await r.waitTrue(()=>{
                const urlElem=r.$("[target='runit']");
                const url=urlElem.attr("href");
                if (url) urlElem.closest(".ui-dialog").find(".ui-dialog-titlebar-close")[0].click();
                return url;
            });
        }

    }
    class RunContext {
        constructor(editCtx) {
            this.editCtx=editCtx;
            this.ideCtx=editCtx.ideCtx;
            this.runner=this.ideCtx.runner;
        }
        async sleep(t){await this.runner.sleep(t);}
        $(q) {return this.runner.$(q);}
        async init(){
            const r=this.runner;
            await r.toggleMenu();
            if (r.$("#runMenu").length) {
                await r.clickByID("runMenu");
            } else if (r.$("#runPython").length) {
                await r.clickByID("runPython");
                await r.sleep();
                await r.clickByID("runServer");
            }
            await r.toggleMenu();
            await r.waitTrue(()=>this.getOutputWindow() );
            return this;
        }
        getOutputWindow() {
            return this.$("#ifrmDlg")[0].contentWindow;
        }
        getConsoleOutput() {
            return this.$("#ifrmDlg")[0].contentWindow.
                document.getElementById("console").innerText;
        }
        getOutputBodyHTML() {
            return this.$("#ifrmDlg")[0].contentWindow.
                document.body.innerHTML;
        }
        getOutputBodyText() {
            return this.$("#ifrmDlg")[0].contentWindow.
                document.body.innerText;
        }
        async close() {
            const r=this.runner;
            await r.clickByText("閉じる");
        }
    }
    class BATestRunner extends TestRunner {
        constructor(options) {
            super(options);
            options=this.options;
            options.className=options.className||"0123";
            options.userName=options.userName||"test";
        }
        static async create(options) {
            const r=new BATestRunner(options);
            await r.run();
            return r;
        }
        async run() {
            super.run();
            this.projectSelURL=this.options.bitarrowTop||WebSite.serverTop;//'http://localhost/';
            this.loginURL=this.projectSelURL+'?Login/';
            //var projectSelURL='http://klab.eplang.jp/jslesson/'
            this.loggedin=false;
            if (window.SplashScreen) window.SplashScreen.hide();
        }
        async openProjectSel() {
            const ctx=new ProjectSelContext(this);
            await ctx.init();
            return ctx;
        }
        async toggleMenu() {
            const q=".navbar-toggle";
            if (!$(q)[0]) return;
            await this.clickByQuery(q);
            await this.sleep();
        }
        trimspace(s) {
            return s.replace(/^[\r\n\s]*/,"").replace(/[\r\n\s]*$/,"").replace(/[\r\n\s]+/g," ");
        }
    }
    module.exports=BATestRunner;
});


    //-----------
    var resMod;
    requirejs(["test/BATestRunner"], function (r) {
        resMod=r;
    });
    if (typeof window!=="undefined" && window.BARunner===undefined) window.BARunner=resMod;
    if (typeof module!=="undefined") module.exports=resMod;
    return resMod;
})(window);
