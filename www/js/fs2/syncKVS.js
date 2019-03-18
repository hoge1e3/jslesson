define(["FS","Shell","WebSite","assert","DeferredUtil"],
        function (FS,sh,WebSite,A,DU) {
    var Sync={};
    //var PathUtil=FS.PathUtil; Not avail
    sh.sync=function () {
        // sync options:o      local=remote=cwd
        // sync dir:s|file options:o local=remote=dir
        // sync local:s|file remote:s|file options:o
        var local,remote,options;
        var i=0;
        if (typeof arguments[i]=="string" || FS.isFile(arguments[i])) {
            local=sh.resolve(arguments[i], true);
            i++;
            if (typeof arguments[i]=="string" || FS.isFile(arguments[i])) {
                remote=sh.resolve(arguments[i], false);
                i++;
            }
        }
        if (typeof arguments[i]=="object") { options=arguments[i]; i++;}
        if (!local) remote=local=sh.cwd;
        if (!remote) remote=local;
        sh.echo("sync args=",local,remote,options);
        return Sync.sync(local,remote,options);
    };
    Sync.NOT_LOGGED_IN="Not logged in.";
    Sync.sync=function () {
         // sync dir:file options:o local=remote=dir
         // sync local:file remote:file options:o
         var local,remote,options;
         var downloadSkipped, uploadSkipped;
         var uploads={},downloads=[];
         var syncInfoDir;
         var user;
         var classid;
         var localDelta;
         var localDirInfoFile;
         var remoteDirInfoFile;
         var lastLocalDirInfo;
         var lastRemoteDirInfo;
         var curLocalDirInfo;
         var curRemoteDirInfo;
 		var remoteDelta;

         function parseArgs() {
 	        var i=0;
 	        if (FS.isFile(arguments[i])) {
 	            local=arguments[i];
 	            i++;
 	            if (FS.isFile(arguments[i])) {
 	                remote=arguments[i];
 	                i++;
 	            }
 	        }
 	        if (typeof arguments[i]=="object") { options=arguments[i]; i++;}
 	        if (!local) throw "Sync.sync: Local dir must be specified as file object";
 	        if (!remote) remote=local;
 	        if (!options) options={};
 	        if (options.test) options.v=1;
 		    syncInfoDir=local.rel(".sync/");
 	        options.excludes=options.excludes||[];
 	        options.excludes=options.excludes.concat(syncInfoDir.name());
         }
         function status(name, param) {
             sh.echo("Status: "+name+" param:",param);
             if (options.onstatus) {
                 options.onstatus(name, param);
             }
         }
         function unionKeys() {
             var keys={};
             for (var i=0 ; i<arguments.length ;i++) {
                 for (var key in arguments[i]) {keys[key]=1;}
             }
             return keys;
         }
         function getDelta(before,after) {
             //console.log("getDelta",before,after);
             var keys=unionKeys(before,after);
             var res={};
             for (var key in keys) {
                 var inb=(key in before),ina=(key in after);
                 //console.log("Compare", before[key], after[key], ina, inb);
                 if (inb && !ina) {
                     // DELETED
                     res[key]={lastUpdate:-1, trashed:true};
                 } else if (!inb && ina) {
                     // CREATEDED
                     res[key]={lastUpdate:after[key].lastUpdate, created:true};
                 } else if (before[key].lastUpdate != after[key].lastUpdate) {
                     // MODIFIED
                     res[key]={
                             lastUpdate: after[key].lastUpdate,
                             modified:true
                     };
                     //console.log("Added", key, before[key].lastUpdate , after[key].lastUpdate)
                 }
             }
             return res;
         }
         function getDeltaDelta(local,remote) {
             var keys=unionKeys(local,remote);
             var res={local:{}, remote:{} };
             for (var key in keys) {
                 var inl=(key in local),inr=(key in remote);
                 if (inl && !inr) {
                     res.local[key]=local[key];
                 } else if (!inl && inr) {
                     res.remote[key]=remote[key];
                 } else if (local[key].lastUpdate > remote[key].lastUpdate) {
                     res.local[key]=local[key];
                 } else {
                     res.remote[key]=remote[key];
                 }
             }
             return res;
         }
         function getLocalDirInfo() {
             console.log("gerLCD");
             var res2=local.getDirTree({style:"flat-relative",excludes:[".sync/"]});
             console.log("gerLCD done",res2);
             return res2;
         }
 	    function getLocalDelta() {
 	        // local.json exists / remote.json not exists -> download / no upload   -> remote.json did not create
 	        // local.json not exists / remote.json exists -> no download / upload   -> local.json did not create
 	        localDirInfoFile=syncInfoDir.rel("local.json");
 	        lastLocalDirInfo=localDirInfoFile.exists()?localDirInfoFile.obj():{};
 	        curLocalDirInfo=getLocalDirInfo();
 	        if (options.v) sh.echo("last/cur LocalDirInfo",lastLocalDirInfo, curLocalDirInfo);
 	        localDelta=getDelta(lastLocalDirInfo, curLocalDirInfo);
 	        if (options.v) sh.echo("localDelta",localDelta);
         }
         function getRemoteDirInfo() {
             var req={base:remote.path(),excludes:JSON.stringify(options.excludes),token:""+Math.random()};
 	        status("getDirInfo", req);
 	        return $.ajax({
 	            type:"get",
 	            url:A(WebSite.url.getDirInfo),
 	            data:req
 	        });
         }
         function getRemoteDelta() {
         	return getRemoteDirInfo().then(function (gd) {
 	            if (options.v) sh.echo("getDirInfo",gd);
 		        if (gd.NOT_LOGGED_IN) {
 		            return DU.reject(Sync.NOT_LOGGED_IN);
 		        }
 		        user=gd.user;
 	            classid=gd["class"];
 	        	curRemoteDirInfo=gd.data;
 	        	remoteDirInfoFile=syncInfoDir.rel("remote.json");
 		    	lastRemoteDirInfo=remoteDirInfoFile.exists()?remoteDirInfoFile.obj():{};
 	            remoteDelta=getDelta(lastRemoteDirInfo, curRemoteDirInfo);
 	            if (options.v) sh.echo("remoteDelta",remoteDelta);
 	            return remoteDelta;
         	});
         }
         parseArgs();

         DU.resolve().then(
            getLocalDelta
         ).then(
         	getRemoteDelta
         ).then(function n1() {
            var dd=getDeltaDelta(localDelta,remoteDelta);
            var o,f,m;
            for (var key in dd.local) {
                  f=local.rel(key);
                  if (f.isDir()) continue;
                  o={};
                  if (f.exists()) o.text=f.text();
                  m=dd.local[key];
                  for (var i in m) o[i]=m[i];
                  uploads[key]=o;
                  if (options.v) sh.echo("Upload",key,m);
            }
            for (var key in dd.remote) {
                downloads.push(key);
                //if (PathUtil.isDir(key)) continue;  //Not avail
                if (options.v)
                    sh.echo("Download",key,dd.remote[key]);
            }
            if (options.v) {
                sh.echo("uploads:",uploads);
                sh.echo("downloads:",downloads);
            }
            if (downloads.length===0) {
                if (options.v) sh.echo("Skip Download");
                downloadSkipped=true;
                return {data:{},downloadSkipped:true};
            }
            var req={base:remote.path(),paths:JSON.stringify(downloads),token:""+Math.random()};
            status("getFiles", req);
            return $.ajax({
                type:"post",
                url:A(WebSite.url.getFiles),
                data:req
            });
         }).then(function n2(dlData) {
            //dlData=JSON.parse(dlData);
            if (options.v) sh.echo("dlData:",dlData);
            var base=local;//FS.get(dlData.base);
            if (options.test) return;
            for (var rel in dlData.data) {
                var dlf=base.rel(rel);
                if (dlf.isDir()) continue;
                if (dlf.path().indexOf(".sync/")>=0) continue;
                var d=dlData.data[rel];
                //if (options.v) sh.echo(dlf.path(), d);
                if (d.trashed) {
                    if (dlf.exists()) dlf.rm();
                } else {
                    dlf.text(d.text);
                }
                delete d.text;
                dlf.metaInfo(d);
            }
            if (Object.keys(uploads).length===0) {
                if (options.v) sh.echo("Skip Upload");
                uploadSkipped=true;
                return {uploadSkipped:true};
            }
            var req={base:remote.path(),data:JSON.stringify(uploads),token:""+Math.random()};
            console.log("Data len=",req.data.length);
            req.pathInfo=A(WebSite.url.putFiles);
            status("putFiles", req);
            return $.ajax({  // TODO:requestFragment
                 type:"post",
                 url:req.pathInfo,
                 data:req
            });
         }).then(function n3(res){
            if (options.v) sh.echo("putFiles res=",res);
            if (!downloadSkipped) {
                var newLocalDirInfo=getLocalDirInfo();
                localDirInfoFile.obj(newLocalDirInfo);
            } else {
                localDirInfoFile.obj(curLocalDirInfo);
            }
            if (!uploadSkipped) {
                var newRemoteDirInfo=res.data;
                remoteDirInfoFile.obj(newRemoteDirInfo);
            } else {
                remoteDirInfoFile.obj(curRemoteDirInfo);
            }
            var upds=[];
            for (var i in uploads) upds.push(i);
            res={msg:res,uploads:upds,downloads: downloads,user:user,classid:classid};
            return res;
         });
    };
    return Sync;
});
