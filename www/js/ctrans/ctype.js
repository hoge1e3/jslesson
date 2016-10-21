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
    t.Char=t.Number({name:"char",numOrd:1});
    t.Byte=t.Char;
    t.Int=t.Number({name:"int",numOrd:2});
    t.Float=t.Number({name:"float",numOrd:9});
    t.Double=t.Number({name:"double",numOrd:10});
    t.Unsigned=t.Base.inherit({
        $fields: {e:t.Base}
    });
    t.Array=t.Base.inherit({
        $fields: {e:t.Base, dimension:[Number]}, // 0 for []
    }); 
    t.Pointer=t.Base.inherit({
        $fields: {e:t.Base}
    });
    return t;
});