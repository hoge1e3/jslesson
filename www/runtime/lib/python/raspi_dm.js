/*global SerialControl*/
const e=new TextEncoder();
const d=new TextDecoder();
let w;
let rawSent;
let serialCtrl;
const OKSeq=">OK";
const EOTSeq="\x04\x04>";
if (parent && parent.BABuilder && parent.BABuilder.serialControl) {
    serialCtrl=parent.BABuilder.serialControl;// new SerialControl();
} else {
    serialCtrl=new SerialControl();
    setTimeout( ()=>{
        let c=document.querySelector("#control");
        if (!c) {
            c=$("<div>").prependTo("body");
            c=c[0];
        }
        serialCtrl.render(c);
    },100);

}
function waitReady() {
    return new Promise((run,err)=>{
        if (serialCtrl.port) {
            run();
        } else {
            serialCtrl.onPortReady=run;
        }
    });
}
function runCmd(script) {
    return new Promise((succ,err)=>{
        let buf="",th;
        if (!serialCtrl.port) {
            err(new Error("Port closed"));
        }
        serialCtrl.onEcho=(r) => {
            let s=d.decode(r).replace(/\r/g,"");
            buf+=s;
            if (th) clearTimeout(th);
            th=setTimeout(()=>{
                const i=buf.indexOf(OKSeq);
                if (i>=0) buf=buf.substring(i+OKSeq.length);
                const j=buf.indexOf(EOTSeq);
                if (j>=0) buf=buf.substring(0,j);
                succ(buf);
            },100);
        };
        w=serialCtrl.port.writable.getWriter();
        const src=withRaw(script);
        //rawSent=true;
        const bin=e.encode(src);
        console.log(bin);
        w.write(bin);
        w.releaseLock();
    });
}
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
