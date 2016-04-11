MinimalParser= function () {
	var parser={};
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
	var reg_str = RegExp("^[^\"^\”]*");//文字列の正規表現
	var string = t(/^\"[^\"]*\"/).ret(function(str){return str;});
	var integer_constant=t(/^0[xX][0-9a-fA-F]+/).or(t(/^[0-9]+/));
	var character_constant=t(/^\'[^\'\"]\'/);
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

	var direct_declarator_part=identifier;
	direct_declarator_part=direct_declarator_part.or(t("(").and(declarator_lazy).and(t(")"))
		.ret(function(lp,declarator,rp){return ["(",declarator,")"];}));
	var direct_declarator=t("[").and(constant_expression.opt()).and(t("]"))
		.ret(function(lsb,const_expr,rsb){
			var $=["[",const_expr,"]"];
			//配列であることと、深さを保存。このあとこれをどう活用するかは不明。
			$.isArray=true;
			$.isLength=const_expr;
			return $;
		});
	direct_declarator=direct_declarator.or(t("(").and(parameter_type_list_lazy).and(t(")"))
		.ret(function(lp,param_type_list,rp){return ["(",param_type_list,")"];}));
	direct_declarator=direct_declarator.or(t("(").and(identifier_list.opt()).and(t(")"))
		.ret(function(lp,identifier_list,rp){return ["(",identifier_list,")"];}));
	direct_declarator=direct_declarator_part.and(direct_declarator.rep0())
		.ret(function(identifier,direct_decl){
			var $=[identifier,direct_decl];
			if(direct_decl.isArray)$.isArray=true;
			return $;
		});

	declarator=direct_declarator;

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
	calc_expression.infixl(1,t("||"))
	calc_expression.infixl(1,t("&&"));
	calc_expression.infixl(2,t("|"));
	calc_expression.infixl(2,t("^"));
	calc_expression.infixl(2,t("&"));
	calc_expression.infixl(3,t("==").ret(function(ee){return "===";}));
	calc_expression.infixl(3,t("!=").ret(function(ne){return "!==";}));
	calc_expression.infixl(5,t("<<"));
	calc_expression.infixl(5,t(">>"));
	calc_expression.infixl(4,t("<="));
	calc_expression.infixl(4,t(">="));
	calc_expression.infixl(4,t("<"));
	calc_expression.infixl(4,t(">"));
	calc_expression.infixl(4,token("+"));
	calc_expression.infixl(6,token("-"));
	calc_expression.infixl(7,token("*"));
	calc_expression.infixl(7,token("/"));
	calc_expression.infixl(7,token("%"));
	calc_expression.mkInfixl(mk);
	function mk(left,op,right){return ["(",left,op,right,")"];}
	function mkpost(left,op){return [left,op];}
	function mkpre(op,right){return [op,right];}
	calc_expression = calc_expression.build();

	assign=unary_expression_lazy.and(assignment_operator)
		.and(calc_expression).ret(function(unary_expr,op,calc_expr){
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
			}
			var identifier=(searchIdentifier(unary_expr));
			return [unary_expr,op,"cast(",function(){
				var i=vars.length-1;
				for(;i>=-1;i--){if(vars[i][identifier])break;}
				return "\""+vars[i][identifier]+"\"";
			},",",calc_expr,")"];
		}).or(calc_expression);

	expression=assign;
	var initializer_part=t(",").and(assign).ret(function(comma,assign){return [",",assign];});
	initializer_part=assign.and(initializer_part.rep0())
		.ret(function(assign,assigns){return ["[",assign,assigns,"]"];});
	initializer=assign.or(t("{").and(initializer_part.opt()).and(t("}"))
		.ret(function(lcb,initializer_part,rcb){return ["{",initializer_part,"}"];})); 
	
	var init_declarator=declarator.and(t("=").and(initializer).opt())
		.ret(function(declarator,eq,initializer){
			var identifier=(searchIdentifier(declarator));
			return (!eq)?[declarator]:[declarator,"=",function(){
				return ["cast(",function(){
					var i=vars.length-1;
					for(;i>=-1;i--){if(vars[i][identifier])break;}
					return "\""+vars[i][identifier]+"\"";
				}];
			}
			,",",initializer,")"];
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
				var tmp=[];
				for(var i=0;i<init_decl_list.length;i++){
					var $=init_decl_list[i];
					var identifier=searchIdentifier($);
					console.log(identifier);
					/*
					var flag=false;
					while(Array.isArray($)){
					console.log($);
						if($[0].ofIdentifier){
							identifier=$[0];
							flag=true;
							break;
						}else $=$[0];
					}*/
					//if(!flag)return;
				/*	if($.length>1){
						
						for(var i=0;i<$[$.length-1].isLength;i++)
					}*/
					vars[vars.length-1][identifier+""]=decl_specifiers;
					tmp.push("scopes[scopes.length-1].");
					tmp.push(init_decl_list[i]);
					tmp.push(";");
				}
				return tmp;
			}
			;
		});


	var jump_statement=t("goto").and(identifier).and(t(";"));
	jump_statement=jump_statement.or(t("continue").and(t(";")).ret(function(){return "continue;";}));
	jump_statement=jump_statement.or(t("break").and(t(";")).ret(function(){return "break;";}));
	jump_statement=jump_statement.or(t("return").and(expression.opt()).and(t(";"))
		.ret(function(_return,expr,semicolon){return ["return",expr,";"];}));

	var iteration_statement=t("while").and(t("(")).and(expression).and(t(")")).and(statement_lazy)
		.ret(function(_while,rp,expr,rp,state){return ["while","(",expr,")",state];});
	iteration_statement=iteration_statement.or(t("do").and(statement_lazy)
		.and(t("while")).and(t("(")).and(expression).and(t(")")).and(t(";"))
			.ret(function(_do,state,_while,lp,expr,rp,semicolon){
				return ["do",state,"while","(",expr,")",";"];
			}));
	var for_part=expression.and(t(";")).ret(function(expr,semicolon){return [expr,";"];});
	iteration_statement=iteration_statement.or(t("for").and(t("("))
		.and(declaration.or(for_part).or(t(";"))).and(expression.opt())
		.and(t(";")).and(expression.opt()).and(t(")")).and(statement_lazy)
		.ret(function(_for,lp,e1,e2,s2,e3,rp,state){
		console.log(e1);
			return [function(){vars.push({});},
				"scopes.push({});",e1,"while","(",e2,")",
				"{","try{",state,"}finally{",e3,";}","}","scopes.pop();",
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

	var compound_statement_part=declaration.or(statement_lazy).rep0();
	var compound_statement=t("{").and(compound_statement_part).and(t("}"))
		.ret(function(lcb,states,rcb){
			return [function(){vars.push({});},"{","try{scopes.push({});",
				states,"}","finally{scopes.pop();}","}",function(){vars.pop();}
			];
		});
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
			for(;i>=0;i--)if(vars[i][identifier.text])break;
			if(i==-1)throw(identifier+"は未定義です。");
			return ["pointer(scopes["+i+"],\""+identifier+"\")"];
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
			return i;
		},"].",identifier];
	});

	var primary_expression=var_identifier.or(constant).or(string);
	primary_expression=primary_expression.or(t("(").and(expression).and(t(")"))
		.ret(function(lp,expr,rp){return ["(",expr,")"];}));

	postfix_expression=ExpressionParser();
	postfix_expression.element(primary_expression);
	postfix_expression.element(ptr_identifier);
	postfix_expression.postfix(1,t("[").and(expression).and(t("]"))
		.ret(function(lsb,expr,rsb){return ["[",expr,"]"];}));
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
	//var func_param=var_type.and(identifier).ret(function(type,identifier){return identifier;});
	var func_param=declaration;
	var func_params=_void.or(func_param.sep0(t(","),true))
		.ret(function(param){return (Array.isArray(param))?param:((param=="void")?"":param);});
	func_params=t("(").and(func_params.opt()).and(t(")"))
		.ret(function(lp,param,rp){return  ["(",((param)?param:""),")"];})
	var func_source=t("{").and(statements).and(t("}"))
		.ret(function(lcb,source,rcb){return ["{scopes.push({});",source,"scopes.pop();}"];});
	var func=func_type.and(identifier).and(func_params).and(compound_statement)
		.ret(function(type,identifier,param,source){
			return ["function ",identifier,param,source,function(){vars.pop();return "";}];
		});


	//control
	var filename=t(/^[a-zA-Z][a-zA-Z0-9]*\.?[a-zA-Z0-9]+/);
	var control_line=t("#").and(t("define")).and(identifier).and(t(/^.+/)).ret(function(s,def,befor,after){defines[befor]=after;});
	control_line=t("#").and(t("include")).and(t("<")).and(filename).and(t(">")).ret(function(){return null;}).or(control_line);


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
		console.log(lines.join("\n"));
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
			console.log(max);
			var line=max.match(/\n/g);
			line=(line)?line.length:0;
			throw("プログラムに誤りがあります。\n"+(line+1)+"行目付近を確認してください。");
		}
	return output;
	};
	return parser;
}();
/*
var reserved_word=/^void|char|short|int|long|float|double|auto|static|const|signed|unsigned|extern|volatile|register|return|goto|if|else|switch|case|default|break|for|while|do|continue|typeof|struct|enum|union|sizeof$/;
	var identifier=token(/^[a-zA-Z_][a-zA-Z0-9_]* /).except(function(name){return (name.text.match(reserved_word));}).ret(function(){alert("hoge");});
	var text;
	var text_lazy=Parser.lazy(function(){return text;});
	var constant_expression;
	var constant_expression_lazy=Parser.lazy(function(){return constant_expression;});
	var token_sequence;
	var token_sequence_lazy=Parser.lazy(function(){return token_sequence;});
	var filename=t(/^[0-9a-zA-Z_-]+[\.a-zA-Z]/);
	var constant;
	var constant_lazy=Parser.lazy(function(){return constant;});

	var else_line=t("#").and(t("else"));
	var else_part=else_line.and(text_lazy);
	var elif_line=t("#").and(t("elif")).and(constant_expression_lazy);
	var elif_parts=elif_line.and(text_lazy);
	elif_parts=elif_parts.or(elif_parts.opt());
	var if_line=t("#").and(t("if")).and(constant_expression_lazy);
	if_line=if_line.or(t("#").and(t("ifdef")).and(identifier));
	if_line=if_line.or(t("#").and(t("ifndef")).and(identifier));
	var preprocessor_conditional=if_line.and(text_lazy).and(elif_parts).and(else_part.opt()).and(t("#")).and(t("endif"));
	var control_line=t("#").and(t("define")).and(identifier).and(token_sequence_lazy);
	control_line=control_line.or(t("#").and(t("define")).and(identifier).and(t("(").and(identifier.sep0(t(","),true)).and(t(")"))).and(token_sequence_lazy));
	control_line=control_line.or(t("#").and(t("undef")).and(identifier));
	control_line=control_line.or(t("#").and(t("include")).and(t("<").and(filename).and(t(">"))));
	control_line=control_line.or(t("#").and(t("include")).and(t("\"").and(filename).and(t("\""))));
	control_line=control_line.or(t("#").and(t("include")).and(token_sequence_lazy));
	control_line=control_line.or(t("#").and(t("line")).and(constant_lazy).and(t("\"").and(filename).and(t("\""))));
	control_line=control_line.or(t("#").and(t("line")).and(constant_lazy));
	control_line=control_line.or(t("#").and(t("error")).and(token_sequence_lazy.opt()));
	control_line=control_line.or(t("#").and(t("pragma")).and(token_sequence_lazy.opt()));
	control_line=control_line.or(t("#"));
	control_line=control_line.or(preprocessor_conditional);

	var integer_constant=t(/^(?:[0-9]+])|(?:0[xX][0-9a-fA-F])/);
	var character_constant=t(/^\'.?\'/);
	var floating_constant=t(/^[0-9]+\.[0-9]* /);
	var enumeration_specifier;
	var enumeration_specifier_lazy=Parser.lazy(function(){return enumeration_specifier;});
	var enumeration_constant=enumeration_specifier_lazy;
	var assignment_expression;
	var assignment_expression_lazy=Parser.lazy(function(){return assignment_expression;});
	var string;
	var string_lazy=Parser.lazy(function(){return string;});
	var expression;
	var expression_lazy=Parser.lazy(function(){return expression;});
	var cast_expression;
	var cast_expression_lazy=Parser.lazy(function(){return cast_expression_lazy;});
	var type_name;
	var type_name_lazy=Parser.lazy(function(){return type_name;});
	var conditional_expression;
	var conditional_expression_lazy=Parser.lazy(function(){return conditional_expression;});
	var statement;
	var statement_lazy=Parser.lazy(function(){return statement;});
	var parameter_type_list;
	var parameter_type_list_lazy=Parser.lazy(function(){return parameter_type_list;});
	var specifier_qualifier_list;
	var specifier_qualifier_list_lazy=Parser.lazy(function(){return specifier_qualifier_list;});
	var initializer;
	var initializer_lazy=Parser.lazy(function(){return initializer;});
	var declaration_specifiers;
	var declaration_specifiers_lazy=Parser.lazy(function(){return declaration_specifiers;});
	var declarator;
	var declarator_lazy=Parser.lazy(function(){return declarator;});
	var type_qualifier;
	var type_qualifier_lazy=Parser.lazy(function(){return type_qualifier;});
	var pointer;
	var pointer_lazy=Parser.lazy(function(){return pointer;});
	var declaration_list;
	var declaration_list_lazy=Parser.lazy(function(){return declaration_list;});
	var abstract_declarator;
	var abstract_declarator_lazy=Parser.lazy(function(){return abstract_declarator;});
	var type_specifier;
	var type_specifier_lazy=Parser.lazy(function(){return type_specifier;});
	var declaration;
	var declaration_lazy=Parser.lazy(function(){return declaration;});
	
	constant=integer_constant.or(character_constant).or(floating_constant).or(enumeration_constant);
	var argument_expression_list=assignment_expression_lazy;
	argument_expression_list=argument_expression_list.or(argument_expression_list.and(t(",")).and(assignment_expression_lazy));
	var primary_expression=identifier.or(constant).or(string_lazy).or(t("(").and(expression_lazy).and(t(")")));
	var postfix_expression=primary_expression;
	postfix_expression=postfix_expression.or(postfix_expression.and(t("[")).and(expression_lazy).and(t("]")));
	postfix_expression=postfix_expression.or(postfix_expression.and(t("(")).and(argument_expression_list.opt()).and(t(")")));
	postfix_expression=postfix_expression.or(postfix_expression.and(t(".")).and(identifier));
	postfix_expression=postfix_expression.or(postfix_expression.and(t("->")).and(identifier));
	postfix_expression=postfix_expression.or(postfix_expression.and(t("++")));
	postfix_expression=postfix_expression.or(postfix_expression.and(t("--")));

	var unary_operator=t("&").or(t("*")).or(t("+")).or(t("-")).or(t("~")).or(t("!"));
	var unary_expression=postfix_expression;
	unary_expression=unary_expression.or(t("++").and(unary_expression));
	unary_expression=unary_expression.or(t("--").and(unary_expression));
	unary_expression=unary_expression.or(unary_operator.and(cast_expression_lazy));
	unary_expression=unary_expression.or(t("sizeof").and(unary_expression));
	unary_expression=unary_expression.or(t("sizeof").and(t("(").and(type_name_lazy).and(t(")"))));

	cast_expression=unary_expression;
	cast_expression=cast_expression.or(t("(").and(type_name_lazy).and(t(")")).and(cast_expression));

	/*var multiplicative_expression=cast_expression;
	multiplicative_expression=multiplicative_expression.or(multiplicative_expression.and(t("*")).and(cast_expression));
	multiplicative_expression=multiplicative_expression.or(multiplicative_expression.and(t("/")).and(cast_expression));
	multiplicative_expression=multiplicative_expression.or(multiplicative_expression.and(t("%")).and(cast_expression));
	var additive_expression=multiplicative_expression;
	additive_expression=additive_expression.or(additive_expression.and(t("+")).and(multiplicative_expression));
	additive_expression=additive_expression.or(additive_expression.and(t("-")).and(multiplicative_expression));
	var shift_expression=additive_expression;
	shift_expression=shift_expression.or(shift_expression.and(t("<<")).and(additive_expression));
	shift_expression=shift_expression.or(shift_expression.and(t(">>")).and(additive_expression));
	var relational_expression=shift_expression;
	relational_expresson=relational_expression.or(relational_expression.and(t("<")).and(shift_expression));
	relational_expresson=relational_expression.or(relational_expression.and(t(">")).and(shift_expression));
	relational_expresson=relational_expression.or(relational_expression.and(t("<=")).and(shift_expression));
	relational_expresson=relational_expression.or(relational_expression.and(t(">=")).and(shift_expression));
	var equality_expression=relational_expression;
	equality_expression=equality_expression.or(equality_expression.and(t("==")).and(relational_expression));
	equality_expression=equality_expression.or(equality_expression.and(t("!=")).and(relational_expression));
	var AND_expression=equality_expression;
	AND_expression=AND_expression.or(AND_expression.and(t("&")).and(equality_expression));
	var exclusive_OR_expression=AND_expression;
	exclusive_OR_expression=exclusive_OR_expression.or(exclusive_OR_expression.and(t("^")).and(AND_expression));
	var inclusive_OR_expression=exclusive_OR_expression;
	inclusive_OR_expression=inclusive_OR_expression.or(inclusive_OR_expression.and(t("|")).and(exclusive_OR_expression));
	var logical_AND_expression=inclusive_OR_expression;
	logical_AND_expression=logical_AND_expression.or(logical_AND_expression.and(t("&&")).and(inclusive_OR_expression));
	var logical_OR_expression=logical_AND_expression;
	logical_OR_expression=logical+OR+expression.or(logical_OR_expression.and(t("||")).and(logical_AND_expression));
	* /
	calc_expression=ExpressionParser();
	calc_expression.element(cast_expression);
	calc_expression.infixl(1,t("||"))
	calc_expression.infixl(1,t("&&"));
	calc_expression.infixl(2,t("|"));
	calc_expression.infixl(2,t("^"));
	calc_expression.infixl(2,t("&"));
	calc_expression.infixl(3,t("=="));
	calc_expression.infixl(3,t("!="));
	calc_expression.infixl(4,t("<"));
	calc_expression.infixl(4,t(">"));
	calc_expression.infixl(4,t("<="));
	calc_expression.infixl(4,t(">="));
	calc_expression.infixl(5,t("<<"));
	calc_expression.infixl(5,t(">>"));
	calc_expression.infixl(6,token("+"));
	calc_expression.infixl(6,token("-"));
	calc_expression.infixl(7,token("*"));
	calc_expression.infixl(7,token("/"));
	calc_expression.infixl(7,token("%"));
	calc_expression.mkInfixl(mk);
	function mk(left,op,right){return ["(",left,op,right,")"];}
	calc_expression = calc_expression.build();

	constant_expression=conditional_expression_lazy;

	conditional_expression=calc_expression;
	conditional_expression=conditional_expression.or(calc_expression.and(t("?")).and(expression_lazy).and(t(":")).and(conditional_expression));

	var assignment_operator=t("=").or(t("*=")).or(t("/=")).or(t("%=")).or(t("+=")).or(t("-=")).or(t("<<=")).or(t(">>=")).or(t("&=")).or(t("^=")).or(t("|="));
	assignment_expression=conditional_expression;
	assignment_expression=assignment_expression.or(unary_expression.and(assignment_operator).and(assignment_expression));
	
	expression=assignment_expression;
	expression=expression.or(expression.and(t(",")).and(assignment_expression));
	
	var jump_statement=t("goto").and(identifier).and(t(";"));
	jump_statement=jump_statement.or(t("continue").and(t(";")));
	jump_statement=jump_statement.or(t("break").and(t(";")));
	jump_statement=jump_statement.or(t("return").and(expression.opt()));

	var iteration_statement=t("while").and(t("(")).and(expression).and(statement_lazy);
	iteration_statement=iteration_statement.or(t("do").and(statement_lazy).and(t("while")).and(t("(")).and(expression).and(t(")")).and(t(";")));
	iteration_statement=iteration_statement.or(t("for").and(t("(")).and(expression.opt()).and(t(";")).and(expression.opt()).and(t(";")).and(expression.opt()).and(statement_lazy));

	var selection_statement=t("if").and(t("(")).and(expression).and(t(")")).and(statement_lazy);
	selection_statement=selection_statement.or(t("if").and(t("(")).and(expression).and(t(")")).and(statement_lazy).and(t("else")).and(statement_lazy));
	selection_statement=selection_statement.or(t("switch").and(t("(")).and(expression).and(t(")")).and(statement_lazy));

	var statement_list=statement_lazy;
	statement_list=statement_list.or(statement_list.and(statement_lazy));

	var compound_statement=t("{").and(declaration_list_lazy.opt()).and(statement_list.opt()).and(t("}"));
	var expression_statement=expression.opt().and(t(";"));
	var labeled_statement=identifier.and(t(":")).and(statement_lazy);
	labeled_statement=labeled_statement.or(t("case").and(constant_expression).and(t(":")).and(statement_lazy));
	labeled_statement=labeled_statement.or(t("default").and(t(":")).and(statement_lazy));

	statement=labeled_statement;
	statement=statement.or(expression_statement);
	statement=statement.or(compound_statement);
	statement=statement.or(selection_statement);
	statement=statement.or(iteration_statement);
	statement=statement.or(jump_statement);

	var typedef_name=identifier;

	var direct_abstract_declarator=t("(").and(abstract_declarator_lazy).and(t(")"));
	direct_abstract_declarator=direct_abstract_declarator.or(direct_abstract_declarator.opt().and(t("[")).and(constant_expression.opt()).and(t("]")));
	direct_abstract_declarator=direct_abstract_declarator.or(direct_abstract_declarator.opt().and(t("(")).and(parameter_type_list_lazy.opt()).and(t(")")));

	abstract_declarator=pointer_lazy;
	abstract_declarator=abstract_declarator.or(pointer_lazy.opt().and(direct_abstract_declarator));

	var type_name=specifier_qualifier_list_lazy.and(abstract_declarator.opt());
	var initializer_list=initializer_lazy;
	initializer_list=initializer_list.or(initializer_list.and(t(",")).and(initializer_lazy));

	initializer=assignment_expression;
	initializer=initializer.or(t("{").and(initializer_list).and(t("}")));
	initializer=initializer.or(t("{").and(initializer_list).and(t(",")).and(t("}")));

	var identifier_list=identifier;
	identifier_list=identifier_list.or(identifier_list.and(t(",")).and(identifier));

	var parameter_declaration=declaration_specifiers_lazy.and(declarator_lazy);
	parameter_declaration=parameter_declaration.or(declaration_specifiers_lazy.and(abstract_declarator.opt()));

	var parameter_list=parameter_declaration;
	parameter_list=parameter_list.or(parameter_list.and(t(",")).and(parameter_declaration));

	parameter_type_list=parameter_list;
	parameter_type_list=parameter_type_list.or(parameter_list.sep1(t(","),true));

	var type_qualifier_list=type_qualifier_lazy;
	type_qualifier_list=type_qualifier_list.or(type_qualifier_list.and(type_qualifier_lazy));

	pointer=t("*").and(type_qualifier_list.opt());
	pointer=pointer.or(t("*").and(type_qualifier_list.opt()).and(pointer));

	var direct_declarator=identifier;
	direct_declarator=direct_declarator.or(t("(").and(declarator_lazy).and(t(")")));
	direct_declarator=direct_declarator.or(direct_declarator.and(t("[")).and(constant_expression.opt()).and(t("]")));
	direct_declarator=direct_declarator.or(direct_declarator.and(t("(")).and(parameter_type_list).and(t(")")))
	direct_declarator=direct_declarator.or(direct_declarator.and(t(("(")).and(identifier_list.opt()).and(t(")"))));

	declarator=pointer.opt().and(direct_declarator);
	var enumerator=identifier;
	enumerator=enumerator.or(identifier.and(t("=")).and(constant_expression));
	
	var enumerator_list=enumerator;
	enumerator_list=enumerator.or(enumerator_list.and(t(",")).and(enumerator));

	var enum_specifier=t("enum").and(identifier.opt()).and(t("{")).and(enumerator_list).and(t("}"));
	enum_specifier=enum_specifier.or(t("enum").and(identifier));

	var struct_declarator=declarator;
	struct_declarator=struct_declarator.or(declarator.opt().and(t(":")).and(constant_expression));

	var struct_declarator_list=struct_declarator;
	struct_declarator_list=struct_declarator_list.or(struct_declarator_list.and(t(",")).and(struct_declarator));

	specifier_qualifier_list=type_specifier_lazy.and(specifier_qualifier_list_lazy.opt());
	specifier_qualifier_list=specifier_qualifier_list.or(type_qualifier_lazy.and(specifier_qualifier_list.opt()));

	var struct_declaration=specifier_qualifier_list.and(struct_declarator_list);

	var init_declarator=declarator_lazy;
	init_declarator=init_declarator.or(declarator_lazy.and(t("="))).and(initializer);

	var init_declarator_list=init_declarator;
	init_declarator_list=init_declarator_list.or(init_declarator_list.and(t(",")).and(init_declarator));

	var struct_declaration_list=struct_declaration;
	struct_declaration_list=struct_declaration_list.or(struct_declaration_list.and(struct_declaration));

	var struct_or_union=t("struct").or(t("union"));

	var struct_or_union_specifier=struct_or_union.and(identifier.opt()).and(t("{")).and(struct_declaration_list).and(t("}"));
	struct_or_union_specifier=struct_or_union_specifier.or(struct_or_union.and(identifier));

	var type_qualifier=t("const").or(t("volatile"));
	type_specifier=t("void").or(t("char")).or(t("short")).or(t("int")).or(t("long")).or(t("float")).or(t("double"))
		.or(t("signed")).or(t("unsigned")).or(struct_or_union_specifier).or(enum_specifier).or(typedef_name);
	var storage_class_specifier=t("auto").or(t("register")).or(t("static")).or(t("extern")).or(t("typedef"));

	declaration_specifiers=storage_class_specifier.and(declaration_specifiers_lazy.opt());
	declaration_specifiers=declaration_specifiers.or(type_specifier.and(declaration_specifiers_lazy.opt()));
	declaration_specifiers=declaration_specifiers.or(type_qualifier.and(declaration_specifiers_lazy.opt()));

	declaration_list=declaration_lazy.rep0();

	declaration=declaration_specifiers.and(init_declarator_list.opt());
	
	var function_definition=declaration_specifiers.opt().and(declarator).and(declaration_list.opt()).and(compound_statement);

	var external_declaration=function_definition.or(declaration);

	var translation_unit=external_declaration.rep0();
*/
