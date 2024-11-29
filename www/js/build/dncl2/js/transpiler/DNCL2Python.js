import {Bottomup} from './Processor.js'

const indent=node=>{
	if(Array.isArray(node)){
		for(const i in node){
			node[i] = indent(node[i]);
		}
	}else{
		node = node.split('\n').map(line=>`\t${line}`).join('\n');
	}
	return node;
};
export const DNCL2Python = (()=>{
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
			'mod':op=> op.text,
			'gt':op=> op.text,
			'ge':op=> op.text,
			'lt':op=> op.text,
			'le':op=> op.text,
			'ne':op=> '!=',
			'eq':op=> '==',
			'and':op=> 'and',
			'or':op=> 'or',
			'not':op=> 'not',
		};
		builder.load(ops);
		let forinfo=1, whileinfo=1, ifinfo=1;
		const gdef={
			'input':()=> `input()`,
			'array':node=>{
				return `[${node.join(',')}]`;
			},
			'array_ref':([variable,refer])=>{
				return `${variable}[${refer.join('][')}]`;
			},
			'simple':node=>{
				const [simple]=node;
				return `${simple}`;
			},
			'prefix':node=>{
				const [op,right]=node;
				return `${op}${right}`;
			},
			'arithmetic_expr':node=>{
				const [left,op,right]=node;
				return `${left} ${op} ${right}`;
			},
			'conditional_expr':node=>{
				const [left,op,right]=node;
				return `${left} ${op} ${right}`;
			},
			'logical_expr':node=>{
				const [left,op,right]=node;
				return `${left} ${op} ${right}`;
			},
			'variable':node=>{
				// console.log(node)
				const variable=node;
				const {pos,toIdentifier,text}=variable;
				return {toString:()=>text, pos, text, toIdentifier};
			},
			'factor':node=>({toString:()=>`${node}`,pos:node.pos}),
			'term':node=>({toString:()=>`${node}`,pos:node.pos}),
			'expression':node=>({toString:()=>`${node}`,pos:node.pos}),
			'unary_term':node=>{
				const [op,target]=node;
				return `${op}${target}`;
			},
			'paren':node=>{
				const [inner]=node;
				return `(${inner})`;
			},
			'func_call':([f,params])=>{
				// console.log(f);
				if(/表示する/.test(f)){
					const nl = /改行/.test(f);
					return `print(${params.join(',')}${nl?', end=""':''})`
				}
				return `${f}(${params.join(',')})`;
			},
			'then':([cond,stmts])=>{
				return [
					`if ${cond}:`,
					...stmts
				].join('\n')
			},
			'if':([then,elsif,_else])=>{
				return `${then}${elsif?'\n'+elsif:''}${_else?'\n'+_else:''}`;
			},
			'else':([_else])=>{
				return [
					'else:',
					..._else
				].join('\n');
			},
			'elsif':([cond,stmts])=>{
				return [
					`elif ${cond}:`,
					...stmts
				].join('\n');
			},
			'elsif_list':(elsif_list)=>{
				return elsif_list.join('\n');
			},
			'for':([[i,from,to,[step,op]], stmts])=>{
				const range = ((from,to,step,op)=>{
					if(step == 1 && op == '+'){
						if(from == 0) return `range(${to+1})`;
						else return `range(${from},${to+1})`;
					}else{
						return `range(${from},${to+1},${op=='+'?'':'-'}${step})`;
					}
				})(parseFloat(from+''),parseFloat(to+''),parseFloat(step+''),op);
				return [
					`for ${i} in ${range}:`,
					...stmts
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
				return [
					`while ${cond}:`,
					...stmts
				].join('\n');
			},
			'func_def':([[name,params], stmts])=>{
				return [
					`def ${name}(${params.join(',')}):`,
					...stmts
				].join('\n');
			},
			'initial_set':([ary,value])=>{
				return `this['initial_set']('${ary}',${value});`;
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
			'statement_list':node=>{
				return indent(node);
			},
			'program':node=>{
				const [program]=node;
				return program.join('\n').split('\n').map(line=>line.replace(/^\t/,'')).join('\n');
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
