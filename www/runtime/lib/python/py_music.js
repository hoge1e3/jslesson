/* global self, global */
define([],function () {
    function install(PL) {
        var lib=PL.import.libs.g={};
        // same with root.js
        function getRoot(){
            if (typeof window!=="undefined") return window;
            if (typeof self!=="undefined") return self;
            if (typeof global!=="undefined") return global;
            return (function (){return this;})();
        }
        var root=getRoot();
        let mod;
        async function loadMod() {
            mod=mod||await import(BitArrow.runtimePath+"lib/mml_ba.js");
            return mod;
        }
        lib.play = async function (...args) {
            const {play, initMML}=await loadMod();
            await initMML();
            const mmls=args;//.map(s=>util.ch_ptr_to_str(s))
            console.log("play",...mmls);
            return await play(...mmls);
        };    
        lib.play_time=async ()=>{
            const {playTime}=await loadMod();
            return playTime();
        };
        lib.play_stop=async ()=>{
            const {playStop}=await loadMod();
            playStop();
        };
        console.log("py_music", Object.keys(lib));
        return lib;
    }
    return {install};
});
