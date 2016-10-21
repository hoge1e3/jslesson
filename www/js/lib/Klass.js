define([],function () {
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
        var init=pd.$ || function (e) {
            if (e && typeof e=="object") {
                for (var k in e) {
                    this[k]=e[k];
                }
            }
        };
        var fldinit;
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
        klass=function () {
            if (! (this instanceof klass)) {
                var res=Object.create(p);
                init.apply(res,arguments);
                return res;
            }
            init.apply(this,arguments);
        };
        klass.inherit=function (pd) {
            pd.$parent=klass;
            return Klass.define(pd);
        };
        klass.prototype=p;
        for (var name in pd) {
            if (name[0]=="$") continue;
            if (name.substring(0,7)=="static$") {
                klass[name.substring(7)]=pd[name];
            } else {
                p[name]=pd[name];
            }
        }
        p.$=init;
        return klass;
    };
    Klass.Function=function () {throw new Exception("Abstract");}
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