import root from './lib.js';
root['root']=root;
window.root=root;

// console.log(root);
root.addProxy('二倍',(params)=>root['twice'](params))
root.addProxy('乗算',(params)=>root['mul'](params))

// window.write=element=>{
//   document.body.appendChild(element);

//   // 一番下までスクロールする
//   document.body.scrollTop = document.body.scrollHeight;
// };
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
export function run(program) {
	(async ()=>{
		if(!program)return;
		try{
			console.log(program);
			new Function(`console.log(this.root)`).apply({root});
			await (new AsyncFunction(`
function sendResult({result, detail}) {
	try{
		window.parent.sendResult(detail, "dncl2", result);
	}catch(e){
		console.error(e);
	}
}
	try{
			root.keys_shot();
			await ${program}.apply(window.root);
			const detail = [...document.querySelectorAll('body pre')].map(tag=>tag.textContent).join('\\n') || '';
			sendResult({result:'Run',detail,filename:location.href});
	}catch(e){
			alert(e);
			write(e);
			console.log(e);
			sendResult({result:'Runtime Error',detail:e});
	}`).apply({root}));
		}catch(e){alert(e);}
	})();	
}
