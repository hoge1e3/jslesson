scopes_0 = window;
/* scopes_0 . printf = function (){} ;
 */
/* scopes_0 . scanf = function (){} ;
 */
/* scopes_0 . sleep = function (){} ;
 */
/* scopes_0 . usleep = function (){} ;
 */
scopes_0.main = function* main() {
    var scopes_1 = {};
    var ARGS = Array.prototype.slice.call(arguments);
    scopes_1.i = dustValue() /* CType['int'] */ ;
    var start0 = loop_start();
    for (scopes_1.i = cast(CType['int'], 1);
        (checkDust(scopes_1.i) < checkDust(10)); scopes_1.i++) {
        loop_chk2(start0); {
            var scopes_2 = {};
            (yield * AsyncByGenerator.toGen(scopes_0.printf(str_to_ch_arr("%d * %d = %d です\n"), scopes_1.i, scopes_1.i, (checkDust(scopes_1.i) * checkDust(scopes_1.i)))));
        }
    }
};
loop_start2();
return main();