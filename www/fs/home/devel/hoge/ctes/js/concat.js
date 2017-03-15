scopes_0 = window;
/* scopes_0 . printf = function (){} ;
 */
/* scopes_0 . scanf = function (){} ;
 */
/* scopes_0 . sleep = function (){} ;
 */
scopes_0.main = function main() {
    var scopes_1 = {};
    var ARGS = Array.prototype.slice.call(arguments);
    scopes_1.x = cast(CType['int'], 923876);
    scopes_0.scanf(str_to_ch_arr("%d"), pointer(scopes_1, "x", CType['int']));
    scopes_0.printf(str_to_ch_arr("%d"), (scopes_1.x * 2));
};
loop_start2();
return main();