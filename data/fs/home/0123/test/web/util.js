export const timeout=(t)=>new Promise((s)=>setTimeout(s,t));
export const print=(s)=>{
    document.body.appendChild(document.createTextNode(`${s}`));
    document.body.appendChild(document.createElement(`BR`));
};
