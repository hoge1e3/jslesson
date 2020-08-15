(function (global) {
    var define,requirejs;
	var R={};
	var REQJS="REQJS_";
	var reqjsSeq=0;
	R.def=function (name, reqs,func) {
		var m=R.getModuleInfo(name);
		if (typeof reqs=="function") {
		    func=reqs;
		    reqs=R.reqsFromFunc(func);
    		R.setReqs( m, reqs);
    		m.func=function () {
    		    var module={exports:{}};
    			var res=func(R.doLoad,module,module.exports);
    			return res || module.exports;
    		};
		} else {
    		R.setReqs( m, reqs);
    		m.func=function () {
    			return func.apply(this, R.getObjs(reqs));
    		};
		}
		R.loadIfAvailable(m);
	};
	define=function (name,reqs,func) {
		R.def(name, reqs,func);
	};
	define.amd={};
	requirejs=function (reqs,func) {
		R.def(REQJS+(reqjsSeq++),reqs,func);
	};
	R.setReqs=function (m, reqs) {
		reqs.forEach(function (req) {
			var reqm=R.getModuleInfo(req);
			if (!reqm.loaded) {
				m.reqs[req]=reqm;
				reqm.revReqs[m.name]=m;
			}
		});
	};
	R.getModuleInfo=function (name) {
		var ms=R.modules;
		return ms[name]=ms[name]||{name:name,reqs:{},revReqs:{}};
	};
	R.doLoad=function (name) {
		var m=R.getModuleInfo(name);
		if (m.loaded) return m.obj;
		m.loaded=true;
		var res=m.func();
	    if ( res==null && !name.match(/^REQJS_/)) console.log("Warning: No obj for "+name);
		m.obj=res;
		for (var i in m.revReqs) {
			R.notifyLoaded(m.revReqs[i], m.name);
		}
		return res;
	};
	R.notifyLoaded=function (dependingMod, loadedModuleName) {
	    // depengindMod depends on loadedModule
		delete dependingMod.reqs[loadedModuleName];
		R.loadIfAvailable(dependingMod);
	};
	R.loadIfAvailable=function (m) {
		for (var i in m.reqs) {
			return;
		}
		R.doLoad(m.name);
	};
	R.getObjs=function (ary) {
		var res=[];
		ary.forEach(function (n) {
			var cur=R.doLoad(n);
			res.push(cur);
		});
		return res;
	};
	R.reqsFromFunc=function (f) {
	    var str=f+"";
	    var res=[];
	    str.replace(/require\s*\(\s*["']([^"']+)["']\s*\)/g,function (m,a) {
	       res.push(a);
	    });
	    return res;
	};
	R.modules={};
	//requireSimulator=R;
//----------
/*global window,self,global*/
define('root',[],function (){
    if (typeof window!=="undefined") return window;
    if (typeof self!=="undefined") return self;
    if (typeof global!=="undefined") return global;
    return (function (){return this;})();
});

/*if (typeof define!=="function") {
	define=require("requirejs").define;
}*/
define('Parser',["root"],function(root) {
var Parser=function () {
	function extend(dst, src) {
		var i;
		for(i in src){
			dst[i]=src[i];
		}
		return dst;
	}
	var $={
		consoleBuffer:"",
		options: {traceTap:false, optimizeFirst: true, profile: false ,
		verboseFirst: false,traceFirstTbl:false},
		Parser: Parser,
		StringParser: StringParser,
		nc: nc
	};
	$.dispTbl=function (tbl) {
		var buf="";
		var h={};
		var n,i;
		if (!tbl) return buf;
		for (i in tbl) {// tbl:{char:Parser}   i:char
			n=tbl[i].name;
			if (!h[n]) h[n]="";
			h[n]+=i;
		}
		for (n in h) {
			buf+=h[n]+"->"+n+",";
		}
		return buf;
	};
	//var console={log:function (s) { $.consoleBuffer+=s; }};
	function _debug(s) {console.log(s);}
	function Parser(parseFunc){
		if ($.options.traceTap) {
			this.parse=function(s){
				console.log("tap: name="+this.name+"  pos="+(s?s.pos:"?"));
				var r=parseFunc.apply(this,[s]);
				var img="NOIMG";
				if (r.src && r.src.str) {
					img=r.src.str.substring(r.pos-3,r.pos)+"^"+r.src.str.substring(r.pos,r.pos+3);
				}
				if (r.src && r.src.tokens) {
					img=r.src.tokens[r.pos-1]+"["+r.src.tokens[r.pos]+"]"+r.src.tokens[r.pos+1];
				}

				console.log("/tap: name="+this.name+
						" pos="+(s?s.pos:"?")+"->"+(r?r.pos:"?")+" "+img+" res="+(r?r.success:"?"));
				return r;
			};
		} else {
			this.parse=parseFunc;
		}
	}
	Parser.create=function(parseFunc) { // (State->State)->Parser
		return new Parser(parseFunc);
	};
	$.create=Parser.create;
	function nc(v,name) {
		if (v==null) throw name+" is null!";
		return v;
	}
	extend(Parser.prototype, {// class Parser
		// Parser.parse:: State->State
		except: function (f) {
			var t=this;
			return this.ret(Parser.create(function (res) {
				//var res=t.parse(s);
				//if (!res.success) return res;
				if (f.apply({}, res.result)) {
					res.success=false;
				}
				return res;
			}).setName("(except "+t.name+")"));
		},
		noFollow: function (p) {
			var t=this;
			nc(p,"p");
			return this.ret(Parser.create(function (res) {
				//var res=t.parse(s);
				//if (!res.success) return res;
				var res2=p.parse(res);
				res.success=!res2.success;
				return res;
			}).setName("("+t.name+" noFollow "+p.name+")"));
		},
		andNoUnify: function(next) {// Parser.and:: (Function|Parser)  -> Parser
			nc(next,"next"); // next==next
			var t=this; // Parser
			var res=Parser.create(function(s){ //s:State
				var r1=t.parse(s); // r1:State
				if (!r1.success) return r1;
				var r2=next.parse(r1); //r2:State
				if (r2.success) {
					r2.result=r1.result.concat(r2.result); // concat===append built in func in Array
				}
				return r2;
			});
			return res.setName("("+this.name+" "+next.name+")");
		},
		and: function(next) {// Parser.and:: Parser  -> Parser
			var res=this.andNoUnify(next);
			//if (!$.options.optimizeFirst) return res;
			if (!this._first) return res;
			var tbl=this._first.tbl;
			var ntbl={};
			//  tbl           ALL:a1  b:b1     c:c1
			//  next.tbl      ALL:a2           c:c2     d:d2
			//           ALL:a1>>next   b:b1>>next c:c1>>next
			for (var c in tbl) {
				ntbl[c]=tbl[c].andNoUnify(next);
			}
			res=Parser.fromFirst(this._first.space, ntbl);
			res.setName("("+this.name+" >> "+next.name+")");
			if ($.options.verboseFirst) {
				console.log("Created aunify name=" +res.name+" tbl="+$.dispTbl(ntbl));
			}
			return res;
		},
		retNoUnify: function (f) {
			var t=this;
			var p;
			if (typeof f=="function") {
				p=Parser.create(function (r1) {
					var r2=r1.clone();
					r2.result=[ f.apply({}, r1.result) ];
					return r2;
				}).setName("retfunc");
			} else p=f;
			var res=Parser.create(function(s){ //s:State
				var r1=t.parse(s); // r1:State
				if (!r1.success) return r1;
				return p.parse(r1);
				/*var r2=r1.clone();
				r2.result=[ f.apply({}, r1.result) ];
				return r2;*/
			}).setName("("+this.name+" >= "+p.name+")");
			return res;
		},
		ret: function(next) {// Parser.ret:: (Function|Parser)  -> Parser
			if (!this._first) return this.retNoUnify(next);
			var tbl=this._first.tbl;
			var ntbl={};
			for (var c in tbl) {
				ntbl[c]=tbl[c].retNoUnify(next);
			}
			var res=Parser.fromFirst(this._first.space, ntbl);
			res.setName("("+this.name+" >>= "+next.name+")");
			if ($.options.verboseFirst) {
				console.log("Created runify name=" +res.name+" tbl="+$.dispTbl(ntbl));
			}
			return res;
		},

		/*
		this._first={space: space, chars:String};
		this._first={space: space, tbl:{char:Parser}};
	*/
		first: function (space, ct) {
			if (!$.options.optimizeFirst) return this;
			if (space==null) throw "Space is null2!";
			if (typeof ct=="string") {
					var tbl={};
					for (var i=0; i<ct.length ; i++) {
						tbl[ct.substring(i,i+1)]=this;
					}
				//this._first={space: space, tbl:tbl};
				return Parser.fromFirst(space,tbl).setName("(fst "+this.name+")");
//        		this._first={space: space, chars:ct};
			} else if (ct==null) {
				return Parser.fromFirst(space,{ALL:this}).setName("(fst "+this.name+")");
				//this._first={space:space, tbl:{ALL:this}};
			} else if (typeof ct=="object") {
				throw "this._first={space: space, tbl:ct}";
			}
			return this;
		},
		firstTokens: function (tokens) {
			if (!$.options.optimizeFirst) return this;
			if (typeof tokens=="string") tokens=[tokens];
			var tbl={};
				if (tokens) {
					var t=this;
					tokens.forEach(function (token) {
					tbl[token]=t;
				});
			} else {
				tbl.ALL=this;
			}
			return Parser.fromFirstTokens(tbl).setName("(fstT "+this.name+")");
		},
		unifyFirst: function (other) {
			var thiz=this;
			function or(a,b) {
				if (!a) return b;
				if (!b) return a;
				return a.orNoUnify(b).checkTbl();
			}
			var tbl={}; // tbl.* includes tbl.ALL
			this.checkTbl();
			other.checkTbl();
			function mergeTbl() {
			//   {except_ALL: contains_ALL}
				var t2=other._first.tbl;
				//before tbl={ALL:a1, b:b1, c:c1}   t2={ALL:a2,c:c2,d:d2}
				//       b1 conts a1  c1 conts a1     c2 conts a2   d2 conts a2
				//after  tbl={ALL:a1|a2 , b:b1|a2    c:c1|c2    d:a1|d2 }
				var keys={},k;
				for ( k in tbl) { /*if (d) console.log("tbl.k="+k);*/ keys[k]=1;}
				for ( k in t2)  { /*if (d) console.log("t2.k="+k);*/ keys[k]=1;}
				delete keys.ALL;
				if (tbl.ALL || t2.ALL) {
					tbl.ALL=or(tbl.ALL, t2.ALL);
				}
				for ( k in keys ) {
					//if (d) console.log("k="+k);
					//if (tbl[k] && !tbl[k].parse) throw "tbl["+k+"] = "+tbl[k];
					//if (t2[k] && !t2[k].parse) throw "t2["+k+"] = "+tbl[k];
					if (tbl[k] && t2[k]) {
						tbl[k]=or(tbl[k],t2[k]);
					} else if (tbl[k] && !t2[k]) {
						tbl[k]=or(tbl[k],t2.ALL);
					} else if (!tbl[k] && t2[k]) {
						tbl[k]=or(tbl.ALL, t2[k]);
					}
				}
			}
			extend(tbl, this._first.tbl);
			mergeTbl();
			var res=Parser.fromFirst(this._first.space, tbl).setName("("+this.name+")U("+other.name+")");
			if ($.options.verboseFirst) console.log("Created unify name=" +res.name+" tbl="+$.dispTbl(tbl));
			return res;
		},
		or: function(other) { // Parser->Parser
			nc(other,"other");
				if (this._first && other._first &&
						this._first.space && this._first.space===other._first.space) {
				return this.unifyFirst(other);
				} else {
					if ($.options.verboseFirst) {
						console.log("Cannot unify"+this.name+" || "+other.name+" "+this._first+" - "+other._first);
					}
					return this.orNoUnify(other);
				}
		},
		orNoUnify: function (other) {
				var t=this;  // t:Parser
			var res=Parser.create(function(s){
				var r1=t.parse(s); // r1:State
				if (!r1.success){
					var r2=other.parse(s); // r2:State
					return r2;
				} else {
					return r1;
				}
			});
			res.name="("+this.name+")|("+other.name+")";
			return res;
		},
		setName: function (n) {
			this.name=n;
			if (this._first) {
				/*var tbl=this._first.tbl;
				for (var i in tbl) {
					tbl[i].setName("(elm "+i+" of "+n+")");
				}*/
			}
			return this;
		},
		profile: function (name) {
			if ($.options.profile) {
				this.parse=this.parse.profile(name || this.name);
			}
			return this;
		},
		repN: function(min){
			var p=this;
			if (!min) min=0;
			var res=Parser.create(function(s) {
				var current=s;
				var result=[];
				while(true){
					var next=p.parse(current);
					if(!next.success) {
						var res;
						if (result.length>=min) {
							res=current.clone();
							res.result=[result];
							res.success=true;
							//console.log("rep0 res="+disp(res.result));
							return res;
						} else {
							res=s.clone();
							res.success=false;
							return res;
						}
					} else {
						result.push(next.result[0]);
						current=next;
					}
				}
			});
			//if (min>0) res._first=p._first;
			return res.setName("("+p.name+" * "+min+")");
		},
		rep0: function () { return this.repN(0); },
		rep1: function () { return this.repN(1); },
		opt: function () {
			var t=this;
			return Parser.create(function (s) {
				var r=t.parse(s);
				if (r.success) {
					return r;
				} else {
					s=s.clone();
					s.success=true;
					s.result=[null];
					return s;
				}
			}).setName("("+t.name+")?");
		},
		sep1: function(sep, valuesToArray) {
			var value=this;
			nc(value,"value");nc(sep,"sep");
			var tail=sep.and(value).ret(function(r1, r2) {
				if(valuesToArray) return r2;
				return {sep:r1, value:r2};
			});
			return value.and(tail.rep0()).ret(function(r1, r2){
				var i;
				if (valuesToArray) {
					var r=[r1].concat(r2);
					/*for (i in r2) {
						r.push(r2[i]);
					}*/ // NO good if Array is monkey-patched
					return r;
				} else {
					return {head:r1,tails:r2};
				}
			}).setName("(sep1 "+value.name+"~~"+sep.name+")");
		},
		sep0: function(s){
			return this.sep1(s,true).opt().ret(function (r) {
				if (!r) return [];
				return r;
			});
		},
		tap: function (msg) {
			//if (!$.traceTap) return this;
			if (!$.options.traceTap) return this;
			if (!msg) msg="";
			var t=this;
			var res=Parser.create(function(s){
				console.log("tap:"+msg+" name:"+t.name+"  pos="+(s?s.pos:"?"));
				var r=t.parse(s);
				var img=r.src.str.substring(r.pos-3,r.pos)+"^"+r.src.str.substring(r.pos,r.pos+3);
				console.log("/tap:"+msg+" name:"+t.name+" pos="+(s?s.pos:"?")+"->"+(r?r.pos:"?")+" "+img+" res="+(r?r.success:"?"));
				return r;
			});
			/*if (this._first) {
				var ntbl={},tbl=this._first.tbl;
				for (var c in tbl) {
					ntbl=tbl[c].
				}
			}*/
			return res.setName("(Tap "+t.name+")");
		},
		retN: function (i) {
			return this.ret(function () {
				return arguments[i];
			});
		},
		parseStr: function (str,global) {
			var st=new State(str,global);
			return this.parse(st);
		},
		checkTbl: function () {
			if (!this._first) return this;
			var tbl=this._first.tbl;
			for (var k in tbl) {
				if (!tbl[k].parse) throw this.name+": tbl."+k+" is not a parser :"+tbl[k];
			}
			return this;
		}
	});
	function State(strOrTokens, global) { // class State
		if (strOrTokens!=null) {
			this.src={maxPos:0, global:global};// maxPos is shared by all state
			if (typeof strOrTokens=="string") {
				this.src.str=strOrTokens;
			}
			if (strOrTokens instanceof Array) {
				this.src.tokens=strOrTokens;
			}
			this.pos=0;
			this.result=[];
			this.success=true;
		}
	}
	extend(State.prototype, {
		clone: function() {
			var s=new State();
			s.src=this.src;
			s.pos=this.pos;
			s.result=this.result.slice();
			s.success=this.success;
			return s;
		},
		updateMaxPos:function (npos) {
			if (npos > this.src.maxPos) {
				this.src.maxPos=npos;
			}
		},
		isSuccess: function () {
			return this.success;
		},
		getGlobal: function () {
				if (!this.src.global) this.src.global={};
				return this.src.global;
		}
	});
	Parser.fromFirst=function (space, tbl) {
		if (space=="TOKEN") {
			return Parser.fromFirstTokens(tbl);
		}
		var res=Parser.create(function (s0) {
			var s=space.parse(s0);
			var f=s.src.str.substring(s.pos,s.pos+1);
			if ($.options.traceFirstTbl) {
				console.log(this.name+": first="+f+" tbl="+( tbl[f]?tbl[f].name:"-") );
			}
			if (tbl[f]) {
				return tbl[f].parse(s);
			}
			if (tbl.ALL) return tbl.ALL.parse(s);
			s.success=false;
			return s;
		});
		res._first={space:space,tbl:tbl};
		res.checkTbl();
		return res;
	};
	Parser.fromFirstTokens=function (tbl) {
		var res=Parser.create(function (s) {
			var t=s.src.tokens[s.pos];
			var f=t?t.type:null;
			if ($.options.traceFirstTbl) {
				console.log(this.name+": firstT="+f+" tbl="+( tbl[f]?tbl[f].name:"-") );
			}
			if (f!=null && tbl[f]) {
				return tbl[f].parse(s);
			}
			if (tbl.ALL) return tbl.ALL.parse(s);
			s.success=false;
			return s;
		});
		res._first={space:"TOKEN",tbl:tbl};
		res.checkTbl();
		return res;
	};

	var StringParser={
		empty: Parser.create(function(state) {
			var res=state.clone();
			res.success=true;
			res.result=[null]; //{length:0, isEmpty:true}];
			return res;
		}).setName("E"),
		fail: Parser.create(function(s){
			s.success=false;
			return s;
		}).setName("F"),
		str: function (st) { // st:String
			return this.strLike(function (str,pos) {
				if (str.substring(pos, pos+st.length)===st) return {len:st.length};
				return null;
			}).setName(st);
		},
		reg: function (r) {//r: regex (must have ^ at the head)
			if (!(r+"").match(/^\/\^/)) console.log("Waring regex should have ^ at the head:"+(r+""));
			return this.strLike(function (str,pos) {
				var res=r.exec( str.substring(pos) );
				if (res) {
					res.len=res[0].length;
					return res;
				}
				return null;
			}).setName(r+"");
		},
		strLike: function (func) {
			// func :: str,pos, state? -> {len:int, other...}  (null for no match )
			return Parser.create(function(state){
				var str= state.src.str;
				if (str==null) throw "strLike: str is null!";
				var spos=state.pos;
				//console.log(" strlike: "+str+" pos:"+spos);
				var r1=func(str, spos, state);
				if ($.options.traceToken) console.log("pos="+spos+" r="+r1);
				if(r1) {
					if ($.options.traceToken) console.log("str:succ");
					r1.pos=spos;
					r1.src=state.src; // insert 2013/05/01
					r1.text=str.substring(r1.pos,r1.pos+r1.len);
					r1.toString=function () {return this.text; };
					var ns=state.clone();
					extend(ns, {pos:spos+r1.len, success:true, result:[r1]});
					state.updateMaxPos(ns.pos);
					return ns;
				}else{
					if ($.options.traceToken) console.log("str:fail");
					state.success=false;
					return state;
				}
			}).setName("STRLIKE");
		},
		parse: function (parser, str,global) {
			var st=new State(str,global);
			return parser.parse(st);
		}
	};
	//  why not eof: ? because StringParser.strLike
	StringParser.eof=StringParser.strLike(function (str,pos) {
		if (pos==str.length) return {len:0};
		return null;
	}).setName("EOF");
	$.StringParser=StringParser;
	var TokensParser={
		token: function (type) {
			return Parser.create(function (s) {
				var t=s.src.tokens[s.pos];
				s.success=false;
				if (!t) return s;
				if (t.type==type) {
					s=s.clone();
					s.updateMaxPos(s.pos);
				s.pos++;
					s.success=true;
					s.result=[t];
				}
				return s;
			}).setName(type).firstTokens(type);
		},
		parse:function (parser, tokens, global) {
			var st=new State(tokens,global);
			return parser.parse(st);
		},
		eof: Parser.create(function (s) {
			var suc=(s.pos>=s.src.tokens.length);
			s.success=suc;
			if (suc) {
				s=s.clone();
				s.result=[{type:"EOF"}];
			}
			return s;
		}).setName("EOT")
	};
	$.TokensParser=TokensParser;
	$.lazy=function (pf) { //   ( ()->Parser ) ->Parser
		var p=null;
		return Parser.create(function (st) {
			if (!p) p=pf();
			if (!p) throw pf+" returned null!";
			this.name=pf.name;
			return p.parse(st);
		}).setName("LZ");
	};
	$.addRange=function(res, newr) {
		if (newr==null) return res;
		if (typeof (res.pos)!="number") {
			res.pos=newr.pos;
			res.len=newr.len;
			return res;
		}
		var newEnd=newr.pos+newr.len;
		var curEnd=res.pos+res.len;
		if (newr.pos<res.pos) res.pos=newr.pos;
		if (newEnd>curEnd) res.len= newEnd-res.pos;
		return res;
	};
	$.setRange=function (res) {
		if (res==null || typeof res=="string" || typeof res=="number" || typeof res=="boolean") return;
		var exRange=$.getRange(res);
		if (exRange!=null) return res;
		for (var i in res) {
			if (!res.hasOwnProperty(i)) continue;
			var range=$.setRange(res[i]);
			$.addRange(res,range);
		}
		return res;
	};

	$.getRange=function(e) {
		if (e==null) return null;
		if (typeof e.pos!="number") return null;
		if (typeof e.len=="number") return e;
		return null;
	};
	return $;
}();
root.Parser=Parser;
return Parser;
});

/*global global*/
define('assert',[],function () {
    var Assertion=function(failMesg) {
        this.failMesg=flatten(failMesg || "Assertion failed: ");
    };
    var $a;
    Assertion.prototype={
        _regedType:{},
        registerType: function (name,t) {
            this._regedType[name]=t;
        },
        MODE_STRICT:"strict",
        MODE_DEFENSIVE:"defensive",
        MODE_BOOL:"bool",
        fail:function () {
            var a=$a(arguments);
            var value=a.shift();
            a=flatten(a);
            a=this.failMesg.concat(value).concat(a);//.concat(["mode",this._mode]);
            console.log.apply(console,a);
            if (this.isDefensive()) return value;
            if (this.isBool()) return false;
            throw new Error(a.join(" "));
        },
        subAssertion: function () {
            var a=$a(arguments);
            a=flatten(a);
            return new Assertion(this.failMesg.concat(a));
        },
        assert: function (t,failMesg) {
            if (!t) return this.fail(t,failMesg);
            return t;
        },
        eq: function (a,b) {
            if (a!==b) return this.fail(a,"!==",b);
            return this.isBool()?true:a;
        },
        ne: function (a,b) {
            if (a===b) return this.fail(a,"===",b);
            return this.isBool()?true:a;
        },
        isset: function (a, n) {
            if (a==null) return this.fail(a, (n||"")+" is null/undef");
            return this.isBool()?true:a;
        },
        is: function (value,type) {
            var t=type,v=value,na;
            if (t==null) {
                return this.fail(value, "assert.is: type must be set");
                // return t; Why!!!!???? because is(args,[String,Number])
            }
            if (t._assert_func) {
                t._assert_func.apply(this,[v]);
                return this.isBool()?true:value;
            }
            this.assert(value!=null,[value, "should be ",t]);
            if (t instanceof Array || (typeof global=="object" && typeof global.Array=="function" && t instanceof global.Array) ) {
                if (!value || typeof value.length!="number") {
                    return this.fail(value, "should be array:");
                }
                var self=this;
                for (var i=0 ;i<t.length; i++) {
                    na=self.subAssertion("failed at ",value,"[",i,"]: ");
                    if (t[i]==null) {
                        console.log("WOW!7", v[i],t[i]);
                    }
                    na.is(v[i],t[i]);
                }
                return this.isBool()?true:value;
            }
            if (t===String || t=="string") {
                this.assert(typeof(v)=="string",[v,"should be a string "]);
                return this.isBool()?true:value;
            }
            if (t===Number || t=="number") {
                this.assert(typeof(v)=="number",[v,"should be a number"]);
                return this.isBool()?true:value;
            }
            if (t instanceof RegExp || (typeof global=="object" && typeof global.RegExp=="function" && t instanceof global.RegExp)) {
                this.is(v,String);
                this.assert(t.exec(v),[v,"does not match to",t]);
                return this.isBool()?true:value;
            }
            if (t===Function) {
                this.assert(typeof v=="function",[v,"should be a function"]);
                return this.isBool()?true:value;
            }
            if (typeof t=="function") {
                this.assert((v instanceof t),[v, "should be ",t]);
                return this.isBool()?true:value;
            }
            if (t && typeof t=="object") {
                for (var k in t) {
                    na=this.subAssertion("failed at ",value,".",k,":");
                    na.is(value[k],t[k]);
                }
                return this.isBool()?true:value;
            }
            if (typeof t=="string") {
                var ty=this._regedType[t];
                if (ty) return this.is(value,ty);
                //console.log("assertion Warning:","unregistered type:", t, "value:",value);
                return this.isBool()?true:value;
            }
            return this.fail(value, "Invaild type: ",t);
        },
        ensureError: function (action, err) {
            try {
                action();
            } catch(e) {
                if(typeof err=="string") {
                    assert(e+""===err,action+" thrown an error "+e+" but expected:"+err);
                }
                console.log("Error thrown successfully: ",e.message);
                return;
            }
            this.fail(action,"should throw an error",err);
        },
        setMode:function (mode) {
            this._mode=mode;
        },
        isDefensive:function () {
            return this._mode===this.MODE_DEFENSIVE;
        },
        isBool:function () {
            return this._mode===this.MODE_BOOL;
        },
        isStrict:function () {
            return !this.isDefensive() && !this.isBool();
        }
    };
    $a=function (args) {
        var a=[];
        for (var i=0; i<args.length ;i++) a.push(args[i]);
        return a;
    };
    var top=new Assertion();
    var assert=function () {
        try {
            return top.assert.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    ["setMode","isDefensive","is","isset","ne","eq","ensureError"].forEach(function (m) {
        assert[m]=function () {
            try {
                return top[m].apply(top,arguments);
            } catch(e) {
                console.log(e.stack);
                //if (top.isDefensive()) return arguments[0];
                //if (top.isBool()) return false;
                throw new Error(e.message);
            }
        };
    });
    assert.fail=top.fail.bind(top);
    assert.MODE_STRICT=top.MODE_STRICT;
    assert.MODE_DEFENSIVE=top.MODE_DEFENSIVE;
    assert.MODE_BOOL=top.MODE_BOOL;
    assert.f=function (f) {
        return {
            _assert_func: f
        };
    };
    assert.opt=function (t) {
        return assert.f(function (v) {
            return v==null || v instanceof t;
        });
    };
    assert.and=function () {
        var types=$a(arguments);
        assert(types instanceof Array);
        return assert.f(function (value) {
            var t=this;
            for (var i=0; i<types.length; i++) {
                t.is(value,types[i]);
            }
        });
    };
    function flatten(a) {
        if (a instanceof Array) {
            var res=[];
            a.forEach(function (e) {
                res=res.concat(flatten(e));
            });
            return res;
        }
        return [a];
    }
    /*function isArg(a) {
        return "length" in a && "caller" in a && "callee" in a;
    };*/
    return assert;
});

/*if (typeof define!=="function") {
	define=require("requirejs").define;
}*/

define('ExpressionParser',["Parser","root"], function (Parser,root) {
// parser.js の補助ライブラリ．式の解析を担当する
var ExpressionParser=function () {
	var $={};
	var EXPSTAT="EXPSTAT";
	//  first 10     *  +  <>  &&  ||  =     0  later
	function opType(type, prio) {
		var $={};
		$.eq=function (o) {return type==o.type() && prio==o.prio(); };
		$.type=function (t) { if (!t) return type; else return t==type;};
		$.prio=function () {return prio;};
		$.toString=function () {return "["+type+":"+prio+"]"; };
		return $;
	}
	function composite(a) {
		var $={};
		var e=a;
		$.add=function (a) {
			if (!e) {
				e=a;
			} else {
				e=e.or(a);
			}
		};
		$.get=function () {
			return e;
		};
		return $;
	}
	function typeComposite() {
		var built=composite();
		//var lastOP , isBuilt;
		var $={};
		$.reg=function (type, prio, a) {
			var opt=opType(type, prio);
			built.add(a.ret(Parser.create(function (r) {
				r.opType=opt;
				return r;
			})).setName("(opType "+opt+" "+a.name+")") );
		};
		$.get=function () {return built.get();};
		$.parse=function (st) {
			return $.get().parse(st);
		};
		return $;
	}
	var prefixOrElement=typeComposite(), postfixOrInfix=typeComposite();
	var element=composite();
	var trifixes=[];
	$.element=function (e) {
		prefixOrElement.reg("element", -1, e);
		element.add(e);
	};
	$.getElement=function () {return element.get();};
	$.prefix=function (prio, pre) {
		prefixOrElement.reg("prefix", prio, pre);
	};
	$.postfix=function (prio, post) {
		postfixOrInfix.reg("postfix", prio, post);
	};
	$.infixl =function (prio, inf) {
		postfixOrInfix.reg("infixl", prio, inf);
	};
	$.infixr =function (prio, inf) {
		postfixOrInfix.reg("infixr", prio, inf);
	};
	$.infix =function (prio, inf) {
		postfixOrInfix.reg("infix", prio, inf);
	};
	$.trifixr = function (prio, tf1, tf2) {
		postfixOrInfix.reg("trifixr", prio, tf1);
		//postfixOrInfix.reg("trifixr2", prio, tf2);
		trifixes[prio]=tf2;
	};
	$.custom = function (prio, func) {
		// func :: Elem(of next higher) -> Parser
	};
	$.mkInfix=function (f) {
		$.mkInfix.def=f;
	};
	$.mkInfix.def=function (left,op,right) {
		return Parser.setRange({type:"infix", op:op, left: left, right: right});
	};
	$.mkInfixl=function (f) {
		$.mkInfixl.def=f;
	};
	$.mkInfixl.def=function (left, op , right) {
		return Parser.setRange({type:"infixl",op:op ,left:left, right:right});
	};
	$.mkInfixr=function (f) {
		$.mkInfixr.def=f;
	};
	$.mkInfixr.def=function (left, op , right) {
		return Parser.setRange({type:"infixr",op:op ,left:left, right:right});
	};
	$.mkPrefix=function (f) {
		$.mkPrefix.def=f;
	};
	$.mkPrefix.def=function (op , right) {
		return Parser.setRange({type:"prefix", op:op, right:right});
	};
	$.mkPostfix=function (f) {
		$.mkPostfix.def=f;
	};
	$.mkPostfix.def=function (left, op) {
		return Parser.setRange({type:"postfix", left:left, op:op});
	};
	$.mkTrifixr=function(f) {
		$.mkTrifixr.def=f;
	};
	$.mkTrifixr.def=function (left, op1, mid, op2, right) {
		return Parser.setRange({type:"trifixr", left:left, op1:op1, mid:mid, op2:op2, right:right});
	};
	$.build= function () {
		//postfixOrInfix.build();
		//prefixOrElement.build();
		$.built= Parser.create(function (st) {
			return parse(0,st);
		}).setName("ExpBuilt");
		return $.built;
	};
	function dump(st, lbl) {
		return ;
		/*var s=st.src.str;
		console.log("["+lbl+"] "+s.substring(0,st.pos)+"^"+s.substring(st.pos)+
				" opType="+ st.opType+"  Succ = "+st.isSuccess()+" res="+st.result[0]);*/
	}
	function parse(minPrio, st) {
		var stat=0, res=st ,  opt,/*const*/pex,inf;
		dump(st," start minprio= "+minPrio);
		st=prefixOrElement.parse(st);
		dump(st," prefixorelem "+minPrio);
		if (!st.isSuccess()) {
			return st;
		}
		//p2=st.result[0];
		opt=st.opType;
		if (opt.type("prefix") ) {
			// st = -^elem
			var pre=st.result[0];
			st=parse(opt.prio(), st);
			if (!st.isSuccess()) {
				return st;
			}
				// st: Expr    st.pos = -elem^
			pex=$.mkPrefix.def(pre, st.result[0]);
			res=st.clone();  //  res:Expr
			res.result=[pex]; // res:prefixExpr  res.pos= -elem^
			if (!st.nextPostfixOrInfix) {
				return res;
			}
			// st.next =  -elem+^elem
			st=st.nextPostfixOrInfix;  // st: postfixOrInfix
		} else { //elem
			//p=p2;
			res=st.clone(); // res:elemExpr   res =  elem^
			st=postfixOrInfix.parse(st);
			if (!st.isSuccess()) {
				return res;
			}
		}
		// assert st:postfixOrInfix  res:Expr
		while (true) {
			dump(st,"st:pi"); dump(res,"res:ex");
			opt=st.opType;
			if (opt.prio()<minPrio) {
				res.nextPostfixOrInfix=st;
				return res;
			}
			// assert st:postfixOrInfix  res:Expr
			if (opt.type("postfix")) {
				// st:postfix
				pex=$.mkPostfix.def(res.result[0],st.result[0]);
				res=st.clone();
				res.result=[pex]; // res.pos= expr++^
				dump(st, "185");
				st=postfixOrInfix.parse(st); // st. pos= expr++--^
				if (!st.isSuccess()) {
					return res;
				}
			} else if (opt.type("infixl")){  //x+y+z
				// st: infixl
				inf=st.result[0];
				st=parse(opt.prio()+1, st);
				if (!st.isSuccess()) {
					return res;
				}
				// st: expr   st.pos=  expr+expr^
				pex=$.mkInfixl.def(res.result[0], inf , st.result[0]);
				res=st.clone();
				res.result=[pex]; //res:infixlExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
			} else if (opt.type("infixr")) { //a=^b=c
				// st: infixr
				inf=st.result[0];
				st=parse(opt.prio() ,st);
				if (!st.isSuccess()) {
					return res;
				}
				// st: expr   st.pos=  a=b=c^
				pex=$.mkInfixr.def(res.result[0], inf , st.result[0]);
				res=st.clone();
				res.result=[pex]; //res:infixrExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
			} else if (opt.type("trifixr")) { //left?^mid:right
				// st: trifixr
				var left=res.result[0];
				var inf1=st.result[0];  // inf1 =  ?
				st=parse(opt.prio()+1 ,st);
				if (!st.isSuccess()) {
					return res;
				}
				// st= expr   st.pos=  left?mid^:right
				var mid=st.result[0];
				st=trifixes[opt.prio()].parse(st);
				// st= :      st.pos= left?mid:^right;
				if (!st.isSuccess()) {
					return res;
				}
				var inf2= st.result[0];
				st=parse(opt.prio() ,st);
				if (!st.isSuccess()) {
					return res;
				}
				var right=st.result[0];
				// st=right      st.pos= left?mid:right^;
				pex=$.mkTrifixr.def(left, inf1 , mid, inf2, right);
				res=st.clone();
				res.result=[pex]; //res:infixrExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
			} else { // infix
				// st: infixl
				inf=st.result[0];
				st=parse(opt.prio()+1 ,st);
				if (!st.isSuccess()) {
					return res;
				}
				// st: expr   st.pos=  expr+expr^
				pex=$.mkInfix.def(res.result[0], inf , st.result[0]);
				res=st.clone();
				res.result=[pex]; //res:infixExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
				if (opt.prio()==st.opType.prio()) {
					res.success=false;
					return res;
				}
			}
			// assert st:postfixOrInfix  res:Expr
		}
	}
	$.lazy = function () {
		return Parser.create(function (st) {
			return $.built.parse(st);
		});
	};
	return $;
};
root.ExpressionParser=ExpressionParser;
return ExpressionParser;
});

define('Grammar2',["Parser","assert","ExpressionParser"],
function (P,assert,EP) {
//import P from "./Parser.js";
//import assert from "../lib/assert.js";
class Grammar {
    // abc
    constructor(options) {
        this.defs={};
        if (options) {
            if (options.space) this.space=this.toParser(options.space);
        }
    }
    def(defs) {
        if (defs.$space) {
            this.space=this.toParser(defs.$space);
        }
        const proc=k=>{
            let v=defs[k];
            if (k==="$space") {
                //this.space=this.toParser(v);
            } else {
                const p=this.toParser(v);
                this.defs[k]=p.ret((r)=>{
                    if (r && typeof r==="object" && !r.type) r.type=k;
                    return r;
                });
                if (p.names) this.defs[k].names=p.names;
            }
        };
        for (let k in defs) proc(k);
    }
    genVisitorTemplate() {
        var buf="";
        for (let k in this.defs) {
            var names=this.defs[k].names;
            if (names && names.length) {
                buf+=k+": function (node) {\n";
                for (let n of names) {
                    if (n) buf+="    this.visit(node."+n+");\n";
                }
                buf+="},\n";
            }
        }
        return buf;
    }
    expr(defs) {
        const elem=defs.element;
        const ops=defs.operators;
        const e=EP();
        e.element(this.toParser(elem));
        var prio=0;
        for (let op of ops ){
            const type=op.shift();
            op=op.map(this.toParser.bind(this));
            switch (type) {
                case "prefix":
                e.prefix(prio,...op);
                break;
                case "postfix":
                e.postfix(prio,...op);
                break;
                case "trifixr":
                e.trifix(prio,...op);
                break;
                case "infixl":
                e.infixl(prio,...op);
                break;
                case "infixr":
                e.infixr(prio,...op);
                break;
                default:
                throw new Error(type+": invalid operator type");
            }
            prio++;
        }
        return e.build();
    }
    get(name) {
        return this.defs[name] || P.lazy(()=>{
            const r=this.defs[name];
            if (!r) throw new Error(`Undefined grammar ${name}`);
            return r;
        });
    }
    toParser(expr) {
        if (expr instanceof P.Parser) return expr;
        if (typeof expr==="string") {
            if (expr.match(/^'/)) {
                const r=P.StringParser.str(expr.substring(1));
                if (this.space) return this.space.and(r).ret((s,b)=>b);
                return r;
            }
            return this.get(expr);
        } else if (expr instanceof RegExp) {
            let r=P.StringParser.reg(expr);
            if (this.space) return this.space.and(r).ret((s,b)=>b);
            return r;
        } else if (expr instanceof Array) {
            let p;
            const names=[];
            for (let e of expr) {
                if (e.constructor===Object) {
                    const tnames=[];
                    for (let k in e) {
                        tnames.push(k);
                    }
                    assert(tnames.length===1,"Invalid expr ",expr);
                    assert(tnames[0]!=="type", "Cannot use the name 'type' as an attribute name", expr);
                    names.push(tnames[0]);
                    e=e[tnames[0]];
                } else names.push(null);
                e=this.toParser(e);
                if (!p) p=e;
                else p=p.and(e);
            }
            p=p.ret((...results)=>{
                const r={};
                for (let i=0;i<results.length;i++) {
                    r[i]=results[i];
                    if (names[i]==="this") return results[i];
                    if (names[i]==="$extend") {
                        Object.assign(r,results[i]);
                        delete r.type;
                    } else {
                        if (names[i]) r[names[i]]=results[i];
                    }
                }
                return r;
            });
            p.names=names.filter((n)=>n);
            return p;
        }
        assert.fail("Invalid expr",expr);
    }
}
//const testf=(...{a,b})=>a+b;
const methods=["opt","rep0","rep1","sep0","sep1","except"];
const p=Grammar.prototype;
Grammar.P=P;
for (let m of methods) {
    Object.defineProperty(p,m,{
        get: function () {
            const g=this;
            return (...args)=>{
                const a=args.map(g.toParser.bind(g));
                const head=a.shift();
                if (m==="sep1") a.push(true);
                return head[m](...a);
            };
        }
    });
}
const chainMethods=["and","or"];
for (let m of chainMethods) {
    Object.defineProperty(p,m,{
        get: function () {
            const g=this;
            return (...args)=>{
                const a=args.map(g.toParser.bind(g));
                let head=a.shift();
                while(a.length>0) {
                    head=head[m](a.shift());
                }
                return head;
            };
        }
    });
}
return Grammar;
//export default Grammar;
});

define('Klass',["assert"],function (A) {
    var Klass={};
    Klass.define=function (pd) {
        var p,parent;
        if (pd.$parent) {
            parent=pd.$parent;
            p=Object.create(parent.prototype);
            p.super=function () {
                var a=Array.prototype.slice.call(arguments);
                var n=a.shift();
                return parent.prototype[n].apply(this,a);
            };
        } else {
            p={};
        }
        var thisName,singletonName;
        if (pd.$this) {
            thisName=pd.$this;
        }
        if (pd.$singleton) {
            singletonName=pd.$singleton;
        }
        var init=wrap(pd.$) || function (e) {
            if (e && typeof e=="object") {
                for (var k in e) {
                    this[k]=e[k];
                }
            }
        };
        var fldinit;
        var warn,wrapped,wrapCancelled;
        //var check;
        if (init instanceof Array) {
            fldinit=init;
            init=function () {
                var a=Array.prototype.slice.call(arguments);
                for (var i=0;i<fldinit.length;i++) {
                    if (a.length>0) this[fldinit[i]]=a.shift();
                }
            };
        }
        var klass;
        function checkSchema(self) {
            if (pd.$fields) {
                //console.log("Checking schema",self,pd.$fields);
                A.is(self,pd.$fields);
            }
        }
        klass=function () {
            if (! (this instanceof klass)) {
                var res=Object.create(p);
                init.apply(res,arguments);
                checkSchema(res);
                return res;
            }
            init.apply(this,arguments);
            checkSchema(this);
        };
        if (parent) {
            klass.super=function () {
                var a=Array.prototype.slice.call(arguments);
                var t=a.shift();
                var n=a.shift();
                return parent.prototype[n].apply(t,a);
            };
        }
        klass.inherit=function (pd) {
            pd.$parent=klass;
            return Klass.define(pd);
        };
        klass.prototype=p;
        for (var name in pd) {
            if (name[0]=="$") continue;
            if (name.substring(0,7)=="static$") {
                klass[name.substring(7)]=wrapStatic(pd[name]);
            } else {
                if (isPropDesc(pd[name])) {
                    Object.defineProperty(p,name,wrap(pd[name]));
                } else {
                    p[name]=wrap(pd[name]);
                }
            }
        }
        function wrapStatic(m) {
            if (!singletonName) return m;
            var args=getArgs(m);
            if (args[0]!==singletonName) return m;
            return (function () {
                var a=Array.prototype.slice.call(arguments);
                a.unshift(klass);
                return m.apply(klass,a);
            });
        }
        function wrap(m) {
            if (!thisName) return m;
            if (isPropDesc(m)) {
                for (var k in m) {
                    m[k]=wrap(m[k]);
                }
                return m;
            }
            if (typeof m!=="function") return m;
            if (thisName!==true) {
                var args=getArgs(m);
                if (args[0]!==thisName) {
                    wrapCancelled=true;
                    return m;
                }
                warn=true;
            }
            wrapped=true;
            return (function () {
                var a=Array.prototype.slice.call(arguments);
                a.unshift(this);
                return m.apply(this,a);
            });
        }
        p.$=init;
        Object.defineProperty(p,"$bind",{
            get: function () {
                if (!this.__bounded) {
                    this.__bounded=new Klass.Binder(this);
                }
                return this.__bounded;
            }
        });
        if (warn) {
            //console.warn("This declaration style may malfunction when minified");
            if (!wrapCancelled) {
                console.warn("Use $this:true instead");
            } else {
                console.warn("Use python style in all methods and Use $this:true instead");
            }
            try {
                throw new Error("Stakku");
            } catch (e) {
                console.log(e.stack);
            }
            //console.warn(pd);
        }
        return klass;
    };
    function getArgs(f) {
        var fpat=/function[^\(]*\(([^\)]*)\)/;
        var r=fpat.exec(f+"");
        if (r) {
            return r[1].replace(/\s/g,"").split(",");
        }
        return [];
    }
    function isPropDesc(o) {
        if (typeof o!=="object") return false;
        if (!o) return false;
        var pk={configurable:1,enumerable:1,value:1,writable:1,get:1,set:1};
        var c=0;
        for (var k in o) {
            if (!pk[k]) return false;
            c+=pk[k];
        }
        return c;
    }
    Klass.Function=function () {throw new Error("Abstract");};
    Klass.opt=A.opt;
    Klass.Binder=Klass.define({
        $this:true,
        $:function (t,target) {
            function addMethod(k){
                if (typeof target[k]!=="function") return;
                t[k]=function () {
                    var a=Array.prototype.slice.call(arguments);
                    //console.log(this, this.__target);
                    //A(this.__target,"target is not set");
                    return target[k].apply(target,a);
                };
            }
            for (var k in target) addMethod(k);
        }
    });
    return Klass;
});
/*
requirejs(["Klass"],function (k) {
  P=k.define ({
     $:["x","y"]
  });
  p=P(2,3);
  console.log(p.x,p.y);
});
*/
;
define('Pos2RC',["Klass"],function (Klass){
return Klass.define({
    $: function(src,origin) {
        if (origin==null) this.origin=1;// or 0
        else this.origin=origin;
        var t=this;
        t.src=src;
        t.map=[];
    	t.lastRow=0;
        var pos=0;
    	src.split("\n").forEach(function (line) {
    		t.map.push(pos);
    		pos+=line.length+1;
    	});
    	t.map.push(t.pos);
    },
    getRC:function(pos) {
        var t=this;
        var origin=t.origin;
		while(true) {
			if (t.lastRow<0) {
                t.lastRow=0;
				return {row:origin, col:origin};
			}
			if (t.lastRow+1>=t.map.length) {
                t.lastRow=t.map.length-2;
				return {row:t.map.length+origin, col:origin};
			}
			//A(!( pos<map[lastRow]  &&  map[lastRow]<=pos ));
			//A(!( map[lastRow+1]<=pos  &&  pos<map[lastRow+1] ));
			if (pos<t.map[t.lastRow]) {
				t.lastRow--;
			} else if (t.map[t.lastRow+1]<=pos) {
				t.lastRow++;
			} else {
				return {row:t.lastRow+origin, col:pos-t.map[t.lastRow]+origin};
			}
		}
	},
    getPos: function (row,col) {
        // Although the class name Pos2RC.
        var t=this;
        var pos=0;
        var lines=t.src.split("\n");
        for (var i=0 ; i<lines.length && i+t.origin<row ; i++) {
            pos+=lines[i].length+1;
        }
        pos+=col-t.origin;
        return pos;
    },
    getAll: function (p) {
        if (typeof p==="object") {
            var n=this.getPos(p.row,p.col);
            return {pos:n, row:p.row, col:p.col};
        } else if (typeof p==="number"){
            var r=this.getRC(p);
            r.pos=p;
            return r;
        } else {
            throw new Error("Invalid position type: "+p);
        }
    }
});
});

define('PythonParser',["Grammar2","Pos2RC"/*,"TError"*/],
function (Grammar,Pos2RC/*,TError*/) {
    //const spc=/^([ \t]*(#.*$)*)*/;// (A|B)* <=> (A*B*)*
    const spc=/^([ \t]*(#(.|\r)*$)*)*/;// (A|B)* <=> (A*B*)*
    const tokens=new Grammar({space:spc});
    const P=Grammar.P;
    /*const debug=(mesg)=>P.create((s)=>{
        console.log(mesg,s);
        s.success=true;
        return s;
    }); */
    const reserved=[
        "class","def","if","else","elif","break","continue",
        "for","while","in","return","print","import","as",
        "and","or","not","global","True","False","del",
        "finally","is","None","lambda","try","from" ,"nonlocal","with","yield",
        "assert","pass","except","raise","super"
       ];
    const resvh={};
    for(let r of reserved) resvh[r]=r;
    const puncts=[">=","<=","==","!=","+=","-=","*=","/=","%=","**","//",
      ">","<","=",".",":","+","-","*","/","%","(",")","[","]","{","}",","];
    const tdef={
        tokens: [{"this":tokens.rep0("token")}, /^\s*/ ,P.StringParser.eof],
        //token: tokens.or(...reserved.concat(["quote","symbol","number","qsymbol",":"])),
        token: tokens.or(...["literal3","literal","symbol","number"].concat(puncts)),
        symbol: tokens.toParser(/^[a-zA-Z$_][a-zA-Z$_0-9]*/).ret((r)=>{
            //console.log("RDS",r);
            // resvh[r] <- __getitem__ always true
            if (resvh.hasOwnProperty(r)) r.type=resvh[r];
            return r;
        }),
        number: /^[0-9]+[0-9\.]*(e[\+\-][0-9]+)?/,
        /*literal: P.StringParser.reg({exec: function (s) {
            //var
    		var head=s.substring(0,1);
    		if (head!=='"' && head!=="'") return false;
    		for (var i=1 ;i<s.length ; i++) {
    			var c=s.substring(i,i+1);
    			if (c===head) {
    				return [s.substring(0,i+1)];
    			} else if (c==="\\") {
    				i++;
    			}
    		}
    		return false;
    	}}),*/
        literal: /^r?(("([^\\"]*(\\.)*)*")|('([^\\']*(\\.)*)*'))/,
        literal3: /^""".*/,
    };
    for (let p of puncts) tdef[p]="'"+p;
    //for (let r of reserved) tdef[r]="'"+r;
    //console.log("tdef",tdef);
    tokens.def(tdef);
    const openPar={"(":1,"[":1,"{":1},closePar={"}":1,"]":1,")":1};
    class Tokenizer {
        constructor(src) {
            this.src=src;
            this.pos2rc=new Pos2RC(src);
        }
        tokenize() {
            const src=this.src;
            const ind=/^\s*/;
            const depths=[];
            let parDepth=0;
            this.tokens=[];
            this.pos=0;
            var lineNo=0;
            let literal3=false; // """ ... """
            const literal3End=/"""/;
            for (let line of src.split("\n")) {
                if (literal3) {
                    const m=literal3End.exec(line);
                    if (m) {
                        const pre=line.substring(0,m.index+3);
                        const post=line.substring(m.index+3);
                        literal3.text+="\n"+pre;
                        line=post;
                        //console.log("literal3",literal3,pre,post);
                        literal3=null;
                    } else {
                        literal3.text+="\n"+line;
                        continue;
                    }
                }
                line=line.replace("\r","");
                let r=ind.exec(line);
                const d=r[0].length;
                //console.log("depth",lineNo+1, d,depths);
                if (parDepth==0) {
                    if (depths.length===0) {
                        depths.push(d);
                    } else {
                        const rc=this.pos2rc.getRC(this.pos);
                        const pd=depths[depths.length-1];
                        if (d===pd) {
                            this.tokens.push({type:"nodent",pos:this.pos,len:0,row:rc.row, col: rc.col});
                        } else if (d>pd){
                            this.tokens.push({type:"indent",pos:this.pos,len:0,row:rc.row, col: rc.col});
                            depths.push(d);
                        } else {
                            // dedent
                            this.tokens.push({type:"nodent",pos:this.pos,len:0,row:rc.row, col: rc.col});
                            for (let i=depths.length-1;i>=0;i--) {
                                //console.log("dede",d,depths,i,depths[i]);
                                if (depths[i]<d) {
                                    throw this.error("インデント幅"+d+"の行が"+(lineNo+1)+"行目より前に存在しません。");
                                }
                                if (depths[i]==d) {
                                    break;
                                }
                                this.tokens.push({type:"dedent",pos:this.pos,len:0,row:rc.row, col: rc.col});
                                depths.pop();
                            }
                        }
                    }
                }
                const tks=this.tokenizeLine(line,lineNo);
                for (let tk of tks) {
                    if (openPar[tk.type]) parDepth++;
                    if (closePar[tk.type]) parDepth--;
                    tk.pos+=this.pos;
                    const rc=this.pos2rc.getRC(tk.pos);
                    tk.row=rc.row;
                    tk.col=rc.col;
                }
                if (tks[tks.length-1] && tks[tks.length-1].type==="literal3") {
                    literal3=tks[tks.length-1];
                }
                this.tokens=this.tokens.concat(tks);
                this.pos+=line.length+1;
                lineNo++;
            }
            return this.tokens;
        }
        error(mesg) {
            const e=new Error(mesg);
            e.pos=this.pos;
            return e;
        }
        tokenizeLine(line,lineNo) {
            //console.log("parse token",line);
            const r=tokens.get("tokens").parseStr(line);
            if (!r.success) throw this.error("字句エラー "+(lineNo+1)+":"+(r.src.maxPos+1));
            //console.log("r",r.result[0]);
            return r.result[0];
        }
    }
    const g=new Grammar();
    const rep0=g.rep0;
    const rep1=g.rep1;
    const sep0=g.sep0;
    const sep1=g.sep1;
    const opt=g.opt;
    const or=g.or;
    const br=/^\r?\n/;
    function getIndents(str,pos) {
        const opos=pos;
        const after=str.substring(pos);
        const r=br.exec(after);
        if (!r) return false;
        const before=str.substring(0,pos);
        const ber=/(^|\n)([ \t]*)[^\n]*$/.exec(before);
        if (!ber) return false;
        const bindent=ber[2].length;
        pos+=r[0].length;
        const nl=str.substring(pos);
        const nlr=/^([ \t]*)/.exec(nl);
        const aindent=nlr[1].length;
        pos+=aindent;
        //console.log(aindent,bindent);
        return {after:aindent,before:bindent,pos:pos,len:pos-opos};
    }
    const indent=P.StringParser.strLike((str,pos)=>{
        const r=getIndents(str,pos);
        if (!r) return false;
        if (r.after>r.before) return r;
    });
    const dedent=P.StringParser.strLike((str,pos)=>{
        const r=getIndents(str,pos);
        if (!r) return false;
        if (r.after<r.before) return r;
    });
    const nodent=P.StringParser.strLike((str,pos)=>{
        const r=getIndents(str,pos);
        if (!r) return false;
        if (r.after===r.before) return r;
    });
    const tk=P.TokensParser.token;
    const tailC=opt(",");
    const gdef={
        //$space: spc,
        program: [{body:rep0(or("stmt","classdef"))},P.TokensParser.eof],
        classdef: ["class",{name:"symbol"},{"extends":opt("extends")},":indent",
            {body:"stmtList"},
        "dedent"],
        extends: ["(",{super:"expr"},")"],
        define: ["def",{name:"symbol"},{params:"paramList"},":indent",
            {body:"stmtList"},
        "dedent"],
        paramList: ["(",{body:sep0("symbol",",")},")"],
        ":indent": [":","indent"],
        //nodedent: [rep0("nodent"),"dedent"],
        //defList: rep0("define"),
        stmtList: rep1("stmt"),
        // why printStmt -> printStmt3?
        // because if parse print(x), as printStmt3, comma remains unparsed.
        stmt: or("define","printStmt","printStmt3","ifStmt","whileStmt","breakStmt","continueStmt","letStmt","exprStmt","passStmt","forStmt","returnStmt","delStmt","importStmt2","fromImportStmt","globalStmt","nodent"),
        fromImportStmt: ["from",{name:"packageName"},"import",{localNames:sep1("symbol",",")}],
        importStmt: ["import",{name:"packageName"},{$extend:opt(["as",{alias:"symbol"}])}],
        importStmt2: ["import",{elements:sep1("importElement",",")}],
        importElement: [{name:"packageName"},{$extend:opt(["as",{alias:"symbol"}])}],
        packageName: sep1("symbol","."),
        exprStmt: [{expr:"expr"}],
        delStmt: ["del",{expr:"expr"}],
        returnStmt: ["return",{expr:"expr"}],
        //exprTail: or("block","nodent"),
        ifStmt: ["if",{cond:"expr"},{then:"block"},
        {elif:rep0("elifPart")},{else:opt("elsePart")}],
        whileStmt: ["while",{cond:"expr"},{do:"block"}],
        elifPart: ["elif",{cond:"expr"},{then:"block"}],
        elsePart: ["else",{then:"block"}],
        passStmt: ["pass"],
        breakStmt: ["break"],
        continueStmt: ["continue"],
        forStmt: ["for",{vars:sep1("symbol",",")},"in",{set:"expr"},{do:"block"}],
        letStmt: [{left:"lval"},{op:or("+=","-=","*=","/=","%=","=")},{right:"exprList"}],
        globalStmt: ["global",{names:sep1("symbol",",")}],
        // print(x,y) parsed as: printStmt(2) with tuple
        printStmt: ["print",{values:"exprList"}],
        // print(x,end="") parsed as: printStmt3
        printStmt3: ["print", {args:"args"}],
        singleLval: g.expr({
            element: "symbol",
            operators: [
                ["postfix" , or("args" , "memberRef", "index") ] // (a,b)  .x
            ]
        }),
        lvalList: g.toParser( [{body:sep1("singleLval",",")},{t:tailC}] ),/*.ret(
            (r)=>r.body.length==1&&!r.t ? r.body[1]:r
        )*/
        parenLval: ["(",{this:"lvalList"},")"],
        lval: or("parenLval","lvalList"),
        exprList: g.toParser( [{body:sep1("expr",",")},{t:tailC}]),/*.ret(
            (r)=>r.body.length==1&&!r.t ? r.body[1]:r
        )*/
        expr: g.expr({
            element: "elem",
            operators: [
                //["infixr", "="  ] , //  = 右結合２項演算子
                //["infixl", or("+=","-=","*=","/=","%=")],
                ["infixl", or("or")  ] ,
                ["infixl", or("and")  ] ,
                ["infixl", or("in",">=","<=","==","!=",">","<")  ] , //  + -  左結合２項演算子
                ["infixl", or("+","-")  ] , //  + -  左結合２項演算子
                ["infixl", or("//","*","/","%")  ] , //  * 左結合２項演算子
                ["infixl", or("**")],
                ["prefix",or("not","-")],
                ["postfix" , or("args" , "memberRef","index") ] , // (a,b)  .x
            ]
        }),
        memberRef: [".",{name:"symOrResv"}],
        args: ["(",{body:sep0("arg",",")},")"],
        listComprehension: ["[",{elem:"expr"},"for",{vars:sep1("symbol",",")},"in",{set:"expr"},"]"],
        array: ["[",{body:sep0("expr",",")},"]"],
        dict: ["{",{body:sep0("dictEntry",",")},"}"],
        dictEntry: [{key:"literal"},":",{value:"expr"}],
        index: ["[",{body:sep1("expr",":")},"]"],
        //index: ["[",{body:or("slice","expr")},"]"],
        slice: [{start:opt("expr")},{end:"slicePart"},{step:opt("slicePart")}],
        slicePart: [":",{value:opt("expr")}],
        arg: [ {name:opt([{this:"symbol"},"="])}, {value:"expr"}],
        block: [":indent",{body:"stmtList"},"dedent"],
        elem: or("symbol","number","None","bool","listComprehension","array","dict","literal3","literal","paren","superCall"),
        superCall: ["super","(",")"],
        paren: ["(",{body:"exprList"},")"],
        bool: or("True","False"),
        indent: tk("indent"),
        dedent: tk("dedent"),
        nodent: tk("nodent"),
        symOrResv: or(...reserved.concat(["symbol"])),
    };
    for (let k in tdef) {
        if (!k.match(/^\$/) && !gdef[k]) gdef[k]=tk(k);
    }
    for (let k of reserved) {
        if (!gdef[k]) gdef[k]=tk(k);
    }

    //console.log("gdef",gdef);
    g.def(gdef);
    //console.log("gdefed",g);
    g.Tokenizer=Tokenizer;
    g.parse=function (srcFile) {
        let src=srcFile.text();
        src=src.replace(/\s*$/,"\n");
        const t=new g.Tokenizer(src);
        let tks;
        try {
            tks=t.tokenize();
        }catch (er) {
            er.src=srcFile;
            //const e=new Error("字句エラー："+er.message+" "+srcFile.name());
            //e.noTrace=true;
            throw er;
        }
        //console.log("G.parse.T",tks);
        const s=P.TokensParser.parse(g.get("program"),tks);
        //console.log("G.Parse.res",s);
        if (!s.success) {
            var ert=tks[s.src.maxPos];
            //console.error("Err",s.src.maxPos,ert.row,ert.col);
            const e=new Error("文法エラー");//"："+srcFile.name()+":"+ert.row+":"+ert.col);//,ert.pos);//+ert.row+":"+ert.col);
            e.src=srcFile;
            e.pos=ert.pos;
            //e.noTrace=true;
            throw e;
        }
        return s.result[0];
    };
    //console.log(g.genVisitorTemplate());
    return g;
});

/*if (typeof define!=="function") {
	define=require("requirejs").define;
}*/
define('Visitor',["root"],function (root){
var Visitor = function (funcs) {
	var $={funcs:funcs, path:[]};
	$.visit=function (node) {
		try {
			$.path.push(node);
			if ($.debug) console.log("visit ",node.type, node.pos);
			var v=(node ? funcs[node.type] :null);
			if (v) return v.call($, node);
			else if ($.def) return $.def.call($,node);
		} finally {
			$.path.pop();
		}
	};
	$.replace=function (node) {
		if (!$.def) {
			$.def=function (node) {
				if (typeof node=="object"){
					for (var i in node) {
						if (node[i] && typeof node[i]=="object") {
							node[i]=$.visit(node[i]);
						}
					}
				}
				return node;
			};
		}
		return $.visit(node);
	};
	return $;
};
root.Visitor=Visitor;
return Visitor;
});

/*
コード生成中に使う補助ライブラリ．自分の処理しているクラス，メソッド，変数などの情報を保持する
使い方:
	c=context();
	c.enter({a:3, b:5}, function (c) {
		// この中では，c.a==3 ,  c.b==5
		console.log("a="+c.a+" b="+c.b);
		c.enter({b:6}, function (c) {
			// この中では，c.a==3 ,  c.b==6
			console.log("a="+c.a+" b="+c.b);
		});
		// c.a==3 ,  c.b==5  に戻る
		console.log("a="+c.a+" b="+c.b);

	});
*/
/*if (typeof define!=="function") {
	define=require("requirejs").define;
}*/
define('context',["root"],function (root) {
root.context=function () {
	var c={};
	c.ovrFunc=function (from , to) {
		to.parent=from;
		return to;
	};
	c.enter=enter;
	var builtins={};
	c.clear=function () {
		for (var k in c) {
			if (!builtins[k]) delete c[k];
		}
	};
	for (var k in c) { builtins[k]=true; }
	return c;
	function enter(val, act) {
		var sv={},k;
		for (k in val) {
			if (k.match(/^\$/)) {
				k=RegExp.rightContext;
				sv[k]=c[k];
				c[k]=c.ovrFunc(c[k], val[k]);
			} else {
				sv[k]=c[k];
				c[k]=val[k];
			}
		}
		var res=act(c);
		for (k in sv) {
			c[k]=sv[k];
		}
		return res;
	}
};
return root.context;
});

// !!DO NOT EDIT this file!!
// Edit www/js/build/python//PyLib.js Instead.
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* global self,global*/
define('PyLib',['require','exports','module'],function (require, exports, module) {
    //var PyX=require("./PyX.js");
    // same with root.js
    function getRoot() {
        if (typeof window !== "undefined") return window;
        if (typeof self !== "undefined") return self;
        if (typeof global !== "undefined") return global;
        return function () {
            return this;
        }();
    }
    var root = getRoot();
    //test!!
    var PL = {};
    PL.import = function (lib) {
        if (PL.import.libs[lib]) return PL.import.libs[lib];
        throw new Error("ライブラリ " + lib + " はインポートできません．(サーバで実行すると動作する可能性があります)");
    };
    // It seems to be old: add to PythonSemantics and create runtime/lib/python/py_***.js
    PL.import.libs = {
        random: {
            random: Math.random,
            randrange: function randrange() {
                return this.choice(PL.range.apply(PL, arguments));
            },
            randint: function randint(a, b) {
                return Math.floor(Math.random() * (b - a + 1)) + a;
            },
            shuffle: function shuffle(list) {
                for (var i = list.length - 1; i >= 0; i--) {
                    var e = list.splice(this.randint(i), 1);
                    list.push(e[0]);
                }
                return list;
            },
            sample: function sample(list) {
                return this.shuffle(list.slice());
            },
            choice: function choice(seq) {
                return seq[this.randint(0, seq.length - 1)];
            }
        },
        math: {
            fabs: Math.abs.bind(Math),
            ceil: Math.ceil.bind(Math),
            floor: Math.floor.bind(Math),
            sqrt: Math.sqrt.bind(Math)
        }
    };
    //PyX.install(PL);
    PL.lineBuf = "";
    PL.print = function () {
        var a = PL.parseArgs(arguments);
        console.log("print", arguments, a);
        var end = a.options.end != null ? a.options.end : "\n";
        var out = a.map(PL.str).join(" ") + end;
        PL.lineBuf += out;
        var lines = PL.lineBuf.split("\n");
        if (lines.length > 10) {
            PL.lineBuf = lines.slice(lines.length - 10).join("\n");
        }
        PL.STDOUT.append($("<span>").text(out));
    };
    PL.input = function (s) {
        if (s) PL.print(s, PL.Option({ end: "" }));
        var r = prompt(PL.lineBuf);
        PL.LoopChecker.reset();
        PL.print(r);
        return r;
    };
    PL.len = function (s) {
        return s.length;
    };
    PL.float = function (s) {
        return s - 0;
    };
    PL.int = function (s) {
        return parseInt(s - 0);
    };
    PL.list = function (iter) {
        var res = [];
        for (var x in iter) {
            res.push(x);
        }return res;
    };
    PL.listComprehension = function (elem, gen) {
        var res = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = gen[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var e = _step.value;
                res.push(elem(e));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return res;
    };
    PL.str = function (s) {
        //  s==false
        if (s != null && s.__str__) return s.__str__();
        return s + "";
    };
    PL.abs = function (s) {
        return Math.abs(s);
    };
    PL.min = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (args[0][Symbol.iterator]) {
            return Math.min.apply(Math, _toConsumableArray(Array.from(args[0])));
        }
        return Math.min.apply(Math, args);
    };
    PL.max = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        if (args[0][Symbol.iterator]) {
            return Math.max.apply(Math, _toConsumableArray(Array.from(args[0])));
        }
        return Math.max.apply(Math, args);
    };
    PL.open = function () {
        throw new Error("openを使うには，「サーバで実行」を選んでください．");
    };
    PL.quit = function (s) {
        PL.exit();
    };
    PL.exit = function (s) {
        var e = new Error("exit でプログラムが終了しました。");
        e.noTrace = true;
        throw e;
    };
    PL.type = function (s) {
        switch (typeof s === "undefined" ? "undefined" : _typeof(s)) {
            case "number":
                return Number;
            case "string":
                return String;
            case "function":
                return Function;
            case "boolean":
                return Boolean;
            default:
                //if (s && s.__getTypeName__) return s.__getTypeName__();
                if (s && s.__class__) return s.__class__;
                return "object";
        }
    };
    PL.isinstance = function (obj, klass) {
        var ocl = obj && obj.__class__;
        return !!ocl && (ocl === klass || PL.isinstance(Object.getPrototypeOf(ocl.prototype), klass));
    };
    PL.sorted = function (a) {
        return a.slice().sort();
    };
    PL.loop_start2 = function loop_start2() {
        //if (_global.parent) _global.parent.dialogClosed=false;
        PL.startTime = new Date().getTime();
    };
    PL.loop_chk2 = function loop_chk2() {
        if (root.parent && root.parent.dialogClosed) {
            var e = new Error("ダイアログが閉じられたので実行を停止しました");
            e.type = "dialogClosed";
            throw e;
        }
        var now = new Date().getTime();
        if (now - PL.startTime > 5000) {
            //console.log(_global.parent, _global.opener);
            var b = confirm("ループが５秒以上続いています。\n実行を停止するにはOKを押してください。");
            if (b) {
                throw new Error("実行を停止しました。");
            } else PL.loop_start2();
        }
    };

    PL.STDOUT = {
        append: function append(s) {
            console.log(s);
        }
    };
    if (typeof $ === "function") {
        $(function () {
            var c = $("#output");
            if (c.length > 0) {
                PL.STDOUT = c;
            }
        });
    }
    PL.Option = function (o) {
        if (!(this instanceof PL.Option)) return new PL.Option(o);
        for (var k in o) {
            this[k] = o[k];
        }
    };
    PL.parseArgs = function (a) {
        var res = Array.prototype.slice.call(a);
        if (res[res.length - 1] instanceof PL.Option) {
            res.options = res.pop();
        } else {
            res.options = {};
        }
        return res;
    };
    PL.parseArgs2 = function (arg, spec) {
        // spec: [{name:  , defval: }]
        arg = Array.prototype.slice.call(arg);
        var opt = null;
        if (arg[arg.length - 1] instanceof PL.Option) {
            opt = arg.pop();
        }
        var res = spec.map(function (s, i) {
            return i < arg.length ? arg[i] : opt && opt[s.name] !== undefined ? opt[s.name] : s.defval;
        });
        return res;
    };

    PL.opt = PL.Option;
    PL.range = function (b, e) {
        var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        if (e == null) {
            e = b;b = 0;
        }
        var res = [];
        for (; s > 0 && b < e || s < 0 && b > e; b += s) {
            res.push(b);
        }return res;
    };
    PL.wrap = function (v) {
        return v;
    };
    PL.class = function (parent, defs) {
        if (arguments.length < 2) {
            defs = parent;
            parent = PL.Object || Object;
        }
        var nw = defs.__new__ || function (cls) {
            var self = Object.create(cls.prototype, {});
            return self;
        };
        var _res;
        _res = function res() {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(_res);
            var self = nw.apply(null, a);
            if (self.__init__) self.__init__.apply(self, arguments);
            return self;
        };
        _res.prototype = Object.create(parent.prototype, {});
        var methodNames = [];
        function addMethod(k) {
            var m = defs[k];
            if (typeof m === "function") {
                /*res.prototype[k]=function () {
                    var a=Array.prototype.slice.call(arguments);
                    a.unshift(this);
                    return m.apply(this,a);
                }; ^ this cannot override in subclasses */
                Object.defineProperty(_res.prototype, k, {
                    value: function value() {
                        var a = Array.prototype.slice.call(arguments);
                        a.unshift(this);
                        return m.apply(this, a);
                    },
                    enumerable: false
                });
                methodNames.push(k);
            } else {
                _res.prototype[k] = m;
            }
        }
        _res.__name__ = defs.CLASSNAME;
        _res.prototype.constructor = _res;
        Object.defineProperty(_res.prototype, "__class__", {
            value: _res,
            enumerable: false
        });
        _res.__methodnames__ = methodNames;
        _res.__str__ = function () {
            return "<class '__main__." + _res.__name__ + "'>";
        };
        _res.__bases__ = PL.Tuple && PL.Tuple(parent ? [parent] : []);
        for (var k in defs) {
            if (defs.hasOwnProperty(k)) addMethod(k);
        }
        return _res;
    };
    PL.super = function (klass, self) {
        //console.log("klass,self, name",klass,self, klass.__name__);
        //console.log("klass.prototype.CLASSNAME",klass.prototype.CLASSNAME);
        if (!klass.__bases__) {
            console.log(klass);
            throw new Error("superclass of " + klass.prototype.CLASSNAME + " not found");
        }
        var superclass = klass.__bases__.elems[0];
        if (!superclass) {
            throw new Error("superclass of " + klass.prototype.CLASSNAME + " not found");
        }
        //console.log("superclass", superclass, superclass.__name__, klass.__methodnames__, superclass.__methodnames__);
        var superprot = superclass.prototype;
        if (superprot === klass.prototype) {
            console.log(self, self.CLASSNAME);
            console.log(klass, klass.prototype.CLASSNAME);
            console.log(superclass, superclass.prototype.CLASSNAME);
            console.log(superprot, superprot.CLASSNAME);
            throw new Error("SAME!");
        }
        //console.log("superprot",superprot.CLASSNAME);
        var res = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = klass.__methodnames__[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var meth = _step2.value;

                if (typeof superprot[meth] !== "function") continue;
                Object.defineProperty(res, meth, { value: superprot[meth].bind(self) });
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return res;
    };
    PL.Tuple = PL.class({
        __init__: function __init__(self, elems) {
            self.elems = elems;
            for (var i = 0; i < elems.length; i++) {
                self[i] = elems[i];
            }
        },
        toString: function toString(self) {
            return "(" + self.elems.join(", ") + ")";
        }
    });
    PL.Tuple.__bases__ = PL.Tuple([]);
    PL.Slice = PL.class({
        __init__: function __init__(self, start, end) {
            var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

            self.start = start;
            self.end = end;
            self.step = step;
        }
    });
    PL.invoke = function (self, name, args) {
        var m = self[name];
        if (typeof m === "function") return m.apply(self, args);
        return m.__call__.apply(m, args);
    };
    PL.Object = PL.class(Object, {
        __init__: function __init__() {}
    });
    PL.ops = {
        "+": "add",
        "-": "sub",
        "*": "mul",
        "/": "div",
        "//": "floordiv",
        "%": "mod",
        ">": "gt",
        "<": "lt",
        ">=": "ge",
        "<=": "le",
        "!=": "ne",
        "==": "eq",
        "**": "pow"
    };
    PL.iops = {};
    var k;
    for (k in PL.ops) {
        if (k.match(/=/)) continue;
        PL.iops[k + "="] = "i" + PL.ops[k];
    }
    function u(v) {
        return v;
    }

    PL.invalidOP = function (op, to) {
        throw new Error("Cannot do opration " + op + " to " + to);
    };

    PL.LoopChecker = {
        check: function check() {
            if (this.last) {
                var now = new Date().getTime();
                if (now - this.last > 5000) {
                    throw new Error("無限ループをストップしました");
                }
            }
        },
        reset: function reset() {
            this.last = new Date().getTime();
        }
    };
    //--- monkey patch

    PL.addMonkeyPatch = function (cl, methods) {
        var p = cl.prototype;
        for (var k in methods) {
            if (methods.hasOwnProperty(k)) addMethod(k);
        }
        function addMethod(k) {
            var m = methods[k];
            Object.defineProperty(p, k, {
                value: k === "__class__" ? m : function () {
                    var a = Array.prototype.slice.call(arguments);
                    a.unshift(this);
                    return m.apply(this, a);
                },
                enumerable: false
            });
        }
    };
    PL.addMonkeyPatch(Object, {
        __class__: Object,
        __getTypeName__: function __getTypeName__() {
            return "<class object>";
        },
        __call__: function __call__(self) {
            for (var _len3 = arguments.length, a = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                a[_key3 - 1] = arguments[_key3];
            }

            //var a=Array.prototype.slice.call(arguments,1);
            return self.apply(self, a);
        },
        //toString: function (self) {return self.value+"";},
        __str__: function __str__(self) {
            return self + "";
        },
        __add__: function __add__(self, other) {
            return self + u(other);
        },
        __sub__: function __sub__(self, other) {
            return self - u(other);
        },
        __mul__: function __mul__(self, other) {
            return self * u(other);
        },
        __div__: function __div__(self, other) {
            return self / u(other);
        },
        __floordiv__: function __floordiv__(self, other) {
            return Math.floor(self / u(other));
        },
        __mod__: function __mod__(self, other) {
            return self % u(other);
        },
        __gt__: function __gt__(self, other) {
            return self > u(other);
        },
        __lt__: function __lt__(self, other) {
            return self < u(other);
        },
        __ge__: function __ge__(self, other) {
            return self >= u(other);
        },
        __le__: function __le__(self, other) {
            return self <= u(other);
        },
        __eq__: function __eq__(self, other) {
            return self == u(other); /* Number wrapped */
        },
        __ne__: function __ne__(self, other) {
            return self != u(other); /* Number wrapped */
        },
        __pow__: function __pow__(self, other) {
            return Math.pow(self, u(other));
        },

        __iadd__: function __iadd__(self, other) {
            self = self.__add__(other);return self;
        },
        __isub__: function __isub__(self, other) {
            self = self.__sub__(other);return self;
        },
        __imul__: function __imul__(self, other) {
            self = self.__mul__(other);return self;
        },
        __idiv__: function __idiv__(self, other) {
            self = self.__div__(other);return self;
        },
        __ifloordiv__: function __ifloordiv__(self, other) {
            self = self.__floordiv__(other);return self;
        },
        __imod__: function __imod__(self, other) {
            self = self.__mod__(other);return self;
        },
        __ipow__: function __ipow__(self, other) {
            self = self.__pow__(other);return self;
        },

        __delattr__: function __delattr__(self, name) {
            delete self[name];
        },
        __getitem__: function __getitem__(self, key) {
            return self[key];
        },
        __setitem__: function __setitem__(self, key, value) {
            self[key] = value;
        }
        //____: function (self,other) { return selfother;},
    });
    PL.addMonkeyPatch(Number, {
        __class__: Number,
        __getTypeName__: function __getTypeName__() {
            return "<class number>";
        }
    });
    PL.addMonkeyPatch(String, {
        __class__: String,
        __getTypeName__: function __getTypeName__() {
            return "<class str>";
        },
        __mul__: function __mul__(self, other) {
            switch (typeof other === "undefined" ? "undefined" : _typeof(other)) {
                case "number":
                    var res = "";
                    for (; other; other--) {
                        res += self;
                    }return res;
                default:
                    PL.invalidOP("__mul__", other);
            }
        },
        __mod__: function __mod__(self, other) {
            var args = void 0;
            if (other instanceof Array) args = other;else if (other instanceof PL.Tuple) args = other.elems;else args = [other];
            return sprintfJS.apply(undefined, [self].concat(_toConsumableArray(args)));
        },
        __add__: function __add__(self, other) {
            if (typeof u(other) !== "string") {
                throw new Error("文字列に文字列以外の値を+で追加できません．str()関数を使って変換してください．");
            }
            return Object.prototype.__add__.call(self, other);
        },
        format: function format(self) {
            var str = self;
            var o = {};
            var i = 0;

            for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                args[_key4 - 1] = arguments[_key4];
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = args[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _a = _step3.value;

                    if (_a instanceof PL.Option) {
                        Object.assign(o, _a);
                    } else {
                        o[i + ""] = _a;
                    }
                    i++;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            i = 0;
            return str.replace(/{([0-9a-zA-Z_]*)}/g, function (_, name) {
                if (!name) {
                    return PL.str(o[i++]);
                } else {
                    return PL.str(o[name]);
                }
            });
        }
    });
    PL.addMonkeyPatch(Boolean, {
        __getTypeName__: function __getTypeName__() {
            return "<class boolean>";
        },
        __str__: function __str__(self) {
            //  self is wrapped. always trusy
            return self == true ? "True" : "False";
        }
    });
    PL.addMonkeyPatch(Function, {
        __getTypeName__: function __getTypeName__() {
            return "<class function>";
        }
    });
    var orig_sort = Array.prototype.sort;
    PL.addMonkeyPatch(Array, {
        __class__: PL.list,
        append: function append(self) {
            for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                args[_key5 - 1] = arguments[_key5];
            }

            return self.push.apply(self, args);
        },
        __add__: function __add__(self) {
            for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                args[_key6 - 1] = arguments[_key6];
            }

            return self.concat.apply(self, args);
        },
        __delattr__: function __delattr__(self, i) {
            self.splice(i, 1);
        },
        __str__: function __str__(self) {
            return "[" + self.join(", ") + "]";
        },

        __getitem__: function __getitem__(self, key) {
            if (key < 0) key = self.length + key;
            if (key >= self.length) throw new Error("Index " + key + " is out of range");
            return self[key];
        },
        __setitem__: function __setitem__(self, key, value) {
            if (key < 0) key = self.length + key;
            if (key >= self.length) throw new Error("Index " + key + " is out of range");
            self[key] = value;
        },
        copy: function copy(self) {
            return self.slice();
        },
        sorted: function sorted(self) {
            return self.slice().sort();
        },
        sort: function sort(self, comp) {
            comp = comp || function (a, b) {
                return a > b ? 1 : a < b ? -1 : 0;
            };
            if (comp instanceof PL.Option) {
                var key = comp.key;
                if (typeof key === "string") {
                    var ks = key;
                    key = function key(o) {
                        return o[ks];
                    };
                }
                if (typeof key === "function") {
                    var sorted = self.map(function (val, idx) {
                        return { val: val, idx: idx };
                    }).sort(function (a, b) {
                        var va = key(a.val);
                        var vb = key(b.val);
                        if (va > vb) return 1;else if (va < vb) return -1;else return a.idx - b.idx;
                    }).map(function (r) {
                        return r.val;
                    });
                    while (self.length) {
                        self.pop();
                    }while (sorted.length) {
                        self.push(sorted.shift());
                    }
                }
                if (comp.reverse) {
                    self.reverse();
                }
                return self;
            }
            return orig_sort.apply(self, [comp]);
        },
        __contains__: function __contains__() {}
    });

    //---
    PL.builtins = ["range", "input", "str", "int", "float", "len", "type", "quit", "exit", "sorted", "abs", "min", "max", "list", "isinstance", "fillRect", "setColor", "setTimeout", "clearRect", "clear"];
    root.PYLIB = PL;

    function sprintfJS() {
        //  input -> jsString  output->jsString
        // from http://d.hatena.ne.jp/uupaa/20080301/1204380616
        var rv = [],
            i = 0,
            v,
            width,
            precision,
            sign,
            idx,
            argv = arguments,
            next = 0;
        var unsign = function unsign(val) {
            return val >= 0 ? val : val % 0x100000000 + 0x100000000;
        };
        var getArg = function getArg() {
            if (!idx && next >= argv.length) throw new Error("printfの引数が足りません");
            return argv[idx ? idx - 1 : next++];
        };
        var parseInt2 = function parseInt2(arg) {
            var res = 0;
            if (arg && arg.IS_POINTER) {
                return arg.addr || 0;
            }
            switch (typeof arg === "undefined" ? "undefined" : _typeof(arg)) {
                case "number":
                    res = arg - 0;
                    break;
                case "boolean":
                    res = !!arg;
                    break;
            }
            return res;
        };
        var s = (getArg() + "     ").split(""); // add dummy 5 chars.

        for (; i < s.length - 5; ++i) {
            if (s[i] !== "%") {
                rv.push(s[i]);continue;
            }

            ++i;idx = 0;precision = undefined;

            // arg-index-specifier
            if (!isNaN(parseInt(s[i])) && s[i + 1] === "$") {
                idx = parseInt(s[i]);i += 2;
            }
            // sign-specifier
            // sign = (s[i] !== "#") ? false : ++i, true;
            if (s[i] !== "#") {
                sign = false;
            } else {
                ++i;sign = true;
            }
            // width-specifier
            width = isNaN(parseInt(s[i])) ? 0 : parseInt(s[i++]);
            // precision-specifier
            if (s[i] === "." && !isNaN(parseInt(s[i + 1]))) {
                precision = parseInt(s[i + 1]);i += 2;
            }

            switch (s[i]) {
                case "d":
                    v = parseInt2(getArg()).toString();break;
                case "u":
                    v = parseInt2(getArg());if (!isNaN(v)) {
                        v = unsign(v).toString();
                    }break;
                case "o":
                    v = parseInt2(getArg());if (!isNaN(v)) {
                        v = (sign ? "0" : "") + unsign(v).toString(8);
                    }break;
                case "x":
                    v = parseInt2(getArg());if (!isNaN(v)) {
                        v = (sign ? "0x" : "") + unsign(v).toString(16);
                    }break;
                case "X":
                    v = parseInt2(getArg());if (!isNaN(v)) {
                        v = (sign ? "0X" : "") + unsign(v).toString(16).toUpperCase();
                    }break;
                case "f":
                    v = parseFloat(getArg()).toFixed(precision || 6);break;
                case "c":
                    width = 0;v = getArg();v = typeof v === "number" ? String.fromCharCode(v) : NaN;break;
                case "s":
                    width = 0;v = getArg();if (precision) {
                        v = v.substring(0, precision);
                    }break;
                case "%":
                    width = 0;v = s[i];break;
                default:
                    width = 0;v = "%" + (width ? width.toString() : "") + s[i].toString();break;
            }
            if (isNaN(v)) {
                v = v.toString();
            }
            if (v.length < width) rv.push(" ".repeat(width - v.length), v);else rv.push(v);
        }
        var line = rv.join("");
        //console.log("ARGV",next,argv.length);
        //if (!idx && next<argv.length) _global.doNotification("printfの引数が多すぎます．");
        return line;
    }
    return PL;
});
//# sourceMappingURL=PyLib.js.map;
define('Annotation',['require','exports','module'],function (require,exports,module) {
    module.exports=class Annotation {
        constructor(debugSymbol) {
            this.map=new WeakMap();
            this.debugSymbol=debugSymbol;
        }
        value(target,value) {
            if (value) return this.put(target,value);
            return this.get(target);
        }
        put(target, value) {
            return Object.assign(this.get(target),value);
        }
        set(target, value) {
            return this.put(target,value);
        }
        get(target) {
            let v=this.map.get(target);
            if (!v) {
                v={};
                this.map.set(target,v);
                if (this.debugSymbol) target[this.debugSymbol]=v;
            }
            return v;
        }
    };
});

// MINIJAVA
define ('PythonSemantics',["Visitor","context","PyLib","Annotation"],
function (Visitor,context,PyLib,Annotation) {
const builtins=PyLib.builtins;//["print","range","int","str","float","input","len"];
builtins.push("open");
const importable={
    datetime:{server:true},
    random:{browser:true,server:true},
    math:{browser:true, server:true},
    //jp:true,
    //fs:{wrapper:true,server:true},
    re:{server:true},
    g:{browser:true},
    turtle:{browser:true},
    requests:{server:true},//SPECIAL
    json:{server:true},//SPECIAL
    sys:{wrapper:true,server:true},
    matplotlib:{wrapper:true,server:true},
    numpy:{wrapper:true,server:true},
    os:{wrapper:true,server:true},
    urllib:{wrapper:true,server:true},
};

//-----
class ScopeInfo {
    constructor(scope,name,kind,declarator) {
        this.scope=scope;
        this.name=name;
        this.kind=kind;
        this.declarator=declarator;
    }
}
const vdef={
    program: function (node) {
        this.preScanDefs(node.body);
        for (let b of node.body) {
            this.visit(b);
        }
    },
    importStmt: function (node) {
        const nameHead=node.name[0];
        this.checkImportable(nameHead);
        /*if (!importable[nameHead]) {
            this.error(nameHead+" はインポートできません",nameHead);
        }
        if (this.options.runAt && !importable[nameHead][this.options.runAt]) {
            let hint="．";
            //console.log("IMP",node);
            if (importable[nameHead].browser) hint="(「ブラウザで実行」するとインポートできます)．";
            if (importable[nameHead].server) hint="(「サーバで実行」するとインポートできます)．";
            this.error(nameHead+" はインポートできません"+hint,nameHead);
        }*/
        this.addScope(node.alias || nameHead,{kind:"module",vtype:importable[nameHead],node});
    },
    importStmt2: function (node) {
        for (let e of node.elements) this.visit(e);
    },
    importElement: function (node) {
        const nameHead=node.name[0];
        this.checkImportable(nameHead);
        this.addScope(node.alias || nameHead,{kind:"module",vtype:importable[nameHead],node});
    },
    fromImportStmt: function (node) {
        const nameHead=node.name[0];
        this.checkImportable(nameHead);
        for (let localName of node.localNames) {
            this.addScope(localName,{kind:"local",localName});
        }
    },
    classdef: function (node) {
        //console.log("classDef",node);
        if (node.extends) {
            this.visit(node.extends.super);
        }
        for (let b of node.body) {
            this.visit(b);
        }
        this.addScope(node.name , {kind:"class",node});
    },
    define: function (node) {
        //console.log("define",node);
        //this.addScope(node.name,{kind:"function",node});
        this.newScope(()=>{
            for (let p of node.params.body) {
                this.addScope(p+"",{kind:"local",node:p});
            }
            this.preScanDefs(node.body);
            for (let b of node.body) {
                this.visit(b);
            }
        });
    },
    exprStmt: function (node) {
        this.visit(node.expr);
    },
    globalStmt: function (node) {
        for (let name of node.names) {
            this.addScope(name+"",{kind:"global",node:name});
        }
    },
    letStmt: function (node) {
        /*var v=this;
        function procLElem(node) {
            switch (node.type) {
                case "symbol":
                procSym(node);
                break;
                case "lvalList":
                for (let sym of node.body) {
                    procLElem(sym);
                }
                break;
                default:
                v.visit(node);
            }
        }
        function procSym(sym) {
            const info=v.getScope(sym+"");
            if (info && info.kind==="global") {

            } else if (!info || info.scope!==v.curScope()) {
                v.addScope(sym+"",{kind:"local",node});
                v.anon.put(node,{needVar:true});
            }
        }
        procLElem(node.left);*/
        this.procLeft(node);
        this.visit(node.right);
    },
    ifStmt: function (node) {
        //console.log("ifStmt", node);
        this.visit(node.cond);
        this.visit(node.then);
        for (let e of node.elif) this.visit(e);
        if (node.else) this.visit(node.else);
    },
    whileStmt: function (node) {
        //console.log("ifStmt", node);
        this.visit(node.cond);
        this.visit(node.do);
    },
    elifPart: function (node) {
        this.visit(node.cond);
        this.visit(node.then);
    },
    elsePart: function (node) {
        this.visit(node.then);
    },
    breakStmt: function (node) {

    },
    continueStmt: function (node) {

    },
    delStmt: function(node) {
        var a=expr=>{
            switch (expr.type) {
            case "postfix":
                switch (expr.op.type) {
                case "memberRef":
                    this.anon.put(node,{
                        obj: expr.left,
                        name: expr.op.name
                    });
                    return true;
                case "index":
                    this.anon.put(node,{
                        obj: expr.left,
                        index: expr.op.body
                    });
                    return true;
                }
                return false;
            case "paren":
                return a(expr.body);
            default:
                return false;
            }
        };
        if (!a(node.expr)) {
            this.error("del の後ろは「オブジェクト.属性名」という形式にしてください．"  , node);
        }
        this.visit(node.expr);
    },
    printStmt3: function (node) {
        for (let value of node.args.body) {
            this.visit(value);
        }
    },
    printStmt: function (node) {
        // print 3
        // print 3,5
        // print 3,
        // print (3),
        // print (3)
        // print (3,)
        // print (3,5)
        // print (3,)
        // print ((3,5)) #Tuple

        //this.visit(node.values); <- avoid to marked as Tuple
        let values;
        if (node.values.body.length===1 && node.values.body[0].type==="paren") {
            // print (3,5) -> node.values=exprList{body=[paren{body=[exprList{body=[3,5]}]}]}
            const paren=node.values.body[0];
            values=paren.body.body;
        } else {
            values=node.values.body;
        }
        for (let b of values) {
            this.visit(b);
        }
        this.anon.put(node,{values});
        if (node.values.t) {
            this.anon.put(node,{nobr:true});
        }
    },
    block: function (node) {
        for (let b of node.body) {
            this.visit(b);
        }
    },
    forStmt: function (node) {
        //console.log("forStmt", node);
        var loopVars=node.vars;
        this.visit(node.set);
        for(let loopVar of loopVars){
          this.addScope(loopVar,{kind:"local",node:loopVar});
        }
        this.visit(node.do);
        /*this.newScope(()=>{
            this.addScope(loopVar,{type:"local"});
            this.visit(node.do);
        });*/
    },
    listComprehension: function (node) {
        //console.log("forStmt", node);
        var loopVars=node.vars;
        this.visit(node.set);
        this.newScope(() => {
            for(let loopVar of loopVars){
                this.addScope(loopVar,{kind:"local",node:loopVar});
            }
            this.visit(node.elem);
        });
    },
    infixr: function(node) {
        // node.left node.op node.right
        this.visit(node.left);
        this.visit(node.op);
        this.visit(node.right);
    },
    infixl: function(node) {
        this.visit(node.left);
        this.visit(node.op);
        this.visit(node.right);
    },
    postfix: function (node) {
        this.visit(node.left);
        this.visit(node.op);
        /*if (node.op.type=="args") {

        }*/
    },
    prefix: function (node) {
        this.visit(node.op);
        this.visit(node.right);
    },
    args: function (node) {
        // node.arg
        //console.log("args", args);
        for (let b of node.body) {
            this.visit(b);
        }
    },
    exprList: function (node) {
        if (node.body.length>1 || node.t) {
            this.anon.put(node,{isTuple:true});
        }
        for (let b of node.body) {
            this.visit(b);
        }
    },
    array: function (node) {
        for (let b of node.body) {
            this.visit(b);
        }
    },
    dict: function (node) {
        for (let b of node.body) {
            this.visit(b);
        }
    },
    dictEntry: function (node) {
        this.visit(node.key);
        this.visit(node.value);
    },
    index: function (node) {
        for (let b of node.body) {
            this.visit(b);
        }
    },
    memberRef: function (node) {
        // node.name
        //console.log("memberRef", args);
    },
    "number": function (node) {
        // node.text

    },
    symbol: function (node) {
        var i=this.getScope(node+"");
        if (node+""==="input") {
            this.useInput=true;
        }
        if (!i) {
            console.log("symbol undef",node,this.curScope());
            this.error("変数または関数"+node+"は未定義です",node);
        }
        this.anon.put(node,{scopeInfo:i});
    },
    "arg": function (node) {
        //if (node.name) console.log(node.name);
        this.visit(node.value);
    },
    "literal": function (node) {

    },
    "literal3": function (node) {

    },
    "returnStmt": function (node) {
        this.visit(node.expr);
    },
    "paren": function (node) {
        this.visit(node.body);
    }
};
const thru=["nodent","in",">=","<=","==","!=","+=","-=","*=","/=","%=","**","//",
  ">","<","=",".",":","+","-","*","/","%","(",")",",","not","and","or","True","False","None",
  "passStmt","superCall"];
for (let t of thru) {
    vdef[t]=()=>{};
}
const Semantics= {
    check: function (node,options) {
        options=options||{};
        const v=Visitor(vdef);
        v.ctx=context();
        v.anon=new Annotation();
        v.options=options;
        v.def=function (node) {
            if (node==null) console.log("Semantics.check.def","NULL");
            else console.log("Semantics.check.def",node.type, node);
            throw new Error("Semantics handler unset: "+(node&&node.type));
        };
        v.enter=function (...args) {
            return this.ctx.enter(...args);
        };
        v.rootScope={};
        for (let b of builtins) {
            v.rootScope[b]=new ScopeInfo(v.rootScope,b,"function");
            v.rootScope[b].builtin=true;
        }
        v.newScope=function (f) {
            var pa=this.ctx.scope||this.rootScope;
            var ns=Object.create(pa);
            //ns.PARENT_SCOPE=pa;
            return this.enter({scope:ns},f);
        };
        v.addScope=function (name,info) {
            const cs=this.curScope();
            if (!info.node && name && name.type) {
                info.node=name;
            }
            cs[name+""]=new ScopeInfo(cs,name+"",info.kind, info.node) ;
            return cs[name+""];
        };
        v.getScope=function (name) {
            return this.curScope()[name];
        };
        v.curScope=function () {return this.ctx.scope;};
        v.error=function (mesg,node) {
            if (options.srcFile) mesg+=":"+options.srcFile.name();
            if (node.row && node.col) mesg+=":"+node.row+":"+node.col;
            var e=new Error(mesg);
            e.node=node;
            //e.noTrace=true;
            throw e;
        };
        v.checkImportable=function (nameHead) {
            //const nameHead=node.name[0];
            if (!importable[nameHead]) {
                this.error(nameHead+" はインポートできません",nameHead);
            }
            if (this.options.runAt && !importable[nameHead][this.options.runAt]) {
                let hint="．";
                //console.log("IMP",node);
                if (importable[nameHead].browser) hint="(「ブラウザで実行」するとインポートできます)．";
                if (importable[nameHead].server) hint="(「サーバで実行」するとインポートできます)．";
                this.error(nameHead+" はインポートできません"+hint,nameHead);
            }
        };
        v.preScanDefs=function (stmtList) {
            for (let node of stmtList) {
                if (node.type==="globalStmt") {
                    v.visit(node);
                }
                if (node.type==="classdef") {
                    this.addScope(node.name,{kind:"class",node});
                }
                if (node.type==="define") {
                    this.addScope(node.name,{kind:"function",node});
                }
                if (node.type==="letStmt") {
                    this.procLeft(node);
                }
            }
        };
        v.procLeft=function (letStmt) {
            const node=letStmt;
            var v=this;
            function procLElem(node) {
                switch (node.type) {
                    case "symbol":
                    procSym(node);
                    break;
                    case "lvalList":
                    for (let sym of node.body) {
                        procLElem(sym);
                    }
                    break;
                    default:
                    v.visit(node);
                }
            }
            function procSym(sym) {
                const info=v.getScope(sym+"");
                if (info && info.kind==="global") {
                } else if (!info || info.scope!==v.curScope()) {
                    v.addScope(sym+"",{kind:"local",node});
                    v.anon.put(node,{needVar:true});
                }
            }
            procLElem(node.left);
        };
        v.newScope(()=>v.visit(node));
        return v;
    },
    importable
};
return Semantics;
});

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("source-map",[], factory);
	else if(typeof exports === 'object')
		exports["sourceMap"] = factory();
	else
		root["sourceMap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	* Copyright 2009-2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE.txt or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/
	exports.SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
	exports.SourceMapConsumer = __webpack_require__(7).SourceMapConsumer;
	exports.SourceNode = __webpack_require__(10).SourceNode;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var base64VLQ = __webpack_require__(2);
	var util = __webpack_require__(4);
	var ArraySet = __webpack_require__(5).ArraySet;
	var MappingList = __webpack_require__(6).MappingList;

	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) {
		aArgs = {};
		}
		this._file = util.getArg(aArgs, 'file', null);
		this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
		this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}

	SourceMapGenerator.prototype._version = 3;

	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap =
		function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator({
			file: aSourceMapConsumer.file,
			sourceRoot: sourceRoot
		});
		aSourceMapConsumer.eachMapping(function (mapping) {
			var newMapping = {
			generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			}
			};

			if (mapping.source != null) {
			newMapping.source = mapping.source;
			if (sourceRoot != null) {
				newMapping.source = util.relative(sourceRoot, newMapping.source);
			}

			newMapping.original = {
				line: mapping.originalLine,
				column: mapping.originalColumn
			};

			if (mapping.name != null) {
				newMapping.name = mapping.name;
			}
			}

			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			generator.setSourceContent(sourceFile, content);
			}
		});
		return generator;
		};

	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping =
		function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, 'generated');
		var original = util.getArg(aArgs, 'original', null);
		var source = util.getArg(aArgs, 'source', null);
		var name = util.getArg(aArgs, 'name', null);

		if (!this._skipValidation) {
			this._validateMapping(generated, original, source, name);
		}

		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) {
			this._sources.add(source);
			}
		}

		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) {
			this._names.add(name);
			}
		}

		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source: source,
			name: name
		});
		};

	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent =
		function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) {
			source = util.relative(this._sourceRoot, source);
		}

		if (aSourceContent != null) {
			// Add the source content to the _sourcesContents map.
			// Create a new _sourcesContents map if the property is null.
			if (!this._sourcesContents) {
			this._sourcesContents = Object.create(null);
			}
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			// Remove the source file from the _sourcesContents map.
			// If the _sourcesContents map is empty, set the property to null.
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) {
			this._sourcesContents = null;
			}
		}
		};

	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap =
		function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		// If aSourceFile is omitted, we will use the file property of the SourceMap
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) {
			throw new Error(
				'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
				'or the source map\'s "file" property. Both were omitted.'
			);
			}
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		// Make "sourceFile" relative if an absolute Url is passed.
		if (sourceRoot != null) {
			sourceFile = util.relative(sourceRoot, sourceFile);
		}
		// Applying the SourceMap can add and remove items from the sources and
		// the names array.
		var newSources = new ArraySet();
		var newNames = new ArraySet();

		// Find mappings for the "sourceFile"
		this._mappings.unsortedForEach(function (mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
			// Check if it can be mapped by the source map, then update the mapping.
			var original = aSourceMapConsumer.originalPositionFor({
				line: mapping.originalLine,
				column: mapping.originalColumn
			});
			if (original.source != null) {
				// Copy mapping
				mapping.source = original.source;
				if (aSourceMapPath != null) {
				mapping.source = util.join(aSourceMapPath, mapping.source)
				}
				if (sourceRoot != null) {
				mapping.source = util.relative(sourceRoot, mapping.source);
				}
				mapping.originalLine = original.line;
				mapping.originalColumn = original.column;
				if (original.name != null) {
				mapping.name = original.name;
				}
			}
			}

			var source = mapping.source;
			if (source != null && !newSources.has(source)) {
			newSources.add(source);
			}

			var name = mapping.name;
			if (name != null && !newNames.has(name)) {
			newNames.add(name);
			}

		}, this);
		this._sources = newSources;
		this._names = newNames;

		// Copy sourcesContents of applied map.
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			if (aSourceMapPath != null) {
				sourceFile = util.join(aSourceMapPath, sourceFile);
			}
			if (sourceRoot != null) {
				sourceFile = util.relative(sourceRoot, sourceFile);
			}
			this.setSourceContent(sourceFile, content);
			}
		}, this);
		};

	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping =
		function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
													aName) {
		if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
			&& aGenerated.line > 0 && aGenerated.column >= 0
			&& !aOriginal && !aSource && !aName) {
			// Case 1.
			return;
		}
		else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
				&& aOriginal && 'line' in aOriginal && 'column' in aOriginal
				&& aGenerated.line > 0 && aGenerated.column >= 0
				&& aOriginal.line > 0 && aOriginal.column >= 0
				&& aSource) {
			// Cases 2 and 3.
			return;
		}
		else {
			throw new Error('Invalid mapping: ' + JSON.stringify({
			generated: aGenerated,
			source: aSource,
			original: aOriginal,
			name: aName
			}));
		}
		};

	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings =
		function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = '';
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;

		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = ''

			if (mapping.generatedLine !== previousGeneratedLine) {
			previousGeneratedColumn = 0;
			while (mapping.generatedLine !== previousGeneratedLine) {
				next += ';';
				previousGeneratedLine++;
			}
			}
			else {
			if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
				continue;
				}
				next += ',';
			}
			}

			next += base64VLQ.encode(mapping.generatedColumn
									- previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;

			if (mapping.source != null) {
			sourceIdx = this._sources.indexOf(mapping.source);
			next += base64VLQ.encode(sourceIdx - previousSource);
			previousSource = sourceIdx;

			// lines are stored 0-based in SourceMap spec version 3
			next += base64VLQ.encode(mapping.originalLine - 1
										- previousOriginalLine);
			previousOriginalLine = mapping.originalLine - 1;

			next += base64VLQ.encode(mapping.originalColumn
										- previousOriginalColumn);
			previousOriginalColumn = mapping.originalColumn;

			if (mapping.name != null) {
				nameIdx = this._names.indexOf(mapping.name);
				next += base64VLQ.encode(nameIdx - previousName);
				previousName = nameIdx;
			}
			}

			result += next;
		}

		return result;
		};

	SourceMapGenerator.prototype._generateSourcesContent =
		function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function (source) {
			if (!this._sourcesContents) {
			return null;
			}
			if (aSourceRoot != null) {
			source = util.relative(aSourceRoot, source);
			}
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
			? this._sourcesContents[key]
			: null;
		}, this);
		};

	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON =
		function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) {
			map.file = this._file;
		}
		if (this._sourceRoot != null) {
			map.sourceRoot = this._sourceRoot;
		}
		if (this._sourcesContents) {
			map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		}

		return map;
		};

	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString =
		function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
		};

	exports.SourceMapGenerator = SourceMapGenerator;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*
	* Based on the Base 64 VLQ implementation in Closure Compiler:
	* https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	*
	* Copyright 2011 The Closure Compiler Authors. All rights reserved.
	* Redistribution and use in source and binary forms, with or without
	* modification, are permitted provided that the following conditions are
	* met:
	*
	*  * Redistributions of source code must retain the above copyright
	*    notice, this list of conditions and the following disclaimer.
	*  * Redistributions in binary form must reproduce the above
	*    copyright notice, this list of conditions and the following
	*    disclaimer in the documentation and/or other materials provided
	*    with the distribution.
	*  * Neither the name of Google Inc. nor the names of its
	*    contributors may be used to endorse or promote products derived
	*    from this software without specific prior written permission.
	*
	* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	var base64 = __webpack_require__(3);

	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	var VLQ_BASE_SHIFT = 5;

	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0
		? ((-aValue) << 1) + 1
		: (aValue << 1) + 0;
	}

	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative
		? -shifted
		: shifted;
	}

	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;

		var vlq = toVLQSigned(aValue);

		do {
		digit = vlq & VLQ_BASE_MASK;
		vlq >>>= VLQ_BASE_SHIFT;
		if (vlq > 0) {
			// There are still more digits in this value, so we must make sure the
			// continuation bit is marked.
			digit |= VLQ_CONTINUATION_BIT;
		}
		encoded += base64.encode(digit);
		} while (vlq > 0);

		return encoded;
	};

	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;

		do {
		if (aIndex >= strLen) {
			throw new Error("Expected more digits in base 64 VLQ value.");
		}

		digit = base64.decode(aStr.charCodeAt(aIndex++));
		if (digit === -1) {
			throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
		}

		continuation = !!(digit & VLQ_CONTINUATION_BIT);
		digit &= VLQ_BASE_MASK;
		result = result + (digit << shift);
		shift += VLQ_BASE_SHIFT;
		} while (continuation);

		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function (number) {
		if (0 <= number && number < intToCharMap.length) {
		return intToCharMap[number];
		}
		throw new TypeError("Must be between 0 and 63: " + number);
	};

	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function (charCode) {
		var bigA = 65;     // 'A'
		var bigZ = 90;     // 'Z'

		var littleA = 97;  // 'a'
		var littleZ = 122; // 'z'

		var zero = 48;     // '0'
		var nine = 57;     // '9'

		var plus = 43;     // '+'
		var slash = 47;    // '/'

		var littleOffset = 26;
		var numberOffset = 52;

		// 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
		if (bigA <= charCode && charCode <= bigZ) {
		return (charCode - bigA);
		}

		// 26 - 51: abcdefghijklmnopqrstuvwxyz
		if (littleA <= charCode && charCode <= littleZ) {
		return (charCode - littleA + littleOffset);
		}

		// 52 - 61: 0123456789
		if (zero <= charCode && charCode <= nine) {
		return (charCode - zero + numberOffset);
		}

		// 62: +
		if (charCode == plus) {
		return 62;
		}

		// 63: /
		if (charCode == slash) {
		return 63;
		}

		// Invalid base64 digit.
		return -1;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) {
		return aArgs[aName];
		} else if (arguments.length === 3) {
		return aDefaultValue;
		} else {
		throw new Error('"' + aName + '" is a required argument.');
		}
	}
	exports.getArg = getArg;

	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) {
		return null;
		}
		return {
		scheme: match[1],
		auth: match[2],
		host: match[3],
		port: match[4],
		path: match[5]
		};
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
		var url = '';
		if (aParsedUrl.scheme) {
		url += aParsedUrl.scheme + ':';
		}
		url += '//';
		if (aParsedUrl.auth) {
		url += aParsedUrl.auth + '@';
		}
		if (aParsedUrl.host) {
		url += aParsedUrl.host;
		}
		if (aParsedUrl.port) {
		url += ":" + aParsedUrl.port
		}
		if (aParsedUrl.path) {
		url += aParsedUrl.path;
		}
		return url;
	}
	exports.urlGenerate = urlGenerate;

	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consequtive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
		if (!url.path) {
			return aPath;
		}
		path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);

		var parts = path.split(/\/+/);
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
		part = parts[i];
		if (part === '.') {
			parts.splice(i, 1);
		} else if (part === '..') {
			up++;
		} else if (up > 0) {
			if (part === '') {
			// The first part is blank if the path is absolute. Trying to go
			// above the root is a no-op. Therefore we can remove all '..' parts
			// directly after the root.
			parts.splice(i + 1, up);
			up = 0;
			} else {
			parts.splice(i, 2);
			up--;
			}
		}
		}
		path = parts.join('/');

		if (path === '') {
		path = isAbsolute ? '/' : '.';
		}

		if (url) {
		url.path = path;
		return urlGenerate(url);
		}
		return path;
	}
	exports.normalize = normalize;

	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") {
		aRoot = ".";
		}
		if (aPath === "") {
		aPath = ".";
		}
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) {
		aRoot = aRootUrl.path || '/';
		}

		// `join(foo, '//www.example.org')`
		if (aPathUrl && !aPathUrl.scheme) {
		if (aRootUrl) {
			aPathUrl.scheme = aRootUrl.scheme;
		}
		return urlGenerate(aPathUrl);
		}

		if (aPathUrl || aPath.match(dataUrlRegexp)) {
		return aPath;
		}

		// `join('http://', 'www.example.com')`
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
		aRootUrl.host = aPath;
		return urlGenerate(aRootUrl);
		}

		var joined = aPath.charAt(0) === '/'
		? aPath
		: normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

		if (aRootUrl) {
		aRootUrl.path = joined;
		return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
		return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
	};

	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") {
		aRoot = ".";
		}

		aRoot = aRoot.replace(/\/$/, '');

		// It is possible for the path to be above the root. In this case, simply
		// checking whether the root is a prefix of the path won't work. Instead, we
		// need to remove components from the root one by one, until either we find
		// a prefix that fits, or we run out of components to remove.
		var level = 0;
		while (aPath.indexOf(aRoot + '/') !== 0) {
		var index = aRoot.lastIndexOf("/");
		if (index < 0) {
			return aPath;
		}

		// If the only part of the root that is left is the scheme (i.e. http://,
		// file:///, etc.), one or more slashes (/), or simply nothing at all, we
		// have exhausted all components, so the path is not relative to the root.
		aRoot = aRoot.slice(0, index);
		if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
			return aPath;
		}

		++level;
		}

		// Make sure we add a "../" for each component we removed from the root.
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;

	var supportsNullProto = (function () {
		var obj = Object.create(null);
		return !('__proto__' in obj);
	}());

	function identity (s) {
		return s;
	}

	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) {
		return '$' + aStr;
		}

		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
		if (isProtoString(aStr)) {
		return aStr.slice(1);
		}

		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
		if (!s) {
		return false;
		}

		var length = s.length;

		if (length < 9 /* "__proto__".length */) {
		return false;
		}

		if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
			s.charCodeAt(length - 2) !== 95  /* '_' */ ||
			s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
			s.charCodeAt(length - 4) !== 116 /* 't' */ ||
			s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
			s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
			s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
			s.charCodeAt(length - 8) !== 95  /* '_' */ ||
			s.charCodeAt(length - 9) !== 95  /* '_' */) {
		return false;
		}

		for (var i = length - 10; i >= 0; i--) {
		if (s.charCodeAt(i) !== 36 /* '$' */) {
			return false;
		}
		}

		return true;
	}

	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.source - mappingB.source;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		return mappingA.name - mappingB.name;
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) {
		return cmp;
		}

		cmp = mappingA.source - mappingB.source;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) {
		return cmp;
		}

		return mappingA.name - mappingB.name;
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) {
		return 0;
		}

		if (aStr1 > aStr2) {
		return 1;
		}

		return -1;
	}

	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) {
		return cmp;
		}

		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);
	var has = Object.prototype.hasOwnProperty;

	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = Object.create(null);
	}

	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) {
		set.add(aArray[i], aAllowDuplicates);
		}
		return set;
	};

	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return Object.getOwnPropertyNames(this._set).length;
	};

	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = util.toSetString(aStr);
		var isDuplicate = has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) {
		this._array.push(aStr);
		}
		if (!isDuplicate) {
		this._set[sStr] = idx;
		}
	};

	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		var sStr = util.toSetString(aStr);
		return has.call(this._set, sStr);
	};

	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		var sStr = util.toSetString(aStr);
		if (has.call(this._set, sStr)) {
		return this._set[sStr];
		}
		throw new Error('"' + aStr + '" is not in the set.');
	};

	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) {
		return this._array[aIdx];
		}
		throw new Error('No element indexed by ' + aIdx);
	};

	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};

	exports.ArraySet = ArraySet;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2014 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);

	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		// Optimized for most common case
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA ||
			util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}

	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		// Serves as infimum
		this._last = {generatedLine: -1, generatedColumn: 0};
	}

	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach =
		function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
		};

	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
		this._last = aMapping;
		this._array.push(aMapping);
		} else {
		this._sorted = false;
		this._array.push(aMapping);
		}
	};

	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
		this._array.sort(util.compareByGeneratedPositionsInflated);
		this._sorted = true;
		}
		return this._array;
	};

	exports.MappingList = MappingList;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);
	var binarySearch = __webpack_require__(8);
	var ArraySet = __webpack_require__(5).ArraySet;
	var base64VLQ = __webpack_require__(2);
	var quickSort = __webpack_require__(9).quickSort;

	function SourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		return sourceMap.sections != null
		? new IndexedSourceMapConsumer(sourceMap)
		: new BasicSourceMapConsumer(sourceMap);
	}

	SourceMapConsumer.fromSourceMap = function(aSourceMap) {
		return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
	}

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	SourceMapConsumer.prototype._version = 3;

	// `__generatedMappings` and `__originalMappings` are arrays that hold the
	// parsed mapping coordinates from the source map's "mappings" attribute. They
	// are lazily instantiated, accessed via the `_generatedMappings` and
	// `_originalMappings` getters respectively, and we only parse the mappings
	// and create these arrays once queried for a source location. We jump through
	// these hoops because there can be many thousands of mappings, and parsing
	// them is expensive, so we only want to do it if we must.
	//
	// Each object in the arrays is of the form:
	//
	//     {
	//       generatedLine: The line number in the generated code,
	//       generatedColumn: The column number in the generated code,
	//       source: The path to the original source file that generated this
	//               chunk of code,
	//       originalLine: The line number in the original source that
	//                     corresponds to this chunk of generated code,
	//       originalColumn: The column number in the original source that
	//                       corresponds to this chunk of generated code,
	//       name: The name of the original symbol which generated this chunk of
	//             code.
	//     }
	//
	// All properties except for `generatedLine` and `generatedColumn` can be
	// `null`.
	//
	// `_generatedMappings` is ordered by the generated positions.
	//
	// `_originalMappings` is ordered by the original positions.

	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
		get: function () {
		if (!this.__generatedMappings) {
			this._parseMappings(this._mappings, this.sourceRoot);
		}

		return this.__generatedMappings;
		}
	});

	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
		get: function () {
		if (!this.__originalMappings) {
			this._parseMappings(this._mappings, this.sourceRoot);
		}

		return this.__originalMappings;
		}
	});

	SourceMapConsumer.prototype._charIsMappingSeparator =
		function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		var c = aStr.charAt(index);
		return c === ";" || c === ",";
		};

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	SourceMapConsumer.prototype._parseMappings =
		function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		throw new Error("Subclasses must implement _parseMappings");
		};

	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;

	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

	/**
	* Iterate over each mapping between an original source/line/column and a
	* generated line/column in this source map.
	*
	* @param Function aCallback
	*        The function that is called with each mapping.
	* @param Object aContext
	*        Optional. If specified, this object will be the value of `this` every
	*        time that `aCallback` is called.
	* @param aOrder
	*        Either `SourceMapConsumer.GENERATED_ORDER` or
	*        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	*        iterate over the mappings sorted by the generated file's line/column
	*        order or the original's source/line/column order, respectively. Defaults to
	*        `SourceMapConsumer.GENERATED_ORDER`.
	*/
	SourceMapConsumer.prototype.eachMapping =
		function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		var context = aContext || null;
		var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

		var mappings;
		switch (order) {
		case SourceMapConsumer.GENERATED_ORDER:
			mappings = this._generatedMappings;
			break;
		case SourceMapConsumer.ORIGINAL_ORDER:
			mappings = this._originalMappings;
			break;
		default:
			throw new Error("Unknown order of iteration.");
		}

		var sourceRoot = this.sourceRoot;
		mappings.map(function (mapping) {
			var source = mapping.source === null ? null : this._sources.at(mapping.source);
			if (source != null && sourceRoot != null) {
			source = util.join(sourceRoot, source);
			}
			return {
			source: source,
			generatedLine: mapping.generatedLine,
			generatedColumn: mapping.generatedColumn,
			originalLine: mapping.originalLine,
			originalColumn: mapping.originalColumn,
			name: mapping.name === null ? null : this._names.at(mapping.name)
			};
		}, this).forEach(aCallback, context);
		};

	/**
	* Returns all generated line and column information for the original source,
	* line, and column provided. If no column is provided, returns all mappings
	* corresponding to a either the line we are searching for or the next
	* closest line that has any mappings. Otherwise, returns all mappings
	* corresponding to the given line and either the column we are searching for
	* or the next closest column that has any offsets.
	*
	* The only argument is an object with the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: Optional. the column number in the original source.
	*
	* and an array of objects is returned, each with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	SourceMapConsumer.prototype.allGeneratedPositionsFor =
		function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		var line = util.getArg(aArgs, 'line');

		// When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
		// returns the index of the closest mapping less than the needle. By
		// setting needle.originalColumn to 0, we thus find the last mapping for
		// the given line, provided such a mapping exists.
		var needle = {
			source: util.getArg(aArgs, 'source'),
			originalLine: line,
			originalColumn: util.getArg(aArgs, 'column', 0)
		};

		if (this.sourceRoot != null) {
			needle.source = util.relative(this.sourceRoot, needle.source);
		}
		if (!this._sources.has(needle.source)) {
			return [];
		}
		needle.source = this._sources.indexOf(needle.source);

		var mappings = [];

		var index = this._findMapping(needle,
										this._originalMappings,
										"originalLine",
										"originalColumn",
										util.compareByOriginalPositions,
										binarySearch.LEAST_UPPER_BOUND);
		if (index >= 0) {
			var mapping = this._originalMappings[index];

			if (aArgs.column === undefined) {
			var originalLine = mapping.originalLine;

			// Iterate until either we run out of mappings, or we run into
			// a mapping for a different line than the one we found. Since
			// mappings are sorted, this is guaranteed to find all mappings for
			// the line we found.
			while (mapping && mapping.originalLine === originalLine) {
				mappings.push({
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
				});

				mapping = this._originalMappings[++index];
			}
			} else {
			var originalColumn = mapping.originalColumn;

			// Iterate until either we run out of mappings, or we run into
			// a mapping for a different line than the one we were searching for.
			// Since mappings are sorted, this is guaranteed to find all mappings for
			// the line we are searching for.
			while (mapping &&
					mapping.originalLine === line &&
					mapping.originalColumn == originalColumn) {
				mappings.push({
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
				});

				mapping = this._originalMappings[++index];
			}
			}
		}

		return mappings;
		};

	exports.SourceMapConsumer = SourceMapConsumer;

	/**
	* A BasicSourceMapConsumer instance represents a parsed source map which we can
	* query for information about the original file positions by giving it a file
	* position in the generated source.
	*
	* The only parameter is the raw source map (either as a JSON string, or
	* already parsed to an object). According to the spec, source maps have the
	* following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - sources: An array of URLs to the original source files.
	*   - names: An array of identifiers which can be referrenced by individual mappings.
	*   - sourceRoot: Optional. The URL root from which all sources are relative.
	*   - sourcesContent: Optional. An array of contents of the original source files.
	*   - mappings: A string of base64 VLQs which contain the actual mappings.
	*   - file: Optional. The generated file this source map is associated with.
	*
	* Here is an example source map, taken from the source map spec[0]:
	*
	*     {
	*       version : 3,
	*       file: "out.js",
	*       sourceRoot : "",
	*       sources: ["foo.js", "bar.js"],
	*       names: ["src", "maps", "are", "fun"],
	*       mappings: "AA,AB;;ABCDE;"
	*     }
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	*/
	function BasicSourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		var version = util.getArg(sourceMap, 'version');
		var sources = util.getArg(sourceMap, 'sources');
		// Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
		// requires the array) to play nice here.
		var names = util.getArg(sourceMap, 'names', []);
		var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
		var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
		var mappings = util.getArg(sourceMap, 'mappings');
		var file = util.getArg(sourceMap, 'file', null);

		// Once again, Sass deviates from the spec and supplies the version as a
		// string rather than a number, so we use loose equality checking here.
		if (version != this._version) {
		throw new Error('Unsupported version: ' + version);
		}

		sources = sources
		.map(String)
		// Some source maps produce relative source paths like "./foo.js" instead of
		// "foo.js".  Normalize these first so that future comparisons will succeed.
		// See bugzil.la/1090768.
		.map(util.normalize)
		// Always ensure that absolute sources are internally stored relative to
		// the source root, if the source root is absolute. Not doing this would
		// be particularly problematic when the source root is a prefix of the
		// source (valid, but why??). See github issue #199 and bugzil.la/1188982.
		.map(function (source) {
			return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
			? util.relative(sourceRoot, source)
			: source;
		});

		// Pass `true` below to allow duplicate names and sources. While source maps
		// are intended to be compressed and deduplicated, the TypeScript compiler
		// sometimes generates source maps with duplicates in them. See Github issue
		// #72 and bugzil.la/889492.
		this._names = ArraySet.fromArray(names.map(String), true);
		this._sources = ArraySet.fromArray(sources, true);

		this.sourceRoot = sourceRoot;
		this.sourcesContent = sourcesContent;
		this._mappings = mappings;
		this.file = file;
	}

	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

	/**
	* Create a BasicSourceMapConsumer from a SourceMapGenerator.
	*
	* @param SourceMapGenerator aSourceMap
	*        The source map that will be consumed.
	* @returns BasicSourceMapConsumer
	*/
	BasicSourceMapConsumer.fromSourceMap =
		function SourceMapConsumer_fromSourceMap(aSourceMap) {
		var smc = Object.create(BasicSourceMapConsumer.prototype);

		var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		smc.sourceRoot = aSourceMap._sourceRoot;
		smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
																smc.sourceRoot);
		smc.file = aSourceMap._file;

		// Because we are modifying the entries (by converting string sources and
		// names to indices into the sources and names ArraySets), we have to make
		// a copy of the entry or else bad things happen. Shared mutable state
		// strikes again! See github issue #191.

		var generatedMappings = aSourceMap._mappings.toArray().slice();
		var destGeneratedMappings = smc.__generatedMappings = [];
		var destOriginalMappings = smc.__originalMappings = [];

		for (var i = 0, length = generatedMappings.length; i < length; i++) {
			var srcMapping = generatedMappings[i];
			var destMapping = new Mapping;
			destMapping.generatedLine = srcMapping.generatedLine;
			destMapping.generatedColumn = srcMapping.generatedColumn;

			if (srcMapping.source) {
			destMapping.source = sources.indexOf(srcMapping.source);
			destMapping.originalLine = srcMapping.originalLine;
			destMapping.originalColumn = srcMapping.originalColumn;

			if (srcMapping.name) {
				destMapping.name = names.indexOf(srcMapping.name);
			}

			destOriginalMappings.push(destMapping);
			}

			destGeneratedMappings.push(destMapping);
		}

		quickSort(smc.__originalMappings, util.compareByOriginalPositions);

		return smc;
		};

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	BasicSourceMapConsumer.prototype._version = 3;

	/**
	* The list of original sources.
	*/
	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
		get: function () {
		return this._sources.toArray().map(function (s) {
			return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
		}, this);
		}
	});

	/**
	* Provide the JIT with a nice shape / hidden class.
	*/
	function Mapping() {
		this.generatedLine = 0;
		this.generatedColumn = 0;
		this.source = null;
		this.originalLine = null;
		this.originalColumn = null;
		this.name = null;
	}

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	BasicSourceMapConsumer.prototype._parseMappings =
		function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		var generatedLine = 1;
		var previousGeneratedColumn = 0;
		var previousOriginalLine = 0;
		var previousOriginalColumn = 0;
		var previousSource = 0;
		var previousName = 0;
		var length = aStr.length;
		var index = 0;
		var cachedSegments = {};
		var temp = {};
		var originalMappings = [];
		var generatedMappings = [];
		var mapping, str, segment, end, value;

		while (index < length) {
			if (aStr.charAt(index) === ';') {
			generatedLine++;
			index++;
			previousGeneratedColumn = 0;
			}
			else if (aStr.charAt(index) === ',') {
			index++;
			}
			else {
			mapping = new Mapping();
			mapping.generatedLine = generatedLine;

			// Because each offset is encoded relative to the previous one,
			// many segments often have the same encoding. We can exploit this
			// fact by caching the parsed variable length fields of each segment,
			// allowing us to avoid a second parse if we encounter the same
			// segment again.
			for (end = index; end < length; end++) {
				if (this._charIsMappingSeparator(aStr, end)) {
				break;
				}
			}
			str = aStr.slice(index, end);

			segment = cachedSegments[str];
			if (segment) {
				index += str.length;
			} else {
				segment = [];
				while (index < end) {
				base64VLQ.decode(aStr, index, temp);
				value = temp.value;
				index = temp.rest;
				segment.push(value);
				}

				if (segment.length === 2) {
				throw new Error('Found a source, but no line and column');
				}

				if (segment.length === 3) {
				throw new Error('Found a source and line, but no column');
				}

				cachedSegments[str] = segment;
			}

			// Generated column.
			mapping.generatedColumn = previousGeneratedColumn + segment[0];
			previousGeneratedColumn = mapping.generatedColumn;

			if (segment.length > 1) {
				// Original source.
				mapping.source = previousSource + segment[1];
				previousSource += segment[1];

				// Original line.
				mapping.originalLine = previousOriginalLine + segment[2];
				previousOriginalLine = mapping.originalLine;
				// Lines are stored 0-based
				mapping.originalLine += 1;

				// Original column.
				mapping.originalColumn = previousOriginalColumn + segment[3];
				previousOriginalColumn = mapping.originalColumn;

				if (segment.length > 4) {
				// Original name.
				mapping.name = previousName + segment[4];
				previousName += segment[4];
				}
			}

			generatedMappings.push(mapping);
			if (typeof mapping.originalLine === 'number') {
				originalMappings.push(mapping);
			}
			}
		}

		quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
		this.__generatedMappings = generatedMappings;

		quickSort(originalMappings, util.compareByOriginalPositions);
		this.__originalMappings = originalMappings;
		};

	/**
	* Find the mapping that best matches the hypothetical "needle" mapping that
	* we are searching for in the given "haystack" of mappings.
	*/
	BasicSourceMapConsumer.prototype._findMapping =
		function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
											aColumnName, aComparator, aBias) {
		// To return the position we are searching for, we must first find the
		// mapping for the given position and then return the opposite position it
		// points to. Because the mappings are sorted, we can use binary search to
		// find the best mapping.

		if (aNeedle[aLineName] <= 0) {
			throw new TypeError('Line must be greater than or equal to 1, got '
								+ aNeedle[aLineName]);
		}
		if (aNeedle[aColumnName] < 0) {
			throw new TypeError('Column must be greater than or equal to 0, got '
								+ aNeedle[aColumnName]);
		}

		return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
		};

	/**
	* Compute the last column for each generated mapping. The last column is
	* inclusive.
	*/
	BasicSourceMapConsumer.prototype.computeColumnSpans =
		function SourceMapConsumer_computeColumnSpans() {
		for (var index = 0; index < this._generatedMappings.length; ++index) {
			var mapping = this._generatedMappings[index];

			// Mappings do not contain a field for the last generated columnt. We
			// can come up with an optimistic estimate, however, by assuming that
			// mappings are contiguous (i.e. given two consecutive mappings, the
			// first mapping ends where the second one starts).
			if (index + 1 < this._generatedMappings.length) {
			var nextMapping = this._generatedMappings[index + 1];

			if (mapping.generatedLine === nextMapping.generatedLine) {
				mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
				continue;
			}
			}

			// The last mapping for each line spans the entire line.
			mapping.lastGeneratedColumn = Infinity;
		}
		};

	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.
	*   - column: The column number in the generated source.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.
	*   - column: The column number in the original source, or null.
	*   - name: The original identifier, or null.
	*/
	BasicSourceMapConsumer.prototype.originalPositionFor =
		function SourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, 'line'),
			generatedColumn: util.getArg(aArgs, 'column')
		};

		var index = this._findMapping(
			needle,
			this._generatedMappings,
			"generatedLine",
			"generatedColumn",
			util.compareByGeneratedPositionsDeflated,
			util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		);

		if (index >= 0) {
			var mapping = this._generatedMappings[index];

			if (mapping.generatedLine === needle.generatedLine) {
			var source = util.getArg(mapping, 'source', null);
			if (source !== null) {
				source = this._sources.at(source);
				if (this.sourceRoot != null) {
				source = util.join(this.sourceRoot, source);
				}
			}
			var name = util.getArg(mapping, 'name', null);
			if (name !== null) {
				name = this._names.at(name);
			}
			return {
				source: source,
				line: util.getArg(mapping, 'originalLine', null),
				column: util.getArg(mapping, 'originalColumn', null),
				name: name
			};
			}
		}

		return {
			source: null,
			line: null,
			column: null,
			name: null
		};
		};

	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
		function BasicSourceMapConsumer_hasContentsOfAllSources() {
		if (!this.sourcesContent) {
			return false;
		}
		return this.sourcesContent.length >= this._sources.size() &&
			!this.sourcesContent.some(function (sc) { return sc == null; });
		};

	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	BasicSourceMapConsumer.prototype.sourceContentFor =
		function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		if (!this.sourcesContent) {
			return null;
		}

		if (this.sourceRoot != null) {
			aSource = util.relative(this.sourceRoot, aSource);
		}

		if (this._sources.has(aSource)) {
			return this.sourcesContent[this._sources.indexOf(aSource)];
		}

		var url;
		if (this.sourceRoot != null
			&& (url = util.urlParse(this.sourceRoot))) {
			// XXX: file:// URIs and absolute paths lead to unexpected behavior for
			// many users. We can help them out when they expect file:// URIs to
			// behave like it would if they were running a local HTTP server. See
			// https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
			var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
			if (url.scheme == "file"
				&& this._sources.has(fileUriAbsPath)) {
			return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
			}

			if ((!url.path || url.path == "/")
				&& this._sources.has("/" + aSource)) {
			return this.sourcesContent[this._sources.indexOf("/" + aSource)];
			}
		}

		// This function is used recursively from
		// IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
		// don't want to throw if we can't find the source - we just want to
		// return null, so we provide a flag to exit gracefully.
		if (nullOnMissing) {
			return null;
		}
		else {
			throw new Error('"' + aSource + '" is not in the SourceMap.');
		}
		};

	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: The column number in the original source.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	BasicSourceMapConsumer.prototype.generatedPositionFor =
		function SourceMapConsumer_generatedPositionFor(aArgs) {
		var source = util.getArg(aArgs, 'source');
		if (this.sourceRoot != null) {
			source = util.relative(this.sourceRoot, source);
		}
		if (!this._sources.has(source)) {
			return {
			line: null,
			column: null,
			lastColumn: null
			};
		}
		source = this._sources.indexOf(source);

		var needle = {
			source: source,
			originalLine: util.getArg(aArgs, 'line'),
			originalColumn: util.getArg(aArgs, 'column')
		};

		var index = this._findMapping(
			needle,
			this._originalMappings,
			"originalLine",
			"originalColumn",
			util.compareByOriginalPositions,
			util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		);

		if (index >= 0) {
			var mapping = this._originalMappings[index];

			if (mapping.source === needle.source) {
			return {
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
			};
			}
		}

		return {
			line: null,
			column: null,
			lastColumn: null
		};
		};

	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

	/**
	* An IndexedSourceMapConsumer instance represents a parsed source map which
	* we can query for information. It differs from BasicSourceMapConsumer in
	* that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	* input.
	*
	* The only parameter is a raw source map (either as a JSON string, or already
	* parsed to an object). According to the spec for indexed source maps, they
	* have the following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - file: Optional. The generated file this source map is associated with.
	*   - sections: A list of section definitions.
	*
	* Each value under the "sections" field has two fields:
	*   - offset: The offset into the original specified at which this section
	*       begins to apply, defined as an object with a "line" and "column"
	*       field.
	*   - map: A source map definition. This source map could also be indexed,
	*       but doesn't have to be.
	*
	* Instead of the "map" field, it's also possible to have a "url" field
	* specifying a URL to retrieve a source map from, but that's currently
	* unsupported.
	*
	* Here's an example source map, taken from the source map spec[0], but
	* modified to omit a section which uses the "url" field.
	*
	*  {
	*    version : 3,
	*    file: "app.js",
	*    sections: [{
	*      offset: {line:100, column:10},
	*      map: {
	*        version : 3,
	*        file: "section.js",
	*        sources: ["foo.js", "bar.js"],
	*        names: ["src", "maps", "are", "fun"],
	*        mappings: "AAAA,E;;ABCDE;"
	*      }
	*    }],
	*  }
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	*/
	function IndexedSourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		var version = util.getArg(sourceMap, 'version');
		var sections = util.getArg(sourceMap, 'sections');

		if (version != this._version) {
		throw new Error('Unsupported version: ' + version);
		}

		this._sources = new ArraySet();
		this._names = new ArraySet();

		var lastOffset = {
		line: -1,
		column: 0
		};
		this._sections = sections.map(function (s) {
		if (s.url) {
			// The url field will require support for asynchronicity.
			// See https://github.com/mozilla/source-map/issues/16
			throw new Error('Support for url field in sections not implemented.');
		}
		var offset = util.getArg(s, 'offset');
		var offsetLine = util.getArg(offset, 'line');
		var offsetColumn = util.getArg(offset, 'column');

		if (offsetLine < lastOffset.line ||
			(offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
			throw new Error('Section offsets must be ordered and non-overlapping.');
		}
		lastOffset = offset;

		return {
			generatedOffset: {
			// The offset fields are 0-based, but we use 1-based indices when
			// encoding/decoding from VLQ.
			generatedLine: offsetLine + 1,
			generatedColumn: offsetColumn + 1
			},
			consumer: new SourceMapConsumer(util.getArg(s, 'map'))
		}
		});
	}

	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	IndexedSourceMapConsumer.prototype._version = 3;

	/**
	* The list of original sources.
	*/
	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
		get: function () {
		var sources = [];
		for (var i = 0; i < this._sections.length; i++) {
			for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
			sources.push(this._sections[i].consumer.sources[j]);
			}
		}
		return sources;
		}
	});

	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.
	*   - column: The column number in the generated source.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.
	*   - column: The column number in the original source, or null.
	*   - name: The original identifier, or null.
	*/
	IndexedSourceMapConsumer.prototype.originalPositionFor =
		function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, 'line'),
			generatedColumn: util.getArg(aArgs, 'column')
		};

		// Find the section containing the generated position we're trying to map
		// to an original position.
		var sectionIndex = binarySearch.search(needle, this._sections,
			function(needle, section) {
			var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
			if (cmp) {
				return cmp;
			}

			return (needle.generatedColumn -
					section.generatedOffset.generatedColumn);
			});
		var section = this._sections[sectionIndex];

		if (!section) {
			return {
			source: null,
			line: null,
			column: null,
			name: null
			};
		}

		return section.consumer.originalPositionFor({
			line: needle.generatedLine -
			(section.generatedOffset.generatedLine - 1),
			column: needle.generatedColumn -
			(section.generatedOffset.generatedLine === needle.generatedLine
			? section.generatedOffset.generatedColumn - 1
			: 0),
			bias: aArgs.bias
		});
		};

	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
		function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		return this._sections.every(function (s) {
			return s.consumer.hasContentsOfAllSources();
		});
		};

	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	IndexedSourceMapConsumer.prototype.sourceContentFor =
		function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];

			var content = section.consumer.sourceContentFor(aSource, true);
			if (content) {
			return content;
			}
		}
		if (nullOnMissing) {
			return null;
		}
		else {
			throw new Error('"' + aSource + '" is not in the SourceMap.');
		}
		};

	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: The column number in the original source.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	IndexedSourceMapConsumer.prototype.generatedPositionFor =
		function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];

			// Only consider this section if the requested source is in the list of
			// sources of the consumer.
			if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
			continue;
			}
			var generatedPosition = section.consumer.generatedPositionFor(aArgs);
			if (generatedPosition) {
			var ret = {
				line: generatedPosition.line +
				(section.generatedOffset.generatedLine - 1),
				column: generatedPosition.column +
				(section.generatedOffset.generatedLine === generatedPosition.line
				? section.generatedOffset.generatedColumn - 1
				: 0)
			};
			return ret;
			}
		}

		return {
			line: null,
			column: null
		};
		};

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	IndexedSourceMapConsumer.prototype._parseMappings =
		function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		this.__generatedMappings = [];
		this.__originalMappings = [];
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			var sectionMappings = section.consumer._generatedMappings;
			for (var j = 0; j < sectionMappings.length; j++) {
			var mapping = sectionMappings[j];

			var source = section.consumer._sources.at(mapping.source);
			if (section.consumer.sourceRoot !== null) {
				source = util.join(section.consumer.sourceRoot, source);
			}
			this._sources.add(source);
			source = this._sources.indexOf(source);

			var name = section.consumer._names.at(mapping.name);
			this._names.add(name);
			name = this._names.indexOf(name);

			// The mappings coming from the consumer for the section have
			// generated positions relative to the start of the section, so we
			// need to offset them to be relative to the start of the concatenated
			// generated file.
			var adjustedMapping = {
				source: source,
				generatedLine: mapping.generatedLine +
				(section.generatedOffset.generatedLine - 1),
				generatedColumn: mapping.generatedColumn +
				(section.generatedOffset.generatedLine === mapping.generatedLine
				? section.generatedOffset.generatedColumn - 1
				: 0),
				originalLine: mapping.originalLine,
				originalColumn: mapping.originalColumn,
				name: name
			};

			this.__generatedMappings.push(adjustedMapping);
			if (typeof adjustedMapping.originalLine === 'number') {
				this.__originalMappings.push(adjustedMapping);
			}
			}
		}

		quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
		quickSort(this.__originalMappings, util.compareByOriginalPositions);
		};

	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;

	/**
	* Recursive implementation of binary search.
	*
	* @param aLow Indices here and lower do not contain the needle.
	* @param aHigh Indices here and higher do not contain the needle.
	* @param aNeedle The element being searched for.
	* @param aHaystack The non-empty array being searched.
	* @param aCompare Function which takes two elements and returns -1, 0, or 1.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*/
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		// This function terminates when one of the following is true:
		//
		//   1. We find the exact element we are looking for.
		//
		//   2. We did not find the exact element, but we can return the index of
		//      the next-closest element.
		//
		//   3. We did not find the exact element, and there is no next-closest
		//      element than the one we are searching for, so we return -1.
		var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		var cmp = aCompare(aNeedle, aHaystack[mid], true);
		if (cmp === 0) {
		// Found the element we are looking for.
		return mid;
		}
		else if (cmp > 0) {
		// Our needle is greater than aHaystack[mid].
		if (aHigh - mid > 1) {
			// The element is in the upper half.
			return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
		}

		// The exact needle element was not found in this haystack. Determine if
		// we are in termination case (3) or (2) and return the appropriate thing.
		if (aBias == exports.LEAST_UPPER_BOUND) {
			return aHigh < aHaystack.length ? aHigh : -1;
		} else {
			return mid;
		}
		}
		else {
		// Our needle is less than aHaystack[mid].
		if (mid - aLow > 1) {
			// The element is in the lower half.
			return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
		}

		// we are in termination case (3) or (2) and return the appropriate thing.
		if (aBias == exports.LEAST_UPPER_BOUND) {
			return mid;
		} else {
			return aLow < 0 ? -1 : aLow;
		}
		}
	}

	/**
	* This is an implementation of binary search which will always try and return
	* the index of the closest element if there is no exact hit. This is because
	* mappings between original and generated line/col pairs are single points,
	* and there is an implicit region between each of them, so a miss just means
	* that you aren't on the very start of a region.
	*
	* @param aNeedle The element you are looking for.
	* @param aHaystack The array that is being searched.
	* @param aCompare A function which takes the needle and an element in the
	*     array and returns -1, 0, or 1 depending on whether the needle is less
	*     than, equal to, or greater than the element, respectively.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	*/
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		if (aHaystack.length === 0) {
		return -1;
		}

		var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
									aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		if (index < 0) {
		return -1;
		}

		// We have found either the exact element, or the next-closest element than
		// the one we are searching for. However, there may be more than one such
		// element. Make sure we always return the smallest of these.
		while (index - 1 >= 0) {
		if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
			break;
		}
		--index;
		}

		return index;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	// It turns out that some (most?) JavaScript engines don't self-host
	// `Array.prototype.sort`. This makes sense because C++ will likely remain
	// faster than JS when doing raw CPU-intensive sorting. However, when using a
	// custom comparator function, calling back and forth between the VM's C++ and
	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
	// worse generated code for the comparator function than would be optimal. In
	// fact, when sorting with a comparator, these costs outweigh the benefits of
	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	// a ~3500ms mean speed-up in `bench/bench.html`.

	/**
	* Swap the elements indexed by `x` and `y` in the array `ary`.
	*
	* @param {Array} ary
	*        The array.
	* @param {Number} x
	*        The index of the first item.
	* @param {Number} y
	*        The index of the second item.
	*/
	function swap(ary, x, y) {
		var temp = ary[x];
		ary[x] = ary[y];
		ary[y] = temp;
	}

	/**
	* Returns a random integer within the range `low .. high` inclusive.
	*
	* @param {Number} low
	*        The lower bound on the range.
	* @param {Number} high
	*        The upper bound on the range.
	*/
	function randomIntInRange(low, high) {
		return Math.round(low + (Math.random() * (high - low)));
	}

	/**
	* The Quick Sort algorithm.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	* @param {Number} p
	*        Start index of the array
	* @param {Number} r
	*        End index of the array
	*/
	function doQuickSort(ary, comparator, p, r) {
		// If our lower bound is less than our upper bound, we (1) partition the
		// array into two pieces and (2) recurse on each half. If it is not, this is
		// the empty array and our base case.

		if (p < r) {
		// (1) Partitioning.
		//
		// The partitioning chooses a pivot between `p` and `r` and moves all
		// elements that are less than or equal to the pivot to the before it, and
		// all the elements that are greater than it after it. The effect is that
		// once partition is done, the pivot is in the exact place it will be when
		// the array is put in sorted order, and it will not need to be moved
		// again. This runs in O(n) time.

		// Always choose a random pivot so that an input array which is reverse
		// sorted does not cause O(n^2) running time.
		var pivotIndex = randomIntInRange(p, r);
		var i = p - 1;

		swap(ary, pivotIndex, r);
		var pivot = ary[r];

		// Immediately after `j` is incremented in this loop, the following hold
		// true:
		//
		//   * Every element in `ary[p .. i]` is less than or equal to the pivot.
		//
		//   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
		for (var j = p; j < r; j++) {
			if (comparator(ary[j], pivot) <= 0) {
			i += 1;
			swap(ary, i, j);
			}
		}

		swap(ary, i + 1, j);
		var q = i + 1;

		// (2) Recurse on each half.

		doQuickSort(ary, comparator, p, q - 1);
		doQuickSort(ary, comparator, q + 1, r);
		}
	}

	/**
	* Sort the given array in-place with the given comparator function.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	*/
	exports.quickSort = function (ary, comparator) {
		doQuickSort(ary, comparator, 0, ary.length - 1);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
	var util = __webpack_require__(4);

	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	var REGEX_NEWLINE = /(\r?\n)/;

	// Newline character code for charCodeAt() comparisons
	var NEWLINE_CODE = 10;

	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	var isSourceNode = "$$$isSourceNode$$$";

	/**
	* SourceNodes provide a way to abstract over interpolating/concatenating
	* snippets of generated JavaScript source code while maintaining the line and
	* column information associated with the original source code.
	*
	* @param aLine The original line number.
	* @param aColumn The original column number.
	* @param aSource The original source's filename.
	* @param aChunks Optional. An array of strings which are snippets of
	*        generated JS, or other SourceNodes.
	* @param aName The original identifier.
	*/
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		this.children = [];
		this.sourceContents = {};
		this.line = aLine == null ? null : aLine;
		this.column = aColumn == null ? null : aColumn;
		this.source = aSource == null ? null : aSource;
		this.name = aName == null ? null : aName;
		this[isSourceNode] = true;
		if (aChunks != null) this.add(aChunks);
	}

	/**
	* Creates a SourceNode from generated code and a SourceMapConsumer.
	*
	* @param aGeneratedCode The generated code
	* @param aSourceMapConsumer The SourceMap for the generated code
	* @param aRelativePath Optional. The path that relative sources in the
	*        SourceMapConsumer should be relative to.
	*/
	SourceNode.fromStringWithSourceMap =
		function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		// The SourceNode we want to fill with the generated code
		// and the SourceMap
		var node = new SourceNode();

		// All even indices of this array are one line of the generated code,
		// while all odd indices are the newlines between two adjacent lines
		// (since `REGEX_NEWLINE` captures its match).
		// Processed fragments are removed from this array, by calling `shiftNextLine`.
		var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		var shiftNextLine = function() {
			var lineContents = remainingLines.shift();
			// The last line of a file might not have a newline.
			var newLine = remainingLines.shift() || "";
			return lineContents + newLine;
		};

		// We need to remember the position of "remainingLines"
		var lastGeneratedLine = 1, lastGeneratedColumn = 0;

		// The generate SourceNodes we need a code range.
		// To extract it current and last mapping is used.
		// Here we store the last mapping.
		var lastMapping = null;

		aSourceMapConsumer.eachMapping(function (mapping) {
			if (lastMapping !== null) {
			// We add the code from "lastMapping" to "mapping":
			// First check if there is a new line in between.
			if (lastGeneratedLine < mapping.generatedLine) {
				// Associate first line with "lastMapping"
				addMappingWithCode(lastMapping, shiftNextLine());
				lastGeneratedLine++;
				lastGeneratedColumn = 0;
				// The remaining code is added without mapping
			} else {
				// There is no new line in between.
				// Associate the code between "lastGeneratedColumn" and
				// "mapping.generatedColumn" with "lastMapping"
				var nextLine = remainingLines[0];
				var code = nextLine.substr(0, mapping.generatedColumn -
											lastGeneratedColumn);
				remainingLines[0] = nextLine.substr(mapping.generatedColumn -
													lastGeneratedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
				addMappingWithCode(lastMapping, code);
				// No more remaining code, continue
				lastMapping = mapping;
				return;
			}
			}
			// We add the generated code until the first mapping
			// to the SourceNode without any mapping.
			// Each line is added as separate string.
			while (lastGeneratedLine < mapping.generatedLine) {
			node.add(shiftNextLine());
			lastGeneratedLine++;
			}
			if (lastGeneratedColumn < mapping.generatedColumn) {
			var nextLine = remainingLines[0];
			node.add(nextLine.substr(0, mapping.generatedColumn));
			remainingLines[0] = nextLine.substr(mapping.generatedColumn);
			lastGeneratedColumn = mapping.generatedColumn;
			}
			lastMapping = mapping;
		}, this);
		// We have processed all mappings.
		if (remainingLines.length > 0) {
			if (lastMapping) {
			// Associate the remaining code in the current line with "lastMapping"
			addMappingWithCode(lastMapping, shiftNextLine());
			}
			// and add the remaining lines without any mapping
			node.add(remainingLines.join(""));
		}

		// Copy sourcesContent into SourceNode
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			if (aRelativePath != null) {
				sourceFile = util.join(aRelativePath, sourceFile);
			}
			node.setSourceContent(sourceFile, content);
			}
		});

		return node;

		function addMappingWithCode(mapping, code) {
			if (mapping === null || mapping.source === undefined) {
			node.add(code);
			} else {
			var source = aRelativePath
				? util.join(aRelativePath, mapping.source)
				: mapping.source;
			node.add(new SourceNode(mapping.originalLine,
									mapping.originalColumn,
									source,
									code,
									mapping.name));
			}
		}
		};

	/**
	* Add a chunk of generated JS to this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
		if (Array.isArray(aChunk)) {
		aChunk.forEach(function (chunk) {
			this.add(chunk);
		}, this);
		}
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		if (aChunk) {
			this.children.push(aChunk);
		}
		}
		else {
		throw new TypeError(
			"Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		);
		}
		return this;
	};

	/**
	* Add a chunk of generated JS to the beginning of this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		if (Array.isArray(aChunk)) {
		for (var i = aChunk.length-1; i >= 0; i--) {
			this.prepend(aChunk[i]);
		}
		}
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		this.children.unshift(aChunk);
		}
		else {
		throw new TypeError(
			"Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		);
		}
		return this;
	};

	/**
	* Walk over the tree of JS snippets in this node and its children. The
	* walking function is called once for each snippet of JS and is passed that
	* snippet and the its original associated source's line/column location.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		var chunk;
		for (var i = 0, len = this.children.length; i < len; i++) {
		chunk = this.children[i];
		if (chunk[isSourceNode]) {
			chunk.walk(aFn);
		}
		else {
			if (chunk !== '') {
			aFn(chunk, { source: this.source,
						line: this.line,
						column: this.column,
						name: this.name });
			}
		}
		}
	};

	/**
	* Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	* each of `this.children`.
	*
	* @param aSep The separator.
	*/
	SourceNode.prototype.join = function SourceNode_join(aSep) {
		var newChildren;
		var i;
		var len = this.children.length;
		if (len > 0) {
		newChildren = [];
		for (i = 0; i < len-1; i++) {
			newChildren.push(this.children[i]);
			newChildren.push(aSep);
		}
		newChildren.push(this.children[i]);
		this.children = newChildren;
		}
		return this;
	};

	/**
	* Call String.prototype.replace on the very right-most source snippet. Useful
	* for trimming whitespace from the end of a source node, etc.
	*
	* @param aPattern The pattern to replace.
	* @param aReplacement The thing to replace the pattern with.
	*/
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		var lastChild = this.children[this.children.length - 1];
		if (lastChild[isSourceNode]) {
		lastChild.replaceRight(aPattern, aReplacement);
		}
		else if (typeof lastChild === 'string') {
		this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		}
		else {
		this.children.push(''.replace(aPattern, aReplacement));
		}
		return this;
	};

	/**
	* Set the source content for a source file. This will be added to the SourceMapGenerator
	* in the sourcesContent field.
	*
	* @param aSourceFile The filename of the source file
	* @param aSourceContent The content of the source file
	*/
	SourceNode.prototype.setSourceContent =
		function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
		};

	/**
	* Walk over the tree of SourceNodes. The walking function is called for each
	* source file content and is passed the filename and source content.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walkSourceContents =
		function SourceNode_walkSourceContents(aFn) {
		for (var i = 0, len = this.children.length; i < len; i++) {
			if (this.children[i][isSourceNode]) {
			this.children[i].walkSourceContents(aFn);
			}
		}

		var sources = Object.keys(this.sourceContents);
		for (var i = 0, len = sources.length; i < len; i++) {
			aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
		}
		};

	/**
	* Return the string representation of this source node. Walks over the tree
	* and concatenates all the various snippets together to one string.
	*/
	SourceNode.prototype.toString = function SourceNode_toString() {
		var str = "";
		this.walk(function (chunk) {
		str += chunk;
		});
		return str;
	};

	/**
	* Returns the string representation of this source node along with a source
	* map.
	*/
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		var generated = {
		code: "",
		line: 1,
		column: 0
		};
		var map = new SourceMapGenerator(aArgs);
		var sourceMappingActive = false;
		var lastOriginalSource = null;
		var lastOriginalLine = null;
		var lastOriginalColumn = null;
		var lastOriginalName = null;
		this.walk(function (chunk, original) {
		generated.code += chunk;
		if (original.source !== null
			&& original.line !== null
			&& original.column !== null) {
			if(lastOriginalSource !== original.source
			|| lastOriginalLine !== original.line
			|| lastOriginalColumn !== original.column
			|| lastOriginalName !== original.name) {
			map.addMapping({
				source: original.source,
				original: {
				line: original.line,
				column: original.column
				},
				generated: {
				line: generated.line,
				column: generated.column
				},
				name: original.name
			});
			}
			lastOriginalSource = original.source;
			lastOriginalLine = original.line;
			lastOriginalColumn = original.column;
			lastOriginalName = original.name;
			sourceMappingActive = true;
		} else if (sourceMappingActive) {
			map.addMapping({
			generated: {
				line: generated.line,
				column: generated.column
			}
			});
			lastOriginalSource = null;
			sourceMappingActive = false;
		}
		for (var idx = 0, length = chunk.length; idx < length; idx++) {
			if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
			generated.line++;
			generated.column = 0;
			// Mappings end at eol
			if (idx + 1 === length) {
				lastOriginalSource = null;
				sourceMappingActive = false;
			} else if (sourceMappingActive) {
				map.addMapping({
				source: original.source,
				original: {
					line: original.line,
					column: original.column
				},
				generated: {
					line: generated.line,
					column: generated.column
				},
				name: original.name
				});
			}
			} else {
			generated.column++;
			}
		}
		});
		this.walkSourceContents(function (sourceFile, sourceContent) {
		map.setSourceContent(sourceFile, sourceContent);
		});

		return { code: generated.code, map: map };
	};

	exports.SourceNode = SourceNode;


/***/ }
/******/ ])
});
;
/*if (typeof define!=="function") {
	define=require("requirejs").define;
}*/
define('IndentBuffer',["assert","source-map","root"],function (A, S,root) {
var Pos2RC=function (src) {
	var $={};
	var map=[];
	var pos=0;
	var lastRow=0;
	src.split("\n").forEach(function (line) {
		map.push(pos);
		pos+=line.length+1;
	});
	map.push(pos);
	$.getRC=function (pos) {
		while(true) {
			if (lastRow<0) {
				return {row:1, col:1};
			}
			if (lastRow+1>=map.length) {
				return {row:map.length, col:1};
			}
			//A(!( pos<map[lastRow]  &&  map[lastRow]<=pos ));
			//A(!( map[lastRow+1]<=pos  &&  pos<map[lastRow+1] ));
			if (pos<map[lastRow]) {
				lastRow--;
			} else if (map[lastRow+1]<=pos) {
				lastRow++;
			} else {
				return {row:lastRow+1, col:pos-map[lastRow]+1};
			}
		}
	};
	return $;
};
var IndentBuffer=function (options) {
	options=options||{};
	var $=function () {
		var args=arguments;
		var fmt=args[0];
		//console.log(fmt+ " -- "+arguments[0]+" --- "+arguments.length);
		var ai=0;
		function shiftArg(nullable) {
			ai++;
			var res=args[ai];
			if (res==null && !nullable) {
				console.log(args);
				throw new Error(ai+"th null param: fmt="+fmt);
			}
			return res;
		}
		function nc(val, msg) {
			if(val==null) throw msg;
			return val;
		}
		while (true) {
			var i=fmt.indexOf("%");
			if (i<0) {$.print(fmt); break;}
			$.print(fmt.substring(0,i));
			i++;
			var fstr=fmt.charAt(i);
			if (fstr=="s") {
				var str=shiftArg();
				if (typeof str == "string" || typeof str =="number") {}
				else if (str==null) str="null";
				else if (str.text) {
					$.addMapping(str);
					str=str.text;
				}
				$.print(str);
				i++;
			} else if (fstr=="d") {
				var n=shiftArg();
				if (typeof n!="number") throw new Error (n+" is not a number: fmt="+fmt);
				$.print(n);
				i++;
			} else if (fstr=="n") {
				$.ln();
				i++;
			} else if (fstr=="{") {
				$.indent();
				i++;
			} else if (fstr=="}") {
				$.dedent();
				i++;
			} else if (fstr=="%") {
				$.print("%");
				i++;
			} else if (fstr=="f") {
				shiftArg()($);
				i++;
			} else if (fstr=="l") {
				var lit=shiftArg();
				$.print($.toLiteral(lit));
				i++;
			} else if (fstr=="v") {
				var a=shiftArg();
				if (!a) throw new Error ("Null %v");
				if (typeof a!="object") throw new Error("nonobject %v:"+a);
				$.addMapping(a);
				$.visitor.visit(a);
				i++;
			} else if (fstr=="z") {
				var place=shiftArg();
				if ("val" in place) {
					$.print(place.val);
					return;
				}
				if (!place.inited) {
					$.lazy(place);
				}
				place.print();
				//$.print(place.gen);
				i++;
			} else if (fstr=="j") {
				var sp_node=shiftArg();
				var sp=sp_node[0];
				var node=sp_node[1];
				var sep=false;
				if (!node || !node.forEach) {
					console.log(node);
					throw new Error (node+" is not array. cannot join fmt:"+fmt);
				}
				node.forEach(function (n) {
					if (sep) $.printf(sp);
					sep=true;
					$.visitor.visit(n);
				});
				i++;
			} else if (fstr=="D"){
				shiftArg(true);
				i++;
			} else {
				i+=2;
			}
			fmt=fmt.substring(i);
		}
	};
	$.addMapping=function (token) {
		//console.log("Token",token,$.srcFile+"");
		if (!$.srcFile) return ;
		// token:extend({text:String},{pos:Number}|{row:Number,col:Number})
		var rc;
		if (typeof token.row=="number" && typeof token.col=="number") {
			rc={row:token.row, col:token.col};
		} else if (typeof token.pos=="number") {
			rc=$.srcRCM.getRC(token.pos);
		}
		if (rc) {
			//console.log("Map",{src:{file:$.srcFile+"",row:rc.row,col:rc.col},
			//dst:{row:$.bufRow,col:$.bufCol}  });
			$.srcmap.addMapping({
				generated: {
					line: $.bufRow,
					column: $.bufCol
				},
				source: $.srcFile+"",
				original: {
					line: rc.row,
					column: rc.col
				}
				//name: "christopher"
			});
		}
	};
	$.setSrcFile=function (f) {
		$.srcFile=f;
		$.srcRCM=Pos2RC(f.text());
		$.srcmap.setSourceContent(f.path(),f.text());
	};
	$.print=function (v) {
		$.buf+=v;
		var a=(v+"").split("\n");
		a.forEach(function (line,i) {
			if (i<a.length-1) {// has \n
				$.bufCol+=line.length+1;
				$.bufRow++;
				$.bufCol=1;
			} else {
				$.bufCol+=line.length;
			}
		});
	};
	$.dstFile=options.dstFile;
	$.mapFile=options.mapFile;
	$.printf=$;
	$.buf="";
	$.bufRow=1;
	$.bufCol=1;
	$.srcmap=new S.SourceMapGenerator();
	$.lazy=function (place) {
		if (!place) place={};
		if (options.fixLazyLength) {
			place.length=place.length||options.fixLazyLength;
			place.pad=place.pad||" ";
			place.gen=(function () {
				var r="";
				for(var i=0;i<place.length;i++) r+=place.pad;
				return r;
			})();
			place.puts=[];
			$.useLengthPlace=true;
		} else {
			//cannot use with sourcemap
			place.gen=("GENERETID"+Math.random()+"DITERENEG").replace(/\W/g,"");
			place.reg=new RegExp(place.gen,"g");
			A(!$.useLengthPlace,"GENERETID cannot be used");
		}
		place.inited=true;
		//place.src=place.gen;
		place.put=function (val) {
			this.val=val+"";
			if (this.puts) {
				if (this.val.length>this.length) {
					$.lazyOverflow=true;
				}
				while (this.val.length<this.length) {
					this.val+=this.pad;
				}
				var place=this;
				this.puts.forEach(function (i) {
					var pl=$.buf.length;
					$.buf=$.buf.substring(0,i)+place.val+$.buf.substring(i+place.length);
					A.eq(pl,$.buf.length);
				});
			}
			if (this.reg) {
				$.buf=$.buf.replace(this.reg, val);
			}
			return this.val;
		};
		place.print=function () {
			if (this.puts) this.puts.push($.buf.length);
			$.print(this.gen);
		};
		return place;
		//return {put: function () {} };
	};
	$.ln=function () {
		$.print("\n"+$.indentBuf);
	};
	$.indent=function () {
		$.indentBuf+=$.indentStr;
		$.print("\n"+$.indentBuf);
	};
	$.dedent = function () {
		var len=$.indentStr.length;
		if (!$.buf.substring($.buf.length-len).match(/^\s*$/)) {
			$.ln();
			//console.log($.buf);
			//throw new Error ("Non-space truncated ");
		}
		$.buf=$.buf.substring(0,$.buf.length-len);
		$.indentBuf=$.indentBuf.substring(0 , $.indentBuf.length-len);
	};
	$.toLiteral= function (s, quote) {
		if (!quote) quote="'";
	if (typeof s!=="string") {
		console.log("no literal ",s);
		throw new Error("toLiteral:"+s+" is not a literal");
	}
		s = s.replace(/\\/g, "\\\\");
		s = s.replace(/\r/g, "\\r");
		s = s.replace(/\n/g, "\\n");
		if (quote=="'") s = s.replace(/'/g, "\\'");
		else s = s.replace(/"/g, '\\"');
		return quote + s + quote;
	};
	$.indentBuf="";
	$.indentStr="  ";
	$.close=function () {
		$.mapStr=$.srcmap.toString();
		if ($.mapFile && $.dstFile) {
			$.mapFile.text($.mapStr);
			$.printf("%n//# sourceMappingURL=%s%n",$.mapFile.relPath($.dstFile.up()));
		}
		if ($.dstFile) {
			$.dstFile.text($.buf);
		}
		return $.buf;
	};
	return $;
};
root.IndentBuffer=IndentBuffer;
return IndentBuffer;
});

define('PythonGen',["Visitor","IndentBuffer","assert"],
function (Visitor,IndentBuffer,assert) {
    const BAWRAPPER="bawrapper";//
    const vdef={
        program: function (node) {
            this.visit(node.body);
        },
        classdef: function (node) {
            this.printf("class %s:%{%v%}",node.name,node.body);
        },
        define: function (node) {
            this.printf("def %s%v:%{%v%}",node.name,node.params,node.body);
        },
        paramList: function (node) {
            this.printf("(%j)",[",",node.body]);
        },
        importStmt: function (node) {
            const nameHead=node.name[0];
            const inf=this.importable[nameHead+""];
            const useWrapper=(inf && inf.wrapper);
            const localName=node.alias || node.name;
            this.printf("import %s%v", useWrapper?"_":"", node.name);
            if (node.alias || useWrapper) {
                this.printf(" as %v", localName);
            }
            /*if (inf && inf.wrapper) {
                this.printf("import _%v",node.name);
                if (node.alias) this.printf(" as %v",node.alias);
                else this.printf(" as %v",node.name);
            } else {
                this.printf("import %v",node.name);
                if (node.alias) this.printf(" as %v",node.alias);
            }*/
            //this.printf("%n");
        },
        importStmt2: function (node) {
            this.printf("import %j",[",",node.elements]);
        },
        importElement: function (node) {
            const nameHead=node.name[0];
            const inf=this.importable[nameHead+""];
            const useWrapper=(inf && inf.wrapper);
            const localName=node.alias || node.name;
            this.printf("%s%v", useWrapper?"_":"", node.name);
            if (node.alias || useWrapper) {
                this.printf(" as %v", localName);
            }
        },

        fromImportStmt: function (node) {
            const nameHead=node.name[0];
            const inf=this.importable[nameHead+""];
            const useWrapper=(inf && inf.wrapper);
            this.printf("from %s%v import %j",useWrapper?"_":"",node.name,
            [",", node.localNames]);
        },
        globalStmt: function (node) {
            this.printf("global %j",[",",node.names]);
        },
        packageName: function (node) {
            this.printf("%j",[".",node]);
        },
        exprStmt: function (node) {
            this.visit(node.expr);
        },
        returnStmt: function (node) {
            this.printf("return %v",node.expr);
        },
        delStmt: function (node) {
            this.printf("del %v",node.expr);
        },
        whileStmt: function (node) {
            this.printf("while %v%v", node.cond,node.do);
        },
        ifStmt: function (node) {
            this.printf("if %v%v", node.cond,node.then);
            this.visit(node.elif);
            if (node.else) this.visit(node.else);
        },
        elifPart: function (node) {
            this.printf("elif %v%v", node.cond,node.then);
        },
        elsePart: function (node) {
            this.printf("else%v",node.then);
        },
        forStmt: function (node) {
            this.printf("for %j in %v%v", [",",node.vars], node.set, node.do);
        },
        letStmt: function (node) {
            this.visit(node.left);
            this.printf("%s",node.op);
            this.visit(node.right);
            //this.printf("%n");
        },
        printStmt: function (node) {
            var a=this.anon.get(node);
            if (a.nobr) {
                this.printf("print(%j,end=' ')",[",",a.values]);
            } else {
                this.printf("print(%j)",[",",a.values]);
            }
        },
        printStmt3: function (node) {
            this.printf("print%v",node.args);
        },
        memberRef: function (node) {
            this.printf(".%v",node.name);
        },
        args: function (node) {
            this.printf("(%j)",[",",node.body]);
        },
        exprList: function (node) {
            this.printf("%j",[",",node.body]);
        },
        lvalList: function (node) {
            this.printf("%j",[",",node.body]);
        },
        array: function (node) {
            this.printf("[%j]",[",",node.body]);
        },
        dict: function (node) {
            this.printf("{%j}",[",",node.body]);
        },
        dictEntry: function (node) {
            this.printf("%v:%v",node.key,node.value);
        },
        index: function (node) {
            this.printf("[%j]",[":",node.body]);
        },
        arg: function (node) {
            if (node.name) {
                this.printf("%s=",node.name);
            }
            this.visit(node.value);
        },
        block: function (node) {
            this.printf(":%{");
            this.visit(node.body);
            this.printf("%}");
        },
        paren: function (node) {
            this.printf("(%v)",node.body);
        },
        ":indent": function () {
            this.printf(":%{");
        },
        "dedent": function () {
            this.printf("%}");
        },
        "nodent": function () {
            this.printf("%n");
        },
        infixl: function(node) {
            this.printf("%v%v%v",node.left,node.op,node.right);
        },
        postfix: function (node) {
            this.printf("%v%v",node.left,node.op);
        },
        prefix: function (node) {
            this.printf("%v%v",node.op,node.right);
        },
        breakStmt: function () {
            this.printf("break");
        },
        continueStmt: function () {
            this.printf("continue");
        },
        passStmt: function () {
            this.printf("pass");
        },
        superCall: function () {
            this.printf("super()");
        },
        symbol: function (node) {
            var a=this.anon.get(node);
            if (a.scopeInfo && a.scopeInfo.builtin) {
                this.printf("%s._%s", BAWRAPPER,node+"");
            } else {
                this.printf("%s",node+"");
            }
        },
        not: function() {
            this.printf("not ");
        },
    };
    const verbs=[">=","<=","==","!=","+=","-=","*=","/=","%=","**","//",
      ">","<","=",".",":","+","-","*","/","%","(",")",",",
      "number","literal3","literal","and","or","True","False","None"];
    for (let ve of verbs) {
        vdef[ve]=function (node) {
            //console.log("verb",node);
            this.printf(" %s ",node+"");
        };
    }
    function gen(node,anon,options={}) {
        const v=Visitor(vdef);
        v.anon=assert(anon);
        v.importable=options.importable||{};
        //console.log("IMP",v.importable);
        v.def=function (node) {
            var v=this;
            if (node instanceof Array) {
                for (let n of node) v.visit(n);
            } else {
                this.printf("%s(%s)",node+"",(node ? node.type+"": "UNDEF"));
                //throw new Error("Visiting undef "+(node && node.type));
            }
        };
        const buf=IndentBuffer();
        buf.visitor=v;
        v.printf=buf.printf.bind(buf);
        v.buf=buf;
        v.visit(node);
        //console.log("pgen res",buf.buf);
        return buf.buf;
    }
    return gen;
});

define('Python2JS',["Visitor","IndentBuffer","context","PyLib"],
function (Visitor,IndentBuffer,context,PL) {
    var PYLIB="PYLIB";
    const vdef={
        program: function (node) {
            this.printf("%s.LoopChecker.reset();%n",PYLIB);
            this.visit(node.body);
        },
        classdef: function (node) {
            const sp=b=>node.extends? this.visit(node.extends.super) : b.printf("Object");
            this.ctx.enter({inClass:node},()=>{
                this.printf("var %s=%s.class(%f,{%{"+
                    "%s:'%s',%j"+
                "%}});",
                node.name, PYLIB,sp,
                    "CLASSNAME",node.name, [",",node.body.filter(b=>b.type==="define")]);
            });
        },//
        define: function (node) {
            if (this.ctx.inClass) {
                this.printf("%n%s: function %v{%{%v%}}",node.name,node.params,node.body);
            } else {
                this.printf("function %s%v{%{%v%}}%n",node.name,node.params,node.body);

            }
        },
        paramList: function (node) {
            this.printf("(%j)",[",",node.body]);
        },
        importStmt: function (node) {
            var url=this.options.pyLibPath+"/py_"+node.name+".js";
            if (node.alias) {
                this.printf("var %s=require('%s').install(%s);", node.alias, url, PYLIB);
                //this.printf("var %s=%s.import('%v');",node.alias,PYLIB,node.name);
            } else {
                this.printf("var %s=require('%s').install(%s);", node.name, url, PYLIB);
                //this.printf("var %s=%s.import('%v');",node.name,PYLIB,node.name);
            }//this.printf("%n");
        },
        importStmt2: function (node) {
            for (let e of node.elements) {
                this.visit(e);
            }
        },
        importElement: function (node) {
            var url=this.options.pyLibPath+"/py_"+node.name+".js";
            if (node.alias) {
                this.printf("var %s=require('%s').install(%s);", node.alias, url, PYLIB);
            } else {
                this.printf("var %s=require('%s').install(%s);", node.name, url, PYLIB);
            }
        },

        fromImportStmt: function (node) {
            var url=this.options.pyLibPath+"/py_"+node.name+".js";
            this.printf("var {%j}=require('%s').install(%s);", [",",node.localNames], url, PYLIB);
        },
        exprStmt: function (node) {
            this.printf("%v;",node.expr);
        },
        returnStmt: function (node) {
            if (node.expr) this.printf("return %v;",node.expr);
            else this.printf("return ;");
        },
        delStmt: function (node) {
            var a=this.anon.get(node);
            if (a.index) {
                this.printf("%s.wrap(%v).__delattr__(%v);",PYLIB, a.obj, a.index);
            } else {
                this.printf("%s.wrap(%v).__delattr__('%s');",PYLIB, a.obj, a.name);
            }
        },
        whileStmt: function (node) {
            this.printf("while (%v) %v", node.cond,node.do);
        },
        ifStmt: function (node) {
            this.printf("if (%v) %v", node.cond,node.then);
            this.visit(node.elif);
            if (node.else) this.visit(node.else);
        },
        elifPart: function (node) {
            this.printf("else if (%v) %v", node.cond,node.then);
        },
        elsePart: function (node) {
            this.printf("else %v",node.then);
        },
        forStmt: function (node) {
            this.printf("var %j;%nfor (%v of %v) %v", [",",node.vars],node.vars[0], node.set, node.do);
        },
        listComprehension: function (node) {
            const vn=node.vars[0];
            this.printf("%s.listComprehension(%s=>%v, %v)",
                       PYLIB, vn, node.elem, node.set);
        },
        letStmt: function (node) {
            if (this.anon.get(node).needVar) {
                this.printf("var ");
            }
            console.log("NODEL",node.left);//lvallist
            const firstBody=node.left.body && node.left.body[0];
            const io=PL.iops[node.op+""];
            if (firstBody &&
                firstBody.type==="postfix" &&
                firstBody.op.type==="index") {
                // TODO: [x[5],y]=[2,3]  -> x.__setitem__(5,2), y=3
                const object=firstBody.left;
                const index=firstBody.op;
                const value=node.right;
                console.log("NODEL2",object,index);
                if (io) {
                    this.printf("%v.__setitem__(%v, "+
                        "%s.wrap( %v.__getitem__(%v) ).__%s__(%v)"+
                    ");",
                        object, index.body,
                        PYLIB, object, index.body, io, value
                    );
                } else {
                    this.printf("%v.__setitem__(%v, %v);",object, index.body,value );
                }
            } else if (io) {
                const value=node.right;
                this.printf("%v=%s.wrap(%v).__%s__(%v)" ,
                node.left, PYLIB, node.left, io, value);
            } else {
                //if (node.left.type)
                this.visit(node.left);
                this.printf("=");
                this.visit(node.right);
                this.printf(";");
                //this.printf("%n");
            }
        },
        globalStmt: function (node) {},
        printStmt: function (node) {
            var a=this.anon.get(node);
            if (a.nobr) {
                this.printf("%s.print(%j,%s.opt({end:' '}));",
                PYLIB,[",",a.values],PYLIB);
            } else {
                this.printf("%s.print(%j);",PYLIB,[",",a.values]);
            }
        },
        printStmt3: function (node) {
            this.printf("%s.print %v;",PYLIB,node.args);
        },
        memberRef: function (node) {
            this.printf(".%v",node.name);
        },
        args: function (node) {
            const noname=node.body.filter((a)=>!a.name);
            const hasname=node.body.filter((a)=>a.name);
            this.printf("(");
            this.printf("%j",[",",noname]);
            if (hasname.length) {
                if (noname.length) this.printf(",");
                this.printf("%s.opt({%j})",PYLIB,[",",hasname]);
            }
            this.printf(")");
        },
        arg: function (node) {
            if (node.name) {
                this.printf("%s:",node.name);
            }
            this.visit(node.value);
        },
        array: function (node) {
            this.printf("[%j]",[",",node.body]);
        },
        dict: function (node) {
            this.printf("{%j}",[",",node.body]);
        },
        dictEntry: function (node) {
            this.printf("%v:%v",node.key,node.value);
        },
        index: function (node) {
            for (let b of node.body) {
                this.printf(".__getitem__(%v)",b);
                //this.printf("[%v]",b);
            }
        },
        block: function (node) {
            this.printf("{%{");
            this.printf("%s.LoopChecker.check();%n",PYLIB);
            this.visit(node.body);
            this.printf("%}}");
        },
        paren: function (node) {
            this.printf("(%v)",node.body);
        },
        exprList: function (node) {
            const a=this.anon.get(node);
            if (a.isTuple) {
                this.printf("%s.Tuple([%j])",PYLIB,[",",node.body]);
            } else {
                this.printf("%v",node.body[0]);
            }
        },
        lvalList: function (node) {
            if (node.body.length===1) {
                this.printf("%v",node.body[0]);
            } else {
                this.printf("[%j]",[",",node.body]);
            }
        },
        ":indent": function (node) {
            this.printf("%{");
        },
        "dedent": function (node) {
            this.printf("%}");
        },
        "nodent": function (node) {
            this.printf("%n");
        },
        infixl: function(node) {
            if (isCmp(node)) {
                const ec=expandCmps(node);
                if (ec.length>1) {
                    this.printf("%j",[" && ",ec]);
                    return;
                }
            }
            if (node.op+""==="and" ) {
                this.printf("%v && %v",node.left,node.right);
                return;
            }
            if (node.op+""==="or") {
                this.printf("%v || %v",node.left,node.right);
                return;
            }
            var o=PL.ops[node.op+""],io=PL.iops[node.op+""];
            if (o) {
                this.printf("%s.wrap(%v).__%s__(%v)",PYLIB, node.left,o, node.right);
            } else if (io) {
                this.printf("%v=%s.wrap(%v).__%s__(%v)" ,
                node.left, PYLIB, node.left, io, node.right);
            } else if (node.op+""==="in") {
                this.printf("%s.wrap(%v).__contains__(%v)" ,
                    PYLIB, node.right, node.left);
            } else {
                throw new Error("No operator for "+node.op);
            }
            //this.printf("%v%v%v",node.left,node.op,node.right);
        },
        postfix: function (node) {
            this.printf("%v%v",node.left,node.op);
        },
        prefix: function (node) {
            this.printf("%v%v",node.op,node.right);
        },
        breakStmt: function (node) {
            this.printf("break;");
        },
        continueStmt: function (node) {
            this.printf("continue;");
        },
        passStmt: function () {
            this.printf(";");
        },
        superCall: function () {
            this.printf("%s.super(this.__class__, this)",PYLIB);
        },
        and: function (node) {
            this.printf("&&");
        },
        or: function (node) {
            this.printf("||");
        },
        not: function (node) {
            this.printf("!");
        },
        literal: function (node) {
            let s=(node+"");
            if (s.match(/^r/)) {
                s=s.replace(/^r/,"").
                replace(/^["']/,"/").
                replace(/["']$/,"/");
            }
            this.printf("%s",s);
        },
        literal3: function (node) {
            var cont=node.text.substring(3,node.text.length-3);
            this.printf("%s",JSON.stringify(cont));
        },
        True: function () {this.printf("true");},
        False: function () {this.printf("false");},
    };
    const cmps={">":1,"<":1,"==":1,">=":1,"<=":1,"!=":1};
    function isCmp(node) {
        return cmps[node.op+""];
    }
    function expandCmps(node) {
        if (isCmp(node.left)) {
            var r=expandCmps(node.left);
            r.push( { type:"infixl", left: r[r.length-1].right, op:node.op, right:node.right});
            return r;
        } else {
            return [node];
        }
    }
    const verbs=[">=","<=","==","!=","+=","-=","*=","/=","%=",
      ">","<","=",".",":","+","-","*","/","%","(",")",",","!",
      "number","symbol"];
    for (let ve of verbs) {
        vdef[ve]=function (node) {
            //console.log("verb",node);
            this.printf("%s",node+"");
        };
    }
    function gen(node,anon,options) {
        options=options||{};
        const v=Visitor(vdef);
        v.anon=anon;
        v.def=function (node) {
            var v=this;
            if (node instanceof Array) {
                for (let n of node) v.visit(n);
            } else {
                this.printf("%s(%s)",node+"",(node ? node.type+"": "UNDEF"));
                //throw new Error("Visiting undef "+(node && node.type));
            }
        };
        v.options=options;
        v.ctx=context();
        const buf=options.buf||IndentBuffer();
        buf.visitor=v;
        v.printf=buf.printf.bind(buf);
        v.buf=buf;
        if (options.genReqJS) {
            options.pyLibPath=options.pyLibPath||".";//"PyLib";
            v.printf("define('__main__',function (require,exports,module) {%{");
            v.printf("var %s=require('%s/PyLib.js');%n",PYLIB,options.pyLibPath);
        }
        for (let n of PL.builtins) {
            v.printf("var %s=%s.%s;%n",n,PYLIB,n);
        }
        v.visit(node);
        if (options.genReqJS) {
            v.printf("%}});%n");
            const SEND_LOG=`
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");
            }`;
            v.printf("requirejs(['__main__'],function(){%s});%n",SEND_LOG);
        }
        //console.log("pgen res",buf.buf);
        return buf.buf;
    }
    return gen;
});

/*if (typeof define!=="function") {
	define=require("requirejs").define;
}*/
define('TError',["root"],function (root) {
var TError=function (mesg, src, pos) {
	if (typeof src=="string") {
		return {
			isTError:true,
			mesg:mesg,
			src:{
				name:function () { return src;},
				text:function () { return src;}
			},
			pos:pos,
			toString:function (){
				return this.mesg+" at "+src+":"+this.pos;
			},
			raise: function () {
				throw this;
			}
		};
	}
	var klass=null;
	if (src && src.src) {
		klass=src;
		src=klass.src.tonyu;
	}
	if (typeof src.name!=="function") {
		throw "src="+src+" should be file object";
	}
	var rc;
	if ( (typeof (src.text))=="function") {
		var s=src.text();
		if (typeof s=="string") {
			rc=TError.calcRowCol(s,pos);
		}
	}
	return {
		isTError:true,
		mesg:mesg,src:src,pos:pos,row:rc.row, col:rc.col, klass:klass,
		toString:function (){
			return this.mesg+" at "+this.src.name()+":"+this.row+":"+this.col;
		},
		raise: function () {
			throw this;
		}
	};
};
TError.calcRowCol=function (text,pos) {
	var lines=text.split("\n");
	var pp=0,row,col;
	for (row=0;row<lines.length ; row++) {
		pp+=lines[row].length+1;
		if (pp>pos) {
			col=pos-(pp-lines[row].length);
			break;
		}
	}
	return {row:row,col:col};
};
root.TError=TError;
return TError;
});

define('jshint',[],function () {
    var colon=":";
    return {
        Function: Function,
        use: function () {},
        scriptURL: function (url) {
            return "javascript"+colon+url;
        }
    };
});

define('pyRun',["PythonParser","PythonSemantics","PythonGen","Python2JS","PyLib","TError","jshint"],
function (PP,S,G,J,PL,TError,jshint) {
    function run(srcF) {
        var node=PP.parse(srcF);
        try {
            var v=S.check(node);
            //var gen=G(node);
            var genj=J(node,v.anon);
            console.log(genj);
            var f=new jshint.Function(genj);
            console.log(f());
            if (window.parent && window.parent.sendResult) {
                window.parent.sendResult($("#output").text(),"py");                
            }
        } catch(e) {
            if (e.node) {
                throw TError(e.message,srcF,e.node.pos);
            } else {
                console.log(e.stack);
                throw e;
            }
        }
    }
    return run;
});

//-----------
	var resMod;
	requirejs(["pyRun"], function (r) {
	  resMod=r;
	});
	if (typeof window!=="undefined" && window.pyRun===undefined) window.pyRun=resMod;
	if (typeof module!=="undefined") module=resMod;
	return resMod;
})(window);
