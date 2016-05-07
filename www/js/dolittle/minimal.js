MinimalParser= function () {
	var parser={};
	var sp=Parser.StringParser; // 文字列を解析するパーサ
	var ctx;
	function ent(entf, parser) {
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
	function newScope(parser) {
	    // ctx.scope: {varname : {vtype:string?, depth:number }}
	    return ent(function () {
	        var depth=0;
	        if ((typeof (ctx.depth))=="number") depth=ctx.depth+1;
	        //console.log("entering",depth);
	        return {scope: Object.create(ctx.scope||{}) ,depth:depth };
	    },parser);
	}
	function lit(s) {
	    return '"'+s+'"';
	}
    function extend(arr,obj) {
        for (var k in obj) arr[k]=obj[k];
        return arr;
    }
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
    // \lazies
	var expr,term,block,paren_expr,variable,infix_expr,program;
	var infix_expr_lazy=Parser.lazy(function(){return infix_expr;});
	var expr_lazy = Parser.lazy(function(){return expr;});
	var term_lazy = Parser.lazy(function(){return term;});
	var variable_lazy = Parser.lazy(function(){return variable;});
	var block_lazy = Parser.lazy(function(){return block;});
	var meth_call_lazy = Parser.lazy(function(){return meth_call_lazy;});
	var paren_lazy = Parser.lazy(function(){return paren_expr;});
	var program_lazy=Parser.lazy(function(){return program;});
	//--------字句要素
	//名前
	var str_name = "[a-zA-Z_$\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF][a-zA-Z_$\?？0-9０-９ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]*";
	var reg_name = RegExp("^"+str_name);// 名前の正規表現
	var trim_name=function(name){
		name=name.replace(/[？?]/,"__question");
		return name;
	};
	var colon=token(/^[:：]/).ret(function(){return ":";});
	var lsb=token(/^[\[「]/).ret(function(){return "[";});
	var rsb=token(/^[\]」]/).ret(function(){return "]";});
	var stick=token(/^[|｜]/).ret(function(){return "|";});
	var period=token(/^[.。]/).ret(function(){return "."});
	var lp=token(/^[(（]/).ret(function(){return "(";});
	var rp=token(/^[)）]/).ret(function(){return ")";});
	var excr=token(/^[!！]/).ret(function(){return "!";});
	var semicolon=token(/^[;；]/).ret(function(){return ";";});
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

    // \token_name 名前のトークン
	var token_name = token(reg_name).ret(function(_name){return trim_name(_name.text);});
	var reg_str = RegExp("^[^\"^\”]*");//文字列の正規表現
	var tok_str = dquote.and(token(reg_str)).and(dquote).ret(function(_ldq,_str,_rdq){return _ldq+_str+_rdq;});
	//reg_num = /^[0-9０-９]+(?:[.。・])?(?:[0-9０-９])*/;//数字を表す正規表現
	var reg_num=/^[0-9０-９]+/;
	var tok_num = token(reg_num).ret(function(_num){
		return (new String(_num).replace(/[０-９]/g, function(s) {
			return parseInt(String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
		}));
	});
    //--------------ここから構文	
	//括弧
	var paren_expr = lp.and(expr_lazy).and(rp).
	ret(function(_lp,_expr,_rp){return _lp+_expr+_rp;});
    //単純式
	var simple = block_lazy.or(tok_str).or(paren_expr).or(tok_num);
    // sin(x) なども送信の一種
	var func_exe=token_name.and(paren_expr).
	ret(function(_name,_paren){return _paren+"."+name+"()";});
	//電文
	var elec = simple.rep0().and(token_name).
	ret(function(_params,_meth){return "."+_meth+"("+_params.join(",")+")";}).
	sep1(semicolon.opt(),true);
	//送信
	var meth_call = term_lazy.opt().and(excr).and(elec).ret(function (obj,_,elec) {
	    return (obj||"this")+elec.join("");
	}).or(func_exe);
	//式
	expr = meth_call.or(infix_expr_lazy); // simple includes in infix_expr
	//中置式
	var expbuild = ExpressionParser();
	expbuild.element(term_lazy);
	expbuild.infixl(2,deq);
	expbuild.infixl(2,neg);
	expbuild.infixl(3,add);
	expbuild.infixl(3,sub);
	expbuild.infixl(4,div);
	expbuild.infixl(4,mul);
	expbuild.infixl(4,mod);
	expbuild.infixl(2,le);
	expbuild.infixl(2,ge);
	expbuild.infixl(2,lt);
	expbuild.infixl(2,gt);
	expbuild.prefix(5,add);
	expbuild.prefix(5,sub);
	expbuild.mkInfixl(mk);
	expbuild.mkInfixr(mk);
	expbuild.mkPrefix(mkpre);
	expbuild.mkPostfix(mkpost);
	function mk(left,op,right){return "("+left+op+right+")";}
	function mkpre(op,right){return op+right;}
	function mkpost(left,op){return left+op;}
	infix_expr = expbuild.build();
	//ブロック
	var block_param = stick.and(token_name.rep0()).and(semicolon.opt()).and(token_name.rep0()).and(stick).
	ret(function(_ls,_param,_semicolon,_local_param,_rs){
	    _param.forEach(regLocal);
	    _local_param.forEach(regLocal);
	    return [_param.join(","),local_param_trim(_local_param)];
	});
	function regLocal(n) {
	    ctx.scope[n+""]={type:"local"};
	}
	var block = lsb.and(block_param.opt()).and(program_lazy).and(rsb).
	ret(function(_lsb,_param,_progs,_rsb){
	    _param=_param||["",""]; 
	    return "dtlbind(this,function("+_param[0]+"){var self=this;var 自分=self;"+_param[1]+_progs+"})";
	});
	block=newScope(block);
	//変数
    var varbuild=ExpressionParser();
    varbuild.element(simple.or(token_name.ret(function (n) {
        if (ctx.scope[n]) {
            return n;
        } else {
            return "this."+n;
        }
    })).or(colon.and(token_name).ret(function (_,n) {
            return "root."+n;  
        })
    ));
    varbuild.postfix(1,colon.and(token_name).ret(function (_,name) {return "."+name;}));
    varbuild.mkPostfix(mkpost);
	variable=varbuild.build();
	//項
	var term = variable; //simple.or(func_exe).or(variable);
    //文
    var statement = variable.and(eq).ret(function (v) {
        return v+"=";
    }).opt().and(expr).ret(function (v,e) {return (v||"")+e+";";});
    //プログラム
	program = statement.sep0(period,true).and(period.opt()).
	ret(function(stmts){
	    var last=stmts.pop();
	    return stmts.join("")+"return "+last;
	});
    program = newScope(program);
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
		ctx=context();
		var result = program.parseStr(input);
		if(result.success){
			output=result.result[0];
			output="(function(){"+output+"}).apply(root,[]);"
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
