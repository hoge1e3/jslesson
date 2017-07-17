define(["Tonyu","Tonyu.Compiler.JSGenerator","Tonyu.Compiler.Semantics",
		"Tonyu.TraceTbl","FS","assert","DeferredUtil","compiledProject","IndentBuffer"],
		function (Tonyu,JSGenerator,Semantics,
				ttb,FS,A,DU,CPR,IndentBuffer) {
var TPRC=function (dir) {
	A(FS.isFile(dir) && dir.isDir(), "projectCompiler: "+dir+" is not dir obj");
	var TPR={env:{}};
	var traceTbl=Tonyu.TraceTbl;//();
	var F=DU.throwF;
	TPR.env.traceTbl=traceTbl;
	TPR.EXT=".tonyu";
	TPR.getOptionsFile=function () {
		var resFile=dir.rel("options.json");
		return resFile;
	};
	TPR.getOptions=function () {
		var env=TPR.env;
		env.options={};
		var resFile=TPR.getOptionsFile();
		if (resFile.exists()) env.options=resFile.obj();
		TPR.fixOptions(env.options);
		return env.options;
	};
	TPR.getEXT=function(){
	var opt=TPR.getOptions();
	if(!opt.language || opt.language=="js") TPR.EXT=".tonyu";
	else TPR.EXT="."+opt.language;
	return TPR.EXT;
	}
	TPR.setOptions=function (opt) {
		TPR.getOptionsFile().obj(opt);
	}; // ADDJSL
	TPR.fixOptions=function (opt) {
		if (!opt.compiler) opt.compiler={};
	};
	TPR.resolve=function (rdir){
		if (rdir instanceof Array) {
			var res=[];
			rdir.forEach(function (e) {
				res.push(TPR.resolve(e));
			});
			return res;
		}
		if (typeof rdir=="string") {
			return FS.resolve(rdir, dir.path());
		}
		if (!rdir || !rdir.isDir) throw new Error("Cannot TPR.resolve: "+rdir);
		return rdir;
	};
	TPR.shouldCompile=function () {
		var outF=TPR.getOutputFile();
		if (!outF.exists()) {
			return true;
		}
		if (outF.isReadOnly()) return false;
		var outLast=outF.lastUpdate();
		if (outLast<Tonyu.VERSION) {
			console.log("Should compile: ", outF.name()+" last="+new Date(outLast)+" < Tonyu.ver="+new Date(Tonyu.VERSION));
			return true;
		}
		//console.log("Outf last="+new Date(outLast));
		var sf=TPR.sourceFiles(TPR.getNamespace());
		for (var i in sf) {
			var f=sf[i];
			var l=f.lastUpdate();
			if (l>outLast) {
				console.log("Should compile: ", f.name()+" last="+new Date(l));
				return true;
			}
		}
		var resFile=TPR.getOptionsFile();
		if (resFile.exists() && resFile.lastUpdate()>outLast) {
			console.log("Should compile: ", resFile.name()+" last="+new Date(resFile.lastUpdate()));
			return true;
		}
		return false;
	};
	TPR.getClassName=function (file) {//ADDJSL
		A(FS.isFile(file));
		if (dir.contains(file)) {
			return TPR.getNamespace()+"."+file.truncExt(TPR.EXT);
		}
		var res;
		TPR.getDependingProjects().forEach(function (dp) {
			if (!res) res=dp.getClassName(file);
		});
		return res;
	};
	TPR.getNamespace=function () {
		var opt=TPR.getOptions();
		return A(opt.compiler.namespace,"namespace not specified opt="+JSON.stringify(opt));
	};
	TPR.getOutputFile=function (lang) {
		var opt=TPR.getOptions();
		var outF=TPR.resolve(A(opt.compiler.outputFile,"output file should be specified in options"));
		if (outF.isDir()) {
			throw new Error("out: directory style not supported");
		}
		return outF;
	};
	TPR.loadDependingClasses=function (ctx) {
		var task=DU.directPromise();
		var myNsp=TPR.getNamespace();
		TPR.getDependingProjects().forEach(function (p) {
			if (p.getNamespace()==myNsp) return;
			task=task.then(function () {
				return p.loadClasses(ctx);
			});
		});
		return task;
	};
	// Difference of ctx and env:  env is of THIS project. ctx is of cross-project
	TPR.loadClasses=function (ctx/*or options(For external call)*/) {
		Tonyu.runMode=false;
		console.log("LoadClasses: "+dir.path());
		ctx=initCtx(ctx);
		var visited=ctx.visited||{};
		//var classes=ctx.classes||{};
		if (visited[TPR.path()]) return DU.directPromise();
		visited[TPR.path()]=true;
		return TPR.loadDependingClasses(ctx).then(function () {
			return TPR.shouldCompile();
		}).then(function (sc) {
			if (sc) {
				return TPR.compile(ctx);
			} else {
				var outF=TPR.getOutputFile("js");
				return evalFile(outF).then(F(copyToClasses));
			}
		});
		function copyToClasses() {
			var ns=TPR.getNamespace();
			//same as compiledProject (XXXX)
			var cls=Tonyu.classes;
			ns.split(".").forEach(function (c) {
				if (cls) cls=cls[c];
				// comment out : when empty concat.js
				//if (!cls) throw new Error("namespace Not found :"+ns);
			});
			if (cls) {
				for (var cln in cls) {
					var cl=cls[cln];
					var m=Tonyu.klass.getMeta(cl);
					ctx.classes[m.fullName]=m;
				}
			}
			//------------------XXXX
		}
	};
	function initCtx(ctx) {
		var env=TPR.env;
		if (!ctx) ctx={};
		if (!ctx.visited) {
			ctx={visited:{}, classes:(env.classes=env.classes||{}),options:ctx};
		}
		return ctx;
	}
	TPR.compile=function (ctx/*or options(For external call)*/) {
		Tonyu.runMode=false;
		console.log("Compile: "+dir.path());
		ctx=initCtx(ctx);
		var myNsp=TPR.getNamespace();
		return TPR.loadDependingClasses(ctx).then(F(function () {
			var baseClasses=ctx.classes;
			console.log("baseClasses", baseClasses);
			var ctxOpt=ctx.options;
			var env=TPR.env;
			env.aliases={};
			env.classes=baseClasses;
			for (var n in baseClasses) {
				var cl=baseClasses[n];
				env.aliases[ cl.shortName] = cl.fullName;
			}
			var newClasses={};
			var sf=TPR.sourceFiles(myNsp);
			for (var shortCn in sf) {
				var f=sf[shortCn];
				var fullCn=myNsp+"."+shortCn;
				newClasses[fullCn]=baseClasses[fullCn]={
						fullName:  fullCn,
						shortName: shortCn,
						namespace: myNsp,
						src:{
							tonyu: f
						}
				};
				env.aliases[shortCn]=fullCn;
			}
			for (var n in newClasses) {
				console.log("initClassDecl: "+n);
				Semantics.initClassDecls(newClasses[n], env);/*ENVC*/
			}
			var ord=orderByInheritance(newClasses);/*ENVC*/
			ord.forEach(function (c) {
				console.log("annotate :"+c.fullName);
				Semantics.annotate(c, env);
			});
			TPR.concatJS(ord);
		}));
	};
	TPR.concatJS=function (ord) {
		var env=TPR.env;
		var cbuf="";
		var outf=TPR.getOutputFile();
		var codeb=env.codeBuffer=IndentBuffer();
		//codeb.printf("// Gen!%n");
		ord.forEach(function (c) {
			console.log("concatJS :",c.fullName);//,c.src.tonyu);
			codeb.setSrcFile(c.src.tonyu);
			JSGenerator.genJS(c, env);
			cbuf+=c.src.js+"\n";
		});
		//outf.text(cbuf);
		//console.log("gencode", codeb.buf);
		var mapf=outf.sibling(outf.name()+".map");
		mapf.text(codeb.srcmap.toString());
		outf.text(env.codeBuffer.buf+"\n//# sourceMappingURL="+mapf.name());
		evalFile(outf);
	};
	TPR.getDependingProjects=function () {
		var opt=TPR.getOptions();
		var dp=opt.compiler.dependingProjects || [];
		return dp.map(function (dprj) {
			if (typeof dprj=="string") {
				var prjDir=TPR.resolve(dprj);
				return TPRC(prjDir);
			} else if (typeof dprj=="object") {
				return CPR(dprj.namespace, FS.expandPath(dprj.compiledURL) );
			}
		});
	};
	TPR.dir=dir;
	TPR.path=function () {return dir.path();};
	TPR.sourceFiles=function (nsp) {// nsp==null => all
		var dirs=TPR.sourceDirs(nsp);// ADDJSL
		var res={};
		for (var i=dirs.length-1; i>=0 ; i--) {
			dirs[i].recursive(collect);
		}
		function collect(f) {
			if (f.endsWith(TPR.EXT)) {
				var nb=f.truncExt(TPR.EXT);
				res[nb]=f;
			}
		}
		return res;
	};
	TPR.sourceDir=function () {
		return dir;
	};
	TPR.sourceDirs=function (myNsp) {//ADDJSL  myNsp==null => All
		var dp=TPR.getDependingProjects();
		var dirs=[dir];
		dp.forEach(function (dprj) {
			var nsp=dprj.getNamespace();
			if (!myNsp || nsp==myNsp) {
				var d=dprj.sourceDir();
				if (d) dirs.push(d);
			}
		});
		return dirs;
	};
	function orderByInheritance(classes) {/*ENVC*/
		var added={};
		var res=[];
		var crumbs={};
		var ccnt=0;
		for (var n in classes) {/*ENVC*/
			added[n]=false;
			ccnt++;
		}
		while (res.length<ccnt) {
			var p=res.length;
			for (var n in classes) {/*ENVC*/
				if (added[n]) continue;
				var c=classes[n];/*ENVC*/
				var deps=dep1(c);
				if (deps.length==0) {
					res.push(c);
					added[n]=true;
				}
			}
			if (res.length==p) {
				var loop=[];
				for (var n in classes) {
					if (!added[n]) {
						loop=detectLoop(classes[n]) || [];
						break;
					}
				}
				throw TError( "次のクラス間に循環参照があります: "+loop.join("->"), "不明" ,0);
			}
		}
		function dep1(c) {
			var spc=c.superclass;
			var deps=spc ? [spc]:[] ;
			if (c.includes) deps=deps.concat(c.includes);
			deps=deps.filter(function (cl) {
				return cl && classes[cl.fullName] && !cl.builtin && !added[cl.fullName];
			});
			return deps;
		}
		function detectLoop(c, prev){
			//  A->B->C->A
			// c[B]=A  c[C]=B   c[A]=C
			console.log("detectloop",c.fullName);
			if (crumbs[c.fullName]) {   // c[A]
				console.log("Detected: ",c.fullName, crumbs, crumbs[c.fullName]);
				var n=c.fullName;
				var loop=[];
				do {
					loop.unshift(n);    // A      C       B
					n=crumbs[n];        // C      B       A
				} while(n!=c.fullName);
				loop.unshift(c.fullName);
				return loop;
			}
			if (prev) crumbs[c.fullName]=prev.fullName;
			var deps=dep1(c),res;
			deps.forEach(function (d) {
				if (res) return;
				var r=detectLoop(d,c);
				if (r) res=r;
			});
			delete crumbs[c.fullName];
			return res;
		}
		return res;
	}
	function evalFile(f) {
		console.log("loading: "+f.path());
		var lastEvaled=new Function(f.text());
		traceTbl.addSource(f.path(),lastEvaled+"");
		return DU.directPromise( lastEvaled() );
	}
	TPR.decodeTrace=function (desc) { // user.Test:123
		var a=desc.split(":");
		var cl=a[0],pos=parseInt(a[1]);
		var cls=cl.split(".");
		var sn=cls.pop();
		var nsp=cls.join(".");
		if (nsp==TPR.getNamespace()) {
			var sf=TPR.sourceFiles(nsp);
			for (var i in sf) {
				if (sn==i) {
					return TError("Trace info", sf[i], pos);
				}
			}
		}
	};
	return TPR;
}
return TPRC;
});

