scopes_0 = window;
/* scopes_0 . fillRect = function (){} ;
 */
/* scopes_0 . clear = function (){} ;
 */
/* scopes_0 . update = function (){} ;
 */
/* scopes_0 . setColor = function (){} ;
 */
/* scopes_0 . drawGrid = function (){} ;
 */
/* scopes_0 . drawNumber = function (){} ;
 */
/* scopes_0 . setPen = function (){} ;
 */
/* scopes_0 . movePen = function (){} ;
 */
/* scopes_0 . fillOval = function (){} ;
 */
/* scopes_0 . drawText = function (){} ;
 */
/* scopes_0 . drawString = function (){} ;
 */
/* scopes_0 . getkey = function (){} ;
 */
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
    scopes_1.i = 0 /* CType['int'] */ ;
    scopes_1.y = 0 /* CType['int'] */ ;
    (yield * AsyncByGenerator.toGen(scopes_0.scanf(str_to_ch_arr("%d"), pointer(scopes_1, "y", CType['int']))));
    var start0 = loop_start();
    for (scopes_1.i = cast(CType['int'], 0);
        (scopes_1.i < 100); scopes_1.i++) {
        loop_chk2(start0); {
            var scopes_2 = {};
            (yield * AsyncByGenerator.toGen(scopes_0.clear()));
            (yield * AsyncByGenerator.toGen(scopes_0.fillRect(scopes_1.i, scopes_1.y, 50, 50)));
            (yield * AsyncByGenerator.toGen(scopes_0.update()));
        }
    }
};
loop_start2();
return main();