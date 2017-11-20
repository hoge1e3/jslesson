define([], function () {
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
