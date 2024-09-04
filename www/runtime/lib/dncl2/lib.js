const locals = {};

class root {
	keys_shot = ()=>{
		this.starting_keys = [];
		this.starting_keys = Object.keys(this);
	}
	keys_diff = ()=>{
		const now = Object.keys(this);
		const defines = now.filter(key=>this.starting_keys.indexOf(key)==-1);
		return defines
	}
	console_log = console.log;
	logging_memory=(...args)=>{
		if(args[0]){
			console.log(window.performance.memory[args[0].toString()]);
		}else console.log(window.performance.memory);
	}
	logging_performance=(...args)=>{
		if(args[0]){
			console.log(window.performance[args[0].toString()]);
		}else console.log(window.performance);
	}
	addProxy=(proxyName,proxy)=>{
		// console.log(proxyName);
		// console.log(proxy);
		// console.log(toName);
		// console.log(toParam);
		this[proxyName] = proxy;
	}
	確認=()=>{
		const keys = this.keys_diff();
		this.表示する(["==確認=="]);
		for(const key of keys){
			this.表示する([key, " => ", this[key]]);
		}
	}
	_killFlag=false;
	改行="\n"
	input=([disp])=>{
		const ipt = prompt(disp);
		if(/^([0-9０-９]+([.．]([0-9０-９])+)?)/.test(ipt))
			return parseFloat(ipt.replace(/[０-９]/g,s=>String.fromCharCode(s.charCodeAt(0)-0xFEE0)).replace(/．/,"."))
		else return ipt;
	}
	外部からの入力=this.input
	isArray = arg =>{
		try{
			if(!Array.isArray(arg))return false;
			if(arg.filter(e=>(typeof e != "number")&&(typeof e != "string")).length)return false;
			return true;
		}catch(e){
			return false;
		}
	};
	isTable = arg=>{
		try{
			if(!Array.isArray(arg))return false;
			if(arg.length==0)return false;
			if(arg.filter(line=>!Array.isArray(line)).length)return false;
			if(arg[0].length==0)return false;
			if([...new Set(arg.map(line=>line.length))].length>1)return false;
			if(arg.filter(line=>line.filter(e=>(typeof e!="number")&&(typeof e!="string")).length).length)return false;
			return true;
		}catch(e){
			return false;
		}
	};
	array2string = arg =>{
		if(!this.isArray(arg))return '';
		return `[ ${arg.join(', ')} ]`;
	};
	table2string = arg =>{
		if(!this.isTable(arg))return '';
		return ['[',
			...arg.map(line=>line.join(', ')),
		']'].join('\n');
	};
	表示する=args=>{
		for(const arg of args){
			if(this.isArray(arg))write(this.array2string(arg)+' ',true);
			else if(this.isTable(arg))write(this.table2string(arg)+' ',true);
			else write(arg+' ',true);
		}
		write('');
	}
	改行なしで表示する=args=>{
		for(const arg of args){
			if(this.isArray(arg))write(this.array2string(arg)+' ',true);
			else if(this.isTable(arg))write(this.table2string(arg)+' ',true);
			else write(arg+' ',true);
		}
	}
	改行無しで表示する=this.改行なしで表示する
	
	forinfo=[]
	whileinfo=[]
	ifinfo=[]
	callinfo={}
	iff=(id,cond)=>{
		this['ifinfo'][id]||={judge:0,true:0,false:0};
		this['ifinfo'][id]['judge']++;
		this['ifinfo'][id][cond?'true':'false']++;
		return cond;
	}
	callf=async (name,args)=>{
		// console.log(this.callinfo[name]);
		try{
			this['callinfo'][name]||={callCnt:0,info:[]};
			// console.log(args);
			const info = { args:[...args] };
			const ret = await this[name](args);
			info.ret = ret;
			this['callinfo'][name].info.push(info);
			this['callinfo'][name].callCnt++;
			return ret;
		}catch(e){
			if(/is not a function/.test(e))throw `${name} は未定義の関数です。`;
			else throw e;
		}
	}
	性能を確認する=()=>{
		const info = [];
		info.push('==反復実行の実行情報==');
		for(const [id,count] of Object.entries(this.forinfo)){
			info.push(`for${id}：${count}回`);
		}
		for(const [id,count] of Object.entries(this.whileinfo)){
			info.push(`while${id}：${count}回`);
		}
		info.push('\n==条件分岐の実行情報==');
		for(const [id,{judge,'true':t,'false':f}] of Object.entries(this.ifinfo)){
			info.push(`if${id}：実行${judge}回、真${t}回、偽${f}回`)
		}
		info.push('\n==関数の実行情報==');
		console.log(this.callinfo);
		for(const [name,{callCnt:count}] of Object.entries(this.callinfo)){
			info.push(`「${name}」：${count}回`);
		}
		this['表示する']([info.join('<br>')]);
	}
	// forward = dist => {
	//   root.kameta ||= root.turtle.create();
	//   root.kameta.forward(dist);
	// }
	// turnLeft = dir => {
	//   root.kameta ||= root.turtle.create();
	//   root.kameta.turnLeft(dir);
	// }
	// turnRight = dir => {
	//   root.kameta ||= root.turtle.create();
	//   root.kameta.turnRight(dir);
	// }
	// center = ()=>{
	//   root.kameta ||= root.turtle.create();
	//   root.kameta.moveToCenter();
	// }
	// ===数学関数===
	abs = ([num])=> n<0?n*(-1):n;
	絶対値 = this.abs;
	sin = ([rad])=> Math.sin(rad);
	サイン = this.sin;
	cos = ([rad])=> Math.cos(rad);
	コサイン = this.cos;
	tan = ([rad])=> Math.tan(rad);
	タンジェント = this.tan;
	asin = ([rad])=> Math.asin(rad);
	アークサイン = this.asin;
	acos = ([rad])=> Math.acos(rad);
	アークコサイン = this.acos;
	atan = ([rad])=> Math.atan(rad);
	アークタンジェント = this.atan;
	atan2 = ([a,b])=> Math.atan2(a,b);
	アークタンジェント2 = this.atan2;
	sqrt = ([num])=> Math.sqrt(num);
	ルート = this.sqrt;
	ceil = ([num])=> Math.ceil(num);
	切り上げ = this.ceil;
	floor = ([num])=> Math.floor(num);
	切り捨て = this.floor;
	整数 = this.floor;
	round = ([num])=> Math.round(num);
	四捨五入 = this.round;
	log = ([num])=> Math.log(num);
	対数 = this.log;
	log10 = ([num])=> Math.log10(num);
	対数10 = this.log10;
	log2 = ([num])=> Math.log2(num);
	対数2 = this.log2;
	pow = ([a,b])=> Math.pow(a,b);
	累乗 = this.pow;
	radians = ([d])=> d*(Math.PI/180);
	ラジアン = this.radians;
	degrees = ([d])=> d*(180/Math.PI);
	角度 = this.degree;
	random = (args) =>{
		if(args.length==0) return Math.random();
		const {from,to} = (()=>{switch(args.length){
			case 1:
				return {from:0,to:args[0]};
			case 2:
				return {from:args[0],to:args[1]};
		}})();
		const rnd = Math.random();
		const ptrn = to-from+1;
		return from + Math.floor(rnd*ptrn);
	};
	乱数 = this.random
	//文字列操作
	split = ([str,dlm]) => str.toString().split(dlm.toString());
	分割 = this.split;
	includes = ([str,parts]) => str.toString().match(RegExp(parts.toString(),'g'))?.length||0;
	含む = this.includes;
	//配列操作
	ary_ref = (_this,ary,refer)=>{
		if(typeof _this[ary]=='undefined')_this[ary]=[];
		if(!refer.length)return _this[ary];
		const refs = refer.map(e=>parseInt(e)||e);//.map(e=>typeof e=='number'?e-1:e);
		let target=_this[ary];
		while(refs.length>1){
			const ref = refs.shift();
			if(typeof target[ref]=='undefined')target[ref]=[];
			if(Array.isArray(target[ref])){
				target = target[ref];
				continue;
			}
			throw new Error(`${ary}[${refer}]は配列の要素ではありません。`);
		}
		const last = refs.shift();
		if(typeof target[last]=='undefined')target[last] = this.initial_dict[ary] || undefined;
		return target[last];
	}
	len = ([ary])=> ary.length;
	要素数 = this.len;
	行数 = ([ary])=>{
		if(!Array.isArray(ary))return;
		if(!Array.isArray(ary[0]))return;
		return ary.length;
	};
	列数 = ([ary])=>{
		if(!Array.isArray(ary))return;
		if(!Array.isArray(ary[0]))return;
		return ary[0].length;
	};
	swap=([ary,a,b])=>{
		if(!Array.isArray(ary))return;
		[ary[a],ary[b]]=[ary[b],ary[a]];
	};
	入れ替える = this.swap;
	asc = ([ary])=>{
		if(!Array.isArray(ary))return;
		return ary.sort();
	};
	昇順ソート = this.asc;
	desc = ([ary])=>{
		if(!Array.isArray(ary))return;
		return ary.sort().reverse();
	};
	降順ソート = this.desc;
	最初に追加 = ([ary,item])=>{
		if(!Array.isArray(ary))return;
		ary.unshift(item);
	};
	最後に追加 = ([ary,item])=>{
		if(!Array.isArray(ary))return;
		ary.push(item);
	};
	最初から取り出す = ([ary])=>{
		if(!Array.isArray(ary))return;
		return ary.shift();
	};
	最後から取り出す = ([ary])=>{
		if(!Array.isArray(ary))return;
		return ary.pop();
	};
	空にする = ([ary])=>{
		if(!Array.isArray(ary))return;
		ary.length = 0;
	};
	// initial_dict = {};
	// initial_set = (ary,value)=>{
	//   this[ary] = this[ary]||[];
	//   this.initial_dict[ary] = value;
	//   for(const i in this[ary]) this[ary][i] = value;
	// }
	initial_set = (ary=[], defaultValue)=>{
		console.log(ary);
    return new Proxy(ary, {
        get(target, prop) {
            if (prop in target) {
                return target[prop];
            } else {
                return defaultValue;
            }
        },
        set(target, prop, value) {
            target[prop] = value;
            return true;
        }
    });
	}
	twice = ([num]) => num * 2
	mul = ([a, b]) => a * b
}

export default new root()
