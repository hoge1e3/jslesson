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
    scopes_1.x = cast(CType['int'], 66);
    (yield * AsyncByGenerator.toGen(scopes_0.printf(str_to_ch_arr("hello\n"))));
    (yield * AsyncByGenerator.toGen(scopes_0.printf(str_to_ch_arr("x= %d\n"), scopes_1.x)));
};
loop_start2();
return main();