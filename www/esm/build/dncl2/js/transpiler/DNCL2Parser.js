import {Grammer} from'./Grammer.js'
import {Parser} from './parser.js'

export const DNCL2Parser= (function (){
	var parser={};
	let maxTokenPos=0;
	let maxPos=0;
	const sp=Parser.StringParser; // 文字列を解析するパーサ
	// const space=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/)*\*\/)**)*/).ret(e=>console.log('eeeee'));
	// const space=sp.reg(/^([ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\#[^\r\n]*\r?\n)*)*/);
	const space=sp.reg(/^([ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\#[^\r\n]*\r?\n)*)*/);
	function token(r) {
		const str=(typeof r=='string')?sp.str(r):sp.reg(r);
		return str.and(space).ret(function(b, a) {
			maxTokenPos=Math.max(maxTokenPos,b.pos);
			maxPos=Math.max(maxPos,b.pos+b.len);
			// console.log('look to ', b.src.str.substring())
			return {pos:b.pos,
					text: b.src.str.substring( b.pos, b.pos+b.len ) ,
					toString: function (){
						//return this.text+"("+this.pos+")";
						return this.text;
					}
			}
		});
	}
	const g = Grammer();

	const vars=[];

	//0: (の閉じ忘れ
	//1: [の閉じ忘れ
	//2: =の右辺が無い
	const errList = [0,0,0];

	const tokens={
		'identifier': token(/^[a-zA-Zａ-ｚＡ-Ｚ][a-zA-Zａ-ｚＡ-Ｚ_0-9０-９ａ-ｚＡ-Ｚ]*/).except(identifier=>{
			// console.log(identifier);
			const reserved=[...Object.keys(parts), 'and', 'or', 'not'];
			// console.log(reserved.indexOf(identifier+''));
			if(reserved.indexOf(identifier+'')>=0)return true;
			// console.log(identifier?.toString());
			return false;
		}),
		'funcName': token(/^[a-zａ-ｚA-ZＡ-Ｚ_＿\\$＄\\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF][a-zａ-ｚA-ZＡ-Ｚ_＿\\$＄\\?？0-9０-９ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]*/).except(identifier=>{
			// console.log(identifier);
			const reserved=[...Object.keys(parts), 'and', 'or', 'not'];
			// console.log(reserved.indexOf(identifier+''));
			if(reserved.indexOf(identifier+'')>=0)return true;
			// console.log(identifier?.toString());
			return false;
		}),
		// 'var_ref':
		// 'identifier': token(/^[a-zａ-ｚA-ZＡ-Ｚ_＿][a-zａ-ｚA-ZＡ-Ｚ_＿]*/).except(identifier=>{
		//   // console.log(identifier);
		//   const reserved=[...Object.keys(parts), 'and', 'or', 'not'];
		//   console.log(identifier?.toString());
		//   console.log(reserved.indexOf(identifier+''));
		//   if(reserved.indexOf(identifier+'')>=0)return true;
		//   return false;
		// }),
		'string': token(/^[\"\”\“『][^\"\“\”\』]*[\"\”\“』]/).ret(str=>`'${str.text.slice(1,-1)}'`),
		'number': token(/^(([0０][bBｂＢ][01０１]+)|([0０][xｘXＸ][0-9０-９a-fA-Fａ-ｆＡ-Ｆ]+)|([0-9０-９]+([.．]([0-9０-９])+)?))/),
	};
	g.load(tokens);
	const ops={
		'{':token(/^\n\{\n/),
		'}':token(/^\n\}/),
		':':token(/^[:：]/),
		'[':token(/^[\[［]/).ret(node=>{errList[1]++; return node;}),
		']':token(/^[\]］]/).ret(node=>{errList[1]--; return node;}),
		'.':token(/^[.。．]/),
		',':token(/^[,，、]/),
		'(':token(/^[(（]/).ret(node=>{errList[0]++; return node;}),
		')':token(/^[)）]/).ret(node=>{errList[0]--; return node;}),
		'!':token(/^[!！]/),
		';':token(/^[;；]/),
		'=':token(/^[=＝]/).noFollow(token(/^[=＝]/)).ret(node=>{errList[2]++; return node;}),
		'==':token(/^[=＝][=＝]/),
		'+':token(/^[+＋]/),
		'-':token(/^[-−–－]/),
		'**':token(/^[*×＊∗][*×＊∗]/),
		'*':token(/^[*×＊∗]/).noFollow(token(/^[*×＊∗]/)),
		'/':token(/^[/／]/),
		'÷':token(/^[÷]/),
		'>':token(/^[>＞]/),
		'>=':token(/^(?:[>＞][=＝])|≧/),
		'<':token(/^[<＜]/),
		'<=':token(/^(?:[<＜][=＝])|≦/),
		'!=':token(/^(?:[!！][=＝])|≠/),
		'%':token(/^[%％]/),
		'#':token(/^[#＃]/),
		'and':token(/^and/),
		'or':token(/^or/),
		'not':token(/^not/),
		'\n':token(/^\n/),
	};
	g.load(ops);
	const parts={
		'を':token(/^を/),
		'から':token(/^から/),
		'まで':token(/^まで/),
		'ずつ':token(/^ずつ/),
		'増やしながら':token(/^増やしながら/),
		'減らしながら':token(/^減らしながら/),
		'繰り返す':token(/^繰り返す/),
		'もし':token(/^もし/),
		'ならば':token(/^ならば/),
		'そうでなければ':token(/^そうでなければ/),
		'そうでなくもし':token(/^そうでなく[ 　]?もし/),
		'配列変数':token(/^配列変数/),
		'初期化する':token(/^初期化する/),
		'回繰り返す':token(/^回繰り返す/),
		'の間':token(/^の間/),
		'に取りながら':token(/^に取りながら/),
		'のすべての値を':token(/^の(?:すべて|全て)の値を/),
		'にする':token(/^にする/),
		'を返す':token(/^を返す/),
		'input':token(/^[【「｢] ?外部からの入力 ?[】」｣]/),
		'別名':token(/^別名/),
	};
	g.load(parts);
	const gdef={
		'simple':[ g.or('string', 'paren', 'number', 'unary_term') ],
		// 'locals':[';', g.rep0('identifier')],
		// 'func_param':['(',g.rep0('identifier'),')'],
		// 'func':['[', g.opt('block_param'), 'statement_list', g.opt('.'), ']'],
		'then_parts':[ 'もし', 'expression', 'ならば', ':'],
		'then':[ 'then_parts', 'block' ],
		'else_parts':['そうでなければ', ':'],
		'else':[ '\n', 'else_parts', 'block' ],
		'elsif_parts':['そうでなくもし', 'expression', 'ならば', ':'],
		'elsif':[ '\n', 'elsif_parts', 'block' ],
		'elsif_list':[ g.rep1('elsif') ],
		'if':[ 'then', g.opt('elsif_list'), g.opt('else') ],
		// 'if':[ 'then', 'else' ],
		'for_parts':[
			'identifier as variable', 'を', 'expression', 'から', 'expression', 'まで', 'expression', 'ずつ', g.or('増やしながら', '減らしながら'), '繰り返す', ':'
		],
		'for':[ 'for_parts', 'block' ],
		// 'loop_parts':[ 'term', '回繰り返す', ':', '\n' ],
		// 'loop':[ 'loop_parts', 'statement_list' ],
		// 'for_in_parts':[ 'identifier as variable', 'を', 'identifier as variable' , 'に取りながら', ':', '\n' ],
		// 'for_in':[ 'for_in_parts', 'statement_list' ],
		'while_parts':[ 'expression', 'の間', '繰り返す' , ':'],
		'while':[ 'while_parts', 'block' ],
		'func_def_param':['(', g.sep0('identifier', ','), ')'],
		'func_def_parts':['funcName', 'func_def_param', ':'],
		'func_def':['func_def_parts', 'block'],
		'initial_set':[ 'identifier', 'のすべての値を', 'term', 'にする' ],
		'infix_expr':[g.expr({
			'elem':'term',
			'ops':[
				['prefix', g.or('not')],
				['infixl', g.or('and','or')],
				['infixl', g.or('==','!=','<=','>=','<','>')],
				['infixl', g.or('+','-')],
				['infixl', g.or('**','*','/','%','÷')],
			]
		})],
		// 'infix_expr2':[g.expr({
		//   'elem':'infix_expr',
		//   'ops':[['infixl as prop#', g.or('#')]],
		// })],
		// 'array':[g.expr({
		//   'elem':'term',
		//   'ops':[ ['infixl', g.or(',')] ]
		// })],
		'array_line':[g.sep0('expression', ',')],
		'array':['[', 'array_line', ']'],
		'table_line':[g.sep1('expression', ',')],
		'table_inner':[g.sep1('table_line', '\n')],
		'table':['[','\n','table_inner','\n',']'],
		'array_refer':['[', g.sep0('expression', ','), ']'],
		'array_ref':['identifier', 'array_refer'],
		'factor':[ g.or('simple', 'array_ref', 'identifier as variable') ],
		// 'factor2':[g.expr({
		//   'elem':'term',
		//   'ops':[ ['postfix as prop#', g.and('#', 'simple')] ]
		// })],
		'term':[g.or('func_call', 'factor', 'input')],
		'unary_term':[g.or('+','-'), 'term'],
		'expression':[g.or('array', 'table', 'infix_expr')],
		'paren':['(', 'expression', ')'],
		'func_call_param':['(', g.sep0('expression', ','),')'],
		'func_call':['funcName', 'func_call_param'],
		'return':['expression', 'を返す'],
		'assign_left':['factor', '='],
		'assign':['assign_left', 'expression'],
		'assigns':[g.sep1('assign', ',')],
		'proxy':['別名', 'funcName', g.and('(', g.sep0(g.or('simple', 'identifier'), ','), ')'), 'funcName', g.and('(', g.sep0(g.or('simple', 'identifier'), ','), ')')],
		// 'statement':['indent', g.or('func_def', [>'loop', 'for_in', <]'for', 'if', 'while', 'initial_set', 'return', 'assigns', 'proxy', 'expression' )],
		'statement':[g.or('func_def','for', 'if', 'while', 'initial_set', 'return', 'assigns', 'proxy', 'expression' )],
		'statements':[g.sep1('statement', '\n')],
		'block':['{', 'statements', '}'],
		'program':['statements'],
		// 'program':['func_def'],
	};
	// console.log('gdef');
	g.load(gdef);
	g.monitor();
	const program = g.build();//.and(space.opt());

	parser.parse=function (str) {
		if(/^[ 　\n]*$/.test(str))return {result:[false]};
		var input=str;
		var output="";
		maxTokenPos=0;
		maxPos=0;
		for(const i in errList)errList[i] = 0;

		// console.log("INP",input,input.length);
		var tree = program.parseStr(input);
		// console.log(tree);
		// console.log('tree', tree.result);
		if(tree.success){
			// console.log(str.length);
			// console.log(tree.src.maxPos);
			// console.log(str);
			// console.log(tree);
			// console.log(tree.pos);
			if(tree.src.maxPos!=str.length){
				console.log(tree.pos);
				console.log(str.length);
				console.log(tree.src.maxPos);
				console.log(tree.src.pos);
				console.log((tree.src.str).substr(0,tree.src.maxPos));
				console.log(tree.src);
				// const msg=[
				//   `エラーが発生しました。`,
				// ].join('\n');
				console.log(errList);
				let msg = [
					tree.src.str.slice(0,tree.src.maxPos),
					'★★★',
					tree.src.str.slice(tree.src.maxPos),
				].join('').split('\n').map(line=>line.replace(/^\}/,'').replace(/^\{/,'')).filter(Boolean).map((line,i)=>`${i}: ${line}`);
				const starPos = (()=>{
					for(const i in msg)if(/★★★/.test(msg[i]))return parseInt(i);
				})();
				
				msg = [msg[starPos-1],msg[starPos],msg[starPos+1]];
				msg.unshift('');
				if(errList[0])msg.unshift('()を閉じ忘れている可能性があります。');
				if(errList[1])msg.unshift('[]を閉じ忘れている可能性があります。');
				throw new Error(msg.join('\n'));
			}
		}else{
			const line=(str.substr(0,tree.src.maxPos-1)).match(/\n/g);
			const lastToken=str.substring(maxTokenPos,maxPos);
			// console.log(errList);
			const msg=[
				`エラーが発生しました。`,
				`${(line?line.length:0)+1}行目付近を確認してください。`,
				lastToken?`『${lastToken}』の付近に間違いがある可能性があります。`:''
			];
			if(errList[0])msg.push('()を閉じ忘れている可能性があります。');
			if(errList[1])msg.push('[]を閉じ忘れている可能性があります。');
			throw new Error(msg.join('\n'));
		}
		return tree;
	};
	return parser;
})();
