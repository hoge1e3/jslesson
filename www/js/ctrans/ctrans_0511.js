define(["ctrans/ctype","AsyncByGenerator","Parser","context","ExpressionParser","assert"],
function (T,ABG,Parser,context,ExpressionParser,assert) {
window.MinimalParser= function () {
    var supportsAsync=false;
    /*try {
        f=new Function ("var a=async function (){};");
        f();
        supportsAsync=true;
    }catch(e){
    }*/
    //a=T.Array({});
    //console.log("ARY",a);
    //test-ctrans
	var parser={};
	var ctx=context();
	var startSeq=0;
	var sp=Parser.StringParser; // 文字列を解析するパーサ
	//    ↓ 空白またはコメントを解析するパーサ
	var space=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/[^\n]*\n)*)*/);
	// トークナイザ： 空白またはコメントを読み飛ばし，次に rで指定されたトークンがあれば解析が成功．
	function token(r) {
		var str;
		if (typeof r=="string") {
			str=sp.str(r);     // 固定文字列トークンを解析するパーサ
		} else {
			str=sp.reg(r);     // 正規表現トークンを解析するパーサ
		}
		//    ↓ 空白またはコメントにつづいてstr  がきたら
		return space.and(str).ret(function(a, b) {
			// a=空白またはコメント   b=読み込んだトークン
			// テキストと位置情報をつけて返す．
			return {pos:b.pos, 
				text: b.src.str.substring( b.pos, b.pos+b.len ) ,
				toString: function (){
					//return this.text+"("+this.pos+")";
					return this.text;
				}
			};
		});
	}
	var t=token;
	var defines={};
	function newError(mesg,node) {
	    var e=new Error(mesg);
	    e.pos=node && node.pos;
	    return e;
	}
	function ent(entf, parser) {
        if (typeof parser == "function") {
	       //var res;
	       var nc=entf();
	       return ctx.enter(nc, function () {
	           return /*res=*/parser();
	       });
	       //return res;
        }
	    return Parser.create(function (st) {
	        //var res;
	        var nc=entf();
	        return ctx.enter(nc, function () {
    	        return /*res=*/parser.parse(st);
	        });
	        //return res;
	    });
	}
	/*function newScope1(parser) {
	    // ctx.scope: {varname : {vtype:string?, depth:number }}
	    return ent(function () {
	        var depth=0;
	        if ((typeof (ctx.depth))=="number") depth=ctx.depth+1;
	        return {scope: Object.create(ctx.scope||{}) ,depth:depth };
	    },parser);
	}*/
	//var DEPTH="_fuka_";
    //window.scids=[];
	function newScope(parser) {
	    var entf=function () {
            var depth=0;
            if ((typeof (ctx.depth))=="number") depth=ctx.depth+1;
            var ns=Object.create(ctx.scope||{});
            //ns[DEPTH]=depth;
            //scids.push(ns);
            var nc={scope:ns ,depth:depth };
            return nc;
	    };
        var checkDuplicate=function (r) {
            for (var k in ctx.scope) {
                if (ctx.scope[k].depth===ctx.depth) {
                    var o=ctx.scope[k].occurence;
                    var cnt=0;
                    var bys={};
                    for (var pos in o) {
                        cnt++;
                        bys[o[pos]]=1;
                    }
                    if (cnt>=2) {
                        if (cnt==2 && 
                        bys["direct_declarator"] &&
                        bys["function_definition"]) {
                        }
                        else {
                            throw newError(ctx.scope[k].vname+"はすでに定義されています",ctx.scope[k].vname);   
                        }
                    }
                }
            }
            return r;
        };
        if (typeof parser == "function") {
            return ctx.enter(entf(),function () {
	            return checkDuplicate(parser());
            });
        }
        return Parser.create(function (st) {
	        return ctx.enter(entf(), function () {
    	        return checkDuplicate(parser.parse(st));
	        });
	    });
	}
	function inject(parser, injector/*:(void->void)->void*/) {
	    return Parser.create(function (st) {
	        var res;
	        var parseAction/*:(void->void)*/=function () {
    	        res=parser.parse(st);
	        };
	        injector(parseAction);
	        return res;
	    });
	}
	function ajoin(sep,a) {
	    a=a.slice();
	    for (var i=a.length-1;i>0 ;i--) {
	        a.splice(i,0,sep);
	    }
	    return a;
	}
	function lit(s) {
	    return '"'+s+'"';
	}
	function typeLit(t) {
	    if (!t.toLiteral) {
	        console.log(t);
	        throw new Error(t+" is not type");
	    }
	    return t.toLiteral();
	}
    function extend(arr,obj) {
        var pos;
        for (var k in obj) {
            arr[k]=obj[k];
        }
        if (typeof arr.pos!=="number") {
            for (var k in arr) {
                if (arr[k] && typeof arr[k].pos==="number") {
                    if (pos==null || arr[k].pos<pos) {
                        pos=arr[k].pos;
                    }
                }
            }
            arr.pos=pos;
        }
        return arr;
    }
    function curScopesName() {
        return "scopes_"+ctx.depth;
    }
    function findVariable(n) {
        var r=ctx.scope[n+""];
        if (!r) throw newError(n+"は定義されていません",n);
        return r;
    }
    function variableName(n) {
        return "scopes_"+findVariable(n).depth+"."+n;        
    }
    function MKARY() {
	    return Array.prototype.slice.call(arguments);
	}


	var localVars={};
	var paren_expr;
	//var func_call;
	var control_syntax;
	var if_state;
	var terms;
	var declaration;
	var calc_expression;
	var struct_or_union_specifier;
	var declaration_specifiers;
	var declarator;
	var term;
	var statement;
	var statements;
	var argument_expressions;
	var postfix_expression;
	var cast_expression;
	var unary_expression;
	var specifier_qualifier_list;
	var direct_abstract_declarator;
	var expression;
	var direct_declarator;
	var parameter_type_list;
	var parameter_list;
	var initializer;
	var switch_compound_statement;
	var switch_compound_statement_lazy=Parser.lazy(function(){return switch_compound_statement;});
	var initializer_lazy=Parser.lazy(function(){return initializer;});
	var parameter_type_list_lazy=Parser.lazy(function(){return parameter_type_list;});
	var parameter_list_lazy=Parser.lazy(function(){return parameter_list;});
	var direct_declarator_lazy=Parser.lazy(function(){return direct_declarator;});
	var expression_lazy=Parser.lazy(function(){return expression;});
	var direct_abstract_declarator_lazy=Parser.lazy(function(){return direct_abstract_declarator;});
	var specifier_qualifier_list_lazy=Parser.lazy(function(){return specifier_qualifier_list;});
	var unary_expression_lazy=Parser.lazy(function(){return unary_expression;});
	var cast_expression_lazy=Parser.lazy(function(){return cast_expression;});
	var postfix_expression_lazy=Parser.lazy(function(){return postfix_expression;});
	var argument_expressions_lazy=Parser.lazy(function(){return argument_expressions;});
	var statements_lazy=Parser.lazy(function(){return statements;});
	var statement_lazy=Parser.lazy(function(){return statement;});
	var term_lazy=Parser.lazy(function(){return term;});
	var declaration_specifiers_lazy=Parser.lazy(function(){return declaration_specifiers;});
	var declarator_lazy=Parser.lazy(function(){return declarator;});
	var paren_expr_lazy=Parser.lazy(function(){return paren_expr;});
	var identifier_lazy=Parser.lazy(function(){return identifier;});
	//var func_call_lazy=Parser.lazy(function(){return func_call;});
	var if_state_lazy=Parser.lazy(function(){return if_state;});
	var terms_lazy=Parser.lazy(function(){return terms;});
	var declaration_lazy=Parser.lazy(function(){return declaration;});
	var struct_or_union_specifier_lazy=Parser.lazy(function(){return struct_or_union_specifier;});
	var calc_expression_lazy=Parser.lazy(function(){return calc_expression;});
	var _int=t("int");
	var float=t("float");
	var char=t("char");
	var double=t("double");
	var _void=t("void");
	var reserved_word=/^(?:void|char|short|int|long|float|double|auto|static|const|signed|unsigned|extern|volatile|register|return|goto|if|else|switch|case|default|break|for|while|do|continue|typeof|struct|enum|union|sizeof|__asm)$/;
	var storage_class_specifier=t(/^(?:auto|register|static|extern|typedef)/);
	//\type_specifier
	var typedef_name=identifier_lazy.except(function (e) {
	    if (ctx.scope[e.text] && (ctx.scope[e.text].vtype) instanceof T.TypeDef) {
	        return false; 
	    }
	    return true;
	}).ret(function (e) {
	    return {vtype:ctx.scope[e.text].vtype.e};
	});
	var type_specifier=t(/^(?:void|char|short|int|long|float|double|signed|unsigned)\b/).
	    or(struct_or_union_specifier_lazy)/*.or(enum_specifier_lazy)*/.or(typedef_name);
	var type_qualifier=t(/^(?:const|volatile)/);
	var type_qualifiers=type_qualifier.rep1();
	var unary_operator=t(/^(?:\*|\+|\-|\~|\!|\&)/);//&
	var assignment_operator=t(/^(?:=|\*\=|\/=|\%\=|\+=|\-\=|<<=|>>=|\&=|\^=|\|=)/);
	/*var var_type=t("unsigned").opt().and(_int.or(float).or(char).or(double))
		.ret(function(u,type){return [((u)?u+" ":""),type];});*/
	var func_type=_int.or(float).or(char).or(double).or(_void);
	var reg_str = RegExp("^[^\"^\”]*");
	//文字列の正規表現
	var string = t(/^\"[^\"]*\"/).ret(function(str){
		return extend(["str_to_ch_arr(",str,")"],{type:"string",vtype:T.Array(T.char)});
	});
	var integer_constant=t(/^0[xX][0-9a-fA-F]+/).or(t(/^0[bB][01]+/)).or(t(/^[0-9]+/)).
	ret(function (r) {
	    return extend(r,{vtype:T.int});
	});
	var character_constant=t(/^\'[^\'\\]\'/).ret(function (s) {
    	return parse_char_const(s.text);
	}).or(t(/^\'\\.\'/).ret(function (s) {
    	return parse_char_const(s.text);
	})).or(t(/^\'\\[0-9]+\'/).ret(function (s) {
    	return parse_char_const(s.text);
	})).or(t(/^\'\\x[0-9a-fA-F]+\'/).ret(function (s) {
    	return parse_char_const(s.text);
	}));
	function parse_char_const(s) {
	    var v=eval(s).charCodeAt(0);
	    return {value:v, vtype:T.char,toString:function(){return v+"";}};
	}
	var floating_constant=t(/^[0-9]+\.[0-9]*/).
	ret(function (r) {
	    return extend(r,{vtype:T.float});
	});
	var constant=floating_constant.or(character_constant).or(integer_constant)/*.or(enumeration_constant)*/;
	//\identifier
	var identifier=t(/^[a-zA-Z_][a-zA-Z0-9_]*/).except(function(identifier){
			return ((identifier.text).match(reserved_word));
		}).ret(function(identifier){
			if(defines[identifier]){identifier=defines[identifier];identifier.changeble=true;}
			identifier.ofIdentifier=true;
			return identifier;
		});
	var struct_or_union=t(/^struct\b|union\b/);

	var constant_expression=calc_expression_lazy;

	/*var struct_declarator=declarator_lazy.opt().and(t(":")).and(constant_expression)
		.ret(function(declarator,colon,const_expr){return [declarator,":",const_expr];});
	struct_declarator=struct_declarator.or(declarator_lazy);
	var struct_declarator_list=t(",").and(struct_declarator)
		.ret(function(comma,struct_declarator){return [",",struct_declarator];});
	struct_declarator_list=struct_declarator.and(struct_declarator.rep0())
		.ret(function(struct_declarator,struct_declarators){return [struct_declarator,struct_declarators];});*/
    var struct_declarator_list=	declarator_lazy.sep1(t(","),true);
	//\struct_declaration
	var struct_declaration_raw=specifier_qualifier_list_lazy.ret(function (types) {
        baseType=typeNamesToType(types);
        console.log("216:baseType",baseType);
        return baseType;
    }).and(struct_declarator_list).and(t(";")).ret(function (t,decl,sc) {
        return decl;
    });
	var struct_declaration=inject(struct_declaration_raw,function (a) {
	    var saveBaseType=baseType;
        a();
        baseType=saveBaseType;    	  
    });
	//\struct_or_union_specifier
	struct_or_union_specifier=struct_or_union.and(identifier.opt()).
    	and(newScope( t("{").and(struct_declaration.rep1()).and(t("}")) ))
		.ret(function(struct_or_union,identifier,lcb,struct_declarations,rcb){
		    var t=T.Struct(identifier+"");
		    //console.log("229:decls",struct_declarations);
	        struct_declarations.forEach(function (declaration) {
		        declaration.forEach(function (declarator) {
	    	         //console.log("DECL-or",declarator);
		             t.addMember(declarator.vtype,declarator.vname+"");
		        });
		    });
		    //console.log("Struct",t);
		    if (identifier) {
		        addScope(identifier,{vtype:T.TypeDef(t),by:"struct_specifier"});
		    }
			return extend([struct_or_union,identifier,"{",struct_declaration,"}"],
			{vtype:t});
		}).or(
		    struct_or_union.and(identifier).ret(function(struct_or_union,identifier){
		        if (!ctx.scope[identifier.text]) {
		            throw newError(identifier.text+" は定義されていません",identifier);
		        }
		        var vtype=ctx.scope[identifier.text].vtype;
		        assert.is(vtype,T.TypeDef);
		        return {vtype: vtype.e};
		    }));

    // \specifier_qualifier_list
	specifier_qualifier_list=type_qualifier.or(type_specifier).rep1();

	//var direct_abstract_declarator=direct_abstract_declarator.opt().and(t("[")).and(/*constant_*/expression_lazy.opt()).and(t("]")).ret(function(direct_abstract_declarator,lsb,const_expr,rsb){return [direct_abstract_declarator,"[",const_expr,"]"];});
	//direct_abstract_declarator=direct_abstract_declarator.or(direct_abstract_declarator.opt().and(t("(")).and(parameter_type_list_lazy.opt()).and(t(")")).ret(function(direct_abstract_declarator,lp,parameter_type_list,rp){return [direct_abstract_declarator,"(",parameter_type_list,")"];}));

	var direct_abstract_declarator=t("[").and(constant_expression.opt()).and(t("]"))
		.ret(function(lsb,expr,rsb){
			var $=["[",expr,"]"];
			//$.isArray=true
			return $;
		});
	direct_abstract_declarator=direct_abstract_declarator.or(t("(")
		.and(parameter_type_list_lazy).and(t(")")).ret(function(lp,parameter_type_list,rp){
			return ["(",parameter_type_list,")"];
		}));
	direct_abstract_declarator=direct_abstract_declarator.rep0();

	var abstract_declarator=direct_abstract_declarator;
    var baseType; 
	// \declaration_specifiers
	var declaration_specifier=storage_class_specifier.or(type_specifier).or(type_qualifier);
	declaration_specifiers=declaration_specifier.rep1().ret(function(types){
	    baseType=typeNamesToType(types);
	    return {vtype:baseType,type:"declaration_specifiers"};
	});
	function typeNamesToType(types) {
	    var res=null;
	    for (var i=types.length-1;i>=0;i--) {
	        var type=types[i];
	        if (type.vtype) {
	            res=type.vtype;
	            //console.log("281",res);
	            continue;
	        }
	        switch (type.text) {
	            case "int": res=T.int;break;
	            case "float": res=T.float;break;
	            case "double": res=T.double;break;
	            case "byte": res=T.byte;break;
	            case "char": res=T.char;break;
	            case "void": res=T.void;break;
	            case "unsigned": res=T.Unsigned(res||T.int);break;
	            case "long": res=T.Long(res||T.int);break;
	            case "short": res=T.Short(res||T.int);break;
	            case "typedef": 
	                if (!res) {
    	                console.log("TYPEDEF error",types);
    	                throw newError("typedef 型 型名; という形式で定義してください",type);
	                }
	                res=T.TypeDef(res); break;
	            case "static": break;//TODO
	            default:
	                console.log("Not a valid type:",types,"["+i+"]");
	                throw newError(type.text+" is not a valid type",type);
	        }
	    }
	    assert.is(res,T.Base);
	    return res;
	}
	
	var identifier_list=t(",").and(identifier).ret(function(comma,identifier){return [",",identifier];});
	identifier_list=identifier.and(identifier_list.rep0())
		.ret(function(identifier,identifiers){return [identifier,identifiers];});

	var direct_declarator_head=identifier.ret(function (i) {
	        return extend(i,{vname:i});
	    }).or(
	    t("(").and(declarator_lazy).and(t(")")).ret(
	        function(lp,declarator,rp){return declarator;}
	    ));
	var direct_declarator_tail=t("[").and(constant_expression.opt()).and(t("]")).ret(
	    function(lsb,const_expr,rsb){
			var $=["[",const_expr,"]"];
			$.type="decl_array";
			$.elementLength=const_expr;
			return $;
		}).or(t("(").and(newScope(parameter_list_lazy)).and(t(")")).ret(
		    function(lp,param_list,rp){
		        return extend( ["(",param_list,")"] ,{
		            type:"decl_params",params:param_list
		        });
		    }
		))/*.or(t("(").and(identifier_list.opt()).and(t(")")).ret(
		    function(lp,identifier_list,rp){
		        return extend( ["(",identifier_list,")"], {type:"decl_idents"});
		    }
		))*/;
    //\direct_declarator
    direct_declarator=direct_declarator_head.and(direct_declarator_tail.rep0()).ret(
        function(direct_decl_head,direct_decl_tails){
    		var $=extend(
    		    [direct_decl_head.vname/*,direct_decl_tails*/],
    		    {type:"direct_declarator",
    		    pos:direct_decl_head.pos}
		    );
    		$.vtype=baseType;
    		for (var i=direct_decl_tails.length-1;i>=0;i--) {
    		    var tail=direct_decl_tails[i];
    		    switch(tail.type) {
		        case "decl_array":
		            $.vtype=T.Array($.vtype,tail.elementLength);
		            break;
    		    case "decl_params":
    		        $.vtype=T.Function($.vtype,tail.params);
    		        $.params=tail.params;
		            break;
    		    /*case "decl_idents":
    		        $.vtype=T.Function($.vtype,[]);
		            break;*/
		        }    
    		}
    		$.vname=direct_decl_head.vname;
    		addScope($.vname,{vtype:$.vtype, by:"direct_declarator"});
    		//ctx.scope[$.vname+""]={vtype:$.vtype, depth: ctx.depth};
    		return $;
	    }
	);
	var pointer=t("*");//.and(type_qualifiers.opt()).ret(function(mul,type_qualifiers){return [];});
    //\declarator = pointer? direct-declarator  (pointer? まだ)
	declarator=inject(
	    pointer.rep0().ret(function (ps) {
    	    for (var i=0 ; i<ps.length; i++) {
    	        baseType=T.Pointer(baseType);
    	    }
    	    return baseType;
    	}).and(direct_declarator).ret(function (t,d) {
    	    return d;
    	}),
    	function (a) {var s=baseType;a();baseType=s;}
    );
    //\parameter_declaration
	var parameter_declaration=declaration_specifiers.and(declarator)
		.ret(function(declaration_specifiers,declarator){
		    return extend([declaration_specifiers,declarator],{
		        vtype:declarator.vtype,
		        vname:declarator.vname});
		}).or(t("void").ret(function () {
	    return {vtype:T.void,vname:"boido_baryuu"};})
	);
    //\parameter_type_list
	//parameter_type_list=t(",").and(parameter_declaration)
	//	.ret(function(comma,parameter_declaration){return [",",parameter_declaration];});
	//\parameter_list
	parameter_list=parameter_declaration.sep0(t(","),true);/*.
	or(t("void").ret(function () {
	    console.log("VOID read!");
	    return [];})
	);*///parameter_type_list.rep0())
		/*.ret(function(parameter_declaration,parameter_declarations){
			return [parameter_declaration,parameter_declarations];
		});*/
	parameter_type_list=parameter_list;//TODO




	calc_expression=ExpressionParser();
	calc_expression.element(cast_expression_lazy);
	// See https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
	calc_expression.infixl(5,t("||"))
	calc_expression.infixl(6,t("&&"));
	calc_expression.infixl(7,t("|"));
	calc_expression.infixl(8,t("^"));
	calc_expression.infixl(9,t("&"));
	calc_expression.infixl(10,t("==").ret(function(ee){return "===";}));
	calc_expression.infixl(10,t("!=").ret(function(ne){return "!==";}));
	calc_expression.infixl(11,t("<="));
	calc_expression.infixl(11,t(">="));
	calc_expression.infixl(11,t("<").noFollow(t("<")));
	calc_expression.infixl(11,t(">").noFollow(t(">")));
	calc_expression.infixl(12,t("<<"));
	calc_expression.infixl(12,t(">>"));
	calc_expression.infixl(13,token("+"));
	calc_expression.infixl(13,token("-"));
	calc_expression.infixl(14,token("*"));
	calc_expression.infixl(14,token("/"));
	calc_expression.infixl(14,token("%"));
	calc_expression.mkInfixl(mk);
	function mk(left,op,right){
	    chkTypeIsSet("mk")(left);
	    return extend(["(",CD(left),op,CD(right),")"],{vtype:left.vtype});
	}
	function CD(e) {
	    return ["checkDust(",e,")"];
	}
	//\mkpost
	function mkpost(left,op){
	    var t=left.vtype;
	    var expr=[left,op];
	    chkTypeIsSet("mkpost")(left);
	    if (op.type=="index") {
	        if (t instanceof T.Array) {
	            if (!t.e) {
	                failWithCon(left,op,t,"Cannot resolve type of left[op]");
	            }
	            t=t.e;
	        }
	        expr=["pointer(",left,",",op.index,").read()"];
	    } else if (op.type==="func_call") {
	        //vtype TODO
	        if (supportsAsync) {
        	    expr=["await(",left,op,")"];
	        } else if (ABG.supportsGenerator) {
	            expr=["(yield* AsyncByGenerator.toGen(",left,op,"))"];
	        }
	        if (t instanceof T.Function) {
	            var argList=op.args.map(function (arg) {
	                return arg.vtype; 
	            });
	            var mr=t.match(argList);
	            if (mr!==true) {
    	            throw newError(mr,op);
	            }
	        } else {
	            throw newError("関数でないものに対して関数として呼び出しています",left);
    	        //expr.push(["/*",t.toLiteral(),"*/"]);
	        }
	    } else if (op.type==="arrow") {
    	    expr=["(",left,").read().",op[1]];//vtype TODO
	    } else if (op.type==="dot") {
	        if (!(t instanceof T.Struct)) {
	            throw newError("ドット参照は構造体にのみ使えます",op);   
	        }
	        var mem=t.getMember(op.vname+"");
	        if (!mem) {
	            throw newError("構造体"+t.name+"にメンバ"+op.vname+"は定義されていません",op);   
	        }
	        t=assert.is(mem.vtype,T.Base);
    	    expr=[left,op];
	    }
	    return extend(expr,{vtype:t, type:"post",left:left,op:op});
	}
	function mkpre(op,right){
	    chkTypeIsSet("mkpre")(right);
	    return extend([op,right],{vtype:right.vtype} );
	}
	function failWithCon() {
	    var a=Array.prototype.slice.call(arguments);
	    console.log.apply(console,a);
	    throw new Error(a.join(" "));
	}
	calc_expression = calc_expression.build();
    function structCp(parser) {
        return parser.ret(function (r) {
            if ((r.vtype) instanceof T.Struct) {
                return extend(["copyStruct(",r,")"] ,{
                    type:"copyStruct",vtype:r.vtype,original:r
                });
            } else return r;
        });
    };
    //\assign
	assign=unary_expression_lazy.and(assignment_operator)
		.and(structCp(calc_expression)).ret(function(unary_expr,op,calc_expr){
		    if (unary_expr.type=="post") {
		        var left=unary_expr.left;
		        var pop=unary_expr.op;
        	    if (pop.type=="index") {
        			return extend(
        			    ["pointer(",left,",",pop.index,").writeOp(",lit(op),",cast(",typeLit(unary_expr.vtype),",",calc_expr,"))"],
        			    {vtype:unary_expr.vtype}
        			);
        	    } else if (pop.type==="func_call") {
        	        throw newError("左辺では関数呼び出しできません",left);
            	} else if (pop.type==="arrow") {
            	    
        	    } else if (pop.type==="dot") {
        	        
        	    }
		    } else if (unary_expr.type=="pointerDeref") {
    			return extend(
    			    ["(",unary_expr.pointer,").writeOp(",lit(op),",cast(",typeLit(unary_expr.vtype),",",calc_expr,"))"],
    			    {vtype:unary_expr.vtype}
    			);
		    }
			return extend(
			    [unary_expr,op,"cast(",typeLit(unary_expr.vtype),",",calc_expr,")"],
			    {vtype:unary_expr.vtype}
			);
		}).or(calc_expression);

	expression=assign;
	var array_initializer=t("{").and(initializer_lazy.sep0(t(","),true)).and(t("}")).
	ret(function(lcb,initializers,rcb){
	    return extend(["[",ajoin(",",initializers),"]"],{type:"arrayInit"});
	});
	initializer=assign.or(array_initializer);
	function defaultInitializer(vtype,depth) {
	    if (vtype instanceof T.Array) {
	        return ["arrInit2(",typeLit(vtype.e),",", (vtype.length||"0"),",",(depth>0)+"",")"];
	    } else if (vtype instanceof T.Struct) {
	        return ["StructObj()"];
	    } else if (vtype instanceof T.Function) {
	        return "function (){}";
	    } else {
	        return [depth==0?"0":"dustValue()","/*",typeLit(vtype),"*/"];
	    }
	}
	// \init_declarator
	var init_declarator=declarator.and(t("=").and(initializer).opt())
		.ret(function(declarator,eq,initializer){
			var $=[curScopesName(),".",declarator,"=",
			    initializer?
			    ["cast(",typeLit(declarator.vtype),",",initializer,")"]:
			    defaultInitializer(declarator.vtype,ctx.depth),";\n"
			];
			if(declarator.isArray){
				$.isArray=declarator.isArray;
				$.isLength=declarator.isLength;
			}
			$.declarator=declarator;
			$.initializer=initializer;
    		if ((declarator.vtype) instanceof T.Function) {
    		    //プロトタイプ宣言はコードを生成しない
    		    $.unshift("/*");
    		    $.push("*/");
    		}
			return $;
		});

	var init_declarator_list=init_declarator.sep0(t(","),true);
	// \declaration
	declaration=declaration_specifiers.and(init_declarator_list).and(t(";"))
		.ret(function(decl_specifiers,init_decl_list,semicolon){
		    return init_decl_list;
		});

	var jump_statement=t("goto").and(identifier).and(t(";"));
	jump_statement=jump_statement.or(t("continue").and(t(";")).ret(function(){return "continue;";}));
	jump_statement=jump_statement.or(t("break").and(t(";")).ret(function(){return "break;";}));
	jump_statement=jump_statement.or(t("return").and(expression.opt()).and(t(";"))
		.ret(function(_return,expr,semicolon){return ["return",expr,";"];}));

	var iteration_statement=t("while").and(t("(")).and(expression).and(t(")")).and(statement_lazy)
		.ret(function(_while,rp,expr,rp,state){
		    var startName="start"+(startSeq++);
		    return [
			"var ",startName,"=loop_start();","while","(",expr,"){try{",state,
			"}finally{loop_chk2(",startName,");}}"];});
	iteration_statement=iteration_statement.or(t("do").and(statement_lazy)
		.and(t("while")).and(t("(")).and(expression).and(t(")")).and(t(";"))
			.ret(function(_do,state,_while,lp,expr,rp,semicolon){
				var startName="start"+(startSeq++);
				return ["var ",startName,"=loop_start();","do{try{",state,
					"}finally{loop_chk2(",startName,");}}","while","(",expr,")",";"
				];
			}));
	var for_part=expression.and(t(";"))
		.ret(function(expr,semicolon){return [expr,";"];});
	iteration_statement=iteration_statement.or(t("for").and(t("("))
		.and(declaration.or(for_part).or(t(";"))).and(expression.opt())
		.and(t(";")).and(expression.opt()).and(t(")")).and(statement_lazy)
		.ret(function(_for,lp,e1,e2,s2,e3,rp,state){
			var startName="start"+(startSeq++);
			return [
				"var ",startName,"=loop_start();",
				"for","(",e1,e2,";",e3,")",
				"{","loop_chk2(",startName,");",state,"}"
			];
		}));

	var else_part=t("else").and(statement_lazy).ret(function(_else,state){return ["else",state];});
	var selection_statement=t("if").and(t("(")).and(expression).and(t(")")).and(statement_lazy)
		.and(else_part.opt()).ret(function(_if,lp,expr,rp,state,_else_part){
			return ["if","(",expr,")",state,_else_part];
		});
	selection_statement=selection_statement.or(t("switch").and(t("(")).and(expression).and(t(")"))
		.and(switch_compound_statement_lazy).ret(function(_switch,lp,expr,rp,state){
			return ["switch","(",expr,")",state];
		}));

	var compound_statement_part=declaration.or(statement_lazy).rep0();
	var compound_statement=t("{").and(compound_statement_part).and(t("}"))
		.ret(function(lcb,states,rcb){
		    return ["{",
		        "var ",curScopesName(),"={};",
				states,
			"}"];
		});
	compound_statement=newScope(compound_statement);
	var switch_compound_statement=t("{").and(compound_statement_part).and(t("}"))
		.ret(function(lcb,states,rcb){return ["{",states,"}"];});
	var expression_statement=expression.opt().and(t(";"))
		.ret(function(state,semicolon){return [state,";"];});
	var labeled_statement=identifier.and(t(":")).and(statement_lazy)
		.ret(function(identifier,colon,state){return [identifier,":",state];});
	labeled_statement=labeled_statement.or(t("case").and(constant_expression)
		.and(t(":")).and(statement_lazy).ret(function(_case,constant_expr,colon,state){
			return ["case",constant_expr,":",state];
		}));
	labeled_statement=labeled_statement.or(t("default").and(t(":")).and(statement_lazy)
		.ret(function(_default,colon,state){return ["default",":",state];}));

    var asm_block;
    var asm_block_lazy=Parser.lazy(function(){return asm_block;});
	asm_block=t("{").and(t(/^[^\{\}]+/).or(asm_block_lazy).rep0().ret(MKARY)).and(t("}")).
    ret(MKARY);
    var asm_statement=t("__asm").and(asm_block).ret(function (_,b) {
        return b;
    });
	statement=expression_statement;
	statement=statement.or(labeled_statement);
	statement=statement.or(compound_statement);
	statement=statement.or(selection_statement);
	statement=statement.or(iteration_statement);
	statement=statement.or(jump_statement);
    statement=statement.or(asm_statement);
	// \statements
	statements=statement.rep0().ret(function(states){return states;});
    // \argument_expressions
	var argument_expressions=structCp(expression).sep0(t(","),true).ret(function(param){
		if(param=="void")return "";
		if(!Array.isArray(param))return param;
		var res=[];
		param.forEach(function(e){res.push(e);res.push(",");});res.pop();
		return extend(res,{args:param,type:"argument_expression"});
	});
	//func_call=identifier.and(t("(")).and(argument_expressions.opt()).and(t(")"))
	//	.ret(function(identifier,lp,args,rp){return [identifier,"(",args,")"];});
	var arr_expression=identifier.and(t("[")).and(expression).and(t("]"))
		.ret(function(identifier,lsb,expr,rsb){return [identifier,lsb,expr,rsb];});
    // PTR
	/*var ptr_identifier=t("&").and(identifier).ret(function(and,identifier){
		return (function(){
			var s=findVariable(identifier);
			return extend(["pointer(",
			    ["scopes_"+s.depth, lit(identifier), lit(s.vtype)].join(","),
			")"],{vtype:["array",s.vtype]} ); 
		})();
	});*/
	// \var_identifier
	var var_identifier=identifier.ret(function(identifier){
	    var s=findVariable(identifier);
	    return extend( [variableName(identifier)], s);//extend(s,{vname:identifier}));
	});

	primary_expression=var_identifier.or(constant).or(string).or(
	    t("(").and(expression.ret(chkTypeIsSet("ln.585"))).and(t(")")).ret(function(lp,expr,rp){
	        return extend(["(",expr,")"],{vtype:expr.vtype,type:"paren_expr"});
	    })
	);
    // \postfix_expression
	postfix_expression=ExpressionParser();
	postfix_expression.element(primary_expression);
	//postfix_expression.element(ptr_identifier);
	postfix_expression.postfix(5,t("[").and(expression).and(t("]"))
		.ret(function(lsb,expr,rsb){
		    // PTR
			var $=["[",expr,"]"];
			$.type="index";
			$.index=expr;
			return $;
		}));
	postfix_expression.postfix(5,t("(").and(argument_expressions.opt()).and(t(")")).ret(
	    function(lp,args,rp){
	        return extend([lp,args,rp],{args:args.args,type:"func_call"});
	    }));
	postfix_expression.postfix(4,t("++"));
	postfix_expression.postfix(4,t("--"));
	postfix_expression.postfix(5,t(".").and(identifier)
		.ret(function(peri,identifier){
		    return extend([".",identifier],{type:"dot",vname:identifier});
		}));
	postfix_expression.postfix(5,t("->").and(identifier)
		.ret(function(arrow,identifier){
		    return extend(["->",identifier],{type:"arrow",vname:identifier});
		}));
	postfix_expression.mkPostfix(mkpost);
	postfix_expression.mkPrefix(mkpre);
	postfix_expression=postfix_expression.build();
    //\unary_expression
	unary_expression=postfix_expression.ret(chkTypeIsSet("postf600")).or(
	    t("++").or(t("--")).and(unary_expression_lazy).ret(function (op,right) {
	        return extend([op,right], {vtype:right.vtype});
	    })
	).or(
	    unary_operator.and(cast_expression_lazy).ret(function (op,right) {
	        assert(right.vtype,"right.vtype not set at cast_expr (from unary_expr)");
	        // PTR
    	    if (op.text=="&") {
    	        if (right.type==="paren_expr") {
    	            right=right[1];
    	        }
    	        //console.log("OP",right,right.vname);
    	        if (right.type==="post" && right.op.type==="index") {
	                return extend( ["pointer(",right.left,",",right.op.index,")"] ,
	                {vtype: T.Pointer(right.vtype)} );
    	        } else if (right.type==="post" && right.op.type==="arrow") {
	                return extend( ["pointer(",right.left,",",lit(right.op.vname),")"] ,
	                {vtype: T.Pointer(right.vtype)} );
    	        } else if (right.type==="post" && right.op.type==="dot") {
	                return extend( ["pointer(",right.left,",",lit(right.op.vname),")"] ,
	                {vtype: T.Pointer(right.vtype)} );
    	        } else if (right.vname) {
                 	var s=findVariable(right.vname);
        			return extend(["pointer(",
        			    ["scopes_"+s.depth, lit(right.vname), typeLit(s.vtype)].join(","),
        			")"],
        			{vtype: T.Pointer(s.vtype)} ); 
    	        } else {
    	            console.log("Invalid &",right);
    	            throw newError("&の使い方がまちがっています",right);
    	        }
    	    } else if (op.text=="*") {
    	        if (!((right.vtype) instanceof T.Pointer)) {
    	            throw newError("* はポインタ型にしか使いません",right);
    	        }
    	        return extend(["(",right,").read()"], {
    	            type:"pointerDeref",
    	            vtype: right.vtype.e,
    	            pointer: right
    	        });      
    	    }
    	    return extend([op,right], {vtype:right.vtype});
	    })
	);
	type_name=specifier_qualifier_list.and(abstract_declarator.opt())
		.ret(function(specifier_qualifier_list,abstract_declarator){
		    var vtype=typeNamesToType(specifier_qualifier_list);
			return extend([specifier_qualifier_list,abstract_declarator],{vtype:vtype});
		});
    // \cast_expression
	cast_expression=unary_expression.ret(chkTypeIsSet("unary")).or(
	    t("(").and(type_name).and(t(")")).and(cast_expression_lazy)
	    .ret(function(lp,type_name,rp,cast_expr){
    	    var t=type_name.vtype;//typeNamesToType([type_name+""]);
    	    if (!t) throw newError("Type for "+type_name+" not found",type_name);
    	    return extend(["cast(",typeLit(t),",",cast_expr,")"],{vtype:t});
    	    //***
	    })
	);
	function chkTypeIsSet(unary) {
	    return (function (r) {
    	    if (!(r.vtype)) {
    	        console.log("Type is not set at:",r);
    	        throw newError("type is not set at "+unary,unary);
    	    } 
    	    return r;
	    });
	}

	var init_param=declarator/*.and(t("=").and(initializer).opt()).ret(MKARY)*/;
	var func_param=declaration_specifiers.and(init_param).ret(
	    function (decl_spec, declarator) {
	        var $=["scopes_"+(ctx.depth+1)+".", //TODO
				declarator,"=","ARGS.shift();","/*", typeLit(declarator.vtype),"*/"];
			$.pname=declarator.vname;
			$.ptype=declarator.vtype;//ctx.depth+1;
		    return $;
	    });
	var func_param_list=_void.or(func_param.sep0(t(","),true))
		.ret(function(params){
		    if (!(params instanceof Array)) return [];//void
		    return params;
		});
    // \func
    var func_head=declaration_specifiers.opt().ret(function (r) {
        baseType=r?r.vtype:T.int;
    }).and(declarator).ret(function (_,r){return r;});
    var func=func_head.and(Parser.create(function (st) {
        var decl=st.result[0];
        var type=decl.vtype;
        var name=decl.vname;
        var params=decl.params;
        //console.log("TNP",type,name,params);
        addScope(name,{
            vtype:type, 
            by: "function_definition_pre"
        });
        var depth=ctx.depth;
        var rst;
        newScope(function () {
            var getParams=[];
            if (params) params.forEach(function (param) {
                addScope(param.vname,{vtype:param.vtype,by:"param"});
                if (param.vtype!==T.void) {
                    getParams.push(["scopes_"+(ctx.depth)+".", 
	    			param.vname,"=","ARGS.shift();","/*", typeLit(param.vtype),"*/"]);
                }
            });
            var func="function ";
            if (supportsAsync) {
                func="async function ";
            } else if (ABG.supportsGenerator) {
                func="function* ";
            }
            rst=t("{").and(compound_statement_part).and(t("}")).ret(function (_,states) {
                return ["scopes_"+depth,".",name,"=",
                    func,name,"(){",
    				"var ",curScopesName(),"={};",
                    "var ARGS=Array.prototype.slice.call(arguments);\n",
                    getParams,
			        states,
        			"};"
                ];
            }).parse(st);
        });
        if (rst && rst.success) {
            /*if (ctx.scope[name+""].hasDefinition) {
                console.log("ERRalr",decl);
                throw newError(name+"はすでに定義されています．",decl);
            }*/
            addScope(name,{by:"function_definition"});
        }
        return rst;
    })).ret(function (_,r) {
        //console.log(JSON.stringify( r) ); 
        return r;
    });
    function addScope(name,obj) {
        obj.depth=ctx.depth;
        obj.vname=name;
        //assert(ctx.depth===obj.depth);
        var v=ctx.scope[name+""];
        if (!v || v.depth!==ctx.depth) {
            v={};
        }
        ctx.scope[name+""]=v;
        if (typeof name.pos==="number") {
            v.occurence=v.occurence||{};
            v.occurence[name.pos]=obj.by;
        } else {
            console.log("STRNAME",name);
        }
        
        /*if (v.vtype && obj.vtype) {
            if ( (v.vtype) instanceof T.Function ) {}
            else {
                throw newError(name+"はすでに定義されています",name);
            }
        }*/
        //console.log("addScope",obj.by,name+"",ctx.depth);
        // TODO check vtype compat
        for (var k in obj) {
            v[k]=obj[k];
        }
        if (name!=="boido_baryuu") {
            assert.is(ctx.scope[name+""].vname.pos, Number);
        }
    }

    /*var func1=(func_type.opt()).and(identifier).and( 
            t("(").and(func_param_list.opt()).and(t(")")).ret(function (_,r){return r;})
        ).and(Parser.create(function (st) {
            var type=st.result[0];
            var name=st.result[1];
            var params=st.result[2];
            //console.log("TNP",type,name,params);
            ctx.scope[name+""]={
                vtype:T.Function(type?typeNamesToType([type]):T.int,params), 
                depth: ctx.depth
            };
            var depth=ctx.depth;
            var rst;
            newScope(function () {
                if (params) params.forEach(function (param) {
                    ctx.scope[param.pname+""]={vtype:param.ptype, depth: ctx.depth};
                });
                var func="function ";
                if (supportsAsync) {
                    func="async function ";
                } else if (ABG.supportsGenerator) {
                    func="function* ";
                }
                rst=t("{").and(compound_statement_part).and(t("}")).ret(function (_,states) {
                    return ["scopes_"+depth,".",name,"=",
                        func,name,"(){",
        				"var ",curScopesName(),"={};",
                        "var ARGS=Array.prototype.slice.call(arguments);\n",
                        params,
				        states,
            			"};"
                    ];
                }).parse(st);
            });
            return rst;
        })).ret(function (_,_,_,r) {
            //console.log(JSON.stringify( r) ); 
            return r;
        });*/

	//control
	var filename=t(/^[a-zA-Z][a-zA-Z0-9]*\.?[a-zA-Z0-9]+/);
	var control_line=t("#").and(t("define")).and(identifier).and(t(/^.+/)).ret(function(s,def,befor,after){
	    defines[befor]=after;
	});
	control_line=t("#").and(t("include")).and(t("<").or(t("\""))).and(filename).and(t(">").or(t("\""))).ret(function(){
	    var filename=arguments[3];
	    //console.log("filename",filename);
	    switch (filename.text) {
	        case "stdio.h":
	            return ["printf","scanf","sleep","usleep"].map(function (n) {
	                return "void "+n+"();\n";
	            }).join("\n");
	        case "stdlib.h":
	            return ["rand"].map(function (n) {
	                return "void "+n+"();\n";
	            }).join("\n");
	        case "string.h":
	            return ["strlen","strcpy","strncpy","strcmp","strncmp",
	            "strcat","strncat","memset","index","rindex",
	            "memcmp","memcpy","strstr"].map(function (n) {
	                return "void "+n+"();";
	            }).join("\n");
	        case "math.h":
	            // also in lib.js
                return ["abs","acos","asin","atan","atan2","ceil","cos","exp","floor",
                "log","max","min","pow","random","round","sin","sqrt","tan"].map(function (n) {
	                return "double "+n+"();";
	            }).join("\n");
	        case "x.h":
                return ["fillRect","clear","update","setColor","drawGrid","drawNumber",
                "setPen","movePen","fillOval","drawText","drawString","getkey","setLineWidth"].map(function (n) {
	                return "void "+n+"();";
	            }).join("\n");
	    }
	    return null;
	}).or(control_line);


	expr = func.or(declaration);
	program=newScope(expr.rep0());
	
	//preprocess
	var preprocess=function(str){
		var lines = str.split("\n");
		for(var i in lines){
			//lines[i]=lines[i].replace(/\/\/.*/," "); why?
			var res=(lines[i])?control_line.parseStr(lines[i]):"";
			if(res.success){
				lines[i]=res.result[0]||"";
				//res();
			} else {
			    lines[i]=lines[i].replace(/(\'[^\']*\')|(\"[^\"]*\")|(\b[A-Za-z0-9]+\b)/g,function (s) {
			        return (s in defines ? defines[s] : s );
			    });
			}	
		}
		//console.log("preproc",lines.join("\n"));
		return lines.join("\n");
	};


	parser.parse=function (str) {
	    startSeq=0;
		defines={NULL:0};
		var output="";
		var preLines=str.split("\n").length;
		var processed=preprocess(str);
		var postLines=processed.split("\n").length;
		ctx=context();
		var result;
		try {
    		result=program.parseStr(processed);
		} catch(e) {
			var pos=rowcol(e.pos);
			console.log("original stk",e.stack);
		    var ne=new Error(e.message+"\n"+pos.row+"行目付近を確認してください。");
		    ne.original=e;
		    throw ne;
		}
		output=result.result[0];
        /*if (result.success) {
            console.log("OUT",JSON.stringify( output) ); 
        }*/

		if(result.src.maxPos<processed.length){
			/*var max=processed.substr(0,result.src.maxPos);
			var line=max.match(/\n/g);
			line=(line)?line.length:0;
			var parseErr=new Error("文法エラーがあります。\n"+(line+1-(postLines-preLines))+"行目付近を確認してください。");
			parseErr.lineNo=line+1;*/
			console.log("Parse error at ",result.src.maxPos,
			processed.substring(0,result.src.maxPos)+"!!HERE!!"+processed.substring(result.src.maxPos));
			var pos=rowcol(result.src.maxPos);
			var parseErr=new Error("文法エラーがあります。\n"+pos.row+"行目付近を確認してください。");
			parseErr.lineNo=pos.row;
			throw parseErr;
		}
    	return output;
    	function rowcol(p) {
			var max=processed.substr(0,p);
			var lines=max.match(/\n/g);
			var line=(lines)?lines.length:0;
			return {row:line+1-(postLines-preLines),col:1};
    	}
	};
	return parser;
}();
return window.MinimalParser;
});