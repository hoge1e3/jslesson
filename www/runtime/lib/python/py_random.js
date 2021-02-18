/* global self, global */
define([],function () {
    function install(PL) {
        var lib=PL.import.libs.random={
            random: Math.random,
            randrange: function (...args) {
                return this.choice(PL.range(...args));
            },
            randint: function (a,b) {
                return Math.floor(Math.random()*(b-a+1))+a;
            },
            shuffle: function (list) {
                for (let i=list.length-1; i>=0 ;i--) {
                    const e=list.splice(this.randint(i),1);
                    list.push(e[0]);
                }
                return list;
            },
            sample: function (list) {
                return this.shuffle(list.slice());
            },
            choice: function (seq) {
                return seq[this.randint(0,seq.length-1)];
            }
        };
        console.log("py_random", Object.keys(lib));
        return lib;
    }
    return {install};
});
