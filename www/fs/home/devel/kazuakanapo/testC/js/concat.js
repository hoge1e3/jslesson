scopes_0 = window;
/* scopes_0 . printf = function (){} ;
 */
/* scopes_0 . scanf = function (){} ;
 */
/* scopes_0 . sleep = function (){} ;
 */
/* scopes_0 . usleep = function (){} ;
 */
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
scopes_0.main = function* main() {
    var scopes_1 = {};
    var ARGS = Array.prototype.slice.call(arguments);
    scopes_1.x = cast(CType['int'], 10);
    (yield * AsyncByGenerator.toGen(scopes_0.drawGrid()));
    var start0 = loop_start();
    while ((scopes_1.x < 300)) {
        try {
            {
                var scopes_2 = {};
                (yield * AsyncByGenerator.toGen(scopes_0.clear()));
                (yield * AsyncByGenerator.toGen(scopes_0.fillRect(scopes_1.x, 30, 10, 20)));
                scopes_1.x += cast(CType['int'], 3);
                (yield * AsyncByGenerator.toGen(scopes_0.update()));
            }
        } finally {
            loop_chk2(start0);
        }
    }
};
loop_start2();
return main();