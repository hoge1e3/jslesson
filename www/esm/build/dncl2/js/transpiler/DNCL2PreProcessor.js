// const space2tab = str=>
//   str.split('\n').map(line=>{
//     while(line.match(/^(\t*)    /))line=line.replace(/^(\t*)    /,'$1\t');
//     return line;
//   }).join('\n');
// const array2oneliner=str=>str.replace(/\[[\s]+/g,'[').replace(/\][\s]*,/g,'],').replace(/\],[\s]+/g,'],').replace(/\][\s]*\]/g,']]');
const keisen2tab = str=>str.replace(/[｜└]/g,'\t');
const delete_cr = str=>str.replace(/\r/g,'');
// const deleteComment = str=>str.split('\n').map(line=>line.replace(/#.*$/,'')).join('\n');
const deleteComment = str=>{
	const lines = str.split('\n').map(line=>{
		let processedLine = '';
		let mojis = line.split('');
		let inStr = false;
		while(mojis.length){
			const moji = mojis.shift();
			if(moji == '"')inStr = !inStr;
			if(!inStr && moji == "#"){
				while(mojis.length)mojis.shift();
			}else{
				processedLine+=moji;
			}
		}
		return processedLine;
	});
	return lines.join('\n');
}
const deleteEmptyLine = str=>str.replace(/\n[ \t\n]*\n/g,'\n').replace(/^\n/,'');
const lineEndTrim=str=> str.split('\n').map(line=>line.replace(/[ 　\t]*$/,'')).join('\n');

// const indent2block=str=>{
//   const strs = str.split('\n');
//   let bef = 0;
//   for(const [i,line] of Object.entries(strs)){
//     const len = (line.match(/^\t*/)[0]||'').length;
//     if(len<bef)strs[i]=Array(bef-len).fill('}\n').join('')+strs[i];
//     if(/[\:：]$/.test(line))strs[i]+='\n{';
//     bef = len;
//   }
//   console.log(bef);
//   while(bef--)strs[strs.length-1]+='\n}'
//   return strs.join('\n');
// }
const indent2block = src=>{
	const last = ary => ary[ary.length-1];
	const indentStack = [0];
	const lines = src.split('\n');
	for(const i in lines){
		const line = lines[i];
		const indentSize = line.match(/^ */)[0].length;
		if(last(indentStack) < indentSize){
			if(last(indentStack)!==-1){
				throw new Error([
					'インデントにエラーがあります。',
					`${parseInt(i)+1}行目付近を確認してください。`
				].join('\n'));
			}else{
				indentStack[indentStack.length-1] = indentSize;
				lines[i]='{\n'+lines[i];
			}
		}else if(indentSize < last(indentStack)){
			while(indentSize<last(indentStack)){
				indentStack.pop();
				lines[i]='}\n'+lines[i];
			}
			if(indentSize != last(indentStack)){
				throw new Error([
					'インデントにエラーがあります。',
					`${parseInt(i)+1}行目付近を確認してください。`
				].join('\n'));
			}
		}
		if(/[:：]\s*$/.test(line)){
			indentStack.push(-1);
		}
	}
	while(indentStack.length>1){
		lines[lines.length-1]+='\n}';
		indentStack.pop();
	}
	return lines.join('\n');
};

const allhalfspace = text=>text.replace(/\t/g,'    ').replace(/　/g,'  ');

export const DNCL2PreProcessor = str=>{
	console.log(str);
	str = delete_cr(str);
	console.log(str);
	str = deleteComment(str);
	console.log(str);
	str = lineEndTrim(str);
	console.log(str);
	str = keisen2tab(str);
	console.log(str);
	// str = space2tab(str);
	// console.log(str);
	// str = array2oneliner(str);
	// console.log(str);
	str = allhalfspace(str);
	console.log(str);
	str = indent2block(str);
	console.log(str);
	str = deleteEmptyLine(str);
	console.log(str);
	return str;
}
