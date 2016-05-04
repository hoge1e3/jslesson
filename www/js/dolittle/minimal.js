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

	//ブロックに引数を与える際の構文
	var local_param_trim=function(_array){
		var result="";
		_array.forEach(function(e){result+="var "+e+";\n";});
		return result;
	};
	var block_trim=function(w){
		
	};

	// 単純なパーサ：  this is a <<単語>> <空白><EOF>   を解釈して，<<単語>>を返却する
	//                                                                正規表現の先頭には ^つける
	var expr,term,exp,block,paren_expr;
	var expr_lazy = Parser.lazy(function(){return expr;});
	var term_lazy = Parser.lazy(function(){return term;});
	var exp_lazy = Parser.lazy(function(){return exp;});
	var block_lazy = Parser.lazy(function(){return block;});
	var paren_lazy = Parser.lazy(function(){return paren_expr;});
	str_name = "[a-zA-Z_$\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF][a-zA-Z_$\?？0-9０-９ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]*";//名前のＳｔｒｉｎｇ
	reg_name = RegExp("^"+str_name);// 名前の正規表現
	var trim_name=function(name){
		name=name.replace(/[？?]/,"__question");
		return name;
	};
	var coron=token(/^[:：]/).ret(function(){return ":";});
	var lsb=token(/^[\[「]/).ret(function(){return "[";});
	var rsb=token(/^[\]」]/).ret(function(){return "]";});
	var stick=token(/^[|｜]/).ret(function(){return "|";});
	var period=token(/^[.。]/).ret(function(){return "."});
	var lp=token(/^[(（]/).ret(function(){return "(";});
	var rp=token(/^[)）]/).ret(function(){return ")";});
	var excr=token(/^[!！]/).ret(function(){return "!";});
	var semicoron=token(/^[;；]/).ret(function(){return ";";});
	var eq=token(/^[=＝]/).ret(function(){return "=";});
	var deq=token(/^[=＝][=＝]/).ret(function(){return "==";});
	var add=token(/^[+＋]/).ret(function(){return "+";});
	var sub=token(/^[-−]/).ret(function(){return "-";});
	var mul=token(/^[*×]/).ret(function(){return "*";}); 
	var div=token(/^[/÷]/).ret(function(){return "/";});
	var gt=token(/^[>＞]/).ret(function(){return ">";});
	var ge=token(/^(?:[>＞][=＝])|≧/).ret(function(){return ">=";});
	var lt=token(/^[<＜]/).ret(function(){return "<";});
	var le=token(/^(?:[<＜][=＝])|≦/).ret(function(){return "<=";});
	var neg=token(/^(?:[!！][=＝])|≠/).ret(function(){return "!=";});
	var mod=token(/^[%％]/).ret(function(){return "%";});
	var dquote=token(/^[\"\”]/).ret(function(){return "\"";});

	token_name = token(reg_name).ret(function(_name){return trim_name(_name.text);});//名前のトークン
	tok_name = coron.and(token_name).ret(function(_op,_right){return "."+_right;});
	tok_name = tok_name.or(paren_lazy).rep0().ret(function(_name){return (_name)?(_name.join("")):"";});
	tok_name = token_name.or(paren_lazy).and(tok_name).ret(function(_left,_right){return _left+_right;});
	reg_str = RegExp("^[^\"^\”]*");//文字列の正規表現
	tok_str = dquote.and(token(reg_str)).and(dquote).ret(function(_ldq,_str,_rdq){return _ldq+_str+_rdq;});/*.ret(function(_str){return "new String("+_str.text+")";})*/
	//reg_num = /^[0-9０-９]+(?:[.。・])?(?:[0-9０-９])*/;//数字を表す正規表現
	reg_num=/^[0-9０-９]+/;
	tok_num = token(reg_num).ret(function(_num){
		return (new String(_num).replace(/[０-９]/g, function(s) {
			return parseInt(String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
		}));
	});
	var func_exe=token_name.and(paren_lazy).ret(function(_name,_paren){return _name+_paren;});
	//引数に使用される変数を表す構文
	paren_expr = lp.and(term_lazy).and(rp).ret(function(_lp,_expr,_rp){return _lp+_expr+_rp;})

	//メソッドコールの引数
	var param = block_lazy.or(tok_str).or(paren_expr).or(tok_num).ret(function(_param){return _param;});
	var params = param.rep1().ret(function(_param){return _param.join(",");});
	var meth_call = params.opt().and(token_name).ret(function(_params,_meth){return "."+_meth+"("+((_params)?_params:"")+")";});
	meth_call = meth_call.rep1().ret(function(_meth_call){return _meth_call.join("");});
	meth_call = excr.and(meth_call).ret(function(_exc,_meth){return _meth;});
	meth_call = tok_name.or(param).opt().and(meth_call).ret(function(_obj,_call){return /*"this."+_obj+_call;*/((_obj)?_obj:"root")+_call;});
	
	//式がの構文
	var expression = ExpressionParser();
	expression.element(meth_call);
	expression.element(tok_str);
	expression.element(tok_name);
	expression.element(func_exe);
	expression.element(tok_num);
	expression.element(paren_expr);
	expression.element(block_lazy);
	expression.infixl(2,deq);
	expression.infixl(2,neg);
	expression.infixl(3,add);
	expression.infixl(3,sub);
	expression.infixl(4,div);
	expression.infixl(4,mul);
	expression.infixl(4,mod);
	expression.infixl(2,le);
	expression.infixl(2,ge);
	expression.infixl(2,lt);
	expression.infixl(2,gt);
	expression.prefix(5,add);
	expression.prefix(5,add.and(add));
	expression.prefix(5,sub);
	expression.prefix(5,sub.and(sub));
	expression.postfix(5,add.and(add));
	expression.postfix(5,sub.and(sub));
	expression.mkInfixl(mk);
	expression.mkInfixr(mk);
	expression.mkPrefix(mkpre);
	expression.mkPostfix(mkpost);
	function mk(left,op,right){return "("+left+")"+op+"("+right+")";}
	function mkpre(op,right){return op+right;}
	function mkpost(left,op){return left+op;}
	expression = expression.build();

	var assign=ExpressionParser();
	assign.element(expression);
	assign.infixr(1,eq);
	assign.infixr(1,add.and(eq));
	assign.infixr(1,sub.and(eq));
	assign.infixr(1,mul.and(eq));
	assign.infixr(1,div.and(eq));
	assign.infixr(1,mod.and(eq));
	assign.mkInfixr(mka);
	function mka(left,op,right){
		/*if((left+op+right).search(new RegExp("\\(*\\w\\)(?:\\.)*=\\(*function"))!=-1)right=func_trim(right);*/
		return "( "+left+" "+op+" "+right+" )";
	}
	assign=assign.build();

	//ブロックの構文
	var block_param = stick.and(tok_name.rep0()).and(semicoron.opt()).and(tok_name.rep0()).and(stick).ret(function(_ls,_param,_semicolon,_local_param,_rs){return [_param.join(","),local_param_trim(_local_param)];});
	var terms = term_lazy.sep0(period,true).and(period.opt()).ret(function(_term,_peri){_term[_term.length-1]="return "+_term[_term.length-1];return _term.join(";\n")+";";});
	block_param = block_param.opt().ret(function(_param){return (_param)?_param:["",""];});
	//var block = token("[").and(block_param).and(terms).and(token("]")).ret(function(_lsb,_param,_terms,_rsb){return "(new block(function("+_param[0]+"){"+_param[1]+_terms+"}))";});
	var block = lsb.and(block_param).and(terms).and(rsb).ret(function(_lsb,_param,_terms,_rsb){return "(function("+_param[0]+"){var self=this;var 自分=self;"+_param[1]+_terms+"})";});
	term = assign;

	expr = term.and(period).ret(function(_term,_peri){return _term+";";});
	program = expr.rep0().ret(function(_exprs){return _exprs.join("");});

	/* 
	パーサに適用できるメソッド（いずれも新しいパーサを生成して返す）：
	メソッド                         新しく生成されるパーサの動作
	parser.and(parser2)       parser を解析し，続けて parser2 を解析する   
	parser.ret(func)          parser の解析結果をfuncの第1引数に渡して，func を実行する．  
	parser が複数のand でつながれている場合は， func は同じ数の引数をとる
	parser.or(parser2)        parser を解析し，解析に失敗したときは parser2 を解析する  
	parser.opt()              parser を解析し，失敗した場合は何もせずに解析に成功する．  parser自身の解析が失敗した場合の解析結果はnull 
	parser.rep0()             parser を0回以上繰り返し解析する．  解析結果は， parserの各回の解析結果の配列
	parser.rep1()             parser を1回以上繰り返し解析する．  解析結果は， parserの各回の解析結果の配列
	parser.sep1(sep, true)     parser を繰り返し解析するが，それぞれの繰り返しの間に sep を解析する． カンマ区切りの解析などに使う．
	第2引数が true の 場合，  解析結果は 各parserの解析結果の配列になる
	第2引数が false の 場合，  {head: parser(1回目) , [ {sep: sep(n回目), value: parser(n+1回目) } ] }  
	*/

	parser.parse=function (str) {

		//var input=str.replace(/\ \\n/g,"");
		var input=str;
		var output="";
		var line=1;
		var result = program.parseStr(input);
		if(result.success){
			output=result.result[0];
			if(result.src.maxPos<str.length){
				var line=(str.substr(0,result.src.maxPos)).match(/\n/g);
				line=(line)?line.length:0;
				alert("エラーが発生しました。\n"+line+"行目付近を確認してください。");
			}
		}
		/*while(true){
			var result = expr.parseStr(input);
			if(result.success){
				line++;
				output+=result.result[0];
				//document.form.res.value+=result.result[0]+"\n";
				input=input.slice(result.src.maxPos);
				if(!input)break;
			}else{
				if(input.length>1)
				alert("エラーが発生しました。\n"+line+"行目付近を確認してください。");
				//document.form.res.value+="faild\n";
				//document.form.res.value+=input;
				break;
			}
		}*/
	return output;
	};
	return parser;
}();
