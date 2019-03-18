/* global module*/
const common=sync=>{
    const src="www/js";
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
    const src="www/js/ctrans/";
    const dst="www/runtime/lib/c";
    sync(`${src}/lib.js`,dst);
    sync(`${src}/util.js`,dst);
    sync(`${src}/x.js`,dst);
    sync(`${src}/ctype.js`,dst);
    sync(`${src}/runc.js`,dst);
    sync(`${src}/scanf.js`,dst);
};
module.exports=sync=>{
    common(sync);
    c(sync);
};