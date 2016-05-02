MinimalParser= function () {
	var parser={};
	var ctx=context();
	var sp=Parser.StringParser; // 文字列を解析するパーサ
	//    ↓ 空白またはコメントを解析するパーサ
	var space=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/.*\n)*)*/);
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
			}
		});
	}
	var t=token;
	var vars=[{}];
	var defines={};
	var searchIdentifier=function($){
		if($.ofIdentifier)return $.text;
		else if(Array.isArray($)){
			for(var i=0;i<$.length;i++){	
				var e=$[i];
				var res=(searchIdentifier(e));
				if(res)return res;
			}
		}
		else return 0;
	};
	function ent(entf, parser) {
	    return Parser.create(function (st) {
	        var res;
	        ctx.enter(entf(), function () {
    	        res=parser.parse(st);
	        });
	        return res;
	    });
	}
	//[]の添字がいくつあるか数える
	var cntIndex=function(tree){
		var cnt=0;
		
		if(tree.isIndex)cnt++;
		else if(Array.isArray(tree)){
			tree.forEach(function(e){cnt+=cntIndex(e);});
		}
		return cnt;
	}
    function extend(arr,obj) {
        for (var k in obj) arr[k]=obj[k];
        return arr;
    }



	var localVars={};
	var paren_expr;
	var func_call;
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
	var postfix_expression;
	var unary_expression;
	var specifier_qualifier_list;
	var direct_abstract_declarator;
	var expression;
	var direct_declarator;
	var parameter_type_list;
	var initializer;
	var switch_compound_statement;
	var switch_compound_statement_lazy=Parser.lazy(function(){return switch_compound_statement;});
	var initializer_lazy=Parser.lazy(function(){return initializer;});
	var parameter_type_list_lazy=Parser.lazy(function(){return parameter_type_list;});
	var direct_declarator_lazy=Parser.lazy(function(){return direct_declarator;});
	var expression_lazy=Parser.lazy(function(){return expression;});
	var direct_abstract_declarator_lazy=Parser.lazy(function(){return direct_abstract_declarator;});
	var specifier_qualifier_list_lazy=Parser.lazy(function(){return specifier_qualifier_list;});
	var unary_expression_lazy=Parser.lazy(function(){return unary_expression;});
	var postfix_expression_lazy=Parser.lazy(function(){return postfix_expression;});
	var cast_expression_lazy=Parser.lazy(function(){return cast_expression;});
	var postfix_expression_lazy=Parser.lazy(function(){return postfix_expression;});
	var argument_expressions_lazy=Parser.lazy(function(){return argument_expressions;});
	var statements_lazy=Parser.lazy(function(){return statements;});
	var statement_lazy=Parser.lazy(function(){return statement;});
	var term_lazy=Parser.lazy(function(){return term;});
	var declaration_specifiers_lazy=Parser.lazy(function(){return declaration_specifiers;});
	var declarator_lazy=Parser.lazy(function(){return declarator;});
	var paren_expr_lazy=Parser.lazy(function(){return paren_expr;});
	var func_call_lazy=Parser.lazy(function(){return func_call;});
	var if_state_lazy=Parser.lazy(function(){return if_state;});
	var terms_lazy=Parser.lazy(function(){return terms;});
	var declaration_lazy=Parser.lazy(function(){return declaration;});
	var struct_or_union_specifier_lazy=Parser.lazy(function(){return struct_or_union_specifier;});
	var calc_expression_lazy=Parser.lazy(function(){return calc_expression;});
	var int=t("int");
	var float=t("float");
	var char=t("char");
	var double=t("double");
	var _void=t("void");
	var reserved_word=/^(?:void|char|short|int|long|float|double|auto|static|const|signed|unsigned|extern|volatile|register|return|goto|if|else|switch|case|default|break|for|while|do|continue|typeof|struct|enum|union|sizeof)$/;
	var storage_class_specifier=t(/^(?:auto|register|static|extern|typedef)/);
	var type_specifier=t(/^(?:void|char|short|int|long|float|double|signed|unsigned)/)/*.or(struct_or_union_specifier_lazy).or(enum_specifier_lazy).or(typedef_name_lazy)*/;
	var type_qualifier=t(/^(?:const|volatile)/);
	var type_qualifiers=type_qualifier.rep1();
	var unary_operator=t(/^(?:\*|\+|\-|\~|\!)/);//&
	var assignment_operator=t(/^(?:=|\*\=|\/=|\%\=|\+=|\-\=|<<=|>>=|\&=|\^=|\|=)/);
	var var_type=t("unsigned").opt().and(int.or(float).or(char).or(double))
		.ret(function(u,type){return [((u)?u+" ":""),type];});
	var func_type=int.or(float).or(char).or(double).or(_void);
	var reg_str = RegExp("^[^\"^\”]*");
	//文字列の正規表現
	var string = t(/^\"[^\"]*\"/).ret(function(str){
		return extend(["str_to_ch_arr(",str,")"],{type:"string"});
	});
	var integer_constant=t(/^0[xX][0-9a-fA-F]+/).or(t(/^0[bB][01]+/)).or(t(/^[0-9]+/));
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
	    return eval(s).charCodeAt(0);
	}
	var floating_constant=t(/^[0-9]+\.[0-9]*/);
	var constant=floating_constant.or(character_constant).or(integer_constant)/*.or(enumeration_constant)*/;
	var identifier=t(/^[a-zA-Z_][a-zA-Z0-9_]*/).except(function(identifier){
			return ((identifier.text).match(reserved_word));
		}).ret(function(identifier){
			if(defines[identifier]){identifier=defines[identifier];identifier.changeble=true;}
			identifier.ofIdentifier=true;
			return identifier;
		});
	var struct_or_union=t(/^struct|union/);

	var constant_expression=calc_expression_lazy;

	var struct_declarator=declarator_lazy.opt().and(t(":")).and(constant_expression)
		.ret(function(declarator,colon,const_expr){return [declarator,":",const_expr];});
	struct_declarator=struct_declarator.or(declarator_lazy);
	var struct_declarator_list=t(",").and(struct_declarator)
		.ret(function(comma,struct_declarator){return [",",struct_declarator];});
	struct_declarator_list=struct_declarator.and(struct_declarator.rep0())
		.ret(function(struct_declarator,struct_declarators){return [struct_declarator,struct_declarators];});
	var struct_declaration=specifier_qualifier_list_lazy.and(struct_declarator_list)
		.ret(function(specifier_qualifier_list,struct_declarator){return [specifier_qualifier_list,struct_declarator];});
	struct_or_union_specifier=struct_or_union.and(identifier.opt()).and(t("{")).and(struct_declaration.rep1()).and(t("}"))
		.ret(function(struct_or_union,identifier,lcb,stract_declaration,rcb){
			return [struct_or_union,identifier,"{",stract_declaration,"}"];
		});
	struct_or_union_specifier=struct_or_union_specifier.or(struct_or_union.and(identifier)
		.ret(function(struct_or_union,identifier){return [struct_or_union,identifier];}));




	specifier_qualifier_list=type_qualifier.or(type_specifier);
	specifier_qualifier_list=specifier_qualifier_list.rep1();

	//var direct_abstract_declarator=direct_abstract_declarator.opt().and(t("[")).and(/*constant_*/expression_lazy.opt()).and(t("]")).ret(function(direct_abstract_declarator,lsb,const_expr,rsb){return [direct_abstract_declarator,"[",const_expr,"]"];});
	//direct_abstract_declarator=direct_abstract_declarator.or(direct_abstract_declarator.opt().and(t("(")).and(parameter_type_list_lazy.opt()).and(t(")")).ret(function(direct_abstract_declarator,lp,parameter_type_list,rp){return [direct_abstract_declarator,"(",parameter_type_list,")"];}));

	var direct_abstract_declarator=t("[").and(constant_expression.opt()).and(t("]"))
		.ret(function(lsb,expr,rsb){
			var $=["[",expr,"]"];
			$.isArray=true
			return $;
		});
	var direct_abstract_declarator=direct_abstract_declarator.or(t("(")
		.and(parameter_type_list_lazy).and(t(")")).ret(function(lp,parameter_type_list,rp){
			return ["(",parameter_type_list,")"];
		}));
	direct_abstract_declarator=direct_abstract_declarator.rep0();

	var abstract_declarator=direct_abstract_declarator;

	declaration_specifiers=storage_class_specifier.or(type_specifier).or(type_qualifier);
	declaration_specifiers=declaration_specifiers.rep1().ret(function(types){return types.join(" ");});

	var identifier_list=t(",").and(identifier).ret(function(comma,identifier){return [",",identifier];});
	identifier_list=identifier.and(identifier_list.rep0())
		.ret(function(identifier,identifiers){return [identifier,identifiers];});

	var direct_declarator_head=identifier.or(
	    t("(").and(declarator_lazy).and(t(")")).ret(
	        function(lp,declarator,rp){return ["(",declarator,")"];}
	    ));
	var direct_declarator_tail=t("[").and(constant_expression.opt()).and(t("]")).ret(
	    function(lsb,const_expr,rsb){
			var $=["[",const_expr,"]"];
			//配列であることと、深さを保存。このあとこれをどう活用するかは不明。
			$.type="decl_array";
			$.isArray=true;
			$.isLength=const_expr;
			return $;
		}).or(t("(").and(parameter_type_list_lazy).and(t(")")).ret(
		    function(lp,param_type_list,rp){
		        return extend( ["(",param_type_list,")"] ,{type:"decl_params"});
		    }
		)).or(t("(").and(identifier_list.opt()).and(t(")")).ret(
		    function(lp,identifier_list,rp){
		        return extend( ["(",identifier_list,")"], {type:"decl_idents"});
		    }
		));
    direct_declarator=direct_declarator_head.and(direct_declarator_tail.rep0()).ret(
        function(identifier,direct_decl){
    		var $=[identifier,direct_decl];
    		if(direct_decl.isArray)$.isArray=true;
    		return $;
	    }
	);

	declarator=direct_declarator.ret(function(e){return e;});

	var parameter_declaration=declaration_specifiers.and(declarator)
		.ret(function(declaration_specifiers,declarator){return [declaration_specifiers,declarator];});

	parameter_type_list=t(",").and(parameter_declaration)
		.ret(function(comma,parameter_declaration){return [",",parameter_declaration];});
	parameter_type_list=parameter_declaration.and(parameter_type_list.rep0())
		.ret(function(parameter_declaration,parameter_declarations){
			return [parameter_declaration,parameter_declarations];
		});
	//var pointer=t("*").and(type_qualifiers.opt()).ret(function(mul,type_qualifiers){return [];});

	type_name=specifier_qualifier_list.and(abstract_declarator.opt())
		.ret(function(specifier_qualifier_list,abstract_declarator){
			return [specifier_qualifier_list,abstract_declarator];
		});



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
	function mk(left,op,right){return ["(",left,op,right,")"];}
	function mkpost(left,op){return [left,op];}
	function mkpre(op,right){return [op,right];}
	calc_expression = calc_expression.build();

	assign=unary_expression_lazy.and(assignment_operator)
		.and(calc_expression).ret(function(unary_expr,op,calc_expr){
			/*var searchIdentifier=function($){

				if($.ofIdentifier)return $.text;
				else if(Array.isArray($)){
					for(var i=0;i<$.length;i++){	
						var e=$[i];
						var res=(searchIdentifier(e));
						if(res)return res;
					}
				}
				else return 0;
			}*/
			var identifier=(searchIdentifier(unary_expr));
			return [unary_expr,op,"cast(",function(){
				//[]の数
				var indexNum=cntIndex(unary_expr);
				var i=vars.length-1;
				for(;i>=-1;i--){if(vars[i][identifier])break;}

				//console.log(vars[i][identifier]);
				return "\""+vars[i][identifier][indexNum]+"\"";
			},",",calc_expr,")"];
		}).or(calc_expression);

	expression=assign;
	var initializer_part=t(",").and(assign).ret(function(comma,assign){return [",",assign];});
	initializer_part=assign.and(initializer_part.rep0())
		.ret(function(assign,assigns){return [assign,assigns];});
	initializer=assign.or(t("{").and(initializer_part.opt()).and(t("}"))
		.ret(function(lcb,initializer_part,rcb){return ["[",initializer_part,"]"];})); 
	
	var init_declarator=declarator.and(t("=").and(initializer).opt())
		.ret(function(declarator,eq,initializer){
			var identifier=(searchIdentifier(declarator));
			var $= (!eq)?[declarator,"=","0"]:[declarator,"=",function(){
				return ["cast(",function(){
					var i=vars.length-1;
					for(;i>=-1;i--){if(vars[i][identifier])break;}
					return "\""+vars[i][identifier][0]+"\"";
				}];
			}
			,",",initializer,")"];
			if(declarator.isArray){
				$.isArray=declarator.isArray;
				$.isLength=declarator.isLength;
			}
			return $;
		});

	//init_declarator=init_declarator.or(declarator);
	//var init_declarator_list=t(",").and(init_declarator)
	//	.ret(function(comma,init_decl){return [",",init_decl];});
	var init_declarator_list=init_declarator.sep0(t(","),true);
		//.ret(function(init_decl,init_decls){return [init_decl,init_decls];});
	var declaration=declaration_specifiers.and(init_declarator_list).and(t(";"))
		.ret(function(decl_specifiers,init_decl_list,semicolon){
			var identifier_list=[];
			init_decl_list.forEach(function(e){});
			return function(){
				var $=[];
				for(var i=0;i<init_decl_list.length;i++){
					var $$=init_decl_list[i];
					var identifier=searchIdentifier($$);
					var type=[];
					var tmp=[];
                    //$$01  = init_decl's  decl's  decltails   int x[2][3] の [2][3]
                    //	init_declarator:= declarator = initializer
                    var declarator_tails=$$[0][1];
                    var initializer=$$[4]; // why?   x  = cast("int"  ,  10 )
                                           //        0  1      2      3   4
                    var hasParams=false;
					for(var n=0;n<declarator_tails.length;n++){
						if (declarator_tails[n].type=="decl_array") {
    						type.push("array");
    						tmp.push(declarator_tails[n][1]);//添字
    						declarator_tails[n]=[];//???
						} else if (declarator_tails[n].type=="decl_params" || 
						declarator_tails[n].type=="decl_idents" ) {
						    hasParams=true;    
                        }
					}
					type.push(decl_specifiers);
					
					if (hasParams) {
					    // prototype宣言はコードを生成しない
					} else if(tmp.length){
						$.push("scopes[scopes.length-1].");
						$.push(identifier);
						$.push("=");
						//console.log("Initor", initializer);
                        if (initializer&&initializer.type=="string") {
                            $.push(initializer);                            
                        } else {						
    						$.push("arrInit(");
    						for(var n=0;n<tmp.length;n++){
    							$.push((tmp[n])?tmp[n]:"1");
    							$.push(",");
    						}
    						$.pop();
    						$.push(")");
                        }
						$.push(";");
						/*if(init_decl_list[i]){
							$.push("scopes[scopes.length-1].");
							$.push(init_decl_list[i]);
							$.push(";");
						}*/
					}else{
						$.push("scopes[scopes.length-1].");
						$.push(init_decl_list[i]);
						$.push(";");
					}

					vars[vars.length-1][identifier+""]=type;
					//console.log(vars[vars.length-1]);
					//console.log(vars);
					
				}
				return $;
			}
			;
		});


	var jump_statement=t("goto").and(identifier).and(t(";"));
	jump_statement=jump_statement.or(t("continue").and(t(";")).ret(function(){return "continue;";}));
	jump_statement=jump_statement.or(t("break").and(t(";")).ret(function(){return "break;";}));
	jump_statement=jump_statement.or(t("return").and(expression.opt()).and(t(";"))
		.ret(function(_return,expr,semicolon){return ["return",expr,";"];}));

	var iteration_statement=t("while").and(t("(")).and(expression).and(t(")")).and(statement_lazy)
		.ret(function(_while,rp,expr,rp,state){return [
			"var start=loop_start();","while","(",expr,"){try{",state,
			"}finally{loop_chk(start);}}"];});
	iteration_statement=iteration_statement.or(t("do").and(statement_lazy)
		.and(t("while")).and(t("(")).and(expression).and(t(")")).and(t(";"))
			.ret(function(_do,state,_while,lp,expr,rp,semicolon){
				return ["var start=loop_start();","do{try{",state,
					"}finally{loop_chk(start);}}","while","(",expr,")",";"
				];
			}));
	var for_part=expression.and(t(";"))
		.ret(function(expr,semicolon){return [expr,";"];});
	iteration_statement=iteration_statement.or(t("for").and(t("("))
		.and(declaration.or(for_part).or(t(";"))).and(expression.opt())
		.and(t(";")).and(expression.opt()).and(t(")")).and(statement_lazy)
		.ret(function(_for,lp,e1,e2,s2,e3,rp,state){
			return [function(){vars.push({});},
				"scopes.push({});","var start=loop_start();",e1,"while","(",((e2)?e2:"true"),")",
				"{","try{",state,"}finally{",e3,";","loop_chk(start);","}","}","scopes.pop();",
				function(){vars.pop();}
			];
		}));

	var else_part=t("else").and(statement_lazy).ret(function(_else,state){return ["else",state];});
	var selection_statement=t("if").and(t("(")).and(expression).and(t(")")).and(statement_lazy)
		.and(else_part.opt()).ret(function(_if,lp,expr,rp,state,_else_part){
			return ["if","(",expr,")",state,_else_part];
		});
	selection_statement=selection_statement.or(t("switch").and(t("(")).and(expression).and(t(")"))
		.and(switch_compound_statement_lazy).ret(function(_switch,lp,expr,rp,state){
			return ["try{scopes.push({});","switch","(",expr,")",state,"}finally{scopes.pop();}"];
		}));

	var compound_statement_part=declaration;
	compound_statement_part=compound_statement_part.or(statement_lazy).rep0();
	var compound_statement=t("{").and(compound_statement_part).and(t("}"))
		.ret(function(lcb,states,rcb){
		    return [function(){vars.push({});},"{","/*"+ctx.depth+"*/","try{ scopes.push({});",
				states,"}","finally{scopes.pop();}","}",function(){vars.pop();}
			];
		});
	compound_statement=ent(function () {
	    return {depth:(ctx.depth||0)+1};
	},compound_statement);
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

	statement=expression_statement;
	statement=statement.or(labeled_statement);
	statement=statement.or(compound_statement);
	statement=statement.or(selection_statement);
	statement=statement.or(iteration_statement);
	statement=statement.or(jump_statement);
	statements=statement.rep0().ret(function(states){return states;});


	var argument_expressions=expression.sep0(t(","),true).ret(function(param){
		if(param=="void")return "";
		if(!Array.isArray(param))return param;
		var res=[];
		param.forEach(function(e){res.push(e);res.push(",");});res.pop();
		return res;
	});
	func_call=identifier.and(t("(")).and(argument_expressions.opt()).and(t(")"))
		.ret(function(identifier,lp,args,rp){return [identifier,"(",args,")"];});
	var arr_expression=identifier.and(t("[")).and(expression).and(t("]"))
		.ret(function(identifier,lsb,expr,rsb){return [identifier,lsb,expr,rsb];});

	var ptr_identifier=t("&").and(identifier).ret(function(and,identifier){
		return function(){
			var i=vars.length-1;
			for(;i>=0;i--)if(vars[i][identifier+''])break;
			if(i==-1)throw(identifier+"は未定義です。");
			return ["pointer(scopes["+
				"search_scope_level(\""+identifier+"\")],\""+
				identifier+"\",","\""+vars[i][identifier+'']+"\"",")"
			];
		};
	});
	var var_identifier=identifier.ret(function(identifier){
		return ["scopes[",function(){
			//defineで変更されていて、識別子であればscopesから探す。数値とかであればそのまま返す。
			if(identifier.changeble)if(!identifier.text.match(/^(?:[a-zA-Z_][a-zA-Z0-9_]*)$/)){
				console.log(!identifier.text.match(/^(?:[a-zA-Z_][a-zA-Z0-9_]*)$/));
				return identifier;
			}
			var i=vars.length-1;
			for(;i>=0;i--)if(vars[i][identifier.text])break;
			if(i==-1)throw(identifier+"は未定義です。");
			//return i;
			return "search_scope_level(\""+identifier+"\")";
		},"].",identifier];
	});

	var primary_expression=var_identifier.or(constant).or(string);
	primary_expression=primary_expression.or(t("(").and(expression).and(t(")"))
		.ret(function(lp,expr,rp){return ["(",expr,")"];}));

	postfix_expression=ExpressionParser();
	postfix_expression.element(primary_expression);
	postfix_expression.element(ptr_identifier);
	postfix_expression.postfix(1,t("[").and(expression).and(t("]"))
		.ret(function(lsb,expr,rsb){
			var $=["[",expr,"]"];
			$.isIndex=true;
			return $;
		}));
	postfix_expression.postfix(1,t("++"));
	postfix_expression.postfix(1,t("--"));
	//なぜかpostfix_expressionにprefix。why
	postfix_expression.prefix(1,t("++"));
	postfix_expression.prefix(1,t("--"));
	postfix_expression.prefix(1,unary_operator);
	postfix_expression.postfix(1,t(".").and(identifier)
		.ret(function(peri,identifier){return [".",identifier];}));
	postfix_expression.postfix(1,t(/^->/).and(identifier)
		.ret(function(arrow,identifier){return ["->",identifier];}));
	postfix_expression.mkPostfix(mkpost);
	postfix_expression.mkPrefix(mkpre);
	postfix_expression=postfix_expression.build();
	postfix_expression=identifier.and(t("(")).and(argument_expressions.opt()).and(t(")"))
		.ret(function(identifier,lp,args,rp){return [identifier,"(",args,")"];}).or(postfix_expression);

	//unary_expression=ExpressionParser();
	//unary_expression.element(postfix_expression);
	//unary_expression.element(ptr_identifier);
	/*unary_expression.element(t("sizeof").and(t("(")).and(type_name).and(t(")"))
		.ret(function(_sizeof,lp,type_name,rp){
			var $=["sizeof","(",type_name,")"];$.data_type="int";return $;
		}));*/
	//unary_expression.prefix(1,t("++"));
	//unary_expression.prefix(1,t("--"));
	//unary_expression.prefix(1,t("siseof"));
	//unary_expression.mkPrefix(mkpre);
	//unary_expression=unary_expression.build();
	unary_expression=postfix_expression;
	//unary_expression=unary_expression.or(t("++").and(unary_expression)
	//	.ret(function(inc,unary_expr){return [inc,unary_expr];}));
	//unary_expression=unary_expression.or(t("--").and(unary_expression)
	//	.ret(function(dec,unary_expr){return [dec,unary_expr];}));
	//unary_expression=ptr_identifier.or(unary_expression);
	//unary_expression=unary_expression.or(unary_operator.and(cast_expression_lazy)
	//	.ret(function(op,cast_expr){return [op,cast_expr];}));
	//unary_expresison=unary_expression.or(t("sizeof").and(unary_expression)
	//	.ret(function(_sizeof,unary_expr){return ["sizeof",unary_expr];}));
	//unary_expression=t("sizeof").and(t("(")).and(type_name).and(t(")"))
	  //.ret(function(_sizeof,lp,type_name,rp){return ["sizeof","(",type_name,")"];}).or(unary_expression);

	cast_expression=unary_expression;
	cast_expression=cast_expression.or(t("(").and(type_name).and(t(")")).and(cast_expression_lazy)
	.ret(function(lp,type_name,rp,cast_expr){return ["(",type_name,")",cast_expr];}));


	var init_param=declarator.and(t("=").and(initializer).opt())
		.ret(function(declarator,eq,initializer){
			return function(n){
				var identifier=(searchIdentifier(declarator));
				var $=[declarator,"=",function(){
					return ["cast(",function(){
						var i=vars.length-1;
						for(;i>=-1;i--){if(vars[i][identifier])break;}
						return "\""+vars[i][identifier][0]+"\"";
					}];
				}
				,",param_init(","arguments["+n+"]",",",
					((initializer)?initializer:"null"),"))"];
				if(declarator.isArray){
					$.isArray=declarator.isArray;
					$.isLength=declarator.isLength;
				}
				return $;
			};
		});
	



	var func_param=declaration_specifiers.and(init_param)
		.ret(function(decl_specifiers,init_param){
			return function(n){
					var $=[];
					var $$=init_param(n);
					var identifier=searchIdentifier($$);
					var type=[];
					var tmp=[];
	
					for(var n=0;n<$$[0][1].length;n++){
						type.push("array");
						tmp.push($$[0][1][n][1]);
						$$[0][1][n]=[];
					}
					type.push(decl_specifiers);
					
					if(tmp.length){
						$.push("scopes[scopes.length-1].");
						$.push(identifier);
						$.push("=");
						$.push("arrInit(");
						for(var n=0;n<tmp.length;n++){
							$.push((tmp[n])?tmp[n]:"1");
							$.push(",");
						}
						$.pop();
						$.push(")");
						$.push(";");
					}	
					vars[vars.length-1][identifier+""]=type;
					//console.log(vars[vars.length-1]);
					//console.log(vars);
					$.push("scopes[scopes.length-1].");
					$.push($$);
					$.push(";");
					
					console.log($);
					return $;
			};
		});

	
	//var func_param=var_type.and(identifier).ret(function(type,identifier){return identifier;});
	//var func_param=declaration;
	var func_param_list=_void.or(func_param.sep0(t(","),true))
		.ret(function(param){
			if(!Array.isArray(param))return "";
			else{
				return function(){
					var tmp=[];
					for(var i=0;i<param.length;i++){tmp.push(param[i](i));}
					return tmp;
				}
			}
		});
	var func_params=t("(").and(func_param_list.opt()).and(t(")"))
		.ret(function(lp,param,rp){return  ["(",((param)?param:""),")"];})
	var func_source=t("{").and(statements).and(t("}"))
		.ret(function(lcb,source,rcb){return ["{scopes.push({});",source,"scopes.pop();}"];});

	var func_part=t("(").and(func_param_list.opt()).and(t(")")).and(t("{")).and(compound_statement_part).and(t("}"))
		.ret(function(lp,params,rp,lcb,states,rcb){
			return [function(){vars.push({});},"(){",
				"try{scopes.push({});",params,
				states,"}","finally{scopes.pop();}","}",function(){vars.pop();}
			];
		});
	var func=(func_type.opt()).and(identifier).and(func_part).ret(function(type,identifier,part){return ["function ",identifier,part];});
	//var func_no_type=identifier.and(func_part).ret(function(identifier,part){return ["function ",identifier,part];});
	//var func=func_with_type.or(func_no_type);
	/*//var func=func_type.and(identifier).and(func_params).and(compound_statement)
		.ret(function(type,identifier,param,source){
			return ["function ",identifier,param,source];
		});
*/

	//control
	var filename=t(/^[a-zA-Z][a-zA-Z0-9]*\.?[a-zA-Z0-9]+/);
	var control_line=t("#").and(t("define")).and(identifier).and(t(/^.+/)).ret(function(s,def,befor,after){defines[befor]=after;});
	control_line=t("#").and(t("include")).and(t("<").or(t("\""))).and(filename).and(t(">").or(t("\""))).ret(function(){return null;}).or(control_line);


	expr = func.or(declaration);
	program=expr.rep0();
	
	//preprocess
	var preprocess=function(str){
		var lines = str.split("\n");
		for(var i in lines){
			lines[i]=lines[i].replace(/\/\/.*/," ");
			var res=(lines[i])?control_line.parseStr(lines[i]):"";
			if(res.success){
				lines[i]="";
				//res();
			}	
		}
		//console.log(lines.join("\n"));
		return lines.join("\n");
	}


	parser.parse=function (str) {
		vars=[{}];
		defines={};
		var output="";
		var processed=preprocess(str);
		var result=program.parseStr(processed);
		output=result.result[0];
		if(result.src.maxPos<processed.length){
			var max=processed.substr(0,result.src.maxPos);
			//console.log(max);
			var line=max.match(/\n/g);
			line=(line)?line.length:0;
			var parseErr=new Error("プログラムに誤りがあります。\n"+(line+1)+"行目付近を確認してください。");
			parseErr.lineNo=line+1;
			throw parseErr;
		}
	return output;
	};
	return parser;
}();
