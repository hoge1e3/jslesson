import {Parser} from './parser.js'
import {ExpressionParser} from './ExpressionParser2.js'

export const Grammer = (()=>{
	const gdef={};
	return class{
		static load(g){
			for(const [name, value] of Object.entries(g)){
				const syntax=(()=>{
					if(Array.isArray(value)){
						// return this.and(...value);
						if(typeof value[0]=='string')value.unshift(this.get(value.shift()));
						return value.reduce((one,two)=>one.and((typeof two=='string')?this.get(two):two));
					}else return value;
				})();
				this.set(name, syntax);
			}
		}
		static extend(ary,obj){
			for(const [key,value] of Object.entries(obj)) ary[key]=value; 
			return ary;
		}
		static set(name,syntax){
			gdef[name]=syntax.ret(function(){return this.extend([...arguments],{name});}.bind(this));
		}
		static get(name){
			if((typeof name=='string')&&(name.match(' as '))){
				const [from,to]=name.split(' as ');
				this.set(to,this.get(from));
				name=to;
			}
			return gdef[name]||(()=>{
				gdef[name]=null;
				return Parser.lazy(()=>gdef[name])
			})();
		}
		static build(){
			return gdef['program'];
		}
		static monitor(){/*console.log('monitor: ', gdef);*/}
		static expr(defs){
			const {elem,ops}=defs;
			const e=ExpressionParser();
			e.element((typeof elem=='string')?this.get(elem):elem);
			const regist={
				'prefix': (...args)=>e.prefix(...args),
				'postfix': (...args)=>e.postfix(...args),
				'trifixr': (...args)=>e.trifixr(...args),
				'infixl': (...args)=>e.infixl(...args),
				'infixr': (...args)=>e.infixr(...args),
			};
			// console.log('elem',elem);
			// console.log('ops',ops);
			const dict={};
			for(const [prio,[type,op]] of Object.entries(ops)){
				const [from,to]=type.split(' as ');
				dict[from]=to||from;
				regist[from](prio,op);
			}
			e.mkInfixl(function(){
				return this.extend([...arguments],{name:dict['infixl']||'infixl'});
			}.bind(this));
			e.mkInfixr(function(){
				return this.extend([...arguments],{name:dict['infixr']||'infixr'});
			}.bind(this));
			e.mkPrefix(function(){
				return this.extend([...arguments],{name:dict['prefix']||'prefix'});
			}.bind(this));
			e.mkPostfix(function(){
				return this.extend([...arguments],{name:dict['postfix']||'postfix'});
			}.bind(this));
			e.mkTrifixr(function(){
				return this.extend([...arguments],{name:dict['Trifixr']||'Trifixr'});
			}.bind(this));
			return e.build();
		}
		static memo(value,label){
			if(typeof value=='string')value=this.get(value);
			this.set(label,value);
			return label;
		}
		static and(){
			const value=Array.prototype.slice.call(arguments);
			if(typeof value[0]=='string')value.unshift(this.get(value.shift()));
			// return value.reduce((one,two)=>one.and((typeof two=='string')?this.get(two):two));
			return value.reduce((one,two)=>one.and((typeof two=='string')?this.get(two):two).ret(function(){return [...arguments];}));
		}
		static or(){
			const value=Array.prototype.slice.call(arguments);
			if(typeof value[0]=='string')value.unshift(this.get(value.shift()));
			return value.reduce((one,two)=>one.or((typeof two=='string')?this.get(two):two));
		}
		static rep0(value){
			if(typeof value=='string')value=this.get(value);
			return value.rep0();
		}
		static rep1(value){
			if(typeof value=='string')value=this.get(value);
			return value.rep1();
		}
		static sep0(value,sep){
			if(typeof value=='string')value=this.get(value);
			if(typeof sep=='string')sep=this.get(sep);
			return value.sep0(sep,true);
		}
		static sep1(value,sep){
			if(typeof value=='string')value=this.get(value);
			if(typeof sep=='string')sep=this.get(sep);
			return value.sep1(sep,true);
		}
		static opt(value){
			if(typeof value=='string')value=this.get(value);
			return value.opt();
		}
	};
});

