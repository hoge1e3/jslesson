Util=(function () {

function getQueryString(key, default_)
{
    if (arguments.length===1) default_="";
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
function extend(d,s) {
    for (var i in (s||{})) {d[i]=s[i];}
    return d;
}
// From http://hakuhin.jp/js/base64.html#BASE64_DECODE_ARRAY_BUFFER
function Base64_To_ArrayBuffer(base64){
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
return {
    getQueryString:getQueryString,
    endsWith: endsWith, startsWith: startsWith,
    Base64_To_ArrayBuffer:Base64_To_ArrayBuffer,
    Base64_From_ArrayBuffer:Base64_From_ArrayBuffer,
    //utf8bytes2str: utf8bytes2str,
    //str2utf8bytes: str2utf8bytes,
    privatize: privatize,
    extend:extend
    /*hasNodeBuffer:hasNodeBuffer,
    isNodeBuffer: isNodeBuffer,
    isBuffer: isBuffer*/
};
})();

define("Util", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Util;
    };
}(this)));

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
            a=this.failMesg.concat(value).concat(a).concat(["mode",this._mode]);
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
    function isArg(a) {
        return "length" in a && "caller" in a && "callee" in a;
    };
    return assert;
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
        var check;
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
            var args=getArgs(m);
            if (args[0]!==thisName) return m;
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
        return klass;
    };
    function getArgs(f) {
        var fpat=/function[^\(]+\(([^\)]*)\)/;
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
    Klass.Function=function () {throw new Exception("Abstract");}
    Klass.opt=A.opt;
    Klass.Binder=Klass.define({
        $this:"t",
        $:function (t,target) {
            for (var k in target) (function (k){
                if (typeof target[k]!=="function") return;
                t[k]=function () {
                    var a=Array.prototype.slice.call(arguments);
                    //console.log(this, this.__target);
                    //A(this.__target,"target is not set");
                    return target[k].apply(target,a);
                };
            })(k);
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
define('Tonyu.Thread',["DeferredUtil","Klass"],function (DU,Klass) {
	var cnts={enterC:{},exitC:0};
	try {window.cnts=cnts;}catch(e){}
	var TonyuThread=Klass.define({
		$: function TonyuThread() {
			this.frame=null;
			this._isDead=false;
			//this._isAlive=true;
			this.cnt=0;
			this._isWaiting=false;
			this.fSuspended=false;
			this.tryStack=[];
			this.preemptionTime=60;
			this.onEndHandlers=[];
			this.onTerminateHandlers=[];
			this.age=0; // inc if object pooled
		},
		isAlive:function isAlive() {
			return !this.isDead();
			//return this.frame!=null && this._isAlive;
		},
		isDead: function () {
			return this._isDead=this._isDead || (this.frame==null) ||
			(this._threadGroup && (
					this._threadGroup.objectPoolAge!=this.tGrpObjectPoolAge ||
					this._threadGroup.isDeadThreadGroup()
			));
		},
		setThreadGroup: function setThreadGroup(g) {// g:TonyuThread
			this._threadGroup=g;
			this.tGrpObjectPoolAge=g.objectPoolAge;
			//if (g) g.add(fb);
		},
		isWaiting:function isWaiting() {
			return this._isWaiting;
		},
		suspend:function suspend() {
			this.fSuspended=true;
			this.cnt=0;
		},
		enter:function enter(frameFunc) {
			//var n=frameFunc.name;
			//cnts.enterC[n]=(cnts.enterC[n]||0)+1;
			this.frame={prev:this.frame, func:frameFunc};
		},
		apply:function apply(obj, methodName, args) {
			if (!args) args=[];
			var method;
			if (typeof methodName=="string") {
				method=obj["fiber$"+methodName];
				if (!method) {
					throw new Error("メソッド"+methodName+"が見つかりません");
				}
			}
			if (typeof methodName=="function") {
				method=methodName.fiber;
			}
			args=[this].concat(args);
			var pc=0;
			return this.enter(function (th) {
				switch (pc){
				case 0:
					method.apply(obj,args);
					pc=1;break;
				case 1:
					th.termStatus="success";
					th.notifyEnd(th.retVal);
					args[0].exit();
					pc=2;break;
				}
			});
		},
		notifyEnd:function (r) {
			this.onEndHandlers.forEach(function (e) {
				e(r);
			});
			this.notifyTermination({status:"success",value:r});
		},
		notifyTermination:function (tst) {
			this.onTerminateHandlers.forEach(function (e) {
				e(tst);
			});
		},
		on: function (type,f) {
			if (type==="end"||type==="success") this.onEndHandlers.push(f);
			if (type==="terminate") {
				this.onTerminateHandlers.push(f);
				if (this.handleEx) delete this.handleEx;
			}
		},
		promise: function () {
			var fb=this;
			return DU.funcPromise(function (succ,err) {
				fb.on("terminate",function (st) {
					if (st.status==="success") {
						succ(st.value);
					} else if (st.status==="exception"){
						err(st.exception);
					} else {
						err(new Error(st.status));
					}
				});
			});
		},
		then: function (succ,err) {
			if (err) return this.proimse().then(succ,err);
			else return this.proimse().then(succ);
		},
		fail: function (err) {
			return this.promise().fail(err);
		},
		gotoCatch: function gotoCatch(e) {
			var fb=this;
			if (fb.tryStack.length==0) {
				fb.termStatus="exception";
				fb.kill();
				if (fb.handleEx) fb.handleEx(e);
				else fb.notifyTermination({status:"exception",exception:e});
				return;
			}
			fb.lastEx=e;
			var s=fb.tryStack.pop();
			while (fb.frame) {
				if (s.frame===fb.frame) {
					fb.catchPC=s.catchPC;
					break;
				} else {
					fb.frame=fb.frame.prev;
				}
			}
		},
		startCatch: function startCatch() {
			var fb=this;
			var e=fb.lastEx;
			fb.lastEx=null;
			return e;
		},
		exit: function exit(res) {
			//cnts.exitC++;
			this.frame=(this.frame ? this.frame.prev:null);
			this.retVal=res;
		},
		enterTry: function enterTry(catchPC) {
			var fb=this;
			fb.tryStack.push({frame:fb.frame,catchPC:catchPC});
		},
		exitTry: function exitTry() {
			var fb=this;
			fb.tryStack.pop();
		},
		waitEvent: function waitEvent(obj,eventSpec) { // eventSpec=[EventType, arg1, arg2....]
			var fb=this;
			fb.suspend();
			if (!obj.on) return;
			var h;
			eventSpec=eventSpec.concat(function () {
				fb.lastEvent=arguments;
				fb.retVal=arguments[0];
				h.remove();
				fb.steps();
			});
			h=obj.on.apply(obj, eventSpec);
		},
		runAsync: function runAsync(f) {
			var fb=this;
			var succ=function () {
				fb.retVal=arguments;
				fb.steps();
			};
			var err=function () {
				var msg="";
				for (var i=0; i<arguments.length; i++) {
					msg+=arguments[i]+",";
				}
				if (msg.length==0) msg="Async fail";
				var e=new Error(msg);
				e.args=arguments;
				fb.gotoCatch(e);
				fb.steps();
			};
			fb.suspend();
			setTimeout(function () {
				f(succ,err);
			},0);
		},
		waitFor: function waitFor(j) {
			var fb=this;
			fb._isWaiting=true;
			fb.suspend();
			if (j instanceof TonyuThread) j=j.promise();
			return DU.ensureDefer(j).then(function (r) {
				fb.retVal=r;
				fb.steps();
			}).fail(function (e) {
				if (e instanceof Error) {
					fb.gotoCatch(e);
				} else {
					var re=new Error(e);
					re.original=e;
					fb.gotoCatch(re);
				}
				fb.steps();
			});
		},
		resume: function (retVal) {
			this.retVal=retVal;
			this.steps();
		},
		steps: function steps() {
			var fb=this;
			if (fb.isDead()) return;
			var sv=Tonyu.currentThread;
			Tonyu.currentThread=fb;
			fb.cnt=fb.preemptionTime;
			fb.preempted=false;
			fb.fSuspended=false;
			while (fb.cnt>0 && fb.frame) {
				try {
					//while (new Date().getTime()<lim) {
					while (fb.cnt-->0 && fb.frame) {
						fb.frame.func(fb);
					}
					fb.preempted= (!fb.fSuspended) && fb.isAlive();
				} catch(e) {
					fb.gotoCatch(e);
				}
			}
			Tonyu.currentThread=sv;
		},
		kill: function kill() {
			var fb=this;
			//fb._isAlive=false;
			fb._isDead=true;
			fb.frame=null;
			if (!fb.termStatus) {
				fb.termStatus="killed";
				fb.notifyTermination({status:"killed"});
			}
		},
		clearFrame: function clearFrame() {
			this.frame=null;
			this.tryStack=[];
		}
	});
	return TonyuThread;
});

define('Tonyu.Iterator',["Klass"], function (Klass) {
	var ArrayValueIterator=Klass.define({
		$: function ArrayValueIterator(set) {
			this.set=set;
			this.i=0;
		},
		next:function () {
			if (this.i>=this.set.length) return false;
			this[0]=this.set[this.i];
			this.i++;
			return true;
		}
	});
	var ArrayKeyValueIterator=Klass.define({
		$: function ArrayKeyValueIterator(set) {
			this.set=set;
			this.i=0;
		},
		next:function () {
			if (this.i>=this.set.length) return false;
			this[0]=this.i;
			this[1]=this.set[this.i];
			this.i++;
			return true;
		}
	});
	var ObjectKeyIterator=Klass.define({
		$: function ObjectKeyIterator(set) {
			this.elems=[];
			for (var k in set) {
				this.elems.push(k);
			}
			this.i=0;
		},
		next:function () {
			if (this.i>=this.elems.length) return false;
			this[0]=this.elems[this.i];
			this.i++;
			return true;
		}
	});
	var ObjectKeyValueIterator=Klass.define({
		$: function ObjectKeyValueIterator(set) {
			this.elems=[];
			for (var k in set) {
				this.elems.push([k,set[k]]);
			}
			this.i=0;
		},
		next:function () {
			if (this.i>=this.elems.length) return false;
			this[0]=this.elems[this.i][0];
			this[1]=this.elems[this.i][1];
			this.i++;
			return true;
		}
	});


	function IT(set, arity) {
		//var res={};
		if (set.tonyuIterator) {
			return set.tonyuIterator(arity);
		} else if (set instanceof Array) {
			//res.i=0;
			if (arity==1) {
				return new ArrayValueIterator(set);
				/*res.next=function () {
					if (res.i>=set.length) return false;
					this[0]=set[res.i];
					res.i++;
					return true;
				};*/
			} else {
				return new ArrayKeyValueIterator(set);
				/*res.next=function () {
					if (res.i>=set.length) return false;
					this[0]=res.i;
					this[1]=set[res.i];
					res.i++;
					return true;
				};*/
			}
		} else if (set instanceof Object){
			//res.i=0;
			//var elems=[];
			if (arity==1) {
				return new ObjectKeyIterator(set);
				/*for (var k in set) {
					elems.push(k);
				}
				res.next=function () {
					if (res.i>=elems.length) return false;
					this[0]=elems[res.i];
					res.i++;
					return true;
				};*/
			} else {
				return new ObjectKeyValueIterator(set);
				/*for (var k in set) {
					elems.push([k, set[k]]);
				}
				res.next=function () {
					if (res.i>=elems.length) return false;
					this[0]=elems[res.i][0];
					this[1]=elems[res.i][1];
					res.i++;
					return true;
				};*/
			}
		} else {
			console.log(set);
			throw new Error(set+" is not iterable");
		}
		return res;
	}

//   Tonyu.iterator=IT;
	return IT;
});

if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('Tonyu',["assert","Tonyu.Thread","Tonyu.Iterator","DeferredUtil"],
		function (assert,TT,IT,DU) {
return Tonyu=function () {
	var preemptionTime=60;
	function thread() {
		var t=new TT;
		t.handleEx=handleEx;
		return t;
	}
	function timeout(t) {
		return DU.funcPromise(function (s) {
			setTimeout(s,t);
		});
	}
	function animationFrame() {
		return DU.funcPromise( function (f) {
			requestAnimationFrame(f);
		});
	}

	function handleEx(e) {
		if (Tonyu.onRuntimeError) {
			Tonyu.onRuntimeError(e);
		} else {
			if (typeof $LASTPOS=="undefined") $LASTPOS=0;
			alert ("エラー! at "+$LASTPOS+" メッセージ  : "+e);
			console.log(e.stack);
			throw e;
		}
	}
	klass=function () {
		alert("この関数は古くなりました。コンパイルをやり直してください。 Deprecated. compile again.");
		throw new Error("この関数は古くなりました。コンパイルをやり直してください。 Deprecated. compile again.");
	};
	klass.addMeta=addMeta;
	function addMeta(fn,m) {
		assert.is(arguments,[String,Object]);
		return extend(klass.getMeta(fn), m);
	}
	klass.removeMeta=function (n) {
		delete classMetas[n];
	};
	klass.getMeta=function (k) {// Class or fullName
		if (typeof k=="function") {
			return k.meta;
		} else if (typeof k=="string"){
			var mm = classMetas[k];
			if (!mm) classMetas[k]=mm={};
			return mm;
		}
	};
	klass.ensureNamespace=function (top,nsp) {
		var keys=nsp.split(".");
		var o=top;
		var i;
		for (i=0; i<keys.length; i++) {
			var k=keys[i];
			if (!o[k]) o[k]={};
			o=o[k];
		}
		return o;
	};
	Function.prototype.constructor=function () {
		throw new Error("This method should not be called");
	};
	klass.define=function (params) {
		// fullName, shortName,namspace, superclass, includes, methods:{name/fiber$name: func}, decls
		var parent=params.superclass;
		var includes=params.includes;
		var fullName=params.fullName;
		var shortName=params.shortName;
		var namespace=params.namespace;
		var methods=params.methods;
		var decls=params.decls;
		var nso=klass.ensureNamespace(Tonyu.classes, namespace);
		var prot=methods;
		var init=prot.initialize;
		delete prot.initialize;
		var res;
		res=(init?
			/*(parent? function () {
				if (!(this instanceof res)) useNew(fullName);
				if (Tonyu.runMode) init.apply(this,arguments);
				else parent.apply(this,arguments);
			}:function () {
				if (!(this instanceof res)) useNew(fullName);
				if (Tonyu.runMode) init.apply(this,arguments);
			})*/
			function () {
				if (!(this instanceof res)) useNew(fullName);
				init.apply(this,arguments);
			}:
			(parent? function () {
				if (!(this instanceof res)) useNew(fullName);
				parent.apply(this,arguments);
			}:function (){
				if (!(this instanceof res)) useNew(fullName);
			})
		);
		nso[shortName]=res;
		res.methods=prot;
		includes.forEach(function (m) {
			if (!m.methods) throw m+" Does not have methods";
			for (var n in m.methods) {
				if (!(n in prot)) {
					prot[n]=m.methods[n];
				}
			}
		});
		var props={};
		var propReg=/^__([gs]et)ter__(.*)$/;
		for (var k in prot) {
			if (k.match(/^fiber\$/)) continue;
			if (prot["fiber$"+k]) {
				prot[k].fiber=prot["fiber$"+k];
				prot[k].fiber.methodInfo={name:k,klass:res,fiber:true};
			}
			prot[k].methodInfo={name:k,klass:res};
			var r=propReg.exec(k);
			if (r) {
				props[r[2]]=props[r[2]]||{};
				props[r[2]][r[1]]=prot[k];
			}
		}
		res.prototype=bless(parent, prot);
		res.prototype.isTonyuObject=true;
		for (var k in props) {
			Object.defineProperty(res.prototype, k , props[k]);
		}
		res.meta=addMeta(fullName,{
			fullName:fullName,shortName:shortName,namepsace:namespace,decls:decls,
			superclass:parent ? parent.meta : null,func:res,
			includes:includes.map(function(c){return c.meta;})
		});
		var m=klass.getMeta(res);
		res.prototype.getClassInfo=function () {
			return m;
		};
		return res;
	};
	klass.isSourceChanged=function (k) {
		k=k.meta||k;
		if (k.src && k.src.tonyu) {
			if (!k.nodeTimestamp) return true;
			return k.src.tonyu.lastUpdate()> k.nodeTimestamp;
		}
		return false;
	};
	klass.shouldCompile=function (k) {
		k=k.meta||k;
		if (klass.isSourceChanged(k)) return true;
		var dks=klass.getDependingClasses(k);
		for (var i=0 ; i<dks.length ;i++) {
			if (klass.shouldCompile(dks[i])) return true;
		}
	};
	klass.getDependingClasses=function (k) {
		k=k.meta||k;
		var res=[];
		if (k.superclass) res=[k.superclass];
		if (k.includes) res=res.concat(k.includes);
		return res;
	};
	function bless( klass, val) {
		if (!klass) return val;
		return extend( Object.create(klass.prototype) , val);
		//return extend( new klass() , val);
	}
	function extend (dst, src) {
		if (src && typeof src=="object") {
			for (var i in src) {
				dst[i]=src[i];
			}
		}
		return dst;
	}

	//alert("init");
	var globals={};
	var classes={};// classes.namespace.classname= function
	var classMetas={}; // classes.namespace.classname.meta ( or env.classes / ctx.classes)
	function setGlobal(n,v) {
		globals[n]=v;
	}
	function getGlobal(n) {
		return globals[n];
	}
	function getClass(n) {
		//CFN: n.split(".")
		var ns=n.split(".");
		var res=classes;
		ns.forEach(function (na) {
			if (!res) return;
			res=res[na];
		});
		if (!res && ns.length==1) {
			var found;
			for (var nn in classes) {
				var nr=classes[nn][n];
				if (nr) {
					if (!res) { res=nr; found=nn+"."+n; }
					else throw new Error("曖昧なクラス名： "+nn+"."+n+", "+found);
				}
			}
		}
		return res;//classes[n];
	}
	function bindFunc(t,meth) {
		if (typeof meth!="function") return meth;
		var res=function () {
			return meth.apply(t,arguments);
		};
		res.methodInfo=Tonyu.extend({thiz:t},meth.methodInfo||{});
		if (meth.fiber) {
			res.fiber=function fiber_func() {
				return meth.fiber.apply(t,arguments);
			};
			res.fiber.methodInfo=Tonyu.extend({thiz:t},meth.fiber.methodInfo||{});
		}
		return res;
	}
	function invokeMethod(t, name, args, objName) {
		if (!t) throw new Error(objName+"(="+t+")のメソッド "+name+"を呼び出せません");
		var f=t[name];
		if (typeof f!="function") throw new Error((objName=="this"? "": objName+".")+name+"(="+f+")はメソッドではありません");
		return f.apply(t,args);
	}
	function callFunc(f,args, fName) {
		if (typeof f!="function") throw new Error(fName+"は関数ではありません");
		return f.apply({},args);
	}
	function checkNonNull(v, name) {
		if (v!=v || v==null) throw new Error(name+"(="+v+")は初期化されていません");
		return v;
	}
	function A(args) {
		var res=[];
		for (var i=1 ; i<args.length; i++) {
			res[i-1]=args[i];
		}
		return res;
	}
	function useNew(c) {
		throw new Error("クラス名"+c+"はnewをつけて呼び出して下さい。");
	}
	function not_a_tonyu_object(o) {
		console.log("Not a tonyu object: ",o);
		throw new Error(o+" is not a tonyu object");
	}
	function hasKey(k, obj) {
		return k in obj;
	}
	function run(bootClassName) {
		var bootClass=getClass(bootClassName);
		if (!bootClass) throw new Error( bootClassName+" というクラスはありません");
		Tonyu.runMode=true;
		var boot=new bootClass();
		var th=thread();
		th.apply(boot,"main");
		var TPR;
		if (TPR=Tonyu.currentProject) {
			TPR.runningThread=th;
			TPR.runningObj=boot;
		}
		$LASTPOS=0;
		th.steps();
	}
	var lastLoopCheck=new Date().getTime();
	var prevCheckLoopCalled;
	function checkLoop() {
		var now=new Date().getTime();
		if (now-lastLoopCheck>1000) {
			resetLoopCheck(10000);
			throw new Error("無限ループをストップしました"+(now-prevCheckLoopCalled));
		}
		prevCheckLoopCalled=now;
	}
	function resetLoopCheck(disableTime) {
		lastLoopCheck=new Date().getTime()+(disableTime||0);
	}
	function is(obj,klass) {
		if (klass===Number) {
			return typeof obj==="number";
		}
		if (klass===String) {
			return typeof obj==="string";
		}
		if (klass===Boolean) {
			return typeof obj==="boolean";
		}
		//Functi.... never mind.
	}
	setInterval(resetLoopCheck,16);
	return Tonyu={thread:thread, /*threadGroup:threadGroup,*/ klass:klass, bless:bless, extend:extend,
			globals:globals, classes:classes, classMetas:classMetas, setGlobal:setGlobal, getGlobal:getGlobal, getClass:getClass,
			timeout:timeout,animationFrame:animationFrame, /*asyncResult:asyncResult,*/
			bindFunc:bindFunc,not_a_tonyu_object:not_a_tonyu_object,
			hasKey:hasKey,invokeMethod:invokeMethod, callFunc:callFunc,checkNonNull:checkNonNull,
			run:run,iterator:IT,checkLoop:checkLoop,resetLoopCheck:resetLoopCheck,
			VERSION:1503453200013,//EMBED_VERSION
			A:A};
}();
});

// This is kowareta! because r.js does not generate module name:
//   define("FSLib",[], function () { ... 
//(function (global) {
//var useGlobal=(typeof global.define!="function");
//var define=(useGlobal ? define=function(_,f){f();} : global.define);
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
	requireSimulator=R;
//----------
define('extend',[],function (){
   return function extend(d,s) {
      for (var i in s) {d[i]=s[i];} 
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
            a=this.failMesg.concat(value).concat(a).concat(["mode",this._mode]);
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
var url=/^([a-z]+):\/\/\/?([^\/]+)\//;
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
      ".mp3":"audio/mp3",
      ".ogg":"audio/ogg",
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
      ".tonyu":"text/tonyu"
   };
});
define('DeferredUtil',[], function () {
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
            if (!window.requirejs) throw new Error("requirejs is not loaded");
            return DU.callbackToPromise(function (s) {
                window.requirejs(modules,s);
            });
        }
    };
    DU.NOP=function (r) {return r;};
    DU.begin=DU.try=DU.tr=DU.throwF;
    DU.promise=DU.callbackToPromise=DU.funcPromise;
    DU.when1=DU.resolve;
    DU.config={};
    if (window.$ && window.$.Deferred) {
        DU.config.useJQ=true;
    }
    DU.external={Promise:window.Promise};
    if (!window.DeferredUtil) window.DeferredUtil=DU;
    return DU;
});

define('FS2',["extend","PathUtil","MIMETypes","assert","DeferredUtil"],
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
            return M[e] || (options||{}).def || "text/plain";
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

define('Content',["assert","Util"],function (assert,Util) {
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
            return assert(new Uint8Array(a).buffer,"n2a: buf is not set");
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
        if (bin && Content.isBuffer(bin.buffer)) {
            b.arrayBuffer=bin.buffer;
        } else if (Content.isNodeBuffer(bin)) {
            b.nodeBuffer=bin;
        } else if (bin instanceof ArrayBuffer) {
            b.arrayBuffer=bin;
        } else {
            throw new Error(bin+" is not a bin");
        }
        b.contentType=contentType;
        return b;
    };
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
        if (this.plain!=null) {
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
        try {
            return decodeURIComponent(e.join(""));
        } catch (er) {
            console.log(e.join(""));
            throw er;
        }
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

define('NativeFS',["FS2","assert","PathUtil","extend","MIMETypes","Content"],
        function (FS,A,P,extend,MIME,Content) {
    var available=(typeof process=="object"/* && process.__node_webkit*/);
    if (!available) {
        return function () {
            throw new Error("This system not support native FS");
        };
    }
    var assert=A;
    var fs=require("fs");
    var NativeFS=function (rootPoint) {
        if (rootPoint) {
            A.is(rootPoint, P.AbsDir);
            this.rootPoint=rootPoint;
        }
    };
    var hasDriveLetter=P.hasDriveLetter(process.cwd());
    NativeFS.available=true;
    var SEP=P.SEP;
    var json=JSON; // JSON changes when page changes, if this is node module, JSON is original JSON
    var Pro=NativeFS.prototype=new FS;
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

    /*Pro.isText=function (path) {
        var e=P.ext(path);
        var m=MIME[e];
        return P.startsWith( m, "text");
    };*/
    FS.addFSType("NativeFS",function (path, options) {
            return new NativeFS(options.r);
    });
    NativeFS.prototype.fstype=function () {
        return "Native"+(this.rootPoint?"("+this.rootPoint+")":"");
    };
    NativeFS.prototype.inMyFS=function (path) {
        //console.log("inmyfs",path);
        if (this.mountPoint) {
            return P.startsWith(path, this.mountPoint)
        } else {
//            console.log(path, hasDriveLetter , P.hasDriveLetter(path));
            return !( !!hasDriveLetter ^ !!P.hasDriveLetter(path));
        }
    };
    FS.delegateMethods(NativeFS.prototype, {
        getReturnTypes: function(path, options) {
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
            if (this.isText(path)) {
                return Content.plainText( fs.readFileSync(np, {encoding:"utf8"}) );
            } else {
                return Content.bin( fs.readFileSync(np) , this.getContentType(path));
            }
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

            //options.lastUpdate

            //TODO:
        },
        isReadOnly: function (path) {
            // TODO:
            return false;
        },
        stat: function (path) {
            A.is(path,P.Absolute);
            var np=this.toNativePath(path);
            return fs.statSync(np);
        },
        mkdir: function(path, options) {
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
        }
    });
    return NativeFS;
});
define('LSFS',["FS2","PathUtil","extend","assert","Util","Content"],
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
    var Path=P.Path;
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
    LSFS.prototype=new FS;
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
        var dinfo =  {};
        try {
            var dinfos = this.getItem(path);
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
        if (!dinfo[name]) {
            dinfo[name] = {};
            if (trashed) dinfo[name].trashed = true;
        }
        if (!trashed) delete dinfo[name].trashed;
        dinfo[name].lastUpdate = now();
        this.getRootFS().notifyChanged(P.rel(path,name), dinfo[name]);
        this.putDirInfo(path, dinfo, trashed);
    };
    LSFS.prototype.removeEntry=function removeEntry(dinfo, path, name) { // path:path of dinfo
        assert.is(arguments,[Object, String, String]);
        if (dinfo[name]) {
            dinfo[name] = {
                lastUpdate: now(),
                trashed: true
            };
            this.putDirInfo(path, dinfo, true);
        }
    };
    LSFS.prototype.removeEntryWithoutTrash=function (dinfo, path, name) { // path:path of dinfo
        assert.is(arguments,[Object, String, String]);
        if (dinfo[name]) {
            delete dinfo[name];
            this.putDirInfo(path, dinfo, true);
        }
    };
    LSFS.prototype.isRAM=function (){
        return this.storage!==localStorage;
    };
    LSFS.prototype.fstype=function () {
        return (this.isRAM() ? "ramDisk" : "localStorage" );
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
            if (this.isText(path)) {
                c=Content.plainText(this.getItem(path));
            } else {
                c=Content.url(this.getItem(path));
            }
            return c;
        },
        setContent: function(path, content, options) {
            assert.is(arguments,[Absolute,Content]);
            this.assertWriteable(path);
            if (this.isText(path)) {
                this.setItem(path, content.toPlainText());
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

define('WebFS',["FS2","jquery.binarytransport","DeferredUtil","Content","PathUtil"],
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
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(a){"use strict";if("undefined"===typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var k=a.document,n=k.createElementNS("http://www.w3.org/1999/xhtml","a"),w="download"in n,x=function(c){var e=k.createEvent("MouseEvents");e.initMouseEvent("click",!0,!1,a,0,0,0,0,0,!1,!1,!1,!1,0,null);c.dispatchEvent(e)},q=a.webkitRequestFileSystem,u=a.requestFileSystem||q||a.mozRequestFileSystem,
y=function(c){(a.setImmediate||a.setTimeout)(function(){throw c;},0)},r=0,s=function(c){var e=function(){"string"===typeof c?(a.URL||a.webkitURL||a).revokeObjectURL(c):c.remove()};a.chrome?e():setTimeout(e,10)},t=function(c,a,d){a=[].concat(a);for(var b=a.length;b--;){var l=c["on"+a[b]];if("function"===typeof l)try{l.call(c,d||c)}catch(f){y(f)}}},m=function(c,e){var d=this,b=c.type,l=!1,f,p,k=function(){t(d,["writestart","progress","write","writeend"])},g=function(){if(l||!f)f=(a.URL||a.webkitURL||
a).createObjectURL(c);p?p.location.href=f:void 0==a.open(f,"_blank")&&"undefined"!==typeof safari&&(a.location.href=f);d.readyState=d.DONE;k();s(f)},h=function(a){return function(){if(d.readyState!==d.DONE)return a.apply(this,arguments)}},m={create:!0,exclusive:!1},v;d.readyState=d.INIT;e||(e="download");if(w)f=(a.URL||a.webkitURL||a).createObjectURL(c),n.href=f,n.download=e,x(n),d.readyState=d.DONE,k(),s(f);else{a.chrome&&b&&"application/octet-stream"!==b&&(v=c.slice||c.webkitSlice,c=v.call(c,0,
c.size,"application/octet-stream"),l=!0);q&&"download"!==e&&(e+=".download");if("application/octet-stream"===b||q)p=a;u?(r+=c.size,u(a.TEMPORARY,r,h(function(a){a.root.getDirectory("saved",m,h(function(a){var b=function(){a.getFile(e,m,h(function(a){a.createWriter(h(function(b){b.onwriteend=function(b){p.location.href=a.toURL();d.readyState=d.DONE;t(d,"writeend",b);s(a)};b.onerror=function(){var a=b.error;a.code!==a.ABORT_ERR&&g()};["writestart","progress","write","abort"].forEach(function(a){b["on"+
a]=d["on"+a]});b.write(c);d.abort=function(){b.abort();d.readyState=d.DONE};d.readyState=d.WRITING}),g)}),g)};a.getFile(e,{create:!1},h(function(a){a.remove();b()}),h(function(a){a.code===a.NOT_FOUND_ERR?b():g()}))}),g)}),g)):g()}},b=m.prototype;b.abort=function(){this.readyState=this.DONE;t(this,"abort")};b.readyState=b.INIT=0;b.WRITING=1;b.DONE=2;b.error=b.onwritestart=b.onprogress=b.onwrite=b.onabort=b.onerror=b.onwriteend=null;return function(a,b){return new m(a,b)}}}("undefined"!==typeof self&&
self||"undefined"!==typeof window&&window||this.content);"undefined"!==typeof module&&null!==module?module.exports=saveAs:"undefined"!==typeof define&&null!==define&&null!=define.amd&&define('FileSaver.min',[],function(){return saveAs});
define('SFile',["extend","assert","PathUtil","Util","Content","FS2","FileSaver.min","DeferredUtil"],
function (extend,A,P,Util,Content,FS2,sv,DU) {

var SFile=function (rootFS, path) {
    A.is(path, P.Absolute);
    //A(fs && fs.getReturnTypes, fs);
    this._path=path;
    this.rootFS=rootFS;
    this.fs=rootFS.resolveFS(path);
    /*this.act={};// path/fs after follwed symlink
    this.act.path=this.fs.resolveLink(path);
    this.act.fs=rootFS.resolveFS(this.act.path);
    A.is(this.act, {fs:FS2, path:P.Absolute});*/
    if (this.isDir() && !P.isDir(path)) {
        this._path+=P.SEP;
    }
};
SFile.is=function (path) {
    return path && typeof (path.isSFile)=="function" && path.isSFile();
};
function getPath(f) {
    if (SFile.is(f)) {
        return f.path();
    } else {
        A.is(f,P.Absolute);
        return f;
    }
}
SFile.prototype={
    isSFile: function (){return true;},
    setPolicy: function (p) {
        if (this.policy) throw new Error("policy already set");
        this.policy=p;
        return this._clone();
    },
    getPolicy: function (p) {
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
        if (this.isText()) {
            // if use fs.setContentAsync, the error should be handled by .fail
            // setText will throw error immediately
            return DU.resolve(this.act.fs.setContent(this.act.path, Content.plainText(t)));
        } else {
            return DU.resolve(this.act.fs.setContent(this.act.path, Content.url(t)));
        }
    },
    appendText:function (t) {
        A.is(t,String);
        if (this.isText()) {
            return this.act.fs.appendContent(this.act.path, Content.plainText(t));
        } else {
            throw new Error("append only for text file");
        }
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
        return this.act.fs.setContentAsync(this.act.path,c);
    },

    getText:function (f) {
    	if (typeof f==="function") {
    		var t=this;
    	    return this.getContent(function (c) {
    	    	if (t.isText()) {
	    	    	return c.toPlainText();
	    	    } else {
	    	    	return c.toURL();
	    	    }
    	    }).then(f);
    	}
        if (this.isText()) {
            return this.act.fs.getContent(this.act.path).toPlainText();
        } else {
            return this.act.fs.getContent(this.act.path).toURL();
        }
    },
    isText: function () {
        return this.act.fs.isText(this.act.path);
    },
    contentType: function () {
        return this.act.fs.getContentType(this.act.path);
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
    lines:function () {
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
        var options=options||{};
        var srcIsDir=src.isDir();
        var dstIsDir=dst.isDir();
        if (!srcIsDir && dstIsDir) {
            dst=dst.rel(src.name());
            A(!dst.isDir(), dst+" is a directory.");
            dstIsDir=false;
        }
        if (srcIsDir && !dstIsDir) {
           this.err("Cannot move dir to file");
        } else if (!srcIsDir && !dstIsDir) {
            if (options.echo) options.echo(src+" -> "+dst);
            var res=this.act.fs.cp(this.act.path, dst.getResolvedLinkPath(),options);
            if (options.a) {
                dst.setMetaInfo(src.getMetaInfo());
            }
            return DU.resolve(res);
        } else {
            A(srcIsDir && dstIsDir,"Both src and dst should be dir");
            return src.each(function (s) {
                dst.rel(s.name()).copyFrom(s, options);
            });
        }
        //file.text(src.text());
        //if (options.a) file.metaInfo(src.metaInfo());
    },
    moveFrom: function (src, options) {
        return this.copyFrom(src,options).then(function () {
            return src.rm({recursive:true});
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
    /*files:function (f,options) {
        var dir=this.assertDir();
        var res=[];
        this.each(function (f) {
            res.add(f);
        },options);
        return res;
    },*/
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
        return dir.each(function (f) {
            if (f.isDir()) return f.recursive(fun);
            else return fun(f);
        },options);
    },
    listFilesAsync:function (options) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        var path=this.path();
        var ord;
        options=dir.convertOptions(options);
        if (!ord) ord=options.order;
        return this.act.fs.opendirAsync(this.act.path, options).
        then(function (di) {
            var res=[];
            for (var i=0;i<di.length; i++) {
                var name=di[i];
                //if (!options.includeTrashed && dinfo[i].trashed) continue;
                if (options.excludes[path+name] ) continue;
                res.push(dir.rel(name));
            }
            if (typeof ord=="function" && res.sort) res.sort(ord);
            return res;
        });
    },
    listFiles:function (options) {
        var args=Array.prototype.slice.call(arguments);
        return DU.assertResolved(this.listFilesAsync.apply(this,args));
        //----------ABOLISHED
        if (typeof args[0]==="function") {
            var f=args.shift();
            return this.listFilesAsync.apply(this,args).then(f);
        }
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        var path=this.path();
        var ord;
        if (typeof options=="function") ord=options;
        options=dir.convertOptions(options);
        if (!ord) ord=options.order;
        var di=this.act.fs.opendir(this.act.path, options);
        var res=[];
        for (var i=0;i<di.length; i++) {
            var name=di[i];
            //if (!options.includeTrashed && dinfo[i].trashed) continue;
            if (options.excludes[path+name] ) continue;
            res.push(dir.rel(name));
        }
        if (typeof ord=="function" && res.sort) res.sort(ord);
        return res;
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
        var dir=this.assertDir();
        var pathR=this.path();
        if (!options.excludes) options.excludes={};
        if (options.excludes instanceof Array) {
            var excludes={};
            options.excludes.forEach(function (e) {
                if (P.startsWith(e,"/")) {
                    excludes[e]=1;
                } else {
                    excludes[pathR+e]=1;
                }
            });
            options.excludes=excludes;
        }
        return A.is(options,{excludes:{}});
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
    download: function () {
        saveAs(this.getBlob(),this.name());;
    }
};
Object.defineProperty(SFile.prototype,"act",{
    get: function () {
        if (this._act) return this._act;
        this._act={};// path/fs after follwed symlink
        this._act.path=this.fs.resolveLink(this._path);
        this._act.fs=this.rootFS.resolveFS(this._act.path);
        A.is(this._act, {fs:FS2, path:P.Absolute});
        return this._act;
    }
});

return SFile;
});

define('RootFS',["assert","FS2","PathUtil","SFile"], function (assert,FS,P,SFile) {
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
            addObserver: function () {
                this.observers=this.observers||[];
                var path,f;
                if (arguments.length==2) {
                    path=arguments[0];
                    f=arguments[1];
                } else if (arguments.length==1) {
                    path="";
                    f=arguments[0];
                } else {
                    throw new Error("Invalid argument spec");
                }
                assert.is(path,String);
                assert.is(f,Function);
                var observers=this.observers;
                var observer={
                    path:path,
                    handler:f,
                    remove: function () {
                        var i=observers.indexOf(this);
                        observers.splice(i,1);
                    }
                };
                this.observers.push(observer);
                return observer;
            },
            notifyChanged: function (path,metaInfo) {
                if (!this.observers) return;
                this.observers.forEach(function (ob) {
                    if (P.startsWith(path,ob.path)) {
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
/*!

JSZip v3.1.3 - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define('jszip.min',[],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.JSZip=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";var d=a("./utils"),e=a("./support"),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";c.encode=function(a){for(var b,c,e,g,h,i,j,k=[],l=0,m=a.length,n=m,o="string"!==d.getTypeOf(a);l<a.length;)n=m-l,o?(b=a[l++],c=l<m?a[l++]:0,e=l<m?a[l++]:0):(b=a.charCodeAt(l++),c=l<m?a.charCodeAt(l++):0,e=l<m?a.charCodeAt(l++):0),g=b>>2,h=(3&b)<<4|c>>4,i=n>1?(15&c)<<2|e>>6:64,j=n>2?63&e:64,k.push(f.charAt(g)+f.charAt(h)+f.charAt(i)+f.charAt(j));return k.join("")},c.decode=function(a){var b,c,d,g,h,i,j,k=0,l=0,m="data:";if(a.substr(0,m.length)===m)throw new Error("Invalid base64 input, it looks like a data url.");a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");var n=3*a.length/4;if(a.charAt(a.length-1)===f.charAt(64)&&n--,a.charAt(a.length-2)===f.charAt(64)&&n--,n%1!==0)throw new Error("Invalid base64 input, bad content length.");var o;for(o=e.uint8array?new Uint8Array(0|n):new Array(0|n);k<a.length;)g=f.indexOf(a.charAt(k++)),h=f.indexOf(a.charAt(k++)),i=f.indexOf(a.charAt(k++)),j=f.indexOf(a.charAt(k++)),b=g<<2|h>>4,c=(15&h)<<4|i>>2,d=(3&i)<<6|j,o[l++]=b,64!==i&&(o[l++]=c),64!==j&&(o[l++]=d);return o}},{"./support":30,"./utils":32}],2:[function(a,b,c){"use strict";function d(a,b,c,d,e){this.compressedSize=a,this.uncompressedSize=b,this.crc32=c,this.compression=d,this.compressedContent=e}var e=a("./external"),f=a("./stream/DataWorker"),g=a("./stream/DataLengthProbe"),h=a("./stream/Crc32Probe"),g=a("./stream/DataLengthProbe");d.prototype={getContentWorker:function(){var a=new f(e.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new g("data_length")),b=this;return a.on("end",function(){if(this.streamInfo.data_length!==b.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),a},getCompressedWorker:function(){return new f(e.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(a,b,c){return a.pipe(new h).pipe(new g("uncompressedSize")).pipe(b.compressWorker(c)).pipe(new g("compressedSize")).withStreamInfo("compression",b)},b.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(a,b,c){"use strict";var d=a("./stream/GenericWorker");c.STORE={magic:"\0\0",compressWorker:function(a){return new d("STORE compression")},uncompressWorker:function(){return new d("STORE decompression")}},c.DEFLATE=a("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=h,f=d+c;a^=-1;for(var g=d;g<f;g++)a=a>>>8^e[255&(a^b[g])];return a^-1}function f(a,b,c,d){var e=h,f=d+c;a^=-1;for(var g=d;g<f;g++)a=a>>>8^e[255&(a^b.charCodeAt(g))];return a^-1}var g=a("./utils"),h=d();b.exports=function(a,b){if("undefined"==typeof a||!a.length)return 0;var c="string"!==g.getTypeOf(a);return c?e(0|b,a,a.length,0):f(0|b,a,a.length,0)}},{"./utils":32}],5:[function(a,b,c){"use strict";c.base64=!1,c.binary=!1,c.dir=!1,c.createFolders=!0,c.date=null,c.compression=null,c.compressionOptions=null,c.comment=null,c.unixPermissions=null,c.dosPermissions=null},{}],6:[function(a,b,c){"use strict";var d=null;d="undefined"!=typeof Promise?Promise:a("lie"),b.exports={Promise:d}},{lie:58}],7:[function(a,b,c){"use strict";function d(a,b){h.call(this,"FlateWorker/"+a),this._pako=null,this._pakoAction=a,this._pakoOptions=b,this.meta={}}var e="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,f=a("pako"),g=a("./utils"),h=a("./stream/GenericWorker"),i=e?"uint8array":"array";c.magic="\b\0",g.inherits(d,h),d.prototype.processChunk=function(a){this.meta=a.meta,null===this._pako&&this._createPako(),this._pako.push(g.transformTo(i,a.data),!1)},d.prototype.flush=function(){h.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},d.prototype.cleanUp=function(){h.prototype.cleanUp.call(this),this._pako=null},d.prototype._createPako=function(){this._pako=new f[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var a=this;this._pako.onData=function(b){a.push({data:b,meta:a.meta})}},c.compressWorker=function(a){return new d("Deflate",a)},c.uncompressWorker=function(){return new d("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:59}],8:[function(a,b,c){"use strict";function d(a,b,c,d){f.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=b,this.zipPlatform=c,this.encodeFileName=d,this.streamFiles=a,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}var e=a("../utils"),f=a("../stream/GenericWorker"),g=a("../utf8"),h=a("../crc32"),i=a("../signature"),j=function(a,b){var c,d="";for(c=0;c<b;c++)d+=String.fromCharCode(255&a),a>>>=8;return d},k=function(a,b){var c=a;return a||(c=b?16893:33204),(65535&c)<<16},l=function(a,b){return 63&(a||0)},m=function(a,b,c,d,f,m){var n,o,p=a.file,q=a.compression,r=m!==g.utf8encode,s=e.transformTo("string",m(p.name)),t=e.transformTo("string",g.utf8encode(p.name)),u=p.comment,v=e.transformTo("string",m(u)),w=e.transformTo("string",g.utf8encode(u)),x=t.length!==p.name.length,y=w.length!==u.length,z="",A="",B="",C=p.dir,D=p.date,E={crc32:0,compressedSize:0,uncompressedSize:0};b&&!c||(E.crc32=a.crc32,E.compressedSize=a.compressedSize,E.uncompressedSize=a.uncompressedSize);var F=0;b&&(F|=8),r||!x&&!y||(F|=2048);var G=0,H=0;C&&(G|=16),"UNIX"===f?(H=798,G|=k(p.unixPermissions,C)):(H=20,G|=l(p.dosPermissions,C)),n=D.getUTCHours(),n<<=6,n|=D.getUTCMinutes(),n<<=5,n|=D.getUTCSeconds()/2,o=D.getUTCFullYear()-1980,o<<=4,o|=D.getUTCMonth()+1,o<<=5,o|=D.getUTCDate(),x&&(A=j(1,1)+j(h(s),4)+t,z+="up"+j(A.length,2)+A),y&&(B=j(1,1)+j(h(v),4)+w,z+="uc"+j(B.length,2)+B);var I="";I+="\n\0",I+=j(F,2),I+=q.magic,I+=j(n,2),I+=j(o,2),I+=j(E.crc32,4),I+=j(E.compressedSize,4),I+=j(E.uncompressedSize,4),I+=j(s.length,2),I+=j(z.length,2);var J=i.LOCAL_FILE_HEADER+I+s+z,K=i.CENTRAL_FILE_HEADER+j(H,2)+I+j(v.length,2)+"\0\0\0\0"+j(G,4)+j(d,4)+s+z+v;return{fileRecord:J,dirRecord:K}},n=function(a,b,c,d,f){var g="",h=e.transformTo("string",f(d));return g=i.CENTRAL_DIRECTORY_END+"\0\0\0\0"+j(a,2)+j(a,2)+j(b,4)+j(c,4)+j(h.length,2)+h},o=function(a){var b="";return b=i.DATA_DESCRIPTOR+j(a.crc32,4)+j(a.compressedSize,4)+j(a.uncompressedSize,4)};e.inherits(d,f),d.prototype.push=function(a){var b=a.meta.percent||0,c=this.entriesCount,d=this._sources.length;this.accumulate?this.contentBuffer.push(a):(this.bytesWritten+=a.data.length,f.prototype.push.call(this,{data:a.data,meta:{currentFile:this.currentFile,percent:c?(b+100*(c-d-1))/c:100}}))},d.prototype.openedSource=function(a){this.currentSourceOffset=this.bytesWritten,this.currentFile=a.file.name;var b=this.streamFiles&&!a.file.dir;if(b){var c=m(a,b,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:c.fileRecord,meta:{percent:0}})}else this.accumulate=!0},d.prototype.closedSource=function(a){this.accumulate=!1;var b=this.streamFiles&&!a.file.dir,c=m(a,b,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(c.dirRecord),b)this.push({data:o(a),meta:{percent:100}});else for(this.push({data:c.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},d.prototype.flush=function(){for(var a=this.bytesWritten,b=0;b<this.dirRecords.length;b++)this.push({data:this.dirRecords[b],meta:{percent:100}});var c=this.bytesWritten-a,d=n(this.dirRecords.length,c,a,this.zipComment,this.encodeFileName);this.push({data:d,meta:{percent:100}})},d.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},d.prototype.registerPrevious=function(a){this._sources.push(a);var b=this;return a.on("data",function(a){b.processChunk(a)}),a.on("end",function(){b.closedSource(b.previous.streamInfo),b._sources.length?b.prepareNextSource():b.end()}),a.on("error",function(a){b.error(a)}),this},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},d.prototype.error=function(a){var b=this._sources;if(!f.prototype.error.call(this,a))return!1;for(var c=0;c<b.length;c++)try{b[c].error(a)}catch(a){}return!0},d.prototype.lock=function(){f.prototype.lock.call(this);for(var a=this._sources,b=0;b<a.length;b++)a[b].lock()},b.exports=d},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(a,b,c){"use strict";var d=a("../compressions"),e=a("./ZipFileWorker"),f=function(a,b){var c=a||b,e=d[c];if(!e)throw new Error(c+" is not a valid compression method !");return e};c.generateWorker=function(a,b,c){var d=new e(b.streamFiles,c,b.platform,b.encodeFileName),g=0;try{a.forEach(function(a,c){g++;var e=f(c.options.compression,b.compression),h=c.options.compressionOptions||b.compressionOptions||{},i=c.dir,j=c.date;c._compressWorker(e,h).withStreamInfo("file",{name:a,dir:i,date:j,comment:c.comment||"",unixPermissions:c.unixPermissions,dosPermissions:c.dosPermissions}).pipe(d)}),d.entriesCount=g}catch(h){d.error(h)}return d}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(a,b,c){"use strict";function d(){if(!(this instanceof d))return new d;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var a=new d;for(var b in this)"function"!=typeof this[b]&&(a[b]=this[b]);return a}}d.prototype=a("./object"),d.prototype.loadAsync=a("./load"),d.support=a("./support"),d.defaults=a("./defaults"),d.version="3.1.3",d.loadAsync=function(a,b){return(new d).loadAsync(a,b)},d.external=a("./external"),b.exports=d},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(a,b,c){"use strict";function d(a){return new f.Promise(function(b,c){var d=a.decompressed.getContentWorker().pipe(new i);d.on("error",function(a){c(a)}).on("end",function(){d.streamInfo.crc32!==a.decompressed.crc32?c(new Error("Corrupted zip : CRC32 mismatch")):b()}).resume()})}var e=a("./utils"),f=a("./external"),g=a("./utf8"),e=a("./utils"),h=a("./zipEntries"),i=a("./stream/Crc32Probe"),j=a("./nodejsUtils");b.exports=function(a,b){var c=this;return b=e.extend(b||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:g.utf8decode}),j.isNode&&j.isStream(a)?f.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):e.prepareContent("the loaded zip file",a,!0,b.optimizedBinaryString,b.base64).then(function(a){var c=new h(b);return c.load(a),c}).then(function(a){var c=[f.Promise.resolve(a)],e=a.files;if(b.checkCRC32)for(var g=0;g<e.length;g++)c.push(d(e[g]));return f.Promise.all(c)}).then(function(a){for(var d=a.shift(),e=d.files,f=0;f<e.length;f++){var g=e[f];c.file(g.fileNameStr,g.decompressed,{binary:!0,optimizedBinaryString:!0,date:g.date,dir:g.dir,comment:g.fileCommentStr.length?g.fileCommentStr:null,unixPermissions:g.unixPermissions,dosPermissions:g.dosPermissions,createFolders:b.createFolders})}return d.zipComment.length&&(c.comment=d.zipComment),c})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(a,b,c){"use strict";function d(a,b){f.call(this,"Nodejs stream input adapter for "+a),this._upstreamEnded=!1,this._bindStream(b)}var e=a("../utils"),f=a("../stream/GenericWorker");e.inherits(d,f),d.prototype._bindStream=function(a){var b=this;this._stream=a,a.pause(),a.on("data",function(a){b.push({data:a,meta:{percent:0}})}).on("error",function(a){b.isPaused?this.generatedError=a:b.error(a)}).on("end",function(){b.isPaused?b._upstreamEnded=!0:b.end()})},d.prototype.pause=function(){return!!f.prototype.pause.call(this)&&(this._stream.pause(),!0)},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},b.exports=d},{"../stream/GenericWorker":28,"../utils":32}],13:[function(a,b,c){"use strict";function d(a,b,c){e.call(this,b),this._helper=a;var d=this;a.on("data",function(a,b){d.push(a)||d._helper.pause(),c&&c(b)}).on("error",function(a){d.emit("error",a)}).on("end",function(){d.push(null)})}var e=a("readable-stream").Readable,f=a("../utils");f.inherits(d,e),d.prototype._read=function(){this._helper.resume()},b.exports=d},{"../utils":32,"readable-stream":16}],14:[function(a,b,c){"use strict";b.exports={isNode:"undefined"!=typeof Buffer,newBuffer:function(a,b){return new Buffer(a,b)},isBuffer:function(a){return Buffer.isBuffer(a)},isStream:function(a){return a&&"function"==typeof a.on&&"function"==typeof a.pause&&"function"==typeof a.resume}}},{}],15:[function(a,b,c){"use strict";function d(a){return"[object RegExp]"===Object.prototype.toString.call(a)}var e=a("./utf8"),f=a("./utils"),g=a("./stream/GenericWorker"),h=a("./stream/StreamHelper"),i=a("./defaults"),j=a("./compressedObject"),k=a("./zipObject"),l=a("./generate"),m=a("./nodejsUtils"),n=a("./nodejs/NodejsStreamInputAdapter"),o=function(a,b,c){var d,e=f.getTypeOf(b),h=f.extend(c||{},i);h.date=h.date||new Date,null!==h.compression&&(h.compression=h.compression.toUpperCase()),"string"==typeof h.unixPermissions&&(h.unixPermissions=parseInt(h.unixPermissions,8)),h.unixPermissions&&16384&h.unixPermissions&&(h.dir=!0),h.dosPermissions&&16&h.dosPermissions&&(h.dir=!0),h.dir&&(a=q(a)),h.createFolders&&(d=p(a))&&r.call(this,d,!0);var l="string"===e&&h.binary===!1&&h.base64===!1;c&&"undefined"!=typeof c.binary||(h.binary=!l);var o=b instanceof j&&0===b.uncompressedSize;(o||h.dir||!b||0===b.length)&&(h.base64=!1,h.binary=!0,b="",h.compression="STORE",e="string");var s=null;s=b instanceof j||b instanceof g?b:m.isNode&&m.isStream(b)?new n(a,b):f.prepareContent(a,b,h.binary,h.optimizedBinaryString,h.base64);var t=new k(a,s,h);this.files[a]=t},p=function(a){"/"===a.slice(-1)&&(a=a.substring(0,a.length-1));var b=a.lastIndexOf("/");return b>0?a.substring(0,b):""},q=function(a){return"/"!==a.slice(-1)&&(a+="/"),a},r=function(a,b){return b="undefined"!=typeof b?b:i.createFolders,a=q(a),this.files[a]||o.call(this,a,null,{dir:!0,createFolders:b}),this.files[a]},s={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(a){var b,c,d;for(b in this.files)this.files.hasOwnProperty(b)&&(d=this.files[b],c=b.slice(this.root.length,b.length),c&&b.slice(0,this.root.length)===this.root&&a(c,d))},filter:function(a){var b=[];return this.forEach(function(c,d){a(c,d)&&b.push(d)}),b},file:function(a,b,c){if(1===arguments.length){if(d(a)){var e=a;return this.filter(function(a,b){return!b.dir&&e.test(a)})}var f=this.files[this.root+a];return f&&!f.dir?f:null}return a=this.root+a,o.call(this,a,b,c),this},folder:function(a){if(!a)return this;if(d(a))return this.filter(function(b,c){return c.dir&&a.test(b)});var b=this.root+a,c=r.call(this,b),e=this.clone();return e.root=c.name,e},remove:function(a){a=this.root+a;var b=this.files[a];if(b||("/"!==a.slice(-1)&&(a+="/"),b=this.files[a]),b&&!b.dir)delete this.files[a];else for(var c=this.filter(function(b,c){return c.name.slice(0,a.length)===a}),d=0;d<c.length;d++)delete this.files[c[d].name];return this},generate:function(a){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(a){var b,c={};try{if(c=f.extend(a||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:e.utf8encode}),c.type=c.type.toLowerCase(),c.compression=c.compression.toUpperCase(),"binarystring"===c.type&&(c.type="string"),!c.type)throw new Error("No output type specified.");f.checkSupport(c.type),"darwin"!==c.platform&&"freebsd"!==c.platform&&"linux"!==c.platform&&"sunos"!==c.platform||(c.platform="UNIX"),"win32"===c.platform&&(c.platform="DOS");var d=c.comment||this.comment||"";b=l.generateWorker(this,c,d)}catch(i){b=new g("error"),b.error(i)}return new h(b,c.type||"string",c.mimeType)},generateAsync:function(a,b){return this.generateInternalStream(a).accumulate(b)},generateNodeStream:function(a,b){return a=a||{},a.type||(a.type="nodebuffer"),this.generateInternalStream(a).toNodejsStream(b)}};b.exports=s},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(a,b,c){b.exports=a("stream")},{stream:void 0}],17:[function(a,b,c){"use strict";function d(a){e.call(this,a);for(var b=0;b<this.data.length;b++)a[b]=255&a[b]}var e=a("./DataReader"),f=a("../utils");f.inherits(d,e),d.prototype.byteAt=function(a){return this.data[this.zero+a]},d.prototype.lastIndexOfSignature=function(a){for(var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.length-4;f>=0;--f)if(this.data[f]===b&&this.data[f+1]===c&&this.data[f+2]===d&&this.data[f+3]===e)return f-this.zero;return-1},d.prototype.readAndCheckSignature=function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.readData(4);return b===f[0]&&c===f[1]&&d===f[2]&&e===f[3]},d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return[];var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./DataReader":18}],18:[function(a,b,c){"use strict";function d(a){this.data=a,this.length=a.length,this.index=0,this.zero=0}var e=a("../utils");d.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(a){},readInt:function(a){var b,c=0;for(this.checkOffset(a),b=this.index+a-1;b>=this.index;b--)c=(c<<8)+this.byteAt(b);return this.index+=a,c},readString:function(a){return e.transformTo("string",this.readData(a))},readData:function(a){},lastIndexOfSignature:function(a){},readAndCheckSignature:function(a){},readDate:function(){var a=this.readInt(4);return new Date(Date.UTC((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1))}},b.exports=d},{"../utils":32}],19:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./Uint8ArrayReader"),f=a("../utils");f.inherits(d,e),d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./DataReader"),f=a("../utils");f.inherits(d,e),d.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},d.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},d.prototype.readAndCheckSignature=function(a){var b=this.readData(4);return a===b},d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./DataReader":18}],21:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./ArrayReader"),f=a("../utils");f.inherits(d,e),d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return new Uint8Array(0);var b=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./ArrayReader":17}],22:[function(a,b,c){"use strict";var d=a("../utils"),e=a("../support"),f=a("./ArrayReader"),g=a("./StringReader"),h=a("./NodeBufferReader"),i=a("./Uint8ArrayReader");b.exports=function(a){var b=d.getTypeOf(a);return d.checkSupport(b),"string"!==b||e.uint8array?"nodebuffer"===b?new h(a):e.uint8array?new i(d.transformTo("uint8array",a)):new f(d.transformTo("array",a)):new g(a)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(a,b,c){"use strict";c.LOCAL_FILE_HEADER="PK",c.CENTRAL_FILE_HEADER="PK",c.CENTRAL_DIRECTORY_END="PK",c.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",c.ZIP64_CENTRAL_DIRECTORY_END="PK",c.DATA_DESCRIPTOR="PK\b"},{}],24:[function(a,b,c){"use strict";function d(a){e.call(this,"ConvertWorker to "+a),this.destType=a}var e=a("./GenericWorker"),f=a("../utils");f.inherits(d,e),d.prototype.processChunk=function(a){this.push({data:f.transformTo(this.destType,a.data),meta:a.meta})},b.exports=d},{"../utils":32,"./GenericWorker":28}],25:[function(a,b,c){"use strict";function d(){e.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}var e=a("./GenericWorker"),f=a("../crc32"),g=a("../utils");g.inherits(d,e),d.prototype.processChunk=function(a){this.streamInfo.crc32=f(a.data,this.streamInfo.crc32||0),this.push(a)},b.exports=d},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(a,b,c){"use strict";function d(a){f.call(this,"DataLengthProbe for "+a),this.propName=a,this.withStreamInfo(a,0)}var e=a("../utils"),f=a("./GenericWorker");e.inherits(d,f),d.prototype.processChunk=function(a){if(a){var b=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=b+a.data.length}f.prototype.processChunk.call(this,a)},b.exports=d},{"../utils":32,"./GenericWorker":28}],27:[function(a,b,c){"use strict";function d(a){f.call(this,"DataWorker");var b=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,a.then(function(a){b.dataIsReady=!0,b.data=a,b.max=a&&a.length||0,b.type=e.getTypeOf(a),b.isPaused||b._tickAndRepeat()},function(a){b.error(a)})}var e=a("../utils"),f=a("./GenericWorker"),g=16384;e.inherits(d,f),d.prototype.cleanUp=function(){f.prototype.cleanUp.call(this),this.data=null},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,e.delay(this._tickAndRepeat,[],this)),!0)},d.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(e.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},d.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var a=g,b=null,c=Math.min(this.max,this.index+a);if(this.index>=this.max)return this.end();switch(this.type){case"string":b=this.data.substring(this.index,c);break;case"uint8array":b=this.data.subarray(this.index,c);break;case"array":case"nodebuffer":b=this.data.slice(this.index,c)}return this.index=c,this.push({data:b,meta:{percent:this.max?this.index/this.max*100:0}})},b.exports=d},{"../utils":32,"./GenericWorker":28}],28:[function(a,b,c){"use strict";function d(a){this.name=a||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}d.prototype={push:function(a){this.emit("data",a)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(a){this.emit("error",a)}return!0},error:function(a){return!this.isFinished&&(this.isPaused?this.generatedError=a:(this.isFinished=!0,this.emit("error",a),this.previous&&this.previous.error(a),this.cleanUp()),!0)},on:function(a,b){return this._listeners[a].push(b),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(a,b){if(this._listeners[a])for(var c=0;c<this._listeners[a].length;c++)this._listeners[a][c].call(this,b)},pipe:function(a){return a.registerPrevious(this)},registerPrevious:function(a){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=a.streamInfo,this.mergeStreamInfo(),this.previous=a;var b=this;return a.on("data",function(a){b.processChunk(a)}),a.on("end",function(){b.end()}),a.on("error",function(a){b.error(a)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;this.isPaused=!1;var a=!1;return this.generatedError&&(this.error(this.generatedError),a=!0),this.previous&&this.previous.resume(),!a},flush:function(){},processChunk:function(a){this.push(a)},withStreamInfo:function(a,b){return this.extraStreamInfo[a]=b,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var a in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(a)&&(this.streamInfo[a]=this.extraStreamInfo[a])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var a="Worker "+this.name;return this.previous?this.previous+" -> "+a:a}},b.exports=d},{}],29:[function(a,b,c){"use strict";function d(a,b,c,d){var f=null;switch(a){case"blob":return h.newBlob(c,d);case"base64":return f=e(b,c),k.encode(f);default:return f=e(b,c),h.transformTo(a,f)}}function e(a,b){var c,d=0,e=null,f=0;for(c=0;c<b.length;c++)f+=b[c].length;switch(a){case"string":return b.join("");case"array":return Array.prototype.concat.apply([],b);case"uint8array":for(e=new Uint8Array(f),c=0;c<b.length;c++)e.set(b[c],d),d+=b[c].length;return e;case"nodebuffer":return Buffer.concat(b);default:throw new Error("concat : unsupported type '"+a+"'")}}function f(a,b){return new m.Promise(function(c,e){var f=[],g=a._internalType,h=a._outputType,i=a._mimeType;a.on("data",function(a,c){f.push(a),b&&b(c)}).on("error",function(a){f=[],e(a)}).on("end",function(){try{var a=d(h,g,f,i);c(a)}catch(b){e(b)}f=[]}).resume()})}function g(a,b,c){var d=b;switch(b){case"blob":d="arraybuffer";break;case"arraybuffer":d="uint8array";break;case"base64":d="string"}try{this._internalType=d,this._outputType=b,this._mimeType=c,h.checkSupport(d),this._worker=a.pipe(new i(d)),a.lock()}catch(e){this._worker=new j("error"),this._worker.error(e)}}var h=a("../utils"),i=a("./ConvertWorker"),j=a("./GenericWorker"),k=a("../base64"),l=a("../support"),m=a("../external"),n=null;if(l.nodestream)try{n=a("../nodejs/NodejsStreamOutputAdapter")}catch(o){}g.prototype={accumulate:function(a){return f(this,a)},on:function(a,b){var c=this;return"data"===a?this._worker.on(a,function(a){b.call(c,a.data,a.meta)}):this._worker.on(a,function(){h.delay(b,arguments,c)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(a){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new n(this,{objectMode:"nodebuffer"!==this._outputType},a)}},b.exports=g},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(a,b,c){"use strict";if(c.base64=!0,c.array=!0,c.string=!0,c.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,c.nodebuffer="undefined"!=typeof Buffer,c.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)c.blob=!1;else{var d=new ArrayBuffer(0);try{c.blob=0===new Blob([d],{type:"application/zip"}).size}catch(e){try{var f=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,g=new f;g.append(d),c.blob=0===g.getBlob("application/zip").size}catch(e){c.blob=!1}}}try{c.nodestream=!!a("readable-stream").Readable}catch(e){c.nodestream=!1}},{"readable-stream":16}],31:[function(a,b,c){"use strict";function d(){i.call(this,"utf-8 decode"),this.leftOver=null}function e(){i.call(this,"utf-8 encode")}for(var f=a("./utils"),g=a("./support"),h=a("./nodejsUtils"),i=a("./stream/GenericWorker"),j=new Array(256),k=0;k<256;k++)j[k]=k>=252?6:k>=248?5:k>=240?4:k>=224?3:k>=192?2:1;j[254]=j[254]=1;var l=function(a){var b,c,d,e,f,h=a.length,i=0;for(e=0;e<h;e++)c=a.charCodeAt(e),55296===(64512&c)&&e+1<h&&(d=a.charCodeAt(e+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),e++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=g.uint8array?new Uint8Array(i):new Array(i),f=0,e=0;f<i;e++)c=a.charCodeAt(e),55296===(64512&c)&&e+1<h&&(d=a.charCodeAt(e+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),e++)),c<128?b[f++]=c:c<2048?(b[f++]=192|c>>>6,b[f++]=128|63&c):c<65536?(b[f++]=224|c>>>12,b[f++]=128|c>>>6&63,b[f++]=128|63&c):(b[f++]=240|c>>>18,b[f++]=128|c>>>12&63,b[f++]=128|c>>>6&63,b[f++]=128|63&c);return b},m=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+j[a[c]]>b?c:b},n=function(a){var b,c,d,e,g=a.length,h=new Array(2*g);for(c=0,b=0;b<g;)if(d=a[b++],d<128)h[c++]=d;else if(e=j[d],e>4)h[c++]=65533,b+=e-1;else{for(d&=2===e?31:3===e?15:7;e>1&&b<g;)d=d<<6|63&a[b++],e--;e>1?h[c++]=65533:d<65536?h[c++]=d:(d-=65536,h[c++]=55296|d>>10&1023,h[c++]=56320|1023&d)}return h.length!==c&&(h.subarray?h=h.subarray(0,c):h.length=c),f.applyFromCharCode(h)};c.utf8encode=function(a){return g.nodebuffer?h.newBuffer(a,"utf-8"):l(a)},c.utf8decode=function(a){return g.nodebuffer?f.transformTo("nodebuffer",a).toString("utf-8"):(a=f.transformTo(g.uint8array?"uint8array":"array",a),n(a))},f.inherits(d,i),d.prototype.processChunk=function(a){var b=f.transformTo(g.uint8array?"uint8array":"array",a.data);if(this.leftOver&&this.leftOver.length){if(g.uint8array){var d=b;b=new Uint8Array(d.length+this.leftOver.length),b.set(this.leftOver,0),b.set(d,this.leftOver.length)}else b=this.leftOver.concat(b);this.leftOver=null}var e=m(b),h=b;e!==b.length&&(g.uint8array?(h=b.subarray(0,e),this.leftOver=b.subarray(e,b.length)):(h=b.slice(0,e),this.leftOver=b.slice(e,b.length))),this.push({data:c.utf8decode(h),meta:a.meta})},d.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:c.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},c.Utf8DecodeWorker=d,f.inherits(e,i),e.prototype.processChunk=function(a){this.push({data:c.utf8encode(a.data),meta:a.meta})},c.Utf8EncodeWorker=e},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(a,b,c){"use strict";function d(a){var b=null;return b=i.uint8array?new Uint8Array(a.length):new Array(a.length),f(a,b)}function e(a){return a}function f(a,b){for(var c=0;c<a.length;++c)b[c]=255&a.charCodeAt(c);return b}function g(a){var b=65536,d=c.getTypeOf(a),e=!0;if("uint8array"===d?e=n.applyCanBeUsed.uint8array:"nodebuffer"===d&&(e=n.applyCanBeUsed.nodebuffer),e)for(;b>1;)try{return n.stringifyByChunk(a,d,b)}catch(f){b=Math.floor(b/2)}return n.stringifyByChar(a)}function h(a,b){for(var c=0;c<a.length;c++)b[c]=a[c];return b}var i=a("./support"),j=a("./base64"),k=a("./nodejsUtils"),l=a("core-js/library/fn/set-immediate"),m=a("./external");
c.newBlob=function(a,b){c.checkSupport("blob");try{return new Blob(a,{type:b})}catch(d){try{for(var e=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,f=new e,g=0;g<a.length;g++)f.append(a[g]);return f.getBlob(b)}catch(d){throw new Error("Bug : can't construct the Blob.")}}};var n={stringifyByChunk:function(a,b,c){var d=[],e=0,f=a.length;if(f<=c)return String.fromCharCode.apply(null,a);for(;e<f;)"array"===b||"nodebuffer"===b?d.push(String.fromCharCode.apply(null,a.slice(e,Math.min(e+c,f)))):d.push(String.fromCharCode.apply(null,a.subarray(e,Math.min(e+c,f)))),e+=c;return d.join("")},stringifyByChar:function(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(a[c]);return b},applyCanBeUsed:{uint8array:function(){try{return i.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(a){return!1}}(),nodebuffer:function(){try{return i.nodebuffer&&1===String.fromCharCode.apply(null,k.newBuffer(1)).length}catch(a){return!1}}()}};c.applyFromCharCode=g;var o={};o.string={string:e,array:function(a){return f(a,new Array(a.length))},arraybuffer:function(a){return o.string.uint8array(a).buffer},uint8array:function(a){return f(a,new Uint8Array(a.length))},nodebuffer:function(a){return f(a,k.newBuffer(a.length))}},o.array={string:g,array:e,arraybuffer:function(a){return new Uint8Array(a).buffer},uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return k.newBuffer(a)}},o.arraybuffer={string:function(a){return g(new Uint8Array(a))},array:function(a){return h(new Uint8Array(a),new Array(a.byteLength))},arraybuffer:e,uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return k.newBuffer(new Uint8Array(a))}},o.uint8array={string:g,array:function(a){return h(a,new Array(a.length))},arraybuffer:function(a){var b=new Uint8Array(a.length);return a.length&&b.set(a,0),b.buffer},uint8array:e,nodebuffer:function(a){return k.newBuffer(a)}},o.nodebuffer={string:g,array:function(a){return h(a,new Array(a.length))},arraybuffer:function(a){return o.nodebuffer.uint8array(a).buffer},uint8array:function(a){return h(a,new Uint8Array(a.length))},nodebuffer:e},c.transformTo=function(a,b){if(b||(b=""),!a)return b;c.checkSupport(a);var d=c.getTypeOf(b),e=o[d][a](b);return e},c.getTypeOf=function(a){return"string"==typeof a?"string":"[object Array]"===Object.prototype.toString.call(a)?"array":i.nodebuffer&&k.isBuffer(a)?"nodebuffer":i.uint8array&&a instanceof Uint8Array?"uint8array":i.arraybuffer&&a instanceof ArrayBuffer?"arraybuffer":void 0},c.checkSupport=function(a){var b=i[a.toLowerCase()];if(!b)throw new Error(a+" is not supported by this platform")},c.MAX_VALUE_16BITS=65535,c.MAX_VALUE_32BITS=-1,c.pretty=function(a){var b,c,d="";for(c=0;c<(a||"").length;c++)b=a.charCodeAt(c),d+="\\x"+(b<16?"0":"")+b.toString(16).toUpperCase();return d},c.delay=function(a,b,c){l(function(){a.apply(c||null,b||[])})},c.inherits=function(a,b){var c=function(){};c.prototype=b.prototype,a.prototype=new c},c.extend=function(){var a,b,c={};for(a=0;a<arguments.length;a++)for(b in arguments[a])arguments[a].hasOwnProperty(b)&&"undefined"==typeof c[b]&&(c[b]=arguments[a][b]);return c},c.prepareContent=function(a,b,e,f,g){var h=m.Promise.resolve(b).then(function(a){var b=i.blob&&(a instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(a))!==-1);return b&&"undefined"!=typeof FileReader?new m.Promise(function(b,c){var d=new FileReader;d.onload=function(a){b(a.target.result)},d.onerror=function(a){c(a.target.error)},d.readAsArrayBuffer(a)}):a});return h.then(function(b){var h=c.getTypeOf(b);return h?("arraybuffer"===h?b=c.transformTo("uint8array",b):"string"===h&&(g?b=j.decode(b):e&&f!==!0&&(b=d(b))),b):m.Promise.reject(new Error("The data of '"+a+"' is in an unsupported format !"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"core-js/library/fn/set-immediate":36}],33:[function(a,b,c){"use strict";function d(a){this.files=[],this.loadOptions=a}var e=a("./reader/readerFor"),f=a("./utils"),g=a("./signature"),h=a("./zipEntry"),i=(a("./utf8"),a("./support"));d.prototype={checkSignature:function(a){if(!this.reader.readAndCheckSignature(a)){this.reader.index-=4;var b=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+f.pretty(b)+", expected "+f.pretty(a)+")")}},isSignature:function(a,b){var c=this.reader.index;this.reader.setIndex(a);var d=this.reader.readString(4),e=d===b;return this.reader.setIndex(c),e},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var a=this.reader.readData(this.zipCommentLength),b=i.uint8array?"uint8array":"array",c=f.transformTo(b,a);this.zipComment=this.loadOptions.decodeFileName(c)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var a,b,c,d=this.zip64EndOfCentralSize-44,e=0;e<d;)a=this.reader.readInt(2),b=this.reader.readInt(4),c=this.reader.readData(b),this.zip64ExtensibleData[a]={id:a,length:b,value:c}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),this.disksCount>1)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var a,b;for(a=0;a<this.files.length;a++)b=this.files[a],this.reader.setIndex(b.localHeaderOffset),this.checkSignature(g.LOCAL_FILE_HEADER),b.readLocalPart(this.reader),b.handleUTF8(),b.processAttributes()},readCentralDir:function(){var a;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(g.CENTRAL_FILE_HEADER);)a=new h({zip64:this.zip64},this.loadOptions),a.readCentralPart(this.reader),this.files.push(a);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var a=this.reader.lastIndexOfSignature(g.CENTRAL_DIRECTORY_END);if(a<0){var b=!this.isSignature(0,g.LOCAL_FILE_HEADER);throw b?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory")}this.reader.setIndex(a);var c=a;if(this.checkSignature(g.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===f.MAX_VALUE_16BITS||this.diskWithCentralDirStart===f.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===f.MAX_VALUE_16BITS||this.centralDirRecords===f.MAX_VALUE_16BITS||this.centralDirSize===f.MAX_VALUE_32BITS||this.centralDirOffset===f.MAX_VALUE_32BITS){if(this.zip64=!0,a=this.reader.lastIndexOfSignature(g.ZIP64_CENTRAL_DIRECTORY_LOCATOR),a<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(a),this.checkSignature(g.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,g.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(g.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(g.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var d=this.centralDirOffset+this.centralDirSize;this.zip64&&(d+=20,d+=12+this.zip64EndOfCentralSize);var e=c-d;if(e>0)this.isSignature(c,g.CENTRAL_FILE_HEADER)||(this.reader.zero=e);else if(e<0)throw new Error("Corrupted zip: missing "+Math.abs(e)+" bytes.")},prepareReader:function(a){this.reader=e(a)},load:function(a){this.prepareReader(a),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},b.exports=d},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(a,b,c){"use strict";function d(a,b){this.options=a,this.loadOptions=b}var e=a("./reader/readerFor"),f=a("./utils"),g=a("./compressedObject"),h=a("./crc32"),i=a("./utf8"),j=a("./compressions"),k=a("./support"),l=0,m=3,n=function(a){for(var b in j)if(j.hasOwnProperty(b)&&j[b].magic===a)return j[b];return null};d.prototype={isEncrypted:function(){return 1===(1&this.bitFlag)},useUTF8:function(){return 2048===(2048&this.bitFlag)},readLocalPart:function(a){var b,c;if(a.skip(22),this.fileNameLength=a.readInt(2),c=a.readInt(2),this.fileName=a.readData(this.fileNameLength),a.skip(c),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(b=n(this.compressionMethod),null===b)throw new Error("Corrupted zip : compression "+f.pretty(this.compressionMethod)+" unknown (inner file : "+f.transformTo("string",this.fileName)+")");this.decompressed=new g(this.compressedSize,this.uncompressedSize,this.crc32,b,a.readData(this.compressedSize))},readCentralPart:function(a){this.versionMadeBy=a.readInt(2),a.skip(2),this.bitFlag=a.readInt(2),this.compressionMethod=a.readString(2),this.date=a.readDate(),this.crc32=a.readInt(4),this.compressedSize=a.readInt(4),this.uncompressedSize=a.readInt(4);var b=a.readInt(2);if(this.extraFieldsLength=a.readInt(2),this.fileCommentLength=a.readInt(2),this.diskNumberStart=a.readInt(2),this.internalFileAttributes=a.readInt(2),this.externalFileAttributes=a.readInt(4),this.localHeaderOffset=a.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");a.skip(b),this.readExtraFields(a),this.parseZIP64ExtraField(a),this.fileComment=a.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var a=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),a===l&&(this.dosPermissions=63&this.externalFileAttributes),a===m&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(a){if(this.extraFields[1]){var b=e(this.extraFields[1].value);this.uncompressedSize===f.MAX_VALUE_32BITS&&(this.uncompressedSize=b.readInt(8)),this.compressedSize===f.MAX_VALUE_32BITS&&(this.compressedSize=b.readInt(8)),this.localHeaderOffset===f.MAX_VALUE_32BITS&&(this.localHeaderOffset=b.readInt(8)),this.diskNumberStart===f.MAX_VALUE_32BITS&&(this.diskNumberStart=b.readInt(4))}},readExtraFields:function(a){var b,c,d,e=a.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});a.index<e;)b=a.readInt(2),c=a.readInt(2),d=a.readData(c),this.extraFields[b]={id:b,length:c,value:d}},handleUTF8:function(){var a=k.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=i.utf8decode(this.fileName),this.fileCommentStr=i.utf8decode(this.fileComment);else{var b=this.findExtraFieldUnicodePath();if(null!==b)this.fileNameStr=b;else{var c=f.transformTo(a,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(c)}var d=this.findExtraFieldUnicodeComment();if(null!==d)this.fileCommentStr=d;else{var e=f.transformTo(a,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(e)}}},findExtraFieldUnicodePath:function(){var a=this.extraFields[28789];if(a){var b=e(a.value);return 1!==b.readInt(1)?null:h(this.fileName)!==b.readInt(4)?null:i.utf8decode(b.readData(a.length-5))}return null},findExtraFieldUnicodeComment:function(){var a=this.extraFields[25461];if(a){var b=e(a.value);return 1!==b.readInt(1)?null:h(this.fileComment)!==b.readInt(4)?null:i.utf8decode(b.readData(a.length-5))}return null}},b.exports=d},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(a,b,c){"use strict";var d=a("./stream/StreamHelper"),e=a("./stream/DataWorker"),f=a("./utf8"),g=a("./compressedObject"),h=a("./stream/GenericWorker"),i=function(a,b,c){this.name=a,this.dir=c.dir,this.date=c.date,this.comment=c.comment,this.unixPermissions=c.unixPermissions,this.dosPermissions=c.dosPermissions,this._data=b,this._dataBinary=c.binary,this.options={compression:c.compression,compressionOptions:c.compressionOptions}};i.prototype={internalStream:function(a){var b=a.toLowerCase(),c="string"===b||"text"===b;"binarystring"!==b&&"text"!==b||(b="string");var e=this._decompressWorker(),g=!this._dataBinary;return g&&!c&&(e=e.pipe(new f.Utf8EncodeWorker)),!g&&c&&(e=e.pipe(new f.Utf8DecodeWorker)),new d(e,b,"")},async:function(a,b){return this.internalStream(a).accumulate(b)},nodeStream:function(a,b){return this.internalStream(a||"nodebuffer").toNodejsStream(b)},_compressWorker:function(a,b){if(this._data instanceof g&&this._data.compression.magic===a.magic)return this._data.getCompressedWorker();var c=this._decompressWorker();return this._dataBinary||(c=c.pipe(new f.Utf8EncodeWorker)),g.createWorkerFrom(c,a,b)},_decompressWorker:function(){return this._data instanceof g?this._data.getContentWorker():this._data instanceof h?this._data:new e(this._data)}};for(var j=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],k=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},l=0;l<j.length;l++)i.prototype[j[l]]=k;b.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(a,b,c){a("../modules/web.immediate"),b.exports=a("../modules/_core").setImmediate},{"../modules/_core":40,"../modules/web.immediate":56}],37:[function(a,b,c){b.exports=function(a){if("function"!=typeof a)throw TypeError(a+" is not a function!");return a}},{}],38:[function(a,b,c){var d=a("./_is-object");b.exports=function(a){if(!d(a))throw TypeError(a+" is not an object!");return a}},{"./_is-object":51}],39:[function(a,b,c){var d={}.toString;b.exports=function(a){return d.call(a).slice(8,-1)}},{}],40:[function(a,b,c){var d=b.exports={version:"2.3.0"};"number"==typeof __e&&(__e=d)},{}],41:[function(a,b,c){var d=a("./_a-function");b.exports=function(a,b,c){if(d(a),void 0===b)return a;switch(c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)}}return function(){return a.apply(b,arguments)}}},{"./_a-function":37}],42:[function(a,b,c){b.exports=!a("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./_fails":45}],43:[function(a,b,c){var d=a("./_is-object"),e=a("./_global").document,f=d(e)&&d(e.createElement);b.exports=function(a){return f?e.createElement(a):{}}},{"./_global":46,"./_is-object":51}],44:[function(a,b,c){var d=a("./_global"),e=a("./_core"),f=a("./_ctx"),g=a("./_hide"),h="prototype",i=function(a,b,c){var j,k,l,m=a&i.F,n=a&i.G,o=a&i.S,p=a&i.P,q=a&i.B,r=a&i.W,s=n?e:e[b]||(e[b]={}),t=s[h],u=n?d:o?d[b]:(d[b]||{})[h];n&&(c=b);for(j in c)k=!m&&u&&void 0!==u[j],k&&j in s||(l=k?u[j]:c[j],s[j]=n&&"function"!=typeof u[j]?c[j]:q&&k?f(l,d):r&&u[j]==l?function(a){var b=function(b,c,d){if(this instanceof a){switch(arguments.length){case 0:return new a;case 1:return new a(b);case 2:return new a(b,c)}return new a(b,c,d)}return a.apply(this,arguments)};return b[h]=a[h],b}(l):p&&"function"==typeof l?f(Function.call,l):l,p&&((s.virtual||(s.virtual={}))[j]=l,a&i.R&&t&&!t[j]&&g(t,j,l)))};i.F=1,i.G=2,i.S=4,i.P=8,i.B=16,i.W=32,i.U=64,i.R=128,b.exports=i},{"./_core":40,"./_ctx":41,"./_global":46,"./_hide":47}],45:[function(a,b,c){b.exports=function(a){try{return!!a()}catch(b){return!0}}},{}],46:[function(a,b,c){var d=b.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=d)},{}],47:[function(a,b,c){var d=a("./_object-dp"),e=a("./_property-desc");b.exports=a("./_descriptors")?function(a,b,c){return d.f(a,b,e(1,c))}:function(a,b,c){return a[b]=c,a}},{"./_descriptors":42,"./_object-dp":52,"./_property-desc":53}],48:[function(a,b,c){b.exports=a("./_global").document&&document.documentElement},{"./_global":46}],49:[function(a,b,c){b.exports=!a("./_descriptors")&&!a("./_fails")(function(){return 7!=Object.defineProperty(a("./_dom-create")("div"),"a",{get:function(){return 7}}).a})},{"./_descriptors":42,"./_dom-create":43,"./_fails":45}],50:[function(a,b,c){b.exports=function(a,b,c){var d=void 0===c;switch(b.length){case 0:return d?a():a.call(c);case 1:return d?a(b[0]):a.call(c,b[0]);case 2:return d?a(b[0],b[1]):a.call(c,b[0],b[1]);case 3:return d?a(b[0],b[1],b[2]):a.call(c,b[0],b[1],b[2]);case 4:return d?a(b[0],b[1],b[2],b[3]):a.call(c,b[0],b[1],b[2],b[3])}return a.apply(c,b)}},{}],51:[function(a,b,c){b.exports=function(a){return"object"==typeof a?null!==a:"function"==typeof a}},{}],52:[function(a,b,c){var d=a("./_an-object"),e=a("./_ie8-dom-define"),f=a("./_to-primitive"),g=Object.defineProperty;c.f=a("./_descriptors")?Object.defineProperty:function(a,b,c){if(d(a),b=f(b,!0),d(c),e)try{return g(a,b,c)}catch(h){}if("get"in c||"set"in c)throw TypeError("Accessors not supported!");return"value"in c&&(a[b]=c.value),a}},{"./_an-object":38,"./_descriptors":42,"./_ie8-dom-define":49,"./_to-primitive":55}],53:[function(a,b,c){b.exports=function(a,b){return{enumerable:!(1&a),configurable:!(2&a),writable:!(4&a),value:b}}},{}],54:[function(a,b,c){var d,e,f,g=a("./_ctx"),h=a("./_invoke"),i=a("./_html"),j=a("./_dom-create"),k=a("./_global"),l=k.process,m=k.setImmediate,n=k.clearImmediate,o=k.MessageChannel,p=0,q={},r="onreadystatechange",s=function(){var a=+this;if(q.hasOwnProperty(a)){var b=q[a];delete q[a],b()}},t=function(a){s.call(a.data)};m&&n||(m=function(a){for(var b=[],c=1;arguments.length>c;)b.push(arguments[c++]);return q[++p]=function(){h("function"==typeof a?a:Function(a),b)},d(p),p},n=function(a){delete q[a]},"process"==a("./_cof")(l)?d=function(a){l.nextTick(g(s,a,1))}:o?(e=new o,f=e.port2,e.port1.onmessage=t,d=g(f.postMessage,f,1)):k.addEventListener&&"function"==typeof postMessage&&!k.importScripts?(d=function(a){k.postMessage(a+"","*")},k.addEventListener("message",t,!1)):d=r in j("script")?function(a){i.appendChild(j("script"))[r]=function(){i.removeChild(this),s.call(a)}}:function(a){setTimeout(g(s,a,1),0)}),b.exports={set:m,clear:n}},{"./_cof":39,"./_ctx":41,"./_dom-create":43,"./_global":46,"./_html":48,"./_invoke":50}],55:[function(a,b,c){var d=a("./_is-object");b.exports=function(a,b){if(!d(a))return a;var c,e;if(b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;if("function"==typeof(c=a.valueOf)&&!d(e=c.call(a)))return e;if(!b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":51}],56:[function(a,b,c){var d=a("./_export"),e=a("./_task");d(d.G+d.B,{setImmediate:e.set,clearImmediate:e.clear})},{"./_export":44,"./_task":54}],57:[function(a,b,c){(function(a){"use strict";function c(){k=!0;for(var a,b,c=l.length;c;){for(b=l,l=[],a=-1;++a<c;)b[a]();c=l.length}k=!1}function d(a){1!==l.push(a)||k||e()}var e,f=a.MutationObserver||a.WebKitMutationObserver;if(f){var g=0,h=new f(c),i=a.document.createTextNode("");h.observe(i,{characterData:!0}),e=function(){i.data=g=++g%2}}else if(a.setImmediate||"undefined"==typeof a.MessageChannel)e="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var b=a.document.createElement("script");b.onreadystatechange=function(){c(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},a.document.documentElement.appendChild(b)}:function(){setTimeout(c,0)};else{var j=new a.MessageChannel;j.port1.onmessage=c,e=function(){j.port2.postMessage(0)}}var k,l=[];b.exports=d}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],58:[function(a,b,c){"use strict";function d(){}function e(a){if("function"!=typeof a)throw new TypeError("resolver must be a function");this.state=s,this.queue=[],this.outcome=void 0,a!==d&&i(this,a)}function f(a,b,c){this.promise=a,"function"==typeof b&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),"function"==typeof c&&(this.onRejected=c,this.callRejected=this.otherCallRejected)}function g(a,b,c){o(function(){var d;try{d=b(c)}catch(e){return p.reject(a,e)}d===a?p.reject(a,new TypeError("Cannot resolve promise with itself")):p.resolve(a,d)})}function h(a){var b=a&&a.then;if(a&&("object"==typeof a||"function"==typeof a)&&"function"==typeof b)return function(){b.apply(a,arguments)}}function i(a,b){function c(b){f||(f=!0,p.reject(a,b))}function d(b){f||(f=!0,p.resolve(a,b))}function e(){b(d,c)}var f=!1,g=j(e);"error"===g.status&&c(g.value)}function j(a,b){var c={};try{c.value=a(b),c.status="success"}catch(d){c.status="error",c.value=d}return c}function k(a){return a instanceof this?a:p.resolve(new this(d),a)}function l(a){var b=new this(d);return p.reject(b,a)}function m(a){function b(a,b){function d(a){g[b]=a,++h!==e||f||(f=!0,p.resolve(j,g))}c.resolve(a).then(d,function(a){f||(f=!0,p.reject(j,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=new Array(e),h=0,i=-1,j=new this(d);++i<e;)b(a[i],i);return j}function n(a){function b(a){c.resolve(a).then(function(a){f||(f=!0,p.resolve(h,a))},function(a){f||(f=!0,p.reject(h,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=-1,h=new this(d);++g<e;)b(a[g]);return h}var o=a("immediate"),p={},q=["REJECTED"],r=["FULFILLED"],s=["PENDING"];b.exports=e,e.prototype["catch"]=function(a){return this.then(null,a)},e.prototype.then=function(a,b){if("function"!=typeof a&&this.state===r||"function"!=typeof b&&this.state===q)return this;var c=new this.constructor(d);if(this.state!==s){var e=this.state===r?a:b;g(c,e,this.outcome)}else this.queue.push(new f(c,a,b));return c},f.prototype.callFulfilled=function(a){p.resolve(this.promise,a)},f.prototype.otherCallFulfilled=function(a){g(this.promise,this.onFulfilled,a)},f.prototype.callRejected=function(a){p.reject(this.promise,a)},f.prototype.otherCallRejected=function(a){g(this.promise,this.onRejected,a)},p.resolve=function(a,b){var c=j(h,b);if("error"===c.status)return p.reject(a,c.value);var d=c.value;if(d)i(a,d);else{a.state=r,a.outcome=b;for(var e=-1,f=a.queue.length;++e<f;)a.queue[e].callFulfilled(b)}return a},p.reject=function(a,b){a.state=q,a.outcome=b;for(var c=-1,d=a.queue.length;++c<d;)a.queue[c].callRejected(b);return a},e.resolve=k,e.reject=l,e.all=m,e.race=n},{immediate:57}],59:[function(a,b,c){"use strict";var d=a("./lib/utils/common").assign,e=a("./lib/deflate"),f=a("./lib/inflate"),g=a("./lib/zlib/constants"),h={};d(h,e,f,g),b.exports=h},{"./lib/deflate":60,"./lib/inflate":61,"./lib/utils/common":62,"./lib/zlib/constants":65}],60:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=i.assign({level:s,method:u,chunkSize:16384,windowBits:15,memLevel:8,strategy:t,to:""},a||{});var b=this.options;b.raw&&b.windowBits>0?b.windowBits=-b.windowBits:b.gzip&&b.windowBits>0&&b.windowBits<16&&(b.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=h.deflateInit2(this.strm,b.level,b.method,b.windowBits,b.memLevel,b.strategy);if(c!==p)throw new Error(k[c]);if(b.header&&h.deflateSetHeader(this.strm,b.header),b.dictionary){var e;if(e="string"==typeof b.dictionary?j.string2buf(b.dictionary):"[object ArrayBuffer]"===m.call(b.dictionary)?new Uint8Array(b.dictionary):b.dictionary,c=h.deflateSetDictionary(this.strm,e),c!==p)throw new Error(k[c]);this._dict_set=!0}}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg||k[c.err];return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}function g(a,b){return b=b||{},b.gzip=!0,e(a,b)}var h=a("./zlib/deflate"),i=a("./utils/common"),j=a("./utils/strings"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=Object.prototype.toString,n=0,o=4,p=0,q=1,r=2,s=-1,t=0,u=8;d.prototype.push=function(a,b){var c,d,e=this.strm,f=this.options.chunkSize;if(this.ended)return!1;d=b===~~b?b:b===!0?o:n,"string"==typeof a?e.input=j.string2buf(a):"[object ArrayBuffer]"===m.call(a)?e.input=new Uint8Array(a):e.input=a,e.next_in=0,e.avail_in=e.input.length;do{if(0===e.avail_out&&(e.output=new i.Buf8(f),e.next_out=0,e.avail_out=f),c=h.deflate(e,d),c!==q&&c!==p)return this.onEnd(c),this.ended=!0,!1;0!==e.avail_out&&(0!==e.avail_in||d!==o&&d!==r)||("string"===this.options.to?this.onData(j.buf2binstring(i.shrinkBuf(e.output,e.next_out))):this.onData(i.shrinkBuf(e.output,e.next_out)))}while((e.avail_in>0||0===e.avail_out)&&c!==q);return d===o?(c=h.deflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===p):d!==r||(this.onEnd(p),e.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===p&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Deflate=d,c.deflate=e,c.deflateRaw=f,c.gzip=g},{"./utils/common":62,"./utils/strings":63,"./zlib/deflate":67,"./zlib/messages":72,"./zlib/zstream":74}],61:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=h.assign({chunkSize:16384,windowBits:0,to:""},a||{});var b=this.options;b.raw&&b.windowBits>=0&&b.windowBits<16&&(b.windowBits=-b.windowBits,0===b.windowBits&&(b.windowBits=-15)),!(b.windowBits>=0&&b.windowBits<16)||a&&a.windowBits||(b.windowBits+=32),b.windowBits>15&&b.windowBits<48&&0===(15&b.windowBits)&&(b.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=g.inflateInit2(this.strm,b.windowBits);if(c!==j.Z_OK)throw new Error(k[c]);this.header=new m,g.inflateGetHeader(this.strm,this.header)}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg||k[c.err];return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}var g=a("./zlib/inflate"),h=a("./utils/common"),i=a("./utils/strings"),j=a("./zlib/constants"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=a("./zlib/gzheader"),n=Object.prototype.toString;d.prototype.push=function(a,b){var c,d,e,f,k,l,m=this.strm,o=this.options.chunkSize,p=this.options.dictionary,q=!1;if(this.ended)return!1;d=b===~~b?b:b===!0?j.Z_FINISH:j.Z_NO_FLUSH,"string"==typeof a?m.input=i.binstring2buf(a):"[object ArrayBuffer]"===n.call(a)?m.input=new Uint8Array(a):m.input=a,m.next_in=0,m.avail_in=m.input.length;do{if(0===m.avail_out&&(m.output=new h.Buf8(o),m.next_out=0,m.avail_out=o),c=g.inflate(m,j.Z_NO_FLUSH),c===j.Z_NEED_DICT&&p&&(l="string"==typeof p?i.string2buf(p):"[object ArrayBuffer]"===n.call(p)?new Uint8Array(p):p,c=g.inflateSetDictionary(this.strm,l)),c===j.Z_BUF_ERROR&&q===!0&&(c=j.Z_OK,q=!1),c!==j.Z_STREAM_END&&c!==j.Z_OK)return this.onEnd(c),this.ended=!0,!1;m.next_out&&(0!==m.avail_out&&c!==j.Z_STREAM_END&&(0!==m.avail_in||d!==j.Z_FINISH&&d!==j.Z_SYNC_FLUSH)||("string"===this.options.to?(e=i.utf8border(m.output,m.next_out),f=m.next_out-e,k=i.buf2string(m.output,e),m.next_out=f,m.avail_out=o-f,f&&h.arraySet(m.output,m.output,e,f,0),this.onData(k)):this.onData(h.shrinkBuf(m.output,m.next_out)))),0===m.avail_in&&0===m.avail_out&&(q=!0)}while((m.avail_in>0||0===m.avail_out)&&c!==j.Z_STREAM_END);return c===j.Z_STREAM_END&&(d=j.Z_FINISH),d===j.Z_FINISH?(c=g.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===j.Z_OK):d!==j.Z_SYNC_FLUSH||(this.onEnd(j.Z_OK),m.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===j.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=h.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Inflate=d,c.inflate=e,c.inflateRaw=f,c.ungzip=e},{"./utils/common":62,"./utils/strings":63,"./zlib/constants":65,"./zlib/gzheader":68,"./zlib/inflate":70,"./zlib/messages":72,"./zlib/zstream":74}],62:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;c.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if("object"!=typeof c)throw new TypeError(c+"must be non-object");for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}}return a},c.shrinkBuf=function(a,b){return a.length===b?a:a.subarray?a.subarray(0,b):(a.length=b,a)};var e={arraySet:function(a,b,c,d,e){if(b.subarray&&a.subarray)return void a.set(b.subarray(c,c+d),e);for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){var b,c,d,e,f,g;for(d=0,b=0,c=a.length;b<c;b++)d+=a[b].length;for(g=new Uint8Array(d),e=0,b=0,c=a.length;b<c;b++)f=a[b],g.set(f,e),e+=f.length;return g}},f={arraySet:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){return[].concat.apply([],a)}};c.setTyped=function(a){a?(c.Buf8=Uint8Array,c.Buf16=Uint16Array,c.Buf32=Int32Array,c.assign(c,e)):(c.Buf8=Array,c.Buf16=Array,c.Buf32=Array,c.assign(c,f))},c.setTyped(d)},{}],63:[function(a,b,c){"use strict";function d(a,b){if(b<65537&&(a.subarray&&g||!a.subarray&&f))return String.fromCharCode.apply(null,e.shrinkBuf(a,b));for(var c="",d=0;d<b;d++)c+=String.fromCharCode(a[d]);return c}var e=a("./common"),f=!0,g=!0;try{String.fromCharCode.apply(null,[0])}catch(h){f=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(h){g=!1}for(var i=new e.Buf8(256),j=0;j<256;j++)i[j]=j>=252?6:j>=248?5:j>=240?4:j>=224?3:j>=192?2:1;i[254]=i[254]=1,c.string2buf=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;f<h;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=new e.Buf8(i),g=0,f=0;g<i;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),c<128?b[g++]=c:c<2048?(b[g++]=192|c>>>6,b[g++]=128|63&c):c<65536?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},c.buf2binstring=function(a){return d(a,a.length)},c.binstring2buf=function(a){for(var b=new e.Buf8(a.length),c=0,d=b.length;c<d;c++)b[c]=a.charCodeAt(c);return b},c.buf2string=function(a,b){var c,e,f,g,h=b||a.length,j=new Array(2*h);for(e=0,c=0;c<h;)if(f=a[c++],f<128)j[e++]=f;else if(g=i[f],g>4)j[e++]=65533,c+=g-1;else{for(f&=2===g?31:3===g?15:7;g>1&&c<h;)f=f<<6|63&a[c++],g--;g>1?j[e++]=65533:f<65536?j[e++]=f:(f-=65536,j[e++]=55296|f>>10&1023,j[e++]=56320|1023&f)}return d(j,e)},c.utf8border=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+i[a[c]]>b?c:b}},{"./common":62}],64:[function(a,b,c){"use strict";function d(a,b,c,d){for(var e=65535&a|0,f=a>>>16&65535|0,g=0;0!==c;){g=c>2e3?2e3:c,c-=g;do e=e+b[d++]|0,f=f+e|0;while(--g);e%=65521,f%=65521}return e|f<<16|0}b.exports=d},{}],65:[function(a,b,c){"use strict";b.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,
Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],66:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=f,g=d+c;a^=-1;for(var h=d;h<g;h++)a=a>>>8^e[255&(a^b[h])];return a^-1}var f=d();b.exports=e},{}],67:[function(a,b,c){"use strict";function d(a,b){return a.msg=I[b],b}function e(a){return(a<<1)-(a>4?9:0)}function f(a){for(var b=a.length;--b>=0;)a[b]=0}function g(a){var b=a.state,c=b.pending;c>a.avail_out&&(c=a.avail_out),0!==c&&(E.arraySet(a.output,b.pending_buf,b.pending_out,c,a.next_out),a.next_out+=c,b.pending_out+=c,a.total_out+=c,a.avail_out-=c,b.pending-=c,0===b.pending&&(b.pending_out=0))}function h(a,b){F._tr_flush_block(a,a.block_start>=0?a.block_start:-1,a.strstart-a.block_start,b),a.block_start=a.strstart,g(a.strm)}function i(a,b){a.pending_buf[a.pending++]=b}function j(a,b){a.pending_buf[a.pending++]=b>>>8&255,a.pending_buf[a.pending++]=255&b}function k(a,b,c,d){var e=a.avail_in;return e>d&&(e=d),0===e?0:(a.avail_in-=e,E.arraySet(b,a.input,a.next_in,e,c),1===a.state.wrap?a.adler=G(a.adler,b,e,c):2===a.state.wrap&&(a.adler=H(a.adler,b,e,c)),a.next_in+=e,a.total_in+=e,e)}function l(a,b){var c,d,e=a.max_chain_length,f=a.strstart,g=a.prev_length,h=a.nice_match,i=a.strstart>a.w_size-la?a.strstart-(a.w_size-la):0,j=a.window,k=a.w_mask,l=a.prev,m=a.strstart+ka,n=j[f+g-1],o=j[f+g];a.prev_length>=a.good_match&&(e>>=2),h>a.lookahead&&(h=a.lookahead);do if(c=b,j[c+g]===o&&j[c+g-1]===n&&j[c]===j[f]&&j[++c]===j[f+1]){f+=2,c++;do;while(j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&f<m);if(d=ka-(m-f),f=m-ka,d>g){if(a.match_start=b,g=d,d>=h)break;n=j[f+g-1],o=j[f+g]}}while((b=l[b&k])>i&&0!==--e);return g<=a.lookahead?g:a.lookahead}function m(a){var b,c,d,e,f,g=a.w_size;do{if(e=a.window_size-a.lookahead-a.strstart,a.strstart>=g+(g-la)){E.arraySet(a.window,a.window,g,g,0),a.match_start-=g,a.strstart-=g,a.block_start-=g,c=a.hash_size,b=c;do d=a.head[--b],a.head[b]=d>=g?d-g:0;while(--c);c=g,b=c;do d=a.prev[--b],a.prev[b]=d>=g?d-g:0;while(--c);e+=g}if(0===a.strm.avail_in)break;if(c=k(a.strm,a.window,a.strstart+a.lookahead,e),a.lookahead+=c,a.lookahead+a.insert>=ja)for(f=a.strstart-a.insert,a.ins_h=a.window[f],a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+1])&a.hash_mask;a.insert&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+ja-1])&a.hash_mask,a.prev[f&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=f,f++,a.insert--,!(a.lookahead+a.insert<ja)););}while(a.lookahead<la&&0!==a.strm.avail_in)}function n(a,b){var c=65535;for(c>a.pending_buf_size-5&&(c=a.pending_buf_size-5);;){if(a.lookahead<=1){if(m(a),0===a.lookahead&&b===J)return ua;if(0===a.lookahead)break}a.strstart+=a.lookahead,a.lookahead=0;var d=a.block_start+c;if((0===a.strstart||a.strstart>=d)&&(a.lookahead=a.strstart-d,a.strstart=d,h(a,!1),0===a.strm.avail_out))return ua;if(a.strstart-a.block_start>=a.w_size-la&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.strstart>a.block_start&&(h(a,!1),0===a.strm.avail_out)?ua:ua}function o(a,b){for(var c,d;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),0!==c&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c)),a.match_length>=ja)if(d=F._tr_tally(a,a.strstart-a.match_start,a.match_length-ja),a.lookahead-=a.match_length,a.match_length<=a.max_lazy_match&&a.lookahead>=ja){a.match_length--;do a.strstart++,a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart;while(0!==--a.match_length);a.strstart++}else a.strstart+=a.match_length,a.match_length=0,a.ins_h=a.window[a.strstart],a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+1])&a.hash_mask;else d=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++;if(d&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function p(a,b){for(var c,d,e;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),a.prev_length=a.match_length,a.prev_match=a.match_start,a.match_length=ja-1,0!==c&&a.prev_length<a.max_lazy_match&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c),a.match_length<=5&&(a.strategy===U||a.match_length===ja&&a.strstart-a.match_start>4096)&&(a.match_length=ja-1)),a.prev_length>=ja&&a.match_length<=a.prev_length){e=a.strstart+a.lookahead-ja,d=F._tr_tally(a,a.strstart-1-a.prev_match,a.prev_length-ja),a.lookahead-=a.prev_length-1,a.prev_length-=2;do++a.strstart<=e&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart);while(0!==--a.prev_length);if(a.match_available=0,a.match_length=ja-1,a.strstart++,d&&(h(a,!1),0===a.strm.avail_out))return ua}else if(a.match_available){if(d=F._tr_tally(a,0,a.window[a.strstart-1]),d&&h(a,!1),a.strstart++,a.lookahead--,0===a.strm.avail_out)return ua}else a.match_available=1,a.strstart++,a.lookahead--}return a.match_available&&(d=F._tr_tally(a,0,a.window[a.strstart-1]),a.match_available=0),a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function q(a,b){for(var c,d,e,f,g=a.window;;){if(a.lookahead<=ka){if(m(a),a.lookahead<=ka&&b===J)return ua;if(0===a.lookahead)break}if(a.match_length=0,a.lookahead>=ja&&a.strstart>0&&(e=a.strstart-1,d=g[e],d===g[++e]&&d===g[++e]&&d===g[++e])){f=a.strstart+ka;do;while(d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&e<f);a.match_length=ka-(f-e),a.match_length>a.lookahead&&(a.match_length=a.lookahead)}if(a.match_length>=ja?(c=F._tr_tally(a,1,a.match_length-ja),a.lookahead-=a.match_length,a.strstart+=a.match_length,a.match_length=0):(c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++),c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function r(a,b){for(var c;;){if(0===a.lookahead&&(m(a),0===a.lookahead)){if(b===J)return ua;break}if(a.match_length=0,c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++,c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function s(a,b,c,d,e){this.good_length=a,this.max_lazy=b,this.nice_length=c,this.max_chain=d,this.func=e}function t(a){a.window_size=2*a.w_size,f(a.head),a.max_lazy_match=D[a.level].max_lazy,a.good_match=D[a.level].good_length,a.nice_match=D[a.level].nice_length,a.max_chain_length=D[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=ja-1,a.match_available=0,a.ins_h=0}function u(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=$,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new E.Buf16(2*ha),this.dyn_dtree=new E.Buf16(2*(2*fa+1)),this.bl_tree=new E.Buf16(2*(2*ga+1)),f(this.dyn_ltree),f(this.dyn_dtree),f(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new E.Buf16(ia+1),this.heap=new E.Buf16(2*ea+1),f(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new E.Buf16(2*ea+1),f(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function v(a){var b;return a&&a.state?(a.total_in=a.total_out=0,a.data_type=Z,b=a.state,b.pending=0,b.pending_out=0,b.wrap<0&&(b.wrap=-b.wrap),b.status=b.wrap?na:sa,a.adler=2===b.wrap?0:1,b.last_flush=J,F._tr_init(b),O):d(a,Q)}function w(a){var b=v(a);return b===O&&t(a.state),b}function x(a,b){return a&&a.state?2!==a.state.wrap?Q:(a.state.gzhead=b,O):Q}function y(a,b,c,e,f,g){if(!a)return Q;var h=1;if(b===T&&(b=6),e<0?(h=0,e=-e):e>15&&(h=2,e-=16),f<1||f>_||c!==$||e<8||e>15||b<0||b>9||g<0||g>X)return d(a,Q);8===e&&(e=9);var i=new u;return a.state=i,i.strm=a,i.wrap=h,i.gzhead=null,i.w_bits=e,i.w_size=1<<i.w_bits,i.w_mask=i.w_size-1,i.hash_bits=f+7,i.hash_size=1<<i.hash_bits,i.hash_mask=i.hash_size-1,i.hash_shift=~~((i.hash_bits+ja-1)/ja),i.window=new E.Buf8(2*i.w_size),i.head=new E.Buf16(i.hash_size),i.prev=new E.Buf16(i.w_size),i.lit_bufsize=1<<f+6,i.pending_buf_size=4*i.lit_bufsize,i.pending_buf=new E.Buf8(i.pending_buf_size),i.d_buf=1*i.lit_bufsize,i.l_buf=3*i.lit_bufsize,i.level=b,i.strategy=g,i.method=c,w(a)}function z(a,b){return y(a,b,$,aa,ba,Y)}function A(a,b){var c,h,k,l;if(!a||!a.state||b>N||b<0)return a?d(a,Q):Q;if(h=a.state,!a.output||!a.input&&0!==a.avail_in||h.status===ta&&b!==M)return d(a,0===a.avail_out?S:Q);if(h.strm=a,c=h.last_flush,h.last_flush=b,h.status===na)if(2===h.wrap)a.adler=0,i(h,31),i(h,139),i(h,8),h.gzhead?(i(h,(h.gzhead.text?1:0)+(h.gzhead.hcrc?2:0)+(h.gzhead.extra?4:0)+(h.gzhead.name?8:0)+(h.gzhead.comment?16:0)),i(h,255&h.gzhead.time),i(h,h.gzhead.time>>8&255),i(h,h.gzhead.time>>16&255),i(h,h.gzhead.time>>24&255),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,255&h.gzhead.os),h.gzhead.extra&&h.gzhead.extra.length&&(i(h,255&h.gzhead.extra.length),i(h,h.gzhead.extra.length>>8&255)),h.gzhead.hcrc&&(a.adler=H(a.adler,h.pending_buf,h.pending,0)),h.gzindex=0,h.status=oa):(i(h,0),i(h,0),i(h,0),i(h,0),i(h,0),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,ya),h.status=sa);else{var m=$+(h.w_bits-8<<4)<<8,n=-1;n=h.strategy>=V||h.level<2?0:h.level<6?1:6===h.level?2:3,m|=n<<6,0!==h.strstart&&(m|=ma),m+=31-m%31,h.status=sa,j(h,m),0!==h.strstart&&(j(h,a.adler>>>16),j(h,65535&a.adler)),a.adler=1}if(h.status===oa)if(h.gzhead.extra){for(k=h.pending;h.gzindex<(65535&h.gzhead.extra.length)&&(h.pending!==h.pending_buf_size||(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending!==h.pending_buf_size));)i(h,255&h.gzhead.extra[h.gzindex]),h.gzindex++;h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),h.gzindex===h.gzhead.extra.length&&(h.gzindex=0,h.status=pa)}else h.status=pa;if(h.status===pa)if(h.gzhead.name){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.name.length?255&h.gzhead.name.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.gzindex=0,h.status=qa)}else h.status=qa;if(h.status===qa)if(h.gzhead.comment){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.comment.length?255&h.gzhead.comment.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.status=ra)}else h.status=ra;if(h.status===ra&&(h.gzhead.hcrc?(h.pending+2>h.pending_buf_size&&g(a),h.pending+2<=h.pending_buf_size&&(i(h,255&a.adler),i(h,a.adler>>8&255),a.adler=0,h.status=sa)):h.status=sa),0!==h.pending){if(g(a),0===a.avail_out)return h.last_flush=-1,O}else if(0===a.avail_in&&e(b)<=e(c)&&b!==M)return d(a,S);if(h.status===ta&&0!==a.avail_in)return d(a,S);if(0!==a.avail_in||0!==h.lookahead||b!==J&&h.status!==ta){var o=h.strategy===V?r(h,b):h.strategy===W?q(h,b):D[h.level].func(h,b);if(o!==wa&&o!==xa||(h.status=ta),o===ua||o===wa)return 0===a.avail_out&&(h.last_flush=-1),O;if(o===va&&(b===K?F._tr_align(h):b!==N&&(F._tr_stored_block(h,0,0,!1),b===L&&(f(h.head),0===h.lookahead&&(h.strstart=0,h.block_start=0,h.insert=0))),g(a),0===a.avail_out))return h.last_flush=-1,O}return b!==M?O:h.wrap<=0?P:(2===h.wrap?(i(h,255&a.adler),i(h,a.adler>>8&255),i(h,a.adler>>16&255),i(h,a.adler>>24&255),i(h,255&a.total_in),i(h,a.total_in>>8&255),i(h,a.total_in>>16&255),i(h,a.total_in>>24&255)):(j(h,a.adler>>>16),j(h,65535&a.adler)),g(a),h.wrap>0&&(h.wrap=-h.wrap),0!==h.pending?O:P)}function B(a){var b;return a&&a.state?(b=a.state.status,b!==na&&b!==oa&&b!==pa&&b!==qa&&b!==ra&&b!==sa&&b!==ta?d(a,Q):(a.state=null,b===sa?d(a,R):O)):Q}function C(a,b){var c,d,e,g,h,i,j,k,l=b.length;if(!a||!a.state)return Q;if(c=a.state,g=c.wrap,2===g||1===g&&c.status!==na||c.lookahead)return Q;for(1===g&&(a.adler=G(a.adler,b,l,0)),c.wrap=0,l>=c.w_size&&(0===g&&(f(c.head),c.strstart=0,c.block_start=0,c.insert=0),k=new E.Buf8(c.w_size),E.arraySet(k,b,l-c.w_size,c.w_size,0),b=k,l=c.w_size),h=a.avail_in,i=a.next_in,j=a.input,a.avail_in=l,a.next_in=0,a.input=b,m(c);c.lookahead>=ja;){d=c.strstart,e=c.lookahead-(ja-1);do c.ins_h=(c.ins_h<<c.hash_shift^c.window[d+ja-1])&c.hash_mask,c.prev[d&c.w_mask]=c.head[c.ins_h],c.head[c.ins_h]=d,d++;while(--e);c.strstart=d,c.lookahead=ja-1,m(c)}return c.strstart+=c.lookahead,c.block_start=c.strstart,c.insert=c.lookahead,c.lookahead=0,c.match_length=c.prev_length=ja-1,c.match_available=0,a.next_in=i,a.input=j,a.avail_in=h,c.wrap=g,O}var D,E=a("../utils/common"),F=a("./trees"),G=a("./adler32"),H=a("./crc32"),I=a("./messages"),J=0,K=1,L=3,M=4,N=5,O=0,P=1,Q=-2,R=-3,S=-5,T=-1,U=1,V=2,W=3,X=4,Y=0,Z=2,$=8,_=9,aa=15,ba=8,ca=29,da=256,ea=da+1+ca,fa=30,ga=19,ha=2*ea+1,ia=15,ja=3,ka=258,la=ka+ja+1,ma=32,na=42,oa=69,pa=73,qa=91,ra=103,sa=113,ta=666,ua=1,va=2,wa=3,xa=4,ya=3;D=[new s(0,0,0,0,n),new s(4,4,8,4,o),new s(4,5,16,8,o),new s(4,6,32,32,o),new s(4,4,16,16,p),new s(8,16,32,32,p),new s(8,16,128,128,p),new s(8,32,128,256,p),new s(32,128,258,1024,p),new s(32,258,258,4096,p)],c.deflateInit=z,c.deflateInit2=y,c.deflateReset=w,c.deflateResetKeep=v,c.deflateSetHeader=x,c.deflate=A,c.deflateEnd=B,c.deflateSetDictionary=C,c.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":62,"./adler32":64,"./crc32":66,"./messages":72,"./trees":73}],68:[function(a,b,c){"use strict";function d(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}b.exports=d},{}],69:[function(a,b,c){"use strict";var d=30,e=12;b.exports=function(a,b){var c,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;c=a.state,f=a.next_in,B=a.input,g=f+(a.avail_in-5),h=a.next_out,C=a.output,i=h-(b-a.avail_out),j=h+(a.avail_out-257),k=c.dmax,l=c.wsize,m=c.whave,n=c.wnext,o=c.window,p=c.hold,q=c.bits,r=c.lencode,s=c.distcode,t=(1<<c.lenbits)-1,u=(1<<c.distbits)-1;a:do{q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=r[p&t];b:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,0===w)C[h++]=65535&v;else{if(!(16&w)){if(0===(64&w)){v=r[(65535&v)+(p&(1<<w)-1)];continue b}if(32&w){c.mode=e;break a}a.msg="invalid literal/length code",c.mode=d;break a}x=65535&v,w&=15,w&&(q<w&&(p+=B[f++]<<q,q+=8),x+=p&(1<<w)-1,p>>>=w,q-=w),q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=s[p&u];c:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,!(16&w)){if(0===(64&w)){v=s[(65535&v)+(p&(1<<w)-1)];continue c}a.msg="invalid distance code",c.mode=d;break a}if(y=65535&v,w&=15,q<w&&(p+=B[f++]<<q,q+=8,q<w&&(p+=B[f++]<<q,q+=8)),y+=p&(1<<w)-1,y>k){a.msg="invalid distance too far back",c.mode=d;break a}if(p>>>=w,q-=w,w=h-i,y>w){if(w=y-w,w>m&&c.sane){a.msg="invalid distance too far back",c.mode=d;break a}if(z=0,A=o,0===n){if(z+=l-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}else if(n<w){if(z+=l+n-w,w-=n,w<x){x-=w;do C[h++]=o[z++];while(--w);if(z=0,n<x){w=n,x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}}else if(z+=n-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}for(;x>2;)C[h++]=A[z++],C[h++]=A[z++],C[h++]=A[z++],x-=3;x&&(C[h++]=A[z++],x>1&&(C[h++]=A[z++]))}else{z=h-y;do C[h++]=C[z++],C[h++]=C[z++],C[h++]=C[z++],x-=3;while(x>2);x&&(C[h++]=C[z++],x>1&&(C[h++]=C[z++]))}break}}break}}while(f<g&&h<j);x=q>>3,f-=x,q-=x<<3,p&=(1<<q)-1,a.next_in=f,a.next_out=h,a.avail_in=f<g?5+(g-f):5-(f-g),a.avail_out=h<j?257+(j-h):257-(h-j),c.hold=p,c.bits=q}},{}],70:[function(a,b,c){"use strict";function d(a){return(a>>>24&255)+(a>>>8&65280)+((65280&a)<<8)+((255&a)<<24)}function e(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new s.Buf16(320),this.work=new s.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function f(a){var b;return a&&a.state?(b=a.state,a.total_in=a.total_out=b.total=0,a.msg="",b.wrap&&(a.adler=1&b.wrap),b.mode=L,b.last=0,b.havedict=0,b.dmax=32768,b.head=null,b.hold=0,b.bits=0,b.lencode=b.lendyn=new s.Buf32(pa),b.distcode=b.distdyn=new s.Buf32(qa),b.sane=1,b.back=-1,D):G}function g(a){var b;return a&&a.state?(b=a.state,b.wsize=0,b.whave=0,b.wnext=0,f(a)):G}function h(a,b){var c,d;return a&&a.state?(d=a.state,b<0?(c=0,b=-b):(c=(b>>4)+1,b<48&&(b&=15)),b&&(b<8||b>15)?G:(null!==d.window&&d.wbits!==b&&(d.window=null),d.wrap=c,d.wbits=b,g(a))):G}function i(a,b){var c,d;return a?(d=new e,a.state=d,d.window=null,c=h(a,b),c!==D&&(a.state=null),c):G}function j(a){return i(a,sa)}function k(a){if(ta){var b;for(q=new s.Buf32(512),r=new s.Buf32(32),b=0;b<144;)a.lens[b++]=8;for(;b<256;)a.lens[b++]=9;for(;b<280;)a.lens[b++]=7;for(;b<288;)a.lens[b++]=8;for(w(y,a.lens,0,288,q,0,a.work,{bits:9}),b=0;b<32;)a.lens[b++]=5;w(z,a.lens,0,32,r,0,a.work,{bits:5}),ta=!1}a.lencode=q,a.lenbits=9,a.distcode=r,a.distbits=5}function l(a,b,c,d){var e,f=a.state;return null===f.window&&(f.wsize=1<<f.wbits,f.wnext=0,f.whave=0,f.window=new s.Buf8(f.wsize)),d>=f.wsize?(s.arraySet(f.window,b,c-f.wsize,f.wsize,0),f.wnext=0,f.whave=f.wsize):(e=f.wsize-f.wnext,e>d&&(e=d),s.arraySet(f.window,b,c-d,e,f.wnext),d-=e,d?(s.arraySet(f.window,b,c-d,d,0),f.wnext=d,f.whave=f.wsize):(f.wnext+=e,f.wnext===f.wsize&&(f.wnext=0),f.whave<f.wsize&&(f.whave+=e))),0}function m(a,b){var c,e,f,g,h,i,j,m,n,o,p,q,r,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa=0,Ba=new s.Buf8(4),Ca=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!a||!a.state||!a.output||!a.input&&0!==a.avail_in)return G;c=a.state,c.mode===W&&(c.mode=X),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,o=i,p=j,xa=D;a:for(;;)switch(c.mode){case L:if(0===c.wrap){c.mode=X;break}for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(2&c.wrap&&35615===m){c.check=0,Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0),m=0,n=0,c.mode=M;break}if(c.flags=0,c.head&&(c.head.done=!1),!(1&c.wrap)||(((255&m)<<8)+(m>>8))%31){a.msg="incorrect header check",c.mode=ma;break}if((15&m)!==K){a.msg="unknown compression method",c.mode=ma;break}if(m>>>=4,n-=4,wa=(15&m)+8,0===c.wbits)c.wbits=wa;else if(wa>c.wbits){a.msg="invalid window size",c.mode=ma;break}c.dmax=1<<wa,a.adler=c.check=1,c.mode=512&m?U:W,m=0,n=0;break;case M:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.flags=m,(255&c.flags)!==K){a.msg="unknown compression method",c.mode=ma;break}if(57344&c.flags){a.msg="unknown header flags set",c.mode=ma;break}c.head&&(c.head.text=m>>8&1),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=N;case N:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.time=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,Ba[2]=m>>>16&255,Ba[3]=m>>>24&255,c.check=u(c.check,Ba,4,0)),m=0,n=0,c.mode=O;case O:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.xflags=255&m,c.head.os=m>>8),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=P;case P:if(1024&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length=m,c.head&&(c.head.extra_len=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0}else c.head&&(c.head.extra=null);c.mode=Q;case Q:if(1024&c.flags&&(q=c.length,q>i&&(q=i),q&&(c.head&&(wa=c.head.extra_len-c.length,c.head.extra||(c.head.extra=new Array(c.head.extra_len)),s.arraySet(c.head.extra,e,g,q,wa)),512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,c.length-=q),c.length))break a;c.length=0,c.mode=R;case R:if(2048&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.name+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.name=null);c.length=0,c.mode=S;case S:if(4096&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.comment+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.comment=null);c.mode=T;case T:if(512&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(65535&c.check)){a.msg="header crc mismatch",c.mode=ma;break}m=0,n=0}c.head&&(c.head.hcrc=c.flags>>9&1,c.head.done=!0),a.adler=c.check=0,c.mode=W;break;case U:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}a.adler=c.check=d(m),m=0,n=0,c.mode=V;case V:if(0===c.havedict)return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,F;a.adler=c.check=1,c.mode=W;case W:if(b===B||b===C)break a;case X:if(c.last){m>>>=7&n,n-=7&n,c.mode=ja;break}for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}switch(c.last=1&m,m>>>=1,n-=1,3&m){case 0:c.mode=Y;break;case 1:if(k(c),c.mode=ca,b===C){m>>>=2,n-=2;break a}break;case 2:c.mode=_;break;case 3:a.msg="invalid block type",c.mode=ma}m>>>=2,n-=2;break;case Y:for(m>>>=7&n,n-=7&n;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if((65535&m)!==(m>>>16^65535)){a.msg="invalid stored block lengths",c.mode=ma;break}if(c.length=65535&m,m=0,n=0,c.mode=Z,b===C)break a;case Z:c.mode=$;case $:if(q=c.length){if(q>i&&(q=i),q>j&&(q=j),0===q)break a;s.arraySet(f,e,g,q,h),i-=q,g+=q,j-=q,h+=q,c.length-=q;break}c.mode=W;break;case _:for(;n<14;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.nlen=(31&m)+257,m>>>=5,n-=5,c.ndist=(31&m)+1,m>>>=5,n-=5,c.ncode=(15&m)+4,m>>>=4,n-=4,c.nlen>286||c.ndist>30){a.msg="too many length or distance symbols",c.mode=ma;break}c.have=0,c.mode=aa;case aa:for(;c.have<c.ncode;){for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.lens[Ca[c.have++]]=7&m,m>>>=3,n-=3}for(;c.have<19;)c.lens[Ca[c.have++]]=0;if(c.lencode=c.lendyn,c.lenbits=7,ya={bits:c.lenbits},xa=w(x,c.lens,0,19,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid code lengths set",c.mode=ma;break}c.have=0,c.mode=ba;case ba:for(;c.have<c.nlen+c.ndist;){for(;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(sa<16)m>>>=qa,n-=qa,c.lens[c.have++]=sa;else{if(16===sa){for(za=qa+2;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m>>>=qa,n-=qa,0===c.have){a.msg="invalid bit length repeat",c.mode=ma;break}wa=c.lens[c.have-1],q=3+(3&m),m>>>=2,n-=2}else if(17===sa){for(za=qa+3;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=3+(7&m),m>>>=3,n-=3}else{for(za=qa+7;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=11+(127&m),m>>>=7,n-=7}if(c.have+q>c.nlen+c.ndist){a.msg="invalid bit length repeat",c.mode=ma;break}for(;q--;)c.lens[c.have++]=wa}}if(c.mode===ma)break;if(0===c.lens[256]){a.msg="invalid code -- missing end-of-block",c.mode=ma;break}if(c.lenbits=9,ya={bits:c.lenbits},xa=w(y,c.lens,0,c.nlen,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid literal/lengths set",c.mode=ma;break}if(c.distbits=6,c.distcode=c.distdyn,ya={bits:c.distbits},xa=w(z,c.lens,c.nlen,c.ndist,c.distcode,0,c.work,ya),c.distbits=ya.bits,xa){a.msg="invalid distances set",c.mode=ma;break}if(c.mode=ca,b===C)break a;case ca:c.mode=da;case da:if(i>=6&&j>=258){a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,v(a,p),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,c.mode===W&&(c.back=-1);break}for(c.back=0;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(ra&&0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.lencode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,c.length=sa,0===ra){c.mode=ia;break}if(32&ra){c.back=-1,c.mode=W;break}if(64&ra){a.msg="invalid literal/length code",c.mode=ma;break}c.extra=15&ra,c.mode=ea;case ea:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}c.was=c.length,c.mode=fa;case fa:for(;Aa=c.distcode[m&(1<<c.distbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.distcode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,64&ra){a.msg="invalid distance code",c.mode=ma;break}c.offset=sa,c.extra=15&ra,c.mode=ga;case ga:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.offset+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}if(c.offset>c.dmax){a.msg="invalid distance too far back",c.mode=ma;break}c.mode=ha;case ha:if(0===j)break a;if(q=p-j,c.offset>q){if(q=c.offset-q,q>c.whave&&c.sane){a.msg="invalid distance too far back",c.mode=ma;break}q>c.wnext?(q-=c.wnext,r=c.wsize-q):r=c.wnext-q,q>c.length&&(q=c.length),pa=c.window}else pa=f,r=h-c.offset,q=c.length;q>j&&(q=j),j-=q,c.length-=q;do f[h++]=pa[r++];while(--q);0===c.length&&(c.mode=da);break;case ia:if(0===j)break a;f[h++]=c.length,j--,c.mode=da;break;case ja:if(c.wrap){for(;n<32;){if(0===i)break a;i--,m|=e[g++]<<n,n+=8}if(p-=j,a.total_out+=p,c.total+=p,p&&(a.adler=c.check=c.flags?u(c.check,f,p,h-p):t(c.check,f,p,h-p)),p=j,(c.flags?m:d(m))!==c.check){a.msg="incorrect data check",c.mode=ma;break}m=0,n=0}c.mode=ka;case ka:if(c.wrap&&c.flags){for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(4294967295&c.total)){a.msg="incorrect length check",c.mode=ma;break}m=0,n=0}c.mode=la;case la:xa=E;break a;case ma:xa=H;break a;case na:return I;case oa:default:return G}return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,(c.wsize||p!==a.avail_out&&c.mode<ma&&(c.mode<ja||b!==A))&&l(a,a.output,a.next_out,p-a.avail_out)?(c.mode=na,I):(o-=a.avail_in,p-=a.avail_out,a.total_in+=o,a.total_out+=p,c.total+=p,c.wrap&&p&&(a.adler=c.check=c.flags?u(c.check,f,p,a.next_out-p):t(c.check,f,p,a.next_out-p)),a.data_type=c.bits+(c.last?64:0)+(c.mode===W?128:0)+(c.mode===ca||c.mode===Z?256:0),(0===o&&0===p||b===A)&&xa===D&&(xa=J),xa)}function n(a){if(!a||!a.state)return G;var b=a.state;return b.window&&(b.window=null),a.state=null,D}function o(a,b){var c;return a&&a.state?(c=a.state,0===(2&c.wrap)?G:(c.head=b,b.done=!1,D)):G}function p(a,b){var c,d,e,f=b.length;return a&&a.state?(c=a.state,0!==c.wrap&&c.mode!==V?G:c.mode===V&&(d=1,d=t(d,b,f,0),d!==c.check)?H:(e=l(a,b,f,f))?(c.mode=na,I):(c.havedict=1,D)):G}var q,r,s=a("../utils/common"),t=a("./adler32"),u=a("./crc32"),v=a("./inffast"),w=a("./inftrees"),x=0,y=1,z=2,A=4,B=5,C=6,D=0,E=1,F=2,G=-2,H=-3,I=-4,J=-5,K=8,L=1,M=2,N=3,O=4,P=5,Q=6,R=7,S=8,T=9,U=10,V=11,W=12,X=13,Y=14,Z=15,$=16,_=17,aa=18,ba=19,ca=20,da=21,ea=22,fa=23,ga=24,ha=25,ia=26,ja=27,ka=28,la=29,ma=30,na=31,oa=32,pa=852,qa=592,ra=15,sa=ra,ta=!0;c.inflateReset=g,c.inflateReset2=h,c.inflateResetKeep=f,c.inflateInit=j,c.inflateInit2=i,c.inflate=m,c.inflateEnd=n,c.inflateGetHeader=o,c.inflateSetDictionary=p,c.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":62,"./adler32":64,"./crc32":66,"./inffast":69,"./inftrees":71}],71:[function(a,b,c){"use strict";var d=a("../utils/common"),e=15,f=852,g=592,h=0,i=1,j=2,k=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],m=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],n=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];b.exports=function(a,b,c,o,p,q,r,s){var t,u,v,w,x,y,z,A,B,C=s.bits,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=null,O=0,P=new d.Buf16(e+1),Q=new d.Buf16(e+1),R=null,S=0;for(D=0;D<=e;D++)P[D]=0;for(E=0;E<o;E++)P[b[c+E]]++;for(H=C,G=e;G>=1&&0===P[G];G--);if(H>G&&(H=G),0===G)return p[q++]=20971520,p[q++]=20971520,s.bits=1,0;for(F=1;F<G&&0===P[F];F++);for(H<F&&(H=F),K=1,D=1;D<=e;D++)if(K<<=1,K-=P[D],K<0)return-1;if(K>0&&(a===h||1!==G))return-1;for(Q[1]=0,D=1;D<e;D++)Q[D+1]=Q[D]+P[D];for(E=0;E<o;E++)0!==b[c+E]&&(r[Q[b[c+E]]++]=E);if(a===h?(N=R=r,y=19):a===i?(N=k,O-=257,R=l,S-=257,y=256):(N=m,R=n,y=-1),M=0,E=0,D=F,x=q,I=H,J=0,v=-1,L=1<<H,w=L-1,a===i&&L>f||a===j&&L>g)return 1;for(;;){z=D-J,r[E]<y?(A=0,B=r[E]):r[E]>y?(A=R[S+r[E]],B=N[O+r[E]]):(A=96,B=0),t=1<<D-J,u=1<<I,F=u;do u-=t,p[x+(M>>J)+u]=z<<24|A<<16|B|0;while(0!==u);for(t=1<<D-1;M&t;)t>>=1;if(0!==t?(M&=t-1,M+=t):M=0,E++,0===--P[D]){if(D===G)break;D=b[c+r[E]]}if(D>H&&(M&w)!==v){for(0===J&&(J=H),x+=F,I=D-J,K=1<<I;I+J<G&&(K-=P[I+J],!(K<=0));)I++,K<<=1;if(L+=1<<I,a===i&&L>f||a===j&&L>g)return 1;v=M&w,p[v]=H<<24|I<<16|x-q|0}}return 0!==M&&(p[x+M]=D-J<<24|64<<16|0),s.bits=H,0}},{"../utils/common":62}],72:[function(a,b,c){"use strict";b.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],73:[function(a,b,c){"use strict";function d(a){for(var b=a.length;--b>=0;)a[b]=0}function e(a,b,c,d,e){this.static_tree=a,this.extra_bits=b,this.extra_base=c,this.elems=d,this.max_length=e,this.has_stree=a&&a.length}function f(a,b){this.dyn_tree=a,this.max_code=0,this.stat_desc=b}function g(a){return a<256?ia[a]:ia[256+(a>>>7)]}function h(a,b){a.pending_buf[a.pending++]=255&b,a.pending_buf[a.pending++]=b>>>8&255}function i(a,b,c){a.bi_valid>X-c?(a.bi_buf|=b<<a.bi_valid&65535,h(a,a.bi_buf),a.bi_buf=b>>X-a.bi_valid,a.bi_valid+=c-X):(a.bi_buf|=b<<a.bi_valid&65535,a.bi_valid+=c)}function j(a,b,c){i(a,c[2*b],c[2*b+1])}function k(a,b){var c=0;do c|=1&a,a>>>=1,c<<=1;while(--b>0);return c>>>1}function l(a){16===a.bi_valid?(h(a,a.bi_buf),a.bi_buf=0,a.bi_valid=0):a.bi_valid>=8&&(a.pending_buf[a.pending++]=255&a.bi_buf,a.bi_buf>>=8,a.bi_valid-=8)}function m(a,b){var c,d,e,f,g,h,i=b.dyn_tree,j=b.max_code,k=b.stat_desc.static_tree,l=b.stat_desc.has_stree,m=b.stat_desc.extra_bits,n=b.stat_desc.extra_base,o=b.stat_desc.max_length,p=0;for(f=0;f<=W;f++)a.bl_count[f]=0;for(i[2*a.heap[a.heap_max]+1]=0,c=a.heap_max+1;c<V;c++)d=a.heap[c],f=i[2*i[2*d+1]+1]+1,f>o&&(f=o,p++),i[2*d+1]=f,d>j||(a.bl_count[f]++,g=0,d>=n&&(g=m[d-n]),h=i[2*d],a.opt_len+=h*(f+g),l&&(a.static_len+=h*(k[2*d+1]+g)));if(0!==p){do{for(f=o-1;0===a.bl_count[f];)f--;
a.bl_count[f]--,a.bl_count[f+1]+=2,a.bl_count[o]--,p-=2}while(p>0);for(f=o;0!==f;f--)for(d=a.bl_count[f];0!==d;)e=a.heap[--c],e>j||(i[2*e+1]!==f&&(a.opt_len+=(f-i[2*e+1])*i[2*e],i[2*e+1]=f),d--)}}function n(a,b,c){var d,e,f=new Array(W+1),g=0;for(d=1;d<=W;d++)f[d]=g=g+c[d-1]<<1;for(e=0;e<=b;e++){var h=a[2*e+1];0!==h&&(a[2*e]=k(f[h]++,h))}}function o(){var a,b,c,d,f,g=new Array(W+1);for(c=0,d=0;d<Q-1;d++)for(ka[d]=c,a=0;a<1<<ba[d];a++)ja[c++]=d;for(ja[c-1]=d,f=0,d=0;d<16;d++)for(la[d]=f,a=0;a<1<<ca[d];a++)ia[f++]=d;for(f>>=7;d<T;d++)for(la[d]=f<<7,a=0;a<1<<ca[d]-7;a++)ia[256+f++]=d;for(b=0;b<=W;b++)g[b]=0;for(a=0;a<=143;)ga[2*a+1]=8,a++,g[8]++;for(;a<=255;)ga[2*a+1]=9,a++,g[9]++;for(;a<=279;)ga[2*a+1]=7,a++,g[7]++;for(;a<=287;)ga[2*a+1]=8,a++,g[8]++;for(n(ga,S+1,g),a=0;a<T;a++)ha[2*a+1]=5,ha[2*a]=k(a,5);ma=new e(ga,ba,R+1,S,W),na=new e(ha,ca,0,T,W),oa=new e(new Array(0),da,0,U,Y)}function p(a){var b;for(b=0;b<S;b++)a.dyn_ltree[2*b]=0;for(b=0;b<T;b++)a.dyn_dtree[2*b]=0;for(b=0;b<U;b++)a.bl_tree[2*b]=0;a.dyn_ltree[2*Z]=1,a.opt_len=a.static_len=0,a.last_lit=a.matches=0}function q(a){a.bi_valid>8?h(a,a.bi_buf):a.bi_valid>0&&(a.pending_buf[a.pending++]=a.bi_buf),a.bi_buf=0,a.bi_valid=0}function r(a,b,c,d){q(a),d&&(h(a,c),h(a,~c)),G.arraySet(a.pending_buf,a.window,b,c,a.pending),a.pending+=c}function s(a,b,c,d){var e=2*b,f=2*c;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}function t(a,b,c){for(var d=a.heap[c],e=c<<1;e<=a.heap_len&&(e<a.heap_len&&s(b,a.heap[e+1],a.heap[e],a.depth)&&e++,!s(b,d,a.heap[e],a.depth));)a.heap[c]=a.heap[e],c=e,e<<=1;a.heap[c]=d}function u(a,b,c){var d,e,f,h,k=0;if(0!==a.last_lit)do d=a.pending_buf[a.d_buf+2*k]<<8|a.pending_buf[a.d_buf+2*k+1],e=a.pending_buf[a.l_buf+k],k++,0===d?j(a,e,b):(f=ja[e],j(a,f+R+1,b),h=ba[f],0!==h&&(e-=ka[f],i(a,e,h)),d--,f=g(d),j(a,f,c),h=ca[f],0!==h&&(d-=la[f],i(a,d,h)));while(k<a.last_lit);j(a,Z,b)}function v(a,b){var c,d,e,f=b.dyn_tree,g=b.stat_desc.static_tree,h=b.stat_desc.has_stree,i=b.stat_desc.elems,j=-1;for(a.heap_len=0,a.heap_max=V,c=0;c<i;c++)0!==f[2*c]?(a.heap[++a.heap_len]=j=c,a.depth[c]=0):f[2*c+1]=0;for(;a.heap_len<2;)e=a.heap[++a.heap_len]=j<2?++j:0,f[2*e]=1,a.depth[e]=0,a.opt_len--,h&&(a.static_len-=g[2*e+1]);for(b.max_code=j,c=a.heap_len>>1;c>=1;c--)t(a,f,c);e=i;do c=a.heap[1],a.heap[1]=a.heap[a.heap_len--],t(a,f,1),d=a.heap[1],a.heap[--a.heap_max]=c,a.heap[--a.heap_max]=d,f[2*e]=f[2*c]+f[2*d],a.depth[e]=(a.depth[c]>=a.depth[d]?a.depth[c]:a.depth[d])+1,f[2*c+1]=f[2*d+1]=e,a.heap[1]=e++,t(a,f,1);while(a.heap_len>=2);a.heap[--a.heap_max]=a.heap[1],m(a,b),n(f,j,a.bl_count)}function w(a,b,c){var d,e,f=-1,g=b[1],h=0,i=7,j=4;for(0===g&&(i=138,j=3),b[2*(c+1)+1]=65535,d=0;d<=c;d++)e=g,g=b[2*(d+1)+1],++h<i&&e===g||(h<j?a.bl_tree[2*e]+=h:0!==e?(e!==f&&a.bl_tree[2*e]++,a.bl_tree[2*$]++):h<=10?a.bl_tree[2*_]++:a.bl_tree[2*aa]++,h=0,f=e,0===g?(i=138,j=3):e===g?(i=6,j=3):(i=7,j=4))}function x(a,b,c){var d,e,f=-1,g=b[1],h=0,k=7,l=4;for(0===g&&(k=138,l=3),d=0;d<=c;d++)if(e=g,g=b[2*(d+1)+1],!(++h<k&&e===g)){if(h<l){do j(a,e,a.bl_tree);while(0!==--h)}else 0!==e?(e!==f&&(j(a,e,a.bl_tree),h--),j(a,$,a.bl_tree),i(a,h-3,2)):h<=10?(j(a,_,a.bl_tree),i(a,h-3,3)):(j(a,aa,a.bl_tree),i(a,h-11,7));h=0,f=e,0===g?(k=138,l=3):e===g?(k=6,l=3):(k=7,l=4)}}function y(a){var b;for(w(a,a.dyn_ltree,a.l_desc.max_code),w(a,a.dyn_dtree,a.d_desc.max_code),v(a,a.bl_desc),b=U-1;b>=3&&0===a.bl_tree[2*ea[b]+1];b--);return a.opt_len+=3*(b+1)+5+5+4,b}function z(a,b,c,d){var e;for(i(a,b-257,5),i(a,c-1,5),i(a,d-4,4),e=0;e<d;e++)i(a,a.bl_tree[2*ea[e]+1],3);x(a,a.dyn_ltree,b-1),x(a,a.dyn_dtree,c-1)}function A(a){var b,c=4093624447;for(b=0;b<=31;b++,c>>>=1)if(1&c&&0!==a.dyn_ltree[2*b])return I;if(0!==a.dyn_ltree[18]||0!==a.dyn_ltree[20]||0!==a.dyn_ltree[26])return J;for(b=32;b<R;b++)if(0!==a.dyn_ltree[2*b])return J;return I}function B(a){pa||(o(),pa=!0),a.l_desc=new f(a.dyn_ltree,ma),a.d_desc=new f(a.dyn_dtree,na),a.bl_desc=new f(a.bl_tree,oa),a.bi_buf=0,a.bi_valid=0,p(a)}function C(a,b,c,d){i(a,(L<<1)+(d?1:0),3),r(a,b,c,!0)}function D(a){i(a,M<<1,3),j(a,Z,ga),l(a)}function E(a,b,c,d){var e,f,g=0;a.level>0?(a.strm.data_type===K&&(a.strm.data_type=A(a)),v(a,a.l_desc),v(a,a.d_desc),g=y(a),e=a.opt_len+3+7>>>3,f=a.static_len+3+7>>>3,f<=e&&(e=f)):e=f=c+5,c+4<=e&&b!==-1?C(a,b,c,d):a.strategy===H||f===e?(i(a,(M<<1)+(d?1:0),3),u(a,ga,ha)):(i(a,(N<<1)+(d?1:0),3),z(a,a.l_desc.max_code+1,a.d_desc.max_code+1,g+1),u(a,a.dyn_ltree,a.dyn_dtree)),p(a),d&&q(a)}function F(a,b,c){return a.pending_buf[a.d_buf+2*a.last_lit]=b>>>8&255,a.pending_buf[a.d_buf+2*a.last_lit+1]=255&b,a.pending_buf[a.l_buf+a.last_lit]=255&c,a.last_lit++,0===b?a.dyn_ltree[2*c]++:(a.matches++,b--,a.dyn_ltree[2*(ja[c]+R+1)]++,a.dyn_dtree[2*g(b)]++),a.last_lit===a.lit_bufsize-1}var G=a("../utils/common"),H=4,I=0,J=1,K=2,L=0,M=1,N=2,O=3,P=258,Q=29,R=256,S=R+1+Q,T=30,U=19,V=2*S+1,W=15,X=16,Y=7,Z=256,$=16,_=17,aa=18,ba=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ca=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],da=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ea=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],fa=512,ga=new Array(2*(S+2));d(ga);var ha=new Array(2*T);d(ha);var ia=new Array(fa);d(ia);var ja=new Array(P-O+1);d(ja);var ka=new Array(Q);d(ka);var la=new Array(T);d(la);var ma,na,oa,pa=!1;c._tr_init=B,c._tr_stored_block=C,c._tr_flush_block=E,c._tr_tally=F,c._tr_align=D},{"../utils/common":62}],74:[function(a,b,c){"use strict";function d(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}b.exports=d},{}]},{},[10])(10)});
define('zip',["SFile","jszip.min","FileSaver.min","Util","MIMETypes","DeferredUtil"],
function (SFile,JSZip,fsv,Util,M,DU) {
    var zip={};
    zip.zip=function (dir,dstZip,options) {
        if (!SFile.is(dstZip)) options=dstZip;
        options=options||{};
        var zip = new JSZip();
        function loop(dst, dir) {
            return dir.each(function (f) {
                if (f.isDir()) {
                    var sf=dst.folder(f.name());
                    return loop(sf, f);
                } else {
                    return f.getContentAsync(function (c) {
                        dst.file(f.name(),c.toArrayBuffer());
                    });
                }
            });
        }
        return loop(zip, dir).then(function () {
            return zip.generateAsync({
                type:"arraybuffer",
                compression:"DEFLATE"
            });
        }).then(function (content) {
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
        var zip=new JSZip();
        return DU.resolve(zip.loadAsync(arrayBuf)).then(function () {
            return DU.each(zip.files,function (key,zipEntry) {
                //var zipEntry=zip.files[i];
                return DU.resolve(zipEntry.async("arraybuffer")).then(function (buf) {
                    var dest=destDir.rel(zipEntry.name);
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
    zip.JSZip=JSZip;
    return zip;
});

define('FS',["FS2","NativeFS","LSFS", "WebFS", "PathUtil","Env","assert","SFile","RootFS","Content","zip","DeferredUtil"],
        function (FSClass,NativeFS,LSFS,WebFS, P,Env,A,SFile,RootFS,Content,zip,DU) {
    var FS={};
    FS.assert=A;
    FS.Content=Content;
    FS.Class=FSClass;
    FS.DeferredUtil=DU;
    FS.Env=Env;
    FS.LSFS=LSFS;
    FS.NativeFS=NativeFS;
    FS.PathUtil=P;
    FS.RootFS=RootFS;
    FS.SFile=SFile;
    FS.WebFS=WebFS;
    FS.zip=zip;
    if (typeof window=="object") window.FS=FS;
    var rootFS;
    var envVar={};
    var env=new Env(envVar);
    DU.external.Promise=zip.JSZip.external.Promise;
    FS.addFSType=FSClass.addFSType;
    FS.availFSTypes=FSClass.availFSTypes;

    FS.setEnv=function (key, value) {
        if (typeof key=="object") {
            for (var k in key) {
                envVar[k]=key[k];
            }
        }else {
            envVar[key]=value;
        }
    };
    FS.getEnv=function (key) {
        if (typeof key=="string") {
            return envVar[key];
        }else {
            return envVar;
        }
    };
    FS.init=function (fs) {
        if (rootFS) return;
        if (!fs) {
            if (typeof process=="object") {
                fs=new NativeFS();
            } else {
                fs=new LSFS(localStorage);
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
	if (window.FS===undefined) window.FS=resMod;
	return resMod;
});
//})(window);

define('WebSite',[], function () {
	var loc=document.location.href;
	var WS=window.WebSite={};
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
	WS.serverTop=location.href.replace(/\?.*$/,"").replace(/[^/]*$/,"");//"."; // includes /
	WS.phpTop=WS.serverTop+"";//php/";
	WS.url={
			getDirInfo:WS.phpTop+"getDirInfo.php",
			getFiles:WS.phpTop+"getFiles.php",
			putFiles:WS.phpTop+"putFiles.php"
	};
	WS.controller=WS.serverTop+"a.php";
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
			"images/ecl.png":WS.runtime+"images/ecl.png"
	};
	WebSite.compiledKernel=WebSite.runtime+"/lib/tonyu/kernel.js";
	/*if (WS.isNW) {
		if (process.env.TONYU_HOME) {
			WS.tonyuHome=process.env.TONYU_HOME.replace(/\\/g,"/");
		} else {
			WS.tonyuHome=process.cwd().replace(/\\/g,"/").replace(/\/$/,"")+"/fs/Tonyu/";
		}
	}*///DELJSL
	WS.tonyuKernel=WS.tonyuHome+"Kernel/";
	return WS;
});

define('FS',["FSLib","WebSite"],
        function (FS,WebSite) {
    FS.setEnv(WebSite);
    return FS;
});
function FileList(elem, options) {
    var _curDir=null;
    var _curFile=null;
    var _mod=false;
    var selbox=elem[0].tagName.toLowerCase()=="select";
    //console.log(elem);
    if (!options) options={};
    var FL={select:select, ls:ls, on:(options.on?options.on:{}), curFile:curFile, curDir: curDir,
    		setModified:setModified, isModified:isModified};
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
    function setModified(m) {
    	if (!_curFile) return;
    	_mod=m;
       	item(_curFile).text(itemText(_curFile.name(),m));
    }
    function isModified() {
    	return _mod;
    }
    function ls(dir) {
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
        tra=tra.sort(function (a,b) {
    		if(a.lastUpdate>b.lastUpdate){
    			return -1;
    		}else if(a.lastUpdate<b.lastUpdate){
    			return 1;
    		}
    		return 0;
        });
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
        return f;
    }
    function curFile() {
        return _curFile;
    }
    function curDir() {
        return _curDir;
    }
    return FL;
};
define("FileList", ["FS"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.FileList;
    };
}(this)));

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
       			if ($vars.validationMessage) {
       				$vars.validationMessage.empty();
       				for (var name in this.errors) {
       					$vars.validationMessage.append(UI("div", this.errors[name].mesg));
       				}
       			}
       			if ($vars.OKButton) {
       				var ok=true;
       				for (var name in this.errors) {
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

define('Log',["FS","WebSite"], function (FS,WebSite) {
    var Log={};
    Log.curFile=function () {
        var d=new Date();
        var y=d.getFullYear();
        var m=d.getMonth()+1;
        var da=d.getDate();
        return FS.get("/var/log/").rel(y+"/").rel(m+"/").rel(y+"-"+m+"-"+da+".log");
    };
    if (!WebSite.logging && !WebSite.isNW) {
        var varlog=FS.get("/var/log/");
        if (varlog.exists()) varlog.removeWithoutTrash();
    }
    Log.append=function (line) {
        if (!WebSite.logging) return;
        if (WebSite.isNW) return;
        var f=Log.curFile();
        //console.log(Log, "append "+f);
        var t=(f.exists()?f.text():"");
        f.text(t+line+"\n");
    };
    function mul(con) {
        return con.replace(/\n/g,"\n|");
    }
    Log.d=function (tag,con) {
        Log.append(new Date()+": ["+tag+"]"+mul(con));
    };
    Log.e=function (tag,con) {
        Log.append(new Date()+": ERROR["+tag+"]"+mul(con));
    };
    return Log;
});
define('showErrorPos',["Log","FS"],function (Log,FS) {//MODJSL
return function showErrorPos(elem, err) {
    var mesg, src, pos;
    if (!err) {
        close();
        return;
    }
    var row,col;
    if (err.isTError) {
        mesg=err.mesg;
        src=err.src;
        pos=err.pos;
        row=err.row+1;
        col=err.col+1;
    } else {
        src={name:function (){return "不明";},text:function () {
            return null;
        }};
        pos=0;
        mesg=err;
    }
    function close(){
        elem.empty();
    }
    if(typeof pos=="object") {row=pos.row; col=pos.col;}
    close();
    var mesgd=$("<div>").text(mesg+" 場所："+src.name()+(typeof row=="number"?":"+row+":"+col:""));
    //mesgd.append($("<button>").text("閉じる").click(close));
    elem.append(mesgd);
    elem.append($("<div>").attr("class","quickFix"));
    console.log("src=",src);
    var str=src.text();
    if (str && typeof pos=="object") {
        var npos=0;
        var lines=str.split(/\n/);
        for (var i=0 ; i<lines.length && i+1<pos.row ; i++) {
            npos+=lines[i].length;
        }
        npos+=pos.col;
        pos=npos;
    }
    var srcd=$("<pre>");
    srcd.append($("<span>").text(str.substring(0,pos)));
    srcd.append($("<img>").attr("src",FS.expandPath("${sampleImg}/ecl.png")));//MODJSL
    srcd.append($("<span>").text(str.substring(pos)));
    elem.append(srcd);
    //elem.attr("title",mesg+" 場所："+src.name());
    elem.attr("title","エラー");
    var diag=elem.dialog({width:600,height:400});
    Log.d("error", mesg+"\nat "+src+":"+err.pos+"\n"+str.substring(0,err.pos)+"!!HERE!!"+str.substring(err.pos));
    return diag;
};
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
if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('IndentBuffer',["assert","source-map"],function (A, S) {
var Pos2RC=function (src) {
	var $={};
	var map=[];
	var pos=0;
	var lastRow=0;
	src.split("\n").forEach(function (line) {
		map.push(pos);
		pos+=line.length+1;
	});
	map.push(pos);
	$.getRC=function (pos) {
		while(true) {
			if (lastRow<0) {
				return {row:1, col:1};
			}
			if (lastRow+1>=map.length) {
				return {row:map.length, col:1};
			}
			//A(!( pos<map[lastRow]  &&  map[lastRow]<=pos ));
			//A(!( map[lastRow+1]<=pos  &&  pos<map[lastRow+1] ));
			if (pos<map[lastRow]) {
				lastRow--;
			} else if (map[lastRow+1]<=pos) {
				lastRow++;
			} else {
				return {row:lastRow+1, col:pos-map[lastRow]+1};
			}
		}
	};
	return $;
};
return IndentBuffer=function (options) {
	options=options||{};
	var $=function () {
		var args=arguments;
		var fmt=args[0];
		//console.log(fmt+ " -- "+arguments[0]+" --- "+arguments.length);
		var ai=0;
		function shiftArg(nullable) {
			ai++;
			var res=args[ai];
			if (res==null && !nullable) {
				console.log(args);
				throw new Error(ai+"th null param: fmt="+fmt);
			}
			return res;
		}
		function nc(val, msg) {
			if(val==null) throw msg;
			return val;
		}
		while (true) {
			var i=fmt.indexOf("%");
			if (i<0) {$.print(fmt); break;}
			$.print(fmt.substring(0,i));
			i++;
			var fstr=fmt.charAt(i);
			if (fstr=="s") {
				var str=shiftArg();
				if (typeof str == "string" || typeof str =="number") {}
				else if (str==null) str="null";
				else if (str.text) {
					$.addMapping(str);
					str=str.text;
				}
				$.print(str);
				i++;
			} else if (fstr=="d") {
				var n=shiftArg();
				if (typeof n!="number") throw new Error (n+" is not a number: fmt="+fmt);
				$.print(n);
				i++;
			} else if (fstr=="n") {
				$.ln();
				i++;
			} else if (fstr=="{") {
				$.indent();
				i++;
			} else if (fstr=="}") {
				$.dedent();
				i++;
			} else if (fstr=="%") {
				$.print("%");
				i++;
			} else if (fstr=="f") {
				shiftArg()($);
				i++;
			} else if (fstr=="l") {
				var lit=shiftArg();
				$.print($.toLiteral(lit));
				i++;
			} else if (fstr=="v") {
				var a=shiftArg();
				if (!a) throw new Error ("Null %v");
				if (typeof a!="object") throw new Error("nonobject %v:"+a);
				$.addMapping(a);
				$.visitor.visit(a);
				i++;
			} else if (fstr=="z") {
				var place=shiftArg();
				if ("val" in place) {
					$.print(place.val);
					return;
				}
				if (!place.inited) {
					$.lazy(place);
				}
				place.print();
				//$.print(place.gen);
				i++;
			} else if (fstr=="j") {
				var sp_node=shiftArg();
				var sp=sp_node[0];
				var node=sp_node[1];
				var sep=false;
				if (!node || !node.forEach) {
					console.log(node);
					throw new Error (node+" is not array. cannot join fmt:"+fmt);
				}
				node.forEach(function (n) {
					if (sep) $.printf(sp);
					sep=true;
					$.visitor.visit(n);
				});
				i++;
			} else if (fstr=="D"){
				shiftArg(true);
				i++;
			} else {
				i+=2;
			}
			fmt=fmt.substring(i);
		}
	};
	$.addMapping=function (token) {
		//console.log("Token",token,$.srcFile+"");
		if (!$.srcFile) return ;
		// token:extend({text:String},{pos:Number}|{row:Number,col:Number})
		var rc;
		if (typeof token.row=="number" && typeof token.col=="number") {
			rc={row:token.row, col:token.col};
		} else if (typeof token.pos=="number") {
			rc=$.srcRCM.getRC(token.pos);
		}
		if (rc) {
			//console.log("Map",{src:{file:$.srcFile+"",row:rc.row,col:rc.col},
			//dst:{row:$.bufRow,col:$.bufCol}  });
			$.srcmap.addMapping({
				generated: {
					line: $.bufRow,
					column: $.bufCol
				},
				source: $.srcFile+"",
				original: {
					line: rc.row,
					column: rc.col
				}
				//name: "christopher"
			});
		}
	};
	$.setSrcFile=function (f) {
		$.srcFile=f;
		$.srcRCM=Pos2RC(f.text());
		$.srcmap.setSourceContent(f.path(),f.text());
	};
	$.print=function (v) {
		$.buf+=v;
		var a=(v+"").split("\n");
		a.forEach(function (line,i) {
			if (i<a.length-1) {// has \n
				$.bufCol+=line.length+1;
				$.bufRow++;
				$.bufCol=1;
			} else {
				$.bufCol+=line.length;
			}
		});
	};
	$.dstFile=options.dstFile;
	$.mapFile=options.mapFile;
	$.printf=$;
	$.buf="";
	$.bufRow=1;
	$.bufCol=1;
	$.srcmap=new S.SourceMapGenerator();
	$.lazy=function (place) {
		if (!place) place={};
		if (options.fixLazyLength) {
			place.length=place.length||options.fixLazyLength;
			place.pad=place.pad||" ";
			place.gen=(function () {
				var r="";
				for(var i=0;i<place.length;i++) r+=place.pad;
				return r;
			})();
			place.puts=[];
			$.useLengthPlace=true;
		} else {
			//cannot use with sourcemap
			place.gen=("GENERETID"+Math.random()+"DITERENEG").replace(/\W/g,"");
			place.reg=new RegExp(place.gen,"g");
			A(!$.useLengthPlace,"GENERETID cannot be used");
		}
		place.inited=true;
		//place.src=place.gen;
		place.put=function (val) {
			this.val=val+"";
			if (this.puts) {
				if (this.val.length>this.length) {
					$.lazyOverflow=true;
				}
				while (this.val.length<this.length) {
					this.val+=this.pad;
				}
				var place=this;
				this.puts.forEach(function (i) {
					var pl=$.buf.length;
					$.buf=$.buf.substring(0,i)+place.val+$.buf.substring(i+place.length);
					A.eq(pl,$.buf.length);
				});
			}
			if (this.reg) {
				$.buf=$.buf.replace(this.reg, val);
			}
			return this.val;
		};
		place.print=function () {
			if (this.puts) this.puts.push($.buf.length);
			$.print(this.gen);
		};
		return place;
		//return {put: function () {} };
	};
	$.ln=function () {
		$.print("\n"+$.indentBuf);
	};
	$.indent=function () {
		$.indentBuf+=$.indentStr;
		$.print("\n"+$.indentBuf);
	};
	$.dedent = function () {
		var len=$.indentStr.length;
		if (!$.buf.substring($.buf.length-len).match(/^\s*$/)) {
			console.log($.buf);
			throw new Error ("Non-space truncated ");
		}
		$.buf=$.buf.substring(0,$.buf.length-len);
		$.indentBuf=$.indentBuf.substring(0 , $.indentBuf.length-len);
	};
	$.toLiteral= function (s, quote) {
		if (!quote) quote="'";
	if (typeof s!=="string") {
		console.log("no literal ",s);
		throw new Error("toLiteral:"+s+" is not a literal");
	}
		s = s.replace(/\\/g, "\\\\");
		s = s.replace(/\r/g, "\\r");
		s = s.replace(/\n/g, "\\n");
		if (quote=="'") s = s.replace(/'/g, "\\'");
		else s = s.replace(/"/g, '\\"');
		return quote + s + quote;
	};
	$.indentBuf="";
	$.indentStr="  ";
	$.close=function () {
		$.mapStr=$.srcmap.toString();
		if ($.mapFile && $.dstFile) {
			$.mapFile.text($.mapStr);
			$.printf("%n//# sourceMappingURL=%s%n",$.mapFile.relPath($.dstFile.up()));
		}
		if ($.dstFile) {
			$.dstFile.text($.buf);
		}
		return $.buf;
	};
	return $;
};
});

if (typeof define!=="function") {
   define=require("requirejs").define;
}
define('disp',["IndentBuffer"], function(IndentBuffer) {
// オブジェクトの内容を表示する． デバッグ用
return disp=function (a) {
	var p=IndentBuffer();
	function disp2(a) {
		if (a==null) return p("null%n");
		if (typeof a == "string" )
			return p("'%s'%n",a);
		if (typeof a =="number")
			return p("%s%n",a);
		if (typeof a=="function") return p("func%n");
		if (a instanceof Array) p("[%{");
		else p("{%{");
		var c = "";
		for (var i in a) {
			p(c + i+":");
			disp2(a[i]);
		}
		if (a instanceof Array) p("%}]%n");
		else  p("%}}%n");
	}
	disp2(a);
	return p.buf;
};
});
if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('Parser',["disp"],function(disp) {
return Parser=function () {
	function extend(dst, src) {
		var i;
		for(i in src){
			dst[i]=src[i];
		}
		return dst;
	}
	var $={
		consoleBuffer:"",
		options: {traceTap:false, optimizeFirst: true, profile: false ,
		verboseFirst: false,traceFirstTbl:false},
		Parser: Parser,
		StringParser: StringParser,
		nc: nc
	};
	$.dispTbl=function (tbl) {
		var buf="";
		var h={};
		if (!tbl) return buf;
		for (var i in tbl) {// tbl:{char:Parser}   i:char
			var n=tbl[i].name;
			if (!h[n]) h[n]="";
			h[n]+=i;
		}
		for (var n in h) {
			buf+=h[n]+"->"+n+",";
		}
		return buf;
	}
	//var console={log:function (s) { $.consoleBuffer+=s; }};
	function _debug(s) {console.log(s);}
	function Parser(parseFunc){
		if ($.options.traceTap) {
			this.parse=function(s){
				console.log("tap: name="+this.name+"  pos="+(s?s.pos:"?"));
				var r=parseFunc.apply(this,[s]);
				var img="NOIMG";
				if (r.src && r.src.str) {
					img=r.src.str.substring(r.pos-3,r.pos)+"^"+r.src.str.substring(r.pos,r.pos+3);
				}
				if (r.src && r.src.tokens) {
					img=r.src.tokens[r.pos-1]+"["+r.src.tokens[r.pos]+"]"+r.src.tokens[r.pos+1];
				}

				console.log("/tap: name="+this.name+
						" pos="+(s?s.pos:"?")+"->"+(r?r.pos:"?")+" "+img+" res="+(r?r.success:"?"));
				return r;
			};
		} else {
			this.parse=parseFunc;
		}
	};
	Parser.create=function(parseFunc) { // (State->State)->Parser
		return new Parser(parseFunc);
	};
	$.create=Parser.create;
	function nc(v,name) {
		if (v==null) throw name+" is null!";
		return v;
	}
	extend(Parser.prototype, {// class Parser
		// Parser.parse:: State->State
		except: function (f) {
			var t=this;
			return this.ret(Parser.create(function (res) {
				//var res=t.parse(s);
				//if (!res.success) return res;
				if (f.apply({}, res.result)) {
					res.success=false;
				}
				return res;
			}).setName("(except "+t.name+")"));
		},
		noFollow: function (p) {
			var t=this;
			nc(p,"p");
			return this.ret(Parser.create(function (res) {
				//var res=t.parse(s);
				//if (!res.success) return res;
				var res2=p.parse(res);
				res.success=!res2.success;
				return res;
			}).setName("("+t.name+" noFollow "+p.name+")"));
		},
		andNoUnify: function(next) {// Parser.and:: (Function|Parser)  -> Parser
			nc(next,"next"); // next==next
			var t=this; // Parser
			var res=Parser.create(function(s){ //s:State
				var r1=t.parse(s); // r1:State
				if (!r1.success) return r1;
				var r2=next.parse(r1); //r2:State
				if (r2.success) {
					r2.result=r1.result.concat(r2.result); // concat===append built in func in Array
				}
				return r2;
			});
			return res.setName("("+this.name+" "+next.name+")");
		},
		and: function(next) {// Parser.and:: Parser  -> Parser
			var res=this.andNoUnify(next);
			//if (!$.options.optimizeFirst) return res;
			if (!this._first) return res;
			var tbl=this._first.tbl;
			var ntbl={};
			//  tbl           ALL:a1  b:b1     c:c1
			//  next.tbl      ALL:a2           c:c2     d:d2
			//           ALL:a1>>next   b:b1>>next c:c1>>next
			for (var c in tbl) {
				ntbl[c]=tbl[c].andNoUnify(next);
			}
			res=Parser.fromFirst(this._first.space, ntbl);
			res.setName("("+this.name+" >> "+next.name+")");
			if ($.options.verboseFirst) {
				console.log("Created aunify name=" +res.name+" tbl="+$.dispTbl(ntbl));
			}
			return res;
		},
		retNoUnify: function (f) {
			var t=this;
			var p;
			if (typeof f=="function") {
				p=Parser.create(function (r1) {
					var r2=r1.clone();
					r2.result=[ f.apply({}, r1.result) ];
					return r2;
				}).setName("retfunc");
			} else p=f;
			var res=Parser.create(function(s){ //s:State
				var r1=t.parse(s); // r1:State
				if (!r1.success) return r1;
				return p.parse(r1);
				/*var r2=r1.clone();
				r2.result=[ f.apply({}, r1.result) ];
				return r2;*/
			}).setName("("+this.name+" >= "+p.name+")");
			return res;
		},
		ret: function(next) {// Parser.ret:: (Function|Parser)  -> Parser
			if (!this._first) return this.retNoUnify(next);
			var tbl=this._first.tbl;
			var ntbl={};
			for (var c in tbl) {
				ntbl[c]=tbl[c].retNoUnify(next);
			}
			res=Parser.fromFirst(this._first.space, ntbl);
			res.setName("("+this.name+" >>= "+next.name+")");
			if ($.options.verboseFirst) {
				console.log("Created runify name=" +res.name+" tbl="+$.dispTbl(ntbl));
			}
			return res;
		},

		/*
		this._first={space: space, chars:String};
		this._first={space: space, tbl:{char:Parser}};
	*/
		first: function (space, ct) {
			if (!$.options.optimizeFirst) return this;
			if (space==null) throw "Space is null2!";
			if (typeof ct=="string") {
					var tbl={};
					for (var i=0; i<ct.length ; i++) {
						tbl[ct.substring(i,i+1)]=this;
					}
				//this._first={space: space, tbl:tbl};
				return Parser.fromFirst(space,tbl).setName("(fst "+this.name+")");
//        		this._first={space: space, chars:ct};
			} else if (ct==null) {
				return Parser.fromFirst(space,{ALL:this}).setName("(fst "+this.name+")");
				//this._first={space:space, tbl:{ALL:this}};
			} else if (typeof ct=="object") {
				throw "this._first={space: space, tbl:ct}";
			}
			return this;
		},
		firstTokens: function (tokens) {
			if (!$.options.optimizeFirst) return this;
			if (typeof tokens=="string") tokens=[tokens];
			var tbl={};
				if (tokens) {
					var t=this;
					tokens.forEach(function (token) {
					tbl[token]=t;
				});
			} else {
				tbl.ALL=this;
			}
			return Parser.fromFirstTokens(tbl).setName("(fstT "+this.name+")");
		},
		unifyFirst: function (other) {
			var thiz=this;
			function or(a,b) {
				if (!a) return b;
				if (!b) return a;
				return a.orNoUnify(b).checkTbl();
			}
			var tbl={}; // tbl.* includes tbl.ALL
			this.checkTbl();
			other.checkTbl();
			function mergeTbl() {
			//   {except_ALL: contains_ALL}
				var t2=other._first.tbl;
				//before tbl={ALL:a1, b:b1, c:c1}   t2={ALL:a2,c:c2,d:d2}
				//       b1 conts a1  c1 conts a1     c2 conts a2   d2 conts a2
				//after  tbl={ALL:a1|a2 , b:b1|a2    c:c1|c2    d:a1|d2 }
				var keys={};
				for (var k in tbl) { /*if (d) console.log("tbl.k="+k);*/ keys[k]=1;}
				for (var k in t2)  { /*if (d) console.log("t2.k="+k);*/ keys[k]=1;}
				delete keys.ALL;
				if (tbl.ALL || t2.ALL) {
					tbl.ALL=or(tbl.ALL, t2.ALL);
				}
				for (var k in keys ) {
					//if (d) console.log("k="+k);
					//if (tbl[k] && !tbl[k].parse) throw "tbl["+k+"] = "+tbl[k];
					//if (t2[k] && !t2[k].parse) throw "t2["+k+"] = "+tbl[k];
					if (tbl[k] && t2[k]) {
						tbl[k]=or(tbl[k],t2[k]);
					} else if (tbl[k] && !t2[k]) {
						tbl[k]=or(tbl[k],t2.ALL);
					} else if (!tbl[k] && t2[k]) {
						tbl[k]=or(tbl.ALL, t2[k]);
					}
				}
			}
			extend(tbl, this._first.tbl);
			mergeTbl();
			var res=Parser.fromFirst(this._first.space, tbl).setName("("+this.name+")U("+other.name+")");
			if ($.options.verboseFirst) console.log("Created unify name=" +res.name+" tbl="+$.dispTbl(tbl));
			return res;
		},
		or: function(other) { // Parser->Parser
			nc(other,"other");
				if (this._first && other._first &&
						this._first.space && this._first.space===other._first.space) {
				return this.unifyFirst(other);
				} else {
					if ($.options.verboseFirst) {
						console.log("Cannot unify"+this.name+" || "+other.name+" "+this._first+" - "+other._first);
					}
					return this.orNoUnify(other);
				}
		},
		orNoUnify: function (other) {
				var t=this;  // t:Parser
			var res=Parser.create(function(s){
				var r1=t.parse(s); // r1:State
				if (!r1.success){
					var r2=other.parse(s); // r2:State
					return r2;
				} else {
					return r1;
				}
			});
			res.name="("+this.name+")|("+other.name+")";
			return res;
		},
		setName: function (n) {
			this.name=n;
			if (this._first) {
				/*var tbl=this._first.tbl;
				for (var i in tbl) {
					tbl[i].setName("(elm "+i+" of "+n+")");
				}*/
			}
			return this;
		},
		profile: function (name) {
			if ($.options.profile) {
				this.parse=this.parse.profile(name || this.name);
			}
			return this;
		},
		repN: function(min){
			var p=this;
			if (!min) min=0;
			var res=Parser.create(function(s) {
				var current=s;
				var result=[];
				while(true){
					var next=p.parse(current);
					if(!next.success) {
						var res;
						if (result.length>=min) {
							res=current.clone();
							res.result=[result];
							res.success=true;
							//console.log("rep0 res="+disp(res.result));
							return res;
						} else {
							res=s.clone();
							res.success=false;
							return res;
						}
					} else {
						result.push(next.result[0]);
						current=next;
					}
				}
			});
			//if (min>0) res._first=p._first;
			return res.setName("("+p.name+" * "+min+")");
		},
		rep0: function () { return this.repN(0); },
		rep1: function () { return this.repN(1); },
		opt: function () {
			var t=this;
			return Parser.create(function (s) {
				var r=t.parse(s);
				if (r.success) {
					return r;
				} else {
					s=s.clone();
					s.success=true;
					s.result=[null];
					return s;
				}
			}).setName("("+t.name+")?");
		},
		sep1: function(sep, valuesToArray) {
			var value=this;
			nc(value,"value");nc(sep,"sep");
			var tail=sep.and(value).ret(function(r1, r2) {
				if(valuesToArray) return r2;
				return {sep:r1, value:r2};
			});
			return value.and(tail.rep0()).ret(function(r1, r2){
				var i;
				if (valuesToArray) {
					var r=[r1];
						for (i in r2) {
							r.push(r2[i]);
						}
					return r;
				} else {
					return {head:r1,tails:r2};
				}
			}).setName("(sep1 "+value.name+"~~"+sep.name+")");
		},
		sep0: function(s){
			return this.sep1(s,true).opt().ret(function (r) {
				if (!r) return [];
				return r;
			});
		},
		tap: function (msg) {
			return this;
			if (!$.options.traceTap) return this;
			if (!msg) msg="";
			var t=this;
			var res=Parser.create(function(s){
				console.log("tap:"+msg+" name:"+t.name+"  pos="+(s?s.pos:"?"));
				var r=t.parse(s);
				var img=r.src.str.substring(r.pos-3,r.pos)+"^"+r.src.str.substring(r.pos,r.pos+3);
				console.log("/tap:"+msg+" name:"+t.name+" pos="+(s?s.pos:"?")+"->"+(r?r.pos:"?")+" "+img+" res="+(r?r.success:"?"));
				return r;
			});
			/*if (this._first) {
				var ntbl={},tbl=this._first.tbl;
				for (var c in tbl) {
					ntbl=tbl[c].
				}
			}*/
			return res.setName("(Tap "+t.name+")");
		},
		retN: function (i) {
			return this.ret(function () {
				return arguments[i];
			})
		},
		parseStr: function (str,global) {
			var st=new State(str,global);
			return this.parse(st);
		},
		checkTbl: function () {
			if (!this._first) return this;
			var tbl=this._first.tbl;
			for (var k in tbl) {
				if (!tbl[k].parse) throw this.name+": tbl."+k+" is not a parser :"+tbl[k];
			}
			return this;
		}
	});
	function State(strOrTokens, global) { // class State
		if (strOrTokens!=null) {
			this.src={maxPos:0, global:global};// maxPos is shared by all state
			if (typeof strOrTokens=="string") {
				this.src.str=strOrTokens;
			}
			if (strOrTokens instanceof Array) {
				this.src.tokens=strOrTokens;
			}
			this.pos=0;
			this.result=[]
			this.success=true;
		}
	};
	extend(State.prototype, {
		clone: function() {
			var s=new State();
			s.src=this.src;
			s.pos=this.pos;
			s.result=this.result.slice();
			s.success=this.success;
			return s;
		},
		updateMaxPos:function (npos) {
			if (npos > this.src.maxPos) {
				this.src.maxPos=npos;
			}
		},
		isSuccess: function () {
			return this.success;
		},
		getGlobal: function () {
				if (!this.src.global) this.src.global={};
				return this.src.global;
		}
	});
	Parser.fromFirst=function (space, tbl) {
		if (space=="TOKEN") {
			return Parser.fromFirstTokens(tbl);
		}
		var res=Parser.create(function (s0) {
			var s=space.parse(s0);
			var f=s.src.str.substring(s.pos,s.pos+1);
			if ($.options.traceFirstTbl) {
				console.log(this.name+": first="+f+" tbl="+( tbl[f]?tbl[f].name:"-") );
			}
			if (tbl[f]) {
				return tbl[f].parse(s);
			}
			if (tbl.ALL) return tbl.ALL.parse(s);
			s.success=false;
			return s;
		});
		res._first={space:space,tbl:tbl};
		res.checkTbl();
		return res;
	};
	Parser.fromFirstTokens=function (tbl) {
		var res=Parser.create(function (s) {
			var t=s.src.tokens[s.pos];
			var f=t?t.type:null;
			if ($.options.traceFirstTbl) {
				console.log(this.name+": firstT="+f+" tbl="+( tbl[f]?tbl[f].name:"-") );
			}
			if (f!=null && tbl[f]) {
				return tbl[f].parse(s);
			}
			if (tbl.ALL) return tbl.ALL.parse(s);
			s.success=false;
			return s;
		});
		res._first={space:"TOKEN",tbl:tbl};
		res.checkTbl();
		return res;
	};

	var StringParser={
		empty: Parser.create(function(state) {
			var res=state.clone();
			res.success=true;
			res.result=[null]; //{length:0, isEmpty:true}];
			return res;
		}).setName("E"),
		fail: Parser.create(function(s){
			s.success=false;
			return s;
		}).setName("F"),
		str: function (st) { // st:String
			return this.strLike(function (str,pos) {
				if (str.substring(pos, pos+st.length)===st) return {len:st.length};
				return null;
			}).setName(st);
		},
		reg: function (r) {//r: regex (must have ^ at the head)
			if (!(r+"").match(/^\/\^/)) console.log("Waring regex should have ^ at the head:"+(r+""));
			return this.strLike(function (str,pos) {
				var res=r.exec( str.substring(pos) );
				if (res) {
					res.len=res[0].length;
					return res;
				}
				return null;
			}).setName(r+"");
		},
		strLike: function (func) {
			// func :: str,pos, state? -> {len:int, other...}  (null for no match )
			return Parser.create(function(state){
				var str= state.src.str;
				if (str==null) throw "strLike: str is null!";
				var spos=state.pos;
				//console.log(" strlike: "+str+" pos:"+spos);
				var r1=func(str, spos, state);
				if ($.options.traceToken) console.log("pos="+spos+" r="+r1);
				if(r1) {
					if ($.options.traceToken) console.log("str:succ");
					r1.pos=spos;
					r1.src=state.src; // insert 2013/05/01
					var ns=state.clone();
					extend(ns, {pos:spos+r1.len, success:true, result:[r1]});
					state.updateMaxPos(ns.pos);
					return ns;
				}else{
					if ($.options.traceToken) console.log("str:fail");
					state.success=false;
					return state;
				}
			}).setName("STRLIKE");
		},
		parse: function (parser, str,global) {
			var st=new State(str,global);
			return parser.parse(st);
		}
	};
	//  why not eof: ? because StringParser.strLike
	StringParser.eof=StringParser.strLike(function (str,pos) {
		if (pos==str.length) return {len:0};
		return null;
	}).setName("EOF");
	$.StringParser=StringParser;
	var TokensParser={
		token: function (type) {
			return Parser.create(function (s) {
				var t=s.src.tokens[s.pos];
				s.success=false;
				if (!t) return s;
				if (t.type==type) {
					s=s.clone();
					s.updateMaxPos(s.pos);
				s.pos++;
					s.success=true;
					s.result=[t];
				}
				return s;
			}).setName(type).firstTokens(type);
		},
		parse:function (parser, tokens, global) {
			var st=new State(tokens,global);
			return parser.parse(st);
		},
		eof: Parser.create(function (s) {
			var suc=(s.pos>=s.src.tokens.length);
			s.success=suc;
			if (suc) {
				s=s.clone();
				s.result=[{type:"EOF"}];
			}
			return s;
		}).setName("EOT")
	};
	$.TokensParser=TokensParser;
	$.lazy=function (pf) { //   ( ()->Parser ) ->Parser
		var p=null;
		return Parser.create(function (st) {
			if (!p) p=pf();
			if (!p) throw pf+" returned null!";
			this.name=pf.name;
			return p.parse(st);
		}).setName("LZ");
	};
	$.addRange=function(res, newr) {
		if (newr==null) return res;
		if (typeof (res.pos)!="number") {
			res.pos=newr.pos;
			res.len=newr.len;
			return res;
		}
		var newEnd=newr.pos+newr.len;
		var curEnd=res.pos+res.len;
		if (newr.pos<res.pos) res.pos=newr.pos;
		if (newEnd>curEnd) res.len= newEnd-res.pos;
		return res;
	};
	$.setRange=function (res) {
		if (res==null || typeof res=="string" || typeof res=="number" || typeof res=="boolean") return;
		var exRange=$.getRange(res);
		if (exRange!=null) return res;
		for (var i in res) {
			if (!res.hasOwnProperty(i)) continue;
			var range=$.setRange(res[i]);
			$.addRange(res,range);
		}
		return res;
	};

	$.getRange=function(e) {
		if (e==null) return null;
		if (typeof e.pos!="number") return null;
		if (typeof e.len=="number") return e;
		return null;
	};
	return $;
}();

});
if (typeof define!=="function") {
	define=require("requirejs").define;
}

define('Grammar',["Parser"], function (Parser) {
Grammar=function () {
	var p=Parser;

	var $=null;
	function trans(name) {
		if (typeof name=="string") return $.get(name);
		return name;
	}
	function tap(name) {
		return p.Parser.create(function (st) {
			console.log("Parsing "+name+" at "+st.pos+"  "+st.src.str.substring(st.pos, st.pos+20).replace(/[\r\n]/g,"\\n"));
			return st;
		});
	}
	$=function (name){
		var $$={};
		$$.ands=function() {
			var p=trans(arguments[0]);  //  ;
			for (var i=1 ; i<arguments.length ;i++) {
				p=p.and( trans(arguments[i]) );
			}
			p=p.tap(name);
			$.defs[name]=p;
			var $$$={};
			$$$.autoNode=function () {
				var res=p.ret(function () {
					var res={type:name};
					for (var i=0 ; i<arguments.length ;i++) {
						var e=arguments[i];
						var rg=Parser.setRange(e);
						Parser.addRange(res, rg);
						res["-element"+i]=e;
					}
					res.toString=function () {
						return "("+this.type+")";
					};
				}).setName(name);
				return $.defs[name]=res;
			};
			$$$.ret=function (f) {
				if (arguments.length==0) return p;
				if (typeof f=="function") {
					return $.defs[name]=p.ret(f);
				}
				var names=[];
				var fn=function(e){return e;};
				for (var i=0 ; i<arguments.length ;i++) {
					if (typeof arguments[i]=="function") {
						fn=arguments[i];
						break;
					}
					names[i]=arguments[i];
				}
				var res=p.ret(function () {
					var res={type:name};
					res[Grammar.SUBELEMENTS]=[];
					for (var i=0 ; i<arguments.length ;i++) {
						var e=arguments[i];
						var rg=Parser.setRange(e);
						Parser.addRange(res, rg);
						if (names[i]) {
							res[names[i]]=e;
						}
						res[Grammar.SUBELEMENTS].push(e);
					}
					res.toString=function () {
						return "("+this.type+")";
					};
					return fn(res);
				}).setName(name);
				return  $.defs[name]=res;
			};
			return $$$;
		};
		$$.ors= function () {
			var p=trans(arguments[0]);
			for (var i=1 ; i<arguments.length ;i++) {
				p=p.or( trans(arguments[i]) );
			}
			return $.defs[name]=p.setName(name);
		};
		return $$;
	};

	$.defs={};
	$.get=function (name) {
		if ($.defs[name]) return $.defs[name];
		return p.lazy(function () {
			var r=$.defs[name];
			if (!r) throw "grammar named '"+name +"' is undefined";
			return r;
		}).setName("(Lazy of "+name+")");
	};
	return $;
};
Grammar.SUBELEMENTS="[SUBELEMENTS]";
return Grammar;
});
// var b=XMLBuffer(src);
// b(node);
// console.log(b.buf);
if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('XMLBuffer',["Parser"],
function(Parser) {
XMLBuffer=function (src) {
	var $;
	$=function (node, attrName){
		//console.log("genX: "+node+ " typeof = "+typeof node+"  pos="+node.pos+" attrName="+attrName+" ary?="+(node instanceof Array));
		if (node==null || typeof node=="string" || typeof node=="number") return;
		var r=Parser.getRange(node);
		if (r) {
			while ($.srcLen < r.pos) {
				$.src(src.substring($.srcLen, r.pos));
			}
		}
		if (node==null) return;
		if (attrName) $.startTag("attr_"+attrName+"");
		if (node.type) {
			if (node.isToken) $.startTag("token_"+node.type+"");
			else $.startTag(node.type+"");
		}
		if (node.text) $.src(r.text);
		else {
			var n=$.orderByPos(node);
			n.forEach(function (subnode) {
				if (subnode.name && subnode.name.match(/^-/)) {
					$(subnode.value);
				} else {
					$(subnode.value, subnode.name);
				}
			});
		}
		if (r) {
			while ($.srcLen < r.pos+r.len) {
				$.src(src.substring($.srcLen, r.pos+r.len));
			}
		}
		if (node.type) {
			if (node.isToken) $.endTag("token_"+node.type+"");
			else $.endTag(""+node.type+"");
		}
		if (attrName) $.endTag("attr_"+attrName);
	};
	$.orderByPos=XMLBuffer.orderByPos;
	$.src=function (str) {
		$.buf+=str.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;");
		$.srcLen+=str.length;
	};
	$.tag=function (str) {
		$.buf+=str;
	};
	$.startTag=function (tagName) {
		if (tagName.match(/^[a-zA-Z_0-9]+$/)) {
			$.tag("<"+tagName+">");
		} else {
			$.tag("<token>");
			//$.tag("<operator name=\""+tagName+"\">");
		}
	};
	$.endTag=function (tagName) {
		if (tagName.match(/^[a-zA-Z_0-9]+$/)) {
			$.tag("</"+tagName+">");
		} else {
			$.tag("</token>");
			//$.tag("</operator>");
		}
	};

	$.buf="";
	$.srcLen=0;
	return $;
};
XMLBuffer.orderByPos=function (node) {
	var res=[];
	/*if (node[XMLBuffer.SUBELEMENTS]) {
		//console.log("subele",node);
		node[XMLBuffer.SUBELEMENTS].forEach(function (e,i) {
			if (e) {
				res.push({value:e});
			}
		});
	} else {*/
		for (var i in node) {
			if (!node.hasOwnProperty(i)) continue;
			if (node[i]==null || typeof node[i]=="string" || typeof node[i]=="number") continue;
			if (typeof(node[i].pos)!="number") continue;
			if (isNaN(parseInt(i)) && !(i+"").match(/^-/)) {
				res.push({name: i, value: node[i]}); 
			} else {
				res.push({value: node[i]}); 
			}
		}
	//}
	res=res.sort(function (a,b) {
		return a.value.pos-b.value.pos;
	});
	return res;
};
XMLBuffer.SUBELEMENTS="[SUBELEMENTS]";
return XMLBuffer;
});
if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('TError',[],function () {
TError=function (mesg, src, pos) {
	if (typeof src=="string") {
		return {
			isTError:true,
			mesg:mesg,
			src:{
				name:function () { return src;},
				text:function () { return src;}
			},
			pos:pos,
			toString:function (){
				return this.mesg+" at "+src+":"+this.pos;
			},
			raise: function () {
				throw this;
			}
		};
	}
	var klass=null;
	if (src && src.src) {
		klass=src;
		src=klass.src.tonyu;
	}
	if (typeof src.name!=="function") {
		throw "src="+src+" should be file object";
	}
	var rc;
	if ( (typeof (src.text))=="function") {
		var s=src.text();
		if (typeof s=="string") {
			rc=TError.calcRowCol(s,pos);
		}
	}
	return {
		isTError:true,
		mesg:mesg,src:src,pos:pos,row:rc.row, col:rc.col, klass:klass,
		toString:function (){
			return this.mesg+" at "+this.src.name()+":"+this.row+":"+this.col;
		},
		raise: function () {
			throw this;
		}
	};
};
TError.calcRowCol=function (text,pos) {
	var lines=text.split("\n");
	var pp=0,row,col;
	for (row=0;row<lines.length ; row++) {
		pp+=lines[row].length+1;
		if (pp>pos) {
			col=pos-(pp-lines[row].length);
			break;
		}
	}
	return {row:row,col:col};
};
return TError;
});
/*sys.load("js/parser.js");
sys.load("js/ExpressionParser2Tonyu.js");
sys.load("js/GrammarTonyu.js");
sys.load("js/XMLBuffer.js");
sys.load("js/IndentBuffer.js");
sys.load("js/disp.js");
sys.load("js/profiler.js");
*/
if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('TT',["Grammar", "XMLBuffer", "IndentBuffer","disp", "Parser","TError"],
function (Grammar, XMLBuffer, IndentBuffer, disp, Parser,TError) {
return TT=function () {
	function profileTbl(parser, name) {
		var tbl=parser._first.tbl;
		for (var c in tbl) {
			tbl[c].profile();//(c+" of "+tbl[name);
		}
	}
	var sp=Parser.StringParser;
	var SAMENAME="SAMENAME";
	var DIV=1,REG=2;
	var space=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/.*\r?\n)*)*/).setName("space");
	function tk(r, name) {
		var pat;
		var fst;
		if (typeof r=="string") {
			pat=sp.str(r);
			if (r.length>0) fst=r.substring(0,1);
			if (!name) name=r;
		} else {
			pat=sp.reg(r);
			if (!name) name=r+"";
		}
		var res=space.and(pat).ret(function(a, b) {
			var res={};
			res.pos=b.pos;
			if (typeof res.pos!="number") throw "no pos for "+name+" "+disp(b);
			res.len=b.len;
			res.text=b.src.str.substring(res.pos, res.pos+res.len);
			if (typeof res.text!="string") throw "no text("+res.text+") for "+name+" "+disp(b);
			res.toString=function (){
				return this.text;
			};
			res.isToken=true;
			return res;
		});
		if (fst) res=res.first(space, fst);
		return res.setName(name);//.profile();
	}
	var parsers={},posts={};
	function dtk2(prev, name, parser, post) {
		//console.log("2reg="+prev+" name="+name);
		if (typeof parser=="string") parser=tk(parser);
		parsers[prev]=or(parsers[prev], parser.ret(function (res) {
			res.type=name;
			return res;
		}).setName(name) );
	}
	function dtk(prev, name, parser, post) {
		if(name==SAMENAME) name=parser;
		for (var m=1; m<=prev; m*=2) {
			//prev=1  -> m=1
			//prev=2  -> m=1x,2
			//XXprev=3  -> m=1,2,3
			if ((prev&m)!=0) dtk2(prev&m, name,parser,post);
		}
		posts[name]=post;
	}
	function or(a,b){
		if (!a) return b;
		return a.or(b);
	}

	var all=Parser.create(function (st) {
		var mode=REG;
		var res=[];
		while (true) {
			st=parsers[mode].parse(st);
			if (!st.success) break;
			var e=st.result[0];
			mode=posts[e.type];
			res.push(e);
		}
		st=space.parse(st);
		//console.log(st.src.maxPos+"=="+st.src.str.length)
		st.success=st.src.maxPos==st.src.str.length;
		st.result[0]=res;
		return st;
	});
	/*function exprHead(name, parser) {
		dtk(REG, name, parser, DIV);
	}
	function exprMid(name, parser) {
		dtk(DIV, name, parser, REG);
	}
	function exprTail(name, parser) {
		dtk(DIV, name, parser, DIV);
	}*/
	var reserved={"function":true, "var":true , "return":true, "typeof": true, "if":true,
			"__typeof": true,
			"for":true,
			"else": true,
			"super": true,
			"while":true,
			"continue":true,
			"break":true,
			"do":true,
			"switch":true,
			"case":true,
			"default":true,
			"try": true,
			"catch": true,
			"finally": true,
			"throw": true,
			"of": true,
			"in": true,
			fiber:true,
			"native": true,
			"instanceof":true,
			"new": true,
			"is": true,
			"true": true,
			"false": true,
			"null":true,
			"this":true,
			"undefined": true,
			"usethread": true,
			"constructor": true,
			ifwait:true,
			nowait:true,
			_thread:true,
			arguments:true,
			"delete": true,
			"extends":true,
			"includes":true
	};

	var num=tk(/^[0-9\.]+/).ret(function (n) {
		n.type="number";
		n.value=parseInt(n.text);
		return n;
	}).first(space,"0123456789");
	var literal=tk({exec: function (s) {
		var head=s.substring(0,1);
		if (head!=='"' && head!=="'") return false;
		for (var i=1 ;i<s.length ; i++) {
			var c=s.substring(i,i+1);
			if (c===head) {
				return [s.substring(0,i+1)];
			} else if (c==="\\") {
				i++;
			}
		}
		return false;
	},toString:function(){return"literal";}
	}).first(space,"\"'");
	var regex=tk({exec: function (s) {
		if (s.substring(0,1)!=='/') return false;
		for (var i=1 ;i<s.length ; i++) {
			var c=s.substring(i,i+1);
			if (c==='/') {
				var r=/^[ig]*/.exec( s.substring(i+1) );
				return [s.substring(0,i+1+r[0].length)];
			} else if (c=="\n") {
				return false;
			} else if (c==="\\") {
				i++;
			}
		}
		return false;
	},toString:function(){return"regex";}
	}).first(space,"/");

	dtk(REG|DIV, "number", num,DIV );
	dtk(REG,  "regex" ,regex,DIV );
	dtk(REG|DIV,  "literal" ,literal,DIV );

	dtk(REG|DIV,SAMENAME ,"++",DIV );
	dtk(REG|DIV,SAMENAME ,"--",DIV );

	dtk(REG|DIV,SAMENAME ,"!==",REG );
	dtk(REG|DIV,SAMENAME ,"===",REG );
	dtk(REG|DIV,SAMENAME ,"+=",REG );
	dtk(REG|DIV,SAMENAME ,"-=",REG );
	dtk(REG|DIV,SAMENAME ,"*=",REG );
	dtk(REG|DIV,SAMENAME ,"/=",REG );
	dtk(REG|DIV,SAMENAME ,"%=",REG );
	dtk(REG|DIV,SAMENAME ,">=",REG );
	dtk(REG|DIV,SAMENAME ,"<=",REG );
	dtk(REG|DIV,SAMENAME ,"!=",REG );
	dtk(REG|DIV,SAMENAME ,"==",REG );
	dtk(REG|DIV,SAMENAME ,">>",REG );
	dtk(REG|DIV,SAMENAME ,"<<",REG );

	dtk(REG|DIV,SAMENAME ,"&&",REG );
	dtk(REG|DIV,SAMENAME ,"||",REG );


	dtk(REG|DIV,SAMENAME ,"(",REG );
	dtk(REG|DIV,SAMENAME ,")",DIV );


	dtk(REG|DIV,SAMENAME ,"[",REG );
	dtk(REG|DIV,SAMENAME ,"]",DIV );  // a[i]/3

	dtk(REG|DIV,SAMENAME ,"{",REG );
	//dtk(REG|DIV,SAMENAME ,"}",REG );  // if () { .. }  /[a-z]/.exec()
	dtk(REG|DIV,SAMENAME ,"}",DIV ); //in tonyu:  a{x:5}/3

	dtk(REG|DIV,SAMENAME ,">",REG );
	dtk(REG|DIV,SAMENAME ,"<",REG );
	dtk(REG|DIV,SAMENAME ,"+",REG );
	dtk(REG|DIV,SAMENAME ,"-",REG );
	dtk(REG|DIV, SAMENAME ,".",REG );
	dtk(REG|DIV,SAMENAME ,"?",REG );

	dtk(REG|DIV, SAMENAME ,"=",REG );
	dtk(REG|DIV, SAMENAME ,"*",REG );
	dtk(REG|DIV, SAMENAME ,"%",REG );
	dtk(DIV, SAMENAME ,"/",REG );

	dtk(DIV|REG, SAMENAME ,"^",REG );
	dtk(DIV|REG, SAMENAME ,"~",REG );

	dtk(DIV|REG, SAMENAME ,"\\",REG );
	dtk(DIV|REG, SAMENAME ,":",REG );
	dtk(DIV|REG, SAMENAME ,";",REG );
	dtk(DIV|REG, SAMENAME ,",",REG );
	dtk(REG|DIV,SAMENAME ,"!",REG );
	dtk(REG|DIV,SAMENAME ,"&",REG );
	dtk(REG|DIV,SAMENAME ,"|",REG );

	var symresv=tk(/^[a-zA-Z_$][a-zA-Z0-9_$]*/,"symresv_reg").ret(function (s) {
	s.type=(s.text=="constructor" ? "tk_constructor" :
		reserved.hasOwnProperty(s.text) ? s.text : "symbol");
	return s;
	}).first(space);
	for (var n in reserved) {
		posts[n]=REG;
	}
	posts.tk_constructor=REG;
	posts.symbol=DIV;
	parsers[REG]=or(parsers[REG],symresv);
	parsers[DIV]=or(parsers[DIV],symresv);

//	dtk(REG|DIV, "symbol", tk(/^[a-zA-Z_$][a-zA-Z0-9_$]*/,"ident_reg").except(function (s) {
	/*      return reserved.hasOwnProperty(s.text);
	}).first(space), DIV);
	dtk(REG|DIV, "tk_constructor", "constructor", REG);
	var resvs=[];
	for (var n in reserved) {
		if (n!="constructor") resvs.push(n);
	}
	resvs.sort(function (a,b) {
		return b.length-a.length;
	});
	resvs.forEach(function (n) {
		dtk(REG|DIV, SAMENAME, n, REG);
	});
*/
	//profileTbl( parsers[REG],"reg");
	//profileTbl( parsers[DIV],"div");
	//profileTbl( parsers[REG|DIV],"regdiv");
	//parsers[REG|DIV]=parsers[REG].or(parsers[DIV]);
	function parse(str) {
		//if (str.length>100000) return;
		var t1=new Date().getTime();
		var res=Parser.StringParser.parse(all, str);
		//console.log("Time="+(new Date().getTime()-t1));
		if (res.success) {
			/*res.result[0].forEach(function (e) {
				if (e.type=="REGEX" || e.type=="DIV") {
					console.log(e.type+"\t"+ str.substring(e.pos-5,e.pos+6));
					//console.log( e.text+"\t"+e.type+"\t"+e.pos+"-"+e.len);
				}
			});*/
		} else {
			console.log("Stopped at "+str.substring( res.src.maxPos-5, res.src.maxPos+5));
		}
		/*if (typeof WebSite=="object" && WebSite.devMode) {//DELJSL
			window.tokenStat=window.tokenStat||{};
			res.result[0].forEach(function (r) {
				window.tokenStat[ r.text ]= window.tokenStat[ r.text ] || 0;
				window.tokenStat[ r.text ]++;
			});
			//buf=""; for (var k in tokenStat) {  buf+=k+"\t"+tokenStat[k]+"\n"; }; buf;
			//console.log(res);
		}*/
		return res;
		//console.log(Profiler.report());
		//console.log( disp(res.result[0]) );
	}
	return {parse:parse, extension:"js"};
}();

});
if (typeof define!=="function") {
	define=require("requirejs").define;
}

define('ExpressionParser',["Parser"], function (Parser) {
// parser.js の補助ライブラリ．式の解析を担当する
return ExpressionParser=function () {
	var $={};
	var EXPSTAT="EXPSTAT";
	//  first 10     *  +  <>  &&  ||  =     0  later
	function opType(type, prio) {
		var $={};
		$.eq=function (o) {return type==o.type() && prio==o.prio(); };
		$.type=function (t) { if (!t) return type; else return t==type;};
		$.prio=function () {return prio;};
		$.toString=function () {return "["+type+":"+prio+"]"; }
		return $;
	}
	function composite(a) {
		var $={};
		var e=a;
		$.add=function (a) {
			if (!e) {
				e=a;
			} else {
				e=e.or(a);
			}
		};
		$.get=function () {
			return e;
		};
		return $;
	}
	function typeComposite() {
		var built=composite();
		//var lastOP , isBuilt;
		var $={};
		$.reg=function (type, prio, a) {
			var opt=opType(type, prio);
			built.add(a.ret(Parser.create(function (r) {
				r.opType=opt;
				return r;
			})).setName("(opType "+opt+" "+a.name+")") );
		};
		$.get=function () {return built.get();};
		$.parse=function (st) {
			return $.get().parse(st);
		};
		return $;
	}
	var prefixOrElement=typeComposite(), postfixOrInfix=typeComposite();
	var element=composite();
	var trifixes=[];
	$.element=function (e) {
		prefixOrElement.reg("element", -1, e);
		element.add(e);
	};
	$.getElement=function () {return element.get();};
	$.prefix=function (prio, pre) {
		prefixOrElement.reg("prefix", prio, pre);
	};
	$.postfix=function (prio, post) {
		postfixOrInfix.reg("postfix", prio, post);
	};
	$.infixl =function (prio, inf) {
		postfixOrInfix.reg("infixl", prio, inf);
	};
	$.infixr =function (prio, inf) {
		postfixOrInfix.reg("infixr", prio, inf);
	};
	$.infix =function (prio, inf) {
		postfixOrInfix.reg("infix", prio, inf);
	};
	$.trifixr = function (prio, tf1, tf2) {
		postfixOrInfix.reg("trifixr", prio, tf1);
		//postfixOrInfix.reg("trifixr2", prio, tf2);
		trifixes[prio]=tf2;
	};
	$.custom = function (prio, func) {
		// func :: Elem(of next higher) -> Parser
	};
	$.mkInfix=function (f) {
		$.mkInfix.def=f;
	};
	$.mkInfix.def=function (left,op,right) {
		return Parser.setRange({type:"infix", op:op, left: left, right: right});
	}
	$.mkInfixl=function (f) {
		$.mkInfixl.def=f;
	};
	$.mkInfixl.def=function (left, op , right) {
		return Parser.setRange({type:"infixl",op:op ,left:left, right:right});
	};
	$.mkInfixr=function (f) {
		$.mkInfixr.def=f;
	};
	$.mkInfixr.def=function (left, op , right) {
		return Parser.setRange({type:"infixr",op:op ,left:left, right:right});
	};
	$.mkPrefix=function (f) {
		$.mkPrefix.def=f;
	};
	$.mkPrefix.def=function (op , right) {
		return Parser.setRange({type:"prefix", op:op, right:right});
	};
	$.mkPostfix=function (f) {
		$.mkPostfix.def=f;
	};
	$.mkPostfix.def=function (left, op) {
		return Parser.setRange({type:"postfix", left:left, op:op});
	};
	$.mkTrifixr=function(f) {
		$.mkTrifixr.def=f;
	};
	$.mkTrifixr.def=function (left, op1, mid, op2, right) {
		return Parser.setRange({type:"trifixr", left:left, op1:op1, mid:mid, op2:op2, right:right});
	};
	$.build= function () {
		//postfixOrInfix.build();
		//prefixOrElement.build();
		$.built= Parser.create(function (st) {
			return parse(0,st);
		}).setName("ExpBuilt");
		return $.built;
	};
	function dump(st, lbl) {
		return ;
		var s=st.src.str;
		console.log("["+lbl+"] "+s.substring(0,st.pos)+"^"+s.substring(st.pos)+
				" opType="+ st.opType+"  Succ = "+st.isSuccess()+" res="+st.result[0]);
	}
	function parse(minPrio, st) {
		var stat=0, res=st ,  opt;
		dump(st," start minprio= "+minPrio);
		st=prefixOrElement.parse(st);
		dump(st," prefixorelem "+minPrio);
		if (!st.isSuccess()) {
			return st;
		}
		//p2=st.result[0];
		opt=st.opType;
		if (opt.type("prefix") ) {
			// st = -^elem
			pre=st.result[0];
			st=parse(opt.prio(), st);
			if (!st.isSuccess()) {
				return st;
			}
				// st: Expr    st.pos = -elem^
			var pex=$.mkPrefix.def(pre, st.result[0]);
			res=st.clone();  //  res:Expr
			res.result=[pex]; // res:prefixExpr  res.pos= -elem^
			if (!st.nextPostfixOrInfix) {
				return res;
			}
			// st.next =  -elem+^elem
			st=st.nextPostfixOrInfix;  // st: postfixOrInfix
		} else { //elem
			//p=p2;
			res=st.clone(); // res:elemExpr   res =  elem^
			st=postfixOrInfix.parse(st);
			if (!st.isSuccess()) {
				return res;
			}
		}
		// assert st:postfixOrInfix  res:Expr
		while (true) {
			dump(st,"st:pi"); dump(res,"res:ex");
			opt=st.opType;
			if (opt.prio()<minPrio) {
				res.nextPostfixOrInfix=st;
				return res;
			}
			// assert st:postfixOrInfix  res:Expr
			if (opt.type("postfix")) {
				// st:postfix
				var pex=$.mkPostfix.def(res.result[0],st.result[0]);
				res=st.clone();
				res.result=[pex]; // res.pos= expr++^
				dump(st, "185");
				st=postfixOrInfix.parse(st); // st. pos= expr++--^
				if (!st.isSuccess()) {
					return res;
				}
			} else if (opt.type("infixl")){  //x+y+z
				// st: infixl
				var inf=st.result[0];
				st=parse(opt.prio()+1, st);
				if (!st.isSuccess()) {
					return res;
				}
				// st: expr   st.pos=  expr+expr^
				var pex=$.mkInfixl.def(res.result[0], inf , st.result[0]);
				res=st.clone();
				res.result=[pex]; //res:infixlExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
			} else if (opt.type("infixr")) { //a=^b=c
				// st: infixr
				var inf=st.result[0];
				st=parse(opt.prio() ,st);
				if (!st.isSuccess()) {
					return res;
				}
				// st: expr   st.pos=  a=b=c^
				var pex=$.mkInfixr.def(res.result[0], inf , st.result[0]);
				res=st.clone();
				res.result=[pex]; //res:infixrExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
			} else if (opt.type("trifixr")) { //left?^mid:right
				// st: trifixr
				var left=res.result[0];
				var inf1=st.result[0];  // inf1 =  ?
				st=parse(opt.prio()+1 ,st);
				if (!st.isSuccess()) {
					return res;
				}
				// st= expr   st.pos=  left?mid^:right
				var mid=st.result[0];
				var st=trifixes[opt.prio()].parse(st);
				// st= :      st.pos= left?mid:^right;
				if (!st.isSuccess()) {
					return res;
				}
				var inf2= st.result[0];
				st=parse(opt.prio() ,st);
				if (!st.isSuccess()) {
					return res;
				}
				var right=st.result[0];
				// st=right      st.pos= left?mid:right^;
				var pex=$.mkTrifixr.def(left, inf1 , mid, inf2, right);
				res=st.clone();
				res.result=[pex]; //res:infixrExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
			} else { // infix
				// st: infixl
				var inf=st.result[0];
				st=parse(opt.prio()+1 ,st);
				if (!st.isSuccess()) {
					return res;
				}
				// st: expr   st.pos=  expr+expr^
				var pex=$.mkInfix.def(res.result[0], inf , st.result[0]);
				res=st.clone();
				res.result=[pex]; //res:infixExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
				if (opt.prio()==st.opType.prio()) {
					res.success=false;
					return res;
				}
			}
			// assert st:postfixOrInfix  res:Expr
		}
	}
	$.lazy = function () {
		return Parser.create(function (st) {
			return $.built.parse(st);
		});
	};
	return $;
};

});
if (typeof define!=="function") {
	define=require("requirejs").define;
}

/*
* Tonyu2 の構文解析を行う．
* TonyuLang.parse(src);
*   - srcを解析して構文木を返す．構文エラーがあれば例外を投げる．
*/
define('TonyuLang',["Grammar", "XMLBuffer", "IndentBuffer", "TT",
		"disp", "Parser", "ExpressionParser", "TError"],
function (Grammar, XMLBuffer, IndentBuffer, TT,
		disp, Parser, ExpressionParser, TError) {
return TonyuLang=function () {
	var p=Parser;
	var $={};
	var g=Grammar();
	var G=g.get;

	var sp=p.StringParser;//(str);
	var tk=p.TokensParser.token;
	var num=tk("number").ret(function (n) {
		n.type="number";
		if (typeof n.text!="string") throw "No text for "+disp(n);
		n.value=parseFloat(n.text);
		if (isNaN(n.value)) throw "No value for "+disp(n);
		return n;
	});
	var symbol=tk("symbol");
	var eqq=tk("===");
	var nee=tk("!==");
	var eq=tk("==");
	var ne=tk("!=");
	var ge=tk(">=");
	var le=tk("<=");
	var gt=tk(">");
	var lt=tk("<");
	var andand=tk("&&");
	var oror=tk("||");

	var minus=tk("-");//.first(space,"-");
	var plus=tk("+");//.first(space,"+");
	var mul=tk("*");
	var div=tk("/");
	var mod=tk("%");
	var assign=tk("=");
	var literal=tk("literal");
	var regex=tk("regex");
	function retF(n) {
		return function () {
			return arguments[n];
		};
	}

	var e=ExpressionParser() ;
	var arrayElem=g("arrayElem").ands(tk("["), e.lazy() , tk("]")).ret(null,"subscript");
	var argList=g("argList").ands(tk("("), e.lazy().sep0(tk(","),true) , tk(")")).ret(null,"args");
	var member=g("member").ands(tk(".") , symbol ).ret(null,     "name" );
	var parenExpr = g("parenExpr").ands(tk("("), e.lazy() , tk(")")).ret(null,"expr");
	var varAccess = g("varAccess").ands(symbol).ret("name");
	var funcExpr_l=G("funcExpr").firstTokens(["function","\\"]);
	var funcExprArg=g("funcExprArg").ands(funcExpr_l).ret("obj");
	var objlit_l=G("objlit").firstTokens("{");
	var objlitArg=g("objlitArg").ands(objlit_l).ret("obj");
	var objOrFuncArg=objlitArg.or(funcExprArg);
	function genCallBody(argList, oof) {
		var res=[];
		if (argList && !argList.args) {
			throw disp(argList);
		}
		if (argList) {
			var rg=Parser.getRange(argList);
			Parser.addRange(res,rg);
			argList.args.forEach(function (arg) {
				res.push(arg);
			});
		}
		oof.forEach(function (o) {
			var rg=Parser.getRange(o);
			Parser.addRange(res,rg);
			res.push(o.obj);
		});
		return res;
	}
	var callBody=argList.and(objOrFuncArg.rep0()).ret(function(a,oof) {
		return genCallBody(a,oof);
	}).or(objOrFuncArg.rep1().ret(function (oof) {
		return genCallBody(null,oof);
	}));
	var callBodyOld=argList.or(objlitArg);
	var call=g("call").ands( callBody ).ret("args");
	var scall=g("scall").ands( callBody ).ret("args");//supercall
	var newExpr = g("newExpr").ands(tk("new"),varAccess, call.opt()).ret(null, "klass","params");
	var superExpr =g("superExpr").ands(
			tk("super"), tk(".").and(symbol).ret(retF(1)).opt() , scall).ret(
			null,                 "name",                       "params");
	var reservedConst = tk("true").or(tk("false")).
	or(tk("null")).
	or(tk("undefined")).
	or(tk("_thread")).
	or(tk("this")).
	or(tk("arguments")).ret(function (t) {
		t.type="reservedConst";
		return t;
	});
	e.element(num);
	e.element(reservedConst);
	e.element(regex);
	e.element(literal);
	e.element(parenExpr);
	e.element(newExpr);
	e.element(superExpr);
	e.element(funcExpr_l);
	e.element(objlit_l);
	e.element(G("arylit").firstTokens("["));
	e.element(varAccess);
	var prio=0;
	e.infixr(prio,assign);
	e.infixr(prio,tk("+="));
	e.infixr(prio,tk("-="));
	e.infixr(prio,tk("*="));
	e.infixr(prio,tk("/="));
	e.infixr(prio,tk("%="));
	e.infixr(prio,tk("|="));
	e.infixr(prio,tk("&="));
	prio++;
	e.trifixr(prio,tk("?"), tk(":"));
	prio++;
	e.infixl(prio,oror);
	prio++;
	e.infixl(prio,andand);
	prio++;
	e.infix(prio,tk("instanceof"));
	e.infix(prio,tk("is"));
	//e.infix(prio,tk("in"));
	e.infix(prio,eqq);
	e.infix(prio,nee);
	e.infix(prio,eq);
	e.infix(prio,ne);
	e.infix(prio,ge);
	e.infix(prio,le);
	e.infix(prio,gt);
	e.infix(prio,lt);
	prio++;
	e.postfix(prio+3,tk("++"));
	e.postfix(prio+3,tk("--"));
	e.infixl(prio,minus);
	e.infixl(prio,plus);
	prio++;
	e.infixl(prio,mul);
	e.infixl(prio,div);
	e.infixl(prio,mod);
	prio++;
	e.prefix(prio,tk("typeof"));
	e.prefix(prio,tk("__typeof"));
	e.prefix(prio,tk("delete"));
	e.prefix(prio,tk("++"));
	e.prefix(prio,tk("--"));
	e.prefix(prio,tk("+"));
	e.prefix(prio,tk("-"));
	e.prefix(prio,tk("!"));
	prio++;
//    e.postfix(prio,tk("++"));
//    e.postfix(prio,tk("--"));

	prio++;
	e.postfix(prio,call);
	e.postfix(prio,member);
	e.postfix(prio,arrayElem);
	function mki(left, op ,right) {
		var res={type:"infix",left:left,op:op,right:right};
		Parser.setRange(res);
		res.toString=function () {
			return "("+left+op+right+")";
		};
		return res;
	}
	e.mkInfixl(mki);
	e.mkInfixr(mki);
	/*e.mkPostfix(function (p) {
		return {type:"postfix", expr:p};
	});*/
	var expr=e.build().setName("expr").profile();
	var retF=function (i) { return function (){ return arguments[i];}; };

	var stmt=G("stmt").firstTokens();
	var exprstmt=g("exprstmt").ands(expr,tk(";")).ret("expr");
	g("compound").ands(tk("{"), stmt.rep0(),tk("}")).ret(null,"stmts") ;
	var elseP=tk("else").and(stmt).ret(retF(1));
	var returns=g("return").ands(tk("return"),expr.opt(),tk(";") ).ret(null,"value");
	var ifs=g("if").ands(tk("if"), tk("("), expr, tk(")"), stmt, elseP.opt() ).ret(null, null,"cond",null,"then","_else");
	/*var trailFor=tk(";").and(expr.opt()).and(tk(";")).and(expr.opt()).ret(function (s, cond, s2, next) {
		return {cond: cond, next:next  };
	});*/
	var forin=g("forin").ands(tk("var").opt(), symbol.sep1(tk(","),true), tk("in").or(tk("of")), expr).ret(
										"isVar", "vars","inof", "set" );
	var normalFor=g("normalFor").ands(stmt, expr.opt() , tk(";") , expr.opt()).ret(
									"init", "cond",     null, "next");
	/*var infor=expr.and(trailFor.opt()).ret(function (a,b) {
		if (b==null) return {type:"forin", expr: a};
		return {type:"normalFor", init:a, cond: b.cond, next:b.next  };
	});*/
	var infor=normalFor.or(forin);
	var fors=g("for").ands(tk("for"),tk("("), infor , tk(")"),"stmt" ).ret(
								null,null,    "inFor", null   ,"loop");
	//var fors=g("for").ands(tk("for"),tk("("), tk("var").opt() , infor , tk(")"),"stmt" ).ret(null,null,"isVar", "inFor",null, "loop");
	var whiles=g("while").ands(tk("while"), tk("("), expr, tk(")"), "stmt").ret(null,null,"cond",null,"loop");
	var dos=g("do").ands(tk("do"), "stmt" , tk("while"), tk("("), expr, tk(")"), tk(";")).ret(null,"loop",null,null,"cond",null,null);
	var cases=g("case").ands(tk("case"),expr,tk(":"), stmt.rep0() ).ret(null, "value", null,"stmts");
	var defaults=g("default").ands(tk("default"),tk(":"), stmt.rep0() ).ret(null, null,"stmts");
	var switchs=g("switch").ands(tk("switch"), tk("("), expr, tk(")"),tk("{"), cases.rep1(), defaults.opt(), tk("}")).ret(null,null,"value",null,null,"cases","defs");
	var breaks=g("break").ands(tk("break"), tk(";")).ret("brk");
	var continues=g("continue").ands(tk("continue"), tk(";")).ret("cont");
	var fins=g("finally").ands(tk("finally"), "stmt" ).ret(null, "stmt");
	var catchs=g("catch").ands(tk("catch"), tk("("), symbol, tk(")"), "stmt" ).ret(null,null,"name",null, "stmt");
	var catches=g("catches").ors("catch","finally");
	var trys=g("try").ands(tk("try"),"stmt",catches.rep1() ).ret(null, "stmt","catches");
	var throwSt=g("throw").ands(tk("throw"),expr,tk(";")).ret(null,"ex");
	var typeExpr=g("typeExpr").ands(symbol).ret("name");
	var typeDecl=g("typeDecl").ands(tk(":"),typeExpr).ret(null,"vtype");
	var varDecl=g("varDecl").ands(symbol, typeDecl.opt(), tk("=").and(expr).ret(retF(1)).opt() ).ret("name","typeDecl","value");
	var varsDecl= g("varsDecl").ands(tk("var"), varDecl.sep1(tk(","),true), tk(";") ).ret(null ,"decls");
	var paramDecl= g("paramDecl").ands(symbol,typeDecl.opt() ).ret("name","typeDecl");
	var paramDecls=g("paramDecls").ands(tk("("), paramDecl.sep0(tk(","),true), tk(")")  ).ret(null, "params");
	var setterDecl= g("setterDecl").ands(tk("="), paramDecl).ret(null,"value");
	g("funcDeclHead").ands(
			tk("nowait").opt(),
			tk("function").or(tk("fiber")).or(tk("tk_constructor")).or(tk("\\")).opt(),
			symbol.or(tk("new")) , setterDecl.opt(), paramDecls.opt(),typeDecl.opt()   // if opt this it is getter
	).ret("nowait","ftype","name","setter", "params","rtype");
	var funcDecl=g("funcDecl").ands("funcDeclHead","compound").ret("head","body");
	var nativeDecl=g("nativeDecl").ands(tk("native"),symbol,tk(";")).ret(null, "name");
	var ifwait=g("ifWait").ands(tk("ifwait"),"stmt",elseP.opt()).ret(null, "then","_else");
	//var useThread=g("useThread").ands(tk("usethread"),symbol,"stmt").ret(null, "threadVarName","stmt");
	stmt=g("stmt").ors("return", "if", "for", "while", "do","break", "continue", "switch","ifWait","try", "throw","nativeDecl", "funcDecl", "compound", "exprstmt", "varsDecl");
	// ------- end of stmts
	g("funcExprHead").ands(tk("function").or(tk("\\")), symbol.opt() ,paramDecls.opt() ).ret(null,"name","params");
	var funcExpr=g("funcExpr").ands("funcExprHead","compound").ret("head","body");
	var jsonElem=g("jsonElem").ands(
			symbol.or(literal),
			tk(":").or(tk("=")).and(expr).ret(function (c,v) {return v;}).opt()
	).ret("key","value");
	var objlit=g("objlit").ands(tk("{"), jsonElem.sep0(tk(","),true), tk(",").opt(), tk("}")).ret(null, "elems");
	var arylit=g("arylit").ands(tk("["), expr.sep0(tk(","),true),  tk("]")).ret(null, "elems");
	var ext=g("extends").ands(tk("extends"),symbol.or(tk("null")), tk(";")).
	ret(null, "superclassName");
	var incl=g("includes").ands(tk("includes"), symbol.sep1(tk(","),true),tk(";")).
	ret(null, "includeClassNames");
	var program=g("program").
	ands(ext.opt(),incl.opt(),stmt.rep0(), Parser.TokensParser.eof).
	ret("ext","incl","stmts");

	for (var i in g.defs) {
		g.defs[i].profile();
	}
	$.parse = function (file) {
		if (typeof file=="string") {
			str=file;
		} else {
			str=file.text();
		}
		str+="\n"; // For end with // comment with no \n
		var tokenRes=TT.parse(str);
		if (!tokenRes.isSuccess() ) {
			//return "ERROR\nToken error at "+tokenRes.src.maxPos+"\n"+
			//	str.substring(0,tokenRes.src.maxPos)+"!!HERE!!"+str.substring(tokenRes.src.maxPos);
			throw TError("文法エラー(Token)", file ,  tokenRes.src.maxPos);
		}
		var tokens=tokenRes.result[0];
		//console.log("Tokens: "+tokens.join(","));
		var res=p.TokensParser.parse(program, tokens);
		//console.log("POS="+res.src.maxPos);
		if (res.isSuccess() ) {
			var node=res.result[0];
			//console.log(disp(node));
			return node;
			//var xmlsrc=$.genXML(str, node);
			//return "<program>"+xmlsrc+"</program>";

		}
		var lt=tokens[res.src.maxPos];
		var mp=(lt?lt.pos+lt.len: str.length);
		throw TError("文法エラー", file ,  mp );
		/*return "ERROR\nSyntax error at "+mp+"\n"+
		str.substring(0,mp)+"!!HERE!!"+str.substring(mp);*/
	};
	$.genXML= function (src, node) {
		var x=XMLBuffer(src) ;
		x(node);
		return x.buf;
	};
	$.extension="tonyu";
	return $;
}();

});

if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('Visitor',[],function (){
return Visitor = function (funcs) {
	var $={funcs:funcs, path:[]};
	$.visit=function (node) {
		try {
			$.path.push(node);
			if ($.debug) console.log("visit ",node.type, node.pos);
			var v=(node ? funcs[node.type] :null);
			if (v) return v.call($, node);
			else if ($.def) return $.def.call($,node);
		} finally {
			$.path.pop();
		}
	};
	$.replace=function (node) {
		if (!$.def) {
			$.def=function (node) {
				if (typeof node=="object"){
					for (var i in node) {
						if (node[i] && typeof node[i]=="object") {
							node[i]=$.visit(node[i]);
						}
					}
				}
				return node;
			};
		}
		return $.visit(node);
	};
	return $;
};
});
function fixIndent(str, indentStr) {
	if (!indentStr) indentStr="    ";
	var incdec={"{":1, "}":-1,"[":1,"]":-1,"「":1,"」":-1};
	var linfo=[];
	/*try {
		var tokenRes=TT.parse(str);
	var tokens=tokenRes.result[0];
	tokens.forEach(function (token) {
		if (incdec[token.type]) {
		if (!linfo[r.row]) linfo[r.row]="";
				linfo[r.row]+=token.type;
		}
	});
		/*var v=Visitor({
			"{": function (node) {
				var r=pos2RC(str, node.pos);
				if (!linfo[r.row]) linfo[r.row]="";
				linfo[r.row]+=node.text;
			},
		"}": function (node) {
				var r=pos2RC(str, node.pos);
				if (!linfo[r.row]) linfo[r.row]="";
				linfo[r.row]+=node.text;
			}
		});
		v.def=function (node) {
			if (!node || typeof node!="object") return;
			if (node[Grammar.SUBELEMENTS]) {
				node[Grammar.SUBELEMENTS].forEach(function (e) {
					v.visit(e);
				});
				return;
			}
			for (var i in node) {
				if (node.hasOwnProperty(i)) {
					v.visit(node[i]);
				}
			}
		};
		v.visit(node);
	}catch(e) {
	alert(e);*/
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
	function pos2RC(str, pos) {
		var res={row:0, col:0};
		var len=Math.min(str.length,pos);
		for (var i=0 ; i<len ;i++) {
			if (str.substring(i,i+1)=="\n") {
				res.row++;
				res.col=0;
			} else {
				res.col++;
			}
		}
		return res;
	}
}
;
define("fixIndent", ["TonyuLang","Visitor","Grammar"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.fixIndent;
    };
}(this)));

if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('ObjectMatcher',[],function () {
return ObjectMatcher=function () {
	var OM={};
	var VAR="$var",THIZ="$this";
	OM.v=v;
	function v(name, cond) {
		var res={};
		res[VAR]=name;
		if (cond) res[THIZ]=cond;
		return res;
	}
	OM.isVar=isVar;
	var names="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (var i =0 ; i<names.length ; i++) {
		var c=names.substring(i,i+1);
		OM[c]=v(c);
	}
	function isVar(o) {
		return o && o[VAR];
	}
	OM.match=function (obj, tmpl) {
		var res={};
		if (m(obj,tmpl,res)) return res;
		return null;
	};
	function m(obj, tmpl, res) {
		if (obj===tmpl) return true;
		if (obj==null) return false;
		if (typeof obj=="string" && tmpl instanceof RegExp) {
			return obj.match(tmpl);
		}
		if (typeof tmpl=="function") {
			return tmpl(obj,res);
		}
		if (typeof tmpl=="object") {
			//if (typeof obj!="object") obj={$this:obj};
			for (var i in tmpl) {
				if (i==VAR) continue;
				var oe=(i==THIZ? obj :  obj[i] );
				var te=tmpl[i];
				if (!m(oe, te, res)) return false;
			}
			if (tmpl[VAR]) {
				res[tmpl[VAR]]=obj;
			}
			return true;
		}
		return false;
	}
	return OM;
}();
});
/*
コード生成中に使う補助ライブラリ．自分の処理しているクラス，メソッド，変数などの情報を保持する
使い方:
	c=context();
	c.enter({a:3, b:5}, function (c) {
		// この中では，c.a==3 ,  c.b==5
		console.log("a="+c.a+" b="+c.b);
		c.enter({b:6}, function (c) {
			// この中では，c.a==3 ,  c.b==6
			console.log("a="+c.a+" b="+c.b);
		});
		// c.a==3 ,  c.b==5  に戻る
		console.log("a="+c.a+" b="+c.b);

	});
*/
if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('context',[],function () {
return context=function () {
	var c={};
	c.ovrFunc=function (from , to) {
		to.parent=from;
		return to;
	};
	c.enter=enter;
	var builtins={};
	c.clear=function () {
		for (var k in c) {
			if (!builtins[k]) delete c[k];
		}
	};
	for (var k in c) { builtins[k]=true; }
	return c;
	function enter(val, act) {
		var sv={};
		for (var k in val) {
			if (k.match(/^\$/)) {
				k=RegExp.rightContext;
				sv[k]=c[k];
				c[k]=c.ovrFunc(c[k], val[k]);
			} else {
				sv[k]=c[k];
				c[k]=val[k];
			}
		}
		var res=act(c);
		for (var k in sv) {
			c[k]=sv[k];
		}
		return res;
	}
};
});
define('Tonyu.Compiler',["Tonyu","ObjectMatcher", "TError"],
		function(Tonyu,ObjectMatcher, TError) {
	var cu={};
	Tonyu.Compiler=cu;
	var ScopeTypes={
			FIELD:"field", METHOD:"method", NATIVE:"native",//B
			LOCAL:"local", THVAR:"threadvar",
			PARAM:"param", GLOBAL:"global",
			CLASS:"class", MODULE:"module"
	};
	cu.ScopeTypes=ScopeTypes;
	var symSeq=1;//B
	function genSt(st, options) {//B
		var res={type:st};
		if (options) {
			for (var k in options) res[k]=options[k];
		}
		if (!res.name) res.name=genSym("_"+st+"_");
		return res;
	}
	cu.newScopeType=genSt;
	function stype(st) {//B
		return st ? st.type : null;
	}
	cu.getScopeType=stype;
	function newScope(s) {//B
		var f=function (){};
		f.prototype=s;
		return new f();
	}
	cu.newScope=newScope;
	function nc(o, mesg) {//B
		if (!o) throw mesg+" is null";
		return o;
	}
	cu.nullCheck=nc;
	function genSym(prefix) {//B
		return prefix+((symSeq++)+"").replace(/\./g,"");
	}
	cu.genSym=genSym;
	function annotation3(aobjs, node, aobj) {//B
		if (!node._id) {
			if (!aobjs._idseq) aobjs._idseq=0;
			node._id=++aobjs._idseq;
		}
		var res=aobjs[node._id];
		if (!res) res=aobjs[node._id]={node:node};
		if (aobj) {
			for (var i in aobj) res[i]=aobj[i];
		}
		return res;
	}
	cu.extend=function (res,aobj) {
		for (var i in aobj) res[i]=aobj[i];
		return res;
	};
	cu.annotation=annotation3;
	function getSource(srcCont,node) {//B
		return srcCont.substring(node.pos,node.pos+node.len);
	}
	cu.getSource=getSource;
	cu.getField=function(klass,name){
		if (klass instanceof Function) return null;
		var res=null;
		getDependingClasses(klass).forEach(function (k) {
			if (res) return;
			res=k.decls.fields[name];
		});
		if (typeof (res.vtype)==="string") {
			res.vtype=Tonyu.classMetas[res.vtype] || window[res.vtype];
		}
		return res;
	};
	function getMethod2(klass,name) {//B
		var res=null;
		getDependingClasses(klass).forEach(function (k) {
			if (res) return;
			res=k.decls.methods[name];
		});
		return res;
	}
	cu.getMethod=getMethod2;
	function getDependingClasses(klass) {//B
		var visited={};
		var res=[];
		function loop(k) {
			if (visited[k.fullName]) return;
			visited[k.fullName]=true;
			res.push(k);
			if (k.superclass) loop(k.superclass);
			if (k.includes) k.includes.forEach(loop);
		}
		loop(klass);
		return res;
	}
	cu.getDependingClasses=getDependingClasses;
	function getParams(method) {//B
		var res=[];
		if (!method.head) return res;
		if (method.head.setter) res.push(method.head.setter.value);
		var ps=method.head.params ? method.head.params.params : null;
		if (ps && !ps.forEach) throw new Error(method+" is not array ");
		if (ps) res=res.concat(ps);
		return res;
	}
	cu.getParams=getParams;
	return cu;

});

if (typeof define!=="function") {//B
	define=require("requirejs").define;
}
define('Tonyu.Compiler.JSGenerator',["Tonyu", "Tonyu.Iterator", "TonyuLang", "ObjectMatcher", "TError", "IndentBuffer",
		"context", "Visitor","Tonyu.Compiler","assert"],
function(Tonyu, Tonyu_iterator, TonyuLang, ObjectMatcher, TError, IndentBuffer,
		context, Visitor,cu,A) {
return cu.JSGenerator=(function () {
// TonyuソースファイルをJavascriptに変換する
var TH="_thread",THIZ="_this", ARGS="_arguments",FIBPRE="fiber$", FRMPC="__pc", LASTPOS="$LASTPOS",CNTV="__cnt",CNTC=100;//G
var BINDF="Tonyu.bindFunc";
var INVOKE_FUNC="Tonyu.invokeMethod";
var CALL_FUNC="Tonyu.callFunc";
var CHK_NN="Tonyu.checkNonNull";
var CLASS_HEAD="Tonyu.classes.", GLOBAL_HEAD="Tonyu.globals.";
var GET_THIS="this";//"this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this)";
var USE_STRICT='"use strict";%n';
var ITER="Tonyu.iterator";
/*var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",//B
		LOCAL:"local", THVAR:"threadvar", PARAM:"param", GLOBAL:"global", CLASS:"class"};*/
var ScopeTypes=cu.ScopeTypes;
//var genSt=cu.newScopeType;
var stype=cu.getScopeType;
//var newScope=cu.newScope;
//var nc=cu.nullCheck;
//var genSym=cu.genSym;
var annotation3=cu.annotation;
var getMethod2=cu.getMethod;
var getDependingClasses=cu.getDependingClasses;
var getParams=cu.getParams;

//-----------
function genJS(klass, env) {//B
	var srcFile=klass.src.tonyu; //file object  //S
	var srcCont=srcFile.text();
	function getSource(node) {
		return cu.getSource(srcCont,node);
	}
	var buf=env.codeBuffer || IndentBuffer({fixLazyLength:6});
	buf.setSrcFile(srcFile);
	var printf=buf.printf;
	var ctx=context();
	var debug=false;
	var OM=ObjectMatcher;
	var traceTbl=env.traceTbl;
	// method := fiber | function
	var decls=klass.decls;
	var fields=decls.fields,
		methods=decls.methods,
		natives=decls.natives;
	// ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数の集まり．親クラスの宣言は含まない
	var ST=ScopeTypes;
	var fnSeq=0;
	var diagnose=env.options.compiler.diagnose;
	var genMod=env.options.compiler.genAMD;
	var doLoopCheck=!env.options.compiler.noLoopCheck;

	function annotation(node, aobj) {//B
		return annotation3(klass.annotation,node,aobj);
	}
	function getMethod(name) {//B
		return getMethod2(klass,name);
	}
	function getClassName(klass){// should be object or short name //G
		if (typeof klass=="string") return CLASS_HEAD+(env.aliases[klass] || klass);//CFN  CLASS_HEAD+env.aliases[klass](null check)
		if (klass.builtin) return klass.fullName;// CFN klass.fullName
		return CLASS_HEAD+klass.fullName;// CFN  klass.fullName
	}
	function getClassNames(cs){//G
		var res=[];
		cs.forEach(function (c) { res.push(getClassName(c)); });
		return res;
	}
	function enterV(obj, node) {//G
		return function (buf) {
			ctx.enter(obj,function () {
				v.visit(node);
			});
		};
	}
	function varAccess(n, si, an) {//G
		var t=stype(si);
		if (t==ST.THVAR) {
			buf.printf("%s",TH);
		} else if (t==ST.FIELD) {
			buf.printf("%s.%s",THIZ, n);
		} else if (t==ST.METHOD) {
			if (an && an.noBind) {
				buf.printf("%s.%s",THIZ, n);
			} else {
				buf.printf("%s(%s,%s.%s)",BINDF, THIZ, THIZ, n);
			}
		} else if (t==ST.CLASS) {
			buf.printf("%s",getClassName(n));
		} else if (t==ST.GLOBAL) {
			buf.printf("%s%s",GLOBAL_HEAD, n);
		} else if (t==ST.PARAM || t==ST.LOCAL || t==ST.NATIVE || t==ST.MODULE) {
			buf.printf("%s",n);
		} else {
			console.log("Unknown scope type: ",t);
			throw new Error("Unknown scope type: "+t);
		}
		return si;
	}
	function noSurroundCompoundF(node) {//G
		return function () {
			noSurroundCompound.apply(this, [node]);
		};
	}
	function noSurroundCompound(node) {//G
		if (node.type=="compound") {
			ctx.enter({noWait:true},function () {
				buf.printf("%j%n", ["%n",node.stmts]);
				// buf.printf("%{%j%n%}", ["%n",node.stmts]);
			});
		} else {
			v.visit(node);
		}
	}
	function lastPosF(node) {//G
		return function () {
			if (ctx.noLastPos) return;
			buf.printf("%s%s=%s;//%s%n", (env.options.compiler.commentLastPos?"//":""),
					LASTPOS, traceTbl.add(klass/*.src.tonyu*/,node.pos ), klass.fullName+":"+node.pos);
		};
	}
	var THNode={type:"THNode"};//G
	v=buf.visitor=Visitor({//G
		THNode: function (node) {
			buf.printf(TH);
		},
		dummy: function (node) {
			buf.printf("",node);
		},
		literal: function (node) {
			buf.printf("%s",node.text);
		},
		paramDecl: function (node) {
			buf.printf("%v",node.name);
		},
		paramDecls: function (node) {
			buf.printf("(%j)",[", ",node.params]);
		},
		funcDeclHead: function (node) {
			buf.printf("function %v %v",node.name, node.params);
		},
		funcDecl: function (node) {
		},
		"return": function (node) {
			if (ctx.inTry) throw TError("現実装では、tryの中にreturnは書けません",srcFile,node.pos);
			if (!ctx.noWait) {
				if (node.value) {
					buf.printf("%s.exit(%v);return;",TH,node.value);
				} else {
					buf.printf("%s.exit(%s);return;",TH,THIZ);
				}
			} else {
				if (ctx.threadAvail) {
					if (node.value) {
						buf.printf("%s.retVal=%v;return;%n",TH, node.value);
					} else {
						buf.printf("%s.retVal=%s;return;%n",TH, THIZ);
					}
				} else {
					if (node.value) {
						buf.printf("return %v;",node.value);
					} else {
						buf.printf("return %s;",THIZ);
					}

				}
			}
		},
		program: function (node) {
			genClass(node.stmts);
		},
		number: function (node) {
			buf.printf("%s", node.value );
		},
		reservedConst: function (node) {
			if (node.text=="this") {
				buf.printf("%s",THIZ);
			} else if (node.text=="arguments" && ctx.threadAvail) {
				buf.printf("%s",ARGS);
			} else if (node.text==TH) {
				buf.printf("%s", (ctx.threadAvail)?TH:"null");
			} else {
				buf.printf("%s", node.text);
			}
		},
		varDecl: function (node) {
			var a=annotation(node);
			var thisForVIM=a.varInMain? THIZ+"." :"";
			if (node.value) {
				var t=(!ctx.noWait) && annotation(node).fiberCall;
				if (t) {
					A.is(ctx.pc,Number);
					buf.printf(//VDC
						"%s.%s%s(%j);%n" +
						"%s=%s;return;%n" +/*B*/
						"%}case %d:%{"+
						"%s%v=%s.retVal;%n",
							THIZ, FIBPRE, t.N, [", ",[THNode].concat(t.A)],
							FRMPC, ctx.pc,
							ctx.pc++,
							thisForVIM, node.name, TH
					);
				} else {
					buf.printf("%s%v = %v;%n", thisForVIM, node.name, node.value);
				}
			} else {
				//buf.printf("%v", node.name);
			}
		},
		varsDecl: function (node) {
			var decls=node.decls.filter(function (n) { return n.value; });
			if (decls.length>0) {
				lastPosF(node)();
				decls.forEach(function (decl) {
					buf.printf("%v",decl);
				});
			}
		},
		jsonElem: function (node) {
			if (node.value) {
				buf.printf("%v: %v", node.key, node.value);
			} else {
				buf.printf("%v: %f", node.key, function () {
					var si=varAccess( node.key.text, annotation(node).scopeInfo, annotation(node));
				});
			}
		},
		objlit: function (node) {
			buf.printf("{%j}", [",", node.elems]);
		},
		arylit: function (node) {
			buf.printf("[%j]", [",", node.elems]);
		},
		funcExpr: function (node) {
			genFuncExpr(node);
		},
		parenExpr: function (node) {
			buf.printf("(%v)",node.expr);
		},
		varAccess: function (node) {
			var n=node.name.text;
			var si=varAccess(n,annotation(node).scopeInfo, annotation(node));
		},
		exprstmt: function (node) {//exprStmt
			var t={};
			lastPosF(node)();
			if (!ctx.noWait) {
				t=annotation(node).fiberCall || {};
			}
			if (t.type=="noRet") {
				buf.printf(
						"%s.%s%s(%j);%n" +
						"%s=%s;return;%n" +/*B*/
						"%}case %d:%{",
							THIZ, FIBPRE, t.N,  [", ",[THNode].concat(t.A)],
							FRMPC, ctx.pc,
							ctx.pc++
				);
			} else if (t.type=="ret") {
				buf.printf(//VDC
						"%s.%s%s(%j);%n" +
						"%s=%s;return;%n" +/*B*/
						"%}case %d:%{"+
						"%v%v%s.retVal;%n",
							THIZ, FIBPRE, t.N, [", ",[THNode].concat(t.A)],
							FRMPC, ctx.pc,
							ctx.pc++,
							t.L, t.O, TH
				);
			} else if (t.type=="noRetSuper") {
				var p=getClassName(klass.superclass);
					buf.printf(
							"%s.prototype.%s%s.apply( %s, [%j]);%n" +
							"%s=%s;return;%n" +/*B*/
							"%}case %d:%{",
							p,  FIBPRE, t.S.name.text,  THIZ,  [", ",[THNode].concat(t.A)],
								FRMPC, ctx.pc,
								ctx.pc++
					);
			} else if (t.type=="retSuper") {
					buf.printf(
							"%s.prototype.%s%s.apply( %s, [%j]);%n" +
							"%s=%s;return;%n" +/*B*/
							"%}case %d:%{"+
							"%v%v%s.retVal;%n",
								p,  FIBPRE, t.S.name.text,  THIZ, [", ",[THNode].concat(t.A)],
								FRMPC, ctx.pc,
								ctx.pc++,
								t.L, t.O, TH
					);
			} else {
				buf.printf("%v;", node.expr );
			}
		},
		infix: function (node) {
			var opn=node.op.text;
			/*if (opn=="=" || opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
				checkLVal(node.left);
			}*/
			if (diagnose) {
				if (opn=="+" || opn=="-" || opn=="*" ||  opn=="/" || opn=="%" ) {
					buf.printf("%s(%v,%l)%v%s(%v,%l)", CHK_NN, node.left, getSource(node.left), node.op,
							CHK_NN, node.right, getSource(node.right));
					return;
				}
				if (opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
					buf.printf("%v%v%s(%v,%l)", node.left, node.op,
							CHK_NN, node.right, getSource(node.right));
					return;
				}
			}
			buf.printf("%v%v%v", node.left, node.op, node.right);
		},
		trifixr:function (node) {
			buf.printf("%v%v%v%v%v", node.left, node.op1, node.mid, node.op2, node.right);
		},
		prefix: function (node) {
			if (node.op.text==="__typeof") {
				var a=annotation(node.right);
				if (a.vtype) {
					buf.printf("%l",a.vtype.name||a.vtype.fullName||"No type name?");
				} else {
					buf.printf("%l","Any");
				}
				return;
			}
			buf.printf("%v %v", node.op, node.right);
		},
		postfix: function (node) {
			var a=annotation(node);
			if (diagnose) {
				if (a.myMethodCall) {
					var mc=a.myMethodCall;
					var si=mc.scopeInfo;
					var st=stype(si);
					if (st==ST.FIELD || st==ST.METHOD) {
						buf.printf("%s(%s, %l, [%j], %l )", INVOKE_FUNC,THIZ, mc.name, [",",mc.args],"this");
					} else {
						buf.printf("%s(%v, [%j], %l)", CALL_FUNC, node.left, [",",mc.args], getSource(node.left));
					}
					return;
				} else if (a.othersMethodCall) {
					var oc=a.othersMethodCall;
					buf.printf("%s(%v, %l, [%j], %l )", INVOKE_FUNC, oc.target, oc.name, [",",oc.args],getSource(oc.target));
					return;
				} else if (a.memberAccess) {
					var ma=a.memberAccess;
					buf.printf("%s(%v,%l).%s", CHK_NN, ma.target, getSource(ma.target), ma.name );
					return;
				}
			} else if (a.myMethodCall) {
				var mc=a.myMethodCall;
				var si=mc.scopeInfo;
				var st=stype(si);
				if (st==ST.METHOD) {
					buf.printf("%s.%s(%j)",THIZ, mc.name, [",",mc.args]);
					return;
				}
			}
			buf.printf("%v%v", node.left, node.op);
		},
		"break": function (node) {
			if (!ctx.noWait) {
				if (ctx.inTry && ctx.exitTryOnJump) throw TError("現実装では、tryの中にbreak;は書けません",srcFile,node.pos);
				if (ctx.closestBrk) {
					buf.printf("%s=%z; break;%n", FRMPC, ctx.closestBrk);
				} else {
					throw TError( "break； は繰り返しの中で使います" , srcFile, node.pos);
				}
			} else {
				buf.printf("break;%n");
			}
		},
		"continue": function (node) {
			if (!ctx.noWait) {
				if (ctx.inTry && ctx.exitTryOnJump) throw TError("現実装では、tryの中にcontinue;は書けません",srcFile,node.pos);
				if ( typeof (ctx.closestCnt)=="number" ) {
					buf.printf("%s=%s; break;%n", FRMPC, ctx.closestCnt);
				} else if (ctx.closestCnt) {
					buf.printf("%s=%z; break;%n", FRMPC, ctx.closestCnt);
				} else {
					throw TError( "continue； は繰り返しの中で使います" , srcFile, node.pos);
				}
			} else {
				buf.printf("continue;%n");
			}
		},
		"try": function (node) {
			var an=annotation(node);
			if (!ctx.noWait &&
					(an.fiberCallRequired || an.hasJump || an.hasReturn)) {
				//buf.printf("/*try catch in wait mode is not yet supported*/%n");
				if (node.catches.length!=1 || node.catches[0].type!="catch") {
					throw TError("現実装では、catch節1個のみをサポートしています",srcFile,node.pos);
				}
				var ct=node.catches[0];
				var catchPos={},finPos={};
				buf.printf("%s.enterTry(%z);%n",TH,catchPos);
				buf.printf("%f", enterV({inTry:true, exitTryOnJump:true},node.stmt) );
				buf.printf("%s.exitTry();%n",TH);
				buf.printf("%s=%z;break;%n",FRMPC,finPos);
				buf.printf("%}case %f:%{",function (){
						buf.print(catchPos.put(ctx.pc++));
				});
				buf.printf("%s=%s.startCatch();%n",ct.name.text, TH);
				buf.printf("%s.exitTry();%n",TH);
				buf.printf("%v%n", ct.stmt);
				buf.printf("%}case %f:%{",function (){
					buf.print(finPos.put(ctx.pc++));
				});
			} else {
				ctx.enter({noWait:true}, function () {
					buf.printf("try {%{%f%n%}} ",
							noSurroundCompoundF(node.stmt));
					node.catches.forEach(v.visit);
				});
			}
		},
		"catch": function (node) {
			buf.printf("catch (%s) {%{%f%n%}}",node.name.text, noSurroundCompoundF(node.stmt));
		},
		"throw": function (node) {
			buf.printf("throw %v;%n",node.ex);
		},
		"switch": function (node) {
			if (!ctx.noWait) {
				var labels=node.cases.map(function (c) {
					return buf.lazy();
				});
				if (node.defs) labels.push(buf.lazy());
				buf.printf(
						"switch (%v) {%{"+
						"%f"+
						"%n%}}%n"+
						"break;%n"
						,
						node.value,
						function setpc() {
							var i=0;
							node.cases.forEach(function (c) {
								buf.printf("%}case %v:%{%s=%z;break;%n", c.value, FRMPC,labels[i]);
								i++;
							});
							if (node.defs) {
								buf.printf("%}default:%{%s=%z;break;%n", FRMPC, labels[i]);
							}
						});
				var brkpos=buf.lazy();
				ctx.enter({closestBrk:brkpos}, function () {
					var i=0;
					node.cases.forEach(function (c) {
						buf.printf(
								"%}case %f:%{"+
								"%j%n"
								,
								function () { buf.print(labels[i].put(ctx.pc++)); },
								["%n",c.stmts]);
						i++;
					});
					if (node.defs) {
						buf.printf(
								"%}case %f:%{"+
								"%j%n"
								,
								function () { buf.print(labels[i].put(ctx.pc++)); },
								["%n",node.defs.stmts]);
					}
					buf.printf("case %f:%n",
					function () { buf.print(brkpos.put(ctx.pc++)); });
				});
			} else {
				buf.printf(
						"switch (%v) {%{"+
						"%j"+
						(node.defs?"%v":"%D")+
						"%n%}}"
						,
						node.value,
						["%n",node.cases],
						node.defs
						);
			}
		},
		"case": function (node) {
			buf.printf("%}case %v:%{%j",node.value, ["%n",node.stmts]);
		},
		"default": function (node) {
			buf.printf("%}default:%{%j", ["%n",node.stmts]);
		},
		"while": function (node) {
			lastPosF(node)();
			var an=annotation(node);
			if (!ctx.noWait &&
					(an.fiberCallRequired || an.hasReturn)) {
				var brkpos=buf.lazy();
				var pc=ctx.pc++;
				var isTrue= node.cond.type=="reservedConst" && node.cond.text=="true";
				buf.printf(
						/*B*/
						"%}case %d:%{" +
						(isTrue?"%D%D%D":"if (!(%v)) { %s=%z; break; }%n") +
						"%f%n" +
						"%s=%s;break;%n" +
						"%}case %f:%{",
							pc,
							node.cond, FRMPC, brkpos,
							enterV({closestBrk:brkpos, closestCnt:pc, exitTryOnJump:false}, node.loop),
							FRMPC, pc,
							function () { buf.print(brkpos.put(ctx.pc++)); }
				);
			} else {
				ctx.enter({noWait:true},function () {
					buf.printf("while (%v) {%{"+
						(doLoopCheck?"Tonyu.checkLoop();%n":"")+
						"%f%n"+
					"%}}", node.cond, noSurroundCompoundF(node.loop));
				});
			}
		},
		"do": function (node) {
			lastPosF(node)();
			var an=annotation(node);
			if (!ctx.noWait &&
					(an.fiberCallRequired || an.hasReturn)) {
				var brkpos=buf.lazy();
				var cntpos=buf.lazy();
				var pc=ctx.pc++;
				buf.printf(
						"%}case %d:%{" +
						"%f%n" +
						"%}case %f:%{" +
						"if (%v) { %s=%s; break; }%n"+
						"%}case %f:%{",
							pc,
							enterV({closestBrk:brkpos, closestCnt:cntpos, exitTryOnJump:false}, node.loop),
							function () { buf.print(cntpos.put(ctx.pc++)); },
							node.cond, FRMPC, pc,
							function () { buf.print(brkpos.put(ctx.pc++)); }
				);
			} else {
				ctx.enter({noWait:true},function () {
					buf.printf("do {%{"+
						(doLoopCheck?"Tonyu.checkLoop();%n":"")+
						"%f%n"+
					"%}} while (%v);%n",
						noSurroundCompoundF(node.loop), node.cond );
				});
			}
		},
		"for": function (node) {
			lastPosF(node)();
			var an=annotation(node);
			if (node.inFor.type=="forin") {
				var itn=annotation(node.inFor).iterName;
				if (!ctx.noWait &&
						(an.fiberCallRequired || an.hasReturn)) {
					var brkpos=buf.lazy();
					var pc=ctx.pc++;
					buf.printf(
							"%s=%s(%v,%s);%n"+
							"%}case %d:%{" +
							"if (!(%s.next())) { %s=%z; break; }%n" +
							"%f%n" +
							"%f%n" +
							"%s=%s;break;%n" +
							"%}case %f:%{",
								itn, ITER, node.inFor.set, node.inFor.vars.length,
								pc,
								itn, FRMPC, brkpos,
								getElemF(itn, node.inFor.isVar, node.inFor.vars),
								enterV({closestBrk:brkpos, closestCnt: pc, exitTryOnJump:false}, node.loop),//node.loop,
								FRMPC, pc,
								function (buf) { buf.print(brkpos.put(ctx.pc++)); }
					);
				} else {
					ctx.enter({noWait:true},function() {
						buf.printf(
							"%s=%s(%v,%s);%n"+
							"while(%s.next()) {%{" +
							"%f%n"+
							"%f%n" +
							"%}}",
							itn, ITER, node.inFor.set, node.inFor.vars.length,
							itn,
							getElemF(itn, node.inFor.isVar, node.inFor.vars),
							noSurroundCompoundF(node.loop)
						);
					});
				}
			} else {
				if (!ctx.noWait&&
						(an.fiberCallRequired || an.hasReturn)) {
					var brkpos=buf.lazy();
					var cntpos=buf.lazy();
					var pc=ctx.pc++;
					buf.printf(
							"%v%n"+
							"%}case %d:%{" +
							"if (!(%v)) { %s=%z; break; }%n" +
							"%f%n" +
							"%}case %f:%{"+
							"%v;%n" +
							"%s=%s;break;%n" +
							"%}case %f:%{",
								node.inFor.init ,
								pc,
								node.inFor.cond, FRMPC, brkpos,
								enterV({closestBrk:brkpos,closestCnt:cntpos,exitTryOnJump:false}, node.loop),//node.loop,
								function (buf) { buf.print(cntpos.put(ctx.pc++)); },
								node.inFor.next,
								FRMPC, pc,
								function (buf) { buf.print(brkpos.put(ctx.pc++)); }
					);
				} else {
					ctx.enter({noWait:true},function() {
						if (node.inFor.init.type=="varsDecl" || node.inFor.init.type=="exprstmt") {
							buf.printf(
									"%v"+
									"for (; %v ; %v) {%{"+
										(doLoopCheck?"Tonyu.checkLoop();%n":"")+
										"%v%n" +
									"%}}"
										,
									/*enterV({noLastPos:true},*/ node.inFor.init,
									node.inFor.cond, node.inFor.next,
									node.loop
								);
						} else {
							buf.printf(
									"%v%n"+
									"while(%v) {%{" +
										(doLoopCheck?"Tonyu.checkLoop();%n":"")+
										"%v%n" +
										"%v;%n" +
									"%}}",
									node.inFor.init ,
									node.inFor.cond,
										node.loop,
										node.inFor.next
								);
						}
					});
				}
			}
			function getElemF(itn, isVar, vars) {
				return function () {
					vars.forEach(function (v,i) {
						buf.printf("%s=%s[%s];%n", v.text, itn, i);
					});
				};
			}
		},
		"if": function (node) {
			lastPosF(node)();
			//buf.printf("/*FBR=%s*/",!!annotation(node).fiberCallRequired);
			var an=annotation(node);
			if (!ctx.noWait &&
					(an.fiberCallRequired || an.hasJump || an.hasReturn)) {
				var fipos=buf.lazy(), elpos=buf.lazy();
				if (node._else) {
					buf.printf(
							"if (!(%v)) { %s=%z; break; }%n" +
							"%v%n" +
							"%s=%z;break;%n" +
							"%}case %f:%{" +
							"%v%n" +
							/*B*/
							"%}case %f:%{"   ,
								node.cond, FRMPC, elpos,
								node.then,
								FRMPC, fipos,
								function () { buf.print(elpos.put(ctx.pc++)); },
								node._else,

								function () { buf.print(fipos.put(ctx.pc++)); }
					);

				} else {
					buf.printf(
							"if (!(%v)) { %s=%z; break; }%n" +
							"%v%n" +
							/*B*/
							"%}case %f:%{",
								node.cond, FRMPC, fipos,
								node.then,

								function () { buf.print(fipos.put(ctx.pc++)); }
					);
				}
			} else {
				ctx.enter({noWait:true}, function () {
					if (node._else) {
						buf.printf("if (%v) {%{%f%n%}} else {%{%f%n%}}", node.cond,
								noSurroundCompoundF(node.then),
								noSurroundCompoundF(node._else));
					} else {
						buf.printf("if (%v) {%{%f%n%}}", node.cond,
								noSurroundCompoundF(node.then));
					}
				});
			}
		},
		ifWait: function (node) {
			if (!ctx.noWait) {
				buf.printf("%v",node.then);
			} else {
				if (node._else) {
					buf.printf("%v",node._else);
				}
			}
		},
		call: function (node) {
			buf.printf("(%j)", [",",node.args]);
		},
		objlitArg: function (node) {
			buf.printf("%v",node.obj);
		},
		argList: function (node) {
			buf.printf("%j",[",",node.args]);
		},
		newExpr: function (node) {
			var p=node.params;
			if (p) {
				buf.printf("new %v%v",node.klass,p);
			} else {
				buf.printf("new %v",node.klass);
			}
		},
		scall: function (node) {
			buf.printf("[%j]", [",",node.args]);
		},
		superExpr: function (node) {
			var name;
			if (!klass.superclass) throw new Error(klass.fullName+"には親クラスがありません");
			if (node.name) {
				name=node.name.text;
				buf.printf("%s.prototype.%s.apply( %s, %v)",
						getClassName(klass.superclass),  name, THIZ, node.params);
			} else {
				buf.printf("%s.apply( %s, %v)",
						getClassName(klass.superclass), THIZ, node.params);
			}
		},
		arrayElem: function (node) {
			buf.printf("[%v]",node.subscript);
		},
		member: function (node) {
			buf.printf(".%v",node.name);
		},
		symbol: function (node) {
			buf.print(node.text);
		},
		"normalFor": function (node) {
			buf.printf("%v; %v; %v", node.init, node.cond, node.next);
		},
		compound: function (node) {
			var an=annotation(node);
			if (!ctx.noWait &&
					(an.fiberCallRequired || an.hasJump || an.hasReturn) ) {
				buf.printf("%j", ["%n",node.stmts]);
			} else {
				/*if (ctx.noSurroundBrace) {
					ctx.enter({noSurroundBrace:false,noWait:true},function () {
						buf.printf("%{%j%n%}", ["%n",node.stmts]);
					});
				} else {*/
					ctx.enter({noWait:true},function () {
						buf.printf("{%{%j%n%}}", ["%n",node.stmts]);
					});
				//}
			}
		},
	"typeof": function (node) {
		buf.printf("typeof ");
	},
	"instanceof": function (node) {
		buf.printf(" instanceof ");
	},
	"is": function (node) {
		buf.printf(" instanceof ");
	},
	regex: function (node) {
		buf.printf("%s",node.text);
	}
	});
	var opTokens=["++", "--", "!==", "===", "+=", "-=", "*=", "/=",
			"%=", ">=", "<=",
	"!=", "==", ">>", "<<", "&&", "||", ">", "<", "+", "?", "=", "*",
	"%", "/", "^", "~", "\\", ":", ";", ",", "!", "&", "|", "-"
	,"delete"	 ];
	opTokens.forEach(function (opt) {
	v.funcs[opt]=function (node) {
		buf.printf("%s",opt);
	};
	});
	//v.debug=debug;
	v.def=function (node) {
		console.log("Err node=");
		console.log(node);
		throw new Error(node.type+" is not defined in visitor:compiler2");
	};
	v.cnt=0;
	function genSource() {//G
		ctx.enter({}, function () {
			if (genMod) {
				printf("define(function (require) {%{");
				var reqs={Tonyu:1};
				for (var mod in klass.decls.amds) {
					reqs[mod]=1;
				}
				if (klass.superclass) {
					var mod=klass.superclass.shortName;
					reqs[mod]=1;
				}
				(klass.includes||[]).forEach(function (klass) {
					var mod=klass.shortName;
					reqs[mod]=1;
				});
				for (var mod in klass.decls.softRefClasses) {
					reqs[mod]=1;
				}
				for (var mod in reqs) {
					printf("var %s=require('%s');%n",mod,mod);
				}
			}
			printf((genMod?"return ":"")+"Tonyu.klass.define({%{");
			printf("fullName: %l,%n", klass.fullName);
			printf("shortName: %l,%n", klass.shortName);
			printf("namespace: %l,%n", klass.namespace);
			if (klass.superclass) printf("superclass: %s,%n", getClassName(klass.superclass));
			printf("includes: [%s],%n", getClassNames(klass.includes).join(","));
			printf("methods: {%{");
			for (var name in methods) {
				if (debug) console.log("method1", name);
				var method=methods[name];
				ctx.enter({noWait:true, threadAvail:false}, function () {
					genFunc(method);
				});
				if (debug) console.log("method2", name);
				if (!method.nowait ) {
					ctx.enter({noWait:false,threadAvail:true}, function () {
						genFiber(method);
					});
				}
				if (debug) console.log("method3", name);
			}
			printf("__dummy: false%n");
			printf("%}},%n");
			printf("decls: %s%n", JSON.stringify(digestDecls(klass)));
			printf("%}});");
			if (genMod) printf("%n%}});");
			//printf("%}});%n");
		});
		//printf("Tonyu.klass.addMeta(%s,%s);%n",
		//        getClassName(klass),JSON.stringify(digestMeta(klass)));
		//if (env.options.compiler.asModule) {
		//    printf("//%}});");
		//}
	}
	function digestDecls(klass) {
		var res={methods:{},fields:{}};
		for (var i in klass.decls.methods) {
			res.methods[i]=
			{nowait:!!klass.decls.methods[i].nowait};
		}
		for (var i in klass.decls.fields) {
			var src=klass.decls.fields[i];
			var dst={};
			//console.log("digestDecls",src);
			if (src.vtype) {
			if (typeof (src.vtype)==="string") {
				dst.vtype=src.vtype;
			} else {
				dst.vtype=src.vtype.fullName || src.vtype.name;
			}
			}
			res.fields[i]=dst;
		}
		return res;
	}
	function digestMeta(klass) {//G
		var res={
				fullName: klass.fullName,
				namespace: klass.namespace,
				shortName: klass.shortName,
				decls:{methods:{}}
		};
		for (var i in klass.decls.methods) {
			res.decls.methods[i]=
			{nowait:!!klass.decls.methods[i].nowait};
		}
		return res;
	}
	function genFiber(fiber) {//G
		if (isConstructor(fiber)) return;
		var stmts=fiber.stmts;
		var noWaitStmts=[], waitStmts=[], curStmts=noWaitStmts;
		var opt=true;
		if (opt) {
			stmts.forEach(function (s) {
				if (annotation(s).fiberCallRequired) {
					curStmts=waitStmts;
				}
				curStmts.push(s);
			});
		} else {
			waitStmts=stmts;
		}
		printf(
				"%s%s :function %s(%j) {%{"+
				USE_STRICT+
				"var %s=%s;%n"+
				"%svar %s=%s;%n"+
				"var %s=0;%n"+
				"%f%n"+
				"%f%n",
				FIBPRE, fiber.name, genFn(fiber.pos,"f_"+fiber.name), [",",[THNode].concat(fiber.params)],
				THIZ, GET_THIS,
				(fiber.useArgs?"":"//"), ARGS, "Tonyu.A(arguments)",
				FRMPC,
				genLocalsF(fiber),
				nfbody
		);
		if (waitStmts.length>0) {
			printf(
				"%s.enter(function %s(%s) {%{"+
					"if (%s.lastEx) %s=%s.catchPC;%n"+
					"for(var %s=%d ; %s--;) {%{"+
						"switch (%s) {%{"+
						"%}case 0:%{"+
						"%f" +
						"%s.exit(%s);return;%n"+
						"%}}%n"+
					"%}}%n"+
				"%}});%n",
				TH,genFn(fiber.pos,"ent_"+fiber.name),TH,
					TH,FRMPC,TH,
					CNTV, CNTC, CNTV,
						FRMPC,
						// case 0:
						fbody,
						TH,THIZ
			);
		} else {
			printf("%s.retVal=%s;return;%n",TH,THIZ);
		}
		printf("%}},%n");
		function nfbody() {
			ctx.enter({method:fiber, /*scope: fiber.scope,*/ noWait:true, threadAvail:true }, function () {
				noWaitStmts.forEach(function (stmt) {
					printf("%v%n", stmt);
				});
			});
		}
		function fbody() {
			ctx.enter({method:fiber, /*scope: fiber.scope,*/
				finfo:fiber, pc:1}, function () {
				waitStmts.forEach(function (stmt) {
					printf("%v%n", stmt);
				});
			});
		}
	}
	function genFunc(func) {//G
		var fname= isConstructor(func) ? "initialize" : func.name;
		printf("%s :function %s(%j) {%{"+
					USE_STRICT+
					"var %s=%s;%n"+
					"%f%n" +
					"%f" +
				"%}},%n",
				fname, genFn(func.pos,fname), [",",func.params],
				THIZ, GET_THIS,
						genLocalsF(func),
						fbody
		);
		function fbody() {
			ctx.enter({method:func, finfo:func,
				/*scope: func.scope*/ }, function () {
				func.stmts.forEach(function (stmt) {
					printf("%v%n", stmt);
				});
			});
		}
	}
	function genFuncExpr(node) {//G
		var finfo=annotation(node).info;// annotateSubFuncExpr(node);

		buf.printf("(function %s(%j) {%{"+
						"%f%n"+
						"%f"+
					"%}})"
				,
					finfo.name, [",", finfo.params],
					genLocalsF(finfo),
						fbody
		);
		function fbody() {
			ctx.enter({noWait: true, threadAvail:false,
				finfo:finfo, /*scope: finfo.scope*/ }, function () {
				node.body.stmts.forEach(function (stmt) {
					printf("%v%n", stmt);
				});
			});
		}
	}
	function genFn(pos,name) {//G
		if (!name) name=(fnSeq++)+"";
		return ("_trc_"+klass.shortName+"_"+name)
//        return ("_trc_func_"+traceTbl.add(klass,pos )+"_"+(fnSeq++));//  Math.random()).replace(/\./g,"");
	}
	function genSubFunc(node) {//G
		var finfo=annotation(node).info;// annotateSubFuncExpr(node);
		buf.printf("function %s(%j) {%{"+
						"%f%n"+
						"%f"+
					"%}}"
				,
					finfo.name,[",", finfo.params],
						genLocalsF(finfo),
						fbody
		);
		function fbody() {
			ctx.enter({noWait: true, threadAvail:false,
				finfo:finfo, /*scope: finfo.scope*/ }, function () {
				node.body.stmts.forEach(function (stmt) {
					printf("%v%n", stmt);
				});
			});
		}
	}
	function genLocalsF(finfo) {//G
		return f;
		function f() {
			ctx.enter({/*scope:finfo.scope*/}, function (){
				for (var i in finfo.locals.varDecls) {
					buf.printf("var %s;%n",i);
				}
				for (var i in finfo.locals.subFuncDecls) {
					genSubFunc(finfo.locals.subFuncDecls[i]);
				}
			});
		};
	}
	function isConstructor(f) {//G
		return OM.match(f, {ftype:"constructor"}) || OM.match(f, {name:"new"});
	}
	genSource();//G
	if (genMod) {
		klass.src.js=klass.src.tonyu.up().rel(klass.src.tonyu.truncExt()+".js");
		klass.src.js.text(buf.buf);
	} else {
		klass.src.js=buf.buf;//G
	}
	if (debug) {
		console.log("method4", buf.buf);
		//throw "ERR";
	}
	var bufres=buf.close();
	klass.src.map=buf.mapStr;
	return bufres;
}//B
return {genJS:genJS};
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
});

if (typeof define!=="function") {//B
	define=require("requirejs").define;
}
define('Tonyu.Compiler.Semantics',["Tonyu", "Tonyu.Iterator", "TonyuLang", "ObjectMatcher", "TError", "IndentBuffer",
		"context", "Visitor","Tonyu.Compiler"],
function(Tonyu, Tonyu_iterator, TonyuLang, ObjectMatcher, TError, IndentBuffer,
		context, Visitor,cu) {
return cu.Semantics=(function () {
/*var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",//B
		LOCAL:"local", THVAR:"threadvar", PARAM:"param", GLOBAL:"global", CLASS:"class"};*/
var ScopeTypes=cu.ScopeTypes;
var genSt=cu.newScopeType;
var stype=cu.getScopeType;
var newScope=cu.newScope;
//var nc=cu.nullCheck;
var genSym=cu.genSym;
var annotation3=cu.annotation;
var getMethod2=cu.getMethod;
var getDependingClasses=cu.getDependingClasses;
var getParams=cu.getParams;
var JSNATIVES={Array:1, String:1, Boolean:1, Number:1, Void:1, Object:1,RegExp:1,Error:1};
//-----------
function initClassDecls(klass, env ) {//S
	var s=klass.src.tonyu; //file object
	var node;
	if (klass.node && klass.nodeTimestamp==s.lastUpdate()) {
		node=klass.node;
	}
	if (!node) {
		console.log("Parse "+s);
		node=TonyuLang.parse(s);
		klass.nodeTimestamp=s.lastUpdate();
	}
	//console.log(s+"",  !!klass.node, klass.nodeTimestamp, s.lastUpdate());
	//if (!klass.testid) klass.testid=Math.random();
	//console.log(klass.testid);
	var MAIN={name:"main",stmts:[],pos:0, isMain:true};
	// method := fiber | function
	var fields={}, methods={main: MAIN}, natives={}, amds={},softRefClasses={};
	klass.decls={fields:fields, methods:methods, natives: natives, amds:amds,
	softRefClasses:softRefClasses};
	// ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数，AMDモジュール変数
	//   extends/includes以外から参照してれるクラス の集まり．親クラスの宣言は含まない
	klass.node=node;
	/*function nc(o, mesg) {
		if (!o) throw mesg+" is null";
		return o;
	}*/
	var OM=ObjectMatcher;
	function initMethods(program) {
		var spcn=env.options.compiler.defaultSuperClass;
		var pos=0;
		var t;
		if (t=OM.match( program , {ext:{superclassName:{text:OM.N, pos:OM.P}}})) {
			spcn=t.N;
			pos=t.P;
			if (spcn=="null") spcn=null;
		}
		klass.includes=[];
		if (t=OM.match( program , {incl:{includeClassNames:OM.C}})) {
			t.C.forEach(function (i) {
				var n=i.text;/*ENVC*/
				var p=i.pos;
				var incc=env.classes[env.aliases[n] || n];/*ENVC*/ //CFN env.classes[env.aliases[n]]
				if (!incc) throw TError ( "クラス "+n+"は定義されていません", s, p);
				klass.includes.push(incc);
			});
		}
		if (spcn=="Array") {
			klass.superclass={name:"Array",fullName:"Array",builtin:true};
		} else if (spcn) {
			var spc=env.classes[env.aliases[spcn] || spcn];/*ENVC*/  //CFN env.classes[env.aliases[spcn]]
			if (!spc) {
				throw TError ( "親クラス "+spcn+"は定義されていません", s, pos);
			}
			klass.superclass=spc;
		} else {
			delete klass.superclass;
		}
		program.stmts.forEach(function (stmt) {
			if (stmt.type=="funcDecl") {
				var head=stmt.head;
				var ftype="function";
				if (head.ftype) {
					ftype=head.ftype.text;
					//console.log("head.ftype:",stmt);
				}
				var name=head.name.text;
				var propHead=(head.params ? "" : head.setter ? "__setter__" : "__getter__");
				name=propHead+name;
				methods[name]={
						nowait: (!!head.nowait || propHead!==""),
						ftype:  ftype,
						name:  name,
						klass: klass.fullName,
						head:  head,
						pos: head.pos,
						stmts: stmt.body.stmts,
						node: stmt
				};
				//annotation(stmt,methods[name]);
				//annotation(stmt,{finfo:methods[name]});
			} else if (stmt.type=="nativeDecl") {
				natives[stmt.name.text]=stmt;
			} else {
				if (stmt.type=="varsDecl") {
					stmt.decls.forEach(function (d) {
						//console.log("varDecl", d.name.text);
						//fields[d.name.text]=d;
						fields[d.name.text]={
							node:d,
							klass:klass.fullName,
							name:d.name.text,
							pos:d.pos
						};
					});
				}
				MAIN.stmts.push(stmt);
			}
		});
	}
	initMethods(node);        // node=program
}// of initClassDecls
function annotateSource2(klass, env) {//B
	var srcFile=klass.src.tonyu; //file object  //S
	var srcCont=srcFile.text();
	function getSource(node) {
		return cu.getSource(srcCont,node);
	}
	var OM=ObjectMatcher;
	var traceTbl=env.traceTbl;
	// method := fiber | function
	var decls=klass.decls;
	var fields=decls.fields,
		methods=decls.methods,
		natives=decls.natives,
		amds=decls.amds;
	// ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数，モジュール変数の集まり．親クラスの宣言は含まない
	var ST=ScopeTypes;
	var topLevelScope={};
	// ↑ このソースコードのトップレベル変数の種類 ，親クラスの宣言を含む
	//  キー： 変数名   値： ScopeTypesのいずれか
	var v=null;
	var ctx=context();
	var debug=false;
	var othersMethodCallTmpl={
			type:"postfix",
			left:{
				type:"postfix",
				left:OM.T,
				op:{type:"member",name:{text:OM.N}}
			},
			op:{type:"call", args:OM.A }
	};
	var memberAccessTmpl={
			type:"postfix",
			left: OM.T,
			op:{type:"member",name:{text:OM.N}}
	};
	// These has same value but different purposes:
	//  myMethodCallTmpl: avoid using bounded field for normal method(); call
	//  fiberCallTmpl: detect fiber call
	var myMethodCallTmpl=fiberCallTmpl={
			type:"postfix",
			left:{type:"varAccess", name: {text:OM.N}},
			op:{type:"call", args:OM.A }
	};
	var noRetFiberCallTmpl={
		expr: fiberCallTmpl
	};
	var retFiberCallTmpl={
		expr: {
			type: "infix",
			op: OM.O,
			left: OM.L,
			right: fiberCallTmpl
		}
	};
	var noRetSuperFiberCallTmpl={
		expr: {type:"superExpr", params:{args:OM.A}, $var:"S"}
	};
	var retSuperFiberCallTmpl={
			expr: {
				type: "infix",
				op: OM.O,
				left: OM.L,
				right: {type:"superExpr", params:{args:OM.A}, $var:"S"}
			}
		};
	klass.annotation={};
	function annotation(node, aobj) {//B
		return annotation3(klass.annotation,node,aobj);
	}
	/*function assertAnnotated(node, si) {//B
		var a=annotation(node);
		if (!a.scopeInfo) {
			console.log(srcCont.substring(node.pos-5,node.pos+20));
			console.log(node, si);
			throw "Scope info not set";
		}
		if (si.type!=a.scopeInfo.type){
			console.log(srcCont.substring(node.pos-5,node.pos+20));
			console.log(node, si , a.scopeInfo);
			throw "Scope info not match";
		}
	}*/
	function initTopLevelScope2(klass) {//S
		if (klass.builtin) return;
		var s=topLevelScope;
		var decls=klass.decls;
		var i;
		for (i in decls.fields) {
			var info=decls.fields[i];
			s[i]=genSt(ST.FIELD,{klass:klass.fullName,name:i,info:info});
			if (info.node) {
				annotation(info.node,{info:info});
			}
		}
		for (i in decls.methods) {
			var info=decls.methods[i];
			s[i]=genSt(ST.METHOD,{klass:klass.fullName,name:i,info:info});
			if (info.node) {
				annotation(info.node,{info:info});
			}
		}
	}
	function initTopLevelScope() {//S
		var s=topLevelScope;
		getDependingClasses(klass).forEach(initTopLevelScope2);
		var decls=klass.decls;// Do not inherit parents' natives
		for (var i in decls.natives) {
			s[i]=genSt(ST.NATIVE,{name:"native::"+i,value:window[i]});
		}
		for (var i in JSNATIVES) {
			s[i]=genSt(ST.NATIVE,{name:"native::"+i,value:window[i]});
		}
		for (var i in env.aliases) {/*ENVC*/ //CFN  env.classes->env.aliases
			var fullName=env.aliases[i];
			s[i]=genSt(ST.CLASS,{name:i,fullName:fullName,info:env.classes[fullName]});
		}
	}
	function inheritSuperMethod() {//S
		var d=getDependingClasses(klass);
		for (var n in klass.decls.methods) {
			var m2=klass.decls.methods[n];
			d.forEach(function (k) {
				var m=k.decls.methods[n];
				if (m && m.nowait) {
					m2.nowait=true;
				}
			});
		}
	}
	function getMethod(name) {//B
		return getMethod2(klass,name);
	}
	function checkLVal(node) {//S
		if (node.type=="varAccess" ||
				node.type=="postfix" && (node.op.type=="member" || node.op.type=="arrayElem") ) {
			if (node.type=="varAccess") {
				annotation(node,{noBind:true});
			}
			return true;
		}
		console.log("LVal",node);
		throw TError( "'"+getSource(node)+"'は左辺には書けません．" , srcFile, node.pos);
	}
	function getScopeInfo(n) {//S
		var si=ctx.scope[n];
		var t=stype(si);
		if (!t) {
			if (env.amdPaths && env.amdPaths[n]) {
				t=ST.MODULE;
				klass.decls.amds[n]=env.amdPaths[n];
				//console.log(n,"is module");
			} else {
				var isg=n.match(/^\$/);
				t=isg?ST.GLOBAL:ST.FIELD;
			}
			var opt={name:n};
			if (t==ST.FIELD) {
				opt.klass=klass.name;
				klass.decls.fields[n]=klass.decls.fields[n]||{};
				cu.extend(klass.decls.fields[n],{
					klass:klass.fullName,
					name:n
				});//si;
			}
			si=topLevelScope[n]=genSt(t,opt);
		}
		if (t==ST.CLASS) {
			klass.decls.softRefClasses[n]=si;
		}
		return si;
	}
	var localsCollector=Visitor({
		varDecl: function (node) {
			if (ctx.isMain) {
				annotation(node,{varInMain:true});
				annotation(node,{declaringClass:klass});
				//console.log("var in main",node.name.text);
			} else {
				ctx.locals.varDecls[node.name.text]=node;
				//console.log("DeclaringFunc of ",node.name.text,ctx.finfo);
				annotation(node,{declaringFunc:ctx.finfo});
			}
		},
		funcDecl: function (node) {/*FDITSELFIGNORE*/
			ctx.locals.subFuncDecls[node.head.name.text]=node;
			//initParamsLocals(node);??
		},
		funcExpr: function (node) {/*FEIGNORE*/
			//initParamsLocals(node);??
		},
		"catch": function (node) {
			ctx.locals.varDecls[node.name.text]=node;
		},
		exprstmt: function (node) {
		},
		"forin": function (node) {
			var isVar=node.isVar;
			node.vars.forEach(function (v) {
				/* if (isVar) */ctx.locals.varDecls[v.text]=node;
			});
			var n=genSym("_it_");
			annotation(node, {iterName:n});
			ctx.locals.varDecls[n]=node;// ??
		}
	});
	localsCollector.def=visitSub;//S
	function visitSub(node) {//S
		var t=this;
		if (!node || typeof node!="object") return;
		var es;
		if (node instanceof Array) es=node;
		else es=node[Grammar.SUBELEMENTS];
		if (!es) {
			es=[];
			for (var i in node) {
				es.push(node[i]);
			}
		}
		es.forEach(function (e) {
			t.visit(e);
		});
	}
	function collectLocals(node) {//S
		var locals={varDecls:{}, subFuncDecls:{}};
		ctx.enter({locals:locals},function () {
			localsCollector.visit(node);
		});
		return locals;
	}
	function annotateParents(path, data) {//S
		path.forEach(function (n) {
			annotation(n,data);
		});
	}
	function fiberCallRequired(path) {//S
		if (ctx.method) ctx.method.fiberCallRequired=true;
		annotateParents(path, {fiberCallRequired:true} );
	}
	var varAccessesAnnotator=Visitor({//S
		varAccess: function (node) {
			var si=getScopeInfo(node.name.text);
			var t=stype(si);
			annotation(node,{scopeInfo:si});
		},
		funcDecl: function (node) {/*FDITSELFIGNORE*/
		},
		funcExpr: function (node) {/*FEIGNORE*/
			annotateSubFuncExpr(node);
		},
		objlit:function (node) {
			var t=this;
			var dup={};
			node.elems.forEach(function (e) {
				var kn;
				if (e.key.type=="literal") {
					kn=e.key.text.substring(1,e.key.text.length-1);
				} else {
					kn=e.key.text;
				}
				if (dup[kn]) {
					throw TError( "オブジェクトリテラルのキー名'"+kn+"'が重複しています" , srcFile, e.pos);
				}
				dup[kn]=1;
				//console.log("objlit",e.key.text);
				t.visit(e);
			});
		},
		jsonElem: function (node) {
			if (node.value) {
				this.visit(node.value);
			} else {
				if (node.key.type=="literal") {
					throw TError( "オブジェクトリテラルのパラメタに単独の文字列は使えません" , srcFile, node.pos);
				}
				var si=getScopeInfo(node.key.text);
				annotation(node,{scopeInfo:si});
			}
		},
		"do": function (node) {
			var t=this;
			ctx.enter({brkable:true,contable:true}, function () {
				t.def(node);
			});
		},
		"switch": function (node) {
			var t=this;
			ctx.enter({brkable:true}, function () {
				t.def(node);
			});
		},
		"while": function (node) {
			var t=this;
			ctx.enter({brkable:true,contable:true}, function () {
				t.def(node);
			});
			fiberCallRequired(this.path);//option
		},
		"for": function (node) {
			var t=this;
			ctx.enter({brkable:true,contable:true}, function () {
				t.def(node);
			});
		},
		"forin": function (node) {
			node.vars.forEach(function (v) {
				var si=getScopeInfo(v.text);
				annotation(v,{scopeInfo:si});
			});
			this.visit(node.set);
		},
		ifWait: function (node) {
			var TH="_thread";
			var t=this;
			var ns=newScope(ctx.scope);
			ns[TH]=genSt(ST.THVAR);
			ctx.enter({scope:ns}, function () {
				t.visit(node.then);
			});
			if (node._else) {
				t.visit(node._else);
			}
			fiberCallRequired(this.path);
		},
		"try": function (node) {
			ctx.finfo.useTry=true;
			this.def(node);
		},
		"return": function (node) {
			if (!ctx.noWait) annotateParents(this.path,{hasReturn:true});
			this.visit(node.value);
		},
		"break": function (node) {
			if (!ctx.brkable) throw TError( "break； は繰り返しまたはswitch文の中で使います." , srcFile, node.pos);
			if (!ctx.noWait) annotateParents(this.path,{hasJump:true});
		},
		"continue": function (node) {
			if (!ctx.contable) throw TError( "continue； は繰り返しの中で使います." , srcFile, node.pos);
			if (!ctx.noWait) annotateParents(this.path,{hasJump:true});
		},
		"reservedConst": function (node) {
			if (node.text=="arguments") {
				ctx.finfo.useArgs=true;
			}
		},
		postfix: function (node) {
			var t;
			this.visit(node.left);
			this.visit(node.op);
			if (t=OM.match(node, myMethodCallTmpl)) {
				var si=annotation(node.left).scopeInfo;
				annotation(node, {myMethodCall:{name:t.N,args:t.A,scopeInfo:si}});
			} else if (t=OM.match(node, othersMethodCallTmpl)) {
				annotation(node, {othersMethodCall:{target:t.T,name:t.N,args:t.A} });
			} else if (t=OM.match(node, memberAccessTmpl)) {
				annotation(node, {memberAccess:{target:t.T,name:t.N} });
			}
		},
		infix: function (node) {
			var opn=node.op.text;
			if (opn=="=" || opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
				checkLVal(node.left);
			}
			this.def(node);
		},
		exprstmt: function (node) {
			var t,m;
			if (!ctx.noWait &&
					(t=OM.match(node,noRetFiberCallTmpl)) &&
					stype(ctx.scope[t.N])==ST.METHOD &&
					!getMethod(t.N).nowait) {
				t.type="noRet";
				annotation(node, {fiberCall:t});
				fiberCallRequired(this.path);
			} else if (!ctx.noWait &&
					(t=OM.match(node,retFiberCallTmpl)) &&
					stype(ctx.scope[t.N])==ST.METHOD &&
					!getMethod(t.N).nowait) {
				t.type="ret";
				annotation(node, {fiberCall:t});
				fiberCallRequired(this.path);
			} else if (!ctx.noWait &&
					(t=OM.match(node,noRetSuperFiberCallTmpl)) &&
					t.S.name) {
				m=getMethod(t.S.name.text);
				if (!m) throw new Error("メソッド"+t.S.name.text+" はありません。");
				if (!m.nowait) {
					t.type="noRetSuper";
					t.superclass=klass.superclass;
					annotation(node, {fiberCall:t});
					fiberCallRequired(this.path);
				}
			} else if (!ctx.noWait &&
					(t=OM.match(node,retSuperFiberCallTmpl)) &&
					t.S.name) {
				m=getMethod(t.S.name.text);
				if (!m) throw new Error("メソッド"+t.S.name.text+" はありません。");
				if (!m.nowait) {
					t.type="retSuper";
					t.superclass=klass.superclass;
					annotation(node, {fiberCall:t});
					fiberCallRequired(this.path);
				}
			}
			this.visit(node.expr);
		},
		varDecl: function (node) {
			var t;
			if (!ctx.noWait &&
					(t=OM.match(node.value,fiberCallTmpl)) &&
					stype(ctx.scope[t.N])==ST.METHOD &&
					!getMethod(t.N).nowait) {
				t.type="varDecl";
				annotation(node, {fiberCall:t});
				fiberCallRequired(this.path);
			}
			this.visit(node.value);
			this.visit(node.typeDecl);
		},
		typeExpr: function (node) {
			resolveType(node);
		}
	});
	function resolveType(node) {//node:typeExpr
		var name=node.name+"";
		var si=getScopeInfo(name);
		var t=stype(si);
		console.log("TExpr",name,si,t);
		if (t===ST.NATIVE) {
			annotation(node, {resolvedType: si.value});
		} else if (t===ST.CLASS){
			annotation(node, {resolvedType: si.info});
		}
	}
	varAccessesAnnotator.def=visitSub;//S
	function annotateVarAccesses(node,scope) {//S
		ctx.enter({scope:scope}, function () {
			varAccessesAnnotator.visit(node);
		});
	}
	function copyLocals(finfo, scope) {//S
		var locals=finfo.locals;
		for (var i in locals.varDecls) {
			//console.log("LocalVar ",i,"declared by ",finfo);
			var si=genSt(ST.LOCAL,{declaringFunc:finfo});
			scope[i]=si;
			annotation(locals.varDecls[i],{scopeInfo:si});
		}
		for (var i in locals.subFuncDecls) {
			var si=genSt(ST.LOCAL,{declaringFunc:finfo});
			scope[i]=si;
			annotation(locals.subFuncDecls[i],{scopeInfo:si});
		}
	}
	function resolveTypesOfParams(params) {
		params.forEach(function (param) {
			if (param.typeDecl) {
			console.log("restype",param);
			resolveType(param.typeDecl.vtype);
			}
		});
	}
	function initParamsLocals(f) {//S
		//console.log("IS_MAIN", f.name, f.isMain);
		ctx.enter({isMain:f.isMain,finfo:f}, function () {
			f.locals=collectLocals(f.stmts);
			f.params=getParams(f);
		});
		resolveTypesOfParams(f.params);
	}
	function annotateSubFuncExpr(node) {// annotateSubFunc or FuncExpr
		var m,ps;
		var body=node.body;
		var name=(node.head.name ? node.head.name.text : "anonymous_"+node.pos );
		if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
			ps=m.P;
		} else {
			ps=[];
		}
		var finfo={};
		var ns=newScope(ctx.scope);
		//var locals;
		ctx.enter({finfo: finfo}, function () {
			ps.forEach(function (p) {
				var si=genSt(ST.PARAM,{declaringFunc:finfo});
				annotation(p,{scopeInfo:si});
				ns[p.name.text]=si;
			});
			finfo.locals=collectLocals(body);
			copyLocals(finfo, ns);
			annotateVarAccesses(body,ns);
		});
		finfo.scope=ns;
		finfo.name=name;
		finfo.params=ps;
		//var res={scope:ns, locals:finfo.locals, name:name, params:ps};
		resolveTypesOfParams(finfo.params);
		//annotation(node,res);
		annotation(node,{info:finfo});
		annotateSubFuncExprs(finfo.locals, ns);
		return finfo;
	}
	function annotateSubFuncExprs(locals, scope) {//S
		ctx.enter({scope:scope}, function () {
			for (var n in locals.subFuncDecls) {
				annotateSubFuncExpr(locals.subFuncDecls[n]);
			}
		});
	}
	function annotateMethodFiber(f) {//S
		//f:info  (of method)
		var ns=newScope(ctx.scope);
		f.params.forEach(function (p,cnt) {
			var si=genSt(ST.PARAM,{
				klass:klass.name, name:f.name, no:cnt, declaringFunc:f
			});
			ns[p.name.text]=si;
			annotation(p,{scopeInfo:si,declaringFunc:f});
		});
		copyLocals(f, ns);
		ctx.enter({method:f,finfo:f, noWait:false}, function () {
			annotateVarAccesses(f.stmts, ns);
		});
		f.scope=ns;
		annotateSubFuncExprs(f.locals, ns);
		return ns;
	}
	function annotateSource() {//S
		ctx.enter({scope:topLevelScope}, function () {
			for (var name in methods) {
				if (debug) console.log("anon method1", name);
				var method=methods[name];
				initParamsLocals(method);//MAINVAR
				annotateMethodFiber(method);
			}
		});
	}
	initTopLevelScope();//S
	inheritSuperMethod();//S
	annotateSource();
}//B  end of annotateSource2
return {initClassDecls:initClassDecls, annotate:annotateSource2};
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
});

define('StackTrace',[],function (){
	var trc={};
	var pat=/(_trc_[A-Za-z0-9_]*).*[^0-9]([0-9]+):([0-9]+)[\s\)]*\r?$/;
	trc.isAvailable=function () {
		var scr=
			"({\n"+
			"    main :function _trc_func_17000000_0() {\n"+
			"      var a=(this.t.x);\n"+
			"    }\n"+
			"}).main();\n";
		var s;
		try {
			eval(scr);
		} catch (e) {
			s=e.stack;
			if (typeof s!="string") return false;
			var lines=s.split(/\n/);
			for (var i=0 ; i<lines.length; i++) {
				var p=pat.exec(lines[i]);
				if (p) return true;
			}
		}
		return false;
	};
	trc.get=function (e) {
		var s=e.stack;
		if (typeof s!="string") return false;
		var lines=s.split(/\n/);
		var res=[];
		for (var i=0 ; i<lines.length; i++) {
			var p=pat.exec(lines[i]);
			if (!p) continue;
			//var id=p[1];
			var fname=p[1];
			var row=p[2];
			var col=p[3];
			res.push({fname:fname, row:row,col:col});
			//var tri=ttb.decode(id);
			/*if (tri && tri.klass) {
				var str=tri.klass.src.js;
				var slines=str.split(/\n/);
				var sid=null;
				for (var j=0 ; j<slines.length && j+1<row ; j++) {
					var lp=/\$LASTPOS=([0-9]+)/.exec(slines[j]);
					if (lp) sid=parseInt(lp[1]);
				}
				//console.log("slines,row,sid",slines,row,sid);
				if (sid) {
					var stri=ttb.decode(sid);
					if (stri) res.push(stri);
				}
			}*/
		}
		/*$lastStackTrace=res;
		$showLastStackTrace=function () {
			console.log("StackTrace.get",res);
			//console.log("StackTrace.get",lines,res);
		};*/
		console.log("StackTrace.get",res);
		return res;
	};


	return trc;
});
define('Tonyu.TraceTbl',["Tonyu", "FS", "TError","StackTrace"],
function(Tonyu, FS, TError,trc) {
return Tonyu.TraceTbl=(function () {
	var TTB={};
	var POSMAX=1000000;
	var pathIdSeq=1;
	var PATHIDMAX=10000;
	var path2Id={}, id2Path=[];
	var path2Class={};
	TTB.add=function (klass, pos){
		var file=klass.src.tonyu;
		var path=file.path();
		var pathId=path2Id[path];
		if (pathId==undefined) {
			pathId=pathIdSeq++;
			if (pathIdSeq>PATHIDMAX) pathIdSeq=0;
			path2Id[path]=pathId;
			id2Path[pathId]=path;
		}
		path2Class[path]=klass;
		if (pos>=POSMAX) pos=POSMAX-1;
		var id=pathId*POSMAX+pos;
		return id;
	};
	var srcMap={};
	TTB.decodeOLD=function (id) {
		var pos=id%POSMAX;
		var pathId=(id-pos)/POSMAX;
		var path=id2Path[pathId];
		if (path) {
			var f=FS.get(path);
			var klass=path2Class[path];
			return TError("Trace info", klass || f, pos);
		} else {
			return null;
			//return TError("Trace info", "unknown src id="+id, pos);
		}
	};
	TTB.srcMap=srcMap;
	TTB.decode=function (id) {
		var pat=new RegExp("LASTPOS="+id+";//(.*)\r?\n");
		console.log("pat=",pat);
		for (var k in srcMap) {
			var r=pat.exec( srcMap[k] );
			if (r) {
				// user.Main:335
				//alert(r[1]);
				return r[1];
			} else {
				console.log("pat=",pat,"Not found in ",k);

			}
		}
	};
	TTB.find=function (e) {
		var trcs=trc.get(e);
		var trc1=trcs[0];
		if (!trc1) return null;
		var pat=new RegExp("LASTPOS=[0-9]+;//(.*)\r?");
		for (var k in srcMap) {
			console.log("Finding ", trc1.fname, " in ",k);
			var r=srcMap[k].indexOf(trc1.fname);
			if (r>=0) {
				console.log("fname found at ",r);
				var slines=srcMap[k].split(/\n/);
				var sid=null;
				var row=trc1.row;//-1;
				console.log("Scan from row=",row);
				for (var j=row ; j>=0 ; j--) {
					console.log("row ",j, slines[j]);
					if (slines[j]==null) break;
					var lp=pat.exec(slines[j]);
					if (lp) return lp[1];
				}
				console.log("Not found LASTPOS pat");
			} else {
				console.log("Not found in ",k);
			}
		}
	};

	TTB.addSource=function (key,src) {
		srcMap[key]=src;
	};
	return TTB;
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.TraceTbl");
});

define('compiledProject',["DeferredUtil","WebSite","assert"], function (DU,WebSite,A) {
	var CPR=function (ns, url) {
		A.is(arguments,[String,String]);
		return {
			getNamespace:function () {return ns;},
			sourceDir: function () {return null;},
			getDependingProjects: function () {return [];},// virtual
			loadDependingClasses: function (ctx) {
				//Same as projectCompiler /TPR/this/ (XXXX)
				var task=DU.directPromise();
				var myNsp=this.getNamespace();
				this.getDependingProjects().forEach(function (p) {
					if (p.getNamespace()==myNsp) return;
					task=task.then(function () {
						return p.loadClasses(ctx);
					});
				});
				return task;
			},
			loadClasses: function (ctx) {
				console.log("Load compiled classes ns=",ns,"url=",url);
				var d=new $.Deferred;
				var head = document.getElementsByTagName("head")[0] || document.documentElement;
				var script = document.createElement("script");
				script.src = url+(WebSite.serverType==="BA"?"?"+Math.random():"");
				var done = false;
				script.onload = script.onreadystatechange = function() {
					if ( !done && (!this.readyState ||
							this.readyState === "loaded" || this.readyState === "complete") ) {
						done = true;
						script.onload = script.onreadystatechange = null;
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}
						console.log("Done Load compiled classes ns=",ns,"url=",url,Tonyu.classes);
						//same as projectCompiler (XXXX)
						/*var cls=Tonyu.classes;
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
						}*/
						//------------------XXXX
						d.resolve();
					}
				};
				this.loadDependingClasses(ctx).then(function () {
					head.insertBefore( script, head.firstChild );
				});
				return d.promise();
			}
		}
	};
	return CPR;
});

if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('TypeChecker',["Visitor","Tonyu.Compiler","context"],function (Visitor,cu,context) {
	var ex={"[SUBELEMENTS]":1,pos:1,len:1};
	var ScopeTypes=cu.ScopeTypes;
	var genSt=cu.newScopeType;
	var stype=cu.getScopeType;
	var newScope=cu.newScope;
	//var nc=cu.nullCheck;
	var genSym=cu.genSym;
	var annotation3=cu.annotation;
	var getMethod2=cu.getMethod;
	var getDependingClasses=cu.getDependingClasses;
	var getParams=cu.getParams;
	var JSNATIVES={Array:1, String:1, Boolean:1, Number:1, Void:1, Object:1,RegExp:1,Error:1};
var TypeChecker={};
function visitSub(node) {//S
	var t=this;
	if (!node || typeof node!="object") return;
	//console.log("TCV",node.type,node);
	var es;
	if (node instanceof Array) es=node;
	else es=node[Grammar.SUBELEMENTS];
	if (!es) {
		es=[];
		for (var i in node) {
			es.push(node[i]);
		}
	}
	es.forEach(function (e) {
		t.visit(e);
	});
}

TypeChecker.checkTypeDecl=function (klass,env) {
	function annotation(node, aobj) {//B
		return annotation3(klass.annotation,node,aobj);
	}
	var typeDeclVisitor=Visitor({
		varDecl: function (node) {
			//console.log("TCV","varDecl",node);
			if (node.value) this.visit(node.value);
			if (node.name && node.typeDecl) {
				var va=annotation(node.typeDecl.vtype);
				console.log("var typeis",node.name+"", node.typeDecl.vtype, va.resolvedType);
				var a=annotation(node);
				var si=a.scopeInfo;// for local
				var info=a.info;// for field
				if (si) {
					console.log("set var type",node.name+"", va.resolvedType );
					si.vtype=va.resolvedType;
				} else if (info) {
					console.log("set fld type",node.name+"", va.resolvedType );
					info.vtype=va.resolvedType;
				}
				/*} else if (a.declaringClass) {
					//console.log("set fld type",a.declaringClass,a.declaringClass.decls.fields[node.name+""],node.name+"", node.typeDecl.vtype+"");
					a.declaringClass.decls.fields[node.name+""].vtype=node.typeDecl.vtype;
				}*/
			}
		},
		paramDecl: function (node) {
			if (node.name && node.typeDecl) {
				console.log("param typeis",node.name+"", node.typeDecl.vtype+"");
				var va=annotation(node.typeDecl.vtype);
				var a=annotation(node);
				var si=a.scopeInfo;
				if (si && va.resolvedType) {
					console.log("set param type",node.name+"", node.typeDecl.vtype+"");
					si.vtype=va.resolvedType;
				}
			}
		},
		funcDecl: function (node) {
			//console.log("Visit funcDecl",node);
			var head=node.head;
			var finfo=annotation(node).info;
			if (head.rtype) {
				console.log("ret typeis",head.name+"", head.rtype.vtype+"");
				finfo.rtype=head.rtype.vtype;
			}
			this.visit(head);
			this.visit(node.body);
		}
	});
	typeDeclVisitor.def=visitSub;//S
	typeDeclVisitor.visit(klass.node);
};
TypeChecker.checkExpr=function (klass,env) {
		function annotation(node, aobj) {//B
			return annotation3(klass.annotation,node,aobj);
		}
		var typeAnnotationVisitor=Visitor({
			number: function (node) {
				annotation(node,{vtype:Number});
			},
			literal: function (node) {
				annotation(node,{vtype:String});
			},
			postfix:function (node) {
			var a=annotation(node);
			if (a.memberAccess) {
				var m=a.memberAccess;
				var vtype=visitExpr(m.target);
				if (vtype) {
				var f=cu.getField(vtype,m.name);
				console.log("GETF",vtype,m.name,f);
				if (f && f.vtype) {
					annotation(node,{vtype:f.vtype});
				}
				}
			} else {
				this.visit(node.left);
				this.visit(node.op);
			}
			},
			varAccess: function (node) {
				var a=annotation(node);
				var si=a.scopeInfo;
				if (si) {
					if (si.vtype) {
						console.log("VA typeof",node.name+":",si.vtype);
						annotation(node,{vtype:si.vtype});
					} else if (si.type===ScopeTypes.FIELD) {
						var fld;
						fld=klass.decls.fields[node.name+""];
						if (!fld) {
							// because parent field does not contain...
							console.log("TC Warning: fld not found",klass,node.name+"");
							return;
						}
						var vtype=fld.vtype;
						if (!vtype) {
							console.log("VA vtype not found",node.name+":",fld);
						} else {
							annotation(node,{vtype:vtype});
							console.log("VA typeof",node.name+":",vtype);
						}
					}
				}
			}
		});

	var ctx=context();
	typeAnnotationVisitor.def=visitSub;
	typeAnnotationVisitor.visit(klass.node);
	function visitExpr(node) {
		typeAnnotationVisitor.visit(node);
		var va=annotation(node);
		return va.vtype;
	}
};
return TypeChecker;
});

define('ProjectCompiler',["Tonyu","Tonyu.Compiler.JSGenerator","Tonyu.Compiler.Semantics",
		"Tonyu.TraceTbl","FS","assert","DeferredUtil","compiledProject",
		"source-map","TypeChecker"],
		function (Tonyu,JSGenerator,Semantics,
				ttb,FS,A,DU,CPR,
				S,TypeChecker) {
var TPRC=function (dir) {
	A(FS.isFile(dir) && dir.isDir(), "projectCompiler: "+dir+" is not dir obj");
	var TPR={env:{}};
	var traceTbl=Tonyu.TraceTbl;//();
	var F=DU.throwF;
	TPR.env.traceTbl=traceTbl;
	TPR.EXT=".tonyu";
	TPR.getDir=function () {return dir;};
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
	};
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
	TPR.getName=function () { return dir.name().replace(/\/$/,""); };
	TPR.getNamespace=function () {
		var opt=TPR.getOptions();
		return A(opt.compiler.namespace,"namespace not specified opt="+JSON.stringify(opt));
	};
	TPR.getPublishedURL=function () {//ADDBA
		if (TPR._publishedURL) return TPR._publishedURL;
		return DU.requirejs(["Auth"]).then(function (Auth) {
			return Auth.publishedURL(TPR.getName()+"/");
		}).then(function (r) {
			TPR._publishedURL=r;
			return r;
		});
	};
	TPR.getOutputFile=function (lang) {
		var opt=TPR.getOptions();
		var outF=TPR.resolve(A(opt.compiler.outputFile,"outputFile should be specified in options"));
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
		TPR.showProgress("LoadClasses: "+dir.name());
		console.log("LoadClasses: "+dir.path());
		ctx=initCtx(ctx);
		var visited=ctx.visited||{};
		if (visited[TPR.path()]) return DU.directPromise();
		visited[TPR.path()]=true;
		return TPR.loadDependingClasses(ctx).then(function () {
			return TPR.shouldCompile();
		}).then(function (sc) {
			if (sc) {
				return TPR.compile(ctx);
			} else {
				var outF=TPR.getOutputFile("js");
				TPR.showProgress("Eval "+outF.name());
				return evalFile(outF);//.then(F(copyToClasses));
			}
		});
	};
	function initCtx(ctx) {
		//どうしてclassMetasとclassesをわけるのか？
		// metaはFunctionより先に作られるから
		var env=TPR.env;
		if (!ctx) ctx={};
		if (!ctx.visited) {
			ctx={visited:{}, classes:(env.classes=env.classes||Tonyu.classMetas),options:ctx};
		}
		return ctx;
	}
	TPR.compile=function (ctx/*or options(For external call)*/) {
		Tonyu.runMode=false;
		TPR.showProgress("Compile: "+dir.name());
		console.log("Compile: "+dir.path());
		ctx=initCtx(ctx);
		var myNsp=TPR.getNamespace();
		var baseClasses,ctxOpt,env,myClasses,fileAddedOrRemoved,sf,ord;
		var compilingClasses;
		return TPR.loadDependingClasses(ctx).then(F(function () {
			baseClasses=ctx.classes;
			ctxOpt=ctx.options;
			env=TPR.env;
			env.aliases={};
			env.parsedNode=env.parsedNode||{};
			env.classes=baseClasses;
			for (var n in baseClasses) {
				var cl=baseClasses[n];
				env.aliases[ cl.shortName] = cl.fullName;
			}
			return TPR.showProgress("scan sources");
		})).then(F(function () {
			myClasses={};
			fileAddedOrRemoved=!!ctxOpt.noIncremental;
			sf=TPR.sourceFiles(myNsp);
			for (var shortCn in sf) {
				var f=sf[shortCn];
				var fullCn=myNsp+"."+shortCn;
				if (!baseClasses[fullCn]) {
					console.log("Class",fullCn,"is added.");
					fileAddedOrRemoved=true;
				}
				var m=Tonyu.klass.getMeta(fullCn);
				myClasses[fullCn]=baseClasses[fullCn]=m;
				Tonyu.extend(m,{
					fullName:  fullCn,
					shortName: shortCn,
					namespace: myNsp
				});
				m.src=m.src||{};
				m.src.tonyu=f;
				env.aliases[shortCn]=fullCn;
			}
			return TPR.showProgress("update check");
		})).then(F(function () {
			for (var n in baseClasses) {
				if (myClasses[n] && myClasses[n].src && !myClasses[n].src.js) {
					//前回コンパイルエラーだとここにくるかも
					console.log("Class",n,"has no js src");
					fileAddedOrRemoved=true;
				}
				if (!myClasses[n] && baseClasses[n].namespace==myNsp) {
					console.log("Class",n,"is removed");
					Tonyu.klass.removeMeta(n);
					fileAddedOrRemoved=true;
				}
			}
			if (!fileAddedOrRemoved) {
				compilingClasses={};
				for (var n in myClasses) {
					if (Tonyu.klass.shouldCompile(myClasses[n])) {
						compilingClasses[n]=myClasses[n];
					}
				}
			} else {
				compilingClasses=myClasses;
			}
			return TPR.showProgress("initClassDecl");
		})).then(F(function () {
			for (var n in compilingClasses) {
				console.log("initClassDecl: "+n);
				Semantics.initClassDecls(compilingClasses[n], env);/*ENVC*/
			}
			return TPR.showProgress("order");
		})).then(F(function () {
			ord=orderByInheritance(myClasses);/*ENVC*/
			ord.forEach(function (c) {
				if (compilingClasses[c.fullName]) {
					console.log("annotate :"+c.fullName);
					Semantics.annotate(c, env);
				}
			});
			try {
				/*for (var n in compilingClasses) {
					TypeChecker.checkTypeDecl(compilingClasses[n],env);
				}
				for (var n in compilingClasses) {
					TypeChecker.checkExpr(compilingClasses[n],env);
				}*/
			} catch(e) {
				console.log("Error in Typecheck(It doesnt matter because Experimental)",e.stack);
			}
			return TPR.showProgress("genJS");
		})).then(F(function () {
			//throw "test break";
			return TPR.genJS(ord.filter(function (c) {
				return compilingClasses[c.fullName];
			}));
			//return TPR.showProgress("concat");
		})).then(F(function () {
			var copt=TPR.getOptions().compiler;
			if (!copt.genAMD) {
				return TPR.concatJS(ord);
			}
		}));
	};
	TPR.genJS=function (ord) {
		// 途中でコンパイルエラーを起こすと。。。
		var env=TPR.env;
		return DU.each(ord,function (c) {
			console.log("genJS :"+c.fullName);
			JSGenerator.genJS(c, env);
			return TPR.showProgress("genJS :"+c.fullName);
		});
	};
	TPR.concatJS=function (ord) {
		//var cbuf="";
		var outf=TPR.getOutputFile();
		TPR.showProgress("generate :"+outf.name());
		console.log("generate :"+outf);
		var mapNode=new S.SourceNode(null,null,outf.path());
		ord.forEach(function (c) {
			var cbuf2,fn=null;
			if (typeof (c.src.js)=="string") {
				cbuf2=c.src.js+"\n";
			} else if (FS.isFile(c.src.js)) {
				fn=c.src.js.path();
				cbuf2=c.src.js.text()+"\n";
			} else {
				throw new Error("Src for "+c.fullName+" not generated ");
			}
			var snd;
			if (c.src.map) {
				snd=S.SourceNode.fromStringWithSourceMap(cbuf2,new S.SourceMapConsumer(c.src.map));
			} else {
				snd=new S.SourceNode(null,null,fn,cbuf2);
			}
			mapNode.add(snd);
		});
		var mapFile=outf.sibling(outf.name()+".map");
		var gc=mapNode.toStringWithSourceMap();
		outf.text(gc.code+"\n//# sourceMappingURL="+mapFile.name());
		mapFile.text(gc.map+"");
		return evalFile(outf);
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
		//nsp=nsp || TPR.getNamespace();//DELJSL
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
		//var myNsp||TPR.getNamespace();//DELJSL
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
	TPR.showProgress=function (m) {
	};
	TPR.setAMDPaths=function (paths) {
		TPR.env.amdPaths=paths;
	};
	TPR.genXML=function (cname) {//"user.Main"
		requirejs(["XMLBuffer"],function (x) {
			var c=TPR.env.classes[cname];
			if (!c) throw new Error("Class "+cname+" not found");
			if (!c.node) throw new Error("Node not found compile it");
			var b=x(c.src.tonyu.text());
			b(c.node);
			console.log(b.buf);
		});
	};
	return TPR;
}
if (typeof sh=="object") {
	sh.tonyuc=function (dir) {
		var pr=TPRC(sh.resolve(dir));
		return pr.compile();
	};
}
return TPRC;
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

define('ShellParser',["Shell","DeferredUtil"],function (sh,DU) {
    var envMulti=/\$\{([^\}]*)\}/;
    var envSingle=/^\$\{([^\}]*)\}$/;
    var F=DU.throwF;
    sh.enterCommand=function (s) {
        if (!this._history) this._history=[];
        this._history.push(s);
        var args=this.parseCommand(s);
        if (this._skipto) {
            if (args[0]=="label") {
                this.label(args[1]);
            } else {
                this.echo("Skipping command: "+s);
            }
        } else {
            return this.evalCommand(args);
        }
    };
    sh.label=function (n) {
        this._labels=this._labels||{};
        this._labels[n]=this._history.length;
        if (this._skipto==n) delete this._skipto;
    };
    sh["goto"]=function (n,cond) {
        if (arguments.length==1) cond=true;
        var t=this;
        return $.when(cond).then(function (c) {
            if (!c) return;
            t._labels=t._labels||{};
            var pc=t._labels[n];
            if (pc) {
                if (!t._pc) {
                    t._pc=pc;
                    return t.gotoLoop();
                } else {
                    t._pc=pc;
                }
            } else {
                t._skipto=n;
            }
        });
    };
    sh.gotoLoop=function () {
        var t=this;
        var cnt=0;
        return DU.loop(F(function () {
            if (cnt++>100) {
                delete t._pc;
                throw new Error("Are infinite loops scary?");
            }
            if (t._skipto || !t._pc || t._pc>=t._history.length) {
                delete t._pc;
                return DU.brk();
            }
            var s=t._history[t._pc++];
            var args=t.parseCommand(s);
            return t.evalCommand(args);
        }));
    };
    sh.sleep=function (t) {
        var d=new $.Deferred;
        t=parseFloat(t);
        setTimeout(function () {d.resolve();},t*1000);
        return d.promise();
    };
    sh.include=function (f) {
        f=this.resolve(f,true);
        var t=this;
        var ln=f.lines();
        return DU.each(ln,F(function (l) {
            return t.enterCommand(l);
        }));
    };
    /*
    set a 1
    label loop
    echo ${a}
    calc add ${a} 1
    set a ${_}
    goto loop ( calc lt ${a} 10 )
    */
    sh.parseCommand=function (s) {
        var space=/^\s*/;
        var nospace=/^([^\s]*(\\.)*)*/;
        var dq=/^"([^"]*(\\.)*)*"/;
        var sq=/^'([^']*(\\.)*)*'/;
        var lpar=/^\(/;
        var rpar=/^\)/;
        function parse() {
            var a=[];
            while(s.length) {
                s=s.replace(space,"");
                var r;
                if (r=dq.exec(s)) {
                    a.push(expand( unesc(r[1]) ));
                    s=s.substring(r[0].length);
                } else if (r=sq.exec(s)) {
                    a.push(unesc(r[1]));
                    s=s.substring(r[0].length);
                } else if (r=lpar.exec(s)) {
                    s=s.substring(r[0].length);
                    a.push( parse() );
                } else if (r=rpar.exec(s)) {
                    s=s.substring(r[0].length);
                    break;
                } else if (r=nospace.exec(s)) {
                    a.push(expand(unesc(r[0])));
                    s=s.substring(r[0].length);
                } else {
                    break;
                }
            }
            var options,args=[];
            a.forEach(function (ce) {
                var opt=/^-([A-Za-z_0-9]+)(=(.*))?/.exec(ce);
                if (opt) {
                    if (!options) options={};
                    options[opt[1]]=opt[3]!=null ? opt[3] : true;
                } else {
                    if (options) args.push(options);
                    options=null;
                    args.push(ce);
                }
            });
            if (options) args.push(options);
            return args;
        }
        var args=parse();
        return args;
        /*console.log("parsed:",JSON.stringify(args));
        var res=this.evalCommand(args);
        return res;*/
        function expand(s) {
            var r;
            /*if (r=envSingle.exec(s)) {
                return ["get",r[1]];
            }
            if (!(r=envMulti.exec(s))) return s;*/
            var ex=["strcat"];
            while(s.length) {
                r=envMulti.exec(s);
                if (!r) {
                    ex.push(s);
                    break;
                }
                if (r.index>0) {
                    ex.push(s.substring(0,r.index));
                }
                ex.push(["get",r[1]]);
                s=s.substring(r.index+r[0].length);
            }
            if (ex.length==2) return ex[1];
            return ex;
        }
        function unesc(s) {
            return s.replace(/\\(.)/g,function (_,b){
                return b;
            });
        }
    };
    sh.evalCommand=function (expr) {
        var t=this;
        if (expr instanceof Array) {
            if (expr.length==0) return;
            var c=expr.shift();
            var f=this[c];
            if (typeof f!="function") throw new Error(c+": Command not found");
            var a=[];
            while(expr.length) {
                var e=expr.shift();
                a.push( this.evalCommand(e) );
            }
            return $.when.apply($,a).then(F(function () {
                return f.apply(t,arguments);
            }));
        } else {
            return expr;
        }   
    };
    sh.calc=function (op) {
        var i=1;
        var r=parseFloat(arguments[i]);
        for(i=2;i<arguments.length;i++) {
            var b=arguments[i];
            switch(op) {
                case "add":r+=parseFloat(b);break;
                case "sub":r-=parseFloat(b);break;
                case "mul":r*=parseFloat(b);break;
                case "div":r/=parseFloat(b);break;
                case "lt":r=(r<b);break;
            }     
        }
        this.set("_",r);
        return r;
    };
    sh.history=function () {
        var t=this;
        this._history.forEach(function (e) {
            t.echo(e);    
        });
    };
});
define('ShellUI',["Shell","UI","FS","Util","ShellParser"], 
function (shParent,UI,FS,Util,shp) {
    var res={};
    var sh=shParent.clone();
    res.show=function (dir) {
        var d=res.embed(dir);
        d.dialog({width:600,height:500});
    };
    res.embed=function (dir) {
        if (!res.d) {
            res.d=UI("div",{title:"Shell"},["div",{$var:"inner"},"Type 'help' to show commands.",["br"]]);
            res.inner=res.d.$vars.inner;
            sh.prompt();
        }
        var d=res.d;
        return d;
    };
    sh.cls=function () {
        res.d.$vars.inner.empty();
    };
    function hitBottom() {
        res.inner.closest(".ui-dialog-content").scrollTop(res.inner.height());
    }

    sh.prompt=function () {
        var t=this;
        var line=UI("div",
            ["input",{$var:"cmd",size:40,on:{keydown: kd}}],
            ["pre",{$var:"out","class":"shell out"},["div",{$var:"cand","class":"shell cand"}]]
        );
        var cmd=line.$vars.cmd;
        var out=line.$vars.out;
        var cand=line.$vars.cand;
        line.appendTo(res.inner);
        hitBottom();
        cmd.focus();
        //var d=new $.Deferred;
        t.setout({log:function () {
           // return $.when.apply($,arguments).then(function () {
                var a=[];
                for (var i=0; i<arguments.length; i++) {
                    a.push(arguments[i]);
                }
                if (a[0] instanceof $) {
                    out.append(a[0]);
                } else {
                    out.append(UI("span",a.join(" ")+"\n"));
                }
            //});
        },err:function (e) {
            if (typeof e=="object") {
                if (e.responseText) e=e.responseText;
                else e=JSON.stringify(e);
            }
            out.append(UI("div",{"class": "shell error"},e,["br"],["pre",e.stack]));
        }});
        return;// d.promise();
        function kd(e) {
            if (e.which==9) {
                e.stopPropagation();
                e.preventDefault();
                comp();
                return false;
            }
            if (e.which==13) {
                cand.empty();
                exec(cmd.val());
            }
        }
        function exec() {
            try {
                var sres=t.enterCommand(cmd.val());
                cmd.blur();
                return $.when(sres).then(function (sres) {
                    if (typeof sres=="object") {
                        if (sres instanceof Array) {
                            var table=UI("table");
                            var tr=null;
                            var cnt=0;
                            sres.forEach(function (r) {
                                if (typeof r!="string") return;
                                if (!tr) tr=UI("tr").appendTo(table);
                                tr.append(UI("td",r));
                                cnt++;if(cnt%3==0) tr=null;
                            });
                            table.appendTo(out);
                        } else {
                            out.append(JSON.stringify(sres));
                        }
                    } else {
                        out.append(sres);
                    }
                    t.prompt();
                }).fail(function (e) {
                    t.err(e);
                    t.prompt();
                });
            } catch(e) {
                t.err(e);
                //out.append(UI("div",{"class": "shell error"},e,["br"],["pre",e.stack]));
                t.prompt();
            }
        }
        function comp(){
            var c=cmd.val();
            var cs=c.split(" ");
            var fn=cs.pop();
            var canda=[];
            if (cs.length==0) {
                for (var k in sh) {
                    if (typeof sh[k]=="function" && Util.startsWith(k, fn)) {
                        canda.push(k);
                    }
                }
            } else {
                var f=sh.resolve(fn,false);
                //console.log(fn,f);
                if (!f) return;
                var d=(f.isDir() ? f : f.up());
                d.each(function (e) {
                    if ( Util.startsWith(e.path(), f.path()) ) {
                        canda.push(e.name());
                    }
                });
            }
            if (canda.length==1) {
                var fns=fn.split("/");
                fns.pop();
                fns.push(canda[0]);
                cs.push(fns.join("/"));
                cmd.val(cs.join(" "));
                cand.empty();
            } else {
                cand.text(canda.join(", "));
            }
            hitBottom();
            //console.log(canda);
            //cmd.val(cmd.val()+"hokan");
        }
    };
    sh.edit=function (f) {
        f=this.resolve(f);
        var u=UI("div",
            ["div",["textarea",{rows:10,cols:60,$var:"prog"}]],
            ["div",["button",{on:{click:save}},"Save"]]
        );
        if (f.exists()) u.$vars.prog.val(f.text());
        return this.echo(u);
        function save() {
            f.text( u.$vars.prog.val() );
        }
    };
    sh.window=shParent.window=function () {
        res.show(sh.cwd);
    };
    sh.atest=function (a,b,options) {
        console.log(a,b,options);
    };
    var oldcat=sh.cat;
    sh.cat=function (file,options) {
        file=sh.resolve(file, true);
        if (file.contentType().match(/^image\//)) {
            return file.getContent(function (c) {
                sh.echo(UI("img",{src:c.toURL()}));
            });
        } else {
            return oldcat.apply(sh,arguments);
        }
    };

    return res;
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
requirejs([], function () {

});
define("runtime", function(){});

define('searchDialog',["UI","Shell"], function (UI,sh) {
    var res={};
    res.show=function (prjDir, onLineClick) {
        var d=res.embed(prjDir,onLineClick);
        d.dialog({width:600});
    };
    res.embed=function (prjDir, onLineClick) {
        if (!res.d) {
            res.d=UI("div",{title:"検索"},
                    ["div",
                     ["span","検索語"],
                     ["input",{$edit:"word",on:{enterkey:function () {
                         res.d.start();
                     }}}]],
                     ["div", {$var:"validationMessage", css:{color:"red"}}],
                     ["button", {$var:"OKButton", on:{click: function () {
                         res.d.start();
                     }}}, "検索"],
                     ["div",{style:"overflow-y:scroll; height:200px"},
                      ["table",{$var:"searchRes"}]]
            );
        }
        var d=res.d;
        var model={word:""};
        d.$edits.load(model);
        d.start=function () {
            d.$vars.searchRes.empty();
            var sres=sh.grep(model.word, prjDir);
            sres.forEach(function (l) {
                if (l.file.name()=="concat.js") {
                    return;
                }
                d.$vars.searchRes.append(
                        UI("tr",
                                ["td",{on:{click:doLineClick}},l.file.name()+"("+l.lineNo+")"],
                                ["td",{on:{click:doLineClick}},l.line]
                        ));
                function doLineClick() {
                    if (onLineClick) onLineClick(l);
                }
            });
        };
        return d;
    };
    return res;
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
        ul1.append(li);
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
            Menu.appendMain(mainObj);
            //ul2=$("#submenu_"+mainID);
            return;
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
                if (!k in a) console.log(k," is not in a",k[b]);
                if (!k in b) console.log(k," is not in b",k[a]);
                if (typeof k[a]=="object" && typeof k[b]=="object") {
                    diffTree(k[a],k[b]);
                } else {
                    if (k[a]!=k[b]) console.log(k," is differ",k[a],k[b]);
                }
            }
        }
        function getLocalDirInfo() {
            console.log("gerLCD");
            var res2=local.getDirTree({style:"flat-relative",excludes:[".sync/"]});
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
        options.excludes=options.excludes||[];
        options.excludes=options.excludes.concat(syncInfoDir.name());
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
        var req={base:remote.path(),excludes:JSON.stringify(options.excludes),token:""+Math.random()};
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
                d = new $.Deferred;
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
            return res={msg:res,uploads:upds,downloads: downloads,user:user,classid:classid};
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

define('RunDialog',["UI","DiagAdjuster"],function (UI,DA) {
    var res={};
    res.show=function (src, runURL, options) {
        options=options||{};
        window.dialogClosed=false;
        var d=res.embed(src, runURL, options);
        d.dialog({width:16*((options.height+10)/9),position: { my: "center top", at: "right bottom"},
            close:function(){
		        window.dialogClosed=true;
		        $("#ifrmDlg").remove();
		        if(typeof options.toEditor == "function") options.toEditor();
	        },
            //resize:function(e,u){
                //console.log(u.size);
                //$("#iBrowser").css({width:u.size.width-50,height:u.size.height-120});
                //$("#ifrmDlg").attr({width:u.size.width-50,height:u.size.height-120});
            //    var d=res.d;
            //    $("#ifrmDlg").attr({width:d.width(),height:d.height()-d.$vars.OKButton.height()});
                //if (res.da) res.da.handleResize();
            //}
            resize:handleResize
        });//,height:options.height?options.height-50:400});
        handleResize();
        function handleResize(e,u){
            var d=res.d;
            $("#ifrmDlg").attr({width:d.width(),height:d.height()-d.$vars.OKButton.height()});
        }
        if($("#ifrmDlg")[0]) {
            $("#ifrmDlg")[0].contentWindow.onload=function(){
                var cons=$("#ifrmDlg")[0].contentWindow.document.getElementById("console");
                if (cons) cons.style.fontSize=options.font+"px";
            }
        }
    };
    res.embed=function (src, runURL, options) {
        if (!options) options={};
        if (!res.d) {
            res.d=UI("div",{title:"実行画面ダイアログ",css:{"overflow":"hidden"}},
                    ["div",{id:"iBrowser"},
                          ["iframe",{id:"ifrmDlg",width:16*(options.height/9)||970,height:options.height||400,src:runURL}]
                    ],
                    ["button", {type:"button",$var:"OKButton", on:{click: function () {
                        res.d.dialog("close");
                    }}}, "OK"]
            );
            res.da=new DA(res.d);
            res.da.afterResize=function (d) {
                console.log("DA",d.height());
                $("#ifrmDlg").attr({width:d.width(),height:d.height()-res.d.$vars.OKButton.height()});
            };            
        }else{
            $("#ifrmDlg").remove();
		    //$("#iBrowser").append(UI("iframe",{id:"ifrmDlg",width:570,height:options.height||400,src:runURL}));
		    $("#iBrowser").append(UI("iframe",{id:"ifrmDlg",width:16*(options.height/9)||970,height:options.height||400,src:runURL}));
	    }
	    setTimeout(function () {
            $("#ifrmDlg").focus();
        },100);
        $("#ifrmDlg").attr(src,runURL);
        //if($("#ifrmDlg")[0]) console.log($("#ifrmDlg")[0].contentWindow.document.body);
        /*setTimeout(function(){if($("#ifrmDlg")[0]) {
            var cons=$("#ifrmDlg")[0].contentWindow.document.getElementById("console");
            if (cons) cons.style.fontSize=options.font+"px";
        }},100);*/
        
        var d=res.d;
        return d;
    };
    return res;
});
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
			if (FS.PathUtil.isURL(urlHead)) {
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
            var src=dp.parseFromString(f.text(),"text/html");
            if (this.options.onparse) {
                src=this.options.onparse(src,document);
            }
		    var self=this;
		    var iwin=this.window;
		    var idoc=iwin.document;
            return $.when().then(function () {
                return self.appendNode(
                    src.getElementsByTagName("html")[0],
                    idoc.getElementsByTagName("html")[0]);
            }).then(function () {
                if(typeof (iwin.onload)==="function") iwin.onload();
            });
		},
		appendNode:function appendNode(src,dst) {
			var self=this;
			var idoc=this.window.document;
			var c=src.childNodes;
			return DU.tryLoop(function (i){
				var d;
				if (!(i<c.length)) return DU.brk();
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
						var value=n.getAttribute(name);
						if (n.tagName.toLowerCase()=="a" && name=="href" &&
						FS.PathUtil.isRelativePath(value)) {
							value="javascript:LocalBrowserInfo.open('"+value+"');";
						}
						if (name=="src") {
							value=self.convertURL(value);
							if (n.tagName.toLowerCase()=="script") {
								d=new $.Deferred;
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
    var F=DU.tr;
    LocalBrowser=function (dom,options) {
        this.targetAttr=options||{};
        this.targetArea=dom;//=UI("iframe");
    };
    p=LocalBrowser.prototype;
    p.close=function () {
        $(this.targetArea).empty();
    };
    p.resize=function (w,h) {
        if (this.iframe) {
            this.iframe.attr({
                    width:w,height:h
            });
            this.targetAttr.width=w;
            this.targetAttr.height=h;
        }
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
        i.on("load",function () {
            if (loaded) return;
            loaded=true;
            iwin=i[0].contentWindow;
            /*if (options.globals) {
                for(var k in options.globals) {
                    iwin[k]=options.globals[k];
                }
            }*/
            iwin.LocalBrowserInfo=new LocalBrowserInfoClass(thiz,iwin,f,options);
            iwin.LocalBrowserInfo.wrapErrorHandler(onerror);
            //idoc=iwin.document;
            return iwin.LocalBrowserInfo.loadNode(f).then(function () {
                onload.apply(i[0],[]);
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
        var d=new $.Deferred;
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
    p=LocalBrowserWindow.prototype;
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
        var d=new $.Deferred;
        this.echo(place);
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

define('RunDialog2',["UI","LocalBrowser","LocalBrowserWindow","DiagAdjuster"],
function (UI, LocalBrowser,LocalBrowserWindow,DA) {
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
            return res.lbw.open(runFile);
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
                res.b.resize(d.width(),d.height()-d.$vars.OKButton.height());
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
    res.embed=function (runFile, options) {
        options=options||{};
        if (!res.d) {
            res.d=UI("div",{title:"実行画面ダイアログ",id:"runDlg",css:{overflow:"hidden"}},
                    ["div",{$var:"browser"}],
                    ["button", {type:"button",$var:"OKButton", on:{click: function () {
                        res.d.dialog("close");
                    }}}, "閉じる"],
                    (true?"":["button", {type:"button",$var:"WButton", on:{click: function () {
                        if (res.hasLocalBrowserWindow()) res.lbw.close();
                        res.lbw=new LocalBrowserWindow({
                            onload:function () {
                                console.log(this);
                                var cons=this.contentWindow.document.getElementById("console");
                                if (cons) cons.style.fontSize=options.font+"px";
                            }
                        });
                        res.lbw.open(runFile);
                        res.d.dialog("close");
                    }}}, "別ウィンドウ"])
            );
            res.da=new DA(res.d);
            res.da.afterResize=function (d) {
                if (res.b && res.b.iframe) {
                    res.b.iframe.attr({
                        width:d.width(),
                        height:d.height()-res.d.$vars.OKButton.height()});
                }
            };
            res.b=new LocalBrowser(res.d.$vars.browser[0],{
                id:"ifrmDlg",
                width:400,
                height:400
            });
        }
        setTimeout(function () {
            res.b.focus();
        },100);
        res.b.open(runFile,{
            onload:function () {
                console.log(this);
                var cons=this.contentWindow.document.getElementById("console");
                if (cons) cons.style.fontSize=options.font+"px";
            }
        });
        //if (res.da) res.da.handleResize();
        return res.d;
    };
    return res;
});

define('logToServer',[],function () {
    var c=0,time=(new Date().getTime());
    function logToServer(content) {
		var t=(new Date().getTime());
		c+=1/time-t;
		return $.post("dump.php",{data:content+""}).then(function (r) {
			console.log(r);
		}).fail(function(e){
			console.log(e);
		});
    }
    return logToServer;
});
define('logToServer2',[],function () {
    var c=0,time=(new Date().getTime());
    function logToServer2(filePath,codeL,codeH,result,detail,lang) {
        var d=new Date();
		var t=(new Date().getTime());
		c+=1/time-t;
		code={};
		code[lang]=codeL;
		code["HTML"]=codeH;
        if (detail instanceof Error) {
            var eobj={stack:detail.stack,message:detail+""};
            for (var k in detail) {
                if (k==="errorParams") {
                    eobj[k]=detail[k]+"";
                } else {
                    eobj[k]=detail[k];
                }
            }
            detail=eobj;
        }
        var data={date:d.getFullYear()+"/"+dataPadding(d.getMonth()+1)+"/"+dataPadding(d.getDate()),time:dataPadding(d.getHours())+":"+dataPadding(d.getMinutes())+":"+dataPadding(d.getSeconds()),lang:lang,filename:filePath,result:result,detail:detail,code:code};
        //console.log("DATA",data);
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

define('zip',["FS","Shell","Util"],function (FS,sh,Util) {
    if (typeof JSZip=="undefined") return {};
    var zip={};
    zip.zip=function (dir,options) {
        var zip = new JSZip();
        function loop(dst, dir) {
            dir.each(function (f) {
                if (f.isDir()) {
                    var sf=dst.folder(f.name());
                    loop(sf, f);
                } else {
                    dst.file(f.name(),f.text());
                }
            });
        }
        loop(zip, dir);
        //zip.file("Hello.txt", "Hello World\n");
        //var img = zip.folder("images");
        //img.file("smile.gif", imgData, {base64: true});
        var content = zip.generate({type:"blob"});
        return content;
    };
    if (typeof saveAs!="undefined") {
        sh.dlzip=function (dir) {
            dir=sh.resolve(dir);
            var content=zip.zip(dir);
            saveAs(content, dir.name().replace(/\//g,"")+".zip");
        }
    }
    // same as SFileNW.js
    var binMap={".png": "image/png", ".jpg":"image/jpg", ".gif": "image/gif", ".jpeg":"image/jpg",
            ".mp3":"audio/mp3", ".ogg":"audio/ogg"};
    zip.unzip=function (arrayBuf,destDir) {
        var zip=new JSZip(arrayBuf);
        for (var i in zip.files) {
            var zipEntry=zip.files[i];
            var dest=destDir.rel(zipEntry.name);
            for (var ext in binMap) {
                var text;
                if (dest.endsWith(ext)) {
                    var ct=binMap[ext];
                    text="data:"+ct+";base64,"+Util.Base64_From_ArrayBuffer(zipEntry.asArrayBuffer());
                } else {
                    text=zipEntry.asText();
                }
                dest.text(text);
            }
            console.log(zipEntry.name);
        }
    };
    return zip;
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
define('Auth',["FS","md5","WebSite","DeferredUtil"], function (FS,md5,WebSite,DU) {
    Auth={
        check:function () {
            var self=this;
            //console.log("CHK");
            return $.when(
                $.get(WebSite.controller+"?Login/curclass&"+Math.random()),
                $.get(WebSite.controller+"?Login/curuser&"+Math.random()),
                $.get(WebSite.controller+"?Login/curTeacher&"+Math.random())
            ).then(function (c,u,t) {
                //console.log("CHKE",c[0],u[0]);
                self.login(c[0],u[0],t[0]);
                return self;
            });
        },
        assertLogin: function (options) {
            var self=this;
            return DU.promise(function (succ,fail) {
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
        hashCache:{}
    };
    return Auth;
});

define('CommentDialog',["UI"],function (UI) {
    var res={};
    res.show=function (file, options) {
        var d=res.embed(file, options);
        d.dialog({width:600});
    };
    res.embed=function (file, options) {
        if (!options) options={};
        if (!res.d) {
            res.tx=$("<textarea>").attr({rows:20,cols:60,readonly:true});
            res.d=UI("div",{title:"採点結果"},res.tx);
        }
        res.tx.val(file.text());
        var d=res.d;
        return d;
    };
    return res;
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

                $("<button>OK</button>").click(function () {
                    //alert("clicked");
            	    res.d.done();
            })
            );
        }
        res.tx.val(text);
        var d=res.d;
/*        d.$vars.OKButton.attr("disabled", false);
        d.$vars.OKButton.val("OK");*/
        d.done=function () {
            onOK($("#fileCont").val(),$("#overwrite").prop("checked")	);
            d.dialog("close");
        };
        return d;
    }
    return res;
});

define('NotificationDialog',["UI"], function (UI) {
    var res={};
	res.show=function (mesg,options) {
    	var d=res.embed(mesg,options);
    	if (!res.opened) {
        	d.dialog({width:500,height:100,
        	    position: { my: "left bottom", at: "left bottom"},
        	    close: function () {
        	        res.opened=false;
        	    }
        	});
    	}
    	res.opened=true;
    	var dcon=d.closest(".ui-dialog-content");
    	dcon[0].scrollTop=dcon[0].scrollHeight;
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
        c.append($("<div>").text(mesg));
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

define('FileUploadDialog',["FS","UI"],function (FS,UI) {
    var res={};
    var P=FS.PathUtil;
	res.show=function (dir,options) {
    	var d=res.embed(dir,options);
    	if (!res.opened) {
        	d.dialog({width:600,height:300,
        	    close: function () {
        	        res.opened=false;
        	    }
        	});
    	}
    	res.opened=true;
	};
	res.embed=function (dir, options) {
	    if (!options) options={};
	    options.onAdd=options.onAdd||function (){};
	    var mediaInfos={
	        c:{
	            name:"Cソースファイル",
	            exts:["c"],
                extPattern:/\.c$/i,
                contentType:/text\/.*/,
            }
	    };
	    var mediaInfo=mediaInfos.c; 
        if (!res.d) {
            var FType={
                fromVal: function (val){
                    return val=="" ? null : FS.get(val);
                },
                toVal: function (v){ return v ? v.path() : "";}
            };
            var dragMsg="ここに"+mediaInfo.name+"ファイル("+mediaInfo.exts.join("/")+")をドラッグ＆ドロップして追加";
            res.dragPoint=UI("div", 
                {style:"margin:10px; padding-left:10px; padding-right:10px; padding-top:50px; padding-bottom:50px; border:solid blue 2px;",
                on:{dragover: s, dragenter: s, drop:dropAdd}},dragMsg
            );
        	res.d=UI("div",{title:"ファイルアップロード"},
        	    res.dragPoint,
        	    ["div",{$var:"result"}]
        	    /* ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]*/
            );
        }
        function dropAdd(e) {
            eo=e.originalEvent;
            var files = Array.prototype.slice.call(eo.dataTransfer.files);
            var added=[],cnt=files.length;
            
            files.forEach(function (file) {
                var itemName=file.name;//.replace(mediaInfo.extPattern,"").replace(/\W/g,"_");
                if (!P.ext(file.name).match(mediaInfo.extPattern)) {
                    res.d.$vars.result.append(
                        UI("div",itemName+": このファイルは追加できません")
                    );
                    dec();
                    return;
                }
                var itemFile=dir.rel(itemName);
                if (itemFile.exists()) {
                    upmesg=itemName+": 同名のファイルがあるため中止しました．";
                    dec();
                    res.d.$vars.result.append(
                        UI("div",upmesg)
                    );
                } else {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var fileContent = reader.result;
                        var upmesg;
                        itemFile.setBytes(fileContent);
                        added.push(itemFile);
                        upmesg=itemName+": アップロードしました．";
                        dec();
                        res.d.$vars.result.append(
                            UI("div",upmesg)
                        );
                        //v.url="ls:"+itemFile.relPath(prj.getDir());// fileContent;
                        //add(v);
                    };
                    reader.readAsArrayBuffer(file);
                }
            });
            function dec() {
                cnt--;
                if (cnt<=0) {
                    options.onAdd(added);
                }
            }
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
        function s(e) {
            e.stopPropagation();
            e.preventDefault();
        }
            
        var d=res.d;
        d.$vars.result.empty();
        //var c=d.$vars.cont;
        //c.append($("<div>").text(mesg));
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
            if (!res.iframe[0].contentWindow.onerror) res.iframe[0].contentWindow.onerror=window.onerror;
        },100);
        handleResize();
        function handleResize() {
            if (res.da) {
                res.da.handleResize();
            }
        }
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
            res.iframe[0].contentWindow.location.href=url;
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
    var TestsuiteDialog=Klass.define({
        $this:"t",
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
                    ["a",{href:"javascript:;",on:{
                        click: function () {
                            t.add();
                        }
                    }},"新規"]));
                r.forEach(function (e) {
                    t.list.append(UI("div",
                    ["a",{href:"javascript:;",on:{
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
                ["form",{action:"javascript:;",name:"as_edit"},
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

define('AssignmentDialog',["Klass","UI","assert","DateUtil","DeferredUtil","TestsuiteDialog"],
function (Klass,UI,A,DateUtil,DU,TestsuiteDialog) {
    var AssignmentDialog=Klass.define({
        $this:"t",
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
            $.post("a.php?Assignment/get",{
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
            return $.get("a.php?Assignment/list").then(function (r) {
                t.list.empty();
                t.list.append(UI("div",
                    ["a",{href:"javascript:;",on:{
                        click: function () {
                            t.add();
                        }
                    }},"新規"]));
                r.forEach(function (e) {
                    t.list.append(UI("div",
                    ["a",{href:"javascript:;",on:{
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
                ["div",{css:{float:"left"},$var:"list"}],
                ["div",{css:{float:"right"}},
                ["form",{action:"javascript:;",name:"as_edit"},
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
                        value:DateUtil.format(new Date,"YYYY/MM/DD")}]
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
            return $.post("a.php?Assignment/add",param).then(function (r){
                t.cur=param;
                t.cur.id=r-0;
                t.showMesg("追加しました");
                t.showList();
                t.setEditMode();
                t.origname.val(t.name.val());
                console.log("Result",r,param);
            },DU.E);
            case "edit":
            if (t.origname.val()!==t.name.val()) {
                return $.post("a.php?Assignment/rename",param).then(function (r){
                    t.showList();
                    t.showMesg("更新しました");
                    console.log("Result",r);
                },DU.E);
            } else {
                return $.post("a.php?Assignment/edit",param).then(function (r){
                    t.showMesg("更新しました");
                    console.log("Result",r);
                },DU.E);
            }
            default:
                alert("No mode "+t.mode);
            }
        },
        del: function (t) {
            if (t.mode!=="edit") return;
            if (!confirm(t.cur.name+"を削除しますか？")) return;
            $.get("a.php?Assignment/del&id="+t.cur.id).then(function (r){
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

define('SubmitDialog',["UI","Klass","DeferredUtil"],
function (UI,Klass,DU){
    var SubmitDialog=Klass.define({
        $this:"t",
        $: function (t,prj) {
            t.prj=prj;
        },
        show: function (t,file) {
            t.dom=t.dom||t.createDOM();
            t.dom.dialog();
            var path=t.prj.getDir().name()+file.name();
            return $.get(WebSite.controller+"?Assignment/list").
            then(function (r) {
                console.log("Assignment/list",r);
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
            ["form",{action:"javascript:;",$var:"form"},
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
            $.get(WebSite.controller+"?Assignment/submit",param).then(function (r) {
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

define('CommentDialog2',["UI","Klass"],function (UI,Klass) {
    var res={};
    CommentDialog2=Klass.define({
        $this: "t",
        $: ["prj"],
        getComment: function (t,file) {
            var path=t.prj.getDir().name()+file.name();
            return $.get("a.php?Mark/getLast&file="+path).then(function (r) {
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
    return CommentDialog2;
});

requirejs(["Util", "Tonyu", "FS", "FileList", "FileMenu",
           "showErrorPos", "fixIndent",  "ProjectCompiler",
           "Shell","ShellUI","KeyEventChecker",
           "runtime", "searchDialog","StackTrace",
           "UI","UIDiag","WebSite","exceptionCatcher","Tonyu.TraceTbl",
           "Columns","assert","Menu","TError","DeferredUtil","Sync","RunDialog","RunDialog2",
           "LocalBrowser","logToServer","logToServer2","zip","SplashScreen","Auth",
           "CommentDialog","DistributeDialog","NotificationDialog","FileUploadDialog",
           "IframeDialog","AssignmentDialog","SubmitDialog","CommentDialog2"
          ],
function (Util, Tonyu, FS, FileList, FileMenu,
          showErrorPos, fixIndent, TPRC,
          sh,shui,  KeyEventChecker,
          rt, searchDialog,StackTrace,
          UI, UIDiag,WebSite,EC,TTB,
          Columns,A,Menu,TError,DU,Sync,RunDialog,RunDialog2,
          LocalBrowser,logToServer,logToServer2,zip,SplashScreen,Auth,
          CommentDialog,DistributeDialog,NotificationDialog,FileUploadDialog,
          IframeDialog,AssignmentDialog,SubmitDialog,CommentDialog2
) {
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
        return;
    }
    var curProjectDir=FS.get(dir);
    var curPrj=TPRC(curProjectDir);
    var isFirefox=navigator.userAgent.indexOf("Firefox")>=0;
    var isChrome=navigator.userAgent.indexOf("Chrome")>=0;
    var isChrome53=navigator.userAgent.indexOf("Chrome/53")>=0;
    var ALWAYS_UPLOAD=(localStorage.ALWAYS_UPLOAD==="true");
    console.log("ALWAYS_UPLOAD",ALWAYS_UPLOAD);
    var useOLDC=false;
    if (typeof BitArrow==="object") BitArrow.curProjectDir=curProjectDir.path();
    var langList={
        "js":"JavaScript",
        "c":"C",
        "dtl":"Dolittle",
        "tonyu":"Tonyu"
    };
    var helpURL;
    var unsaved=false;
    var unsynced=false;
    var Builder;
    var builder;
    var ram;
    function showToast(msg){
    	$("#toastArea").html(msg);
    	setTimeout(function(){
    		$("#toastArea").text("");
    	},5000);
    }
    function sync() {
    	unsaved=false;
	    //unsynced=false;
        return Sync.sync(curProjectDir, curProjectDir,{v:true}).then(function(r){
            console.log("SYNCTHEN");
            var cmtList=[];
            var re= new RegExp("cmt.txt$");
            for(var i=0;i<r.downloads.length;i++){
                if(re.test(r.downloads[i])){
                    cmtList.push(r.downloads[i].split(".")[0]);
                }
            }
            if(cmtList.length>0){
                var c=cmtList.join(",");
                scoremsg="<span style='color:#ff0000'> 新しい採点結果が届いています(ファイル:"+c+")</span>";
                if(typeof getCurrentEditorInfo!=="undefined"){
                    var inf=getCurrentEditorInfo();
                    var f=inf.file;
                    var cmfile=f.sibling(f.truncExt()+".cmt.txt");
                    $("#commentLink").empty();
                    if (cmfile.exists()) {
                        $("#commentLink").append("&nbsp;").append(
                        $("<a>").text("採点結果").click(function () {
                            CommentDialog.show(cmfile);
                        }));
                    }
                }
                NotificationDialog.show("新しい採点結果が届いています(ファイル:"+c+")");
            }else{
                scoremsg="";
            }
            unsynced=false;
            showToast("保存しました。"+scoremsg);
        }).fail(function (e) {
            if (!e) e="Unknown error";
            logToServer2("SYNC ERROR!\n"+(e.stack || e.responseText || e)+"\nSYNC ERROR END!\n");
            console.log(e);
            alert("保存に失敗しました。");
        });
    }
    function firstSync() {
        return Auth.check().then(sync);
    }
    DU.setE(function(e) {
        e=e.responseText||e;
        console.error("Err",e);
        alert(e);
    });
    $.when(DU.documentReady(),firstSync(), DU.requirejs(["ace"])).
    then(ready).fail(function (e) {
        alert("エラー"+e);
        console.log(e.stack);
        SplashScreen.hide();
    });

function ready() {
    var F=EC.f;
    $LASTPOS=0;
    //var home=FS.resolve("${tonyuHome}");
    Tonyu.globals.$currentProject=curPrj;
    Tonyu.currentProject=curPrj;
    //var EXT=A(curPrj.EXT);
    var EXT=curPrj.getEXT();
    var HEXT=".html";
    var opt=curPrj.getOptions();
    var lang=opt.language || "js";
    switch (lang){
    case "c":
        if(useOLDC) {
        	requirejs(["cCompiler"],function(){
        	    console.log("cCom requirejsed");
        	    builderReady();
        	});
        } else {
            requirejs(["CBuilder"],function(_){
                Builder=_;
                console.log("cb requirejsed");
                $("#fullScr").attr("href","javascript:;").text("別ページで表示");
                ram=FS.get("/ram/build/");
                FS.mount(ram.path(),"ram");
                builder=new Builder(curPrj, ram);
                window.BABuilder=builder;
                console.log("c builderready");
                builderReady();
            });
        }
    	helpURL="http://bitarrow.eplang.jp/index.php?c_use";
    	break;
    case "js":
    	requirejs(["TJSBuilder"],function(_){
    	    Builder=_;
    	    console.log("tjsb requirejsed");
    	    $("#fullScr").attr("href","javascript:;").text("別ページで表示");
            ram=FS.get("/ram/build/");
            FS.mount(ram.path(),"ram");
            builder=new Builder(curPrj, ram);
    	    console.log("builderready");
    	    builderReady();
    	});
    	helpURL="http://bitarrow.eplang.jp/index.php?javascript";
    	break;
    case "dtl":
    	requirejs(["DtlBuilder"],function(_){
    	    Builder=_;
    	    console.log("dtlb requirejsed");
    	    $("#fullScr").attr("href","javascript:;").text("別ページで表示");
            ram=FS.get("/ram/build/");
            FS.mount(ram.path(),"ram");
            builder=new Builder(curPrj, ram);
    	    builderReady();
    	});
    	helpURL="http://bitarrow.eplang.jp/index.php?dolittle_use"
    	break;
    case "tonyu":
        requirejs(["TonyuBuilder","TonyuProject"],function(_,TPRC){
            Tonyu.defaultOptions={
                compiler: { defaultSuperClass: "Actor"},
                run: {mainClass: "Main", bootClass: "Boot"},
                kernelEditable: false
            };
            Builder=_;
            console.log("tnub requirejsed");
            $("#fullScr").attr("href","javascript:;").text("別ページで表示");
            ram=FS.get("/ram/build/");
            FS.mount(ram.path(),"ram");
            curPrj=TPRC(curProjectDir);// curPrj re-construct!!!?
            builder=new Builder(curPrj, ram);
            curPrj.getPublishedURL().then(builderReady);
        });
        break;
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
                     },langList[lang]],
                     ["span",{id:"curFileLabel"}],
                     ["span",{id:"modLabel"}],
                     ["span",{id:"commentLink"}],
                     ["a",{id:"fullScr",href:"javascript:;"}],
                     ["span",{id:"toastArea"}]
                  ],
                  ["div",{id:"progs"}]
              ]/*,
              ["div",{id:"runArea","class":"col-xs-5"},
               ["div","実行結果：",["a",{id:"fullScr",href:"javascript:;"}]],
               ["iframe",{id:"ifrm",width:465,height:465}],
	       ["div",{id:"toastArea"}]
              ]*/
        );
    }
    makeUI();
    function makeMenu() {
        Menu.make({label:"Bit Arrow",id:"home",sub:
                [
                  //{label:"Bit Arrow"/*,href:"index.html"*/,id:"home"},
                  {label:"ファイル",id:"fileMenu",sub:[
                      {label:"新規",id:"newFile"},
                      {label:"名前変更",id:"mvFile"},
                      {label:"コピー",id:"cpFile"},
                      {label:"アップロード",id:"upFile",action:upFile},
                      //{label:"閉じる",id:"closeFile"},
                      {label:"削除", id:"rmFile"}
                  ]},
                  {label:"実行",id:"runMenu",action:run/*sub:[
                      {label:"実行(F9)",id:"runMenu",action:run},
                      {label:"停止(F2)",id:"stopMenu",action:stop},
                  ]*/},
                  {label:"保存",id:"save"},
                  {label:"提出",id:"submit"},
                  {label:"設定",sub:[
                      {label:"エディタの文字の大きさ",id:"textsize",action:textSize}/*,
                      {label:"エディタモード切替",id:"editorType",action:editorType}*/
                  ]}
                  /*{label:"ツール",id:"tool",sub:[
                      {label:"画像リスト",id:"imageList",action:showImageList},
                  ]},
                  {label:"配布",id:"distribute",sub:[
                      {label:"ファイルを配布",id:"distributeFile",action:distributeFile},
                      {label:"プロジェクトを配布",id:"distributePrj",action:distributePrj}
                  ]},*/
              ]}
        );
        showToolMenu();
        showDistMenu();
        Menu.appendMain({label:"使用方法",id:"openHelp"});
    }
    function upFile() {
        FileUploadDialog.show(curProjectDir,{
            onAdd: function (fs) {
                console.log(fs);
                fs.forEach(FM.on.createContent);
                fl.ls(curProjectDir);
                sync();
            }
        });
    }
    var commentDialog=new CommentDialog2(curPrj);
    var submitDialog;
    function submit() {
        if (!submitDialog) submitDialog=new SubmitDialog(curPrj);
        var inf=getCurrentEditorInfo();
        if (!inf || !inf.file) return alert("提出するファイルを開いてください");
        submitDialog.show(inf.file);
    }
    function showFileList() {
        function cjsFileHome() {
        	var d;
        	if (window.BitArrow && typeof window.BitArrow.publishedURL==="string") {
        		var a=window.BitArrow.publishedURL.replace(/\/$/,"").split("/");
        		d=a.pop();
        	}
        	if (!d) d="unknown";
        	return FS.get("/c-js/").rel(d+"/");
        }
        DU.requirejs(["FileBrowser"]).then(function (FileBrowser) {
            FileBrowser.show(cjsFileHome() ,{l:true});
        }).fail(function (e) {
            console.log(e.stack);
            alert(e);
        });
    }
    function showImageList() {
        DU.requirejs(["ResEditor"]).then(function (ResEditor) {
            ResEditor(curPrj,"image");
        }).fail(function (e) {
            console.log(e.stack);
            alert(e);
        });
    }
    function showDistMenu(){
        if(Auth.teacher!=""){
            Menu.appendMain(
                {label:"教員",id:"distribute",sub:[
                    {label:"ファイルを配布",id:"distributeFile",action:distributeFile},
                    {label:"プロジェクトを配布",id:"distributePrj",action:distributePrj},
                    {label:"課題作成",id:"assignment",action:assignment}
                ]}
            );
            //dist="block";
        }else{
            //dist="none";
        }
        //console.log("Auth.teacher",Auth.teacher);
        //$("#distribute").css("display",dist);
    }
    var assignmentDialog=new AssignmentDialog(curPrj);
    function assignment() {
        var inf=getCurrentEditorInfo();
        assignmentDialog.show(inf && inf.file);
    }
    function showToolMenu() {
        if (lang==="tonyu") {
            Menu.appendSub(
                {label:"ツール",id:"tool"},
                {label:"画像リスト",id:"imageList",action:showImageList}
            );
            //$("#tool").css("display","block");
        } else if (lang==="c") {
            Menu.appendSub(
                {label:"ツール",id:"tool"},
                {label:"ファイルブラウザ",id:"fileList",action:showFileList}
            );
        } else {
            //$("#tool").css("display","none");
        }
    }
    function distributeFile() {
        //alert("distributeFile!");
        curPrjDir=curProjectDir.name();
        var inf=getCurrentEditorInfo();
        if (!inf) {
            alert("配布したいファイルを開いてください。");
            return;
        }
        curFile=getCurrentEditorInfo().file;
        DistributeDialog.show(curFile.text(),function(text,overwrite){
            console.log(text,overwrite);
            $.ajax({
                type:"POST",
                url:"a.php?Class/distribute",
                data:{
                    "prj":curPrjDir,
                    "file":curFile.name(),
                    "htmlText":fileSet(curFile)[0].text(),
                    "html":fileSet(curFile)[0].name(),
                    "cont":text,
                    "over":overwrite
                }
            }).then(
                function(d){
                    alert(d);
                },
                function(d){
                    alert("ダメだったみたいです...");
                    console.log(d);
                }
            );
        });

    }
    function distributePrj() {
        alert("distributePrj!");
    }
    function checkPublishedURL() {
        Auth.publishedURL(curPrj.getName()+"/").then(function (u) {
            if (window.BitArrow) window.BitArrow.publishedURL=u;
        });
    }
    checkPublishedURL();
    makeMenu();

    var screenH;
    function onResize() {
        var h=$(window).height()-$("#navBar").height()-$("#tabTop").height();
        h-=20;
        screenH=h;
        var rw=$("#runArea").width();
        $("#progs pre").css("height",h+"px");
        console.log("canvas size",rw,h);
        $("#fileItemList").height(h);
    }
    onResize();
    var desktopEnv=loadDesktopEnv();
    window.editorTextSize=desktopEnv.editorFontSize||18;
    var runMenuOrd=desktopEnv.runMenuOrd;
    var editors={};

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
    KeyEventChecker.down(document,"F2",F(function(){
        stop();
        if(progs=getCurrentEditor()) progs.focus();
        //console.log("F2 pressed");
    }));
    KeyEventChecker.down(document,"ctrl+s",F(function (e) {
        A.is(e,"Event");
    	save();
    	e.stopPropagation();
    	e.preventDefault();
    	return false;
    }));
    $(window).resize(F(onResize));
    $("body")[0].spellcheck=false;
    sh.cd(curProjectDir);

    var fl=FileList($("#fileItemList"),{
        topDir: curProjectDir,
        on:{
            select: F(open),
            displayName: dispNameFL
        }
    });
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
        var oldName=old.truncExt();
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
        if (f.ext()==EXT || f.ext()==HEXT) {
            fileSet(f).forEach(function (e) {
                if (e.ext()==EXT && !e.exists()) {
                    e.text("// "+langList[lang]+"\n");
                    if(lang=="js") e.text("// "+langList[lang]+"\n// ここで扱われるJavaScriptは通常のJavaScriptとは異なります。詳しくは使用方法をご覧ください。\n");
                } else if (e.ext()==HEXT  && !e.exists()) {
                    e.text("<html>\n\n</html>");
                } else if (!e.exists()) {
                    e.text("");
                }
            });
        } else if (!f.exists()) {
            f.text("");
        }
    };
    FM.on.displayName=function (f) {
        A.is(f,String);
        var r=dispNameFM(f);
        if (r) {
            return r;
        }
        return f;
    };
    var refactorUI;
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
    fl.ls(curProjectDir);
    console.log("listing", curProjectDir.path(),"done");
    function builderReady() {
        window.curPrj=curPrj;
        autoexec();
        autologexec();
    }
    function autoexec() {
        var autoexec=Util.getQueryString("autoexec",null);
        console.log("AE",autoexec);
        if (autoexec) {
            fl.select(curProjectDir.rel(autoexec));
            run();
        }
    }
    function autologexec() {
        var id=Util.getQueryString("autologexec",null);
        if (id) {
            $.ajax("a.php?AddErrorInfo/getLog&logid="+id).then(function (r) {
               var raw=JSON.parse(r.raw);
               fl.select(curProjectDir.rel("Test.c"));
               getCurrentEditorInfo().editor.getSession().getDocument().setValue(raw.code.C);
               run();//$("#runMenu").click();
            });
        }
    }
    function ls(){
        fl.ls(curProjectDir);
    }
    function dispNameFL(name) {
        A.is(name,String);
        //var name=f.name();
        if (P.startsWith(name,".")) return null;
        if (P.isDir(name)) return name;
        //                          Why commented out??
        //  in dtl mode, if A.html is newer than A.dtl, "A" will be bound to "A.html"
        //      but html tab is not shown  -> cannot edit A.dtl, kowareta!!
        if (P.endsWith(name,EXT) /*|| P.endsWith(name,HEXT)*/) return P.truncExt(name);
        return null;
    }
    function dispNameFM(name) {
        A.is(name,String);
        //var name=f.name();
        if (P.startsWith(name,".")) return null;
        if (P.isDir(name)) return name;
        //      this is used for mvdiag, both A.js and A.html shoud be "A"
        if (P.endsWith(name,EXT) || P.endsWith(name,HEXT)) return P.truncExt(name);
        return null;
    }
    function fixName(name, options) {
        A.is(arguments,[String]);
        var upcased=false;
        if (name.match(/^[a-z]/)) {
            name= name.substring(0,1).toUpperCase()+name.substring(1);
            upcased=true;
        }
        if (name.match(/^[A-Z_][a-zA-Z0-9_]*$/)) {
            if (sourceFiles[name]) {
                return {ok:false, reason:name+"は存在します"};
            }
            if (upcased) {
                //name= name.substring(0,1).toUpperCase()+name.substring(1);
                return {ok:true, file: curProjectDir.rel(name+EXT), note: "先頭を大文字("+name+") にして作成します．"};
            }
            return {ok:true, file: curProjectDir.rel(name+EXT)};
        } else {
            return {ok:false, reason:"名前は，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．"};
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
            showErrorPos($("#errorPos"));
            break;
        case "compile_error":
            SplashScreen.hide();
            break;
        case "runtime_error":
            SplashScreen.hide();
            break;
        case "edit":
            //if(progs=getCurrentEditor()) progs.focus();
            break;
        }
    }
    function stop() {
        //curPrj.stop();
        if(curth){
            try {
                curth.kill();
            }catch(e) {
                //IE shows error "解放されたスクリプトからコードを実行できません。";
                console.log(e);
            }
            curth=null;
        }
        displayMode("edit");
    }
    var curName,runURL;
    $("#fullScr").click(function () {
        if (lang=="dtl" || lang=="js" ||(!useOLDC && lang=="c") ||  lang=="tonyu") {
            var inf=getCurrentEditorInfo();
            if (!inf) {
                alert("実行したファイルを選んでください");
            }
            save();
            sync();
            if (builder && inf) {
                var curFile=inf.file;
                var curFiles=fileSet(curFile);
                var curHTMLFile=curFiles[0];
                var curLogicFile=curFiles[1];

                var pub;
                //var pub=Auth.remotePublics()/*FS.get("/public/")*/.rel(curProjectDir.name());
                SplashScreen.show();
                Auth.publishedDir(curPrj.getName()+"/").then(function (_p) {
                    pub=_p;
                    return builder.build({mainFile:curLogicFile});
                }).then(function () {
                    return builder.upload(pub);
                }).then(function () {
                    console.log("tonyu upl done");
                    SplashScreen.hide();
                    return Auth.publishedURL(curPrj.getName()+"/");
                }).then(function (_u) {
                    var cv=$("<div>");
                    cv.dialog();
                    runURL=_u+(lang=="tonyu"?"index.html":curHTMLFile.name());
                    cv.append($("<div>").append(
                        $("<a>").attr({target:"runit",href:runURL}).text("別ページで開く")
                    ));
                    cv.append($("<div>").qrcode({width:200,height:200,text:runURL}));
                    return sync();
                }).fail(function (e) {
                    Tonyu.onRuntimeError(e);
                    SplashScreen.hide();
                });
            }
        } else {
            if (runURL) {
                var cv=$("<div>");
                cv.dialog();
                sync().then(function () {
                    cv.append($("<div>").append(
                            $("<a>").attr({target:"runit",href:runURL}).text("別ページで開く")
                    ));
                    cv.append($("<div>").qrcode(runURL));
                });
            }
        }
    });
    //\run
    function run() {//run!!
        var inf=getCurrentEditorInfo();
        if (!inf) {
            alert("実行したいファイルを開いてください。");
            return;
        }
        var newwnd;
        if (RunDialog2.hasLocalBrowserWindow()) {
            newwnd=window.open("about:blank","LocalBrowserWindow"+Math.random(),"menubar=no,toolbar=no,width=500,height=500");
        }
        var curFile=inf.file;
        var curFiles=fileSet(curFile);
        var curHTMLFile=curFiles[0];
        var curJSFile=curFiles[1];
	    window.sendResult=function(resDetail){
            logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"C Run",resDetail,"C");
        };
        stop();
        save();
        // display=none
        $("[name=runtimeErrorDialog]").parent().css("display","none");
        displayMode("run");
        if(lang=="js"){
    	    //logToServer("//"+curJSFile.path()+"\n"+curJSFile.text()+"\n//"+curHTMLFile.path()+"\n"+curHTMLFile.text());
            SplashScreen.show();
            //RunDialog2 (new version)
            try {
                DU.timeout(0).then(function () {
                    var b=builder.build({mainFile:curJSFile});
                    if (ALWAYS_UPLOAD) {
                        return b.then(function () {
                            return Auth.publishedDir(curProjectDir.name());
                        }).then(function (pub) {
                            return builder.upload(pub);
                        });
                    }
                    return b;
                }).then(function () {
                    logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"JS Run","実行しました","JavaScript");
                    if (ALWAYS_UPLOAD) {
                        return Auth.publishedURL(curProjectDir.name()).then(function (pub) {
                            var runURL=pub+curHTMLFile.name();
                            //$("<iframe>").attr({src:runURL}).dialog({width:600,height:400});
                            return IframeDialog.show(runURL,{width:600,height:400});
                        });
                    }
                    //console.log(ram.ls());
                    var indexF=ram.rel(curHTMLFile.name());
                    RunDialog2.show(indexF,{
                        window:newwnd,
                        height:RunDialog2.geom.height||screenH-50,
                        toEditor:focusToEditor,
                        font:desktopEnv.editorFontSize||18
                    });
                }).fail(function (e) {
                    console.log(e.stack);
    	            if (e.isTError) {
    	                console.log("showErr: run",e);
    	                showErrorPos($("#errorPos"),e);
    	                displayMode("compile_error");
                        logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"JS Compile Error",e.src+":"+e.pos+"\n"+e.mesg,"JavaScript");
    	            }else{
    	                Tonyu.onRuntimeError(e);
    	            }
                }).always(function () {
        	        //$("#fullScr").attr("href","javascript:;").text("別ページで実行");
                    SplashScreen.hide();
                });
            }catch(e) {
                console.log(e.stack);
            }
            return sync();
            /*
            QR code
            sync
            */

    	/*}else if(lang=="c"&&useOLDC){
    	    //logToServer("//"+curJSFile.path()+"\n"+curJSFile.text());
    		var compiledFile=curPrj.getOutputFile();
    		var log={};
    		try{
    			compile(curJSFile,compiledFile,log);
    	        	runURL=location.href.replace(/\/[^\/]*\?.*$/,
    	        	        "/js/ctrans/runc.html?file="+compiledFile.path()
    	        	);
    			//$("#ifrm").attr("src",runURL);
    			    RunDialog.show("src",runURL,
    			    {height:screenH-50,toEditor:focusToEditor,font:desktopEnv.editorFontSize||18});
    		        //RunDialog2.show(runURL,
    			    //{height:screenH-50,toEditor:focusToEditor,font:desktopEnv.editorFontSize||18});
    		        $("#fullScr").attr("href","javascript:;").text("別ページで表示");
    		        $("#qr").text("QR");
    		}catch(e){
    			//logToServer("COMPILE ERROR!\n"+e+"\nCOMPILE ERROR END!");
    			logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"C Compile Error",e+"","C");
    			console.log(e.stack);
    			if (e.pos) {
        			var te=TError(e+"",curJSFile, e.pos);
	                showErrorPos($("#errorPos"),te);
                    displayMode("compile_error");
    			} else {
        			alert(e);
    			}
    		}
            return sync();*/
      } else if (lang=="c") {
          try {
            SplashScreen.show();
            $("#fullScr").attr("href","javascript:;").text("別ページで表示");
              DU.timeout(0).then(function () {
                  var b=builder.build({mainFile:curJSFile});
                  if (ALWAYS_UPLOAD) {
                      return b.then(function () {
                          return Auth.publishedDir(curProjectDir.name());
                      }).then(function (pub) {
                          console.log("Upload comp",pub);
                          return builder.upload(pub);
                      });
                  }
                  return b;
              }).then(function () {
                  logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"C Run","実行しました","C");
                  if (ALWAYS_UPLOAD) {
                      return Auth.publishedURL(curProjectDir.name()).then(function (pub) {
                          var runURL=pub+curHTMLFile.name();
                          console.log("Run url",runURL);
                          return IframeDialog.show(runURL,{width:600,height:400});
                      });
                  }
                  var indexF=ram.rel(curHTMLFile.name());
                  console.log("screenH",screenH);
                  return RunDialog2.show(indexF,
                  {window:newwnd,height:RunDialog2.geom.height||screenH-50,
                    toEditor:focusToEditor,font:desktopEnv.editorFontSize||18});
              }).fail(function (e) {
                  //var eobj={stack:e.stack,message:e+""};
                  //for (var k in e) eobj[k]=e[k];
                  if (e.pos) {
                      logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"C Compile Error",e,"C");
                      var te=TError(e+"",curJSFile, e.pos);
  	                  showErrorPos($("#errorPos"),te);
                      displayMode("compile_error");
                  } else {
                      logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"C Compile Error",e,"C");
                      Tonyu.onRuntimeError(e);
                  }
                  console.log("CFAIL",e.stack);
              }).always(function () {
                  SplashScreen.hide();
                  return sync();
              });
          }catch(e) {
              if(e) console.log(e.stack);
              SplashScreen.hide();
          }

    	}else if(lang=="dtl"){
    	    try {
                SplashScreen.show();
        	    //logToServer("//"+curJSFile.path()+"\n"+curJSFile.text()+"\n//"+curHTMLFile.path()+"\n"+curHTMLFile.text());
    	        $("#fullScr").attr("href","javascript:;").text("別ページで表示");
                DU.timeout(0).then(function () {
                    var b=builder.build({mainFile:curJSFile});
                    if (ALWAYS_UPLOAD) {
                        return b.then(function () {
                            return Auth.publishedDir(curProjectDir.name());
                        }).then(function (pub) {
                            console.log("Upload comp",pub);
                            return builder.upload(pub);
                        });
                    }
                    return b;
                }).then(function () {
                    logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"Dolittle Run","実行しました","Dolittle");
                    if (ALWAYS_UPLOAD) {
                        return Auth.publishedURL(curProjectDir.name()).then(function (pub) {
                            var runURL=pub+curHTMLFile.name();
                            console.log("Run url",runURL);
                            return IframeDialog.show(runURL,{width:600,height:400});
                        });
                    }
                    var indexF=ram.rel(curHTMLFile.name());
                    return RunDialog2.show(indexF,
                    {window:newwnd,height:RunDialog2.geom.height||screenH-50,
                      toEditor:focusToEditor,font:desktopEnv.editorFontSize||18});
                }).fail(function (e) {
                    //console.log("FAIL", arguments);
                    Tonyu.onRuntimeError(e);
                    console.log("DTLFAIL",e.stack);
                }).always(function () {
                    SplashScreen.hide();
                    return sync();
                });
            }catch(e) {
	            if(e) console.log(e.stack);
                SplashScreen.hide();
            }
        } else if (lang=="tonyu") {
            try {
                SplashScreen.show();
                $("#fullScr").attr("href","javascript:;").text("別ページで表示");
                DU.timeout(0).then(function () {
                    var t=new Date().getTime();
                    return builder.build({mainFile:curJSFile}).then(function () {
                        var nt=new Date().getTime();
                        console.log("Build time :",nt-t);
                        return Auth.publishedDir(curPrj.getName()+"/");// !=URL
                    }).then(function (pub) {
                        console.log("Tonyu sync from ",builder.dst, "to ",pub.path());
                        t=new Date().getTime();
                        return builder.upload(pub);
                    }).then(function () {
                        return Auth.publishedURL(curPrj.getName()+"/");// !=Dir
                    }).then(function (pub) {
                        var nt=new Date().getTime();
                        console.log("Upload time :",nt-t);
                        IframeDialog.show(pub+"index.html",{width:600,height:400});
                    });
                }).fail(function (e) {
                    //var eobj={stack:e.stack,message:e+""};
                    //for (var k in e) eobj[k]=e[k];
                    if (e.pos) {
                        logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"Tonyu Compile Error",e,"Tonyu");
                        var te=TError(e+"",curJSFile, e.pos );
    	                  showErrorPos($("#errorPos"),te);
                        displayMode("compile_error");
                    } else {
                        logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),"Tonyu Compile Error",e,"Tonyu");
                        Tonyu.onRuntimeError(e);
                    }
                    console.log("TONYUFAIL",e.stack);
                }).always(function () {
                    SplashScreen.hide();
                    return sync();
                });
            }catch(e) {
                if(e) console.log(e.stack);
                SplashScreen.hide();
            }
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
    var curFrameRun;
    var curth;
    window.setupFrame=function (r) {
        A.is(r,Function);
        //curFrameRun=r;
        var inf=getCurrentEditorInfo();
        var ht="";
        var curFile=inf.file;
        var curFiles=fileSet(curFile);
        var curHTMLFile=curFiles[0];
        var curJSFile=curFiles[1];
        var ht=curHTMLFile.text();
        var f=curPrj.getOutputFile();
        var js=f.text();
        curth=r(ht,js, curName);
        SplashScreen.hide();
    };
    var alertOnce;
    alertOnce=function (e) {
        alert(e);
        alertOnce=function(){};
    };
    window.onerror=function (a,b,c,d,e) {
        console.log("window.onerror",arguments);
        if (!e) return;
        return Tonyu.onRuntimeError(e);
    };
    var bytes=function(s) {
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
    };
    EC.handleException=Tonyu.onRuntimeError=function (e) {
        if (e.type==="dialogClosed") {
            console.log(e.stack);
            return;
        }
        var inf=getCurrentEditorInfo();
        if (!inf) {
            console.log(e.stack);
            alert(e.stack);
        }
        var curFile=inf && inf.file;
        var curFiles=curFile && fileSet(curFile);
        var curHTMLFile=curFiles && curFiles[0];
        var curJSFile=curFiles && curFiles[1];
        Tonyu.globals.$lastError=e;
        //A.is(e,Error);// This will fail when error from iframe.
        A(e,"Error is empty");
        var t=curPrj.env.traceTbl;
        var te;
        var tid = t.find(e) || t.decode($LASTPOS); // user.Main:234
        if (tid) {
            te=curPrj.decodeTrace(tid);
        }
        console.log("onRunTimeError:stackTrace1",e,e.stack,te,$LASTPOS);
        if (te) {
            te.mesg=e;
            if (e.pluginName) {
                alert(e.message);
            } else {
                var diag=showErrorPos($("#errorPos"),te);
                displayMode("runtime_error");
                /*$("#errorPos").find(".quickFix").append(
                        UI("button",{on:{click: function () {
                            setDiagMode(true);
                            diag.dialog("close");
                            run();
                        }}},"診断モードで実行しなおす"));*/
            }
            stop();
            //logToServer("JS Runtime Error!\n"+te.src+":"+te.pos+"\n"+te.mesg+"\nJS Runtime Error End!");
            if (curJSFile) {
                logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),langList[lang]+" Runtime Error",te.src+":"+te.pos+"\n"+te.mesg,langList[lang]);
            }
        } else {
            if (isChrome) {
                e.stack=(""+e.stack).split("\n").map(bytes).join("\n");
                //if (isChrome) { s=bytes(s); console.log("CONV",s); }
            }
            if (isFirefox) {
                e.stack=(e+"\n"+e.stack).replace(/\\u([0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f])/g,function (_,c) {
                    return String.fromCharCode("0x"+c);
                });
            }
            var stack = (""+e.stack).split("\n");
            var cve;
            var rc=/:([0-9]+):([0-9]+)/;
            stack.forEach(function (s) {
                if (cve) return;
                var idx=s.indexOf(curProjectDir.path());
                if (idx>0) {
                    s=s.substring(idx);
                    var m=rc.exec(s);
                    if (m) {
                        cve=FS.PathUtil.name(s.substring(0,m.index))+"の"+
                        m[1]+"行目"+m[2]+"文字目付近でエラーが発生しました";
                        console.log("ERT",s.substring(0,m.index), m[1], m[2]);
                    }
                }
            });
            UI("div",{title:"Error",name:"runtimeErrorDialog"},"["+(cve||e)+"]",
            //["button",{on:{click:function(){console.log("clicked");$("#reConsole"+reDialog).text(e.stack);}}},"詳細"],
            //["pre",{id:"reConsole"+reDialog},stack[0]+"\n"+stack[1]]).dialog({width:800});
            ["button",{on:{click:function(){console.log("clicked");$(this).parent("div").children("pre").text(e.stack);}}},"詳細"],
            ["pre",{id:"reConsole"},stack[0]+"\n"+stack[1]],
            ["button",{on:{click:function(){console.log("onerr");$(this).parent().parent().css("display","none");}}},"閉じる"]).dialog({width:800});
            stop();
            //logToServer(e.stack || e);
            if (curJSFile) {
                logToServer2(curJSFile.path(),curJSFile.text(),curHTMLFile.text(),langList[lang]+" Runtime Error",e.stack || e,langList[lang]);
            }
        }
    };
    $("#search").click(F(function () {
        console.log("src diag");
        searchDialog.show(curProjectDir,function (info){
            fl.select(info.file);
            setTimeout(function () {
                var prog=getCurrentEditor();
                if (prog) prog.gotoLine(info.lineNo);
            },50);
        });
    }));
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
        A.is(prog,"AceEditor");
        var prev=prog.getValue();
        var fixed=fixIndent( prev ).replace(/　/g,"  ");
        if (fixed!==prev) {
            var cur=prog.getCursorPosition();
            prog.setValue(fixed);
            prog.clearSelection();
            prog.moveCursorTo(cur.row, cur.column);
        }
    }
    function reloadFromFiles() {
        for (var path in editors) {
            var inf=editors[path];
            var curFile=inf.file; //fl.curFile();
            var prog=inf.editor; //getCurrentEditor();
            if (curFile.exists() && prog) {
                prog.setValue(curFile.text());
                prog.clearSelection();
            }
        }
    }
    function save() {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        var curFile=inf.file; //fl.curFile();
        var prog=inf.editor; //getCurrentEditor();
        if (curFile && prog && !curFile.isReadOnly()) {
            if (curFile.ext()==EXT) fixEditorIndent(prog);
            else fixZSpace(prog);
            var old=curFile.text();
            var nw=prog.getValue();
            if (old!=nw) {
                curFile.text(nw);
            }
        }
        fl.setModified(false);
		logToServer2(curFile.path(),curFile.text(),/*curHTMLFile.text()*/"HTML","Save","保存しました",langList[lang]);
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
    	        unsaved=true;
    	        unsynced=true;
    	    }else{
    	        unsaved=false;
    	    }
        }catch(e) {
            console.log(e);
        }
    }
    function fileSet(c) {
        A.is(c,"SFile");
        var n=c.truncExt();
        return [c.up().rel(n+HEXT), c.up().rel(n+EXT)];
    }
    $(".selTab").click(function () {
        var ext=A.is($(this).attr("data-ext"),String);
        var c=fl.curFile();
        if (!c) {
            alert("まず、メニューの「ファイル」→「新規」でファイルを作るか、左のファイル一覧からファイルを選んでください。");
            return;
        }
        var n=c.truncExt();
        var f=c.up().rel(n+ext);
        if (!f.exists()) {
            FM.on.createContent(f);
        }
        fl.select(f);
    });
    setInterval(watchModified,1000);
    var curDOM;
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
        //if (isChrome53) closeCurrentFile();
        if (curDOM) curDOM.hide();
        var inf=editors[f.path()];
        $(".selTab").removeClass("selected");
        $(".selTab[data-ext='"+f.ext()+"']").addClass("selected");
        if (!inf) {
            var progDOM=$("<pre>").css("height", screenH+"px").text(f.text()).appendTo("#progs");
            progDOM.attr("data-file",f.name());
            var prog=ace.edit(progDOM[0]);
            if (typeof desktopEnv.editorFontSize=="number") prog.setFontSize(desktopEnv.editorFontSize);
    	    else prog.setFontSize(18);
            //prog.setFontSize(20);
            prog.setTheme("ace/theme/eclipse");
            defaultKeyboard=prog.getKeyboardHandler();
            //if(desktopEnv.editorMode=="emacs") prog.setKeyboardHandler("ace/keyboard/emacs");
            //prog.setKeyboardHandler(defaultKeyboard);
            if (f.ext()==EXT && lang=="c") {
                prog.getSession().setMode("ace/mode/c_cpp");
            }
            else if (f.ext()==EXT) {
                prog.getSession().setMode("ace/mode/tonyu");
            }
            if (f.ext()==HEXT) {
                prog.getSession().setMode("ace/mode/html");
            }
            prog.getSession().setUseWrapMode(true);
            editors[f.path()]={file:f , editor: prog, dom:progDOM};
            progDOM.click(F(function () {
                displayMode("edit");
            }));
            prog.setReadOnly(false);
            prog.clearSelection();
            prog.focus();
            curDOM=progDOM;
        } else {
            inf.dom.show();
            inf.editor.focus();
            curDOM=inf.dom;
            //if(desktopEnv.editorMode=="emacs") inf.editor.setKeyboardHandler("ace/keyboard/emacs");
            //else inf.editor.setKeyboardHandler(defaultKeyboard);
        }
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
        /*var cmfile=f.sibling(f.truncExt()+".cmt.txt");
        $("#commentLink").empty();
        if (cmfile.exists()) {
            $("#commentLink").append("&nbsp;").append(
                $("<a>").text("採点結果").click(function () {
                    CommentDialog.show(cmfile);
                }));
        }*/
        $("#curFileLabel").text(f.truncExt());
    }
    d=function () {
        Tonyu.currentProject.dumpJS.apply(this,arguments);
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
        return desktopEnv=res;
    }
    function saveDesktopEnv() {
        var d=curProjectDir.rel(".desktop");
        d.obj(desktopEnv);
    }
    $("#prjOptEditor").click(F(function () {
        ProjectOptionsEditor(curPrj);
    }));
    var helpd=null;
    /*$("#refHelp").click(F(function () {
    	if (!helpd) helpd=WikiDialog.create(home.rel("doc/tonyu2/"));
    	helpd.show();
    }));*/
    if (typeof progBar=="object") {progBar.clear();}
    /*$("#rmPRJ").click(F(function () {
        if (prompt(curProjectDir+"内のファイルをすべて削除しますか？削除する場合はDELETE と入力してください．","")!="DELETE") {
            return;
        }
        sh.rm(curProjectDir,{r:1});
        document.location.href="index.html";
    }));
    $("#mvPRJ").click(F(function () {
        var np=prompt("新しいプロジェクトの名前を入れてください", curProjectDir.name().replace(/\//g,""));
        if (!np || np=="") return;
        if (!np.match(/\/$/)) np+="/";
        var npd=curProjectDir.up().rel(np);
        if (npd.exists()) {
            alert(npd+" はすでに存在します");
            return;
        }
        sh.cp(curProjectDir,npd);
        sh.rm(curProjectDir,{r:1});
        document.location.href="project.html?dir="+npd;
    }));*/
    function textSize() {
        var prog=getCurrentEditor();
        var s=prompt("エディタの文字の大きさ", desktopEnv.editorFontSize||18);
        if(s==null) return;
        desktopEnv.editorFontSize=parseInt(s);
        if (prog) prog.setFontSize(desktopEnv.editorFontSize||18);
        saveDesktopEnv();
        window.editorTextSize=desktopEnv.editorFontSize||18;
    }
    function editorType() {
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
    }
    $("#home").click(F(function () {
        save();
        goHome();
    }));
    $("#runMenu").click(F(run));
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
        if(unsynced || unsaved){
            return "保存されていないデータがあります。\nこれまでの作業を保存するためには一度実行してください。";
        }
    });
    $("#submit").click(submit);
    $("#save").click(F(function () {
        save();
        sync();
    }));
    FM.onMenuStart=save;
    function focusToEditor(){
        if(prog=getCurrentEditor()) prog.focus();
    }
    window.getCurrentEditorInfo=getCurrentEditorInfo;
    SplashScreen.hide();
    window.NotificationDialog=NotificationDialog;
}// of ready
});

define("jsl_edit", function(){});

