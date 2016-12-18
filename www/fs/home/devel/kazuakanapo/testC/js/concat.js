scopes_0 = window;
scopes_0.main = function main() {
    var scopes_1 = {};
    scopes_1.i = 0;
    scopes_1.s = cast("int", 0);
    scopes_1.n = cast("int", 5);
    var start0 = loop_start();
    for (scopes_1.i = cast("int", 1);
        (scopes_1.i <= (scopes_1.n + 1)); scopes_1.i++) {
        loop_chk2(start0); {
            var scopes_2 = {};
            scopes_1.s = cast("int", (scopes_1.s + scopes_1.i));
        }
    }
    scopes_0.printf(str_to_ch_arr("%d\n"), scopes_1.s);
    return 0;
};
loop_start2();
main();