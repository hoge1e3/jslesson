import {Bottomup} from './Processor.js'

export const DNCL2Builder = (()=>{

	let sync=false;
	const build=tree=>{
		const builder=Bottomup();

		const tokens={
			'identifier':value=>`${value.text}`,
			'string':value=>`${value.text}`,
			'number':value=>`${value.text}`,
		};
		builder.load(tokens);
		const ops={
			'op':op=>{
				return `${op.text}`;
			},
			'add':op=> op.text,
			'sub':op=> op.text,
			'mul':op=> op.text,
			'div':op=> op.text,
			'div_int':op=> op.text,
			'pow':op=> op.text,
			'mod':op=> op.text,
			'gt':op=> op.text,
			'ge':op=> op.text,
			'lt':op=> op.text,
			'le':op=> op.text,
			'ne':op=> op.text,
			'eq':op=> op.text,
			'and':op=> op.text,
			'or':op=> op.text,
			'not':op=> op.text,
			'｜':op=>op.text,
			'└':op=>op.text,
		};
		builder.load(ops);
		let forinfo=1, whileinfo=1, ifinfo=1;
		const gdef={
			'input':()=> `this['外部からの入力']([])`,
			'array':node=>{
				return `[${node.join(',')}]`;
			},
			'table':node=>{
				return `[${node.map(line=>`[${line.join(',')}]`).join(',')}]`;
			},
			'array_ref':([variable,refer])=>{
				return `this['ary_ref'](this,'${variable}',[${refer.join(',')}])`;
			},
			'array_assign':([variable,refer])=>{
				const last = refer.pop();
				return `this['ary_ref'](this,'${variable}',[${refer.join(',')}])[${last}]`;
			},
			'simple':node=>{
				const [simple]=node;
				return `${simple}`;
			},
			'prefix':node=>{
				const [op,right]=node;
				return `${op}(${right})`;
			},
			'arithmetic_expr':node=>{
				const [left,op,right]=node;
				if(op=='÷'){
					return `(Math.floor(${left}/${right}))`;
				}
				return `${left}${op}${right}`;
			},
			'conditional_expr':node=>{
				const [left,op,right]=node;
				return `${left}${op}${right}`;
			},
			'logical_expr':node=>{
				const [left,op,right]=node;
				return `${left}${op}${right}`;
			},
			'variable':node=>{
				// console.log(node)
				const variable=node;
				const {pos,toIdentifier,text}=variable;
				return {toString:()=>`this["${text}"]`, pos, text, toIdentifier};
			},
			'paramVar':node=>{
				const param = node;
				const {pos,toIdentifier,text} = param;
				return {toString:()=>`${text}`, pos, text, toIdentifier};
			},
			'factor':node=>({toString:()=>`${node}`,pos:node.pos}),
			'term':node=>({toString:()=>`${node}`,pos:node.pos}),
			'expression':node=>({toString:()=>`${node}`,pos:node.pos}),
			'unary_term':node=>{
				const [op,target]=node;
				return `${op}(${target})`;
			},
			'paren':node=>{
				const [inner]=node;
				return `(${inner})`;
			},
			'func_call':([f,params])=>{
				// console.log(f);
				return `(await this['callf']("${f}",[${params.join(',')}]))`;
			},
			'condition':([cond])=> cond,
			'then':([stmts])=>{
				console.log(stmts);
				return `{${stmts.join(';\n')}}`;
			},
			'if':([cond,then,elsif,_else])=>{
				return `if(this['iff'](${ifinfo++},${cond}))${then}${elsif?'\n'+elsif:''}${_else?'\n'+_else:''}`;
			},
			'else':([_else])=>{
				return `else{${_else}}`;
			},
			'elsif':([cond,stmts])=>{
				return `else if(${cond}){${stmts.join(';\n')}}`
			},
			'elsif_list':(elsif_list)=>{
				return elsif_list.join('\n');
			},
			'for':([[i,from,to,[step,op]], stmts])=>{
				return [
					`for(`,
						[
							`this['forinfo'][${forinfo}]||=0,${i}=${from}`,
							`${i}${op=='+'?'<=':'>='}${to}`,
							`this['forinfo'][${forinfo++}]++,${i}${op=='+'?'+=':'-='}${step}`,
						].join(';'),
					`){`,
						`${stmts.join(';\n')}`,
					`}`,
				].join('\n');
			},
			// 'for_in_parts':([ary, key])=>{
			//   return [`${key} of ${ary}`];
			// },
			// 'for_in':([parts,stmts])=>{
			//   const id=forinfo++;
			//   return [
			//     `this['forinfo'][${id}]=this['forinfo'][${id}]||0;`,
			//     `for(${parts}){`,
			//       `this['forinfo'][${id}]++;`,
			//       `${stmts.join(';\n')}`,
			//     `}`,
			//   ].join('\n');
			// },
			// 'loop_times':([times])=>{
			//   return [`const i in Array(${times}).fill(0)`,forinfo++];
			// },
			// 'loop':([[times,id], stmts])=>{
			//   return [
			//     `this['forinfo'][${id}]=this['forinfo'][${id}]||0;`,
			//     `for(${times}){`,
			//       `this['forinfo'][${id}]++;`,
			//       `${stmts.join(';\n')}`,
			//     `}`,
			//   ].join('\n');
			// },
			'while_parts':([cond])=>{
				return `${cond}`;
			},
			'while':([cond,stmts])=>{
				const id=whileinfo++;
				return [
					`this['whileinfo'][${id}]||=0;`,
					`while(${cond}){`,
						`this['whileinfo'][${id}]++;`,
						`if(this['_killFlag'])throw new Error('プログラムを終了しました。');`,
						`${stmts.join(';\n')}`,
					`}`,
				].join('\n');
			},
			'func_def':([[name,params], stmts])=>{
				return `this['${name}']=async ([${params.join(',')}]) =>{${stmts.join(';\n')}};`;
			},
			'initial_set':([ary,value])=>{
				return `this['${ary}'] = this['initial_set'](this['${ary}'],${value});`;
			},
			'return':([value])=>{
				return `return ${value};`;
			},
			'assign':node=>{
				const [assign, stmt]=node;
				return `${assign?assign+'=':''}${stmt}`;
			},
			'proxy':node=>{
				const [proxyName,proxyParam,toName,toParam] = node;
				return `this['addProxy']('${proxyName}',([${proxyParam}])=>this['${toName}']([${toParam}]))`;
			},
			'program':node=>{
				const [program]=node;
				return [`(${sync?'':'async '}function(){`,
					`${program.join(';\n')}`,
					`})`
				].join('\n');
			},
		};
		builder.load(gdef);

		// console.log('tree is ', tree);
		const builded=builder.process(tree);
		return builded;
	};
	return class{
		static build(tree){
			sync=false;
			const builded=build(tree);
			// const builded=tree;
			// console.log('builded:',builded);
			return builded;
		}
		static buildSync(tree){
			sync=true;
			const builded=build(tree);
			// const builded=tree;
			// console.log('builded:',builded);
			return builded;
		}
	};
})();
