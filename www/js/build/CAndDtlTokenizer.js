define(function (require,exports,module) {
    const TokenizerDef=require("GenericTokenizer").TokenizerDef;
    const d=new TokenizerDef();
    d.setSpace(/^(\s*(\/\*\/?([^\/]*([^*]\/)*[\r\n]*)*\*\/)*(\/\/.*\r?\n)*)*/);
    //d.addToken(/^hoge/,"hoge");
    var str_name = "[a-zａ-ｚA-ZＡ-Ｚ_＿\\$＄\\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF][a-zａ-ｚA-ZＡ-Ｚ_＿\\$＄\\?？0-9０-９ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]*";
    var reg_name = RegExp("^"+str_name);// 名前の正規表現
    d.addToken(reg_name,"sym");
    var reg_num = /^(([0０][bBｂＢ][01０１]+)|([0０][xｘXＸ][0-9０-９a-fA-Fａ-ｆＡ-Ｆ]+)|([0-9０-９]+([.．]([0-9０-９])+)?))([a-zA-Z_$\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF][a-zA-Z_$\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]*)?/;//数字を表す正規表現
    d.addToken(reg_num,"num");
    d.addToken(/^[\{\(\[｛（「『]/,"open");
    d.addToken(/^[\}\)\]｝）」』]/,"close");
    d.addToken(/^'([^\\']*(\\.)*)*'/,"single");
    d.addToken(/^"([^\\"]*(\\.)*)*"/,"double");
    const token=r=>({ret:f=>d.addToken(r,f()) });
    var colon=token(/^[:：]/).ret(function(){return ":";});
    var stick=token(/^[|｜]/).ret(function(){return "|";});
    var period=token(/^[.。．]/).ret(function(){return ".";});
    var excr=token(/^[!！]/).ret(function(){return "!";});
    var semicolon=token(/^[;；]/).ret(function(){return ";";});
    var eq=token(/^[=＝]/).ret(function(){return "=";});
    var add=token(/^[+＋]/).ret(function(){return "+";});
    var sub=token(/^[-−–－]/).ret(function(){return "-";});
    var mul=token(/^[*×＊∗]/).ret(function(){return "*";});
    var div=token(/^[\/÷／]/).ret(function(){return "/";});
    var gt=token(/^[>＞]/).ret(function(){return ">";});
    var ge=token(/^(?:[>＞][=＝])|≧/).ret(function(){return ">=";});
    var lt=token(/^[<＜]/).ret(function(){return "<";});
    var le=token(/^(?:[<＜][=＝])|≦/).ret(function(){return "<=";});
    var neg=token(/^(?:[!！][=＝])|≠/).ret(function(){return "!==";});
    var mod=token(/^[%％]/).ret(function(){return "%";});
    d.addToken(/^./,"other");
    return d;
});
