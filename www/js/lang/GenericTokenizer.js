define(function (require,exports,module) {
class TokenizerDef {
  constructor() {
    this.tokens=[];
  }
  setSpace(reg) {
    this.space=reg;
  }
  addToken(reg, type) {
    this.tokens.push({reg,type});
  }
  tokenizer(str) {
    return new Tokenizer(this,str);
  }
}
class Tokenizer {
  constructor(def, str) {
    this.def=def;
    this.str=str;
    this.pos=0;
    this.row=0;
    this.col=0;
  }
  skipSpace() {
    this.match(this.def.space,"space");
  }
  heading(){return this.str.substring(this.pos);}
  match(reg, type) {
    const m=reg.exec(this.heading());
    if (!m) return false;
    const res={
      type,
      text:m[0],
      pos:this.pos,
      row:this.row,
      col:this.col,
      toString: function(){return this.text;}
    };
    this.proceed(m[0]);
    return res;
  }
  proceed(token) {
    const ts=token.split("\n");
    const lts=ts.pop();
    this.pos+=token.length;
    if (ts.length===0) this.col+=lts.length;
    else {
      this.row+=ts.length;
      this.col=lts.length;
    }
  }
  next() {
    const def=this.def;
    this.skipSpace();
    for (let t of def.tokens) {
      const m=this.match(t.reg,t.type);
      if (m) return m;
    }
    return false;
  }
  tokenize(options={}) {
    const result=[];
    while(true) {
      const m=this.next();
      if (!m) break;
      if (m.text.length===0) throw new Error("Zero length token : "+m.type);
      result.push(m);
    }
    if (!options.surpressError && this.heading().length) {
      const e= new Error(`Tokenize incomplete at (${this.row}:${this.col})`);
      e.pos=this.pos;
      e.row=this.row;
      e.col=this.col;
      throw e;
    }
    return result;
  }
}
module.exports={Tokenizer,TokenizerDef};
});
