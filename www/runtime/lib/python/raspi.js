/*global SerialControl, ExportOutput*/
const e=new TextEncoder();
const d=new TextDecoder();
let w;
let rawSent;
let serialCtrl;
if (parent && parent.BABuilder) {
    serialCtrl=parent.BABuilder.serialControl;// new SerialControl();
} else {
    serialCtrl=new SerialControl();
    setTimeout( ()=>serialCtrl.render(document.querySelector("#control")),100);
}
if (serialCtrl.port) {
    run();
} else {
    serialCtrl.onPortReady=run;
}
serialCtrl.onEcho=onEcho;
const timeout=t=>new Promise(s=>setTimeout(s,t));
function rst() {
    clearConsole();
    w=serialCtrl.port.writable.getWriter();
    const bin=new Uint8Array([3, 4]);
    w.write(bin);
    w.releaseLock();
}
function ctrlC() {
    w=serialCtrl.port.writable.getWriter();
    const bin=new Uint8Array([3]);
    w.write(bin);
    w.releaseLock();
}
function clearConsole() {
    document.querySelector("#console").innerText="";
}
async function rstRun() {
    await rst();
    await timeout(100);
    await run();
}
async function run() {
    w=serialCtrl.port.writable.getWriter();
    //console.log(window.onEcho);
    const src=withRaw(document.querySelector("#prog").value);
    rawSent=true;
    const bin=e.encode(src);
    console.log(bin);
    w.write(bin);
    w.releaseLock();
}
function withRaw(s){
    return String.fromCharCode(1)+s+String.fromCharCode(4);
}
function withBS(s) {
    const lines=(s+"\n").replace(/\r/g,"").split("\n");
    const r=/^\s*/;
    let res="";
    let pdepth=0;
    const BS=String.fromCharCode(8);
    for(let line of lines) {
        const m=r.exec(line);
        const depth=m[0].length;
        while (depth<pdepth) {
            res+=BS;
            pdepth--;
        }
        res+=line.replace(r,"");
        pdepth=depth;
        res+="\r\n";
    }
    return res;
}
const echoHandlers=new Set();
const OKSeq=">OK";
const sendSeq=/\n#SEND (.*)\n/;
function onEcho(r) {
    let s=d.decode(r).replace(/\r/g,"");
    /*if (rawSent) {
        const i=s.indexOf(OKSeq);
        if (i>=0) {
            s=s.substring(i+OKSeq.length);
            clearConsole();
            rawSent=false;
        }
    }*/
    //console.log("S", s);
    document.querySelector("#console").innerText+=s;
    const cont=document.querySelector("#console").innerText;

    const m=sendSeq.exec(cont);
    if (m) {
        //console.log(cont, cont.length,  m.index, m[0], m[0].length, cont.substring( m.index+m[0].length ));
        document.querySelector("#console").innerText=cont.substring( m.index+m[0].length );
        const sending=$("<pre>").appendTo("#sentData");
        const cmd=cont.substring(m.index,m.index+m[0].length ).replace(/^\n/,"").replace(/\n$/,"");
        const text=cont.substring(0,m.index);
        sending.text(text+"\nRunning: "+cmd);
        const cdbr=/#SEND cdb ([\w\d]+)/;
        const m2=cdbr.exec(cmd);
        if (m2) {
            const key=m2[1];
            const sep=ExportOutput.inferSeparator(text);
            const data=ExportOutput.renderTable(sep, text);
            console.log( key, data);
            ExportOutput.postCDB(key, data).then(r=>{
                sending.text(text+"\nDone: "+cmd);
            }, e=> {
                sending.text(text+"\nError: "+cmd);
                console.error(e);
            });
        }
    }

    if (rawSent) {
        s=document.querySelector("#console").innerText;
        const i=s.indexOf(OKSeq);
        if (i>=0) {
            document.querySelector("#console").innerText=s.substring(i+OKSeq.length);
            rawSent=false;
        }
    }
    console.log(s);
}
function addEchoHandler(f) {
    echoHandlers.add(f);
    return f;
}
function removeEchoHandler(f) {
    echoHandlers.delete(f);
}
