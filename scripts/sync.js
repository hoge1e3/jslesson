/* global module*/
const common=sync=>{
    const src="www/es5";
    const dst="www/runtime/lib";

    sync(`${src}/lib/assert.js`,dst);
    sync(`${src}/lib/Klass.js`,dst);
    sync(`${src}/fs2/FS.js`,dst);
    sync(`${src}/ctrans/AsyncByGenerator.js`,dst);

    sync(`${src}/lang/context.js`,dst);
    sync(`${src}/lib/DeferredUtil.js`,dst);
    sync(`${src}/lib/jquery-1.12.1.js`,dst);
    sync(`${src}/lib/require.js`,dst);
    sync(`${src}/lib/util.js`,dst);
};
const c=sync=>{
    const src="www/es5/ctrans/";
    const dst="www/runtime/lib/c";
    sync(`${src}/lib.js`,dst);
    sync(`${src}/util.js`,dst);
    sync(`${src}/x.js`,dst);
    sync(`${src}/ctype.js`,dst);
    sync(`${src}/runc.js`,dst);
    sync(`${src}/scanf.js`,dst);
};
const py=sync=> {
    const src="www/es5/build/python/";
    const dst="www/runtime/lib/python";
    sync(`${src}/PyLib.js`,dst);

};
const tjs=sync=> {
    const src="www/es5/runtime/";
    const dst="www/runtime/lib/tjs";
    sync("www/es5/runtime/TonyuRuntime.js",dst);
};
module.exports=sync=>{
    common(sync);
    c(sync);
    py(sync);
    tjs(sync);
};
