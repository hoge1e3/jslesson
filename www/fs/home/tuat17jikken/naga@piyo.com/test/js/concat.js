scopes_0 = window;
/* scopes_0 . printf = function (){} ;
 */
/* scopes_0 . scanf = function (){} ;
 */
/* scopes_0 . sleep = function (){} ;
 */
scopes_0.main = function* main() {
    var scopes_1 = {};
    var ARGS = Array.prototype.slice.call(arguments);
    (yield * AsyncByGenerator.toGen(scopes_0.printf(str_to_ch_arr("hello world"))));
};
loop_start2();
return main();