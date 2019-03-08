define(["Klass","DeferredUtil"],function (Klass,DU) {
    return Klass.define({
        $this: "TPR",
        $: ["dir"],
        getDir:function () {return this.dir;},
        getName: function () { return this.dir.name().replace(/\/$/,""); },
    	getOptionsFile: function () {
    		var resFile=this.dir.rel("options.json");
    		return resFile;
    	},
    	getOptions: function (TPR) {
    		var options={};
    		var resFile=TPR.getOptionsFile();
    		if (resFile.exists()) options=resFile.obj();
    		TPR.fixOptions(options);
    		return options;
    	},
    	getEXT: function(TPR){
    		var opt=TPR.getOptions();
    		if(!opt.language || opt.language=="js") TPR.EXT=".tonyu";
    		else TPR.EXT="."+opt.language;
    		return TPR.EXT;
    	},
    	setOptions: function (TPR,opt) {
    		TPR.getOptionsFile().obj(opt);
    	}, // ADDJSL
    	fixOptions: function (opt) {
    		if (!opt.compiler) opt.compiler={};
    	},
        getPublishedURL: function (TPR) {//ADDBA
    		if (TPR._publishedURL) return DU.resolve(TPR._publishedURL);
    		return DU.requirejs(["Auth"]).then(function (Auth) {
    			return Auth.publishedURL(TPR.getName()+"/");
    		}).then(function (r) {
    			TPR._publishedURL=r;
    			return r;
    		});
    	},
        sourceFiles: function (TPR) {// nsp==null => all
            //nsp=nsp || TPR.getNamespace();//DELJSL
            var dirs=TPR.sourceDirs();// ADDJSL
            var EXT=TPR.getEXT();
            var res={};
            for (var i=dirs.length-1; i>=0 ; i--) {
                dirs[i].recursive(collect);
            }
            function collect(f) {
                if (f.endsWith(EXT)) {
                    var nb=f.truncExt(EXT);
                    res[nb]=f;
                }
            }
            return res;
        },
        sourceDirs: function () {//ADDJSL  myNsp==null => All
    		return [this.dir];
    	}
    });
});
