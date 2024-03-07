/* global self, global */
define([],function () {
    function install(PL) {
        function toJs(pobj) {
            if (PL.isArrayLike(pobj)) {
                return Array.from(pobj).map(toJs);
            }
            if (PL.isinstance(pobj, PL.dict)) {
                const res={};
                for (let k of pobj) {
                    res[k]=toJs(pobj.__getitem__(k));
                }
                return res;    
            }
            if (pobj && typeof pobj==="object") throw new Error("このオブジェクトはJSONに変換できません．");
            return pobj;
        }
        function toPy(jobj) {
            if (PL.isArrayLike(jobj)) {
                return Array.from(jobj).map(toPy);
            }
            if (jobj && typeof jobj==="object") {
                const res=PL.dict({});
                for (let k in jobj) {
                    res.__setitem__(k, toPy(jobj[k]));
                }
                return res;
            }
            return jobj;
        }
        const lib={
            async get(key) {
                return toPy( await PL.ctrl.get("CDB/get",{key}) );
            },
            async post(key, data) {
                return await PL.ctrl.post("CDB/post",{key,data:JSON.stringify(toJs(data))});
            }
        };
        return lib;
    }
    return {install};
});
