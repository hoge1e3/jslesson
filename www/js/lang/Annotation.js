define(function (require,exports,module) {
    module.exports=class Annotation {
        constructor(debugSymbol) {
            this.map=new WeakMap();
            this.debugSymbol=debugSymbol;
        }
        value(target,value) {
            if (value) return this.put(target,value);
            return this.get(target);
        }
        put(target, value) {
            return Object.assign(this.get(target),value);
        }
        set(target, value) {
            return this.put(target,value);
        }
        get(target) {
            let v=this.map.get(target);
            if (!v) {
                v={};
                this.map.set(target,v);
                if (this.debugSymbol) target[this.debugSymbol]=v;
            }
            return v;
        }
    };
});
