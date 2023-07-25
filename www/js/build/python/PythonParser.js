define(["Grammar2","Pos2RC"/*,"TError"*/],
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
    /*
    メインにreturn
    range引数
    */
    const reserved=[
        "class","def","if","else","elif","break","continue",
        "for","while","in","return","print","import","as",
        "and","or","not","global","True","False","del",
        "finally","is","None","lambda","try","from" ,"nonlocal","with","yield",
        "assert","pass","except","finally", "raise","super"
       ];
    const resvh={};
    for(let r of reserved) resvh[r]=r;
    const puncts=[">=","<=","==","!=","+=","-=","*=","/=","%=","**","//",
      ">","<","=",".",":","+","-","*","/","%","(",")","[","]","{","}",",",";"];
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
            const lineSep=/\r\n|\n|\r/g;
            const lines=[];
            let pos=0;
            while(true) {
                const m=lineSep.exec(src);
                if (!m) break;
                const to=m.index+m[0].length;
                lines.push(src.substring(pos,to));
                pos=to;
            }
            //console.log("lines",lines);
            for (let lineBR of lines) {
                let line=lineBR.replace(/[\r\n]/g,"");
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
                this.pos+=lineBR.length;
                lineNo++;
            }
            return this.tokens;
        }
        error(mesg, col=0) {
            const e=new Error(mesg);
            e.pos=this.pos+col;
            return e;
        }
        tokenizeLine(line,lineNo) {
            //console.log("parse token",line);
            const r=tokens.get("tokens").parseStr(line);
            if (!r.success) {
                console.log("Tokenize error", r);
                throw this.error("字句エラー "+(lineNo+1)+":"+(r.src.maxPos+1), r.src.maxPos);
            }
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
        dedentOrEOT: or("dedent",P.TokensParser.eof),
        nodentOrEOT: or("nodent",P.TokensParser.eof),
        classdef: ["class",{name:"symbol"},{"extends":opt("extends")},":indent",
            {body:"stmtList"},
        "dedentOrEOT"],
        extends: ["(",{super:"expr"},")"],
        define: ["def",{name:"symbol"},{params:"paramList"},":indent",
            {body:"stmtList"},
        "dedentOrEOT"],
        paramList: ["(",{body:sep0("param",",")},")"],
        param: [{name:"symbol"}, {defVal:opt("defVal")}],
        defVal: ["=",{value:"expr"}],
        ":indent": [":","indent"],
        //nodedent: [rep0("nodent"),"dedent"],
        //defList: rep0("define"),
        stmtList: rep1("stmt"),
        oneLineStmtList: rep1("oneLineStmt"),
        // why printStmt -> printStmt3?
        // because if parse print(x), as printStmt3, comma remains unparsed.
        stmt: or("oneLineStmt","nodent"),
        oneLineStmt: or("define","printStmt","printStmt3","ifStmt","whileStmt","breakStmt","continueStmt","letStmt","exprStmt","passStmt","forStmt","returnStmt","delStmt","importStmt2","fromImportStmt","globalStmt","tryStmt","semicolon"),
        fromImportStmt: ["from",{name:"packageName"},"import",{localNames:"localNames"}],
        semicolon: [tk(";")],
        localNames: [{names:or(sep1("symbol",","),"*")}],
        importStmt: ["import",{name:"packageName"},{$extend:opt(["as",{alias:"symbol"}])}],
        importStmt2: ["import",{elements:sep1("importElement",",")}],
        importElement: [{name:"packageName"},{$extend:opt(["as",{alias:"symbol"}])}],
        packageName: sep1("symbol","."),
        exprStmt: [{expr:"expr"}],
        delStmt: ["del",{expr:"expr"}],
        returnStmt: ["return",{expr:opt("expr")}],
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
        tryStmt: ["try",{body:"block"},{exceptParts:rep0("exceptPart")},{finallyPart:opt("finallyPart")}],
        exceptPart: ["except",{exceptParam: opt("exceptParam")}, {body:"block"}],
        exceptParam: [{eType: "symbol"}, {asName: opt(["as", {name:"symbol"}])}],
        finallyPart: ["finally",{body:"block"}],
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
        // t regards it a tuple
        exprList: g.toParser( [{body:sep1("expr",",")},{t:tailC}]),/*.ret(
            (r)=>r.body.length==1&&!r.t ? r.body[1]:r
        )*/
        exprSliceList: g.toParser( [{body:sep1(or("slice","expr"),",")},{t:tailC}]),
        expr: g.expr({
            element: "elem",
            operators: [
                //["infixr", "="  ] , //  = 右結合２項演算子
                //["infixl", or("+=","-=","*=","/=","%=")],
                ["infixl", or("or")  ] ,
                ["infixl", or("and")  ] ,
                ["infixl", or("in",">=","<=","==","!=",">","<","isnt","is")  ] , //  + -  左結合２項演算子
                ["infixl", or("+","-")  ] , //  + -  左結合２項演算子
                ["infixl", or("//","*","/","%")  ] , //  * 左結合２項演算子
                ["infixl", or("**")],
                ["prefix",or("not","-")],
                ["postfix" , or("args" , "memberRef","index") ] , // (a,b)  .x
            ]
        }),
        isnt: ["is","not"],
        memberRef: [".",{name:"symOrResv"}],
        args: ["(",{body:sep0("arg",",")},")"],
        listComprehension: ["[",{elem:"expr"},"for",{vars:sep1("symbol",",")},"in",{set:"expr"},"]"],
        array: ["[",{body:sep0("expr",",")},"]"],
        dict: ["{",{body:sep0("dictEntry",",")},"}"],
        dictEntry: [{key:"literal"},":",{value:"expr"}],
        index: ["[",{body:"exprSliceList"},"]"],
        //index: ["[",{body:or("slice","exprList")},"]"],
        slice: or(  "slice111", "slice110", "slice101", "slice100",
                    "slice011", "slice010", "slice001", "slice000").ret(addTypeF("slice")),
        // :   ::
        slice000: [":",opt(":")],
        // ::z
        slice001: [":",":",{step:"expr"}], // lose by slice000
        // :y   :y:
        slice010: [":",{stop:"expr"},opt(":")],
        // :y:z
        slice011: [":",{stop:"expr"},":",{step:"expr"}],
        // x:  x::
        slice100: [{start:"expr"},":",opt(":")],
        // x::z
        slice101: [{start:"expr"},":",":",{step:"expr"}],
        // x:y  x:y:
        slice110: [{start:"expr"},":",{stop:"expr"},opt(":")],
        // x:y:z
        slice111: [{start:"expr"},":",{stop:"expr"},":",{step:"expr"}],
        arg: [ {name:opt([{this:"symbol"},"="])}, {value:"expr"}],
        block: or([":",{body:"oneLineStmtList"},"nodentOrEOT"], [":indent",{body:"stmtList"},"dedentOrEOT"]),
        elem: or("symbol","number","None","bool","listComprehension","array","dict","literal3","literal","paren","superCall","lambdaExpr"),
        lambdaExpr: ["lambda",{param:"symbol"},":",{returns:"expr"}],
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
    function addTypeF(type) {
        return r=>{r.type=type;return r;};
    }
    //console.log("gdef",gdef);
    g.def(gdef);
    //console.log("gdefed",g);
    g.Tokenizer=Tokenizer;
    g.parse=function (srcFile) {
        let src=srcFile.text();
        src=src.replace(/\s*$/,"\n");
        //console.log("SRC",JSON.stringify(src));
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
