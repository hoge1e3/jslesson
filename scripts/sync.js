/* global module*/
const c=sync=>{
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
module.exports=sync=>{
    c(sync);
};
