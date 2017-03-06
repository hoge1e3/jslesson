define(["Klass"],function (Klass) {
    var t={};
    t.Base=Klass.define({
        $name:"ctype::Base",
        // Check var_of_this = var_of_t; is OK?
        assignableFrom: function (t) {//ctype.Base->Boolean
            return t===this;  
        },
        // Check var_of_this = (t)var_of_t; is OK?
        castableFrom: function (t) {//ctype.Base->Boolean
            return this.assignableFrom(t);
        }
    }); 
    t.Primitive=t.Base.inherit({
        $name:"ctype::Primitive",
        $fields: {name:String}
    });
    t.Number=t.Primitive.inherit({
        assignableFrom: function (type) {
            if (type.numOrd && this.numOrd>=type.numOrd) return true;
            return this.super("assignableFrom",type);
        },
        castableFrom: function (type) {
            if (type.numOrd) return true;
            return this.super("castableFrom",type);
        }
    });
    t.void=t.Primitive({name:"void"});
    t.char=t.Number({name:"char",numOrd:1});
    t.byte=t.char;
    t.int=t.Number({name:"int",numOrd:2});
    t.float=t.Number({name:"float",numOrd:9});
    t.double=t.Number({name:"double",numOrd:10});
    t.Unsigned=t.Base.inherit({
        init:["e"],
        $fields: {e:t.Base}
    });
    //  int a[3][5];    a: Array(Array(int,5) ,3)
    //  a[i]: Array(int,5)    

    //  int a[3][];  //ERR?  a: Array(Array(int,-1) ,3)
    //  a[i]: Array(int,5)    
    //  int *a[3];           a: 

    //  int a[][5];          a: Array(Array(int,5) ,-1)
    //  a[i]: Array(int,5)    

    t.Array=t.Base.inherit({
        init:["e","dimension"],
        $fields: {e:t.Base, dimension:[Number]}, // 0 for []
    }); 
    t.Pointer=t.Base.inherit({
        $fields: {e:t.Base}
    });
    t.Function=t.Base.inherit({
        $fields: {ret:t.Base, args:[t.Base]}        
    });
    return t;
});