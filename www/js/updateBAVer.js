/* global require */
const fs=require("fs");

const indexF="../index.html";
const c=fs.readFileSync(indexF, {encoding:"utf8"});
const v=()=>{
    function dec(v,n) {v="0"+v;return v.substring(v.length-2);}
    const da=new Date();
    const fn=""+da.getFullYear()+dec(da.getMonth()+1)+dec(da.getDate())+
    dec(da.getHours())+dec(da.getMinutes())+dec(da.getSeconds());
    return fn;
};
const nc=c.replace(/"([0-9]+)"\s*,\s*\/\/VERSION_STRING/, s=> s.replace(/[0-9]+/,v()));
//console.log(nc);
fs.writeFileSync(indexF, nc);
