export const context=(()=>{
	const rootOrThis=['root','self','this','自分'];
	const localScope=[[]];
	const paramScope=[['_rest']];
	return class{
		static enter(local,param){ localScope.unshift(local); paramScope.unshift(param); }
		static exit(){ localScope.shift(); paramScope.shift(); }
		static typeof(name){
			if(rootOrThis.includes(name))return 'rootOrThis';
			for(const i in localScope){
				if(paramScope[i].includes(name))return 'param';
				if(localScope[i].includes(name))return 'local';
			}
			return 'prop';
		}
		static monitor(){
			console.log(`now locals: [[${localScope.map(e=>e.join(',')).join('],[')}]]`);
			console.log(`now params: [[${paramScope.map(e=>e.join(',')).join('],[')}]]`);
		}
	};
});
