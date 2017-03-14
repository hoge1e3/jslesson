scopes_0 = window;
/* scopes_0 . printf = function (){} ;
 */
/* scopes_0 . scanf = function (){} ;
 */
/* scopes_0 . sleep = function (){} ;
 */
/* scopes_0 . strlen = function (){} ;
 */
/* scopes_0 . strcpy = function (){} ;
 */
/* scopes_0 . strncpy = function (){} ;
 */
/* scopes_0 . strcmp = function (){} ;
 */
/* scopes_0 . strncmp = function (){} ;
 */
/* scopes_0 . strcat = function (){} ;
 */
/* scopes_0 . strncat = function (){} ;
 */
/* scopes_0 . memset = function (){} ;
 */
/* scopes_0 . index = function (){} ;
 */
/* scopes_0 . rindex = function (){} ;
 */
/* scopes_0 . memcmp = function (){} ;
 */
/* scopes_0 . memcpy = function (){} ;
 */
/* scopes_0 . strstr = function (){} ;
 */
scopes_0.main = function main() {
    var scopes_1 = {};
    var ARGS = Array.prototype.slice.call(arguments);
    scopes_1.nidoru = cast(CType.Array(CType['char'], 5), str_to_ch_arr("ba"));
    scopes_1.he_suta = cast(CType.Array(CType['char'], 30), str_to_ch_arr("meniaobayama hototogisu hatsugatsuo"));
    if ((scopes_0.strstr(scopes_1.he_suta, scopes_1.nidoru) !== 0)) {
        var scopes_2 = {};
        scopes_0.printf(str_to_ch_arr("arimasu"));
    } else {
        var scopes_2 = {};
        scopes_0.printf(str_to_ch_arr("arimasen"));
    }
};
loop_start2();
return main();