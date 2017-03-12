scopes_0 = window;
/* scopes_0 . printf = function (){} ;
 */
/* scopes_0 . scanf = function (){} ;
 */
/* scopes_0 . sleep = function (){} ;
 */
/* scopes_0 . fillRect = function (){} ;
 */
/* scopes_0 . clear = function (){} ;
 */
/* scopes_0 . update = function (){} ;
 */
/* scopes_0 . setColor = function (){} ;
 */
scopes_0.Rect = 0 /* CType.TypeDef(CType.Struct([])) */ ;
scopes_0.main = async function main() {
    var scopes_1 = {};
    var ARGS = Array.prototype.slice.call(arguments);
    scopes_1.r = {};
    scopes_1.r.x = cast(CType.Struct([]), 30);
    scopes_1.r.y = cast(CType.Struct([]), 50);
    scopes_1.r.vx = cast(CType.Struct([]), 1);
    scopes_1.r.vy = cast(CType.Struct([]), 2);
    var start0 = loop_start();
    while (1) {
        try {
            {
                var scopes_2 = {};
                await (scopes_0.clear());
                await (scopes_0.fillRect(scopes_1.r.x, scopes_1.r.y, 20, 20));
                scopes_1.r.x += cast(CType.Struct([]), scopes_1.r.vx);
                scopes_1.r.y += cast(CType.Struct([]), scopes_1.r.vy);
                await (scopes_0.update());
            }
        } finally {
            loop_chk2(start0);
        }
    }
};
loop_start2();
return main();