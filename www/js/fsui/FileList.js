define (["FS","root"],function(FS,root) {
function FileList(elem, options) {
    var _curDir=null;
    var _curFile=null;
    var _mod=false;
    var selbox=elem[0].tagName.toLowerCase()=="select";
    //console.log(elem);
    if (!options) options={};
    var FL={select:select, ls:ls, on:(options.on?options.on:{}), curFile:curFile, curDir: curDir,
    		setModified:setModified, isModified:isModified,elem:elem, selectNext};
    var path=$("<div>");
    var items=$("<div>");
    if (!selbox) elem.append(path).append(items);
    else elem.change(function () {
        if(this.value) select(FS.get(this.value));
    });
    function item(f) {
    	var res=$();
    	if (!f) return res;
    	var fn=f.path();
    	items.find(selbox?"option":"span").each(function () {
    		var t=$(this);
    		if ( t.data("filename")==fn) {
    			res=t;
    		}
    	});
    	return res;
    }
    function select(f) {
        if (FL.on.select && FL.on.select(f)) return;
        if (!f) return;
        _mod=false;
        if (f.isDir()) {
            //_curFile=null;
            ls(f);
        } else {
            var nDir=f.up();
            if (_curDir.path()!=nDir.path() ) {
                _curFile=f;
                ls(nDir);
            } else {
                item(_curFile).removeClass("selected");
                _curFile=f;
                item(_curFile).addClass("selected");
            }
        }
    }
    function selectNext() {
        let doNext;
        items.find(selbox?"option":"span").each(function () {
    		var t=$(this);
    		if ( t.data("filename")==_curFile.path()) {
                doNext=true;
    		} else if (doNext) {
                doNext=false;
                select(FS.get(t.data("filename")));
            }
    	});
    }
    function setModified(m) {
    	if (!_curFile) return;
    	_mod=m;
       	item(_curFile).text(itemText(_curFile.name(),m));
    }
    function isModified() {
    	return _mod;
    }
    const orderBy={
        latest(a,b) {
            if(a.lastUpdate>b.lastUpdate){
                return -1;
            }else if(a.lastUpdate<b.lastUpdate){
                return 1;
            }
            return 0;
        },
        name(a,b) {
            if (a.name>b.name) return 1;
            else if (a.name<b.name) return -1;
            else return 0;
        }
    };
    function ls(dir, order="latest") {
        if (typeof dir=="string") dir=FS.get(dir);
        if (dir) {
            _curDir=dir;
            path.text(dir.name()).attr({title:dir.path()});
        }
        if (!_curDir) return;
        if (!_curDir.isDir()) return;
        items.empty();
        if (selbox) {
            elem.empty();
            elem.append($("<option>").text("Select..."));
        }
        var p=_curDir.up();
        if (p && !_curDir.equals(options.topDir)) {
            if (selbox) {
                elem.append($("<option>").
                        attr("value",p.path()).
                        text("[Up]")
                );
            } else {
                $(selbox?"<option>":"<li>").append(
                        $("<span>").addClass("fileItem").text("[Up]")
                ).appendTo(items).click(function () {
                    select(p);
                });
            }
        }
        if (_curFile && !_curFile.exists()) {
            _curFile=null;
        }
        var disped={};
        var tr=_curDir.getDirTree({style:"no-recursive"});
        var tra=[];
        for (var k in tr) { tra.push({name:k,lastUpdate:tr[k].lastUpdate}); }
        tra=tra.sort(orderBy[order]||orderBy.latest);
        //console.log(tra);
        var dirPath=_curDir.path();
        var P=FS.PathUtil;
        tra.forEach(function (e) {
            var n=displayName(e.name);
            var path=P.rel(dirPath,e.name);
            //console.log(f.name(),n);
            if (!n) return;
            if (disped[n]) return;
            disped[n]=true;
            var isCur=_curFile && _curFile.path()==path;
            if (selbox) {
                elem.append($("<option>").
                        attr("value",path).
                        text(itemText(e.name))
                );
            } else {
                var s=$("<span>").addClass("fileItem").text(itemText(e.name)).data("filename",path);
                if (isCur) { s.addClass("selected");}
                $("<li>").append(s).appendTo(items).click(function () {
                    var ff=FS.get(path);
                    select(ff);
                });
            }
        });
    }
    function itemText(fname, mod) {
    	return (mod?"*":"")+/*(f.isReadOnly()?"[RO]":"")+*/displayName(fname);
    }
    function displayName(fname) {
        if (FL.on.displayName) return FL.on.displayName.apply(FL, arguments );
        return fname;
    }
    function curFile() {
        return _curFile;
    }
    function curDir() {
        return _curDir;
    }
    return FL;
}
root.FileList=FileList;
return FileList;
});
