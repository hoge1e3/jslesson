/* global self, global */
define([],function () {
    function install(PL) {
        const lib=PL.import.libs.time={
            sleep(sec) {
                return new Promise((s)=>{
                    setTimeout(s,sec*1000);
                });
            }
        };
        console.log("py_time", Object.keys(lib));
        return lib;
    }
    return {install};
});
