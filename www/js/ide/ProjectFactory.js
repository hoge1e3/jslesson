define(function (require, exports, module) {
    const BuilderClient=require("BuilderClient");
    const F=BuilderClient.ProjectFactory;
    const Util=require("Util");
    const DU=require("DeferredUtil");
    F.addType("ba",params=>{
        const res=F.createDirBasedCore(params);
        Util.extend(res,{
            //getOptionsFile , setOptions are defined in dirBasedCore
        	getOptions: function () {
                const TPR=this;
        		var options={};
        		var resFile=TPR.getOptionsFile();
        		if (resFile.exists()) options=resFile.obj();
        		TPR.fixOptions(options);
        		return options;
        	},
        	getEXT: function(){
                const TPR=this;
        		var opt=TPR.getOptions();
        		if(!opt.language || opt.language=="js") TPR.EXT=".tonyu";
        		else TPR.EXT="."+opt.language;
        		return TPR.EXT;
        	},
        	fixOptions: function (opt) {
        		if (!opt.compiler) opt.compiler={};
        	},
            getPublishedURL: function () {//ADDBA
                const TPR=this;
        		if (TPR._publishedURL) return DU.resolve(TPR._publishedURL);
        		return DU.requirejs(["Auth"]).then(function (Auth) {
        			return Auth.publishedURL(TPR.getName()+"/");
        		}).then(function (r) {
        			TPR._publishedURL=r;
        			return r;
        		});
        	},
            sourceFiles: function () {// nsp==null => all
                //nsp=nsp || TPR.getNamespace();//DELJSL
                const TPR=this;
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
        		return [this.getDir()];
        	}
        });
        return res;
    });
    module.exports=F;
});
