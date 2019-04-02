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
    const reserved=[
        "class","def","if","else","elif","break","continue",
        "for","while","in","return","print","import","as",
        "and","or","not","global","True","False","del"
    ];
    const resvh={};for(const r of reserved) resvh[r]=r;
    const puncts=[">=","<=","==","!=","+=","-=","*=","/=","%=","**","//",
      ">","<","=",".",":","+","-","*","/","%","(",")","[","]",","];
    const tdef={
        tokens: [{"this":tokens.rep0("token")}, /^\s*/ ,P.StringParser.eof],
        //token: tokens.or(...reserved.concat(["quote","symbol","number","qsymbol",":"])),
        token: tokens.or(...["literal","symbol","number"].concat(puncts)),
        symbol: tokens.toParser(/^[a-zA-Z$_][a-zA-Z$_0-9]*/).ret((r)=>{
            //console.log("RDS",r);
            if (resvh[r]) r.type=resvh[r];
            return r;
        }),
        number: /^[0-9]+[0-9\.]*/,
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
    };
    for (let p of puncts) tdef[p]="'"+p;
    //for (const r of reserved) tdef[r]="'"+r;
    //console.log("tdef",tdef);
    tokens.def(tdef);
    class Tokenizer {
        constructor(src) {
            this.src=src;
            this.pos2rc=new Pos2RC(src);
        }
        tokenize() {
            const src=this.src;
            const ind=/^\s*/;
            const depths=[];
            this.tokens=[];
            this.pos=0;
            var lineNo=0;
            for (let line of src.split("\n")) {
                line=line.replace("\r","");
                let r=ind.exec(line);
                const d=r[0].length;
                //console.log("depth",lineNo+1, d,depths);
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
                const tks=this.tokenizeLine(line,lineNo);
                for (const tk of tks) {
                    tk.pos+=this.pos;
                    const rc=this.pos2rc.getRC(tk.pos);
                    tk.row=rc.row;
                    tk.col=rc.col;
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
    const gdef={
        //$space: spc,
        program: [{body:rep0(or("stmt","classdef"))},P.TokensParser.eof],
        classdef: ["class",{name:"symbol"},":indent",
            {body:"stmtList"},
        "dedent"],
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
        stmt: or("define","printStmt","printStmt3","ifStmt","whileStmt","breakStmt","continueStmt","letStmt","exprStmt","forStmt","returnStmt","delStmt","importStmt","globalStmt","nodent"),
        importStmt: ["import",{name:"packageName"},{$extend:opt(["as",{alias:"symbol"}])}],
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
        breakStmt: ["break"],
        continueStmt: ["continue"],
        forStmt: ["for",{var:"symbol"},"in",{set:"expr"},{do:"block"}],
        letStmt: [{left:"lval"},"=",{right:"expr"}],
        globalStmt: ["global",{names:sep1("symbol",",")}],
        // print(x,y) parsed as: printStmt(2) with tuple
        printStmt: ["print",{values:sep1("expr",",")},{nobr:opt(",")}],
        // print(x,end="") parsed as: printStmt3
        printStmt3: ["print", {args:"args"}],
        lval: or("singleLval","tupleLval"),
        singleLval: g.expr({
            element: "symbol",
            operators: [
                ["postfix" , or("args" , "memberRef", "index") ] // (a,b)  .x
            ]
        }),
        tupleLval: ["(",{body:sep1("singleLval",",")},")"],
        expr: g.expr({
            element: "elem",
            operators: [
                //["infixr", "="  ] , //  = 右結合２項演算子
                ["infixl", or("+=","-=","*=","/=","%=")],
                ["infixl", or("or")  ] ,
                ["infixl", or("and")  ] ,
                ["infixl", or(">=","<=","==","!=",">","<")  ] , //  + -  左結合２項演算子
                ["infixl", or("+","-")  ] , //  + -  左結合２項演算子
                ["infixl", or("//","*","/","%")  ] , //  * 左結合２項演算子
                ["infixl", or("**")],
                ["prefix",or("not","-")],
                ["postfix" , or("args" , "memberRef","index") ] , // (a,b)  .x
            ]
        }),
        memberRef: [".",{name:"symOrResv"}],
        args: ["(",{body:sep0("arg",",")},")"],
        array: ["[",{body:sep0("expr",",")},"]"],
        index: ["[",{body:sep1("expr",":")},"]"],
        arg: [ {name:opt([{this:"symbol"},"="])}, {value:"expr"}],
        block: [":indent",{body:"stmtList"},"dedent"],
        elem: or("symbol","number","bool","array","literal","paren","tuple"),
        paren: ["(",{body:"expr"},")"],
        bool: or("True","False"),
        tuple: ["(",{body:sep0("expr",",")},")"],
        indent: tk("indent"),
        dedent: tk("dedent"),
        nodent: tk("nodent"),
        symOrResv: or(...reserved.concat(["symbol"])),
    };
    for (const k in tdef) {
        if (!k.match(/^\$/) && !gdef[k]) gdef[k]=tk(k);
    }
    for (const k of reserved) {
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
