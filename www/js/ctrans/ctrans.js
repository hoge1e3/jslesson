define(["ctrans/ctype","AsyncByGenerator","Parser","context","ExpressionParser","assert","Message"],
function (T,ABG,Parser,context,ExpressionParser,assert,Message) {
//\b(t|T|CType)\.(char|byte|int|double|float|void)\b
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
	var errors=[];
	var typeDefs=[];
    function newError2() {
        var params=Array.prototype.slice.call(arguments);
        var node=params.shift();
        var mesgTmpl=params.shift();
        if (params.length===1 && params[0] instanceof Array) params=params[0];
        var mesg=Message.build(mesgTmpl,params);
        //console.log("MB",mesgTmpl,params,mesg);
        var e=new Error(mesg);
        e.errorType=mesgTmpl;
        e.errorParams=params;
	    e.pos=node && node.pos;
	    if (!e.pos) {
    	    console.log("newerror2 Warning no node info in",node);
	    }
	    errors.push(e);
	    return e;
    }
    /*function newError(mesg,node) {
	    var e=new Error(mesg);
	    e.pos=node && node.pos;
	    if (!e.pos) {
    	    console.log("newerror Warning no node info in",node);
	    }
	    errors.push(e);
	    return e;
	}*/
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
    var topLevelScope={NULL:{vtype:T.Pointer(T.Void()),depth:0}};
	//\newScope
	function newScope(parser) {
	    var entf=function () {
            var depth=0;
            if ((typeof (ctx.depth))=="number") depth=ctx.depth+1;
            var ns=Object.create(ctx.scope||topLevelScope);
            //ns[DEPTH]=depth;
            //scids.push(ns);
            var nc={scope:ns ,depth:depth };
            return nc;
	    };
        var checkDuplicate=function (r) {
            //console.log("CHKDUP",ctx.scope);
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
                            //OK
                        }
                        else {
                            newError2(ctx.scope[k].vname,"'{1}'はすでに定義されています．",ctx.scope[k].vname);
                            //newError(ctx.scope[k].vname+"はすでに定義されています",ctx.scope[k].vname);
                        }
                    }
                    if (cnt==1 &&
                        ctx.scope[k].vtype instanceof T.Function &&
                        !ctx.scope[k].vtype.modifiers.extern &&
                        !bys["function_definition"]) {
                        newError2(ctx.scope[k].vname,"'{1}'はプロトタイプ宣言されていますが，定義がありません．",ctx.scope[k].vname);
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
    function saveBaseTypeInjector(a) {var s=baseType;a();baseType=s;}
    function saveBaseType(parser) {// parser -> parser
        return inject(parser, saveBaseTypeInjector);
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
          if(k==="length") throw new Error("DO not use length");
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
        if (n.isMacro) {
            return {
                depth:0,
                vname:n.macroName,
                vtype:T.Int(),//TODO vtype other than int
                isMacro:true,
                macroValue:n.macroValue
            };
        }
        var name=n+"";
        var r=ctx.scope[name];
        if (!r) {
            if (builtin_func_to_include[name]) {
                throw newError2(n,
                    "'{1}'は定義されていません．\n"+
                    "#include<{2}>を追加し忘れていませんか？",n,builtin_func_to_include[name]);
                /*throw newError(
                    n+"は定義されていません．\n"+
                    "#include<"+builtin_func_to_include[name]+">を追加し忘れていませんか？",n);*/
            }
            /*if (findFuncFromIncludes(name)) {
                throw newError2(n,
                    "'{1}'は定義されていません．\n"+
                    "#include<{2}>を追加し忘れていませんか？",n,findFuncFromIncludes(name));

            }*/

            for (var k in ctx.scope) {
                if (k.toLowerCase()===name.toLowerCase()) {
                    throw newError2(n,
                        "'{1}'は定義されていません．大文字小文字は区別されます．\n"+
                        "'{2}'の間違いかもしれません．",n,k);
                    /*throw newError(
                        n+"は定義されていません．大文字小文字は区別されます．\n"+
                        k+"の間違いかもしれません．",n);*/
                }
            }
            throw newError2(n,"'{1}'は定義されていません．",n);
            //throw newError(n+"は定義されていません",n);
        }
        return r;
    }
    function variableName(n) {
        var v=findVariable(n);
        if (v.isMacro) return v.macroValue;
        return "scopes_"+v.depth+"."+n;
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
    // \type_specifier
	var type_specifier=t(/^(?:void|char|short|int|long|float|double|signed|unsigned)\b/).
	    or(struct_or_union_specifier_lazy)/*.or(enum_specifier_lazy)*/.or(typedef_name);
    // \type_qualifier
    var type_qualifier=t(/^(?:const|volatile)/);
	var type_qualifiers=type_qualifier.rep1();
	var unary_operator=t(/^(?:\*|\+|\-|\~|\!|\&)/);//&
	var assignment_operator=t(/^(?:=|\*\=|\/=|\%\=|\+=|\-\=|<<=|>>=|\&=|\^=|\|=)/);
	/*var var_type=t("unsigned").opt().and(_int.or(float).or(char).or(double))
		.ret(function(u,type){return [((u)?u+" ":""),type];});*/
	var func_type=_int.or(float).or(char).or(double).or(_void);
	var reg_str = RegExp("^[^\"^\”]*");
	//文字列の正規表現
	var string = t(/^\"((\\(.|\n))*[^\\\"\n]*)*\"/).ret(function(str){
		return extend(["str_to_ch_ptr(",str,")"],{type:"string",vtype:T.Array(T.Char()),isConst:true});
	});
	var integer_constant=t(/^0[xX][0-9a-fA-F]+/).or(t(/^0[bB][01]+/)).or(t(/^[0-9]+/)).
	ret(function (r) {
	    return extend(r,{vtype:T.Int(),isConst:true});
	});
    /*var null_constant=t(/^NULL/).
	ret(function (r) {
	    return extend(r,{vtype:T.Pointer(T.Void())});
	});*/
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
	    return {value:v, vtype:T.Char(),toString:function(){return v+"";},isConst:true};
	}
	var floating_constant=t(/^[0-9]+\.[0-9]*/).
	ret(function (r) {
	    return extend(r,{vtype:T.Float(),isConst:true});
	});
	var constant=floating_constant.or(character_constant).or(integer_constant)/*.or(enumeration_constant)*/;
	//\identifier
	var identifier=t(/^[a-zA-Z_][a-zA-Z0-9_]*/).except(function(identifier){
			return ((identifier.text).match(reserved_word));
		}).ret(function(identifier){
			if((identifier+"") in defines){
			    identifier.isMacro=true;
			    identifier.macroValue=defines[identifier+""];
			    identifier.macroName=identifier+"";
			    identifier.text=identifier.macroValue+"";
			    return identifier;
			}
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
        console.log("375:baseType",baseType);
        return baseType;
    }).and(struct_declarator_list).and(t(";")).ret(function (t,decl,sc) {
        return decl;
    });
	var struct_declaration=saveBaseType(struct_declaration_raw);
	//\struct_or_union_specifier
	struct_or_union_specifier=struct_or_union.and(identifier.opt()).
    	and(newScope( t("{").and(struct_declaration.rep1()).and(t("}")) ))
		.ret(function(struct_or_union,identifier,lcb,struct_declarations,rcb){
		    var t=T.Struct(identifier?identifier+"":null);
		    //console.log("229:decls",struct_declarations);
	        struct_declarations.forEach(function (declaration) {
		        declaration.forEach(function (declarator) {
	    	         //console.log("DECL-or",declarator);
		             t.addMember(declarator.vtype,declarator.vname+"");
		        });
		    });
		    //console.log("Struct",t);
		    if (identifier) {
    		    if (ctx.depth>0) {
                    newError2(identifier,"関数内ではtypedefは使えません．");
    		        //newError("関数内ではtypedefは使えません",identifier);
    		    }
		        addTypeDef(identifier,t);
		        addScope(identifier,{vtype:T.TypeDef(t),by:"struct_specifier"});
		    }
			return extend([struct_or_union,identifier,"{",struct_declaration,"}"],
			{vtype:t});
		}).or(
		    struct_or_union.and(identifier).ret(function(struct_or_union,identifier){
		        /*if (!ctx.scope[identifier.text]) {
		            throw newError(identifier.text+" は定義されていません",identifier);
		        }*/
		        var v=findVariable(identifier);
		        var vtype=v.vtype;
		        assert.is(vtype,T.TypeDef);
		        return {vtype: vtype.e};
		    }));

    // \specifier_qualifier_list
	specifier_qualifier_list=type_qualifier.or(type_specifier).rep1();
    //type_specifier=t(/^(?:void|char|short|int|long|float|double|signed|unsigned)\b/).
	//or(struct_or_union_specifier_lazy)/*.or(enum_specifier_lazy)*/.or(typedef_name);
    //const volatile

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
    var baseType=T.Int();
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
	            case "int": res=T.Int();break;
	            case "float": res=T.Float();break;
	            case "double": res=T.Double();break;
	            case "byte": res=T.Byte();break;
	            case "char": res=T.Char();break;
	            case "void": res=T.Void();break;
	            case "unsigned": res=T.Unsigned(res||T.Int());break;
	            case "long": res=T.Long(res||T.Int());break;
	            case "short": res=T.Short(res||T.Int());break;
	            case "typedef":
	                if (!res) {
    	                console.log("TYPEDEF error",types);
                        throw newError2(type,"typedef 型 型名; という形式で定義してください．");
    	                //throw newError("typedef 型 型名; という形式で定義してください",type);
	                }
	                res=T.TypeDef(res); break;
                case "extern":
                case "register":
                case "auto":
                case "static":
                case "const":
                case "volatile":
                    if (!res) {
                        console.log("modifiers error",types);
                        throw newError2(type,"'{1}'の後ろには型名が必要です．",type.text);
                    }
                    res.modifiers[type.text]=1; break;
	            default:
	                console.log("Not a valid type:",types,"["+i+"]");
                    throw newError2(type,"'{1}' is not a valid type",type.text);
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
                var otype=$.vtype;
    		    switch(tail.type) {
		        case "decl_array":
		            $.vtype=T.Array(otype,tail.elementLength);
                    $.vtype.extendModifiers(otype);
		            break;
    		    case "decl_params":
    		        //console.log("DECLPARAM",direct_decl_head,baseType,$);
    		        $.vtype=T.Function(otype,tail.params);
                    $.vtype.extendModifiers(otype);
    		        $.params=tail.params;
		            break;
    		    /*case "decl_idents":
    		        $.vtype=T.Function($.vtype,[]);
		            break;*/
		        }

    		}
    		$.vname=direct_decl_head.vname;
    		if (($.vtype) instanceof T.TypeDef) {
    		    if (ctx.depth>0) {
    		        newError2($.vname,"関数内ではtypedefは使えません．");
    		    }
    		    if (($.vtype.e) instanceof T.Struct) {
    		        $.vtype.e.name=$.vname+"";
    		        addTypeDef($.vname,$.vtype.e);
    		    }
    		}
    		addScope($.vname,{vtype:assert.is($.vtype,T.Base), by:"direct_declarator"});
    		//ctx.scope[$.vname+""]={vtype:$.vtype, depth: ctx.depth};
    		return $;
	    }
	);
	var pointer=t("*");//.and(type_qualifiers.opt()).ret(function(mul,type_qualifiers){return [];});
    //\declarator = pointer? direct-declarator  (pointer? まだ)
	declarator=saveBaseType(
	    pointer.rep0().ret(function (ps) {
    	    for (var i=0 ; i<ps.length; i++) {
                var otype=baseType;
    	        baseType=T.Pointer(otype);
                baseType.extendModifiers(otype);
    	    }
    	    return baseType;
    	}).and(direct_declarator).ret(function (t,d) {
    	    //console.log("Decl-or",d);
    	    return d;
    	})
    );
    //\parameter_declaration
	var parameter_declaration=declaration_specifiers.and(declarator)
		.ret(function(declaration_specifiers,declarator){
		    return extend([declaration_specifiers,declarator],{
		        vtype:declarator.vtype,
		        vname:declarator.vname});
		}).or(t("void").ret(function () {
	    return {vtype:T.Void(),vname:"boido_baryuu"};})
	);
    //\parameter_type_list
	//parameter_type_list=t(",").and(parameter_declaration)
	//	.ret(function(comma,parameter_declaration){return [",",parameter_declaration];});
	//\parameter_list
	var parameter_list_raw=parameter_declaration.sep0(t(","),true);
	parameter_list=saveBaseType(parameter_list_raw);
	/*.
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
	calc_expression.infixl(10,t("==").ret(function(ee){ee.text="===";return ee;}));
	calc_expression.infixl(10,t("!=").ret(function(ne){ne.text="!==";return ne;}));
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
	    var t=left.vtype.binOpable(op,right.vtype);
	    if (!t) {
	        console.log("No op",left.vtype,op,right.vtype);
            newError2(op,"この型同士で演算'{1}'はできません．",op);
	        //newError("この型同士で演算"+op+"はできません",op);
	    }
	    if ((left.vtype) instanceof T.Pointer) {
	        if (op+""==="+" || op+""==="-") {
	            return extend([CD(left),".offset(",op+"",CD(right),")"],
	            {vtype:left.vtype});
	        } else if (op+""==="*" || op+""==="%" || op+""==="/") {
	            newError2(op,"'{1}'はポインタ型に使用できない演算子です．",op);
	        }
	    }
	    return extend(["(",CD(left),op,CD(right),")"],{vtype:t});
	}
	function CD(e) {
	    return extend(["checkDust(",e,")"],{});
	}
	//\mkpost
	function mkpost(left,op){
	    var t=left.vtype;
	    chkTypeIsSet("mkpost")(left);
	    var r=unwrapParen(left);
	    left=r[0];
	    var wrapF=r[1];
	    var expr=[wrapF(left),op];
	    if (op.type=="index") {
	        if (t instanceof T.Array || t instanceof T.Pointer) {
	            if (!t.e) {
	                failWithCon(left,op,t,"Cannot resolve type of left[op]");
	            }
	            t=t.e;
	        } else {
                newError2(left,"配列やポインタでないものに対して添字を使おうとしています");
            }
	        expr=["pointer(",left,",",op.index,",",typeLit(t),").read()"];
        } if (op+""==="++" || op+""==="--") {
	        //var op2=(op+"")[0]+"=";
            if (left.type==="post") {
		        var pleft=left.left;
		        var pop=left.op;
        	    if (pop.type=="index") {
        	        // left op
        	        // a[1] ++
        	        // pleft=a  pop=[1]
        			return extend(
        			    ["pointer(",pleft,",",pop.index,").writeOp(",lit(op+""),")"],
        			    {vtype:left.vtype}
        			);
        	    } else if (pop.type==="func_call") {
        	        throw newError2(left,"++や--の手前では関数呼び出しできません．");
            	} else if (pop.type==="arrow") {

        	    } else if (pop.type==="dot") {

        	    }
		    } else if (left.type=="pointerDeref") {
		        // left op
		        // (*p) ++
		        // p.writeOp("++")
    			return extend(
    			    ["(",left.pointer,").writeOp(",lit(op),")"],
    			    {vtype:left.vtype}
    			);
		    }
		    if ((left.vtype) instanceof T.Pointer) {
		        //   left op
		        //   p    ++
		        return extend([
		            "(function () {",
		                "var sp=",left,";",
		                left,"=",left,".offset(",(op+""==="++"?1:-1),");",
		                "return sp;",
		            "})()"
		        ],{vtype:left.vtype});
		    }
            if (left.isMacro || left.isConst) {
		        newError2(left,"++ や -- の直前に定数は書けません．");
		    }
		 } else if (op.type==="func_call") {
	        //vtype TODO
	        if (supportsAsync) {
        	    expr=["await(",wrapF(left),op,")"];
	        } else if (ABG.supportsGenerator) {
	            expr=["(yield* AsyncByGenerator.toGen(",wrapF(left),op,"))"];
	        }
	        if (t instanceof T.Function) {
	            var argList=op.args.map(function (arg) {
	                return arg.vtype;
	            });
	            var mr=t.match(argList);
	            if (mr!==true && mr instanceof Array) {
                    newError2(op,mr.shift(),mr);
    	            //newError(mr,op);
	            }
	            t=t.ret;
	        } else {
	            throw newError2(left,"関数でないものに対して関数として呼び出しています．");
    	        //expr.push(["/*",t.toLiteral(),"*/"]);
	        }
	    } else if (op.type==="arrow") {
    	    expr=["(",left,").read().",op[1]];//vtype TODO
    	    if (!(t instanceof T.Pointer)) {
	            newError2(op,"->参照はポインタにのみ使えます．");
	        }
	        t=t.e;
	        if (!(t instanceof T.Struct)) {
	            newError2(op,"->参照は構造体のポインタにのみ使えます．");
	        }
	        var mem=t.getMember(op.vname+"");
	        if (!mem) {
                newError2(op,"構造体'{1}'にメンバ'{2}'は定義されていません．",t.name,op.vname);
	            //newError("構造体"+t.name+"にメンバ"+op.vname+"は定義されていません",op);
	        }
	        t=assert.is(mem.vtype,T.Base);
	    } else if (op.type==="dot") {
	        if (!(t instanceof T.Struct)) {
                newError2(op,"ドット参照は構造体にのみ使えます．");
	            //newError("ドット参照は構造体にのみ使えます",op);
	        }
	        var mem=t.getMember(op.vname+"");
	        if (!mem) {
                newError2(op,"構造体'{1}'にメンバ'{2}'は定義されていません．",t.name,op.vname);
	            //newError("構造体"+t.name+"にメンバ"+op.vname+"は定義されていません",op);
	        }
	        t=assert.is(mem.vtype,T.Base);
    	    expr=[wrapF(left),op];
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
                return extend(["copyStruct(",r,",",r.vtype.toLiteral(),")"] ,{
                    type:"copyStruct",vtype:r.vtype,original:r
                });
            } else return r;
        });
    };
    function unwrapParen(ex) {
        if(ex.type!=="paren_expr") {
            return [ex,function (e){return e;}];
        }
        while(ex.type==="paren_expr") {
            ex=ex[1];
        }
        return [ex,function (e){return ["(",e,")"];}];
    }
    //\assign
	assign=unary_expression_lazy.and(assignment_operator)
		.and(/*structCp(*/calc_expression/*)*/).ret(function(unary_expr,op,calc_expr){
		    var t;
		    if (op+""==="=") {
		        if (!unary_expr.vtype.assignableFrom(calc_expr.vtype)) {
		            console.log("= no" ,unary_expr.vtype, calc_expr.vtype);
		            newError2(op,"この型は代入できません．");
		        }
		        t=unary_expr.vtype;
		    } else {
		        var rt=unary_expr.vtype.binOpable((op+"")[0],calc_expr.vtype);
		        if (!rt) {
		            console.log("?= no" ,op+"",unary_expr.vtype, calc_expr.vtype);
		            newError2(op,"この型に対して'{1}'演算できません．",op);
		        }
		    }

		    if ((unary_expr.vtype) instanceof T.Struct) {
		        return extend(["copyStruct2(",
    		        unary_expr,",",
    		        calc_expr, ",",
    		        unary_expr.vtype.toLiteral(),
    		    ")"],
		        {vtype:unary_expr.vtype});
		    }
		    var r=unwrapParen(unary_expr);
		    var unary_expr=r[0];
		    var wrapF=r[1];
		    if (unary_expr.type==="post") {
		        var left=unary_expr.left;
		        var pop=unary_expr.op;
        	    if (pop.type=="index") {
        			return extend(
        			    wrapF(["pointer(",left,",",pop.index,").writeOp(",
        			        lit(op),",cast(",typeLit(unary_expr.vtype),",",calc_expr,
        			    "))"]),
        			    {vtype:unary_expr.vtype}
        			);
        	    } else if (pop.type==="func_call") {
        	        console.log("SAHEN",unary_expr);
        	        throw newError2(unary_expr,"左辺では関数呼び出しできません．");
            	} else if (pop.type==="arrow") {

        	    } else if (pop.type==="dot") {

        	    }
		    } else if (unary_expr.type=="pointerDeref") {
    			return extend(
    			    wrapF(["(",unary_expr.pointer,").writeOp(",lit(op),
    			        ",cast(",typeLit(unary_expr.vtype),",",calc_expr,
    			    "))"]),
    			    {vtype:unary_expr.vtype}
    			);
		    } else if (unary_expr.isMacro || unary_expr.isConst) {
		        newError2(unary_expr,"左辺に定数は書けません．");
		    }
			return extend(
			    [wrapF(unary_expr),op,"cast(",typeLit(unary_expr.vtype),",",calc_expr,")"],
			    {vtype:unary_expr.vtype}
			);
		}).or(calc_expression);

	expression=assign;
	var array_initializer=t("{").and(initializer_lazy.sep0(t(","),true)).and(t("}")).
	ret(function(lcb,initializers,rcb){
        var a=["pointer([",ajoin(",",initializers),"],0)"];
        return extend(a,{
            initializers: initializers,
	        elementLength:initializers.length, //DO NOT use length ... it truncates actual length
	        type:"arrayInit"
	    });
	});
    function checkArrayInitType(dstType, src) {
        assert.is(dstType, T.Base,"dstType");
        // src: {initializers, type:"arrayInit"} | {vtype:}
        if (src.type==="arrayInit") {
            if (dstType instanceof T.Array) {
                var inis=src.initializers;
                for (var i=0;i<inis.length;i++) {
                    checkArrayInitType( dstType.e , inis[i]);
                }
            } else if (dstType instanceof T.Struct) {
                var inis=src.initializers;
                if (dstType.members.length!= inis.length) {
                    newError2(src, "初期化子における構造体のメンバーの個数が違います");
                }
                for (var i=0;i<dstType.members.length;i++) {
                    checkArrayInitType( dstType.members[i].vtype , inis[i]);
                }
            } else {
                newError2(src,"{...}形式の初期化子は配列または構造体に使います");
            }
        } else if (src.vtype) {
            if (!dstType.assignableFrom(src.vtype)) {
                newError2(src,"この初期化子は代入できません");
            }
        } else {
            newError2(src,"初期化子のエラー");
        }
    }
	// \initializer
	initializer=assign.or(array_initializer);
	function defaultInitializer(vtype,depth) {
	    if (vtype instanceof T.Array) {
	        return ["arrInit2(",typeLit(vtype.e),",", (vtype.length||"0"),",",(depth>0)+"",")"];
	    } else if (vtype instanceof T.Struct) {
	        return ["StructObj("+vtype.toLiteral()+")"];
	    } else if (vtype instanceof T.Function) {
	        return "function (){}";
	    } else if (vtype instanceof T.TypeDef) {
	        return [vtype.e.toLiteral(true)];
	    } else {
	        return [depth==0?"0":"dustValue()","/*",typeLit(vtype),"*/"];
	    }
	}
	// \init_declarator
	var init_declarator=declarator.and(t("=").and(initializer).opt())
		.ret(function(declarator,eq,initializer){
		    // typedef X Y; cannot come here
		    // Why?
		    // typedef X Y can be read as func_head
		    //   and Y will be registered as typedef_name
		    // then func_head func_body fails
		    // reread as declaration
		    // typedef X Y  is entirely read as decl_spec(Y is type!)
		    // but init_decl_list can be 0 length ->parse OK
		    //console.log("InitDecl",declarator,eq,initializer);
		    var dtl=typeLit(declarator.vtype);
			var $=extend([curScopesName(),".",declarator,"=",
			    initializer?
                (initializer.type==="arrayInit"?
                    ["constructByArrInit(",dtl,",",initializer,")"]:
			        ((declarator.vtype) instanceof T.Struct?
			            ["copyStruct2(",defaultInitializer(declarator.vtype,ctx.depth),",",initializer,",",dtl,")"]:
			            ["cast(",dtl,",",initializer,")"]
                    )
			    ):
			    defaultInitializer(declarator.vtype,ctx.depth),";\n"
			],{type:"init_declarator"});
			/*if (
			    (declarator.vtype) instanceof T.Array
			    && initializer
			    && initializer.type==="arrayInit"
			    && declarator.vtype.length>initializer.elementLength) {
			    $.push(["expandArray(",
    			    curScopesName(),".",declarator,",",
    			    dtl,",",
    			    ctx.depth>0,
    			");\n"]);
			}*/
			/*if(declarator.isArray){
				$.isArray=declarator.isArray;
				$.isLength=declarator.isLength;
			}*/
			$.declarator=declarator;
			$.initializer=initializer;
            if (initializer) {
                checkArrayInitType(declarator.vtype,initializer);
                //console.log("Initor",declarator.vtype,initializer);
    		}
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
		    //console.log("InitDeclList",init_decl_list);
		    return init_decl_list;
		});

	var jump_statement=t("goto").and(identifier).and(t(";"));
	jump_statement=jump_statement.or(t("continue").and(t(";")).ret(function(){return "continue;";}));
	jump_statement=jump_statement.or(t("break").and(t(";")).ret(function(t){
	    if (ctx.breakable) return "break;";
	    newError2(t,"breakは繰り返しの中で使います．");
	}));
	jump_statement=jump_statement.or(t("return").and(expression.opt()).and(t(";"))
		.ret(function(_return,expr,semicolon){
            if (!expr) {
                if (ctx.ftype && !(ctx.ftype.ret instanceof T.Void)) {
                    newError2(semicolon,"戻り値の型がvoid以外の関数では，戻り値を設定してください．");
                }
            } else if (expr.vtype && ctx.ftype &&
                !ctx.ftype.ret.assignableFrom(expr.vtype)) {
                newError2(expr,"戻り値の型が一致しません");
            }
            return ["return",expr,";"];
        }));

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
	iteration_statement=ent(function () {
	    return {breakable:true};
	},iteration_statement);

	var else_part=t("else").and(statement_lazy).ret(function(_else,state){return ["else",state];});
	var selection_statement=t("if").and(t("(")).and(expression).and(t(")")).and(statement_lazy)
		.and(else_part.opt()).ret(function(_if,lp,expr,rp,state,_else_part){
            var t=expr.vtype;
            if (t && !(t instanceof T.Number)) {
                newError2(expr,"if文の条件は数値でなくてはなりません．");
            }
			return ["if","(",expr,")",state,_else_part];
		});
	var swst=t("switch").and(t("(")).and(expression).and(t(")"))
		.and(switch_compound_statement_lazy).ret(function(_switch,lp,expr,rp,state){
            console.log("SW", expr, expr.vtype);
            var vtype=expr.vtype;
            if (vtype && !(vtype instanceof T.Number)) {
                throw newError2(expr, "switch文の式は数値でなくてはなりません");
            }
			return ["switch","(",expr,")",state];
		});
	swst=ent(function () {
	    return {breakable:true};
	},swst);
	selection_statement=selection_statement.or(swst);

	var compound_statement_part=declaration.or(statement_lazy).rep0();
	var compound_statement=t("{").and(compound_statement_part).and(t("}"))
		.ret(function(lcb,states,rcb){
		    return ["{",
		        "var ",curScopesName(),"=LocalVariables();",
				states,
			"}"];
		});
	compound_statement=newScope(compound_statement);
	var switch_compound_statement=t("{").and(
            ent(
                function (){return {switchLabels:{}};},
                compound_statement_part
            )
        ).and(t("}"))
		.ret(function(lcb,states,rcb){return ["{",states,"}"];});
    var empty_statement=t(";").ret(function () {
        return ["doNotification('空文が使用されています．余分なセミコロンがありませんか？');"];
    });
	var expression_statement=expression.and(t(";"))
		.ret(function(expr,semicolon){
            var t=expr.vtype;
            if (t && t instanceof T.Function) {
                newError2(expr,"関数は()をつけて呼び出してください．");
            }
            return [expr,";"];
        });
	var labeled_statement=identifier.and(t(":")).and(statement_lazy)
		.ret(function(identifier,colon,state){return [identifier,":",state];});
	labeled_statement=labeled_statement.or(t("case").and(constant_expression)
		.and(t(":")).and(statement_lazy).ret(function(_case,constant_expr,colon,state){
            if (!ctx.switchLabels) {
                newError2(_case,"case はswitch文の中で使います");
            }
            if (ctx.switchLabels[constant_expr+""]) {
                newError2(constant_expr, "{1} はすでにcase文にあります",constant_expr+"");
            }
            ctx.switchLabels[constant_expr+""]=1;
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
    statement=statement.or(empty_statement);
	statement=statement.or(labeled_statement);
	statement=statement.or(compound_statement);
	statement=statement.or(selection_statement);
	statement=statement.or(iteration_statement);
	statement=statement.or(jump_statement);
    statement=statement.or(asm_statement);
	// \statements
	statements=statement.rep0().ret(function(states){return states;});
    // \argument_expressions
	var argument_expressions=/*structCp*/(expression).sep0(t(","),true).ret(function(param){
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
	    var r=extend( [variableName(identifier)], s);//extend(s,{vname:identifier}));
	    r.pos=identifier.pos;
	    return r;
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
	        var r=unwrapParen(right);
	        var right=r[0];
	        var wrapF=r[1];
	        // PTR
    	    if (op.text=="&") {
    	        /*if (right.type==="paren_expr") {
    	            right=right[1];
    	        }*/
    	        //console.log("OP",right,right.vname);
    	        if (right.type==="post" && right.op.type==="index") {
	                return extend( ["pointer(",right.left,",",right.op.index,",",typeLit(right.vtype),")"] ,
	                {vtype: T.Pointer(right.vtype),pos:op.pos} );
    	        } else if (right.type==="post" && right.op.type==="arrow") {
	                return extend( ["pointer(",right.left,",",lit(right.op.vname),")"] ,
	                {vtype: T.Pointer(right.vtype),pos:op.pos} );
    	        } else if (right.type==="post" && right.op.type==="dot") {
	                return extend( ["pointer(",right.left,",",lit(right.op.vname),")"] ,
	                {vtype: T.Pointer(right.vtype),pos:op.pos} );
    	        } else if (right.vname) {
                 	var s=findVariable(right.vname);
        			return extend(["pointer(",
        			    "scopes_"+s.depth,",",lit(right.vname), ",",typeLit(s.vtype),
        			")"],
        			{vtype: T.Pointer(s.vtype),pos:op.pos} );
    	        } else {
    	            console.log("Invalid &",right);
    	            throw newError2(right,"&の使い方がまちがっています．");
    	        }
    	    } else if (op.text=="*") {
    	        if (!((right.vtype) instanceof T.Pointer)) {
    	            throw newError2(right,"* はポインタ型にしか使いません．");
    	        }
    	        return extend(["(",right,").read()"], {
    	            type:"pointerDeref",
    	            vtype: right.vtype.e,
    	            pointer: right,
                    pos: op.pos
    	        });
    	    }
    	    return extend([op,wrapF(right)], {vtype:right.vtype});
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
    	    if (!t) throw newError2(type_name,"型'{1}'が見つかりません．",type_name);
    	    return extend(["cast(",typeLit(t),",",cast_expr,")"],{vtype:t});
    	    //***
	    })
	);
	function chkTypeIsSet(unary) {
	    return (function (r) {
    	    if (!(r.vtype)) {
    	        console.log("Type is not set at:",r);
    	        throw newError2(unary,"type is not set on '{1}'",unary);
    	    }
    	    return r;
	    });
	}

    // \newDecl  \funcDef
    // spec ;
    // spec init-decl ;
    // spec decl {}
    // spec init-decl , init-decl ... ;
    // decl {}
    var newDecl=declaration_specifiers.or(init_declarator).and(
    Parser.create(function (st) {
        function res(r) {
            st=st.clone();
            st.result=[r];
            return st;
        }
        var head=st.result[0];
        var init_decl_head;
        if (head.type==="declaration_specifiers") {
            st=t(";").or(init_declarator).parse(st);
            if (!st.success) {
                return st;
            }
            init_decl_head=st.result[0];
            if (init_decl_head+""===";") {
                // spec ;
                // TODO: yield  struct fred {int x,y;};
                if ((head.vtype) instanceof T.Struct && head.vtype.name) {
                    return res([
                        curScopesName(),".",head.vtype.name,"=",head.vtype.toLiteral(true),";\n"
                    ]);
                }
                return res([]);//"// TODO: yield  struct fred {int x,y;};\n"]);
            } else {
                // spec init-decl ;
                // spec decl {}
                // spec init-decl , init-decl ... ;
            }
        } else {
            //decl {}
            baseType=T.Int();
            init_decl_head=head;
        }
        // spec init-decl <!>;
        // spec decl <!>{}
        // spec init-decl<!> , init-decl ... ;
        // decl<!> {}
        // note: <!> is current position
        st=t("{").or(t(",")).or(t(";")).parse(st);
        if (!st.success) {
            return st;
        }
        var nx=st.result[0];
        if (nx+""===";") {
            // spec init-decl ;<!>
            return res(init_decl_head);
        } else if (nx+""===",") {
            // spec init-decl ,<!> init-decl ... ;
            st=init_declarator_list.and(t(";")).ret(getTh(0)).parse(st);
            if (!st.success) {
                return st;
            }
            return res( [init_decl_head].concat(st.result[0]) );
        }
        // spec decl {<!>}
        // decl {<!>}
        var rst;
        var init=init_decl_head.initializer;
        if (init) {
            throw newError2(init,"関数定義には初期化子を伴うことはできません．");
            //st.success=false;return st;
        }
        var decl=init_decl_head.declarator;
        if (!decl) {
            console.log("INI",init_decl_head);
        }
        var type=decl.vtype;
        if (!(type instanceof T.Function)) {
            throw newError2(decl,"関数定義に() がありません．");
            //st.success=false;return st;
        }
        var name=decl.vname;
        var params=decl.params;
        addScope(name,{
            vtype:type,
            by: "function_definition_pre"
        });
        var depth=ctx.depth;
        function checkReturn() {
            if (name+""==="main") return "";
            if (type.ret instanceof T.Void) return "";
            return 'doNotification("関数'+name+'の戻り値が設定されていません");';
        }
        function entFunc(ftype, action) {
            return ctx.enter({ftype:ftype}, function () {
                return newScope(action);
            });
        }
        entFunc(type,function () {
            var getParams=[];
            if (params) params.forEach(function (param) {
                addScope(param.vname,{vtype:param.vtype,by:"param"});
                if ((param.vtype) instanceof T.Struct) {
                    var vn="scopes_"+(ctx.depth)+"."+param.vname;
                    var vt=typeLit(param.vtype);
                    getParams.push([
                        vn,"=","copyStruct2(",
                            "StructObj(",vt,"),",
        	    			"ARGS.shift(),",
        	    			vt,");\n",
        	    	]);
                } else if ( !(param.vtype instanceof T.Void) ) {
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
            rst=compound_statement_part.and(t("}")).ret(function (states) {
                return extend(["scopes_"+depth,".",name,"=",
                    func,name,"(){",
    				"var ",curScopesName(),"=LocalVariables();",
                    "var ARGS=Array.prototype.slice.call(arguments);\n",
                    getParams,
			        states,
                    checkReturn(),
        			"};"
                ],{type:"funcDecl",declarator:decl,statements:states});
            }).parse(st);
        });
        if (rst && rst.success) {
            addScope(name,{by:"function_definition"});
        }
        return rst;
    })).ret(getTh(1));
    function getTh(n) {
        return function () {return arguments[n];}
    }
    //\addScope
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
            if (k==="vtype" && v[k]) {
                assert.is(v[k],T.Base);
                if (!v[k].equals(obj[k])) {
                    newError2(name,"{1} の型が以前の宣言と異なります",name);
                }
            }
            v[k]=obj[k];
        }
        if (name!=="boido_baryuu") {
            assert.is(ctx.scope[name+""].vname.pos, Number);
        }
    }
    //\addTypeDef
    function addTypeDef(name, type) {
        //typeDefs.push({name:name,type:type});
    }
	//control
	//var filename=t(/^[a-zA-Z][a-zA-Z0-9]*\.?[a-zA-Z0-9]+/);
	var incl_filename=t(/^[^\>\"]+/);
  var include_files={"stdio.h":function (){/*
    typedef struct{int p;} FILE;
#define EOF -1
extern void printf();
extern void scanf();
extern void sleep(int s);
extern void usleep(int s);
extern FILE* fopen(char *f,char *m);
extern void fclose(FILE *fp);
extern void fputs(char *s,FILE *fp);
extern int fscanf();
extern void fprintf();
extern char* fgets(char *s,int l,FILE *fp);
  */},
  "stdlib.h":function () {/*
extern int rand(void);
extern int srand(int seed);
extern int exit(int status);
  */},
  "time.h":function () {/*
extern int time(void* time_t);
  */},
  "string.h":function () {/*
extern int strlen(char *s);
extern char* strcpy(char *d,char *s);
extern char* strncpy(char *d,char *s,int l);
extern int strcmp(char *a,char *b);
extern int strncmp(char *a,char *b,int n);
extern char* strcat(char *a,char *b);
extern char* strncat(char *a,char *b,int n);
extern char* memset(char *dst,char c,int n);
extern char* index(char *h,char n);
extern char* rindex(char *h,char n);
extern int memcmp(char *a,char *b,int n);
extern char* memcpy(char *d,char *s,int n);
extern char* strstr(char *h,char *n);
  */},
  "math.h":function () {/*
  extern double abs(double n);
  extern double acos(double n);
  extern double asin(double n);
  extern double atan(double n);
  extern double atan2(double y,double x);
  extern double ceil(double n);
  extern double cos(double n);
  extern double exp(double n);
  extern double floor(double n);
  extern double log(double n);
  extern double max(double a,double b);
  extern double min(double a,double b);
  extern double pow(double a,double b);
  extern double random(void);
  extern double round(double n);
  extern double sin(double n);
  extern double sqrt(double n);
  extern double tan(double n);
  */},
  "x.h":function () {/*
  extern void fillRect(double x,double y,double w,double h);
  extern void clear(void);
  extern void update(void);
  extern void setColor(double r,double g,double b);
  extern void drawGrid(void);
  extern void drawNumber(double v,double x,double y);
  extern void drawLine(double sx,double sy,double dx,double dy);
  extern void setPen(double x,double y);
  extern void movePen(double x,double y);
  extern void fillOval(double x,double y,double w,double h);
  extern void drawText(char *s,double x,double y);
  extern void drawString(char *s,double x,double y);
  extern void setTextSize(double sz);
  extern int getkey(char *n);
  extern void setLineWidth(double w);
  extern void wait(void);
  */}
  };
  for (var k in include_files) {
    include_files[k]=(include_files[k]+"").replace(/.*\/\*/,"").replace(/\*\/.*/,"");
  }
    function findFuncFromIncludes(name) {
        var pat=new RegExp("\\b"+name+"\\b");
        for(var k in include_files) {
            if (pat.exec(include_files[k])) {
                return k;
            }
        }
    }
	var builtin_funcs={
	    "stdio.h":
	        ["printf","scanf","sleep","usleep","fopen","fclose","fputs","fgets","fprintf","fscanf","FILE"],
	    "stdlib.h":
	        ["rand","srand","exit"],
	    "string.h":
	        ["strlen","strcpy","strncpy","strcmp","strncmp",
	            "strcat","strncat","memset","index","rindex",
	            "memcmp","memcpy","strstr"],
	    "math.h":
            ["abs","acos","asin","atan","atan2","ceil","cos","exp","floor",
                "log","max","min","pow","random","round","sin","sqrt","tan"],
        "time.h":
            ["time"],
        "x.h":
            ["fillRect","clear","update","setColor","drawGrid","drawNumber","drawLine",
                "setPen","movePen","fillOval","drawText","drawString","setTextSize","getkey","setLineWidth","wait"]
	};
	var builtin_func_to_include={};
	for (var k in builtin_funcs) {
	    builtin_funcs[k].forEach(function (fname) {
	        builtin_func_to_include[fname]=k;
	    });
	}
	var builtin_funcs_ret={
	    "math.h":"double",
	    "rand":"int",
	    "string.h":"char*",
	    "memcmp":"int",
	    "strncmp":"int",
	    "strcmp":"int",
	    "strlen":"int",
	    "getkey":"int"
	};
    var control_line=t("#").and(t("define")).and(identifier).and(t(/^.+/)).ret(function(s,def,befor,after){
	    defines[befor+""]=after;
	});
	control_line=t("#").and(t("include")).and(t("<").or(t("\""))).and(incl_filename).and(t(">").or(t("\""))).ret(function(){
	    var filename=arguments[3];
	    //console.log("filename",filename);
        if (include_files[filename.text]) {
            return preprocess(include_files[filename.text]);
        }/*
	    if (builtin_funcs[filename.text]) {
	        return builtin_funcs[filename.text].map(function (n) {
    	        var ret=builtin_funcs_ret[n] ||
    	        builtin_funcs_ret[filename.text]
    	        ||"void";
    	        return ret+" "+n+"();";
	        }).join("\n");
	    }*/ else {
            newError2(filename, "#include<{1}>に該当するファイル名がありません．",filename.text);
	    }
	}).or(control_line);

    var topdecl = newDecl;
    //var topdecl = func.or(declaration);
	program=newScope(topdecl.rep0()).and(space).and(sp.eof).ret(function (decls,space,eof){
	    return extend(decls,{type:"program",decls:decls});
	});

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
			        return (s in defines ? pad(defines[s],s.length) : s );
			    });
			}
		}
		//console.log("preproc",lines.join("\n"));
		return lines.join("\n");
        function pad(str,len) {
            str=str+"";
            while (str.length<len) {
                str=" "+str;
            }
            return str;
        }
	};


	parser.parse=function (str) {
	    startSeq=0;
		defines={RAND_MAX:0x7fffffff};
		var output="";
		errors=[];
		typeDefs=[];
		str+="\n";
		var preLines=str.split("\n").length;
		var preLength=str.length;
		var processed=preprocess(str);
		console.log("processed",processed);
		var postLength=processed.length;
		var postLines=processed.split("\n").length;
		ctx=context();
		var result;
		try {
    		result=program.parseStr(processed);
    		output=result.result[0];
    	    output.unshift(genTypeDefs(typeDefs));
    	    //console.log("output is",output);
    		//console.log("out,typedef",output,typeDefs);
    		//console.log("maxpos,prced",result.src.maxPos,processed.length);
    		if(!result.success || result.src.maxPos<processed.length){
    			//var pos=rowcol(result.src.maxPos);
    			var parseErr=new Error("文法エラーがあります．");//\n"+pos.row+"行目付近を確認してください。");
                parseErr.errorType="文法エラーがあります．";
                parseErr.errorParams=[];
                parseErr.pos=correctPos(result.src.maxPos);
    			errors.unshift(parseErr);
    		}
		} catch(e) {
		    errors.push(e);
		}
		if (errors.length>0) {
		    var e=errors[0];
			if (typeof e.pos==="number") {
    			console.log("Compile error at ",e.pos,
        			processed.substring(0,e.pos)+"!!HERE!!"+processed.substring(e.pos));
			} else {
			    console.log("Compiler error: NO pos info ");
			}

			var pos=e.pos-(postLength-preLength);//  rowcol(e.pos);
			console.log("original stk",e.stack);
		    var ne=e;//new Error(e.message+"\n"+pos.row+"行目付近を確認してください。");
    		//ne.lineNo=pos.row;
    		ne.pos=pos;
		    //ne.original=e;
		    throw ne;
		}
        window.lastOutput=output;
    	return output;
    	function rowcol(p) {
			var max=processed.substring(0,p);
			//var lines=max.match(/\n/g);
			var lines=max.split("\n");
			lines.pop();
			var line=lines.length;
			var before=lines.join("\n").length;
			return {row:line+1-(postLines-preLines),col:p-before+1};
    	}
    	function correctPos(p) {
    	    var s=processed.substring(0,p);
    	    s=s.replace(/\s*$/,"");
    	    return s.length;
    	}
	};
	function genTypeDefs(typeDefs) {
	    return typeDefs.map(function (typeDef) {
	        var name=typeDef.name;
	        var type=typeDef.type;
	        return ["scopes_0.",name,"=",type.toLiteral(true),";\n"];
	    });
	}
	return parser;
}();
return window.MinimalParser;
});
