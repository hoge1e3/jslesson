define(function (require, exports, module) {
    module.exports=function (e) {
        var eobj={stack:e.stack,message:e.message, strMesg:e+""};
        //console.log("strerr",e);
        if (Array.isArray(e.stack)) {
            for (let stack of e.stack) {
                //console.log("Stack!",stack);
                if (typeof stack.file==="object" && 
                    typeof stack.file.path==="function") {
                    stack.file=stack.file.path();
                }
            }    
        }
        for (let k in e) {
            const v=e[k];
            if (v && typeof v.text==="function" && typeof v.name==="function") {
                eobj[k]={
                    name: v.name(),
                    text: v.text(),
                };
            } else {
                eobj[k]=v;
            }
            /*else if (typeof v==="number") {
                eobj[k]=v;
            } else {
                eobj[k]=v+"";
            }*/
        }
        return eobj;
    };
});
