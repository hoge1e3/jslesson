import {Bottomup, Topdown} from './Processor.js'
import {context} from './context.js'

export const DNCL2Semantics = (()=>{
	const Str2HalfWidth=strVal=>{
		const halfVal = strVal.replace(/[！-～]/g,
				tmpStr=>String.fromCharCode(tmpStr.charCodeAt(0)-0xFEE0)
		);
		return halfVal.replace(/”/g, "\"").replace(/’/g, "'").replace(/‘/g, "`")
			.replace(/￥/g, "\\").replace(/　/g, " ").replace(/〜/g, "~");
	}
	const numTrim=num=>{
		const regNum=/^((?:[0０][bBｂＢ][01０１]+)|(?:[0０][xｘXＸ][0-9０-９a-fA-Fａ-ｆＡ-Ｆ]+)|(?:[0-9０-９]+(?:[.．](?:[0-9０-９])+)?))(?:[a-zA-Z_$\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF][a-zA-Z_$\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]*)?/;
		return +(num.match(regNum)[1]
			.replace(/[０-９]/g,s=>String.fromCharCode(s.charCodeAt(0)-0xFEE0)).replace(/．/,".")
			.replace(/[ｘＸａ-ｆＡ-Ｆ]/g,s=>String.fromCharCode(s.charCodeAt(0)-0xFEE0)));
	}
	const extend=(ary,obj)=>{
		for(const [key,value] of Object.entries(obj)) ary[key]=value; 
		return ary;
	}

	const trimProcess=tree=>{
		const bottomup=Bottomup();
		const tokens={
			'identifier': value=>{
				const text=Str2HalfWidth(value[0].text);
				const {pos}=value[0];
				return extend([text],{name:'identifier',toString:()=>text,text,pos});
			},
			'funcName': value=>{
				const text=Str2HalfWidth(value[0].text);
				const {pos}=value[0];
				return extend([text],{name:'identifier',toString:()=>text,text,pos});
			},
			'string': value=>{
				const text=value.toString();
				return extend([text],{name:'string',toString:()=>text,text});
			},
			'number': value=>{
				const text=numTrim(value[0].text);
				return extend([text],{name:'number',toString:()=>text,text});
			},
			// 'indent': value=>{
			//   const text=value.toString();
			//   return extend([text],{name:'indent',toString:()=>text,text});
			// },
		};
		bottomup.load(tokens);
		const ops={
			':': value=>extend([':'],{name:'op',toString:()=>':',text:':'}),
			'[': value=>extend(['['],{name:'op',toString:()=>'[',text:'['}),
			']': value=>extend([']'],{name:'op',toString:()=>']',text:']'}),
			'|': value=>extend(['|'],{name:'op',toString:()=>'|',text:'|'}),
			'.': value=>extend(['.'],{name:'op',toString:()=>'',text:'.'}),
			',': value=>extend([','],{name:'op',toString:()=>'',text:','}),
			'(': value=>extend(['('],{name:'op',toString:()=>'(',text:'('}),
			')': value=>extend([')'],{name:'op',toString:()=>')',text:')'}),
			'!': value=>extend(['!'],{name:'op',toString:()=>'!',text:'!'}),
			';': value=>extend([';'],{name:'op',toString:()=>'',text:';'}),
			'=': value=>extend(['='],{name:'op',toString:()=>'=',text:'='}),
			'==': value=>extend(['==='],{name:'eq',type:'conditional_expr',toString:()=>'===',text:'==='}),
			'+': value=>extend(['+'],{name:'add',type:'arithmetic_expr',toString:()=>'+',text:'+'}),
			'-': value=>extend(['-'],{name:'sub',type:'arithmetic_expr',toString:()=>'-',text:'-'}),
			'*': value=>extend(['*'],{name:'mul',type:'arithmetic_expr',toString:()=>'*',text:'*'}),
			'**': value=>extend(['**'],{name:'pow',type:'arithmetic_expr',toString:()=>'**',text:'**'}),
			'/': value=>extend(['/'],{name:'div',type:'arithmetic_expr',toString:()=>'/',text:'/'}),
			'÷': value=>extend(['÷'],{name:'div_int',type:'arithmetic_expr',toString:()=>'÷',text:'÷'}),
			'>': value=>extend(['>'],{name:'gt',type:'conditional_expr',toString:()=>'>',text:'>'}),
			'>=': value=>extend(['>='],{name:'ge',type:'conditional_expr',toString:()=>'>=',text:'>='}),
			'<': value=>extend(['<'],{name:'lt',type:'conditional_expr',toString:()=>'<',text:'<'}),
			'<=': value=>extend(['<='],{name:'le',type:'conditional_expr',toString:()=>'<=',text:'<='}),
			'!=': value=>extend(['!=='],{name:'ne',type:'conditional_expr',toString:()=>'!==',text:'!='}),
			'%': value=>extend(['%'],{name:'mod',type:'arithmetic_expr',toString:()=>'%',text:'%'}),
			'#': value=>extend(['#'],{name:'op',toString:()=>'#',text:'getProp'}),
			'and': value=>extend(['&&'],{name:'and',type:'logical_expr',toString:()=>'&&',text:'&&'}),
			'or': value=>extend(['||'],{name:'or',type:'logical_expr',toString:()=>'||',text:'||'}),
			'not': value=>extend(['!'],{name:'not',type:'logical_prefix',toString:()=>'!',text:'!'}),
			'\n': value=>extend(['\n'],{name:'op',toString:()=>'\n',text:'\n'}),
			'増やしながら': value=>extend(['+'],{name:'op',toString:()=>'+',text:'+'}),
			'減らしながら': value=>extend(['-'],{name:'op',toString:()=>'-',text:'-'}),
			'｜':value=>extend(['\t'],{name:'idt',toString:()=>'\t',text:'\t'}),
			'└':value=>extend(['\t'],{name:'idt',toString:()=>'\t',text:'\t'}),
		};
		bottomup.load(ops);
		const gdef={
			// 'indent':([idts])=>{
			//   return idts.join('');
			// },
			'variable':([item])=>{
				const {pos}=item;
				// console.log(item.text);
				return extend(item,{
					name:'variable',pos,
					toLocal:function(){this.name='localVar'},
					toParam:function(){this.name='paramVar'},
					toRootOrThis:function(){this.name='rootOrThis'},
					toString:()=>item.text,
					toIdentifier:()=>item.text,
				});
			},
			'array':([lsb,elems,rsb])=>{
				return extend(elems,{name:'array'});
			},
			'table_inner':([node])=> node,
			'table':([lsb,nl1,table,nl2,rsb])=>{
				return extend(table,{name:'table'});
			},
			'array_refer':([lsb,is,rsb])=> extend([is],{name:'array_index'}),
			'then_parts':([moshi,cond])=> extend([cond],{name:'condition'}),
			'then':([cond,stmts])=>{
				return [
					cond,
					extend([stmts],{name:'then'})
				];
			},
			'else':([ nl, _1,  stmts])=>{
				return extend([stmts],{name:'else'});
			},
			'elsif_parts':([_1,cond])=> extend([cond],{name:'condition'}),
			'elsif':([nl,cond,stmts])=>{
				return extend([cond,stmts],{name:'elsif'});
			},
			'elsif_list':([elsif_list])=>{
				return extend([...elsif_list],{name:'elsif_list'});
			},
			'if':([[cond,_if],elsif_lst,els])=>{
				const subnodes = [cond,_if];
				if(elsif_lst) subnodes.push(elsif_lst);
				if(els) subnodes.push(els);
				return extend(subnodes,{name:'if'});
			},
			'for_parts':([idt,wo,from,kara,to,made,step,zutsu,op])=>{
				idt = extend([idt],{name:'counter'});
				from = extend([from],{name:'start'});
				to = extend([to],{name:'end'});
				step = extend([step,op],{name:'step'});
				return [idt,from,to,step];
			},
			// 'for_in_parts':([ary,wo,val])=>{
			//   return extend([ary,val],{name:'for_in_parts'});
			// },
			// 'loop_parts':([times]) => extend([times],{name:'loop_times'}),
			'while_parts':([cond]) => extend([cond],{name:'while_parts'}),
			'func_def_param':params => extend(params.slice(1,-1),{name:'func_def_params'}) ,
			'func_def_parts':([name,params])=>([name,params]),
			'initial_set':([ary,_,value])=>{
				return extend([ary,value],{name:'initial_set'});
			},
			'return':([val])=>{
				return extend([val],{name:'return'});
			},
			'simple':([item])=>{
				return item;
			},
			'factor':([item])=>{
				return item;
			},
			'term':([item])=>{
				return item;
			},
			'expression':([item])=>{
				return item;
			},
			'infixl':([left,op,right])=>{
				return extend([left,op,right],{name:op.type});
			},
			'infix_expr':node=>{
				const [left,op,right] = node;
				return op&&right ? extend(node,{name:op.type}) : left;
			},
			'paren':node=>{
				const [inner]=node.slice(1);
				return extend([inner],{name:'paren'});
			},
			'func_call_param':([_1,params])=>{
				return extend(params,{name:'func_call_params'});
			},
			'func_call':([f,params])=>{
				return extend([f,params],{name:'func_call'});
			},
			'assign_left':([variable])=>{
				return variable;
			},
			'assign':node=>{
				const [left,right] = node;
				if(left.name == 'array_ref') left.name = 'array_assign';
				// return left ? node : right;
				return node;
			},
			'assigns':node=>{
				if(node.length==1){
					return node[0];
				}else{
					return extend(node,{name:'assigns'});
				}
			},
			'proxy':([_1,from,[[_2,params1]],to,[[_3,params2]]])=>{
				return extend([from,params1,to,params2],{name:'proxy'});
			},
			'statement':([item]) => item,
			'statements':([stmts])=> stmts,
			'block':([_1,stmts])=> stmts,
			'program':node=>{
				return extend(node,{name:'program'});
			},
		};
		bottomup.load(gdef);
		// bottomup.monitor();

		// console.log('tree is ', tree);
		const processed=bottomup.process(tree);
		return processed;
	};

	const varsProcess=tree=>{
		const topdown=Topdown();
		const ctx=context();

		const varsSwitch=type=>{
			if(type=='local')return node=>node.toLocal();
			if(type=='param')return node=>node.toParam();
			if(type=='rootOrThis')return node=>node.toRootOrThis();
			return node=>node;
		}
		const gdef={
			'variable':node=>{
				const {text}=node;
				const type=ctx.typeof(text);
				// console.log('varsType', type);
				varsSwitch(type)(node);
				return node;
			},
			'func_def':node=>{
				const param = node[0][1][0].map(e=>e.text);
				ctx.enter([],param);
				return node;
			},
			'func_def$':node=>{
				ctx.exit();
				return node;
			},
		};
		topdown.load(gdef);
		// topdown.monitor();

		// console.log('tree is ', tree);
		const processed=topdown.process(tree);
		return processed;
	};

	return class{
		static analyze(tree){
			const trimedTree=trimProcess(tree);
			const processedTree=varsProcess(trimedTree)
			// console.log('processed:',processedTree);
			return processedTree;
		}
	};
})();
