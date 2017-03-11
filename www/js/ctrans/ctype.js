define(["Klass"],function (Klass) {
    var t={};
    var CTYPE_NAME="CType";
    window[CTYPE_NAME]=t;
    t.Base=Klass.define({
        $name:"ctype::Base",
        // Check var_of_this = var_of_t; is OK?
        assignableFrom: function (t) {//ctype.Base->Boolean
            return t===this;  
        },
        // Check var_of_this = (t)var_of_t; is OK?
        castableFrom: function (t) {//ctype.Base->Boolean
            return this.assignableFrom(t);
        },
        toLiteral:function () {
            console.log(this);
            throw new Error("toLiteral is not defined");
        },
        cast:function(param){return param;}
    }); 
    t.Primitive=t.Base.inherit({
        $name:"ctype::Primitive",
        $fields: {name:String},
        toLiteral:function () {
            return CTYPE_NAME+"['"+this.name+"']";
        }
    });
    t.Number=t.Primitive.inherit({
        assignableFrom: function (type) {
            if (type.numOrd && this.numOrd>=type.numOrd) return true;
            return this.super("assignableFrom",type);
        },
        castableFrom: function (type) {
            if (type.numOrd) return true;
            return this.super("castableFrom",type);
        },
        cast:function(v){
            v=v||0;
    		v-=0;
    		if (this.max) {
        		v&=this.max;
        		if (v>=(this.max+1)/2) {
        		    v-=(this.max+1);
        		}
    		}
    		return v;
    	}
    });
    t.void=t.Primitive({name:"void"});
    t.char=t.Number({name:"char",numOrd:1,max:0xff});
    t.byte=t.char;
    t.int=t.Number({name:"int",numOrd:2,max:0xffffffff});
    t.float=t.Number({name:"float",numOrd:9});
    t.double=t.Number({name:"double",numOrd:10});
    t.Unsigned=t.Base.inherit({
        $:["e"],
        $fields: {e:t.Base},
        toLiteral: function () {
            return CTYPE_NAME+".Unsigned("+this.e.toLiteral()+")";
        },
        cast:function (v) {
            v=this.e.cast(v);
            if (v<0) {
                v+=this.e.max+1;
            }
            return v;
        }
    });
    t.Long=t.Number.inherit({
        $:["e"],
        $fields:{e:t.Number} ,
        toLiteral: function () {
            return CTYPE_NAME+".Long("+this.e.toLiteral()+")";
        }
    });
    t.Short=t.Number.inherit({
        $:["e"],
        $fields:{e:t.Number},
        toLiteral: function () {
            return CTYPE_NAME+".Short("+this.e.toLiteral()+")";
        }
    });
    //  int a[3][5];    a: Array(Array(int,5) ,3)
    //  a[i]: Array(int,5)    

    //  int a[3][];  //ERR?  a: Array(Array(int,-1) ,3)
    //  a[i]: Array(int,5)    
    //  int *a[3];           a: 

    //  int a[][5];          a: Array(Array(int,5) ,-1)
    //  a[i]: Array(int,5)    

    t.Array=t.Base.inherit({
        $:["e","length"],
        $fields: {e:t.Base, length:Klass.opt(Number)}, // null for []
        toLiteral: function () {
            return CTYPE_NAME+".Array("+this.e.toLiteral()+","+this.length+")";
        }
    }); 
    t.Pointer=t.Base.inherit({
        $:["e"],
        $fields: {e:t.Base},
        toLiteral: function () {
            return CTYPE_NAME+".Pointer("+this.e.toLiteral()+")";
        }
    });
    t.Function=t.Base.inherit({
        $:["ret","args"],
        $fields: {ret:t.Base, args:Array/*[t.Base]*/},        
        toLiteral: function () {
            return CTYPE_NAME+".Function("+
                this.ret.toLiteral(), 
                this.args.map(function (e) {
                   return e.toLiteral();
                }).join(",")+")";
        }
    });
    t.Struct=t.Base.inherit({
        $:["members","name"],
        $fields: {members:Array, name:Klass.opt(String)},
        toLiteral: function () {
            return CTYPE_NAME+".Struct([])";    
        }
    });
    return t;
});
/*
	toUnsigned_int:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;
		res=param;

		return res;
	},
	
	toChar:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;
	
		//if(param&0x80)res=param|0xffffff00;
		//else res=param;
		res=param;

		return res;
	},
	toUnsigned_char:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;

		res=param;
		return res;
	},
	toUnsigned_float:function(param){return param;},
	toDouble:function(param){return param;},
	toUnsigned_double:function(param){return param;},
	toArray:function(param){return param;},
	toLong:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;
		res=param;
		return param;
	},
	toUnsigned_long:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffffffff;
		res=param;
		return res;
	},
	toShort:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffff;

		if(param&0x8000)res=param|0xffff0000;
		else res=param;
		return res;
	},
	toUnsigned_short:function(param){
		var res=0;
		param+=0;//bool to int
		param&=0xffff;

		res=param;
		return res;
	},
*/