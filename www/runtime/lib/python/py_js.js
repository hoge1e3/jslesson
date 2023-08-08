/* global self, global */
define([],function () {
    function install(PL) {
        const lib=PL.root;
        Function.prototype.new=function (...args) {
            return new this(...args);
        };
        return lib;
    }
    return {install};
});
