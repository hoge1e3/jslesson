// These should be written in reqConf.shim.deps
/*global Parser, ExpressionParser, context */
window.MinimalParser= function () {
	var parser={};
	var sp=Parser.StringParser; // 文字列を解析するパーサ
	var ctx;
	/*function ent(entf, parser) {
        if (typeof parser == "function") {
	       var res;
	       ctx.enter(entf(), function () {
	           res=parser();
	       });
	       return res;
        }
	    return Parser.create(function (st) {
	        var res;
	        ctx.enter(entf(), function () {
    	        res=parser.parse(st);
	        });
	        return res;
	    });
	}
	function lit(s) {
	    return '"'+s+'"';
	}*/
	//    ↓ 空白またはコメントを解析するパーサ
	var space=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/[^\r\n]*\r?\n)*)*/);/*.ret(function (a) {
	    //console.log("READ space ! ",a.pos,a.len, a.src.str.substring( a.pos));
    	 //   console.log("READ space ! ",a.pos,a.len, a.src.str.substring( a.pos, a.pos+a.len ));
	    return a;
	});*/
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
    	    //console.log("READ ! ",b.pos,b.len, b.src.str.substring( b.pos, b.pos+b.len ));
			return {pos:b.pos,
					text: b.src.str.substring( b.pos, b.pos+b.len ) ,
					toString: function (){
						//return this.text+"("+this.pos+")";
						return this.text;
					}
			};
		});
	}

	var reserved=/^(?:もし|ならば|を実行し|を実行する|そうでなければ|そうでなく|そうでなくもし|の間|を繰り返す|と|改行を表示する|と改行|と改行と|と改行を表示する|改行|を表示する|表示する|改行なしで|を改行なしで|を改行なしで表示する|改行なしで表示する|を|から|まで|ずつ|増やしながら|減らしながら|ずつ増やしながら|ずつ減らしながら|を繰り返す|増やす|減らす|のすべての値を|すべての値を|すべての値|にする|繰り返し|になるまで実行する|は|性能を|性能を確認する|の|の性能を|の性能を確認する|確認する)$/;

	var reg_string = /^[a-zａ-ｚA-ZＡ-Ｚ_＿\\$＄\\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF][a-zａ-ｚA-ZＡ-Ｚ_＿\\$＄\\?？0-9０-９ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]*/;
	var trim_name=function(name){
		return toHalfWidth(name);
	};
	function toHalfWidth(strVal){
	  // 半角変換
	    var halfVal = strVal.replace(/[！-～]/g,
	        function( tmpStr ) {
	          // 文字コードをシフト
	          return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
	        }
	    );
	      // 文字コードシフトで対応できない文字の変換
	    return halfVal.replace(/”/g, "\"")
	        .replace(/’/g, "'")
	        .replace(/‘/g, "`")
	        .replace(/￥/g, "\\")
	        .replace(/　/g, " ")
	        .replace(/〜/g, "~");
	}


  // \lazies
	var term,program,expression,statement;
	var term_lazy = Parser.lazy(function(){return term;});
	var program_lazy = Parser.lazy(function(){return program;});
	var expression_lazy = Parser.lazy(function(){return expression;});
	var statement_lazy = Parser.lazy(function(){return statement;});

	var lsb=token(/^[\[]/).ret(function(){return "[";});
	var rsb=token(/^[\]]/).ret(function(){return "]";});
	var lp=token(/^[(（]/).ret(function(){return "(";});
	var rp=token(/^[)）]/).ret(function(){return ")";});
	var lcb=token(/^[｛{]/).ret(function(){return "{";});
	var rcb=token(/^[｝}]/).ret(function(){return "}";});
	var add=token(/^[+＋]/).ret(function(){return "+";});
	var sub=token(/^[-−–－]/).ret(function(){return "-";});
	var mul=token(/^[*×＊∗]/).ret(function(){return "*";});
	var div_float=token(/^[\/／]/).ret(function(){return "/";});
	var div_int=token(/^÷/).ret(function(){return "÷";});
	var gt=token(/^[>＞]/).ret(function(){return ">";});
	var ge=token(/^(?:[>＞][=＝])|^≧/).ret(function(){return ">=";});
	var lt=token(/^[<＜]/).ret(function(){return "<";});
	var le=token(/^(?:[<＜][=＝])|^≦/).ret(function(){return "<=";});
	var eq=token(/^[=＝][=＝]?/).ret(function(){return "===";});
	var neg=token(/^(?:[\!！][=＝])|^≠/).ret(function(){return "!==";});
	var mod=token(/^[%％]/).ret(function(){return "%";});
	var larrow=token(/^[←]/).ret(function(){return "=";});
	var and=token(/^かつ/).ret(function(){return "&&";});
	var or=token(/^または/).ret(function(){return "||";});
	var not=token(/^でない/).ret(function(){return "!";});
	var comma=token(/^[\,，、､]/);

	//修飾してない生の変数名
	var raw_name = token(/^[a-zA-Zａ-ｚＡ-Ｚ][a-zA-Zａ-ｚＡ-Ｚ_＿0-9０-９]*/).ret(function(_name){
		return trim_name(_name.text);
	});
	var name = token(/^[a-zA-Zａ-ｚＡ-Ｚ][a-zA-Zａ-ｚＡ-Ｚ_＿0-9０-９]*/).ret(function(_name){
		_name=trim_name(_name.text);
		return {
			'name':_name,
			'toString':(function(){
				return 'this["param_or_this"]("'+_name+'",this["params"])["'+_name+'"]';
			})
		};
	});
	var name_2byte = token(reg_string).except(function(str){return (""+str).search(reserved)===0;}).ret(function(_name){
	    return trim_name(_name.text);
	});
	var reg_str = RegExp("^[\"\”\“「｢][^\"\“\”\」｣]*[\"\”\“」｣]");
	var str = token(reg_str).ret(function(_str){
	    var content=_str.text.substring(1,_str.text.length-1);
	    return '"'+content+'"';
	});
	var reg_num = /^\-?[0-9０-９]+([.．]([0-9０-９])+)?/;
	var num = token(reg_num).ret(function(_num){
		var v=(_num+"").replace(/[０-９]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		}).replace(/．/,".").replace(/[ｘＸａ-ｆＡ-Ｆ]/g,function(s){
			return String.fromCharCode(s.charCodeAt(0)-0xFEE0);
		});
		v=parseFloat(v);
		return "("+v+")";
	});

	var arr=lcb.and(term_lazy.sep0(comma,true).ret(function(elems){
		return elems.join();
	})).and(rcb).ret(function(_lcb,elems){
		return "["+elems+"]";
	});

  //--------------ここから構文
	var array_index=lsb.and(expression_lazy.sep1(comma,true)).and(rsb).ret(function(lsb,indexs){
		// return '['+indexs.join("][")+"]";
		return indexs.map(function(e){return 'dnclroot["toIndex"]('+e+')';});
	});
	var arr_ref=raw_name.and(array_index).ret(function(_name,indexs){
		var ret='(this["ifndef"](this["param_or_this"]("'+_name+'",this["params"]),"'+_name+'"))';
		for(var i=0;i<indexs.length-1;i++){
			ret='(this["ifndef"]('+ret+','+indexs[i]+'))';
		}
		ret+="["+indexs[indexs.length-1]+"]";

		return {'name':_name,'toString':(function(){return ret;})};
		// return '(dnclroot["ref"]("'+name+'",'+_name+indexs+'))';
		// return _name+indexs.join("");
	});
	// var arr_ref=name.and(array_index).ret(function(_name,indexs){
	//   var name=_name.match(/(?<=this\[\")[a-zA-Z][a-zA-Z_0-9]*(?=\"\])/);
	//   var ret='(dnclroot["ifndef"]('+_name+')'+indexs[0]+')';
	//   // var ret='(dnclroot["ifndef"](this,"'+name+'")'+indexs[0]+')';
	//   for(var i=1;i<indexs.length;i++){
	//     var name=(indexs[i-1]).match(/(?<=^\[).+(?=\]$)/);
	//     ret='(dnclroot["ifndef"]('+ret+')'+indexs[i]+')';
	//     // ret='(dnclroot["ifndef"]('+ret+')'+indexs[i]+')';
	//   }
	//   return ret;
	//   // return '(dnclroot["ref"]("'+name+'",'+_name+indexs+'))';
	//   // return _name+indexs.join("");
	// });
	var paren_expression = lp.and(expression_lazy.opt()).and(rp).ret(function(_lp,_expr/*,_rp*/){
		return "("+(_expr?_expr:"")+")";
	});
	/*var unary_term = add.or(sub).and(term_lazy).ret(function(_sign,_term){
		return _sign+"("+_term+")";
	});*/

	var variable=arr_ref.or(name).ret(function(_var){return _var;});
	var factor=paren_expression.or(num).or(str).or(arr_ref.ret(function(e){
			return '(this["ref"]("'+e.name+'",'+e+'))';
	})).or(name).or(name_2byte).or(arr);//.or(unary_term);

	var infix_expr_build = ExpressionParser();
	infix_expr_build.element(term_lazy);
	infix_expr_build.infixl(3,add);
	infix_expr_build.infixl(3,sub);
	infix_expr_build.infixl(4,div_float);
	infix_expr_build.infixl(4,div_int);
	infix_expr_build.infixl(4,mul);
	infix_expr_build.infixl(4,mod);
	infix_expr_build.mkInfixl(infix_mk);
	function infix_mk(left,op,right){
		// left='(dnclroot["undef20"]('+left+'))';
		// right='(dnclroot["undef20"]('+right+'))';
		// return '(dnclroot["toInt"]('+left+op+right+"))";
		switch(op){
			case "%": case "÷":
				op=op.replace("÷","/");
				left='(dnclroot["toInt"]('+left+'))';
				right='(dnclroot["toInt"]('+right+'))';
				return '(dnclroot["toInt"]('+left+op+right+"))";
				//break;
			default:
				return '('+left+op+right+")";
				//break;
		}
	}
	var infix_expr = infix_expr_build.build();

	var conditional_expr_build = ExpressionParser();
	conditional_expr_build.element(infix_expr);
	conditional_expr_build.infixl(2,eq);
	conditional_expr_build.infixl(2,neg);
	conditional_expr_build.infixl(2,le);
	conditional_expr_build.infixl(2,ge);
	conditional_expr_build.infixl(2,lt);
	conditional_expr_build.infixl(2,gt);
	conditional_expr_build.mkInfixl(conditional_mk);
	function conditional_mk(left,op,right){
	  return "("+left+op+right+")";
	}
	var conditional_expr = conditional_expr_build.build();

	var logical_expr_build = ExpressionParser();
	logical_expr_build.element(conditional_expr);
	logical_expr_build.infixl(1,and);
	logical_expr_build.infixl(1,or);
	logical_expr_build.postfix(0,not);
	logical_expr_build.mkInfixl(logical_mk);
	logical_expr_build.mkPostfix(logical_mkpost);
	function logical_mk(left,op,right){
	    return "("+left+op+right+")";
	}
	function logical_mkpost(left,op){
		if(op=="!")return op+"("+left+")";
		else return left+op;
	}
	var logical_expr = logical_expr_build.build();

	expression = logical_expr;


	var func_call_param = lp.and(expression_lazy.sep0(comma,true)).and(rp).ret(function(_lp,_params){
		return (_params)?_params:[];
	});
	var func_call = name_2byte.and(func_call_param).ret(function(_callee,_params){
		return 'this["'+_callee+'"]('+_params.join(",")+')';
	});

	term = func_call.or(factor);

	var func_param=lp.and(raw_name.sep0(comma,true)).and(rp).ret(function(_lp,_params){
		return (_params)?_params:[];
	});
	var func=name_2byte.and(func_param).and(token(/^は/)).and(program_lazy).and(token(/^を実行する/)).ret(
		function(_name,_params,_lcb,_prog){
			var params="{"+(_params.map(function(e,i){
				return '"'+e+'":'+'arguments['+i+']';
			}).join(","))+"}";
			var res='this["'+_name+'"]=';
			res+="(function(){";
			res+='this["params"]='+params+';';
			res+=_prog;
			res+="});";
			return res;
		}
	);

	// var disp_state = expression.sep0(token(/^と/),true).and(token(/^を表示する/)).ret(function(_params){
	//	return 'this["dncl_disp"]('+_params.join(",")+");"
	// });
	// (<expr>|"改行" [{"と" (<expr>|"改行")}] "を" ["改行なしで"] "表示する"
	var nl=token(/^改行/).ret(function(){return '"\\n"';});
	var disp_state = nl.or(expression).ret(function(_expr){
		return _expr;
	}).sep0(token(/^と/),true).ret(function(_params){
		return _params.join(",");
	}).and(token(/^を/)).and(token(/^改行なしで/).ret(function(){
		return true;
	}).opt()).and(token(/^表示する/)).ret(function(_params,_wo,_noNewLineFlag){
		var _newLineFlag=(_noNewLineFlag)?false:true;
		return 'this["dncl_disp"](['+_params+"],"+_newLineFlag+");";
	});
	var if_state_1liner=token(/^もし/).and(expression).and(token(/^ならば/)).and(statement_lazy).ret(function(_if,_expr,_then,_state){
		return 'if(this["if_judge_with_inc"](__if_id__,'+_expr+")){"+_state+"}";
	});
	var if_then=token(/^もし/).and(expression).and(token(/^ならば/)).and(program_lazy).ret(function(_if,_expr,_then,_program){
		return 'if(this["if_judge_with_inc"](__if_id__,'+_expr+")){"+_program+"}";
	});
	var else_if=token(/^を実行し/).and(comma).and(token(/^そうでなく/)).and(if_then).ret(function(_exe,_comma,_else,_elseif){
		return "else "+_elseif;
	});
	var _else=token(/^を実行し/).and(comma).and(token(/^そうでなければ/)).and(program_lazy).ret(function(_exe,_comma,_else,_program){
		return "else{"+_program+"}";
	});
	var if_state=if_then.and(else_if.or(_else).rep0()).and(token(/^を実行する/)).ret(function(_if,_else_elseif){
		return _if+_else_elseif.join("");
	});
	var while_state=expression.and(token(/^の間/)).and(comma).and(program_lazy).and(token(/^を繰り返す/)).ret(function(_expr,_while,_comma,_program){
		return "while("+_expr+"){"+_program+"}";
	});
	//var while_state2=token(/^繰り返し/);//.and(comma);//.and(program_lazy).and(token(/^を/)).and(comma);//.and(expression).and(token(/^になるまで実行する/)).ret(function(_1,_2,_program,_3,_4,_expr){
	//   return "while("+_expr+"){"+_program+"}";
	// });
	var repeat_inc=token(/^増やしながら/).ret(function(){return "+";});
	var repeat_dec=token(/^減らしながら/).ret(function(){return "-";});
	var repeat_state=variable.and(token(/^を/)).and(expression).and(token(/^から/)).and(expression).and(token(/^まで/)).and(expression).and(token(/^ずつ/)).and(repeat_inc.or(repeat_dec)).and(comma).and(program_lazy).and(token(/^を繰り返す/)).ret(function(_var,_1,_init,_2,_end,_3,_step,_4,_sign,_5,_program){
		/*
		 *	(function(){
		 *		var id=this["for_ent"]();
		 *		for ( part1 ; part2 ; this["for_inc"](id),part3 ){ program }
		 *	}).apply(this);
		*/
		var part1=_var+"="+_init;
		var part2=_var+((_sign==="+")?"<=":">=")+_end;
		var part3=_var+((_sign==="+")?"+=":"-=")+_step;
		return 'for('+part1+";"+part2+';this["for_judge_with_inc"](__for_id__,'+part3+")){"+_program+"}";
	});
	var arr_init=variable.and(token(/^の/)).and(token(/^すべての値を/)).and(expression).and(token(/^にする/)).ret(function(_var,_no,_all,_val){
		return 'this["allSet"]'+'("'+_var['name']+'",'+_val+");";
	});

	var return_state=expression.and(token(/^を/)).and(token(/^返す/)).ret(function(_expr){
		return "return "+_expr;
	});

	var performance_test=func_call.and(token(/^の/)).opt().and(token(/^性能を/)).and(token(/^確認する/)).ret(function(_call){
		var ret="";
		if(_call!=undefined){
			ret+='var end=this["性能測定スタート"]();';
			ret+=_call+";";
			ret+='end();'
		}else{
			ret+='this["性能"]();';
		}
		return ret;
	});

	var assign=variable.and(larrow).ret(function(_var){
		return _var+"=";
	}).opt().and(expression).ret(function(_left,_right){
		return ((_left!=undefined)?_left:"")+_right+";";
	});
	var assigns=assign.sep1(comma,true).ret(function(_assigns){ return _assigns.join("");});
	var inc=variable.and(token(/^を/)).and(expression).and(token(/^増やす/)).ret(function(_var,_1,_expr){
		return _var+"=(("+_var+"!==undefined)?"+_var+":0)+"+_expr+";";
	});
	var dec=variable.and(token(/^を/)).and(expression).and(token(/^減らす/)).ret(function(_var,_1,_expr){
		return _var+"=(("+_var+"!==undefined)?"+_var+":0)-"+_expr+";";
	});

	var control_state=if_state.or(if_state_1liner).or(while_state).or(repeat_state);
	statement=performance_test.or(func).or(control_state).or(arr_init).or(disp_state).or(inc).or(dec).or(return_state).or(assigns);
	statements=statement.rep1().ret(function(stmts){return stmts.join("");});

  program = statements.and(space.opt());

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
	function tap(x) {
	    console.log("tap",typeof x,x);
	    return x;
	}
	function joinary(a,s) {
	    if (a.length<2) return a;
	    //if (a.length>=2) console.log("JO",a);
	    //a=a.slice();
	    a.joined=s;
	    return a;
	}
	parser.parseAsNode=function (str,options) {
	    options=options||{};
	    var de=options.src?options.src+"で":"";
		var input=str+"\n";
		var output="";
		var line=1;
		ctx=context();
	    //console.log("INP",input,input.length);
		var result = program.parseStr(input);
		if(result.success){
			output=result.result[0];
			if(result.src.maxPos<str.length){
				var line=(str.substr(0,result.src.maxPos)).match(/\n/g);
				line=(line)?line.length:0;
				//alert("エラーが発生しました。\n"+line+"行目付近を確認してください。");
				var mesg=de+"エラーが発生しました。\n"+(line+1)+"行目付近を確認してください。";
				if (options.throwCompileErrorOnRuntime) {
    				return extend([
    				"throw new Error('"+mesg.replace(/\n/g,"\\n")+"');"
    				],{type:"ERROR",message:mesg});
				} else {
				    throw new Error(mesg);
				}
			}
		}
        return output;
    };
	function extend(arr,obj) {
        var pos;
        for (var k in obj) {
            var v=obj[k];
            arr[k]=v;
            if (typeof v=="number") pos=v;
            if (v && typeof v.pos=="number") pos=v.pos;
        }
        arr.pos=arr.pos||pos;
        return arr;
    }
	/*ポストプロセス*/
	parser.postprocess=function(str){
		console.log(str);
		//各__for_id__にidをふる
		var for_id=0;
		var if_id=0;
		while(str.match(/__for_id__/))str=str.replace(/__for_id__/,for_id++);
		while(str.match(/__if_id__/))str=str.replace(/__if_id__/,if_id++);
		console.log(str);
		return str;
	}
	parser.parse=function (str,options) {
		var output=parser.parseAsNode(str,options);
		output=parser.node2js(output,options);
		output=parser.postprocess(output);
    return output;
	};
	parser.node2js=function (p,options) {
		options=options||{};
	    var buf=options.indentBuffer || {
	        buf:"",
	        print:function (s) {
	            this.buf+=s;
	        },
	        addMapping:function (){}
	    };
	    buf.print("(function(){");
			buf.print('dnclroot["__start"]();');
			buf.print('this["keys_save"]();');
			buf.print('this["params"]={};');
    	var gen=function(e){
		    if (e && typeof e.pos=="number") {
		        //console.log(e.pos);
		        buf.addMapping(e);
		    }
    		if(typeof e=="function") return gen(e());
    		else if(Array.isArray(e)) {
    		    var f=0;
    		    e.forEach(function (el) {
    		        if (f++) buf.print(e.joined||"");
    		        gen(el);
    		    });
    		} else {
    		    buf.print(e==null ? "" : e);
    		}
    	};
    	gen(p);
    	buf.print("}).apply(Object.create(dnclroot),[]);");
    	//console.log("dtlgen",p,result);
    	return buf.buf;
    };
	return parser;
}();
