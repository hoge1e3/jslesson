define(["FS","Util","WebSite","splashElement"], function (FS,Util,WebSite,splashElement) {
    var east=function (dir,options) {
        options=options||{};
        console.log("east options",options);
        var excludes=options.excludes||{};
        var includeJSScript=options.includeJSScript;
        var buf="<!DOCTYPE html>\n<html><head>\n";
        buf+='<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>\n';
        // ADDBA
        if (WebSite.serverType==="BA") {
            buf+=`<script>WebSite={runType:'singleHTML', useEditButton:${!!options.editButton}, runtime: '${WebSite.runtime}'};</script>`;
        } else {
            buf+=`<script>WebSite={runType:'singleHTML', useEditButton:${!!options.editButton}};</script>`;            
        }
        //"<script>WebSite_runType='singleHTML';</script>\n";
        const replacedFiles={};//path->text   //ADDBA
        const ft=(f)=>replacedFiles[f.path()]||f.text(); //ADDBA
        if (includeJSScript) {
            var resFile=dir.rel("res.json");
            var resObj=resFile.obj();
            var scriptServer=WebSite.scriptServer||"https://edit.tonyu.jp/";
            const genPath=scriptServer+"js/"+(options.IE?"gen":"g2")+"/";
            resObj.images.forEach(function (im) {
                // ADDED in BA
                if (im.url==="${runtime}images/Sample.png") {
                    im.url="images/Sample.png";
                    buf+=`<script src="${scriptServer}images/Sample.png.js"></script>\n`;
                }
                // ---/ADDED
                if (WebSite.builtinAssetNames[im.url]) {
                    buf+='<script src="'+scriptServer+im.url+'.js"></script>\n';
                }
            });
            replacedFiles[resFile.path()]=JSON.stringify(resObj);
            buf+='<script src="'+scriptServer+'js/lib/jquery-1.10.1.js" type="text/javascript"></script>\n';
            buf+='<script src="'+genPath+'runScript_concat.min.js" type="text/javascript"></script>\n';
            if (!options.IE) {
                buf+=`<script src="${scriptServer}js/runtime/detectUnsupported.js"></script>`;
            }
        }
        var binary=[],json=[];
        //dir=FS.get(dir);
        dir.recursive(function (f) {
            var rel=f.relPath(dir);
            if (excludes[rel]) return;
            if (f.endsWith(".json") && rel.indexOf("maps/")<0) {
                json.push(f);
                return;
            } else if (f.endsWith(".desktop")) {
                return;
            } else if (f.endsWith(".js.map")) {
                return;
            } else if (f.endsWith(".js")) {
                return;
            } else if (!f.endsWith(".tonyu")) {
                binary.push(f);
                return;
            }
            //var name=f.truncExt(".tonyu");
            //var m="";//(name==main?" data-main='true'":"");
            var lu=" data-lastupdate='"+f.lastUpdate()+"' ";
            buf+="<script language='text/tonyu' type='text/tonyu' data-filename='"+rel+"'"+lu+">";
            buf+=escapeLoosely(ft(f));
            buf+="</script>\n\n";
        },{excludes:["files/",".sync/"]});
        json.forEach(function (f) {
            var rel=f.relPath(dir);
            var lu=" data-lastupdate='"+f.lastUpdate()+"' ";
            buf+="<script language='text/tonyu' type='text/tonyu' data-filename='"+rel+"'"+lu+">\n";
            buf+=beautifyJSON(ft(f));
            buf+="</script>\n\n";
        });
        binary.forEach(function (f) {
            var rel=f.relPath(dir);
            var lu=" data-lastupdate='"+f.lastUpdate()+"' ";
            buf+="<script language='text/tonyu' type='text/tonyu' data-filename='"+rel+"' data-wrap='80'"+lu+">";
            buf+=wrap(ft(f),80);
            buf+="</script>\n\n";
        });
        buf+="</head><body>"+(options.splashElement||splashElement)+"</body></html>";
        return buf;
        function wrap(str, cols) {
            var lines=str.split("\n");
            var buf="";
            lines.forEach(function (line) {
                while (true) {
                    if (line.length>cols) {
                        buf+=line.substring(0,cols)+"\\\n";
                        line=line.substring(cols);
                    } else {
                        buf+=line+"\n";
                        break;
                    }
                }
                return buf;
            });
            return buf;
        }
        function beautifyJSON(str) {
            try {
                var o=JSON.parse(str);
                return JSON.stringify(o,null,4);
            }catch(e) {
                return str;
            }
        }
    };
    function escapeLoosely(text) {
        text=text.replace(/&(#?[\w\d]+;)/g, function (_,a){
            return "&amp;"+a;
        });
        text=text.replace(/<(\s*)\/(\s*)script(\s*)>/ig,function (_,s1,s2,s3) {
            return "&lt;"+s1+"/"+s2+"script"+s3+"&gt;" ;
        });
        return text;
    }
    return east;
});
