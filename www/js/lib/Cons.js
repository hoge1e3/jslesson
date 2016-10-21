define(["Klass"],function (Klass) {
    var Cons;
    Cons=Klass.define({
        $name:"Cons",
        $typeParams:{T:Object},
        $fields:{car:"T",cdr:"Cons<T>|null"},
        $:function (car,cdr) {
            this.car=car;
            this.cdr=cdr;
        },
        toArray:function () {
            if (this.cdr) {
                return [this.car].concat(this.cdr.toArray());
            } else {
                return [this.car];
            }
        },
        static$fromArray:function (a) {// a:Array
            if (a.length===0) return null;
            var car=a.shift();
            return Cons(car,Cons.fromArray(a));
        },
    });
    return Cons;
});