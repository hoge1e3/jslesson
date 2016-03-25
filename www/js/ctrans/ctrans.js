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
		vars=[{}];
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
		var var_type=token("unsigned").opt().and(int.or(float).or(char).or(double)).ret(function(u,type){return [((u)?u+" ":""),type];});
		var func_type=int.or(float).or(char).or(double).or(_void);
		var reg_str = RegExp("^[^\"^\”]*");//文字列の正規表現
		var str = token(/^\"[^\"]*\"/).ret(function(str){return str;});
		var num=token(/^0x[0-9a-zA-Z]+/).or(token(/^[0-9]\.?[0-9]*/)).ret(function(num){return num;});
		
		var name=token(/^[a-zA-Z_][a-zA-Z0-9_]*/).except(function(name){return (var_type.parseStr(name.text).success);}).ret(function(name){return name;});
		var ptr_name=token("&").and(name).ret(function(and,name){return ["pointer(locals,\"",name,"\")"];});
		var var_name=name.ret(function(name){
			return function(){
				var i=vars.length-1;
				for(;i>=0;i--)if(vars[i][name.text])break;
				if(i==-1)throw(name+"は未定義です。");
				return "scopes["+i+"]."+name;
			};
		});
	
		var expression = ExpressionParser();
		expression.element(func_call_lazy);
		expression.element(var_name);
		expression.element(ptr_name);
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
		function mk(left,op,right){return ["(",left,op,right,")"];}
		expression = expression.build();
	
		var assign=ExpressionParser();
		assign.element(expression);
		assign.infixr(1,token("="));
		assign.mkInfix(mka);
			function mka(left,op,right){
			return ["(",left,op,right,")"];
		}
		assign=assign.build();
	
		paren_expr=token("(").and(assign).and(token(")")).ret(function(lp,assign,rp){return [lp,assign,rp];});
		var init_decl=token("=").and(assign).ret(function(eq,term){return [eq,term];});
		var var_decl=var_type.and(name).and(init_decl.opt()).ret(function(type,name,init){return [function(){vars[vars.length-1][(name+"")]=type;return "";},"scopes[scopes.length-1].",name,((init)?init:"")];});
	
		var term=assign.or(var_decl).and(token(";")).ret(function(term,semicolon){return [term,semicolon];});
		term=term.or(control_syntax_lazy).ret(function(term){return term;});
		var terms=term.rep0().ret(function(terms){return terms;});
	
		var if_state=token("if").and(token("(")).and(assign).and(token(")")).and(token("{")).and(terms).and(token("}")).ret(function(if_t,lp,assign,rp,lcb,terms,rcb){return ["if(",assign,"){",terms,"}"];});
		var for_state=token("for").and(token("(")).and(assign).and(token(";")).and(assign).and(token(";")).and(assign).and(token(")")).and(token("{")).and(terms).and(token("}")).ret(function(for_t,lp,p1,s1,p2,s2,p3,rp,lcb,terms,rcb){return ["for(",p1,";",p2,";",p3,"){",terms,"}"];});
		var while_state=token("while").and(token("(")).and(assign).and(token(")")).and(token("{")).and(terms).and(token("}")).ret(function(while_t,lp,assign,rp,lcb,terms,rcb){return ["while(",assign,"){",terms,"}"];});
		var do_while_state=token("do").and(token("{")).and(terms).and(token("}")).and(token("while")).and(token("(")).and(assign).and(token(")")).and(token(";")).ret(function(do_t,lcb,terms,rcb,while_t,lp,assign,rp){return ["do{",terms,"}while(",assign,");"];});
		control_syntax=if_state.or(for_state).or(while_state).or(do_while_state);
	
		var call_param=assign.sep0(token(","),true).ret(function(param){
			if(param=="void")return "";
			if(!Array.isArray(param))return param;
			var res=[];
			param.forEach(function(e){res.push(e);res.push(",");});res.pop();
			return res;
		});
		//call_params=call_params.opt().ret(function(param){return (param)?param:"";});
		call_param=token("(").and(call_param.opt()).and(token(")")).ret(function(lp,param,rp){return ["(",((param)?param:""),")"];});
		func_call=name.and(call_param).ret(function(name,param){return [name,param];});
	
		var func_param=var_type.and(name).ret(function(type,name){return name;});
		var func_params=_void.or(func_param.sep0(token(","),true)).ret(function(param){return (Array.isArray(param))?param.join(","):((param=="void")?"":param);});
		func_params=token("(").and(func_params.opt()).and(token(")")).ret(function(lp,param,rp){return  ["(",((param)?param:""),")"];})
		var func_source=token("{").and(terms).and(token("}")).ret(function(lcb,source,rcb){return ["{scopes.push({});",source,"scopes.pop();}"];});
		var func=func_type.and(name).and(func_params).and(func_source).ret(function(type,name,param,source){return [function(){vars.push({});return "";},"function ",name,param,source,function(){vars.pop();return "";}];});

		expr = func.or(term).ret(function(param){return param;});
		program=expr.rep0().ret(function(p){
			var result="";
			var trim=function(e){
				if(typeof e=="function")result+=e();
				else if(Array.isArray(e))e.forEach(function(e){trim(e);});
				else result+=e;
			}
			trim(p);
			return result;
		});
	parser.parse=function (str) {
		var output="";
		
		var result=program.parseStr(str);
		output=result.result[0];
		if(result.src.maxPos<str.length){
			var line=(str.substr(0,result.src.maxPos)).match(/\n/g);
			line=(line)?line.length:0;
			alert("プログラムに誤りがあります。\n"+(line+1)+"行目付近を確認してください。");
		}
	return output;
	};
	return parser;
}();
