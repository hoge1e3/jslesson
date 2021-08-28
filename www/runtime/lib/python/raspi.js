/*global SerialControl*/
const e=new TextEncoder();
const d=new TextDecoder();
let w;
let rawSent;
let serialCtrl=parent.BABuilder.serialControl;// new SerialControl();
//setTimeout( ()=>serialCtrl.render(document.querySelector("#control")),100);
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
    document.querySelector("#console").innerText+=s;
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
