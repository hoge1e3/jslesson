/* ドリトルV4（オンライン版ドリトル djs）のビルダー。
   esm/build/dolittle/DtlBuilder.js（0b3bdd8, 2026-10-23）を写し、次の 3 点だけ変えた:
     1. トランスパイラ: ./../../dolittle/minimal.js → ./../../dolittle4/minimal.js（djs のものを 1 ファイルにまとめた版）
     2. 実行画面が読む起動スクリプト: lib/dtl/runDtl.js → lib/dtl4/runDtl.js
     3. サーバーで実行する形（RUN_AT_SERVER / dtlvm）と「古い端末で表示する」（NOGENERATOR）は入れていない
     4. 文法の誤りのとき、djs の編集画面と同じ説明（誤りの種類・行・直し方の例）をエラーの文に入れる（./../../dolittle4/diagnose.js。2026-11-12）。
        トランスパイラが止まらない「」・"・（）の数の不一致も、djs と同じく実行前に止める
   置き場所: www/esm/build/dolittle4/Dtl4Builder.js */

import DU from "./../../lib/DeferredUtil.js";
import dtlParser from "./../../dolittle4/minimal.js";
import dtlDiagnose from "./../../dolittle4/diagnose.js";
import IndentBuffer from "./../../lang/IndentBuffer.js";
import Sync from "./../../fs2/sync2.js";
import FS from "./../../fs/fs2stub.js";
import SplashScreen from "./../../lib/SplashScreen.js";
import root from "./../../lib/root.js";
import WebSite from "./../../runtime/WebSite.js";
import {filterSameOriginUrls} from "../runtimeDetector.js";

var Dtl4Builder=root.Dtl4Builder=function (prj, dst) {
    this.prj=prj;// TPRC
    this.dst=dst;// SFile in ramdisk
};
var p=Dtl4Builder.prototype;
p.progress=function (m) {
    if (window.SplashScreen) window.SplashScreen.progress(m);
};

p.genHTML=function (f) {
    this.progress("generate "+f.src.html.name());
    var dp=new DOMParser();
    var dom=dp.parseFromString(f.src.html.text()||"<html></html>","text/html");
    var html=dom.getElementsByTagName("html")[0];
    var head=dom.getElementsByTagName("head")[0];
    var body=dom.getElementsByTagName("body")[0];
    $(head).append($("<meta>").attr("charset","UTF-8"));
    if (window.BitArrow) {
        var BitArrow=window.BitArrow;
        var ba={
            version:BitArrow.version,
            urlArgs:BitArrow.urlArgs,
            publishedURL:BitArrow.publishedURL,
            runtimePath_candidates:[WebSite.runtime_in_service, WebSite.runtime],
            serverTop: WebSite.serverTop,
            main:f.name};
        $(head).append($("<script>").text(`
            ${filterSameOriginUrls}
            window.BitArrow=${JSON.stringify(ba)};
            window.BitArrow.runtimePath=filterSameOriginUrls(window.BitArrow.runtimePath_candidates);
        `));
    }
    (["lib/require.js","lib/dtl4/runDtl.js"]).map(function (r) {
        return WebSite.runtime+r;
    }).forEach(function (src) {
        var nn=document.createElement("script");
        nn.setAttribute("charset","utf-8");
        var src2;
        var requirejs=root.requirejs;
        if (FS.PathUtil.isURL(src) && requirejs.version!=="2.1.9" && typeof requirejs.s.contexts._.config.urlArgs==="function") {
            src2=src+requirejs.s.contexts._.config.urlArgs("",src);
        } else {
            src2=src+(src.indexOf("?")<0?"?":"&")+Math.random();
        }
        nn.setAttribute("src",src2);
        body.appendChild(nn);
    });
    return f.dst.html.text("<!DOCTYPE HTML>\n<html>"+html.innerHTML+"</html>");
};
// エラーの窓（js/ide/ErrorDialog.js）は、エラーに src と pos があるとプログラムを表示して、その位置に印を付ける（実行時の誤りと同じ見え方）。
// 説明の行の、最初の文字の位置を渡す
function markLine(e, name, srcText, line) {
    if (!e || !(line>0)) return e;
    var lines=srcText.split("\n");
    if (line>lines.length) return e;
    var pos=0;
    for (var i=0;i<line-1;i++) pos+=lines[i].length+1;
    pos+=lines[line-1].length-lines[line-1].replace(/^[ \t\u3000]+/,"").length;
    e.src={text:srcText, name:name};
    e.pos=pos;
    return e;
}
function isNewer(a,b) {
    if (!a.exists()) return false;
    return a.lastUpdate()>b.lastUpdate();
}
p.build=function (options) {
    options=options||{};
    var mainFilePath=options.mainFile && options.mainFile.path();
    var curPrj=this.prj;
    var dst=this.dst;
    var t=this;
    var files=[];
    return DU.each(curPrj.dir.ls(),function (n) {
        if (FS.PathUtil.ext(n)!=".html")  return;
        var f=curPrj.dir.rel(n);
        var name=f.truncExt();
        var html=f;
        var dtl=f.up().rel(name+".dtl");
        if (!dtl.exists()) return;
        files.push({name:name,
            src:{html:html,dtl:dtl},
            dst:{
                html:dst.rel(name+".html"),
                js:dst.rel(name+".js"),
                map: dst.rel(name+".js.map")
            }
        });
        return SplashScreen.waitIfBusy();
    }).then(DU.tr(function () {
        return DU.each(files,function (f) {
            t.progress("Transpile "+f.src.dtl.name());
            var isMainFile=(f.src.dtl.path()==mainFilePath);
            if (!isMainFile && isNewer(f.dst.js, f.src.dtl) && isNewer(f.dst.html, f.src.html)) return SplashScreen.waitIfBusy();
            var buf=IndentBuffer({dstFile:f.dst.js,mapFile:f.dst.map});
            buf.setSrcFile(f.src.dtl);
            var srcText=f.src.dtl.text();
            try {
                dtlParser.parse(srcText,{
                    indentBuffer:buf,
                    src:f.src.dtl.name(),
                    srcPath: f.src.dtl.path(),
                    throwCompileErrorOnRuntime:!isMainFile
                });
            } catch (e) {
                // 文法の誤り: 「N行目付近を確認してください」だけの文を、誤りの種類・行・直し方の例の入った文に置き換える
                var ex=null;
                try { ex=dtlDiagnose.explain(srcText, dtlParser); } catch (de) { console.log("dtl4 diagnose fail", de); }
                if (ex && ex.text && e && typeof e.message==="string") {
                    e.message=f.src.dtl.name()+"でエラーが発生しました。 "+ex.text;
                    markLine(e, f.src.dtl.name(), srcText, ex.line);
                }
                throw e;
            }
            if (isMainFile) {
                // トランスパイラは通るが、「」・"・（）の数が合っていない（djs の編集画面が実行前に止めるもの）
                var pre=null;
                try { pre=dtlDiagnose.precheck(srcText); } catch (de) { console.log("dtl4 precheck fail", de); }
                if (pre && pre.text) throw markLine(new Error(f.src.dtl.name()+"でエラーが発生しました。 "+pre.text), f.src.dtl.name(), srcText, pre.line);
            }
            buf.close();
            t.genHTML(f);
            return SplashScreen.waitIfBusy();
        });
    }));
};
p.upload=function (pub) {
    return Sync.sync(this.dst,pub);
};
export default Dtl4Builder;
