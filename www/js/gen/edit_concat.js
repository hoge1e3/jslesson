(function (){
/* global global, self */
(function () {
    // same with root.js
    function getRoot(){
        if (typeof window!=="undefined") return window;
        if (typeof self!=="undefined") return self;
        if (typeof global!=="undefined") return global;
        return (function (){return this;})();
    }
    var root=getRoot();

class QueryString {
    constructor(url) {
        this.url=url || location.href;
    }
    get(param, def) {
        if (arguments.length<2) {
            return getQueryString2(this.url, param);
        }
        return getQueryString2(this.url, param, def);
    }
    put(param, value) {
        if (typeof param=="object") {
            let res=this;
            for (let k of Object.keys(param)) {
                res=res.put(k, param[k]);
            }
            return res;
        }
        return new QueryString(setQueryString(this.url, param, value));
    }
    delete(param) {
        let regex = keyValueRegex(param);
        let m=regex.exec(this.url);
        if (!m) return this;
        let repl=this.url.replace(regex,"");
        if (repl.indexOf("?")<0 && repl.indexOf("&")>=0) {
            //  ?a=b&c=d
            // delete a
            //  &c=d
            //  ?c=d
            repl=repl.replace(/&/,"?");
        }
        return new QueryString(repl);
    }
    paramPart() {
        let url=this.url;
        let i=url.indexOf("?");
        if (i<0) return "";
        return url.substring(i+1);
    }
}
function keyValueRegex(key) {
    let keyr = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    let regex = new RegExp(`([\\?&])${keyr}=([^&#]*)`);
    return regex;
}
function setQueryString(url, key, value){
    let regex = keyValueRegex(key);
    if (!url.match(regex)) {
        //console.log("A");
        return `${url}${url.indexOf("?")>=0 ? "&" : "?"}${key}=${encodeURIComponent(value)}`;
    }
    //console.log("B");
    return url.replace(regex, (_,sp)=> `${sp}${key}=${encodeURIComponent(value)}`);
}
function getQueryString2(url, key, default_){
    const throwIfMissing=(arguments.length<3);
    if (default_==null) default_="";
    let regex = keyValueRegex(key);
    var qs = regex.exec(url);
    if(qs == null){
        if (throwIfMissing) throw new Error(`Missing parameter: ${key}`);
        return default_;
    } else {
        return decodeURLComponentEx(qs[2]);
    }
}


function getQueryString(key, default_)
{
    if (arguments.length===1) default_="";
    if (typeof root.LocalBrowserInfo==="object") {
        return key in root.LocalBrowserInfo.params? root.LocalBrowserInfo.params[key] : default_;
    }
   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
   var qs = regex.exec(root.location.href);
   if(qs == null)
    return default_;
   else
    return decodeURLComponentEx(qs[1]);
}
function decodeURLComponentEx(s){
    return decodeURIComponent(s.replace(/\+/g, '%20'));
}
function endsWith(str,postfix) {
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    return str.substring(0, prefix.length)===prefix;
}
function extend(d,s) {
    for (var i in (s||{})) {d[i]=s[i];}
    return d;
}
// From http://hakuhin.jp/js/base64.html#BASE64_DECODE_ARRAY_BUFFER
function Base64_To_ArrayBuffer(base64){
    base64=base64.replace(/[\n=]/g,"");
    var dic = {};
    dic[0x41]= 0; dic[0x42]= 1; dic[0x43]= 2; dic[0x44]= 3; dic[0x45]= 4; dic[0x46]= 5; dic[0x47]= 6; dic[0x48]= 7; dic[0x49]= 8; dic[0x4a]= 9; dic[0x4b]=10; dic[0x4c]=11; dic[0x4d]=12; dic[0x4e]=13; dic[0x4f]=14; dic[0x50]=15;
    dic[0x51]=16; dic[0x52]=17; dic[0x53]=18; dic[0x54]=19; dic[0x55]=20; dic[0x56]=21; dic[0x57]=22; dic[0x58]=23; dic[0x59]=24; dic[0x5a]=25; dic[0x61]=26; dic[0x62]=27; dic[0x63]=28; dic[0x64]=29; dic[0x65]=30; dic[0x66]=31;
    dic[0x67]=32; dic[0x68]=33; dic[0x69]=34; dic[0x6a]=35; dic[0x6b]=36; dic[0x6c]=37; dic[0x6d]=38; dic[0x6e]=39; dic[0x6f]=40; dic[0x70]=41; dic[0x71]=42; dic[0x72]=43; dic[0x73]=44; dic[0x74]=45; dic[0x75]=46; dic[0x76]=47;
    dic[0x77]=48; dic[0x78]=49; dic[0x79]=50; dic[0x7a]=51; dic[0x30]=52; dic[0x31]=53; dic[0x32]=54; dic[0x33]=55; dic[0x34]=56; dic[0x35]=57; dic[0x36]=58; dic[0x37]=59; dic[0x38]=60; dic[0x39]=61; dic[0x2b]=62; dic[0x2f]=63;
    var num = base64.length;
    var n = 0;
    var b = 0;
    var e;

    if(!num) return (new ArrayBuffer(0));
    //if(num < 4) return null;
    //if(num % 4) return null;

    // AA     12    1
    // AAA    18    2
    // AAAA   24    3
    // AAAAA  30    3
    // AAAAAA 36    4
    // num*6/8
    e = Math.floor(num / 4 * 3);
    if(base64.charAt(num - 1) == '=') e -= 1;
    if(base64.charAt(num - 2) == '=') e -= 1;

    var ary_buffer = new ArrayBuffer( e );
    var ary_u8 = new Uint8Array( ary_buffer );
    var i = 0;
    var p = 0;
    while(p < e){
        b = dic[base64.charCodeAt(i)];
        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i));//return null;
        n = (b << 2);
        i ++;

        b = dic[base64.charCodeAt(i)];
        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i));
        ary_u8[p] = n | ((b >> 4) & 0x3);
        n = (b & 0x0f) << 4;
        i ++;
        p ++;
        if(p >= e) break;

        b = dic[base64.charCodeAt(i)];
        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i));
        ary_u8[p] = n | ((b >> 2) & 0xf);
        n = (b & 0x03) << 6;
        i ++;
        p ++;
        if(p >= e) break;

        b = dic[base64.charCodeAt(i)];
        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i));
        ary_u8[p] = n | b;
        i ++;
        p ++;
    }
    function fail(m) {
        console.log(m);
        console.log(base64,i);
        throw new Error(m);
    }
    return ary_buffer;
}

function Base64_From_ArrayBuffer(ary_buffer){
    var dic = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
        'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
        'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
        'w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/'
    ];
    var base64 = "";
    var ary_u8 = new Uint8Array( ary_buffer );
    var num = ary_u8.length;
    var n = 0;
    var b = 0;

    var i = 0;
    while(i < num){
        b = ary_u8[i];
        base64 += dic[(b >> 2)];
        n = (b & 0x03) << 4;
        i ++;
        if(i >= num) break;

        b = ary_u8[i];
        base64 += dic[n | (b >> 4)];
        n = (b & 0x0f) << 2;
        i ++;
        if(i >= num) break;

        b = ary_u8[i];
        base64 += dic[n | (b >> 6)];
        base64 += dic[(b & 0x3f)];
        i ++;
    }

    var m = num % 3;
    if(m){
        base64 += dic[n];
    }
    if(m == 1){
        base64 += "==";
    }else if(m == 2){
        base64 += "=";
    }
    return base64;
}

function privatize(o){
    if (o.__privatized) return o;
    var res={__privatized:true};
    function add(n) {
        var m=o[n];
        if (n.match(/^_/)) return;
        if (typeof m!="function") return;
        res[n]=function () {
            var r=m.apply(o,arguments);
            return r;
        };
    }
    for (var n in o) {
        add(n);
    }
    return res;
}
/*
function hasNodeBuffer() {
    return typeof Buffer!="undefined";
}
function isNodeBuffer(data) {
    return (hasNodeBuffer() && data instanceof Buffer);
}
function isBuffer(data) {
    return data instanceof ArrayBuffer || isNodeBuffer(data);
}
function utf8bytes2str(bytes) {
    var e=[];
    for (var i=0 ; i<bytes.length ; i++) {
         e.push("%"+("0"+bytes[i].toString(16)).slice(-2));
    }
    try {
        return decodeURIComponent(e.join(""));
    } catch (er) {
        console.log(e.join(""));
        throw er;
    }
}
function str2utf8bytes(str, binType) {
    var e=encodeURIComponent(str);
    var r=/^%(..)/;
    var a=[];
    var ad=0;
    for (var i=0 ; i<e.length; i++) {
        var m=r.exec( e.substring(i));
        if (m) {
            a.push(parseInt("0x"+m[1]));
            i+=m[0].length-1;
        } else a.push(e.charCodeAt(i));
    }
    return (typeof Buffer!="undefined" && binType===Buffer ? new Buffer(a) : new Uint8Array(a).buffer);
}
*/
root.Util={
    root:root,
    getQueryString:getQueryString,
    endsWith: endsWith, startsWith: startsWith,
    Base64_To_ArrayBuffer:Base64_To_ArrayBuffer,
    Base64_From_ArrayBuffer:Base64_From_ArrayBuffer,
    //utf8bytes2str: utf8bytes2str,
    //str2utf8bytes: str2utf8bytes,
    privatize: privatize,
    extend:extend,
    QueryString,
    /*hasNodeBuffer:hasNodeBuffer,
    isNodeBuffer: isNodeBuffer,
    isBuffer: isBuffer*/
};
return root.Util;
})();

define("Util", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Util;
    };
}(this)));

// This is kowareta! because r.js does not generate module name:
//   define("FSLib",[], function () { ...
/*
(function (d,f) {
module.exports=f();
}) 
*/
define('FSLib',[],function () {
    var define,requirejs;
	var R={};
	var REQJS="REQJS_";
	var reqjsSeq=0;
	R.def=function (name, reqs,func) {
		var m=R.getModuleInfo(name);
		if (typeof reqs=="function") {
		    func=reqs;
		    reqs=R.reqsFromFunc(func);
    		R.setReqs( m, reqs);
    		m.func=function () {
    		    var module={exports:{}};
    			var res=func(R.doLoad,module,module.exports);
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
define('extend',[],function (){
   return function extend(d,s) {
      for (var i in s) {d[i]=s[i];}
      return d;
   };
});

define('assert',[],function () {
    var Assertion=function(failMesg) {
        this.failMesg=flatten(failMesg || "Assertion failed: ");
    };
    var $a;
    Assertion.prototype={
        _regedType:{},
        registerType: function (name,t) {
            this._regedType[name]=t;
        },
        MODE_STRICT:"strict",
        MODE_DEFENSIVE:"defensive",
        MODE_BOOL:"bool",
        fail:function () {
            var a=$a(arguments);
            var value=a.shift();
            a=flatten(a);
            a=this.failMesg.concat(value).concat(a);//.concat(["(mode:",this._mode,")"]);
            console.log.apply(console,a);
            if (this.isDefensive()) return value;
            if (this.isBool()) return false;
            throw new Error(a.join(" "));
        },
        subAssertion: function () {
            var a=$a(arguments);
            a=flatten(a);
            return new Assertion(this.failMesg.concat(a));
        },
        assert: function (t,failMesg) {
            if (!t) return this.fail(t,failMesg);
            return t;
        },
        eq: function (a,b) {
            if (a!==b) return this.fail(a,"!==",b);
            return this.isBool()?true:a;
        },
        ne: function (a,b) {
            if (a===b) return this.fail(a,"===",b);
            return this.isBool()?true:a;
        },
        isset: function (a, n) {
            if (a==null) return this.fail(a, (n||"")+" is null/undef");
            return this.isBool()?true:a;
        },
        is: function (value,type) {
            var t=type,v=value;
            if (t==null) {
                return this.fail(value, "assert.is: type must be set");
                // return t; Why!!!!???? because is(args,[String,Number])
            }
            if (t._assert_func) {
                t._assert_func.apply(this,[v]);
                return this.isBool()?true:value;
            }
            this.assert(value!=null,[value, "should be ",t]);
            if (t instanceof Array || (typeof global=="object" && typeof global.Array=="function" && t instanceof global.Array) ) {
                if (!value || typeof value.length!="number") {
                    return this.fail(value, "should be array:");
                }
                var self=this;
                for (var i=0 ;i<t.length; i++) {
                    var na=self.subAssertion("failed at ",value,"[",i,"]: ");
                    if (t[i]==null) {
                        console.log("WOW!7", v[i],t[i]);
                    }
                    na.is(v[i],t[i]);
                }
                return this.isBool()?true:value;
            }
            if (t===String || t=="string") {
                this.assert(typeof(v)=="string",[v,"should be a string "]);
                return this.isBool()?true:value;
            }
            if (t===Number || t=="number") {
                this.assert(typeof(v)=="number",[v,"should be a number"]);
                return this.isBool()?true:value;
            }
            if (t===Boolean || t=="boolean") {
                this.assert(typeof(v)=="boolean",[v,"should be a boolean"]);
                return this.isBool()?true:value;
            }
            if (t instanceof RegExp || (typeof global=="object" && typeof global.RegExp=="function" && t instanceof global.RegExp)) {
                this.is(v,String);
                this.assert(t.exec(v),[v,"does not match to",t]);
                return this.isBool()?true:value;
            }
            if (t===Function) {
                this.assert(typeof v=="function",[v,"should be a function"]);
                return this.isBool()?true:value;
            }
            if (typeof t=="function") {
                this.assert((v instanceof t),[v, "should be ",t]);
                return this.isBool()?true:value;
            }
            if (t && typeof t=="object") {
                for (var k in t) {
                    var na=this.subAssertion("failed at ",value,".",k,":");
                    na.is(value[k],t[k]);
                }
                return this.isBool()?true:value;
            }
            if (typeof t=="string") {
                var ty=this._regedType[t];
                if (ty) return this.is(value,ty);
                //console.log("assertion Warning:","unregistered type:", t, "value:",value);
                return this.isBool()?true:value;
            }
            return this.fail(value, "Invaild type: ",t);
        },
        ensureError: function (action, err) {
            try {
                action();
            } catch(e) {
                if(typeof err=="string") {
                    assert(e+""===err,action+" thrown an error "+e+" but expected:"+err);
                }
                console.log("Error thrown successfully: ",e.message);
                return;
            }
            this.fail(action,"should throw an error",err);
        },
        setMode:function (mode) {
            this._mode=mode;
        },
        isDefensive:function () {
            return this._mode===this.MODE_DEFENSIVE;
        },
        isBool:function () {
            return this._mode===this.MODE_BOOL;
        },
        isStrict:function () {
            return !this.isDefensive() && !this.isBool();
        }
    };
    $a=function (args) {
        var a=[];
        for (var i=0; i<args.length ;i++) a.push(args[i]);
        return a;
    };
    var top=new Assertion();
    var assert=function () {
        try {
            return top.assert.apply(top,arguments);
        } catch(e) {
            throw new Error(e.stack);
        }
    };
    ["setMode","isDefensive","is","isset","ne","eq","ensureError"].forEach(function (m) {
        assert[m]=function () {
            try {
                return top[m].apply(top,arguments);
            } catch(e) {
                console.log(e.stack);
                //if (top.isDefensive()) return arguments[0];
                //if (top.isBool()) return false;
                throw new Error(e.message);
            }
        };
    });
    assert.fail=top.fail.bind(top);
    assert.MODE_STRICT=top.MODE_STRICT;
    assert.MODE_DEFENSIVE=top.MODE_DEFENSIVE;
    assert.MODE_BOOL=top.MODE_BOOL;
    assert.f=function (f) {
        return {
            _assert_func: f
        };
    };
    assert.opt=function (t) {
        return assert.f(function (v) {
            return v==null || v instanceof t;
        });
    };
    assert.and=function () {
        var types=$a(arguments);
        assert(types instanceof Array);
        return assert.f(function (value) {
            var t=this;
            for (var i=0; i<types.length; i++) {
                t.is(value,types[i]);
            }
        });
    };
    function flatten(a) {
        if (a instanceof Array) {
            var res=[];
            a.forEach(function (e) {
                res=res.concat(flatten(e));
            });
            return res;
        }
        return [a];
    }
    function isArg(a) {
        return "length" in a && "caller" in a && "callee" in a;
    };
    return assert;
});

define('PathUtil',["assert"],function (assert) {
function endsWith(str,postfix) {
    assert.is(arguments,[String,String]);
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    assert.is(arguments,[String,String]);
    return str.substring(0, prefix.length)===prefix;
}
var driveLetter=/^([a-zA-Z]):/;
// hyphen on protocol -> chrome-extension://....
var url=/^([a-z\-]+):\/\/\/?([^\/]+)\//;
var PathUtil;
var Path=assert.f(function (s) {
    this.is(s,String);
    this.assert( PathUtil.isPath(s) , [s, " is not a path"]);
});
var Absolute=assert.f(function (s) {
    this.is(s,String);
    this.assert( PathUtil.isAbsolutePath(s) , [s, " is not a absolute path"]);
});
var Relative=assert.f(function (s) {
    this.is(s,String);
    this.assert( !PathUtil.isAbsolutePath(s) , [s, " is not a relative path"]);
});

var Dir=assert.f(function (s) {
    this.is(s,Path);
    this.assert( PathUtil.isDir(s) , [s, " is not a directory path"]);
});
var AbsDir=assert.and(Dir,Absolute);
var File=assert.f(function (s) {
    this.is(s,Path);
    this.assert( !PathUtil.isDir(s) , [s, " is not a file path"]);
});

var SEP="/";
PathUtil={
    Path: Path,Absolute:Absolute, Relative:Relative, Dir:Dir,File:File,
    AbsDir:AbsDir,
    SEP: SEP,
    endsWith: endsWith, startsWith:startsWith,
    isChildOf: function(child, parent) {
        return this.startsWith( this.normalize(child), this.normalize(parent));
    },
    normalize: function (path) {
        return this.fixSep(path,"/").replace(/\/+$/,"/");
    },
    hasDriveLetter: function (path) {
        return driveLetter.exec(path);
    },
    isURL: function (path) {
        var r=url.exec(path);
        if (!r) return;
        return {protocol:r[1], hostPort:r[2], path:SEP+path.substring(r[0].length)  };
    },
    isPath: function (path) {
    	assert.is(arguments,[String]);
		return true;//!path.match(/\/\//);
    },
    isRelativePath: function (path) {
		assert.is(arguments,[String]);
		return PathUtil.isPath(path) && !PathUtil.isAbsolutePath(path);
    },
    isAbsolutePath: function (path) {
		assert.is(arguments,[String]);
		return PathUtil.isPath(path) &&
		(PathUtil.startsWith(path,SEP) || PathUtil.hasDriveLetter(path) ||  PathUtil.isURL(path));
    },
    isDir: function (path) {
        path=PathUtil.fixSep(path);
		assert.is(arguments,[Path]);
        return endsWith(path,SEP);
    },
    hasBackslashSep:function (path) {
        return path.indexOf("\\")>=0;
    },
    fixSep: function (path,to) {
        to=to||"/";
        assert.is(arguments,[String]);
        return assert.is( path.replace(/[\\\/]/g,to), Path);
    },
    directorify: function (path) {
        //path=PathUtil.fixSep(path);
        if (PathUtil.isDir(path)) return path;
        return assert.is(path+SEP, Dir);
    },
    filify: function (path) {
        //path=PathUtil.fixSep(path);
        if (!PathUtil.isDir(path)) return path;
        return assert.is(path.substring(0,path.length-1),File);
    },
	splitPath: function (path) {
		assert.is(arguments,[Path]);
		var u;
		if (u=this.isURL(path)) {
		    var p=this.splitPath(u.path);
		    p[0]=u.protocol+"://"+u.hostPort;
		    return p;
		}
		path=path.replace(/\/+/g,SEP);
	    var res=path.split(SEP);
        if (res[res.length-1]=="") {
            res[res.length-2]+=SEP;
            res.pop();
        }
        return res;
    },
    name: function(path) {
		assert.is(arguments,[String]);
        return PathUtil.splitPath(path).pop();
    },
    ext: function(path) {
		assert.is(arguments,[String]);
        var n = PathUtil.name(path);
        var r = (/\.[a-zA-Z0-9]+$/).exec(n);
        if (r) return r[0];
        return null;
    },
    truncExt: function(path, ext) {
		assert.is(path,String);
        var name = PathUtil.name(path);
        ext=ext || PathUtil.ext(path);
        assert.is(ext,String);
        return name.substring(0, name.length - ext.length);
    },
    truncSEP: function (path) {
		assert.is(arguments,[Path]);
		if (!PathUtil.isDir(path)) return path;
		return path.substring(0,path.length-1);
    },
    endsWith: function(path, postfix) {
		assert.is(arguments,[String,String]);
        return endsWith(PathUtil.name(path), postfix);
    },
    parent: function(path) {
		assert.is(arguments,[String]);
        return PathUtil.up(path);
    },
    rel: function(path,relPath) {
        if (relPath=="") return path;
		assert.is(arguments,[AbsDir, Relative]);
    	var paths=PathUtil.splitPath(relPath);
        var resPath=path;
        resPath=resPath.replace(/\/$/,"");
        var t=PathUtil;
        paths.forEach(function (n) {
             if (n==".." || n=="../") resPath=t.up(resPath);
             else {
                 resPath=resPath.replace(/\/$/,"");
                 resPath+=SEP+(n=="."||n=="./" ? "": n);
             }
        });
        return resPath;
    },
    relPath: function(path,base) {
		assert.is(arguments,[Absolute,Absolute]);
        if (path.substring(0,base.length)!=base) {
            return "../"+PathUtil.relPath(path, this.up(base));
        }
        return path.substring(base.length);
    },
    up: function(path) {
        //path=PathUtil.fixSep(path);
        if (path==SEP) return null;
        var ps=PathUtil.splitPath(path);
        ps.pop();
        return ps.join(SEP)+SEP;
    }
};
["directorify", "filify", "splitPath", "name", "rel", "relPath", "up"].forEach(function (k) {
    var old=PathUtil[k];
    PathUtil[k]=function () {
        var backslashifyAfter=false;
        var a=Array.prototype.slice.call(arguments).map(function (e) {
            if (PathUtil.hasBackslashSep(e)) {
                backslashifyAfter=true;
                return PathUtil.fixSep(e);
            } else {
                return e;
            }
        });
        var res=old.apply(PathUtil,a);
        if (backslashifyAfter) {
            return PathUtil.fixSep(res,"\\");
        } else {
            return res;
        }
    };
});

PathUtil.isAbsolute=PathUtil.isAbsolutePath;
PathUtil.isRelative=PathUtil.isRelativePath;
if (typeof window=="object") window.PathUtil=PathUtil;
return PathUtil;
});

define('MIMETypes',[], function () {
   return {
      ".png":"image/png",
      ".gif":"image/gif",
      ".jpeg":"image/jpeg",
      ".jpg":"image/jpeg",
      ".ico":"image/icon",
      ".wav":"audio/x-wav",
      ".mp3":"audio/mp3",
      ".ogg":"audio/ogg",
      ".midi":"audio/midi",
      ".mid":"audio/midi",
      ".mzo":"audio/mzo",
      ".txt":"text/plain",
      ".html":"text/html",
      ".htm":"text/html",
      ".css":"text/css",
      ".js":"text/javascript",
      ".json":"text/json",
      ".zip":"application/zip",
      ".swf":"application/x-shockwave-flash",
      ".pdf":"application/pdf",
      ".doc":"application/word",
      ".xls":"application/excel",
      ".ppt":"application/powerpoint",
      '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.docm':'application/vnd.ms-word.document.macroEnabled.12',
      '.dotx':'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
      '.dotm':'application/vnd.ms-word.template.macroEnabled.12',
      '.xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.xlsm':'application/vnd.ms-excel.sheet.macroEnabled.12',
      '.xltx':'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
      '.xltm':'application/vnd.ms-excel.template.macroEnabled.12',
      '.xlsb':'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
      '.xlam':'application/vnd.ms-excel.addin.macroEnabled.12',
      '.pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      '.pptm':'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
      '.potx':'application/vnd.openxmlformats-officedocument.presentationml.template',
      '.potm':'application/vnd.ms-powerpoint.template.macroEnabled.12',
      '.ppsx':'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
      '.ppsm':'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
      '.ppam':'application/vnd.ms-powerpoint.addin.macroEnabled.12',
      ".tonyu":"text/tonyu",
      ".c":"text/c",
      ".dtl":"text/dolittle"
   };
});

define('DeferredUtil',[], function () {
    var root=(
        typeof window!=="undefined" ? window :
        typeof self!=="undefined" ? self :
        typeof global!=="undefined" ? global : null
    );
    //  promise.then(S,F)  and promise.then(S).fail(F) is not same!
    //  ->  when fail on S,  F is executed?
    //   same is promise.then(S).then(same,F)
    var DU;
    var DUBRK=function(r){this.res=r;};
    function same(e){return e;}
    DU={
        isNativePromise: function (p) {
            return p && (typeof p.then==="function") &&
            (typeof p.promise!=="function") && (typeof p.catch==="function") ;
        },
        isJQPromise: function (p) {
            return p && (typeof p.then==="function") &&
            (typeof p.promise==="function") &&(typeof p.fail==="function") ;
        },
        isPromise: function (p) {
            return p && (typeof p.then==="function") &&
            ((typeof p.promise==="function") || (typeof p.catch==="function")) ;
        },
        all: function (a) {
            //var a=Array.prototype.slice.call(arguments);
            return DU.promise(function (succ,fail) {
                var res=[],rest=a.length;
                a.forEach(function (p, i) {
                    DU.resolve(p).then(function (r) {
                        res[i]=r;
                        rest--;
                        if (rest===0) {
                            succ(res);
                        }
                    },fail);
                });
            });
        },
        resolve: function (p) {
            if (DU.config.useJQ && DU.isJQPromise(p)) return p;
            if (!DU.config.useJQ && DU.isNativePromise(p)) return p;
            return DU.promise(function (succ,fail) {
                if (DU.isPromise(p)) {
                    p.then(succ,fail);
                } else {
                    succ(p);
                }
            });
            /*if (DU.isPromise(p)) { // NO! it returns Promise when using JQPromise and vise versa.
                return f;
            }
            if (DU.confing.useJQ) {
                return $.when(p);
            }*/
        },
        throwNowIfRejected: function (p) {
            // If Promise p has already rejected, throws the rejeceted reason immediately.
            var state;
            var err;
            var res=p.then(function (r) {
                if (!state) {
                    state="resolved";
                }
                return r;
            },function (e) {
                if (!state) {
                    state="rejected";
                    err=e;
                } else {
                    return DU.reject(e);
                }
            });
            if (!state) state="notyet";
            if (state==="rejected") throw err;
            return res;
        },
        assertResolved: function (p) {
            var res,resolved;
            p.then(function (r) {
                res=r;
                resolved=true;
            });
            if (!resolved) {
                throw new Error("Promise not resolved");
            }
            return res;
        },
        /*toJQPromise: function (p) {// From native Promise
            if (!p) return $.when(p);
            if ($.isFunction(p.promise)) return p;
            if (!$.isFunction(p.then) || !$.isFunction(p.catch)) return $.when(p);
            var d=new $.Deferred();
            p.then(function (r) {
                d.resolve(r);
            }).catch(function (r) {
                d.reject(r);
            });
            return d.promise();
        },*/
        ensureDefer: function (v) {
            return DU.promise(function (resolve,reject) {
                var isDeferred;
                DU.resolve(v).then(function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            resolve(r);
                        },0);
                    } else {
                        resolve(r);
                    }
                }).then(same,function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            reject(r);
                        },0);
                    } else {
                        reject(r);
                    }
                });
                isDeferred=true;
            });
        },
        directPromise:function (v) {
            return DU.timeout(v,0);
        },
        then: function (f) {
            return DU.directPromise().then(f);
        },
        timeout:function (timeout,value) {
            return DU.promise(function (resolve) {
                setTimeout(function () {resolve(value);},timeout||0);
            });
        },
        funcPromise:function (f) {
            if (DU.config.useJQ) {
                var d=new $.Deferred();
                try {
                    f(function (v) {
                        d.resolve(v);
                    },function (e) {
                        d.reject(e);
                    });
                }catch(e) {
                    d.reject(e);
                }
                return d.promise();
            } else if (DU.external.Promise) {
                return new DU.external.Promise(function (resolve,reject) {
                    try {
                        f(resolve,reject);
                    }catch(e) {
                        reject(e);
                    }
                });
            } else {
                throw new Error("promise is not found");
            }
        },
        reject: function (e) {
            if (DU.config.useJQ) {
                var d=new $.Deferred();
                d.reject(e);
                return d.promise();
            } else {
                return new DU.external.Promise(function (s,rej) {
                    rej(e);
                });
            }
        },
        throwPromise:function (e) {
            if (DU.config.useJQ) {
                var d=new $.Deferred();
                setTimeout(function () {
                    d.reject(e);
                }, 0);
                return d.promise();
            } else {
                return new DU.external.Promise(function (s,rej) {
                    rej(e);
                });
            }
        },
        throwF: function (f) {
            return function () {
                try {
                    return f.apply(this,arguments);
                } catch(e) {
                    console.log(e,e.stack);
                    return DU.throwPromise(e);
                }
            };
        },
        each: function (set,f) {
            if (set instanceof Array) {
                return DU.loop(function (i) {
                    if (i>=set.length) return DU.brk();
                    return DU.resolve(f(set[i],i)).then(function () {
                        return i+1;
                    });
                },0);
            } else {
                var objs=[];
                for (var i in set) {
                    objs.push({k:i,v:set[i]});
                }
                return DU.each(objs,function (e) {
                    return f(e.k, e.v);
                });
            }
        },
        loop: function (f,r) {
            try {
                var err;
                while(true) {
                    if (r instanceof DUBRK) return DU.when1(r.res);
                    var deff1=true, deff2=false;
                    // ★ not deffered  ☆  deferred
                    var r1=f(r);
                    var dr=DU.resolve(r1).then(function (r2) {
                        r=r2;
                        deff1=false;
                        if (r instanceof DUBRK) return r.res;
                        if (deff2) return DU.loop(f,r); //☆
                    }).then(same,function (e) {
                        deff1=false;
                        err=e;
                    });
                    if (err) throw err;
                    deff2=true;
                    if (deff1) return dr;//☆
                    //★
                }
            }catch (e) {
                return DU.reject(e);
            }
        },
        brk: function (res) {
            return new DUBRK(res);
        },
        tryLoop: function (f,r) {
            return DU.loop(DU.tr(f),r);
        },
        tryEach: function (s,f) {
            return DU.loop(s,DU.tr(f));
        },
        documentReady:function () {
            return DU.callbackToPromise(function (s) {$(s);});
        },
        requirejs:function (modules) {
            if (!root.requirejs) throw new Error("requirejs is not loaded");
            return DU.callbackToPromise(function (s) {
                root.requirejs(modules,s);
            });
        }
    };
    DU.NOP=function (r) {return r;};
    DU.E=function () {
        console.log("DUE",arguments);
        DU.errorHandler.apply(DU,arguments);
    };
    DU.errorHandler=function (e) {
        console.error.apply(console,arguments);
        alert(e);
    };
    DU.setE=function (f) {
        DU.errorHandler=f;
    };
    DU.begin=DU.try=DU.tr=DU.throwF;
    DU.promise=DU.callbackToPromise=DU.funcPromise;
    DU.when1=DU.resolve;
    DU.config={};
    if (root.$ && root.$.Deferred) {
        DU.config.useJQ=true;
    }
    DU.external={Promise:root.Promise};
    if (!root.DeferredUtil) root.DeferredUtil=DU;
    return DU;
});

define('FSClass',["extend","PathUtil","MIMETypes","assert","DeferredUtil"],
function (extend, P, M,assert,DU){
    var FS=function () {
    };
    var fstypes={};
    FS.addFSType=function (name,fsgen) {
        fstypes[name]=fsgen;
    };
    FS.availFSTypes=function () {
        return fstypes;
    };
    function stub(n) {
        throw new Error (n+" is STUB!");
    }
    extend(FS.prototype, {
        err: function (path, mesg) {
            throw new Error(path+": "+mesg);
        },
        fstype:function () {
            return "Unknown";
        },
        isReadOnly: function (path, options) {// mainly for check ENTIRELY read only
            stub("isReadOnly");
        },
        supportsSync: function () {
            return true;
        },
        resolveFS:function (path, options) {
            assert(this.getRootFS()!==this);
            return this.getRootFS().resolveFS(path);
        },
        mounted: function (rootFS, mountPoint ) {
            //assert.is(arguments,[FS,P.AbsDir]);
            this.rootFS=rootFS;
            this.mountPoint=mountPoint;
        },
        inMyFS:function (path) {
            return !this.mountPoint || P.startsWith(path, this.mountPoint);
        },
        /*dirFromFstab: function (path, options) {
            assert.is(path, P.AbsDir);
            var res=(options||{}).res || [];
            this.fstab().forEach(function (tb) {
                if (P.up( tb.path )==path) res.push(P.name(tb.path));
            });
            return res;
        },*/
        getRootFS: function () {
            return assert( this.rootFS, "rootFS is not set" );
        },
        //-------- end of mouting
        //-------- spec
        getReturnTypes: function (path, options) {
            //{getContent:String|DataURL|ArrayBuffer|OutputStream|Writer
            //   ,opendir:Array|...}
            stub("");
        },
        //-------  for file
        getContent: function (path, options) {
            // options:{type:String|DataURL|ArrayBuffer|OutputStream|Writer}
            // succ : [type],
            stub("getContent");
        },
        size: function (path) {
            var c=this.getContent(path,{type:ArrayBuffer});
            var l=c.toBin().byteLength;
            return l;
        },
        getContentAsync: function (path, options) {
            if (!this.supportsSync()) stub("getContentAsync");
            return DU.resolve(this.getContent.apply(this,arguments));
        },
        setContent: function (path, content, options) {
            // content: String|ArrayBuffer|InputStream|Reader
            stub("");
        },
        setContentAsync: function (path, content, options) {
            var t=this;
            if (!t.supportsSync()) stub("setContentAsync");
            return DU.resolve(content).then(function (content) {
                return DU.resolve(t.setContent(path,content,options));
            });
        },
        appendContent: function (path, content, options) {
            //var nc=this.getContent(path,options).toPlainText()+content.toPlainText();
            //return this.setContent(path, Content.fromPlainText(nc) , options);
            stub("");
        },
        appendContentAsync: function (path, content, options) {
            var t=this;
            if (!t.supportsSync()) stub("appendContentAsync");
            return DU.resolve(content).then(function (content) {
                return DU.resolve(t.appendContent(path,content,options));
            });
        },
        getMetaInfo: function (path, options) {
            stub("");
        },
        setMetaInfo: function (path, info, options) {
            stub("");
        },
        mkdir: function (path, options) {
            stub("mkdir");
        },
        touch: function (path) {
            stub("touch");
        },
        exists: function (path, options) {
            // exists return false if path is existent by follwing symlink
            stub("exists");
        },
        opendir: function (path, options) {
            //ret: [String] || Stream<string> // https://nodejs.org/api/stream.html#stream_class_stream_readable
            stub("opendir");
        },
        opendirAsync: function (path, options) {
            if (!this.supportsSync()) stub("opendirAsync");
            return DU.resolve(this.opendir.apply(this,arguments));
        },
        cp: function(path, dst, options) {
            assert.is(arguments,[P.Absolute,P.Absolute]);
            this.assertExist(path);
            options=options||{};
            var srcIsDir=this.isDir(path);
            var dstfs=this.getRootFS().resolveFS(dst);
            var dstIsDir=dstfs.isDir(dst);
            if (!srcIsDir && !dstIsDir) {
                if (this.supportsSync() && dstfs.supportsSync()) {
                    var cont=this.getContent(path);
                    var res=dstfs.setContent(dst,cont);
                    if (options.a) {
                        dstfs.setMetaInfo(dst, this.getMetaInfo(path));
                    }
                    return res;
                } else {
                    return dstfs.setContentAsync(
                            dst,
                            this.getContentAsync(path)
                    ).then(function (res) {
                        if (options.a) {
                            return dstfs.setMetaInfo(dst, this.getMetaInfo(path));
                        }
                        return res;
                    });
                }
            } else {
                throw new Error("only file to file supports");
            }
        },
        mv: function (path,to,options) {
            this.cp(path,to,options);
            return this.rm(path,{r:true});
        },
        rm:function (path, options) {
            stub("");
        },
        link: function (path, to, options) {
            throw new Error("ln "+to+" "+path+" : This FS not support link.");
        },
        getURL: function (path) {
            stub("");
        },
        onAddObserver: function (path) {
        }
    });
    //res=[]; for (var k in a) { res.push(k); } res;
    FS.delegateMethods=function (prototype,  methods) {
        for (var n in methods) {
            (function (n){
                assert.ne(n,"inMyFS");
                prototype[n]=function () {
                    var path=arguments[0];
                    assert.is(path,P.Absolute);
                    var fs=this.resolveFS(path);
                    //console.log(n, f.fs===this  ,f.fs, this);
                    if (fs!==this) {
                        console.log("Invoked for other fs",this.mountPoint, fs.mountPoint)
                        //arguments[0]=f.path;
                        return fs[n].apply(fs, arguments);
                    } else {
                        return methods[n].apply(this, arguments);
                    }
                };
            })(n);
        }
    };
    FS.delegateMethods(FS.prototype, {
        assertWriteable: function (path) {
            if (this.isReadOnly(path)) this.err(path, "read only.");
        },
        getContentType: function (path, options) {
            var e=(P.ext(path)+"").toLowerCase();
            return M[e] || (options||{}).def || "application/octet-stream";
        },
        getBlob: function (path, options) {
            var c=this.getContent(path);
            options=options||{};
            options.blobType=options.blobType||Blob;
            options.binType=options.binType||ArrayBuffer;
            if (c.hasPlainText()) {
                return new options.blobType([c.toPlainText()],this.getContentType(path));
            } else {
                return new options.blobType([c.toBin(options.binType)],this.getContentType(path));
            }
        },
        isText:function (path) {
            var m=this.getContentType(path);
            return P.startsWith( m, "text");
        },
        assertExist: function (path, options) {
            if (!this.exists(path, options)) {
                this.err(path, ": No such "+(P.isDir(path)?"directory":"file"));
            }
        },
        isDir: function (path,options) {
            return P.isDir(path);
        },
        find: function (path, options) {
            assert.is(arguments,[P.Absolute]);
            var ls=this.opendir(path, options);
            var t=this;
            var res=[path];
            ls.forEach(function (e) {
                var ep=P.rel(path, e);
                if (P.isDir(ep)) {
                    var fs=t.resolveFS(ep);
                    res=res.concat(
                            fs.find( ep ,options)
                    );
                } else {
                    res.push( ep );//getPathFromRootFS
                }
            });
            return res;
        },
        resolveLink: function (path) {
            assert.is(path,P.Absolute);
            // returns non-link path
            // ln -s /a/b/ /c/d/
            // resolveLink /a/b/    ->  /a/b/
            // resolveLink /c/d/e/f -> /a/b/e/f
            // resolveLink /c/d/non_existent -> /a/b/non_existent
            // isLink      /c/d/    -> /a/b/
            // isLink      /c/d/e/f -> null
            // ln /testdir/ /ram/files/
            // resolveLink /ram/files/sub/test2.txt -> /testdir/sub/test2.txt
            // path=/ram/files/test.txt
            for (var p=path ; p ; p=P.up(p)) {
                assert(!this.mountPoint || P.startsWith(p, this.mountPoint), p+" is out of mountPoint. path="+path);
                var l=this.isLink(p);  // p=/ram/files/ l=/testdir/
                if (l) {
                    assert(l!=p,"l==p=="+l);
                    //        /testdir/    test.txt
                    var np=P.rel(l,P.relPath(path, p));  //   /testdir/test.txt
                    assert(np!=path,"np==path=="+np);
                    return assert.is(this.getRootFS().resolveFS(np).resolveLink(np),P.Absolute)  ;
                }
                if (this.exists(p)) return path;
            }
            return path;
        },
        isLink: function (path) {
            return null;
        },
        opendirEx: function (path, options) {
            assert.is(path, P.AbsDir);
            var ls=this.opendir(path);
            var t=this;
            var dest={};
            ls.forEach(function (f) {
                var p=P.rel(path,f);
                dest[f]=t.getMetaInfo(p);
            });
            return dest;
        },
        getDirTree: function (path, options) {
            options=options||{};
            var dest=options.dest=options.dest||{};
            options.style=options.style||"flat-absolute";
            options.excludes=options.excludes||[];
            assert.is(options.excludes,Array);
            if (!options.base) {
                options.base=path;
            }
            assert.is(path, P.AbsDir);
            var tr=this.opendirEx(path,options);
            if (options.style=="no-recursive") return tr;
            var t=this;
            for (var f in tr) {
                var meta=tr[f];
                var p=P.rel(path,f);
                var relP=P.relPath(p,options.base);
                switch(options.style) {
                    case "flat-relative":
                    case "hierarchical":
                        if (options.excludes.indexOf(relP)>=0) {
                            continue;
                        }
                        break;
                    case "flat-absolute":
                        if (options.excludes.indexOf(p)>=0) {
                            continue;
                        }
                        break;
                }
                if (t.isDir(p)) {
                    switch(options.style) {
                    case "flat-absolute":
                    case "flat-relative":
                        t.getDirTree(p,options);
                        break;
                    case "hierarchical":
                        options.dest={};
                        dest[f]=t.getDirTree(p,options);
                        break;
                    }
                } else {
                    switch(options.style) {
                    case "flat-absolute":
                        dest[p]=meta;
                        break;
                    case "flat-relative":
                        dest[relP]=meta;
                        break;
                    case "hierarchical":
                        dest[f]=meta;
                        break;
                    }
                }
            }
            return dest;
        }
        /*get: function (path) {
            assert.eq(this.resolveFS(path), this);
            return new SFile(this, path);
            //var r=this.resolveFS(path);
            //return new SFile(r.fs, r.path);
        }*/

    });
    return FS;
});

define('Util',[],function () {
function getQueryString(key, default_)
{
   if (default_==null) default_="";
   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
   var qs = regex.exec(window.location.href);
   if(qs == null)
    return default_;
   else
    return decodeURLComponentEx(qs[1]);
}
function decodeURLComponentEx(s){
    return decodeURIComponent(s.replace(/\+/g, '%20'));
}
function endsWith(str,postfix) {
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    return str.substring(0, prefix.length)===prefix;
}
function privatize(o){
    if (o.__privatized) return o;
    var res={__privatized:true};
    for (var n in o) {
        (function (n) {
            var m=o[n];
            if (n.match(/^_/)) return;
            if (typeof m!="function") return;
            res[n]=function () {
                var r=m.apply(o,arguments);
                return r;
            };
        })(n);
    }
    return res;
}
function extend(d,s) {
    for (var i in (s||{})) {d[i]=s[i];}
    return d;
}
return {
    getQueryString:getQueryString,
    endsWith: endsWith, startsWith: startsWith,
    privatize: privatize,extend:extend
};
});

/*
* FileSaver.js
* A saveAs() FileSaver implementation.
*
* By Eli Grey, http://eligrey.com
*
* License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
* source  : http://purl.eligrey.com/github/FileSaver.js
*/
define('FileSaver',[],function (){

// The one and only way of getting global scope in all environments
// https://stackoverflow.com/q/3277182/1008999
var _global = typeof window === 'object' && window.window === window
  ? window : typeof self === 'object' && self.self === self
  ? self : typeof global === 'object' && global.global === global
  ? global
  : this

function bom (blob, opts) {
  if (typeof opts === 'undefined') opts = { autoBom: false }
  else if (typeof opts !== 'object') {
    console.warn('Depricated: Expected third argument to be a object')
    opts = { autoBom: !opts }
  }

  // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
  }
  return blob
}

function download (url, name, opts) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    saveAs(xhr.response, name, opts)
  }
  xhr.onerror = function () {
    console.error('could not download file')
  }
  xhr.send()
}

function corsEnabled (url) {
  var xhr = new XMLHttpRequest()
  // use sync to avoid popup blocker
  xhr.open('HEAD', url, false)
  xhr.send()
  return xhr.status >= 200 && xhr.status <= 299
}

// `a.click()` doesn't work for all browsers (#465)
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent('click'))
  } catch (e) {
    var evt = document.createEvent('MouseEvents')
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                          20, false, false, false, false, 0, null)
    node.dispatchEvent(evt)
  }
}

var saveAs = _global.saveAs ||
// probably in some web worker
(typeof window !== 'object' || window !== _global)
  ? function saveAs () { /* noop */ }

// Use download attribute first if possible (#193 Lumia mobile)
: 'download' in HTMLAnchorElement.prototype
? function saveAs (blob, name, opts) {
  var URL = _global.URL || _global.webkitURL
  var a = document.createElement('a')
  name = name || blob.name || 'download'

  a.download = name
  a.rel = 'noopener' // tabnabbing

  // TODO: detect chrome extensions & packaged apps
  // a.target = '_blank'

  if (typeof blob === 'string') {
    // Support regular links
    a.href = blob
    if (a.origin !== location.origin) {
      corsEnabled(a.href)
        ? download(blob, name, opts)
        : click(a, a.target = '_blank')
    } else {
      click(a)
    }
  } else {
    // Support blobs
    a.href = URL.createObjectURL(blob)
    setTimeout(function () { URL.revokeObjectURL(a.href) }, 4E4) // 40s
    setTimeout(function () { click(a) }, 0)
  }
}

// Use msSaveOrOpenBlob as a second approach
: 'msSaveOrOpenBlob' in navigator
? function saveAs (blob, name, opts) {
  name = name || blob.name || 'download'

  if (typeof blob === 'string') {
    if (corsEnabled(blob)) {
      download(blob, name, opts)
    } else {
      var a = document.createElement('a')
      a.href = blob
      a.target = '_blank'
      setTimeout(function () { click(a) })
    }
  } else {
    navigator.msSaveOrOpenBlob(bom(blob, opts), name)
  }
}

// Fallback to using FileReader and a popup
: function saveAs (blob, name, opts, popup) {
  // Open a popup immediately do go around popup blocker
  // Mostly only avalible on user interaction and the fileReader is async so...
  popup = popup || open('', '_blank')
  if (popup) {
    popup.document.title =
    popup.document.body.innerText = 'downloading...'
  }

  if (typeof blob === 'string') return download(blob, name, opts)

  var force = blob.type === 'application/octet-stream'
  var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari
  var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent)

  if ((isChromeIOS || (force && isSafari)) && typeof FileReader === 'object') {
    // Safari doesn't allow downloading of blob urls
    var reader = new FileReader()
    reader.onloadend = function () {
      var url = reader.result
      url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;')
      if (popup) popup.location.href = url
      else location = url
      popup = null // reverse-tabnabbing #460
    }
    reader.readAsDataURL(blob)
  } else {
    var URL = _global.URL || _global.webkitURL
    var url = URL.createObjectURL(blob)
    if (popup) popup.location = url
    else location.href = url
    popup = null // reverse-tabnabbing #460
    setTimeout(function () { URL.revokeObjectURL(url) }, 4E4) // 40s
  }
}

_global.saveAs = saveAs.saveAs = saveAs

if (typeof module !== 'undefined') {
  module.exports = saveAs;
}
return saveAs;
});

define('Content',["assert","Util","FileSaver"],function (assert,Util,saveAs) {
    var Content=function () {};
    var extend=Util.extend;
    // ------ constructor
    Content.plainText=function (s,contentType){
        var b=new Content;
        b.contentType=contentType||"text/plain";
        b.plain=s;
        return b;
    };
    Content.url=function (s) {
        var b=new Content;
        b.url=s;
        return b;
    };
    Content.buffer2ArrayBuffer = function (a) {
        if (Content.isBuffer(a)) {
            var u=new Uint8Array(a);
            var r=u.buffer;
            if (r instanceof ArrayBuffer) return r;
            var ary=Array.prototype.slice.call(u);
            return assert(new Uint8Array(ary).buffer,"n2a: buf is not set");
        }
        return assert(a,"n2a: a is not set");
    };
    Content.arrayBuffer2Buffer= function (a) {
        if (a instanceof ArrayBuffer) {
            var b=new Buffer(new Uint8Array(a));
            return b;
        }
        return assert(a,"a2n: a is not set");
    };

    Content.bin=function (bin, contentType) {
        assert(contentType, "contentType should be set");
        var b=new Content;
        if (Content.isNodeBuffer(bin)) {
            b.bufType="node";
            b.nodeBuffer=bin;
        } else if (bin instanceof ArrayBuffer) {
            b.bufType="array2";
            b.arrayBuffer=bin;
        } else if (bin && Content.isBuffer(bin.buffer)) {
            // in node.js v8.9.1 ,
            ///  bin is Buffer, bin.buffer is ArrayBuffer
            //   and bin.buffer is content of different file(memory leak?)
            b.bufType="array1";
            b.arrayBuffer=bin.buffer;
        } else {
            throw new Error(bin+" is not a bin");
        }
        b.contentType=contentType;
        return b;
    };
    Content.looksLikeDataURL=function (text) {
        return text.match(/^data:/);
    };
    Content.download=saveAs;
    // why blob is not here... because blob content requires FileReader (cannot read instantly!)
    //------- methods
    var p=Content.prototype;
    p.toBin = function (binType) {
        binType=binType || (Content.hasNodeBuffer() ? Buffer: ArrayBuffer);
        if (this.nodeBuffer) {
            if (binType===Buffer) {
                return this.nodeBuffer;
            } else {
                return this.arrayBuffer=( Content.buffer2ArrayBuffer(this.nodeBuffer) );
            }
        } else if (this.arrayBuffer) {
            if (binType===ArrayBuffer) {
                return this.arrayBuffer;
            } else {
                return this.nodeBuffer=( Content.arrayBuffer2Buffer(this.arrayBuffer) );
            }
        } else if (this.url) {
            var d=new DataURL(this.url, binType);
            return this.setBuffer(d.buffer);
        } else if (this.plain!=null) {
            return this.setBuffer( Content.str2utf8bytes(this.plain, binType) );
        }
        throw new Error("No data");
    };
    p.setBuffer=function (b) {
        assert(b,"b is not set");
        if (Content.isNodeBuffer(b)) {
            return this.nodeBuffer=b;
        } else {
            return this.arrayBuffer=b;
        }
    };
    p.toArrayBuffer=function () {
        return this.toBin(ArrayBuffer);
    };
    p.toNodeBuffer=function () {
        return this.toBin(Buffer);
    };
    p.toURL=function () {
        if (this.url) {
            return this.url;
        } else {
            if (!this.arrayBuffer && this.plain!=null) {
                this.arrayBuffer=Content.str2utf8bytes(this.plain,ArrayBuffer);
            }
            if (this.arrayBuffer || this.nodeBuffer) {
                var d=new DataURL(this.arrayBuffer || this.nodeBuffer,this.contentType);
                return this.url=d.url;
            }
        }
        throw new Error("No data");
    };
    p.toPlainText=function () {
        if (this.hasPlainText()) {
            return this.plain;
        } else {
            if (this.url && !this.hasBin() ) {
                var d=new DataURL(this.url,ArrayBuffer);
                this.arrayBuffer=d.buffer;
            }
            if (this.hasBin()) {
                return this.plain=Content.utf8bytes2str(
                        this.nodeBuffer || new Uint8Array(this.arrayBuffer)
                );
            }
        }
        throw new Error("No data");
    };
    p.hasURL=function (){return this.url;};
    p.hasPlainText=function (){return this.plain!=null;};
    p.hasBin=function (){return this.nodeBuffer || this.arrayBuffer;};
    p.hasNodeBuffer= function () {return this.nodeBuffer;};
    p.hasArrayBuffer= function () {return this.arrayBuffer;};
    p.toBlob=function () {
        return new Blob([this.toBin(ArrayBuffer)],{type:this.contentType});
    };
    p.download=function (name) {
        Content.download(this.toBlob(),name);
    };
    //--------Util funcs
    // From http://hakuhin.jp/js/base64.html#BASE64_DECODE_ARRAY_BUFFER
    Content.Base64_To_ArrayBuffer=function (base64,binType){
	    var A=binType||ArrayBuffer;
        base64=base64.replace(/[\n=]/g,"");
        var dic = new Object();
        dic[0x41]= 0; dic[0x42]= 1; dic[0x43]= 2; dic[0x44]= 3; dic[0x45]= 4; dic[0x46]= 5; dic[0x47]= 6; dic[0x48]= 7; dic[0x49]= 8; dic[0x4a]= 9; dic[0x4b]=10; dic[0x4c]=11; dic[0x4d]=12; dic[0x4e]=13; dic[0x4f]=14; dic[0x50]=15;
        dic[0x51]=16; dic[0x52]=17; dic[0x53]=18; dic[0x54]=19; dic[0x55]=20; dic[0x56]=21; dic[0x57]=22; dic[0x58]=23; dic[0x59]=24; dic[0x5a]=25; dic[0x61]=26; dic[0x62]=27; dic[0x63]=28; dic[0x64]=29; dic[0x65]=30; dic[0x66]=31;
        dic[0x67]=32; dic[0x68]=33; dic[0x69]=34; dic[0x6a]=35; dic[0x6b]=36; dic[0x6c]=37; dic[0x6d]=38; dic[0x6e]=39; dic[0x6f]=40; dic[0x70]=41; dic[0x71]=42; dic[0x72]=43; dic[0x73]=44; dic[0x74]=45; dic[0x75]=46; dic[0x76]=47;
        dic[0x77]=48; dic[0x78]=49; dic[0x79]=50; dic[0x7a]=51; dic[0x30]=52; dic[0x31]=53; dic[0x32]=54; dic[0x33]=55; dic[0x34]=56; dic[0x35]=57; dic[0x36]=58; dic[0x37]=59; dic[0x38]=60; dic[0x39]=61; dic[0x2b]=62; dic[0x2f]=63;
        var num = base64.length;
        var n = 0;
        var b = 0;
        var e;

        if(!num) return (new A(0));
        //if(num < 4) return null;
        //if(num % 4) return null;

        // AA     12    1
        // AAA    18    2
        // AAAA   24    3
        // AAAAA  30    3
        // AAAAAA 36    4
        // num*6/8
        e = Math.floor(num / 4 * 3);
        if(base64.charAt(num - 1) == '=') e -= 1;
        if(base64.charAt(num - 2) == '=') e -= 1;

        var ary_buffer = new A( e );
        var ary_u8 = (Content.isNodeBuffer(ary_buffer) ? ary_buffer : new Uint8Array( ary_buffer ));//new Uint8Array( ary_buffer );
        var i = 0;
        var p = 0;
        while(p < e){
            b = dic[base64.charCodeAt(i)];
            if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i));//return null;
            n = (b << 2);
            i ++;

            b = dic[base64.charCodeAt(i)];
            if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
            ary_u8[p] = n | ((b >> 4) & 0x3);
            n = (b & 0x0f) << 4;
            i ++;
            p ++;
            if(p >= e) break;

            b = dic[base64.charCodeAt(i)];
            if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
            ary_u8[p] = n | ((b >> 2) & 0xf);
            n = (b & 0x03) << 6;
            i ++;
            p ++;
            if(p >= e) break;

            b = dic[base64.charCodeAt(i)];
            if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
            ary_u8[p] = n | b;
            i ++;
            p ++;
        }
        function fail(m) {
            console.log(m);
            console.log(base64,i);
            throw new Error(m);
        }
        return ary_buffer;
    };

    Content.Base64_From_ArrayBuffer=function (ary_buffer){
        var dic = [
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
            'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
            'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
            'w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/'
        ];
        var base64 = "";
        var ary_u8 = new Uint8Array( ary_buffer );
        var num = ary_u8.length;
        var n = 0;
        var b = 0;

        var i = 0;
        while(i < num){
            b = ary_u8[i];
            base64 += dic[(b >> 2)];
            n = (b & 0x03) << 4;
            i ++;
            if(i >= num) break;

            b = ary_u8[i];
            base64 += dic[n | (b >> 4)];
            n = (b & 0x0f) << 2;
            i ++;
            if(i >= num) break;

            b = ary_u8[i];
            base64 += dic[n | (b >> 6)];
            base64 += dic[(b & 0x3f)];
            i ++;
        }

        var m = num % 3;
        if(m){
            base64 += dic[n];
        }
        if(m == 1){
            base64 += "==";
        }else if(m == 2){
            base64 += "=";
        }
        return base64;
    };

    Content.hasNodeBuffer=function () {
        return typeof Buffer!="undefined";
    };
    Content.isNodeBuffer=function (data) {
        return (Content.hasNodeBuffer() && data instanceof Buffer);
    };
    Content.isBuffer=function (data) {
        return data instanceof ArrayBuffer || Content.isNodeBuffer(data);
    };
    Content.utf8bytes2str=function (bytes) {
        var e=[];
        for (var i=0 ; i<bytes.length ; i++) {
             e.push("%"+("0"+bytes[i].toString(16)).slice(-2));
        }
        //try {
            return decodeURIComponent(e.join(""));
        /*} catch (er) {
            console.log(e.join(""));
            throw er;
        }*/
    };
    Content.str2utf8bytes=function (str, binType) {
        var e=encodeURIComponent(str);
        var r=/^%(..)/;
        var a=[];
        var ad=0;
        for (var i=0 ; i<e.length; i++) {
            var m=r.exec( e.substring(i));
            if (m) {
                a.push(parseInt("0x"+m[1]));
                i+=m[0].length-1;
            } else a.push(e.charCodeAt(i));
        }
        return (typeof Buffer!="undefined" && binType===Buffer ? new Buffer(a) : new Uint8Array(a).buffer);
    };
    //-------- DataURL
    var A=Content.hasNodeBuffer() ? Buffer :ArrayBuffer;
    //var isBuffer=Util.isBuffer;
    var DataURL=function (data, contentType){
      // data: String/Array/ArrayBuffer
      if (typeof data=="string") {
          this.url=data;
          this.binType=contentType || A;
          this.dataURL2bin(data);
      } else if (data && Content.isBuffer(data.buffer)) {
          this.buffer=data.buffer;
          assert.is(contentType,String);
          this.contentType=contentType;
          this.bin2dataURL(this.buffer, this.contentType);
      } else if (Content.isBuffer(data)) {
          this.buffer=data;
          assert.is(contentType,String);
          this.contentType=contentType;
          this.bin2dataURL(this.buffer, this.contentType);
      } else {
          console.log(arguments);
          assert.fail("Invalid args: ",arguments);
      }
   };
   Content.DataURL=DataURL;
   extend(DataURL.prototype,{
      bin2dataURL: function (b, contentType) {
          assert(Content.isBuffer(b));
          assert.is(contentType,String);
  	     var head=this.dataHeader(contentType);
	     var base64=Content.Base64_From_ArrayBuffer(b);
	     assert.is(base64,String);
	     return this.url=head+base64;
	  },
	  dataURL2bin: function (dataURL) {
          assert.is(arguments,[String]);
	      var reg=/^data:([^;]+);base64,/i;
	      var r=reg.exec(dataURL);
	      assert(r, ["malformed dataURL:", dataURL] );
	      this.contentType=r[1];
	      this.buffer=Content.Base64_To_ArrayBuffer(dataURL.substring(r[0].length) , this.binType);
          return assert.is(this.buffer , this.binType);
  	  },
  	  dataHeader: function (ctype) {
	      assert.is(arguments,[String]);
	      return "data:"+ctype+";base64,";
   	  },
   	  toString: function () {return assert.is(this.url,String);}
   });

    return Content;
});

/*global process, global, Buffer, requirejs, require*/
define('NativeFS',["FSClass","assert","PathUtil","extend","Content"],
        function (FS,A,P,extend,Content) {
    var assert=A,fs;
    const requireTries=[
        ()=>require("fs"),()=>requirejs.nodeRequire("fs"),()=>global.require("fs")
    ];
    for (let fsf of requireTries) {
        try {
            fs=fsf();
            fs.existsSync('test.txt');
            process.cwd();// fails here in NW.js Worker( fs is OK, process is absent)
            break;
        } catch(e){fs=null;}
    }
    if (!fs) {
        return function () {
            throw new Error("This system not support native FS");
        };
    }
    var NativeFS=function (rootPoint) {
        if (rootPoint) {
            A.is(rootPoint, P.AbsDir);
            this.rootPoint=rootPoint;
        }
    };
    var hasDriveLetter=P.hasDriveLetter(process.cwd());
    NativeFS.available=true;
    var SEP=P.SEP;
    //var json=JSON; // JSON changes when page changes, if this is node module, JSON is original JSON
    var Pro=NativeFS.prototype=new FS();
    Pro.toNativePath = function (path) {
        // rootPoint: on NativePath   C:/jail/
        // mountPoint: on VirtualFS   /mnt/natfs/
        if (!this.rootPoint) return path;
        A.is(path, P.Absolute);
        A(this.inMyFS(path),path+" is not fs of "+this);
        //console.log("tonat:MP",P.rel( this.rootPoint, P.relPath(path, this.mountPoint || P.SEP)));
        return P.rel( this.rootPoint, P.relPath(path, this.mountPoint || P.SEP));
    };
    Pro.arrayBuffer2Buffer= function (a) {
        if (a instanceof ArrayBuffer) {
            var b=new Buffer(new Uint8Array(a));
            return b;
        }
        return a;
    };

    FS.addFSType("NativeFS",function (path, options) {
            return new NativeFS(options.r);
    });
    NativeFS.prototype.fstype=function () {
        return "Native"+(this.rootPoint?"("+this.rootPoint+")":"");
    };
    NativeFS.prototype.inMyFS=function (path) {
        //console.log("inmyfs",path);
        if (this.mountPoint) {
            return P.startsWith(path, this.mountPoint);
        } else {
//            console.log(path, hasDriveLetter , P.hasDriveLetter(path));
            return !( !!hasDriveLetter ^ !!P.hasDriveLetter(path));
        }
    };
    function E(r){return r;}
    FS.delegateMethods(NativeFS.prototype, {
        getReturnTypes: function(path, options) {
            E(path,options);
            assert.is(arguments,[String]);
            return {
                getContent: ArrayBuffer, opendir:[String]
            };
        },
        getContent: function (path, options) {
            options=options||{};
            A.is(path,P.Absolute);
            var np=this.toNativePath(path);
            this.assertExist(path);
            /*if (this.isText(path)) {
                return Content.plainText( fs.readFileSync(np, {encoding:"utf8"}) );
            } else {*/
                return Content.bin( fs.readFileSync(np) , this.getContentType(path));
            //}
        },
        size: function(path) {
            var np=this.toNativePath(path);
            var st=fs.statSync(np);
            return st.size;
        },
        setContent: function (path,content) {
            A.is(arguments,[P.Absolute,Content]);
            var pa=P.up(path);
            if (pa) this.getRootFS().resolveFS(pa).mkdir(pa);
            var np=this.toNativePath(path);
            if (content.hasBin() || !content.hasPlainText() ) {
                fs.writeFileSync(np, content.toNodeBuffer() );
            } else {
                // !hasBin && hasText
                fs.writeFileSync(np, content.toPlainText());
            }
        },
        appendContent: function (path,content) {
            A.is(arguments,[P.Absolute,Content]);
            var pa=P.up(path);
            if (pa) this.getRootFS().resolveFS(pa).mkdir(pa);
            var np=this.toNativePath(path);
            if (content.hasBin() || !content.hasPlainText() ) {
                fs.appendFileSync(np, content.toNodeBuffer() );
            } else {
                // !hasBin && hasText
                fs.appendFileSync(np, content.toPlainText());
            }
        },
        getMetaInfo: function(path, options) {
            this.assertExist(path, options);
            var s=this.stat(path);
            s.lastUpdate=s.mtime.getTime();
            return s;
        },
        setMetaInfo: function(path, info, options) {
            E(path, info, options);
            //options.lastUpdate

            //TODO:
        },
        isReadOnly: function (path) {
            E(path);
            // TODO:
            return false;
        },
        stat: function (path) {
            A.is(path,P.Absolute);
            var np=this.toNativePath(path);
            return fs.statSync(np);
        },
        mkdir: function(path, options) {
            options=options||{};
            assert.is(arguments,[P.Absolute]);
            if (this.exists(path)){
                if (this.isDir(path)) {
                    return;
                } else {
                    throw new Error(this+" is a file. not a dir.");
                }
            }
            this.assertWriteable(path);
            var pa=P.up(path);
            if (pa) this.getRootFS().resolveFS(pa).mkdir(pa);
            var np=this.toNativePath(path);
            fs.mkdirSync(np);
            return this.assertExist(np);
        },
        opendir: function (path, options) {
            assert.is(arguments,[String]);
            options=options||{};
            var np=this.toNativePath(path);
            var ts=P.truncSEP(np);
            var r=fs.readdirSync(np);
            if (!options.nosep) {
                r=r.map(function (e) {
                    var s=fs.statSync(ts+SEP+e);
                    var ss=s.isDirectory()?SEP:"";
                    return e+ss;
                });
            }
            var res=[]; //this.dirFromFstab(path);
            return assert.is(res.concat(r),Array);
        },
        rm: function(path, options) {
            assert.is(arguments,[P.Absolute]);
            options=options||{};
            this.assertExist(path);
            var np=this.toNativePath(path);
            if (this.isDir(path)) {
                return fs.rmdirSync(np);
            } else {
                return fs.unlinkSync(np);
            }
        },
        // mv: is Difficult, should check dst.fs==src.fs
        //     and both have not subFileSystems
        exists: function (path, options) {
            options=options||{};
            var np=this.toNativePath(path);
            return fs.existsSync(np);
        },
        isDir: function (path) {
            if (!this.exists(path)) {
                return P.isDir(path);
            }
            return this.stat(path).isDirectory();
        },
        /*link: function(path, to, options) {
        }//TODO
        isLink:
        */
        touch: function (path) {
            if (!this.exists(path) && this.isDir(path)) {
                this.mkdir(path);
            } else if (this.exists(path) /*&& !this.isDir(path)*/ ) {
                // TODO(setlastupdate)
                fs.utimesSync(path,Date.now()/1000,Date.now()/1000);
            }
        },
        getURL:function (path) {
            return "file:///"+path.replace(/\\/g,"/");
        },
        onAddObserver: function (apath,options) {
            var t=this;
            var rfs=t.getRootFS();
            options=options||{};
            var isDir=this.isDir(apath);
            //console.log("Invoke oao",options);
            var w=fs.watch(apath, options, function (evt,rpath) {
                //console.log(path);
                var fpath=isDir ? P.rel(apath,rpath) : apath;
                var meta;
                if (t.exists(fpath)) {
                    meta=extend({eventType:evt},t.getMetaInfo(fpath));
                } else {
                    meta={eventType:evt};
                }
                rfs.notifyChanged(fpath,meta);
            });
            return {
                remove: function () {
                    w.close();
                }
            };
        }
    });
    return NativeFS;
});

define('LSFS',["FSClass","PathUtil","extend","assert","Util","Content"],
        function(FS,P,extend,assert,Util,Content) {
    var LSFS = function(storage,options) {
        assert(storage," new LSFS fail: no storage");
    	this.storage=storage;
    	this.options=options||{};
    	if (this.options.useDirCache) this.dirCache={};
    };
    var isDir = P.isDir.bind(P);
    var up = P.up.bind(P);
    var endsWith= P.endsWith.bind(P);
    //var getName = P.name.bind(P);
    //var Path=P.Path;
    var Absolute=P.Absolute;
    var SEP= P.SEP;
    function now(){
        return new Date().getTime();
    }
    LSFS.ramDisk=function (options) {
        var s={};
        s[P.SEP]="{}";
        options=options||{};
        if (!("useDirCache" in options)) options.useDirCache=true;
        return new LSFS(s,options);
    };
    FS.addFSType("localStorage",function (path, options) {
        return new LSFS(localStorage,options);
    });
    FS.addFSType("ram",function (path, options) {
        return LSFS.ramDisk(options);
    });

    LSFS.now=now;
    LSFS.prototype=new FS();
    //private methods
    LSFS.prototype.resolveKey=function (path) {
        assert.is(path,P.Absolute);
        if (this.mountPoint) {
            return P.SEP+P.relPath(path,this.mountPoint);//FromMountPoint(path);
        } else {
            return path;
        }
    };
    LSFS.prototype.getItem=function (path) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        return this.storage[key];
    };
    LSFS.prototype.setItem=function (path, value) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        /*if (key.indexOf("..")>=0) {
            console.log(path,key,value);
        }*/
        assert(key.indexOf("..")<0);
        assert(P.startsWith(key,P.SEP));
        this.storage[key]=value;
    };
    LSFS.prototype.removeItem=function (path) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        delete this.storage[key];
    };
    LSFS.prototype.itemExists=function (path) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        assert(this.storage,"No storage");
        return key in this.storage;
    };
    /*LSFS.prototype.inMyFS=function (path){
        return !this.mountPoint || P.startsWith(path, this.mountPoint);
    };*/
    LSFS.prototype.getDirInfo=function getDirInfo(path) {
        assert.is(arguments,[P.AbsDir]);
        if (path == null) throw new Error("getDir: Null path");
        if (!endsWith(path, SEP)) path += SEP;
        assert(this.inMyFS(path));
        if (this.dirCache && this.dirCache[path]) return this.dirCache[path];
        var dinfo =  {},dinfos;
        try {
            dinfos = this.getItem(path);
            if (dinfos) {
                dinfo = JSON.parse(dinfos);
            }
        } catch (e) {
            console.log("dinfo err : " , path , dinfos);
        }
        if (this.dirCache) this.dirCache[path]=dinfo;
        return dinfo;
    };
    LSFS.prototype.putDirInfo=function putDirInfo(path, dinfo, trashed) {
  	    assert.is(arguments,[P.AbsDir, Object]);
  	    if (!isDir(path)) throw new Error("Not a directory : " + path);
  	    assert(this.inMyFS(path));
  	    if (this.dirCache) this.dirCache[path] = dinfo;
  	    this.setItem(path, JSON.stringify(dinfo));
        var ppath = up(path);
        if (ppath == null) return;
        if (!this.inMyFS(ppath)) {
            //assert(this.getRootFS()!==this);
            //this.getRootFS().resolveFS(ppath).touch(ppath);
            return;
        }
        var pdinfo = this.getDirInfo(ppath);
        this._touch(pdinfo, ppath, P.name(path), trashed);
    };
    LSFS.prototype._touch=function _touch(dinfo, path, name, trashed) {
        // path:path of dinfo
        // trashed: this touch is caused by trashing the file/dir.
        assert.is(arguments,[Object, String, String]);
        assert(this.inMyFS(path));
        var eventType="change";
        if (!dinfo[name]) {
            eventType="create";
            dinfo[name] = {};
            if (trashed) dinfo[name].trashed = true;
        }
        if (!trashed) delete dinfo[name].trashed;
        dinfo[name].lastUpdate = now();
        var meta=extend({eventType:eventType},dinfo[name]);
        this.getRootFS().notifyChanged(P.rel(path,name), meta);
        this.putDirInfo(path, dinfo, trashed);
    };
    LSFS.prototype.removeEntry=function removeEntry(dinfo, path, name) { // path:path of dinfo
        assert.is(arguments,[Object, String, String]);
        if (dinfo[name]) {
            dinfo[name] = {
                lastUpdate: now(),
                trashed: true
            };
            this.getRootFS().notifyChanged(P.rel(path,name), {eventType:"trash"});
            this.putDirInfo(path, dinfo, true);
        }
    };
    LSFS.prototype.removeEntryWithoutTrash=function (dinfo, path, name) { // path:path of dinfo
        assert.is(arguments,[Object, String, String]);
        if (dinfo[name]) {
            delete dinfo[name];
            this.getRootFS().notifyChanged(P.rel(path,name), {eventType:"delete"});
            this.putDirInfo(path, dinfo, true);
        }
    };
    LSFS.prototype.isRAM=function (){
        return this.storage!==localStorage;
    };
    LSFS.prototype.fstype=function () {
        return (this.isRAM() ? "ramDisk" : "localStorage" );
    };
    LSFS.getUsage=function () {
        var using=0;
        for (var i in localStorage) {
            if (typeof localStorage[i]=="string"){
                using+=localStorage[i].length;
            }
        }
        return using;
    };
    LSFS.getCapacity=function () {
        var seq=0;
        var str="a";
        var KEY="___checkls___";
        var using=0;
        var lim=Math.pow(2,25);//32MB?
        try {
            // make 1KB str
            for (var i=0; i<10 ;i++) {
                str+=str;
            }
            for (var i in localStorage) {
                if (i.substring(0,KEY.length)==KEY) delete localStorage[i];
                else if (typeof localStorage[i]=="string"){
                    using+=localStorage[i].length;
                }
            }
            var ru=using;
            while (add()) {
                if (str.length<lim) {
                    str+=str;
                } else break;
            }
            while(str.length>1024) {
                str=str.substring(str.length/2);
                add();
            }
            return {using:ru, max:using};
        } finally {
            for (var i=0; i<seq; i++) {
                 delete localStorage[KEY+i];
            }
        }
        function add() {
            try {
                localStorage[KEY+seq]=str;
                seq++;
                using+=str.length;
                //console.log("Added "+str.length, str.length, using);
                return true;
            } catch(e) {
                delete localStorage[KEY+seq];
                //console.log("Add Fail "+str.length);
                return false;
            }
        }
    };

    // public methods (with resolve fs)
    FS.delegateMethods(LSFS.prototype, {
        isReadOnly: function () {return this.options.readOnly;},
        getReturnTypes: function(path, options) {
            assert.is(arguments,[String]);
            return {
                getContent: String, opendir:[String]
            };
        },
        getContent: function(path, options) {
            assert.is(arguments,[Absolute]);
            this.assertExist(path); // Do not use this??( because it does not follow symlinks)
            var c;
            var cs=this.getItem(path);
            if (Content.looksLikeDataURL(cs)) {
                c=Content.url(cs);
            } else {
                c=Content.plainText(cs);
            }
            return c;
        },
        setContent: function(path, content, options) {
            assert.is(arguments,[Absolute,Content]);
            this.assertWriteable(path);
            var t=null;
            if (content.hasPlainText()) {
                t=content.toPlainText();
                if (Content.looksLikeDataURL(t)) t=null;
            }
            if (t!=null) {
                this.setItem(path, t);
            } else {
                this.setItem(path, content.toURL());
            }
            this.touch(path);
        },
        getMetaInfo: function(path, options) {
            this.assertExist(path, {includeTrashed:true});
            assert.is(arguments,[Absolute]);
            if (path==P.SEP) {
                return {};
            }
            var parent=assert(P.up(path));
            if (!this.inMyFS(parent)) {
                return {};
            }
            var name=P.name(path);
            assert.is(parent,P.AbsDir);
            var pinfo=this.getDirInfo(parent);
            return assert(pinfo[name]);
        },
        setMetaInfo: function(path, info, options) {
            assert.is(arguments,[String,Object]);
            this.assertWriteable(path);
            var parent=assert(P.up(path));
            if (!this.inMyFS(parent)) {
                return;
            }
            var pinfo=this.getDirInfo(parent);
            var name=P.name(path);
            pinfo[name]=info;
            this.putDirInfo(parent, pinfo, pinfo[name].trashed);
        },
        mkdir: function(path, options) {
            assert.is(arguments,[Absolute]);
            this.assertWriteable(path);
			this.touch(path);
        },
        opendir: function(path, options) {
            assert.is(arguments,[String]);
            //succ: iterator<string> // next()
            // options: {includeTrashed:Boolean}
            options=options||{};
            var inf=this.getDirInfo(path);
            var res=[]; //this.dirFromFstab(path);
            for (var i in inf) {
                assert(inf[i]);
                if (!inf[i].trashed || options.includeTrashed) res.push(i);
            }
            return assert.is(res,Array);
        },
        rm: function(path, options) {
            assert.is(arguments,[Absolute]);
            options=options||{};
            this.assertWriteable(path);
            var parent=P.up(path);
            if (parent==null || !this.inMyFS(parent)) {
                throw new Error(path+": cannot remove. It is root of this FS.");
            }
            this.assertExist(path,{includeTrashed:options.noTrash });
            if (P.isDir(path)) {
                var lis=this.opendir(path);
                if (lis.length>0) {
                    this.err(path,"Directory not empty");
                }
                if (options.noTrash) {
                    this.removeItem(path);
                }
            } else {
                this.removeItem(path);
            }
            var pinfo=this.getDirInfo(parent);
            if (options.noTrash) {
                this.removeEntryWithoutTrash(pinfo, parent, P.name(path) );
            } else {
                this.removeEntry(pinfo, parent, P.name(path) );
            }
        },
        exists: function (path,options) {
            assert.is(arguments,[Absolute]);
            options=options||{};
            var name=P.name(path);
            var parent=P.up(path);
            if (parent==null || !this.inMyFS(parent)) return true;
            var pinfo=this.getDirInfo(parent);
            var res=pinfo[name];
            if (res && res.trashed && this.itemExists(path)) {
                if (this.isDir(path)) {

                } else {
                    //assert.fail("Inconsistent "+path+": trashed, but remains in storage");
                }
            }
            if (!res && this.itemExists(path)) {
                //assert.fail("Inconsistent "+path+": not exists in metadata, but remains in storage");
            }
            if (res && !res.trashed && !res.link && !this.itemExists(path)) {
                //assert.fail("Inconsistent "+path+": exists in metadata, but not in storage");
            }
            if (res && !options.includeTrashed) {
                res=!res.trashed;
            }
            return !!res;
        },
        link: function(path, to, options) {
            assert.is(arguments,[P.Absolute,P.Absolute]);
            this.assertWriteable(path);
            if (this.exists(path)) this.err(path,"file exists");
            if (P.isDir(path) && !P.isDir(to)) {
                this.err(path," can not link to file "+to);
            }
            if (!P.isDir(path) && P.isDir(to)) {
                this.err(path," can not link to directory "+to);
            }
            var m={};//assert(this.getMetaInfo(path));
            m.link=to;
            m.lastUpdate=now();
            this.setMetaInfo(path, m);
            //console.log(this.getMetaInfo(path));
            //console.log(this.storage);
            //console.log(this.getMetaInfo(P.up(path)));
            assert(this.exists(path));
            assert(this.isLink(path));
        },
        isLink: function (path) {
            assert.is(arguments,[P.Absolute]);
            if (!this.exists(path)) return null;
            var m=assert(this.getMetaInfo(path));
            return m.link;
        },
        touch: function (path) {
            assert.is(arguments,[Absolute]);
            this.assertWriteable(path);
            if (!this.itemExists(path)) {
                if (P.isDir(path)) {
                    if (this.dirCache) this.dirCache[path]={};
                    this.setItem(path,"{}");
                } else {
                    this.setItem(path,"");
                }
            }
            var parent=up(path);
            if (parent!=null) {
                if (this.inMyFS(parent)) {
                    var pinfo=this.getDirInfo(parent);
                    this._touch(pinfo, parent , P.name(path), false);
                } else {
                    assert(this.getRootFS()!==this);
                    this.getRootFS().resolveFS(parent).touch(parent);
                }
            }
        },
        getURL: function (path) {
            return this.getContent(path).toURL();
        },
        opendirEx: function (path,options) {
            assert.is(path,P.AbsDir);
            options=options||{};
            var res={};
            var d=this.getDirInfo(path);
            if (options.includeTrashed) {
                //console.log("INCLTR",d);
                return d;
            }
            for (var k in d) {
                if (d[k].trashed) continue;
                res[k]=d[k];
            }
            return res;
        }
    });
    return LSFS;

});

/**
 *
 * jquery.binarytransport.js
 *
 * @description. jQuery ajax transport for making binary data type requests.
 * @version 1.0
 * @author Henry Algus <henryalgus@gmail.com>
 *
 */

// use this transport for "binary" data type
if (typeof $!=="undefined")
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
        return {
            // create new XMLHttpRequest
            send: function(headers, callback){
                // setup all variables
                var xhr = new XMLHttpRequest(),
                url = options.url,
                type = options.type,
                async = options.async || true,
                // blob or arraybuffer. Default is blob
                dataType = options.responseType || "blob",
                data = options.data || null,
                username = options.username || null,
                password = options.password || null;

                xhr.addEventListener('load', function(){
                    var data = {};
                    data[options.dataType] = xhr.response;
                    // make callback and send data
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, async, username, password);

                // setup custom headers
                for (var i in headers ) {
                    xhr.setRequestHeader(i, headers[i] );
                }

                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});

define("jquery.binarytransport", function(){});

define('WebFS',["FSClass","jquery.binarytransport","DeferredUtil","Content","PathUtil"],
        function (FS,j,DU,Content,P) {
    // FS.mount(location.protocol+"//"+location.host+"/", "web");
    var WebFS=function (){};
    var p=WebFS.prototype=new FS;
    FS.addFSType("web", function () {
        return new WebFS;
    });
    p.fstype=function () {return "Web";};
    p.supportsSync=function () {return false;};
    p.inMyFS=function (path) {
        return P.isURL(path);
    };
    FS.delegateMethods(p, {
        exists: function () {return true;},
        getContentAsync: function (path){
            var t=this;
            return DU.promise(function (succ,err) {
                $.get(path,function (blob) {
                    var reader = new FileReader();
                    reader.addEventListener("loadend", function() {
                        succ(Content.bin(reader.result, t.getContentType(path)));
                    });
                    reader.readAsArrayBuffer(blob);
                },"binary").fail(err);
            });
        },
        /*setContentAsync: function (path){

        },*/
        getURL: function (path) {
            return path;
        }
    });

    return WebFS;

});
define('Env',["assert","PathUtil"],function (A,P) {
    var Env=function (value) {
        this.value=value;
    };
    Env.prototype={
            expand:function (str) {
                A.is(str,String);
                var t=this;
                return str.replace(/\$\{([a-zA-Z0-9_]+)\}/g, function (a,key) {
                    return t.get(key);
                });
            },
            expandPath:function (path) {
                A.is(path,String);
                path=this.expand(path);
                path=path.replace(/\/+/g,"/");
                path=path.replace(/^[a-z][a-z]+:\//, function (r) { return r+"/"; } );
                return A.is(path,P.Path);
            },
            get: function (key) {
                return this.value[key];
            },
            set: function (key, value) {
                this.value[key]=value;
            }
    };
    return Env;
});
define('SFile',["extend","assert","PathUtil","Util","Content","FSClass","FileSaver","DeferredUtil"],
function (extend,A,P,Util,Content,FSClass,saveAs,DU) {

var SFile=function (rootFS, path) {
    A.is(path, P.Absolute);
    this._path=path;
    this.rootFS=rootFS;
    this.fs=rootFS.resolveFS(path);
    if (this.isDir() && !P.isDir(path)) {
        this._path+=P.SEP;
    }
};
SFile.is=function (path) {
    return path && typeof (path.isSFile)=="function" && path.isSFile();
};
/*function getPath(f) {
    if (SFile.is(f)) {
        return f.path();
    } else {
        A.is(f,P.Absolute);
        return f;
    }
}*/
SFile.prototype={
    isSFile: function (){return true;},
    setPolicy: function (p) {
        if (this.policy) throw new Error("policy already set");
        this.policy=p;
        return this._clone();
    },
    getPolicy: function (/*p*/) {
        return this.policy;
    },
    _clone: function (){
        return this._resolve(this.path());
    },
    _resolve: function (path, options) {
        var res;
        options=options||{};
        if (SFile.is(path)) {
            res=path;
        } else {
            A.is(path,P.Absolute);
            var topdir;
            var policy=options.policy || this.policy;
            if (policy && (topdir=policy.topDir)) {
                if (topdir.path) topdir=topdir.path();
                if (!P.startsWith(path, topdir)) {
                    throw new Error(path+": cannot access. Restricted to "+topdir);
                }
            }
            res=new SFile(this.rootFS, path);
            res.policy=policy;
        }
        if (res.policy) {
            return Util.privatize(res);
        } else {
            return res;
        }
    },
    contains: function (file) {
        A(SFile.is(file),file+" shoud be a SFile object.");
        if (!this.isDir()) return false;
        return P.startsWith( file.path(), this.path());
    },
    path: function () {
        return this._path;
    },
    name: function () {
        return P.name(this.path());
    },
    truncExt: function (ext) {
        return P.truncExt(this.path(),ext);
    },
    ext: function () {
        return P.ext(this.path());
    },
    relPath: function (base) {
        // base should be SFile or Path from rootFS
        var bp=(base.path ?
                base.path() :
                base );
        return P.relPath(this.path(), A.is(bp,P.Absolute) );
    },
    up: function () {
        var pathR=this.path();
        var pa=P.up(pathR);
        if (pa==null) return null;
        return this._resolve(pa);
    },
    rel: function (relPath) {
        A.is(relPath, P.Relative);
        this.assertDir();
        var pathR=this.path();
        return this._resolve(P.rel(pathR, relPath));
    },
    sibling: function (n) {
        return this.up().rel(n);
    },
    startsWith: function (pre) {
        return P.startsWith(this.name(),pre);
    },
    endsWith: function (post) {
        return P.endsWith(this.name(),post);
    },
    equals:function (o) {
        return (o && typeof o.path=="function" && o.path()==this.path());
    },
    toString:function (){
        return this.path();
    },
    //Common
    touch: function () {
        return this.act.fs.touch(this.act.path);
    },
    isReadOnly: function () {
        return this.act.fs.isReadOnly(this.act.path);
    },
    isTrashed:function () {
        var m=this.metaInfo();
        if (!m) return false;
        return m.trashed;
    },
    metaInfo: function () {
        if (arguments.length==0) {
            return this.getMetaInfo.apply(this,arguments);
        } else {
            return this.setMetaInfo.apply(this,arguments);
        }
    },
    getMetaInfo: function (options) {
        return this.act.fs.getMetaInfo(this.act.path,options);
    },
    setMetaInfo: function (info, options) {
        return this.act.fs.setMetaInfo(this.act.path,info, options);
    },
    getDirTree: function (options) {
        return this.act.fs.getDirTree(this.act.path, options);
    },
    assertExists: function () {
        A(this.exists(),this.path()+" does not exist.");
    },
    lastUpdate:function () {
        this.assertExists();
        return this.metaInfo().lastUpdate;
    },
    exists: function (options) {
        var args=Array.prototype.slice.call(arguments);
        if (typeof args[0]==="function") {
            var f=args.shift();
            return DU.resolve(this.exists.apply(this,args)).then(f);
        }
        options=options||{};
        var p=this.fs.exists(this.path(),options);
        if (p || options.noFollowLink) {
            return p;
        } else {
            return this.act.fs.exists(this.act.path,{noFollowLink:true});
        }
    },
    rm: function (options) {
        //   ln /test/c /a/b/
        //   rm a/b/c/
        //   rm a/b/c/d
        var t=this;
        options=options||{};
        if (this.isLink()) {
            return DU.resolve(this.fs.rm(this.path(),options));
        }
        /*if (!this.exists({noFollowLink:true})) {
            return this.act.fs.rm(this.act.path, options);
        }*/
        var a;
        if (this.isDir() && (options.recursive||options.r)) {
            a=this.each(function (f) {
                return f.rm(options);
            });
        } else {
            a=DU.resolve();
        }
        return a.then(function () {
            return t.act.fs.rm(t.act.path, options);
        });
        //var pathT=this.path();
        //this.fs.rm(pathT, options);
    },
    removeWithoutTrash: function (options) {
        options=options||{};
        options.noTrash=true;
        this.rm(options);
    },
    isDir: function () {
        return this.act.fs.isDir(this.act.path);
    },
    // File
    text:function (f) {
    	if (typeof f==="function") {
			return this.getText(f);
		}
        if (arguments.length>0) {
            return this.setText(arguments[0]);
        } else {
            return this.getText();
        }
    },
    setText:function (t) {
        A.is(t,String);
        if (this.isDir()) {
            throw new Error("Cannot write to directory: "+this.path());
        }
        var ct=this.contentType({def:null});
        //if (this.isText()) {
        if (ct!==null && !ct.match(/^text/) && Content.looksLikeDataURL(t)) {
            // bad knowhow: if this is a binary file apparently, convert to URL
            return DU.throwNowIfRejected(this.setContent(Content.url(t)));
            //return DU.resolve(this.act.fs.setContent(this.act.path, Content.url(t)));
        } else {
            // if use fs.setContentAsync, the error should be handled by .fail
            // setText should throw error immediately (Why? maybe old style of text("foo") did it so...)
            return DU.throwNowIfRejected(this.setContent(Content.plainText(t)));
            //return DU.resolve(this.act.fs.setContent(this.act.path, Content.plainText(t)));
        }
    },
    appendText:function (t) {
        A.is(t,String);
        //if (this.isText()) {
        return this.act.fs.appendContent(this.act.path, Content.plainText(t));
        /*} else {
            throw new Error("append only for text file");
        }*/
    },
    getContent: function (f) {
        if (typeof f=="function") {
            return this.act.fs.getContentAsync(this.act.path).then(f);
        }
        return this.act.fs.getContent(this.act.path);
    },
    setContent: function (c) {
        if (this.isDir()) {
            throw new Error("Cannot write to directory: "+this.path());
        }
        // why setContentAsync? AsyncでもDU.resolveはsyncをサポートしていればsyncでやってくれる...はず，Promiseだと遅延するからだめ．今までJQばっかりだったから問題が起きていなかった．
        // なので，fs2/promise.jsを追加．
        return this.act.fs.setContentAsync(this.act.path,c);
    },

    getText:function (f) {
    	if (typeof f==="function") {
    		//var t=this;
    	    return this.getContent(forceText).then(f);
    	}
        return forceText(this.act.fs.getContent(this.act.path));
        function forceText(c) {
	    	//if (t.isText()) {
            try {
                return c.toPlainText();
            } catch(e) {
    	    	return c.toURL();
    	    }
        }
    },
    getDataURL: function (f) {
        if (typeof f==="function") {
            return this.getContent(function (c) {
                return c.toURL();
            });
        }
        return this.getContent().toURL();
    },
    setDataURL: function (u) {
        return this.setContent(Content.url(u));
    },
    dataURL:function (d) {
        if (typeof d==="string") return this.setDataURL(d);
        if (typeof d==="function") return this.getDataURL(d);
        return this.getDataURL();
    },
    isText: function () {
        return this.act.fs.isText(this.act.path);
    },
    contentType: function (options) {
        return this.act.fs.getContentType(this.act.path,options);
    },
    bytes: function (b) {
        if (Content.isBuffer(b)) return this.setBytes(b);
        return this.getBytes();
    },
    setBytes:function (b) {
        return this.act.fs.setContent(this.act.path, Content.bin(b,this.contentType()));
    },
    getBytes:function (options) {
        options=options||{};
        return this.act.fs.getContent(this.act.path).toBin(options.binType);
    },
    getURL: function () {
        return this.act.fs.getURL(this.act.path);
    },
    lines:function (lines) {
        if (lines instanceof Array) {//WRITE
            return this.text(lines.join("\n"));
        } else if (typeof lines==="function") {//READ async
            return this.text(function (r) {
                return lines(r.replace(/\r/g,"").split("\n"));
            });
        }
        return this.text().replace(/\r/g,"").split("\n");
    },
    obj: function () {
        var file=this;
        if (arguments.length==0) {
            var t=file.text();
            if (!t) return null;
            return JSON.parse(t);
        } else {
            file.text(JSON.stringify(A.is(arguments[0],Object) ));
        }
    },
    copyFrom: function (src, options) {
        return src.copyTo(this,options);
    },
    copyTo: function (dst, options) {
        A(dst && dst.isSFile(),dst+" is not a file");
        var src=this;
        options=options||{};
        var srcIsDir=src.isDir();
        var dstIsDir=dst.isDir();
        if (!srcIsDir && dstIsDir) {
            dst=dst.rel(src.name());
            A(!dst.isDir(), dst+" is a directory.");
            dstIsDir=false;
        }
        if (srcIsDir && !dstIsDir) {
           this.err("Cannot move dir "+src.path()+" to file "+dst.path());
        } else if (!srcIsDir && !dstIsDir) {
            if (options.echo) options.echo(src+" -> "+dst);
            var res=this.act.fs.cp(this.act.path, dst.getResolvedLinkPath(),options);
            res=DU.resolve(res);
            if (options.a) {
                return res.then(function () {
                    return dst.setMetaInfo(src.getMetaInfo());
                });
            }
            return res;
        } else {
            A(srcIsDir && dstIsDir,"Both src and dst should be dir");
            return src.each(function (s) {
                var r;
                var dstf=dst.rel(s.name());
                if (options.progress) {
                    r=options.progress(dstf,{src:s,dst:dstf});
                }
                return DU.resolve(r).then(function () {
                    return dstf.copyFrom(s, options);
                });
            },options);
        }
        //file.text(src.text());
        //if (options.a) file.metaInfo(src.metaInfo());
    },
    moveFrom: function (src, options) {
        var t=this;
        return t.exists(function (ex) {
            return t.copyFrom(src,options).then(function () {
                return src.rm({recursive:true});
            },function (e) {
                // rollback
                if (!ex) return t.exists(function (ex) {
                    if (ex) return t.rm({recursive:true});
                }).then(function () {throw e;});
                throw e;
            });
        });
    },
    moveTo: function (dst, options) {
        return dst.moveFrom(this,options);
    },
    // Dir
    assertDir:function () {
        A.is(this.path(),P.Dir);
        return this;
    },
    each:function (f,options) {
        var dir=this.assertDir();
        return dir.listFilesAsync(options).then(function (ls) {
            return DU.each(ls,f);// ls.forEach(f)
        });
    },
    eachrev:function (f,options) {
        var dir=this.assertDir();
        return dir.listFilesAsync(options).then(function (ls) {
            return DU.each(ls.reverse(),f);// ls.forEach(f)
        });
    },
    recursive:function (fun,options) {
        var dir=this.assertDir();
        options=dir.convertOptions(options);
        return dir.each(function (f) {
            if (f.isDir()) return f.recursive(fun,options);
            else return fun(f);
        },options);
    },
    _listFiles:function (options,async) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        //var path=this.path();
        var ord;
        options=dir.convertOptions(options);
        if (!ord) ord=options.order;
        if (async) {
            return this.act.fs.opendirAsync(this.act.path, options).
            then(cvt);
        } else {
            return cvt( this.act.fs.opendir(this.act.path, options));
        }
        function cvt(di) {
            var res=[];
            for (var i=0;i<di.length; i++) {
                var name=di[i];
                //if (!options.includeTrashed && dinfo[i].trashed) continue;
                var f=dir.rel(name);
                if (options.excludesF(f) ) continue;
                res.push(f);
            }
            if (typeof ord=="function" && res.sort) res.sort(ord);
            return res;
        }
    },
    listFilesAsync:function (options) {
        return this._listFiles(options,true);
    },
    listFiles:function (options) {
        return this._listFiles(options,false);
    },
    ls:function (options) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        if (!options) {
            return this.act.fs.opendir(this.act.path, options);
        }
        var res=dir.listFiles(options);
        return res.map(function (f) {
            return f.name();
        });
    },
    convertOptions:function(o) {
        var options=Util.extend({},o);
        /*var dir=*/this.assertDir();
        var pathR=this.path();
        var excludes=options.excludes || {};
        if (typeof excludes==="function") {
            options.excludesF=excludes;
        } else if (typeof excludes==="object") {
            if (excludes instanceof Array) {
                var nex={};
                excludes.forEach(function (e) {
                    if (P.startsWith(e,"/")) {
                        nex[e]=1;
                    } else {
                        nex[pathR+e]=1;
                    }
                });
                excludes=nex;
            }
            options.excludesF=function (f) {
                return excludes[f.path()];
            };
        }
        return A.is(options,{excludesF:Function});
    },
    mkdir: function () {
        return this.touch();
    },
    link: function (to,options) {// % ln to path
        if (this.exists()) throw new Error(this.path()+": exists.");
        return this.act.fs.link(this.act.path,to.path(),options);
    },
    resolveLink:function () {
        return this._resolve(this.act.path);
    },
    isLink: function () {
        return this.fs.isLink(this.path());
    },
    getResolvedLinkPath: function () {
        return this.act.path;
    },
    getFS:function () {
        return this.act.fs;
    },
    observe: function (h) {
        return this.getFS().getRootFS().addObserver(this.path(),h);
    },
    getBlob: function () {
        return new Blob([this.bytes()],{type:this.contentType()});
    },
    setBlob: function (blob) {
        var t=this;
        return DU.promise(function (succ/*,err*/) {
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                // reader.result contains the contents of blob as a typed array
                DU.resolve(t.setBytes(reader.result)).then(succ);
            });
            reader.readAsArrayBuffer(blob);
        });
    },
    size: function (f) {
        if (!f) {
            if (!this.isDir()) {
                return this.act.fs.size(this.act.path);
                //return this.getBytes().byteLength;
            } else {
                var sum=0;
                this.each(function (f) {
                    sum+=f.size();
                });
                return sum;
            }
        } else {
            //TODO: async
        }
    },
    download: function () {
        if (this.isDir()) throw new Error(this+": Download dir is not support yet. Use 'zip' instead.");
        saveAs(this.getBlob(),this.name());
    },
    err: function () {
        var a=Array.prototype.slice.call(arguments);
        console.log.apply(console,a);
        throw new Error(a.join(""));
    },
    exportAsObject: function (options) {
        var base=this;
        var data={};
        this.recursive(function (f) {
            data[f.relPath(base)]=f.text();
        },options);
        var req={base:base.path(),data:data};
        return req;
    },
    importFromObject: function (data/*, options*/) {
        if (typeof data==="string") data=JSON.parse(data);
        data=data.data;
        for (var k in data) {
            this.rel(k).text(data[k]);
        }
    },
    watch: function (_1,_2) {
        var options={},handler=function(){};
        if (typeof _1==="object") options=_1;
        if (typeof _2==="object") options=_2;
        if (typeof _1==="function") handler=_1;
        if (typeof _2==="function") handler=_2;
        var rfs=this.getFS().getRootFS();
        //var t=this;
        rfs.addObserver(this.path(),function (path, meta) {
            handler(meta.eventType, rfs.get(path),meta );
        });
    }
};
Object.defineProperty(SFile.prototype,"act",{
    get: function () {
        if (this._act) return this._act;
        this._act={};// path/fs after follwed symlink
        this._act.path=this.fs.resolveLink(this._path);
        this._act.fs=this.rootFS.resolveFS(this._act.path);
        A.is(this._act, {fs:FSClass, path:P.Absolute});
        return this._act;
    }
});

return SFile;
});

define('RootFS',["assert","FSClass","PathUtil","SFile"], function (assert,FS,P,SFile) {
    var RootFS=function (defaultFS){
        assert.is(defaultFS,FS);
        this.mount(null, defaultFS);
    };
    var dst=RootFS.prototype;
    var p={
            err: function (path, mesg) {
                throw new Error(path+": "+mesg);
            },
            // mounting
            fstab: function () {
                return this._fstab=this._fstab||[];//[{fs:this, path:P.SEP}];
            },
            unmount: function (path, options) {
                assert.is(arguments,[P.AbsDir] );
                var t=this.fstab();
                console.log(t);
                for (var i=0; i<t.length; i++) {
                    if (t[i].mountPoint==path) {
                        t.splice(i,1);
                        return true;
                    }
                }
                return false;
            },
            availFSTypes:function (){
                return FS.availFSTypes();
            },
            mount: function (path, fs, options) {
                if (typeof fs=="string") {
                    var fact=assert( FS.availFSTypes()[fs] ,"fstype "+fs+" is undefined.");
                    fs=fact(path, options||{});
                }
                assert.is(fs,FS);
                fs.mounted(this, path);
                this.fstab().unshift(fs);
            },
            resolveFS:function (path, options) {
                assert.is(path,P.Absolute);
                var res;
                this.fstab().forEach(function (fs) {
                    if (res) return;
                    if (fs.inMyFS(path)) {
                        res=fs;
                    }
                });
                if (!res) this.err(path,"Cannot resolve");
                return assert.is(res,FS);
            },
            get: function (path) {
                assert.is(path,P.Absolute);
                return new SFile(this.resolveFS(path), path);
            },
            addObserver: function (_1,_2,_3) {
                this.observers=this.observers||[];
                var options={},path,f;
                if (typeof _1==="string") path=_1;
                if (typeof _2==="string") path=_2;
                if (typeof _3==="string") path=_3;
                if (typeof _1==="object") options=_1;
                if (typeof _2==="object") options=_2;
                if (typeof _3==="object") options=_3;
                if (typeof _1==="function") f=_1;
                if (typeof _2==="function") f=_2;
                if (typeof _3==="function") f=_3;
                assert.is(path,String);
                assert.is(f,Function);
                var fs=this.resolveFS(path);
                var remover=fs.onAddObserver(path,options);
                var observers=this.observers;
                var observer={
                    path:path,
                    handler:f,
                    remove: function () {
                        var i=observers.indexOf(this);
                        observers.splice(i,1);
                        if (remover) remover.remove();
                    }
                };
                this.observers.push(observer);
                return observer;
            },
            notifyChanged: function (path,metaInfo) {
                if (!this.observers) return;
                this.observers.forEach(function (ob) {
                    if (P.isChildOf(path,ob.path)) {
                        ob.handler(path,metaInfo);
                    }
                });
            },
            getRootFS:function () {
                return this;
            }
    };
    for (var i in p) {
        dst[i]=p[i];
    }
    return RootFS;
});

define('zip',["SFile",/*"jszip",*/"FileSaver","Util","DeferredUtil"],
function (SFile,/*JSZip,*/fsv,Util,DU) {
    var zip={};
    zip.setJSZip=function (JSZip) {
        zip.JSZip=JSZip;
        if (!DU.external.Promise) {
            DU.external.Promise=JSZip.external.Promise;
        }
    };
    if (typeof JSZip!=="undefined") zip.setJSZip(JSZip);
    zip.zip=function (dir,dstZip,options) {
        if (!SFile.is(dstZip)) options=dstZip;
        options=options||{};
        var jszip = new zip.JSZip();
        function loop(dst, dir) {
            return dir.each(function (f) {
                var r=DU.resolve();
                if (options.progress) {
                    r=options.progress(f);
                }
                return r.then(function () {
                    if (f.isDir()) {
                        var sf=dst.folder(f.name().replace(/[\/\\]$/,""));
                        return loop(sf, f);
                    } else {
                        return f.getContent(function (c) {
                            dst.file(f.name(),c.toArrayBuffer());
                        });
                    }
                });
            },options);
        }
        return loop(jszip, dir).then(function () {
            return DU.resolve(jszip.generateAsync({
                type:"arraybuffer",
                compression:"DEFLATE"
            }));
        }).then(function (content) {
            //console.log("zip.con",content);
            if (SFile.is(dstZip)) {
                return dstZip.setBytes(content);
            } else {
                saveAs(
                    new Blob([content],{type:"application/zip"}),
                    dir.name().replace(/[\/\\]$/,"")+".zip"
                );
            }
        });
    };
    zip.unzip=function (arrayBuf,destDir,options) {
        var c;
        var status={};
        options=options||{};
        if (SFile.is(arrayBuf)) {
        	c=arrayBuf.getContent();
        	arrayBuf=c.toArrayBuffer();
        }
        if (!options.onCheckFile) {
            options.onCheckFile=function (f) {
                if (options.overwrite) {
                    return f;
                } else {
                    if (f.exists()) {
                        return false;
                    }
                    return f;
                }
            };
        }
        var jszip=new zip.JSZip();
        return DU.resolve(jszip.loadAsync(arrayBuf)).then(function () {
            return DU.each(jszip.files,function (key,zipEntry) {
                //var zipEntry=jszip.files[i];
                var buf,dest;
                return DU.resolve(zipEntry.async("arraybuffer")).then(function (_buf) {
                    buf=_buf;
                    dest=destDir.rel(zipEntry.name);
                    if (options.progress) {
                        return DU.resolve(options.progress(dest));
                    }
                }).then(function () {
                    console.log("Inflating",zipEntry.name);
                    if (dest.isDir()) return;
                    var s={
                        file:dest,
                        status:"uploaded"
                    };
                    status[dest.path()]=s;
                    var c=FS.Content.bin( buf, dest.contentType() );
                    var res=options.onCheckFile(dest,c);
                    if (res===false) {
                        s.status="cancelled";
                        dest=null;
                    }
                    if (SFile.is(res)) {
                        if (dest.path()!==res.path()) s.redirectedTo=res;
                        dest=res;
                    }
                    if (dest) return dest.setContent(c);
                });
            });
        }).then(function () {
            console.log("unzip done",status);
            return status;
        });
    };
    return zip;
});

/*(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';*/
// modified from https://github.com/taylorhakes/promise-polyfill/blob/master/dist/polyfill.js
// if promise resolved immediately, it will run f of then(f)
// P.resolve(5).then(e=>console.log(e)); console.log(3)  ->  show 5 3, while original is 3 5
define('promise',[], function() {

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn = function (fn) {fn();};/*
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };
*/

Promise._unhandledRejectionFn = function _unhandledRejectionFn(/*err*/) {
  if (typeof console !== 'undefined' && console) {
    //console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};
/** @suppress {undefinedVars} */
/*
var globalNS = (function() {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
})();

if (!('Promise' in globalNS)) {
  globalNS['Promise'] = Promise;
} else if (!globalNS.Promise.prototype['finally']) {
  globalNS.Promise.prototype['finally'] = finallyConstructor;
}*/
return Promise;
});

define('FS',["FSClass","NativeFS","LSFS", "WebFS", "PathUtil","Env","assert","SFile","RootFS","Content","zip","DeferredUtil","promise"],
        function (FSClass,NativeFS,LSFS,WebFS, P,Env,A,SFile,RootFS,Content,zip,DU,PR) {
    var FS={};
    FS.assert=A;
    FS.Content=Content;
    FS.Class=FSClass;
    FS.DeferredUtil=DU;
    if (!DU.config.useJQ) {
        DU.external.Promise=PR;
    }
    FS.Env=Env;
    FS.LSFS=LSFS;
    FS.NativeFS=NativeFS;
    FS.PathUtil=P;
    FS.RootFS=RootFS;
    FS.SFile=SFile;
    FS.WebFS=WebFS;
    FS.zip=zip;
    //if (zip.JSZip) DU.external.Promise=zip.JSZip.external.Promise;
    if (typeof window=="object") window.FS=FS;
    var rootFS;
    var env=new Env({});
    FS.addFSType=FSClass.addFSType;
    FS.availFSTypes=FSClass.availFSTypes;

    FS.setEnvProvider=function (e) {
        env=e;
    };
    FS.getEnvProvider=function () {
        return env;
    };
    FS.setEnv=function (key, value) {
        if (typeof key=="object") {
            for (var k in key) {
                env.set(k,key[k]);
            }
        }else {
            env.set(key,value);
        }
    };
    FS.getEnv=function (key) {
        if (typeof key=="string") {
            return env.get(key);
        }else {
            return env.value;
        }
    };
    FS.init=function (fs) {
        if (rootFS) return;
        if (!fs) {
            if (NativeFS.available) {
                fs=new NativeFS();
            } else if (typeof localStorage==="object") {
                fs=new LSFS(localStorage);
            } else if (typeof importScripts==="function") {
                // Worker
                /* global self*/
                self.addEventListener("message", function (e) {
                    var data=e.data;
                    if (typeof data==="string") {
                        data=JSON.parse(data);
                    }
                    switch(data.type) {
                    case "upload":
                        FS.get(data.base).importFromObject(data.data);
                        break;
                    case "observe":
                        rootFS.observe(data.path, function (path,meta) {
                            self.postMessage(JSON.stringify({
                                type: "changed",
                                path: path,
                                content: FS.get(path).text(),
                                meta: meta
                            }));
                        });
                        break;
                    }
                });
                fs=LSFS.ramDisk();
            }
        }
        rootFS=new RootFS(fs);
    };
    FS.getRootFS=function () {
        FS.init();
        return rootFS;
    };
    FS.get=function () {
        FS.init();
        return rootFS.get.apply(rootFS,arguments);
    };
    FS.expandPath=function () {
        return env.expandPath.apply(env,arguments);
    };
    FS.resolve=function (path, base) {
        FS.init();
        if (SFile.is(path)) return path;
        path=env.expandPath(path);
        if (base && !P.isAbsolutePath(path)) {
            base=env.expandPath(base);
            return FS.get(base).rel(path);
        }
        return FS.get(path);
    };
    FS.mount=function () {
        FS.init();
        return rootFS.mount.apply(rootFS,arguments);
    };
    FS.unmount=function () {
        FS.init();
        return rootFS.unmount.apply(rootFS,arguments);
    };
    FS.isFile=function (f) {
        return SFile.is(f);
    };
    return FS;
});

//-----------
	var resMod;
	requirejs(["FS"], function (r) {
	  resMod=r;
	});
	if (typeof window!=="undefined" && window.FS===undefined) window.FS=resMod;
	if (typeof module!=="undefined") module=resMod;
	return resMod;
});
//})(window);

/*global process*/
define('WebSite',[], function () {
	if (typeof document==="undefined") {
		// node?;
		return {};
	}
	var loc=document.location.href;
	var WS=window.WebSite={};
	WS.builtinAssetNames={
		"base.png":{name:"$pat_base", url: "${runtime}images/base.png", pwidth:32, pheight:32},
		"Sample.png":{name:"$pat_sample", url: "${runtime}images/Sample.png"},
		"neko.png":{name:"$pat_neko", url: "${runtime}images/neko.png", pwidth:32, pheight:32},
		"mapchip.png":{name:"$pat_mapchip", url: "${runtime}images/mapchip.png", pwidth:32, pheight:32}
	};
	// from https://w3g.jp/blog/js_browser_sniffing2015
	var u=window.navigator.userAgent.toLowerCase();
	WS.tablet=(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
	|| u.indexOf("ipad") != -1
	|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
	|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
	|| u.indexOf("kindle") != -1
	|| u.indexOf("silk") != -1
	|| u.indexOf("playbook") != -1;
	WS.mobile=(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
	|| u.indexOf("iphone") != -1
	|| u.indexOf("ipod") != -1
	|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
	|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
	|| u.indexOf("blackberry") != -1;
	//-------------
	WS.top=".";
	if (!WS.pluginTop) {
		WS.pluginTop=WS.top+"/js/plugins";
	}
	WS.disableROM={};
	WS.sampleImg=WS.top+"/images";
	WS.isNW=(typeof process=="object" && process.__node_webkit);
	//WS.fsHome="";
	WS.tonyuHome="/Tonyu/";//changeHOME
	WS.JSLKer="runtime/lib/tjs/kernel.js";
	//WS.JSLKer="fs/Tonyu/Projects/JSLKer";
	WS.serverTop=location.href.replace(/\?.*$/,"").replace(/[^\/]*$/,"");//"."; // includes /
	WS.phpTop=WS.serverTop+"";//php/";
	WS.url={
		getDirInfo:WS.serverTop+"?getDirInfo",
		getFiles:WS.serverTop+"?getFiles",
		putFiles:WS.serverTop+"?putFiles"
/*			getDirInfo:WS.phpTop+"getDirInfo.php",
			getFiles:WS.phpTop+"getFiles.php",
			putFiles:WS.phpTop+"putFiles.php"*/
	};
	WS.controller=WS.serverTop+"";
	WS.runtime=WS.serverTop+"runtime/";
	//WS.published=WS.serverTop+"fs/home/";
	WS.published=WS.serverTop+"fs/pub/";
	WS.serverType="BA";
	WS.urlAliases= {
			"images/base.png":WS.runtime+"images/base.png",
			"images/Sample.png":WS.runtime+"images/Sample.png",
			"images/neko.png":WS.runtime+"images/neko.png",
			"images/inputPad.png":WS.runtime+"images/inputPad.png",
			"images/mapchip.png":WS.runtime+"images/mapchip.png",
			"images/sound.png":WS.runtime+"images/sound.png",
			"images/sound_ogg.png":WS.runtime+"images/sound_ogg.png",
			"images/sound_mp3.png":WS.runtime+"images/sound_mp3.png",
			"images/sound_mp4.png":WS.runtime+"images/sound_mp4.png",
			"images/sound_m4a.png":WS.runtime+"images/sound_m4a.png",
			"images/sound_mid.png":WS.runtime+"images/sound_mid.png",
			"images/sound_wav.png":WS.runtime+"images/sound_wav.png",
			"images/sound_mzo.png":WS.runtime+"images/sound_mzo.png",
			"images/ecl.png":WS.runtime+"images/ecl.png"
	};
	WS.compiledKernel=WS.runtime+"/lib/tonyu/kernel.js";
	/*if (WS.isNW) {
		if (process.env.TONYU_HOME) {
			WS.tonyuHome=process.env.TONYU_HOME.replace(/\\/g,"/");
		} else {
			WS.tonyuHome=process.cwd().replace(/\\/g,"/").replace(/\/$/,"")+"/fs/Tonyu/";
		}
	}*///DELJSL
	WS.tonyuKernel=WS.tonyuHome+"Kernel/";
	setDefaultResource(WS);
	function setDefaultResource(WebSite) {
		WebSite.defaultResource={
	       images:[
	          {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
	          {name:"$pat_sample", url: "images/Sample.png"},
	          {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
	          {name:"$pat_mapchip", url: "images/mapchip.png", pwidth:32, pheight:32}
	       ],
	       sounds:[]
	    };
	}
	return WS;
});

define('FS',["FSLib","WebSite"],
        function (FS,WebSite) {
    FS.setEnv(WebSite);
    return FS;
});
/*global window,self,global*/
define('root',[],function (){
    if (typeof window!=="undefined") return window;
    if (typeof self!=="undefined") return self;
    if (typeof global!=="undefined") return global;
    return (function (){return this;})();
});

define ('FileList',["FS","root"],function(FS,root) {
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

define('exceptionCatcher',[], function () {
    var res={};
    res.f=function (f) {
        if (typeof f=="function") {
            if (f.isTrcf) return f;
            var r=function () {
                if (res.handleException && !res.enter) {
                    try {
                        res.enter=true;
                        return f.apply(this,arguments);
                    } catch (e) {
                        res.handleException(e);
                    } finally {
                        res.enter=false;
                    }
                } else {
                    return f.apply(this,arguments);
                }
            };
            r.isTrcf=true;
            return r;
        } else if(typeof f=="object") {
            for (var k in f) {
                f[k]=res.f(f[k]);
            }
            return f;
        }
    };
    //res.handleException=function (){};
    return res;
});
define('UI',["Util","exceptionCatcher"],function (Util, EC) {
    var UI={};
    var F=EC.f;
    UI=function () {
        var expr=[];
        for (var i=0 ; i<arguments.length ; i++) {
            expr[i]=arguments[i];
        }
        var listeners=[];
        var $vars={};
        var $edits=[];
        var res=parse(expr);
        res.$edits=$edits;
        res.$vars=$vars;
        $edits.load=function (model) {
            $edits.model=model;
            $edits.forEach(function (edit) {
                $edits.writeToJq(edit.params.$edit, edit.jq);
            });
            $edits.validator.on.validate.call($edits.validator, $edits.model);
        };
        $edits.writeToJq=function ($edit, jq) {
        	var m=$edits.model;
            if (!m) return;
            var name = $edit.name;
            var a=name.split(".");
            for (var i=0 ; i<a.length ;i++) {
                m=m[a[i]];
            }
            m=$edit.type.toVal(m);
            if (jq.attr("type")=="checkbox") {
                jq.prop("checked",!!m);
            } else {
                jq.val(m);
            }
        };
        $edits.validator={
       		errors:{},
       		show: function () {
                var name;
       			if ($vars.validationMessage) {
       				$vars.validationMessage.empty();
       				for (name in this.errors) {
       					$vars.validationMessage.append(UI("div", this.errors[name].mesg));
       				}
       			}
       			if ($vars.OKButton) {
       				var ok=true;
       				for (name in this.errors) {
       					ok=false;
       				}
       				$vars.OKButton.attr("disabled", !ok);
       			}
       		},
       		on: {
       			validate: function () {}
       		},
       		addError: function (name, mesg, jq) {
       			this.errors[name]={mesg:mesg, jq:jq};
       			this.show();
       		},
       		removeError: function (name) {
       			delete this.errors[name];
       			this.show();
       		},
       		allOK: function () {
       			for (var i in this.errors) {
       				delete this.errors[i];
       			}
       			this.show();
       		},
       		isValid: function () {
       		    var res=true;
       		    for (var i in this.errors) res=false;
       		    return res;
       		}
        };
        $edits.writeToModel=function ($edit, val ,jq) {
            var m=$edits.model;
        	//console.log($edit, m);
            if (!m) return;
            var name = $edit.name;
            try {
                val=$edit.type.fromVal(val);
            } catch (e) {
            	$edits.validator.addError(name, e, jq);
            	//$edits.validator.errors[name]={mesg:e, jq:jq};
                //$edits.validator.change(name, e, jq);
                return;
            }
            $edits.validator.removeError(name);
            /*
            if ($edits.validator.errors[name]) {
                delete $edits.validator.errors[name];
                $edits.validator.change(name, null, jq);
            }*/
            var a=name.split(".");
            for (var i=0 ; i<a.length ;i++) {
                if (i==a.length-1) {
                    if ($edits.on.writeToModel(name,val)) {

                    } else {
                        m[a[i]]=val;
                    }
                } else {
                    m=m[a[i]];
                }
            }
            $edits.validator.on.validate.call($edits.validator, $edits.model);
        };
        $edits.on={};
        $edits.on.writeToModel= function (name, val) {};

        if (listeners.length>0) {
            setTimeout(F(l),50);
        }
        function l() {
            listeners.forEach(function (li) {
                li();
            });
            setTimeout(F(l),50);
        }
        return res;
        function parse(expr) {
            if (expr instanceof Array) return parseArray(expr);
            else if (typeof expr=="string") return parseString(expr);
            else return expr;
        }
        function parseArray(a) {
            var tag=a[0];
            var i=1;
            var res=$("<"+tag+">");
            if (typeof a[i]=="object" && !(a[i] instanceof Array) && !(a[i] instanceof $) ) {
                parseAttr(res, a[i],tag);
                i++;
            }
            while (i<a.length) {
                res.append(parse(a[i]));
                i++;
            }
            return res;
        }
        function parseAttr(jq, o, tag) {
            if (o.$var) {
                $vars[o.$var]=jq;
            }
            if (o.$edit) {
                if (typeof o.$edit=="string") {
                    o.$edit={name: o.$edit, type: UI.types.String};
                }
                if (!o.on) o.on={};
                o.on.realtimechange=F(function (val) {
                    $edits.writeToModel(o.$edit, val, jq);
                });
                if (!$vars[o.$edit.name]) $vars[o.$edit.name]=jq;
                $edits.push({jq:jq,params:o});
            }
            for (var k in o) {
                if (k=="on") {
                    for (var e in o.on) on(e, o.on[e]);
                } else if (k=="css" && o[k]!=null) {//ADDJSL
                    jq.css(o[k]);
                } else if (!Util.startsWith(k,"$") && o[k]!=null) {//ADDJSL
                    jq.attr(k,o[k]);
                }
            }
            function on(eType, li) {
                if (!li) return; //ADDJSL
                if (eType=="enterkey") {
                    jq.on("keypress",F(function (ev) {
                        if (ev.which==13) li.apply(jq,arguments);
                    }));
                } else if (eType=="realtimechange") {
                    var first=true, prev;
                    listeners.push(function () {
                        var cur;
                        if (o.type=="checkbox") {
                            cur=!!jq.prop("checked");
                        } else {
                            cur=jq.val();
                        }
                        if (first || prev!=cur) {
                            li.apply(jq,[cur,prev]);
                            prev=cur;
                        }
                        first=false;
                    });
                } else {
                    jq.on(eType, F(li));
                }
            }
        }
        function parseString(str) {
            return $(document.createTextNode(str));
            //return $("<span>").text(str);
        }
    };
    UI.types={
       String: {
           toVal: function (val) {
               return val;
           },
           fromVal: function (val) {
               return val;
           }
       },
       Number: {
           toVal: function (val) {
               return val+"";
           },
           fromVal: function (val) {
               return parseFloat(val);
           }
       }
   };
    return UI;
});

/*global global*/
define('assert',[],function () {
    var Assertion=function(failMesg) {
        this.failMesg=flatten(failMesg || "Assertion failed: ");
    };
    var $a;
    Assertion.prototype={
        _regedType:{},
        registerType: function (name,t) {
            this._regedType[name]=t;
        },
        MODE_STRICT:"strict",
        MODE_DEFENSIVE:"defensive",
        MODE_BOOL:"bool",
        fail:function () {
            var a=$a(arguments);
            var value=a.shift();
            a=flatten(a);
            a=this.failMesg.concat(value).concat(a);//.concat(["mode",this._mode]);
            console.log.apply(console,a);
            if (this.isDefensive()) return value;
            if (this.isBool()) return false;
            throw new Error(a.join(" "));
        },
        subAssertion: function () {
            var a=$a(arguments);
            a=flatten(a);
            return new Assertion(this.failMesg.concat(a));
        },
        assert: function (t,failMesg) {
            if (!t) return this.fail(t,failMesg);
            return t;
        },
        eq: function (a,b) {
            if (a!==b) return this.fail(a,"!==",b);
            return this.isBool()?true:a;
        },
        ne: function (a,b) {
            if (a===b) return this.fail(a,"===",b);
            return this.isBool()?true:a;
        },
        isset: function (a, n) {
            if (a==null) return this.fail(a, (n||"")+" is null/undef");
            return this.isBool()?true:a;
        },
        is: function (value,type) {
            var t=type,v=value,na;
            if (t==null) {
                return this.fail(value, "assert.is: type must be set");
                // return t; Why!!!!???? because is(args,[String,Number])
            }
            if (t._assert_func) {
                t._assert_func.apply(this,[v]);
                return this.isBool()?true:value;
            }
            this.assert(value!=null,[value, "should be ",t]);
            if (t instanceof Array || (typeof global=="object" && typeof global.Array=="function" && t instanceof global.Array) ) {
                if (!value || typeof value.length!="number") {
                    return this.fail(value, "should be array:");
                }
                var self=this;
                for (var i=0 ;i<t.length; i++) {
                    na=self.subAssertion("failed at ",value,"[",i,"]: ");
                    if (t[i]==null) {
                        console.log("WOW!7", v[i],t[i]);
                    }
                    na.is(v[i],t[i]);
                }
                return this.isBool()?true:value;
            }
            if (t===String || t=="string") {
                this.assert(typeof(v)=="string",[v,"should be a string "]);
                return this.isBool()?true:value;
            }
            if (t===Number || t=="number") {
                this.assert(typeof(v)=="number",[v,"should be a number"]);
                return this.isBool()?true:value;
            }
            if (t instanceof RegExp || (typeof global=="object" && typeof global.RegExp=="function" && t instanceof global.RegExp)) {
                this.is(v,String);
                this.assert(t.exec(v),[v,"does not match to",t]);
                return this.isBool()?true:value;
            }
            if (t===Function) {
                this.assert(typeof v=="function",[v,"should be a function"]);
                return this.isBool()?true:value;
            }
            if (typeof t=="function") {
                this.assert((v instanceof t),[v, "should be ",t]);
                return this.isBool()?true:value;
            }
            if (t && typeof t=="object") {
                for (var k in t) {
                    na=this.subAssertion("failed at ",value,".",k,":");
                    na.is(value[k],t[k]);
                }
                return this.isBool()?true:value;
            }
            if (typeof t=="string") {
                var ty=this._regedType[t];
                if (ty) return this.is(value,ty);
                //console.log("assertion Warning:","unregistered type:", t, "value:",value);
                return this.isBool()?true:value;
            }
            return this.fail(value, "Invaild type: ",t);
        },
        ensureError: function (action, err) {
            try {
                action();
            } catch(e) {
                if(typeof err=="string") {
                    assert(e+""===err,action+" thrown an error "+e+" but expected:"+err);
                }
                console.log("Error thrown successfully: ",e.message);
                return;
            }
            this.fail(action,"should throw an error",err);
        },
        setMode:function (mode) {
            this._mode=mode;
        },
        isDefensive:function () {
            return this._mode===this.MODE_DEFENSIVE;
        },
        isBool:function () {
            return this._mode===this.MODE_BOOL;
        },
        isStrict:function () {
            return !this.isDefensive() && !this.isBool();
        }
    };
    $a=function (args) {
        var a=[];
        for (var i=0; i<args.length ;i++) a.push(args[i]);
        return a;
    };
    var top=new Assertion();
    var assert=function () {
        try {
            return top.assert.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    ["setMode","isDefensive","is","isset","ne","eq","ensureError"].forEach(function (m) {
        assert[m]=function () {
            try {
                return top[m].apply(top,arguments);
            } catch(e) {
                console.log(e.stack);
                //if (top.isDefensive()) return arguments[0];
                //if (top.isBool()) return false;
                throw new Error(e.message);
            }
        };
    });
    assert.fail=top.fail.bind(top);
    assert.MODE_STRICT=top.MODE_STRICT;
    assert.MODE_DEFENSIVE=top.MODE_DEFENSIVE;
    assert.MODE_BOOL=top.MODE_BOOL;
    assert.f=function (f) {
        return {
            _assert_func: f
        };
    };
    assert.opt=function (t) {
        return assert.f(function (v) {
            return v==null || v instanceof t;
        });
    };
    assert.and=function () {
        var types=$a(arguments);
        assert(types instanceof Array);
        return assert.f(function (value) {
            var t=this;
            for (var i=0; i<types.length; i++) {
                t.is(value,types[i]);
            }
        });
    };
    function flatten(a) {
        if (a instanceof Array) {
            var res=[];
            a.forEach(function (e) {
                res=res.concat(flatten(e));
            });
            return res;
        }
        return [a];
    }
    /*function isArg(a) {
        return "length" in a && "caller" in a && "callee" in a;
    };*/
    return assert;
});

define('FileMenu',["UI","FS","assert"], function (UI,FS,A) {
var FileMenu=function () {
    var FM={on:{}};
    FM.on.validateName=function (name,action) {
        if (!name) return {ok:false, reason:"ファイル名を入力してください"};
        // return {ok:true, file:File } || {ok: false, reason:String}
        var curDir=FM.on.getCurDir();
        var f=curDir.rel(name);
        return {ok: true, file: f};
    };
    FM.on.displayName=function (fname) {
        return fname;//();
    };
    FM.on.close=function () {};
    FM.on.open=function (f){
        if (typeof FM.fileList=="object") {
            FM.fileList.select(f);
        }
    };
    FM.on.ls=function () {
        if (typeof FM.fileList=="object") {
            FM.fileList.ls();
        }
    };
    FM.on.getCurFile=function () {
        if (typeof FM.fileList=="object") {
            return FM.fileList.curFile();
        }
        throw new Error("on.getCurFile is missing");
    };
    FM.on.getCurDir=function () {
        if (typeof FM.fileList=="object") {
            return FM.fileList.curDir();
        }
        throw new Error("on.getCurDir is missing");
    };
    FM.on.createContent=function (f) {
        return f.text("");
    };
    FM.onMenuStart=function (){};
    FM.dialog=function (title, name, onend) {
    	return FM.dialogOpt({title:title, name:name, onend:onend});
    };
    FM.dialogOpt=function (options) {
    	var title=options.title;
    	var name=options.name || "";
    	var onend=options.onend || function (){};
        //var t;
        if (!FM.d) FM.d=UI(["div"], {title: title},
             "ファイル名を入力してください",["br"],
             ["input", {
	            id:"inputDialog",
	            class:"preventBackConfirm",
                $var: "name",
                on:{
                	 enterkey:function () {
                		 FM.d.$vars.done();
                	 },
                	 realtimechange: function (v) {
                		 FM.d.$vars.chg(v);
                	 }
                 }
             }],
             ["br"],
             ["div",{$var:"extra"}],
             ["div",{$var:"msg"}],
            ["button", {$var:"b", on:{click: function () {
            	FM.d.$vars.done();
       	 	}}}, "OK"]
        );
        FM.d.attr({title:title});
        var v=FM.d.$vars;
        //console.log(name);
        v.name.val(name);
        FM.d.dialog({title:title});
        var r=null;
        v.done=function() {
            if (!r || !r.ok) return;
            A.is(r.file,"SFile");
            //clearInterval(t);
            onend(r.file);
            FM.d.dialog("close");
        };
        v.chg=function (s) {
            r=FM.on.validateName(s,options);
            if (r.ok && r.file.exists()) r={ok:false, reason:s+"は存在します"};
            if (!r.ok) {
                v.msg.css({"color":"red"});
                v.msg.text(r.reason);
                v.b.attr("disabled",true);
            } else {
                v.msg.css({"color":"blue"});
                v.msg.text(r.note || "");
                v.b.removeAttr("disabled");
            }
        };
        v.extra.empty();
        if (options.extraUI) {
            options.extraUI(v.extra);
        }
    };

    FM.create=function () {
        FM.onMenuStart("create");
        FM.dialogOpt({title:"新規作成", action:"create", onend:function (f) {
            if (!f.exists()) {
                FM.on.createContent(f); //f.text("");
                FM.on.ls();
                FM.on.open(f);
            }
        }});
    };
    FM.mv=function () {
        FM.onMenuStart("mv");
        var curFile=FM.on.getCurFile();
        if (!curFile) return;
        var oldName=FM.on.displayName(curFile.name());
        /*var oldName,  mode;
        if (typeof oldNameD=="string") oldName=oldNameD;
        else { oldName=oldNameD.name; mode=oldNameD.mode;}*/
        FM.dialogOpt({title:"名前変更", name:oldName, action:"mv", extraUI:FM.on.mvExtraUI, onend:function (nf) {
            if (!nf) return;
            if (FM.on.mv && FM.on.mv(curFile,nf)===false) {
                return;
            }
            var t=curFile.text();
            curFile.rm();
            FM.on.close(curFile);
            curFile=nf;
            nf.text(t);
            FM.on.ls();
            FM.on.open(curFile);
        }});
    };
    FM.rm=function (){
        FM.onMenuStart("rm");
        var curFile=FM.on.getCurFile();
        if (!curFile) return;
        A.is(curFile,"SFile");
        if (!confirm(curFile.name()+"を削除しますか？")) return;
        if (FM.on.rm && FM.on.rm(curFile)===false) return;
        curFile.rm();
        FM.on.ls();
        FM.on.close(curFile);
    };
    /*$(function () {
        $("#newFile").click(FM.create);
        $("#mvFile").click(FM.mv);
        $("#rmFile").click(FM.rm);
    });*/
    return FM;
};
return FileMenu;

});

/*global define*/
define('fixIndent',[],function () {
	return fixIndent;
function fixIndent(str, indentStr) {
	if (!indentStr) indentStr="    ";
	var incdec={"{":1, "}":-1,"[":1,"]":-1,"「":1,"」":-1};
	var linfo=[];
		var r={row:0, col:0};
		var len=str.length;
		for (var i=0 ; i<len ;i++) {
			var c=str.substring(i,i+1);
			if (incdec[c]) {
				if (!linfo[r.row]) linfo[r.row]="";
				linfo[r.row]+=c;
			} else if (c=="\n") {
				r.row++;
				r.col=0;
			} else {
				r.col++;
			}
		}
	//}
	//console.log(linfo);
	var res="";
	var lines=str.split("\n");
	var curDepth=0;
	var row=0;
	lines.forEach(function (line) {
		var opens=0, closes=0;
		line=line.replace(/^\s*/,"");
		if (linfo[row]!=null) {
			linfo[row].match(/^([\]\}\)」]*)/);
			//console.log(linfo[row],RegExp.$1);
			closes=RegExp.$1.length;
			linfo[row].match(/([\[\{\(「]*)$/);
			//console.log(linfo[row],RegExp.$1);
			opens=RegExp.$1.length;
		}
		curDepth-=closes;
		line=indStr()+line;
		curDepth+=opens;
		res+=line+"\n";
		row++;
	});
	res=res.replace(/\n$/,"");
	//console.log(res);
	return res;
	function indStr() {
		var res="";
		for (var i=0 ;i<curDepth ;i++) {
			res+=indentStr;
		}
		return res;
	}
}
});

define('Shell',["FS","assert"],
        function (FS,assert) {
    var Shell={};
    var PathUtil=assert(FS.PathUtil);
    Shell.newCommand=function (name,func) {
        this[name]=func;
    };
    Shell.cd=function (dir) {
        Shell.cwd=resolve(dir,true);
        return Shell.pwd();
    };
    Shell.vars=Object.create(FS.getEnv());
    Shell.mount=function (options, path) {
        //var r=resolve(path);
        if (!options || !options.t) {
            var fst=[];
            for (var k in FS.getRootFS().availFSTypes()) {
                fst.push(k);
            }
            sh.err("-t=("+fst.join("|")+") should be specified.");
            return;
        }
        FS.mount(path,options.t, options);
    };
    Shell.unmount=function (path) {
        FS.unmount(path);
    };
    Shell.fstab=function () {
        var rfs=FS.getRootFS();
        var t=rfs.fstab();
        var sh=this;
        //sh.echo(rfs.fstype()+"\t"+"<Root>");
        t.forEach(function (fs) {
            sh.echo(fs.fstype()+"\t"+(fs.mountPoint||"<Default>"));
        });
    }
    Shell.resolve=resolve;
    function resolve(v, mustExist) {
        var r=resolve2(v);
        if (!FS.SFile.is(r)) {console.log(r," is not file");}
        if (mustExist && !r.exists()) throw new Error(r+": no such file or directory");
        return r;
    }
    function resolve2(v) {
        if (typeof v!="string") return v;
        var c=Shell.cwd;
        if (PathUtil.isAbsolutePath(v)) return FS.resolve(v,c);
        return c.rel(v);
    }
    Shell.pwd=function () {
        return Shell.cwd+"";
    };
    Shell.ls=function (dir){
    	if (!dir) dir=Shell.cwd;
    	else dir=resolve(dir, true);
        return dir.ls();
    };
    Shell.cp=function (from ,to ,options) {
        if (!options) options={};
        if (options.v) {
            Shell.echo("cp", from ,to);
            options.echo=Shell.echo.bind(Shell);
        }
        var f=resolve(from, true);
        var t=resolve(to);
        return f.copyTo(t,options);
    };
    Shell.ln=function (to , from ,options) {
        var f=resolve(from);
        var t=resolve(to, true);
        if (f.isDir() && f.exists()) {
            f=f.rel(t.name());
        }
        if (f.exists()) {
            throw new Error(f+" exists");
        }
        return f.link(t,options);
    };
    Shell.rm=function (file, options) {
        if (!options) options={};
        if (options.notrash) {
            file=resolve(file, false);
            file.removeWithoutTrash();
            return 1;
        }
        file=resolve(file, true);
        if (file.isDir() && options.r) {
            var dir=file;
            var sum=0;
            dir.each(function (f) {
                if (f.exists()) {
                    sum+=Shell.rm(f, options);
                }
            });
            dir.rm();
            return sum+1;
        } else {
            file.rm();
            return 1;
        }
    };
    Shell.mkdir=function (file,options) {
        file=resolve(file, false);
        if (file.exists()) throw new Error(file+" : exists");
        return file.mkdir();

    };
    Shell.cat=function (file,options) {
        file=resolve(file, true);
        return Shell.echo(file.getContent(function (c) {
            if (file.isText()) {
                return c.toPlainText();
            } else {
                return c.toURL();
            }
        }));
    };
    Shell.resolve=function (file) {
        if (!file) file=".";
        file=resolve(file);
        return file;
    };
    Shell.grep=function (pattern, file, options) {
        file=resolve(file, true);
        if (!options) options={};
        if (!options.res) options.res=[];
        if (file.isDir()) {
            file.each(function (e) {
                Shell.grep(pattern, e, options);
            });
        } else {
            if (typeof pattern=="string") {
                file.lines().forEach(function (line, i) {
                    if (line.indexOf(pattern)>=0) {
                        report(file, i+1, line);
                    }
                });
            }
        }
        return options.res;
        function report(file, lineNo, line) {
            if (options.res) {
                options.res.push({file:file, lineNo:lineNo,line:line});
            }
            Shell.echo(file+"("+lineNo+"): "+line);

        }
    };
    Shell.touch=function (f) {
    	f=resolve(f);
    	f.text(f.exists() ? f.text() : "");
    	return 1;
    };
    Shell.setout=function (ui) {
        Shell.outUI=ui;
    };
    Shell.echo=function () {
        return $.when.apply($,arguments).then(function () {
            console.log.apply(console,arguments);
            if (Shell.outUI && Shell.outUI.log) Shell.outUI.log.apply(Shell.outUI,arguments);
        });
    };
    Shell.err=function (e) {
        console.log.apply(console,arguments);
        if (e && e.stack) console.log(e.stack);
        if (Shell.outUI && Shell.outUI.err) Shell.outUI.err.apply(Shell.outUI,arguments);
    };
    Shell.clone= function () {
        var r=Object.create(this);
        r.vars=Object.create(this.vars);
        return r;
    };
    Shell.getvar=function (k) {
        return this.vars[k] || (process && process.env[k]);
    };
    Shell.get=Shell.getvar;
    Shell.set=function (k,v) {
        return this.vars[k]=v;
    };
    Shell.strcat=function () {
        if (arguments.length==1) return arguments[0];
        var s="";
        for (var i=0;i<arguments.length;i++) s+=arguments[i];
        return s;
    };
    Shell.exists=function (f) {
        f=this.resolve(f);
        return f.exists();
    };
    Shell.dl=function (f) {
        return f.download();
    };
    Shell.zip=function () {
        var t=this;
        var a=Array.prototype.slice.call(arguments).map(function (e) {
            if (typeof e==="string") return t.resolve(e);
            return e;
        });
        return FS.zip.zip.apply(FS.zip,a);
    };
    Shell.unzip=function () {
        var t=this;
        var a=Array.prototype.slice.call(arguments).map(function (e) {
            if (typeof e==="string") return t.resolve(e);
            return e;
        });
        return FS.zip.unzip.apply(FS.zip,a);
    };

    Shell.prompt=function () {};
    Shell.ASYNC={r:"SH_ASYNC"};
    Shell.help=function () {
        for (var k in Shell) {
            var c=Shell[k];
            if (typeof c=="function") {
                Shell.echo(k+(c.description?" - "+c.description:""));
            }
        }
    };
    if (!window.sh) window.sh=Shell;
    if (typeof process=="object") {
        sh.devtool=function () { require('nw.gui').Window.get().showDevTools();}
        sh.cd(process.cwd().replace(/\\/g,"/"));
    } else {
        sh.cd("/");
    }
    return Shell;
});

define('KeyEventChecker',[],function () {
	var KEC={};
	KEC.down=function (elem, name, handler) {
		if (!(elem instanceof $)) elem=$(elem);
		elem.bind("keydown", function (e) {
			if (KEC.is(e, name)) {
				return handler.call(elem[0],e);
			}
		});
	};
	var codes={8:"bs",13:"enter",37:"left",38:"up",39:"right",40:"down"};
	KEC.is=function (e,name) {
		name=name.toLowerCase();
		e = e.originalEvent || e;
		var s="";
		if (e.altKey) {
			s+="alt+";
		}
		if (e.ctrlKey) {
			s+="ctrl+";
		}
		if (e.shiftKey) {
			s+="shift+";
		}
		if (e.keyCode>=112 && e.keyCode<=123) {
			s+="f"+(e.keyCode-111);
        } else if (codes[e.keyCode]){
            s+=codes[e.keyCode];
		} else {
			s+=String.fromCharCode(e.keyCode);
		}
		s=s.toLowerCase();
		return name==s;
	};
	return KEC;
});
define('UIDiag',["UI"],function (UI) {
    var UIDiag={};
    UIDiag.confirm=function (mesg) {
        var di=UI("div",{title:"確認"},["div",mesg],
                ["button",{on:{click:sendF(true)}},"OK"],
                ["button",{on:{click:sendF(false)}},"キャンセル"]).dialog({width:"auto",close:sendF(false)});
        var d=$.Deferred();
        function sendF(r) {
            return function () { d.resolve(r); di.dialog("close"); di.remove(); };
        }
        return d.promise();
    };
    UIDiag.alert=function (mesg) {
        var di=UI("div",{title:"確認"},["div",mesg],
                ["button",{on:{click:sendF(true)}},"OK"]).dialog({width:"auto",close:sendF(false)});
        var d=$.Deferred();
        function sendF(r) {
            return function () { d.resolve(r); di.dialog("close"); di.remove(); };
        }
        return d.promise();
    };

    UIDiag.prompt=function (mesg,value) {
        var di=UI("div",{title:"入力"},["div",mesg],
                ["input",{on:{enterkey:ok},$var:"val", value:value}],["br"],
                ["button",{on:{click:ok}},"OK"],
                ["button",{on:{click:cancel}},"キャンセル"]).dialog({width:"auto",close:function (){
                    di.dialog("close");
                    d.resolve();
                }});
        setTimeout(function () {
            di.$vars.val.focus();
            //console.log("FOcus");
        },10);
        var d=$.Deferred();
        function ok() {
            var r=di.$vars.val.val();
            d.resolve(r);
            di.dialog("close");
            di.remove();
        }
        function cancel() {
            di.dialog("close");
            di.remove();
            d.resolve();
        }
        return d.promise();

    };
    if (typeof window!="undefined") window.UIDiag=UIDiag;
    return UIDiag;
});
define('Columns',["UI"],function (UI) {
    var Columns={};
    Columns.make=function () {
        var div=UI("div",{"class":"container"});
        var row=UI("div",{"class":"row"});
        var res=[];
        for (var i=0; i<arguments.length ; i++) {
            var col=UI.apply(UI,arguments[i]);
            res.push(col);
            row.append(col);
        }
        div.append(row);
        $("body").append(div);
        return res;
    };
    return Columns;
});

define('Menu',["UI"], function (UI) {
    var Menu={};
    Menu.makeOLD=function (title, hier) {
        if (title.sub) hier=title.sub;
        /*
           [{label:"main1",id:"main1",sub:[{label:"sub1", id:"sub1", action:f}]]
         */
        var ul1=UI("ul", {"class":"nav navbar-nav"});
        hier.forEach(function (mainMenuItem) {
            var li=UI("li",
                    ["a",{
                        href:(mainMenuItem.href||"#"),
                        id:mainMenuItem.id,
                        "class":(mainMenuItem.sub?"dropdown-toggle":null),
                        "data-toggle":(mainMenuItem.sub?"dropdown":null)
                    }, mainMenuItem.label]
            );
            ul1.append(li);
            if (mainMenuItem.sub) {
                var ul2=UI("ul",{"class":"dropdown-menu"});
                mainMenuItem.sub.forEach(function (subMenuItem) {
                    ul2.append(UI("li",
                        ["a", {
                             id:subMenuItem.id,
                             href:subMenuItem.href||"#",
                             on:{
                                 click:subMenuItem.action
                             }
                        },subMenuItem.label]
                    ));
                });
                li.append(ul2);
            }
        });
        var menu=UI("div",{"class":"collapse navbar-collapse"},ul1);
        $("body").append(UI(
          "div",{"class":"navbar navbar-inverse navbar-fixed-top",id:"navBar"},
                ["div",{"class":"container",id:"nav-A"},
                    ["div", {"class":"navbar-header",id:"nav-B"},
                        ["button",{type:"button", "class":"navbar-toggle",
                            "data-toggle":"collapse",
                            "data-target":".navbar-collapse"},
                            ["span",{"class":"icon-bar"}],
                            ["span",{"class":"icon-bar"}],
                            ["span",{"class":"icon-bar"}]
                        ],
                        ["a", {"class":"navbar-brand" ,href:"#",id:title.id},title.label]
                    ],
                    menu
                ]
        ));
    };
    Menu.make=function (title, hier) {
        if (title.sub) hier=title.sub;
        this.initMenuBar(title);
        /*
           [{label:"main1",id:"main1",sub:[{label:"sub1", id:"sub1", action:f}]]
         */
        hier.forEach(function (mainMenuItem) {
            Menu.appendMain(mainMenuItem);
        });
    };
    Menu.initMenuBar=function (title) {
        if (this.ul1)return;
        var ul1=UI("ul", {"class":"nav navbar-nav"});
        var menu=UI("div",{"class":"collapse navbar-collapse"},ul1);
        $("body").append(UI(
          "div",{"class":"navbar navbar-inverse navbar-fixed-top",id:"navBar"},
                ["div",{"class":"container",id:"nav-A"},
                    ["div", {"class":"navbar-header",id:"nav-B"},
                        ["button",{type:"button", "class":"navbar-toggle",
                            "data-toggle":"collapse",
                            "data-target":".navbar-collapse"},
                            ["span",{"class":"icon-bar"}],
                            ["span",{"class":"icon-bar"}],
                            ["span",{"class":"icon-bar"}]
                        ],
                        ["span",{id:"mobileBar",style:"display:none;"},
                            ["select",{id:"fileSel"}],
                            ["button",{id:"mobileRun", class:"mobileButton"},"Run"],
                            //["button",{id:"mobileFind", class:"mobileButton"},"Find"],
                        ],
                        ["a", {"class":"navbar-brand" ,href:"#",id:title.id},title.label]
                    ],
                    menu
                ]
        ));
        this.ul1=ul1;
    };
    Menu.appendMain=function (mainMenuItem) {
        //[{label:"main1",id:"main1",sub:[{label:"sub1", id:"sub1", action:f}]]
        var ul1=this.ul1;
        var li=UI("li",
                ["a",{
                    href:(mainMenuItem.href||"#"),
                    id:mainMenuItem.id,
                    "class":(mainMenuItem.sub?"dropdown-toggle":null),
                    "data-toggle":(mainMenuItem.sub?"dropdown":null)
                }, mainMenuItem.label]
        );
        if (mainMenuItem.action) {
            li.find("a").click(mainMenuItem.action);
        }
        if (mainMenuItem.after) {
            $(mainMenuItem.after).closest("li").after(li);
        } else if (mainMenuItem.before) {
            $(mainMenuItem.before).closest("li").before(li);
        } else {
            ul1.append(li);
        }
        if (mainMenuItem.sub) {
            var ul2=UI("ul",{
                id:"submenu_"+mainMenuItem.id,
                "class":"dropdown-menu"
            });
            li.append(ul2);
            mainMenuItem.sub.forEach(function (subMenuItem) {
                Menu.appendSub(mainMenuItem,subMenuItem);
            });
        }
    };
    Menu.appendSubRoot=function(mainMenuID) {
        var ul2=UI("ul",{
            id:"submenu_"+mainMenuID,
            "class":"dropdown-menu"
        });
        var li=$("#"+mainMenuID).closest("li");
        li.append(ul2);
    };
    Menu.deleteMain=function (menuID) {
        $("#"+menuID).remove();
    };
    Menu.appendSub=function (mainObj,subMenuItem) {
        var mainID;
        switch (typeof mainObj) {
            case "object":
            mainID=mainObj.id;
            mainObj.sub=[subMenuItem];
            break;
            case "string":
            mainID=mainObj;
            mainObj={label:mainID,id:mainID};
            break;
        }
        var ul2=$("#submenu_"+mainID);
        if (ul2.length==0) {
            if ($("#"+mainID).length==0) {
                Menu.appendMain(mainObj);
                //ul2=$("#submenu_"+mainID);
                return;
            }
            this.appendSubRoot(mainID);
            $("#"+mainID).addClass("dropdown-toggle").attr("data-toggle","dropdown");
        }
        ul2.append(UI("li",
            ["a", {
                 id:subMenuItem.id,
                 href:subMenuItem.href||"#",
                 on:{
                     click:subMenuItem.action
                 }
            },subMenuItem.label]
        ));
    };

    return Menu;
});

define('DeferredUtil',[], function () {
    var root=(
        typeof window!=="undefined" ? window :
        typeof self!=="undefined" ? self :
        typeof global!=="undefined" ? global : null
    );
    //  promise.then(S,F)  and promise.then(S).fail(F) is not same!
    //  ->  when fail on S,  F is executed?
    var DU;
    var DUBRK=function(r){this.res=r;};
    DU={
        isNativePromise: function (p) {
            return p && (typeof p.then==="function") &&
            (typeof p.promise!=="function") && (typeof p.catch==="function") ;
        },
        isJQPromise: function (p) {
            return p && (typeof p.then==="function") &&
            (typeof p.promise==="function") &&(typeof p.fail==="function") ;
        },
        isPromise: function (p) {
            return p && (typeof p.then==="function") &&
            ((typeof p.promise==="function") || (typeof p.catch==="function")) ;
        },
        all: function (a) {
            //var a=Array.prototype.slice.call(arguments);
            return DU.promise(function (succ,fail) {
                var res=[],rest=a.length;
                a.forEach(function (p, i) {
                    DU.resolve(p).then(function (r) {
                        res[i]=r;
                        rest--;
                        if (rest===0) {
                            succ(res);
                        }
                    },fail);
                });
            });
        },
        resolve: function (p) {
            if (DU.config.useJQ && DU.isJQPromise(p)) return p;
            if (!DU.config.useJQ && DU.isNativePromise(p)) return p;
            return DU.promise(function (succ,fail) {
                if (DU.isPromise(p)) {
                    p.then(succ,fail);
                } else {
                    succ(p);
                }
            });
            /*if (DU.isPromise(p)) { // NO! it returns Promise when using JQPromise and vise versa.
                return f;
            }
            if (DU.confing.useJQ) {
                return $.when(p);
            }*/
        },
        throwNowIfRejected: function (p) {
            // If Promise p has already rejected, throws the rejeceted reason immediately.
            var state;
            var err;
            var res=p.then(function (r) {
                if (!state) {
                    state="resolved";
                }
                return r;
            },function (e) {
                if (!state) {
                    state="rejected";
                    err=e;
                } else {
                    return DU.reject(e);
                }
            });
            if (!state) state="notyet";
            if (state==="rejected") throw err;
            return res;
        },
        assertResolved: function (p) {
            var res,resolved;
            p.then(function (r) {
                res=r;
                resolved=true;
            });
            if (!resolved) {
                console.log(r);
                throw new Error("Promise not resolved");
            }
            return res;
        },
        /*toJQPromise: function (p) {// From native Promise
            if (!p) return $.when(p);
            if ($.isFunction(p.promise)) return p;
            if (!$.isFunction(p.then) || !$.isFunction(p.catch)) return $.when(p);
            var d=new $.Deferred();
            p.then(function (r) {
                d.resolve(r);
            }).catch(function (r) {
                d.reject(r);
            });
            return d.promise();
        },*/
        ensureDefer: function (v) {
            return DU.promise(function (resolve,reject) {
                var isDeferred;
                DU.resolve(v).then(function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            resolve(r);
                        },0);
                    } else {
                        resolve(r);
                    }
                }).fail(function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            reject(r);
                        },0);
                    } else {
                        reject(r);
                    }
                });
                isDeferred=true;
            });
        },
            directPromise:function (v) {
                return DU.timeout(v,0);
            },
            then: function (f) {
                return DU.directPromise().then(f);
            },
            timeout:function (timeout,value) {
                return DU.promise(function (resolve) {
                    setTimeout(function () {resolve(value);},timeout||0);
                });
            },
            funcPromise:function (f) {
                if (DU.config.useJQ) {
                    var d=new $.Deferred();
                    try {
                        f(function (v) {
                            d.resolve(v);
                        },function (e) {
                            d.reject(e);
                        });
                    }catch(e) {
                        d.reject(e);
                    }
                    return d.promise();
                } else if (DU.external.Promise) {
                    return new DU.external.Promise(function (resolve,reject) {
                        try {
                            f(resolve,reject);
                        }catch(e) {
                            reject(e);
                        }
                    });
                } else {
                    throw new Error("promise is not found");
                }
            },
            reject: function (e) {
                if (DU.config.useJQ) {
                    var d=new $.Deferred();
                    d.reject(e);
                    return d.promise();
                } else {
                    return new JQ.external.Promise(function (s,rej) {
                        rej(e);
                    });
                }
            },
            throwPromise:function (e) {
                if (DU.config.useJQ) {
                    var d=new $.Deferred();
                    setTimeout(function () {
                        d.reject(e);
                    }, 0);
                    return d.promise();
                } else {
                    return new JQ.external.Promise(function (s,rej) {
                        rej(e);
                    });
                }
            },
            throwF: function (f) {
                return function () {
                    try {
                        return f.apply(this,arguments);
                    } catch(e) {
                        console.log(e,e.stack);
                        return DU.throwPromise(e);
                    }
                };
            },
            each: function (set,f) {
                if (set instanceof Array) {
                    return DU.loop(function (i) {
                        if (i>=set.length) return DU.brk();
                        return DU.resolve(f(set[i],i)).then(function () {
                            return i+1;
                        });
                    },0);
                } else {
                    var objs=[];
                    for (var i in set) {
                        objs.push({k:i,v:set[i]});
                    }
                    return DU.each(objs,function (e) {
                        return f(e.k, e.v);
                    });
                }
            },
            loop: function (f,r) {
                try {
                    var err;
                    while(true) {
                        if (r instanceof DUBRK) return DU.when1(r.res);
                        var deff1=true, deff2=false;
                        // ★ not deffered  ☆  deferred
                        var r1=f(r);
                        var dr=DU.resolve(r1).then(function (r2) {
                            r=r2;
                            deff1=false;
                            if (r instanceof DUBRK) return r.res;
                            if (deff2) return DU.loop(f,r); //☆
                        }).fail(function (e) {
                            deff1=false;
                            err=e;
                        });
                        if (err) throw err;
                        deff2=true;
                        if (deff1) return dr;//☆
                        //★
                    }
                }catch (e) {
                    return DU.reject(e);
                }
            },
            brk: function (res) {
                return new DUBRK(res);
            },
            tryLoop: function (f,r) {
                return DU.loop(DU.tr(f),r);
            },
            tryEach: function (s,f) {
                return DU.loop(s,DU.tr(f));
            },
            documentReady:function () {
                return DU.callbackToPromise(function (s) {$(s);});
            },
            requirejs:function (modules) {
                if (!root.requirejs) throw new Error("requirejs is not loaded");
                return DU.callbackToPromise(function (s) {
                    root.requirejs(modules,s);
                });
            }
    };
    DU.NOP=function (r) {return r;};
    DU.E=function () {
        console.log("DUE",arguments);
        DU.errorHandler.apply(DU,arguments);
    };
    DU.errorHandler=function (e) {
        console.error.apply(console,arguments);
        alert(e);
    };
    DU.setE=function (f) {
        DU.errorHandler=f;
    };
    DU.begin=DU.try=DU.tr=DU.throwF;
    DU.promise=DU.callbackToPromise=DU.funcPromise;
    DU.when1=DU.resolve;
    DU.config={};
    if (root.$ && root.$.Deferred) {
        DU.config.useJQ=true;
    }
    DU.external={Promise:root.Promise};
    if (!root.DeferredUtil) root.DeferredUtil=DU;
    return DU;
});

define('Sync',["FS","Shell","WebSite","assert","DeferredUtil"],
        function (FS,sh,WebSite,A,DU) {
    var Sync={};
    //var PathUtil=FS.PathUtil; Not avail
    sh.sync=function () {
        // sync options:o      local=remote=cwd
        // sync dir:s|file options:o local=remote=dir
        // sync local:s|file remote:s|file options:o
        var local,remote,options,onend=function(){};
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
        function diffTree(a,b) {
            console.log("diff",a,b);
            for (var k in unionKeys(a,b)) {
                if (!(k in a)) console.log(k," is not in a",k[b]);
                if (!(k in b)) console.log(k," is not in b",k[a]);
                if (typeof k[a]=="object" && typeof k[b]=="object") {
                    diffTree(k[a],k[b]);
                } else {
                    if (k[a]!=k[b]) console.log(k," is differ",k[a],k[b]);
                }
            }
        }
        function getLocalDirInfo() {
            console.log("gerLCD");
            var res2=local.getDirTree({style:"flat-relative",excludes});
            console.log("gerLCD done",res2);
            return res2;
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
        function status(name, param) {
            sh.echo("Status: "+name+" param:",param);
            if (options.onstatus) {
                options.onstatus(name, param);
            }
        }
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
        var syncInfoDir=local.rel(".sync/");
        const excludes=(options.excludes||[]).concat(syncInfoDir.name());
        var downloadSkipped, uploadSkipped;
        var uploads={},downloads=[];
        var user;
        var classid;
        var localDelta;
        // local.json exists / remote.json not exists -> download / no upload   -> remote.json did not create
        // local.json not exists / remote.json exists -> no download / upload   -> local.json did not create
        var localDirInfoFile=syncInfoDir.rel("local.json");
        var remoteDirInfoFile=syncInfoDir.rel("remote.json");
        var lastLocalDirInfo=localDirInfoFile.exists()?localDirInfoFile.obj():{};
        var lastRemoteDirInfo=remoteDirInfoFile.exists()?remoteDirInfoFile.obj():{};
        status("getLocalDirInfo", req);
        var curLocalDirInfo=getLocalDirInfo();
        var curRemoteDirInfo;
        if (options.v) sh.echo("last/cur LocalDirInfo",lastLocalDirInfo, curLocalDirInfo);
        localDelta=getDelta(lastLocalDirInfo, curLocalDirInfo);
        if (options.v) sh.echo("localDelta",localDelta);
        var req={base:remote.path(),excludes:JSON.stringify(excludes),token:""+Math.random()};
        status("getDirInfo", req);
        return $.ajax({
            type:"get",
            url:A(WebSite.url.getDirInfo),
            data:req
        }).then(function n1(gd) {
            curRemoteDirInfo=gd.data;
            var d;
            if (options.v) sh.echo("getDirInfo",gd);
            if (gd.NOT_LOGGED_IN) {
                d = new $.Deferred();
                setTimeout(function(){
                  d.reject(Sync.NOT_LOGGED_IN);
                }, 0);
                return d.promise();
            }
            user=gd.user;
            classid=gd["class"];
            var base=local;
            var remoteDelta=getDelta(lastRemoteDirInfo, curRemoteDirInfo);
            if (options.v) sh.echo("remoteDelta",remoteDelta);
            var dd=getDeltaDelta(localDelta,remoteDelta);
            var o,f,m,key;
            for (key in dd.local) {
                 f=local.rel(key);
                 if (f.isDir()) continue;
                 o={};
                 if (f.exists()) o.text=f.text();
                 m=dd.local[key];
                 for (var i in m) o[i]=m[i];
                 uploads[key]=o;
                 if (options.v) sh.echo("Upload",key,m);
            }
            for (key in dd.remote) {
                downloads.push(key);
                //if (PathUtil.isDir(key)) continue;  //Not avail
                if (options.v)
                    sh.echo("Download",key,dd.remote[key]);
            }
            if (options.v) {
                sh.echo("uploads:",uploads);
                sh.echo("downloads:",downloads);
            }
            if (downloads.length==0) {
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
            if (Object.keys(uploads).length==0) {
                if (options.v) sh.echo("Skip Upload");
                uploadSkipped=true;
                return {uploadSkipped:true};
            }
            var req={base:remote.path(),data:JSON.stringify(uploads),excludes:JSON.stringify(excludes),token:""+Math.random()};
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
    sh.rsh=function () {
        var a=[];
        for (var i=0; i<arguments.length; i++) a[i]=arguments[i];
        return $.ajax({
            url:A(WebSite.url.rsh),
            data:{args:JSON.stringify(a)},
        });
    };
    return Sync;
});

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("source-map",[], factory);
	else if(typeof exports === 'object')
		exports["sourceMap"] = factory();
	else
		root["sourceMap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	* Copyright 2009-2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE.txt or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/
	exports.SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
	exports.SourceMapConsumer = __webpack_require__(7).SourceMapConsumer;
	exports.SourceNode = __webpack_require__(10).SourceNode;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var base64VLQ = __webpack_require__(2);
	var util = __webpack_require__(4);
	var ArraySet = __webpack_require__(5).ArraySet;
	var MappingList = __webpack_require__(6).MappingList;

	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) {
		aArgs = {};
		}
		this._file = util.getArg(aArgs, 'file', null);
		this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
		this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}

	SourceMapGenerator.prototype._version = 3;

	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap =
		function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator({
			file: aSourceMapConsumer.file,
			sourceRoot: sourceRoot
		});
		aSourceMapConsumer.eachMapping(function (mapping) {
			var newMapping = {
			generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			}
			};

			if (mapping.source != null) {
			newMapping.source = mapping.source;
			if (sourceRoot != null) {
				newMapping.source = util.relative(sourceRoot, newMapping.source);
			}

			newMapping.original = {
				line: mapping.originalLine,
				column: mapping.originalColumn
			};

			if (mapping.name != null) {
				newMapping.name = mapping.name;
			}
			}

			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			generator.setSourceContent(sourceFile, content);
			}
		});
		return generator;
		};

	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping =
		function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, 'generated');
		var original = util.getArg(aArgs, 'original', null);
		var source = util.getArg(aArgs, 'source', null);
		var name = util.getArg(aArgs, 'name', null);

		if (!this._skipValidation) {
			this._validateMapping(generated, original, source, name);
		}

		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) {
			this._sources.add(source);
			}
		}

		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) {
			this._names.add(name);
			}
		}

		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source: source,
			name: name
		});
		};

	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent =
		function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) {
			source = util.relative(this._sourceRoot, source);
		}

		if (aSourceContent != null) {
			// Add the source content to the _sourcesContents map.
			// Create a new _sourcesContents map if the property is null.
			if (!this._sourcesContents) {
			this._sourcesContents = Object.create(null);
			}
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			// Remove the source file from the _sourcesContents map.
			// If the _sourcesContents map is empty, set the property to null.
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) {
			this._sourcesContents = null;
			}
		}
		};

	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap =
		function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		// If aSourceFile is omitted, we will use the file property of the SourceMap
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) {
			throw new Error(
				'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
				'or the source map\'s "file" property. Both were omitted.'
			);
			}
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		// Make "sourceFile" relative if an absolute Url is passed.
		if (sourceRoot != null) {
			sourceFile = util.relative(sourceRoot, sourceFile);
		}
		// Applying the SourceMap can add and remove items from the sources and
		// the names array.
		var newSources = new ArraySet();
		var newNames = new ArraySet();

		// Find mappings for the "sourceFile"
		this._mappings.unsortedForEach(function (mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
			// Check if it can be mapped by the source map, then update the mapping.
			var original = aSourceMapConsumer.originalPositionFor({
				line: mapping.originalLine,
				column: mapping.originalColumn
			});
			if (original.source != null) {
				// Copy mapping
				mapping.source = original.source;
				if (aSourceMapPath != null) {
				mapping.source = util.join(aSourceMapPath, mapping.source)
				}
				if (sourceRoot != null) {
				mapping.source = util.relative(sourceRoot, mapping.source);
				}
				mapping.originalLine = original.line;
				mapping.originalColumn = original.column;
				if (original.name != null) {
				mapping.name = original.name;
				}
			}
			}

			var source = mapping.source;
			if (source != null && !newSources.has(source)) {
			newSources.add(source);
			}

			var name = mapping.name;
			if (name != null && !newNames.has(name)) {
			newNames.add(name);
			}

		}, this);
		this._sources = newSources;
		this._names = newNames;

		// Copy sourcesContents of applied map.
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			if (aSourceMapPath != null) {
				sourceFile = util.join(aSourceMapPath, sourceFile);
			}
			if (sourceRoot != null) {
				sourceFile = util.relative(sourceRoot, sourceFile);
			}
			this.setSourceContent(sourceFile, content);
			}
		}, this);
		};

	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping =
		function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
													aName) {
		if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
			&& aGenerated.line > 0 && aGenerated.column >= 0
			&& !aOriginal && !aSource && !aName) {
			// Case 1.
			return;
		}
		else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
				&& aOriginal && 'line' in aOriginal && 'column' in aOriginal
				&& aGenerated.line > 0 && aGenerated.column >= 0
				&& aOriginal.line > 0 && aOriginal.column >= 0
				&& aSource) {
			// Cases 2 and 3.
			return;
		}
		else {
			throw new Error('Invalid mapping: ' + JSON.stringify({
			generated: aGenerated,
			source: aSource,
			original: aOriginal,
			name: aName
			}));
		}
		};

	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings =
		function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = '';
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;

		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = ''

			if (mapping.generatedLine !== previousGeneratedLine) {
			previousGeneratedColumn = 0;
			while (mapping.generatedLine !== previousGeneratedLine) {
				next += ';';
				previousGeneratedLine++;
			}
			}
			else {
			if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
				continue;
				}
				next += ',';
			}
			}

			next += base64VLQ.encode(mapping.generatedColumn
									- previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;

			if (mapping.source != null) {
			sourceIdx = this._sources.indexOf(mapping.source);
			next += base64VLQ.encode(sourceIdx - previousSource);
			previousSource = sourceIdx;

			// lines are stored 0-based in SourceMap spec version 3
			next += base64VLQ.encode(mapping.originalLine - 1
										- previousOriginalLine);
			previousOriginalLine = mapping.originalLine - 1;

			next += base64VLQ.encode(mapping.originalColumn
										- previousOriginalColumn);
			previousOriginalColumn = mapping.originalColumn;

			if (mapping.name != null) {
				nameIdx = this._names.indexOf(mapping.name);
				next += base64VLQ.encode(nameIdx - previousName);
				previousName = nameIdx;
			}
			}

			result += next;
		}

		return result;
		};

	SourceMapGenerator.prototype._generateSourcesContent =
		function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function (source) {
			if (!this._sourcesContents) {
			return null;
			}
			if (aSourceRoot != null) {
			source = util.relative(aSourceRoot, source);
			}
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
			? this._sourcesContents[key]
			: null;
		}, this);
		};

	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON =
		function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) {
			map.file = this._file;
		}
		if (this._sourceRoot != null) {
			map.sourceRoot = this._sourceRoot;
		}
		if (this._sourcesContents) {
			map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		}

		return map;
		};

	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString =
		function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
		};

	exports.SourceMapGenerator = SourceMapGenerator;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*
	* Based on the Base 64 VLQ implementation in Closure Compiler:
	* https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	*
	* Copyright 2011 The Closure Compiler Authors. All rights reserved.
	* Redistribution and use in source and binary forms, with or without
	* modification, are permitted provided that the following conditions are
	* met:
	*
	*  * Redistributions of source code must retain the above copyright
	*    notice, this list of conditions and the following disclaimer.
	*  * Redistributions in binary form must reproduce the above
	*    copyright notice, this list of conditions and the following
	*    disclaimer in the documentation and/or other materials provided
	*    with the distribution.
	*  * Neither the name of Google Inc. nor the names of its
	*    contributors may be used to endorse or promote products derived
	*    from this software without specific prior written permission.
	*
	* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	var base64 = __webpack_require__(3);

	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	var VLQ_BASE_SHIFT = 5;

	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0
		? ((-aValue) << 1) + 1
		: (aValue << 1) + 0;
	}

	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative
		? -shifted
		: shifted;
	}

	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;

		var vlq = toVLQSigned(aValue);

		do {
		digit = vlq & VLQ_BASE_MASK;
		vlq >>>= VLQ_BASE_SHIFT;
		if (vlq > 0) {
			// There are still more digits in this value, so we must make sure the
			// continuation bit is marked.
			digit |= VLQ_CONTINUATION_BIT;
		}
		encoded += base64.encode(digit);
		} while (vlq > 0);

		return encoded;
	};

	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;

		do {
		if (aIndex >= strLen) {
			throw new Error("Expected more digits in base 64 VLQ value.");
		}

		digit = base64.decode(aStr.charCodeAt(aIndex++));
		if (digit === -1) {
			throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
		}

		continuation = !!(digit & VLQ_CONTINUATION_BIT);
		digit &= VLQ_BASE_MASK;
		result = result + (digit << shift);
		shift += VLQ_BASE_SHIFT;
		} while (continuation);

		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function (number) {
		if (0 <= number && number < intToCharMap.length) {
		return intToCharMap[number];
		}
		throw new TypeError("Must be between 0 and 63: " + number);
	};

	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function (charCode) {
		var bigA = 65;     // 'A'
		var bigZ = 90;     // 'Z'

		var littleA = 97;  // 'a'
		var littleZ = 122; // 'z'

		var zero = 48;     // '0'
		var nine = 57;     // '9'

		var plus = 43;     // '+'
		var slash = 47;    // '/'

		var littleOffset = 26;
		var numberOffset = 52;

		// 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
		if (bigA <= charCode && charCode <= bigZ) {
		return (charCode - bigA);
		}

		// 26 - 51: abcdefghijklmnopqrstuvwxyz
		if (littleA <= charCode && charCode <= littleZ) {
		return (charCode - littleA + littleOffset);
		}

		// 52 - 61: 0123456789
		if (zero <= charCode && charCode <= nine) {
		return (charCode - zero + numberOffset);
		}

		// 62: +
		if (charCode == plus) {
		return 62;
		}

		// 63: /
		if (charCode == slash) {
		return 63;
		}

		// Invalid base64 digit.
		return -1;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) {
		return aArgs[aName];
		} else if (arguments.length === 3) {
		return aDefaultValue;
		} else {
		throw new Error('"' + aName + '" is a required argument.');
		}
	}
	exports.getArg = getArg;

	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) {
		return null;
		}
		return {
		scheme: match[1],
		auth: match[2],
		host: match[3],
		port: match[4],
		path: match[5]
		};
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
		var url = '';
		if (aParsedUrl.scheme) {
		url += aParsedUrl.scheme + ':';
		}
		url += '//';
		if (aParsedUrl.auth) {
		url += aParsedUrl.auth + '@';
		}
		if (aParsedUrl.host) {
		url += aParsedUrl.host;
		}
		if (aParsedUrl.port) {
		url += ":" + aParsedUrl.port
		}
		if (aParsedUrl.path) {
		url += aParsedUrl.path;
		}
		return url;
	}
	exports.urlGenerate = urlGenerate;

	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consequtive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
		if (!url.path) {
			return aPath;
		}
		path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);

		var parts = path.split(/\/+/);
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
		part = parts[i];
		if (part === '.') {
			parts.splice(i, 1);
		} else if (part === '..') {
			up++;
		} else if (up > 0) {
			if (part === '') {
			// The first part is blank if the path is absolute. Trying to go
			// above the root is a no-op. Therefore we can remove all '..' parts
			// directly after the root.
			parts.splice(i + 1, up);
			up = 0;
			} else {
			parts.splice(i, 2);
			up--;
			}
		}
		}
		path = parts.join('/');

		if (path === '') {
		path = isAbsolute ? '/' : '.';
		}

		if (url) {
		url.path = path;
		return urlGenerate(url);
		}
		return path;
	}
	exports.normalize = normalize;

	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") {
		aRoot = ".";
		}
		if (aPath === "") {
		aPath = ".";
		}
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) {
		aRoot = aRootUrl.path || '/';
		}

		// `join(foo, '//www.example.org')`
		if (aPathUrl && !aPathUrl.scheme) {
		if (aRootUrl) {
			aPathUrl.scheme = aRootUrl.scheme;
		}
		return urlGenerate(aPathUrl);
		}

		if (aPathUrl || aPath.match(dataUrlRegexp)) {
		return aPath;
		}

		// `join('http://', 'www.example.com')`
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
		aRootUrl.host = aPath;
		return urlGenerate(aRootUrl);
		}

		var joined = aPath.charAt(0) === '/'
		? aPath
		: normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

		if (aRootUrl) {
		aRootUrl.path = joined;
		return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
		return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
	};

	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") {
		aRoot = ".";
		}

		aRoot = aRoot.replace(/\/$/, '');

		// It is possible for the path to be above the root. In this case, simply
		// checking whether the root is a prefix of the path won't work. Instead, we
		// need to remove components from the root one by one, until either we find
		// a prefix that fits, or we run out of components to remove.
		var level = 0;
		while (aPath.indexOf(aRoot + '/') !== 0) {
		var index = aRoot.lastIndexOf("/");
		if (index < 0) {
			return aPath;
		}

		// If the only part of the root that is left is the scheme (i.e. http://,
		// file:///, etc.), one or more slashes (/), or simply nothing at all, we
		// have exhausted all components, so the path is not relative to the root.
		aRoot = aRoot.slice(0, index);
		if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
			return aPath;
		}

		++level;
		}

		// Make sure we add a "../" for each component we removed from the root.
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;

	var supportsNullProto = (function () {
		var obj = Object.create(null);
		return !('__proto__' in obj);
	}());

	function identity (s) {
		return s;
	}

	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) {
		return '$' + aStr;
		}

		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
		if (isProtoString(aStr)) {
		return aStr.slice(1);
		}

		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
		if (!s) {
		return false;
		}

		var length = s.length;

		if (length < 9 /* "__proto__".length */) {
		return false;
		}

		if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
			s.charCodeAt(length - 2) !== 95  /* '_' */ ||
			s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
			s.charCodeAt(length - 4) !== 116 /* 't' */ ||
			s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
			s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
			s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
			s.charCodeAt(length - 8) !== 95  /* '_' */ ||
			s.charCodeAt(length - 9) !== 95  /* '_' */) {
		return false;
		}

		for (var i = length - 10; i >= 0; i--) {
		if (s.charCodeAt(i) !== 36 /* '$' */) {
			return false;
		}
		}

		return true;
	}

	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.source - mappingB.source;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		return mappingA.name - mappingB.name;
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) {
		return cmp;
		}

		cmp = mappingA.source - mappingB.source;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) {
		return cmp;
		}

		return mappingA.name - mappingB.name;
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) {
		return 0;
		}

		if (aStr1 > aStr2) {
		return 1;
		}

		return -1;
	}

	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) {
		return cmp;
		}

		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);
	var has = Object.prototype.hasOwnProperty;

	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = Object.create(null);
	}

	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) {
		set.add(aArray[i], aAllowDuplicates);
		}
		return set;
	};

	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return Object.getOwnPropertyNames(this._set).length;
	};

	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = util.toSetString(aStr);
		var isDuplicate = has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) {
		this._array.push(aStr);
		}
		if (!isDuplicate) {
		this._set[sStr] = idx;
		}
	};

	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		var sStr = util.toSetString(aStr);
		return has.call(this._set, sStr);
	};

	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		var sStr = util.toSetString(aStr);
		if (has.call(this._set, sStr)) {
		return this._set[sStr];
		}
		throw new Error('"' + aStr + '" is not in the set.');
	};

	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) {
		return this._array[aIdx];
		}
		throw new Error('No element indexed by ' + aIdx);
	};

	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};

	exports.ArraySet = ArraySet;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2014 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);

	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		// Optimized for most common case
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA ||
			util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}

	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		// Serves as infimum
		this._last = {generatedLine: -1, generatedColumn: 0};
	}

	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach =
		function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
		};

	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
		this._last = aMapping;
		this._array.push(aMapping);
		} else {
		this._sorted = false;
		this._array.push(aMapping);
		}
	};

	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
		this._array.sort(util.compareByGeneratedPositionsInflated);
		this._sorted = true;
		}
		return this._array;
	};

	exports.MappingList = MappingList;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);
	var binarySearch = __webpack_require__(8);
	var ArraySet = __webpack_require__(5).ArraySet;
	var base64VLQ = __webpack_require__(2);
	var quickSort = __webpack_require__(9).quickSort;

	function SourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		return sourceMap.sections != null
		? new IndexedSourceMapConsumer(sourceMap)
		: new BasicSourceMapConsumer(sourceMap);
	}

	SourceMapConsumer.fromSourceMap = function(aSourceMap) {
		return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
	}

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	SourceMapConsumer.prototype._version = 3;

	// `__generatedMappings` and `__originalMappings` are arrays that hold the
	// parsed mapping coordinates from the source map's "mappings" attribute. They
	// are lazily instantiated, accessed via the `_generatedMappings` and
	// `_originalMappings` getters respectively, and we only parse the mappings
	// and create these arrays once queried for a source location. We jump through
	// these hoops because there can be many thousands of mappings, and parsing
	// them is expensive, so we only want to do it if we must.
	//
	// Each object in the arrays is of the form:
	//
	//     {
	//       generatedLine: The line number in the generated code,
	//       generatedColumn: The column number in the generated code,
	//       source: The path to the original source file that generated this
	//               chunk of code,
	//       originalLine: The line number in the original source that
	//                     corresponds to this chunk of generated code,
	//       originalColumn: The column number in the original source that
	//                       corresponds to this chunk of generated code,
	//       name: The name of the original symbol which generated this chunk of
	//             code.
	//     }
	//
	// All properties except for `generatedLine` and `generatedColumn` can be
	// `null`.
	//
	// `_generatedMappings` is ordered by the generated positions.
	//
	// `_originalMappings` is ordered by the original positions.

	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
		get: function () {
		if (!this.__generatedMappings) {
			this._parseMappings(this._mappings, this.sourceRoot);
		}

		return this.__generatedMappings;
		}
	});

	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
		get: function () {
		if (!this.__originalMappings) {
			this._parseMappings(this._mappings, this.sourceRoot);
		}

		return this.__originalMappings;
		}
	});

	SourceMapConsumer.prototype._charIsMappingSeparator =
		function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		var c = aStr.charAt(index);
		return c === ";" || c === ",";
		};

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	SourceMapConsumer.prototype._parseMappings =
		function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		throw new Error("Subclasses must implement _parseMappings");
		};

	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;

	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

	/**
	* Iterate over each mapping between an original source/line/column and a
	* generated line/column in this source map.
	*
	* @param Function aCallback
	*        The function that is called with each mapping.
	* @param Object aContext
	*        Optional. If specified, this object will be the value of `this` every
	*        time that `aCallback` is called.
	* @param aOrder
	*        Either `SourceMapConsumer.GENERATED_ORDER` or
	*        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	*        iterate over the mappings sorted by the generated file's line/column
	*        order or the original's source/line/column order, respectively. Defaults to
	*        `SourceMapConsumer.GENERATED_ORDER`.
	*/
	SourceMapConsumer.prototype.eachMapping =
		function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		var context = aContext || null;
		var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

		var mappings;
		switch (order) {
		case SourceMapConsumer.GENERATED_ORDER:
			mappings = this._generatedMappings;
			break;
		case SourceMapConsumer.ORIGINAL_ORDER:
			mappings = this._originalMappings;
			break;
		default:
			throw new Error("Unknown order of iteration.");
		}

		var sourceRoot = this.sourceRoot;
		mappings.map(function (mapping) {
			var source = mapping.source === null ? null : this._sources.at(mapping.source);
			if (source != null && sourceRoot != null) {
			source = util.join(sourceRoot, source);
			}
			return {
			source: source,
			generatedLine: mapping.generatedLine,
			generatedColumn: mapping.generatedColumn,
			originalLine: mapping.originalLine,
			originalColumn: mapping.originalColumn,
			name: mapping.name === null ? null : this._names.at(mapping.name)
			};
		}, this).forEach(aCallback, context);
		};

	/**
	* Returns all generated line and column information for the original source,
	* line, and column provided. If no column is provided, returns all mappings
	* corresponding to a either the line we are searching for or the next
	* closest line that has any mappings. Otherwise, returns all mappings
	* corresponding to the given line and either the column we are searching for
	* or the next closest column that has any offsets.
	*
	* The only argument is an object with the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: Optional. the column number in the original source.
	*
	* and an array of objects is returned, each with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	SourceMapConsumer.prototype.allGeneratedPositionsFor =
		function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		var line = util.getArg(aArgs, 'line');

		// When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
		// returns the index of the closest mapping less than the needle. By
		// setting needle.originalColumn to 0, we thus find the last mapping for
		// the given line, provided such a mapping exists.
		var needle = {
			source: util.getArg(aArgs, 'source'),
			originalLine: line,
			originalColumn: util.getArg(aArgs, 'column', 0)
		};

		if (this.sourceRoot != null) {
			needle.source = util.relative(this.sourceRoot, needle.source);
		}
		if (!this._sources.has(needle.source)) {
			return [];
		}
		needle.source = this._sources.indexOf(needle.source);

		var mappings = [];

		var index = this._findMapping(needle,
										this._originalMappings,
										"originalLine",
										"originalColumn",
										util.compareByOriginalPositions,
										binarySearch.LEAST_UPPER_BOUND);
		if (index >= 0) {
			var mapping = this._originalMappings[index];

			if (aArgs.column === undefined) {
			var originalLine = mapping.originalLine;

			// Iterate until either we run out of mappings, or we run into
			// a mapping for a different line than the one we found. Since
			// mappings are sorted, this is guaranteed to find all mappings for
			// the line we found.
			while (mapping && mapping.originalLine === originalLine) {
				mappings.push({
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
				});

				mapping = this._originalMappings[++index];
			}
			} else {
			var originalColumn = mapping.originalColumn;

			// Iterate until either we run out of mappings, or we run into
			// a mapping for a different line than the one we were searching for.
			// Since mappings are sorted, this is guaranteed to find all mappings for
			// the line we are searching for.
			while (mapping &&
					mapping.originalLine === line &&
					mapping.originalColumn == originalColumn) {
				mappings.push({
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
				});

				mapping = this._originalMappings[++index];
			}
			}
		}

		return mappings;
		};

	exports.SourceMapConsumer = SourceMapConsumer;

	/**
	* A BasicSourceMapConsumer instance represents a parsed source map which we can
	* query for information about the original file positions by giving it a file
	* position in the generated source.
	*
	* The only parameter is the raw source map (either as a JSON string, or
	* already parsed to an object). According to the spec, source maps have the
	* following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - sources: An array of URLs to the original source files.
	*   - names: An array of identifiers which can be referrenced by individual mappings.
	*   - sourceRoot: Optional. The URL root from which all sources are relative.
	*   - sourcesContent: Optional. An array of contents of the original source files.
	*   - mappings: A string of base64 VLQs which contain the actual mappings.
	*   - file: Optional. The generated file this source map is associated with.
	*
	* Here is an example source map, taken from the source map spec[0]:
	*
	*     {
	*       version : 3,
	*       file: "out.js",
	*       sourceRoot : "",
	*       sources: ["foo.js", "bar.js"],
	*       names: ["src", "maps", "are", "fun"],
	*       mappings: "AA,AB;;ABCDE;"
	*     }
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	*/
	function BasicSourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		var version = util.getArg(sourceMap, 'version');
		var sources = util.getArg(sourceMap, 'sources');
		// Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
		// requires the array) to play nice here.
		var names = util.getArg(sourceMap, 'names', []);
		var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
		var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
		var mappings = util.getArg(sourceMap, 'mappings');
		var file = util.getArg(sourceMap, 'file', null);

		// Once again, Sass deviates from the spec and supplies the version as a
		// string rather than a number, so we use loose equality checking here.
		if (version != this._version) {
		throw new Error('Unsupported version: ' + version);
		}

		sources = sources
		.map(String)
		// Some source maps produce relative source paths like "./foo.js" instead of
		// "foo.js".  Normalize these first so that future comparisons will succeed.
		// See bugzil.la/1090768.
		.map(util.normalize)
		// Always ensure that absolute sources are internally stored relative to
		// the source root, if the source root is absolute. Not doing this would
		// be particularly problematic when the source root is a prefix of the
		// source (valid, but why??). See github issue #199 and bugzil.la/1188982.
		.map(function (source) {
			return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
			? util.relative(sourceRoot, source)
			: source;
		});

		// Pass `true` below to allow duplicate names and sources. While source maps
		// are intended to be compressed and deduplicated, the TypeScript compiler
		// sometimes generates source maps with duplicates in them. See Github issue
		// #72 and bugzil.la/889492.
		this._names = ArraySet.fromArray(names.map(String), true);
		this._sources = ArraySet.fromArray(sources, true);

		this.sourceRoot = sourceRoot;
		this.sourcesContent = sourcesContent;
		this._mappings = mappings;
		this.file = file;
	}

	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

	/**
	* Create a BasicSourceMapConsumer from a SourceMapGenerator.
	*
	* @param SourceMapGenerator aSourceMap
	*        The source map that will be consumed.
	* @returns BasicSourceMapConsumer
	*/
	BasicSourceMapConsumer.fromSourceMap =
		function SourceMapConsumer_fromSourceMap(aSourceMap) {
		var smc = Object.create(BasicSourceMapConsumer.prototype);

		var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		smc.sourceRoot = aSourceMap._sourceRoot;
		smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
																smc.sourceRoot);
		smc.file = aSourceMap._file;

		// Because we are modifying the entries (by converting string sources and
		// names to indices into the sources and names ArraySets), we have to make
		// a copy of the entry or else bad things happen. Shared mutable state
		// strikes again! See github issue #191.

		var generatedMappings = aSourceMap._mappings.toArray().slice();
		var destGeneratedMappings = smc.__generatedMappings = [];
		var destOriginalMappings = smc.__originalMappings = [];

		for (var i = 0, length = generatedMappings.length; i < length; i++) {
			var srcMapping = generatedMappings[i];
			var destMapping = new Mapping;
			destMapping.generatedLine = srcMapping.generatedLine;
			destMapping.generatedColumn = srcMapping.generatedColumn;

			if (srcMapping.source) {
			destMapping.source = sources.indexOf(srcMapping.source);
			destMapping.originalLine = srcMapping.originalLine;
			destMapping.originalColumn = srcMapping.originalColumn;

			if (srcMapping.name) {
				destMapping.name = names.indexOf(srcMapping.name);
			}

			destOriginalMappings.push(destMapping);
			}

			destGeneratedMappings.push(destMapping);
		}

		quickSort(smc.__originalMappings, util.compareByOriginalPositions);

		return smc;
		};

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	BasicSourceMapConsumer.prototype._version = 3;

	/**
	* The list of original sources.
	*/
	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
		get: function () {
		return this._sources.toArray().map(function (s) {
			return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
		}, this);
		}
	});

	/**
	* Provide the JIT with a nice shape / hidden class.
	*/
	function Mapping() {
		this.generatedLine = 0;
		this.generatedColumn = 0;
		this.source = null;
		this.originalLine = null;
		this.originalColumn = null;
		this.name = null;
	}

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	BasicSourceMapConsumer.prototype._parseMappings =
		function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		var generatedLine = 1;
		var previousGeneratedColumn = 0;
		var previousOriginalLine = 0;
		var previousOriginalColumn = 0;
		var previousSource = 0;
		var previousName = 0;
		var length = aStr.length;
		var index = 0;
		var cachedSegments = {};
		var temp = {};
		var originalMappings = [];
		var generatedMappings = [];
		var mapping, str, segment, end, value;

		while (index < length) {
			if (aStr.charAt(index) === ';') {
			generatedLine++;
			index++;
			previousGeneratedColumn = 0;
			}
			else if (aStr.charAt(index) === ',') {
			index++;
			}
			else {
			mapping = new Mapping();
			mapping.generatedLine = generatedLine;

			// Because each offset is encoded relative to the previous one,
			// many segments often have the same encoding. We can exploit this
			// fact by caching the parsed variable length fields of each segment,
			// allowing us to avoid a second parse if we encounter the same
			// segment again.
			for (end = index; end < length; end++) {
				if (this._charIsMappingSeparator(aStr, end)) {
				break;
				}
			}
			str = aStr.slice(index, end);

			segment = cachedSegments[str];
			if (segment) {
				index += str.length;
			} else {
				segment = [];
				while (index < end) {
				base64VLQ.decode(aStr, index, temp);
				value = temp.value;
				index = temp.rest;
				segment.push(value);
				}

				if (segment.length === 2) {
				throw new Error('Found a source, but no line and column');
				}

				if (segment.length === 3) {
				throw new Error('Found a source and line, but no column');
				}

				cachedSegments[str] = segment;
			}

			// Generated column.
			mapping.generatedColumn = previousGeneratedColumn + segment[0];
			previousGeneratedColumn = mapping.generatedColumn;

			if (segment.length > 1) {
				// Original source.
				mapping.source = previousSource + segment[1];
				previousSource += segment[1];

				// Original line.
				mapping.originalLine = previousOriginalLine + segment[2];
				previousOriginalLine = mapping.originalLine;
				// Lines are stored 0-based
				mapping.originalLine += 1;

				// Original column.
				mapping.originalColumn = previousOriginalColumn + segment[3];
				previousOriginalColumn = mapping.originalColumn;

				if (segment.length > 4) {
				// Original name.
				mapping.name = previousName + segment[4];
				previousName += segment[4];
				}
			}

			generatedMappings.push(mapping);
			if (typeof mapping.originalLine === 'number') {
				originalMappings.push(mapping);
			}
			}
		}

		quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
		this.__generatedMappings = generatedMappings;

		quickSort(originalMappings, util.compareByOriginalPositions);
		this.__originalMappings = originalMappings;
		};

	/**
	* Find the mapping that best matches the hypothetical "needle" mapping that
	* we are searching for in the given "haystack" of mappings.
	*/
	BasicSourceMapConsumer.prototype._findMapping =
		function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
											aColumnName, aComparator, aBias) {
		// To return the position we are searching for, we must first find the
		// mapping for the given position and then return the opposite position it
		// points to. Because the mappings are sorted, we can use binary search to
		// find the best mapping.

		if (aNeedle[aLineName] <= 0) {
			throw new TypeError('Line must be greater than or equal to 1, got '
								+ aNeedle[aLineName]);
		}
		if (aNeedle[aColumnName] < 0) {
			throw new TypeError('Column must be greater than or equal to 0, got '
								+ aNeedle[aColumnName]);
		}

		return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
		};

	/**
	* Compute the last column for each generated mapping. The last column is
	* inclusive.
	*/
	BasicSourceMapConsumer.prototype.computeColumnSpans =
		function SourceMapConsumer_computeColumnSpans() {
		for (var index = 0; index < this._generatedMappings.length; ++index) {
			var mapping = this._generatedMappings[index];

			// Mappings do not contain a field for the last generated columnt. We
			// can come up with an optimistic estimate, however, by assuming that
			// mappings are contiguous (i.e. given two consecutive mappings, the
			// first mapping ends where the second one starts).
			if (index + 1 < this._generatedMappings.length) {
			var nextMapping = this._generatedMappings[index + 1];

			if (mapping.generatedLine === nextMapping.generatedLine) {
				mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
				continue;
			}
			}

			// The last mapping for each line spans the entire line.
			mapping.lastGeneratedColumn = Infinity;
		}
		};

	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.
	*   - column: The column number in the generated source.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.
	*   - column: The column number in the original source, or null.
	*   - name: The original identifier, or null.
	*/
	BasicSourceMapConsumer.prototype.originalPositionFor =
		function SourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, 'line'),
			generatedColumn: util.getArg(aArgs, 'column')
		};

		var index = this._findMapping(
			needle,
			this._generatedMappings,
			"generatedLine",
			"generatedColumn",
			util.compareByGeneratedPositionsDeflated,
			util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		);

		if (index >= 0) {
			var mapping = this._generatedMappings[index];

			if (mapping.generatedLine === needle.generatedLine) {
			var source = util.getArg(mapping, 'source', null);
			if (source !== null) {
				source = this._sources.at(source);
				if (this.sourceRoot != null) {
				source = util.join(this.sourceRoot, source);
				}
			}
			var name = util.getArg(mapping, 'name', null);
			if (name !== null) {
				name = this._names.at(name);
			}
			return {
				source: source,
				line: util.getArg(mapping, 'originalLine', null),
				column: util.getArg(mapping, 'originalColumn', null),
				name: name
			};
			}
		}

		return {
			source: null,
			line: null,
			column: null,
			name: null
		};
		};

	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
		function BasicSourceMapConsumer_hasContentsOfAllSources() {
		if (!this.sourcesContent) {
			return false;
		}
		return this.sourcesContent.length >= this._sources.size() &&
			!this.sourcesContent.some(function (sc) { return sc == null; });
		};

	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	BasicSourceMapConsumer.prototype.sourceContentFor =
		function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		if (!this.sourcesContent) {
			return null;
		}

		if (this.sourceRoot != null) {
			aSource = util.relative(this.sourceRoot, aSource);
		}

		if (this._sources.has(aSource)) {
			return this.sourcesContent[this._sources.indexOf(aSource)];
		}

		var url;
		if (this.sourceRoot != null
			&& (url = util.urlParse(this.sourceRoot))) {
			// XXX: file:// URIs and absolute paths lead to unexpected behavior for
			// many users. We can help them out when they expect file:// URIs to
			// behave like it would if they were running a local HTTP server. See
			// https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
			var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
			if (url.scheme == "file"
				&& this._sources.has(fileUriAbsPath)) {
			return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
			}

			if ((!url.path || url.path == "/")
				&& this._sources.has("/" + aSource)) {
			return this.sourcesContent[this._sources.indexOf("/" + aSource)];
			}
		}

		// This function is used recursively from
		// IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
		// don't want to throw if we can't find the source - we just want to
		// return null, so we provide a flag to exit gracefully.
		if (nullOnMissing) {
			return null;
		}
		else {
			throw new Error('"' + aSource + '" is not in the SourceMap.');
		}
		};

	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: The column number in the original source.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	BasicSourceMapConsumer.prototype.generatedPositionFor =
		function SourceMapConsumer_generatedPositionFor(aArgs) {
		var source = util.getArg(aArgs, 'source');
		if (this.sourceRoot != null) {
			source = util.relative(this.sourceRoot, source);
		}
		if (!this._sources.has(source)) {
			return {
			line: null,
			column: null,
			lastColumn: null
			};
		}
		source = this._sources.indexOf(source);

		var needle = {
			source: source,
			originalLine: util.getArg(aArgs, 'line'),
			originalColumn: util.getArg(aArgs, 'column')
		};

		var index = this._findMapping(
			needle,
			this._originalMappings,
			"originalLine",
			"originalColumn",
			util.compareByOriginalPositions,
			util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		);

		if (index >= 0) {
			var mapping = this._originalMappings[index];

			if (mapping.source === needle.source) {
			return {
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
			};
			}
		}

		return {
			line: null,
			column: null,
			lastColumn: null
		};
		};

	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

	/**
	* An IndexedSourceMapConsumer instance represents a parsed source map which
	* we can query for information. It differs from BasicSourceMapConsumer in
	* that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	* input.
	*
	* The only parameter is a raw source map (either as a JSON string, or already
	* parsed to an object). According to the spec for indexed source maps, they
	* have the following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - file: Optional. The generated file this source map is associated with.
	*   - sections: A list of section definitions.
	*
	* Each value under the "sections" field has two fields:
	*   - offset: The offset into the original specified at which this section
	*       begins to apply, defined as an object with a "line" and "column"
	*       field.
	*   - map: A source map definition. This source map could also be indexed,
	*       but doesn't have to be.
	*
	* Instead of the "map" field, it's also possible to have a "url" field
	* specifying a URL to retrieve a source map from, but that's currently
	* unsupported.
	*
	* Here's an example source map, taken from the source map spec[0], but
	* modified to omit a section which uses the "url" field.
	*
	*  {
	*    version : 3,
	*    file: "app.js",
	*    sections: [{
	*      offset: {line:100, column:10},
	*      map: {
	*        version : 3,
	*        file: "section.js",
	*        sources: ["foo.js", "bar.js"],
	*        names: ["src", "maps", "are", "fun"],
	*        mappings: "AAAA,E;;ABCDE;"
	*      }
	*    }],
	*  }
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	*/
	function IndexedSourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		var version = util.getArg(sourceMap, 'version');
		var sections = util.getArg(sourceMap, 'sections');

		if (version != this._version) {
		throw new Error('Unsupported version: ' + version);
		}

		this._sources = new ArraySet();
		this._names = new ArraySet();

		var lastOffset = {
		line: -1,
		column: 0
		};
		this._sections = sections.map(function (s) {
		if (s.url) {
			// The url field will require support for asynchronicity.
			// See https://github.com/mozilla/source-map/issues/16
			throw new Error('Support for url field in sections not implemented.');
		}
		var offset = util.getArg(s, 'offset');
		var offsetLine = util.getArg(offset, 'line');
		var offsetColumn = util.getArg(offset, 'column');

		if (offsetLine < lastOffset.line ||
			(offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
			throw new Error('Section offsets must be ordered and non-overlapping.');
		}
		lastOffset = offset;

		return {
			generatedOffset: {
			// The offset fields are 0-based, but we use 1-based indices when
			// encoding/decoding from VLQ.
			generatedLine: offsetLine + 1,
			generatedColumn: offsetColumn + 1
			},
			consumer: new SourceMapConsumer(util.getArg(s, 'map'))
		}
		});
	}

	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	IndexedSourceMapConsumer.prototype._version = 3;

	/**
	* The list of original sources.
	*/
	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
		get: function () {
		var sources = [];
		for (var i = 0; i < this._sections.length; i++) {
			for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
			sources.push(this._sections[i].consumer.sources[j]);
			}
		}
		return sources;
		}
	});

	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.
	*   - column: The column number in the generated source.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.
	*   - column: The column number in the original source, or null.
	*   - name: The original identifier, or null.
	*/
	IndexedSourceMapConsumer.prototype.originalPositionFor =
		function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, 'line'),
			generatedColumn: util.getArg(aArgs, 'column')
		};

		// Find the section containing the generated position we're trying to map
		// to an original position.
		var sectionIndex = binarySearch.search(needle, this._sections,
			function(needle, section) {
			var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
			if (cmp) {
				return cmp;
			}

			return (needle.generatedColumn -
					section.generatedOffset.generatedColumn);
			});
		var section = this._sections[sectionIndex];

		if (!section) {
			return {
			source: null,
			line: null,
			column: null,
			name: null
			};
		}

		return section.consumer.originalPositionFor({
			line: needle.generatedLine -
			(section.generatedOffset.generatedLine - 1),
			column: needle.generatedColumn -
			(section.generatedOffset.generatedLine === needle.generatedLine
			? section.generatedOffset.generatedColumn - 1
			: 0),
			bias: aArgs.bias
		});
		};

	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
		function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		return this._sections.every(function (s) {
			return s.consumer.hasContentsOfAllSources();
		});
		};

	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	IndexedSourceMapConsumer.prototype.sourceContentFor =
		function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];

			var content = section.consumer.sourceContentFor(aSource, true);
			if (content) {
			return content;
			}
		}
		if (nullOnMissing) {
			return null;
		}
		else {
			throw new Error('"' + aSource + '" is not in the SourceMap.');
		}
		};

	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: The column number in the original source.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	IndexedSourceMapConsumer.prototype.generatedPositionFor =
		function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];

			// Only consider this section if the requested source is in the list of
			// sources of the consumer.
			if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
			continue;
			}
			var generatedPosition = section.consumer.generatedPositionFor(aArgs);
			if (generatedPosition) {
			var ret = {
				line: generatedPosition.line +
				(section.generatedOffset.generatedLine - 1),
				column: generatedPosition.column +
				(section.generatedOffset.generatedLine === generatedPosition.line
				? section.generatedOffset.generatedColumn - 1
				: 0)
			};
			return ret;
			}
		}

		return {
			line: null,
			column: null
		};
		};

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	IndexedSourceMapConsumer.prototype._parseMappings =
		function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		this.__generatedMappings = [];
		this.__originalMappings = [];
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			var sectionMappings = section.consumer._generatedMappings;
			for (var j = 0; j < sectionMappings.length; j++) {
			var mapping = sectionMappings[j];

			var source = section.consumer._sources.at(mapping.source);
			if (section.consumer.sourceRoot !== null) {
				source = util.join(section.consumer.sourceRoot, source);
			}
			this._sources.add(source);
			source = this._sources.indexOf(source);

			var name = section.consumer._names.at(mapping.name);
			this._names.add(name);
			name = this._names.indexOf(name);

			// The mappings coming from the consumer for the section have
			// generated positions relative to the start of the section, so we
			// need to offset them to be relative to the start of the concatenated
			// generated file.
			var adjustedMapping = {
				source: source,
				generatedLine: mapping.generatedLine +
				(section.generatedOffset.generatedLine - 1),
				generatedColumn: mapping.generatedColumn +
				(section.generatedOffset.generatedLine === mapping.generatedLine
				? section.generatedOffset.generatedColumn - 1
				: 0),
				originalLine: mapping.originalLine,
				originalColumn: mapping.originalColumn,
				name: name
			};

			this.__generatedMappings.push(adjustedMapping);
			if (typeof adjustedMapping.originalLine === 'number') {
				this.__originalMappings.push(adjustedMapping);
			}
			}
		}

		quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
		quickSort(this.__originalMappings, util.compareByOriginalPositions);
		};

	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;

	/**
	* Recursive implementation of binary search.
	*
	* @param aLow Indices here and lower do not contain the needle.
	* @param aHigh Indices here and higher do not contain the needle.
	* @param aNeedle The element being searched for.
	* @param aHaystack The non-empty array being searched.
	* @param aCompare Function which takes two elements and returns -1, 0, or 1.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*/
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		// This function terminates when one of the following is true:
		//
		//   1. We find the exact element we are looking for.
		//
		//   2. We did not find the exact element, but we can return the index of
		//      the next-closest element.
		//
		//   3. We did not find the exact element, and there is no next-closest
		//      element than the one we are searching for, so we return -1.
		var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		var cmp = aCompare(aNeedle, aHaystack[mid], true);
		if (cmp === 0) {
		// Found the element we are looking for.
		return mid;
		}
		else if (cmp > 0) {
		// Our needle is greater than aHaystack[mid].
		if (aHigh - mid > 1) {
			// The element is in the upper half.
			return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
		}

		// The exact needle element was not found in this haystack. Determine if
		// we are in termination case (3) or (2) and return the appropriate thing.
		if (aBias == exports.LEAST_UPPER_BOUND) {
			return aHigh < aHaystack.length ? aHigh : -1;
		} else {
			return mid;
		}
		}
		else {
		// Our needle is less than aHaystack[mid].
		if (mid - aLow > 1) {
			// The element is in the lower half.
			return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
		}

		// we are in termination case (3) or (2) and return the appropriate thing.
		if (aBias == exports.LEAST_UPPER_BOUND) {
			return mid;
		} else {
			return aLow < 0 ? -1 : aLow;
		}
		}
	}

	/**
	* This is an implementation of binary search which will always try and return
	* the index of the closest element if there is no exact hit. This is because
	* mappings between original and generated line/col pairs are single points,
	* and there is an implicit region between each of them, so a miss just means
	* that you aren't on the very start of a region.
	*
	* @param aNeedle The element you are looking for.
	* @param aHaystack The array that is being searched.
	* @param aCompare A function which takes the needle and an element in the
	*     array and returns -1, 0, or 1 depending on whether the needle is less
	*     than, equal to, or greater than the element, respectively.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	*/
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		if (aHaystack.length === 0) {
		return -1;
		}

		var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
									aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		if (index < 0) {
		return -1;
		}

		// We have found either the exact element, or the next-closest element than
		// the one we are searching for. However, there may be more than one such
		// element. Make sure we always return the smallest of these.
		while (index - 1 >= 0) {
		if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
			break;
		}
		--index;
		}

		return index;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	// It turns out that some (most?) JavaScript engines don't self-host
	// `Array.prototype.sort`. This makes sense because C++ will likely remain
	// faster than JS when doing raw CPU-intensive sorting. However, when using a
	// custom comparator function, calling back and forth between the VM's C++ and
	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
	// worse generated code for the comparator function than would be optimal. In
	// fact, when sorting with a comparator, these costs outweigh the benefits of
	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	// a ~3500ms mean speed-up in `bench/bench.html`.

	/**
	* Swap the elements indexed by `x` and `y` in the array `ary`.
	*
	* @param {Array} ary
	*        The array.
	* @param {Number} x
	*        The index of the first item.
	* @param {Number} y
	*        The index of the second item.
	*/
	function swap(ary, x, y) {
		var temp = ary[x];
		ary[x] = ary[y];
		ary[y] = temp;
	}

	/**
	* Returns a random integer within the range `low .. high` inclusive.
	*
	* @param {Number} low
	*        The lower bound on the range.
	* @param {Number} high
	*        The upper bound on the range.
	*/
	function randomIntInRange(low, high) {
		return Math.round(low + (Math.random() * (high - low)));
	}

	/**
	* The Quick Sort algorithm.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	* @param {Number} p
	*        Start index of the array
	* @param {Number} r
	*        End index of the array
	*/
	function doQuickSort(ary, comparator, p, r) {
		// If our lower bound is less than our upper bound, we (1) partition the
		// array into two pieces and (2) recurse on each half. If it is not, this is
		// the empty array and our base case.

		if (p < r) {
		// (1) Partitioning.
		//
		// The partitioning chooses a pivot between `p` and `r` and moves all
		// elements that are less than or equal to the pivot to the before it, and
		// all the elements that are greater than it after it. The effect is that
		// once partition is done, the pivot is in the exact place it will be when
		// the array is put in sorted order, and it will not need to be moved
		// again. This runs in O(n) time.

		// Always choose a random pivot so that an input array which is reverse
		// sorted does not cause O(n^2) running time.
		var pivotIndex = randomIntInRange(p, r);
		var i = p - 1;

		swap(ary, pivotIndex, r);
		var pivot = ary[r];

		// Immediately after `j` is incremented in this loop, the following hold
		// true:
		//
		//   * Every element in `ary[p .. i]` is less than or equal to the pivot.
		//
		//   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
		for (var j = p; j < r; j++) {
			if (comparator(ary[j], pivot) <= 0) {
			i += 1;
			swap(ary, i, j);
			}
		}

		swap(ary, i + 1, j);
		var q = i + 1;

		// (2) Recurse on each half.

		doQuickSort(ary, comparator, p, q - 1);
		doQuickSort(ary, comparator, q + 1, r);
		}
	}

	/**
	* Sort the given array in-place with the given comparator function.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	*/
	exports.quickSort = function (ary, comparator) {
		doQuickSort(ary, comparator, 0, ary.length - 1);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
	var util = __webpack_require__(4);

	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	var REGEX_NEWLINE = /(\r?\n)/;

	// Newline character code for charCodeAt() comparisons
	var NEWLINE_CODE = 10;

	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	var isSourceNode = "$$$isSourceNode$$$";

	/**
	* SourceNodes provide a way to abstract over interpolating/concatenating
	* snippets of generated JavaScript source code while maintaining the line and
	* column information associated with the original source code.
	*
	* @param aLine The original line number.
	* @param aColumn The original column number.
	* @param aSource The original source's filename.
	* @param aChunks Optional. An array of strings which are snippets of
	*        generated JS, or other SourceNodes.
	* @param aName The original identifier.
	*/
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		this.children = [];
		this.sourceContents = {};
		this.line = aLine == null ? null : aLine;
		this.column = aColumn == null ? null : aColumn;
		this.source = aSource == null ? null : aSource;
		this.name = aName == null ? null : aName;
		this[isSourceNode] = true;
		if (aChunks != null) this.add(aChunks);
	}

	/**
	* Creates a SourceNode from generated code and a SourceMapConsumer.
	*
	* @param aGeneratedCode The generated code
	* @param aSourceMapConsumer The SourceMap for the generated code
	* @param aRelativePath Optional. The path that relative sources in the
	*        SourceMapConsumer should be relative to.
	*/
	SourceNode.fromStringWithSourceMap =
		function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		// The SourceNode we want to fill with the generated code
		// and the SourceMap
		var node = new SourceNode();

		// All even indices of this array are one line of the generated code,
		// while all odd indices are the newlines between two adjacent lines
		// (since `REGEX_NEWLINE` captures its match).
		// Processed fragments are removed from this array, by calling `shiftNextLine`.
		var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		var shiftNextLine = function() {
			var lineContents = remainingLines.shift();
			// The last line of a file might not have a newline.
			var newLine = remainingLines.shift() || "";
			return lineContents + newLine;
		};

		// We need to remember the position of "remainingLines"
		var lastGeneratedLine = 1, lastGeneratedColumn = 0;

		// The generate SourceNodes we need a code range.
		// To extract it current and last mapping is used.
		// Here we store the last mapping.
		var lastMapping = null;

		aSourceMapConsumer.eachMapping(function (mapping) {
			if (lastMapping !== null) {
			// We add the code from "lastMapping" to "mapping":
			// First check if there is a new line in between.
			if (lastGeneratedLine < mapping.generatedLine) {
				// Associate first line with "lastMapping"
				addMappingWithCode(lastMapping, shiftNextLine());
				lastGeneratedLine++;
				lastGeneratedColumn = 0;
				// The remaining code is added without mapping
			} else {
				// There is no new line in between.
				// Associate the code between "lastGeneratedColumn" and
				// "mapping.generatedColumn" with "lastMapping"
				var nextLine = remainingLines[0];
				var code = nextLine.substr(0, mapping.generatedColumn -
											lastGeneratedColumn);
				remainingLines[0] = nextLine.substr(mapping.generatedColumn -
													lastGeneratedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
				addMappingWithCode(lastMapping, code);
				// No more remaining code, continue
				lastMapping = mapping;
				return;
			}
			}
			// We add the generated code until the first mapping
			// to the SourceNode without any mapping.
			// Each line is added as separate string.
			while (lastGeneratedLine < mapping.generatedLine) {
			node.add(shiftNextLine());
			lastGeneratedLine++;
			}
			if (lastGeneratedColumn < mapping.generatedColumn) {
			var nextLine = remainingLines[0];
			node.add(nextLine.substr(0, mapping.generatedColumn));
			remainingLines[0] = nextLine.substr(mapping.generatedColumn);
			lastGeneratedColumn = mapping.generatedColumn;
			}
			lastMapping = mapping;
		}, this);
		// We have processed all mappings.
		if (remainingLines.length > 0) {
			if (lastMapping) {
			// Associate the remaining code in the current line with "lastMapping"
			addMappingWithCode(lastMapping, shiftNextLine());
			}
			// and add the remaining lines without any mapping
			node.add(remainingLines.join(""));
		}

		// Copy sourcesContent into SourceNode
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			if (aRelativePath != null) {
				sourceFile = util.join(aRelativePath, sourceFile);
			}
			node.setSourceContent(sourceFile, content);
			}
		});

		return node;

		function addMappingWithCode(mapping, code) {
			if (mapping === null || mapping.source === undefined) {
			node.add(code);
			} else {
			var source = aRelativePath
				? util.join(aRelativePath, mapping.source)
				: mapping.source;
			node.add(new SourceNode(mapping.originalLine,
									mapping.originalColumn,
									source,
									code,
									mapping.name));
			}
		}
		};

	/**
	* Add a chunk of generated JS to this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
		if (Array.isArray(aChunk)) {
		aChunk.forEach(function (chunk) {
			this.add(chunk);
		}, this);
		}
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		if (aChunk) {
			this.children.push(aChunk);
		}
		}
		else {
		throw new TypeError(
			"Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		);
		}
		return this;
	};

	/**
	* Add a chunk of generated JS to the beginning of this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		if (Array.isArray(aChunk)) {
		for (var i = aChunk.length-1; i >= 0; i--) {
			this.prepend(aChunk[i]);
		}
		}
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		this.children.unshift(aChunk);
		}
		else {
		throw new TypeError(
			"Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		);
		}
		return this;
	};

	/**
	* Walk over the tree of JS snippets in this node and its children. The
	* walking function is called once for each snippet of JS and is passed that
	* snippet and the its original associated source's line/column location.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		var chunk;
		for (var i = 0, len = this.children.length; i < len; i++) {
		chunk = this.children[i];
		if (chunk[isSourceNode]) {
			chunk.walk(aFn);
		}
		else {
			if (chunk !== '') {
			aFn(chunk, { source: this.source,
						line: this.line,
						column: this.column,
						name: this.name });
			}
		}
		}
	};

	/**
	* Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	* each of `this.children`.
	*
	* @param aSep The separator.
	*/
	SourceNode.prototype.join = function SourceNode_join(aSep) {
		var newChildren;
		var i;
		var len = this.children.length;
		if (len > 0) {
		newChildren = [];
		for (i = 0; i < len-1; i++) {
			newChildren.push(this.children[i]);
			newChildren.push(aSep);
		}
		newChildren.push(this.children[i]);
		this.children = newChildren;
		}
		return this;
	};

	/**
	* Call String.prototype.replace on the very right-most source snippet. Useful
	* for trimming whitespace from the end of a source node, etc.
	*
	* @param aPattern The pattern to replace.
	* @param aReplacement The thing to replace the pattern with.
	*/
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		var lastChild = this.children[this.children.length - 1];
		if (lastChild[isSourceNode]) {
		lastChild.replaceRight(aPattern, aReplacement);
		}
		else if (typeof lastChild === 'string') {
		this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		}
		else {
		this.children.push(''.replace(aPattern, aReplacement));
		}
		return this;
	};

	/**
	* Set the source content for a source file. This will be added to the SourceMapGenerator
	* in the sourcesContent field.
	*
	* @param aSourceFile The filename of the source file
	* @param aSourceContent The content of the source file
	*/
	SourceNode.prototype.setSourceContent =
		function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
		};

	/**
	* Walk over the tree of SourceNodes. The walking function is called for each
	* source file content and is passed the filename and source content.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walkSourceContents =
		function SourceNode_walkSourceContents(aFn) {
		for (var i = 0, len = this.children.length; i < len; i++) {
			if (this.children[i][isSourceNode]) {
			this.children[i].walkSourceContents(aFn);
			}
		}

		var sources = Object.keys(this.sourceContents);
		for (var i = 0, len = sources.length; i < len; i++) {
			aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
		}
		};

	/**
	* Return the string representation of this source node. Walks over the tree
	* and concatenates all the various snippets together to one string.
	*/
	SourceNode.prototype.toString = function SourceNode_toString() {
		var str = "";
		this.walk(function (chunk) {
		str += chunk;
		});
		return str;
	};

	/**
	* Returns the string representation of this source node along with a source
	* map.
	*/
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		var generated = {
		code: "",
		line: 1,
		column: 0
		};
		var map = new SourceMapGenerator(aArgs);
		var sourceMappingActive = false;
		var lastOriginalSource = null;
		var lastOriginalLine = null;
		var lastOriginalColumn = null;
		var lastOriginalName = null;
		this.walk(function (chunk, original) {
		generated.code += chunk;
		if (original.source !== null
			&& original.line !== null
			&& original.column !== null) {
			if(lastOriginalSource !== original.source
			|| lastOriginalLine !== original.line
			|| lastOriginalColumn !== original.column
			|| lastOriginalName !== original.name) {
			map.addMapping({
				source: original.source,
				original: {
				line: original.line,
				column: original.column
				},
				generated: {
				line: generated.line,
				column: generated.column
				},
				name: original.name
			});
			}
			lastOriginalSource = original.source;
			lastOriginalLine = original.line;
			lastOriginalColumn = original.column;
			lastOriginalName = original.name;
			sourceMappingActive = true;
		} else if (sourceMappingActive) {
			map.addMapping({
			generated: {
				line: generated.line,
				column: generated.column
			}
			});
			lastOriginalSource = null;
			sourceMappingActive = false;
		}
		for (var idx = 0, length = chunk.length; idx < length; idx++) {
			if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
			generated.line++;
			generated.column = 0;
			// Mappings end at eol
			if (idx + 1 === length) {
				lastOriginalSource = null;
				sourceMappingActive = false;
			} else if (sourceMappingActive) {
				map.addMapping({
				source: original.source,
				original: {
					line: original.line,
					column: original.column
				},
				generated: {
					line: generated.line,
					column: generated.column
				},
				name: original.name
				});
			}
			} else {
			generated.column++;
			}
		}
		});
		this.walkSourceContents(function (sourceFile, sourceContent) {
		map.setSourceContent(sourceFile, sourceContent);
		});

		return { code: generated.code, map: map };
	};

	exports.SourceNode = SourceNode;


/***/ }
/******/ ])
});
;
define('Klass',["assert"],function (A) {
    var Klass={};
    Klass.define=function (pd) {
        var p,parent;
        if (pd.$parent) {
            parent=pd.$parent;
            p=Object.create(parent.prototype);
            p.super=function () {
                var a=Array.prototype.slice.call(arguments);
                var n=a.shift();
                return parent.prototype[n].apply(this,a);
            };
        } else {
            p={};
        }
        var thisName,singletonName;
        if (pd.$this) {
            thisName=pd.$this;
        }
        if (pd.$singleton) {
            singletonName=pd.$singleton;
        }
        var init=wrap(pd.$) || function (e) {
            if (e && typeof e=="object") {
                for (var k in e) {
                    this[k]=e[k];
                }
            }
        };
        var fldinit;
        var warn,wrapped,wrapCancelled;
        //var check;
        if (init instanceof Array) {
            fldinit=init;
            init=function () {
                var a=Array.prototype.slice.call(arguments);
                for (var i=0;i<fldinit.length;i++) {
                    if (a.length>0) this[fldinit[i]]=a.shift();
                }
            };
        }
        var klass;
        function checkSchema(self) {
            if (pd.$fields) {
                //console.log("Checking schema",self,pd.$fields);
                A.is(self,pd.$fields);
            }
        }
        klass=function () {
            if (! (this instanceof klass)) {
                var res=Object.create(p);
                init.apply(res,arguments);
                checkSchema(res);
                return res;
            }
            init.apply(this,arguments);
            checkSchema(this);
        };
        if (parent) {
            klass.super=function () {
                var a=Array.prototype.slice.call(arguments);
                var t=a.shift();
                var n=a.shift();
                return parent.prototype[n].apply(t,a);
            };
        }
        klass.inherit=function (pd) {
            pd.$parent=klass;
            return Klass.define(pd);
        };
        klass.prototype=p;
        for (var name in pd) {
            if (name[0]=="$") continue;
            if (name.substring(0,7)=="static$") {
                klass[name.substring(7)]=wrapStatic(pd[name]);
            } else {
                if (isPropDesc(pd[name])) {
                    Object.defineProperty(p,name,wrap(pd[name]));
                } else {
                    p[name]=wrap(pd[name]);
                }
            }
        }
        function wrapStatic(m) {
            if (!singletonName) return m;
            var args=getArgs(m);
            if (args[0]!==singletonName) return m;
            return (function () {
                var a=Array.prototype.slice.call(arguments);
                a.unshift(klass);
                return m.apply(klass,a);
            });
        }
        function wrap(m) {
            if (!thisName) return m;
            if (isPropDesc(m)) {
                for (var k in m) {
                    m[k]=wrap(m[k]);
                }
                return m;
            }
            if (typeof m!=="function") return m;
            if (thisName!==true) {
                var args=getArgs(m);
                if (args[0]!==thisName) {
                    wrapCancelled=true;
                    return m;
                }
                warn=true;
            }
            wrapped=true;
            return (function () {
                var a=Array.prototype.slice.call(arguments);
                a.unshift(this);
                return m.apply(this,a);
            });
        }
        p.$=init;
        Object.defineProperty(p,"$bind",{
            get: function () {
                if (!this.__bounded) {
                    this.__bounded=new Klass.Binder(this);
                }
                return this.__bounded;
            }
        });
        if (warn) {
            //console.warn("This declaration style may malfunction when minified");
            if (!wrapCancelled) {
                console.warn("Use $this:true instead");
            } else {
                console.warn("Use python style in all methods and Use $this:true instead");
            }
            try {
                throw new Error("Stakku");
            } catch (e) {
                console.log(e.stack);
            }
            //console.warn(pd);
        }
        return klass;
    };
    function getArgs(f) {
        var fpat=/function[^\(]*\(([^\)]*)\)/;
        var r=fpat.exec(f+"");
        if (r) {
            return r[1].replace(/\s/g,"").split(",");
        }
        return [];
    }
    function isPropDesc(o) {
        if (typeof o!=="object") return false;
        if (!o) return false;
        var pk={configurable:1,enumerable:1,value:1,writable:1,get:1,set:1};
        var c=0;
        for (var k in o) {
            if (!pk[k]) return false;
            c+=pk[k];
        }
        return c;
    }
    Klass.Function=function () {throw new Error("Abstract");};
    Klass.opt=A.opt;
    Klass.Binder=Klass.define({
        $this:true,
        $:function (t,target) {
            function addMethod(k){
                if (typeof target[k]!=="function") return;
                t[k]=function () {
                    var a=Array.prototype.slice.call(arguments);
                    //console.log(this, this.__target);
                    //A(this.__target,"target is not set");
                    return target[k].apply(target,a);
                };
            }
            for (var k in target) addMethod(k);
        }
    });
    return Klass;
});
/*
requirejs(["Klass"],function (k) {
  P=k.define ({
     $:["x","y"]
  });
  p=P(2,3);
  console.log(p.x,p.y);
});
*/
;
define('LocalBrowserInfoClass',["FS","Klass","source-map","DeferredUtil"], function (FS,Klass,S,DU) {
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

define('LocalBrowser',["Shell", "FS","DeferredUtil","UI","source-map","LocalBrowserInfoClass"],
function (sh,FS,DU,UI,S,LocalBrowserInfoClass) {
    var LocalBrowser={};
    //var F=DU.tr;
    LocalBrowser=function (dom,options) {
        this.targetAttr=options||{};
        this.targetArea=dom;//=UI("iframe");
    };
    var p=LocalBrowser.prototype;
    p.close=function () {
        $(this.targetArea).empty();
    };
    p.resize=function (w,h) {
        if (this.iframe) {
            this.iframe.attr({
                    width:w,height:h
            });
        }
        this.targetAttr.width=w;
        this.targetAttr.height=h;
    };
    p.focus=function () {
        if (this.iframe) this.iframe.focus();
    };
    var urlparam=/\?.*$/;
    p.open=function (f,options) {
        options=options||{};
        var iwin;
        var idoc;
        var onload=options.onload || function () {};
        var onerror=options.onerror || (window.onerror ? function () {
            //return window.onerror.apply(window,[0,0,0,0,e]);
            return window.onerror.apply(window,arguments);
        }: function () {});
        delete options.onload;
        /*var dp=new DOMParser;
        var src=dp.parseFromString(f.text(),"text/html");
        if (options.onparse) {
            src=options.onparse(src,document);
        }*/
        var i=$("<iframe>");
        i.attr(this.targetAttr);
        if (isFirefox()) {
            i.attr("src",iframeSrcURL());
        }
        this.iframe=i;
        var base=f.up();
        var thiz=this;
        window.ifrm=i[0];
        var loaded;
        i.on("load",function (origLoadEvt) {
            if (loaded) return;
            loaded=true;
            iwin=i[0].contentWindow;
            /*if (options.globals) {
                for(var k in options.globals) {
                    iwin[k]=options.globals[k];
                }
            }*/
            options.origLoadEvt=origLoadEvt;
            iwin.LocalBrowserInfo=new LocalBrowserInfoClass(thiz,iwin,f,options);
            iwin.LocalBrowserInfo.wrapErrorHandler(onerror);
            //idoc=iwin.document;
            return iwin.LocalBrowserInfo.loadNode(f).then(function () {
                onload.apply(i[0],[origLoadEvt]);
            }).fail(onerror);
            /*return $.when().then(F(function () {
                return iwin.LocalBrowserInfo.appendNode(
                    src.getElementsByTagName("html")[0],
                    idoc.getElementsByTagName("html")[0]);
            })).then(F(function () {
                if(typeof (iwin.onload)==="function") iwin.onload();
                onload.apply(i[0],[]);
            })).fail(onerror);*/
        });
        $(this.targetArea).empty().append(i);
        return i[0];
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
    if (typeof sh=="object") sh.browser=function (f,options) {
        f=this.resolve(f,true);
        var d=new $.Deferred();
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

define('LocalBrowserWindow',["Shell", "FS","DeferredUtil","UI","source-map","LocalBrowserInfoClass","WebSite"],
function (sh,FS,DU,UI,S,LocalBrowserInfoClass,WebSite) {
    var LocalBrowserWindow=function (options) {
        this.targetAttr=options||{};
        this.window=options.window||window.open("about:blank","LocalBrowserWindow","menubar=no,toolbar=no,width=500,height=500");
    };
    var BLANK_URL=WebSite.runtime+"blank.html";
    var p=LocalBrowserWindow.prototype;
    p.close=function () {
        this.window.close();
    };
    p.resize=function (w,h) {
        //TODO
    };
    p.focus=function () {
        if (this.window) {
            //this.window.focus();
            this.window=window.open(BLANK_URL,"LocalBrowserWindow","menubar=no,toolbar=no,width=500,height=500");
        }
    };
    p.isActive=function () {
        return (this.window && !this.window.closed);
    };
    var urlparam=/\?.*$/;
    p.open=function (f,options) {
        options=options||{};
        var iwin=this.window;
        var idoc;
        var onload=options.onload || function () {};
        var onerror=options.onerror || (window.onerror ? function () {
//            return window.onerror.apply(window,[0,0,0,0,e]);
            return window.onerror.apply(window,arguments);
        }: function () {});
        delete options.onload;
        var base=f.up();
        var thiz=this;
        var loaded;
        window.lastLBW=this;
        window.LBW_onload=(function () {
            console.log("Loading...");
            if (loaded) return;
            loaded=true;
            iwin.LocalBrowserInfo=new LocalBrowserInfoClass(thiz,iwin,f,options);
            iwin.LocalBrowserInfo.wrapErrorHandler(onerror);
            return iwin.LocalBrowserInfo.loadNode(f).then(function () {
                onload.apply(iwin,[]);
            }).fail(function (e) {
                onerror.apply(iwin,[0,0,0,0,e]);
            });
        });
        iwin.location.href=BLANK_URL;
        return this.window;
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
    if (typeof sh=="object") sh.browserw=function (f,options) {
        f=this.resolve(f,true);
        var d=new $.Deferred();
        //this.echo(place);
        var w=new LocalBrowserWindow(options);
        w.open(f,{onload:function () {
            d.resolve();
        },onerror:function (e) {
            d.reject(e);
        }});
        return d.promise();
    };
    return LocalBrowserWindow;
});

define('DiagAdjuster',[],function () {
    var DiagAdjuster=function (diagElem) {
        this.diagElem=diagElem;
        this.rszt=null;
        this.margin=30;
        this.timeout=100;
    };
    DiagAdjuster.prototype.handleResize=function () {
        var self=this;
        if (this.rszt) clearTimeout(this.rszt);
        this.rszt=setTimeout(function () {
            var d=self.diagElem.closest(".ui-dialog");
            var t=d.find(".ui-dialog-titlebar");
            var dw=d.width(),dh=d.height(),th=t.height();
            var pad=self.margin;
            var sz={w:dw-pad, h:dh-th-pad};
            self.diagElem.css({width:sz.w,height:sz.h});
            self.afterResize(self.diagElem);
        },this.timeout);
    };
    DiagAdjuster.prototype.handleResizeF=function () {
        var self=this;
        return function () {
            self.handleResize();    
        };
    };
    DiagAdjuster.prototype.afterResize=function (){};
    return DiagAdjuster;
});

define('Tab',['require','exports','module','UI'],function (require, exports, module) {
    const UI=require("UI");
    function Tab(options) {
        if (typeof options.length==="number") {
            options={contents:options};
        }
        const infos=options.contents;
        const baseClass=options.class||"tabs";
        const classes= options.classes||{
            all: baseClass,
            selector: `${baseClass}-selector`,
            container: `${baseClass}-container`,
            content: `${baseClass}-content`,
            button: `${baseClass}-button`,
        };
        let onSelect;
        const sel=name=>{
            for (let dom of doms) {
                if (dom.info.name===name) {
                    dom.content.show();
                    dom.button.addClass("selected");
                    if (onSelect) onSelect(name, dom);
                } else {
                    dom.content.hide();
                    dom.button.removeClass("selected");
                }
            }
        };
        const res=UI("div",{class: classes.all, $var:"__top"});
        const selector=UI("div",{class:classes.selector}).appendTo(res);
        const container=UI("div",{class:classes.container}).appendTo(res);
        const doms=[];
        let init=infos[0].name;
        for (let info of infos) {
            const button=UI("button", {
                    class: classes.button,
                    "data-name": info.name}, info.caption || info.name );
            button.appendTo(selector);
            const content=UI("div", {class:classes.content, "data-name": info.name},
                        info.content
                    );
            content.appendTo(container);
            const dom={ info ,button, content};
            Object.assign(res.$vars, info.content.$vars||{});
            const name=info.name;
            button.click(()=>sel(name));
            doms.append(dom);
            if (info.selected) {
                init=name;
            }
        }
        sel(init);
        onSelect=options.onSelect;
        return {content:res, select:sel, contents:doms};
    }
    module.exports=Tab;
});

define('ctrl',[], function () {
    var ctrl={};
    ctrl.url=function (path,params) {
        let res=".?"+path;
        if (params) {
            res+=Object.keys(params).map (k=>`&${k}=${params[k]}`).join("");
        }
        return res;
    };
    ctrl.run=function (method,path,params) {
        params=params||{};
        return $.ajax({
            url: ctrl.url(path),
            data:params,
            cache: false,
            type:method
        });
    };
    ctrl.get=function (path,params) {
        return ctrl.run("get",path,params);
    };
    ctrl.post=function (path,params) {
        return ctrl.run("post",path,params);
    };
    return ctrl;
});

define('ExportOutputDialog',['require','exports','module','UI','Tab','ctrl'],function (require, exports, module) {
    const UI=require("UI");
    const Tab=require("Tab");
    const ctrl=require("ctrl");
    class ExportOutputDialog {
        outDest() {
            return this.vars.dest[0].outDest.value;
        }
        renderTable(sep) {
            const vars=this.vars;
            const s=vars.plain.val();
            const lines =s.split("\n");
            let ln=0;
            vars.table.empty();
            let attrs=[], datas=[];
            for (let line of lines ){
                const isAttr=ln==0;
                const tr=$("<tr>").appendTo(vars.table);
                line=line.replace(/\r/,"");
                if (line.length===0) continue;
                const row=line.split(sep);
                if (isAttr) attrs=row;
                else {
                    const data={};
                    let i=0;
                    for (let attr of attrs) {
                        data[attr]=row[i];
                        i++;
                    }
                    datas.push(data);
                }
                for (let d of row) {
                    const td=$(isAttr? "<th>": "<td>").appendTo(tr);
                    td.text(d);
                }
                ln++;
            }
            this.cdbData=datas;
            console.log(datas);
        }
        dom() {
            const cw=550,ch=250;
            if (this._dom) return this._dom;
            const chdest=(n)=>{
                switch(n){
                case "dl":
                    this.vars.send.text("ダウンロード");
                    this.vars.nameLabel.text("ファイル名");
                    break;
                case "ulu":
                case "ulc":
                    this.vars.send.text("送信");
                    this.vars.nameLabel.text("ファイル名");
                    break;
                case "cdb":
                    this.vars.send.text("送信");
                    this.vars.nameLabel.text("APIキー名");
                    break;
                }
            };
            const opt=(vname, caption)=>(["div",
                ["input", {
                    type:"radio", id:`outDest_${vname}`, name:`outDest`,
                    $var: vname, value:vname,
                    on:{change: ()=>chdest(vname)},
                }],
                ["label", {for: `outDest_${vname}`}, caption]
            ]);
            const tabs=Tab({
                onSelect: (name)=> {
                    const vars=this.vars;
                    if (name==="table") {
                        const s=vars.plain.val();
                        let sep=vars.sep.val();
                        if (!sep) {
                            sep=inferSeparator(s);
                            vars.sep.val(sep);
                        }
                        this.renderTable(sep);
                    }
                },
                contents: [
                    {
                        name: "plain", caption:"テキスト",
                        content: UI("textarea",{$var:"plain", css:{width: cw, height: ch}})
                    },
                    {
                        name: "table", caption:"表",
                        content: UI("div",{css:{
                                width: cw, height: ch,
                                overflowY: "scroll",overflowX: "scroll"
                            }},
                            ["div",
                                "区切り記号:", ["input", {$var:"sep",on:{input:()=>{
                                    const sep=this.vars.sep.val();
                                    this.renderTable(sep);
                                }}}],
                            ],
                            ["table",{$var:"table", class:"output", rows:10, cols:60}]
                        ),
                    }
                ],
            });
            this._dom=UI("div",
                ["div",
                    ["div",
                        ["form",{$var:"dest"},
                            opt("dl","ダウンロード"),
                            opt("ulu","「素材管理」(user)に送信"),
                            opt("ulc","「素材管理」(class)に送信"),
                            opt("cdb","Connect DBに送信"),
                        ]
                    ],
                    ["span",{$var: "nameLabel"},"ファイル名"], ["input",{$var:"name", value:"output.txt"}],
                    ["span",{$var: "status"}],
                    ["button", {$var:"send", on:{click:this.send.bind(this)}}, "ダウンロード"],
                ],
                tabs.content,
            );
            this.vars=Object.assign(this._dom.$vars, tabs.content.$vars);
            this.vars.dest[0].outDest.value="dl";
            chdest("dl");
            return this._dom;
        }
        async send() {
            const vars=this.vars;
            const content=this.dataContent();
            const name=vars.name.val();
            if (!name) {
                alert(`${vars.nameLabel.text()}を入れてください．`);
                return;
            }
            vars.send.prop("disabled",true);
            vars.status.text(`${vars.send.val()}中……`);
            try {
                switch(this.outDest()) {
                    case "dl":
                    window.saveAs(new Blob([content]), name);
                    break;
                    case "ulu":
                    await this.uploadAsset("user",name, content);
                    break;
                    case "ulc":
                    await this.uploadAsset("class",name, content);
                    break;
                    case "cdb":
                    const data=this.cdbData;
                    if (!data) {
                        return alert("データがありません");
                    }
                    console.log("cdb sending ",{key, data:JSON.stringify(data)});
                    const key=vars.name.val();
                    await ctrl.post("CDB/post", {key, data:JSON.stringify(data)});
                    break;
                }
                vars.status.text("完了");
            } catch (e) {
                alert(e.responseText || e);
                vars.status.text("失敗");
            } finally {
                vars.send.prop("disabled",false);
            }
        }
        uploadAsset(context, filename, content) {
            return $.post(ctrl.url("Asset/upload"),{context, filename, content});
        }
        dataContent() {
            return this.vars.plain.val();
        }
        show(srcElem) {
            const d=this.dom();
            d.dialog({
                title:"出力の共有",
                width:600, height:500
            });
            this.vars.status.text("");
            this.vars.plain.val(srcElem.innerText);
        }
    }
    function inferSeparator(text) {
        const cands=[",","\t"," ", /\s+/];
        const lines=text.split("\n");
        let res, max=-1;
        for (let cand of cands) {
            let score=0, prev;
            for (let line of lines) {
                const a=line.split(cand);
                if (!prev || a.length===prev) {
                    score+=a.length;
                }
                prev=a.length;
            }
            if (score>max) {
                res=cand;
                max=score;
            }
        }
        return res;
    }
    module.exports=new ExportOutputDialog();
});

define('RunDialog2',["UI","LocalBrowser","LocalBrowserWindow","DiagAdjuster","ExportOutputDialog"],
function (UI, LocalBrowser,LocalBrowserWindow,DA,ExportOutputDialog) {
    var res={};
    var geom=res.geom={};
    res.hasLocalBrowserWindow=function () {
        return res.lbw && res.lbw.isActive();
    };
    res.show=function (runFile, options) {
        options=options||{};
        options.height=options.height||geom.height||600;
        options.width=options.width||geom.width||16*((options.height+10)/9);
        if (!geom.height) geom.height=options.height;
        if (!geom.width) geom.width=options.width;
        if (options.window && !options.window.closed) {
            if (res.hasLocalBrowserWindow()) res.lbw.close();
            res.lbw=new LocalBrowserWindow({
                window:options.window,
                onload:function () {
                    console.log(this);
                    var cons=this.contentWindow.document.getElementById("console");
                    if (cons) cons.style.fontSize=options.font+"px";
                }
            });
            return res.lbw.open(runFile,options);
        }
        window.dialogClosed=false;
        var d=res.embed(runFile, options);
        console.log("RunDialog2 options",options);
        d.dialog({
            //left: 50,top:50,
            width:options.width,
            height:options.height,
            position: (
                geom.top?{
                    my: "left top",
                    at: "left+"+geom.left+" top+"+geom.top
                }:{ my: "center top", at: "right bottom"}
            ),
            //position: { my: "center top", at: "right bottom"},
            close:function(){
                window.dialogClosed=true;
                if (res.b) res.b.close();
                if(typeof options.toEditor == "function")options.toEditor();
            },
            resize:handleResize,
            drag:handleDrag
        });//,height:options.height?options.height-50:400});
        handleResize();
        function handleDrag(e,ngeom) {
          if (ngeom) {
              //geom.width=ngeom.size.width;
              //geom.height=ngeom.size.height;
              geom.left=ngeom.position.left;
              geom.top=ngeom.position.top;
          }
        }
        function handleResize(e,ngeom) {
            //console.log("RSZ",arguments);
            if (res.b/* && res.b.iframe*/) {
                res.b.resize(d.width(),d.height()-d.$vars.buttonRow.height());
                if (ngeom) {
                    geom.width=ngeom.size.width;
                    geom.height=ngeom.size.height;
                    geom.left=ngeom.position.left;
                    geom.top=ngeom.position.top;
                }
                /*res.b.iframe.attr({
                    width:d.width(),
                    height:d.height()-d.$vars.OKButton.height()});*/
            }
        }
    };
    function isie() {
        if(navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
            return true;
        }
        if(navigator.userAgent.toLowerCase().indexOf('trident') != -1) {
            return true;
        }
    }
    res.close=()=>res.d && res.d.dialog("close");
    res.embed=function (runFile, options) {
        options=options||{};
        if (!res.d) {
            res.d=UI("div",{title:"実行画面ダイアログ",id:"runDlg",css:{overflow:"hidden"}},
                    (options.targetDOM?["div",{$var:"buttonRow"},"実行結果"]:""),
                    ["div",{$var:"browser"}],
                    (!options.targetDOM? ["div",{$var:"buttonRow"},
                        ["button", {type:"button",$var:"OKButton", on:{click: res.close}}, "閉じる"],
                        ["button", {type:"button",$var:"cpOut", on:{click: res.cpOut}}, "出力をコピー"],
                        ["button", {type:"button",$var:"dlOut", on:{click: res.dlOut}}, "出力を共有……"],
                    ]:""),
            );
            res.da=new DA(res.d);
            res.da.afterResize=function (d) {
                if (res.b && res.b.iframe) {
                    res.b.iframe.attr({
                        width:d.width(),
                        height:d.height()-res.d.$vars.buttonRow.height()});
                }
            };
            res.diagAdjuster=res.da;
            const bsize={width:400, height:400};
            if (options.targetDOM) {
                //console.log("targetDOM",res.targetDOM.width(), res.d.height());
                const td=options.targetDOM;
                res.d.appendTo(td);
                res.fitToTarget=()=>{
                    bsize.width=td.width();
                    bsize.height=td.height()-res.d.$vars.buttonRow.height();
                    if (res.b) {
                        res.b.resize(bsize.width, bsize.height);
                    }
                };
                res.fitToTarget();
                //res.da.afterResize(res.d);
            }
            res.b=new LocalBrowser(res.d.$vars.browser[0],{
                id:"ifrmDlg",
                width:bsize.width,
                height:bsize.height,
            });
        }
        setTimeout(function () {
            res.b.focus();
        },100);
        res.b.open(runFile,{
            params:options.params,
            onload:function () {
                console.log(this);
                var cons=this.contentWindow.document.getElementById("console");
                if (cons) cons.style.fontSize=options.font+"px";
            }
        });
        //if (res.da) res.da.handleResize();
        return res.d;
    };
    res.cpOut=function () {
        const w=res.b.iframe[0].contentWindow;
        const d=w.document;
        const c=d.querySelector("#console") || d.body;
        
        navigator.clipboard.writeText(c.innerText);
    };
    res.dlOut=function () {
        const w=res.b.iframe[0].contentWindow;
        const d=w.document;
        const c=d.querySelector("#console") || d.body;
        ExportOutputDialog.show(c);
        return;
        window.saveAs(new Blob([c.innerText]), "output.txt");
    };
    return res;
});

define('stringifyError',['require','exports','module'],function (require, exports, module) {
    module.exports=function (e) {
        var eobj={stack:e.stack,message:e.message, strMesg:e+""};
        for (let k in e) {
            const v=e[k];
            if (v && typeof v.text==="function" && typeof v.name==="function") {
                eobj[k]={
                    name: v.name(),
                    text: v.text(),
                };
            } else {
                eobj[k]=v;
            }
            /*else if (typeof v==="number") {
                eobj[k]=v;
            } else {
                eobj[k]=v+"";
            }*/
        }
        return eobj;
    };
});

define('logToServer2',['require','exports','module','stringifyError'],function (require, exports, module) {
    const stringifyError=require("stringifyError");
    var c=0,time=(new Date().getTime());
    function logToServer2(filePath,codeL,codeH,result,detail,lang) {
        var d=new Date();
		var t=(new Date().getTime());
		c+=1/time-t;
		var code={};
		code[lang]=codeL;
		code.HTML=codeH;
        if (typeof detail==="object") {//} instanceof Error) {
            const eobj=stringifyError(detail);
            /*
            var eobj={stack:detail.stack,message:detail.message, strMesg:detail+""};
            for (var k in detail) {
                if (k==="errorParams") {
                    eobj[k]=detail[k]+"";
                } else {
                    eobj[k]=detail[k];
                }
            }*/
            detail=eobj;
        } else {
            detail={message:detail};
        }
        var data={date:d.getFullYear()+"/"+dataPadding(d.getMonth()+1)+"/"+dataPadding(d.getDate()),time:dataPadding(d.getHours())+":"+dataPadding(d.getMinutes())+":"+dataPadding(d.getSeconds()),lang:lang,filename:filePath,result:result,detail:detail,code:code};
        console.log("logged to server DATA",data);
		return $.post(".?dump2",{data:JSON.stringify(data)}).then(function (r) {
			console.log(r);
		}).fail(function(e){
			console.log(e);
		});
    }
    function dataPadding(d){
        return ('0'+d).slice(-2);
    }
    return logToServer2;
});

window.SplashScreen=window.SplashScreen||(function () {
    var s=$("<img>").css({position:"absolute",
            left: 100, top:100, fontSize: 30, //background: "white",
            zIndex:1000,transform:"scale(0.5,0.5)"
        }).attr({src:"images/bitarrow-3_360.png"});
    var SS={};
    SS.show=function (mesg) {
    	if (!s) return;
        //s.text(mesg||"Please wait...");
    	//if (SS.state) return;
    	SS.state=true;
    	console.log("Show");
    	s.appendTo("body");
        var top=$(window).height()/2-s.height()/2;
        var left=$(window).width()/2-s.width()/2;
        SS.x=10;
        s.css("left",SS.x);
        s.css("top",top);
    };
    var cnt=0;
    setTimeout(animation,100);
    function animation() {
        var top=$(window).height()/2-s.height()/2;
        var left=$(window).width()/2-s.width()/2;
        if (SS.state=="away") {
            SS.x+=100;
            if (SS.x+s.width()/2>=$(window).width()) {
                s.remove();
                SS.state=false;
            } else {
                s.css("left",SS.x);
            }       
        } else if (SS.state===true) {
            //s.text("Please wait"+(cnt%2==0?"...":""));
            cnt+=0.5;
            s.css("left",SS.x);
            s.css("top",top+Math.sin(cnt)*10);
            if (SS.x<left) SS.x+=100;
        }
        setTimeout(animation,100);
        SS.lastAnimated=new Date().getTime();
    }
    SS.lastAnimated=0;
    SS.waitIfBusy=function (r) {
        if (SS.busyTime()>90) {
            var d=new $.Deferred;
            setTimeout(function () {d.resolve(r)},0);
            return d.promise();
        }  
        return r;
    };
    SS.busyTime=function () {
        return new Date().getTime()-SS.lastAnimated;
    }
    SS.progress=function (me) {
        //s.text(me||"Please wait...");
        //SS.show(me);
    };
    SS.hide=function () {
    	if (SS.state===false) return;
    	console.log("Hide");
    	s.remove();
    	SS.state="away";
    };
    return SS;
})();
define("SplashScreen", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.SplashScreen;
    };
}(this)));

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*global unescape, define, module */

;(function ($) {
  'use strict'

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safe_add (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bit_rol (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5_cmn (q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
  }
  function md5_ff (a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
  }
  function md5_gg (a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
  }
  function md5_hh (a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5_ii (a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binl_md5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5_ff(a, b, c, d, x[i], 7, -680876936)
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5_gg(b, c, d, a, x[i], 20, -373897302)
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5_hh(d, a, b, c, x[i], 11, -358537222)
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5_ii(a, b, c, d, x[i], 6, -198630844)
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safe_add(a, olda)
      b = safe_add(b, oldb)
      c = safe_add(c, oldc)
      d = safe_add(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstr_md5 (s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstr_hmac_md5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binl_md5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hex_tab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hex_tab.charAt((x >>> 4) & 0x0F) +
      hex_tab.charAt(x & 0x0F)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstr_utf8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function raw_md5 (s) {
    return rstr_md5(str2rstr_utf8(s))
  }
  function hex_md5 (s) {
    return rstr2hex(raw_md5(s))
  }
  function raw_hmac_md5 (k, d) {
    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))
  }
  function hex_hmac_md5 (k, d) {
    return rstr2hex(raw_hmac_md5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hex_md5(string)
      }
      return raw_md5(string)
    }
    if (!raw) {
      return hex_hmac_md5(key, string)
    }
    return raw_hmac_md5(key, string)
  }

  if (typeof define === 'function' && define.amd) {
    define('md5',[],function () {
      return md5
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
}(this))
;
/* global $ */
define('Auth',["FS","md5","WebSite","DeferredUtil","root"], function (FS,md5,WebSite,DU,root) {
    root.Auth={
        check:function () {
            var self=this;
            //console.log("CHK");
            return $.get(WebSite.controller+"?Login/curStatus&"+Math.random()).then(function (r) {
                if (typeof r==="string") r=JSON.parse(r);
                console.log(r,r.class,r.user, r.teacher);
                self.login(r.class,r.user, r.teacher);
                return self;
            });

            /*return $.when(
                $.get(WebSite.controller+"?Login/curclass&"+Math.random()),
                $.get(WebSite.controller+"?Login/curuser&"+Math.random()),
                $.get(WebSite.controller+"?Login/curTeacher&"+Math.random())
            ).then(function (c,u,t) {
                //console.log("CHKE",c[0],u[0]);
                self.login(c[0],u[0],t[0]);
                return self;
            });*/
        },
        assertLogin: function (options) {
            var self=this;
            return DU.promise(function (succ/*,fail*/) {
                if (self.loggedIn()) {
                    onsucc();
                } else {
                    self.check().then(function () {
                        if (!self.loggedIn()) {
                            options.showLoginLink(WebSite.controller+"?Login/form");
                        } else {
                            onsucc();
                        }
                    });
                }
                function onsucc() {
                    var userInfo={class:self.class,user:self.user};
                    if (options.success) options.success(userInfo);
                    succ(userInfo);
                }
            });
        },
        loggedIn:function () {
            return (typeof this.class)==="string" && this.class.length>0 &&
                   (typeof this.user) ==="string" && this.user.length>0;
        },
        login:function (_class,user,teacher) {
            this.class=_class;
            this.user=user;
            this.teacher=teacher;
            console.log("teacher",teacher);
        },
        localProjects:function ( ){
            return FS.get("/home/").rel(this.class+"/").rel(this.user+"/"); //changeHOME(1)
            //return FS.resolve("${tonyuHome}/Projects/");//changeHOME
        },
        remoteProjects: function () {
            return FS.get("/home/").rel(this.class+"/").rel(this.user+"/"); //changeHOME(1)
            //return FS.get("/");//changeHOME
        },
        genHash:function (projectName) {
            return md5(this.class+"/"+this.user+"/"+projectName).substring(0,8)+"/";
        },
        getHash: function (projectName) {
            var self=this;
            if (self.hashCache[projectName]) {
                return $.when(self.hashCache[projectName]);
            }
            return $.ajax(WebSite.controller+"?Login/getPublishedDir",{
                data: {
                    project: projectName
                }
            }).then(function (res) {
                self.hashCache[projectName]=res;
                return res;
            });
        },
        publishedDir: function (projectName) {
            return this.getHash(projectName).then(function (name){
                return FS.get("/pub/"+name);
            });
        },
        publishedURL: function (projectName) {
            return this.getHash(projectName).then(function (name) {
                return WebSite.published+name;
            });
        },
        remotePublics: function () {
            return this.remoteProjects().rel("public/"); //changeHOME(1)
            //return FS.get("/public/");//changeHOME
        },
        hashCache:{},
        getClassOptions: function () {
            return $.ajax(".?Class/getOptions");
        },
    };
    return root.Auth;
});

define('DistributeDialog',["UI"], function (UI) {
    var res={};
	res.show=function (text, onOK,options) {
    	var d=res.embed(text,onOK,options);
    	d.dialog({width:600});
	};
	res.embed=function (text, onOK, options) {
	    if (!options) options={};
        if (!res.d) {
            res.d=UI("div",{title:"一斉配布"},
        		$("<div>プログラム</div>"),
        		res.tx=$("<textarea>").attr({id:"fileCont",rows:20,cols:60}).val(text),
        		$("<br>"),
				$("<input>").attr({id:"overwrite",type:"checkbox"}),
         		$("<div>チェックを入れると既にファイルがある場合中身が上記の内容に更新されます</div>"),


			/*$("<div>input1</div>"),
			res.tx=$("<textarea>").attr({id:"fileCont2",rows:20,cols:20}).val(text),
			$("<br>"),*/


                res.okb=$("<button>OK</button>").click(function () {
                    //alert("clicked");
            	    res.d.done({next:false});
                }),
                res.oknb=$("<button>OK&Next</button>").click(function () {
                    //alert("clicked");
                    res.d.done({next:true});
                })
            );
        }
        res.tx.val(text);
        var d=res.d;
/*        d.$vars.OKButton.attr("disabled", false);
        d.$vars.OKButton.val("OK");*/
        d.done=function ({next}) {
            onOK($("#fileCont").val(),$("#overwrite").prop("checked"),{next});
            if(!next) d.dialog("close");
        };
        return d;
    };
    res.setDisabled=e=>{
        if (res.okb) res.okb.attr('disabled',e);
        if (res.oknb) res.oknb.attr('disabled',e);
        if (res.tx) res.tx.attr('disabled',e);
    };
    return res;
});

define('NotificationDialog',["UI","FS"], function (UI,FS) {
    var res={};
	res.show=function (mesg,options) {
    	var d=res.embed(mesg,options);
    	if (!res.opened) {
            //-- Firefox scanf->enter-> open it -> focus to x(close)->release enter->close??
            setTimeout(function () {
                d.dialog({width:500,height:100,
            	    position: { my: "left bottom", at: "left bottom"},
            	    close: function () {
            	        res.opened=false;
            	    }
            	});
                afterOpen();
            },100);
    	} else afterOpen();
        function afterOpen() {
            res.opened=true;
        	var dcon=d.closest(".ui-dialog-content");
        	dcon[0].scrollTop=dcon[0].scrollHeight;
        }
	};
	res.embed=function (mesg, options) {
	    if (!options) options={};
        if (!res.d) {
            var FType={
                fromVal: function (val){
                    return val=="" ? null : FS.get(val);
                },
                toVal: function (v){ return v ? v.path() : "";}
            };
        	res.d=UI("div",{title:"通知"},
        	    ["div",{$var:"cont"},""]
                /* ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]*/
            );
        }
        var d=res.d;
        var c=d.$vars.cont;
        if (res.lastLine && res.lastLine.$vars.mesg.text()===mesg) {
            var ti=res.lastLine.$vars.times;
            c=ti.text();
            if (!c) c="(2)";
            else c="("+(c.replace(/\D/g,"")-(-1))+")";
            ti.text(c);
        } else {
            res.lastLine=UI("div", ["span",{$var:"times"}],["span",{$var:"mesg"},mesg]);
            c.append(res.lastLine);
            //c.scrollTop=c.scrollHeight;
        }
    	d.done=function () {
    	    /*if (d.$edits.validator.isValid()) {
                onOK(model);
                d.dialog("close");
    	    }*/
    	};
    	return d;
    };
    return res;
});

define('IframeDialog',["UI","DiagAdjuster"],
function (UI ,DA) {
    var res={};
    res.show=function (url, options) {
        options=options||{};
        options.height=options.height||600;
        options.width=options.width||16*((options.height+10)/9);
        if (options.window && !options.window.closed) {
            options.window.location.href=url;
            return;
        }
        window.dialogClosed=false;
        var d=res.embed(url, options);
        console.log("IframeDialog options",options);
        d.dialog({
            width:options.width,
            height:options.height,
            position: { my: "center top", at: "right bottom"},
            close:function(){
                window.dialogClosed=true;
                //if (res.b) res.b.close();
                if(typeof options.toEditor == "function")options.toEditor();
            },
            resize:handleResize
        });//,height:options.height?options.height-50:400});
        setTimeout(function () {
            try {
                if (!res.iframe[0].contentWindow.onerror) res.iframe[0].contentWindow.onerror=window.onerror;
            } catch(e) {
                console.log(e);
            }
        },100);
        handleResize();
        function handleResize() {
            if (res.da) {
                res.da.handleResize();
            }
        }
    };
    res.close=function () {
        if (!res.d)return;
        res.d.dialog("close");
    };
    res.embed=function (url, options) {
        res.url=url;
        options=options||{};
        if (!res.d) {
            res.d=UI("div",{title:"実行画面ダイアログ",id:"runDlg",css:{overflow:"hidden"}},
                    ["div",{$var:"browser"},
                        ["iframe",{$var:"iframe",src:url}]
                    ],
                    ["button", {type:"button",$var:"OKButton", on:{click: function () {
                        res.d.dialog("close");
                    }}}, "閉じる"],
                    (["button", {type:"button",$var:"WButton", on:{click: function () {
                        if (res.window && !res.window.closed) res.window.close();
                        res.window=window.open(res.url,"LocalBrowserWindow"+Math.random(),"menubar=no,toolbar=no,width=500,height=500");
                        if (!res.window.onerror) res.window.onerror=window.onerror;
                    }}}, "別ウィンドウ"])
            );
            res.iframe=res.d.$vars.iframe;
            res.da=new DA(res.d);
            res.da.afterResize=function (d) {
                if (res.iframe) {
                    res.iframe.attr({
                        width:d.width(),
                        height:d.height()-res.d.$vars.OKButton.height()});
                }
            };
        } else {
            try {
                res.iframe[0].contentWindow.location.href=url;
            } catch(e) {
                res.iframe.attr({src:url});
            }
        }
        setTimeout(function () {
            res.iframe.focus();
        },100);
        //if (res.da) res.da.handleResize();
        return res.d;
    };
    return res;
});

define('DateUtil',[],function (){
    //https://qiita.com/osakanafish/items/c64fe8a34e7221e811d0
    var format = function (date, format) {
        if (!(date instanceof Date)) date=new Date(date);
        if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
        format = format.replace(/YYYY/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        if (format.match(/S/g)) {
            var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
            var length = format.match(/S/g).length;
            for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
        }
        return format;
    };
    var toUnixTime = function (date) {
        if (!(date instanceof Date)) date=new Date(date);
        var t=date.getTime();
        return Math.floor(t/1000);
    };
    var fromUnixTime = function (ut) {
        return new Date((ut-0)*1000);
    };
    return {
        format:format,
        toUnixTime:toUnixTime,
        fromUnixTime:fromUnixTime
    };
});

define('TestsuiteDialog',["Klass","UI","assert","DateUtil","DeferredUtil"],
function (Klass,UI,A,DateUtil,DU) {
    var colon=":";
    var TestsuiteDialog=Klass.define({
        $this:true,
        controller: "Testcase",
        dialogParam: {
            width:500,
            height:400
        },
        $:function (t,assignment) {
            t.assignment=assignment;
            t.assignmentParam="&assignment="+t.assignment.id;
            t.prefix=t.assignment.name+"-";
        },
        setEditMode: function (t) {
            t.button.text("更新");
            t.mode="edit";
            t.genOutB.prop("disabled",false);
            t.delB.prop("disabled",false);
        },
        setAddMode: function (t) {
            t.button.text("更新");
//            t.button.text("追加");
            t.mode="add";
            t.genOutB.prop("disabled",true);
            t.delB.prop("disabled",true);
            delete t.cur;
        },
        edit: function (t,name) {
            t.dom=t.dom||t.createDOM();
            //t.dom.dialog(t.dialogParam);
            t.mode=null;
            $.post("a.php?"+t.controller+"/get",{
                assignment: t.assignment.id,
                name: name
            }).then(function (a) {
                console.log("got",a);
                t.cur=a;
                t.setEditMode();
                t.name.val(a.name);
                t.origname.val(a.name);
                t.input.val(a.input);
            }).catch(DU.E);
        },
        add: function (t) {
            var dir;
            t.name.val(t.prefix);
            t.input.val("");
            t.setAddMode();
        },
        show: function (t) {
            t.dom=t.dom||t.createDOM();
            t.dom.dialog(t.dialogParam);
            t.add();
            //console.log("tlist",t.showList());
            t.showList();
        },
        showList:function (t) {
            t.list.empty();
            return $.get("a.php?"+t.controller+"/list"+t.assignmentParam).then(function (r) {
                console.log("list ",r);
                t.list.empty();
                t.list.append(UI("div",
                    ["a",{href:"javascript"+colon+";",on:{
                        click: function () {
                            t.add();
                        }
                    }},"新規"]));
                r.forEach(function (e) {
                    t.list.append(UI("div",
                    ["a",{href:"javascript"+colon+";",on:{
                        click: function () {
                            t.edit(e.name);
                        }
                    }},e.name]));
                });
            }).catch(DU.E);
        },
        createDOM: function (t) {
            t.dom=UI(
                "div",{title:"採点基準の管理"},
                ["div",{css:{float:"left",display:"none"},$var:"list"}],
                ["div",{css:{float:"right"}},
                ["form",{action:"javascript"+colon+";",name:"as_edit"},
                    ["div",
                        ["label",{for:"input"},"採点基準"],
                        ["div",
                            ["textarea",{rows:10,cols:32,name:"input"}]
                        ]
                    ],
                    ["button",{name:"button",on:{click:t.$bind.post}},"更新"],
                    //["button",{name:"genOutB",on:{click:t.$bind.genOutB}},"出力生成"],
                    //["button",{name:"delB",on:{click:t.$bind.del}},"削除"],
                    ["span",{$var:"mesg"}]
                ]]
            );
            var form=t.dom.find("form")[0];
            t.list=t.dom.$vars.list;
            t.mesg=t.dom.$vars.mesg;
            t.name=$(form.name);
            t.genOutB=$(form.genOutB);
            t.delB=$(form.delB);
            t.origname=$(form.origname);
            t.input=$(form.input);
            t.button=$(form.button);
            return t.dom;
        },
        showMesg: function (t,text) {
            if (t._etimer) clearTimeout(t._etimer);
            t.mesg.text(text);
            t._etimer=setTimeout(function () {
                t.mesg.text("");
            },1000);
        },
        editTest: function (t) {
            if (t.mode!=="edit") throw new Error("Not edit mode");
            console.log(t.cur);
            //alert("Edit"+d);
        },
        post: function (t) {
            var param={
                assignment: t.assignment.id,
                origname:t.origname.val(),
                name:t.name.val(),
                input:t.input.val()
            };
            console.log("post param",param);
            switch (t.mode) {
            case "add":
            return $.post("a.php?"+t.controller+"/add",param).then(function (r){
                t.cur=param;
                t.cur.id=r-0;
                t.showMesg("追加しました");
                t.showList();
                t.setEditMode();
                t.origname.val(param.name);
                console.log("Result",r,param);
            },DU.E);
            case "edit":
            if (t.origname.val()!==t.name.val()) {
                return $.post("a.php?"+t.controller+"/rename",param).then(function (r){
                    t.showList();
                    t.showMesg("更新しました");
                    console.log("Result",r);
                },DU.E);
            } else {
                return $.post("a.php?"+t.controller+"/edit",param).then(function (r){
                    t.showMesg("更新しました");
                    console.log("Result",r);
                },DU.E);
            }
            break;
            default:
                alert("No mode "+t.mode);
            }
        },
        del: function (t) {
            if (t.mode!=="edit") return;
            if (!confirm(t.cur.name+"を削除しますか？")) return;
            $.get("a.php?"+t.controller+"/del&id="+t.cur.id).then(function (r){
                t.showMesg("削除しました");
                t.add();
                t.showList();
                console.log("Result",r);
            },DU.E);
        },
        dispose: function (t) {
            if (t.dom) t.dom.remove();
        }
    });
    return TestsuiteDialog;
});

define('AssignmentDialog',["Klass","UI","assert","DateUtil","DeferredUtil","TestsuiteDialog","WebSite"],
function (Klass,UI,A,DateUtil,DU,TestsuiteDialog,WebSite) {
    var colon=":";
    var AssignmentDialog=Klass.define({
        $this:true,
        $:["prj"],
        dialogParam: {
            width:600,
            height:600
        },
        setEditMode: function (t) {
            t.button.text("更新");
            t.mode="edit";
            t.editTestB.prop("disabled",false);
            t.delB.prop("disabled",false);

        },
        setAddMode: function (t) {
            t.button.text("追加");
            t.mode="add";
            t.editTestB.prop("disabled",true);
            t.delB.prop("disabled",true);
            delete t.cur;
        },
        edit: function (t,name) {
            t.dom=t.dom||t.createDOM();
            //t.dom.dialog(t.dialogParam);
            t.mode=null;
            $.post(WebSite.controller+"?Assignment/get",{
                name: name
            }).then(function (a) {
                console.log("got",a);
                t.cur=a;
                t.setEditMode();
                t.name.val(a.name);
                t.origname.val(a.name);
                for (var k in a.files) {
                    t.file.val(k);
                }
                t.time.val(DateUtil.format(DateUtil.fromUnixTime(a.time),"YYYY/MM/DD"));
                t.deadline.val(DateUtil.format(DateUtil.fromUnixTime(a.deadline),"YYYY/MM/DD"));
                t.description.val(a.description);
                t.criteria.val(a.criteria);
            },function (e) {
                console.error(e.responseText);
            });
        },
        add: function (t,file) {
            var dir;
            if (file) {
                var prjTop=t.prj.getDir().up();
                t.file.val(file.relPath(prjTop));
                t.prefix=file.truncExt().replace(/[\/]/g,"-");
            } else {
                t.file.val("");
            }
            t.name.val(t.prefix);
            t.description.val("");
            t.setAddMode();
        },
        show: function (t,file) {
            t.dom=t.dom||t.createDOM();
            t.dom.dialog(t.dialogParam);
            t.add(file);
            //console.log("tlist",t.showList());
            t.showList();
        },
        showList:function (t) {
            t.list.empty();
            return $.get(WebSite.controller+"?Assignment/listNames").then(function (r) {
                if (typeof r==="string") {
                    r=JSON.parse(r);
                }
                t.list.empty();
                t.list.append(UI("div",
                    ["a",{href:"javascript"+colon+";",on:{
                        click: function () {
                            t.add();
                        }
                    }},"新規"]));
                r.sort(function (a,b) {
                    return b.id-a.id;
                });
                //console.log("alist",r);
                r.forEach(function (e) {
                    t.list.append(UI("div",
                    ["a",{href:"javascript"+colon+";",on:{
                        click: function () {
                            t.edit(e.name);
                        }
                    }},e.name]));
                });
            }).catch(DU.E);
        },
        createDOM: function (t) {
            t.dom=UI(
                "div",{title:"課題の管理"},
                ["div",{css:{float:"left",height:"530",overflowY:"scroll"},$var:"list"}],
                ["div",{css:{float:"right"}},
                ["form",{action:"javascript"+colon+";",name:"as_edit"},
                    ["div",
                        ["label",{for:"name"},"課題名"],
                        ["input",{name:"name"}],
                        ["input",{type:"hidden",name:"origname"}]
                    ],
                    ["div",
                        ["div",["label",{for:"description"},"説明"]],
                        ["textarea",{rows:5,cols:40,name:"description"}]
                    ],
                    ["div",
                        ["label",{for:"time"},"出題日"],
                        ["input",{name:"time",
                        value:DateUtil.format(new Date(),"YYYY/MM/DD")}]
                    ],
                    ["div",
                        ["label",{for:"deadline"},"締切日"],
                        ["input",{name:"deadline",
                        value:DateUtil.format(
                            new Date().getTime()+1000*365*86400,"YYYY/MM/DD"
                        )}]
                    ],
                    ["div",
                        ["label",{for:"file"},"ファイル"],
                        ["input",{name:"file"}]
                    ],
                    ["div",
                        ["div",["label",{for:"criteria"},"採点基準"]],
                        ["textarea",{rows:10,cols:40,name:"criteria"}]
                    ],
                    ["button",{name:"button",on:{click:t.$bind.post}},"追加"],
//                    ["button",{name:"editTestB",on:{click:t.$bind.editTest}},"テストケース編集"],
                    ["button",{name:"delB",on:{click:t.$bind.del}},"削除"],
                    ["span",{$var:"mesg"}]
                ]]
            );
            var form=t.dom.find("form")[0];
            t.list=t.dom.$vars.list;
            t.mesg=t.dom.$vars.mesg;
            t.name=$(form.name);
            t.editTestB=$(form.editTestB);
            t.delB=$(form.delB);
            t.origname=$(form.origname);
            t.criteria=$(form.criteria);
            t.description=$(form.description);
            t.file=$(form.file);
            t.button=$(form.button);
            t.time=$(form.time);
            t.deadline=$(form.deadline);
            return t.dom;
        },
        showMesg: function (t,text) {
            if (t._etimer) clearTimeout(t._etimer);
            t.mesg.text(text);
            t._etimer=setTimeout(function () {
                t.mesg.text("");
            },1000);
        },
        editTest: function (t) {
            if (t.mode!=="edit") throw new Error("Not edit mode");
            console.log(t.cur);
            if (t.testsuiteDialog) t.testsuiteDialog.dispose();
            t.testsuiteDialog=new TestsuiteDialog(t.cur);
            t.testsuiteDialog.show();
            //alert("Edit"+d);
        },
        post: function (t) {
            var param={
                origname:t.origname.val(),
                name:t.name.val(),
                criteria:t.criteria.val(),
                description:t.description.val(),
                time:DateUtil.toUnixTime(t.time.val()),
                deadline:DateUtil.toUnixTime(t.deadline.val()),
                files:{}
            };
            param.files[t.file.val()]=true;
            param.files=JSON.stringify(param.files);
            console.log("post param",param);
            switch (t.mode) {
            case "add":
            return $.post(WebSite.controller+"?Assignment/add",param).then(function (r){
                t.cur=param;
                t.cur.id=r-0;
                t.showMesg("追加しました");
                t.showList();
                t.setEditMode();
                t.origname.val(t.name.val());
                console.log("Result",r,param);
            },DU.E);
            case "edit":
            var pre=DU.directPromise();
            if (t.origname.val()!==t.name.val()) {
                pre=$.post(WebSite.controller+"?Assignment/rename",param).then(function (r){
                    t.showList();
                    t.showMesg("名前変更しました");
                    console.log("ren Result",r);
                });
            }
            return pre.then(function () {
                return $.post(WebSite.controller+"?Assignment/edit",param);
            }).then(function (r){
                t.showMesg("更新しました");
                console.log("upd Result",r);
            },DU.E);
            default:
                alert("No mode "+t.mode);
            }
        },
        del: function (t) {
            if (t.mode!=="edit") return;
            if (!confirm(t.cur.name+"を削除しますか？")) return;
            $.get(WebSite.controller+"?Assignment/del&id="+t.cur.id).then(function (r){
                t.showMesg("削除しました");
                t.add();
                t.showList();
                console.log("Result",r);
            },DU.E);
        }
    });
    //assignmentDialog=new AssignmentDialog();
    return AssignmentDialog;
});

define('jshint',[],function () {
    var colon=":";
    return {
        Function: Function,
        use: function () {},
        scriptURL: function (url) {
            return "javascript"+colon+url;
        }
    };
});

define('SubmitDialog',["UI","Klass","DeferredUtil","WebSite","jshint"],
function (UI,Klass,DU,WebSite,jshint){
    var SubmitDialog=Klass.define({
        $this:true,
        $: function (t,prj) {
            t.prj=prj;
        },
        show: function (t,file) {
            t.dom=t.dom||t.createDOM();
            t.dom.dialog();
            var path=t.prj.getDir().name()+file.name();
            return $.get(WebSite.controller+"?Assignment/listNames").
            then(function (r) {
                console.log("Assignment/listNames",r);
                r.forEach(function (e) {
                    if (typeof e.files==="string") e.files=JSON.parse(e.files);
                    if (e.files[path]) e.ord=0;
                    else e.ord=1;
                });
                r=r.sort(function (a,b) {
                    var c=a.ord-b.ord;
                    if (c!=0) return c;
                    return (a.name>b.name ? 1:-1);
                });
                console.log(r);
                $(t.form.name).empty();
                r.forEach(function (n) {

                    $(t.form.name).append(
                        UI("option",{value:n.name},n.name)
                    );
                });
                t.form.file.value=path;
            }).catch(DU.E);
        },
        createDOM:function (t) {
            t.dom=UI("div",{title:"課題の提出"},
            ["form",{action:jshint.scriptURL(";"),$var:"form"},
                ["div",
                    ["label",{for:"name"},"課題名"],
                    ["select",{name:"name"}],
                ],
                ["div",
                    ["label",{for:"file"},"ファイル名"],
                    ["input",{name:"file"}],
                ],
                ["div",
                    ["input",{type:"submit",name:"button",
                    on:{click:t.$bind.submit}},"提出"]
                ],
            ]);
            t.form=t.dom.$vars.form[0];
            return t.dom;
        },
        submit: function (t) {
            var param={};
            var names=["name","file"];
            names.forEach(function (name) {
                param[name]=t.form[name].value;
            });
            var fobj=t.prj.getDir().up().rel(param.file);
            console.log(fobj.path());
            param.files={};
            param.files[param.file]=fobj.text();
            delete param.file;
            param.files=JSON.stringify(param.files);
            console.log("submit",param);
            $.post(WebSite.controller+"?Assignment/submit",param).then(function (r) {
                if (typeof r=="string") {
                    r=JSON.parse(r);
                }
                console.log(r);
                alert("提出しました");
            }).catch(DU.E);
        }
    });
    return SubmitDialog;
});

/*global $*/
define('CommentDialog2',["UI","Klass","root","WebSite"],function (UI,Klass,root,WebSite) {
    //var res={};
    root.CommentDialog2=Klass.define({
        $this: true,
        $: ["prj"],
        getComment: function (t,file) {
            var path=t.prj.getDir().name()+file.name();
            return $.get(WebSite.controller+"?Mark/getLast&file="+path+"&p="+Math.random()).then(function (r) {
                if (typeof r==="string") r=JSON.parse(r);
                if (!r.result) return null;
                return r;
            });
        },
        show: function (t,r) {
            t.createDOM();
            if (!r) return;
            t.result.text(r.result);
            t.comment.val(r.comment);
            t.dom.dialog({width:600});
        },
        createDOM: function (t) {
            if (t.dom) return t.dom;
            t.dom=UI("div",{title:"採点結果"},
                ["div",{$var:"result"}],
                ["textarea",{$var:"comment",rows:20,cols:60,readonly:true}]
            );
            t.result=t.dom.$vars.result;
            t.comment=t.dom.$vars.comment;
            return t.dom;
        }
    });
    return root.CommentDialog2;
});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define('BuilderClient',[],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TonyuBuilderClient = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const root=require("../lib/root");
const Worker=root.Worker;
const WS=require("../lib/WorkerServiceB");
const SourceFiles=require("../lang/SourceFiles");
const FileMap=require("../lib/FileMap");
//const FS=(root.parent && root.parent.FS) || root.FS;
const FS=root.FS;// TODO

class BuilderClient {
    constructor(prj,config) {// dirBased
        this.prj=prj;
        let url=config.worker.url;
        if (!url.match(/^blob/)) url+="?"+Math.random();
        this.w=new WS.Wrapper(new Worker(url));
        this.config=config||{};
        this.fileMap=new FileMap();
    }
    getOutputFile(...f) {return this.prj.getOutputFile(...f);}
    getDir(){return this.prj.getDir();}
    setDebugger(t) {this.debugger=t;}// t:iframe.contentWindow.Debugger
    exec(srcraw) {
        if (this.debugger) return this.debugger.exec(srcraw);
    }
    convertFromWorkerPath(path) {
        return this.fileMap.convert(path,"remote","local");
    }
    exportFiles() {
        const localPrjDir=this.getDir();
        const n2files=this.prj.sourceFiles();
        const exported={base:localPrjDir.path(),data:{}};
        for (var k in n2files) {
            const f=n2files[k];
            exported.data[f.relPath(localPrjDir)]=f.text();
        }
        const opt=this.prj.getOptionsFile();
        exported.data[opt.relPath(localPrjDir)]=opt.text();
        console.log("exported",exported);
        return exported;
    }
    async init() {
        if (this.inited) return;
        const fileMap=this.fileMap;
        const localPrjDir=this.getDir();
        const files=this.exportFiles();
        const ns2depspec=this.config.worker.ns2depspec;
        const {prjDir:remotePrjDir}=await this.w.run("compiler/init",{
            namespace:this.prj.getNamespace(),
            files, ns2depspec, locale: this.config.locale
        });
        fileMap.add({local:localPrjDir, remote: remotePrjDir});
        const deps=this.prj.getDependingProjects();//TODO recursive
        for (let dep of deps) {
            const ns=dep.getNamespace();
            if (!ns2depspec[ns]) {
                const localPrjDir=dep.getDir();
                const files=localPrjDir.exportAsObject({
                    excludesF: f=>f.ext()!==".tonyu" && f.name()!=="options.json"
                });
                const {prjDir:remotePrjDir}=await this.w.run("compiler/addDependingProject",{
                    namespace:ns, files
                });
                fileMap.add({local:localPrjDir, remote: remotePrjDir});
            }
        }
        this.inited=true;
    }
    resetFiles() {
        if (!this.inited) return this.init();
        const files=this.exportFiles();
        return this.w.run("compiler/resetFiles",{
            //namespace:this.prj.getNamespace(),
            files
        });
    }
    async parse(f,content=false){// use content when check not-yet-saved file
        if (content===false) content=f.text();
        await this.init();
        const filePath=f.relPath(this.getDir());
        const files={};
        files[filePath]=content;
        return await this.w.run("compiler/parse", {files});
    }
    async clean() {// Stands for eclipse "Clean" menu.
        await this.resetFiles();
        return await this.fullCompile();
    }
    async fullCompile() {
        try {
            this.partialCompilable=false;
            await this.init();
            const compres=await this.w.run("compiler/fullCompile");
            console.log(compres);
            const sf=SourceFiles.add(compres);
            await sf.saveAs(this.getOutputFile());
            await this.exec(compres);
            this.partialCompilable=true;
            return compres;
        } catch(e) {
            throw this.convertError(e);
        }
    }
    async partialCompile(f) {
        if (!this.partialCompilable) {
            return await this.clean();
        }
        try {
            const files={};files[f.relPath(this.getDir())]=f.text();
            await this.init();
            const compres=await this.w.run("compiler/postChange",{files});
            console.log(compres);
            await this.exec(compres);
            return compres;
        } catch(e) {
            throw this.convertError(e);
        }
    }
    async renameClassName(from,to) {
        try {
            await this.init();
            let changed=await this.w.run("compiler/renameClassName",{from,to});
            for (let n in changed) {
                let val=changed[n];
                n=this.convertFromWorkerPath(n);
                if (val==null) {
                    FS.get(n).rm();
                } else {
                    FS.get(n).text(val);
                }
            }
            return changed;
        } catch(e) {
            throw this.convertError(e);
        }
    }
    convertError(e) {
        if (e.isTError) {
            try {
                e.src=FS.get(this.convertFromWorkerPath(e.src));
            } catch(ee) {
                console.log(ee);
            }
        }
        return e;
    }
    async run() {
        await this.init();
        await this.fullCompile();
        this.getDir().watch(async (e,f)=>{
            console.log(e,f.path());
            if (f.ext()===".tonyu") {
                const nsraw=await this.partialCompile(f);
                if (this.config.onCompiled) this.config.onCompiled(nsraw);

                //if (root.Tonyu.globals.$restart) root.Tonyu.globals.$restart();
            }
        });
    }
}
BuilderClient.SourceFiles=SourceFiles;
//root.TonyuBuilderClient=BuilderClient;
module.exports=BuilderClient;

},{"../lang/SourceFiles":4,"../lib/FileMap":9,"../lib/WorkerServiceB":10,"../lib/root":11}],2:[function(require,module,exports){
// Add extra libraries for Tonyu System IDE
//const root=require("../lib/root");
const BuilderClient=require("./BuilderClient");

const SourceFiles=require("../lang/SourceFiles");
const ProjectFactory=require("../project/ProjectFactory");
const CompiledProject=require("../project/CompiledProject");
const langMod=require("../lang/langMod");
const StackDecoder=require("../lang/StackDecoder");
const SourceMap=require("../lang/source-map");
const DebuggerCore=require("../browser/DebuggerCore");
BuilderClient.SourceFiles=SourceFiles;
BuilderClient.ProjectFactory=ProjectFactory;
BuilderClient.CompiledProject=CompiledProject;
BuilderClient.langMod=langMod;
BuilderClient.StackDecoder=StackDecoder;
BuilderClient.SourceMap=SourceMap;
BuilderClient.DebuggerCore=DebuggerCore;
module.exports=BuilderClient;
//root.TonyuBuilderClient=BuilderClient;

},{"../browser/DebuggerCore":3,"../lang/SourceFiles":4,"../lang/StackDecoder":5,"../lang/langMod":6,"../lang/source-map":7,"../project/CompiledProject":12,"../project/ProjectFactory":13,"./BuilderClient":1}],3:[function(require,module,exports){
//define(function (require,exports,module) {
// module.exports:: DI_container -> Debugger
const SourceFiles=require("../lang/SourceFiles");
//const ProjectFactory=require("../project/ProjectFactory");
const CompiledProject=require("../project/CompiledProject");
const langMod=require("../lang/langMod");
const StackDecoder=require("../lang/StackDecoder");
const root=require("../lib/root");
module.exports=function ({
    //-- Bundled in BuilderClient4Sys
    /*SourceFiles,
    ProjectFactory:F,
    CompiledProject:CP,
    langMod,
    StackDecoder,*/
    //--
    Tonyu,
}) {//------
if (root.Debugger) return root.Debugger;
const Events={
    handlers:{},
    getHandler(t) {
        this.handlers[t]=this.handlers[t]||[];
        return this.handlers[t];
    },
    fire(type,evt) {
        try {
            this.getHandler(type).forEach(f=>f(evt));
        } catch(e) {
            if (!evt || !evt.noCatch) Tonyu.onRuntimeError(e);
        }
    },
    on(type,...args) {
        const f=args.pop();
        this.getHandler(type).push(f);
    }
};
root.Debugger={
    setErrorHandler: function () {
        Tonyu.onRuntimeError=async e=>{
            console.error(e);
            const stack=await StackDecoder.decode(e);
            const evt={error:e, message:e.message,stack,noCatch:true};
            Events.fire("runtimeError",evt);
        };
    },
    init: async function (prj) {
        //Tonyu=Tonyu||_Tonyu;
        this.setErrorHandler();
        Tonyu.globals.$currentProject=prj;
        Tonyu.currentProject=prj;
        Tonyu.globals.$debugger=root.Debugger;
        await prj.loadClasses();
        console.log("Loading classes COMPLETE",Tonyu.ID,Tonyu.classes);
    },
    exec: async function (srcraw) {
        await SourceFiles.add(srcraw).exec();
        Events.fire("classChanged");
    },
    create: function (className) {
        try {
            const klass=Tonyu.getClass(className);
            return new klass();
        }catch(e) {
            Tonyu.onRuntimeError(e);
            //console.error(e);
            //StackDecoder.decode(e);
        }
    },
    on:Events.on.bind(Events),
    fire:Events.fire.bind(Events)
};
try {
    //if (root.parent && root.parent.onTonyuDebuggerReady) <- fails CORS
    root.parent.onTonyuDebuggerReady(root.Debugger);
} catch(e) {
    console.log(e);
}
return root.Debugger;
};//--------
//});//--- end of define

},{"../lang/SourceFiles":4,"../lang/StackDecoder":5,"../lang/langMod":6,"../lib/root":11,"../project/CompiledProject":12}],4:[function(require,module,exports){
//define(function (require,exports,module) {
/*const root=require("root");*/
const root=require("../lib/root");
function timeout(t) {
    return new Promise(s=>setTimeout(s,t));
}
let vm;
/*global global*/
if (typeof global!=="undefined" && global.require && global.require.name!=="requirejs") {
    vm=global.require("vm");
}
class SourceFile {
    // var text, sourceMap:S.Sourcemap;
    constructor(text, sourceMap) {
        if (typeof text==="object") {
            const params=text;
            sourceMap=params.sourceMap;
            //functions=params.functions;
            text=params.text;
            if (params.url) {
                this.url=params.url;
            }
        }
        this.text=text;
        this.sourceMap=sourceMap && sourceMap.toString();
        //this.functions=functions;
    }
    async saveAs(outf) {
        const mapFile=outf.sibling(outf.name()+".map");
        let text=this.text;
        //text+="\n//# traceFunctions="+JSON.stringify(this.functions);
        if (this.sourceMap) {
            await mapFile.text(this.sourceMap);
            text+="\n//# sourceMappingURL="+mapFile.name();
        }
        await outf.text(text);
        //return Promise.resolve();
    }
    exec(options) {
        return new Promise((resolve, reject)=>{
            if (root.window) {
                const document=root.document;
                let u;
                if (this.url) {
                    u=this.url;
                } else {
                    const b=new root.Blob([this.text], {type: 'text/plain'});
                    u=root.URL.createObjectURL(b);
                }
                const s=document.createElement("script");
                console.log("load script",u);
                s.setAttribute("src",u);
                s.addEventListener("load",e=>{
                    resolve(e);
                });
                this.parent.url2SourceFile[u]=this;
                document.body.appendChild(s);
            } else if (options && options.tmpdir){
                const tmpdir=options.tmpdir;
                const uniqFile=tmpdir.rel(Math.random()+".js");
                const mapFile=uniqFile.sibling(uniqFile.name()+".map");
                let text=this.text;
                text+="\n//# sourceMappingURL="+mapFile.name();
                uniqFile.text(text);
                mapFile.text(this.sourceMap);
                //console.log("EX",uniqFile.exists());
                require(uniqFile.path());
                uniqFile.rm();
                mapFile.rm();
                resolve();
            } else if (root.importScripts && this.url){
                root.importScripts(this.url);
                resolve();
            } else {
                const F=Function;
                const f=(vm? vm.compileFunction(this.text) : new F(this.text));
                resolve(f());
            }
        });
    }
    export() {
        return {text:this.text, sourceMap:this.sourceMap, functions:this.functions};
    }
}
class SourceFiles {
    constructor() {
        this.url2SourceFile={};
    }
    add(text, sourceMap) {
        const sourceFile=new SourceFile(text, sourceMap);
        /*if (sourceFile.functions) for (let k in sourceFile.functions) {
            this.functions[k]=sourceFile;
        }*/
        sourceFile.parent=this;
        return sourceFile;
    }

}
module.exports=new SourceFiles();
//});/*--end of define--*/

},{"../lib/root":11}],5:[function(require,module,exports){
const S=require("./source-map");
const StackTrace=require("./stacktrace");
const SourceFiles=require("./SourceFiles");
module.exports={
    async decode(e) {
        try{
            const tr=await StackTrace.fromError(e,{offline:true});
            tr.forEach(t=>{
                try {
                    const sf=SourceFiles.url2SourceFile[t.fileName];
                    //console.log("sf", t.fileName, sf, SourceFiles.url2SourceFile);
                    if (sf) {
                        const opt={
                            line: t.lineNumber, column:t.columnNumber,
                            bias:S.SourceMapConsumer.GREATEST_LOWER_BOUND
                        };
                        const pos=this.originalPositionFor(sf,opt);
                        console.log("pos",opt,pos);
                        if (pos.source) t.fileName=pos.source;
                        if (pos.line) t.lineNumber=pos.line;
                        if (pos.column) t.columnNumber=pos.column;
                    }
                }catch(ex) {
                    console.log("Sourcemap error",ex);
                }
            });
            console.log("Converted: ",tr);
            return tr;
        } catch(ex) {
            console.log("StackTrace error",ex);
            if (!e || !e.stack) {
                console.log("HennaError",e);
                return [];
            }
            return e.stack.split("\n");
        }
    },
    originalPositionFor(sf,opt) {
        const s=this.getSourceMapConsumer(sf);
        if (!s) return opt;
        return s.originalPositionFor(opt);
    },
    getSourceMapConsumer(sf) {
        if (sf.sourceMapConsumer) return sf.sourceMapConsumer;
        sf.sourceMapConsumer=new S.SourceMapConsumer(JSON.parse(sf.sourceMap));
        //console.log(this.sourceMapConsumer);
        return sf.sourceMapConsumer;
    }
};

},{"./SourceFiles":4,"./source-map":7,"./stacktrace":8}],6:[function(require,module,exports){
    module.exports={
        getNamespace: function () {//override
            var opt=this.getOptions();
            if (opt.compiler && opt.compiler.namespace) return opt.compiler.namespace;
            throw new Error("Namespace is not set");
        },
        async loadDependingClasses() {
            const myNsp=this.getNamespace();
            for (let p of this.getDependingProjects()) {
                if (p.getNamespace()===myNsp) continue;
                await p.loadClasses();
            }
        },
        getEXT() {return ".tonyu";}
        // loadClasses: stub
    };

},{}],7:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("source-map",[], factory);
	else if(typeof exports === 'object')
		exports["sourceMap"] = factory();
	else
		root["sourceMap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	* Copyright 2009-2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE.txt or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/
	exports.SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
	exports.SourceMapConsumer = __webpack_require__(7).SourceMapConsumer;
	exports.SourceNode = __webpack_require__(10).SourceNode;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var base64VLQ = __webpack_require__(2);
	var util = __webpack_require__(4);
	var ArraySet = __webpack_require__(5).ArraySet;
	var MappingList = __webpack_require__(6).MappingList;

	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) {
		aArgs = {};
		}
		this._file = util.getArg(aArgs, 'file', null);
		this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
		this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}

	SourceMapGenerator.prototype._version = 3;

	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap =
		function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator({
			file: aSourceMapConsumer.file,
			sourceRoot: sourceRoot
		});
		aSourceMapConsumer.eachMapping(function (mapping) {
			var newMapping = {
			generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			}
			};

			if (mapping.source != null) {
			newMapping.source = mapping.source;
			if (sourceRoot != null) {
				newMapping.source = util.relative(sourceRoot, newMapping.source);
			}

			newMapping.original = {
				line: mapping.originalLine,
				column: mapping.originalColumn
			};

			if (mapping.name != null) {
				newMapping.name = mapping.name;
			}
			}

			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			generator.setSourceContent(sourceFile, content);
			}
		});
		return generator;
		};

	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping =
		function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, 'generated');
		var original = util.getArg(aArgs, 'original', null);
		var source = util.getArg(aArgs, 'source', null);
		var name = util.getArg(aArgs, 'name', null);

		if (!this._skipValidation) {
			this._validateMapping(generated, original, source, name);
		}

		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) {
			this._sources.add(source);
			}
		}

		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) {
			this._names.add(name);
			}
		}

		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source: source,
			name: name
		});
		};

	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent =
		function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) {
			source = util.relative(this._sourceRoot, source);
		}

		if (aSourceContent != null) {
			// Add the source content to the _sourcesContents map.
			// Create a new _sourcesContents map if the property is null.
			if (!this._sourcesContents) {
			this._sourcesContents = Object.create(null);
			}
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			// Remove the source file from the _sourcesContents map.
			// If the _sourcesContents map is empty, set the property to null.
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) {
			this._sourcesContents = null;
			}
		}
		};

	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap =
		function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		// If aSourceFile is omitted, we will use the file property of the SourceMap
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) {
			throw new Error(
				'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
				'or the source map\'s "file" property. Both were omitted.'
			);
			}
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		// Make "sourceFile" relative if an absolute Url is passed.
		if (sourceRoot != null) {
			sourceFile = util.relative(sourceRoot, sourceFile);
		}
		// Applying the SourceMap can add and remove items from the sources and
		// the names array.
		var newSources = new ArraySet();
		var newNames = new ArraySet();

		// Find mappings for the "sourceFile"
		this._mappings.unsortedForEach(function (mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
			// Check if it can be mapped by the source map, then update the mapping.
			var original = aSourceMapConsumer.originalPositionFor({
				line: mapping.originalLine,
				column: mapping.originalColumn
			});
			if (original.source != null) {
				// Copy mapping
				mapping.source = original.source;
				if (aSourceMapPath != null) {
				mapping.source = util.join(aSourceMapPath, mapping.source)
				}
				if (sourceRoot != null) {
				mapping.source = util.relative(sourceRoot, mapping.source);
				}
				mapping.originalLine = original.line;
				mapping.originalColumn = original.column;
				if (original.name != null) {
				mapping.name = original.name;
				}
			}
			}

			var source = mapping.source;
			if (source != null && !newSources.has(source)) {
			newSources.add(source);
			}

			var name = mapping.name;
			if (name != null && !newNames.has(name)) {
			newNames.add(name);
			}

		}, this);
		this._sources = newSources;
		this._names = newNames;

		// Copy sourcesContents of applied map.
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			if (aSourceMapPath != null) {
				sourceFile = util.join(aSourceMapPath, sourceFile);
			}
			if (sourceRoot != null) {
				sourceFile = util.relative(sourceRoot, sourceFile);
			}
			this.setSourceContent(sourceFile, content);
			}
		}, this);
		};

	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping =
		function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
													aName) {
		if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
			&& aGenerated.line > 0 && aGenerated.column >= 0
			&& !aOriginal && !aSource && !aName) {
			// Case 1.
			return;
		}
		else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
				&& aOriginal && 'line' in aOriginal && 'column' in aOriginal
				&& aGenerated.line > 0 && aGenerated.column >= 0
				&& aOriginal.line > 0 && aOriginal.column >= 0
				&& aSource) {
			// Cases 2 and 3.
			return;
		}
		else {
			throw new Error('Invalid mapping: ' + JSON.stringify({
			generated: aGenerated,
			source: aSource,
			original: aOriginal,
			name: aName
			}));
		}
		};

	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings =
		function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = '';
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;

		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = ''

			if (mapping.generatedLine !== previousGeneratedLine) {
			previousGeneratedColumn = 0;
			while (mapping.generatedLine !== previousGeneratedLine) {
				next += ';';
				previousGeneratedLine++;
			}
			}
			else {
			if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
				continue;
				}
				next += ',';
			}
			}

			next += base64VLQ.encode(mapping.generatedColumn
									- previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;

			if (mapping.source != null) {
			sourceIdx = this._sources.indexOf(mapping.source);
			next += base64VLQ.encode(sourceIdx - previousSource);
			previousSource = sourceIdx;

			// lines are stored 0-based in SourceMap spec version 3
			next += base64VLQ.encode(mapping.originalLine - 1
										- previousOriginalLine);
			previousOriginalLine = mapping.originalLine - 1;

			next += base64VLQ.encode(mapping.originalColumn
										- previousOriginalColumn);
			previousOriginalColumn = mapping.originalColumn;

			if (mapping.name != null) {
				nameIdx = this._names.indexOf(mapping.name);
				next += base64VLQ.encode(nameIdx - previousName);
				previousName = nameIdx;
			}
			}

			result += next;
		}

		return result;
		};

	SourceMapGenerator.prototype._generateSourcesContent =
		function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function (source) {
			if (!this._sourcesContents) {
			return null;
			}
			if (aSourceRoot != null) {
			source = util.relative(aSourceRoot, source);
			}
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
			? this._sourcesContents[key]
			: null;
		}, this);
		};

	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON =
		function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) {
			map.file = this._file;
		}
		if (this._sourceRoot != null) {
			map.sourceRoot = this._sourceRoot;
		}
		if (this._sourcesContents) {
			map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		}

		return map;
		};

	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString =
		function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
		};

	exports.SourceMapGenerator = SourceMapGenerator;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*
	* Based on the Base 64 VLQ implementation in Closure Compiler:
	* https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	*
	* Copyright 2011 The Closure Compiler Authors. All rights reserved.
	* Redistribution and use in source and binary forms, with or without
	* modification, are permitted provided that the following conditions are
	* met:
	*
	*  * Redistributions of source code must retain the above copyright
	*    notice, this list of conditions and the following disclaimer.
	*  * Redistributions in binary form must reproduce the above
	*    copyright notice, this list of conditions and the following
	*    disclaimer in the documentation and/or other materials provided
	*    with the distribution.
	*  * Neither the name of Google Inc. nor the names of its
	*    contributors may be used to endorse or promote products derived
	*    from this software without specific prior written permission.
	*
	* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	var base64 = __webpack_require__(3);

	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	var VLQ_BASE_SHIFT = 5;

	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0
		? ((-aValue) << 1) + 1
		: (aValue << 1) + 0;
	}

	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative
		? -shifted
		: shifted;
	}

	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;

		var vlq = toVLQSigned(aValue);

		do {
		digit = vlq & VLQ_BASE_MASK;
		vlq >>>= VLQ_BASE_SHIFT;
		if (vlq > 0) {
			// There are still more digits in this value, so we must make sure the
			// continuation bit is marked.
			digit |= VLQ_CONTINUATION_BIT;
		}
		encoded += base64.encode(digit);
		} while (vlq > 0);

		return encoded;
	};

	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;

		do {
		if (aIndex >= strLen) {
			throw new Error("Expected more digits in base 64 VLQ value.");
		}

		digit = base64.decode(aStr.charCodeAt(aIndex++));
		if (digit === -1) {
			throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
		}

		continuation = !!(digit & VLQ_CONTINUATION_BIT);
		digit &= VLQ_BASE_MASK;
		result = result + (digit << shift);
		shift += VLQ_BASE_SHIFT;
		} while (continuation);

		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function (number) {
		if (0 <= number && number < intToCharMap.length) {
		return intToCharMap[number];
		}
		throw new TypeError("Must be between 0 and 63: " + number);
	};

	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function (charCode) {
		var bigA = 65;     // 'A'
		var bigZ = 90;     // 'Z'

		var littleA = 97;  // 'a'
		var littleZ = 122; // 'z'

		var zero = 48;     // '0'
		var nine = 57;     // '9'

		var plus = 43;     // '+'
		var slash = 47;    // '/'

		var littleOffset = 26;
		var numberOffset = 52;

		// 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
		if (bigA <= charCode && charCode <= bigZ) {
		return (charCode - bigA);
		}

		// 26 - 51: abcdefghijklmnopqrstuvwxyz
		if (littleA <= charCode && charCode <= littleZ) {
		return (charCode - littleA + littleOffset);
		}

		// 52 - 61: 0123456789
		if (zero <= charCode && charCode <= nine) {
		return (charCode - zero + numberOffset);
		}

		// 62: +
		if (charCode == plus) {
		return 62;
		}

		// 63: /
		if (charCode == slash) {
		return 63;
		}

		// Invalid base64 digit.
		return -1;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) {
		return aArgs[aName];
		} else if (arguments.length === 3) {
		return aDefaultValue;
		} else {
		throw new Error('"' + aName + '" is a required argument.');
		}
	}
	exports.getArg = getArg;

	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) {
		return null;
		}
		return {
		scheme: match[1],
		auth: match[2],
		host: match[3],
		port: match[4],
		path: match[5]
		};
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
		var url = '';
		if (aParsedUrl.scheme) {
		url += aParsedUrl.scheme + ':';
		}
		url += '//';
		if (aParsedUrl.auth) {
		url += aParsedUrl.auth + '@';
		}
		if (aParsedUrl.host) {
		url += aParsedUrl.host;
		}
		if (aParsedUrl.port) {
		url += ":" + aParsedUrl.port
		}
		if (aParsedUrl.path) {
		url += aParsedUrl.path;
		}
		return url;
	}
	exports.urlGenerate = urlGenerate;

	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consequtive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
		if (!url.path) {
			return aPath;
		}
		path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);

		var parts = path.split(/\/+/);
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
		part = parts[i];
		if (part === '.') {
			parts.splice(i, 1);
		} else if (part === '..') {
			up++;
		} else if (up > 0) {
			if (part === '') {
			// The first part is blank if the path is absolute. Trying to go
			// above the root is a no-op. Therefore we can remove all '..' parts
			// directly after the root.
			parts.splice(i + 1, up);
			up = 0;
			} else {
			parts.splice(i, 2);
			up--;
			}
		}
		}
		path = parts.join('/');

		if (path === '') {
		path = isAbsolute ? '/' : '.';
		}

		if (url) {
		url.path = path;
		return urlGenerate(url);
		}
		return path;
	}
	exports.normalize = normalize;

	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") {
		aRoot = ".";
		}
		if (aPath === "") {
		aPath = ".";
		}
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) {
		aRoot = aRootUrl.path || '/';
		}

		// `join(foo, '//www.example.org')`
		if (aPathUrl && !aPathUrl.scheme) {
		if (aRootUrl) {
			aPathUrl.scheme = aRootUrl.scheme;
		}
		return urlGenerate(aPathUrl);
		}

		if (aPathUrl || aPath.match(dataUrlRegexp)) {
		return aPath;
		}

		// `join('http://', 'www.example.com')`
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
		aRootUrl.host = aPath;
		return urlGenerate(aRootUrl);
		}

		var joined = aPath.charAt(0) === '/'
		? aPath
		: normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

		if (aRootUrl) {
		aRootUrl.path = joined;
		return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
		return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
	};

	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") {
		aRoot = ".";
		}

		aRoot = aRoot.replace(/\/$/, '');

		// It is possible for the path to be above the root. In this case, simply
		// checking whether the root is a prefix of the path won't work. Instead, we
		// need to remove components from the root one by one, until either we find
		// a prefix that fits, or we run out of components to remove.
		var level = 0;
		while (aPath.indexOf(aRoot + '/') !== 0) {
		var index = aRoot.lastIndexOf("/");
		if (index < 0) {
			return aPath;
		}

		// If the only part of the root that is left is the scheme (i.e. http://,
		// file:///, etc.), one or more slashes (/), or simply nothing at all, we
		// have exhausted all components, so the path is not relative to the root.
		aRoot = aRoot.slice(0, index);
		if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
			return aPath;
		}

		++level;
		}

		// Make sure we add a "../" for each component we removed from the root.
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;

	var supportsNullProto = (function () {
		var obj = Object.create(null);
		return !('__proto__' in obj);
	}());

	function identity (s) {
		return s;
	}

	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) {
		return '$' + aStr;
		}

		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
		if (isProtoString(aStr)) {
		return aStr.slice(1);
		}

		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
		if (!s) {
		return false;
		}

		var length = s.length;

		if (length < 9 /* "__proto__".length */) {
		return false;
		}

		if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
			s.charCodeAt(length - 2) !== 95  /* '_' */ ||
			s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
			s.charCodeAt(length - 4) !== 116 /* 't' */ ||
			s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
			s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
			s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
			s.charCodeAt(length - 8) !== 95  /* '_' */ ||
			s.charCodeAt(length - 9) !== 95  /* '_' */) {
		return false;
		}

		for (var i = length - 10; i >= 0; i--) {
		if (s.charCodeAt(i) !== 36 /* '$' */) {
			return false;
		}
		}

		return true;
	}

	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.source - mappingB.source;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		return mappingA.name - mappingB.name;
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) {
		return cmp;
		}

		cmp = mappingA.source - mappingB.source;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) {
		return cmp;
		}

		return mappingA.name - mappingB.name;
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) {
		return 0;
		}

		if (aStr1 > aStr2) {
		return 1;
		}

		return -1;
	}

	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) {
		return cmp;
		}

		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);
	var has = Object.prototype.hasOwnProperty;

	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = Object.create(null);
	}

	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) {
		set.add(aArray[i], aAllowDuplicates);
		}
		return set;
	};

	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return Object.getOwnPropertyNames(this._set).length;
	};

	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = util.toSetString(aStr);
		var isDuplicate = has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) {
		this._array.push(aStr);
		}
		if (!isDuplicate) {
		this._set[sStr] = idx;
		}
	};

	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		var sStr = util.toSetString(aStr);
		return has.call(this._set, sStr);
	};

	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		var sStr = util.toSetString(aStr);
		if (has.call(this._set, sStr)) {
		return this._set[sStr];
		}
		throw new Error('"' + aStr + '" is not in the set.');
	};

	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) {
		return this._array[aIdx];
		}
		throw new Error('No element indexed by ' + aIdx);
	};

	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};

	exports.ArraySet = ArraySet;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2014 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);

	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		// Optimized for most common case
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA ||
			util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}

	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		// Serves as infimum
		this._last = {generatedLine: -1, generatedColumn: 0};
	}

	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach =
		function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
		};

	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
		this._last = aMapping;
		this._array.push(aMapping);
		} else {
		this._sorted = false;
		this._array.push(aMapping);
		}
	};

	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
		this._array.sort(util.compareByGeneratedPositionsInflated);
		this._sorted = true;
		}
		return this._array;
	};

	exports.MappingList = MappingList;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);
	var binarySearch = __webpack_require__(8);
	var ArraySet = __webpack_require__(5).ArraySet;
	var base64VLQ = __webpack_require__(2);
	var quickSort = __webpack_require__(9).quickSort;

	function SourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		return sourceMap.sections != null
		? new IndexedSourceMapConsumer(sourceMap)
		: new BasicSourceMapConsumer(sourceMap);
	}

	SourceMapConsumer.fromSourceMap = function(aSourceMap) {
		return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
	}

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	SourceMapConsumer.prototype._version = 3;

	// `__generatedMappings` and `__originalMappings` are arrays that hold the
	// parsed mapping coordinates from the source map's "mappings" attribute. They
	// are lazily instantiated, accessed via the `_generatedMappings` and
	// `_originalMappings` getters respectively, and we only parse the mappings
	// and create these arrays once queried for a source location. We jump through
	// these hoops because there can be many thousands of mappings, and parsing
	// them is expensive, so we only want to do it if we must.
	//
	// Each object in the arrays is of the form:
	//
	//     {
	//       generatedLine: The line number in the generated code,
	//       generatedColumn: The column number in the generated code,
	//       source: The path to the original source file that generated this
	//               chunk of code,
	//       originalLine: The line number in the original source that
	//                     corresponds to this chunk of generated code,
	//       originalColumn: The column number in the original source that
	//                       corresponds to this chunk of generated code,
	//       name: The name of the original symbol which generated this chunk of
	//             code.
	//     }
	//
	// All properties except for `generatedLine` and `generatedColumn` can be
	// `null`.
	//
	// `_generatedMappings` is ordered by the generated positions.
	//
	// `_originalMappings` is ordered by the original positions.

	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
		get: function () {
		if (!this.__generatedMappings) {
			this._parseMappings(this._mappings, this.sourceRoot);
		}

		return this.__generatedMappings;
		}
	});

	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
		get: function () {
		if (!this.__originalMappings) {
			this._parseMappings(this._mappings, this.sourceRoot);
		}

		return this.__originalMappings;
		}
	});

	SourceMapConsumer.prototype._charIsMappingSeparator =
		function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		var c = aStr.charAt(index);
		return c === ";" || c === ",";
		};

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	SourceMapConsumer.prototype._parseMappings =
		function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		throw new Error("Subclasses must implement _parseMappings");
		};

	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;

	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

	/**
	* Iterate over each mapping between an original source/line/column and a
	* generated line/column in this source map.
	*
	* @param Function aCallback
	*        The function that is called with each mapping.
	* @param Object aContext
	*        Optional. If specified, this object will be the value of `this` every
	*        time that `aCallback` is called.
	* @param aOrder
	*        Either `SourceMapConsumer.GENERATED_ORDER` or
	*        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	*        iterate over the mappings sorted by the generated file's line/column
	*        order or the original's source/line/column order, respectively. Defaults to
	*        `SourceMapConsumer.GENERATED_ORDER`.
	*/
	SourceMapConsumer.prototype.eachMapping =
		function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		var context = aContext || null;
		var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

		var mappings;
		switch (order) {
		case SourceMapConsumer.GENERATED_ORDER:
			mappings = this._generatedMappings;
			break;
		case SourceMapConsumer.ORIGINAL_ORDER:
			mappings = this._originalMappings;
			break;
		default:
			throw new Error("Unknown order of iteration.");
		}

		var sourceRoot = this.sourceRoot;
		mappings.map(function (mapping) {
			var source = mapping.source === null ? null : this._sources.at(mapping.source);
			if (source != null && sourceRoot != null) {
			source = util.join(sourceRoot, source);
			}
			return {
			source: source,
			generatedLine: mapping.generatedLine,
			generatedColumn: mapping.generatedColumn,
			originalLine: mapping.originalLine,
			originalColumn: mapping.originalColumn,
			name: mapping.name === null ? null : this._names.at(mapping.name)
			};
		}, this).forEach(aCallback, context);
		};

	/**
	* Returns all generated line and column information for the original source,
	* line, and column provided. If no column is provided, returns all mappings
	* corresponding to a either the line we are searching for or the next
	* closest line that has any mappings. Otherwise, returns all mappings
	* corresponding to the given line and either the column we are searching for
	* or the next closest column that has any offsets.
	*
	* The only argument is an object with the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: Optional. the column number in the original source.
	*
	* and an array of objects is returned, each with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	SourceMapConsumer.prototype.allGeneratedPositionsFor =
		function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		var line = util.getArg(aArgs, 'line');

		// When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
		// returns the index of the closest mapping less than the needle. By
		// setting needle.originalColumn to 0, we thus find the last mapping for
		// the given line, provided such a mapping exists.
		var needle = {
			source: util.getArg(aArgs, 'source'),
			originalLine: line,
			originalColumn: util.getArg(aArgs, 'column', 0)
		};

		if (this.sourceRoot != null) {
			needle.source = util.relative(this.sourceRoot, needle.source);
		}
		if (!this._sources.has(needle.source)) {
			return [];
		}
		needle.source = this._sources.indexOf(needle.source);

		var mappings = [];

		var index = this._findMapping(needle,
										this._originalMappings,
										"originalLine",
										"originalColumn",
										util.compareByOriginalPositions,
										binarySearch.LEAST_UPPER_BOUND);
		if (index >= 0) {
			var mapping = this._originalMappings[index];

			if (aArgs.column === undefined) {
			var originalLine = mapping.originalLine;

			// Iterate until either we run out of mappings, or we run into
			// a mapping for a different line than the one we found. Since
			// mappings are sorted, this is guaranteed to find all mappings for
			// the line we found.
			while (mapping && mapping.originalLine === originalLine) {
				mappings.push({
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
				});

				mapping = this._originalMappings[++index];
			}
			} else {
			var originalColumn = mapping.originalColumn;

			// Iterate until either we run out of mappings, or we run into
			// a mapping for a different line than the one we were searching for.
			// Since mappings are sorted, this is guaranteed to find all mappings for
			// the line we are searching for.
			while (mapping &&
					mapping.originalLine === line &&
					mapping.originalColumn == originalColumn) {
				mappings.push({
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
				});

				mapping = this._originalMappings[++index];
			}
			}
		}

		return mappings;
		};

	exports.SourceMapConsumer = SourceMapConsumer;

	/**
	* A BasicSourceMapConsumer instance represents a parsed source map which we can
	* query for information about the original file positions by giving it a file
	* position in the generated source.
	*
	* The only parameter is the raw source map (either as a JSON string, or
	* already parsed to an object). According to the spec, source maps have the
	* following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - sources: An array of URLs to the original source files.
	*   - names: An array of identifiers which can be referrenced by individual mappings.
	*   - sourceRoot: Optional. The URL root from which all sources are relative.
	*   - sourcesContent: Optional. An array of contents of the original source files.
	*   - mappings: A string of base64 VLQs which contain the actual mappings.
	*   - file: Optional. The generated file this source map is associated with.
	*
	* Here is an example source map, taken from the source map spec[0]:
	*
	*     {
	*       version : 3,
	*       file: "out.js",
	*       sourceRoot : "",
	*       sources: ["foo.js", "bar.js"],
	*       names: ["src", "maps", "are", "fun"],
	*       mappings: "AA,AB;;ABCDE;"
	*     }
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	*/
	function BasicSourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		var version = util.getArg(sourceMap, 'version');
		var sources = util.getArg(sourceMap, 'sources');
		// Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
		// requires the array) to play nice here.
		var names = util.getArg(sourceMap, 'names', []);
		var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
		var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
		var mappings = util.getArg(sourceMap, 'mappings');
		var file = util.getArg(sourceMap, 'file', null);

		// Once again, Sass deviates from the spec and supplies the version as a
		// string rather than a number, so we use loose equality checking here.
		if (version != this._version) {
		throw new Error('Unsupported version: ' + version);
		}

		sources = sources
		.map(String)
		// Some source maps produce relative source paths like "./foo.js" instead of
		// "foo.js".  Normalize these first so that future comparisons will succeed.
		// See bugzil.la/1090768.
		.map(util.normalize)
		// Always ensure that absolute sources are internally stored relative to
		// the source root, if the source root is absolute. Not doing this would
		// be particularly problematic when the source root is a prefix of the
		// source (valid, but why??). See github issue #199 and bugzil.la/1188982.
		.map(function (source) {
			return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
			? util.relative(sourceRoot, source)
			: source;
		});

		// Pass `true` below to allow duplicate names and sources. While source maps
		// are intended to be compressed and deduplicated, the TypeScript compiler
		// sometimes generates source maps with duplicates in them. See Github issue
		// #72 and bugzil.la/889492.
		this._names = ArraySet.fromArray(names.map(String), true);
		this._sources = ArraySet.fromArray(sources, true);

		this.sourceRoot = sourceRoot;
		this.sourcesContent = sourcesContent;
		this._mappings = mappings;
		this.file = file;
	}

	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

	/**
	* Create a BasicSourceMapConsumer from a SourceMapGenerator.
	*
	* @param SourceMapGenerator aSourceMap
	*        The source map that will be consumed.
	* @returns BasicSourceMapConsumer
	*/
	BasicSourceMapConsumer.fromSourceMap =
		function SourceMapConsumer_fromSourceMap(aSourceMap) {
		var smc = Object.create(BasicSourceMapConsumer.prototype);

		var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		smc.sourceRoot = aSourceMap._sourceRoot;
		smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
																smc.sourceRoot);
		smc.file = aSourceMap._file;

		// Because we are modifying the entries (by converting string sources and
		// names to indices into the sources and names ArraySets), we have to make
		// a copy of the entry or else bad things happen. Shared mutable state
		// strikes again! See github issue #191.

		var generatedMappings = aSourceMap._mappings.toArray().slice();
		var destGeneratedMappings = smc.__generatedMappings = [];
		var destOriginalMappings = smc.__originalMappings = [];

		for (var i = 0, length = generatedMappings.length; i < length; i++) {
			var srcMapping = generatedMappings[i];
			var destMapping = new Mapping;
			destMapping.generatedLine = srcMapping.generatedLine;
			destMapping.generatedColumn = srcMapping.generatedColumn;

			if (srcMapping.source) {
			destMapping.source = sources.indexOf(srcMapping.source);
			destMapping.originalLine = srcMapping.originalLine;
			destMapping.originalColumn = srcMapping.originalColumn;

			if (srcMapping.name) {
				destMapping.name = names.indexOf(srcMapping.name);
			}

			destOriginalMappings.push(destMapping);
			}

			destGeneratedMappings.push(destMapping);
		}

		quickSort(smc.__originalMappings, util.compareByOriginalPositions);

		return smc;
		};

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	BasicSourceMapConsumer.prototype._version = 3;

	/**
	* The list of original sources.
	*/
	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
		get: function () {
		return this._sources.toArray().map(function (s) {
			return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
		}, this);
		}
	});

	/**
	* Provide the JIT with a nice shape / hidden class.
	*/
	function Mapping() {
		this.generatedLine = 0;
		this.generatedColumn = 0;
		this.source = null;
		this.originalLine = null;
		this.originalColumn = null;
		this.name = null;
	}

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	BasicSourceMapConsumer.prototype._parseMappings =
		function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		var generatedLine = 1;
		var previousGeneratedColumn = 0;
		var previousOriginalLine = 0;
		var previousOriginalColumn = 0;
		var previousSource = 0;
		var previousName = 0;
		var length = aStr.length;
		var index = 0;
		var cachedSegments = {};
		var temp = {};
		var originalMappings = [];
		var generatedMappings = [];
		var mapping, str, segment, end, value;

		while (index < length) {
			if (aStr.charAt(index) === ';') {
			generatedLine++;
			index++;
			previousGeneratedColumn = 0;
			}
			else if (aStr.charAt(index) === ',') {
			index++;
			}
			else {
			mapping = new Mapping();
			mapping.generatedLine = generatedLine;

			// Because each offset is encoded relative to the previous one,
			// many segments often have the same encoding. We can exploit this
			// fact by caching the parsed variable length fields of each segment,
			// allowing us to avoid a second parse if we encounter the same
			// segment again.
			for (end = index; end < length; end++) {
				if (this._charIsMappingSeparator(aStr, end)) {
				break;
				}
			}
			str = aStr.slice(index, end);

			segment = cachedSegments[str];
			if (segment) {
				index += str.length;
			} else {
				segment = [];
				while (index < end) {
				base64VLQ.decode(aStr, index, temp);
				value = temp.value;
				index = temp.rest;
				segment.push(value);
				}

				if (segment.length === 2) {
				throw new Error('Found a source, but no line and column');
				}

				if (segment.length === 3) {
				throw new Error('Found a source and line, but no column');
				}

				cachedSegments[str] = segment;
			}

			// Generated column.
			mapping.generatedColumn = previousGeneratedColumn + segment[0];
			previousGeneratedColumn = mapping.generatedColumn;

			if (segment.length > 1) {
				// Original source.
				mapping.source = previousSource + segment[1];
				previousSource += segment[1];

				// Original line.
				mapping.originalLine = previousOriginalLine + segment[2];
				previousOriginalLine = mapping.originalLine;
				// Lines are stored 0-based
				mapping.originalLine += 1;

				// Original column.
				mapping.originalColumn = previousOriginalColumn + segment[3];
				previousOriginalColumn = mapping.originalColumn;

				if (segment.length > 4) {
				// Original name.
				mapping.name = previousName + segment[4];
				previousName += segment[4];
				}
			}

			generatedMappings.push(mapping);
			if (typeof mapping.originalLine === 'number') {
				originalMappings.push(mapping);
			}
			}
		}

		quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
		this.__generatedMappings = generatedMappings;

		quickSort(originalMappings, util.compareByOriginalPositions);
		this.__originalMappings = originalMappings;
		};

	/**
	* Find the mapping that best matches the hypothetical "needle" mapping that
	* we are searching for in the given "haystack" of mappings.
	*/
	BasicSourceMapConsumer.prototype._findMapping =
		function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
											aColumnName, aComparator, aBias) {
		// To return the position we are searching for, we must first find the
		// mapping for the given position and then return the opposite position it
		// points to. Because the mappings are sorted, we can use binary search to
		// find the best mapping.

		if (aNeedle[aLineName] <= 0) {
			throw new TypeError('Line must be greater than or equal to 1, got '
								+ aNeedle[aLineName]);
		}
		if (aNeedle[aColumnName] < 0) {
			throw new TypeError('Column must be greater than or equal to 0, got '
								+ aNeedle[aColumnName]);
		}

		return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
		};

	/**
	* Compute the last column for each generated mapping. The last column is
	* inclusive.
	*/
	BasicSourceMapConsumer.prototype.computeColumnSpans =
		function SourceMapConsumer_computeColumnSpans() {
		for (var index = 0; index < this._generatedMappings.length; ++index) {
			var mapping = this._generatedMappings[index];

			// Mappings do not contain a field for the last generated columnt. We
			// can come up with an optimistic estimate, however, by assuming that
			// mappings are contiguous (i.e. given two consecutive mappings, the
			// first mapping ends where the second one starts).
			if (index + 1 < this._generatedMappings.length) {
			var nextMapping = this._generatedMappings[index + 1];

			if (mapping.generatedLine === nextMapping.generatedLine) {
				mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
				continue;
			}
			}

			// The last mapping for each line spans the entire line.
			mapping.lastGeneratedColumn = Infinity;
		}
		};

	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.
	*   - column: The column number in the generated source.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.
	*   - column: The column number in the original source, or null.
	*   - name: The original identifier, or null.
	*/
	BasicSourceMapConsumer.prototype.originalPositionFor =
		function SourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, 'line'),
			generatedColumn: util.getArg(aArgs, 'column')
		};

		var index = this._findMapping(
			needle,
			this._generatedMappings,
			"generatedLine",
			"generatedColumn",
			util.compareByGeneratedPositionsDeflated,
			util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		);

		if (index >= 0) {
			var mapping = this._generatedMappings[index];

			if (mapping.generatedLine === needle.generatedLine) {
			var source = util.getArg(mapping, 'source', null);
			if (source !== null) {
				source = this._sources.at(source);
				if (this.sourceRoot != null) {
				source = util.join(this.sourceRoot, source);
				}
			}
			var name = util.getArg(mapping, 'name', null);
			if (name !== null) {
				name = this._names.at(name);
			}
			return {
				source: source,
				line: util.getArg(mapping, 'originalLine', null),
				column: util.getArg(mapping, 'originalColumn', null),
				name: name
			};
			}
		}

		return {
			source: null,
			line: null,
			column: null,
			name: null
		};
		};

	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
		function BasicSourceMapConsumer_hasContentsOfAllSources() {
		if (!this.sourcesContent) {
			return false;
		}
		return this.sourcesContent.length >= this._sources.size() &&
			!this.sourcesContent.some(function (sc) { return sc == null; });
		};

	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	BasicSourceMapConsumer.prototype.sourceContentFor =
		function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		if (!this.sourcesContent) {
			return null;
		}

		if (this.sourceRoot != null) {
			aSource = util.relative(this.sourceRoot, aSource);
		}

		if (this._sources.has(aSource)) {
			return this.sourcesContent[this._sources.indexOf(aSource)];
		}

		var url;
		if (this.sourceRoot != null
			&& (url = util.urlParse(this.sourceRoot))) {
			// XXX: file:// URIs and absolute paths lead to unexpected behavior for
			// many users. We can help them out when they expect file:// URIs to
			// behave like it would if they were running a local HTTP server. See
			// https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
			var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
			if (url.scheme == "file"
				&& this._sources.has(fileUriAbsPath)) {
			return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
			}

			if ((!url.path || url.path == "/")
				&& this._sources.has("/" + aSource)) {
			return this.sourcesContent[this._sources.indexOf("/" + aSource)];
			}
		}

		// This function is used recursively from
		// IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
		// don't want to throw if we can't find the source - we just want to
		// return null, so we provide a flag to exit gracefully.
		if (nullOnMissing) {
			return null;
		}
		else {
			throw new Error('"' + aSource + '" is not in the SourceMap.');
		}
		};

	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: The column number in the original source.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	BasicSourceMapConsumer.prototype.generatedPositionFor =
		function SourceMapConsumer_generatedPositionFor(aArgs) {
		var source = util.getArg(aArgs, 'source');
		if (this.sourceRoot != null) {
			source = util.relative(this.sourceRoot, source);
		}
		if (!this._sources.has(source)) {
			return {
			line: null,
			column: null,
			lastColumn: null
			};
		}
		source = this._sources.indexOf(source);

		var needle = {
			source: source,
			originalLine: util.getArg(aArgs, 'line'),
			originalColumn: util.getArg(aArgs, 'column')
		};

		var index = this._findMapping(
			needle,
			this._originalMappings,
			"originalLine",
			"originalColumn",
			util.compareByOriginalPositions,
			util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		);

		if (index >= 0) {
			var mapping = this._originalMappings[index];

			if (mapping.source === needle.source) {
			return {
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
			};
			}
		}

		return {
			line: null,
			column: null,
			lastColumn: null
		};
		};

	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

	/**
	* An IndexedSourceMapConsumer instance represents a parsed source map which
	* we can query for information. It differs from BasicSourceMapConsumer in
	* that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	* input.
	*
	* The only parameter is a raw source map (either as a JSON string, or already
	* parsed to an object). According to the spec for indexed source maps, they
	* have the following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - file: Optional. The generated file this source map is associated with.
	*   - sections: A list of section definitions.
	*
	* Each value under the "sections" field has two fields:
	*   - offset: The offset into the original specified at which this section
	*       begins to apply, defined as an object with a "line" and "column"
	*       field.
	*   - map: A source map definition. This source map could also be indexed,
	*       but doesn't have to be.
	*
	* Instead of the "map" field, it's also possible to have a "url" field
	* specifying a URL to retrieve a source map from, but that's currently
	* unsupported.
	*
	* Here's an example source map, taken from the source map spec[0], but
	* modified to omit a section which uses the "url" field.
	*
	*  {
	*    version : 3,
	*    file: "app.js",
	*    sections: [{
	*      offset: {line:100, column:10},
	*      map: {
	*        version : 3,
	*        file: "section.js",
	*        sources: ["foo.js", "bar.js"],
	*        names: ["src", "maps", "are", "fun"],
	*        mappings: "AAAA,E;;ABCDE;"
	*      }
	*    }],
	*  }
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	*/
	function IndexedSourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		var version = util.getArg(sourceMap, 'version');
		var sections = util.getArg(sourceMap, 'sections');

		if (version != this._version) {
		throw new Error('Unsupported version: ' + version);
		}

		this._sources = new ArraySet();
		this._names = new ArraySet();

		var lastOffset = {
		line: -1,
		column: 0
		};
		this._sections = sections.map(function (s) {
		if (s.url) {
			// The url field will require support for asynchronicity.
			// See https://github.com/mozilla/source-map/issues/16
			throw new Error('Support for url field in sections not implemented.');
		}
		var offset = util.getArg(s, 'offset');
		var offsetLine = util.getArg(offset, 'line');
		var offsetColumn = util.getArg(offset, 'column');

		if (offsetLine < lastOffset.line ||
			(offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
			throw new Error('Section offsets must be ordered and non-overlapping.');
		}
		lastOffset = offset;

		return {
			generatedOffset: {
			// The offset fields are 0-based, but we use 1-based indices when
			// encoding/decoding from VLQ.
			generatedLine: offsetLine + 1,
			generatedColumn: offsetColumn + 1
			},
			consumer: new SourceMapConsumer(util.getArg(s, 'map'))
		}
		});
	}

	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	IndexedSourceMapConsumer.prototype._version = 3;

	/**
	* The list of original sources.
	*/
	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
		get: function () {
		var sources = [];
		for (var i = 0; i < this._sections.length; i++) {
			for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
			sources.push(this._sections[i].consumer.sources[j]);
			}
		}
		return sources;
		}
	});

	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.
	*   - column: The column number in the generated source.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.
	*   - column: The column number in the original source, or null.
	*   - name: The original identifier, or null.
	*/
	IndexedSourceMapConsumer.prototype.originalPositionFor =
		function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, 'line'),
			generatedColumn: util.getArg(aArgs, 'column')
		};

		// Find the section containing the generated position we're trying to map
		// to an original position.
		var sectionIndex = binarySearch.search(needle, this._sections,
			function(needle, section) {
			var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
			if (cmp) {
				return cmp;
			}

			return (needle.generatedColumn -
					section.generatedOffset.generatedColumn);
			});
		var section = this._sections[sectionIndex];

		if (!section) {
			return {
			source: null,
			line: null,
			column: null,
			name: null
			};
		}

		return section.consumer.originalPositionFor({
			line: needle.generatedLine -
			(section.generatedOffset.generatedLine - 1),
			column: needle.generatedColumn -
			(section.generatedOffset.generatedLine === needle.generatedLine
			? section.generatedOffset.generatedColumn - 1
			: 0),
			bias: aArgs.bias
		});
		};

	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
		function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		return this._sections.every(function (s) {
			return s.consumer.hasContentsOfAllSources();
		});
		};

	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	IndexedSourceMapConsumer.prototype.sourceContentFor =
		function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];

			var content = section.consumer.sourceContentFor(aSource, true);
			if (content) {
			return content;
			}
		}
		if (nullOnMissing) {
			return null;
		}
		else {
			throw new Error('"' + aSource + '" is not in the SourceMap.');
		}
		};

	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: The column number in the original source.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	IndexedSourceMapConsumer.prototype.generatedPositionFor =
		function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];

			// Only consider this section if the requested source is in the list of
			// sources of the consumer.
			if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
			continue;
			}
			var generatedPosition = section.consumer.generatedPositionFor(aArgs);
			if (generatedPosition) {
			var ret = {
				line: generatedPosition.line +
				(section.generatedOffset.generatedLine - 1),
				column: generatedPosition.column +
				(section.generatedOffset.generatedLine === generatedPosition.line
				? section.generatedOffset.generatedColumn - 1
				: 0)
			};
			return ret;
			}
		}

		return {
			line: null,
			column: null
		};
		};

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	IndexedSourceMapConsumer.prototype._parseMappings =
		function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		this.__generatedMappings = [];
		this.__originalMappings = [];
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			var sectionMappings = section.consumer._generatedMappings;
			for (var j = 0; j < sectionMappings.length; j++) {
			var mapping = sectionMappings[j];

			var source = section.consumer._sources.at(mapping.source);
			if (section.consumer.sourceRoot !== null) {
				source = util.join(section.consumer.sourceRoot, source);
			}
			this._sources.add(source);
			source = this._sources.indexOf(source);

			var name = section.consumer._names.at(mapping.name);
			this._names.add(name);
			name = this._names.indexOf(name);

			// The mappings coming from the consumer for the section have
			// generated positions relative to the start of the section, so we
			// need to offset them to be relative to the start of the concatenated
			// generated file.
			var adjustedMapping = {
				source: source,
				generatedLine: mapping.generatedLine +
				(section.generatedOffset.generatedLine - 1),
				generatedColumn: mapping.generatedColumn +
				(section.generatedOffset.generatedLine === mapping.generatedLine
				? section.generatedOffset.generatedColumn - 1
				: 0),
				originalLine: mapping.originalLine,
				originalColumn: mapping.originalColumn,
				name: name
			};

			this.__generatedMappings.push(adjustedMapping);
			if (typeof adjustedMapping.originalLine === 'number') {
				this.__originalMappings.push(adjustedMapping);
			}
			}
		}

		quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
		quickSort(this.__originalMappings, util.compareByOriginalPositions);
		};

	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;

	/**
	* Recursive implementation of binary search.
	*
	* @param aLow Indices here and lower do not contain the needle.
	* @param aHigh Indices here and higher do not contain the needle.
	* @param aNeedle The element being searched for.
	* @param aHaystack The non-empty array being searched.
	* @param aCompare Function which takes two elements and returns -1, 0, or 1.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*/
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		// This function terminates when one of the following is true:
		//
		//   1. We find the exact element we are looking for.
		//
		//   2. We did not find the exact element, but we can return the index of
		//      the next-closest element.
		//
		//   3. We did not find the exact element, and there is no next-closest
		//      element than the one we are searching for, so we return -1.
		var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		var cmp = aCompare(aNeedle, aHaystack[mid], true);
		if (cmp === 0) {
		// Found the element we are looking for.
		return mid;
		}
		else if (cmp > 0) {
		// Our needle is greater than aHaystack[mid].
		if (aHigh - mid > 1) {
			// The element is in the upper half.
			return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
		}

		// The exact needle element was not found in this haystack. Determine if
		// we are in termination case (3) or (2) and return the appropriate thing.
		if (aBias == exports.LEAST_UPPER_BOUND) {
			return aHigh < aHaystack.length ? aHigh : -1;
		} else {
			return mid;
		}
		}
		else {
		// Our needle is less than aHaystack[mid].
		if (mid - aLow > 1) {
			// The element is in the lower half.
			return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
		}

		// we are in termination case (3) or (2) and return the appropriate thing.
		if (aBias == exports.LEAST_UPPER_BOUND) {
			return mid;
		} else {
			return aLow < 0 ? -1 : aLow;
		}
		}
	}

	/**
	* This is an implementation of binary search which will always try and return
	* the index of the closest element if there is no exact hit. This is because
	* mappings between original and generated line/col pairs are single points,
	* and there is an implicit region between each of them, so a miss just means
	* that you aren't on the very start of a region.
	*
	* @param aNeedle The element you are looking for.
	* @param aHaystack The array that is being searched.
	* @param aCompare A function which takes the needle and an element in the
	*     array and returns -1, 0, or 1 depending on whether the needle is less
	*     than, equal to, or greater than the element, respectively.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	*/
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		if (aHaystack.length === 0) {
		return -1;
		}

		var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
									aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		if (index < 0) {
		return -1;
		}

		// We have found either the exact element, or the next-closest element than
		// the one we are searching for. However, there may be more than one such
		// element. Make sure we always return the smallest of these.
		while (index - 1 >= 0) {
		if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
			break;
		}
		--index;
		}

		return index;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	// It turns out that some (most?) JavaScript engines don't self-host
	// `Array.prototype.sort`. This makes sense because C++ will likely remain
	// faster than JS when doing raw CPU-intensive sorting. However, when using a
	// custom comparator function, calling back and forth between the VM's C++ and
	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
	// worse generated code for the comparator function than would be optimal. In
	// fact, when sorting with a comparator, these costs outweigh the benefits of
	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	// a ~3500ms mean speed-up in `bench/bench.html`.

	/**
	* Swap the elements indexed by `x` and `y` in the array `ary`.
	*
	* @param {Array} ary
	*        The array.
	* @param {Number} x
	*        The index of the first item.
	* @param {Number} y
	*        The index of the second item.
	*/
	function swap(ary, x, y) {
		var temp = ary[x];
		ary[x] = ary[y];
		ary[y] = temp;
	}

	/**
	* Returns a random integer within the range `low .. high` inclusive.
	*
	* @param {Number} low
	*        The lower bound on the range.
	* @param {Number} high
	*        The upper bound on the range.
	*/
	function randomIntInRange(low, high) {
		return Math.round(low + (Math.random() * (high - low)));
	}

	/**
	* The Quick Sort algorithm.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	* @param {Number} p
	*        Start index of the array
	* @param {Number} r
	*        End index of the array
	*/
	function doQuickSort(ary, comparator, p, r) {
		// If our lower bound is less than our upper bound, we (1) partition the
		// array into two pieces and (2) recurse on each half. If it is not, this is
		// the empty array and our base case.

		if (p < r) {
		// (1) Partitioning.
		//
		// The partitioning chooses a pivot between `p` and `r` and moves all
		// elements that are less than or equal to the pivot to the before it, and
		// all the elements that are greater than it after it. The effect is that
		// once partition is done, the pivot is in the exact place it will be when
		// the array is put in sorted order, and it will not need to be moved
		// again. This runs in O(n) time.

		// Always choose a random pivot so that an input array which is reverse
		// sorted does not cause O(n^2) running time.
		var pivotIndex = randomIntInRange(p, r);
		var i = p - 1;

		swap(ary, pivotIndex, r);
		var pivot = ary[r];

		// Immediately after `j` is incremented in this loop, the following hold
		// true:
		//
		//   * Every element in `ary[p .. i]` is less than or equal to the pivot.
		//
		//   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
		for (var j = p; j < r; j++) {
			if (comparator(ary[j], pivot) <= 0) {
			i += 1;
			swap(ary, i, j);
			}
		}

		swap(ary, i + 1, j);
		var q = i + 1;

		// (2) Recurse on each half.

		doQuickSort(ary, comparator, p, q - 1);
		doQuickSort(ary, comparator, q + 1, r);
		}
	}

	/**
	* Sort the given array in-place with the given comparator function.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	*/
	exports.quickSort = function (ary, comparator) {
		doQuickSort(ary, comparator, 0, ary.length - 1);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
	var util = __webpack_require__(4);

	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	var REGEX_NEWLINE = /(\r?\n)/;

	// Newline character code for charCodeAt() comparisons
	var NEWLINE_CODE = 10;

	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	var isSourceNode = "$$$isSourceNode$$$";

	/**
	* SourceNodes provide a way to abstract over interpolating/concatenating
	* snippets of generated JavaScript source code while maintaining the line and
	* column information associated with the original source code.
	*
	* @param aLine The original line number.
	* @param aColumn The original column number.
	* @param aSource The original source's filename.
	* @param aChunks Optional. An array of strings which are snippets of
	*        generated JS, or other SourceNodes.
	* @param aName The original identifier.
	*/
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		this.children = [];
		this.sourceContents = {};
		this.line = aLine == null ? null : aLine;
		this.column = aColumn == null ? null : aColumn;
		this.source = aSource == null ? null : aSource;
		this.name = aName == null ? null : aName;
		this[isSourceNode] = true;
		if (aChunks != null) this.add(aChunks);
	}

	/**
	* Creates a SourceNode from generated code and a SourceMapConsumer.
	*
	* @param aGeneratedCode The generated code
	* @param aSourceMapConsumer The SourceMap for the generated code
	* @param aRelativePath Optional. The path that relative sources in the
	*        SourceMapConsumer should be relative to.
	*/
	SourceNode.fromStringWithSourceMap =
		function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		// The SourceNode we want to fill with the generated code
		// and the SourceMap
		var node = new SourceNode();

		// All even indices of this array are one line of the generated code,
		// while all odd indices are the newlines between two adjacent lines
		// (since `REGEX_NEWLINE` captures its match).
		// Processed fragments are removed from this array, by calling `shiftNextLine`.
		var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		var shiftNextLine = function() {
			var lineContents = remainingLines.shift();
			// The last line of a file might not have a newline.
			var newLine = remainingLines.shift() || "";
			return lineContents + newLine;
		};

		// We need to remember the position of "remainingLines"
		var lastGeneratedLine = 1, lastGeneratedColumn = 0;

		// The generate SourceNodes we need a code range.
		// To extract it current and last mapping is used.
		// Here we store the last mapping.
		var lastMapping = null;

		aSourceMapConsumer.eachMapping(function (mapping) {
			if (lastMapping !== null) {
			// We add the code from "lastMapping" to "mapping":
			// First check if there is a new line in between.
			if (lastGeneratedLine < mapping.generatedLine) {
				// Associate first line with "lastMapping"
				addMappingWithCode(lastMapping, shiftNextLine());
				lastGeneratedLine++;
				lastGeneratedColumn = 0;
				// The remaining code is added without mapping
			} else {
				// There is no new line in between.
				// Associate the code between "lastGeneratedColumn" and
				// "mapping.generatedColumn" with "lastMapping"
				var nextLine = remainingLines[0];
				var code = nextLine.substr(0, mapping.generatedColumn -
											lastGeneratedColumn);
				remainingLines[0] = nextLine.substr(mapping.generatedColumn -
													lastGeneratedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
				addMappingWithCode(lastMapping, code);
				// No more remaining code, continue
				lastMapping = mapping;
				return;
			}
			}
			// We add the generated code until the first mapping
			// to the SourceNode without any mapping.
			// Each line is added as separate string.
			while (lastGeneratedLine < mapping.generatedLine) {
			node.add(shiftNextLine());
			lastGeneratedLine++;
			}
			if (lastGeneratedColumn < mapping.generatedColumn) {
			var nextLine = remainingLines[0];
			node.add(nextLine.substr(0, mapping.generatedColumn));
			remainingLines[0] = nextLine.substr(mapping.generatedColumn);
			lastGeneratedColumn = mapping.generatedColumn;
			}
			lastMapping = mapping;
		}, this);
		// We have processed all mappings.
		if (remainingLines.length > 0) {
			if (lastMapping) {
			// Associate the remaining code in the current line with "lastMapping"
			addMappingWithCode(lastMapping, shiftNextLine());
			}
			// and add the remaining lines without any mapping
			node.add(remainingLines.join(""));
		}

		// Copy sourcesContent into SourceNode
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			if (aRelativePath != null) {
				sourceFile = util.join(aRelativePath, sourceFile);
			}
			node.setSourceContent(sourceFile, content);
			}
		});

		return node;

		function addMappingWithCode(mapping, code) {
			if (mapping === null || mapping.source === undefined) {
			node.add(code);
			} else {
			var source = aRelativePath
				? util.join(aRelativePath, mapping.source)
				: mapping.source;
			node.add(new SourceNode(mapping.originalLine,
									mapping.originalColumn,
									source,
									code,
									mapping.name));
			}
		}
		};

	/**
	* Add a chunk of generated JS to this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
		if (Array.isArray(aChunk)) {
		aChunk.forEach(function (chunk) {
			this.add(chunk);
		}, this);
		}
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		if (aChunk) {
			this.children.push(aChunk);
		}
		}
		else {
		throw new TypeError(
			"Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		);
		}
		return this;
	};

	/**
	* Add a chunk of generated JS to the beginning of this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		if (Array.isArray(aChunk)) {
		for (var i = aChunk.length-1; i >= 0; i--) {
			this.prepend(aChunk[i]);
		}
		}
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		this.children.unshift(aChunk);
		}
		else {
		throw new TypeError(
			"Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		);
		}
		return this;
	};

	/**
	* Walk over the tree of JS snippets in this node and its children. The
	* walking function is called once for each snippet of JS and is passed that
	* snippet and the its original associated source's line/column location.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		var chunk;
		for (var i = 0, len = this.children.length; i < len; i++) {
		chunk = this.children[i];
		if (chunk[isSourceNode]) {
			chunk.walk(aFn);
		}
		else {
			if (chunk !== '') {
			aFn(chunk, { source: this.source,
						line: this.line,
						column: this.column,
						name: this.name });
			}
		}
		}
	};

	/**
	* Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	* each of `this.children`.
	*
	* @param aSep The separator.
	*/
	SourceNode.prototype.join = function SourceNode_join(aSep) {
		var newChildren;
		var i;
		var len = this.children.length;
		if (len > 0) {
		newChildren = [];
		for (i = 0; i < len-1; i++) {
			newChildren.push(this.children[i]);
			newChildren.push(aSep);
		}
		newChildren.push(this.children[i]);
		this.children = newChildren;
		}
		return this;
	};

	/**
	* Call String.prototype.replace on the very right-most source snippet. Useful
	* for trimming whitespace from the end of a source node, etc.
	*
	* @param aPattern The pattern to replace.
	* @param aReplacement The thing to replace the pattern with.
	*/
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		var lastChild = this.children[this.children.length - 1];
		if (lastChild[isSourceNode]) {
		lastChild.replaceRight(aPattern, aReplacement);
		}
		else if (typeof lastChild === 'string') {
		this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		}
		else {
		this.children.push(''.replace(aPattern, aReplacement));
		}
		return this;
	};

	/**
	* Set the source content for a source file. This will be added to the SourceMapGenerator
	* in the sourcesContent field.
	*
	* @param aSourceFile The filename of the source file
	* @param aSourceContent The content of the source file
	*/
	SourceNode.prototype.setSourceContent =
		function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
		};

	/**
	* Walk over the tree of SourceNodes. The walking function is called for each
	* source file content and is passed the filename and source content.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walkSourceContents =
		function SourceNode_walkSourceContents(aFn) {
		for (var i = 0, len = this.children.length; i < len; i++) {
			if (this.children[i][isSourceNode]) {
			this.children[i].walkSourceContents(aFn);
			}
		}

		var sources = Object.keys(this.sourceContents);
		for (var i = 0, len = sources.length; i < len; i++) {
			aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
		}
		};

	/**
	* Return the string representation of this source node. Walks over the tree
	* and concatenates all the various snippets together to one string.
	*/
	SourceNode.prototype.toString = function SourceNode_toString() {
		var str = "";
		this.walk(function (chunk) {
		str += chunk;
		});
		return str;
	};

	/**
	* Returns the string representation of this source node along with a source
	* map.
	*/
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		var generated = {
		code: "",
		line: 1,
		column: 0
		};
		var map = new SourceMapGenerator(aArgs);
		var sourceMappingActive = false;
		var lastOriginalSource = null;
		var lastOriginalLine = null;
		var lastOriginalColumn = null;
		var lastOriginalName = null;
		this.walk(function (chunk, original) {
		generated.code += chunk;
		if (original.source !== null
			&& original.line !== null
			&& original.column !== null) {
			if(lastOriginalSource !== original.source
			|| lastOriginalLine !== original.line
			|| lastOriginalColumn !== original.column
			|| lastOriginalName !== original.name) {
			map.addMapping({
				source: original.source,
				original: {
				line: original.line,
				column: original.column
				},
				generated: {
				line: generated.line,
				column: generated.column
				},
				name: original.name
			});
			}
			lastOriginalSource = original.source;
			lastOriginalLine = original.line;
			lastOriginalColumn = original.column;
			lastOriginalName = original.name;
			sourceMappingActive = true;
		} else if (sourceMappingActive) {
			map.addMapping({
			generated: {
				line: generated.line,
				column: generated.column
			}
			});
			lastOriginalSource = null;
			sourceMappingActive = false;
		}
		for (var idx = 0, length = chunk.length; idx < length; idx++) {
			if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
			generated.line++;
			generated.column = 0;
			// Mappings end at eol
			if (idx + 1 === length) {
				lastOriginalSource = null;
				sourceMappingActive = false;
			} else if (sourceMappingActive) {
				map.addMapping({
				source: original.source,
				original: {
					line: original.line,
					column: original.column
				},
				generated: {
					line: generated.line,
					column: generated.column
				},
				name: original.name
				});
			}
			} else {
			generated.column++;
			}
		}
		});
		this.walkSourceContents(function (sourceFile, sourceContent) {
		map.setSourceContent(sourceFile, sourceContent);
		});

		return { code: generated.code, map: map };
	};

	exports.SourceNode = SourceNode;


/***/ }
/******/ ])
});
;
},{}],8:[function(require,module,exports){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.StackTrace=e()}}(function(){var e;return function n(e,r,t){function o(a,s){if(!r[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[a]={exports:{}};e[a][0].call(l.exports,function(n){var r=e[a][1][n];return o(r?r:n)},l,l.exports,n,e,r,t)}return r[a].exports}for(var i="function"==typeof require&&require,a=0;a<t.length;a++)o(t[a]);return o}({1:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("error-stack-parser",["stackframe"],i):"object"==typeof t?r.exports=i(n("stackframe")):o.ErrorStackParser=i(o.StackFrame)}(this,function(e){"use strict";var n=/(^|@)\S+\:\d+/,r=/^\s*at .*(\S+\:\d+|\(native\))/m,t=/^(eval@)?(\[native code\])?$/;return{parse:function(e){if("undefined"!=typeof e.stacktrace||"undefined"!=typeof e["opera#sourceloc"])return this.parseOpera(e);if(e.stack&&e.stack.match(r))return this.parseV8OrIE(e);if(e.stack)return this.parseFFOrSafari(e);throw new Error("Cannot parse given Error object")},extractLocation:function(e){if(e.indexOf(":")===-1)return[e];var n=/(.+?)(?:\:(\d+))?(?:\:(\d+))?$/,r=n.exec(e.replace(/[\(\)]/g,""));return[r[1],r[2]||void 0,r[3]||void 0]},parseV8OrIE:function(n){var t=n.stack.split("\n").filter(function(e){return!!e.match(r)},this);return t.map(function(n){n.indexOf("(eval ")>-1&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var r=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),t=this.extractLocation(r.pop()),o=r.join(" ")||void 0,i=["eval","<anonymous>"].indexOf(t[0])>-1?void 0:t[0];return new e({functionName:o,fileName:i,lineNumber:t[1],columnNumber:t[2],source:n})},this)},parseFFOrSafari:function(n){var r=n.stack.split("\n").filter(function(e){return!e.match(t)},this);return r.map(function(n){if(n.indexOf(" > eval")>-1&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),n.indexOf("@")===-1&&n.indexOf(":")===-1)return new e({functionName:n});var r=/((.*".+"[^@]*)?[^@]*)(?:@)/,t=n.match(r),o=t&&t[1]?t[1]:void 0,i=this.extractLocation(n.replace(r,""));return new e({functionName:o,fileName:i[0],lineNumber:i[1],columnNumber:i[2],source:n})},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf("\n")>-1&&e.message.split("\n").length>e.stacktrace.split("\n").length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(n){for(var r=/Line (\d+).*script (?:in )?(\S+)/i,t=n.message.split("\n"),o=[],i=2,a=t.length;i<a;i+=2){var s=r.exec(t[i]);s&&o.push(new e({fileName:s[2],lineNumber:s[1],source:t[i]}))}return o},parseOpera10:function(n){for(var r=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,t=n.stacktrace.split("\n"),o=[],i=0,a=t.length;i<a;i+=2){var s=r.exec(t[i]);s&&o.push(new e({functionName:s[3]||void 0,fileName:s[2],lineNumber:s[1],source:t[i]}))}return o},parseOpera11:function(r){var t=r.stack.split("\n").filter(function(e){return!!e.match(n)&&!e.match(/^Error created at/)},this);return t.map(function(n){var r,t=n.split("@"),o=this.extractLocation(t.pop()),i=t.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(r=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===r||"[arguments not available]"===r?void 0:r.split(",");return new e({functionName:a,args:s,fileName:o[0],lineNumber:o[1],columnNumber:o[2],source:n})},this)}}})},{stackframe:3}],2:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stack-generator",["stackframe"],i):"object"==typeof t?r.exports=i(n("stackframe")):o.StackGenerator=i(o.StackFrame)}(this,function(e){return{backtrace:function(n){var r=[],t=10;"object"==typeof n&&"number"==typeof n.maxStackSize&&(t=n.maxStackSize);for(var o=arguments.callee;o&&r.length<t&&o.arguments;){for(var i=new Array(o.arguments.length),a=0;a<i.length;++a)i[a]=o.arguments[a];/function(?:\s+([\w$]+))+\s*\(/.test(o.toString())?r.push(new e({functionName:RegExp.$1||void 0,args:i})):r.push(new e({args:i}));try{o=o.caller}catch(s){break}}return r}}})},{stackframe:3}],3:[function(n,r,t){!function(n,o){"use strict";"function"==typeof e&&e.amd?e("stackframe",[],o):"object"==typeof t?r.exports=o():n.StackFrame=o()}(this,function(){"use strict";function e(e){return!isNaN(parseFloat(e))&&isFinite(e)}function n(e){return e.charAt(0).toUpperCase()+e.substring(1)}function r(e){return function(){return this[e]}}function t(e){if(e instanceof Object)for(var r=0;r<u.length;r++)e.hasOwnProperty(u[r])&&void 0!==e[u[r]]&&this["set"+n(u[r])](e[u[r]])}var o=["isConstructor","isEval","isNative","isToplevel"],i=["columnNumber","lineNumber"],a=["fileName","functionName","source"],s=["args"],u=o.concat(i,a,s);t.prototype={getArgs:function(){return this.args},setArgs:function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("Args must be an Array");this.args=e},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(e){if(e instanceof t)this.evalOrigin=e;else{if(!(e instanceof Object))throw new TypeError("Eval Origin must be an Object or StackFrame");this.evalOrigin=new t(e)}},toString:function(){var n=this.getFunctionName()||"{anonymous}",r="("+(this.getArgs()||[]).join(",")+")",t=this.getFileName()?"@"+this.getFileName():"",o=e(this.getLineNumber())?":"+this.getLineNumber():"",i=e(this.getColumnNumber())?":"+this.getColumnNumber():"";return n+r+t+o+i}};for(var c=0;c<o.length;c++)t.prototype["get"+n(o[c])]=r(o[c]),t.prototype["set"+n(o[c])]=function(e){return function(n){this[e]=Boolean(n)}}(o[c]);for(var l=0;l<i.length;l++)t.prototype["get"+n(i[l])]=r(i[l]),t.prototype["set"+n(i[l])]=function(n){return function(r){if(!e(r))throw new TypeError(n+" must be a Number");this[n]=Number(r)}}(i[l]);for(var f=0;f<a.length;f++)t.prototype["get"+n(a[f])]=r(a[f]),t.prototype["set"+n(a[f])]=function(e){return function(n){this[e]=String(n)}}(a[f]);return t})},{}],4:[function(e,n,r){function t(){this._array=[],this._set=Object.create(null)}var o=e("./util"),i=Object.prototype.hasOwnProperty;t.fromArray=function(e,n){for(var r=new t,o=0,i=e.length;o<i;o++)r.add(e[o],n);return r},t.prototype.size=function(){return Object.getOwnPropertyNames(this._set).length},t.prototype.add=function(e,n){var r=o.toSetString(e),t=i.call(this._set,r),a=this._array.length;t&&!n||this._array.push(e),t||(this._set[r]=a)},t.prototype.has=function(e){var n=o.toSetString(e);return i.call(this._set,n)},t.prototype.indexOf=function(e){var n=o.toSetString(e);if(i.call(this._set,n))return this._set[n];throw new Error('"'+e+'" is not in the set.')},t.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)},t.prototype.toArray=function(){return this._array.slice()},r.ArraySet=t},{"./util":10}],5:[function(e,n,r){function t(e){return e<0?(-e<<1)+1:(e<<1)+0}function o(e){var n=1===(1&e),r=e>>1;return n?-r:r}var i=e("./base64"),a=5,s=1<<a,u=s-1,c=s;r.encode=function(e){var n,r="",o=t(e);do n=o&u,o>>>=a,o>0&&(n|=c),r+=i.encode(n);while(o>0);return r},r.decode=function(e,n,r){var t,s,l=e.length,f=0,p=0;do{if(n>=l)throw new Error("Expected more digits in base 64 VLQ value.");if(s=i.decode(e.charCodeAt(n++)),s===-1)throw new Error("Invalid base64 digit: "+e.charAt(n-1));t=!!(s&c),s&=u,f+=s<<p,p+=a}while(t);r.value=o(f),r.rest=n}},{"./base64":6}],6:[function(e,n,r){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");r.encode=function(e){if(0<=e&&e<t.length)return t[e];throw new TypeError("Must be between 0 and 63: "+e)},r.decode=function(e){var n=65,r=90,t=97,o=122,i=48,a=57,s=43,u=47,c=26,l=52;return n<=e&&e<=r?e-n:t<=e&&e<=o?e-t+c:i<=e&&e<=a?e-i+l:e==s?62:e==u?63:-1}},{}],7:[function(e,n,r){function t(e,n,o,i,a,s){var u=Math.floor((n-e)/2)+e,c=a(o,i[u],!0);return 0===c?u:c>0?n-u>1?t(u,n,o,i,a,s):s==r.LEAST_UPPER_BOUND?n<i.length?n:-1:u:u-e>1?t(e,u,o,i,a,s):s==r.LEAST_UPPER_BOUND?u:e<0?-1:e}r.GREATEST_LOWER_BOUND=1,r.LEAST_UPPER_BOUND=2,r.search=function(e,n,o,i){if(0===n.length)return-1;var a=t(-1,n.length,e,n,o,i||r.GREATEST_LOWER_BOUND);if(a<0)return-1;for(;a-1>=0&&0===o(n[a],n[a-1],!0);)--a;return a}},{}],8:[function(e,n,r){function t(e,n,r){var t=e[n];e[n]=e[r],e[r]=t}function o(e,n){return Math.round(e+Math.random()*(n-e))}function i(e,n,r,a){if(r<a){var s=o(r,a),u=r-1;t(e,s,a);for(var c=e[a],l=r;l<a;l++)n(e[l],c)<=0&&(u+=1,t(e,u,l));t(e,u+1,l);var f=u+1;i(e,n,r,f-1),i(e,n,f+1,a)}}r.quickSort=function(e,n){i(e,n,0,e.length-1)}},{}],9:[function(e,n,r){function t(e){var n=e;return"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=n.sections?new a(n):new o(n)}function o(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=s.getArg(n,"version"),t=s.getArg(n,"sources"),o=s.getArg(n,"names",[]),i=s.getArg(n,"sourceRoot",null),a=s.getArg(n,"sourcesContent",null),u=s.getArg(n,"mappings"),l=s.getArg(n,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);t=t.map(String).map(s.normalize).map(function(e){return i&&s.isAbsolute(i)&&s.isAbsolute(e)?s.relative(i,e):e}),this._names=c.fromArray(o.map(String),!0),this._sources=c.fromArray(t,!0),this.sourceRoot=i,this.sourcesContent=a,this._mappings=u,this.file=l}function i(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function a(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=s.getArg(n,"version"),o=s.getArg(n,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new c,this._names=new c;var i={line:-1,column:0};this._sections=o.map(function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var n=s.getArg(e,"offset"),r=s.getArg(n,"line"),o=s.getArg(n,"column");if(r<i.line||r===i.line&&o<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=n,{generatedOffset:{generatedLine:r+1,generatedColumn:o+1},consumer:new t(s.getArg(e,"map"))}})}var s=e("./util"),u=e("./binary-search"),c=e("./array-set").ArraySet,l=e("./base64-vlq"),f=e("./quick-sort").quickSort;t.fromSourceMap=function(e){return o.fromSourceMap(e)},t.prototype._version=3,t.prototype.__generatedMappings=null,Object.defineProperty(t.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),t.prototype.__originalMappings=null,Object.defineProperty(t.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),t.prototype._charIsMappingSeparator=function(e,n){var r=e.charAt(n);return";"===r||","===r},t.prototype._parseMappings=function(e,n){throw new Error("Subclasses must implement _parseMappings")},t.GENERATED_ORDER=1,t.ORIGINAL_ORDER=2,t.GREATEST_LOWER_BOUND=1,t.LEAST_UPPER_BOUND=2,t.prototype.eachMapping=function(e,n,r){var o,i=n||null,a=r||t.GENERATED_ORDER;switch(a){case t.GENERATED_ORDER:o=this._generatedMappings;break;case t.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var u=this.sourceRoot;o.map(function(e){var n=null===e.source?null:this._sources.at(e.source);return null!=n&&null!=u&&(n=s.join(u,n)),{source:n,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}},this).forEach(e,i)},t.prototype.allGeneratedPositionsFor=function(e){var n=s.getArg(e,"line"),r={source:s.getArg(e,"source"),originalLine:n,originalColumn:s.getArg(e,"column",0)};if(null!=this.sourceRoot&&(r.source=s.relative(this.sourceRoot,r.source)),!this._sources.has(r.source))return[];r.source=this._sources.indexOf(r.source);var t=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,u.LEAST_UPPER_BOUND);if(o>=0){var i=this._originalMappings[o];if(void 0===e.column)for(var a=i.originalLine;i&&i.originalLine===a;)t.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o];else for(var c=i.originalColumn;i&&i.originalLine===n&&i.originalColumn==c;)t.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o]}return t},r.SourceMapConsumer=t,o.prototype=Object.create(t.prototype),o.prototype.consumer=t,o.fromSourceMap=function(e){var n=Object.create(o.prototype),r=n._names=c.fromArray(e._names.toArray(),!0),t=n._sources=c.fromArray(e._sources.toArray(),!0);n.sourceRoot=e._sourceRoot,n.sourcesContent=e._generateSourcesContent(n._sources.toArray(),n.sourceRoot),n.file=e._file;for(var a=e._mappings.toArray().slice(),u=n.__generatedMappings=[],l=n.__originalMappings=[],p=0,g=a.length;p<g;p++){var h=a[p],m=new i;m.generatedLine=h.generatedLine,m.generatedColumn=h.generatedColumn,h.source&&(m.source=t.indexOf(h.source),m.originalLine=h.originalLine,m.originalColumn=h.originalColumn,h.name&&(m.name=r.indexOf(h.name)),l.push(m)),u.push(m)}return f(n.__originalMappings,s.compareByOriginalPositions),n},o.prototype._version=3,Object.defineProperty(o.prototype,"sources",{get:function(){return this._sources.toArray().map(function(e){return null!=this.sourceRoot?s.join(this.sourceRoot,e):e},this)}}),o.prototype._parseMappings=function(e,n){for(var r,t,o,a,u,c=1,p=0,g=0,h=0,m=0,d=0,v=e.length,_=0,y={},w={},b=[],C=[];_<v;)if(";"===e.charAt(_))c++,_++,p=0;else if(","===e.charAt(_))_++;else{for(r=new i,r.generatedLine=c,a=_;a<v&&!this._charIsMappingSeparator(e,a);a++);if(t=e.slice(_,a),o=y[t])_+=t.length;else{for(o=[];_<a;)l.decode(e,_,w),u=w.value,_=w.rest,o.push(u);if(2===o.length)throw new Error("Found a source, but no line and column");if(3===o.length)throw new Error("Found a source and line, but no column");y[t]=o}r.generatedColumn=p+o[0],p=r.generatedColumn,o.length>1&&(r.source=m+o[1],m+=o[1],r.originalLine=g+o[2],g=r.originalLine,r.originalLine+=1,r.originalColumn=h+o[3],h=r.originalColumn,o.length>4&&(r.name=d+o[4],d+=o[4])),C.push(r),"number"==typeof r.originalLine&&b.push(r)}f(C,s.compareByGeneratedPositionsDeflated),this.__generatedMappings=C,f(b,s.compareByOriginalPositions),this.__originalMappings=b},o.prototype._findMapping=function(e,n,r,t,o,i){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[t]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[t]);return u.search(e,n,o,i)},o.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var n=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(n.generatedLine===r.generatedLine){n.lastGeneratedColumn=r.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}},o.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},r=this._findMapping(n,this._generatedMappings,"generatedLine","generatedColumn",s.compareByGeneratedPositionsDeflated,s.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(r>=0){var o=this._generatedMappings[r];if(o.generatedLine===n.generatedLine){var i=s.getArg(o,"source",null);null!==i&&(i=this._sources.at(i),null!=this.sourceRoot&&(i=s.join(this.sourceRoot,i)));var a=s.getArg(o,"name",null);return null!==a&&(a=this._names.at(a)),{source:i,line:s.getArg(o,"originalLine",null),column:s.getArg(o,"originalColumn",null),name:a}}}return{source:null,line:null,column:null,name:null}},o.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}))},o.prototype.sourceContentFor=function(e,n){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(e=s.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var r;if(null!=this.sourceRoot&&(r=s.urlParse(this.sourceRoot))){var t=e.replace(/^file:\/\//,"");if("file"==r.scheme&&this._sources.has(t))return this.sourcesContent[this._sources.indexOf(t)];if((!r.path||"/"==r.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},o.prototype.generatedPositionFor=function(e){var n=s.getArg(e,"source");if(null!=this.sourceRoot&&(n=s.relative(this.sourceRoot,n)),!this._sources.has(n))return{line:null,column:null,lastColumn:null};n=this._sources.indexOf(n);var r={source:n,originalLine:s.getArg(e,"line"),originalColumn:s.getArg(e,"column")},o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,s.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(o>=0){var i=this._originalMappings[o];if(i.source===r.source)return{line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},r.BasicSourceMapConsumer=o,a.prototype=Object.create(t.prototype),a.prototype.constructor=t,a.prototype._version=3,Object.defineProperty(a.prototype,"sources",{get:function(){for(var e=[],n=0;n<this._sections.length;n++)for(var r=0;r<this._sections[n].consumer.sources.length;r++)e.push(this._sections[n].consumer.sources[r]);return e}}),a.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},r=u.search(n,this._sections,function(e,n){var r=e.generatedLine-n.generatedOffset.generatedLine;return r?r:e.generatedColumn-n.generatedOffset.generatedColumn}),t=this._sections[r];return t?t.consumer.originalPositionFor({line:n.generatedLine-(t.generatedOffset.generatedLine-1),column:n.generatedColumn-(t.generatedOffset.generatedLine===n.generatedLine?t.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},a.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},a.prototype.sourceContentFor=function(e,n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r],o=t.consumer.sourceContentFor(e,!0);if(o)return o}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},a.prototype.generatedPositionFor=function(e){for(var n=0;n<this._sections.length;n++){var r=this._sections[n];if(r.consumer.sources.indexOf(s.getArg(e,"source"))!==-1){var t=r.consumer.generatedPositionFor(e);if(t){var o={line:t.line+(r.generatedOffset.generatedLine-1),column:t.column+(r.generatedOffset.generatedLine===t.line?r.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}},a.prototype._parseMappings=function(e,n){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var t=this._sections[r],o=t.consumer._generatedMappings,i=0;i<o.length;i++){var a=o[i],u=t.consumer._sources.at(a.source);null!==t.consumer.sourceRoot&&(u=s.join(t.consumer.sourceRoot,u)),this._sources.add(u),u=this._sources.indexOf(u);var c=t.consumer._names.at(a.name);this._names.add(c),c=this._names.indexOf(c);var l={source:u,generatedLine:a.generatedLine+(t.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(t.generatedOffset.generatedLine===a.generatedLine?t.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:c};this.__generatedMappings.push(l),"number"==typeof l.originalLine&&this.__originalMappings.push(l)}f(this.__generatedMappings,s.compareByGeneratedPositionsDeflated),f(this.__originalMappings,s.compareByOriginalPositions)},r.IndexedSourceMapConsumer=a},{"./array-set":4,"./base64-vlq":5,"./binary-search":7,"./quick-sort":8,"./util":10}],10:[function(e,n,r){function t(e,n,r){if(n in e)return e[n];if(3===arguments.length)return r;throw new Error('"'+n+'" is a required argument.')}function o(e){var n=e.match(v);return n?{scheme:n[1],auth:n[2],host:n[3],port:n[4],path:n[5]}:null}function i(e){var n="";return e.scheme&&(n+=e.scheme+":"),n+="//",e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}function a(e){var n=e,t=o(e);if(t){if(!t.path)return e;n=t.path}for(var a,s=r.isAbsolute(n),u=n.split(/\/+/),c=0,l=u.length-1;l>=0;l--)a=u[l],"."===a?u.splice(l,1):".."===a?c++:c>0&&(""===a?(u.splice(l+1,c),c=0):(u.splice(l,2),c--));return n=u.join("/"),""===n&&(n=s?"/":"."),t?(t.path=n,i(t)):n}function s(e,n){""===e&&(e="."),""===n&&(n=".");var r=o(n),t=o(e);if(t&&(e=t.path||"/"),r&&!r.scheme)return t&&(r.scheme=t.scheme),i(r);if(r||n.match(_))return n;if(t&&!t.host&&!t.path)return t.host=n,i(t);var s="/"===n.charAt(0)?n:a(e.replace(/\/+$/,"")+"/"+n);return t?(t.path=s,i(t)):s}function u(e,n){""===e&&(e="."),e=e.replace(/\/$/,"");for(var r=0;0!==n.indexOf(e+"/");){var t=e.lastIndexOf("/");if(t<0)return n;if(e=e.slice(0,t),e.match(/^([^\/]+:\/)?\/*$/))return n;++r}return Array(r+1).join("../")+n.substr(e.length+1)}function c(e){return e}function l(e){return p(e)?"$"+e:e}function f(e){return p(e)?e.slice(1):e}function p(e){if(!e)return!1;var n=e.length;if(n<9)return!1;if(95!==e.charCodeAt(n-1)||95!==e.charCodeAt(n-2)||111!==e.charCodeAt(n-3)||116!==e.charCodeAt(n-4)||111!==e.charCodeAt(n-5)||114!==e.charCodeAt(n-6)||112!==e.charCodeAt(n-7)||95!==e.charCodeAt(n-8)||95!==e.charCodeAt(n-9))return!1;for(var r=n-10;r>=0;r--)if(36!==e.charCodeAt(r))return!1;return!0}function g(e,n,r){var t=e.source-n.source;return 0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t||r?t:(t=e.generatedColumn-n.generatedColumn,0!==t?t:(t=e.generatedLine-n.generatedLine,0!==t?t:e.name-n.name))))}function h(e,n,r){var t=e.generatedLine-n.generatedLine;return 0!==t?t:(t=e.generatedColumn-n.generatedColumn,0!==t||r?t:(t=e.source-n.source,0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t?t:e.name-n.name))))}function m(e,n){return e===n?0:e>n?1:-1}function d(e,n){var r=e.generatedLine-n.generatedLine;return 0!==r?r:(r=e.generatedColumn-n.generatedColumn,0!==r?r:(r=m(e.source,n.source),0!==r?r:(r=e.originalLine-n.originalLine,0!==r?r:(r=e.originalColumn-n.originalColumn,0!==r?r:m(e.name,n.name)))))}r.getArg=t;var v=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,_=/^data:.+\,.+$/;r.urlParse=o,r.urlGenerate=i,r.normalize=a,r.join=s,r.isAbsolute=function(e){return"/"===e.charAt(0)||!!e.match(v)},r.relative=u;var y=function(){var e=Object.create(null);return!("__proto__"in e)}();r.toSetString=y?c:l,r.fromSetString=y?c:f,r.compareByOriginalPositions=g,r.compareByGeneratedPositionsDeflated=h,r.compareByGeneratedPositionsInflated=d},{}],11:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stacktrace-gps",["source-map","stackframe"],i):"object"==typeof t?r.exports=i(n("source-map/lib/source-map-consumer"),n("stackframe")):o.StackTraceGPS=i(o.SourceMap||o.sourceMap,o.StackFrame)}(this,function(e,n){"use strict";function r(e){return new Promise(function(n,r){var t=new XMLHttpRequest;t.open("get",e),t.onerror=r,t.onreadystatechange=function(){4===t.readyState&&(t.status>=200&&t.status<300||"file://"===e.substr(0,7)&&t.responseText?n(t.responseText):r(new Error("HTTP status: "+t.status+" retrieving "+e)))},t.send()})}function t(e){if("undefined"!=typeof window&&window.atob)return window.atob(e);throw new Error("You must supply a polyfill for window.atob in this environment")}function o(e){if("undefined"!=typeof JSON&&JSON.parse)return JSON.parse(e);throw new Error("You must supply a polyfill for JSON.parse in this environment")}function i(e,n){for(var r=[/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,/function\s+([^('"`]*?)\s*\(([^)]*)\)/,/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,/\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?(\S+)\s*\(.*?\)\s*\{/,/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/],t=e.split("\n"),o="",i=Math.min(n,20),a=0;a<i;++a){var s=t[n-a-1],u=s.indexOf("//");if(u>=0&&(s=s.substr(0,u)),s){o=s+o;for(var c=r.length,l=0;l<c;l++){var f=r[l].exec(o);if(f&&f[1])return f[1]}}}}function a(){if("function"!=typeof Object.defineProperty||"function"!=typeof Object.create)throw new Error("Unable to consume source maps in older browsers")}function s(e){if("object"!=typeof e)throw new TypeError("Given StackFrame is not an object");if("string"!=typeof e.fileName)throw new TypeError("Given file name is not a String");if("number"!=typeof e.lineNumber||e.lineNumber%1!==0||e.lineNumber<1)throw new TypeError("Given line number must be a positive integer");if("number"!=typeof e.columnNumber||e.columnNumber%1!==0||e.columnNumber<0)throw new TypeError("Given column number must be a non-negative integer");return!0}function u(e){for(var n,r,t=/\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;r=t.exec(e);)n=r[1];if(n)return n;throw new Error("sourceMappingURL not found")}function c(e,r,t){return new Promise(function(o,i){var a=r.originalPositionFor({line:e.lineNumber,column:e.columnNumber});if(a.source){var s=r.sourceContentFor(a.source);s&&(t[a.source]=s),o(new n({functionName:a.name||e.functionName,args:e.args,fileName:a.source,lineNumber:a.line,columnNumber:a.column}))}else i(new Error("Could not get original source for given stackframe and source map"))})}return function l(f){return this instanceof l?(f=f||{},this.sourceCache=f.sourceCache||{},this.sourceMapConsumerCache=f.sourceMapConsumerCache||{},this.ajax=f.ajax||r,this._atob=f.atob||t,this._get=function(e){return new Promise(function(n,r){var t="data:"===e.substr(0,5);if(this.sourceCache[e])n(this.sourceCache[e]);else if(f.offline&&!t)r(new Error("Cannot make network requests in offline mode"));else if(t){var o=/^data:application\/json;([\w=:"-]+;)*base64,/,i=e.match(o);if(i){var a=i[0].length,s=e.substr(a),u=this._atob(s);this.sourceCache[e]=u,n(u)}else r(new Error("The encoding of the inline sourcemap is not supported"))}else{var c=this.ajax(e,{method:"get"});this.sourceCache[e]=c,c.then(n,r)}}.bind(this))},this._getSourceMapConsumer=function(n,r){return new Promise(function(t,i){if(this.sourceMapConsumerCache[n])t(this.sourceMapConsumerCache[n]);else{var a=new Promise(function(t,i){return this._get(n).then(function(n){"string"==typeof n&&(n=o(n.replace(/^\)\]\}'/,""))),"undefined"==typeof n.sourceRoot&&(n.sourceRoot=r),t(new e.SourceMapConsumer(n))},i)}.bind(this));this.sourceMapConsumerCache[n]=a,t(a)}}.bind(this))},this.pinpoint=function(e){return new Promise(function(n,r){this.getMappedLocation(e).then(function(e){function r(){n(e)}this.findFunctionName(e).then(n,r)["catch"](r)}.bind(this),r)}.bind(this))},this.findFunctionName=function(e){return new Promise(function(r,t){s(e),this._get(e.fileName).then(function(t){var o=e.lineNumber,a=e.columnNumber,s=i(t,o,a);r(s?new n({functionName:s,args:e.args,fileName:e.fileName,lineNumber:o,columnNumber:a}):e)},t)["catch"](t)}.bind(this))},void(this.getMappedLocation=function(e){return new Promise(function(n,r){a(),s(e);var t=this.sourceCache,o=e.fileName;this._get(o).then(function(r){var i=u(r),a="data:"===i.substr(0,5),s=o.substring(0,o.lastIndexOf("/")+1);return"/"===i[0]||a||/^https?:\/\/|^\/\//i.test(i)||(i=s+i),this._getSourceMapConsumer(i,s).then(function(r){return c(e,r,t).then(n)["catch"](function(){n(e)})})}.bind(this),r)["catch"](r)}.bind(this))})):new l(f)}})},{"source-map/lib/source-map-consumer":9,stackframe:3}],12:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stacktrace",["error-stack-parser","stack-generator","stacktrace-gps"],i):"object"==typeof t?r.exports=i(n("error-stack-parser"),n("stack-generator"),n("stacktrace-gps")):o.StackTrace=i(o.ErrorStackParser,o.StackGenerator,o.StackTraceGPS)}(this,function(e,n,r){function t(e,n){var r={};return[e,n].forEach(function(e){for(var n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);return r}),r}function o(e){return e.stack||e["opera#sourceloc"]}function i(e,n){return"function"==typeof n?e.filter(n):e}var a={filter:function(e){return(e.functionName||"").indexOf("StackTrace$$")===-1&&(e.functionName||"").indexOf("ErrorStackParser$$")===-1&&(e.functionName||"").indexOf("StackTraceGPS$$")===-1&&(e.functionName||"").indexOf("StackGenerator$$")===-1},sourceCache:{}},s=function(){try{throw new Error}catch(e){return e}};return{get:function(e){var n=s();return o(n)?this.fromError(n,e):this.generateArtificially(e)},getSync:function(r){r=t(a,r);var u=s(),c=o(u)?e.parse(u):n.backtrace(r);return i(c,r.filter)},fromError:function(n,o){o=t(a,o);var s=new r(o);return new Promise(function(r){var t=i(e.parse(n),o.filter);r(Promise.all(t.map(function(e){return new Promise(function(n){function r(){n(e)}s.pinpoint(e).then(n,r)["catch"](r)})})))}.bind(this))},generateArtificially:function(e){e=t(a,e);var r=n.backtrace(e);return"function"==typeof e.filter&&(r=r.filter(e.filter)),Promise.resolve(r)},instrument:function(e,n,r,t){if("function"!=typeof e)throw new Error("Cannot instrument non-function object");if("function"==typeof e.__stacktraceOriginalFn)return e;var i=function(){try{return this.get().then(n,r)["catch"](r),e.apply(t||this,arguments)}catch(i){throw o(i)&&this.fromError(i).then(n,r)["catch"](r),i}}.bind(this);return i.__stacktraceOriginalFn=e,i},deinstrument:function(e){if("function"!=typeof e)throw new Error("Cannot de-instrument non-function object");return"function"==typeof e.__stacktraceOriginalFn?e.__stacktraceOriginalFn:e},report:function(e,n,r,t){return new Promise(function(o,i){var a=new XMLHttpRequest;if(a.onerror=i,a.onreadystatechange=function(){4===a.readyState&&(a.status>=200&&a.status<400?o(a.responseText):i(new Error("POST to "+n+" failed with status: "+a.status)))},a.open("post",n),a.setRequestHeader("Content-Type","application/json"),t&&"object"==typeof t.headers){var s=t.headers;for(var u in s)s.hasOwnProperty(u)&&a.setRequestHeader(u,s[u])}var c={stack:e};void 0!==r&&null!==r&&(c.message=r),a.send(JSON.stringify(c))})}}})},{"error-stack-parser":1,"stack-generator":2,"stacktrace-gps":11}]},{},[12])(12)});


},{}],9:[function(require,module,exports){
class FileMap {
    constructor(){this.sidesList=[];}
    add(sides) {// {sideA:path, sideB:path}
        this.sidesList.push(sides);
    }
    convert(path, fromSide, toSide) {
        for (let sides of this.sidesList) {
            if (path.startsWith(sides[fromSide])) {
                return sides[toSide]+path.substring(sides[fromSide].length);
            }
        }
        return path;
    }
}
module.exports=FileMap;

},{}],10:[function(require,module,exports){
/*global Worker*/
// Browser Side
let idseq=0;
class Wrapper {
    constructor(worker) {
        const t=this;
        t.idseq=1;
        t.queue={};
        t.worker=worker;
        t.readyQueue=[];
        worker.addEventListener("message",function (e) {
            var d=e.data;
            if (d.reverse) {
                t.procReverse(e);
            } else if (d.ready) {
                t.ready();
            } else if (d.id) {
                t.queue[d.id](d);
                delete t.queue[d.id];
            }
        });
        t.run("WorkerService/isReady").then(function (r) {
            if (r) t.ready();
        });
    }
    procReverse(e) {
        const t=this;
        var d=e.data;
        var id=d.id;
        var path=d.path;
        var params=d.params;
        try {
            Promise.resolve(paths[path](params)).then(function (r) {
                t.worker.postMessage({
                    reverse:true,
                    status:"ok",
                    id:id,
                    result: r
                });
            },sendError);
        } catch(err) {
            sendError(err);
        }
        function sendError(e) {
            e=Object.assign({name:e.name, message:e.message, stack:e.stack},e||{});
            try {
                const j=JSON.stringify(e);
                e=JSON.parse(j);
            } catch(je) {
                e=e ? e.message || e+"" : "unknown";
                console.log("WorkerServiceW", je, e);
            }
            t.worker.postMessage({
                reverse: true,
                id:id, error:e, status:"error"
            });
        }
    }
    ready() {
        const t=this;
        if (t.isReady) return;
        t.isReady=true;
        console.log("Worker is ready!");
        t.readyQueue.forEach(function (f){ f();});
    }
    readyPromise() {
        const t=this;
        return new Promise(function (succ) {
            if (t.isReady) return succ();
            t.readyQueue.push(succ);
        });
    }
    run(path, params) {
        const t=this;
        return t.readyPromise().then(function() {
            return new Promise(function (succ,err) {
                var id=t.idseq++;
                t.queue[id]=function (e) {
                    //console.log("Status",e);
                    if (e.status=="ok") {
                        succ(e.result);
                    } else {
                        err(e.error);
                    }
                };
                t.worker.postMessage({
                    id: id,
                    path: path,
                    params: params
                });
            });
        });
    }
    terminate() {
        const t=this;
        t.worker.terminate();
    }
}
var paths={};
const WorkerService={
    Wrapper:Wrapper,
    load: function (src) {
        var w=new Worker(src);
        return new Wrapper(w);
    },
    install: function (path, func) {
        paths[path]=func;
    },
    serv: function (path,func) {
        this.install(path,func);
    }
};
WorkerService.serv("console/log", function (params){
    console.log.apply(console,params);
});
module.exports=WorkerService;

},{}],11:[function(require,module,exports){
/*global window,self,global*/
(function (deps, factory) {
    module.exports=factory();
})([],function (){
    if (typeof window!=="undefined") return window;
    if (typeof self!=="undefined") return self;
    if (typeof global!=="undefined") return global;
    return (function (){return this;})();
});

},{}],12:[function(require,module,exports){
/*define(function (require,exports,module) {
    const F=require("ProjectFactory");
    const root=require("root");
    const SourceFiles=require("SourceFiles");
    const langMod=require("langMod");
    */
    const F=require("./ProjectFactory");
    const root=require("../lib/root");
    const SourceFiles=require("../lang/SourceFiles");
    //const A=require("../lib/assert");
    const langMod=require("../lang/langMod");

    F.addType("compiled",params=> {
        if (params.namespace && params.url) return urlBased(params);
        if (params.dir) return dirBased(params);
        console.error("Invalid compiled project", params);
        throw new Error("Invalid compiled project");
    });
    function urlBased(params) {
        const ns=params.namespace;
        const url=params.url;
        const res=F.createCore();
        return res.include(langMod).include({
            getNamespace:function () {return ns;},
            loadClasses: async function (ctx) {
                console.log("Loading compiled classes ns=",ns,"url=",url);
                await this.loadDependingClasses();
                const s=SourceFiles.add({url});
                await s.exec();
                console.log("Loaded compiled classes ns=",ns,"url=",url);
            },
        });
    }
    function dirBased(params) {
        const res=F.createDirBasedCore(params);
        return res.include(langMod).include({
            loadClasses: async function (ctx) {
                console.log("Loading compiled classes params=",params);
                await this.loadDependingClasses();
                const outJS=this.getOutputFile();
                const map=outJS.sibling(outJS.name()+".map");
                const sf=SourceFiles.add({
                    text:outJS.text(),
                    sourceMap:map.exists() && map.text(),
                });
                await sf.exec();
                console.log("Loaded compiled classes params=",params);
            }
        });
    }
    exports.create=params=>F.create("compiled",params);
    F.addDependencyResolver((prj, spec)=> {
        if (spec.dir && prj.resolve) {
            return F.create("compiled",{dir:prj.resolve(spec.dir)});
        }
        if (spec.namespace && spec.url) {
            return F.create("compiled",spec);
        }
    });
//});/*--end of define--*/

},{"../lang/SourceFiles":4,"../lang/langMod":6,"../lib/root":11,"./ProjectFactory":13}],13:[function(require,module,exports){
//define(function (require,exports,module) {
    // This factory will be widely used, even BitArrow.


    let Compiler, SourceFiles,sysMod,run2Mod;
    const  resolvers=[],types={};
    exports.addDependencyResolver=(f)=>{
        //f: (prj, spec) => prj
        resolvers.push(f);
    };
    exports.addType=(n,f)=>{
        types[n]=f;
    };
    exports.fromDependencySpec=function (prj,spec) {
        for (let f of resolvers) {
            const res=f(prj,spec);
            if (res) return res;
        }
        console.error("Invalid dep spec", spec);
        throw new Error("Invalid dep spec", spec);
        /* else if (typeof dprj=="object") {
            return this.create("compiled", {
                namespace:dprj.namespace,
                url: FS.expandPath(dprj.compiledURL)
            });
        }*/
    };
    exports.create=function (type,params) {
        if (!types[type]) throw new Error(`Invalid type ${type}`);
        return types[type](params);
    };
    class ProjectCore {
        getPublishedURL(){}//override in BAProject
        getOptions(opt) {return {};}//stub
        getName() {
            return this.dir.name().replace(/\/$/,"");
        }
        getDependingProjects() {
            var opt=this.getOptions();
            var dp=(opt.compiler && opt.compiler.dependingProjects) || [];
            return dp.map(dprj=>
                ProjectCore.factory.fromDependencySpec(this,dprj)
            );
        }
        include(mod) {
            for (let k of Object.getOwnPropertyNames(mod)) {
                if (typeof mod[k]==="function") this[k]=mod[k];
            }
            return this;
        }
        delegate(obj) {
            if (obj.constructor.prototype) {
                const add=k=>{
                    if (typeof obj[k]==="function") this[k]=(...args)=>obj[k](...args);
                };
                for (let k of Object.getOwnPropertyNames(obj.constructor.prototype)) add(k);
            }
            return this;
        }
    }
    ProjectCore.factory=exports;
    exports.createCore=()=>new ProjectCore();
    const dirBasedMod={
        getDir() {return this.dir;},
        resolve(rdir){// not in compiledProject
            if (rdir instanceof Array) {
                var res=[];
                rdir.forEach(function (e) {
                    res.push(this.resolve(e));
                });
                return res;
            }
            if (typeof rdir=="string") {
                /*global FS*/ //TODO
                if (typeof FS!=="undefined") {
                    return FS.resolve(rdir, this.getDir().path());
                } else {
                    return this.getDir().rel(rdir);
                }
            }
            if (!rdir || !rdir.isDir) throw new Error("Cannot TPR.resolve: "+rdir);
            return rdir;
        },
        getOptions(opt) {
            return this.getOptionsFile().obj();
        },
        getOptionsFile() {// not in compiledProject
            var resFile=this.dir.rel("options.json");
            return resFile;
        },
        setOptions(opt) {// not in compiledProject
            return this.getOptionsFile().obj(opt);
        },
        fixOptions(TPR,opt) {// required in BAProject
            if (!opt.compiler) opt.compiler={};
        },
        getOutputFile(lang) {// not in compiledProject
            var opt=this.getOptions();
            var outF=this.resolve(opt.compiler.outputFile||"js/concat.js");
            if (outF.isDir()) {
                throw new Error("out: directory style not supported");
            }
            return outF;
        },
        removeOutputFile() {// not in compiledProject
            this.getOutputFile().rm();
        },
        path(){return this.dir.path();},// not in compiledProject
        getEXT() {throw new Error("getEXT must be overriden.");},//stub
        sourceFiles() {
            const res={};
            const ext=this.getEXT();
    		this.dir.recursive(collect);
    		function collect(f) {
    			if (f.endsWith(ext)) {
    				var nb=f.truncExt(ext);
    				res[nb]=f;
    			}
    		}
    		return res;
        }
    };
    exports.createDirBasedCore=function (params) {
        const res=this.createCore();
        res.dir=params.dir;
        return res.include(dirBasedMod);
    };
//});/*--end of define--*/

},{}]},{},[2])(2)
});

define('ProjectFactory',['require','exports','module','BuilderClient','Util','DeferredUtil','WebSite','FS'],function (require, exports, module) {
    const BuilderClient=require("BuilderClient");
    const F=BuilderClient.ProjectFactory;
    const Util=require("Util");
    const DU=require("DeferredUtil");
    const WebSite=require("WebSite");
    const FS=require("FS");
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
            getPublishedURL: async function () {//ADDBA
                const TPR=this;
                if (TPR._publishedURL) return (TPR._publishedURL);
                const Auth=await DU.requirejs(["Auth"]);
                const hash=await Auth.getHash(TPR.getName()+"/");
                const r=FS.PathUtil.truncSEP(WebSite.pub_in_top)+"/"+hash;
                TPR._publishedURL=r;
                return r;
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

define('LanguageList',['require','exports','module'],function (require, exports, module) {
    module.exports={
        "js":{en:"JavaScript",ja:"JavaScript",builder:"TJSBuilder",
            helpURL:"http://bitarrow.eplang.jp/index.php?javascript",mode:"ace/mode/tonyu"},
        "dtl":{en:"Dolittle", ja:"ドリトル",builder:"DtlBuilder",
            helpURL:"http://bitarrow.eplang.jp/index.php?dolittle_use"},
        "c":{en:"C", ja:"C",builder:"CBuilder",
            helpURL:"http://bitarrow.eplang.jp/index.php?c_use", mode:"ace/mode/c_cpp"},
        "dncl":{en:"DNCL", ja:"DNCL(どんくり)",builder:"DnclBuilder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?dncl_use"},
        "dncl2":{en:"DNCL2", ja:"DNCL2(どんくり2)",builder:"Dncl2Builder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?dncl2_use"},
        "py": {en:"Python", ja:"Python",builder:"PythonBuilder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?python",mode:"ace/mode/python"},
        "tonyu":{en:"Tonyu", ja:"Tonyu",builder:"TonyuBuilder",
            helpURL:"http://bitarrow.eplang.jp/index.php?tonyu",mode:"ace/mode/tonyu"},
        //"php":{en:"PHP", ja:"PHP",builder:"PHPBuilder",
        //    helpURL:"http://bitarrow.eplang.jp/index.php?php",mode:"ace/mode/php"},
        "p5.js":{en:"p5.js", ja:"p5.js",builder:"P5Builder",
            helpURL:"http://bitarrow.eplang.jp/index.php?p5",mode:"ace/mode/javascript"},
            // lang <= 10
        "p5.py":{en:"p5Python", ja:"p5 Python mode",builder:"p5pyBuilder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?p5",mode:"ace/mode/python"},
        "bry":{//ext:"py",// not working now
            en:"brython(Beta)", ja:"Brython(試験運用中)",builder:"BrythonBuilder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?python",mode:"ace/mode/python"},
        /*"ras.py": {//ext:"py",// not working now
            en: "Raspi-Pico(Beta)", ja:"Raspi-Pico(試験運用中)",builder:"raspiBuilder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?python",mode:"ace/mode/python"},*/
    };
});

define('NewProjectDialog',["UI","FS","ProjectFactory","LanguageList"], function (UI,FS,F,languageList) {
    var res={};
	res.show=function (prjInfo, onOK,options) {
    	var d=res.embed(prjInfo,onOK,options);
    	d.dialog({width:600});
	};
	res.embed=function (prjInfo, onOK, options) {
	    if (!options) options={};
        if (!res.d) {
            var FType={
                fromVal: function (val){
                    return val=="" ? null : FS.get(val);
                },
                toVal: function (v){ return v ? v.path() : "";}
            };
        	res.d=UI("div",{title:(options.ren?"プロジェクト名の変更":"新規プロジェクト")},
        			["div",
        			 ["span","プロジェクト名"],
        			 ["input",{$edit:"name",id:"prjName",value:options.defName||"",
        			     on:{enterkey:function () {
                		     res.d.done();
				 }}}]],
				["div",
        			 ["span","プログラミング言語"],
        			 ["select",{$var:"lang",$edit:"lang",id:"prjLang"},
        			 ["option",{selected:"selected",value:"select"},"言語を選択してください"],
        			 /*["option",{value:"js"},"JavaScript"],
        			 ["option",{value:"dtl"},"ドリトル"],
        			 ["option",{value:"c"},"C"],
                     ["option",{value:"py"},"Python"],
                     ["option",{value:"php"},"PHP"],
                     ["option",{value:"dncl"},"DNCL(どんくり)"]*/
                    ]
				],
         		/*	["div",{css:{"display":"none"}},
        			 ["span","親フォルダ"],
        			 ["input",{$edit:{name:"parentDir",type:FType}}]],
        			 ["div",{css:{"display":"none"}},
        			   ["span","作成先フォルダ："],
        			   ["span",{$var:"dstDir"}]
        			  ],*/
                 ["div", {$var:"validationMessage", css:{color:"red"}}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]
            );
            //if (localStorage.noconcat) {
                //res.d.$vars.lang.append(UI("option",{value:"py"},"Python"));
            for (let ext in languageList) {
                res.d.$vars.lang.append(UI("option",{value:ext},languageList[ext].ja));
            }
            //}
        }
        var d=res.d;
        var model={name:options.defName||"",lang:"select"};
        d.$edits.load(model);
    	d.$edits.validator.on.validate=function (model) {
    		if (model.name=="") {
    			this.addError("name","名前を入力してください");
    			return;
    		}
    		if (model.name.match(/[^a-zA-Z0-9_]+/)) {
    			this.addError("name","プロジェクト名は英数字とアンダーバー(_)を組み合わせたものにしてください");
    			return;
    		}
            if (prjInfo.findProject(model.name) ) {
                this.addError("name","このプロジェクトはすでに存在します");
                return;
            }
            if(model.lang=="select"){
                this.addError("lang","言語を選択してください");
                return;
            }
    		this.allOK();
    		//d.$vars.dstDir.text(model.dstDir+"");
    	};
    	d.done=function () {
    	    if (d.$edits.validator.isValid()) {
                onOK(model);
                d.dialog("close");
    	    }
    	};
    	return d;
    };
    res.create=function (projectsDir,model) {
	    console.log(model);
	    var prjDir=projectsDir.rel(model.name+"/");
        prjDir.mkdir();
        F.create("ba",{dir:prjDir}).setOptions({
            /*compiler:{
                namespace:"user",
                outputFile:"js/concat.js",
                defaultSuperClass:"jslker.Parent",
                dependingProjects:[
                     {"namespace":"jslker", "compiledURL":"${JSLKer}"}
                    // {"namespace":"jslker", "compiledURL":"${JSLKer}/js/concat.js"}
                ]
            },*/ // moved to TJSBuilder
    		language:model.lang
        });
    };
    return res;
});

define('DragDrop',["FS","root"],function (FS,root) {
    var DU=FS.DeferredUtil;
    var SFile=FS.SFile;
    var DragDrop={};
    DragDrop.readFile=function (file) {
        return DU.promise(function (succ) {
            var reader = new FileReader();
            reader.onload = function() {
                succ(reader);
            };
            reader.readAsArrayBuffer(file);
        });
    };
    DragDrop.CancelReason=function(r){
        if (this instanceof DragDrop.CancelReason) {
            this.reason=r;
        } else {
            return new DragDrop.CancelReason(r);
        }
    };
    DragDrop.accept=function (dom, fdst,options) {
        var useTmp;
        if (!SFile.is(fdst)) {
            options=fdst||options;
            useTmp="/dd-ram/"+Math.random()+"/";
            FS.mount(useTmp,"ram");
            fdst=FS.get(useTmp);
            console.log("Mount",useTmp);
        }
        options=options||{};
        options.draggingClass=options.draggingClass||"dragging";
        dom.on("dragover",over);
        dom.on("dragenter",enter);
        dom.on("dragleave",leave);
        dom.on("drop",dropAdd);
        if (!options.onCheckFile) {
            options.onCheckFile=function (f) {
                if (options.overwrite) {
                    return f;
                } else {
                    if (f.exists()) return false;
                    return f;
                }
            };
        }
        if (!options.onCheckFiles) {
            options.onCheckFiles=function (fileEnt) {
                return fileEnt;
            };
        }
        if (!options.onError) {
            options.onError=function (e) {
                console.error(e);
            };
        }
        function dropAdd(e) {
            var dst=fdst;
            if (typeof dst==="function") dst=dst();
            dom.removeClass(options.draggingClass);
            var status={};
            var eo=e.originalEvent;
            e.stopPropagation();
            e.preventDefault();
            var files = Array.prototype.slice.call(eo.dataTransfer.files);
            var added=[],cnt=files.length;
            var fileSet=files.map(function (file) {
                var itemName=file.name;
                var dstFile=dst.rel(itemName);
                return {dst:dstFile,src:file,name:itemName};
            });
            DU.resolve(
                options.onCheckFiles(fileSet)
            ).then(function (fileSet) {
                return DU.each(fileSet,function (fileEnt) {
                    var name=fileEnt.name;
                    var dstFile=fileEnt.dst ,actFile;
                    var srcFile=fileEnt.src;
                    return DU.resolve(
                        options.onCheckFile(dstFile,srcFile)
                    ).then(function (cr) {
                        if (cr===false || cr instanceof DragDrop.CancelReason) {
                            status[dstFile.path()]={
                                file:dstFile,
                                status:"cancelled",
                                reason: cr.reason
                            };
                            return;
                        }
                        if (SFile.is(cr)) actFile=cr;
                        else actFile=dstFile;
                        return DragDrop.readFile(srcFile).then(function (reader) {
                            var fileContent=reader.result;
                            actFile.setBytes(fileContent);
                            status[dstFile.path()]={
                                file:dstFile,
                                status:"uploaded"
                            };
                            if (actFile.path()!==dstFile.path()) {
                                status[dstFile.path()].redirectedTo=actFile;
                            }
                        });
                    });
                });
            }).then(function () {
                if (options.onComplete) return options.onComplete(status);
            }).catch(function (e) {
                options.onError(e);
            }).done(function () {
                /*if (useTmp) {
                    FS.unmount(useTmp);
                    console.log("Umount",useTmp);
                }*/
            });
            return false;
        }
        function over(e) {
            e.stopPropagation();
            e.preventDefault();
        }
        var entc=0;
        function enter(e) {
            var eo=e.originalEvent;
            entc++;
            dom.addClass(options.draggingClass);
        }
        function leave(e) {
            var eo=e.originalEvent;
            //console.log("leave",eo.target.innerHTML,e);
            entc--;
            if (entc<=0) dom.removeClass(options.draggingClass);
        }
    };
    root.DragDrop=DragDrop;
    return DragDrop;
});

define('ProgramFileUploader',["FS","DragDrop","root","UI","LanguageList","Sync","ProjectFactory"],
function (FS,DragDrop,root,UI,LL,Sync,PF) {
    var P=FS.PathUtil;
    function getExt(f) {
        if (typeof f.name==="function") f=f.name();
        const a=f.split(".");
        a.shift();
        return "."+a.join(".");
    }
    var ProgramFileUploader={
        acceptingEXT(prj) {
            const acext={".html":1};
            acext[prj.getEXT()]=1;
            return acext;
        },
        accept(fileList,prj) {
            //options=options||{};
            //extPattern=options.extPattern||/.*/;
            const acext=ProgramFileUploader.acceptingEXT(prj);
            const EXT=prj.getEXT(), HEXT=".html";
            DragDrop.accept(fileList.elem, {
                onCheckFile: function (dst,file) {
                    if (!acext[getExt(file.name)]) {
                        return DragDrop.CancelReason(file.name+": このファイルは追加できません");
                    }
                    if (dst.exists()) {
                        return DragDrop.CancelReason(file.name+": 同名のファイルがあるため中止しました．");
                    }
                    return dst;
                },
                onComplete: function (status) {
                    var dstDir=fileList.curDir();
                    for (var k in status) {
                        if (status[k].status==="uploaded") {
                            var srcFile=status[k].file;
                            var srcDir=srcFile.up();
                            var name=srcFile.truncExt();//.p5.js
                            var srcPfile=srcDir.rel(name+EXT);
                            var dstPfile=dstDir.rel(name+EXT);
                            var srcHfile=srcDir.rel(name+HEXT);
                            var dstHfile=dstDir.rel(name+HEXT);
                            if (!srcPfile.exists()) {
                                srcPfile.text("");
                            }
                            if (!srcHfile.exists()) {
                                srcHfile.text("");
                            }
                            if (!dstPfile.exists()) {
                                dstPfile.copyFrom(srcPfile);
                            }
                            if (!dstHfile.exists()) {
                                dstHfile.copyFrom(srcHfile);
                            }
                        }
                    }
                    console.log(status);
                    fileList.ls();
                }
            });
        },

        addMissingFiles(prj, options) {
            const fileNames=prj.sourceFiles();
            const EXT=prj.getEXT(), HEXT=".html";

            for (let name in fileNames) {
                const file=fileNames[name];
                const pfile=file.sibling(name+EXT);
                const hfile=file.sibling(name+HEXT);
                if (!pfile.exists()) pfile.text("");
                if (!hfile.exists()) hfile.text("");
            }
        },
        fromZip(zipFile, projectsDir) {
            FS.zip.unzip(zipFile);

        }
    };
    FS.mount("/ram/","ram");
    //var zip=FS.zip;
    const tmpDir=FS.get("/ram/");

    class ZipImporter {
        constructor(dir, elem, options) {
            const t=this;
            t.elem=elem;
            t.dir=dir;
            t.tmpDir=tmpDir.rel(dir.name());
            options=options||{};
            t.onComplete=options.onComplete;
            if (t.elem) t.prepareDragDrop();
        }
        prepareDragDrop() {
            const t=this;
            DragDrop.accept(t.elem, t.tmpDir, {
                onComplete: async function (status) {
                    t.showDialog();
                    var ctx={imported:0, from:"dragDrop"};
                    try {
                        await t.acceptDrag(status,ctx);
                        t.closeDialog();
                        if (t.onComplete) t.onComplete(ctx);
                    } catch (e) {
                        t.closeDialog();
                        console.error(e);
                        alert(e);
                    }
                }
            });
        }
        async acceptDrag(status,ctx) {
            const t=this;
            for (let k in status) {
                const s=status[k];
                //s.file;
                //s.status;
                if (s.status==="uploaded" && s.file.ext()===".zip") {
                    await t.unzip(s.file,ctx);
                }
            }
            console.log("End acceptDrag");
        }
        showDialog(mesg) {
            const t=this;
            mesg=mesg||R("importingFromZip");
            if (!t.dialog) {
                t.dialog=UI("div",{title:R("importFromZip")},
                    ["span",{$var:"mesg"}, mesg]
                );
                t.mesg=t.dialog.$vars.mesg;
            } else {
                t.mesg.text(mesg);
            }
            if (!t.dialogOpened) {
                t.dialog.dialog({modal:true});
            }
            t.dialogOpened=true;
        }
        closeDialog() {
            const t=this;
            if (t.dialog) {
                t.dialog.dialog("close");
                t.dialogOpened=false;
            }
        }
        unzip(file,ctx) {
            // ctx.dstDir is set when fromPrjB, /Tonyu/Project/prjfile_0.00/
            const t=this;
            t.showDialog(R("unzipping",file.name()));
            var zipexdir=t.tmpDir.rel(file.truncExt()+"/");
            var opt={
                progress: function (file) {
                    t.showDialog(R("unzipping",file.name()));
                    return new Promise(s=>setTimeout(s,0));
                }
            };
            return FS.zip.unzip(file, zipexdir,opt ).then(function () {
                if (ctx.rel) {
                    zipexdir=zipexdir.rel(ctx.rel);
                    if (!zipexdir.exists()) {
                        return ctx;
                    }
                }
                return t.traverse(zipexdir,ctx);
            });
        }
        async traverse(dir,ctx) {
            const t=this;
            ctx=ctx||{};
            ctx.imported=ctx.imported||0;
            let imported=false;
            for (let f of dir.listFiles()) {
                t.showDialog(R("checking file",f.name()));
                if (f.isDir()) continue;
                if (f.name()==="options.json") {
                    ctx.imported++;
                    imported=true;
                    await t.importFrom(f.up(),ctx);
                } else {
                    const ext=getExt(f) && getExt(f).replace(/^\./,"");
                    if (LL[ext] && !ctx.detected) {
                        ctx.detected={ext, dir};
                    }
                }
            }
            if (!imported) {
                for (let f of dir.listFiles()) {
                    t.showDialog(R("checking dir",f.name()));
                    if (f.isDir()) {
                        await t.traverse(f,ctx);
                    }
                }
            }
            if (ctx.imported===0 && ctx.detected) {
                ctx.detected.dir.rel("options.json").obj({lang:ctx.detected.ext});
                await t.importFrom(ctx.detected.dir, ctx);
            }
            return ctx;
        }
        async importFrom(src,ctx) {
            const t=this;
            var dst;
            var dstParent=t.dir;
            var nameT=FS.PathUtil.truncSEP(src.name());
            if (nameT==="src") {
                nameT=FS.PathUtil.truncSEP(src.up().name());
            }
            var name=nameT+"/";
            dst=dstParent.rel(name);
            var i=2;
            while (dst.exists()) {
                name=nameT+i+"/";
                i++;
                dst=dstParent.rel(name);
            }
            t.showDialog(R("copying",src.name(),dst.name()));
            console.log("importFrom",src.path(), "to", dst.path());
            const sync=src.rel(".sync/");
            if (sync.exists()) {
                sync.rm({r:1});
            }
            await src.copyTo(dst);

            const curPrj=PF.create("ba",{dir:dst});

            ProgramFileUploader.addMissingFiles(curPrj);
            t.showDialog("Syncing");
            const res=await Sync.sync(dst,dst,{v:true});
            console.log("Copy done",res);
        }
    }
    function R(...args) {
        return args.join(" ");
    }


    root.ProgramFileUploader=ProgramFileUploader;
    ProgramFileUploader.ZipImporter=ZipImporter;
    return ProgramFileUploader;
});

define('AssetDialog',["Klass","UI","ctrl","WebSite","DragDrop","root"],
function (Klass,UI,ctrl,WebSite,DragDrop,root) {
    //var res={};
    root.AssetDialog=Klass.define({
        $this: true,
        $: ["prj"],
        show: function (t) {
            t.createDOM();
            t.dom.dialog({width:600,height:500});
        },
        refresh: function (t,mesg) {
            console.log("refresh",mesg);
            ctrl.get("Asset/list2",{context:t.context}).then(function ({files, prefix, baseUrl}) {
                t.list.empty();
                files.forEach(function (fileName) {
                    //var fileName=u.replace(/[^\/]+\//,"");
                    var urlFull=baseUrl+fileName;// WebSite.published+u;
                    t.list.append(UI("tr",
                        ["td",
                            ["a",{href:urlFull, target:"asset"},`${t.context}/${fileName}`]],
                        ["td",
                            ["button",{on:{click:del}},"削除"]],
                    ));
                    function del() {
                        console.log("DEL",fileName);
                        ctrl.get("Asset/del",{fileName, context:t.context}).
                        then(t.$bind.refresh,err);
                    }
                });
            }).catch(err);
        },
        createDOM: function (t) {
            if (t.dom) return t.dom;
            var dragMsg="ここに素材ファイルをドラッグ＆ドロップして追加．";
            var notice="※プログラムファイルはこのページ左端のファイル一覧にドラッグ＆ドロップしてください．";
            var dragPoint=UI("div",
                {style:"margin:10px; padding-left:10px; padding-right:10px; padding-top:10px; padding-bottom:10px; border:solid blue 2px;"},
                dragMsg,["br"],
                notice,["br"]
            );
            function toggleB(ctx) {
                var cap={user:"(自分用)",class:"(クラスで共有)"};
                return ["button",{
                    $var:ctx,
                    on:{click:function() {
                        t.toggleContext(ctx);
                    }}},
                    ctx+cap[ctx]
                ];
            }
            t.dom=UI("div",{title:"素材管理"},
                ["div",
                    toggleB("user"),toggleB("class")
                ],
                ["div",{$var:"content"},
                    dragPoint,
                    ["table",{$var:"list",style:"height: 300px; overflow-y:scroll"}]
                ]
            );
            DragDrop.accept(t.dom.$vars.content,{
                onComplete: t.$bind.complete, overwrite:true,
            });
            t.result=t.dom.$vars.result;
            t.comment=t.dom.$vars.comment;
            t.list=t.dom.$vars.list;
            //t.refresh();
            t.toggleContext("user");
            return t.dom;
        },
        toggleContext: function (t,ctx) {
            if (t.prevCtxBtn) t.prevCtxBtn.removeClass("selected");
            var b=t.dom.$vars[ctx];
            b.addClass("selected");
            t.prevCtxBtn=b;
            t.context=ctx;
            t.refresh();
        },
        complete: function (t,status) {
            var cnt=0;
            console.log("complete ",status);
            for (var k in status) {
                if (status[k].status!=="uploaded") continue;
                var file=status[k].file;
                //var fileContent=file.bytes();
                var blob=file.getBlob();//new Blob([fileContent],{type:"application/octet-stream"});
                cnt++;
                t.sendImageBinary(blob,file.name()).then(log,err).done(dec);
            }
            function log(r){console.log(r);}
            function err(r){console.error(r);}
            function dec() {
                cnt--;
                if (cnt<=0) t.refresh();
            }
        },
        sendImageBinary:function (t,blob,fn) {
            var formData = new FormData();
            formData.append('acceptImage', blob,fn);
            formData.append("context",t.context);
            return $.ajax({
                type: 'POST',
                url: ctrl.url("Asset/upload"),
                data: formData,
                contentType: false,
                processData: false
            });
        }
    });
    function err(e) {
        if (e&&e.responseText) console.error(e.responseText);
        console.error(e);
    }

    return root.AssetDialog;
});

define('Pos2RC',["Klass"],function (Klass){
return Klass.define({
    $: function(src,origin) {
        if (origin==null) this.origin=1;// or 0
        else this.origin=origin;
        var t=this;
        t.src=src;
        t.map=[];
    	t.lastRow=0;
        var pos=0;
    	src.split("\n").forEach(function (line) {
    		t.map.push(pos);
    		pos+=line.length+1;
    	});
    	t.map.push(t.pos);
    },
    getRC:function(pos) {
        var t=this;
        var origin=t.origin;
		while(true) {
			if (t.lastRow<0) {
                t.lastRow=0;
				return {row:origin, col:origin};
			}
			if (t.lastRow+1>=t.map.length) {
                t.lastRow=t.map.length-2;
				return {row:t.map.length+origin, col:origin};
			}
			//A(!( pos<map[lastRow]  &&  map[lastRow]<=pos ));
			//A(!( map[lastRow+1]<=pos  &&  pos<map[lastRow+1] ));
			if (pos<t.map[t.lastRow]) {
				t.lastRow--;
			} else if (t.map[t.lastRow+1]<=pos) {
				t.lastRow++;
			} else {
				return {row:t.lastRow+origin, col:pos-t.map[t.lastRow]+origin};
			}
		}
	},
    getPos: function (row,col) {
        // Although the class name Pos2RC.
        var t=this;
        var pos=0;
        var lines=t.src.split("\n");
        for (var i=0 ; i<lines.length && i+t.origin<row ; i++) {
            pos+=lines[i].length+1;
        }
        pos+=col-t.origin;
        return pos;
    },
    getAll: function (p) {
        if (typeof p==="object") {
            var n=this.getPos(p.row,p.col);
            return {pos:n, row:p.row, col:p.col};
        } else if (typeof p==="number"){
            var r=this.getRC(p);
            r.pos=p;
            return r;
        } else {
            throw new Error("Invalid position type: "+p);
        }
    }
});
});

define('UserAgent',["root"],function (root) {
    var ua = root.navigator.userAgent.toLowerCase();
    return {
        isIE: (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0),
        isFirefox:root.navigator.userAgent.indexOf("Firefox")>=0,
        isChrome:navigator.userAgent.indexOf("Chrome")>=0
    };
});

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define('stacktrace',[],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.StackTrace=e()}}(function(){var e;return function n(e,r,t){function o(a,s){if(!r[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[a]={exports:{}};e[a][0].call(l.exports,function(n){var r=e[a][1][n];return o(r?r:n)},l,l.exports,n,e,r,t)}return r[a].exports}for(var i="function"==typeof require&&require,a=0;a<t.length;a++)o(t[a]);return o}({1:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("error-stack-parser",["stackframe"],i):"object"==typeof t?r.exports=i(n("stackframe")):o.ErrorStackParser=i(o.StackFrame)}(this,function(e){"use strict";var n=/(^|@)\S+\:\d+/,r=/^\s*at .*(\S+\:\d+|\(native\))/m,t=/^(eval@)?(\[native code\])?$/;return{parse:function(e){if("undefined"!=typeof e.stacktrace||"undefined"!=typeof e["opera#sourceloc"])return this.parseOpera(e);if(e.stack&&e.stack.match(r))return this.parseV8OrIE(e);if(e.stack)return this.parseFFOrSafari(e);throw new Error("Cannot parse given Error object")},extractLocation:function(e){if(e.indexOf(":")===-1)return[e];var n=/(.+?)(?:\:(\d+))?(?:\:(\d+))?$/,r=n.exec(e.replace(/[\(\)]/g,""));return[r[1],r[2]||void 0,r[3]||void 0]},parseV8OrIE:function(n){var t=n.stack.split("\n").filter(function(e){return!!e.match(r)},this);return t.map(function(n){n.indexOf("(eval ")>-1&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var r=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),t=this.extractLocation(r.pop()),o=r.join(" ")||void 0,i=["eval","<anonymous>"].indexOf(t[0])>-1?void 0:t[0];return new e({functionName:o,fileName:i,lineNumber:t[1],columnNumber:t[2],source:n})},this)},parseFFOrSafari:function(n){var r=n.stack.split("\n").filter(function(e){return!e.match(t)},this);return r.map(function(n){if(n.indexOf(" > eval")>-1&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),n.indexOf("@")===-1&&n.indexOf(":")===-1)return new e({functionName:n});var r=/((.*".+"[^@]*)?[^@]*)(?:@)/,t=n.match(r),o=t&&t[1]?t[1]:void 0,i=this.extractLocation(n.replace(r,""));return new e({functionName:o,fileName:i[0],lineNumber:i[1],columnNumber:i[2],source:n})},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf("\n")>-1&&e.message.split("\n").length>e.stacktrace.split("\n").length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(n){for(var r=/Line (\d+).*script (?:in )?(\S+)/i,t=n.message.split("\n"),o=[],i=2,a=t.length;i<a;i+=2){var s=r.exec(t[i]);s&&o.push(new e({fileName:s[2],lineNumber:s[1],source:t[i]}))}return o},parseOpera10:function(n){for(var r=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,t=n.stacktrace.split("\n"),o=[],i=0,a=t.length;i<a;i+=2){var s=r.exec(t[i]);s&&o.push(new e({functionName:s[3]||void 0,fileName:s[2],lineNumber:s[1],source:t[i]}))}return o},parseOpera11:function(r){var t=r.stack.split("\n").filter(function(e){return!!e.match(n)&&!e.match(/^Error created at/)},this);return t.map(function(n){var r,t=n.split("@"),o=this.extractLocation(t.pop()),i=t.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(r=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===r||"[arguments not available]"===r?void 0:r.split(",");return new e({functionName:a,args:s,fileName:o[0],lineNumber:o[1],columnNumber:o[2],source:n})},this)}}})},{stackframe:3}],2:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stack-generator",["stackframe"],i):"object"==typeof t?r.exports=i(n("stackframe")):o.StackGenerator=i(o.StackFrame)}(this,function(e){return{backtrace:function(n){var r=[],t=10;"object"==typeof n&&"number"==typeof n.maxStackSize&&(t=n.maxStackSize);for(var o=arguments.callee;o&&r.length<t&&o.arguments;){for(var i=new Array(o.arguments.length),a=0;a<i.length;++a)i[a]=o.arguments[a];/function(?:\s+([\w$]+))+\s*\(/.test(o.toString())?r.push(new e({functionName:RegExp.$1||void 0,args:i})):r.push(new e({args:i}));try{o=o.caller}catch(s){break}}return r}}})},{stackframe:3}],3:[function(n,r,t){!function(n,o){"use strict";"function"==typeof e&&e.amd?e("stackframe",[],o):"object"==typeof t?r.exports=o():n.StackFrame=o()}(this,function(){"use strict";function e(e){return!isNaN(parseFloat(e))&&isFinite(e)}function n(e){return e.charAt(0).toUpperCase()+e.substring(1)}function r(e){return function(){return this[e]}}function t(e){if(e instanceof Object)for(var r=0;r<u.length;r++)e.hasOwnProperty(u[r])&&void 0!==e[u[r]]&&this["set"+n(u[r])](e[u[r]])}var o=["isConstructor","isEval","isNative","isToplevel"],i=["columnNumber","lineNumber"],a=["fileName","functionName","source"],s=["args"],u=o.concat(i,a,s);t.prototype={getArgs:function(){return this.args},setArgs:function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("Args must be an Array");this.args=e},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(e){if(e instanceof t)this.evalOrigin=e;else{if(!(e instanceof Object))throw new TypeError("Eval Origin must be an Object or StackFrame");this.evalOrigin=new t(e)}},toString:function(){var n=this.getFunctionName()||"{anonymous}",r="("+(this.getArgs()||[]).join(",")+")",t=this.getFileName()?"@"+this.getFileName():"",o=e(this.getLineNumber())?":"+this.getLineNumber():"",i=e(this.getColumnNumber())?":"+this.getColumnNumber():"";return n+r+t+o+i}};for(var c=0;c<o.length;c++)t.prototype["get"+n(o[c])]=r(o[c]),t.prototype["set"+n(o[c])]=function(e){return function(n){this[e]=Boolean(n)}}(o[c]);for(var l=0;l<i.length;l++)t.prototype["get"+n(i[l])]=r(i[l]),t.prototype["set"+n(i[l])]=function(n){return function(r){if(!e(r))throw new TypeError(n+" must be a Number");this[n]=Number(r)}}(i[l]);for(var f=0;f<a.length;f++)t.prototype["get"+n(a[f])]=r(a[f]),t.prototype["set"+n(a[f])]=function(e){return function(n){this[e]=String(n)}}(a[f]);return t})},{}],4:[function(e,n,r){function t(){this._array=[],this._set=Object.create(null)}var o=e("./util"),i=Object.prototype.hasOwnProperty;t.fromArray=function(e,n){for(var r=new t,o=0,i=e.length;o<i;o++)r.add(e[o],n);return r},t.prototype.size=function(){return Object.getOwnPropertyNames(this._set).length},t.prototype.add=function(e,n){var r=o.toSetString(e),t=i.call(this._set,r),a=this._array.length;t&&!n||this._array.push(e),t||(this._set[r]=a)},t.prototype.has=function(e){var n=o.toSetString(e);return i.call(this._set,n)},t.prototype.indexOf=function(e){var n=o.toSetString(e);if(i.call(this._set,n))return this._set[n];throw new Error('"'+e+'" is not in the set.')},t.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)},t.prototype.toArray=function(){return this._array.slice()},r.ArraySet=t},{"./util":10}],5:[function(e,n,r){function t(e){return e<0?(-e<<1)+1:(e<<1)+0}function o(e){var n=1===(1&e),r=e>>1;return n?-r:r}var i=e("./base64"),a=5,s=1<<a,u=s-1,c=s;r.encode=function(e){var n,r="",o=t(e);do n=o&u,o>>>=a,o>0&&(n|=c),r+=i.encode(n);while(o>0);return r},r.decode=function(e,n,r){var t,s,l=e.length,f=0,p=0;do{if(n>=l)throw new Error("Expected more digits in base 64 VLQ value.");if(s=i.decode(e.charCodeAt(n++)),s===-1)throw new Error("Invalid base64 digit: "+e.charAt(n-1));t=!!(s&c),s&=u,f+=s<<p,p+=a}while(t);r.value=o(f),r.rest=n}},{"./base64":6}],6:[function(e,n,r){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");r.encode=function(e){if(0<=e&&e<t.length)return t[e];throw new TypeError("Must be between 0 and 63: "+e)},r.decode=function(e){var n=65,r=90,t=97,o=122,i=48,a=57,s=43,u=47,c=26,l=52;return n<=e&&e<=r?e-n:t<=e&&e<=o?e-t+c:i<=e&&e<=a?e-i+l:e==s?62:e==u?63:-1}},{}],7:[function(e,n,r){function t(e,n,o,i,a,s){var u=Math.floor((n-e)/2)+e,c=a(o,i[u],!0);return 0===c?u:c>0?n-u>1?t(u,n,o,i,a,s):s==r.LEAST_UPPER_BOUND?n<i.length?n:-1:u:u-e>1?t(e,u,o,i,a,s):s==r.LEAST_UPPER_BOUND?u:e<0?-1:e}r.GREATEST_LOWER_BOUND=1,r.LEAST_UPPER_BOUND=2,r.search=function(e,n,o,i){if(0===n.length)return-1;var a=t(-1,n.length,e,n,o,i||r.GREATEST_LOWER_BOUND);if(a<0)return-1;for(;a-1>=0&&0===o(n[a],n[a-1],!0);)--a;return a}},{}],8:[function(e,n,r){function t(e,n,r){var t=e[n];e[n]=e[r],e[r]=t}function o(e,n){return Math.round(e+Math.random()*(n-e))}function i(e,n,r,a){if(r<a){var s=o(r,a),u=r-1;t(e,s,a);for(var c=e[a],l=r;l<a;l++)n(e[l],c)<=0&&(u+=1,t(e,u,l));t(e,u+1,l);var f=u+1;i(e,n,r,f-1),i(e,n,f+1,a)}}r.quickSort=function(e,n){i(e,n,0,e.length-1)}},{}],9:[function(e,n,r){function t(e){var n=e;return"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=n.sections?new a(n):new o(n)}function o(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=s.getArg(n,"version"),t=s.getArg(n,"sources"),o=s.getArg(n,"names",[]),i=s.getArg(n,"sourceRoot",null),a=s.getArg(n,"sourcesContent",null),u=s.getArg(n,"mappings"),l=s.getArg(n,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);t=t.map(String).map(s.normalize).map(function(e){return i&&s.isAbsolute(i)&&s.isAbsolute(e)?s.relative(i,e):e}),this._names=c.fromArray(o.map(String),!0),this._sources=c.fromArray(t,!0),this.sourceRoot=i,this.sourcesContent=a,this._mappings=u,this.file=l}function i(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function a(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=s.getArg(n,"version"),o=s.getArg(n,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new c,this._names=new c;var i={line:-1,column:0};this._sections=o.map(function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var n=s.getArg(e,"offset"),r=s.getArg(n,"line"),o=s.getArg(n,"column");if(r<i.line||r===i.line&&o<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=n,{generatedOffset:{generatedLine:r+1,generatedColumn:o+1},consumer:new t(s.getArg(e,"map"))}})}var s=e("./util"),u=e("./binary-search"),c=e("./array-set").ArraySet,l=e("./base64-vlq"),f=e("./quick-sort").quickSort;t.fromSourceMap=function(e){return o.fromSourceMap(e)},t.prototype._version=3,t.prototype.__generatedMappings=null,Object.defineProperty(t.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),t.prototype.__originalMappings=null,Object.defineProperty(t.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),t.prototype._charIsMappingSeparator=function(e,n){var r=e.charAt(n);return";"===r||","===r},t.prototype._parseMappings=function(e,n){throw new Error("Subclasses must implement _parseMappings")},t.GENERATED_ORDER=1,t.ORIGINAL_ORDER=2,t.GREATEST_LOWER_BOUND=1,t.LEAST_UPPER_BOUND=2,t.prototype.eachMapping=function(e,n,r){var o,i=n||null,a=r||t.GENERATED_ORDER;switch(a){case t.GENERATED_ORDER:o=this._generatedMappings;break;case t.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var u=this.sourceRoot;o.map(function(e){var n=null===e.source?null:this._sources.at(e.source);return null!=n&&null!=u&&(n=s.join(u,n)),{source:n,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}},this).forEach(e,i)},t.prototype.allGeneratedPositionsFor=function(e){var n=s.getArg(e,"line"),r={source:s.getArg(e,"source"),originalLine:n,originalColumn:s.getArg(e,"column",0)};if(null!=this.sourceRoot&&(r.source=s.relative(this.sourceRoot,r.source)),!this._sources.has(r.source))return[];r.source=this._sources.indexOf(r.source);var t=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,u.LEAST_UPPER_BOUND);if(o>=0){var i=this._originalMappings[o];if(void 0===e.column)for(var a=i.originalLine;i&&i.originalLine===a;)t.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o];else for(var c=i.originalColumn;i&&i.originalLine===n&&i.originalColumn==c;)t.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o]}return t},r.SourceMapConsumer=t,o.prototype=Object.create(t.prototype),o.prototype.consumer=t,o.fromSourceMap=function(e){var n=Object.create(o.prototype),r=n._names=c.fromArray(e._names.toArray(),!0),t=n._sources=c.fromArray(e._sources.toArray(),!0);n.sourceRoot=e._sourceRoot,n.sourcesContent=e._generateSourcesContent(n._sources.toArray(),n.sourceRoot),n.file=e._file;for(var a=e._mappings.toArray().slice(),u=n.__generatedMappings=[],l=n.__originalMappings=[],p=0,g=a.length;p<g;p++){var h=a[p],m=new i;m.generatedLine=h.generatedLine,m.generatedColumn=h.generatedColumn,h.source&&(m.source=t.indexOf(h.source),m.originalLine=h.originalLine,m.originalColumn=h.originalColumn,h.name&&(m.name=r.indexOf(h.name)),l.push(m)),u.push(m)}return f(n.__originalMappings,s.compareByOriginalPositions),n},o.prototype._version=3,Object.defineProperty(o.prototype,"sources",{get:function(){return this._sources.toArray().map(function(e){return null!=this.sourceRoot?s.join(this.sourceRoot,e):e},this)}}),o.prototype._parseMappings=function(e,n){for(var r,t,o,a,u,c=1,p=0,g=0,h=0,m=0,d=0,v=e.length,_=0,y={},w={},b=[],C=[];_<v;)if(";"===e.charAt(_))c++,_++,p=0;else if(","===e.charAt(_))_++;else{for(r=new i,r.generatedLine=c,a=_;a<v&&!this._charIsMappingSeparator(e,a);a++);if(t=e.slice(_,a),o=y[t])_+=t.length;else{for(o=[];_<a;)l.decode(e,_,w),u=w.value,_=w.rest,o.push(u);if(2===o.length)throw new Error("Found a source, but no line and column");if(3===o.length)throw new Error("Found a source and line, but no column");y[t]=o}r.generatedColumn=p+o[0],p=r.generatedColumn,o.length>1&&(r.source=m+o[1],m+=o[1],r.originalLine=g+o[2],g=r.originalLine,r.originalLine+=1,r.originalColumn=h+o[3],h=r.originalColumn,o.length>4&&(r.name=d+o[4],d+=o[4])),C.push(r),"number"==typeof r.originalLine&&b.push(r)}f(C,s.compareByGeneratedPositionsDeflated),this.__generatedMappings=C,f(b,s.compareByOriginalPositions),this.__originalMappings=b},o.prototype._findMapping=function(e,n,r,t,o,i){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[t]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[t]);return u.search(e,n,o,i)},o.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var n=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(n.generatedLine===r.generatedLine){n.lastGeneratedColumn=r.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}},o.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},r=this._findMapping(n,this._generatedMappings,"generatedLine","generatedColumn",s.compareByGeneratedPositionsDeflated,s.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(r>=0){var o=this._generatedMappings[r];if(o.generatedLine===n.generatedLine){var i=s.getArg(o,"source",null);null!==i&&(i=this._sources.at(i),null!=this.sourceRoot&&(i=s.join(this.sourceRoot,i)));var a=s.getArg(o,"name",null);return null!==a&&(a=this._names.at(a)),{source:i,line:s.getArg(o,"originalLine",null),column:s.getArg(o,"originalColumn",null),name:a}}}return{source:null,line:null,column:null,name:null}},o.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}))},o.prototype.sourceContentFor=function(e,n){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(e=s.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var r;if(null!=this.sourceRoot&&(r=s.urlParse(this.sourceRoot))){var t=e.replace(/^file:\/\//,"");if("file"==r.scheme&&this._sources.has(t))return this.sourcesContent[this._sources.indexOf(t)];if((!r.path||"/"==r.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},o.prototype.generatedPositionFor=function(e){var n=s.getArg(e,"source");if(null!=this.sourceRoot&&(n=s.relative(this.sourceRoot,n)),!this._sources.has(n))return{line:null,column:null,lastColumn:null};n=this._sources.indexOf(n);var r={source:n,originalLine:s.getArg(e,"line"),originalColumn:s.getArg(e,"column")},o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,s.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(o>=0){var i=this._originalMappings[o];if(i.source===r.source)return{line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},r.BasicSourceMapConsumer=o,a.prototype=Object.create(t.prototype),a.prototype.constructor=t,a.prototype._version=3,Object.defineProperty(a.prototype,"sources",{get:function(){for(var e=[],n=0;n<this._sections.length;n++)for(var r=0;r<this._sections[n].consumer.sources.length;r++)e.push(this._sections[n].consumer.sources[r]);return e}}),a.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},r=u.search(n,this._sections,function(e,n){var r=e.generatedLine-n.generatedOffset.generatedLine;return r?r:e.generatedColumn-n.generatedOffset.generatedColumn}),t=this._sections[r];return t?t.consumer.originalPositionFor({line:n.generatedLine-(t.generatedOffset.generatedLine-1),column:n.generatedColumn-(t.generatedOffset.generatedLine===n.generatedLine?t.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},a.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},a.prototype.sourceContentFor=function(e,n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r],o=t.consumer.sourceContentFor(e,!0);if(o)return o}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},a.prototype.generatedPositionFor=function(e){for(var n=0;n<this._sections.length;n++){var r=this._sections[n];if(r.consumer.sources.indexOf(s.getArg(e,"source"))!==-1){var t=r.consumer.generatedPositionFor(e);if(t){var o={line:t.line+(r.generatedOffset.generatedLine-1),column:t.column+(r.generatedOffset.generatedLine===t.line?r.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}},a.prototype._parseMappings=function(e,n){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var t=this._sections[r],o=t.consumer._generatedMappings,i=0;i<o.length;i++){var a=o[i],u=t.consumer._sources.at(a.source);null!==t.consumer.sourceRoot&&(u=s.join(t.consumer.sourceRoot,u)),this._sources.add(u),u=this._sources.indexOf(u);var c=t.consumer._names.at(a.name);this._names.add(c),c=this._names.indexOf(c);var l={source:u,generatedLine:a.generatedLine+(t.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(t.generatedOffset.generatedLine===a.generatedLine?t.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:c};this.__generatedMappings.push(l),"number"==typeof l.originalLine&&this.__originalMappings.push(l)}f(this.__generatedMappings,s.compareByGeneratedPositionsDeflated),f(this.__originalMappings,s.compareByOriginalPositions)},r.IndexedSourceMapConsumer=a},{"./array-set":4,"./base64-vlq":5,"./binary-search":7,"./quick-sort":8,"./util":10}],10:[function(e,n,r){function t(e,n,r){if(n in e)return e[n];if(3===arguments.length)return r;throw new Error('"'+n+'" is a required argument.')}function o(e){var n=e.match(v);return n?{scheme:n[1],auth:n[2],host:n[3],port:n[4],path:n[5]}:null}function i(e){var n="";return e.scheme&&(n+=e.scheme+":"),n+="//",e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}function a(e){var n=e,t=o(e);if(t){if(!t.path)return e;n=t.path}for(var a,s=r.isAbsolute(n),u=n.split(/\/+/),c=0,l=u.length-1;l>=0;l--)a=u[l],"."===a?u.splice(l,1):".."===a?c++:c>0&&(""===a?(u.splice(l+1,c),c=0):(u.splice(l,2),c--));return n=u.join("/"),""===n&&(n=s?"/":"."),t?(t.path=n,i(t)):n}function s(e,n){""===e&&(e="."),""===n&&(n=".");var r=o(n),t=o(e);if(t&&(e=t.path||"/"),r&&!r.scheme)return t&&(r.scheme=t.scheme),i(r);if(r||n.match(_))return n;if(t&&!t.host&&!t.path)return t.host=n,i(t);var s="/"===n.charAt(0)?n:a(e.replace(/\/+$/,"")+"/"+n);return t?(t.path=s,i(t)):s}function u(e,n){""===e&&(e="."),e=e.replace(/\/$/,"");for(var r=0;0!==n.indexOf(e+"/");){var t=e.lastIndexOf("/");if(t<0)return n;if(e=e.slice(0,t),e.match(/^([^\/]+:\/)?\/*$/))return n;++r}return Array(r+1).join("../")+n.substr(e.length+1)}function c(e){return e}function l(e){return p(e)?"$"+e:e}function f(e){return p(e)?e.slice(1):e}function p(e){if(!e)return!1;var n=e.length;if(n<9)return!1;if(95!==e.charCodeAt(n-1)||95!==e.charCodeAt(n-2)||111!==e.charCodeAt(n-3)||116!==e.charCodeAt(n-4)||111!==e.charCodeAt(n-5)||114!==e.charCodeAt(n-6)||112!==e.charCodeAt(n-7)||95!==e.charCodeAt(n-8)||95!==e.charCodeAt(n-9))return!1;for(var r=n-10;r>=0;r--)if(36!==e.charCodeAt(r))return!1;return!0}function g(e,n,r){var t=e.source-n.source;return 0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t||r?t:(t=e.generatedColumn-n.generatedColumn,0!==t?t:(t=e.generatedLine-n.generatedLine,0!==t?t:e.name-n.name))))}function h(e,n,r){var t=e.generatedLine-n.generatedLine;return 0!==t?t:(t=e.generatedColumn-n.generatedColumn,0!==t||r?t:(t=e.source-n.source,0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t?t:e.name-n.name))))}function m(e,n){return e===n?0:e>n?1:-1}function d(e,n){var r=e.generatedLine-n.generatedLine;return 0!==r?r:(r=e.generatedColumn-n.generatedColumn,0!==r?r:(r=m(e.source,n.source),0!==r?r:(r=e.originalLine-n.originalLine,0!==r?r:(r=e.originalColumn-n.originalColumn,0!==r?r:m(e.name,n.name)))))}r.getArg=t;var v=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,_=/^data:.+\,.+$/;r.urlParse=o,r.urlGenerate=i,r.normalize=a,r.join=s,r.isAbsolute=function(e){return"/"===e.charAt(0)||!!e.match(v)},r.relative=u;var y=function(){var e=Object.create(null);return!("__proto__"in e)}();r.toSetString=y?c:l,r.fromSetString=y?c:f,r.compareByOriginalPositions=g,r.compareByGeneratedPositionsDeflated=h,r.compareByGeneratedPositionsInflated=d},{}],11:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stacktrace-gps",["source-map","stackframe"],i):"object"==typeof t?r.exports=i(n("source-map/lib/source-map-consumer"),n("stackframe")):o.StackTraceGPS=i(o.SourceMap||o.sourceMap,o.StackFrame)}(this,function(e,n){"use strict";function r(e){return new Promise(function(n,r){var t=new XMLHttpRequest;t.open("get",e),t.onerror=r,t.onreadystatechange=function(){4===t.readyState&&(t.status>=200&&t.status<300||"file://"===e.substr(0,7)&&t.responseText?n(t.responseText):r(new Error("HTTP status: "+t.status+" retrieving "+e)))},t.send()})}function t(e){if("undefined"!=typeof window&&window.atob)return window.atob(e);throw new Error("You must supply a polyfill for window.atob in this environment")}function o(e){if("undefined"!=typeof JSON&&JSON.parse)return JSON.parse(e);throw new Error("You must supply a polyfill for JSON.parse in this environment")}function i(e,n){for(var r=[/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,/function\s+([^('"`]*?)\s*\(([^)]*)\)/,/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,/\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?(\S+)\s*\(.*?\)\s*\{/,/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/],t=e.split("\n"),o="",i=Math.min(n,20),a=0;a<i;++a){var s=t[n-a-1],u=s.indexOf("//");if(u>=0&&(s=s.substr(0,u)),s){o=s+o;for(var c=r.length,l=0;l<c;l++){var f=r[l].exec(o);if(f&&f[1])return f[1]}}}}function a(){if("function"!=typeof Object.defineProperty||"function"!=typeof Object.create)throw new Error("Unable to consume source maps in older browsers")}function s(e){if("object"!=typeof e)throw new TypeError("Given StackFrame is not an object");if("string"!=typeof e.fileName)throw new TypeError("Given file name is not a String");if("number"!=typeof e.lineNumber||e.lineNumber%1!==0||e.lineNumber<1)throw new TypeError("Given line number must be a positive integer");if("number"!=typeof e.columnNumber||e.columnNumber%1!==0||e.columnNumber<0)throw new TypeError("Given column number must be a non-negative integer");return!0}function u(e){for(var n,r,t=/\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;r=t.exec(e);)n=r[1];if(n)return n;throw new Error("sourceMappingURL not found")}function c(e,r,t){return new Promise(function(o,i){var a=r.originalPositionFor({line:e.lineNumber,column:e.columnNumber});if(a.source){var s=r.sourceContentFor(a.source);s&&(t[a.source]=s),o(new n({functionName:a.name||e.functionName,args:e.args,fileName:a.source,lineNumber:a.line,columnNumber:a.column}))}else i(new Error("Could not get original source for given stackframe and source map"))})}return function l(f){return this instanceof l?(f=f||{},this.sourceCache=f.sourceCache||{},this.sourceMapConsumerCache=f.sourceMapConsumerCache||{},this.ajax=f.ajax||r,this._atob=f.atob||t,this._get=function(e){return new Promise(function(n,r){var t="data:"===e.substr(0,5);if(this.sourceCache[e])n(this.sourceCache[e]);else if(f.offline&&!t)r(new Error("Cannot make network requests in offline mode"));else if(t){var o=/^data:application\/json;([\w=:"-]+;)*base64,/,i=e.match(o);if(i){var a=i[0].length,s=e.substr(a),u=this._atob(s);this.sourceCache[e]=u,n(u)}else r(new Error("The encoding of the inline sourcemap is not supported"))}else{var c=this.ajax(e,{method:"get"});this.sourceCache[e]=c,c.then(n,r)}}.bind(this))},this._getSourceMapConsumer=function(n,r){return new Promise(function(t,i){if(this.sourceMapConsumerCache[n])t(this.sourceMapConsumerCache[n]);else{var a=new Promise(function(t,i){return this._get(n).then(function(n){"string"==typeof n&&(n=o(n.replace(/^\)\]\}'/,""))),"undefined"==typeof n.sourceRoot&&(n.sourceRoot=r),t(new e.SourceMapConsumer(n))},i)}.bind(this));this.sourceMapConsumerCache[n]=a,t(a)}}.bind(this))},this.pinpoint=function(e){return new Promise(function(n,r){this.getMappedLocation(e).then(function(e){function r(){n(e)}this.findFunctionName(e).then(n,r)["catch"](r)}.bind(this),r)}.bind(this))},this.findFunctionName=function(e){return new Promise(function(r,t){s(e),this._get(e.fileName).then(function(t){var o=e.lineNumber,a=e.columnNumber,s=i(t,o,a);r(s?new n({functionName:s,args:e.args,fileName:e.fileName,lineNumber:o,columnNumber:a}):e)},t)["catch"](t)}.bind(this))},void(this.getMappedLocation=function(e){return new Promise(function(n,r){a(),s(e);var t=this.sourceCache,o=e.fileName;this._get(o).then(function(r){var i=u(r),a="data:"===i.substr(0,5),s=o.substring(0,o.lastIndexOf("/")+1);return"/"===i[0]||a||/^https?:\/\/|^\/\//i.test(i)||(i=s+i),this._getSourceMapConsumer(i,s).then(function(r){return c(e,r,t).then(n)["catch"](function(){n(e)})})}.bind(this),r)["catch"](r)}.bind(this))})):new l(f)}})},{"source-map/lib/source-map-consumer":9,stackframe:3}],12:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stacktrace",["error-stack-parser","stack-generator","stacktrace-gps"],i):"object"==typeof t?r.exports=i(n("error-stack-parser"),n("stack-generator"),n("stacktrace-gps")):o.StackTrace=i(o.ErrorStackParser,o.StackGenerator,o.StackTraceGPS)}(this,function(e,n,r){function t(e,n){var r={};return[e,n].forEach(function(e){for(var n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);return r}),r}function o(e){return e.stack||e["opera#sourceloc"]}function i(e,n){return"function"==typeof n?e.filter(n):e}var a={filter:function(e){return(e.functionName||"").indexOf("StackTrace$$")===-1&&(e.functionName||"").indexOf("ErrorStackParser$$")===-1&&(e.functionName||"").indexOf("StackTraceGPS$$")===-1&&(e.functionName||"").indexOf("StackGenerator$$")===-1},sourceCache:{}},s=function(){try{throw new Error}catch(e){return e}};return{get:function(e){var n=s();return o(n)?this.fromError(n,e):this.generateArtificially(e)},getSync:function(r){r=t(a,r);var u=s(),c=o(u)?e.parse(u):n.backtrace(r);return i(c,r.filter)},fromError:function(n,o){o=t(a,o);var s=new r(o);return new Promise(function(r){var t=i(e.parse(n),o.filter);r(Promise.all(t.map(function(e){return new Promise(function(n){function r(){n(e)}s.pinpoint(e).then(n,r)["catch"](r)})})))}.bind(this))},generateArtificially:function(e){e=t(a,e);var r=n.backtrace(e);return"function"==typeof e.filter&&(r=r.filter(e.filter)),Promise.resolve(r)},instrument:function(e,n,r,t){if("function"!=typeof e)throw new Error("Cannot instrument non-function object");if("function"==typeof e.__stacktraceOriginalFn)return e;var i=function(){try{return this.get().then(n,r)["catch"](r),e.apply(t||this,arguments)}catch(i){throw o(i)&&this.fromError(i).then(n,r)["catch"](r),i}}.bind(this);return i.__stacktraceOriginalFn=e,i},deinstrument:function(e){if("function"!=typeof e)throw new Error("Cannot de-instrument non-function object");return"function"==typeof e.__stacktraceOriginalFn?e.__stacktraceOriginalFn:e},report:function(e,n,r,t){return new Promise(function(o,i){var a=new XMLHttpRequest;if(a.onerror=i,a.onreadystatechange=function(){4===a.readyState&&(a.status>=200&&a.status<400?o(a.responseText):i(new Error("POST to "+n+" failed with status: "+a.status)))},a.open("post",n),a.setRequestHeader("Content-Type","application/json"),t&&"object"==typeof t.headers){var s=t.headers;for(var u in s)s.hasOwnProperty(u)&&a.setRequestHeader(u,s[u])}var c={stack:e};void 0!==r&&null!==r&&(c.message=r),a.send(JSON.stringify(c))})}}})},{"error-stack-parser":1,"stack-generator":2,"stacktrace-gps":11}]},{},[12])(12)});
//# sourceMappingURL=stacktrace.min.js.map
;
define('EventHandler',['require','exports','module'],function (require, exports, module) {
    class SingleTypeEventHandler {
        constructor(type) {
            this.funcs=[];
            this.type=type;
        }
        on(...args) {
            const f=args.pop();
            if (typeof f!=="function") {
                console.log(args, f);
                throw new Error("Not a function for type "+this.type);
            }
            this.funcs.push(f);
            const r={
                remove: ()=>{
                    const e=this.funcs.indexOf(f);
                    if (e>=0) this.funcs.splice(e,1);
                }
            };
            return r;
        }
        fire(...args) {
            for (let f of this.funcs) f(...args);
        }
    }
    class EventHandler {
        constructor() {
            this.types={};
        }
        on(type, ...args) {
            this.types[type]=this.types[type]||new SingleTypeEventHandler(type);
            return this.types[type].on(...args);
        }
        fire(type,...args) {
            this.types[type]=this.types[type]||new SingleTypeEventHandler(type);
            return this.types[type].fire(...args);
        }
    }
    module.exports=EventHandler;
    /*
    add to constructor:
        this.handler=new EventHandler();
    delegation:
    on(...args){return this.handler.on(...args);}
    fire(...args){return this.handler.fire(...args);}
    */
});

define('ErrorDialog',["Klass","FS","UI","Pos2RC","UserAgent","stacktrace","EventHandler"],
function (Klass,FS,UI,Pos2RC,ua,StackTrace,EventHandler) {
    //var regrc=/:([0-9]+):([0-9]+)/;
    //function unknownF(){return "不明";}
    /*var bytes=function(s) {
        try {
            var r="",noconv;
            for(var i=0;i<s.length;i++) {
                var c=s.charCodeAt(i);
                if (c>=256) noconv=true;
                r+="%"+(c.toString(16));
            }
            return noconv?s:decodeURIComponent(r);
        }catch(e) {
            console.log(e, s);
            return s;
        }
    };*/
    function decodeSrc(src){
        if (!src) return src;
        let text="unknown", name="unknown";
        if (typeof src==="string") {
            return {text:src, name};
        }
        if (typeof src.text==="function") text=src.text();
        if (typeof src.text==="string") text=src.text;
        if (typeof src.name==="function") name=src.name();
        if (typeof src.name==="string") name=src.name;
        return {text, name};
    }
    return Klass.define({
        $this:true,
        $: t=>{
            t.events=new EventHandler();
        },
        convertPath: function (t,e) {return e;},// replaced with BuilderClient.convertFromWorkerPath
        decodeTrace: async function (t,e) {
            try {
                const tr=(e.stack && e.stack[0] && e.stack[0].fileName) ? e.stack : await StackTrace.fromError(e,{offline:true});
                for (let tre of tr) {
                    try {
                        const fn=t.convertPath(tre.fileName);
                        if (FS.get(fn).exists()) {
                            tre.file=FS.get(fn);
                        }
                        tre.row=tre.lineNumber-0;
                        tre.col=tre.columnNumber-0;
                    } catch(e1) {
                    }
                }
                return tr;
            } catch(e2) {
                var stack=e.stack+"";
                return stack.split("\n");
            }
        },
        show: async function (t, mesg, src, pos, trace) {
            var appendPos;
            let error;
            console.log("ERRD",mesg);
            if (mesg && mesg.noTrace) return;
            if (mesg && mesg.stack) {
                error=mesg;
                var tr=await t.decodeTrace(mesg);
                var detail=(mesg.message ? "("+mesg.message+")" : "");
                for (var i=0;i<tr.length;i++) {
                    if (tr[i].file) {
                        var cve=tr[i].file.name()+"の"+
                        tr[i].row+"行目"+tr[i].col+"文字目付近でエラーが発生しました"+detail;
                        return await t.show(cve,tr[i].file, tr[i] , mesg.stack);
                    }
                }
                src=mesg.src;
                if (!src && mesg.srcPath) {
                    src=FS.get(mesg.srcPath);
                }
                pos=mesg.pos;
                //console.log(mesg,mesg.stack);
                trace=mesg.stack;
                mesg=(mesg.message||mesg)+"";//detail;
                appendPos=true;
            } else if (mesg && mesg.isTError) {
                pos=mesg.pos;
                src=mesg.src;
            }
            var elem=t.createDom();
            t.mesgd.text(
                mesg//+" 場所："+src.name()+(typeof row=="number"?":"+p.row+":"+p.col:"")
            );
            t.events.fire("show",{mesg, src,pos,trace, dialog:t, error});
            try {
                src=decodeSrc(src);
            } catch(e) {
                console.log("decodeSrc fail", src);
                alert(mesg);
            }
            let srcpos;
            if (src && pos!=null) {
                var p=new Pos2RC(src.text).getAll(pos);
                if (appendPos) t.mesgd.append("場所："+src.name+":"+p.row+":"+p.col);
                t.srcd.show();
                t.srcd.empty();
                t.srcd.append($("<span>").text(src.text.substring(0,p.pos)));
                t.srcd.append($("<img>").attr("src",FS.expandPath("${sampleImg}/ecl.png")));//MODJSL
                t.srcd.append($("<span>").text(src.text.substring(p.pos)));
                srcpos={src,pos:p.pos};
            } else {
                t.srcd.hide();
            }
            if (!trace) {
                t.traceb.hide();
                t.traced.hide();
            } else {
                t.traceb.show();
                t.traced.text(trace);
            }
            elem.dialog({width:600,height:400});
            t.opened=true;
            return srcpos;
        },
        on: (t,...args)=>t.events.on(...args),
        close: function (t) {
            try {
                if (t.dom && t.opened) {
                    t.dom.dialog("close");
                    t.opened=false;
                }
            } catch(e) {
                console.log("err",e);
            }
        },
        createDom: function (t) {
            if (t.dom) return t.dom;
            var elem=$("<div>");
            elem.attr("title","エラー");
            t.dom=elem;
            t.mesgd=$("<div>");
            elem.append(t.mesgd);
            //elem.append($("<div>").attr("class","quickFix"));
            t.srcd=$("<pre>");
            elem.append($("<div>").append(t.srcd));
            t.traced=$("<pre>");
            t.traceb=$("<button>").text("エラーの詳細...").click(t.$bind.showTrace);
            elem.append($("<div>").
                append(t.traceb).
                append($("<div>").append(t.traced))
            );
            t.traced.hide();
            return t.dom;
        },
        showTrace: function (t) {
            if (t.traceShowing) {
                t.traced.hide();
            } else {
                t.traced.show();
            }
            t.traceShowing=!t.traceShowing;
        }
    });
});

define('SocializeDialog',['require','exports','module','UI','ctrl'],function (require,exports,module) {
    const UI=require("UI");
    const ctrl=require("ctrl");
    const popups=[];
    function up() {
        for (let p of popups) p.drop();

        /*if (up.cnt<=0) return;
        up.cnt--;
        if (up.cnt<=0) {
            if(up.queue.length) up.queue.shift()();
        }
        for (let p of popups) p.moveBy();
        if (popups.length>5) popups[0].hide();*/
    }
    up.cnt=0;
    up.queue=[];
    up.reserve=f=>up.queue.push(f);
    setInterval(up,20);
    class RectShape {
        constructor(left,top,width,height) {
            this.left=left;
            this.top=top;
            this.width=width;
            this.height=height;
        }
        moveBy(x,y) {
            return new RectShape(this.left+x,this.top+y,this.width,this.height);
        }
        intersects(s) {
            if (!s) return false;
            const x=this.left+this.width/2;
            const y=this.top+this.height/2;
            const sx=s.left+s.width/2;
            const sy=s.top+s.height/2;
            return Math.abs(x-sx)*2<this.width+s.width &&
            Math.abs(y-sy)*2<this.height+s.height;
        }
        right() {return this.left+this.width;}
        bottom() {return this.top+this.height;}
    }
    function NotePopup(note) {
        note.favsHaving=note.favsHaving||0;
        const favButton=UI("span",{on:{click:toggleFav},css:{cursor:"pointer"}},"❤");
        if (note.favByMyself) favButton.addClass("faved");
        const favCount=UI("span",note.favsHaving||"0");
        const closeButton=UI("span",{on:{click:hide},css:{cursor:"pointer"}},"x");
        const repButton=UI("span",{on:{click:showReplies},css:{cursor:"pointer"}},"💭");
        const repCount=UI("span",note.repliesHaving||"0");
        const SPC=["span",{css:{padding:"5px"}}];

        const like=UI("span",SPC,repButton, repCount, SPC,favButton, favCount, SPC,closeButton).css({float:"right"});
        const elem=UI("div",{class:"socializePopup"},note.content,like).
        appendTo("body");
        let at,bottomMax;
        function show(_at) {
            at=at||_at;
            /*if (up.cnt>0) {
                return up.reserve(show);
            }*/
            popups.push(self);
            //console.log("POP!",note);
            //up.cnt=10;
            bottomMax=at.top;
            console.log("BMAX", dimension().bottom(),bottomMax);
            console.log("POP!", note, bottomMax);
            elem.show();
            elem.css({left:`${at.left}px`, top:`${at.top}px`});
        }
        function moveBy(left,top=-5) {
            at.top+=top;
            at.left+=left;
            elem.css({left:`${at.left}px`, top:`${at.top}px`});
        }
        function hide() {
            elem.remove();
            const i=popups.indexOf(self);
            popups.splice(i,1);
        }
        function refresh() {
            favCount.text(note.favsHaving);
        }
        function drop() {
            const d=dimension();
            if (!d) return;
            const d1=d.moveBy(0,5);
            let dodrop=true;
            for (let p of popups) {
                if (p===self) continue;
                const pd=p.dimension();
                if (!pd) continue;
                if (d.intersects(pd)) {
                    //console.log("INTER", self.note, p.node);
                    if (d.top<pd.top ) {
                        moveBy(0,-5);
                        dodrop=false;
                    } else {
                        p.moveBy(0,-5);
                    }
                }
                if (d1.intersects(pd)) dodrop=false;
            }
            if (dodrop && d.bottom()<bottomMax-5) moveBy(0,1);
            if (d.bottom()>=bottomMax) {
                //console.log(d.bottom(),bottomMax);
                moveBy(0,-5);
            }
        }
        function dimension() {
            const p=position();
            if (!p) return;
            return new RectShape(p.left,p.top, elem.outerWidth(), elem.outerHeight());
        }
        async function toggleFav() {
            if (note.favByMyself) {
                await ctrl.get("Note/rmFav",{id:note.favByMyself});
                note.favsHaving--;
                favCount.text(note.favsHaving);
                favButton.removeClass("faved");
                note.favByMyself=false;
            } else {
                const id=await ctrl.get("Note/addFav",{id:note.id});
                //note.favsHaving++;
                favCount.text(note.favsHaving-0+1);
                favButton.addClass("faved");
                note.favByMyself=id;

            }
        }
        function position(){return at;}
        let repHolder;
        async function showReplies() {
            if (repHolder) return;
            repHolder=Replies(note ,UI("blockquote").appendTo(elem));
        }
        const self={note,show,hide,moveBy,refresh,position,drop,dimension};

        return self;
    }
    function Replies(target,elem) {
        let last=0;
        const writeElem=UI("div",
            ["input",{$var:"input",on:{enterkey:add}}],
            ["button",{on:{click:add}},"返信"]
        );writeElem.appendTo(elem);
        let input=writeElem.$vars.input;
        let list;
        get();
        async function add(){
            const content=input.val();
            input.val("");
            await ctrl.get("Note/addReply",{
                target:target.id,content
            });
            addToList({content});
        }
        async function get(){
            const reps=await ctrl.get("Note/get",{
                target:target.id,since:last}
            );
            console.log("Reps", reps);
            let cnt=0;
            for (let rep of reps) {
                addToList(rep);
                if (cnt++>=5) break;
            }
        }
        function addToList(rep) {
            list=list||UI("div").appendTo(elem);
            list.append(UI("div",rep.content));
        }
    }
    NotePopup.clear=()=>{
        while (popups.length) popups[0].hide();
        up.queue=[];
    };
    const notesByFiles={};// filepath->NotesByFile
    class NotesByFile{
        //filepath:string
        //last:time;
        //entries:{id->note} ;
        constructor (filepath) {
            this.filepath=filepath;
            this.entries={};
            this.last=0;
            this.lastRefresh=0;
        }
        addEntry(note) {
            this.entries[note.id]=this.entries[note.id]||{};
            let newFav;
            if (note.favsHaving) {
                newFav=(this.entries[note.id].favsHaving||0)+note.favsHaving;
                console.log("newFav",newFav);
            }
            let newRep;
            if (note.repliesHaving) {
                newRep=(this.entries[note.id].repliesHaving||0)+note.repliesHaving;
                console.log("newRep",newRep);
            }
            Object.assign(this.entries[note.id], note);
            if (newFav!==null) {
                this.entries[note.id].favsHaving=newFav;
            }
            if (newRep!==null) {
                this.entries[note.id].repliesHaving=newRep;
            }
            if (note.time>this.last) this.last=note.time;
            if (note.c_time>this.last) this.last=note.c_time;
            return this.entries[note.id];
        }
        async refresh(duration=0) {
            const now=new Date().getTime();
            if (now<this.lastRefresh+duration) return false;
            this.lastRefresh=now;
            const notes=await ctrl.get("Note/get",{file:this.filepath,since:this.last});
            console.log(notes);
            for (let note of notes) {
                this.addEntry(note);
            }
            return true;
        }
        pick(except) {
            except=except||{};
            const cand=[];
            for (let id in this.entries) {
                if (!except[id]) cand.push(this.entries[id]);
            }
            if (cand.length==0) return null;
            const a=cand[Math.floor(Math.random()*cand.length)];
            const b=cand[Math.floor(Math.random()*cand.length)];
            if (a.favsHaving>b.favsHaving) return a;
            return b;
        }
        static instance(filepath) {
            notesByFiles[filepath]=notesByFiles[filepath]|| new NotesByFile(filepath);
            return notesByFiles[filepath];
        }
    }
    let focusing=false;
    module.exports=(ide)=>{
        const elem=UI("div",{title:"についてのノート"},
            ["input", {$var:"cont", size:60,on:{enterkey:send}}],
            ["button", {$var:"OKButton", on:{click: send}},"送信"],
            ["a",{$var:"gotfavs",href:ctrl.url("Note/myNotes"),target:"notes"},"獲得♥:"]
        );
        const vars=elem.$vars;
        vars.cont.on("focus",()=>focusing=true);
        vars.cont.on("blur",()=>{
            //NotePopup.clear();
            focusing=false;
        });
        let file;
        async function send() {
            const cont=vars.cont.val();
            vars.cont.val("");
            const o=elem.offset();
            console.log(o);
            o.top-=50;
            const noteSrc={content:cont};
            if (file) {
                const prjTop=ide.prj.getDir().up();
                const filePath=file.relPath(prjTop);
                noteSrc.id=await ctrl.post("Note/put",{
                    file:filePath,
                    content:cont,
                });
                const n=NotesByFile.instance(filePath);
                const note=n.addEntry(noteSrc);
                NotePopup(note).show(o);
                console.log("New note ",note.id);
            }
        }
        let timer;
        async function changeFile(f) {
            if (file && f && file.path()===f.path()) return;
            NotePopup.clear();
            if (timer) clearTimeout(timer);
            file=f;
            const prjTop=ide.prj.getDir().up();
            const filePath=file.relPath(prjTop);

            elem.dialog("option","title",f.name()+"についてのノート");
            const n=NotesByFile.instance(filePath);
            await n.refresh();
            async function loop() {
                if (await n.refresh(10*1000)) {
                    for (let c of popups) c.refresh();
                }
                //console.log("EX",except);
                if (popups.length<(focusing?5:0)) {
                    popup1();
                }
                timer=setTimeout(loop,1000);
            }
            popup1();
            function popup1() {
                const except={};
                for (let c of popups) except[c.note.id]=c;
                const com=n.pick(except);
                if (com) {
                    const o=elem.offset();
                    o.top-=50;
                    NotePopup(com).show(o);
                }
            }
            loop();
            updateFavs();
            /*const coms=await ctrl.get("Note/get",{file:filePath});
            console.log("coms",coms);
            for (let com of coms) {
                const o=elem.offset();
                o.top-=50;
                CommentPopup(com).show(o);
            }*/
        }
        let shownOnce=false;
        function show(f) {
            if (!shownOnce) {
                elem.dialog({
                    width:800,height:100,
                    position: { my: "center bottom", at: "center bottom"},
                    close: ()=>NotePopup.clear()
                });
                shownOnce=true;
            } else {
                console.log("2nd show");
                elem.dialog({
                    close: ()=>NotePopup.clear()
                });
            }
            if (f) changeFile(f);
        }
        async function updateFavs() {
            const res=await ctrl.get("Note/myNotes",{stats:1});
            vars.gotfavs.text("獲得♥:"+res.favs);
        }
        return {changeFile,show};
    };
});

define('DesktopSettingDialog',['require','exports','module','UI','jshint'],function (require, exports, module) {
    const UI=require("UI");
    const jshint=require("jshint");
    class DesktopSettingDialog {
        show(ide,options) {
            const d=this.embed(ide,options);
            this.dom=d;
            d.dialog({width:500,height:500});
        }
        embed(ide,options) {
            if (!options) options={};
            const desktopEnv=ide.desktopEnv;
            const close=()=>{
                const form=this.vars.form[0];
                desktopEnv.editorFontSize=form.editorFontSize.value-0;
                desktopEnv.showInvisibles=$(form.showInvisibles).prop("checked");
                desktopEnv.fileList=form.fileList.value;
                const prd=desktopEnv.runDialog;
                desktopEnv.runDialog=form.runDialog.value;
                if (prd!==desktopEnv.runDialog) {
                    alert("設定変更に伴い，再読み込みを行います");
                    location.reload();
                }
                ide.saveDesktopEnv();
                const ei=ide.getCurrentEditorInfo();
                if (ei) {
                    ei.editor.setFontSize(desktopEnv.editorFontSize||18);
                    ei.editor.setShowInvisibles(!!desktopEnv.showInvisibles);
                }
                ide.ls();
                this.dom.dialog("close");
            };
            if (!this.dom) {
                this.dom=UI("div",{title:"設定"},
                    ["form",{$var:"form",action:jshint.scriptURL(";")},
                        ["h3","エディタ"],
                        ["div","文字の大きさ",
                            ["input",{name:"editorFontSize",$var:"size",on:{enterkey:close}}]],
                        ["div",
                            ["input",{name:"showInvisibles",type:"checkbox",$var:"showInvisibles"}],
                            "スペースやタブを表示する"],
                        ["h3","ファイル表示"],
                        ["div",
                            ["input",{type:"radio",name:"fileList",value:"latest",$var:"fileList"}],"更新順",
                            ["input",{type:"radio",name:"fileList",value:"name",$var:"fileList"}],"名前順",
                        ],
                        ["h3","実行結果の表示位置"],
                        ["div",
                            ["input",{type:"radio",name:"runDialog",value:"dialog",$var:"runDialog"}],"ダイアログ",
                            ["input",{type:"radio",name:"runDialog",value:"split",$var:"runDialog"}],"画面下部",
                        ],
                        ["button",{on:{click:close}},"OK"]
                    ]);
                this.vars=this.dom.$vars;
            }
            const form=this.vars.form[0];
            form.editorFontSize.value=(desktopEnv.editorFontSize||18);
            $(form.showInvisibles).prop("checked", !!desktopEnv.showInvisibles);
            form.fileList.value=desktopEnv.fileList||"latest";
            form.runDialog.value=desktopEnv.runDialog||"dialog";
            return this.dom;
        }
    }
    module.exports=DesktopSettingDialog;
});

/*global requirejs*/
define('jsl_edit',['require','Util','FS','FileList','FileMenu','fixIndent','Shell','KeyEventChecker','UIDiag','WebSite','exceptionCatcher','Columns','assert','Menu','DeferredUtil','Sync','RunDialog2','logToServer2','SplashScreen','Auth','DistributeDialog','NotificationDialog','IframeDialog','AssignmentDialog','SubmitDialog','CommentDialog2','NewProjectDialog','ProgramFileUploader','AssetDialog','root','ErrorDialog','ProjectFactory','UserAgent','SocializeDialog','EventHandler','UI','ctrl','DesktopSettingDialog','LanguageList'],function (require) {
    var Util=require("Util");
    var FS=require("FS");
    var FileList=require("FileList");
    var FileMenu=require("FileMenu");
    //var showErrorPos=require("showErrorPos");
    var fixIndent=require("fixIndent");
    var sh=require("Shell");
    var KeyEventChecker=require("KeyEventChecker");
    var UIDiag=require("UIDiag");
    var WebSite=require("WebSite");
    var EC=require("exceptionCatcher");
    var Columns=require("Columns");
    var A=require("assert");
    var Menu=require("Menu");
    var DU=require("DeferredUtil");
    var Sync=require("Sync");
    var RunDialog2=require("RunDialog2");
    var logToServer2=require("logToServer2");
    var SplashScreen=require("SplashScreen");
    var Auth=require("Auth");
    var DistributeDialog=require("DistributeDialog");
    var NotificationDialog=require("NotificationDialog");
    var IframeDialog=require("IframeDialog");
    var AssignmentDialog=require("AssignmentDialog");
    var SubmitDialog=require("SubmitDialog");
    var CommentDialog2=require("CommentDialog2");
    var NPD=require("NewProjectDialog");
    var ProgramFileUploader=require("ProgramFileUploader");
    var AssetDialog=require("AssetDialog");
    var root=require("root");
    var ErrorDialog=require("ErrorDialog");
    var PF=require("ProjectFactory");
    var UA=require("UserAgent");
    const SocializeDialog=require("SocializeDialog");
    const EventHandler=require("EventHandler");
    const UI=require("UI");
    const ctrl=require("ctrl");
    const DesktopSettingDialog=require("DesktopSettingDialog");
    const languageList=require("LanguageList");
    if (location.href.match(/localhost/)) {
        console.log("assertion mode strict");
        A.setMode(A.MODE_STRICT);
    } else {
        console.log("assertion mode defensive");
        A.setMode(A.MODE_DEFENSIVE);
    }
    var P=FS.PathUtil;
    var dir=Util.getQueryString("dir");
    if (!dir) {
        alert("dir is not specified");
        location.href="index.html";
        return;
    }
    var curProjectDir=FS.get(dir);
    /*
    getEXT
    getOptions
    getPublishedURL
    getName
    sourceFiles
    dir(field)-> it should be getDir
    method called from Builders, CommentDialog2, SubmitDialog,AssignmentDialog
    */
    var ALWAYS_UPLOAD=(localStorage.ALWAYS_UPLOAD==="true") || Util.getQueryString("ALWAYS_UPLOAD",false);
    console.log("ALWAYS_UPLOAD",ALWAYS_UPLOAD);
    if (root.BitArrow) root.BitArrow.curProjectDir=curProjectDir.path();
    /*var langList={
        "js":"JavaScript",
        "c":"C",
        "dtl":"Dolittle",
        "tonyu":"Tonyu",
        "dncl":"DNCL",
        "py":"Python",
        "php":"PHP",
    };*/

    var helpURL;
    var unsaved=false;
    var unsynced=false;
    var typingCheckContent=null, sendUnsavedContentCount=0, lastSentUnsavedContent=null;
    //var Builder;
    var builder;
    var ram;
    //var scoremsg;
    function showToast(msg){
    	$("#toastArea").html(msg);
    	setTimeout(function(){
    		$("#toastArea").text("");
    	},5000);
    }
    function sync() {
    	unsaved=false;
        return Sync.sync(curProjectDir, curProjectDir,{v:true}).then(function(r){
            console.log("SYNCTHEN",r);
            unsynced=false;
            showToast("保存しました。");
        }).fail(function (e) {
            if (!e) e="Unknown error";
            logToServer2("","","","SYNC ERROR!",
            e,"System");
            console.log(e);
            alert("保存に失敗しました。");
        });
    }
    function firstSync() {
        return Auth.check().then(sync).then(function () {
            if (!curProjectDir.exists() || !curProjectDir.rel("options.json").exists()) {
                var lang=Util.getQueryString("lang");
                if (!lang) {
                    alert("フォルダ"+dir+" は存在しません．");
                    location.href="index.html";
                    return;
                }
                console.log("Creating project ",curProjectDir.name());
                NPD.create(curProjectDir.up(),{name:curProjectDir.name(),lang:lang});
            }
        });
    }
    DU.setE(function(e) {
        e=e.responseText||e;
        console.error("Err",e);
        alert(e);
    });
    async function getURLInfo() {
        const info=await ctrl.get("BAURL/show");
        console.log(info);
        const withSep=(s)=>FS.PathUtil.truncSEP(s)+"/";
        WebSite.urlInfo=info;
        if (info.BA_SERVICE_URL) {
            WebSite.controller_in_service=info.BA_SERVICE_URL;
            WebSite.runtime_in_service=FS.PathUtil.truncSEP(info.BA_SERVICE_URL)+"/runtime/";
        }
        if (info.BA_PUB_URL) {
            // BitArrow.publishedURL: URL of THIS project.
            // WebSite.published: ROOT URL of published. 
            WebSite.published=FS.PathUtil.truncSEP(info.BA_PUB_URL)+"/";
        }
        if (info.BA_PUB_URL_IN_TOP) {
            WebSite.pub_in_top=FS.PathUtil.truncSEP(info.BA_PUB_URL_IN_TOP);
        } else {
            WebSite.pub_in_top=WebSite.published;
        }
        WebSite.hosts={
            ide: {
                top: withSep(info.BA_TOP_URL),
                published: withSep(WebSite.pub_in_top) ,
                runtime: withSep(WebSite.runtime),
            },
            service: {
                top: withSep(info.BA_SERVICE_URL || info.BA_TOP_URL) ,
                published: withSep(WebSite.published),
                runtime: withSep(WebSite.runtime_in_service),
            },
        };
        WebSite.hosts.ide.controller=WebSite.hosts.ide.top;
        WebSite.hosts.service.controller=WebSite.hosts.service.top;
    }
    $.when(DU.documentReady(),firstSync(), DU.requirejs(["ace"]),getURLInfo()).
    then(ready).fail(function (e) {
        alert("エラー"+e);
        console.error(e.stack);
        SplashScreen.hide();
    });

function ready() {
    const curPrj=PF.create("ba",{dir:curProjectDir});
    if (!Auth.teacher) {
        curPrj.getDir().each(function (f) {
            console.log(f.name());
            if (f.name().match(/Readme/)) {
                var timeFmt=/OPEN AT:(\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\+\d\d:\d\d)/;
                var timeM=timeFmt.exec(f.text());
                if (timeM && new Date().getTime()<new Date(timeM[1]).getTime()) {
                    alert("このプロジェクトはまだ見られません");
                    location.href=".";
                }
            }
        });
    }
    var F=EC.f;
    var JS_NOP="javascriptCOLON;".replace(/COLON/,":");
    root.$LASTPOS=0;
    var mobile=WebSite.mobile  || localStorage.mobile;
    let ace_language_tools;
    if (mobile) {
        requirejs(["ace-langtool"],()=>{ 
            ace_language_tools=root.ace.require("ace/ext/language_tools");
        });
    }
    
    //Tonyu.globals.$currentProject=curPrj;
    //Tonyu.currentProject=curPrj;
    var EXT=curPrj.getEXT();
    var HEXT=".html";
    var opt=curPrj.getOptions();
    var lang=opt.language || "js";
    const ide={run, prj:curPrj, getCurrentEditorInfo, saveDesktopEnv, sync, ls,
        handler: new EventHandler(),
        on(...args){return this.handler.on(...args);},
        fire(...args){return this.handler.fire(...args);}
    };
    root.openDummyEditor=openDummyEditor;
    const langInfo=languageList[lang];
    if (!langInfo) {
        throw new Error(`Undefined language: ${lang}`);
    }
    requirejs([langInfo.builder], function(_){
        setupBuilder(_);
    });
    helpURL=langInfo.helpURL;
    if (navigator.userAgent.match(/Firefox/) && lang==="tonyu") {
        ALWAYS_UPLOAD=true;
        console.log("Firefox tonyu ALWAYS_UPLOAD");
    }
    function setupBuilder(BuilderClass) {
        $("#fullScr").attr("href",JS_NOP).text("別ページで表示");
        ram=FS.get("/ram/build/");
        FS.mount(ram.path(),"ram");
        builder=new BuilderClass(curPrj, ram, ide);
        window.BABuilder=builder;
        builderReady();
    }
    function builderReady() {
        window.curPrj=curPrj;
        if (builder.addMenu) builder.addMenu(Menu);
        autoexec();
        autologexec();
        autosubexec();
        if (builder.convertPath) {
            errorDialog.convertPath=p=>{
                const res=builder.convertPath(p);
                //console.log("CVP",p,res);
                return res;
            };
            //console.log("CVP set");
        }
    }
    function autoexec() {
        var autoexec=Util.getQueryString("autoexec",null);
        console.log("AE",autoexec);
        if (autoexec) {
            fl.select(curProjectDir.rel(autoexec));
            run({sendURL: getSendURL()});
        }
    }
    function autologexec() {
        var id=Util.getQueryString("autologexec",null);
        if (id) {
            $.ajax(WebSite.controller+"?AddErrorInfo/getLog&logid="+id).then(function (r) {
                var raw=JSON.parse(r.raw);
                var name="AutoExec";
                var f=curProjectDir.rel(name+EXT);
                var pf;
                console.log("ale",r,f.path());
                if (!f.exists()) {
                   FM.on.createContent(f);
                }
                var extmap={
                    c:".c",javascript:".tonyu",dolittle:".dtl",dtl:".dtl",
                    dncl:".dncl",
                    html:".html",
                };
                for (var k in raw.code) {
                    f=curProjectDir.rel(name+extmap[k.toLowerCase()]);
                    if(k.toLowerCase()!="html") pf=f;
                    console.log("ale-edt",k,f.path(),f.exists());
                    if (f.exists()) {
                        fl.select(f);
                        getCurrentEditorInfo().editor.getSession().getDocument().setValue(raw.code[k]);
                    }
                }
                fl.select(pf);
                const stdin=Util.getQueryString("stdin",null);
                console.log("STDIN",stdin);
                const opt={};
                if (stdin) opt.stdin=stdin;
                opt.sendURL=getSendURL();
                /*const sendURL=(typeof parent!=="undefined" && parent && parent.sendURL)||
                (typeof opener!=="undefined" && opener && opener.sendURL);
                if (ALWAYS_UPLOAD && sendURL) opt.sendURL=sendURL;*/
                run(opt);
           }).catch (function (e) {console.error(e);});
        }
    }
    function getSendURL() {
        const sendURL=(typeof parent!=="undefined" && parent && parent.sendURL)||
        (typeof opener!=="undefined" && opener && opener.sendURL);
        if (ALWAYS_UPLOAD && sendURL) return sendURL;
    }
    function autosubexec() {
        var id=Util.getQueryString("autosubexec",null);
        if (id) {
            $.ajax(WebSite.controller+"?Mark/getSubmission&id="+id).then(function (r) {
               r=typeof r==="object" ? r: JSON.parse(r);
               var files=r.files;
               var file;
               for (var k in files) {file=files[k];}
               fl.select(curProjectDir.rel("Test.c"));
               getCurrentEditorInfo().editor.getSession().getDocument().setValue(file);
               run();
           }).catch(function (e) {
               console.error(e);
           });
        }
    }
    function makeUI(){
        Columns.make(
            ["div",{id:"fileViewer","class":"col-xs-2"},
                ["div",{id:"fileItemList"}]
            ],
            ["div",{id:"mainArea","class":"col-xs-10"},
                ["div",{id:"errorPos"}],
                ["div",{id:"tabTop"},
                     ["button",{
                         "class":"selTab","data-ext":HEXT,css:{display:lang=="js"?"inline":"none"}
                     },"HTML"],
                     ["button",{
                         "class":"selTab","data-ext":EXT
                     },langInfo.en],
                     ["span",{id:"curFileLabel"}],
                     ["span",{id:"modLabel"}],
                     ["span",{class:"tabLink", id:"commentLink"}],
                     ["span",{class:"tabLink", id:"hintLink"}],
                     ["span",{class:"tabLink", id:"customLink"}],
                     ["a",{class:"tabLink", id:"fullScr",href:JS_NOP}],
                     ["span",{class:"tabLink", id:"toastArea"}]
                  ],
                  ["div",{id:"progs"}],
                  ["div",{id:"runEmbed"}],
              ]
        );
    }
    makeUI();
    let fileMenuTemplate="";
    function makeMenu() {
        Menu.make({label:"Bit Arrow",id:"home",sub:
                [
                  {label:"ファイル",id:"fileMenu",sub:[
                      {label:"新規",id:"newFile"},
                      {label:"名前変更",id:"mvFile"},
                      {label:"コピー",id:"cpFile"},
                      {label:"素材管理",id:"upFile",action:upFile},
                      //{label:"閉じる",id:"closeFile"},
                      {label:"削除", id:"rmFile"}
                  ]},
                  {label:"実行",id:"runMenu",action:run},
                  {label:"保存",id:"save"},
                  {label:"設定",id:"config",action:editorSetting}/*sub:[
                      {label:"エディタの文字の大きさ",id:"textsize",action:textSize}
                  ]}*/
              ]}
        );
        Auth.getClassOptions().then(function (r) {
            console.log("class options",r);
            if (r.useAssignment==="yes") {
                Menu.appendMain({after:"#save",label:"提出",id:"submit",action:submit});
            }
            if (!r.showHint) {
                $("#hintLink").remove();
            }
            fileMenuTemplate=r.fileMenuTemplate||"";
            disableNote=!!r.disableNote;
        });
        showDistMenu();
        Menu.appendMain({label:"使用方法",id:"openHelp"});
    }
    var assetDialog;
    function upFile() {
        assetDialog=assetDialog||AssetDialog();
        assetDialog.show();
    }
    var commentDialog=new CommentDialog2(curPrj);
    var submitDialog;
    function submit() {
        if (!submitDialog) submitDialog=new SubmitDialog(curPrj);
        var inf=getCurrentEditorInfo();
        if (!inf || !inf.file) return alert("提出するファイルを開いてください");
        submitDialog.show(inf.file);
    }
    function showDistMenu(){
        if(Auth.teacher){
            Menu.appendMain(
                {label:"教員",id:"distribute",sub:[
                    {label:"ファイルを配布",id:"distributeFile",action:distributeFile}
                ]}
            );
            $.ajax(".?Class/getOptions").then(function (r) {
                if (r.useAssignment==="yes") {
                    Menu.appendSub("distribute",
                        {label:"課題作成",id:"assignment",action:assignment}
                    );
                }
            });
        }else{
        }
    }
    var assignmentDialog=new AssignmentDialog(curPrj);
    function assignment() {
        var inf=getCurrentEditorInfo();
        assignmentDialog.show(inf && inf.file);
    }
    function distributeFile() {
        DistributeDialog.setDisabled(false);
        var curPrjName=curProjectDir.name();
        var inf=getCurrentEditorInfo();
        if (!inf) {
            alert("配布したいファイルを開いてください。");
            return;
        }
        var curFile=getCurrentEditorInfo().file;
        DistributeDialog.show(curFile.text(),function(text,overwrite,{next}){
            console.log(text,overwrite);
            DistributeDialog.setDisabled(true);
            $.ajax({
                type:"POST",
                url:WebSite.controller+"?Class/distribute",
                data:{
                    "prj":curPrjName,
                    "file":curFile.name(),
                    "htmlText":fileSet(curFile)[0].text(),
                    "html":fileSet(curFile)[0].name(),
                    "cont":text,
                    "over":overwrite
                }
            }).then(
                function(d){
                    if (!next) {
                        alert(d);
                        DistributeDialog.setDisabled(false);
                    } else {
                        try {
                            fl.selectNext();
                            setTimeout(distributeFile, 500);
                        } catch(e) {
                            console.error(e);
                            alert(e);
                        }
                    }
                },
                function(d){
                    alert("配布に失敗しました");
                    console.log(d);
                    DistributeDialog.setDisabled(false);
                }
            );
        },{ide});

    }
    /*function distributePrj() {
        alert("distributePrj!");
    }*/
    function checkPublishedURL() {
        Auth.publishedURL(curPrj.getName()+"/").then(function (u) {
            if (window.BitArrow) window.BitArrow.publishedURL=u;
        });
    }
    checkPublishedURL();
    makeMenu();
    if (mobile) {
        $("#fileViewer").hide();
        $("#runAreaParent").hide();
        $("#mainArea").attr("class","col-xs-12");
        $("#mobileBar").show();
        $("#homeLink").text("🔙");
    }

    let screenH, editorH, runH;
    function onResize() {
        var h=$(window).height()-$("#navBar").height()-$("#tabTop").height();
        h-=20;
        if (isSplit()) {
            screenH=h;
            editorH=h*2/3;
            runH=h*1/3;
        } else {
            screenH=h;
            editorH=h;
            runH=0;
        }
        var rw=$("#runArea").width();
        $("#progs pre").css("height",editorH+"px");
        console.log("canvas size",rw,h);
        $("#fileItemList").height(h);
        $("#runEmbed").height(runH);
        console.log("runEmbed", $("#runEmbed").height());
        if (isSplit() && RunDialog2.fitToTarget) {
            RunDialog2.fitToTarget();
        }
    }
    const desktopEnv=loadDesktopEnv();
    ide.desktopEnv=desktopEnv;
    onResize();
    window.editorTextSize=desktopEnv.editorFontSize||18;
    var editors={};root._editors=editors;

    KeyEventChecker.down(document,"bs",F(function (e) {
        A.is(e,"Event");
	    var f=$(":focus");
	    var doConfirm=true;
	    if (f.length>0 &&
	        (
	            (f[0].tagName.toLowerCase()=="input" &&
    	        (!f.attr("type") || f.attr("type")=="text")) ||
	            f[0].tagName.toLowerCase()=="textarea"
	        )
	    ) doConfirm=false;
	    if(doConfirm){
            UIDiag.confirm("一つ前のページに戻ります。よろしいですか？").then(function (r) {
                if (r) {
                    history.back();
                }
            });
            e.stopPropagation();
            e.preventDefault();
            return false;
	    }
    }));
    KeyEventChecker.down(document,"ctrl+shift+s",function () {
        sh.window();
    });
    KeyEventChecker.down(document,"F9",F(run));
    $("#mobileRun").click(F(run));
    KeyEventChecker.down(document,"F2",F(function(){
        stop();
        var progs=getCurrentEditor();
        if(progs) progs.focus();
        //console.log("F2 pressed");
    }));
    KeyEventChecker.down(document,"ctrl+s",F(function (e) {
        A.is(e,"Event");
    	save();
    	e.stopPropagation();
    	e.preventDefault();
    	return false;
    }));
    KeyEventChecker.down(document,"ctrl+m",F(function (e) {
        fl.selectNext();
        e.stopPropagation();
    	e.preventDefault();
    	return false;
    }));
    $(window).resize(F(onResize));
    $("body")[0].spellcheck=false;
    sh.cd(curProjectDir);

    var fl=FileList($(mobile?"#fileSel":"#fileItemList"),{
        topDir: curProjectDir,
        on:{
            select: F(open),
            displayName: dispNameFL
        }
    });
    ProgramFileUploader.accept(fl,curPrj);
    var FM=FileMenu();
    FM.fileList=fl;
    var sourceFiles={};
    $("#newFile").click(F(function () {
        sourceFiles=curPrj.sourceFiles();
        console.log(sourceFiles);
        FM.create();
    }));
    $("#mvFile").click(F(FM.mv));
    $("#cpFile").click(F(function () {
        var inf=getCurrentEditorInfo();
        if (!inf) {
            alert("コピーしたいファイルを開いてください。");
            return;
        }
        var old=inf.file;
        var oldName=curPrj.truncEXT(old);//old.truncExt();//.p5.js
        FM.dialogOpt({title:"コピー", name:oldName, action:"cp", onend:function (_new) {
            if (!_new) return;
            var olds=fileSet(old);
            var news=fileSet(_new);
            A(olds.length==news.length,"olds.length==news.length");
            var ci;
            for (var i=0;i<olds.length;i++) {
                if (olds[i].equals(old)) ci=i;
                if (olds[i].exists() && !news[i].exists()) {
                    news[i].copyFrom(olds[i]);
                    ide.fire("createContent",{file:news[i], oldFile:olds[i]});
                    if (builder.afterCreateContent)builder.afterCreateContent(news[i]);
                }
            }
            A.is(ci,Number);
            ls();
            fl.select(news[ci]);
        }});
    }));

    $("#rmFile").click(F(FM.rm));
    $("#closeFile").click(closeCurrentFile);
    function closeCurrentFile() {
        var inf=getCurrentEditorInfo();
        if (!inf) {
            return;
        }
        var f=inf.file;
        var s=fileSet(f);
        s.forEach(function (e) {
            close(e);
        });
    }
    FM.on.close=function (f) {
        var s=fileSet(f);
        var shouldRemove=false;
        s.forEach(function (e) {
            if (!e.exists()) shouldRemove=true;
        });
        s.forEach(function (e) {
            if (shouldRemove && e.exists()) {
                e.rm();
            }
            close(e);
        });
    };
    FM.on.ls=ls;
    FM.on.validateName=fixName;
    FM.on.createContent=function (f) {
        //console.log("FM.on.createContent", f, f.ext(), EXT, HEXT);
        if (curPrj.isHTMLFile(f) || curPrj.isLogicFile(f)) {
            //console.log("FM.on.createContent fileSet",fileSet(f));
            fileSet(f).forEach(function (e) {
                if (curPrj.isLogicFile(e) && !e.exists()) {
                    //e.text((lang=="py"?"# ":"// ")+langInfo.en+"\n");
                    if(lang=="js") e.text(/*"// "+langInfo.en+"\n*/
                    "// ここで扱われるJavaScriptは通常のJavaScriptとは異なります。詳しくは使用方法をご覧ください。\n");
                    else e.text("");
                } else if (curPrj.isHTMLFile(e)  && !e.exists()) {
                    e.text("<html>\n\n</html>");
                } else if (!e.exists()) {
                    e.text("");
                }
            });
        } else if (!f.exists()) {
            f.text("");
        }
        ide.fire("createContent",{file:f});
        if (builder.afterCreateContent)builder.afterCreateContent(f);
    };
    FM.on.displayName=function (f) {
        A.is(f,String);
        var r=dispNameFM(f);
        if (r) {
            return r;
        }
        return f;
    };
    FM.on.rm=function (f) {
        var fs=fileSet(f);
        for (var i=0;i<fs.length;i++) {
            if (fs[i].exists()) {
                fs[i].rm();
                logToServer2(fs[i].path(),"REMOVED","REMOVED","remove","remove",lang);
            }
            close(fs[i]);
        }
        ls();
        return false;
    };
    FM.on.mv=function (old,_new) {
        var olds=fileSet(old);
        var news=fileSet(_new);
        A(olds.length==news.length,"olds.length==news.length");
        var ci;
        for (var i=0;i<olds.length;i++) {
            if (olds[i].equals(old)) ci=i;
            if (olds[i].exists() && !news[i].exists()) {
                news[i].moveFrom(olds[i]);
                try {
                    logToServer2(olds[i].path(),"MOVED","MOVED","rename",
                    olds[i].path()+"->"+news[i].path()  ,lang);
                }catch(e){console.log(e.stack);}
                ide.fire("rename",{oldFile: olds[i], newFile: news[i]});
            }
            close(olds[i]);
        }
        A.is(ci,Number);
        ls();
        fl.select(news[ci]);
        return false;
    };
    F(FM.on);
    console.log("listing", curProjectDir.path());
    //fl.ls(curProjectDir);
    ls();
    console.log("listing", curProjectDir.path(),"done");
    function ls(){
        fl.ls(curProjectDir, desktopEnv.fileList || "latest");
    }
    function dispNameFL(name) {
        A.is(name,String);
        //var name=f.name();
        if (P.startsWith(name,".")) return null;
        if (P.isDir(name)) return name;
        //                          Why commented out??
        //  in dtl mode, if A.html is newer than A.dtl, "A" will be bound to "A.html"
        //      but html tab is not shown  -> cannot edit A.dtl, kowareta!!
        if (curPrj.isLogicFile(name) /*|| P.endsWith(name,HEXT)*/) return curPrj.truncEXT(name);//P.truncExt(name);//.p5.js
        return null;
    }
    function dispNameFM(name) {
        A.is(name,String);
        //var name=f.name();
        if (P.startsWith(name,".")) return null;
        if (P.isDir(name)) return name;
        //      this is used for mvdiag, both A.js and A.html shoud be "A"
        if (curPrj.isHTMLFile(name) || curPrj.isLogicFile(name)) return curPrj.truncEXT(name);//P.truncExt(name);//.p5.js
        return null;
    }
    function fixName(name, options) {
        A.is(arguments,[String]);
        options=options||{};
        var upcased=false;
        /*if (name.match(/^[a-z]/)) {
            name= name.substring(0,1).toUpperCase()+name.substring(1);
            upcased=true;
        }*/
        var pat={
            reg:/^[A-Za-z_][a-zA-Z0-9_]*$/, error:"名前は，半角英数字とアンダースコア(_)のみが使えます．"
        };
        if (lang==="c") {
            pat={
                reg:/^[A-Za-z_][\-a-zA-Z0-9_]*$/, error:"名前は，半角英数字とアンダースコア(_)，ハイフン(-)のみが使えます．"
            };
        }
        if (builder && builder.Semantics && builder.Semantics.importable ) {
            if (builder.Semantics.importable[name]) {
                return {ok:false, reason:`${name}はPythonのライブラリ名と同じなので使えません．`};
            }
        }
        if (name.match(pat.reg)) {
            if (sourceFiles[name]) {
                return {ok:false, reason:name+"は存在します"};
            }
            if (upcased) {
                return {ok:true, file: curProjectDir.rel(name+EXT), note: "先頭を大文字("+name+") にして作成します．"};
            }
            return {ok:true, file: curProjectDir.rel(name+EXT)};
        } else {
            return {ok:false, reason:pat.error};
        }
    }
    function getCurrentEditorInfo() {
        var f=fl.curFile();
        if (!f) return null;
        A.is(f,"SFile");
        return editors[f.path()];//A.is(editors[f.path()],"EditorInfo?");
    }
    function getCurrentEditor() {//->AceEditor?
        var i=getCurrentEditorInfo();
        if (i) return A.is(i.editor,"AceEditor");
        return null;
    }
    function displayMode(mode) {
        // mode == run     compile_error     runtime_error    edit
        var prog=getCurrentEditor();
        switch(mode) {
        case "run":
            if (prog) prog.blur();
            errorDialog.close();
            //showErrorPos($("#errorPos"));
            break;
        case "compile_error":
            SplashScreen.hide();
            break;
        case "runtime_error":
            SplashScreen.hide();
            break;
        case "edit":
            break;
        }
    }
    function stop() {
        /*if(curth){
            try {
                curth.kill();
            }catch(e) {
                //IE shows error "解放されたスクリプトからコードを実行できません。";
                console.log(e);
            }
            curth=null;
        }*/
        displayMode("edit");
    }
    //var curName,runURL;
    $("#fullScr").click(runFullScr);
    async function runFullScr(options) {
        options=options||{};
        options.fullScr=true;
        var inf=getCurrentEditorInfo();
        if (!inf && !options.mainFile) {
            alert("実行したいファイルを選んでください");
            return;
        }
        save();
        sync();
        if (builder && inf) {
            try {
                var curFile=inf ? inf.file : options.mainFile;
                var curFiles=fileSet(curFile);
                var curHTMLFile=curFiles[0];
                var curLogicFile=curFiles[1];
                options.curHTMLFile=curHTMLFile;
                options.curLogicFile=curLogicFile;
                options.upload=true;
                //var pub;
                //var pub=Auth.remotePublics()/*FS.get("/public/")*/.rel(curProjectDir.name());
                SplashScreen.show();
                //pub=await Auth.publishedDir(curPrj.getName()+"/");
                //options.mainFile=curLogicFile;
                const buildStatus=await build(options);
                console.log("built", options, buildStatus);
                //await builder.build(options);
                //await builder.upload(pub);
                console.log("tonyu upl done");
                SplashScreen.hide();
                //const _u=await Auth.publishedURL(curPrj.getName()+"/");
                var cv=$("<div>");
                cv.dialog();
                var runURL=buildStatus.publishedURL;//_u+(lang=="tonyu"?"index.html":curHTMLFile.name());
                ide.fire("publishedURL",{url:runURL, dialog:cv});
                cv.append($("<div>").append(
                    $("<a>").attr({target:"runit",href:runURL}).text("別ページで開く")
                ));
                cv.append($("<div>").qrcode({width:200,height:200,text:runURL}));
                const autoopen=    $("<input>").attr({type:"checkbox", id: "autoopen"});
                const doAutoopen=()=>{
                    window.open(runURL,"runit");
                };
                if (desktopEnv.fullScrAutoOpen) {
                    autoopen.prop("checked",true);
                    doAutoopen();
                }
                autoopen.on("change", ()=>{
                    const o=autoopen.prop("checked");
                    if (o){
                        doAutoopen();
                    }
                    desktopEnv.fullScrAutoOpen=o;
                    saveDesktopEnv();
                });
                cv.append($("<div>").append(
                    autoopen
                ).append(
                    $("<label>").attr({for:"autoopen"}).text("自動的に開く")
                ));
                if (builder.qrDialog) builder.qrDialog({
                    dialogJQ:cv,
                    editorInfo:getCurrentEditorInfo(),
                    rerun:runFullScr
                });
                if (!buildStatus.synced) return sync();
            }catch(e) {
                EC.handleException(e);
                SplashScreen.hide();
            }
        }
    }
    async function build(options) {
        if (!options.curLogicFile || !options.curHTMLFile) {
            throw new Error("options should be set: curLogicFile, curHTMLFile");// Mandatory "options" :-)
        }
        const {curLogicFile, curHTMLFile}=options;
        options.mainFile=options.curLogicFile;
        if (options.upload) {
            const pubd=await Auth.publishedDir(curProjectDir.name());
            const pubu=await Auth.publishedURL(curProjectDir.name());
            options.publishedDir=pubd;
            options.publishedURL=pubu;
        }
        const buildStatus=(await builder.build(options))||{};
        console.log("buildStatus", buildStatus);
        if (options.upload) {
            if (buildStatus.publishedURL) {
                options.publishedURL=buildStatus.publishedURL;
            } else {
                buildStatus.publishedURL=options.publishedURL+curHTMLFile.name();
            }
            if (buildStatus.publishedDir) {
                options.publishedDir=buildStatus.publishedDir;
            }
            await builder.upload(options.publishedDir);
        }
        logToServer2(curLogicFile.path(),curLogicFile.text(),curHTMLFile.text(),langInfo.en+" Build","ビルドしました",langInfo.en);
        buildStatus.indexFile=buildStatus.indexFile|| ram.rel(curHTMLFile.name());
        return buildStatus;
    }
    //\run
    async function run(options) {//run!!
        options=options||{};
        const inf=getCurrentEditorInfo();
        if (!inf && !options.mainFile) {
            alert("実行したいファイルを開いてください。");
            return;
        }
        let syncBefore=options.runAt==="server";
        var newwnd;
        if (RunDialog2.hasLocalBrowserWindow()) {
            newwnd=window.open("about:blank","LocalBrowserWindow"+Math.random(),"menubar=no,toolbar=no,width=500,height=500");
        }
        var curFile=inf ? inf.file : options.mainFile;
        var curFiles=fileSet(curFile);
        var curHTMLFile=curFiles[0];
        var curLogicFile=curFiles[1];
        options.curHTMLFile=curHTMLFile;
        options.curLogicFile=curLogicFile;
	    window.sendResult=function(resDetail, lang, result="Run"){
            const resCon=r=>{
                if (typeof r==="string") return r;
                if (r && r.message) return r.message;
                return r+"";
            };
            lang=lang||"c";
            console.log("sendResult",resDetail,lang);
            if (result==="Run" && resCon(resDetail).match(/Traceback.*most recent call last/)) {
                result="Runtime Error";
            }
            logToServer2(curLogicFile.path(),curLogicFile.text(),curHTMLFile.text(),(langInfo.en||lang)+" "+result, resDetail,langInfo.en);
        };
        window.onmessage=(e)=>{
            console.log("MESG",e);
        };
        stop();
        save();
        if (syncBefore) {
            await sync();
        }
        // display=none
        $("[name=runtimeErrorDialog]").parent().css("display","none");
        displayMode("run");
    	try {
            SplashScreen.show();
    	    $("#fullScr").attr("href",JS_NOP).text("別ページで表示");
            //options.mainFile=curLogicFile;
            options.upload=ALWAYS_UPLOAD;
            const buildStatus=await build(options);
            console.log("built", options, buildStatus);
            //logToServer2(curLogicFile.path(),curLogicFile.text(),curHTMLFile.text(),langInfo.en+" Run","実行しました",langInfo.en);
            if (ALWAYS_UPLOAD) {
                /*const pubd=await Auth.publishedDir(curProjectDir.name());
                console.log("Upload comp",pubd);
                await builder.upload(pubd);
                const pub=await Auth.publishedURL(curProjectDir.name());*/
                var runURL=buildStatus.publishedURL;//pub+(lang=="tonyu"?"index.html": curHTMLFile.name());
                if (options.sendURL) {
                    options.sendURL(runURL, location.href);
                    return;
                }
                return IframeDialog.show(runURL,{width:600,height:400});
            } else {
                var indexF=buildStatus.indexFile;// ram.rel(lang=="tonyu"?"index.html":curHTMLFile.name());
                const params=options.stdin?{stdin:options.stdin}:{};
                if (isSplit()) {
                    return RunDialog2.embed(indexF, {
                        params,
                        window:newwnd,
                        targetDOM: $("#runEmbed"),
                        toEditor:focusToEditor,
                        font:desktopEnv.editorFontSize||18
                    });
                } else {
                    return RunDialog2.show(indexF,{
                        params,
                        window:newwnd,
                        height:RunDialog2.geom.height||screenH-50,
                        toEditor:focusToEditor,
                        font:desktopEnv.editorFontSize||18
                    });
                }
            }
        }catch(e) {
            console.log(e,e.stack);
            if (ALWAYS_UPLOAD && options.sendURL) {
                options.sendURL(e/*"error://"+e.stack*/, location.href);
            }
            if (e.isTError) {
                errorDialog.show(e);//showErrorPos($("#errorPos"),e);
                logToServer2(curLogicFile.path(),curLogicFile.text(),curHTMLFile.text(),langInfo.en+" Compile Error",/*e.src+":"+e.pos+"\n"+e.mesg*/e,langInfo.en);
            } else {
                EC.handleException(e);
            }
        } finally {
            SplashScreen.hide();
            return syncBefore ? true : sync();
        }
    }
    window.moveFromFrame=function (name) {
        A.is(name,String);
        var f=curProjectDir.rel(name);
        if (f.exists()) {
            fl.select(f);
            run();
        }
    };
    window.closeRunDialog=()=>{
        setTimeout(()=>RunDialog2.close(),100);
    };
    //var curth;
    /*window.setupFrame=function (r) {
        A.is(r,Function);
        var inf=getCurrentEditorInfo();
        var ht="";
        var curFile=inf.file;
        var curFiles=fileSet(curFile);
        var curHTMLFile=curFiles[0];
        //var curJSFile=curFiles[1];
        ht=curHTMLFile.text();
        var f=curPrj.getOutputFile();
        var js=f.text();
        curth=r(ht,js, curName);
        SplashScreen.hide();
    };*/
    var alertOnce;
    alertOnce=function (e) {
        alert(e);
        alertOnce=function(){};
    };
    window.onerror=function (a,b,c,d,e) {
        console.log("window.onerror",arguments);
        if (!e) return;
        return EC.handleException(e);
    };
    const errorDialog=new ErrorDialog();
    window.errorDialog=errorDialog;
    EC.handleException=async function (e) {
        if (e.type==="dialogClosed") {
            console.log(e.stack||e);
            return;
        }
        const srcpos=await errorDialog.show(e);
        console.log("srcpos", srcpos);
        if (srcpos) {
            // TODO errorDialogで表示した結果（posとか)を含めてlogToServer2
            e.pos=e.pos||srcpos.pos;
            e.src=e.src||srcpos.src;
        }
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        var curFile=inf && inf.file;
        var curFiles=curFile && fileSet(curFile);
        var curHTMLFile=curFiles && curFiles[0];
        var curJSFile=curFiles && curFiles[1];
        if (curJSFile) {
            var posinfo="";
            //if (e.srcPath && e.pos) posinfo="("+e.srcPath+":"+e.pos+")";
            logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),langInfo.en+" Runtime Error",e/*posinfo+(e.stack || e)*/,langInfo.en);
        }
    };
    function close(rm) { // rm or mv
        var i=editors[rm.path()]; //getCurrentEditorInfo();
        if (i) {
            A.is(i,"EditorInfo");
            i.editor.destroy();
            i.dom.remove();
            delete editors[rm.path()];
            //alert(editors[rm.path()]);
        }
    }
    function fixZSpace(prog) {
        A.is(prog,"AceEditor");
        var prev=prog.getValue();
        var fixed=prev.replace(/　/g,"  ");
        if (fixed!==prev) {
            var cur=prog.getCursorPosition();
            prog.setValue(fixed);
            prog.clearSelection();
            prog.moveCursorTo(cur.row, cur.column);
        }
    }
    function fixEditorIndent(prog) {
        //if (lang==="dncl" || lang==="py" || lang==="p5.py") return;// bad know-how!
        if (langInfo.manualIndent) return;
        A.is(prog,"AceEditor");
        var prev=prog.getValue();
        let fixed;
        if (builder.getIndentFixer) {
            fixed=builder.getIndentFixer().fix(prev);
        } else {
            fixed=fixIndent( prev );
        }
        fixed=fixed.replace(/　/g,"  ");

        if (fixed!==prev) {
            var cur=prog.getCursorPosition();
            prog.setValue(fixed);
            prog.clearSelection();
            prog.moveCursorTo(cur.row, cur.column);
        }
    }
    /*function reloadFromFiles() {
        for (var path in editors) {
            var inf=editors[path];
            var curFile=inf.file; //fl.curFile();
            var prog=inf.editor; //getCurrentEditor();
            if (curFile.exists() && prog) {
                prog.setValue(curFile.text());
                prog.clearSelection();
            }
        }
    }*/
    function save() {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        var curFile=inf.file; //fl.curFile();
        var prog=inf.editor; //getCurrentEditor();
        if (curFile && prog && !curFile.isReadOnly()) {
            if (curPrj.isLogicFile(curFile)) fixEditorIndent(prog);
            else fixZSpace(prog);
            var old=curFile.text();
            var nw=prog.getValue();
            if (old!=nw) {
                curFile.text(nw);
                inf.lastTimeStamp=curFile.lastUpdate();
                logToServer2(curFile.path(),curFile.text(),/*curHTMLFile.text()*/"HTML","Save","保存しました",langInfo.en);
            }
        }
        fl.setModified(false);
    }
    function watchModified() {
        try {
            var inf=getCurrentEditorInfo();
            if (!inf) return;
            var curFile=inf.file; //fl.curFile();
        	var prog=inf.editor;//getCurrentEditor();
        	var mod=(curFile.exists()?curFile.text():"")!=prog.getValue();
        	fl.setModified(mod);
    	    $("#modLabel").text(mod?"(変更あり)":"");
    	    if(mod){
                if (inf.file.exists() && inf.lastTimeStamp<inf.file.lastUpdate()) {
                    inf.editor.setValue(inf.file.text());
                    inf.editor.clearSelection();
                    inf.lastTimeStamp=inf.file.lastUpdate();
                }
    	        unsaved=true;
    	        unsynced=true;
                if (typingCheckContent!==prog.getValue()) {
                    typingCheckContent=prog.getValue();
                    sendUnsavedContentCount=0;
                }
                if (lastSentUnsavedContent!==prog.getValue()) {
                    sendUnsavedContentCount++;
                }
                if (sendUnsavedContentCount>=10) {
                    sendUnsavedContentCount=0;
                    lastSentUnsavedContent=prog.getValue();
                    logToServer2(curFile.path(),lastSentUnsavedContent,"",langInfo.en+" Unsaved","未保存の内容",langInfo.en);
                }
    	    }else{
    	        unsaved=false;
                typingCheckContent=null;
                lastSentUnsavedContent=null;
                sendUnsavedContentCount=0;
    	    }
        }catch(e) {
            console.log(e);
        }
    }
    function fileSet(c) {
        A.is(c,"SFile");
        var n=curPrj.truncEXT(c);//c.truncExt();//.p5.js
        return [c.up().rel(n+HEXT), c.up().rel(n+EXT)];
    }
    $(".selTab").click(function () {
        var ext=A.is($(this).attr("data-ext"),String);
        var c=fl.curFile();
        if (!c) {
            alert("まず、メニューの「ファイル」→「新規」でファイルを作るか、左のファイル一覧からファイルを選んでください。");
            return;
        }
        var n=curPrj.truncEXT(c);//c.truncExt();//.p5.js
        var f=c.up().rel(n+ext);
        if (!f.exists()) {
            FM.on.createContent(f);
        }
        fl.select(f);
    });
    setInterval(watchModified,1000);
    var curDOM;
    const socializeDialog=SocializeDialog(ide);
    let disableNote;
    function open(f) {
	// do not call directly !!  it doesnt change fl.curFile. use fl.select instead
        A.is(f,"SFile");
        if (!window.ace) {
            alert("しばらくしてからもう一度開いてください");
            return true;
        }
        if (f.isDir()) {
            return;
        }
        save();
        if (curDOM) curDOM.hide();
        var inf=editors[f.path()];
        const ext=(curPrj.isLogicFile(f)?EXT:curPrj.isHTMLFile(f)?HEXT:"");
        $(".selTab").removeClass("selected");
        $(".selTab[data-ext='"+ext+"']").addClass("selected");
        if (!inf) {
            var progDOM=$("<pre>").css("height", editorH+"px").text(f.text()).appendTo("#progs");
            progDOM.attr("data-file",f.name());
            var prog=root.ace.edit(progDOM[0]);
            prog.setShowInvisibles(desktopEnv.showInvisibles);
            if (typeof desktopEnv.editorFontSize=="number") prog.setFontSize(desktopEnv.editorFontSize);
    	    else prog.setFontSize(18);
            //prog.setFontSize(20);
            prog.setTheme("ace/theme/eclipse");
            //defaultKeyboard=prog.getKeyboardHandler();
            //if(desktopEnv.editorMode=="emacs") prog.setKeyboardHandler("ace/keyboard/emacs");
            //prog.setKeyboardHandler(defaultKeyboard);
            const isLogicFile=curPrj.isLogicFile(f);
            if (isLogicFile) {
                const mode=langInfo.mode || "ace/mode/tonyu";
                //console.log("mode/c/set");
                prog.getSession().setMode(mode);
            } else if (curPrj.isHTMLFile(f)) {
                //console.log("mode/html/set");
                prog.getSession().setMode("ace/mode/html");
            }
            prog.getSession().setUseWrapMode(true);
            if (ace_language_tools) {
                const completers=[ace_language_tools.textCompleter];
                prog.setOptions({enableLiveAutocompletion:completers});
            }
            inf={file:f , editor: prog, dom:progDOM};
            editors[f.path()]=inf;
            progDOM.click(F(function () {
                displayMode("edit");
            }));
            prog.setReadOnly(false);
            prog.clearSelection();
            prog.focus();
            curDOM=progDOM;
        } else {
            if (inf.file.exists() && inf.lastTimeStamp<inf.file.lastUpdate()) {
                inf.editor.setValue(inf.file.text());
                inf.editor.clearSelection();
                inf.lastTimeStamp=inf.file.lastUpdate();
            }
            inf.dom.show();
            inf.editor.focus();
            curDOM=inf.dom;
            //if(desktopEnv.editorMode=="emacs") inf.editor.setKeyboardHandler("ace/keyboard/emacs");
            //else inf.editor.setKeyboardHandler(defaultKeyboard);
        }
        const [curHTMLFile, curLogicFile]=fileSet(inf.file);
        logToServer2(curLogicFile.path(),curLogicFile.text(),curHTMLFile.text(),langInfo.en+" Open","開きました",langInfo.en);

        commentDialog.getComment(f).then(function (c) {
            $("#commentLink").empty();
            console.log(c);
            if (c) {
                $("#commentLink").append("&nbsp;").append(
                    $("<a>").text("採点結果").click(function () {
                        commentDialog.show(c);
                    })).append("&nbsp;");
            }
        }).catch(DU.E);
        const filePath=inf.file.relPath(curProjectDir.up());
        $("#hintLink").empty().append(
            UI("a",{"href": ctrl.url("TeacherLog/diffSeq",{hint:1,file:filePath}), "target":"hint"},
            "ヒントを見る")
        );
        try {
            $("#customLink").html(fileMenuTemplate.replaceAll("${PATH}",f.path()).replaceAll("${USER}",Auth.user).replaceAll("${CLASS}",Auth.class));
        } catch(e) {

        }
        $("#curFileLabel").text(curPrj.truncEXT(f)/*f.truncExt()*/);//.p5.js
        if (inf.file.exists()) inf.lastTimeStamp=inf.file.lastUpdate();
        if (disableNote===false) socializeDialog.show(inf.file);
    }
    root.d=function () {
        root.Tonyu.currentProject.dumpJS.apply(this,arguments);
    };
    function loadDesktopEnv() {
        var d=curProjectDir.rel(".desktop");
        var res;
        if (d.exists()) {
            res=d.obj();
        } else {
            res={};
        }
        if (!res.runMenuOrd) res.runMenuOrd=[];
        //desktopEnv=res;
        return res;
    }
    function saveDesktopEnv() {
        var d=curProjectDir.rel(".desktop");
        d.obj(desktopEnv);
    }
    function isSplit() {
        return desktopEnv.runDialog==="split";
    }
    if (root.progBar) {root.progBar.clear();}
    let desktopSettingDialog;
    function editorSetting() {
        desktopSettingDialog=desktopSettingDialog||new DesktopSettingDialog(ide);
        desktopSettingDialog.show(ide);
    }
    /*function textSize() {
        var prog=getCurrentEditor();
        var s=prompt("エディタの文字の大きさ", desktopEnv.editorFontSize||18);
        if(s==null) return;
        desktopEnv.editorFontSize=parseInt(s);
        if (prog) prog.setFontSize(desktopEnv.editorFontSize||18);
        saveDesktopEnv();
        window.editorTextSize=desktopEnv.editorFontSize||18;
    }*/
    /*function editorType() {
        var prog=getCurrentEditor();
        if(prog.getKeyboardHandler()==defaultKeyboard){
            prog.setKeyboardHandler("ace/keyboard/emacs");
            desktopEnv.editorMode="emacs";
        }else{
            prog.setKeyboardHandler(defaultKeyboard);
            desktopEnv.editorMode="ace-default";
        }
        saveDesktopEnv();
        focusToEditor();
    }*/
    $("#home").click(F(function () {
        save();
        goHome();
    }));
    //$("#runMenu").click(F(run));
    function goHome(){
        console.log("goHome");
        unsynced=false;
        location.href="index.html";
    }
    $("#openHelp").click(function(){
        window.open(helpURL,"helpTab");
    });
    sh.curFile=function () {
        return fl.curFile();
    };
    $(window).on("beforeunload",function(e){
        e=e||{};
        if(unsynced || unsaved){
            return "保存されていないデータがあります。\nこれまでの作業を保存するためには一度実行してください。";
        }
    });
    $("#save").click(F(function () {
        save();
        sync();
    }));
    FM.onMenuStart=save;
    function focusToEditor(){
        var prog=getCurrentEditor();
        if(prog) prog.focus();
    }
    if (root.BitArrow) root.BitArrow.ide=ide;
    window.getCurrentEditorInfo=getCurrentEditorInfo;
    SplashScreen.hide();
    window.NotificationDialog=NotificationDialog;
    function openDummyEditor() {
        var progDOM=$("<pre>").css("height", "500px").text("#hoge\n'hoge'");
        var prog2=root.ace.edit(progDOM[0]);
        prog2.getSession().setMode("ace/mode/python");
        //progDOM.dialog();
    }
}// of ready
});

}).call(window);
