scopes_0 = window;
scopes_0.main = async function main() {
    var scopes_1 = {};
    scopes_1.i = 0;
    scopes_1.y = 0;
    await (scopes_0.scanf(str_to_ch_arr("%d"), pointer(scopes_1, "y", CType['int'])));
    var start0 = loop_start();
    for (scopes_1.i = cast(CType['int'], 0);
        (scopes_1.i < 100); scopes_1.i++) {
        loop_chk2(start0); {
            var scopes_2 = {};
            await (scopes_0.clear());
            await (scopes_0.fillRect(scopes_1.i, scopes_1.y, 50, 50));
            await (scopes_0.update());
        }
    }
};
loop_start2();
return main();