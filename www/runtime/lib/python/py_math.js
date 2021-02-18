/* global self, global */
define([],function () {
    function install(PL) {
        const lib=PL.import.libs.math={
            fabs:Math.abs.bind(Math),
            ceil:Math.ceil.bind(Math),
            floor:Math.floor.bind(Math),
            sqrt:Math.sqrt.bind(Math),
        };
        console.log("py_math", Object.keys(lib));
        return lib;
    }
    return {install};
});
