const toPathList = ast =>{
	console.log(ast);
	const paths = [];
	lookR(ast,[],paths);
	console.log(paths.join('\n'));
	return paths.join('\n');
}

const lookR = (node,path,paths) =>{
	if(typeof node==='undefined'||typeof node === 'null')return;
	// console.log(node);
	const {name}=node;
	if(name)path.push(name);
	if(Array.isArray(node)){
		for(const subTree of node){
			lookR(subTree,path,paths);
		}
	}else{
		paths.push(path.join('/'));
	}
	if(name)path.pop();
}

export{
	toPathList
}
