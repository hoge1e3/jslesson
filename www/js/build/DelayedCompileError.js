define(function (require, exports, module) {
    const stringifyError=require("stringifyError");
    module.exports=function (e) {
        const src=e.src;
        const pos=e.node?e.node.pos:e.pos;
        const o=stringifyError(e);
        const errSrc=`var e=new Error(${JSON.stringify(e.message)});
        var o=${JSON.stringify(o)};
        for (var k of o) {e[k]=o[k];}
        e.isCompileError=true;
        if (window.parent && typeof window.parent.closeRunDialog==='function') {
            "window.parent.closeRunDialog();
        }
        throw e;`;
        return errSrc;
    };
});
