export const Processor=(()=>{
	const sdefs={};
	return class{
		static get(name){
			if(!name)return node=>node;
			if(!sdefs[name])return node=>node;
			return sdefs[name];
		}
		static set(name,f){ sdefs[name]=f; }
		static load(sdefs){
			for(const [name,f] of Object.entries(sdefs))this.set(name,f);
		}
		static monitor(){ console.log(sdefs); }
	};
});

export const Bottomup=(()=>{
	return class extends Processor(){
		static process(node){
			// console.log('node:',node?.name);
			// console.log(node);
			if(!node)return node;
			if(!Array.isArray(node))return this.get(node?.name)(node);
			for(const [i,subnode] of Object.entries(node))node[i]=this.process(subnode);
			// console.log('processor:', this.get(node.name));
			// console.log('this is ', node.name);
			return this.get(node.name)(node);
		}
	};
});

export const Topdown=(()=>{
	return class extends Processor(){
		static process(node){
			// console.log('node:',node?.name);
			// console.log(node);
			if(!node)return node;
			if(!Array.isArray(node))return this.get(node?.name)(node);
			this.get(node.name)(node);
			for(const [i,subnode] of Object.entries(node))node[i]=this.process(subnode);
			this.get(node.name+'$')(node);
			// console.log('processor:', this.get(node.name));
			// console.log('this is ', node.name);
			return node;
		}
	};
});
