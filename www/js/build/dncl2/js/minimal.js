
import {DNCL2Parser} from './transpiler/DNCL2Parser.js';
import {DNCL2Semantics} from './transpiler/DNCL2Semantics.js';
import {DNCL2Builder} from './transpiler/DNCL2Builder.js';
import root from '../runtime/js/lib.js';

export function transpile(src) {
	src=src.replace(/[　｜└]/g,'  ').split('\n').filter(e=>!/^ *$/.test(e)).join('\n');
	// console.log(src);
	const isSync=str=>/isSync/.test((str.match(/.*\n/)||[''])[0]);
	const tree=DNCL2Parser.parse(src).result[0];
	// return tree;
	const ast=DNCL2Semantics.analyse(tree);
	// return ast;
	const program=(isSync(src)?DNCL2Builder.buildSync:DNCL2Builder.build)(ast);
	console.log(program);
	return program;
}
export function run(program) {
	root['root']=root;
	window.root=root;
	const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
	(async ()=>{
		try{
			console.log(program);
			new Function(`console.log(this.root)`).apply({root});
			await (new AsyncFunction(`try{await ${program}.apply(window.root)}catch(e){alert(e);console.log(e);}`).apply({root}));
		}catch(e){alert(e);}
	})();
}
window.DNCL2={transpile, run};