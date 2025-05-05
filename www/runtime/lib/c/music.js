/*global global,self*/
(function () {
    // same with root.js
    function getRoot() {
        if (typeof window !== "undefined") return window;
        if (typeof self !== "undefined") return self;
        if (typeof global !== "undefined") return global;
        return function () {
            return this;
        }();
    }
    var root = getRoot();
    var lib = root.BA_C.lib;
    var util = root.BA_C.util;
    lib.play = async function (...args) {
        const {play, initMML}=await import(BitArrow.runtimePath+"lib/mml_ba.js");
        await initMML();
        const mmls=args.map(s=>util.ch_ptr_to_str(s))
        console.log("play",...mmls);
        return await play(...mmls);
    };
})();