/*global SerialControl*/
const OKSeq=">OK";
const EOTSeq="\x04\x04>";
const timeout=t=>new Promise(s=>setTimeout(s,t));
class RaspiREPL {
    constructor() {
        const e=new TextEncoder();
        const d=new TextDecoder();
        //let w;
        //let rawSent;
        let serialCtrl;
        this.e=e;
        this.d=d;
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
        this.serialCtrl=serialCtrl;
    }
    waitReady() {
        const {serialCtrl}=this;
        return new Promise((run,err)=>{
            if (serialCtrl.port) {
                run();
            } else {
                serialCtrl.onPortReady=run;
            }
        });
    }
    runCmd(script) {
        const {serialCtrl,d,e}=this;
        return new Promise((succ,err)=>{
            let buf="",th;
            if (!serialCtrl.port) {
                err(new Error("Port closed"));
            }
            serialCtrl.onEcho=(r) => {
                let s=d.decode(r).replace(/\r/g,"");
                console.log("repl s",s);
                buf+=s;
                if (th) clearTimeout(th);
                th=setTimeout(()=>{
                    const i=buf.indexOf(OKSeq);
                    if (i>=0) buf=buf.substring(i+OKSeq.length);
                    const j=buf.indexOf(EOTSeq);
                    if (j>=0) buf=buf.substring(0,j);
                    succ(buf);
                },50);
            };
            const w=serialCtrl.port.writable.getWriter();
            const src=withRaw(script);
            //rawSent=true;
            const bin=e.encode(src);
            //console.log(bin);
            w.write(bin);
            w.releaseLock();
        });
    }
    rst() {
        const {serialCtrl,d,e}=this;

        this.clearConsole();
        const w=serialCtrl.port.writable.getWriter();
        const bin=new Uint8Array([3, 4]);
        w.write(bin);
        w.releaseLock();
    }
    ctrlC() {
        const {serialCtrl,d,e}=this;
        const w=serialCtrl.port.writable.getWriter();
        const bin=new Uint8Array([3]);
        w.write(bin);
        w.releaseLock();
    }
    async rstRun() {
        await this.rst();
        await timeout(100);
        await this.run();
    }
    async run() {
        const {serialCtrl,d,e}=this;

        const w=serialCtrl.port.writable.getWriter();
        //console.log(window.onEcho);
        const src=withRaw(document.querySelector("#prog").value);
        //rawSent=true;
        const bin=e.encode(src);
        console.log(bin);
        w.write(bin);
        w.releaseLock();
    }
}
function withRaw(s){
    return String.fromCharCode(1)+s+String.fromCharCode(4);
}
window.RaspiREPL=RaspiREPL;
