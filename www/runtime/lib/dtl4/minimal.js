/* ドリトルV4 のトランスパイラ（オンライン版ドリトル djs V4.06 (2026/10/31)、211dbfb 2026-11-12）。
   djs の js/transpiler/{ExpressionParser2,parser,context,minimal}.js を tools/bitarrow_kit/build.mjs が 1 つにまとめたもの。
   直接は編集しない（直すのは djs 側）。使い方は Bit Arrow の js/dolittle/minimal.js と同じ:
     MinimalParserV4.parse(src, {indentBuffer, src, srcPath, throwCompileErrorOnRuntime})
     MinimalParserV4.parseAsNode(src, options) / MinimalParserV4.node2js(node, options) */
var MinimalParserV4=(function(){
var AsyncByGenerator={supportsGenerator:true};   // 生成コードは function* を使う（本文に NOGENERATOR があれば使わない）
var Parser, context, MinimalParser;
var window={};   // context.js が window.define を見て AMD に登録しようとするのを止め、この中だけで受ける
// ---- djs js/transpiler/ExpressionParser2.js ----
// packrat(?) parser
function ExpressionParser() {
	var $={};
	var EXPSTAT="EXPSTAT";
	//  first 10     *  +  <>  &&  ||  =     0  later
	function opType(type, prio) {
	    var $={};
	    $.eq=function (o) {return type==o.type() && prio==o.prio(); };
        $.type=function (t) { if (!t) return type; else return t==type;};
	    $.prio=function () {return prio;};
	    $.toString=function () {return "["+type+":"+prio+"]"; }
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
            built.add(Parser.Parser.create(function (st) {
                if (st.src==null) console.log("st src null! at "+eg.name);
                var r=a.parse(st);
                if (r.isSuccess()) {
                    r.opType=opt;
                }
                return r;
            }).setName("(opType "+opt+" "+a.name+")").inheritFirst(a));
	    };
	    $.get=function () {return built.get();};
	    $.parse=function (st) {
	        return $.get().parse(st);
	    };
	    return $;
	}
	var prefixOrElement=typeComposite(), postfixOrInfix=typeComposite();
	var element=composite();
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
	$.build= function () {
	    //postfixOrInfix.build();
        //prefixOrElement.build();
	    $.built= Parser.Parser.create(function (st) {
	        return parse(0,st);
	    }).setName("ExpBuilt");
	    return $.built;
	};
	function dump(st, lbl) {
	    return ;
	    var s=st.src.str;
	    console.log("["+lbl+"] "+s.substring(0,st.pos)+"^"+s.substring(st.pos)+
	            " opType="+ st.opType+"  Succ = "+st.isSuccess()+" res="+st.result[0]);
	}
	function parse(minPrio, st) {
	    var stat=0, res=st ,  opt;
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
	        pre=st.result[0];
	        st=parse(opt.prio(), st);
	        if (!st.isSuccess()) {
	            return st;
	        }
  	        // st: Expr    st.pos = -elem^
	        var pex=$.mkPrefix.def(pre, st.result[0]);
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
	            var pex=$.mkPostfix.def(res.result[0],st.result[0]);
	            res=st.clone();
	            res.result=[pex]; // res.pos= expr++^
	            dump(st, "185");
	            st=postfixOrInfix.parse(st); // st. pos= expr++--^
	            if (!st.isSuccess()) {
	                return res;
	            }
	        } else if (opt.type("infixl")){  //x+y+z
	            // st: infixl
	            var inf=st.result[0];
	            st=parse(opt.prio()+1, st);
	            if (!st.isSuccess()) {
	                return res;
	            }
	            // st: expr   st.pos=  expr+expr^
	            var pex=$.mkInfixl.def(res.result[0], inf , st.result[0]);
	            res=st.clone();
	            res.result=[pex]; //res:infixlExpr
	            if (!st.nextPostfixOrInfix) {
	                return res;
	            }
	            st=st.nextPostfixOrInfix;
	        } else if (opt.type("infixr")) { //a=b=c
                // st: infixr
                var inf=st.result[0];
                st=parse(opt.prio() ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st: expr   st.pos=  expr+expr^
                var pex=$.mkInfixr.def(res.result[0], inf , st.result[0]);
                res=st.clone();
                res.result=[pex]; //res:infixrExpr
                if (!st.nextPostfixOrInfix) {
                    return res;
                }
                st=st.nextPostfixOrInfix;
	        } else { // infix
                // st: infixl
                var inf=st.result[0];
                st=parse(opt.prio()+1 ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st: expr   st.pos=  expr+expr^
                var pex=$.mkInfix.def(res.result[0], inf , st.result[0]);
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
		return Parser.Parser.create(function (st) {
			return $.built.parse(st);
		});
	};
	return $;
}

// ---- djs js/transpiler/parser.js ----
Parser=function () {
    function extend(dst, src) {
        var i;
        for(i in src){
            dst[i]=src[i];
        }
        return dst;
    }
    var $={
        consoleBuffer:"",
        options: {traceTap:false, optimizeFirst: true, profile: false ,verboseFirst: false},
        Parser: Parser,
        StringParser: StringParser,
        nc: nc
    };
    $.dispTbl=function (tbl) {
    	var buf="";
    	var h={};
    	if (!tbl) return buf;
    	for (var i in tbl) {
    		var n=tbl[i].name;
    		if (!h[n]) h[n]="";
    		h[n]+=i;
    	}
    	for (var n in h) {
    		buf+=h[n]+"->"+n+",";
    	}
    	return buf;
    }
    //var console={log:function (s) { $.consoleBuffer+=s; }};
    function _debug(s) {console.log(s);}
    function Parser(parseFunc){
        this.parse=parseFunc;
    };
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
        	return Parser.create(function (s) {
        		var res=t.parse(s);
        		if (!res.success) return res;
        		if (f.apply({}, res.result)) {
        			res.success=false;
        		}
        		return res;
        	}).setName("(except "+t.name+")");
        },
        noFollow: function (p) {
            var t=this;
            nc(p,"p");
            return Parser.create(function (s) {
                var res=t.parse(s);
                if (!res.success) return res;
                var res2=p.parse(res);
                res.success=!res2.success;
                return res;
            }).setName("("+t.name+" noFollow "+p.name+")");
        },
        and: function(next) {// Parser.and:: (Function|Parser)  -> Parser
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
            res._first=this._first;
            return res.setName("("+this.name+" "+next.name+")");
        },
        ret: function (f) {
            nc(f,"f");
            var t=this;
            var res=Parser.create(function(s){ //s:State
                var r1=t.parse(s); // r1:State
                if (!r1.success) return r1;
                var r2=r1.clone();
                r2.result=[ f.apply({}, r1.result) ];
                return r2;
            });
            res._first=this._first;
            return res;
        },
        first: function (space, ct) {
        	if (space==null) throw "Space is null2!";
        	if (typeof ct=="string") {
        		this._first={space: space, chars:ct};
        	} else {
        		this._first={space: space, tbl:ct};
        	}
        	return this;
        },
        inheritFirst: function (p) {
            this._first=p._first;
            return this;
        },
        unifyFirst: function (other) {
        	//return null;
        	var tbl={}; // tbl.* includes tbl.ALL
        	function setTbl(src) {// src:Parser
        		var cs=src._first.chars;
        		function mk(c) {
        			if (!tbl[c]) {
        				if (!tbl.ALL) tbl[c]=src;
        				else tbl[c]=tbl.ALL.orNoUnify(src);
        			} else {
        				tbl[c]=tbl[c].orNoUnify(src);
        			}
        		}
        		if (cs) {
            		for (var i=0; i<cs.length ; i++) {
            			var c=cs.substring(i,i+1);
            			mk(c);
            		}
            	} else {
        			mk("ALL");
        			for (var i in tbl) {
        				if (i==="ALL") continue;
        				tbl[i]=tbl[i].orNoUnify(src);
        			}
            	}
        	}
        	function mergeTbl() {
        		var t2=other._first.tbl;
        		if ("ALL" in t2) {
            		for (var c in tbl) {
            			tbl[c]=tbl[c].orNoUnify(other);
            		}
            		for (var c in t2) {
            			if (!tbl[c]) {
            				tbl[c]=other;
            			}
            		}
        		} else {
        			for (var c in t2) {
        				if (!tbl[c]) {
        					tbl[c]=other;
        				} else {
        					tbl[c]=tbl[c].orNoUnify(other);
        				}
        			}
        		}
        	}
        	if (!this._first) return null;
        	if (!other._first) return null;
        	var space=this._first.space;
        	if (space!==other._first.space) return null;
        	if (space==null) throw "Space is null!";
        	if (this._first.tbl) extend(tbl, this._first.tbl);
        	else setTbl(this);
        	if (other._first.tbl) mergeTbl();
        	else setTbl(other);
        	var res=Parser.create(function (s0) {
        		var s=space.parse(s0);
        		var f=s.src.str.substring(s.pos,s.pos+1);
        		//console.log("name= "+this.name+" pos="+s.pos+" fst="+f+"  tbl="+$.dispTbl(tbl));
        		if (tbl[f]) {
            		//console.log("tbl[f].name="+tbl[f].name);
            		return tbl[f].parse(s);
        		}
        		if (tbl.ALL) return tbl.ALL.parse(s);
        		s.success=false;
        		return s;
        	});
        	res.first(space, tbl).setName("("+this.name+")U("+other.name+")");
        	if ($.options.verboseFirst) console.log("Created unify name=" +res.name+" tbl="+$.dispTbl(tbl));
        	return res;
        },
        or: function(other) { // Parser->Parser
        	nc(other,"other");
        	var u=($.options.optimizeFirst ? this.unifyFirst(other): null);
        	if (u) return u;
        	else return this.orNoUnify(other);
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
        	return this;
        },
        profile: function () {
            if ($.options.profile) {
                this.parse=this.parse.profile(this.name);
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
        	if (min>0) res._first=p._first;
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
            		var r=[r1];
          			for (i in r2) {
           				r.push(r2[i]);
           			}
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
        	res._first=this._first;
        	return res.setName("(Tap "+t.name+")");
        },
        retN: function (i) {
        	return this.ret(function () {
        		return arguments[i];
        	})
        },
        parseStr: function (str) {
            var st=new State(str);
            return this.parse(st);
        }
    });
    function State(str) { // class State
        if (str) {
            this.src={str:str, maxPos:0};// maxPos is shared by all state
            this.pos=0;
            this.result=[]
            this.success=true;
        }
    };
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
        }
    });
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
        	});
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
        	});
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
    	parse: function (parser, str) {
    		var st=new State(str);
    		return parser.parse(st);
    	}
    };
    StringParser.eof=StringParser.strLike(function (str,pos) {
    	if (pos==str.length) return {len:0};
    	return null;
    }).setName("EOF");
    $.StringParser=StringParser;

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
    	if (res==null || typeof res=="string" || typeof res=="number") return;
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

// ---- djs js/transpiler/context.js ----
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
(function () {
var define=window.define||function (r,f) {window.context=f();};
define([],function () {
return context=function () {
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
    for (var k in c) { builtins[k]=true };
    return c;
    function enter(val, act) {
        var sv={};
        for (var k in val) {
            if (k.match(/^\$/)) {
                k=RegExp.rightContext;
                sv[k]=c[k];
                c[k]=c.ovrFunc(c[k], val[k]);
            } else {
                sv[k]=c[k];
                c[k]=val[k];
            }
        }
        act(c);
        for (var k in sv) {
            c[k]=sv[k];
        }
    }
};
});
})();

// ---- djs js/transpiler/minimal.js ----
MinimalParser= function () {
	var parser={};
	var sp=Parser.StringParser; // 文字列を解析するパーサ
	var ctx;
	function useGenerator(){
		return ctx.usegen;//AsyncByGenerator.supportsGenerator;
	}
	function ent(entf, parser) {
        if (typeof parser == "function") {
	       var res;
	       ctx.enter(entf(), function () {
	           res=parser();
	       });
	       return res;
        }
	    return Parser.create(function (st) {
	        var res;
	        ctx.enter(entf(), function () {
    	        res=parser.parse(st);
	        });
	        return res;
	    });
	}
	function newScope(parser) {
	    // ctx.scope: {varname : {vtype:string?, depth:number }}
	    return ent(function () {
	        var depth=0;
	        if ((typeof (ctx.depth))=="number") depth=ctx.depth+1;
	        //console.log("entering",depth);
	        var s=Object.create(ctx.scope||{});
					//修正点１
	        ["self","this","自分"].forEach(function (k) {
	            s[k]={type:"self", depth:depth};
	        });
	        s["arguments"]={type:"arguments", depth:depth};
					s["_rest"]={type:"_rest", depth:depth};
	        return {scope: s ,depth:depth };
	    },parser);
	}
	function lit(s) {
	    return '"'+s+'"';
	}
    function extend(arr,obj) {
        var pos;
        for (var k in obj) {
            var v=obj[k];
            arr[k]=v;
            if (typeof v=="number") pos=v;
            if (v && typeof v.pos=="number") pos=v.pos;
        }
        arr.pos=arr.pos||pos;
        return arr;
    }
	//    ↓ 空白またはコメントを解析するパーサ
	// コメントは // ／／（行末まで）と /* */ ／＊ ＊／（囲み。半角・全角の混在も可。2026-10-17 先生の決定。V4 も同日に対応）
	var space=sp.reg(/^(\s*([\/／][*＊][\s\S]*?[*＊][\/／])*([\/／][\/／][^\r\n]*(\r?\n|$))*)*/);/*.ret(function (a) {
	    //console.log("READ space ! ",a.pos,a.len, a.src.str.substring( a.pos));
    	 //   console.log("READ space ! ",a.pos,a.len, a.src.str.substring( a.pos, a.pos+a.len ));
	    return a;
	});*/
	// トークナイザ： 空白またはコメントを読み飛ばし，次に rで指定されたトークンがあれば解析が成功．
	function token(r) {
		var str;
		if (typeof r=="string") {
			str=sp.str(r);     // 固定文字列トークンを解析するパーサ
		} else {
			str=sp.reg(r);     // 正規表現トークンを解析するパーサ
		}
		//    ↓ 空白またはコメントにつづいてstr  がきたら
		return space.and(str).ret(function(a, b) {
		    // a=空白またはコメント   b=読み込んだトークン
			// テキストと位置情報をつけて返す．
    	    //console.log("READ ! ",b.pos,b.len, b.src.str.substring( b.pos, b.pos+b.len ));
			return {pos:b.pos,
					text: b.src.str.substring( b.pos, b.pos+b.len ) ,
					toString: function (){
						//return this.text+"("+this.pos+")";
						return this.text;
					}
			}
		});
	}

	//ブロックに引数を与える際の構文
	var local_param_trim=function(_array){
		var result="";
		_array.forEach(function(e){result+="var "+e+";\n";});
		return result;
	};
	var block_trim=function(w){

	};
    // \lazies
	var expr,term,block,paren_expr,variable,infix_expr,program,statement_list;
	var infix_expr_lazy=Parser.lazy(function(){return infix_expr;});
	var expr_lazy = Parser.lazy(function(){return expr;});
	var term_lazy = Parser.lazy(function(){return term;});
	var variable_lazy = Parser.lazy(function(){return variable;});
	var block_lazy = Parser.lazy(function(){return block;});
	var meth_call_lazy = Parser.lazy(function(){return meth_call_lazy;});
	var paren_lazy = Parser.lazy(function(){return paren_expr;});
	var program_lazy=Parser.lazy(function(){return program;});
	var statement_list_lazy=Parser.lazy(function(){return statement_list;});
	//--------字句要素
	//名前
	var str_name = "[a-zａ-ｚA-ZＡ-Ｚ_＿\\$＄\\?？\u03C0ーぁ-んァ-ヶ\uFF66-\uFF9F々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF][a-zａ-ｚA-ZＡ-Ｚ_＿\\$＄\\?？0-9０-９ーぁ-んァ-ヶ\uFF66-\uFF9F々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]*";// 半角カナ（\uFF66-\uFF9F。ｰ を含む）も名前の文字。trim_name で全角に直す（ｶﾒﾀ＝カメタ。2026-10-17 先生の決定。V4 と同じ）
	var reg_name = RegExp("^"+str_name);// 名前の正規表現
	var trim_name=function(name){
		//name=name.replace(/[？?]/,"__question");
		name=name.replace(/[\uFF66-\uFF9F]+/g,function(k){return k.normalize("NFKC");});// 半角カナは全角に（ｶﾞ→ガ、ｰ→ー）。英数字は下で半角にするので、名前は「カナは全角・英数字は半角」にそろう
		return toHalfWidth(name);
	};
	function toHalfWidth(strVal){
      // 半角変換
        var halfVal = strVal.replace(/[！-～]/g,
            function( tmpStr ) {
              // 文字コードをシフト
              return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
            }
        );
          // 文字コードシフトで対応できない文字の変換
        return halfVal.replace(/”/g, "\"")
            .replace(/’/g, "'")
            .replace(/‘/g, "`")
            .replace(/￥/g, "\\")
            .replace(/　/g, " ")
            .replace(/〜/g, "~");
    }
	var colon=token(/^[:：]/).ret(function(){return ":";});
	var lsb=token(/^[\[「]/).ret(function(){return "[";});
	var rsb=token(/^[\]」]/).ret(function(){return "]";});
	var stick=token(/^[|｜]/).ret(function(){return "|";});
	var period=token(/^[.。．]/).ret(function(){return "."});
	// タグで終わる文は「。」を省略できる（2026-10-31 先生の指示）: 直前の文がタグ（>）で終わり、続く空白・コメントの後が 改行・本文の末尾・別のタグ のどれかなら幅 0 の区切り。
	// 文の途中（<p>a</p>\n！塗る、ラベル！<p>a</p>\n作る）は statement が先に貪欲に読むのでここには来ない＝これまで通った本文の意味は変わらない。
	// 文を終える位置は ctx.tagPeriods に記録し、実行前の検査（dolittle_classify.js・dolittle_precheck.js）がタグを空白にするときに「。」を置く
	var tag_period=sp.strLike(function(str,pos){
		if(str[pos-1]!==">") return null;   // 値のうち > で終わるのはタグだけ（名前・数・文字列・」・）は別の文字）
		var m=/^(\s*([\/／][*＊][\s\S]*?[*＊][\/／])*([\/／][\/／][^\r\n]*(\r?\n|$))*)*/.exec(str.substring(pos));
		var ws=m?m[0]:"";
		var nxt=pos+ws.length;
		if(ws.indexOf("\n")<0 && nxt<str.length && !(str[nxt]==="<" && scanHtmlTag(str,nxt))) return null;   // 同じ行に続くのがタグ以外（<p>a</p> ラベル！作る）なら区切らない（値の並び＝構文エラーのまま）
		if(ctx){ (ctx.tagPeriods||(ctx.tagPeriods=[])).push(pos); }
		return {len:0};
	}).ret(function(){return ".";});
	var lp=token(/^[(（]/).ret(function(){return "(";});
	var rp=token(/^[)）]/).ret(function(){return ")";});
	var excr=token(/^[!！､,、，]/).ret(function(){return "!";});// 読点 ､ , 、 ， も「！」（V4 の文法 exc と同じ。2026-10-17 先生の決定）
	var semicolon=token(/^[;；]/).ret(function(){return ";";});
	var eq=token(/^[=＝]/).noFollow(token(/^[=＝]/)).ret(function(){return "=";});
	var deq=token(/^[=＝][=＝]/).ret(function(){return "===";});
	var add=token(/^[+＋]/).ret(function(){return "+";});
	var sub=token(/^[-−–－]/).ret(function(){return "-";});
	var mul=token(/^[*×＊∗]/).ret(function(){return "*";});
	var div=token(/^[/÷／]/).ret(function(){return "/";});
	var gt=token(/^[>＞]/).ret(function(){return ">";});
	var ge=token(/^(?:[>＞][=＝]|≧)/).ret(function(){return ">=";});
	// 比較の <。ただし行頭（前の空白に改行がある）か、タグの直後（前の文字が >）で、そこから完全な要素（scanHtmlTag）が始まるときはタグ（2026-10-31。
	// 「。」を省いたタグの行の次の行のタグ、引数に並べた 2 つめのタグを比較と読まないため。x<y や「x>1」のような比較はタグにならない）
	var lt=space.and(sp.strLike(function(str,pos){
		var c=str[pos]; if(c!=="<"&&c!=="＜") return null;
		if(c==="<"){ var j=pos-1, nl=false; while(j>=0&&/[\s　]/.test(str[j])){ if(str[j]==="\n") nl=true; j--; }
			if((nl||str[j]===">") && scanHtmlTag(str,pos)) return null; }
		return {len:1};
	})).ret(function(){return "<";});
	var le=token(/^(?:[<＜][=＝]|≦)/).ret(function(){return "<=";});
	var neg=token(/^(?:[!！][=＝]|≠)/).ret(function(){return "!==";});
	var mod=token(/^[%％]/).ret(function(){return "%";});

    // \token_name 名前のトークン
	var token_name = token(reg_name).ret(function(_name){
	    return {pos:_name.pos,text: trim_name(_name.text),toString:function () {
	        return this.text;
	    }};
	});
	var reg_str = RegExp("^[\"\”\“『][^\"\“\”\』]*[\"\”\“』]");//文字列の正規表現
	var tok_str = token(reg_str).ret(function(_str){
	    var content=_str.text.substring(1,_str.text.length-1);
	    // 文字列の中の \ は文字どおり（"a\nb" は4文字。改行にするには unescape。V3/V4 と同じ）。改行もそのまま文字列に入れる
	    return extend([JSON.stringify(content)],{type:"string",content:content});
	});
	var reg_num = /^(([0０][bBｂＢ][01０１]+)|([0０][xｘXＸ][0-9０-９a-fA-Fａ-ｆＡ-Ｆ]+)|([0-9０-９]+([.．]([0-9０-９])+)?))([a-zａ-ｚA-ZＡ-Ｚ_＿$＄\?？\u03C0ーぁ-んァ-ヶ\uFF66-\uFF9F々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF](?![a-zａ-ｚA-ZＡ-Ｚ_＿$＄\?？0-9０-９\u03C0ーぁ-んァ-ヶ\uFF66-\uFF9F々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]))?/;//数字を表す正規表現。数の直後の語は、1 文字なら単位（１００歩・１０回・７２度）として捨て、2 文字以上なら命令として切り離す（`１００歩く`→100 歩く。2026-10-03 先生の決定。以前は何文字でも捨てていた）。語の文字種は名前（str_name）と同じ（全角英字 １００ｘ も 1 文字の単位。V4 と同じ。2026-10-17）
	//var reg_num=/^[0-9０-９]+/;
	var tok_num = token(reg_num).ret(function(_num){
		var v=(_num+"").replace(/[０-９]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		}).replace(/．/,".").replace(/[ｘＸａ-ｆＡ-Ｆ]/g,function(s){
			return String.fromCharCode(s.charCodeAt(0)-0xFEE0);
		});
		if(v.match(/^((0[bB][01]+)|(0[xX][0-9a-fA-F]+))/)){
			var radix=10;
			switch(v[1]){
				case "x":case "X":radix=16;break;
				case "b":case "B":radix=2;break;
				case "o":case "O":radix=8;break;
			}
			v=v.substr(2,v.length);
			v=parseInt(v,radix);
		}else{
			v=parseFloat(v);
		}
		return extend(["(",v,")"],{type:"number",value:v});
	});
    //--------------ここから構文
	//括弧
	var paren_expr = lp.and(expr_lazy).and(rp).
	ret(function(_lp,_expr,_rp){
	    return extend([_lp,_expr,_rp], {type:"paren",subnodes:arguments});
	});
	//単項演算項  (obj! +arg1 -arg2 meth)
	// 符号は数の定数にだけ付けられる（V4 の文法 inum = sign unum）。変数や式に付けた -x は
	// 実行時にエラーを出す（root.system.rtnegvar）。定数は括弧で囲み 5 - -3 が JS の「--」にならないようにする。
	var unary_term=add.or(sub).and(term_lazy).ret(function (u,t) {
	    if (t && t.type==="number") return extend(["(",u,t,")"],{type:"unary_term"});
	    if (u==="-") return extend(["root.system.rtnegvar(",t,")"],{type:"unary_term"});
	    return extend([u,t],{type:"unary_term"});
	});
    //単純式
	// HTML タグ（HTML 対応ドリトル djs-beta-html の DolittleParser から。2026-10-25 試作）。<p>…</p> や <br> を 1 つの値として読み、
	// root.parseHTML("<p>…</p>") にする。入れ子・空要素（br, input 等）・属性の引用符の中の > ・<style>/<script> の中身・<!-- --> を扱う。
	// 走査は scanHtmlTag（状態を持たない）で行うので、バックトラックしても影響が残らない。< の直後が英字でなければタグでない（a<b は比較）
	var VOID_TAGS={area:1,base:1,br:1,col:1,embed:1,hr:1,img:1,input:1,link:1,meta:1,source:1,track:1,wbr:1};
	var RAW_TAGS={style:1,script:1,textarea:1,title:1};
	var HTML_OPEN=/^<([a-zA-Z][a-zA-Z0-9.:_-]*)(?:\s+[^\s"'>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*\s*(\/?)>/;
	var HTML_CLOSE=/^<\/([a-zA-Z][a-zA-Z0-9.:_-]*)\s*>/;
	function scanHtmlTag(str,pos){ // pos の < から始まる要素 1 つの長さ {len}。要素でなければ null
		var i=pos, stack=[], m, name;
		if (str.charAt(i)!=="<" || str.substr(i,2)==="</" || str.substr(i,4)==="<!--") return null;
		while (true) {
			if (str.charAt(i)==="<") {
				if (str.substr(i,2)==="</") {
					m=HTML_CLOSE.exec(str.substring(i));
					if (!m || stack.length===0 || m[1].toLowerCase()!==stack[stack.length-1]) return null;
					stack.pop(); i+=m[0].length;
				} else if (str.substr(i,4)==="<!--") {
					var ce=str.indexOf("-->",i+4); if (ce<0) return null; i=ce+3;
				} else {
					m=HTML_OPEN.exec(str.substring(i));
					if (!m) return null;
					name=m[1].toLowerCase(); i+=m[0].length;
					if (m[2]!=="/" && !VOID_TAGS[name]) {
						if (RAW_TAGS[name]) {
							var ci=str.toLowerCase().indexOf("</"+name,i); if (ci<0) return null;
							var gt=str.indexOf(">",ci); if (gt<0) return null;
							i=gt+1;
						} else stack.push(name);
					}
				}
				if (stack.length===0) return {len:i-pos};
			} else {
				var lt=str.indexOf("<",i);
				if (lt<0) return null;
				i=lt;
			}
		}
	}
	var tok_tag=space.and(sp.strLike(function(str,pos){ return scanHtmlTag(str,pos); })).ret(function(_sp,t){
		var html=t.src.str.substring(t.pos,t.pos+t.len);
		if(ctx) ctx.htmlUsed=true;   // 本文にタグがある → HTML モード（GUI 部品を本文の流れに置く。node2js が印を出す。2026-10-26）
		return extend(["root.parseHTML(",JSON.stringify(html),")"],{type:"tag",html:html,pos:t.pos});
	});
	// #名前: id で既存の要素を取る（root.getDOM）。名前の文字は変数名と同じ（- は使えない）
	var tok_dom=token(RegExp("^[#＃]"+str_name)).ret(function(t){
		var name=trim_name(t.text.substring(1));
		return extend(["root.getDOM(",JSON.stringify("#"+name),")"],{type:"dom",name:name,pos:t.pos});
	});
	var simple = block_lazy.or(tok_str).or(paren_expr).or(tok_num).or(unary_term).or(tok_tag).or(tok_dom);// HTML タグと #id も値（2026-10-25 試作）
    // sin(x) なども送信の一種...にしないほうがいい
	var func_exe=token_name.and(paren_expr).
	ret(function(_name,_paren){
	    return extend([_paren,".",_name,"()"], {type:"func_exec",subnodes:arguments});
	});
	//電文
	var elec = simple.rep0().and(token_name).
	ret(function(_params,_meth){
	    return extend(["['"+_meth+"']","(",joinary(_params,","),")"],
	    {type:"elec",subnodes:arguments,meth:_meth,params:_params});
	}).sep1(semicolon.opt(),true);
	// 受け手ノードから、実行時エラー表示用の名前を静的に取り出す（2026-09-03）。
	// 単純な変数（this['名']）・引数/ローカル・「：名」・「obj:prop」だけを対象とし、それ以外
	// （括弧・送信結果のチェーン・文字列等）は null＝send の4番目の引数を省略し生成コードは従来どおり。
	// send は受け手が undefined/null のとき、この名前と命令名を含む親切文を出す（lib.js / dolittle_runtime_error.js）。
	function recvName(node) {
		if (!node || typeof node!=="object") return null;
		switch (node.type) {
			case "field": return node.name;
			case "localVar":
				return (node.name==="this"||node.name==="_args"||node.name==="_rest") ? null : node.name;
			case "rootVar": return "："+node.name;
			case "postfix":
				var left=node.subnodes[0], op=node.subnodes[1];
				if (op && op.type==="memberAccess") {
					var l=recvName(left);
					return l ? l+"："+op.name : null;
				}
				return null;
		}
		return null;
	}
	//送信
	// 全送信を root.system.send(受け手,"メソッド名",[引数...]) 経由にコンパイルする（2026-07-06）。
	// send はドリトル定義メソッド（dtlbind タグ付きブロック）の呼び出しだけを関数境界として
	// ReturnException（！返す）を捕捉し、ネイティブ（実行/なら/繰り返す等）は完全素通しする。
	// 直接呼び出し obj['メソッド'](args) と同じく this=受け手が保たれる（send 内 f.apply(obj,args)）。
	var meth_call = term_lazy.opt().and(excr).and(elec).ret(function (obj,_,elec) {
		var mkSend=function (head,e,recv) {
			var parts=["root.system.send(",head,",",lit(e.meth),",[",joinary(e.params,","),"]"];
			if (recv) parts.push(",",lit(recv));  // 受け手の表示名（エラー文用・単純な変数のときのみ）
			parts.push(")");
			return extend(parts,{pos:e.pos});
		};
		var head=obj||"this";
		var recv=obj?recvName(obj):null;  // 最初の送信だけ受け手名を持つ（チェーン2段目以降は送信結果）
		if (useGenerator()) {
			var sur=function (ex) {
				return ["(yield* AsyncByGenerator.toGen(",ex,"))"];
			}
			elec.forEach(function (e,i) {
				head=sur(mkSend(head,e,i===0?recv:null));
			});
			return extend(head,{type:"meth_call",subnodes:arguments});
		}
		elec.forEach(function (e,i) {
			head=mkSend(head,e,i===0?recv:null);
		});
		return extend(head,{type:"meth_call",subnodes:arguments});
	});//.or(func_exe);
	//式
	expr = meth_call.or(infix_expr_lazy); // simple includes in infix_expr
	//中置式 :=  前置演算子  項  演算子 項  後置演算子  （項＝変数。送信は含まず）
	var expbuild = ExpressionParser();
	expbuild.element(term_lazy);
	expbuild.infixl(2,deq);
	expbuild.infixl(2,neg);
	expbuild.infixl(3,add);
	expbuild.infixl(3,sub);
	expbuild.infixl(4,div);
	expbuild.infixl(4,mul);
	expbuild.infixl(4,mod);
	expbuild.infixl(2,le);
	expbuild.infixl(2,ge);
	expbuild.infixl(2,lt);
	expbuild.infixl(2,gt);
	expbuild.prefix(5,add);
	expbuild.prefix(5,sub);
	expbuild.mkInfixl(mk);
	expbuild.mkInfixr(mk);
	expbuild.mkPrefix(mkpre);
	expbuild.mkPostfix(mkpost);
	function mk(left,op,right){
	    // 演算子はすべて実行時ヘルパ経由にする（2026-09-27, V4.02 の値の扱いに合わせる）。
	    // 数字の文字列の計算（"3"＋1＝4）・大きな整数（BigInt）・＝＝ の許容誤差・数と文字列の比較・
	    // 0除算／数でないものの計算のエラーを lib.js の root.system.rt*（DtlValue）でまとめて扱う。
	    var fn=OPFUNC[op];
	    if(fn) return extend(["root.system."+fn+"(",left,",",right,")"], {type:"infix",subnodes:arguments});
	    return extend(["(",left,op,right,")"], {type:"infix",subnodes:arguments});
	}
	var OPFUNC={"+":"rtadd","-":"rtsub","*":"rtmul","/":"rtdiv","%":"rtmod",
	    "===":"rteq","!==":"rtne","<":"rtlt","<=":"rtle",">":"rtgt",">=":"rtge"};
	// 単項の符号は数の定数にだけ付けられる（V4 の文法 inum = sign unum）。-x は実行時にエラーを出す。
	// 括弧で囲んで 5 - -3 が JS の「--」にならないようにする。
	function mkpre(op,right){
	    if(right && right.type==="number") return extend(["(",op,right,")"], {type:"prefix",subnodes:arguments});
	    if(op!=="-") return extend([right], {type:"prefix",subnodes:arguments});
	    return extend(["root.system.rtnegvar(",right,")"], {type:"prefix",subnodes:arguments});
	}
	function mkpost(left,op){return extend([left,op], {type:"postfix",subnodes:arguments});}
	infix_expr = expbuild.build();
	//ブロック := [  [ | 引数リスト  |  文 . *  ]
	var block_param = stick.and(token_name.rep0()).and(semicolon.opt()).and(token_name.rep0()).and(stick).
	ret(function(_ls,_param,_semicolon,_local_param,_rs){
	    _param.forEach(regParam);
	    _local_param.forEach(regLocal);
	    return extend([joinary(_param,","),local_param_trim(_local_param)],
	    {type:"block_param",subnodes:arguments});
	});
	function regParam(n,i) {
	    ctx.scope[n+""]={type:"param",depth:ctx.depth,seq:i};
	}
	function regLocal(n,i) {
	    ctx.scope[n+""]={type:"local",depth:ctx.depth,seq:i};
	}
	var block = lsb.and(block_param.opt()).and(statement_list_lazy).and(rsb).
	ret(function(_lsb,_param,_progs,_rsb){
		// console.log(_progs);
	    _param=_param||["",""];
	    return extend(["dtlbind(this,function(",_param[0],
	    "){\nvar self=this;var 自分=self;"+
		"var _args=Array.prototype.slice.call(arguments);"+
		"var _rest=Array.prototype.slice.call(arguments,"+(_param[0].length)+");\n",
		_param[1],_progs,"})"],
	    {type:"block",subnodes:arguments,depth:ctx.depth});
	});
	block=newScope(block);
	//変数 := ( 単純式 |  名前 | :名前 ) :名前*
    var varbuild=ExpressionParser();
    varbuild.element(simple.or(token_name.ret(function (n) {
        if (ctx.scope[n]) {
            var s=ctx.scope[n];
            switch(s.type) {
                case "local":
                    return extend([n],{
                        type:"localVar",
                        name:n,
                        depth:s.depth,
                        vmname: "_local"+s.seq
                    });
                case "param":
                    return extend([n],{
                        type:"localVar",
                        name:n,
                        depth:s.depth,
                        vmname: "_param"+s.seq
                    });
                case "self":
                    return extend(["this"],{
                        type:"localVar",
                        name:"this",
                        depth:s.depth,
                        vmname: "self"
                    });
                case "arguments":
                    return extend(["_args"],{
                        type:"localVar",
                        name:"_args",
                        depth:s.depth,
                        vmname: "arguments"
                    });
								case "_rest":
                    return extend(["_rest"],{
                        type:"localVar",
                        name:"_rest",
                        depth:s.depth,
                        vmname: "_rest"
                    });
                default:
                    throw new Exception("Invalid scope type:"+s.type);
            }
            //if (s.seq===undefined) throw new Error(s.type);
            /*return extend([n],{
                type:"localVar",
                name:n,
                depth:s.depth,
                vmname: (s.type=="local"?"_local":"_param")+s.seq
            });*/
        } else {
			// 名前_N（例 木_1）: 変数「名前_N」が無ければ配列「名前」の N 番目（1始まり）を読む
			// （V4 OxObject.getProp 準拠・2026-09-27）。代入の左辺は従来どおり this['名前_N']（lhs）。
			if (/_[0-9]+$/.test(n)) {
				return extend(["root.system.readN(this,'"+n+"')"],{type:"field",name:n,lhs:"this['"+n+"']"});
			}
			return extend(["this['"+n+"']"],{type:"field",name:n});
        }
    })).or(colon.and(token_name).ret(function (_,n) {
            return extend(["root['"+n+"']"],{type:"rootVar",name:n});
        })
    ));
    varbuild.postfix(1,colon.and(token_name).ret(function (_,name) {
        return extend(["['"+name+"']"],{type:"memberAccess",name:name});
    }));
    // HTML：タグ名（HTML オブジェクトから要素を作る書き方。HtmlDom.js が root.HTML.<tag> を持つ）もタグと同じく HTML モードの印（2026-10-31 先生の決定）
    varbuild.mkPostfix(function(left,op){
        if(ctx && left && left.type==="field" && String(left.name)==="HTML" && op && op.type==="memberAccess" && /^[a-z][a-z0-9]*$/.test(String(op.name))) ctx.htmlUsed=true;   // name はトークン（text）
        return mkpost(left,op);
    });
	variable=varbuild.build();
	//項 := 関数呼出 | 変数
	var term = func_exe.or(variable); //simple.or(func_exe).or(variable);
    //文 := [変数  = ] 式
    var statement = variable.and(eq).ret(function (v) {
        return extend([(v&&v.lhs)?v.lhs:v,"="],{type:"assign",subnodes:arguments});
    }).opt().and(expr).ret(function (v,e) {
        return extend([(v||""),e,";\n"],{type:"statement",subnodes:arguments});
    });
    //プログラム := 文 . * (最後の.は省略可能)
	statement_list = statement.sep0(period.or(tag_period),true).and(period.opt()).
	ret(function(_stmts){
		var stmts=_stmts.slice();
	    var last=stmts.pop();
		if (useGenerator()) {
			return extend(["return AsyncByGenerator.toVal((function*() {",
				stmts,"return ",last,"}).apply(this));"],
			{type:"statement_list",subnodes:arguments,stmts:_stmts});
		}
	    return extend([stmts,"return ",last], {type:"statement_list",subnodes:arguments});
	});
    program = newScope(statement_list).and(space.opt());
	/*
	パーサに適用できるメソッド（いずれも新しいパーサを生成して返す）：
	メソッド                         新しく生成されるパーサの動作
	parser.and(parser2)       parser を解析し，続けて parser2 を解析する
	parser.ret(func)          parser の解析結果をfuncの第1引数に渡して，func を実行する．
	parser が複数のand でつながれている場合は， func は同じ数の引数をとる
	parser.or(parser2)        parser を解析し，解析に失敗したときは parser2 を解析する
	parser.opt()              parser を解析し，失敗した場合は何もせずに解析に成功する．  parser自身の解析が失敗した場合の解析結果はnull
	parser.rep0()             parser を0回以上繰り返し解析する．  解析結果は， parserの各回の解析結果の配列
	parser.rep1()             parser を1回以上繰り返し解析する．  解析結果は， parserの各回の解析結果の配列
	parser.sep1(sep, true)     parser を繰り返し解析するが，それぞれの繰り返しの間に sep を解析する． カンマ区切りの解析などに使う．
	第2引数が true の 場合，  解析結果は 各parserの解析結果の配列になる
	第2引数が false の 場合，  {head: parser(1回目) , [ {sep: sep(n回目), value: parser(n+1回目) } ] }
	*/
	function tap(x) {
	    console.log("tap",typeof x,x);
	    return x;
	}
	function joinary(a,s) {
	    if (a.length<2) return a;
	    //if (a.length>=2) console.log("JO",a);
	    //a=a.slice();
	    a.joined=s;
	    return a;
	}
	// 入力の正規化（2026-10-03 先生の決定。位置がずれないよう 1 文字→1 文字の置き換えだけ）:
	//   半角の ｢ ｣ ｡ → 「 」 。、全角の ＂ → "、文字列の外で「空白・記号の直後に数字が続く長音 ー」→ −（マイナス）。名前の中の ー（タイマー１）はそのまま
	var normalizeSource=function(str){
		var out="", inStr=false, closers="";
		var openers={'"':'"”“','”':'"”“','“':'"”“','『':'』','＂':'"”“'};
		for(var i=0;i<str.length;i++){
			var c=str[i], prev=out[out.length-1]||"\n";
			if(inStr){ if(closers.indexOf(c)>=0||c==="\n") inStr=false; out+=(c==="＂")?'"':c; continue; }
			if(c==="<"){ var tg=scanHtmlTag(str,i); if(tg){ out+=str.substr(i,tg.len); i+=tg.len-1; continue; } }   // HTML タグの中は文字列と同じく変えない
			if(c==="｢") c="「"; else if(c==="｣") c="」"; else if(c==="｡") c="。"; else if(c==="＂") c='"';
			else if((c==="ー"||c==="ｰ") && /[0-9０-９]/.test(str[i+1]||"") && /[\s　（(）)！!＝=：:＋+－\-−＊*／/、,「\[0-9０-９]/.test(prev)) c="−";   // １８０ー９０（引き算）も
			else if(c==="ｰ" && /^[\s　]+[0-9０-９]/.test(str.slice(i+1)) && /[\s　（(）)！!＝=：:＋+－\-−＊*／/、,「\[0-9０-９]/.test(prev)) c="−";   // 半角の ｰ は空白を挟んで数字が続くときも −（５ ｰ ３。V4 は以前から ｰ をマイナスに読む。2026-10-17）
			if(openers[c]){ inStr=true; closers=openers[c]; }
			out+=c;
		}
		return out;
	};
	parser.normalizeSource=normalizeSource;
	parser.scanHtmlTag=scanHtmlTag;   // 文字列・コメントと同じく中身を見ない領域として、dolittle_classify.js の stripStringsAndComments も使う
	// 編集画面の本文の整形（2026-10-17 先生の決定。読み込み時・貼り付け時・実行時に本文ごと書き換える。V4 の SourceNormalizer と同じ規則）:
	//   文字列（" ” “ 『 ＂ で囲んだ中）とコメント（// ／／ /* */ ／＊ ＊／）の中は変えない（＂→" だけは文字列の閉じにも必要なので文字列の中でも行う）
	//   1. 半角カナ（U+FF61〜FF9F）→ 全角。ｶﾞ→ガ は合成（文字数が減る）、｢｣｡､･→「」。、・、単独の ﾞﾟ→゛゜、ｰ は数字が続く（空白を挟んでも）なら −、名前の中は ー
	//   2. 空白・記号の直後で数字が直後に続く長音 ー → −（ー９０・１８０ー９０。normalizeSource と同じ規則）
	//   3. 全角の二重引用符 ＂ → "
	//   4. 数字と 2 文字以上の語の間に空白（１００歩く→１００ 歩く。reg_num と同じ規則。1 文字の単位 １００歩 と 0x/0b の数はそのまま）
	//   本文ごと書き換える前提なので、文字数が変わっても位置の問題は無い。state は文字列・コメントの中かどうかの引き継ぎ（貼り付けで本文の途中から整形するとき。editorScanState で求める）
	var ED_OPENERS={'"':'"”“＂','”':'"”“＂','“':'"”“＂','＂':'"”“＂','『':'』'};
	var ED_NAME=/[a-zａ-ｚA-ZＡ-Ｚ_＿$＄?？0-9０-９πーぁ-んァ-ヶｦ-ﾟ々〇〻㐀-鿿豈-﫿\uD840-𯰀-\uDFFF]/;
	var ED_OP=/[\s　（(）)！!＝=：:＋+－\-−＊*／/、,「\[0-9０-９]/;
	var ED_DIGIT=/[0-9０-９]/;
	// 各文字の領域（"c" コード / "s" 文字列 / "m" コメント）と末尾の状態
	var edScan=function(str,state){
		var inStr=!!(state&&state.inStr), closers=(state&&state.closers)||"", cm=(state&&state.comment)||"", kinds=new Array(str.length), bs=-9;
		for(var i=0;i<str.length;i++){
			var c=str[i];
			if(inStr){ kinds[i]="s"; if(closers.indexOf(c)>=0||c==="\n") inStr=false; continue; }
			if(cm==="line"){ if(c==="\n"){ cm=""; kinds[i]="c"; } else kinds[i]="m"; continue; }
			if(cm==="block"){ kinds[i]="m"; if((c==="/"||c==="／")&&(str[i-1]==="*"||str[i-1]==="＊")&&i>=bs+3) cm=""; continue; }
			if(ED_OPENERS[c]){ inStr=true; closers=ED_OPENERS[c]; kinds[i]="c"; continue; }
			if(c==="<"){ var tg=scanHtmlTag(str,i); if(tg){ for(var q=0;q<tg.len;q++) kinds[i+q]="s"; i+=tg.len-1; continue; } }   // HTML タグの中は文字列と同じ扱い（整形しない）
			if((c==="/"||c==="／")&&(str[i+1]==="/"||str[i+1]==="／")){ cm="line"; kinds[i]="m"; continue; }
			if((c==="/"||c==="／")&&(str[i+1]==="*"||str[i+1]==="＊")){ cm="block"; bs=i; kinds[i]="m"; continue; }
			kinds[i]="c";
		}
		return {kinds:kinds, state:{inStr:inStr,closers:closers,comment:cm}};
	};
	var editorScanState=function(str,state){ return edScan(String(str),state).state; };
	var edDigitFollows=function(str,i){ return /^[\s　]*[0-9０-９]/.test(str.slice(i,i+64)); };
	var normalizeEditorSource=function(str,state){
		str=String(str);
		if(!/[｡-ﾟー＂0-9０-９]/.test(str)) return str;
		// 1 周目: 1 文字単位の置き換え（半角カナ・ー→−・＂→"）
		var kinds=edScan(str,state).kinds, out="";
		for(var i=0;i<str.length;i++){
			var c=str[i], k=kinds[i];
			if(k==="m"){ out+=c; continue; }
			if(c==="＂"){ out+='"'; continue; }
			if(k==="s"){ out+=c; continue; }
			if(c>="｡"&&c<="ﾟ"){
				if(c==="ｰ"){ var prev=out[out.length-1]||"\n"; out+=(edDigitFollows(str,i+1)&&ED_OP.test(prev))?"−":"ー"; continue; }
				if(c==="ﾞ"||c==="ﾟ"){
					var p=out[out.length-1]||"", comb=(p+(c==="ﾞ"?"゙":"゚")).normalize("NFC");
					if(p&&comb.length===1) out=out.slice(0,-1)+comb; else out+=(c==="ﾞ"?"゛":"゜");
					continue;
				}
				out+=c.normalize("NFKC"); continue;
			}
			if(c==="ー"){ var pv=out[out.length-1]||"\n"; out+=(ED_DIGIT.test(str[i+1]||"")&&ED_OP.test(pv))?"−":c; continue; }
			out+=c;
		}
		// 2 周目: 数字と 2 文字以上の語の間に空白
		var s2=out; kinds=edScan(s2,state).kinds; out="";
		for(var j=0;j<s2.length;j++){
			var d=s2[j];
			if(kinds[j]!=="c"||!ED_DIGIT.test(d)||(j>0&&ED_NAME.test(s2[j-1]))){ out+=d; continue; }
			var e=j;
			if((d==="0"||d==="０")&&/[xXｘＸbBｂＢ]/.test(s2[j+1]||"")&&/[0-9０-９a-fA-Fａ-ｆＡ-Ｆ]/.test(s2[j+2]||"")){
				e=j+2; while(e<s2.length&&kinds[e]==="c"&&/[0-9０-９a-fA-Fａ-ｆＡ-Ｆ]/.test(s2[e])) e++;
			}else{
				while(e<s2.length&&kinds[e]==="c"&&ED_DIGIT.test(s2[e])) e++;
				if(/[.．]/.test(s2[e]||"")&&ED_DIGIT.test(s2[e+1]||"")&&kinds[e]==="c"){ e++; while(e<s2.length&&kinds[e]==="c"&&ED_DIGIT.test(s2[e])) e++; }
			}
			var w=e; while(w<s2.length&&kinds[w]==="c"&&ED_NAME.test(s2[w])) w++;
			out+=s2.slice(j,e)+((w-e>=2)?" ":"");
			j=e-1;
		}
		return out;
	};
	parser.normalizeEditorSource=normalizeEditorSource;
	parser.editorScanState=editorScanState;
	parser.parseAsNode=function (str,options) {
	    options=options||{};
	    var de=options.src?options.src+"で":"";
	    str=normalizeSource(String(str));
		var input=str+"\n";
		var output="";
		var line=1;
		ctx=context();
		ctx.usegen=AsyncByGenerator.supportsGenerator && input.indexOf("NOGENERATOR")<0;

	    //console.log("INP",input,input.length);
		var result = program.parseStr(input);
		parser.lastTagPeriods={src:str, at:{}};   // 省略した「。」の位置（この本文に限る）。実行前の検査が同じ本文に対して使う
		if(ctx.tagPeriods) for(var tp=0;tp<ctx.tagPeriods.length;tp++) parser.lastTagPeriods.at[ctx.tagPeriods[tp]]=true;
		if(result.success){
			output=result.result[0];
			if(ctx.htmlUsed && output && typeof output==="object") output.htmlUsed=true;   // プログラム全体で判定（実行の順序によらない）
			if(result.src.maxPos<str.length){
				var line=(str.substr(0,result.src.maxPos)).match(/\n/g);
				line=(line)?line.length:0;
				//alert("エラーが発生しました。\n"+line+"行目付近を確認してください。");
				var mesg=de+"エラーが発生しました。\n"+line+"行目付近を確認してください。";
				if (options.throwCompileErrorOnRuntime) {
    				return extend([
    				"throw new Error('"+mesg.replace(/\n/g,"\\n")+"');"
    				],{type:"ERROR",message:mesg});
				} else {
				    // 詰まった位置(maxPos=パースが最も進んだ位置)をエラーに添付。
				    // 分類器(dolittle_classify.js)が NO_VALUE/NO_OPERAND/演算子抜け等の具体判定に使う。
				    var err=new Error(mesg);
				    err.maxPos=result.src.maxPos;
				    throw err;
				}
			}
		}
        return output;
    };
	parser.parse=function (str,options) {
		var output=parser.parseAsNode(str,options);
		output=parser.node2js(output,options);
    	return output;
	};
	parser.node2js=function (p,options) {
		options=options||{};
	    var buf=options.indentBuffer || {
	        buf:"",
	        print:function (s) {
	            this.buf+=s;
	        },
	        addMapping:function (){}
	    };
		buf.print("root.system.run(function(){");
		if(p && p.htmlUsed) buf.print("root.system.htmlMode=true;");   // HTML モード（UI.js の autoLayout が見る。「HTML！使わない」で戻せる）
    	var gen=function(e){
		    if (e && typeof e.pos=="number") {
		        //console.log(e.pos);
		        buf.addMapping(e);
		    }
    		if(typeof e=="function") return gen(e());
    		else if(Array.isArray(e)) {
    		    var f=0;
    		    e.forEach(function (el) {
    		        if (f++) buf.print(e.joined||"");
    		        gen(el);
    		    });
    		} else {
    		    buf.print(e==null ? "" : e);
    		}
    	};
    	gen(p);
    	buf.print("});");
		return buf.buf;
    };
	return parser;
}();

MinimalParser.djsVersion="V4.06 (2026/10/31)";
return MinimalParser;
})();
