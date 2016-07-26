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
	        var s=Object.create(ctx.scope||{});
					//修正点１
	        ["self","this","自分","arguments"].forEach(function (k) {
	            s[k]={type:"self", depth:depth};  
	        });
	        return {scope: s ,depth:depth };
	    },parser);
	}
	function lit(s) {
	    return '"'+s+'"';
	}
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
	var expr,term,block,paren_expr,variable,infix_expr,program,statement_list;
	var infix_expr_lazy=Parser.lazy(function(){return infix_expr;});
	var expr_lazy = Parser.lazy(function(){return expr;});
	var term_lazy = Parser.lazy(function(){return term;});
	var variable_lazy = Parser.lazy(function(){return variable;});
	var block_lazy = Parser.lazy(function(){return block;});
	var meth_call_lazy = Parser.lazy(function(){return meth_call_lazy;});
	var paren_lazy = Parser.lazy(function(){return paren_expr;});
	var program_lazy=Parser.lazy(function(){return program;});
	var statement_list_lazy=Parser.lazy(function(){return statement_list;});
	//--------字句要素
	//名前
	var str_name = "[a-zA-Z_$\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF][a-zA-Z_$\?？0-9０-９ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]*";
	var reg_name = RegExp("^"+str_name);// 名前の正規表現
	var trim_name=function(name){
		//name=name.replace(/[？?]/,"__question");
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
	var colon=token(/^[:：]/).ret(function(){return ":";});
	var lsb=token(/^[\[「]/).ret(function(){return "[";});
	var rsb=token(/^[\]」]/).ret(function(){return "]";});
	var stick=token(/^[|｜]/).ret(function(){return "|";});
	var period=token(/^[.。]/).ret(function(){return "."});
	var lp=token(/^[(（]/).ret(function(){return "(";});
	var rp=token(/^[)）]/).ret(function(){return ")";});
	var excr=token(/^[!！]/).ret(function(){return "!";});
	var semicolon=token(/^[;；]/).ret(function(){return ";";});
	var eq=token(/^[=＝]/).noFollow(token(/^[=＝]/)).ret(function(){return "=";});
	var deq=token(/^[=＝][=＝]/).ret(function(){return "===";});
	var add=token(/^[+＋]/).ret(function(){return "+";});
	var sub=token(/^[-−–]/).ret(function(){return "-";});
	var mul=token(/^[*×]/).ret(function(){return "*";}); 
	var div=token(/^[/÷]/).ret(function(){return "/";});
	var gt=token(/^[>＞]/).ret(function(){return ">";});
	var ge=token(/^(?:[>＞][=＝])|≧/).ret(function(){return ">=";});
	var lt=token(/^[<＜]/).ret(function(){return "<";});
	var le=token(/^(?:[<＜][=＝])|≦/).ret(function(){return "<=";});
	var neg=token(/^(?:[!！][=＝])|≠/).ret(function(){return "!==";});
	var mod=token(/^[%％]/).ret(function(){return "%";});

    // \token_name 名前のトークン
	var token_name = token(reg_name).ret(function(_name){
	    return {pos:_name.pos,text: trim_name(_name.text),toString:function () {
	        return this.text;
	    }};
	});
	var reg_str = RegExp("^[\"\”\“『][^\"\“\”\』]*[\"\”\“』]");//文字列の正規表現
	var tok_str = token(reg_str).ret(function(_str){
	    var content=_str.text.substring(1,_str.text.length-1);
	    return extend(['"'+content+'"'],{type:"string",content:content});
	});
	var reg_num = /^[0-9０-９]+([.．]([0-9０-９])+)?/;//数字を表す正規表現
	//var reg_num=/^[0-9０-９]+/;
	var tok_num = token(reg_num).ret(function(_num){
		var v=(_num+"").replace(/[０-９]/g, function(s) {
			return parseInt(String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
		}).replace(/．/,".");
		v=parseFloat(v);
		return extend(["(",v,")"],{type:"number",value:v});
	});
    //--------------ここから構文	
	//括弧
	var paren_expr = lp.and(expr_lazy).and(rp).
	ret(function(_lp,_expr,_rp){
	    return extend([_lp,_expr,_rp], {type:"paren",subnodes:arguments});
	});
	//単項演算項  (obj! +arg1 -arg2 meth)
	var unary_term=add.or(sub).and(term_lazy).ret(function (u,t) {
	    return extend([u,t],{type:"unary_term"});
	});
    //単純式
	var simple = block_lazy.or(tok_str).or(paren_expr).or(tok_num).or(unary_term);
    // sin(x) なども送信の一種...にしないほうがいい
	var func_exe=token_name.and(paren_expr).
	ret(function(_name,_paren){
	    return extend([_paren,".",_name,"()"], {type:"func_exec",subnodes:arguments});
	});
	//電文
	var elec = simple.rep0().and(token_name).
	ret(function(_params,_meth){
	    return extend(["['"+_meth+"']","(",joinary(_params,","),")"], 
	    {type:"elec",subnodes:arguments});
	}).sep1(semicolon.opt(),true);
	//送信
	var meth_call = term_lazy.opt().and(excr).and(elec).ret(function (obj,_,elec) {
	    return extend([(obj||"this"),elec], {type:"meth_call",subnodes:arguments});
	});//.or(func_exe);
	//式
	expr = meth_call.or(infix_expr_lazy); // simple includes in infix_expr
	//中置式 :=  前置演算子  項  演算子 項  後置演算子  （項＝変数。送信は含まず）
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
	function mk(left,op,right){
	    return extend(["(",left,op,right,")"], {type:"infix",subnodes:arguments});
	}
	function mkpre(op,right){return extend([op,right], {type:"prefix",subnodes:arguments});}
	function mkpost(left,op){return extend([left,op], {type:"postfix",subnodes:arguments});}
	infix_expr = expbuild.build();
	//ブロック := [  [ | 引数リスト  |  文 . *  ]
	var block_param = stick.and(token_name.rep0()).and(semicolon.opt()).and(token_name.rep0()).and(stick).
	ret(function(_ls,_param,_semicolon,_local_param,_rs){
	    _param.forEach(regLocal);
	    _local_param.forEach(regLocal);
	    return extend([joinary(_param,","),local_param_trim(_local_param)], 
	    {type:"block_param",subnodes:arguments});
	});
	function regLocal(n,i) {
	    ctx.scope[n+""]={type:"local",depth:ctx.depth,seq:i};
	}
	var block = lsb.and(block_param.opt()).and(statement_list_lazy).and(rsb).
	ret(function(_lsb,_param,_progs,_rsb){
	    _param=_param||["",""]; 
	    return extend(["dtlbind(this,function(",_param[0],
	    "){\nvar self=this;var 自分=self;\n",_param[1],_progs,"})"], 
	    {type:"block",subnodes:arguments,depth:ctx.depth});
	});
	block=newScope(block);
	//変数 := ( 単純式 |  名前 | :名前 ) :名前*
    var varbuild=ExpressionParser();
    varbuild.element(simple.or(token_name.ret(function (n) {
        if (ctx.scope[n]) {
            return extend([n],{type:"localVar",name:n,depth:ctx.scope[n].depth});
        } else {
            return extend(["this['"+n+"']"],{type:"field",name:n});
        }
    })).or(colon.and(token_name).ret(function (_,n) {
            return extend(["root['"+n+"']"],{type:"rootVar",name:n});  
        })
    ));
    varbuild.postfix(1,colon.and(token_name).ret(function (_,name) {
        return extend(["['"+name+"']"],{type:"memberAccess",name:name});
    }));
    varbuild.mkPostfix(mkpost);
	variable=varbuild.build();
	//項 := 関数呼出 | 変数
	var term = func_exe.or(variable); //simple.or(func_exe).or(variable);
    //文 := [変数  = ] 式
    var statement = variable.and(eq).ret(function (v) {
        return extend([v,"="],{type:"assign",subnodes:arguments});
    }).opt().and(expr).ret(function (v,e) {
        return extend([(v||""),e,";\n"],{type:"statement",subnodes:arguments});
    });
    //プログラム := 文 . * (最後の.は省略可能)
	statement_list = statement.sep0(period,true).and(period.opt()).
	ret(function(_stmts){
	    var stmts=_stmts.slice();
	    var last=stmts.pop();
	    return extend([stmts,"return ",last], {type:"statement_list",subnodes:arguments});
	});
    program = newScope(statement_list);
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
		var input=str;
		var output="";
		var line=1;
		ctx=context();
		var result = program.parseStr(input);
		if(result.success){
			output=result.result[0];
			if(result.src.maxPos<str.length){
				var line=(str.substr(0,result.src.maxPos)).match(/\n/g);
				line=(line)?line.length:0;
				//alert("エラーが発生しました。\n"+line+"行目付近を確認してください。");
				throw new Error(de+"エラーが発生しました。\n"+line+"行目付近を確認してください。");
			}
		}
        return output;
    };
	parser.parse=function (str,options) {
		var output=parser.parseAsNode(str,options);
		output=parser.node2js(output,options);
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
    	buf.print("}).checkerror().apply(root,[]);");
    	//console.log("dtlgen",p,result);
    	return buf.buf;
    };
	return parser;
}();
