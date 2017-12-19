define(["Klass","assert"],function (Klass,assert) {
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
        binOpable: function (op,right) {
            if (op+""==="=" && this.assignableFrom(t)) return this;
            return false;
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
            if (type instanceof t.Number) return true;
            //if (type.numOrd && this.numOrd>=type.numOrd) return true;
            return t.Number.super(this,"assignableFrom",type);
        },
        castableFrom: function (type) {
            if (type instanceof t.Number) return true;
            return t.Number.super(this,"castableFrom",type);
        },
        binOpable: function (op,right) {
            if (right instanceof t.Number) return this;
            return t.Number.super(this,"binOpable",op,right);
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
    t.Unsigned=t.Number.inherit({
        $:["e"],
        $fields: {e:t.Number},
        toLiteral: function () {
            return CTYPE_NAME+".Unsigned("+this.e.toLiteral()+")";
        },
        numOrd: {
            get: function () {return this.e.numOrd;}
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
        numOrd: {
            get: function () {return this.e.numOrd+1;}
        },
        toLiteral: function () {
            return CTYPE_NAME+".Long("+this.e.toLiteral()+")";
        }
    });
    t.Short=t.Number.inherit({
        $:["e"],
        $fields:{e:t.Number},
        numOrd: {
            get: function () {return this.e.numOrd-1;}
        },
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

    t.Pointer=t.Base.inherit({
        $:["e"],
        $fields: {e:t.Base},
        toLiteral: function () {
            return CTYPE_NAME+".Pointer("+this.e.toLiteral()+")";
        },
        assignableFrom: function (right) {
            /*if (right instanceof t.Number) {
                return true;
            }*/
            if (right instanceof t.Pointer) {
                return this.e===t.void || right.e===t.void || this.e.assignableFrom(right.e);
            }
            return t.Pointer.super(this,"assignableFrom",right);
        },
        binOpable: function (op,right) {
            // TODO: === in C??
            if (right instanceof t.Number && (op+""==="+" || op+""==="-")) return this;
            if (right instanceof t.Number && (op+""==="==="|| op+""==="!==")) return t.int;
            if (right instanceof t.Pointer && (op+""==="==="|| op+""==="!==")) return t.int;
            return t.Pointer.super(this,"binOpable",op,right);
        }
    });
    t.Array=t.Pointer.inherit({
        $:["e","length"],
        $fields: {e:t.Base},//, length:Klass.opt(Number)}, // null for []
        toLiteral: function () {
            return CTYPE_NAME+".Array("+this.e.toLiteral()+","+this.length+")";
        }
        /*binOpable: function (op,right) {
            if (right instanceof t.Number && (op+""==="+" || op+""==="-" || op+""==="===" || op+""==="!==")) return true;
            return this.super("binOpable",op,right);
        }*/
    });
    t.Function=t.Base.inherit({
        $:["ret","args"],
        $fields: {ret:t.Base, args:Array/*[{vname:name, vtype:t.Base}]*/},
        toLiteral: function () {
            return CTYPE_NAME+".Function("+
                this.ret.toLiteral()+",["+
                this.args.map(function (e) {
                   return "{vname:'"+e.vname+"', vtype:"+e.vtype.toLiteral()+"}";
                }).join(",")+"])";
        },
        match: function (argTypes) {
            if (this.args.length===0) return true;
            if (this.args[0].vtype===t.void) {
                if (argTypes.length!==0) {
                    return ["(void)で宣言された関数には引数を渡せません"];
                }
                return true;
            }
            var len=this.args.length;
            if (len!==argTypes.length) {
                return ["引数の数が違います．関数定義では"+
                     "{1}個受け取るよう指定されていますが，"+
                    "呼び出し側では{2}個渡しています",len,argTypes.length];
                /*return "引数の数が違います．関数定義では"+
                    len+"個受け取るよう指定されていますが，"+
                    "呼び出し側では"+argTypes.length+"個渡しています";*/
            }
            for (var i=0; i<len;i++) {
                //TODO check type compats
                if (!this.args[i].vtype.assignableFrom(argTypes[i])) {
                    return ["{1}番目の引数の型が一致しません",i+1];
                }
            }
            return true;
        }
    });
    t.Member=Klass.define({
        $name:"Member",
        $:["vtype","name"],
        $fields: {vtype:t.Base,name:String},
        toLiteral: function () {
            return CTYPE_NAME+".Member("+this.vtype.toLiteral()+",'"+this.name+"')";
        }
    });
    t.Struct=t.Base.inherit({
        $:function (name,members) {
            this.name=name;
            this.members=members||[];
        },
        $fields: {members:Array, name:Klass.opt(String)},
        toLiteral: function (deep) {
            if (!deep && this.name) {
                if (this.name) return "scopes_0."+this.name;//TODO: SCOPES
            } else {
                return CTYPE_NAME+".Struct('"+this.name+"',["+
                    this.members.map(function (e) {
                        return e.toLiteral();
                    }).join(",")+
                "])";
            }
        },
        addMember: function (vtype,name) {
            assert.is(arguments,[t.Base,String]);
            this.members.push(t.Member(vtype,name));
        },
        getMember: function (name) {
            var res;
            this.members.forEach(function (m) {
                if (m.name+""===name+"") {
                    res=m;
                }
            });
            return res;
        }
    });
    t.TypeDef=t.Base.inherit({
        $:["e"],
        $fields:{e:t.Base},
        toLiteral: function () {
            return CTYPE_NAME+".TypeDef("+this.e.toLiteral()+")";
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
