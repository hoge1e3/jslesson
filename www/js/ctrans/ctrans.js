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
	globalVars={};
	var parser_decl=function(mode){
		var localVars={};
		var paren_expr;
		var func_call;
		var control_syntax;
		var paren_expr_lazy=Parser.lazy(function(){return paren_expr;});
		var func_call_lazy=Parser.lazy(function(){return func_call;});
		var control_syntax_lazy=Parser.lazy(function(){return control_syntax;});
		var int=token("int");
		var float=token("float");
		var char=token("char");
		var double=token("double");
		var _void=token("void");
		var var_type=token("unsigned").opt().and(int.or(float).or(char).or(double)).ret(function(u,type){return ((u)?u+" ":"")+type;});
		var func_type=int.or(float).or(char).or(double).or(_void);
		var reg_str = RegExp("^[^\"^\”]*");//文字列の正規表現
		var str = token(/^\"[^\"]*\"/).ret(function(str){return str;});
		var num=token(/^0x[0-9a-zA-Z]+/).or(token(/^[0-9]\.?[0-9]*/)).ret(function(num){return num;});
		
		var name=token(/^[a-zA-Z_][a-zA-Z0-9_]*/).ret(function(name){return name;});
		var ptr_name=token("&").and(name).ret(function(and,name){return "pointer(locals,\""+name+"\")"});
		var var_name=name.ret(function(name){return name;});
		var global_name=name.ret(function(name){
			if(!globalVars[name.text])throw("変数"+name+"は宣言されていません。");
			return "globals."+name;
		});
		var local_name=name.ret(function(name){
			console.log(globalVars);
			if((!localVars[name.text])&&(!globalVars[name.text]))throw("変数"+name+"は宣言されていません。");
			return ((localVars[name.text])?"locals.":"globals.")+name;
		});
		var nomal_name=name.ret(function(name){return name;});
		var var_decl=var_type.and(name).ret(function(){return name;});
		var global_decl=var_type.and(name).ret(function(type,name){globalVars[name.text]=type;return "globals."+name;});
		var local_decl=var_type.and(name).ret(function(type,name){localVars[name.text]=type;return "locals."+name;});
		var nomal_decl=var_type.and(name).ret(function(type,name){return name;});
		if(mode=="global"){var_name=global_name;var_decl=global_decl;}
		else if(mode=="local"){var_name=local_name;var_decl=local_decl;}
		else {var_name=nomal_name;var_decl=nomal_decl;}
	
		var expression = ExpressionParser();
		expression.element(func_call_lazy);
		expression.element(var_name);
		expression.element(ptr_name);
		expression.element(var_decl);
		expression.element(str);
		expression.element(num);
		expression.element(paren_expr_lazy);
		expression.postfix(5,token("++"));
		expression.postfix(5,token("--"));
		expression.prefix(5,token("++"));
		expression.prefix(5,token("--"));
		expression.infixl(2,token("=="));
		expression.infixl(2,token("!="));
		expression.infixl(2,token("&&"));
		expression.infixl(2,token("||"))
		expression.infixr(1,token("+="));
		expression.infixr(1,token("-="));
		expression.infixr(1,token("*="));
		expression.infixr(1,token("-="));
		expression.infixr(1,token("%="));;
		expression.infixl(3,token("+"));
		expression.infixl(3,token("-"));
		expression.infixl(4,token("/"));
		expression.infixl(4,token("*"));
		expression.infixl(4,token("%"));
		expression.infixl(3,token("&"));
		expression.infixl(3,token("^"));
		expression.infixl(3,token("|"));
		expression.infixl(2,token("<="));
		expression.infixl(2,token(">="));
		expression.infixl(2,token("<"));
		expression.infixl(2,token(">"));
		expression.infixr(1,token("="));
		//expression.prefix(5,token("-"));
		//expression.prefix(5,token("+"));
		expression.mkInfixr(mk);
		expression.mkInfixl(mk);
		expression.mkPrefix(mkpre);
		expression.mkPostfix(mkpost);
		function mkpost(left,op){return left+op;}
		function mkpre(op,right){return op+right;}
		function mk(left,op,right){return "("+left+op+right+")";}
		expression = expression.build();
	
		var assign=ExpressionParser();
		assign.element(expression);
		assign.infixr(1,token("="));
		assign.mkInfix(mka);
			function mka(left,op,right){
			return "("+left+op+right+")";
		}
		assign=assign.build();
		var term=assign.and(token(";")).ret(function(term,semicolon){return term+semicolon;});
		term=term.or(control_syntax_lazy).ret(function(term){return term;});
		var terms=term.rep0().ret(function(terms){return terms.join("\n");});

		paren_expr=token("(").and(assign).and(token(")")).ret(function(lp,assign,rp){return lp+assign+rp;});
	
		var if_state=token("if").and(token("(")).and(assign).and(token(")")).and(token("{")).and(terms).and(token("}")).ret(function(if_t,lp,assign,rp,lcb,terms,rcb){return "if("+assign+"){"+terms+"}";});
		var for_state=token("for").and(token("(")).and(assign).and(token(";")).and(assign).and(token(";")).and(assign).and(token(")")).and(token("{")).and(terms).and(token("}")).ret(function(for_t,lp,p1,s1,p2,s2,p3,rp,lcb,terms,rcb){return "for("+p1+";"+p2+";"+p3+"){"+terms+"}";});
		var while_state=token("while").and(token("(")).and(assign).and(token(")")).and(token("{")).and(terms).and(token("}")).ret(function(while_t,lp,assign,rp,lcb,terms,rcb){return "while("+assign+"){"+terms+"}"});
		var do_while_state=token("do").and(token("{")).and(terms).and(token("}")).and(token("while")).and(token("(")).and(assign).and(token(")")).and(token(";")).ret(function(do_t,lcb,terms,rcb,while_t,lp,assign,rp){return "do{"+terms+"}while("+assign+");";});
		control_syntax=if_state.or(for_state).or(while_state).or(do_while_state);

		var call_param=assign;
		var call_param=call_param.sep0(token(","),true).ret(function(param){return (Array.isArray(param))?param.join(","):((param=="void")?"":param);});
		//call_params=call_params.opt().ret(function(param){return (param)?param:"";});
		call_param=token("(").and(call_param).opt().and(token(")")).ret(function(lp,param,rp){return "("+((param)?param:"")+")";});
		func_call=name.and(call_param).ret(function(name,param){return name+param;});

		var func_param=var_type.and(name).ret(function(type,name){return name;});
		var func_params=_void.or(func_param.sep0(token(","),true)).ret(function(param){return (Array.isArray(param))?param.join(","):((param=="void")?"":param);});
		func_params=token("(").and(func_params).opt().and(token(")")).ret(function(lp,param,rp){return  "("+((param)?param:"")+")";})
		var func_source=token("{").and(terms).and(token("}")).ret(function(lcb,source,rcb){return "{var locals={};"+source+"}";});
		var func=func_type.and(name).and(func_params).and(func_source).ret(function(type,name,param,source){return "function "+name+param+source;});
	
		expr = func.or(term).ret(function(param){return param;});
		global = term;
		local = func;
	};
	parser_decl();
	parser.parse=function (str) {
		globalVars=[];
		var input=str;
		var output="";
		while(true){
			parser_decl();
			if(global.parseStr(input).success)parser_decl("global");
			else if(local.parseStr(input).success)parser_decl("local");
			var result = expr.parseStr(input);
			if(result.success){
				output+=result.result[0];
				//document.form.res.value+=result.result[0]+"\n";
				input=input.slice(result.src.maxPos);
				if(!input)break;
			}else{
			throw("プログラムに誤りがあります。\n行番号の取得は後ほど実装します。");
				console.log(input);
				console.log(result);
				document.form.res.value+="faild\n";
				break;
			}
		}
	return output;
	};
	return parser;
}();
