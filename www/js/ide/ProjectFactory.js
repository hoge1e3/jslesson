define(function (require, exports, module) {
    const BuilderClient=require("BuilderClient");
    const F=BuilderClient.ProjectFactory;
    const Util=require("Util");
    const DU=require("DeferredUtil");
    const HEXT=".html";
    function getName(file) {
        if (typeof file.name==="function") file=file.name();
        if (typeof file!=="string") {
            throw new Error(`truncEXT: ${file} is not a string.`);
        }
        return file;
    }
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
            truncEXT: function (file) {
                file=getName(file);
                const EXT=this.getEXT();
                if (file.endsWith(HEXT)) return file.substring(0,file.length-HEXT.length);
                if (file.endsWith(EXT)) return file.substring(0,file.length-EXT.length);
                throw new Error(`truncEXT: '${file}' ends with neither ${HEXT} nor ${EXT}.`);
            },
            isLogicFile: function (file) {
                file=getName(file);
                const EXT=this.getEXT();
                return file.endsWith(EXT);
            },
            isHTMLFile: function (file) {
                file=getName(file);
                return file.endsWith(HEXT);
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
